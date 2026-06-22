# Lesson 03 — Văn phạm phi ngữ cảnh (Grammar & CFG)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao** parser cần một bộ luật mô tả "câu hợp lệ" của ngôn ngữ — và máy phân biệt `2 + 3` (đúng cú pháp) với `2 + * 3` (sai cú pháp) như thế nào.
- Định nghĩa **văn phạm phi ngữ cảnh (context-free grammar, CFG)**: tập luật sản xuất (production), ký hiệu kết thúc (terminal), ký hiệu không kết thúc (non-terminal), ký hiệu bắt đầu (start symbol).
- Đọc/viết grammar bằng ký pháp **BNF** và **EBNF**.
- Thực hiện **dẫn xuất (derivation)** từ start symbol ra một chuỗi, và dựng **cây phân tích (parse tree)** tương ứng.
- Phát hiện **nhập nhằng (ambiguity)** — khi một chuỗi có > 1 parse tree — và vì sao nó nguy hiểm.
- Viết lại grammar phân tầng để mã hoá **độ ưu tiên (precedence)** và **tính kết hợp (associativity)**.
- Hiểu vấn đề **đệ quy trái (left recursion)** (sẽ khử ở [Lesson 04](../lesson-04-recursive-descent-parser/)).
- Nắm sơ lược **phân cấp Chomsky**: vì sao regex (lexer) **không đủ** để đếm ngoặc lồng, còn CFG (parser) thì đủ.

## Kiến thức tiền đề

- [Lesson 02 — Lexer](../lesson-02-lexer/) — lexer biến chuỗi ký tự thô thành **dãy token** (`NUM`, `PLUS`, `STAR`, `LPAREN`...). Grammar trong bài này làm việc trên **token**, không phải ký tự. Câu của ta là một dãy token.
- [DataFoundations — Set & định nghĩa đệ quy](../../../DataFoundations/03-MathFoundations/lesson-01-set-theory/) — grammar định nghĩa một **tập hợp** (ngôn ngữ = tập tất cả chuỗi hợp lệ) bằng các **luật đệ quy**. Hiểu set & đệ quy giúp đọc grammar tự nhiên.
- [DataFoundations — Proof & Induction](../../../DataFoundations/03-MathFoundations/lesson-05-proof-induction/) — chứng minh "chuỗi này sinh được / không sinh được" và lập luận về cây phân tích đều dựa trên **quy nạp cấu trúc (structural induction)**.

---

## 1. Vì sao cần grammar?

> **Câu hỏi mở bài.** Cho hai dãy token sau (đã qua lexer):
> - `2 + 3` → `NUM(2) PLUS NUM(3)`
> - `2 + * 3` → `NUM(2) PLUS STAR NUM(3)`
>
> Làm sao máy biết dãy đầu là **hợp lệ về cú pháp** còn dãy sau là **sai**? Lexer không giúp được: cả hai đều gồm toàn token hợp lệ (`PLUS`, `STAR`, `NUM` đều là token đúng). Cái sai nằm ở **trật tự kết hợp** giữa các token. Ta cần một thứ mô tả "trật tự nào được phép" — đó chính là **grammar**.

### 1.1. Lexer dừng ở đâu, grammar bắt đầu ở đó

[Lexer](../lesson-02-lexer/) trả lời câu hỏi: *"chuỗi ký tự này tách thành những token nào?"* Nó kiểm tra **từ vựng**: `123` là số hợp lệ, `12a3` thì không.

Nhưng lexer **không** kiểm tra việc các token ráp lại với nhau có tạo thành một biểu thức/câu lệnh hợp lý không. Đó là việc của **cú pháp (syntax)**, do **parser** đảm nhận, và parser dựa vào **grammar**.

| Tầng | Đơn vị vào | Đơn vị ra | Câu hỏi | Công cụ |
| --- | --- | --- | --- | --- |
| Lexer | ký tự | token | "từ này có hợp lệ?" | biểu thức chính quy (regex) |
| Parser | token | cây phân tích | "các từ ráp lại có đúng cú pháp?" | văn phạm phi ngữ cảnh (CFG) |

💡 **Trực giác.** Hãy nghĩ tới tiếng Việt. Lexer giống bước *"từ này có trong từ điển không?"* — `mèo`, `ăn`, `cá` đều là từ hợp lệ. Grammar giống bước *"trật tự này có thành câu không?"* — `mèo ăn cá` đúng ngữ pháp, còn `cá ăn ăn mèo + +` thì sai dù mọi từ đều có trong từ điển. Grammar là tập **quy tắc ngữ pháp** của ngôn ngữ lập trình.

### 1.2. Grammar định nghĩa một tập hợp (ngôn ngữ)

Một grammar $G$ định nghĩa một **ngôn ngữ** $L(G)$ = **tập tất cả các chuỗi token hợp lệ** mà $G$ sinh ra. "Parse một chuỗi" thực chất là hỏi: *chuỗi này có thuộc tập $L(G)$ không?* — và nếu có thì **cấu trúc** của nó là gì (cây phân tích).

Đây chính là khái niệm [tập hợp định nghĩa bằng luật đệ quy](../../../DataFoundations/03-MathFoundations/lesson-01-set-theory/) ở DataFoundations: ta không liệt kê hết các chuỗi (vô hạn), mà cho **luật sinh** rồi nói "tập là tất cả những gì sinh được từ luật, không gì khác".

📝 **Tóm tắt mục 1**

- Lexer kiểm tra **từ vựng** (token hợp lệ?); parser kiểm tra **cú pháp** (trật tự token hợp lệ?).
- `2 + 3` đúng cú pháp, `2 + * 3` sai — cái sai ở trật tự, không phải ở từng token.
- Grammar $G$ định nghĩa ngôn ngữ $L(G)$ = tập tất cả chuỗi token hợp lệ, bằng luật đệ quy.
- Parse = hỏi "chuỗi $\in L(G)$?" + tìm cấu trúc (cây phân tích).

---

## 2. CFG là gì?

### 2.1. Định nghĩa hình thức (3 + 1 thành phần)

💡 **Trực giác trước.** Một CFG giống một bộ "công thức thay thế". Bạn bắt đầu với MỘT ký hiệu trừu tượng (vd `Câu`), rồi liên tục thay nó bằng các vế phải của luật cho tới khi chỉ còn toàn token cụ thể. Mỗi luật dạng `Trái → Phải` đọc là *"chỗ nào thấy `Trái`, được phép thay bằng `Phải`"*.

