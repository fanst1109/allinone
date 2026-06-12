# Lesson 05 — Hình học không gian

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

Vẽ hộp chữ nhật bằng "phối cảnh nghiêng" — nét đứt (`╌`, `┊`) là cạnh **khuất** phía sau:

```
            H┌───────────────┐G
           ╱┊               ╱│
          ╱ ┊              ╱ │
        E┌───────────────┐F │
         │  ┊            │   │
         │ D└╌╌╌╌╌╌╌╌╌╌╌╌│╌╌┘C
         │ ╱             │  ╱
         │╱              │ ╱
        A└───────────────┘B

  Đỉnh (V): A B C D E F G H  → 8 đỉnh
  Cạnh (E): AB BC CD DA (đáy dưới) · EF FG GH HE (đáy trên)
            · AE BF CG DH (4 cạnh đứng)            → 12 cạnh
  Mặt  (F): đáy dưới ABCD · đáy trên EFGH
            · 4 mặt bên (ABFE, BCGF, CDHG, DAEH)   → 6 mặt
```

Đếm tay: $V=8,\ E=12,\ F=6$ — giống hệt lập phương (lập phương chỉ là hộp với $a=b=c$). Cùng dạng "topology hộp" nên cùng bộ số. Kiểm Euler: $8-12+6=2$ ✓.

#### Hình dung chóp tứ giác (square pyramid) và tứ diện (tetrahedron)

```
   Chóp đáy vuông (square pyramid)          Tứ diện đều (tetrahedron)
              S                                       D
             ╱│╲                                     ╱│╲
            ╱ │ ╲                                   ╱ │ ╲
           ╱  │  ╲                                 ╱  │  ╲
        D ╱╌╌╌┼╌╌╌╲ C                           A ╱╌╌╌┼╌╌╌╲ C
         ╱  ╌╌┼╌╌  ╲                              ╲  ╌┼╌  ╱
        ╱╌╌   │   ╌╌╲                              ╲  │  ╱
      A └─────┴─────┘ B                             ╲ │ ╱
                                                     ╲│╱
   V=5 (4 đáy + 1 đỉnh S)                              B
   E=8 (4 cạnh đáy + 4 cạnh bên)              V=4  E=6  F=4
   F=5 (1 đáy vuông + 4 mặt tam giác)         (mọi mặt là tam giác đều)
```

Chóp tứ giác: $V-E+F = 5-8+5 = 2$ ✓. Tứ diện: $4-6+4 = 2$ ✓. Lưu ý chóp **không** phải khối đều (đáy vuông, mặt bên tam giác — khác loại), nhưng Euler vẫn đúng vì nó vẫn là đa diện lồi.

#### Hình dung lăng trụ tam giác (triangular prism)

```
          D┌───────────┐E
          ╱ ╲         ╱ ╲
         ╱   ╲       ╱   ╲
        ╱     ╲     ╱     ╲
       └───────╲───┘       ╲ F
       A╌╌╌╌╌╌╌╌╲╌╌╌╌╌╌╌╌╌╌╱
        ╲        ╲        ╱
         ╲        ╲      ╱
          ╲        ╲    ╱
        B  └────────╲──┘ C

  V=6 (2 tam giác đáy × 3 đỉnh)
  E=9 (3 cạnh đáy dưới + 3 cạnh đáy trên + 3 cạnh đứng)
  F=5 (2 mặt tam giác đáy + 3 mặt chữ nhật bên)
```

Lăng trụ tam giác: $V-E+F = 6-9+5 = 2$ ✓. (Hình ASCII là minh họa thô — quan trọng là **đếm đúng** 6/9/5.)

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

💡 **Vì sao chỉ có 5?** Plato (~400 TCN) chứng minh. Lý do: ở mỗi đỉnh phải có $\ge 3$ mặt + tổng các góc đó $< 360^\circ$ → giới hạn số khả năng.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Euler $V-E+F=2$ có đúng cho mọi khối không?"* Đúng cho mọi đa diện **lồi** (và mọi đa diện "tương đương cầu" về topology). Khối có lỗ thủng (như bánh donut) thì = 0, không phải 2.
- *"Vì sao chỉ có đúng 5 khối Platonic?"* Tại mỗi đỉnh cần $\ge 3$ mặt đều giống nhau, tổng góc tại đỉnh phải $< 360^\circ$ (nếu $= 360^\circ$ thì phẳng, > thì không khép được). Chỉ 5 cấu hình thỏa: 3/4/5 tam giác, 3 vuông, 3 ngũ giác.
- *"Cạnh đếm thế nào để không trùng?"* Mỗi cạnh là mép chung của đúng 2 mặt — đếm 1 lần. Mẹo kiểm: tổng (số cạnh mỗi mặt) = $2E$ (mỗi cạnh thuộc 2 mặt).

