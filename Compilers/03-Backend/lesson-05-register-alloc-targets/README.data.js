// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Compilers/03-Backend/lesson-05-register-alloc-targets/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 15 — Cấp phát thanh ghi & Mục tiêu sinh mã (Register Allocation & Targets)

> Đây là **bài cuối** của lĩnh vực **Compilers**. Sau bài này, trình biên dịch đồ chơi của chúng ta đã đi trọn vẹn từ mã nguồn (source) tới mã máy chạy được — và bạn sẽ có bản đồ để học tiếp những hệ thống thật.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao** CPU thật chỉ có ít thanh ghi (register) nhưng IR lại dùng vô hạn temp — và bài toán ánh xạ nhiều temp → ít register.
- Phân biệt **stack machine** (máy ngăn xếp, đã học ở L13) và **register machine** (máy thanh ghi, mã native dùng).
- Tính **liveness (sống/chết)** và **live range (khoảng sống)** của temp bằng tay trên một đoạn IR thật.
- Dựng **interference graph (đồ thị xung đột)** và **tô màu đồ thị (graph coloring)** để cấp phát register — walk-through đầy đủ.
- Hiểu **spilling (tràn ra bộ nhớ)**: khi nào xảy ra, vì sao đắt, heuristic chọn temp để spill.
- Liệt kê các **mục tiêu sinh mã (targets)**: native x86/ARM, **WebAssembly (WASM)**, JVM bytecode, JavaScript — và vì sao một IR chung (LLVM) cho phép cross-compile. Phân biệt **AOT vs JIT**.
- Nhìn lại **toàn bộ pipeline** của lĩnh vực Compilers và biết hướng học tiếp.

## Kiến thức tiền đề

