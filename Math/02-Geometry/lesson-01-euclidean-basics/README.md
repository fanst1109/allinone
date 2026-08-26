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

Ba đối tượng khác nhau ở **số đầu mút** (số đầu bị "chặn lại"). Mũi tên nghĩa là "kéo dài vô hạn về phía đó", còn chấm tròn là đầu mút (điểm dừng):

<svg viewBox="0 0 560 262" style="max-width:560px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Phân biệt ba đối tượng: đường thẳng AB vô hạn hai phía có mũi tên hai đầu, tia OA có một đầu mút tại O và mũi tên một phía, đoạn thẳng AB có hai đầu mút và độ dài 5 cm">
  <defs>
    <marker id="g1-ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#1d4ed8"/>
    </marker>
  </defs>
  <text x="30" y="30" font-size="12.5" font-weight="700" fill="#1a202c">ĐƯỜNG THẲNG AB — 0 đầu mút, vô hạn cả 2 phía</text>
  <line x1="42" y1="58" x2="518" y2="58" stroke="#1d4ed8" stroke-width="2" marker-start="url(#g1-ar)" marker-end="url(#g1-ar)"/>
  <circle cx="200" cy="58" r="4.5" fill="#1a202c"/>
  <circle cx="360" cy="58" r="4.5" fill="#1a202c"/>
  <text x="200" y="80" font-size="12" font-weight="700" fill="#1a202c" text-anchor="middle">A</text>
  <text x="360" y="80" font-size="12" font-weight="700" fill="#1a202c" text-anchor="middle">B</text>
  <text x="30" y="112" font-size="12.5" font-weight="700" fill="#1a202c">TIA OA — 1 đầu mút tại O, vô hạn 1 phía qua A</text>
  <line x1="200" y1="140" x2="518" y2="140" stroke="#1d4ed8" stroke-width="2" marker-end="url(#g1-ar)"/>
  <circle cx="200" cy="140" r="5" fill="#dc2626"/>
  <circle cx="360" cy="140" r="4.5" fill="#1a202c"/>
  <text x="200" y="162" font-size="12" font-weight="700" fill="#dc2626" text-anchor="middle">O (đầu mút)</text>
  <text x="360" y="162" font-size="12" font-weight="700" fill="#1a202c" text-anchor="middle">A</text>
  <text x="30" y="194" font-size="12.5" font-weight="700" fill="#1a202c">ĐOẠN THẲNG AB — 2 đầu mút, hữu hạn nên đo được độ dài</text>
  <line x1="200" y1="222" x2="360" y2="222" stroke="#1d4ed8" stroke-width="2"/>
  <circle cx="200" cy="222" r="5" fill="#dc2626"/>
  <circle cx="360" cy="222" r="5" fill="#dc2626"/>
  <text x="188" y="226" font-size="12" font-weight="700" fill="#1a202c" text-anchor="end">A</text>
  <text x="372" y="226" font-size="12" font-weight="700" fill="#1a202c">B</text>
  <g stroke="#15803d" stroke-width="1.4">
    <line x1="200" y1="238" x2="360" y2="238"/>
    <line x1="200" y1="232" x2="200" y2="244"/>
    <line x1="360" y1="232" x2="360" y2="244"/>
  </g>
  <text x="280" y="256" font-size="11.5" font-weight="700" fill="#15803d" text-anchor="middle">5 cm</text>
</svg>

Cùng 2 điểm A, B nhưng cho **3 đối tượng khác nhau**: viết "đường thẳng AB", "tia AB", "đoạn AB" là nói 3 thứ khác nhau. Chỉ **đoạn** mới có "độ dài" (vd 5 cm); đường thẳng vô hạn nên không có độ dài.

#### Hình minh họa — góc tạo bởi 2 tia chung gốc

Góc là phần mặt phẳng "kẹp" giữa 2 tia chung một gốc (gọi là **đỉnh**, vertex). Hai tia là 2 **cạnh** (side) của góc:

<svg viewBox="0 0 480 232" style="max-width:480px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Góc AOB tạo bởi hai tia OA và OB chung gốc O: tia OB nằm ngang, tia OA chếch lên, cung góc đánh dấu độ mở giữa hai cạnh tại đỉnh O">
  <line x1="150" y1="180" x2="400" y2="180" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="150" y1="180" x2="75" y2="50" stroke="#1d4ed8" stroke-width="2"/>
  <path d="M190,180 A40,40 0 0 0 130,145.4" fill="none" stroke="#dc2626" stroke-width="1.8"/>
  <text x="185" y="130" font-size="12.5" font-weight="700" fill="#dc2626">∠AOB</text>
  <circle cx="150" cy="180" r="4.5" fill="#1a202c"/>
  <circle cx="75" cy="50" r="4.5" fill="#1a202c"/>
  <circle cx="400" cy="180" r="4.5" fill="#1a202c"/>
  <text x="62" y="42" font-size="13" font-weight="700" fill="#1a202c">A</text>
  <text x="412" y="185" font-size="13" font-weight="700" fill="#1a202c">B</text>
  <text x="138" y="202" font-size="13" font-weight="700" fill="#1a202c">O</text>
  <text x="128" y="108" font-size="11.5" fill="#475569">← cạnh OA (tia OA)</text>
  <text x="275" y="168" font-size="11.5" fill="#475569" text-anchor="middle">cạnh OB (tia OB)</text>
  <text x="240" y="222" font-size="11.5" fill="#475569" text-anchor="middle">đỉnh O — gốc chung của 2 tia (đỉnh viết ở giữa: ∠AOB)</text>
</svg>

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

<svg viewBox="0 0 520 168" style="max-width:520px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Tiên đề 5: điểm P nằm ngoài đường thẳng d, qua P kẻ được đúng một đường d phẩy song song với d, hai đường có ký hiệu mũi tên song song">
  <text x="255" y="26" font-size="12" font-weight="700" fill="#475569" text-anchor="middle">đúng MỘT đường qua P song song với d</text>
  <line x1="30" y1="70" x2="470" y2="70" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="30" y1="130" x2="470" y2="130" stroke="#1a202c" stroke-width="2"/>
  <text x="482" y="74" font-size="13" font-weight="700" fill="#1d4ed8">d′</text>
  <text x="482" y="134" font-size="13" font-weight="700" fill="#1a202c">d</text>
  <circle cx="250" cy="70" r="5.5" fill="#dc2626"/>
  <text x="250" y="52" font-size="13" font-weight="700" fill="#dc2626" text-anchor="middle">P</text>
  <path d="M386,63 L396,70 L386,77" fill="none" stroke="#1d4ed8" stroke-width="2"/>
  <path d="M386,123 L396,130 L386,137" fill="none" stroke="#1a202c" stroke-width="2"/>
</svg>

Mọi đường khác qua $P$ (kẻ nghiêng đi) **đều sẽ cắt** $d$ ở đâu đó nếu kéo dài đủ xa:

<svg viewBox="0 0 520 200" style="max-width:520px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Mọi đường khác qua P đều cắt d: hai đường nghiêng đi qua điểm P phía trên đều giao đường thẳng d, giao điểm đánh dấu chữ thập đỏ kèm chữ cắt">
  <line x1="30" y1="140" x2="490" y2="140" stroke="#1a202c" stroke-width="2"/>
  <text x="500" y="144" font-size="13" font-weight="700" fill="#1a202c">d</text>
  <line x1="297.5" y1="5" x2="162.5" y2="167" stroke="#15803d" stroke-width="1.8"/>
  <line x1="222.5" y1="5" x2="357.5" y2="167" stroke="#15803d" stroke-width="1.8"/>
  <circle cx="260" cy="50" r="5.5" fill="#dc2626"/>
  <text x="260" y="32" font-size="13" font-weight="700" fill="#dc2626" text-anchor="middle">P</text>
  <g stroke="#dc2626" stroke-width="2.2">
    <line x1="179" y1="134" x2="191" y2="146"/><line x1="179" y1="146" x2="191" y2="134"/>
    <line x1="329" y1="134" x2="341" y2="146"/><line x1="329" y1="146" x2="341" y2="134"/>
  </g>
  <text x="160" y="164" font-size="11.5" font-weight="700" fill="#dc2626" text-anchor="end">cắt</text>
  <text x="360" y="164" font-size="11.5" font-weight="700" fill="#dc2626">cắt</text>
  <text x="260" y="188" font-size="11.5" fill="#475569" text-anchor="middle">các đường nghiêng qua P đều cắt d nếu kéo dài đủ xa</text>
