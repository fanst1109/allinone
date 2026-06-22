# Compilers — Trình biên dịch

Lĩnh vực này dạy **"ngôn ngữ lập trình chạy thế nào"** — mảnh ghép nối liền [Programming](../Programming/), [DataStructures](../DataStructures/), [Algorithms](../Algorithms/) và [OperatingSystems](../OperatingSystems/). Bạn gõ `x = (2 + 3) * 4`; máy chỉ hiểu điện áp 0/1. Compiler (và interpreter) là cây cầu đó.

Tổ chức thành **3 tier × 15 bài**, theo đúng đường ống (pipeline) thật của một trình biên dịch. Xuyên suốt, ta xây một **ngôn ngữ đồ chơi** lớn dần: máy tính biểu thức → có biến → có `if`/`while` → có hàm & closure → biên dịch xuống bytecode chạy trên máy ảo.

## Đường ống (pipeline)

```
source → [Lexer] → tokens → [Parser] → AST → [Semantic] → AST+types
  máy chạy ← [CodeGen] ← IR ← [Optimizer] ← IR ← ─────────┘
```

- **Front-end** (Tier 1–2): phụ thuộc ngôn ngữ — lexer, parser, kiểm tra ngữ nghĩa, thông dịch.
- **Back-end** (Tier 3): phụ thuộc máy — IR, tối ưu, sinh mã. Nhờ IR chung, *n* ngôn ngữ × *m* máy chỉ cần *n + m* phần (ý tưởng LLVM).

## Mục tiêu

- Hiểu mọi trạm: **lexer** (chuỗi → token), **parser** (token → AST, recursive-descent & Pratt), **semantic** (scope, type checking).
- Tự viết **tree-walking interpreter** cho ngôn ngữ đồ chơi: gán, `if`, `while`, hàm, closure.
- Hiểu **back-end**: IR three-address, các phép **tối ưu**, biên dịch xuống **bytecode** chạy trên **stack VM**, sinh mã điều khiển luồng, **cấp phát thanh ghi** & target (native/WASM).

## Các tier

| Tier | Liên kết | Theme | Số bài |
|------|----------|-------|--------|
| 1 — Front-end | [01-Frontend](./01-Frontend/) | Mã nguồn → AST | 5 |
| 2 — Semantics & Interpretation | [02-Semantics](./02-Semantics/) | Hiểu nghĩa & chạy cây | 5 |
| 3 — Back-end | [03-Backend](./03-Backend/) | Sinh mã & tối ưu | 5 |

## Danh sách bài học

### Tier 1 — Front-end ([01-Frontend](./01-Frontend/))

| # | Bài | Chủ đề |
|---|-----|--------|
| 01 | [Tổng quan & Pipeline](./01-Frontend/lesson-01-overview-pipeline/) | Compiler vs interpreter vs JIT, các trạm pipeline, front-end/back-end |
| 02 | [Lexer / Tokenizer](./01-Frontend/lesson-02-lexer/) | Token, DFA/regex, maximal munch, keyword vs identifier, lexical error |
| 03 | [Grammar & CFG](./01-Frontend/lesson-03-grammar-cfg/) | Văn phạm phi ngữ cảnh, BNF, derivation, nhập nhằng, ưu tiên & kết hợp |
| 04 | [Recursive-Descent Parser](./01-Frontend/lesson-04-recursive-descent-parser/) | Mỗi non-terminal một hàm, khử đệ quy trái, token → AST, syntax error |
| 05 | [Pratt Parsing](./01-Frontend/lesson-05-pratt-precedence/) | Precedence climbing, binding power, trái/phải kết hợp |

### Tier 2 — Semantics & Interpretation ([02-Semantics](./02-Semantics/))

| # | Bài | Chủ đề |
|---|-----|--------|
| 06 | [AST & Visitor](./02-Semantics/lesson-01-ast-visitor/) | AST vs parse tree, thiết kế node, duyệt cây, visitor pattern |
| 07 | [Symbol Table & Scope](./02-Semantics/lesson-02-symbol-table-scope/) | Bảng ký hiệu, lexical vs dynamic scope, scope chain, shadowing |
| 08 | [Type Checking](./02-Semantics/lesson-03-type-checking/) | Hệ thống kiểu, static vs dynamic, type rules bottom-up, coercion |
| 09 | [Tree-Walking Interpreter](./02-Semantics/lesson-04-tree-walking-interpreter/) | eval(node, env), statement vs expression, if/while, runtime error |
| 10 | [Functions & Closures](./02-Semantics/lesson-05-functions-closures/) | Gọi hàm & environment, call stack, đệ quy, closure (captured env) |

