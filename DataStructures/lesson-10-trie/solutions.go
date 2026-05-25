// Lesson 10 — Trie: lời giải bằng Go.
package main

import "fmt"

type Trie struct {
	children [26]*Trie
	isEnd    bool
	count    int // số chuỗi đi qua node này (cho Bài 2)
}

func New() *Trie { return &Trie{} }

func (t *Trie) Insert(w string) {
	cur := t
	for _, c := range w {
		i := c - 'a'
		if cur.children[i] == nil {
			cur.children[i] = &Trie{}
		}
		cur = cur.children[i]
		cur.count++
	}
	cur.isEnd = true
}

func (t *Trie) Search(w string) bool {
	n := t.findNode(w)
	return n != nil && n.isEnd
}

func (t *Trie) StartsWith(p string) bool { return t.findNode(p) != nil }

func (t *Trie) findNode(s string) *Trie {
	cur := t
	for _, c := range s {
		i := c - 'a'
		if cur.children[i] == nil {
			return nil
		}
		cur = cur.children[i]
	}
	return cur
}

// Bài 2 — đếm chuỗi bắt đầu bằng prefix
func (t *Trie) CountPrefix(p string) int {
	n := t.findNode(p)
	if n == nil {
		return 0
	}
	return n.count
}

// Bài 3 — liệt kê các từ bắt đầu bằng prefix
func (t *Trie) WordsWithPrefix(p string) []string {
	n := t.findNode(p)
	out := []string{}
	if n == nil {
		return out
	}
	var dfs func(node *Trie, cur string)
	dfs = func(node *Trie, cur string) {
		if node.isEnd {
			out = append(out, cur)
		}
		for i, ch := range node.children {
			if ch != nil {
				dfs(ch, cur+string(rune('a'+i)))
			}
		}
	}
	dfs(n, p)
	return out
}

// Bài 4 — xóa một từ. Trả về true nếu node hiện tại có thể xóa được.
func (t *Trie) Delete(w string) bool {
	if !t.Search(w) {
		return false
	}
	var del func(node *Trie, w string, i int) bool
	del = func(node *Trie, w string, i int) bool {
		if i == len(w) {
			node.isEnd = false
		} else {
			ci := w[i] - 'a'
			child := node.children[ci]
			if del(child, w, i+1) {
				node.children[ci] = nil
			}
		}
		// node có thể xóa nếu không là cuối từ và không còn con
		if node.isEnd {
			return false
		}
		for _, c := range node.children {
			if c != nil {
				return false
			}
		}
		return true
	}
	del(t, w, 0)
	return true
}

func main() {
	t := New()
	for _, w := range []string{"cat", "car", "cart", "cup", "cope", "code", "coder"} {
		t.Insert(w)
	}

	fmt.Println("Search cat:", t.Search("cat"))
	fmt.Println("Search ca:", t.Search("ca"))
	fmt.Println("StartsWith ca:", t.StartsWith("ca"))
	fmt.Println("CountPrefix co:", t.CountPrefix("co")) // cope, code, coder
	fmt.Println("WordsWithPrefix co:", t.WordsWithPrefix("co"))

	t.Delete("car")
	fmt.Println("\nSau khi xóa 'car':")
	fmt.Println("Search car:", t.Search("car"))
	fmt.Println("Search cart:", t.Search("cart")) // vẫn còn
	fmt.Println("WordsWithPrefix ca:", t.WordsWithPrefix("ca"))
}
