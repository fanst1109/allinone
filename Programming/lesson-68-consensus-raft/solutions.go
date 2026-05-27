// solutions.go — Lesson 68: Consensus & Raft (mô phỏng đơn giản hóa)
//
// File này mô phỏng MỘT PHẦN cốt lõi của thuật toán Raft hoàn toàn trong bộ nhớ:
//   - Node state machine: Follower / Candidate / Leader.
//   - Term (logical clock) tăng dần qua mỗi lần bầu cử.
//   - Election timeout ngẫu nhiên để tránh split vote.
//   - Leader election bằng RequestVote (vote majority → trở thành leader).
//   - Log replication bằng AppendEntries: leader append → replicate → commit
//     khi majority đã ack.
//   - Demo: bầu leader, replicate vài entry, "giết" leader → cluster tự re-elect.
//
// LƯU Ý ĐÂY LÀ TOY MODEL:
//   - Các node giao tiếp qua channel trong cùng process, KHÔNG có network thật,
//     KHÔNG có persistence (WAL), KHÔNG có snapshot, KHÔNG có membership change.
//   - Mục tiêu là làm rõ luồng election + replication, không phải code production.
//     Trong thực tế hãy dùng hashicorp/raft hoặc etcd/raft.
//
// Chạy:  go run solutions.go
package main

import (
	"fmt"
	"math/rand"
	"sync"
	"time"
)

// ---------------------------------------------------------------------------
// Kiểu dữ liệu cơ bản
// ---------------------------------------------------------------------------

// State — trạng thái của một node trong cluster Raft.
type State int

const (
	Follower  State = iota // mặc định: nghe heartbeat của leader
	Candidate              // đang xin phiếu để làm leader
	Leader                 // đang dẫn dắt cluster, gửi heartbeat + replicate log
)

func (s State) String() string {
	switch s {
	case Follower:
		return "Follower"
	case Candidate:
		return "Candidate"
	case Leader:
		return "Leader"
	}
	return "?"
}

// LogEntry — một mục trong replicated log. Term ghi lại leader nào tạo ra nó.
type LogEntry struct {
	Term    int
	Command string
}

// ---------------------------------------------------------------------------
// RPC messages — mô phỏng 2 RPC chính của Raft
// ---------------------------------------------------------------------------

// RequestVote: candidate xin phiếu bầu.
type RequestVote struct {
	Term         int // term của candidate
	CandidateID  int
	LastLogIndex int // dùng cho election restriction (log up-to-date)
	LastLogTerm  int
	ReplyCh      chan VoteReply
}

type VoteReply struct {
	Term        int
	VoteGranted bool
}

// AppendEntries: leader replicate log + đóng vai heartbeat (Entries rỗng).
type AppendEntries struct {
	Term         int
	LeaderID     int
	PrevLogIndex int
	PrevLogTerm  int
	Entries      []LogEntry
	LeaderCommit int
	ReplyCh      chan AppendReply
}

type AppendReply struct {
	Term    int
	Success bool
}

// message — union đơn giản cho mailbox của node.
type message struct {
	vote   *RequestVote
	append *AppendEntries
}

// ---------------------------------------------------------------------------
// Node
// ---------------------------------------------------------------------------

type Node struct {
	id          int
	mu          sync.Mutex
	state       State
	term        int // currentTerm
	votedFor    int // -1 nếu chưa vote trong term này
	log         []LogEntry
	commitIndex int

	// liên kết tới cluster
	cluster *Cluster
	inbox   chan message

	// điều khiển vòng đời / mô phỏng partition
	alive  bool
	stopCh chan struct{}

	// election timeout ngẫu nhiên (ms)
	electionTimeoutMs int
	lastHeard         time.Time
}

func newNode(id int, c *Cluster) *Node {
	return &Node{
		id:       id,
		state:    Follower,
		term:     0,
		votedFor: -1,
		log:      []LogEntry{},
		cluster:  c,
		inbox:    make(chan message, 64),
		alive:    true,
		stopCh:   make(chan struct{}),
	}
}

func (n *Node) lastLogIndex() int { return len(n.log) - 1 }
func (n *Node) lastLogTerm() int {
	if len(n.log) == 0 {
		return 0
	}
	return n.log[len(n.log)-1].Term
}

// resetTimeout — chọn election timeout ngẫu nhiên trong [150,300]ms.
// Randomized timeout là CHÌA KHÓA để tránh split vote: hai follower hiếm khi
// timeout cùng lúc nên thường chỉ 1 candidate xuất hiện mỗi term.
func (n *Node) resetTimeout() {
	n.electionTimeoutMs = 150 + rand.Intn(150)
	n.lastHeard = time.Now()
}

// ---------------------------------------------------------------------------
// Cluster
// ---------------------------------------------------------------------------