</svg>

#### Hình minh họa — vì sao bỏ tiên đề 5 sinh ra hình học khác

Đổi tiên đề 5 cho "số đường song song qua $P$" thành 0 hoặc vô số → ra 2 thế giới hình học khác hẳn. So sánh tổng 3 góc một tam giác:

<svg viewBox="0 0 720 236" style="max-width:720px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="So sánh ba hình học: Euclid phẳng tam giác cạnh thẳng tổng góc bằng 180 độ, cầu Riemann cạnh phình ra tổng lớn hơn 180 độ, hyperbolic Lobachevsky cạnh lõm vào tổng nhỏ hơn 180 độ">
  <text x="120" y="26" font-size="13" font-weight="700" fill="#1a202c" text-anchor="middle">EUCLID (phẳng)</text>
  <text x="120" y="46" font-size="11.5" fill="#475569" text-anchor="middle">qua P: 1 song song</text>
  <path d="M120,72 L60,168 L180,168 Z" fill="none" stroke="#1d4ed8" stroke-width="2.2"/>
  <text x="120" y="200" font-size="12.5" font-weight="700" fill="#1d4ed8" text-anchor="middle">tổng = 180°</text>
  <text x="120" y="222" font-size="11" fill="#475569" text-anchor="middle">tam giác phẳng, cạnh thẳng</text>
  <text x="360" y="26" font-size="13" font-weight="700" fill="#1a202c" text-anchor="middle">CẦU (Riemann)</text>
  <text x="360" y="46" font-size="11.5" fill="#475569" text-anchor="middle">qua P: 0 song song</text>
  <path d="M360,72 Q308,108 300,168 Q360,196 420,168 Q412,108 360,72 Z" fill="none" stroke="#15803d" stroke-width="2.2"/>
  <text x="360" y="200" font-size="12.5" font-weight="700" fill="#15803d" text-anchor="middle">tổng &gt; 180°</text>
  <text x="360" y="222" font-size="11" fill="#475569" text-anchor="middle">cạnh phình ra ngoài</text>
  <text x="600" y="26" font-size="13" font-weight="700" fill="#1a202c" text-anchor="middle">HYPERBOLIC (Lobachevsky)</text>
  <text x="600" y="46" font-size="11.5" fill="#475569" text-anchor="middle">qua P: vô số song song</text>
  <path d="M600,72 Q586,130 540,168 Q600,146 660,168 Q614,130 600,72 Z" fill="none" stroke="#dc2626" stroke-width="2.2"/>
  <text x="600" y="200" font-size="12.5" font-weight="700" fill="#dc2626" text-anchor="middle">tổng &lt; 180°</text>
  <text x="600" y="222" font-size="11" fill="#475569" text-anchor="middle">cạnh lõm vào trong</text>
</svg>

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

