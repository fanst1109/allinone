# Lesson 05 — Observability & độ tin cậy

## Mục tiêu

- Hiểu **vì sao cần observability** (khả năng quan sát): hệ phân tán không thể debug bằng `print` như script một máy, và phân biệt **monitoring** (giám sát — biết *khi nào* hỏng) với **observability** (hiểu được *vì sao* hỏng).
- Nắm **ba trụ cột (three pillars)**: **Logs** (nhật ký), **Metrics** (chỉ số), **Traces** (vết theo dõi) — mỗi cái trả lời câu hỏi gì, khi nào dùng cái nào.
- Viết **log tốt**: structured log (log có cấu trúc), dùng đúng **log level**, không bao giờ log thông tin nhạy cảm.
- Thiết kế **metrics & cảnh báo (alert)** có ý nghĩa: 3 loại metric (counter/gauge/histogram), **4 golden signals** (latency, traffic, errors, saturation), và tránh **alert fatigue** (mệt mỏi vì cảnh báo).
- Định nghĩa và **tính bằng số** **SLI / SLO / SLA** và **error budget** (ngân sách lỗi).
- Hiểu **độ tin cậy (reliability)**: **MTTR / MTBF**, và văn hóa **postmortem không đổ lỗi (blameless)**.

## Kiến thức tiền đề

- [Lesson 04 — Container & triển khai](../lesson-04-container-trien-khai/): hiểu cách dịch vụ chạy trong container và được đưa lên production — observability chính là cách ta "nhìn vào trong" những container đang chạy đó.
- [Lesson 03 — CI/CD](../lesson-03-ci-cd/): khi đã release tự động và thường xuyên, ta cần biết bản vừa deploy có làm hỏng gì không — observability là vòng phản hồi đóng lại cho CI/CD.

> 💡 **Vì sao bài này quan trọng hơn người mới tưởng?** Trên máy của bạn, khi code sai bạn `print` ra rồi đọc. Trên production có 50 service gọi lẫn nhau, mỗi request đi qua 8 service, chạy trên 200 container — không có "màn hình" nào để nhìn. Observability là **giác quan** của hệ thống: nếu hệ thống không kể cho bạn nghe nó đang làm gì, bạn đang lái xe bịt mắt.

---

## 1. Vì sao cần observability — không thể debug hệ phân tán bằng `print`

💡 **Trực giác.** Hình dung một bưu kiện thất lạc. Nếu chỉ có *một* người giao hàng, bạn hỏi anh ta là xong. Nhưng bưu kiện thật đi qua 6 kho, 3 xe tải, 2 thành phố — không ai thấy toàn cảnh. Bạn cần **mã vận đơn** để tra cứu nó đã qua đâu, dừng ở đâu, mất bao lâu mỗi chặng. Observability là hệ thống "mã vận đơn" đó cho mỗi request đi qua hệ phần mềm.

Trên một script một máy:
```
def xu_ly(don):
    print("nhận đơn", don.id)   # debug bằng mắt
    ket_qua = tinh(don)
    print("xong", ket_qua)
    return ket_qua
```
Bạn đọc output trên terminal là hiểu. Nhưng production khác ở 3 điểm:

1. **Phân tán**: request đi qua API Gateway → Auth → Order → Payment → Inventory. Lỗi ở đâu? `print` ở 1 service không cho thấy bức tranh chéo service.
2. **Đồng thời (concurrent)**: hàng nghìn request chạy song song, log của chúng trộn lẫn — không lần ra một request cụ thể.
3. **Bạn không ngồi đó**: sự cố xảy ra lúc 3h sáng, trên container đã bị thay thế. `print` ra đâu? Ai đọc?

### Monitoring vs Observability — khác nhau thế nào?

Hai từ hay bị dùng lẫn, nhưng khác rõ:

| | **Monitoring** (giám sát) | **Observability** (khả năng quan sát) |
|---|---|---|
| Trả lời | *Khi nào* hỏng? (có/không) | *Vì sao* hỏng? (truy nguyên) |
| Bản chất | Theo dõi các câu hỏi **đã biết trước** ("CPU > 90%?") | Trả lời được các câu hỏi **chưa biết trước** ("vì sao chỉ user ở Hà Nội bị chậm sau 2h chiều?") |
| Ví dụ | Đèn báo "động cơ nóng" trên ô tô | Đầy đủ cảm biến + log hành trình để thợ tìm *nguyên nhân* nóng |

> ❓ **"Vậy monitoring là tập con của observability?"** Gần đúng. Monitoring trả lời các câu hỏi *bạn biết để hỏi từ trước* (dashboard, alert cố định). Observability là tính chất của hệ thống cho phép bạn **đặt câu hỏi mới mà không cần đổi code** — nhờ dữ liệu đủ giàu (logs + metrics + traces). Một hệ có monitoring tốt vẫn có thể "mù" trước sự cố lạ; observability tốt thì điều tra được sự cố chưa từng gặp.

