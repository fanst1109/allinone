# Lesson 01 — Cơ sở Euclid

## Mục tiêu

- Hiểu các **đối tượng cơ bản** của hình học Euclid: điểm, đường, tia, đoạn, góc, mặt phẳng.
- Biết **5 tiên đề Euclid**.
- Phân loại **góc**: nhọn, vuông, tù, bẹt, đầy.
- Hiểu khái niệm **đường thẳng song song**, **đường vuông góc**.

## Kiến thức tiền đề

Không.

---

## 1. Đối tượng cơ bản

Hình học Euclid xây dựng từ **3 khái niệm nguyên thủy** không định nghĩa:
- **Điểm** (point): vị trí trong không gian, không có kích thước. Ký hiệu A, B, ...
- **Đường thẳng** (line): kéo dài vô hạn 2 đầu, không có bề rộng. Đi qua vô số điểm.
- **Mặt phẳng** (plane): 2D, kéo dài vô hạn, không có chiều dày.

💡 **Vì sao "không định nghĩa"?** Vì để định nghĩa cần khái niệm khác — sẽ vô hạn. Euclid chọn các khái niệm nguyên thủy + tiên đề làm cơ sở.

### Đối tượng dẫn xuất

- **Đoạn thẳng AB**: phần đường thẳng giới hạn bởi 2 điểm A, B.
- **Tia OA**: bắt đầu từ O, đi qua A, kéo dài vô hạn 1 phía.
- **Góc**: tạo bởi 2 tia chung gốc.

💡 **Trực giác / Hình dung**: hãy nghĩ tới 3 đối tượng nguyên thủy như "viên gạch lego" nhỏ nhất — không thể tháo nhỏ hơn được nữa. Một **điểm** giống dấu chấm bút nhọn vô hạn (chấm càng nhỏ càng đúng, lý tưởng là không có kích thước). **Đường thẳng** giống sợi chỉ căng kéo dài mãi 2 đầu, mỏng vô hạn. **Mặt phẳng** giống mặt bàn phẳng tuyệt đối, rộng vô hạn, mỏng tới mức không có chiều dày.

#### Hình minh họa — phân biệt đường / tia / đoạn

Ba đối tượng khác nhau ở **số đầu mút** (số đầu bị "chặn lại"). Mũi tên `◄`/`►` nghĩa là "kéo dài vô hạn về phía đó", còn chấm `●` là đầu mút (điểm dừng):

```
ĐƯỜNG THẲNG AB   (0 đầu mút — vô hạn cả 2 phía)
   ◄──────●───────────●──────►
          A           B

TIA OA           (1 đầu mút tại O — vô hạn 1 phía qua A)
          ●───────────────────►
          O           A

ĐOẠN THẲNG AB    (2 đầu mút — hữu hạn, đo được độ dài)
          ●───────────●
          A           B
        ├──── 5 cm ───┤
```

Cùng 2 điểm A, B nhưng cho **3 đối tượng khác nhau**: viết "đường thẳng AB", "tia AB", "đoạn AB" là nói 3 thứ khác nhau. Chỉ **đoạn** mới có "độ dài" (vd 5 cm); đường thẳng vô hạn nên không có độ dài.

#### Hình minh họa — góc tạo bởi 2 tia chung gốc

Góc là phần mặt phẳng "kẹp" giữa 2 tia chung một gốc (gọi là **đỉnh**, vertex). Hai tia là 2 **cạnh** (side) của góc:

```
        A
         ╲
          ╲          ← cạnh OA (tia OA)
           ╲
            ╲  ∠AOB
             ╲___________  → cạnh OB (tia OB)
            O            B
        ↑
      đỉnh O (gốc chung của 2 tia)
```

Ký hiệu: $\angle AOB$ (hoặc $\widehat{AOB}$), **đỉnh viết ở giữa**. Đo "độ mở" giữa 2 cạnh bằng độ ($^\circ$) — chi tiết ở mục 3.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Điểm 'không có kích thước' thì làm sao vẽ được?"* Cái ta vẽ trên giấy chỉ là **biểu diễn** của điểm lý tưởng. Trong toán, điểm là vị trí thuần túy — kích thước bằng 0. Vẽ to một chút chỉ để mắt thấy.
- *"Đoạn, tia, đường khác nhau ở đâu?"* Khác ở số đầu mút: **đoạn** có 2 đầu mút (hữu hạn), **tia** có 1 đầu mút và kéo dài 1 phía, **đường thẳng** không có đầu mút (vô hạn 2 phía). Vd đoạn AB dài 5 cm là đo được; tia thì "đo" được nửa, đường thẳng thì vô hạn.
- *"Qua 2 điểm vẽ được mấy đường thẳng?"* Đúng 1 (tiên đề 1). Qua 1 điểm thì vô số đường thẳng.

⚠ **Lỗi thường gặp**: lẫn lộn **đoạn thẳng AB** với **đường thẳng AB**. Đoạn AB có độ dài cụ thể (vd 5 cm), đường thẳng AB là vô hạn không có độ dài. Cũng hay nhầm tia OA và tia AO: tia OA gốc tại O đi qua A, tia AO gốc tại A đi qua O — hai tia ngược chiều, chỉ trùng phần chung là đoạn OA.

