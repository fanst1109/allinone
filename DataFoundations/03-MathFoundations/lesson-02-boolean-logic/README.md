# Lesson 01 — Logic & Boolean Algebra (đại số Boolean)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **mệnh đề (proposition)** và 6 toán tử logic cơ bản: $\lnot$, $\land$, $\lor$, $\oplus$, $\to$, $\Leftrightarrow$.
- Vẽ và đọc thành thạo **bảng chân lý (truth table)** cho biểu thức bất kỳ.
- Áp dụng được **các luật đại số Boolean** để rút gọn biểu thức (De Morgan, distributive, absorption…).
- Phân biệt **tautology / contradiction / contingency** và biết cách kiểm tra.
- Hiểu **mối liên hệ trực tiếp** giữa logic ↔ bitwise (L2) ↔ tập hợp (L3): cùng một đại số trên 3 miền khác nhau.
- Cài đặt bộ đánh giá biểu thức logic và sinh bảng chân lý bằng Go.

## Kiến thức tiền đề

- [Lesson 02 — Bitwise Operations](../../01-NumberRepresentation/lesson-02-bitwise-ops/) — đã quen với AND/OR/XOR/NOT trên bit. Bài này tổng quát hóa lên mức "đúng/sai".
- [Lesson 01 — Set Theory](../../02-SetTheory/lesson-01-set-theory/) — đã biết $\cap$, $\cup$, complement. Sẽ thấy chúng tương đương với $\land$, $\lor$, $\lnot$.

## 1. Vì sao học logic trước data structure?

Vì **mọi điều kiện** trong code và mọi câu hỏi *"phần tử này có thuộc tập không?"* đều là logic:

- `if x > 0 && (y == 0 || z != nil)` — đây là biểu thức logic.
- Predicate cho `filter`, `find`, `delete-if` — đều là hàm trả về `bool`.
- Loop invariant, vòng lặp dừng khi nào — viết bằng logic.
- Trong DS sau này: BST search điều kiện `key < node.val`, trie tìm prefix khớp, hash table check collision — tất cả dựa trên logic so sánh.

Logic còn cho bạn ngôn ngữ để **chứng minh** code đúng (formal reasoning) thay vì chỉ "chạy thử thấy ổn".

**Câu hỏi mở:** cho biểu thức `(a && b) || (a && !b)`, có cách nào viết ngắn hơn không, và làm sao biết hai biểu thức "tương đương"? → bài này sẽ trả lời.

## 2. Mệnh đề (proposition)

**Mệnh đề** là một câu khẳng định có giá trị **đúng (true)** hoặc **sai (false)** — không có gì ở giữa.

Ví dụ:

| Câu | Mệnh đề? | Giá trị |
| --- | --- | --- |
| "Hà Nội là thủ đô Việt Nam" | Có | True |
| "1 + 1 = 3" | Có | False |
| "x > 5" | **Phụ thuộc x** (predicate, không phải proposition đơn) | — |
| "Hôm nay đẹp không?" | Không (câu hỏi) | — |
| "Hãy đóng cửa" | Không (mệnh lệnh) | — |

Trong logic, ta đặt tên mệnh đề bằng chữ cái: $p$, $q$, $r$… Mỗi biến chỉ nhận 1 trong 2 giá trị: $T$ hoặc $F$ (hoặc $1$/$0$).

> **Lưu ý:** "x > 5" tự nó không phải mệnh đề (nó là **predicate** — phụ thuộc biến). Khi gán giá trị `x = 7` thì nó trở thành mệnh đề `True`. Bài này tập trung mệnh đề; predicate sẽ học sâu hơn khi đụng tới query/filter.

## 3. Các toán tử logic

### 3.1. NOT — phủ định (`¬p`, `!p`)

Đảo ngược giá trị.

| $p$ | $\lnot p$ |
| --- | --- |
| T | F |
| F | T |

Đọc: *"không p"*, *"phủ định p"*.

### 3.2. AND — hội (`p ∧ q`, `p && q`)

Đúng khi **cả hai** đều đúng.

| $p$ | $q$ | $p \land q$ |
| --- | --- | --- |
| T | T | **T** |
| T | F | F |
| F | T | F |
| F | F | F |

### 3.3. OR — tuyển (`p ∨ q`, `p || q`)

Đúng khi **ít nhất một** đúng (OR trong logic là *inclusive*, không loại trừ).