type Cluster struct {
	mu    sync.RWMutex
	nodes map[int]*Node
}

func newCluster(size int) *Cluster {
	c := &Cluster{nodes: make(map[int]*Node)}
	for i := 0; i < size; i++ {
		c.nodes[i] = newNode(i, c)
	}
	return c
}

func (c *Cluster) size() int {
	c.mu.RLock()
	defer c.mu.RUnlock()
	return len(c.nodes)
}

// majority — số phiếu tối thiểu cần để đạt quorum: N/2 + 1.
func (c *Cluster) majority() int { return c.size()/2 + 1 }

// send — gửi message tới node đích nếu nó còn "sống" (mô phỏng partition:
// node chết = không nhận được message). Trả về true nếu gửi được.
func (c *Cluster) send(to int, msg message) bool {
	c.mu.RLock()
	n, ok := c.nodes[to]
	c.mu.RUnlock()
	if !ok {
		return false
	}
	n.mu.Lock()
	alive := n.alive
	n.mu.Unlock()
	if !alive {
		return false
	}
	select {
	case n.inbox <- msg:
		return true
	default:
		return false // mailbox đầy → coi như mất gói
	}
}

// peers — danh sách id các node khác.
func (c *Cluster) peers(self int) []int {
	c.mu.RLock()
	defer c.mu.RUnlock()
	ids := []int{}
	for id := range c.nodes {
		if id != self {
			ids = append(ids, id)
		}
	}
	return ids
}

// ---------------------------------------------------------------------------
// Vòng lặp chính của node
// ---------------------------------------------------------------------------

func (n *Node) run() {
	n.resetTimeout()
	ticker := time.NewTicker(10 * time.Millisecond)
	defer ticker.Stop()

	for {
		select {
		case <-n.stopCh:
			return

		case msg := <-n.inbox:
			n.handle(msg)

		case <-ticker.C:
			n.mu.Lock()
			if !n.alive {
				n.mu.Unlock()
				continue
			}
			st := n.state
			elapsed := time.Since(n.lastHeard).Milliseconds()
			timeout := int64(n.electionTimeoutMs)
			n.mu.Unlock()

			switch st {
			case Follower, Candidate:
				// Hết timeout mà không nghe heartbeat hợp lệ → bắt đầu election.
				if elapsed >= timeout {
					n.startElection()
				}
			case Leader:
				// Leader gửi heartbeat đều đặn để giữ quyền lực.
				n.broadcastHeartbeat()
			}
		}
	}
}

// handle — xử lý RPC đến.
func (n *Node) handle(msg message) {
	switch {
	case msg.vote != nil:
		n.handleRequestVote(msg.vote)
	case msg.append != nil:
		n.handleAppendEntries(msg.append)
	}
}

// ---------------------------------------------------------------------------
// Leader election
// ---------------------------------------------------------------------------

func (n *Node) startElection() {
	n.mu.Lock()
	if !n.alive {
		n.mu.Unlock()
		return
	}
	n.term++            // tăng term: bắt đầu nhiệm kỳ mới
	n.state = Candidate // chuyển sang ứng viên
	n.votedFor = n.id   // tự bầu cho mình
	n.resetTimeout()
	termSnapshot := n.term
	lastIdx := n.lastLogIndex()
	lastTerm := n.lastLogTerm()
	n.mu.Unlock()

	fmt.Printf("  [node %d] → Candidate, term=%d, xin phiếu...\n", n.id, termSnapshot)

	votes := 1 // đã có phiếu của chính mình
	var voteMu sync.Mutex
	var wg sync.WaitGroup

	for _, peer := range n.cluster.peers(n.id) {
		wg.Add(1)
		go func(peer int) {
			defer wg.Done()
			reply := make(chan VoteReply, 1)
			ok := n.cluster.send(peer, message{vote: &RequestVote{
				Term:         termSnapshot,
				CandidateID:  n.id,
				LastLogIndex: lastIdx,
				LastLogTerm:  lastTerm,
				ReplyCh:      reply,
			}})
			if !ok {
				return
			}
			select {
			case r := <-reply:
				n.mu.Lock()
				// Nếu thấy term cao hơn → lùi về Follower.
				if r.Term > n.term {
					n.term = r.Term
					n.state = Follower
					n.votedFor = -1
				}
				n.mu.Unlock()
				if r.VoteGranted {
					voteMu.Lock()
					votes++
					voteMu.Unlock()
				}
			case <-time.After(80 * time.Millisecond):
				// timeout chờ phiếu — bỏ qua
			}
		}(peer)
	}
	wg.Wait()

	n.mu.Lock()
	defer n.mu.Unlock()
	if n.state != Candidate || n.term != termSnapshot {
		return // đã bị soán ngôi / lùi về follower
	}
	if votes >= n.cluster.majority() {
		n.state = Leader
		fmt.Printf("  [node %d] ★ trúng cử LEADER term=%d (%d/%d phiếu, quorum=%d)\n",
			n.id, n.term, votes, n.cluster.size(), n.cluster.majority())
	} else {
		fmt.Printf("  [node %d] thua: chỉ %d/%d phiếu (cần %d) → thử lại\n",
			n.id, votes, n.cluster.size(), n.cluster.majority())
	}
}

