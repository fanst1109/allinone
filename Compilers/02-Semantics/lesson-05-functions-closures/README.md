# Lesson 10 — Hàm & Closure (Functions & Closures trong interpreter)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Trả lời được câu hỏi cốt lõi: **`makeAdder(5)` trả về một hàm "cộng 5". Làm sao hàm con đó NHỚ được số `5` sau khi `makeAdder` đã chạy xong và biến mất khỏi stack?**
- Hiểu cách interpreter **lưu hàm như một giá trị** (params + body + môi trường định nghĩa) và cách một **lời gọi** tạo ra **environment mới** liên kết tham số → đối số rồi eval body.
- Hiểu **call stack (ngăn xếp lời gọi)**: mỗi lời gọi đẩy (push) một **frame**, trả về thì lấy ra (pop). Walk-through đầy đủ `fact(3)` — stack phình ra rồi xẹp lại, giá trị trả về lan ngược.
- Hiểu **closure** = hàm + môi trường bao quanh nó được "bắt" (captured environment), và vì sao closure là hệ quả tự nhiên của **lexical scope** ([Lesson 07](../lesson-02-symbol-table-scope/)).
- Phân biệt **biến tự do (free)** vs **biến ràng buộc (bound)**, và **tham trị (by value)** vs **tham chiếu (by reference)**.
- Hiểu **đệ quy + điều kiện dừng** và lỗi **tràn ngăn xếp (stack overflow)** khi đệ quy không dừng.
- Tránh được **bug closure bắt biến (không phải giá trị)** trong vòng lặp — lỗi kinh điển khiến mọi closure in cùng một số.

## Kiến thức tiền đề

- [Lesson 07 — Symbol Table & Scope](../lesson-02-symbol-table-scope/) — closure là **mở rộng trực tiếp** của scope chain. Bạn cần chắc khái niệm "tra tên từ scope trong ra ngoài" trước khi đọc bài này.
- [Lesson 09 — Tree-Walking Interpreter](../lesson-04-tree-walking-interpreter/) — bài này thêm hàm/closure vào đúng cái hàm `eval(node, env)` mà L09 dựng nên. `env` ở đây chính là environment runtime của L09.
- [DataStructures — Stack (ngăn xếp)](../../../DataStructures/01-Basic/lesson-04-stack/) — call stack là một stack thực thụ: push khi gọi, pop khi trả về. Hiểu LIFO giúp hình dung phần §3.
- [OperatingSystems](../../../OperatingSystems/) — tùy chọn; call stack của interpreter là phiên bản logic của **stack frame** mà OS/CPU quản lý cho chương trình thật.

> 💡 **Đây là bài cuối Tier 2 — và là bài "đóng vòng".** Từ L06 (AST) tới L09 (chạy được biểu thức + if/while), ngôn ngữ đồ chơi của ta đã *thở*. Nhưng nó vẫn chưa biết **hàm** — không tái sử dụng được logic, không đệ quy được. Thêm hàm + closure vào là khoảnh khắc ngôn ngữ trở nên **Turing-complete**: nó tính được bất cứ thứ gì máy tính tính được. Mở [visualization.html](./visualization.html) để xem call stack phình/xẹp và closure "nhớ" biến ngay trước mắt.

## 1. Vì sao học — `makeAdder(5)` nhớ số 5 bằng cách nào?

> 💡 **Trực giác / Hình dung.** Hãy tưởng tượng bạn đưa cho thợ làm bánh một **khuôn đã in sẵn số 5** rồi bảo "cứ dùng khuôn này mỗi khi tôi đưa bột". Người thợ về sau **không cần hỏi lại số mấy** — số 5 đã *đóng vào* trong khuôn. Closure chính là cái khuôn đó: hàm con mang theo một "túi đồ" chứa các biến của môi trường nơi nó sinh ra. `makeAdder` đã đóng cửa (close) lại, nhưng cái túi `{x: 5}` vẫn đi theo hàm con suốt đời.

Xét đoạn mã (cú pháp ngôn ngữ đồ chơi của ta):

```
fn makeAdder(x) {
  fn inner(n) {
    return n + x;     // x đến từ makeAdder, không phải tham số của inner
  }
  return inner;
}

add5 = makeAdder(5);   // makeAdder chạy xong, "biến mất"
add5(3);               // → 8   (3 + 5)
add5(10);              // → 15  (10 + 5)
```

Câu hỏi nhức nhối: **khi `add5(3)` chạy, `makeAdder` đã trả về từ lâu** — frame của nó (chứa `x = 5`) lẽ ra đã bị pop khỏi call stack. Vậy `inner` lấy `x = 5` ở đâu ra?

Câu trả lời ngắn — và là trọng tâm cả bài: **hàm `inner` không chỉ lưu code, nó còn lưu một con trỏ tới environment nơi nó được định nghĩa**. Environment đó chứa `x = 5`. Vì còn con trỏ trỏ tới, environment đó **không bị thu hồi** dù `makeAdder` đã xong. Cặp "hàm + environment captured" này gọi là **closure**.

Có **hai lý do lớn** vì sao ta cần hàm và closure:

| Khái niệm | Giải quyết vấn đề gì |
| --- | --- |
| **Hàm (function)** | **Tái sử dụng** một đoạn logic (gọi nhiều lần, tham số khác nhau) và **đệ quy** (hàm gọi chính nó → biểu diễn được lặp/duyệt cây/chia để trị) |
| **Closure** | Cho hàm **nhớ** môi trường nơi nó sinh ra → tạo "factory hàm", giữ trạng thái riêng, là nền của lập trình hàm (functional programming) |

> ❓ **Câu hỏi tự nhiên của người đọc**
> - *"Không có closure thì có sống được không?"* — Được, nhưng èo uột: không tạo được "hàm sinh hàm", không có callback giữ trạng thái, không làm được nhiều mẫu hình hàm. C cổ điển (không closure) phải dùng con trỏ hàm + struct rời để mô phỏng — vụng về. Closure gói tất cả gọn vào một giá trị.
> - *"Closure khác hàm thường ở đâu?"* — Một hàm **không** dùng biến ngoài nó (chỉ dùng tham số của chính nó) thì closure rỗng — không khác hàm thường. Closure chỉ "thú vị" khi hàm tham chiếu **biến tự do** (biến không phải tham số, không khai báo trong thân) — như `x` trong `inner`.

