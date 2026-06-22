# Lesson 12 — Tối ưu hóa (Optimization)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao** IR sinh ra từ frontend thường thừa thãi (tính lại, hằng chưa gập, code chết) — và vì sao phải tối ưu.
- Nắm nguyên tắc vàng: tối ưu **bắt buộc bảo toàn ngữ nghĩa (semantics-preserving / safe)**. Chương trình sau tối ưu phải cho **cùng kết quả quan sát được** như trước.
- Phân biệt tối ưu **local** (trong một basic block) và **global** (trên toàn CFG).
- Cài đặt và walk-through 5 phép tối ưu kinh điển trên IR ba địa chỉ (three-address code):
  - **Constant folding** — gập biểu thức hằng lúc dịch.
  - **Constant propagation** — thay biến bằng hằng đã biết.
  - **Dead code elimination (DCE)** — bỏ lệnh không ảnh hưởng kết quả.
  - **Common subexpression elimination (CSE)** — tính biểu thức lặp một lần.
  - **Algebraic simplification** + **strength reduction** — đơn giản hóa đại số, hạ chi phí phép tính.
- Hiểu sơ lược **loop-invariant code motion** và đánh đổi **thời gian compile ↔ tốc độ chạy** (`-O0`..`-O3`).
- Liên hệ tới compiler tối ưu **tensor** trong AI/ML.

## Kiến thức tiền đề

- [Lesson 11 — IR (Three-Address Code)](../lesson-01-ir-three-address/) — bài này thao tác trực tiếp trên IR ba địa chỉ; bạn cần biết dạng `t = a op b`.
- [DataFoundations — Boolean Logic](../../../DataFoundations/03-MathFoundations/lesson-02-boolean-logic/) — phần loại bỏ nhánh `if` luôn-sai dùng phân loại tautology/contradiction.
- [Algorithms](../../../Algorithms/) — DCE và loop-invariant motion dựa trên ý tưởng duyệt đồ thị / tính bao đóng (reachability, liveness).

## 1. Vì sao phải tối ưu?

💡 **Trực giác / Hình dung.** Hãy tưởng tượng một thợ mộc làm xong một cái bàn rồi mới phát hiện mình cưa thừa 3 thanh gỗ, đóng 2 cái đinh vào chỗ không ai thấy, và lau một mặt bàn... úp xuống đất. Bàn vẫn dùng được, nhưng tốn công vô ích. Frontend của compiler dịch code "thẳng tuột", từng câu lệnh một, nên IR sinh ra cũng đầy "thanh gỗ thừa" như vậy. **Tối ưu hóa** là người thợ đi sau dọn dẹp: bỏ việc thừa, làm gọn, nhưng **cái bàn cuối cùng phải y hệt** (cùng chức năng).

Mở đầu bằng một câu hỏi cụ thể:

> Cho đoạn mã nguồn:
> ```
> x = 2 + 3;
> y = x * 1;
> z = 0 * q;
> ```
> Vì sao một compiler bật tối ưu lại biến nó thành:
> ```
> x = 5;
> y = 5;
> z = 0;
> ```
> và còn có thể bỏ luôn cả `q` nếu `q` không dùng ở đâu khác?

Câu trả lời (chính là toàn bộ bài này):

- `2 + 3` là biểu thức **hằng** → tính ngay lúc dịch thành `5` (**constant folding**, §3).
- `x` giờ đã biết bằng `5` → thay `x` trong `x * 1` bằng `5` (**constant propagation**, §4).
- `5 * 1 = 5` (folding lần nữa), và `* 1` vốn là **đơn vị nhân** nên `5 * 1 → 5` (**algebraic simplification**, §6).
- `0 * q = 0` với **mọi** `q` (giả định `q` không có side effect) → `z = 0` (**algebraic simplification**: nhân 0).
- Nếu sau đó `q` không còn được dùng → lệnh tính `q` là **code chết**, bỏ đi (**dead code elimination**, §5).

### 1.1 IR ban đầu thừa ở đâu?

Frontend ưu tiên **đơn giản và đúng**, không ưu tiên gọn. Ba nguồn dư thừa điển hình:

| Nguồn dư thừa | Ví dụ IR thô | Sau tối ưu |
| --- | --- | --- |
| **Tính lại (recomputation)** | `t1 = b*c` rồi sau đó `t2 = b*c` | tính `b*c` một lần |
| **Hằng chưa gập (unfolded constants)** | `t = 60 * 60` | `t = 3600` |
| **Code chết (dead code)** | gán `t = ...` rồi không bao giờ đọc `t` | xóa lệnh |

❓ **Câu hỏi tự nhiên của người đọc.**

- *"Sao frontend không sinh IR gọn ngay từ đầu?"* — Vì frontend dịch theo từng nút AST một cách máy móc, không nhìn toàn cục. Tách trách nhiệm (frontend đúng, optimizer gọn) làm cả hai phần đơn giản và dễ kiểm thử hơn.
- *"Tối ưu có làm chương trình chạy SAI không?"* — Không được phép. Đó là ràng buộc bất khả xâm phạm — xem §2.
- *"Tối ưu hóa giúp được bao nhiêu?"* — Tùy code, nhưng từ `-O0` lên `-O2` thường nhanh hơn 2–5×, đôi khi hơn. Vòng lặp số học là nơi hưởng lợi nhất.

🔁 **Dừng lại tự kiểm tra.**
1. Trong `a = 5; b = a + 0; c = b`, có bao nhiêu cơ hội tối ưu?
2. Phép `0 * q → 0` có an toàn không nếu việc tính `q` có thể làm chương trình treo/lỗi?

