// Lesson 06 — Hello World & Toolchain
//
// Demo gói gọn các khái niệm toolchain trong README:
//   - Dùng package `flag` để nhận tham số CLI (-name, -greet).
//   - Dùng package `runtime` để in version Go + OS + ARCH (giống output cross-compile).
//   - Biến `version` minh hoạ -ldflags="-X main.version=..." (xem BT4 trong README).
//
// Chạy thử:
//   go run solutions.go
//   go run solutions.go -name=Duy -greet=Chào
//   go build -ldflags="-X main.version=1.2.3" -o app solutions.go && ./app
package main

import (
	"flag"
	"fmt"
	"runtime"
)

// version có thể inject lúc build qua -ldflags="-X main.version=..."
// (xem BT4 trong README). Khai báo bằng `var` chứ KHÔNG phải `const`,
// vì -ldflags chỉ inject được vào biến string mutable ở package level.
var version = "dev"

// greet trả về một câu chào dạng "<lời chào>, <tên>!".
// Hàm viết hoa = public (nhưng ở package main không có khác biệt vì
// không ai import package main). Để minh hoạ phong cách đặt tên.
func greet(salutation, name string) string {
	return fmt.Sprintf("%s, %s!", salutation, name)
}

// printRuntimeInfo in thông tin runtime — chứng minh binary "biết" mình
// đang chạy trên OS/arch nào (kết quả khớp với GOOS/GOARCH lúc build).
func printRuntimeInfo() {
	fmt.Println("──── Runtime info ────")
	fmt.Printf("  Go version : %s\n", runtime.Version()) // vd: go1.22.0
	fmt.Printf("  GOOS       : %s\n", runtime.GOOS)      // vd: linux, darwin, windows
	fmt.Printf("  GOARCH     : %s\n", runtime.GOARCH)    // vd: amd64, arm64
	fmt.Printf("  NumCPU     : %d\n", runtime.NumCPU())
	fmt.Printf("  myapp ver  : %s\n", version) // đổi qua -ldflags
}

func main() {
	// Khai báo 2 flag CLI bằng package `flag` chuẩn.
	// flag.String trả về *string — ta deref bằng *namePtr sau parse.
	namePtr := flag.String("name", "World", "Tên người được chào")
	greetPtr := flag.String("greet", "Hello", "Lời chào (Hello, Xin chào, Hi...)")
	flag.Parse() // bắt buộc gọi để parse os.Args

	// Tạo câu chào và in.
	fmt.Println(greet(*greetPtr, *namePtr))

	// Tách dòng cho dễ đọc.
	fmt.Println()
	printRuntimeInfo()
}
