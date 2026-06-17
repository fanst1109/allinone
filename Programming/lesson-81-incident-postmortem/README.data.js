// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-81-incident-postmortem/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 81 — Incident Management & Postmortem

> Tier 7 (Production) · LESSON CUỐI của Tier 7 · Hệ thống sẽ fail — nghệ thuật không phải "không bao giờ fail" mà là **phát hiện nhanh, khôi phục nhanh, học từ mỗi lần fail**.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **reliability mindset**: "Everything fails all the time" — thiết kế để *recover*, không phải để *không bao giờ fail*.
- Phân biệt rõ **SLI / SLO / SLA** và tính được downtime cho phép từ con số phần trăm (walk-through: 99.9% = 43 phút/tháng).
- Hiểu **error budget**: phần "được phép fail" = 100% − SLO, và dùng nó để ra quyết định ship feature hay freeze.
- Nắm **on-call**: rotation, escalation, runbook, alert fatigue, actionable alert.
- Thuộc lòng **incident lifecycle**: Detect → Triage → Mitigate → Resolve → Postmortem.
- Phân loại **severity** (SEV1 → SEV4) và gán response time tương ứng.
- Biết **incident roles**: Incident Commander (IC), Communications Lead, Operations Lead.
- Hiểu nguyên tắc **mitigate trước, fix sau** (stop the bleeding).
- Viết được **blameless postmortem** và hiểu *vì sao* blameless là điều kiện sống còn để học hỏi.
- Làm **root cause analysis** bằng 5 Whys, fishbone, contributing factors.
- Viết **action items** đúng chuẩn: concrete, owned, có deadline.
- Hiểu **toil reduction**, **chaos engineering**, và bộ chỉ số **MTTR / MTBF**.
- Tránh các **pitfall** kinh điển: blame culture, no runbook, alert fatigue, fix symptom, no postmortem, SLO quá cao.

## Kiến thức tiền đề

- [Lesson 72 — Structured Logging](../lesson-72-structured-logging/) — log là nguồn để Detect và dựng timeline postmortem.
- [Lesson 73 — Metrics & Prometheus](../lesson-73-metrics-prometheus/) — SLI đo bằng metrics; alert rule dựa trên metric.
- [Lesson 74 — Tracing & OpenTelemetry](../lesson-74-tracing-opentelemetry/) — trace giúp Triage tìm service lỗi.
- [Lesson 52 — Rate Limiting & Circuit Breaker](../lesson-52-rate-limiting-circuit-breaker/) — circuit breaker là một dạng mitigation tự động.
- [Lesson 51 — Graceful Shutdown](../lesson-51-graceful-shutdown/) — failover/rollout sạch sẽ giảm incident.
- Đây là **lesson cuối Tier 7**. Sau bài này đi tiếp sang [Tier 8 — Capstone Project](../tier-8-capstone/index.html).

---

## 1. Reliability mindset — "Everything fails all the time"

💡 **Trực giác.** Hãy hình dung một đội xe giao hàng 1000 chiếc. Bạn *không thể* đảm bảo "không xe nào hỏng" — lốp xẹp, hết xăng, kẹt xe là chuyện đương nhiên. Thứ bạn kiểm soát được là: *phát hiện xe hỏng nhanh thế nào*, *có xe thay thế không*, và *lần sau có lặp lại không*. Vận hành hệ thống phần mềm y hệt vậy.

Câu nói nổi tiếng của Werner Vogels (CTO Amazon): **"Everything fails all the time"** — mọi thứ đều hỏng, mọi lúc. Đĩa cứng hỏng (~1-2%/năm), mạng chập chờn, deploy lỗi, dependency bên thứ ba sập, người gõ nhầm lệnh. Ở quy mô lớn, "hiếm" trở thành "liên tục": nếu một sự kiện chỉ xảy ra với xác suất 0.01% mỗi request, mà bạn có 100 triệu request/ngày, thì nó xảy ra **10.000 lần/ngày**.

**Hệ quả tư duy:**

- Đừng hỏi *"làm sao để không bao giờ fail?"* (bất khả thi) — hỏi *"khi fail thì điều gì xảy ra, và ta recover nhanh thế nào?"*
- Thiết kế cho **graceful degradation** (giảm chức năng từ từ) thay vì **catastrophic failure** (sập toàn bộ). Ví dụ: feed mạng xã hội không load được ảnh → vẫn hiện text, thay vì trang trắng.
- **Redundancy** (dư thừa) và **failover** (chuyển dự phòng) là mặc định, không phải tính năng xa xỉ.
- Đo lường được "fail bao nhiêu là chấp nhận được" (mục 2-3: SLO + error budget) thay vì mơ hồ "phải luôn chạy".

⚠ **Lỗi thường gặp.** "Hệ thống của tôi rất ổn định, không cần lo incident." → Mọi hệ thống *đang chạy* đều sẽ có incident; câu hỏi chỉ là *khi nào*. Đội không chuẩn bị sẽ xử lý incident đầu tiên trong hoảng loạn, mất nhiều giờ cho việc lẽ ra mất vài phút.

🔁 **Dừng lại tự kiểm tra.**

<details>
<summary>Vì sao "100% uptime" là mục tiêu sai?</summary>

(1) Bất khả thi về vật lý — phần cứng, mạng, điện đều có thể hỏng. (2) Chi phí tiến tới vô hạn khi tiến gần 100% (mỗi "số 9" thêm vào đắt gấp ~10 lần). (3) Ngay cả khi service của bạn 100%, dependency (DNS, CDN, ISP của khách) vẫn fail. Mục tiêu đúng là một SLO *đủ tốt cho nhu cầu kinh doanh* (mục 2).
</details>

📝 **Tóm tắt mục 1.**
- Mọi thứ đều fail, mọi lúc — đặc biệt ở quy mô lớn.
- Mục tiêu là *recover nhanh*, không phải *không bao giờ fail*.
- Thiết kế cho degradation + redundancy + failover.
- "100% uptime" là mục tiêu sai; cần một SLO định lượng được.

---

## 2. SLI / SLO / SLA — đo độ tin cậy bằng số

Ba khái niệm này hay bị lẫn. Cách phân biệt: **SLI là số đo, SLO là mục tiêu nội bộ, SLA là cam kết có ràng buộc pháp lý với khách.**

### 2.1 SLI — Service Level Indicator (chỉ số đo)

**(a) Là gì.** SLI là một *metric định lượng* mô tả một khía cạnh chất lượng dịch vụ, thường biểu diễn dưới dạng **tỷ lệ "sự kiện tốt / tổng sự kiện"** trong một cửa sổ thời gian.

**(b) Vì sao cần.** Không đo được thì không quản lý được. "Hệ thống nhanh không?" là câu mơ hồ — SLI biến nó thành "99.5% request trả về < 200ms trong 30 ngày qua", một con số kiểm chứng được.

**(c) Ví dụ số cụ thể.** Các SLI phổ biến:

| SLI | Công thức | Ví dụ số |
|-----|-----------|----------|
| Availability | request thành công / tổng request | 9.985M / 10M = **99.85%** |
| Latency | % request nhanh hơn ngưỡng | 9.7M trong 10M < 300ms = **97%** |
| Error rate | request lỗi / tổng request | 15.000 / 10M = **0.15%** |
| Throughput | request xử lý mỗi giây | 1.2M / 86400s ≈ **13.9 req/s** trung bình |

> ❓ **"Availability" tính theo request hay theo thời gian?** Cả hai đều dùng được. **Request-based** (good requests / total) chuẩn cho service nhiều traffic. **Time-based** (uptime / tổng thời gian) chuẩn cho mục SLA "phút downtime". Bài này quy đổi qua lại ở mục 2.4.

### 2.2 SLO — Service Level Objective (mục tiêu nội bộ)

**(a) Là gì.** SLO là một *ngưỡng mục tiêu* đặt lên SLI, do đội tự đặt cho chính mình: "SLI availability của ta phải ≥ 99.9% mỗi tháng".

**(b) Vì sao cần.** SLO biến SLI thành một đường ranh giới ra quyết định: trên đường → ổn, tiếp tục ship feature; dưới đường → có vấn đề, phải hành động. Nó cũng là nền tảng để tính error budget (mục 3).

**(c) Ví dụ số.** SLO availability 99.9%, SLO latency "95% request < 250ms", SLO error rate "< 0.1%".

### 2.3 SLA — Service Level Agreement (cam kết với khách)

**(a) Là gì.** SLA là một *hợp đồng* với khách hàng, kèm **hậu quả** (thường là penalty/hoàn tiền) nếu vi phạm. Ví dụ: "uptime ≥ 99.9%; nếu thấp hơn, hoàn 10% phí tháng đó".

