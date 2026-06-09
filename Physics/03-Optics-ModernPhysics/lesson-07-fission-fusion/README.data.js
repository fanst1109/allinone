// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Physics/03-Optics-ModernPhysics/lesson-07-fission-fusion/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 07 (T3) — Phân hạch & Nhiệt hạch

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt **phân hạch (fission)** và **nhiệt hạch (fusion)** — 2 cách giải phóng năng lượng từ hạt nhân.
- Hiểu **đường cong năng lượng liên kết / nucleon** — vì sao cả 2 phản ứng đều tỏa năng lượng (nhưng theo hướng ngược nhau).
- Biết nguyên lý lò phản ứng hạt nhân, bom nguyên tử.
- Hiểu vì sao nhiệt hạch (Mặt Trời) chưa thực hiện được trên Trái Đất ở quy mô thương mại.

## Kiến thức tiền đề

- [Lesson 06 (T3) — Hạt nhân & Phóng xạ](../lesson-06-nucleus-radioactivity/) — biết năng lượng liên kết.

---

## 1. Đường cong năng lượng liên kết / nucleon

**Năng lượng liên kết / nucleon** $= E_\\text{liên kết} / (Z + N)$. Đo "trung bình mỗi nucleon được giữ chặt thế nào".

Đồ thị $E_\\text{liên kết}$/nucleon theo số khối $A$:
- Tăng nhanh từ $A$ nhỏ (H) đến $A \\approx 60$ (Fe-56 cực đại $\\sim 8{,}8\\ \\text{MeV/nucleon}$).
- Giảm chậm về phía $A$ lớn (U-238 $\\approx 7{,}6\\ \\text{MeV/nucleon}$).

💡 **Ý nghĩa**: hạt nhân ở vùng $A \\approx 56$ (Fe) **ổn định nhất**. Đi xa khỏi Fe theo 2 hướng:
- **Hạt nhân nhẹ** (H, He) ghép lại → tiến gần Fe → tỏa năng lượng (nhiệt hạch).
- **Hạt nhân nặng** (U, Pu) tách ra → tiến gần Fe → tỏa năng lượng (phân hạch).

Đó là tại sao cả 2 phản ứng đều tỏa năng lượng.

**Định nghĩa đầy đủ — năng lượng liên kết / nucleon**:
- **(a) Là gì**: năng lượng liên kết chia cho tổng số nucleon, $E_\\text{lk}/A$ (MeV/nucleon). Đo mức độ "giữ chặt TRUNG BÌNH mỗi nucleon" — cao hơn = hạt nhân bền hơn.
- **(b) Vì sao cần**: $E_\\text{lk}$ tổng luôn tăng theo kích thước hạt nhân nên không so sánh độ bền trực tiếp được. Chia cho $A$ mới so được hạt nhân lớn-nhỏ công bằng → giải thích vì sao cả fission lẫn fusion đều "leo dốc về phía Fe".
- **(c) Ví dụ số kèm đơn vị**: H-2 chỉ $\\sim 1{,}1\\ \\text{MeV/nucleon}$ (lỏng lẻo); Fe-56 $\\sim 8{,}8\\ \\text{MeV/nucleon}$ (chặt nhất); U-238 $\\sim 7{,}6\\ \\text{MeV/nucleon}$. Đi từ U về Fe (fission) hay từ H về Fe (fusion) đều tăng $E_\\text{lk}$/nucleon → tỏa năng lượng.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao cả ghép (fusion) lẫn tách (fission) đều tỏa năng lượng?"* Vì cả hai đều di chuyển về phía Fe-56 (đỉnh đồ thị, bền nhất). Hạt nhẹ ghép lại → tiến về Fe; hạt nặng tách ra → cũng tiến về Fe. Cả hai đều tăng E_lk/nucleon → nhả phần dư ra.
- *"Tách hay ghép Fe-56 thì sao?"* TỐN năng lượng, không tỏa — vì Fe đã ở đỉnh, mọi hướng đi đều xuống dốc (kém bền hơn).
- *"Năng lượng tỏa ra từ đâu?"* Từ độ hụt khối: tổng khối lượng sản phẩm < tổng khối lượng ban đầu, phần chênh $\\Delta m \\cdot c^2$ thành năng lượng.

⚠ **Lỗi thường gặp**