> 🔁 **Dừng lại tự kiểm tra.** Dashboard báo "tỷ lệ lỗi tăng từ 0.1% lên 5%". Đó là monitoring hay observability? Để biết *vì sao* tăng thì cần gì?
> <details><summary>Đáp án</summary>"Tỷ lệ lỗi 5%" là <b>monitoring</b> (biết có sự cố). Để biết <i>vì sao</i> — lỗi đến từ endpoint nào, service nào, do deploy mới hay do DB quá tải — cần <b>observability</b>: lọc log theo trace, xem metric saturation của DB, dò trace của request lỗi. Monitoring gõ chuông; observability tìm thủ phạm.</details>

📝 **Tóm tắt mục 1.** Hệ phân tán + đồng thời + bạn không có mặt → `print` vô dụng. **Monitoring** = biết *khi nào* hỏng (câu hỏi biết trước). **Observability** = hiểu *vì sao* hỏng (trả lời câu hỏi mới). Cần cả hai.

---

## 2. Ba trụ cột: Logs / Metrics / Traces

💡 **Trực giác.** Ba góc nhìn bổ sung cho nhau, như 3 dụng cụ của bác sĩ:
- **Logs** = bệnh án chi tiết từng lần khám ("14:03 bệnh nhân kêu đau ngực trái").
- **Metrics** = chỉ số đo liên tục ("nhịp tim 72, huyết áp 120/80") — gọn, vẽ biểu đồ theo thời gian.
- **Traces** = phim chụp đường đi của *một* ca cụ thể qua các phòng khám.

| Trụ cột | Là gì | Trả lời câu hỏi | Khi nào dùng | Chi phí lưu |
|---------|-------|-----------------|--------------|-------------|
| **Logs** (nhật ký) | Bản ghi sự kiện rời rạc, có timestamp | "Chính xác *chuyện gì* đã xảy ra ở thời điểm X?" | Điều tra chi tiết một sự cố cụ thể | Cao (nhiều text) |
| **Metrics** (chỉ số) | Số đo tổng hợp theo thời gian | "Hệ thống *khỏe không*, xu hướng ra sao?" | Dashboard, alert, theo dõi xu hướng | Thấp (chỉ là số) |
| **Traces** (vết) | Đường đi của *một request* qua nhiều service | "Request này *chậm ở đâu*, qua những service nào?" | Gỡ lỗi độ trễ trong hệ phân tán | Trung bình |

**Ví dụ cụ thể — một sự cố "thanh toán chậm".**
- **Metric** báo: `p99 latency` của `/checkout` nhảy từ 200ms → 3.2s lúc 14:00. → *Biết có vấn đề*.
- **Trace** của một request `/checkout` cho thấy: API Gateway 5ms → Order 12ms → **Payment 2980ms** → Inventory 8ms. → *Biết chậm ở Payment*.
- **Log** của Payment lúc đó: `WARN payment retry attempt=3 reason="upstream timeout to bank-api"`. → *Biết vì sao: bank-api timeout, đang retry 3 lần*.

Ba trụ cột phối hợp: metric **phát hiện**, trace **khoanh vùng**, log **giải thích**.

> ⚠ **Lỗi thường gặp.** Chỉ dùng logs cho mọi thứ. Logs đắt để lưu và chậm để tổng hợp ("tỷ lệ lỗi tháng này?" mà phải `grep` 2TB log thì khổ). Đếm/đo nên dùng **metrics** (rẻ, tổng hợp sẵn); chỉ dùng log cho chi tiết một sự kiện.

> ❓ **"Trace khác gì log có timestamp?"** Trace gắn các sự kiện qua *nhiều service* bằng một **trace ID** chung, và đo thời lượng từng chặng (span). Log thường rời rạc trong một service. Trace cho bạn xem **toàn bộ đường đi** của một request — điều log đơn lẻ không làm được.

> 🔁 **Dừng lại tự kiểm tra.** Sếp hỏi: "Tuần này trung bình bao nhiêu đơn hàng/giây, và 99% đơn xử lý dưới mấy giây?". Bạn nên trả lời bằng trụ cột nào?
> <details><summary>Đáp án</summary><b>Metrics</b>. Đây là số đo tổng hợp theo thời gian (traffic = đơn/giây; p99 latency = 99% dưới mấy giây). Dùng log để đếm sẽ chậm và đắt. Metrics sinh ra đúng cho loại câu hỏi xu hướng/tổng hợp này.</details>

