# Lesson 08 — Phương pháp chứng minh

## Mục tiêu

- Phân loại **5 phương pháp chứng minh** chính: trực tiếp, phản chứng, phản đảo, quy nạp, xây dựng.
- Khi nào dùng phương pháp nào.
- Ví dụ kinh điển cho mỗi phương pháp.

## Kiến thức tiền đề

- [Lesson 06 — Quy nạp](../lesson-06-induction/), [Lesson 07 — Logic](../lesson-07-logic-sets-maps/).

---

## 1. Chứng minh trực tiếp (Direct proof)

💡 **Trực giác / Hình dung**: chứng minh trực tiếp là "đi thẳng từ A tới B" — bắt đầu từ giả thiết P, biến đổi từng bước hợp lệ cho tới khi ra kết luận Q. Như giải toán theo lối đi xuôi, không vòng vo.

**Mẫu**: Cần chứng minh P → Q. Giả sử P, suy ra từng bước đến Q.

**Ví dụ**: CM "Nếu n là số chẵn thì n² chẵn".
- Giả sử n chẵn → n = 2k.
- n² = (2k)² = 4k² = 2·(2k²) → chia hết 2 → chẵn. □

⟶ Đơn giản nhất, dùng khi suy luận thẳng được.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Khi nào trực tiếp 'không đi được'?"* Khi từ P khó suy ra Q (vd Q là mệnh đề phủ định "không tồn tại"). Lúc đó chuyển sang phản đảo hoặc phản chứng.
- *"Viết `n = 2k` là 'giả sử' hay 'định nghĩa'?"* Đây là **dùng định nghĩa số chẵn**: mọi số chẵn viết được dạng 2k. Không phải giả sử thêm — chỉ khai triển giả thiết P.

🔁 **Dừng lại tự kiểm tra**

1. CM trực tiếp: tổng 2 số chẵn là số chẵn.

<details><summary>Đáp án</summary>

1. a = 2m, b = 2n → a+b = 2(m+n) → chẵn. □

</details>

### 📝 Tóm tắt mục 1

- Trực tiếp: từ P, biến đổi hợp lệ tới Q.
- Dùng định nghĩa (số chẵn = 2k...) để khai triển giả thiết.
- Đơn giản nhất; dùng khi suy luận xuôi được.

---

## 2. Chứng minh phản đảo (Contrapositive)

💡 **Trực giác / Hình dung**: `P → Q` và `¬Q → ¬P` là **cùng một sự thật nhìn từ hai phía**. "Mưa → ướt đường" giống hệt "đường khô → trời không mưa". Khi chứng minh chiều thuận khó, lật sang phản đảo có khi dễ hơn hẳn.

**Logic**: P → Q tương đương ¬Q → ¬P.

⟶ Đôi khi ¬Q → ¬P **dễ chứng minh hơn** P → Q.

**Ví dụ**: CM "Nếu n² lẻ thì n lẻ".
- Phản đảo: "Nếu n chẵn thì n² chẵn" (đã CM ở 1).
- Vậy ban đầu cũng đúng. □

❓ **Câu hỏi tự nhiên của người đọc**

- *"Phản đảo khác phản chứng chỗ nào?"* Phản đảo chứng minh **trực tiếp** mệnh đề `¬Q → ¬P` (tương đương logic). Phản chứng giả sử cả P lẫn ¬Q rồi tìm mâu thuẫn. Phản đảo gọn hơn khi áp dụng được.
- *"Vì sao 'n² lẻ → n lẻ' khó chứng minh trực tiếp?"* Từ "n² lẻ" khó suy thẳng tính chất của n. Nhưng phản đảo "n chẵn → n² chẵn" thì n = 2k cho ngay.

⚠ **Lỗi thường gặp — lấy đảo `Q → P` thay vì phản đảo `¬Q → ¬P`**. Chỉ phản đảo mới tương đương với `P → Q`. Phản ví dụ: "n chia hết 4 → n chẵn" đúng; đảo "n chẵn → n chia hết 4" SAI (n=6); nhưng phản đảo "n lẻ → n không chia hết 4" đúng.

🔁 **Dừng lại tự kiểm tra**

1. Viết phản đảo của "Nếu x² ≠ 0 thì x ≠ 0".

<details><summary>Đáp án</summary>

1. "Nếu x = 0 thì x² = 0" (đổi cả 2 vế thành phủ định và đảo chiều).

</details>

### 📝 Tóm tắt mục 2

