// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/07-Mathematical-Modeling/lesson-02-empirical-curve-fitting/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 — Mô hình từ dữ liệu (Hồi quy bình phương tối thiểu)

## Mục tiêu

- Khi *chưa biết* quy luật, dựng mô hình bằng cách **khớp với dữ liệu** đo được.
- Phân biệt **nội suy (interpolation)** và **hồi quy/khớp xu hướng (regression)**.
- Hiểu và áp dụng **hồi quy tuyến tính bình phương tối thiểu (least squares)**: công thức nghiệm và walk-through bằng số.
- Hiểu **vì sao bình phương** sai số (không phải trị tuyệt đối).
- Đánh giá độ khớp bằng **hệ số xác định R²**.
- **Tuyến tính hóa** mô hình phi tuyến (mũ, lũy thừa) để fit — tổng quát hóa cách tìm hằng số k của định luật nguội Newton ở [Lesson 01](../lesson-01-modeling-cycle/).

## Kiến thức tiền đề

- [Lesson 01 — Chu trình mô hình hóa](../lesson-01-modeling-cycle/) (đặc biệt bước 5 — kiểm chứng).
- [T4 — Đạo hàm](../../04-Calculus-1var/lesson-03-derivative-definition/) (cực tiểu hóa bằng đạo hàm = 0).
- [T1 — Hệ phương trình bậc nhất](../../01-Arithmetic-Algebra/lesson-03-linear-equations/).

---

## 1. Mô hình từ dữ liệu là gì?

💡 **Trực giác / Hình dung — vẽ một đường "đi giữa" đám điểm.** Ở [Lesson 01](../lesson-01-modeling-cycle/) ta *biết trước* quy luật (định luật Newton) rồi mới tìm hằng số. Nhưng nhiều khi ta chỉ có **bảng số đo** — doanh thu theo tháng, cân nặng theo tuổi — mà *không biết* công thức nào sinh ra chúng. Mô hình từ dữ liệu đảo ngược: nhìn vào đám điểm, **vẽ một đường khớp nhất**, rồi dùng đường đó để dự đoán.

> 📐 **Định nghĩa đầy đủ — Khớp mô hình (model fitting)**
>
> **(a) Là gì**: Cho một tập dữ liệu gồm n cặp (xᵢ, yᵢ), và một **họ hàm** có tham số (vd đường thẳng y = ax + b với tham số a, b). Khớp mô hình = tìm bộ tham số làm hàm "gần" dữ liệu nhất theo một **tiêu chí sai số** đã chọn.
>
> **(b) Vì sao cần**: Thực tế hiếm khi cho sẵn công thức. Dữ liệu đo luôn có **nhiễu** (sai số đo, yếu tố ngẫu nhiên). Ta cần rút ra *xu hướng* ẩn dưới nhiễu để (1) dự đoán giá trị chưa đo, (2) ước lượng tham số có ý nghĩa vật lý (vd hằng số k), (3) kiểm tra giả thuyết "quan hệ có tuyến tính không?".
>
> **(c) Ví dụ số**: Đo chiều cao lò xo theo khối lượng treo: (m=1kg, L=12cm), (2, 14), (3, 17), (4, 18.5), (5, 21). Các điểm gần một đường thẳng nhưng không thẳng tắp (nhiễu đo). Khớp đường thẳng L = a·m + b cho ta "độ giãn trên mỗi kg" = a, và dự đoán L tại m = 2.5kg dù chưa đo. (Đây là định luật Hooke — xem [Physics](../../../Physics/).)

❓ **Câu hỏi tự nhiên của người đọc**

- *"Khác gì với việc tìm hằng số k ở Lesson 01?"* Ở L01 ta đã *biết* dạng hàm (e^(−kt)) và chỉ dùng **1 điểm** dữ liệu để chốt k. Ở đây ta dùng **nhiều điểm** và tìm bộ tham số khớp *tổng thể* tốt nhất — chống nhiễu tốt hơn (1 điểm có thể là điểm đo sai).
- *"Đường khớp có phải đi qua các điểm không?"* Thường **không**. Vì dữ liệu có nhiễu, ép đường qua mọi điểm (nội suy) lại bám cả nhiễu → xem mục 2.

