// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: GameDev/02-Collision/lesson-03-broadphase-quadtree/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 08 — Broad-phase & Quadtree (phân hoạch không gian)

> **Đây là bài về tăng tốc va chạm trong Tier 2 — Collision.** Sau khi đã biết
> *kiểm tra hai vật có chạm hay không* (L06 AABB & Circle), bài này trả lời câu hỏi
> **làm sao kiểm tra hàng nghìn vật mà không chết máy.**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu vì sao **so mọi cặp là $O(n^2)$** và tại sao 1000 vật = ~500k cặp/frame là không chịu nổi.
- Phân biệt **broad-phase** (loại nhanh cặp không thể chạm) và **narrow-phase** (kiểm chính xác cặp còn lại).
- Cài đặt **spatial hash grid** — chia không gian thành ô lưới, chỉ so vật cùng ô / ô kề.
- Dựng **quadtree** — chia đệ quy ô thành 4 khi quá đông; truy vấn (query) lân cận.
- Hiểu **sweep and prune (SAP)** — sắp theo một trục, chỉ so vật chồng khoảng $[\\min, \\max]$.
- Cân nhắc **đánh đổi** giữa grid (đều, đơn giản) và quadtree (thích nghi mật độ), và chi phí dựng lại mỗi frame.

## Kiến thức tiền đề

- [L06 — AABB & Circle](../lesson-01-aabb-circle/) — broad-phase chỉ *lọc* ra cặp ứng viên; mỗi cặp ứng viên vẫn phải qua test AABB/Circle chính xác. Bài này không thay thế L06, nó **gọi** L06 ít lần hơn.
- [DataStructures — Tree](../../../DataStructures/02-Intermediate/lesson-01-tree/) — quadtree là một cây (mỗi node có 4 con). Khái niệm node, root, lá, đệ quy lấy từ đây.
- [DataStructures — Advanced structures](../../../DataStructures/03-Advanced/lesson-04-advanced-structures/) — quadtree thuộc họ cây phân hoạch không gian (cùng họ với k-d tree, BVH, R-tree).
- [Algorithms](../../../Algorithms/) — phân tích $O(n^2)$ vs $O(n \\log n)$, vì sao "ít phép so sánh hơn" = "nhanh hơn".

---

## 1. Vì sao học broad-phase? — bài toán mở

> 💡 **Trực giác / Hình dung.** Tưởng tượng 1000 con cá bơi trong bể. Bạn muốn biết con nào
> đụng con nào. Cách ngây thơ: với **mỗi** con cá, đi hỏi **mọi** con cá khác "tao có chạm
> mày không?". Nhưng con cá ở góc trên-trái rõ ràng **không thể** chạm con ở góc dưới-phải —
> hỏi nó là phí công. Broad-phase = "đừng hỏi những con ở xa, chỉ hỏi những con đứng gần."

Bài toán cụ thể mở đầu:

> **1000 vật đang bay trong màn hình. Mỗi frame (60 lần/giây) ta cần biết cặp nào va chạm.
> Vì sao KHÔNG nên so cả ~500.000 cặp mỗi frame?**

Hãy đếm chính xác. Với $n$ vật, số cặp cần xét (mỗi cặp một lần) là:

$$C(n, 2) = \\binom{n}{2} = \\frac{n(n-1)}{2}$$

- $n = 1000$: $\\dfrac{1000 \\times 999}{2} = 499{.}500$ cặp $\\approx$ 500k.
- Ở 60 FPS: $499{.}500 \\times 60 = 29{.}970{.}000 \\approx$ **30 triệu test va chạm mỗi giây**.
- Mỗi test AABB/Circle (L06) tốn ~vài chục phép tính → tổng hàng tỷ phép tính/giây chỉ để phát hiện va chạm. Game tụt FPS, giật.

**Đóng câu hỏi bằng số:** nếu thay bằng broad-phase tốt (grid hoặc quadtree), số cặp thực sự
phải test xuống còn cỡ **vài nghìn** thay vì 500k — giảm ~100 lần. Cụ thể: với 1000 vật phân bố
đều trên lưới $32 \\times 32$ ô, trung bình mỗi ô chỉ ~1 vật, số cặp cùng-ô + ô-kề chỉ còn cỡ
**5.000–10.000** cặp/frame thay vì 500k (xem §3.4 để đếm chi tiết). Đó là toàn bộ lý do tồn tại của broad-phase.

> ❓ **Câu hỏi tự nhiên.** "500k cặp/frame nghe cũng không nhiều, máy tính làm tỷ phép tính/giây mà?"
> — Vấn đề là nó **bùng nổ bậc hai**. 1000 vật = 500k cặp. **2000 vật = 2 triệu cặp** (gấp 4 dù vật chỉ
> gấp 2). 5000 vật = 12,5 triệu cặp/frame. Số vật tăng tuyến tính nhưng chi phí tăng theo bình phương →
> tới một ngưỡng là sập. Broad-phase đưa nó về gần tuyến tính.

