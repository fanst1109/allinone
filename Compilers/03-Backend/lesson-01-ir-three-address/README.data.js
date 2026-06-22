// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Compilers/03-Backend/lesson-01-ir-three-address/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 11 — Mã trung gian (Intermediate Representation — Three-Address Code)

> **Tier 3 — Back-end: sinh mã & tối ưu.** Đây là bài mở đầu của giai đoạn cuối trong pipeline compiler. Front-end (Tier 1) đã biến text nguồn thành **AST**; Semantics (Tier 2) đã kiểm tra ý nghĩa và chạy thử bằng tree-walking interpreter. Bây giờ ta chuyển sang câu hỏi: **làm sao biến AST thành mã chạy nhanh trên máy thật?** Câu trả lời gần như mọi compiler hiện đại đều chọn: **đi qua một biểu diễn trung gian (Intermediate Representation — IR)**.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Trả lời được **vì sao compiler không dịch thẳng AST → mã máy** mà chèn một (hoặc nhiều) tầng IR ở giữa — và hiểu lập luận **"n + m thay vì n × m"**.
- Hiểu **Three-Address Code (TAC)**: mỗi lệnh tối đa 3 toán hạng dạng \`t = a op b\`, vai trò của **biến tạm (temporary)** \`t1, t2, ...\`.
- Tự tay **dịch một biểu thức / AST sang TAC** bằng duyệt post-order (visitor — đã học ở [L06](../../02-Semantics/lesson-01-ast-visitor/)).
- Phân biệt các **dạng IR**: TAC phẳng, **SSA (Static Single Assignment)**, stack-based vs register-based.
- Đọc/viết **lệnh điều khiển trong IR**: \`label\`, \`goto\`, \`if t goto L\` (preview control flow ở [L14](../lesson-04-control-flow/)).
- Hiểu **Control Flow Graph (CFG)**: chia chương trình thành **basic block** nối bằng cạnh — nền tảng cho mọi thuật toán tối ưu ([L12](../lesson-02-optimization/)).
- Biết IR thật ngoài đời: **LLVM IR**, **JVM bytecode**.

## Kiến thức tiền đề

- [L06 — AST & Visitor pattern](../../02-Semantics/lesson-01-ast-visitor/) — sinh TAC chính là một visitor post-order trên AST.
- [L10 — Hàm & Closures](../../02-Semantics/lesson-05-functions-closures/) — hiểu hàm/biến cục bộ giúp đọc IR có lời gọi hàm.
- [L01 — Tổng quan & Pipeline compiler](../../01-Frontend/lesson-01-overview-pipeline/) — vị trí của IR trong toàn bộ dây chuyền.
- [DataStructures — Graph (đồ thị)](../../../DataStructures/03-Advanced/lesson-01-graph/) — CFG **chính là một đồ thị có hướng**; ta sẽ dùng lại khái niệm đỉnh/cạnh.

---

## 1. Vì sao cần một biểu diễn trung gian?

### 1.1. Câu hỏi mở đầu

> **Compiler đã có AST rồi. Tại sao không viết thẳng một hàm \`astToMachineCode(node)\` dịch luôn AST sang mã máy x86, mà lại còn chèn thêm một bước "mã trung gian" ở giữa?**

Đây không phải câu hỏi tu từ — ta sẽ trả lời đầy đủ ngay trong mục này.

💡 **Trực giác / Hình dung.**
Hãy hình dung bạn phải dịch tài liệu giữa nhiều thứ tiếng: **3 ngôn ngữ nguồn** (Tiếng Việt, Anh, Pháp) sang **3 ngôn ngữ đích** (Nhật, Hàn, Đức). Có hai cách:

- **Cách trực tiếp**: thuê người biết từng cặp — Việt→Nhật, Việt→Hàn, Việt→Đức, Anh→Nhật, ... Tổng cộng cần **3 × 3 = 9** bộ dịch.
- **Cách qua tiếng trung gian**: mọi ngôn ngữ nguồn dịch sang **một ngôn ngữ cầu nối** (ví dụ Esperanto), rồi từ cầu nối dịch ra từng ngôn ngữ đích. Cần **3 + 3 = 6** bộ dịch.

IR chính là "ngôn ngữ cầu nối" đó. Số bộ dịch giảm từ **nhân** xuống **cộng**.

### 1.2. AST gần ngôn ngữ — mã máy gần CPU — cần cái ở giữa

Hai đầu của bài toán ở hai thế giới rất khác nhau:

| | **AST** | **Mã máy (machine code)** |
| --- | --- | --- |
| Hình dạng | Cây lồng nhau, sâu | Danh sách lệnh phẳng, tuần tự |
| Gần với | Cú pháp ngôn ngữ nguồn | Tập lệnh CPU cụ thể |
| Biểu thức \`(2+3)*4\` | Một cây 5 node | Vài lệnh \`mov/add/imul\` trên thanh ghi |
| Phụ thuộc máy? | Không | Có — x86 khác ARM khác RISC-V |
| Số toán hạng/phép | Không giới hạn (cây con bao nhiêu cũng được) | Hạn chế theo kiến trúc |

Nhảy thẳng từ cây lồng nhau (AST) sang lệnh phẳng phụ thuộc CPU là một bước nhảy lớn, trộn lẫn **hai việc khác nhau**: (1) làm phẳng cấu trúc cây, và (2) chọn lệnh CPU cụ thể. IR tách hai việc này ra:

\`\`\`
AST  ──(làm phẳng, độc lập máy)──>  IR  ──(chọn lệnh, phụ thuộc máy)──>  Mã máy
\`\`\`

### 1.3. Lập luận "n + m" (giống LLVM IR)

Giả sử bạn xây một bộ công cụ compiler hỗ trợ:

- **n = 3** ngôn ngữ nguồn: C, Rust, Swift.
- **m = 4** kiến trúc đích: x86-64, ARM64, RISC-V, WebAssembly.

**Không có IR (dịch trực tiếp):** mỗi cặp (nguồn, đích) cần một back-end riêng → **n × m = 3 × 4 = 12** bộ sinh mã. Thêm 1 ngôn ngữ nguồn → phải viết thêm 4 back-end. Thêm 1 kiến trúc → phải viết thêm 3.

**Có IR chung:**
- **n = 3** front-end: mỗi ngôn ngữ nguồn → IR (1 lần mỗi ngôn ngữ).
- **m = 4** back-end: IR → mỗi kiến trúc đích (1 lần mỗi kiến trúc).
- Tổng: **n + m = 3 + 4 = 7** module. Thêm 1 ngôn ngữ → chỉ 1 front-end mới. Thêm 1 kiến trúc → chỉ 1 back-end mới.

Đây **chính xác** là kiến trúc của [LLVM](https://llvm.org/): Clang (C/C++), rustc (Rust), swiftc (Swift) đều sinh ra **LLVM IR**; rồi LLVM back-end dịch IR đó ra x86 / ARM / RISC-V / WASM. Nhờ vậy Rust "miễn phí" chạy được trên mọi kiến trúc mà LLVM hỗ trợ — nhóm Rust không phải viết bộ sinh mã ARM.

### 1.4. IR còn để làm gì nữa? (không chỉ là cầu nối)

Ngoài lý do "n + m", IR phẳng và độc lập máy còn cho ta **một nơi lý tưởng để tối ưu**:

- **Tối ưu độc lập máy** (constant folding \`2+3→5\`, loại bỏ mã chết, common subexpression elimination) viết **một lần** trên IR, áp dụng cho **mọi** ngôn ngữ nguồn và **mọi** kiến trúc đích. Sẽ học kỹ ở [L12 — Optimization](../lesson-02-optimization/).
- IR phẳng dễ phân tích hơn cây: dễ duyệt tuần tự, dễ đánh số lệnh, dễ xây **CFG** (mục 6).

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Vậy IR có làm compiler chậm hơn không?"* — Có thêm một bước biến đổi, nhưng đổi lại tối ưu trên IR làm **mã đích nhanh hơn nhiều**, và phần lớn compiler thực dụng còn dùng **nhiều tầng IR** (high-level IR → mid IR → low IR) chứ không chỉ một.
- *"Interpreter ở L09 đâu cần IR mà vẫn chạy được mà?"* — Đúng. Tree-walking interpreter chạy thẳng trên AST, đơn giản nhưng **chậm** (mỗi lần chạy lại duyệt cây). Khi cần tốc độ, ta **compile xuống IR/bytecode** rồi chạy IR đó — nhanh hơn vì đã làm phẳng và tối ưu sẵn. Bytecode học ở [L13](../lesson-03-bytecode-vm/).
- *"IR có phải là một ngôn ngữ thật, viết ra file được không?"* — LLVM IR có cả dạng text (\`.ll\`) đọc được lẫn dạng nhị phân (\`.bc\`). TAC trong bài này ta biểu diễn bằng text cho dễ học.

⚠ **Lỗi thường gặp.** Nghĩ rằng "IR = assembly". Không. IR **độc lập máy** (không có thanh ghi \`rax\`, không có lệnh \`imul\` cụ thể) và thường có **vô hạn biến tạm** — ngược hẳn assembly vốn bị giới hạn số thanh ghi vật lý. IR ở "cao hơn" assembly một bậc.

📝 **Tóm tắt mục 1.**
- AST gần ngôn ngữ nguồn (cây), mã máy gần CPU (phẳng + phụ thuộc kiến trúc) → cần tầng trung gian.
- IR tách "làm phẳng" khỏi "chọn lệnh CPU".
- Lập luận **n + m thay vì n × m**: n front-end + m back-end thay vì n × m bộ dịch trực tiếp. Đây là kiến trúc LLVM.
- IR còn là nơi viết tối ưu **một lần dùng cho mọi cặp** (nguồn, đích).

🔁 **Dừng lại tự kiểm tra.**
1. Một bộ công cụ hỗ trợ 5 ngôn ngữ nguồn và 6 kiến trúc đích. Cần bao nhiêu module nếu có IR? Nếu không có?
2. Vì sao IR không phải là assembly?

<details><summary>Đáp án</summary>

1. Có IR: \`5 + 6 = 11\` module. Không có IR: \`5 × 6 = 30\` bộ dịch trực tiếp.
2. IR độc lập kiến trúc (không có thanh ghi/lệnh CPU cụ thể) và thường có vô hạn biến tạm; assembly bị ràng buộc bởi tập lệnh và số thanh ghi vật lý của một CPU cụ thể.
</details>

---

## 2. Three-Address Code (TAC)

### 2.1. Định nghĩa

💡 **Trực giác.** Một biểu thức như \`(a + b) * (c - d)\` là cái cây có nhiều tầng. Bộ não CPU thì chỉ làm được **một phép mỗi lần**, kiểu "cộng hai số, cất kết quả đi". TAC ép biểu thức về đúng nhịp đó: **mỗi dòng làm đúng một phép, kết quả cất vào một ô nhớ tạm để dòng sau dùng lại.**

**Three-Address Code (TAC)** là một dạng IR mà **mỗi lệnh có tối đa ba "địa chỉ" (toán hạng)**: dạng phổ biến nhất là

\`\`\`
t = a op b
\`\`\`

trong đó:
- \`a\`, \`b\` là **hai toán hạng nguồn** (hằng số, biến nguồn, hoặc biến tạm).
- \`op\` là **một** toán tử nhị phân (\`+\`, \`-\`, \`*\`, \`/\`, \`<\`, ...).
- \`t\` là **toán hạng đích** — nơi cất kết quả.

→ Ba "địa chỉ" = \`t\`, \`a\`, \`b\`. Vì sao "tối đa ba"? Vì mỗi lệnh chỉ làm **một phép tính cơ bản** — đúng tầm một lệnh CPU thật làm được.

Các biến thể lệnh khác (vẫn ≤ 3 địa chỉ):

| Dạng | Ý nghĩa | Ví dụ |
| --- | --- | --- |
| \`t = a op b\` | phép nhị phân | \`t1 = x + 1\` |
| \`t = op a\` | phép một ngôi (unary) | \`t2 = -t1\` |
| \`t = a\` | gán/copy | \`x = t3\` |
| \`if a relop b goto L\` | rẽ nhánh có điều kiện | \`if t1 < 10 goto L2\` |
| \`goto L\` | nhảy không điều kiện | \`goto L1\` |
| \`param a\` / \`t = call f, n\` | gọi hàm | \`t4 = call max, 2\` |

### 2.2. Biến tạm (temporary)

Khi một biểu thức có nhiều phép, **mỗi kết quả trung gian phải có chỗ cất** — đó là **biến tạm** \`t1, t2, t3, ...\`. Đặc điểm:

- Do compiler **tự sinh ra**, không có trong code nguồn.
- Đánh số tăng dần: gặp phép mới → cấp một temp mới.
- Mỗi temp thường được **gán đúng một lần** (tính chất này sẽ thành nền cho SSA — mục 4).

### 2.3. Walk-through ĐẦY ĐỦ: dịch \`(2 + 3) * 4\`

Đây là ví dụ trục của bài. AST của \`(2 + 3) * 4\`:

\`\`\`
        (*)            <- node nhân (gốc)
       /   \\
     (+)    4          <- node cộng (trái) và hằng 4 (phải)
    /   \\
   2     3
\`\`\`

Ta duyệt **post-order** (xử lý con trước, cha sau — đúng kiểu visitor ở [L06](../../02-Semantics/lesson-01-ast-visitor/)). Quy tắc: **mỗi node "trả về" nơi chứa kết quả của nó**; node lá (hằng/biến) trả về chính nó, node phép tính **phát một lệnh TAC** rồi trả về temp vừa tạo.

Lần theo từng bước:

| Bước | Đang thăm node | Kết quả con trả về | Lệnh TAC phát ra | Node này trả về |
| --- | --- | --- | --- | --- |
| 1 | lá \`2\` | — | (không phát) | \`2\` |
| 2 | lá \`3\` | — | (không phát) | \`3\` |
| 3 | node \`+\` (con: \`2\`, \`3\`) | \`2\`, \`3\` | \`t1 = 2 + 3\` | \`t1\` |
| 4 | lá \`4\` | — | (không phát) | \`4\` |
| 5 | node \`*\` (con: \`t1\`, \`4\`) | \`t1\`, \`4\` | \`t2 = t1 * 4\` | \`t2\` |

**Kết quả TAC:**

\`\`\`
t1 = 2 + 3
t2 = t1 * 4
\`\`\`

Kiểm tra giá trị: \`t1 = 2 + 3 = 5\`, \`t2 = 5 * 4 = 20\`. Biểu thức gốc \`(2+3)*4 = 20\` ✓. Kết quả cuối nằm ở \`t2\` (temp mà node gốc trả về).

Để ý: TAC là **danh sách phẳng**, không còn cây lồng nhau. Thứ tự lệnh chính là thứ tự post-order — đảm bảo mọi temp được **tính trước khi dùng**.

### 2.4. Bốn ví dụ biểu thức → TAC

**Ví dụ 1: \`a + b * c\`** (nhân ưu tiên hơn cộng — đã học ở [L05 Pratt](../../01-Frontend/lesson-05-pratt-precedence/)).

AST: \`+\` có con trái \`a\`, con phải là \`(* b c)\`. Post-order phát:
\`\`\`
t1 = b * c
t2 = a + t1
\`\`\`
Kiểm tra với \`a=1, b=2, c=3\`: \`t1 = 6\`, \`t2 = 1 + 6 = 7\`; \`1 + 2*3 = 7\` ✓.

**Ví dụ 2: \`(a + b) * (c + d)\`** — hai cây con đều là phép cộng.
\`\`\`
t1 = a + b
t2 = c + d
t3 = t1 * t2
\`\`\`
Kiểm tra \`a=1,b=2,c=3,d=4\`: \`t1=3, t2=7, t3=21\`; \`(1+2)*(3+4)=21\` ✓.

**Ví dụ 3: \`-x + y\`** (có toán tử một ngôi).
\`\`\`
t1 = -x
t2 = t1 + y
\`\`\`
Kiểm tra \`x=5,y=2\`: \`t1=-5, t2=-5+2=-3\`; \`-5+2=-3\` ✓.

**Ví dụ 4: \`a * b + a * c\`** (có biểu thức con lặp \`a*...\` — không tối ưu).
\`\`\`
t1 = a * b
t2 = a * c
t3 = t1 + t2
\`\`\`
Kiểm tra \`a=2,b=3,c=4\`: \`t1=6, t2=8, t3=14\`; \`2*3+2*4=14\` ✓. (Tối ưu **common subexpression** có thể nhận ra \`a\` chung nhưng ở đây hai phép nhân khác nhau nên không gộp được — chuyện gộp để dành [L12](../lesson-02-optimization/).)

⚠ **Lỗi thường gặp — "temp nổ".** Người mới hay tưởng mỗi node sinh đúng một temp, nhưng **chỉ node phép tính** mới sinh temp; node lá (hằng, biến) không sinh. Quan trọng hơn: nếu sinh temp **vô tội vạ** (ví dụ cả cho hằng số, hoặc không tái dùng) thì số temp **bùng nổ** — biểu thức 100 phép có thể tạo hàng trăm temp. Đây gọi là **temp explosion / register pressure**: temp nhiều quá thì back-end không đủ thanh ghi vật lý, phải "spill" ra bộ nhớ → chậm. Cách giảm: tái dùng temp khi giá trị cũ đã "chết", và để pha **register allocation** xử lý sau. Trong bài này ta cứ sinh temp mới cho dễ hiểu, nhưng cần biết hậu quả.

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Vì sao đúng 3 địa chỉ, không phải 2 hay 4?"* — 3 là tối thiểu để biểu diễn \`đích = nguồn op nguồn\` đủ tổng quát. Nhiều hơn 3 thì lệnh không còn map gọn xuống lệnh CPU một-phép.
- *"TAC có lưu thật trong file không?"* — Tùy compiler. Trong thực tế TAC thường là cấu trúc trong bộ nhớ (mảng các struct lệnh — gọi là **quadruple** hoặc **triple**), không nhất thiết là text. Text chỉ để con người đọc.

🔁 **Dừng lại tự kiểm tra.**
1. Dịch \`(a - b) * (a - b)\` sang TAC.
2. Trong walk-through \`(2+3)*4\`, temp nào chứa kết quả cuối cùng?

<details><summary>Đáp án</summary>

1.
\`\`\`
t1 = a - b
t2 = a - b
t3 = t1 * t2
\`\`\`
(Ngây thơ tính \`a-b\` hai lần. Tối ưu CSE sẽ dùng lại \`t1\` cho cả hai → \`t2 = t1 * t1\`, học ở L12.)

2. \`t2\` — temp mà node gốc (\`*\`) trả về.
</details>

📝 **Tóm tắt mục 2.**
- TAC: mỗi lệnh ≤ 3 địa chỉ, dạng chính \`t = a op b\`, làm **một** phép.
- Biến tạm \`t1, t2, ...\` do compiler sinh, cất kết quả trung gian, thường gán một lần.
- Dịch biểu thức = duyệt post-order, mỗi phép phát một lệnh và trả về temp.
- Coi chừng **temp explosion** (register pressure).

---

## 3. Sinh TAC từ AST bằng visitor post-order

Quy trình ở mục 2.3 tổng quát hóa thành một hàm đệ quy. Đây **đúng là** [visitor pattern post-order ở L06](../../02-Semantics/lesson-01-ast-visitor/): mỗi node con được "visit" trước, trả về **nơi chứa kết quả** (một *operand*: hằng, biến, hoặc temp), node cha dùng các operand đó để **phát lệnh** và trả về temp mới của mình.

### 3.1. Khung code Go sơ lược

\`\`\`go
// Generator giữ trạng thái: bộ đếm temp + danh sách lệnh đã phát.
type Generator struct {
    tempCount int      // để đặt tên t1, t2, ...
    code      []string // các lệnh TAC theo thứ tự
}

func (g *Generator) newTemp() string {
    g.tempCount++
    return fmt.Sprintf("t%d", g.tempCount)
}

func (g *Generator) emit(line string) {
    g.code = append(g.code, line)
}

// gen duyệt post-order, TRẢ VỀ operand chứa kết quả của node.
func (g *Generator) gen(node Node) string {
    switch n := node.(type) {

    case *NumberLit:                    // node lá: hằng số
        return fmt.Sprintf("%d", n.Value) // trả về chính nó, KHÔNG phát lệnh

    case *Ident:                        // node lá: biến nguồn
        return n.Name                     // trả về tên biến, KHÔNG phát lệnh

    case *Unary:                        // phép một ngôi, vd -x
        a := g.gen(n.Operand)             // visit con trước (post-order)
        t := g.newTemp()
        g.emit(fmt.Sprintf("%s = %s%s", t, n.Op, a))
        return t

    case *Binary:                       // phép nhị phân, vd a + b
        a := g.gen(n.Left)                // 1) visit con TRÁI -> operand
        b := g.gen(n.Right)               // 2) visit con PHẢI -> operand
        t := g.newTemp()                  // 3) cấp temp cho kết quả
        g.emit(fmt.Sprintf("%s = %s %s %s", t, a, n.Op, b)) // 4) phát lệnh
        return t                          // 5) trả temp cho node cha
    }
    panic("node chưa hỗ trợ")
}
\`\`\`

Chạy \`gen\` trên AST của \`(2+3)*4\`:
- \`gen(*)\` gọi \`gen(+)\` → gọi \`gen(2)\` trả \`"2"\`, \`gen(3)\` trả \`"3"\` → phát \`t1 = 2 + 3\`, trả \`"t1"\`.
- rồi \`gen(4)\` trả \`"4"\` → phát \`t2 = t1 * 4\`, trả \`"t2"\`.
- \`g.code = ["t1 = 2 + 3", "t2 = t1 * 4"]\` — khớp y hệt bảng ở 2.3.

⚠ **Lỗi thường gặp.** Visit con **phải** trước khi \`emit\` lệnh của node cha. Nếu lỡ \`emit\` cha trước rồi mới \`gen\` con, thứ tự lệnh sẽ sai — temp bị dùng trước khi tính. Đây là lý do post-order (con trước, cha sau) là bắt buộc, không phải pre-order.

❓ **Câu hỏi tự nhiên.** *"Operand \`a, b\` trả về kiểu string à?"* — Ở đây dùng string cho gọn để học. Compiler thật trả về một kiểu \`Operand\` có tag (Const / Var / Temp) để back-end phân biệt hằng và biến — quan trọng cho tối ưu (vd constant folding chỉ áp dụng khi cả hai operand là Const).

📝 **Tóm tắt mục 3.** Sinh TAC = visitor post-order: lá trả chính nó (không phát lệnh), node phép tính visit con trước → cấp temp → phát lệnh → trả temp. Trạng thái gồm bộ đếm temp và danh sách lệnh.

---

## 4. Các dạng IR

TAC là **một** dạng IR phổ biến, nhưng không phải duy nhất. Hiểu vài dạng giúp đọc IR thật ngoài đời.

### 4.1. SSA — Static Single Assignment

💡 **Trực giác.** Trong code thường, một biến \`x\` bị gán đi gán lại — muốn biết "tại điểm này \`x\` bằng giá trị nào" phải lần ngược xem lần gán gần nhất ở đâu. SSA loại bỏ phiền phức đó bằng quy tắc: **mỗi "biến" được gán đúng MỘT lần.** Gán lại \`x\` lần thứ hai → tạo một tên mới \`x2\`. Nhờ vậy, "tên biến" và "giá trị" trùng làm một — nhìn tên là biết giá trị từ đâu tới.

**Định nghĩa.** **SSA (Static Single Assignment)** là dạng IR trong đó **mỗi biến được gán giá trị đúng một lần** trong toàn bộ chương trình (xét tĩnh, ở mức văn bản code — chữ "static"). Mỗi lần gán mới tạo một **phiên bản (version)** mới.

So sánh trên cùng đoạn code nguồn:
\`\`\`
x = a + b
x = x * 2
y = x + 1
\`\`\`

| TAC thường (biến gán nhiều lần) | SSA (mỗi biến gán 1 lần) |
| --- | --- |
| \`x = a + b\`     | \`x1 = a + b\`  |
| \`x = x * 2\`     | \`x2 = x1 * 2\` |
| \`y = x + 1\`     | \`y1 = x2 + 1\` |

Để ý ở SSA: lệnh thứ 3 dùng \`x2\`, **nhìn là biết ngay** nó dùng kết quả của lệnh 2, không cần phân tích "lần gán \`x\` gần nhất". Đây là lý do SSA làm **tối ưu dễ hơn rất nhiều**: phân tích "giá trị này tới từ đâu" (def-use) trở nên hiển nhiên.

> Lưu ý: bốn ví dụ TAC ở mục 2 dùng temp \`t1, t2, ...\` mỗi cái gán đúng một lần — vậy phần biểu thức **đã sẵn ở dạng SSA**. SSA chỉ khác biệt rõ khi có biến nguồn bị **gán lại nhiều lần** (như \`x\` ở trên) hoặc khi có rẽ nhánh.

⚠ **Lỗi thường gặp — SSA vs TAC.** SSA **không phải** một thứ tách rời TAC. SSA là một **tính chất** (mỗi biến gán 1 lần) mà TAC có thể có hoặc không. "TAC dạng SSA" hoàn toàn hợp lệ và rất phổ biến (LLVM IR chính là **TAC + SSA**). Đừng nghĩ "phải chọn TAC HOẶC SSA".

❓ **Câu hỏi tự nhiên.** *"Nếu có if/else, một biến được gán ở cả hai nhánh thì sao? Sau khi gộp lại nó là \`x1\` hay \`x2\`?"* — SSA giải bằng **hàm φ (phi)**: \`x3 = φ(x1, x2)\` nghĩa là "lấy \`x1\` nếu tới từ nhánh A, \`x2\` nếu tới từ nhánh B". φ-function là phần "khó" của SSA, ta chỉ nêu tên ở đây; chi tiết thuộc về tối ưu nâng cao.

### 4.2. Stack-based vs register-based IR

Hai phong cách tổ chức toán hạng:

**Stack-based** — toán hạng nằm trên một **ngăn xếp ảo**; lệnh lấy toán hạng từ đỉnh stack, đẩy kết quả lại lên. Không cần đặt tên temp. \`(2 + 3) * 4\` thành:
\`\`\`
push 2
push 3
add          ; pop 3, pop 2, push 5
push 4
mul          ; pop 4, pop 5, push 20
\`\`\`
→ **JVM bytecode** và **WebAssembly** đi theo kiểu này. Gọn, dễ sinh, dễ chuyển vận (portable), nhưng khó tối ưu hơn vì toán hạng ẩn trong stack.

**Register-based** — toán hạng là các **thanh ghi ảo / temp có tên** (chính là TAC). \`(2 + 3) * 4\` thành \`t1 = 2 + 3; t2 = t1 * 4\`. → **LLVM IR**, **Lua 5 bytecode**, IR trong hầu hết compiler tối ưu. Lệnh dài hơn nhưng toán hạng hiện rõ → tối ưu dễ.

| | Stack-based | Register-based (TAC) |
| --- | --- | --- |
| Toán hạng | ẩn trên stack | temp/biến có tên, hiện rõ |
| Số lệnh | thường nhiều hơn | thường ít hơn |
| Sinh mã | rất dễ | hơi phức tạp hơn |
| Tối ưu | khó hơn | dễ hơn |
| Ví dụ thật | JVM, WASM, CPython | LLVM IR, Lua 5 |

📝 **Tóm tắt mục 4.**
- SSA = mỗi biến gán đúng 1 lần (tạo version mới khi gán lại) → phân tích def-use hiển nhiên → tối ưu dễ. φ-function nối các nhánh.
- SSA là tính chất, không đối lập TAC; LLVM IR = TAC + SSA.
- Stack-based (JVM, WASM) gọn dễ sinh; register-based (TAC, LLVM IR) dễ tối ưu.

🔁 **Dừng lại tự kiểm tra.**
1. Viết đoạn sau ở dạng SSA: \`s = 0; s = s + a; s = s + b\`.
2. WebAssembly là stack-based hay register-based?

<details><summary>Đáp án</summary>

1. \`s1 = 0; s2 = s1 + a; s3 = s2 + b\`.
2. Stack-based (giống JVM bytecode).
</details>

---

## 5. Lệnh điều khiển trong IR

Biểu thức chỉ là một nửa. Chương trình thật có \`if\`, \`while\`, \`for\` — IR biểu diễn chúng bằng **nhãn (label)** và **lệnh nhảy (jump)**. Đây là preview cho [L14 — Control Flow](../lesson-04-control-flow/); ở đây chỉ cần đọc/hiểu.

### 5.1. Các lệnh nhảy

| Lệnh | Ý nghĩa |
| --- | --- |
| \`L1:\` | **label** — đánh dấu một vị trí, đích để nhảy tới |
| \`goto L1\` | nhảy **vô điều kiện** tới \`L1\` |
| \`if t goto L1\` | nếu \`t\` đúng (≠ 0) thì nhảy tới \`L1\`, ngược lại chạy tiếp lệnh kế |
| \`ifFalse t goto L1\` | biến thể: nhảy khi \`t\` sai |

### 5.2. Dịch \`if\`

Mã nguồn:
\`\`\`
if (x < 10)
    y = 1
\`\`\`
TAC (ý: nếu điều kiện **sai** thì nhảy vượt qua thân):
\`\`\`
    t1 = x < 10
    ifFalse t1 goto L1
    y = 1
L1:
    ... (lệnh tiếp theo)
\`\`\`

### 5.3. Dịch \`if / else\`

\`\`\`
if (x < 10) y = 1
else        y = 2
\`\`\`
TAC:
\`\`\`
    t1 = x < 10
    ifFalse t1 goto L1
    y = 1               ; thân THEN
    goto L2             ; chạy xong THEN, nhảy vượt ELSE
L1:
    y = 2               ; thân ELSE
L2:
    ...
\`\`\`

### 5.4. Dịch \`while\`

\`\`\`
while (i < n)
    i = i + 1
\`\`\`
TAC:
\`\`\`
L1:                       ; đầu vòng lặp: kiểm tra điều kiện
    t1 = i < n
    ifFalse t1 goto L2    ; sai -> thoát
    i = i + 1             ; thân vòng lặp
    goto L1               ; quay lại kiểm tra
L2:
    ...
\`\`\`

→ Để ý mọi cấu trúc điều khiển cấp cao (\`if\`, \`while\`, \`for\`, \`switch\`) đều **quy về** label + nhảy điều kiện/vô điều kiện. IR phẳng không có "khối lồng nhau" — chỉ có dòng lệnh và nhãn.

📝 **Tóm tắt mục 5.** Điều khiển trong IR = \`label\` + \`goto\` + \`if/ifFalse t goto L\`. Gán/copy là \`x = t\`. Mọi \`if/while/for\` biên dịch về cùng vài primitive này.

---

## 6. Control Flow Graph (CFG)

### 6.1. Basic block

💡 **Trực giác.** Một đoạn lệnh chạy "một mạch" — vào từ đầu, ra ở cuối, **không rẽ ngang giữa chừng** — thì cứ coi như một cục liền khối. Cứ chỗ nào có nhánh (label hoặc goto) là ranh giới cắt thành cục mới.

**Định nghĩa.** **Basic block** là một **chuỗi lệnh tối đa** sao cho:
- Điều khiển chỉ **vào ở lệnh đầu tiên** (không nhảy vào giữa block).
- Điều khiển chỉ **ra ở lệnh cuối cùng** (không có nhảy/dừng ở giữa).

Tức là: một khi đã vào block thì **chắc chắn** chạy hết mọi lệnh trong nó, theo đúng thứ tự, không bỏ sót.

⚠ **Lỗi thường gặp — ranh giới basic block.** Quy tắc cắt block (tìm các **leader** — lệnh bắt đầu một block):
1. Lệnh **đầu tiên** của chương trình là leader.
2. Mọi lệnh **mang label / là đích của một nhảy** là leader.
3. Mọi lệnh **ngay sau** một lệnh nhảy (\`goto\`, \`if ... goto\`) là leader.
Một block kéo dài từ một leader tới ngay trước leader kế tiếp. Sai lầm hay gặp: quên rằng **lệnh sau một \`goto\`** bắt đầu block mới dù không có label rõ ràng.

### 6.2. Control Flow Graph

**Control Flow Graph (CFG)** là một **đồ thị có hướng** (xem lại [DataStructures — Graph](../../../DataStructures/03-Advanced/lesson-01-graph/)):
- **Đỉnh (node)** = các basic block.
- **Cạnh (edge)** \`A → B\` = "sau khi chạy xong block A, điều khiển **có thể** chuyển sang block B".

Một block kết thúc bằng:
- nhảy vô điều kiện \`goto B\` → một cạnh tới B.
- nhảy có điều kiện \`if t goto B\` → **hai** cạnh: tới B (điều kiện đúng) và tới block kế tiếp (điều kiện sai).
- không nhảy (rơi xuống — fall-through) → một cạnh tới block ngay dưới.

### 6.3. Ví dụ: CFG của một vòng while

Lấy lại TAC vòng \`while (i < n) { i = i + 1 }\` từ mục 5.4, kèm một lệnh khởi tạo và một lệnh sau vòng:
\`\`\`
        i = 0              ; (B0)
L1:     t1 = i < n         ; (B1)  <- leader: có label
        ifFalse t1 goto L2
        i = i + 1          ; (B2)  <- leader: ngay sau lệnh nhảy
        goto L1
L2:     print i            ; (B3)  <- leader: có label
\`\`\`

Chia thành 4 basic block và nối cạnh:

\`\`\`
        ┌──────────┐
        │  B0      │  i = 0
        │  i = 0   │
        └────┬─────┘
             │ (rơi xuống)
             v
        ┌──────────┐
   ┌───>│  B1      │  t1 = i < n ; ifFalse t1 goto L2
   │    └──┬────┬──┘
   │       │    │ t1 sai (thoát)
   │ t1 đúng    └──────────┐
   │       v               v
   │  ┌──────────┐    ┌──────────┐
   │  │  B2      │    │  B3      │  print i
   │  │  i=i+1   │    └──────────┘
   │  │  goto L1 │
   │  └────┬─────┘
   └───────┘ (quay lại B1)
\`\`\`

Các cạnh: \`B0 → B1\` (fall-through), \`B1 → B2\` (điều kiện đúng), \`B1 → B3\` (điều kiện sai, thoát vòng), \`B2 → B1\` (quay lại đầu vòng — **cạnh ngược tạo nên vòng lặp**).

> Cạnh ngược \`B2 → B1\` tạo một **chu trình (cycle)** trong đồ thị — đó chính là dấu hiệu của vòng lặp. Phát hiện chu trình trong CFG là cách compiler "nhận ra" đâu là loop để tối ưu (đưa tính toán bất biến ra ngoài vòng — **loop-invariant code motion**, [L12](../lesson-02-optimization/)).

### 6.4. Vì sao cần CFG?

CFG là **cấu trúc dữ liệu nền** cho gần như mọi phân tích/tối ưu:
- **Loại bỏ mã chết (dead code elimination)**: block không có cạnh nào trỏ tới = không bao giờ chạy → bỏ.
- **Dataflow analysis**: lan truyền thông tin (biến nào "sống", hằng nào lan được) dọc theo các cạnh.
- **Phát hiện vòng lặp**: tìm chu trình để áp tối ưu loop.

Đây đều là nội dung của [L12 — Optimization](../lesson-02-optimization/). Ở bài này chỉ cần: **CFG = đồ thị các basic block.**

📝 **Tóm tắt mục 6.**
- Basic block = chuỗi lệnh chạy một mạch, vào đầu/ra cuối; ranh giới tại các **leader**.
- CFG = đồ thị có hướng, đỉnh là block, cạnh là luồng điều khiển khả dĩ.
- Nhảy điều kiện tạo 2 cạnh; cạnh ngược = vòng lặp.
- CFG là nền cho mọi tối ưu (L12).

🔁 **Dừng lại tự kiểm tra.**
1. Trong CFG ví dụ 6.3, block nào có 2 cạnh đi ra? Vì sao?
2. Một block kết thúc bằng \`goto L5\`. Lệnh ngay sau nó (không có label) có là leader không?

<details><summary>Đáp án</summary>

1. \`B1\` — vì nó kết thúc bằng \`ifFalse t1 goto L2\`: một cạnh khi điều kiện sai (tới B3) và một cạnh khi đúng (rơi xuống B2).
2. Có. Theo quy tắc 3 (lệnh ngay sau một nhảy là leader), nó bắt đầu một block mới — dù không có nhảy nào tới nó thì block đó là **dead code**.
</details>

---

## 7. IR ngoài đời: nó dùng vào đâu trong pipeline?

Vị trí của IR trong toàn bộ dây chuyền (nối lại [L01 Pipeline](../../01-Frontend/lesson-01-overview-pipeline/)):

\`\`\`
nguồn → [Lexer] → [Parser] → AST → [kiểm tra ngữ nghĩa] → IR ──┬──> [Tối ưu trên IR]  (L12)
                                                                 └──> [Sinh mã]:
                                                                       • bytecode + VM  (L13)
                                                                       • mã máy native
\`\`\`

- **IR là đầu vào của tối ưu** — mọi biến đổi cải thiện mã ([L12](../lesson-02-optimization/)) làm việc trên IR + CFG, không phải trên AST hay text.
- **IR là đầu vào của sinh mã** — back-end dịch IR sang bytecode (chạy trên VM, [L13](../lesson-03-bytecode-vm/)) hoặc mã máy native.

### 7.1. Hai IR thật bạn sẽ gặp

**LLVM IR** (register-based + SSA — đúng những gì học ở mục 2 & 4). Đoạn \`(2+3)*4\` (đã constant-fold sẵn) trông như:
\`\`\`llvm
%t1 = add i32 2, 3      ; t1 = 2 + 3
%t2 = mul i32 %t1, 4    ; t2 = t1 * 4
\`\`\`
→ Y hệt TAC của ta, chỉ thêm tiền tố \`%\` cho temp và kiểu \`i32\`. Clang, rustc, swiftc đều sinh ra IR này.

**JVM bytecode** (stack-based). \`(2+3)*4\`:
\`\`\`
iconst_2     ; đẩy 2
iconst_3     ; đẩy 3
iadd         ; cộng -> 5 trên đỉnh stack
iconst_4     ; đẩy 4
imul         ; nhân -> 20
\`\`\`
→ Không có temp; toán hạng nằm trên stack. Đây là dạng IR mà Java/Kotlin/Scala compile xuống, rồi JVM chạy.

📝 **Tóm tắt mục 7.** IR là bản lề: front-end sinh ra nó, **tối ưu** (L12) và **sinh mã** (L13/native) tiêu thụ nó. LLVM IR (register/SSA) và JVM bytecode (stack-based) là hai IR thật phổ biến.

---

## 8. Bài tập

**Bài 1.** Dịch biểu thức \`a * b + c * d\` sang TAC. Vẽ AST rồi liệt kê post-order.

**Bài 2.** Dịch \`(a + b) * (c - d) / e\` sang TAC. Kiểm tra với \`a=1, b=2, c=5, d=1, e=2\`.

**Bài 3.** Cho AST sau (viết dạng lồng), **tự dịch sang TAC** bằng duyệt post-order, ghi rõ từng bước (node nào trả về gì, lệnh nào phát ra):
\`\`\`
        (-)
       /   \\
     (*)    (+)
    /   \\   /   \\
   x     2 y     3
\`\`\`
(tức biểu thức \`x * 2 - (y + 3)\`).

**Bài 4.** Viết lại đoạn TAC sau ở **dạng SSA**:
\`\`\`
n = a + 1
n = n * b
m = n - a
n = m + 1
\`\`\`

**Bài 5.** Dịch đoạn điều khiển sau sang TAC (dùng \`label\`, \`goto\`, \`ifFalse ... goto\`):
\`\`\`
if (a > b)
    max = a
else
    max = b
\`\`\`

**Bài 6.** Cho đoạn TAC dưới đây, **chia thành các basic block** (chỉ ra leader của mỗi block) và **vẽ CFG** (đỉnh + cạnh):
\`\`\`
        x = 0
L1:     t1 = x < 5
        ifFalse t1 goto L2
        x = x + 1
        goto L1
L2:     y = x
\`\`\`

**Bài 7.** (Stack-based) Viết \`(a + b) * c\` ở dạng **stack-based** (push/add/mul) giống JVM bytecode. So sánh số lệnh với dạng TAC.

## Lời giải chi tiết

### Bài 1

\`a * b + c * d\`. AST: gốc \`+\`, con trái \`(* a b)\`, con phải \`(* c d)\`.

Post-order: thăm \`(* a b)\` trước → thăm \`(* c d)\` → thăm \`+\`.
\`\`\`
t1 = a * b      ; con trái
t2 = c * d      ; con phải
t3 = t1 + t2    ; gốc
\`\`\`
Kiểm tra \`a=2,b=3,c=4,d=5\`: \`t1=6, t2=20, t3=26\`; \`2*3 + 4*5 = 26\` ✓.

### Bài 2

\`(a + b) * (c - d) / e\`. Theo độ ưu tiên, \`*\` và \`/\` cùng cấp, kết hợp trái → \`((a+b)*(c-d)) / e\`. AST gốc \`/\`, con trái \`(* (+ a b) (- c d))\`, con phải \`e\`.

Post-order:
\`\`\`
t1 = a + b
t2 = c - d
t3 = t1 * t2
t4 = t3 / e
\`\`\`
Kiểm tra \`a=1,b=2,c=5,d=1,e=2\`: \`t1=3, t2=4, t3=12, t4=6\`; \`(1+2)*(5-1)/2 = 3*4/2 = 6\` ✓.

### Bài 3

Biểu thức \`x * 2 - (y + 3)\`. AST gốc \`-\`, con trái \`(* x 2)\`, con phải \`(+ y 3)\`. Duyệt post-order, theo từng bước (giống bảng 2.3):

| Bước | Node | Con trả về | Lệnh phát | Trả về |
| --- | --- | --- | --- | --- |
| 1 | lá \`x\` | — | — | \`x\` |
| 2 | lá \`2\` | — | — | \`2\` |
| 3 | \`*\` | \`x\`, \`2\` | \`t1 = x * 2\` | \`t1\` |
| 4 | lá \`y\` | — | — | \`y\` |
| 5 | lá \`3\` | — | — | \`3\` |
| 6 | \`+\` | \`y\`, \`3\` | \`t2 = y + 3\` | \`t2\` |
| 7 | \`-\` (gốc) | \`t1\`, \`t2\` | \`t3 = t1 - t2\` | \`t3\` |

TAC:
\`\`\`
t1 = x * 2
t2 = y + 3
t3 = t1 - t2
\`\`\`
Kiểm tra \`x=4, y=1\`: \`t1=8, t2=4, t3=4\`; \`4*2 - (1+3) = 8 - 4 = 4\` ✓. Kết quả ở \`t3\`.

### Bài 4

Mỗi lần biến được gán → tạo version mới; mỗi lần dùng → tham chiếu version **mới nhất hiện hành**.

\`\`\`
n1 = a + 1       ; n gán lần 1 -> n1
n2 = n1 * b      ; dùng n hiện hành (n1), gán mới -> n2
m1 = n2 - a      ; dùng n2, m gán lần 1 -> m1
n3 = m1 + 1      ; dùng m1, n gán lần 3 -> n3
\`\`\`
\`a\`, \`b\` không bị gán lại nên giữ nguyên (có thể coi là \`a1, b1\` nếu muốn nhất quán). Sau biến đổi, mỗi tên (\`n1, n2, n3, m1\`) được gán **đúng một lần** → đạt SSA.

### Bài 5

Điều kiện sai → nhảy sang nhánh else; chạy xong then phải nhảy vượt else.
\`\`\`
    t1 = a > b
    ifFalse t1 goto L1
    max = a              ; nhánh THEN
    goto L2
L1: max = b              ; nhánh ELSE
L2: ...
\`\`\`
Kiểm tra \`a=7, b=3\`: \`t1\` đúng → không nhảy → \`max = a = 7\` → \`goto L2\` (bỏ qua else). \`a=2, b=9\`: \`t1\` sai → nhảy L1 → \`max = b = 9\` ✓.

### Bài 6

Tìm **leader** theo 3 quy tắc:
- \`x = 0\` — leader (lệnh đầu chương trình). [quy tắc 1]
- \`L1: t1 = x < 5\` — leader (có label / là đích \`goto L1\`). [quy tắc 2]
- \`x = x + 1\` — leader (ngay sau lệnh nhảy \`ifFalse ... goto L2\`). [quy tắc 3]
- \`L2: y = x\` — leader (có label / đích \`goto L2\`). [quy tắc 2]

Bốn basic block:
\`\`\`
B0: x = 0
B1: t1 = x < 5 ; ifFalse t1 goto L2
B2: x = x + 1  ; goto L1
B3: y = x
\`\`\`

CFG (cạnh):
- \`B0 → B1\` (fall-through).
- \`B1 → B2\` (điều kiện \`t1\` đúng, rơi xuống) và \`B1 → B3\` (điều kiện sai, \`goto L2\`).
- \`B2 → B1\` (\`goto L1\`, cạnh ngược tạo vòng lặp).

\`\`\`
B0 ──> B1 ──(t1 đúng)──> B2
        ^                 │
        │   (sai) ┐       │
        └─────────┘<──────┘  (B2 -> B1)
        │
        └──(t1 sai)──> B3
\`\`\`
\`B2 → B1\` là cạnh ngược → có vòng lặp (đúng vì nguồn là một while loop).

### Bài 7

\`(a + b) * c\` dạng stack-based:
\`\`\`
push a
push b
add          ; pop b, pop a, push (a+b)
push c
mul          ; pop c, pop (a+b), push ((a+b)*c)
\`\`\`
**5 lệnh.** Dạng TAC:
\`\`\`
t1 = a + b
t2 = t1 * c
\`\`\`
**2 lệnh** nhưng mỗi lệnh có 3 toán hạng hiện rõ. Stack-based nhiều lệnh hơn (mỗi push/pop là một lệnh) nhưng mỗi lệnh ngắn (0–1 toán hạng) và không cần đặt tên temp — đánh đổi gọn-gàng-sinh-mã (stack) lấy dễ-tối-ưu (register/TAC).

---

## Tham khảo và bài tiếp theo

- Bài trước: [L10 — Hàm & Closures](../../02-Semantics/lesson-05-functions-closures/) (kết thúc Tier 2 — Semantics).
- **Bài tiếp theo: [L12 — Optimization (tối ưu trên IR)](../lesson-02-optimization/)** — constant folding, dead code elimination, common subexpression elimination, loop-invariant code motion; tất cả làm việc trên **TAC + CFG** học ở bài này.
- Liên quan:
  - [L06 — AST & Visitor](../../02-Semantics/lesson-01-ast-visitor/) — nền cho bộ sinh TAC post-order.
  - [L13 — Bytecode & VM](../lesson-03-bytecode-vm/) — sinh bytecode (một dạng IR stack-based) và máy ảo chạy nó.
  - [L14 — Control Flow](../lesson-04-control-flow/) — đào sâu \`goto\`/\`if\`/loop và CFG.
  - [DataStructures — Graph](../../../DataStructures/03-Advanced/lesson-01-graph/) — CFG là đồ thị có hướng.
- IR thật: [LLVM Language Reference](https://llvm.org/docs/LangRef.html) (LLVM IR), JVM bytecode (JVM Specification, chương "The Java Virtual Machine Instruction Set").
- Minh họa tương tác: [visualization.html](./visualization.html) — (1) AST → TAC generator nhập biểu thức tự sinh code từng bước, (2) CFG viewer cho chương trình có if/while, (3) so sánh TAC vs SSA.
</content>
</invoke>
`;
