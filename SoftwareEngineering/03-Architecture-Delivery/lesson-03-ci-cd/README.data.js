// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: SoftwareEngineering/03-Architecture-Delivery/lesson-03-ci-cd/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — CI/CD (tích hợp & triển khai liên tục)

## Mục tiêu

- Hiểu **vì sao cần CI/CD**: tích hợp muộn dẫn tới "merge hell", và tự động hóa giúp giảm lỗi do con người.
- Nắm rõ **Continuous Integration (CI)** — mỗi lần push chạy build + test tự động, qua một chuỗi **stage** (lint → build → test → ...).
- Phân biệt **Continuous Delivery** với **Continuous Deployment** — khác nhau ở chỗ ai "bấm nút" lên production.
- Biết các **stage điển hình** của một pipeline và khái niệm **cổng chất lượng (quality gate)**.
- So sánh ba **chiến lược release**: blue-green, canary, rolling — chúng giảm rủi ro và hỗ trợ **rollback** thế nào.
- (Mở rộng) Hiểu **feature flag**, **secrets**, và phân tách **môi trường** dev / staging / production.

## Kiến thức tiền đề

- **Git workflow nhóm** — CI chạy trên mỗi Pull Request, nên cần hiểu PR, branch, merge trước. Xem [Lesson 04 — Git workflow cho team](../../01-Foundations/lesson-04-git-workflow-team/).
- **Chiến lược kiểm thử** — CI chỉ mạnh khi có **test tự động** đủ tốt làm "lưới an toàn". Xem [Lesson 06 — Chiến lược kiểm thử](../../02-Design-Quality/lesson-06-testing-strategy/).
- Biết đọc YAML cơ bản (cấu hình pipeline thường viết bằng YAML).

> 💡 **CI/CD là gì trong một câu?** CI/CD là **dây chuyền tự động** biến mỗi thay đổi code (commit/push) thành một bản phần mềm đã được kiểm tra, đóng gói, và (tùy mức) đưa tới người dùng — mà không cần ai làm thủ công từng bước. Mục tiêu: giao phần mềm **nhanh hơn** và **ít lỗi hơn** cùng lúc, hai thứ tưởng mâu thuẫn.

---

## 1. Vì sao cần CI/CD — "merge hell" và lỗi do con người

💡 **Trực giác.** Hình dung 5 người cùng sửa một quyển sách, mỗi người giữ một bản photo riêng và chỉ ghép lại sau 3 tuần. Đến lúc ghép, ai cũng đã sửa cùng những trang giống nhau theo cách khác nhau → mất cả ngày gỡ rối từng dòng. Đó là **"merge hell"** (địa ngục merge): tích hợp càng muộn, lượng xung đột càng dồn và càng khó gỡ. **Tích hợp liên tục** chữa đúng bệnh này — ghép sớm, ghép thường xuyên, mỗi lần một ít.

**Ví dụ số cụ thể — chi phí của tích hợp muộn.**

| Cách làm | Tần suất merge | Xung đột mỗi lần | Rủi ro |
|----------|----------------|------------------|--------|
| Mỗi người ôm 1 branch 3 tuần | 1 lần / 3 tuần | Hàng chục file, cả ngày gỡ | Rất cao — dễ lỡ release |
| Merge vào nhánh chính mỗi ngày | ~1 lần / ngày | Vài dòng, vài phút | Thấp — lỗi lộ ngay |

**Hai loại "lỗi người" mà tự động hóa loại bỏ:**

1. **Quên chạy test trước khi merge** → CI bắt buộc chạy test, không ai bỏ qua được.
2. **Triển khai sai bước** (quên migrate DB, copy nhầm file config) → script triển khai chạy *giống hệt nhau mỗi lần*, không phụ thuộc trí nhớ.