📝 **Tóm tắt mục 2.** **Logs** = chuyện gì xảy ra (chi tiết, đắt). **Metrics** = khỏe không, xu hướng (số, rẻ, để alert). **Traces** = chậm ở đâu trong hệ phân tán (theo trace ID). Metric phát hiện → trace khoanh vùng → log giải thích.

---

## 3. Logging tốt — structured, đúng level, không lộ dữ liệu nhạy cảm

💡 **Trực giác.** Log là thư bạn gửi cho *chính mình lúc 3h sáng* khi đang chữa cháy. Lúc đó bạn mệt, hoảng, và chỉ có máy tìm kiếm. Log tốt = thư rõ ràng, máy đọc được, không tiết lộ bí mật.

### 3.1 Structured log (log có cấu trúc)

Log dạng văn bản tự do thì người đọc được nhưng máy khó lọc. **Structured log** ghi dưới dạng key–value (thường JSON) để hệ thống lọc/tổng hợp được.

**Xấu (free text):**
```
User alice failed login from 1.2.3.4 at 14:03 because wrong password
```
Muốn "đếm số lần đăng nhập thất bại của alice hôm nay" → phải parse chuỗi bằng regex mong manh.

**Tốt (structured):**
```json
{"ts":"2026-06-11T14:03:00Z","level":"WARN","event":"login_failed",
 "user":"alice","ip":"1.2.3.4","reason":"wrong_password","trace_id":"a1b2c3"}
```
Giờ có thể truy vấn `event="login_failed" AND user="alice"` chính xác, và lần theo `trace_id` để nối với metric/trace.

### 3.2 Log level (mức độ log)

Mỗi dòng log có một mức, để lọc theo độ nghiêm trọng:

| Level | Nghĩa | Ví dụ | Có alert? |
|-------|-------|-------|:---------:|
| `DEBUG` | Chi tiết để gỡ lỗi khi phát triển | "giá trị biến x = 42" | Không |
| `INFO` | Sự kiện bình thường đáng ghi | "đơn #123 tạo thành công" | Không |
| `WARN` | Bất thường nhưng còn xử lý được | "retry lần 2 tới bank-api" | Có thể |
| `ERROR` | Một thao tác *thất bại* | "không lưu được đơn vào DB" | Thường có |
| `FATAL` | Hệ thống không chạy tiếp được | "mất kết nối DB, thoát" | Luôn |

Production thường chạy ở `INFO` trở lên (tắt `DEBUG` để đỡ ồn và đỡ tốn).

### 3.3 Không log thông tin nhạy cảm

> ⚠ **Lỗi thường gặp nguy hiểm.** Log mật khẩu, số thẻ, token, CMND/CCCD. Log thường được gom về một hệ thống tập trung mà *nhiều người* truy cập được và lưu lâu — log lộ = rò rỉ dữ liệu, có thể vi phạm pháp luật (GDPR, PCI-DSS).

**Tuyệt đối không:**
```json
{"event":"login","user":"alice","password":"hunter2"}        ← cấm
{"event":"payment","card":"4111 1111 1111 1111","cvv":"123"} ← cấm
```
**Thay bằng (che/băm):**
```json
{"event":"login","user":"alice"}                              ← không log mật khẩu
{"event":"payment","card_last4":"1111","token":"tok_***"}     ← chỉ 4 số cuối
```

> ❓ **"Log nhiều cho chắc, sau cần thì có — sai chỗ nào?"** Hai cái giá: (1) **tiền & nhiễu** — log ồn làm khó tìm thông tin thật và đội chi phí lưu trữ; (2) **rủi ro bảo mật** — log càng nhiều càng dễ vô tình ghi dữ liệu nhạy cảm. Log *có chủ đích*: ghi cái sẽ thực sự dùng khi điều tra.

> 🔁 **Dừng lại tự kiểm tra.** Một dev log nguyên object `request` để "tiện debug". Object đó chứa header `Authorization: Bearer eyJ...`. Vấn đề gì?
> <details><summary>Đáp án</summary>Đã log <b>token xác thực</b> — tương đương log mật khẩu. Ai đọc được log đó có thể giả mạo phiên của user. Phải lọc/che các field nhạy cảm (`Authorization`, `Cookie`, `password`...) trước khi log. Đây là lỗi rò rỉ dữ liệu rất phổ biến.</details>

📝 **Tóm tắt mục 3.** Log tốt = **structured** (JSON key–value, máy lọc được) + **đúng level** (DEBUG→FATAL, production chạy từ INFO) + **không bao giờ log dữ liệu nhạy cảm** (mật khẩu, thẻ, token). Gắn `trace_id` để nối với trace/metric.

---

## 4. Metrics & cảnh báo — 4 golden signals, tránh alert fatigue

