// Package main — lời giải Lesson 02: Bitwise Operations.
//
// Cách chạy:
//
//	go run solutions.go
package main

import "fmt"

// === Bài 3 ===
// isPowerOfTwo trả về true nếu n là lũy thừa của 2 (1, 2, 4, 8, ...).
func isPowerOfTwo(n uint64) bool {
	return n > 0 && n&(n-1) == 0
}

// === Bài 4 ===
// countBits đếm số bit 1 trong x, dùng Brian Kernighan's trick.
func countBits(x uint64) int {
	count := 0
	for x != 0 {
		x &= x - 1 // xóa bit 1 thấp nhất
		count++
	}
	return count
}

// countBitsNaive — phiên bản O(số bit), để đối chiếu.
func countBitsNaive(x uint64) int {
	count := 0
	for x > 0 {
		count += int(x & 1)
		x >>= 1
	}
	return count
}

// === Bài 5 ===
// findLonely XOR toàn mảng để tìm số xuất hiện đúng 1 lần
// (các số khác xuất hiện đúng 2 lần).
func findLonely(arr []int) int {
	result := 0
	for _, x := range arr {
		result ^= x
	}
	return result
}

// === Bài 6 ===
// Permission bits theo kiểu Unix.
const (
	PermRead    uint8 = 0b100 // 4
	PermWrite   uint8 = 0b010 // 2
	PermExecute uint8 = 0b001 // 1
)

func hasReadPermission(perm uint8) bool {
	return perm&PermRead != 0
}

func addWritePermission(perm uint8) uint8 {
	return perm | PermWrite
}

func removeExecutePermission(perm uint8) uint8 {
	return perm &^ PermExecute
}

// === Bài 7 ===
// printSubsets in tất cả tập con của items, dùng bitmask.
func printSubsets(items []string) {
	n := len(items)
	total := 1 << n
	for mask := 0; mask < total; mask++ {
		subset := []string{}
		for i := 0; i < n; i++ {
			if mask&(1<<i) != 0 {
				subset = append(subset, items[i])
			}
		}
		fmt.Printf("  mask=%0*b → %v\n", n, mask, subset)
	}
}

// === Bài 8 ===
// reverseBits đảo ngược 8 bit của x.
func reverseBits(x uint8) uint8 {
	var result uint8 = 0
	for i := 0; i < 8; i++ {
		bit := (x >> i) & 1
		result |= bit << (7 - i)
	}
	return result
}

// === Bonus: các thao tác bitmask cơ bản (§3.1) ===

// getBit trả về bit thứ k (0 hoặc 1) của x.
func getBit(x uint64, k uint) uint64 {
	return (x >> k) & 1
}

// setBit đặt bit thứ k của x thành 1.
func setBit(x uint64, k uint) uint64 {
	return x | (1 << k)
}

// clearBit đặt bit thứ k của x thành 0.
func clearBit(x uint64, k uint) uint64 {
	return x &^ (1 << k)
}

// toggleBit lật bit thứ k của x.
func toggleBit(x uint64, k uint) uint64 {
	return x ^ (1 << k)
}

// lowestSetBit trả về giá trị của bit 1 thấp nhất của x (vd x=12=0b1100 → 4).
// Dùng trong Fenwick tree.
func lowestSetBit(x uint64) uint64 {
	// -x ở two's complement: dùng phép trừ trên uint sẽ tự wrap.
	// Để tránh warning, cast qua int64.
	return x & uint64(-int64(x))
}

func main() {
	fmt.Println("=== Bài 1: phép toán cơ bản trên 4 bit ===")
	var a, b uint8 = 0b1100, 0b1010
	fmt.Printf("  a = 1100, b = 1010\n")
	fmt.Printf("  a & b  = %04b\n", a&b)
	fmt.Printf("  a | b  = %04b\n", a|b)
	fmt.Printf("  a ^ b  = %04b\n", a^b)
	fmt.Printf("  a &^ b = %04b\n", a&^b)
	fmt.Printf("  ^a (uint8) = %08b  (= %d)\n", ^a, ^a)

	fmt.Println("\n=== Bài 2: thao tác bit trên x = 10110100 (180) ===")
	var x uint8 = 0b10110100
	fmt.Printf("  x          = %08b (= %d)\n", x, x)
	fmt.Printf("  bit 3      = %d\n", (x>>3)&1)
	fmt.Printf("  set bit 0  = %08b (= %d)\n", x|(1<<0), x|(1<<0))
	fmt.Printf("  clr bit 5  = %08b (= %d)\n", x&^(1<<5), x&^(1<<5))
	fmt.Printf("  tog bit 7  = %08b (= %d)\n", x^(1<<7), x^(1<<7))

	fmt.Println("\n=== Bài 3: isPowerOfTwo ===")
	for _, n := range []uint64{0, 1, 2, 3, 4, 8, 10, 16, 1024, 1023} {
		fmt.Printf("  isPowerOfTwo(%4d) = %v\n", n, isPowerOfTwo(n))
	}

	fmt.Println("\n=== Bài 4: countBits ===")
	for _, n := range []uint64{0, 1, 0b1010, 0b11111111, 0xDEADBEEF} {
		fmt.Printf("  countBits(%-12d) = %d  (naive: %d)\n",
			n, countBits(n), countBitsNaive(n))
	}

	fmt.Println("\n=== Bài 5: lonely number ===")
	arr := []int{2, 3, 5, 2, 5, 7, 3}
	fmt.Printf("  arr = %v\n", arr)
	fmt.Printf("  lonely = %d\n", findLonely(arr))
	// In từng bước XOR
	result := 0
	for _, v := range arr {
		next := result ^ v
		fmt.Printf("    %d ^ %d = %d\n", result, v, next)
		result = next
	}

	fmt.Println("\n=== Bài 6: Unix permission ===")
	var perm uint8 = PermRead | PermExecute // 0b101 = 5
	fmt.Printf("  perm = %03b (read + execute)\n", perm)
	fmt.Printf("  hasReadPermission = %v\n", hasReadPermission(perm))
	updated := addWritePermission(perm)
	fmt.Printf("  + write = %03b (= %d)\n", updated, updated)
	noExec := removeExecutePermission(updated)
	fmt.Printf("  − execute = %03b (= %d)\n", noExec, noExec)

	fmt.Println("\n=== Bài 7: in mọi tập con của [a, b, c] ===")
	printSubsets([]string{"a", "b", "c"})

	fmt.Println("\n=== Bài 8: reverseBits ===")
	for _, n := range []uint8{0b11010010, 0b10000000, 0b00000001, 0b11111111} {
		r := reverseBits(n)
		fmt.Printf("  %08b → %08b\n", n, r)
	}

	fmt.Println("\n=== Bonus: x & -x (lowest set bit) — dùng trong Fenwick tree ===")
	for _, n := range []uint64{12, 6, 8, 13, 24} {
		fmt.Printf("  x = %-2d (%08b)   lowestSetBit = %d\n",
			n, n, lowestSetBit(n))
	}
}
