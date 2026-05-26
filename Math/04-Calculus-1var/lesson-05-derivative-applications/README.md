# Lesson 05 — Ứng dụng đạo hàm

## Mục tiêu

- Tìm **cực trị** (max/min) của hàm số.
- Khảo sát **đồng/nghịch biến**, **lồi/lõm**, **điểm uốn**.
- Vẽ đồ thị hàm số có hệ thống.
- **Quy tắc l'Hôpital** cho giới hạn dạng 0/0, ∞/∞.
- Bài toán tối ưu thực tế.

## Kiến thức tiền đề

- [Lesson 04 — Quy tắc đạo hàm](../lesson-04-derivative-rules/).

---

## 1. Đồng / nghịch biến

**Định lý**: Cho f khả vi trên (a, b).
- f'(x) > 0 trên (a, b) → f **đồng biến** (tăng).
- f'(x) < 0 → f **nghịch biến** (giảm).
- f'(x) = 0 trên 1 khoảng → f hằng số.

💡 **Trực giác**: Slope dương = đồ thị đi lên, slope âm = đi xuống.

**Ví dụ**: f(x) = x³ - 3x.
- f'(x) = 3x² - 3 = 3(x²-1).
- f' = 0 tại x = ±1.
- x < -1: f' > 0 → đồng biến.
- -1 < x < 1: f' < 0 → nghịch biến.
- x > 1: f' > 0 → đồng biến.

---

## 2. Cực trị

**Định nghĩa**: f đạt **cực đại** tại x₀ nếu f(x₀) ≥ f(x) trong 1 lân cận nhỏ. **Cực tiểu** tương tự (≤).

**Điều kiện cần (Fermat)**: Nếu f khả vi và đạt cực trị tại x₀ ∈ (a, b), thì **f'(x₀) = 0**.

⚠ **Không phải ngược lại**: f'(x₀) = 0 chưa chắc cực trị. VD f(x) = x³, f'(0) = 0 nhưng không phải cực trị (điểm yên ngựa = saddle point).

### 2.1. Quy tắc bảng biến thiên

Xét dấu f'(x):
- f' đổi từ + sang - tại x₀ → **cực đại**.
- f' đổi từ - sang + tại x₀ → **cực tiểu**.
- f' không đổi dấu → không phải cực trị.

### 2.2. Quy tắc đạo hàm bậc 2

Nếu f'(x₀) = 0:
- f''(x₀) > 0 → **cực tiểu**.
- f''(x₀) < 0 → **cực đại**.
- f''(x₀) = 0 → chưa kết luận được.

**Ví dụ**: f(x) = x³ - 3x.
- f'(x) = 3x² - 3 = 0 → x = ±1.
- f''(x) = 6x.
- f''(1) = 6 > 0 → x = 1 **cực tiểu** (f(1) = -2).
- f''(-1) = -6 < 0 → x = -1 **cực đại** (f(-1) = 2).

> 📐 **Định nghĩa đầy đủ — Cực trị**
>
> **(a) Là gì**: 1 điểm x₀ mà f(x₀) lớn (hoặc nhỏ) hơn mọi f(x) gần đó. **Cực đại** = đỉnh "đồi" địa phương, **cực tiểu** = đáy "thung lũng" địa phương. KHÔNG bắt buộc là max/min toàn cục.
>
> **(b) Vì sao cần**: Mọi bài toán tối ưu hoá đều quy về tìm cực trị — kinh tế (tối đa lợi nhuận), kỹ thuật (giảm thiểu vật liệu), ML (giảm thiểu loss function). Fermat (~1637) phát hiện: tại cực trị, đạo hàm = 0 (slope tiếp tuyến nằm ngang) — đây là điều kiện CẦN dễ kiểm. Đạo hàm cấp 2 phân loại: lồi (f''>0) hay lõm (f''<0). Đây là cốt lõi của **gradient descent** trong AI.
>
> **(c) Ví dụ số**: f(x) = x² − 4x + 5. f'(x) = 2x − 4 = 0 → x = 2. f''(2) = 2 > 0 → **cực tiểu**. f(2) = 4 − 8 + 5 = 1. f(x) = x³: f'(0) = 0 nhưng KHÔNG cực trị (f đồng biến). Kiểm: f'(x) = 3x² ≥ 0 luôn, không đổi dấu → x=0 là điểm uốn nhưng không cực trị. f(x) = sin x: cực đại tại π/2 + k·2π, cực tiểu tại 3π/2 + k·2π. Tối ưu thực tế: chu vi 100m, S = a(50-a) → a=25 → S_max = 625m² (hình vuông).

---

## 3. Lồi / lõm & Điểm uốn

**Định nghĩa**:
- **Lồi (concave up)** trên (a, b): đồ thị nằm trên tiếp tuyến. f''(x) > 0.
- **Lõm (concave down)**: dưới tiếp tuyến. f''(x) < 0.
- **Điểm uốn**: chuyển giữa lồi/lõm. f''(x₀) = 0 và đổi dấu.