⚠ **Lỗi thường gặp**: đếm trùng cạnh hoặc đỉnh khi áp Euler. Phản ví dụ: lập phương có 12 cạnh (không phải $6\cdot 4=24$ — vì mỗi cạnh chung 2 mặt nên chia đôi: $24/2=12$). Kiểm: $V-E+F = 8-12+6 = 2$ ✓; nếu lỡ lấy $E=24$ thì $8-24+6 = -10 \neq 2$ → biết đếm sai.

🔁 **Dừng lại tự kiểm tra**

1. Lăng trụ tam giác có V=6, F=5. Tính E bằng công thức Euler.
2. Bát diện đều có 8 mặt tam giác, 6 đỉnh. Số cạnh?

<details><summary>Đáp án</summary>

1. $V-E+F=2$ → $6-E+5 = 2$ → $E = $ **9**.
2. $6-E+8 = 2$ → $E = $ **12**. (Hoặc: 8 mặt $\times$ 3 cạnh $/ 2 = 12$.)

</details>

### 📝 Tóm tắt mục 1

- Đa diện đếm 3 số: V (đỉnh), E (cạnh), F (mặt).
- **Công thức Euler**: $V - E + F = 2$ cho mọi đa diện lồi.
- Mỗi cạnh chung 2 mặt → đếm 1 lần (tránh nhân đôi).
- Chỉ có **5 khối Platonic** (đa diện đều): tứ diện, lập phương, bát diện, thập nhị diện, nhị thập diện.

---

## 2. Thể tích các khối phổ biến

💡 **Trực giác / Hình dung**: thể tích = "đếm số khối lập phương đơn vị ($1\times 1\times 1$) lấp đầy khối". Hộp $a\times b\times c = a\cdot b\cdot c$ khối nhỏ. Khối "có đỉnh nhọn" (chóp, nón) chỉ chứa **1/3** so với khối "thẳng đứng" (lăng trụ, trụ) cùng đáy và cao — vì phần đỉnh thu nhỏ dần.

$$\begin{aligned}
\text{Lập phương cạnh } a: \quad & V = a^3 \\
\text{Hộp chữ nhật } a\times b\times c: \quad & V = abc \\
\text{Lăng trụ đáy } S,\ \text{cao } h: \quad & V = S\cdot h \\
\text{Chóp đáy } S,\ \text{cao } h: \quad & V = \tfrac{1}{3}\cdot S\cdot h \\
\text{Hình trụ } R, h: \quad & V = \pi R^2 h \\
\text{Hình nón } R, h: \quad & V = \tfrac{1}{3}\pi R^2 h \\
\text{Hình cầu } R: \quad & V = \tfrac{4}{3}\pi R^3
\end{aligned}$$

💡 **Nhớ**: chóp = (1/3) lăng trụ cùng đáy + cao. Nón = (1/3) trụ. Cầu R có $V = \frac{4}{3}\pi R^3$.

#### Hình dung khối tròn xoay (round solids)

Khối tròn xoay = quay 1 hình phẳng quanh 1 trục. Trụ = quay hình chữ nhật; nón = quay tam giác vuông; cầu = quay nửa hình tròn.

```
   Hình trụ (cylinder)       Hình nón (cone)          Hình cầu (sphere)
      ╭─────────╮               ╱╲                       ╭───────╮
     (    R    )               ╱  ╲  ← l (đường sinh)    ╱    R    ╲
      │╌╌╌╌╌╌╌╌╌│             ╱    ╲  h                 │    •────→│
      │         │ h          ╱  h   ╲                    │   tâm    │
      │         │           ╱   │    ╲                   ╲         ╱
     (    R    )          ╱─────┼─────╲                   ╰───────╯
      ╰─────────╯              R│ R
                          (đáy bán kính R)
  V = πR²·h               V = ⅓πR²·h               V = 4⁄3·πR³
  (đáy tròn πR² × cao)    (⅓ của trụ cùng đáy/cao)  (R đo từ tâm ra vỏ)
```