💡 **Trực giác.** Metric là các "đồng hồ" trên bảng điều khiển ô tô: tốc độ, vòng tua, xăng, nhiệt độ. Bạn không nhìn từng bộ phận động cơ — chỉ cần vài đồng hồ đúng là biết xe khỏe hay không.

### 4.1 Ba loại metric

| Loại | Là gì | Đặc điểm | Ví dụ |
|------|-------|----------|-------|
| **Counter** (bộ đếm) | Số chỉ **tăng** (reset khi restart) | Cộng dồn | tổng số request, tổng số lỗi |
| **Gauge** (đồng hồ đo) | Số **lên xuống tự do** | Giá trị tức thời | số kết nối đang mở, %CPU, RAM dùng |
| **Histogram** (biểu đồ phân phối) | Phân phối các giá trị vào "thùng" (bucket) | Tính được percentile | phân bố thời gian phản hồi → p50, p99 |

**Ví dụ số — vì sao cần histogram, không chỉ trung bình.** 10 request có thời gian (ms): `50, 50, 50, 50, 50, 50, 50, 50, 50, 4000`.
- **Trung bình** = (9×50 + 4000)/10 = **445ms** → trông "ổn".
- **p90** (90% nhanh hơn ngưỡng này) = **50ms**; **p99/max** = **4000ms**.

Trung bình *giấu* cái đuôi chậm. 1 trong 10 user chờ 4 giây mà trung bình vẫn đẹp. Vì thế observability dùng **percentile** (p95, p99) từ histogram, không dùng mỗi trung bình.

### 4.2 Bốn golden signals (Google SRE)

Bốn chỉ số tối thiểu để hiểu sức khỏe một dịch vụ:

| Signal | Đo gì | Câu hỏi | Metric điển hình |
|--------|-------|---------|------------------|
| **Latency** (độ trễ) | Mất bao lâu để trả lời | "Có chậm không?" | p50/p95/p99 thời gian phản hồi |
| **Traffic** (lưu lượng) | Tải đang nhận | "Đang bận cỡ nào?" | request/giây (RPS) |
| **Errors** (lỗi) | Tỷ lệ yêu cầu thất bại | "Có hỏng không?" | % HTTP 5xx |
| **Saturation** (độ bão hòa) | Tài nguyên đầy bao nhiêu | "Sắp hết sức chưa?" | %CPU, %RAM, độ sâu hàng đợi |

> 💡 **Trực giác về saturation.** Là "còn bao nhiêu sức dự trữ". Nhà hàng còn 1 bàn trống = saturation cao, khách tới nữa là phải xếp hàng (latency tăng). Saturation thường **báo trước** latency và errors — CPU lên 95% rồi vài giây sau request mới bắt đầu chậm và lỗi.

### 4.3 Alert có ý nghĩa — tránh alert fatigue

**Alert fatigue (mệt mỏi vì cảnh báo)**: khi quá nhiều cảnh báo (phần lớn vô hại) khiến đội trực **chai lì** và *bỏ qua cả cảnh báo thật*. Giống "chó sói đến!" kêu mãi không có sói — đến khi sói thật thì không ai chạy.

Quy tắc alert tốt:
- **Alert trên triệu chứng người dùng cảm nhận**, không trên nguyên nhân nội bộ. Tốt: "tỷ lệ lỗi /checkout > 1% trong 5 phút". Tệ: "CPU của 1 node = 91%" (có thể vô hại).
- **Mỗi alert phải đáng để dựng người dậy lúc 3h sáng**. Nếu không cần hành động gì → không phải alert, cùng lắm là một dòng trên dashboard.
- **Kèm ngữ cảnh & hành động**: alert nên ghi link tới dashboard/runbook, không chỉ "có lỗi".

> ⚠ **Lỗi thường gặp.** Đặt alert cho *mọi* metric với ngưỡng tùy tiện ("CPU > 80% là báo"). Kết quả: 200 alert/ngày, đội tắt thông báo, sự cố thật trôi qua. **Ít alert mà mỗi cái đáng tin** tốt hơn nhiều cái nhiễu.

> 🔁 **Dừng lại tự kiểm tra.** Nên alert cái nào: (A) "1 trong 10 node có CPU 92%" hay (B) "p99 latency của API tăng gấp 5 trong 10 phút"? Vì sao?
> <details><summary>Đáp án</summary><b>(B)</b>. Đó là <b>triệu chứng người dùng cảm nhận</b> (API chậm hẳn). (A) là nguyên nhân nội bộ có thể hoàn toàn vô hại (1 node bận, các node khác gánh được, user không thấy gì) → alert (A) dễ gây alert fatigue. Alert trên triệu chứng, dùng metric nguyên nhân để <i>điều tra</i> sau khi đã được báo.</details>