- `P → Q` tương đương phản đảo `¬Q → ¬P` (không phải đảo `Q → P`).
- Dùng khi chiều phản đảo dễ chứng minh hơn.
- Vẫn là chứng minh trực tiếp, chỉ trên mệnh đề tương đương.

---

## 3. Chứng minh phản chứng (Proof by contradiction)

💡 **Trực giác / Hình dung**: phản chứng giống "thử giả định điều ngược lại rồi thấy nó dẫn tới điều vô lý". Như muốn chứng minh "không có ngày tận thế hôm qua": giả sử có → thì hôm nay ta không tồn tại → mâu thuẫn (ta đang đọc) → giả định sai. Đặc biệt mạnh cho mệnh đề phủ định ("không tồn tại", "X không phải Y").

🎯 **Mẫu**: Cần CM P. Giả sử **¬P**, suy ra mâu thuẫn → ¬P sai → P đúng.

> 📐 **Định nghĩa đầy đủ — Chứng minh phản chứng**
>
> **(a) Là gì**: Để chứng minh P đúng, giả sử ngược lại (¬P), suy luận đến 1 mâu thuẫn (1 mệnh đề luôn sai, hoặc trái giả thiết, hoặc trái 1 định lý đã biết). Vì logic không cho phép cả P và ¬P cùng sai, kết luận ¬P sai → P đúng. Tiếng Latin: "reductio ad absurdum".
>
> **(b) Vì sao cần**: Đôi khi chứng minh trực tiếp P rất khó, nhưng giả sử ¬P và "đập" nó dễ hơn. Đặc biệt mạnh cho mệnh đề **phủ định** ("X KHÔNG phải Y", "không tồn tại X thoả Y"). Ví dụ kinh điển √2 vô tỉ: trực tiếp khó (làm sao chứng minh "không có a/b"?), nhưng phản chứng cho ngay kết quả. Tương tự: vô hạn số nguyên tố (Euclid), không có hàm liên tục tại mọi điểm hữu tỉ và gián đoạn tại mọi điểm vô tỉ. Cảnh báo: phản chứng không cho ví dụ cụ thể — chỉ chứng minh sự tồn tại/không tồn tại.
>
> **(c) Ví dụ số**: CM √2 vô tỉ. Giả sử √2 = a/b tối giản → 2b² = a² → a chẵn → a = 2c → b² = 2c² → b chẵn → 2|gcd(a,b) trái tối giản. ✓. CM vô hạn nguyên tố: giả sử hữu hạn p₁,...,pₙ. Xét N = p₁·...·pₙ + 1. N chia mỗi pᵢ dư 1 → N có ước nguyên tố mới → trái giả thiết. CM √3 vô tỉ (tương tự): nếu √3 = a/b tối giản, 3b² = a² → 3|a → a = 3c → b² = 3c² → 3|b → trái tối giản.

### Ví dụ kinh điển — √2 vô tỉ

CM √2 không phải số hữu tỉ.

**Phản chứng**: Giả sử √2 = a/b với a, b ∈ ℤ, gcd(a,b) = 1 (phân số tối giản).

- √2 = a/b → 2 = a²/b² → a² = 2b² → a² chẵn → a chẵn.
- a = 2c → (2c)² = 2b² → 4c² = 2b² → b² = 2c² → b² chẵn → b chẵn.
- Cả a và b chẵn → 2 | gcd(a, b) → gcd ≠ 1.
- **MÂU THUẪN** với gcd(a,b) = 1. □

⟶ Phản chứng cực hiệu quả cho mệnh đề **phủ định** (X không phải Y).

### Ví dụ thứ 2 — Vô hạn số nguyên tố (Euclid)

(Đã CM ở L02 — đó là phản chứng kinh điển.)

❓ **Câu hỏi tự nhiên của người đọc**

- *"Mâu thuẫn phải là gì mới hợp lệ?"* Bất kỳ điều luôn sai: trái giả thiết (`gcd=1` mà ra `gcd≠1`), trái định lý đã biết, hoặc `0 = 1`. Miễn là 1 mệnh đề không thể đúng.
- *"Vì sao √2 vô tỉ phải dùng phản chứng?"* Vì "vô tỉ" = "KHÔNG viết được a/b" — mệnh đề phủ định. Chứng minh trực tiếp "không tồn tại a/b" rất khó; giả sử có rồi đập thì dễ.

⚠ **Lỗi thường gặp — quên giả định "tối giản" hoặc dùng sai mâu thuẫn**. Trong CM √2 vô tỉ, BẮT BUỘC giả sử `a/b` tối giản (gcd(a,b)=1); mâu thuẫn chính là "cả a, b đều chẵn → gcd ≥ 2". Bỏ điều kiện tối giản thì không có mâu thuẫn → chứng minh hỏng.