⚠ Lưu ý ASCII chỉ là phác hoạ — **bán kính R đo từ tâm/trục ra mép**, không phải đường kính. Đường sinh $l$ của nón là cạnh **xiên** (khác chiều cao $h$ là cạnh đứng).

#### Bảng tổng hợp — thể tích & diện tích mọi khối

Một chỗ tra cứu duy nhất ($S_{xq}$ = diện tích xung quanh; $S_{tp}$ = diện tích toàn phần; $l = \sqrt{R^2+h^2}$ là đường sinh nón):

| Khối | Thể tích $V$ | $S_{xq}$ (xung quanh) | $S_{tp}$ (toàn phần) |
|------|--------------|------------------------|----------------------|
| Lập phương cạnh $a$ | $a^3$ | $4a^2$ (4 mặt bên) | $6a^2$ |
| Hộp chữ nhật $a\times b\times c$ | $abc$ | $2h(a+b)$ với $h=c$ | $2(ab+bc+ca)$ |
| Lăng trụ đáy $S_{\text{đáy}}$, cao $h$ | $S_{\text{đáy}}\cdot h$ | chu vi đáy $\times h$ | $S_{xq} + 2S_{\text{đáy}}$ |
| Chóp đáy $S_{\text{đáy}}$, cao $h$ | $\tfrac13 S_{\text{đáy}}\cdot h$ | $\tfrac12\cdot$chu vi đáy$\times l_{\text{mặt bên}}$ | $S_{xq} + S_{\text{đáy}}$ |
| Hình trụ $R, h$ | $\pi R^2 h$ | $2\pi R h$ | $2\pi R h + 2\pi R^2$ |
| Hình nón $R, h$ | $\tfrac13 \pi R^2 h$ | $\pi R l$ | $\pi R l + \pi R^2$ |
| Hình cầu $R$ | $\tfrac43 \pi R^3$ | — | $4\pi R^2$ |

📝 **Quy luật nhớ**: khối "thẳng đứng" (lăng trụ, trụ) = đáy × cao; khối "nhọn dần" (chóp, nón) = **⅓** × đáy × cao (cùng đáy, cùng cao). Cầu có cặp đẹp: $V = \tfrac43\pi R^3$ và $S = 4\pi R^2$ (đạo hàm $V$ theo $R$ ra đúng $S$).

#### Walk-through ≥4 ví dụ thể tích — từng bước với số cụ thể

**Ví dụ 1 — Hộp chữ nhật** $a=2,\ b=3,\ c=4$ (cm):
$$\begin{aligned}
V &= a\cdot b\cdot c \\
  &= 2\cdot 3\cdot 4 \\
  &= 6\cdot 4 = \mathbf{24}\ \text{cm}^3
\end{aligned}$$
Kiểm bằng trực giác "lấp khối đơn vị": xếp $2\times3=6$ khối $1\text{cm}^3$ thành 1 lớp đáy, chồng 4 lớp → $6\times4 = 24$ khối. ✓

**Ví dụ 2 — Hình trụ** $R=2,\ h=5$:
$$\begin{aligned}
V &= \pi R^2 h \\
  &= \pi\cdot 2^2\cdot 5 \\
  &= \pi\cdot 4\cdot 5 \\
  &= 20\pi \approx 20\cdot 3.1416 = \mathbf{62.83}
\end{aligned}$$
Bước quan trọng: bình phương **bán kính** trước ($2^2=4$), rồi mới nhân $h$. Dễ sai nếu nhân $\pi\cdot 2\cdot 5$ (quên bình phương).

**Ví dụ 3 — Hình nón** $R=2,\ h=5$ (cùng đáy, cùng cao với Ví dụ 2):
$$\begin{aligned}
V &= \tfrac13 \pi R^2 h \\
  &= \tfrac13\cdot \pi\cdot 4\cdot 5 \\
  &= \tfrac13\cdot 20\pi \\
  &= \tfrac{20\pi}{3} \approx \mathbf{20.94}
\end{aligned}$$
Xác nhận quy luật ⅓: nón $20.94$ đúng bằng $\tfrac13$ của trụ $62.83$ ($62.83/3 \approx 20.94$). Đổ đầy 3 nón nước vừa khít 1 trụ.

