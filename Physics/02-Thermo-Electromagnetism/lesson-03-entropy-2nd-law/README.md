# Lesson 03 (T2) — Entropy & Định luật II nhiệt động

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **entropy S** = số đo độ "hỗn loạn" / số cách sắp xếp của hệ — và vì sao nó luôn tăng trong quá trình tự nhiên.
- Phát biểu **định luật II nhiệt động**: entropy của vũ trụ luôn tăng.
- Giải thích **mũi tên thời gian** (arrow of time) — vì sao thời gian "đi 1 chiều".
- Hiểu **máy nhiệt** (heat engine) và **hiệu suất tối đa** (Carnot).
- Tính được hiệu suất máy nhiệt: η = 1 − T_lạnh/T_nóng.

## Kiến thức tiền đề

- [Lesson 01 (T2) — Nhiệt độ & nhiệt lượng](../lesson-01-temperature-heat/).

---

## 1. Entropy S

### 1.1. Định nghĩa

**Entropy S** = đại lượng đo **số cách (vi mô) một hệ có thể sắp xếp** các phân tử mà vẫn giữ cùng trạng thái vĩ mô. Công thức Boltzmann:

```
S = k_B · ln(W)
```

trong đó **W** = số "microstates" tương ứng với cùng "macrostate".

💡 **Hình dung cụ thể**: hãy tưởng tượng 4 phân tử khí trong một hộp.
- **Trạng thái "đều"** (2 phân tử bên trái + 2 bên phải): có **6 cách** sắp xếp (C(4,2) = 6) → W = 6.
- **Trạng thái "lệch"** (cả 4 ở bên trái): chỉ có **1 cách** → W = 1.
- → Khi quan sát ngẫu nhiên, khả năng thấy "đều" cao hơn 6 lần "lệch". Với hàng tỉ tỉ phân tử, sự chênh lệch trở thành thiên văn — trạng thái "đều" gần như chắc chắn.

**Vì sao cần khái niệm này (không chỉ dùng "hỗn loạn" tổng quát)?** Vì cách định nghĩa qua W cho phép **đo được**, **tính được**, và liên kết với xác suất. Câu nói "hỗn loạn tăng" trở thành **định lý xác suất**: hệ tự đi về trạng thái có nhiều cấu hình hơn.

### 1.2. Đơn vị

Entropy có đơn vị **J/K** (giống nhiệt lượng chia cho nhiệt độ). Trong nhiệt động cổ điển: ΔS = Q/T (cho quá trình thuận nghịch).

### 1.3. Ví dụ trực giác

**Ví dụ 1 — Hộp 2 ngăn**: Hộp chia 2 ngăn bằng vách. Trái có khí, phải chân không. Mở vách. Khí tự khuếch tán đều cả hộp.
- Trước: tất cả phân tử bên trái → 1 cấu hình (vĩ mô) → W nhỏ → S thấp.
- Sau: đều khắp → vô số cấu hình → W lớn → S cao.
- → S tăng → quá trình **không thể đảo ngược** một cách tự nhiên.

**Ví dụ 2 — Bình mực tan trong nước**: Nhỏ vài giọt mực vào cốc nước. Mực tự khuếch tán đều. Không bao giờ tự "thu lại" thành giọt.
- Lý do: cấu hình "mực tập trung" có W nhỏ; "mực đều" có W lớn. Theo xác suất → đi về phía W lớn.

**Ví dụ 3 — Đá tan trong nước ấm**: Đá (S thấp do tinh thể trật tự) gặp nước (S cao). Sau tan: cả hệ thành nước lạnh (S cao hơn).

### 📝 Tóm tắt mục 1

- S = k_B·ln(W). Càng nhiều cấu hình → S càng lớn.
- Quá trình tự nhiên: S tăng (theo xác suất).
- Đơn vị: J/K.

---

## 2. Định luật II nhiệt động học

### 2.1. Phát biểu

**Định luật II**: trong mọi quá trình tự nhiên, **tổng entropy của vũ trụ luôn TĂNG**:

```
ΔS_vũ_trụ = ΔS_hệ + ΔS_môi_trường ≥ 0
```

Dấu "=" chỉ xảy ra trong **quá trình thuận nghịch lý tưởng** (không tồn tại trong thực tế — luôn có ma sát, nhiệt mất).

### 2.2. Hệ quả — Mũi tên thời gian