🔁 **Dừng lại tự kiểm tra**

1. Tia Ox và tia Oy chung gốc O nhưng đi 2 hướng ngược nhau hợp thành hình gì?
2. Có 3 điểm A, B, C không thẳng hàng. Vẽ được bao nhiêu đường thẳng đi qua đúng 2 trong 3 điểm đó?
3. Trên đường thẳng lấy 4 điểm A, B, C, D theo thứ tự. Có bao nhiêu **đoạn thẳng** khác nhau với 2 đầu mút là các điểm đó? Có bao nhiêu **tia** gốc tại A?

<details><summary>Đáp án</summary>

1. Hợp thành 1 **đường thẳng** (2 tia đối nhau ghép lại). Góc giữa chúng $= 180^\circ$ (góc bẹt).
2. 3 đường: AB, AC, BC. (Mỗi cặp 2 điểm cho 1 đường; có $C(3,2) = 3$ cặp.)
3. Đoạn thẳng: mỗi cặp 2 điểm cho 1 đoạn → $C(4,2) = 6$ đoạn (AB, AC, AD, BC, BD, CD). Tia gốc A đi theo chiều có B, C, D: chỉ **1 tia** (mọi điểm cùng phía, cùng nằm trên 1 tia).

</details>

### 📝 Tóm tắt mục 1

- 3 khái niệm **nguyên thủy** không định nghĩa: điểm (không kích thước), đường thẳng (vô hạn 2 phía), mặt phẳng (2D vô hạn).
- Lý do không định nghĩa: tránh vòng lặp vô hạn — phải chọn điểm xuất phát.
- Đối tượng dẫn xuất: đoạn (2 đầu mút), tia (1 đầu mút), góc (2 tia chung gốc).
- Qua 2 điểm có đúng 1 đường thẳng; qua 1 điểm có vô số.

---

## 2. Năm tiên đề Euclid

Euclid đã viết "Elements" (~300 TCN) — sách giáo khoa quan trọng nhất lịch sử Toán:

1. **Có thể vẽ 1 đường thẳng từ điểm A đến điểm B** (qua 2 điểm có 1 đường thẳng duy nhất).
2. **Có thể kéo dài 1 đoạn thẳng** thành đường thẳng (vô hạn cả 2 phía).
3. **Có thể vẽ 1 đường tròn** với tâm và bán kính tùy ý.
4. **Tất cả các góc vuông bằng nhau**.
5. **Tiên đề song song**: qua 1 điểm ngoài đường thẳng, có **đúng 1** đường thẳng song song với nó.

💡 **Tiên đề thứ 5** (song song) đặc biệt — nhiều người cố chứng minh từ 4 tiên đề khác trong 2000 năm. Cuối cùng vào thế kỷ 19, người ta nhận ra: nếu bỏ tiên đề 5, được **hình học phi Euclid** (như hình học cầu, hyperbolic) — nền tảng của thuyết tương đối tổng quát Einstein.

💡 **Trực giác / Hình dung — tiên đề là gì**: tiên đề giống "luật chơi" được công nhận không cần chứng minh — như luật "vua đi 1 ô" trong cờ. Mọi định lý hình học sau này đều suy ra từ 5 luật này. Tiên đề 1-4 nghe "hiển nhiên" (vẽ được đường, kéo dài được, vẽ được tròn...), riêng tiên đề 5 nghe phức tạp hơn nhiều — chính sự "không hiển nhiên" này khiến 2000 năm người ta nghi ngờ nó.

#### Hình minh họa — tiên đề 5 (song song)

Cho đường thẳng $d$ và một điểm $P$ **nằm ngoài** $d$. Tiên đề 5 nói: kẻ qua $P$ có **đúng MỘT** đường $d'$ song song với $d$ — không nhiều hơn, không ít hơn:

```
        ● P
   ─────────────────  d'   ← ĐÚNG 1 đường qua P, song song d
   ─────────────────  d
```

Mọi đường khác qua $P$ (kẻ nghiêng đi) **đều sẽ cắt** $d$ ở đâu đó nếu kéo dài đủ xa:

```
        ● P
        ╱ ╲
   ────╱───╲──────────  d
      ╱     ╲
     × cắt   × cắt    ← các đường nghiêng đều cắt d
```

#### Hình minh họa — vì sao bỏ tiên đề 5 sinh ra hình học khác

Đổi tiên đề 5 cho "số đường song song qua $P$" thành 0 hoặc vô số → ra 2 thế giới hình học khác hẳn. So sánh tổng 3 góc một tam giác:

```
 EUCLID (phẳng)       CẦU (Riemann)        HYPERBOLIC (Lobachevsky)
   qua P: 1 ss          qua P: 0 ss           qua P: vô số ss

      /\                  ___                    /\
     /  \               ╱     ╲                 /  \
    /    \             ╱  phình ╲              /(lõm)\
   /______\           ╲___________╱           /________\

  tổng = 180°          tổng > 180°            tổng < 180°
  (tam giác phẳng)     (phình ra ngoài)       (lõm vào trong)
```

