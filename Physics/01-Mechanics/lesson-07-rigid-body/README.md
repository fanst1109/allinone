# Lesson 07 — Vật rắn (Rigid Body)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt **chất điểm** (vật không có kích thước) và **vật rắn** (có hình dạng, có thể quay).
- Hiểu **momen lực (torque) τ = r × F = r·F·sinθ** — đo "khả năng làm quay" của một lực.
- Hiểu **momen quán tính I** — vai trò của "khối lượng" trong chuyển động quay.
- Áp dụng **định luật II cho quay**: τ = I·α.
- Tính cân bằng vật rắn (tổng F = 0, tổng τ = 0).

## Kiến thức tiền đề

- [Lesson 02 — 3 định luật Newton](../lesson-02-newton-laws/) — F = m·a cho chất điểm.

---

## 1. Vật rắn và chuyển động quay

### 1.1. Định nghĩa

**Chất điểm**: vật được coi là 1 điểm không có kích thước, chỉ có chuyển động tịnh tiến (translation).

**Vật rắn (rigid body)**: vật có kích thước, hình dạng cố định (không biến dạng). Có thể chuyển động **tịnh tiến + quay**.

💡 **Vì sao cần khái niệm vật rắn?** Vì trong nhiều tình huống thực tế:
- Cánh cửa quay quanh bản lề — không thể coi là chất điểm.
- Bánh xe lăn — đồng thời tịnh tiến và quay.
- Cần cẩu nâng vật — cần phân tích moment.

Chất điểm là **xấp xỉ tốt** khi kích thước vật nhỏ so với quãng đường, và không có chuyển động quay. Vật rắn cần khi quan tâm tới quay.

### 📝 Tóm tắt mục 1

- Chất điểm: 1 điểm, chỉ tịnh tiến.
- Vật rắn: có kích thước, tịnh tiến + quay.

---

## 2. Momen lực (Torque)

### 2.1. Định nghĩa

**Momen lực τ** = tích lực × cánh tay đòn (khoảng cách vuông góc từ điểm tựa đến đường lực):

```
τ = r · F · sin(θ)
```

trong đó:
- **r** = khoảng cách từ điểm tựa (trục quay) đến điểm đặt lực.
- **F** = độ lớn lực.
- **θ** = góc giữa r và F.

Đơn vị: **N·m** (Newton-mét).

💡 **Ý nghĩa cốt lõi**: torque đo "khả năng làm quay" của một lực. Cùng lực F, nhưng:
- **r lớn** → torque lớn (vd vặn ốc bằng tua-vít dài dễ hơn dùng ngón tay).
- **θ = 90°** → torque cực đại (lực vuông góc với cánh tay đòn). θ = 0° → torque = 0 (lực dọc theo cánh tay đòn không gây quay).

**Vì sao cần khái niệm này?** Vì khi vật có kích thước, lực không chỉ "đẩy" (gây gia tốc tịnh tiến) mà còn có thể "vặn" (gây gia tốc góc). F không đủ để mô tả — phải biết F áp dụng **ở đâu** trên vật.

### 2.2. Cánh tay đòn (lever arm)

Nhiều khi dễ hơn để dùng khái niệm **cánh tay đòn d = r·sinθ** = khoảng cách vuông góc từ trục đến đường lực. Khi đó:
```
τ = F · d
```

💡 **Hình dung**: vẽ đường thẳng kéo dài theo lực, đo khoảng cách vuông góc từ trục đến đường đó — đó là d.

### 2.3. Bốn ví dụ trực giác

**Ví dụ 1 — Vặn ốc**: Bạn cần vặn 1 ốc bằng cờ-lê. Cờ-lê dài 0.3 m, bạn tác dụng lực 50 N vuông góc với cờ-lê.
- τ = 0.3 × 50 × sin(90°) = **15 N·m**.

**Ví dụ 2 — Đẩy cửa**: Cửa rộng 1 m, lực đẩy 20 N.
- Đẩy ở mép cửa (r = 1 m): τ = 1 × 20 = **20 N·m** (mở dễ).
- Đẩy ở giữa cửa (r = 0.5 m): τ = 10 N·m (mở khó hơn).
- Đẩy ở bản lề (r = 0): τ = 0 (không quay được!).

**Ví dụ 3 — Tay cầm phanh xe đạp**: Cần tạo torque lớn để phanh xe nhưng tay không có nhiều lực. Giải pháp: tay cầm phanh dài (r lớn) → lực nhỏ vẫn đủ torque.

**Ví dụ 4 — Cánh tay đòn nhân vật**: Khi xách vali, vali kéo tay xuống. Bạn dùng cơ ngực và lưng (gắn cao trên cánh tay, r nhỏ) để chống lại. Vì r tay nhỏ → cơ phải tạo F rất lớn → mệt.

