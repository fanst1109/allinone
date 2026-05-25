# Lesson 02 — Cấu hình electron & bảng tuần hoàn

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu electron tổ chức quanh hạt nhân theo **lớp (shell)** và **phân lớp (orbital s/p/d/f)** — không phải "quay quanh tự do".
- Nắm 3 quy tắc xếp electron: **Aufbau** (xây từ năng lượng thấp lên cao), **Pauli** (max 2 e/orbital, đối spin), **Hund** (mỗi orbital con 1 e trước khi ghép cặp).
- Viết được **cấu hình electron** đầy đủ và rút gọn (`[Ar] 3d⁶ 4s²`) cho mọi nguyên tố Z = 1..36.
- Đọc được **bảng tuần hoàn**: vì sao có 7 chu kỳ, 18 nhóm, và sao chia thành khối s, p, d, f.
- Phân tích 4 **xu hướng tuần hoàn**: bán kính nguyên tử, năng lượng ion hóa, độ âm điện, ái lực electron — biết khi nào tăng/giảm và lý do.
- Liên hệ cấu hình electron với tính chất hóa học (vì sao Na phản ứng mạnh, Ar trơ).

## Kiến thức tiền đề

- [Lesson 01 — Cấu trúc nguyên tử](../lesson-01-atom-structure/) — biết về proton, neutron, electron.
- Khái niệm số nguyên dương (n = 1, 2, 3, ...).

---

## 1. Mức năng lượng và lớp electron

### 💡 Trực giác / Hình dung

Hãy hình dung **tòa nhà chung cư có nhiều tầng**:

- Tầng 1 (gần mặt đất): nhỏ, chỉ có 2 phòng.
- Tầng 2: lớn hơn, có 8 phòng.
- Tầng 3: lớn hơn nữa, có 18 phòng.
- ...

Mỗi electron là một cư dân. Cư dân **phải chọn tầng có sẵn**, không thể ở "giữa hai tầng". Tầng càng cao = năng lượng càng lớn. Quy tắc: cư dân thích ở tầng thấp (năng lượng tối thiểu).

Đây chính là mô hình **lượng tử hóa năng lượng** (energy quantization) — electron chỉ tồn tại ở các **mức năng lượng rời rạc**, không liên tục. Bohr (1913) là người đầu tiên đề xuất ý tưởng này; cơ học lượng tử (1926) công thức hóa nó chính xác.

### 1.1. Số lượng tử chính `n`

**Số lượng tử chính `n` = 1, 2, 3, 4, 5, 6, 7** — gán nhãn các lớp electron, còn gọi theo chữ cái: **K, L, M, N, O, P, Q**.

| n | Tên lớp | Số electron tối đa (= 2n²) |
|---|---------|----------------------------|
| 1 | K | 2 |
| 2 | L | 8 |
| 3 | M | 18 |
| 4 | N | 32 |
| 5 | O | 50 (lý thuyết) |
| 6 | P | 72 (lý thuyết) |
| 7 | Q | 98 (lý thuyết) |

Công thức **2n²** xuất phát từ cấu trúc phân lớp + Pauli (sẽ thấy ở §2).

### 1.2. Bốn ví dụ cụ thể

**Ví dụ 1 — Hydrogen (Z = 1):** 1 electron, ở lớp K (n = 1).

**Ví dụ 2 — Neon (Z = 10):** 10 electron, phân bố K = 2, L = 8 (đầy 2 lớp đầu).

**Ví dụ 3 — Argon (Z = 18):** 18 electron, phân bố K = 2, L = 8, M = 8 (lưu ý: M chưa đầy 18, mới có 8).

**Ví dụ 4 — Krypton (Z = 36):** 36 electron, phân bố K = 2, L = 8, M = 18, N = 8.

Để hiểu được "vì sao Argon dừng ở 8 electron ở lớp M chứ không phải 18", phải sang phân lớp.

### ⚠ Lỗi thường gặp