📝 **Tóm tắt mục 4.** Metric có 3 loại: **counter** (tăng), **gauge** (lên xuống), **histogram** (phân phối → percentile). **4 golden signals**: Latency, Traffic, Errors, Saturation. Alert trên **triệu chứng người dùng**, mỗi alert phải *đáng hành động* — để tránh **alert fatigue**.

---

## 5. SLI / SLO / SLA & error budget — đo độ tin cậy bằng số

💡 **Trực giác.** Ba khái niệm này là cách biến lời hứa mơ hồ "hệ thống ổn định" thành **con số có thể đo và chịu trách nhiệm**. Như cam kết giao hàng: SLI = "đo thực tế đã giao đúng hạn bao nhiêu %"; SLO = "mục tiêu nội bộ tự đặt: 99% giao đúng hạn"; SLA = "hợp đồng với khách: dưới 95% thì hoàn tiền".

### 5.1 Định nghĩa rõ từng cái

**SLI — Service Level Indicator (chỉ số mức dịch vụ).**
- **(a) Là gì:** một *phép đo thực tế* về chất lượng dịch vụ, dạng tỷ lệ. Ví dụ: `% request thành công = (request không-5xx) / (tổng request)`.
- **(b) Vì sao cần:** để nói về độ tin cậy bằng *số đo được*, không bằng cảm tính "dạo này hay lag".
- **(c) Ví dụ số:** trong 1.000.000 request tháng này có 800 lỗi → SLI khả dụng = `999200 / 1000000 = 99.92%`.

**SLO — Service Level Objective (mục tiêu mức dịch vụ).**
- **(a) Là gì:** *mục tiêu nội bộ* cho một SLI, dạng ngưỡng. Ví dụ: "SLI khả dụng ≥ **99.9%** mỗi tháng".
- **(b) Vì sao cần:** cho đội một lằn ranh rõ ràng "thế nào là đủ tốt" để cân bằng giữa làm tính năng mới và giữ ổn định.
- **(c) Ví dụ số:** SLO 99.9% nghĩa là *cho phép* tối đa 0.1% request lỗi.

**SLA — Service Level Agreement (cam kết mức dịch vụ).**
- **(a) Là gì:** *hợp đồng* với khách hàng kèm **hậu quả** (thường là tiền bồi thường) nếu không đạt.
- **(b) Vì sao cần:** ràng buộc pháp lý/thương mại — khách trả tiền để được đảm bảo.
- **(c) Ví dụ số:** SLA "khả dụng ≥ 99.5%/tháng, nếu thấp hơn hoàn 10% phí". SLA thường **lỏng hơn** SLO (99.5% < 99.9%) — để đội có vùng đệm sửa trước khi vi phạm hợp đồng.

> 💡 **Quan hệ:** SLI là *thước đo*, SLO là *mục tiêu* mình tự đặt (chặt hơn), SLA là *lời hứa với khách* (lỏng hơn, có phạt). `SLA < SLO`, và cả hai dựa trên cùng SLI.

### 5.2 Error budget — ngân sách lỗi (walk-through bằng số)

**Error budget (ngân sách lỗi).**
- **(a) Là gì:** lượng "được phép hỏng" còn lại = `100% − SLO`. Nếu SLO = 99.9% thì error budget = **0.1%** số request (hoặc thời gian) được phép lỗi.
- **(b) Vì sao cần:** biến độ tin cậy thành "ngân sách tiêu được". Còn budget → cứ release tính năng mới mạnh dạn. Cạn budget → đóng băng tính năng, dồn sức vá ổn định. Nó **gỡ tranh cãi** giữa dev (muốn ship nhanh) và vận hành (muốn an toàn) bằng một con số chung.
- **(c) Ví dụ số:** xem bảng dưới.

**Tính phút downtime cho phép mỗi tháng** (lấy 1 tháng ≈ 30 ngày = 43.200 phút):

$$\text{downtime cho phép} = (1 - \text{SLO}) \times \text{tổng thời gian}$$

| SLO | Tỷ lệ lỗi cho phép | Downtime/tháng (43.200 phút) | Downtime/năm |
|-----|:------------------:|:----------------------------:|:------------:|
| 99% ("two nines") | 1% | 432 phút ≈ **7.2 giờ** | ~3.65 ngày |
| 99.9% ("three nines") | 0.1% | **≈ 43.2 phút** | ~8.77 giờ |
| 99.99% ("four nines") | 0.01% | ≈ 4.32 phút | ~52.6 phút |
| 99.999% ("five nines") | 0.001% | ≈ 26 giây | ~5.26 phút |