> 📝 **Tóm tắt §1.** Hàm = tái sử dụng + đệ quy. Closure = hàm mang theo con trỏ tới environment nơi định nghĩa → "nhớ" được biến ngoài (`x = 5`) kể cả sau khi hàm ngoài đã trả về. Cả bài là để hiểu hai cơ chế đó chạy ra sao trong interpreter.

## 2. Gọi hàm trong interpreter — hàm là một giá trị

> 💡 **Trực giác.** Một con số `5` là một giá trị; một chuỗi `"hi"` là một giá trị. Trong ngôn ngữ có **first-class functions**, **bản thân hàm cũng là một giá trị** — gán được vào biến, đưa làm tham số, trả về từ hàm khác, hệt như số. Để làm vậy, interpreter cần một "hộp" lưu hàm: hộp đó chứa **danh sách tham số**, **thân hàm (AST)**, và (sẽ thấy ở §4) **environment định nghĩa**.

### 2.1 Hàm được lưu thế nào

Khi interpreter gặp một khai báo hàm `fn add(a, b) { return a + b; }`, nó **không chạy thân hàm ngay**. Nó tạo một giá trị kiểu *function* và đặt vào environment dưới tên `add`:

```
FunctionValue {
  params: ["a", "b"]              // tên tham số
  body:   <AST của { return a + b; }>   // cây thân hàm, chưa chạy
  defEnv: <con trỏ tới environment lúc định nghĩa>   // (sẽ dùng ở §4)
}
```

Lưu ý: thân hàm là **AST tĩnh**, được giữ nguyên cho tới khi có ai đó *gọi* hàm. Đây là điểm khác cốt lõi giữa **định nghĩa** (chỉ tạo giá trị) và **lời gọi** (mới thật sự eval body).

### 2.2 Một lời gọi làm gì — 4 bước

Khi interpreter eval node `add(2, 3)`:

1. **Eval phần được gọi** → lấy ra `FunctionValue` của `add`.
2. **Eval các đối số** theo thứ tự → `[2, 3]` (đây là *giá trị*, không phải biểu thức).
3. **Tạo một environment MỚI** (gọi là `callEnv`), liên kết từng tham số với đối số tương ứng: `a → 2`, `b → 3`. Environment mới này có **con trỏ cha trỏ tới `defEnv`** của hàm (mấu chốt cho closure — §4).
4. **Eval `body` trong `callEnv`** → gặp `return` thì lấy giá trị đó làm kết quả của lời gọi.

```
eval(add(2, 3), env):
  fnVal = lookup(env, "add")        // bước 1
  args  = [eval(2), eval(3)] = [2,3] // bước 2
  callEnv = newEnv(parent = fnVal.defEnv)  // bước 3
  callEnv.bind("a", 2); callEnv.bind("b", 3)
  return evalBody(fnVal.body, callEnv)      // bước 4 → 5
```

### 2.3 Liên hệ scope chain (L07)

`callEnv` ở bước 3 **chính là một mắt xích mới trong scope chain** của [Lesson 07](../lesson-02-symbol-table-scope/). Khi eval `a + b` trong thân hàm:

- Tra `a`: tìm thấy ngay trong `callEnv` (vì là tham số) → `2`.
- Tra một biến không có trong `callEnv`: leo lên `parent` (= `defEnv`), rồi lên nữa… đúng cơ chế "tra tên từ trong ra ngoài" của L07.

Điểm tinh tế — và là toàn bộ bí mật của closure: **`parent` của `callEnv` là `defEnv` (nơi hàm được ĐỊNH NGHĨA), KHÔNG phải nơi hàm được GỌI.** Đây gọi là **lexical scope** (phạm vi theo văn bản). Giữ vững ý này; §4 sẽ khai thác nó.

> ⚠ **Lỗi thường gặp.** Nhầm "environment lúc gọi" với "environment lúc định nghĩa". Nếu interpreter (sai) cho `parent` trỏ tới nơi *gọi* hàm, ta được **dynamic scope** — closure sẽ hỏng, `makeAdder` không nhớ nổi `x`. Đa số ngôn ngữ hiện đại (JS, Go, Python, Scheme) dùng lexical scope. Ghi nhớ: **`defEnv`, không phải `callEnv-cha`.**

Bốn ví dụ về lời gọi và environment mới sinh ra:

| Lời gọi | `callEnv` ràng buộc | Cha của `callEnv` |
| --- | --- | --- |
| `add(2, 3)` | `a→2, b→3` | env nơi `add` định nghĩa |
| `add(10, -4)` | `a→10, b→-4` | (cùng) env nơi `add` định nghĩa |
| `square(7)` (với `fn square(x){return x*x}`) | `x→7` | env định nghĩa `square` |
| `greet()` (không tham số) | (rỗng) | env định nghĩa `greet` |

> 🔁 **Dừng lại tự kiểm tra.** Với `fn f(a) { return a + b; }` định nghĩa ở global nơi `b = 100`, gọi `f(5)` cho ra gì?
> <details><summary>Đáp án</summary>
> `105`. `callEnv` có `a → 5`. Tra `a` → 5 ngay tại `callEnv`. Tra `b` → không có trong `callEnv`, leo lên cha (= global, nơi `f` định nghĩa) → `100`. Kết quả `5 + 100 = 105`. Đây là `b` được dùng như **biến tự do** (§5).
> </details>

> 📝 **Tóm tắt §2.** Hàm là một giá trị (params + body + defEnv). Định nghĩa chỉ tạo giá trị; lời gọi mới (1) lấy hàm, (2) eval đối số, (3) tạo `callEnv` mới ràng buộc tham số → đối số với cha = `defEnv`, (4) eval body. `callEnv` là mắt xích scope chain mới — và cha của nó là nơi **định nghĩa**, không phải nơi gọi (lexical scope).

## 3. Call Stack — ngăn xếp lời gọi