### 📝 Tóm tắt mục 2

- τ = r·F·sin(θ), đơn vị N·m.
- Cánh tay đòn d = r·sin(θ). τ = F·d.
- F dọc theo cánh tay đòn (θ = 0) → τ = 0, không quay.

---

## 3. Momen quán tính (Moment of Inertia)

### 3.1. Định nghĩa

**Momen quán tính I** = "khối lượng tương đương" cho chuyển động quay. Đại lượng đo **khó-dễ làm vật bắt đầu quay** (hoặc dừng quay):

```
I = Σᵢ mᵢ · rᵢ²
```

trong đó **rᵢ** = khoảng cách từ phần tử khối lượng mᵢ đến trục quay.

Đơn vị: **kg·m²**.

💡 **Ý nghĩa**: I phụ thuộc **cả khối lượng VÀ cách phân bố khối lượng** so với trục. Cùng khối lượng m, nhưng:
- Khối lượng tập trung gần trục → I nhỏ → dễ quay.
- Khối lượng phân tán xa trục → I lớn → khó quay.

**Vì sao tỉ lệ với r²?** Vì mỗi phần tử khối lượng nhỏ dm quay với v = ω·r → KE = (1/2)·dm·(ω·r)² = (1/2)·ω²·(dm·r²). Tổng KE quay = (1/2)·ω²·I, với I = ∫r² dm.

### 3.2. Bảng momen quán tính các hình thường gặp

| Hình | I (quanh trục đối xứng qua tâm) |
|------|--------------------------------|
| Vòng tròn / vỏ trụ rỗng (m, r) | **m·r²** |
| Đĩa / đặc / trụ đặc | **(1/2)·m·r²** |
| Cầu rỗng (vỏ cầu) | **(2/3)·m·r²** |
| Cầu đặc | **(2/5)·m·r²** |
| Thanh dài (qua tâm, ⊥ thanh) | **(1/12)·m·L²** |
| Thanh dài (qua 1 đầu, ⊥ thanh) | **(1/3)·m·L²** |

### 3.3. Ví dụ trực giác — Vận động viên trượt băng

Khi vận động viên trượt băng kéo tay vào → I giảm → ω tăng (xoay nhanh hơn). Khi duỗi tay ra → I tăng → ω giảm.

Lý do: **momen động lượng L = I·ω được bảo toàn** (không có ngoại lực momen). Khi I giảm, ω phải tăng để giữ L cố định.

### 📝 Tóm tắt mục 3

- I đo "khó-dễ làm vật quay", tương tự m trong tịnh tiến.
- I = Σ m·r². Phân bố xa trục → I lớn.
- KE quay = (1/2)·I·ω². L = I·ω (momen động lượng).

---

## 4. Định luật II cho quay

### 4.1. Phát biểu

Tương tự F = m·a cho tịnh tiến, đối với quay:

```
τ = I · α
```

trong đó **α** = gia tốc góc (rad/s²) = dω/dt.

💡 **Ý nghĩa**: tổng momen lực tác dụng = momen quán tính × gia tốc góc. Đây là **đối ngẫu chính xác** giữa quay và tịnh tiến:

| Tịnh tiến | Quay |
|-----------|------|
| Vị trí x | Góc θ |
| Vận tốc v | Vận tốc góc ω |
| Gia tốc a | Gia tốc góc α |
| Lực F | Momen τ |
| Khối lượng m | Momen quán tính I |
| F = m·a | τ = I·α |
| KE = (1/2)m·v² | KE_quay = (1/2)I·ω² |
| Động lượng p = m·v | Momen động lượng L = I·ω |

### 4.2. Walk-through — Yo-yo rơi

Yo-yo khối lượng m, bán kính r (đĩa tròn). Tính gia tốc tịnh tiến khi rơi.

**Phân tích**:
- 2 lực: trọng lực m·g (xuống), lực căng dây T (lên).
- Tịnh tiến: m·g − T = m·a.
- Quay: T·r = I·α (dây kéo torque vào yo-yo).
- Lăn không trượt: a = α·r → α = a/r.
- I của đĩa = (1/2)·m·r².

Thay vào: T·r = (1/2)·m·r²·(a/r) → T = (1/2)·m·a.

Tịnh tiến: m·g − (1/2)·m·a = m·a → g = (3/2)·a → **a = (2/3)·g ≈ 6.53 m/s²**.

→ Yo-yo rơi **chậm hơn** rơi tự do (g = 9.8 m/s²) vì một phần năng lượng "đi vào" quay thay vì tịnh tiến.

### 📝 Tóm tắt mục 4

- τ = I·α (đối ngẫu của F = m·a).
- Bảng đối ngẫu giữa tịnh tiến và quay.

---

## 5. Cân bằng vật rắn

### 5.1. Điều kiện cân bằng

