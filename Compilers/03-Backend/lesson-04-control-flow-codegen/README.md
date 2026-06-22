# Lesson 14 — Sinh mã điều khiển luồng (Control Flow Codegen: if/while → jumps)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao** bytecode tuyến tính (chạy lệnh này tới lệnh kế) không đủ để biểu diễn `if`/`while`, và nó cần **rẽ nhánh (branching)** như thế nào.
- Nắm ba lệnh nhảy nền tảng: **JMP** (nhảy vô điều kiện), **JMPF** (nhảy nếu sai), **JMPT** (nhảy nếu đúng) — và khái niệm **nhãn (label)** = vị trí một lệnh.
- Tự tay **biên dịch (compile)** `if/else` và `while` thành bytecode có nhãn + lệnh nhảy, rồi **chạy thử** từng vòng trên một stack VM.
- Hiểu **backpatching** — kỹ thuật điền địa chỉ nhảy sau khi sinh xong phần thân.
- Vẽ và đọc **đồ thị luồng điều khiển (Control Flow Graph — CFG)** với các **khối cơ bản (basic block)**.
- Hiểu cách `&&` / `||` (boolean short-circuit) biến thành nhánh, và vì sao `for` chỉ là một biến thể của `while`.

## Kiến thức tiền đề

- [L13 — Bytecode & Stack VM](../lesson-03-bytecode-stack-vm/) — bài này giả định bạn đã biết stack VM thực thi `PUSH/ADD/LT/...` như thế nào.
- [L11 — IR (Three-Address Code)](../lesson-01-ir-three-address/) — biểu diễn trung gian; CFG ở §6 nối thẳng vào IR.
- [DataFoundations — Boolean Logic](../../../DataFoundations/03-MathFoundations/lesson-02-boolean-logic/) — `&&`, `||`, `!` và bảng chân lý; §7 dùng lại để giải thích short-circuit.
- [DataStructures — Graph](../../../DataStructures/03-Advanced/lesson-01-graph/) — CFG (§6) là một đồ thị có hướng; basic block là đỉnh, nhánh là cạnh.

## 1. Vì sao cần điều khiển luồng? Câu hỏi mở bài

Ở [L13](../lesson-03-bytecode-stack-vm/) chúng ta đã biên dịch được **biểu thức**: `3 + 4 * 2` thành chuỗi bytecode **tuyến tính** — máy chạy lệnh 0, rồi 1, rồi 2... đến hết, không bao giờ quay lại hay bỏ qua lệnh nào.

Nhưng code thật có rẽ nhánh:

```
if score >= 60 {
    print("Đậu")
} else {
    print("Rớt")
}
```

> **Câu hỏi cốt lõi của bài này**: `if` và `while` trong source code rốt cuộc trở thành **cái gì** ở mức bytecode / assembly? CPU và stack VM **không có** khái niệm `if`, `while`, `{ }` — chúng chỉ biết "chạy lệnh kế tiếp". Vậy làm sao một dãy lệnh phẳng lại có thể "chỉ in Đậu khi điểm ≥ 60"?

**Câu trả lời ngắn** (sẽ chứng minh chi tiết suốt bài): trình biên dịch dịch mọi cấu trúc cao cấp thành **nhãn (label)** + **lệnh nhảy (jump)**.

- **Nhảy vô điều kiện**: "đặt con trỏ lệnh (PC) sang vị trí khác" → bỏ qua một đoạn (`else` khi điều kiện đúng) hoặc quay lại (vòng lặp).
- **Nhảy có điều kiện**: "nếu giá trị trên đỉnh stack là sai thì nhảy, không thì chạy tiếp" → đó chính là cơ chế của `if`.

Máy **không hiểu** `while` — nó chỉ hiểu "lấy giá trị điều kiện, nếu sai thì nhảy ra ngoài, nếu đúng thì chạy thân rồi nhảy về kiểm tra lại". `while` chỉ là **cái tên người** đặt cho mẫu nhảy đó.

> **💡 Trực giác — bàn cờ & quân cờ**
>
> Hình dung bytecode là một dãy ô trên bàn cờ đánh số 0, 1, 2... Bình thường quân cờ (PC) đi tới đều đặn ô kế tiếp. **Lệnh nhảy = ô có ghi "đi tới ô số K"**. `JMPF` là ô có ghi "nếu xúc xắc ra số chẵn thì đi tới ô K, không thì đi tiếp". `if` / `while` chỉ là cách sắp xếp các ô "đi tới" này sao cho quân cờ đi đúng lộ trình mong muốn. Bản thân bàn cờ vẫn phẳng.

### 1.1 Mô hình thực thi: PC (Program Counter)

VM giữ một biến **PC** (program counter) = chỉ số lệnh sắp chạy. Vòng lặp thực thi cốt lõi:

```
pc = 0
while pc < len(code):
    instr = code[pc]
    pc = pc + 1          // mặc định: tiến tới lệnh kế
    execute(instr)       // lệnh nhảy có thể GHI ĐÈ pc
```

Điểm mấu chốt: **lệnh nhảy ghi đè `pc`**. `JMP 10` đặt `pc = 10`, nên lệnh chạy kế tiếp là lệnh số 10 chứ không phải lệnh liền sau. Đó là toàn bộ "ma thuật" của điều khiển luồng.

> **📝 Tóm tắt mục 1**
> - Bytecode mặc định chạy **tuyến tính**: lệnh 0 → 1 → 2 → ...
> - `if`/`while` cần **rẽ nhánh** → không biểu diễn được bằng dãy phẳng thuần.
> - Giải pháp: **nhãn** (vị trí lệnh) + **lệnh nhảy** (ghi đè PC).
> - Máy không "hiểu" `if`/`while` — nó chỉ thực thi nhảy. `if`/`while` là cách compiler sắp xếp các lệnh nhảy.

## 2. Bộ lệnh nhảy: JMP, JMPF, JMPT

Ta mở rộng bộ lệnh stack VM ở L13 với ba lệnh điều khiển luồng. Toán hạng của chúng là **địa chỉ lệnh đích** (một số nguyên = chỉ số trong mảng bytecode).

| Lệnh | Ý nghĩa | Tác động lên PC | Tác động lên stack |
| --- | --- | --- | --- |
| `JMP L` | Nhảy **vô điều kiện** | `pc = L` | không đụng stack |
| `JMPF L` | Nhảy **nếu sai** (jump-if-false) | pop `v`; nếu `v == false` thì `pc = L` | pop 1 phần tử |
| `JMPT L` | Nhảy **nếu đúng** (jump-if-true) | pop `v`; nếu `v == true` thì `pc = L` | pop 1 phần tử |