Định luật II là **lý do duy nhất giải thích sự khác nhau giữa quá khứ và tương lai**. Mọi định luật vật lý khác (Newton, Maxwell, Schrödinger) đều đối xứng theo thời gian — nếu xem ngược video thì vẫn đúng định luật. Chỉ định luật II "biết" hướng thời gian: S tăng theo thời gian.

💡 **Tại sao đập trứng không bao giờ tự ráp lại?** Vì đó sẽ là quá trình S giảm — vi phạm định luật II. Không phải không thể về mặt cơ học (mỗi va chạm đảo ngược được), mà **về xác suất quá nhỏ** (gần 0) để xảy ra ngẫu nhiên.

### 2.3. Phát biểu Kelvin và Clausius (tương đương)

**Phát biểu Kelvin**: Không thể chế tạo một máy nhiệt **chỉ lấy nhiệt từ 1 nguồn và biến HOÀN TOÀN thành công**. Luôn phải có nhiệt "bỏ đi" vào nguồn lạnh hơn.

**Phát biểu Clausius**: Nhiệt **không tự truyền** từ vật lạnh sang vật nóng. (Tủ lạnh làm được, nhưng phải tốn điện.)

### 📝 Tóm tắt mục 2

- ΔS_vũ_trụ ≥ 0 (luôn).
- Mũi tên thời gian = entropy tăng.
- Kelvin: nhiệt không hoàn toàn → công. Clausius: nhiệt tự đi từ nóng → lạnh.

---

## 3. Máy nhiệt (Heat Engine)

### 3.1. Khái niệm

**Máy nhiệt** = thiết bị biến **nhiệt thành công**. Vd: động cơ ô tô, máy hơi nước, nhà máy nhiệt điện.

Sơ đồ:
```
Q_h (nhiệt nhận từ nguồn nóng T_h)
  ↓
[Máy nhiệt] → W (công ra)
  ↓
Q_c (nhiệt thải ra nguồn lạnh T_c)
```

Bảo toàn năng lượng (định luật I): Q_h = W + Q_c.

### 3.2. Hiệu suất η (efficiency)

```
η = W / Q_h = 1 − Q_c / Q_h
```

💡 **Ý nghĩa**: η đo "bao nhiêu phần trăm nhiệt nhận vào trở thành công có ích". 100% nghĩa là **tất cả** nhiệt thành công (Q_c = 0). Nhưng định luật II nói **không thể** đạt η = 100%.

### 3.3. Máy nhiệt Carnot — Hiệu suất tối đa

Sadi Carnot (1824) chứng minh: máy nhiệt **lý tưởng nhất có thể** chạy giữa 2 nguồn nhiệt T_h và T_c có hiệu suất:

```
η_Carnot = 1 − T_c / T_h
```

(T phải tính bằng Kelvin!)

💡 **Ý nghĩa**: bất kỳ máy nhiệt thực nào cũng có η ≤ η_Carnot. Để tăng η, phải:
- Tăng T_h (làm nguồn nóng nóng hơn) — bị giới hạn bởi vật liệu.
- Giảm T_c (làm nguồn lạnh lạnh hơn) — bị giới hạn bởi môi trường (thường là không khí ~ 300 K).

### 3.4. Ba ví dụ số

**Ví dụ 1 — Nhà máy điện hơi nước**: T_h = 500°C = 773 K. T_c = 30°C = 303 K (nước làm mát).
- η_Carnot = 1 − 303/773 = **60.8%**.
- Thực tế: ~ 35-40% (do mất nhiệt, ma sát).
- Đó là tại sao "đốt 100 J nhiên liệu mới có 35 J điện".

**Ví dụ 2 — Động cơ ô tô**: T_h ≈ 2000 K (đốt nhiên liệu). T_c ≈ 800 K (khí thải).
- η_Carnot = 1 − 800/2000 = **60%**.
- Thực tế: ~ 25-35% (do nhiều mất mát).

**Ví dụ 3 — Tủ lạnh** (máy nhiệt ngược): Tủ lạnh "lấy" nhiệt từ trong (T_c lạnh) và "thải" ra môi trường (T_h ấm). Cần cấp công W (điện). Hệ số làm lạnh:
- COP = Q_c / W. Với T_h = 25°C = 298 K, T_c = 5°C = 278 K → COP_max = T_c/(T_h − T_c) = 278/20 = **13.9**.
- Thực tế ~ 2-4.

