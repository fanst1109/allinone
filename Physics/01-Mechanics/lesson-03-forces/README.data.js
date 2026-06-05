// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Physics/01-Mechanics/lesson-03-forces/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — Các loại lực

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **5 loại lực thường gặp** trong cơ học: trọng lực, phản lực pháp tuyến, ma sát, lực đàn hồi, lực căng dây.
- Phân biệt **ma sát tĩnh** vs **ma sát động** và tính lực ma sát cho cả 2 trường hợp.
- Biết **định luật Hooke** F = −kx cho lò xo và áp dụng.
- Hiểu **định luật vạn vật hấp dẫn Newton** F = G·m₁·m₂/r² và lý do trên Trái Đất F = m·g.
- Áp dụng nhiều lực cùng lúc vào bài toán FBD phức tạp (vật trên mặt nghiêng có ma sát, vật treo lò xo...).

## Kiến thức tiền đề

- [Lesson 02 — 3 định luật Newton](../lesson-02-newton-laws/) — F = m·a và FBD.

---

## 1. Trọng lực (Gravity)

### 1.1. Định nghĩa

**Trọng lực** = lực hấp dẫn mà Trái Đất (hoặc thiên thể nào đó) tác dụng lên một vật.

💡 **Ý nghĩa**: trọng lực là lực luôn có, kéo mọi vật về tâm Trái Đất. Trên bề mặt Trái Đất, mọi vật có khối lượng đều bị trọng lực kéo xuống — đó là lý do bạn cảm thấy "có trọng lượng".

**Vì sao tồn tại?** Đây là biểu hiện của **lực hấp dẫn** — một trong 4 lực cơ bản của tự nhiên. Mọi 2 vật có khối lượng đều hút nhau. Newton phát hiện ra điều này khi quan sát quả táo rơi (1666).

### 1.2. Công thức trên Trái Đất

