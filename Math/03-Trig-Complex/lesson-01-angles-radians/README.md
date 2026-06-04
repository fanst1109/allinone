# Lesson 01 — Góc & Radian

## Mục tiêu

- Hiểu **radian** là gì và vì sao toán học cấp cao bỏ độ, dùng radian.
- Quy đổi **độ ↔ radian** thành thạo.
- Hiểu **đường tròn lượng giác đơn vị** — nền tảng để định nghĩa sin, cos.
- Biết **góc lượng giác** (có dấu, vượt 360°) khác góc hình học thế nào.

## Kiến thức tiền đề

- [Tier 2 — Geometry](../../02-Geometry/) (đặc biệt L03 về đường tròn).

---

## 1. Vì sao cần đơn vị mới?

💡 **Câu hỏi**: Độ đã quen, vì sao phải học radian?

**Câu trả lời ngắn**: Độ là quy ước **tùy ý** (người Babylon chia vòng tròn thành 360 vì lịch họ ~360 ngày). Radian là đơn vị **tự nhiên của toán học** — định nghĩa trực tiếp từ hình học, không "chế" ra.

**Hệ quả thực tế**:
- Đạo hàm `(sin x)' = cos x` CHỈ đúng khi x tính bằng radian. Nếu dùng độ, công thức thành `(sin x°)' = (π/180)·cos x°` — xấu, có hằng số thừa.
- Khai triển Taylor `sin x = x − x³/6 + ...` CHỈ đúng với radian.
- Trong vật lý: vận tốc góc ω rad/s, không bao giờ độ/s.

⟶ **Radian = ngôn ngữ chuẩn từ Calculus trở lên**.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Radian nhỏ hơn hay lớn hơn độ?"* 1 rad ≈ 57.3°, nên 1 rad **lớn hơn** 1°. Cả vòng 360° = 2π ≈ 6.28 rad → một số rad nhỏ "ôm" được một góc lớn.
- *"Máy tính bỏ túi của tôi để chế độ DEG, có sai không?"* Khi chỉ tính `sin 30°` thì DEG tiện. Nhưng làm Calculus (đạo hàm, Taylor) bắt buộc RAD. Nhập `sin(1)` ở chế độ RAD ra `0.841`, ở DEG ra `0.0175` — khác hẳn. Đây là lỗi #1 khi tính toán.
- *"Vậy độ có bị 'bỏ' hoàn toàn không?"* Không. Kỹ thuật, đo đạc, đời thường vẫn dùng độ vì trực quan. Radian chỉ thống trị **toán giải tích và vật lý lý thuyết**.

⚠ **Lỗi thường gặp — để máy tính sai chế độ DEG/RAD**. Phản ví dụ bằng số: muốn tính `sin(π/6) = 0.5` nhưng máy đang ở DEG, bạn gõ `sin(0.5236)` → máy hiểu là `sin(0.5236°) = 0.00914`, sai hoàn toàn so với `0.5`. Luôn kiểm tra biểu tượng DEG/RAD trên màn hình trước khi tính.

🔁 **Dừng lại tự kiểm tra**

1. 1 vòng tròn bằng bao nhiêu rad? Nửa vòng?
2. Góc 2 rad lớn hơn hay nhỏ hơn 90°?

<details><summary>Đáp án</summary>

1. Cả vòng = `2π` rad ≈ 6.28; nửa vòng = `π` rad ≈ 3.14 (= 180°).
2. 90° = π/2 ≈ 1.57 rad. Vì 2 > 1.57 nên **2 rad lớn hơn** 90° (cụ thể 2 rad ≈ 114.6°).

</details>

### 📝 Tóm tắt mục 1

- Độ là quy ước tùy ý (Babylon, 360 ≈ số ngày/năm); radian là đơn vị **tự nhiên** từ hình học.
- Radian bắt buộc từ Calculus trở lên: `(sin x)' = cos x` và Taylor chỉ đúng với rad.
- 1 rad ≈ 57.3°; cả vòng = 2π rad; luôn kiểm tra chế độ DEG/RAD trên máy tính.

---

## 2. Định nghĩa radian

### 2.1. Định nghĩa hình học

