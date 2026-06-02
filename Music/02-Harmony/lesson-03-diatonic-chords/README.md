# Lesson 03 — Hợp âm theo bậc (Diatonic Chords)

> **Tầng 2 — Harmony · Bài 3/8**

Bài này trả lời câu hỏi then chốt: **trong một điệu nhất định, hợp âm nào "thuộc về" điệu đó?** Nếu bạn biết điệu là C trưởng, bạn có thể lập tức biết 7 hợp âm "home team" mà không cần kiểm tra từng nốt. Cơ chế đằng sau gọi là **hợp âm diatonic** — dựng hợp âm trên mỗi bậc thang âm, chỉ dùng nốt trong gam đó.

Đây là nền tảng để hiểu tại sao một bản nhạc nghe "hợp" hay "chệch nhịp", và là bản đồ để người soạn nhạc lựa chọn hợp âm tiếp theo.

## Mục tiêu học tập

Sau bài này, bạn có thể:

- Giải thích "diatonic" nghĩa là gì và vì sao mỗi điệu chỉ có 7 hợp âm ba diatonic.
- Đọc và viết ký hiệu số La Mã (`I ii iii IV V vi vii°`) cho hợp âm theo bậc.
- Liệt kê đủ 7 hợp âm diatonic (tên + chất) cho bất kỳ điệu trưởng nào.
- Làm tương tự cho gam thứ tự nhiên (`i ii° III iv v VI VII`).
- Xây hợp âm bảy diatonic (`Imaj7 ii7 iii7 IVmaj7 V7 vi7 viiø7`).
- Giải thích vì sao bậc V (và vii°) tạo "lực kéo" mạnh về bậc I.

## Kiến thức tiền đề

- **Hợp âm ba (triads)** — cách dựng hợp âm trưởng, thứ, giảm: [`../lesson-01-triads/`](../lesson-01-triads/)
- **Hợp âm bảy (seventh chords)** — chất Maj7, m7, dom7, ø7: [`../lesson-02-seventh-chords/`](../lesson-02-seventh-chords/)
- **Gam trưởng và thứ** — cấu trúc nốt, công thức cung: [`../../01-Fundamentals/lesson-05-major-scale/`](../../01-Fundamentals/lesson-05-major-scale/) và [`../../01-Fundamentals/lesson-06-minor-scales-modes/`](../../01-Fundamentals/lesson-06-minor-scales-modes/)

---

## 1. "Diatonic" là gì?

> 💡 **Trực giác.** Hãy hình dung một gam trưởng là một "gia đình" gồm 7 nốt. Hợp âm diatonic là những hợp âm ba (hoặc bảy) được dựng hoàn toàn từ các thành viên trong gia đình đó — không mời người ngoài. Ngược lại, hợp âm chromatic (hay "borrowed chord") mời thêm nốt từ bên ngoài gam.

**(a) Là gì.** Một hợp âm gọi là **diatonic** (thuộc điệu) nếu tất cả các nốt của nó đều nằm trong gam (thang âm) đang xét. Để lấy 7 hợp âm diatonic của một gam, ta lần lượt đặt mỗi bậc (`1, 2, 3, 4, 5, 6, 7`) làm nốt gốc (root) rồi dựng hợp âm ba lên trên nó — **chỉ dùng nốt trong gam, không thêm dấu thăng/giáng ngoài**.

**(b) Vì sao cần.** Khi soạn nhạc ở một điệu nhất định, hợp âm diatonic là "menu mặc định" — chúng hoạt động tốt với nhau vì dùng chung bộ nốt. Biết 7 hợp âm này nghĩa là bạn có ngay 7 ô gạch để xây bài hát, không cần thử sai từng hợp âm một.

**(c) Ví dụ số cụ thể — C trưởng (C major).** Gam C trưởng: `C D E F G A B`. Dựng hợp âm ba trên từng bậc (nốt 1-3-5 tính trong gam):

