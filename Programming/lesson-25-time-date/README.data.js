// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-25-time-date/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 25 — Time & Date trong Go

Lesson này dạy package \`time\` — một trong những package nhiều **landmine** nhất stdlib Go. Hầu hết bug "tại sao server hiển thị giờ sai 7 tiếng?", "vì sao retry không đều?", "vì sao parse được trên máy tôi mà server fail?" đều bắt nguồn từ những hiểu nhầm trong lesson này. Học chắc một lần, đỡ debug 100 lần sau.

## Mục tiêu học tập

- Hiểu \`time.Time\` chứa cái gì bên trong: **wall clock**, **monotonic clock**, **location**.
- Format và parse time bằng **reference time \`2006-01-02 15:04:05\`** thay vì \`YYYY-MM-DD\` — và hiểu vì sao Go chọn cách quái dị đó.
- Làm chủ timezone: \`UTC\`, \`Local\`, \`LoadLocation\`, chuyển view qua \`t.In(loc)\`.
- Dùng \`time.Duration\`, \`Add\`, \`Sub\`, \`Since\`, \`Until\` — không tự code "1 giờ = 3600 giây" nữa.
- Phân biệt \`Sleep\` / \`After\` / \`Timer\` / \`Ticker\` và biết khi nào dùng cái nào.
- Implement đúng các pattern thực tế: **đo thời gian function**, **timeout select**, **retry với backoff**, **rate limiter**.
- Tránh 5 pitfall kinh điển: sai magic number, quên zone, so sánh bằng \`==\`, Sleep drift trong loop, quên \`ticker.Stop()\`.

## Kiến thức tiền đề

- [Lesson 11 — Hàm](../lesson-11-functions/README.md): \`defer\` (dùng để stop ticker và đo thời gian).
- [Lesson 15 — Struct & method](../lesson-15-struct-method/README.md): \`time.Time\` là struct.
- [Lesson 18 — Interface](../lesson-18-interfaces/README.md): \`Stringer\`, \`Marshaler\` để custom format JSON.
- [Lesson 23 — JSON](../lesson-23-json-encoding/README.md): cách \`time.Time\` mặc định serialize ra RFC3339 và cách override.

## 1. \`time.Time\` — một instant trong vũ trụ

> 💡 **Trực giác**: \`time.Time\` không phải "giờ hiển thị" mà là **một điểm trên trục thời gian tuyệt đối** (instant). Hai biến \`time.Time\` có thể trỏ tới cùng một instant nhưng "hiển thị" khác nhau vì khác timezone — như cùng một sự kiện "máy bay cất cánh lúc X" nhưng phi công Việt nói "9h sáng" và phi công Mỹ nói "10h tối hôm trước".

Bên trong \`time.Time\` (xem \`runtime/time.go\`) có 3 thành phần:

| Thành phần | Là gì | Dùng cho |
|------------|-------|----------|
| **Wall clock** | Năm/tháng/ngày/giờ/phút/giây/nano | Hiển thị, lưu trữ |
| **Monotonic clock** | Số nano-giây đếm từ một mốc nội bộ của process | Đo khoảng thời gian (\`time.Since\`) |
| **Location** | \`*time.Location\` (vd \`Asia/Ho_Chi_Minh\`) | Convert wall clock sang hiển thị địa phương |

**Vì sao có cả 2 đồng hồ?** Vì wall clock có thể bị NTP daemon kéo lùi (vd hệ điều hành sync giờ với server NTP → giờ máy lùi 5 giây). Nếu bạn đo \`end - start\` bằng wall clock, có thể ra **âm**. Monotonic clock không bao giờ chạy lùi → đo duration luôn dương. Go tự xử lý chuyện này: khi bạn \`t2.Sub(t1)\`, nếu cả 2 đều có monotonic, Go dùng monotonic. Bạn không cần nghĩ tới.

\`\`\`go
t := time.Now()
fmt.Printf("%+v\\n", t)
// 2024-05-26 14:30:45.123456789 +0700 +07 m=+0.000123456
//                                                ^^^^^^^^ monotonic component
\`\`\`

Phần \`m=+...\` chính là monotonic reading. Khi bạn \`t.UTC()\` hay parse từ string, Go **strip** monotonic đi (vì không có nghĩa với external time).

> ❓ **Câu hỏi tự nhiên**:
> - *"Vậy nếu tôi \`t1 := time.Now()\` xong \`t2 := time.Now()\` rồi \`t2.Sub(t1)\` thì ra duration đúng?"* Đúng, dùng monotonic, không sợ NTP.
> - *"Còn \`t1 := time.Date(...)\` rồi compare với \`t2 := time.Now()\`?"* Không có monotonic ở \`t1\` → Go dùng wall. An toàn nếu khoảng cách lớn, nhưng đừng dùng để đo micro-benchmark.

## 2. Tạo \`time.Time\` — 4 cách phổ biến

### 2.1 \`time.Now()\` — current instant

\`\`\`go
now := time.Now()
fmt.Println(now)        // 2024-05-26 14:30:45.123 +0700 +07
\`\`\`

Trả về current time **với location \`Local\`** (timezone của OS). Có monotonic.

### 2.2 \`time.Date(year, month, day, hour, min, sec, nsec, loc)\`

Build một instant từ các thành phần. Bắt buộc khai báo location.

\`\`\`go
vn, _ := time.LoadLocation("Asia/Ho_Chi_Minh")
t := time.Date(2024, time.January, 15, 10, 30, 45, 0, vn)
fmt.Println(t)  // 2024-01-15 10:30:45 +0700 +07
\`\`\`

Lưu ý:
- \`month\` là \`time.Month\` enum, không phải int (tránh confused 0-index hay 1-index). \`time.January == 1\`, \`time.December == 12\`.
- Go **normalize** giá trị overflow: \`time.Date(2024, 13, 1, ...)\` = \`2025, 1, 1\`. \`time.Date(2024, 1, 32, ...)\` = \`2024, 2, 1\`. Đây là feature, không phải bug — rất tiện cho "ngày cuối tháng N" = \`time.Date(Y, N+1, 0, ...)\`.

\`\`\`go
// Trick: ngày cuối tháng 2 năm 2024
last := time.Date(2024, 3, 0, 0, 0, 0, 0, time.UTC)
fmt.Println(last)  // 2024-02-29 (năm nhuận, ra ngày 29 đúng)
\`\`\`

### 2.3 \`time.Unix(sec, nsec)\` — từ Unix timestamp

\`\`\`go
t := time.Unix(1716700000, 0)
fmt.Println(t.UTC())  // 2024-05-26 06:26:40 +0000 UTC
\`\`\`

Trả về time **với location \`Local\`** (cần \`t.UTC()\` để chuyển nếu muốn UTC). Đây là cách phổ biến nhất khi đọc timestamp từ DB / API.

### 2.4 \`time.Parse(layout, value)\` — từ string

Xem mục 3.

> 🔁 **Tự kiểm tra**: Năm 2024 có 366 ngày (nhuận). Dùng \`time.Date\` viết hàm \`isLeap(year int) bool\` không dùng phép \`%\`.
> 
> <details><summary>Đáp án</summary>
> 
> \`\`\`go
> func isLeap(year int) bool {
>     // Ngày 29/2 của năm đó có "normalize" về 1/3 không?
>     d := time.Date(year, 2, 29, 0, 0, 0, 0, time.UTC)
>     return d.Month() == time.February
> }
> \`\`\`
> Nếu không nhuận, \`2/29\` normalize thành \`3/1\` → \`Month() == March\`.
> </details>

## 3. Format & Parse — magic number \`2006-01-02 15:04:05\`

Đây là phần khiến mọi newbie Go ngã ngửa.

### 3.1 Vì sao không dùng \`YYYY-MM-DD\`?

Go quyết định: thay vì học một mini-language với placeholder \`YYYY\`, \`MM\`, \`DD\`, \`HH\`, \`mm\`, \`ss\`, ta dùng **một ngày tham chiếu cụ thể** và viết format mong muốn bằng chính các con số của ngày đó.

Ngày tham chiếu:

\`\`\`
Mon Jan 2 15:04:05 MST 2006
\`\`\`

Sắp xếp lại theo thứ tự đơn vị: \`01 02 03 04 05 06 07\` — tức là **tháng 1, ngày 2, 3 giờ chiều (15h), phút 4, giây 5, năm 06, GMT-7**. Cứ nhớ chuỗi \`1 2 3 4 5 6 7\` là nhớ được toàn bộ.

> 💡 **Trực giác**: thay vì học cú pháp mới, "viết ngày 2 tháng 1 năm 2006 theo định dạng bạn muốn" → đó là layout. Format kết quả của bạn = thay các phần đó bằng dữ liệu thật.

### 3.2 Bảng magic number đầy đủ

| Đơn vị | Magic | Ghi chú |
|--------|-------|---------|
| Năm 4-chữ | \`2006\` | |
| Năm 2-chữ | \`06\` | |
| Tháng số | \`01\` hoặc \`1\` | \`01\` = zero-pad, \`1\` = không pad |
| Tháng chữ | \`Jan\` hoặc \`January\` | |
| Ngày | \`02\` hoặc \`2\` | |
| Thứ | \`Mon\` hoặc \`Monday\` | |
| Giờ 24h | \`15\` | (3 PM = 15) |
| Giờ 12h | \`03\` hoặc \`3\` | |
| Phút | \`04\` hoặc \`4\` | |
| Giây | \`05\` hoặc \`5\` | |
| Giây + ms | \`05.000\` | dấu chấm + số 0 |
| AM/PM | \`PM\` | |
| Zone tên | \`MST\` | |
| Zone offset | \`-0700\`, \`-07:00\`, \`Z07:00\` | \`Z07:00\` cho ISO (Z khi UTC) |

### 3.3 Ví dụ Format

\`\`\`go
t := time.Date(2024, 1, 15, 10, 30, 45, 0, time.UTC)

t.Format("2006-01-02")              // 2024-01-15
t.Format("2006-01-02 15:04:05")     // 2024-01-15 10:30:45
t.Format("02/01/2006")              // 15/01/2024  (dd/mm/yyyy kiểu VN/EU)
t.Format("Mon Jan _2 15:04:05 2006") // Mon Jan 15 10:30:45 2024
t.Format("3:04 PM")                 // 10:30 AM
t.Format(time.RFC3339)              // 2024-01-15T10:30:45Z
t.Format(time.Kitchen)              // 10:30AM
\`\`\`

### 3.4 Ví dụ Parse

\`\`\`go
t, err := time.Parse("2006-01-02", "2024-01-15")
// t.UTC(), giờ = 00:00:00

t, err = time.Parse("2006-01-02 15:04:05", "2024-01-15 10:30:45")
// t.UTC(), giờ = 10:30:45 nhưng không có zone → UTC mặc định

t, err = time.Parse(time.RFC3339, "2024-01-15T10:30:45+07:00")
// t có zone +07:00
\`\`\`

\`Parse\` trả về \`(time.Time, error)\`. Nếu layout sai → error rõ ràng (\`cannot parse "..." as "..."\`).

### 3.5 \`ParseInLocation\` — khi value không có zone

Nếu value không chứa zone info (vd \`"2024-01-15 10:30:45"\`) thì \`Parse\` mặc định UTC. Để parse theo Local hoặc zone cụ thể:

\`\`\`go
vn, _ := time.LoadLocation("Asia/Ho_Chi_Minh")
t, _ := time.ParseInLocation("2006-01-02 15:04:05", "2024-01-15 10:30:45", vn)
// t.Hour() = 10 ở zone VN → instant này là 03:30:45 UTC
\`\`\`

### 3.6 Predefined layouts

\`\`\`go
time.RFC3339          // "2006-01-02T15:04:05Z07:00"  ← chuẩn API/JSON
time.RFC3339Nano      // "2006-01-02T15:04:05.999999999Z07:00"
time.RFC1123          // "Mon, 02 Jan 2006 15:04:05 MST"  ← HTTP header
time.RFC822           // "02 Jan 06 15:04 MST"
time.Kitchen          // "3:04PM"
time.Stamp            // "Jan _2 15:04:05"  ← log syslog
time.DateTime         // "2006-01-02 15:04:05" (Go 1.20+)
time.DateOnly         // "2006-01-02"        (Go 1.20+)
time.TimeOnly         // "15:04:05"          (Go 1.20+)
\`\`\`

> ⚠ **Lỗi thường gặp**:
> - Dùng \`YYYY-MM-DD\` (như Java, Python) → Format ra literal "YYYY-MM-DD" với chữ thật, không thay thế.
> - Dùng \`mm\` cho tháng và \`MM\` cho phút (đảo ngược với Java) — Go dùng \`01\` cho tháng, \`04\` cho phút.
> - Quên \`15\` là giờ 24h. Viết \`04:05\` không có giờ → kết quả \`04:05\` literal, không phải hh:mm.

### 3.7 Walk-through: format từng ký tự

Cho \`t = 2024-05-26 14:30:45 +0700\`, layout \`"02/01/2006 03:04 PM"\`:

| Layout | Match | Output |
|--------|-------|--------|
| \`02\` | day = 26 | \`26\` |
| \`/\` | literal | \`/\` |
| \`01\` | month = 5, pad 2 | \`05\` |
| \`/\` | literal | \`/\` |
| \`2006\` | year = 2024 | \`2024\` |
| \` \` | space | \` \` |
| \`03\` | hour 12h = 2 (vì 14h = 2 PM), pad 2 | \`02\` |
| \`:\` | literal | \`:\` |
| \`04\` | minute = 30 | \`30\` |
| \` PM\` | literal " " + AM/PM marker | \` PM\` |

Kết quả: \`"26/05/2024 02:30 PM"\`. Mọi ký tự không phải magic number được giữ y nguyên (slash, dash, space).

> 📝 **Tóm tắt mục 3**:
> - Layout = "viết ngày \`Mon Jan 2 15:04:05 MST 2006\` theo format bạn muốn".
> - Magic sắp theo \`1 2 3 4 5 6 7\` (tháng-ngày-giờ-phút-giây-năm-zone).
> - \`Format\` dùng cho output, \`Parse\` dùng cho input. Cùng layout, hai hướng.
> - Không có zone trong string → dùng \`ParseInLocation\`.

## 4. Timezone — pitfall #1 trong production

> 💡 **Trực giác**: Timezone không phải property của instant. Hai biến time có thể là **cùng một instant** nhưng \`In(VN)\` và \`In(US)\` cho ra hai chuỗi hiển thị khác nhau. Đổi zone = đổi cách "đọc" instant, không đổi instant.

### 4.1 Ba "loại" location

| Location | Là gì |
|----------|-------|
| \`time.UTC\` | UTC (offset 0) — luôn có sẵn |
| \`time.Local\` | Zone của OS — đọc từ env \`TZ\` hoặc \`/etc/localtime\` |
| \`time.LoadLocation("Asia/Ho_Chi_Minh")\` | Zone đặt tên theo IANA tzdata |

\`\`\`go
loc, err := time.LoadLocation("Asia/Ho_Chi_Minh")
if err != nil {
    log.Fatal(err)  // có thể fail trên Windows nếu không có tzdata
}
\`\`\`

Trên Windows hoặc container scratch không có tzdata, \`LoadLocation\` có thể fail. Fix: import \`_ "time/tzdata"\` để embed tzdata vào binary (Go 1.15+).

### 4.2 \`t.In(loc)\` — chuyển view

\`\`\`go
utc := time.Date(2024, 1, 15, 10, 30, 0, 0, time.UTC)
vn, _ := time.LoadLocation("Asia/Ho_Chi_Minh")
ny, _ := time.LoadLocation("America/New_York")

fmt.Println(utc.In(vn))  // 2024-01-15 17:30:00 +0700 +07
fmt.Println(utc.In(ny))  // 2024-01-15 05:30:00 -0500 EST
fmt.Println(utc.Equal(utc.In(vn)))  // true — cùng instant!
\`\`\`

Cùng instant, ba cách hiển thị. **Instant không đổi**, chỉ "lens" thay đổi.

### 4.3 Pattern thực tế: **store UTC, display Local**

Đây là quy tắc vàng:

\`\`\`go
// Khi tạo (vd user signup)
user.CreatedAt = time.Now().UTC()  // lưu UTC

// Khi hiển thị
loc, _ := time.LoadLocation("Asia/Ho_Chi_Minh")
fmt.Println(user.CreatedAt.In(loc).Format("02/01/2006 15:04"))
\`\`\`

Vì sao? Vì:
1. User có thể đổi timezone (du lịch, đổi máy).
2. Server có thể chạy ở nhiều zone (deploy đa region).
3. DB query so sánh dễ khi tất cả cùng UTC.
4. Migrating zone (vd VN từ +07 → +08) chỉ ảnh hưởng display layer.

> ⚠ **Lỗi thường gặp**:
> - Server set timezone \`UTC\` nhưng app dùng \`time.Now()\` rồi format → hiển thị giờ UTC cho user VN → user nhìn thấy giờ sớm hơn 7 tiếng so với thực tế.
> - Đổi DB schema từ \`TIMESTAMP\` (no zone) sang \`TIMESTAMPTZ\` (with zone) sai cách → mất hàng nghìn record.
> - Test pass local (developer Mỹ) nhưng fail trên CI (server UTC) vì hard-code expected output \`"2024-01-15 10:30"\`.

### 4.4 Walk-through: 1 instant, 3 zone

Sự kiện: máy chủ ghi log một crash lúc instant Unix \`1705314600\`.

| Zone | Hiển thị | Hours offset |
|------|----------|--------------|
| UTC | \`2024-01-15 10:30:00 +0000\` | 0 |
| Asia/Ho_Chi_Minh | \`2024-01-15 17:30:00 +0700\` | +7 |
| America/New_York | \`2024-01-15 05:30:00 -0500\` | -5 |
| Asia/Tokyo | \`2024-01-15 19:30:00 +0900\` | +9 |
| Pacific/Auckland | \`2024-01-15 23:30:00 +1300\` | +13 (DST) |

\`t.Unix()\` = \`1705314600\` ở **tất cả 5 dòng** — cùng instant.

> 🔁 **Tự kiểm tra**: User VN bảo "tôi tạo task lúc 8:00 sáng ngày 26/5/2024". DB lưu UTC. Lưu gì?
> 
> <details><summary>Đáp án</summary>
> 
> \`\`\`go
> vn, _ := time.LoadLocation("Asia/Ho_Chi_Minh")
> userTime := time.Date(2024, 5, 26, 8, 0, 0, 0, vn)
> dbValue := userTime.UTC()  // 2024-05-26 01:00:00 UTC
> \`\`\`
> 
> Lưu vào DB là \`2024-05-26 01:00:00 UTC\`. Khi hiển thị lại cho user, \`dbValue.In(vn)\` ra \`2024-05-26 08:00:00 +0700\`.
> </details>

## 5. \`time.Duration\` — khoảng thời gian

> 💡 **Trực giác**: \`Duration\` là **delta** giữa 2 instant, không phải instant. Đơn vị nội bộ là **nano-giây**, kiểu \`int64\`. \`time.Second\` là constant \`1_000_000_000\`.

### 5.1 Constants

\`\`\`go
time.Nanosecond  = 1
time.Microsecond = 1_000
time.Millisecond = 1_000_000
time.Second      = 1_000_000_000
time.Minute      = 60 * time.Second
time.Hour        = 60 * time.Minute
// Không có time.Day, time.Week — vì DST/leap second làm chúng không hằng số.
\`\`\`

### 5.2 Tạo Duration

\`\`\`go
d := 2 * time.Hour                       // 2 giờ
d = 500 * time.Millisecond               // 500ms
d = 3*time.Minute + 30*time.Second       // 3 phút 30 giây
d, _ = time.ParseDuration("1h30m")       // 1 giờ 30 phút
d, _ = time.ParseDuration("250ms")
d, _ = time.ParseDuration("2.5s")
\`\`\`

### 5.3 Arithmetic với \`time.Time\`

\`\`\`go
t := time.Now()
later := t.Add(2 * time.Hour)
earlier := t.Add(-30 * time.Minute)

d := later.Sub(t)               // 2h0m0s
d2 := time.Since(t)             // = time.Now().Sub(t), tiện cho đo elapsed
d3 := time.Until(later)         // = later.Sub(time.Now()), countdown
\`\`\`

Method \`AddDate(years, months, days int)\` cho cộng theo lịch:

\`\`\`go
t.AddDate(0, 1, 0)   // +1 tháng (28/29/30/31 ngày tùy tháng)
t.AddDate(1, 0, 0)   // +1 năm
t.AddDate(0, 0, 7)   // +7 ngày
\`\`\`

> ⚠ **Lỗi**: \`t.Add(24 * time.Hour)\` ≠ \`t.AddDate(0, 0, 1)\` khi vượt qua DST switch. Ở Mỹ ngày DST chuyển, cộng 24h ra giờ khác trên đồng hồ wall. Cộng 1 ngày qua \`AddDate\` giữ giờ wall.

### 5.4 Format Duration

\`\`\`go
d := 3*time.Hour + 5*time.Minute + 30*time.Second
fmt.Println(d)            // 3h5m30s
fmt.Println(d.Hours())    // 3.0916666666666666
fmt.Println(d.Minutes())  // 185.5
fmt.Println(d.Seconds())  // 11130
fmt.Println(d.Milliseconds()) // 11130000
\`\`\`

> 📝 **Tóm tắt mục 5**:
> - \`Duration\` = \`int64\` nano-giây. Dùng constants \`time.Hour\`, không tự nhân.
> - \`Add\` / \`Sub\` / \`Since\` / \`Until\` đủ dùng cho 95% case.
> - Cộng "1 ngày calendar" → \`AddDate(0,0,1)\`, không phải \`Add(24*Hour)\`.

## 6. So sánh time — đừng dùng \`==\`

\`time.Time\` là struct với cả wall, monotonic, location. Hai biến cùng instant có thể khác monotonic component → \`==\` trả \`false\` dù instant giống nhau.

\`\`\`go
t1 := time.Now()
t2 := t1            // copy
t3 := t1.UTC()      // strip monotonic

fmt.Println(t1 == t2)         // true (cùng struct)
fmt.Println(t1 == t3)         // false (khác monotonic + location)
fmt.Println(t1.Equal(t3))     // true (cùng instant)
\`\`\`

**Quy tắc**: luôn dùng \`t1.Equal(t2)\` cho equality, \`t1.Before(t2)\` / \`t1.After(t2)\` cho ordering. Không dùng \`==\`, \`<\`, \`>\`.

\`\`\`go
deadline := time.Now().Add(5 * time.Minute)
for {
    if time.Now().After(deadline) {
        break
    }
    // ... work
}
\`\`\`

## 7. \`Sleep\`, \`After\`, \`Timer\`, \`Ticker\` — 4 cách "chờ"

### 7.1 \`time.Sleep(d)\` — block goroutine

\`\`\`go
time.Sleep(2 * time.Second)
fmt.Println("đã chờ 2s")
\`\`\`

Block goroutine hiện tại trong ≥ \`d\`. Đơn giản, dùng khi không cần cancel.

### 7.2 \`time.After(d) <-chan Time\`

Trả về channel sẽ nhận giá trị sau \`d\`. Dùng trong \`select\` để có **timeout**.

\`\`\`go
select {
case data := <-fetchChannel:
    process(data)
case <-time.After(2 * time.Second):
    log.Println("timeout sau 2s")
    return ErrTimeout
}
\`\`\`

> ⚠ **Lỗi**: \`time.After\` trong loop sẽ leak goroutine nếu case kia thắng. Cho timeout long-lived dùng \`time.NewTimer\` + \`Stop\`.

### 7.3 \`time.NewTimer(d)\` — timer one-shot có control

\`\`\`go
timer := time.NewTimer(5 * time.Second)
defer timer.Stop()

select {
case <-timer.C:
    fmt.Println("Timer fired!")
case <-ctx.Done():
    // ctx cancel → stop timer để giải phóng
    return ctx.Err()
}
\`\`\`

Method:
- \`timer.Stop() bool\` — hủy timer chưa fire (return \`false\` nếu đã fire).
- \`timer.Reset(d)\` — restart với duration mới.

### 7.4 \`time.NewTicker(d)\` — repeat

\`\`\`go
ticker := time.NewTicker(1 * time.Second)
defer ticker.Stop()  // BẮT BUỘC, không Stop = goroutine leak

for {
    select {
    case t := <-ticker.C:
        fmt.Println("tick:", t)
    case <-done:
        return
    }
}
\`\`\`

> ⚠ **Lỗi**: Quên \`defer ticker.Stop()\`. Ticker chạy ngầm gửi vào channel \`C\`, nếu goroutine không nhận và không Stop → leak. Ticker là **biểu hiện** số 1 của memory leak trong long-running services.

### 7.5 So sánh nhanh

| API | Dùng khi | Cancel được? |
|-----|----------|-------------|
| \`Sleep(d)\` | Chờ đơn giản, không cancel | Không |
| \`After(d)\` | Timeout 1 lần trong \`select\` | Không (chờ hết d) |
| \`NewTimer(d)\` | Timeout có thể Stop/Reset | Có |
| \`NewTicker(d)\` | Định kỳ lặp | Có |

> 📝 **Tóm tắt mục 7**: \`Sleep\` đơn giản. \`After\` cho timeout. \`Timer\` khi cần Stop. \`Ticker\` khi cần lặp — **luôn defer Stop**.

## 8. Common patterns thực tế

### 8.1 Đo thời gian function

\`\`\`go
func slowOp() {
    start := time.Now()
    defer func() {
        log.Printf("slowOp took %v", time.Since(start))
    }()
    // ... work
}
\`\`\`

Hoặc gọn hơn với \`defer\` + helper:

\`\`\`go
func timeIt(name string) func() {
    start := time.Now()
    return func() {
        log.Printf("%s: %v", name, time.Since(start))
    }
}

func main() {
    defer timeIt("main")()  // gọi ngay, return closure cho defer
    // ...
}
\`\`\`

### 8.2 Timeout cho operation

\`\`\`go
func fetchWithTimeout(url string, timeout time.Duration) ([]byte, error) {
    ch := make(chan []byte, 1)
    errCh := make(chan error, 1)
    go func() {
        data, err := http.Get(url) // pseudo
        if err != nil { errCh <- err; return }
        ch <- data
    }()
    select {
    case data := <-ch:
        return data, nil
    case err := <-errCh:
        return nil, err
    case <-time.After(timeout):
        return nil, fmt.Errorf("timeout after %v", timeout)
    }
}
\`\`\`

> 💡 Trong code production thật, thường dùng \`context.WithTimeout\` (Lesson 29) thay vì \`time.After\`, vì \`context\` propagate qua call chain.

### 8.3 Retry với exponential backoff

\`\`\`go
func retry(maxAttempts int, op func() error) error {
    delay := 100 * time.Millisecond
    for attempt := 1; attempt <= maxAttempts; attempt++ {
        if err := op(); err == nil {
            return nil
        }
        if attempt == maxAttempts {
            return fmt.Errorf("failed after %d attempts", maxAttempts)
        }
        time.Sleep(delay)
        delay *= 2  // 100ms → 200 → 400 → 800 → ...
    }
    return nil
}
\`\`\`

Pattern dùng cho retry call API, DB connect, gRPC dial...

### 8.4 Rate limiter đơn giản (token bucket-lite)

\`\`\`go
// Cho phép tối đa 5 request/giây
ticker := time.NewTicker(200 * time.Millisecond)
defer ticker.Stop()

for req := range requests {
    <-ticker.C  // chờ tới tick tiếp theo
    handle(req)
}
\`\`\`

Mỗi 200ms cho 1 request → 5 req/giây trung bình. Đơn giản, không có "burst", muốn burst thì \`golang.org/x/time/rate\`.

### 8.5 Deadline-based loop

\`\`\`go
deadline := time.Now().Add(30 * time.Second)
for time.Now().Before(deadline) {
    if doWork() { return nil }
    time.Sleep(500 * time.Millisecond)
}
return ErrDeadlineExceeded
\`\`\`

## 9. Unix timestamp — đơn vị giao tiếp với DB / API

\`\`\`go
t := time.Now()
fmt.Println(t.Unix())       // seconds since 1970-01-01 UTC
fmt.Println(t.UnixMilli())  // milliseconds (JS Date.now() compat)
fmt.Println(t.UnixMicro())  // microseconds
fmt.Println(t.UnixNano())   // nanoseconds
\`\`\`

Convert ngược:

\`\`\`go
sec := int64(1716700000)
t := time.Unix(sec, 0)

ms := int64(1716700000123)
t = time.UnixMilli(ms)
\`\`\`

> 💡 **Trực giác**: Unix timestamp là **số nguyên** → so sánh, lưu trữ, truyền JSON rất hiệu quả. DB cột \`BIGINT\` hoặc \`INTEGER\` chứa Unix là pattern phổ biến. JS \`Date.now()\` trả \`UnixMilli\` → tương thích cross-language.

> ⚠ Cẩn thận unit: \`1716700000\` (sec) ≠ \`1716700000000\` (ms). Sai unit = sai 1000 lần.

## 10. JSON serialize

\`time.Time\` mặc định format **RFC3339** khi gặp \`json.Marshal\`:

\`\`\`go
type Event struct {
    Name string    \`json:"name"\`
    At   time.Time \`json:"at"\`
}
e := Event{"login", time.Date(2024, 1, 15, 10, 30, 0, 0, time.UTC)}
b, _ := json.Marshal(e)
fmt.Println(string(b))
// {"name":"login","at":"2024-01-15T10:30:00Z"}
\`\`\`

Unmarshal cũng parse RFC3339 tự động. Muốn format khác (vd Unix timestamp number, hay \`"15/01/2024"\`):

\`\`\`go
type EventUnix struct {
    Name string \`json:"name"\`
    At   int64  \`json:"at"\`  // lưu Unix
}

// hoặc implement MarshalJSON / UnmarshalJSON (xem Lesson 23)
type VNDate time.Time
func (d VNDate) MarshalJSON() ([]byte, error) {
    s := time.Time(d).Format("02/01/2006")
    return []byte(\`"\` + s + \`"\`), nil
}
\`\`\`

## 11. Monotonic clock — vì sao đo elapsed luôn đúng

\`\`\`go
start := time.Now()
heavyWork()
elapsed := time.Since(start)  // dùng monotonic
\`\`\`

Nếu trong khoảng \`heavyWork()\`, NTP daemon kéo lùi giờ máy 5 giây, \`time.Now()\` thứ 2 vẫn "lớn hơn" \`start\` về monotonic → \`elapsed\` dương đúng. Nếu Go chỉ dùng wall clock, \`elapsed\` có thể âm.

Khi nào monotonic bị strip?
- \`t.UTC()\`, \`t.In(loc)\`, \`t.Round()\`, \`t.Truncate()\`.
- \`time.Parse(...)\` (parse từ string không có monotonic).
- \`json.Unmarshal\` (đi qua string).

→ Quy tắc: **đo duration thì dùng cùng object Go gốc từ \`time.Now()\`**, đừng round-trip qua string.

## 12. Locale / Calendar — Go stdlib không có

Go stdlib chỉ có Gregorian calendar và format tháng tiếng Anh (\`January\`, \`Feb\`, ...). Muốn:
- Tháng tiếng Việt → tự map (\`var months = []string{"Tháng 1", ...}\`).
- Calendar khác (Âm lịch, Persian, Hebrew) → thư viện ngoài (\`github.com/jinzhu/now\`, \`github.com/golang-module/carbon\`).

Ví dụ hiển thị thứ tiếng Việt:

\`\`\`go
var weekdays = map[time.Weekday]string{
    time.Monday: "Thứ Hai", time.Tuesday: "Thứ Ba",
    time.Wednesday: "Thứ Tư", time.Thursday: "Thứ Năm",
    time.Friday: "Thứ Sáu", time.Saturday: "Thứ Bảy",
    time.Sunday: "Chủ Nhật",
}
fmt.Println(weekdays[t.Weekday()])  // Thứ Tư
\`\`\`

## 13. Pitfall tổng kết

| # | Pitfall | Cách tránh |
|---|---------|-----------|
| 1 | Layout \`YYYY-MM-DD\` | Dùng \`2006-01-02\` |
| 2 | Quên timezone, lưu Local | Lưu UTC, display Local |
| 3 | \`==\` so sánh time | \`Equal()\`, \`Before()\`, \`After()\` |
| 4 | \`Sleep\` trong loop → drift | \`Ticker\` |
| 5 | Quên \`ticker.Stop()\` | \`defer ticker.Stop()\` |
| 6 | \`Add(24*Hour)\` qua DST | \`AddDate(0,0,1)\` |
| 7 | Unit mix (sec vs ms) | Đặt tên biến rõ: \`tsMs\`, \`tsSec\` |
| 8 | Parse string không zone xong dùng làm UTC | \`ParseInLocation\` |
| 9 | \`time.After\` trong long loop | \`NewTimer\` + Stop |
| 10 | Test hard-code Local | Set \`time.UTC\` trong test hoặc \`t.UTC()\` trước compare |

## 14. Bài tập

### BT1: Parse + Convert timezone

Parse chuỗi \`"2024-01-15T10:30:45Z"\` (ISO UTC), convert sang giờ Việt Nam (\`Asia/Ho_Chi_Minh\`), in ra cả 2 dưới format \`"2006-01-02 15:04:05 MST"\`.

### BT2: Đo thời gian 3 function

Viết 3 hàm \`funcA\`, \`funcB\`, \`funcC\` mỗi hàm \`Sleep\` một khoảng khác nhau (100ms, 250ms, 500ms). Trong \`main\`, đo và in ra thời gian chạy mỗi hàm dùng \`time.Since\`.

### BT3: Timeout select

Implement \`func slowFetch() <-chan string\` mô phỏng request mất 3 giây (dùng \`time.After\` để emit value). Trong \`main\`, gọi với timeout 1 giây — phải in \`"timeout"\`. Sau đó gọi lại với timeout 5 giây — phải in kết quả.

### BT4: Ticker giới hạn số tick

Tạo Ticker 1 giây, in current time mỗi tick, dừng sau **5 tick**. Không leak goroutine.

### BT5: Format ngày tiếng Việt

Viết \`func formatVN(t time.Time) string\` trả về dạng \`"Thứ Tư, ngày 15 tháng 01 năm 2024"\`. Test với 7 ngày khác nhau (mỗi thứ một lần).

### BT6: Detect 4 bug

Cho đoạn code dưới đây, chỉ ra 4 bug liên quan đến time và sửa:

\`\`\`go
func report(events []Event) {
    layout := "YYYY-MM-DD"
    for _, e := range events {
        fmt.Println(e.At.Format(layout))
    }

    if events[0].At == events[1].At {
        fmt.Println("trùng giờ")
    }

    ticker := time.NewTicker(1 * time.Second)
    for i := 0; i < 10; i++ {
        <-ticker.C
        process()
    }
    // ticker không Stop

    for i := 0; i < 100; i++ {
        time.Sleep(100 * time.Millisecond)
        emitMetric()
    }
}
\`\`\`

## Lời giải chi tiết

### Giải BT1

\`\`\`go
func solveBT1() {
    s := "2024-01-15T10:30:45Z"
    t, err := time.Parse(time.RFC3339, s)
    if err != nil { log.Fatal(err) }

    fmt.Println("UTC:", t.UTC().Format("2006-01-02 15:04:05 MST"))
    // UTC: 2024-01-15 10:30:45 UTC

    vn, err := time.LoadLocation("Asia/Ho_Chi_Minh")
    if err != nil { log.Fatal(err) }
    fmt.Println("VN: ", t.In(vn).Format("2006-01-02 15:04:05 MST"))
    // VN:  2024-01-15 17:30:45 +07
}
\`\`\`

**Giải thích**: parse RFC3339 vì input có \`T\` và \`Z\`. \`t.In(vn)\` cùng instant nhưng view khác. UTC \`10:30\` + 7 giờ = \`17:30\` VN.

### Giải BT2

\`\`\`go
func funcA() { time.Sleep(100 * time.Millisecond) }
func funcB() { time.Sleep(250 * time.Millisecond) }
func funcC() { time.Sleep(500 * time.Millisecond) }

func timeIt(name string, fn func()) {
    start := time.Now()
    fn()
    log.Printf("%s took %v", name, time.Since(start))
}

func solveBT2() {
    timeIt("A", funcA)
    timeIt("B", funcB)
    timeIt("C", funcC)
}
// Output xấp xỉ:
// A took 100.5ms
// B took 251.2ms
// C took 500.7ms
\`\`\`

Sai số nhỏ là chuẩn (scheduler không chính xác tới ns).

### Giải BT3

\`\`\`go
func slowFetch(delay time.Duration) <-chan string {
    ch := make(chan string, 1)
    go func() {
        time.Sleep(delay)
        ch <- "done"
    }()
    return ch
}

func fetchWithTimeout(delay, timeout time.Duration) string {
    select {
    case v := <-slowFetch(delay):
        return v
    case <-time.After(timeout):
        return "timeout"
    }
}

func solveBT3() {
    fmt.Println(fetchWithTimeout(3*time.Second, 1*time.Second))  // timeout
    fmt.Println(fetchWithTimeout(3*time.Second, 5*time.Second))  // done
}
\`\`\`

**Note**: nên dùng \`time.NewTimer\` + \`Stop\` để tránh leak khi case data thắng. Ở quy mô bài tập đơn giản \`time.After\` đủ.

### Giải BT4

\`\`\`go
func solveBT4() {
    ticker := time.NewTicker(1 * time.Second)
    defer ticker.Stop()

    for i := 0; i < 5; i++ {
        t := <-ticker.C
        fmt.Printf("tick %d: %s\\n", i+1, t.Format("15:04:05"))
    }
}
\`\`\`

\`defer ticker.Stop()\` để chắc chắn không leak nếu function return sớm (ví dụ vì panic).

### Giải BT5

\`\`\`go
var thuVN = map[time.Weekday]string{
    time.Monday:    "Thứ Hai",
    time.Tuesday:   "Thứ Ba",
    time.Wednesday: "Thứ Tư",
    time.Thursday:  "Thứ Năm",
    time.Friday:    "Thứ Sáu",
    time.Saturday:  "Thứ Bảy",
    time.Sunday:    "Chủ Nhật",
}

func formatVN(t time.Time) string {
    return fmt.Sprintf("%s, ngày %02d tháng %02d năm %d",
        thuVN[t.Weekday()], t.Day(), int(t.Month()), t.Year())
}

func solveBT5() {
    // Tháng 1/2024 — 15/01 là thứ Hai
    for d := 15; d <= 21; d++ {
        t := time.Date(2024, 1, d, 0, 0, 0, 0, time.UTC)
        fmt.Println(formatVN(t))
    }
    // Thứ Hai, ngày 15 tháng 01 năm 2024
    // Thứ Ba,  ngày 16 tháng 01 năm 2024
    // ...
}
\`\`\`

### Giải BT6

| # | Bug | Sửa |
|---|-----|-----|
| 1 | \`layout = "YYYY-MM-DD"\` không phải Go magic | \`layout = "2006-01-02"\` |
| 2 | \`e.At == events[1].At\` so sánh struct | \`events[0].At.Equal(events[1].At)\` |
| 3 | Ticker không Stop → leak | \`defer ticker.Stop()\` ngay sau \`NewTicker\` |
| 4 | \`Sleep\` trong loop → drift (\`process\` mất thời gian → khoảng cách giữa lần emit > 100ms) | Dùng \`NewTicker(100*time.Millisecond)\` |

Code sửa:

\`\`\`go
func report(events []Event) {
    layout := "2006-01-02"
    for _, e := range events {
        fmt.Println(e.At.Format(layout))
    }

    if events[0].At.Equal(events[1].At) {
        fmt.Println("trùng giờ")
    }

    ticker := time.NewTicker(1 * time.Second)
    defer ticker.Stop()
    for i := 0; i < 10; i++ {
        <-ticker.C
        process()
    }

    emitTicker := time.NewTicker(100 * time.Millisecond)
    defer emitTicker.Stop()
    for i := 0; i < 100; i++ {
        <-emitTicker.C
        emitMetric()
    }
}
\`\`\`

**Tại sao Sleep drift?** Vì \`time.Sleep(100ms)\` + \`emitMetric()\` mất X ms thì tổng chu kỳ là \`100 + X\` ms, không phải \`100\`. Sau N vòng, lệch \`N*X\`. Ticker giữ nhịp chuẩn vì nó emit theo wall clock, không chờ work.

## 15. Code & Minh họa

- [solutions.go](./solutions.go) — code Go chạy được, gom 6 bài tập.
- [visualization.html](./visualization.html) — 3 module tương tác: Format reference, Timezone converter, Timer/Ticker visualizer.

## 16. Bài tiếp theo

- [Lesson 26 — Testing](../lesson-26-testing-basics/README.md): viết test cho code time-dependent (inject clock).
- [Lesson 27 — Goroutine & Channel](../lesson-27-goroutines-channels/README.md): nâng cấp pattern Ticker thành concurrent.
- [Lesson 29 — Context](../lesson-29-context-cancellation/README.md): timeout chuẩn cho call chain dài, thay thế \`time.After\` trong production.
`;