> 💡 **Trực giác.** Hình dung bạn đang đọc một cuốn sách, gặp chú thích "xem trang 50". Bạn **kẹp ngón tay** giữ trang hiện tại, lật sang trang 50. Trang 50 lại bảo "xem trang 80" → kẹp thêm một ngón nữa. Đọc xong trang 80, bạn **rút ngón tay gần nhất** quay lại trang 50; xong trang 50 rút tiếp về trang hiện tại. Các "ngón tay kẹp" xếp theo kiểu **vào sau ra trước (LIFO)** — đó chính là **call stack**. Mỗi ngón tay = một **frame** lưu "tôi đang ở đâu và biết những biến gì".

### 3.1 Frame là gì

Mỗi lời gọi hàm tạo một **stack frame** (khung ngăn xếp) chứa:

- **Hàm nào** đang chạy.
- **Environment** của lời gọi đó (`callEnv` ở §2 — các tham số + biến cục bộ).
- **Điểm quay về** (chỗ tiếp tục sau khi hàm trả về).

Khi gọi hàm → **push** một frame lên đỉnh stack. Khi hàm `return` → **pop** frame đó, giá trị trả về truyền về cho frame ngay dưới. Đây là một [stack (ngăn xếp)](../../../DataStructures/01-Basic/lesson-04-stack/) đúng nghĩa: chỉ thao tác ở đỉnh, LIFO.

### 3.2 Walk-through ĐẦY ĐỦ `fact(3)` — phình rồi xẹp

Cho hàm giai thừa:

```
fn fact(n) {
  if (n == 0) { return 1; }       // điều kiện dừng (base case)
  return n * fact(n - 1);          // bước đệ quy
}
```

Gọi `fact(3)`. Theo dõi call stack **từng bước**, đỉnh stack ở trên cùng.

**Giai đoạn PHÌNH (push dần xuống base case):**

Bước 1 — gọi `fact(3)`. `n = 3`, `n == 0`? Không. Cần tính `3 * fact(2)` → phải gọi `fact(2)` trước. Push frame:

```
┌─────────────────────────┐  ← đỉnh
│ fact(3)  n=3  chờ fact(2)│
└─────────────────────────┘
```

Bước 2 — gọi `fact(2)`. `n = 2`, `n == 0`? Không. Cần `2 * fact(1)`. Push:

```
┌─────────────────────────┐  ← đỉnh
│ fact(2)  n=2  chờ fact(1)│
├─────────────────────────┤
│ fact(3)  n=3  chờ fact(2)│
└─────────────────────────┘
```

Bước 3 — gọi `fact(1)`. `n = 1`, `n == 0`? Không. Cần `1 * fact(0)`. Push:

```
┌─────────────────────────┐  ← đỉnh
│ fact(1)  n=1  chờ fact(0)│
├─────────────────────────┤
│ fact(2)  n=2  chờ fact(1)│
├─────────────────────────┤
│ fact(3)  n=3  chờ fact(2)│
└─────────────────────────┘
```

Bước 4 — gọi `fact(0)`. `n = 0`, `n == 0`? **Có!** Chạm base case, `return 1`. Push rồi sắp pop:

```
┌─────────────────────────┐  ← đỉnh
│ fact(0)  n=0  return 1   │   ← base case, không gọi tiếp
├─────────────────────────┤
│ fact(1)  n=1  chờ fact(0)│
├─────────────────────────┤
│ fact(2)  n=2  chờ fact(1)│
├─────────────────────────┤
│ fact(3)  n=3  chờ fact(2)│
└─────────────────────────┘
```

Stack đã **phình tối đa: 4 frame**. Giờ bắt đầu **XẸP** — pop và lan giá trị ngược lên.

**Giai đoạn XẸP (pop, giá trị trả lan ngược):**

Bước 5 — `fact(0)` trả `1`. Pop. Giá trị `1` về cho `fact(1)`: nó tính `1 * fact(0) = 1 * 1 = 1`.

```
┌─────────────────────────┐  ← đỉnh
│ fact(1)  n=1  1*1 = 1    │   ← nhận 1 từ fact(0), return 1
├─────────────────────────┤
│ fact(2)  n=2  chờ fact(1)│
├─────────────────────────┤
│ fact(3)  n=3  chờ fact(2)│
└─────────────────────────┘
```

Bước 6 — `fact(1)` trả `1`. Pop. Về cho `fact(2)`: `2 * fact(1) = 2 * 1 = 2`.

```
┌─────────────────────────┐  ← đỉnh
│ fact(2)  n=2  2*1 = 2    │   ← nhận 1 từ fact(1), return 2
├─────────────────────────┤
│ fact(3)  n=3  chờ fact(2)│
└─────────────────────────┘
```

Bước 7 — `fact(2)` trả `2`. Pop. Về cho `fact(3)`: `3 * fact(2) = 3 * 2 = 6`.

```
┌─────────────────────────┐  ← đỉnh
│ fact(3)  n=3  3*2 = 6    │   ← nhận 2 từ fact(2), return 6
└─────────────────────────┘
```

Bước 8 — `fact(3)` trả `6`. Pop. Stack rỗng. **Kết quả cuối: `6`** ✓ (đúng `3! = 3·2·1 = 6`).

Tóm tắt vòng đời stack: `fact(3) → fact(2) → fact(1) → fact(0)` (phình tới 4 frame) rồi xẹp `1 → 1 → 2 → 6`. Quan sát hai điều: (1) mỗi frame có **`n` riêng** trong environment riêng — `n=3`, `n=2`, `n=1`, `n=0` cùng tồn tại, không đè nhau; (2) giá trị trả về **lan ngược** từ đỉnh xuống đáy, mỗi frame nhân thêm `n` của nó.

> ❓ **Câu hỏi tự nhiên của người đọc**
> - *"Sao mỗi frame lại có `n` riêng không đè nhau?"* — Vì bước 3 ở §2: mỗi lời gọi tạo một `callEnv` **mới**. `fact(3)` và `fact(2)` là hai environment khác nhau, mỗi cái có entry `n` của riêng nó. Đây là lý do đệ quy hoạt động.
> - *"Stack cao tối đa bao nhiêu với `fact(n)`?"* — `n + 1` frame (từ `fact(n)` xuống `fact(0)`). Độ sâu đệ quy tỉ lệ thuận với bộ nhớ stack tiêu thụ.

### 3.3 Liên hệ OS / CPU stack frame