<details><summary>Đáp án</summary>

1. Ba: `a + 0 → a` (algebraic), `b = a` rồi `c = b` → propagate `c = a` (copy propagation), nếu `a`/`b` không còn dùng thì DCE. Cuối cùng còn `a = 5` (và `c = 5` nếu `c` được dùng).
2. **Không hẳn.** Nếu `q` là lời gọi hàm có side effect (in ra màn hình, chia cho 0, truy cập mảng ngoài biên) thì xóa việc tính `q` **làm đổi ngữ nghĩa**. Đây chính là cái bẫy ở §2 và ⚠ §6. `0 * q → 0` chỉ an toàn khi `q` là biểu thức **thuần (pure)**, không có hiệu ứng phụ.
</details>

📝 **Tóm tắt mục 1.** IR thô thừa vì frontend dịch máy móc. Ba nguồn thừa: tính lại, hằng chưa gập, code chết. Tối ưu dọn dẹp chúng nhưng phải giữ nguyên kết quả quan sát được.

## 2. Nguyên tắc: bảo toàn ngữ nghĩa (safe)

💡 **Trực giác.** Một phép tối ưu giống như **biên tập lại một câu văn**: được phép đổi cách diễn đạt, rút gọn, nhưng **không được đổi ý nghĩa**. "Tôi đã ăn xong và rồi tôi rời đi" → "Tôi ăn xong rồi rời đi" là OK. Đổi thành "Tôi rời đi rồi ăn" là **sai** — đảo thứ tự đổi ý nghĩa.

**Định nghĩa.** Một phép biến đổi IR là **an toàn (safe / semantics-preserving)** nếu với **mọi** input, chương trình sau biến đổi cho **cùng hành vi quan sát được** (cùng giá trị trả về, cùng output, cùng side effect theo cùng thứ tự) như chương trình trước.

- **(a) Là gì** — "An toàn" = không đổi cái mà người dùng quan sát được.
- **(b) Vì sao cần** — Vì tối ưu vô nghĩa nếu nó làm code chạy sai. Một compiler sinh code nhanh nhưng sai là một compiler hỏng. Đây là tiêu chí số một, đứng trên "nhanh" và "nhỏ".
- **(c) Ví dụ trực giác bằng số** — `x = 3 + 4` → `x = 7` an toàn (mọi input đều cho `x = 7`). Nhưng `x = a / b` → `x = 0` (đoán bừa) **không an toàn**: nếu `a = 6, b = 2` thì đúng phải là `3`, không phải `0`.

### 2.1 Local vs Global

Phạm vi phân tích quyết định tối ưu "nhìn xa" được tới đâu:

| | **Local optimization** | **Global optimization** |
| --- | --- | --- |
| Phạm vi | Trong **một basic block** (đoạn lệnh chạy tuần tự, không rẽ nhánh ở giữa) | Trên **toàn CFG** (control-flow graph — đồ thị các block) |
| Cần phân tích gì | Chỉ luồng dữ liệu trong block | Liveness, reaching definitions trên toàn đồ thị |
| Ví dụ | Folding, CSE trong một block | DCE xuyên block, loop-invariant motion |
| Độ khó | Dễ | Khó hơn (cần data-flow analysis) |

**Basic block** là khái niệm nền: một dãy lệnh **vào ở đầu, ra ở cuối**, không có nhãn nhảy vào giữa, không có nhánh ở giữa. Trong một block, lệnh chạy lần lượt 100% → suy luận dễ.

⚠ **Lỗi thường gặp — tối ưu sai phá ngữ nghĩa.** Ba cái bẫy kinh điển:

1. **Bỏ qua side effect.** `t = f();` với `f` in ra màn hình. Nếu thấy `t` không dùng mà xóa luôn lời gọi `f()` → mất dòng in. Lệnh có side effect **không bao giờ là dead code** dù biến kết quả không dùng.
2. **Số thực (floating point) không tuân luật đại số.** Với số thực, `(a + b) + c ≠ a + (b + c)` về bit (làm tròn khác nhau), và `x * 0.0` **không** luôn bằng `0.0` (nếu `x = NaN` hoặc `x = ∞` thì `x * 0.0 = NaN`). Vì vậy `x * 0 → 0` chỉ chắc chắn an toàn với **số nguyên**.
3. **Over-optimize / đổi thứ tự quan sát được.** Đổi thứ tự hai lời gọi có side effect, hoặc loại bỏ một vòng lặp "có vẻ vô ích" nhưng thực ra đang chờ/đếm thời gian, làm đổi hành vi. "An toàn" phải đúng với **mọi** input, không chỉ input bạn nghĩ tới.

❓ **Câu hỏi tự nhiên.** *"Vậy compiler làm sao biết một lời gọi có side effect hay không?"* — Bằng **phân tích thuần khiết (purity analysis)**: nếu hàm chỉ đọc tham số và trả giá trị, không ghi biến toàn cục / không I/O, nó **pure** → tối ưu thoải mái. Khi không chắc, compiler chọn **bảo thủ (conservative)**: coi như có side effect, không xóa. Thà bỏ lỡ một tối ưu còn hơn sinh code sai.

🔁 **Dừng lại tự kiểm tra.**
1. `t = x + 0` với `x` là `int` → có an toàn để rút thành `t = x` không? Còn nếu `x` là `float`?
2. Một lệnh `print(y)` mà `y` không được dùng ở đâu sau đó — có phải dead code không?

<details><summary>Đáp án</summary>