Ví dụ số trên mặt cầu: tam giác có 3 đỉnh là Bắc Cực + 2 điểm trên xích đạo cách nhau $90^\circ$ kinh độ → cả 3 góc đều $90^\circ$, tổng $= 270^\circ > 180^\circ$. Không "sai" — chỉ là thế giới hình học khác (xem callout ❓ bên dưới).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao không chứng minh tiên đề mà phải 'công nhận'?"* Vì mọi chứng minh phải dựa trên cái có trước. Nếu chứng minh mọi thứ thì sẽ lùi vô hạn. Tiên đề là điểm dừng — cái ta đồng ý là đúng để bắt đầu.
- *"Bỏ tiên đề 5 thì hình học còn đúng không?"* Vẫn đúng, nhưng là **hình học khác**. Trên mặt cầu (như Trái Đất), qua 1 điểm ngoài 1 "đường thẳng" (vòng tròn lớn) **không có** đường song song nào — mọi vòng tròn lớn đều cắt nhau. Tổng 3 góc tam giác trên cầu **$> 180^\circ$**.
- *"Phi Euclid có ích thật không hay chỉ lý thuyết?"* Có ích thật: GPS phải tính theo hình học cong (thuyết tương đối) mới chính xác; bản đồ Trái Đất (mặt cầu) cũng vậy.

⚠ **Lỗi thường gặp**: tưởng "qua 1 điểm ngoài đường thẳng vẽ được nhiều đường song song". Trong hình học Euclid phẳng chỉ có **đúng 1**. (Vẽ "nhiều đường gần như song song" là sai — chúng sẽ cắt đường gốc ở đâu đó nếu không thực sự cùng hệ số góc.)

🔁 **Dừng lại tự kiểm tra**

1. Tiên đề nào của Euclid đảm bảo "vẽ được đường tròn tâm bất kỳ, bán kính bất kỳ"?
2. Trên mặt cầu, tổng 3 góc của một tam giác lớn hơn hay nhỏ hơn $180^\circ$?
3. Trong hình học hyperbolic (Lobachevsky), qua 1 điểm ngoài đường thẳng có bao nhiêu đường song song? Tổng 3 góc tam giác so với $180^\circ$?

<details><summary>Đáp án</summary>

1. Tiên đề 3.
2. **Lớn hơn** $180^\circ$ (hình học cầu — phi Euclid). Vd tam giác có 3 đỉnh tạo bởi 3 góc vuông trên cầu có tổng $= 270^\circ$.
3. **Vô số** đường song song; tổng 3 góc tam giác **nhỏ hơn** $180^\circ$ (ngược với cầu). 3 trường hợp: Euclid (1 ss, tổng $=180^\circ$), cầu (0 ss, $>180^\circ$), hyperbolic (vô số ss, $<180^\circ$).

</details>

### 📝 Tóm tắt mục 2

- 5 tiên đề Euclid là nền tảng không cần chứng minh của toàn bộ hình học phẳng.
- Tiên đề 5 (song song): qua 1 điểm ngoài đường thẳng có đúng 1 đường song song.
- Bỏ/đổi tiên đề 5 → hình học phi Euclid (cầu: tổng góc tam giác $> 180^\circ$; hyperbolic: $< 180^\circ$).
- Phi Euclid không phải "sai" — là nền cho thuyết tương đối, GPS, bản đồ Trái Đất.

---

## 3. Góc

💡 **Trực giác / Hình dung**: góc đo "độ mở" giữa 2 tia chung gốc — như độ mở của 2 cánh kéo hay 2 kim đồng hồ. Mở càng rộng → góc càng lớn. Đơn vị độ chia 1 vòng tròn đầy thành 360 phần bằng nhau ($1^\circ = \frac{1}{360}$ vòng). Kim phút quay từ 12 tới 3 quét đúng $90^\circ$ ($\frac{1}{4}$ vòng).

### 3.0. Đo góc — đơn vị độ

💡 **Là gì + vì sao tồn tại + ví dụ số**: **số đo góc** (angle measure) là một con số nói "2 tia mở rộng bao nhiêu". Vì sao cần? Vì nói "góc to" / "góc nhỏ" thì mơ hồ — cần một thang đo chung để 2 người ở 2 nơi nói cùng một góc. Quy ước: chia một vòng tròn đầy thành **360 phần bằng nhau**, mỗi phần là $1^\circ$ (một độ). Vậy $1^\circ = \tfrac{1}{360}$ vòng.

Ví dụ số cụ thể (đối chiếu phân số vòng tròn):

| Phần của vòng | Số đo | Ví dụ đời sống |
|---|---|---|
| $\tfrac{1}{4}$ vòng | $\tfrac{360}{4} = 90^\circ$ | kim đồng hồ từ 12 → 3 |
| $\tfrac{1}{2}$ vòng | $\tfrac{360}{2} = 180^\circ$ | quay ngược lại 180° |
| $\tfrac{1}{3}$ vòng | $\tfrac{360}{3} = 120^\circ$ | 3 cánh quạt cách đều |
| $\tfrac{1}{6}$ vòng | $\tfrac{360}{6} = 60^\circ$ | góc tam giác đều |

