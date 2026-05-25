# Lesson 06 — Chuyển động tròn

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **chuyển động tròn đều** và phân biệt **vận tốc dài v** với **vận tốc góc ω**.
- Hiểu **gia tốc hướng tâm**: vật đang đổi hướng → có gia tốc, dù tốc độ không đổi.
- Tính **lực hướng tâm F_c = m·v²/r**.
- Áp dụng cho quỹ đạo hành tinh và **3 định luật Kepler**.
- Hiểu vì sao vệ tinh không "rơi" mặc dù bị Trái Đất hút (rơi liên tục nhưng quỹ đạo cong theo bề mặt).

## Kiến thức tiền đề

- [Lesson 02 — 3 định luật Newton](../lesson-02-newton-laws/), [Lesson 03 — Các loại lực](../lesson-03-forces/) (lực hấp dẫn).

---

## 1. Chuyển động tròn đều

### 1.1. Định nghĩa

**Chuyển động tròn đều** = chuyển động trên đường tròn bán kính r với **tốc độ không đổi** |v| = const.

💡 **Lưu ý quan trọng**: tốc độ |v| không đổi nhưng **vector vận tốc v luôn thay đổi hướng**. Đó là chuyển động có **gia tốc** dù tốc độ không đổi!

**Vì sao có gia tốc?** Vì gia tốc = thay đổi của vận tốc (vector), không phải tốc độ (scalar). Khi vật đi vòng tròn, hướng v liên tục đổi → Δv ≠ 0 → a ≠ 0.

### 1.2. Vận tốc dài v vs vận tốc góc ω

- **Vận tốc dài v** (m/s): tốc độ thật của vật trên quỹ đạo, dọc theo cung tròn.
- **Vận tốc góc ω** (rad/s): tốc độ quét góc khi vật đi quanh tâm.

Liên hệ:
```
v = ω · r
```

💡 **Ví dụ**: 2 vật trên bánh xe quay đều — vật ở mép xe (r lớn) đi nhanh hơn vật gần tâm (r nhỏ) dù cả 2 có cùng ω. Đó là tại sao mép đĩa quay nhanh hơn vùng trung tâm.

### 1.3. Chu kỳ và tần số

- **Chu kỳ T** (s): thời gian đi hết 1 vòng. ω = 2π/T.
- **Tần số f** (Hz, Hertz): số vòng/giây. f = 1/T. ω = 2π·f.

### 1.4. Bốn ví dụ con số

**Ví dụ 1 — Trái Đất quay quanh Mặt Trời**: T = 365.25 ngày ≈ 3.16 × 10⁷ s. ω = 2π/T ≈ 2 × 10⁻⁷ rad/s. r = 1.5 × 10¹¹ m. v = ω·r ≈ **30,000 m/s** = 30 km/s. (Bạn đang chạy với tốc độ này mà không cảm thấy gì!)

**Ví dụ 2 — Bánh xe đạp**: bán kính r = 0.3 m, xe chạy 5 m/s. ω = v/r = 5/0.3 ≈ **16.7 rad/s** = 2.65 vòng/giây.

**Ví dụ 3 — Trái Đất tự quay quanh trục**: T = 24 giờ = 86400 s. ω = 7.27 × 10⁻⁵ rad/s. Ở xích đạo r = 6371 km → v = ω·r ≈ **463 m/s** = 1667 km/h.

**Ví dụ 4 — Trạm vũ trụ ISS**: T = 92 phút = 5520 s. Quỹ đạo cách Trái Đất 400 km, r_quỹ_đạo = 6771 km. v = 2π·r/T ≈ **7,700 m/s**.

### 📝 Tóm tắt mục 1

- Chuyển động tròn đều: |v| hằng, nhưng vector v đổi hướng → có gia tốc.
- v = ω·r. ω = 2π/T = 2πf.

---

## 2. Gia tốc hướng tâm

### 2.1. Định nghĩa

**Gia tốc hướng tâm a_c** = gia tốc của vật chuyển động tròn đều, luôn hướng **về tâm vòng tròn**:

```
a_c = v² / r = ω² · r
```

