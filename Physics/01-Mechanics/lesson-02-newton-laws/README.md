# Lesson 02 — 3 định luật Newton

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **lực** là gì, đơn vị (Newton, N), và vì sao đây là khái niệm nền tảng của cơ học.
- Phát biểu và hiểu **3 định luật Newton**:
  - **Định luật I (Quán tính)**: vật không chịu lực → trạng thái chuyển động không đổi.
  - **Định luật II**: **F = m·a** — lực tỉ lệ thuận với gia tốc.
  - **Định luật III**: lực và phản lực bằng nhau, ngược chiều, tác dụng lên 2 vật khác nhau.
- Phân biệt **khối lượng (mass, kg)** và **trọng lượng (weight, N)**.
- Vẽ được **sơ đồ vật tự do (Free Body Diagram, FBD)** cho các tình huống cơ học cơ bản.
- Giải được bài toán cơ bản: vật trên mặt phẳng nằm ngang, vật trên mặt phẳng nghiêng, thang máy tăng/giảm tốc.

## Kiến thức tiền đề

- [Lesson 01 — Động học](../lesson-01-kinematics/) — biết vị trí, vận tốc, gia tốc.

---

## 1. Lực là gì?

### 1.1. Định nghĩa

**Lực (Force, F)** = đại lượng đo **tương tác** giữa các vật, làm vật **thay đổi trạng thái chuyển động** (vận tốc) hoặc **biến dạng**.

💡 **Ý nghĩa cụ thể**: lực là cách 1 vật "đẩy" hoặc "kéo" vật khác. Khi bạn đẩy cái bàn, **bạn tác dụng lực lên bàn**. Khi Trái Đất hút bạn xuống, **Trái Đất tác dụng lực lên bạn** (= trọng lực).

**Vì sao cần khái niệm này?** Vì nếu không có lực, mọi vật sẽ chuyển động đều mãi (định luật I). Lực là **nguyên nhân** làm vận tốc thay đổi (= sinh gia tốc). Không có lực thì không có gia tốc, không có gia tốc thì không có hiện tượng cơ học thú vị nào.

**Đơn vị**: **Newton (N)**. 1 N = lực cần để gia tốc một vật 1 kg với gia tốc 1 m/s². Theo định nghĩa SI: `1 N = 1 kg·m/s²`.

**Có hướng (vector)**: lực luôn có hướng. Khi viết F = 10 N, ta cần biết "theo hướng nào".

### 1.2. Cảm nhận thực tế 1 N là bao nhiêu?

- **1 N** ≈ trọng lượng của 1 quả táo nhỏ (100 g) ở Trái Đất.
- **10 N** ≈ trọng lượng 1 kg gạo.
- **600 N** ≈ trọng lượng của một người 60 kg.
- **10,000 N** = 10 kN ≈ lực đẩy 1 ô tô con.

### 1.3. Các loại lực thường gặp (sẽ học kỹ ở Lesson 03)

| Loại lực | Nguồn gốc | Ký hiệu |
|----------|-----------|---------|
| Trọng lực | Hấp dẫn của Trái Đất | **W** hoặc **F_g** = m·g |
| Lực căng | Dây kéo | **T** |
| Lực ma sát | Giữa 2 bề mặt tiếp xúc | **f** |
| Lực đàn hồi | Lò xo, vật biến dạng | **F_đh** = k·x |
| Phản lực pháp tuyến | Mặt phẳng đẩy vật vuông góc | **N** |
| Lực điện | Giữa các điện tích | **F_e** |

### 📝 Tóm tắt mục 1

- **Lực** = tương tác giữa các vật, gây gia tốc hoặc biến dạng.
- Đơn vị: Newton (N). 1 N = 1 kg·m/s².
- Lực có hướng (vector).

---

## 2. Định luật I — Quán tính

### 2.1. Phát biểu

**Một vật KHÔNG chịu lực (hoặc tổng các lực = 0) sẽ giữ nguyên trạng thái chuyển động**:
- Nếu đang đứng yên → vẫn đứng yên.
- Nếu đang chuyển động → tiếp tục chuyển động thẳng đều (cùng v).