(Vì sao 360 mà không phải 100? Lý do lịch sử Babylon — 360 chia hết cho rất nhiều số: 2,3,4,5,6,8,9,10,12... nên góc "đẹp" thường ra số nguyên.)

#### Cộng và trừ góc

💡 **Trực giác**: số đo góc **cộng được** như độ dài. Nếu tia OB nằm **trong** góc $\angle AOC$ (giữa 2 cạnh), nó chia $\angle AOC$ thành 2 phần kề nhau và:
$$\angle AOC = \angle AOB + \angle BOC \quad(\text{tính cộng góc}).$$

```
        A
         ╲
          ╲ ∠AOB
           ╲      B
            ╲    ╱
             ╲  ╱  ∠BOC
              ╲╱_________ C
              O
   ∠AOC = ∠AOB + ∠BOC   (B nằm trong góc AOC)
```

Ví dụ số: $\angle AOB = 30^\circ$, $\angle BOC = 25^\circ$ → $\angle AOC = 55^\circ$. Ngược lại, biết $\angle AOC = 90^\circ$ và $\angle AOB = 35^\circ$ thì $\angle BOC = 90 - 35 = 55^\circ$ (dùng ở Bài 8). **Tia phân giác** là tia chia góc thành 2 nửa bằng nhau: nếu OB là phân giác của $\angle AOC = 80^\circ$ thì $\angle AOB = \angle BOC = 40^\circ$.

### 3.1. Phân loại

| Tên | Số đo |
|------|-------|
| Nhọn | $0^\circ < x < 90^\circ$ |
| Vuông | $x = 90^\circ$ |
| Tù | $90^\circ < x < 180^\circ$ |
| Bẹt | $x = 180^\circ$ |
| Phản | $180^\circ < x < 360^\circ$ |
| Đầy | $x = 360^\circ$ |

#### Hình minh họa — 4 loại góc chính

Hình dung cạnh thứ nhất nằm ngang, cạnh thứ hai mở dần lên:

```
 NHỌN (<90°)        VUÔNG (=90°)       TÙ (90°–180°)       BẸT (=180°)
      ╱                  │                ╲                 
     ╱                   │                 ╲                
    ╱                    │                  ╲               
   ●──────              ●──┘──────         ●────────       ●──────────────●
   (hẹp, < góc            (góc "vuông       (mở rộng hơn     (2 tia thẳng hàng,
    vuông)                vức", ô vuông)     góc vuông)       thành đường thẳng)
```

Mốc nhận biết nhanh: so với **góc vuông** $90^\circ$ (góc của tờ giấy, góc tường) — hẹp hơn là nhọn, rộng hơn (mà chưa thẳng) là tù, thẳng băng là bẹt.

### 3.2. Quan hệ góc

- **Hai góc bù nhau** (supplementary): tổng $= 180^\circ$.
- **Hai góc phụ nhau** (complementary): tổng $= 90^\circ$.
- **Hai góc đối đỉnh** (vertical angles): bằng nhau.

#### Hình minh họa — góc bù, góc phụ

```
GÓC PHỤ (tổng 90°)              GÓC BÙ (tổng 180°)
   ╲                              
    ╲   β                          ╲   β
     ╲ ╱                            ╲ ╱
  ────●──── (góc vuông)        ─────●───── (đường thẳng / góc bẹt)
   α  │                         α
      │                        
  α + β = 90°                   α + β = 180°
  (ghép lại = góc vuông)        (ghép lại = nửa vòng tròn)
```

#### Hình minh họa — góc đối đỉnh & kề bù

2 đường thẳng cắt nhau tại O tạo **4 góc**. Đánh số 1, 2, 3, 4 đi vòng:

```
            ╲   1   ╱
             ╲     ╱
          4   ╲   ╱   2
        ───────●───────
              ╱ O ╲
             ╱     ╲
            ╱   3   ╲

  • Đối đỉnh (bằng nhau):  ∠1 = ∠3,  ∠2 = ∠4
  • Kề bù (tổng 180°):     ∠1 + ∠2 = 180°,  ∠2 + ∠3 = 180° ...
```

**Vì sao đối đỉnh bằng nhau?** Chứng minh từng bước (không dùng "dễ thấy"):
$$\begin{aligned}
\angle 1 + \angle 2 &= 180^\circ &&\text{(kề bù — ghép thành đường thẳng phía trên)}\\
\angle 2 + \angle 3 &= 180^\circ &&\text{(kề bù — ghép thành đường thẳng bên phải)}\\
\Rightarrow \angle 1 + \angle 2 &= \angle 2 + \angle 3 &&\text{(cùng bằng }180^\circ)\\
\Rightarrow \angle 1 &= \angle 3 &&\text{(trừ }\angle 2\text{ hai vế)}
\end{aligned}$$
Verify số: nếu $\angle 1 = 65^\circ$ thì $\angle 2 = 180 - 65 = 115^\circ$, $\angle 3 = 180 - 115 = 65^\circ = \angle 1$ ✓.

### 3.3. Khi 2 đường thẳng song song bị cắt bởi 1 đường thẳng