Call stack của interpreter là phiên bản logic của thứ CPU làm cho chương trình thật. Khi chương trình C/Go gọi hàm, CPU **đẩy một stack frame** (lưu địa chỉ quay về, tham số, biến cục bộ) lên một vùng nhớ gọi là **stack**, do [hệ điều hành](../../../OperatingSystems/) cấp phát. Trả về thì con trỏ stack lùi lại (pop). Khác biệt: interpreter quản frame bằng cấu trúc dữ liệu của chính nó (mảng/list các environment), còn CPU quản bằng thanh ghi `SP` (stack pointer) trỏ vào RAM. Cùng ý tưởng LIFO.

> 📝 **Tóm tắt §3.** Mỗi lời gọi push một frame (hàm + environment + điểm quay về); return thì pop, giá trị lan về frame dưới. `fact(3)` phình 4 frame rồi xẹp `1→1→2→6 = 6`. Mỗi frame có environment riêng nên đệ quy không bị đè biến. Đây là một stack LIFO thật, song song với stack frame của CPU/OS.

## 4. Closure — hàm + môi trường bao quanh

> 💡 **Trực giác.** Quay lại "cái túi đồ" ở §1. Closure = **một hàm cầm theo một cái túi** đựng các biến của môi trường nơi nó ra đời. Túi không chứa bản sao giá trị tại thời điểm đó — nó chứa **con trỏ tới chính environment** đó. Vì còn con trỏ, environment đó sống mãi (không bị thu hồi) chừng nào closure còn sống.

### 4.1 Định nghĩa

**Closure** = một hàm **cộng với** environment captured (môi trường nơi nó được định nghĩa). Trong interpreter, đây chính là trường `defEnv` trong `FunctionValue` (§2.1): khi tạo giá trị hàm, ta **chụp lại con trỏ tới environment hiện tại**. Mọi `FunctionValue` thực ra đã là một closure — chỉ là closure "thú vị" khi hàm tham chiếu biến tự do trong `defEnv`.

### 4.2 Walk-through `makeAdder` bằng giá trị thật

```
fn makeAdder(x) {
  fn inner(n) { return n + x; }
  return inner;
}
add5  = makeAdder(5);
add10 = makeAdder(10);
add5(3);    // = ?
add10(3);   // = ?
```

Theo dõi environment từng bước (mỗi environment là một "hộp" có cha trỏ tới hộp ngoài):

**Bước 1 — gọi `makeAdder(5)`.** Tạo `callEnv_A` với `x → 5`, cha = global. Push frame `makeAdder`.

```
callEnv_A:  { x: 5 }   (cha → global)
```

**Bước 2 — eval `fn inner(n) { return n + x; }` bên trong.** Tạo `FunctionValue` cho `inner` với `defEnv = callEnv_A` (chụp environment **hiện tại**, tức cái có `x = 5`).

```
inner_closure_A = FunctionValue {
  params: ["n"], body: <return n + x>, defEnv: callEnv_A  ←─ trỏ tới {x:5}
}
```

**Bước 3 — `return inner`.** `makeAdder(5)` trả về `inner_closure_A`. Frame `makeAdder` **pop khỏi call stack**.

> Đây là điểm "ma thuật": frame `makeAdder` đã pop, nhưng `callEnv_A` (chứa `x = 5`) **không bị thu hồi** vì `inner_closure_A.defEnv` vẫn trỏ tới nó. Cái túi vẫn còn.

**Bước 4 — `add5 = makeAdder(5)`.** Giờ `add5` = `inner_closure_A`.

**Bước 5 — gọi `makeAdder(10)`** (độc lập). Tạo `callEnv_B` với `x → 10`. `inner_closure_B.defEnv = callEnv_B`. `add10 = inner_closure_B`. Hai closure, **hai cái túi khác nhau**: `{x:5}` và `{x:10}`.

**Bước 6 — gọi `add5(3)`.** Tạo `callEnv` mới với `n → 3`, **cha = `add5.defEnv` = callEnv_A**. Eval `n + x`:
- Tra `n` → có trong `callEnv` → `3`.
- Tra `x` → không có trong `callEnv` → leo lên cha (`callEnv_A`) → `5`.
- Kết quả `3 + 5 = 8` ✓.

**Bước 7 — gọi `add10(3)`.** Cha = `callEnv_B`. Tra `x` → `10`. Kết quả `3 + 10 = 13` ✓.

Hai closure dùng chung code (`return n + x`) nhưng tra `x` ra **hai giá trị khác nhau** vì `defEnv` khác nhau. Đó là toàn bộ điều kỳ diệu: **closure = code chung + túi riêng.**

### 4.3 Vì sao closure cần lexical scope (L07)

Closure hoạt động được **chỉ vì** `defEnv` = nơi định nghĩa (lexical), không phải nơi gọi. Khi `inner` định nghĩa bên trong `makeAdder`, theo lexical scope nó "nhìn thấy" `x` của `makeAdder` — và giữ cái nhìn đó vĩnh viễn qua `defEnv`. Đúng như [Lesson 07](../lesson-02-symbol-table-scope/) đã preview: *"closure chính là mở rộng của scope chain — hàm mang theo con trỏ tới chuỗi scope nơi nó được định nghĩa"*. Closure không phải tính năng tách rời; nó là **hệ quả không thể tránh** của việc cho hàm là first-class + lexical scope.

Bốn ví dụ closure khác nhau:

| Closure | Captured | Gọi | Kết quả |
| --- | --- | --- | --- |
| `makeAdder(5)` | `x = 5` | `(3)` | `8` |
| `makeAdder(100)` | `x = 100` | `(1)` | `101` |
| `makeMultiplier(3)` (`return n*k`, `k=3`) | `k = 3` | `(4)` | `12` |
| `counter()` (`c=0; return fn(){c=c+1; return c}`) | `c` (tham chiếu sống) | gọi 3 lần | `1, 2, 3` |

> ❓ **Câu hỏi tự nhiên của người đọc**
> - *"Closure chụp giá trị hay chụp biến?"* — Chụp **biến (ô nhớ)**, không phải giá trị tức thời. Ví dụ `counter` ở trên: mỗi lần gọi `c = c + 1` thực sự **sửa** `c` trong environment captured → lần sau thấy giá trị mới. Đây vừa là sức mạnh, vừa là cái bẫy (§5.3, §4.4 dưới).
> - *"Bộ nhớ của `callEnv_A` bao giờ được giải phóng?"* — Khi không còn closure nào trỏ tới nó. Trong ngôn ngữ có garbage collector (Go, JS, Python), GC tự phát hiện và thu hồi. Closure là một trong những lý do GC cần "đuổi theo con trỏ" thay vì chỉ giải phóng theo stack.