| $p$ | $q$ | $p \lor q$ |
| --- | --- | --- |
| T | T | **T** |
| T | F | T |
| F | T | T |
| F | F | F |

> **Bẫy ngôn ngữ:** Tiếng Việt nói "hoặc" thường có nghĩa *exclusive* ("ăn cơm hoặc ăn phở" = chỉ chọn 1). Trong logic mặc định, $\lor$ là *inclusive* — nếu cả hai đều đúng, kết quả vẫn đúng. Muốn *exclusive* phải dùng XOR (mục tiếp).

### 3.4. XOR — tuyển loại trừ (`p ⊕ q`)

Đúng khi **đúng một trong hai** (không phải cả hai).

| $p$ | $q$ | $p \oplus q$ |
| --- | --- | --- |
| T | T | F |
| T | F | T |
| F | T | T |
| F | F | F |

XOR chính là **"khác nhau"** — và đây là lý do trong bitwise, `a ^ b` thường dùng để swap hoặc detect difference (xem L2).

### 3.5. Implication — kéo theo (`p → q`)

*"Nếu p thì q"*. Chỉ **sai duy nhất** khi tiền đề đúng nhưng kết luận sai.

| $p$ | $q$ | $p \to q$ |
| --- | --- | --- |
| T | T | T |
| T | F | **F** ← chỉ trường hợp này sai |
| F | T | T |
| F | F | T |

**Vì sao $F \to T = T$ và $F \to F = T$?** — Đây là điểm gây lú nhất cho người mới. Trực giác: "Nếu trời mưa thì đường ướt" — nếu trời **không mưa** ($p = F$), thì câu nói **không sai dù đường có ướt hay không**. Logic chỉ sai khi *có lý do để bác bỏ*; với tiền đề sai, không có lý do để bác bỏ.

Tương đương quan trọng: $p \to q \equiv \lnot p \lor q$ (kiểm tra bằng bảng chân lý sẽ thấy 4 hàng khớp).

### 3.6. Biconditional — tương đương (`p ↔ q`)

Đúng khi **hai vế cùng giá trị**.

| $p$ | $q$ | $p \Leftrightarrow q$ |
| --- | --- | --- |
| T | T | T |
| T | F | F |
| F | T | F |
| F | F | T |

Để ý: $p \Leftrightarrow q$ chính là $\lnot(p \oplus q)$ — *"không khác nhau"* = *"giống nhau"*.

### 3.7. Tổng kết bảng

| Toán tử | Ký hiệu | Code (Go) | Khi nào True |
| --- | --- | --- | --- |
| NOT | $\lnot p$ | `!p` | $p = F$ |
| AND | $p \land q$ | `p && q` | Cả hai True |
| OR | $p \lor q$ | <code>p &#124;&#124; q</code> | Ít nhất một True |
| XOR | $p \oplus q$ | `p != q` (với bool) | Khác nhau |
| Implies | $p \to q$ | `!p \|\| q` | Không (T→F) |
| Iff | $p \Leftrightarrow q$ | `p == q` (với bool) | Cùng giá trị |

## 4. Truth table — bảng chân lý

**Mục đích**: cho một biểu thức logic, liệt kê giá trị của nó với **mọi** combo đầu vào.

Với $n$ biến, bảng có $2^n$ hàng. Ví dụ biểu thức $(p \land q) \lor \lnot r$ có 3 biến → 8 hàng.

### 4.1. Walk-through: dựng bảng cho `(p ∧ q) ∨ ¬r`

Bước 1: liệt kê 8 tổ hợp $(p, q, r)$.

Bước 2: tính các biểu thức trung gian rồi kết quả cuối.

| $p$ | $q$ | $r$ | $p \land q$ | $\lnot r$ | $(p \land q) \lor \lnot r$ |
| --- | --- | --- | --- | --- | --- |
| T | T | T | T | F | **T** |
| T | T | F | T | T | **T** |
| T | F | T | F | F | F |
| T | F | F | F | T | **T** |
| F | T | T | F | F | F |
| F | T | F | F | T | **T** |
| F | F | T | F | F | F |
| F | F | F | F | T | **T** |

→ Kết quả: True ở 5/8 hàng. Biểu thức là **contingency** (đôi khi đúng, đôi khi sai).

### 4.2. Code Go tạo bảng

Ý tưởng: dùng $n$ bit, mỗi bit là 1 biến. Lặp $i$ từ $0$ tới $2^n - 1$, đọc từng bit ra biến.

