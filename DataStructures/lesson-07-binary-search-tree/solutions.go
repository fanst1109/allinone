// Lesson 07 — BST: lời giải bằng Go.
package main

import "fmt"

type Node struct {
	val         int
	left, right *Node
}

func insert(n *Node, k int) *Node {
	if n == nil {
		return &Node{val: k}
	}
	switch {
	case k < n.val:
		n.left = insert(n.left, k)
	case k > n.val:
		n.right = insert(n.right, k)
	}
	return n
}

// Bài 2 — validate BST với khoảng [lo, hi]
func isValidBST(root *Node) bool {
	var ok func(n *Node, lo, hi *int) bool
	ok = func(n *Node, lo, hi *int) bool {
		if n == nil {
			return true
		}
		if lo != nil && n.val <= *lo {
			return false
		}
		if hi != nil && n.val >= *hi {
			return false
		}
		return ok(n.left, lo, &n.val) && ok(n.right, &n.val, hi)
	}
	return ok(root, nil, nil)
}

// Bài 3 — in-order successor của k
func successor(root *Node, k int) *Node {
	var s *Node
	for n := root; n != nil; {
		if n.val > k {
			s = n
			n = n.left
		} else {
			n = n.right
		}
	}
	return s
}

// Bài 4 — BST -> sorted slice
func toSorted(n *Node, out *[]int) {
	if n == nil {
		return
	}
	toSorted(n.left, out)
	*out = append(*out, n.val)
	toSorted(n.right, out)
}

// In cây theo level-order, có cấu trúc
func levelDump(root *Node) [][]int {
	if root == nil {
		return nil
	}
	q := []*Node{root}
	out := [][]int{}
	for len(q) > 0 {
		n := len(q)
		line := []int{}
		for i := 0; i < n; i++ {
			x := q[0]
			q = q[1:]
			line = append(line, x.val)
			if x.left != nil {
				q = append(q, x.left)
			}
			if x.right != nil {
				q = append(q, x.right)
			}
		}
		out = append(out, line)
	}
	return out
}

func main() {
	fmt.Println("=== Bài 1: chèn 5,3,8,1,4,7,9 ===")
	var root *Node
	for _, x := range []int{5, 3, 8, 1, 4, 7, 9} {
		root = insert(root, x)
	}
	fmt.Println("level-order:", levelDump(root))

	fmt.Println("\n=== Bài 2: isValidBST ===")
	fmt.Println("BST hợp lệ:", isValidBST(root))
	// Cây sai: 5 - 3 - 6 (6 > 5 nhưng nằm bên trái 5)
	bad := &Node{5, &Node{3, nil, &Node{6, nil, nil}}, &Node{8, nil, nil}}
	fmt.Println("BST hỏng:", isValidBST(bad))

	fmt.Println("\n=== Bài 3: successor ===")
	for _, k := range []int{3, 4, 5, 9, 10} {
		s := successor(root, k)
		if s == nil {
			fmt.Printf("successor(%d) = nil\n", k)
		} else {
			fmt.Printf("successor(%d) = %d\n", k, s.val)
		}
	}

	fmt.Println("\n=== Bài 4: BST -> sorted ===")
	var arr []int
	toSorted(root, &arr)
	fmt.Println(arr)

	fmt.Println("\n=== Bài 5: dãy 1..7 ===")
	var bst *Node
	for x := 1; x <= 7; x++ {
		bst = insert(bst, x)
	}
	fmt.Println("level-order (cây bị lệch hoàn toàn):", levelDump(bst))
}
