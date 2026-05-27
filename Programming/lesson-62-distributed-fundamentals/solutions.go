// Lesson 62 — Distributed Fundamentals: solutions.go
//
// File này cài đặt các khối nền tảng của hệ phân tán dùng trong README:
//   1. Vector clock        — theo dõi nhân quả (increment / merge / so sánh).
//   2. LWW register         — last-write-wins resolution.
//   3. Idempotency store    — an toàn với retry (kể cả retry song song).
//   4. Quorum check         — kiểm tra R + W > N (strong consistency).
//
// Chạy:  go run solutions.go
// (Không phụ thuộc package ngoài, chỉ standard library.)
package main

import (
	"errors"
	"fmt"
	"sync"
)

// =============================================================================
// 1. VECTOR CLOCK
// =============================================================================
//
// Vector clock độ dài N (N = số node). Mỗi vị trí đếm số sự kiện node đó đã biết.
// Quy ước: node được định danh bằng index 0..N-1.

// VectorClock là vector đếm sự kiện theo từng node.
type VectorClock []int

// NewVectorClock tạo vector clock toàn 0 cho cụm n node.
func NewVectorClock(n int) VectorClock {
	return make(VectorClock, n)
}

// Clone trả về bản sao độc lập (tránh chia sẻ slice ngầm).
func (v VectorClock) Clone() VectorClock {
	c := make(VectorClock, len(v))
	copy(c, v)
	return c
}

// Tick: node self thực hiện một local event hoặc gửi msg -> tăng V[self].
func (v VectorClock) Tick(self int) {
	v[self]++
}

// Merge: khi node self NHẬN một vector other, lấy max từng phần tử rồi tăng V[self].
// Đây là luật receive trong README mục 8.
func (v VectorClock) Merge(other VectorClock, self int) {
	for i := range v {
		if other[i] > v[i] {
			v[i] = other[i]
		}
	}
	v[self]++
}

// Relation mô tả quan hệ thứ tự giữa hai vector clock.
type Relation int

const (
	Equal      Relation = iota // hai vector giống hệt nhau
	Before                     // a happens-before b
	After                      // a happens-after b
	Concurrent                 // a || b (xung đột thật, cần resolve)
)

func (r Relation) String() string {
	switch r {
	case Equal:
		return "Equal"
	case Before:
		return "Before (a -> b)"
	case After:
		return "After (b -> a)"
	default:
		return "Concurrent (a || b)"
	}
}

// Compare so sánh hai vector clock theo định nghĩa happens-before:
//   a < b  nếu mọi a[i] <= b[i] và có ít nhất một a[i] < b[i].
// Nếu không bên nào <= bên kia toàn bộ -> Concurrent.
func Compare(a, b VectorClock) Relation {
	lessOrEqualAB := true // a[i] <= b[i] với mọi i ?
	lessOrEqualBA := true // b[i] <= a[i] với mọi i ?
	strictAB := false     // có a[i] < b[i] ?
	strictBA := false     // có b[i] < a[i] ?

	for i := range a {
		if a[i] > b[i] {
			lessOrEqualAB = false
			strictBA = true
		}
		if a[i] < b[i] {
			lessOrEqualBA = false
			strictAB = true
		}
	}

	switch {
	case !strictAB && !strictBA:
		return Equal
	case lessOrEqualAB && strictAB:
		return Before
	case lessOrEqualBA && strictBA:
		return After
	default:
		return Concurrent
	}
}

// =============================================================================
// 2. LWW REGISTER (Last-Write-Wins)
// =============================================================================
//
// Mỗi giá trị gắn timestamp; khi merge, giữ giá trị có timestamp lớn nhất.
// Cảnh báo: phụ thuộc đồng hồ -> nhạy clock skew (xem README mục 7.1 & BT5).

type LWWRegister struct {
	value string
	ts    int64
}

// Set ghi giá trị mới với timestamp ts; chỉ ghi đè nếu ts mới >= ts hiện tại.
func (r *LWWRegister) Set(value string, ts int64) {
	if ts >= r.ts {
		r.value = value
		r.ts = ts
	}
}

// Merge hợp nhất với một register khác (giữ giá trị ts lớn hơn).
func (r *LWWRegister) Merge(other LWWRegister) {
	if other.ts > r.ts {
		r.value = other.value
		r.ts = other.ts
	}
}

func (r LWWRegister) Value() string { return r.value }

// =============================================================================
// 3. IDEMPOTENCY STORE
// =============================================================================
//
// Đảm bảo một operation gắn idempotency key chỉ chạy đúng MỘT lần dù bị retry,
// kể cả retry song song (dùng mutex theo toàn store cho đơn giản & an toàn).

type Receipt struct {
	ID     string
	Amount int
}