📝 **Tóm tắt mục 1**

- Khớp mô hình = tìm tham số của một họ hàm sao cho gần dữ liệu nhất theo tiêu chí sai số.
- Cần vì dữ liệu thực có nhiễu; ta muốn rút xu hướng để dự đoán và ước lượng tham số.
- Dùng *nhiều* điểm → bền với nhiễu hơn cách chốt tham số bằng 1 điểm ở L01.

---

## 2. Nội suy vs khớp xu hướng

💡 **Trực giác / Hình dung.** Có hai thái độ trước đám điểm:
- **Nội suy (interpolation)**: "dữ liệu là chân lý" → vẽ đường **đi qua đúng mọi điểm**.
- **Hồi quy (regression)**: "dữ liệu có nhiễu" → vẽ đường **đi giữa**, chấp nhận lệch khỏi từng điểm để bám *xu hướng*.

| | Nội suy | Hồi quy (khớp xu hướng) |
|---|---|---|
| **Đường có qua mọi điểm?** | Có | Không (cố ý) |
| **Giả định về dữ liệu** | Chính xác, không nhiễu | Có nhiễu ngẫu nhiên |
| **Số tham số** | Bằng số điểm (đa thức bậc n−1 cho n điểm) | Ít (vd 2 cho đường thẳng) |
| **Dùng khi** | Số liệu chính xác (bảng tra, tọa độ thiết kế) | Số liệu đo có sai số (đa số thực tế) |

⚠ **Lỗi thường gặp — dùng đa thức bậc cao để "khớp hoàn hảo".** Ép đa thức bậc n−1 qua n điểm cho sai số 0 *trên dữ liệu đã có*, nhưng giữa các điểm nó **dao động dữ dội** (hiện tượng Runge) và dự đoán ngoài vùng dữ liệu thì *thảm họa*. Phản ví dụ: 10 điểm gần như thẳng hàng + 1 chút nhiễu → đa thức bậc 9 qua hết 10 điểm sẽ uốn lượn điên loạn, còn đường thẳng hồi quy thì bám xu hướng đẹp. **Khớp hoàn hảo dữ liệu cũ ≠ dự đoán tốt dữ liệu mới** — đây là mầm mống của *overfitting* (mục 7).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vậy nội suy luôn tệ?"* Không. Khi dữ liệu *thật sự chính xác* (vd tọa độ điểm điều khiển trong đồ họa, bảng giá trị hàm toán) thì nội suy đúng việc. Chỉ tệ khi dữ liệu có nhiễu mà ta lại ép đi qua hết.
- *"Làm sao biết nên nội suy hay hồi quy?"* Hỏi: *dữ liệu của tôi có nhiễu không?* Đo vật lý/khảo sát → có nhiễu → hồi quy. Giá trị định nghĩa/thiết kế chính xác → nội suy.

🔁 **Dừng lại tự kiểm tra**

1. Bạn có 50 điểm đo nhiệt độ ngoài trời theo giờ (có sai số ±0.5°C). Nên nội suy đa thức bậc 49 hay hồi quy? Vì sao?

<details><summary>Đáp án</summary>

**Hồi quy** (hoặc spline trơn), không nội suy bậc 49. Dữ liệu có nhiễu ±0.5°C; đa thức bậc 49 sẽ bám hết nhiễu và dao động hoang dã giữa các giờ, dự đoán vô nghĩa. Ta muốn *xu hướng* nhiệt độ, không phải tái tạo từng sai số đo.

</details>

📝 **Tóm tắt mục 2**

- Nội suy: qua đúng mọi điểm (giả định dữ liệu chính xác). Hồi quy: đi giữa, chấp nhận lệch (giả định có nhiễu).
- Đa thức bậc cao "khớp hoàn hảo" → dao động Runge, dự đoán tệ — khớp dữ liệu cũ ≠ dự đoán tốt.
- Đa số dữ liệu đo có nhiễu → chọn hồi quy.

---

## 3. Hồi quy tuyến tính bình phương tối thiểu

