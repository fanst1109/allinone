// solutions.go — Lesson 47: TLS & Crypto Basics
//
// File này minh hoạ các primitive crypto của stdlib Go bằng các demo chạy được
// trong console. Chạy:
//
//	go run solutions.go
//
// Nội dung demo (tương ứng các bài tập trong README):
//   - HMAC-SHA256 sign / verify (constant-time qua hmac.Equal)
//   - AES-GCM encrypt / decrypt với random nonce (crypto/rand)
//   - generateToken: token 32 byte ngẫu nhiên, trả hex
//   - hash demo: so sánh đặc tính SHA-256 (one-way, avalanche)
//
// LƯU Ý AN TOÀN: đây là code minh hoạ học tập. Key trong demo được sinh ngẫu
// nhiên runtime; production phải lấy key từ KMS / secret manager (xem mục 10
// trong README), KHÔNG hardcode.
package main

import (
	"bytes"
	"crypto/aes"
	"crypto/cipher"
	"crypto/hmac"
	"crypto/rand" // crypto/rand: random an toàn cho secrets — KHÔNG dùng math/rand
	"crypto/sha256"
	"encoding/base64"
	"encoding/hex"
	"errors"
	"fmt"
)

// ---------------------------------------------------------------------------
// 1. HMAC-SHA256 — message authentication code
// ---------------------------------------------------------------------------

// Sign tính HMAC-SHA256 của msg bằng key, trả về tag dạng hex.
// Dùng để ký webhook payload (Stripe/GitHub), ký cookie session, JWT HS256...
func Sign(msg, key []byte) string {
	h := hmac.New(sha256.New, key) // HMAC bọc key đúng cách, chống length-extension
	h.Write(msg)
	return hex.EncodeToString(h.Sum(nil))
}

// Verify kiểm tra tag (hex) có khớp với HMAC của msg không.
// QUAN TRỌNG: dùng hmac.Equal (so sánh constant-time) thay vì bytes.Equal,
// để tránh timing attack làm lộ dần từng byte tag đúng.
func Verify(msg, key []byte, tag string) bool {
	raw, err := hex.DecodeString(tag)
	if err != nil {
		return false
	}
	expected := hmac.New(sha256.New, key)
	expected.Write(msg)
	return hmac.Equal(raw, expected.Sum(nil))
}

// ---------------------------------------------------------------------------
// 2. AES-GCM — symmetric authenticated encryption
// ---------------------------------------------------------------------------

// Encrypt mã hoá plaintext bằng AES-GCM với key (16/24/32 byte → AES-128/192/256).
// Mỗi lần gọi sinh MỘT nonce ngẫu nhiên 12 byte mới (crypto/rand) — nonce reuse
// với AES-GCM là thảm hoạ (lộ XOR plaintext + lộ auth key). Output base64-url
// gồm: nonce || ciphertext || tag.
func Encrypt(plaintext, key []byte) (string, error) {
	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}
	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return "", err
	}
	nonce := make([]byte, gcm.NonceSize()) // NonceSize() == 12 cho GCM chuẩn
	if _, err := rand.Read(nonce); err != nil {
		return "", err
	}
	// Seal(dst, nonce, plaintext, additionalData): prepend nonce vào dst để lưu kèm.
	ct := gcm.Seal(nonce, nonce, plaintext, nil)
	return base64.RawURLEncoding.EncodeToString(ct), nil
}

// Decrypt giải mã token (base64-url) bằng key. Tách nonce ở đầu, phần còn lại là
// ciphertext+tag. gcm.Open tự verify auth tag — nếu ciphertext bị sửa 1 bit hoặc
// sai key, trả về error (không trả plaintext rác).
func Decrypt(token string, key []byte) ([]byte, error) {
	raw, err := base64.RawURLEncoding.DecodeString(token)
	if err != nil {
		return nil, err
	}
	block, err := aes.NewCipher(key)
	if err != nil {
		return nil, err
	}
	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return nil, err
	}
	n := gcm.NonceSize()
	if len(raw) < n {
		return nil, errors.New("token quá ngắn")
	}
	nonce, ct := raw[:n], raw[n:]
	return gcm.Open(nil, nonce, ct, nil)
}

// ---------------------------------------------------------------------------
// 3. generateToken — token ngẫu nhiên 32 byte (256 bit), trả hex
// ---------------------------------------------------------------------------

// generateToken trả về token 32 byte ngẫu nhiên dưới dạng 64 ký tự hex.
// Dùng crypto/rand (OS entropy: getrandom / /dev/urandom). KHÔNG dùng math/rand
// cho token: math/rand predictable, biết vài output là đoán được phần còn lại.
func generateToken() (string, error) {
	b := make([]byte, 32) // 32 byte = 256 bit entropy
	if _, err := rand.Read(b); err != nil {
		return "", err
	}
	return hex.EncodeToString(b), nil
}