💡 **Ý nghĩa**: dù tốc độ không đổi, vận tốc vẫn đổi hướng → có gia tốc. Gia tốc này không "tăng tốc" mà "đổi hướng" — nó luôn chỉ về tâm để liên tục bẻ lái đường đi thành đường tròn.

**Chứng minh trực giác** (vì sao a_c = v²/r):

Xét vật đi qua 2 điểm cách nhau góc Δθ rất nhỏ. Vận tốc đổi từ v₁ (hướng theo tiếp tuyến tại 1) sang v₂ (tiếp tuyến tại 2). Cùng độ lớn |v|, nhưng góc giữa v₁ và v₂ = Δθ.

|Δv| = |v|·Δθ (tam giác đồng dạng).

Δθ = v·Δt/r (vì cung = bán kính × góc).

→ Δv = v · (v·Δt/r) → a = Δv/Δt = **v²/r**.

### 2.2. Ba ví dụ trực giác

**Ví dụ 1 — Xe chạy vào cua**: Xe v = 20 m/s, vào cua bán kính 50 m. a_c = 400/50 = **8 m/s²**. Bạn cảm thấy "bị ép" về phía ngoài cua — đó là quán tính, không phải "lực ly tâm" thật (xem §3).

**Ví dụ 2 — Trạm ISS quay quanh Trái Đất**: a_c = v²/r = 7700²/(6.77×10⁶) ≈ **8.76 m/s²**. Chính bằng g ở độ cao đó! Đó là tại sao phi hành gia trên ISS "không trọng lực" — họ thật ra **đang rơi tự do liên tục**, chỉ có điều quỹ đạo cong theo bề mặt Trái Đất nên không bao giờ "tiếp đất".

**Ví dụ 3 — Đu dây thừng vòng tròn**: Bạn cầm 1 vật buộc dây, quay tròn nhanh. Vật có a_c hướng vào tay. Sức căng dây = lực hướng tâm.

### 📝 Tóm tắt mục 2

- a_c = v²/r = ω²·r, luôn hướng vào tâm.
- |v| không đổi nhưng vector v đổi → có gia tốc.
- Chuyển động tròn đều = "rơi" liên tục về tâm với gia tốc a_c.

---

## 3. Lực hướng tâm

### 3.1. Định nghĩa

**Lực hướng tâm F_c** = **tổng lực** tác dụng lên vật chuyển động tròn, hướng về tâm:

```
F_c = m · a_c = m · v² / r
```

💡 **Ý nghĩa quan trọng**: "lực hướng tâm" KHÔNG phải một loại lực mới. Đây là **tên gọi** cho tổng các lực thực (trọng lực, dây căng, ma sát...) hướng về tâm trong chuyển động tròn.

**Ví dụ về nguồn gốc lực hướng tâm**:
- Vệ tinh quay quanh Trái Đất: F_c = lực hấp dẫn.
- Ô tô vào cua: F_c = ma sát giữa lốp và đường.
- Vật buộc dây quay tròn: F_c = sức căng dây.
- Electron quay quanh hạt nhân (mô hình Bohr): F_c = lực Coulomb.

### 3.2. ⚠ "Lực ly tâm" — chỉ là cảm nhận

Khi bạn ngồi trong ô tô vào cua, bạn cảm thấy **bị đẩy ra ngoài**. Cảm giác này gọi là "lực ly tâm". Nhưng thật ra **không có lực thật nào đẩy bạn ra ngoài** — bạn chỉ cảm thấy quán tính (định luật I): thân bạn "muốn" đi thẳng theo phương vận tốc cũ, trong khi xe đang bẻ lái về phía tâm cua.

→ "Lực ly tâm" chỉ tồn tại trong **hệ quy chiếu quay** (quay theo vật). Trong hệ quy chiếu quán tính (đứng yên), không có lực nào đẩy ra ngoài.

### 3.3. Walk-through — Vệ tinh quay quanh Trái Đất

Tính vận tốc vệ tinh để duy trì quỹ đạo bán kính r quanh Trái Đất.

**Điều kiện**: lực hấp dẫn = lực hướng tâm:
```
G · M_T · m / r² = m · v² / r
```