**Văn phạm phi ngữ cảnh (CFG)** là bộ 4 phần $G = (N, \Sigma, P, S)$:

1. **$N$ — tập ký hiệu không kết thúc (non-terminals).** Các "biến cú pháp" trừu tượng, còn cần khai triển tiếp. Quy ước viết HOA: `E`, `T`, `F`, `Stmt`, `Expr`. Đây là các "chỗ trống" sẽ được thay tiếp.
2. **$\Sigma$ — tập ký hiệu kết thúc (terminals).** Các token "lá", không khai triển được nữa — chính là token từ lexer: `num`, `+`, `*`, `(`, `)`. Quy ước viết thường hoặc dùng ký hiệu cụ thể. (Yêu cầu: $N \cap \Sigma = \emptyset$ — một ký hiệu không thể vừa là terminal vừa là non-terminal.)
3. **$P$ — tập luật sản xuất (productions).** Mỗi luật dạng $A \to \alpha$ với $A \in N$ và $\alpha$ là một dãy (có thể rỗng) gồm terminal và non-terminal. "Phi ngữ cảnh" nghĩa là **vế trái luôn chỉ có ĐÚNG MỘT non-terminal** $A$ — được thay bất kể $A$ đứng cạnh cái gì (không phụ thuộc ngữ cảnh xung quanh).
4. **$S$ — ký hiệu bắt đầu (start symbol).** Một non-terminal đặc biệt $S \in N$; mọi dẫn xuất bắt đầu từ đây. Thường là `E` (expression) hoặc `Program`.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao gọi là 'phi ngữ cảnh' (context-free)?"* — Vì luật $A \to \alpha$ áp được **bất kể** $A$ nằm trong ngữ cảnh nào (`x A y` hay `A` đứng một mình đều thay được). Trái ngược là văn phạm **cảm ngữ cảnh (context-sensitive)** có luật kiểu `x A y → x β y` chỉ áp khi $A$ kẹp giữa `x` và `y`. CFG đủ mạnh để mô tả cú pháp ngôn ngữ lập trình mà vẫn parse hiệu quả → đó là điểm ngọt.
- *"Terminal khác non-terminal ở đâu?"* — Terminal là **token thật** xuất hiện trong chuỗi cuối (lá của cây). Non-terminal là **biến trung gian** chỉ tồn tại trong quá trình dẫn xuất, không bao giờ xuất hiện trong chuỗi token cuối cùng.
- *"Một grammar có nhiều start symbol được không?"* — Không. Đúng một $S$. Nếu cần "nhiều điểm vào", người ta thêm một non-terminal mới làm $S$ rồi cho nó sinh ra các lựa chọn.

### 2.2. Ký pháp BNF và EBNF

**BNF (Backus–Naur Form)** là cách viết luật phổ biến. Dấu `|` ngăn các lựa chọn (alternatives) của cùng một non-terminal:

```
E → E + E        (luật 1)
E → E * E        (luật 2)
E → ( E )        (luật 3)
E → num          (luật 4)
```

Viết gọn lại bằng `|` (đọc là "hoặc"):

```
E → E + E | E * E | ( E ) | num
```

**EBNF (Extended BNF)** thêm 3 ký hiệu tiện lợi (vay từ regex):

| Ký pháp | Nghĩa | Ví dụ |
| --- | --- | --- |
| `[ X ]` | X xuất hiện **0 hoặc 1 lần** (tuỳ chọn) | `IfStmt → if ( E ) Stmt [ else Stmt ]` |
| `{ X }` | X lặp **0 hoặc nhiều lần** | `Args → E { , E }` (một hoặc nhiều E ngăn bởi dấu phẩy) |
| `( ... )` | nhóm | `E → T { ( + \| - ) T }` |

> EBNF chỉ là **đường tắt cú pháp** — mọi grammar EBNF đều dịch ngược được về BNF thuần. Vd `Args → E { , E }` tương đương BNF:
> ```
> Args → E ArgsTail
> ArgsTail → , E ArgsTail | ε
> ```
> (`ε` là chuỗi rỗng — vế phải không có ký hiệu nào.)

### 2.3. Bốn ví dụ CFG cụ thể

Để định nghĩa "CFG" thực sự rõ, đây là **4 grammar nhỏ** đủ khác nhau:

**Ví dụ A — chuỗi `a` lặp lại (≥ 1 chữ a):**
```
S → a S | a
```
$L = \{$ `a`, `aa`, `aaa`, `aaaa`, ... $\}$. Đệ quy ở vế phải (`a S`) tạo ra độ dài bất kỳ.

**Ví dụ B — ngoặc cân đối (balanced parentheses):**
```
S → ( S ) S | ε
```
$L = \{$ `ε`, `()`, `()()`, `(())`, `(()())`, ... $\}$. **Đây là ví dụ kinh điển mà regex KHÔNG làm được** (xem §7).

**Ví dụ C — số nhị phân palindrome (đối xứng):**
```
P → 0 P 0 | 1 P 1 | 0 | 1 | ε
```
$L = \{$ `ε`, `0`, `1`, `00`, `11`, `010`, `101`, `0110`, ... $\}$.

**Ví dụ D — biểu thức số học (grammar ta sẽ dùng suốt bài):**
```
E → E + E | E * E | ( E ) | num
```
$L = \{$ `num`, `num + num`, `num * num`, `( num )`, `num + num * num`, ... $\}$.

⚠ **Lỗi thường gặp.** Đừng nhầm **ký hiệu của grammar** với **ký tự trong chuỗi**. Trong ví dụ D, `+`, `*`, `(`, `)`, `num` là **terminal** (token thật); `E` là **non-terminal**; mũi tên `→` và gạch `|` là **ký hiệu meta** của BNF (không thuộc ngôn ngữ, chỉ dùng để viết luật). Một lỗi khác: tưởng `ε` là một ký tự — không, `ε` nghĩa là *"không có gì cả"*, vế phải rỗng.

🔁 **Dừng lại tự kiểm tra**

1. Trong grammar `S → ( S ) S | ε`, đâu là terminal, đâu là non-terminal, đâu là start symbol?
2. Chuỗi `()()` có thuộc $L$ của grammar đó không?

<details><summary>Đáp án</summary>

1. Terminal: `(`, `)`. Non-terminal: `S`. Start symbol: `S`. (`ε` không phải ký hiệu, nó là vế phải rỗng.)
2. Có. `S → (S)S → ()S → ()(S)S → ()()S → ()()` (dùng `S→ε` cho các `S` còn lại). Sẽ thấy rõ ở mục dẫn xuất.
</details>