- **Nghĩ "lớp M đầy với 8 electron"**: chỉ với Ar mới dừng ở 8 cho lớp M. Sau đó electron tiếp tục điền vào M (từ Z = 21 trở đi, ở phân lớp 3d) đến tối đa 18. Lớp đầy tối đa = 2n².
- **Nhầm n với số nguyên tử Z**: n là số lượng tử của một lớp (1, 2, 3, ...); Z là số proton của nguyên tử. Không liên quan trực tiếp.

### 📝 Tóm tắt mục 1

- Electron tồn tại ở **mức năng lượng rời rạc**, không liên tục.
- Lớp electron đánh số n = 1, 2, 3, ... (K, L, M, N, ...).
- Tối đa: lớp n chứa **2n²** electron.

---

## 2. Orbital và phân lớp s, p, d, f

Mỗi lớp electron không phải một "phòng lớn" mà chia thành **phân lớp (subshell)**, gọi tên là **s, p, d, f**. Mỗi phân lớp lại chia thành các **orbital** — đây là vùng không gian 3D nơi xác suất tìm thấy electron là cao nhất.

### 💡 Trực giác / Hình dung

Mở rộng analogy chung cư:
- Lớp = tầng.
- Phân lớp = "loại căn hộ" trong tầng (studio, 1-bedroom, 2-bedroom...).
- Orbital = một căn hộ cụ thể.
- Electron = cư dân.

Mỗi orbital chứa **tối đa 2 electron** (quy tắc Pauli). Hai electron trong cùng orbital phải có **spin ngược nhau** (↑ và ↓).

### 2.1. Bảng phân lớp

| Phân lớp | Số orbital | Số electron tối đa | Hình dạng |
|----------|------------|---------------------|-----------|
| **s** | 1 | 2 | Hình cầu |
| **p** | 3 (`p_x, p_y, p_z`) | 6 | Hình quả tạ (dumbbell) theo 3 trục x, y, z |
| **d** | 5 | 10 | Phức tạp (4 quả tạ chéo + 1 vòng) |
| **f** | 7 | 14 | Rất phức tạp |

### 2.2. Lớp nào chứa phân lớp nào?

Quy tắc: **lớp n chứa các phân lớp `s, p, d, ...` đến hết phân lớp thứ n.**

| Lớp (n) | Phân lớp có | Tổng orbital | Tổng e (2n²) |
|---------|-------------|---------------|---------------|
| 1 (K) | 1s | 1 | 2 |
| 2 (L) | 2s, 2p | 1 + 3 = 4 | 8 |
| 3 (M) | 3s, 3p, 3d | 1 + 3 + 5 = 9 | 18 |
| 4 (N) | 4s, 4p, 4d, 4f | 1 + 3 + 5 + 7 = 16 | 32 |

Kiểm tra công thức 2n² (verify cả 2 vế):
- n = 1: 1 phân lớp × 1 orbital × 2 e/orbital = **2** ✓ (= 2·1²)
- n = 2: (1 + 3) × 2 = **8** ✓ (= 2·2²)
- n = 3: (1 + 3 + 5) × 2 = 9 × 2 = **18** ✓ (= 2·3²)
- n = 4: (1 + 3 + 5 + 7) × 2 = 16 × 2 = **32** ✓ (= 2·4²)

### 2.3. Ký hiệu cấu hình electron

Ký hiệu chuẩn: **`nl^x`** với:
- `n` = số lớp (1, 2, 3, ...)
- `l` = phân lớp (s, p, d, f)
- `x` = số electron trong phân lớp đó (mũ phía trên)

**Ví dụ ký hiệu:**
- `1s²` = lớp 1, phân lớp s, có 2 electron.
- `2p⁶` = lớp 2, phân lớp p, có 6 electron (đầy).
- `3d¹⁰` = lớp 3, phân lớp d, có 10 electron (đầy).

### ⚠ Lỗi thường gặp