**1 radian** = góc ở tâm chắn **cung có độ dài bằng bán kính**.

```
  ╱─────╲
 ╱   r   ╲       Cung dài r → góc = 1 rad
│    ●────│  
 ╲   r   ╱      
  ╲─────╱
```

⟶ Cả vòng tròn = chu vi = 2πr → góc đầy = 2π rad = 360°.

> 📐 **Định nghĩa đầy đủ — Radian**
>
> **(a) Là gì**: Đơn vị đo góc **tự nhiên** dựa trên đường tròn. 1 radian = số đo góc mà cung tròn nó chắn có độ dài bằng đúng bán kính. Đây là tỉ số "cung/bán kính" — không có thứ nguyên (không đơn vị thực sự).
>
> **(b) Vì sao cần**: Vì độ (°) là quy ước **tùy ý** (Babylon chọn 360 vì lịch họ ~360 ngày). Radian là đơn vị **toán học tự nhiên** — nhờ nó, công thức (sin x)' = cos x đúng (nếu dùng độ thì phải nhân thêm π/180, xấu). Khai triển Taylor sin x = x − x³/6 + ... CHỈ đúng với radian. Mọi giải tích, vật lý cấp cao bắt buộc dùng radian.
>
> **(c) Ví dụ số**: π rad = 180° (nửa vòng). π/2 rad = 90° (góc vuông). π/4 = 45°. 2π = 360° (1 vòng). 1 rad = 180/π ≈ 57.3°. Cung tròn r = 10, góc 2 rad: độ dài cung = r·θ = 10·2 = **20**. Diện tích quạt tròn: ½·r²·θ = ½·100·2 = **100**.

### 2.2. Công thức quy đổi

```
180° = π rad
```

Từ đó:
- **Độ → Rad**: nhân với π/180.
- **Rad → Độ**: nhân với 180/π.

**Ví dụ số**:
- 90° = 90·π/180 = **π/2 rad** ≈ 1.5708.
- 60° = 60·π/180 = **π/3 rad** ≈ 1.0472.
- 45° = **π/4** ≈ 0.7854.
- 30° = **π/6** ≈ 0.5236.
- 1 rad = 180/π ≈ **57.296°**.
- 2 rad ≈ 114.59°.

### 2.3. Bảng các góc phổ biến

| Độ | 0 | 30 | 45 | 60 | 90 | 120 | 135 | 150 | 180 | 270 | 360 |
|----|---|----|----|----|----|-----|-----|-----|-----|-----|-----|
| Rad | 0 | π/6 | π/4 | π/3 | π/2 | 2π/3 | 3π/4 | 5π/6 | π | 3π/2 | 2π |

💡 **Mẹo nhớ**: π = nửa vòng, π/2 = ¼ vòng (góc vuông), π/4 = 45°, π/6 = 30°.

**Verify công thức quy đổi (cả 2 chiều)**: lấy 90°. Độ→rad: `90·π/180 = π/2`. Rad→độ ngược lại: `(π/2)·180/π = 90°` ✓ — hai phép là nghịch đảo của nhau, khớp.

⚠ **Lỗi thường gặp — nhân/chia nhầm chiều hệ số**. Quy tắc gọn: đi từ độ (đơn vị to, nhiều con số) sang rad (đơn vị nhỏ về con số) thì **nhân π/180** (làm số bé lại); chiều ngược **nhân 180/π**. Phản ví dụ: đổi 60° mà lỡ nhân `180/π` ra `60·57.3 ≈ 3438` rad — vô lý (lớn hơn cả vòng tròn). Đúng phải `60·π/180 = π/3 ≈ 1.05` rad.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao kết quả hay để ở dạng `π/6` mà không phải số thập phân `0.5236`?"* Vì dạng `π/6` **chính xác tuyệt đối**, còn `0.5236` đã làm tròn. Trong toán ưu tiên dạng phân số của π; chỉ đổi sang thập phân khi cần con số đo đạc cụ thể.
- *"Góc âm như −π/3 đổi ra độ thế nào?"* Dấu giữ nguyên: `−π/3 · 180/π = −60°`. Góc âm = quay theo chiều kim đồng hồ (xem mục 4).