| Bậc | Nốt gốc | Nốt 3 (trong gam) | Nốt 5 (trong gam) | Kết quả | Chất |
|:---:|---------|-------------------|-------------------|---------|------|
| 1 | C | E (M3 trên C) | G (P5 trên C) | **C-E-G** | Trưởng |
| 2 | D | F (m3 trên D) | A (P5 trên D) | **D-F-A** | Thứ |
| 3 | E | G (m3 trên E) | B (P5 trên E) | **E-G-B** | Thứ |
| 4 | F | A (M3 trên F) | C (P5 trên F) | **F-A-C** | Trưởng |
| 5 | G | B (M3 trên G) | D (P5 trên G) | **G-B-D** | Trưởng |
| 6 | A | C (m3 trên A) | E (P5 trên A) | **A-C-E** | Thứ |
| 7 | B | D (m3 trên B) | F (dim5 trên B) | **B-D-F** | Giảm |

> ⚠ **Lỗi thường gặp: tưởng phải tính quãng từ nốt gốc tuyệt đối.** Không phải. Bậc 2 (D) trong C trưởng: nốt thứ 3 theo thứ tự gam là F (không phải F♯) vì F♯ không nằm trong C trưởng. Vì thế khoảng cách D→F là quãng 3 thứ (3 nửa cung), không phải quãng 3 trưởng (4 nửa cung) → hợp âm Dm (thứ), không phải D (trưởng).

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao bậc 7 lại ra hợp âm giảm?"* — Vì B→D là quãng 3 thứ (3 nửa cung) VÀ B→F là quãng 5 giảm (6 nửa cung, thiếu nửa cung so với P5). Hai quãng 3 thứ chồng nhau = hợp âm giảm (diminished).
> - *"7 hợp âm có hợp âm tăng (augmented) không?"* — Không, trong gam trưởng. Hợp âm tăng xuất hiện ở bậc III trong gam thứ harmonic (có dấu thăng bậc 7).
> - *"Phải thuộc lòng bảng này không?"* — Không cần. Khi nắm mẫu "Trưởng-Thứ-Thứ-Trưởng-Trưởng-Thứ-Giảm" thì suy ra được cho mọi điệu trưởng (xem mục 2).

> 📝 **Tóm tắt mục 1.** Diatonic = dùng nốt trong gam. C trưởng cho: C (trưởng), Dm, Em, F, G, Am, B° — 3 trưởng + 3 thứ + 1 giảm.

---

## 2. Ký hiệu số La Mã và mẫu cố định của gam trưởng

> 💡 **Trực giác.** Số La Mã cho phép nói về hợp âm theo vị trí bậc, không phụ thuộc điệu cụ thể. "Bậc V luôn tạo căng thẳng muốn về I" đúng dù bạn đang ở C trưởng, G trưởng hay F trưởng — vì cấu trúc khoảng cách giống nhau.

**Quy ước ký hiệu:**
- **CHỮ HOA** (I, II, IV...) = hợp âm **trưởng**
- **chữ thường** (ii, iii, vi...) = hợp âm **thứ**
- **Thêm °** (vii°) = hợp âm **giảm**
- **Thêm +** = hợp âm tăng (ít gặp trong diatonic trưởng)

**Mẫu cố định cho MỌI gam trưởng:**

```
I    ii   iii  IV   V    vi   vii°
Trưởng Thứ  Thứ Trưởng Trưởng Thứ  Giảm
```

Mẫu này không thay đổi dù bạn ở bất kỳ điệu trưởng nào. Chỉ cần biết nốt chủ và gam của điệu, bạn suy ra 7 tên hợp âm ngay lập tức.

### Ví dụ 1 — C trưởng

Gam: `C D E F G A B`

| Số La Mã | Tên hợp âm | Nốt | Chất |
|:--------:|-----------|-----|------|
| **I** | **C** | C–E–G | Trưởng |
| ii | Dm | D–F–A | Thứ |
| iii | Em | E–G–B | Thứ |
| **IV** | **F** | F–A–C | Trưởng |
| **V** | **G** | G–B–D | Trưởng |
| vi | Am | A–C–E | Thứ |
| vii° | B° | B–D–F | Giảm |

### Ví dụ 2 — G trưởng

Gam: `G A B C D E F♯` (1 dấu thăng: F♯)