📝 **Tóm tắt mục 2**

- CFG = $(N, \Sigma, P, S)$: non-terminals, terminals, productions, start symbol.
- "Phi ngữ cảnh": vế trái mỗi luật **đúng một** non-terminal, thay được bất kể ngữ cảnh.
- BNF dùng `→` và `|`; EBNF thêm `[ ]` (tuỳ chọn), `{ }` (lặp), `( )` (nhóm) — đường tắt, dịch về BNF được.
- Terminal = token lá; non-terminal = biến trung gian; `ε` = vế phải rỗng.

---

## 3. Dẫn xuất (derivation) & cây phân tích (parse tree)

### 3.1. Dẫn xuất là gì?

💡 **Trực giác.** Dẫn xuất là quá trình "khai triển": bắt đầu từ start symbol, mỗi bước **chọn một non-terminal** trong chuỗi hiện tại và **thay nó bằng vế phải** của một luật, cho tới khi chuỗi chỉ còn toàn terminal. Mỗi bước viết bằng dấu $\Rightarrow$ ("dẫn xuất ra trong một bước").

Dùng grammar D: `E → E + E | E * E | ( E ) | num`.

**Dẫn xuất chuỗi `num + num`:**

$$
E \;\Rightarrow\; E + E \;\Rightarrow\; \text{num} + E \;\Rightarrow\; \text{num} + \text{num}
$$

Đọc từng bước:
1. $E$: chuỗi đầu, chỉ có start symbol.
2. $E \Rightarrow E + E$: áp luật `E → E + E`.
3. $E + E \Rightarrow \text{num} + E$: thay $E$ **trái** bằng `num` (luật `E → num`).
4. $\text{num} + E \Rightarrow \text{num} + \text{num}$: thay $E$ **phải** bằng `num`.

Hết non-terminal → dừng. Chuỗi cuối `num + num` $\in L(G)$. ✓

**Leftmost vs rightmost derivation.** Ở bước 3 ta chọn thay $E$ bên trái trước — nếu **luôn** thay non-terminal trái nhất, gọi là **dẫn xuất trái (leftmost)**; luôn thay phải nhất gọi là **dẫn xuất phải (rightmost)**. Cùng một parse tree có thể đến từ nhiều thứ tự dẫn xuất khác nhau, nhưng **cây phân tích là cái bất biến quan trọng** (xem 3.3).

### 3.2. Walk-through đầy đủ: dẫn xuất `2 + 3 * 4`

(Quy ước: `2`, `3`, `4` là các token `num` cụ thể — ta giữ giá trị để dễ theo.) Dẫn xuất trái:

$$
\begin{aligned}
E &\Rightarrow E + E        &&\text{(luật } E \to E + E\text{)} \\
  &\Rightarrow 2 + E        &&\text{(}E\text{ trái} \to \text{num}=2\text{)} \\
  &\Rightarrow 2 + E * E    &&\text{(}E\text{ phải} \to E * E\text{)} \\
  &\Rightarrow 2 + 3 * E    &&\text{(}E\text{ trái của tích} \to 3\text{)} \\
  &\Rightarrow 2 + 3 * 4    &&\text{(}E \to 4\text{)}
\end{aligned}
$$

Năm bước, kết quả `2 + 3 * 4`. Nhưng — **chú ý** — đây chỉ là MỘT cách. Mục 4 sẽ cho thấy còn một cách khác, dẫn tới **hai cây khác nhau**.

### 3.3. Cây phân tích (parse tree)

💡 **Trực giác.** Parse tree là "ảnh chụp cấu trúc" của dẫn xuất, bỏ đi thứ tự áp luật. Gốc là start symbol; mỗi nút trong là một non-terminal; con của nút $A$ chính là vế phải của luật đã áp cho $A$ (theo đúng thứ tự trái→phải); lá là terminal. **Đọc các lá từ trái sang phải ra đúng chuỗi gốc.**

Cây cho dẫn xuất `2 + 3 * 4` ở trên (`+` ở gốc, `*` là con bên phải):

```
            E
         /  |  \
        E   +   E
        |     / | \
       num=2 E  *  E
            |       |
          num=3   num=4
```

**Vì sao parse tree quan trọng hơn dẫn xuất?** Vì cây **mã hoá ý nghĩa**: nó nói "lấy `3 * 4` trước, rồi cộng `2`". Khi ta đánh giá (evaluate) biểu thức, ta đi từ **lá lên gốc**: `3 * 4 = 12`, rồi `2 + 12 = 14`. Cây quyết định kết quả tính toán — không phải thứ tự gõ phím.

### 3.4. Bốn ví dụ chuỗi: hợp lệ / không hợp lệ

Dùng grammar D. Một chuỗi token **hợp lệ** (∈ $L(G)$) khi tồn tại ít nhất một dẫn xuất từ $E$ ra nó.

| # | Chuỗi token | Hợp lệ? | Lý do |
| --- | --- | :---: | --- |
| 1 | `num + num` | ✓ | `E ⇒ E+E ⇒ num+E ⇒ num+num` |
| 2 | `( num + num ) * num` | ✓ | `E ⇒ E*E ⇒ (E)*E ⇒ (E+E)*E ⇒ ... ⇒ (num+num)*num` |
| 3 | `num + * num` | ✗ | Không luật nào sinh ra `+` đứng ngay cạnh `*`. Sau `+` phải là một `E`, mà `E` không bắt đầu bằng `*`. |
| 4 | `( num + num` | ✗ | Luật ngoặc là `( E )` — bắt buộc có `)` đóng. Thiếu `)` → không dẫn xuất được. |

⚠ **Lỗi thường gặp.** "Chuỗi gồm toàn token hợp lệ" **không** đồng nghĩa "chuỗi hợp lệ về cú pháp". Ví dụ 3 — `num + * num` — mọi token đều OK nhưng **trật tự** sai. Đây chính là câu hỏi mở bài: máy bác bỏ `2 + * 3` vì **không có dẫn xuất nào** sinh ra nó từ $E$.

🔁 **Dừng lại tự kiểm tra**

1. Viết dẫn xuất cho `( num )` từ grammar D.
2. `num num` (hai số cạnh nhau, không toán tử) có hợp lệ không?

<details><summary>Đáp án</summary>

1. $E \Rightarrow (E) \Rightarrow (\text{num})$. Hai bước.
2. **Không**. Không luật nào của $E$ sinh ra "hai biểu thức cạnh nhau không có toán tử ở giữa". Để có `num num` ta cần luật kiểu `E → E E`, mà grammar D không có.
</details>

