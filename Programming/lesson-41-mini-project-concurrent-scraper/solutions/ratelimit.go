package main

import (
	"context"
	"sync"
	"time"
)

// TokenBucket là rate limiter giản dị: mỗi giây sinh ra rate token, capacity
// giới hạn tổng số token tích lũy (burst). Wait() block tới khi có token.
//
// Cách hoạt động:
//   - tokens float64 (cho phép fractional), capacity = burst max.
//   - Mỗi lần Wait, tính số token đã refill từ lastRefill tới now: dt * rate.
//   - Nếu đủ 1 token: trừ 1, return ngay.
//   - Nếu thiếu: tính thời gian cần đợi để có 1 token, sleep tới đó.
//
// Implementation này không dùng goroutine background — refill tính lazy mỗi
// lần gọi. Đơn giản hơn dùng golang.org/x/time/rate, đủ cho lesson minh họa.
type TokenBucket struct {
	mu         sync.Mutex
	rate       float64   // tokens per second
	capacity   float64   // max tokens
	tokens     float64   // tokens hiện tại
	lastRefill time.Time // mốc cuối cùng cập nhật tokens
}

// NewTokenBucket: rate = req/s, capacity = burst (ít nhất 1).
func NewTokenBucket(rate float64, capacity int) *TokenBucket {
	if capacity < 1 {
		capacity = 1
	}
	return &TokenBucket{
		rate:       rate,
		capacity:   float64(capacity),
		tokens:     float64(capacity), // bắt đầu đầy
		lastRefill: time.Now(),
	}
}

// Wait block cho đến khi consume được 1 token, hoặc ctx cancel.
func (tb *TokenBucket) Wait(ctx context.Context) error {
	for {
		tb.mu.Lock()
		tb.refill()
		if tb.tokens >= 1 {
			tb.tokens -= 1
			tb.mu.Unlock()
			return nil
		}
		// Tính time cần để có 1 token: (1 - tokens) / rate giây.
		need := 1 - tb.tokens
		wait := time.Duration(need / tb.rate * float64(time.Second))
		tb.mu.Unlock()

		// Sleep nhưng vẫn lắng nghe ctx.
		select {
		case <-ctx.Done():
			return ctx.Err()
		case <-time.After(wait):
			// vòng lặp tiếp tục để refill và thử lại
		}
	}
}

// refill cập nhật tokens dựa trên elapsed time. Phải gọi trong lock.
func (tb *TokenBucket) refill() {
	now := time.Now()
	elapsed := now.Sub(tb.lastRefill).Seconds()
	tb.tokens += elapsed * tb.rate
	if tb.tokens > tb.capacity {
		tb.tokens = tb.capacity
	}
	tb.lastRefill = now
}
