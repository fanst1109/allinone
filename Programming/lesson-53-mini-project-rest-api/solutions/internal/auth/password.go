// Package auth lo việc xác thực: hash mật khẩu, ký/verify JWT, middleware bảo vệ route.
package auth

import (
	"crypto/hmac"
	"crypto/rand"
	"crypto/sha256"
	"crypto/subtle"
	"encoding/base64"
	"errors"
	"fmt"
	"hash"
	"strconv"
	"strings"
)

// newHMACSHA256 tạo PRF HMAC-SHA256 với key cho trước (dùng làm primitive cho PBKDF2).
func newHMACSHA256(key []byte) hash.Hash {
	return hmac.New(sha256.New, key)
}

// LƯU Ý THIẾT KẾ:
// Repo này chạy OFFLINE nên KHÔNG dùng được golang.org/x/crypto/bcrypt.
// Vì vậy ta tự hiện thực PBKDF2-HMAC-SHA256 bằng thuần stdlib (crypto/hmac đã có sẵn).
// PBKDF2 là KDF chuẩn (RFC 8018) — chậm có chủ đích để chống brute-force, đúng tinh thần
// như bcrypt. Trong production thật, nên ưu tiên bcrypt/argon2 (golang.org/x/crypto).

const (
	pbkdf2Iterations = 100_000 // số vòng lặp — càng cao càng chậm verify, càng khó brute-force
	pbkdf2KeyLen     = 32      // độ dài khoá dẫn xuất (bytes)
	pbkdf2SaltLen    = 16      // độ dài salt ngẫu nhiên (bytes)
)

// HashPassword sinh hash dạng PHC-like: "pbkdf2$<iter>$<salt_b64>$<hash_b64>".
// Mỗi mật khẩu có salt ngẫu nhiên riêng → 2 user cùng mật khẩu vẫn cho hash khác nhau.
func HashPassword(password string) (string, error) {
	if password == "" {
		return "", errors.New("mật khẩu rỗng")
	}
	salt := make([]byte, pbkdf2SaltLen)
	if _, err := rand.Read(salt); err != nil {
		return "", fmt.Errorf("sinh salt: %w", err)
	}
	dk := pbkdf2Key([]byte(password), salt, pbkdf2Iterations, pbkdf2KeyLen)
	return fmt.Sprintf("pbkdf2$%d$%s$%s",
		pbkdf2Iterations,
		base64.RawStdEncoding.EncodeToString(salt),
		base64.RawStdEncoding.EncodeToString(dk),
	), nil
}

// VerifyPassword so sánh mật khẩu plaintext với hash đã lưu.
// Dùng subtle.ConstantTimeCompare để chống timing attack.
func VerifyPassword(password, encoded string) bool {
	parts := strings.Split(encoded, "$")
	if len(parts) != 4 || parts[0] != "pbkdf2" {
		return false
	}
	iter, err := strconv.Atoi(parts[1])
	if err != nil || iter <= 0 {
		return false
	}
	salt, err := base64.RawStdEncoding.DecodeString(parts[2])
	if err != nil {
		return false
	}
	want, err := base64.RawStdEncoding.DecodeString(parts[3])
	if err != nil {
		return false
	}
	got := pbkdf2Key([]byte(password), salt, iter, len(want))
	return subtle.ConstantTimeCompare(got, want) == 1
}

// pbkdf2Key hiện thực PBKDF2-HMAC-SHA256 (RFC 8018) bằng thuần stdlib.
// Ý tưởng: lặp đi lặp lại HMAC nhiều vòng để "kéo dài" thời gian tính → chậm có chủ đích.
func pbkdf2Key(password, salt []byte, iter, keyLen int) []byte {
	prf := newHMACSHA256(password)
	hashLen := sha256.Size
	numBlocks := (keyLen + hashLen - 1) / hashLen

	var dk []byte
	buf := make([]byte, 4)
	for block := 1; block <= numBlocks; block++ {
		// U1 = HMAC(password, salt || INT_32_BE(block))
		prf.Reset()
		prf.Write(salt)
		buf[0] = byte(block >> 24)
		buf[1] = byte(block >> 16)
		buf[2] = byte(block >> 8)
		buf[3] = byte(block)
		prf.Write(buf)
		u := prf.Sum(nil)

		t := make([]byte, len(u))
		copy(t, u)

		// U2..Uc = HMAC(password, U_{i-1}); T = U1 XOR U2 XOR ... XOR Uc
		for i := 2; i <= iter; i++ {
			prf.Reset()
			prf.Write(u)
			u = prf.Sum(u[:0])
			for j := range t {
				t[j] ^= u[j]
			}
		}
		dk = append(dk, t...)
	}
	return dk[:keyLen]
}
