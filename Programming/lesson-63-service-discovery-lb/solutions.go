// Lesson 63 — Service Discovery & Load Balancing
//
// File này minh hoạ các thành phần cốt lõi của service discovery + load balancing:
//  1. In-memory service registry (register / deregister / list).
//  2. Round-robin load balancer.
//  3. Weighted load balancer (chọn theo capacity).
//  4. Consistent hashing ring (thêm/bớt node, remap tối thiểu).
//  5. Health checker (active probe → deregister instance chết).
//
// Code biên dịch + chạy được:  go run solutions.go
// Comment bằng tiếng Việt để phục vụ việc học.
package main

import (
	"crypto/sha1"
	"encoding/binary"
	"fmt"
	"sort"
	"sync"
	"time"
)

// ============================================================================
// 0. Model chung — Instance & Registry
// ============================================================================

// Instance là một bản sao (replica) của một service đang chạy ở một địa chỉ.
// Trong thực tế còn có metadata: version, zone, metrics... ở đây giữ tối thiểu.
type Instance struct {
	ID      string // định danh duy nhất, vd "order-svc-1"
	Addr    string // host:port, vd "10.0.0.7:8080"
	Weight  int    // dùng cho weighted LB — capacity tương đối
	Healthy bool   // trạng thái health hiện tại
}

// Registry là "danh bạ" của hệ thống: ai đang sống, ở đâu.
// Consul / etcd / Eureka chính là các registry phân tán; đây là bản in-memory.
type Registry struct {
	mu        sync.RWMutex
	instances map[string]map[string]*Instance // service -> id -> instance
}

func NewRegistry() *Registry {
	return &Registry{instances: make(map[string]map[string]*Instance)}
}

// Register: instance gọi khi khởi động (register on startup).
func (r *Registry) Register(service string, inst *Instance) {
	r.mu.Lock()
	defer r.mu.Unlock()
	if r.instances[service] == nil {
		r.instances[service] = make(map[string]*Instance)
	}
	r.instances[service][inst.ID] = inst
}

// Deregister: instance gọi khi shutdown (deregister on shutdown), hoặc
// health checker gọi khi phát hiện instance chết.
func (r *Registry) Deregister(service, id string) {
	r.mu.Lock()
	defer r.mu.Unlock()
	if m := r.instances[service]; m != nil {
		delete(m, id)
	}
}

// Healthy trả về danh sách instance đang khỏe — đây là cái LB được phép route tới.
func (r *Registry) Healthy(service string) []*Instance {
	r.mu.RLock()
	defer r.mu.RUnlock()
	var out []*Instance
	for _, inst := range r.instances[service] {
		if inst.Healthy {
			out = append(out, inst)
		}
	}
	// sort để kết quả deterministic (test dễ đoán)
	sort.Slice(out, func(i, j int) bool { return out[i].ID < out[j].ID })
	return out
}

// ============================================================================
// 1. Round-Robin Load Balancer (BT1)
// ============================================================================
//
// Ý tưởng: giữ một con trỏ next, mỗi lần Pick tăng next lên 1 rồi mod cho số
// lượng instance. Mọi instance được chia request đều nhau theo vòng tròn.

type RoundRobinLB struct {
	mu   sync.Mutex
	next int
}

func (lb *RoundRobinLB) Pick(insts []*Instance) *Instance {
	if len(insts) == 0 {
		return nil // không có instance khỏe -> caller xử lý (fail fast)
	}
	lb.mu.Lock()
	defer lb.mu.Unlock()
	inst := insts[lb.next%len(insts)]
	lb.next++
	return inst
}

// ============================================================================
// 2. Weighted Load Balancer theo capacity (BT5)
// ============================================================================
//
// Mỗi instance có Weight (vd máy 8 core weight=4, máy 2 core weight=1).
// Thuật toán "weighted round-robin" đơn giản: nở danh sách theo weight rồi
// round-robin. Có thể dùng smooth-WRR cho phân phối mượt hơn nhưng đây đủ minh hoạ.

