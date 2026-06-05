// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Physics/01-Mechanics/lesson-07-rigid-body/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 07 — Vật rắn (Rigid Body)

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

### ⚠ Lỗi thường gặp

- **Coi mọi vật là chất điểm**: khi vật quay (cánh cửa, bánh xe, con quay) thì xấp xỉ chất điểm sai — bỏ mất chuyển động quay. Phải dùng mô hình vật rắn.
- **Nghĩ "vật rắn" nghĩa là vật cứng/nặng**: "rắn" ở đây nghĩa là **không biến dạng** (khoảng cách giữa các điểm cố định), không liên quan độ cứng hay khối lượng. Một quả bóng bay (nhẹ) nếu giữ nguyên hình cũng coi là vật rắn.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Khi nào dùng chất điểm, khi nào dùng vật rắn?"* Dùng chất điểm khi chỉ quan tâm chuyển động **tịnh tiến** và kích thước vật nhỏ so với quãng đường (vd Trái Đất quay quanh Mặt Trời, coi như điểm). Dùng vật rắn khi vật **quay** hoặc kích thước/hình dạng quan trọng (vd cánh cửa, bánh xe).
- *"Vật rắn vừa tịnh tiến vừa quay thì phân tích sao?"* Tách thành hai phần: chuyển động tịnh tiến của **khối tâm** (dùng F = m·a) và chuyển động quay quanh khối tâm (dùng τ = I·α). Bánh xe lăn là ví dụ điển hình (xem yo-yo §4.2).

🔁 **Dừng lại tự kiểm tra**

1. Một viên bi nhỏ lăn xuống dốc. Để tính đúng gia tốc, nên coi là chất điểm hay vật rắn? Vì sao?
2. "Vật rắn" có nhất thiết phải cứng và nặng không?

<details><summary>Đáp án</summary>

1. **Vật rắn** — vì viên bi **quay** khi lăn, một phần năng lượng đi vào chuyển động quay. Coi là chất điểm sẽ tính sai gia tốc (xem yo-yo, bài lăn không trượt).
2. Không. "Rắn" chỉ nghĩa **không biến dạng** (giữ nguyên hình dạng), không liên quan độ cứng vật liệu hay khối lượng.

</details>

### 📝 Tóm tắt mục 1

- Chất điểm: 1 điểm, chỉ tịnh tiến.
- Vật rắn: có kích thước, tịnh tiến + quay.

---

## 2. Momen lực (Torque)

### 2.1. Định nghĩa

**Momen lực τ** = tích lực × cánh tay đòn (khoảng cách vuông góc từ điểm tựa đến đường lực):