- **Nghĩ phân lớp d xuất hiện ở mọi lớp**: SAI. Phân lớp d chỉ có từ lớp 3 trở lên. Lớp 1 chỉ có s, lớp 2 chỉ có s và p.
- **Coi `s, p, d, f` là số**: đây là **tên** của phân lớp (xuất phát lịch sử từ phổ quang: sharp, principal, diffuse, fundamental). Không phải biến số.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao chỉ có 4 phân lớp s, p, d, f?**
A: Vì các nguyên tố đã biết (Z ≤ 118) chưa cần phân lớp thứ 5 (gọi là g). Lý thuyết cho phép, nhưng nguyên tố nào có electron ở g chưa được tổng hợp.

**Q: Tại sao d chỉ có 5 orbital chứ không phải 4 hay 6?**
A: Lý do toán học. Số orbital trong phân lớp l = 2l + 1, với l là số lượng tử thứ hai (l = 0 cho s, 1 cho p, 2 cho d, 3 cho f). Vậy d → l = 2 → 2·2 + 1 = 5 orbital.

### 🔁 Dừng lại tự kiểm tra

1. Lớp 3 có bao nhiêu orbital? Bao nhiêu electron tối đa?
2. Tại sao `2d` không tồn tại?

<details>
<summary>Đáp án</summary>

1. Lớp 3 có 3s + 3p + 3d = 1 + 3 + 5 = **9 orbital**. Tối đa **18 electron**.
2. Vì n = 2 chỉ chứa được phân lớp đến l = 1 (tức p). Phân lớp d cần l = 2, đòi n ≥ 3.
</details>

### 📝 Tóm tắt mục 2

- Phân lớp s/p/d/f có 1/3/5/7 orbital, tối đa 2/6/10/14 electron.
- Lớp n chứa các phân lớp đến hết l = n − 1.
- Ký hiệu: `nl^x`.

---

## 3. Ba quy tắc xếp electron

### 3.1. Quy tắc Aufbau — xây từ thấp lên cao

**"Aufbau" tiếng Đức = "xây dựng"**. Quy tắc: electron điền vào các phân lớp theo **thứ tự năng lượng tăng dần**.

Thứ tự năng lượng (lưu ý: KHÔNG phải theo n tăng đơn thuần):

```
1s < 2s < 2p < 3s < 3p < 4s < 3d < 4p < 5s < 4d < 5p < 6s < 4f < 5d < 6p < 7s < 5f < 6d
```

**Mẹo nhớ**: vẽ sơ đồ Madelung (zig-zag):

```
1s
2s   2p
3s   3p   3d
4s   4p   4d   4f
5s   5p   5d   5f
6s   6p   6d
7s   7p
```

Đọc theo các đường chéo từ trên xuống — đó là thứ tự năng lượng. Để ý: **4s điền trước 3d** (vì 4s năng lượng thấp hơn 3d), nhưng sau khi điền xong **viết lại theo thứ tự lớp** thì 3d trước 4s.

### 3.2. Quy tắc Pauli — exclusion principle

**Tối đa 2 electron trong cùng orbital, và chúng phải có spin ngược nhau** (↑ và ↓).

Không có 2 electron nào trong cùng một nguyên tử giống nhau hoàn toàn (cả 4 số lượng tử). Đây là phát biểu cổ điển của Wolfgang Pauli (1925, Nobel 1945).

### 3.3. Quy tắc Hund — maximum multiplicity

Khi điền electron vào phân lớp có nhiều orbital cùng năng lượng (p, d, f), **mỗi orbital nhận 1 electron trước**, đến khi mỗi orbital có 1 electron rồi mới bắt đầu ghép cặp.

**Ví dụ minh họa cho phân lớp 2p (3 orbital):**

Điền 1 electron:  
`[↑ ][  ][  ]` (chỉ orbital đầu có 1 e)

Điền 2 electron:  
`[↑ ][↑ ][  ]` (mỗi orbital 1 e, **không phải** `[↑↓][  ][  ]`)

Điền 3 electron:  
`[↑ ][↑ ][↑ ]` (mỗi orbital 1 e)

Điền 4 electron:  
`[↑↓][↑ ][↑ ]` (bắt đầu ghép cặp ở orbital đầu)

