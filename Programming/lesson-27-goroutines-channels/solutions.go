// Lesson 27 — Goroutine và Channel
// Code biên dịch được: go run solutions.go
//
// Minh hoạ mọi pattern trong lesson:
//   1. go keyword cơ bản
//   2. Unbuffered channel handoff
//   3. Buffered channel + producer/consumer
//   4. for range channel + close
//   5. select với timeout
//   6. Worker pool
//   7. Fan-in merge
//   8. Pipeline (gen → square → sum)
//   9. Goroutine leak fix với done channel
//
// Lưu ý: file này dùng `sync.WaitGroup` (sẽ học kỹ ở Lesson 28).
// Ở đây chỉ cần hiểu nó như "counter chờ" — Add(n), Done(), Wait().
package main

import (
	"fmt"
	"sync"
	"time"
)

// ─────────────────────────────────────────────────────────
// 1. go keyword cơ bản
// ─────────────────────────────────────────────────────────

func demo1GoKeyword() {
	fmt.Println("\n── 1. go keyword cơ bản ──")

	// Khởi 2 goroutine, main đợi 1 chút (production sẽ dùng channel/WaitGroup)
	go chao("An")
	go chao("Bình")
	chao("Main")

	time.Sleep(50 * time.Millisecond) // chờ goroutine in xong
}

func chao(ten string) {
	for i := 0; i < 2; i++ {
		fmt.Printf("  Chào %s [%d]\n", ten, i)
	}
}

// ─────────────────────────────────────────────────────────
// 2. Unbuffered channel handoff
// ─────────────────────────────────────────────────────────

func demo2UnbufferedHandoff() {
	fmt.Println("\n── 2. Unbuffered channel handoff ──")

	ch := make(chan int) // cap = 0

	go func() {
		fmt.Println("  [sender] chuẩn bị gửi 42 (sẽ block tới khi receiver ready)")
		ch <- 42 // block ở đây tới khi main nhận
		fmt.Println("  [sender] đã gửi xong 42")
	}()

	time.Sleep(20 * time.Millisecond) // cho sender chạy trước, thấy nó block
	fmt.Println("  [main] receive...")
	v := <-ch
	fmt.Println("  [main] nhận được:", v)
	time.Sleep(10 * time.Millisecond)
}

// ─────────────────────────────────────────────────────────
// 3. Buffered channel
// ─────────────────────────────────────────────────────────

func demo3BufferedChannel() {
	fmt.Println("\n── 3. Buffered channel ──")

	ch := make(chan int, 3) // buffer cap 3

	ch <- 1
	ch <- 2
	ch <- 3
	fmt.Println("  Đã push 3 item, len:", len(ch), "cap:", cap(ch))

	// ch <- 4 sẽ block — comment lại để tránh deadlock

	go func() {
		v := <-ch
		fmt.Println("  Goroutine pop:", v)
	}()
	time.Sleep(10 * time.Millisecond)
	ch <- 4 // bây giờ ok vì buffer còn chỗ
	fmt.Println("  Đã push 4, len:", len(ch))

	close(ch)
	for v := range ch {
		fmt.Println("  Drain:", v)
	}
}

// ─────────────────────────────────────────────────────────
// 4. for range + close
// ─────────────────────────────────────────────────────────

func demo4RangeClose() {
	fmt.Println("\n── 4. for range + close ──")

	ch := make(chan int)
	go func() {
		for i := 1; i <= 5; i++ {
			ch <- i
		}
		close(ch) // quan trọng: producer close
	}()

	for v := range ch { // tự dừng khi ch closed
		fmt.Println("  range got:", v)
	}
	fmt.Println("  channel closed, range thoát")
}

// ─────────────────────────────────────────────────────────
// 5. select + timeout
// ─────────────────────────────────────────────────────────

func demo5SelectTimeout() {
	fmt.Println("\n── 5. select + timeout ──")

	// Case 1: nhận được trong thời gian timeout
	result := callWithTimeout(50*time.Millisecond, 200*time.Millisecond)
	fmt.Println("  Lần 1 (work 50ms, timeout 200ms):", result)

	// Case 2: bị timeout
	result = callWithTimeout(300*time.Millisecond, 100*time.Millisecond)
	fmt.Println("  Lần 2 (work 300ms, timeout 100ms):", result)
}

func callWithTimeout(workDuration, timeout time.Duration) string {
	ch := make(chan string, 1) // buffer 1 → goroutine không leak nếu timeout
	go func() {
		time.Sleep(workDuration)
		ch <- "OK"
	}()

	select {
	case v := <-ch:
		return v
	case <-time.After(timeout):
		return "TIMEOUT"
	}
}