type WeightedLB struct {
	mu   sync.Mutex
	next int
}

func (lb *WeightedLB) Pick(insts []*Instance) *Instance {
	if len(insts) == 0 {
		return nil
	}
	// "Nở" danh sách: instance weight=3 xuất hiện 3 lần.
	var expanded []*Instance
	for _, in := range insts {
		w := in.Weight
		if w <= 0 {
			w = 1
		}
		for i := 0; i < w; i++ {
			expanded = append(expanded, in)
		}
	}
	lb.mu.Lock()
	defer lb.mu.Unlock()
	inst := expanded[lb.next%len(expanded)]
	lb.next++
	return inst
}

// ============================================================================
// 3. Consistent Hashing Ring (BT2)
// ============================================================================
//
// Vấn đề của "hash % N": khi N đổi (thêm/bớt node), gần như TẤT CẢ key bị remap.
// Consistent hashing đặt cả node lẫn key lên một vòng tròn [0, 2^32). Mỗi key
// thuộc về node đầu tiên theo chiều kim đồng hồ. Thêm/bớt 1 node chỉ ảnh hưởng
// các key nằm giữa node đó và node liền trước -> remap ~ K/N thay vì ~K.
//
// virtualNodes (replica ảo): mỗi node vật lý đặt nhiều điểm trên ring để phân
// phối đều hơn, tránh node "ôm" một cung quá lớn.

type HashRing struct {
	mu       sync.RWMutex
	replicas int               // số virtual node cho mỗi node vật lý
	keys     []uint32          // các hash trên ring, đã sort
	hashMap  map[uint32]string // hash -> tên node vật lý
}

func NewHashRing(replicas int) *HashRing {
	return &HashRing{
		replicas: replicas,
		hashMap:  make(map[uint32]string),
	}
}

func hashKey(s string) uint32 {
	sum := sha1.Sum([]byte(s))
	return binary.BigEndian.Uint32(sum[:4])
}

// AddNode đặt `replicas` điểm ảo của node lên ring.
func (h *HashRing) AddNode(node string) {
	h.mu.Lock()
	defer h.mu.Unlock()
	for i := 0; i < h.replicas; i++ {
		hk := hashKey(fmt.Sprintf("%s#%d", node, i))
		h.keys = append(h.keys, hk)
		h.hashMap[hk] = node
	}
	sort.Slice(h.keys, func(i, j int) bool { return h.keys[i] < h.keys[j] })
}

// RemoveNode gỡ tất cả điểm ảo của node khỏi ring.
func (h *HashRing) RemoveNode(node string) {
	h.mu.Lock()
	defer h.mu.Unlock()
	var kept []uint32
	for _, k := range h.keys {
		if h.hashMap[k] == node {
			delete(h.hashMap, k)
			continue
		}
		kept = append(kept, k)
	}
	h.keys = kept
}

// Get trả về node chịu trách nhiệm cho key: node ảo đầu tiên theo chiều
// kim đồng hồ kể từ hash(key). Nếu vượt cuối mảng thì vòng lại đầu (ring).
func (h *HashRing) Get(key string) string {
	h.mu.RLock()
	defer h.mu.RUnlock()
	if len(h.keys) == 0 {
		return ""
	}
	hk := hashKey(key)
	// binary search: phần tử đầu tiên >= hk
	idx := sort.Search(len(h.keys), func(i int) bool { return h.keys[i] >= hk })
	if idx == len(h.keys) {
		idx = 0 // wrap quanh ring
	}
	return h.hashMap[h.keys[idx]]
}

// ============================================================================
// 4. Health Checker (BT3 + BT6)
// ============================================================================
//
// Active health check: định kỳ probe từng instance. Probe fail -> mark unhealthy
// và deregister để LB không route tới nữa (BT6: fix request route đến dead instance).

// Probe trả về true nếu instance còn sống. Trong thực tế là HTTP GET /healthz.
type Probe func(inst *Instance) bool

type HealthChecker struct {
	reg     *Registry
	service string
	probe   Probe
}