> **💡 Trực giác — JMPF là người gác cổng**
>
> `JMPF L` đứng ngay sau đoạn tính điều kiện. Nó nhìn kết quả vừa được đẩy lên stack: "sai à? Vậy mời anh đi đường vòng tới L (bỏ qua khối lệnh phía sau tôi). Đúng à? Mời đi thẳng vào khối." Toàn bộ `if` được xây quanh một `JMPF` như vậy.

### 2.1 Nhãn (label) là gì?

**Nhãn** chỉ là một **cái tên cho một vị trí lệnh**. Khi sinh bytecode, ta hay viết:

```
Lelse:    PUSH "Rớt"     // Lelse là tên cho địa chỉ của lệnh PUSH này
```

Khi **lắp ráp (assemble)** thành mã cuối, nhãn biến mất, chỉ còn **con số địa chỉ**. Nhãn tồn tại để con người (và compiler) khỏi phải đếm địa chỉ bằng tay — nhưng VM cuối cùng chỉ thấy số.

> Ví dụ: nếu `Lelse` đứng ở lệnh số 7, thì `JMPF Lelse` sau khi assemble trở thành `JMPF 7`.

### 2.2 Bốn ví dụ về lệnh nhảy

Để thấy rõ cơ chế, đây là **bốn** đoạn bytecode nhỏ kèm vết chạy (trace). Quy ước: mỗi dòng `addr: LỆNH`.

**Ví dụ 1 — JMP vô điều kiện (bỏ qua một lệnh):**
```
0: PUSH 1
1: JMP 4          // nhảy thẳng tới 4, BỎ QUA lệnh 2 và 3
2: PUSH 999       // không bao giờ chạy
3: ADD            // không bao giờ chạy
4: PRINT          // in 1
```
Trace PC: `0 → 1 → 4`. Stack khi tới PRINT: `[1]`. In ra **1** (không phải 1000).

**Ví dụ 2 — JMPF với điều kiện SAI (nhảy):**
```
0: PUSH false
1: JMPF 4         // pop false → false nên NHẢY tới 4
2: PUSH "A"       // bị bỏ qua
3: PRINT          // bị bỏ qua
4: PUSH "B"
5: PRINT          // in "B"
```
Trace PC: `0 → 1 → 4 → 5`. In ra **B**. (`JMPF` đã pop `false`, stack rỗng trước khi PUSH "B".)

**Ví dụ 3 — JMPF với điều kiện ĐÚNG (không nhảy):**
```
0: PUSH true
1: JMPF 4         // pop true → KHÔNG nhảy, chạy tiếp lệnh 2
2: PUSH "A"
3: PRINT          // in "A"
4: ...
```
Trace PC: `0 → 1 → 2 → 3 → ...`. In ra **A**. Cùng một bytecode như Ví dụ 2 nhưng giá trị điều kiện khác → đường đi khác.

**Ví dụ 4 — JMPT (nhảy nếu đúng) tạo vòng đếm 2 lần:**
```
0: PUSH 0
1: PUSH 1
2: ADD            // n = n + 1
3: DUP            // nhân đôi đỉnh để vừa giữ vừa so sánh
4: PUSH 2
5: LT             // n < 2 ?
6: JMPT 1         // nếu n < 2 đúng → nhảy về 1 (cộng tiếp)
7: PRINT          // in 2
```
Trace: n=1 (1<2 đúng → về 1) → n=2 (2<2 sai → không nhảy) → PRINT in **2**. (`JMPT` là "anh em đối" của `JMPF`; vòng lặp viết kiểu nào cũng được, ta sẽ chuẩn hóa dùng `JMPF` ở §4.)

> **⚠ Lỗi thường gặp — off-by-one ở địa chỉ nhãn**
>
> `JMP 4` nhảy tới lệnh **số 4**, không phải "lệnh thứ 4" (lệnh thứ 4 là số 3 vì đếm từ 0). Sai một đơn vị → nhảy trúng giữa một lệnh khác hoặc lệch một dòng → chạy sai hoàn toàn. Luôn đánh số địa chỉ từ **0** và kiểm tra đích trỏ đúng dòng bạn muốn.

> **🔁 Dừng lại tự kiểm tra**
> 1. Trong Ví dụ 2, nếu đổi `PUSH false` thành `PUSH true` thì in ra gì?
> 2. `JMPF` có thay đổi stack không?
>
> <details><summary>Đáp án</summary>
>
> 1. In ra **A** (giống Ví dụ 3) — `true` thì JMPF không nhảy, chạy lệnh 2-3.
> 2. Có. `JMPF`/`JMPT` đều **pop 1 phần tử** (giá trị điều kiện) khỏi stack rồi mới quyết định nhảy. `JMP` thì không đụng stack.
> </details>

> **📝 Tóm tắt mục 2**
> - `JMP L`: nhảy vô điều kiện, không đụng stack.
> - `JMPF L` / `JMPT L`: pop 1 giá trị, nhảy nếu giá trị sai / đúng.
> - **Nhãn** = tên cho một địa chỉ lệnh; khi assemble biến thành số.
> - Địa chỉ đếm **từ 0** — cẩn thận off-by-one.

## 3. Biên dịch `if/else`

### 3.1 Khuôn mẫu (template)

Mọi `if c { A } else { B }` được dịch theo đúng khuôn này:

```
        <mã của c>          // tính điều kiện, đẩy true/false lên stack
        JMPF Lelse          // sai → nhảy sang nhánh else
        <mã của A>          // nhánh then
        JMP  Lend           // chạy xong then → nhảy QUA else
Lelse:  <mã của B>          // nhánh else
Lend:   ...                 // điểm hợp nhất (merge point)
```

Đọc khuôn này như một câu: "tính điều kiện; nếu sai nhảy xuống else; nếu (chạy tới đây tức là) đúng thì làm A rồi **nhảy vượt** else để khỏi làm cả hai; nhãn else là chỗ B; nhãn end là nơi hai nhánh gặp lại."

> **💡 Trực giác — ngã ba đường**
>
> `JMPF Lelse` là **ngã ba**: rẽ trái (else) nếu điều kiện sai, đi thẳng (then) nếu đúng. Nhưng nếu đi thẳng (then), cuối đường then có một **cầu vượt** `JMP Lend` bắc qua đoạn else — để xe đi đường then không vô tình lao vào đoạn else. `Lend` là chỗ hai con đường nhập làm một.

> **⚠ Lỗi thường gặp — quên `JMP Lend` ở cuối nhánh then**
>
> Đây là lỗi kinh điển. Nếu thiếu `JMP Lend`:
> ```
>         <c>
>         JMPF Lelse
>         <A>          // chạy then xong...
> Lelse:  <B>          // ...rồi RƠI THẲNG vào else! Chạy CẢ HAI nhánh.
> Lend:
> ```
> Khi điều kiện đúng, máy chạy `A`, rồi vì không có lệnh nhảy nó **tiếp tục tuyến tính** ngay vào `B`. Kết quả: chạy luôn nhánh else dù điều kiện đúng. `JMP Lend` tồn tại **chính xác để chặn** việc rơi xuống (fall-through) này.

