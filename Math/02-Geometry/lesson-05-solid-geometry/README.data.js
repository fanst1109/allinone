// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/02-Geometry/lesson-05-solid-geometry/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — Hình học không gian

## Mục tiêu

- Hiểu các **khối đa diện** cơ bản: lập phương, hình hộp chữ nhật, lăng trụ, chóp.
- Hiểu các **khối tròn xoay**: hình trụ, hình nón, hình cầu.
- Tính **thể tích** và **diện tích bề mặt** (xung quanh / toàn phần) các khối này.
- Hiểu công thức Euler cho đa diện: $V - E + F = 2$.
- Hiểu **mặt cắt (cross-section)** của các khối khi bị mặt phẳng chém qua.

## Kiến thức tiền đề

- [Lesson 04 — Đa giác & Diện tích](../lesson-04-polygons-area/).

---

## 1. Khối đa diện

💡 **Trực giác / Hình dung**: đa diện là 1 khối rắn có "vỏ" gồm các mặt phẳng đa giác — như viên xúc xắc (6 mặt vuông), kim tự tháp (chóp), hộp quà. Đếm 3 thứ: **đỉnh** (góc nhọn, như chóp kim tự tháp), **cạnh** (mép giao 2 mặt), **mặt** (tấm phẳng). Công thức Euler nói 3 con số này luôn "ăn khớp" theo 1 quy luật.

**Đa diện** = khối 3D giới hạn bởi các mặt đa giác phẳng.

- **V (Vertex)** = số đỉnh.
- **E (Edge)** = số cạnh.
- **F (Face)** = số mặt.

#### Hình dung 3 yếu tố trên một hình hộp chữ nhật (rectangular box)

Vẽ hộp chữ nhật bằng "phối cảnh nghiêng" — nét đứt xám là cạnh **khuất** phía sau:

<svg viewBox="0 0 500 330" style="max-width:500px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Hình hộp chữ nhật ABCD-EFGH vẽ phối cảnh nghiêng: đáy dưới ABCD, đáy trên EFGH, mặt trước ABFE tô nhạt; đỉnh D ở góc sau bị che nên 3 cạnh DA DC DH vẽ nét đứt; đếm được 8 đỉnh, 12 cạnh, 6 mặt">
  <polygon points="80,280 320,280 320,140 80,140" fill="#dbeafe" fill-opacity="0.5"/>
  <polygon points="80,140 320,140 405,85 165,85" fill="#dcfce7" fill-opacity="0.35"/>
  <line x1="165" y1="225" x2="80" y2="280" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6 5"/>
  <line x1="165" y1="225" x2="405" y2="225" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6 5"/>
  <line x1="165" y1="225" x2="165" y2="85" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6 5"/>
  <line x1="80" y1="280" x2="320" y2="280" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="80" y1="280" x2="80" y2="140" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="320" y1="280" x2="320" y2="140" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="80" y1="140" x2="320" y2="140" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="320" y1="140" x2="405" y2="85" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="80" y1="140" x2="165" y2="85" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="165" y1="85" x2="405" y2="85" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="320" y1="280" x2="405" y2="225" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="405" y1="225" x2="405" y2="85" stroke="#1d4ed8" stroke-width="2"/>
  <circle cx="80" cy="280" r="3.5" fill="#1d4ed8"/>
  <circle cx="320" cy="280" r="3.5" fill="#1d4ed8"/>
  <circle cx="405" cy="225" r="3.5" fill="#1d4ed8"/>
  <circle cx="165" cy="225" r="3.5" fill="#94a3b8"/>
  <circle cx="80" cy="140" r="3.5" fill="#1d4ed8"/>
  <circle cx="320" cy="140" r="3.5" fill="#1d4ed8"/>
  <circle cx="405" cy="85" r="3.5" fill="#1d4ed8"/>
  <circle cx="165" cy="85" r="3.5" fill="#1d4ed8"/>
  <text x="66" y="295" font-size="13" font-weight="700" fill="#1a202c">A</text>
  <text x="332" y="295" font-size="13" font-weight="700" fill="#1a202c">B</text>
  <text x="417" y="232" font-size="13" font-weight="700" fill="#1a202c">C</text>
  <text x="153" y="220" font-size="13" font-weight="700" fill="#1a202c" text-anchor="end">D</text>
  <text x="66" y="135" font-size="13" font-weight="700" fill="#1a202c">E</text>
  <text x="330" y="135" font-size="13" font-weight="700" fill="#1a202c">F</text>
  <text x="417" y="80" font-size="13" font-weight="700" fill="#1a202c">G</text>
  <text x="153" y="80" font-size="13" font-weight="700" fill="#1a202c" text-anchor="end">H</text>
  <text x="250" y="318" font-size="11.5" fill="#475569" text-anchor="middle">nét đứt = 3 cạnh khuất tại đỉnh D phía sau: DA, DC, DH</text>
</svg>

- **Đỉnh (V)**: A, B, C, D, E, F, G, H → **8 đỉnh**.
- **Cạnh (E)**: AB, BC, CD, DA (đáy dưới) · EF, FG, GH, HE (đáy trên) · AE, BF, CG, DH (4 cạnh đứng) → **12 cạnh**.
- **Mặt (F)**: đáy dưới ABCD · đáy trên EFGH · 4 mặt bên (ABFE, BCGF, CDHG, DAEH) → **6 mặt**.

Đếm tay: $V=8,\\ E=12,\\ F=6$ — giống hệt lập phương (lập phương chỉ là hộp với $a=b=c$). Cùng dạng "topology hộp" nên cùng bộ số. Kiểm Euler: $8-12+6=2$ ✓.

#### Hình dung chóp tứ giác (square pyramid) và tứ diện (tetrahedron)

<svg viewBox="0 0 700 330" style="max-width:700px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Hai khối cạnh nhau: chóp đáy vuông S.ABCD có đỉnh S phía trên đáy vuông ABCD, các cạnh khuất DA DC SD vẽ nét đứt, đếm được 5 đỉnh 8 cạnh 5 mặt; tứ diện đều ABCD có đỉnh D trên đáy tam giác ABC, cạnh khuất AC BC vẽ nét đứt, đếm được 4 đỉnh 6 cạnh 4 mặt đều là tam giác đều">
  <text x="180" y="30" font-size="13" font-weight="700" fill="#1a202c" text-anchor="middle">CHÓP ĐÁY VUÔNG (square pyramid)</text>
  <polygon points="180,65 75,270 275,270" fill="#dbeafe" fill-opacity="0.5"/>
  <line x1="122" y1="215" x2="322" y2="215" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6 5"/>
  <line x1="122" y1="215" x2="75" y2="270" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6 5"/>
  <line x1="180" y1="65" x2="122" y2="215" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6 5"/>
  <line x1="75" y1="270" x2="275" y2="270" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="275" y1="270" x2="322" y2="215" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="180" y1="65" x2="75" y2="270" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="180" y1="65" x2="275" y2="270" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="180" y1="65" x2="322" y2="215" stroke="#1d4ed8" stroke-width="2"/>
  <circle cx="180" cy="65" r="3.5" fill="#1d4ed8"/>
  <circle cx="75" cy="270" r="3.5" fill="#1d4ed8"/>
  <circle cx="275" cy="270" r="3.5" fill="#1d4ed8"/>
  <circle cx="322" cy="215" r="3.5" fill="#1d4ed8"/>
  <circle cx="122" cy="215" r="3.5" fill="#94a3b8"/>
  <text x="180" y="52" font-size="13" font-weight="700" fill="#1a202c" text-anchor="middle">S</text>
  <text x="61" y="285" font-size="13" font-weight="700" fill="#1a202c">A</text>
  <text x="287" y="285" font-size="13" font-weight="700" fill="#1a202c">B</text>
  <text x="334" y="212" font-size="13" font-weight="700" fill="#1a202c">C</text>
  <text x="110" y="208" font-size="13" font-weight="700" fill="#1a202c" text-anchor="end">D</text>
  <text x="520" y="30" font-size="13" font-weight="700" fill="#1a202c" text-anchor="middle">TỨ DIỆN ĐỀU (tetrahedron)</text>
  <polygon points="520,75 430,270 615,270" fill="#dcfce7" fill-opacity="0.5"/>
  <line x1="430" y1="270" x2="560" y2="200" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6 5"/>
  <line x1="615" y1="270" x2="560" y2="200" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6 5"/>
  <line x1="430" y1="270" x2="615" y2="270" stroke="#15803d" stroke-width="2"/>
  <line x1="520" y1="75" x2="430" y2="270" stroke="#15803d" stroke-width="2"/>
  <line x1="520" y1="75" x2="615" y2="270" stroke="#15803d" stroke-width="2"/>
  <line x1="520" y1="75" x2="560" y2="200" stroke="#15803d" stroke-width="2"/>
  <circle cx="520" cy="75" r="3.5" fill="#15803d"/>
  <circle cx="430" cy="270" r="3.5" fill="#15803d"/>
  <circle cx="615" cy="270" r="3.5" fill="#15803d"/>
  <circle cx="560" cy="200" r="3.5" fill="#94a3b8"/>
  <text x="520" y="62" font-size="13" font-weight="700" fill="#1a202c" text-anchor="middle">D</text>
  <text x="416" y="285" font-size="13" font-weight="700" fill="#1a202c">A</text>
  <text x="627" y="285" font-size="13" font-weight="700" fill="#1a202c">B</text>
  <text x="574" y="198" font-size="13" font-weight="700" fill="#1a202c">C</text>
  <text x="350" y="315" font-size="11.5" fill="#475569" text-anchor="middle">nét đứt = cạnh khuất phía sau</text>