> 🔁 **Dừng lại tự kiểm tra.** Với `add5` và `add10` ở trên, `add5(0)` và `add10(0)` cho gì? Vì sao khác nhau dù cùng đối số `0`?
> <details><summary>Đáp án</summary>
> `add5(0) = 0 + 5 = 5`; `add10(0) = 0 + 10 = 10`. Khác nhau vì hai closure có `defEnv` khác: `add5` leo lên `callEnv_A` thấy `x = 5`, `add10` leo lên `callEnv_B` thấy `x = 10`. Đối số `n = 0` giống nhau, nhưng biến tự do `x` lấy từ hai cái túi khác.
> </details>

> 📝 **Tóm tắt §4.** Closure = hàm + `defEnv` (environment captured lúc định nghĩa). `makeAdder(5)` trả về hàm có `defEnv` chứa `x=5`; frame `makeAdder` pop nhưng `defEnv` sống vì closure còn trỏ tới. Gọi `add5(3)`: tra `n` tại chỗ, tra `x` leo lên `defEnv` → `8`. Closure chụp **biến**, không chụp giá trị. Đây là hệ quả trực tiếp của lexical scope (L07).

## 5. Biến tự do vs ràng buộc; tham trị vs tham chiếu

### 5.1 Biến ràng buộc (bound) vs biến tự do (free)

Trong thân một hàm, mỗi tên biến rơi vào một trong hai loại:

- **Biến ràng buộc (bound)**: được khai báo *bên trong* hàm — là tham số, hoặc biến cục bộ. Hàm "tự lo" được.
- **Biến tự do (free)**: được dùng trong hàm nhưng **không** khai báo bên trong — phải lấy từ environment bao ngoài (closure). Đây chính là các biến mà closure "bắt".

Xét `fn inner(n) { return n + x; }`:
- `n` là **bound** (là tham số của `inner`).
- `x` là **free** (không phải tham số, không khai báo trong `inner`) → bắt từ `defEnv`.

Bốn ví dụ phân loại:

| Thân hàm | Bound | Free |
| --- | --- | --- |
| `fn f(a){ return a+1; }` | `a` | (không có) |
| `fn g(a){ return a+b; }` | `a` | `b` |
| `fn h(a){ c = a*2; return c+d; }` | `a`, `c` | `d` |
| `fn k(){ return p+q; }` | (không có) | `p`, `q` |

> 💡 **Trực giác.** "Bound" = hàm tự cầm trong tay; "free" = hàm phải đi mượn từ hàng xóm (scope ngoài). Closure chính là cơ chế giữ liên lạc với mấy "hàng xóm" đó kể cả sau khi họ "dọn đi" (frame pop).

### 5.2 Tham trị (by value) vs tham chiếu (by reference) — sơ lược

Khi truyền đối số vào hàm (bước 2-3 ở §2), có hai cách:

- **Tham trị (by value)**: copy **giá trị** của đối số vào tham số. Hàm sửa tham số → bản gốc bên ngoài **không đổi**. Đúng với số, bool trong hầu hết ngôn ngữ.
- **Tham chiếu / chia sẻ (by reference / by sharing)**: tham số trỏ tới **cùng đối tượng** với đối số. Hàm sửa nội dung đối tượng → bên ngoài **thấy đổi**. Đúng với mảng/map/struct con trỏ.

Ví dụ Go (minh họa cụ thể):

```go
func incVal(x int)      { x = x + 1 }       // by value: bản gốc không đổi
func incSlice(s []int)  { s[0] = s[0] + 1 } // chia sẻ: phần tử slice đổi

a := 5; incVal(a)         // a vẫn 5
b := []int{5}; incSlice(b)// b[0] thành 6
```

Liên quan tới closure thế nào? Closure chụp **biến** (ô nhớ), nên nếu nhiều closure cùng chụp một biến, sửa qua closure này → closure kia thấy. Đây là bản chất bug ở §5.3.

> ⚠ **Lỗi thường gặp.** Tưởng "truyền slice/map vào hàm thì an toàn vì là tham trị". Không: Go truyền *bản sao của header slice*, nhưng header trỏ tới **cùng mảng nền** → sửa phần tử là sửa thật bản gốc. Chỉ gán lại `s = ...` mới không ảnh hưởng bên ngoài.

### 5.3 Bug kinh điển: closure bắt biến lặp (KHÔNG phải giá trị)

Đây là lỗi closure nổi tiếng nhất. Pseudocode:

```
funcs = []
for i = 0; i < 3; i = i + 1 {
  funcs.push( fn() { return i; } )   // closure bắt BIẾN i
}
// gọi cả ba:
funcs[0]()  // mong 0... nhưng ra ?
funcs[1]()  // mong 1... nhưng ra ?
funcs[2]()  // mong 2... nhưng ra ?
```

Nếu vòng lặp dùng **một biến `i` duy nhất** (chia sẻ qua các vòng), cả ba closure bắt **cùng ô nhớ `i`**. Sau vòng lặp, `i = 3`. Khi gọi, cả ba leo lên cùng `i` → **in `3, 3, 3`**, không phải `0, 1, 2`.

Walk-through bằng giá trị thật:
- Vòng `i=0`: tạo closure A, `A.defEnv` trỏ tới environment chứa ô `i` (lúc này 0).
- Vòng `i=1`: `i` **bị sửa** thành 1 trong **cùng ô đó** (vì cùng biến). `A.defEnv` vẫn trỏ ô đó → giờ A "thấy" 1.
- Vòng `i=2`: ô `i` thành 2.
- Hết lặp: `i` thành 3 (điều kiện `3 < 3` sai, dừng). Cả A, B, C trỏ cùng ô `i = 3`.
- Gọi: cả ba ra `3`.

**Cách sửa** — cho mỗi vòng một biến **riêng** để mỗi closure bắt một ô khác:

```
for i = 0; i < 3; i = i + 1 {
  j = i                      // tạo BIẾN MỚI mỗi vòng
  funcs.push( fn() { return j; } )  // mỗi closure bắt j riêng
}
// → 0, 1, 2  ✓
```

