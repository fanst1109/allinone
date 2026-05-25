# Lesson 01 (T3) — Quang hình (Geometric Optics)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **quang hình** = mô hình ánh sáng truyền theo đường thẳng (đúng khi λ << kích thước vật).
- Áp dụng **định luật phản xạ**: góc tới = góc phản xạ.
- Áp dụng **định luật khúc xạ Snell**: n₁·sin(θ₁) = n₂·sin(θ₂).
- Hiểu **chiết suất n** = c/v_môi_trường — và liên hệ với tốc độ ánh sáng trong môi trường.
- Hiểu **phản xạ toàn phần** và ứng dụng trong cáp quang.

## Kiến thức tiền đề

- [Lesson 08 (T2) — Sóng điện từ](../../02-Thermo-Electromagnetism/lesson-08-em-waves/).

---

## 1. Phản xạ ánh sáng

### 1.1. Định luật phản xạ

Khi ánh sáng gặp bề mặt phản xạ (gương phẳng), tia tới và tia phản xạ:
1. Cùng nằm trong mặt phẳng chứa pháp tuyến.
2. **Góc tới = góc phản xạ** (đo từ pháp tuyến).

💡 **Ý nghĩa**: phản xạ "đối xứng" so với pháp tuyến bề mặt. Đây là cách gương hoạt động.

### 1.2. Loại phản xạ

- **Phản xạ chính diện** (specular): bề mặt phẳng, mịn (gương) → tia tới song song → tia phản xạ song song.
- **Phản xạ khuếch tán** (diffuse): bề mặt nhám (giấy, da) → tia tới song song → tia phản xạ phân tán mọi hướng. Đó là tại sao ta thấy được mọi vật, không chỉ gương.

### 📝 Tóm tắt mục 1

- Phản xạ: góc tới = góc phản xạ.
- Specular (gương) vs diffuse (mọi bề mặt thường).

---

## 2. Khúc xạ ánh sáng — Định luật Snell

### 2.1. Khái niệm chiết suất

**Chiết suất n** của một môi trường = tỉ số tốc độ ánh sáng trong chân không và trong môi trường:
```
n = c / v
```

💡 **Ý nghĩa**: n cho biết "ánh sáng đi chậm thế nào trong môi trường so với chân không". Chân không: n = 1. Mọi môi trường khác: n > 1.

Bảng n các môi trường:
| Môi trường | n |
|-----------|---|
| Chân không | 1.000 (chính xác) |
| Không khí | 1.0003 (xấp xỉ 1) |
| Nước | 1.33 |
| Thủy tinh thường | 1.50 |
| Kim cương | 2.42 (cao nhất trong vật liệu phổ biến) |

### 2.2. Định luật Snell

Khi ánh sáng đi từ môi trường 1 sang môi trường 2:

```
n₁ · sin(θ₁) = n₂ · sin(θ₂)
```

trong đó θ là góc đo từ pháp tuyến.

💡 **Ý nghĩa**: ánh sáng "bẻ" khi qua mặt phân cách, vì tốc độ thay đổi. Đi vào môi trường **đậm hơn** (n lớn hơn) → tia **bẻ về phía pháp tuyến**. Đi ra ngoài → bẻ xa pháp tuyến.

### 2.3. Vì sao có khúc xạ?

Vì tốc độ ánh sáng khác nhau trong các môi trường. Khi sóng EM gặp mặt phân cách dưới một góc, một phần sóng tiến vào môi trường mới với tốc độ khác → đường truyền bị "bẻ". Tương tự bánh xe khi từ nhựa đường lăn vào cát — bị bẻ.

### 2.4. Ví dụ trực giác

**Ví dụ — Đũa trong cốc nước**: nhìn đũa trong cốc nước thấy "gãy". Vì ánh sáng từ phần đũa dưới nước đi qua nước → không khí → bẻ tại mặt nước → mắt thấy ảo ảnh đũa bị lệch vị trí.

### 📝 Tóm tắt mục 2

- n = c/v. Càng đậm → n càng cao → ánh sáng chậm hơn.
- Snell: n₁·sin(θ₁) = n₂·sin(θ₂). Đi vào đậm → bẻ về pháp tuyến.

---

## 3. Phản xạ toàn phần (Total Internal Reflection)