| Số La Mã | Tên hợp âm | Nốt | Chất |
|:--------:|-----------|-----|------|
| **I** | **G** | G–B–D | Trưởng |
| ii | Am | A–C–E | Thứ |
| iii | Bm | B–D–F♯ | Thứ |
| **IV** | **C** | C–E–G | Trưởng |
| **V** | **D** | D–F♯–A | Trưởng |
| vi | Em | E–G–B | Thứ |
| vii° | F♯° | F♯–A–C | Giảm |

Lưu ý: bậc iii là Bm (B–D–**F♯**) và bậc V là D (D–**F♯**–A) — dùng F♯ vì F♯ thuộc G trưởng. Nếu dùng F♮, hợp âm sẽ "lạc điệu".

### Ví dụ 3 — F trưởng

Gam: `F G A B♭ C D E` (1 dấu giáng: B♭)

| Số La Mã | Tên hợp âm | Nốt | Chất |
|:--------:|-----------|-----|------|
| **I** | **F** | F–A–C | Trưởng |
| ii | Gm | G–B♭–D | Thứ |
| iii | Am | A–C–E | Thứ |
| **IV** | **B♭** | B♭–D–F | Trưởng |
| **V** | **C** | C–E–G | Trưởng |
| vi | Dm | D–F–A | Thứ |
| vii° | E° | E–G–B♭ | Giảm |

Lưu ý: bậc ii là Gm (G–**B♭**–D) — phải dùng B♭ vì B♭ nằm trong F trưởng, không phải B♮.

### Ví dụ 4 — D trưởng

Gam: `D E F♯ G A B C♯` (2 dấu thăng: F♯ C♯)

| Số La Mã | Tên hợp âm | Nốt | Chất |
|:--------:|-----------|-----|------|
| **I** | **D** | D–F♯–A | Trưởng |
| ii | Em | E–G–B | Thứ |
| iii | F♯m | F♯–A–C♯ | Thứ |
| **IV** | **G** | G–B–D | Trưởng |
| **V** | **A** | A–C♯–E | Trưởng |
| vi | Bm | B–D–F♯ | Thứ |
| vii° | C♯° | C♯–E–G | Giảm |

> 🔁 **Dừng lại tự kiểm tra.**
> Điệu E♭ trưởng (gam: `E♭ F G A♭ B♭ C D`). Hợp âm bậc ii và bậc V là gì?
> <details><summary>Đáp án</summary>
>
> Bậc ii: nốt gốc F, nốt 3 là A♭ (quãng 3 thứ từ F trong E♭ trưởng), nốt 5 là C → **Fm** (F–A♭–C).
>
> Bậc V: nốt gốc B♭, nốt 3 là D (quãng 3 trưởng), nốt 5 là F → **B♭** (B♭–D–F).
> </details>

> 📝 **Tóm tắt mục 2.** Mẫu gam trưởng: I–ii–iii–IV–V–vi–vii°. Số La Mã hoa = trưởng, thường = thứ, ° = giảm. Mẫu này bất biến trên mọi điệu trưởng.

---

## 3. Gam thứ tự nhiên — mẫu riêng

> 💡 **Trực giác.** Gam thứ tự nhiên là "gam song sinh" của gam trưởng (relative major/minor). A thứ tự nhiên dùng đúng 7 nốt của C trưởng, chỉ bắt đầu từ A. Vì bắt đầu từ bậc khác, mẫu hợp âm xoay vị trí — nhưng bản chất vẫn là 7 nốt cũ.

**Mẫu cố định cho MỌI gam thứ tự nhiên:**

```
i    ii°  III  iv   v    VI   VII
Thứ  Giảm Trưởng Thứ Thứ Trưởng Trưởng
```

### Ví dụ — A thứ tự nhiên

Gam: `A B C D E F G` (không dấu, = relative minor của C trưởng)

| Số La Mã | Tên hợp âm | Nốt | Chất |
|:--------:|-----------|-----|------|
| i | Am | A–C–E | Thứ |
| ii° | B° | B–D–F | Giảm |
| III | C | C–E–G | Trưởng |
| iv | Dm | D–F–A | Thứ |
| v | Em | E–G–B | Thứ |
| VI | F | F–A–C | Trưởng |
| VII | G | G–B–D | Trưởng |