1. Với `int`: an toàn tuyệt đối (`x + 0 = x` mọi `x`). Với `float`: `x + 0.0 = x` đúng cho hầu hết giá trị, nhưng `x = -0.0` thì `-0.0 + 0.0 = +0.0` (đổi dấu zero) — đa số compiler vẫn coi an toàn trừ chế độ IEEE strict. Bài học: **luật đại số trên float có ngoại lệ**, phải cẩn thận.
2. **Không.** `print` là side effect (ghi ra màn hình). Dù `y` không dùng tiếp, bản thân `print` là kết quả quan sát được → không được xóa.
</details>

📝 **Tóm tắt mục 2.** Tối ưu phải an toàn = cùng hành vi quan sát với mọi input. Local (trong block) dễ, global (toàn CFG) cần data-flow analysis. Ba bẫy: side effect, số thực, đổi thứ tự. Khi không chắc → bảo thủ.

## 3. Constant Folding — gập biểu thức hằng

💡 **Trực giác.** Nếu bạn viết `60 * 60 * 24` (số giây trong một ngày), không lý do gì để CPU lúc chạy phải nhân ba lần — compiler tính sẵn `86400` ngay lúc dịch và "đóng băng" nó vào code. Giống như đầu bếp **sơ chế trước** thay vì để khách chờ.

**Định nghĩa.** **Constant folding** là phép tính sẵn (tại thời điểm dịch) mọi biểu thức mà **tất cả toán hạng đều là hằng đã biết**, rồi thay biểu thức bằng kết quả.

Bốn ví dụ số cụ thể (verify cả hai vế):

| Biểu thức IR | Tính | Sau folding |
| --- | --- | --- |
| `t = 2 + 3` | `2 + 3 = 5` | `t = 5` |
| `t = 60 * 60` | `60 * 60 = 3600` | `t = 3600` |
| `t = 7 - 10` | `7 - 10 = -3` | `t = -3` (âm) |
| `t = 100 / 8` | `100 / 8 = 12` (chia nguyên) | `t = 12` |

Thêm hai ví dụ logic/so sánh (folding không chỉ cho số học):

- `t = 5 > 3` → `t = true`.
- `t = (1 == 2)` → `t = false`.

### 3.1 Walk-through trên IR thật

Xét biểu thức nguồn `2 * 3 + 4 * 5`. Frontend sinh IR ba địa chỉ (mỗi phép một dòng):

```
Trước:
  t1 = 2 * 3
  t2 = 4 * 5
  t3 = t1 + t2
```

Folding duyệt từng lệnh, hễ cả hai toán hạng là hằng thì tính:

```
Bước 1: t1 = 2 * 3   → cả 2 và 3 là hằng → t1 = 6
Bước 2: t2 = 4 * 5   → cả 4 và 5 là hằng → t2 = 20
Bước 3: t3 = t1 + t2 → t1=6, t2=20 đã thành hằng (nhờ propagation, §4)
                     → t3 = 6 + 20 = 26
```

```
Sau (kết hợp với propagation):
  t1 = 6
  t2 = 20
  t3 = 26
```

Nếu `t1`, `t2` không dùng ở đâu khác, DCE (§5) bỏ chúng, chỉ còn `t3 = 26`.

❓ **Câu hỏi tự nhiên.**
- *"Folding cần propagation mới gập được `t1 + t2`?"* — Đúng. Bản thân folding chỉ gập khi toán hạng là **literal hằng**. Để gập `t1 + t2` ta cần biết `t1`, `t2` là hằng — đó là việc của **constant propagation** (§4). Hai pass này phối hợp, thường chạy xen kẽ tới khi không còn gì để gập.
- *"Chia cho 0 thì sao?"* — `t = 5 / 0` **không** được fold thành một hằng cụ thể; compiler để nguyên (chạy mới biết là lỗi runtime) hoặc cảnh báo. Fold thành giá trị bừa = phá ngữ nghĩa.

🔁 **Dừng lại tự kiểm tra.** Fold `t = 3 * 4 - 2`. (Gợi ý: theo thứ tự `*` trước.)

<details><summary>Đáp án</summary>

`3 * 4 = 12`, rồi `12 - 2 = 10` → `t = 10`.
</details>

📝 **Tóm tắt mục 3.** Folding = tính sẵn biểu thức toàn-hằng lúc dịch. An toàn cho số nguyên; cẩn thận chia-0 và float. Phối hợp với propagation để gập cả biểu thức nhiều bước.

## 4. Constant Propagation — lan truyền hằng

💡 **Trực giác.** Nếu bạn biết chắc "hôm nay là thứ Hai", thì mọi chỗ trong kế hoạch ghi "ngày hôm nay" bạn thay luôn bằng "thứ Hai" — đỡ phải tra lại. Compiler cũng vậy: khi biết một biến **chắc chắn** mang một hằng, nó thay biến đó bằng hằng ở mọi chỗ sử dụng.

**Định nghĩa.** **Constant propagation** thay mọi lần **dùng (use)** một biến bằng giá trị hằng của nó, nếu biết chắc tại điểm đó biến **luôn** mang đúng hằng ấy.

Bốn ví dụ:

| Trước | Sau propagation | Ghi chú |
| --- | --- | --- |
| `x = 5; y = x + 1` | `x = 5; y = 5 + 1` (→ fold → `y = 6`) | thay `x` bằng `5` |
| `a = 0; b = a` | `a = 0; b = 0` | copy của hằng |
| `n = 10; m = n * n` | `n = 10; m = 10 * 10` (→ `m = 100`) | dùng hai lần |
| `p = 7; q = p; r = q + p` | `p=7; q=7; r=7+7` (→ `r = 14`) | lan dây chuyền |