Điền 5 electron:  
`[↑↓][↑↓][↑ ]`

Điền 6 electron (đầy):  
`[↑↓][↑↓][↑↓]`

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao 4s điền trước 3d, nhưng khi viết lại đặt 3d trước 4s?**
A: Hai chuyện khác nhau.
- **Thứ tự điền**: theo năng lượng tăng dần — 4s thấp hơn 3d (do hiệu ứng chắn của các electron ở các lớp khác). Nên ta điền 4s trước.
- **Thứ tự viết cấu hình**: theo lớp tăng dần (n = 3 trước n = 4) cho dễ đọc. Vậy viết `3d¹⁰ 4s²` chứ không phải `4s² 3d¹⁰`.

Hai chuyện này gây nhầm lẫn cho rất nhiều học sinh. Cứ ghi nhớ: **điền theo Madelung, viết theo n**.

**Q: Vì sao quy tắc Hund tồn tại?**
A: Vì electron đẩy nhau (cả hai mang điện âm). Khi ở các orbital khác nhau, hai electron có không gian riêng → đẩy ít hơn → năng lượng tổng thấp hơn. Cùng orbital thì gần nhau → đẩy mạnh hơn. Bản chất tự nhiên chọn cấu hình năng lượng thấp.

### 📝 Tóm tắt mục 3

- **Aufbau**: điền từ năng lượng thấp lên cao (1s → 2s → 2p → 3s → 3p → 4s → 3d → ...).
- **Pauli**: max 2 e/orbital, spin ngược nhau.
- **Hund**: trong phân lớp nhiều orbital, mỗi orbital 1 e trước rồi mới ghép cặp.

---

## 4. Viết cấu hình electron — ví dụ Z = 1..20

**Walk-through cho 5 nguyên tố cụ thể:**

### Ví dụ 1 — Hydrogen (Z = 1):

1 electron điền vào 1s đầu tiên.

```
Cấu hình: 1s¹
```

### Ví dụ 2 — Carbon (Z = 6):

6 electron điền lần lượt:
- 1s² (2 e đầy lớp K)
- 2s² (2 e nữa)
- 2p² (2 e còn lại; theo Hund: `[↑ ][↑ ][  ]`)

```
Cấu hình: 1s² 2s² 2p²
```

### Ví dụ 3 — Sodium (Z = 11):

11 electron:
- 1s² 2s² 2p⁶ (10 e đầy lớp K + L)
- 3s¹ (1 e ngoài cùng)

```
Cấu hình đầy đủ: 1s² 2s² 2p⁶ 3s¹
Cấu hình rút gọn: [Ne] 3s¹
```

Ký hiệu rút gọn dùng **cấu hình của khí trơ liền trước** trong dấu ngoặc vuông. Ne (Z = 10) có `1s² 2s² 2p⁶`, viết tắt là `[Ne]`.

### Ví dụ 4 — Iron (Z = 26):

26 electron, theo Madelung:
- 1s² (2)
- 2s² (4)
- 2p⁶ (10)
- 3s² (12)
- 3p⁶ (18)
- 4s² (20) — **4s điền trước 3d**
- 3d⁶ (26) — còn 6 e vào 3d

```
Cấu hình đầy đủ: 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶
Cấu hình rút gọn: [Ar] 3d⁶ 4s² (viết 3d trước 4s khi tổng kết)
```

### Ví dụ 5 — Argon (Z = 18):

18 electron, đầy đến hết 3p:

```
Cấu hình: 1s² 2s² 2p⁶ 3s² 3p⁶
       = [Ne] 3s² 3p⁶
       = [Ar] (chính nó là khí trơ)
```

### Bảng cấu hình Z = 1..20

