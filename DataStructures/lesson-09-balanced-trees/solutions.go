// Lesson 09 — AVL tree: cài đặt và in cây.
package main

import "fmt"

type Node struct {
	val         int
	h           int
	left, right *Node
}

func height(n *Node) int {
	if n == nil {
		return -1
	}
	return n.h
}

func updateHeight(n *Node) {
	l := height(n.left)
	r := height(n.right)
	if l > r {
		n.h = 1 + l
	} else {
		n.h = 1 + r
	}
}

func balance(n *Node) int { return height(n.left) - height(n.right) }

// xoay phải tại y
func rotateRight(y *Node) *Node {
	x := y.left
	y.left = x.right
	x.right = y
	updateHeight(y)
	updateHeight(x)
	return x
}

// xoay trái tại x
func rotateLeft(x *Node) *Node {
	y := x.right
	x.right = y.left
	y.left = x
	updateHeight(x)
	updateHeight(y)
	return y
}

func insert(n *Node, k int) *Node {
	if n == nil {
		return &Node{val: k, h: 0}
	}
	if k < n.val {
		n.left = insert(n.left, k)
	} else if k > n.val {
		n.right = insert(n.right, k)
	} else {
		return n // không cho trùng
	}
	updateHeight(n)
	b := balance(n)
	// LL
	if b > 1 && k < n.left.val {
		return rotateRight(n)
	}
	// RR
	if b < -1 && k > n.right.val {
		return rotateLeft(n)
	}
	// LR
	if b > 1 && k > n.left.val {
		n.left = rotateLeft(n.left)
		return rotateRight(n)
	}
	// RL
	if b < -1 && k < n.right.val {
		n.right = rotateRight(n.right)
		return rotateLeft(n)
	}
	return n
}

// In cây level-order, "null" cho ô trống
func dump(root *Node) [][]string {
	if root == nil {
		return nil
	}
	type qe struct {
		n *Node
	}
	q := []qe{{root}}
	out := [][]string{}
	for len(q) > 0 {
		n := len(q)
		line := []string{}
		allNil := true
		next := []qe{}
		for i := 0; i < n; i++ {
			x := q[0].n
			q = q[1:]
			if x == nil {
				line = append(line, "·")
				next = append(next, qe{nil}, qe{nil})
			} else {
				allNil = false
				line = append(line, fmt.Sprintf("%d(h%d,b%d)", x.val, x.h, balance(x)))
				next = append(next, qe{x.left}, qe{x.right})
			}
		}
		out = append(out, line)
		if allNil {
			break
		}
		q = next
	}
	return out
}

func main() {
	var root *Node
	for _, x := range []int{10, 20, 30, 40, 50, 25} {
		root = insert(root, x)
		fmt.Printf("\nSau insert %d:\n", x)
		for _, line := range dump(root) {
			fmt.Println(" ", line)
		}
	}
	fmt.Printf("\nChiều cao cuối: %d (cây cân bằng AVL)\n", height(root))
}