Hoặc truyền `i` làm **tham số** (tham số là biến mới mỗi lời gọi):

```
for i = 0; i < 3; i = i + 1 {
  funcs.push( (function(k){ return fn(){ return k; }; })(i) )
}
// → 0, 1, 2  ✓
```

> ⚠ **Lỗi thường gặp — ghi nhớ.** "Closure bắt biến, không bắt giá trị." Mọi ngôn ngữ có closure + lặp đều dính bẫy này (JS trước ES6 với `var`, Go trước 1.22, Python). Go 1.22+ và JS với `let` đã sửa bằng cách **tự tạo biến mới mỗi vòng** — đúng như cách sửa thủ công ở trên. Module demo trong [visualization.html](./visualization.html) cho bạn bật/tắt bug này.

> 🔁 **Dừng lại tự kiểm tra.** Nếu vòng lặp chạy `i` từ 0 đến 4 (5 vòng) với bug, gọi `funcs[2]()` ra gì?
> <details><summary>Đáp án</summary>
> `5`. Tất cả closure bắt cùng ô `i`. Sau vòng lặp `i = 5` (điều kiện `5 < 5` sai). Mọi `funcs[k]()` đều ra `5`, kể cả `funcs[2]`.
> </details>

> 📝 **Tóm tắt §5.** Biến bound = khai báo trong hàm; free = mượn từ scope ngoài (closure bắt các biến free). Tham trị copy giá trị; tham chiếu/chia sẻ dùng chung đối tượng. Closure bắt **biến (ô nhớ)** → vòng lặp dùng chung biến lặp khiến mọi closure in cùng giá trị cuối; sửa bằng cách tạo biến mới mỗi vòng.

## 6. Đệ quy, điều kiện dừng, và tràn ngăn xếp

### 6.1 Đệ quy cần điều kiện dừng

Một hàm **đệ quy** gọi chính nó. Để không gọi mãi mãi, nó cần một **điều kiện dừng (base case)** — trường hợp trả về thẳng, không gọi tiếp. `fact(n)` ở §3 dừng tại `n == 0`. Mỗi bước đệ quy phải **tiến gần tới base case** (ở đây: `n - 1` luôn giảm → chắc chắn chạm 0).

Cấu trúc chuẩn của một hàm đệ quy:

```
fn recurse(arg) {
  if (base_case(arg)) { return base_value; }   // 1. điều kiện dừng
  return combine(recurse(smaller(arg)));        // 2. tiến về base case
}
```

Bốn ví dụ đệ quy với base case:

| Hàm | Base case | Bước đệ quy |
| --- | --- | --- |
| `fact(n)` | `n == 0 → 1` | `n * fact(n-1)` |
| `fib(n)` | `n < 2 → n` | `fib(n-1) + fib(n-2)` |
| `sum(n)` | `n == 0 → 0` | `n + sum(n-1)` |
| `pow(b,e)` | `e == 0 → 1` | `b * pow(b, e-1)` |

### 6.2 Tràn ngăn xếp (stack overflow) khi đệ quy vô hạn

Nhớ §3: mỗi lời gọi push một frame. Stack có **giới hạn kích thước** (OS cấp một vùng nhớ hữu hạn). Nếu đệ quy **không có base case** hoặc base case không bao giờ đạt được, stack phình **mãi mãi** → đầy → chương trình sập với lỗi **stack overflow**.

```
fn bad(n) {
  return bad(n + 1);   // KHÔNG có base case, n càng lúc càng to
}
bad(0);  // bad(0) → bad(1) → bad(2) → ... → STACK OVERFLOW
```

Stack frame chồng chất không bao giờ pop:

```
│ bad(99999) ... │  ← cứ phình
│ bad(2)         │
│ bad(1)         │
│ bad(0)         │
└────────────────┘  → tràn vùng nhớ stack → crash
```

> ⚠ **Lỗi thường gặp.** (1) Quên base case hoàn toàn. (2) Có base case nhưng bước đệ quy **không tiến về** nó — ví dụ `fact(n)` viết nhầm `n * fact(n)` (không giảm) → vô hạn. (3) Đệ quy quá sâu *dù* đúng — ví dụ `fact(1000000)` vẫn tràn vì cần 1 triệu frame. Với độ sâu lớn, đổi sang **vòng lặp** (chỉ dùng 1 frame) hoặc tail-call optimization (một số ngôn ngữ).

> ❓ **Câu hỏi tự nhiên của người đọc**
> - *"Vòng lặp `while` có tràn stack không?"* — Không. Vòng lặp chạy trong **một frame duy nhất** — nó không push frame mới mỗi vòng. Đây là khác biệt cốt lõi: đệ quy tốn O(độ sâu) bộ nhớ stack, vòng lặp tốn O(1). `fact(n)` đệ quy cần n frame; viết bằng `while` chỉ cần 1.
> - *"Bao nhiêu frame thì tràn?"* — Tùy giới hạn stack (thường vài MB → hàng chục nghìn tới vài trăm nghìn frame, phụ thuộc kích thước mỗi frame). Không có con số cố định; đừng dựa vào đệ quy sâu không kiểm soát.

> 📝 **Tóm tắt §6.** Đệ quy cần base case + mỗi bước tiến gần nó. Mỗi lời gọi push frame; đệ quy vô hạn (thiếu/không-đạt base case) hoặc quá sâu làm stack đầy → stack overflow. Vòng lặp dùng 1 frame nên không tràn — đổi đệ quy sâu sang lặp khi cần.

## 7. Closure là nền lập trình hàm — và ngôn ngữ đã Turing-complete

Có hàm + đệ quy + điều kiện (`if`) + lặp (`while` từ L09), ngôn ngữ đồ chơi của ta giờ **Turing-complete** — về lý thuyết tính được mọi thứ một máy tính tính được. Một ngôn ngữ đầy đủ tối thiểu cần: gán biến, điều kiện rẽ nhánh, và một dạng lặp/đệ quy. Ta có đủ.

Closure mở ra cả mảng **lập trình hàm (functional programming)**:

- **Hàm bậc cao (higher-order)**: hàm nhận hàm làm tham số (`map`, `filter`, `reduce`) — closure cho phép hàm truyền vào "nhớ" ngữ cảnh.
- **Factory hàm**: `makeAdder`, `makeMultiplier` — sinh hàm chuyên biệt từ tham số.
- **Đóng gói trạng thái**: `counter()` giữ biến đếm riêng tư mà không cần class.
- **Callback/event handler**: hàm nhớ được dữ liệu lúc đăng ký.

### Dẫn sang Tier 3 — biên dịch hàm

Tree-walking interpreter của ta *chạy* hàm bằng cách duyệt AST mỗi lời gọi — đơn giản nhưng chậm. Tier 3 (Backend) sẽ **biên dịch** hàm thành mã trung gian rồi mã máy/bytecode:

- Lời gọi/trả về thành lệnh **`call` / `return`** thật.
- `callEnv` của ta thành **stack frame vật lý** (activation record) với layout cố định: tham số ở offset nào, biến cục bộ ở đâu.
- Closure thành cấu trúc lưu con trỏ code + con trỏ tới biến captured (đôi khi "đóng hộp" biến lên heap).

Bước đầu tiên của con đường đó là biểu diễn chương trình bằng **mã trung gian** dễ tối ưu hơn AST. Đó chính là bài tiếp theo: [IR — Three-Address Code](../../03-Backend/lesson-01-ir-three-address/).

> 📝 **Tóm tắt §7.** Hàm + đệ quy + if + while ⇒ Turing-complete. Closure là nền của lập trình hàm (higher-order, factory, đóng gói trạng thái, callback). Tier 3 sẽ biên dịch hàm: `call/return`, stack frame vật lý, closure thành cấu trúc heap — bắt đầu từ IR.

## Bài tập

**Bài 1.** Cho `fn dbl(x) { return x * 2; }` định nghĩa ở global. Mô tả `callEnv` được tạo và cha của nó khi gọi `dbl(7)`. Kết quả là gì?

**Bài 2.** (Tự vẽ call stack) Vẽ đầy đủ call stack khi chạy `sum(3)` với:
```
fn sum(n) {
  if (n == 0) { return 0; }
  return n + sum(n - 1);
}
```
Ghi rõ giai đoạn phình và giai đoạn xẹp (giá trị trả lan ngược).

**Bài 3.** (Tự vẽ closure) Cho:
```
fn makeMultiplier(k) {
  fn mul(n) { return n * k; }
  return mul;
}
triple = makeMultiplier(3);
triple(5);
```
Vẽ environment captured của `triple` và walk-through `triple(5)` từng bước tra biến.

**Bài 4.** Trong `fn f(a) { b = a + 1; return b + c; }`, liệt kê biến bound và biến free. Nếu `c` không tồn tại ở scope nào bao ngoài thì sao?

**Bài 5.** (Bug closure) Chạy đoạn sau (bug, một biến `i` chung) rồi đoạn đã sửa. In gì?
```
// bug:
fs = []
for i = 0; i < 4; i = i + 1 { fs.push(fn(){ return i; }) }
fs[0](); fs[1](); fs[2](); fs[3]()
```
Giải thích vì sao bug ra như vậy, và sửa thế nào.

**Bài 6.** Hàm sau có tràn stack không? Nếu có, vì sao; nếu không, kết quả là gì?
```
fn down(n) {
  if (n <= 0) { return 0; }
  return down(n - 2);
}
down(5);
```

**Bài 7.** (Tham trị vs chia sẻ) Dự đoán output của đoạn Go:
```go
func bump(x int)     { x++ }
func bumpAll(s []int){ for i := range s { s[i]++ } }
a := 10; bump(a)
b := []int{1, 2}; bumpAll(b)
// in a, b
```

**Bài 8.** Viết hàm `counter()` (pseudocode) trả về một closure: mỗi lần gọi trả về số đếm tăng dần `1, 2, 3, ...`. Giải thích biến nào được captured và vì sao trạng thái được giữ giữa các lời gọi.

## Lời giải chi tiết

### Bài 1

Gọi `dbl(7)`:
- **Bước 1**: lookup `dbl` trong global → `FunctionValue { params:["x"], body:<return x*2>, defEnv: global }`.
- **Bước 2**: eval đối số `7` → `7`.
- **Bước 3**: tạo `callEnv` mới với `x → 7`. **Cha của `callEnv` = `defEnv` = global** (vì `dbl` định nghĩa ở global).
- **Bước 4**: eval `x * 2` trong `callEnv`: tra `x` → 7 ngay tại `callEnv`; `7 * 2 = 14`.

Kết quả: **`14`**. `callEnv` chứa đúng một entry `x → 7`, cha là global.

### Bài 2

`sum(3)`:

**Phình** (push tới base case):
```
│ sum(0)  n=0  return 0     │  ← đỉnh, base case
│ sum(1)  n=1  chờ sum(0)   │
│ sum(2)  n=2  chờ sum(1)   │
│ sum(3)  n=3  chờ sum(2)   │
└───────────────────────────┘
```
Stack cao tối đa 4 frame (`n=3,2,1,0`).

**Xẹp** (pop, giá trị lan ngược):
- `sum(0)` trả `0`. Pop. `sum(1)`: `1 + 0 = 1`.
- `sum(1)` trả `1`. Pop. `sum(2)`: `2 + 1 = 3`.
- `sum(2)` trả `3`. Pop. `sum(3)`: `3 + 3 = 6`.
- `sum(3)` trả `6`. Pop. Stack rỗng.

Kết quả: **`6`** (đúng `0+1+2+3 = 6`). Giá trị trả lan ngược: `0 → 1 → 3 → 6`.

### Bài 3

**Tạo closure** (`makeMultiplier(3)`):
- `callEnv_M`: `{ k: 3 }`, cha = global. Push frame `makeMultiplier`.
- Tạo `FunctionValue` cho `mul`: `params:["n"], body:<return n*k>, defEnv = callEnv_M` (chụp `{k:3}`).
- `return mul` → `makeMultiplier` pop, nhưng `callEnv_M` sống vì `mul.defEnv` trỏ tới nó.
- `triple = mul` → `triple.defEnv = callEnv_M {k:3}`.

Environment captured của `triple`:
```
triple = closure {
  body: return n * k
  defEnv ──→ callEnv_M { k: 3 } ──→ global
}
```

