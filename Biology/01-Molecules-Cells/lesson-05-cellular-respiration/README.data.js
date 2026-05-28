// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Biology/01-Molecules-Cells/lesson-05-cellular-respiration/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — Hô hấp tế bào

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **hô hấp tế bào (cellular respiration)** là quá trình "đốt cháy có kiểm soát" glucose để nhả năng lượng vào **ATP** — và vì sao tế bào không đốt một phát mà chia thành nhiều bước nhỏ.
- Viết và cân bằng được **phương trình tổng quát**: \`C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + năng lượng\`, hiểu đây là phản ứng **oxy hóa-khử (redox)**.
- Mô tả 3 giai đoạn — **đường phân (glycolysis)**, **chu trình Krebs (citric acid cycle)**, **chuỗi truyền electron (electron transport chain)** — biết mỗi giai đoạn xảy ra **ở đâu** trong tế bào và **sản phẩm** là gì.
- **Kiểm kê ATP**: tính chính xác tổng ATP thu được từ 1 glucose theo cả quy ước hiện đại (~32) lẫn quy ước sách cũ (~38), và giải thích vì sao có 2 con số.
- Phân biệt **hô hấp hiếu khí** (có O₂, ~32 ATP) với **lên men (fermentation)** (thiếu O₂, chỉ 2 ATP) — lactic và rượu.
- Tính **hiệu suất năng lượng** của hô hấp và so sánh với động cơ.

## Kiến thức tiền đề

- **ATP, ADP, enzyme, phản ứng thu/tỏa năng lượng** — [\`Lesson 04 — Enzyme & chuyển hóa\`](../lesson-04-enzymes-metabolism/). Hô hấp là chuỗi phản ứng được enzyme xúc tác, nạp năng lượng vào ATP.
- **Ti thể (mitochondria)** — [\`Lesson 02 — Cấu trúc tế bào\`](../lesson-02-cell-structure/). Hai giai đoạn cuối của hô hấp diễn ra trong ti thể; nhớ phân biệt **chất nền (matrix)** và **màng trong (inner membrane)**.
- **Glucose \`C₆H₁₂O₆\`** — [\`Lesson 01 — Phân tử sinh học\`](../lesson-01-biomolecules/). Glucose là "nhiên liệu" chính của hô hấp.
- **Phản ứng oxy hóa-khử (redox)** — [\`Chemistry/02-Reactions-Thermo/lesson-02-redox\`](../../../Chemistry/02-Reactions-Thermo/lesson-02-redox/). "Mất electron = bị oxy hóa, nhận electron = bị khử"; glucose bị oxy hóa, O₂ bị khử.
- **Nhiệt hóa học, ΔG, năng lượng tỏa ra** — [\`Chemistry/02-Reactions-Thermo/lesson-04-thermochemistry\`](../../../Chemistry/02-Reactions-Thermo/lesson-04-thermochemistry/). ΔG ≈ −686 kcal/mol cho biết hô hấp tỏa năng lượng mạnh.

---

## 1. Hô hấp tế bào là gì? Bức tranh tổng quát

### 💡 Trực giác / Hình dung

Hãy hình dung glucose như một **thanh củi**. Bạn có thể đốt nó một phát — ngọn lửa bùng lên, năng lượng thoát ra hết dưới dạng **nhiệt**, không giữ lại được gì hữu ích (đây là "đốt cháy" hóa học thông thường). Hoặc bạn có thể **đốt từng mẩu nhỏ một**, mỗi mẩu chỉ nhả một ít năng lượng, và bạn kịp **hứng phần lớn năng lượng đó vào pin sạc (ATP)** thay vì để bay đi hết. Hô hấp tế bào chính là cách thứ hai: oxy hóa glucose **từng bước nhỏ**, mỗi bước do một enzyme điều khiển, để **nạp được năng lượng vào ATP** thay vì lãng phí thành nhiệt.

### 1.1. Định nghĩa và phương trình tổng quát

**Hô hấp tế bào** là chuỗi phản ứng phân giải glucose (và các nhiên liệu khác) với sự tham gia của oxy, giải phóng năng lượng và nạp phần lớn vào **ATP** — đồng tiền năng lượng của tế bào (Lesson 04).

Phương trình tổng quát (hô hấp hiếu khí):

\`\`\`
C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + năng lượng (~36–38 ATP)
\`\`\`

**Kiểm tra cân bằng nguyên tử**:
- C: vế trái 6 (trong glucose) = vế phải 6 (trong 6 CO₂) ✓
- H: vế trái 12 (glucose) = vế phải 12 (trong 6 H₂O) ✓
- O: vế trái 6 (glucose) + 12 (6 O₂) = 18 = vế phải 12 (6 CO₂) + 6 (6 H₂O) = 18 ✓

Năng lượng tự do giải phóng: **ΔG ≈ −686 kcal/mol glucose** (dấu âm = tỏa năng lượng, phản ứng tự diễn ra — xem nhiệt hóa học ở Chemistry).

### 1.2. Đây là một phản ứng oxy hóa-khử (redox)

> **(a) Là gì** — *redox* (oxy hóa-khử) là phản ứng trong đó electron **chuyển** từ chất này sang chất khác. Chất **mất** electron bị **oxy hóa**; chất **nhận** electron bị **khử**. Nhớ mẹo "**OIL RIG**": Oxidation Is Loss, Reduction Is Gain.
>
> **(b) Vì sao quan trọng ở đây** — toàn bộ năng lượng của hô hấp đến từ việc electron "rơi" từ glucose (mức năng lượng cao) xuống oxy (mức năng lượng thấp). Năng lượng giải phóng trong cú "rơi" đó được dùng để tạo ATP. Không có redox thì không có năng lượng.
>
> **(c) Ví dụ trực giác bằng số** — trong glucose, carbon ở trạng thái khá "khử" (số oxy hóa trung bình của C ≈ 0). Sau hô hấp, carbon nằm trong CO₂ (số oxy hóa của C = +4) → carbon **bị oxy hóa** (mất electron). Đồng thời O₂ (số oxy hóa O = 0) → H₂O (số oxy hóa O = −2) → oxy **bị khử** (nhận electron). 24 electron của glucose lần lượt được trao cho O₂.

Electron không nhảy thẳng từ glucose sang O₂. Chúng được **chất mang trung gian** đón: chủ yếu là **NAD⁺ → NADH** và **FAD → FADH₂**. Hãy coi NADH và FADH₂ là "xe tải chở electron + năng lượng" từ các giai đoạn đầu tới chuỗi truyền electron, nơi năng lượng đó được "rút ra" để làm ATP.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao phải chia nhỏ thành nhiều bước? Sao không oxy hóa glucose một phát cho nhanh?**
A: Vì oxy hóa một phát (như đốt củi) nhả ra **686 kcal cùng lúc** chủ yếu thành nhiệt — tế bào không kịp "hứng" vào ATP, lại còn quá nóng có thể làm hỏng (biến tính) protein. Chia thành ~20 bước nhỏ, mỗi bước nhả một ít năng lượng vừa đủ để nạp 1 phân tử ATP (cần ~7.3 kcal/mol), giúp **thu hồi năng lượng có hệ thống** thay vì lãng phí.

**Q: NADH và FADH₂ từ đâu ra và để làm gì?**
A: Chúng được tạo ra ở đường phân và Krebs khi glucose **bị oxy hóa** (NAD⁺ nhận electron → NADH). Chúng mang electron + năng lượng đến **chuỗi truyền electron** (giai đoạn 3), nơi năng lượng được dùng để tạo ra phần lớn ATP. Có thể coi 1 NADH ≈ 2.5 ATP và 1 FADH₂ ≈ 1.5 ATP (sẽ kiểm kê chi tiết ở mục 5).

### ⚠ Lỗi thường gặp

- **Nghĩ "hô hấp = thở"**: thở (hô hấp ngoài) chỉ là trao đổi khí ở phổi. **Hô hấp tế bào** là quá trình hóa học bên trong từng tế bào — đốt glucose lấy ATP. Thở chỉ cung cấp O₂ và thải CO₂ cho quá trình này.
- **Quên rằng đây là redox**: nếu chỉ nhớ "glucose + O₂ → CO₂ + H₂O" mà không hiểu electron chuyển từ glucose sang O₂, bạn sẽ không hiểu năng lượng đến từ đâu.
- **Tưởng O₂ tham gia ngay từ đầu**: O₂ chỉ được dùng ở **bước cuối cùng** (chuỗi truyền electron), làm chất nhận electron cuối. Đường phân và Krebs không trực tiếp dùng O₂.

### 🔁 Dừng lại tự kiểm tra

1. Trong hô hấp tế bào, chất nào bị oxy hóa, chất nào bị khử?
2. Nếu ΔG = −686 kcal/mol và tạo ~32 ATP, mỗi ATP "trả" khoảng bao nhiêu kcal nếu mỗi ATP lưu ~7.3 kcal/mol? Phần năng lượng còn lại đi đâu?

<details>
<summary>Đáp án</summary>

1. **Glucose bị oxy hóa** (mất electron, carbon từ số oxy hóa ~0 lên +4 trong CO₂); **O₂ bị khử** (nhận electron, O từ 0 xuống −2 trong H₂O).
2. Năng lượng lưu vào ATP = 32 × 7.3 ≈ **234 kcal**. Phần còn lại 686 − 234 ≈ **452 kcal tỏa ra dưới dạng nhiệt** (giữ ấm cơ thể). Hiệu suất ≈ 234/686 ≈ 34% (xem mục 6).
</details>

### 📝 Tóm tắt mục 1

- Hô hấp tế bào = oxy hóa glucose **từng bước nhỏ** để nạp năng lượng vào ATP, thay vì đốt một phát lãng phí thành nhiệt.
- Phương trình: \`C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + năng lượng\`, ΔG ≈ −686 kcal/mol.
- Đây là phản ứng **redox**: glucose bị oxy hóa, O₂ bị khử; electron được NADH/FADH₂ vận chuyển tới chuỗi truyền electron.

---

## 2. Giai đoạn 1 — Đường phân (Glycolysis)

### 💡 Trực giác / Hình dung

Đường phân giống **bước "mồi" của một cỗ máy**: bạn phải **bỏ vào 2 đồng xu (2 ATP)** trước để khởi động, rồi máy chạy và **nhả ra 4 đồng xu (4 ATP)**. Lãi ròng = 4 − 2 = **2 ATP**. Bước này diễn ra ngay trong **bào tương (cytoplasm)**, không cần ti thể, không cần O₂ — nên đây là cách cổ xưa nhất mà mọi tế bào (kể cả vi khuẩn kỵ khí) đều dùng được.

### 2.1. Diễn biến

**Đường phân** cắt 1 phân tử glucose (6 carbon) thành **2 phân tử pyruvate** (mỗi cái 3 carbon). Trên đường đi:

- **Pha đầu tư (đầu)**: tiêu **2 ATP** để "hoạt hóa" glucose (gắn phosphate, làm nó dễ phản ứng).
- **Pha thu hoạch (sau)**: tạo **4 ATP** (bằng cơ chế **substrate-level**, tức enzyme chuyển trực tiếp phosphate vào ADP) và **2 NADH** (NAD⁺ nhận electron từ glucose).

| Mục | Đầu tư | Tạo ra | Ròng |
|-----|:------:|:------:|:----:|
| ATP | −2 | +4 | **+2** |
| NADH | 0 | +2 | **+2** |
| Pyruvate | — | 2 (mỗi cái 3C) | 2 |

**Vị trí**: bào tương (cytoplasm). **Cần O₂?** Không.

### 2.2. Bốn ví dụ số

**Ví dụ 1 — 1 glucose**: thu ròng **2 ATP + 2 NADH + 2 pyruvate**.

**Ví dụ 2 — 3 glucose**: 3 × 2 = **6 ATP ròng**, 3 × 2 = **6 NADH**, 3 × 2 = **6 pyruvate**.

**Ví dụ 3 — kiểm tra cân bằng carbon**: 1 glucose có 6 C; 2 pyruvate có 2 × 3 = 6 C ✓. Không mất carbon ở giai đoạn này (chưa thải CO₂).

**Ví dụ 4 — tổng ATP gộp (gross) cho 5 glucose**: gross = 5 × 4 = 20 ATP tạo ra, đầu tư = 5 × 2 = 10 ATP → ròng = **10 ATP**. (Lưu ý phân biệt "gross 4" với "ròng 2".)

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao phải "tốn" 2 ATP trước khi kiếm được ATP?**
A: Glucose vốn khá "trơ", khó bị cắt. Tế bào gắn 2 nhóm phosphate (lấy từ 2 ATP) để biến nó thành phân tử **giàu năng lượng và bất ổn**, dễ vỡ thành 2 mảnh. Đây là khoản "đầu tư mồi" — giống bỏ vốn để bắt đầu kinh doanh.

**Q: Đường phân có cần O₂ không?**
A: **Không**. Đây là điểm cực kỳ quan trọng: đường phân chạy được cả khi không có O₂. Khi thiếu O₂, tế bào chỉ dựa vào đường phân + lên men để sống (xem mục 7). Cũng vì thế người ta tin đường phân là con đường tiến hóa cổ nhất, có từ trước khi khí quyển có O₂.

### ⚠ Lỗi thường gặp

- **Nhầm "ròng" với "gross"**: đường phân tạo **gross 4 ATP** nhưng tốn 2 → **ròng chỉ 2 ATP**. Đề bài thường hỏi ròng.
- **Quên 2 NADH**: nhiều người chỉ nhớ "2 ATP" mà quên 2 NADH — sau này 2 NADH này cho thêm ~5 ATP ở chuỗi truyền electron, nên rất đáng kể.
- **Tưởng glucose biến thành CO₂ ngay**: chưa. Sản phẩm của đường phân là **pyruvate (3C)**, chưa có CO₂.

### 🔁 Dừng lại tự kiểm tra

1. Đường phân của 4 glucose cho ròng bao nhiêu ATP, bao nhiêu NADH, bao nhiêu pyruvate?
2. Vì sao đường phân được coi là con đường "phổ quát" cho mọi sinh vật?

<details>
<summary>Đáp án</summary>

1. 4 × 2 = **8 ATP ròng**; 4 × 2 = **8 NADH**; 4 × 2 = **8 pyruvate**.
2. Vì nó diễn ra trong bào tương, **không cần ti thể, không cần O₂** — nên cả vi khuẩn kỵ khí, nấm men, lẫn tế bào người đều dùng được. Nó là bước chung cho cả hô hấp hiếu khí và lên men.
</details>

### 📝 Tóm tắt mục 2

- Đường phân: glucose (6C) → 2 pyruvate (3C), ở **bào tương**, **không cần O₂**.
- Thu ròng mỗi glucose: **2 ATP + 2 NADH** (gross 4 ATP, đầu tư 2 ATP).
- Chưa thải CO₂; là bước chung của cả hô hấp hiếu khí lẫn lên men.

---

## 3. Giai đoạn 2 — Oxy hóa pyruvate & chu trình Krebs

### 💡 Trực giác / Hình dung

Nếu đường phân là "chặt thanh củi làm đôi", thì chu trình Krebs là **lò xay nghiền nốt từng mảnh thành tro** — bẻ hết carbon của pyruvate ra thành CO₂, đồng thời "vắt kiệt" electron còn lại vào các xe tải NADH/FADH₂. Krebs là một **vòng tròn** (cycle): chất khởi đầu được tái tạo ở cuối vòng để đón mẻ mới — giống một dây chuyền quay tròn liên tục.

### 3.1. Bước chuyển tiếp: pyruvate → acetyl-CoA

Trước khi vào Krebs, mỗi **pyruvate (3C)** vào **chất nền ti thể (matrix)** và bị oxy hóa:

\`\`\`
pyruvate (3C) → acetyl-CoA (2C) + CO₂ + NADH
\`\`\`

- Mất **1 C** (thành 1 CO₂) → đây là CO₂ **đầu tiên** thải ra.
- Tạo **1 NADH**.

Vì mỗi glucose cho **2 pyruvate**, bước này (× 2) tạo **2 NADH + 2 CO₂**.

### 3.2. Chu trình Krebs (mỗi glucose chạy 2 vòng)

Mỗi **acetyl-CoA (2C)** nhập vòng, và sau 1 vòng nhả ra (per 1 vòng):

| Sản phẩm / 1 vòng | × 2 vòng (mỗi glucose) |
|-------------------|:----------------------:|
| 3 NADH | 6 NADH |
| 1 FADH₂ | 2 FADH₂ |
| 1 ATP (substrate-level) | 2 ATP |
| 2 CO₂ | 4 CO₂ |

**Vị trí**: chất nền ti thể (matrix). **Cần O₂?** Không trực tiếp (nhưng cần O₂ ở giai đoạn sau để "đổ" NADH).

### 3.3. Kiểm kê carbon — mọi carbon của glucose đã thành CO₂

| Nguồn CO₂ | Số CO₂ |
|-----------|:------:|
| Bước pyruvate → acetyl-CoA (× 2) | 2 |
| Krebs (× 2 vòng) | 4 |
| **Tổng** | **6** |

6 CO₂ — đúng bằng 6 carbon của 1 glucose ✓. Vậy **sau Krebs, toàn bộ carbon của glucose đã bị oxy hóa hết thành CO₂**. Năng lượng giờ nằm trong 10 NADH + 2 FADH₂ (chờ chuỗi truyền electron rút ra).

### 3.4. Bốn ví dụ số

**Ví dụ 1 — CO₂ từ 1 glucose**: 2 (chuyển tiếp) + 4 (Krebs) = **6 CO₂** ✓ (= số carbon glucose).

**Ví dụ 2 — NADH từ 1 glucose tính tới hết Krebs**: 2 (đường phân) + 2 (chuyển tiếp) + 6 (Krebs) = **10 NADH**.

**Ví dụ 3 — FADH₂ từ 2 glucose**: mỗi glucose 2 FADH₂ → 2 × 2 = **4 FADH₂**.

**Ví dụ 4 — CO₂ từ 10 glucose**: 10 × 6 = **60 CO₂** thải ra (và cần 10 × 6 = 60 O₂).

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao gọi là "chu trình"?**
A: Vì chất đón acetyl-CoA ở đầu vòng (oxaloacetate, 4C) được **tái tạo** ở cuối vòng để đón acetyl-CoA tiếp theo. Vòng quay liên tục không cần tổng hợp lại chất khởi đầu — rất tiết kiệm.

**Q: CO₂ mình thở ra đến từ đâu trong glucose?**
A: Chính từ bước **pyruvate → acetyl-CoA** và **chu trình Krebs**. Mỗi glucose nhả đúng 6 CO₂ ở 2 giai đoạn này. Đường phân (giai đoạn 1) chưa nhả CO₂ nào.

### ⚠ Lỗi thường gặp

- **Quên nhân đôi**: mỗi glucose cho **2 pyruvate** → bước chuyển tiếp và Krebs đều phải **× 2**. Quên nhân 2 là lỗi kiểm kê phổ biến nhất.
- **Tính ATP của Krebs là chính**: Krebs chỉ tạo **2 ATP trực tiếp** cho mỗi glucose; "tài sản thật" của Krebs là **NADH + FADH₂** (sẽ thành nhiều ATP ở giai đoạn 3).
- **Tưởng Krebs cần O₂ trực tiếp**: Krebs không dùng O₂ trong các phản ứng của nó, nhưng nó **phụ thuộc** O₂ gián tiếp — nếu chuỗi truyền electron tắc (thiếu O₂), NADH không được "đổ" lại thành NAD⁺ → Krebs cũng dừng.

### 🔁 Dừng lại tự kiểm tra

1. Một glucose đi hết tới cuối Krebs tạo tổng cộng bao nhiêu NADH, FADH₂, ATP trực tiếp, và CO₂?
2. Nếu một tế bào thải ra 30 phân tử CO₂ từ hô hấp hiếu khí, nó đã oxy hóa hết mấy phân tử glucose?

<details>
<summary>Đáp án</summary>

1. **NADH** = 2 (đường phân) + 2 (chuyển tiếp) + 6 (Krebs) = **10**; **FADH₂** = **2**; **ATP trực tiếp** = 2 (đường phân) + 2 (Krebs) = **4**; **CO₂** = **6**.
2. Mỗi glucose thải 6 CO₂ → 30 / 6 = **5 glucose**.
</details>

### 📝 Tóm tắt mục 3

- Pyruvate → acetyl-CoA (ở matrix): thải 2 CO₂, tạo 2 NADH (per glucose).
- Krebs chạy **2 vòng** mỗi glucose: tạo 6 NADH + 2 FADH₂ + 2 ATP + 4 CO₂.
- Sau Krebs, **cả 6 carbon glucose đã thành CO₂**; năng lượng nằm trong **10 NADH + 2 FADH₂**.

---

## 4. Giai đoạn 3 — Chuỗi truyền electron & phosphoryl hóa oxy hóa

### 💡 Trực giác / Hình dung

Hãy hình dung electron như **nước trên đỉnh thác**. NADH và FADH₂ đổ electron vào "đỉnh thác" (đầu chuỗi). Electron **rơi dần xuống** qua một loạt "bậc thang" protein trên **màng trong ti thể (inner membrane)**, ở mỗi bậc nhả một ít năng lượng. Năng lượng đó được dùng để **bơm H⁺** sang phía bên kia màng — giống dùng nước thác để **bơm nước lên một hồ chứa cao**. Khi H⁺ chảy ngược trở lại qua "tua-bin" **ATP synthase**, nó quay tua-bin tạo ATP — đúng như đập thủy điện. Cuối thác, electron "kiệt sức" được **O₂ đón** (cùng H⁺) tạo thành **H₂O**. Nếu không có O₂ đứng cuối hứng electron, cả thác bị "tắc" và dừng lại.

### 4.1. Cơ chế

1. **NADH và FADH₂ nhường electron** cho các phức hệ protein trên màng trong ti thể.
2. Electron đi qua chuỗi, năng lượng giải phóng được dùng để **bơm H⁺ từ matrix ra khoảng gian màng** → tạo **gradient nồng độ H⁺** (giống tích nước sau đập).
3. H⁺ chảy ngược qua enzyme **ATP synthase** → quay "tua-bin" → tổng hợp ATP. Đây gọi là **phosphoryl hóa oxy hóa (oxidative phosphorylation)** / cơ chế **hóa thẩm (chemiosmosis)**.
4. **O₂ là chất nhận electron cuối cùng**: nhận electron đã "kiệt năng lượng" + H⁺ → tạo **H₂O**. (Đây là chỗ duy nhất O₂ tham gia, và là nơi 6 H₂O của phương trình tổng được tạo ra.)

**Vị trí**: màng trong ti thể (inner membrane). **Cần O₂?** **Có** — bắt buộc.

### 4.2. Quy đổi NADH/FADH₂ ra ATP

Quy ước **hiện đại** (đo thực nghiệm, có hao hụt khi vận chuyển H⁺):

- **1 NADH ≈ 2.5 ATP**
- **1 FADH₂ ≈ 1.5 ATP** (FADH₂ "đổ" electron vào chuỗi ở bậc thấp hơn NADH → bơm được ít H⁺ hơn → ít ATP hơn)

Quy ước **sách cũ** (làm tròn lý thuyết): 1 NADH = 3 ATP, 1 FADH₂ = 2 ATP. Khác biệt này là nguồn gốc của hai con số "32" và "38" (mục 5).

### 4.3. Bốn ví dụ số

**Ví dụ 1 — ATP từ 10 NADH (quy ước hiện đại)**: 10 × 2.5 = **25 ATP**.

**Ví dụ 2 — ATP từ 2 FADH₂ (hiện đại)**: 2 × 1.5 = **3 ATP**.

**Ví dụ 3 — ATP từ 10 NADH (quy ước cũ)**: 10 × 3 = **30 ATP** (so với 25 ở quy ước mới).

**Ví dụ 4 — vì sao FADH₂ < NADH**: nếu cả 12 chất mang đều là NADH thì = 12 × 2.5 = 30 ATP; nhưng vì 2 trong số đó là FADH₂ (chỉ 1.5 mỗi cái) nên = 10×2.5 + 2×1.5 = 25 + 3 = **28 ATP** từ chuỗi truyền electron — ít hơn 2 ATP so với trường hợp toàn NADH.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao thiếu O₂ thì chết nhanh?**
A: Vì O₂ là **chất nhận electron cuối**. Không có O₂, electron không có chỗ "đổ" → chuỗi tắc → H⁺ không được bơm → ATP synthase dừng → **không tạo được ~28/32 ATP**. Tệ hơn, NADH không được tái oxy hóa thành NAD⁺ → Krebs và (phần lớn) đường phân cũng dừng. Tế bào chỉ còn 2 ATP từ lên men — không đủ cho não/tim, nên ngạt thở gây tử vong nhanh.

**Q: Xyanua (cyanide) giết người bằng cách nào?**
A: Xyanua **chặn phức hệ cuối** của chuỗi truyền electron (chỗ trao electron cho O₂). Dù có đủ O₂, electron vẫn không qua được → chuỗi tắc giống như ngạt → chết. Đây là minh chứng O₂ chỉ hữu ích khi chuỗi thông suốt.

**Q: Vì sao FADH₂ cho ít ATP hơn NADH?**
A: FADH₂ đưa electron vào chuỗi ở **một bậc thấp hơn** NADH (bỏ qua phức hệ bơm H⁺ đầu tiên). Ít phức hệ được dùng → ít H⁺ được bơm → ít ATP hơn (1.5 so với 2.5).

### ⚠ Lỗi thường gặp

- **Tưởng ATP tạo trực tiếp khi electron chạy**: không. Electron chạy chỉ để **bơm H⁺**; ATP được tạo riêng tại **ATP synthase** khi H⁺ chảy ngược. Đây là cơ chế gián tiếp (hóa thẩm).
- **Quên O₂ thành H₂O**: O₂ không "biến mất" — nó nhận electron + H⁺ thành **H₂O** (6 H₂O trong phương trình tổng đến từ đây).
- **Dùng lẫn lộn 2 quy ước**: hoặc dùng cả bộ (2.5/1.5) hoặc cả bộ (3/2), **không trộn** — trộn ra số sai.

### 🔁 Dừng lại tự kiểm tra

1. Theo quy ước hiện đại, 10 NADH + 2 FADH₂ cho bao nhiêu ATP qua chuỗi truyền electron?
2. Vì sao chất độc chặn chuỗi truyền electron lại nguy hiểm dù người vẫn hít thở bình thường?

<details>
<summary>Đáp án</summary>

1. 10 × 2.5 + 2 × 1.5 = 25 + 3 = **28 ATP**.
2. Vì hít thở chỉ đưa O₂ vào máu, nhưng nếu chuỗi truyền electron bị chặn thì O₂ **không nhận được electron** → chuỗi tắc → không tạo ATP. Tế bào "chết đói năng lượng" dù xung quanh đầy O₂.
</details>

### 📝 Tóm tắt mục 4

- Chuỗi truyền electron ở **màng trong ti thể**: NADH/FADH₂ nhường electron → bơm H⁺ tạo gradient → ATP synthase tạo ATP (hóa thẩm). **Cần O₂**.
- **O₂ là chất nhận electron cuối** → tạo H₂O. Thiếu O₂ hay bị xyanua chặn → chuỗi tắc, ngừng tạo ATP.
- Quy đổi: 1 NADH ≈ 2.5 ATP, 1 FADH₂ ≈ 1.5 ATP (hiện đại); 3 và 2 (sách cũ).

---

## 5. Kiểm kê ATP tổng — vì sao có 32 và 38?

### 💡 Trực giác / Hình dung

Hãy coi việc tính ATP như **kiểm kê sổ thu chi**: cộng tất cả "tiền mặt" (ATP trực tiếp) và quy đổi "phiếu nợ" (NADH, FADH₂) ra tiền mặt theo tỉ giá. Hai con số 32 và 38 chỉ khác nhau ở **tỉ giá quy đổi** chứ không khác về số phiếu nợ.

### 5.1. Bảng kiểm kê chi tiết (per 1 glucose)

| Giai đoạn | ATP trực tiếp | NADH | FADH₂ |
|-----------|:------------:|:----:|:-----:|
| Đường phân (bào tương) | 2 | 2 | 0 |
| Pyruvate → acetyl-CoA (matrix) | 0 | 2 | 0 |
| Chu trình Krebs (matrix) | 2 | 6 | 2 |
| **Tổng số chất mang** | **4** | **10** | **2** |

### 5.2. Quy đổi theo 2 quy ước

**Quy ước hiện đại (1 NADH = 2.5; 1 FADH₂ = 1.5):**

| Nguồn | Phép tính | ATP |
|-------|-----------|:---:|
| ATP trực tiếp | 4 | 4 |
| Từ NADH | 10 × 2.5 | 25 |
| Từ FADH₂ | 2 × 1.5 | 3 |
| **Tổng** | | **32 ATP** |

**Quy ước sách cũ (1 NADH = 3; 1 FADH₂ = 2):**

| Nguồn | Phép tính | ATP |
|-------|-----------|:---:|
| ATP trực tiếp | 4 | 4 |
| Từ NADH | 10 × 3 | 30 |
| Từ FADH₂ | 2 × 2 | 4 |
| **Tổng** | | **38 ATP** |

> **Vì sao có 36–38 trong sách cũ?** Sách cũ dùng tỉ giá làm tròn (3 và 2). Một số sách còn trừ đi "phí vận chuyển" 2 NADH từ đường phân (tạo ở bào tương) vào ti thể → ra **36** thay vì 38. Quy ước hiện đại đo thực tế thấy năng lượng hao hụt nên dùng 2.5 và 1.5, ra **~30–32**. Cả hai đều "đúng" — chỉ khác giả định. Bài này dùng **~32 (hiện đại)** làm mặc định, và nêu rõ khi dùng số khác.

### 5.3. Bốn ví dụ số (dùng quy ước hiện đại = 32)

**Ví dụ 1 — 1 glucose**: **32 ATP**.

**Ví dụ 2 — 2 glucose**: 2 × 32 = **64 ATP**, thải 2 × 6 = 12 CO₂, dùng 2 × 6 = 12 O₂.

**Ví dụ 3 — 5 glucose**: 5 × 32 = **160 ATP**, 5 × 6 = 30 CO₂, 5 × 6 = 30 O₂.

**Ví dụ 4 — 10 glucose**: 10 × 32 = **320 ATP**, 10 × 6 = 60 CO₂, 10 × 6 = 60 O₂. (Theo quy ước cũ thì 10 × 38 = 380 ATP.)

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Đề thi của tôi ghi 38, sách này ghi 32 — tôi theo cái nào?**
A: Theo **quy ước mà tài liệu/giáo viên của bạn dùng**, nhưng phải **nhất quán** và **nêu rõ tỉ giá**. Nếu đề không nói rõ, ghi cả hai và chú thích "32 theo quy ước hiện đại / 38 theo quy ước cũ". Quan trọng là hiểu cơ chế, không phải nhớ máy móc một con số.

**Q: Vì sao đường phân và Krebs chỉ cho 4 ATP mà cả quá trình lại ~32?**
A: Vì **~28 ATP còn lại đến từ chuỗi truyền electron** — nơi 10 NADH + 2 FADH₂ được "rút" thành ATP. Đó là lý do thiếu O₂ (làm tắc chuỗi) khiến ATP rớt từ 32 xuống chỉ còn 2.

### ⚠ Lỗi thường gặp

- **Cộng nhầm số NADH**: phải là **10** (2 + 2 + 6), không phải 8. Quên 2 NADH của bước chuyển tiếp pyruvate → acetyl-CoA là lỗi rất hay gặp.
- **Trộn tỉ giá**: dùng 2.5 cho NADH nhưng 2 cho FADH₂ → sai. Chọn một bộ và giữ nguyên.
- **Quên ATP trực tiếp**: nhớ cộng 4 ATP substrate-level (2 đường phân + 2 Krebs).

### 🔁 Dừng lại tự kiểm tra

1. Tính tổng ATP từ **3 glucose** theo quy ước hiện đại, kèm CO₂ và O₂.
2. Một bài toán cho tổng 10 NADH + 2 FADH₂ + 4 ATP trực tiếp. Tính ATP theo cả 2 quy ước.

<details>
<summary>Đáp án</summary>

1. ATP = 3 × 32 = **96 ATP**; CO₂ = 3 × 6 = **18**; O₂ = 3 × 6 = **18**.
2. Hiện đại: 4 + 10×2.5 + 2×1.5 = 4 + 25 + 3 = **32 ATP**. Cũ: 4 + 10×3 + 2×2 = 4 + 30 + 4 = **38 ATP**.
</details>

### 📝 Tóm tắt mục 5

- Per glucose: **4 ATP trực tiếp + 10 NADH + 2 FADH₂**.
- Hiện đại (2.5/1.5): 4 + 25 + 3 = **32 ATP**. Cũ (3/2): 4 + 30 + 4 = **38 ATP** (36 nếu trừ phí vận chuyển).
- ~28/32 ATP đến từ **chuỗi truyền electron** → giải thích vì sao thiếu O₂ làm ATP rớt thê thảm.

---

## 6. Hiệu suất năng lượng

### 💡 Trực giác / Hình dung

Không cỗ máy nào chuyển 100% năng lượng thành "công có ích" — luôn có phần thoát ra thành nhiệt. Hô hấp tế bào cũng vậy: nó "lãi" ~34% vào ATP, phần còn lại tỏa nhiệt **giữ ấm cơ thể** (nên đây không hẳn là "lãng phí" — bạn đang ấm 37°C nhờ phần nhiệt này).

### 6.1. Tính hiệu suất

- Năng lượng tổng glucose nhả ra: **686 kcal/mol**.
- Năng lượng lưu vào ATP (quy ước 32 ATP, mỗi ATP ~7.3 kcal/mol): 32 × 7.3 = **233.6 kcal/mol**.
- **Hiệu suất** = 233.6 / 686 ≈ **0.34 = 34%**.

### 6.2. Bốn ví dụ số & so sánh

**Ví dụ 1 — quy ước cũ (38 ATP)**: 38 × 7.3 / 686 = 277.4 / 686 ≈ **40%**.

**Ví dụ 2 — nếu chỉ lên men (2 ATP)**: 2 × 7.3 / 686 = 14.6 / 686 ≈ **2.1%** — phí phạm khủng khiếp.

**Ví dụ 3 — so với động cơ xăng**: động cơ ô tô ~**25%** hiệu suất; hô hấp ~34% → tế bào **hiệu quả hơn động cơ xăng**.

**Ví dụ 4 — nhiệt tỏa ra (quy ước 32)**: 686 − 233.6 = **452.4 kcal/mol** thoát ra dưới dạng nhiệt — chính phần này giữ thân nhiệt người ổn định ~37°C.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: 34% nghe thấp, có phải tế bào "kém"?**
A: Không. So với động cơ nhiệt (~25%) và bóng đèn sợi đốt (~5% thành ánh sáng), 34% là **rất cao** cho một hệ thống hóa học hoạt động ở nhiệt độ thấp (37°C, không phải hàng nghìn độ như động cơ). Hơn nữa phần nhiệt "thừa" không vô ích — nó giữ ấm cơ thể.

### ⚠ Lỗi thường gặp

- **Dùng nhầm số ATP khi tính hiệu suất**: phải thống nhất — nếu tính theo 32 ATP thì dùng 32, theo 38 thì dùng 38, ra hiệu suất khác nhau (34% vs 40%).
- **Quên 7.3 kcal/mol cho mỗi ATP**: đây là năng lượng tự do thủy phân ATP → ADP trong điều kiện chuẩn (xem Lesson 04).

### 🔁 Dừng lại tự kiểm tra

1. Tính hiệu suất nếu thu được 30 ATP/glucose.
2. Nếu một tế bào chuyển sang lên men, hiệu suất tụt từ ~34% xuống bao nhiêu? Số ATP giảm bao nhiêu lần?

<details>
<summary>Đáp án</summary>

1. 30 × 7.3 / 686 = 219 / 686 ≈ **32%**.
2. Lên men chỉ 2 ATP → hiệu suất ≈ 2 × 7.3 / 686 ≈ **2.1%**. Số ATP giảm từ 32 xuống 2, tức **giảm 16 lần** (xem mục 7).
</details>

### 📝 Tóm tắt mục 6

- Hiệu suất hô hấp ≈ **34%** (32 ATP × 7.3 / 686), cao hơn động cơ xăng (~25%).
- Phần năng lượng còn lại (~452 kcal/mol) tỏa nhiệt **giữ ấm cơ thể**, không hoàn toàn lãng phí.
- Lên men chỉ ~2% hiệu suất — kém xa hô hấp hiếu khí.

---

## 7. Hô hấp kỵ khí & lên men (Fermentation)

### 💡 Trực giác / Hình dung

Khi hết O₂, "thác nước" (chuỗi truyền electron) tắc, không ai đón NADH để biến lại thành NAD⁺. Mà **đường phân cần NAD⁺** để chạy (NAD⁺ là cái "xô rỗng" để hứng electron). Hết xô rỗng → đường phân cũng dừng → chết. **Lên men** là một mẹo cấp cứu: đổ electron của NADH vào một chất hữu cơ khác (pyruvate) để **tái tạo NAD⁺** — hy sinh năng lượng để giữ cho đường phân (2 ATP) tiếp tục chạy. Giống như khi mất điện lưới, bạn chạy máy phát nhỏ để giữ tối thiểu sự sống.

### 7.1. Mục đích và 2 kiểu lên men

Khi **thiếu O₂**, tế bào chỉ dùng **đường phân** (2 ATP) rồi **lên men** để **tái tạo NAD⁺** (không tạo thêm ATP):

| Kiểu lên men | Sản phẩm | Ở đâu / khi nào |
|--------------|----------|-----------------|
| **Lên men lactic** | acid lactic (lactate) | cơ người khi vận động mạnh thiếu O₂ → mỏi, đau |
| **Lên men rượu** | ethanol + CO₂ | nấm men (làm bánh mì, bia rượu) |

**Quan trọng**: lên men **không tạo thêm ATP** — toàn bộ 2 ATP đến từ đường phân. Vai trò của lên men chỉ là **tái sinh NAD⁺** để đường phân chạy tiếp.

### 7.2. So sánh hiếu khí vs lên men

| Tiêu chí | Hiếu khí (có O₂) | Lên men (thiếu O₂) |
|----------|:----------------:|:------------------:|
| ATP / glucose | ~32 | **2** |
| Dùng O₂? | Có | Không |
| Giai đoạn | đường phân + Krebs + chuỗi | chỉ đường phân |
| Sản phẩm cuối | CO₂ + H₂O | acid lactic **hoặc** ethanol + CO₂ |

### 7.3. Bốn ví dụ số

**Ví dụ 1 — chênh lệch ATP**: hiếu khí 32, lên men 2 → hiếu khí gấp **32 / 2 = 16 lần** lên men.

**Ví dụ 2 — để có 320 ATP**: hiếu khí cần 320 / 32 = **10 glucose**; lên men cần 320 / 2 = **160 glucose** → tốn gấp 16 lần nhiên liệu.

**Ví dụ 3 — vì sao chạy nước rút mỏi cơ**: cơ thiếu O₂ chuyển sang lên men lactic → acid lactic tích lại gây mỏi/đau. Khi nghỉ, O₂ quay lại → acid lactic được chuyển hóa tiếp.

**Ví dụ 4 — nấm men làm bánh mì nở**: lên men rượu tạo **CO₂** → bọt khí làm bột nở; ethanol bay hơi khi nướng.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Lên men có tạo ATP không?**
A: **Không tạo thêm**. 2 ATP đều từ đường phân. Lên men chỉ "dọn dẹp" NADH thành NAD⁺ để đường phân không bị tắc. Đó là lý do lên men quá kém hiệu quả (chỉ 2 ATP).

**Q: Vì sao men làm bánh mì lại làm bột nở?**
A: Nấm men lên men rượu, thải **CO₂**. Bọt CO₂ bị mắc trong mạng gluten của bột → bột phồng lên. Khi nướng, nhiệt làm ethanol và CO₂ bay đi, để lại các lỗ khí xốp.

### ⚠ Lỗi thường gặp

- **Nghĩ lên men tạo ATP**: sai. ATP chỉ từ đường phân; lên men chỉ tái tạo NAD⁺.
- **Nghĩ lactic acid là "chất độc gây mỏi vĩnh viễn"**: nó tích tạm thời, được chuyển hóa lại khi có O₂; cảm giác mỏi là tín hiệu chứ không phải tổn thương vĩnh viễn.
- **Nhầm lên men rượu xảy ra ở cơ người**: cơ người dùng **lên men lactic**, không phải rượu. Lên men rượu là của nấm men và một số vi khuẩn.

### 🔁 Dừng lại tự kiểm tra

1. Một vận động viên dùng 50 glucose. Nếu có đủ O₂ thì thu bao nhiêu ATP? Nếu hoàn toàn lên men thì bao nhiêu? Gấp mấy lần?
2. Vì sao lên men "đáng phí" mà tế bào vẫn dùng?

<details>
<summary>Đáp án</summary>

1. Hiếu khí: 50 × 32 = **1600 ATP**. Lên men: 50 × 2 = **100 ATP**. Hiếu khí gấp 1600 / 100 = **16 lần**.
2. Vì khi thiếu O₂, lên men là **lựa chọn duy nhất** để giữ đường phân chạy (tái tạo NAD⁺) → vẫn có 2 ATP cấp cứu, còn hơn 0 ATP và chết ngay. "Phí" nhưng cứu mạng tạm thời.
</details>

### 📝 Tóm tắt mục 7

- Thiếu O₂ → chỉ đường phân (**2 ATP**) + lên men để **tái tạo NAD⁺** (lên men không tạo thêm ATP).
- Lên men lactic (cơ người mỏi) hoặc lên men rượu (nấm men → ethanol + CO₂).
- Hiếu khí (32) gấp **16 lần** lên men (2) về ATP/glucose.

---

## 8. Bảng tổng hợp 3 giai đoạn

| Giai đoạn | Vị trí | Cần O₂? | Vào | Ra (sản phẩm chính) | ATP trực tiếp | NADH | FADH₂ |
|-----------|--------|:-------:|-----|---------------------|:------------:|:----:|:-----:|
| Đường phân | Bào tương | Không | 1 glucose | 2 pyruvate | 2 | 2 | 0 |
| Pyruvate → acetyl-CoA | Matrix ti thể | Không | 2 pyruvate | 2 acetyl-CoA + 2 CO₂ | 0 | 2 | 0 |
| Chu trình Krebs (×2) | Matrix ti thể | Không* | 2 acetyl-CoA | 4 CO₂ | 2 | 6 | 2 |
| Chuỗi truyền electron | Màng trong ti thể | **Có** | 10 NADH + 2 FADH₂ + O₂ | 6 H₂O + ~28 ATP | (~28) | — | — |
| **Tổng** | | | 1 glucose + 6 O₂ | 6 CO₂ + 6 H₂O | **~32 ATP** | | |

\\* Krebs không dùng O₂ trực tiếp nhưng phụ thuộc chuỗi truyền electron (cần O₂) để tái tạo NAD⁺.

---

## 9. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Cân bằng phương trình hô hấp tế bào và xác định chất nào bị oxy hóa, chất nào bị khử: \`C₆H₁₂O₆ + O₂ → CO₂ + H₂O\`.

**Bài 2**: Lập bảng kiểm kê NADH, FADH₂, ATP trực tiếp và CO₂ cho **1 glucose** qua từng giai đoạn (đường phân, pyruvate→acetyl-CoA, Krebs). Sau đó tính **tổng ATP** theo quy ước hiện đại (NADH=2.5, FADH₂=1.5).

**Bài 3**: Một tế bào oxy hóa hoàn toàn **4 glucose** bằng hô hấp hiếu khí. Tính: (a) tổng ATP (quy ước 32), (b) số CO₂ thải ra, (c) số O₂ tiêu thụ, (d) số H₂O tạo ra.

**Bài 4**: Cùng 4 glucose ở Bài 3 nhưng tế bào **thiếu O₂ hoàn toàn** và chỉ lên men. (a) Tính ATP thu được. (b) So sánh với hô hấp hiếu khí (gấp mấy lần). (c) Để thu cùng lượng ATP như hô hấp hiếu khí của 4 glucose, lên men cần bao nhiêu glucose?

**Bài 5**: Tính **hiệu suất năng lượng** của hô hấp tế bào theo quy ước 32 ATP và theo quy ước 38 ATP (cho ΔG glucose = 686 kcal/mol, mỗi ATP lưu 7.3 kcal/mol). Phần năng lượng còn lại đi đâu?

**Bài 6**: Giải thích vì sao chất độc xyanua (chặn chuỗi truyền electron) lại làm số ATP/glucose tụt từ ~32 xuống chỉ còn 2, dù glucose và đường phân vẫn còn nguyên vẹn.

### Lời giải

**Bài 1**:
- Cân bằng: \`C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O\`.
- Kiểm tra: C: 6 = 6 ✓; H: 12 = 12 (trong 6 H₂O) ✓; O: 6 + 12 = 18 = 12 + 6 = 18 ✓.
- **Glucose bị oxy hóa**: carbon từ số oxy hóa ~0 (trong glucose) lên +4 (trong CO₂) → mất electron.
- **O₂ bị khử**: oxy từ số oxy hóa 0 (trong O₂) xuống −2 (trong H₂O) → nhận electron.

**Bài 2**:

| Giai đoạn | ATP trực tiếp | NADH | FADH₂ | CO₂ |
|-----------|:------------:|:----:|:-----:|:---:|
| Đường phân | 2 | 2 | 0 | 0 |
| Pyruvate → acetyl-CoA (×2) | 0 | 2 | 0 | 2 |
| Krebs (×2) | 2 | 6 | 2 | 4 |
| **Tổng** | **4** | **10** | **2** | **6** |

Tổng ATP (hiện đại) = 4 (trực tiếp) + 10 × 2.5 (NADH) + 2 × 1.5 (FADH₂) = 4 + 25 + 3 = **32 ATP**.

**Bài 3** (4 glucose, quy ước 32):
- (a) ATP = 4 × 32 = **128 ATP**.
- (b) CO₂ = 4 × 6 = **24 CO₂**.
- (c) O₂ = 4 × 6 = **24 O₂**.
- (d) H₂O = 4 × 6 = **24 H₂O**.

**Bài 4** (4 glucose, lên men):
- (a) Lên men = 2 ATP/glucose → 4 × 2 = **8 ATP**.
- (b) Hiếu khí của 4 glucose = 128 ATP (Bài 3). Tỉ lệ = 128 / 8 = **16 lần**.
- (c) Để có 128 ATP bằng lên men: 128 / 2 = **64 glucose** (gấp 16 lần nhiên liệu so với 4 glucose hiếu khí).

**Bài 5** (hiệu suất):
- Quy ước 32: năng lượng vào ATP = 32 × 7.3 = 233.6 kcal. Hiệu suất = 233.6 / 686 ≈ **34%**.
- Quy ước 38: 38 × 7.3 = 277.4 kcal. Hiệu suất = 277.4 / 686 ≈ **40%**.
- Phần còn lại (theo 32 ATP): 686 − 233.6 = **452.4 kcal/mol tỏa ra dưới dạng nhiệt** → giữ ấm cơ thể (thân nhiệt ~37°C).

**Bài 6**:
- O₂ là **chất nhận electron cuối** của chuỗi truyền electron. Xyanua chặn phức hệ cuối → electron không qua được → chuỗi **tắc**.
- Chuỗi tắc → **không bơm được H⁺** → ATP synthase dừng → mất ~28 ATP (phần lớn của 32).
- Tệ hơn, NADH không được tái oxy hóa thành NAD⁺ → **Krebs và phần lớn đường phân cũng dừng**. Chỉ còn đường phân chạy ở mức tối thiểu nhờ lên men tái tạo NAD⁺ → còn **2 ATP**.
- Kết quả: ATP/glucose tụt từ **~32 xuống 2** dù glucose vẫn còn. Đây là lý do xyanua (và ngạt O₂) gây tử vong rất nhanh.

---

## 10. Liên kết và bài tiếp theo

- **Bài tiếp theo trong Biology**: [Lesson 06 — Quang hợp](../lesson-06-photosynthesis/) — chiều **ngược** của hô hấp: thực vật dùng năng lượng ánh sáng để **tạo** glucose từ CO₂ + H₂O. Quang hợp nạp năng lượng vào glucose; hô hấp rút năng lượng đó ra.
- **Nền tảng đã dùng trong bài này**:
  - [\`Lesson 04 — Enzyme & chuyển hóa\`](../lesson-04-enzymes-metabolism/) — ATP/ADP, enzyme xúc tác từng bước.
  - [\`Lesson 02 — Cấu trúc tế bào\`](../lesson-02-cell-structure/) — ti thể, matrix, màng trong.
  - [\`Lesson 01 — Phân tử sinh học\`](../lesson-01-biomolecules/) — glucose là nhiên liệu.
- **Liên kết Chemistry**:
  - [\`Chemistry/02-Reactions-Thermo/lesson-02-redox\`](../../../Chemistry/02-Reactions-Thermo/lesson-02-redox/) — bản chất oxy hóa-khử của hô hấp.
  - [\`Chemistry/02-Reactions-Thermo/lesson-04-thermochemistry\`](../../../Chemistry/02-Reactions-Thermo/lesson-04-thermochemistry/) — ΔG, năng lượng tỏa ra, hiệu suất.
- **Đọc thêm**: bộ công cụ tương tác — \`visualization.html\` của lesson này.

---

## 📝 Tổng kết Lesson 05

1. **Hô hấp tế bào** oxy hóa glucose **từng bước** để nạp năng lượng vào ATP: \`C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + năng lượng\` (ΔG ≈ −686 kcal/mol). Đây là phản ứng **redox** (glucose bị oxy hóa, O₂ bị khử).
2. **3 giai đoạn**: (1) **Đường phân** (bào tương, không cần O₂) → 2 pyruvate + 2 ATP + 2 NADH; (2) **Krebs** (matrix, qua bước pyruvate→acetyl-CoA) → 6 CO₂ + 2 ATP + 8 NADH thêm + 2 FADH₂; (3) **Chuỗi truyền electron** (màng trong, **cần O₂**) → ~28 ATP + 6 H₂O.
3. **Kiểm kê ATP**: 4 trực tiếp + 10 NADH + 2 FADH₂ → **~32 ATP** (hiện đại 2.5/1.5) hoặc **~38 ATP** (cũ 3/2). Nêu rõ quy ước khi tính.
4. **O₂ là chất nhận electron cuối** → tạo H₂O. Thiếu O₂ hay bị xyanua chặn → chuỗi tắc, ATP rớt còn 2.
5. **Lên men** (thiếu O₂): chỉ đường phân (**2 ATP**) + tái tạo NAD⁺. Lactic (cơ mỏi) hoặc rượu (nấm men → ethanol + CO₂). Hiếu khí gấp **16 lần** lên men.
6. **Hiệu suất** ≈ **34%** (cao hơn động cơ xăng ~25%); phần còn lại tỏa nhiệt giữ ấm cơ thể.

**Tiếp theo**: [Lesson 06 — Quang hợp](../lesson-06-photosynthesis/)
`;