</svg>

- **Chóp đáy vuông S.ABCD**: V = 5 (4 đỉnh đáy + 1 đỉnh S) · E = 8 (4 cạnh đáy + 4 cạnh bên) · F = 5 (1 đáy vuông + 4 mặt tam giác).
- **Tứ diện đều ABCD**: V = 4 · E = 6 · F = 4 (mọi mặt là tam giác đều).

Chóp tứ giác: $V-E+F = 5-8+5 = 2$ ✓. Tứ diện: $4-6+4 = 2$ ✓. Lưu ý chóp **không** phải khối đều (đáy vuông, mặt bên tam giác — khác loại), nhưng Euler vẫn đúng vì nó vẫn là đa diện lồi.

#### Hình dung lăng trụ tam giác (triangular prism)

<svg viewBox="0 0 420 320" style="max-width:420px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Lăng trụ tam giác đứng: đáy dưới là tam giác ABC với C ở phía sau, đáy trên là tam giác DEF, ba cạnh đứng AD BE CF; ba cạnh khuất AC BC CF vẽ nét đứt; đếm được 6 đỉnh, 9 cạnh, 5 mặt">
  <text x="210" y="28" font-size="13" font-weight="700" fill="#1a202c" text-anchor="middle">LĂNG TRỤ TAM GIÁC</text>
  <polygon points="110,265 280,265 280,120 110,120" fill="#dbeafe" fill-opacity="0.5"/>
  <line x1="110" y1="265" x2="232" y2="205" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6 5"/>
  <line x1="280" y1="265" x2="232" y2="205" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6 5"/>
  <line x1="232" y1="205" x2="232" y2="60" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6 5"/>
  <line x1="110" y1="265" x2="280" y2="265" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="110" y1="265" x2="110" y2="120" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="280" y1="265" x2="280" y2="120" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="110" y1="120" x2="280" y2="120" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="110" y1="120" x2="232" y2="60" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="280" y1="120" x2="232" y2="60" stroke="#1d4ed8" stroke-width="2"/>
  <circle cx="110" cy="265" r="3.5" fill="#1d4ed8"/>
  <circle cx="280" cy="265" r="3.5" fill="#1d4ed8"/>
  <circle cx="232" cy="205" r="3.5" fill="#94a3b8"/>
  <circle cx="110" cy="120" r="3.5" fill="#1d4ed8"/>
  <circle cx="280" cy="120" r="3.5" fill="#1d4ed8"/>
  <circle cx="232" cy="60" r="3.5" fill="#1d4ed8"/>
  <text x="96" y="280" font-size="13" font-weight="700" fill="#1a202c">A</text>
  <text x="290" y="280" font-size="13" font-weight="700" fill="#1a202c">B</text>
  <text x="244" y="212" font-size="13" font-weight="700" fill="#1a202c">C</text>
  <text x="96" y="115" font-size="13" font-weight="700" fill="#1a202c">D</text>
  <text x="290" y="115" font-size="13" font-weight="700" fill="#1a202c">E</text>
  <text x="232" y="50" font-size="13" font-weight="700" fill="#1a202c" text-anchor="middle">F</text>
  <text x="210" y="305" font-size="11.5" fill="#475569" text-anchor="middle">nét đứt = 3 cạnh khuất phía sau: AC, BC, CF</text>
</svg>

- **V = 6**: 2 tam giác đáy (ABC dưới, DEF trên) × 3 đỉnh.
- **E = 9**: 3 cạnh đáy dưới (AB, BC, CA) + 3 cạnh đáy trên (DE, EF, FD) + 3 cạnh đứng (AD, BE, CF).
- **F = 5**: 2 mặt tam giác đáy + 3 mặt chữ nhật bên.

Lăng trụ tam giác: $V-E+F = 6-9+5 = 2$ ✓. (Hình vẽ chỉ là phối cảnh minh họa — quan trọng là **đếm đúng** 6/9/5.)

### 1.1. Công thức Euler

Với mọi đa diện lồi:

$$V - E + F = 2$$

**Ví dụ — Lập phương**: V=8, E=12, F=6. Kiểm: $8 - 12 + 6 = $ **2** ✓.

#### Verify Euler trên 5 khối — bảng đầy đủ

Áp $V - E + F$ cho từng khối, tính ra số từng bước, xác nhận luôn = 2:

| Khối | V | E | F | $V - E + F$ | = 2? |
|------|---|---|---|-------------|:---:|
| Tứ diện đều (tetrahedron) | 4 | 6 | 4 | $4-6+4$ | **2** ✓ |
| Lập phương (cube) | 8 | 12 | 6 | $8-12+6$ | **2** ✓ |
| Bát diện đều (octahedron) | 6 | 12 | 8 | $6-12+8$ | **2** ✓ |
| Lăng trụ tam giác | 6 | 9 | 5 | $6-9+5$ | **2** ✓ |
| Chóp tứ giác (square pyramid) | 5 | 8 | 5 | $5-8+5$ | **2** ✓ |

Năm khối khác nhau hoàn toàn về hình dạng và số mặt, nhưng $V-E+F$ luôn cho **đúng 2** — đó là điều "kỳ lạ" của định lý.

💡 **Vì sao luôn ra 2? (trực giác làm phẳng)**: tưởng tượng đa diện làm bằng cao su, đục thủng 1 mặt rồi kéo căng ra thành 1 lưới phẳng. Mặt bị đục biến thành "vùng ngoài cùng" (mặt vô tận). Trên lưới phẳng, công thức tương ứng là $V - E + F = 1$ (chưa kể mặt ngoài); cộng lại mặt ngoài (mặt vừa đục) → $V - E + F = 2$. Mỗi lần ta thêm 1 cạnh nối 2 đỉnh có sẵn thì $E$ tăng 1 và $F$ tăng 1 (chia 1 vùng thành 2) → $V-E+F$ **không đổi**; mỗi lần thêm 1 đỉnh-cùng-1-cạnh thì $V$ và $E$ cùng tăng 1 → cũng không đổi. Vì giá trị bất biến qua mọi bước dựng, nó luôn bằng giá trị ban đầu (= 2).