💡 **Trực giác / Hình dung.** Với mỗi đường thẳng ứng viên ŷ = ax + b, mỗi điểm dữ liệu lệch khỏi đường một đoạn dọc gọi là **phần dư (residual)** eᵢ = yᵢ − (axᵢ + b). Ta muốn đường nào tổng các đoạn lệch "nhỏ nhất". Để tránh lệch âm triệt tiêu lệch dương, ta **bình phương** từng đoạn rồi cộng lại — và đi tìm a, b cực tiểu hóa tổng đó. Hình dung: mỗi điểm nối với đường bằng một lò xo dọc; đường tối ưu là vị trí cân bằng năng lượng lò xo nhỏ nhất.

**Tiêu chí bình phương tối thiểu**: chọn a, b cực tiểu hóa
\`\`\`
S(a, b) = Σᵢ eᵢ² = Σᵢ (yᵢ − a·xᵢ − b)²
\`\`\`

**Tìm cực tiểu**: cho đạo hàm riêng theo a và b bằng 0 (xem [T4](../../04-Calculus-1var/lesson-05-derivative-applications/) và [T6 L04](../../06-Advanced/lesson-04-multivariable-functions/)):
\`\`\`
∂S/∂b = −2 Σ(yᵢ − a·xᵢ − b) = 0
∂S/∂a = −2 Σ xᵢ(yᵢ − a·xᵢ − b) = 0
\`\`\`
Giải hệ 2 phương trình này (gọi là **phương trình chuẩn — normal equations**) ra công thức đóng:
\`\`\`
      n·Σxy − Σx·Σy                Σy − a·Σx
a = ─────────────────  ,    b = ───────────── = ȳ − a·x̄
      n·Σx² − (Σx)²                     n
\`\`\`

### 3.1 Walk-through bằng số

**Ngữ cảnh thực**: 5 bạn học sinh, ghi lại *số giờ ôn thi mỗi tuần* (x) và *điểm kiểm tra* (y, thang 10). Trực giác: ôn nhiều → điểm cao hơn, nhưng *có nhiễu* (bạn ôn 3 giờ được 5 điểm trội hơn xu hướng; bạn ôn 4 giờ chỉ được 4 điểm vì hôm đó mệt). Ta muốn rút *xu hướng* "mỗi giờ ôn đáng giá bao nhiêu điểm".

Dữ liệu 5 điểm (giờ, điểm): (1, 2), (2, 3), (3, 5), (4, 4), (5, 6).

**Bước 1 — tính các tổng**:

| xᵢ (giờ) | yᵢ (điểm) | xᵢyᵢ | xᵢ² |
|----|----|------|-----|
| 1 | 2 | 2 | 1 |
| 2 | 3 | 6 | 4 |
| 3 | 5 | 15 | 9 |
| 4 | 4 | 16 | 16 |
| 5 | 6 | 30 | 25 |
| **Σ=15** | **Σ=20** | **Σ=69** | **Σ=55** |

n = 5, Σx = 15, Σy = 20, Σxy = 69, Σx² = 55.

**Bước 2 — tính a**:
\`\`\`
a = (5·69 − 15·20) / (5·55 − 15²) = (345 − 300) / (275 − 225) = 45 / 50 = 0.9
\`\`\`

**Bước 3 — tính b**:
\`\`\`
b = (20 − 0.9·15) / 5 = (20 − 13.5) / 5 = 6.5 / 5 = 1.3
\`\`\`

**Kết quả**: đường khớp **ŷ = 0.9x + 1.3**.

**Diễn giải thực**: mỗi giờ ôn thêm/tuần ≈ **+0.9 điểm** (độ dốc a); bạn không ôn giờ nào (x = 0) dự kiến ≈ **1.3 điểm** (tung độ gốc b). Dự đoán: ôn 6 giờ → ŷ = 0.9·6 + 1.3 = 6.7 điểm (dù chưa ai trong nhóm ôn 6 giờ).

**Verify**: tại x̄ = 3, đường cho ŷ = 0.9·3 + 1.3 = 4.0 = ȳ ✓ (đường hồi quy luôn đi qua "trọng tâm" (x̄, ȳ) — một tính chất đẹp dùng để kiểm tra nhanh).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao đặt đạo hàm = 0 lại ra cực tiểu chứ không phải cực đại?"* Vì S(a,b) là hàm bậc 2 theo a, b với hệ số bậc hai dương (Σx² > 0) — một paraboloid mở lên trên, chỉ có *một* điểm dừng và đó là cực tiểu toàn cục. Không có cực đại hữu hạn (S → ∞ khi a, b → ∞).
- *"Mẫu số n·Σx² − (Σx)² có khi nào bằng 0 không?"* Bằng 0 khi mọi xᵢ bằng nhau (mọi điểm cùng một hoành độ) — khi đó không xác định được độ dốc (đường thẳng đứng), bài toán vô nghĩa. Với x phân biệt thì mẫu > 0.
- *"Hồi quy y theo x và x theo y có ra cùng đường không?"* **Không!** Đổi vai trò x↔y cho đường khác (vì ta cực tiểu lệch *dọc* theo trục y). Phải rõ biến nào là "đầu vào".

⚠ **Lỗi thường gặp — lẫn Σx² với (Σx)².** Σx² = tổng của các bình phương (ở ví dụ: 55); (Σx)² = bình phương của tổng (15² = 225). Hai số khác hẳn nhau. Lẫn chúng → sai a hoàn toàn.

🔁 **Dừng lại tự kiểm tra**

1. Cho 3 điểm (0, 1), (1, 3), (2, 5). Tính a, b. (Gợi ý: các điểm thẳng hàng hoàn hảo.)

<details><summary>Đáp án</summary>

n=3, Σx=3, Σy=9, Σxy = 0+3+10 = 13, Σx² = 0+1+4 = 5.
a = (3·13 − 3·9)/(3·5 − 9) = (39−27)/(15−9) = 12/6 = **2**.
b = (9 − 2·3)/3 = 3/3 = **1**. → ŷ = 2x + 1. Thẳng hàng hoàn hảo nên residual = 0, đường qua đúng cả 3 điểm.

</details>

### 📝 Tóm tắt mục 3

- Bình phương tối thiểu: cực tiểu S = Σ(yᵢ − axᵢ − b)² (tổng bình phương phần dư).
- Cho ∂S/∂a = ∂S/∂b = 0 → phương trình chuẩn → công thức đóng cho a, b.
- a = (nΣxy − ΣxΣy)/(nΣx² − (Σx)²), b = ȳ − a·x̄. Đường luôn qua trọng tâm (x̄, ȳ).
- Phân biệt Σx² và (Σx)².

---

## 4. Vì sao bình phương sai số?

💡 **Trực giác.** Tại sao cực tiểu Σeᵢ² mà không phải Σ|eᵢ| (tổng trị tuyệt đối)? Ba lý do:

1. **Triệt tiêu dấu** mà vẫn *trơn*: bình phương biến lệch âm thành dương (như trị tuyệt đối), nhưng x² **khả vi mọi nơi** còn |x| gãy tại 0. Khả vi → đặt đạo hàm = 0 → ra **công thức nghiệm đóng** đẹp (mục 3). Trị tuyệt đối không cho nghiệm đóng, phải giải lặp.
2. **Phạt mạnh điểm lệch xa**: lệch gấp đôi bị phạt gấp *bốn* (2² = 4). Mô hình "rất sợ" sai lớn → kéo đường về phía giảm các lệch lớn.
3. **Nền tảng xác suất**: nếu nhiễu tuân theo phân phối chuẩn (Gauss), thì nghiệm bình phương tối thiểu *chính là* nghiệm hợp lý cực đại (MLE) — xem [Vectors/05-Probability](../../../Vectors/). Đây là lý do sâu xa nhất.

⚠ **Lỗi thường gặp — quên rằng bình phương nhạy với outlier.** Chính ưu điểm "phạt mạnh lệch xa" trở thành nhược điểm khi có **điểm ngoại lai (outlier)** do đo sai: một điểm lệch khổng lồ kéo cả đường về phía nó. Khi nghi ngờ outlier, cân nhắc hồi quy bền vững (robust) dùng trị tuyệt đối hoặc loại outlier trước. Phản ví dụ: dữ liệu 5 điểm thẳng + 1 điểm gõ nhầm "60" thay vì "6" → đường bình phương tối thiểu nghiêng hẳn đi.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Sao không dùng tổng lệch Σeᵢ (không bình phương, không trị tuyệt đối)?"* Vì lệch âm và dương triệt tiêu nhau: một đường tệ có thể có Σeᵢ = 0 mà vẫn xa mọi điểm. Phải khử dấu (bình phương hoặc trị tuyệt đối).

📝 **Tóm tắt mục 4**

- Bình phương: khử dấu + khả vi → nghiệm đóng; phạt mạnh lệch xa; là MLE khi nhiễu Gauss.
- Đánh đổi: rất nhạy với outlier — một điểm sai có thể kéo lệch cả đường.

---

## 5. Hệ số xác định R²

💡 **Trực giác.** Tìm được đường khớp rồi, câu hỏi tiếp theo: *khớp tốt cỡ nào?* R² đo "đường giải thích được bao nhiêu phần biến động của dữ liệu". So sánh mô hình của ta với một mô hình ngây thơ nhất — "đoán bừa bằng trung bình ȳ".

> 📐 **Định nghĩa đầy đủ — Hệ số xác định R²**
>
> **(a) Là gì**: R² = 1 − SS_res / SS_tot, với SS_res = Σ(yᵢ − ŷᵢ)² (sai số *còn lại* sau khi khớp) và SS_tot = Σ(yᵢ − ȳ)² (biến động *tổng* của y quanh trung bình). R² ∈ (−∞, 1]; gần 1 = khớp tốt.
>
> **(b) Vì sao cần**: SS_res một mình không nói lên gì (phụ thuộc đơn vị, số điểm). R² **chuẩn hóa** nó về thang 0–1 dễ so sánh: R² = 0.81 nghĩa là đường giải thích 81% biến động của dữ liệu, 19% còn lại là nhiễu/yếu tố chưa mô hình. Cho phép so các mô hình khác nhau trên cùng dữ liệu.
>
> **(c) Ví dụ số**: Với dữ liệu mục 3 và đường ŷ = 0.9x + 1.3:
> - Dự đoán: ŷ = 2.2, 3.1, 4.0, 4.9, 5.8.
> - Phần dư: −0.2, −0.1, +1.0, −0.9, +0.2 → SS_res = 0.04+0.01+1.0+0.81+0.04 = **1.90**.
> - ȳ = 4. SS_tot = (2−4)²+(3−4)²+(5−4)²+(4−4)²+(6−4)² = 4+1+1+0+4 = **10**.
> - **R² = 1 − 1.90/10 = 0.81** → số giờ ôn giải thích được **81%** chênh lệch điểm giữa các bạn; 19% còn lại do yếu tố khác (năng khiếu, may rủi đề thi).

❓ **Câu hỏi tự nhiên của người đọc**

- *"R² = 1 nghĩa là gì? R² = 0?"* R² = 1: đường qua đúng mọi điểm (SS_res = 0), khớp hoàn hảo. R² = 0: đường khớp không tốt hơn việc đoán bừa bằng ȳ. R² < 0: mô hình *tệ hơn* cả đoán trung bình (xảy ra nếu ép một đường xấu, không phải đường tối ưu).
- *"R² cao có nghĩa mô hình đúng?"* **Không hẳn.** R² cao chỉ nói "khớp dữ liệu hiện có". Có thể cao do overfitting (mục 7), hoặc quan hệ là giả (tương quan ≠ nhân quả). R² cũng không phát hiện được dạng sai (vd dữ liệu cong mà ép đường thẳng có thể vẫn R² khá).
- *"Vì sao so với ȳ?"* Vì ȳ là "dự đoán không cần x" — mô hình tệ nhất mà vẫn hợp lý. R² đo phần *cải thiện* nhờ biết x.

⚠ **Lỗi thường gặp — chỉ nhìn R² mà không vẽ đồ thị.** Bộ dữ liệu Anscombe nổi tiếng: 4 tập dữ liệu rất khác nhau (một thẳng, một cong, một có outlier) lại có *cùng* a, b, R². Luôn **vẽ điểm + đường + phần dư**, đừng tin mỗi con số R².

🔁 **Dừng lại tự kiểm tra**

1. Một mô hình cho SS_res = 2, SS_tot = 8. Tính R². Diễn giải.

<details><summary>Đáp án</summary>

R² = 1 − 2/8 = 1 − 0.25 = **0.75**. Đường giải thích 75% biến động của dữ liệu; 25% còn lại chưa giải thích (nhiễu hoặc yếu tố thiếu).

</details>

### 📝 Tóm tắt mục 5

- R² = 1 − SS_res/SS_tot, chuẩn hóa độ khớp về thang ≤ 1; gần 1 = tốt.
- So mô hình với "đoán bừa bằng ȳ"; R² = phần biến động được giải thích.
- R² cao ≠ mô hình đúng (overfitting, tương quan giả, dạng sai). Luôn vẽ đồ thị (Anscombe).

---

## 6. Tuyến tính hóa mô hình phi tuyến

💡 **Trực giác.** Công thức least squares chỉ cho đường *thẳng*. Nhưng nhiều quan hệ là *mũ* hay *lũy thừa*. Mẹo: **đổi biến bằng logarit** để "duỗi thẳng" đường cong, fit tuyến tính trên biến đã đổi, rồi đổi ngược về.

**Mô hình mũ** y = A·e^(kx). Lấy ln hai vế:
\`\`\`
ln y = ln A + k·x
\`\`\`
Đặt Y = ln y. Thì Y = k·x + ln A — **tuyến tính** theo x! Fit least squares (x, Y) → độ dốc = k, tung độ gốc = ln A → A = e^(tung độ gốc).

### 6.1 Tổng quát hóa "tìm k" của Lesson 01

Ở [L01](../lesson-01-modeling-cycle/) ta chốt k của cà phê nguội chỉ bằng *1* điểm đo. Giờ làm đúng cách với *nhiều* điểm. Đặt u = T − T_phòng (nhiệt độ vượt trội), mô hình u = u₀·e^(−kt). Dữ liệu đo (T_phòng = 25):

| t (phút) | T (°C) | u = T−25 | ln u |
|----------|--------|----------|------|
| 0 | 90 | 65 | 4.174 |
| 5 | 70 | 45 | 3.807 |
| 10 | 56 | 31 | 3.434 |
| 15 | 46 | 21 | 3.045 |

Fit least squares trên (t, ln u): độ dốc = (n·Σt·lnu − Σt·Σlnu)/(n·Σt² − (Σt)²).
- Σt = 30, Σlnu = 14.460, Σt·lnu = 99.05, Σt² = 350, n = 4.
- độ dốc = (4·99.05 − 30·14.460)/(4·350 − 30²) = (396.2 − 433.8)/(1400 − 900) = −37.6/500 = **−0.0752**.
- Vậy **k ≈ 0.075 phút⁻¹** — khớp tuyệt với giá trị 0.074 tìm bằng 1 điểm ở L01, nhưng giờ dựa trên *toàn bộ* dữ liệu nên đáng tin hơn.
- Tung độ gốc = (Σlnu − độ dốc·Σt)/n = (14.460 − (−0.0752)·30)/4 = 16.716/4 = 4.179 → A = e^4.179 ≈ **65.3 ≈ 65** ✓ (đúng nhiệt độ vượt trội ban đầu u₀ = 90−25 = 65).

⚠ **Lỗi thường gặp — quên rằng log làm méo trọng số sai số.** Fit trên ln y *không* cực tiểu sai số trên y mà trên ln y — điểm y nhỏ bị "phóng đại" tầm quan trọng. Với dữ liệu sạch thì ổn; cần chính xác cao thì dùng fit phi tuyến trực tiếp (Gauss–Newton). Nêu rõ đây là **xấp xỉ tiện lợi**.

🔁 **Dừng lại tự kiểm tra**

1. Mô hình lũy thừa y = A·xⁿ. Lấy log hai vế cho ra quan hệ tuyến tính giữa hai đại lượng nào?

<details><summary>Đáp án</summary>

ln y = ln A + n·ln x. Tuyến tính giữa **ln y và ln x** (độ dốc = n, tung độ gốc = ln A). Đây là lý do dữ liệu lũy thừa trông thẳng trên giấy **log–log**.

</details>

### 📝 Tóm tắt mục 6

- y = A·e^(kx) → ln y = ln A + kx: tuyến tính theo x → fit được bằng least squares.
- Áp dụng tìm k của nguội Newton với nhiều điểm: k ≈ 0.075, khớp L01 nhưng bền hơn.
- y = A·xⁿ → ln y theo ln x (log–log). Cảnh báo: log méo trọng số sai số.

---

## 7. Cạm bẫy: overfitting, ngoại suy, outlier

- **Overfitting (khớp quá mức)**: thêm tham số (đa thức bậc cao) luôn giảm SS_res trên dữ liệu cũ, nhưng mô hình bám nhiễu → dự đoán dữ liệu mới tệ. Quy tắc: chọn mô hình *đơn giản nhất* khớp đủ tốt (dao cạo Occam).
- **Ngoại suy (extrapolation)**: dùng mô hình *ngoài* khoảng dữ liệu cực kỳ rủi ro. Đường khớp tốt trong [1, 5] không hứa hẹn gì tại x = 100. Mô hình tăng trưởng mũ ngoại suy cho ra dân số vô hạn (đã gặp ở [L01](../lesson-01-modeling-cycle/)).
- **Outlier**: điểm đo sai kéo lệch cả đường (mục 4). Vẽ đồ thị để phát hiện; cân nhắc loại bỏ hoặc dùng robust regression.

📝 **Tóm tắt mục 7**: khớp dữ liệu cũ tốt ≠ dự đoán tốt. Cảnh giác overfitting (chọn mô hình đơn giản), ngoại suy (chỉ tin trong vùng dữ liệu), outlier (vẽ đồ thị, robust).

---

## 8. Bài tập

**Bài 1.** Một quầy có dữ liệu *số nhân viên trực* (x) và *số đơn xử lý được trong giờ* (y): (1, 1), (2, 2), (3, 2), (4, 5). Tìm đường hồi quy ŷ = ax + b (mỗi nhân viên thêm xử lý thêm bao nhiêu đơn?).

**Bài 2.** Với kết quả Bài 1, tính R² và diễn giải (số nhân viên giải thích được bao nhiêu % chênh lệch số đơn?).

**Bài 3.** Giải thích trong 2–3 câu vì sao least squares dùng bình phương sai số thay vì tổng trị tuyệt đối, và nêu một nhược điểm của lựa chọn này.

**Bài 4.** Một bài đăng có *lượt chia sẻ* gấp đôi mỗi ngày, nghi theo mũ y = A·e^(kx): ngày 0→3, ngày 1→6, ngày 2→12, ngày 3→24. Dùng tuyến tính hóa (lấy ln) để tìm A và k.

**Bài 5.** Một bạn fit đa thức bậc 9 qua 10 điểm đo có nhiễu, được R² = 1.0 trên dữ liệu, rồi tuyên bố "mô hình hoàn hảo". Sai ở đâu? Đề xuất cách kiểm tra đúng.

---

## 9. Lời giải chi tiết

**Bài 1.** n=4. Bảng: Σx = 1+2+3+4 = 10; Σy = 1+2+2+5 = 10; Σxy = 1+4+6+20 = 31; Σx² = 1+4+9+16 = 30.
- a = (4·31 − 10·10)/(4·30 − 10²) = (124 − 100)/(120 − 100) = 24/20 = **1.2**.
- b = (10 − 1.2·10)/4 = (10 − 12)/4 = −2/4 = **−0.5**.
- → **ŷ = 1.2x − 0.5**. Diễn giải: mỗi nhân viên trực thêm xử lý thêm ≈ **1.2 đơn/giờ**. Kiểm: tại x̄ = 2.5, ŷ = 1.2·2.5 − 0.5 = 2.5 = ȳ ✓ (qua trọng tâm).

**Bài 2.** Dự đoán: x=1→0.7; x=2→1.9; x=3→3.1; x=4→4.3.
- Phần dư: 1−0.7=0.3; 2−1.9=0.1; 2−3.1=−1.1; 5−4.3=0.7. SS_res = 0.09+0.01+1.21+0.49 = **1.80**.
- ȳ = 2.5. SS_tot = (1−2.5)²+(2−2.5)²+(2−2.5)²+(5−2.5)² = 2.25+0.25+0.25+6.25 = **9.0**.
- **R² = 1 − 1.80/9.0 = 1 − 0.20 = 0.80** → số nhân viên giải thích 80% chênh lệch số đơn xử lý; 20% còn lại do yếu tố khác (chủ yếu từ ca (3 nhân viên, 2 đơn) lệch −1.1 — có thể hôm đó vắng khách).

**Bài 3.** Bình phương: (1) khả vi mọi nơi (|x| gãy tại 0) → đặt đạo hàm = 0 ra **công thức nghiệm đóng**; (2) phạt mạnh các điểm lệch xa (lệch ×2 → phạt ×4); (3) là ước lượng hợp lý cực đại khi nhiễu Gauss. **Nhược điểm**: rất nhạy với outlier — một điểm đo sai lệch lớn kéo cả đường về phía nó.

**Bài 4.** Lấy Y = ln y: (0, ln3=1.099), (1, ln6=1.792), (2, ln12=2.485), (3, ln24=3.178). Khoảng cách đều nhau 0.693 = ln2 → độ dốc k = 0.693 → **k = ln 2 ≈ 0.693**. Tung độ gốc = 1.099 = ln 3 → **A = 3**. Vậy y = 3·e^(0.693x) = 3·2ˣ. Kiểm: ngày 2 → 3·4 = 12 ✓; ngày 3 → 3·8 = 24 ✓. Diễn giải: bài đăng khởi đầu 3 lượt chia sẻ, **gấp đôi mỗi ngày** (k = ln2 đúng nghĩa "nhân đôi"); ngoại suy: ngày 7 → 3·2⁷ = 384 lượt (nhưng nhớ cảnh báo mục 7 — mũ không kéo dài mãi).

**Bài 5.** Sai: R² = 1 trên dữ liệu *huấn luyện* chỉ phản ánh đa thức bậc 9 có đủ 10 tham số để qua đúng 10 điểm — đây là **overfitting**, nó bám cả nhiễu và sẽ dao động Runge, dự đoán điểm mới rất tệ. R² trên chính dữ liệu đã fit không đo được khả năng dự đoán. **Cách kiểm tra đúng**: tách dữ liệu thành tập huấn luyện + tập kiểm tra (giữ lại vài điểm không dùng để fit), đánh giá sai số trên tập kiểm tra; hoặc dùng kiểm định chéo (cross-validation); và ưu tiên mô hình đơn giản (đường thẳng/bậc thấp) nếu nó khớp đủ tốt.

---

## 10. Bài tiếp theo

[Lesson 03 — Mô hình rời rạc (phương trình sai phân)](../lesson-03-discrete-dynamical/): khi thời gian đi theo bước (năm, thế hệ) thay vì liên tục, mô hình thành dãy truy hồi xₙ₊₁ = f(xₙ).

## 📝 Tổng kết

1. **Khớp mô hình từ dữ liệu** = tìm tham số làm hàm gần dữ liệu nhất; cần vì dữ liệu thật có nhiễu.
2. **Nội suy** (qua mọi điểm) vs **hồi quy** (đi giữa); đa số dữ liệu đo → hồi quy.
3. **Bình phương tối thiểu**: cực tiểu Σ(yᵢ−axᵢ−b)² → công thức đóng a = (nΣxy−ΣxΣy)/(nΣx²−(Σx)²), b = ȳ−ax̄.
4. **Vì sao bình phương**: khả vi (nghiệm đóng) + phạt lệch xa + MLE Gauss; nhược: nhạy outlier.
5. **R²** = 1 − SS_res/SS_tot: phần biến động giải thích được; R² cao ≠ mô hình đúng (vẽ đồ thị!).
6. **Tuyến tính hóa**: log hóa mô hình mũ/lũy thừa để fit tuyến tính (tìm k nguội Newton ≈ 0.075).
7. Cảnh giác **overfitting, ngoại suy, outlier**.
`;
