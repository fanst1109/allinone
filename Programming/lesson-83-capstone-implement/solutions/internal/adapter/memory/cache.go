package memory

import (
	"context"
	"sync"
	"time"
)

// Cache là bản in-memory của usecase.Cache (cache-aside cho redirect).
// Production: thay bằng RedisCache (GET/SETEX). Interface giữ nguyên nên
// usecase không đổi.
//
// Có hỗ trợ TTL đơn giản: lưu thời điểm hết hạn, đọc thì kiểm tra lazy.
type Cache struct {
	mu    sync.RWMutex
	items map[string]cacheItem
	clock func() time.Time
}

type cacheItem struct {
	original  string
	expiresAt time.Time // zero = không hết hạn
}

// NewCache khởi tạo cache rỗng.
func NewCache() *Cache {
	return &Cache{items: make(map[string]cacheItem), clock: time.Now}
}

// GetURL trả original; ok=false nếu miss hoặc đã hết hạn.
func (c *Cache) GetURL(_ context.Context, code string) (string, bool) {
	c.mu.RLock()
	it, ok := c.items[code]
	c.mu.RUnlock()
	if !ok {
		return "", false
	}
	if !it.expiresAt.IsZero() && c.clock().After(it.expiresAt) {
		// Lazy eviction: hết hạn thì coi như miss và xóa.
		c.mu.Lock()
		delete(c.items, code)
		c.mu.Unlock()
		return "", false
	}
	return it.original, true
}

// SetURL ghi vào cache với ttl (0 = không hết hạn).
func (c *Cache) SetURL(_ context.Context, code, original string, ttl time.Duration) {
	var exp time.Time
	if ttl > 0 {
		exp = c.clock().Add(ttl)
	}
	c.mu.Lock()
	c.items[code] = cacheItem{original: original, expiresAt: exp}
	c.mu.Unlock()
}