### 3.2 Walk-through đầy đủ một `if/else` cụ thể

Biên dịch:

```
if x < 10 {
    print(1)
} else {
    print(2)
}
```

**Bước 1 — sinh mã từng phần** (giả sử `x` đã ở slot biến 0):

| Phần | Bytecode |
| --- | --- |
| `<c>` = `x < 10` | `LOAD x` ; `PUSH 10` ; `LT` |
| `JMPF Lelse` | `JMPF Lelse` |
| `<A>` = `print(1)` | `PUSH 1` ; `PRINT` |
| `JMP Lend` | `JMP Lend` |
| `Lelse: <B>` = `print(2)` | `PUSH 2` ; `PRINT` |
| `Lend:` | (chỉ là nhãn, không có lệnh riêng) |

**Bước 2 — đánh địa chỉ và phân giải nhãn:**

```
0: LOAD x        // đẩy giá trị x
1: PUSH 10
2: LT            // x < 10 ? → đẩy true/false
3: JMPF 7        // Lelse = địa chỉ 7
4: PUSH 1
5: PRINT
6: JMP 9         // Lend = địa chỉ 9
7: PUSH 2        // Lelse ở đây
8: PRINT
9: ...           // Lend ở đây (lệnh tiếp theo của chương trình)
```

Vậy `Lelse = 7`, `Lend = 9`. (Làm sao biết 7 khi mới sinh tới lệnh 3? Đó là vấn đề **backpatching** ở §5.)

**Bước 3a — CHẠY với `x = 4` (điều kiện đúng):**

| PC | Lệnh | Stack sau | Ghi chú |
| --- | --- | --- | --- |
| 0 | LOAD x | `[4]` | x = 4 |
| 1 | PUSH 10 | `[4, 10]` | |
| 2 | LT | `[true]` | 4 < 10 → true |
| 3 | JMPF 7 | `[]` | pop true → **không** nhảy, PC tiến tới 4 |
| 4 | PUSH 1 | `[1]` | |
| 5 | PRINT | `[]` | **in 1** |
| 6 | JMP 9 | `[]` | nhảy vượt else → PC = 9 |
| 9 | (end) | `[]` | dừng |

In ra **1**. PC không bao giờ chạm lệnh 7-8 (nhánh else). Đường đi: `0→1→2→3→4→5→6→9`.

**Bước 3b — CHẠY với `x = 20` (điều kiện sai):**

| PC | Lệnh | Stack sau | Ghi chú |
| --- | --- | --- | --- |
| 0 | LOAD x | `[20]` | x = 20 |
| 1 | PUSH 10 | `[20, 10]` | |
| 2 | LT | `[false]` | 20 < 10 → false |
| 3 | JMPF 7 | `[]` | pop false → **nhảy** PC = 7 |
| 7 | PUSH 2 | `[2]` | nhảy thẳng vào else |
| 8 | PRINT | `[]` | **in 2** |
| 9 | (end) | `[]` | dừng |

In ra **2**. PC không bao giờ chạm lệnh 4-6 (nhánh then). Đường đi: `0→1→2→3→7→8→9`.

Hai lần chạy, cùng **một** bytecode bất biến, chỉ khác giá trị `x` → khác đường đi → khác kết quả. Đây chính là `if` được "vật chất hóa" thành nhảy.

> **❓ Câu hỏi tự nhiên của người đọc**
>
> - **"Nếu không có `else` thì sao?"** → Bỏ luôn nhánh B và lệnh `JMP Lend`; `JMPF` nhảy thẳng tới `Lend`:
>   ```
>   <c> ; JMPF Lend ; <A> ; Lend:
>   ```
> - **"`if a {..} else if b {..} else {..}` thì sao?"** → `else if` chỉ là một `if` lồng nằm trong nhánh else của `if` ngoài. Sinh đệ quy theo đúng khuôn §3.1, lồng nhau. Mỗi tầng có một cặp `JMPF/JMP` riêng.
> - **"`Lend` của then và `Lelse` có thể trùng địa chỉ không?"** → Khi không có else, `JMPF` và điểm kết thúc then đều trỏ về cùng một `Lend` — hoàn toàn hợp lệ, hai nhãn cùng trỏ một địa chỉ.

> **🔁 Dừng lại tự kiểm tra**
> 1. Trong walk-through 3b (`x=20`), lệnh `PUSH 1` (địa chỉ 4) có chạy không?
> 2. Nếu compiler **quên** sinh `JMP 9` ở địa chỉ 6, chạy `x=4` sẽ in ra gì?
>
> <details><summary>Đáp án</summary>
>
> 1. Không. PC nhảy `3 → 7`, hoàn toàn bỏ qua 4, 5, 6.
> 2. In ra **1** rồi **2**. Sau `PRINT` (in 1), không có JMP nên PC chạy tiếp `7: PUSH 2`, `8: PRINT` (in 2). Chạy cả hai nhánh — đúng lỗi "quên JMP cuối then" ở §3.1.
> </details>

> **📝 Tóm tắt mục 3**
> - Khuôn `if/else`: `<c>; JMPF Lelse; <A>; JMP Lend; Lelse: <B>; Lend:`.
> - `JMPF` rẽ sang else khi điều kiện sai; `JMP Lend` ở cuối then chặn rơi xuống else.
> - Cùng một bytecode, giá trị điều kiện khác → đường PC khác → nhánh chạy khác.
> - Không có else: bỏ `<B>` và `JMP Lend`, `JMPF` trỏ thẳng `Lend`.

## 4. Biên dịch `while`

### 4.1 Khuôn mẫu

```
Lstart: <mã của c>          // tính điều kiện ở ĐẦU mỗi vòng
        JMPF Lend           // sai → thoát vòng
        <mã của B>          // thân vòng
        JMP  Lstart         // QUAY LẠI kiểm tra điều kiện
Lend:   ...                 // sau vòng lặp
```

Khác `if` ở đúng một điểm: cuối thân có `JMP Lstart` **quay ngược lên** thay vì đi tiếp. Chính cú nhảy lùi này tạo ra **vòng**.

> **💡 Trực giác — vòng đu quay**
>
> `while` là một vòng đu quay: mỗi vòng đến cổng soát vé (`<c>` + `JMPF Lend`). Vé hợp lệ (điều kiện đúng) → đi hết một vòng thân rồi `JMP Lstart` đưa bạn về lại cổng. Vé không hợp lệ (điều kiện sai) → `JMPF` cho bạn ra cửa `Lend`, rời khu vui chơi.