Một đường **cát tuyến** (transversal) cắt 2 đường song song $a \parallel b$ tạo ra **8 góc**, đặt tên 1–8:

```
                    ╱  cát tuyến c
                   ╱
            1 ╱ 2 ╱
        ──────●──────────  a   ∥
          4 ╱ 3 ╱            
           ╱   ╱
      5 ╱ 6  ╱
   ──────●──────────────  b   ∥
     8 ╱ 7 ╱
       ╱  ╱

  • Đồng vị (cùng vị trí góc): ∠1=∠5, ∠2=∠6, ∠4=∠8, ∠3=∠7  → BẰNG NHAU
  • So le trong (2 phía cát tuyến, giữa a&b): ∠3=∠5, ∠4=∠6   → BẰNG NHAU
  • Trong cùng phía (1 phía, giữa a&b):       ∠3+∠6=180°, ∠4+∠5=180° → BÙ NHAU
```

- **Cặp góc đồng vị** (corresponding): bằng nhau.
- **Cặp góc so le trong** (alternate interior): bằng nhau.
- **Cặp góc trong cùng phía** (co-interior / same-side interior): bù nhau (tổng $180^\circ$).

⚠ **Điều kiện sống còn**: các quy luật trên **chỉ đúng khi 2 đường THỰC SỰ song song** ($a \parallel b$). Nếu $a$ và $b$ không song song, các góc so le / đồng vị **không bằng nhau**. Đừng giả định song song khi đề bài chưa cho dấu $\parallel$ hay điều kiện tương đương (xem ⚠ Lỗi 2 bên dưới).

**4 ví dụ số đa dạng** (phân loại + quan hệ):
- Góc $35^\circ$: nhọn ($0 < 35 < 90$). Góc bù $= 145^\circ$, góc phụ $= 55^\circ$.
- Góc $90^\circ$: vuông. Góc bù $= 90^\circ$ (bù với chính loại), không có góc phụ dương ($90 - 90 = 0$).
- Góc $120^\circ$: tù ($90 < 120 < 180$). Góc bù $= 60^\circ$, không có góc phụ (vì $> 90^\circ$).
- Góc $250^\circ$: phản ($180 < 250 < 360$). Không có góc bù/phụ trong $[0,180]$.

**Thêm 4 ví dụ số (góc đối đỉnh & góc song song):**
- 2 đường cắt nhau, 1 góc $= 72^\circ$ → góc đối đỉnh $= 72^\circ$; 2 góc kề bù $= 180 - 72 = 108^\circ$.
- $a \parallel b$, cát tuyến tạo góc đồng vị $= 110^\circ$ → góc đồng vị tương ứng $= 110^\circ$ (bằng nhau).
- $a \parallel b$, so le trong $= 48^\circ$ → so le trong kia $= 48^\circ$; nhưng **trong cùng phía** với nó $= 180 - 48 = 132^\circ$.
- $a \parallel b$, trong cùng phía $= 95^\circ$ → trong cùng phía còn lại $= 180 - 95 = 85^\circ$ (bù nhau).

#### Walk-through — 3 bài tính góc từng bước

**Bài A — chuỗi đối đỉnh + kề bù.** Hai đường cắt nhau tạo 4 góc $\angle 1, \angle 2, \angle 3, \angle 4$ (vòng quanh), cho $\angle 1 = 53^\circ$. Tìm cả 4.
$$\begin{aligned}
\angle 3 &= \angle 1 = 53^\circ &&\text{(đối đỉnh với }\angle 1)\\
\angle 2 &= 180^\circ - \angle 1 = 180 - 53 = 127^\circ &&\text{(kề bù với }\angle 1)\\
\angle 4 &= \angle 2 = 127^\circ &&\text{(đối đỉnh với }\angle 2)
\end{aligned}$$
→ $\angle 1 = \angle 3 = 53^\circ$, $\angle 2 = \angle 4 = 127^\circ$. Kiểm tra tổng 4 góc: $53+127+53+127 = 360^\circ$ ✓ (đúng 1 vòng).

**Bài B — góc song song nhiều bước.** $a \parallel b$, cát tuyến $c$. Một góc so le trong $= 3x + 10$, góc so le trong còn lại $= 5x - 30$. Tìm $x$ và số đo góc.
$$\begin{aligned}
3x + 10 &= 5x - 30 &&\text{(so le trong thì bằng nhau, vì }a\parallel b)\\
40 &= 2x &&\text{(chuyển vế: }+30\text{ và }-3x)\\
x &= 20
\end{aligned}$$
Thay lại: $3(20)+10 = 70^\circ$; góc kia $5(20)-30 = 70^\circ$ ✓ (khớp — bằng nhau như kỳ vọng).

