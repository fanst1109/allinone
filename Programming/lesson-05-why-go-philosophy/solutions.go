// solutions.go — Lesson 05: Vì sao Go? Hello world đầu tiên.
//
// File này chứa hai phiên bản hello world để bạn chạy thử:
//   1) helloBasic        — phiên bản đơn giản nhất, in 1 dòng.
//   2) helloWithName     — phiên bản nhận tên từ command-line argument.
//
// Cách chạy:
//   go run solutions.go              # in cả 2 demo, tên mặc định là "bạn"
//   go run solutions.go Alice        # demo 2 sẽ chào "Alice"
//   go build solutions.go && ./solutions Alice
//
// Lưu ý:
//   - File có `package main` + `func main()` nên là một executable.
//   - Tên file không quan trọng với Go (có thể đổi thành app.go, hello.go...);
//     cái quan trọng là `package main` + `func main()`.

package main

import (
	"fmt"
	"os"
)

// helloBasic — phiên bản 1: chỉ in một dòng cố định ra stdout.
//
// Đây là dạng "hello world" cổ điển nhất. Chú ý:
//   - fmt.Println tự xuống dòng ở cuối, không cần "\n".
//   - Hàm không return giá trị, không nhận tham số.
func helloBasic() {
	fmt.Println("Xin chào, Go!")
}

// helloWithName — phiên bản 2: nhận tên từ command-line args.
//
// Quy ước Go:
//   - os.Args là []string, slice tất cả command-line args.
//   - os.Args[0] là tên chương trình (vd "/tmp/go-build123/exe/solutions").
//   - os.Args[1] là argument đầu tiên người dùng truyền.
//   - len(os.Args) == 1 nghĩa là người dùng không truyền tên.
//
// Lỗi thường gặp: truy cập os.Args[1] khi không có argument
// -> panic "index out of range". Phải kiểm tra len(os.Args) trước.
func helloWithName() {
	name := "bạn" // := khai báo + suy type. Compiler thấy "bạn" -> biết là string.

	if len(os.Args) > 1 {
		name = os.Args[1] // lấy argument đầu tiên người dùng truyền
	}

	// Printf KHÔNG tự xuống dòng — phải có \n cuối format string.
	// %s là format verb cho string.
	fmt.Printf("Xin chào, %s!\n", name)
}

// main — entry point của program. Khi `go run` hoặc `./solutions` được gọi,
// Go runtime sẽ gọi main() đầu tiên.
//
// Quy ước: main không nhận tham số, không return. Muốn exit với code khác 0,
// dùng os.Exit(N).
func main() {
	// Demo 1
	fmt.Println("=== Demo 1: helloBasic ===")
	helloBasic()
	fmt.Println()

	// Demo 2
	fmt.Println("=== Demo 2: helloWithName ===")
	helloWithName()
	fmt.Println()

	// In thêm vài thông tin meta để bạn thấy os.Args trông như thế nào
	fmt.Println("=== Meta: os.Args ===")
	fmt.Printf("Tổng số arg (kể cả tên chương trình): %d\n", len(os.Args))
	for i, arg := range os.Args {
		fmt.Printf("  os.Args[%d] = %q\n", i, arg)
	}
}
