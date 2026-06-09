// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/07-Mathematical-Modeling/lesson-07-stochastic-monte-carlo/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 07 — Mô hình ngẫu nhiên (Monte Carlo, Markov)

## Mục tiêu

- Khi hệ có **yếu tố ngẫu nhiên**, mô hình hóa bằng xác suất thay vì phương trình tất định.
- **Mô phỏng Monte Carlo**: ước lượng đại lượng khó tính bằng lấy mẫu ngẫu nhiên; tốc độ hội tụ $\\sim 1/\\sqrt{N}$.
- **Xích Markov (Markov chain)**: tương lai chỉ phụ thuộc hiện tại; ma trận chuyển; **phân phối dừng (stationary)**.
- Biết khi nào chọn mô hình ngẫu nhiên thay vì tất định.

## Kiến thức tiền đề

- [Lesson 01 — Chu trình mô hình hóa](../lesson-01-modeling-cycle/).
- [T6 L08 — Xác suất & thống kê](../../06-Advanced/lesson-08-probability-statistics/); [T6 L01 — ma trận](../../06-Advanced/lesson-01-vectors-matrices/).
- Liên kết: [Vectors/05-Probability](../../../Vectors/), [AI-ML](../../../AI-ML/).

---

## 1. Mô hình tất định vs ngẫu nhiên

💡 **Trực giác.** Các mô hình trước (ODE, LP) đều **tất định**: cùng đầu vào → cùng đầu ra chính xác. Nhưng nhiều hệ có *may rủi*: tung xúc xắc, khách đến quán theo giờ ngẫu nhiên, giá cổ phiếu dao động. Mô hình **ngẫu nhiên (stochastic)** mô tả *phân phối* các kết cục thay vì một con số duy nhất.

> 📐 **Định nghĩa đầy đủ — Mô hình ngẫu nhiên**
>
> **(a) Là gì**: Mô hình trong đó (một phần) đầu ra là **biến ngẫu nhiên** — chạy lại cho kết quả khác nhau, nhưng tuân theo một phân phối xác suất. Ta quan tâm các đại lượng tổng hợp: kỳ vọng, phương sai, xác suất vượt ngưỡng.
>
> **(b) Vì sao cần**: Khi nguồn bất định là *bản chất* (lượng tử, đông người, thị trường) chứ không phải do ta thiếu thông tin, mô hình tất định cho dự báo "giả chính xác". Mô hình ngẫu nhiên trả lời đúng câu hỏi thực: *"khả năng xảy ra bao nhiêu?"*, *"trung bình và độ dao động ra sao?"*.
>
> **(c) Ví dụ số**: Hàng đợi quán cà phê — số khách/giờ $\\sim$ Poisson($\\lambda=30$). Tất định nói "30 khách"; ngẫu nhiên nói "trung bình 30, nhưng có giờ 22, giờ 41; xác suất $> 40$ khách $\\approx 3\\%$" → giúp quyết định số nhân viên dự phòng. Tung 2 xúc xắc: tổng từ 2–12, mỗi giá trị một xác suất (7 hay nhất, $1/6$).

📝 **Tóm tắt mục 1**: mô hình ngẫu nhiên mô tả *phân phối* kết cục; dùng khi bất định là bản chất hệ.

---

## 2. Mô phỏng Monte Carlo

💡 **Trực giác — đếm bằng cách gieo ngẫu nhiên.** Khó tính một đại lượng bằng công thức? Hãy **lấy mẫu ngẫu nhiên thật nhiều** rồi đếm tỉ lệ. Như ước lượng diện tích hồ bằng cách ném đá ngẫu nhiên vào sân chứa hồ và đếm tỉ lệ đá rơi xuống nước.

> 📐 **Định nghĩa đầy đủ — Phương pháp Monte Carlo**
>
> **(a) Là gì**: Ước lượng một đại lượng (diện tích, tích phân, xác suất, kỳ vọng) bằng cách sinh nhiều mẫu ngẫu nhiên và lấy trung bình/tỉ lệ. Tên đặt theo sòng bạc Monte Carlo (yếu tố may rủi).
>
> **(b) Vì sao cần**: Nhiều bài *không có công thức đóng* hoặc *quá nhiều chiều* để tích phân giải tích (vd định giá quyền chọn tài chính 50 biến, mô phỏng va chạm hạt). Monte Carlo chỉ cần *sinh mẫu được* là ước lượng được, bất kể độ phức tạp — và sai số giảm đều $\\sim 1/\\sqrt{N}$ *bất kể số chiều* (ưu thế lớn so với lưới).
>
> **(c) Ví dụ số — ước lượng $\\pi$**: Gieo điểm ngẫu nhiên đều trong hình vuông $[0,1] \\times [0,1]$. Phần tư hình tròn bán kính 1 có diện tích $\\pi/4$. Tỉ lệ điểm rơi *trong* cung ($x^2+y^2 \\le 1$) $\\approx \\pi/4$ → **$\\pi \\approx 4 \\cdot ($số trong $/$ tổng$)$**. Với $N = 1000$, giả sử 785 điểm trong → $\\pi \\approx 4 \\cdot 0.785 = $ **3.14**. $N = 10^6$ → thường sát $3.141 \\pm 0.002$.

