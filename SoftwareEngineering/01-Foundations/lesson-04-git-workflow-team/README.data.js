// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: SoftwareEngineering/01-Foundations/lesson-04-git-workflow-team/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Git workflow cho nhóm

## Mục tiêu

- Hiểu **vì sao một nhóm cần chiến lược branch**, thay vì để mọi người push thẳng vào \`main\`.
- Nắm **feature branch workflow**: mỗi tính năng một branch, hợp nhất qua **Pull Request / Merge Request** kèm review.
- So sánh hai chiến lược nhánh phổ biến: **GitFlow** và **Trunk-Based Development** — ưu/nhược, khi nào dùng cái nào.
- Hiểu **merge conflict** xảy ra như thế nào và quy trình giải quyết từng bước.
- Phân biệt **merge** và **rebase** ở góc độ lịch sử commit, biết khi nào dùng cái nào và cảnh báo "không rebase nhánh đã chia sẻ".
- Viết **commit message** rõ ràng theo quy ước (Conventional Commits).

## Kiến thức tiền đề

- **Lệnh git nền tảng** (\`add\`, \`commit\`, \`push\`, \`pull\`, \`branch\`, \`checkout\`) — học ở [Programming — Môi trường dev & Git](../../../Programming/lesson-02-dev-environment-git/). Bài đó dạy *cách dùng git một mình*; bài này dạy *cách dùng git cùng nhiều người*.
- Đã hiểu vòng đời phần mềm là một nỗ lực **nhóm** — xem [Lesson 01 — SDLC & vai trò kỹ sư](../lesson-01-sdlc-vai-tro-ky-su/).
- Yêu cầu được chia thành các đầu việc cụ thể — xem [Lesson 03 — Yêu cầu & đặc tả](../lesson-03-yeu-cau-dac-ta/) (mỗi user story thường tương ứng một feature branch).

> 💡 **Ranh giới với "git cơ bản".** [Bài git ở Programming](../../../Programming/lesson-02-dev-environment-git/) trả lời câu hỏi *"làm sao commit và push code của tôi?"*. Bài này trả lời câu hỏi *"khi 5 người cùng sửa một codebase, làm sao họ không giẫm chân nhau, không phá \`main\`, và hợp nhất công việc một cách an toàn?"*. Ở đây ta giả định bạn đã biết \`git add\`/\`commit\`/\`push\` — không nhắc lại — và chỉ tập trung vào **workflow cộng tác**.

---

## 1. Vì sao cần chiến lược branch khi làm nhóm

💡 **Trực giác.** Hãy hình dung một cuốn sổ chung mà cả nhóm cùng viết lên *cùng một trang, cùng lúc, bằng cùng một cây bút*. Người này viết dở câu thì người kia đã xóa đi viết đè. \`main\` chính là "trang chung" đó. Branch giống như mỗi người được phát **một tờ giấy nháp riêng** để viết xong xuôi, rồi mới dán phần của mình vào sổ chung sau khi cả nhóm đọc lại.

### 1.1 Vấn đề khi tất cả push thẳng vào \`main\`

Giả sử nhóm 3 người (An, Bình, Chi) cùng làm trên một nhánh \`main\` duy nhất:

\`\`\`
An:   sửa file thanh-toan.go, code đang viết dở (chưa chạy được) → push lên main
Bình: pull về → main giờ không build được → Bình bị kẹt, không làm tiếp được
Chi:  pull về → cũng không build → cả nhóm dừng vì code dở của An
\`\`\`

Những hậu quả cụ thể:

| Vấn đề | Vì sao xảy ra |
|--------|---------------|
| **\`main\` thường xuyên hỏng** | Ai đó push code chưa chạy được → cả nhóm pull về là kẹt |
| **Không thể review trước khi vào** | Code đã nằm trên \`main\` rồi mới đọc thì đã muộn |
| **Lịch sử rối** | Commit của 3 người đan xen, khó biết thay đổi nào thuộc tính năng nào |
| **Khó rollback** | Muốn gỡ một tính năng lỗi nhưng commit của nó nằm xen kẽ commit người khác |
| **Xung đột liên tục** | Mọi người sửa cùng vùng code mà không có ranh giới |

> ⚠ **Lỗi thường gặp.** "Nhóm nhỏ 2-3 người thì cứ push thẳng \`main\` cho nhanh." Ban đầu có vẻ tiện, nhưng chỉ cần một lần ai đó push code dở làm hỏng \`main\` lúc người khác đang gấp là cả nhóm trả giá. Quy tắc cốt lõi: **\`main\` luôn ở trạng thái chạy được** (deployable). Mọi thứ chưa chắc chắn phải nằm trên branch riêng.

> ❓ **"Branch có làm code bị 'lệch' nhau không, ai cũng có bản riêng?"** Branch chỉ là một *con trỏ tới một commit*, rất nhẹ — không phải bản copy toàn bộ repo. Khi bạn \`git checkout -b feature-x\`, git chỉ tạo thêm một nhãn trỏ vào commit hiện tại. Code chỉ "lệch" khi bạn commit lên branch đó, và sự lệch này là *có chủ đích* — để cô lập công việc dang dở. Khi xong, ta hợp nhất lại.

> 🔁 **Dừng lại tự kiểm tra.** Vì sao việc giữ \`main\` luôn "chạy được" lại quan trọng với cả nhóm, không chỉ cá nhân?
> <details><summary>Đáp án</summary>Vì <code>main</code> là điểm xuất phát chung: ai cũng <code>pull</code> từ đó để bắt đầu việc mới, và thường <code>main</code> được tự động triển khai (deploy). Nếu <code>main</code> hỏng, (1) người mới checkout về không build được → kẹt; (2) bản deploy có thể vỡ ngoài production. Một người làm hỏng <code>main</code> = cả nhóm + người dùng cùng chịu.</details>

📝 **Tóm tắt mục 1.** Push thẳng vào \`main\` khiến code dở của một người làm kẹt cả nhóm, không review được, lịch sử rối, khó rollback. Giải pháp: cô lập công việc trên branch riêng và giữ \`main\` luôn ở trạng thái chạy được.

---

## 2. Feature branch workflow

💡 **Trực giác.** Mỗi tính năng (hoặc sửa lỗi) được làm trên **một branch riêng**, tách khỏi \`main\`. Khi xong và đã review, branch đó được "dán" vào \`main\` qua một **Pull Request (PR)** — trên GitLab gọi là **Merge Request (MR)**, cùng ý nghĩa. PR là nơi đồng đội đọc code, bình luận, yêu cầu sửa *trước khi* nó vào \`main\`.

### 2.1 Vòng đời một feature branch

\`\`\`
1. Tạo branch từ main:     git checkout main && git pull
                           git checkout -b feature/gio-hang
2. Làm việc & commit:      ...sửa code... git commit -m "feat: thêm giỏ hàng"
3. Đẩy branch lên remote:  git push -u origin feature/gio-hang
4. Mở Pull Request:        feature/gio-hang  →  main   (trên GitHub/GitLab)
5. Đồng đội review:        bình luận, yêu cầu sửa → bạn commit thêm
6. Được duyệt → Merge:     branch hợp nhất vào main
7. Xóa branch:             git branch -d feature/gio-hang
\`\`\`

### 2.2 Sơ đồ branch (ascii)

Hai người làm hai tính năng song song, không giẫm chân nhau:

\`\`\`
                  feature/gio-hang
                 ●────●────●  (An)
                /           \\
   main  ●────●─────────────●────●   ← merge giỏ hàng rồi merge tìm kiếm
                \\                /
                 ●────●────●────  (Bình)
                  feature/tim-kiem
\`\`\`

- \`main\` luôn sạch; mỗi \`●\` rẽ nhánh là một commit cô lập trên branch riêng.
- Hai branch tiến hành **song song**; chỉ hợp nhất vào \`main\` khi từng cái xong và được duyệt.

### 2.3 Pull Request giải quyết được gì

| Lợi ích của PR | Giải thích |
|----------------|-----------|
| **Review trước khi vào \`main\`** | Đồng đội đọc diff, bắt lỗi/góp ý *trước* khi code chạm \`main\` |
| **Chạy CI tự động** | Test + build chạy trên branch; PR đỏ thì chặn merge → \`main\` không hỏng |
| **Ghi lại lý do thay đổi** | Mô tả PR + thảo luận lưu lại "vì sao" — tài liệu sống cho sau này |
| **Đơn vị hợp nhất rõ ràng** | Một PR = một tính năng → dễ rollback nguyên cụm nếu cần |

> ⚠ **Lỗi thường gặp.** **PR khổng lồ** (sửa 60 file, +3000 dòng). Reviewer không đủ sức đọc kỹ → review qua loa, lỗi lọt lưới. Giữ PR **nhỏ và một mục đích**: dễ review, ít xung đột, merge nhanh. Nếu tính năng to, chia thành nhiều PR nhỏ nối tiếp.

> ❓ **"Tôi phải đợi review xong mới làm tiếp được à? Mất thời gian quá."** Không phải đợi *không làm gì*. Trong lúc PR đang chờ review, bạn tạo branch mới cho việc tiếp theo (rẽ từ \`main\` hoặc từ branch đang chờ nếu phụ thuộc). Đó là lý do branch phải **nhẹ và nhanh tạo**. Bí quyết để review nhanh là PR nhỏ — reviewer đọc 50 dòng mất 10 phút, đọc 3000 dòng thì để đó cả tuần.

> 🔁 **Dừng lại tự kiểm tra.** PR (Pull Request) khác gì với lệnh \`git merge\` chạy trên máy bạn?
> <details><summary>Đáp án</summary><code>git merge</code> hợp nhất ngay lập tức trên máy bạn — không ai kiểm tra. PR là một <b>cổng kiểm soát</b> trên server (GitHub/GitLab): đề nghị hợp nhất branch vào <code>main</code>, mở ra để đồng đội review, chạy CI tự động, rồi mới merge khi được duyệt. PR = merge + review + CI + thảo luận, thay vì merge "âm thầm".</details>

📝 **Tóm tắt mục 2.** Feature branch workflow: mỗi tính năng một branch → push → mở PR/MR → review + CI → merge vào \`main\` → xóa branch. PR là cổng kiểm soát giúp review trước khi code chạm \`main\`. Giữ PR nhỏ và một mục đích.

---

## 3. Các chiến lược nhánh: GitFlow vs Trunk-Based Development

💡 **Trực giác.** Feature branch là *cơ chế*; **chiến lược nhánh** là *bộ quy ước* về việc có những loại branch nào, sống bao lâu, hợp nhất ra sao. Hai trường phái đối lập: **GitFlow** nhiều loại branch, sống lâu, kỷ luật chặt — hợp với sản phẩm có nhiều phiên bản (version) phát hành; **Trunk-Based** ít branch, sống ngắn, merge liên tục — hợp với đội release nhanh và thường xuyên.

### 3.1 GitFlow

GitFlow định nghĩa các loại branch cố định:

| Branch | Vai trò | Sống bao lâu |
|--------|---------|--------------|
| **\`main\`** | Chỉ chứa code đã phát hành (mỗi commit là một bản release) | Vĩnh viễn |
| **\`develop\`** | Nhánh tích hợp — nơi gom mọi tính năng đang phát triển | Vĩnh viễn |
| **\`feature/*\`** | Một tính năng, rẽ từ \`develop\`, merge lại \`develop\` | Ngắn-trung |
| **\`release/*\`** | Chuẩn bị phát hành: sửa lỗi cuối, đóng băng tính năng | Ngắn |
| **\`hotfix/*\`** | Sửa lỗi khẩn cấp trên production, rẽ từ \`main\` | Rất ngắn |

\`\`\`
main      ●───────────────●(v1.0)───────────●(v1.1)
                         /        \\         /
release   .          ●──●          \\   ●──●
                    /                \\ /
develop   ●──●──●──●────●──●──●───────●────●──●
              \\  /        \\  /
feature        ●           ●   (mỗi tính năng rẽ ra & gộp lại develop)
\`\`\`

- Luồng chính: \`feature\` → \`develop\` → (đến kỳ release) \`release\` → \`main\` (+ gắn tag version).
- \`hotfix\` rẽ thẳng từ \`main\` để vá production gấp, rồi merge ngược về cả \`main\` và \`develop\`.

**Ưu điểm:** ranh giới rõ ràng giữa "đang phát triển" (\`develop\`) và "đã phát hành" (\`main\`); hỗ trợ tốt việc duy trì **nhiều phiên bản song song** (ví dụ vẫn vá v1.x trong khi phát triển v2.0).

**Nhược điểm:** nhiều loại branch → phức tạp, dễ nhầm; branch sống lâu → tích hợp muộn → **merge conflict lớn** (xem mục 4); không hợp với triển khai liên tục (continuous deployment).

### 3.2 Trunk-Based Development

Trunk-Based giảm tối đa số branch: chỉ một nhánh chính (\`main\`, gọi là "trunk"), mọi người tạo **branch ngắn** (sống vài giờ tới 1-2 ngày) rồi merge vào \`main\` thật nhanh.

\`\`\`
main  ●──●──●──●──●──●──●──●──●   ← merge liên tục, nhiều lần mỗi ngày
       \\    \\      \\    \\
        ●    ●      ●    ●         ← branch siêu ngắn: tạo sáng, merge chiều
\`\`\`

- Branch chỉ tồn tại đủ để làm một thay đổi nhỏ + review nhanh, rồi merge ngay.
- Vì merge thường xuyên, mọi người luôn làm trên code gần nhất → ít xung đột, xung đột nhỏ.
- **Feature flag** giải bài toán "tính năng chưa xong nhưng đã merge": code tính năng dở được bọc trong một công tắc (\`if featureFlag.gioHangMoi { ... }\`) đang **tắt** trên production. Code vào \`main\` an toàn mà người dùng chưa thấy; khi xong thì bật flag.

> 💡 **Vì sao feature flag thay được branch dài?** Branch dài cô lập code dở bằng cách *giữ nó ngoài \`main\`* — cái giá là tích hợp muộn, conflict lớn. Feature flag cô lập bằng cách *cho code vào \`main\` nhưng tắt nó* — vẫn tích hợp sớm, không conflict, đổi lại phải dọn flag sau khi tính năng ổn định.

**Ưu điểm:** tích hợp liên tục → conflict nhỏ & ít; \`main\` luôn là nguồn chân lý mới nhất; hợp hoàn hảo với CI/CD và release nhiều lần mỗi ngày.

**Nhược điểm:** đòi hỏi **test tự động mạnh** (vì merge vào \`main\` liên tục, không có lưới \`develop\` đỡ); cần kỷ luật feature flag (quên dọn flag cũ → code rối); khó duy trì nhiều version cũ song song.

### 3.3 So sánh & khi nào dùng cái nào

| Tiêu chí | GitFlow | Trunk-Based |
|----------|---------|-------------|
| Số loại branch | Nhiều (5 loại) | Ít (trunk + branch ngắn) |
| Tuổi đời branch | Dài | Rất ngắn (giờ/ngày) |
| Tần suất merge | Theo kỳ release | Nhiều lần/ngày |
| Kích thước conflict | To (tích hợp muộn) | Nhỏ (tích hợp sớm) |
| Hợp với | Sản phẩm nhiều version, release theo đợt | Web/SaaS release liên tục |
| Yêu cầu CI/CD | Vừa | **Cao** (bắt buộc test mạnh) |
| Quản lý "tính năng dở" | Giữ trên branch dài | Feature flag |

**Khi nào chọn cái nào:**
- **Team nhỏ, web/SaaS, release liên tục** (nhiều lần mỗi ngày) → **Trunk-Based**. Ví dụ: một startup làm app, ngày deploy vài lần. Branch dài chỉ tổ gây conflict.
- **Sản phẩm cài đặt tại khách, nhiều phiên bản phải hỗ trợ song song** (v1.x, v2.x cùng được vá) → **GitFlow**. Ví dụ: phần mềm desktop bán theo license, khách A dùng v1, khách B dùng v2, cả hai cần hotfix riêng.

> ⚠ **Lỗi thường gặp.** Áp **GitFlow cho một team nhỏ release liên tục**. Nhánh \`develop\` + \`release\` trở thành thủ tục thừa, branch sống lâu sinh conflict to, mọi merge thành cực hình. Chọn chiến lược theo **nhịp phát hành** của bạn, không theo "cái gì nghe có vẻ chuyên nghiệp".

> ❓ **"Trunk-Based nghe đơn giản hơn, sao không phải ai cũng dùng?"** Vì nó **dồn gánh nặng sang test tự động và feature flag**. Khi mọi thay đổi vào \`main\` nhiều lần mỗi ngày mà không có \`develop\` đỡ, chỉ cần test yếu là \`main\` (đang được deploy) hỏng ngay. Trunk-Based "đơn giản về branch" nhưng "đòi hỏi cao về kỷ luật test". Không có test mạnh thì GitFlow an toàn hơn.

> 🔁 **Dừng lại tự kiểm tra.** Một nhóm dùng branch sống 3 tuần mới merge, lần nào merge cũng conflict khổng lồ mất cả ngày. Chiến lược nào sẽ giảm đau này, và cơ chế nào giúp tính năng chưa xong vẫn vào \`main\` được?
> <details><summary>Đáp án</summary><b>Trunk-Based Development</b> — merge branch ngắn vào <code>main</code> nhiều lần mỗi ngày, nên mỗi lần hợp nhất chỉ chênh vài thay đổi → conflict nhỏ. Tính năng chưa hoàn thiện được bọc trong <b>feature flag</b> (đang tắt) để code vào <code>main</code> sớm mà người dùng chưa thấy. Đổi lại nhóm phải có bộ test tự động mạnh.</details>

📝 **Tóm tắt mục 3.** GitFlow = nhiều branch sống lâu (\`main\`/\`develop\`/\`feature\`/\`release\`/\`hotfix\`), hợp sản phẩm nhiều version, release theo đợt. Trunk-Based = branch ngắn merge liên tục vào \`main\` + feature flag, hợp release liên tục nhưng đòi test mạnh. Chọn theo nhịp phát hành, không theo "nghe oai".

---

## 4. Merge conflict — vì sao xảy ra và cách giải quyết

💡 **Trực giác.** Conflict xảy ra khi **hai người sửa cùng một vùng** của cùng một file theo hai hướng khác nhau, rồi cùng muốn hợp nhất. Git tự gộp được khi hai người sửa **vùng khác nhau** (ví dụ người sửa dòng 10, người sửa dòng 80). Nhưng nếu cả hai sửa **cùng dòng 10**, git không biết chọn bản nào → nó dừng lại và hỏi *bạn* quyết định.

### 4.1 Tình huống cụ thể

File \`gia.go\` ban đầu có dòng:

\`\`\`go
giaVAT := giaGoc * 1.10   // thuế 10%
\`\`\`

- **An** (branch \`feature/sua-thue\`) đổi thành \`* 1.08\` (thuế xuống 8%).
- **Bình** (branch \`feature/lam-tron\`) đổi thành \`* 1.10\` nhưng thêm làm tròn: \`math.Round(giaGoc * 1.10)\`.

An merge trước, \`main\` thành \`* 1.08\`. Khi Bình merge, git thấy *cùng dòng đó* đã bị đổi theo hai hướng → conflict.

### 4.2 Dấu hiệu xung đột trong file

Sau khi merge bị conflict, mở \`gia.go\` sẽ thấy git chèn các dấu mốc:

\`\`\`go
<<<<<<< HEAD
giaVAT := giaGoc * 1.08   // thuế 10% → 8%
=======
giaVAT := math.Round(giaGoc * 1.10)   // làm tròn
>>>>>>> feature/lam-tron
\`\`\`

Ý nghĩa các dấu mốc:

| Dấu | Nghĩa |
|-----|-------|
| \`<<<<<<< HEAD\` | Bắt đầu **phiên bản của bạn** (nhánh bạn đang đứng — ở đây là \`main\` sau khi An merge) |
| \`=======\` | Đường phân cách giữa hai phiên bản |
| \`>>>>>>> feature/lam-tron\` | Kết thúc — phần phía dưới là **phiên bản nhánh đang merge vào** |

### 4.3 Giải quyết từng bước

1. **\`git status\`** — xem file nào đang conflict (\`Unmerged paths\`).
2. **Mở file**, tìm các khối \`<<<<<<<\` ... \`>>>>>>>\`.
3. **Quyết định nội dung đúng** — không phải "chọn một trong hai" một cách máy móc, mà hiểu *ý định cả hai* rồi gộp cho đúng nghiệp vụ. Ở ví dụ trên, đúng nhất là **gộp cả hai ý**: thuế 8% *và* làm tròn:
   \`\`\`go
   giaVAT := math.Round(giaGoc * 1.08)   // thuế 8% + làm tròn
   \`\`\`
4. **Xóa hết** các dấu \`<<<<<<<\`, \`=======\`, \`>>>>>>>\`.
5. **\`git add gia.go\`** — đánh dấu file đã giải quyết xong.
6. **\`git commit\`** (nếu đang merge) hoặc **\`git rebase --continue\`** (nếu đang rebase) để hoàn tất.
7. **Build & test lại** — giải conflict xong không có nghĩa code đúng; phải chạy lại để chắc.

> ⚠ **Lỗi thường gặp.** (1) **Quên xóa dấu mốc** \`<<<<<<<\` → code không compile (dấu đó không phải cú pháp hợp lệ). (2) **Chọn bừa một bên** mà không hiểu thay đổi của người kia → mất tính năng họ vừa thêm. (3) **Không build/test sau khi giải** → tưởng xong nhưng nghiệp vụ sai. Luôn đọc hiểu *cả hai phía* trước khi gộp.

> ❓ **"Conflict có phải là lỗi của ai đó không?"** Không — conflict là **bình thường** khi nhiều người làm song song, không phải dấu hiệu ai làm sai. Nó chỉ là lúc git nói "tôi không tự quyết được, cần con người". Cách *giảm* conflict: branch ngắn, merge \`main\` về branch của mình thường xuyên, PR nhỏ (xem mục 3 Trunk-Based). Cách *giải* conflict: bình tĩnh đọc cả hai phía, gộp theo nghiệp vụ.

> 🔁 **Dừng lại tự kiểm tra.** Vì sao branch sống càng lâu thì conflict càng có xu hướng *to* hơn?
> <details><summary>Đáp án</summary>Branch càng sống lâu thì <code>main</code> càng tiến xa khỏi điểm bạn rẽ ra, càng nhiều người sửa nhiều vùng code. Khi cuối cùng merge, số "vùng chồng lấn" tích tụ lớn → conflict nhiều và rối. Đây chính là lý do Trunk-Based ưa branch ngắn merge liên tục: mỗi lần chỉ chênh vài thay đổi nên conflict nhỏ.</details>

📝 **Tóm tắt mục 4.** Conflict xảy ra khi hai người sửa cùng vùng cùng file. Git chèn dấu \`<<<<<<< / ======= / >>>>>>>\`; giải bằng cách hiểu ý cả hai → gộp đúng nghiệp vụ → xóa dấu → \`git add\` → commit → **build & test lại**. Conflict là bình thường; branch ngắn + merge thường xuyên giúp conflict nhỏ.

---

## 5. merge vs rebase

💡 **Trực giác.** Khi đưa thay đổi từ \`main\` vào branch của bạn (hoặc ngược lại), có hai cách "kể lại lịch sử": **merge** giữ nguyên lịch sử thật, tạo thêm một "commit hợp nhất" nối hai dòng lại — như ghi vào nhật ký "ngày X, hai nhánh gặp nhau". **rebase** *viết lại* lịch sử, dời các commit của bạn lên *trên đỉnh* \`main\` mới nhất — như chép lại nhật ký cho thẳng hàng, giả vờ bạn bắt đầu từ \`main\` mới nhất ngay từ đầu.

### 5.1 merge — giữ lịch sử nhánh

\`\`\`
        A───B───C  feature
       /         \\
●───●──────────────M  main   ← M là "merge commit" nối hai nhánh
       D───E
\`\`\`

- Tạo một **merge commit** (\`M\`) có *hai cha*. Lịch sử rẽ nhánh được giữ nguyên.
- Lệnh: trên \`main\`, \`git merge feature\`.
- **Ưu:** không viết lại lịch sử → an toàn cho nhánh đã chia sẻ; thấy rõ "tính năng này đến từ nhánh nào, gộp lúc nào".
- **Nhược:** lịch sử có nhiều merge commit, đồ thị rối khi nhìn lại.

### 5.2 rebase — làm phẳng lịch sử

\`\`\`
trước:  ●───●───D───E        main
              \\
               A───B───C      feature

sau rebase feature lên main:
        ●───●───D───E───A'──B'──C'   ← A,B,C được "chép lại" thành A',B',C' lên đỉnh main
\`\`\`

- Lệnh: trên \`feature\`, \`git rebase main\`.
- Các commit \`A,B,C\` được *tạo lại* (hash mới: \`A',B',C'\`) như thể bạn vừa rẽ nhánh từ \`E\`. Không có merge commit → lịch sử thẳng tắp, dễ đọc.
- **Ưu:** lịch sử tuyến tính, sạch, dễ \`git log\` và \`git bisect\`.
- **Nhược:** **viết lại lịch sử** (đổi hash). Nguy hiểm nếu nhánh đã được người khác pull về.

### 5.3 Khi nào dùng cái nào

| Tình huống | Nên dùng |
|------------|----------|
| Cập nhật branch riêng của bạn theo \`main\` mới (chưa ai pull) | **rebase** — lịch sử thẳng, gọn |
| Đưa tính năng đã xong vào \`main\` chung | **merge** (qua PR) — giữ ngữ cảnh "tính năng đến từ đâu" |
| Branch đã được người khác pull / đang chia sẻ | **merge** — tuyệt đối không rebase |
| Dọn các commit nháp lộn xộn trước khi mở PR | **rebase** (interactive, để squash) |

> ⚠ **Cảnh báo quan trọng — KHÔNG rebase nhánh đã push chung.** rebase đổi hash commit. Nếu đồng đội đã pull nhánh đó về, lịch sử của họ và của bạn lệch nhau → khi họ pull lại sẽ rối loạn (git báo divergent, dễ tạo commit trùng lặp hoặc mất commit). **Quy tắc vàng:** chỉ rebase commit *chỉ mình bạn có* (nhánh riêng, chưa ai dùng). Nhánh đã chia sẻ → dùng merge.

> ❓ **"Vậy rebase nguy hiểm thì né luôn cho lành?"** Không cần né hẳn — chỉ cần dùng đúng chỗ. rebase rất hữu ích để **giữ branch riêng của bạn luôn tươi** (theo kịp \`main\`) và **dọn lịch sử nháp trước khi mở PR** cho gọn. Ranh giới đơn giản: *commit nào còn riêng tư → rebase thoải mái; commit nào đã chia sẻ → đừng động vào, dùng merge*.

> 🔁 **Dừng lại tự kiểm tra.** Bạn và đồng nghiệp cùng làm trên branch \`feature/bao-cao\` đã push lên remote. Bạn \`git rebase main\` rồi \`git push --force\`. Điều gì xảy ra với đồng nghiệp?
> <details><summary>Đáp án</summary>Tai họa. <code>rebase</code> đã viết lại hash các commit; <code>push --force</code> ghi đè lịch sử trên remote. Đồng nghiệp vẫn giữ lịch sử <i>cũ</i> trên máy họ; lần pull tiếp theo git báo lịch sử phân kỳ (divergent), commit mới của họ có thể mất hoặc bị nhân đôi. Đây đúng là tình huống "không rebase nhánh đã chia sẻ" — lẽ ra phải dùng <code>merge</code>.</details>

📝 **Tóm tắt mục 5.** merge = giữ lịch sử thật, tạo merge commit, an toàn cho nhánh chung. rebase = viết lại lịch sử cho thẳng, sạch nhưng đổi hash → **chỉ dùng cho commit riêng tư chưa chia sẻ**. Quy tắc vàng: không bao giờ rebase (rồi force-push) một nhánh người khác đã pull.

---

## 6. Commit message tốt — quy ước Conventional Commits

💡 **Trực giác.** Commit message là lời nhắn gửi cho *chính bạn và đồng đội trong tương lai* đang đọc \`git log\` để hiểu "vì sao dòng này đổi". Một message tốt trả lời được "thay đổi *loại gì*, ở *phạm vi nào*, *làm gì*" chỉ trong một dòng.

### 6.1 Cấu trúc Conventional Commits

\`\`\`
<loại>(<phạm vi>): <mô tả ngắn>

<thân — giải thích VÌ SAO, nếu cần>
\`\`\`

Các \`<loại>\` thường dùng:

| Loại | Khi nào dùng |
|------|--------------|
| \`feat\` | Thêm tính năng mới |
| \`fix\` | Sửa lỗi |
| \`docs\` | Chỉ thay đổi tài liệu |
| \`refactor\` | Sửa cấu trúc code, không đổi hành vi |
| \`test\` | Thêm/sửa test |
| \`chore\` | Việc lặt vặt (cập nhật thư viện, cấu hình) |

### 6.2 Ví dụ tốt / xấu

| ❌ Xấu | ✅ Tốt | Vì sao |
|--------|--------|--------|
| \`fix bug\` | \`fix(thanh-toan): tính đúng thuế VAT 8% thay vì 10%\` | Xấu: bug nào? Tốt: rõ phạm vi + nội dung |
| \`update\` | \`feat(gio-hang): thêm nút xóa sản phẩm khỏi giỏ\` | Xấu: update cái gì? |
| \`asdfgh\` / \`.\` | \`docs(readme): bổ sung hướng dẫn cài đặt\` | Message rác = vô dụng khi tra cứu |
| \`sửa nhiều thứ\` | (tách thành nhiều commit, mỗi cái một mục đích) | Một commit nên một mục đích |

> ⚠ **Lỗi thường gặp.** Gom mọi thứ vào **một commit khổng lồ** với message \`WIP\` hoặc \`update\`. Khi cần tìm "commit nào làm hỏng tính năng X" (dùng \`git bisect\`), commit gộp khiến không khoanh vùng được. Mỗi commit = một thay đổi logic, một message mô tả nó.

> 🔁 **Dừng lại tự kiểm tra.** Viết lại commit message xấu \`"fixed it"\` cho tình huống: bạn vừa sửa lỗi đăng nhập bị treo khi mật khẩu rỗng.
> <details><summary>Đáp án</summary>Ví dụ: <code>fix(dang-nhap): xử lý trường hợp mật khẩu rỗng gây treo</code>. Có <b>loại</b> (<code>fix</code>), <b>phạm vi</b> (<code>dang-nhap</code>), và <b>mô tả cụ thể</b> điều đã sửa — người đọc <code>git log</code> hiểu ngay mà không cần mở diff.</details>

📝 **Tóm tắt mục 6.** Commit message theo Conventional Commits: \`<loại>(<phạm vi>): <mô tả>\`. Mỗi commit một mục đích, mô tả cụ thể "đổi gì" để \`git log\` thành tài liệu tra cứu được. Tránh \`WIP\`/\`update\`/\`fix bug\` mơ hồ.

---

## 7. Bài tập

1. Một nhóm 4 người đang push thẳng vào \`main\` và liên tục làm hỏng bản deploy. Đề xuất workflow khắc phục và liệt kê các bước của vòng đời một feature branch.
2. Cho hai team sau, chọn GitFlow hay Trunk-Based và giải thích:
   - (a) Startup làm web app, deploy 3-5 lần mỗi ngày, có bộ test tự động mạnh.
   - (b) Công ty bán phần mềm desktop theo license, hiện hỗ trợ song song v1.4 (cho khách cũ) và v2.0 (cho khách mới), thỉnh thoảng phải hotfix riêng cho từng version.
3. Bạn merge và gặp conflict trong file \`cau-hinh.go\`:
   \`\`\`
   <<<<<<< HEAD
   timeout := 30   // tăng từ 10 lên 30 giây
   =======
   timeout := 10
   maxRetry := 3   // thêm retry
   >>>>>>> feature/retry
   \`\`\`
   Viết các bước giải quyết và nội dung cuối cùng đúng nghiệp vụ (giả sử *cả hai* thay đổi đều cần giữ).
4. Đồng đội nói: "Branch \`feature/report\` mình với cậu đang dùng chung, để mình \`rebase main\` cho lịch sử đẹp rồi \`push --force\` nhé." Bạn nên trả lời thế nào và đề xuất cách an toàn?
5. Viết lại 3 commit message xấu sau theo Conventional Commits, đoán ngữ cảnh hợp lý: (a) \`done\`, (b) \`fix\`, (c) \`update code\`.

## Lời giải chi tiết

**Bài 1.** Đề xuất **feature branch workflow** + quy tắc "\`main\` luôn deployable": cấm push thẳng \`main\` (bật branch protection), mọi thay đổi qua PR có review + CI. Vòng đời feature branch: (1) \`git checkout main && git pull\` lấy bản mới nhất; (2) \`git checkout -b feature/<ten>\` tạo branch; (3) làm việc, commit từng bước; (4) \`git push -u origin feature/<ten>\`; (5) mở Pull Request → branch vào \`main\`; (6) đồng đội review + CI chạy test; (7) được duyệt & CI xanh → merge; (8) \`git branch -d feature/<ten>\` xóa branch. Kết quả: \`main\` không còn bị code dở làm hỏng vì mọi thứ phải qua cổng PR + CI.

**Bài 2.** (a) **Trunk-Based**: deploy 3-5 lần/ngày là release liên tục — branch dài chỉ tổ gây conflict; đã có test tự động mạnh (điều kiện tiên quyết của Trunk-Based) nên merge liên tục vào \`main\` an toàn; tính năng dở dùng feature flag. (b) **GitFlow**: phải duy trì *nhiều version song song* (v1.4 và v2.0) với hotfix riêng — đúng thế mạnh của GitFlow (\`main\` chứa release, \`hotfix/*\` rẽ từ \`main\` để vá từng version, \`release/*\` chuẩn bị phát hành theo đợt). Trunk-Based một nhánh không quản nổi nhiều dòng version cùng lúc.

**Bài 3.** Các bước: (1) \`git status\` xác nhận \`cau-hinh.go\` đang unmerged; (2) mở file, đọc *cả hai* phía — phía \`HEAD\` tăng \`timeout\` lên 30, phía \`feature/retry\` giữ \`timeout=10\` nhưng thêm \`maxRetry=3\`; (3) vì cả hai thay đổi đều cần giữ, gộp lại: lấy \`timeout := 30\` (giá trị mới) *và* \`maxRetry := 3\`; (4) xóa hết dấu \`<<<<<<<\`, \`=======\`, \`>>>>>>>\`; (5) \`git add cau-hinh.go\`; (6) \`git commit\`; (7) build & test lại. Nội dung cuối cùng:
\`\`\`go
timeout := 30   // tăng từ 10 lên 30 giây
maxRetry := 3   // thêm retry
\`\`\`

**Bài 4.** Trả lời: **không nên**, vì \`feature/report\` là nhánh *đã chia sẻ* (cả hai cùng push). \`rebase\` + \`push --force\` sẽ viết lại hash và ghi đè remote → lịch sử trên máy bạn (đồng đội kia) bị phân kỳ, commit có thể mất hoặc nhân đôi khi pull. Cách an toàn: (1) nếu muốn cập nhật theo \`main\`, dùng \`git merge main\` vào \`feature/report\` (tạo merge commit, không đổi hash cũ); (2) nếu muốn lịch sử đẹp, làm điều đó *trên branch riêng tư chưa chia sẻ* trước khi push, hoặc chỉ squash khi merge PR vào \`main\` (server làm, không ảnh hưởng nhánh chung). Quy tắc vàng: chỉ rebase commit chưa ai pull.

**Bài 5.** (Ngữ cảnh đoán hợp lý, miễn đúng cấu trúc \`<loại>(<phạm vi>): <mô tả>\`):
- (a) \`done\` → \`feat(gio-hang): hoàn thành chức năng thêm sản phẩm vào giỏ\`.
- (b) \`fix\` → \`fix(dang-nhap): chặn đăng nhập khi email sai định dạng\`.
- (c) \`update code\` → \`refactor(thanh-toan): tách hàm tính thuế ra module riêng\` (nếu chỉ dọn cấu trúc) hoặc \`chore(deps): cập nhật thư viện http lên bản vá bảo mật\`.

---

## 8. Code & Minh họa

- [visualization.html](./visualization.html) — 3 mô-đun tương tác: (1) mô phỏng commit graph — bấm tạo branch / commit / merge để thấy đồ thị nhánh hình thành; (2) so sánh GitFlow vs Trunk-Based bằng diagram bật/tắt; (3) giải merge conflict — chọn cách hợp nhất đúng giữa hai phiên bản dòng code.

## 9. Bài tiếp theo

- [Lesson 05 — Code review](../lesson-05-code-review/) — bước "review" trong PR diễn ra cụ thể thế nào: tìm gì, góp ý ra sao, văn hóa review lành mạnh.
- Liên quan: CI/CD (chạy test tự động trên PR) sẽ học sâu ở Tier 03 — xem [trang chính lĩnh vực](../../index.html).
`;
