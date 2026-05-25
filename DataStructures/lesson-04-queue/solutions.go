// Lesson 04 — Queue: lời giải bằng Go.
package main

import "fmt"

// Bài 1 — circular queue.
type CircQueue struct {
	data       []int
	front, size, cap int
}

func NewCircQueue(c int) *CircQueue { return &CircQueue{data: make([]int, c), cap: c} }
func (q *CircQueue) Enqueue(x int) bool {
	if q.size == q.cap {
		return false
	}
	q.data[(q.front+q.size)%q.cap] = x
	q.size++
	return true
}
func (q *CircQueue) Dequeue() (int, bool) {
	if q.size == 0 {
		return 0, false
	}
	x := q.data[q.front]
	q.front = (q.front + 1) % q.cap
	q.size--
	return x, true
}

// Bài 2 — Queue bằng 2 stack, amortized O(1).
type QueueFromStacks struct{ in, out []int }

func (q *QueueFromStacks) Enqueue(x int) { q.in = append(q.in, x) }
func (q *QueueFromStacks) Dequeue() (int, bool) {
	if len(q.out) == 0 {
		for len(q.in) > 0 {
			n := len(q.in) - 1
			q.out = append(q.out, q.in[n])
			q.in = q.in[:n]
		}
	}
	if len(q.out) == 0 {
		return 0, false
	}
	n := len(q.out) - 1
	x := q.out[n]
	q.out = q.out[:n]
	return x, true
}

// Bài 4 — trung bình K số gần nhất, O(1) mỗi thao tác.
type MovingAverage struct {
	q     []int
	k     int
	sum   int
}

func NewMovingAverage(k int) *MovingAverage { return &MovingAverage{k: k} }
func (m *MovingAverage) Next(x int) float64 {
	m.q = append(m.q, x)
	m.sum += x
	if len(m.q) > m.k {
		m.sum -= m.q[0]
		m.q = m.q[1:]
	}
	return float64(m.sum) / float64(len(m.q))
}

// Bài 5 — mô phỏng BFS in ra thứ tự thăm.
func bfs(graph map[string][]string, start string) []string {
	visited := map[string]bool{start: true}
	queue := []string{start}
	order := []string{}
	for len(queue) > 0 {
		u := queue[0]
		queue = queue[1:]
		order = append(order, u)
		for _, v := range graph[u] {
			if !visited[v] {
				visited[v] = true
				queue = append(queue, v)
			}
		}
	}
	return order
}

func main() {
	fmt.Println("=== Bài 1: Circular queue ===")
	q := NewCircQueue(3)
	q.Enqueue(1); q.Enqueue(2); q.Enqueue(3)
	fmt.Println(q.Enqueue(4)) // false: đầy
	v, _ := q.Dequeue()
	fmt.Println("dequeue:", v) // 1
	q.Enqueue(4)               // ok: vòng
	for {
		v, ok := q.Dequeue()
		if !ok {
			break
		}
		fmt.Print(v, " ")
	}
	fmt.Println()

	fmt.Println("\n=== Bài 2: Queue từ 2 stack ===")
	qs := &QueueFromStacks{}
	qs.Enqueue(1); qs.Enqueue(2); qs.Enqueue(3)
	v, _ = qs.Dequeue(); fmt.Print(v, " ")
	qs.Enqueue(4)
	for {
		v, ok := qs.Dequeue()
		if !ok {
			break
		}
		fmt.Print(v, " ")
	}
	fmt.Println()

	fmt.Println("\n=== Bài 4: Moving average k=3 ===")
	ma := NewMovingAverage(3)
	for _, x := range []int{1, 10, 3, 5, 8, 12} {
		fmt.Printf("add %d -> avg=%.2f\n", x, ma.Next(x))
	}

	fmt.Println("\n=== Bài 5: BFS ===")
	g := map[string][]string{
		"A": {"B", "C"},
		"B": {"A", "D", "E"},
		"C": {"A", "E"},
		"D": {"B"},
		"E": {"B", "C"},
	}
	fmt.Println(bfs(g, "A"))
}