💡 **Ý nghĩa**: trước Newton, người ta tin "vật sống động cần lực để giữ nó chuyển động" (Aristotle). Newton lật ngược: **lực KHÔNG cần thiết để giữ chuyển động — lực chỉ cần để THAY ĐỔI chuyển động**.

**Vì sao quan trọng?** Đây là phát biểu mang tính cách mạng. Trên Trái Đất, mọi vật đều bị ma sát/sức cản → cuối cùng đều dừng → khiến ta lầm tưởng "cần lực để vật chạy". Định luật I nói: nếu loại bỏ mọi lực cản, vật sẽ chạy mãi mãi với cùng v. Đây là thuộc tính **bẩm sinh** của vật chất, gọi là **quán tính (inertia)**.

### 2.2. Ví dụ trực giác

**Ví dụ 1 — Xe đột ngột phanh**: Bạn đang ngồi trong xe chạy v = 60 km/h. Xe đột phanh → tại sao thân bạn bị xô về phía trước? Vì theo định luật I, thân bạn "muốn" tiếp tục chuyển động với v = 60 km/h. Chỉ có dây an toàn (lực ngoài) mới giữ bạn lại.

**Ví dụ 2 — Tàu vũ trụ Voyager**: Phóng năm 1977, không có ma sát trong không gian. Tàu vẫn chạy với gần như cùng vận tốc gần 50 năm sau (chỉ đổi hướng nhẹ do hấp dẫn các thiên thể). Đây là minh họa hoàn hảo cho định luật I.

**Ví dụ 3 — Khăn trải bàn**: Kéo khăn nhanh dưới chén → chén "giữ nguyên" (không di chuyển ngang). Khi khăn đi ra, ma sát kịp tác động chén thì khăn đã hết → chén rơi xuống bàn an toàn.

### 📝 Tóm tắt mục 2

- Vật không chịu lực → giữ nguyên v (đứng yên hoặc chuyển động đều).
- Quán tính = thuộc tính bẩm sinh của vật chất.
- Lực CHỈ cần khi muốn THAY ĐỔI chuyển động.

---

## 3. Định luật II — F = m·a

### 3.1. Phát biểu

**Gia tốc của một vật tỉ lệ thuận với tổng lực tác dụng, tỉ lệ nghịch với khối lượng**:

```
F = m · a
```

Trong đó:
- **F** = tổng lực (vector), đơn vị N.
- **m** = khối lượng vật, đơn vị kg.
- **a** = gia tốc (vector), đơn vị m/s².

💡 **Ý nghĩa cốt lõi**: đây là **liên hệ định lượng** giữa nguyên nhân (lực) và kết quả (gia tốc). Nếu định luật I cho biết "không có lực thì không có gia tốc", thì định luật II cho biết **lực bao nhiêu sẽ gây gia tốc bao nhiêu**.

**Vì sao tỉ lệ nghịch với m?** Vì khối lượng lớn = quán tính lớn = "khó đẩy hơn". Đẩy 1 xe đạp với F = 100 N → gia tốc lớn; đẩy 1 ô tô với cùng F → gia tốc gần như không thấy được. Đó là vì ô tô có m gấp 100 lần xe đạp → a chỉ bằng 1/100.

### 3.2. Diễn dịch quan trọng

Khi tổng các lực = 0 → a = 0 → vật đứng yên hoặc chuyển động đều (= định luật I là **trường hợp đặc biệt** của định luật II với F = 0).

### 3.3. Ba ví dụ số cụ thể

**Ví dụ 1 — Đẩy hộp trên sàn không ma sát**: Đẩy hộp 5 kg với F = 20 N. Tính a.
- a = F/m = 20/5 = **4 m/s²**.
- Mỗi giây vận tốc tăng 4 m/s.

**Ví dụ 2 — Quả táo rơi**: Trọng lực kéo táo 100 g xuống. Tính gia tốc.
- F_g = m·g = 0.1·9.8 = 0.98 N.
- a = F/m = 0.98/0.1 = **9.8 m/s²** = g.
- → Đúng quy luật rơi tự do: mọi vật rơi với cùng gia tốc g (đã thấy ở Lesson 01).
- Vì sao? Vì F_g = m·g và a = F/m → a = g (m hủy lẫn nhau).