// ─────────────────────────────────────────────────────────
// 6. Worker pool
// ─────────────────────────────────────────────────────────

type Result struct {
	JobID    int
	WorkerID int
}

func demo6WorkerPool() {
	fmt.Println("\n── 6. Worker pool (5 worker, 20 job) ──")

	jobs := make(chan int, 20)
	results := make(chan Result, 20)

	// 5 worker
	for w := 1; w <= 5; w++ {
		go worker(w, jobs, results)
	}

	// push job
	for j := 1; j <= 20; j++ {
		jobs <- j
	}
	close(jobs) // tín hiệu cho worker dừng for range

	// thu thập
	for i := 0; i < 20; i++ {
		r := <-results
		fmt.Printf("  job %2d done by worker %d\n", r.JobID, r.WorkerID)
	}
}

func worker(id int, jobs <-chan int, results chan<- Result) {
	for j := range jobs {
		time.Sleep(10 * time.Millisecond) // giả lập xử lý
		results <- Result{JobID: j, WorkerID: id}
	}
}

// ─────────────────────────────────────────────────────────
// 7. Fan-in merge
// ─────────────────────────────────────────────────────────

func demo7FanIn() {
	fmt.Println("\n── 7. Fan-in: gộp 3 channel ──")

	a := makeSource("A", []int{1, 2, 3})
	b := makeSource("B", []int{10, 20, 30})
	c := makeSource("C", []int{100, 200, 300})

	for v := range merge(a, b, c) {
		fmt.Println("  merged:", v)
	}
}

func makeSource(name string, nums []int) <-chan int {
	out := make(chan int)
	go func() {
		defer close(out)
		for _, n := range nums {
			out <- n
			time.Sleep(5 * time.Millisecond)
		}
		_ = name
	}()
	return out
}

func merge(chans ...<-chan int) <-chan int {
	out := make(chan int)
	var wg sync.WaitGroup
	wg.Add(len(chans))

	for _, ch := range chans {
		go func(c <-chan int) {
			defer wg.Done()
			for v := range c {
				out <- v
			}
		}(ch)
	}

	go func() {
		wg.Wait()
		close(out)
	}()
	return out
}

// ─────────────────────────────────────────────────────────
// 8. Pipeline
// ─────────────────────────────────────────────────────────

func demo8Pipeline() {
	fmt.Println("\n── 8. Pipeline: gen → square → sum ──")

	total := sumStage(squareStage(genStage(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)))
	fmt.Println("  Σ i² (i=1..10) =", total) // 385
}

func genStage(nums ...int) <-chan int {
	out := make(chan int)
	go func() {
		defer close(out)
		for _, n := range nums {
			out <- n
		}
	}()
	return out
}

func squareStage(in <-chan int) <-chan int {
	out := make(chan int)
	go func() {
		defer close(out)
		for v := range in {
			out <- v * v
		}
	}()
	return out
}

func sumStage(in <-chan int) int {
	s := 0
	for v := range in {
		s += v
	}
	return s
}

// ─────────────────────────────────────────────────────────
// 9. Goroutine leak + fix với done channel
// ─────────────────────────────────────────────────────────

func demo9LeakFix() {
	fmt.Println("\n── 9. Done channel chống leak ──")

	done := make(chan struct{})
	defer close(done) // báo cho goroutine sender dừng khi hàm return

	ch := numbersWithDone(done)
	for v := range ch {
		if v >= 5 {
			fmt.Println("  main: break sớm tại", v)
			break
		}
		fmt.Println("  main: got", v)
	}
	// done close trong defer → sender thoát sạch, không leak
	time.Sleep(20 * time.Millisecond) // cho sender kịp log "thoát"
}

func numbersWithDone(done <-chan struct{}) <-chan int {
	out := make(chan int)
	go func() {
		defer close(out)
		defer fmt.Println("  [sender] thoát sạch (không leak)")
		for i := 0; ; i++ {
			select {
			case out <- i:
				// gửi ok
			case <-done:
				return
			}
		}
	}()
	return out
}

// ─────────────────────────────────────────────────────────
// main
// ─────────────────────────────────────────────────────────

func main() {
	fmt.Println("=== Lesson 27 — Goroutine & Channel ===")

	demo1GoKeyword()
	demo2UnbufferedHandoff()
	demo3BufferedChannel()
	demo4RangeClose()
	demo5SelectTimeout()
	demo6WorkerPool()
	demo7FanIn()
	demo8Pipeline()
	demo9LeakFix()

	fmt.Println("\n=== END ===")
}