🔁 **Dừng lại tự kiểm tra**

1. Đổi 120° sang radian.
2. Đổi 7π/6 rad sang độ.

<details><summary>Đáp án</summary>

1. `120·π/180 = 2π/3` rad ≈ 2.094.
2. `(7π/6)·180/π = 7·180/6 = 210°`.

</details>

### 📝 Tóm tắt mục 2

- `180° = π rad` là gốc quy đổi; mọi công thức suy từ đây.
- Độ→rad: ×π/180; rad→độ: ×180/π (hai phép nghịch đảo nhau).
- Thuộc bảng góc đặc biệt (π/6, π/4, π/3, π/2, π) — dùng liên tục về sau.

---

## 3. Đường tròn lượng giác đơn vị

💡 **Là gì**: Đường tròn tâm O, **bán kính = 1**, được dùng để định nghĩa sin, cos cho **mọi góc** (không chỉ trong tam giác vuông).

```
       y
       │   ●(cos θ, sin θ)
       │  ╱
       │ ╱ θ
       │╱──────────── x
      O
```

- Lấy điểm M trên đường tròn, đo góc θ từ Ox quay ngược chiều kim đồng hồ.
- **cos θ** = hoành độ M.
- **sin θ** = tung độ M.

**Hệ quả**: cos²θ + sin²θ = 1 (do M nằm trên đường tròn bán kính 1).

❓ **Câu hỏi tự nhiên**: Vì sao đường tròn này lại "đơn vị"?
**Trả lời**: Vì bán kính = 1, nên cos/sin là tọa độ trực tiếp, không cần chia r. Đơn giản hóa mọi công thức.

**Verify `cos²θ + sin²θ = 1` bằng 4 góc cụ thể**:
- θ = 0: M(1, 0) → `1² + 0² = 1` ✓.
- θ = π/6 (30°): M(√3/2, 1/2) → `(√3/2)² + (1/2)² = 3/4 + 1/4 = 1` ✓.
- θ = π/4 (45°): M(√2/2, √2/2) → `1/2 + 1/2 = 1` ✓.
- θ = 2π/3 (120°): M(−1/2, √3/2) → `1/4 + 3/4 = 1` ✓ (dù toạ độ x âm, bình phương vẫn cho 1).

⚠ **Lỗi thường gặp — đảo vai trò cos và sin**. cos = **hoành độ** (x, đi ngang), sin = **tung độ** (y, đi dọc). Phản ví dụ: tại θ = π/2 (điểm trên cùng (0, 1)), người mới hay viết `cos π/2 = 1` (nhầm) — sai, vì hoành độ điểm đó là 0 → `cos π/2 = 0`, còn `sin π/2 = 1`.

🔁 **Dừng lại tự kiểm tra**

1. Điểm ứng với θ = π nằm ở đâu? cos π và sin π bằng mấy?
2. Một điểm trên đường tròn đơn vị có hoành độ 0.6. Tung độ có thể bằng mấy?

<details><summary>Đáp án</summary>

1. θ = π → điểm (−1, 0) (cực trái). `cos π = −1`, `sin π = 0`.
2. `0.6² + y² = 1` → `y² = 0.64` → `y = ±0.8` (hai điểm: trên và dưới trục hoành).

</details>

### 📝 Tóm tắt mục 3

- Đường tròn đơn vị: tâm O, bán kính 1; mở rộng định nghĩa sin/cos cho mọi góc.
- cos θ = hoành độ (x), sin θ = tung độ (y) của điểm M ứng với góc θ.
- Vì M nằm trên đường tròn r = 1 nên luôn có `cos²θ + sin²θ = 1`.

---

## 4. Góc lượng giác — Có dấu, có thể vượt 360°

💡 **Trực giác / Hình dung**: nghĩ góc như **số vòng + phần lẻ một người đi bộ trên đường tròn**. Đi ngược kim đồng hồ = góc dương, đi xuôi kim đồng hồ = góc âm. Đi 1 vòng rưỡi (540°) thì "đứng" ở chỗ giống như mới đi nửa vòng (180°) — vị trí trùng nhau, chỉ khác số vòng đã đi. Góc lượng giác ghi lại **cả hành trình**, không chỉ điểm đến.