📝 **Tóm tắt mục 3**

- Dẫn xuất = chuỗi bước thay non-terminal bằng vế phải luật, ký hiệu $\Rightarrow$, tới khi còn toàn terminal.
- Leftmost / rightmost = quy ước luôn thay non-terminal trái / phải nhất.
- Parse tree = cấu trúc của dẫn xuất; lá đọc trái→phải = chuỗi gốc; cây mã hoá **ý nghĩa** (thứ tự tính).
- Chuỗi hợp lệ ⟺ tồn tại dẫn xuất. `num + * num` không có dẫn xuất → bị bác bỏ.

---

## 4. Nhập nhằng (ambiguity)

### 4.1. Định nghĩa

💡 **Trực giác.** Một grammar **nhập nhằng** nếu có ít nhất MỘT chuỗi sinh ra được bằng **≥ 2 cây phân tích khác nhau**. Cây khác nhau = cấu trúc khác nhau = **ý nghĩa khác nhau**. Với ngôn ngữ lập trình, điều này thảm hoạ: cùng một dòng code, hai trình biên dịch có thể hiểu khác nhau.

Hình thức: $G$ nhập nhằng $\iff \exists$ chuỗi $w \in L(G)$ có ≥ 2 parse tree (tương đương: có ≥ 2 dẫn xuất trái khác nhau).

### 4.2. `2 + 3 * 4` có HAI cây với grammar D

Grammar D `E → E + E | E * E | ( E ) | num` là **nhập nhằng**. Chuỗi `2 + 3 * 4` có hai dẫn xuất trái khác nhau:

**Cách 1 — áp `E → E + E` ở gốc** (`+` ngoài cùng, đã làm ở §3.2):

```
        E
     /  |  \
    E   +   E          ← (3 * 4) rồi + 2
    |     / | \
   2     E  *  E
         |     |
         3     4
```
Đánh giá: `3 * 4 = 12`, `2 + 12 = `**`14`**.

**Cách 2 — áp `E → E * E` ở gốc** (`*` ngoài cùng):

```
          E
       /  |  \
      E   *   E         ← (2 + 3) rồi * 4
    / | \     |
   E  +  E    4
   |     |
   2     3
```
Đánh giá: `2 + 3 = 5`, `5 * 4 = `**`20`**.

> **Hai cây → hai kết quả: 14 và 20.** Theo quy ước toán học chuẩn (`*` ưu tiên hơn `+`), đáp án đúng là **14**. Nhưng grammar D **không có cách nào ép** điều đó — nó chấp nhận cả hai cây như nhau. Đây là lý do grammar nhập nhằng không dùng được để định nghĩa ngôn ngữ.

### 4.3. Thêm ví dụ nhập nhằng

Để thấy rõ ambiguity là hiện tượng phổ biến (không chỉ ở `+`/`*`):

1. **`1 + 2 + 3`** với grammar D: `(1+2)+3` hay `1+(2+3)`? Hai cây (cùng giá trị 6 ở đây vì `+` kết hợp, nhưng cấu trúc vẫn khác → vẫn nhập nhằng).
2. **`1 - 2 - 3`** với `E → E - E | num`: `(1-2)-3 = -4` hay `1-(2-3) = 2`? Hai cây, **giá trị khác** → bắt buộc phải định nghĩa kết hợp.
3. **Dangling else**: `if E then if E then S else S` — `else` thuộc `if` nào? Hai cách hiểu. Đây là ambiguity kinh điển trong ngôn ngữ lập trình thật.
4. **`num * num * num`** với grammar D: `(a*b)*c` hay `a*(b*c)` — hai cây.

⚠ **Lỗi thường gặp.** Đừng nghĩ "kết quả bằng nhau thì không sao". Ngay cả khi `1+2+3` cho cùng giá trị 6, grammar vẫn **nhập nhằng** vì có 2 cây. Parser cần MỘT cây xác định để hoạt động tất định — ambiguity là khuyết tật của **grammar**, độc lập với việc giá trị có trùng hay không.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vậy ambiguity sửa thế nào?"* → Hai cách: (a) **viết lại grammar** cho hết nhập nhằng (mục 5 — cách sạch, ta sẽ dùng); (b) giữ grammar nhập nhằng nhưng khai báo **luật ưu tiên/kết hợp riêng** cho parser (cách của các công cụ như Yacc/Bison — tiện nhưng ẩn). Bài này theo cách (a).
- *"Có thuật toán kiểm tra grammar bất kỳ có nhập nhằng không?"* → **Không** — bài toán "CFG này có nhập nhằng không?" là **không quyết định được (undecidable)** nói chung. Nên thực tế ta thiết kế grammar **theo khuôn** đã biết là không nhập nhằng (như §5), thay vì kiểm tra máy móc.

🔁 **Dừng lại tự kiểm tra**

1. Với grammar D, vẽ hai cây cho `num * num + num` và tính giá trị mỗi cây (dùng `5 * 2 + 3`).

<details><summary>Đáp án</summary>

Cây 1 (`+` ở gốc): `(5*2)+3 = 10+3 = 13`. Cây 2 (`*` ở gốc): `5*(2+3) = 5*5 = 25`. Hai giá trị → grammar D nhập nhằng. Đáp án "đúng" theo toán là 13.
</details>

📝 **Tóm tắt mục 4**

- Grammar nhập nhằng = có chuỗi với ≥ 2 parse tree.
- Grammar D cho `2+3*4` hai cây → **14** (đúng) vs **20** (sai).
- Ambiguity là khuyết tật của grammar, **độc lập** với việc giá trị có trùng (`1+2+3` vẫn nhập nhằng).
- "CFG có nhập nhằng không?" là bài toán không quyết định được → ta thiết kế theo khuôn an toàn.

---

## 5. Ưu tiên (precedence) & kết hợp (associativity)

### 5.1. Hai vấn đề cần mã hoá

Để parser cho ra **đúng một cây đúng**, grammar phải tự mã hoá:

- **Ưu tiên (precedence)**: `*` "bám chặt hơn" `+`. Trong `2 + 3 * 4`, `3 * 4` phải gom thành một khối trước.
- **Kết hợp (associativity)**: với cùng độ ưu tiên, gom từ đâu? `+`, `-`, `*`, `/` thường **trái-kết-hợp (left-associative)**: `1 - 2 - 3 = (1 - 2) - 3`. (Lũy thừa `^` thì phải-kết-hợp: `2^3^2 = 2^(3^2)`.)

