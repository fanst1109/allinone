// Package cache mô phỏng tầng cache (Redis) với TTL.
//
// Giống storage, service chỉ phụ thuộc interface `Cache`. Đổi sang Redis thật
// = viết 1 impl dùng go-redis, service không đổi. Đây là minh hoạ cache-aside
// pattern (L58): đọc cache trước, miss thì xuống storage rồi nạp lại cache.
package cache

import (
	"sync"
	"time"
)

// Cache là contract của tầng cache. Value lưu dạng []byte (giống Redis lưu
// string/bytes) — service tự encode/decode JSON. Generic-free để gần Redis thật.
type Cache interface {
	// Get trả về (value, true) nếu key tồn tại và CHƯA hết hạn.
	Get(key string) ([]byte, bool)
	// Set lưu key=value với TTL. ttl <= 0 nghĩa là không hết hạn.
	Set(key string, value []byte, ttl time.Duration)
	// Delete xoá key (dùng cho cache invalidation khi update/delete post).
	Delete(key string)
	// Stats trả về số lần hit / miss — để minh hoạ hiệu quả cache.
	Stats() (hits, misses int64)
}

type entry struct {
	value     []byte
	expiresAt time.Time // zero value = không hết hạn.
}

// MemoryCache — impl in-memory, an toàn goroutine.
type MemoryCache struct {
	mu     sync.Mutex
	data   map[string]entry
	hits   int64
	misses int64
	// now cho phép test inject thời gian giả lập (mặc định time.Now).
	now func() time.Time
}

// NewMemoryCache tạo cache rỗng dùng đồng hồ thật.
func NewMemoryCache() *MemoryCache {
	return &MemoryCache{
		data: make(map[string]entry),
		now:  time.Now,
	}
}

func (c *MemoryCache) Get(key string) ([]byte, bool) {
	c.mu.Lock()
	defer c.mu.Unlock()

	e, ok := c.data[key]
	if !ok {
		c.misses++
		return nil, false
	}
	// Lazy expiration: kiểm tra hết hạn lúc đọc (giống Redis passive expiry).
	if !e.expiresAt.IsZero() && c.now().After(e.expiresAt) {
		delete(c.data, key)
		c.misses++
		return nil, false
	}
	c.hits++
	// Trả copy để caller không sửa được buffer bên trong cache.
	out := make([]byte, len(e.value))
	copy(out, e.value)
	return out, true
}

func (c *MemoryCache) Set(key string, value []byte, ttl time.Duration) {
	c.mu.Lock()
	defer c.mu.Unlock()

	var exp time.Time
	if ttl > 0 {
		exp = c.now().Add(ttl)
	}
	buf := make([]byte, len(value))
	copy(buf, value)
	c.data[key] = entry{value: buf, expiresAt: exp}
}

func (c *MemoryCache) Delete(key string) {
	c.mu.Lock()
	defer c.mu.Unlock()
	delete(c.data, key)
}

func (c *MemoryCache) Stats() (int64, int64) {
	c.mu.Lock()
	defer c.mu.Unlock()
	return c.hits, c.misses
}

// SetClock cho phép test thay đồng hồ để kiểm tra logic TTL mà không phải sleep.
func (c *MemoryCache) SetClock(now func() time.Time) {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.now = now
}
