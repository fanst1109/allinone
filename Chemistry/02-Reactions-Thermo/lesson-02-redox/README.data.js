// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Chemistry/02-Reactions-Thermo/lesson-02-redox/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 (Tier 2) — Phản ứng Redox (Oxidation-Reduction)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu khái niệm **oxy hóa** (mất electron) và **khử** (nhận electron), và vì sao 2 quá trình **luôn đi cặp**.
- Tính **số oxy hóa (oxidation state)** của mọi nguyên tố trong hợp chất bằng 7 quy tắc.
- Nhận diện **chất oxy hóa** (tác nhân oxy hóa = chất nhận e = bị khử) và **chất khử** (cho e = bị oxy hóa).
- Cân bằng phản ứng redox bằng **phương pháp nửa phản ứng (half-reaction)** trong môi trường acid và base.
- Liên hệ redox với các ứng dụng: hô hấp, pin, ăn mòn kim loại, công nghiệp.

## Kiến thức tiền đề

- [Lesson 06 (T1) — Mol & Phản ứng](../../01-Structure/lesson-06-mole-stoichiometry/) — biết cân bằng phương trình.
- [Lesson 01 (T2) — Acid-Base](../lesson-01-acid-base/) — biết phản ứng trong môi trường acid/base.

---

## 1. Oxy hóa và Khử

### 💡 Trực giác / Hình dung

Ban đầu, "oxy hóa" có nghĩa rất hẹp: **phản ứng với oxy**. Vd: $\\text{Fe} + \\text{O}_2 \\rightarrow \\text{Fe}_2\\text{O}_3$ (gỉ sét). "Khử" là ngược lại: lấy oxy ra khỏi hợp chất.

Hiện nay, định nghĩa **tổng quát hóa** dựa trên electron:

- **Oxy hóa (oxidation)**: **MẤT** electron. Số oxy hóa tăng.
- **Khử (reduction)**: **NHẬN** electron. Số oxy hóa giảm.

**Mnemonic OIL RIG**: **O**xidation **I**s **L**oss (electron), **R**eduction **I**s **G**ain (electron).

### 1.1. Cặp đôi luôn đi cùng nhau

Electron không tự nhiên mất đi — nó phải chuyển sang chất khác. Vậy nên:
**Trong mọi phản ứng redox, có đúng 1 chất bị oxy hóa và 1 chất bị khử.**

Ví dụ: $\\text{2Na} + \\text{Cl}_2 \\rightarrow \\text{2NaCl}$
- Na (0) → $\\text{Na}^+$ (+1): mất 1 e → **Na bị oxy hóa**. Na là **chất khử** (đưa e cho người khác).
- $\\text{Cl}_2$ (0) → $\\text{2Cl}^-$ (−1): mỗi Cl nhận 1 e → **$\\text{Cl}_2$ bị khử**. $\\text{Cl}_2$ là **chất oxy hóa**.

**Nhớ rõ**: "chất khử" là chất CHO e (chính nó bị oxy hóa). "Chất oxy hóa" là chất NHẬN e (chính nó bị khử). Dễ nhầm.

### 📝 Tóm tắt mục 1

- Oxy hóa = mất e (số ox tăng); khử = nhận e (số ox giảm).
- Luôn đi cặp: 1 chất oxy hóa + 1 chất khử trong mỗi phản ứng.
- Chất khử cho e → bị oxy hóa; chất oxy hóa nhận e → bị khử.

---

## 2. Số oxy hóa (Oxidation State)

### 2.1. Định nghĩa

**Số oxy hóa** = "điện tích giả định" gán cho mỗi nguyên tử trong hợp chất, tính theo quy ước **"nguyên tử có độ âm điện cao hơn lấy hết electron của liên kết dùng chung"**.

💡 **Vì sao cần khái niệm "giả định" này?** Trong liên kết cộng hóa trị, electron không thuộc về 1 bên — nó được **dùng chung**. Nhưng để **theo dõi** ai "mất e" và ai "nhận e" trong một phản ứng (= bản chất redox), ta cần một cách "kế toán electron" thống nhất. Số oxy hóa chính là công cụ kế toán đó: **giả vờ** rằng electron luôn thuộc bên âm điện hơn → từ đó tính được "trước phản ứng X có bao nhiêu e, sau phản ứng có bao nhiêu" → biết X mất hay nhận.