```go
// Ví dụ với n = 3 biến p, q, r — đánh số bit 2, 1, 0
for i := 0; i < (1 << 3); i++ {
    p := (i>>2)&1 == 1
    q := (i>>1)&1 == 1
    r := (i>>0)&1 == 1
    result := (p && q) || !r
    fmt.Printf("%t %t %t -> %t\n", p, q, r, result)
}
```

Xem `solutions.go` cho phiên bản tổng quát với $n$ biến và hàm đánh giá tùy ý.

## 5. Các luật đại số Boolean

Đây là **trái tim** của bài. Các luật này cho phép biến đổi biểu thức mà **không đổi giá trị** — y như đại số số học cho phép $(x+y)+z = x+(y+z)$.

### 5.1. Bảng luật

| Tên luật | Dạng AND | Dạng OR |
| --- | --- | --- |
| **Identity** | $p \land T \equiv p$ | $p \lor F \equiv p$ |
| **Domination** | $p \land F \equiv F$ | $p \lor T \equiv T$ |
| **Idempotent** | $p \land p \equiv p$ | $p \lor p \equiv p$ |
| **Double negation** | $\lnot\lnot p \equiv p$ | — |
| **Commutative** | $p \land q \equiv q \land p$ | $p \lor q \equiv q \lor p$ |
| **Associative** | $(p \land q) \land r \equiv p \land (q \land r)$ | $(p \lor q) \lor r \equiv p \lor (q \lor r)$ |
| **Distributive** | $p \land (q \lor r) \equiv (p \land q) \lor (p \land r)$ | $p \lor (q \land r) \equiv (p \lor q) \land (p \lor r)$ |
| **De Morgan** | $\lnot(p \land q) \equiv \lnot p \lor \lnot q$ | $\lnot(p \lor q) \equiv \lnot p \land \lnot q$ |
| **Absorption** | $p \land (p \lor q) \equiv p$ | $p \lor (p \land q) \equiv p$ |
| **Complement** | $p \land \lnot p \equiv F$ | $p \lor \lnot p \equiv T$ |

### 5.2. De Morgan — quan trọng nhất trong thực tế

> "Phủ định của một AND là OR của các phủ định" và ngược lại.

$\lnot(p \land q) \equiv \lnot p \lor \lnot q$
$\lnot(p \lor q) \equiv \lnot p \land \lnot q$

**Walk-through bằng bảng chân lý** (xác nhận $\lnot(p \land q) \equiv \lnot p \lor \lnot q$):

| $p$ | $q$ | $p \land q$ | $\lnot(p \land q)$ | $\lnot p$ | $\lnot q$ | $\lnot p \lor \lnot q$ |
| --- | --- | --- | --- | --- | --- | --- |
| T | T | T | **F** | F | F | **F** |
| T | F | F | **T** | F | T | **T** |
| F | T | F | **T** | T | F | **T** |
| F | F | F | **T** | T | T | **T** |

→ Cột $\lnot(p \land q)$ khớp với cột $\lnot p \lor \lnot q$ từng hàng → tương đương.

**Ứng dụng code:**

```go
// Trước: kiểm tra "không phải cả x > 0 và y > 0"
if !(x > 0 && y > 0) { /* ... */ }

// Sau khi áp De Morgan, đôi khi dễ đọc hơn:
if x <= 0 || y <= 0 { /* ... */ }
```

Đặc biệt khi điều kiện ban đầu phức tạp, De Morgan giúp **đẩy `!` vào trong** rồi đơn giản hóa.

### 5.3. Absorption — luật ít người để ý

$p \land (p \lor q) \equiv p$
$p \lor (p \land q) \equiv p$

Trực giác: nếu $p$ đã đúng thì $p \lor q$ cũng đúng (do OR), nên $p \land (p \lor q) \equiv p \land T \equiv p$. Tương tự cho dạng kia.

Ứng dụng: rút gọn điều kiện check trùng.

### 5.4. Walk-through đơn giản hóa

Rút gọn $(a \land b) \lor (a \land \lnot b)$:

```
(a ∧ b) ∨ (a ∧ ¬b)
= a ∧ (b ∨ ¬b)     [Distributive ngược]
= a ∧ T            [Complement: b ∨ ¬b ≡ T]
= a                [Identity]
```

→ Hai nhánh hợp lại còn $a$. Trong code: thay `if (a && b) || (a && !b)` bằng `if a`.