💡 **Trực giác về kỹ thuật phân tầng.** Mẹo là **chia non-terminal theo tầng ưu tiên**: mỗi mức ưu tiên một non-terminal riêng, mức **thấp** (lỏng) ở **trên**, mức **cao** (chặt) ở **dưới**. Toán tử lỏng (`+`) chỉ được ghép các khối đã gom xong của tầng chặt hơn (`*`). Nhờ vậy `*` **luôn** nằm sâu hơn `+` trong cây → tính trước.

### 5.2. Grammar phân tầng (không nhập nhằng)

```
E → E + T | T          (E = Expression, tầng cộng — lỏng nhất)
T → T * F | F          (T = Term, tầng nhân — chặt hơn)
F → ( E ) | num        (F = Factor, tầng nguyên tử — chặt nhất)
```

Đọc theo tầng:
- **`F` (Factor)** — đơn vị nhỏ nhất: một số `num`, hoặc một biểu thức trong ngoặc `( E )`. Ngoặc "reset" về tầng thấp nhất bên trong.
- **`T` (Term)** — một dãy `F` nối bằng `*`: `F`, `F*F`, `F*F*F`... Vì `T → T * F`, cây `*` nằm trong tầng `T`, **sâu hơn** `+`.
- **`E` (Expression)** — một dãy `T` nối bằng `+`: `T`, `T+T`...

**Vì sao hết nhập nhằng?** Vì giờ mỗi chuỗi có đúng MỘT cây: `+` chỉ xuất hiện ở tầng `E` (cao), `*` chỉ ở tầng `T` (thấp hơn). Không còn lựa chọn "áp `+` hay `*` ở gốc" — `+` **luôn** ở gốc nếu có mặt, `*` **luôn** ở dưới.

**Vì sao trái-kết-hợp?** Vì luật là `E → E + T` (đệ quy ở **bên trái**), không phải `E → T + E`. Phần đệ quy nằm trái → cây "nghiêng trái" → `1 - 2 - 3` thành `(1 - 2) - 3`. (Nếu viết `E → T + E` sẽ thành phải-kết-hợp.)

### 5.3. Walk-through cây đúng cho `2 + 3 * 4`

Dẫn xuất trái với grammar phân tầng:

$$
\begin{aligned}
E &\Rightarrow E + T          &&(E \to E + T) \\
  &\Rightarrow T + T          &&(E \to T) \\
  &\Rightarrow F + T          &&(T \to F) \\
  &\Rightarrow 2 + T          &&(F \to \text{num}=2) \\
  &\Rightarrow 2 + T * F      &&(T \to T * F) \\
  &\Rightarrow 2 + F * F      &&(T \to F) \\
  &\Rightarrow 2 + 3 * F      &&(F \to \text{num}=3) \\
  &\Rightarrow 2 + 3 * 4      &&(F \to \text{num}=4)
\end{aligned}
$$

Cây phân tích **duy nhất**:

```
            E
         /  |  \
        E   +   T
        |     / | \
        T    T  *  F
        |    |     |
        F    F    num=4
        |    |
      num=2 num=3
```

Đọc cây: tầng `T` (`3 * 4`) nằm **sâu hơn** `+`, nên gom trước: `3 * 4 = 12`, rồi `2 + 12 = `**`14`**. Chỉ một cây, chỉ một đáp án đúng. So với §4.2 nơi grammar D cho hai cây (14 và 20), grammar phân tầng **loại bỏ** cây sai (20) ngay từ thiết kế.

### 5.4. Bốn ví dụ kiểm chứng

| Chuỗi | Cây (grammar phân tầng) | Giá trị |
| --- | --- | --- |
| `2 + 3 * 4` | `2 + (3*4)` | 14 ✓ |
| `2 * 3 + 4` | `(2*3) + 4` | 10 ✓ |
| `( 2 + 3 ) * 4` | `(2+3) * 4` | 20 (ngoặc ép cộng trước) |
| `8 - 4 - 2` (với tầng `E → E - T`) | `(8-4) - 2` | 2 ✓ (trái-kết-hợp) |

⚠ **Lỗi thường gặp.** Nhiều người viết tầng nhân nằm **trên** tầng cộng (đảo thứ tự) rồi ngạc nhiên vì `*` lại lỏng hơn `+`. Quy tắc: **toán tử ưu tiên cao đặt ở tầng SÂU (gần lá)**. Tầng càng sâu, bám càng chặt. Đặt sai tầng = sai precedence.

🔁 **Dừng lại tự kiểm tra**

1. Với grammar phân tầng, viết dẫn xuất cho `num * num + num` (dùng `2 * 3 + 4`) và xác nhận cây cho ra giá trị 10.

<details><summary>Đáp án</summary>

$E \Rightarrow E + T \Rightarrow T + T \Rightarrow (T*F) + T \Rightarrow (F*F)+T \Rightarrow (2*3) + T \Rightarrow (2*3)+F \Rightarrow 2*3+4$. Cây: `*` ở tầng `T` (gom `2*3=6`), rồi `+ 4 = 10`. ✓
</details>

📝 **Tóm tắt mục 5**

- Precedence: `*` chặt hơn `+` → đặt `*` ở tầng **sâu hơn** trong grammar.
- Associativity: đệ quy **trái** (`E → E + T`) → trái-kết-hợp; đệ quy phải → phải-kết-hợp.
- Grammar phân tầng `E→E+T|T`, `T→T*F|F`, `F→(E)|num` hết nhập nhằng, `2+3*4` cho **đúng một cây = 14**.
- Ngoặc `( E )` reset về tầng thấp nhất → ép tính trong ngoặc trước.

---

## 6. Đệ quy trái (left recursion) — vấn đề cho recursive-descent

Grammar phân tầng ở §5 rất đẹp về mặt **ý nghĩa**, nhưng có một cái gai cho cách parse phổ biến nhất.

💡 **Trực giác.** Luật `E → E + T` có non-terminal $E$ **lặp lại ngay đầu vế phải** — đó gọi là **đệ quy trái (left recursion)**. Với parser kiểu **recursive-descent** (mỗi non-terminal là một hàm tự gọi đệ quy — học ở [Lesson 04](../lesson-04-recursive-descent-parser/)), hàm `parseE()` sẽ gọi `parseE()` **ngay lập tức** mà chưa "ăn" token nào → **đệ quy vô hạn**, stack overflow.

