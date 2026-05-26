// Package solutions — Lesson 38 (Mocking & Test Doubles).
//
// File này chứa code SUT (system under test) — các interface, struct, hàm
// production và một FAKE in-memory store. Mock được đặt trong solutions_test.go
// vì chúng chỉ phục vụ test.
//
// Chạy test: `go test -v` trong thư mục này.
package solutions

import (
	"errors"
	"fmt"
	"sync"
	"time"
)

// ============================================================
// Domain model
// ============================================================

// User là entity chính xuyên suốt các bài tập.
type User struct {
	ID    int
	Name  string
	Email string
}

// Account dùng cho BT4 (mock time).
type Account struct {
	ID        int
	ExpiresAt time.Time
}

// Lỗi chuẩn dùng chung.
var (
	ErrNotFound   = errors.New("not found")
	ErrEmptyName  = errors.New("name empty")
	ErrBadEmail   = errors.New("invalid email")
	ErrEmptyInbox = errors.New("inbox empty")
)

// ============================================================
// Interfaces — "accept interface, return struct"
// ============================================================
//
// Tất cả interface định nghĩa Ở ĐÂY (consumer side), không nằm trong
// package implementation. Mục đích: consumer chỉ khai báo method nó cần.

// UserStore là dependency persistence của UserService và NotifyService.
// Production sẽ có Postgres impl; test dùng MockUserStore (spy) hoặc
// InMemoryUserStore (fake).
type UserStore interface {
	Get(id int) (*User, error)
	Save(u *User) error
	Delete(id int) error
}

// EmailSender là dependency gửi email của NotifyService.
// Production: SMTP / SendGrid client. Test: MockEmailSender (spy).
type EmailSender interface {
	Send(to, subject, body string) error
}

// ============================================================
// PostgresUserStore — STUB production (giả vờ kết nối Postgres)
// ============================================================

// PostgresUserStore tượng trưng cho impl production. Trong lesson này
// nó chỉ là placeholder — không thực sự kết nối DB (sẽ học ở Tier 5).
// Mục đích: minh họa rằng phía production có impl thật, test dùng impl khác.
type PostgresUserStore struct {
	dsn string // data source name
}

// NewPostgresUserStore tạo store. Production gọi với DSN thật.
func NewPostgresUserStore(dsn string) *PostgresUserStore {
	return &PostgresUserStore{dsn: dsn}
}

// Get giả vờ query DB. Trong lesson này chỉ return ErrNotFound — không quan
// trọng vì test sẽ không bao giờ chạy code này (test dùng mock/fake).
func (p *PostgresUserStore) Get(id int) (*User, error) {
	return nil, fmt.Errorf("postgres connect to %s: %w", p.dsn, ErrNotFound)
}
func (p *PostgresUserStore) Save(u *User) error    { return nil }
func (p *PostgresUserStore) Delete(id int) error   { return nil }

// ============================================================
// InMemoryUserStore — FAKE (chạy logic thật, đơn giản hóa)
// ============================================================

// InMemoryUserStore là FAKE — implement đầy đủ UserStore nhưng dùng map
// in-memory. Dùng trong test khi cần state qua nhiều bước (CRUD workflow).
//
// Có mutex để chịu test parallel.
type InMemoryUserStore struct {
	mu     sync.RWMutex
	users  map[int]*User
	nextID int
}

// NewInMemoryUserStore khởi tạo store rỗng.
func NewInMemoryUserStore() *InMemoryUserStore {
	return &InMemoryUserStore{users: make(map[int]*User)}
}

// Get lấy user theo ID. Trả ErrNotFound nếu không có.
// Copy struct trước khi return để test không vô tình mutate state nội bộ.
func (s *InMemoryUserStore) Get(id int) (*User, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	u, ok := s.users[id]
	if !ok {
		return nil, ErrNotFound
	}
	cp := *u
	return &cp, nil
}

// Save tạo mới (nếu ID == 0) hoặc cập nhật. Tự sinh ID tăng dần.
// Copy struct trước khi lưu để caller không thể mutate object sau khi save.
func (s *InMemoryUserStore) Save(u *User) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	if u.ID == 0 {
		s.nextID++
		u.ID = s.nextID
	}
	cp := *u
	s.users[u.ID] = &cp
	return nil
}

// Delete xóa user. Idempotent — xóa cái không tồn tại không lỗi.
func (s *InMemoryUserStore) Delete(id int) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	delete(s.users, id)
	return nil
}

// Len trả số user hiện có — tiện cho test assert.
func (s *InMemoryUserStore) Len() int {
	s.mu.RLock()
	defer s.mu.RUnlock()
	return len(s.users)
}

// ============================================================
// UserService — dùng UserStore qua DI constructor
// ============================================================

// UserService là business layer cho CRUD user. Phụ thuộc UserStore qua
// interface → có thể test với fake/mock.
type UserService struct {
	store UserStore
}