func (n *Node) handleRequestVote(req *RequestVote) {
	n.mu.Lock()
	defer n.mu.Unlock()

	reply := VoteReply{Term: n.term}

	// Term cũ hơn → từ chối.
	if req.Term < n.term {
		req.ReplyCh <- reply
		return
	}
	// Thấy term mới hơn → cập nhật, lùi về Follower, reset votedFor.
	if req.Term > n.term {
		n.term = req.Term
		n.state = Follower
		n.votedFor = -1
	}
	reply.Term = n.term

	// Election restriction: chỉ vote nếu log của candidate ÍT NHẤT mới bằng mình.
	upToDate := req.LastLogTerm > n.lastLogTerm() ||
		(req.LastLogTerm == n.lastLogTerm() && req.LastLogIndex >= n.lastLogIndex())

	if (n.votedFor == -1 || n.votedFor == req.CandidateID) && upToDate {
		n.votedFor = req.CandidateID
		reply.VoteGranted = true
		n.resetTimeout() // đã ủng hộ ai đó → reset timeout của mình
	}
	req.ReplyCh <- reply
}

// ---------------------------------------------------------------------------
// Log replication
// ---------------------------------------------------------------------------

// clientPropose — client gửi command tới leader. Leader append vào log rồi
// replicate. Trả về true nếu commit thành công (majority ack).
func (n *Node) clientPropose(cmd string) bool {
	n.mu.Lock()
	if n.state != Leader {
		n.mu.Unlock()
		return false
	}
	entry := LogEntry{Term: n.term, Command: cmd}
	n.log = append(n.log, entry)
	idx := n.lastLogIndex()
	termSnapshot := n.term
	prevIdx := idx - 1
	prevTerm := 0
	if prevIdx >= 0 {
		prevTerm = n.log[prevIdx].Term
	}
	n.mu.Unlock()

	fmt.Printf("  [leader %d] append entry #%d: %q (term %d) → replicate...\n",
		n.id, idx, cmd, termSnapshot)

	acks := 1 // leader tự tính là 1 ack
	var ackMu sync.Mutex
	var wg sync.WaitGroup

	for _, peer := range n.cluster.peers(n.id) {
		wg.Add(1)
		go func(peer int) {
			defer wg.Done()
			reply := make(chan AppendReply, 1)
			ok := n.cluster.send(peer, message{append: &AppendEntries{
				Term:         termSnapshot,
				LeaderID:     n.id,
				PrevLogIndex: prevIdx,
				PrevLogTerm:  prevTerm,
				Entries:      []LogEntry{entry},
				LeaderCommit: idx,
				ReplyCh:      reply,
			}})
			if !ok {
				fmt.Printf("    [leader %d] node %d không phản hồi (down/partition)\n", n.id, peer)
				return
			}
			select {
			case r := <-reply:
				if r.Success {
					ackMu.Lock()
					acks++
					ackMu.Unlock()
				}
			case <-time.After(80 * time.Millisecond):
			}
		}(peer)
	}
	wg.Wait()

	if acks >= n.cluster.majority() {
		n.mu.Lock()
		n.commitIndex = idx
		n.mu.Unlock()
		fmt.Printf("    [leader %d] COMMIT #%d (%d/%d ack ≥ quorum %d) → apply state machine\n",
			n.id, idx, acks, n.cluster.size(), n.cluster.majority())
		return true
	}
	fmt.Printf("    [leader %d] KHÔNG commit #%d: chỉ %d/%d ack (cần %d)\n",
		n.id, idx, acks, n.cluster.size(), n.cluster.majority())
	return false
}

func (n *Node) handleAppendEntries(req *AppendEntries) {
	n.mu.Lock()
	defer n.mu.Unlock()

	reply := AppendReply{Term: n.term}
	if req.Term < n.term {
		req.ReplyCh <- reply // leader cũ → từ chối
		return
	}
	// Term hợp lệ → công nhận leader, lùi về Follower, reset timeout.
	if req.Term > n.term {
		n.term = req.Term
		n.votedFor = -1
	}
	n.state = Follower
	n.resetTimeout()
	reply.Term = n.term

	// Append entry (toy: bỏ qua kiểm tra PrevLog đầy đủ cho gọn).
	if len(req.Entries) > 0 {
		n.log = append(n.log, req.Entries...)
	}
	if req.LeaderCommit > n.commitIndex {
		n.commitIndex = minInt(req.LeaderCommit, n.lastLogIndex())
	}
	reply.Success = true
	req.ReplyCh <- reply
}