> **⚠ Lỗi thường gặp — vòng lặp vô hạn**
>
> Hai cách tự bắn vào chân:
> 1. **Quên `JMP Lstart`** cuối thân → vòng chạy đúng **một lần** rồi rơi xuống `Lend` (thực ra thành `if`, không phải `while`).
> 2. **Thân không bao giờ làm điều kiện thành sai** (vd quên `i = i + 1`) → `<c>` luôn đúng → `JMPF` không bao giờ nhảy → **lặp vô hạn**. Bytecode hoàn toàn hợp lệ; lỗi nằm ở logic. Luôn kiểm tra thân có "tiến về phía dừng" không.

### 4.2 Walk-through đầy đủ: `i = 0; while i < 3 { print(i); i = i + 1 }`

**Bước 1 — sinh mã.** `i` ở slot biến 0. Khởi tạo `i = 0` đứng trước vòng.

```
0: PUSH 0
1: STORE i        // i = 0
   ----- Lstart = 2 -----
2: LOAD i
3: PUSH 3
4: LT             // i < 3 ?
5: JMPF 14        // Lend = 14 ; sai thì thoát
   ----- thân -----
6: LOAD i
7: PRINT          // print(i)
8: LOAD i
9: PUSH 1
10: ADD
11: STORE i        // i = i + 1
12: JMP 2          // quay lại Lstart
   ----- Lend = ... -----
13: ...            // (sau khi sửa đúng: xem chú thích bên dưới)
```

Đếm lại địa chỉ cẩn thận: lệnh cuối của thân là `12: JMP 2`. Lệnh ngay sau là số **13**, nên `Lend = 13`, và `JMPF` ở lệnh 5 phải là `JMPF 13` (không phải 14). Sửa lại:

```
0:  PUSH 0
1:  STORE i
2:  LOAD i         // Lstart
3:  PUSH 3
4:  LT
5:  JMPF 13        // Lend = 13
6:  LOAD i
7:  PRINT
8:  LOAD i
9:  PUSH 1
10: ADD
11: STORE i
12: JMP 2          // về Lstart
13: ...            // Lend
```

> (Việc suýt ghi nhầm `Lend = 14` minh họa đúng cái bẫy **off-by-one** ở §2 — phải đếm địa chỉ thật cẩn thận, hoặc dùng backpatching ở §5 để máy tự tính.)

**Bước 2 — CHẠY (đếm vòng).** Theo dõi `i` và đường PC. Mỗi lần kiểm tra điều kiện ở lệnh 5:

| Vòng | i trước kiểm tra | `i < 3` (lệnh 4) | JMPF (lệnh 5) | Hành động thân | i sau |
| --- | --- | --- | --- | --- | --- |
| 1 | 0 | 0 < 3 = true | không nhảy | **in 0**, i←1 | 1 |
| 2 | 1 | 1 < 3 = true | không nhảy | **in 1**, i←2 | 2 |
| 3 | 2 | 2 < 3 = true | không nhảy | **in 2**, i←3 | 3 |
| 4 | 3 | 3 < 3 = false | **nhảy 13** | (thoát) | — |

In ra: **0, 1, 2** (ba dòng). Vòng 4 điều kiện sai → `JMPF 13` thoát. Tổng số lần `JMP 2` (nhảy lùi) = 3, đúng bằng số lần thân chạy.

Chi tiết stack một vòng (vòng 1, i=0) để thấy nhảy lùi:

| PC | Lệnh | Stack sau | i |
| --- | --- | --- | --- |
| 2 | LOAD i | `[0]` | 0 |
| 3 | PUSH 3 | `[0,3]` | 0 |
| 4 | LT | `[true]` | 0 |
| 5 | JMPF 13 | `[]` | 0 (true → không nhảy) |
| 6 | LOAD i | `[0]` | 0 |
| 7 | PRINT | `[]` | 0 (**in 0**) |
| 8 | LOAD i | `[0]` | 0 |
| 9 | PUSH 1 | `[0,1]` | 0 |
| 10 | ADD | `[1]` | 0 |
| 11 | STORE i | `[]` | 1 (i←1) |
| 12 | JMP 2 | `[]` | 1 (**PC quay về 2**) |

Sau lệnh 12, PC = 2 → bắt đầu vòng 2 với i = 1. Vòng tiếp tục cho tới khi `i < 3` sai.

> **❓ Câu hỏi tự nhiên của người đọc**
>
> - **"Sao điều kiện ở ĐẦU vòng (lệnh 2-5) mà không ở cuối?"** → Đây là `while` (kiểm tra trước). Nếu điều kiện sai ngay từ đầu (vd `i` khởi tạo = 5), thân **không chạy lần nào** — PC nhảy `5 → 13` luôn. Đó là đúng ngữ nghĩa `while`.
> - **"`do { } while` (kiểm tra sau) thì sao?"** → Đảo thứ tự: thân trước, điều kiện sau, dùng `JMPT Lstart` quay lại khi điều kiện đúng. Thân chạy **ít nhất một lần**.
> - **"`break` / `continue` biên dịch thế nào?"** → `break` = `JMP Lend` (nhảy ra ngoài vòng). `continue` = `JMP Lstart` (hoặc nhảy tới đoạn cập nhật trong `for`). Cả hai chỉ là một lệnh `JMP` tới nhãn đã có.

> **🔁 Dừng lại tự kiểm tra**
> 1. Nếu khởi tạo `i = 5` thay vì 0, vòng thân chạy mấy lần, in ra gì?
> 2. Lệnh nào tạo ra "vòng" (nhảy lùi)? Nếu xóa nó, chuyện gì xảy ra?
>
> <details><summary>Đáp án</summary>
>
> 1. **0 lần**, không in gì. Lệnh 4: `5 < 3 = false` → lệnh 5 `JMPF 13` nhảy ngay ra ngoài.
> 2. Lệnh `12: JMP 2`. Xóa nó → sau khi in 0 và tăng i, PC chạy thẳng tới 13 (Lend) → thành `if`, chỉ in **0** một lần. (Đúng lỗi "quên JMP Lstart" ở §4.1.)
> </details>

> **📝 Tóm tắt mục 4**
> - Khuôn `while`: `Lstart: <c>; JMPF Lend; <B>; JMP Lstart; Lend:`.
> - Điểm khác `if`: `JMP Lstart` ở cuối thân **nhảy lùi** → tạo vòng.
> - Điều kiện ở đầu → thân có thể chạy 0 lần.
> - Số lần "nhảy lùi" = số lần thân chạy; thân phải tiến về điều kiện-sai, nếu không sẽ lặp vô hạn.

## 5. Backpatching — điền địa chỉ nhảy sau

### 5.1 Vấn đề: nhảy tiến tới đích chưa biết

Sinh bytecode thường đi **một lượt từ trên xuống**. Nhưng nhìn khuôn `if`:

```
<c>
JMPF Lelse     // ← lúc sinh lệnh này, ta CHƯA biết Lelse ở đâu!
<A>            // vì <A> dài bao nhiêu lệnh thì lúc này chưa sinh
JMP  Lend      // ← cũng chưa biết Lend
Lelse: <B>
Lend:
```