// NewUserService — constructor injection.
func NewUserService(store UserStore) *UserService {
	return &UserService{store: store}
}

// CreateUser validate input rồi gọi store.Save. Trả ID mới.
func (s *UserService) CreateUser(name, email string) (int, error) {
	if name == "" {
		return 0, ErrEmptyName
	}
	if !validEmail(email) {
		return 0, ErrBadEmail
	}
	u := &User{Name: name, Email: email}
	if err := s.store.Save(u); err != nil {
		return 0, err
	}
	return u.ID, nil
}

// RenameUser load user, đổi tên, save lại. Workflow nhiều bước —
// minh họa lý do FAKE tốt hơn MOCK cho test này.
func (s *UserService) RenameUser(id int, newName string) error {
	if newName == "" {
		return ErrEmptyName
	}
	u, err := s.store.Get(id)
	if err != nil {
		return err
	}
	u.Name = newName
	return s.store.Save(u)
}

// GetUser pass-through helper.
func (s *UserService) GetUser(id int) (*User, error) {
	return s.store.Get(id)
}

// validEmail kiểm tra cơ bản: có '@' và có '.' sau '@'.
// Không production-grade — chỉ minh họa.
func validEmail(e string) bool {
	at := -1
	for i := 0; i < len(e); i++ {
		if e[i] == '@' {
			at = i
			break
		}
	}
	if at <= 0 || at >= len(e)-1 {
		return false
	}
	for i := at + 1; i < len(e); i++ {
		if e[i] == '.' && i < len(e)-1 {
			return true
		}
	}
	return false
}

// ============================================================
// NotifyService — phụ thuộc 2 interface: UserStore + EmailSender
// ============================================================

// NotifyService gửi notification cho user. Phụ thuộc:
//   - UserStore: để lookup email từ ID.
//   - EmailSender: để gửi.
//
// Cả 2 inject qua constructor → test thay bằng mock dễ dàng.
type NotifyService struct {
	store UserStore
	email EmailSender
}

// NewNotifyService — constructor injection 2 dependency.
func NewNotifyService(store UserStore, email EmailSender) *NotifyService {
	return &NotifyService{store: store, email: email}
}

// NotifyUser load user rồi gửi mail welcome. Nếu store fail → không gửi mail.
// Test sẽ verify đúng tính chất "không gửi nếu load fail".
func (n *NotifyService) NotifyUser(id int) error {
	u, err := n.store.Get(id)
	if err != nil {
		return fmt.Errorf("load user %d: %w", id, err)
	}
	subject := fmt.Sprintf("Welcome %s!", u.Name)
	body := fmt.Sprintf("Hi %s, your account is ready.", u.Name)
	return n.email.Send(u.Email, subject, body)
}

// NotifyAll loop qua slice ID, gửi notification cho từng user.
// Đếm số mail đã gửi thành công.
// Nếu Send fail giữa chừng vẫn tiếp tục các ID còn lại (best-effort).
func (n *NotifyService) NotifyAll(ids []int) (sent int, errs []error) {
	for _, id := range ids {
		if err := n.NotifyUser(id); err != nil {
			errs = append(errs, err)
			continue
		}
		sent++
	}
	return sent, errs
}

// ============================================================
// ExpiryChecker — BT4: mock time qua injectable now func
// ============================================================

// ExpiryChecker kiểm tra account đã expire chưa. now là hàm trả thời gian
// "hiện tại" — production gán = time.Now; test gán hàm trả giờ cố định.
//
// Đặt now là FIELD (không phải package var) để test parallel an toàn —
// mỗi instance có now riêng, không race.
type ExpiryChecker struct {
	now func() time.Time
}

// NewExpiryChecker tạo checker dùng time.Now thật.
func NewExpiryChecker() *ExpiryChecker {
	return &ExpiryChecker{now: time.Now}
}

// NewExpiryCheckerWithClock cho phép test inject fake clock.
func NewExpiryCheckerWithClock(now func() time.Time) *ExpiryChecker {
	return &ExpiryChecker{now: now}
}

// IsExpired trả true nếu thời điểm "now" không còn TRƯỚC ExpiresAt nữa.
// Tức là now >= ExpiresAt → expired.
func (e *ExpiryChecker) IsExpired(a *Account) bool {
	return !e.now().Before(a.ExpiresAt)
}

// DaysUntilExpiry trả số ngày từ "now" đến ExpiresAt. Âm = đã expired.
func (e *ExpiryChecker) DaysUntilExpiry(a *Account) int {
	d := a.ExpiresAt.Sub(e.now())
	return int(d / (24 * time.Hour))
}

// ============================================================
// SumPrices — BT6: pure function, KHÔNG cần mock
// ============================================================

// SumPrices cộng tổng prices. Pure function — input → output, không side
// effect. Test bằng input/output trực tiếp, không mock cộng số.
func SumPrices(prices []int) int {
	s := 0
	for _, p := range prices {
		s += p
	}
	return s
}
