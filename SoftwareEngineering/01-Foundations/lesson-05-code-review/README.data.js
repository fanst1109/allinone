// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: SoftwareEngineering/01-Foundations/lesson-05-code-review/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — Code review (đánh giá mã nguồn)

## Mục tiêu

- Hiểu **code review** là gì, vì sao mọi nhóm kỹ thuật nghiêm túc đều coi nó là bắt buộc — và nó nối với **đường cong chi phí sửa lỗi** ở [Lesson 01](../lesson-01-sdlc-vai-tro-ky-su/) như thế nào.
- Nắm **quy trình review qua Pull Request (PR)**: author mở PR → reviewer đọc diff → comment → request changes / approve → merge.
- Biết **review cái gì** qua một checklist thực dụng: tính đúng (correctness), khả đọc (readability), thiết kế, test, bảo mật, hiệu năng, edge case.
- Xây dựng **văn hóa review lành mạnh**: feedback mang tính xây dựng, phân biệt "phải sửa" vs "gợi ý" (\`nit:\`), nhận góp ý không tự ái.
- Hiểu vì sao **PR nhỏ** review tốt hơn PR khổng lồ, và thói quen **self-review** trước khi gửi.
- Nhận diện và tránh các **anti-pattern**: rubber-stamp (đóng dấu mà không đọc), bikeshedding (cãi nhau chuyện vặt).

## Kiến thức tiền đề

- **Pull Request & branch workflow** — code review gắn chặt với PR. Nếu chưa rõ PR là gì, cách mở/merge, xem [Lesson 04 — Git workflow cho nhóm](../lesson-04-git-workflow-team/).
- Biết đọc một \`diff\` cơ bản (dòng \`+\` thêm, dòng \`-\` xóa).
- Không cần biết công cụ review cụ thể nào trước — quy trình GitHub/GitLab/Bitbucket về bản chất giống nhau.

> 💡 **Vì sao tách thành một bài riêng?** [Lesson 04](../lesson-04-git-workflow-team/) dạy *cơ chế* PR — mở branch, đẩy code, gộp vào \`main\`. Bài này dạy *nội dung con người* xảy ra trên PR đó: đọc code của người khác, chỉ ra vấn đề một cách hữu ích, và quyết định "code này đủ tốt để vào \`main\` chưa". PR là cái ống dẫn; code review là thứ chảy qua ống.

---

## 1. Code review là gì & vì sao cần

💡 **Trực giác.** Code review giống việc một tòa soạn không cho bài lên báo trước khi có biên tập viên đọc lại. Tác giả quá quen bài của mình nên không thấy lỗi chính tả, câu tối nghĩa, dẫn chứng sai. Một đôi mắt thứ hai — *chưa từng nhìn đoạn code này* — bắt được thứ mà người viết đã "mù" vì quá thân thuộc.

**Code review** = trước khi một thay đổi code được gộp vào nhánh chính (\`main\`), ít nhất một kỹ sư khác (reviewer) đọc thay đổi đó, đặt câu hỏi, chỉ ra vấn đề, và phải **chấp thuận (approve)** thì mới được merge.

Ba lý do cốt lõi:

| Lý do | Giải thích | Liên hệ |
|-------|------------|---------|
| **Bắt lỗi sớm** | Reviewer phát hiện bug, edge case bị bỏ sót *trước khi* code lên production | Nối thẳng [đường cong chi phí — Lesson 01](../lesson-01-sdlc-vai-tro-ky-su/): bắt lỗi ở review (~giai đoạn code, 10×) rẻ hơn bắt ở production (30–100×) nhiều lần |
| **Lan tỏa kiến thức** | Reviewer học được phần code mình chưa đụng tới; author học được mẹo từ góp ý → giảm "bus factor" (chỉ 1 người hiểu một vùng code) | — |
| **Giữ chất lượng & nhất quán** | Code mới khớp style chung, không lặp lại, đặt tên thống nhất → cả codebase đọc như do một người viết | Tránh nợ kỹ thuật |

**Số liệu.** Các nghiên cứu công nghiệp (SmartBear, Microsoft, Google) cho thấy review có hệ thống **bắt được phần lớn defect trước khi tới production** — nhiều khảo sát ghi nhận khoảng **60–90%** lỗi được phát hiện qua review/inspection, tùy mức độ kỹ. Đây là một trong những cách rẻ nhất để nâng chất lượng vì nó chặn lỗi *trước* khi nó kịp đắt lên.

**Ví dụ cụ thể.** Author viết hàm tính giảm giá:

\`\`\`go
func discount(price float64, percent int) float64 {
    return price - price*float64(percent)/100  // percent = 20 → giảm 20%
}
\`\`\`

Reviewer đọc và hỏi: *"Nếu \`percent = 150\` (lỗi nhập liệu) thì hàm trả về số âm — ta có muốn chặn \`percent > 100\` không?"*. Bug này **không lộ ra khi chạy thử với input đẹp**, chỉ một reviewer chịu nghĩ tới edge case mới bắt được — và bắt ở đây tốn 1 comment, để lọt thì có thể tạo hóa đơn âm tiền cho khách thật.

> ❓ **"Đã có test tự động rồi thì review làm gì cho thừa?"** Test và review bắt *loại lỗi khác nhau*. Test bắt lỗi *bạn đã nghĩ tới* để viết case; review bắt lỗi *bạn không nghĩ tới nên không viết test* (như edge case \`percent > 100\` ở trên), cộng thêm những thứ test không kiểm được: tên biến khó hiểu, thiết kế lủng củng, lỗ hổng bảo mật, đoạn code dư thừa. Chúng bổ sung nhau, không thay thế.

> ⚠ **Lỗi thường gặp.** Coi review là "cửa kiểm tra hình thức để có người chịu trách nhiệm". Sai — mục tiêu là *cùng nhau làm code tốt hơn*, không phải tìm người đổ lỗi. Một văn hóa "review để bắt lỗi người khác" sẽ khiến mọi người sợ gửi PR và phòng thủ khi nhận góp ý.

> 🔁 **Dừng lại tự kiểm tra.** Nhóm A bỏ qua review để "đẩy nhanh feature", nhóm B luôn review. Sau 6 tháng, vì sao codebase nhóm A thường khó bảo trì hơn dù *ban đầu* chạy nhanh hơn?
> <details><summary>Đáp án</summary>Không review → mỗi người viết theo phong cách riêng, edge case lọt nhiều, chỉ tác giả hiểu vùng code của mình (bus factor = 1). Lỗi tích lại lên production (đắt theo đường cong chi phí Lesson 01), kiến thức không lan tỏa, người mới vào không đọc nổi. "Nhanh" ban đầu là vay nợ kỹ thuật với lãi cao.</details>

📝 **Tóm tắt mục 1.** Code review = ít nhất một kỹ sư khác đọc & duyệt thay đổi trước khi merge. Ba lợi ích: bắt lỗi sớm (rẻ theo đường cong chi phí), lan tỏa kiến thức (giảm bus factor), giữ chất lượng/nhất quán. Review bổ sung cho test chứ không thay thế.

---

## 2. Quy trình review qua Pull Request

💡 **Trực giác.** PR là một "đề nghị thay đổi" đặt lên bàn: *"Tôi muốn đưa các thay đổi này vào \`main\` — ai đó xem giúp đã ổn chưa?"*. Quy trình review là cuộc đối thoại quanh đề nghị đó, và chỉ kết thúc khi reviewer gật đầu.

Vòng lặp chuẩn:

\`\`\`
┌──────────────────────────────────────────────────────────────┐
│ 1. Author mở PR  ──►  branch feature → main, mô tả "làm gì/vì sao" │
│ 2. Reviewer đọc diff  ──►  xem từng file thay đổi               │
│ 3. Reviewer comment  ──►  hỏi, chỉ vấn đề, gợi ý (theo dòng)    │
│ 4. Quyết định:                                                 │
│       • Request changes  ──►  có vấn đề phải sửa               │
│       • Comment          ──►  góp ý nhưng không chặn           │
│       • Approve          ──►  ổn rồi, được merge               │
│ 5. Nếu "request changes": author sửa → đẩy commit mới → quay lại 2 │
│ 6. Khi đã Approve  ──►  merge vào main  ──►  xóa branch         │
└──────────────────────────────────────────────────────────────┘
\`\`\`

Ba trạng thái quyết định của reviewer (chuẩn GitHub/GitLab):

| Trạng thái | Ý nghĩa | Khi nào dùng |
|-----------|---------|--------------|
| **Approve** | "Tôi đồng ý merge" | Không còn vấn đề chặn; các góp ý nhỏ (nếu có) author tùy ý |
| **Comment** | "Tôi có ý kiến nhưng không chặn" | Đặt câu hỏi, gợi ý không bắt buộc |
| **Request changes** | "Phải sửa trước khi merge" | Có bug, lỗ hổng, hoặc vấn đề thiết kế nghiêm trọng |

**Ví dụ một vòng lặp thật.** Author mở PR "Thêm endpoint đăng ký user". Reviewer để lại 3 comment: (1) \`request changes\` — "mật khẩu đang lưu plaintext, phải hash" (chặn); (2) \`comment\` — "tên hàm \`do()\` chưa rõ, đổi thành \`registerUser()\`?"; (3) \`comment\` — "thiếu test cho email trùng". Author hash mật khẩu, đổi tên hàm, thêm test, đẩy commit mới. Reviewer xem lại, thấy đã xử lý hết → \`approve\` → merge.

> ❓ **"Cần bao nhiêu người approve thì được merge?"** Tùy quy ước nhóm. Phổ biến: **1 reviewer** cho thay đổi thường, **2+** cho code nhạy cảm (thanh toán, bảo mật, hạ tầng dùng chung). Nhiều nhóm cấu hình *branch protection* (xem [Lesson 04](../lesson-04-git-workflow-team/)) để chặn merge cho tới khi đủ approve **và** CI (test tự động) pass.

> ⚠ **Lỗi thường gặp.** Author "force-push" ghi đè lịch sử branch khi đang review giữa chừng → reviewer mất dấu các comment đã đặt, không biết commit nào đã sửa gì. Trong lúc review, hãy đẩy **commit mới** (review nhìn được "đã sửa gì từ lần xem trước"); chỉ squash/rebase khi đã approve, ngay trước merge.

> 🔁 **Dừng lại tự kiểm tra.** Reviewer thấy code đúng chức năng nhưng tên hàm khó hiểu và thiếu một test cho trường hợp rỗng. Nên chọn \`approve\`, \`comment\`, hay \`request changes\`?
> <details><summary>Đáp án</summary>Tùy mức độ. Nếu test thiếu là <i>edge case quan trọng</i> (rỗng có thể gây crash) → <b>request changes</b>. Nếu chỉ là cải thiện đặt tên + một test phụ "nên có" → có thể <b>approve</b> kèm comment "đổi tên + thêm test giúp nhé" và tin author xử lý. Nguyên tắc: chỉ <b>request changes</b> cho thứ thật sự phải sửa trước khi vào <code>main</code>; đừng chặn merge vì sở thích cá nhân.</details>

📝 **Tóm tắt mục 2.** Vòng lặp PR: author mở PR → reviewer đọc diff & comment theo dòng → quyết định Approve / Comment / Request changes → author sửa & đẩy commit mới → lặp tới khi Approve → merge. Branch protection thường yêu cầu đủ approve + CI pass.

---

## 3. Review cái gì? — checklist thực dụng

💡 **Trực giác.** Đừng đọc diff như đọc tiểu thuyết từ trên xuống mong "thấy lỗi". Hãy đọc *qua nhiều lớp kính lọc*, mỗi lớp hỏi một câu khác nhau: "Nó đúng không? Đọc được không? Thiết kế ổn không?...". Mỗi lượt một câu hỏi giúp bạn không bỏ sót cả một loại vấn đề.

Bảy lớp kính lọc, kèm comment review mẫu:

| Lớp | Câu hỏi cốt lõi | Ví dụ comment review |
|-----|-----------------|----------------------|
| **1. Tính đúng** (correctness) | Code có làm đúng thứ nó nên làm? | "Vòng lặp chạy \`i <= len(arr)\` → tràn index ở phần tử cuối, nên là \`i < len(arr)\`." |
| **2. Khả đọc** (readability) | 6 tháng sau người khác đọc có hiểu? | "Tên \`d\` không rõ — \`daysUntilExpiry\` chăng?" |
| **3. Thiết kế** (design) | Đặt đúng chỗ? Có lặp/phụ thuộc xấu? | "Logic tính thuế đang nằm trong handler HTTP — tách ra package \`billing\` để tái dùng & test riêng?" |
| **4. Test** | Có test cho thay đổi? Phủ edge case? | "Có test cho danh sách rỗng và list 1 phần tử chưa? Đó là chỗ off-by-one hay lọt." |
| **5. Bảo mật** (security) | Có rò rỉ / lỗ hổng? | "Câu SQL đang nối chuỗi trực tiếp từ input → nguy cơ SQL injection. Dùng parameterized query." |
| **6. Hiệu năng** (performance) | Có chậm/tốn tài nguyên rõ rệt? | "Query trong vòng lặp → N+1 query. Lấy hết một lần ngoài vòng lặp được không?" |
| **7. Edge case** | Rỗng, null, số âm, quá lớn, đồng thời? | "\`percent\` âm hoặc > 100 thì sao? Cần validate đầu vào." |

**Ví dụ tổng hợp — một diff với nhiều vấn đề:**

\`\`\`go
func GetUser(id string) User {
    rows, _ := db.Query("SELECT * FROM users WHERE id = " + id)  // (a)
    var u User
    rows.Scan(&u.Name)                                            // (b)
    return u                                                       // (c)
}
\`\`\`

Review theo checklist:
- **(a) Bảo mật** — "Nối chuỗi \`id\` vào SQL → SQL injection. Dùng \`db.Query("... WHERE id = ?", id)\`."
- **(a)/(b) Tính đúng** — "Đang nuốt error (\`_\`). Nếu query lỗi hoặc không có dòng nào, \`rows.Scan\` sẽ hành xử lạ — phải kiểm tra \`err\` và xử lý 'không tìm thấy'."
- **(b) Tính đúng** — "\`SELECT *\` rồi chỉ Scan \`Name\` — số cột không khớp, Scan sẽ lỗi. Chỉ \`SELECT name\` hoặc Scan đủ cột."
- **(c) Edge case** — "Không tìm thấy user thì trả về \`User{}\` rỗng âm thầm — caller không phân biệt được. Trả thêm \`error\` hoặc \`(User, bool)\`."

> ❓ **"Phải đi hết 7 lớp cho mọi PR à, không quá lâu sao?"** Không cứng nhắc. Với PR nhỏ, bạn quét nhanh qua tất cả gần như tự động. Trọng số tùy ngữ cảnh: PR sửa typo chỉ cần lớp 1–2; PR đụng dữ liệu người dùng / tiền bạc thì lớp **bảo mật** và **edge case** là ưu tiên cao nhất. Checklist là *để không quên cả một loại vấn đề*, không phải bắt buộc viết comment cho từng lớp.

> ⚠ **Lỗi thường gặp.** Chỉ review **tính đúng** ("code chạy đúng là duyệt") mà bỏ qua khả đọc & thiết kế. Code "chạy đúng nhưng không ai đọc nổi" sẽ trở thành nợ kỹ thuật — đúng hôm nay, không sửa được tháng sau.

> 🔁 **Dừng lại tự kiểm tra.** Trong 7 lớp, lớp nào reviewer hay quên nhất, và vì sao bỏ sót nó nguy hiểm?
> <details><summary>Đáp án</summary>Thường là <b>edge case</b> và <b>bảo mật</b>. Lý do: với input "đẹp" code chạy đúng nên dễ tưởng ổn; còn lỗ hổng bảo mật/edge case chỉ lộ với input bất thường hoặc cố ý phá. Bỏ sót nguy hiểm vì chúng thường không bị test "happy path" bắt và chỉ bùng ra trên production với dữ liệu thật.</details>

📝 **Tóm tắt mục 3.** Review qua 7 lớp kính lọc: tính đúng, khả đọc, thiết kế, test, bảo mật, hiệu năng, edge case. Mỗi lớp một câu hỏi → không bỏ sót cả một loại vấn đề. Trọng số tùy ngữ cảnh PR; bảo mật & edge case là chỗ dễ lọt nhất.

---

## 4. Văn hóa review — phê bình code, không phê bình con người

💡 **Trực giác.** Cùng một vấn đề có thể nói theo cách làm người ta học được, hoặc theo cách làm người ta phòng thủ. Mục tiêu review là *code tốt hơn*, nên ngôn từ phải hướng vào **code**, không vào **người viết**. "Đoạn này có thể null" khác hẳn "Sao anh không nghĩ tới null vậy?".

**Bốn nguyên tắc:**

1. **Phê bình code, không phê bình người.** Nói về dòng code, không về năng lực tác giả.
2. **Phân biệt "phải sửa" vs "gợi ý".** Đánh dấu rõ ràng để author biết cái gì chặn merge, cái gì tùy chọn:
   - Không tiền tố → mặc định là điểm cần thảo luận/sửa.
   - \`nit:\` (nitpick) → chuyện nhỏ, sửa thì tốt nhưng không chặn merge ("nit: thừa dòng trống").
   - \`praise:\` / 👍 → khen điểm tốt (đúng, nên có — củng cố hành vi tốt).
   - \`question:\` → hỏi để hiểu, có thể không phải lỗi.
3. **Giải thích *vì sao*, gợi ý hướng sửa.** Đừng chỉ nói "sai" — nói sai *thế nào* và *nên làm gì*.
4. **Nhận feedback không tự ái.** Comment là về code của bạn, không phải về bạn. Author cũng nên trả lời comment (đã sửa / giải thích vì sao giữ nguyên), không im lặng đóng.

**Đối chiếu comment tệ vs comment tốt (cùng một vấn đề):**

| ❌ Comment tệ | ✅ Comment tốt | Vì sao |
|---------------|---------------|--------|
| "Code này sai bét." | "Vòng lặp này chạy quá 1 phần tử (\`<=\` thay vì \`<\`) → tràn index. Đổi thành \`i < len(arr)\` nhé." | Tệ: mơ hồ + công kích. Tốt: chỉ rõ lỗi, vị trí, cách sửa. |
| "Sao không viết test?" | "Mình nghĩ nên thêm test cho trường hợp list rỗng — đó là chỗ off-by-one hay lọt. Bạn thấy sao?" | Tệ: trách móc. Tốt: gợi ý + lý do + mời thảo luận. |
| "Tên biến xấu." | "\`nit: x\` hơi khó đoán — \`retryCount\` rõ hơn không?" | Tốt: đánh dấu \`nit\` (không chặn), đề xuất tên cụ thể. |
| "Đoạn này tôi không hiểu." | "\`question:\` mình chưa rõ vì sao cần khóa mutex ở đây — có race condition cụ thể nào không? Hỏi để học." | Tốt: hỏi để hiểu, không phán xét. |

> ❓ **"Reviewer và author bất đồng, ai quyết?"** Trước hết thảo luận trên comment với *lý do kỹ thuật*, không phải "vì tôi nói thế". Nếu vẫn bế tắc: kéo người thứ ba (tech lead) hoặc tham chiếu chuẩn nhóm/tài liệu. Tránh "thắng bằng giọng to". Nếu là chuyện sở thích (\`nit\`), thường author được quyết và reviewer nhường.

> ⚠ **Lỗi thường gặp.** Reviewer áp đặt *sở thích cá nhân* như thể là quy tắc ("tôi thích đặt dấu ngoặc kiểu này"). Nếu không có chuẩn chung quy định, đó là \`nit:\` tùy chọn — không được \`request changes\` vì nó. Ngược lại, author đừng coi mọi comment là tấn công — phần lớn là thiện chí giúp code tốt hơn.

> 🔁 **Dừng lại tự kiểm tra.** Viết lại comment tệ sau thành comment xây dựng: *"Hàm này dài quá, refactor đi."*
> <details><summary>Đáp án</summary>Ví dụ: <i>"Hàm <code>processOrder</code> đang ~120 dòng làm nhiều việc (validate + tính giá + ghi DB + gửi mail). Tách phần gửi mail ra <code>sendConfirmation()</code> sẽ dễ đọc & test riêng hơn — bạn thấy sao?"</i> Khác biệt: chỉ rõ <i>hàm nào</i>, <i>vì sao</i> dài là vấn đề (làm nhiều việc), <i>gợi ý cụ thể</i> cách tách, và mời thảo luận thay vì ra lệnh.</details>

📝 **Tóm tắt mục 4.** Văn hóa lành mạnh: phê bình code không phê bình người; đánh dấu rõ \`nit:\` (gợi ý) vs vấn đề chặn; luôn giải thích *vì sao* + gợi ý hướng sửa; nhận feedback không tự ái. Bất đồng giải bằng lý do kỹ thuật, không bằng quyền lực hay giọng to.

---

## 5. PR nhỏ & tốt — vì sao kích thước quyết định chất lượng review

💡 **Trực giác.** So sánh: bắt lỗi chính tả trong một tin nhắn 2 dòng — bạn thấy ngay; bắt lỗi trong một bài luận 50 trang — mắt mỏi, đọc lướt, bỏ sót. PR cũng vậy: diff càng to, reviewer càng đọc lướt và càng lọt nhiều lỗi.

**Số liệu cụ thể.** Dữ liệu từ các nghiên cứu review (vd SmartBear/Cisco) cho thấy hiệu quả tìm lỗi **giảm mạnh khi PR vượt ~200–400 dòng**. Minh họa định lượng (xấp xỉ, để thấy xu hướng):

| Kích thước PR | Reviewer thực tế làm gì | Tỉ lệ bắt lỗi |
|---------------|--------------------------|:-------------:|
| **~50 dòng** | Đọc kỹ từng dòng, nghĩ edge case | Cao (~70–90%) |
| **~200 dòng** | Vẫn đọc được nhưng bắt đầu mệt | Trung bình |
| **~400 dòng** | Đọc lướt phần sau | Giảm rõ |
| **~1000+ dòng** | "LGTM" (Looks Good To Me) — gần như không đọc kỹ | Thấp |
| **~2000 dòng** | Rubber-stamp: approve cho xong | Rất thấp |

Nghịch lý: **PR 2000 dòng cần review kỹ nhất lại được review hời hợt nhất**, vì không ai đủ sức đọc kỹ ngần đó trong một lượt.

**Hệ quả thực hành:**

- **Chia nhỏ thay đổi.** Một feature lớn → tách thành nhiều PR nhỏ logic (vd: PR1 thêm model, PR2 thêm API, PR3 thêm UI) thay vì một PR khổng lồ.
- **Một PR một mục đích.** Đừng trộn "sửa bug + đổi format + refactor" trong một PR — reviewer khó tách "đâu là thay đổi thật, đâu là nhiễu".
- **Self-review trước khi gửi.** Trước khi bấm "Create PR", *chính author đọc lại diff của mình* như thể là reviewer. Việc này bắt được phần lớn lỗi ngớ ngẩn (code debug quên xóa, \`console.log\`, tên sai) — rẻ nhất, nhanh nhất, không tốn thời gian người khác.

**Ví dụ self-review bắt lỗi.** Author định gửi PR, tự đọc diff và thấy: một dòng \`fmt.Println("DEBUG here")\` quên xóa, một biến \`temp\` không dùng, và một file \`.env\` lỡ thêm vào. Sửa hết trước khi gửi → reviewer nhận PR sạch, tập trung vào logic thật thay vì nhặt rác.

> ❓ **"Chia nhỏ PR thì tốn công mở nhiều PR hơn — có đáng không?"** Đáng. Tổng thời gian *review + sửa lại* của nhiều PR nhỏ thường ít hơn một PR to, vì: lỗi được bắt sớm hơn (PR1 sai thì PR2,3 chưa xây lên cái sai đó), reviewer phản hồi nhanh hơn (PR nhỏ đỡ ngại bắt đầu), và conflict khi merge ít hơn. Chi phí "mở nhiều PR" nhỏ so với chi phí lỗi lọt từ một PR khổng lồ.

> ⚠ **Lỗi thường gặp.** Gom cả tuần làm việc vào một PR "cho gọn" rồi gửi cuối sprint. Reviewer đối mặt 1500 dòng, đọc lướt, approve → lỗi lọt. Tốt hơn: gửi PR nhỏ *liên tục* trong tuần.

> 🔁 **Dừng lại tự kiểm tra.** Vì sao một PR 2000 dòng vừa *khó bắt lỗi* vừa *dễ bị rubber-stamp* hơn một PR 50 dòng?
> <details><summary>Đáp án</summary>Khó bắt lỗi: lượng thông tin vượt khả năng tập trung của reviewer → đọc lướt, bỏ qua edge case. Dễ rubber-stamp: vì biết đọc kỹ 2000 dòng rất tốn sức (và sửa lại càng tốn hơn), reviewer có xu hướng "LGTM" cho qua. Càng to, tỉ lệ bắt lỗi càng tụt — đúng lúc PR to lại càng cần review kỹ.</details>

📝 **Tóm tắt mục 5.** PR nhỏ (~≤200–400 dòng) được review kỹ hơn → bắt nhiều lỗi hơn; PR khổng lồ bị đọc lướt và rubber-stamp. Chia thay đổi lớn thành nhiều PR nhỏ một-mục-đích, và **self-review** diff của mình trước khi gửi để loại lỗi ngớ ngẩn.

---

## 6. Anti-pattern cần tránh

💡 **Trực giác.** Hai cách "review sai" phổ biến nằm ở hai cực đối nghịch: một bên *không đọc gì cả* (rubber-stamp), một bên *cãi nhau về thứ không quan trọng* (bikeshedding). Cả hai đều làm review mất giá trị.

**Rubber-stamp (đóng dấu mù).** Approve mà không thật sự đọc — gõ "LGTM" trong 5 giây cho PR 800 dòng. Nguyên nhân: PR quá to (mục 5), nể nang, hoặc bị giục merge. Hậu quả: review trở thành thủ tục hình thức, lỗi lọt y như không có review. Cách chữa: PR nhỏ, đặt kỳ vọng "approve = tôi đã đọc & chịu trách nhiệm cùng", không giục merge gấp.

**Bikeshedding (cãi nhau chuyện vặt).** Tên gọi từ ẩn dụ: một ủy ban duyệt thiết kế nhà máy điện hạt nhân lại dành phần lớn thời gian tranh luận màu sơn nhà để xe (bike shed) — vì ai cũng có ý kiến về thứ dễ hiểu, còn lò phản ứng thì ngại đụng. Trong review: 20 comment cãi nhau dấu cách / dấu ngoặc / tên biến vặt, trong khi *lỗ hổng bảo mật* và *thiết kế sai* không ai đả động. Cách chữa: **tự động hóa chuyện vặt** (formatter/linter chạy trong CI lo format, đặt tên theo lint rule) để con người tập trung vào logic, thiết kế, bảo mật.

> ❓ **"Làm sao biết mình đang bikeshed?"** Tự hỏi: *"Comment này có ngăn được bug, lỗ hổng, hay khó-bảo-trì thật không, hay chỉ là sở thích?"*. Nếu là sở thích và đã có công cụ tự lo (formatter) → đừng biến nó thành tranh luận; cùng lắm để \`nit:\`. Dấu hiệu cảnh báo: PR có hàng chục comment về style nhưng không ai nhắc tới đúng/sai logic.

> ⚠ **Lỗi thường gặp.** Dùng review để **gác cổng style thủ công** — bắt bẻ từng dấu cách bằng tay. Đây vừa là bikeshedding vừa lãng phí: hãy để **linter + formatter tự động** (chạy trong CI, xem [Lesson 04](../lesson-04-git-workflow-team/) về kiểm tra tự động trước merge) làm việc đó, con người dành sức cho thứ máy không làm được.

📝 **Tóm tắt mục 6.** Hai cực sai: **rubber-stamp** (approve không đọc → review vô nghĩa, chữa bằng PR nhỏ + đặt kỳ vọng đúng) và **bikeshedding** (cãi chuyện vặt, bỏ qua việc lớn → chữa bằng tự động hóa format/style để người tập trung vào logic, thiết kế, bảo mật).

---

## 7. Bài tập

1. **Phân loại comment.** Với mỗi comment review sau, ghi nó là **blocking** (phải sửa, dùng \`request changes\`), **suggestion/nit** (gợi ý, không chặn), hay **praise** (khen):
   (a) "Câu SQL nối chuỗi từ input → SQL injection."
   (b) "\`nit:\` thừa một dòng trống ở cuối hàm."
   (c) "Cách bạn tách hàm validate ra rất gọn, dễ test 👍"
   (d) "Hàm trả về \`nil\` khi không tìm thấy nhưng caller không kiểm tra → sẽ nil-pointer panic."
   (e) "Có thể dùng \`strings.Builder\` thay vì nối chuỗi cho gọn — không bắt buộc."

2. **Viết comment review.** Cho đoạn code sau, viết các comment review theo checklist mục 3 (chỉ ra ít nhất 3 vấn đề, mỗi comment kèm hướng sửa):
   \`\`\`go
   func Avg(nums []int) int {
       sum := 0
       for i := 0; i <= len(nums); i++ {
           sum += nums[i]
       }
       return sum / len(nums)
   }
   \`\`\`

3. **Viết lại comment tệ.** Chuyển comment tệ sau thành comment xây dựng: *"Code rác, ai viết kiểu này. Làm lại đi."* (giả sử vấn đề thật là: một hàm 200 dòng làm 4 việc khác nhau).

4. **Quyết định trạng thái.** Reviewer xem một PR và thấy: (i) một lỗ hổng bảo mật, (ii) hai tên biến khó hiểu, (iii) phần code mới rất sạch và có test đầy đủ. Reviewer nên dùng trạng thái nào (Approve / Comment / Request changes) và để lại những loại comment gì?

5. **PR nhỏ hay to.** Bạn cần làm một feature ước tính ~600 dòng đụng 3 lớp (model, API, UI). Mô tả cách chia thành các PR nhỏ và giải thích vì sao điều đó cho review tốt hơn một PR 600 dòng.

6. **Nhận diện anti-pattern.** Trong một PR 1200 dòng, reviewer gõ "LGTM 🚀" sau 30 giây và 15 comment khác toàn về dấu cách/format. Hai anti-pattern nào đang xảy ra? Đề xuất cách chữa mỗi cái.

## Lời giải chi tiết

**Bài 1.** (a) **Blocking** — lỗ hổng bảo mật, phải sửa trước merge (\`request changes\`). (b) **Suggestion/nit** — chuyện format vặt, không chặn (nên để linter tự lo). (c) **Praise** — khen, củng cố hành vi tốt. (d) **Blocking** — nguy cơ panic ở production, phải xử lý (kiểm tra nil hoặc trả error rõ ràng). (e) **Suggestion/nit** — cải thiện tùy chọn ("không bắt buộc"), author quyết.

**Bài 2.** Ít nhất ba vấn đề:
- **Tính đúng (off-by-one / tràn index)** — "\`i <= len(nums)\` chạy quá phần tử cuối → \`nums[len(nums)]\` panic index out of range. Đổi thành \`i < len(nums)\`."
- **Edge case (chia cho 0)** — "Nếu \`nums\` rỗng thì \`len(nums) == 0\` → \`sum / 0\` panic chia cho 0. Cần kiểm tra \`len(nums) == 0\` và quyết định trả về gì (vd trả thêm \`error\` hoặc \`(int, bool)\`)."
- **Tính đúng (kết quả trung bình bị cắt)** — "\`int / int\` cắt phần thập phân: \`Avg([1,2]) = 3/2 = 1\` chứ không phải 1.5. Nếu muốn trung bình đúng, đổi kiểu trả về sang \`float64\`: \`return float64(sum) / float64(len(nums))\`."
- (Khả đọc, tùy chọn) "\`nit:\` có thể dùng \`for _, n := range nums { sum += n }\` cho gọn & tránh luôn lỗi index."

**Bài 3.** Comment tệ vừa công kích người (\`"ai viết kiểu này"\`) vừa không nói vấn đề gì. Viết lại xây dựng:
> "Hàm \`X\` đang ~200 dòng và làm tới 4 việc (validate, tính toán, ghi DB, gửi thông báo). Điều này khó đọc và khó test từng phần. Mình đề xuất tách thành các hàm nhỏ theo trách nhiệm — vd \`validateInput()\`, \`calculate()\`, \`save()\`, \`notify()\` — rồi \`X\` chỉ điều phối. Bạn thấy hướng này ổn không?"

Khác biệt: hướng vào *code* không vào *người*; chỉ rõ *vấn đề* (200 dòng, 4 việc) và *vì sao* (khó đọc/test); *gợi ý cụ thể* cách tách; *mời thảo luận*.

**Bài 4.** Vì có **(i) lỗ hổng bảo mật** — đây là vấn đề chặn — reviewer dùng **Request changes**. Các comment để lại: một comment **blocking** chỉ rõ lỗ hổng + cách sửa; hai comment **suggestion/nit** cho hai tên biến (đề xuất tên rõ hơn, không chặn nếu phần còn lại ổn); và một comment **praise** cho phần code sạch + test đầy đủ (khen để củng cố). Tức là kết hợp cả ba loại comment trong cùng một review có trạng thái tổng là *request changes*.

**Bài 5.** Chia theo lát cắt logic, mỗi PR một mục đích:
- **PR1 — Model**: thêm struct/bảng dữ liệu + test cho model (~150 dòng).
- **PR2 — API**: thêm endpoint dùng model ở PR1 + test API (~200 dòng).
- **PR3 — UI**: thêm giao diện gọi API ở PR2 (~250 dòng).

Vì sao tốt hơn: (1) reviewer đọc kỹ từng PR nhỏ → bắt lỗi nhiều hơn (mục 5); (2) nếu PR1 sai thiết kế model, ta sửa *trước khi* PR2/PR3 xây lên cái sai đó — rẻ theo đường cong chi phí Lesson 01; (3) mỗi PR review & merge nhanh, ít conflict; (4) lịch sử git rõ ràng, dễ revert một lát cắt nếu cần. Một PR 600 dòng dễ bị đọc lướt và rubber-stamp.

**Bài 6.** Hai anti-pattern: (1) **Rubber-stamp** — "LGTM" sau 30 giây cho 1200 dòng nghĩa là không thật sự đọc. (2) **Bikeshedding** — 15 comment toàn về dấu cách/format trong khi logic/thiết kế không ai đụng. Cách chữa: rubber-stamp → chia PR nhỏ (≤~200 dòng) để có thể đọc kỹ thật, và đặt kỳ vọng "approve = đã đọc & chịu trách nhiệm cùng". Bikeshedding → cấu hình **formatter + linter chạy trong CI** để máy lo toàn bộ chuyện dấu cách/format, giải phóng reviewer tập trung vào tính đúng, thiết kế, bảo mật.

---

## 8. Code & Minh họa

- [visualization.html](./visualization.html) — các mô-đun tương tác: (1) **Review một PR** — đoạn code có vài vấn đề (bug, tên biến tệ, thiếu test, lỗ hổng); bấm vào dòng nghi vấn để hiện vấn đề & gợi ý sửa; (2) **Phân loại comment** — kéo/bấm phân loại nhiều comment thành blocking / suggestion(nit) / praise; (3) **PR nhỏ hay to** — kéo slider số dòng để xem ước lượng thời gian review & tỉ lệ bỏ sót lỗi tăng theo kích thước.

## 9. Bài tiếp theo

- [Lesson 06 — Ước lượng & quản lý việc](../lesson-06-uoc-luong-quan-ly-viec/) — sau khi đã biết viết & review code cùng nhóm, học cách *ước lượng thời gian* và *quản lý đầu việc* để dự án về đích.
- Liên quan: review gắn với **branch protection & CI** đã đề cập ở [Lesson 04 — Git workflow cho nhóm](../lesson-04-git-workflow-team/); đường cong chi phí sửa lỗi ở [Lesson 01](../lesson-01-sdlc-vai-tro-ky-su/).
`;