### 3.1. Khái niệm

Khi ánh sáng đi từ môi trường **đậm hơn** sang **loãng hơn** (vd nước → không khí), nếu góc tới vượt một **góc tới hạn θ_c**, ánh sáng **không xuyên qua** mà bị **phản xạ HOÀN TOÀN** vào lại môi trường đậm.

```
sin(θ_c) = n₂ / n₁   (n₂ < n₁)
```

### 3.2. Ví dụ: nước → không khí

- n₁ = 1.33 (nước), n₂ = 1.00 (không khí).
- sin(θ_c) = 1/1.33 = 0.752 → θ_c ≈ **48.6°**.
- Nếu nhìn lên từ dưới nước với góc > 48.6° so với pháp tuyến (= < 41.4° so với mặt nước), bạn KHÔNG thấy bầu trời mà chỉ thấy đáy bể phản chiếu.

### 3.3. Ứng dụng — Cáp quang

Cáp quang = sợi thủy tinh mỏng. Ánh sáng đi vào 1 đầu, do **phản xạ toàn phần liên tục** ở thành sợi → đi được hàng km mà không thoát ra. Đây là nền tảng internet tốc độ cao hiện đại.

### 📝 Tóm tắt mục 3

- Phản xạ toàn phần: từ đậm sang loãng, góc > θ_c.
- sin(θ_c) = n₂/n₁.
- Ứng dụng: cáp quang internet.

---

## 4. Bài tập

### Bài tập

**Bài 1**: Ánh sáng đi từ không khí (n=1) vào nước (n=1.33) với góc tới 30°. Tính góc khúc xạ.

**Bài 2**: Tốc độ ánh sáng trong thủy tinh n=1.5 là bao nhiêu?

**Bài 3**: Tính θ_c cho ánh sáng đi từ thủy tinh (n=1.5) sang không khí.

**Bài 4**: Vì sao kim cương trong suốt nhưng lại "lấp lánh"?

**Bài 5**: Vì sao bề mặt nước hồ lúc nắng trông như tấm gương?

### Lời giải

**Bài 1**: 1·sin(30°) = 1.33·sin(θ₂) → sin(θ₂) = 0.5/1.33 = 0.376 → θ₂ = **22.1°** (bẻ về phía pháp tuyến).

**Bài 2**: v = c/n = 3e8/1.5 = **2 × 10⁸ m/s**.

**Bài 3**: sin(θ_c) = 1/1.5 = 0.667 → θ_c = **41.8°**.

**Bài 4**: Kim cương có **n = 2.42, cao nhất** trong vật liệu phổ biến. Hệ quả:
- Góc tới hạn θ_c = arcsin(1/2.42) = 24.4° → rất nhỏ. Hầu như mọi tia vào đều bị phản xạ toàn phần khi gặp mặt sau → không thoát qua trừ ở góc rất hẹp. Ánh sáng bị "kẹt" bên trong, phản xạ nhiều lần.
- Tán sắc cao (n thay đổi theo λ) → tách màu cầu vồng.
- Người thợ kim hoàn cắt mặt kim cương để tối đa hóa phản xạ tổng phần → "lấp lánh".

**Bài 5**: Khi nhìn từ trên gần như vuông góc, ta thấy mặt nước trong suốt. Nhưng khi nhìn từ góc xiên (xa) → góc tới lớn → vượt θ_c → phản xạ toàn phần → mặt nước "phản chiếu" bầu trời/cây cối → trông như gương.

---

## 5. Bài tiếp theo

[Lesson 02 — Thấu kính & gương](../lesson-02-lenses-mirrors/).

## 📝 Tổng kết

1. **Phản xạ**: góc tới = góc phản xạ.
2. **Chiết suất n = c/v**. Chân không 1, nước 1.33, thủy tinh 1.5, kim cương 2.42.
3. **Snell**: n₁·sin(θ₁) = n₂·sin(θ₂). Đi vào đậm → bẻ về pháp tuyến.
4. **Phản xạ toàn phần**: từ đậm → loãng, θ > θ_c. sin(θ_c) = n_loãng/n_đậm.
5. **Ứng dụng**: gương, lăng kính, cáp quang, sự lấp lánh của kim cương.
