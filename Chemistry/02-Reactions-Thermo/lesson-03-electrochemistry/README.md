# Lesson 03 (Tier 2) — Điện hóa (Electrochemistry)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **pin galvanic (Voltaic cell)**: biến phản ứng redox **tự xảy ra** thành **dòng điện**.
- Phân biệt **anode** (oxy hóa, cực âm trong pin) và **cathode** (khử, cực dương trong pin).
- Đọc **bảng thế điện cực chuẩn ($E^\circ$)** và tính **sức điện động pin** $E^\circ_\text{cell} = E^\circ_\text{cathode} - E^\circ_\text{anode}$.
- Dự đoán chiều phản ứng redox tự nhiên ($E^\circ_\text{cell} > 0$ → tự xảy ra).
- Hiểu **điện phân (electrolysis)**: dùng dòng điện **bắt buộc** phản ứng redox không tự xảy ra.
- Áp dụng **định luật Faraday** để tính khối lượng chất tạo ra/tiêu thụ khi điện phân: $m = \dfrac{I \cdot t \cdot M}{n \cdot F}$.

## Kiến thức tiền đề

- [Lesson 02 (T2) — Redox](../lesson-02-redox/) — biết oxy hóa, khử, cân bằng nửa phản ứng.
- [Physics — Mạch điện](../../../Physics/02-Thermo-Electromagnetism/lesson-06-current-circuits/) — biết dòng điện, hiệu điện thế (chưa triển khai, kiến thức cơ bản đủ).

---

## 1. Pin Galvanic — Biến hóa năng thành điện năng

### 💡 Trực giác / Hình dung

Nhớ phản ứng $\text{Zn} + \text{CuSO}_4 \rightarrow \text{ZnSO}_4 + \text{Cu}$ (Lesson 02, Bài 6): Zn tan dần, Cu bám lên thanh kẽm. Khi 2 chất tiếp xúc trực tiếp, electron chuyển từ Zn sang $\text{Cu}^{2+}$ **tại bề mặt** → tỏa nhiệt, **không** tạo dòng điện sử dụng được.

**Ý tưởng pin galvanic**: tách 2 phản ứng ra 2 ngăn riêng, nối bằng dây dẫn. Electron buộc phải chạy qua dây ngoài → **tạo dòng điện**.

### 1.1. Cấu tạo pin Daniell (Zn-Cu)

```
   anode (−)                          cathode (+)
   Zn rod                             Cu rod
       |                                |
       |── electron chạy ngoài ──→     |
       |                                |
   ZnSO₄ (1 M)  ←── cầu muối ──→   CuSO₄ (1 M)
                  (KCl hoặc NH₄NO₃)
```

- **Anode** (cực âm trong pin galvanic, được ký hiệu −): Zn bị oxy hóa, mất e.

$$\text{Zn(s)} \rightarrow \text{Zn}^{2+}\text{(aq)} + 2e^- \qquad (E^\circ = -0{,}76 \text{ V})$$

- **Cathode** (cực dương, +): $\text{Cu}^{2+}$ bị khử, nhận e.

$$\text{Cu}^{2+}\text{(aq)} + 2e^- \rightarrow \text{Cu(s)} \qquad (E^\circ = +0{,}34 \text{ V})$$

- **Cầu muối**: dòng ion lưu thông giữa 2 ngăn để cân bằng điện tích — không có nó, mỗi ngăn sẽ tích lũy điện tích → pin ngừng hoạt động.

**Phản ứng tổng**: $\text{Zn} + \text{Cu}^{2+} \rightarrow \text{Zn}^{2+} + \text{Cu}$. Sức điện động (EMF): **$E^\circ_\text{cell} = 0{,}34 - (-0{,}76) = 1{,}10$ V**.

### ⚠ Lỗi thường gặp