\`\`\`
τ = r · F · sin(θ)
\`\`\`

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
\`\`\`
τ = F · d
\`\`\`

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

### ⚠ Lỗi thường gặp

- **Quên sin(θ) — chỉ nhân r·F**: nếu lực không vuông góc cánh tay đòn, torque < r·F. Phản ví dụ: cờ-lê 0.4 m, F=100 N ở góc 30° → τ = 0.4·100·sin30° = 20 N·m, KHÔNG phải 40 N·m.
- **Dùng khoảng cách từ điểm đặt lực thay vì từ trục quay**: r là khoảng cách từ **trục quay** đến điểm đặt lực. Đẩy ở bản lề (r=0) → τ = 0 dù lực lớn.
- **Lẫn torque (N·m) với năng lượng/công (cũng N·m = J)**: torque đo khả năng làm quay, công đo năng lượng chuyển. Cùng đơn vị nhưng khác bản chất — không cộng/so sánh.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Vì sao mở cửa ở mép dễ hơn ở gần bản lề?"* Vì torque = r·F. Đẩy ở mép (r lớn) tạo torque lớn với cùng lực → cửa quay dễ. Đẩy gần bản lề (r nhỏ) → torque nhỏ → khó quay. Đẩy ngay bản lề (r=0) → không quay được.
- *"Vì sao cờ-lê dài vặn ốc dễ hơn cờ-lê ngắn?"* τ = r·F. Cờ-lê dài → r lớn → cùng lực tay tạo torque lớn hơn → đủ "vặn" ốc chặt. Đó là nguyên lý đòn bẩy: r lớn bù cho F nhỏ.
- *"θ = 0 thì sao torque = 0?"* Khi lực **dọc theo** cánh tay đòn (kéo/đẩy thẳng vào hoặc ra trục), nó chỉ kéo căng/nén chứ không "vặn". sin(0°) = 0 → τ = 0. Chỉ thành phần lực **vuông góc** mới gây quay.

🔁 **Dừng lại tự kiểm tra**

1. Lực 25 N tác dụng vuông góc tại điểm cách trục 0.6 m. Tính torque.
2. Cùng lực 25 N nhưng ở góc 30° với cánh tay đòn 0.6 m. Torque bây giờ?

<details><summary>Đáp án</summary>

1. τ = r·F·sin90° = 0.6·25·1 = **15 N·m**.
2. τ = 0.6·25·sin30° = 0.6·25·0.5 = **7.5 N·m** (giảm một nửa vì sin30° = 0.5).

</details>

### 📝 Tóm tắt mục 2

- τ = r·F·sin(θ), đơn vị N·m.
- Cánh tay đòn d = r·sin(θ). τ = F·d.
- F dọc theo cánh tay đòn (θ = 0) → τ = 0, không quay.

---

## 3. Momen quán tính (Moment of Inertia)

### 3.1. Định nghĩa

**Momen quán tính I** = "khối lượng tương đương" cho chuyển động quay. Đại lượng đo **khó-dễ làm vật bắt đầu quay** (hoặc dừng quay):

\`\`\`
I = Σᵢ mᵢ · rᵢ²
\`\`\`

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

### ⚠ Lỗi thường gặp

- **Nghĩ I chỉ phụ thuộc khối lượng**: I phụ thuộc cả **cách phân bố** khối lượng so với trục (I = Σm·r²). Cùng m, khối lượng xa trục → I lớn hơn nhiều. Vòng tròn (m·r²) có I gấp đôi đĩa đặc cùng m, r (½m·r²).
- **Dùng sai công thức I cho hình**: vòng tròn = m·r², đĩa đặc = ½m·r², cầu đặc = ⅖m·r². Dùng nhầm công thức → sai kết quả. Phải tra bảng đúng hình và đúng trục.
- **Quên bình phương r**: I ∝ r². Khối lượng xa trục gấp đôi → đóng góp gấp **4 lần** vào I, không gấp 2.

### ❓ Câu hỏi tự nhiên của người đọc

- *"I là gì so với khối lượng m thường?"* I là "khối lượng cho chuyển động quay" — đo độ ì khi quay (khó bắt đầu/dừng quay). Trong tịnh tiến dùng m (F=ma); trong quay dùng I (τ=Iα). Khác m, I còn phụ thuộc trục quay ở đâu.
- *"Vì sao cùng khối lượng mà vòng tròn khó quay hơn đĩa đặc?"* Vì vòng tròn dồn toàn bộ khối lượng ở mép (r lớn nhất), còn đĩa đặc trải khối lượng từ tâm ra mép (nhiều phần r nhỏ). I ∝ r² → vòng tròn có I = m·r², đĩa đặc chỉ ½m·r².
- *"Vì sao vận động viên kéo tay vào quay nhanh hơn?"* Kéo tay vào → khối lượng tay gần trục hơn (r giảm) → I giảm. Momen động lượng L = I·ω bảo toàn → I giảm thì ω tăng → quay nhanh hơn.

🔁 **Dừng lại tự kiểm tra**

1. Đĩa đặc m = 2 kg, r = 0.5 m. Tính momen quán tính quanh trục qua tâm.
2. Một vòng tròn cùng m = 2 kg, r = 0.5 m. I của nó lớn hay nhỏ hơn đĩa, gấp mấy lần?

<details><summary>Đáp án</summary>

1. I = ½m·r² = ½·2·0.25 = **0.25 kg·m²**.
2. Vòng tròn: I = m·r² = 2·0.25 = **0.5 kg·m²** — **gấp đôi** đĩa đặc (vì khối lượng dồn ở mép).

</details>

### 📝 Tóm tắt mục 3

- I đo "khó-dễ làm vật quay", tương tự m trong tịnh tiến.
- I = Σ m·r². Phân bố xa trục → I lớn.
- KE quay = (1/2)·I·ω². L = I·ω (momen động lượng).

---

## 4. Định luật II cho quay

### 4.1. Phát biểu

Tương tự F = m·a cho tịnh tiến, đối với quay:

\`\`\`
τ = I · α
\`\`\`

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

### ⚠ Lỗi thường gặp

- **Dùng F = m·a cho chuyển động quay**: SAI đối tượng. Quay dùng τ = I·α. Lực sinh torque, momen quán tính thay khối lượng, gia tốc góc thay gia tốc thẳng.
- **Quên liên hệ a = α·r khi lăn không trượt**: trong bài yo-yo/bánh xe lăn, gia tốc thẳng a và gia tốc góc α liên hệ qua a = α·r. Bỏ qua điều này → thiếu phương trình, không giải được.
- **Lẫn đơn vị α (rad/s²) với a (m/s²)**: gia tốc góc đo bằng rad/s², gia tốc thẳng m/s². Liên hệ a = α·r.

### ❓ Câu hỏi tự nhiên của người đọc

- *"τ = I·α giống F = m·a chỗ nào?"* Đối ngẫu hoàn hảo: lực → torque, khối lượng → momen quán tính, gia tốc → gia tốc góc. Mọi công thức tịnh tiến đều có "bản sao quay" (xem bảng đối ngẫu). Hiểu một bên là hiểu bên kia.
- *"Vì sao yo-yo (hay quả cầu lăn) rơi chậm hơn rơi tự do?"* Vì một phần năng lượng/lực "đi vào" làm vật **quay** thay vì chỉ tịnh tiến xuống. Lực căng dây tạo torque làm yo-yo quay, đồng thời giảm lực ròng kéo xuống → gia tốc thẳng nhỏ hơn g.
- *"Hai vật lăn xuống dốc, vật nào tới chân trước?"* Vật có I nhỏ hơn (so với m·r²) — vì ít năng lượng vào quay hơn, nhiều vào tịnh tiến hơn. Cầu đặc (⅖m·r²) lăn nhanh hơn trụ đặc (½m·r²), nhanh hơn vòng tròn (m·r²).

🔁 **Dừng lại tự kiểm tra**

1. Một bánh đà có I = 0.5 kg·m² chịu torque 10 N·m. Tính gia tốc góc α.
2. Yo-yo đĩa rơi với a = ⅔g. Nếu thay bằng yo-yo dạng vòng tròn (I = m·r²), gia tốc rơi sẽ lớn hơn hay nhỏ hơn? (gợi ý: I lớn hơn)

<details><summary>Đáp án</summary>

1. α = τ/I = 10/0.5 = **20 rad/s²**.
2. **Nhỏ hơn** — I lớn hơn nghĩa là nhiều năng lượng/lực vào quay hơn, ít vào tịnh tiến → rơi chậm hơn. (Tính ra a = ½g cho vòng tròn, nhỏ hơn ⅔g của đĩa.)

</details>

### 📝 Tóm tắt mục 4

- τ = I·α (đối ngẫu của F = m·a).
- Bảng đối ngẫu giữa tịnh tiến và quay.

---

## 5. Cân bằng vật rắn

### 5.1. Điều kiện cân bằng

Vật rắn ở **cân bằng tĩnh** (không tịnh tiến, không quay) khi:

\`\`\`
Σ F = 0       (tổng các lực = 0)
Σ τ = 0       (tổng các momen quanh BẤT KỲ điểm nào = 0)
\`\`\`

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

### ⚠ Lỗi thường gặp

- **Chỉ kiểm tra ΣF = 0 mà quên Στ = 0**: vật có thể không tịnh tiến (ΣF=0) nhưng vẫn **quay** (Στ≠0). Vd hai lực bằng-ngược ở hai đầu thanh (ngẫu lực) → ΣF=0 nhưng thanh quay. Cân bằng tĩnh cần **cả hai** điều kiện.
- **Quên cánh tay đòn khi tính momen**: τ = F·d với d là khoảng cách **vuông góc** từ trục đến đường lực. Dùng sai khoảng cách → cân bằng momen sai.
- **Chọn trục tính momen bất tiện**: Στ = 0 đúng quanh **bất kỳ** điểm nào. Chọn trục đi qua một lực chưa biết → lực đó có τ = 0 → loại khỏi phương trình → giải dễ hơn.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Vì sao cần cả ΣF=0 và Στ=0?"* ΣF=0 đảm bảo vật không trượt đi (không tịnh tiến). Στ=0 đảm bảo vật không quay. Một vật có thể đứng yên về vị trí nhưng vẫn xoay tròn — cần cả hai để **hoàn toàn** đứng yên.
- *"Trên đòn bẩy, vì sao người nhẹ phải ngồi xa hơn?"* Vì cân bằng momen: m₁·d₁ = m₂·d₂. Người nhẹ (m nhỏ) phải có d lớn để bù lại, sao cho tích m·d hai bên bằng nhau. Đó là nguyên lý đòn bẩy "ít lực, nhiều khoảng cách".
- *"Tính momen quanh điểm nào cũng được à?"* Đúng, với vật cân bằng, Στ = 0 quanh mọi điểm. Mẹo: chọn điểm đi qua lực chưa biết (vd phản lực điểm tựa) để lực đó biến mất khỏi phương trình → ít ẩn hơn.

🔁 **Dừng lại tự kiểm tra**

1. Đòn bẩy: vật 20 kg cách điểm tựa 1 m. Vật 5 kg đặt phía kia phải cách điểm tựa bao xa để cân bằng?
2. Một thanh chịu hai lực 10 N bằng nhau, ngược chiều, ở hai đầu (cách nhau). ΣF có bằng 0 không? Thanh có cân bằng tĩnh không?

<details><summary>Đáp án</summary>

1. Cân bằng momen: 20·1 = 5·d → d = 20/5 = **4 m** (vật nhẹ ngồi xa hơn).
2. ΣF = 10 − 10 = **0** (không tịnh tiến). Nhưng Στ ≠ 0 (ngẫu lực) → thanh **quay** → KHÔNG cân bằng tĩnh.

</details>

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
`;