> 📐 **Định nghĩa đầy đủ — Công thức Euler đa diện**
>
> **(a) Là gì**: 1 hằng đẳng thức **kỳ lạ**: với MỌI đa diện lồi (dù phức tạp đến đâu), số đỉnh trừ số cạnh cộng số mặt luôn = 2. Không phụ thuộc kích thước, hình dạng cụ thể.
>
> **(b) Vì sao cần**: Đây là 1 trong những định lý đầu tiên về **topology** (hình học không quan tâm độ dài/góc, chỉ quan tâm cấu trúc kết nối). Cho biết "cấu trúc" đa diện bị ràng buộc — không thể tạo ra 1 đa diện với V, E, F tùy ý. Hệ quả: chứng minh chỉ tồn tại 5 khối Platonic (định lý Plato). Ứng dụng hiện đại: mạng lưới đồ hoạ máy tính, phân tích hình học rời rạc, hoá học phân tử (fullerene C60).
>
> **(c) Ví dụ số**: Tứ diện đều (4 mặt tam giác): V=4, E=6, F=4 → $4-6+4 = $ **2** ✓. Lập phương: $8-12+6 = $ **2** ✓. Bát diện đều: $6-12+8 = $ **2** ✓. Hình lăng trụ tam giác (3 mặt bên + 2 đáy): V=6, E=9, F=5 → $6-9+5 = $ **2** ✓. Quả bóng đá (32 mặt = 12 ngũ giác + 20 lục giác): V=60, E=90, F=32 → $60-90+32 = $ **2** ✓.

### 1.2. 5 khối Platonic (đa diện đều)

Chỉ có **5 khối đa diện đều** trong không gian 3D:

| Tên | V | E | F | Mặt là |
|-----|---|---|---|--------|
| Tứ diện đều | 4 | 6 | 4 | Tam giác đều |
| Lập phương | 8 | 12 | 6 | Hình vuông |
| Bát diện đều | 6 | 12 | 8 | Tam giác đều |
| Thập nhị diện đều | 20 | 30 | 12 | Ngũ giác đều |
| Nhị thập diện đều | 12 | 30 | 20 | Tam giác đều |

💡 **Vì sao chỉ có 5?** Plato (~400 TCN) chứng minh. Lý do: ở mỗi đỉnh phải có $\\ge 3$ mặt + tổng các góc đó $< 360^\\circ$ → giới hạn số khả năng.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Euler $V-E+F=2$ có đúng cho mọi khối không?"* Đúng cho mọi đa diện **lồi** (và mọi đa diện "tương đương cầu" về topology). Khối có lỗ thủng (như bánh donut) thì = 0, không phải 2.
- *"Vì sao chỉ có đúng 5 khối Platonic?"* Tại mỗi đỉnh cần $\\ge 3$ mặt đều giống nhau, tổng góc tại đỉnh phải $< 360^\\circ$ (nếu $= 360^\\circ$ thì phẳng, > thì không khép được). Chỉ 5 cấu hình thỏa: 3/4/5 tam giác, 3 vuông, 3 ngũ giác.
- *"Cạnh đếm thế nào để không trùng?"* Mỗi cạnh là mép chung của đúng 2 mặt — đếm 1 lần. Mẹo kiểm: tổng (số cạnh mỗi mặt) = $2E$ (mỗi cạnh thuộc 2 mặt).

⚠ **Lỗi thường gặp**: đếm trùng cạnh hoặc đỉnh khi áp Euler. Phản ví dụ: lập phương có 12 cạnh (không phải $6\\cdot 4=24$ — vì mỗi cạnh chung 2 mặt nên chia đôi: $24/2=12$). Kiểm: $V-E+F = 8-12+6 = 2$ ✓; nếu lỡ lấy $E=24$ thì $8-24+6 = -10 \\neq 2$ → biết đếm sai.

🔁 **Dừng lại tự kiểm tra**

1. Lăng trụ tam giác có V=6, F=5. Tính E bằng công thức Euler.
2. Bát diện đều có 8 mặt tam giác, 6 đỉnh. Số cạnh?

<details><summary>Đáp án</summary>

1. $V-E+F=2$ → $6-E+5 = 2$ → $E = $ **9**.
2. $6-E+8 = 2$ → $E = $ **12**. (Hoặc: 8 mặt $\\times$ 3 cạnh $/ 2 = 12$.)

</details>

### 📝 Tóm tắt mục 1

- Đa diện đếm 3 số: V (đỉnh), E (cạnh), F (mặt).
- **Công thức Euler**: $V - E + F = 2$ cho mọi đa diện lồi.
- Mỗi cạnh chung 2 mặt → đếm 1 lần (tránh nhân đôi).
- Chỉ có **5 khối Platonic** (đa diện đều): tứ diện, lập phương, bát diện, thập nhị diện, nhị thập diện.

---

## 2. Thể tích các khối phổ biến

💡 **Trực giác / Hình dung**: thể tích = "đếm số khối lập phương đơn vị ($1\\times 1\\times 1$) lấp đầy khối". Hộp $a\\times b\\times c = a\\cdot b\\cdot c$ khối nhỏ. Khối "có đỉnh nhọn" (chóp, nón) chỉ chứa **1/3** so với khối "thẳng đứng" (lăng trụ, trụ) cùng đáy và cao — vì phần đỉnh thu nhỏ dần.

$$\\begin{aligned}
\\text{Lập phương cạnh } a: \\quad & V = a^3 \\\\
\\text{Hộp chữ nhật } a\\times b\\times c: \\quad & V = abc \\\\
\\text{Lăng trụ đáy } S,\\ \\text{cao } h: \\quad & V = S\\cdot h \\\\
\\text{Chóp đáy } S,\\ \\text{cao } h: \\quad & V = \\tfrac{1}{3}\\cdot S\\cdot h \\\\
\\text{Hình trụ } R, h: \\quad & V = \\pi R^2 h \\\\
\\text{Hình nón } R, h: \\quad & V = \\tfrac{1}{3}\\pi R^2 h \\\\
\\text{Hình cầu } R: \\quad & V = \\tfrac{4}{3}\\pi R^3
\\end{aligned}$$

💡 **Nhớ**: chóp = (1/3) lăng trụ cùng đáy + cao. Nón = (1/3) trụ. Cầu R có $V = \\frac{4}{3}\\pi R^3$.

#### Hình dung khối tròn xoay (round solids)

Khối tròn xoay = quay 1 hình phẳng quanh 1 trục. Trụ = quay hình chữ nhật; nón = quay tam giác vuông; cầu = quay nửa hình tròn.