**Bài C — trộn phụ và bù.** Góc $\alpha$ có góc phụ là $2\alpha - 30^\circ$. Tìm $\alpha$, rồi tìm góc bù của $\alpha$.
$$\begin{aligned}
\alpha + (2\alpha - 30^\circ) &= 90^\circ &&\text{(phụ nhau → tổng }90^\circ)\\
3\alpha - 30 &= 90\\
3\alpha &= 120 \Rightarrow \alpha = 40^\circ
\end{aligned}$$
Kiểm tra góc phụ: $2(40)-30 = 50^\circ$, và $40 + 50 = 90^\circ$ ✓. Góc **bù** của $\alpha$: $180 - 40 = 140^\circ$ (chú ý: bù dùng $180^\circ$, khác phụ).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Bù và phụ dễ nhầm — mẹo nào nhớ?"* "**Phụ** = **P**hần nhỏ → $90^\circ$"; "**Bù** = đầy nửa vòng → $180^\circ$". Hoặc: bù lớn hơn (chữ "bù" có dấu huyền nặng hơn → số lớn hơn).
- *"Góc tù có góc phụ không?"* Không. Góc phụ cần tổng $= 90^\circ$, mà góc tù đã $> 90^\circ$ → "góc phụ" sẽ âm, không tồn tại.
- *"Đối đỉnh khác kề bù chỗ nào?"* 2 đường cắt nhau tạo 4 góc: 2 cặp **đối đỉnh** (bằng nhau, không chung cạnh), còn mỗi góc với góc **kề** nó tạo cặp **kề bù** (tổng $180^\circ$, chung 1 cạnh).

⚠ **Lỗi 1 — nhầm "so le trong" với "trong cùng phía".** So le trong (nằm 2 phía của đường cắt) thì **bằng nhau**; trong cùng phía (cùng 1 phía của đường cắt) thì **bù nhau** (tổng $180^\circ$). Phản ví dụ: nếu so le trong là $70^\circ$ thì so le trong còn lại cũng $70^\circ$ (không phải $110^\circ$); nhưng trong cùng phía của góc $70^\circ$ là $110^\circ$.

⚠ **Lỗi 2 — nhầm góc bù ($180^\circ$) với góc phụ ($90^\circ$).** Đây là lỗi số một khi giải bài tính góc. "Phụ" dùng $90^\circ$, "bù" dùng $180^\circ$ — dùng nhầm thang là sai toàn bài. Phản ví dụ cụ thể: góc $\beta = 60^\circ$. Người làm sai lấy "góc bù $= 90 - 60 = 30^\circ$" — **sai**, đó là góc phụ. Đúng phải là: góc **phụ** $= 90 - 60 = 30^\circ$, góc **bù** $= 180 - 60 = 120^\circ$. Mẹo: "**phụ** = **P**hần nhỏ ($90^\circ$)", "**bù** = đầy nửa vòng ($180^\circ$)".

⚠ **Lỗi 3 — giả định 2 đường song song khi đề bài chưa cho dấu.** Các quy luật "so le trong bằng nhau", "đồng vị bằng nhau" **chỉ đúng khi $a \parallel b$**. Phản ví dụ: nếu $a$ và $b$ không song song mà ta vẫn viết "so le trong $= 70^\circ$ nên góc kia $= 70^\circ$" → kết quả **sai**, vì khi không song song hai góc đó khác nhau. Chỉ áp dụng quy luật khi đề cho rõ dấu $\parallel$, hoặc cho điều kiện đủ để suy ra song song (vd "2 đường cùng vuông góc với $c$"). Đừng nhìn hình vẽ "trông có vẻ song song" rồi kết luận — hình minh họa có thể lệch.

🔁 **Dừng lại tự kiểm tra**

1. Góc $63^\circ$ có góc bù và góc phụ là bao nhiêu?
2. $a \parallel b$ bị cắt bởi c. Một góc trong cùng phía bằng $130^\circ$. Góc trong cùng phía còn lại bằng bao nhiêu?
3. Hai đường cắt nhau, một góc $= 4x$ và góc kề bù của nó $= 5x + 9$. Tìm $x$ và 4 góc.
4. $a \parallel b$, cát tuyến tạo một góc đồng vị $= 2y + 15$ và góc đồng vị tương ứng $= 3y - 5$. Tìm $y$.

<details><summary>Đáp án</summary>

1. Bù $= 180 - 63 =$ **$117^\circ$**; phụ $= 90 - 63 =$ **$27^\circ$**.
2. Trong cùng phía bù nhau → $180 - 130 =$ **$50^\circ$**.
3. Kề bù → $4x + (5x+9) = 180 \Rightarrow 9x = 171 \Rightarrow x = 19$. Góc $= 4(19) = 76^\circ$; kề bù $= 5(19)+9 = 104^\circ$. Kiểm tra $76 + 104 = 180$ ✓. Bốn góc: **$76^\circ, 104^\circ, 76^\circ, 104^\circ$** (đối đỉnh từng cặp).
4. Đồng vị bằng nhau → $2y + 15 = 3y - 5 \Rightarrow y = 20$. (Góc $= 2(20)+15 = 55^\circ$.)

</details>

### 📝 Tóm tắt mục 3

- Phân loại theo số đo: nhọn ($<90$), vuông ($=90$), tù ($90$–$180$), bẹt ($=180$), phản ($180$–$360$), đầy ($=360$).
- **Bù** = tổng $180^\circ$; **phụ** = tổng $90^\circ$; **đối đỉnh** = bằng nhau.
- 2 đường song song bị cắt: đồng vị & so le trong **bằng nhau**, trong cùng phía **bù nhau**.