- **Nhầm anode/cathode**: Trong **pin galvanic**: anode = cực ÂM, cathode = cực DƯƠNG. Trong **điện phân**: ngược lại — anode = cực DƯƠNG, cathode = cực ÂM. Cùng chữ "anode" nhưng dấu khác nhau!
- **Quên cầu muối**: pin không có cầu muối sẽ ngừng trong vài giây. Cầu muối quan trọng như dây ngoài.

### 1.2. Quy ước ký hiệu pin

Pin Daniell viết: $\text{Zn(s)} \mid \text{Zn}^{2+}\text{(1 M)} \parallel \text{Cu}^{2+}\text{(1 M)} \mid \text{Cu(s)}$

- Dấu `|` ngăn cách giữa pha rắn và pha lỏng (cùng điện cực).
- Dấu `||` ngăn cách giữa 2 ngăn (cầu muối).
- Quy ước: anode (oxy hóa) ở **bên trái**, cathode (khử) ở **bên phải**.

### 📝 Tóm tắt mục 1

- Pin galvanic = redox tự xảy ra → dòng điện.
- Anode (−): oxy hóa (mất e). Cathode (+): khử (nhận e).
- Electron chạy ngoài: anode → cathode. Cation chạy trong cầu muối về cathode.
- $\text{EMF} = E^\circ_\text{cathode} - E^\circ_\text{anode}$.

---

## 2. Bảng thế điện cực chuẩn E°

### 2.1. Định nghĩa

**Thế điện cực chuẩn $E^\circ$** = thế tự nhiên của một nửa phản ứng khử, đo so với **điện cực hydrogen chuẩn (SHE)** (quy ước $E^\circ = 0$).

Tất cả nửa phản ứng được viết dưới dạng khử (reduction): $\text{Ox} + n\,e^- \rightarrow \text{Red}$. $E^\circ$ cho biết "mức độ ưu tiên" của nửa phản ứng khử đó.

### 2.2. Bảng E° chọn lọc (tại 25°C, 1 M, 1 atm)

| Nửa phản ứng khử | $E^\circ$ (V) |
|------------------|--------|
| $\text{F}_2 + 2e^- \rightarrow \text{2F}^-$ | +2,87 (oxy hóa MẠNH nhất) |
| $\text{Au}^{3+} + 3e^- \rightarrow \text{Au}$ | +1,50 |
| $\text{Cl}_2 + 2e^- \rightarrow \text{2Cl}^-$ | +1,36 |
| $\text{O}_2 + \text{4H}^+ + 4e^- \rightarrow \text{2H}_2\text{O}$ | +1,23 |
| $\text{Ag}^+ + e^- \rightarrow \text{Ag}$ | +0,80 |
| $\text{Fe}^{3+} + e^- \rightarrow \text{Fe}^{2+}$ | +0,77 |
| $\text{Cu}^{2+} + 2e^- \rightarrow \text{Cu}$ | +0,34 |
| **$\text{2H}^+ + 2e^- \rightarrow \text{H}_2$** | **0,00** (chuẩn SHE) |
| $\text{Pb}^{2+} + 2e^- \rightarrow \text{Pb}$ | −0,13 |
| $\text{Sn}^{2+} + 2e^- \rightarrow \text{Sn}$ | −0,14 |
| $\text{Ni}^{2+} + 2e^- \rightarrow \text{Ni}$ | −0,25 |
| $\text{Fe}^{2+} + 2e^- \rightarrow \text{Fe}$ | −0,44 |
| $\text{Zn}^{2+} + 2e^- \rightarrow \text{Zn}$ | −0,76 |
| $\text{Al}^{3+} + 3e^- \rightarrow \text{Al}$ | −1,66 |
| $\text{Mg}^{2+} + 2e^- \rightarrow \text{Mg}$ | −2,37 |
| $\text{Na}^+ + e^- \rightarrow \text{Na}$ | −2,71 |
| $\text{K}^+ + e^- \rightarrow \text{K}$ | −2,93 |
| $\text{Li}^+ + e^- \rightarrow \text{Li}$ | −3,04 (khử MẠNH nhất) |