Lưu ý: `i` viết thường vì đây là gam thứ — hợp âm chủ là thứ. `III, VI, VII` viết hoa vì là trưởng.

**Vì sao bậc v (thứ) trong gam thứ tự nhiên yếu hơn bậc V trong gam trưởng?** Trong A thứ tự nhiên, bậc v là Em — không có nốt G♯ (leading tone) nên không có lực kéo mạnh về Am. Nhạc cổ điển thường dùng gam thứ harmonic (nâng bậc 7 lên G♯) để tạo V trưởng → v7 → i có lực kéo giống như trong gam trưởng. (Xem mục 5.)

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Bậc III, VI, VII viết hoa trong gam thứ — lạ quá, không nhầm với gam trưởng sao?"* — Quy ước số La Mã luôn viết hoa/thường dựa trên chất hợp âm tương ứng, không phụ thuộc gam. Bậc III trong gam thứ tự nhiên là hợp âm trưởng nên viết hoa III. Kết hợp với bối cảnh điệu (thứ hay trưởng), không gây nhầm.
> - *"E thứ tự nhiên có hợp âm gì ở bậc iv?"* — E thứ tự nhiên: `E F♯ G A B C D`. Bậc iv = nốt A, dựng lên: A–C–E → Am (thứ) → iv = Am. Kiểm tra: C không có dấu thăng/giáng trong E thứ tự nhiên → đúng.

> 📝 **Tóm tắt mục 3.** Gam thứ tự nhiên: i–ii°–III–iv–v–VI–VII. Bậc i thứ, ii giảm, III/VI/VII trưởng, iv/v thứ. Bậc v (thứ) yếu hơn V (trưởng) vì thiếu leading tone.

---

## 4. Hợp âm bảy diatonic (gam trưởng)

> 💡 **Trực giác.** Chồng thêm một quãng 3 lên hợp âm ba diatonic — vẫn chỉ dùng nốt trong gam — ta được hợp âm bảy diatonic. Chất của hợp âm bảy phụ thuộc vào cả 4 nốt, nên phức tạp hơn một chút.

Công thức: lấy nốt 1–3–5–7 trong gam, đếm từ bậc root (bước nhảy trong gam, không phải nửa cung tuyệt đối).

**Bảng hợp âm bảy diatonic — C trưởng:**

| Bậc | Ký hiệu | Tên hợp âm | Nốt | Chất |
|:---:|:-------:|-----------|-----|------|
| I | **Imaj7** | Cmaj7 | C–E–G–B | Major 7 |
| ii | **ii7** | Dm7 | D–F–A–C | Minor 7 |
| iii | **iii7** | Em7 | E–G–B–D | Minor 7 |
| IV | **IVmaj7** | Fmaj7 | F–A–C–E | Major 7 |
| V | **V7** | G7 | G–B–D–F | Dominant 7 |
| vi | **vi7** | Am7 | A–C–E–G | Minor 7 |
| vii | **viiø7** | Bm7♭5 | B–D–F–A | Half-diminished 7 |

> ⚠ **Lỗi thường gặp: nhầm Imaj7 với I7 (dominant 7).** Cmaj7 = C–E–G–**B** (B tự nhiên, quãng 7 trưởng). C7 = C–E–G–**B♭** (quãng 7 thứ — dominant 7). Trong C trưởng, B tự nhiên nằm trong gam nên hợp âm bảy tự nhiên trên bậc I là Cmaj7, không phải C7. C7 sẽ "mượn" B♭ từ ngoài gam.

**Điểm đặc biệt: V7 là dominant 7 duy nhất.** Chỉ có bậc V (G7 trong C trưởng) cho hợp âm dominant 7 (quãng 3 trưởng + quãng 7 thứ). Chính sự kết hợp của tritone (B–F trong G7) tạo ra "lực kéo" mạnh nhất muốn giải quyết về I. (Xem mục 5.)

