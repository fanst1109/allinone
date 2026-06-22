// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Compilers/01-Frontend/lesson-01-overview-pipeline/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Tổng quan & Pipeline trình biên dịch (compiler pipeline)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Trả lời được câu hỏi cốt lõi: **máy chỉ hiểu 0/1, vậy làm sao một dòng \`x = (2+3)*4\` lại chạy được?**
- Phân biệt rõ **compiler**, **interpreter**, **JIT** — định nghĩa, ví dụ ngôn ngữ thật (C/Go vs Python/JS vs JVM/V8), và bảng so sánh tốc độ / portable / debug.
- Đi theo một biểu thức qua **toàn bộ pipeline**: source → Lexer → tokens → Parser → AST → Semantic → IR → Optimizer → CodeGen → máy chạy. Hiểu mỗi trạm **nhận gì, trả gì, biến đổi gì**.
- Hiểu vì sao chia **front-end** (phụ thuộc ngôn ngữ) và **back-end** (phụ thuộc máy), và vì sao IR chung biến bài toán \`n × m\` thành \`n + m\`.
- Hiểu sơ lược **AST (cây cú pháp trừu tượng)** — vì sao nó mã hóa được độ ưu tiên toán tử.
- Phân loại được lỗi theo giai đoạn: **lexical**, **syntax**, **semantic**, **runtime**.
- Nắm lộ trình ngôn ngữ đồ chơi (toy language) ta sẽ xây xuyên suốt lĩnh vực.

## Kiến thức tiền đề

- [Programming](../../../Programming/) — biết một ngôn ngữ bất kỳ (biến, biểu thức, hàm) là đủ.
- [DataStructures — Tree](../../../DataStructures/02-Intermediate/lesson-01-tree/) — AST là một cây; quen với khái niệm node/con/duyệt cây sẽ giúp ích ở §6.
- [OperatingSystems](../../../OperatingSystems/) — tùy chọn; hiểu "chương trình là tiến trình do CPU thực thi" làm rõ trạm cuối của pipeline.
- [DataFoundations](../../../DataFoundations/) — tùy chọn; biểu diễn nhị phân giúp hiểu "đầu ra cuối là mã máy 0/1".

> 💡 **Bài này là cửa ngõ của cả lĩnh vực.** Mỗi trạm trong pipeline sẽ thành một (hoặc vài) lesson sau. Ở đây ta đi *ngang* qua toàn bộ để có bản đồ; các bài sau đi *sâu* từng trạm.

## 1. Vì sao học — \`x = (2+3)*4\` chạy được bằng cách nào?

> 💡 **Trực giác.** Bạn viết tiếng Việt cho một người chỉ biết tiếng Nhật. Cần một **người phiên dịch** đứng giữa. CPU cũng vậy: nó chỉ "nghe" được những con số nhị phân rất thô (cộng thanh ghi này với thanh ghi kia, nhảy tới địa chỉ nọ). Câu \`x = (2+3)*4\` với nó là vô nghĩa. **Trình biên dịch (compiler) chính là người phiên dịch** giữa ngôn ngữ con người dễ đọc và ngôn ngữ máy 0/1.

CPU của bạn không có mạch điện nào hiểu được dấu ngoặc, dấu \`=\`, hay thứ tự "nhân trước cộng sau". Cái nó có là một tập **lệnh máy (machine instruction)** cực kỳ đơn giản, mỗi lệnh là một chuỗi bit. Ví dụ (giả lập, một kiến trúc đồ chơi):

\`\`\`
PUSH 2        ; đẩy số 2 lên ngăn xếp
PUSH 3        ; đẩy số 3
ADD           ; lấy 2 số trên cùng, cộng → 5
PUSH 4        ; đẩy số 4
MUL           ; nhân 5 * 4 → 20
STORE x       ; lưu 20 vào ô nhớ tên x
\`\`\`

Mỗi dòng trên cuối cùng lại là một con số nhị phân (ví dụ \`ADD\` = \`00000001\`, \`MUL\` = \`00000010\`...). Câu hỏi của cả bài: **bằng quy trình nào** mà chuỗi ký tự \`"x = (2+3)*4"\` (chỉ là text — một dãy byte ASCII) biến thành đúng dãy lệnh trên?

Câu trả lời ngắn: **qua một dây chuyền (pipeline) gồm nhiều trạm**, mỗi trạm làm một việc nhỏ và bàn giao kết quả cho trạm sau. Ta sẽ mổ xẻ từng trạm ở §3, và đến cuối bài bạn sẽ tự tay (trong viz) đẩy biểu thức này chạy hết dây chuyền.

> ❓ **Câu hỏi tự nhiên của người đọc**
> - *"Vì sao không cho CPU hiểu thẳng \`(2+3)*4\` luôn?"* — Vì mạch điện làm việc đó sẽ cực kỳ phức tạp, đắt, và khó thay đổi. Triết lý thiết kế CPU là: phần cứng làm **vài phép cực đơn giản nhưng cực nhanh**, còn việc "dịch từ ngôn ngữ phức tạp" giao cho **phần mềm** (compiler). Phần mềm dễ sửa, phần cứng thì không.
> - *"Compiler có phải là một chương trình không?"* — Đúng. \`gcc\`, \`go\`, \`javac\` đều là các chương trình bình thường, đầu vào là file text, đầu ra là file khác (mã máy / bytecode). Bản thân compiler cũng được viết bằng một ngôn ngữ rồi… biên dịch ra (xem câu hỏi bootstrapping ở §8).

> 📝 **Tóm tắt §1.** CPU chỉ hiểu lệnh máy nhị phân rất thô. Compiler là cây cầu phần mềm biến text dễ đọc thành dãy lệnh đó, thông qua một pipeline nhiều trạm.

## 2. Compiler vs Interpreter vs JIT

Có ba cách phổ biến để "làm cho code chạy". Mỗi cách trả lời câu hỏi *"khi nào thì dịch?"* khác nhau.

### 2.1. Compiler (trình biên dịch)

- **(a) Là gì.** Một chương trình **dịch toàn bộ source code thành mã máy MỘT LẦN, trước khi chạy**. Kết quả là một file thực thi (executable) chứa lệnh máy; sau đó CPU chạy thẳng file đó, không cần compiler nữa.
- **(b) Vì sao tồn tại.** Để chạy **nhanh nhất có thể**: việc dịch (tốn thời gian) làm một lần lúc build; lúc chạy chỉ còn lệnh máy thuần. Hợp với phần mềm cần tốc độ và phân phối dạng binary (game, hệ điều hành, công cụ CLI).
- **(c) Ví dụ số.** Dịch \`x = (2+3)*4\` mất, giả sử, 50 ms (làm 1 lần). Sau đó mỗi lần chạy chỉ tốn ~0.000001 ms. Chạy 1 triệu lần: \`50 ms (dịch) + 1tr × 0.000001 ms ≈ 51 ms\`. Phần dịch được "khấu hao" về gần 0.
- **(d) Ví dụ ngôn ngữ.** **C, C++, Go, Rust, Swift** — biên dịch thẳng ra mã máy (native). Đầu ra: \`a.out\`, \`program.exe\`, binary Go.

### 2.2. Interpreter (trình thông dịch)

- **(a) Là gì.** Một chương trình **đọc source và thực thi trực tiếp, từng phần một, ngay trong lúc chạy** — không sinh ra file mã máy đứng riêng. Mỗi lần chạy là một lần "đọc-và-làm".
- **(b) Vì sao tồn tại.** Để **linh hoạt và khởi động nhanh**: sửa code xong chạy ngay, không có bước build. Dễ làm tính năng động (eval, gõ lệnh tương tác — REPL). Hợp với scripting, prototyping, notebook.
- **(c) Ví dụ số.** Không có chi phí dịch trả trước, nhưng **mỗi lần** gặp \`x = (2+3)*4\` interpreter phải phân tích lại rồi mới làm, tốn ~0.001 ms/lần. Chạy 1 triệu lần: \`1tr × 0.001 ms = 1000 ms\` — chậm hơn compiled nhiều khi lặp lớn, nhưng chạy 1 lần thì khởi động tức thì.
- **(d) Ví dụ ngôn ngữ.** **Python (CPython), Ruby (MRI), PHP, JavaScript thuần** (trước khi có JIT), shell script Bash.

> ⚠ **Hiểu nhầm rất phổ biến #1: "interpreter không hề compile gì cả".**
> Sai. Hầu hết interpreter "hiện đại" vẫn **compile sang bytecode** trước, rồi mới thông dịch bytecode đó — chỉ là không ra **mã máy native**. CPython dịch \`.py\` thành **bytecode** (\`.pyc\`) rồi một vòng lặp gọi là *bytecode interpreter* mới chạy bytecode. Vậy ranh giới "compiler vs interpreter" không phải "có compile hay không" mà là **dịch ra cái gì và khi nào**.

### 2.3. JIT (Just-In-Time compilation)

- **(a) Là gì.** Lai giữa hai cái trên: chương trình chạy **dưới dạng interpreter lúc đầu**, nhưng phần code nào **chạy nhiều (hot)** thì runtime sẽ **biên dịch sang mã máy native ngay trong lúc chạy** để các lần sau nhanh như compiled.
- **(b) Vì sao tồn tại.** Để **vừa khởi động nhanh như interpreter vừa chạy nhanh như compiler** với các vòng lặp nóng. Còn tận dụng được thông tin lúc chạy (kiểu dữ liệu thực tế, nhánh nào hay đi) để tối ưu — thứ compiler tĩnh không biết.
- **(c) Ví dụ số.** Vòng lặp chạy 1 triệu lần: 1000 lần đầu thông dịch (~1 ms), runtime thấy "nóng" → dịch ra native (~10 ms một lần), 999.000 lần còn lại chạy native (~0.000001 ms/lần). Tổng \`≈ 1 + 10 + 1 = 12 ms\` — gần bằng compiled mà không cần bước build trước.
- **(d) Ví dụ ngôn ngữ.** **JVM (HotSpot)** cho Java/Kotlin/Scala, **V8** cho JavaScript (Chrome/Node), **PyPy** cho Python, **.NET CLR** cho C#.

### 2.4. Bảng so sánh

<div style="overflow-x:auto">

| Tiêu chí | Compiler (C, Go) | Interpreter (Python, Ruby) | JIT (JVM, V8) |
| --- | --- | --- | --- |
| Khi nào dịch | Một lần, trước khi chạy | Mỗi lần chạy, từng phần | Lúc chạy, chỉ phần "nóng" |
| Tốc độ chạy | Nhanh nhất | Chậm nhất | Gần compiled (sau warm-up) |
| Khởi động | Cần build trước | Tức thì | Tức thì, nhanh dần |
| Portable (đa nền tảng) | Kém — binary gắn 1 kiến trúc, build lại cho máy khác | Tốt — chỉ cần có interpreter | Tốt — chỉ cần có VM |
| Debug / sửa nhanh | Phải build lại | Sửa-chạy tức thì | Sửa-chạy tức thì |
| Đầu ra phân phối | Binary mã máy | Source (cần interpreter) | Bytecode (cần VM) |

</div>

> ⚠ **Hiểu nhầm rất phổ biến #2: "compiled luôn nhanh hơn interpreted".**
> Không tuyệt đối. (1) Lúc **khởi động một lần**, interpreter thắng vì không tốn thời gian build. (2) Code có **rất nhiều kiểu động** đôi khi JIT (dùng thông tin runtime) tối ưu tốt hơn cả compiler tĩnh. (3) "Nhanh" còn phụ thuộc tối ưu hóa, không chỉ cách dịch. Phát biểu đúng là: *với chương trình tính toán nặng, lặp nhiều, compiled/JIT thường nhanh hơn interpreter thuần*.

> ❓ **Câu hỏi tự nhiên**
> - *"Một ngôn ngữ có buộc phải là compiled hoặc interpreted không?"* — Không. **"Compiled/interpreted" là tính chất của bản cài đặt, không phải của ngôn ngữ.** Có C interpreter (Cling) và có Python compiler (Nuitka). Người ta gắn nhãn theo bản cài đặt phổ biến nhất.
> - *"Bytecode là gì?"* — Một dạng "mã máy ảo": tập lệnh đơn giản cho một **máy ảo (virtual machine)** do phần mềm giả lập, không phải CPU thật. Gọn và portable hơn mã máy native. Ta sẽ tự sinh bytecode cho ngôn ngữ đồ chơi ở cuối lĩnh vực.

> 🔁 **Dừng lại tự kiểm tra**
> <details><summary>1. Python in ra kết quả ngay khi gõ lệnh — vậy nó "không compile"? Đúng/sai?</summary>
>
> **Sai.** CPython vẫn compile source thành **bytecode** rồi mới thông dịch bytecode đó. Nó chỉ không ra mã máy native. "Không có bước build thủ công" ≠ "không compile gì".</details>
> <details><summary>2. Chạy một script đúng 1 lần rồi thôi — compiled hay interpreted nhanh hơn về tổng thời gian?</summary>
>
> **Interpreted thường nhanh hơn về tổng**, vì compiled phải tốn thời gian build trước, mà lợi ích build (chạy nhanh) chỉ phát huy khi lặp nhiều lần.</details>

> 📝 **Tóm tắt §2.** Compiler dịch tất cả một lần trước (nhanh khi chạy). Interpreter đọc-và-làm mỗi lần (linh hoạt, khởi động nhanh). JIT thông dịch rồi tự biên dịch phần nóng ra native lúc chạy (lai cả hai). Nhãn này thuộc về bản cài đặt, không phải ngôn ngữ.

## 3. Pipeline — dây chuyền các trạm

> 💡 **Trực giác.** Hình dung một **dây chuyền nhà máy**. Nguyên liệu thô (chuỗi ký tự) đi vào đầu này; mỗi trạm gia công một bước rồi chuyền sang trạm sau; cuối dây chuyền ra "thành phẩm" là chương trình chạy được. Không trạm nào làm tất cả — mỗi trạm chỉ giỏi một việc.

Dây chuyền chuẩn của một compiler:

\`\`\`
source code (text)
      │  Lexer (Scanner)
      ▼
tokens   ──────►  Parser
                    │
                    ▼
                  AST   ──────►  Semantic Analysis
                                      │
                                      ▼
                                     IR  ──────►  Optimizer
                                                     │
                                                     ▼
                                                    IR'  ──────►  CodeGen
                                                                    │
                                                                    ▼
                                                          mã máy / bytecode → máy chạy
\`\`\`

Ta đẩy biểu thức quen thuộc \`x = (2+3)*4\` qua từng trạm. **Để ý: mỗi trạm chỉ đổi cách biểu diễn, ý nghĩa không đổi.**

### 3.1. Lexer (bộ phân tích từ vựng) — text → tokens

- **Nhận**: chuỗi ký tự thô \`x = ( 2 + 3 ) * 4\`.
- **Trả**: danh sách **token** — các "từ" nhỏ nhất có nghĩa, đã gắn nhãn loại.
- **Biến đổi**: gom các ký tự thành đơn vị, bỏ khoảng trắng/comment, phân loại từng đơn vị.

\`\`\`
"x = (2+3)*4"
   │ Lexer
   ▼
[ IDENT("x"), ASSIGN("="), LPAREN("("), NUM(2), PLUS("+"),
  NUM(3), RPAREN(")"), STAR("*"), NUM(4) ]
\`\`\`

Lexer chưa hiểu cấu trúc — với nó \`)*(\` cũng là 3 token hợp lệ. Nó chỉ trả lời *"ký tự này thuộc loại từ nào?"*. Học kỹ ở [Lesson 02 — Lexer](../lesson-02-lexer/).

### 3.2. Parser (bộ phân tích cú pháp) — tokens → AST

- **Nhận**: danh sách token ở trên.
- **Trả**: một **AST (cây cú pháp trừu tượng)** thể hiện cấu trúc lồng nhau và **độ ưu tiên toán tử**.
- **Biến đổi**: kiểm tra dãy token có đúng ngữ pháp (grammar) không, rồi dựng cây.

\`\`\`
        =                 (gán)
       / \\
      x   *               (nhân làm sau cùng → ở gần gốc)
         / \\
        +   4
       / \\
      2   3
\`\`\`

Cây này **đã mã hóa luôn** "ngoặc (2+3) tính trước, rồi nhân 4": \`+\` nằm *dưới* \`*\` nên được tính trước. Không còn dấu ngoặc nào trong cây — cấu trúc cây *thay thế* ngoặc. Học kỹ ở [Lesson 06 — Parser](../lesson-06-parser/) (và §6 dưới giới thiệu sơ).

### 3.3. Semantic Analysis (phân tích ngữ nghĩa) — AST → AST đã kiểm tra

- **Nhận**: AST.
- **Trả**: AST đã được **kiểm tra ý nghĩa** (kèm bảng ký hiệu — symbol table), hoặc báo lỗi.
- **Biến đổi**: cú pháp đúng chưa chắc *có nghĩa*. Trạm này hỏi: biến \`x\` đã khai báo chưa? Các kiểu có khớp không (cộng số với chuỗi?)? Gọi hàm đúng số tham số chưa?

Với \`x = (2+3)*4\`: kiểm tra \`2\`, \`3\`, \`4\` đều là số → \`+\`, \`*\` hợp lệ; \`x\` được gán → ghi \`x\` vào symbol table với kiểu số. Hợp lệ, đi tiếp.

> Ví dụ KHÔNG hợp lệ ở trạm này: \`x = y * 4\` khi \`y\` chưa khai báo → **semantic error** (xem §7).

### 3.4. IR (Intermediate Representation) — AST → mã trung gian

- **Nhận**: AST đã kiểm tra.
- **Trả**: **IR** — một dạng mã "phẳng", đơn giản, gần máy nhưng *chưa gắn với CPU cụ thể nào*.
- **Biến đổi**: duỗi cây thành dãy lệnh tuần tự ba-địa-chỉ (three-address code), mỗi lệnh một phép.

\`\`\`
t1 = 2 + 3      ; tính ngoặc trước
t2 = t1 * 4     ; rồi nhân
x  = t2         ; gán
\`\`\`

IR là "ngôn ngữ chung" để các trạm sau làm việc mà không cần biết source là C hay Go, đích là Intel hay ARM. Đây là chìa khóa của §4.

### 3.5. Optimizer (bộ tối ưu) — IR → IR' tốt hơn

- **Nhận**: IR.
- **Trả**: IR' tương đương về kết quả nhưng **nhanh/gọn hơn**.
- **Biến đổi**: áp các phép biến đổi giữ nguyên ý nghĩa. Ví dụ kinh điển: **constant folding** — \`2 + 3\` toàn hằng số → tính sẵn lúc dịch thành \`5\`:

\`\`\`
t2 = 5 * 4   →  t2 = 20     ; gập luôn hằng
x  = 20                      ; loại biến trung gian thừa
\`\`\`

Tối ưu là **tùy chọn**: bỏ qua thì chương trình vẫn đúng, chỉ chậm/cồng kềnh hơn. Học kỹ ở các bài Back-end.

### 3.6. CodeGen (sinh mã) — IR' → mã máy / bytecode

- **Nhận**: IR' đã tối ưu.
- **Trả**: lệnh máy thật của CPU đích (hoặc bytecode cho VM).
- **Biến đổi**: ánh xạ mỗi lệnh IR sang lệnh máy cụ thể, cấp phát thanh ghi, sắp đặt bộ nhớ.

\`\`\`
; bytecode cho máy ảo ngăn xếp (stack VM)
PUSH 20
STORE x
\`\`\`

(Nếu không tối ưu thì là \`PUSH 2; PUSH 3; ADD; PUSH 4; MUL; STORE x\` như §1.) Cuối cùng mỗi lệnh này lại là một dãy bit — **đây là 0/1 mà CPU/VM thực thi**. Vòng tròn khép lại: từ \`"x = (2+3)*4"\` ta đã ra được mã máy chạy được.

> ❓ **Câu hỏi tự nhiên**
> - *"Trạm nào là bắt buộc?"* — Lexer, Parser, CodeGen gần như luôn có. Semantic check tùy ngôn ngữ (ngôn ngữ kiểu tĩnh kiểm nhiều, kiểu động kiểm ít/lúc chạy). Optimizer hoàn toàn tùy chọn.
> - *"Mỗi trạm là một file/lớp riêng à?"* — Trong compiler thật thường mỗi trạm là một (hoặc nhiều) module. Trong ngôn ngữ đồ chơi của ta, mỗi trạm sẽ là một lesson — viết từng cái một.

> 🔁 **Dừng lại tự kiểm tra**
> <details><summary>Trạm nào biến danh sách token thành cây? Trạm nào phát hiện "biến chưa khai báo"?</summary>
>
> **Parser** dựng cây (AST) từ token. **Semantic Analysis** phát hiện "biến chưa khai báo" — vì đó là vấn đề *ý nghĩa*, không phải cú pháp.</details>

> 📝 **Tóm tắt §3.** Source → **Lexer** (→ tokens) → **Parser** (→ AST) → **Semantic** (kiểm tra ý nghĩa) → **IR** (mã trung gian) → **Optimizer** (→ IR' gọn) → **CodeGen** (→ mã máy/bytecode) → máy chạy. Mỗi trạm đổi cách biểu diễn, không đổi ý nghĩa.

## 4. Front-end vs Back-end — và mẹo \`n + m\`

> 💡 **Trực giác.** Một văn phòng dịch thuật phục vụ nhiều cặp ngôn ngữ. Cách ngây thơ: thuê người dịch riêng cho **mỗi cặp** (Việt→Anh, Việt→Pháp, Nhật→Anh, Nhật→Pháp…) — \`n × m\` người. Cách thông minh: ai cũng dịch về **một ngôn ngữ trung gian** (Esperanto), rồi từ đó dịch ra ngôn ngữ đích — \`n\` người dịch *vào* Esperanto + \`m\` người dịch *ra* = \`n + m\`. IR chính là "Esperanto" của compiler.

Pipeline ở §3 chia tự nhiên làm hai nửa, ranh giới là IR:

| | Front-end | Back-end |
| --- | --- | --- |
| Gồm các trạm | Lexer, Parser, Semantic | (IR) → Optimizer, CodeGen |
| Phụ thuộc vào | **Ngôn ngữ nguồn** (cú pháp C khác Go) | **Máy đích** (lệnh Intel khác ARM) |
| Câu hỏi nó lo | "Code này viết đúng ngôn ngữ X chưa, nghĩa là gì?" | "Diễn cái nghĩa đó bằng lệnh của CPU Y thế nào?" |
| Đầu ra/vào chung | Trả ra **IR** | Nhận vào **IR** |

**Vì sao tách lợi?** Giả sử cần hỗ trợ \`n\` ngôn ngữ nguồn (C, Go, Rust, Swift…) trên \`m\` máy đích (x86, ARM, RISC-V, WebAssembly…).

- **Không có IR chung**: phải viết riêng từng đường nguồn→đích → \`n × m\` bộ dịch. Với \`n = 4, m = 4\` → **16** bộ.
- **Có IR chung**: viết \`n\` front-end (ngôn ngữ → IR) + \`m\` back-end (IR → máy) → \`n + m\`. Với \`n = 4, m = 4\` → **8** bộ. Thêm một ngôn ngữ mới chỉ tốn **1** front-end (tự động chạy được trên *mọi* máy đã có back-end).

> Ví dụ số rõ hơn: \`n = 10\` ngôn ngữ, \`m = 10\` máy → \`n × m = 100\` vs \`n + m = 20\`. Càng nhiều ngôn ngữ/máy, IR chung càng thắng đậm.

**Ví dụ đời thực: LLVM.** LLVM định nghĩa một IR chung (LLVM IR). Clang là front-end C/C++ → LLVM IR; rustc dùng front-end Rust → LLVM IR; Swift cũng vậy. Phía back-end LLVM dịch IR đó ra x86, ARM, WebAssembly… Nhờ vậy một ngôn ngữ mới chỉ cần viết front-end ra LLVM IR là tự động chạy được trên mọi nền tảng LLVM hỗ trợ.

> ⚠ **Hiểu nhầm.** "Front-end" ở đây **không liên quan** "front-end web (HTML/CSS)". Trùng tên thôi: front-end compiler = nửa gần *ngôn ngữ người viết*; back-end = nửa gần *máy*.

> 🔁 **Dừng lại tự kiểm tra**
> <details><summary>Thêm ngôn ngữ Kotlin vào hệ thống đã có 5 ngôn ngữ và 6 máy đích, dùng IR chung. Phải viết thêm bao nhiêu thành phần?</summary>
>
> Chỉ **1** front-end (Kotlin → IR). Nó tự chạy trên cả 6 máy nhờ 6 back-end sẵn có. Không IR chung thì phải viết 6 bộ Kotlin→máy.</details>

> 📝 **Tóm tắt §4.** Front-end phụ thuộc ngôn ngữ (Lexer/Parser/Semantic, ra IR); back-end phụ thuộc máy (Optimizer/CodeGen, nhận IR). IR chung biến \`n × m\` thành \`n + m\`. LLVM là ví dụ thực tế.

## 5. Ngôn ngữ đồ chơi — lộ trình ta sẽ xây

> 💡 Cách học compiler hiệu quả nhất là **tự viết một cái nhỏ**. Xuyên suốt lĩnh vực này ta xây dần một ngôn ngữ đồ chơi (toy language), mỗi lesson thêm một trạm/tính năng.

Lộ trình tăng dần:

1. **Máy tính biểu thức số học** — chạy được \`(2+3)*4\`, \`10 - 2 * 3\`. Cần: Lexer + Parser + evaluator. (Lesson 02–07)
2. **Thêm biến & phép gán** — \`x = 5; y = x * 2\`. Cần: symbol table, semantic check "biến đã khai báo chưa". (các lesson tiếp)
3. **Thêm điều khiển luồng** — \`if\`, \`while\`. Cần: parse khối lệnh, sinh nhảy (jump) trong IR/bytecode.
4. **Sinh IR + bytecode + máy ảo chạy bytecode** — khép kín pipeline §3 ở quy mô nhỏ.

> ⚠ **Đây là toy language, không phải production.** Nó cố tình bỏ qua nhiều thứ (unicode đầy đủ, kiểu phức tạp, tối ưu nâng cao, quản lý bộ nhớ) để *làm rõ ý tưởng cốt lõi của từng trạm*. Khi cần công cụ thật, dùng LLVM/ANTLR/yacc — nhưng hiểu được toy này thì đọc tài liệu chúng dễ hơn nhiều.

> 📝 **Tóm tắt §5.** Ta xây toy language qua 4 chặng: biểu thức số học → biến/gán → if/while → IR/bytecode + VM. Cố tình đơn giản để làm rõ từng trạm.

## 6. AST là gì (sơ lược — học kỹ ở Lesson 06)

> 💡 **Trực giác.** AST = "sơ đồ ngữ pháp" của biểu thức, vẽ dưới dạng cây. Như khi phân tích câu tiếng Việt thành chủ ngữ / vị ngữ lồng nhau, ta phân tích biểu thức thành các phép toán lồng nhau.

**AST (Abstract Syntax Tree — cây cú pháp trừu tượng)** là cây mà:

- **Lá (leaf)** là giá trị nguyên tử: số, biến (\`2\`, \`3\`, \`x\`).
- **Nút trong (internal node)** là toán tử/cấu trúc (\`+\`, \`*\`, \`=\`, \`if\`), con của nó là các toán hạng.

Sức mạnh: **cấu trúc cây mã hóa luôn độ ưu tiên** — không cần dấu ngoặc nữa. So sánh \`2+3*4\` và \`(2+3)*4\` (cùng dãy ký tự gần giống, ý nghĩa khác hẳn):

\`\`\`
2 + 3 * 4   (nhân trước):            (2 + 3) * 4   (ngoặc trước):
      +                                      *
     / \\                                    / \\
    2   *        ← * sâu hơn +             +   4     ← + sâu hơn *
       / \\                                / \\
      3   4                              2   3
= 2 + 12 = 14                          = 5 * 4 = 20
\`\`\`

**Quy tắc đọc**: nút *càng sâu* (xa gốc) được *tính trước*. Cây bên trái có \`*\` sâu hơn → nhân \`3*4\` trước → 14. Cây bên phải có \`+\` sâu hơn → cộng \`2+3\` trước → 20. Cùng các con số, cấu trúc cây khác → kết quả khác. Đó là lý do parser phải dựng cây *đúng* theo độ ưu tiên — sai cây là sai kết quả.

Bốn ví dụ AST nhỏ (đọc cây → biểu thức):

\`\`\`
1)   -          2)    =         3)    >          4)     +
    / \\              / \\           (so sánh)          / \\
   7   2          x    +          / \\                a   *
   → 7 - 2           / \\         a   b                  / \\
                    1   1        → a > b               b   c
   = 5            → x = 1+1                          → a + b*c
\`\`\`

> ❓ *"Vì sao gọi là 'trừu tượng'?"* — Vì nó **bỏ chi tiết cú pháp thừa**: dấu ngoặc, dấu chấm phẩy, khoảng trắng không xuất hiện trong cây — chúng chỉ giúp *dựng* cây rồi biến mất. Cây giữ lại *cấu trúc ý nghĩa*, không giữ *hình thức bề mặt*. (Cây giữ cả chi tiết bề mặt gọi là *concrete syntax tree* / parse tree — nặng hơn, ít dùng để xử lý.)

> AST là một **cây** đúng nghĩa trong [DataStructures — Tree](../../../DataStructures/02-Intermediate/lesson-01-tree/): để *thực thi* hay *sinh mã*, ta **duyệt cây** (tree traversal) đệ quy từ gốc xuống lá.

> 📝 **Tóm tắt §6.** AST là cây: lá = giá trị, nút trong = toán tử. Độ sâu mã hóa độ ưu tiên (sâu hơn = tính trước), nên cây thay thế hoàn toàn dấu ngoặc. "Trừu tượng" = đã lược bỏ chi tiết cú pháp bề mặt.

## 7. Lỗi xuất hiện ở giai đoạn nào?

> 💡 **Trực giác.** Mỗi trạm "gác cổng" cho một loại lỗi. Lỗi bị bắt **càng sớm** trong pipeline càng tốt — vì lúc đó còn nhiều ngữ cảnh để báo rõ ("dòng 3, cột 5, ký tự lạ") thay vì để chương trình chạy rồi mới sập.

Bốn loại lỗi, theo thứ tự trạm phát hiện:

### 7.1. Lexical error (lỗi từ vựng) — bắt ở Lexer

Có ký tự/chuỗi **không thuộc bảng chữ cái của ngôn ngữ** — lexer không gom thành token nào được.

\`\`\`
x = 2 @ 3       ; '@' không là token hợp lệ
"chuỗi chưa đóng ngoặc kép...
45abc           ; số trộn chữ không hợp lệ (tùy ngôn ngữ)
\\x99            ; byte rác không in được
\`\`\`

### 7.2. Syntax error (lỗi cú pháp) — bắt ở Parser

Token đều hợp lệ nhưng **xếp sai trật tự ngữ pháp** — parser không dựng được cây.

\`\`\`
x = (2 + 3        ; thiếu ')' đóng ngoặc
x = 2 + * 3       ; hai toán tử liền nhau, thiếu toán hạng
= 5               ; gán mà không có vế trái
if x { )          ; ngoặc không khớp loại
\`\`\`

### 7.3. Semantic error (lỗi ngữ nghĩa) — bắt ở Semantic Analysis

Cú pháp đúng, **dựng được cây**, nhưng **vô nghĩa**.

\`\`\`
x = y * 4         ; 'y' chưa được khai báo
x = "abc" + 5     ; cộng chuỗi với số (sai kiểu)
foo(1, 2)         ; gọi hàm foo cần 3 tham số
int x = 3.14      ; gán số thực vào biến kiểu nguyên
\`\`\`

### 7.4. Runtime error (lỗi lúc chạy) — chỉ lộ KHI chạy

Mọi trạm dịch đều qua được; lỗi chỉ xuất hiện **lúc chương trình thực thi với dữ liệu cụ thể**.

\`\`\`
x = 10 / 0        ; chia 0 (compiler không biết mẫu = 0 lúc chạy)
arr[100]          ; truy cập ngoài mảng
mở một file không tồn tại
gọi method trên giá trị null
\`\`\`

<div style="overflow-x:auto">

| Loại lỗi | Bắt ở trạm | Bản chất | Ví dụ |
| --- | --- | --- | --- |
| Lexical | Lexer | Ký tự không hợp lệ | \`x = 2 @ 3\` |
| Syntax | Parser | Token đúng, trật tự sai | \`x = (2 + 3\` |
| Semantic | Semantic Analysis | Cú pháp đúng, ý nghĩa sai | \`x = y * 4\` (y chưa khai báo) |
| Runtime | (lúc chạy) | Mọi trạm qua, lỗi do dữ liệu | \`x = 10 / 0\` |

</div>

> ❓ **Câu hỏi tự nhiên**
> - *"\`10 / 0\` viết toàn ký tự hợp lệ, cú pháp đúng, kiểu đúng — sao không bắt được lúc dịch?"* — Vì mẫu số có thể là biến chỉ biết giá trị **lúc chạy** (\`a / b\` với \`b\` do người dùng nhập). Compiler không "chạy thử" toàn bộ nên nói chung không biết trước. (Trường hợp đặc biệt \`10/0\` với hằng số thì một số compiler *có* cảnh báo — nhưng quy tắc chung là chia-0 thuộc runtime.)
> - *"Ngôn ngữ kiểu động (Python) có giai đoạn semantic không?"* — Có, nhưng phần lớn kiểm tra kiểu **dời sang lúc chạy** → nhiều lỗi mà ngôn ngữ tĩnh bắt lúc dịch thì Python chỉ báo lúc chạy. Đánh đổi: linh hoạt hơn nhưng lỗi lộ muộn hơn.

> 🔁 **Dừng lại tự kiểm tra**
> <details><summary>Phân loại 4 lỗi: (a) <code>print(x</code> thiếu ngoặc, (b) dùng biến <code>total</code> chưa gán, (c) <code>3 # 4</code> ký tự lạ, (d) chia cho số người dùng nhập = 0.</summary>
>
> (a) **syntax** (token đúng, thiếu \`)\`), (b) **semantic** (biến chưa khai báo), (c) **lexical** (\`#\` không là token — tùy ngôn ngữ), (d) **runtime** (chỉ biết khi chạy với input 0).</details>

> 📝 **Tóm tắt §7.** Lexical (ký tự lạ, ở Lexer) → Syntax (trật tự sai, ở Parser) → Semantic (vô nghĩa, ở Semantic Analysis) → Runtime (lộ lúc chạy). Bắt càng sớm càng dễ sửa.

## 8. Bài tập

**Bài 1.** Phân loại mỗi bản cài đặt sau là **compiler**, **interpreter**, hay **JIT**, và giải thích 1 câu:
(a) Go build ra một file \`.exe\`; (b) CPython chạy \`script.py\`; (c) JVM HotSpot chạy \`App.class\`; (d) V8 chạy JavaScript trong Chrome; (e) \`gcc\` dịch C ra binary.

**Bài 2.** Một chương trình tính toán nặng chạy trong vòng lặp 100 triệu lần.
(a) Compiled hay interpreted phù hợp hơn? Vì sao?
(b) Nếu chỉ chạy đúng 1 lần rồi xóa, câu trả lời có đổi không?

**Bài 3.** Cho \`a = 5 * (1 + 2)\`. Viết kết quả của **từng trạm** trong pipeline: (1) token list, (2) AST (vẽ cây), (3) IR ba-địa-chỉ, (4) IR sau constant folding, (5) bytecode stack-VM.

**Bài 4.** Vẽ AST cho hai biểu thức và tính kết quả, chỉ ra vì sao khác nhau:
(a) \`2 * 3 + 4\`  (b) \`2 * (3 + 4)\`

**Bài 5.** Phân loại lỗi (lexical / syntax / semantic / runtime) cho mỗi dòng, giải thích ngắn:
(a) \`y = 3 § 4\`  (b) \`z = (4 + )\`  (c) \`w = undefinedVar + 1\`  (d) \`q = list[999]\` khi list có 3 phần tử  (e) \`r = "5" * "x"\`

**Bài 6.** Hệ thống compiler hỗ trợ 6 ngôn ngữ nguồn và 5 máy đích.
(a) Không dùng IR chung, cần bao nhiêu bộ dịch?
(b) Dùng IR chung, cần bao nhiêu thành phần?
(c) Thêm 1 ngôn ngữ mới, mỗi cách tốn thêm bao nhiêu?

**Bài 7.** Với mỗi trạm sau, cho biết **đầu vào** và **đầu ra** của nó: Lexer, Parser, Semantic Analysis, CodeGen.

**Bài 8.** Giải thích vì sao câu *"interpreter không compile gì cả"* là sai, lấy CPython làm ví dụ cụ thể.

**Bài 9.** (Tư duy) Constant folding gập \`2 + 3\` thành \`5\` lúc dịch. Nêu một biểu thức mà compiler **không thể** gập sẵn được, và giải thích vì sao.

**Bài 10.** Sắp xếp 4 loại lỗi theo **thứ tự trạm phát hiện** trong pipeline, từ sớm nhất đến muộn nhất.

## Lời giải chi tiết

### Bài 1

(a) **Compiler** — Go dịch toàn bộ ra mã máy native một lần, sản phẩm là binary chạy độc lập.
(b) **Interpreter** — CPython dịch sang bytecode rồi thông dịch bytecode đó mỗi lần chạy, không ra binary native.
(c) **JIT** — HotSpot thông dịch bytecode lúc đầu, biên dịch phần "nóng" ra mã máy native lúc chạy.
(d) **JIT** — V8 thông dịch JS rồi biên dịch hàm chạy nhiều ra native ngay trong runtime.
(e) **Compiler** — \`gcc\` dịch C thành mã máy một lần, ra binary.

### Bài 2

(a) **Compiled** (hoặc JIT) phù hợp hơn. Vòng lặp 100 triệu lần: chi phí dịch trả trước (làm 1 lần) được khấu hao về gần 0, còn mỗi vòng chạy mã máy native cực nhanh. Interpreter phải phân tích lại mỗi vòng → cộng dồn rất lớn.
(b) **Có thể đổi.** Nếu chỉ chạy 1 lần và là chương trình *nhỏ*, interpreter khởi động tức thì có thể nhanh hơn về *tổng thời gian* (compiled tốn thời gian build mà không kịp khấu hao). Nhưng nếu bản thân 1 lần chạy đó vẫn là vòng lặp 100 triệu lần thì compiled vẫn thắng — vì lợi ích nằm ở *số phép tính lặp*, không chỉ ở *số lần khởi động*.

### Bài 3

\`a = 5 * (1 + 2)\`

**(1) Token list:**
\`\`\`
[ IDENT("a"), ASSIGN("="), NUM(5), STAR("*"),
  LPAREN("("), NUM(1), PLUS("+"), NUM(2), RPAREN(")") ]
\`\`\`

**(2) AST:**
\`\`\`
      =
     / \\
    a   *
       / \\
      5   +
         / \\
        1   2
\`\`\`
(Ngoặc \`(1+2)\` → \`+\` nằm dưới \`*\` → cộng trước, nhân sau.)

**(3) IR ba-địa-chỉ:**
\`\`\`
t1 = 1 + 2
t2 = 5 * t1
a  = t2
\`\`\`

**(4) IR sau constant folding:** \`1 + 2\` toàn hằng → \`3\`; rồi \`5 * 3\` toàn hằng → \`15\`:
\`\`\`
a = 15
\`\`\`

**(5) Bytecode stack-VM** (bản chưa tối ưu, để thấy cơ chế):
\`\`\`
PUSH 5
PUSH 1
PUSH 2
ADD          ; 1+2 = 3
MUL          ; 5*3 = 15
STORE a
\`\`\`
(Bản đã tối ưu: \`PUSH 15; STORE a\`.)

### Bài 4

**(a) \`2 * 3 + 4\`** — \`*\` ưu tiên cao hơn \`+\` → nhân trước:
\`\`\`
      +
     / \\
     *   4
    / \\
   2   3
= 6 + 4 = 10
\`\`\`

**(b) \`2 * (3 + 4)\`** — ngoặc ép \`+\` tính trước:
\`\`\`
      *
     / \\
    2   +
       / \\
      3   4
= 2 * 7 = 14
\`\`\`

Khác nhau vì **cây khác nhau**: ở (a) \`*\` sâu hơn nên tính trước (10); ở (b) ngoặc đẩy \`+\` xuống sâu hơn nên tính trước (14). Cùng các con số \`2,3,4\` và toán tử \`*,+\` nhưng cấu trúc cây quyết định kết quả.

### Bài 5

(a) \`y = 3 § 4\` — **lexical**: ký tự \`§\` không thuộc bảng chữ cái ngôn ngữ, lexer không gom thành token.
(b) \`z = (4 + )\` — **syntax**: các token hợp lệ nhưng \`+\` thiếu toán hạng phải và ngoặc đóng sai chỗ → parser không dựng được cây.
(c) \`w = undefinedVar + 1\` — **semantic**: cú pháp đúng, nhưng \`undefinedVar\` chưa khai báo → vô nghĩa.
(d) \`q = list[999]\` (list 3 phần tử) — **runtime**: chỉ phát hiện khi chạy và truy cập chỉ số vượt mảng.
(e) \`r = "5" * "x"\` — **semantic**: nhân hai chuỗi sai kiểu (ở ngôn ngữ kiểu tĩnh bắt lúc dịch; kiểu động như Python thì lộ lúc chạy → khi đó là runtime — nêu rõ giả định là cách trả lời đúng).

### Bài 6

(a) Không IR chung: mỗi cặp nguồn→đích cần 1 bộ → \`6 × 5 = 30\` bộ.
(b) Có IR chung: \`6\` front-end (nguồn → IR) + \`5\` back-end (IR → máy) = \`11\` thành phần.
(c) Thêm 1 ngôn ngữ:
- Không IR chung: cần thêm \`5\` bộ (ngôn ngữ mới × 5 máy).
- Có IR chung: chỉ thêm \`1\` front-end; nó tự chạy trên cả 5 máy nhờ back-end sẵn có.

### Bài 7

| Trạm | Đầu vào | Đầu ra |
| --- | --- | --- |
| Lexer | Chuỗi ký tự source (text) | Danh sách token |
| Parser | Danh sách token | AST |
| Semantic Analysis | AST | AST đã kiểm tra (+ symbol table) hoặc báo lỗi |
| CodeGen | IR (đã tối ưu) | Mã máy / bytecode |

### Bài 8

Câu đó sai vì **đa số interpreter vẫn có bước compile, chỉ là không ra mã máy native**. Cụ thể CPython: khi chạy \`script.py\`, nó **dịch source thành bytecode** (các opcode như \`LOAD_NAME\`, \`BINARY_ADD\`…), lưu cache vào \`__pycache__/*.pyc\`, rồi một vòng lặp gọi là *bytecode interpreter* mới lần lượt thực thi bytecode đó. Vậy có hẳn một giai đoạn compile (source → bytecode). Phân biệt đúng giữa compiler và interpreter không nằm ở "có compile hay không" mà ở **dịch ra cái gì (native vs bytecode) và khi nào (trước hay trong lúc chạy)**.

### Bài 9

Ví dụ: \`x = a + b\` với \`a\`, \`b\` là biến do người dùng nhập lúc chạy. Compiler **không thể** gập sẵn vì giá trị \`a\`, \`b\` chỉ tồn tại lúc chạy — lúc dịch chúng chưa có. Constant folding chỉ áp dụng được khi **mọi toán hạng đều là hằng số đã biết lúc dịch** (như \`2 + 3\`). Một ví dụ khác: \`now()\` (đọc thời gian hiện tại) — kết quả phụ thuộc thời điểm chạy, không thể tính trước.

### Bài 10

Thứ tự trạm phát hiện, từ sớm nhất đến muộn nhất:

1. **Lexical** (ở Lexer — trạm đầu)
2. **Syntax** (ở Parser — sau Lexer)
3. **Semantic** (ở Semantic Analysis — sau Parser)
4. **Runtime** (muộn nhất — chỉ lộ lúc chương trình chạy)

Nguyên tắc: bắt lỗi càng sớm trong pipeline càng tốt, vì còn đủ ngữ cảnh để báo lỗi rõ ràng (dòng, cột) và tránh để chương trình sập lúc chạy thật.

## Tham khảo và bài tiếp theo

- Tiền đề & liên hệ: [Programming](../../../Programming/) · [DataStructures — Tree](../../../DataStructures/02-Intermediate/lesson-01-tree/) (AST là cây) · [OperatingSystems](../../../OperatingSystems/) (CPU thực thi mã máy) · [DataFoundations](../../../DataFoundations/) (biểu diễn nhị phân).
- **Bài tiếp theo**: [Lesson 02 — Lexer](../lesson-02-lexer/) — đào sâu trạm đầu tiên: biến chuỗi ký tự thành danh sách token, tự tay viết một scanner cho ngôn ngữ đồ chơi.
- Minh họa tương tác: [visualization.html](./visualization.html) — Pipeline Explorer (đẩy biểu thức qua từng trạm), Compiler vs Interpreter (đếm bước), và bộ phân loại lỗi.
</content>
</invoke>
`;