### 📝 Tóm tắt mục 3

- Máy nhiệt: Q_h = W + Q_c. η = W/Q_h.
- **η_Carnot = 1 − T_c/T_h** (T bằng Kelvin).
- Không thể vượt Carnot. Để tăng η: tăng T_h, giảm T_c.

---

## 4. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Vì sao đập 1 quả trứng không bao giờ tự ráp lại, dù mọi va chạm giữa các phân tử đảo ngược được?

**Bài 2**: Nhà máy điện vận hành ở T_h = 600°C, T_c = 50°C. Tính η_Carnot.

**Bài 3**: Một máy nhiệt nhận 1000 J từ nguồn nóng, sinh ra 350 J công. Tính:
a) Q_c thải ra.
b) η thực tế.
c) Nếu T_h = 500 K, T_c = 300 K, máy này có thể đạt η lý tưởng bao nhiêu?

**Bài 4**: Một động cơ Carnot lý tưởng có T_h = 800 K, η = 60%. T_c bằng bao nhiêu?

**Bài 5**: Vì sao không thể chế tạo máy "perpetual motion" (chuyển động vĩnh cửu) loại 2 (lấy nhiệt từ đại dương → công)?

**Bài 6**: Vũ trụ có thể giảm entropy không?

### Lời giải

**Bài 1**: Về mặt cơ học, mỗi va chạm giữa các phân tử có thể đảo ngược → về mặt lý thuyết, "đập trứng đảo ngược" KHÔNG vi phạm định luật I (bảo toàn năng lượng) hay Newton. Nhưng nó CỰC KỲ kém xác suất: số cấu hình "trứng nguyên" rất nhỏ so với "trứng vỡ tung tóe". Bạn phải đợi thời gian **lớn hơn nhiều tuổi vũ trụ** mới có 1 cơ hội thấy nó tự ráp. Định luật II = quy luật xác suất, không phải định luật cơ bản tuyệt đối — nhưng thực dụng tuyệt đối.

**Bài 2**: T_h = 873 K, T_c = 323 K. η = 1 − 323/873 = **63.0%**.

**Bài 3**: 
- a) Q_c = Q_h − W = 1000 − 350 = **650 J**.
- b) η = 350/1000 = **35%**.
- c) η_Carnot = 1 − 300/500 = **40%**. Máy này dùng 35/40 = 87.5% hiệu quả lý thuyết — khá tốt.

**Bài 4**: 0.6 = 1 − T_c/800 → T_c/800 = 0.4 → **T_c = 320 K = 47°C**.

**Bài 5**: Đại dương có rất nhiều nhiệt. Nếu lấy chỉ Q_h từ 1 nguồn (đại dương) và biến hoàn toàn thành W không có nguồn lạnh → vi phạm phát biểu Kelvin của định luật II → không thể. Máy này nếu tồn tại sẽ làm giảm entropy đại dương mà không tăng entropy ở đâu khác — vi phạm S_vũ_trụ ≥ 0.

**Bài 6**: KHÔNG (tổng entropy). Vũ trụ là hệ kín → ΔS_vũ_trụ ≥ 0 luôn. Tuy nhiên, **một phần** của vũ trụ có thể giảm entropy (vd sinh vật sống tổ chức cấu trúc có thứ tự). Nhưng phải đổi lại: phần khác (môi trường xung quanh) tăng entropy nhiều hơn để bù lại. Đây là cách sự sống tồn tại — tạo trật tự cục bộ bằng cách "thải" hỗn loạn ra ngoài (nhiệt + chất thải).

---

## 5. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 04 — Điện tích & Coulomb](../lesson-04-coulomb-charge/).

---

## 📝 Tổng kết Lesson 03 (T2)

1. **S = k_B·ln(W)** — entropy đo số cấu hình. J/K.
2. **Định luật II**: ΔS_vũ_trụ ≥ 0. Mũi tên thời gian.
3. **Máy nhiệt**: Q_h = W + Q_c. η = W/Q_h.
4. **Carnot**: η_max = 1 − T_c/T_h (Kelvin). Không thể vượt.
5. **Tủ lạnh**: lấy nhiệt từ lạnh đẩy ra ấm, cần tốn công.

**Tiếp theo**: [Lesson 04 — Điện tích &amp; Coulomb](../lesson-04-coulomb-charge/)