**Verify G7 trong C trưởng:** G–B–D–F. G→B: quãng 3 trưởng (4 nửa cung) ✓. G→D: quãng 5 đúng (7 nửa cung) ✓. G→F: quãng 7 thứ (10 nửa cung) ✓. Đây là dominant 7 = chất G7 ✓.

**Ký hiệu viiø7:** "ø" là ký hiệu cho half-diminished (thứ♭5 + bảy thứ). Bm7♭5 trong C trưởng: B–D–F–A. B→D: m3 ✓. B→F: dim5 ✓. B→A: m7 ✓.

> 🔁 **Dừng lại tự kiểm tra.**
> Điệu G trưởng. Hợp âm bảy tại bậc V là gì? Liệt kê 4 nốt và xác nhận chất.
> <details><summary>Đáp án</summary>
>
> Bậc V trong G trưởng = D. Gam G trưởng: G A B C D E F♯. Từ D, lấy nốt 1-3-5-7 trong gam: D–F♯–A–C. D→F♯: quãng 3 trưởng (4 nửa cung) ✓. D→A: quãng 5 đúng ✓. D→C: quãng 7 thứ (10 nửa cung) ✓ → **D7** (dominant 7).
> </details>

> 📝 **Tóm tắt mục 4.** Hợp âm bảy diatonic (trưởng): Imaj7–ii7–iii7–IVmaj7–V7–vi7–viiø7. Chỉ V7 là dominant 7 — đây là điều tạo ra "lực kéo" về I.

---

## 5. Lực kéo — vì sao V muốn về I

> 💡 **Trực giác.** Nghe G7–C: cảm giác "về nhà". Nghe G7 rồi dừng giữa chừng không chơi C: cảm giác lơ lửng, chờ đợi. Đó là **tension** (căng thẳng) và **resolution** (giải quyết). Không có cặp đôi nào tạo lực kéo mạnh bằng V7→I trong âm nhạc phương Tây.

**(a) Tritone trong V7.** G7 = G–B–D–F. Khoảng cách B–F là **tritone** (quãng 4 tăng / quãng 5 giảm, 6 nửa cung) — quãng bất ổn định nhất trong hệ thống 12 nốt. Tritone "muốn" co lại hoặc giãn ra:
- B (leading tone, bậc 7 của C trưởng) → C (nốt chủ, tăng lên nửa cung)
- F → E (giảm xuống nửa cung)
Cả hai chuyển động đồng thời về C–E = phần lõi của hợp âm C (trưởng)!

**(b) Leading tone (âm dẫn).** Bậc 7 của gam trưởng (B trong C trưởng) chỉ cách nốt chủ C một nửa cung. Khoảng cách nửa cung tạo "lực kéo" cơ học nhất trong hệ thống bình quân — tai luôn chờ nó đi lên thêm một bước.

**(c) Vì sao bậc V trong gam thứ tự nhiên yếu hơn.** Trong A thứ tự nhiên, bậc v = Em (E–G–B). Nốt G (bậc 7 của A thứ tự nhiên) cách A hai nửa cung (whole step) — không có lực kéo sắc bén. Nhạc cổ điển dùng **gam thứ harmonic** (nâng G lên G♯) để tạo E–G♯–B = E trưởng (E major) → E→Am có leading tone G♯→A.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vii° cũng kéo về I mạnh không?"* — Có, và thường mạnh hơn V. B°–D–F = 3 nốt trên của G7 (thiếu G). Cả 3 nốt đều có xu hướng giải quyết: B→C, D→C hoặc E, F→E. Vii° hoạt động như V7 không có nốt gốc.
> - *"Bậc ii cũng kéo về V không?"* — Đúng! Chuỗi ii–V–I là chuỗi quan trọng nhất trong nhạc jazz và cổ điển. Dm7–G7–Cmaj7 trong C trưởng là ví dụ điển hình.

> 📝 **Tóm tắt mục 5.** Lực kéo V→I đến từ: (1) tritone B–F trong G7 giải quyết vào C–E; (2) leading tone B→C (nửa cung). Vii° hoạt động tương tự. Đây là cơ chế cốt lõi của cảm giác "về nhà" trong âm nhạc tonal.

---