```
function parseE() {
    parseE()      // ← gọi lại chính mình, chưa tiêu thụ token nào → kẹt vĩnh viễn
    expect('+')
    parseT()
}
```

⚠ **Lỗi thường gặp / cảnh báo.** Left recursion **không** làm grammar sai (nó vẫn định nghĩa đúng ngôn ngữ và đúng precedence). Nó chỉ phá **một kỹ thuật parse cụ thể** (top-down recursive-descent / LL). Các kỹ thuật bottom-up (LR, như Yacc dùng) **xử lý được** left recursion bình thường — thậm chí thích nó.

**Cách khử (preview).** Biến đổi đệ quy-trái thành lặp bằng EBNF:

```
E → T { + T }          (một T, rồi lặp "+ T" không hoặc nhiều lần)
T → F { * F }
F → ( E ) | num
```

Dạng này **tương đương** grammar §5 (vẫn trái-kết-hợp nếu vòng lặp gom từ trái), nhưng `parseE()` giờ "ăn" một `T` trước rồi mới vào vòng lặp → không còn đệ quy vô hạn. Chi tiết khử đệ quy trái tổng quát và cài đặt đầy đủ sẽ ở **[Lesson 04 — Recursive-Descent Parser](../lesson-04-recursive-descent-parser/)**.

📝 **Tóm tắt mục 6**

- Đệ quy trái = non-terminal lặp lại ngay đầu vế phải (`E → E + T`).
- Phá parser recursive-descent (LL) → đệ quy vô hạn; nhưng parser LR thì không sao.
- Khử bằng cách chuyển sang vòng lặp EBNF `E → T { + T }` — sẽ làm kỹ ở Lesson 04.

---

## 7. Phân cấp Chomsky — vì sao regex không đủ cho parser

### 7.1. Bốn lớp ngôn ngữ

Noam Chomsky phân loại văn phạm thành 4 lớp, **lồng nhau** theo sức mạnh:

| Lớp (type) | Tên | Máy nhận dạng | Dùng ở đâu trong compiler |
| --- | --- | --- | --- |
| Type-3 | Chính quy (regular) | automat hữu hạn (DFA/NFA) | **Lexer** (nhận token) |
| Type-2 | Phi ngữ cảnh (context-free) | automat đẩy xuống (PDA, có stack) | **Parser** (nhận cú pháp) |
| Type-1 | Cảm ngữ cảnh (context-sensitive) | automat tuyến tính | (hiếm dùng trực tiếp) |
| Type-0 | Đệ quy đếm được | máy Turing | lý thuyết |

Quan hệ bao hàm: **regular ⊂ context-free ⊂ context-sensitive ⊂ type-0**. Mỗi lớp ngoài **mạnh hơn thực sự** lớp trong (làm được nhiều hơn).

💡 **Trực giác về sự phân công.** Lexer dùng công cụ **yếu nhưng nhanh** (regular/regex) cho việc đơn giản là cắt token. Parser dùng công cụ **mạnh hơn** (context-free) cho việc khó là dựng cấu trúc lồng nhau. Dùng đúng công cụ cho đúng việc — không ai parse cả ngôn ngữ bằng một regex khổng lồ, vì regex **về nguyên lý không làm nổi** (xem dưới).

### 7.2. Vì sao regex KHÔNG đếm được ngoặc lồng

⚠ **Đây là giới hạn cốt lõi, không phải chuyện "regex dài quá".** Xét ngôn ngữ ngoặc cân đối từ §2.3 ví dụ B: $\{$ `()`, `(())`, `((()))`, ... $\}$ — tổng quát $n$ ngoặc mở rồi $n$ ngoặc đóng.

Regex (hay automat hữu hạn) chỉ có **số trạng thái hữu hạn cố định** — nó **không có bộ nhớ đếm không giới hạn**. Để khớp `(((...)))` với $n$ tùy ý, máy phải **nhớ đã mở bao nhiêu ngoặc** để đóng đủ chừng đó. Nhưng $n$ có thể lớn hơn mọi số trạng thái hữu hạn → automat hữu hạn không thể. Đây là hệ quả trực tiếp của **bổ đề bơm (pumping lemma)** cho ngôn ngữ chính quy.

> **Định lý (phát biểu gọn).** Ngôn ngữ $\{$ `(`$^n$ `)`$^n$ $: n \ge 0\}$ **không** chính quy. Nó **là** phi ngữ cảnh — grammar `S → ( S ) S | ε` sinh được nó, vì **stack** của PDA đếm được số ngoặc mở (push khi gặp `(`, pop khi gặp `)`).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Nhưng regex engine thật (PCRE, Perl) khớp được ngoặc lồng mà?"* → Đúng, nhưng đó là vì các engine đó đã **vượt khỏi regex thuần** — chúng thêm tính năng đệ quy/backreference, khiến chúng **không còn là "regular" theo nghĩa lý thuyết** nữa. "Regex chính quy" thuần (kiểu automat hữu hạn) thì **không** làm được. Đây là chỗ lẫn lộn thuật ngữ phổ biến: "regex" trong lập trình ≠ "regular language" trong lý thuyết.
- *"Vậy ngoặc lồng là ranh giới phân chia?"* → Đúng. Khả năng **đếm/cân đối lồng nhau không giới hạn** chính là thứ context-free có mà regular không có. Mọi cấu trúc lồng trong code — `{ }` khối lệnh, `( )` biểu thức, `[ ]` mảng, `if/else` lồng nhau — đều cần CFG.

### 7.3. Bốn ví dụ phân định regular vs context-free

| Ngôn ngữ | Lớp | Vì sao |
| --- | --- | --- |
| Mọi chuỗi `a`,`b` có số `a` chẵn | Regular | Chỉ cần nhớ "chẵn/lẻ" — 2 trạng thái, hữu hạn |
| Số nguyên `[0-9]+`, identifier `[a-zA-Z_]\w*` | Regular | Token của lexer — không lồng |
| `(`$^n$ `)`$^n$ (ngoặc cân đối) | Context-free, **không** regular | Cần đếm $n$ không giới hạn |
| Biểu thức số học (grammar §5) | Context-free | Ngoặc lồng + cấu trúc đệ quy |

📝 **Tóm tắt mục 7**

- Phân cấp Chomsky: regular ⊂ context-free ⊂ context-sensitive ⊂ type-0; mỗi lớp ngoài mạnh hơn thật.
- Lexer = regular (automat hữu hạn); parser = context-free (PDA có stack).
- Regex thuần **không đếm được ngoặc lồng** vì chỉ có hữu hạn trạng thái (pumping lemma); CFG đếm được nhờ **stack**.
- "regex" của engine lập trình ≠ "regular language" lý thuyết — engine thật đã vượt ra ngoài lớp regular.