### 4.1 Walk-through trên IR thật

```
Trước:
  x = 5
  y = x * 1
  z = y + 3
```

```
Bước 1: x = 5            → ghi nhận: x ≡ 5
Bước 2: y = x * 1        → thay x bằng 5 → y = 5 * 1
                        → algebraic: 5 * 1 = 5 → fold → y = 5
                        → ghi nhận: y ≡ 5
Bước 3: z = y + 3        → thay y bằng 5 → z = 5 + 3
                        → fold → z = 8
```

```
Sau:
  x = 5
  y = 5
  z = 8
```

⚠ **Lỗi thường gặp.** Propagation chỉ an toàn nếu biến **chắc chắn** mang hằng ấy tại điểm dùng. Phản ví dụ:

```
x = 5
if (cond) { x = 9 }
y = x + 1        ← KHÔNG được thay x bằng 5!
```

Ở đây `x` có thể là `5` **hoặc** `9` khi tới `y = x + 1` (tùy `cond`). Hai định nghĩa của `x` "gặp nhau" → `x` **không** là hằng tại điểm đó. Đây là lý do propagation toàn cục cần phân tích **reaching definitions** (định nghĩa nào "với tới" được điểm dùng). Trong một basic block đơn (không rẽ nhánh) thì luôn an toàn.

❓ **Câu hỏi tự nhiên.** *"Phân biệt constant propagation với copy propagation?"* — Constant propagation thay biến bằng **hằng** (`x = 5; y = x` → `y = 5`). Copy propagation thay biến bằng **một biến khác** (`a = b; c = a + 1` → `c = b + 1`). Cùng ý tưởng, khác chỗ thay bằng hằng hay biến.

🔁 **Dừng lại tự kiểm tra.** Propagate + fold:
```
k = 4
m = k + k
n = m * 2
```

<details><summary>Đáp án</summary>

`k ≡ 4` → `m = 4 + 4 = 8` → `m ≡ 8` → `n = 8 * 2 = 16`. Kết quả: `k=4; m=8; n=16`.
</details>

📝 **Tóm tắt mục 4.** Propagation thay biến bằng hằng đã biết, mở đường cho folding. An toàn trong block đơn; xuyên block cần reaching-definitions (nếu nhiều định nghĩa "gặp nhau" thì không phải hằng).

## 5. Dead Code Elimination (DCE) — bỏ code chết

💡 **Trực giác.** Bạn nấu một nồi súp, nêm nếm xong rồi đổ đi không ai ăn — công nấu là **việc chết**. Trong code, một lệnh tính ra giá trị mà **không ai dùng** (và không có side effect) là code chết: bỏ đi không đổi kết quả.

**Định nghĩa.** **Dead code** là lệnh mà việc xóa nó **không thay đổi hành vi quan sát được**. Ba dạng chính:

1. **Dead assignment** — gán cho biến rồi không bao giờ đọc lại (và biến không có vai trò side effect).
2. **Unreachable code** — code không bao giờ chạy tới (sau `return`, trong nhánh `if (false)`).
3. **Dead branch** — nhánh điều kiện luôn-sai / luôn-đúng (sau khi fold điều kiện).

Bốn ví dụ:

| Dạng | Trước | Sau |
| --- | --- | --- |
| Dead assignment | `t = a + b   // t không dùng nữa` | (xóa cả dòng) |
| Code sau return | `return x;  y = 5;` | `return x;` |
| Nhánh `if false` | `if (false) { foo() }` | (xóa cả khối) |
| Nhánh `if true` | `if (true) { bar() } else { baz() }` | `bar()` (bỏ else) |

### 5.1 Walk-through: dead assignment

```
Trước:
  t1 = a + b      ; t1 dùng ở đâu? — không
  t2 = a * b      ; t2 dùng ở dòng dưới
  result = t2
  return result
```

Phân tích **liveness** ngược từ cuối: biến nào còn được đọc về sau thì "sống".

```
Quét ngược:
  return result   → result SỐNG
  result = t2     → t2 SỐNG (vì result đọc nó), result giờ định nghĩa xong
  t2 = a * b      → t2 sống → GIỮ. a, b sống.
  t1 = a + b      → t1 có ai đọc sau đó không? KHÔNG → t1 CHẾT → XÓA
```

```
Sau:
  t2 = a * b
  result = t2
  return result
```

(và `result = t2; return result` còn rút tiếp thành `return a * b` bằng copy propagation + folding.)

### 5.2 Walk-through: dead branch sau khi fold

```
Trước:
  c = 2 > 5         ; fold → c = false
  if (c) goto L1
  x = 10
  goto L2
L1:
  x = 20
L2:
  ...
```

```
Bước 1: fold điều kiện: 2 > 5 = false → c ≡ false
Bước 2: if (false) goto L1 → nhánh KHÔNG BAO GIỜ chạy → bỏ lệnh nhảy
Bước 3: nhãn L1 và khối x = 20 trở thành UNREACHABLE → xóa
```

```
Sau:
  x = 10
L2:
  ...
```

(Liên hệ [Boolean Logic](../../../DataFoundations/03-MathFoundations/lesson-02-boolean-logic/): điều kiện luôn-sai = *contradiction*, luôn-đúng = *tautology*. Compiler phân loại được nhánh nào chết là nhờ tính được giá trị logic của điều kiện.)