// ---------------------------------------------------------------------------
// 4. hashDemo — minh hoạ đặc tính của SHA-256
// ---------------------------------------------------------------------------

// hashDemo in ra hash SHA-256 của một input và một input chỉ khác 1 ký tự, để
// thấy "avalanche effect": đổi nhỏ input → hash thay đổi hoàn toàn. SHA-256
// one-way (không phục hồi input từ hash) và tính rất nhanh → KHÔNG dùng cho
// password (dùng bcrypt/argon2id, xem README mục 9).
func hashDemo() {
	a := sha256.Sum256([]byte("transfer $100 to Alice"))
	b := sha256.Sum256([]byte("transfer $100 to Alicf")) // đổi 1 ký tự cuối
	fmt.Printf("  SHA-256(\"...Alice\") = %x\n", a)
	fmt.Printf("  SHA-256(\"...Alicf\") = %x\n", b)

	// Đếm số byte khác nhau giữa 2 hash (avalanche: thường ~50% khác).
	diff := 0
	for i := range a {
		if a[i] != b[i] {
			diff++
		}
	}
	fmt.Printf("  → đổi 1 ký tự input làm thay đổi %d/32 byte của hash (avalanche)\n", diff)
}

func main() {
	fmt.Println("=== Lesson 47 — TLS & Crypto Basics: demo crypto primitives ===")

	// --- HMAC-SHA256 ---
	fmt.Println("\n[1] HMAC-SHA256 sign/verify")
	hmacKey := []byte("webhook-shared-secret")
	body := []byte(`{"event":"payment.succeeded","amount":1000}`)
	tag := Sign(body, hmacKey)
	fmt.Printf("  tag = %s\n", tag)
	fmt.Printf("  Verify(đúng body)      = %v (mong đợi true)\n", Verify(body, hmacKey, tag))
	tampered := []byte(`{"event":"payment.succeeded","amount":9999}`)
	fmt.Printf("  Verify(body bị sửa)    = %v (mong đợi false)\n", Verify(tampered, hmacKey, tag))
	fmt.Printf("  Verify(sai key)        = %v (mong đợi false)\n", Verify(body, []byte("wrong-key"), tag))

	// --- AES-GCM với random nonce ---
	fmt.Println("\n[2] AES-GCM encrypt/decrypt (random nonce)")
	aesKey := make([]byte, 32) // AES-256
	if _, err := rand.Read(aesKey); err != nil {
		panic(err)
	}
	plaintext := []byte("SSN: 123-45-6789")

	// Encrypt cùng plaintext 3 lần → 3 ciphertext KHÁC nhau (vì nonce ngẫu nhiên).
	fmt.Println("  Encrypt cùng plaintext 3 lần (random nonce → 3 token khác nhau):")
	seen := make(map[string]bool)
	for i := 0; i < 3; i++ {
		tok, err := Encrypt(plaintext, aesKey)
		if err != nil {
			panic(err)
		}
		seen[tok] = true
		fmt.Printf("    token #%d = %s\n", i+1, tok)
		// Decrypt lại để chắc chắn round-trip đúng.
		got, err := Decrypt(tok, aesKey)
		if err != nil {
			panic(err)
		}
		if !bytes.Equal(got, plaintext) {
			panic("decrypt không khớp plaintext!")
		}
	}
	fmt.Printf("  → %d/3 token là duy nhất (mong đợi 3)\n", len(seen))

	// Sửa 1 byte token → Decrypt phải fail (auth tag không khớp).
	tok, _ := Encrypt(plaintext, aesKey)
	corrupted := []byte(tok)
	if corrupted[0] == 'A' {
		corrupted[0] = 'B'
	} else {
		corrupted[0] = 'A'
	}
	if _, err := Decrypt(string(corrupted), aesKey); err != nil {
		fmt.Printf("  Decrypt token bị sửa  → error (đúng): %v\n", err)
	} else {
		fmt.Println("  CẢNH BÁO: token bị sửa vẫn decrypt được — sai!")
	}

	// --- generateToken ---
	fmt.Println("\n[3] generateToken — token 32 byte (256 bit) hex")
	for i := 0; i < 3; i++ {
		t, err := generateToken()
		if err != nil {
			panic(err)
		}
		fmt.Printf("  token = %s (len=%d hex chars)\n", t, len(t))
	}

	// --- hash demo ---
	fmt.Println("\n[4] SHA-256 hash demo (one-way + avalanche)")
	hashDemo()

	fmt.Println("\nXong. Xem visualization.html để minh hoạ tương tác TLS handshake, cert chain, hash compare.")
}