<svg viewBox="0 0 480 250" style="max-width:480px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Tính cộng góc: tia OB nằm trong góc AOC chia nó thành hai góc kề nhau, góc AOC bằng góc AOB cộng góc BOC">
  <line x1="120" y1="190" x2="420" y2="190" stroke="#1a202c" stroke-width="2"/>
  <line x1="120" y1="190" x2="276" y2="81" stroke="#1a202c" stroke-width="2"/>
  <line x1="120" y1="190" x2="163" y2="31" stroke="#1a202c" stroke-width="2"/>
  <path d="M168,190 A48,48 0 0 0 159.3,162.5" fill="none" stroke="#15803d" stroke-width="2"/>
  <path d="M165.9,157.9 A56,56 0 0 0 134.5,135.9" fill="none" stroke="#1d4ed8" stroke-width="2"/>
  <path d="M204,190 A84,84 0 0 0 141.7,108.9" fill="none" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="5,4"/>
  <text x="187" y="176" font-size="12" font-weight="700" fill="#15803d">∠BOC</text>
  <text x="160" y="131" font-size="12" font-weight="700" fill="#1d4ed8">∠AOB</text>
  <text x="128" y="98" font-size="12" font-weight="700" fill="#dc2626" text-anchor="end">∠AOC</text>
  <circle cx="120" cy="190" r="4.5" fill="#1a202c"/>
  <circle cx="163" cy="31" r="4.5" fill="#1a202c"/>
  <circle cx="276" cy="81" r="4.5" fill="#1a202c"/>
  <circle cx="420" cy="190" r="4.5" fill="#1a202c"/>
  <text x="163" y="20" font-size="13" font-weight="700" fill="#1a202c" text-anchor="middle">A</text>
  <text x="288" y="78" font-size="13" font-weight="700" fill="#1a202c">B</text>
  <text x="432" y="194" font-size="13" font-weight="700" fill="#1a202c">C</text>
  <text x="106" y="207" font-size="13" font-weight="700" fill="#1a202c" text-anchor="end">O</text>
  <text x="250" y="236" font-size="12" font-weight="700" fill="#475569" text-anchor="middle">∠AOC = ∠AOB + ∠BOC — vì tia OB nằm trong góc AOC</text>
</svg>

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

<svg viewBox="0 0 740 190" style="max-width:720px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Bốn loại góc chính: nhọn nhỏ hơn 90 độ, vuông bằng 90 độ có ô vuông đánh dấu, tù giữa 90 và 180 độ, bẹt bằng 180 độ hai tia thẳng hàng">
  <text x="95" y="26" font-size="12.5" font-weight="700" fill="#1a202c" text-anchor="middle">NHỌN</text>
  <line x1="40" y1="120" x2="155" y2="120" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="40" y1="120" x2="114" y2="32" stroke="#1d4ed8" stroke-width="2"/>
  <path d="M70,120 A30,30 0 0 0 59.3,97" fill="none" stroke="#dc2626" stroke-width="1.8"/>
  <text x="80" y="106" font-size="11.5" font-weight="700" fill="#dc2626">&lt; 90°</text>
  <circle cx="40" cy="120" r="4" fill="#1a202c"/>
  <text x="95" y="170" font-size="10.5" fill="#475569" text-anchor="middle">hẹp hơn góc vuông</text>
  <text x="275" y="26" font-size="12.5" font-weight="700" fill="#1a202c" text-anchor="middle">VUÔNG</text>
  <line x1="225" y1="120" x2="340" y2="120" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="225" y1="120" x2="225" y2="30" stroke="#1d4ed8" stroke-width="2"/>
  <polyline points="225,104 241,104 241,120" fill="none" stroke="#dc2626" stroke-width="1.8"/>
  <text x="250" y="100" font-size="11.5" font-weight="700" fill="#dc2626">= 90°</text>
  <circle cx="225" cy="120" r="4" fill="#1a202c"/>
  <text x="275" y="170" font-size="10.5" fill="#475569" text-anchor="middle">ô vuông đánh dấu 90°</text>
  <text x="470" y="26" font-size="12.5" font-weight="700" fill="#1a202c" text-anchor="middle">TÙ</text>
  <line x1="475" y1="120" x2="560" y2="120" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="475" y1="120" x2="397" y2="42" stroke="#1d4ed8" stroke-width="2"/>
  <path d="M501,120 A26,26 0 0 0 456.6,101.6" fill="none" stroke="#dc2626" stroke-width="1.8"/>
  <text x="492" y="82" font-size="11.5" font-weight="700" fill="#dc2626">&gt; 90°</text>
  <circle cx="475" cy="120" r="4" fill="#1a202c"/>
  <text x="470" y="170" font-size="10.5" fill="#475569" text-anchor="middle">rộng hơn góc vuông</text>
  <text x="650" y="26" font-size="12.5" font-weight="700" fill="#1a202c" text-anchor="middle">BẸT</text>
  <line x1="570" y1="120" x2="730" y2="120" stroke="#1d4ed8" stroke-width="2"/>
  <path d="M676,120 A26,26 0 0 0 624,120" fill="none" stroke="#dc2626" stroke-width="1.8"/>
  <text x="650" y="84" font-size="11.5" font-weight="700" fill="#dc2626" text-anchor="middle">= 180°</text>
  <circle cx="650" cy="120" r="4" fill="#1a202c"/>
  <text x="650" y="170" font-size="10.5" fill="#475569" text-anchor="middle">2 tia đối nhau, thẳng hàng</text>