🔁 **Dừng lại tự kiểm tra**

1. Trong CM √2 vô tỉ, từ `a² = 2b²` suy ra a chẵn thế nào?
2. Mâu thuẫn cuối cùng của chứng minh √2 vô tỉ là gì?

<details><summary>Đáp án</summary>

1. `a² = 2b²` chẵn → a² chẵn → a chẵn (vì bình phương số lẻ là lẻ).
2. Cả a và b đều chẵn → `2 | gcd(a,b)`, trái giả thiết `gcd(a,b) = 1`.

</details>

### 📝 Tóm tắt mục 3

- Phản chứng: giả sử ¬P, suy ra mâu thuẫn → P đúng.
- Mạnh nhất cho mệnh đề phủ định / "không tồn tại" (√2 vô tỉ, vô hạn nguyên tố).
- Phải có giả định đầy đủ (vd "tối giản") để mâu thuẫn xuất hiện.

---

## 4. Chứng minh xây dựng (Constructive)

💡 **Trực giác / Hình dung**: muốn chứng minh "có tồn tại 1 con voi biết nhảy" thì cách chắc chắn nhất là **dắt ra 1 con voi đang nhảy**. Chứng minh xây dựng = đưa ra ví dụ cụ thể, không lý luận vòng vo. Mạnh ở chỗ cho luôn "vật chứng".

🎯 **Mẫu**: CM ∃x: P(x) bằng cách **xây dựng** x cụ thể.

**Ví dụ**: CM ∃ số chẵn là tổng 2 nguyên tố.
- 6 = 3 + 3. □

**Ví dụ phức tạp** — Vô số nguyên tố dạng 4k+3.

CM bằng phản chứng: giả sử hữu hạn p₁, ..., pₙ dạng 4k+3.

Xét N = 4·p₁·p₂·...·pₙ - 1. N có dạng 4k+3 (vì 4·... -1 ≡ -1 ≡ 3 mod 4).
- N > 1 → có ước nguyên tố.
- Mọi ước nguyên tố lẻ ≡ 1 hoặc 3 (mod 4).
- Nếu tất cả ước ≡ 1 (mod 4): tích ≡ 1 (mod 4), mâu thuẫn N ≡ 3.
- → Có ước p ≡ 3 (mod 4), nhưng p ≠ pᵢ (vì pᵢ | (N + 1) nhưng p | N).
- Mâu thuẫn. □

❓ **Câu hỏi tự nhiên của người đọc**

- *"Chứng minh xây dựng vs không-xây-dựng khác gì?"* Xây dựng cho **ví dụ cụ thể** (6 = 3+3). Không-xây-dựng (như bài a^b hữu tỉ ở mục bài tập) chỉ chứng minh "có tồn tại" mà KHÔNG chỉ ra cái nào — yếu hơn về thông tin.
- *"Khi nào chọn xây dựng?"* Khi mệnh đề là `∃x: P(x)` và bạn đoán/tìm được 1 x cụ thể. Nhanh và thuyết phục nhất.

⚠ **Lỗi thường gặp**: với mệnh đề `∃`, đi chứng minh trừu tượng dài dòng trong khi chỉ cần 1 ví dụ. Phản ví dụ: "tồn tại số nguyên tố chẵn" — chỉ cần nói **2** là xong, không cần lý luận gì thêm.

🔁 **Dừng lại tự kiểm tra**

1. CM xây dựng: tồn tại số tự nhiên vừa là bình phương vừa là lập phương.

<details><summary>Đáp án</summary>

1. `64 = 8² = 4³` (hoặc 1 = 1² = 1³, hoặc 729 = 27² = 9³). □

</details>

### 📝 Tóm tắt mục 4

- Xây dựng: chứng minh `∃x: P(x)` bằng cách đưa ra x cụ thể.
- Mạnh nhất về thông tin (cho luôn "vật chứng").
- Với `∃`, ưu tiên tìm 1 ví dụ thay vì lý luận trừu tượng.

---

## 5. Chứng minh quy nạp

💡 **Trực giác / Hình dung**: quy nạp = domino (xem L06). Dùng riêng cho mệnh đề `∀n ∈ ℕ: P(n)` — chứng minh cơ sở + bước chuyển tiếp.

(Đã học ở L06.)

