// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/03-Trig-Complex/lesson-01-angles-radians/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Góc & Radian

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
- Đạo hàm \`(sin x)' = cos x\` CHỈ đúng khi x tính bằng radian. Nếu dùng độ, công thức thành \`(sin x°)' = (π/180)·cos x°\` — xấu, có hằng số thừa.
- Khai triển Taylor \`sin x = x − x³/6 + ...\` CHỈ đúng với radian.
- Trong vật lý: vận tốc góc ω rad/s, không bao giờ độ/s.

⟶ **Radian = ngôn ngữ chuẩn từ Calculus trở lên**.

---

## 2. Định nghĩa radian

### 2.1. Định nghĩa hình học

**1 radian** = góc ở tâm chắn **cung có độ dài bằng bán kính**.

\`\`\`
  ╱─────╲
 ╱   r   ╲       Cung dài r → góc = 1 rad
│    ●────│  
 ╲   r   ╱      
  ╲─────╱
\`\`\`

⟶ Cả vòng tròn = chu vi = 2πr → góc đầy = 2π rad = 360°.

### 2.2. Công thức quy đổi

\`\`\`
180° = π rad
\`\`\`

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

---

## 3. Đường tròn lượng giác đơn vị

💡 **Là gì**: Đường tròn tâm O, **bán kính = 1**, được dùng để định nghĩa sin, cos cho **mọi góc** (không chỉ trong tam giác vuông).

\`\`\`
       y
       │   ●(cos θ, sin θ)
       │  ╱
       │ ╱ θ
       │╱──────────── x
      O
\`\`\`

- Lấy điểm M trên đường tròn, đo góc θ từ Ox quay ngược chiều kim đồng hồ.
- **cos θ** = hoành độ M.
- **sin θ** = tung độ M.

**Hệ quả**: cos²θ + sin²θ = 1 (do M nằm trên đường tròn bán kính 1).

❓ **Câu hỏi tự nhiên**: Vì sao đường tròn này lại "đơn vị"?
**Trả lời**: Vì bán kính = 1, nên cos/sin là tọa độ trực tiếp, không cần chia r. Đơn giản hóa mọi công thức.

---

## 4. Góc lượng giác — Có dấu, có thể vượt 360°

**Khác góc hình học** (luôn từ 0 đến 180°):

- **Chiều dương**: ngược chiều kim đồng hồ.
- **Chiều âm**: thuận chiều kim đồng hồ. θ = -30° tương đương quay 30° xuống.
- **Vượt 360°**: 450° = 360° + 90° = 1 vòng + 90°. Cùng vị trí với 90°.
- **Tổng quát**: θ và θ + k·2π (k ∈ ℤ) có cùng điểm đại diện.

⟶ Đây là lý do sin, cos là **hàm tuần hoàn** chu kỳ 2π.

---

## 5. Độ dài cung — Lý do thật sự yêu radian

Cho cung tròn bán kính r, chắn góc θ (radian):
\`\`\`
ℓ = r · θ
\`\`\`

**Ví dụ**: r = 5, θ = π/3. ℓ = 5·π/3 ≈ 5.24.

⟶ **Đẹp đến mức nào**: Nếu dùng độ, công thức là ℓ = r · θ · π/180 — xấu, có hằng số π/180 thừa. Radian thiết kế ra chính là để công thức này gọn.

**Diện tích quạt tròn**: S = ½ · r² · θ (radian).

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
`;