**Ví dụ trực giác — phân tử $\\text{H}_2\\text{O}$**:
- Liên kết thật: 2 cặp electron dùng chung giữa O và 2 H, lệch nhẹ về O (do O âm điện hơn). Phân cực δ−/δ+ chỉ là **một phần** electron lệch, không phải toàn bộ.
- **Giả định** theo số oxy hóa: O **"nuốt cả 2 cặp" e** → O có 8 e "của riêng" (so với 6 e ngoài cùng khi tự do) → dư 2 e → số oxy hóa O = **−2**. Mỗi H **"mất hết" 1 e** → số oxy hóa H = **+1**.
- Đây KHÔNG phải điện tích thật. Trong nước thật, O có điện tích thực khoảng −0.4 (chứ không phải −2). Nhưng "kế toán" theo số oxy hóa thì coi như −2.

**Tại sao cách kế toán này lại có ích?** Vì nếu **số oxy hóa của một nguyên tố THAY ĐỔI** giữa trước và sau phản ứng, có nghĩa nguyên tố đó đã **mất** hoặc **nhận** electron (theo quy ước) → đây chính là phản ứng redox. Phản ứng nào không có nguyên tố nào đổi số oxy hóa = không phải redox.

So sánh nhanh số oxy hóa vs điện tích thực:

| Phân tử | Nguyên tử | Số oxy hóa (giả định) | Điện tích thực (đo được) |
|---------|-----------|------------------------|----------------------------|
| $\\text{H}_2\\text{O}$ | O | −2 | ~ −0,4 |
| $\\text{H}_2\\text{O}$ | H | +1 | ~ +0,2 |
| $\\text{NaCl}$ | Na (trong tinh thể) | +1 | gần đúng +1 (vì liên kết ion thật) |
| $\\text{O}_2$ | O | 0 | đúng 0 (đối xứng) |

→ Với liên kết ion thật (NaCl), số oxy hóa ≈ điện tích thực. Với liên kết cộng hóa trị, số oxy hóa chỉ là quy ước.

### 2.2. Bảy quy tắc tính số oxy hóa

**Áp dụng theo thứ tự ưu tiên:**

1. **Đơn chất** (nguyên tố ở dạng tự do): số oxy hóa = 0. Vd $\\text{O}_2$, $\\text{H}_2$, Fe, Cu — đều = 0.
2. **Ion đơn nguyên tử**: số oxy hóa = điện tích ion. Vd $\\text{Na}^+$ → +1, $\\text{Cl}^-$ → −1, $\\text{Fe}^{3+}$ → +3.
3. **F** (fluorine): luôn = −1 (vì độ âm điện cao nhất).
4. **H**: thường = +1 (vd $\\text{H}_2\\text{O}$, $\\text{HCl}$, $\\text{CH}_4$). Ngoại lệ: hydride kim loại ($\\text{NaH}$, $\\text{CaH}_2$) → H có số ox = −1.
5. **O**: thường = −2 (vd $\\text{H}_2\\text{O}$, $\\text{CO}_2$). Ngoại lệ: peroxide ($\\text{H}_2\\text{O}_2$, $\\text{Na}_2\\text{O}_2$) → O có số ox = −1; $\\text{OF}_2$ → O có số ox = +2.
6. **Kim loại nhóm I, II**: luôn dương theo nhóm. Nhóm IA: +1; Nhóm IIA: +2; Al: +3.
7. **Tổng số oxy hóa = điện tích tổng** của phân tử / ion. Phân tử trung hòa → tổng = 0. Ion → tổng = điện tích ion.

### 2.3. Bốn ví dụ tính số oxy hóa

**Ví dụ 1 — $\\text{H}_2\\text{SO}_4$ (trung hòa):**
- H = +1 (×2 = +2). O = −2 (×4 = −8).
- Tổng = 0 → $\\text{S} + 2 - 8 = 0$ → **S = +6**.

**Ví dụ 2 — $\\text{KMnO}_4$ (trung hòa):**
- K = +1 (nhóm IA). O = −2 (×4 = −8).
- Tổng = 0 → $1 + \\text{Mn} - 8 = 0$ → **Mn = +7**.

**Ví dụ 3 — $\\text{Cr}_2\\text{O}_7^{2-}$ (ion, điện tích = −2):**
- O = −2 (×7 = −14). 2 Cr = ?
- $2 \\cdot \\text{Cr} + (-14) = -2$ → $2 \\cdot \\text{Cr} = +12$ → **Cr = +6** mỗi nguyên tử.