Vật rắn ở **cân bằng tĩnh** (không tịnh tiến, không quay) khi:

```
Σ F = 0       (tổng các lực = 0)
Σ τ = 0       (tổng các momen quanh BẤT KỲ điểm nào = 0)
```

💡 **Vì sao cần 2 điều kiện?** Vì:
- ΣF = 0 đảm bảo không tịnh tiến (định luật I).
- Στ = 0 đảm bảo không quay.
- Có thể có ΣF = 0 nhưng Στ ≠ 0 (vd 2 lực bằng và ngược ở 2 đầu thanh — tạo "ngẫu lực", thanh quay).

### 5.2. Walk-through — Đòn bẩy

Cân thăng bằng (đòn bẩy) có người 60 kg ngồi cách điểm tựa 1.5 m. Người ở phía bên kia ngồi cách điểm tựa bao xa để cân bằng?

Cho người thứ hai 40 kg.

**Cân bằng momen** quanh điểm tựa:
- Momen người 1 (xuống, tạo quay ngược chiều kim đồng hồ): τ₁ = 60·g·1.5.
- Momen người 2 (xuống, tạo quay cùng chiều): τ₂ = 40·g·d.
- Cân bằng: τ₁ = τ₂ → 60·1.5 = 40·d → **d = 2.25 m**.

→ Người nhẹ hơn phải ngồi xa điểm tựa hơn.

### 📝 Tóm tắt mục 5

- Cân bằng tĩnh: ΣF = 0 VÀ Στ = 0.
- Bài đòn bẩy: cân bằng momen → vật nhẹ phải xa hơn.

---

## 6. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Tính momen lực khi đẩy cánh cửa với F = 30 N, vuông góc với cửa, tại điểm cách bản lề 0.8 m.

**Bài 2**: Bánh xe (đĩa đặc) m = 5 kg, r = 0.3 m quay với ω = 20 rad/s. Tính KE quay và momen động lượng.

**Bài 3**: Cờ-lê dài 0.4 m, vặn ốc với F = 100 N nhưng góc 60° (không vuông góc). Tính τ.

**Bài 4**: Yo-yo dạng đĩa rơi với gia tốc 6.53 m/s². Sau 1 giây rơi, vận tốc bao nhiêu? Quãng đường?

**Bài 5**: Đòn bẩy: trẻ em 30 kg ngồi cách điểm tựa 2 m. Người lớn 70 kg ngồi cách bao nhiêu để cân bằng?

**Bài 6**: Vì sao vận động viên nhảy múa hay trượt băng kéo tay vào để xoay nhanh hơn?

### Lời giải

**Bài 1**: τ = r·F·sin(90°) = 0.8 × 30 × 1 = **24 N·m**.

**Bài 2**:
- I = (1/2)·m·r² = 0.5·5·0.09 = 0.225 kg·m².
- KE_quay = (1/2)·I·ω² = 0.5·0.225·400 = **45 J**.
- L = I·ω = 0.225·20 = **4.5 kg·m²/s**.

**Bài 3**: τ = 0.4 × 100 × sin(60°) = 0.4 × 100 × 0.866 = **34.6 N·m**.

**Bài 4**: a = 6.53 m/s², khởi đầu v₀ = 0.
- v = a·t = 6.53 m/s.
- d = (1/2)·a·t² = 0.5·6.53·1 = **3.27 m**.

**Bài 5**: Cân bằng momen: 30·2 = 70·d → d = 60/70 ≈ **0.857 m**.

**Bài 6**: Khi kéo tay vào → khối lượng tay (m) lại gần trục quay (r giảm) → **I giảm** (vì I ∝ r²). Momen động lượng L = I·ω được bảo toàn (không có momen lực ngoại). I giảm → ω phải tăng để giữ L = const → quay nhanh hơn. Đó là một ứng dụng đẹp của bảo toàn L.

---

## 7. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 08 — Dao động & Sóng cơ](../lesson-08-oscillation-waves/) — dao động điều hòa, con lắc, sóng.

---

## 📝 Tổng kết Lesson 07

1. **Vật rắn**: có kích thước, có thể quay (ngược chất điểm).
2. **Momen lực τ = r·F·sinθ** (N·m) — đo khả năng làm quay.
3. **Momen quán tính I = Σ m·r²** (kg·m²) — "khối lượng" cho quay.
4. **τ = I·α** (định luật II cho quay).
5. **Bảng đối ngẫu** tịnh tiến ↔ quay (x↔θ, v↔ω, F↔τ, m↔I).
6. **Cân bằng tĩnh**: ΣF = 0 VÀ Στ = 0.
7. **Bảo toàn L** = I·ω → kéo tay vào → ω tăng (trượt băng).

**Tiếp theo**: [Lesson 08 — Dao động & Sóng cơ](../lesson-08-oscillation-waves/)
