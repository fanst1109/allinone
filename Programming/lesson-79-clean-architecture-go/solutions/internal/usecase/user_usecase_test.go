package usecase_test

import (
	"context"
	"errors"
	"testing"

	"cleanarch/internal/domain"
	"cleanarch/internal/usecase"
)

// mockRepo là một in-test implementation của port UserRepository.
// Vì usecase chỉ phụ thuộc interface, ta test được nó MÀ KHÔNG cần DB
// thật, không cần network — đây chính là lợi ích testability của clean arch.
type mockRepo struct {
	saved   map[string]*domain.User
	byEmail map[string]*domain.User
	saveErr error // ép Save trả lỗi để test nhánh lỗi hạ tầng
	findErr error // ép FindByEmail trả lỗi bất thường
}

func newMockRepo() *mockRepo {
	return &mockRepo{
		saved:   map[string]*domain.User{},
		byEmail: map[string]*domain.User{},
	}
}

func (m *mockRepo) Save(_ context.Context, u *domain.User) error {
	if m.saveErr != nil {
		return m.saveErr
	}
	cp := *u
	m.saved[u.ID] = &cp
	m.byEmail[u.Email] = &cp
	return nil
}

func (m *mockRepo) FindByID(_ context.Context, id string) (*domain.User, error) {
	if u, ok := m.saved[id]; ok {
		return u, nil
	}
	return nil, domain.ErrUserNotFound
}

func (m *mockRepo) FindByEmail(_ context.Context, email string) (*domain.User, error) {
	if m.findErr != nil {
		return nil, m.findErr
	}
	if u, ok := m.byEmail[email]; ok {
		return u, nil
	}
	return nil, domain.ErrUserNotFound
}

// stubIDGen là port IDGenerator giả, trả ID cố định để assert dễ dàng.
type stubIDGen struct{ id string }

func (s stubIDGen) NewID() string { return s.id }

func TestRegister_Success(t *testing.T) {
	repo := newMockRepo()
	uc := usecase.New(repo, stubIDGen{id: "u1"})

	u, err := uc.Register(context.Background(), "Alice", "alice@example.com")
	if err != nil {
		t.Fatalf("không mong đợi lỗi: %v", err)
	}
	if u.ID != "u1" || u.Name != "Alice" || u.Email != "alice@example.com" {
		t.Fatalf("user sai: %+v", u)
	}
	if _, ok := repo.saved["u1"]; !ok {
		t.Fatal("user chưa được lưu vào repo")
	}
}

func TestRegister_DuplicateEmail(t *testing.T) {
	repo := newMockRepo()
	uc := usecase.New(repo, stubIDGen{id: "u1"})
	_, _ = uc.Register(context.Background(), "Alice", "a@x.com")

	_, err := uc.Register(context.Background(), "Bob", "a@x.com")
	if !errors.Is(err, domain.ErrEmailTaken) {
		t.Fatalf("mong đợi ErrEmailTaken, nhận: %v", err)
	}
}

func TestRegister_InvalidEmail(t *testing.T) {
	repo := newMockRepo()
	uc := usecase.New(repo, stubIDGen{id: "u1"})

	_, err := uc.Register(context.Background(), "Alice", "khong-co-at")
	if !errors.Is(err, domain.ErrInvalidEmail) {
		t.Fatalf("mong đợi ErrInvalidEmail, nhận: %v", err)
	}
}

func TestRegister_RepoFindError(t *testing.T) {
	repo := newMockRepo()
	repo.findErr = errors.New("db sập")
	uc := usecase.New(repo, stubIDGen{id: "u1"})

	_, err := uc.Register(context.Background(), "Alice", "a@x.com")
	if err == nil || errors.Is(err, domain.ErrEmailTaken) {
		t.Fatalf("mong đợi lỗi hạ tầng được truyền lên, nhận: %v", err)
	}
}

func TestRename_Success(t *testing.T) {
	repo := newMockRepo()
	uc := usecase.New(repo, stubIDGen{id: "u1"})
	_, _ = uc.Register(context.Background(), "Alice", "a@x.com")

	u, err := uc.Rename(context.Background(), "u1", "Alice Smith")
	if err != nil {
		t.Fatalf("không mong đợi lỗi: %v", err)
	}
	if u.Name != "Alice Smith" {
		t.Fatalf("tên chưa đổi: %q", u.Name)
	}
}

func TestRename_NotFound(t *testing.T) {
	repo := newMockRepo()
	uc := usecase.New(repo, stubIDGen{id: "u1"})

	_, err := uc.Rename(context.Background(), "khong-ton-tai", "X")
	if !errors.Is(err, domain.ErrUserNotFound) {
		t.Fatalf("mong đợi ErrUserNotFound, nhận: %v", err)
	}
}

func TestRename_EmptyNameRejected(t *testing.T) {
	repo := newMockRepo()
	uc := usecase.New(repo, stubIDGen{id: "u1"})
	_, _ = uc.Register(context.Background(), "Alice", "a@x.com")

	_, err := uc.Rename(context.Background(), "u1", "   ")
	if !errors.Is(err, domain.ErrEmptyName) {
		t.Fatalf("mong đợi ErrEmptyName, nhận: %v", err)
	}
}