---

## 4. Đường vuông góc và song song

- **Vuông góc** ($\perp$): 2 đường tạo với nhau góc $90^\circ$.
- **Song song** ($\parallel$): 2 đường không cắt nhau (kéo dài vô hạn).

**Quy luật quan trọng**:
- Qua 1 điểm có duy nhất 1 đường vuông góc với đường thẳng cho trước.
- 2 đường cùng vuông góc với đường thứ 3 thì song song với nhau.
- 2 đường cùng song song với đường thứ 3 thì song song với nhau (tính bắc cầu).

💡 **Trực giác / Hình dung**: hai đường **song song** giống 2 thanh ray đường tàu — luôn cách nhau cố định, không bao giờ gặp dù kéo dài bao xa. Hai đường **vuông góc** giống góc tường gặp sàn — tạo góc "vuông vức" $90^\circ$, là góc "ngay ngắn" nhất.

#### Hình minh họa — vuông góc và song song

```
VUÔNG GÓC (a ⊥ b)              SONG SONG (a ∥ b)
            │ a
            │                   ────────────────  a
            │                   
   ─────────┼─────── b          ────────────────  b
          90°│ (ô vuông          (luôn cách đều,
            │  đánh dấu)          không bao giờ cắt)
            │
```

#### Hình minh họa — 2 đường cùng vuông góc với đường thứ 3 thì song song

```
   │ a            │ b
   │ ⊥            │ ⊥
   ●──────────────●──────────  c
  90°            90°

  a ⊥ c  và  b ⊥ c  ⟹  a ∥ b
  (hai cây cột cùng dựng thẳng đứng trên mặt đất → song song nhau)
```

#### Hình minh họa — tính bắc cầu của song song

```
   ─────────────────  a
                          a ∥ b
   ─────────────────  b
                          b ∥ c   ⟹   a ∥ c
   ─────────────────  c
```

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao 2 đường cùng vuông góc với đường thứ 3 lại song song?"* Vì cả hai đều tạo góc $90^\circ$ với đường thứ 3 → các góc đồng vị bằng nhau (đều $90^\circ$) → theo dấu hiệu nhận biết, 2 đường song song. Hình dung: 2 cây cột cùng dựng thẳng đứng (vuông góc với mặt đất) thì song song nhau.
- *"Song song có 'bắc cầu' như dấu bằng không?"* Có: $a \parallel b$ và $b \parallel c$ → $a \parallel c$. Đây là tính chất bắc cầu (transitivity), giống $a = b$ và $b = c$ → $a = c$.
- *"Trong không gian 3D quy luật này còn đúng?"* Không hoàn toàn — 2 đường cùng vuông góc với 1 đường trong 3D có thể **chéo nhau** chứ không song song. Quy luật này chỉ chắc chắn trong mặt phẳng (sẽ rõ ở Lesson 07).

⚠ **Lỗi thường gặp**: tưởng "2 đường không cắt nhau thì song song". Đúng trong mặt phẳng, nhưng **sai trong không gian** — 2 đường chéo nhau (skew) cũng không cắt nhau mà không song song. Trong mặt phẳng phẳng thì phát biểu này mới đúng.

🔁 **Dừng lại tự kiểm tra**

1. Đường a vuông góc với c, đường b cũng vuông góc với c (cùng trong 1 mặt phẳng). Quan hệ giữa a và b?
2. Ký hiệu $\perp$ và $\parallel$ lần lượt nghĩa là gì?

<details><summary>Đáp án</summary>

1. $a \parallel b$ (song song) — hai đường cùng vuông góc với đường thứ 3 trong mặt phẳng thì song song.
2. $\perp$ = vuông góc (góc $90^\circ$); $\parallel$ = song song (không cắt nhau).

</details>

### 📝 Tóm tắt mục 4

- $\perp$ (vuông góc): 2 đường tạo góc $90^\circ$. $\parallel$ (song song): không cắt nhau (trong mặt phẳng).
- Qua 1 điểm có **đúng 1** đường vuông góc với đường cho trước.
- 2 đường cùng $\perp$ đường thứ 3 → $\parallel$ nhau; $\parallel$ có tính bắc cầu.
- Quy luật "không cắt → song song" chỉ chắc trong mặt phẳng (3D có đường chéo nhau).

---

## 5. Bài tập

### Bài tập

**Bài 1**: Tính góc bù với $47^\circ$.

**Bài 2**: Hai góc phụ nhau, một góc bằng $30^\circ$. Tìm góc kia.

**Bài 3**: 2 đường thẳng cắt nhau tạo 4 góc, một góc bằng $65^\circ$. Tính 3 góc còn lại.

**Bài 4**: $a \parallel b$. Đường c cắt a, b. Một góc tạo bởi c và a $= 40^\circ$. Tìm góc tương ứng tạo bởi c và b ở vị trí so le trong.

**Bài 5**: Vì sao tiên đề 5 của Euclid lại đặc biệt?

**Bài 6**: Một góc có số đo bằng **gấp đôi** góc phụ của nó. Tìm góc đó.