func (n *Node) broadcastHeartbeat() {
	n.mu.Lock()
	termSnapshot := n.term
	commit := n.commitIndex
	n.mu.Unlock()
	for _, peer := range n.cluster.peers(n.id) {
		go func(peer int) {
			reply := make(chan AppendReply, 1)
			n.cluster.send(peer, message{append: &AppendEntries{
				Term:         termSnapshot,
				LeaderID:     n.id,
				Entries:      nil, // heartbeat rỗng
				LeaderCommit: commit,
				ReplyCh:      reply,
			}})
			select {
			case <-reply:
			case <-time.After(50 * time.Millisecond):
			}
		}(peer)
	}
}

func minInt(a, b int) int {
	if a < b {
		return a
	}
	return b
}

// ---------------------------------------------------------------------------
// Tiện ích quan sát
// ---------------------------------------------------------------------------

func (c *Cluster) currentLeader() *Node {
	c.mu.RLock()
	defer c.mu.RUnlock()
	for _, n := range c.nodes {
		n.mu.Lock()
		isLeader := n.alive && n.state == Leader
		n.mu.Unlock()
		if isLeader {
			return n
		}
	}
	return nil
}

func (c *Cluster) waitForLeader(timeout time.Duration) *Node {
	deadline := time.Now().Add(timeout)
	for time.Now().Before(deadline) {
		if l := c.currentLeader(); l != nil {
			time.Sleep(120 * time.Millisecond) // để leader ổn định
			if l2 := c.currentLeader(); l2 != nil {
				return l2
			}
		}
		time.Sleep(20 * time.Millisecond)
	}
	return nil
}

func (n *Node) kill() {
	n.mu.Lock()
	n.alive = false
	n.state = Follower
	n.mu.Unlock()
}

// ---------------------------------------------------------------------------
// Demo
// ---------------------------------------------------------------------------

func main() {
	const N = 5
	fmt.Printf("=== Mô phỏng Raft: cluster %d node, quorum = %d ===\n\n", N, N/2+1)

	c := newCluster(N)
	for _, node := range c.nodes {
		go node.run()
	}

	// --- 1. Bầu leader đầu tiên ---
	fmt.Println("[1] Bầu leader ban đầu:")
	leader := c.waitForLeader(2 * time.Second)
	if leader == nil {
		fmt.Println("  (không bầu được leader — hiếm, chạy lại)")
		return
	}
	fmt.Printf("  → Leader hiện tại: node %d (term %d)\n\n", leader.id, leader.term)

	// --- 2. Replicate vài command ---
	fmt.Println("[2] Client gửi command, leader replicate:")
	for _, cmd := range []string{"set x=1", "set y=2", "del x"} {
		leader.clientPropose(cmd)
		time.Sleep(120 * time.Millisecond)
	}
	fmt.Printf("  → Log của leader có %d entry, commitIndex=%d\n\n",
		len(leader.log), leader.commitIndex)

	// --- 3. Giết leader → cluster tự re-elect ---
	fmt.Printf("[3] GIẾT leader (node %d) → cluster phải tự bầu lại:\n", leader.id)
	oldLeaderID := leader.id
	oldTerm := leader.term
	leader.kill()

	newLeader := c.waitForLeader(3 * time.Second)
	if newLeader == nil {
		fmt.Println("  (chưa bầu lại được — chạy lại)")
		return
	}
	fmt.Printf("  → Leader MỚI: node %d (term %d > term cũ %d). "+
		"Quorum vẫn đạt vì %d/%d node còn sống ≥ %d.\n\n",
		newLeader.id, newLeader.term, oldTerm, N-1, N, N/2+1)

	// --- 4. Leader mới tiếp tục phục vụ ---
	fmt.Println("[4] Leader mới tiếp tục nhận command:")
	newLeader.clientPropose("set z=3")
	time.Sleep(120 * time.Millisecond)

	fmt.Printf("\n=== Tóm tắt ===\n")
	fmt.Printf("  - Leader cũ node %d đã chết, term %d kết thúc.\n", oldLeaderID, oldTerm)
	fmt.Printf("  - Cluster vẫn hoạt động: 1 node chết / %d → quorum %d vẫn đạt (tolerate (N-1)/2 = %d fail).\n",
		N, N/2+1, (N-1)/2)
	fmt.Printf("  - Đây là tính sẵn sàng (availability) của Raft khi node fail.\n")

	// dừng các goroutine
	for _, node := range c.nodes {
		close(node.stopCh)
	}
	time.Sleep(50 * time.Millisecond)
}