**Walk-through cho SLO 99.9%:**
$$(1 - 0.999) \times 43200 = 0.001 \times 43200 = 43.2 \text{ phút/tháng}$$
Nghĩa là dịch vụ được phép "chết" tổng cộng **~43 phút mỗi tháng** mà vẫn đạt SLO. Nếu một sự cố tuần đầu đã ngốn 30 phút, **budget còn lại = 13.2 phút** — tháng đó nên thận trọng, hoãn các thay đổi rủi ro.

**Tính theo request thay vì thời gian.** Tháng có 5.000.000 request, SLO 99.9%:
$$\text{budget lỗi} = 0.001 \times 5{,}000{,}000 = 5000 \text{ request được phép lỗi}$$
Nếu đã có 4000 request lỗi → còn 1000 → gần cạn, cảnh giác.

> ⚠ **Lỗi thường gặp.** Đặt mục tiêu "100% uptime". Không thể và không kinh tế: mỗi "số 9" thêm vào chi phí gấp bội (từ 99.9% lên 99.99% có thể tốn gấp nhiều lần hạ tầng) trong khi user thường không cảm nhận khác biệt. Chọn SLO **vừa đủ** cho nhu cầu thật, không phải càng cao càng tốt.

> ❓ **"Vì sao SLO lại đặt *thấp hơn* 100% một cách cố ý?"** Vì error budget *là* khoảng để đổi mới. Nếu nhắm 100%, mọi thay đổi đều bị coi là rủi ro không chấp nhận được → hệ thống đóng băng, không ai dám deploy. Một chút "được phép hỏng" cho phép thử nghiệm, release nhanh, và chấp nhận rủi ro có kiểm soát.

> 🔁 **Dừng lại tự kiểm tra.** Dịch vụ SLO 99.95%/tháng. Tính downtime cho phép mỗi tháng (30 ngày). Đầu tháng có sự cố 20 phút — còn bao nhiêu budget?
> <details><summary>Đáp án</summary>Downtime cho phép = (1 − 0.9995) × 43200 = 0.0005 × 43200 = <b>21.6 phút/tháng</b>. Sau sự cố 20 phút, còn <b>1.6 phút</b> budget — gần cạn, phần còn lại của tháng nên đóng băng thay đổi rủi ro và tập trung ổn định.</details>

📝 **Tóm tắt mục 5.** **SLI** = thước đo thực tế (vd % thành công). **SLO** = mục tiêu nội bộ (vd ≥99.9%). **SLA** = hợp đồng có phạt với khách (lỏng hơn SLO). **Error budget** = `100%−SLO` = lượng được phép hỏng; còn budget thì ship nhanh, cạn budget thì dồn vá ổn định. SLO 99.9% → ~43 phút downtime/tháng.

---

## 6. Độ tin cậy — MTTR / MTBF & postmortem blameless

💡 **Trực giác.** Không hệ thống nào *không bao giờ* hỏng. Độ tin cậy thực dụng không phải "đừng hỏng" mà là "hỏng ít, và **phục hồi nhanh**". Như cứu hỏa: ta không thể cấm mọi đám cháy, nhưng có thể dập nhanh và rút kinh nghiệm để lần sau cháy ít hơn.

### 6.1 MTBF & MTTR

**MTBF — Mean Time Between Failures (thời gian trung bình giữa hai lần hỏng).**
- **(a) Là gì:** trung bình hệ chạy được bao lâu giữa hai sự cố. MTBF cao = ít hỏng.
- **(c) Ví dụ số:** trong 30 ngày có 3 sự cố → MTBF ≈ 30/3 = **10 ngày**.

**MTTR — Mean Time To Recovery (thời gian trung bình để phục hồi).**
- **(a) Là gì:** từ lúc hỏng đến lúc khôi phục dịch vụ, trung bình. MTTR thấp = phục hồi nhanh.
- **(c) Ví dụ số:** 3 sự cố mất 40, 20, 30 phút để khôi phục → MTTR = (40+20+30)/3 = **30 phút**.

> 💡 **Vì sao MTTR thường quan trọng hơn MTBF.** Bạn không kiểm soát được hết *khi nào* hỏng (MTBF), nhưng *kiểm soát được* phục hồi nhanh thế nào (MTTR) qua rollback tự động (xem [Lesson 03 — CI/CD](../lesson-03-ci-cd/)), alert tốt, runbook rõ. Giảm MTTR từ 60 phút xuống 5 phút cải thiện trải nghiệm user trực tiếp và rõ rệt.

**Liên hệ availability:** với hệ phục hồi được, khả dụng ≈ `MTBF / (MTBF + MTTR)`. Ví dụ MTBF = 10 ngày = 14400 phút, MTTR = 30 phút → availability ≈ 14400/14430 ≈ **99.79%**. Giảm MTTR xuống 5 phút → 14400/14405 ≈ **99.965%** — phục hồi nhanh kéo thẳng availability lên.