type IdempotencyStore struct {
	mu   sync.Mutex
	seen map[string]Receipt
}

func NewIdempotencyStore() *IdempotencyStore {
	return &IdempotencyStore{seen: make(map[string]Receipt)}
}

// Charge xử lý thanh toán idempotent: nếu key đã thấy -> trả kết quả cũ,
// không chạy lại op (không trừ tiền lần hai).
//
// op là hàm thực hiện hiệu ứng phụ thật (trừ tiền) và trả Receipt.
// Khóa được giữ suốt quá trình để hai retry song song không cùng chạy op.
func (s *IdempotencyStore) Charge(key string, op func() (Receipt, error)) (Receipt, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	if r, ok := s.seen[key]; ok {
		return r, nil // đã xử lý: trả lại kết quả, KHÔNG chạy lại
	}
	r, err := op()
	if err != nil {
		return Receipt{}, err // lỗi -> không lưu key, cho phép retry thật
	}
	s.seen[key] = r
	return r, nil
}

// =============================================================================
// 4. QUORUM CHECK
// =============================================================================

// QuorumStrong trả về true nếu cấu hình (N, W, R) đảm bảo strong consistency:
//   R + W > N  (tập đọc & ghi chắc chắn giao nhau).
func QuorumStrong(n, w, r int) bool {
	return w+r > n
}

// QuorumWriteSafe kiểm tra W > N/2 (chống hai write song song cùng "thắng").
func QuorumWriteSafe(n, w int) bool {
	return 2*w > n
}

// MaxWriteFailures trả về số node tối đa có thể chết mà vẫn ghi được (cần W node).
func MaxWriteFailures(n, w int) (int, error) {
	if w > n || w < 1 {
		return 0, errors.New("W phải trong [1, N]")
	}
	return n - w, nil
}

// =============================================================================
// main — demo từng phần
// =============================================================================

func main() {
	fmt.Println("=== 1. Vector clock: A gửi -> B; C độc lập (BT2) ===")
	// 3 node: A=0, B=1, C=2
	a := NewVectorClock(3)
	b := NewVectorClock(3)
	c := NewVectorClock(3)

	a.Tick(0)          // e1: A local event -> [1,0,0]
	e1 := a.Clone()    // chụp lại vector của e1
	b.Merge(a, 1)      // B nhận msg từ A -> [1,1,0]
	c.Tick(2)          // e2: C local event độc lập -> [0,0,1]
	e2 := c.Clone()

	fmt.Printf("e1 (A)            = %v\n", e1)
	fmt.Printf("event B sau nhận  = %v\n", b)
	fmt.Printf("e2 (C)            = %v\n", e2)
	fmt.Printf("Quan hệ e1 vs B   : %v\n", Compare(e1, b)) // Before
	fmt.Printf("Quan hệ e1 vs e2  : %v\n", Compare(e1, e2)) // Concurrent

	fmt.Println("\n=== 2. LWW register (BT5) ===")
	var reg LWWRegister
	reg.Set("Ann", 1690000098) // R2 ghi trước (ts nhỏ hơn)
	reg.Set("An", 1690000100)  // R1 ghi với ts lớn hơn -> thắng
	fmt.Printf("Giá trị sau LWW   : %q (ts lớn nhất thắng)\n", reg.Value())

	fmt.Println("\n=== 3. Idempotency store (BT4) ===")
	store := NewIdempotencyStore()
	charges := 0 // đếm số lần op thật chạy
	op := func() (Receipt, error) {
		charges++
		return Receipt{ID: "rcpt-1", Amount: 100}, nil
	}
	key := "idem-a1b2"
	// Mô phỏng client retry 3 lần CÙNG key (response lần 1,2 bị mất):
	for i := 1; i <= 3; i++ {
		r, _ := store.Charge(key, op)
		fmt.Printf("Retry #%d -> receipt=%s, amount=%d\n", i, r.ID, r.Amount)
	}
	fmt.Printf("Số lần trừ tiền THẬT: %d (đúng phải = 1)\n", charges)

	fmt.Println("\n=== 4. Quorum check (BT3, N=5) ===")
	demoQuorum(3, 2, 2) // strong, an toàn
	demoQuorum(5, 3, 3) // strong, an toàn, cân bằng
	demoQuorum(3, 1, 1) // eventual (không strong)
	demoQuorum(5, 1, 5) // strong nhưng W không > N/2
}

func demoQuorum(n, w, r int) {
	strong := QuorumStrong(n, w, r)
	safe := QuorumWriteSafe(n, w)
	maxFail, _ := MaxWriteFailures(n, w)
	fmt.Printf("N=%d W=%d R=%d | strong(R+W>N)=%-5v writeSafe(W>N/2)=%-5v | chịu được %d node chết khi ghi\n",
		n, w, r, strong, safe, maxFail)
}
