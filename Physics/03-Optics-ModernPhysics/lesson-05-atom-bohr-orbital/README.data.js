// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Physics/03-Optics-ModernPhysics/lesson-05-atom-bohr-orbital/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 (T3) — Nguyên tử Bohr → Orbital

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **mô hình Bohr** (1913) — giải thích phổ vạch Hydrogen.
- Tính **mức năng lượng** electron trong nguyên tử Hydro: $E_n = -\\frac{13{,}6}{n^2}\\ \\text{eV}$.
- Hiểu **dãy phổ Lyman, Balmer, Paschen** — quan trọng cho thiên văn.
- Phân biệt mô hình Bohr (quỹ đạo) với mô hình **orbital** hiện đại (đám mây xác suất).
- Liên hệ với Lesson 02 Chemistry (cấu hình electron).

## Kiến thức tiền đề

- [Lesson 04 (T3) — Photon](../lesson-04-photon-wave-particle/) — biết $E = hf$.

---

## 1. Vấn đề trước Bohr — Phổ vạch Hydrogen

Khi đun nóng khí Hydrogen rồi cho qua lăng kính, ta thấy **vạch phổ rời rạc** (không liên tục). Mỗi vạch ở 1 $\\lambda$ cụ thể.

**Bí ẩn**: vì sao chỉ có một số $\\lambda$ "được phép"? Lý thuyết cổ điển không giải thích được — mô hình Rutherford (electron quay quanh hạt nhân) còn dự đoán electron rơi vào hạt nhân trong $10^{-11}$ giây (đã đề cập ở Chemistry).

💡 **Trực giác**: nếu năng lượng electron liên tục (đi đâu cũng được), phổ phải là dải màu liền (cầu vồng). Nhưng ta chỉ thấy vài VẠCH rời rạc → giống như chỉ một số "nốt nhạc" được phép vang lên. Điều đó gợi ý năng lượng electron bị "đóng bậc" — chính là ý tưởng mức năng lượng của Bohr.

📝 **Tóm tắt mục 1**: phổ Hydrogen là các vạch rời rạc, không liên tục → vật lý cổ điển bó tay → cần một mô hình "lượng tử hóa năng lượng".

---

## 2. Mô hình Bohr (1913)

### 2.1. 3 giả định

Niels Bohr đưa ra **3 giả định "ad hoc"** để giải thích phổ Hydrogen:

1. Electron chỉ tồn tại ở các **quỹ đạo cố định** (gọi là các mức năng lượng dừng) — KHÔNG phát xạ ở mức bền.
2. Năng lượng các mức **lượng tử hóa**: $E_n = -\\frac{13{,}6}{n^2}\\ \\text{eV}$ ($n = 1, 2, 3, \\dots$).
3. Electron **nhảy mức** (từ $n_\\text{đầu}$ sang $n_\\text{cuối}$):
   - $n_\\text{đầu} < n_\\text{cuối}$: hấp thụ photon $E = E_\\text{cuối} - E_\\text{đầu}$.
   - $n_\\text{đầu} > n_\\text{cuối}$: phát xạ photon $E = E_\\text{đầu} - E_\\text{cuối}$.

### 2.2. Mức năng lượng Hydro

$$E_n = -\\frac{13{,}6}{n^2}\\ \\text{(eV)}$$

| $n$ | $E_n$ (eV) | Bán kính quỹ đạo |
|---|----------|--------------------|
| 1 (mức cơ bản) | $-13{,}6$ | $a_0 = 0{,}053\\ \\text{nm}$ (Bohr radius) |
| 2 | $-3{,}4$ | $4 a_0$ |
| 3 | $-1{,}51$ | $9 a_0$ |
| 4 | $-0{,}85$ | $16 a_0$ |
| $\\infty$ | 0 | Ion hóa hoàn toàn |

**Năng lượng ion hóa** = năng lượng để bứt electron từ $n=1$ ra $n=\\infty$ = $13{,}6\\ \\text{eV}$. (Khớp đo thực nghiệm.)