### 6.2 Postmortem không đổ lỗi (blameless postmortem)

Sau mỗi sự cố lớn, đội viết **postmortem** (báo cáo sau sự cố): chuyện gì xảy ra, dòng thời gian, nguyên nhân gốc, và hành động phòng ngừa.

**Blameless (không đổ lỗi)** = tập trung vào **hệ thống và quy trình đã cho phép lỗi xảy ra**, không truy trách cá nhân.

> ⚠ **Vì sao đổ lỗi cá nhân là phản tác dụng.** Nếu "ai gây ra sẽ bị phạt", mọi người sẽ **giấu lỗi** và **không dám báo sớm** → sự cố to hơn và bài học bị mất. Câu hỏi đúng không phải "ai gõ nhầm lệnh?" mà "vì sao *hệ thống cho phép* một lệnh gõ nhầm xóa được production? Vì sao không có xác nhận/backup/quyền hạn chặn lại?".

**Ví dụ blameless.** Một dev chạy nhầm lệnh xóa bảng production.
- *Đổ lỗi (tệ):* "Phạt dev đó, bắt cẩn thận hơn." → lần sau ai cũng sợ, vẫn xảy ra lại.
- *Blameless (tốt):* "Vì sao một người *có thể* xóa production chỉ bằng một lệnh, không cần xác nhận, không có backup tức thì? → Hành động: thêm bước xác nhận, tách quyền production, bật snapshot tự động." → sửa *gốc*, không phụ thuộc con người không bao giờ sai.

> 🔁 **Dừng lại tự kiểm tra.** Postmortem viết: "Nguyên nhân: bạn B bất cẩn, đã nhắc nhở." Sửa lại theo tinh thần blameless.
> <details><summary>Đáp án</summary>"Nguyên nhân gốc: quy trình triển khai cho phép push thẳng lên production không qua review, và không có cổng kiểm tra tự động. Hành động: (1) bắt buộc review trước khi deploy; (2) thêm kiểm tra tự động ở pipeline; (3) viết runbook rollback." — tập trung vào lỗ hổng hệ thống và hành động khắc phục, không phán xét cá nhân B.</details>

📝 **Tóm tắt mục 6.** **MTBF** = chạy được bao lâu giữa hai lần hỏng (cao = tốt). **MTTR** = phục hồi mất bao lâu (thấp = tốt, thường quan trọng hơn vì kiểm soát được). Availability ≈ `MTBF/(MTBF+MTTR)`. **Postmortem blameless** = soi hệ thống & quy trình, không truy cá nhân → khuyến khích báo sớm, sửa nguyên nhân gốc.

---

## 7. Bài tập

1. Phân biệt **monitoring** và **observability** bằng một ví dụ cụ thể (không dùng ví dụ ô tô trong bài).
2. Cho ba tình huống, chọn trụ cột phù hợp nhất (logs / metrics / traces) và giải thích:
   (a) "Tỷ lệ lỗi 5xx tuần này so với tuần trước?";
   (b) "Request `id=xyz` của khách VIP chậm 4 giây, chậm ở service nào?";
   (c) "Lúc 02:13 chính xác user nào đã đổi cấu hình gì?".
3. Viết lại dòng log free-text sau thành **structured log** JSON đúng level, **loại bỏ trường nhạy cảm**:
   `2026-06-11 ERROR user bob (token=eyJabc123) failed to charge card 4111111111111111 amount 250000`.
4. Dịch vụ đặt **SLO khả dụng 99.95%/tháng** (tháng 30 ngày). (a) Tính downtime cho phép mỗi tháng (phút). (b) Nếu đầu tháng đã có sự cố 15 phút, còn bao nhiêu error budget? (c) Theo bạn, nên hay không nên deploy một thay đổi lớn rủi ro trong phần còn lại của tháng? Vì sao?
5. Trong 30 ngày có 4 sự cố, thời gian khôi phục lần lượt 10, 50, 20, 40 phút. (a) Tính MTTR và MTBF. (b) Ước lượng availability theo `MTBF/(MTBF+MTTR)`. (c) Nếu giảm được MTTR xuống một nửa, availability đổi thế nào (định tính)?
6. Một bạn dev đặt alert: "CPU bất kỳ node nào > 75% thì gửi tin nhắn". Sau 1 tuần đội than phiền bị spam và bắt đầu phớt lờ. Chỉ ra vấn đề và đề xuất alert tốt hơn (nêu rõ alert trên cái gì).

## Lời giải chi tiết