<svg viewBox="0 0 720 350" style="max-width:720px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Ba khối tròn xoay: hình trụ bán kính đáy R cao h thể tích πR²h; hình nón bán kính đáy R cao h đường sinh l là cạnh xiên, thể tích một phần ba πR²h; hình cầu bán kính R đo từ tâm ra vỏ, thể tích bốn phần ba πR³; phần đáy khuất phía sau vẽ nét đứt">
  <text x="130" y="34" font-size="13" font-weight="700" fill="#1a202c" text-anchor="middle">HÌNH TRỤ (cylinder)</text>
  <path d="M 58,250 A 62 16 0 0 1 182,250" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6 5"/>
  <line x1="58" y1="95" x2="58" y2="250" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="182" y1="95" x2="182" y2="250" stroke="#1d4ed8" stroke-width="2"/>
  <path d="M 58,250 A 62 16 0 0 0 182,250" fill="none" stroke="#1d4ed8" stroke-width="2"/>
  <ellipse cx="120" cy="95" rx="62" ry="16" fill="#dbeafe" fill-opacity="0.5" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="120" y1="95" x2="182" y2="95" stroke="#15803d" stroke-width="2.5"/>
  <circle cx="120" cy="95" r="2.5" fill="#1a202c"/>
  <text x="151" y="88" font-size="12" font-weight="700" fill="#15803d" text-anchor="middle">R</text>
  <line x1="202" y1="95" x2="202" y2="250" stroke="#475569" stroke-width="1.5"/>
  <line x1="196" y1="95" x2="208" y2="95" stroke="#475569" stroke-width="1.5"/>
  <line x1="196" y1="250" x2="208" y2="250" stroke="#475569" stroke-width="1.5"/>
  <text x="214" y="178" font-size="12" font-weight="700" fill="#475569">h</text>
  <text x="130" y="312" font-size="12.5" font-weight="700" fill="#1a202c" text-anchor="middle">V = πR²·h</text>
  <text x="130" y="333" font-size="11" fill="#475569" text-anchor="middle">(đáy tròn πR² × cao h)</text>
  <text x="360" y="34" font-size="13" font-weight="700" fill="#1a202c" text-anchor="middle">HÌNH NÓN (cone)</text>
  <path d="M 290,250 A 70 17 0 0 1 430,250" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6 5"/>
  <path d="M 290,250 A 70 17 0 0 0 430,250" fill="none" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="360" y1="70" x2="290" y2="250" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="360" y1="70" x2="430" y2="250" stroke="#1d4ed8" stroke-width="2.5"/>
  <line x1="360" y1="70" x2="360" y2="250" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6 5"/>
  <path d="M 360,238 L 371,238 L 371,250" fill="none" stroke="#475569" stroke-width="1.5"/>
  <line x1="360" y1="250" x2="430" y2="250" stroke="#15803d" stroke-width="2.5"/>
  <circle cx="360" cy="250" r="2.5" fill="#1a202c"/>
  <circle cx="360" cy="70" r="3" fill="#1a202c"/>
  <text x="405" y="150" font-size="11.5" font-weight="700" fill="#1d4ed8">l (đường sinh)</text>
  <text x="352" y="170" font-size="12" font-weight="700" fill="#475569" text-anchor="end">h</text>
  <text x="397" y="242" font-size="12" font-weight="700" fill="#15803d" text-anchor="middle">R</text>
  <text x="360" y="312" font-size="12.5" font-weight="700" fill="#1a202c" text-anchor="middle">V = ⅓·πR²·h</text>
  <text x="360" y="333" font-size="11" fill="#475569" text-anchor="middle">(= ⅓ trụ cùng đáy, cùng cao)</text>
  <text x="600" y="34" font-size="13" font-weight="700" fill="#1a202c" text-anchor="middle">HÌNH CẦU (sphere)</text>
  <circle cx="600" cy="172" r="80" fill="#dbeafe" fill-opacity="0.3" stroke="#1d4ed8" stroke-width="2"/>
  <path d="M 520,172 A 80 20 0 0 1 680,172" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6 5"/>
  <path d="M 520,172 A 80 20 0 0 0 680,172" fill="none" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="600" y1="172" x2="668" y2="151" stroke="#15803d" stroke-width="2.5"/>
  <polygon points="676.5,148.6 668.1,155.3 665.7,147.7" fill="#15803d"/>
  <circle cx="600" cy="172" r="3" fill="#1a202c"/>
  <text x="594" y="192" font-size="11" fill="#475569" text-anchor="end">tâm</text>
  <text x="636" y="150" font-size="12" font-weight="700" fill="#15803d">R</text>
  <text x="600" y="312" font-size="12.5" font-weight="700" fill="#1a202c" text-anchor="middle">V = 4⁄3·πR³</text>
  <text x="600" y="333" font-size="11" fill="#475569" text-anchor="middle">(R đo từ tâm ra vỏ)</text>
</svg>

⚠ Lưu ý — **bán kính R đo từ tâm/trục ra mép**, không phải đường kính. Đường sinh $l$ của nón là cạnh **xiên** (khác chiều cao $h$ là cạnh đứng).

#### Bảng tổng hợp — thể tích & diện tích mọi khối

Một chỗ tra cứu duy nhất ($S_{xq}$ = diện tích xung quanh; $S_{tp}$ = diện tích toàn phần; $l = \\sqrt{R^2+h^2}$ là đường sinh nón):

| Khối | Thể tích $V$ | $S_{xq}$ (xung quanh) | $S_{tp}$ (toàn phần) |
|------|--------------|------------------------|----------------------|
| Lập phương cạnh $a$ | $a^3$ | $4a^2$ (4 mặt bên) | $6a^2$ |
| Hộp chữ nhật $a\\times b\\times c$ | $abc$ | $2h(a+b)$ với $h=c$ | $2(ab+bc+ca)$ |
| Lăng trụ đáy $S_{\\text{đáy}}$, cao $h$ | $S_{\\text{đáy}}\\cdot h$ | chu vi đáy $\\times h$ | $S_{xq} + 2S_{\\text{đáy}}$ |
| Chóp đáy $S_{\\text{đáy}}$, cao $h$ | $\\tfrac13 S_{\\text{đáy}}\\cdot h$ | $\\tfrac12\\cdot$chu vi đáy$\\times l_{\\text{mặt bên}}$ | $S_{xq} + S_{\\text{đáy}}$ |
| Hình trụ $R, h$ | $\\pi R^2 h$ | $2\\pi R h$ | $2\\pi R h + 2\\pi R^2$ |
| Hình nón $R, h$ | $\\tfrac13 \\pi R^2 h$ | $\\pi R l$ | $\\pi R l + \\pi R^2$ |
| Hình cầu $R$ | $\\tfrac43 \\pi R^3$ | — | $4\\pi R^2$ |

📝 **Quy luật nhớ**: khối "thẳng đứng" (lăng trụ, trụ) = đáy × cao; khối "nhọn dần" (chóp, nón) = **⅓** × đáy × cao (cùng đáy, cùng cao). Cầu có cặp đẹp: $V = \\tfrac43\\pi R^3$ và $S = 4\\pi R^2$ (đạo hàm $V$ theo $R$ ra đúng $S$).

#### Walk-through ≥4 ví dụ thể tích — từng bước với số cụ thể

**Ví dụ 1 — Hộp chữ nhật** $a=2,\\ b=3,\\ c=4$ (cm):
$$\\begin{aligned}
V &= a\\cdot b\\cdot c \\\\
  &= 2\\cdot 3\\cdot 4 \\\\
  &= 6\\cdot 4 = \\mathbf{24}\\ \\text{cm}^3
\\end{aligned}$$
Kiểm bằng trực giác "lấp khối đơn vị": xếp $2\\times3=6$ khối $1\\text{cm}^3$ thành 1 lớp đáy, chồng 4 lớp → $6\\times4 = 24$ khối. ✓

**Ví dụ 2 — Hình trụ** $R=2,\\ h=5$:
$$\\begin{aligned}
V &= \\pi R^2 h \\\\
  &= \\pi\\cdot 2^2\\cdot 5 \\\\
  &= \\pi\\cdot 4\\cdot 5 \\\\
  &= 20\\pi \\approx 20\\cdot 3.1416 = \\mathbf{62.83}
\\end{aligned}$$
Bước quan trọng: bình phương **bán kính** trước ($2^2=4$), rồi mới nhân $h$. Dễ sai nếu nhân $\\pi\\cdot 2\\cdot 5$ (quên bình phương).

**Ví dụ 3 — Hình nón** $R=2,\\ h=5$ (cùng đáy, cùng cao với Ví dụ 2):
$$\\begin{aligned}
V &= \\tfrac13 \\pi R^2 h \\\\
  &= \\tfrac13\\cdot \\pi\\cdot 4\\cdot 5 \\\\
  &= \\tfrac13\\cdot 20\\pi \\\\
  &= \\tfrac{20\\pi}{3} \\approx \\mathbf{20.94}
\\end{aligned}$$
Xác nhận quy luật ⅓: nón $20.94$ đúng bằng $\\tfrac13$ của trụ $62.83$ ($62.83/3 \\approx 20.94$). Đổ đầy 3 nón nước vừa khít 1 trụ.

**Ví dụ 4 — Hình cầu** $R=3$:
$$\\begin{aligned}
V &= \\tfrac43 \\pi R^3 \\\\
  &= \\tfrac43\\cdot \\pi\\cdot 3^3 \\\\
  &= \\tfrac43\\cdot \\pi\\cdot 27 \\\\
  &= \\tfrac{4\\cdot 27}{3}\\pi = 36\\pi \\approx \\mathbf{113.10}