Khi sinh `JMPF Lelse`, ta chưa biết `Lelse` = địa chỉ mấy, vì phần `<A>` phía sau còn chưa sinh. Đây là **nhảy tiến (forward jump)** tới một đích chưa xác định.

> **💡 Trực giác — chừa chỗ trống điền sau**
>
> Giống viết thư mời rồi mới biết địa chỉ hội trường: bạn in sẵn "Địa điểm: ____", phát thư đi (sinh `JMPF ____`), ghi nhớ "chỗ trống này cần điền địa chỉ hội trường", và **khi đã chốt hội trường** (sinh xong `<A>`, biết `Lelse`) thì quay lại điền vào mọi chỗ trống đã đánh dấu. "Quay lại điền chỗ trống" = **backpatching**.

### 5.2 Thuật toán

1. Khi sinh một lệnh nhảy tiến mà chưa biết đích: phát ra `JMPF -1` (hoặc `JMPF ?`) với toán hạng tạm, và **ghi nhớ chỉ số của lệnh nhảy đó** vào một danh sách "cần vá".
2. Tiếp tục sinh các lệnh khác.
3. Khi tới đúng vị trí nhãn (biết được địa chỉ thật vì đó là độ dài bytecode hiện tại): **vá (patch)** — sửa toán hạng tạm của mọi lệnh trong danh sách thành địa chỉ thật.

Pseudo-code cho `if/else`:

```
emit(<c>)
jmpf_idx = emit(JMPF, ?)        // chưa biết đích, ghi nhớ jmpf_idx
emit(<A>)
jmp_idx  = emit(JMP, ?)         // chưa biết Lend, ghi nhớ jmp_idx
patch(jmpf_idx, here())         // Lelse = vị trí hiện tại (đầu <B>)
emit(<B>)
patch(jmp_idx, here())          // Lend = vị trí hiện tại (sau <B>)
```

`here()` = số lệnh đã sinh = địa chỉ lệnh kế tiếp sẽ phát. `patch(i, addr)` = `code[i].operand = addr`.

### 5.3 Walk-through backpatching cho `if x < 10 { print(1) } else { print(2) }`

Theo từng bước sinh (cột "code so far" là bytecode đã phát; địa chỉ trong ngoặc):

| Bước | Hành động | Code so far | Danh sách cần vá |
| --- | --- | --- | --- |
| 1 | emit `<c>` | `(0)LOAD x (1)PUSH 10 (2)LT` | — |
| 2 | emit `JMPF ?` → idx 3 | `... (3)JMPF ?` | `{jmpf: 3}` |
| 3 | emit `<A>` | `... (4)PUSH 1 (5)PRINT` | `{jmpf: 3}` |
| 4 | emit `JMP ?` → idx 6 | `... (6)JMP ?` | `{jmpf: 3, jmp: 6}` |
| 5 | **patch jmpf** = here() = 7 | `(3)JMPF 7` | `{jmp: 6}` |
| 6 | emit `<B>` | `... (7)PUSH 2 (8)PRINT` | `{jmp: 6}` |
| 7 | **patch jmp** = here() = 9 | `(6)JMP 9` | — |

Kết quả khớp **chính xác** bytecode đã đánh số tay ở §3.2 (`JMPF 7`, `JMP 9`) — nhưng giờ máy tự tính địa chỉ, không cần đếm tay → không còn off-by-one.

Với `while`, nhãn `Lstart` là **nhảy lùi** (backward jump) — lúc sinh `JMP Lstart` ta **đã biết** `Lstart` (nó nằm trước, đã sinh rồi), nên **không cần backpatch** cho nó. Chỉ `JMPF Lend` (nhảy tiến) cần backpatch.

> **❓ Câu hỏi tự nhiên của người đọc**
>
> - **"Sao không sinh 2 lượt: lượt 1 thu thập nhãn, lượt 2 sinh mã?"** → Được, đó là cách khác (two-pass). Backpatching là kỹ thuật **một lượt (single-pass)** — nhanh hơn, kinh điển trong sách Dragon Book. Cả hai đều đúng.
> - **"Nếu có nhiều `break` cùng nhảy tới một `Lend`?"** → Gom tất cả vào **một danh sách**, khi biết `Lend` thì vá hết một lượt. Đây là lý do "danh sách cần vá" chứ không phải một biến đơn.

> **🔁 Dừng lại tự kiểm tra**
> 1. Nhảy nào trong `while` cần backpatch, nhảy nào không?
> 2. `here()` trả về gì ngay sau khi emit `<A>` (2 lệnh) ở §5.3?
>
> <details><summary>Đáp án</summary>
>
> 1. `JMPF Lend` (nhảy tiến, đích chưa sinh) **cần** backpatch. `JMP Lstart` (nhảy lùi, đích đã sinh) **không cần**.
> 2. `here() = 6` — đã phát các lệnh 0..5 (6 lệnh), lệnh kế là số 6. (Khớp bước 4 trong bảng.)
> </details>

> **📝 Tóm tắt mục 5**
> - **Nhảy tiến** tới đích chưa sinh → phát toán hạng tạm `?`, ghi nhớ vị trí.
> - Khi tới nhãn (biết địa chỉ = `here()`) → **vá** toàn bộ lệnh đã ghi nhớ.
> - `while`: chỉ `JMPF Lend` cần vá; `JMP Lstart` nhảy lùi nên không.
> - Backpatching là kỹ thuật single-pass, loại bỏ việc đếm địa chỉ bằng tay.

## 6. Control Flow Graph (CFG) & basic block

### 6.1 Basic block là gì?

> **💡 Trực giác — đoạn đường thẳng không lối rẽ**
>
> Một **khối cơ bản (basic block)** là một đoạn lệnh chạy "một mạch": vào từ **đầu duy nhất**, ra ở **cuối duy nhất**, ở giữa **không có lệnh nhảy đi và không có nhãn để nhảy vào**. Như một đoạn đường thẳng không ngã rẽ: đã vào là chạy hết tới cuối.

Quy tắc cắt bytecode thành block — một lệnh là **đầu khối (leader)** nếu:
1. Là lệnh đầu tiên của chương trình, hoặc
2. Là **đích** của một lệnh nhảy (có nhãn trỏ tới), hoặc
3. Là lệnh **ngay sau** một lệnh nhảy (`JMP`/`JMPF`/`JMPT`).

Mỗi leader bắt đầu một block kéo dài tới ngay trước leader kế tiếp.

### 6.2 CFG là gì?

**CFG** = đồ thị có hướng (xem [DataStructures — Graph](../../../DataStructures/03-Advanced/lesson-01-graph/)):
- **Đỉnh (node)** = basic block.
- **Cạnh (edge)** = luồng điều khiển: từ block `X` có cạnh tới block `Y` nếu sau khi chạy hết `X`, điều khiển **có thể** sang `Y` (qua nhảy hoặc fall-through).