### Tier 3 — Back-end ([03-Backend](./03-Backend/))

| # | Bài | Chủ đề |
|---|-----|--------|
| 11 | [IR (Three-Address)](./03-Backend/lesson-01-ir-three-address/) | Mã trung gian three-address, sinh từ AST, SSA, basic block & CFG |
| 12 | [Optimization](./03-Backend/lesson-02-optimization/) | Constant folding/propagation, dead code, CSE, algebraic, strength reduction |
| 13 | [Bytecode & Stack VM](./03-Backend/lesson-03-bytecode-stack-vm/) | Bytecode, máy ảo ngăn xếp, compile AST → bytecode, fetch-decode-execute |
| 14 | [Control Flow Codegen](./03-Backend/lesson-04-control-flow-codegen/) | if/while → JMP/JMPF + label, backpatching, control flow graph |
| 15 | [Register Allocation & Targets](./03-Backend/lesson-05-register-alloc-targets/) | Liveness, graph coloring, spilling; native/WASM/JVM, AOT vs JIT |

## Cách học

- **Học tuần tự** L01 → L15: mỗi bài dựa trên bài trước; ngôn ngữ đồ chơi lớn dần.
- **Mốc "aha"**: [L09 Tree-Walking Interpreter](./02-Semantics/lesson-04-tree-walking-interpreter/) — ngôn ngữ tự xây CHẠY ra kết quả; [L13 Bytecode & Stack VM](./03-Backend/lesson-03-bytecode-stack-vm/) — thấy stack push/pop thực thi từng lệnh.
- **Bỏ qua nếu đã biết**: quen lexer/parser → nhảy Tier 2; quen interpreter → nhảy Tier 3.

## Kiến thức tiền đề

| Cần biết | Lấy ở đâu |
|----------|-----------|
| Cây, duyệt cây | [DataStructures — Tree](../DataStructures/02-Intermediate/lesson-01-tree/) |
| Ngăn xếp (call stack, VM) | [DataStructures — Stack](../DataStructures/01-Basic/lesson-04-stack/) |
| Hash map (symbol table) | [DataStructures — Hash Table](../DataStructures/01-Basic/lesson-06-hash-table/) |
| Đệ quy & quy nạp | [DataFoundations — Proof & Induction](../DataFoundations/03-MathFoundations/lesson-05-proof-induction/) |
| Đồ thị (CFG, graph coloring) | [DataStructures — Graph](../DataStructures/03-Advanced/lesson-01-graph/) |
| Stack frame, bộ nhớ | [OperatingSystems](../OperatingSystems/) |

## Liên hệ tới các lĩnh vực dùng tới

| Bài Compilers | Dùng ở đâu |
|---------------|------------|
| Lexer, automata | [Algorithms](../Algorithms/) (string, state machine), [DataFoundations](../DataFoundations/02-EncodingMemory/lesson-01-character-encoding/) |
| Parser, AST | [Programming](../Programming/), mọi công cụ xử lý cú pháp (linter, formatter) |
| Interpreter, closure | [Programming](../Programming/) (hiểu sâu ngôn ngữ), lập trình hàm |
| IR, optimization | [AI-ML](../AI-ML/) (compiler tensor: XLA, TVM), tối ưu hiệu năng |
| Bytecode VM | [OperatingSystems](../OperatingSystems/) (máy ảo), JVM/Python/WASM |
| Register allocation | [DataStructures](../DataStructures/03-Advanced/lesson-01-graph/) (tô màu đồ thị), [Algorithms](../Algorithms/) |

## Đọc thêm

- *Crafting Interpreters* (Robert Nystrom) — xây interpreter & bytecode VM từ đầu, rất hợp lộ trình này.
- *Compilers: Principles, Techniques, and Tools* (Dragon Book) — kinh điển, sâu về lý thuyết.
- LLVM — hạ tầng compiler thật với IR chung.

## Minh họa tương tác

Mở [index.html](./index.html) ở trình duyệt — mọi visualization HTML standalone, mở `file://` chạy ngay. Mỗi bài có viz tương tác (gõ code → xem token → AST → bytecode → chạy từng bước) và nút "📖 Đọc README" xem lý thuyết ngay trong trang.