### 2.3. Ý nghĩa

- **$E^\circ$ càng dương → càng dễ nhận e (oxy hóa mạnh)** → bị khử. $\text{F}_2$ là oxy hóa mạnh nhất.
- **$E^\circ$ càng âm → càng dễ mất e (khử mạnh)** → bị oxy hóa. Li là khử mạnh nhất.

Bảng này tương đương "dãy hoạt động kim loại" trong sách phổ thông: K > Na > Ca > Mg > Al > Zn > Fe > Ni > Sn > Pb > H > Cu > Hg > Ag > Au. Kim loại đứng trước ($E^\circ$ âm hơn) **đẩy** kim loại đứng sau ra khỏi muối.

### 2.4. Tính E°cell

Cho 2 nửa phản ứng (cả 2 viết dưới dạng khử):

$$E^\circ_\text{cell} = E^\circ_\text{cathode} - E^\circ_\text{anode}$$

trong đó:
- $E^\circ_\text{cathode}$ = $E^\circ$ của nửa khử (nửa nhận e).
- $E^\circ_\text{anode}$ = $E^\circ$ của nửa **bị oxy hóa** (vẫn lấy $E^\circ$ từ dạng khử, không đổi dấu, không nhân hệ số).

**Pin Daniell**:
- Cathode: $\text{Cu}^{2+}/\text{Cu}$, $E^\circ = +0{,}34$ V.
- Anode: $\text{Zn}^{2+}/\text{Zn}$, $E^\circ = -0{,}76$ V.
- $E^\circ_\text{cell} = 0{,}34 - (-0{,}76) = \mathbf{+1{,}10}$ **V**.

**$E^\circ_\text{cell} > 0$ → phản ứng tự xảy ra (spontaneous)**.
**$E^\circ_\text{cell} < 0$ → không tự xảy ra; cần năng lượng từ ngoài (điện phân)**.

### 2.5. Ba ví dụ tính E°cell

**Ví dụ 1 — Pin Ag-Cu:**
- $\text{2Ag}^+ + \text{Cu} \rightarrow \text{2Ag} + \text{Cu}^{2+}$
- $E^\circ_\text{cell} = E^\circ(\text{Ag}^+/\text{Ag}) - E^\circ(\text{Cu}^{2+}/\text{Cu}) = 0{,}80 - 0{,}34 = \mathbf{+0{,}46}$ **V**. Tự xảy ra.

**Ví dụ 2 — Pin Mg-Zn:**
- $\text{Mg} + \text{Zn}^{2+} \rightarrow \text{Mg}^{2+} + \text{Zn}$
- $E^\circ_\text{cell} = E^\circ(\text{Zn}^{2+}/\text{Zn}) - E^\circ(\text{Mg}^{2+}/\text{Mg}) = -0{,}76 - (-2{,}37) = \mathbf{+1{,}61}$ **V**. Tự xảy ra.

**Ví dụ 3 — Liệu Cu có "đẩy" được Zn không?**
- $\text{Cu} + \text{Zn}^{2+} \rightarrow \text{Cu}^{2+} + \text{Zn}$?
- $E^\circ_\text{cell} = E^\circ(\text{Zn}^{2+}/\text{Zn}) - E^\circ(\text{Cu}^{2+}/\text{Cu}) = -0{,}76 - 0{,}34 = \mathbf{-1{,}10}$ **V** < 0. **KHÔNG tự xảy ra**.
- → Cu KHÔNG đẩy được Zn. Đúng với dãy hoạt động.

### 📝 Tóm tắt mục 2

- $E^\circ$ lớn (+) = oxy hóa mạnh, bị khử; $E^\circ$ âm = khử mạnh, bị oxy hóa.
- $E^\circ_\text{cell} = E^\circ_\text{cathode} - E^\circ_\text{anode}$ (cả 2 lấy từ dạng khử).
- $E^\circ_\text{cell} > 0$ → tự xảy ra. $E^\circ_\text{cell} < 0$ → cần điện phân.

