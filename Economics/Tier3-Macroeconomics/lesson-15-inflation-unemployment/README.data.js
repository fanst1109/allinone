// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Economics/Tier3-Macroeconomics/lesson-15-inflation-unemployment/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 15 — Inflation & Unemployment

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **lạm phát (inflation)** — nguyên nhân, cách đo, hậu quả.
- Phân biệt **demand-pull inflation** (kéo cầu) và **cost-push inflation** (đẩy chi phí).
- Hiểu **đường Phillips** — quan hệ ngắn hạn giữa lạm phát và thất nghiệp.
- Phân biệt **đường Phillips ngắn hạn (SRPC)** và **dài hạn (LRPC)** — vai trò của kỳ vọng.
- Hiểu các loại **thất nghiệp**: ma sát, cấu trúc, chu kỳ, tự nhiên (NAIRU).
- Phân tích **stagflation** — lạm phát + thất nghiệp cao đồng thời (đã gặp ở Lesson 13).

## Kiến thức tiền đề

- [Lesson 11-14](../lesson-11-gdp-measurement/): GDP, AD-AS, chính sách.

## 1. Lạm phát — Đo và phân loại

### 1.1. Định nghĩa và đo

**Lạm phát** = tốc độ tăng giá trung bình của hàng hóa + dịch vụ.

