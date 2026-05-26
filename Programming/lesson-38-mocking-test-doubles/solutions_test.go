// Tests cho Lesson 38 — Mocking & Test Doubles.
//
// File này chứa:
//   - Hand-written mocks (MockUserStore, MockEmailSender) — chỉ tồn tại
//     trong test file để không leak vào production binary.
//   - Test cases cho mọi bài tập (BT1..BT6).
//
// Chạy: go test -v
package solutions

import (
	"errors"
	"strings"
	"testing"
	"time"
)

// ============================================================
// HAND-WRITTEN MOCKS (chỉ dùng trong test)
// ============================================================

// MockUserStore là mock hand-written cho UserStore. Pattern function-field:
// mỗi method có một function-pointer field cho phép test inject behavior.
// Spy field đếm số call và lưu argument cuối.
type MockUserStore struct {
	GetFunc    func(id int) (*User, error)
	SaveFunc   func(u *User) error
	DeleteFunc func(id int) error

	// Spy fields:
	GetCalls    int
	SaveCalls   int
	DeleteCalls int

	LastGetID    int
	LastSaved    *User
	LastDeleteID int
}

func (m *MockUserStore) Get(id int) (*User, error) {
	m.GetCalls++
	m.LastGetID = id
	if m.GetFunc != nil {
		return m.GetFunc(id)
	}
	return nil, nil
}
func (m *MockUserStore) Save(u *User) error {
	m.SaveCalls++
	cp := *u
	m.LastSaved = &cp
	if m.SaveFunc != nil {
		return m.SaveFunc(u)
	}
	return nil
}
func (m *MockUserStore) Delete(id int) error {
	m.DeleteCalls++
	m.LastDeleteID = id
	if m.DeleteFunc != nil {
		return m.DeleteFunc(id)
	}
	return nil
}

// EmailCall capture argument cho mỗi lần Send (BT1).
type EmailCall struct {
	To      string
	Subject string
	Body    string
}

// MockEmailSender là mock hand-written cho EmailSender (BT1).
type MockEmailSender struct {
	SendCount int
	LastCall  EmailCall
	AllCalls  []EmailCall
	SendFunc  func(to, subject, body string) error
}

func (m *MockEmailSender) Send(to, subject, body string) error {
	c := EmailCall{To: to, Subject: subject, Body: body}
	m.SendCount++
	m.LastCall = c
	m.AllCalls = append(m.AllCalls, c)
	if m.SendFunc != nil {
		return m.SendFunc(to, subject, body)
	}
	return nil
}

// ============================================================
// BT1 — MockEmailSender hoạt động đúng (spy count + capture)
// ============================================================

func TestBT1_MockEmailSender_SpyCount(t *testing.T) {
	m := &MockEmailSender{}

	_ = m.Send("a@x.com", "Hi", "body1")
	_ = m.Send("b@x.com", "Hello", "body2")

	if m.SendCount != 2 {
		t.Errorf("SendCount = %d, want 2", m.SendCount)
	}
	if m.LastCall.To != "b@x.com" {
		t.Errorf("LastCall.To = %q, want b@x.com", m.LastCall.To)
	}
	if len(m.AllCalls) != 2 {
		t.Errorf("AllCalls len = %d, want 2", len(m.AllCalls))
	}
	if m.AllCalls[0].Subject != "Hi" {
		t.Errorf("AllCalls[0].Subject = %q, want Hi", m.AllCalls[0].Subject)
	}
}

func TestBT1_MockEmailSender_InjectError(t *testing.T) {
	want := errors.New("smtp down")
	m := &MockEmailSender{
		SendFunc: func(to, subject, body string) error { return want },
	}
	got := m.Send("a@x.com", "", "")
	if !errors.Is(got, want) {
		t.Errorf("Send returned %v, want %v", got, want)
	}
	if m.SendCount != 1 {
		t.Errorf("SendCount = %d, want 1", m.SendCount)
	}
}

// ============================================================
// BT2 — NotifyService.NotifyUser với mock
// ============================================================

func TestBT2_NotifyUser_HappyPath(t *testing.T) {
	store := &MockUserStore{
		GetFunc: func(id int) (*User, error) {
			return &User{ID: id, Name: "alice", Email: "alice@x.com"}, nil
		},
	}
	email := &MockEmailSender{}
	svc := NewNotifyService(store, email)

	if err := svc.NotifyUser(42); err != nil {
		t.Fatalf("NotifyUser: %v", err)
	}

	// Verify store gọi đúng:
	if store.GetCalls != 1 {
		t.Errorf("store.GetCalls = %d, want 1", store.GetCalls)
	}
	if store.LastGetID != 42 {
		t.Errorf("store.LastGetID = %d, want 42", store.LastGetID)
	}

	// Verify email gọi đúng tham số:
	if email.SendCount != 1 {
		t.Fatalf("email.SendCount = %d, want 1", email.SendCount)
	}
	if email.LastCall.To != "alice@x.com" {
		t.Errorf("To = %q, want alice@x.com", email.LastCall.To)
	}
	if !strings.Contains(email.LastCall.Subject, "Welcome") {
		t.Errorf("Subject = %q, muốn chứa Welcome", email.LastCall.Subject)
	}
	if !strings.Contains(email.LastCall.Body, "alice") {
		t.Errorf("Body = %q, muốn chứa alice", email.LastCall.Body)
	}
}