- **Tưởng hạt nhân càng nặng càng bền.** Sai — bền nhất là Fe-56 ở GIỮA. U-238 nặng nhưng kém bền hơn Fe (dễ phân hạch).
- **Lẫn $E_\\text{lk}$ tổng với $E_\\text{lk}$/nucleon.** U-238 có $E_\\text{lk}$ tổng lớn (nhiều nucleon) nhưng $E_\\text{lk}$/nucleon lại THẤP hơn Fe → so độ bền phải dùng giá trị trên mỗi nucleon.

🔁 **Dừng lại tự kiểm tra**

1. Đồng vị nào bền nhất, ở đâu trên đồ thị $E_\\text{lk}$/nucleon?
2. Ghép 2 hạt H-2 thành He-4 tỏa hay thu năng lượng? Vì sao?

<details><summary>Đáp án</summary>

1. **Fe-56**, ở ĐỈNH đồ thị ($\\sim 8{,}8\\ \\text{MeV/nucleon}$) — nucleon được giữ chặt nhất.
2. **Tỏa** năng lượng. He-4 ($\\sim 7\\ \\text{MeV/nucleon}$) bền hơn H-2 ($\\sim 1{,}1\\ \\text{MeV/nucleon}$) → tiến gần Fe → tăng $E_\\text{lk}$/nucleon → nhả năng lượng ra.

</details>

### 📝 Tóm tắt mục 1

- $E_\\text{lk}$/nucleon = "độ bền trung bình mỗi nucleon", đỉnh ở Fe-56 ($\\sim 8{,}8\\ \\text{MeV}$).
- Hạt nhẹ ghép lại (fusion) và hạt nặng tách ra (fission) đều tiến về Fe → đều tỏa năng lượng.
- Năng lượng đến từ độ hụt khối $\\Delta m \\cdot c^2$.

---

## 2. Phân hạch (Fission)

### 2.1. Cơ chế

Hạt nhân nặng (U-235, Pu-239) hấp thụ 1 neutron chậm → bất ổn → tách thành 2 hạt nhân nhẹ hơn + vài neutron + năng lượng.

Ví dụ:

$$^{235}\\text{U} + n \\to {}^{141}\\text{Ba} + {}^{92}\\text{Kr} + 3n + 200\\ \\text{MeV}$$

200 MeV mỗi phản ứng — gấp **40 triệu lần** năng lượng từ phản ứng hóa học bình thường (vài eV).

### 2.2. Phản ứng dây chuyền

Mỗi phân hạch sinh ra trung bình 2-3 neutron. Nếu mỗi neutron mới gây 1 phân hạch khác → **dây chuyền**:
- 1 → 2 → 4 → 8 → ... (gấp đôi mỗi giai đoạn).
- Ở quy mô khối lượng tới hạn (~ kg) → phản ứng diễn ra nhanh → giải phóng năng lượng khổng lồ.

### 2.3. Lò phản ứng vs Bom

**Lò phản ứng hạt nhân**: kiểm soát chậm phản ứng dây chuyền (1 neutron/phân hạch tiếp tục). Dùng:
- **Thanh điều khiển** (Cd hoặc B): hấp thụ neutron dư.
- **Chất giảm tốc** ($\\text{H}_2\\text{O}$ hoặc $\\text{D}_2\\text{O}$): chậm neutron nhanh → neutron chậm (dễ gây fission).
- **Tản nhiệt**: nước nóng → sinh hơi → quay tuabin → tạo điện.

**Bom nguyên tử (A-bomb)**: gộp nhanh 2 khối "dưới tới hạn" thành "trên tới hạn" → phản ứng dây chuyền không kiểm soát → nổ.

### 2.4. Ưu nhược điểm

| Ưu | Nhược |
|----|--------|
| Năng lượng khổng lồ / 1 kg nhiên liệu | Chất thải phóng xạ (tồn tại hàng chục nghìn năm) |
| Không phát $\\text{CO}_2$ (sạch về khí hậu) | Rủi ro tai nạn (Chernobyl 1986, Fukushima 2011) |
| Cung cấp ổn định, không phụ thuộc thời tiết | Vũ khí hạt nhân |