---

## 8. Bài tập

> Dùng grammar phân tầng trừ khi đề nói khác:
> ```
> E → E + T | E - T | T
> T → T * F | T / F | F
> F → ( E ) | num
> ```
> và grammar nhập nhằng D: `E → E + E | E * E | ( E ) | num`.

**Bài 1.** Với grammar D, viết MỘT dẫn xuất trái đầy đủ (từng bước, ghi luật) cho `num + num + num`. Sau đó chỉ ra grammar D nhập nhằng với chuỗi này bằng cách đưa ra hai parse tree khác nhau.

**Bài 2.** Với grammar phân tầng, viết dẫn xuất trái đầy đủ cho `num * ( num + num )` (dùng `2 * ( 3 + 4 )`) và vẽ parse tree. Tính giá trị.

**Bài 3.** Xác định mỗi chuỗi token sau hợp lệ hay không **theo grammar phân tầng**; nếu không, giải thích chỗ sai:
- (a) `num + + num`
- (b) `( num + num ) * num`
- (c) `num * ( num`
- (d) `num num + num`
- (e) `( ( num ) )`

**Bài 4.** Cho grammar `S → a S b | ε`. (a) Mô tả $L(S)$ bằng lời. (b) Liệt kê 4 chuỗi ngắn nhất thuộc $L(S)$. (c) `aabb` có thuộc không? Viết dẫn xuất nếu có.

**Bài 5.** (Tự viết derivation + parse tree) Với grammar phân tầng, cho chuỗi `2 + 3 * 4 - 5` (token: `num + num * num - num`). (a) Viết dẫn xuất trái. (b) Vẽ parse tree. (c) Tính giá trị, kiểm tra precedence và trái-kết-hợp đều đúng.

**Bài 6.** Grammar `E → E - E | num` nhập nhằng. (a) Đưa ra hai parse tree cho `9 - 4 - 2` và tính giá trị mỗi cây. (b) Viết lại grammar (phân tầng / dùng đệ quy trái) để ép `-` **trái-kết-hợp** và xác nhận chỉ còn một cây cho giá trị 3.

**Bài 7.** Giải thích bằng lập luận (không cần chứng minh hình thức) vì sao ngôn ngữ "chuỗi gồm `n` ký tự `a` rồi `n` ký tự `b`" ($a^n b^n$) **không** mô tả được bằng regex thuần, nhưng mô tả được bằng CFG. Viết grammar CFG cho nó.

**Bài 8.** Grammar `E → T { + T }`, `T → F { * F }`, `F → ( E ) | num` (EBNF). (a) Vì sao dạng này tránh được đệ quy trái? (b) Dịch luật `E → T { + T }` về BNF thuần (không dùng `{ }`).

## Lời giải chi tiết

### Bài 1

Dẫn xuất trái cho `num + num + num` với grammar D (chọn áp `+` ngoài cùng là cái phải):

$$
\begin{aligned}
E &\Rightarrow E + E &&(E \to E + E) \\
  &\Rightarrow \text{num} + E &&(E \to \text{num}) \\
  &\Rightarrow \text{num} + E + E &&(E \to E + E) \\
  &\Rightarrow \text{num} + \text{num} + E &&(E \to \text{num}) \\
  &\Rightarrow \text{num} + \text{num} + \text{num} &&(E \to \text{num})
\end{aligned}
$$

**Hai parse tree** (chứng tỏ nhập nhằng):

```
Cây A: (num+num)+num         Cây B: num+(num+num)
        E                            E
     /  |  \                      /  |  \
    E   +   E                    E   +   E
  / | \     |                    |     / | \
 E  +  E   num                  num   E  +  E
 |     |                              |     |
num   num                           num   num
```

Hai cây khác cấu trúc (dù giá trị bằng nhau vì `+` kết hợp) → grammar D nhập nhằng với `num + num + num`. ✓

### Bài 2

`2 * ( 3 + 4 )` với grammar phân tầng:

$$
\begin{aligned}
E &\Rightarrow T &&(E \to T) \\
  &\Rightarrow T * F &&(T \to T * F) \\
  &\Rightarrow F * F &&(T \to F) \\
  &\Rightarrow 2 * F &&(F \to \text{num}=2) \\
  &\Rightarrow 2 * ( E ) &&(F \to (E)) \\
  &\Rightarrow 2 * ( E + T ) &&(E \to E + T) \\
  &\Rightarrow 2 * ( T + T ) &&(E \to T) \\
  &\Rightarrow 2 * ( F + T ) &&(T \to F) \\
  &\Rightarrow 2 * ( 3 + T ) &&(F \to \text{num}=3) \\
  &\Rightarrow 2 * ( 3 + F ) &&(T \to F) \\
  &\Rightarrow 2 * ( 3 + 4 ) &&(F \to \text{num}=4)
\end{aligned}
$$

Parse tree:

```
        E
        |
        T
     /  |  \
    T   *   F
    |     / | \
    F    (  E  )
    |     / | \
  num=2  E  +  T
         |     |
         T     F
         |     |
         F   num=4
         |
       num=3
```

Giá trị: trong ngoặc `3 + 4 = 7`, rồi `2 * 7 = `**`14`**.

### Bài 3

- **(a) `num + + num` — KHÔNG hợp lệ.** Sau `+` (luật `E → E + T`) phải là một `T`, mà `T` không bắt đầu bằng `+`. Hai `+` liền nhau không sinh được.
- **(b) `( num + num ) * num` — hợp lệ.** `E ⇒ T ⇒ T*F ⇒ F*F ⇒ (E)*F ⇒ (E+T)*F ⇒ ... ⇒ (num+num)*num`.
- **(c) `num * ( num` — KHÔNG hợp lệ.** Luật ngoặc `F → ( E )` đòi `)` đóng. Thiếu `)` → kẹt.
- **(d) `num num + num` — KHÔNG hợp lệ.** Hai `num` cạnh nhau không có toán tử: không luật nào sinh `F F` hay `num num` liền kề.
- **(e) `( ( num ) )` — hợp lệ.** `E ⇒ T ⇒ F ⇒ (E) ⇒ (T) ⇒ (F) ⇒ ((E)) ⇒ ((T)) ⇒ ((F)) ⇒ ((num))`. Ngoặc lồng hai lớp — đúng kiểu CFG (regex không làm nổi, xem §7).