**Walk-through `triple(5)`**:
- Tạo `callEnv` mới: `{ n: 5 }`, cha = `triple.defEnv` = `callEnv_M`.
- Eval `n * k`:
  - Tra `n` → có trong `callEnv` → `5`.
  - Tra `k` → không có trong `callEnv` → leo lên cha `callEnv_M` → `3`.
  - `5 * 3 = 15`.

Kết quả: **`15`**. `k` là biến free, bắt từ `callEnv_M`.

### Bài 4

`fn f(a) { b = a + 1; return b + c; }`:
- **Bound**: `a` (tham số), `b` (biến cục bộ khai báo bên trong).
- **Free**: `c` (dùng nhưng không khai báo trong `f`).

Nếu `c` không tồn tại ở bất kỳ scope bao ngoài nào: khi eval `b + c`, tra `c` leo hết scope chain tới global mà không thấy → **lỗi runtime "biến chưa định nghĩa / undefined variable"** (loại lỗi đã bàn ở L09 §6). Lỗi chỉ lộ ra **lúc gọi** `f` và chạm dòng `return`, không phải lúc định nghĩa.

### Bài 5

**Bug** — một biến `i` chung cho cả vòng lặp:
- Mỗi closure `fn(){ return i; }` bắt **cùng ô `i`**.
- Sau vòng lặp `i = 4` (điều kiện `4 < 4` sai → dừng).
- `fs[0]() = fs[1]() = fs[2]() = fs[3]() = ` **`4, 4, 4, 4`**.

Vì sao: closure bắt **biến (ô nhớ)**, không phải giá trị tại thời điểm tạo. Tất cả trỏ về cùng `i`, mà `i` cuối cùng là `4`.

**Sửa** — tạo biến mới mỗi vòng:
```
for i = 0; i < 4; i = i + 1 {
  j = i                          // biến MỚI mỗi vòng
  fs.push(fn(){ return j; })     // mỗi closure bắt j riêng
}
// → 0, 1, 2, 3  ✓
```
Mỗi vòng có một `j` riêng (ô nhớ khác), nên mỗi closure bắt một ô giữ đúng giá trị 0,1,2,3. (Go 1.22+ và JS `let` tự động làm điều này.)

### Bài 6

`down(5)`:
- `down(5)`: `5 <= 0`? Không. `down(3)`.
- `down(3)`: `3 <= 0`? Không. `down(1)`.
- `down(1)`: `1 <= 0`? Không. `down(-1)`.
- `down(-1)`: `-1 <= 0`? **Có!** `return 0`.
- Lan ngược: tất cả trả `0`.

**Không tràn stack**. Base case (`n <= 0`) đạt được vì `n` giảm 2 mỗi bước và `n <= 0` bắt cả số âm (không "nhảy qua" 0). Kết quả: **`0`**. Stack cao tối đa 4 frame (`5, 3, 1, -1`).

(So sánh: nếu base case là `n == 0` thay vì `n <= 0`, thì `down(5)` đi `5→3→1→-1→-3→...` không bao giờ bằng đúng 0 → **tràn stack**. Đây là bẫy "base case không đạt được".)

### Bài 7

```go
func bump(x int)      { x++ }
func bumpAll(s []int) { for i := range s { s[i]++ } }
a := 10; bump(a)          // a vẫn 10  (by value: x là bản sao)
b := []int{1, 2}; bumpAll(b) // b thành [2, 3]
```

Output: **`a = 10`, `b = [2 3]`**.
- `bump(a)`: `int` truyền **tham trị** — `x` là bản sao, `x++` không động tới `a`.
- `bumpAll(b)`: slice header được sao chép, nhưng trỏ tới **cùng mảng nền** → `s[i]++` sửa thật phần tử của `b`.

### Bài 8

```
fn counter() {
  c = 0;                       // biến cục bộ của counter
  fn next() {
    c = c + 1;                 // sửa c trong environment captured
    return c;
  }
  return next;
}
cnt = counter();
cnt();  // 1
cnt();  // 2
cnt();  // 3
```

- **Captured**: biến `c` (trong `callEnv` của lời gọi `counter()`). `next.defEnv` trỏ tới environment chứa `c`.
- **Vì sao trạng thái được giữ**: sau `counter()` trả về, frame của nó pop, nhưng `callEnv` chứa `c` **sống** vì `cnt.defEnv` trỏ tới. Mỗi lần gọi `cnt()`, dòng `c = c + 1` **sửa cùng ô `c`** đó → lần sau thấy giá trị đã tăng. Closure bắt **biến** (không phải giá trị) chính là điều cho phép trạng thái tồn tại giữa các lời gọi mà không cần biến global hay class.
- Gọi 3 lần: `1, 2, 3`. Nếu gọi `counter()` lần nữa → closure mới với `c` riêng, đếm lại từ 1.

## Kết thúc Tier 2 — và bài tiếp theo

Đây là **bài cuối Tier 2 (Semantics)**. Lộ trình đã đi qua:

- L06 [AST & Visitor](../lesson-01-ast-visitor/) — dựng cây.
- L07 [Symbol Table & Scope](../lesson-02-symbol-table-scope/) — quản tên qua scope chain.
- L08 Type Checking — kiểm tra kiểu.
- L09 [Tree-Walking Interpreter](../lesson-04-tree-walking-interpreter/) — chạy biểu thức + if/while.
- **L10 (bài này)** — hàm, closure, call stack, đệ quy ⇒ ngôn ngữ **Turing-complete**.

Ngôn ngữ đồ chơi giờ đã *chạy được mọi thứ*. Bước tiếp theo là làm cho nó **chạy nhanh** — chuyển từ tree-walking sang biên dịch. Tier 3 (Backend) bắt đầu bằng mã trung gian:

- Bài tiếp: [Lesson 11 — IR (Three-Address Code)](../../03-Backend/lesson-01-ir-three-address/) — biểu diễn chương trình bằng mã trung gian dễ tối ưu, tiền đề cho sinh mã. Ở đó lời gọi/trả về hàm thành `call`/`return`, và `callEnv` thành stack frame vật lý.

- Code minh họa tương tác: [visualization.html](./visualization.html) — call stack visualizer (`fact`/`fib`), closure explorer (`makeAdder`), và demo bug closure bắt biến lặp.