**Khác góc hình học** (luôn từ 0 đến 180°):

- **Chiều dương**: ngược chiều kim đồng hồ.
- **Chiều âm**: thuận chiều kim đồng hồ. θ = -30° tương đương quay 30° xuống.
- **Vượt 360°**: 450° = 360° + 90° = 1 vòng + 90°. Cùng vị trí với 90°.
- **Tổng quát**: θ và θ + k·2π (k ∈ ℤ) có cùng điểm đại diện.

⟶ Đây là lý do sin, cos là **hàm tuần hoàn** chu kỳ 2π.

❓ **Câu hỏi tự nhiên của người đọc**

- *"450° và 90° cùng vị trí — vậy chúng có là 'cùng một góc' không?"* Cùng **vị trí điểm** trên đường tròn (nên sin/cos bằng nhau), nhưng **khác góc** (450° = 90° + 1 vòng). Khi chỉ quan tâm sin/cos thì coi như nhau; khi quan tâm "đã quay mấy vòng" thì khác.
- *"Làm sao đưa một góc to như 1000° về khoảng `[0°, 360°)`?"* Trừ bội của 360 cho tới khi lọt khoảng: `1000 − 2·360 = 1000 − 720 = 280°`.
- *"Góc âm −30° tương đương góc dương nào?"* Cộng 360: `−30 + 360 = 330°`. Cùng vị trí.

⚠ **Lỗi thường gặp — cộng/trừ nhầm `360°` với `180°` (hay `2π` với `π`)**. Hai góc trùng vị trí cách nhau **bội của 360° (2π)**, KHÔNG phải 180°. Phản ví dụ: 30° và 210° cách nhau 180° nhưng KHÔNG cùng vị trí (210° ở phần tư III, đối tâm với 30°). Còn 30° và `30+360=390°` mới cùng vị trí.

🔁 **Dừng lại tự kiểm tra**

1. Đưa góc 800° về khoảng `[0°, 360°)`.
2. Góc −π/3 tương đương góc dương nào trong `[0, 2π)`?

<details><summary>Đáp án</summary>

1. `800 − 2·360 = 800 − 720 = 80°`.
2. `−π/3 + 2π = −π/3 + 6π/3 = 5π/3`.

</details>

### 📝 Tóm tắt mục 4

- Góc lượng giác **có dấu**: dương = ngược kim đồng hồ, âm = xuôi kim đồng hồ.
- Có thể vượt 360° (nhiều vòng); θ và θ + k·2π trùng vị trí điểm.
- Hệ quả: sin, cos tuần hoàn chu kỳ 2π. Đưa góc về khoảng chuẩn bằng cách ±k·360° (±k·2π).

---

## 5. Độ dài cung — Lý do thật sự yêu radian

💡 **Trực giác / Hình dung**: nhớ lại định nghĩa "1 rad = cung dài bằng 1 bán kính". Vậy nếu góc là `θ` rad thì cung dài `θ` lần bán kính → `ℓ = r·θ`. Công thức này gọn **chính vì** radian được định nghĩa đúng theo cách đó — nó là "phần thưởng" của việc chọn đơn vị tự nhiên.

Cho cung tròn bán kính r, chắn góc θ (radian):
```
ℓ = r · θ
```

**4 ví dụ số đa dạng**:
- r = 5, θ = π/3: `ℓ = 5·π/3 ≈ 5.24`.
- r = 1 (đường tròn đơn vị), θ = π: `ℓ = π ≈ 3.14` (đúng nửa chu vi 2π/2).
- r = 10, θ = 2: `ℓ = 20`; diện tích quạt `S = ½·100·2 = 100`.
- Cả vòng: θ = 2π → `ℓ = r·2π = 2πr` = chu vi ✓ (khớp công thức chu vi quen thuộc).

⟶ **Đẹp đến mức nào**: Nếu dùng độ, công thức là ℓ = r · θ · π/180 — xấu, có hằng số π/180 thừa. Radian thiết kế ra chính là để công thức này gọn.

**Diện tích quạt tròn**: S = ½ · r² · θ (radian).

