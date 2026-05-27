// Package main là COMPOSITION ROOT — nơi DUY NHẤT biết tất cả các tầng
// và nối chúng lại với nhau (wiring). Đây là chỗ chọn implementation cụ
// thể (in-memory vs Postgres). Mọi tầng khác chỉ thấy interface.
//
// Đổi từ in-memory sang Postgres = đổi đúng 1 dòng ở đây, core đứng yên.
package main

import (
	"log"
	"net/http"

	httpadapter "cleanarch/internal/adapter/http"
	"cleanarch/internal/adapter/memory"
	"cleanarch/internal/usecase"
)

func main() {
	// 1. Tạo các adapter (tầng ngoài cùng).
	repo := memory.NewUserRepo()
	idgen := memory.NewSeqIDGen()

	// 2. Tiêm adapter vào usecase (dependency inversion: usecase chỉ thấy
	//    interface, ở đây ta đưa implementation cụ thể).
	uc := usecase.New(repo, idgen)

	// 3. Tiêm usecase vào driving adapter (HTTP).
	handler := httpadapter.NewHandler(uc)

	// 4. Chạy server.
	addr := ":8080"
	log.Printf("clean-arch demo listening on %s", addr)
	if err := http.ListenAndServe(addr, handler.Routes()); err != nil {
		log.Fatal(err)
	}
}
