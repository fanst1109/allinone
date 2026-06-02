// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Music/01-Fundamentals/lesson-06-minor-scales-modes/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 06 — Gam thứ & các mode

> **Tầng 1 — Fundamentals · Bài 6/8**

Nếu gam trưởng nghe "sáng" và "phấn khởi", gam thứ nghe "tối" và "buồn" — nhưng đó chỉ là ấn tượng bề ngoài. Bài này khám phá cơ chế kỹ thuật đằng sau sự khác biệt đó: **công thức nửa cung**, **mối quan hệ tương đối / cùng tên**, và **7 mode** — 7 "màu sắc" âm nhạc khác nhau đều sinh ra từ đúng một gam trưởng.

## Mục tiêu học tập

Sau bài này, bạn có thể:

- Dựng gam thứ tự nhiên, hòa thanh, giai điệu từ bất kỳ nốt nào bằng công thức nửa cung.
- Xác định mối quan hệ **tương đối** (relative) và **cùng tên** (parallel) giữa gam trưởng và gam thứ.
- Nhận biết và dựng 7 mode từ một gam trưởng bất kỳ.
- Mô tả nốt đặc trưng của từng mode và liên kết với cảm giác âm thanh của nó.

## Kiến thức tiền đề

- Gam trưởng, công thức T–T–½–T–T–T–½ → [Lesson 05 — Gam trưởng](../lesson-05-major-scale/)
- Khái niệm nửa cung (semitone), thăng/giáng (♯/♭) → [Lesson 02 — Tên nốt & bàn phím](../lesson-02-note-names/)
- Quãng (interval) — 2nd, 3rd, 5th, 7th → [Lesson 04 — Quãng](../lesson-04-intervals/)

---

## 1. Gam thứ tự nhiên (Natural Minor)

> 💡 **Trực giác.** Hãy nhìn bàn phím piano và chơi từ A lên đến A trên tiếp theo — chỉ dùng phím trắng, không bấm phím đen nào. Dãy A–B–C–D–E–F–G–A đó chính là **A thứ tự nhiên** (A natural minor). Không có phím đen → không có ký hiệu nào → gam này và C major dùng cùng bộ 7 nốt, chỉ khác điểm xuất phát (chủ âm).

### 1.1 Công thức bước đi

Gam thứ tự nhiên (còn gọi là **mode Aeolian**) được xây dựng theo công thức khoảng cách:

\`\`\`
T – ½ – T – T – ½ – T – T
\`\`\`

Trong đó **T = nguyên cung (2 nửa cung)**, **½ = nửa cung (1 nửa cung)**. Tính bằng số nửa cung:

\`\`\`
2 – 1 – 2 – 2 – 1 – 2 – 2
\`\`\`

So sánh với gam trưởng \`2–2–1–2–2–2–1\`: bậc 3, 6, 7 trong gam thứ tự nhiên đều thấp hơn gam trưởng cùng tên đúng **1 nửa cung** (♭3, ♭6, ♭7).

### 1.2 Dựng 4 ví dụ số cụ thể

> **Ví dụ 1 — A natural minor** (gam "gốc", toàn phím trắng):

| Bậc | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|-----|---|---|---|---|---|---|---|---|
| Nốt | A | B | C | D | E | F | G | A |
| Nửa cung từ trước | — | +2 | +1 | +2 | +2 | +1 | +2 | +2 |

Kiểm tra: 2+1+2+2+1+2+2 = 12 nửa cung = 1 octave ✓

> **Ví dụ 2 — E natural minor** (1♯: F♯):

| Bậc | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|-----|---|---|---|---|---|---|---|---|
| Nốt | E | F♯ | G | A | B | C | D | E |
| Nửa cung từ trước | — | +2 | +1 | +2 | +2 | +1 | +2 | +2 |

F♯ xuất hiện ở bậc 2 vì từ E lên F chỉ có 1 nửa cung (phím trắng liền nhau), cần thêm 1 nửa cung nữa thành 2 → F♯ ✓

> **Ví dụ 3 — D natural minor** (1♭: B♭):

| Bậc | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|-----|---|---|---|---|---|---|---|---|
| Nốt | D | E | F | G | A | B♭ | C | D |
| Nửa cung từ trước | — | +2 | +1 | +2 | +2 | +1 | +2 | +2 |

B♭ ở bậc 6: từ A lên B chỉ cần 1 nửa cung (theo công thức), nhưng khoảng A–B trên piano là 2 nửa cung → hạ B thành B♭ ✓

> **Ví dụ 4 — G natural minor** (2♭: B♭ và E♭):

| Bậc | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|-----|---|---|---|---|---|---|---|---|
| Nốt | G | A | B♭ | C | D | E♭ | F | G |
| Nửa cung từ trước | — | +2 | +1 | +2 | +2 | +1 | +2 | +2 |

Verify bậc 3: G→A = 2, A→B♭ = 1 ✓. Bậc 6: D→E♭ = 1 ✓.

> ⚠ **Lỗi thường gặp: quên rằng ½ không phải lúc nào cũng là phím trắng sang phím đen.** Trên piano, E→F và B→C đã là nửa cung giữa hai phím trắng. Vì thế A thứ tự nhiên hoàn toàn là phím trắng (C D E F G A B) mà không cần phím đen nào — điều đó không phải ngẫu nhiên mà là lý do A minor được dạy trước.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Gam thứ có 7 nốt như gam trưởng không?"* — Có. Mọi gam 7 bậc đều gồm chủ âm (bậc 1) + 6 nốt khác + chủ âm lặp lại ở bậc 8. Số lượng nốt khác nhau giữa major và minor, nhưng đều là 7 nốt phân biệt.
> - *"Vì sao gam thứ nghe 'buồn'?"* — Không hẳn là khoa học — nhiều nhạc vui cũng dùng gam thứ (nhạc Flamenco, nhạc dân gian châu Phi). Sự liên kết cảm xúc phụ thuộc nhiều vào văn hóa, tempo, và hòa âm đi kèm. Nhưng về mặt vật lý, bậc 3 thấp (♭3) tạo quãng ba thứ (minor third) với chủ âm — quãng này có tần số hơi "ít hòa hợp" hơn quãng ba trưởng.

> 🔁 **Dừng lại tự kiểm tra.** Dựng B natural minor bằng công thức 2–1–2–2–1–2–2. Bắt đầu từ nốt B.
> <details><summary>Đáp án</summary>
>
> B → C♯ (+2) → D (+1) → E (+2) → F♯ (+2) → G (+1) → A (+2) → B (+2)
>
> Gam B natural minor: **B C♯ D E F♯ G A B** (2♯: F♯ và C♯)
> </details>

> 📝 **Tóm tắt mục 1.**
> - Công thức gam thứ tự nhiên: **2–1–2–2–1–2–2** (nửa cung).
> - So với gam trưởng cùng tên: bậc 3, 6, 7 thấp hơn 1 nửa cung (♭3, ♭6, ♭7).
> - A thứ tự nhiên = toàn phím trắng A–B–C–D–E–F–G–A.

---

## 2. Quan hệ tương đối (Relative) và cùng tên (Parallel)

> 💡 **Trực giác: relative.** C major và A minor dùng cùng 7 nốt (C D E F G A B) — chỉ khác nhau ở *nốt nào là chủ âm*. Giống như cùng một bộ nhân vật, kể hai câu chuyện khác nhau tùy xem ai là nhân vật chính.

### 2.1 Gam tương đối (Relative minor/major)

**Quy tắc:** Gam thứ tự nhiên của một gam trưởng bắt đầu từ **bậc 6** (thấp hơn chủ âm 3 nửa cung, hoặc cao hơn 9 nửa cung).

Các cặp tương đối quan trọng:

| Gam trưởng | Ký hiệu hóa | Gam thứ tự nhiên tương đối |
|------------|:-----------:|:-------------------------:|
| C major | 0 | A minor |
| G major | 1♯ | E minor |
| D major | 2♯ | B minor |
| F major | 1♭ | D minor |
| B♭ major | 2♭ | G minor |
| E♭ major | 3♭ | C minor |

**Kiểm tra nhanh:** Bậc 6 của C major là A (C–D–E–F–G–**A**–B) → A minor là tương đối của C major ✓. Bậc 6 của G major là E (G–A–B–C–D–**E**–F♯) → E minor là tương đối của G major ✓.

### 2.2 Gam cùng tên (Parallel minor/major)

**Parallel** = cùng chủ âm nhưng khác công thức (khác nốt trong gam).

Ví dụ — **C major vs C minor**:

| Bậc | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|-----|---|---|---|---|---|---|---|
| C major | C | D | E | F | G | A | B |
| C minor | C | D | **E♭** | F | G | **A♭** | **B♭** |

C minor có **3 nốt khác** so với C major: bậc 3 (E♭), bậc 6 (A♭), bậc 7 (B♭) — đúng với quy tắc ♭3, ♭6, ♭7.

> ⚠ **Lỗi thường gặp: nhầm relative với parallel.** A minor và C major là *relative* (cùng nốt). C minor và C major là *parallel* (cùng chủ âm C nhưng khác nốt). Khi nhạc sĩ nói "chuyển sang thứ", họ thường chuyển sang parallel minor (cùng chủ âm), không phải relative minor.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Khi nào dùng relative, khi nào dùng parallel?"* — Relative hữu ích khi phân tích bản nhạc cùng ký hiệu hóa (key signature). Parallel hữu ích khi so sánh màu sắc trưởng/thứ trên cùng chủ âm (vd nhạc phim chuyển từ C major sang C minor để tạo cảm giác nặng nề hơn).
> - *"F major tương đối là D minor — verify?"* — F major: F–G–A–B♭–C–D–E. Bậc 6 là D. D minor: D–E–F–G–A–B♭–C–D. Cùng 7 nốt {F G A B♭ C D E} ✓.

> 🔁 **Dừng lại tự kiểm tra.** D major (2♯: F♯, C♯) — gam thứ tương đối là gì?
> <details><summary>Đáp án</summary>
>
> Bậc 6 của D major: D–E–F♯–G–A–**B**–C♯. Đáp án: **B minor** (2♯: F♯, C♯ — cùng ký hiệu hóa với D major ✓).
> </details>

> 📝 **Tóm tắt mục 2.**
> - **Relative**: cùng 7 nốt, khác chủ âm. Gam thứ tương đối của gam trưởng bắt đầu từ bậc 6.
> - **Parallel**: cùng chủ âm, khác nốt (khác công thức T–½).
> - C major ↔ A minor (relative); C major ↔ C minor (parallel, C minor có E♭ A♭ B♭).

---

## 3. Gam thứ hòa thanh (Harmonic Minor)

> 💡 **Trực giác: vấn đề cảm âm.** Trong A thứ tự nhiên, nốt G (bậc 7) cách chủ âm A đúng 1 nguyên cung. Khi muốn kết câu nhạc về A, nốt G♮ không tạo được sức kéo mạnh về A. Giải pháp cổ điển: nâng G lên G♯ — chỉ còn cách A đúng **1 nửa cung** → tạo cảm giác "phải giải quyết về A" (leading tone). Đó là lý do gam thứ hòa thanh ra đời.

### 3.1 Công thức

Gam thứ hòa thanh = gam thứ tự nhiên + **nâng bậc 7 lên 1 nửa cung**.

Công thức khoảng: **2–1–2–2–1–3–1** (nửa cung). Chú ý khoảng **3 nửa cung** (quãng ba tăng, *augmented 2nd*) giữa bậc 6 và bậc 7 — đây là đặc điểm nhận biết của gam hòa thanh.

### 3.2 Dựng 4 ví dụ số

> **Ví dụ 1 — A harmonic minor:**

| Bậc | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|-----|---|---|---|---|---|---|---|---|
| Nốt | A | B | C | D | E | F | **G♯** | A |
| Nửa cung | — | 2 | 1 | 2 | 2 | 1 | **3** | **1** |

Verify: 2+1+2+2+1+3+1 = 12 ✓. Khoảng F→G♯ = 3 nửa cung (augmented 2nd) ✓.

> **Ví dụ 2 — E harmonic minor:**

| Bậc | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|-----|---|---|---|---|---|---|---|---|
| Nốt | E | F♯ | G | A | B | C | **D♯** | E |
| Nửa cung | — | 2 | 1 | 2 | 2 | 1 | 3 | 1 |

So với E natural minor (D♮), E harmonic minor nâng bậc 7 từ D lên D♯ ✓.

> **Ví dụ 3 — D harmonic minor:**

| Bậc | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|-----|---|---|---|---|---|---|---|---|
| Nốt | D | E | F | G | A | B♭ | **C♯** | D |
| Nửa cung | — | 2 | 1 | 2 | 2 | 1 | 3 | 1 |

B♭→C♯ = 3 nửa cung (B♭→B = 1, B→C = 1, C→C♯ = 1) ✓.

> **Ví dụ 4 — G harmonic minor:**

| Bậc | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|-----|---|---|---|---|---|---|---|---|
| Nốt | G | A | B♭ | C | D | E♭ | **F♯** | G |
| Nửa cung | — | 2 | 1 | 2 | 2 | 1 | 3 | 1 |

E♭→F♯: E♭→E = 1, E→F = 1, F→F♯ = 1 → tổng 3 ✓.

> ⚠ **Lỗi thường gặp: quên rằng nâng bậc 7 tạo khoảng 3 nửa cung với bậc 6.** Khoảng augmented 2nd (A2) giữa bậc 6 và 7 là đặc điểm "ngoại lai" trong gam hòa thanh — nó không xuất hiện trong gam trưởng hay thứ tự nhiên. Trong âm nhạc cổ điển phương Tây, khoảng này bị coi là "cứng tai" trong giai điệu hướng lên → lý do gam thứ giai điệu ra đời (mục 4).

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Leading tone có phải lúc nào cũng nâng bậc 7 không?"* — Trong hòa âm tông (tonal harmony) cổ điển (Bach, Mozart, Beethoven): hầu hết khi hợp âm dominant (bậc 5) giải quyết về tonic (bậc 1), bậc 7 sẽ được nâng lên. Trong jazz, nhạc modal, hay folk, quy tắc này linh hoạt hơn nhiều.
> - *"Augmented 2nd nghe thế nào?"* — Nghe có vẻ kỳ lạ, "Đông phương" hoặc "Do Thái" với tai phương Tây — đó là lý do nhạc Trung Đông và nhiều thể loại flamenco ưa dùng gam hòa thanh.

> 🔁 **Dừng lại tự kiểm tra.** B natural minor: B C♯ D E F♯ G A B. Dựng B harmonic minor.
> <details><summary>Đáp án</summary>
>
> Nâng bậc 7 (A) lên A♯: **B C♯ D E F♯ G A♯ B**. Khoảng G→A♯ = 3 nửa cung ✓.
> </details>

> 📝 **Tóm tắt mục 3.**
> - Harmonic minor = natural minor + nâng bậc 7 lên ½ (tạo leading tone).
> - Công thức: **2–1–2–2–1–3–1**; khoảng 3 nửa cung đặc trưng ở bậc 6→7.
> - Tạo sức kéo hút về chủ âm, dùng nhiều trong hòa âm cổ điển.

---

## 4. Gam thứ giai điệu (Melodic Minor)

> 💡 **Trực giác.** Khoảng augmented 2nd (F–G♯ trong A harmonic minor) gây khó khi hát giai điệu đi lên. Giải pháp: khi **đi lên**, nâng thêm cả bậc 6 (không chỉ bậc 7) để trơn tru hơn. Khi **đi xuống**, không còn cần leading tone nữa → trở về tự nhiên.

### 4.1 Công thức

- **Đi lên (ascending):** nâng bậc 6 và bậc 7 lên 1 nửa cung mỗi cái. Công thức: **2–1–2–2–2–2–1**.
- **Đi xuống (descending):** giống y hệt gam thứ tự nhiên: **2–2–1–2–2–1–2** (đọc ngược công thức tự nhiên từ bậc 8 xuống 1).

### 4.2 Dựng 4 ví dụ số

> **Ví dụ 1 — A melodic minor:**

Đi lên: A B C D E **F♯ G♯** A (bậc 6 và 7 được nâng)
Đi xuống: A G♮ F♮ E D C B A (trở về tự nhiên)

So sánh ba biến thể A minor:
- Tự nhiên: A B C D E **F G** A
- Hòa thanh: A B C D E **F G♯** A
- Giai điệu ↑: A B C D E **F♯ G♯** A

> **Ví dụ 2 — E melodic minor:**

Đi lên: E F♯ G A B **C♯ D♯** E
Đi xuống: E D♮ C♮ B A G F♯ E

> **Ví dụ 3 — D melodic minor:**

Đi lên: D E F G A **B♮ C♯** D (B♭ được nâng thành B♮, C được nâng thành C♯)
Đi xuống: D C♮ B♭ A G F E D

> **Ví dụ 4 — G melodic minor:**

Đi lên: G A B♭ C D **E♮ F♯** G (E♭ nâng thành E♮, F nâng thành F♯)
Đi xuống: G F♮ E♭ D C B♭ A G

> ⚠ **Lỗi thường gặp: áp dụng biến thể đi lên cho cả đi xuống (hoặc ngược lại).** Trong âm nhạc cổ điển, quy tắc này khá nghiêm ngặt — sách giáo khoa cổ điển sẽ sửa lỗi. Tuy nhiên, trong jazz (và nhiều nhạc hiện đại), "jazz melodic minor" chỉ dùng biến thể **đi lên** cho cả hai hướng — loại bỏ luôn sự phân biệt đi lên/xuống. Khi không rõ ngữ cảnh, nên hỏi.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao nâng cả bậc 6 lại làm giai điệu trơn hơn?"* — Bằng cách nâng bậc 6, khoảng từ bậc 5→6→7 trở thành hai nguyên cung liên tiếp (như đi trong gam trưởng) thay vì nguyên cung + augmented 2nd. Giai điệu bước dần từng nửa cung / nguyên cung thường dễ hát hơn là bước nhảy khoảng lớn bất ngờ.
> - *"Classical vs jazz melodic minor khác gì?"* — Classical: lên nâng 6+7, xuống trở về tự nhiên. Jazz: luôn dùng biến thể nâng 6+7 (gọi là "acoustic scale" hoặc "jazz minor"). Nhiều mode của jazz melodic minor (Lydian dominant, Altered scale...) được dùng rộng rãi trong ngẫu hứng jazz.

> 🔁 **Dừng lại tự kiểm tra.** Dựng B melodic minor đi lên (biết B natural minor: B C♯ D E F♯ G A B).
> <details><summary>Đáp án</summary>
>
> Nâng bậc 6 (G→G♯) và bậc 7 (A→A♯): **B C♯ D E F♯ G♯ A♯ B**. Công thức nửa cung: 2–1–2–2–2–2–1 ✓.
> </details>

> 📝 **Tóm tắt mục 4.**
> - Melodic minor giải quyết khoảng A2 bằng cách nâng thêm bậc 6.
> - Ascending: **2–1–2–2–2–2–1** (nâng bậc 6+7). Descending: trở về tự nhiên.
> - Jazz melodic minor dùng biến thể ascending cho cả hai hướng.

---

## 5. Bảy Mode — 7 màu sắc từ 1 gam

> 💡 **Trực giác: nhìn từ 7 góc độ khác nhau.** Xét bộ 7 nốt C major: C D E F G A B. Nếu bắt đầu và kết thúc ở C, nghe ra "cảm giác C major" (Ionian). Nếu bắt đầu và kết thúc ở D (trong khi vẫn chỉ dùng 7 nốt đó), nghe ra "cảm giác D Dorian" — khác hoàn toàn. Bộ 7 nốt giống nhau, nhưng *nốt nào là "trung tâm hấp dẫn"* quyết định màu sắc âm nhạc.

### 5.1 Bảy mode từ C major

Từ gam C major (C D E F G A B), 7 mode sinh ra bằng cách bắt đầu từ mỗi bậc:

| Mode | Bậc bắt đầu (C major) | Nốt (từ C major) | Công thức (nửa cung) | Tính chất |
|------|-----------------------|-------------------|----------------------|-----------|
| **Ionian** (= major) | 1 — C | C D E F G A B C | 2–2–1–2–2–2–1 | Sáng, vui, ổn định |
| **Dorian** | 2 — D | D E F G A B C D | 2–1–2–2–2–1–2 | Thứ nhẹ, "hip", jazzy |
| **Phrygian** | 3 — E | E F G A B C D E | 1–2–2–2–1–2–2 | Tối, Tây Ban Nha, kịch tính |
| **Lydian** | 4 — F | F G A B C D E F | 2–2–2–1–2–2–1 | Mơ màng, lơ lửng, phim viễn tưởng |
| **Mixolydian** | 5 — G | G A B C D E F G | 2–2–1–2–2–1–2 | Trưởng nhưng phóng khoáng, blues, rock |
| **Aeolian** (= natural minor) | 6 — A | A B C D E F G A | 2–1–2–2–1–2–2 | Buồn, trầm tư |
| **Locrian** | 7 — B | B C D E F G A B | 1–2–2–1–2–2–2 | Căng thẳng, bất ổn, ít dùng |

### 5.2 Nốt đặc trưng (so với major/minor cùng tên)

Để nhận biết mode nhanh, so sánh với Ionian (major) và Aeolian (minor) cùng chủ âm:

| Mode | So với major cùng tên | Nốt đặc trưng khác biệt |
|------|-----------------------|--------------------------|
| Ionian | = major | (chuẩn) |
| **Dorian** | minor, nhưng ♮6 (bậc 6 không giảm) | Bậc 6 tự nhiên (trong khi Aeolian có ♭6) |
| **Phrygian** | minor + ♭2 | Bậc 2 giáng — cách chủ âm chỉ 1 nửa cung |
| **Lydian** | major + ♯4 | Bậc 4 thăng — tạo tritone với chủ âm |
| **Mixolydian** | major + ♭7 | Bậc 7 giáng — không có leading tone |
| Aeolian | = natural minor | (chuẩn) |
| **Locrian** | minor + ♭2 + ♭5 | Quãng 5 giáng làm hợp âm tonic trở thành dim |

### 5.3 Dựng mode từ ví dụ cụ thể (D Dorian từ C major)

C major: C D E F G A B C

D Dorian = bắt đầu từ D, dùng đúng 7 nốt đó:
D–E–F–G–A–B–C–D

Kiểm tra: bước 2–1–2–2–2–1–2 nửa cung ✓

So sánh D Dorian với D natural minor (D–E–F–G–A–B♭–C–D):
- D Dorian: **B♮** (bậc 6 tự nhiên)
- D natural minor (Aeolian): **B♭** (bậc 6 giáng)
→ Nốt đặc trưng của Dorian là bậc 6 tự nhiên (♮6) ✓

### 5.4 Thêm ví dụ mode (từ C major)

- **E Phrygian**: E–F–G–A–B–C–D–E. So E natural minor (E–F♯–G–A–B–C–D–E): Phrygian có F♮ thay vì F♯ → bậc 2 giáng (♭2) ✓.
- **F Lydian**: F–G–A–**B**–C–D–E–F. So F major (F–G–A–**B♭**–C–D–E–F): Lydian có B♮ thay vì B♭ → bậc 4 thăng (♯4) ✓.
- **G Mixolydian**: G–A–B–C–D–E–**F**–G. So G major (G–A–B–C–D–E–**F♯**–G): Mixolydian có F♮ thay vì F♯ → bậc 7 giáng (♭7) ✓.
- **A Aeolian**: A–B–C–D–E–F–G–A = A natural minor ✓.
- **B Locrian**: B–C–D–E–F–G–A–B. So B natural minor (B–C♯–D–E–**F♯**–G–A–B): Locrian có C♮ (♭2) và F♮ (♭5) ✓.

> ⚠ **Lỗi thường gặp: nhầm giữa "mode của C major" và "mode trên nốt C".** "D Dorian" không phải "mode Dorian trên C" — D là chủ âm của Dorian này. "C Dorian" là khác: C D E♭ F G A B♭ C — dùng nốt của B♭ major (vì D là bậc 3 của B♭ major... wait: B♭ major bậc 2 là C → C Dorian dùng nốt của B♭ major). Luôn nói rõ *nốt gốc* của mode.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Dorian nghe như thế nào trong âm nhạc thật?"* — Santana ("Oye Como Va"), Miles Davis ("So What"), nhạc dân ca Celtic rất nhiều. Cảm giác "minor nhưng sáng hơn" do bậc 6 tự nhiên.
> - *"Lydian dùng ở đâu?"* — Nhạc phim John Williams (Star Wars, Indiana Jones), nhiều bản nhạc phim viễn tưởng. Bậc 4 thăng tạo cảm giác "huyền ảo, không trọng lực".
> - *"Locrian có thực sự ít dùng không?"* — Đúng — hợp âm tonic của Locrian là diminished (B–D–F), thiếu quãng 5 đúng, rất bất ổn. Trong thực tế Locrian xuất hiện trong metal và jazz avant-garde, nhưng hiếm hơn 6 mode kia nhiều.
> - *"Có thể dựng mode từ gam minor không, hay chỉ từ major?"* — Có thể. Mode từ melodic minor jazz đặc biệt quan trọng (Lydian Dominant = bậc 4 melodic minor, Altered Scale = bậc 7). Sẽ học ở [Tầng 2 — Hòa âm](../../02-Harmony/).

> 🔁 **Dừng lại tự kiểm tra.** Từ G major (G A B C D E F♯), dựng A Dorian (bậc 2 của G major).
> <details><summary>Đáp án</summary>
>
> A Dorian = bắt đầu từ A, dùng nốt G major: **A B C D E F♯ G A**. Công thức: 2–1–2–2–2–1–2 ✓. Nốt đặc trưng: F♯ (bậc 6 tự nhiên, trong khi A natural minor có F♮).
> </details>

> 📝 **Tóm tắt mục 5.**
> - 7 mode = 7 cách bắt đầu gam trưởng từ mỗi bậc.
> - Ionian (=major, bậc 1) → Dorian (bậc 2) → Phrygian (bậc 3) → Lydian (bậc 4) → Mixolydian (bậc 5) → Aeolian (=minor, bậc 6) → Locrian (bậc 7).
> - Nốt đặc trưng: Dorian (♮6), Lydian (♯4), Mixolydian (♭7), Phrygian (♭2).

---

## 6. Bài tập

**Bài 1.** Dựng F harmonic minor. Liệt kê tất cả 7 nốt và xác định khoảng augmented 2nd.

**Bài 2.** C major và A minor là relative. Hỏi: F major tương đối với gam thứ nào? Verify bằng cách liệt kê nốt của cả hai.

**Bài 3.** Cho gam A♭ major (4♭: B♭, E♭, A♭, D♭). Dựng **F Dorian** từ gam này (Dorian bắt đầu từ bậc 2 → bậc 2 của A♭ major là B♭ — thực ra Dorian bậc 3 là C... wait, liệt kê bậc: A♭ B♭ C D♭ E♭ F G A♭). Dựng **F Lydian** từ C major, rồi so sánh với F major.

**Bài 4.** Dựng D melodic minor đi lên. Sau đó chỉ ra sự khác nhau giữa D natural minor, D harmonic minor, và D melodic minor (ascending) theo bảng.

**Bài 5.** B Locrian: liệt kê 7 nốt (từ C major, bậc 7). Sau đó verify: so với B natural minor, Locrian có thêm những nốt nào bị giáng?

---

## Lời giải chi tiết

**Bài 1 — F harmonic minor:**

F natural minor (bắt đầu): F G A♭ B♭ C D♭ E♭ F (tính từ công thức 2–1–2–2–1–2–2 ✓).
Harmonic minor = nâng bậc 7 (E♭ → E♮):

**F G A♭ B♭ C D♭ E♮ F**

Kiểm tra bước: 2–1–2–2–1–3–1 ✓. Khoảng augmented 2nd: D♭→E♮ = 3 nửa cung (D♭→D = 1, D→E = 2; tổng 3) ✓.

**Bài 2 — F major tương đối với D minor:**

F major: F–G–A–B♭–C–D–E–F. Bậc 6 là **D**.

D natural minor: D–E–F–G–A–B♭–C–D.

So sánh nốt: F major = {F, G, A, B♭, C, D, E}; D minor = {D, E, F, G, A, B♭, C} → cùng 7 nốt ✓. F major (1♭: B♭) ↔ D minor (1♭: B♭) — cùng ký hiệu hóa ✓.

**Bài 3 — F Lydian vs F major:**

C major bậc 4 là F → **F Lydian**: F–G–A–**B♮**–C–D–E–F. Công thức: 2–2–2–1–2–2–1 ✓.

F major (chuẩn): F–G–A–**B♭**–C–D–E–F.

Khác biệt: Lydian có **B♮** (♯4), F major có B♭. Nốt đặc trưng của Lydian là bậc 4 thăng — tạo quãng tritone (quãng 4 tăng) với chủ âm F ✓.

*(Lưu ý: phần đề cập A♭ major → F Dorian trong bài 3: A♭ major: A♭–B♭–C–D♭–E♭–F–G–A♭. Bậc 6 là F → F Aeolian. Bậc 2 là B♭ → B♭ Dorian. Để ra F Dorian, cần dùng E♭ major: E♭–F–G–A♭–B♭–C–D–E♭, bậc 2 là F → F Dorian: F–G–A♭–B♭–C–D–E♭–F, công thức 2–1–2–2–2–1–2 ✓.)*

**Bài 4 — D minor ba biến thể:**

| Bậc | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|-----|---|---|---|---|---|---|---|---|
| D natural | D | E | F | G | A | B♭ | C | D |
| D harmonic | D | E | F | G | A | B♭ | **C♯** | D |
| D melodic ↑ | D | E | F | G | A | **B♮** | **C♯** | D |

- Natural → Harmonic: bậc 7 nâng C → C♯.
- Harmonic → Melodic ↑: thêm bậc 6 nâng B♭ → B♮ (loại bỏ khoảng A2: B♭→C♯ = 3nc, thay bằng B♮→C♯ = 2nc ✓).

**Bài 5 — B Locrian:**

C major bậc 7: B C D E F G A B.

B natural minor: B C♯ D E F♯ G A B.

So sánh:
- Locrian có C♮, B natural minor có C♯ → **bậc 2 giáng** (♭2)
- Locrian có F♮, B natural minor có F♯ → **bậc 5 giáng** (♭5)

Kết luận: B Locrian = B natural minor với ♭2 và ♭5. Hợp âm tonic B dim (B–D–F) thiếu quãng 5 đúng → tính bất ổn đặc trưng ✓.

---

## Code & Minh họa

- 🎹 [visualization.html](./visualization.html) — **Xưởng gam thứ** (chọn nốt gốc + loại gam → tô sáng piano + phát âm + hiện công thức) và **Khám phá mode** (chọn 1 trong 7 mode → nghe nốt đặc trưng). **🔊 Bật loa để nghe.**

---

## Bài tiếp theo

→ **Lesson 07 — Nhịp & tiết tấu (Rhythm & Meter)**: nhịp 4/4, 3/4, 6/8, note value, syncopation, và cách đọc tiết tấu cơ bản. *(Đang biên soạn.)*

[⬆ Về tầng Fundamentals](../index.html) · [🏠 Trang chính Music](../../index.html)
`;