### 2.3. Walk-through — Tính λ photon từ nhảy mức

Ví dụ: electron nhảy từ $n=3$ xuống $n=2$ (vạch H$\\alpha$ đỏ trong phổ Hydrogen).
- $\\Delta E = E_3 - E_2 = -1{,}51 - (-3{,}4) = 1{,}89\\ \\text{eV} = 3{,}03 \\times 10^{-19}\\ \\text{J}$.
- $\\lambda = \\frac{h c}{\\Delta E} = \\frac{(6{,}63 \\times 10^{-34})(3 \\times 10^8)}{3{,}03 \\times 10^{-19}} =$ **656 nm** (đỏ).

→ Khớp chính xác vạch đỏ trong phổ Hydrogen! Bohr đoạt Nobel 1922.

**Định nghĩa đầy đủ — mức năng lượng (energy level) $E_n$**:
- **(a) Là gì**: tập các giá trị năng lượng "được phép" của electron, $E_n = -\\frac{13{,}6}{n^2}\\ \\text{eV}$ ($n = 1, 2, 3\\dots$). Dấu ÂM nghĩa là electron bị "buộc" vào hạt nhân — cần CẤP năng lượng để giải phóng. $n$ càng lớn → $E_n$ càng gần 0 (liên kết càng lỏng).
- **(b) Vì sao cần**: vì năng lượng rời rạc nên electron chỉ "nhảy" giữa các mức bằng những bước nhảy năng lượng cố định → phát/hấp thụ photon có năng lượng cố định → tạo các VẠCH phổ rời rạc. Đây là lời giải cho bí ẩn ở mục 1.
- **(c) Ví dụ số kèm đơn vị**: $E_1 = -\\frac{13{,}6}{1^2} = -13{,}6\\ \\text{eV}$ (mức cơ bản, bền nhất); $E_2 = -\\frac{13{,}6}{4} = -3{,}4\\ \\text{eV}$. Khoảng cách $E_2 - E_1 = 10{,}2\\ \\text{eV}$ chính là năng lượng photon UV (vạch Lyman-$\\alpha$, $\\lambda \\approx 122\\ \\text{nm}$).

💡 **Trực giác — mức năng lượng = bậc thang**: electron như người đứng trên cầu thang, chỉ có thể đứng ở các BẬC (mức), không lơ lửng giữa hai bậc. Lên bậc cao = nuốt photon; rơi xuống bậc thấp = nhả photon. Năng lượng photon = đúng độ chênh giữa hai bậc.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao $E_n$ mang dấu ÂM?"* Quy ước: electron tự do ($n=\\infty$) có $E = 0$. Electron bị giữ trong nguyên tử có năng lượng THẤP HƠN 0 → âm. Càng âm = càng bị buộc chặt. Để bứt ra cần cấp đúng $|E_n|$.
- *"Photon được phát ra khi electron lên hay xuống mức?"* PHÁT photon khi electron RƠI xuống mức thấp (nhả năng lượng); HẤP THỤ photon khi LÊN mức cao (nuốt năng lượng).
- *"Vì sao mức cao xếp sát nhau ($-3{,}4$, $-1{,}51$, $-0{,}85\\dots$)?"* Vì $\\frac{1}{n^2}$ giảm nhanh: khoảng cách giữa các mức thu hẹp dần khi $n$ tăng, tụ về 0 tại $n = \\infty$ (giới hạn ion hóa).

⚠ **Lỗi thường gặp**

- **Quên dấu âm khi tính $\\Delta E$.** $\\Delta E = E_\\text{cao} - E_\\text{thấp}$. Vd $n=3\\to2$: $(-1{,}51) - (-3{,}4) = +1{,}89\\ \\text{eV}$ (dương, photon phát ra). Bỏ dấu âm → ra số sai.
- **Lẫn eV và J khi tính $\\lambda$.** Đổi $1\\ \\text{eV} = 1{,}6 \\times 10^{-19}\\ \\text{J}$ rồi mới dùng $\\lambda = \\frac{hc}{\\Delta E}$. Mẹo nhanh: $\\lambda(\\text{nm}) = \\frac{1240}{\\Delta E(\\text{eV})}$.
- **Tưởng Bohr đúng cho mọi nguyên tử.** Chỉ đúng cho H và ion 1 electron ($\\text{He}^+$, $\\text{Li}^{2+}$). Nguyên tử nhiều electron có tương tác e–e → Bohr sai.