**Ví dụ 4 — Hình cầu** $R=3$:
$$\begin{aligned}
V &= \tfrac43 \pi R^3 \\
  &= \tfrac43\cdot \pi\cdot 3^3 \\
  &= \tfrac43\cdot \pi\cdot 27 \\
  &= \tfrac{4\cdot 27}{3}\pi = 36\pi \approx \mathbf{113.10}
\end{aligned}$$
Mẹo rút gọn: $\tfrac43\cdot 27 = 4\cdot 9 = 36$ (chia $27/3=9$ trước, đỡ nhân số to).

**Ví dụ 5 (bonus) — Chóp đáy vuông** cạnh $6$, cao $10$:
$$\begin{aligned}
S_{\text{đáy}} &= 6^2 = 36 \\
V &= \tfrac13\cdot S_{\text{đáy}}\cdot h = \tfrac13\cdot 36\cdot 10 = \tfrac{360}{3} = \mathbf{120}
\end{aligned}$$
Nếu quên ⅓ sẽ ra $360$ (gấp 3 lần — sai).

**4 ví dụ số đa dạng** (tóm gọn):
- Lập phương cạnh 3: $V = 3^3 = $ **27**.
- Hộp $2\times 3\times 4$: $V = 24$.
- Trụ R=2, h=5: $V = \pi\cdot 4\cdot 5 = 20\pi \approx$ **62.8**.
- Nón R=2, h=5: $V = \frac{1}{3}\cdot 20\pi \approx$ **20.9** (đúng = 1/3 trụ cùng đáy, cao).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao chóp/nón có hệ số 1/3?"* Vì khối nhọn dần lên đỉnh, "hụt" thể tích so với khối thẳng. Có thể xác nhận: đổ đầy 3 nón nước vào sẽ vừa đầy 1 trụ cùng đáy, cùng cao.
- *"Đơn vị thể tích là gì?"* Luôn là đơn vị **lập phương** (cm³, m³). Cạnh cm → thể tích cm³.
- *"Cầu là $\frac{4}{3}\pi R^3$ — nhớ thế nào?"* Mẹo: "bốn phần ba pi r mũ ba". Diện tích cầu $4\pi R^2$ thì là đạo hàm của thể tích theo R (sẽ thấy ở giải tích).

⚠ **Bốn lỗi thường gặp khi tính thể tích**

**Lỗi 1 — quên hệ số ⅓ cho chóp/nón.** Phản ví dụ: nón $R=3,\ h=6$ → đúng $V = \tfrac13\pi\cdot 9\cdot 6 = 18\pi$; quên ⅓ ra $54\pi$ (gấp 3, sai). Mẹo: thấy "đỉnh nhọn" → luôn có ⅓.

**Lỗi 2 — nhầm thể tích nón với thể tích trụ.** Cùng $R,h$: trụ $= \pi R^2 h$, nón chỉ bằng **⅓** chừng đó. Phản ví dụ $R=2,h=5$: trụ $20\pi\approx62.8$, nón $\tfrac{20\pi}{3}\approx20.9$ — chênh **3 lần**. Viết nhầm nón $= \pi R^2 h$ là lỗi rất phổ biến.

**Lỗi 3 — dùng đường kính thay bán kính.** Công thức dùng **bán kính $R$**. Nếu đề cho đường kính $d=6$ thì $R=3$, KHÔNG thay $6$ vào. Phản ví dụ cầu $d=6$: đúng $V=\tfrac43\pi\cdot 3^3 = 36\pi$; nếu lấy $R=6$ ra $\tfrac43\pi\cdot 216 = 288\pi$ — **gấp 8 lần** (vì $R$ vào lũy thừa 3: $2^3=8$).

**Lỗi 4 — sai đơn vị (cm² vs cm³).** Thể tích luôn là đơn vị **lập phương** (cm³, m³), KHÔNG phải cm². Ghi "$V=27$ cm²" là sai — phải "$27$ cm³". Trực giác: cạnh nhân 3 lần (dài × rộng × cao) → đơn vị mũ 3.

🔁 **Dừng lại tự kiểm tra**

1. Chóp đáy vuông cạnh 6, cao 10. Thể tích?
2. Hình cầu bán kính 3. Thể tích?

<details><summary>Đáp án</summary>

1. $V = \frac{1}{3}\cdot(6^2)\cdot 10 = \frac{1}{3}\cdot 36\cdot 10 = $ **120**.
2. $V = \frac{4}{3}\pi\cdot 3^3 = \frac{4}{3}\pi\cdot 27 = $ **36π ≈ 113.1**.