\\end{aligned}$$
Mẹo rút gọn: $\\tfrac43\\cdot 27 = 4\\cdot 9 = 36$ (chia $27/3=9$ trước, đỡ nhân số to).

**Ví dụ 5 (bonus) — Chóp đáy vuông** cạnh $6$, cao $10$:
$$\\begin{aligned}
S_{\\text{đáy}} &= 6^2 = 36 \\\\
V &= \\tfrac13\\cdot S_{\\text{đáy}}\\cdot h = \\tfrac13\\cdot 36\\cdot 10 = \\tfrac{360}{3} = \\mathbf{120}
\\end{aligned}$$
Nếu quên ⅓ sẽ ra $360$ (gấp 3 lần — sai).

**4 ví dụ số đa dạng** (tóm gọn):
- Lập phương cạnh 3: $V = 3^3 = $ **27**.
- Hộp $2\\times 3\\times 4$: $V = 24$.
- Trụ R=2, h=5: $V = \\pi\\cdot 4\\cdot 5 = 20\\pi \\approx$ **62.8**.
- Nón R=2, h=5: $V = \\frac{1}{3}\\cdot 20\\pi \\approx$ **20.9** (đúng = 1/3 trụ cùng đáy, cao).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao chóp/nón có hệ số 1/3?"* Vì khối nhọn dần lên đỉnh, "hụt" thể tích so với khối thẳng. Có thể xác nhận: đổ đầy 3 nón nước vào sẽ vừa đầy 1 trụ cùng đáy, cùng cao.
- *"Đơn vị thể tích là gì?"* Luôn là đơn vị **lập phương** (cm³, m³). Cạnh cm → thể tích cm³.
- *"Cầu là $\\frac{4}{3}\\pi R^3$ — nhớ thế nào?"* Mẹo: "bốn phần ba pi r mũ ba". Diện tích cầu $4\\pi R^2$ thì là đạo hàm của thể tích theo R (sẽ thấy ở giải tích).

⚠ **Bốn lỗi thường gặp khi tính thể tích**

**Lỗi 1 — quên hệ số ⅓ cho chóp/nón.** Phản ví dụ: nón $R=3,\\ h=6$ → đúng $V = \\tfrac13\\pi\\cdot 9\\cdot 6 = 18\\pi$; quên ⅓ ra $54\\pi$ (gấp 3, sai). Mẹo: thấy "đỉnh nhọn" → luôn có ⅓.

**Lỗi 2 — nhầm thể tích nón với thể tích trụ.** Cùng $R,h$: trụ $= \\pi R^2 h$, nón chỉ bằng **⅓** chừng đó. Phản ví dụ $R=2,h=5$: trụ $20\\pi\\approx62.8$, nón $\\tfrac{20\\pi}{3}\\approx20.9$ — chênh **3 lần**. Viết nhầm nón $= \\pi R^2 h$ là lỗi rất phổ biến.

**Lỗi 3 — dùng đường kính thay bán kính.** Công thức dùng **bán kính $R$**. Nếu đề cho đường kính $d=6$ thì $R=3$, KHÔNG thay $6$ vào. Phản ví dụ cầu $d=6$: đúng $V=\\tfrac43\\pi\\cdot 3^3 = 36\\pi$; nếu lấy $R=6$ ra $\\tfrac43\\pi\\cdot 216 = 288\\pi$ — **gấp 8 lần** (vì $R$ vào lũy thừa 3: $2^3=8$).

**Lỗi 4 — sai đơn vị (cm² vs cm³).** Thể tích luôn là đơn vị **lập phương** (cm³, m³), KHÔNG phải cm². Ghi "$V=27$ cm²" là sai — phải "$27$ cm³". Trực giác: cạnh nhân 3 lần (dài × rộng × cao) → đơn vị mũ 3.

🔁 **Dừng lại tự kiểm tra**

1. Chóp đáy vuông cạnh 6, cao 10. Thể tích?
2. Hình cầu bán kính 3. Thể tích?

<details><summary>Đáp án</summary>

1. $V = \\frac{1}{3}\\cdot(6^2)\\cdot 10 = \\frac{1}{3}\\cdot 36\\cdot 10 = $ **120**.
2. $V = \\frac{4}{3}\\pi\\cdot 3^3 = \\frac{4}{3}\\pi\\cdot 27 = $ **36π ≈ 113.1**.

</details>

### 📝 Tóm tắt mục 2

- Thể tích = đếm khối lập phương đơn vị; đơn vị luôn **lập phương** (cm³...).
- Khối thẳng: lăng trụ/trụ $=$ đáy$\\cdot$cao. Khối nhọn: chóp/nón $=$ **(1/3)**$\\cdot$đáy$\\cdot$cao.
- Cầu: $V = \\frac{4}{3}\\pi R^3$.
- Cẩn thận dùng bán kính (không phải đường kính) trong trụ/nón/cầu.

---

## 3. Diện tích bề mặt

💡 **Trực giác / Hình dung**: diện tích bề mặt = "tổng diện tích giấy gói cần để bọc kín khối" (như khai triển hộp ra mặt phẳng — gọi là "lưới" hay net). Lập phương = 6 mặt vuông → $6a^2$. Trụ = 2 nắp tròn + 1 thân hình chữ nhật cuộn lại.

$$\\begin{aligned}
\\text{Lập phương cạnh } a: \\quad & S = 6a^2 \\\\
\\text{Hộp chữ nhật}: \\quad & S = 2(ab + bc + ca) \\\\
\\text{Hình trụ } R, h: \\quad & S = 2\\pi R^2 + 2\\pi R h \\\\
\\text{Hình nón } R, l\\ (\\text{đường sinh}): \\quad & S = \\pi R^2 + \\pi R l \\\\
\\text{Hình cầu } R: \\quad & S = 4\\pi R^2
\\end{aligned}$$

#### Hình dung "lưới" (net) — khai triển khối ra mặt phẳng

Diện tích toàn phần = diện tích tấm giấy phẳng cắt ra rồi gấp lại thành khối. Lưới của lập phương và của trụ:

<svg viewBox="0 0 700 350" style="max-width:700px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Lưới khai triển hai khối: lập phương mở thành 6 hình vuông cạnh a xếp hình chữ thập gồm trên, trái, trước, phải, sau, dưới nên diện tích 6a²; hình trụ mở thành 2 nắp tròn πR² và thân là hình chữ nhật rộng bằng chu vi đáy 2πR cao h, tổng diện tích 2πR² cộng 2πRh">
  <text x="140" y="32" font-size="13" font-weight="700" fill="#1a202c" text-anchor="middle">LƯỚI LẬP PHƯƠNG (6 mặt a×a)</text>
  <rect x="86" y="70" width="54" height="54" fill="#dbeafe" fill-opacity="0.5" stroke="#1d4ed8" stroke-width="2"/>
  <rect x="32" y="124" width="54" height="54" fill="#dbeafe" fill-opacity="0.5" stroke="#1d4ed8" stroke-width="2"/>
  <rect x="86" y="124" width="54" height="54" fill="#dbeafe" fill-opacity="0.5" stroke="#1d4ed8" stroke-width="2"/>
  <rect x="140" y="124" width="54" height="54" fill="#dbeafe" fill-opacity="0.5" stroke="#1d4ed8" stroke-width="2"/>
  <rect x="194" y="124" width="54" height="54" fill="#dbeafe" fill-opacity="0.5" stroke="#1d4ed8" stroke-width="2"/>
  <rect x="86" y="178" width="54" height="54" fill="#dbeafe" fill-opacity="0.5" stroke="#1d4ed8" stroke-width="2"/>
  <text x="113" y="101" font-size="10.5" fill="#475569" text-anchor="middle">trên</text>
  <text x="59" y="155" font-size="10.5" fill="#475569" text-anchor="middle">trái</text>
  <text x="113" y="155" font-size="10.5" fill="#475569" text-anchor="middle">trước</text>
  <text x="167" y="155" font-size="10.5" fill="#475569" text-anchor="middle">phải</text>
  <text x="221" y="155" font-size="10.5" fill="#475569" text-anchor="middle">sau</text>
  <text x="113" y="209" font-size="10.5" fill="#475569" text-anchor="middle">dưới</text>
  <line x1="86" y1="63" x2="140" y2="63" stroke="#15803d" stroke-width="1.5"/>
  <text x="113" y="56" font-size="11" font-weight="700" fill="#15803d" text-anchor="middle">a</text>
  <line x1="79" y1="70" x2="79" y2="124" stroke="#15803d" stroke-width="1.5"/>
  <text x="70" y="101" font-size="11" font-weight="700" fill="#15803d" text-anchor="end">a</text>
  <text x="140" y="338" font-size="12.5" font-weight="700" fill="#1a202c" text-anchor="middle">S = 6 × (a×a) = 6a²</text>
  <text x="490" y="32" font-size="13" font-weight="700" fill="#1a202c" text-anchor="middle">LƯỚI HÌNH TRỤ</text>
  <circle cx="470" cy="85" r="28" fill="#dcfce7" fill-opacity="0.5" stroke="#15803d" stroke-width="2"/>
  <text x="506" y="89" font-size="11" fill="#475569">nắp trên = πR²</text>
  <rect x="370" y="130" width="210" height="112" fill="#dbeafe" fill-opacity="0.5" stroke="#1d4ed8" stroke-width="2"/>
  <text x="475" y="162" font-size="11.5" fill="#475569" text-anchor="middle">thân mở cuộn ra = chữ nhật</text>
  <text x="475" y="182" font-size="11.5" fill="#475569" text-anchor="middle">rộng = chu vi đáy 2πR</text>
  <text x="475" y="202" font-size="11.5" fill="#475569" text-anchor="middle">cao = h</text>
  <text x="475" y="226" font-size="12" font-weight="700" fill="#1d4ed8" text-anchor="middle">2πR × h</text>
  <circle cx="470" cy="285" r="28" fill="#dcfce7" fill-opacity="0.5" stroke="#15803d" stroke-width="2"/>
  <text x="506" y="289" font-size="11" fill="#475569">nắp dưới = πR²</text>
  <text x="490" y="338" font-size="12.5" font-weight="700" fill="#1a202c" text-anchor="middle">S = 2·(πR²) + (2πR)·h</text>
</svg>

Trụ "mở thân ra" thành 1 hình chữ nhật: chiều rộng = chu vi đáy $2\\pi R$, chiều cao = $h$ → diện tích thân $= 2\\pi R\\cdot h$. Cộng 2 nắp tròn $2\\cdot\\pi R^2$.

#### Walk-through ≥3 ví dụ diện tích toàn phần — từng bước

**Ví dụ 1 — Lập phương** cạnh $a=4$:
$$\\begin{aligned}
S_{tp} &= 6a^2 \\\\
       &= 6\\cdot 4^2 \\\\
       &= 6\\cdot 16 = \\mathbf{96}
\\end{aligned}$$
6 mặt, mỗi mặt $4\\times4=16$ → tổng $96$.

**Ví dụ 2 — Hình trụ** $R=3,\\ h=10$:
$$\\begin{aligned}
S_{tp} &= 2\\pi R^2 + 2\\pi R h \\\\
       &= 2\\pi\\cdot 3^2 + 2\\pi\\cdot 3\\cdot 10 \\\\
       &= 18\\pi + 60\\pi \\\\
       &= 78\\pi \\approx \\mathbf{245.0}
\\end{aligned}$$
Tách rõ: 2 nắp $= 2\\pi\\cdot 9 = 18\\pi$; thân $= 2\\pi\\cdot 3\\cdot 10 = 60\\pi$. Cộng $= 78\\pi$.