🔁 **Dừng lại tự kiểm tra**

1. Tính $E_3$ của Hydrogen.
2. Electron rơi từ $n=2$ xuống $n=1$. Photon phát ra có năng lượng và bước sóng bao nhiêu?

<details><summary>Đáp án</summary>

1. $E_3 = -\\frac{13{,}6}{3^2} = -\\frac{13{,}6}{9} = -1{,}51\\ \\text{eV}$.
2. $\\Delta E = E_2 - E_1 = -3{,}4 - (-13{,}6) = 10{,}2\\ \\text{eV}$. $\\lambda = \\frac{1240}{10{,}2} \\approx 122\\ \\text{nm}$ (UV — vạch Lyman-$\\alpha$).

</details>

### 📝 Tóm tắt mục 2

- Bohr: electron ở mức rời rạc. $E_n = -\\frac{13{,}6}{n^2}\\ \\text{eV}$.
- Nhảy mức ↔ phát/hấp thụ photon. Tính được phổ chính xác cho H.

---

## 3. Dãy phổ Hydrogen

Mỗi "dãy" = tập hợp các vạch khi electron nhảy về 1 mức cuối cố định.

| Dãy | $n_\\text{cuối}$ | Vùng phổ | Năm phát hiện |
|-----|--------|----------|----------------|
| **Lyman** | 1 | UV | 1906 |
| **Balmer** | 2 | Nhìn thấy được (chính ánh sáng từ mặt trời và sao) | 1885 |
| **Paschen** | 3 | Hồng ngoại | 1908 |
| **Brackett** | 4 | Hồng ngoại xa | 1922 |

Dãy Balmer đặc biệt quan trọng — nó cho ánh sáng nhìn thấy, là cách thiên văn học **đo thành phần các sao** (mỗi nguyên tố có phổ vạch riêng).

💡 **Trực giác**: mỗi "dãy" như một nhóm cầu thang cùng đáp xuống chung MỘT bậc đích. Lyman = mọi cú rơi về bậc 1 (năng lượng lớn → UV); Balmer = rơi về bậc 2 (năng lượng vừa → nhìn thấy); Paschen = về bậc 3 (nhỏ → IR).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao chỉ dãy Balmer nhìn thấy được?"* Vì khoảng năng lượng các cú rơi về $n=2$ rơi đúng vào vùng ánh sáng khả kiến ($1{,}9$–$3{,}4\\ \\text{eV} \\leftrightarrow 656$–$365\\ \\text{nm}$). Rơi về $n=1$ (Lyman) năng lượng quá lớn → UV; về $n=3$ (Paschen) quá nhỏ → hồng ngoại.
- *"Làm sao thiên văn biết một ngôi sao có nguyên tố gì?"* Mỗi nguyên tố có "vân tay" phổ vạch riêng. Phân tích vạch hấp thụ/phát xạ trong ánh sáng sao → suy ra thành phần hóa học, dù cách hàng tỷ năm ánh sáng.
- *"Cùng dãy thì vạch nào năng lượng lớn nhất?"* Cú rơi từ $n=\\infty$ về mức đích (giới hạn dãy) — chênh lệch năng lượng lớn nhất, bước sóng ngắn nhất.

⚠ **Lỗi thường gặp**

- **Nhầm $n_\\text{cuối}$ của dãy.** Lyman về $n=1$, Balmer về $n=2$, Paschen về $n=3$. Đặt nhầm $n_\\text{cuối}$ → tính sai vùng phổ.
- **Tưởng dãy Balmer là tia tử ngoại.** Balmer nằm trong vùng NHÌN THẤY (đỏ H$\\alpha$ 656 nm, xanh H$\\beta$ 486 nm...). Lyman mới là UV.

