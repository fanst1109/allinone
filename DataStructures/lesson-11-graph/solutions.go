// Lesson 11 — Graph: lời giải bằng Go.
package main

import "fmt"

// Bài 1 — đếm số thành phần liên thông
func components(g [][]int) int {
	n := len(g)
	visited := make([]bool, n)
	count := 0
	var dfs func(u int)
	dfs = func(u int) {
		visited[u] = true
		for _, v := range g[u] {
			if !visited[v] {
				dfs(v)
			}
		}
	}
	for i := 0; i < n; i++ {
		if !visited[i] {
			count++
			dfs(i)
		}
	}
	return count
}

// Bài 2 — chu trình trong đồ thị có hướng (3 màu)
func hasCycleDirected(g [][]int) bool {
	n := len(g)
	color := make([]int, n)
	var dfs func(u int) bool
	dfs = func(u int) bool {
		color[u] = 1
		for _, v := range g[u] {
			if color[v] == 1 {
				return true
			}
			if color[v] == 0 && dfs(v) {
				return true
			}
		}
		color[u] = 2
		return false
	}
	for i := 0; i < n; i++ {
		if color[i] == 0 && dfs(i) {
			return true
		}
	}
	return false
}

// Bài 3 — BFS shortest path (in path)
func bfsPath(g [][]int, s, t int) []int {
	n := len(g)
	parent := make([]int, n)
	for i := range parent {
		parent[i] = -1
	}
	parent[s] = s
	q := []int{s}
	for len(q) > 0 {
		u := q[0]
		q = q[1:]
		if u == t {
			break
		}
		for _, v := range g[u] {
			if parent[v] == -1 {
				parent[v] = u
				q = append(q, v)
			}
		}
	}
	if parent[t] == -1 {
		return nil
	}
	path := []int{}
	for v := t; v != s; v = parent[v] {
		path = append([]int{v}, path...)
	}
	return append([]int{s}, path...)
}

// Bài 4 — topological sort dùng DFS
func topoSort(g [][]int) []int {
	n := len(g)
	visited := make([]bool, n)
	order := []int{}
	var dfs func(u int)
	dfs = func(u int) {
		visited[u] = true
		for _, v := range g[u] {
			if !visited[v] {
				dfs(v)
			}
		}
		order = append(order, u)
	}
	for i := 0; i < n; i++ {
		if !visited[i] {
			dfs(i)
		}
	}
	for i, j := 0, len(order)-1; i < j; i, j = i+1, j-1 {
		order[i], order[j] = order[j], order[i]
	}
	return order
}

func main() {
	// Đồ thị vô hướng có 2 thành phần: {0,1,2} và {3,4}
	gUndirected := [][]int{
		0: {1, 2}, 1: {0, 2}, 2: {0, 1},
		3: {4}, 4: {3},
	}
	fmt.Println("Bài 1 — components:", components(gUndirected)) // 2

	// Đồ thị có hướng có chu trình: 0 -> 1 -> 2 -> 0
	gDirCycle := [][]int{0: {1}, 1: {2}, 2: {0}}
	gDAG := [][]int{0: {1, 2}, 1: {3}, 2: {3}, 3: {}}
	fmt.Println("Bài 2 — hasCycle (có chu trình):", hasCycleDirected(gDirCycle))
	fmt.Println("Bài 2 — hasCycle (DAG):", hasCycleDirected(gDAG))

	// BFS path trên đồ thị vô hướng
	gPath := [][]int{
		0: {1, 2}, 1: {0, 3}, 2: {0, 3}, 3: {1, 2, 4}, 4: {3},
	}
	fmt.Println("Bài 3 — BFS 0->4:", bfsPath(gPath, 0, 4))

	// Topo sort trên DAG: 0->1->3, 0->2->3
	fmt.Println("Bài 4 — topoSort:", topoSort(gDAG))
}