**Tốc độ hội tụ**: sai số $\\sim$ **$1/\\sqrt{N}$**. Muốn giảm sai số 10 lần phải tăng $N$ **100 lần**. Chậm, nhưng *không phụ thuộc số chiều* — đó là lý do Monte Carlo vô địch ở bài nhiều chiều.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Chạy lại ra số khác, vậy có đáng tin?"* Mỗi lần chạy là một *ước lượng* có sai số ngẫu nhiên; trung bình của nhiều mẫu hội tụ về giá trị thật (luật số lớn). Báo kết quả phải kèm *khoảng tin cậy* (vd $3.14 \\pm 0.05$), không phải một số trần trụi.
- *"Vì sao sai số $\\sim 1/\\sqrt{N}$ mà không phải $1/N$?"* Vì sai số của trung bình mẫu $=$ độ lệch chuẩn $/ \\sqrt{N}$ (định lý giới hạn trung tâm — [T6 L08](../../06-Advanced/lesson-08-probability-statistics/)). Đây là quy luật phổ quát của lấy mẫu.

⚠ **Lỗi thường gặp — tưởng thêm điểm là chính xác tuyến tính.** Gấp đôi $N$ *không* giảm nửa sai số (chỉ giảm hệ số $1/\\sqrt{2} \\approx 0.71$). Đừng kỳ vọng độ chính xác cao từ $N$ nhỏ; và luôn dùng bộ sinh số ngẫu nhiên tốt + báo sai số.

🔁 **Dừng lại tự kiểm tra**

1. Monte Carlo ước lượng $\\pi$: gieo 2000 điểm, 1561 rơi trong cung. Ước lượng $\\pi$?

<details><summary>Đáp án</summary>

$\\pi \\approx 4 \\cdot (1561/2000) = 4 \\cdot 0.7805 = $ **3.122**. (Gần 3.14; sai lệch do $N$ hữu hạn — tăng $N$ để sát hơn.)

</details>

### 📝 Tóm tắt mục 2

- Monte Carlo: ước lượng bằng lấy mẫu ngẫu nhiên + trung bình/tỉ lệ (vd $\\pi \\approx 4 \\cdot$ tỉ lệ trong cung).
- Sai số $\\sim 1/\\sqrt{N}$ (giảm 10 lần cần $\\times 100$ mẫu), nhưng *không phụ thuộc số chiều* → mạnh ở bài nhiều chiều.
- Báo kết quả kèm khoảng tin cậy.

---

## 3. Xích Markov

💡 **Trực giác — tương lai chỉ nhìn hiện tại.** Thời tiết mai phụ thuộc thời tiết *hôm nay*, không cần nhớ cả tháng trước. Trò chơi cờ tỉ phú: ô kế phụ thuộc ô hiện tại + xúc xắc. "Không trí nhớ" này gọi là **tính Markov**, cho phép mô tả hệ chỉ bằng *xác suất chuyển giữa các trạng thái*.

> 📐 **Định nghĩa đầy đủ — Xích Markov & ma trận chuyển**
>
> **(a) Là gì**: Một hệ có hữu hạn **trạng thái**; mỗi bước, hệ chuyển sang trạng thái khác theo **xác suất chuyển** chỉ phụ thuộc trạng thái *hiện tại* (không phụ thuộc quá khứ). Gom thành **ma trận chuyển $P$** với $P[i][j] = $ xác suất từ $i$ sang $j$ (mỗi hàng cộng $= 1$).
>
> **(b) Vì sao cần**: Mô hình hóa gọn các hệ chuyển trạng thái: thời tiết, hành vi khách hàng (trung thành/rời bỏ), xếp hạng trang web (PageRank), sinh văn bản. Tính Markov làm bài toán *giải được*: hành vi dài hạn quy về đại số ma trận.
>
> **(c) Ví dụ số — thời tiết**: 2 trạng thái Nắng (N), Mưa (M). Nếu hôm nay Nắng: mai Nắng 0.8, Mưa 0.2. Nếu hôm nay Mưa: mai Nắng 0.4, Mưa 0.6.
> > $P = \\begin{bmatrix} 0.8 & 0.2 \\\\ 0.4 & 0.6 \\end{bmatrix}$. Hôm nay Nắng (phân phối $[1, 0]$) → mai $[0.8, 0.2]$ → ngày kia $[0.8 \\cdot 0.8+0.2 \\cdot 0.4, \\ldots] = [0.72, 0.28]$ → ...