CFG nối thẳng vào IR ở [L11](../lesson-01-ir-three-address/): tối ưu hóa (dead-code, constant propagation) đều chạy trên CFG.

### 6.3 CFG của `if/else` (dùng bytecode §3.2)

Bốn block:

```
        ┌─────────────────────┐
        │ B0 (cond)           │
        │ 0: LOAD x           │
        │ 1: PUSH 10          │
        │ 2: LT               │
        │ 3: JMPF 7           │
        └──────┬───────┬──────┘
   true (đi tiếp)│      │ false (JMPF 7)
        ┌────────▼──┐ ┌─▼──────────┐
        │ B1 (then) │ │ B2 (else)  │
        │ 4: PUSH 1 │ │ 7: PUSH 2  │
        │ 5: PRINT  │ │ 8: PRINT   │
        │ 6: JMP 9  │ │            │
        └─────┬─────┘ └─────┬──────┘
              │ JMP 9       │ fall-through
        ┌─────▼─────────────▼──────┐
        │ B3 (end, merge)          │
        │ 9: ...                   │
        └──────────────────────────┘
```

- `B0` có **hai** cạnh ra (đây là điểm rẽ nhánh): tới `B1` (điều kiện đúng, fall-through) và tới `B2` (điều kiện sai, `JMPF`).
- `B1` và `B2` đều có cạnh tới `B3` — `B3` là **điểm hợp nhất (merge point)**, có hai cạnh vào.
- Hình dạng "kim cương" (diamond) này là chữ ký nhận diện của `if/else` trong mọi CFG.

### 6.4 CFG của `while` (dùng bytecode §4.2)

```
        ┌──────────────┐
        │ B0 (init)    │
        │ 0: PUSH 0    │
        │ 1: STORE i   │
        └──────┬───────┘
               ▼
        ┌──────────────┐ ◄──────────┐
        │ B1 (cond)    │            │ JMP 2 (cạnh lùi)
        │ 2: LOAD i    │            │
        │ 3: PUSH 3    │            │
        │ 4: LT        │            │
        │ 5: JMPF 13   │            │
        └──┬────────┬──┘            │
  true(tiếp)│        │ false(JMPF)  │
        ┌───▼──────┐ │              │
        │ B2 (body)│ │              │
        │ 6: LOAD i│ │              │
        │ 7: PRINT │ │              │
        │ ...      │ │              │
        │ 12: JMP 2│─┼──────────────┘
        └──────────┘ │
                     ▼
              ┌──────────────┐
              │ B3 (end)     │
              │ 13: ...      │
              └──────────────┘
```

- **Cạnh lùi (back edge)** `B2 → B1` là dấu hiệu của vòng lặp trong CFG. Một CFG có chu trình (cycle) ⇔ có vòng lặp.
- `B1` có hai cạnh ra: tới `B2` (tiếp tục vòng) và tới `B3` (thoát).
- Phát hiện back edge chính là cách compiler **nhận ra vòng lặp** để tối ưu (loop-invariant code motion, unrolling...).

> **❓ Câu hỏi tự nhiên của người đọc**
>
> - **"Vì sao phải gom thành block mà không xét từng lệnh?"** → Vì trong một block, mọi lệnh chạy cùng số lần, cùng điều kiện — tối ưu hóa xét cả block một lần thay vì từng lệnh, gọn và đúng hơn.
> - **"CFG có chu trình ⇔ có vòng lặp?"** → Gần đúng: back edge (cạnh trỏ về block tổ tiên) tạo chu trình, và đó chính là vòng lặp. `if` không có back edge → CFG của `if` là **DAG** (đồ thị không chu trình).

> **🔁 Dừng lại tự kiểm tra**
> 1. Trong CFG `if`, block nào có **hai cạnh vào**? Vì sao?
> 2. Đặc điểm nào của CFG phân biệt `while` với `if`?
>
> <details><summary>Đáp án</summary>
>
> 1. `B3` (merge). Vì cả nhánh then (`JMP Lend`) và nhánh else (fall-through) đều đổ về nó.
> 2. `while` có **back edge** (cạnh lùi `B2 → B1`) tạo chu trình; `if` là DAG, không chu trình.
> </details>

> **📝 Tóm tắt mục 6**
> - **Basic block** = đoạn lệnh chạy một mạch, vào một đầu ra một cuối.
> - **CFG** = đồ thị có hướng: block là đỉnh, luồng điều khiển là cạnh.
> - `if/else` → CFG hình kim cương (rẽ 2 + merge), là DAG.
> - `while` → CFG có **back edge** (chu trình) = chữ ký của vòng lặp.

## 7. Short-circuit, `for`, và liên hệ rộng hơn

### 7.1 Boolean short-circuit (`&&`, `||`) thành nhánh

`&&` và `||` **không** chỉ là "tính cả hai vế rồi AND/OR" — chúng **rẽ nhánh** (xem bảng chân lý ở [DataFoundations — Boolean Logic](../../../DataFoundations/03-MathFoundations/lesson-02-boolean-logic/)).

`a && b` nghĩa là: nếu `a` đã sai thì **khỏi tính `b`** (kết quả chắc chắn sai). Biên dịch `if a && b { A }`:

```
        <a>
        JMPF Lfalse     // a sai → toàn bộ && sai → bỏ qua A luôn
        <b>
        JMPF Lfalse     // b sai → && sai
        <A>             // tới đây tức cả a lẫn b đều đúng
Lfalse: ...
```

Tương tự `a || b`: nếu `a` đã đúng thì khỏi tính `b` (dùng `JMPT` để nhảy tới nhánh "đúng"). Đây là vì sao `if x != nil && x.field > 0` an toàn — khi `x` là nil, `x.field` **không bao giờ** được tính (`JMPF` đã nhảy qua).

> **⚠ Lỗi thường gặp** — tưởng `&&`/`||` luôn tính cả hai vế. Thực tế vế phải **có thể không chạy**. Nếu vế phải có tác dụng phụ (gọi hàm in ra màn hình, tăng biến), nó có thể không xảy ra.

### 7.2 `for` chỉ là đường vòng của `while`

`for (init; cond; update) { B }` được dịch thành đúng `while` cộng phần init và update đặt đúng chỗ:

```
        <init>
Lstart: <cond>
        JMPF Lend
        <B>
        <update>        // chạy SAU thân, TRƯỚC khi quay lại cond
        JMP  Lstart
Lend:
```

So với `while` ở §4.1: chỉ thêm `<init>` trước vòng và `<update>` cuối thân. Ví dụ `i=0; while i<3 { print i; i=i+1 }` ở §4.2 thực ra **chính là** `for i:=0; i<3; i++ { print i }` đã được khai triển. Hai cú pháp, một CFG.