## 6. Tautology / Contradiction / Contingency

Cho biểu thức $\varphi$ có $n$ biến:

- **Tautology** — $\varphi$ đúng ở **mọi** hàng truth table. Ví dụ: $p \lor \lnot p$ (luôn đúng).
- **Contradiction** — $\varphi$ sai ở **mọi** hàng. Ví dụ: $p \land \lnot p$ (luôn sai).
- **Contingency** — vừa đúng vừa sai. Phần lớn biểu thức rơi vào đây.

### 6.1. Vì sao quan tâm?

- **Tautology = luật logic**. Khi chứng minh $A \equiv B$, thực chất là chứng minh $A \Leftrightarrow B$ là tautology.
- **Contradiction = bug**. Nếu điều kiện trong code là contradiction (luôn false), nhánh đó là dead code.
- **Tự động kiểm tra**: cho 2 biểu thức $A$, $B$, build truth table cho $A \Leftrightarrow B$, nếu tautology thì $A \equiv B$. Đây là cách ép buộc 100% chính xác.

### 6.2. Bài toán SAT

Hỏi: "Có tồn tại assignment để $\varphi$ đúng không?" — gọi là **SAT (satisfiability)**.

- Brute force: thử cả $2^n$ hàng → $O(2^n)$. Bài này dùng cách này.
- SAT là bài toán NP-complete; thực tế dùng SAT solver chuyên dụng (Z3, MiniSat). Với $n \leq 20$ thì brute force vẫn ổn (≤ ~1M hàng).

## 7. Liên hệ Logic ↔ Bitwise ↔ Set

**Đây là phần quan trọng nhất**: 3 lý thuyết khác nhau **dùng cùng một đại số**.

| Logic | Bitwise (L2) | Set (L3) |
| --- | --- | --- |
| $p \land q$ | `a & b` | $A \cap B$ |
| $p \lor q$ | <code>a &#124; b</code> | $A \cup B$ |
| $p \oplus q$ | `a ^ b` | $A \triangle B$ (sym. diff.) |
| $\lnot p$ | `~a` | $A^c$ (complement) |
| $T$ | tất cả bit 1 | tập vũ trụ $U$ |
| $F$ | `0` | $\emptyset$ |
| De Morgan | `~(a & b) == ~a \| ~b` | $(A \cap B)^c = A^c \cup B^c$ |

→ Nếu bạn biết một, bạn biết cả ba. Đây là khái niệm **đại số Boolean tổng quát** — và là lý do bitmask cài tập hợp được (L3 §6).

**Ví dụ De Morgan chéo miền:**

Logic: "Không phải (trời mưa **và** trời lạnh)" ⇔ "Trời không mưa **hoặc** trời không lạnh".

Set: phần bù của (mưa ∩ lạnh) = (không mưa) ∪ (không lạnh).

Bitwise: `~(rain_mask & cold_mask) == ~rain_mask | ~cold_mask`.

→ Cùng một câu, ba cách phát biểu.

## 8. Ứng dụng trong lập trình thực tế

### 8.1. Đơn giản hóa điều kiện

```go
// Trước: 4 nhánh
if (isAdmin && hasPermission) || (isAdmin && !hasPermission) {
    allow()
}
// Sau: dùng distributive ngược
if isAdmin {
    allow()
}
```

### 8.2. Short-circuit & thứ tự đánh giá

Trong Go (và đa số ngôn ngữ), `&&` và `||` là **short-circuit**:

- `a && b`: nếu `a = false`, **không đánh giá** `b`.
- `a || b`: nếu `a = true`, **không đánh giá** `b`.

→ Tận dụng để **rẻ trước, đắt sau**:

```go
if user != nil && user.HasPermission("read") { /* ... */ }
// nil-check trước → tránh nil pointer khi gọi method
```

Không thể đổi thứ tự (do short-circuit và side effect), nhưng *commutative law* của logic vẫn đúng về **giá trị**.

### 8.3. Predicate logic — ngó nghiêng vào tương lai

Khi nói $\forall x \in S, P(x)$ ("mọi x trong S thỏa P") — đó là **quantified predicate**, mở rộng từ logic cơ bản. Trong Go:

```go
all := true
for _, x := range S {
    if !P(x) { all = false; break }
}
// Tương đương ∀x ∈ S, P(x)
```

Khi học query language (SQL `WHERE`, MongoDB filter, GraphQL), predicate logic là nền tảng.