💡 **Trực giác**: phản ứng dây chuyền như đám domino — mỗi viên (phân hạch) đổ làm đổ 2-3 viên kế. Kiểm soát để mỗi viên chỉ đổ ĐÚNG 1 viên tiếp = lò phản ứng (cháy đều); để mỗi viên đổ 2-3 viên = bom (bùng nổ theo cấp số nhân).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Khối lượng tới hạn là gì?"* Là khối lượng tối thiểu để đủ neutron sinh ra gây phản ứng kế tiếp thay vì thoát ra ngoài. Dưới ngưỡng → dây chuyền tắt; trên ngưỡng → tự duy trì.
- *"Thanh điều khiển và chất giảm tốc khác nhau thế nào?"* Thanh điều khiển (Cd, B) HẤP THỤ neutron dư → giảm tốc độ phản ứng. Chất giảm tốc ($\\text{H}_2\\text{O}$, $\\text{D}_2\\text{O}$) LÀM CHẬM neutron (không hấp thụ) → neutron chậm dễ gây fission hơn.
- *"200 MeV mỗi phản ứng có lớn không?"* Cực lớn so với hóa học — phản ứng đốt cháy chỉ vài eV/phân tử. $200\\ \\text{MeV} / \\text{vài eV} \\approx 40$ triệu lần → vì sao 1 kg U thay được hàng triệu kg than.

⚠ **Lỗi thường gặp**

- **Lẫn lò phản ứng với bom.** Lò: dây chuyền KIỂM SOÁT (hệ số nhân ≈ 1), cháy đều tạo điện — KHÔNG nổ như bom hạt nhân. Bom: hệ số nhân > 1 không kiểm soát.
- **Nhầm fission cần neutron nhanh.** Ngược lại — U-235 dễ phân hạch bởi neutron CHẬM, nên cần chất giảm tốc.

🔁 **Dừng lại tự kiểm tra**

1. Cân bằng: $^{235}\\text{U} + n \\to {}^{141}\\text{Ba} + {}^{92}\\text{Kr} + ?\\,n$. Bao nhiêu neutron sinh ra?
2. Trong lò, để giảm tốc độ phản ứng nên đẩy thanh điều khiển VÀO hay RÚT RA?

<details><summary>Đáp án</summary>

1. Bảo toàn số khối: $235 + 1 = 141 + 92 + x \\to 236 = 233 + x \\to x = 3$ neutron. (Bảo toàn $Z$: $92 = 56 + 36$ ✓.)
2. Đẩy thanh điều khiển **VÀO** → hấp thụ nhiều neutron hơn → ít phản ứng kế tiếp → chậm lại.

</details>

### 📝 Tóm tắt mục 2

- Phân hạch: $\\text{U/Pu} + n \\to$ 2 hạt nhỏ $+ 3n + 200\\ \\text{MeV}$.
- Phản ứng dây chuyền: 1 → 2 → 4 → ... cần kiểm soát.
- Lò: chậm có kiểm soát → điện. Bom: nhanh không kiểm soát → nổ.

---

## 3. Nhiệt hạch (Fusion)

### 3.1. Cơ chế

2 hạt nhân nhẹ ghép thành 1 hạt nhân nặng hơn + tỏa năng lượng.

Ví dụ — phản ứng D-T (deuterium-tritium):

$$^{2}\\text{H} + {}^{3}\\text{H} \\to {}^{4}\\text{He} + n + 17{,}6\\ \\text{MeV}$$

### 3.2. Tại sao Mặt Trời sáng?

Mặt Trời hoạt động nhờ **fusion** trong lõi:

$$4\\,^{1}\\text{H} \\to {}^{4}\\text{He} + 2\\,e^+ + 2\\,\\nu + 26{,}7\\ \\text{MeV}$$

Mỗi giây Mặt Trời chuyển **4 triệu tấn khối lượng** thành năng lượng (theo $E = mc^2$) → bức xạ ra. Đã làm được vậy **4.6 tỷ năm** và còn ~ 5 tỷ năm nữa.

### 3.3. Vì sao chưa làm được trên Trái Đất?

Để fusion xảy ra, 2 hạt nhân (cùng dương) phải đẩy đến rất gần nhau → cần **nhiệt độ siêu cao** ($\\sim 100$ triệu $^\\circ\\text{C}$) để vượt rào cản Coulomb.

Tại nhiệt độ này, không có vật liệu nào "chứa" được plasma. Các phương pháp đang nghiên cứu:
- **Magnetic confinement** (tokamak — ITER): giam plasma bằng từ trường mạnh. Dự kiến hoạt động ~ 2035.
- **Inertial confinement** (laser, NIF): bắn laser cực mạnh vào viên D-T → nén nhanh → fusion. Lần đầu đạt "ignition" 2022 (giải phóng năng lượng > năng lượng vào).