### Bài 4

Grammar `S → a S b | ε`.

- **(a)** $L(S) = \{ a^n b^n : n \ge 0 \}$ — $n$ ký tự `a` rồi đúng $n$ ký tự `b`, số `a` luôn bằng số `b` và mọi `a` đứng trước mọi `b`.
- **(b)** 4 chuỗi ngắn nhất: `ε` (n=0), `ab` (n=1), `aabb` (n=2), `aaabbb` (n=3).
- **(c)** `aabb` thuộc. Dẫn xuất: $S \Rightarrow aSb \Rightarrow a\,aSb\,b \Rightarrow a\,a\,\varepsilon\,b\,b = aabb$. (Áp `S → aSb` hai lần rồi `S → ε`.)

### Bài 5

`2 + 3 * 4 - 5` với grammar phân tầng (`E → E + T | E - T | T`):

$$
\begin{aligned}
E &\Rightarrow E - T &&(E \to E - T) \\
  &\Rightarrow (E + T) - T &&(E \to E + T) \\
  &\Rightarrow (T + T) - T &&(E \to T) \\
  &\Rightarrow (F + T) - T &&(T \to F) \\
  &\Rightarrow (2 + T) - T &&(F \to 2) \\
  &\Rightarrow (2 + T*F) - T &&(T \to T*F) \\
  &\Rightarrow (2 + F*F) - T &&(T \to F) \\
  &\Rightarrow (2 + 3*F) - T &&(F \to 3) \\
  &\Rightarrow (2 + 3*4) - T &&(F \to 4) \\
  &\Rightarrow (2 + 3*4) - F &&(T \to F) \\
  &\Rightarrow (2 + 3*4) - 5 &&(F \to 5)
\end{aligned}
$$

Parse tree (rút gọn, bỏ các nút trung gian một-con):

```
            E
         /  |  \
        E   -   T(=5)
     /  |  \
    T(=2) +  T
            / | \
          F(=3) * F(=4)
```

Giá trị, đi từ lá lên: `3 * 4 = 12` (vì `*` ở tầng `T`, sâu nhất), `2 + 12 = 14`, `14 - 5 = `**`9`**.

Kiểm tra: precedence đúng (`*` tính trước `+` và `-`); kết hợp đúng (`+` rồi `-` gom từ trái: `(2 + (3*4)) - 5`, vì cả hai dùng đệ quy trái cùng tầng `E`). ✓

### Bài 6

Grammar `E → E - E | num` (nhập nhằng), chuỗi `9 - 4 - 2`:

- **(a)** Hai cây:
  - Cây A `(9 - 4) - 2`: `9 - 4 = 5`, `5 - 2 = `**`3`**.
  - Cây B `9 - (4 - 2)`: `4 - 2 = 2`, `9 - 2 = `**`7`**.
  - Hai giá trị khác nhau (3 vs 7) → bắt buộc phải định nghĩa kết hợp.
- **(b)** Viết lại trái-kết-hợp bằng đệ quy trái:
  ```
  E → E - F | F
  F → num
  ```
  Vì `E → E - F` đệ quy ở **trái**, cây nghiêng trái: `(9 - 4) - 2`. Chỉ còn MỘT cây → giá trị **3**. (Đệ quy trái cho trái-kết-hợp; nếu viết `E → F - E` sẽ là phải-kết-hợp, ra 7.)

### Bài 7

**Vì sao $a^n b^n$ không regex được:** automat hữu hạn (mô hình của regex thuần) có **số trạng thái hữu hạn cố định** $k$. Để chấp nhận $a^n b^n$ máy phải "nhớ" đã đọc bao nhiêu `a` để đòi đúng chừng đó `b`. Nhưng $n$ có thể lớn hơn $k$ → hai chuỗi `a` độ dài khác nhau buộc phải rơi vào **cùng một trạng thái** (nguyên lý chuồng bồ câu / pumping lemma), khiến máy không phân biệt được, sẽ chấp nhận sai cả những chuỗi như $a^i b^j$ với $i \ne j$. Không có bộ nhớ đếm vô hạn → bất khả.

**CFG làm được** vì PDA có **stack** đếm không giới hạn: push một dấu khi gặp `a`, pop khi gặp `b`, cuối cùng stack rỗng ⟺ số `a` bằng số `b`. Grammar:
```
S → a S b | ε
```
(Chính là grammar bài 4.) Đây là lý do parser cần CFG, không thể dùng lexer/regex để kiểm cấu trúc lồng nhau.

### Bài 8

- **(a)** Dạng EBNF `E → T { + T }` **không đệ quy trái** vì vế phải bắt đầu bằng `T` (một non-terminal **khác**, sẽ "ăn" ít nhất một token trước khi quay lại). `parseE()` gọi `parseT()` trước (tiêu thụ token), rồi vào vòng `while (peek == '+')` — không bao giờ tự gọi `parseE()` mà chưa tiến. → an toàn cho recursive-descent.
- **(b)** Dịch `E → T { + T }` về BNF thuần bằng một non-terminal phụ đuôi (tail):
  ```
  E  → T E'
  E' → + T E' | ε
  ```
  `E'` lặp "`+ T`" không hoặc nhiều lần qua đệ quy **phải** (không phá recursive-descent vì có terminal `+` ở đầu, luôn tiêu thụ token trước khi đệ quy). Đây chính là dạng chuẩn sau khi **khử đệ quy trái** — sẽ gặp lại ở [Lesson 04](../lesson-04-recursive-descent-parser/).

## Tham khảo và bài tiếp theo

- Bài trước: [Lesson 02 — Lexer](../lesson-02-lexer/) — sinh dãy token mà grammar bài này tiêu thụ.
- Nền toán: [Set & định nghĩa đệ quy](../../../DataFoundations/03-MathFoundations/lesson-01-set-theory/) · [Proof & Induction](../../../DataFoundations/03-MathFoundations/lesson-05-proof-induction/).
- **Bài tiếp theo: [Lesson 04 — Recursive-Descent Parser](../lesson-04-recursive-descent-parser/)** — biến grammar phân tầng (đã khử đệ quy trái) thành parser thật: mỗi non-terminal một hàm, dựng AST, đánh giá biểu thức.
- Minh hoạ tương tác: [visualization.html](./visualization.html) — derivation stepper dựng cây từng bước, demo ambiguity hai cây (14 vs 20) cạnh nhau, và kiểm tra chuỗi token hợp lệ/không.
</content>
</invoke>