## 9. Cài đặt trong Go — xem file

Xem [solutions.go](./solutions.go) cho:

- `TruthTable(n int, eval func([]bool) bool) [][]bool` — tổng quát, tạo bảng chân lý cho $n$ biến.
- `IsTautology`, `IsContradiction`, `IsContingent` — phân loại biểu thức.
- `AreEquivalent` — so sánh 2 biểu thức.
- Demo De Morgan, simplification.

## 10. Bài tập thực hành

### Bài 1. Truth table thủ công

Vẽ bảng chân lý cho $(p \to q) \land (q \to p)$. Nhận xét: kết quả tương đương biểu thức nào đơn giản hơn?

### Bài 2. Áp dụng De Morgan

Đơn giản hóa biểu thức sau, chỉ rõ luật dùng ở mỗi bước:

```
¬((a ∨ b) ∧ (¬c))
```

### Bài 3. Kiểm tra tương đương

Hai biểu thức sau có tương đương không? Chứng minh bằng truth table:

```
A: p → (q → r)
B: (p ∧ q) → r
```

### Bài 4. Tautology check

Trong 3 biểu thức sau, cái nào là tautology, cái nào là contradiction, cái nào contingency?

1. $(p \to q) \lor (q \to p)$
2. $(p \land q) \land \lnot(p \lor q)$
3. $(p \oplus q) \land p$

### Bài 5. Mapping logic ↔ set

Cho 3 mệnh đề $p$, $q$, $r$ và tương ứng 3 tập $P$, $Q$, $R$ ($x \in P \Leftrightarrow p(x) = T$ …).

Viết tương đương dạng set cho mỗi biểu thức:

- $p \land \lnot q$
- $(p \lor q) \land \lnot r$
- $\lnot(p \land q)$ (áp De Morgan)

### Bài 6. Đơn giản hóa code

Rút gọn đoạn điều kiện sau (Go), giải thích bằng luật:

```go
if (isActive && !isDeleted) || (isActive && isDeleted && hasOverride) {
    process()
}
```

---

## Lời giải chi tiết

### Bài 1.

| $p$ | $q$ | $p \to q$ | $q \to p$ | $(p \to q) \land (q \to p)$ |
| --- | --- | --- | --- | --- |
| T | T | T | T | **T** |
| T | F | F | T | F |
| F | T | T | F | F |
| F | F | T | T | **T** |

→ Cột cuối có T ở các hàng $p = q$. Đây chính là **$p \Leftrightarrow q$** (biconditional). Vậy $(p \to q) \land (q \to p) \equiv p \Leftrightarrow q$.

Đây là một **luật tương đương cơ bản**: tương đương = kéo theo cả hai chiều.

### Bài 2.

```
¬((a ∨ b) ∧ (¬c))
= ¬(a ∨ b) ∨ ¬(¬c)     [De Morgan ngoài]
= (¬a ∧ ¬b) ∨ ¬(¬c)    [De Morgan trong]
= (¬a ∧ ¬b) ∨ c        [Double negation]
```

→ Kết quả: $(\lnot a \land \lnot b) \lor c$.

Trong code: `!((a || b) && !c)` ≡ `(!a && !b) || c`.

### Bài 3.

Build bảng chân lý cho cả $A$ và $B$:

| $p$ | $q$ | $r$ | $q \to r$ | $A: p \to (q \to r)$ | $p \land q$ | $B: (p \land q) \to r$ |
| --- | --- | --- | --- | --- | --- | --- |
| T | T | T | T | T | T | T |
| T | T | F | F | F | T | F |
| T | F | T | T | T | F | T |
| T | F | F | T | T | F | T |
| F | T | T | T | T | F | T |
| F | T | F | F | T | F | T |
| F | F | T | T | T | F | T |
| F | F | F | T | T | F | T |

→ Cột $A$ và cột $B$ khớp ở mọi hàng → **tương đương**.

Đây là một luật quen thuộc: **currying logic**. $p \to (q \to r) \equiv (p \land q) \to r$ — tương ứng với tư duy `func(p) func(q) r` ≡ `func(p, q) r` trong functional programming.

### Bài 4.

**1) $(p \to q) \lor (q \to p)$:**

| $p$ | $q$ | $p \to q$ | $q \to p$ | OR |
| --- | --- | --- | --- | --- |
| T | T | T | T | **T** |
| T | F | F | T | **T** |
| F | T | T | F | **T** |
| F | F | T | T | **T** |