**(b) Vì sao cần.** SLA tạo ràng buộc thương mại — khách trả tiền để được bảo đảm. Đây là lý do **SLA luôn lỏng hơn SLO**: nếu SLA = 99.9% thì SLO nội bộ nên ~99.95% để có "vùng đệm" — đội biết có vấn đề (vi phạm SLO) *trước khi* khách bị ảnh hưởng tới mức đòi tiền (vi phạm SLA).

**(c) Ví dụ số.** AWS S3 SLA: < 99.9% → credit 10%; < 99.0% → credit 25%; < 95.0% → credit 100%.

\`\`\`
Chặt hơn  SLO (99.95%)  ──vùng đệm──►  SLA (99.9%)  Lỏng hơn
          (đội tự đặt)                  (cam kết khách)
          vi phạm trước → cảnh báo nội bộ, chưa mất tiền
\`\`\`

### 2.4 Walk-through: 99.9% nghĩa là bao nhiêu downtime?

Đây là phép tính phải tính được bằng tay. Công thức:

\`\`\`
downtime cho phép = (1 − SLO) × tổng thời gian
\`\`\`

Lấy 1 tháng = 30 ngày = \`30 × 24 × 60 = 43200\` phút.

**99.9% (ba số 9):**
\`\`\`
1 − 0.999 = 0.001
0.001 × 43200 phút = 43.2 phút/tháng   ≈ 43 phút
\`\`\`

**99.95%:**
\`\`\`
1 − 0.9995 = 0.0005
0.0005 × 43200 = 21.6 phút/tháng
\`\`\`

**99.99% (bốn số 9):**
\`\`\`
1 − 0.9999 = 0.0001
0.0001 × 43200 = 4.32 phút/tháng
\`\`\`

**99.999% (năm số 9 — "five nines"):**
\`\`\`
1 − 0.99999 = 0.00001
0.00001 × 43200 = 0.432 phút = 25.9 giây/tháng
\`\`\`

Bảng tổng hợp (tháng 30 ngày = 43200 phút; năm = 525600 phút):

| SLO | Downtime/tháng | Downtime/năm | Cảm nhận |
|-----|---------------:|-------------:|----------|
| 99% (hai 9) | 432 phút (7.2h) | 3.65 ngày | Lỏng — chỉ hợp internal tool |
| 99.9% (ba 9) | 43.2 phút | 8.76 giờ | Mặc định nhiều SaaS |
| 99.95% | 21.6 phút | 4.38 giờ | Service quan trọng |
| 99.99% (bốn 9) | 4.32 phút | 52.6 phút | Đắt — cần redundancy mạnh |
| 99.999% (năm 9) | 25.9 giây | 5.26 phút | Rất đắt — chỉ hạ tầng cốt lõi |

⚠ **Lỗi thường gặp.** Nghĩ "thêm một số 9 thì cố một tí là được". Mỗi số 9 thêm vào **giảm downtime cho phép xuống 1/10** → đòi hỏi đầu tư (redundancy, automation, on-call 24/7) tăng *cấp số nhân*. Đi từ 99.9% lên 99.99% thường tốn gấp 5-10 lần công sức nhưng giá trị kinh doanh thêm có thể không tương xứng (xem pitfall mục 15).

🔁 **Dừng lại tự kiểm tra.**

<details>
<summary>SLA của bạn là 99.9%. Nên đặt SLO nội bộ bằng bao nhiêu, vì sao?</summary>

Cao hơn SLA, ví dụ 99.95%. Lý do: cần "vùng đệm" để đội phát hiện và xử lý vấn đề *trước khi* khách bị ảnh hưởng tới ngưỡng vi phạm hợp đồng. Nếu đặt SLO = SLA = 99.9%, thì lúc bạn biết mình thủng SLO cũng là lúc đã vi phạm SLA → mất tiền + mất uy tín cùng lúc.
</details>

📝 **Tóm tắt mục 2.**
- SLI = số đo (good/total). SLO = mục tiêu nội bộ. SLA = cam kết với khách + penalty.
- SLO chặt hơn SLA để có vùng đệm.
- 99.9% = 43 phút/tháng; mỗi số 9 thêm vào giảm downtime 1/10 và tăng chi phí cấp số nhân.

---

## 3. Error budget — ngân sách được phép fail

💡 **Trực giác.** Hãy coi độ tin cậy như tài khoản chi tiêu. SLO 99.9% nghĩa là mỗi tháng bạn có một "ví" 43 phút downtime để *tiêu*. Mỗi incident là một lần rút ví. Còn tiền trong ví → cứ mạnh dạn ship feature mới (chấp nhận rủi ro). Cạn ví → dừng tiêu (freeze feature), tập trung trả nợ độ tin cậy.

**(a) Là gì.** Error budget = \`100% − SLO\`, là *lượng "không tin cậy" được phép tiêu* trong cửa sổ thời gian.

**(b) Vì sao tồn tại.** Nó giải quyết xung đột kinh điển giữa hai phe: **Dev muốn ship nhanh** (thêm tính năng → thêm rủi ro), **Ops muốn ổn định** (đừng động vào). Error budget biến cuộc cãi vã cảm tính thành quy tắc định lượng: *còn budget thì ship, hết budget thì dừng*. Cả hai phe cùng nhìn một con số.

**(c) Ví dụ số cụ thể.**

\`\`\`
SLO = 99.9% trong 30 ngày
Error budget = 0.1% × tổng = 43.2 phút downtime (hoặc theo request:)

Giả sử 10.000.000 request/tháng.
Budget lỗi = 0.1% × 10M = 10.000 request được phép fail.

Đầu tháng: đã fail 0 request    → budget còn 100% → ship thoải mái.
Giữa tháng: deploy lỗi, fail 7.000 req → budget còn 30% → cẩn thận.
Cuối tháng: thêm 4.000 req fail (tổng 11.000 > 10.000)
            → BUDGET ÂM → FREEZE feature, chỉ làm reliability.
\`\`\`

**Error budget policy (chính sách)** điển hình:

- Còn > 50% budget → ship feature bình thường, có thể chấp nhận deploy rủi ro hơn.
- Còn 10-50% → ship cẩn thận hơn, tăng test/canary.
- Cạn budget (≤ 0) → **freeze tất cả feature mới**, mọi nỗ lực chuyển sang reliability (sửa bug, thêm test, cải thiện monitoring) cho tới khi budget hồi.
- Burn rate cao bất thường (đốt budget nhanh) → alert ngay, dù chưa cạn.

> ❓ **"Còn budget thì cố tình làm fail à?"** Không. Budget *không phải hạn ngạch phải tiêu hết*. Nó là *giới hạn an toàn* để cân bằng tốc độ và ổn định. Còn budget = bạn có "quyền chấp nhận rủi ro" khi ship; không có nghĩa phải gây lỗi cho đủ.

> ❓ **Burn rate là gì?** Là *tốc độ tiêu budget*. Nếu cả tháng budget là 43 phút mà chỉ trong 1 giờ đã tiêu 20 phút → burn rate = \`20/43 ÷ (1h/720h) ≈ 335×\` so với mức "tiêu đều". Cảnh báo burn rate nhanh giúp bắt incident lớn *trước khi* nó ăn hết tháng.

⚠ **Lỗi thường gặp.** Đặt SLO = 100% → error budget = 0 → *không bao giờ được phép ship gì rủi ro*, đồng thời mọi sự cố nhỏ đều là "vi phạm". SLO phải < 100% để budget có ý nghĩa.

🔁 **Dừng lại tự kiểm tra.**

<details>
<summary>Đội đã cạn error budget tháng này. Quản lý vẫn muốn ship feature mới gấp. Bạn nói gì?</summary>

Đưa con số ra: budget đã âm nghĩa là độ tin cậy *đang* dưới cam kết — ship thêm feature (thêm rủi ro) lúc này làm tình hình tệ hơn, có thể dẫn tới vi phạm SLA (mất tiền). Đề xuất: hoãn feature, dùng thời gian này trả nợ reliability; hoặc nếu feature *thực sự* cấp thiết về kinh doanh thì đó là quyết định có ý thức của lãnh đạo (đánh đổi rõ ràng), không phải lén lút. Error budget biến tranh luận thành quyết định minh bạch.
</details>

📝 **Tóm tắt mục 3.**
- Error budget = 100% − SLO = lượng fail được phép.
- Dùng để dung hòa Dev (ship nhanh) vs Ops (ổn định): còn budget → ship, hết → freeze.
- Burn rate = tốc độ tiêu budget; cảnh báo burn nhanh bắt incident sớm.
- SLO phải < 100% để budget có nghĩa.

---

## 4. On-call — trực sự cố

💡 **Trực giác.** On-call giống bác sĩ trực cấp cứu: ngoài giờ vẫn có người sẵn sàng, có *phác đồ* (runbook) để xử lý nhanh, và không gọi bác sĩ dậy lúc 3h sáng vì chuyện cỏn con (alert fatigue).

### 4.1 Rotation & escalation

- **Rotation (luân phiên):** không ai trực 24/7 mãi — kiệt sức. Đội chia ca: mỗi người trực 1 tuần rồi chuyển. Có *primary* (người đầu tiên nhận) và *secondary* (backup nếu primary không phản hồi).
- **Escalation (leo thang):** nếu primary không ack alert trong X phút → tự động gọi secondary → rồi gọi manager. Đảm bảo alert không "rơi vào hư không".

### 4.2 Runbook — sổ tay xử lý

**(a) Là gì.** Runbook là tài liệu *từng-bước* cho một loại sự cố cụ thể: triệu chứng → cách chẩn đoán → cách khắc phục.

**(b) Vì sao cần.** Lúc 3h sáng, người trực (có thể không phải tác giả code) cần xử lý nhanh mà không phải "phát minh lại bánh xe" hay đoán mò. Runbook biến kiến thức trong đầu người này thành thứ ai cũng dùng được.

**(c) Ví dụ.** Runbook "API latency cao":
\`\`\`
1. Mở dashboard RED (link). Xác nhận p99 > 1s?
2. Check DB connection pool đã cạn chưa: metric db_conns_in_use / max.
3. Nếu cạn → scale up pod: kubectl scale deploy api --replicas=10.
4. Nếu DB chậm → check slow query log; bật circuit breaker tới dependency X.
5. Nếu không rõ → escalate cho secondary (link), đính kèm link dashboard.
\`\`\`

### 4.3 Alert fatigue vs actionable alert

**(a) Alert fatigue (mệt mỏi vì cảnh báo).** Khi có *quá nhiều* alert (đặc biệt alert giả/không cần làm gì), người trực bắt đầu **bỏ qua** tất cả — kể cả alert thật quan trọng. Đây là nguyên nhân gốc của nhiều incident nghiêm trọng (alert thật bị chôn trong rác).

**(b) Actionable alert (cảnh báo cần hành động).** Nguyên tắc vàng: **chỉ alert (đánh thức người) khi có một hành động cụ thể người đó phải làm ngay.** Nếu một alert không đòi hành động → nó là *dashboard/log*, không phải *page*.

**(c) Ví dụ phân loại:**

| Tín hiệu | Actionable? | Vì sao |
|----------|:-----------:|--------|
| "Disk sẽ đầy trong 4h" | ✅ Có | Cần dọn/scale ngay, kịp trước khi đầy |
| "Error rate > 5% trong 5 phút" | ✅ Có | Khách đang bị ảnh hưởng, cần điều tra |
| "CPU tăng 80% trong 30 giây" | ❌ Không | Có thể tự về; không có hành động rõ → noise |
| "Một cron job chạy" | ❌ Không | Sự kiện bình thường → log, đừng page |
| "Deploy thành công" | ❌ Không | Thông báo, không phải cấp cứu → Slack |

⚠ **Lỗi thường gặp.** Đặt alert cho *mọi* dao động metric "cho chắc". Kết quả: 200 alert/đêm → người trực mute hết → alert thật (DB down) bị bỏ qua 40 phút. **Ít alert nhưng đúng > nhiều alert.**

🔁 **Dừng lại tự kiểm tra.**

<details>
<summary>Alert "CPU > 90%" có nên page người trực dậy lúc 3h sáng không?</summary>

Thường là KHÔNG, nếu nó không kèm tác động tới user. CPU cao 1 phút rồi tự về không cần ai dậy. Đúng hơn: alert dựa trên *triệu chứng người dùng thấy* (latency, error rate) — đó là **symptom-based alerting**. CPU/memory là *nguyên nhân tiềm năng*, dùng để chẩn đoán *sau khi* đã bị page bởi alert symptom, chứ không page trực tiếp.
</details>

📝 **Tóm tắt mục 4.**
- Rotation chống kiệt sức; escalation đảm bảo alert luôn có người nhận.
- Runbook = sổ tay từng bước, để người trực xử lý nhanh không đoán mò.
- Chỉ alert khi có hành động cụ thể → tránh alert fatigue.
- Alert theo *triệu chứng user thấy* (symptom-based), không theo *nguyên nhân thô* (CPU).

---

## 5. Incident lifecycle — vòng đời một sự cố

Mọi incident đi qua 5 giai đoạn theo thứ tự. Thuộc lòng chuỗi này:

\`\`\`
Detect  →  Triage  →  Mitigate  →  Resolve  →  Postmortem
(phát    (phân     (cầm máu)    (sửa gốc)   (học)
 hiện)    loại)
\`\`\`

1. **Detect (phát hiện).** Hệ thống tự phát hiện qua monitoring/alert (lý tưởng) — *trước khi* khách báo. "Time to detect" càng nhỏ càng tốt. Nguồn: metric alert (L73), log error spike (L72), synthetic check, hoặc tệ nhất là khách than phiền.

2. **Triage (phân loại).** Gán **severity** (mục 6), ước lượng tác động (bao nhiêu user, mất doanh thu?), quyết định mức huy động người. Triage sai → hoặc huy động thừa (lãng phí) hoặc thiếu (incident kéo dài).

3. **Mitigate (cầm máu / giảm thiểu).** **Dừng tổn thất NGAY** — chưa cần biết nguyên nhân gốc. Cách phổ biến: **rollback** về phiên bản cũ, **failover** sang vùng/replica khác, **disable feature flag** đang lỗi, scale up. Đây là giai đoạn quan trọng nhất với user (mục 8).

4. **Resolve (sửa gốc).** Sau khi đã cầm máu và user ổn, *bình tĩnh* tìm và sửa **root cause** thật sự. Mitigate là băng gạc tạm; resolve là chữa lành.

5. **Postmortem (mổ xẻ / học).** Sau incident, viết tài liệu blameless (mục 9): chuyện gì xảy ra, vì sao, và *làm gì để không lặp lại*. Không có bước này → incident sẽ tái diễn.

> ❓ **Mitigate và Resolve khác nhau thế nào?** Mitigate = làm user *hết đau* (rollback → service chạy lại bằng code cũ). Resolve = sửa *nguyên nhân* để bug không còn (fix code mới, test, deploy lại an toàn). Có thể "đã mitigate" mà chưa "resolve" trong nhiều ngày — và điều đó **ổn**, vì user không còn bị ảnh hưởng.

📝 **Tóm tắt mục 5.**
- 5 giai đoạn: Detect → Triage → Mitigate → Resolve → Postmortem.
- Detect lý tưởng = tự động, trước khi khách báo.
- Mitigate = cầm máu ngay (rollback/failover), chưa cần root cause.
- Resolve = sửa gốc sau. Postmortem = học để không lặp lại.

---

## 6. Severity levels — mức độ nghiêm trọng

💡 **Trực giác.** Như phân loại bệnh nhân ở cấp cứu: người ngừng tim (SEV1) được ưu tiên tuyệt đối; người trầy xước nhẹ (SEV4) chờ được. Severity quyết định *huy động bao nhiêu người, nhanh thế nào*.

| Severity | Định nghĩa | Ví dụ | Response time | Huy động |
|----------|-----------|-------|--------------|----------|
| **SEV1** | Mất dịch vụ toàn bộ / mất dữ liệu / rò rỉ bảo mật | Toàn bộ API trả 500; checkout sập | Ngay lập tức (< 5 phút) | IC + toàn đội + thông báo lãnh đạo |
| **SEV2** | Suy giảm nghiêm trọng, một phần lớn user ảnh hưởng | Latency p99 tăng 10×; 1 region down | < 15-30 phút | On-call + đội liên quan |
| **SEV3** | Tác động hạn chế, có workaround | Một feature phụ lỗi; báo cáo chậm | Trong giờ làm việc | On-call xử lý |
| **SEV4** | Tác động tối thiểu, cosmetic | Typo UI; log warning thừa | Lên backlog | Xử lý theo kế hoạch |

**Quy tắc khi nghi ngờ:** *chọn severity CAO hơn*. Hạ cấp một incident dễ (sau khi rõ là nhỏ), nhưng nâng cấp muộn thì đã mất thời gian quý báu. Triage thừa an toàn hơn triage thiếu.

⚠ **Lỗi thường gặp.** Định nghĩa severity mơ hồ ("nghiêm trọng", "khá nghiêm trọng") → mỗi người hiểu khác → tranh cãi lúc đang cháy nhà. Severity phải có *tiêu chí khách quan* (số user ảnh hưởng, doanh thu/giờ mất, có mất data không).

🔁 **Dừng lại tự kiểm tra.**

<details>
<summary>Trang thanh toán lỗi 2% giao dịch. SEV mấy?</summary>

Tùy *tác động kinh doanh*. 2% giao dịch thanh toán = tiền thật mất + mất niềm tin → thường SEV1 hoặc SEV2, dù "chỉ 2%". Một feature *phụ* lỗi 2% có thể là SEV3. Bài học: severity gắn với *tác động*, không gắn với *tỷ lệ % thô*.
</details>

📝 **Tóm tắt mục 6.**
- SEV1 (toàn bộ outage / mất data) → SEV4 (cosmetic).
- Mỗi mức có response time và mức huy động tương ứng.
- Khi nghi ngờ, chọn severity cao hơn.
- Tiêu chí phải khách quan, không mơ hồ.

---

## 7. Incident roles — vai trò trong sự cố

Khi incident lớn (SEV1/SEV2), hỗn loạn nếu ai cũng làm mọi thứ. Mô hình **ICS (Incident Command System)** chia vai rõ ràng:

- **Incident Commander (IC) — Chỉ huy.** *Một người duy nhất* điều phối. IC **không tự sửa** — IC ra quyết định, phân công, giữ tiến độ. "Ai làm gì tiếp theo?" là việc của IC. Quan trọng nhất: IC giữ cho mọi người không giẫm chân nhau.
- **Communications Lead (Comms) — Liên lạc.** Cập nhật trạng thái cho *bên ngoài*: status page, khách hàng, lãnh đạo, support. Giải phóng IC và Ops khỏi việc trả lời "xong chưa?" liên tục.
- **Operations Lead (Ops) — Tác chiến.** Người *thực sự gõ lệnh*: rollback, scale, chạy query. Báo cáo cho IC.

> ❓ **Đội nhỏ 3 người có cần 3 vai không?** Có thể một người kiêm nhiều vai, nhưng *ý thức về vai* vẫn quan trọng: "lúc này tôi đang là IC (ra quyết định) hay Ops (gõ lệnh)?". Vai trò là *trách nhiệm*, không nhất thiết là *người riêng biệt*. Khi incident lớn lên, tách vai ra.

⚠ **Lỗi thường gặp.** Không có IC → 5 người cùng "sửa" song song, 2 người cùng rollback → conflict, không ai nắm bức tranh toàn cảnh, lãnh đạo gọi điện làm gián đoạn người đang gõ lệnh. Luôn chỉ định IC ngay khi mở incident SEV1/SEV2.

📝 **Tóm tắt mục 7.**
- IC điều phối (không tự sửa); Comms lo bên ngoài; Ops gõ lệnh.
- Một IC duy nhất tránh hỗn loạn.
- Đội nhỏ kiêm vai, nhưng phải ý thức "lúc này tôi đang đóng vai nào".

---

## 8. Mitigate trước, fix sau — "stop the bleeding"

💡 **Trực giác.** Người bị thương chảy máu: việc đầu tiên là *cầm máu* (băng ép), không phải *phẫu thuật tìm mạch máu nào vỡ*. Phẫu thuật làm sau khi bệnh nhân ổn định. Incident y hệt.

**Quy tắc:** khi service đang down/lỗi, ưu tiên #1 là **đưa user trở lại trạng thái hoạt động NHANH NHẤT**, kể cả bằng cách "thô" — *chưa cần* hiểu tại sao.

**Các kỹ thuật mitigate (nhanh, đảo ngược được):**

- **Rollback:** deploy vừa rồi gây lỗi → quay về bản trước. Đây là mitigation phổ biến nhất và nhanh nhất.
- **Feature flag off:** tắt feature mới đang lỗi mà không cần deploy.
- **Failover:** chuyển traffic sang region/replica/datacenter khỏe mạnh.
- **Scale up:** thêm instance nếu nghẽn tài nguyên.
- **Circuit breaker:** ngắt gọi tới dependency đang hỏng để không kéo sập cả hệ thống (xem [Lesson 52](../lesson-52-rate-limiting-circuit-breaker/)).
- **Rate limit / shed load:** chặn bớt traffic để phần còn lại sống.

\`\`\`
Incident bắt đầu (deploy v2.3 gây 500 hàng loạt)
   │
   ├─► MITIGATE (2 phút):  rollback về v2.2  → user hết bị 500  ✅
   │                        (CHƯA biết v2.3 sai chỗ nào — không sao)
   │
   └─► RESOLVE (sau, bình tĩnh): điều tra v2.3, tìm bug nil-pointer,
                                  viết test, deploy v2.4 đã fix.
\`\`\`

⚠ **Lỗi thường gặp.** Vừa thấy incident là lao vào *debug root cause* trong khi user vẫn đang chịu lỗi. Mỗi phút debug = thêm phút user đau + đốt error budget. **Cầm máu trước (rollback), điều tra sau.** Trừ khi rollback *không khả thi* (vd: migration DB không đảo ngược) thì mới bắt buộc fix forward — nhưng đó là ngoại lệ.

> ❓ **Rollback có làm mất manh mối điều tra không?** Một chút, nhưng log/metric/trace trước khi rollback vẫn còn. Hãy *chụp ảnh trạng thái* (snapshot log, heap dump nếu cần) rồi rollback. User ổn định quan trọng hơn việc giữ "hiện trường" sống.

🔁 **Dừng lại tự kiểm tra.**

<details>
<summary>Deploy mới gây lỗi. Nên (a) rollback ngay hay (b) tìm bug rồi hotfix?</summary>

(a) Rollback ngay — đó là mitigation nhanh nhất, đảo ngược được, đưa user về trạng thái tốt đã biết. Tìm bug + hotfix mất nhiều thời gian và *bản hotfix cũng có thể sai*. Chỉ fix-forward khi rollback bất khả thi (migration không đảo ngược, dữ liệu đã ghi sai...).
</details>

📝 **Tóm tắt mục 8.**
- Mitigate trước (cầm máu): rollback, feature flag, failover, scale, circuit breaker.
- Resolve (root cause) làm sau khi user đã ổn.
- Rollback thường là mitigation nhanh & an toàn nhất.
- Chụp snapshot trước khi rollback để giữ manh mối.

---

## 9. Blameless postmortem — mổ xẻ không đổ lỗi

💡 **Trực giác.** Ngành hàng không an toàn nhờ văn hóa *báo cáo lỗi không bị phạt*: phi công khai báo sai sót → cả ngành học được → tai nạn giảm. Nếu khai báo bị đuổi việc, không ai khai → cùng một lỗi lặp lại tới chết người. Phần mềm mượn đúng triết lý này.

**(a) Là gì.** Postmortem (mổ xẻ sau sự cố) là tài liệu phân tích một incident. **Blameless** = tập trung vào *hệ thống và process*, **tuyệt đối không** chỉ trích/đổ lỗi cá nhân.

**(b) Vì sao blameless là điều kiện sống còn.** Chuỗi nhân quả:

\`\`\`
Có blame (đổ lỗi)
   → người sợ bị phạt
   → che giấu sai sót, không khai báo đầy đủ
   → postmortem thiếu sự thật
   → KHÔNG học được nguyên nhân thật
   → lỗi LẶP LẠI

Blameless (không đổ lỗi)
   → người an tâm kể đúng những gì đã xảy ra
   → postmortem có đủ sự thật
   → tìm ra lỗ hổng hệ thống/process
   → sửa hệ thống
   → lỗi KHÔNG lặp lại
\`\`\`

Tư duy cốt lõi: **"Nếu một người gõ nhầm lệnh xóa được cả production DB, thì lỗi nằm ở HỆ THỐNG cho phép điều đó (không có confirm, không có backup, không phân quyền), không phải ở người gõ."** Bất kỳ ai cũng có thể gõ nhầm; sửa con người không scale, sửa hệ thống thì có.

**(c) Template postmortem chuẩn:**

\`\`\`
# Postmortem: <Tiêu đề ngắn> (YYYY-MM-DD)

## Tóm tắt (Summary)
1-3 câu: chuyện gì, ảnh hưởng ai, kéo dài bao lâu.

## Tác động (Impact)
- Thời gian: HH:MM – HH:MM (tổng X phút)
- User ảnh hưởng: ~N user / Y% traffic
- Doanh thu/SLO: mất ~$Z, đốt P% error budget
- Severity: SEVx

## Timeline (mốc thời gian, theo phút)
- 14:02  Deploy v2.3 lên production.
- 14:05  Alert error rate > 5% (Detect).
- 14:08  On-call ack, mở incident SEV2 (Triage).
- 14:12  Rollback về v2.2 (Mitigate). Error rate về bình thường.
- 15:30  Tìm ra nil-pointer trong handler X (Resolve điều tra).
- (hôm sau) Deploy v2.4 đã fix + test.

## Root cause (nguyên nhân gốc)
Phân tích 5 Whys / contributing factors (mục 10).

## Cái gì đã đúng / cái gì sai (What went well / wrong)
- Tốt: alert bắt được trong 3 phút; rollback nhanh.
- Tệ: thiếu test cho case input rỗng; canary deploy không bật.

## Action items (mục 11)
- [ ] [OWNER, deadline] Thêm test cho input rỗng ở handler X.
- [ ] [OWNER, deadline] Bật canary deploy cho service Y.
- [ ] [OWNER, deadline] Thêm nil-check + alert burn-rate.
\`\`\`

⚠ **Lỗi thường gặp.** Postmortem viết "do bạn A bất cẩn deploy giờ cao điểm". Sai: (1) đổ lỗi cá nhân → A và đồng nghiệp sẽ giấu giếm lần sau; (2) bỏ qua câu hỏi *vì sao hệ thống cho phép deploy giờ cao điểm mà không có chặn/canary?*. Viết lại blameless: "Quy trình deploy thiếu cơ chế canary và thiếu chặn deploy giờ cao điểm → action item: thêm cả hai."

🔁 **Dừng lại tự kiểm tra.**

<details>
<summary>Vì sao "đổ lỗi cá nhân" lại làm hệ thống KÉM tin cậy hơn theo thời gian?</summary>

Vì blame tạo *sợ hãi* → người ta che giấu sai sót và "near-miss" (suýt lỗi). Mất dữ liệu đó, tổ chức không thấy được các lỗ hổng hệ thống đang tích tụ → cùng lớp lỗi tái diễn, ngày càng nặng. Blameless tạo *an toàn tâm lý* → thông tin chảy → hệ thống được vá liên tục → ngày càng bền.
</details>

📝 **Tóm tắt mục 9.**
- Blameless = tập trung hệ thống/process, không đổ lỗi cá nhân.
- Blame → che giấu → không học → lỗi lặp. Blameless → an toàn → học → bền.
- "Người gõ nhầm được nghĩa là hệ thống thiếu rào chắn."
- Template: Summary → Impact → Timeline → Root cause → What went well/wrong → Action items.

---

## 10. Root cause analysis — truy nguyên nhân gốc

### 10.1 5 Whys (5 lần hỏi "tại sao")

Hỏi "tại sao" liên tiếp ~5 lần, mỗi câu trả lời là nguyên nhân của tầng trên, cho tới khi chạm *nguyên nhân hệ thống* (không phải triệu chứng).

**Ví dụ: "API trả 500 hàng loạt".**

\`\`\`
Vấn đề: API trả 500 hàng loạt lúc 14:05.

Why 1: Tại sao API trả 500?
   → Vì handler panic khi truy cập con trỏ nil.

Why 2: Tại sao con trỏ nil?
   → Vì response từ service thanh toán thiếu trường \`amount\`, code không kiểm tra.

Why 3: Tại sao code không kiểm tra trường thiếu?
   → Vì giả định "service thanh toán luôn trả đủ trường" — không có validation.

Why 4: Tại sao giả định đó lọt qua review/test?
   → Vì không có test cho case response thiếu trường; review không bắt.

Why 5: Tại sao không có test case đó?
   → Vì không có chuẩn "mọi response bên ngoài phải có test cho dữ liệu khuyết".

=> ROOT CAUSE: thiếu chuẩn/process kiểm tra input từ dependency bên ngoài.
   Action: (1) nil-check + giá trị mặc định; (2) test case dữ liệu khuyết;
           (3) thêm guideline "validate mọi external response" vào review checklist.
\`\`\`

Lưu ý: dừng khi chạm nguyên nhân *có thể sửa ở tầng hệ thống/process*, không nhất thiết đúng 5 lần — có khi 3, có khi 7.

⚠ **Lỗi thường gặp.** Dừng 5 Whys quá sớm ở triệu chứng ("vì handler panic" → fix bằng recover()) mà không đào tới process. Recover() chỉ giấu panic; lần sau vẫn panic chỗ khác. Phải đào tới *vì sao class lỗi này tồn tại*.

### 10.2 Fishbone diagram (sơ đồ xương cá / Ishikawa)

Khi nguyên nhân *không tuyến tính* (nhiều nhánh), vẽ sơ đồ xương cá: "đầu cá" là vấn đề, các "xương" là nhóm nguyên nhân.

\`\`\`
                People            Process
                  \\                 /
   thiếu training   \\   không có    /   review sơ sài
   on-call mới       \\  canary     /    test thiếu
                      \\           /
   ===================> [API 500 hàng loạt] <===================
                      /           \\
   deploy tool kém   /             \\   dependency thanh toán
   không feature flag/               \\  trả dữ liệu khuyết
                  /                   \\
              Tooling              Dependencies
\`\`\`

Mỗi nhánh (People / Process / Tooling / Dependencies, hoặc 6M tùy ngành) giúp đảm bảo *không bỏ sót* nhóm nguyên nhân nào.

### 10.3 Contributing factors — nhiều nguyên nhân, không chỉ một

💡 **Trực giác (mô hình phô mai Thụy Sĩ).** Mỗi lớp phòng thủ (test, review, canary, alert) như một lát phô mai có lỗ. Sự cố lớn xảy ra khi *các lỗ thẳng hàng* — nhiều lớp cùng thủng một lúc. Hiếm khi chỉ một nguyên nhân duy nhất.

Trong ví dụ trên, incident xảy ra vì **nhiều factor cùng lúc**:
1. Dependency trả dữ liệu khuyết (trigger).
2. Code không validate (lớp 1 thủng).
3. Test không phủ case đó (lớp 2 thủng).
4. Review không bắt (lớp 3 thủng).
5. Không có canary để giới hạn blast radius (lớp 4 thủng).

→ Action item nên *vá nhiều lớp*, không chỉ một. Sửa cả 5 → lần sau dù dependency lại trả khuyết, các lớp khác vẫn chặn.

📝 **Tóm tắt mục 10.**
- 5 Whys: hỏi "tại sao" tới khi chạm nguyên nhân hệ thống/process.
- Fishbone: phân nhóm nguyên nhân (People/Process/Tooling/Dependencies) để không bỏ sót.
- Thực tế thường *nhiều* contributing factors (mô hình phô mai Thụy Sĩ) → vá nhiều lớp.

---

## 11. Action items — biến bài học thành hành động

Postmortem mà không có action item thực thi được thì = không học gì. Action item tốt phải **SMART-ish**, tối thiểu 3 thuộc tính:

- **Concrete (cụ thể):** "Thêm nil-check + test cho response thiếu trường ở handler \`processPayment\`" — không phải "cẩn thận hơn".
- **Owned (có chủ):** gán *một người* chịu trách nhiệm. "Cả đội" = không ai.
- **Deadline (hạn chót):** có ngày. Không deadline → trôi vào quên lãng.

| Action item tệ | Action item tốt |
|----------------|-----------------|
| "Test kỹ hơn" | "[Lan, 30/05] Thêm test case response thiếu \`amount\` cho \`processPayment\`" |
| "Cải thiện monitoring" | "[Hùng, 02/06] Thêm alert burn-rate error budget > 10×, page on-call" |
| "Đừng deploy giờ cao điểm" | "[Minh, 05/06] Thêm chặn deploy 9-11h + bật canary 5% cho service api" |

**Phân loại action items:**
- **Prevent (ngăn tái diễn):** sửa root cause để lỗi không xảy ra lại.
- **Detect (phát hiện nhanh hơn):** thêm alert/monitoring để lần sau bắt sớm.
- **Mitigate (giảm thiệt hại):** feature flag, canary, circuit breaker để blast radius nhỏ hơn.

⚠ **Lỗi thường gặp.** Tạo action items rồi *không theo dõi* — chúng không bao giờ được làm, incident lặp lại. Phải đưa vào backlog/tracker và review định kỳ. Một số tổ chức coi "action item postmortem" là ưu tiên cao hơn feature.

📝 **Tóm tắt mục 11.**
- Action item = concrete + owned + deadline.
- Phân loại: Prevent / Detect / Mitigate.
- Phải track tới khi xong; không track = không học.

---

## 12. Toil reduction — giảm việc tay lặp đi lặp lại

**(a) Là gì.** Toil = công việc *thủ công, lặp lại, tự động hóa được, không tạo giá trị lâu dài, scale tuyến tính theo tải*. Ví dụ: mỗi lần disk đầy lại SSH vào xóa log bằng tay; mỗi lần deploy lại copy file thủ công 12 bước.

**(b) Vì sao cần giảm.** Toil ăn thời gian on-call (lẽ ra dành cho cải thiện hệ thống), gây mệt mỏi, và *dễ sai* (thao tác tay 12 bước → quên 1 bước → incident mới). Toil cũng *không scale*: traffic gấp đôi → toil gấp đôi.

**(c) Ví dụ giảm toil:**

| Toil (thủ công) | Sau khi tự động hóa |
|-----------------|---------------------|
| SSH xóa log khi disk đầy | logrotate + alert "disk 80%" |
| Restart service treo bằng tay | health check + auto-restart (k8s liveness probe, L76) |
| Deploy 12 bước copy file | CI/CD pipeline 1 lệnh (L77) |
| Tổng hợp report incident tay | script sinh report tự động |

Nguyên tắc SRE: nếu một việc thủ công làm > 2-3 lần → cân nhắc tự động hóa. Google SRE đặt mục tiêu **< 50% thời gian cho toil**, phần còn lại cho engineering cải thiện hệ thống.

📝 **Tóm tắt mục 12.**
- Toil = việc tay, lặp lại, tự động hóa được, scale tuyến tính.
- Giảm toil → bớt mệt, bớt sai, bớt incident, có thời gian cải thiện.
- Làm tay > 2-3 lần → tự động hóa.

---

## 13. Chaos engineering — chủ động tiêm lỗi

💡 **Trực giác.** Lính cứu hỏa *diễn tập cháy* để khi cháy thật không bỡ ngỡ. Chaos engineering = *cố tình* gây lỗi trong môi trường có kiểm soát để kiểm chứng hệ thống có thật sự resilient như ta tưởng.

**(a) Là gì.** Chaos engineering chủ động *tiêm failure* (kill instance, thêm latency, ngắt mạng, làm đầy disk) vào hệ thống — lý tưởng là trong production có kiểm soát — để phát hiện điểm yếu *trước khi* lỗi thật ập đến.

**(b) Vì sao cần.** Bạn *nghĩ* hệ thống chịu được mất 1 instance (vì có 3 replica). Nhưng đã thử chưa? **Chaos Monkey** (Netflix) ngẫu nhiên giết instance trong giờ làm việc — buộc mọi service phải *thật sự* chịu được, không chỉ "trên giấy". Lỗi phát hiện lúc 2h chiều (có cả đội) tốt hơn vô vàn lúc 3h sáng.

**(c) Ví dụ thí nghiệm chaos:**
\`\`\`
Giả thuyết: "Giết 1 trong 3 pod API thì latency không đổi đáng kể."
Thí nghiệm: kill 1 pod ngẫu nhiên lúc 14:00 (giờ làm việc, có giám sát).
Quan sát:   p99 nhảy 200ms→2s trong 40s vì health check timeout quá dài.
Kết luận:   giả thuyết SAI → action: giảm readiness probe timeout xuống 5s.
\`\`\`

⚠ **Lỗi thường gặp.** Chạy chaos *không có giả thuyết và không có nút dừng (abort)*. Chaos phải: có giả thuyết rõ, blast radius nhỏ lúc đầu (1 instance, không phải cả cluster), có cơ chế dừng ngay nếu vượt ngưỡng, chạy khi có người giám sát. Không phải "phá bừa".

📝 **Tóm tắt mục 13.**
- Chaos engineering = chủ động tiêm lỗi để kiểm chứng resilience.
- Chaos Monkey: giết instance ngẫu nhiên buộc hệ thống thật sự chịu lỗi.
- Phải có giả thuyết + blast radius nhỏ + nút dừng + giám sát.

---

## 14. MTTR / MTBF — đo khả năng phục hồi

**(a) Là gì.**
- **MTTR (Mean Time To Recovery)** = thời gian *trung bình* để khôi phục từ lúc incident bắt đầu tới lúc service ổn lại. (Có biến thể: MTTD = time to detect, MTTM = time to mitigate, MTTR có thể là Repair/Resolve/Recovery — luôn nói rõ định nghĩa.)
- **MTBF (Mean Time Between Failures)** = thời gian *trung bình giữa hai* lần fail.

**(b) Vì sao quan trọng — và vì sao ưu tiên MTTR.** Availability liên hệ với hai số này:
\`\`\`
Availability ≈ MTBF / (MTBF + MTTR)
\`\`\`
Bạn có thể tăng availability bằng cách *tăng MTBF* (ít fail hơn — khó, tiệm cận giới hạn) hoặc *giảm MTTR* (recover nhanh hơn — thường dễ hơn và bền vững hơn). Triết lý hiện đại: **chấp nhận sẽ fail, đầu tư để recover NHANH** (rollback tự động, runbook tốt, alert nhạy) thay vì cố ngăn mọi failure.

**(c) Ví dụ số cụ thể.**

\`\`\`
Tháng vừa rồi có 4 incident, tổng downtime:
   12 + 8 + 25 + 15 = 60 phút
MTTR = 60 / 4 = 15 phút/incident.

Tổng thời gian tháng = 43200 phút; downtime 60 phút.
MTBF ≈ (43200 − 60) / 4 ≈ 10.785 phút giữa các fail.

Availability = MTBF / (MTBF + MTTR)
            = 10785 / (10785 + 15)
            = 10785 / 10800
            ≈ 0.99861 = 99.86%.
\`\`\`

So sánh hai chiến lược cải thiện (giữ nguyên 4 incident/tháng):

| Chiến lược | Thay đổi | Downtime/tháng | Availability |
|-----------|----------|---------------:|-------------:|
| Hiện tại | MTTR 15 phút | 60 phút | 99.86% |
| Giảm MTTR | MTTR → 5 phút (rollback tự động) | 20 phút | **99.95%** |
| Tăng MTBF | 4 → 2 incident, MTTR 15 phút | 30 phút | 99.93% |

→ Giảm MTTR (recover nhanh) cho kết quả tốt nhất ở đây, và thường *khả thi hơn* việc ép giảm số lần fail.

🔁 **Dừng lại tự kiểm tra.**

<details>
<summary>Hai đội: đội A fail 10 lần/tháng nhưng recover trong 1 phút; đội B fail 1 lần/tháng nhưng mất 3 giờ recover. Đội nào availability cao hơn?</summary>

Đội A. Downtime A = 10 × 1 = 10 phút/tháng (≈99.977%). Downtime B = 1 × 180 = 180 phút/tháng (≈99.58%). Recover nhanh (MTTR thấp) thắng việc hiếm fail (MTBF cao) khi mỗi fail kéo dài. Đây là lý do đầu tư vào MTTR.
</details>

📝 **Tóm tắt mục 14.**
- MTTR = thời gian khôi phục trung bình; MTBF = thời gian giữa hai fail.
- Availability ≈ MTBF / (MTBF + MTTR).
- Ưu tiên giảm MTTR (recover nhanh) hơn ép MTBF (không bao giờ fail).

---

## 15. Common pitfalls — bẫy thường gặp

| Pitfall | Hậu quả | Cách tránh |
|---------|---------|-----------|
| **Blame culture** | Người che giấu sai sót → không học được → lỗi lặp | Blameless postmortem; sửa hệ thống không sửa người |
| **No runbook** | Mỗi incident "phát minh lại bánh xe", chậm, dễ sai lúc 3h sáng | Viết runbook cho mọi alert; cập nhật sau mỗi incident |
| **Alert fatigue** | Quá nhiều alert → mute hết → bỏ lỡ alert thật | Chỉ alert khi actionable; alert theo symptom |
| **Fix symptom** | Vá triệu chứng (recover panic) không root cause → tái diễn | 5 Whys tới nguyên nhân hệ thống; vá nhiều lớp |
| **No postmortem** | Cùng một lỗi lặp lại mãi vì không ai học | Postmortem bắt buộc cho SEV1/SEV2; track action items |
| **SLO quá cao** | Đặt 99.999% → tốn kém vô ích, freeze feature liên miên | Đặt SLO khớp nhu cầu kinh doanh thật; mỗi số 9 đắt gấp 10 |
| **Không IC trong incident lớn** | Hỗn loạn, giẫm chân, không ai nắm toàn cảnh | Chỉ định IC ngay khi mở SEV1/SEV2 |
| **Debug trước, mitigate sau** | User chịu lỗi lâu hơn, đốt error budget | Cầm máu trước (rollback), điều tra sau |

⚠ **Bẫy nặng nhất: SLO quá cao.** Nhiều đội tự hào "chúng tôi nhắm 99.999%" mà không hỏi *khách có cần không*. Một blog cá nhân nhắm five-nines là phí tiền. Mỗi số 9 thêm vào đòi: redundancy đa region, on-call 24/7 chặt, automation đắt, và *freeze feature thường xuyên hơn* (budget bé tí). Chọn SLO theo *giá trị kinh doanh của downtime*, không theo *niềm tự hào kỹ thuật*.

📝 **Tóm tắt mục 15.**
- Tránh: blame, no runbook, alert fatigue, fix symptom, no postmortem, SLO quá cao, không IC, debug-trước-mitigate-sau.
- Mỗi pitfall đều có cách tránh cụ thể đã học ở các mục trên.
- Bẫy đắt nhất: SLO cao hơn nhu cầu thật → lãng phí khổng lồ.

---

## 16. Ứng dụng thực tế trong phần mềm

> 💡 **Sự cố là chuyện CHẮC CHẮN xảy ra, không phải "nếu". Khác biệt giữa team trưởng thành và non là cách họ phản ứng + học từ sự cố.**

| Giai đoạn | Việc làm |
|-----------|----------|
| **Phát hiện** | Alert dựa observability (metrics/trace/log) — biết trước user báo |
| **Giảm thiểu** | Rollback/feature flag/scale — **khôi phục dịch vụ trước**, tìm nguyên nhân sau |
| **Postmortem** | Sau sự cố: timeline, root cause, action item phòng tái diễn |
| **Blameless** | Đổ lỗi quy trình/hệ thống, không cá nhân → người ta dám nói thật |

### 16.1. Ví dụ cụ thể — khôi phục trước, điều tra sau

API sập lúc 2h sáng. Sai lầm junior: ngồi debug tìm nguyên nhân gốc trong khi user vẫn down. Đúng: **giảm thiểu trước** — deploy gần nhất gây ra? → **rollback ngay** (dịch vụ hồi phục) → *rồi* mới điều tra commit nào trong môi trường an toàn. Hoặc tắt feature flag tính năng lỗi, scale thêm nếu quá tải. Mục tiêu #1 lúc sự cố: **MTTR (thời gian khôi phục) thấp**, không phải "hiểu ngay nguyên nhân". Công cụ: observability ([metrics](../lesson-73-metrics-prometheus/)/[tracing](../lesson-74-tracing-opentelemetry/)) để khoanh vùng nhanh, [graceful rollback](../lesson-77-ci-cd-pipeline/) để hồi phục an toàn.

> 💡 **Postmortem blameless = vàng cho team.** Sau sự cố, viết postmortem: **timeline** (mấy giờ gì xảy ra), **root cause** (dùng "5 whys" — hỏi tại sao 5 lần tới gốc), **action items** (sửa gì để không tái diễn — thêm alert, thêm test, sửa quy trình). Then chốt: **blameless** — không đổ lỗi cá nhân ("ai deploy?") mà hỏi hệ thống ("vì sao quy trình cho phép deploy này gây sập? thiếu test/canary/review gì?"). Đổ lỗi cá nhân → người ta giấu lỗi → không học được. Văn hóa blameless (Google/Etsy) làm hệ thống mạnh dần qua mỗi sự cố. Sự cố là cơ hội học, không phải toà án.

### 16.2. 📝 Tóm tắt mục 16

- Sự cố chắc chắn xảy ra → **giảm thiểu trước** (rollback/flag/scale, hạ MTTR), điều tra nguyên nhân sau.
- Observability (metrics/trace/log) để phát hiện + khoanh vùng nhanh; alert trước khi user báo.
- **Postmortem blameless**: timeline + root cause (5 whys) + action items; đổ lỗi hệ thống không cá nhân → team học, hệ mạnh dần.

## Bài tập

> Làm thử trước khi xem [lời giải chi tiết](#lời-giải-chi-tiết) bên dưới. Có thể đối chiếu/chạy thử bằng [solutions.go](./solutions.go) và mô phỏng ở [visualization.html](./visualization.html).

**BT1.** Tính downtime budget (phút/tháng, tháng = 30 ngày = 43200 phút) cho ba mức SLO: 99.9%, 99.95%, 99.99%. Cho biết "thêm một số 9" ảnh hưởng thế nào.

**BT2.** Định nghĩa một bộ SLI/SLO hoàn chỉnh cho một API service (ví dụ API tra cứu đơn hàng). Nêu rõ SLI nào, công thức đo, SLO ngưỡng, cửa sổ thời gian.

**BT3.** Áp dụng 5 Whys cho incident "API trả 500 hàng loạt" với tình huống: do một bản deploy mới đẩy lên không qua canary. Truy tới root cause hệ thống/process và đề xuất action.

**BT4.** Viết một blameless postmortem hoàn chỉnh (Summary + Impact + Timeline + Root cause + Action items) cho incident sau: *"Lúc 02:14 ngày 27/05, cache Redis bị evict toàn bộ key do cấu hình maxmemory sai sau khi scale, khiến DB quá tải, API tra cứu đơn hàng timeout 18 phút, ~12% user ảnh hưởng."*

**BT5.** Phân loại 5 tín hiệu sau là **actionable** (nên page) hay **noise** (không nên page), giải thích: (a) "p99 latency > 2s trong 10 phút"; (b) "một GET /health trả 200"; (c) "error rate 5xx > 3% trong 5 phút"; (d) "CPU spike 95% trong 20 giây rồi về 40%"; (e) "TLS cert hết hạn trong 24h".

**BT6.** Một outage production vừa xảy ra: API thanh toán trả 500 cho mọi request. Liệt kê các bước xử lý theo đúng thứ tự incident lifecycle (Detect → Triage → Mitigate → Resolve → Postmortem), mỗi bước nêu hành động cụ thể và ai làm.

---

## Lời giải chi tiết

### Lời giải BT1 — Downtime budget cho ba mức SLO

**Cách tiếp cận.** Dùng công thức \`downtime = (1 − SLO) × tổng thời gian\`, với tổng = 43200 phút/tháng.

\`\`\`
99.9%:   (1 − 0.999)   × 43200 = 0.001   × 43200 = 43.2 phút/tháng
99.95%:  (1 − 0.9995)  × 43200 = 0.0005  × 43200 = 21.6 phút/tháng
99.99%:  (1 − 0.9999)  × 43200 = 0.0001  × 43200 = 4.32 phút/tháng
\`\`\`

**Nhận xét "thêm một số 9".** So sánh 99.9% (43.2) → 99.99% (4.32): downtime cho phép **giảm đúng 10 lần** mỗi khi thêm một số 9. 99.9% → 99.95% chỉ là "nửa số 9" nên giảm 2 lần (43.2 → 21.6). Hệ quả thực tế: mỗi số 9 đòi hỏi đầu tư (redundancy, automation, on-call) tăng *cấp số nhân*, nên phải cân nhắc giá trị kinh doanh trước khi nâng mục tiêu (pitfall mục 15). Hàm \`errorBudgetMinutes\` trong [solutions.go](./solutions.go) tính chính xác các số này.

### Lời giải BT2 — Bộ SLI/SLO cho API tra cứu đơn hàng

**Cách tiếp cận.** Chọn SLI phản ánh *trải nghiệm user* (availability + latency + error), định nghĩa công thức good/total, đặt SLO khớp nhu cầu, nêu cửa sổ.

| # | SLI | Công thức đo | SLO | Cửa sổ |
|---|-----|--------------|-----|--------|
| 1 | Availability | (số request không-5xx) / (tổng request) | ≥ 99.9% | 30 ngày trượt |
| 2 | Latency | (số request < 300ms) / (tổng request) | ≥ 95% | 30 ngày trượt |
| 3 | Error rate | (số request 5xx) / (tổng request) | < 0.1% | 30 ngày trượt |
| 4 | Freshness (nếu có cache) | (số response dữ liệu < 60s tuổi) / tổng | ≥ 99% | 30 ngày trượt |

**Giải thích lựa chọn:**
- Đo theo **request-based** (không theo time-based) vì API nhiều traffic → chính xác hơn.
- Loại trừ 4xx khỏi "lỗi availability" (đó là lỗi phía client, không phải service down).
- Latency dùng *tỷ lệ request dưới ngưỡng* (threshold) thay vì *trung bình* — trung bình che giấu đuôi chậm (xem L73 về quantile).
- Cửa sổ *trượt 30 ngày* (rolling) thay vì "theo tháng lịch" để tránh "reset budget" lợi dụng ngày 1 hàng tháng.
- Error budget tương ứng SLO #1: \`0.1% × tổng request\`. Hàm \`SLITracker\` trong solutions.go tính availability/error rate từ counter good/total/5xx.

### Lời giải BT3 — 5 Whys cho "API 500 do deploy không canary"

\`\`\`
Vấn đề: API trả 500 hàng loạt ngay sau deploy v3.1.

Why 1: Tại sao 500? → v3.1 có bug gây panic ở mọi request đường /orders.
Why 2: Tại sao bug lọt lên production? → Không qua canary; deploy thẳng 100%.
Why 3: Tại sao deploy thẳng 100%? → Pipeline không bắt buộc bước canary, tùy người.
Why 4: Tại sao pipeline không bắt buộc canary? → Khi dựng CI/CD chưa coi canary là
        gate bắt buộc, chỉ là tùy chọn.
Why 5: Tại sao chưa coi là bắt buộc? → Thiếu policy "mọi deploy production phải qua
        canary + tự rollback nếu error rate tăng".

=> ROOT CAUSE: thiếu policy/gate bắt buộc canary trong pipeline deploy.
\`\`\`

**Action items đề xuất (concrete + owned + deadline):**
- [Prevent] [Owner X, +3 ngày] Thêm gate bắt buộc canary 5% + auto-rollback khi error rate > 2% vào pipeline (liên hệ [L77 CI/CD](../lesson-77-ci-cd-pipeline/)).
- [Detect] [Owner Y, +2 ngày] Alert burn-rate error budget > 10× → page on-call.
- [Mitigate] [Owner Z, +1 ngày] Viết runbook "rollback nhanh service orders" + verify rollback < 2 phút.

Lưu ý: không dừng ở Why 1 ("fix bug") — bug nào cũng có thể xảy ra; điều cần sửa là *cơ chế chặn bug lan ra 100% user*.

### Lời giải BT4 — Blameless postmortem (Redis eviction)

\`\`\`
# Postmortem: Redis cache flush gây DB overload (2026-05-27)

## Tóm tắt
Lúc 02:14, sau khi scale Redis, cấu hình maxmemory sai khiến toàn bộ key bị evict.
Cache miss 100% dồn tải lên DB, API tra cứu đơn hàng timeout trong 18 phút,
ảnh hưởng ~12% user. Mitigate bằng tăng maxmemory + warm cache; resolve bằng
sửa template cấu hình scale.

## Tác động (Impact)
- Thời gian: 02:14 – 02:32 (18 phút).
- User ảnh hưởng: ~12% traffic API /orders (timeout).
- SLO: đốt ~18 phút downtime ≈ 42% error budget tháng (budget 43.2 phút).
- Severity: SEV2 (suy giảm nghiêm trọng một phần lớn user, có ảnh hưởng nhưng
  không mất toàn bộ dịch vụ/dữ liệu).

## Timeline
- 02:10  Auto-scale Redis thêm node (theo HPA).
- 02:14  maxmemory áp sai (giá trị mặc định thấp) → evict toàn bộ key. (sự kiện gốc)
- 02:15  Alert: DB CPU > 90%, API p99 timeout. (Detect)
- 02:18  On-call ack, mở incident SEV2, chỉ định IC. (Triage)
- 02:22  IC phân công: Ops tăng maxmemory Redis; Comms cập nhật status page.
- 02:26  maxmemory đã đúng; bắt đầu warm cache các key nóng. (Mitigate)
- 02:32  Cache hit phục hồi, DB tải về bình thường, API hết timeout. (Recover)
- (sáng)  Sửa template cấu hình scale để maxmemory luôn đúng. (Resolve)

## Root cause
Template cấu hình scale Redis không kế thừa maxmemory hiện tại → node mới (và quá
trình áp lại config) dùng giá trị mặc định thấp, kích hoạt eviction toàn bộ. Đây là
LỖ HỔNG PROCESS/CONFIG, không phải lỗi cá nhân nào — bất kỳ ai chạy scale cũng gặp.
Contributing factors: (1) template config thiếu maxmemory; (2) không có alert
"cache hit rate sụt đột ngột"; (3) không có cơ chế warm cache tự động.

## What went well / wrong
- Tốt: alert DB CPU bắt được trong 1 phút; có IC; mitigate đúng hướng.
- Tệ: thiếu alert cache-hit-rate (lẽ ra Detect sớm hơn ở tầng cache); warm cache
  phải làm tay; template config sai âm thầm.

## Action items
- [ ] [Owner A, 29/05] Sửa template scale Redis: maxmemory kế thừa giá trị runtime,
      thêm test cấu hình. (Prevent)
- [ ] [Owner B, 31/05] Thêm alert "cache hit rate giảm > 30% trong 2 phút" → page. (Detect)
- [ ] [Owner C, 03/06] Script warm cache tự động sau scale Redis. (Mitigate)
- [ ] [Owner A, 05/06] Thêm "maxmemory đúng" vào runbook scale + checklist. (Prevent)
\`\`\`

Điểm mấu chốt blameless: timeline mô tả *sự kiện và hệ thống*, root cause chỉ vào *process/config*, action items vá *nhiều lớp* (Prevent + Detect + Mitigate) — không một dòng nào đổ lỗi người.

### Lời giải BT5 — Phân loại actionable vs noise

| Tín hiệu | Phân loại | Giải thích |
|----------|-----------|-----------|
| (a) p99 > 2s trong 10 phút | **Actionable (page)** | Triệu chứng user-facing rõ, kéo dài 10 phút (không phải nhiễu thoáng qua) → cần điều tra/mitigate ngay. |
| (b) GET /health trả 200 | **Noise** | Sự kiện bình thường (healthy). Không có hành động. Cùng lắm là log/metric, tuyệt đối không page. |
| (c) error rate 5xx > 3% trong 5 phút | **Actionable (page)** | User đang nhận lỗi server, vượt ngưỡng + duy trì 5 phút → cần hành động ngay. |
| (d) CPU 95% trong 20s rồi về 40% | **Noise** | Spike thoáng qua tự hồi, không tác động user rõ. Là *nguyên nhân tiềm năng* để chẩn đoán, không phải page. Nếu muốn theo dõi → dashboard, không phải alert đánh thức người. |
| (e) TLS cert hết hạn trong 24h | **Actionable (page/ticket)** | Có hành động cụ thể (gia hạn cert) và deadline cứng; nếu để hết hạn → outage toàn bộ. 24h còn kịp xử lý nên có thể là ticket khẩn giờ hành chính thay vì page 3h sáng, nhưng vẫn phải hành động. |

Nguyên tắc xuyên suốt: **page khi (có hành động cụ thể) AND (tác động/nguy cơ thật, duy trì)**. (b) và (d) thiếu "hành động cụ thể ngay" → noise.

### Lời giải BT6 — Các bước xử lý outage theo lifecycle

\`\`\`
1. DETECT (phát hiện)
   - Alert "error rate 5xx /payments > 50% trong 2 phút" page on-call. (lý tưởng,
     trước khi khách báo). Ai: monitoring tự động → on-call primary nhận.

2. TRIAGE (phân loại)
   - On-call ack alert, đánh giá: thanh toán = doanh thu trực tiếp + mọi request lỗi
     → SEV1. Mở incident, chỉ định IC, kéo Ops + Comms vào. Ai: on-call → IC.

3. MITIGATE (cầm máu)
   - Kiểm tra: có deploy gần đây không? Có → IC quyết định ROLLBACK ngay về bản trước.
   - Nếu không phải deploy → failover sang region khỏe / tắt feature flag mới / bật
     circuit breaker tới dependency lỗi. Comms cập nhật status page "đang xử lý".
   - Mục tiêu: user hết bị 500 NHANH NHẤT, chưa cần biết root cause. Ai: Ops gõ lệnh,
     IC quyết định, Comms thông báo.

4. RESOLVE (sửa gốc)
   - Sau khi user ổn: bình tĩnh điều tra log/trace/metric đã snapshot, tìm root cause
     thật (5 Whys), viết fix + test, deploy lại an toàn (qua canary). Ai: đội dev.

5. POSTMORTEM (học)
   - Trong 24-48h: viết blameless postmortem (timeline, impact, root cause, action
     items concrete+owned+deadline). Track action items tới khi xong để không tái diễn.
     Ai: IC chủ trì viết, cả đội đóng góp.
\`\`\`

Thứ tự bất biến: **không nhảy sang Resolve trước khi Mitigate** (đừng để user chịu lỗi trong lúc debug). **Không bỏ Postmortem** dù đã fix xong — bỏ qua nghĩa là chấp nhận lỗi sẽ lặp lại.

---

## Code & Minh họa

- [solutions.go](./solutions.go) — error budget calculator, SLI tracker (availability/error rate từ metrics), incident severity classifier, MTTR calculator. Chạy: \`go run solutions.go\`.
- [visualization.html](./visualization.html) — ba module tương tác: (1) Error budget calculator (kéo slider SLO → downtime cho phép + budget burn); (2) Incident timeline animate (Detect → Triage → Mitigate → Resolve → Postmortem); (3) 5 Whys drill-down tương tác.

---

## Kết thúc Tier 7

Đây là **lesson cuối của Tier 7 — Production / DevOps / SWE**. Bạn đã đi từ logging, metrics, tracing (3 trụ observability), qua Docker/Kubernetes/CI-CD/config, clean architecture, code review, tới incident management và postmortem. Cộng lại: kỹ năng *vận hành dịch vụ tin cậy*, thứ phân biệt "viết code chạy được" với "chạy production thật".

➡ Tiếp theo: [Tier 8 — Capstone Project](../tier-8-capstone/index.html) — gom mọi thứ đã học vào một dự án hoàn chỉnh.

Ôn lại các bài liên quan trong tier này:
- [Lesson 72 — Structured Logging](../lesson-72-structured-logging/) · [Lesson 73 — Metrics & Prometheus](../lesson-73-metrics-prometheus/) · [Lesson 74 — Tracing](../lesson-74-tracing-opentelemetry/)
- [Lesson 80 — Code Review & Style](../lesson-80-code-review-style/) (bài trước)
`;