> 📐 **Phân phối dừng (stationary)**: vector $\\pi$ thỏa **$\\pi \\cdot P = \\pi$** (và $\\sum \\pi = 1$) — phân phối *không đổi* qua các bước, tỉ lệ thời gian dài hạn ở mỗi trạng thái.

**Walk-through tìm phân phối dừng** (thời tiết trên): $\\pi = (\\pi_N, \\pi_M)$, $\\pi \\cdot P = \\pi$:
- $\\pi_N = 0.8 \\cdot \\pi_N + 0.4 \\cdot \\pi_M$ (cột Nắng).
- Cùng $\\pi_N + \\pi_M = 1 \\to \\pi_M = 1 - \\pi_N$.
- $\\pi_N = 0.8\\pi_N + 0.4(1 - \\pi_N) = 0.8\\pi_N + 0.4 - 0.4\\pi_N = 0.4\\pi_N + 0.4 \\to 0.6\\pi_N = 0.4 \\to$ **$\\pi_N = 2/3 \\approx 0.667$**, $\\pi_M = $ **$1/3$**.

→ Dài hạn: ~67% ngày nắng, 33% mưa, *bất kể* hôm nay thế nào.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Phân phối dừng có phụ thuộc trạng thái ban đầu không?"* Với xích "đẹp" (mọi trạng thái tới được nhau, không tuần hoàn cứng), **không** — mọi khởi đầu đều hội tụ về cùng $\\pi$. Đó là lý do $\\pi$ gọi là "dừng/cân bằng": hệ quên dần điều kiện đầu.
- *"Liên hệ với điểm cân bằng ở L03?"* Tương tự: $\\pi$ là "điểm cân bằng" của hệ phân phối; nhưng đây là cân bằng *thống kê* (tỉ lệ thời gian), không phải một giá trị tất định.
- *"Tính $\\pi$ bằng ma trận thế nào?"* $\\pi$ là **vector riêng trái** của $P$ ứng với trị riêng 1 ([T6 L03](../../06-Advanced/lesson-03-eigenvalues-eigenvectors/)) — nối với đại số tuyến tính.

⚠ **Lỗi thường gặp — lẫn hàng/cột của ma trận chuyển, hoặc hàng không cộng $= 1$.** Quy ước phổ biến: hàng $i = $ "từ trạng thái $i$", các cột là "tới", mỗi *hàng* cộng $= 1$. Sai quy ước → nhân ma trận sai chiều. Luôn kiểm mỗi hàng tổng $= 1$.

🔁 **Dừng lại tự kiểm tra**

1. Khách hàng: trung thành (T)/rời (R). $P(T \\to T) = 0.9$, $P(R \\to T) = 0.5$. Tìm phân phối dừng.

<details><summary>Đáp án</summary>

$P(T \\to R) = 0.1$, $P(R \\to R) = 0.5$. $\\pi_T = 0.9\\pi_T + 0.5\\pi_R$, $\\pi_T + \\pi_R = 1 \\to \\pi_T = 0.9\\pi_T + 0.5(1-\\pi_T) = 0.4\\pi_T + 0.5 \\to 0.6\\pi_T = 0.5 \\to$ **$\\pi_T = 5/6 \\approx 0.833$**, $\\pi_R = 1/6$. Dài hạn ~83% khách ở trạng thái trung thành.

</details>

### 📝 Tóm tắt mục 3

- Xích Markov: hữu hạn trạng thái, chuyển theo xác suất chỉ phụ thuộc *hiện tại* (tính Markov); ma trận $P$, mỗi hàng cộng $= 1$.
- Phân phối dừng $\\pi$: $\\pi \\cdot P = \\pi$, $\\sum \\pi = 1$ — tỉ lệ thời gian dài hạn, độc lập điều kiện đầu (xích đẹp).
- $\\pi = $ vector riêng trái của $P$ ứng trị riêng 1.

---

## 4. Khi nào dùng mô hình ngẫu nhiên?

- **Bất định là bản chất** (may rủi, đông cá thể, lượng tử) → ngẫu nhiên. Hệ trơn, lặp lại được → tất định (ODE/LP).
- **Không có công thức đóng / quá nhiều chiều** → Monte Carlo.
- **Hệ chuyển trạng thái, "không trí nhớ"** → Markov.
- Nhiều khi **kết hợp**: mô phỏng Monte Carlo *trên* một xích Markov (vd MCMC trong thống kê Bayes — [AI-ML](../../../AI-ML/)).

