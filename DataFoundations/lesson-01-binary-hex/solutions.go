// Package main — lời giải Lesson 01: Binary & Hex.
//
// Cách chạy:
//
//	go run solutions.go
package main

import (
	"fmt"
	"strconv"
)

// toBinaryString trả về biểu diễn nhị phân 8 ký tự của n.
// Cách 1: dùng phép chia / mod (Bài 7).
func toBinaryString(n uint8) string {
	bits := make([]byte, 8)
	for i := 7; i >= 0; i-- {
		if n%2 == 1 {
			bits[i] = '1'
		} else {
			bits[i] = '0'
		}
		n /= 2
	}
	return string(bits)
}

// toBinaryStringBitwise — cùng kết quả nhưng dùng bitwise (sẽ học ở Lesson 02).
// Đưa vào đây để tham khảo, cách viết "Go-idiomatic" hơn.
func toBinaryStringBitwise(n uint8) string {
	bits := make([]byte, 8)
	for i := 7; i >= 0; i-- {
		if n&1 == 1 {
			bits[i] = '1'
		} else {
			bits[i] = '0'
		}
		n >>= 1
	}
	return string(bits)
}

// fromBinaryString chuyển chuỗi "01101010" thành số uint8.
// Trả về error nếu chuỗi không hợp lệ.
func fromBinaryString(s string) (uint8, error) {
	if len(s) == 0 || len(s) > 8 {
		return 0, fmt.Errorf("chuỗi phải có 1..8 ký tự, nhận: %d", len(s))
	}
	var n uint8 = 0
	for _, c := range s {
		switch c {
		case '0':
			n = n * 2
		case '1':
			n = n*2 + 1
		default:
			return 0, fmt.Errorf("ký tự không hợp lệ: %c", c)
		}
	}
	return n, nil
}

// toHexString trả về biểu diễn hex viết hoa, không có prefix "0x".
// Padding với "0" để đủ minWidth ký tự (vd minWidth=2 cho byte).
func toHexString(n uint64, minWidth int) string {
	if n == 0 && minWidth == 0 {
		return "0"
	}
	const hexDigits = "0123456789ABCDEF"
	// 16 ký tự đủ cho uint64.
	buf := make([]byte, 0, 16)
	for n > 0 {
		buf = append(buf, hexDigits[n%16])
		n /= 16
	}
	// Pad
	for len(buf) < minWidth {
		buf = append(buf, '0')
	}
	// Đảo ngược (vì ta append từ chữ số thấp).
	for i, j := 0, len(buf)-1; i < j; i, j = i+1, j-1 {
		buf[i], buf[j] = buf[j], buf[i]
	}
	return string(buf)
}

// twosComplement8 trả về bit pattern 8-bit của số có dấu x ở dạng two's complement.
// Kiểu uint8 chỉ chứa bit pattern; bạn diễn giải nó là int8 hay uint8 là tùy ngữ cảnh.
func twosComplement8(x int) uint8 {
	// Cách Go làm: ép kiểu int → int8 → uint8.
	// Nhưng ta minh họa thủ công theo đúng quy tắc "đảo + 1".
	if x >= 0 {
		return uint8(x)
	}
	// |x| ở dạng uint8
	abs := uint8(-x)
	// Đảo bit thủ công: ^ là XOR; XOR với 0xFF = đảo toàn bộ 8 bit.
	inverted := abs ^ 0xFF
	// Cộng 1.
	return inverted + 1
}

// detectOverflowInt8 mô phỏng wrap-around khi cộng hai int8.
// Trả về kết quả (đã wrap) và cờ overflow.
func detectOverflowInt8(a, b int8) (int8, bool) {
	// Tính bằng int (rộng hơn) rồi so sánh phạm vi.
	sum := int(a) + int(b)
	overflow := sum < -128 || sum > 127
	return int8(sum), overflow
}

func main() {
	// === Bài 1: decimal → binary 8-bit ===
	fmt.Println("=== Bài 1: decimal → binary 8-bit ===")
	for _, n := range []uint8{0, 1, 7, 15, 100, 255} {
		fmt.Printf("  %3d → %s\n", n, toBinaryString(n))
	}

	// === Bài 2: binary → decimal ===
	fmt.Println("\n=== Bài 2: binary → decimal ===")
	for _, s := range []string{"1010", "11111", "10000000", "01010101"} {
		n, _ := fromBinaryString(s)
		// Để xem hai cách đọc 10000000:
		fmt.Printf("  %s → uint8=%d, int8=%d\n", s, n, int8(n))
	}

	// === Bài 3: hex → binary / decimal ===
	fmt.Println("\n=== Bài 3: hex → binary / decimal ===")
	for _, hex := range []string{"10", "FF", "1A3", "DEAD"} {
		n, _ := strconv.ParseUint(hex, 16, 64)
		fmt.Printf("  0x%-4s → dec=%-6d bin=%b\n", hex, n, n)
	}

	// === Bài 4: two's complement 8-bit ===
	fmt.Println("\n=== Bài 4: two's complement 8-bit ===")
	for _, x := range []int{-1, -2, -127, -128} {
		bits := twosComplement8(x)
		fmt.Printf("  %4d → %s (uint8=%d)\n", x, toBinaryString(bits), bits)
	}
	// Kiểm tra -128 + 127 = -1
	bits128 := twosComplement8(-128)
	bits127 := twosComplement8(127)
	sum := bits128 + bits127 // cộng kiểu uint8, overflow tự bị cắt
	fmt.Printf("  -128 + 127 = bit %s = int8(%d)\n",
		toBinaryString(sum), int8(sum))

	// === Bài 5: overflow int8 ===
	fmt.Println("\n=== Bài 5: overflow int8 ===")
	var x int8 = -128
	xMinus1 := x - 1
	fmt.Printf("  int8(-128) - 1 = %d   (đáng lẽ -129, nhưng wrap)\n", xMinus1)
	// Mô phỏng tổng quát:
	res, of := detectOverflowInt8(-128, -1)
	fmt.Printf("  detectOverflowInt8(-128, -1) → res=%d overflow=%v\n", res, of)
	res, of = detectOverflowInt8(100, 50)
	fmt.Printf("  detectOverflowInt8(100,  50) → res=%d overflow=%v\n", res, of)

	// === Bài 6: 5 MB decimal so với MiB ===
	fmt.Println("\n=== Bài 6: 5 MB (decimal) bằng bao nhiêu MiB ===")
	mbDecimal := 5 * 1_000_000.0
	mib := mbDecimal / (1 << 20) // 1 << 20 = 2^20 = 1 048 576
	fmt.Printf("  5 MB = %.0f bytes = %.2f MiB\n", mbDecimal, mib)

	// === Bài 7: toBinaryString ===
	fmt.Println("\n=== Bài 7: toBinaryString ===")
	for _, n := range []uint8{0, 1, 42, 170, 255} {
		fmt.Printf("  %3d → divmod: %s  bitwise: %s\n",
			n, toBinaryString(n), toBinaryStringBitwise(n))
	}

	// === Bonus: in hex thủ công ===
	fmt.Println("\n=== Bonus: toHexString ===")
	for _, n := range []uint64{0, 42, 255, 256, 0xDEADBEEF} {
		fmt.Printf("  %10d → 0x%s\n", n, toHexString(n, 2))
	}
}