> **❓ Câu hỏi tự nhiên của người đọc**
>
> - **"`switch` thì sao?"** → Mỗi `case` thành một so sánh + `JMPF` tới case kế (như chuỗi `if/else if`), hoặc với case dày đặc, dùng **jump table** (một mảng địa chỉ, nhảy gián tiếp theo chỉ số) — nhanh hơn O(1).
> - **"Sao compiler không tính trước hết rồi mới nhảy?"** → Vì short-circuit là **ngữ nghĩa bắt buộc** của ngôn ngữ (C, Go, Java...), không phải tối ưu tùy chọn. Tính cả hai vế sẽ sai ngữ nghĩa và có thể crash (vd nil dereference).

> **🔁 Dừng lại tự kiểm tra**
> 1. Trong `if x != nil && x.f() { ... }`, khi `x` là nil, `x.f()` có được gọi không?
> 2. `for` khác `while` ở bytecode chỗ nào?
>
> <details><summary>Đáp án</summary>
>
> 1. Không. `<x != nil>` cho false → `JMPF Lfalse` nhảy thẳng, bỏ qua cả phần tính `x.f()`.
> 2. `for` thêm `<init>` trước `Lstart` và `<update>` ở cuối thân (trước `JMP Lstart`). Phần cond + JMPF + JMP giống hệt `while`.
> </details>

> **📝 Tóm tắt mục 7**
> - `&&`/`||` biên dịch thành **nhánh có điều kiện** (short-circuit), không tính cả hai vế.
> - `for` = `while` + `<init>` đầu + `<update>` cuối thân → cùng một CFG.
> - `switch` = chuỗi so sánh + JMPF, hoặc jump table.

## 8. Bài tập

> Quy ước bytecode dùng chung: `PUSH n`, `LOAD x`, `STORE x`, `ADD`, `SUB`, `LT` (a<b), `GE` (a≥b), `EQ`, `PRINT`, `JMP L`, `JMPF L`, `JMPT L`. Địa chỉ đánh số từ 0.

**Bài 1.** Cho bytecode sau, hãy ghi vết PC và stack, cho biết in ra gì:
```
0: PUSH 5
1: PUSH 5
2: EQ
3: JMPF 7
4: PUSH 100
5: PRINT
6: JMP 9
7: PUSH 200
8: PRINT
9: (end)
```

**Bài 2.** (Tự sinh bytecode cho `if`) Biên dịch tay đoạn sau ra bytecode có địa chỉ đầy đủ (không có else):
```
if n >= 18 {
    print(1)
}
print(0)
```

**Bài 3.** (Tự sinh bytecode cho `while`) Biên dịch tay ra bytecode có địa chỉ đầy đủ, rồi ghi bảng đếm vòng:
```
s = 0
i = 1
while i < 4 {
    s = s + i
    i = i + 1
}
print(s)
```

**Bài 4.** (Backpatching) Với đoạn `if n >= 18 { print(1) }` ở Bài 2, hãy lập bảng backpatching từng bước (như §5.3): mỗi bước ghi hành động, code so far, danh sách cần vá. Cho biết `JMPF` cuối cùng được vá thành địa chỉ mấy.

**Bài 5.** (CFG) Vẽ CFG (liệt kê các basic block + cạnh) cho bytecode của Bài 3. Chỉ ra back edge và merge point (nếu có).

**Bài 6.** (Lỗi) Đoạn bytecode dưới đây đáng lẽ là `if c { print(1) } else { print(2) }` nhưng có **một** lỗi. Tìm lỗi, mô tả kết quả sai khi `c` đúng, và sửa:
```
0: <c>
1: JMPF 4
2: PUSH 1
3: PRINT
4: PUSH 2
5: PRINT
6: (end)
```

**Bài 7.** (Short-circuit) Biên dịch `if a && b { print(1) }` ra bytecode dùng `JMPF` (giả sử `a`, `b` đã ở slot biến). Giải thích vì sao khi `a` sai thì `b` không được tính.

## Lời giải chi tiết

### Bài 1

`5 == 5` → true.

| PC | Lệnh | Stack | Ghi chú |
| --- | --- | --- | --- |
| 0 | PUSH 5 | `[5]` | |
| 1 | PUSH 5 | `[5,5]` | |
| 2 | EQ | `[true]` | 5==5 |
| 3 | JMPF 7 | `[]` | pop true → không nhảy |
| 4 | PUSH 100 | `[100]` | |
| 5 | PRINT | `[]` | **in 100** |
| 6 | JMP 9 | `[]` | nhảy vượt else |
| 9 | end | `[]` | |

In ra **100**. (Đường đi: `0→1→2→3→4→5→6→9`, bỏ qua 7-8.)

### Bài 2

`if n >= 18 { print(1) }` không có else → bỏ nhánh else và `JMP Lend`; `JMPF` trỏ thẳng `Lend`. `n` ở slot 0.

```
0: LOAD n
1: PUSH 18
2: GE            // n >= 18 ?
3: JMPF 6        // Lend = 6 ; sai thì bỏ qua print(1)
4: PUSH 1
5: PRINT         // print(1) — chỉ chạy khi n>=18
6: PUSH 0        // Lend ; print(0) chạy MỌI trường hợp
7: PRINT
8: (end)
```

Kiểm tra: `n=20` → GE true → không nhảy → in 1 rồi in 0. `n=5` → GE false → `JMPF 6` → chỉ in 0. Đúng ngữ nghĩa (print(0) ngoài if nên luôn chạy).

### Bài 3

`s` slot 0, `i` slot 1.

```
0:  PUSH 0
1:  STORE s        // s = 0
2:  PUSH 1
3:  STORE i        // i = 1
4:  LOAD i         // Lstart = 4
5:  PUSH 4
6:  LT             // i < 4 ?
7:  JMPF 18        // Lend = 18
8:  LOAD s
9:  LOAD i
10: ADD
11: STORE s        // s = s + i
12: LOAD i
13: PUSH 1
14: ADD
15: STORE i        // i = i + 1
16: JMP 4          // về Lstart
17: (không có — lệnh 16 là cuối thân)
18: LOAD s         // Lend
19: PRINT          // print(s)
20: (end)
```

Đếm địa chỉ: lệnh cuối thân là `16: JMP 4`, lệnh kế là 17... nhưng Lend phải là lệnh `LOAD s` của `print(s)`. Đánh lại liên tục: sau `16: JMP 4`, lệnh kế là **17**, vậy `Lend = 17`, và `JMPF` phải là `JMPF 17`. Sửa:

```
0:  PUSH 0
1:  STORE s
2:  PUSH 1
3:  STORE i
4:  LOAD i         // Lstart
5:  PUSH 4
6:  LT
7:  JMPF 17        // Lend = 17
8:  LOAD s
9:  LOAD i
10: ADD
11: STORE s
12: LOAD i
13: PUSH 1
14: ADD
15: STORE i
16: JMP 4
17: LOAD s         // Lend
18: PRINT
19: (end)
```