**Ví dụ 4 — $\\text{NH}_4^+$ (ion, điện tích = +1):**
- H = +1 (×4 = +4).
- $\\text{N} + 4 = +1$ → **N = −3**.

### 2.4. Phân biệt nhanh phản ứng redox

Để biết một phản ứng có phải redox không, **kiểm tra số oxy hóa của các nguyên tố trước và sau phản ứng**. Nếu có nguyên tố thay đổi số ox → là redox.

**Ví dụ — Kiểm tra**:

a) $\\text{Zn} + \\text{2HCl} \\rightarrow \\text{ZnCl}_2 + \\text{H}_2$
- Zn: 0 → +2 (tăng → mất e → oxy hóa)
- H: +1 → 0 (giảm → nhận e → khử)
- → **Là redox.** Zn là chất khử, $\\text{H}^+$ là chất oxy hóa.

b) $\\text{HCl} + \\text{NaOH} \\rightarrow \\text{NaCl} + \\text{H}_2\\text{O}$
- H: +1 → +1 (không đổi)
- O: −2 → −2 (không đổi)
- Cl: −1 → −1 (không đổi)
- Na: +1 → +1 (không đổi)
- → **KHÔNG phải redox** (acid-base thuần).

### 📝 Tóm tắt mục 2

- Số oxy hóa = điện tích giả định nếu liên kết đều là ion.
- 7 quy tắc theo thứ tự ưu tiên (F > H > O > nhóm I,II > tổng).
- Số ox thay đổi → là phản ứng redox.

---

## 3. Cân bằng redox — Phương pháp nửa phản ứng

### 3.1. Ý tưởng

Tách phản ứng redox thành 2 nửa:
- **Nửa oxy hóa**: chỉ có chất khử + e (e ở vế phải).
- **Nửa khử**: chỉ có chất oxy hóa + e (e ở vế trái).

Cân bằng riêng từng nửa, rồi cộng lại (nhân hệ số để e khớp nhau).

### 3.2. Quy trình 6 bước (môi trường acid)

1. **Tách** ra 2 nửa phản ứng.
2. **Cân bằng nguyên tố** (trừ O và H) trong từng nửa.
3. **Cân bằng O**: thêm $\\text{H}_2\\text{O}$.
4. **Cân bằng H**: thêm $\\text{H}^+$.
5. **Cân bằng điện tích**: thêm $e^-$.
6. **Nhân hệ số** để số e ở 2 nửa bằng nhau, **cộng 2 nửa**.

### 3.3. Walk-through — Cân bằng $\\text{MnO}_4^- + \\text{Fe}^{2+} \\rightarrow \\text{Mn}^{2+} + \\text{Fe}^{3+}$ (acid)

**Bước 1 — Tách 2 nửa:**
- Nửa khử: $\\text{MnO}_4^- \\rightarrow \\text{Mn}^{2+}$ (Mn: +7 → +2, nhận 5 e)
- Nửa oxy hóa: $\\text{Fe}^{2+} \\rightarrow \\text{Fe}^{3+}$ (Fe: +2 → +3, mất 1 e)

**Bước 2-5 — Cân bằng nửa khử:**
- Mn: 1 = 1 ✓.
- O: trái 4, phải 0 → thêm 4 $\\text{H}_2\\text{O}$ bên phải: $\\text{MnO}_4^- \\rightarrow \\text{Mn}^{2+} + \\text{4H}_2\\text{O}$.
- H: phải 8, trái 0 → thêm 8 $\\text{H}^+$ bên trái: $\\text{MnO}_4^- + \\text{8H}^+ \\rightarrow \\text{Mn}^{2+} + \\text{4H}_2\\text{O}$.
- Điện tích: trái = −1 + 8 = +7. Phải = +2 + 0 = +2. Chênh 5 → thêm 5 e bên trái: $\\text{MnO}_4^- + \\text{8H}^+ + 5e^- \\rightarrow \\text{Mn}^{2+} + \\text{4H}_2\\text{O}$ ✓.

**Cân bằng nửa oxy hóa:**
- $\\text{Fe}^{2+} \\rightarrow \\text{Fe}^{3+} + e^-$ (chỉ thêm 1 e bên phải để cân bằng điện tích).

**Bước 6 — Nhân & cộng:**
- Nửa khử × 1, nửa oxy hóa × 5 (để cùng 5 e):