func NewHealthChecker(reg *Registry, service string, probe Probe) *HealthChecker {
	return &HealthChecker{reg: reg, service: service, probe: probe}
}

// CheckOnce duyệt mọi instance một lượt, cập nhật Healthy và deregister cái chết.
func (hc *HealthChecker) CheckOnce() {
	hc.reg.mu.Lock()
	m := hc.reg.instances[hc.service]
	var dead []string
	for id, inst := range m {
		alive := hc.probe(inst)
		inst.Healthy = alive
		if !alive {
			dead = append(dead, id)
		}
	}
	hc.reg.mu.Unlock()
	// deregister ngoài lock chính của map probe để rõ ý đồ
	for _, id := range dead {
		hc.reg.Deregister(hc.service, id)
	}
}

// ============================================================================
// 5. Demo main
// ============================================================================

func main() {
	fmt.Println("=== Lesson 63: Service Discovery & Load Balancing ===")

	reg := NewRegistry()
	svc := "order-svc"
	reg.Register(svc, &Instance{ID: "order-1", Addr: "10.0.0.1:80", Weight: 1, Healthy: true})
	reg.Register(svc, &Instance{ID: "order-2", Addr: "10.0.0.2:80", Weight: 2, Healthy: true})
	reg.Register(svc, &Instance{ID: "order-3", Addr: "10.0.0.3:80", Weight: 1, Healthy: true})

	// --- Round-robin: 6 request chia đều cho 3 instance ---
	fmt.Println("\n[1] Round-robin (6 request):")
	rr := &RoundRobinLB{}
	for i := 0; i < 6; i++ {
		in := rr.Pick(reg.Healthy(svc))
		fmt.Printf("  req %d -> %s\n", i+1, in.ID)
	}

	// --- Weighted: order-2 weight=2 nhận gấp đôi ---
	fmt.Println("\n[2] Weighted (8 request, order-2 weight=2):")
	wl := &WeightedLB{}
	count := map[string]int{}
	for i := 0; i < 8; i++ {
		count[wl.Pick(reg.Healthy(svc)).ID]++
	}
	fmt.Printf("  phân phối: %v\n", count)

	// --- Consistent hashing: remap tối thiểu khi thêm node ---
	fmt.Println("\n[3] Consistent hashing (remap khi thêm node):")
	ring := NewHashRing(100)
	for _, n := range []string{"cache-A", "cache-B", "cache-C"} {
		ring.AddNode(n)
	}
	keys := []string{}
	for i := 0; i < 1000; i++ {
		keys = append(keys, fmt.Sprintf("key-%d", i))
	}
	before := map[string]string{}
	for _, k := range keys {
		before[k] = ring.Get(k)
	}
	ring.AddNode("cache-D")
	moved := 0
	for _, k := range keys {
		if ring.Get(k) != before[k] {
			moved++
		}
	}
	fmt.Printf("  thêm cache-D vào 3 node: %d/1000 key bị remap (~%.0f%%, lý thuyết ~25%%)\n",
		moved, float64(moved)/10)

	// --- Health check: instance chết bị deregister ---
	fmt.Println("\n[4] Health check (order-2 chết):")
	dead := map[string]bool{"order-2": true}
	hc := NewHealthChecker(reg, svc, func(in *Instance) bool { return !dead[in.ID] })
	hc.CheckOnce()
	fmt.Printf("  instance khỏe còn lại: ")
	for _, in := range reg.Healthy(svc) {
		fmt.Printf("%s ", in.ID)
	}
	fmt.Println()

	// sau khi deregister, round-robin không còn route tới order-2
	fmt.Println("\n[5] Round-robin sau health check (chỉ còn instance khỏe):")
	rr2 := &RoundRobinLB{}
	for i := 0; i < 4; i++ {
		fmt.Printf("  req %d -> %s\n", i+1, rr2.Pick(reg.Healthy(svc)).ID)
	}

	_ = time.Second // giữ import time cho ví dụ interval thực tế
}