</svg>

Mốc nhận biết nhanh: so với **góc vuông** $90^\circ$ (góc của tờ giấy, góc tường) — hẹp hơn là nhọn, rộng hơn (mà chưa thẳng) là tù, thẳng băng là bẹt.

### 3.2. Quan hệ góc

- **Hai góc bù nhau** (supplementary): tổng $= 180^\circ$.
- **Hai góc phụ nhau** (complementary): tổng $= 90^\circ$.
- **Hai góc đối đỉnh** (vertical angles): bằng nhau.

#### Hình minh họa — góc bù, góc phụ

<svg viewBox="0 0 660 224" style="max-width:660px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Góc phụ và góc bù: bên trái hai góc alpha beta ghép thành góc vuông nên tổng 90 độ, bên phải hai góc ghép thành góc bẹt trên đường thẳng nên tổng 180 độ">
  <text x="170" y="26" font-size="13" font-weight="700" fill="#1a202c" text-anchor="middle">GÓC PHỤ — tổng 90°</text>
  <line x1="150" y1="150" x2="290" y2="150" stroke="#1a202c" stroke-width="2"/>
  <line x1="150" y1="150" x2="150" y2="30" stroke="#1a202c" stroke-width="2"/>
  <line x1="150" y1="150" x2="257" y2="75" stroke="#1a202c" stroke-width="1.8"/>
  <path d="M190,150 A40,40 0 0 0 182.8,127" fill="none" stroke="#1d4ed8" stroke-width="2"/>
  <path d="M192.6,120.2 A52,52 0 0 0 150,98" fill="none" stroke="#15803d" stroke-width="2"/>
  <path d="M214,150 A64,64 0 0 0 150,86" fill="none" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="5,4"/>
  <text x="204" y="139" font-size="12.5" font-weight="700" fill="#1d4ed8">α</text>
  <text x="176" y="97" font-size="12.5" font-weight="700" fill="#15803d">β</text>
  <text x="212" y="96" font-size="11" font-weight="700" fill="#475569">90°</text>
  <circle cx="150" cy="150" r="4" fill="#1a202c"/>
  <text x="170" y="205" font-size="12" font-weight="700" fill="#475569" text-anchor="middle">α + β = 90° — ghép lại = góc vuông</text>
  <text x="510" y="26" font-size="13" font-weight="700" fill="#1a202c" text-anchor="middle">GÓC BÙ — tổng 180°</text>
  <line x1="380" y1="150" x2="640" y2="150" stroke="#1a202c" stroke-width="2"/>
  <line x1="510" y1="150" x2="570" y2="46" stroke="#1a202c" stroke-width="1.8"/>
  <path d="M476,150 A34,34 0 0 1 527,120.6" fill="none" stroke="#1d4ed8" stroke-width="2"/>
  <path d="M533,110.2 A46,46 0 0 1 556,150" fill="none" stroke="#15803d" stroke-width="2"/>
  <text x="480" y="114" font-size="12.5" font-weight="700" fill="#1d4ed8" text-anchor="middle">α</text>
  <text x="563" y="124" font-size="12.5" font-weight="700" fill="#15803d">β</text>
  <circle cx="510" cy="150" r="4" fill="#1a202c"/>
  <text x="510" y="205" font-size="12" font-weight="700" fill="#475569" text-anchor="middle">α + β = 180° — ghép lại = nửa vòng tròn (góc bẹt)</text>