**Ví dụ 3 — Xe ô tô tăng tốc**: Ô tô 1500 kg, từ 0 lên 30 m/s trong 6 giây. Tính lực động cơ.
- a = (30 − 0)/6 = 5 m/s².
- F = m·a = 1500·5 = **7,500 N = 7.5 kN**.

### 3.4. Trọng lượng vs Khối lượng

Đây là 2 khái niệm thường nhầm lẫn:

| | Khối lượng (mass, m) | Trọng lượng (weight, W) |
|---|----------------------|--------------------------|
| **Ý nghĩa** | Lượng vật chất trong vật, "khó di chuyển thế nào" | Lực hấp dẫn Trái Đất tác dụng lên vật |
| **Đơn vị** | kg | N (Newton) |
| **Phụ thuộc nơi?** | KHÔNG (m luôn như nhau ở Trái Đất, Mặt Trăng, ngoài vũ trụ) | CÓ (W = m·g, g khác nhau ở mỗi nơi) |
| **Đo bằng** | Cân thăng bằng | Cân lò xo |

**Ví dụ**: Một người 60 kg.
- Ở Trái Đất (g = 9.8 m/s²): W = 60 × 9.8 = **588 N**.
- Ở Mặt Trăng (g = 1.6 m/s²): W = 60 × 1.6 = **96 N**.
- Ngoài không gian (g ≈ 0): W ≈ **0 N**. Nhưng khối lượng m vẫn = **60 kg**.

→ Khi nói "tôi nặng 60 kg" — chính xác phải nói "khối lượng tôi là 60 kg". "Trọng lượng" của bạn = 588 N (ở Trái Đất).

### 📝 Tóm tắt mục 3

- **F = m·a** — định luật trung tâm của cơ học cổ điển.
- m tỉ lệ nghịch a: vật càng nặng càng khó tăng tốc.
- Trọng lượng W = m·g, khác khối lượng m.

---

## 4. Định luật III — Lực và phản lực

### 4.1. Phát biểu

**Nếu vật A tác dụng lực F lên vật B, thì vật B đồng thời tác dụng ngược lại lên A một lực có ĐỘ LỚN BẰNG NHAU và HƯỚNG NGƯỢC CHIỀU**:

```
F(A→B) = −F(B→A)
```

💡 **Ý nghĩa cốt lõi**: lực luôn **đi theo cặp** — không bao giờ có "lực một chiều". Khi bạn đẩy tường, tường cũng đẩy bạn (đó là lý do bạn cảm thấy áp lực ở tay).

**Vì sao cần định luật này?** Vì không có nó, ta sẽ không hiểu được nhiều hiện tượng:
- Vì sao tên lửa bay lên (khí phụt xuống → khí "đẩy" tên lửa lên).
- Vì sao bơi được (tay đẩy nước về sau → nước đẩy người về trước).
- Vì sao đứng vững trên mặt đất (Trái Đất hút bạn xuống → bạn hút Trái Đất lên với cùng lực, nhưng Trái Đất quá nặng nên không nhúc nhích).

### 4.2. ⚠ Lỗi thường gặp — 2 lực phải tác dụng lên 2 VẬT KHÁC NHAU

Nếu 2 lực cùng tác dụng lên CÙNG 1 vật, đó **KHÔNG** phải cặp lực-phản lực.

**Ví dụ nhầm lẫn**: Quyển sách đặt trên bàn.
- Trọng lực W = lực Trái Đất kéo sách XUỐNG.
- Phản lực N = lực bàn đẩy sách LÊN.
- Hai lực này **bằng nhau, ngược chiều, cùng tác dụng lên sách**.
- → Đây KHÔNG phải cặp định luật III! (Cả 2 đều tác dụng lên sách.)
- → Đây chỉ là **2 lực cân bằng** theo định luật I (sách đứng yên vì F_net = 0).