$$\\begin{aligned}
\\text{MnO}_4^- + \\text{8H}^+ + 5e^- &\\rightarrow \\text{Mn}^{2+} + \\text{4H}_2\\text{O} \\\\
\\text{5Fe}^{2+} &\\rightarrow \\text{5Fe}^{3+} + 5e^-
\\end{aligned}$$

- Cộng: $\\text{MnO}_4^- + \\text{8H}^+ + \\text{5Fe}^{2+} \\rightarrow \\text{Mn}^{2+} + \\text{5Fe}^{3+} + \\text{4H}_2\\text{O}$ ✓.

Kiểm tra: Mn 1=1, Fe 5=5, O 4=4, H 8=8. Điện tích trái = −1+8+10 = +17. Phải = +2+15+0 = +17 ✓.

### 3.4. Môi trường base — thêm bước cuối

Sau khi cân bằng như acid, thêm $\\text{OH}^-$ vào cả 2 vế bằng số $\\text{H}^+$ → $\\text{H}^+ + \\text{OH}^- \\rightarrow \\text{H}_2\\text{O}$. Sau đó rút gọn $\\text{H}_2\\text{O}$ dư.

### 📝 Tóm tắt mục 3

- Tách phản ứng thành 2 nửa, cân bằng riêng.
- Acid: thêm $\\text{H}_2\\text{O}$, $\\text{H}^+$, e theo thứ tự.
- Base: làm như acid rồi chuyển $\\text{H}^+$ thành $\\text{H}_2\\text{O}$ bằng $\\text{OH}^-$.

---

## 4. Ứng dụng — Đời sống và Công nghiệp

### 4.1. Hô hấp tế bào

Glucose oxy hóa trong tế bào để tạo năng lượng:

$$\\text{C}_6\\text{H}_{12}\\text{O}_6 + \\text{6O}_2 \\rightarrow \\text{6CO}_2 + \\text{6H}_2\\text{O}$$

- C: 0 → +4 (oxy hóa). $\\text{O}_2$: 0 → −2 (khử).
- Phản ứng tỏa năng lượng → ATP cho cơ thể hoạt động.

### 4.2. Pin (Galvanic cell) — chủ đề kỹ ở Lesson 03

Phản ứng redox tự xảy ra → tạo dòng điện. Vd pin Daniell: Zn (anode, oxy hóa) + $\\text{Cu}^{2+} \\rightarrow \\text{Zn}^{2+} + \\text{Cu}$ (cathode, khử). Điện áp ~ 1.1 V.

### 4.3. Ăn mòn kim loại

$\\text{Fe} + \\text{O}_2 + \\text{H}_2\\text{O} \\rightarrow \\text{Fe}_2\\text{O}_3 \\cdot \\text{H}_2\\text{O}$ (gỉ sét). Fe bị oxy hóa, $\\text{O}_2$ bị khử. Chống gỉ: mạ Zn (kẽm hy sinh — Zn bị oxy hóa thay Fe).

### 4.4. Công nghiệp — Sản xuất Cl₂ và NaOH

Điện phân dung dịch NaCl:
- Anode: $\\text{2Cl}^- \\rightarrow \\text{Cl}_2 + 2e^-$ (oxy hóa).
- Cathode: $\\text{2H}_2\\text{O} + 2e^- \\rightarrow \\text{H}_2 + \\text{2OH}^-$ (khử).

### 📝 Tóm tắt mục 4

Redox có mặt khắp nơi: hô hấp, pin, ăn mòn, công nghiệp.

---

## 5. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Tính số oxy hóa của nguyên tố in đậm trong các chất sau:
a) **S** trong $\\text{H}_2\\text{SO}_3$
b) **N** trong $\\text{HNO}_3$
c) **Cr** trong $\\text{K}_2\\text{Cr}_2\\text{O}_7$
d) **Mn** trong $\\text{KMnO}_4$
e) **C** trong $\\text{CO}_3^{2-}$
f) **Cl** trong $\\text{ClO}_4^-$

**Bài 2**: Phản ứng nào sau đây là phản ứng redox?
a) $\\text{NaOH} + \\text{HCl} \\rightarrow \\text{NaCl} + \\text{H}_2\\text{O}$
b) $\\text{Zn} + \\text{CuSO}_4 \\rightarrow \\text{ZnSO}_4 + \\text{Cu}$
c) $\\text{CaCO}_3 \\rightarrow \\text{CaO} + \\text{CO}_2$
d) $\\text{Cu} + \\text{2AgNO}_3 \\rightarrow \\text{Cu(NO}_3)_2 + \\text{2Ag}$

