// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Physics/03-Optics-ModernPhysics/lesson-02-lenses-mirrors/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 (T3) — Thấu kính & Gương

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt **thấu kính hội tụ** (lồi) và **thấu kính phân kỳ** (lõm).
- Áp dụng **phương trình thấu kính mỏng**: 1/f = 1/d_o + 1/d_i.
- Tính **độ phóng đại** m = h_i/h_o = −d_i/d_o.
- Phân biệt **ảnh thật** (real) vs **ảnh ảo** (virtual).
- Hiểu nguyên lý các dụng cụ quang: kính lúp, máy ảnh, mắt, kính cận/viễn.

## Kiến thức tiền đề

- [Lesson 01 (T3) — Quang hình](../lesson-01-geometric-optics/) — Snell's law.

---

## 1. Thấu kính

### 1.1. Phân loại

**Thấu kính hội tụ (convex, lồi)**: dày ở giữa, mỏng ở mép. Tập trung tia song song vào 1 điểm = **tiêu điểm F**. **f > 0**.

**Thấu kính phân kỳ (concave, lõm)**: mỏng giữa, dày mép. Phân tán tia. **f < 0**.

### 1.2. Phương trình thấu kính mỏng

\`\`\`
1/f = 1/d_o + 1/d_i
\`\`\`

trong đó:
- **f** = tiêu cự (focal length).
- **d_o** = khoảng cách từ vật đến thấu kính (object distance).
- **d_i** = khoảng cách từ ảnh đến thấu kính (image distance).

**Độ phóng đại**:
\`\`\`
m = h_i / h_o = −d_i / d_o
\`\`\`

### 1.3. Quy ước dấu

- **d_o > 0**: vật ở trước thấu kính (mọi trường hợp thông thường).
- **d_i > 0**: ảnh ở SAU thấu kính (cùng phía ánh sáng đi ra) → **ảnh thật** (real image).
- **d_i < 0**: ảnh ở TRƯỚC thấu kính (cùng phía vật) → **ảnh ảo** (virtual image).
- **f > 0** cho lồi, **f < 0** cho lõm.
- **m > 0**: ảnh cùng chiều với vật. **m < 0**: ngược chiều (lộn).

### 1.4. Ảnh thật vs Ảnh ảo

- **Ảnh thật**: ánh sáng thực sự hội tụ tại đó → có thể chiếu lên màn. Vd ảnh trên phim máy ảnh.
- **Ảnh ảo**: ánh sáng phân kỳ; mắt nhìn ngược lại "thấy" ánh sáng dường như từ đó. KHÔNG chiếu màn được. Vd kính lúp.

### 1.5. Walk-through — Thấu kính lồi f = 10 cm

**Trường hợp 1**: vật ở d_o = 30 cm (xa hơn 2f = 20 cm):
- 1/d_i = 1/10 − 1/30 = 3/30 − 1/30 = 2/30 → d_i = **15 cm** (sau thấu kính).
- m = −15/30 = **−0.5** (ảnh thật, ngược, nhỏ hơn). 
- → Đây là cách máy ảnh hoạt động: vật xa → ảnh thật ngược, nhỏ trên cảm biến.

**Trường hợp 2**: vật ở d_o = 5 cm (gần hơn f = 10 cm):
- 1/d_i = 1/10 − 1/5 = 1/10 − 2/10 = −1/10 → d_i = **−10 cm**.
- m = −(−10)/5 = **+2**. Ảnh **ảo**, **cùng chiều**, **gấp đôi**.
- → Đây là kính lúp: đưa vật gần kính (trong khoảng f) → ảnh ảo phóng đại.

### 📝 Tóm tắt mục 1

- Hội tụ (f > 0) vs phân kỳ (f < 0).
- 1/f = 1/d_o + 1/d_i.
- Ảnh thật d_i > 0 (chiếu màn), ảnh ảo d_i < 0 (chỉ nhìn được).

---

## 2. Gương

### 2.1. Gương cầu

Có 2 loại:
- **Gương cầu lồi** (convex): "phình ra" — phản xạ phân kỳ. f < 0.
- **Gương cầu lõm** (concave): "lõm vào" — tập trung. f > 0.

Phương trình tương tự thấu kính: **1/f = 1/d_o + 1/d_i**. Tiêu cự liên hệ bán kính: **f = R/2**.

### 2.2. Ứng dụng

- **Gương lõm**: gương trang điểm phóng to khi gần, gương vệ tinh thu sóng.
- **Gương lồi**: gương chiếu hậu xe (rộng tầm nhìn nhưng làm vật nhìn xa hơn), gương trong siêu thị.
- **Kính viễn vọng**: gương lõm thu ánh sáng từ ngôi sao.

### 📝 Tóm tắt mục 2

- Gương cầu: 1/f = 1/d_o + 1/d_i, f = R/2.
- Lõm tập trung (f > 0), lồi phân kỳ (f < 0).

---

## 3. Dụng cụ quang thực tế

### 3.1. Mắt người

Cơ chế: thấu kính (gồm giác mạc + thủy tinh thể) → ảnh thật ngược lên võng mạc → thần kinh xử lý.

**Điều tiết**: thủy tinh thể có thể thay đổi độ cong → đổi f để nhìn rõ vật ở khoảng cách khác nhau.

**Tật khúc xạ**:
- **Cận thị (myopia)**: nhãn cầu quá dài hoặc thủy tinh thể quá cong → ảnh hội tụ TRƯỚC võng mạc → nhìn xa mờ. Chữa: **kính phân kỳ** (f < 0) để phân tán ánh sáng.
- **Viễn thị (hyperopia)**: ngược lại — ảnh hội tụ SAU võng mạc → nhìn gần mờ. Chữa: **kính hội tụ** (f > 0).

### 3.2. Máy ảnh

Thấu kính hội tụ → ảnh thật, ngược, nhỏ hơn vật lên cảm biến/phim. Điều chỉnh d_i bằng cách di chuyển thấu kính theo cảm biến để focus.

### 3.3. Kính hiển vi

2 thấu kính:
- **Vật kính** (objective): rất gần vật, f nhỏ, tạo ảnh thật phóng đại.
- **Thị kính** (eyepiece): hoạt động như kính lúp, phóng to ảnh từ vật kính.
- Tổng độ phóng = m_vật kính × m_thị kính. Có thể đạt 1000×.

### 3.4. Kính viễn vọng

Tương tự kính hiển vi nhưng cho vật rất xa.
- Vật kính có f LỚN (để thu ánh sáng nhiều và tạo ảnh nhỏ rõ).
- Thị kính f nhỏ (phóng to).
- Độ phóng = f_vật kính / f_thị kính.

### 📝 Tóm tắt mục 3

- Mắt = thấu kính tự điều tiết. Cận → phân kỳ, viễn → hội tụ.
- Máy ảnh: ảnh thật ngược trên cảm biến.
- Kính hiển vi / viễn vọng: 2 thấu kính ghép.

---

## 4. Bài tập

### Bài tập

**Bài 1**: Thấu kính hội tụ f = 20 cm. Vật cao 5 cm đặt ở d_o = 60 cm. Tính d_i, m, kích thước ảnh.

**Bài 2**: Vật ở d_o = 5 cm trước thấu kính lồi f = 8 cm. Tính d_i và m.

**Bài 3**: Kính lúp f = 5 cm. Vật ở d_o = 3 cm. Tính độ phóng đại.

**Bài 4**: Người bị cận thị nhìn xa nhất được 50 cm (không đeo kính). Tính f của kính cần đeo để nhìn xa (∞).

**Bài 5**: Kính viễn vọng có f_vật = 100 cm, f_thị = 5 cm. Tính độ phóng đại.

### Lời giải

**Bài 1**: 1/d_i = 1/20 − 1/60 = 3/60 − 1/60 = 2/60 → d_i = **30 cm** (sau thấu kính, ảnh thật). m = −30/60 = **−0.5** (ngược, nhỏ hơn 1/2). h_i = m·h_o = −0.5·5 = **−2.5 cm** (cao 2.5 cm, ngược).

**Bài 2**: 1/d_i = 1/8 − 1/5 = 5/40 − 8/40 = −3/40 → d_i = **−13.33 cm** (ảo, cùng phía vật). m = −(−13.33)/5 = **+2.67** (ảo, cùng chiều, lớn 2.67 lần).

**Bài 3**: 1/d_i = 1/5 − 1/3 = 3/15 − 5/15 = −2/15 → d_i = **−7.5 cm** (ảo). m = −(−7.5)/3 = **+2.5** (phóng đại 2.5×).

**Bài 4**: Cần kính phân kỳ làm vật ở ∞ "hiện ra" ở 50 cm. 1/(−50) = 1/f + 1/∞ → 1/f = −1/50 → **f = −50 cm** (phân kỳ).

**Bài 5**: M = f_vật / f_thị = 100/5 = **20×**.

---

## 5. Bài tiếp theo

[Lesson 03 — Quang sóng](../lesson-03-wave-optics/).

## 📝 Tổng kết

1. **Thấu kính lồi (hội tụ, f > 0)** vs **lõm (phân kỳ, f < 0)**.
2. **1/f = 1/d_o + 1/d_i**, m = −d_i/d_o.
3. **Ảnh thật d_i > 0** (chiếu màn) vs **ảnh ảo d_i < 0** (chỉ nhìn).
4. **Gương cầu**: 1/f = 1/d_o + 1/d_i, f = R/2.
5. **Ứng dụng**: mắt (cận đeo lõm, viễn đeo lồi), máy ảnh, hiển vi, viễn vọng.
`;
