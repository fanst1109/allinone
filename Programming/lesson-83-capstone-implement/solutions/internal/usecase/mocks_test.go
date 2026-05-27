package usecase

import (
	"context"
	"sync"
	"time"

	"urlshortener/internal/domain"
)

// --- Mock cho các port, dùng trong unit test usecase ---
// Đây là minh họa "test usecase với mock" (Lesson 38): không cần DB thật,
// chỉ cần struct thỏa interface và kiểm soát được hành vi.

// mockRepo là URLRepository giả dựa trên map.
type mockRepo struct {
	mu      sync.Mutex
	data    map[string]*domain.URL
	counter uint64
	saveErr error // ép Save trả lỗi (test nhánh lỗi)
}

func newMockRepo() *mockRepo { return &mockRepo{data: map[string]*domain.URL{}} }

func (m *mockRepo) Save(_ context.Context, u *domain.URL) error {
	if m.saveErr != nil {
		return m.saveErr
	}
	m.mu.Lock()
	defer m.mu.Unlock()
	cp := *u
	m.data[u.Code] = &cp
	return nil
}

func (m *mockRepo) FindByCode(_ context.Context, code string) (*domain.URL, error) {
	m.mu.Lock()
	defer m.mu.Unlock()
	u, ok := m.data[code]
	if !ok {
		return nil, domain.ErrURLNotFound
	}
	cp := *u
	return &cp, nil
}

func (m *mockRepo) Exists(_ context.Context, code string) (bool, error) {
	m.mu.Lock()
	defer m.mu.Unlock()
	_, ok := m.data[code]
	return ok, nil
}

func (m *mockRepo) NextID(_ context.Context) (uint64, error) {
	m.mu.Lock()
	defer m.mu.Unlock()
	m.counter++
	return m.counter, nil
}

// mockCache ghi nhận Set/Get để kiểm tra cache-aside có hoạt động.
type mockCache struct {
	mu       sync.Mutex
	data     map[string]string
	setCalls int
	getCalls int
}

func newMockCache() *mockCache { return &mockCache{data: map[string]string{}} }

func (m *mockCache) GetURL(_ context.Context, code string) (string, bool) {
	m.mu.Lock()
	defer m.mu.Unlock()
	m.getCalls++
	v, ok := m.data[code]
	return v, ok
}

func (m *mockCache) SetURL(_ context.Context, code, original string, _ time.Duration) {
	m.mu.Lock()
	defer m.mu.Unlock()
	m.setCalls++
	m.data[code] = original
}

// mockQueue thu thập click event đã enqueue (không cần worker).
type mockQueue struct {
	mu     sync.Mutex
	events []domain.Click
}

func (m *mockQueue) Enqueue(c domain.Click) {
	m.mu.Lock()
	defer m.mu.Unlock()
	m.events = append(m.events, c)
}

func (m *mockQueue) count() int {
	m.mu.Lock()
	defer m.mu.Unlock()
	return len(m.events)
}

// mockStore là StatsStore giả trả về snapshot cố định.
type mockStore struct {
	snap *domain.Stats
}

func (m *mockStore) Snapshot(_ context.Context, _ string) (*domain.Stats, error) {
	return m.snap, nil
}

// fixedClock trả thời gian cố định (test xác định).
type fixedClock struct{ t time.Time }

func (c fixedClock) Now() time.Time { return c.t }