## 6. Bảng tổng hợp — 4 điệu

Để tránh phải tính lại từ đầu, bảng dưới đây liệt kê 7 hợp âm diatonic ba cho 3 điệu trưởng thêm và 1 điệu thứ:

**B♭ trưởng** (gam: B♭ C D E♭ F G A):

| I | ii | iii | IV | V | vi | vii° |
|---|----|----|---|---|----|----|
| B♭ | Cm | Dm | E♭ | F | Gm | A° |

**E trưởng** (gam: E F♯ G♯ A B C♯ D♯):

| I | ii | iii | IV | V | vi | vii° |
|---|----|----|---|---|----|----|
| E | F♯m | G♯m | A | B | C♯m | D♯° |

**A♭ trưởng** (gam: A♭ B♭ C D♭ E♭ F G):

| I | ii | iii | IV | V | vi | vii° |
|---|----|----|---|---|----|----|
| A♭ | B♭m | Cm | D♭ | E♭ | Fm | G° |

**D thứ tự nhiên** (gam: D E F G A B♭ C):

| i | ii° | III | iv | v | VI | VII |
|---|----|----|---|---|----|----|
| Dm | E° | F | Gm | Am | B♭ | C |

> 🔁 **Dừng lại tự kiểm tra.**
> Điệu A trưởng (gam: A B C♯ D E F♯ G♯). Hợp âm ở bậc ii, IV, vi là gì?
> <details><summary>Đáp án</summary>
>
> Bậc ii: nốt B, dựng B–D–F♯ → Bm (thứ) ✓
>
> Bậc IV: nốt D, dựng D–F♯–A → D (trưởng) ✓
>
> Bậc vi: nốt F♯, dựng F♯–A–C♯ → F♯m (thứ) ✓
>
> Đối chiếu mẫu: ii-thứ, IV-trưởng, vi-thứ — khớp mẫu gam trưởng.
> </details>

---

## Bài tập

**Bài 1.** Liệt kê đầy đủ 7 hợp âm ba diatonic (tên + nốt + chất) cho điệu **B trưởng** (gam: B C♯ D♯ E F♯ G♯ A♯).

**Bài 2.** Điệu **E thứ tự nhiên** (gam: E F♯ G A B C D). Liệt kê 7 hợp âm theo mẫu i–ii°–III–iv–v–VI–VII.

**Bài 3.** Trong C trưởng, hãy xác định: hợp âm **Am** ứng với bậc La Mã nào? Hợp âm **F** ứng với bậc nào? Giải thích cách kiểm tra bằng nốt.

**Bài 4.** Xây hợp âm bảy diatonic bậc **ii7** trong **G trưởng**. Liệt kê 4 nốt và xác định chất (Maj7 / m7 / dom7 / ø7).

**Bài 5.** Vì sao trong chuỗi **Dm7–G7–Cmaj7** (ii7–V7–I ở C trưởng), hợp âm G7 tạo ra "căng thẳng" nhiều nhất? Giải thích bằng cơ chế tritone và leading tone.

---

## Lời giải chi tiết

**Bài 1 — B trưởng:** Gam: B C♯ D♯ E F♯ G♯ A♯ (5 dấu thăng).

| Bậc | Tên hợp âm | Nốt | Cách kiểm tra | Chất |
|:---:|-----------|-----|--------------|------|
| I | B | B–D♯–F♯ | B→D♯: M3 (4 nửa cung), B→F♯: P5 (7 nửa cung) | Trưởng |
| ii | C♯m | C♯–E–G♯ | C♯→E: m3 (3 nửa cung), C♯→G♯: P5 | Thứ |
| iii | D♯m | D♯–F♯–A♯ | D♯→F♯: m3, D♯→A♯: P5 | Thứ |
| IV | E | E–G♯–B | E→G♯: M3, E→B: P5 | Trưởng |
| V | F♯ | F♯–A♯–C♯ | F♯→A♯: M3, F♯→C♯: P5 | Trưởng |
| vi | G♯m | G♯–B–D♯ | G♯→B: m3, G♯→D♯: P5 | Thứ |
| vii° | A♯° | A♯–C♯–E | A♯→C♯: m3, A♯→E: dim5 (6 nửa cung) | Giảm |