📝 **Tóm tắt mục 4**: chọn ngẫu nhiên khi bất định là bản chất; Monte Carlo cho bài nhiều chiều/không công thức; Markov cho hệ chuyển trạng thái không trí nhớ.

---

## 5. Bài tập

**Bài 1.** Monte Carlo ước lượng $\\pi$ gieo 5000 điểm, 3920 trong cung. Ước lượng $\\pi$ và nhận xét sai lệch.

**Bài 2.** Muốn giảm sai số Monte Carlo còn $1/5$, phải tăng số mẫu $N$ lên bao nhiêu lần? Vì sao?

**Bài 3.** Ma trận chuyển 2 trạng thái A, B: $P(A \\to A) = 0.7$, $P(B \\to A) = 0.2$. Viết đủ ma trận $P$ (kiểm hàng cộng $= 1$).

**Bài 4.** Tìm phân phối dừng của xích ở Bài 3.

**Bài 5.** Một bạn mô hình giá cổ phiếu ngày mai bằng một ODE tất định và tuyên bố "dự báo chính xác". Vì sao đây là lựa chọn mô hình sai? Nên dùng loại mô hình nào?

---

## 6. Lời giải chi tiết

**Bài 1.** $\\pi \\approx 4 \\cdot (3920/5000) = 4 \\cdot 0.784 = $ **3.136**. Sai lệch so với 3.1416 $\\approx 0.006$ (~0.2%) — hợp lý với $N = 5000$ (sai số kỳ vọng $\\sim 1/\\sqrt{5000} \\approx 0.014$ trên tỉ lệ, $\\times 4$ cho $\\pi$). Tăng $N$ để sát hơn.

**Bài 2.** Sai số $\\sim 1/\\sqrt{N}$. Muốn sai số $\\times (1/5)$ → cần $\\sqrt{N} \\times 5$ → **$N \\times 25$ lần**. (Hội tụ $1/\\sqrt{N}$ nên giảm sai số tuyến tính đòi tăng mẫu theo bình phương.)

**Bài 3.** $P(A \\to B) = 1 - 0.7 = 0.3$; $P(B \\to B) = 1 - 0.2 = 0.8$. → **$P = \\begin{bmatrix} 0.7 & 0.3 \\\\ 0.2 & 0.8 \\end{bmatrix}$**. Kiểm: hàng 1: $0.7+0.3 = 1$ ✓; hàng 2: $0.2+0.8 = 1$ ✓.

**Bài 4.** $\\pi_A = 0.7\\pi_A + 0.2\\pi_B$; $\\pi_A + \\pi_B = 1 \\to \\pi_A = 0.7\\pi_A + 0.2(1-\\pi_A) = 0.5\\pi_A + 0.2 \\to 0.5\\pi_A = 0.2 \\to$ **$\\pi_A = 0.4$**, $\\pi_B = $ **0.6**. (Kiểm: $\\pi \\cdot P = [0.4 \\cdot 0.7+0.6 \\cdot 0.2, \\ 0.4 \\cdot 0.3+0.6 \\cdot 0.8] = [0.28+0.12, \\ 0.12+0.48] = [0.4, 0.6] = \\pi$ ✓.)

**Bài 5.** Giá cổ phiếu chịu vô số cú sốc thông tin ngẫu nhiên — bất định là *bản chất*, không phải do thiếu dữ liệu. ODE tất định cho ra *một* quỹ đạo "chính xác giả", che giấu rủi ro thật. Nên dùng **mô hình ngẫu nhiên** (vd chuyển động Brown hình học / mô phỏng Monte Carlo nhiều kịch bản) để ước lượng *phân phối* giá ngày mai và rủi ro (xác suất giảm $> X\\%$), thay vì một con số.

---

## 7. Bài tiếp theo

[Lesson 08 — Capstone: dự án mô hình hóa end-to-end](../lesson-08-capstone-modeling-project/): phối hợp mọi công cụ (L01–L07) trên một bài toán thực, đi trọn chu trình.

## 📝 Tổng kết

1. **Mô hình ngẫu nhiên** mô tả *phân phối* kết cục; dùng khi bất định là bản chất.
2. **Monte Carlo**: lấy mẫu ngẫu nhiên + trung bình/tỉ lệ; sai số $\\sim 1/\\sqrt{N}$, mạnh ở nhiều chiều ($\\pi \\approx 4 \\cdot$ tỉ lệ trong cung).
3. **Xích Markov**: tương lai chỉ phụ thuộc hiện tại; ma trận $P$ (hàng cộng $= 1$); phân phối dừng $\\pi \\cdot P = \\pi$ độc lập điều kiện đầu.
4. Chọn ngẫu nhiên/tất định theo bản chất bất định; có thể kết hợp (MCMC).
`;