\`\`\`
F_g = m · g
\`\`\`

trong đó:
- **m** = khối lượng vật (kg).
- **g** = gia tốc trọng trường = **9.8 m/s²** (gần mặt đất).

→ Trọng lực luôn hướng **xuống** (về tâm Trái Đất).

### 1.3. Định luật vạn vật hấp dẫn Newton (1687)

Tại sao g = 9.8 m/s² gần mặt đất? Là hệ quả của một định luật tổng quát hơn:

\`\`\`
F = G · m₁ · m₂ / r²
\`\`\`

trong đó:
- **G** = hằng số hấp dẫn = **6.674 × 10⁻¹¹ N·m²/kg²**.
- **m₁, m₂** = khối lượng 2 vật.
- **r** = khoảng cách giữa 2 tâm khối lượng.

💡 **Ý nghĩa**: 2 vật bất kỳ trong vũ trụ đều **hút nhau** với lực tỉ lệ thuận với 2 khối lượng và tỉ lệ nghịch với bình phương khoảng cách.

**Vì sao công thức này quan trọng?** Vì nó **hợp nhất**:
- "Quả táo rơi xuống đất" và "Mặt Trăng quay quanh Trái Đất" — 2 hiện tượng tưởng chừng riêng biệt — thực ra **cùng một lực**. Newton tính ra Mặt Trăng "rơi" về Trái Đất với gia tốc khoảng 0.0027 m/s² — đủ để giữ Mặt Trăng quay quanh, không rơi xuống.
- Vạn vật trong vũ trụ tuân theo cùng quy luật.

### 1.4. Suy ra g = 9.8 m/s² từ định luật vạn vật hấp dẫn

Vật m trên bề mặt Trái Đất (khối lượng M_T = 5.97 × 10²⁴ kg, bán kính R_T = 6.371 × 10⁶ m):

\`\`\`
F_g = G · M_T · m / R_T²

= (6.674 × 10⁻¹¹) · (5.97 × 10²⁴) · m / (6.371 × 10⁶)²

= 9.8 · m  (N)
\`\`\`

→ F_g = m · g với g = 9.8 m/s². Trên Mặt Trăng (M nhỏ hơn 81 lần, R nhỏ hơn 3.7 lần): g_Moon ≈ 1.62 m/s².

### 1.5. Bốn ví dụ số

**Ví dụ 1**: Trọng lực của người 70 kg trên Trái Đất.
- F_g = 70 × 9.8 = **686 N**.

**Ví dụ 2**: Trọng lực của cùng người trên Mặt Trăng.
- F_g = 70 × 1.62 = **113 N** (≈ 1/6 trên Trái Đất).

**Ví dụ 3**: Lực hấp dẫn giữa 2 người 60 kg cách nhau 1 m.
- F = 6.674 × 10⁻¹¹ × 60 × 60 / 1² = **2.4 × 10⁻⁷ N**.
- Rất nhỏ — không cảm nhận được. Đó là vì G cực nhỏ.

**Ví dụ 4**: Trên đỉnh Everest (cao 8.8 km so với mặt biển), g giảm bao nhiêu?
- r = R_T + 8.8 km = 6371 + 8.8 = 6379.8 km.
- g_Everest / g_đất = (6371/6379.8)² ≈ 0.9972.
- → g_Everest ≈ 9.77 m/s² (giảm 0.3%, không đáng kể trong tính toán thường).

### ⚠ Lỗi thường gặp

- **Nghĩ "ngoài vũ trụ không có trọng lực"**: sai. Ở quỹ đạo ISS (400 km), g vẫn ≈ 8.8 m/s² (chỉ giảm ~10%). Phi hành gia "không trọng lượng" vì đang **rơi tự do**, không phải vì hết trọng lực (chi tiết Lesson 06).
- **Dùng r là khoảng cách từ mặt đất thay vì từ tâm**: trong F = GMm/r², r là khoảng cách giữa **hai tâm khối lượng**. Vật trên mặt đất có r = bán kính Trái Đất (6371 km), không phải 0.
- **Quên g phụ thuộc thiên thể**: dùng g = 9.8 cho bài toán trên Mặt Trăng → sai 6 lần. Mặt Trăng g = 1.62, Sao Hỏa g = 3.7.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Nếu mọi vật hút nhau, sao tôi không bị hút dính vào người bên cạnh?"* Vì G cực nhỏ (6.67×10⁻¹¹). Lực giữa 2 người 60 kg cách 1 m chỉ ~2.4×10⁻⁷ N — nhỏ hơn trọng lượng một hạt bụi. Chỉ vật khối lượng khổng lồ (hành tinh, sao) mới tạo lực hấp dẫn đáng kể.
- *"Vì sao g lại đúng bằng 9.8 — con số này từ đâu?"* Không phải con số tùy ý: nó là kết quả của G·M_TĐ/R_TĐ² (đã tính ở 1.4). Thay khối lượng và bán kính Trái Đất vào ra đúng 9.8 m/s². Hành tinh khác khối lượng/bán kính khác → g khác.
- *"Lên cao thì nhẹ hơn — leo núi có giảm cân không?"* Trọng lượng giảm rất ít: trên đỉnh Everest chỉ giảm ~0.3%. Khối lượng (kg) thì không đổi. Không đủ để "giảm cân" theo nghĩa thông thường.

🔁 **Dừng lại tự kiểm tra**

1. Một vật có trọng lượng 100 N trên Trái Đất. Trọng lượng của nó trên Mặt Trăng (g=1.62) là bao nhiêu? Khối lượng có đổi không?
2. Nếu khoảng cách giữa 2 vật tăng gấp đôi, lực hấp dẫn giữa chúng thay đổi thế nào?

<details><summary>Đáp án</summary>

1. Khối lượng m = W/g = 100/9.8 ≈ 10.2 kg (không đổi). Trọng lượng Mặt Trăng = m·g_Moon = 10.2·1.62 ≈ **16.5 N** (≈ 1/6).
2. F ∝ 1/r². r gấp đôi → F giảm còn **1/4** (vì 2² = 4).

</details>

### 📝 Tóm tắt mục 1

- Trọng lực: F_g = m·g, hướng xuống.
- Gốc: định luật vạn vật hấp dẫn F = G·m₁·m₂/r².
- g ≈ 9.8 m/s² gần mặt đất; thay đổi rất ít theo độ cao.

---

## 2. Phản lực pháp tuyến (Normal Force)

### 2.1. Định nghĩa

**Phản lực pháp tuyến N** = lực mà một bề mặt **đẩy** vật đặt trên nó, **vuông góc với bề mặt**.

💡 **Ý nghĩa**: nếu không có N, mọi vật sẽ chìm xuống bề mặt do trọng lực. N là cách bề mặt "chống lại" sự xâm lấn của vật. Bề mặt đẩy ngược lại với lực vừa đủ để giữ vật không chìm — đây là biểu hiện của **định luật III** (vật ép bề mặt, bề mặt đẩy ngược lại).

**Vì sao "vuông góc"?** Vì bản chất lực N là từ sự đẩy giữa các nguyên tử ở bề mặt (electron đẩy nhau). Lực này luôn vuông góc với bề mặt vì bề mặt là phẳng (xét toàn cục).

### 2.2. Tính N

N **KHÔNG** phải hằng số — nó **tự điều chỉnh** để giữ vật không chìm xuống. Ta tính N từ điều kiện cân bằng theo trục vuông góc bề mặt.

**Trường hợp 1 — Vật trên mặt phẳng nằm ngang, đứng yên**: 
- Trục y: N − W = 0 → **N = W = m·g**.

**Trường hợp 2 — Mặt phẳng nghiêng góc θ**:
- W phân thành W·sinθ (song song dốc) + W·cosθ (vuông góc dốc).
- Trục vuông góc: **N = W·cosθ = m·g·cosθ** (luôn < W).

**Trường hợp 3 — Trong thang máy tăng tốc lên với a**:
- N − W = m·a → **N = m·(g + a)** (lớn hơn W bình thường, vd thang máy lên).

### ⚠ Lỗi thường gặp

- **Mặc định N = m·g trong mọi trường hợp**: chỉ đúng trên mặt ngang, đứng yên, không lực dọc khác. Trên dốc N = m·g·cosθ < m·g. Có người ngồi đè lên → N tăng. Thang máy gia tốc → N đổi.
- **Vẽ N hướng thẳng đứng trên mặt nghiêng**: SAI. N luôn **vuông góc với bề mặt** — trên dốc N nghiêng theo dốc, không thẳng đứng.
- **Coi N là cặp định luật III của trọng lực**: không phải. N (bàn đẩy vật) và W (Trái Đất hút vật) cùng tác dụng lên vật → là hai lực cân bằng, không phải cặp định luật III (xem Lesson 02 §4.2).

### ❓ Câu hỏi tự nhiên của người đọc

- *"Bàn là vật vô tri, sao biết 'đẩy lại' đúng bằng trọng lượng vật?"* Bàn không "biết" gì — N là lực đàn hồi do bàn bị nén nhẹ. Vật càng nặng, bàn nén càng nhiều, đẩy lại càng mạnh, tự động cân bằng đến khi vật không lún thêm. N "tự điều chỉnh" theo cơ chế vật lý, không phải ý thức.
- *"Vì sao trên dốc N < trọng lượng?"* Vì trên dốc, chỉ thành phần trọng lực **vuông góc mặt** (mg·cosθ) ép vào mặt, phần còn lại (mg·sinθ) kéo dọc dốc. N chỉ cần cân bằng phần vuông góc → N = mg·cosθ < mg.
- *"Trong thang máy đi lên tôi nặng hơn — cân lò xo chỉ số lớn hơn thật à?"* Đúng. Cân lò xo đo chính N (lực sàn đẩy). Thang gia tốc lên → N = m(g+a) > mg → cân chỉ số lớn hơn → "trọng lượng biểu kiến" tăng.

🔁 **Dừng lại tự kiểm tra**

1. Vật 10 kg trên mặt nghiêng 60°. Tính N. (g=9.8)
2. Người 70 kg trong thang máy gia tốc lên a = 3 m/s². Phản lực sàn N bằng bao nhiêu?

<details><summary>Đáp án</summary>

1. N = m·g·cosθ = 10·9.8·cos60° = 10·9.8·0.5 = **49 N** (nhỏ hơn trọng lượng 98 N).
2. N = m(g+a) = 70·(9.8+3) = 70·12.8 = **896 N** (lớn hơn trọng lượng 686 N).

</details>

### 📝 Tóm tắt mục 2

- N vuông góc bề mặt, hướng từ mặt phẳng vào vật.
- Tính N từ cân bằng theo trục vuông góc.
- N không cố định = m·g — phụ thuộc tình huống.

---

## 3. Lực ma sát

### 3.1. Định nghĩa

**Lực ma sát** = lực cản chuyển động hoặc xu hướng chuyển động, sinh ra ở mặt tiếp xúc giữa 2 vật, **song song với bề mặt tiếp xúc**.

💡 **Ý nghĩa**: ma sát là "kẻ thù" thường thấy của chuyển động — nó luôn cản. Nhưng ma sát cũng **rất cần thiết**:
- Không có ma sát giữa giày và mặt đất → bạn không đi được (như đi trên băng).
- Không có ma sát giữa lốp xe và đường → xe không phanh được.

**Nguồn gốc**: ở mức vi mô, mọi bề mặt đều "lởm chởm". Khi 2 bề mặt áp vào nhau, các "đỉnh" nhô lên đan vào nhau như răng cưa. Để di chuyển, phải "phá vỡ" các điểm tiếp xúc — đó chính là ma sát.

### 3.2. Hai loại ma sát

#### a) Ma sát tĩnh (static friction) f_s

Khi vật chưa chuyển động, ma sát **cân bằng** với lực ngoại lực đẩy/kéo, giữ vật đứng yên.

\`\`\`
f_s ≤ μ_s · N
\`\`\`

- **μ_s** = hệ số ma sát tĩnh (vd cao su trên bê tông ≈ 1.0, gỗ trên gỗ ≈ 0.5).
- f_s tự điều chỉnh, **chỉ vừa đủ** để giữ vật yên — không lớn hơn cần thiết.
- Khi lực kéo > f_s_max = μ_s·N → vật bắt đầu trượt.

#### b) Ma sát động/trượt (kinetic friction) f_k

Khi vật đang trượt:
\`\`\`
f_k = μ_k · N
\`\`\`

- **μ_k** = hệ số ma sát động.
- f_k là hằng số (không phụ thuộc tốc độ trượt, theo gần đúng).
- Quan sát quan trọng: **μ_k < μ_s** luôn — vật đang trượt cần ít lực hơn để duy trì trượt.

### 3.3. Bảng hệ số ma sát điển hình

| Bề mặt | μ_s (tĩnh) | μ_k (động) |
|--------|-------------|-------------|
| Cao su trên bê tông khô | 1.0 | 0.8 |
| Cao su trên bê tông ướt | 0.7 | 0.5 |
| Gỗ trên gỗ | 0.5 | 0.3 |
| Thép trên thép (khô) | 0.7 | 0.5 |
| Thép trên thép (có dầu nhờn) | 0.1 | 0.05 |
| Băng trên băng | 0.1 | 0.03 |
| Đá Teflon trên Teflon | 0.04 | 0.04 |

### 3.4. Ba ví dụ trực giác

**Ví dụ 1 — Đẩy hộp đứng yên**: Hộp 10 kg trên sàn, μ_s = 0.4. Đẩy bằng lực ngang.
- f_s_max = 0.4 × 10 × 9.8 = **39.2 N**.
- Đẩy nhẹ với F = 20 N → f_s = 20 N (cân bằng) → hộp đứng yên.
- Đẩy mạnh với F = 50 N > 39.2 N → hộp bắt đầu trượt.

**Ví dụ 2 — Hộp đang trượt**: Khi trượt, μ_k = 0.3 → f_k = 0.3 × 10 × 9.8 = **29.4 N**.
- Để duy trì trượt đều: F = 29.4 N (bằng f_k).
- Để hộp tăng tốc: F > 29.4 N. Vd F = 50 N → a = (50 − 29.4)/10 = 2.06 m/s².

**Ví dụ 3 — Trượt patin trên băng**: μ_k ≈ 0.03 → ma sát rất nhỏ → trượt rất dài sau khi đẩy.

### ⚠ Lỗi thường gặp

- **Dùng f_s = μ_s·N khi vật chưa trượt**: SAI. Khi vật đứng yên, ma sát tĩnh là **f_s ≤ μ_s·N** và chỉ bằng đúng lực đẩy (cân bằng). μ_s·N chỉ là **giá trị tối đa** f_s đạt được ngay trước khi trượt. Phản ví dụ: đẩy hộp 10 N (f_s_max = 40 N) → f_s = 10 N (không phải 40 N).
- **Lẫn μ_s và μ_k**: vật đứng yên dùng μ_s; vật đang trượt dùng μ_k. Vì μ_k < μ_s, nên "đẩy được rồi thì đẩy tiếp dễ hơn".
- **Nghĩ ma sát phụ thuộc diện tích tiếp xúc**: ở mức cơ bản, f = μ·N **không** phụ thuộc diện tích — chỉ phụ thuộc N và loại bề mặt. Lốp xe bản rộng tốt vì lý do khác (tản nhiệt, bám mép), không phải vì diện tích trong công thức này.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Vì sao μ_k < μ_s — đang trượt lại dễ hơn?"* Khi vật đứng yên, các điểm tiếp xúc vi mô "hàn dính" tạm thời, cần lực lớn để phá. Khi đã trượt, các điểm chưa kịp dính lại → cản ít hơn. Đó là vì sao "khó đẩy lúc đầu, rồi dễ dần".
- *"Ma sát luôn cản — vậy nó có ích gì?"* Cực kỳ cần thiết: không có ma sát giày-đất thì không đi được; không có ma sát lốp-đường thì xe không phanh, không cua. Ma sát biến lực thành chuyển động hữu ích.
- *"Ma sát phụ thuộc tốc độ không?"* Theo gần đúng cơ bản: f_k = μ_k·N **không** phụ thuộc tốc độ trượt. Thực tế ở tốc độ rất cao có thay đổi nhỏ, nhưng bài này coi là hằng.

🔁 **Dừng lại tự kiểm tra**

1. Hộp 5 kg trên sàn, μ_s = 0.6. Bạn đẩy với 20 N nhưng hộp chưa trượt. Lực ma sát tĩnh đang bằng bao nhiêu? Lực tối thiểu để hộp bắt đầu trượt? (g=9.8)
2. Khi hộp đã trượt với μ_k = 0.4, lực ma sát động bằng bao nhiêu?

<details><summary>Đáp án</summary>

1. Hộp chưa trượt → f_s = lực đẩy = **20 N** (cân bằng). f_s_max = μ_s·N = 0.6·5·9.8 = **29.4 N** → cần đẩy hơn 29.4 N để trượt.
2. f_k = μ_k·N = 0.4·5·9.8 = **19.6 N** (nhỏ hơn f_s_max).

</details>

### 📝 Tóm tắt mục 3

- f_s ≤ μ_s·N (cân bằng, < f_s_max thì vật chưa trượt).
- f_k = μ_k·N (vật đang trượt, hằng số).
- μ_k < μ_s. Ma sát ⊥ phương chuyển động/xu hướng.

---

## 4. Lực đàn hồi (Hooke's Law)

### 4.1. Định luật Hooke

**Lực đàn hồi của lò xo** tỉ lệ thuận với độ biến dạng x (so với vị trí cân bằng), nhưng **ngược chiều**:

\`\`\`
F = −k · x
\`\`\`

trong đó:
- **k** = độ cứng lò xo (N/m).
- **x** = độ biến dạng từ vị trí tự nhiên (+ nếu giãn, − nếu nén).
- Dấu **−** = lực luôn "kéo lò xo về vị trí cân bằng".

💡 **Ý nghĩa**: lò xo càng kéo giãn xa → lực đàn hồi càng lớn (kéo nó về). Càng nén ngắn → cũng vậy. Lò xo "thích" ở vị trí cân bằng.

**Vì sao tuyến tính (∝ x)?** Định luật Hooke chỉ đúng với **biến dạng nhỏ**. Kéo quá xa → lò xo cong, đứt, hoặc dãn dẻo → công thức không còn áp dụng.

### 4.2. Ba ví dụ số

**Ví dụ 1 — Đo k của lò xo**: Treo vật 0.5 kg vào lò xo → giãn ra 5 cm. Tính k.
- Khi cân bằng: F_đh = W → k·x = m·g → k = 0.5·9.8/0.05 = **98 N/m**.

**Ví dụ 2 — Năng lượng tích lũy**: Lò xo k = 100 N/m kéo giãn 0.1 m. Năng lượng = (1/2)·k·x² = 0.5·100·0.01 = **0.5 J**. (Sẽ học chi tiết ở Lesson 04.)

**Ví dụ 3 — Lò xo phi tuyến**: Cao su là "lò xo" không tuân Hooke vì sức căng tăng nhanh hơn tuyến tính khi kéo nhiều. Định luật Hooke chỉ áp với lò xo thật và biến dạng nhỏ.

### ⚠ Lỗi thường gặp

- **Dùng Hooke cho biến dạng lớn**: F = −kx chỉ tuyến tính khi x nhỏ. Kéo quá xa → lò xo dãn dẻo (không về được hình cũ) hoặc đứt → công thức sai. Cao su, dây thừng không tuân Hooke ở vùng kéo mạnh.
- **Quên dấu trừ (hướng lực)**: dấu − nghĩa là lực **luôn ngược chiều** biến dạng (kéo về cân bằng). Khi tính độ lớn thì bỏ dấu, nhưng khi phân tích hướng phải nhớ lực hồi phục.
- **Lẫn đơn vị của x**: nếu k tính N/m thì x phải tính **mét**, không phải cm. Phản ví dụ: k=100 N/m, giãn 5 cm → F = 100·0.05 = 5 N, KHÔNG phải 100·5 = 500 N.

### ❓ Câu hỏi tự nhiên của người đọc

- *"k đo cái gì — số lớn nghĩa là sao?"* k là **độ cứng**: lực cần để giãn lò xo 1 mét. k lớn = lò xo cứng, khó kéo (vd lò xo giảm xóc ô tô); k nhỏ = lò xo mềm, dễ kéo (vd lò xo bút bi). Đơn vị N/m.
- *"Vì sao lực lại tỉ lệ thuận với độ giãn?"* Vì với biến dạng nhỏ, các liên kết nguyên tử trong lò xo hành xử như những "lò xo tí hon" tuyến tính. Càng kéo xa, càng nhiều liên kết bị kéo căng → lực hồi phục tăng tỉ lệ. Chỉ đúng trong giới hạn đàn hồi.
- *"Treo vật vào lò xo, vì sao đứng yên ở một độ giãn nhất định?"* Vì tại đó lực đàn hồi kéo lên (kx) cân bằng đúng trọng lượng kéo xuống (mg): kx = mg → x = mg/k. Vật nặng hơn → giãn nhiều hơn.

🔁 **Dừng lại tự kiểm tra**

1. Lò xo k = 150 N/m bị kéo giãn 8 cm. Lực đàn hồi bằng bao nhiêu?
2. Treo vật 1 kg vào lò xo thì giãn 4 cm. Tính k. (g=9.8)

<details><summary>Đáp án</summary>

1. x = 8 cm = 0.08 m. F = k·x = 150·0.08 = **12 N**.
2. Cân bằng: k·x = m·g → k = m·g/x = 1·9.8/0.04 = **245 N/m**.

</details>

### 📝 Tóm tắt mục 4

- Hooke: F = −k·x. Tuyến tính, ngược chiều biến dạng.
- Chỉ đúng với biến dạng nhỏ.

---

## 5. Lực căng dây (Tension)

### 5.1. Định nghĩa

**Lực căng T** = lực mà một sợi dây (hoặc dây xích, cáp) truyền dọc theo nó.

💡 **Ý nghĩa**: dây không thể "đẩy" — chỉ có thể "kéo". T luôn hướng dọc dây, kéo 2 đầu vào nhau.

**Tính chất quan trọng**: trong dây **lý tưởng** (không khối lượng, không giãn), **lực căng bằng nhau ở mọi điểm** trên dây.

### 5.2. Walk-through — Bài toán Atwood (2 vật treo qua ròng rọc)

Hai vật m₁ = 3 kg, m₂ = 5 kg treo qua một ròng rọc, nối bằng dây. Tính gia tốc và lực căng.

- m₂ nặng hơn → m₂ đi xuống, m₁ đi lên. Gọi gia tốc của hệ = a.
- FBD m₁ (đi lên với gia tốc a): T − m₁·g = m₁·a.
- FBD m₂ (đi xuống với gia tốc a): m₂·g − T = m₂·a.
- Cộng 2 phương trình: (m₂ − m₁)·g = (m₁ + m₂)·a.
- a = (5 − 3)·9.8 / (3 + 5) = **2.45 m/s²**.
- T = m₁·(g + a) = 3·(9.8 + 2.45) = **36.75 N**.

### ⚠ Lỗi thường gặp

- **Nghĩ dây "đẩy" được**: dây chỉ **kéo**, không đẩy. Khi vật bị đẩy về phía dây, dây chùng (T = 0), không tạo lực đẩy ngược.
- **Coi T = trọng lượng vật treo trong mọi trường hợp**: chỉ đúng khi vật **đứng yên** hoặc chuyển động đều. Khi hệ gia tốc (như Atwood), T = m(g±a) ≠ mg. Phản ví dụ trên: T = 36.75 N ≠ trọng lượng m₁ = 29.4 N.
- **Quên T bằng nhau hai đầu chỉ với dây lý tưởng**: dây có khối lượng đáng kể hoặc ròng rọc có ma sát → T khác nhau hai đầu.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Vì sao trong dây lý tưởng lực căng bằng nhau ở mọi điểm?"* Vì dây không khối lượng → mỗi đoạn dây có m = 0 → theo F = m·a = 0, tổng lực trên mỗi đoạn = 0 → lực kéo hai phía mỗi đoạn phải bằng nhau → T đồng đều suốt dây.
- *"Trong bài Atwood, vì sao m₂ nặng hơn lại đi xuống?"* Vì trọng lực kéo m₂ xuống (m₂·g) lớn hơn kéo m₁ xuống (m₁·g). Hệ "nghiêng" về phía nặng → m₂ xuống, kéo m₁ lên qua dây.
- *"Lực căng có thể lớn hơn trọng lượng không?"* Có — khi vật được kéo lên có gia tốc: T = m(g+a) > mg. Vd nâng vật bằng cáp với gia tốc lên, cáp chịu lực lớn hơn trọng lượng tĩnh.

🔁 **Dừng lại tự kiểm tra**

1. Một vật 5 kg treo đứng yên trên dây. Lực căng dây bằng bao nhiêu? (g=9.8)
2. Bài Atwood với m₁ = 2 kg, m₂ = 8 kg. Tính gia tốc hệ.

<details><summary>Đáp án</summary>

1. Đứng yên → T = trọng lượng = m·g = 5·9.8 = **49 N**.
2. a = (m₂−m₁)·g/(m₁+m₂) = (8−2)·9.8/(2+8) = 6·9.8/10 = **5.88 m/s²**.

</details>

### 📝 Tóm tắt mục 5

- T = lực dọc dây, chỉ kéo (không đẩy).
- Dây lý tưởng: T hằng số mọi điểm.

---

## 6. Tổng hợp — Bài toán nhiều lực

💡 **Trực giác / Hình dung**: bài toán nhiều lực giống "kế toán" — bạn liệt kê mọi lực "thu" và "chi" theo từng trục, cộng lại ra "số dư" (hợp lực), rồi chia cho m ra gia tốc. Mẹo trên mặt nghiêng: xoay hệ trục theo mặt dốc (một trục dọc dốc, một trục vuông góc dốc) → chỉ trọng lực phải tách thành phần, mọi lực khác đã sẵn nằm trên trục.

### Walk-through — Vật trên mặt phẳng nghiêng có ma sát

Vật 5 kg trên mặt nghiêng 30°, μ_k = 0.2. Tính gia tốc trượt xuống.

**FBD**:
- W = 5·9.8 = 49 N (xuống thẳng đứng).
- N = W·cosθ = 49·cos30° = 42.4 N (vuông góc mặt).
- f_k = μ_k·N = 0.2·42.4 = 8.48 N (ngược chiều trượt, tức hướng lên dốc).
- W·sinθ = 49·sin30° = 24.5 N (kéo xuống dốc).

**Áp dụng F = m·a theo trục song song dốc** (chiều xuống dốc dương):
- m·a = W·sinθ − f_k = 24.5 − 8.48 = 16.02 N.
- **a = 16.02/5 = 3.2 m/s²**.

Nếu không có ma sát (μ = 0): a = g·sinθ = 4.9 m/s² (lớn hơn, đúng).

### ⚠ Lỗi thường gặp

- **Dùng N = m·g để tính ma sát trên dốc**: SAI. Trên dốc N = m·g·cosθ. Phản ví dụ: ở 30°, dùng N = mg cho f_k = μ·mg = 0.2·49 = 9.8 N, trong khi đúng là μ·mg·cosθ = 8.48 N.
- **Cho ma sát hướng "xuống dốc"**: ma sát luôn **chống lại** chuyển động/xu hướng. Vật trượt xuống → ma sát hướng **lên dốc**. Phải xác định chiều chuyển động trước.
- **Cộng các lực không cùng trục**: mg·sinθ (dọc dốc) và N (vuông góc dốc) ở hai trục khác nhau — không cộng trực tiếp. Áp F = m·a riêng từng trục.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Làm sao biết vật có trượt hay đứng yên trên dốc?"* So sánh thành phần kéo xuống (mg·sinθ) với ma sát tĩnh tối đa (μ_s·mg·cosθ). Nếu mg·sinθ > μ_s·mg·cosθ (tức tanθ > μ_s) → trượt; ngược lại đứng yên.
- *"Vì sao có ma sát thì gia tốc nhỏ hơn?"* Vì ma sát hướng lên dốc, chống lại thành phần kéo xuống → hợp lực dọc dốc nhỏ hơn → a nhỏ hơn. Không ma sát: a = g·sinθ = 4.9; có ma sát: chỉ 3.2 m/s².
- *"Nếu dốc đứng (θ = 90°) thì sao?"* sinθ = 1, cosθ = 0 → N = 0, không còn ma sát, a = g = 9.8 m/s² (rơi tự do). Hợp lý: dốc thẳng đứng = rơi tự do.

🔁 **Dừng lại tự kiểm tra**

1. Vật trên dốc 37°, μ_s = 0.5. Vật có tự trượt không? (cho tan37° ≈ 0.75)
2. Vật 4 kg trên dốc 30°, μ_k = 0.1, đang trượt xuống. Tính gia tốc. (g=9.8)

<details><summary>Đáp án</summary>

1. tanθ = 0.75 > μ_s = 0.5 → mg·sinθ > μ_s·mg·cosθ → **vật tự trượt**.
2. mg·sinθ = 4·9.8·0.5 = 19.6 N; N = 4·9.8·cos30° = 33.95 N; f_k = 0.1·33.95 = 3.4 N. a = (19.6−3.4)/4 = **4.05 m/s²**.

</details>

### 📝 Tóm tắt mục 6

- Bài nhiều lực: chọn trục → tách trọng lực thành phần (dọc + vuông góc dốc) → áp F = m·a từng trục.
- Trên dốc: kéo xuống = mg·sinθ, ép vào mặt = mg·cosθ → N = mg·cosθ, f_k = μ_k·mg·cosθ.
- Ma sát luôn ngược chiều chuyển động → vật trượt xuống thì ma sát hướng lên dốc.

---

## 7. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Tính lực hấp dẫn giữa Trái Đất (5.97 × 10²⁴ kg) và Mặt Trăng (7.35 × 10²² kg) cách nhau 3.84 × 10⁸ m.

**Bài 2**: Hộp 20 kg trên sàn, μ_s = 0.5, μ_k = 0.3. Tính:
a) Lực ngang tối thiểu để hộp bắt đầu trượt.
b) Sau khi trượt, nếu lực đẩy = 80 N, gia tốc bằng bao nhiêu?

**Bài 3**: Lò xo có k = 200 N/m. Treo vật 2 kg vào, lò xo giãn bao nhiêu?

**Bài 4**: Bài toán Atwood với m₁ = 4 kg, m₂ = 6 kg. Tính a và T.

**Bài 5**: Vật 10 kg trên mặt nghiêng 45° có μ_k = 0.1. Tính gia tốc trượt xuống.

**Bài 6**: Vì sao xe hơi đi trên đường ướt phanh kém hơn đường khô?

### Lời giải

**Bài 1**: F = 6.674 × 10⁻¹¹ × 5.97 × 10²⁴ × 7.35 × 10²² / (3.84 × 10⁸)² ≈ **1.98 × 10²⁰ N**. (Lực này giữ Mặt Trăng quay quanh Trái Đất.)

**Bài 2**:
- a) N = m·g = 196 N. f_s_max = 0.5 × 196 = **98 N**. Cần đẩy ít nhất 98 N.
- b) Khi đang trượt: f_k = 0.3 × 196 = 58.8 N. Tổng lực = 80 − 58.8 = 21.2 N. **a = 21.2/20 = 1.06 m/s²**.

**Bài 3**: Cân bằng: k·x = m·g → x = 2·9.8/200 = 0.098 m = **9.8 cm**.

**Bài 4**: a = (6 − 4)·9.8 / (4 + 6) = **1.96 m/s²**. T = 4·(9.8 + 1.96) = **47.04 N**.

**Bài 5**: 
- W·sinθ = 10·9.8·sin45° = 69.3 N.
- N = W·cosθ = 69.3 N (cos45° = sin45°).
- f_k = 0.1·69.3 = 6.93 N.
- a = (69.3 − 6.93)/10 = **6.24 m/s²**.

**Bài 6**: Hệ số ma sát μ giữa lốp xe và bê tông ướt (~ 0.5) nhỏ hơn bê tông khô (~ 0.8). Lực ma sát phanh xe = μ·N → nhỏ hơn khi đường ướt → quãng đường phanh dài hơn → khó dừng đột ngột. Đó là lý do trời mưa lái xe phải giảm tốc, giữ khoảng cách an toàn lớn hơn.

---

## 8. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 04 — Công &amp; năng lượng](../lesson-04-work-energy/) — định luật bảo toàn năng lượng.

---

## 📝 Tổng kết Lesson 03

1. **Trọng lực F_g = m·g** = m·G·M/r² (định luật vạn vật hấp dẫn).
2. **Phản lực N** vuông góc bề mặt, tự điều chỉnh để giữ cân bằng.
3. **Ma sát**: f_s ≤ μ_s·N (tĩnh, chỉ đủ giữ yên); f_k = μ_k·N (động, hằng số). μ_k < μ_s.
4. **Hooke**: F = −k·x, chỉ tuyến tính ở biến dạng nhỏ.
5. **Lực căng dây T**: dọc dây, chỉ kéo. Dây lý tưởng có T đều.

**Tiếp theo**: [Lesson 04 — Công &amp; năng lượng](../lesson-04-work-energy/)
`;