</svg>

#### Hình minh họa — góc đối đỉnh & kề bù

2 đường thẳng cắt nhau tại O tạo **4 góc**. Đánh số 1, 2, 3, 4 đi vòng:

<svg viewBox="0 0 480 252" style="max-width:480px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Hai đường thẳng cắt nhau tại O tạo bốn góc đánh số: 1 trên, 2 phải, 3 dưới, 4 trái; cặp đối đỉnh 1-3 và 2-4 bằng nhau, hai góc kề nhau bù nhau tổng 180 độ">
  <line x1="189" y1="30" x2="291" y2="190" stroke="#1a202c" stroke-width="2"/>
  <line x1="291" y1="30" x2="189" y2="190" stroke="#1a202c" stroke-width="2"/>
  <path d="M223.9,84.7 A30,30 0 0 1 256.1,84.7" fill="none" stroke="#1d4ed8" stroke-width="2"/>
  <path d="M256.1,135.3 A30,30 0 0 1 223.9,135.3" fill="none" stroke="#1d4ed8" stroke-width="2"/>
  <path d="M258.3,81.3 A34,34 0 0 1 258.3,138.7" fill="none" stroke="#15803d" stroke-width="2"/>
  <path d="M221.7,138.7 A34,34 0 0 1 221.7,81.3" fill="none" stroke="#15803d" stroke-width="2"/>
  <text x="240" y="64" font-size="13" font-weight="700" fill="#1d4ed8" text-anchor="middle">1</text>
  <text x="240" y="166" font-size="13" font-weight="700" fill="#1d4ed8" text-anchor="middle">3</text>
  <text x="296" y="115" font-size="13" font-weight="700" fill="#15803d" text-anchor="middle">2</text>
  <text x="184" y="115" font-size="13" font-weight="700" fill="#15803d" text-anchor="middle">4</text>
  <circle cx="240" cy="110" r="3.5" fill="#1a202c"/>
  <text x="228" y="105" font-size="11.5" font-weight="700" fill="#1a202c" text-anchor="end">O</text>
  <text x="240" y="222" font-size="12" font-weight="700" fill="#1d4ed8" text-anchor="middle">Đối đỉnh (bằng nhau): ∠1 = ∠3, ∠2 = ∠4</text>
  <text x="240" y="243" font-size="12" font-weight="700" fill="#dc2626" text-anchor="middle">Kề bù (tổng 180°): ∠1 + ∠2 = 180°, ∠2 + ∠3 = 180°, ...</text>
</svg>

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