</details>

### 📝 Tóm tắt mục 2

- Thể tích = đếm khối lập phương đơn vị; đơn vị luôn **lập phương** (cm³...).
- Khối thẳng: lăng trụ/trụ $=$ đáy$\cdot$cao. Khối nhọn: chóp/nón $=$ **(1/3)**$\cdot$đáy$\cdot$cao.
- Cầu: $V = \frac{4}{3}\pi R^3$.
- Cẩn thận dùng bán kính (không phải đường kính) trong trụ/nón/cầu.

---

## 3. Diện tích bề mặt

💡 **Trực giác / Hình dung**: diện tích bề mặt = "tổng diện tích giấy gói cần để bọc kín khối" (như khai triển hộp ra mặt phẳng — gọi là "lưới" hay net). Lập phương = 6 mặt vuông → $6a^2$. Trụ = 2 nắp tròn + 1 thân hình chữ nhật cuộn lại.

$$\begin{aligned}
\text{Lập phương cạnh } a: \quad & S = 6a^2 \\
\text{Hộp chữ nhật}: \quad & S = 2(ab + bc + ca) \\
\text{Hình trụ } R, h: \quad & S = 2\pi R^2 + 2\pi R h \\
\text{Hình nón } R, l\ (\text{đường sinh}): \quad & S = \pi R^2 + \pi R l \\
\text{Hình cầu } R: \quad & S = 4\pi R^2
\end{aligned}$$

#### Hình dung "lưới" (net) — khai triển khối ra mặt phẳng

Diện tích toàn phần = diện tích tấm giấy phẳng cắt ra rồi gấp lại thành khối. Lưới của lập phương và của trụ:

```
   Lưới lập phương (6 mặt vuông a×a)        Lưới hình trụ
        ┌───┐                               ╭─────╮  ← nắp trên (πR²)
        │top│                               ╰─────╯
    ┌───┼───┼───┬───┐                    ┌───────────────┐
    │ L │fr.│ R │bk.│                    │               │  thân = chữ nhật
    └───┼───┼───┴───┘                    │  2πR  ×  h    │  rộng = chu vi 2πR
        │bot│                            │               │  cao  = h
        └───┘                            └───────────────┘
                                            ╭─────╮  ← nắp dưới (πR²)
    S = 6 × (a×a) = 6a²                     ╰─────╯
                                       S = 2·(πR²) + (2πR)·h
```

Trụ "mở thân ra" thành 1 hình chữ nhật: chiều rộng = chu vi đáy $2\pi R$, chiều cao = $h$ → diện tích thân $= 2\pi R\cdot h$. Cộng 2 nắp tròn $2\cdot\pi R^2$.

#### Walk-through ≥3 ví dụ diện tích toàn phần — từng bước

**Ví dụ 1 — Lập phương** cạnh $a=4$:
$$\begin{aligned}
S_{tp} &= 6a^2 \\
       &= 6\cdot 4^2 \\
       &= 6\cdot 16 = \mathbf{96}
\end{aligned}$$
6 mặt, mỗi mặt $4\times4=16$ → tổng $96$.

**Ví dụ 2 — Hình trụ** $R=3,\ h=10$:
$$\begin{aligned}
S_{tp} &= 2\pi R^2 + 2\pi R h \\
       &= 2\pi\cdot 3^2 + 2\pi\cdot 3\cdot 10 \\
       &= 18\pi + 60\pi \\
       &= 78\pi \approx \mathbf{245.0}
\end{aligned}$$
Tách rõ: 2 nắp $= 2\pi\cdot 9 = 18\pi$; thân $= 2\pi\cdot 3\cdot 10 = 60\pi$. Cộng $= 78\pi$.

**Ví dụ 3 — Hình nón** $R=3,\ h=4$ (phải tính đường sinh trước):
$$\begin{aligned}
l &= \sqrt{R^2 + h^2} = \sqrt{9 + 16} = \sqrt{25} = 5 \\
S_{tp} &= \pi R^2 + \pi R l \\
       &= \pi\cdot 9 + \pi\cdot 3\cdot 5 \\
       &= 9\pi + 15\pi = 24\pi \approx \mathbf{75.4}
\end{aligned}$$
Bước đầu tiên **bắt buộc** là tìm $l$ — KHÔNG dùng $h=4$ trong $\pi R l$. Dùng $l=5$.