**Verify công thức quạt khớp diện tích hình tròn**: cả hình tròn ứng θ = 2π → `S = ½·r²·2π = πr²` ✓ — đúng công thức diện tích hình tròn quen thuộc.

⚠ **Lỗi thường gặp — quên đổi góc về radian trước khi dùng `ℓ = rθ`, `S = ½r²θ`**. Hai công thức này CHỈ đúng khi θ là radian. Phản ví dụ: cung r = 5, góc 60°. Nếu cắm thẳng 60: `ℓ = 5·60 = 300` (vô lý, dài hơn cả chu vi `2π·5 ≈ 31.4`). Đúng phải đổi `60° = π/3` trước: `ℓ = 5·π/3 ≈ 5.24`.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tại sao diện tích quạt có ½ mà độ dài cung thì không?"* Vì quạt là "tam giác cong": diện tích ~ ½·đáy·cao, ở đây đóng vai như ½·(cung)·(bán kính) = ½·(rθ)·r = ½r²θ. Hệ số ½ là dấu vết của diện tích tam giác.
- *"Cung và dây cung khác nhau không?"* Khác. **Cung** = phần đường tròn (cong), dài `rθ`. **Dây cung** = đoạn thẳng nối 2 đầu (thẳng), dài `2r·sin(θ/2)`. Với θ nhỏ hai cái xấp xỉ nhau.

🔁 **Dừng lại tự kiểm tra**

1. Bánh xe bán kính 0.3 m quay góc 4 rad. Một điểm trên vành đi được quãng đường bao nhiêu?
2. Quạt tròn r = 6, góc 90°. Diện tích?

<details><summary>Đáp án</summary>

1. `ℓ = rθ = 0.3·4 = 1.2` m.
2. Đổi `90° = π/2`. `S = ½·6²·(π/2) = ½·36·π/2 = 9π ≈ 28.3`.

</details>

### 📝 Tóm tắt mục 5

- `ℓ = r·θ` và `S = ½·r²·θ` — **θ phải là radian**.
- Công thức gọn chính vì radian định nghĩa theo "cung = bán kính".
- Kiểm tra biên: θ = 2π cho lại chu vi `2πr` và diện tích `πr²`.

---

## 6. Bài tập

### Bài tập

**Bài 1**: Đổi 270° sang radian.

**Bài 2**: Đổi 5π/6 rad sang độ.

**Bài 3**: Cung tròn r = 10, θ = 2 rad. Tìm độ dài cung và diện tích hình quạt.

**Bài 4**: Vẽ điểm tương ứng với góc θ = 5π/4 trên đường tròn lượng giác. Tọa độ?

**Bài 5**: Hai góc 750° và 1110° có "cùng vị trí" trên đường tròn không?

### Lời giải

**Bài 1**: 270 · π/180 = **3π/2 rad** ≈ 4.712.

**Bài 2**: (5π/6)·(180/π) = 5·180/6 = **150°**.

**Bài 3**:  
- ℓ = r·θ = 10·2 = **20**.  
- S = ½·r²·θ = ½·100·2 = **100**.

**Bài 4**: 5π/4 = π + π/4 = 180° + 45° = 225° (góc phần tư III). cos = -√2/2 ≈ -0.707, sin = -√2/2. Tọa độ **(-0.707, -0.707)**.

**Bài 5**:  
- 750° = 360·2 + 30° → cùng vị trí với 30°.  
- 1110° = 360·3 + 30° → cùng vị trí với 30°.  
- ⟹ **Có**, cả 2 đều tương đương 30°.

---

## 7. Bài tiếp theo

[Lesson 02 — sin, cos, tan](../lesson-02-sin-cos-tan/) — định nghĩa, đồ thị, tính chất.

## 📝 Tổng kết

1. **Radian** = đơn vị tự nhiên (cung = bán kính).
2. **180° = π rad**.
3. **Đường tròn lượng giác đơn vị**: cos, sin = tọa độ điểm trên đường tròn r=1.
4. **Góc lượng giác**: có dấu, có thể vượt 2π. Cộng/trừ 2π không đổi vị trí.
5. **ℓ = rθ**, **S = ½r²θ** (θ tính bằng radian).