**Ví dụ kịch bản.** Đội A deploy thủ công: kỹ sư SSH vào server, \`git pull\`, restart service bằng tay. Một hôm bạn ấy nghỉ ốm, người thay quên bước chạy migration → app crash trên production 40 phút. Đội B có pipeline tự động: ai bấm "deploy" cũng chạy đúng 7 bước như nhau → không có "bước bị quên".

> ❓ **"Dự án nhỏ 1-2 người có cần CI/CD không?"** Có, ở mức nhẹ. Kể cả solo, một CI chạy \`lint + test\` trên mỗi push đã chặn được lỗi ngớ ngẩn (code không build, test đỏ) trước khi nó lên nhánh chính. Không cần đủ bộ blue-green/canary, nhưng "build + test tự động" gần như luôn đáng giá.

> ⚠ **Lỗi thường gặp.** Tưởng "CI/CD = một công cụ phải mua". Thực ra CI/CD là **một thực hành** (tích hợp & giao thường xuyên, tự động hóa) — công cụ (GitHub Actions, GitLab CI, Jenkins...) chỉ là phương tiện. Lắp công cụ mà vẫn merge 3 tuần/lần thì không phải đang làm CI.

> 🔁 **Dừng lại tự kiểm tra.** Vì sao "merge mỗi ngày" lại ít xung đột hơn "merge mỗi 3 tuần", dù tổng lượng code thay đổi là như nhau?
> <details><summary>Đáp án</summary>Vì xung đột phát sinh khi <b>hai người sửa cùng vùng code trước khi thấy thay đổi của nhau</b>. Merge mỗi ngày → cửa sổ "chưa thấy nhau" chỉ 1 ngày, lượng code chồng lấn nhỏ, gỡ vài phút. Merge mỗi 3 tuần → cửa sổ 21 ngày, hai người đã sửa lệch nhau rất nhiều trên cùng file → gỡ cả ngày. Tích hợp sớm không giảm tổng công việc, nhưng <b>chia nhỏ</b> xung đột thành nhiều lần dễ xử lý thay vì một lần khổng lồ.</details>

📝 **Tóm tắt mục 1.** Tích hợp muộn gây "merge hell" (xung đột dồn cục) và triển khai thủ công dễ "quên bước". CI/CD chữa cả hai bằng cách **ghép sớm + ghép thường xuyên** và **tự động hóa các bước lặp lại** → nhanh hơn mà ít lỗi hơn.

---

## 2. Continuous Integration (CI) — mỗi push tự build + test

💡 **Trực giác.** CI giống một **người gác cổng không bao giờ mệt**: cứ mỗi lần bạn đẩy code lên (push) hoặc mở Pull Request, người gác này lập tức kéo code về, build thử, chạy toàn bộ test, và báo "xanh" (đạt) hay "đỏ" (hỏng) — trong vài phút, tự động, mọi lúc. Bạn biết ngay code của mình có phá thứ gì không, *trước khi* nó được merge vào nhánh chính.

**Định nghĩa.** **Continuous Integration** = thực hành mọi thành viên **merge code vào nhánh chung thường xuyên** (lý tưởng nhiều lần/ngày), và **mỗi lần tích hợp được xác minh tự động** bằng một bản build + bộ test.

**Pipeline = chuỗi stage.** CI được tổ chức thành các **stage** (giai đoạn) chạy lần lượt; một stage hỏng thì dừng cả chuỗi (fail fast — báo lỗi sớm để tiết kiệm thời gian):

\`\`\`
push / mở PR
   │
   ▼
[ lint ] ─► [ build ] ─► [ test ] ─► [ (báo xanh) ]
  kiểm tra   biên dịch    chạy unit    PR đủ điều kiện
  style/cú    & đóng gói   + integration   merge
  pháp        artifact     test
\`\`\`

**Ví dụ pipeline pseudo-YAML (kiểu GitHub Actions).**

\`\`\`yaml
# .ci/pipeline.yml — chạy trên mỗi push & mỗi PR
on: [push, pull_request]

jobs:
  ci:
    steps:
      - checkout                       # lấy code về
      - run: golangci-lint run ./...   # stage 1: lint (style/lỗi tĩnh)
      - run: go build ./...            # stage 2: build (biên dịch)
      - run: go test -race ./...       # stage 3: test (unit + integration)
      # nếu bất kỳ stage nào trả mã lỗi != 0 → pipeline ĐỎ, dừng tại đó
\`\`\`

**Walk-through một lần chạy.**
- Bạn push commit "thêm hàm \`CalcVAT\`".
- \`lint\` chạy 8 giây → xanh (code đúng style).
- \`build\` chạy 20 giây → xanh (biên dịch được).
- \`test\` chạy 45 giây → **đỏ** ở \`TestCalcVAT\` (bạn quên nhân 0.1, ra 0.01).
- Pipeline dừng, báo đỏ trên PR ngay. Bạn sửa, push lại → lần này 3 stage đều xanh → PR được phép merge.

Tổng: lỗi bị bắt sau ~73 giây, *trước khi* lên nhánh chính. So với việc lỗi VAT này lọt lên production (xem đường cong chi phí ở [Lesson 01 — SDLC](../../01-Foundations/lesson-01-sdlc-engineer-role/)) — rẻ hơn gấp bội.

> ❓ **"CI có tự sửa lỗi không?"** Không. CI chỉ **phát hiện** và **báo** lỗi (đỏ/xanh); con người vẫn phải sửa. Giá trị của CI là biến lỗi từ "phát hiện muộn, mơ hồ" thành "phát hiện ngay, chỉ rõ test nào hỏng".

> ❓ **"Pipeline chậm thì sao?"** Đây là vấn đề thật. Cách giảm: chạy song song các job, **cache** dependency, tách test nhanh (unit) khỏi test chậm (E2E) để feedback unit về trong < 2 phút. Pipeline > 10 phút khiến người ta lười chạy → mất tác dụng.

> ⚠ **Lỗi thường gặp.** Để pipeline "đỏ" lâu ngày mà vẫn merge. Nguyên tắc vàng của CI: **nhánh chính phải luôn xanh**. Đỏ thì việc số một là làm nó xanh lại (sửa hoặc revert), không phải chồng thêm commit mới lên trên một nền đang hỏng.

> 🔁 **Dừng lại tự kiểm tra.** Vì sao xếp \`lint\` trước \`test\`, không phải ngược lại?
> <details><summary>Đáp án</summary>Vì <b>fail fast</b> — chạy cái rẻ/nhanh trước. <code>lint</code> chỉ vài giây và bắt lỗi rõ ràng (style, biến không dùng); <code>test</code> tốn lâu hơn. Nếu code còn lỗi lint cơ bản thì không cần phí 45 giây chạy test — báo đỏ ngay từ stage rẻ nhất. Thứ tự: rẻ & nhanh → đắt & chậm.</details>

📝 **Tóm tắt mục 2.** CI = mỗi push/PR tự động chạy một **pipeline gồm các stage** (lint → build → test). Một stage hỏng → dừng (fail fast). Lỗi lộ trong vài phút, trước khi merge. Nguyên tắc: **nhánh chính luôn xanh**.

---

## 3. Continuous Delivery vs Continuous Deployment

💡 **Trực giác.** Cả hai đều mở rộng CI ra tới production, khác nhau ở **ai bấm nút cuối cùng**:
- **Continuous Delivery** (giao liên tục): pipeline đưa bản build tới trạng thái **sẵn sàng release bất cứ lúc nào**, nhưng cú đẩy lên production là **một cú bấm tay** của con người (release theo lịch/quyết định kinh doanh).
- **Continuous Deployment** (triển khai liên tục): **không có nút bấm tay** — hễ pipeline xanh hết là **tự động lên thẳng production**.

Mẹo nhớ: cả hai viết tắt là **CD**, khác nhau đúng một chữ — *Deli**v**ery* có người duyệt; *Deplo**y**ment* thì không.

\`\`\`
Continuous DELIVERY:
  push → [lint→build→test] → staging → ✋ (người duyệt) → production

Continuous DEPLOYMENT:
  push → [lint→build→test] → staging → (tự động, không hỏi) → production
\`\`\`

**Ví dụ số cụ thể.**

| Tình huống | Phù hợp | Vì sao |
|------------|---------|--------|
| Ngân hàng, mỗi release cần kiểm toán & lịch công bố | **Delivery** | Cần con người quyết "lúc nào lên", có dấu vết phê duyệt |
| Web app SaaS, đội mạnh test, deploy 30 lần/ngày | **Deployment** | Test tự động đủ tin → bỏ nút bấm tay, ship liền |
| App di động (qua App Store review) | **Delivery** (bắt buộc) | Cửa hàng app vốn đã chèn bước duyệt thủ công |

**Ví dụ kịch bản — cùng một code, hai cách phát hành.**
- *Delivery:* sáng thứ Hai, PM xem dashboard staging, thấy ổn → bấm "Release v2.4.0" lúc 10h (tránh giờ cao điểm). Pipeline đã chuẩn bị sẵn từ thứ Sáu.
- *Deployment:* dev merge PR lúc 14h03, 6 phút sau bản mới đã chạy trên production cho người dùng — không ai bấm gì.

> ❓ **"Deployment tự động lên thẳng production nghe đáng sợ — lỡ lỗi thì sao?"** Đúng là chỉ làm được khi có **lưới an toàn dày**: test tự động phủ tốt, **release từng phần** (canary), **giám sát** tự phát hiện bất thường, và **rollback tự động** khi chỉ số xấu. Continuous Deployment không phải "liều" — nó là phần thưởng cho một hệ thống test + observability đủ trưởng thành. Thiếu lưới này thì nên dừng ở Continuous Delivery.

> ⚠ **Lỗi thường gặp.** Dùng lẫn lộn hai thuật ngữ rồi cãi nhau vô nghĩa. Hãy nhớ: **điểm phân biệt duy nhất là có hay không cú "bấm nút tay" trước khi vào production.** Có nút = Delivery. Không nút = Deployment.

> 🔁 **Dừng lại tự kiểm tra.** Một startup deploy 50 lần/ngày, mỗi merge xanh là tự lên production, không ai duyệt. Đó là Delivery hay Deployment?
> <details><summary>Đáp án</summary><b>Continuous Deployment</b> — không có bước phê duyệt thủ công, pipeline tự đẩy lên production. (Nếu vẫn cần một người bấm "release" thì mới là Delivery.)</details>

📝 **Tóm tắt mục 3.** Cả hai đưa bản build sẵn-sàng tới ngưỡng production. **Delivery** = dừng lại chờ **người bấm release**; **Deployment** = **tự động lên** production khi pipeline xanh. Deployment đòi hỏi lưới an toàn (test + canary + giám sát + rollback) dày hơn.

---

## 4. Các stage điển hình của pipeline & cổng chất lượng (quality gate)

💡 **Trực giác.** Một pipeline trưởng thành giống dây chuyền sản xuất có nhiều **trạm kiểm tra**: sản phẩm chỉ đi tiếp khi qua trạm hiện tại. Mỗi trạm là một **stage**; điều kiện "phải đạt mới đi tiếp" gọi là **cổng chất lượng (quality gate)**.

**Pipeline điển hình (chi tiết hơn mục 2):**

\`\`\`
[lint] → [build] → [unit test] → [integration test]
   → [security scan] → [deploy staging] → [E2E/smoke test]
   → 🚪 quality gate → [deploy production] → [smoke prod]
\`\`\`

| Stage | Làm gì | Cổng chất lượng ví dụ |
|-------|--------|----------------------|
| **lint** | Kiểm style, lỗi tĩnh | Không có lỗi lint |
| **build** | Biên dịch, đóng artifact | Build thành công |
| **unit test** | Test hàm/đơn vị | Pass 100%, **coverage ≥ 80%** |
| **integration test** | Test ghép module/DB | Pass 100% |
| **security scan** | Quét lỗ hổng, secret lộ | 0 lỗ hổng mức **High/Critical** |
| **deploy staging** | Lên môi trường giống prod | Triển khai OK |
| **E2E / smoke** | Mô phỏng luồng người dùng | Các luồng chính chạy được |
| **deploy production** | Lên thật | (qua cổng phê duyệt nếu Delivery) |

> 💡 **Cổng chất lượng là gì — và vì sao tồn tại?**
> - **(a) Là gì:** một **điều kiện đo được** mà bản build phải vượt qua thì pipeline mới cho đi tiếp (vd "coverage ≥ 80%", "0 lỗ hổng Critical").
> - **(b) Vì sao cần:** để chất lượng không phụ thuộc thiện chí từng người. Thay vì hy vọng "ai cũng nhớ viết test", cổng chất lượng **chặn cứng** — không đạt thì không merge/deploy được. Nó biến chuẩn chất lượng từ "lời khuyên" thành "luật".
> - **(c) Ví dụ số:** đặt cổng \`coverage ≥ 80%\`. Một PR thêm 100 dòng nhưng chỉ test 50 dòng → coverage tụt còn 76% → **pipeline đỏ**, PR bị chặn cho tới khi bổ sung test. Không ai phải "nhắc" thủ công.

**Ví dụ pseudo-YAML với cổng.**

\`\`\`yaml
- run: go test -coverprofile=cov.out ./...
- run: |                                  # cổng chất lượng coverage
    pct=$(go tool cover -func=cov.out | tail -1 | grep -o '[0-9.]*')
    if (( $(echo "$pct < 80" | bc) )); then
      echo "Coverage $pct% < 80% — chặn!"; exit 1   # exit != 0 → pipeline đỏ
    fi
\`\`\`

> ❓ **"Đặt cổng coverage 100% cho chắc?"** Không nên. Cổng quá ngặt (coverage 100%, 0 cảnh báo mọi mức) làm pipeline đỏ liên miên vì lý do vụn vặt → đội mệt mỏi rồi tìm cách "lách" (vô hiệu hóa cổng). Cổng tốt là **ngặt vừa đủ ở thứ thật sự quan trọng** (vd chặn lỗ hổng Critical, coverage ngưỡng hợp lý 70–85%), không phải càng cao càng tốt.

> ⚠ **Lỗi thường gặp.** Coi mọi stage là quality gate. Một số stage chỉ **thông tin** (vd báo cáo kích thước bundle); chỉ những stage **chặn được pipeline khi không đạt** mới là cổng chất lượng thật. Cổng = có quyền nói "không cho đi tiếp".

> 🔁 **Dừng lại tự kiểm tra.** Security scan tìm thấy 1 lỗ hổng mức "Medium", cổng đặt là "chặn nếu có High/Critical". Pipeline xanh hay đỏ?
> <details><summary>Đáp án</summary><b>Xanh</b> — cổng chỉ chặn ở mức High/Critical, lỗ hổng Medium chỉ được ghi nhận (cảnh báo) chứ không vượt ngưỡng chặn. Lỗ hổng Medium vẫn nên xử lý, nhưng nó không làm dừng pipeline theo cấu hình cổng này.</details>

📝 **Tóm tắt mục 4.** Pipeline trưởng thành = nhiều stage (lint → build → test → scan → deploy → smoke). **Cổng chất lượng** là điều kiện đo được chặn pipeline khi không đạt (coverage, lỗ hổng...). Cổng biến chuẩn chất lượng thành luật cứng — nhưng phải ngặt *vừa đủ*.

---

## 5. Chiến lược release: blue-green, canary, rolling

💡 **Trực giác.** Khi đã có bản mới sẵn sàng, **đưa nó tới người dùng cách nào** để nếu lỡ có lỗi thì ít người bị ảnh hưởng và quay lui được nhanh? Đó là câu hỏi của **chiến lược release**. Hình dung mở một nhà hàng phiên bản mới: bạn có thể (a) mở song song hai bếp rồi chuyển khách sang bếp mới cùng lúc (blue-green), (b) cho 5% khách thử bếp mới trước (canary), hay (c) thay từng đầu bếp một (rolling).

### 5.1 Blue-green

Chạy **hai môi trường y hệt**: **blue** (bản đang phục vụ) và **green** (bản mới). Triển khai bản mới lên green, kiểm tra kỹ, rồi **chuyển toàn bộ traffic** từ blue sang green trong một nhịp (đổi router/load balancer).

\`\`\`
Trước:  100% traffic → [BLUE v1]      [GREEN v2] (deploy & test, 0% traffic)
Sau:      0% traffic → [BLUE v1]   100% traffic → [GREEN v2]
Lỗi?  → trỏ ngược về BLUE = rollback tức thì (vài giây)
\`\`\`

- **Giảm rủi ro thế nào:** rollback = đổi router trỏ lại blue → **gần như tức thì**, vì blue vẫn còn nguyên.
- **Giá phải trả:** tốn **gấp đôi tài nguyên** trong lúc chuyển (hai môi trường cùng chạy).

### 5.2 Canary

Đẩy bản mới cho **một tỷ lệ nhỏ người dùng trước** (vd 5%), theo dõi chỉ số (lỗi, độ trễ); nếu ổn thì **tăng dần** 5% → 25% → 50% → 100%. "Canary" lấy từ "chim hoàng yến trong mỏ than" — con chim phát hiện khí độc trước, cứu cả đội.

\`\`\`
Bước 1:   5% → v2  ·  95% → v1     (theo dõi 10 phút)
Bước 2:  25% → v2  ·  75% → v1     (ổn → tăng tiếp)
Bước 3:  50% → v2  ·  50% → v1
Bước 4: 100% → v2                   (hoàn tất)
Lỗi ở bước 1?  → kéo về 0%, chỉ 5% user bị ảnh hưởng trong 10 phút
\`\`\`

- **Giảm rủi ro thế nào:** lỗi (nếu có) chỉ chạm **5% người dùng trong thời gian ngắn**, không phải toàn bộ. Đây là cách an toàn nhất để bắt lỗi chỉ-lộ-trên-production.
- **Giá phải trả:** phức tạp hơn — cần định tuyến theo phần trăm và **giám sát tốt** để biết khi nào nên tăng/dừng.

### 5.3 Rolling

Thay bản mới **lần lượt từng instance** (máy chủ) một, trong khi các instance còn lại vẫn phục vụ bản cũ.

\`\`\`
4 instance:  [v1][v1][v1][v1]
bước 1:      [v2][v1][v1][v1]   (thay 1, còn 3 phục vụ)
bước 2:      [v2][v2][v1][v1]
...
xong:        [v2][v2][v2][v2]
\`\`\`

- **Giảm rủi ro thế nào:** không bao giờ tắt hết dịch vụ; nếu instance mới lỗi, dừng quá trình khi mới thay 1-2 máy.
- **Giá phải trả:** trong lúc rolling, **cả v1 và v2 cùng chạy** → phải đảm bảo hai phiên bản tương thích (vd schema DB). Rollback chậm hơn blue-green (phải rolling ngược lại).

### 5.4 So sánh & rollback

| Chiến lược | Tốc độ rollback | Tốn tài nguyên | Mức "blast radius" khi lỗi |
|------------|-----------------|----------------|----------------------------|
| **Blue-green** | Tức thì (đổi router) | Gấp đôi (tạm thời) | Toàn bộ (vì chuyển 100% một nhịp) — nhưng lui được ngay |
| **Canary** | Nhanh (kéo % về 0) | Ít hơn | Nhỏ nhất (chỉ % nhỏ user) |
| **Rolling** | Chậm (rolling ngược) | Ít (không cần nhân đôi) | Trung bình (số instance đã thay) |

> 💡 **Rollback là gì?** Là **quay về phiên bản trước đó** khi bản mới gặp sự cố — "nút undo của triển khai". Một chiến lược release tốt được đánh giá phần lớn ở chỗ **rollback nhanh & an toàn cỡ nào**. Blue-green rollback nhanh nhất; canary giới hạn thiệt hại ngay từ đầu nên ít khi cần rollback toàn diện.

> ❓ **"Chọn cái nào?"** Tùy bối cảnh: cần **rollback tức thì** và đủ tài nguyên → blue-green; cần **an toàn tối đa** cho thay đổi rủi ro & có giám sát tốt → canary; chạy nhiều instance, muốn đơn giản & tiết kiệm → rolling. Thực tế hay **kết hợp** (vd canary trên một cụm blue-green).

> ⚠ **Lỗi thường gặp.** Quên rằng rolling/canary khiến **hai phiên bản chạy đồng thời**. Nếu v2 đổi schema DB theo cách v1 không đọc được → v1 gãy ngay khi v2 lên. Quy tắc: thay đổi schema phải **tương thích ngược** (backward compatible), tách "thêm cột" và "xóa cột cũ" thành hai release riêng.

> 🔁 **Dừng lại tự kiểm tra.** Bạn sắp release một thay đổi rủi ro cao (viết lại engine tính giá), có hệ thống giám sát lỗi/độ trễ realtime. Chiến lược nào hợp nhất và vì sao?
> <details><summary>Đáp án</summary><b>Canary</b>. Thay đổi rủi ro cao → muốn lỗi (nếu có) chỉ chạm một phần nhỏ người dùng; có giám sát realtime → biết ngay khi chỉ số xấu để kéo % về 0. Canary giới hạn "blast radius" tốt nhất và tận dụng đúng năng lực giám sát. Blue-green chuyển 100% một nhịp nên thay đổi rủi ro cao sẽ chạm tất cả người dùng cùng lúc (dù lui được nhanh).</details>

📝 **Tóm tắt mục 5.** Ba chiến lược: **blue-green** (hai môi trường, đổi router → rollback tức thì, tốn gấp đôi), **canary** (mở dần theo % → blast radius nhỏ nhất, cần giám sát), **rolling** (thay từng instance → tiết kiệm, cần tương thích hai phiên bản). Tiêu chí chọn: tốc độ **rollback** và **phạm vi ảnh hưởng** khi lỗi.

---

## 6. Mở rộng: feature flag, secrets, môi trường

### 6.1 Feature flag

💡 **Trực giác.** **Feature flag** (cờ tính năng) là một công tắc \`if (flag.enabled) { tính_năng_mới() }\` cho phép **bật/tắt tính năng mà không cần deploy lại**. Code mới được đưa lên production nhưng *ẩn*, chỉ bật cho một nhóm người khi sẵn sàng.

Feature flag là cầu nối tự nhiên với **trunk-based development** (merge thẳng vào nhánh chính, tránh branch dài ngày — xem [Lesson 04 — Git workflow](../../01-Foundations/lesson-04-git-workflow-team/)): code chưa hoàn thiện vẫn merge sớm vào trunk nhưng được **giấu sau cờ tắt**, nên không phá ai. Tách rời **deploy** (đưa code lên) khỏi **release** (cho người dùng thấy).

**Ví dụ.**
\`\`\`go
if featureFlags.IsOn("new_checkout", user) {
    return newCheckout(user)   // bật cho 5% user nội bộ
}
return oldCheckout(user)        // 95% còn lại vẫn dùng bản cũ
\`\`\`
Lỗi? → tắt cờ (không cần deploy) → mọi người về bản cũ tức thì. Đây cũng là một dạng "rollback" cực nhanh ở mức tính năng.

### 6.2 Secrets

⚠ **Secrets** (khóa API, mật khẩu DB, token) **tuyệt đối không hard-code trong repo**. Lộ secret lên Git = sự cố bảo mật (kẻ xấu quét repo công khai tìm key). Thay vào đó:
- Lưu trong **secret manager** của CI (GitHub Secrets, Vault...) và **tiêm vào lúc chạy** qua biến môi trường.
- Pipeline nên có stage **secret scanning** chặn PR nếu phát hiện key bị commit nhầm (xem cổng chất lượng mục 4).

\`\`\`yaml
- run: deploy.sh
  env:
    DB_PASSWORD: \${{ secrets.DB_PASSWORD }}   # lấy từ vault, KHÔNG ghi vào code
\`\`\`

### 6.3 Môi trường dev / staging / production

💡 Phần mềm thường chạy qua **chuỗi môi trường** tăng dần độ giống thật:

| Môi trường | Mục đích | Ai dùng |
|------------|----------|---------|
| **dev** | Lập trình & thử nhanh | Lập trình viên |
| **staging** | Bản sao gần giống production để test cuối | QA, demo nội bộ |
| **production (prod)** | Bản chạy thật | Người dùng cuối |

Pipeline thường deploy lên **staging trước**, chạy smoke test, rồi mới (tự động hoặc qua cổng) lên **production**. Tách môi trường giúp lỗi bị bắt ở staging không chạm người dùng thật.

> 🔁 **Dừng lại tự kiểm tra.** Feature flag giúp gì khi muốn release một tính năng rủi ro nhưng *không* muốn tách thành nhiều bản deploy?
> <details><summary>Đáp án</summary>Cho phép <b>deploy code lên production mà vẫn giấu tính năng sau cờ tắt</b>, rồi bật dần (vd 5% user) và tắt tức thì nếu lỗi — tất cả không cần deploy lại. Nó tách "đưa code lên" khỏi "cho người dùng thấy", và là một dạng rollback cực nhanh ở mức tính năng.</details>

📝 **Tóm tắt mục 6.** **Feature flag** tách deploy khỏi release, bật/tắt tính năng không cần deploy lại (hợp với trunk-based). **Secrets** không bao giờ hard-code — dùng secret manager + scan. **Môi trường** dev → staging → prod tăng dần độ giống thật, deploy qua staging trước để chặn lỗi sớm.

---

## 7. Bài tập

1. Giải thích "merge hell" và nêu *cụ thể* CI giúp tránh nó thế nào. Cho một con số minh họa (tần suất merge vs lượng xung đột).
2. Cho pipeline \`lint → build → test\`. Test mất 50s, build 20s, lint 5s. Vì sao đặt \`lint\` đầu tiên? Nếu một PR có lỗi cú pháp thì pipeline báo đỏ sau bao nhiêu giây?
3. Phân biệt Continuous **Delivery** và Continuous **Deployment** trong đúng một câu, rồi cho mỗi loại một tình huống thực tế nên dùng.
4. Đội đặt cổng chất lượng \`coverage ≥ 80%\`. Một PR thêm 200 dòng code mới và 40 dòng test; trước PR coverage là 82% trên 1000 dòng. Coverage mới khoảng bao nhiêu, pipeline xanh hay đỏ? (ước lượng thô).
5. Bạn release một thay đổi rủi ro cao và có hệ thống giám sát realtime. Chọn giữa blue-green và canary, giải thích dựa trên "blast radius" và rollback.
6. (Mở rộng) Một tính năng mới chưa chắc đúng, nhưng code đã sẵn. Mô tả cách dùng **feature flag** để đưa nó lên production an toàn mà không cần branch dài ngày.

## Lời giải chi tiết

**Bài 1.** "Merge hell" là tình trạng **xung đột merge dồn cục** khi nhiều người tích hợp code muộn: ai cũng đã sửa cùng vùng code theo cách khác nhau trong thời gian dài → ghép lại rất khó. CI giúp tránh bằng cách **khuyến khích merge thường xuyên** (mỗi lần build+test tự động xác minh) → cửa sổ "chưa thấy thay đổi của nhau" ngắn lại. *Số minh họa:* merge 1 lần/3 tuần → hàng chục file xung đột, gỡ cả ngày; merge ~1 lần/ngày → vài dòng, gỡ vài phút. Tổng code đổi như nhau nhưng xung đột được chia nhỏ thành nhiều lần dễ xử lý.

**Bài 2.** Đặt \`lint\` đầu vì nguyên tắc **fail fast**: chạy stage **rẻ/nhanh trước** để báo lỗi sớm, không phí thời gian các stage đắt. Nếu code lỗi cú pháp cơ bản thì không cần chạy build (20s) hay test (50s). PR có lỗi cú pháp sẽ bị bắt ở stage lint và pipeline báo đỏ sau **~5 giây** (chỉ chạy hết lint rồi dừng).

**Bài 3.** *Một câu phân biệt:* cả hai đưa bản build tới ngưỡng production, nhưng **Continuous Delivery cần một người bấm nút "release" thủ công** trước khi vào production, còn **Continuous Deployment tự động lên thẳng** khi pipeline xanh. *Tình huống:* Delivery → ngân hàng/app store cần phê duyệt & lịch công bố (có dấu vết duyệt, chọn giờ release). Deployment → web SaaS có test mạnh, ship 30 lần/ngày, muốn bỏ độ trễ của bước bấm tay.

**Bài 4.** Trước PR: 82% × 1000 = ~820 dòng được phủ. Thêm 200 dòng mới, giả sử 40 dòng test phủ ~40 dòng mới (thô) → tổng dòng = 1200, dòng được phủ ≈ 820 + 40 = 860. Coverage mới ≈ 860 / 1200 ≈ **71.7%**. Vì 71.7% < 80% → **pipeline đỏ**, PR bị chặn cho tới khi bổ sung test. (Bài học: thêm nhiều code mà ít test sẽ kéo coverage tụt qua cổng — đúng mục đích của cổng chất lượng.)

**Bài 5.** Chọn **canary**. Lý do dựa trên hai tiêu chí: (1) *Blast radius* — thay đổi rủi ro cao, ta muốn lỗi (nếu có) chỉ chạm một **phần nhỏ** người dùng (vd 5%) trong thời gian ngắn; canary làm đúng điều này, còn blue-green chuyển 100% traffic một nhịp nên lỗi chạm **toàn bộ** người dùng cùng lúc. (2) *Rollback/giám sát* — có giám sát realtime nghĩa là ta phát hiện chỉ số xấu ngay ở bước 5% và **kéo % về 0** trước khi mở rộng. Canary tận dụng đúng năng lực giám sát để bắt lỗi-chỉ-lộ-trên-prod với thiệt hại tối thiểu. (Blue-green vẫn rollback nhanh, nhưng không giới hạn được phạm vi ban đầu.)

**Bài 6.** Cách dùng feature flag: (1) Viết tính năng mới sau một cờ tắt: \`if flags.IsOn("new_x", user) { newX() } else { oldX() }\`. (2) **Merge thẳng vào nhánh chính (trunk)** dù chưa hoàn thiện — vì cờ tắt nên không ảnh hưởng ai, tránh được branch dài ngày & merge hell. (3) **Deploy code lên production** (code có mặt nhưng ẩn). (4) Bật cờ cho một nhóm nhỏ (nội bộ → 5% user), theo dõi. (5) Ổn thì tăng dần tới 100%; **lỗi thì tắt cờ tức thì** (không cần deploy lại) → mọi người về bản cũ ngay. Như vậy đã tách *deploy* (đưa code lên) khỏi *release* (cho người dùng thấy), và có "rollback" cực nhanh ở mức tính năng.

---

## 8. Code & Minh họa

- [visualization.html](./visualization.html) — 3 mô-đun tương tác:
  1. **Pipeline tương tác:** bấm "▶ Push" → các stage (lint → build → test → deploy) chạy lần lượt với đèn xanh/đỏ; chọn cho một stage fail để thấy pipeline **dừng tại đó** (fail fast).
  2. **Blue-green vs Canary:** sơ đồ SVG (có \`viewBox\`) hiển thị phần trăm traffic giữa hai phiên bản; bấm "tiến/lui" để thấy cách mỗi chiến lược phân phối traffic và rollback.
  3. **CI hay không CI:** so sánh thời gian (và chi phí) phát hiện cùng một lỗi — bắt sớm trong CI vs lọt lên production.

## 9. Bài tiếp theo

- [Lesson 04 — Container & triển khai](../lesson-04-containers-deployment/) — đóng gói ứng dụng bằng container để bản build chạy *giống hệt nhau* ở mọi môi trường, nền tảng cho việc triển khai mà pipeline CI/CD ở bài này điều phối.
- Liên quan: [Lesson 05 — Observability & độ tin cậy](../lesson-05-observability-reliability/) — giám sát chính là "lưới an toàn" giúp canary/Continuous Deployment chạy an toàn.
`;