**Bài 1.** Ví dụ thang máy chung cư. *Monitoring*: cảm biến báo "thang đang kẹt" (biết *khi nào* hỏng — câu hỏi định trước). *Observability*: có log mỗi lệnh điều khiển, metric tải trọng/nhiệt động cơ theo thời gian, và "trace" hành trình của chuyến đi bị kẹt → cho phép thợ trả lời câu hỏi *mới*: "vì sao chỉ kẹt vào giờ cao điểm ở tầng 7?". Monitoring báo *có* sự cố; observability cho dữ liệu đủ giàu để truy *nguyên nhân chưa biết trước*.

**Bài 2.** (a) **Metrics** — câu hỏi tổng hợp/xu hướng theo thời gian (tỷ lệ 5xx), metrics rẻ và sẵn để so sánh tuần-qua-tuần; dùng log để đếm sẽ chậm/đắt. (b) **Traces** — cần xem đường đi của *một* request cụ thể (theo trace ID) qua nhiều service để biết chặng nào chậm. (c) **Logs** — cần chi tiết chính xác một sự kiện tại một thời điểm (ai, đổi gì), đúng thế mạnh của log có cấu trúc.

**Bài 3.** Bỏ `token` và số thẻ đầy đủ (nhạy cảm), giữ 4 số cuối:
```json
{"ts":"2026-06-11T00:00:00Z","level":"ERROR","event":"charge_failed",
 "user":"bob","card_last4":"1111","amount":250000,"currency":"VND"}
```
Lý do: level `ERROR` vì thao tác *thất bại*; `token` và số thẻ đầy đủ là dữ liệu nhạy cảm — log lộ = rò rỉ; `card_last4` đủ để đối soát mà không lộ thẻ. (Có thể thêm `trace_id` để nối với trace.)

**Bài 4.** (a) Downtime cho phép = (1 − 0.9995) × (30 × 24 × 60) = 0.0005 × 43200 = **21.6 phút/tháng**. (b) Còn 21.6 − 15 = **6.6 phút** budget. (c) **Không nên** deploy thay đổi lớn rủi ro: budget gần cạn (chỉ còn 6.6 phút), một sự cố nữa là vi phạm SLO. Theo nguyên tắc error budget, khi budget thấp thì đóng băng thay đổi rủi ro, dồn sức vào ổn định; chờ chu kỳ sau khi budget reset.

**Bài 5.** (a) MTTR = (10+50+20+40)/4 = 120/4 = **30 phút**. MTBF ≈ tổng thời gian / số lần hỏng = (30×24×60)/4 = 43200/4 = **10800 phút ≈ 7.5 ngày**. (b) Availability ≈ MTBF/(MTBF+MTTR) = 10800/(10800+30) = 10800/10830 ≈ **99.72%**. (c) Giảm MTTR còn 15 phút → 10800/10815 ≈ **99.86%** — availability **tăng**, vì thời gian hỏng tổng cộng ít hơn. Phục hồi nhanh kéo availability lên ngay cả khi tần suất hỏng không đổi.

**Bài 6.** Vấn đề: alert đặt trên **nguyên nhân nội bộ** (CPU một node) với ngưỡng tùy tiện và **không phản ánh triệu chứng người dùng** — CPU 75% của một node thường vô hại (các node khác gánh được), nên đa số alert là báo động giả → **alert fatigue**, đội phớt lờ cả cảnh báo thật. Alert tốt hơn: đặt trên **triệu chứng user cảm nhận**, ví dụ "tỷ lệ lỗi 5xx của API > 1% trong 5 phút" hoặc "p99 latency > 2s trong 5 phút"; kèm link runbook/dashboard. CPU/saturation vẫn theo dõi trên dashboard để *điều tra* sau khi đã được báo, chứ không tự nó là alert dựng người dậy.

---

## 8. Code & Minh họa

- [visualization.html](./visualization.html) — 3 mô-đun tương tác:
  1. **Logs vs Metrics vs Traces**: cho một tình huống sự cố, chọn trụ cột — xem công cụ nào giúp được gì.
  2. **Tính error budget**: kéo slider SLO % → hiện ngay số phút downtime cho phép mỗi tháng và số request lỗi cho phép.
  3. **Dashboard 4 golden signals**: kéo thanh tải (traffic) → xem latency, errors, saturation phản ứng và signal nào báo động trước.

## 9. Bài tiếp theo

- [Lesson 06 — System design & scalability](../lesson-06-system-design-scalability/) — khi đã biết *quan sát* và *đo độ tin cậy*, bước tiếp là *thiết kế* hệ thống chịu tải lớn: phân tách service, cân bằng tải, caching, mở rộng ngang.
- Liên quan: [Lesson 03 — CI/CD](../lesson-03-ci-cd/) (rollback nhanh để giảm MTTR) và [Lesson 04 — Container & triển khai](../lesson-04-container-trien-khai/) (cái mà observability quan sát).