**Bài 3**: Cân bằng phản ứng (môi trường acid): $\\text{Cr}_2\\text{O}_7^{2-} + \\text{Fe}^{2+} \\rightarrow \\text{Cr}^{3+} + \\text{Fe}^{3+}$.

**Bài 4**: Trong phản ứng $\\text{Cu} + \\text{2H}_2\\text{SO}_4(\\text{đặc}) \\rightarrow \\text{CuSO}_4 + \\text{SO}_2 + \\text{2H}_2\\text{O}$, xác định chất oxy hóa, chất khử.

**Bài 5**: Cân bằng phản ứng (môi trường acid): $\\text{MnO}_4^- + \\text{C}_2\\text{O}_4^{2-} \\rightarrow \\text{Mn}^{2+} + \\text{CO}_2$.

**Bài 6**: Tại sao thanh kẽm đặt vào dung dịch $\\text{CuSO}_4$ bị mòn và xuất hiện lớp đồng đỏ trên thanh?

### Lời giải

**Bài 1**:
a) $\\text{H}_2\\text{SO}_3$ trung hòa: $2(+1) + \\text{S} + 3(-2) = 0$ → **S = +4**.
b) $\\text{HNO}_3$ trung hòa: $(+1) + \\text{N} + 3(-2) = 0$ → **N = +5**.
c) $\\text{K}_2\\text{Cr}_2\\text{O}_7$ trung hòa: $2(+1) + 2\\text{Cr} + 7(-2) = 0$ → $2\\text{Cr} = +12$ → **Cr = +6**.
d) $\\text{KMnO}_4$ trung hòa: $+1 + \\text{Mn} + 4(-2) = 0$ → **Mn = +7**.
e) $\\text{CO}_3^{2-}$ điện tích −2: $\\text{C} + 3(-2) = -2$ → **C = +4**.
f) $\\text{ClO}_4^-$ điện tích −1: $\\text{Cl} + 4(-2) = -1$ → **Cl = +7**.

**Bài 2**:
- a) Acid-base, không redox (đã phân tích ở §2.4).
- b) **Redox**: Zn (0 → +2, oxy hóa), Cu (+2 → 0, khử).
- c) Không redox: số ox không đổi (Ca +2, C +4, O −2 trước và sau).
- d) **Redox**: Cu (0 → +2), Ag (+1 → 0).

**Bài 3**:
Tách:
- Nửa khử: $\\text{Cr}_2\\text{O}_7^{2-} \\rightarrow \\text{Cr}^{3+}$. Cr: +6 → +3, mỗi Cr nhận 3 e, 2 Cr nhận 6 e.
- Nửa oxy hóa: $\\text{Fe}^{2+} \\rightarrow \\text{Fe}^{3+} + e^-$.

Cân bằng nửa khử:
- Cr: cần 2 $\\text{Cr}^{3+}$ vế phải: $\\text{Cr}_2\\text{O}_7^{2-} \\rightarrow \\text{2Cr}^{3+}$.
- O: thêm 7 $\\text{H}_2\\text{O}$ bên phải: $\\text{Cr}_2\\text{O}_7^{2-} \\rightarrow \\text{2Cr}^{3+} + \\text{7H}_2\\text{O}$.
- H: thêm 14 $\\text{H}^+$ bên trái: $\\text{Cr}_2\\text{O}_7^{2-} + \\text{14H}^+ \\rightarrow \\text{2Cr}^{3+} + \\text{7H}_2\\text{O}$.
- Điện tích: trái = −2 + 14 = +12; phải = 6. Thêm 6 e bên trái: $\\text{Cr}_2\\text{O}_7^{2-} + \\text{14H}^+ + 6e^- \\rightarrow \\text{2Cr}^{3+} + \\text{7H}_2\\text{O}$.

Nhân nửa oxy hóa × 6:
- $\\text{6Fe}^{2+} \\rightarrow \\text{6Fe}^{3+} + 6e^-$.

Cộng: $$\\text{Cr}_2\\text{O}_7^{2-} + \\text{14H}^+ + \\text{6Fe}^{2+} \\rightarrow \\text{2Cr}^{3+} + \\text{7H}_2\\text{O} + \\text{6Fe}^{3+}$$

Kiểm tra điện tích: trái = −2 + 14 + 12 = +24. Phải = 6 + 0 + 18 = +24 ✓.

