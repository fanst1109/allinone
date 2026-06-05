// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/07-Mathematical-Modeling/lesson-08-capstone-modeling-project/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 08 — Capstone: dự án mô hình hóa end-to-end

## Mục tiêu

- **Phối hợp** mọi công cụ của tầng 7 (L01–L07) trên một bài toán thực.
- Đi trọn [chu trình 6 bước](../lesson-01-modeling-cycle/) một cách bài bản: từ câu hỏi → giả định → mô hình → giải → kiểm chứng → tinh chỉnh.
- Rèn kỹ năng *chọn đúng loại mô hình*, *fit tham số từ dữ liệu*, *kiểm chứng & biện luận hạn chế*.

## Kiến thức tiền đề

- Toàn bộ [Lesson 01–07](../) của tầng này.

---

## 1. Capstone là gì và làm thế nào?

💡 Sáu lesson trước dạy *từng công cụ* riêng lẻ. Dự án thực tế hiếm khi gọn trong một công cụ — nó đòi bạn **chọn và phối hợp**. Capstone = một bài toán đủ lớn để đi trọn chu trình và chạm nhiều công cụ, đủ nhỏ để hoàn thành.

**Bản đồ công cụ — gặp tình huống nào, dùng gì:**

| Tình huống | Công cụ | Lesson |
|------------|---------|--------|
| Có bảng dữ liệu, cần rút quy luật/tham số | Hồi quy, tuyến tính hóa | [L02](../lesson-02-empirical-curve-fitting/) |
| Hệ cập nhật theo bước (năm, ngày, vòng lặp) | Phương trình sai phân | [L03](../lesson-03-discrete-dynamical/) |
| Đại lượng biến thiên liên tục, có "tốc độ" | ODE (mũ, logistic, trộn) | [L04](../lesson-04-continuous-ode-models/) |
| Nhiều nhóm tương tác (thú–mồi, dịch) | Hệ ODE | [L05](../lesson-05-interacting-systems/) |
| Cần "tốt nhất" dưới ràng buộc nguồn lực | LP, Lagrange | [L06](../lesson-06-optimization-models/) |
| Có yếu tố may rủi, cần phân phối/rủi ro | Monte Carlo, Markov | [L07](../lesson-07-stochastic-monte-carlo/) |
| Luôn cần: kiểm đơn vị, nêu giả định, kiểm chứng | Chu trình + thứ nguyên | [L01](../lesson-01-modeling-cycle/) |

📝 **Tóm tắt mục 1**: capstone = phối hợp công cụ trên một bài thực; tra "bản đồ công cụ" để chọn đúng loại mô hình cho từng phần.

---

## 2. Dự án mẫu — "Một video lan truyền (viral) đạt bao nhiêu lượt xem?"

Đi trọn 6 bước, chạm L01, L02, L03, L04, L07.

### Bước 1 — Bài toán
Một video mới đăng. Quan sát lượt xem tích lũy vài ngày đầu. **Câu hỏi**: video sẽ đạt tối đa bao nhiêu lượt? Ngày nào lan nhanh nhất (để canh chạy quảng cáo)?

### Bước 2 — Giả định
- Có một "khán giả tiềm năng" tối đa K (người có thể xem).
- Lan truyền kiểu *truyền miệng*: người đã xem giới thiệu người chưa xem → tốc độ lan tỉ lệ *cả* số đã xem *và* số chưa xem còn lại → đúng dạng **logistic** (L04).
- Bỏ qua biến động ngẫu nhiên ngày-qua-ngày ở bước đầu (sẽ bàn ở bước 6).