| Z | Tên | Ký hiệu | Cấu hình |
|---|-----|---------|----------|
| 1 | Hydrogen | H | 1s¹ |
| 2 | Helium | He | 1s² |
| 3 | Lithium | Li | [He] 2s¹ |
| 4 | Beryllium | Be | [He] 2s² |
| 5 | Boron | B | [He] 2s² 2p¹ |
| 6 | Carbon | C | [He] 2s² 2p² |
| 7 | Nitrogen | N | [He] 2s² 2p³ |
| 8 | Oxygen | O | [He] 2s² 2p⁴ |
| 9 | Fluorine | F | [He] 2s² 2p⁵ |
| 10 | Neon | Ne | [He] 2s² 2p⁶ = 1s² 2s² 2p⁶ |
| 11 | Sodium | Na | [Ne] 3s¹ |
| 12 | Magnesium | Mg | [Ne] 3s² |
| 13 | Aluminum | Al | [Ne] 3s² 3p¹ |
| 14 | Silicon | Si | [Ne] 3s² 3p² |
| 15 | Phosphorus | P | [Ne] 3s² 3p³ |
| 16 | Sulfur | S | [Ne] 3s² 3p⁴ |
| 17 | Chlorine | Cl | [Ne] 3s² 3p⁵ |
| 18 | Argon | Ar | [Ne] 3s² 3p⁶ |
| 19 | Potassium | K | [Ar] 4s¹ |
| 20 | Calcium | Ca | [Ar] 4s² |

### ⚠ Lỗi thường gặp — bất thường (anomalies)

Có **2 ngoại lệ** quan trọng ở dãy 3d cần nhớ:

- **Cr (Z = 24)**: thay vì `[Ar] 3d⁴ 4s²`, thực tế là `[Ar] 3d⁵ 4s¹`. Lý do: phân lớp 3d đầy một nửa (half-filled) ổn định hơn.
- **Cu (Z = 29)**: thay vì `[Ar] 3d⁹ 4s²`, thực tế là `[Ar] 3d¹⁰ 4s¹`. Lý do: phân lớp 3d đầy hoàn toàn (fully filled) ổn định hơn.

Quy luật: **phân lớp đầy hoặc đầy một nửa thường ổn định hơn** một electron lẻ ở vị trí khác.

### 📝 Tóm tắt mục 4

- Điền theo Madelung (1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, ...).
- Viết theo thứ tự lớp tăng dần (sau khi điền xong, sắp xếp lại nếu cần).
- Cấu hình rút gọn dùng khí trơ liền trước: `[Ne] 3s¹`, `[Ar] 3d⁶ 4s²`.
- Ngoại lệ: Cr (3d⁵ 4s¹), Cu (3d¹⁰ 4s¹).

---

## 5. Bảng tuần hoàn — vì sao có hình đó?

### 5.1. Chu kỳ (rows) và Nhóm (columns)

**Bảng tuần hoàn hiện đại có 7 chu kỳ × 18 nhóm.**

- **Chu kỳ (period) = số lớp electron của nguyên tử**. Chu kỳ 1: nguyên tử có 1 lớp. Chu kỳ 4: 4 lớp.
- **Nhóm (group) = số electron lớp ngoài cùng** (với nhóm A, không tính khối d).

### 💡 Trực giác / Hình dung

Mendeleev (1869) phát hiện: sắp xếp các nguyên tố theo khối lượng tăng dần, tính chất hóa học **lặp lại tuần hoàn**. Đó là vì các electron lớp ngoài cùng quyết định hóa học, và các electron này lặp lại pattern khi qua mỗi chu kỳ.

**Ví dụ — nhóm 1 (kim loại kiềm)**: H, Li, Na, K, Rb, Cs, Fr. Tất cả đều có 1 electron lớp ngoài cùng (cấu hình `... ns¹`) → tất cả đều phản ứng mạnh, dễ mất 1 e thành cation X⁺.

### 5.2. Chia khối — s, p, d, f

Bảng tuần hoàn chia thành 4 **khối (block)** dựa vào phân lớp đang được điền:

- **Khối s** (2 cột bên trái): điền vào ns. Gồm nhóm IA (Li, Na, K, ...) và IIA (Be, Mg, Ca, ...).
- **Khối p** (6 cột bên phải): điền vào np. Gồm các nhóm IIIA → VIIIA (Boron family đến khí trơ).
- **Khối d** (10 cột ở giữa): điền vào (n−1)d. Gồm các kim loại chuyển tiếp (transition metals): Sc → Zn ở chu kỳ 4.
- **Khối f** (14 cột tách riêng dưới): điền vào (n−2)f. Gồm lanthanide (4f) và actinide (5f).

### 5.3. Vì sao chu kỳ 1 chỉ có 2 nguyên tố?

Lớp 1 (K) chỉ có 1 orbital 1s → chứa tối đa 2 electron → chu kỳ 1 chỉ có 2 nguyên tố (H và He).

**Chu kỳ 2 (n = 2)**: có 2s + 2p = 4 orbital → 8 electron → 8 nguyên tố (Li → Ne).

**Chu kỳ 3**: có 3s + 3p = 4 orbital → 8 nguyên tố (Na → Ar). (Phân lớp 3d điền ở chu kỳ 4 nên không tính ở đây.)

**Chu kỳ 4**: 4s + 3d + 4p = 1 + 5 + 3 = 9 orbital → 18 electron → 18 nguyên tố (K → Kr).

**Chu kỳ 5**: tương tự, 18 nguyên tố (Rb → Xe).

**Chu kỳ 6**: 6s + 4f + 5d + 6p = 1 + 7 + 5 + 3 = 16 orbital → 32 electron → 32 nguyên tố (Cs → Rn).

### 📝 Tóm tắt mục 5

- Chu kỳ = số lớp electron; Nhóm = số e ngoài cùng (cho nhóm A).
- 4 khối: s (2 cột), p (6), d (10), f (14).
- Tính chất hóa học lặp lại tuần hoàn vì cấu hình electron lớp ngoài lặp lại.

---

## 6. Bốn xu hướng tuần hoàn

### 6.1. Bán kính nguyên tử

**Trong chu kỳ (trái → phải)**: bán kính **giảm**. Vì Z tăng → hạt nhân hút electron mạnh hơn, kéo gần lại.

**Trong nhóm (trên → dưới)**: bán kính **tăng**. Vì thêm lớp electron mới → "tòa nhà" cao thêm 1 tầng.

**Ví dụ số (đơn vị pm):**

| | Li | Be | B | C | N | O | F | Ne |
|---|---|---|---|---|---|---|---|---|
| Bán kính | 152 | 112 | 85 | 77 | 75 | 73 | 71 | — (Ne là khí trơ, không đo bán kính cộng hóa trị) |

| | Li | Na | K | Rb | Cs |
|---|---|---|---|---|---|
| Bán kính | 152 | 186 | 227 | 248 | 265 |

### 6.2. Năng lượng ion hóa I₁ (kJ/mol)

**Định nghĩa**: năng lượng cần để bứt 1 electron ngoài cùng khỏi nguyên tử trung hòa: `X(k) → X⁺(k) + e⁻`.

**Trong chu kỳ**: I₁ **tăng** (electron khó bứt vì bị hút mạnh).

**Trong nhóm**: I₁ **giảm** (electron xa nhân, dễ bứt).

**Ví dụ số:**

| | Li | Be | B | C | N | O | F | Ne |
|---|---|---|---|---|---|---|---|---|
| I₁ | 520 | 899 | 800 | 1086 | 1402 | 1314 | 1681 | 2081 |

Để ý 2 bất thường nhỏ:
- B (800) < Be (899): vì B có 1 e ở orbital 2p, dễ bứt hơn 2 e ghép cặp ở 2s của Be.
- O (1314) < N (1402): N có 2p³ (Hund: mỗi orbital 1 e, ổn định half-filled), O có 2p⁴ (1 e ghép cặp, dễ bứt).

### 6.3. Độ âm điện (Electronegativity)

**Định nghĩa**: khả năng hút electron về phía mình trong liên kết. Thang Pauling từ 0 đến 4.

**Trong chu kỳ**: tăng (đạt cực đại ở F = 3.98).

