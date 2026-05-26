// Lesson 56 — Transaction & Isolation Level
//
// File này mô phỏng IN-MEMORY các semantics của transaction / lock bằng mutex,
// để chạy được mà không cần một database thật. Mỗi phần kèm comment giải thích
// tương ứng với khái niệm trong README.
//
// Chạy:  go run solutions.go
//
// Lưu ý: đây là mô phỏng giáo dục. Code production thật dùng database/sql với
// tx, _ := db.BeginTx(...) — phần cuối file có reference snippet (không build,
// chỉ để đọc) cho đúng API thật.
package main

import (
	"errors"
	"fmt"
	"math/rand"
	"sort"
	"sync"
	"time"
)

// ============================================================================
// Mô hình "database" in-memory: map tài khoản, mỗi tài khoản có 1 mutex riêng
// (mô phỏng row-level lock) và 1 version (cho optimistic lock).
// ============================================================================

type account struct {
	balance int
	version int
	mu      sync.Mutex // mô phỏng SELECT ... FOR UPDATE (row lock)
}

type bank struct {
	mu       sync.Mutex // bảo vệ map chính (mô phỏng table-level structure)
	accounts map[string]*account
}

func newBank() *bank {
	return &bank{accounts: map[string]*account{}}
}

func (b *bank) seed(id string, balance int) {
	b.mu.Lock()
	defer b.mu.Unlock()
	b.accounts[id] = &account{balance: balance}
}

func (b *bank) get(id string) *account {
	b.mu.Lock()
	defer b.mu.Unlock()
	return b.accounts[id]
}

// ============================================================================
// BT1 — Transfer tiền với "transaction" + rollback on error.
//
// Mô phỏng: ta lấy snapshot (oldFrom, oldTo); nếu bất kỳ bước nào lỗi thì
// "rollback" = khôi phục giá trị cũ. Lock cả 2 account để atomic (xem BT5 cho
// vấn đề deadlock khi lock sai thứ tự).
// ============================================================================

var errInsufficient = errors.New("không đủ số dư")

func (b *bank) Transfer(from, to string, amount int) error {
	af, at := b.get(from), b.get(to)
	if af == nil || at == nil {
		return errors.New("tài khoản không tồn tại")
	}

	// Lock theo THỨ TỰ id (lock ordering) để tránh deadlock — xem BT5.
	first, second := af, at
	if from > to {
		first, second = at, af
	}
	first.mu.Lock()
	defer first.mu.Unlock()
	second.mu.Lock()
	defer second.mu.Unlock()

	// "Begin": chụp snapshot để có thể rollback
	oldFrom, oldTo := af.balance, at.balance

	// Kiểm tra ràng buộc nghiệp vụ (Consistency)
	if af.balance < amount {
		// "Rollback": không sửa gì, trả lỗi
		return fmt.Errorf("%w: %s có %d, cần %d", errInsufficient, from, af.balance, amount)
	}

	// Áp dụng thay đổi
	af.balance -= amount
	at.balance += amount

	// Mô phỏng một lỗi giữa chừng (vd: constraint violation khi cộng B).
	// Ở đây nếu amount âm coi như lỗi để minh hoạ rollback.
	if amount < 0 {
		af.balance, at.balance = oldFrom, oldTo // ROLLBACK
		return errors.New("amount âm — rollback")
	}

	// "Commit": thay đổi đã ghi (giữ nguyên), nhả lock qua defer
	return nil
}

// ============================================================================
// BT4 — Optimistic lock với version column.
//
// Đọc trả về (balance, version). Update chỉ thành công nếu version chưa đổi.
// Nếu đổi → trả ErrConflict để caller retry.
// ============================================================================

var ErrConflict = errors.New("optimistic lock conflict: dữ liệu đã bị sửa, hãy thử lại")

func (b *bank) Read(id string) (balance, version int, ok bool) {
	a := b.get(id)
	if a == nil {
		return 0, 0, false
	}
	a.mu.Lock()
	defer a.mu.Unlock()
	return a.balance, a.version, true
}

// UpdateOptimistic: chỉ ghi nếu version khớp expectedVersion.
func (b *bank) UpdateOptimistic(id string, newBalance, expectedVersion int) error {
	a := b.get(id)
	if a == nil {
		return errors.New("không tồn tại")
	}
	a.mu.Lock()
	defer a.mu.Unlock()

	if a.version != expectedVersion {
		// Ai đó đã sửa giữa lúc ta đọc và ghi → conflict.
		return ErrConflict
	}
	a.balance = newBalance
	a.version++ // bump version mỗi lần ghi thành công
	return nil
}