**Ví dụ 4 (bonus) — Hình cầu** $R=6$:
$$\begin{aligned}
S &= 4\pi R^2 \\
  &= 4\pi\cdot 6^2 \\
  &= 4\pi\cdot 36 = 144\pi \approx \mathbf{452.4}
\end{aligned}$$
Cầu không có "xung quanh/toàn phần" riêng — chỉ 1 mặt cong duy nhất $= 4\pi R^2$.

**Walk-through — Diện tích cầu (lịch sử)**:
- Archimedes (~ 250 TCN) chứng minh: $S_{\text{cầu}} = 4\pi R^2$ **chính bằng diện tích xung quanh hình trụ** có cùng R và h = 2R.
- Kiểm bằng số: trụ $R$, $h=2R$ có $S_{xq} = 2\pi R\cdot h = 2\pi R\cdot 2R = 4\pi R^2$ — đúng bằng $S_{\text{cầu}}$. ✓
- Đây là một trong những kết quả ông tự hào nhất, khắc trên bia mộ.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Đường sinh l của nón tính sao?"* Là cạnh xiên từ đỉnh tới mép đáy: $l = \sqrt{R^2 + h^2}$ (Pythagoras). Vd R=3, h=4 → $l = 5$.
- *"S trụ gồm những phần nào?"* 2 nắp tròn ($2\cdot\pi R^2$) + thân (chu vi đáy × cao $= 2\pi R\cdot h$). Tổng $= 2\pi R^2 + 2\pi R h = 2\pi R(R+h)$.
- *"Diện tích bề mặt và diện tích xung quanh khác nhau?"* "Toàn phần" gồm cả nắp/đáy; "xung quanh" chỉ phần thân. Đọc kỹ đề.

⚠ **Ba lỗi thường gặp khi tính diện tích**

**Lỗi 1 — dùng chiều cao $h$ thay đường sinh $l$ cho nón.** Công thức $S_{xq} = \pi R l$ dùng **đường sinh** (cạnh xiên), KHÔNG dùng $h$ (cạnh đứng). Vì $l = \sqrt{R^2+h^2} > h$ luôn, dùng $h$ cho kết quả **thiếu**. Phản ví dụ $R=3,h=4$: $l=5$, đúng $S_{xq}=\pi\cdot 3\cdot 5=15\pi$; lấy $\pi R h = 12\pi$ là sai.

```
        đỉnh
         ╱│╲
   l →  ╱ │ ╲ ← l (đường sinh = cạnh XIÊN, dùng cái này)
       ╱  │h ╲     h = chiều cao (cạnh ĐỨNG, KHÔNG dùng cho S)
      ╱   │   ╲    l = √(R² + h²)  > h
     ╱────┼────╲
          R
```

**Lỗi 2 — quên nắp/đáy của trụ.** "Toàn phần" gồm 2 nắp tròn; "xung quanh" chỉ phần thân. Đọc kỹ đề. Trụ $R=3,h=10$: $S_{xq}=2\pi R h=60\pi$ (chỉ thân); $S_{tp}=60\pi+18\pi=78\pi$ (thêm 2 nắp).

**Lỗi 3 — lẫn diện tích (mũ 2) với thể tích (mũ 3).** Diện tích đơn vị **vuông** (cm²); thể tích đơn vị **lập phương** (cm³). Lập phương cạnh 4: $S=96$ cm² nhưng $V=64$ cm³ — khác cả số lẫn đơn vị.

🔁 **Dừng lại tự kiểm tra**

1. Lập phương cạnh 4. Diện tích bề mặt?
2. Nón R = 6, h = 8. Tính đường sinh l rồi diện tích xung quanh ($\pi R l$).

<details><summary>Đáp án</summary>

1. $S = 6\cdot 4^2 = 6\cdot 16 = $ **96**.
2. $l = \sqrt{36+64} = \sqrt{100} = 10$. $S_{xq} = \pi\cdot 6\cdot 10 = $ **60π ≈ 188.5**.

</details>

### 📝 Tóm tắt mục 3

- Diện tích bề mặt = tổng diện tích "giấy gói" (lưới khai triển).
- Lập phương $6a^2$; trụ $2\pi R^2+2\pi R h$; nón $\pi R^2+\pi R l$; cầu $4\pi R^2$.
- Nón: đường sinh $l = \sqrt{R^2+h^2}$ (Pythagoras) — dùng $l$, không phải $h$.
- $S_{\text{cầu}} = 4\pi R^2$ = diện tích xung quanh trụ $R$, $h=2R$ (Archimedes).