→ **v = √(G·M_T/r)**.

**Tính cho ISS** (r = 6371 + 400 km = 6.77 × 10⁶ m):
- v = √(6.674×10⁻¹¹ × 5.97×10²⁴ / 6.77×10⁶) = √(5.88×10⁷) ≈ **7,670 m/s** = 27,600 km/h. ✓

→ Để bay vũ trụ, tên lửa phải đạt **tốc độ vũ trụ cấp 1** ≈ 7.9 km/s. Dưới đó không đủ để "rơi vòng quanh" Trái Đất.

### 📝 Tóm tắt mục 3

- F_c = m·v²/r. KHÔNG phải lực mới, mà là tên gọi cho tổng lực hướng tâm.
- Nguồn gốc: hấp dẫn (vệ tinh), ma sát (cua xe), căng dây (quay vật).
- "Lực ly tâm" chỉ là cảm nhận quán tính, không phải lực thật.

---

## 4. Quỹ đạo hành tinh và 3 định luật Kepler

### 4.1. Ba định luật Kepler (1609-1619)

Trước Newton, Kepler đã mô tả quỹ đạo hành tinh quan sát được từ Tycho Brahe:

**Định luật I — Quỹ đạo ellipse**: Mọi hành tinh quay quanh Mặt Trời theo quỹ đạo **ellipse**, với Mặt Trời ở **1 trong 2 tiêu điểm**.

(Không phải vòng tròn hoàn hảo — đa số gần tròn nhưng vẫn ellipse.)

**Định luật II — Diện tích quét**: Vector từ Mặt Trời đến hành tinh **quét diện tích bằng nhau trong khoảng thời gian bằng nhau**.

→ Hành tinh đi **nhanh hơn khi gần Mặt Trời**, chậm hơn khi xa. Đây là biểu hiện của **bảo toàn momen động lượng**.

**Định luật III — Chu kỳ và khoảng cách**: T² ∝ r³ (với r = bán trục lớn của ellipse).
```
T² / r³ = const (cho mọi hành tinh quanh cùng 1 sao)
```

### 4.2. Suy ra Kepler III từ Newton

Cho hành tinh m quay tròn (xấp xỉ ellipse) quanh Mặt Trời M:
- Lực hấp dẫn = lực hướng tâm: GMm/r² = m·v²/r → v² = GM/r.
- T = 2πr/v → T² = 4π²·r²/v² = 4π²·r²·r/GM = 4π²·r³/(GM).

→ **T² / r³ = 4π² / (GM) = const**. Khớp Kepler III. Đây là **chiến thắng vĩ đại** của Newton — chứng minh được rằng cả các định luật Kepler (về thiên thể) và định luật rơi tự do (trên Trái Đất) đều là **cùng một quy luật vạn vật hấp dẫn**.

### 4.3. Số liệu Hệ Mặt Trời

| Hành tinh | r (AU) | T (năm) | T²/r³ (xấp xỉ) |
|-----------|--------|---------|------------------|
| Sao Thủy | 0.39 | 0.24 | 0.97 |
| Sao Kim | 0.72 | 0.62 | 1.04 |
| Trái Đất | 1.00 | 1.00 | 1.00 |
| Sao Hỏa | 1.52 | 1.88 | 1.00 |
| Sao Mộc | 5.20 | 11.86 | 1.00 |
| Sao Thổ | 9.54 | 29.46 | 1.00 |

(1 AU = 1.496 × 10¹¹ m = khoảng cách Trái Đất - Mặt Trời.)

→ T²/r³ ≈ 1 cho mọi hành tinh — Kepler III được xác nhận.

### 📝 Tóm tắt mục 4

- Kepler I: quỹ đạo ellipse.
- Kepler II: diện tích quét đều → tốc độ tăng khi gần.
- Kepler III: T² ∝ r³.
- Newton chứng minh: tất cả là hệ quả của F = GMm/r².

---

## 5. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Một vật trên đường ray quay tròn bán kính 2 m với chu kỳ 4 s. Tính v và ω.