⟶ Dùng cho mệnh đề về số tự nhiên.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Khi nào chọn quy nạp thay phản chứng/trực tiếp?"* Khi mệnh đề có dạng "∀n tự nhiên" và P(k+1) liên hệ được với P(k). Vd công thức tổng, bất đẳng thức theo n, chia hết theo n.

### 📝 Tóm tắt mục 5

- Quy nạp dành cho mệnh đề về số tự nhiên (`∀n ∈ ℕ`).
- Khung: cơ sở + bước `P(k) → P(k+1)`; chi tiết ở L06.
- Chọn khi P(k+1) nối được với các bước trước.

---

## 6. Chứng minh không-tồn-tại (Non-existence)

💡 **Trực giác / Hình dung**: để chứng minh "không có nghiệm", tìm một "bộ lọc" (vd xét mod m) mà mọi nghiệm khả dĩ đều bị loại. Như chứng minh "không ai cao 5 mét" bằng cách chỉ ra giới hạn sinh học. Modular argument là bộ lọc mạnh nhất cho phương trình số nguyên.

Phổ biến dùng **phản chứng**: giả sử tồn tại → mâu thuẫn.

**Ví dụ**: CM PT x² + y² = 4·z + 3 không có nghiệm nguyên.

- Xét mod 4. Số chính phương mod 4 ∈ {0, 1}.
- x² + y² mod 4 ∈ {0, 1, 2}.
- 4z + 3 mod 4 = 3.
- 3 ∉ {0, 1, 2}. → **Vô nghiệm**. □

⟶ Kỹ thuật "**modular arithmetic argument**" — kinh điển.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao số chính phương mod 4 chỉ ∈ {0,1}?"* Số chẵn `(2k)² = 4k² ≡ 0`; số lẻ `(2k+1)² = 4k²+4k+1 ≡ 1`. Không có khả năng khác → mod 4 chỉ ra 0 hoặc 1.
- *"Chọn mod mấy để loại?"* Thử mod nhỏ (3, 4, 8...) sao cho vế trái và vế phải có tập số dư khả dĩ **không giao nhau** → vô nghiệm.

⚠ **Lỗi thường gặp**: liệt kê thiếu các số dư khả dĩ. Phải kiểm **mọi** trường hợp. Phản ví dụ tư duy: nếu chỉ xét x chẵn (bỏ x lẻ) thì kết luận sai. Ở đây x² ∈ {0,1}, y² ∈ {0,1} → tổng ∈ {0,1,2} đã đủ MỌI tổ hợp.

🔁 **Dừng lại tự kiểm tra**

1. Các giá trị `x² mod 4` có thể nhận?
2. Vì sao `x² + y² = 4z + 3` vô nghiệm nhưng `x² + y² = 4z + 2` thì có?

<details><summary>Đáp án</summary>

1. `{0, 1}` (chẵn → 0, lẻ → 1).
2. Tổng `x²+y² mod 4 ∈ {0,1,2}`. `4z+3 ≡ 3` không nằm trong → vô nghiệm. `4z+2 ≡ 2` ∈ tập → có thể có (vd x=y=1: 1+1=2 ✓).

</details>

### 📝 Tóm tắt mục 6

- Chứng minh vô nghiệm: dùng phản chứng + xét mod m làm "bộ lọc".
- Số chính phương `mod 4 ∈ {0,1}` → `x²+y² mod 4 ∈ {0,1,2}`, loại được vế ≡ 3.
- Phải liệt kê **đầy đủ** các số dư khả dĩ.

---

## 7. So sánh các phương pháp

| Phương pháp | Khi dùng | Ưu điểm |
|-------------|----------|---------|
| Trực tiếp | P → Q rõ ràng | Đơn giản, sạch |
| Phản đảo | ¬Q → ¬P dễ hơn | Đôi khi cứu cánh |
| Phản chứng | Mệnh đề phủ định, "không tồn tại" | Mạnh, đa năng |
| Xây dựng | "Tồn tại" | Cho ví dụ cụ thể |
| Quy nạp | Mệnh đề về ℕ | Bài bản |

💡 **Quy tắc thực hành**:
1. Đọc kỹ mệnh đề. Đó là P → Q? ∃? ∀? Phủ định?
2. Thử trực tiếp.
3. Nếu khó: thử phản đảo / phản chứng.
4. Nếu về ℕ: quy nạp.
5. Nếu là ∃: cố tìm 1 ví dụ.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Một mệnh đề có thể chứng minh bằng nhiều cách không?"* Có. `√2 vô tỉ` thường dùng phản chứng, nhưng cũng chứng minh được bằng định lý nghiệm hữu tỉ. Chọn cách **gọn và rõ** nhất.
- *"Gặp 'không tồn tại nghiệm' nên dùng gì đầu tiên?"* Thử modular argument (mục 6) hoặc phản chứng — hai vũ khí mạnh nhất cho mệnh đề phủ định.