// ============================================================================
// BT5 — Deadlock demo + fix bằng lock ordering.
//
// transferBad lock theo thứ tự (from, to) bất kỳ → khi 2 goroutine transfer
// ngược chiều có thể deadlock. Ở Go thật, deadlock 2 mutex sẽ treo mãi; để demo
// AN TOÀN ta dùng TryLock + timeout mô phỏng "DB detect & abort".
// transferGood luôn lock id nhỏ trước → không bao giờ deadlock.
// ============================================================================

// transferBad: lock đúng theo thứ tự tham số truyền vào (CỐ TÌNH sai).
// Trả về true nếu thành công, false nếu phát hiện khả năng deadlock (bị abort).
func (b *bank) transferBad(from, to string, amount int) bool {
	af, at := b.get(from), b.get(to)
	af.mu.Lock()
	defer af.mu.Unlock()

	// Mô phỏng "DB deadlock detection": cố lấy lock thứ 2 trong giới hạn thời
	// gian; nếu không lấy được (vì goroutine kia đang giữ và đợi mình) → coi
	// như bị abort (DB chọn ta làm victim).
	deadline := time.Now().Add(50 * time.Millisecond)
	for !at.mu.TryLock() {
		if time.Now().After(deadline) {
			return false // bị "abort" — deadlock detected
		}
		time.Sleep(time.Millisecond)
	}
	defer at.mu.Unlock()

	if af.balance >= amount {
		af.balance -= amount
		at.balance += amount
	}
	return true
}

// transferGood: lock ordering — luôn khóa id nhỏ trước → không deadlock.
func (b *bank) transferGood(from, to string, amount int) bool {
	ids := []string{from, to}
	sort.Strings(ids) // luôn cùng thứ tự
	l1, l2 := b.get(ids[0]), b.get(ids[1])
	l1.mu.Lock()
	defer l1.mu.Unlock()
	l2.mu.Lock()
	defer l2.mu.Unlock()

	af, at := b.get(from), b.get(to)
	if af.balance >= amount {
		af.balance -= amount
		at.balance += amount
	}
	return true
}

// ============================================================================
// BT6 — Retry on serialization failure / deadlock.
// ============================================================================

// errRetryable mô phỏng lỗi thoáng qua (serialization failure / deadlock).
var errRetryable = errors.New("serialization failure (retryable)")

// WithRetry chạy fn, retry với exponential backoff nếu lỗi retryable.
func WithRetry(fn func() error, maxRetry int) error {
	var err error
	for attempt := 0; attempt < maxRetry; attempt++ {
		err = fn()
		if err == nil {
			return nil
		}
		if !errors.Is(err, errRetryable) {
			return err // lỗi nghiệp vụ → trả ngay, không phí retry
		}
		base := time.Duration(1<<attempt) * 5 * time.Millisecond
		jitter := time.Duration(rand.Int63n(int64(base) + 1))
		time.Sleep(base + jitter)
	}
	return fmt.Errorf("hết %d lần retry: %w", maxRetry, err)
}

// ============================================================================
// main — chạy demo từng phần
// ============================================================================

func main() {
	fmt.Println("=== Lesson 56 — Transaction & Isolation (mô phỏng in-memory) ===")

	// ---- BT1: Transfer + rollback ----
	fmt.Println("\n--- BT1: Transfer với rollback ---")
	b := newBank()
	b.seed("A", 100)
	b.seed("B", 50)
	fmt.Printf("Trước:  A=%d, B=%d (tổng=%d)\n", b.get("A").balance, b.get("B").balance, b.get("A").balance+b.get("B").balance)
	if err := b.Transfer("A", "B", 30); err != nil {
		fmt.Println("lỗi:", err)
	}
	fmt.Printf("Sau 30: A=%d, B=%d (tổng=%d) ✓ atomic\n", b.get("A").balance, b.get("B").balance, b.get("A").balance+b.get("B").balance)
	if err := b.Transfer("A", "B", 999); err != nil {
		fmt.Println("Transfer 999 bị từ chối (rollback):", err)
	}
	fmt.Printf("Sau khi từ chối: A=%d, B=%d — không đổi ✓\n", b.get("A").balance, b.get("B").balance)

	// ---- BT4: Optimistic lock ----
	fmt.Println("\n--- BT4: Optimistic lock (version column) ---")
	ob := newBank()
	ob.seed("X", 100)
	_, v1, _ := ob.Read("X")
	fmt.Printf("T1 đọc X: version=%d\n", v1)
	_, v2, _ := ob.Read("X")
	fmt.Printf("T2 đọc X: version=%d\n", v2)
	// T1 ghi trước → thành công, version 0→1
	if err := ob.UpdateOptimistic("X", 70, v1); err != nil {
		fmt.Println("T1 ghi lỗi:", err)
	} else {
		fmt.Println("T1 ghi balance=70 OK (version giờ là 1)")
	}
	// T2 ghi với version cũ → conflict
	if err := ob.UpdateOptimistic("X", 200, v2); err != nil {
		fmt.Println("T2 ghi:", err, "→ T2 phải đọc lại & retry")
	}
	_, vNow, _ := ob.Read("X")
	fmt.Printf("T2 đọc lại version=%d rồi retry...\n", vNow)
	if err := ob.UpdateOptimistic("X", 200, vNow); err == nil {
		fmt.Println("T2 retry với version mới → OK")
	}

	// ---- BT5: Deadlock demo + fix ----
	fmt.Println("\n--- BT5: Deadlock (lock sai thứ tự) vs Fix (lock ordering) ---")
	demoDeadlock()

	// ---- BT6: Retry pattern ----
	fmt.Println("\n--- BT6: Retry on serialization failure ---")
	attempts := 0
	err := WithRetry(func() error {
		attempts++
		if attempts < 3 {
			return fmt.Errorf("attempt %d: %w", attempts, errRetryable)
		}
		return nil // lần 3 thành công
	}, 5)
	fmt.Printf("WithRetry kết quả: err=%v sau %d lần thử ✓\n", err, attempts)

	// Lỗi nghiệp vụ không retry
	bizCalls := 0
	bizErr := WithRetry(func() error {
		bizCalls++
		return errInsufficient // không retryable
	}, 5)
	fmt.Printf("Lỗi nghiệp vụ: err=%v, chỉ gọi %d lần (không retry) ✓\n", bizErr, bizCalls)
}