🔁 **Dừng lại tự kiểm tra**

1. Vạch Hα (n=3→2) ứng với dãy nào, nằm ở vùng phổ nào?
2. Cú rơi n=5→3 thuộc dãy nào, vùng phổ nào?

<details><summary>Đáp án</summary>

1. Rơi về n=2 → dãy **Balmer** → vùng **nhìn thấy** (Hα đỏ, 656 nm).
2. Rơi về n=3 → dãy **Paschen** → vùng **hồng ngoại**.

</details>

### 📝 Tóm tắt mục 3

- Mỗi "dãy" = nhóm vạch cùng rơi về một mức đích cố định.
- Lyman (về n=1, UV), Balmer (về n=2, nhìn thấy), Paschen (về n=3, IR), Brackett (về n=4, IR xa).
- Balmer quan trọng cho thiên văn — phổ vạch là "vân tay" định danh nguyên tố trong sao.

---

## 4. Giới hạn mô hình Bohr — Mô hình hiện đại

Bohr chỉ đúng cho **Hydro 1 electron** (và H-like ions: He⁺, Li²⁺...). Với nhiều electron, không khớp.

### 4.1. Cơ học lượng tử (1925-1926)

Schrödinger và Heisenberg phát triển cơ học lượng tử — thay "quỹ đạo" của Bohr bằng **orbital** = vùng xác suất 3D mà electron có thể được tìm thấy.

**Hình dạng orbital**:
- **s**: hình cầu.
- **p**: 3 quả tạ theo 3 trục.
- **d**: 5 hình phức tạp.
- **f**: 7 hình rất phức tạp.

(Xem chi tiết ở [Chemistry/01-Structure/lesson-02-electron-config-periodic](../../../Chemistry/01-Structure/lesson-02-electron-config-periodic/).)

### 4.2. Nguyên lý bất định Heisenberg

Không thể đo đồng thời chính xác **vị trí** và **động lượng**:

$$\\Delta x \\cdot \\Delta p \\geq \\frac{\\hbar}{2}$$

→ Trong nguyên tử, không có "quỹ đạo" cố định — chỉ có **đám mây xác suất**. Bohr sai về "quỹ đạo" nhưng đúng về "mức năng lượng rời rạc".

💡 **Trực giác — orbital**: đừng hình dung electron chạy trên đường ray (quỹ đạo Bohr). Hãy hình dung một "đám mây mờ" bao quanh hạt nhân — chỗ nào mây đậm thì xác suất bắt gặp electron ở đó cao. Đó là orbital.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Bohr sai hoàn toàn à?"* Không. Bohr ĐÚNG về mức năng lượng rời rạc và công thức $E_n = -\\frac{13{,}6}{n^2}$ cho H — vẫn dùng tới ngày nay. Chỉ SAI ở hình ảnh "electron chạy trên quỹ đạo tròn xác định".
- *"Vì sao không thể biết chính xác cả vị trí lẫn vận tốc electron?"* Nguyên lý bất định Heisenberg $\\Delta x \\cdot \\Delta p \\geq \\frac{\\hbar}{2}$: đo càng chính xác vị trí ($\\Delta x$ nhỏ) thì động lượng càng mờ ($\\Delta p$ lớn). Đây là giới hạn cơ bản của tự nhiên, không phải do dụng cụ kém.
- *"Orbital s, p, d, f khác nhau ở đâu?"* Khác hình dạng đám mây xác suất: s (cầu), p (quả tạ), d (5 hình), f (7 hình). Quyết định cách nguyên tử liên kết hóa học.

⚠ **Lỗi thường gặp**

- **Vẽ electron như chấm chạy vòng tròn quanh hạt nhân.** Đó là hình Bohr đã lỗi thời. Mô hình đúng là đám mây xác suất (orbital), không có đường đi xác định.
- **Tưởng Heisenberg là "đo không chuẩn vì máy yếu".** Sai — đó là giới hạn nguyên lý của tự nhiên, không thiết bị nào vượt qua được.