💡 **Mẹo hình ảnh**:
- Lồi (parabol mở lên): "có thể chứa nước" 🥣.
- Lõm: úp ngược.

**Ví dụ**: f(x) = x³ có f''(x) = 6x.
- x < 0: f'' < 0 → lõm.
- x > 0: f'' > 0 → lồi.
- **Điểm uốn**: x = 0.

---

## 4. Khảo sát đồ thị — Quy trình 7 bước

1. **Miền xác định**.
2. **Tính giới hạn** tại biên (∞, các điểm gián đoạn) → tiệm cận.
3. **f'(x)** → bảng biến thiên (đồng/nghịch biến, cực trị).
4. **f''(x)** → lồi/lõm, điểm uốn.
5. **Điểm đặc biệt**: cắt trục Ox, Oy.
6. **Bảng biến thiên** tổng hợp.
7. **Vẽ đồ thị**.

---

## 5. Quy tắc l'Hôpital — Cứu cánh cho 0/0 và ∞/∞

🎯 **Phát biểu**: Nếu lim f(x)/g(x) dạng 0/0 hoặc ∞/∞, và f, g khả vi với g'(x) ≠ 0 trong lân cận, thì:
```
lim f(x)/g(x) = lim f'(x)/g'(x)
```

**Ví dụ 1**: lim_{x→0} sin x / x.
- Dạng 0/0.
- = lim cos x / 1 = cos 0 = **1**.

**Ví dụ 2**: lim_{x→∞} ln x / x.
- Dạng ∞/∞.
- = lim (1/x) / 1 = 0.

**Ví dụ 3** (áp dụng 2 lần): lim_{x→0} (1 - cos x) / x².
- Dạng 0/0. = lim sin x / 2x. Vẫn 0/0.
- = lim cos x / 2 = **1/2**.

⚠ **Không áp dụng nếu chưa phải 0/0 hoặc ∞/∞**. Kiểm tra trước.

---

## 6. Bài toán tối ưu (Optimization)

**Mẫu câu hỏi**: Tìm cách làm sao để tối đa/tối thiểu một đại lượng.

### Ví dụ kinh điển: Hộp lớn nhất

Cho tấm giấy 12×12 cm. Cắt 4 góc vuông cạnh x, gấp lại thành hộp không nắp. Tìm x để thể tích lớn nhất.

**Giải**:
- V(x) = x·(12-2x)²  với 0 < x < 6.
- V'(x) = (12-2x)² + x·2·(12-2x)·(-2) = (12-2x)·[(12-2x) - 4x] = (12-2x)·(12-6x).
- V' = 0 → x = 6 (loại, biên) hoặc x = 2.
- V''(2) < 0 → cực đại.
- → **x = 2 cm, V_max = 2·8² = 128 cm³**.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Tìm cực trị f(x) = x³ - 6x² + 9x.

**Bài 2**: Khảo sát đồng/nghịch biến f(x) = x⁴ - 4x².

**Bài 3**: Tính lim_{x→0} (e^x - 1)/x.

**Bài 4**: Tìm điểm uốn của f(x) = x³ - 3x² + 2.

**Bài 5**: Một mảnh đất chữ nhật cần chu vi 100 m. Diện tích lớn nhất bao nhiêu?

### Lời giải

**Bài 1**: f'(x) = 3x² - 12x + 9 = 3(x-1)(x-3). f'=0 → x=1, 3.  
- f''(x) = 6x - 12. f''(1) = -6 → CĐ. f(1) = 4. f''(3) = 6 → CT. f(3) = 0.  
→ **CĐ (1, 4); CT (3, 0)**.

**Bài 2**: f'(x) = 4x³ - 8x = 4x(x²-2). f'=0 → x=0, ±√2.  
- x < -√2: f' < 0 → giảm.  
- -√2 < x < 0: f' > 0 → tăng.  
- 0 < x < √2: f' < 0 → giảm.  
- x > √2: f' > 0 → tăng.

**Bài 3**: 0/0, l'Hôpital: lim e^x / 1 = **1**.

**Bài 4**: f''(x) = 6x - 6. f''=0 → x = 1. f(1) = 0 → **điểm uốn (1, 0)**.

**Bài 5**: 2a + 2b = 100 → b = 50 - a. S(a) = a·(50-a) = 50a - a². S'(a) = 50 - 2a = 0 → a = 25. S = 25·25 = **625 m²** (hình vuông).

---

## 8. Bài tiếp theo

[Lesson 06 — Nguyên hàm](../lesson-06-antiderivatives/).

## 📝 Tổng kết

1. **f' > 0 → tăng, f' < 0 → giảm**.
2. **Cực trị**: f' đổi dấu (hoặc f''>0/<0).
3. **Lồi/lõm**: f''. Điểm uốn = f'' đổi dấu.
4. **l'Hôpital**: 0/0 hoặc ∞/∞ → tính lim f'/g'.
5. **Tối ưu**: viết f(x), giải f'=0, kiểm tra max/min bằng f''.