<svg viewBox="0 0 560 330" style="max-width:560px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Cát tuyến c cắt hai đường song song a và b tạo 8 góc đánh số 1 đến 8: các cặp đồng vị bằng nhau, so le trong bằng nhau, trong cùng phía bù nhau">
  <rect x="40" y="90" width="440" height="100" fill="#eef2f7"/>
  <text x="60" y="145" font-size="10.5" fill="#94a3b8">miền trong (giữa a và b)</text>
  <line x1="40" y1="90" x2="480" y2="90" stroke="#1a202c" stroke-width="2"/>
  <line x1="40" y1="190" x2="480" y2="190" stroke="#1a202c" stroke-width="2"/>
  <line x1="305" y1="40" x2="205" y2="240" stroke="#1d4ed8" stroke-width="2"/>
  <text x="492" y="94" font-size="13" font-weight="700" fill="#1a202c">a</text>
  <text x="492" y="194" font-size="13" font-weight="700" fill="#1a202c">b</text>
  <text x="312" y="36" font-size="13" font-weight="700" fill="#1d4ed8">c</text>
  <path d="M414,83 L424,90 L414,97" fill="none" stroke="#1a202c" stroke-width="2"/>
  <path d="M414,183 L424,190 L414,197" fill="none" stroke="#1a202c" stroke-width="2"/>
  <circle cx="280" cy="90" r="3.5" fill="#1a202c"/>
  <circle cx="230" cy="190" r="3.5" fill="#1a202c"/>
  <text x="252" y="84" font-size="12.5" font-weight="700" fill="#475569" text-anchor="middle">1</text>
  <text x="312" y="84" font-size="12.5" font-weight="700" fill="#475569" text-anchor="middle">2</text>
  <text x="300" y="112" font-size="12.5" font-weight="700" fill="#dc2626" text-anchor="middle">3</text>
  <text x="246" y="112" font-size="12.5" font-weight="700" fill="#dc2626" text-anchor="middle">4</text>
  <text x="202" y="184" font-size="12.5" font-weight="700" fill="#dc2626" text-anchor="middle">5</text>
  <text x="262" y="184" font-size="12.5" font-weight="700" fill="#dc2626" text-anchor="middle">6</text>
  <text x="250" y="212" font-size="12.5" font-weight="700" fill="#475569" text-anchor="middle">7</text>
  <text x="196" y="212" font-size="12.5" font-weight="700" fill="#475569" text-anchor="middle">8</text>
  <text x="280" y="272" font-size="11.5" font-weight="700" fill="#1d4ed8" text-anchor="middle">Đồng vị (cùng vị trí): ∠1=∠5, ∠2=∠6, ∠3=∠7, ∠4=∠8 → bằng nhau</text>
  <text x="280" y="294" font-size="11.5" font-weight="700" fill="#15803d" text-anchor="middle">So le trong (2 phía cát tuyến, giữa a và b): ∠3=∠5, ∠4=∠6 → bằng nhau</text>
  <text x="280" y="316" font-size="11.5" font-weight="700" fill="#dc2626" text-anchor="middle">Trong cùng phía (1 phía, giữa a và b): ∠3+∠6=180°, ∠4+∠5=180° → bù nhau</text>
</svg>

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

<svg viewBox="0 0 660 216" style="max-width:660px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Bên trái hai đường vuông góc a và b cắt nhau tạo góc 90 độ có ô vuông đánh dấu, bên phải hai đường song song a và b luôn cách đều không bao giờ cắt">
  <text x="170" y="26" font-size="13" font-weight="700" fill="#1a202c" text-anchor="middle">VUÔNG GÓC — a ⊥ b</text>
  <line x1="160" y1="40" x2="160" y2="185" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="50" y1="112" x2="290" y2="112" stroke="#15803d" stroke-width="2"/>
  <polyline points="160,98 174,98 174,112" fill="none" stroke="#dc2626" stroke-width="1.8"/>
  <text x="182" y="94" font-size="11.5" font-weight="700" fill="#dc2626">90°</text>
  <text x="170" y="52" font-size="13" font-weight="700" fill="#1d4ed8">a</text>
  <text x="296" y="116" font-size="13" font-weight="700" fill="#15803d">b</text>
  <text x="170" y="206" font-size="11.5" fill="#475569" text-anchor="middle">cắt nhau tạo góc 90° — ô vuông đánh dấu</text>
  <text x="500" y="26" font-size="13" font-weight="700" fill="#1a202c" text-anchor="middle">SONG SONG — a ∥ b</text>
  <line x1="380" y1="82" x2="620" y2="82" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="380" y1="152" x2="620" y2="152" stroke="#15803d" stroke-width="2"/>
  <text x="628" y="86" font-size="13" font-weight="700" fill="#1d4ed8">a</text>
  <text x="628" y="156" font-size="13" font-weight="700" fill="#15803d">b</text>
  <path d="M532,75 L542,82 L532,89" fill="none" stroke="#1d4ed8" stroke-width="2"/>
  <path d="M532,145 L542,152 L532,159" fill="none" stroke="#15803d" stroke-width="2"/>
  <g stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="4,4">
    <line x1="420" y1="82" x2="420" y2="152"/>
    <line x1="480" y1="82" x2="480" y2="152"/>
  </g>
  <text x="450" y="122" font-size="10.5" fill="#94a3b8" text-anchor="middle">cách đều</text>
  <text x="500" y="206" font-size="11.5" fill="#475569" text-anchor="middle">luôn cách đều, không bao giờ cắt</text>