**Cặp định luật III thực sự**:
- W = lực Trái Đất hút sách. Cặp = lực sách hút Trái Đất (theo định luật vạn vật hấp dẫn, sách cũng kéo Trái Đất lên với cùng lực!).
- N = lực bàn đẩy sách. Cặp = lực sách ép xuống bàn.

→ Nhớ quy tắc: **cặp định luật III luôn ở trên 2 vật khác nhau**.

### 4.3. Ba ví dụ trực giác

**Ví dụ 1 — Đi bộ**: Khi đi, bạn đẩy mặt đất **về sau** (qua chân). Mặt đất đẩy bạn **về phía trước**. Lực đó đẩy bạn tiến lên.

**Ví dụ 2 — Tên lửa**: Đốt nhiên liệu → khí phụt xuống với vận tốc lớn. Theo định luật III, khí cũng đẩy tên lửa lên với lực bằng. Đây là cách tên lửa hoạt động trong vũ trụ (không cần "đẩy vào không khí" như máy bay).

**Ví dụ 3 — Bơi**: Tay bạn đẩy nước về sau. Nước đẩy tay về trước. Cộng dồn lực này khắp cơ thể → người bơi tiến lên.

### 📝 Tóm tắt mục 4

- Lực đi theo cặp: A → B và B → A, bằng nhau, ngược chiều.
- 2 lực trên **2 vật khác nhau** (đừng nhầm với 2 lực cân bằng trên cùng 1 vật).
- Ứng dụng: tên lửa, bơi, đi bộ, đứng vững.

---

## 5. Free Body Diagram (FBD)

### 5.1. Quy trình vẽ

Free Body Diagram = sơ đồ biểu diễn **tất cả các lực tác dụng LÊN 1 VẬT cụ thể**. Quy trình 4 bước:

1. **Tách vật ra** khỏi môi trường (vẽ vật như 1 hình chữ nhật/điểm).
2. **Xác định mọi lực tác dụng lên nó**: trọng lực, phản lực pháp tuyến, lực ma sát, lực kéo (dây), lực ngoại lực...
3. **Vẽ mũi tên** cho mỗi lực, gốc tại vật, hướng theo lực, độ dài tỉ lệ với độ lớn.
4. **Chọn hệ tọa độ** (thường: x ngang, y dọc) và phân tích từng lực thành thành phần.

### 5.2. Walk-through 3 ví dụ

**Ví dụ 1 — Quyển sách trên bàn**:
```
        N (lên)
        ↑
   [SÁCH]
        ↓
        W (xuống)
```
- Tổng lực: F = N − W = m·a. Sách đứng yên → a = 0 → N = W = m·g.

**Ví dụ 2 — Kéo hộp trên sàn (có ma sát)**:
```
              N
              ↑
   f ←─── [HỘP] ───→ T  (lực kéo)
              ↓
              W
```
- Trục y: N − W = 0 → N = W = m·g.
- Trục x: T − f = m·a → a = (T − f)/m.

**Ví dụ 3 — Vật trên mặt phẳng nghiêng góc θ**:
```
         N
         ↑ (vuông góc mặt nghiêng)
       /
     [VẬT]
       \\
         ↓
         W (luôn xuống thẳng đứng)
```
Phân tích W theo trục song song và vuông góc mặt nghiêng:
- W_song song = W·sinθ = m·g·sinθ (kéo vật xuống dốc).
- W_vuông góc = W·cosθ = m·g·cosθ (ép vật vào mặt nghiêng).
- N = W·cosθ (cân bằng theo trục vuông góc).
- Gia tốc trượt xuống dốc (nếu không ma sát): a = g·sinθ.

### 📝 Tóm tắt mục 5

- FBD = mọi lực TRÊN 1 vật, vẽ như mũi tên.
- Chọn hệ tọa độ → phân tích lực theo trục → áp dụng F = m·a riêng mỗi trục.

---

## 6. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Một vật 10 kg chịu lực F = 50 N theo phương ngang (không ma sát). Tính gia tốc.

**Bài 2**: Một người 70 kg đứng trong thang máy. Tính lực thang máy tác dụng lên người trong các trường hợp:
a) Thang máy đứng yên.
b) Thang máy đi lên với a = 2 m/s² (tăng tốc).
c) Thang máy đi xuống với a = 2 m/s² (giảm tốc, tức gia tốc hướng lên).

