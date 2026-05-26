package main

import (
	"context"
	"math"
	"time"
)

// backoffDuration tính thời gian sleep cho attempt thứ N (1-indexed).
// Exponential: attempt 1 → 1s, 2 → 2s, 3 → 4s, ... Cap ở 30s để không đợi quá lâu.
//
// Không jitter trong implementation cơ bản này — production thật nên jitter để
// tránh thundering herd (nhiều client retry cùng lúc).
func backoffDuration(attempt int) time.Duration {
	if attempt < 1 {
		attempt = 1
	}
	secs := math.Pow(2, float64(attempt-1))
	if secs > 30 {
		secs = 30
	}
	return time.Duration(secs * float64(time.Second))
}

// sleepCtx sleep d nhưng abort sớm nếu ctx cancel. Trả true nếu sleep xong
// bình thường, false nếu bị cancel.
func sleepCtx(ctx context.Context, d time.Duration) bool {
	if d <= 0 {
		return true
	}
	t := time.NewTimer(d)
	defer t.Stop()
	select {
	case <-ctx.Done():
		return false
	case <-t.C:
		return true
	}
}