⚠ **Lỗi thường gặp.** **Side effect không bao giờ là dead code.**
```
t = launchMissiles()   ; t không dùng tiếp...
```
Nếu xóa vì "t không dùng" → **mất luôn việc phóng tên lửa**. Sai nghiêm trọng. DCE chỉ xóa lệnh **vừa** không-dùng-kết-quả **vừa** thuần khiết (pure). Khi không chắc hàm có pure không → giữ lại (bảo thủ).

❓ **Câu hỏi tự nhiên.**
- *"Làm sao biết biến 'không dùng nữa'?"* — Phân tích **liveness**: một biến **live** tại điểm p nếu trên một đường đi từ p còn có lệnh đọc nó **trước khi** nó bị ghi đè. Quét ngược CFG.
- *"DCE chạy một lần là xong?"* — Không. Xóa một lệnh có thể làm lệnh khác trở thành chết (lệnh kia tính giá trị chỉ để cấp cho lệnh vừa xóa). Nên DCE (và cả pipeline) chạy **lặp tới điểm bất động (fixpoint)** — tới khi một vòng quét không xóa được gì nữa.

🔁 **Dừng lại tự kiểm tra.** Đoạn nào chết?
```
a = 1
b = 2
c = a + b
print(c)
d = a * b
```

<details><summary>Đáp án</summary>

`d = a * b` chết (`d` không dùng, `*` thuần khiết) → xóa. `print(c)` giữ (side effect). `c = a + b` giữ (`c` được `print` đọc). `a`, `b` giữ (được `c`/`d` dùng — sau khi xóa `d`, `a,b` vẫn live qua `c`).
</details>

📝 **Tóm tắt mục 5.** DCE bỏ lệnh không ảnh hưởng kết quả: dead assignment, unreachable, dead branch. Dựa trên liveness (quét ngược). Cấm xóa lệnh có side effect. Chạy lặp tới fixpoint.

## 6. CSE, Algebraic Simplification & Strength Reduction

### 6.1 Common Subexpression Elimination (CSE)

💡 **Trực giác.** Nếu công thức bạn cần dùng `b*c` ở hai chỗ trong cùng một đoạn, không lý do gì tính `b*c` hai lần — tính một lần, để dành kết quả, dùng lại. Như pha sẵn một bình trà rót ra hai cốc thay vì pha hai lần.

**Định nghĩa.** **CSE** phát hiện các biểu thức **giống hệt nhau** (cùng toán tử, cùng toán hạng, mà các toán hạng **không bị thay đổi** giữa hai lần) và tính một lần, tái sử dụng.

Bốn ví dụ:

| Trước | Sau |
| --- | --- |
| `a = b*c + 1; d = b*c + 2` | `t = b*c; a = t+1; d = t+2` |
| `x = (i+j)*2; y = (i+j)*3` | `s = i+j; x = s*2; y = s*3` |
| `p = arr[k]+1; q = arr[k]*2` | `e = arr[k]; p = e+1; q = e*2` |
| `m = n-1; ...; o = n-1` (n không đổi) | `t = n-1; m = t; ...; o = t` |

**Walk-through trên IR thật:**
```
Trước:
  t1 = b * c
  a  = t1 + 1
  t2 = b * c        ; LẶP: b, c không đổi từ t1 → t2 == t1
  d  = t2 + 2
```
```
Bước 1: t1 = b * c     → ghi vào "available expressions": (b*c) ↦ t1
Bước 2: a = t1 + 1     → ok
Bước 3: t2 = b * c     → (b*c) đã có sẵn = t1, và b,c chưa bị ghi đè
                       → thay t2 bằng t1 → bỏ phép nhân, dùng t1
Bước 4: d = t2 + 2     → t2 thành t1 → d = t1 + 2
```
```
Sau:
  t1 = b * c
  a  = t1 + 1
  d  = t1 + 2        ; tiết kiệm một phép nhân
```

⚠ **Lỗi thường gặp.** CSE chỉ đúng nếu các toán hạng **không đổi** giữa hai lần dùng. Phản ví dụ:
```
t1 = b * c
b  = b + 1        ← b thay đổi!
t2 = b * c        ← KHÔNG được tái dùng t1 (b giờ khác)
```
Sau khi `b` đổi, `b*c` cũ "hết hạn" (invalidated) — phải tính lại.

### 6.2 Algebraic Simplification — đơn giản hóa đại số

💡 **Trực giác.** Một số phép tính có **luật đại số** cho kết quả ngay mà không cần CPU làm việc: nhân 1, cộng 0, nhân 0... Compiler áp dụng các "đẳng thức" này để rút gọn.

Các luật phổ biến (số nguyên):

| Luật | Trước | Sau | Vì sao |
| --- | --- | --- | --- |
| Đơn vị nhân | `x * 1` | `x` | nhân 1 không đổi |
| Đơn vị cộng | `x + 0` | `x` | cộng 0 không đổi |
| Triệt tiêu nhân | `x * 0` | `0` | nhân 0 = 0 (số nguyên) |
| Trừ chính nó | `x - x` | `0` | luôn 0 |
| Lũy thừa 0/1 | `x / 1` | `x` | chia 1 không đổi |

Bốn ví dụ áp dụng:
- `t = y + 0` → `t = y`.
- `t = z * 1` → `t = z`.
- `t = w * 0` → `t = 0` (chỉ số nguyên — xem ⚠ bên dưới).
- `t = k - k` → `t = 0`.

