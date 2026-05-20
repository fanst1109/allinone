// Lesson 06 — Tree: lời giải bằng Go.
package main

import "fmt"

type Node struct {
	val         int
	left, right *Node
}

// Helper xây cây mẫu:
//         1
//        / \
//       2   3
//      / \   \
//     4   5   6
func sample() *Node {
	return &Node{1,
		&Node{2, &Node{4, nil, nil}, &Node{5, nil, nil}},
		&Node{3, nil, &Node{6, nil, nil}},
	}
}

// Bài 1 — đếm số node
func countNodes(n *Node) int {
	if n == nil {
		return 0
	}
	return 1 + countNodes(n.left) + countNodes(n.right)
}

// Bài 2 — cây đối xứng
func isSymmetric(root *Node) bool {
	var mirror func(a, b *Node) bool
	mirror = func(a, b *Node) bool {
		if a == nil && b == nil {
			return true
		}
		if a == nil || b == nil {
			return false
		}
		return a.val == b.val && mirror(a.left, b.right) && mirror(a.right, b.left)
	}
	if root == nil {
		return true
	}
	return mirror(root.left, root.right)
}

// Bài 3 — level-order, mỗi tầng một slice riêng
func levelOrderByLines(root *Node) [][]int {
	if root == nil {
		return nil
	}
	out := [][]int{}
	q := []*Node{root}
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

// Bài 4 — đường kính
func diameter(root *Node) int {
	best := 0
	var h func(n *Node) int
	h = func(n *Node) int {
		if n == nil {
			return -1
		}
		l := h(n.left)
		r := h(n.right)
		if l+r+2 > best {
			best = l + r + 2
		}
		if l > r {
			return 1 + l
		}
		return 1 + r
	}
	h(root)
	return best
}

// Bài 5 — bốn cách duyệt
func preorder(n *Node, out *[]int) {
	if n == nil {
		return
	}
	*out = append(*out, n.val)
	preorder(n.left, out)
	preorder(n.right, out)
}
func inorder(n *Node, out *[]int) {
	if n == nil {
		return
	}
	inorder(n.left, out)
	*out = append(*out, n.val)
	inorder(n.right, out)
}
func postorder(n *Node, out *[]int) {
	if n == nil {
		return
	}
	postorder(n.left, out)
	postorder(n.right, out)
	*out = append(*out, n.val)
}

func main() {
	t := sample()
	fmt.Println("Bài 1 — countNodes:", countNodes(t)) // 6
	fmt.Println("Bài 2 — isSymmetric(sample):", isSymmetric(t))
	fmt.Println("Bài 3 — level-order theo dòng:", levelOrderByLines(t))
	fmt.Println("Bài 4 — diameter:", diameter(t))

	var a, b, c []int
	preorder(t, &a)
	inorder(t, &b)
	postorder(t, &c)
	fmt.Println("Bài 5 — preorder:", a)
	fmt.Println("Bài 5 — inorder:", b)
	fmt.Println("Bài 5 — postorder:", c)
}