// demoDeadlock chạy nhiều cặp transfer ngược chiều, đếm số lần "bad" bị abort
// (deadlock detected) so với "good" (lock ordering) luôn 0.
func demoDeadlock() {
	const rounds = 200

	// --- BAD: lock theo thứ tự tham số → có thể deadlock ---
	bb := newBank()
	bb.seed("A", 100000)
	bb.seed("B", 100000)
	var aborted int
	var mu sync.Mutex
	var wg sync.WaitGroup
	for i := 0; i < rounds; i++ {
		wg.Add(2)
		go func() {
			defer wg.Done()
			if !bb.transferBad("A", "B", 1) {
				mu.Lock()
				aborted++
				mu.Unlock()
			}
		}()
		go func() {
			defer wg.Done()
			if !bb.transferBad("B", "A", 1) {
				mu.Lock()
				aborted++
				mu.Unlock()
			}
		}()
	}
	wg.Wait()
	fmt.Printf("transferBad  (lock sai thứ tự): %d/%d lần bị 'DB abort' do deadlock\n", aborted, rounds*2)

	// --- GOOD: lock ordering → không bao giờ deadlock ---
	gb := newBank()
	gb.seed("A", 100000)
	gb.seed("B", 100000)
	var wg2 sync.WaitGroup
	for i := 0; i < rounds; i++ {
		wg2.Add(2)
		go func() { defer wg2.Done(); gb.transferGood("A", "B", 1) }()
		go func() { defer wg2.Done(); gb.transferGood("B", "A", 1) }()
	}
	wg2.Wait()
	fmt.Printf("transferGood (lock ordering)   : 0 deadlock, A=%d B=%d (bảo toàn tổng) ✓\n",
		gb.get("A").balance, gb.get("B").balance)
}

/*
================================================================================
REFERENCE — code database/sql THẬT (không build trong file này, chỉ để đọc)
================================================================================

func Transfer(db *sql.DB, from, to string, amount int) error {
    ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
    defer cancel()

    tx, err := db.BeginTx(ctx, &sql.TxOptions{Isolation: sql.LevelSerializable})
    if err != nil {
        return err
    }
    defer tx.Rollback() // an toàn: no-op nếu đã commit

    var bal int
    if err := tx.QueryRowContext(ctx,
        "SELECT balance FROM accounts WHERE id=$1 FOR UPDATE", from,
    ).Scan(&bal); err != nil {
        return err
    }
    if bal < amount {
        return fmt.Errorf("không đủ số dư")
    }
    if _, err := tx.ExecContext(ctx,
        "UPDATE accounts SET balance=balance-$1 WHERE id=$2", amount, from); err != nil {
        return err
    }
    if _, err := tx.ExecContext(ctx,
        "UPDATE accounts SET balance=balance+$1 WHERE id=$2", amount, to); err != nil {
        return err
    }
    return tx.Commit()
}

// Optimistic update thật:
//   UPDATE profiles SET name=$1, version=version+1 WHERE id=$2 AND version=$3
//   nếu RowsAffected()==0 → ErrConflict.

// isRetryable thật (lib/pq):
//   var pqErr *pq.Error
//   errors.As(err, &pqErr) && (pqErr.Code == "40001" || pqErr.Code == "40P01")
================================================================================
*/