⚠ **Lỗi thường gặp — float phá luật đại số.** Với **số thực IEEE-754**:
- `x * 0.0` **không** luôn bằng `0.0`: nếu `x = NaN` thì `NaN * 0.0 = NaN`; nếu `x = +∞` thì `∞ * 0.0 = NaN`.
- `x + 0.0` đổi `-0.0` thành `+0.0`.
- `(a + b) + c ≠ a + (b + c)` về bit do làm tròn.

→ Các luật đại số chỉ chắc chắn an toàn cho **số nguyên**. Với float, compiler chỉ áp dụng khi bật chế độ "fast math" (người dùng chấp nhận sai số) — mặc định bảo thủ.

### 6.3 Strength Reduction — hạ chi phí phép tính

💡 **Trực giác.** Phép nhân/chia đắt hơn cộng/dịch bit trên CPU. Nếu thay được một phép đắt bằng phép rẻ cho **cùng kết quả**, ta "hạ cường độ" (reduce strength). Như dùng cân thăng bằng thay vì cân điện tử khi chỉ cần so sánh.

| Trước | Sau | Vì sao |
| --- | --- | --- |
| `x * 2` | `x + x` | nhân 2 = cộng chính nó |
| `x * 2` | `x << 1` | dịch trái 1 bit = ×2 |
| `x * 8` | `x << 3` | ×8 = dịch trái 3 bit (2³=8) |
| `x / 4` (x ≥ 0, int) | `x >> 2` | chia 4 = dịch phải 2 bit |
| `x % 2` (x ≥ 0) | `x & 1` | lấy bit thấp nhất = số dư cho 2 |

Bốn ví dụ verify:
- `5 * 2 = 10` và `5 + 5 = 10` ✓ → `x*2 → x+x`.
- `6 * 8 = 48` và `6 << 3 = 6·8 = 48` ✓ → `x*8 → x<<3`.
- `20 / 4 = 5` và `20 >> 2 = 20/4 = 5` ✓ (số dương) → `x/4 → x>>2`.
- `7 % 2 = 1` và `7 & 1 = 0b111 & 0b001 = 1` ✓ → `x%2 → x&1`.

⚠ **Lỗi thường gặp.** `x / 4 → x >> 2` chỉ đúng với **số nguyên không âm**. Với `x = -8`: `-8 / 4 = -2` (chia làm tròn về 0) nhưng `-8 >> 2 = -2` ở số bù-2... thực ra trùng ở đây, nhưng `-7 / 4 = -1` còn `-7 >> 2 = -2` → **khác**! Vì vậy compiler chỉ hạ chia-thành-dịch khi chứng minh được `x ≥ 0`, hoặc dùng công thức phức tạp hơn cho số âm.

❓ **Câu hỏi tự nhiên.** *"Strength reduction còn dùng ở đâu nữa?"* — Mạnh nhất trong **vòng lặp**: thay phép nhân chỉ số `i * step` (tính lại mỗi vòng) bằng một biến cộng dồn `+= step` — xem §7.

🔁 **Dừng lại tự kiểm tra.** Rút gọn tối đa: `a = (m + 0) * 1; b = m * 4; c = m - m`.

<details><summary>Đáp án</summary>

`a = (m+0)*1 → m*1 → m` (algebraic). `b = m*4 → m << 2` (strength reduction). `c = m - m → 0` (algebraic). Kết quả: `a = m; b = m << 2; c = 0`.
</details>

📝 **Tóm tắt mục 6.** CSE: tính biểu thức lặp một lần (chỉ khi toán hạng không đổi). Algebraic: dùng luật đại số (`x*1→x`, `x+0→x`, `x*0→0`) — chỉ chắc với int. Strength reduction: phép đắt → phép rẻ (`x*2→x+x`, `x*8→x<<3`) — cẩn thận số âm khi chia.

## 7. Tối ưu vòng lặp & đánh đổi compile-time

### 7.1 Loop-Invariant Code Motion (LICM) — sơ lược

💡 **Trực giác.** Nếu trong một vòng lặp có phép tính cho **cùng một kết quả ở mọi vòng**, không cần tính lại mỗi vòng — đưa nó **ra ngoài** vòng lặp, tính một lần. Như đun sẵn một ấm nước trước khi pha 100 cốc trà, thay vì đun lại cho từng cốc.

**Định nghĩa.** Một biểu thức là **loop-invariant** nếu giá trị của nó **không đổi qua các vòng lặp** (mọi toán hạng đều không bị gán bên trong vòng). LICM **kéo (hoist)** biểu thức đó ra trước vòng lặp.

Walk-through:
```
Trước:
  for i in 0..n {
    t = a * b          ; a, b KHÔNG đổi trong vòng → invariant
    arr[i] = t + i
  }
```
```
Sau (hoist t ra ngoài):
  t = a * b            ; tính MỘT lần thay vì n lần
  for i in 0..n {
    arr[i] = t + i
  }
```
Nếu `n = 1.000.000`, ta tiết kiệm 999.999 phép nhân.

⚠ **Lỗi thường gặp.** Chỉ hoist được nếu biểu thức **thật sự** invariant (không toán hạng nào bị gán trong vòng) **và** không có side effect. Nếu `a` bị đổi trong vòng, `a*b` không invariant → không hoist.

### 7.2 Đánh đổi: thời gian compile ↔ tốc độ chạy (`-O0`..`-O3`)

Tối ưu không miễn phí: phân tích càng sâu → **compile lâu hơn**, nhưng **chạy nhanh hơn**. Các trình biên dịch (GCC, Clang) cho chọn mức:

| Mức | Ý nghĩa | Khi dùng |
| --- | --- | --- |
| `-O0` | Không tối ưu (gần như dịch thẳng) | Khi **debug** — IR khớp code nguồn, dễ đặt breakpoint |
| `-O1` | Tối ưu cơ bản (folding, DCE, CSE local) | Cân bằng nhẹ |
| `-O2` | Tối ưu mạnh (thêm global, inlining, LICM) | **Mặc định cho release** |
| `-O3` | Rất mạnh (vectorize, unroll aggressive) | Code số học nặng, chấp nhận binary lớn hơn |

❓ **Câu hỏi tự nhiên.** *"Sao không luôn dùng `-O3`?"* — Vì: (1) compile chậm hơn nhiều — bất tiện khi phát triển; (2) `-O3` đôi khi làm binary **to hơn** (unroll/inline) mà không nhanh hơn, thậm chí chậm đi do cache; (3) tối ưu mạnh làm debug khó (code không còn khớp dòng nguồn). Đa số dự án dùng `-O2`.

### 7.3 Liên hệ AI/ML — compiler tối ưu tensor

Các framework học sâu (TensorFlow XLA, PyTorch `torch.compile`, TVM) có **compiler riêng cho đồ thị tính toán tensor**, và dùng **chính những ý tưởng trong bài này** ở quy mô tensor:

- **Constant folding** trên tensor: gập các phép trên trọng số đã cố định lúc dịch.
- **CSE**: nếu hai nhánh đồ thị tính cùng một tích ma trận, tính một lần.
- **Algebraic simplification**: `x + 0`, `x * 1` trên tensor; gộp các phép tuyến tính liên tiếp.
- **Strength reduction / operator fusion**: gộp `conv → batchnorm → relu` thành một kernel hợp nhất (fusion) để giảm đọc/ghi bộ nhớ — phiên bản tensor của "hạ chi phí".
- **Dead code elimination**: bỏ nhánh đồ thị mà output không dùng.

→ Hiểu tối ưu compiler kinh điển giúp bạn hiểu vì sao `torch.compile` làm model nhanh hơn nhiều mà **kết quả số không đổi** (trừ sai số float chấp nhận được).

📝 **Tóm tắt mục 7.** LICM kéo biểu thức bất biến ra ngoài vòng (tính một lần). Tối ưu đánh đổi compile-time lấy run-time: `-O0` để debug, `-O2` mặc định release. Compiler tensor (XLA, TVM) tái dùng đúng các pass này ở quy mô đồ thị.

## 8. Bài tập

**Bài 1 (constant folding).** Fold các biểu thức hằng:
- `t = 8 + 7`
- `t = 9 * 9`
- `t = 100 - 250`
- `t = 81 / 9`
- `t = 6 > 10`

**Bài 2 (constant propagation + folding).** Rút gọn từng bước:
```
a = 4
b = a + 6
c = b * a
```

**Bài 3 (dead code elimination).** Chỉ ra lệnh nào chết và viết lại đoạn sau khi xóa:
```
x = 5
y = 10
z = x + y
print(z)
w = x * y
v = w + 1
return z
```

**Bài 4 (algebraic + strength reduction).** Rút gọn tối đa:
- `p = q * 1`
- `r = s + 0`
- `u = v * 0`
- `m = n * 16`
- `k = j % 2`   (giả sử `j ≥ 0`)

**Bài 5 (CSE).** Áp dụng CSE cho đoạn:
```
t1 = x + y
a  = t1 * 2
t2 = x + y
b  = t2 * 3
```

**Bài 6 (tổng hợp — tự tối ưu một đoạn IR).** Cho đoạn IR thô sau, áp dụng **tất cả** các pass đã học (folding, propagation, algebraic, CSE, DCE) cho tới khi không rút thêm được. Viết IR cuối cùng:
```
a = 2 + 3
b = a * 1
c = b + 0
d = a * a
e = a * a
f = d + e
g = 0 * h
return f
```

**Bài 7 (cái bẫy side effect).** Đoạn sau, một sinh viên định xóa dòng `t = read()` vì "`t` không dùng nữa". Giải thích vì sao SAI:
```
t = read()       ; read() đọc một dòng từ input
u = 5
print(u)
```

**Bài 8 (loop-invariant).** Chỉ ra biểu thức loop-invariant và viết lại đoạn sau khi hoist:
```
for i in 0..n {
  base = w * h
  pixel[i] = base + i
}
```

## Lời giải chi tiết

### Bài 1

- `8 + 7 = 15` → `t = 15`.
- `9 * 9 = 81` → `t = 81`.
- `100 - 250 = -150` → `t = -150` (âm — folding xử lý được số âm).
- `81 / 9 = 9` → `t = 9`.
- `6 > 10` → `false` → `t = false` (folding cả phép so sánh logic).

### Bài 2

```
Bước 1: a = 4              → a ≡ 4
Bước 2: b = a + 6          → thay a=4 → b = 4 + 6 → fold → b = 10 → b ≡ 10
Bước 3: c = b * a          → thay b=10, a=4 → c = 10 * 4 → fold → c = 40
```
Kết quả: `a = 4; b = 10; c = 40`.

### Bài 3

Quét ngược tìm liveness:
```
return z          → z SỐNG
v = w + 1         → v có dùng sau? KHÔNG → v CHẾT → xóa (kéo theo w không cần cho v)
w = x * y         → w còn ai đọc? (chỉ v vừa xóa) → w CHẾT → xóa
print(z)          → giữ (side effect), z sống
z = x + y         → z sống → giữ
y = 10            → y dùng ở z → giữ
x = 5             → x dùng ở z → giữ
```
Lệnh chết: `w = x * y` và `v = w + 1`. Viết lại:
```
x = 5
y = 10
z = x + y
print(z)
return z
```
(Có thể rút tiếp: `z = 15` bằng folding, rồi `print(15); return 15`.)

