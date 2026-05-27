// Package base62 sinh "short code" cho URL.
//
// Vì sao base62? Bộ ký tự [0-9A-Za-z] = 62 ký tự, an toàn cho URL
// (không cần encode), và "dày" hơn base16/base10 nên code ngắn hơn.
// Ví dụ: 7 ký tự base62 = 62^7 ≈ 3.5 nghìn tỷ tổ hợp — thừa dùng.
//
// Hai chiến lược sinh code (lesson nói rõ trade-off):
//
//  1. Counter -> Encode: lấy một số nguyên tăng dần (auto-increment từ DB
//     hoặc counter Redis INCR) rồi mã hóa sang base62. ƯU: không bao giờ
//     trùng, code ngắn dần đều. NHƯỢC: lộ thứ tự (đoán được URL kế tiếp),
//     cần một nguồn counter tập trung.
//
//  2. Random: sinh ngẫu nhiên 7 ký tự. ƯU: không lộ thứ tự, không cần
//     counter tập trung. NHƯỢC: phải xử lý va chạm (collision) — kiểm tra
//     repo, nếu trùng thì sinh lại.
//
// Ở đây ta cung cấp cả hai; usecase quyết định dùng cái nào.
package base62

import (
	"crypto/rand"
	"math/big"
	"strings"
)

const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

// base = 62.
const base = uint64(len(alphabet)) // = 62

// Encode mã hóa một số nguyên không dấu sang chuỗi base62.
//
// Walk-through với n = 125:
//
//	125 / 62 = 2 dư 1  -> ký tự alphabet[1] = '1'
//	  2 / 62 = 0 dư 2  -> ký tự alphabet[2] = '2'
//	dừng vì thương = 0. Ghép ngược: "21".
//
// Kiểm tra: 2*62 + 1 = 125 ✓.
func Encode(n uint64) string {
	if n == 0 {
		return string(alphabet[0]) // "0"
	}
	var sb strings.Builder
	// Build các chữ số base62 theo thứ tự ngược (least-significant trước).
	digits := make([]byte, 0, 11)
	for n > 0 {
		rem := n % base
		digits = append(digits, alphabet[rem])
		n /= base
	}
	// Đảo ngược lại cho most-significant lên đầu.
	for i := len(digits) - 1; i >= 0; i-- {
		sb.WriteByte(digits[i])
	}
	return sb.String()
}

// EncodePadded giống Encode nhưng đảm bảo độ dài tối thiểu minLen bằng cách
// chèn '0' (alphabet[0]) ở đầu. Hữu ích để code "trông đều" (vd luôn 7 ký tự).
func EncodePadded(n uint64, minLen int) string {
	s := Encode(n)
	if len(s) >= minLen {
		return s
	}
	return strings.Repeat(string(alphabet[0]), minLen-len(s)) + s
}

// Random sinh chuỗi base62 ngẫu nhiên độ dài n bằng crypto/rand
// (an toàn, không đoán trước được — khác math/rand).
//
// Mỗi ký tự là một index ngẫu nhiên trong [0, 62). Ta dùng big.Int để lấy
// số ngẫu nhiên không thiên lệch (unbiased) trong khoảng [0, 62).
func Random(n int) (string, error) {
	if n <= 0 {
		n = 7 // mặc định 7 ký tự
	}
	var sb strings.Builder
	sb.Grow(n)
	max := big.NewInt(int64(base))
	for i := 0; i < n; i++ {
		idx, err := rand.Int(rand.Reader, max)
		if err != nil {
			return "", err
		}
		sb.WriteByte(alphabet[idx.Int64()])
	}
	return sb.String(), nil
}