**Bài 2**: Bánh xe đạp bán kính 0.35 m quay 100 vòng/phút. Tính tốc độ xe và vận tốc dài tại mép bánh.

**Bài 3**: Ô tô 1500 kg vào cua bán kính 80 m với v = 15 m/s. Tính lực ma sát cần thiết để xe không trượt ra ngoài.

**Bài 4**: Tính chu kỳ một vệ tinh ở độ cao 35,786 km (quỹ đạo địa tĩnh, GEO). M_T = 5.97 × 10²⁴ kg, R_T = 6371 km.

**Bài 5**: Sao Mộc cách Mặt Trời 5.20 AU. Dùng Kepler III, tính chu kỳ quỹ đạo.

**Bài 6**: Vì sao phi hành gia trên ISS trông như "không trọng lực" dù vẫn ở trong trường hấp dẫn của Trái Đất?

### Lời giải

**Bài 1**: ω = 2π/T = π/2 rad/s ≈ **1.57 rad/s**. v = ω·r = 1.57·2 = **3.14 m/s**.

**Bài 2**: ω = 100 vòng/phút = 100·2π/60 ≈ 10.47 rad/s. v = ω·r = 10.47·0.35 ≈ **3.66 m/s** = 13.2 km/h.

**Bài 3**: F_c = m·v²/r = 1500·225/80 = **4,219 N**. Đây là lực ma sát ngang giữa lốp và đường cần để giữ xe trên cua. Nếu ma sát không đủ → xe trượt.

**Bài 4**: r = 6371 + 35786 = 42,157 km = 4.22 × 10⁷ m. v = √(GM/r) = √(6.674×10⁻¹¹·5.97×10²⁴/4.22×10⁷) ≈ 3,074 m/s. T = 2π·r/v = 2π·4.22×10⁷/3074 ≈ 86,200 s ≈ **23.94 giờ ≈ 1 ngày**. (Quỹ đạo địa tĩnh: vệ tinh giữ nguyên vị trí phía trên 1 điểm trên Trái Đất.)

**Bài 5**: T² = r³ → T = r^(3/2) = 5.20^(1.5) ≈ **11.86 năm**. ✓ (Khớp dữ liệu thật.)

**Bài 6**: Phi hành gia + ISS đều đang **rơi tự do** dưới lực hấp dẫn của Trái Đất. ISS đang "rơi vòng" liên tục — quỹ đạo tròn của nó chính là sự kết hợp giữa rơi tự do (hướng tâm Trái Đất) và vận tốc ngang (tiếp tuyến). 

Trong khung quay theo ISS, mọi vật bên trong (kể cả phi hành gia) đều rơi với cùng gia tốc → không có lực đẩy giữa người và sàn → cảm giác "không trọng lượng" (apparent weightlessness). 

Đây KHÔNG phải "ngoài không gian không có hấp dẫn" — ở độ cao ISS (400 km), g vẫn ≈ 8.76 m/s² (chỉ giảm 10% so với mặt đất). Cảm giác không trọng lực là do **rơi tự do**.

---

## 6. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 07 — Vật rắn](../lesson-07-rigid-body/) — momen lực, momen quán tính.

---

## 📝 Tổng kết Lesson 06

1. **Chuyển động tròn đều**: |v| hằng, hướng đổi → có gia tốc.
2. **v = ω·r**, ω = 2π/T.
3. **Gia tốc hướng tâm a_c = v²/r = ω²·r**, luôn hướng tâm.
4. **Lực hướng tâm F_c = m·v²/r** — KHÔNG phải lực mới, chỉ là tổng lực hướng tâm.
5. **"Lực ly tâm"** không tồn tại trong hệ quy chiếu quán tính — chỉ là cảm nhận quán tính.
6. **3 định luật Kepler**: ellipse, diện tích đều, T² ∝ r³. Newton chứng minh đều từ F = GMm/r².
7. **Vệ tinh ở quỹ đạo**: v = √(GM/r). Tốc độ vũ trụ cấp 1 ≈ 7.9 km/s.

**Tiếp theo**: [Lesson 07 — Vật rắn](../lesson-07-rigid-body/)