</svg>

#### Hình minh họa — 2 đường cùng vuông góc với đường thứ 3 thì song song

<svg viewBox="0 0 480 200" style="max-width:480px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Hai đường a và b cùng vuông góc với đường c nằm ngang, mỗi chân có ô vuông 90 độ, suy ra a song song b như hai cây cột dựng thẳng trên mặt đất">
  <line x1="30" y1="140" x2="450" y2="140" stroke="#1a202c" stroke-width="2"/>
  <text x="458" y="144" font-size="13" font-weight="700" fill="#1a202c">c</text>
  <line x1="140" y1="30" x2="140" y2="140" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="310" y1="30" x2="310" y2="140" stroke="#1d4ed8" stroke-width="2"/>
  <text x="148" y="42" font-size="13" font-weight="700" fill="#1d4ed8">a</text>
  <text x="318" y="42" font-size="13" font-weight="700" fill="#1d4ed8">b</text>
  <polyline points="140,126 154,126 154,140" fill="none" stroke="#dc2626" stroke-width="1.8"/>
  <polyline points="310,126 324,126 324,140" fill="none" stroke="#dc2626" stroke-width="1.8"/>
  <text x="160" y="122" font-size="11" font-weight="700" fill="#dc2626">90°</text>
  <text x="330" y="122" font-size="11" font-weight="700" fill="#dc2626">90°</text>
  <circle cx="140" cy="140" r="4" fill="#1a202c"/>
  <circle cx="310" cy="140" r="4" fill="#1a202c"/>
  <path d="M133,76 L140,66 L147,76" fill="none" stroke="#15803d" stroke-width="2"/>
  <path d="M303,76 L310,66 L317,76" fill="none" stroke="#15803d" stroke-width="2"/>
  <text x="240" y="172" font-size="12.5" font-weight="700" fill="#dc2626" text-anchor="middle">a ⊥ c và b ⊥ c ⟹ a ∥ b</text>
  <text x="240" y="192" font-size="11" fill="#475569" text-anchor="middle">hai cây cột cùng dựng thẳng đứng trên mặt đất → song song nhau</text>
</svg>

#### Hình minh họa — tính bắc cầu của song song

<svg viewBox="0 0 500 178" style="max-width:500px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Tính bắc cầu của song song: a song song b và b song song c suy ra a song song c, ba đường ngang xếp chồng có ký hiệu mũi tên song song">
  <line x1="30" y1="40" x2="340" y2="40" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="30" y1="88" x2="340" y2="88" stroke="#15803d" stroke-width="2"/>
  <line x1="30" y1="136" x2="340" y2="136" stroke="#1d4ed8" stroke-width="2"/>
  <text x="352" y="44" font-size="13" font-weight="700" fill="#1d4ed8">a</text>
  <text x="352" y="92" font-size="13" font-weight="700" fill="#15803d">b</text>
  <text x="352" y="140" font-size="13" font-weight="700" fill="#1d4ed8">c</text>
  <path d="M282,33 L292,40 L282,47" fill="none" stroke="#1d4ed8" stroke-width="2"/>
  <path d="M282,81 L292,88 L282,95" fill="none" stroke="#15803d" stroke-width="2"/>
  <path d="M282,129 L292,136 L282,143" fill="none" stroke="#1d4ed8" stroke-width="2"/>
  <text x="400" y="68" font-size="12" font-weight="700" fill="#475569">a ∥ b</text>
  <text x="400" y="116" font-size="12" font-weight="700" fill="#475569">b ∥ c</text>
  <text x="250" y="168" font-size="12.5" font-weight="700" fill="#dc2626" text-anchor="middle">a ∥ b và b ∥ c ⟹ a ∥ c (tính bắc cầu)</text>
</svg>

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