### 3.4. Tại sao fusion là "Holy Grail" của năng lượng?

- Nhiên liệu D (deuterium) **dồi dào** trong nước biển.
- T (tritium) tự sinh từ Li.
- Sản phẩm là He (an toàn, không phóng xạ).
- Năng lượng / 1 kg D-T = **gấp 10 triệu lần** dầu mỏ.
- **Không có chất thải phóng xạ lâu dài**.

→ Nếu giải được = năng lượng vô tận, sạch, an toàn. Đó là mục tiêu thế kỷ 21.

💡 **Trực giác**: fusion như "ép hai nam châm cùng cực lại gần" — hai hạt nhân cùng dương đẩy nhau dữ dội (rào cản Coulomb), chỉ khi lao vào nhau đủ NHANH (nhiệt độ cực cao) mới chạm được tới khoảng lực hạt nhân mạnh kéo dính lại.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao fusion cần nhiệt độ ~100 triệu °C còn fission thì không?"* Fission chỉ cần một neutron (không điện tích) chạm hạt nhân — dễ. Fusion cần ÉP hai hạt nhân CÙNG DƯƠNG vượt lực đẩy Coulomb → cần động năng khổng lồ → nhiệt độ siêu cao.
- *"Mặt Trời nóng 'chỉ' ~15 triệu $^\\circ\\text{C}$ ở lõi sao vẫn fusion được?"* Nhờ áp suất hấp dẫn khổng lồ + hiệu ứng đường hầm lượng tử + thời gian khổng lồ. Trên Trái Đất thiếu áp suất đó nên phải bù bằng nhiệt độ cao hơn.
- *"Fusion có chất thải phóng xạ không?"* Rất ít và ngắn hạn so với fission. Sản phẩm chính (He) hoàn toàn vô hại — đó là lý do fusion hấp dẫn.

⚠ **Lỗi thường gặp**

- **Lẫn fusion với fission.** Fusion = GHÉP hạt nhẹ (H→He, cần nhiệt độ cao). Fission = TÁCH hạt nặng (U→2 mảnh, dùng neutron). Mặt Trời chạy fusion, nhà máy điện hiện nay chạy fission.
- **Tưởng fusion đã thương mại hóa.** Chưa — tới 2026 mới đạt "ignition" (NIF 2022) và ITER dự kiến ~2035. Đây là công nghệ tương lai.

🔁 **Dừng lại tự kiểm tra**

1. Phản ứng $^{2}\\text{H} + {}^{3}\\text{H} \\to {}^{4}\\text{He} + ?$ — hạt còn thiếu là gì? (Bảo toàn số khối và số hiệu.)
2. Mặt Trời tỏa năng lượng nhờ fission hay fusion?

<details><summary>Đáp án</summary>

1. Bảo toàn $A$: $2+3 = 4 + x \\to x$ có $A = 1$. Bảo toàn $Z$: $1+1 = 2 + y \\to y$ có $Z = 0$. → hạt $A=1$, $Z=0$ = **neutron (n)**. Đầy đủ: $^{2}\\text{H} + {}^{3}\\text{H} \\to {}^{4}\\text{He} + n + 17{,}6\\ \\text{MeV}$.
2. **Fusion** (ghép 4 hạt nhân H thành He, tỏa 26.7 MeV mỗi chu trình).

</details>

### 📝 Tóm tắt mục 3

- Fusion: 2 hạt nhân nhẹ → 1 hạt nhân nặng + năng lượng.
- Mặt Trời: $4\\text{H} \\to \\text{He}$, $26{,}7\\ \\text{MeV}$/phản ứng.
- Khó trên Trái Đất: cần $T \\sim 10^8\\ ^\\circ\\text{C}$.
- ITER, NIF đang tiến triển.

---

## 4. Bài tập

### Bài tập

**Bài 1**: 1 kg U-235 phân hạch hết. Tính năng lượng tỏa ra (200 MeV/phân hạch, $N_A = 6{,}022 \\times 10^{23}$).

**Bài 2**: So sánh năng lượng giải phóng / kg của fission U-235 vs đốt 1 kg dầu (44 MJ/kg).