func TestBT2_NotifyUser_StoreErrorSkipsEmail(t *testing.T) {
	storeErr := errors.New("db down")
	store := &MockUserStore{
		GetFunc: func(int) (*User, error) { return nil, storeErr },
	}
	email := &MockEmailSender{}
	svc := NewNotifyService(store, email)

	err := svc.NotifyUser(42)
	if err == nil {
		t.Fatal("muốn error, được nil")
	}
	if !errors.Is(err, storeErr) {
		t.Errorf("err = %v, muốn wrap storeErr", err)
	}

	// QUAN TRỌNG: email KHÔNG được gọi nếu load fail:
	if email.SendCount != 0 {
		t.Errorf("email.SendCount = %d, muốn 0 khi store fail", email.SendCount)
	}
}

func TestBT2_NotifyAll_PartialFailure(t *testing.T) {
	store := &MockUserStore{
		GetFunc: func(id int) (*User, error) {
			if id == 2 {
				return nil, ErrNotFound
			}
			return &User{ID: id, Name: "u", Email: "u@x.com"}, nil
		},
	}
	email := &MockEmailSender{}
	svc := NewNotifyService(store, email)

	sent, errs := svc.NotifyAll([]int{1, 2, 3})

	if sent != 2 {
		t.Errorf("sent = %d, want 2", sent)
	}
	if len(errs) != 1 {
		t.Errorf("len(errs) = %d, want 1", len(errs))
	}
	if email.SendCount != 2 {
		t.Errorf("email.SendCount = %d, want 2", email.SendCount)
	}
}

// ============================================================
// BT3 — InMemoryUserStore (FAKE) + UserService workflow
// ============================================================

func TestBT3_UserService_CreateGetRename(t *testing.T) {
	store := NewInMemoryUserStore()
	svc := NewUserService(store)

	id, err := svc.CreateUser("alice", "alice@x.com")
	if err != nil {
		t.Fatalf("CreateUser: %v", err)
	}
	if id == 0 {
		t.Fatal("ID = 0, muốn > 0")
	}

	u, err := svc.GetUser(id)
	if err != nil {
		t.Fatalf("GetUser: %v", err)
	}
	if u.Name != "alice" {
		t.Errorf("Name = %q, want alice", u.Name)
	}

	if err := svc.RenameUser(id, "ALICE"); err != nil {
		t.Fatalf("RenameUser: %v", err)
	}

	u2, _ := svc.GetUser(id)
	if u2.Name != "ALICE" {
		t.Errorf("Sau rename Name = %q, want ALICE", u2.Name)
	}
}

func TestBT3_UserService_ValidationErrors(t *testing.T) {
	svc := NewUserService(NewInMemoryUserStore())

	cases := []struct {
		name    string
		uName   string
		uEmail  string
		wantErr error
	}{
		{"empty name", "", "a@b.com", ErrEmptyName},
		{"bad email - no @", "alice", "alicex.com", ErrBadEmail},
		{"bad email - no dot", "alice", "alice@xcom", ErrBadEmail},
		{"bad email - @ ở cuối", "alice", "alice@", ErrBadEmail},
	}
	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			_, err := svc.CreateUser(c.uName, c.uEmail)
			if !errors.Is(err, c.wantErr) {
				t.Errorf("err = %v, want %v", err, c.wantErr)
			}
		})
	}
}

func TestBT3_InMemoryUserStore_DefensiveCopy(t *testing.T) {
	// FAKE phải copy struct khi save / load — caller mutate không ảnh hưởng nội bộ.
	store := NewInMemoryUserStore()
	u := &User{Name: "alice", Email: "alice@x.com"}
	_ = store.Save(u)

	// Mutate user sau khi save:
	u.Name = "HACKED"

	got, _ := store.Get(u.ID)
	if got.Name != "alice" {
		t.Errorf("Defensive copy bị thủng: store giữ %q, muốn alice", got.Name)
	}
}

// ============================================================
// BT4 — Mock time.Now
// ============================================================

func TestBT4_IsExpired(t *testing.T) {
	deadline := time.Date(2025, 6, 1, 0, 0, 0, 0, time.UTC)
	acc := &Account{ID: 1, ExpiresAt: deadline}

	cases := []struct {
		name string
		now  time.Time
		want bool
	}{
		{"trước 1 giờ — chưa expired", deadline.Add(-1 * time.Hour), false},
		{"trước 1 giây — chưa expired", deadline.Add(-1 * time.Second), false},
		{"đúng deadline — expired", deadline, true},
		{"sau 1 giây — expired", deadline.Add(1 * time.Second), true},
		{"sau 1 năm — expired", deadline.Add(365 * 24 * time.Hour), true},
	}
	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			now := c.now // capture for closure
			chk := NewExpiryCheckerWithClock(func() time.Time { return now })
			if got := chk.IsExpired(acc); got != c.want {
				t.Errorf("now=%v want=%v got=%v", c.now, c.want, got)
			}
		})
	}
}