---

## 4. Mặt cắt (cross-section)

💡 **Trực giác / Hình dung**: **mặt cắt** = hình phẳng thu được khi lấy 1 mặt phẳng "chém" xuyên qua khối — như cắt 1 lát từ ổ bánh mì, hay nhìn vào "mặt phẳng tiết diện" của ống nước. Hình lát cắt phụ thuộc vào **hướng** lưỡi dao.

**Vì sao quan trọng?** Mặt cắt là cầu nối 2D ↔ 3D: nó giải thích công thức thể tích (Cavalieri: 2 khối có mọi mặt cắt ngang cùng diện tích thì cùng thể tích), và là nền tảng cho tích phân thể tích sau này ("xếp chồng vô số lát mỏng").

#### Mặt cắt của hình trụ — tùy hướng dao

```
   Cắt NGANG (⊥ trục)        Cắt DỌC (chứa trục)
        ╭─────╮                  ┌─────────┐
       (   •   )  → HÌNH TRÒN    │         │  → HÌNH CHỮ NHẬT
        ╰─────╯     bán kính R   │  2R × h │     rộng 2R, cao h
                                 └─────────┘
```

- Cắt **ngang** (vuông góc trục) hình trụ $R$: được **hình tròn** bán kính $R$, diện tích $\pi R^2$ — giống nhau ở mọi độ cao (vì thân trụ đều). Đây là lý do $V_{\text{trụ}} = \pi R^2\cdot h$ = (diện tích lát) × cao.
- Cắt **dọc** (chứa trục): được **hình chữ nhật** $2R\times h$.

#### Mặt cắt của hình nón — bốn loại đường conic

Cắt hình nón bằng các góc khác nhau cho 4 đường conic (sẽ học kỹ ở [Lesson 06 — Tọa độ Oxy & Conic](../lesson-06-coordinate-plane-conics/)):

| Hướng cắt | Mặt cắt |
|-----------|---------|
| Vuông góc trục | **Hình tròn** (circle) |
| Nghiêng, cắt 1 bên | **Elip** (ellipse) |
| Song song 1 đường sinh | **Parabol** (parabola) |
| Song song trục (cắt cả 2 nhánh) | **Hyperbol** (hyperbola) |

#### Mặt cắt của hình cầu — luôn là hình tròn

Cắt hình cầu $R$ bằng mặt phẳng cách tâm khoảng $d$ (với $d \le R$): luôn được **hình tròn** bán kính $r = \sqrt{R^2 - d^2}$ (Pythagoras).

**Walk-through**: cầu $R=5$, cắt cách tâm $d=3$:
$$r = \sqrt{R^2 - d^2} = \sqrt{25 - 9} = \sqrt{16} = 4$$
→ lát cắt là hình tròn bán kính **4**, diện tích $\pi\cdot 4^2 = 16\pi$. Khi cắt **qua tâm** ($d=0$): $r=\sqrt{25}=5=R$ → "đường tròn lớn" (great circle), lát cắt to nhất.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Cùng 1 khối mà sao nhiều hình cắt khác nhau?"* Vì hình cắt phụ thuộc **hướng** mặt phẳng. Cắt lập phương: ngang → hình vuông; chéo qua 4 cạnh → tam giác hoặc lục giác.
- *"Mặt cắt liên quan gì tới thể tích?"* Nguyên lý Cavalieri: nếu 2 khối có **mọi lát cắt ngang cùng độ cao đều cùng diện tích**, thì thể tích bằng nhau. Đây là ý tưởng gốc của tích phân thể tích.

🔁 **Dừng lại tự kiểm tra**

1. Cắt hình trụ $R=4$ vuông góc trục — mặt cắt là hình gì, diện tích bao nhiêu?
2. Cầu $R=13$, cắt cách tâm $d=5$ — bán kính lát cắt?

<details><summary>Đáp án</summary>

1. **Hình tròn** bán kính 4, diện tích $\pi\cdot 4^2 = 16\pi \approx 50.3$.
2. $r = \sqrt{13^2 - 5^2} = \sqrt{169-25} = \sqrt{144} = $ **12**.

</details>

### 📝 Tóm tắt mục 4

