// Lesson 12 — Union-Find: lời giải bằng Go.
package main

import (
	"fmt"
	"sort"
)

type UF struct {
	parent, rank, size []int
}

func NewUF(n int) *UF {
	p := make([]int, n)
	sz := make([]int, n)
	for i := range p {
		p[i] = i
		sz[i] = 1
	}
	return &UF{parent: p, rank: make([]int, n), size: sz}
}

func (u *UF) Find(x int) int {
	if u.parent[x] != x {
		u.parent[x] = u.Find(u.parent[x])
	}
	return u.parent[x]
}

func (u *UF) Union(a, b int) bool {
	ra, rb := u.Find(a), u.Find(b)
	if ra == rb {
		return false
	}
	if u.rank[ra] < u.rank[rb] {
		ra, rb = rb, ra
	}
	u.parent[rb] = ra
	u.size[ra] += u.size[rb]
	if u.rank[ra] == u.rank[rb] {
		u.rank[ra]++
	}
	return true
}

func (u *UF) SizeOf(x int) int { return u.size[u.Find(x)] }

// Bài 2 — đếm nhóm bạn
func friendGroups(n int, pairs [][2]int) int {
	uf := NewUF(n)
	for _, p := range pairs {
		uf.Union(p[0], p[1])
	}
	g := 0
	for i := 0; i < n; i++ {
		if uf.Find(i) == i {
			g++
		}
	}
	return g
}

// Bài 5 — Kruskal MST
type Edge struct{ u, v, w int }

func kruskal(n int, edges []Edge) []Edge {
	sort.Slice(edges, func(i, j int) bool { return edges[i].w < edges[j].w })
	uf := NewUF(n)
	mst := []Edge{}
	for _, e := range edges {
		if uf.Union(e.u, e.v) {
			mst = append(mst, e)
			if len(mst) == n-1 {
				break
			}
		}
	}
	return mst
}

func main() {
	fmt.Println("=== Bài 2: friend groups ===")
	pairs := [][2]int{{0, 1}, {1, 2}, {3, 4}}
	fmt.Println("6 người, 3 cặp bạn -> số nhóm:", friendGroups(6, pairs)) // 3 (0-1-2, 3-4, 5)

	fmt.Println("\n=== Bài 4: SizeOf sau khi union ===")
	u := NewUF(6)
	u.Union(0, 1)
	u.Union(1, 2)
	u.Union(3, 4)
	fmt.Println("Size của tập chứa 0:", u.SizeOf(0)) // 3
	fmt.Println("Size của tập chứa 3:", u.SizeOf(3)) // 2
	fmt.Println("Size của tập chứa 5:", u.SizeOf(5)) // 1

	fmt.Println("\n=== Bài 5: Kruskal MST ===")
	edges := []Edge{
		{0, 1, 4}, {0, 2, 3}, {1, 2, 1}, {1, 3, 2}, {2, 3, 4}, {3, 4, 2},
	}
	mst := kruskal(5, edges)
	total := 0
	for _, e := range mst {
		fmt.Printf("  %d-%d (w=%d)\n", e.u, e.v, e.w)
		total += e.w
	}
	fmt.Printf("Tổng trọng số MST: %d\n", total)
}