**Bài 3**: Mặt Trời mất 4 triệu tấn/giây. Tính công suất bức xạ.

**Bài 4**: Vì sao Fe-56 là "đỉnh" của đường cong E_liên_kết / nucleon?

**Bài 5**: Vì sao bom hydrogen (H-bomb) nổ mạnh hơn bom uranium (A-bomb)?

### Lời giải

**Bài 1**: 
- Mol U-235 $= 1000/235 \\approx 4{,}26\\ \\text{mol}$. 
- Số nguyên tử $= 4{,}26 \\times 6{,}022 \\times 10^{23} = 2{,}56 \\times 10^{24}$.
- Năng lượng $= 2{,}56 \\times 10^{24} \\times 200\\ \\text{MeV} = 5{,}12 \\times 10^{26}\\ \\text{MeV} = 5{,}12 \\times 10^{26} \\times 1{,}6 \\times 10^{-13}\\ \\text{J} =$ **$8{,}2 \\times 10^{13}\\ \\text{J} \\approx 23\\ \\text{GWh}$**.
- (So sánh: 1 nhà máy điện 1 GW chạy 23 giờ.)

**Bài 2**: 
- 1 kg U-235 fission $= 8{,}2 \\times 10^{13}\\ \\text{J}$.
- 1 kg dầu đốt $= 4{,}4 \\times 10^7\\ \\text{J}$.
- Tỉ lệ $= 1{,}86 \\times 10^6$ → **U-235 mạnh hơn dầu 1.86 triệu lần** trên mỗi kg nhiên liệu.

**Bài 3**: 
- $4 \\times 10^6$ tấn/s $= 4 \\times 10^9\\ \\text{kg/s}$ biến thành năng lượng.
- $E = m c^2 = 4 \\times 10^9 \\times (3 \\times 10^8)^2 = 3{,}6 \\times 10^{26}\\ \\text{J/s} =$ **$3{,}6 \\times 10^{26}\\ \\text{W}$**.
- (So sánh: 1 nhà máy điện $= 10^9\\ \\text{W}$. Mặt Trời = 360 nghìn tỷ tỷ tỷ tỷ lần đó.)

**Bài 4**: Fe-56 có **năng lượng liên kết / nucleon cao nhất** ($\\sim 8{,}8\\ \\text{MeV}$). Nucleon trong Fe được "giữ chặt nhất". Tách Fe (fission) hay ghép Fe (fusion) đều **TỐN năng lượng**, không tỏa. Mọi nguyên tố khác đều có $E_\\text{liên kết}$/nucleon thấp hơn → đi về phía Fe (qua fission hay fusion) thì tỏa năng lượng.

**Bài 5**: 
- Bom A (fission U/Pu): khoảng 20 kt TNT cho Hiroshima.
- Bom H (fusion D-T): hàng megaton TNT (gấp 1000 lần A).

Lý do: 
1. Fusion mỗi phản ứng tỏa nhiều năng lượng / khối lượng hơn fission (vì khối lượng nucleon ban đầu nhỏ).
2. Bom H dùng **bom A làm "ngòi"** — kích nhiệt độ siêu cao để fuel D-T cháy fusion. Hiệu quả: A-bomb chỉ là kíp nổ.
3. Khối lượng fuel D-T có thể nhiều hơn (rẻ hơn, an toàn vận chuyển hơn).

---

## 5. Bài tiếp theo

[Lesson 08 — Tương đối hẹp preview](../lesson-08-relativity-preview/).

## 📝 Tổng kết

1. **Đường cong $E_\\text{liên kết}$/nucleon**: đỉnh ở Fe-56 ($\\sim 8{,}8\\ \\text{MeV}$). Hạt nhân muốn "tiến về Fe".
2. **Phân hạch**: nặng → nhẹ. $^{235}\\text{U} + n \\to$ 2 hạt $+ 3n + 200\\ \\text{MeV}$.
3. **Phản ứng dây chuyền**: 1 → 2 → 4 → ... lò kiểm soát, bom không.
4. **Nhiệt hạch**: nhẹ → nặng. $4\\text{H} \\to \\text{He}$ (Mặt Trời) hoặc $\\text{D} + \\text{T} \\to \\text{He} + n$.
5. **Fusion trên Trái Đất**: cần $T \\sim 10^8\\ ^\\circ\\text{C}$. ITER (2035), NIF đã đạt ignition 2022.
`;