- [L13 — Bytecode & Stack VM](../lesson-03-bytecode-stack-vm/) — máy ngăn xếp, bytecode. Bài này so sánh trực tiếp với register machine.
- [L11 — IR (Three-Address Code)](../lesson-01-ir-three-address/) — temp \`t1, t2, ...\`, mã ba địa chỉ. Đầu vào của register allocation chính là IR này.
- [DataStructures — Graph](../../../DataStructures/03-Advanced/lesson-01-graph/) — đỉnh, cạnh, bậc (degree), kề (adjacency). Interference graph là một đồ thị, và tô màu là bài toán đồ thị kinh điển.
- [Algorithms](../../../Algorithms/) — heuristic, greedy, độ phức tạp (NP-hard).
- [OperatingSystems](../../../OperatingSystems/) — phân cấp bộ nhớ (register → cache → RAM), vì sao truy cập RAM chậm hơn register hàng chục lần (giải thích vì sao spill đắt).

---

## 1. Vì sao cần cấp phát thanh ghi?

### 1.1. Vấn đề mở đầu — cụ thể

> IR của chúng ta (từ [L11](../lesson-01-ir-three-address/)) sinh ra temp thoải mái: \`t1, t2, t3, ..., t100\`. Mỗi phép tính đẻ một temp mới, không giới hạn. Nhưng CPU x86-64 thật chỉ có **16 thanh ghi số nguyên** (\`rax, rbx, rcx, ...\`), ARM64 có 31. **Làm sao nhét \`t1..t100\` vào 16 ô?**

Đây là câu hỏi trung tâm của bài. Câu trả lời ngắn gọn: **không phải mọi temp đều cần tồn tại cùng một lúc**. Một temp chỉ "sống" trong một khoảng ngắn — từ lúc được gán giá trị tới lần dùng cuối cùng. Sau đó nó "chết", và ô register của nó được tái sử dụng cho temp khác. Phần còn lại của bài là làm rõ và máy-hóa ý tưởng này.

💡 **Trực giác / Hình dung.** Hãy tưởng tượng register là **16 chiếc ghế** trong phòng họp, còn temp là **người tham dự** ra vào liên tục. Một người chỉ cần ghế trong khoảng thời gian họ ở trong phòng. Hai người không bao giờ ở trong phòng cùng lúc → có thể ngồi chung **một** chiếc ghế (ở các thời điểm khác nhau). Nếu tại một thời điểm có 17 người cùng trong phòng mà chỉ 16 ghế → một người phải ra hành lang ngồi (đó là **spill** — đẩy ra bộ nhớ, chậm hơn). Register allocation = **xếp người vào ghế sao cho không ai cùng lúc thiếu ghế**.

### 1.2. Vì sao register quan trọng đến thế?

Phân cấp bộ nhớ (xem [OperatingSystems](../../../OperatingSystems/)) — thời gian truy cập tăng dần:

| Mức | Thời gian truy cập (ước lượng) | So với register |
| --- | --- | --- |
| Register | ~0 chu kỳ (đã ở trong CPU) | 1× |
| L1 cache | ~4 chu kỳ | ~4× chậm hơn |
| L2 cache | ~12 chu kỳ | ~12× |
| RAM | ~100–300 chu kỳ | ~100× |

→ Một biến nằm trong register được dùng **ngay lập tức**. Một biến bị spill ra RAM phải \`load\`/\`store\` mỗi lần dùng → chậm hàng chục đến hàng trăm lần. Vì vậy mục tiêu của allocator là **giữ càng nhiều temp trong register càng tốt**, spill càng ít càng tốt.

⚠ **Lỗi thường gặp — register pressure.** "Register pressure" (áp lực thanh ghi) là số temp **đang sống cùng lúc** tại một điểm trong chương trình. Nếu pressure tại một điểm > số register \`k\`, **bắt buộc** phải spill ở đó. Người mới hay nghĩ "miễn tổng số temp ≤ 16 là đủ" — sai. Cái quan trọng không phải tổng số temp, mà là **số temp sống đồng thời tại điểm đông nhất**. 100 temp nhưng không bao giờ quá 5 cái sống cùng lúc → 5 register là đủ.

🔁 **Dừng lại tự kiểm tra.** Một hàm có 80 temp nhưng tại mọi điểm tối đa chỉ 6 temp sống cùng lúc. CPU có 16 register. Có cần spill không?

<details><summary>Đáp án</summary>
Không. Register pressure tối đa = 6 ≤ 16. Tổng 80 temp không liên quan — chúng tái dùng chung 6 ghế qua thời gian. Allocator chỉ cần ≤ 6 register.
</details>

---

## 2. Stack machine vs Register machine

Ở [L13](../lesson-03-bytecode-stack-vm/) ta đã chạy bytecode trên **stack machine** (máy ngăn xếp): mọi phép tính lấy toán hạng từ đỉnh stack, đẩy kết quả lại lên stack. Mã native (x86/ARM) thì khác — nó là **register machine**: lệnh thao tác trực tiếp trên các thanh ghi có tên.

💡 **Trực giác.** Stack machine giống **rửa bát theo dây chuyền một chồng**: chỉ chạm được cái trên cùng. Register machine giống có **16 cái khay đánh số** — với mỗi lệnh bạn chỉ rõ "lấy từ khay 3 và khay 5, để kết quả vào khay 3".

Cùng biểu thức \`(a + b) * c\`, hai kiểu sinh mã khác hẳn:

**Stack machine bytecode (L13):**
\`\`\`
PUSH a       ; stack: [a]
PUSH b       ; stack: [a, b]
ADD          ; stack: [a+b]
PUSH c       ; stack: [a+b, c]
MUL          ; stack: [(a+b)*c]
\`\`\`
Không nhắc tên register nào — toán hạng ngầm là đỉnh stack. Đơn giản để sinh, dễ thông dịch (interpret), nhưng **chậm** vì mỗi lệnh đụng bộ nhớ stack.

**Register machine (x86-ish):**
\`\`\`
mov rax, a        ; rax = a
add rax, b        ; rax = a + b
imul rax, c       ; rax = (a+b) * c
\`\`\`
Toán hạng là tên register tường minh. Nhanh hơn nhiều (CPU chạy thẳng trên register), nhưng **phải quyết định temp nào vào register nào** — chính là bài toán cấp phát.

| | Stack machine | Register machine |
| --- | --- | --- |
| Toán hạng | ngầm (đỉnh stack) | tường minh (tên register) |
| Số "ô làm việc" | vô hạn (stack sâu tùy ý) | hữu hạn (k register) |
| Sinh mã | dễ (không cần allocate) | khó (cần register allocation) |
| Tốc độ chạy | chậm hơn | nhanh hơn (mã native) |
| Ví dụ | JVM bytecode, [L13](../lesson-03-bytecode-stack-vm/) VM, Python \`dis\` | x86, ARM, RISC-V |

📝 **Tóm tắt mục 2.**
- Stack machine: toán hạng ngầm trên đỉnh stack, dễ sinh, chậm.
- Register machine: toán hạng tường minh, nhanh, nhưng cần cấp phát register.
- IR ba địa chỉ (vô hạn temp) đứng **giữa**: ta sinh IR dễ như stack, rồi cấp phát register để ra mã nhanh.

---

## 3. Liveness — temp nào đang "sống"?

### 3.1. Định nghĩa

💡 **Trực giác.** Một temp giống **một món đồ bạn mượn**: nó "sống" từ lúc bạn cầm vào tay (được **gán/định nghĩa**, *def*) cho tới **lần cuối bạn dùng** nó (*last use*). Sau lần dùng cuối, nó "chết" — không ai quan tâm giá trị của nó nữa, có thể quẳng đi (giải phóng ghế register).

**Định nghĩa (a — là gì):** Một temp \`t\` được gọi là **sống (live)** tại một điểm trong chương trình nếu giá trị hiện tại của \`t\` **sẽ còn được dùng** ở một lệnh sau đó (trên ít nhất một đường thực thi). **Live range (khoảng sống)** của \`t\` là đoạn từ lệnh *def* tới lệnh *use* cuối cùng.

**Vì sao tồn tại (b):** Allocator cần biết "tại từng thời điểm, những temp nào đang cần ô chứa". Liveness chính là thông tin đó. Không có liveness, ta phải bi quan giả định mọi temp sống mọi lúc → tốn register vô ích.

**Ví dụ trực giác bằng số (c):** dòng \`t1 = 2 + 3\`, rồi mãi 5 dòng sau mới có \`x = t1 + 1\` (không đụng \`t1\` ở giữa). \`t1\` sống suốt 5 dòng đó. Nếu sau \`x = t1 + 1\` không còn chỗ nào dùng \`t1\` → \`t1\` chết ngay sau dòng đó, ghế của nó được giải phóng.

### 3.2. Bốn ví dụ live range

Quy ước: đánh số dòng IR. *def* = dòng gán cho temp; *last use* = dòng cuối đọc nó.

**Ví dụ 1.**
\`\`\`
1: a = 1          ; def a
2: b = a + 2      ; def b, use a   → a chết sau dòng 2
3: c = b + 3      ; def c, use b   → b chết sau dòng 3
\`\`\`
- live range \`a\` = [1, 2], \`b\` = [2, 3], \`c\` = [3, 3]. Không hai temp nào sống chồng nhau quá 2 cái → cần 2 register.

**Ví dụ 2 (def rồi không dùng — dead).**
\`\`\`
1: x = 5          ; def x
2: y = 10         ; def y
3: z = y + 1      ; use y
\`\`\`
- \`x\` được gán nhưng **không bao giờ dùng** → live range rỗng, \`x\` là **dead code** (mã chết). Có thể xóa hẳn dòng 1 (xem optimization [L12](../lesson-02-optimization/)). Đây là điều liveness phát hiện ra.

**Ví dụ 3 (re-def — gán lại).**
\`\`\`
1: t = 1          ; def t
2: u = t + 1      ; use t   → live range cũ của t = [1, 2]
3: t = 99         ; def t   → bắt đầu live range MỚI của t = [3, 4]
4: v = t + 2      ; use t
\`\`\`
- \`t\` có **hai live range tách rời**: [1,2] và [3,4]. Chúng có thể nằm ở **hai register khác nhau**! Allocator hiện đại tách \`t\` thành \`t_1\` và \`t_2\` (SSA-style). Điểm quan trọng: "cùng tên" không có nghĩa "cùng một thứ sống suốt".

**Ví dụ 4 (overlap nhiều).**
\`\`\`
1: a = 1
2: b = 2
3: c = a + b      ; use a, use b   → a, b cùng sống tới đây
4: d = c + a      ; use c, use a   → a vẫn sống! (dùng lại ở dòng 4)
\`\`\`
- Tại dòng 3: \`a, b\` sống (sắp dùng). Tại dòng 4: \`a, c\` sống. live range \`a\` = [1,4] (dài, vì dùng lại tận dòng 4), \`b\` = [2,3], \`c\` = [3,4]. Điểm đông nhất: 2 temp cùng lúc.

### 3.3. Walk-through tính liveness đầy đủ

Xét đoạn IR (tính \`(a*b) + (a-c)\`):
\`\`\`
1: t1 = a * b
2: t2 = a - c
3: t3 = t1 + t2
4: ret t3
\`\`\`

Tính live range theo cách "quét ngược" (backward) — vì last use dễ thấy khi đi từ dưới lên:

- Dòng 4 \`ret t3\`: dùng \`t3\`. → \`t3\` sống tại điểm trước dòng 4.
- Dòng 3 \`t3 = t1 + t2\`: **def** \`t3\` (kết thúc liveness của t3 đi xuống), **use** \`t1, t2\`. → trước dòng 3, \`t1\` và \`t2\` sống.
- Dòng 2 \`t2 = a - c\`: **def** \`t2\` (t2 sinh ra ở đây). **use** \`a, c\`.
- Dòng 1 \`t1 = a * b\`: **def** \`t1\`. **use** \`a, b\`.

Bảng "temp nào sống ngay SAU mỗi dòng" (đây là thông tin allocator dùng):

| Sau dòng | Live set | Số temp sống (pressure) |
| --- | --- | --- |
| 1 | {t1} | 1 |
| 2 | {t1, t2} | 2 |
| 3 | {t3} | 1 |
| 4 | {} | 0 |

→ Register pressure tối đa = **2** (sau dòng 2). Vậy **2 register là đủ** cho đoạn này, dù có 3 temp \`t1, t2, t3\`. Cụ thể: \`t1\` và \`t3\` không bao giờ sống cùng lúc (t1 chết ở dòng 3, t3 sinh ở dòng 3) → chia chung **một** register. \`t2\` cần register thứ hai. Kết quả: 2 register.

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Vì sao quét NGƯỢC mà không quét xuôi?"* — Vì liveness lan **ngược** dòng điều khiển: một temp sống tại điểm P nếu nó được dùng ở đâu đó **sau** P. Đi từ dưới lên, ta biết ngay "phía sau dùng gì". Quét xuôi phải đoán trước tương lai.
- *"Nếu có nhánh \`if\`/vòng lặp thì sao?"* — Phức tạp hơn: một temp sống nếu nó được dùng trên **bất kỳ** đường nào đi tới. Phải lặp (iterate) cho tới khi live set ổn định (fixpoint). Đây là **dataflow analysis** — ý tưởng đã gặp ở control-flow codegen [L14](../lesson-04-control-flow-codegen/). Bài này tập trung mã thẳng (straight-line) để rõ ý.
- *"\`a, b, c\` (biến nguồn) có tính liveness không?"* — Có, hoàn toàn tương tự temp. Ở đây ta giả sử chúng là tham số đã nằm sẵn register; trọng tâm minh họa là \`t1, t2, t3\`.

⚠ **Lỗi thường gặp — liveness sai → ghi đè (clobber).** Nếu allocator tính **nhầm** rằng \`t1\` đã chết trong khi thực ra nó còn được dùng, nó sẽ cho temp khác **ghi đè** lên register của \`t1\`. Khi tới chỗ dùng \`t1\`, giá trị đã bị phá → **kết quả sai âm thầm**, không crash, rất khó tìm. Đây là loại bug nguy hiểm nhất của allocator: liveness phải **đúng tuyệt đối**, thà bi quan (giữ temp sống lâu hơn cần) còn hơn lạc quan sai.

🔁 **Dừng lại tự kiểm tra.** Cho đoạn:
\`\`\`
1: p = x + 1
2: q = p * 2
3: r = q - p
\`\`\`
\`p\` chết sau dòng nào? Pressure tối đa?

<details><summary>Đáp án</summary>
\`p\` được dùng ở dòng 2 và dòng 3 → last use là dòng 3 → \`p\` chết sau dòng 3. Live set sau mỗi dòng: sau 1 = {p}; sau 2 = {p, q}; sau 3 = {r}. Pressure tối đa = 2 (sau dòng 2).
</details>

📝 **Tóm tắt mục 3.**
- Temp sống từ *def* tới *last use*; sau đó chết, ghế được tái dùng.
- Quét ngược để tính live set "sau mỗi dòng".
- Register pressure = số temp sống cùng lúc; max pressure ≤ k → không cần spill.
- Liveness sai (lạc quan) → ghi đè giá trị còn dùng → sai âm thầm.

---

## 4. Tô màu đồ thị (Graph Coloring)

### 4.1. Từ liveness sang đồ thị

💡 **Trực giác.** Hãy nghĩ tới bài toán **xếp lịch thi**: mỗi môn là một đỉnh; nối cạnh hai môn nếu có sinh viên học **cả hai** (không thể thi cùng giờ). "Màu" = khung giờ. Tô màu sao cho hai môn nối cạnh khác giờ → số màu tối thiểu = số khung giờ cần. Register allocation **giống hệt**: temp = môn thi, "sống cùng lúc" = có sinh viên chung, register = khung giờ.

**Interference graph (đồ thị xung đột):**
- **Đỉnh (vertex)** = mỗi temp.
- **Cạnh (edge)** giữa \`u\` và \`v\` ⟺ \`u\` và \`v\` **sống cùng một lúc** (live range chồng nhau) → chúng **không thể** dùng chung register.

Đây là một đồ thị vô hướng (xem [DataStructures — Graph](../../../DataStructures/03-Advanced/lesson-01-graph/) cho đỉnh/cạnh/bậc). Cấp phát register = **tô màu đồ thị bằng \`k\` màu** (k = số register), sao cho hai đỉnh kề khác màu.

**Định nghĩa tô màu hợp lệ (a — là gì):** một phép gán "màu" cho mỗi đỉnh sao cho **không** có cạnh nào nối hai đỉnh cùng màu. **(b — vì sao):** hai đỉnh kề = hai temp xung đột; cùng màu = cùng register → một cái sẽ ghi đè cái kia. Khác màu đảm bảo an toàn. **(c — số cụ thể):** đồ thị tam giác (3 đỉnh đôi một kề) cần đúng 3 màu; không thể ít hơn.

### 4.2. Walk-through ĐẦY ĐỦ — 5 temp, 3 register

Xét đoạn IR sau (đã đánh số). Mục tiêu: cấp phát với **k = 3 register** (\`R1, R2, R3\`).

\`\`\`
1: a = 1
2: b = 2
3: c = a + b        ; use a, b
4: d = c + 2        ; use c
5: e = d + a        ; use d, a
6: ret e            ; use e
\`\`\`

**Bước 1 — tính live set sau mỗi dòng (quét ngược):**

- Dòng 6 dùng \`e\` → trước 6: \`e\` sống.
- Dòng 5 def \`e\`, use \`d, a\` → sau 5: {e}; trước 5: {d, a}.
- Dòng 4 def \`d\`, use \`c\` → sau 4: {d, a}; trước 4: {c, a}.  (\`a\` vẫn sống vì dùng ở dòng 5!)
- Dòng 3 def \`c\`, use \`a, b\` → sau 3: {c, a}; trước 3: {a, b}.
- Dòng 2 def \`b\` → sau 2: {a, b}.
- Dòng 1 def \`a\` → sau 1: {a}.

Bảng live set:

| Sau dòng | Live set |
| --- | --- |
| 1 | {a} |
| 2 | {a, b} |
| 3 | {a, c} |
| 4 | {a, d} |
| 5 | {e} |

**Bước 2 — dựng cạnh xung đột** (hai temp cùng trong một live set ⟹ một cạnh):

- Sau dòng 2: \`{a, b}\` → cạnh **a–b**.
- Sau dòng 3: \`{a, c}\` → cạnh **a–c**.
- Sau dòng 4: \`{a, d}\` → cạnh **a–d**.
- Sau dòng 5: \`{e}\` → không cạnh nào.

Vậy interference graph:
\`\`\`
        b
        |
   c -- a -- d
        |
        e   (e KHÔNG nối ai — sống một mình ở dòng 5)
\`\`\`
Cạnh: \`a–b\`, \`a–c\`, \`a–d\`. (\`e\` cô lập; \`b, c, d\` không nối nhau vì không cặp nào trong số chúng sống cùng lúc.)

Bậc các đỉnh: \`a\` = 3, \`b\` = 1, \`c\` = 1, \`d\` = 1, \`e\` = 0.

**Bước 3 — tô màu với 3 màu** (3 màu = \`R1, R2, R3\`). Chiến lược greedy: tô đỉnh bậc cao trước.

| Đỉnh | Hàng xóm đã tô | Màu khả dụng | Chọn |
| --- | --- | --- | --- |
| \`a\` (bậc 3) | — | R1, R2, R3 | **R1** |
| \`b\` | a=R1 | R2, R3 | **R2** |
| \`c\` | a=R1 | R2, R3 | **R2** |
| \`d\` | a=R1 | R2, R3 | **R2** |
| \`e\` | — | R1, R2, R3 | **R1** |

→ Cấp phát: \`a→R1, b→R2, c→R2, d→R2, e→R1\`. Kiểm tra mọi cạnh: a(R1)≠b(R2) ✓, a(R1)≠c(R2) ✓, a(R1)≠d(R2) ✓. **Hợp lệ với chỉ 2 màu thực sự dùng** (R1, R2) — dư 1 register. Lý do: \`b, c, d\` không nối nhau (không sống cùng lúc) nên chia chung R2; \`e\` tái dùng R1 của \`a\` (a đã chết khi e sinh ra).

**Bước 4 — sinh mã native** từ cấp phát:
\`\`\`
R1 = 1            ; a = 1
R2 = 2            ; b = 2
R2 = R1 + R2      ; c = a + b   (b chết, c chiếm R2)
R2 = R2 + 2       ; d = c + 2   (c chết, d chiếm R2)
R1 = R2 + R1      ; e = d + a   (a, d chết, e chiếm R1)
ret R1            ; ret e
\`\`\`
Năm temp → **hai** register thật. Đây chính là phép màu của register allocation.

### 4.3. Bốn ví dụ tô màu

**Ví dụ A — tam giác (cần đúng 3 màu).** Ba temp \`x, y, z\` đôi một sống cùng lúc:
\`\`\`
x--y
 \\ |
  \\z   (mọi cặp đều có cạnh)
\`\`\`
Bậc mỗi đỉnh = 2. Cần **3 màu**: x→R1, y→R2, z→R3. Không thể 2 màu (đồ thị tam giác là đồ thị nhỏ nhất buộc 3 màu).

**Ví dụ B — đường thẳng (path, 2 màu đủ).** \`a–b–c–d\` (chuỗi). Tô xen kẽ: a→R1, b→R2, c→R1, d→R2. **2 màu** đủ.

**Ví dụ C — đồ thị rỗng (0 cạnh).** 4 temp không cái nào sống cùng lúc → 0 cạnh → **1 màu** đủ (tất cả chung 1 register, tái dùng qua thời gian).

**Ví dụ D — sao (star).** Một temp trung tâm \`h\` sống suốt, 4 temp \`p,q,r,s\` mỗi cái sống ngắn nhưng đều chồng \`h\`:
\`\`\`
   p   q
    \\ /
     h
    / \\
   r   s
\`\`\`
Bậc \`h\` = 4, các lá bậc 1. Cần **2 màu**: h→R1, còn p,q,r,s→R2 (chúng không nối nhau). Chú ý: bậc cao (4) **không** đồng nghĩa cần nhiều màu — \`h\` chỉ cần khác 1 màu với các lá.

⚠ **Lỗi thường gặp.** "Nhiều cạnh / bậc cao ⟹ cần nhiều màu" — sai. Số màu tối thiểu (chromatic number) phụ thuộc cấu trúc, không phải số cạnh. Ví dụ D có 4 cạnh nhưng chỉ cần 2 màu. Cái buộc thêm màu là **clique** (nhóm đỉnh đôi một kề): clique k đỉnh buộc ≥ k màu.

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Tô màu greedy luôn cho ít màu nhất chứ?"* — Không! Tô màu tối ưu là **NP-hard** (xem [Algorithms](../../../Algorithms/)) — không có thuật toán nhanh đảm bảo tối ưu cho mọi đồ thị. Compiler dùng **heuristic** (như Chaitin's algorithm: lặp đi gỡ đỉnh bậc < k rồi tô ngược lại). Greedy theo thứ tự tốt thường đủ tốt trong thực tế.
- *"Vì sao register allocation lại là đồ thị?"* — Vì quan hệ "xung đột" (không thể chung register) là quan hệ **đối xứng giữa từng cặp** — đúng định nghĩa cạnh vô hướng. Biến bài toán cấp phát thành bài toán đồ thị cho phép mượn toàn bộ lý thuyết tô màu.

🔁 **Dừng lại tự kiểm tra.** Interference graph có 4 đỉnh tạo thành **hình vuông** \`a–b–c–d–a\` (chu trình 4 cạnh, không có đường chéo). Cần mấy màu?

<details><summary>Đáp án</summary>
2 màu. Chu trình **chẵn** (4 đỉnh) tô được xen kẽ: a→R1, b→R2, c→R1, d→R2 — kiểm tra a≠b, b≠c, c≠d, d≠a đều khác ✓. (Chu trình **lẻ**, vd tam giác 3 đỉnh hay ngũ giác 5 đỉnh, mới cần 3 màu.)
</details>

📝 **Tóm tắt mục 4.**
- Interference graph: đỉnh = temp, cạnh = sống cùng lúc.
- Cấp phát register = tô màu bằng k màu (k = số register).
- Tô màu tối ưu là NP-hard → compiler dùng heuristic (greedy/Chaitin).
- Cái buộc nhiều màu là clique, không phải tổng số cạnh.

---

## 5. Spilling — khi register không đủ

### 5.1. Vì sao và khi nào

Nếu interference graph **không tô được bằng k màu** (max pressure > k), allocator phải **spill**: chọn một (hoặc vài) temp, **không** giữ trong register mà đẩy giá trị ra **bộ nhớ (stack frame)**. Mỗi lần dùng temp đó phải \`load\` từ bộ nhớ; mỗi lần ghi phải \`store\`.

**Định nghĩa (a):** **spill** = quyết định cất một temp trong bộ nhớ thay vì register, kèm chèn lệnh \`load\`/\`store\` quanh mỗi chỗ dùng. **(b — vì sao tồn tại):** vì register hữu hạn; khi pressure vượt k, không còn cách nào khác giữ tất cả trong register. **(c — số cụ thể):** một temp spill bị dùng trong vòng lặp chạy 1 triệu lần → thêm ~1 triệu lần \`load\` (mỗi lần ~100 chu kỳ RAM) ≈ 100 triệu chu kỳ phí thêm. Đó là lý do spill **đắt**.

💡 **Trực giác.** Quay lại ẩn dụ ghế họp: nếu 17 người cùng cần ghế mà chỉ 16 ghế, một người phải **ra hành lang ngồi** (bộ nhớ). Mỗi lần người đó cần phát biểu, phải **đi vào** phòng (load) rồi **đi ra** lại (store). Đi-ra-đi-vào tốn thời gian → ta chọn người **ít phải phát biểu nhất** ra hành lang.

⚠ **Lỗi thường gặp — spill đắt, đừng spill bừa.** Spill một temp nằm trong vòng lặp nóng (hot loop) có thể làm chương trình chậm nhiều lần. Heuristic phải tránh spill temp dùng nhiều, đặc biệt trong loop. Spill sai chỗ = "tối ưu" mà lại làm chậm.

### 5.2. Heuristic chọn temp spill

Khi buộc phải spill, chọn temp sao cho **thiệt hại nhỏ nhất**. Tiêu chí phổ biến (kết hợp thành "chi phí spill"):

$$\\text{spill\\_cost}(t) = \\frac{\\text{số lần dùng } t \\;(\\text{có trọng số loop})}{\\text{degree}(t) \\text{ trong interference graph}}$$

- **Tử số nhỏ** (ít lần dùng, không trong loop) → spill rẻ → ưu tiên spill.
- **Mẫu số lớn** (bậc cao = xung đột nhiều) → spill nó **giải phóng nhiều màu** cho hàng xóm → ưu tiên spill.
- Vậy chọn temp có **spill_cost nhỏ nhất**: dùng ít mà lại chặn nhiều đỉnh khác.

**Walk-through nhỏ.** k = 2 register, 3 temp \`x, y, z\` đôi một xung đột (tam giác → cần 3 màu > 2 → buộc spill 1 temp). Thống kê:

| temp | số lần dùng | trong loop? | degree | spill_cost |
| --- | --- | --- | --- | --- |
| x | 10 | có (×10) → 100 | 2 | 100/2 = 50 |
| y | 2 | không | 2 | 2/2 = 1 |
| z | 5 | không | 2 | 5/2 = 2.5 |

→ Spill **y** (cost 1, thấp nhất): ít dùng nhất, không trong loop. Sau khi spill \`y\` ra bộ nhớ, đồ thị còn \`x–z\` (1 cạnh) → tô 2 màu dễ dàng. Mã sinh ra: \`x→R1, z→R2\`, còn \`y\` mỗi lần dùng thì \`load\`/\`store\` qua stack.

❓ **Câu hỏi tự nhiên.**
- *"Spill xong là xong?"* — Chưa chắc. Sau khi chèn \`load\`/\`store\`, đôi khi cần **dựng lại** interference graph và tô lại (vì lệnh load/store cũng tạo temp ngắn). Lặp tới khi tô được. Đây là vòng lặp "build–color–spill" của Chaitin.
- *"Có thể không spill mà tách live range (live-range splitting) không?"* — Có, kỹ thuật nâng cao: cắt một live range dài thành nhiều đoạn ngắn để giảm pressure, đôi khi né được spill. Bài này chỉ giới thiệu spill cơ bản.

🔁 **Dừng lại tự kiểm tra.** k = 1 register. Ba temp \`a, b, c\` đôi một xung đột. Phải spill mấy temp?

<details><summary>Đáp án</summary>
Cần 3 màu nhưng chỉ 1 register → phải spill 2 temp (giữ 1 trong register, 2 ra bộ nhớ). Chọn 2 temp có spill_cost thấp nhất.
</details>

📝 **Tóm tắt mục 5.**
- Spill khi pressure > k: đẩy temp ra bộ nhớ, thêm load/store.
- Spill **đắt** (RAM chậm hơn register hàng chục–trăm lần), nhất là trong loop.
- Heuristic: spill temp dùng-ít / bậc-cao (spill_cost nhỏ).
- Sau spill có thể phải tô lại (vòng lặp build–color–spill).

---

## 6. Mục tiêu sinh mã (Targets)

Sau khi có IR đã tối ưu, codegen sinh mã cho một **target** cụ thể. Cùng một IR có thể sinh ra **nhiều** target khác nhau — đó là sức mạnh của kiến trúc compiler hiện đại.

### 6.1. Các target phổ biến

| Target | Là gì | Chạy ở đâu | Đặc điểm |
| --- | --- | --- | --- |
| **Native asm (x86-64 / ARM64)** | mã máy register machine | trực tiếp trên CPU | nhanh nhất; cần register allocation; phụ thuộc kiến trúc CPU |
| **WebAssembly (WASM)** | bytecode stack machine, di động | trình duyệt, Node, runtime WASM (Wasmtime) | gần native; sandbox an toàn; chạy được mọi nơi có engine WASM |
| **JVM bytecode** | bytecode stack machine | Java Virtual Machine | "viết một lần, chạy mọi nơi"; JIT compile lúc runtime |
| **JavaScript** | sinh ra mã JS nguồn | bất kỳ JS engine nào | "transpile"; vd TypeScript→JS, hay compile-to-JS |

💡 **Trực giác.** IR là **"ngôn ngữ trung gian phổ thông"** — như **tiếng Anh trong sân bay**. Source (Việt/Pháp/Nhật...) dịch về tiếng Anh **một lần**; rồi từ tiếng Anh dịch ra **bất kỳ** ngôn ngữ đích. Không cần dịch trực tiếp Việt→Nhật, Pháp→Nhật... (n×m cặp). Chỉ cần n bộ "về IR" + m bộ "IR ra target".

### 6.2. WebAssembly — đáng chú ý nhất

WASM là một **stack machine bytecode** (giống ý tưởng [L13](../lesson-03-bytecode-stack-vm/)!), được thiết kế làm "target biên dịch cho web". Cùng biểu thức \`(a + b) * c\`:
\`\`\`wasm
local.get $a    ;; đẩy a lên stack
local.get $b    ;; đẩy b
i32.add         ;; pop 2, đẩy a+b
local.get $c    ;; đẩy c
i32.mul         ;; pop 2, đẩy (a+b)*c
\`\`\`
Nhận ra không? **Y hệt mô hình stack machine của L13** — chỉ khác cú pháp. Vì WASM là stack machine, codegen ra WASM **không cần register allocation** (engine WASM tự lo việc đó khi nó JIT xuống native). Đây là lý do nhiều compiler nhắm WASM: đơn giản hóa back-end mà vẫn chạy gần native trong trình duyệt.

### 6.3. IR chung & LLVM — cross-compile

**LLVM** là hạ tầng compiler thực tế đứng sau Clang (C/C++), Rust, Swift, Julia... Ý tưởng cốt lõi:

\`\`\`
                          ┌─→ x86-64 backend  → mã Intel/AMD
nguồn C ─┐                │
nguồn Rust ─┼─→  LLVM IR ─┼─→ ARM64 backend   → mã Apple Silicon / điện thoại
nguồn Swift ─┘            │
                          └─→ WASM backend    → mã chạy trình duyệt
\`\`\`

- **Front-end** (mỗi ngôn ngữ một bộ) dịch source → **LLVM IR** chung.
- **Back-end** (mỗi kiến trúc một bộ) dịch LLVM IR → mã target, *bao gồm register allocation* (chính phần ta học hôm nay!).
- Thêm ngôn ngữ mới: chỉ viết 1 front-end. Thêm CPU mới: chỉ viết 1 back-end. Đây là **cross-compilation**: biên dịch trên máy Mac ra mã chạy cho điện thoại ARM.

### 6.4. AOT vs JIT

| | AOT (Ahead-Of-Time) | JIT (Just-In-Time) |
| --- | --- | --- |
| Biên dịch khi nào | **trước** khi chạy (lúc build) | **trong khi** chạy (lúc cần) |
| Ví dụ | C, C++, Rust, Go → binary | JVM, V8 (JavaScript), .NET CLR |
| Ưu | khởi động nhanh, không cần compiler lúc chạy | tối ưu theo dữ liệu thực tế (hot path), portable |
| Nhược | không biết hành vi runtime; binary theo kiến trúc | "warm-up" chậm lúc đầu; tốn bộ nhớ giữ compiler |

💡 **Trực giác.** AOT giống **nấu sẵn cơm hộp** ở nhà rồi mang đi — ăn là ăn ngay. JIT giống **nấu tại bàn** — chậm lúc đầu nhưng đầu bếp thấy bạn thích cay thì nêm thêm (tối ưu theo hành vi thật). JVM/V8 còn dùng cả hai: thông dịch lúc đầu, JIT compile phần "nóng" (chạy nhiều) sang native.

❓ **Câu hỏi tự nhiên.**
- *"WASM là AOT hay JIT?"* — WASM bytecode thường được sinh AOT (lúc build), nhưng engine WASM lại JIT/AOT nó xuống native lúc nạp. Lai cả hai.
- *"Vì sao Go là AOT mà vẫn nhanh dù không JIT?"* — Go AOT compile thẳng ra native với optimizer tốt; đánh đổi là không tối ưu runtime-adaptive như JIT, nhưng được khởi động tức thì và binary đơn giản.

📝 **Tóm tắt mục 6.**
- Một IR → nhiều target: native (x86/ARM), WASM, JVM, JS.
- WASM là stack machine — codegen không cần register alloc (engine lo).
- IR chung (LLVM) tách front-end/back-end → cross-compile n+m thay vì n×m.
- AOT compile trước khi chạy; JIT compile lúc chạy (tối ưu theo dữ liệu thực).

---

## 7. Tổng kết toàn lĩnh vực Compilers

Trình biên dịch đồ chơi của chúng ta giờ đã **hoàn chỉnh**. Đi lại toàn bộ pipeline, mỗi chặng là một lesson đã học:

\`\`\`
  mã nguồn (source code)
        │  "x = (a + b) * 2"
        ▼
  ┌─────────────┐   Front-end
  │ 1. Lexer    │   chuỗi ký tự → token: [x] [=] [(] [a] [+] [b] [)] [*] [2]
  ├─────────────┤
  │ 2. Parser   │   token → cây cú pháp (AST)
  ├─────────────┤
  │ 3. AST      │        =
  │             │       / \\
  │             │      x   *
  │             │         / \\
  │             │        +   2
  │             │       / \\
  │             │      a   b
  └─────────────┘
        │
        ▼
  ┌─────────────┐   Semantics (giữa)
  │ 4. Semantic │   kiểm tra kiểu (type), khai báo, scope
  │   analysis  │
  └─────────────┘
        │
        ▼
  ┌─────────────┐   Back-end (bài này + L11–L14)
  │ 5. IR       │   t1 = a + b ; t2 = t1 * 2 ; x = t2     (L11)
  ├─────────────┤
  │ 6. Optimize │   bỏ dead code, gập hằng (constant fold) (L12)
  ├─────────────┤
  │ 7. Codegen  │   liveness → tô màu → register alloc      (L15 — bài này)
  │             │   → chọn target (native / WASM / JVM)     (L14, L15)
  └─────────────┘
        │
        ▼
  máy thật chạy  ──►  R1 = a ; R1 += b ; R1 *= 2 ; store x, R1
\`\`\`

Từng mảnh ghép đã có:

| Giai đoạn | Lesson | Khái niệm cốt lõi |
| --- | --- | --- |
| Lexer | Front-end (01) | ký tự → token |
| Parser → AST | Front-end (01) | grammar, cây cú pháp |
| Semantic analysis | Semantics (02) | type checking, scope |
| IR (three-address) | [L11](../lesson-01-ir-three-address/) | temp vô hạn, mã ba địa chỉ |
| Optimization | [L12](../lesson-02-optimization/) | dead code, constant folding |
| Bytecode & Stack VM | [L13](../lesson-03-bytecode-stack-vm/) | stack machine, thông dịch |
| Control-flow codegen | [L14](../lesson-04-control-flow-codegen/) | if/loop → nhãn & nhảy |
| Register alloc & targets | **L15 (đây)** | liveness, tô màu, spill, targets |

→ Bạn đã đi từ một **chuỗi ký tự** tới **mã máy chạy được**, hiểu mọi mắt xích ở giữa. Đó là toàn bộ một trình biên dịch.

---

## 8. Hướng học tiếp — sau lĩnh vực Compilers

Lĩnh vực này dừng ở mức "đồ chơi nhưng hoàn chỉnh". Để đi xa hơn:

**Đọc sách kinh điển:**
- **Crafting Interpreters** (Robert Nystrom) — miễn phí online, xây 2 trình thông dịch/biên dịch từ đầu (tree-walking + bytecode VM). Dễ tiếp cận, cực kỳ thực hành. *Khuyên đọc đầu tiên.*
- **Compilers: Principles, Techniques, and Tools** ("Dragon Book", Aho/Lam/Sethi/Ullman) — kinh điển hàn lâm, sâu về lý thuyết lexer/parser/optimization.
- **Engineering a Compiler** (Cooper & Torczon) — cân bằng lý thuyết và kỹ thuật, chương register allocation rất tốt.

**Công cụ & hệ thống thật:**
- **LLVM** — học viết một front-end nhỏ phát ra LLVM IR (tutorial "Kaleidoscope" chính thức). Đây là cầu nối từ đồ chơi sang production.
- Đọc IR thật: \`clang -S -emit-llvm file.c\` để xem LLVM IR; \`go tool compile -S\` để xem assembly Go sinh ra.
- Thử một ngôn ngữ thật được thiết kế sạch: nguồn của **Lua**, hay back-end của **TinyGo** (compile Go → WASM).

**Kết nối sang các lĩnh vực khác trong kho học tập:**
- [Programming](../../../Programming/) — ngôn ngữ lập trình ở góc nhìn người dùng; hiểu compiler giúp bạn dùng ngôn ngữ sâu hơn (vì sao có closure, generics, GC...).
- [AI-ML](../../../AI-ML/) — các **compiler cho tensor** (XLA, TVM, MLIR) áp dụng *chính những ý tưởng này* (IR, optimization, codegen cho GPU/TPU) lên phép toán ma trận của mạng neural. Register allocation, liveness, graph coloring đều xuất hiện lại ở dạng cấp phát bộ nhớ GPU.
- [DataStructures — Graph](../../../DataStructures/03-Advanced/lesson-01-graph/) & [Algorithms](../../../Algorithms/) — interference graph & tô màu chỉ là một ví dụ; nhiều bài toán compiler khác cũng quy về đồ thị.
- [OperatingSystems](../../../OperatingSystems/) — compiler sinh mã, OS nạp và chạy mã đó; hai lĩnh vực gặp nhau ở ABI, linking, loader.

---

## 9. Bài tập

> Tất cả bài đều có **lời giải chi tiết** ở mục kế tiếp. Hãy thử tự làm (đặc biệt tự tô màu/cấp phát) trước khi xem đáp án.

**Bài 1 (liveness).** Cho đoạn IR:
\`\`\`
1: a = 5
2: b = a + 1
3: c = a + b
4: d = c + 1
5: ret d
\`\`\`
Tính live set sau mỗi dòng. Register pressure tối đa là bao nhiêu? Cần ít nhất mấy register?

**Bài 2 (dead code).** Trong đoạn sau, temp nào có live range rỗng (dead — gán mà không dùng)? Có thể xóa dòng nào?
\`\`\`
1: x = 10
2: y = 20
3: z = y + 5
4: ret z
\`\`\`

**Bài 3 (tự dựng interference graph + tô màu).** Cho đoạn IR:
\`\`\`
1: p = 1
2: q = 2
3: r = p + q
4: s = r + q
5: ret s
\`\`\`
(a) Tính live set sau mỗi dòng. (b) Dựng interference graph (liệt kê cạnh). (c) Tô màu với **k = 2** register. (d) Có cần spill không?

**Bài 4 (buộc spill).** Interference graph là một **tam giác**: 3 temp \`x, y, z\` đôi một kề. Chỉ có **k = 2** register. Cho thống kê: \`x\` dùng 8 lần (trong loop, trọng số ×10 ⇒ 80), \`y\` dùng 3 lần (ngoài loop), \`z\` dùng 4 lần (ngoài loop); bậc cả ba đều = 2. (a) Vì sao buộc spill? (b) Dùng heuristic spill_cost = (số lần dùng)/(degree), chọn temp nào để spill? (c) Sau spill, đồ thị còn lại tô được 2 màu không?

**Bài 5 (target — cùng IR, ba dạng mã).** Cho biểu thức \`(x - y) + z\`. Viết mã cho:
(a) Stack machine bytecode (kiểu L13);
(b) Register machine (x86-ish, dùng \`R1, R2\`);
(c) WebAssembly (\`local.get\`, \`i32.sub\`, \`i32.add\`).
Nhận xét: dạng nào cần cấp phát register?

**Bài 6 (AOT vs JIT — phân loại).** Phân loại mỗi hệ sau là AOT hay JIT (hoặc cả hai), giải thích 1 câu:
(a) \`gcc hello.c -o hello\`; (b) chạy \`node script.js\` (V8); (c) \`go build\`; (d) JVM chạy file \`.class\`; (e) trình duyệt nạp một module \`.wasm\`.

**Bài 7 (tổng hợp — pipeline).** Cho dòng nguồn \`result = (a + b) * (a - b)\`. Hãy mô phỏng pipeline: (a) viết IR ba địa chỉ (dùng \`t1, t2, t3\`); (b) tính live set sau mỗi dòng IR; (c) cần mấy register? (d) sinh mã register machine.

---

## Lời giải chi tiết

### Bài 1

Quét ngược:
- Dòng 5 dùng \`d\` → trước 5: {d}.
- Dòng 4 def \`d\`, use \`c\` → sau 4: {d}; trước 4: {c}.
- Dòng 3 def \`c\`, use \`a, b\` → sau 3: {c}; trước 3: {a, b}.
- Dòng 2 def \`b\`, use \`a\` → sau 2: {a, b}; trước 2: {a}. (\`a\` còn dùng ở dòng 3 nên vẫn sống.)
- Dòng 1 def \`a\` → sau 1: {a}.

| Sau dòng | Live set | Pressure |
| --- | --- | --- |
| 1 | {a} | 1 |
| 2 | {a, b} | 2 |
| 3 | {c} | 1 |
| 4 | {d} | 1 |
| 5 | {} | 0 |

Pressure tối đa = **2** (sau dòng 2). Cần **2 register**. (\`a, b\` sống cùng lúc nên khác register; \`c, d\` lần lượt tái dùng các ghế đó.)

### Bài 2

- \`x\` (dòng 1): gán nhưng **không** xuất hiện ở vế phải dòng nào sau đó → live range **rỗng** → **dead**.
- \`y\` (dòng 2): dùng ở dòng 3 → sống [2,3].
- \`z\` (dòng 3): dùng ở dòng 4 → sống [3,4].

→ Chỉ \`x\` là dead. **Xóa được dòng 1** (\`x = 10\`) mà không đổi kết quả. Đây là **dead-code elimination** từ optimization ([L12](../lesson-02-optimization/)), và liveness chính là phân tích phát hiện ra nó.

### Bài 3

**(a) Live set (quét ngược):**
- Dòng 5 dùng \`s\` → trước 5: {s}.
- Dòng 4 def \`s\`, use \`r, q\` → sau 4: {s}; trước 4: {r, q}.
- Dòng 3 def \`r\`, use \`p, q\` → sau 3: {r, q}; trước 3: {p, q}. (\`q\` còn dùng ở dòng 4 → vẫn sống.)
- Dòng 2 def \`q\` → sau 2: {p, q}.
- Dòng 1 def \`p\` → sau 1: {p}.

| Sau dòng | Live set |
| --- | --- |
| 1 | {p} |
| 2 | {p, q} |
| 3 | {r, q} |
| 4 | {s} |

**(b) Cạnh xung đột:** từ {p, q} → cạnh **p–q**; từ {r, q} → cạnh **q–r**. ({s} cô lập.) Đồ thị:
\`\`\`
p — q — r        s (cô lập)
\`\`\`
Đây là một **path** (đường thẳng), \`q\` ở giữa (bậc 2).

**(c) Tô màu k = 2:** \`p→R1\`, \`q→R2\` (khác \`p\`), \`r→R1\` (chỉ kề \`q=R2\`, nên R1 được), \`s→R1\` (cô lập). Hợp lệ: p≠q ✓, q≠r ✓.

**(d) Không cần spill** — max pressure = 2 = k. Tô được bằng đúng 2 màu.

### Bài 4

**(a) Vì sao buộc spill:** tam giác = 3 đỉnh đôi một kề = clique 3 → cần **3 màu**. Chỉ có k = 2 register < 3 → không tô được → buộc spill ít nhất 1 temp.

**(b) Heuristic spill_cost = dùng/degree:**

| temp | dùng (trọng số loop) | degree | spill_cost |
| --- | --- | --- | --- |
| x | 80 (trong loop) | 2 | 40 |
| y | 3 | 2 | 1.5 |
| z | 4 | 2 | 2 |

→ Chọn **y** (spill_cost = 1.5, thấp nhất): dùng ít nhất, không trong loop. **Không** spill \`x\` dù bậc bằng nhau, vì \`x\` trong loop nóng → spill nó rất đắt.

**(c) Sau spill \`y\`:** gỡ đỉnh \`y\` khỏi đồ thị → còn lại cạnh \`x–z\` (1 cạnh). Tô 2 màu: \`x→R1, z→R2\` ✓. \`y\` cất trong bộ nhớ, mỗi lần dùng thì load/store. Tô được 2 màu.

### Bài 5

Biểu thức \`(x - y) + z\`.

**(a) Stack machine bytecode:**
\`\`\`
PUSH x
PUSH y
SUB          ; stack: [x - y]
PUSH z
ADD          ; stack: [(x-y)+z]
\`\`\`

**(b) Register machine (x86-ish):**
\`\`\`
mov  R1, x
sub  R1, y       ; R1 = x - y
mov  R2, z
add  R1, R2      ; R1 = (x-y) + z
\`\`\`

**(c) WebAssembly:**
\`\`\`wasm
local.get $x
local.get $y
i32.sub
local.get $z
i32.add
\`\`\`

**Nhận xét:** chỉ **(b) register machine cần cấp phát register** (phải quyết định \`R1, R2\`). (a) stack và (c) WASM đều là stack machine — toán hạng ngầm trên stack, không cần register allocation ở bước sinh mã (engine WASM tự lo khi JIT xuống native).

### Bài 6

- **(a) \`gcc hello.c -o hello\`** — **AOT**: biên dịch ra binary trước khi chạy.
- **(b) \`node script.js\` (V8)** — **JIT** (lai): V8 thông dịch lúc đầu rồi JIT compile hàm "nóng" sang native trong khi chạy.
- **(c) \`go build\`** — **AOT**: ra binary native, không JIT lúc chạy.
- **(d) JVM chạy \`.class\`** — **JIT** (lai): bytecode được thông dịch, JVM JIT phần hot sang native runtime.
- **(e) trình duyệt nạp \`.wasm\`** — **lai**: WASM bytecode thường sinh AOT lúc build; engine lại JIT/AOT-compile nó xuống native lúc nạp module.

### Bài 7

Nguồn: \`result = (a + b) * (a - b)\`.

**(a) IR ba địa chỉ:**
\`\`\`
1: t1 = a + b
2: t2 = a - b
3: t3 = t1 * t2
4: result = t3
\`\`\`

**(b) Live set (quét ngược):**
- Dòng 4 use \`t3\` → trước 4: {t3}.
- Dòng 3 def \`t3\`, use \`t1, t2\` → sau 3: {t3}; trước 3: {t1, t2}.
- Dòng 2 def \`t2\`, use \`a, b\` → sau 2: {t1, t2}; trước 2: {t1, a, b... }. (\`t1\` sống từ dòng 1 tới dòng 3.)
- Dòng 1 def \`t1\`, use \`a, b\` → sau 1: {t1}.

| Sau dòng | Live set (chỉ xét temp) |
| --- | --- |
| 1 | {t1} |
| 2 | {t1, t2} |
| 3 | {t3} |
| 4 | {} |

**(c) Cần mấy register:** max pressure (temp) = 2 (sau dòng 2: \`t1, t2\` cùng sống). Cộng \`a, b\` vốn nằm sẵn 2 register tham số. Riêng các temp tính toán: **2 register** đủ. Interference: cạnh \`t1–t2\` duy nhất → tô 2 màu.

**(d) Mã register machine** (giả sử \`a→R1, b→R2\` đã có sẵn từ tham số; dùng \`R3\` làm temp thứ hai):
\`\`\`
mov  R3, R1       ; copy a
add  R3, R2       ; R3 = a + b   (= t1)
sub  R1, R2       ; R1 = a - b   (= t2)   (a, b không còn cần sau đây)
imul R3, R1       ; R3 = t1 * t2 (= t3 = result)
ret  R3
\`\`\`
Bốn temp khái niệm (\`t1, t2, t3\` + \`result\`) gói gọn trong các register tái dùng. Đây là toàn bộ chuỗi: source → IR → liveness → cấp phát → mã native.

---

## Kết thúc lĩnh vực Compilers

Đây là **bài học cuối** của lĩnh vực **Compilers**. Không có bài kế tiếp trong lĩnh vực này.

Bạn đã đi trọn con đường:

> **source → lexer → parser → AST → semantic analysis → IR → optimize → codegen (liveness → tô màu → register alloc → target) → máy chạy.**

Trình biên dịch đồ chơi đã hoàn chỉnh — đủ để hiểu cách *mọi* trình biên dịch thật vận hành.

**Bước tiếp theo (xem chi tiết ở [mục 8](#8-hướng-học-tiếp--sau-lĩnh-vực-compilers)):**
- Đọc **Crafting Interpreters** (thực hành) rồi **Dragon Book** (lý thuyết).
- Nghịch **LLVM** (tutorial Kaleidoscope) để chạm vào hạ tầng compiler thật.
- Mở rộng sang [Programming](../../../Programming/), và đặc biệt [AI-ML](../../../AI-ML/) — nơi *chính những ý tưởng này* (IR, optimization, codegen, cấp phát) tái xuất trong **compiler cho tensor** (XLA, TVM, MLIR) chạy mạng neural trên GPU/TPU.

Tài liệu kèm theo: [visualization.html](./visualization.html) — Liveness analyzer, Graph coloring tương tác, và Target explorer.
`;