Bảng đếm vòng:

| Vòng | i (vào) | `i < 4` | s (vào) | thân: s←s+i, i←i+1 | s (ra) | i (ra) |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 | true | 0 | s=0+1, i=2 | 1 | 2 |
| 2 | 2 | true | 1 | s=1+2, i=3 | 3 | 3 |
| 3 | 3 | true | 3 | s=3+3, i=4 | 6 | 4 |
| 4 | 4 | false | 6 | (thoát) | 6 | 4 |

In ra **6** (= 1+2+3). Số lần `JMP 4` (nhảy lùi) = 3 = số vòng thân chạy.

### Bài 4

Dùng `if n >= 18 { print(1) }` (Bài 2). Không có else nên chỉ có một `JMPF` cần vá (trỏ tới `Lend`).

| Bước | Hành động | Code so far | Cần vá |
| --- | --- | --- | --- |
| 1 | emit `<c>`=`n>=18` | `(0)LOAD n (1)PUSH 18 (2)GE` | — |
| 2 | emit `JMPF ?` → idx 3 | `... (3)JMPF ?` | `{jmpf: 3}` |
| 3 | emit `<A>`=`print(1)` | `... (4)PUSH 1 (5)PRINT` | `{jmpf: 3}` |
| 4 | **patch jmpf** = here() = 6 | `(3)JMPF 6` | — |
| 5 | emit `print(0)` (sau if) | `(6)PUSH 0 (7)PRINT` | — |

`JMPF` được vá thành địa chỉ **6**, khớp với lời giải tay ở Bài 2. `here()` ở bước 4 = 6 vì đã phát 6 lệnh (0..5).

### Bài 5

Áp dụng quy tắc leader vào bytecode Bài 3 (bản đã sửa):
- Leader: lệnh 0 (đầu chương trình); lệnh 4 (đích của `JMP 4`); lệnh 8 (ngay sau `JMPF` ở 7); lệnh 17 (đích của `JMPF 17`).
- (Lệnh ngay sau `JMP 4` là 17, đã là leader nhờ là đích JMPF.)

Bốn block:

| Block | Lệnh | Vai trò |
| --- | --- | --- |
| B0 | 0–3 | init (s=0, i=1) |
| B1 | 4–7 | cond (i<4? + JMPF) |
| B2 | 8–16 | body + JMP 4 |
| B3 | 17–19 | end (print s) |

Cạnh:
- `B0 → B1` (fall-through).
- `B1 → B2` (cond true, fall-through) và `B1 → B3` (cond false, `JMPF 17`).
- `B2 → B1` (`JMP 4`) — **back edge** (cạnh lùi, tạo chu trình = vòng lặp).

Không có merge point kiểu `if` (không có hai nhánh đổ về một). `B1` là **đầu vòng (loop header)** với hai cạnh vào: từ `B0` (lần đầu) và từ `B2` (mỗi vòng) — đây là điểm "tụ" của vòng lặp.

### Bài 6

**Lỗi**: thiếu `JMP Lend` ở cuối nhánh then (giữa lệnh 3 và 4). Bytecode hiện tại:
```
0: <c>
1: JMPF 4
2: PUSH 1
3: PRINT      // ← sau in 1, KHÔNG có JMP, rơi thẳng xuống 4
4: PUSH 2
5: PRINT
6: (end)
```

Khi `c` **đúng**: `JMPF` không nhảy → chạy 2,3 (in 1) → rồi **fall-through** vào 4,5 (in 2). Kết quả sai: **in cả 1 lẫn 2** dù điều kiện đúng. Đúng lỗi "quên JMP cuối then" ở §3.1.

**Sửa** — chèn `JMP` vượt else, dời địa chỉ:
```
0: <c>
1: JMPF 5      // Lelse dời thành 5 (vì chèn thêm 1 lệnh)
2: PUSH 1
3: PRINT
4: JMP 7       // ← thêm: nhảy vượt else, Lend = 7
5: PUSH 2      // Lelse
6: PRINT
7: (end)       // Lend
```

Giờ `c` đúng: in 1 → `JMP 7` → kết thúc (không in 2). `c` sai: `JMPF 5` → in 2. Chuẩn.

### Bài 7

`if a && b { print(1) }`. `a` slot 0, `b` slot 1.

```
0: LOAD a
1: JMPF 7        // a sai → cả && sai → nhảy thẳng Lend (KHÔNG tính b)
2: LOAD b
3: JMPF 7        // b sai → && sai → nhảy Lend
4: PUSH 1        // tới đây: a đúng VÀ b đúng
5: PRINT         // print(1)
6: (Lend... thực ra Lend=7)
7: (end)
```

Đánh lại địa chỉ liền mạch (lệnh 6 không tồn tại, `PRINT` là 5, end là 6):

```
0: LOAD a
1: JMPF 6        // Lend = 6
2: LOAD b
3: JMPF 6        // Lend = 6 (cùng đích — gom 2 JMPF về một Lend)
4: PUSH 1
5: PRINT
6: (end)         // Lend
```

**Vì sao `a` sai thì `b` không tính**: ở lệnh 1, nếu `a` là false thì `JMPF 6` nhảy thẳng tới lệnh 6, **bỏ qua hoàn toàn** lệnh 2 (`LOAD b`) và phần kiểm tra `b`. Đó chính là short-circuit: vế phải `b` chỉ được chạm tới khi `a` đã đúng. Hai lệnh `JMPF` cùng trỏ về một `Lend` (lệnh 6) — minh họa "nhiều nhảy gom về một nhãn" ở §5.

## Tham khảo và bài tiếp theo

- Bài trước: [L13 — Bytecode & Stack VM](../lesson-03-bytecode-stack-vm/) — bộ lệnh nền và mô hình stack.
- Liên quan:
  - [L11 — IR (Three-Address Code)](../lesson-01-ir-three-address/) — CFG ở §6 chạy trên IR.
  - [DataFoundations — Boolean Logic](../../../DataFoundations/03-MathFoundations/lesson-02-boolean-logic/) — nền cho short-circuit §7.
  - [DataStructures — Graph](../../../DataStructures/03-Advanced/lesson-01-graph/) — CFG là đồ thị có hướng; back edge = chu trình.
- Bài tiếp theo: [L15 — Register Allocation & Targets](../lesson-05-register-alloc-targets/) — từ bytecode/CFG xuống mã máy thật: cấp phát thanh ghi, sinh mã cho kiến trúc đích.
- Minh họa tương tác: [visualization.html](./visualization.html) — compiler if/while → bytecode, VM stepper chạy nhảy, và CFG viewer.
</content>
</invoke>