\`\`\`
π_t = (P_t − P_{t-1}) / P_{t-1} × 100%
\`\`\`

Đo bằng CPI hoặc Deflator GDP (Lesson 11).

### 1.2. Phân loại theo mức độ

| Loại | Mức | Tác động |
|------|-----|----------|
| Lạm phát thấp | <3% | Lành mạnh, NHTW thường target ~2% |
| Lạm phát trung bình | 3-10% | Gây bất ổn, cần can thiệp |
| Lạm phát cao | 10-50% | Đầu tư giảm mạnh, đồng nội tệ mất uy tín |
| Siêu lạm phát (hyperinflation) | >50%/tháng | Phá hủy nền kinh tế (Zimbabwe 2008, Venezuela 2018) |
| Giảm phát (deflation) | <0% | Trì trệ, người tiêu dùng hoãn mua (Nhật 1990s) |

### 1.3. Hai nguyên nhân chính

**Demand-pull**: AD dịch phải mạnh → P + Y đều tăng. Vd: kích thích tài khóa quá mức, bong bóng tín dụng.

**Cost-push**: SRAS dịch trái → P tăng + Y giảm = stagflation. Vd: giá dầu 1973, 1979; chuỗi cung ứng COVID.

### 1.4. Hậu quả

- **Menu cost**: hãng phải đổi giá thường xuyên — tốn kém.
- **Shoeleather cost**: người dân giữ ít tiền mặt → đi ngân hàng nhiều.
- **Tax distortion**: thuế đánh trên thu nhập danh nghĩa → người chịu thuế ăn cả lạm phát.
- **Redistribution**: chủ nợ thua, con nợ thắng (nếu lạm phát bất ngờ).
- **Mất tin tưởng vào tiền tệ** ở mức siêu lạm phát.

## 2. Thất nghiệp — Đo và phân loại

### 2.1. Đo

\`\`\`
Tỉ lệ thất nghiệp = Số người thất nghiệp / Lực lượng lao động
\`\`\`

**Lực lượng lao động** = đang làm + đang tìm việc. *Không* tính người ngoài lực lượng (sinh viên, hưu trí, nội trợ).

**Phân biệt**:
- Người *thôi tìm việc* (discouraged worker) → không tính → tỉ lệ thất nghiệp underestimate.
- *Thất nghiệp tự nguyện* vs *bất đắc dĩ*.

### 2.2. Phân loại

1. **Ma sát (frictional)**: thời gian chuyển việc. Vd: sinh viên mới ra trường tìm việc.
2. **Cấu trúc (structural)**: kỹ năng không khớp / khu vực không có việc. Vd: thợ mỏ thất nghiệp khi ngành than đi xuống.
3. **Chu kỳ (cyclical)**: do suy thoái. Khi Y < Y* → cầu lao động giảm.
4. **Mùa vụ (seasonal)**: nông nghiệp, du lịch.

**Tỉ lệ thất nghiệp tự nhiên (natural rate)** = ma sát + cấu trúc. Thường 4-5% ở các nước phát triển. **NAIRU** (Non-Accelerating Inflation Rate of Unemployment) = mức thất nghiệp tương thích với lạm phát ổn định.

## 3. Phillips Curve

### 3.1. Quan sát ban đầu (Phillips 1958)

Dữ liệu Anh 1861-1957: lạm phát cao ↔ thất nghiệp thấp. Đường cong dốc xuống trên hệ \`(unemployment, inflation)\`.

→ Có *trade-off*? Có thể chọn ít thất nghiệp đổi lấy lạm phát cao?

### 3.2. Đường Phillips ngắn hạn (SRPC)

\`\`\`
π = π^e − β · (u − u*)
\`\`\`
- \`π^e\` = lạm phát kỳ vọng.
- \`u*\` = NAIRU.
- \`β > 0\`.

Khi \`u < u*\` (nóng) → \`π > π^e\`. Khi \`u > u*\` (lạnh) → \`π < π^e\`.

### 3.3. Đường Phillips dài hạn (LRPC)

Trong dài hạn, kỳ vọng *điều chỉnh*. Người dân học được lạm phát thực sẽ là gì. → \`π^e = π\`. Thay vào SRPC:
\`\`\`
π = π − β(u − u*) → u = u*
\`\`\`

→ **LRPC thẳng đứng tại u = u***. Không có trade-off dài hạn.

#### 💡 Trực giác

Ngắn hạn: NHTW tăng cung tiền *bất ngờ* → lạm phát tăng → lương danh nghĩa chậm điều chỉnh → lương thực giảm → hãng thuê thêm → u giảm. Nhưng khi người lao động *nhận ra* → đòi tăng lương → SRPC dịch lên.

Dài hạn: chỉ tăng lạm phát, không tăng việc làm. Đây là **kỳ vọng duy lý** + **expectations-augmented Phillips Curve** (Friedman, Phelps 1968).

### 3.4. Quan sát thực tế

- 1960s Mỹ: Phillips trade-off ổn định, chính phủ "chọn" combo.
- 1970s: SRPC dịch lên (sốc dầu + kỳ vọng) → stagflation. Trade-off cũ tan vỡ.
- 1980s Volcker: NHTW Fed siết tiền → lạm phát giảm + thất nghiệp tăng tạm thời. Khi kỳ vọng giảm → quay lại u*.
- 2010s-2020: SRPC *phẳng dần* → lạm phát ít phản ứng với u. Tranh luận: do toàn cầu hóa, công nghệ, hay kỳ vọng đã neo chặt.

## 4. Bài tập thực hành

### Bài 1 — Tính lạm phát

CPI: 100 (2020), 110 (2023), 115 (2024). Tính π 2023, π 2024.

### Bài 2 — Tỉ lệ thất nghiệp

Nước có: 10 triệu đang làm, 1 triệu đang tìm việc, 3 triệu ngoài lực lượng. Tính u%.

### Bài 3 — Phillips ngắn hạn

\`π = π^e − 0.5(u − 5)\`. Cho \`π^e = 2%\`.

- (a) Nếu u = 3%, π = ?
- (b) Nếu u = 7%, π = ?
- (c) Nếu NHTW muốn π = 1%, u cần là?

### Bài 4 — Đánh giá kịch bản

Mô tả định tính 3 kịch bản và phản ứng đường Phillips:
- (a) Sốc dầu (cost-push).
- (b) Kỳ vọng lạm phát giảm xuống.
- (c) NHTW thắt chặt mạnh và đáng tin.

## 5. Lời giải chi tiết

### Lời giải Bài 1

π 2023 = \`(110−100)/100 = 10%\`. π 2024 = \`(115−110)/110 ≈ 4.55%\`.

### Lời giải Bài 2

Lực lượng lao động = \`10 + 1 = 11\` triệu. u = \`1/11 ≈ 9.1%\`.

### Lời giải Bài 3

(a) \`π = 2 − 0.5(3−5) = 2 + 1 = 3%\`.
(b) \`π = 2 − 0.5(7−5) = 2 − 1 = 1%\`.
(c) \`1 = 2 − 0.5(u−5)\` → \`0.5(u−5) = 1\` → \`u = 7%\`. Cần u tăng 2 điểm trên NAIRU để hạ lạm phát 1 điểm. Đây là *sacrifice ratio*.

### Lời giải Bài 4

(a) **Sốc dầu**: SRPC dịch *lên + phải* — tại mỗi mức u, lạm phát cao hơn. Stagflation: u tăng + π tăng.

(b) **Kỳ vọng giảm**: SRPC dịch *xuống* — tại mỗi mức u, lạm phát thấp hơn. Tổn thất ít hơn khi siết.

(c) **NHTW siết đáng tin**: thay đổi kỳ vọng → SRPC dịch xuống *nhanh* → cost của disinflation thấp (sacrifice ratio nhỏ). Đây là vì sao *credibility* của NHTW quan trọng.

## 6. Liên kết và bài tiếp theo

- **Tier 4** (sắp ra): International Trade, Behavioral, Development, Econometrics, Finance.
- **Bài trước**: [Lesson 14 — Monetary & Fiscal Policy](../lesson-14-monetary-fiscal-policy/).
- **Minh họa**: [visualization.html](./visualization.html) — Phillips curve tương tác.
`;