### Bài 4

- `p = q * 1` → `p = q` (đơn vị nhân).
- `r = s + 0` → `r = s` (đơn vị cộng).
- `u = v * 0` → `u = 0` (triệt tiêu nhân — số nguyên).
- `m = n * 16` → `m = n << 4` (16 = 2⁴ → dịch trái 4 bit). Verify: `n=3 → 3*16=48`, `3<<4 = 3·16 = 48` ✓.
- `k = j % 2` → `k = j & 1` (lấy bit thấp). Verify: `j=7 → 7%2=1`, `7&1=1` ✓; `j=8 → 8%2=0`, `8&1=0` ✓. (Đúng vì `j ≥ 0`.)

### Bài 5

`x + y` xuất hiện hai lần, và `x`, `y` **không bị gán** giữa hai lần → CSE áp dụng:
```
t1 = x + y        ; available: (x+y) ↦ t1
a  = t1 * 2
t2 = x + y        ; tái dùng t1 thay vì tính lại
b  = t1 * 3        ; t2 → t1
```
Bỏ `t2` (giờ là `= t1`, copy → propagate):
```
t1 = x + y
a  = t1 * 2
b  = t1 * 3
```
Tiết kiệm một phép cộng.

### Bài 6 (tổng hợp)

```
Trước:
  a = 2 + 3
  b = a * 1
  c = b + 0
  d = a * a
  e = a * a
  f = d + e
  g = 0 * h
  return f
```

Áp dụng từng bước:
```
a = 2 + 3      → fold → a = 5 ; a ≡ 5
b = a * 1      → algebraic (x*1→x) → b = a → propagate → b = 5 ; b ≡ 5
c = b + 0      → algebraic (x+0→x) → c = b = 5 ; c ≡ 5 ... NHƯNG c có dùng đâu?
d = a * a      → propagate a=5 → d = 5 * 5 → fold → d = 25 ; d ≡ 25
e = a * a      → CSE: a*a đã tính ở d → e = d ... rồi propagate d=25 → e = 25
                (hoặc trực tiếp fold 5*5=25). e ≡ 25
f = d + e      → 25 + 25 → fold → f = 50 ; f ≡ 50
g = 0 * h      → algebraic (0*x→0, giả sử h pure) → g = 0 ; g không dùng
return f       → f SỐNG
```

DCE quét ngược: `f` sống (return). `e`, `d` → sau khi `f` thành hằng `50`, `d`,`e` không còn ai đọc → CHẾT. `c` không ai đọc → CHẾT. `b` không ai đọc (chỉ `c` đọc, mà `c` chết) → CHẾT. `a` không ai đọc (đã propagate hết) → CHẾT. `g` không ai đọc, `0*h` pure → CHẾT. `h` không bị tính ở đây.

```
Sau (tối ưu tối đa):
  return 50
```

Toàn bộ đoạn rút gọn thành **một lệnh trả về hằng 50**. Đây là minh họa mạnh nhất cho sức mạnh của pipeline tối ưu chạy lặp tới fixpoint.

### Bài 7 (bẫy side effect)

Xóa `t = read()` là **SAI** vì `read()` có **side effect**: nó tiêu thụ một dòng từ input stream. Dù giá trị `t` không được dùng, **việc đọc** vẫn làm thay đổi trạng thái quan sát được (con trỏ đọc của input dịch đi một dòng). Nếu xóa:
- Dòng input lẽ ra bị `read()` này tiêu thụ sẽ **còn lại** → một `read()` sau đó (nếu có) sẽ đọc nhầm dòng.
- Hành vi chương trình đổi → vi phạm nguyên tắc "an toàn" (§2).

Quy tắc: DCE chỉ xóa lệnh **vừa không-dùng-kết-quả vừa thuần khiết**. `read()` không thuần khiết → giữ. Đúng phải là: giữ `t = read()` (hoặc rút gọn thành `read()` bỏ phần gán `t`, nhưng **không bỏ lời gọi**).

### Bài 8 (loop-invariant)

`base = w * h`: toán hạng `w` và `h` **không bị gán** bên trong vòng lặp → giá trị `w * h` giống nhau ở mọi vòng → **loop-invariant**. Hoist ra ngoài:
```
base = w * h          ; tính 1 lần thay vì n lần
for i in 0..n {
  pixel[i] = base + i
}
```
Nếu `n` lớn, tiết kiệm `n - 1` phép nhân. (`base + i` thì **không** invariant vì `i` đổi mỗi vòng → giữ trong vòng.)

## Tham khảo và bài tiếp theo

- Bài trước: [Lesson 11 — IR (Three-Address Code)](../lesson-01-ir-three-address/) — dạng IR mà bài này thao tác lên.
- Bài tiếp theo: [Lesson 13 — Bytecode & Stack VM](../lesson-03-bytecode-stack-vm/) — sau khi IR đã tối ưu, sinh bytecode cho máy ảo ngăn xếp.
- Nền tảng liên quan:
  - [DataFoundations — Boolean Logic](../../../DataFoundations/03-MathFoundations/lesson-02-boolean-logic/) — tautology/contradiction dùng để phát hiện dead branch.
  - [Algorithms](../../../Algorithms/) — liveness, reaching definitions là bài toán data-flow trên đồ thị.
- Minh họa tương tác: [visualization.html](./visualization.html) — pipeline bật/tắt từng pass, constant-folding stepper, dead-code highlighter.