---

## 3. Điện phân (Electrolysis)

### 3.1. Ý tưởng — ngược với pin galvanic

Trong pin galvanic, phản ứng redox tự xảy ra → tạo dòng điện.
Trong **điện phân**, ta **đẩy** phản ứng redox **không tự xảy ra** bằng cách cấp dòng điện từ ngoài (như từ pin hoặc nguồn điện).

### 3.2. Quy ước anode/cathode (NGƯỢC pin galvanic!)

Trong điện phân:
- **Anode** = cực **DƯƠNG** (kết nối với cực + của nguồn). Xảy ra **oxy hóa**.
- **Cathode** = cực **ÂM**. Xảy ra **khử**.

**Mẹo nhớ chung**: **Anode = Oxidation**, **Cathode = reduCtion**. (Đặc tính phản ứng — oxy hóa vs khử — không đổi giữa pin & điện phân. Chỉ điện tích đảo.)

### 3.3. Ví dụ — Điện phân dung dịch NaCl (chlor-alkali process)

- **Cathode (cực −)**: $\text{2H}_2\text{O} + 2e^- \rightarrow \text{H}_2\text{(g)} + \text{2OH}^-$
- **Anode (cực +)**: $\text{2Cl}^- \rightarrow \text{Cl}_2\text{(g)} + 2e^-$
- **Tổng**: $\text{2NaCl} + \text{2H}_2\text{O} \rightarrow \text{2NaOH} + \text{H}_2\text{(g)} + \text{Cl}_2\text{(g)}$

Sản phẩm có giá trị kinh tế lớn: $\text{Cl}_2$ (cho PVC, khử trùng nước), $\text{H}_2$ (nhiên liệu), NaOH (xà phòng, giấy).

### 3.4. Định luật Faraday

Khối lượng chất tạo ra/tiêu thụ trong điện phân:

$$m = \dfrac{I \times t \times M}{n \times F}$$

- $m$ = khối lượng chất (g)
- $I$ = cường độ dòng (A)
- $t$ = thời gian (giây)
- $M$ = khối lượng mol (g/mol)
- $n$ = số electron trao đổi cho 1 mol chất
- $F$ = hằng số Faraday = **96 485 C/mol** (điện tích 1 mol electron)

### 3.5. Ví dụ — Mạ đồng

Mạ một đồ vật bằng Cu từ dung dịch $\text{CuSO}_4$, dòng $I = 2$ A, $t = 30$ phút $= 1800$ s. Tính $m(\text{Cu})$ mạ được.

- Phản ứng: $\text{Cu}^{2+} + 2e^- \rightarrow \text{Cu}$ → $n = 2$.
- $M(\text{Cu}) = 63{,}55$ g/mol.
- $m = \dfrac{2 \times 1800 \times 63{,}55}{2 \times 96485} = \dfrac{228\,780}{192\,970} \approx \mathbf{1{,}19}$ **g Cu**.

### 📝 Tóm tắt mục 3

- Điện phân: dùng điện cấp từ ngoài để bắt buộc redox.
- Anode (+) = oxy hóa; Cathode (−) = khử. Đảo dấu so với pin.
- Faraday: $m = \dfrac{ItM}{nF}$, $F = 96\,485$ C/mol.

---

## 4. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Cho 2 nửa phản ứng:
- $\text{Ag}^+ + e^- \rightarrow \text{Ag}$, $E^\circ = +0{,}80$ V
- $\text{Fe}^{2+} + 2e^- \rightarrow \text{Fe}$, $E^\circ = -0{,}44$ V

a) Viết phản ứng tổng của pin galvanic.
b) Tính $E^\circ_\text{cell}$.
c) Xác định anode, cathode, viết ký hiệu pin.

