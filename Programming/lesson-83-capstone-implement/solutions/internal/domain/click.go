package domain

import "time"

// Click là một sự kiện (event) ghi lại một lượt truy cập short code.
// Đây cũng là một entity miền — analytics worker sẽ tổng hợp các Click.
//
// Lưu ý thiết kế event-driven (liên kết Lesson 65): redirect KHÔNG ghi
// thẳng vào DB analytics, mà EMIT một Click event vào queue. Worker tiêu
// thụ và aggregate. Nhờ vậy đường redirect (hot path) không bị chậm bởi I/O
// ghi thống kê.
type Click struct {
	Code      string    // short code được truy cập
	Referrer  string    // header Referer (nếu có), vd "https://twitter.com"
	IP        string    // địa chỉ IP của client (dùng cho BT5 — unique visitors)
	Timestamp time.Time // thời điểm click
}

// Stats là kết quả tổng hợp analytics cho một short code.
// Đây là một "read model" — hình dạng dữ liệu phục vụ API thống kê.
type Stats struct {
	Code         string         // short code
	Original     string         // URL gốc
	TotalClicks  int            // tổng số lượt click
	ClicksByDay  map[string]int // "2026-05-27" -> số click trong ngày
	TopReferrers []ReferrerStat // referrer phổ biến nhất, đã sắp xếp giảm dần
}

// ReferrerStat là một dòng trong bảng top referrers.
type ReferrerStat struct {
	Referrer string `json:"referrer"`
	Count    int    `json:"count"`
}

// DayKey chuẩn hóa timestamp thành khóa ngày "YYYY-MM-DD" (UTC) để gom nhóm.
func DayKey(t time.Time) string {
	return t.UTC().Format("2006-01-02")
}