func TestBT4_DaysUntilExpiry(t *testing.T) {
	deadline := time.Date(2025, 6, 10, 0, 0, 0, 0, time.UTC)
	acc := &Account{ExpiresAt: deadline}

	cases := []struct {
		name string
		now  time.Time
		want int
	}{
		{"trước 5 ngày", deadline.Add(-5 * 24 * time.Hour), 5},
		{"trước 1 ngày", deadline.Add(-24 * time.Hour), 1},
		{"sau 1 ngày", deadline.Add(24 * time.Hour), -1},
	}
	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			now := c.now
			chk := NewExpiryCheckerWithClock(func() time.Time { return now })
			if got := chk.DaysUntilExpiry(acc); got != c.want {
				t.Errorf("now=%v want=%d got=%d", c.now, c.want, got)
			}
		})
	}
}

// ============================================================
// BT5 — Mock với mockgen (HƯỚNG DẪN, không chạy ở đây)
// ============================================================
//
// Để chạy mockgen:
//
//   go install go.uber.org/mock/mockgen@latest
//   mockgen -source=solutions.go -destination=mocks/user_mock.go -package=mocks
//
// Code test sẽ trông như:
//
//   ctrl := gomock.NewController(t)
//   store := mocks.NewMockUserStore(ctrl)
//   store.EXPECT().Get(42).Return(&User{ID: 42, Email: "a@b.com"}, nil)
//
//   svc := NewNotifyService(store, &MockEmailSender{})
//   _ = svc.NotifyUser(42)
//
// Test này chỉ là sanity check: hand-written MockUserStore tương đương về behavior.
func TestBT5_HandWritten_Equivalent_To_Mockgen(t *testing.T) {
	store := &MockUserStore{
		GetFunc: func(id int) (*User, error) {
			if id != 42 {
				t.Errorf("Get called with %d, expect 42", id)
			}
			return &User{ID: 42, Email: "a@b.com"}, nil
		},
	}
	email := &MockEmailSender{}
	svc := NewNotifyService(store, email)

	if err := svc.NotifyUser(42); err != nil {
		t.Fatal(err)
	}
	if store.GetCalls != 1 || email.SendCount != 1 {
		t.Errorf("Get=%d Send=%d, want 1/1", store.GetCalls, email.SendCount)
	}
}

// ============================================================
// BT6 — Refactor anti-pattern: test pure function trực tiếp
// ============================================================

func TestBT6_SumPrices_Correct(t *testing.T) {
	cases := []struct {
		name string
		in   []int
		want int
	}{
		{"empty", []int{}, 0},
		{"một phần tử", []int{10}, 10},
		{"nhiều phần tử", []int{10, 20, 15}, 45},
		{"có số 0", []int{0, 5, 0}, 5},
		{"có số âm", []int{10, -3, 5}, 12},
	}
	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			got := SumPrices(c.in)
			if got != c.want {
				t.Errorf("SumPrices(%v) = %d, want %d", c.in, got, c.want)
			}
		})
	}
}

// ============================================================
// Bonus — Demo "khi đổi UserStore impl, test không thay đổi"
// ============================================================
//
// UserService chấp nhận bất kỳ UserStore nào. Test này chạy CÙNG service
// trên cả FAKE (InMemory) lẫn MOCK (hand-written) → verify "interface
// segregation" thực sự cho phép swap impl.

func TestBonus_UserService_WorksWith_Fake_And_Mock(t *testing.T) {
	t.Run("with fake", func(t *testing.T) {
		svc := NewUserService(NewInMemoryUserStore())
		id, _ := svc.CreateUser("bob", "bob@x.com")
		u, _ := svc.GetUser(id)
		if u.Name != "bob" {
			t.Fail()
		}
	})

	t.Run("with mock", func(t *testing.T) {
		saved := &User{}
		store := &MockUserStore{
			SaveFunc: func(u *User) error {
				if u.ID == 0 {
					u.ID = 99
				}
				cp := *u
				saved = &cp
				return nil
			},
			GetFunc: func(id int) (*User, error) {
				if id != saved.ID {
					return nil, ErrNotFound
				}
				cp := *saved
				return &cp, nil
			},
		}
		svc := NewUserService(store)
		id, _ := svc.CreateUser("bob", "bob@x.com")
		if id != 99 {
			t.Errorf("ID = %d, want 99 (theo mock)", id)
		}
		u, _ := svc.GetUser(id)
		if u.Name != "bob" {
			t.Fail()
		}
	})
}