**Bài 2**: Trong các phản ứng sau, phản ứng nào tự xảy ra ($E^\circ_\text{cell} > 0$)?
a) $\text{Sn} + \text{Pb}^{2+} \rightarrow \text{Sn}^{2+} + \text{Pb}$ ($E^\circ\,\text{Sn}^{2+}/\text{Sn} = -0{,}14$; $E^\circ\,\text{Pb}^{2+}/\text{Pb} = -0{,}13$)
b) $\text{Cu} + \text{2Ag}^+ \rightarrow \text{Cu}^{2+} + \text{2Ag}$ ($E^\circ\,\text{Ag} = 0{,}80$; $E^\circ\,\text{Cu} = 0{,}34$)
c) $\text{Zn} + \text{Fe}^{2+} \rightarrow \text{Zn}^{2+} + \text{Fe}$ ($E^\circ\,\text{Zn} = -0{,}76$; $E^\circ\,\text{Fe} = -0{,}44$)

**Bài 3**: Tại sao pin Zn-Ag có EMF cao hơn pin Zn-Cu? ($E^\circ\,\text{Ag} = 0{,}80$; $\text{Cu} = 0{,}34$; $\text{Zn} = -0{,}76$.)

**Bài 4**: Điện phân dung dịch $\text{CuSO}_4$ với dòng $I = 5$ A trong 30 phút. Tính khối lượng Cu thu được. ($M(\text{Cu}) = 63{,}55$.)

**Bài 5**: Để mạ Ag dày 0.01 mm lên 1 vật có diện tích bề mặt 100 cm² (khối lượng riêng Ag = 10.5 g/cm³), cần điện lượng bao nhiêu? Ở $I = 1$ A cần bao nhiêu phút?

**Bài 6**: Vì sao sắt Fe đặt vào dung dịch $\text{CuSO}_4$ thì bị "đỏ" lên (xuất hiện đồng), nhưng đặt vào dung dịch $\text{ZnSO}_4$ thì không có gì xảy ra?

### Lời giải

**Bài 1**:
- $E^\circ(\text{Ag}) > E^\circ(\text{Fe})$ → Ag bị khử (cathode), Fe bị oxy hóa (anode).

a) **Phản ứng tổng**: $\text{Fe} + \text{2Ag}^+ \rightarrow \text{Fe}^{2+} + \text{2Ag}$.
b) **$E^\circ_\text{cell}$** $= E^\circ_\text{cathode} - E^\circ_\text{anode} = 0{,}80 - (-0{,}44) = \mathbf{+1{,}24}$ **V**.
c) Ký hiệu pin: **$\text{Fe(s)} \mid \text{Fe}^{2+}\text{(1 M)} \parallel \text{Ag}^+\text{(1 M)} \mid \text{Ag(s)}$**.

**Bài 2**:
a) $E^\circ_\text{cell} = E^\circ(\text{Pb}) - E^\circ(\text{Sn}) = -0{,}13 - (-0{,}14) = +0{,}01$ V > 0 → **tự xảy ra** (gần như cân bằng).
b) $E^\circ_\text{cell} = E^\circ(\text{Ag}) - E^\circ(\text{Cu}) = 0{,}80 - 0{,}34 = +0{,}46$ V → **tự xảy ra** (mạnh).
c) $E^\circ_\text{cell} = E^\circ(\text{Fe}) - E^\circ(\text{Zn}) = -0{,}44 - (-0{,}76) = +0{,}32$ V → **tự xảy ra**.

**Bài 3**: 
- Pin Zn-Ag: $E^\circ_\text{cell} = E^\circ(\text{Ag}) - E^\circ(\text{Zn}) = 0{,}80 - (-0{,}76) = +1{,}56$ V.
- Pin Zn-Cu: $E^\circ_\text{cell} = E^\circ(\text{Cu}) - E^\circ(\text{Zn}) = 0{,}34 - (-0{,}76) = +1{,}10$ V.
- Pin Zn-Ag cao hơn vì Ag có $E^\circ$ dương hơn → cathode hút e mạnh hơn → EMF lớn hơn.