**Bài 4**:
- Cu: 0 → +2 (mất 2 e) → **Cu là chất khử**, bị oxy hóa.
- S trong $\\text{H}_2\\text{SO}_4$: +6 → +4 (trong $\\text{SO}_2$), mỗi S nhận 2 e → **$\\text{H}_2\\text{SO}_4$ là chất oxy hóa**, bị khử.

**Bài 5**:
Nửa khử: $\\text{MnO}_4^- \\rightarrow \\text{Mn}^{2+}$. Mn: +7 → +2, nhận 5 e.
- $\\text{MnO}_4^- + \\text{8H}^+ + 5e^- \\rightarrow \\text{Mn}^{2+} + \\text{4H}_2\\text{O}$ (như bài walk-through).

Nửa oxy hóa: $\\text{C}_2\\text{O}_4^{2-} \\rightarrow \\text{2CO}_2$. C: +3 → +4, mỗi C mất 1 e, 2 C mất 2 e.
- $\\text{C}_2\\text{O}_4^{2-} \\rightarrow \\text{2CO}_2 + 2e^-$. Điện tích: trái = −2, phải = 0 − 2 = −2 ✓.

Nhân: nửa khử × 2, nửa oxy hóa × 5 (LCM = 10 e):

$$\\begin{aligned}
\\text{2MnO}_4^- + \\text{16H}^+ + 10e^- &\\rightarrow \\text{2Mn}^{2+} + \\text{8H}_2\\text{O} \\\\
\\text{5C}_2\\text{O}_4^{2-} &\\rightarrow \\text{10CO}_2 + 10e^-
\\end{aligned}$$

Cộng: $$\\text{2MnO}_4^- + \\text{16H}^+ + \\text{5C}_2\\text{O}_4^{2-} \\rightarrow \\text{2Mn}^{2+} + \\text{8H}_2\\text{O} + \\text{10CO}_2$$

**Bài 6**: Vì Zn hoạt động hơn Cu (đứng trước Cu trong dãy hoạt động kim loại). Khi Zn vào dung dịch $\\text{CuSO}_4$, có phản ứng:

$$\\begin{aligned}
\\text{Zn} + \\text{CuSO}_4 &\\rightarrow \\text{ZnSO}_4 + \\text{Cu}\\downarrow \\\\
\\text{Zn}(0) &\\rightarrow \\text{Zn}^{2+} + 2e^- \\quad (\\text{oxy hóa, Zn tan ra}) \\\\
\\text{Cu}^{2+} + 2e^- &\\rightarrow \\text{Cu}(0) \\quad (\\text{khử, Cu bám lên thanh})
\\end{aligned}$$

Zn cho 2 e cho $\\text{Cu}^{2+}$. Kết quả: Zn bị "ăn mòn" tan vào dung dịch, Cu kim loại đỏ bám lên thanh.

---

## 6. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 03 — Điện hóa](../lesson-03-electrochemistry/) — biến phản ứng redox thành điện năng (pin).
- **Liên kết Math**: tính số oxy hóa = giải phương trình tuyến tính bậc 1.
- **Liên kết Physics**: pin = nguồn điện hóa → [\`Physics/02-Thermo-Electromagnetism/lesson-06-current-circuits\`](../../../Physics/02-Thermo-Electromagnetism/lesson-06-current-circuits/).

---

## 📝 Tổng kết Lesson 02 (T2)

1. **OIL RIG**: Oxidation = mất e (số ox tăng); Reduction = nhận e (giảm).
2. **2 quá trình luôn đi cặp**: 1 chất khử (cho e, bị oxy hóa) + 1 chất oxy hóa (nhận e, bị khử).
3. **7 quy tắc** tính số oxy hóa: F = −1, H = +1 (trừ hydride), O = −2 (trừ peroxide/$\\text{OF}_2$), tổng = 0 hoặc điện tích ion.
4. **Cân bằng redox** (acid): tách nửa → cân bằng từng nửa ($\\text{H}_2\\text{O}$, $\\text{H}^+$, e) → nhân để e khớp → cộng.
5. **Môi trường base**: làm như acid rồi thêm $\\text{OH}^-$ vào 2 vế = số $\\text{H}^+$.
6. **Ứng dụng**: hô hấp, pin, ăn mòn, công nghiệp.

**Tiếp theo**: [Lesson 03 — Điện hóa](../lesson-03-electrochemistry/)
`;