**Ví dụ 3 — Hình nón** $R=3,\\ h=4$ (phải tính đường sinh trước):
$$\\begin{aligned}
l &= \\sqrt{R^2 + h^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5 \\\\
S_{tp} &= \\pi R^2 + \\pi R l \\\\
       &= \\pi\\cdot 9 + \\pi\\cdot 3\\cdot 5 \\\\
       &= 9\\pi + 15\\pi = 24\\pi \\approx \\mathbf{75.4}
\\end{aligned}$$
Bước đầu tiên **bắt buộc** là tìm $l$ — KHÔNG dùng $h=4$ trong $\\pi R l$. Dùng $l=5$.

**Ví dụ 4 (bonus) — Hình cầu** $R=6$:
$$\\begin{aligned}
S &= 4\\pi R^2 \\\\
  &= 4\\pi\\cdot 6^2 \\\\
  &= 4\\pi\\cdot 36 = 144\\pi \\approx \\mathbf{452.4}
\\end{aligned}$$
Cầu không có "xung quanh/toàn phần" riêng — chỉ 1 mặt cong duy nhất $= 4\\pi R^2$.

**Walk-through — Diện tích cầu (lịch sử)**:
- Archimedes (~ 250 TCN) chứng minh: $S_{\\text{cầu}} = 4\\pi R^2$ **chính bằng diện tích xung quanh hình trụ** có cùng R và h = 2R.
- Kiểm bằng số: trụ $R$, $h=2R$ có $S_{xq} = 2\\pi R\\cdot h = 2\\pi R\\cdot 2R = 4\\pi R^2$ — đúng bằng $S_{\\text{cầu}}$. ✓
- Đây là một trong những kết quả ông tự hào nhất, khắc trên bia mộ.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Đường sinh l của nón tính sao?"* Là cạnh xiên từ đỉnh tới mép đáy: $l = \\sqrt{R^2 + h^2}$ (Pythagoras). Vd R=3, h=4 → $l = 5$.
- *"S trụ gồm những phần nào?"* 2 nắp tròn ($2\\cdot\\pi R^2$) + thân (chu vi đáy × cao $= 2\\pi R\\cdot h$). Tổng $= 2\\pi R^2 + 2\\pi R h = 2\\pi R(R+h)$.
- *"Diện tích bề mặt và diện tích xung quanh khác nhau?"* "Toàn phần" gồm cả nắp/đáy; "xung quanh" chỉ phần thân. Đọc kỹ đề.

⚠ **Ba lỗi thường gặp khi tính diện tích**

**Lỗi 1 — dùng chiều cao $h$ thay đường sinh $l$ cho nón.** Công thức $S_{xq} = \\pi R l$ dùng **đường sinh** (cạnh xiên), KHÔNG dùng $h$ (cạnh đứng). Vì $l = \\sqrt{R^2+h^2} > h$ luôn, dùng $h$ cho kết quả **thiếu**. Phản ví dụ $R=3,h=4$: $l=5$, đúng $S_{xq}=\\pi\\cdot 3\\cdot 5=15\\pi$; lấy $\\pi R h = 12\\pi$ là sai.

<svg viewBox="0 0 480 310" style="max-width:480px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Hình nón phân biệt đường sinh l và chiều cao h: l là cạnh xiên màu xanh từ đỉnh tới mép đáy, dùng trong công thức diện tích xung quanh πRl; h là cạnh đứng màu đỏ từ đỉnh xuống tâm đáy, không dùng cho diện tích xung quanh; l bằng căn của R bình cộng h bình nên luôn lớn hơn h">
  <path d="M 95,245 A 115 24 0 0 1 325,245" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6 5"/>
  <path d="M 95,245 A 115 24 0 0 0 325,245" fill="none" stroke="#1a202c" stroke-width="2"/>
  <line x1="210" y1="45" x2="95" y2="245" stroke="#1a202c" stroke-width="2"/>
  <line x1="210" y1="45" x2="325" y2="245" stroke="#1d4ed8" stroke-width="3.5"/>
  <line x1="210" y1="45" x2="210" y2="245" stroke="#dc2626" stroke-width="2" stroke-dasharray="6 5"/>
  <path d="M 210,233 L 222,233 L 222,245" fill="none" stroke="#475569" stroke-width="1.5"/>
  <line x1="210" y1="245" x2="325" y2="245" stroke="#15803d" stroke-width="2.5"/>
  <circle cx="210" cy="245" r="3" fill="#1a202c"/>
  <circle cx="210" cy="45" r="3.5" fill="#1a202c"/>
  <text x="210" y="32" font-size="12" font-weight="700" fill="#1a202c" text-anchor="middle">đỉnh</text>
  <text x="292" y="128" font-size="12" font-weight="700" fill="#1d4ed8">l (đường sinh — cạnh XIÊN)</text>
  <text x="292" y="146" font-size="11.5" font-weight="700" fill="#1d4ed8">→ DÙNG cho Sxq = πRl</text>
  <text x="200" y="140" font-size="12" font-weight="700" fill="#dc2626" text-anchor="end">h (chiều cao — cạnh ĐỨNG)</text>
  <text x="200" y="158" font-size="11.5" font-weight="700" fill="#dc2626" text-anchor="end">KHÔNG dùng cho Sxq</text>
  <text x="268" y="238" font-size="12" font-weight="700" fill="#15803d">R</text>
  <text x="240" y="295" font-size="11.5" fill="#475569" text-anchor="middle">l = √(R² + h²) > h (Pythagoras với 2 cạnh góc vuông R và h)</text>
</svg>

**Lỗi 2 — quên nắp/đáy của trụ.** "Toàn phần" gồm 2 nắp tròn; "xung quanh" chỉ phần thân. Đọc kỹ đề. Trụ $R=3,h=10$: $S_{xq}=2\\pi R h=60\\pi$ (chỉ thân); $S_{tp}=60\\pi+18\\pi=78\\pi$ (thêm 2 nắp).

**Lỗi 3 — lẫn diện tích (mũ 2) với thể tích (mũ 3).** Diện tích đơn vị **vuông** (cm²); thể tích đơn vị **lập phương** (cm³). Lập phương cạnh 4: $S=96$ cm² nhưng $V=64$ cm³ — khác cả số lẫn đơn vị.

🔁 **Dừng lại tự kiểm tra**

1. Lập phương cạnh 4. Diện tích bề mặt?
2. Nón R = 6, h = 8. Tính đường sinh l rồi diện tích xung quanh ($\\pi R l$).

<details><summary>Đáp án</summary>

1. $S = 6\\cdot 4^2 = 6\\cdot 16 = $ **96**.
2. $l = \\sqrt{36+64} = \\sqrt{100} = 10$. $S_{xq} = \\pi\\cdot 6\\cdot 10 = $ **60π ≈ 188.5**.

</details>

### 📝 Tóm tắt mục 3

- Diện tích bề mặt = tổng diện tích "giấy gói" (lưới khai triển).
- Lập phương $6a^2$; trụ $2\\pi R^2+2\\pi R h$; nón $\\pi R^2+\\pi R l$; cầu $4\\pi R^2$.
- Nón: đường sinh $l = \\sqrt{R^2+h^2}$ (Pythagoras) — dùng $l$, không phải $h$.
- $S_{\\text{cầu}} = 4\\pi R^2$ = diện tích xung quanh trụ $R$, $h=2R$ (Archimedes).

---

## 4. Mặt cắt (cross-section)

💡 **Trực giác / Hình dung**: **mặt cắt** = hình phẳng thu được khi lấy 1 mặt phẳng "chém" xuyên qua khối — như cắt 1 lát từ ổ bánh mì, hay nhìn vào "mặt phẳng tiết diện" của ống nước. Hình lát cắt phụ thuộc vào **hướng** lưỡi dao.

**Vì sao quan trọng?** Mặt cắt là cầu nối 2D ↔ 3D: nó giải thích công thức thể tích (Cavalieri: 2 khối có mọi mặt cắt ngang cùng diện tích thì cùng thể tích), và là nền tảng cho tích phân thể tích sau này ("xếp chồng vô số lát mỏng").

#### Mặt cắt của hình trụ — tùy hướng dao

<svg viewBox="0 0 700 320" style="max-width:700px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Mặt cắt hình trụ theo hai hướng: mặt phẳng cắt ngang vuông góc trục cho lát cắt hình tròn bán kính R diện tích πR²; mặt phẳng cắt dọc chứa trục cho lát cắt hình chữ nhật rộng 2R cao h">
  <text x="185" y="32" font-size="13" font-weight="700" fill="#1a202c" text-anchor="middle">CẮT NGANG (⊥ trục)</text>
  <path d="M 60,245 A 65 16 0 0 1 190,245" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6 5"/>
  <line x1="60" y1="75" x2="60" y2="245" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="190" y1="75" x2="190" y2="245" stroke="#1d4ed8" stroke-width="2"/>
  <path d="M 60,245 A 65 16 0 0 0 190,245" fill="none" stroke="#1d4ed8" stroke-width="2"/>
  <ellipse cx="125" cy="75" rx="65" ry="16" fill="#dbeafe" fill-opacity="0.5" stroke="#1d4ed8" stroke-width="2"/>
  <ellipse cx="125" cy="160" rx="65" ry="16" fill="#dc2626" fill-opacity="0.12" stroke="#dc2626" stroke-width="2.5"/>
  <line x1="200" y1="160" x2="238" y2="160" stroke="#475569" stroke-width="1.8"/>
  <polygon points="246,160 236,155 236,165" fill="#475569"/>
  <circle cx="296" cy="160" r="42" fill="#dc2626" fill-opacity="0.08" stroke="#dc2626" stroke-width="2.5"/>
  <circle cx="296" cy="160" r="2.5" fill="#dc2626"/>
  <line x1="296" y1="160" x2="338" y2="160" stroke="#dc2626" stroke-width="1.8"/>
  <text x="315" y="152" font-size="12" font-weight="700" fill="#dc2626">R</text>
  <text x="185" y="282" font-size="12" font-weight="700" fill="#dc2626" text-anchor="middle">→ HÌNH TRÒN bán kính R</text>
  <text x="185" y="302" font-size="11.5" fill="#475569" text-anchor="middle">diện tích lát = πR²</text>
  <text x="520" y="32" font-size="13" font-weight="700" fill="#1a202c" text-anchor="middle">CẮT DỌC (chứa trục)</text>
  <path d="M 390,245 A 65 16 0 0 1 520,245" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6 5"/>
  <line x1="390" y1="75" x2="390" y2="245" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="520" y1="75" x2="520" y2="245" stroke="#1d4ed8" stroke-width="2"/>
  <path d="M 390,245 A 65 16 0 0 0 520,245" fill="none" stroke="#1d4ed8" stroke-width="2"/>
  <ellipse cx="455" cy="75" rx="65" ry="16" fill="#dbeafe" fill-opacity="0.5" stroke="#1d4ed8" stroke-width="2"/>
  <polygon points="390,75 520,75 520,245 390,245" fill="#dc2626" fill-opacity="0.12" stroke="#dc2626" stroke-width="2.5"/>
  <line x1="528" y1="160" x2="548" y2="160" stroke="#475569" stroke-width="1.8"/>
  <polygon points="556,160 546,155 546,165" fill="#475569"/>
  <rect x="565" y="90" width="110" height="145" fill="#dc2626" fill-opacity="0.08" stroke="#dc2626" stroke-width="2.5"/>
  <text x="620" y="82" font-size="12" font-weight="700" fill="#dc2626" text-anchor="middle">2R</text>
  <text x="655" y="167" font-size="12" font-weight="700" fill="#dc2626" text-anchor="middle">h</text>
  <text x="545" y="282" font-size="12" font-weight="700" fill="#dc2626" text-anchor="middle">→ HÌNH CHỮ NHẬT</text>
  <text x="545" y="302" font-size="11.5" fill="#475569" text-anchor="middle">rộng 2R, cao h</text>
</svg>

- Cắt **ngang** (vuông góc trục) hình trụ $R$: được **hình tròn** bán kính $R$, diện tích $\\pi R^2$ — giống nhau ở mọi độ cao (vì thân trụ đều). Đây là lý do $V_{\\text{trụ}} = \\pi R^2\\cdot h$ = (diện tích lát) × cao.
- Cắt **dọc** (chứa trục): được **hình chữ nhật** $2R\\times h$.

#### Mặt cắt của hình nón — bốn loại đường conic

Cắt hình nón bằng các góc khác nhau cho 4 đường conic (sẽ học kỹ ở [Lesson 06 — Tọa độ Oxy & Conic](../lesson-06-coordinate-plane-conics/)):

| Hướng cắt | Mặt cắt |
|-----------|---------|
| Vuông góc trục | **Hình tròn** (circle) |
| Nghiêng, cắt 1 bên | **Elip** (ellipse) |
| Song song 1 đường sinh | **Parabol** (parabola) |
| Song song trục (cắt cả 2 nhánh) | **Hyperbol** (hyperbola) |

#### Mặt cắt của hình cầu — luôn là hình tròn

Cắt hình cầu $R$ bằng mặt phẳng cách tâm khoảng $d$ (với $d \\le R$): luôn được **hình tròn** bán kính $r = \\sqrt{R^2 - d^2}$ (Pythagoras).

**Walk-through**: cầu $R=5$, cắt cách tâm $d=3$:
$$r = \\sqrt{R^2 - d^2} = \\sqrt{25 - 9} = \\sqrt{16} = 4$$
→ lát cắt là hình tròn bán kính **4**, diện tích $\\pi\\cdot 4^2 = 16\\pi$. Khi cắt **qua tâm** ($d=0$): $r=\\sqrt{25}=5=R$ → "đường tròn lớn" (great circle), lát cắt to nhất.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Cùng 1 khối mà sao nhiều hình cắt khác nhau?"* Vì hình cắt phụ thuộc **hướng** mặt phẳng. Cắt lập phương: ngang → hình vuông; chéo qua 4 cạnh → tam giác hoặc lục giác.
- *"Mặt cắt liên quan gì tới thể tích?"* Nguyên lý Cavalieri: nếu 2 khối có **mọi lát cắt ngang cùng độ cao đều cùng diện tích**, thì thể tích bằng nhau. Đây là ý tưởng gốc của tích phân thể tích.

🔁 **Dừng lại tự kiểm tra**

1. Cắt hình trụ $R=4$ vuông góc trục — mặt cắt là hình gì, diện tích bao nhiêu?
2. Cầu $R=13$, cắt cách tâm $d=5$ — bán kính lát cắt?

<details><summary>Đáp án</summary>

1. **Hình tròn** bán kính 4, diện tích $\\pi\\cdot 4^2 = 16\\pi \\approx 50.3$.
2. $r = \\sqrt{13^2 - 5^2} = \\sqrt{169-25} = \\sqrt{144} = $ **12**.

</details>

### 📝 Tóm tắt mục 4

- Mặt cắt = hình phẳng khi mặt phẳng "chém" qua khối; phụ thuộc **hướng** dao.
- Trụ: cắt ngang → tròn ($\\pi R^2$); cắt dọc → chữ nhật ($2R\\times h$).
- Nón: 4 hướng → 4 conic (tròn / elip / parabol / hyperbol).
- Cầu: luôn tròn, bán kính lát cắt $r = \\sqrt{R^2 - d^2}$; qua tâm → lớn nhất ($r=R$).
- Nguyên lý Cavalieri: cùng diện tích lát ⇒ cùng thể tích — gốc của tích phân thể tích.

---

## 5. Bài tập

### Bài tập

**Bài 1**: Lập phương cạnh 5 cm. Tính V, S_bề mặt.

**Bài 2**: Hình trụ R = 3, h = 10. Tính V và S.

**Bài 3**: Hình cầu R = 6 cm. Tính V và S.

**Bài 4**: Chóp đáy vuông cạnh 4, cao 6. Tính V.

**Bài 5**: Kiểm tra công thức Euler cho tứ diện đều.

**Bài 6**: Cho hình nón R = 5, h = 12. Tính đường sinh l, sau đó tính S.

**Bài 7**: Hộp chữ nhật $3\\times 4\\times 5$ cm. Tính V và diện tích toàn phần $S_{tp}$.

**Bài 8**: Lăng trụ tam giác có V = 6, F = 5. Dùng Euler tìm E. Sau đó kiểm bằng cách đếm cạnh trực tiếp.

**Bài 9**: Hình cầu $R = 10$, cắt bằng mặt phẳng cách tâm $d = 6$. Tính bán kính lát cắt $r$ và diện tích lát cắt.

### Lời giải

**Bài 1**: $V = 125$ cm³. $S = 6\\cdot 25 = $ **150 cm²**.

**Bài 2**: $V = \\pi\\cdot 9\\cdot 10 = $ **90π ≈ 282.7**. $S = 2\\pi\\cdot 9 + 2\\pi\\cdot 3\\cdot 10 = $ **78π ≈ 245**.

**Bài 3**: $V = \\frac{4}{3}\\pi\\cdot 216 = $ **288π ≈ 904.78 cm³**. $S = 4\\pi\\cdot 36 = $ **144π ≈ 452.4 cm²**.

**Bài 4**: $V = \\frac{1}{3}\\cdot 16\\cdot 6 = $ **32**.

**Bài 5**: V=4, E=6, F=4. $V - E + F = 4 - 6 + 4 = $ **2** ✓.

**Bài 6**: $l = \\sqrt{R^2+h^2} = \\sqrt{25+144} = $ **13**. $S = \\pi\\cdot 25 + \\pi\\cdot 5\\cdot 13 = $ **90π ≈ 283**.

**Bài 7**:
- $V = 3\\cdot 4\\cdot 5 = $ **60 cm³**.
- $S_{tp} = 2(ab+bc+ca) = 2(3\\cdot4 + 4\\cdot5 + 5\\cdot3) = 2(12+20+15) = 2\\cdot 47 = $ **94 cm²**.

**Bài 8**:
- Euler: $V - E + F = 2 \\Rightarrow 6 - E + 5 = 2 \\Rightarrow E = 9$.
- Đếm trực tiếp: 3 cạnh đáy dưới + 3 cạnh đáy trên + 3 cạnh đứng $= 9$ ✓. Khớp.

**Bài 9**:
- $r = \\sqrt{R^2 - d^2} = \\sqrt{10^2 - 6^2} = \\sqrt{100 - 36} = \\sqrt{64} = $ **8**.
- Diện tích lát cắt (hình tròn) $= \\pi r^2 = \\pi\\cdot 64 = $ **64π ≈ 201.1 cm²**.

---

## 6. Bài tiếp theo

[Lesson 06 — Tọa độ Oxy & Conic](../lesson-06-coordinate-plane-conics/).

## 📝 Tổng kết

1. **Euler**: $V - E + F = 2$ cho mọi đa diện lồi — verify được trên cả 5 loại khối (lập phương 8-12+6, tứ diện 4-6+4, lăng trụ 6-9+5, chóp 5-8+5...).
2. **5 khối Platonic** đều (Plato chứng minh chỉ có 5).
3. **Thể tích** (đơn vị cm³): khối thẳng (lăng trụ/trụ) = đáy × cao; khối nhọn (chóp/nón) = **⅓** × đáy × cao. Cầu $= \\frac{4}{3}\\pi R^3$. Lỗi hay gặp: quên ⅓, nhầm nón↔trụ, dùng đường kính thay bán kính, sai đơn vị (cm² vs cm³).
4. **Diện tích** (đơn vị cm²): lập phương $6a^2$; trụ $2\\pi R^2+2\\pi R h$; nón $\\pi R^2+\\pi R l$ với đường sinh $l=\\sqrt{R^2+h^2}$ (KHÔNG dùng $h$); cầu $4\\pi R^2$. $S_{\\text{cầu}} = 4\\pi R^2$ = diện tích xung quanh trụ $R$, $h = 2R$ (Archimedes).
5. **Mặt cắt**: trụ → tròn/chữ nhật; nón → 4 conic; cầu → luôn tròn $r=\\sqrt{R^2-d^2}$. Nguyên lý Cavalieri nối mặt cắt với thể tích.
`;