### Bước 3 — Lập mô hình
Gọi V(t) = lượt xem tích lũy (ngày t). Mô hình logistic:
\`\`\`
dV/dt = r·V·(1 − V/K)   →   V(t) = K / (1 + A·e^(−rt)),  A = (K − V₀)/V₀
\`\`\`
Kiểm thứ nguyên (L01): [r] = ngày⁻¹, mũ −rt không thứ nguyên ✓; V và K cùng đơn vị "lượt" ✓.

### Bước 4 — Giải & phân tích
Đặc trưng logistic ([L04 mục 3](../lesson-04-continuous-ode-models/)):
- **Tối đa** lượt xem = K (bão hòa khi t → ∞).
- **Lan nhanh nhất** (lượt xem mới/ngày đạt đỉnh) tại điểm uốn V = K/2, thời điểm t* = ln(A)/r; lượt xem mới/ngày cực đại = r·K/4.

### Bước 5 — Kiểm chứng (fit tham số từ dữ liệu — L02)
Giả sử K ≈ 1 000 000 (ước lượng quy mô kênh) và đo được vài ngày đầu (khi V ≪ K, logistic ≈ mũ V ≈ V₀·e^(rt)):

| t (ngày) | V (lượt) | ln V |
|----------|----------|------|
| 0 | 1 000 | 6.91 |
| 2 | 4 950 | 8.51 |
| 4 | 24 000 | 10.09 |

Fit tuyến tính ln V theo t (tuyến tính hóa, L02): độ dốc ≈ (10.09 − 6.91)/4 = 3.18/4 ≈ **0.80** → **r ≈ 0.8/ngày**; V₀ = e^6.91 ≈ 1000.
- A = (1 000 000 − 1000)/1000 = 999.
- **V(t) = 1 000 000 / (1 + 999·e^(−0.8t))**.
- Điểm lan nhanh nhất: t* = ln(999)/0.8 = 6.907/0.8 ≈ **8.6 ngày**; lượt mới/ngày đỉnh ≈ rK/4 = 0.8·10⁶/4 = **200 000 lượt/ngày**.
- Kiểm: V(0) = 10⁶/1000 = 1000 ✓; t = 4 → 999·e^(−3.2) = 40.7 → V ≈ 24 000 ✓ (khớp dữ liệu).

→ **Trả lời**: tối đa ~1 triệu lượt; lan mạnh nhất quanh **ngày 8–9** → nên dồn quảng cáo trước mốc đó để khuếch đại.

### Bước 6 — Tinh chỉnh & hạn chế
- K chỉ là *ước lượng*; nếu sai, dự báo đỉnh lệch. Nên fit lại K khi có thêm dữ liệu (fit logistic đầy đủ, không chỉ đoạn mũ đầu).
- Thực tế lượt xem có **biến động ngẫu nhiên** (thuật toán đề xuất, sự kiện) → bọc mô hình bằng **Monte Carlo** (L07): chạy nhiều kịch bản r, K để ra *khoảng* dự báo thay vì một đường.
- Nếu xét theo **ngày rời rạc**, dùng phiên bản sai phân (L03) Vₙ₊₁ = Vₙ + r·Vₙ(1 − Vₙ/K) — nhớ cảnh báo bước lớn gây dao động giả (L04 mục 5).

📝 Toàn bộ chu trình: câu hỏi cụ thể → giả định truyền miệng → logistic → đặc trưng K, đỉnh → fit r từ dữ liệu đầu (tuyến tính hóa) → kiểm chứng khớp → nêu hạn chế & hướng bọc ngẫu nhiên. *Đây là mẫu cho dự án của bạn.*

---

## 3. Checklist tự làm dự án

- [ ] **Câu hỏi rõ ràng**: đầu ra là *số/đại lượng* nào? (không mơ hồ)
- [ ] **Giả định liệt kê đầy đủ** + lý do bỏ qua từng yếu tố.
- [ ] **Chọn loại mô hình** đúng theo bản đồ mục 1 (rời rạc/liên tục/hệ/tối ưu/ngẫu nhiên).
- [ ] **Kiểm thứ nguyên** hai vế mọi phương trình (L01).
- [ ] **Fit tham số từ dữ liệu** nếu có (L02), nêu R²/sai số.
- [ ] **Giải/mô phỏng** và rút đại lượng cần trả lời.
- [ ] **Kiểm chứng**: giới hạn (t→0, t→∞), so dữ liệu/trực giác, đơn vị hợp lý.
- [ ] **Nêu hạn chế** rõ ràng + hướng tinh chỉnh.

---

## 4. Bài tập

**Bài 1 (có hướng dẫn).** Mô hình hóa "cốc trà sữa nguội trong phòng máy lạnh 20°C, ban đầu 80°C". Đi đủ 6 bước ở mức tối giản: chọn mô hình, viết phương trình, nêu cần đo gì để fit tham số, và 1 hạn chế.

**Bài 2 (dự án mở).** Chọn MỘT trong các đề và phác chu trình 6 bước (không cần giải chi tiết, chỉ nêu: câu hỏi, giả định chính, loại mô hình + lý do, cần dữ liệu gì để kiểm chứng, 1 hạn chế):
- (a) Lượng pin điện thoại còn lại theo thời gian dùng.
- (b) Số người biết một tin đồn trong lớp 40 người theo thời gian.
- (c) Tối ưu số bàn/ghế một xưởng nên làm tuần này để lời nhất với gỗ và công có hạn.
- (d) Thời gian chờ trung bình ở quầy thanh toán giờ cao điểm.

---

## 5. Lời giải / gợi ý

**Bài 1.**
1. *Bài toán*: T(t) = nhiệt độ trà sữa; hỏi bao lâu xuống mức uống được (vd 40°C).
2. *Giả định*: phòng 20°C không đổi; trà sữa trộn đều một nhiệt độ; tốc độ mất nhiệt tỉ lệ chênh lệch (Newton); bỏ qua bay hơi.
3. *Mô hình* (L04): dT/dt = −k(T − 20) → T(t) = 20 + (80 − 20)e^(−kt) = 20 + 60e^(−kt). Kiểm thứ nguyên [k] = thời gian⁻¹.
4. *Cần đo để fit k* (L02): một (hoặc vài) điểm (t, T) — vd "sau 10 phút còn 50°C" → 50 = 20 + 60e^(−10k) → e^(−10k) = 1/2 → k = ln2/10 ≈ 0.069/phút. Nhiều điểm thì fit tuyến tính ln(T−20) theo t.
5. *Giải*: thời gian đạt 40°C: 40 = 20 + 60e^(−kt) → e^(−kt) = 1/3 → t = ln3/k ≈ 1.0986/0.069 ≈ **16 phút**.
6. *Kiểm chứng & hạn chế*: T(0) = 80 ✓, t→∞ → 20 ✓; hạn chế: bỏ qua bay hơi (làm nguội nhanh hơn lúc rất nóng), trà sữa có đá thì mô hình khác hẳn (pha rắn–lỏng).

**Bài 2 — mẫu cho (b) tin đồn trong lớp 40 người:**
- *Câu hỏi*: sau bao lâu cả lớp biết tin; ngày/giờ nào lan nhanh nhất.
- *Giả định chính*: lan truyền miệng (người biết kể người chưa biết); lớp kín 40 người; ai cũng tiếp xúc đều (trộn đều).
- *Loại mô hình*: **logistic** (L04) hoặc **SIR không hồi phục** (L05) với K = 40 — vì tốc độ lan tỉ lệ (số biết)×(số chưa biết). Có thể rời rạc theo giờ (L03).
- *Dữ liệu kiểm chứng*: đếm số người biết tại vài mốc thời gian → fit r.
- *Hạn chế*: "trộn đều" sai (lớp có nhóm bạn thân lan nhanh, người ngồi xa lan chậm); một số người không kể lại → cần hệ số lan thực tế < lý thuyết.

(Các đề khác: (a) phân rã/tuyến tính giảm dần — đo % pin theo phút; (c) **LP** L06 — max lợi nhuận với ràng buộc gỗ/công; (d) **hàng đợi ngẫu nhiên / Markov** L07 — khách đến Poisson, mô phỏng Monte Carlo thời gian chờ.)

---

## 6. Kết thúc Tầng 7 & Math

🎓 Hoàn thành Tầng 7 → **Math khép lại đủ 7 tầng**. Bạn đã có cả *công cụ* (T1–T6: số học → giải tích → đại số tuyến tính → ODE → xác suất) lẫn *cách dùng công cụ* (T7: mô hình hóa). 

Tiếp theo, áp dụng vào các lĩnh vực: [Physics](../../../Physics/) (cơ học, điện từ dùng ODE), [Economics](../../../Economics/) (tối ưu, kinh tế lượng), [AI-ML](../../../AI-ML/) (xác suất, Monte Carlo), [Biology](../../../Biology/) (quần thể, dịch tễ).

## 📝 Tổng kết

1. **Capstone** = phối hợp công cụ L01–L07 trên một bài thực, đi trọn chu trình 6 bước.
2. **Bản đồ công cụ**: dữ liệu→hồi quy; theo bước→sai phân; liên tục→ODE; tương tác→hệ ODE; tối ưu→LP/Lagrange; may rủi→Monte Carlo/Markov.
3. **Dự án mẫu (video viral)**: logistic + fit r từ dữ liệu đầu (tuyến tính hóa) + nêu hạn chế & bọc ngẫu nhiên — mẫu áp dụng cho mọi dự án.
4. Luôn: câu hỏi rõ → giả định → kiểm thứ nguyên → fit → kiểm chứng → nêu hạn chế.
`;