🔁 **Dừng lại tự kiểm tra**

1. Mô hình Bohr đúng và sai ở điểm nào?
2. Orbital s có hình dạng gì?

<details><summary>Đáp án</summary>

1. ĐÚNG: mức năng lượng rời rạc, $E_n = -\\frac{13{,}6}{n^2}$ cho H. SAI: hình ảnh electron chạy trên quỹ đạo tròn cố định (thực tế là đám mây xác suất).
2. Hình **cầu** (đối xứng quanh hạt nhân).

</details>

### 📝 Tóm tắt mục 4

- Bohr OK cho H, sai cho nguyên tử nhiều e.
- Hiện đại: orbital = vùng xác suất 3D. Hình s/p/d/f.
- Heisenberg: $\\Delta x \\cdot \\Delta p \\geq \\frac{\\hbar}{2}$.

---

## 5. Bài tập

### Bài tập

**Bài 1**: Tính E mức $n=4$ của H.

**Bài 2**: Electron nhảy từ $n=4$ xuống $n=1$. Tính $\\lambda$ photon phát ra.

**Bài 3**: Vạch H$\\beta$ ($n=4 \\to n=2$). Tính $\\lambda$.

**Bài 4**: Tại sao mô hình Bohr không đúng cho He (2 electron)?

**Bài 5**: Cùng nguyên tố Na, electron ở orbital 3s vs 3p. Có cùng năng lượng không?

### Lời giải

**Bài 1**: $E_4 = -\\frac{13{,}6}{16} =$ **$-0{,}85\\ \\text{eV}$**.

**Bài 2**: $\\Delta E = E_4 - E_1 = -0{,}85 - (-13{,}6) = 12{,}75\\ \\text{eV}$. $\\lambda = \\frac{hc}{\\Delta E} = \\frac{(6{,}63 \\times 10^{-34})(3 \\times 10^8)}{12{,}75 \\times 1{,}6 \\times 10^{-19}} =$ **97,3 nm** (UV).

**Bài 3**: $\\Delta E = E_4 - E_2 = -0{,}85 - (-3{,}4) = 2{,}55\\ \\text{eV}$. $\\lambda = \\frac{1240}{2{,}55} =$ **486 nm** (xanh lá).

**Bài 4**: Bohr không tính đến **tương tác giữa các electron**. Với 1 e (H), chỉ có lực Coulomb e-hạt nhân. Với 2 e (He), thêm lực e-e đẩy nhau → phải dùng cơ học lượng tử để giải. Bohr ra sai.

**Bài 5**: KHÔNG. Trong nguyên tử nhiều electron (Na có 11), các electron trong cùng lớp NHƯNG khác phân lớp có năng lượng khác. 3s thấp hơn 3p (do hiệu ứng "screening" — electron 3s xâm nhập gần hạt nhân hơn 3p → hấp dẫn mạnh hơn → E thấp hơn). Đó là tại sao thứ tự điền 3s trước 3p (Aufbau).

---

## 6. Bài tiếp theo

[Lesson 06 — Hạt nhân & Phóng xạ](../lesson-06-nucleus-radioactivity/).

## 📝 Tổng kết

1. **Bohr (1913)**: 3 giả định. $E_n = -\\frac{13{,}6}{n^2}\\ \\text{eV}$ cho H. Giải thích phổ vạch.
2. **Nhảy mức**: $\\Delta E = h f = \\frac{hc}{\\lambda}$.
3. **4 dãy phổ H**: Lyman (UV), Balmer (nhìn thấy), Paschen, Brackett (IR).
4. **Hiện đại**: orbital (vùng xác suất), không phải quỹ đạo. Hình s/p/d/f.
5. **Heisenberg**: $\\Delta x \\cdot \\Delta p \\geq \\frac{\\hbar}{2}$ — không thể đo chính xác đồng thời.
`;