- Mặt cắt = hình phẳng khi mặt phẳng "chém" qua khối; phụ thuộc **hướng** dao.
- Trụ: cắt ngang → tròn ($\pi R^2$); cắt dọc → chữ nhật ($2R\times h$).
- Nón: 4 hướng → 4 conic (tròn / elip / parabol / hyperbol).
- Cầu: luôn tròn, bán kính lát cắt $r = \sqrt{R^2 - d^2}$; qua tâm → lớn nhất ($r=R$).
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

**Bài 7**: Hộp chữ nhật $3\times 4\times 5$ cm. Tính V và diện tích toàn phần $S_{tp}$.

**Bài 8**: Lăng trụ tam giác có V = 6, F = 5. Dùng Euler tìm E. Sau đó kiểm bằng cách đếm cạnh trực tiếp.

**Bài 9**: Hình cầu $R = 10$, cắt bằng mặt phẳng cách tâm $d = 6$. Tính bán kính lát cắt $r$ và diện tích lát cắt.

### Lời giải

**Bài 1**: $V = 125$ cm³. $S = 6\cdot 25 = $ **150 cm²**.

**Bài 2**: $V = \pi\cdot 9\cdot 10 = $ **90π ≈ 282.7**. $S = 2\pi\cdot 9 + 2\pi\cdot 3\cdot 10 = $ **78π ≈ 245**.

**Bài 3**: $V = \frac{4}{3}\pi\cdot 216 = $ **288π ≈ 904.78 cm³**. $S = 4\pi\cdot 36 = $ **144π ≈ 452.4 cm²**.

**Bài 4**: $V = \frac{1}{3}\cdot 16\cdot 6 = $ **32**.

**Bài 5**: V=4, E=6, F=4. $V - E + F = 4 - 6 + 4 = $ **2** ✓.

**Bài 6**: $l = \sqrt{R^2+h^2} = \sqrt{25+144} = $ **13**. $S = \pi\cdot 25 + \pi\cdot 5\cdot 13 = $ **90π ≈ 283**.

**Bài 7**:
- $V = 3\cdot 4\cdot 5 = $ **60 cm³**.
- $S_{tp} = 2(ab+bc+ca) = 2(3\cdot4 + 4\cdot5 + 5\cdot3) = 2(12+20+15) = 2\cdot 47 = $ **94 cm²**.

**Bài 8**:
- Euler: $V - E + F = 2 \Rightarrow 6 - E + 5 = 2 \Rightarrow E = 9$.
- Đếm trực tiếp: 3 cạnh đáy dưới + 3 cạnh đáy trên + 3 cạnh đứng $= 9$ ✓. Khớp.

**Bài 9**:
- $r = \sqrt{R^2 - d^2} = \sqrt{10^2 - 6^2} = \sqrt{100 - 36} = \sqrt{64} = $ **8**.
- Diện tích lát cắt (hình tròn) $= \pi r^2 = \pi\cdot 64 = $ **64π ≈ 201.1 cm²**.

---

## 6. Bài tiếp theo

[Lesson 06 — Tọa độ Oxy & Conic](../lesson-06-coordinate-plane-conics/).

## 📝 Tổng kết

1. **Euler**: $V - E + F = 2$ cho mọi đa diện lồi — verify được trên cả 5 loại khối (lập phương 8-12+6, tứ diện 4-6+4, lăng trụ 6-9+5, chóp 5-8+5...).
2. **5 khối Platonic** đều (Plato chứng minh chỉ có 5).
3. **Thể tích** (đơn vị cm³): khối thẳng (lăng trụ/trụ) = đáy × cao; khối nhọn (chóp/nón) = **⅓** × đáy × cao. Cầu $= \frac{4}{3}\pi R^3$. Lỗi hay gặp: quên ⅓, nhầm nón↔trụ, dùng đường kính thay bán kính, sai đơn vị (cm² vs cm³).
4. **Diện tích** (đơn vị cm²): lập phương $6a^2$; trụ $2\pi R^2+2\pi R h$; nón $\pi R^2+\pi R l$ với đường sinh $l=\sqrt{R^2+h^2}$ (KHÔNG dùng $h$); cầu $4\pi R^2$. $S_{\text{cầu}} = 4\pi R^2$ = diện tích xung quanh trụ $R$, $h = 2R$ (Archimedes).
5. **Mặt cắt**: trụ → tròn/chữ nhật; nón → 4 conic; cầu → luôn tròn $r=\sqrt{R^2-d^2}$. Nguyên lý Cavalieri nối mặt cắt với thể tích.