> ⚠ **Lỗi thường gặp — đếm cặp hai lần.** Vòng lặp ngây thơ rất dễ viết
> \`for i: for j: test(i, j)\` chạy cả $i, j$ và $j, i$ → test mỗi cặp **2 lần**, thậm chí test
> vật với chính nó ($i = j$). Đúng phải là \`for i: for j = i+1 ...\` → đúng $\\binom{n}{2}$ cặp,
> không trùng. Đếm sai → tưởng chậm gấp đôi hoặc crash vì self-collision.

> 🔁 **Dừng lại tự kiểm tra.** Với $n = 100$ vật, vòng lặp ngây thơ \`for j=i+1\` xét bao nhiêu cặp?
> <details><summary>Đáp án</summary>
> $\\binom{100}{2} = \\dfrac{100 \\times 99}{2} = 4{.}950$ cặp. Ở 60 FPS là ~297k test/giây — vẫn ổn với 100 vật. $O(n^2)$ chỉ thành vấn đề khi $n$ lớn (hàng nghìn).
> </details>

> 📝 **Tóm tắt mục 1.**
> - So mọi cặp = $\\binom{n}{2} = \\frac{n(n-1)}{2}$ cặp, tức $O(n^2)$.
> - 1000 vật ≈ 500k cặp/frame; ×60 FPS ≈ 30 triệu test/giây.
> - Chi phí bùng nổ bậc hai: gấp đôi vật = gấp bốn chi phí.
> - Broad-phase đưa số cặp thực test về gần tuyến tính (vài nghìn thay vì 500k).

---

## 2. Broad-phase vs narrow-phase

### 2.1 Định nghĩa tự đủ

> 💡 **Trực giác.** Lọc va chạm giống lọc hồ sơ qua hai vòng. **Vòng sơ tuyển (broad-phase):**
> loại nhanh những hồ sơ rõ ràng không đạt (vật ở quá xa nhau) — làm thật nhanh, chấp nhận
> còn sót vài hồ sơ "có vẻ đạt". **Vòng phỏng vấn (narrow-phase):** xét kỹ từng hồ sơ còn lại
> bằng test chính xác (AABB/Circle ở L06). Hai vòng nối tiếp → vừa nhanh vừa chính xác.

**(a) Là gì.**

- **Broad-phase** (pha thô): dùng cấu trúc không gian (grid, quadtree, SAP) để **nhanh chóng loại bỏ
  các cặp KHÔNG THỂ chạm** (vì ở xa nhau), trả về danh sách **cặp ứng viên (candidate pairs)** —
  những cặp ở đủ gần để *có khả năng* chạm. Broad-phase **không khẳng định** chúng chạm; nó chỉ
  nói "đáng để kiểm kỹ".
- **Narrow-phase** (pha tinh): với mỗi cặp ứng viên, chạy test hình học **chính xác** (overlap
  AABB, khoảng cách tâm < tổng bán kính cho Circle — chính là L06) để khẳng định có chạm thật không,
  và nếu chạm thì độ xuyên sâu bao nhiêu (đưa sang L09 response).

**(b) Vì sao cần tách hai pha.** Test chính xác (narrow-phase) **đắt** — phải tính giao hình.
Nếu chạy test chính xác cho cả 500k cặp thì sập. Broad-phase **rẻ** — chỉ so vị trí ô lưới /
khoảng trục — nên dùng nó cắt 500k cặp xuống vài nghìn *trước*, rồi mới đổ tiền vào test chính xác
cho phần nhỏ còn lại. Chia việc: lọc thô bằng cấu trúc rẻ → kiểm tinh bằng test đắt.

**(c) Ví dụ trực giác bằng số.** Màn 800×600, hai vật:
- Vật A tâm $(50, 50)$, vật B tâm $(700, 550)$. Khoảng cách $\\approx \\sqrt{650^2 + 500^2} \\approx 820$ px.
  Broad-phase đặt A vào ô góc trên-trái, B vào ô góc dưới-phải → khác ô, không kề → **loại ngay**,
  không cần tính khoảng cách chính xác. Tiết kiệm một test narrow-phase.

### 2.2 Bốn ví dụ phân loại broad / narrow

Lưới ô $200 \\times 200$ px (mỗi ô rộng 200), bán kính vật $r = 10$:

| # | Vật A (tâm) | Vật B (tâm) | Ô của A | Ô của B | Broad-phase nói | Cần narrow-phase? |
|---|---|---|---|---|---|---|
| 1 | $(50, 50)$ | $(60, 55)$ | (0,0) | (0,0) | cùng ô → ứng viên | Có — narrow xác nhận **chạm** (cách 11 px < 20) |
| 2 | $(50, 50)$ | $(150, 60)$ | (0,0) | (0,0) | cùng ô → ứng viên | Có — narrow nói **không chạm** (cách ~100 px > 20) |
| 3 | $(190, 100)$ | $(210, 100)$ | (0,0) | (1,0) | ô kề → ứng viên | Có — narrow nói **chạm** (cách 20 px = 20, sát biên) |
| 4 | $(50, 50)$ | $(650, 550)$ | (0,0) | (3,2) | ô xa → **loại** | Không — broad-phase đã loại |

> Đọc kỹ #2 và #3: broad-phase cho cả hai là "ứng viên" nhưng kết quả narrow-phase **ngược nhau**.
> Điều này đúng và bình thường — broad-phase được phép trả về **false positive** (cặp ứng viên hoá ra
> không chạm). Nó **không** được phép bỏ sót cặp chạm thật (false negative) — đó mới là bug nghiêm trọng
> (xem ⚠ §3.3 về vật ở biên ô).

> ❓ **Câu hỏi tự nhiên.**
> - *"Broad-phase trả về cặp không chạm thật (như #2) thì có sai không?"* — Không sai, chỉ là **phí công** một
>   chút (chạy thừa một test narrow-phase). Mục tiêu broad-phase là *giảm* số test, không cần *chính xác tuyệt đối*.
>   Chấp nhận vài false positive đổi lấy tốc độ.
> - *"Vậy bỏ sót cặp chạm thật thì sao?"* — Đó là lỗi nghiêm trọng: vật xuyên qua nhau mà game không phát hiện.
>   Broad-phase phải đảm bảo **mọi cặp đủ gần để chạm đều nằm trong danh sách ứng viên** — lý do phải xét ô kề
>   (§3.3), không chỉ ô của chính nó.

> 🔁 **Dừng lại tự kiểm tra.** Trong 4 ví dụ trên, broad-phase loại được mấy cặp khỏi narrow-phase?
> <details><summary>Đáp án</summary>
> Chỉ 1 cặp (#4). Ba cặp còn lại (#1, #2, #3) đều thành ứng viên và phải qua narrow-phase. Với lưới ô to (200 px) và ít vật thì lọc chưa mạnh; lưới mịn hơn / nhiều vật phân tán → broad-phase loại được tỷ lệ lớn hơn nhiều.
> </details>

> 📝 **Tóm tắt mục 2.**
> - Broad-phase = lọc thô rẻ → trả **danh sách cặp ứng viên** (cặp đủ gần để *có thể* chạm).
> - Narrow-phase = test chính xác đắt (L06) trên các cặp ứng viên.
> - Broad-phase được phép **false positive** (ứng viên không chạm) nhưng **không được false negative** (bỏ sót cặp chạm thật).
> - Tách hai pha = cắt số cặp đắt từ 500k xuống vài nghìn.

---

## 3. Spatial hash grid (lưới băm không gian)

### 3.1 Định nghĩa tự đủ

> 💡 **Trực giác.** Chia màn hình thành các ô vuông như bàn cờ. Mỗi vật "rơi" vào ô chứa nó.
> Muốn biết vật X chạm ai → chỉ cần ngó **ô của X và 8 ô xung quanh**, bỏ qua toàn bộ phần còn lại
> của màn. Giống tìm người trong toà nhà: bạn không gõ cửa mọi căn hộ, bạn chỉ hỏi tầng của họ.

**(a) Là gì.** Spatial hash grid chia không gian thành lưới ô đều cạnh $s$ (cell size). Mỗi ô là một
danh sách (list) chứa các vật có tâm rơi vào ô đó. Ô của một vật tại $(x, y)$ tính bằng:

$$\\text{col} = \\left\\lfloor \\frac{x}{s} \\right\\rfloor, \\quad \\text{row} = \\left\\lfloor \\frac{y}{s} \\right\\rfloor$$

Gọi là "hash" vì cặp $(\\text{col}, \\text{row})$ thường được băm thành một khoá duy nhất để cất vào hash map —
nhờ vậy lưới có thể **vô hạn / thưa** (chỉ cấp ô khi có vật), không cần mảng 2D cố định.

**(b) Vì sao cần.** Để trả lời "vật nào gần X" trong $O(1)$ trung bình thay vì $O(n)$ — thay vì quét cả $n$
vật, ta chỉ quét các vật trong 9 ô (ô của X + 8 ô kề). Nếu vật phân bố đều, mỗi ô chỉ ~vài vật.

**(c) Ví dụ trực giác bằng số.** Cell size $s = 100$. Vật tại $(250, 130)$:
$\\text{col} = \\lfloor 250/100 \\rfloor = 2$, $\\text{row} = \\lfloor 130/100 \\rfloor = 1$ → ô **(2, 1)**.
Một vật khác tại $(290, 170)$: $\\lfloor 290/100 \\rfloor = 2$, $\\lfloor 170/100 \\rfloor = 1$ → cũng ô **(2, 1)**
→ cùng ô → thành cặp ứng viên.

### 3.2 Tính ô — bốn ví dụ số (cell size $s = 100$)

| # | Vật tại $(x, y)$ | $\\lfloor x/100 \\rfloor$ | $\\lfloor y/100 \\rfloor$ | Ô (col, row) |
|---|---|---|---|---|
| 1 | $(0, 0)$ | 0 | 0 | (0, 0) |
| 2 | $(99, 99)$ | 0 | 0 | (0, 0) — vẫn ô đầu (chưa tới 100) |
| 3 | $(100, 50)$ | 1 | 0 | (1, 0) — vừa qua biên sang ô kế |
| 4 | $(350, 420)$ | 3 | 4 | (3, 4) |

> Ví dụ #2 và #3 cho thấy biên ô: $99 \\to$ ô 0, nhưng $100 \\to$ ô 1. Đúng một pixel làm vật nhảy ô.
> Đây chính là gốc của lỗi "vật ở biên" — xem ⚠ §3.3.

### 3.3 Vì sao phải xét ô kề (8 ô lân cận)

> ⚠ **Lỗi thường gặp — bỏ sót vật ở biên ô.** Nếu chỉ so vật **cùng ô**, hai vật sát nhau nhưng
> nằm hai bên đường kẻ ô sẽ **không bao giờ được so** → xuyên qua nhau mà không phát hiện. Ví dụ
> $s = 100$: vật A tại $(98, 50)$ → ô (0,0); vật B tại $(102, 50)$ → ô (1,0). Hai vật chỉ cách
> 4 px (chắc chắn chạm nếu $r = 10$) nhưng khác ô! Nếu chỉ xét cùng-ô → **bỏ sót cặp chạm thật**
> (false negative — lỗi nghiêm trọng). **Cách sửa:** với mỗi vật, xét cả **9 ô** (ô của nó + 8 ô
> xung quanh). Điều kiện đủ để không bỏ sót: cell size $s \\geq$ đường kính vật lớn nhất ($s \\geq 2r_{\\max}$),
> khi đó hai vật chạm chỉ có thể nằm trong cùng ô hoặc ô kề trực tiếp.

> ❓ **Câu hỏi tự nhiên.**
> - *"Cell size nên chọn bao nhiêu?"* — Quy tắc tốt: $s \\approx$ đường kính vật trung bình. **Quá nhỏ** → một vật
>   trải qua nhiều ô, phải chèn vào nhiều ô, tốn bộ nhớ. **Quá lớn** → mỗi ô chứa quá nhiều vật → lại quay về gần $O(n^2)$
>   trong từng ô. Vật to nhỏ chênh lệch nhiều → grid kém hiệu quả (lý do người ta chuyển sang quadtree, §4).
> - *"Xét 9 ô có làm trùng cặp không?"* — Có nguy cơ. Nếu A xét ô của B và B cũng xét ô của A → cặp (A,B) bị
>   sinh hai lần. Khử trùng bằng cách chỉ ghép khi \`id(A) < id(B)\`, hoặc dồn ứng viên vào một set rồi khử trùng (xem ⚠ §6).

### 3.4 Walk-through số — lưới 4×4, đếm cặp

Lưới $4 \\times 4$ ô (16 ô), cell size $s = 100$ (không gian $400 \\times 400$). Đặt 6 vật:

| Vật | Tâm $(x, y)$ | Ô (col, row) |
|---|---|---|
| P1 | $(30, 40)$ | (0, 0) |
| P2 | $(70, 60)$ | (0, 0) |
| P3 | $(120, 50)$ | (1, 0) |
| P4 | $(330, 330)$ | (3, 3) |
| P5 | $(360, 370)$ | (3, 3) |
| P6 | $(50, 350)$ | (0, 3) |

**Bước 1 — gom vật vào ô:**
- Ô (0,0): {P1, P2}
- Ô (1,0): {P3}
- Ô (3,3): {P4, P5}
- Ô (0,3): {P6}
- 12 ô còn lại: rỗng.

**Bước 2 — đếm cặp ứng viên (cùng ô + ô kề, mỗi cặp một lần):**

- Trong ô (0,0): {P1,P2} → cặp (P1,P2). **1 cặp.**
- Ô (0,0) và ô kề (1,0): P1–P3, P2–P3. **2 cặp** (vì P3 ở ô kề ngay phải).
- Trong ô (3,3): {P4,P5} → cặp (P4,P5). **1 cặp.**
- Ô (0,3): chỉ P6, không vật nào ở ô (0,0) kề nó (cách 3 ô) → **0 cặp**.

→ **Tổng cặp ứng viên = 1 + 2 + 1 = 4 cặp.**

**So với so mọi cặp:** $\\binom{6}{2} = \\dfrac{6 \\times 5}{2} = 15$ cặp.

→ Grid cắt từ **15 xuống 4 cặp** (giảm ~73%) chỉ với 6 vật phân tán. Với hàng nghìn vật trải đều,
tỷ lệ cắt còn mạnh hơn nhiều (vì hầu hết các ô không kề nhau → không sinh cặp nào).

> 🔁 **Dừng lại tự kiểm tra.** Nếu thêm P7 tại $(390, 300)$ — ô (3,3) — thì ô (3,3) có những ai và sinh thêm mấy cặp?
> <details><summary>Đáp án</summary>
> $\\lfloor 390/100 \\rfloor = 3$, $\\lfloor 300/100 \\rfloor = 3$ → ô (3,3) = {P4, P5, P7}. Trong ô 3 vật → $\\binom{3}{2} = 3$ cặp (P4P5, P4P7, P5P7). Trước có 1 cặp (P4P5) nên **thêm 2 cặp**. Tổng ứng viên thành 6. (So mọi cặp giờ là $\\binom{7}{2} = 21$.)
> </details>

> 📝 **Tóm tắt mục 3.**
> - Ô của vật: $\\text{col} = \\lfloor x/s \\rfloor$, $\\text{row} = \\lfloor y/s \\rfloor$.
> - Chỉ so vật **cùng ô + 8 ô kề** → $O(1)$ trung bình mỗi vật nếu phân bố đều.
> - **Bắt buộc xét ô kề** kẻo bỏ sót vật ở biên ô (false negative). Điều kiện đủ: $s \\geq 2r_{\\max}$.
> - Cell size $\\approx$ đường kính vật. Grid mạnh khi mật độ đều, yếu khi vật cụm hoặc kích thước chênh lệch.

---

## 4. Quadtree (cây tứ phân)

### 4.1 Định nghĩa tự đủ

> 💡 **Trực giác.** Grid chia đều cả màn dù chỗ trống chỗ đông — phí ô ở vùng trống, nghẽn ô ở vùng đông.
> Quadtree **thông minh hơn:** bắt đầu bằng một ô lớn (cả màn). Khi ô nào chứa quá nhiều vật, **cắt nó
> làm 4 ô con** (trên-trái, trên-phải, dưới-trái, dưới-phải), đệ quy. Vùng đông → chia nhỏ tự động;
> vùng trống → giữ ô to. Giống chia phòng: phòng đông người thì ngăn vách thành 4 phòng nhỏ.

**(a) Là gì.** Quadtree là **cây** mà mỗi node biểu diễn một vùng chữ nhật và có **đúng 4 node con**
(4 góc phần tư). Node giữ tối đa \`capacity\` vật; vượt quá thì **subdivide** (chia 4) và đẩy vật xuống
con phù hợp. Lá (leaf) là node chưa chia. Đây là cấu trúc cây (xem
[DataStructures — Tree](../../../DataStructures/02-Intermediate/lesson-01-tree/)) — chỉ khác là mỗi node
4 con và mỗi node gắn với một vùng không gian.

**(b) Vì sao cần (so với grid).** Grid dùng ô cố định → không thích nghi mật độ. Quadtree **thích nghi**:
vùng dày vật được chia sâu (nhiều tầng), vùng thưa giữ nông. Nhờ vậy mỗi lá luôn chỉ chứa ~\`capacity\` vật
dù phân bố không đều — query lân cận chỉ duyệt vài lá thay vì cả $n$ vật. Độ sâu cây ~ $O(\\log n)$ khi
phân bố hợp lý.

**(c) Ví dụ trực giác bằng số.** Vùng gốc $400 \\times 400$, \`capacity = 4\`. Chèn vật 1,2,3,4 vào → node gốc
vẫn là lá (4 ≤ 4). Chèn vật thứ 5 → vượt capacity → **subdivide** thành 4 ô con $200 \\times 200$, 5 vật
được phân về 4 con theo vị trí. Truy vấn "ai gần điểm $(50,50)$" → đi xuống chỉ con trên-trái, bỏ qua 3 con kia.

### 4.2 Cấu trúc một node

\`\`\`
QuadNode {
    boundary  : {x, y, w, h}   // vùng chữ nhật node phụ trách
    items     : []Object       // các vật trong node (khi còn là lá)
    divided   : bool           // đã chia 4 chưa
    NW, NE, SW, SE : *QuadNode  // 4 con (nil khi chưa chia)
}
\`\`\`

- **Insert(obj):** nếu obj không nằm trong \`boundary\` → bỏ qua. Nếu còn chỗ (\`len(items) < capacity\`)
  và chưa chia → thêm vào \`items\`. Ngược lại → \`subdivide()\` (nếu chưa) rồi đẩy obj xuống đúng con chứa nó.
- **Subdivide():** tạo 4 con NW/NE/SW/SE, mỗi con là một góc phần tư của \`boundary\`.
- **Query(range):** trả mọi vật giao với vùng \`range\`. Nếu \`range\` không giao \`boundary\` → trả rỗng (cắt nhánh).
  Ngược lại gom \`items\` thoả + đệ quy hỏi 4 con.

### 4.3 Walk-through số — dựng quadtree cho 6 vật, đếm cặp

Vùng gốc $(0,0)$ rộng $400 \\times 400$, \`capacity = 2\`. Chèn 6 vật theo thứ tự:

| Vật | Tâm $(x, y)$ | Góc phần tư của gốc |
|---|---|---|
| P1 | $(50, 50)$ | NW (trên-trái: $x<200, y<200$) |
| P2 | $(80, 120)$ | NW |
| P3 | $(60, 60)$ | NW |
| P4 | $(300, 100)$ | NE (trên-phải: $x \\geq 200, y<200$) |
| P5 | $(350, 350)$ | SE (dưới-phải) |
| P6 | $(40, 350)$ | SW (dưới-trái) |

**Dựng cây từng bước:**

1. Chèn P1, P2 → gốc còn chỗ (2 ≤ capacity 2) → gốc = lá, items = {P1, P2}.
2. Chèn P3 → gốc đầy (đã 2) → **subdivide gốc** thành 4 con $200 \\times 200$. Đẩy P1, P2, P3 xuống con
   theo vị trí: cả ba đều ở **NW** → NW.items = {P1, P2, P3}? Khoan — NW giờ có 3 > capacity 2 → **subdivide NW**
   thành 4 con $100 \\times 100$. P1$(50,50)$→NW-NW, P3$(60,60)$→NW-NW, P2$(80,120)$→NW-SW.
   → NW-NW.items = {P1, P3}; NW-SW.items = {P2}.
3. Chèn P4$(300,100)$ → thuộc NE của gốc → NE.items = {P4}.
4. Chèn P5$(350,350)$ → SE của gốc → SE.items = {P5}.
5. Chèn P6$(40,350)$ → SW của gốc → SW.items = {P6}.

**Cây kết quả:**
\`\`\`
root [0,0,400,400]
├── NW [0,0,200,200]  (đã chia)
│   ├── NW-NW [0,0,100,100]   items = {P1, P3}
│   ├── NW-NE [100,0,100,100] items = {}
│   ├── NW-SW [0,100,100,100] items = {P2}
│   └── NW-SE [100,100,100,100] items = {}
├── NE [200,0,200,200]  items = {P4}   (lá)
├── SW [0,200,200,200]  items = {P6}   (lá)
└── SE [200,200,200,200] items = {P5}   (lá)
\`\`\`

**Đếm cặp ứng viên** (mỗi vật query vùng quanh nó; cặp trong cùng lá + lá giao vùng query):

- P1, P3 cùng lá NW-NW → cặp (P1, P3). **1 cặp.**
- P2 ở NW-SW một mình; query vùng quanh P2 có thể chạm NW-NW (kề trên) → kiểm P2–P1, P2–P3 nếu đủ gần.
  P2$(80,120)$ cách P1$(50,50)$ là $\\sqrt{30^2+70^2}\\approx76$ px — nếu bán kính nhỏ thì narrow loại, nhưng
  broad vẫn sinh **2 cặp ứng viên** (P2P1, P2P3) do lá kề.
- P4, P5, P6 mỗi vật một lá riêng, cách xa các lá khác → query không giao lá có vật → **0 cặp**.

→ **Tổng cặp ứng viên = 1 + 2 = 3 cặp** (giả định query gộp lá kề).
Nếu chỉ tính cặp **trong cùng một lá** (mô hình tối giản) thì chỉ **1 cặp** (P1,P3).

**So với so mọi cặp:** $\\binom{6}{2} = 15$ cặp.

→ Quadtree cắt từ **15 xuống 1–3 cặp**. Mấu chốt: vùng đông (NW có 3 vật) tự chia sâu để tách P1,P3 khỏi P2;
vùng thưa (NE, SE, SW mỗi nơi 1 vật) giữ lá to, không sinh cặp nào.

> ❓ **Câu hỏi tự nhiên.**
> - *"Capacity nên đặt bao nhiêu?"* — Thường 4–8. Quá nhỏ (1) → cây chia quá sâu, tốn node và con trỏ. Quá lớn →
>   lá chứa nhiều vật → trong lá lại gần $O(k^2)$. 4 là điểm khởi đầu tốt.
> - *"Vật nằm vắt qua đường chia 4 thì sao?"* — Vấn đề thật. Hai cách: (1) chỉ dùng **tâm** vật để quyết định con
>   (đơn giản, nhưng query phải xét lá kề như grid xét ô kề); (2) cho vật **trùng ở nhiều node** (loose quadtree) —
>   tốn bộ nhớ hơn nhưng query gọn. Bản tối giản dùng cách (1).

### 4.4 Liên hệ DataStructures

Quadtree **chính là một cây** — node, con, lá, đệ quy lấy nguyên từ
[Tree](../../../DataStructures/02-Intermediate/lesson-01-tree/). So với cây nhị phân (BST, 2 con, chia theo
*giá trị*), quadtree có **4 con** và chia theo *vùng không gian 2D*. Nó cùng họ với các cấu trúc phân hoạch
không gian nâng cao ([advanced structures](../../../DataStructures/03-Advanced/lesson-04-advanced-structures/)):
k-d tree (chia luân phiên theo trục x/y, 2 con), octree (3D, 8 con), BVH (bao theo hộp bao), R-tree (CSDL không gian).
Độ sâu quadtree cân bằng ~ $O(\\log_4 n)$ — cùng tinh thần "chia để trị" với $O(\\log n)$ của BST cân bằng (xem [Algorithms](../../../Algorithms/)).

> 🔁 **Dừng lại tự kiểm tra.** Nếu \`capacity = 4\` thay vì 2 trong ví dụ §4.3, node gốc có phải chia không khi
> chèn đủ 6 vật (4 ở NW, 1 NE, 1 SE)? Wait — đếm lại: P1,P2,P3 ở NW; P4 NE; P5 SE; P6 SW. Gốc chứa được mấy?
> <details><summary>Đáp án</summary>
> Với capacity 4: chèn P1..P4 → gốc có 4 vật = capacity, vẫn là lá. Chèn P5 (vật thứ 5) → vượt 4 → subdivide gốc, phân P1..P5 về 4 con (NW có P1,P2,P3 = 3 vật ≤ 4 nên NW **không** chia tiếp). Chèn P6 → SW. Cây nông hơn hẳn so với capacity 2 — đó là đánh đổi: capacity lớn → cây nông, lá đông; capacity nhỏ → cây sâu, lá thưa.
> </details>

> ⚠ **Lỗi thường gặp — quadtree dựng lại mỗi frame tốn.** Vật bay liên tục nên quadtree phải **dựng lại từ
> đầu mỗi frame** (clear + insert lại $n$ vật). Chi phí dựng = $O(n \\log n)$. Nếu vật di chuyển ít, người ta
> dùng quadtree "cập nhật tại chỗ" (chỉ move vật đổi ô) thay vì dựng lại — nhưng phức tạp hơn. Đừng quên: lợi
> ích query nhanh phải trừ đi chi phí dựng lại; với $n$ nhỏ, grid đơn giản còn nhanh hơn vì không có overhead cây.

> 📝 **Tóm tắt mục 4.**
> - Quadtree = cây 4 con; node vượt \`capacity\` thì chia 4 góc phần tư, đệ quy.
> - **Thích nghi mật độ:** vùng đông chia sâu, vùng thưa giữ nông.
> - Query lân cận: cắt nhánh không giao vùng → chỉ duyệt vài lá thay vì $n$ vật.
> - Chi phí dựng lại mỗi frame $O(n \\log n)$; capacity 4–8; vật vắt biên dùng tâm + xét lá kề.

---

## 5. Sweep and prune (SAP) — sơ lược

> 💡 **Trực giác.** Hình dung bóng đổ của các vật lên trục x (mỗi vật là một đoạn $[x_{\\min}, x_{\\max}]$).
> Hai vật chỉ có thể chạm nếu bóng của chúng **chồng nhau trên trục x**. Sắp tất cả các đầu mút theo x rồi
> "quét" một đường thẳng từ trái sang phải: chỉ những vật mà bóng đang **cùng mở** mới là ứng viên. Vật mà
> bóng đã đóng (đi qua $x_{\\max}$ của nó) thì loại khỏi danh sách "đang mở".

**(a) Là gì.** SAP biểu diễn mỗi vật bằng khoảng bao trên trục x: $[x_{\\min}, x_{\\max}]$ (lấy từ AABB ở L06).
Sắp tất cả $x_{\\min}, x_{\\max}$ tăng dần. Quét qua: gặp $x_{\\min}$ của vật → thêm vật vào tập "đang hoạt động (active)";
gặp $x_{\\max}$ → bỏ vật khỏi active. Khi thêm một vật, nó tạo cặp ứng viên với **mọi vật đang trong active**
(vì bóng x của chúng chồng vật mới).

**(b) Vì sao cần.** Sắp xếp một lần là $O(n \\log n)$; quét là $O(n + k)$ với $k$ = số cặp chồng x. Đặc biệt
mạnh khi vật di chuyển ít giữa các frame — danh sách gần như đã sắp, dùng **insertion sort** để sắp lại chỉ tốn
~$O(n)$ (temporal coherence). Đây là broad-phase phổ biến trong nhiều physics engine (Box2D dùng biến thể).

**(c) Ví dụ trực giác bằng số.** 3 vật, khoảng x:
- A: $[10, 30]$, B: $[25, 50]$, C: $[60, 80]$.
- Sắp đầu mút: $10_A^{\\min}, 25_B^{\\min}, 30_A^{\\max}, 50_B^{\\max}, 60_C^{\\min}, 80_C^{\\max}$.
- Quét: gặp $10$ → active = {A}. Gặp $25$ → thêm B, B chồng mọi vật active {A} → **cặp (A,B)**. active = {A,B}.
  Gặp $30$ → bỏ A → active = {B}. Gặp $50$ → bỏ B → active = {}. Gặp $60$ → thêm C, active rỗng → **không cặp**.
  Gặp $80$ → bỏ C.
- → Ứng viên trên trục x: **chỉ (A,B)**. C bị loại vì bóng x của nó ($[60,80]$) không chồng ai.

> Lưu ý: SAP một trục có thể trả false positive nếu hai vật chồng trên x nhưng tách xa trên y. Khắc phục: SAP cả
> hai trục (lấy giao danh sách), hoặc dùng SAP làm bước thô rồi narrow-phase chốt như thường lệ.

> ❓ **Câu hỏi tự nhiên.** *"SAP, grid, quadtree — chọn cái nào?"* — Phụ thuộc phân bố: vật **trải dài hẹp theo một
> trục** (vd platformer cuộn ngang) → SAP rất hợp. Phân bố **đều 2D** → grid đơn giản, nhanh. Phân bố **cụm không
> đều** (nhiều vật dồn một góc) → quadtree thích nghi tốt nhất. Xem bảng §6.

> 📝 **Tóm tắt mục 5.**
> - SAP: chiếu vật xuống một trục thành đoạn $[\\min,\\max]$, sắp + quét, vật chồng đoạn → ứng viên.
> - $O(n \\log n)$ để sắp; gần $O(n)$ nếu tận dụng coherence (danh sách gần như đã sắp).
> - Một trục có false positive (chồng x nhưng xa y) → kết hợp 2 trục hoặc để narrow-phase chốt.

---

## 6. Đánh đổi giữa các phương pháp

| Tiêu chí | Spatial grid | Quadtree | Sweep and prune |
|---|---|---|---|
| Ý tưởng | ô lưới đều | cây 4 con, chia khi đông | sắp + quét theo trục |
| Phân bố đều | **rất tốt** | tốt (hơi thừa) | tốt |
| Phân bố cụm/không đều | kém (ô đông nghẽn) | **rất tốt** (thích nghi) | trung bình |
| Vật kích thước chênh lệch | kém (cell size khó chọn) | tốt | tốt |
| Cài đặt | **đơn giản nhất** | phức tạp (đệ quy, node) | vừa |
| Chi phí mỗi frame | dựng lại $O(n)$ | dựng lại $O(n\\log n)$ | sắp $O(n\\log n)$, hoặc ~$O(n)$ nếu coherence |
| Bộ nhớ | mảng/hash ô | node + con trỏ (nhiều hơn) | mảng đầu mút |

**Chốt thực dụng:**
- Vật phân bố đều, kích thước gần nhau, $n$ vừa → **grid** (đơn giản, đủ nhanh). Mặc định nên thử đầu tiên.
- Vật dồn cụm, mật độ rất chênh, $n$ lớn → **quadtree** (thích nghi).
- Vật trải theo một trục, di chuyển ít giữa frame → **SAP** (tận dụng coherence).

> ⚠ **Lỗi thường gặp — sinh cặp trùng.** Cả ba phương pháp đều có thể sinh **cùng một cặp nhiều lần**
> (A xét ô/lá của B *và* B xét ô/lá của A; hoặc một cặp xuất hiện ở nhiều ô do vật trải qua nhiều ô).
> Test trùng = phí công, và với một số response (L09) còn gây **cộng lực hai lần** → vật giật. **Khử trùng:**
> chỉ ghép cặp khi \`id(A) < id(B)\`, hoặc dồn mọi cặp vào một \`set\` rồi mới chạy narrow-phase một lần mỗi cặp.

> 🔁 **Dừng lại tự kiểm tra.** Một game bắn súng top-down, kẻ địch thường dồn quanh người chơi (một cụm dày), phần
> còn lại bản đồ trống. Nên chọn broad-phase nào?
> <details><summary>Đáp án</summary>
> **Quadtree.** Vì mật độ rất không đều (cụm dày quanh player, còn lại trống) — quadtree tự chia sâu ở cụm và giữ nông ở vùng trống, trong khi grid sẽ có một ô siêu đông (gần $O(k^2)$ trong ô đó) còn các ô khác trống lãng phí.
> </details>

> 📝 **Tóm tắt mục 6.**
> - Grid = đơn giản nhất, tốt cho phân bố đều; quadtree = thích nghi cụm; SAP = hợp trục + coherence.
> - Mọi phương pháp đều tốn chi phí **dựng lại mỗi frame** — phải tính vào tổng lợi ích.
> - Luôn **khử cặp trùng** trước khi đưa sang narrow-phase.

---

## 7. Broad-phase nằm ở đâu trong pipeline va chạm

Một frame xử lý va chạm gồm 3 bước nối tiếp:

\`\`\`
1. BROAD-PHASE  (bài này)
   → dựng grid/quadtree/SAP, sinh DANH SÁCH CẶP ỨNG VIÊN (đã khử trùng)
                │
                ▼
2. NARROW-PHASE  (L06 AABB & Circle)
   → với mỗi cặp ứng viên: test chính xác overlap; nếu chạm → tính độ xuyên sâu, pháp tuyến
                │
                ▼
3. RESPONSE  (L09 Impulse)
   → với mỗi cặp CHẠM THẬT: tính xung lực, tách hai vật ra, cập nhật vận tốc
\`\`\`

- Broad-phase (bài này) chỉ làm bước 1: **rẻ + có thể false positive**, mục tiêu cắt số cặp.
- [L06 — AABB & Circle](../lesson-01-aabb-circle/) làm bước 2: chính xác, đắt, chạy trên ít cặp nhờ broad-phase.
- [L09 — Collision Response (Impulse)](../lesson-04-collision-response-impulse/) làm bước 3: chỉ chạy trên cặp chạm thật.

Liên hệ rộng: cấu trúc dữ liệu lấy từ [DataStructures](../../../DataStructures/) (cây, hash map cho ô lưới),
phân tích chi phí $O(n^2) \\to O(n\\log n)$ lấy từ [Algorithms](../../../Algorithms/). Broad-phase là ví dụ điển hình
"dùng đúng cấu trúc dữ liệu để hạ độ phức tạp thuật toán".

---

## 8. Bài tập

**Bài 1.** Với $n = 2000$ vật, tính số cặp khi so mọi cặp ($\\binom{n}{2}$). So sánh với $n = 1000$ — gấp mấy lần?
Giải thích vì sao "gấp đôi vật, gấp bốn chi phí".

**Bài 2.** Cell size $s = 64$. Tính ô (col, row) cho các vật tại: $(0,0)$, $(63, 63)$, $(64, 0)$, $(200, 130)$.

**Bài 3.** (Tự đếm cặp — grid) Lưới cell size $s = 100$. Đặt 5 vật:
P1$(20,20)$, P2$(40,40)$, P3$(160,30)$, P4$(170,50)$, P5$(330,330)$. Liệt kê vật theo ô, rồi đếm số cặp
ứng viên (cùng ô + ô kề). So với $\\binom{5}{2}$.

**Bài 4.** Giải thích bằng một ví dụ số (đặt toạ độ cụ thể) vì sao **chỉ xét cùng-ô** có thể bỏ sót một cặp
chạm thật, và xét ô kề thì cứu được.

**Bài 5.** (Tự đếm cặp — quadtree) Vùng gốc $400 \\times 400$, \`capacity = 1\`. Chèn theo thứ tự:
A$(50,50)$, B$(60,60)$, C$(300,300)$. Vẽ cây sau mỗi lần chèn (node nào chia, vật về con nào), rồi đếm
cặp ứng viên (cặp trong cùng lá).

**Bài 6.** SAP một trục. 4 vật với khoảng x: A$[0,20]$, B$[15,35]$, C$[30,40]$, D$[100,120]$. Sắp đầu mút,
quét, liệt kê các cặp ứng viên trên trục x.

**Bài 7.** Một game có vật **dồn cụm dày ở giữa màn**, phần rìa trống. Giải thích vì sao grid kém và quadtree
tốt ở đây; ước lượng (định tính) số cặp trong ô trung tâm của grid nếu 80% vật dồn vào 1 ô.

**Bài 8.** Vì sao broad-phase được phép trả về cặp không chạm (false positive) nhưng tuyệt đối **không** được bỏ
sót cặp chạm (false negative)? Hậu quả của mỗi loại lỗi là gì?

---

## Lời giải chi tiết

### Bài 1

$\\binom{2000}{2} = \\dfrac{2000 \\times 1999}{2} = 1{.}999{.}000 \\approx$ **2 triệu cặp.**
$\\binom{1000}{2} = 499{.}500 \\approx$ 500k cặp.
Tỷ lệ: $1{.}999{.}000 / 499{.}500 \\approx \\mathbf{4{,}0}$ lần.

Vì sao gấp đôi vật → gấp bốn chi phí: $\\binom{n}{2} = \\frac{n(n-1)}{2} \\approx \\frac{n^2}{2}$ với $n$ lớn.
Thay $n \\to 2n$: $\\frac{(2n)^2}{2} = \\frac{4n^2}{2}$ = gấp 4. Đây là bản chất $O(n^2)$ — chi phí tỉ lệ bình phương số vật.

### Bài 2

$s = 64$, $\\text{col} = \\lfloor x/64 \\rfloor$, $\\text{row} = \\lfloor y/64 \\rfloor$:

| Vật | $\\lfloor x/64 \\rfloor$ | $\\lfloor y/64 \\rfloor$ | Ô |
|---|---|---|---|
| $(0,0)$ | 0 | 0 | (0,0) |
| $(63,63)$ | 0 | 0 | (0,0) — chưa tới 64 |
| $(64,0)$ | 1 | 0 | (1,0) — vừa qua biên |
| $(200,130)$ | $\\lfloor 3{,}125 \\rfloor = 3$ | $\\lfloor 2{,}03 \\rfloor = 2$ | (3,2) |

### Bài 3

$s = 100$. Tính ô từng vật:
- P1$(20,20)$ → (0,0); P2$(40,40)$ → (0,0); P3$(160,30)$ → (1,0); P4$(170,50)$ → (1,0); P5$(330,330)$ → (3,3).

Gom ô: (0,0)={P1,P2}; (1,0)={P3,P4}; (3,3)={P5}.

Đếm cặp ứng viên (cùng ô + ô kề):
- Trong (0,0): cặp (P1,P2) → **1**.
- Trong (1,0): cặp (P3,P4) → **1**.
- (0,0) kề (1,0) → cặp chéo: P1–P3, P1–P4, P2–P3, P2–P4 → **4**.
- (3,3) một mình, không ô kề có vật → **0**.

Tổng ứng viên = $1 + 1 + 4 = \\mathbf{6}$ cặp.
So mọi cặp: $\\binom{5}{2} = 10$. Grid cắt 10 → 6 (giảm 40%). Lưu ý ô (0,0) và (1,0) kề nhau nên sinh nhiều
cặp chéo — nếu cell size lớn hơn cụm vật, lợi ích giảm.

### Bài 4

$s = 100$. Đặt A$(98, 200)$ và B$(103, 200)$, bán kính $r = 10$ mỗi vật.
- Khoảng cách tâm = $|103 - 98| = 5$ px $< 2r = 20$ → **chạm thật**.
- Ô của A: $\\lfloor 98/100 \\rfloor = 0$ → cột 0. Ô của B: $\\lfloor 103/100 \\rfloor = 1$ → cột 1. **Khác ô!**
- Nếu chỉ so cùng-ô → A và B không bao giờ được ghép → **bỏ sót cặp chạm thật** (false negative).
- Xét ô kề: ô (1, *) là ô kề ngay phải của ô (0, *) → khi xử lý A ta xét cả ô kề (1,2) chứa B → cặp (A,B)
  được sinh → narrow-phase xác nhận chạm. **Cứu được.** (Điều kiện đủ: $s \\geq 2r = 20$, ở đây $100 \\geq 20$ ✓.)

### Bài 5

Vùng gốc $400 \\times 400$, \`capacity = 1\`:

1. Chèn A$(50,50)$ → gốc là lá, items={A}.
2. Chèn B$(60,60)$ → gốc đầy (1) → **subdivide gốc** thành 4 con $200 \\times 200$. A và B đều ở NW
   ($x<200,y<200$) → NW giờ có {A,B}, vượt capacity 1 → **subdivide NW** thành 4 con $100 \\times 100$.
   A$(50,50)$→NW-NW, B$(60,60)$→NW-NW. NW-NW giờ có {A,B}, lại vượt 1 → **subdivide NW-NW** thành con
   $50 \\times 50$. A$(50,50)$→ con (1,1) của NW-NW [50,50,50,50]; B$(60,60)$→ cùng con [50,50,50,50].
   Vẫn cùng con → chia tiếp $25 \\times 25$: A$(50,50)$→[50,50,25,25], B$(60,60)$→[50,50,25,25] vẫn chung →
   tiếp tục chia tới khi tách ($12{,}5$): A→[50,50,12.5,12.5], B$(60,60)$→[62.5..] khác con → **tách**.
   (Bài học: capacity 1 + hai vật rất gần → cây chia rất sâu. Đây là **lý do không nên dùng capacity 1**.)
3. Chèn C$(300,300)$ → SE của gốc → SE lá, items={C}.

Đếm cặp ứng viên (cặp trong cùng lá): sau khi tách, A và B nằm ở hai lá khác nhau nhưng **kề sát** —
nếu chỉ tính "cùng lá" thì **0 cặp** (và đó là bug: A,B cách 14 px có thể chạm!). Đây minh hoạ vì sao
quadtree query cũng phải **gom lá kề/giao vùng** chứ không chỉ cùng lá — y như grid xét ô kề. Nếu tính
gộp lá giao vùng quanh A thì có **1 cặp (A,B)**. C luôn riêng → 0.
So mọi cặp: $\\binom{3}{2}=3$.

### Bài 6

Khoảng x: A$[0,20]$, B$[15,35]$, C$[30,40]$, D$[100,120]$.
Đầu mút sắp tăng: $0_A^{\\min}, 15_B^{\\min}, 20_A^{\\max}, 30_C^{\\min}, 35_B^{\\max}, 40_C^{\\max}, 100_D^{\\min}, 120_D^{\\max}$.

Quét:
- $0$: active={A}.
- $15$: thêm B → B chồng active {A} → **cặp (A,B)**. active={A,B}.
- $20$: bỏ A → active={B}.
- $30$: thêm C → C chồng active {B} → **cặp (B,C)**. active={B,C}.
- $35$: bỏ B → active={C}.
- $40$: bỏ C → active={}.
- $100$: thêm D → active rỗng → không cặp. active={D}.
- $120$: bỏ D.

Cặp ứng viên trên trục x: **(A,B) và (B,C)**. Lưu ý A và C **không** thành cặp (bóng $[0,20]$ và $[30,40]$
không chồng) — đúng. D tách hẳn → không cặp. So mọi cặp $\\binom{4}{2}=6$ → SAP cắt còn 2.

### Bài 7

Grid kém vì cell size cố định: nếu 80% vật ($0{,}8n$) dồn vào **một ô trung tâm**, thì riêng ô đó sinh
$\\binom{0{,}8n}{2} \\approx \\frac{(0{,}8n)^2}{2} = 0{,}32 n^2$ cặp — vẫn là $O(n^2)$! Các ô rìa trống chẳng cắt được gì.
Ví dụ $n=1000$, 800 vật một ô → $\\binom{800}{2}=319{.}600$ cặp chỉ trong ô đó — gần bằng so mọi cặp (500k).
Grid **không cứu** được phân bố cụm.

Quadtree tốt vì **thích nghi**: ô trung tâm đông sẽ tự chia 4, rồi 16, rồi 64... cho tới khi mỗi lá chỉ còn
~capacity vật. 800 vật cụm sẽ chia thành nhiều lá nhỏ, mỗi lá ~4 vật → tổng cặp ~ $\\frac{800}{4} \\times \\binom{4}{2}
= 200 \\times 6 = 1{.}200$ cặp (cùng lá) thay vì 319.600. Vùng rìa trống giữ lá to, không tốn node thừa.

### Bài 8

- **False positive (báo nhầm có thể chạm):** cặp thực ra không chạm vẫn bị đưa sang narrow-phase →
  chỉ tốn thêm **một test chính xác** rồi bị loại. Hậu quả: **phí một chút CPU**, không sai kết quả. Chấp nhận được —
  đây là cái giá để broad-phase chạy nhanh.
- **False negative (bỏ sót cặp chạm thật):** hai vật chạm nhau nhưng broad-phase không đưa vào ứng viên →
  narrow-phase không bao giờ thấy → game **không phát hiện va chạm** → vật **xuyên qua nhau** (đạn lọt
  qua tường, nhân vật rơi xuyên sàn). Hậu quả: **sai gameplay, bug nhìn thấy được.** Không chấp nhận được.

→ Vì vậy broad-phase phải **bảo toàn (conservative)**: thà giữ thừa cặp (false positive) còn hơn bỏ sót
(false negative). Đó là lý do bắt buộc xét ô kề (grid) và gom lá giao vùng (quadtree).

---

## Tham khảo và bài tiếp theo

- Bài trước (narrow-phase, chạy sau broad-phase): [L06 — AABB & Circle](../lesson-01-aabb-circle/).
- **Bài tiếp theo:** [L09 — Collision Response (Impulse)](../lesson-04-collision-response-impulse/) —
  sau khi broad-phase + narrow-phase tìm ra cặp chạm thật, bước này tính xung lực và tách hai vật.
- Cấu trúc dữ liệu nền:
  - [Tree](../../../DataStructures/02-Intermediate/lesson-01-tree/) — quadtree là cây 4 con.
  - [Advanced structures](../../../DataStructures/03-Advanced/lesson-04-advanced-structures/) — k-d tree, BVH, R-tree cùng họ phân hoạch không gian.
- Phân tích độ phức tạp $O(n^2) \\to O(n\\log n)$: [Algorithms](../../../Algorithms/).
- Minh họa tương tác: [visualization.html](./visualization.html) — quadtree động (vật bay, ô tự chia/gộp), spatial grid tô ô có vật, và đồ thị số phép so sánh $n^2$ vs broad-phase theo $N$.
`;