→ Luôn T → **Tautology**.

Trực giác: với 2 mệnh đề bất kỳ, **luôn có ít nhất một chiều kéo theo đúng** (chính xác hơn: nếu $p$ đúng thì $q \to p$ đúng do hậu đề đúng; nếu $p$ sai thì $p \to q$ đúng do tiền đề sai).

**2) $(p \land q) \land \lnot(p \lor q)$:**

Phân tích: $(p \land q)$ yêu cầu cả hai đúng. $\lnot(p \lor q)$ yêu cầu cả hai sai. Hai điều này không thể đồng thời → **Contradiction**.

Truth table xác nhận:

| $p$ | $q$ | $p \land q$ | $p \lor q$ | $\lnot(p \lor q)$ | AND |
| --- | --- | --- | --- | --- | --- |
| T | T | T | T | F | **F** |
| T | F | F | T | F | **F** |
| F | T | F | T | F | **F** |
| F | F | F | F | T | **F** |

**3) $(p \oplus q) \land p$:**

| $p$ | $q$ | $p \oplus q$ | AND |
| --- | --- | --- | --- |
| T | T | F | F |
| T | F | T | **T** |
| F | T | T | F |
| F | F | F | F |

→ 1 hàng T, 3 hàng F → **Contingency**.

Rút gọn: $(p \oplus q) \land p \equiv p \land \lnot q$ (chỉ đúng khi p=T, q=F — đúng như hàng duy nhất T ở trên).

### Bài 5.

Quy ước: $P = \{x : p(x) = T\}$, tương tự cho $Q$, $R$.

| Logic | Set |
| --- | --- |
| $p \land \lnot q$ | $P \cap Q^c$ (phần thuộc P nhưng không thuộc Q = $P \setminus Q$) |
| $(p \lor q) \land \lnot r$ | $(P \cup Q) \cap R^c$ (= $(P \cup Q) \setminus R$) |
| $\lnot(p \land q)$ | $(P \cap Q)^c = P^c \cup Q^c$ (De Morgan trên tập) |

→ Cùng một câu, hai cách viết.

### Bài 6.

```
(isActive ∧ ¬isDeleted) ∨ (isActive ∧ isDeleted ∧ hasOverride)
= isActive ∧ (¬isDeleted ∨ (isDeleted ∧ hasOverride))     [Distributive ngược, gom isActive]
```

Đơn giản hóa biểu thức trong ngoặc:

```
¬isDeleted ∨ (isDeleted ∧ hasOverride)
= (¬isDeleted ∨ isDeleted) ∧ (¬isDeleted ∨ hasOverride)   [Distributive]
= T ∧ (¬isDeleted ∨ hasOverride)                          [Complement]
= ¬isDeleted ∨ hasOverride                                [Identity]
```

→ Tổng thể:

```go
if isActive && (!isDeleted || hasOverride) {
    process()
}
```

Trực giác: *"đang active VÀ (chưa bị xóa HOẶC có quyền override)"* — rõ ràng và ngắn hơn. Đây là cách áp dụng đại số Boolean để cải thiện code readability.

**Độ phức tạp**:

- Truth table cho $n$ biến: $O(2^n)$ hàng, mỗi hàng tính $O(|\text{biểu thức}|)$ → toàn bộ $O(2^n \cdot |\varphi|)$.
- Kiểm tra tautology / equivalent: cùng $O(2^n \cdot |\varphi|)$ — duyệt cả bảng.
- SAT brute force: $O(2^n \cdot |\varphi|)$; dùng được tới $n \approx 25\text{-}30$. Vượt → cần SAT solver.

## Tham khảo & bài tiếp theo

- **Tiếp theo**: [Lesson 03 — Combinatorics](../lesson-03-combinatorics/) (đếm, hoán vị, tổ hợp), rồi [Lesson 04 — Modular Arithmetic](../lesson-04-modular-arithmetic/) và [Lesson 05 — Proof & Induction](../lesson-05-proof-induction/).
- **Sách tham khảo**: *Discrete Mathematics and Its Applications* (Rosen), chương 1–2.
- **Phần mềm**: thử [Wolfram Alpha](https://www.wolframalpha.com/) gõ `truth table for (p ∧ q) ∨ ¬r` để đối chiếu.
- **File lời giải Go**: [solutions.go](./solutions.go).