**Bài 4**: 
- $t = 30 \times 60 = 1800$ s; $I = 5$ A; $n = 2$ ($\text{Cu}^{2+} + 2e^- \rightarrow \text{Cu}$); $M = 63{,}55$.
- $m = \dfrac{5 \times 1800 \times 63{,}55}{2 \times 96485} = \dfrac{571\,950}{192\,970} = \mathbf{2{,}96}$ **g Cu**.

**Bài 5**: 
- Thể tích Ag = $100 \times 0{,}001 = 0{,}1$ cm³. Khối lượng = $0{,}1 \times 10{,}5 = 1{,}05$ g.
- $n(\text{Ag}) = \dfrac{1{,}05}{107{,}87} = 0{,}00974$ mol.
- Điện lượng cần: $Q = n \times n_e \times F = 0{,}00974 \times 1 \times 96485 = \mathbf{939{,}5}$ **C**. (Vì $\text{Ag}^+ + e^- \rightarrow \text{Ag}$, mỗi mol Ag cần 1 mol e.)
- Ở $I = 1$ A: $t = Q/I = 939{,}5$ s $= \mathbf{15{,}66}$ **phút**.

**Bài 6**: 
- $\text{Fe} + \text{Cu}^{2+}$: $E^\circ_\text{cell} = E^\circ(\text{Cu}) - E^\circ(\text{Fe}) = 0{,}34 - (-0{,}44) = +0{,}78$ V > 0 → **tự xảy ra**. Fe bị oxy hóa, Cu kim loại bám lên (đỏ).
- $\text{Fe} + \text{Zn}^{2+}$: $E^\circ_\text{cell} = E^\circ(\text{Zn}) - E^\circ(\text{Fe}) = -0{,}76 - (-0{,}44) = -0{,}32$ V < 0 → **KHÔNG tự xảy ra**. Vì Zn có thế thấp hơn Fe → Zn "ổn định hơn" Fe ở dạng kim loại → $\text{Zn}^{2+}$ không "muốn" thành Zn kim loại trừ khi có Mg, Al, Na... đẩy.

---

## 5. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 04 — Nhiệt động hóa học](../lesson-04-thermochemistry/) — $\Delta H$, $\Delta S$, $\Delta G$; liên hệ với $E^\circ_\text{cell}$ qua $\Delta G = -n \cdot F \cdot E^\circ$.
- **Liên kết Physics**: dòng điện, mạch, năng lượng → [`Physics/02-Thermo-Electromagnetism/lesson-06-current-circuits`](../../../Physics/02-Thermo-Electromagnetism/lesson-06-current-circuits/).
- **Liên kết Math**: tính m từ ItM/(nF) = phương trình đại số.

---

## 📝 Tổng kết Lesson 03 (T2)

1. **Pin galvanic**: redox tự xảy ra → dòng điện. Anode (−) oxy hóa; cathode (+) khử.
2. **$E^\circ_\text{cell} = E^\circ_\text{cathode} - E^\circ_\text{anode}$** (đều lấy từ dạng khử). $E^\circ_\text{cell} > 0$ → tự xảy ra.
3. **Bảng $E^\circ$**: $\text{F}_2$ oxy hóa mạnh nhất (+2,87), Li khử mạnh nhất (−3,04).
4. **Điện phân**: ngược pin — cấp điện để bắt redox không tự xảy ra. Anode (+) = oxy hóa, cathode (−) = khử.
5. **Faraday**: $m = \dfrac{ItM}{nF}$, $F = 96\,485$ C/mol.

**Tiếp theo**: [Lesson 04 — Nhiệt động hóa học](../lesson-04-thermochemistry/)