**Bài 7**: $a \parallel b$ bị cắt bởi cát tuyến c. Góc so le trong thứ nhất $= 2x + 25$, góc trong cùng phía với nó $= 4x - 5$. Tìm $x$ và 2 góc.

**Bài 8**: Cho hình: tia OB nằm giữa 2 tia OA, OC. Biết $\angle AOB = 35^\circ$ và $\angle AOC = 90^\circ$. Tính $\angle BOC$. Hai góc $\angle AOB$, $\angle BOC$ có quan hệ gì?

**Bài 9**: Phân loại các góc sau (nhọn/vuông/tù/bẹt/phản): $15^\circ$, $90^\circ$, $134^\circ$, $180^\circ$, $300^\circ$. Với mỗi góc nhọn/tù, tính thêm góc bù.

### Lời giải

**Bài 1**: $180 - 47 =$ **$133^\circ$**.

**Bài 2**: $90 - 30 =$ **$60^\circ$**.

**Bài 3**: Góc đối đỉnh $= 65^\circ$. 2 góc còn lại (kề bù với $65^\circ$) $= 180 - 65 = 115^\circ$. → **$65^\circ, 115^\circ, 65^\circ, 115^\circ$**.

**Bài 4**: Góc so le trong = **$40^\circ$**.

**Bài 5**: Vì tiên đề 5 mạnh hơn 4 tiên đề trước (không thể chứng minh từ chúng). Bỏ tiên đề 5 → hình học phi Euclid (Lobachevsky, Riemann) — tổng 3 góc tam giác không bằng $180^\circ$ nữa. Einstein dùng hình học Riemann cho thuyết tương đối tổng quát.

**Bài 6**: Gọi góc cần tìm là $\alpha$, góc phụ của nó là $90 - \alpha$. Điều kiện "gấp đôi góc phụ":
$$\begin{aligned}
\alpha &= 2(90 - \alpha) &&\text{(dịch đề: gấp đôi góc phụ)}\\
\alpha &= 180 - 2\alpha\\
3\alpha &= 180 \Rightarrow \alpha = 60^\circ
\end{aligned}$$
Kiểm tra: góc phụ $= 90 - 60 = 30^\circ$, và $60 = 2 \times 30$ ✓. → **$\alpha = 60^\circ$**.

**Bài 7**: Gọi so le trong thứ nhất là $\angle_1 = 2x+25$. Góc **trong cùng phía** với nó **bù nhau** (vì $a\parallel b$), nên:
$$\begin{aligned}
(2x + 25) + (4x - 5) &= 180 &&\text{(trong cùng phía → tổng }180^\circ)\\
6x + 20 &= 180\\
6x &= 160 \Rightarrow x = \tfrac{80}{3} \approx 26.67
\end{aligned}$$
Số đo: $\angle_1 = 2(\tfrac{80}{3})+25 = \tfrac{160}{3}+25 = \tfrac{235}{3} \approx 78.33^\circ$; góc trong cùng phía $= 180 - \tfrac{235}{3} = \tfrac{305}{3} \approx 101.67^\circ$. Kiểm tra tổng $\approx 78.33 + 101.67 = 180^\circ$ ✓. (Lưu ý: ở đây dùng quan hệ **bù** vì là cặp *trong cùng phía*, không phải *so le* — chọn nhầm thang là sai.)

**Bài 8**: Tia OB nằm giữa OA và OC nên $\angle AOB + \angle BOC = \angle AOC$ (cộng góc):
$$\angle BOC = \angle AOC - \angle AOB = 90^\circ - 35^\circ = 55^\circ.$$
Vì $\angle AOB + \angle BOC = 90^\circ$ → hai góc này **phụ nhau**. → **$\angle BOC = 55^\circ$**, quan hệ **phụ nhau**.

**Bài 9**:
- $15^\circ$: **nhọn** ($0<15<90$). Góc bù $= 180 - 15 = 165^\circ$.
- $90^\circ$: **vuông**.
- $134^\circ$: **tù** ($90<134<180$). Góc bù $= 180 - 134 = 46^\circ$.
- $180^\circ$: **bẹt**.
- $300^\circ$: **phản** ($180<300<360$).

---

## 6. Bài tiếp theo

[Lesson 02 — Tam giác](../lesson-02-triangles/).

## 📝 Tổng kết

1. **3 đối tượng nguyên thủy**: điểm, đường, mặt. Dẫn xuất: đoạn (2 đầu mút), tia (1 đầu mút), đường (0 đầu mút).
2. **5 tiên đề Euclid**. Tiên đề 5 (song song) → hình học phi Euclid khi bỏ: cầu (0 ss, tổng góc $>180^\circ$), hyperbolic (vô số ss, $<180^\circ$).
3. **Đo góc**: $1^\circ = \tfrac{1}{360}$ vòng. **Góc**: nhọn, vuông, tù, bẹt, phản, đầy.
4. **Bù** ($180^\circ$), **phụ** ($90^\circ$), **đối đỉnh** (=). Mẹo: phụ = Phần nhỏ $90^\circ$, bù = $180^\circ$.
5. **Đường song song bị cắt**: đồng vị/so le = nhau, trong cùng phía bù nhau — chỉ đúng khi thực sự $\parallel$.