**Bài 3**: Hai vật m₁ = 2 kg và m₂ = 3 kg nối với nhau bằng dây, kéo m₁ bằng lực F = 25 N (không ma sát). Tính gia tốc cả hệ và lực căng dây.

**Bài 4**: Vật 5 kg trượt trên mặt phẳng nghiêng 30° (không ma sát). Tính gia tốc.

**Bài 5**: Một quả bóng 0.4 kg đập vào tường với v = 10 m/s, dội ngược lại với v = 8 m/s trong 0.05 giây. Tính lực trung bình mà tường tác dụng lên bóng.

**Bài 6**: Vì sao khi đi thang máy đang tăng tốc đi lên, bạn cảm thấy **nặng hơn**?

### Lời giải

**Bài 1**: a = F/m = 50/10 = **5 m/s²**.

**Bài 2**: W = 70 × 9.8 = 686 N (lực Trái Đất kéo người xuống). Gọi N = lực thang máy đẩy người lên.
- a) Đứng yên: a = 0. N − W = 0 → **N = 686 N** (cảm giác "nặng đúng").
- b) Tăng tốc lên: a = +2 m/s² (lên). N − W = m·a → N = W + m·a = 686 + 70·2 = **826 N** (cảm thấy nặng hơn).
- c) Giảm tốc khi đi xuống = gia tốc lên 2 m/s². Cùng như (b): N = **826 N**.

**Bài 3**: Hệ chung: F = (m₁ + m₂)·a → 25 = 5·a → **a = 5 m/s²**.
Cô lập m₂: lực căng dây T kéo m₂ → T = m₂·a = 3·5 = **15 N**.

**Bài 4**: a = g·sin(30°) = 9.8·0.5 = **4.9 m/s²** (xuống dốc).

**Bài 5**: 
- Vận tốc trước: +10 m/s (vào tường). Vận tốc sau: −8 m/s (dội ra). Δv = −8 − 10 = −18 m/s.
- Gia tốc trung bình: a = Δv/Δt = −18/0.05 = −360 m/s² (hướng xa tường).
- Lực: F = m·a = 0.4·(−360) = **−144 N**. Lực tường tác dụng lên bóng = 144 N (hướng xa tường).

**Bài 6**: Khi thang máy tăng tốc đi lên (a hướng lên), theo F = m·a phải có **tổng lực hướng lên** lên người. Phân tích lực trên người: N (sàn thang đẩy lên) − W (Trái Đất kéo xuống) = m·a → **N = W + m·a > W**. Tức là sàn thang phải đẩy bạn mạnh hơn bình thường → cảm giác như bạn nặng hơn. Lực này gọi là "trọng lượng biểu kiến (apparent weight)". 

Ngược lại, khi thang máy đi xuống (gia tốc hướng xuống) hoặc cuối hành trình lên (giảm tốc), N < W → cảm giác nhẹ. Nếu thang máy rơi tự do (a = g), N = 0 → cảm giác "không trọng lực".

---

## 7. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 03 — Các loại lực](../lesson-03-forces/) — chi tiết ma sát, đàn hồi, hấp dẫn.
- **Liên kết Lesson 01**: F → a → v → x (chuỗi liên kết của cơ học cổ điển).

---

## 📝 Tổng kết Lesson 02

1. **Lực** = tương tác gây gia tốc/biến dạng. Đơn vị Newton (N = kg·m/s²).
2. **Định luật I**: F = 0 → v không đổi (quán tính).
3. **Định luật II**: **F = m·a** — liên hệ định lượng lực và gia tốc.
4. **Định luật III**: lực đi theo cặp, bằng nhau, ngược chiều, trên **2 vật khác nhau**.
5. **Khối lượng (kg)** ≠ **trọng lượng (N)**. W = m·g.
6. **FBD**: vẽ mọi lực trên 1 vật → phân tích trục x, y → áp F = m·a riêng từng trục.

**Tiếp theo**: [Lesson 03 — Các loại lực](../lesson-03-forces/)