Khớp mẫu I-ii-iii-IV-V-vi-vii° ✓.

**Bài 2 — E thứ tự nhiên:** Gam: E F♯ G A B C D.

| Bậc | Tên hợp âm | Nốt | Chất |
|:---:|-----------|-----|------|
| i | Em | E–G–B | Thứ |
| ii° | F♯° | F♯–A–C | Giảm (F♯→C: dim5) |
| III | G | G–B–D | Trưởng |
| iv | Am | A–C–E | Thứ |
| v | Bm | B–D–F♯ | Thứ |
| VI | C | C–E–G | Trưởng |
| VII | D | D–F♯–A | Trưởng |

Bậc v là Bm (thứ) — không có leading tone D♯ → lực kéo về Em yếu hơn V trưởng.

**Bài 3 — C trưởng, xác định bậc:**

Am trong C trưởng: nốt gốc là A. Đếm A ở vị trí thứ 6 trong gam C (C=1, D=2, E=3, F=4, G=5, A=6) → **Am = vi** (thứ) ✓.

F trong C trưởng: nốt gốc là F. F ở vị trí thứ 4 → **F = IV** (trưởng) ✓.

Kiểm tra bằng nốt: dựng hợp âm từ A: A–C–E — tất cả đều trong C trưởng (không có dấu thăng/giáng ngoài gam) → diatonic ✓. Quãng A→C = m3, A→E = P5 → chất thứ → viết thường vi ✓.

**Bài 4 — ii7 trong G trưởng:**

Bậc ii trong G trưởng = A. Gam G trưởng: G A B C D E F♯. Từ A lấy nốt 1-3-5-7: A–C–E–G.

Kiểm tra chất: A→C: quãng 3 thứ (3 nửa cung) ✓. A→E: quãng 5 đúng ✓. A→G: quãng 7 thứ (10 nửa cung) ✓ → **Am7** (minor 7). Ký hiệu: ii7 = Am7.

**Bài 5 — Cơ chế G7 tạo căng thẳng:**

G7 = G–B–D–F. Căng thẳng đến từ hai nguồn:

1. **Tritone B–F**: B và F cách nhau 6 nửa cung (quãng 4 tăng). Đây là quãng bất ổn nhất trong hệ 12-ET. B "muốn" đi lên B→C (nửa cung), F "muốn" đi xuống F→E (nửa cung). Khi giải quyết về Cmaj7 = C–E–G–B: B→C ✓, F→E ✓, G→G ✓ — cả tritone giải quyết mượt mà.

2. **Leading tone B→C**: B là bậc 7 của C trưởng, chỉ cách C một nửa cung. Quãng nửa cung tạo lực kéo "cơ học" nhất — tai đã quen nghe B đi lên C trong hàng thế kỷ nhạc tonal.

Dm7 (ii7) nhẹ nhàng hơn vì không có tritone bất ổn; nó chuẩn bị (prepares) G7 hơn là tạo căng thẳng đỉnh điểm. G7 là đỉnh căng thẳng, Cmaj7 là điểm giải quyết.

---

## Code & Minh họa

- 🎹 [visualization.html](./visualization.html) — **Bộ hợp âm diatonic tương tác**: chọn điệu → xem 7 hợp âm → click để **nghe từng hợp âm**, tô sáng nốt trên piano, quiz nhận dạng bậc. **🔊 Bật loa.**

> Bài này không kèm `solutions.go` — toàn bộ nội dung đã được minh họa tương tác trong viz.

---

## Bài tiếp theo

→ **Lesson 04 — Tiến trình hợp âm & kết nhạc (Chord Progressions & Cadences)**: cách hợp âm di chuyển qua lại, các chuỗi phổ biến (I–IV–V–I, ii–V–I, I–V–vi–IV), và các loại kết nhạc (perfect authentic, half, deceptive). [`../lesson-04-progressions-cadences/`](../lesson-04-progressions-cadences/)

[⬆ Về tầng Harmony](../index.html) · [🏠 Trang chính Music](../../index.html)
