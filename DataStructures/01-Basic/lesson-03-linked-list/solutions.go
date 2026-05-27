// Lesson 02 — Linked List: lời giải bằng Go.
// Chạy: go run solutions.go
package main

import "fmt"

type Node struct {
	val  int
	next *Node
}

// fromSlice tạo singly list từ slice.
func fromSlice(xs []int) *Node {
	dummy := &Node{}
	tail := dummy
	for _, x := range xs {
		tail.next = &Node{val: x}
		tail = tail.next
	}
	return dummy.next
}

func toSlice(h *Node) []int {
	out := []int{}
	for cur := h; cur != nil; cur = cur.next {
		out = append(out, cur.val)
	}
	return out
}

// Bài 1 — độ dài, O(n).
func length(h *Node) int {
	n := 0
	for cur := h; cur != nil; cur = cur.next {
		n++
	}
	return n
}

// Bài 2 — đảo ngược in-place, O(n) thời gian, O(1) bộ nhớ.
func reverse(h *Node) *Node {
	var prev *Node
	cur := h
	for cur != nil {
		nxt := cur.next
		cur.next = prev
		prev = cur
		cur = nxt
	}
	return prev
}

// Bài 3 — trộn hai list đã sort, O(m+n).
func merge(a, b *Node) *Node {
	dummy := &Node{}
	tail := dummy
	for a != nil && b != nil {
		if a.val <= b.val {
			tail.next = a
			a = a.next
		} else {
			tail.next = b
			b = b.next
		}
		tail = tail.next
	}
	if a != nil {
		tail.next = a
	} else {
		tail.next = b
	}
	return dummy.next
}

// Bài 4 — Floyd cycle detection.
func hasCycle(h *Node) bool {
	slow, fast := h, h
	for fast != nil && fast.next != nil {
		slow = slow.next
		fast = fast.next.next
		if slow == fast {
			return true
		}
	}
	return false
}

func main() {
	a := fromSlice([]int{1, 2, 3, 4, 5})
	fmt.Println("Bài 1 — length:", length(a)) // 5

	a = reverse(a)
	fmt.Println("Bài 2 — reverse:", toSlice(a)) // [5 4 3 2 1]

	l1 := fromSlice([]int{1, 3, 5, 7})
	l2 := fromSlice([]int{2, 4, 6, 8, 10})
	fmt.Println("Bài 3 — merge:", toSlice(merge(l1, l2))) // [1..10]

	// Tạo list có chu trình: 1 -> 2 -> 3 -> 4 -> 2
	n1 := &Node{val: 1}
	n2 := &Node{val: 2}
	n3 := &Node{val: 3}
	n4 := &Node{val: 4}
	n1.next, n2.next, n3.next, n4.next = n2, n3, n4, n2
	fmt.Println("Bài 4 — hasCycle (có vòng):", hasCycle(n1))         // true
	fmt.Println("Bài 4 — hasCycle (không vòng):", hasCycle(fromSlice([]int{1, 2, 3}))) // false
}