**Trong nhóm**: giảm.

**Ví dụ số:**

| F | O | N | Cl | C | H | Na | Cs |
|---|---|---|---|---|---|---|---|
| 3.98 | 3.44 | 3.04 | 3.16 | 2.55 | 2.20 | 0.93 | 0.79 |

F có độ âm điện cao nhất → "tham" electron nhất. Cs có độ âm điện thấp nhất (gần như 0) → "nhường" electron dễ nhất.

### 6.4. Ái lực electron (Electron affinity, EA)

**Định nghĩa**: năng lượng tỏa ra khi nguyên tử nhận thêm 1 electron: `X(k) + e⁻ → X⁻(k)`.

**Trong chu kỳ**: tăng (gần đầy phân lớp p → "muốn nhận thêm e cho đầy").

**Trong nhóm**: giảm (kích thước lớn → e thêm vào không "khít").

EA mạnh nhất ở **Cl** (348 kJ/mol) — không phải F. Vì F nhỏ quá → e thêm vào bị đẩy mạnh.

### Tóm tắt 4 xu hướng

| Đại lượng | Trong chu kỳ (→) | Trong nhóm (↓) |
|-----------|-------------------|------------------|
| Bán kính | giảm | tăng |
| Năng lượng ion hóa | tăng | giảm |
| Độ âm điện | tăng | giảm |
| Ái lực electron | tăng | giảm (có ngoại lệ F) |

### 🔁 Dừng lại tự kiểm tra

1. So sánh bán kính: Na vs Mg vs Cl.
2. Vì sao khí trơ (He, Ne, Ar) trơ?

<details>
<summary>Đáp án</summary>

1. Cùng chu kỳ 3, Z tăng → bán kính giảm. Na (186 pm) > Mg (160 pm) > Cl (99 pm).
2. Cấu hình lớp ngoài đầy (ns² np⁶) → cực kỳ ổn định, không cần thêm/bớt e → không phản ứng.
</details>

### 📝 Tóm tắt mục 6

- 4 xu hướng: bán kính ↘→, ↗↓; I₁/độ âm điện/EA: ↗→, ↘↓ (chiều ngược lại).
- Lý do: Z tăng kéo gần (chu kỳ); thêm lớp e đẩy ra (nhóm).

---

## 7. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Viết cấu hình electron đầy đủ và rút gọn của các nguyên tử: K (Z = 19), Ti (Z = 22), Br (Z = 35).

**Bài 2**: Một nguyên tử có cấu hình `[Ar] 4s² 3d¹⁰ 4p⁵`. Đây là nguyên tố nào? Z = ?

**Bài 3**: Sắp xếp theo chiều tăng dần bán kính nguyên tử: O, S, Mg, Na.

**Bài 4**: Vì sao Mg (Z = 12) có I₁ lớn hơn Al (Z = 13) mặc dù Z(Al) > Z(Mg)?

**Bài 5**: Viết cấu hình electron của các ion: Na⁺, Cl⁻, Fe³⁺.

**Bài 6**: Phân lớp 4f có thể chứa tối đa bao nhiêu electron? Bao nhiêu orbital? Phân lớp này điền ở chu kỳ nào?

### Lời giải

**Bài 1**:
- **K (Z = 19)**: `1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹` = **`[Ar] 4s¹`**.
- **Ti (Z = 22)**: 22 = 18 + 4 → `[Ar] 4s² 3d²`. Đầy đủ: `1s² 2s² 2p⁶ 3s² 3p⁶ 3d² 4s²`.
- **Br (Z = 35)**: 35 = 18 + 17 → `[Ar] 4s² 3d¹⁰ 4p⁵`. Đầy đủ: `1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁵`.

**Bài 2**:
Tổng e = 18 (Ar) + 2 + 10 + 5 = **35** → Z = 35 → **Br (Bromine)**. (Trùng với Bài 1.)