🔁 **Dừng lại tự kiểm tra**

1. Mệnh đề "∃ số vô tỉ a, b: a^b hữu tỉ" nên thử phương pháp nào?
2. "Nếu n² chẵn thì n chẵn" — phương pháp gọn nhất?

<details><summary>Đáp án</summary>

1. Xây dựng / không-xây-dựng (đây là `∃`) — xem bài 5.
2. Phản đảo: "n lẻ → n² lẻ" (n = 2k+1 → n² = 4k²+4k+1 lẻ). □

</details>

### 📝 Tóm tắt mục 7

- Trực tiếp (P→Q rõ), phản đảo (¬Q→¬P dễ hơn), phản chứng (phủ định), xây dựng (∃), quy nạp (∀ℕ).
- Quy trình chọn: đọc dạng mệnh đề → thử trực tiếp → khó thì phản đảo/phản chứng.
- Một mệnh đề có thể có nhiều chứng minh — chọn cái gọn rõ nhất.

---

### Bài tập

**Bài 1**: CM tổng 2 số nguyên tố lẻ là chẵn (chứng minh trực tiếp).

**Bài 2**: CM nếu 3 | n² thì 3 | n (phản đảo).

**Bài 3**: CM √3 vô tỉ (phản chứng).

**Bài 4**: PT x² + y² = 4n + 3 vô nghiệm (modular).

**Bài 5**: CM tồn tại 2 số vô tỉ a, b sao cho a^b hữu tỉ. (Khó: chứng minh tồn tại không cần ví dụ cụ thể.)

### Lời giải

**Bài 1**: a, b nguyên tố lẻ → a = 2k+1, b = 2m+1 → a+b = 2(k+m+1) → chẵn. □

**Bài 2**: Phản đảo: nếu 3 ∤ n thì 3 ∤ n².  
- n không chia hết 3 → n ≡ 1 hoặc 2 (mod 3).  
- n² ≡ 1² = 1 hoặc 2² = 4 ≡ 1 (mod 3).  
- → n² ≢ 0 (mod 3) → 3 ∤ n². □

**Bài 3**: Tương tự √2. Giả sử √3 = a/b tối giản → 3b² = a² → 3 | a² → 3 | a → a = 3c → 3b² = 9c² → b² = 3c² → 3 | b. Mâu thuẫn tối giản.

**Bài 4**: x², y² mod 4 ∈ {0, 1} → x² + y² ∈ {0, 1, 2}. 4n+3 mod 4 = 3 ∉ {0,1,2}. □

**Bài 5**: Xét a = √2, b = √2. Xét (√2)^(√2):
- **Trường hợp 1**: (√2)^(√2) hữu tỉ → a = b = √2 (vô tỉ), a^b hữu tỉ. ✓
- **Trường hợp 2**: (√2)^(√2) vô tỉ → đặt a = (√2)^(√2), b = √2.  
  a^b = ((√2)^(√2))^(√2) = (√2)^(√2·√2) = (√2)² = 2 (hữu tỉ). ✓

⟶ 1 trong 2 trường hợp đúng, nên có cặp. Nhưng ta **không biết cặp nào**! Đây là **chứng minh không xây dựng** (non-constructive).

---

## 9. 🎉 HOÀN THÀNH TIER 5 (8/8)!

Tiếp theo: **Tier 6 — Advanced** (Đại số tuyến tính, Calculus đa biến, Xác suất, ODE).

## 📝 Tổng kết Tier 5

1. **Số học**: chia hết, GCD, Euclid, Bezout.
2. **Nguyên tố**: phân tích duy nhất, Fermat nhỏ, Euler.
3. **Tổ hợp**: hoán vị, chỉnh hợp, tổ hợp; Pascal & nhị thức Newton.
4. **Dirichlet & bù trừ**: kỹ thuật đếm cao cấp.
5. **Quy nạp**: chứng minh mệnh đề về ℕ.
6. **Logic & ánh xạ**: mệnh đề, lượng từ, đơn/toàn/song ánh.
7. **5 phương pháp chứng minh**: trực tiếp, phản đảo, phản chứng, quy nạp, xây dựng.

🎉 Đây là **bộ công cụ** cần thiết để học toán nâng cao.