**Bài 3**:
- Cùng chu kỳ 3: Na (186) > Mg (160) > S (104).
- Khác chu kỳ: S (104) vs O (73): O cùng nhóm VI nhưng chu kỳ 2 → nhỏ hơn S.
- Sắp xếp tăng dần: **O < S < Mg < Na**.

Kiểm tra số liệu: O = 73, S = 104, Mg = 160, Na = 186 ✓.

**Bài 4**:
Mg có cấu hình `[Ne] 3s²` — bứt 1 e ở 3s (đã ghép cặp). 
Al có cấu hình `[Ne] 3s² 3p¹` — bứt 1 e ở 3p (orbital cao hơn 3s, kém bền hơn).
→ Bứt e ở 3p (Al) dễ hơn bứt ở 3s (Mg) → I₁(Al) < I₁(Mg). 

Số liệu thật: I₁(Mg) = 738 kJ/mol, I₁(Al) = 578 kJ/mol ✓.

**Bài 5**:
- **Na⁺**: Na (Z = 11) `[Ne] 3s¹` mất 1 e → `1s² 2s² 2p⁶` = **`[Ne]`**.
- **Cl⁻**: Cl (Z = 17) `[Ne] 3s² 3p⁵` nhận 1 e → `[Ne] 3s² 3p⁶` = **`[Ar]`**.
- **Fe³⁺**: Fe (Z = 26) `[Ar] 3d⁶ 4s²` mất 3 e. Quy tắc: mất e ở lớp cao nhất (n lớn) trước, rồi mới trong cùng lớp. → mất 2 e ở 4s, 1 e ở 3d → `[Ar] 3d⁵`. Cấu hình half-filled, khá ổn định, lý do Fe³⁺ phổ biến.

**Bài 6**:
- 4f: l = 3 → số orbital = 2l + 1 = **7 orbital**. Max e = 2 × 7 = **14 electron**.
- 4f điền ở chu kỳ 6, sau 6s và trước 5d (theo Madelung: ... 6s, 4f, 5d ...). Đó là khối lanthanide (Z = 57..71).

---

## 8. Liên kết và bài tiếp theo

- **Bài tiếp theo Chemistry**: [Lesson 03 — Liên kết ion & cộng hóa trị](../lesson-03-ionic-covalent-bond/) — vì sao Na "thích" cho 1 e, Cl "thích" nhận 1 e → liên kết NaCl.
- **Liên kết Physics**: phổ vạch Hydrogen (`Physics/03-Optics-ModernPhysics/lesson-05-atom-bohr-orbital`) — dùng mô hình Bohr giải thích các vạch phổ.
- **Liên kết Math**: cấu trúc bảng tuần hoàn dùng quy nạp toán học (mỗi chu kỳ thêm lớp mới) — xem `Math/05-NumberTheory-Combinatorics-Logic/lesson-06-induction`.

---

## 📝 Tổng kết Lesson 02

1. Electron tổ chức theo **lớp** (n = 1, 2, 3, ...) và **phân lớp** (s, p, d, f).
2. Phân lớp s/p/d/f có 1/3/5/7 orbital, max 2/6/10/14 e.
3. **3 quy tắc**: Aufbau (năng lượng tăng), Pauli (max 2 e/orbital), Hund (1 e/orbital trước khi ghép cặp).
4. **Cấu hình**: điền theo Madelung, viết theo n tăng. Rút gọn bằng khí trơ trước: `[Ar] 3d⁶ 4s²`.
5. **Ngoại lệ**: Cr (3d⁵ 4s¹), Cu (3d¹⁰ 4s¹) — half-filled & fully-filled ổn định hơn.
6. **Bảng tuần hoàn**: chu kỳ = số lớp; nhóm = số e ngoài cùng. 4 khối s/p/d/f.
7. **4 xu hướng**: bán kính ngược chiều với (I₁, độ âm điện, EA). Trái → phải: bán kính giảm, các đại lượng kia tăng. Trên → dưới: ngược lại.

**Tiếp theo**: [Lesson 03 — Liên kết ion & cộng hóa trị](../lesson-03-ionic-covalent-bond/)
