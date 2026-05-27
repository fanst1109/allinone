# Lesson 68 — Consensus & Raft

> Tier 6 — Distributed & Microservices · Bài 68/79

Làm sao để 5 server (có server lăn ra chết, mạng chập chờn) cùng **đồng ý** với nhau về một sự thật duy nhất — ai là sếp, lệnh nào chạy trước lệnh nào — mà không bao giờ mâu thuẫn? Đó là bài toán **đồng thuận (consensus)**, và **Raft** là thuật toán giải nó theo cách dễ hiểu nhất hiện nay.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phát biểu được bài toán consensus và **vì sao nó khó** trong hệ phân tán.
- Hiểu 3 trạng thái node của Raft (Follower / Candidate / Leader) và vòng đời chuyển trạng thái.
- Giải thích **term** như một logical clock và vai trò của nó trong việc phát hiện leader cũ.
- Trace tay được **leader election** (gồm split vote và cách randomized timeout sửa nó).
- Trace tay được **log replication** với luật commit theo majority.
- Tính **quorum** và mức chịu lỗi (fault tolerance) cho cluster N node bất kỳ.
- Hiểu cơ chế **chống split-brain** và vì sao số node lẻ tốt hơn số chẵn.
- Biết khi nào cần snapshot, membership change; so sánh Raft với Paxos/ZAB; chọn thư viện Go phù hợp.

## Kiến thức tiền đề

- [Lesson 62 — Distributed Fundamentals](../lesson-62-distributed-fundamentals/) — CAP, FLP impossibility, network partition. **Bắt buộc** đọc trước.
- [Lesson 63 — Service Discovery & Load Balancing](../lesson-63-service-discovery-lb/) — etcd/Consul dùng Raft bên dưới.
- [Lesson 65 — Event-Driven Architecture](../lesson-65-event-driven-architecture/) — replicated log là nền của event sourcing.
- [Lesson 27 — Goroutines & Channels](../lesson-27-goroutines-channels/) — `solutions.go` mô phỏng cluster bằng channel.

---

## 1. Vấn đề consensus

### 1.1 Phát biểu bài toán

> 💡 **Trực giác / Hình dung.** Tưởng tượng 5 thư ký cùng ghi một cuốn sổ cái chung. Sếp đọc lệnh, mỗi thư ký chép vào sổ của mình. Vấn đề: sếp có thể đột quỵ giữa câu, một thư ký ngủ gật, đường dây điện thoại giữa hai phòng đứt. Làm sao đảm bảo **cả 5 cuốn sổ cuối cùng giống hệt nhau, cùng thứ tự**, và luôn có **đúng một** người được quyền đọc lệnh? Đó chính là consensus.

**Consensus (đồng thuận)** là bài toán: nhiều node phải cùng **thống nhất một giá trị duy nhất** (hoặc một **chuỗi giá trị có thứ tự**) mặc dù:

- một số node có thể crash bất cứ lúc nào,
- message giữa các node có thể chậm, mất, đến không đúng thứ tự,
- mạng có thể bị chia cắt (partition).

Một giao thức consensus đúng phải bảo đảm các tính chất:

| Tính chất | Nghĩa |
|-----------|-------|
| **Agreement (Safety)** | Không bao giờ có 2 node commit 2 giá trị KHÁC nhau ở cùng vị trí. |
| **Validity** | Giá trị được chọn phải là giá trị mà một node nào đó thực sự đề xuất (không bịa ra). |
| **Termination (Liveness)** | Cuối cùng cluster phải chọn được một giá trị (miễn là đủ node sống). |

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Sao không cứ để 1 server quyết hết cho gọn?"* → Server đó chết là cả hệ thống chết (single point of failure). Consensus cho phép **N server cùng giữ một sự thật**, chết bớt vẫn chạy.
> - *"Đồng ý 1 giá trị thì làm được gì?"* → Đồng ý một **chuỗi** giá trị (log) = đồng ý thứ tự các lệnh ghi vào một cơ sở dữ liệu nhân bản. Đó là nền tảng của mọi hệ replicated.

### 1.2 Ví dụ cụ thể: cần đồng ý cái gì?

1. **Ai là leader?** — 5 node phải đồng ý đúng 1 node là sếp tại mỗi thời điểm.
2. **Thứ tự log.** — Client gửi `set x=1`, `set x=2`. Mọi node phải apply cùng thứ tự, nếu không node A có `x=1`, node B có `x=2` → mâu thuẫn.
3. **Một giá trị config.** — "Khóa phân tán này đang do ai giữ?" chỉ được có 1 đáp án.

### 1.3 Vì sao không dùng giải pháp đơn giản hơn?

> ❓ **Các "giải pháp ngây thơ" và vì sao chúng hỏng.**
>
> - *"Cứ bầu node có ID nhỏ nhất làm leader, khỏi cần thuật toán."* → Node ID nhỏ nhất **chết** thì sao? Các node còn lại phải đồng ý chọn ID nhỏ thứ nhì — mà "đồng ý" chính là consensus. Lại quay về bài toán cũ.
> - *"Dùng một database trung tâm để chứa 'ai là leader'."* → Database đó là **single point of failure**. Để DB đó không chết, nó phải replicate — mà replicate nhất quán lại cần consensus. Vòng luẩn quẩn.
> - *"Hai node hỏi nhau xem ai làm leader."* → Nếu link giữa chúng đứt (partition), mỗi node tưởng node kia chết và tự lên leader → **split-brain**. Đây chính là lý do cần **majority** chứ không phải "thoả thuận tay đôi".
>
> Consensus là **giải pháp tối thiểu đúng**: không có cách nào đơn giản hơn mà vẫn an toàn khi node chết + mạng phân vùng.

---

## 2. Vì sao consensus khó

### 2.1 Ba kẻ thù

> 💡 **Trực giác.** Nếu các node là người ngồi cùng phòng, hét to là xong. Cái khó là họ ở các phòng khác nhau, chỉ nói chuyện qua điện thoại — và điện thoại lúc có lúc không, người nghe có thể đang ngủ.

1. **Network delay & reorder** — không biết message "tới muộn" hay "mất hẳn". Chờ bao lâu thì đủ? Không có câu trả lời chắc chắn.
2. **Network partition** — cụm bị xẻ làm hai, hai nửa không nói chuyện được nhưng mỗi nửa vẫn tưởng nửa kia đã chết.
3. **Node crash** — node tắt đột ngột, có thể bật lại sau với trạng thái cũ (stale).

### 2.2 FLP impossibility (nhắc lại từ L62)

Định lý **FLP** (Fischer–Lynch–Paterson, 1985) chứng minh: trong hệ **bất đồng bộ** (asynchronous — không có giới hạn thời gian cho message), với **dù chỉ 1 node có thể crash**, **không tồn tại** thuật toán consensus vừa luôn đúng (safety) vừa luôn kết thúc (liveness) trong **mọi** trường hợp.

> ❓ *"Vậy Raft phá được FLP à?"* → **Không.** Raft (và Paxos) né FLP bằng cách dựa vào **timeout** (giả định một phần đồng bộ — *partial synchrony*). Khi mạng tệ kéo dài, Raft **hi sinh liveness chứ không hi sinh safety**: nó có thể tạm thời không bầu được leader (treo), nhưng **không bao giờ** commit hai giá trị mâu thuẫn. Đây là lựa chọn đúng: "thà đứng im còn hơn sai".

> 📝 **Tóm tắt mục 2.**
> - 3 kẻ thù: delay, partition, crash.
> - FLP: không có consensus hoàn hảo trong hệ async + có crash.
> - Raft né FLP bằng timeout; ưu tiên **safety** tuyệt đối, chấp nhận đôi khi mất liveness.

---

## 3. Use case — ai dùng consensus?

| Hệ thống | Dùng consensus để |
|----------|-------------------|
| **etcd** (nền của Kubernetes) | Lưu config/state cluster, dùng **Raft**. |
| **Consul** (HashiCorp) | Service discovery + KV store, dùng **Raft**. |
| **ZooKeeper** | Coordination service, dùng **ZAB** (họ hàng Paxos). |
| **Kafka** (KRaft mode) | Bầu controller, quản lý metadata partition, dùng **Raft**. |
| **CockroachDB / TiKV** | Replicate từng range dữ liệu bằng **Raft**. |

Ba mẫu ứng dụng kinh điển:

1. **Leader election** — chọn 1 node điều phối (vd ai chạy cron job, ai là master DB).
2. **Distributed lock** — chỉ 1 client giữ khóa tại một thời điểm (consensus về "ai giữ").
3. **Replicated state machine (RSM)** — N bản sao cùng một state machine, ăn **cùng một log** lệnh theo **cùng thứ tự** → cùng kết quả. Đây là mô hình tổng quát nhất; leader election và lock chỉ là trường hợp riêng.

> 💡 **Replicated state machine.** Nếu mọi node bắt đầu từ cùng trạng thái rỗng, và apply **đúng cùng một chuỗi lệnh đã được consensus**, thì kết thúc chúng ở **cùng trạng thái** — đó là cách Raft biến "đồng ý 1 chuỗi log" thành "5 bản DB giống hệt nhau".

---

## 4. Raft — tổng quan

Raft (Ongaro & Ousterhout, 2014) sinh ra để **dễ hiểu** hơn Paxos, với cùng năng lực và hiệu quả. Raft chia bài toán thành 3 mảnh độc lập, dễ học từng cái:

1. **Leader election** — chọn ra 1 leader.
2. **Log replication** — leader nhận lệnh từ client, sao chép tới follower.
3. **Safety** — các ràng buộc đảm bảo không bao giờ commit sai.

> 💡 **Trực giác cốt lõi.** Raft đặt một **leader mạnh** làm trung tâm: mọi ghi đều qua leader, log chỉ chảy **một chiều** từ leader sang follower. Cách này đơn giản hơn Paxos (nơi mọi node bình đẳng tranh nhau). Khi leader chết, bầu leader mới — và đó là toàn bộ phần "phức tạp".

---

## 5. Node states — 3 trạng thái

```
            timeout, bắt đầu election
   ┌──────────────────────────────────────┐
   │                                       ▼
┌──────────┐   nhận heartbeat   ┌───────────┐  thắng majority  ┌────────┐
│ Follower │◄───────────────────│ Candidate │─────────────────►│ Leader │
└──────────┘   của leader hợp lệ└───────────┘                  └────────┘
   ▲                                  │  thấy term cao hơn /         │
   │     thấy term cao hơn            │  bị leader khác chiếm        │
   └──────────────────────────────────┴──────────────────────────────┘
```

| Trạng thái | Vai trò |
|------------|---------|
| **Follower** | Bị động. Chỉ phản hồi RPC của leader/candidate. Nếu hết timeout không nghe leader → lên Candidate. |
| **Candidate** | Đang tranh cử. Tự tăng term, tự bầu mình, gửi `RequestVote`. Đủ majority → Leader; thấy term cao hơn → tụt về Follower. |
| **Leader** | Duy nhất nhận ghi từ client. Gửi `AppendEntries` (gồm cả heartbeat) đều đặn để giữ ngôi. |

**Bất biến quan trọng:** node luôn tụt về **Follower** ngay khi thấy một term **cao hơn** term hiện tại của mình. Đây là cơ chế "tự nhường ngôi" giúp leader cũ (đã lỗi thời) không gây hại.

---

## 6. Term — logical clock

> 💡 **Trực giác.** Term giống **số nhiệm kỳ** của tổng thống: nhiệm kỳ 1, nhiệm kỳ 2... Mỗi nhiệm kỳ có **tối đa một** tổng thống (có thể không có ai nếu bầu cử thất bại). Khi có tranh chấp, người ở nhiệm kỳ **mới hơn** luôn thắng — không cần đồng hồ thật, chỉ cần con số nhiệm kỳ.

**Định nghĩa term — (a) là gì, (b) vì sao cần, (c) ví dụ số.**

**(a) Là gì:** Term là một số nguyên không âm, tăng dần đơn điệu, mà **mỗi node tự giữ một bản** (gọi là `currentTerm`). Nó chia thời gian của cluster thành các "nhiệm kỳ" liên tiếp; mỗi nhiệm kỳ bắt đầu bằng một cuộc bầu cử.

**(b) Vì sao cần:** Trong hệ phân tán **không có đồng hồ chung đáng tin**. Term thay thế đồng hồ thật bằng một **logical clock** (đồng hồ logic — xem [L62](../lesson-62-distributed-fundamentals/)) để trả lời câu hỏi "thông tin nào mới hơn?" mà không cần wall-clock đồng bộ. Nhờ term, một leader cũ vừa hồi sinh sau khi crash sẽ **tự nhận ra mình lỗi thời** (term của nó nhỏ hơn) và nhường ngôi — không gây hại.

**(c) Ví dụ số cụ thể:**
- Cluster bầu lần đầu: term 0 → **term 1**, leader = A.
- A chết, B bầu lại: term 1 → **term 2**, leader = B.
- Mạng phân vùng, phe thiểu số cố bầu 3 lần thất bại: term tăng 2 → 3 → 4 → 5 nhưng **không có leader** ở các term này (term có thể "trống").
- A hồi sinh với `currentTerm=1`, nhận heartbeat term 2 từ B → thấy `1 < 2` → cập nhật lên 2, tụt về Follower.

Quy tắc dùng term:

- Mỗi lần bắt đầu một cuộc bầu cử, candidate **tăng term lên 1**.
- Mỗi term có **≤ 1 leader** (có thể 0 nếu split vote — như ví dụ term 3,4,5 ở trên).
- Mọi RPC đều mang theo term. Khi nhận RPC:
  - term gửi **< term của mình** → từ chối (đây là leader/candidate lỗi thời).
  - term gửi **> term của mình** → cập nhật term, tụt về Follower.
  - term gửi **= term của mình** → xử lý bình thường.

> 🔁 **Dừng lại tự kiểm tra.** Node X có `currentTerm=5`, nhận `AppendEntries(term=3)` từ một node tự xưng leader. X làm gì?
> <details><summary>Đáp án</summary>
> X **từ chối** (trả `success=false`, kèm `term=5`). Node gửi là leader **lỗi thời** (term 3 < 5) — có thể nó vừa hồi sinh sau partition. Khi nhận reply chứa term=5, node đó thấy `3 < 5` → tụt về Follower và cập nhật term lên 5. Đây là cách Raft "phế truất" leader cũ mà không cần ai ra lệnh.
> </details>

> 📝 **Tóm tắt mục 5–6.**
> - 3 state: Follower (bị động) → Candidate (tranh cử) → Leader (chỉ huy).
> - Term = số nhiệm kỳ, tăng mỗi election, mỗi term ≤ 1 leader.
> - Thấy term cao hơn = tụt về Follower ngay.

---

## 7. Leader election

### 7.1 Luồng bầu cử

1. Follower chạy một **election timeout** (vd 150–300ms). Nếu hết timeout mà **không nhận heartbeat** nào từ leader → nó nghi leader chết.
2. Follower → **Candidate**: tăng `term`, **tự bầu cho mình** (1 phiếu), gửi `RequestVote` tới tất cả node khác.
3. Mỗi node nhận `RequestVote`:
   - Nếu term hợp lệ, **chưa bầu cho ai** trong term này, và log của candidate **đủ mới** (mục 9) → grant vote, reset timeout của mình.
4. Candidate gom phiếu:
   - Đủ **majority** (N/2+1) → trở thành **Leader**, lập tức gửi heartbeat để dập tắt các election khác.
   - Nhận heartbeat từ một leader term ≥ → tụt về Follower.
   - Hết timeout mà chưa ai thắng → tăng term, bầu lại.

### 7.2 Walk-through: 5 node bầu leader

Cluster N=5 (node A,B,C,D,E), quorum = `5/2 + 1 = 3`. Tất cả khởi động cùng term 0.

| t (ms) | Sự kiện |
|--------|---------|
| 0 | Cả 5 là Follower, chọn timeout ngẫu nhiên: A=160, B=200, C=270, D=230, E=290. |
| 160 | **A timeout đầu tiên** → Candidate, term=1, tự bầu (votes=1), gửi `RequestVote(term=1)` tới B,C,D,E. |
| ~165 | B,C,D,E nhận `RequestVote(term=1)`: term mới hơn, chưa bầu ai, log ngang nhau → **đều grant** + reset timeout. |
| ~170 | A nhận đủ phiếu: votes = 1 (mình) + 4 = **5 ≥ 3** → A thành **Leader term 1**. |
| ~170+ | A gửi heartbeat `AppendEntries(term=1)` đều đặn. B,C,D,E reset timeout mỗi lần nhận → không ai timeout nữa. Cluster ổn định. |

> ✅ Lưu ý: A chỉ cần **3 phiếu** là đủ, không cần đợi cả 5. Nếu E đang chết, A vẫn thắng với 4 phiếu.

### 7.2b Bốn ví dụ số về kết quả bầu cử (N=5, quorum=3)

Để thấy luật majority hoạt động trong nhiều tình huống, xét cùng cluster N=5:

| # | Tình huống | Phiếu candidate gom được | Kết quả |
|---|-----------|--------------------------|---------|
| 1 | Mọi node sống, candidate A xin phiếu | 1 (tự bầu) + 4 = **5** | Thắng (5 ≥ 3) |
| 2 | 1 node (E) chết, A xin phiếu | 1 + 3 = **4** | Thắng (4 ≥ 3) |
| 3 | 2 node (D,E) chết, A xin phiếu | 1 + 2 = **3** | Thắng vừa khít (3 ≥ 3) |
| 4 | 3 node (C,D,E) chết, A xin phiếu | 1 + 1 = **2** | **Thua** (2 < 3) → cluster mất khả năng bầu, treo |

→ Tình huống 4 cho thấy: mất **quá** (N−1)/2 = 2 node thì cluster **không** bầu được leader. Đó là ranh giới chịu lỗi của N=5.

### 7.2c Walk-through nâng cao: leader chết giữa chừng

Tiếp nối 7.2 (A là leader term 1). Bây giờ **A crash**:

| t (ms) | Sự kiện |
|--------|---------|
| 0 | A chết, ngừng gửi heartbeat. B,C,D,E vẫn term 1. |
| ~150–300 | B,C,D,E bắt đầu đếm timeout (mỗi node bốc lại ngẫu nhiên sau heartbeat cuối). Giả sử C timeout trước (175ms). |
| 175 | C → Candidate, **term=2** (1→2), tự bầu, gửi `RequestVote(term=2)` tới A,B,D,E. A chết → không nhận. |
| ~180 | B,D,E thấy term 2 > 1, chưa bầu ai trong term 2, log C đủ mới → grant. |
| ~185 | C gom votes = 1 + 3 = **4 ≥ 3** → **Leader term 2**. |
| ~185+ | C gửi heartbeat term 2. B,D,E reset timeout, ổn định. Cluster 4 node sống tiếp tục phục vụ. |
| sau | A hồi sinh, `currentTerm=1`, nhận heartbeat term 2 từ C → cập nhật term=2, làm Follower của C. |

### 7.3 Randomized timeout — chống split vote

> ⚠ **Lỗi thường gặp khi tự thiết kế.** Nếu cho **mọi node cùng một timeout cố định** (vd 200ms), khi leader chết, **tất cả** follower timeout **cùng lúc**, cùng lên Candidate, cùng tăng term, mỗi node tự bầu mình → phiếu bị xé lẻ, **không ai đạt majority** → bầu lại → lại đồng loạt timeout → lặp vô hạn. Đó là **split vote**.

**Cách Raft sửa:** mỗi node chọn timeout **ngẫu nhiên** trong một khoảng (vd `[150, 300]ms`). Xác suất hai node bốc trúng cùng giá trị rất thấp → thường chỉ **một** node timeout trước, lên Candidate, và thắng gọn trước khi node thứ hai kịp timeout. Nếu hiếm khi vẫn split vote, term sau lại random tiếp → kiểu gì cũng hội tụ rất nhanh.

> ❓ *"Nếu hai node lỡ random trùng và split vote thì sao?"* → Cả hai thất bại trong term đó (không ai đủ 3 phiếu), mỗi node lại bốc timeout **mới** ngẫu nhiên cho term sau. Khả năng trùng **liên tiếp** giảm theo cấp số nhân → kỳ vọng hội tụ chỉ sau 1–2 vòng.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Trong N=5, candidate cần bao nhiêu phiếu để thắng?
> 2. Vì sao timeout cố định gây kẹt mà timeout ngẫu nhiên thì không?
>
> <details><summary>Đáp án</summary>
>
> 1. `5/2 + 1 = 3` phiếu (tính cả phiếu tự bầu).
> 2. Cố định → mọi node timeout đồng loạt → mỗi node tự bầu mình → phiếu xé đều → không ai đạt 3. Ngẫu nhiên → một node thường timeout trước, lên Candidate và thắng trước khi node khác kịp timeout.
> </details>

> 📝 **Tóm tắt mục 7.**
> - Follower hết timeout không nghe leader → Candidate, tăng term, tự bầu, gửi RequestVote.
> - Đủ majority phiếu → Leader, gửi heartbeat ngay để dập election khác.
> - **Randomized timeout** ([150,300]ms) là cách Raft tránh split vote — không cần đồng hồ chung.
> - Candidate cần (N/2+1) phiếu; mất quá (N−1)/2 node thì không bầu được (cluster treo).

---

## 8. Log replication

### 8.1 Luồng replicate

1. Client gửi command tới **leader** (gửi follower thì follower redirect về leader).
2. Leader **append** command vào log của mình như một `LogEntry{term, command}` ở index mới — lúc này **chưa commit**.
3. Leader gửi `AppendEntries` chứa entry mới tới tất cả follower.
4. Follower append vào log của mình, trả **ack** (success).
5. Khi leader thấy entry đã được lưu trên **majority** node (gồm cả chính nó) → **commit** entry đó: tăng `commitIndex`, **apply** vào state machine, trả kết quả cho client.
6. Heartbeat/AppendEntries kế tiếp mang theo `leaderCommit` → follower cũng biết entry đã commit và apply theo.

`AppendEntries` với `Entries` rỗng chính là **heartbeat** — vừa giữ ngôi leader, vừa truyền `commitIndex`.

### 8.2 Walk-through: commit theo majority

Cluster N=5 (L = leader, F1..F4 = follower), quorum = 3. Client gửi `set x=1`:

| Bước | Trạng thái |
|------|-----------|
| 1 | L append `(term=1, "set x=1")` ở index 0. Log L: `[#0]`. **commitIndex chưa đổi.** |
| 2 | L gửi `AppendEntries(entry #0)` → F1,F2,F3,F4. |
| 3 | Giả sử F1, F2 ack nhanh; F3, F4 đang chậm (mạng). |
| 4 | Số bản sao có #0 = L + F1 + F2 = **3 ≥ quorum 3** → **L commit #0**, apply `x=1`, trả "OK" cho client. |
| 5 | Sau đó F3, F4 ack muộn / nhận lại qua heartbeat → cũng append #0. Cluster hội tụ. |

> ✅ **Điểm mấu chốt:** leader **không cần đợi cả 5** node. Chỉ cần **3/5** (majority) là commit được → nhanh và chịu được 2 follower chậm/chết.

> ❓ *"Lỡ chỉ 2/5 ack rồi leader chết thì entry đó coi như mất chưa commit?"* → Đúng. Entry chưa đạt majority thì **chưa commit**, client chưa nhận "OK", nên không có ai tin nó đã thành công → an toàn. Leader mới có thể ghi đè index đó. Không vi phạm safety.

### 8.3 Walk-through nhiều entry: trạng thái log từng node

Cluster N=5, leader L. Client gửi liên tiếp 3 lệnh `set a=1`, `set b=2`, `set c=3` (term 1). Theo dõi log + `commitIndex` của từng node (giả định F4 đang chậm, ack muộn):

| Sự kiện | Log L | Log F1 | Log F2 | Log F3 | Log F4 | commitIndex (L) |
|---------|-------|--------|--------|--------|--------|-----------------|
| L append #0 `a=1` | `[#0]` | `[]` | `[]` | `[]` | `[]` | −1 |
| F1,F2,F3 ack #0 (4/5) | `[#0]` | `[#0]` | `[#0]` | `[#0]` | `[]` | **0** ✓ |
| L append #1 `b=2` | `[#0,#1]` | `[#0]` | `[#0]` | `[#0]` | `[]` | 0 |
| F1,F2 ack #1 (3/5) | `[#0,#1]` | `[#0,#1]` | `[#0,#1]` | `[#0]` | `[]` | **1** ✓ |
| L append #2 `c=3` | `[#0,#1,#2]` | `[#0,#1]` | `[#0,#1]` | `[#0]` | `[]` | 1 |
| F1,F3 ack #2 (3/5) | `[#0,#1,#2]` | `[#0,#1,#2]`| `[#0,#1]` | `[#0,#2]?` | `[]` | **2** ✓ |
| heartbeat truyền commitIndex=2, F4 bắt kịp | `[#0,#1,#2]` | `[#0,#1,#2]`| `[#0,#1,#2]`| `[#0,#1,#2]`| `[#0,#1,#2]`| 2 |

> 💡 Mỗi entry chỉ cần **một** majority **bất kỳ** ack là commit — không nhất thiết cùng tập node mỗi lần (#0 do {L,F1,F2,F3}, #2 do {L,F1,F3}). Follower chậm (F4) cuối cùng bắt kịp qua heartbeat mang `leaderCommit`. Đó là lý do một follower lề mề không làm chậm cả cluster.

> ⚠ **Lỗi thường gặp.** Đừng nghĩ "commit" = "đã ghi xuống tất cả node". Commit chỉ có nghĩa **đã ghi trên majority và sẽ không bao giờ mất**. Các node còn lại bắt kịp sau (eventually) — nhưng entry đã được coi là bền vững ngay khi đạt majority.

---

## 9. Safety — hai ràng buộc sống còn

Election + replication chưa đủ. Cần thêm ràng buộc để **không bao giờ** mất một entry đã commit.

### 9.1 Election restriction — chỉ bầu cho log đủ mới

> 💡 **Trực giác.** Không thể để một node "tụt hậu" (thiếu các entry đã commit) lên làm leader, vì leader mới sẽ ép log của mình lên cả cluster → xoá mất entry đã commit của người khác. Vậy nên: **chỉ vote cho candidate có log ít nhất mới bằng mình.**

Khi node nhận `RequestVote`, nó so sánh `(LastLogTerm, LastLogIndex)`:

- Candidate được coi là **up-to-date** nếu:
  - `candidate.LastLogTerm > voter.LastLogTerm`, **hoặc**
  - cùng term mà `candidate.LastLogIndex >= voter.LastLogIndex`.
- Nếu candidate log **cũ hơn** → voter **từ chối**.

Hệ quả: candidate thắng cử (đủ majority) chắc chắn có log **chứa mọi entry đã commit** — vì entry đã commit nằm trên majority, mà candidate cần majority phiếu, hai majority luôn **giao nhau** ở ít nhất 1 node, node đó sẽ không bầu cho candidate thiếu entry.

**Ví dụ số cho election restriction (N=5):**

Entry #7 đã commit trên majority {A,B,C} (3 node, đều có #7). Node D bị chậm, log chỉ tới #5 (thiếu #6,#7). D crash, hồi sinh, lên Candidate term mới:

- D có `LastLogIndex=5`. Nó xin phiếu A,B,C,E.
- A,B,C đều có `LastLogIndex=7 > 5` → so sánh thấy log D **cũ hơn** → **từ chối** D.
- D chỉ có thể nhận phiếu của chính nó + tối đa E = **2 < 3** → D **không bao giờ** thành leader.
- → Entry #7 (đã commit) **an toàn**: leader mới bắt buộc là một trong {A,B,C} (đều có #7).

> 🔁 **Dừng lại tự kiểm tra.** Vì sao "hai majority luôn giao nhau" lại bảo đảm entry đã commit không mất?
> <details><summary>Đáp án</summary>
> Entry commit nằm trên một majority M1. Candidate muốn thắng cần một majority phiếu M2. Trong N node, |M1|+|M2| = (N/2+1)·2 = N+2 > N → M1 và M2 **bắt buộc** chia sẻ ≥ 1 node chung. Node chung đó **có** entry đã commit, nên (theo election restriction) nó **chỉ** bầu cho candidate có log ≥ của nó → leader mới chắc chắn cũng có entry đó.
> </details>

### 9.2 Commit rule — chỉ commit entry của term hiện tại qua majority

> ⚠ **Cạm bẫy tinh vi (Figure 8 trong paper Raft).** Một leader mới **không được** commit một entry của **term cũ** chỉ vì thấy nó đã có trên majority. Lý do: một entry term-cũ trên majority vẫn có thể bị một leader khác (term cao hơn nhưng nổi lên sau) ghi đè, dẫn tới "commit rồi lại mất". 
>
> **Luật:** leader chỉ commit trực tiếp các entry của **term hiện tại** của nó. Khi một entry term-mới được commit qua majority, mọi entry **trước nó** (kể cả term cũ) cũng tự động được commit theo (vì log liền mạch).

**Tại sao luật này cần thiết — ví dụ tối giản:** Giả sử leader S1 (term 2) đã replicate entry #1 (term 2) lên 2/5 node rồi crash *trước khi* đạt majority. S5 (term 3) lên leader với log riêng, ghi đè #1. Nếu S1 hồi sinh làm leader term 4 và **vội commit** #1 (term 2) chỉ vì giờ thấy nó trên majority, thì #1 đã "commit" — nhưng S5 (term 3) có thể đã ghi đè index đó ở các node khác → một index commit hai giá trị khác nhau = **vi phạm safety**. Luật "chỉ commit entry term hiện tại" chặn đúng tình huống này: S1 term 4 phải ghi một entry **term 4** mới và commit nó qua majority; lúc đó #1 cũ mới được commit ăn theo một cách an toàn.

> 📝 **Tóm tắt mục 8–9.**
> - Replicate: append → majority ack → commit → apply.
> - Election restriction: chỉ vote cho candidate log đủ mới → leader mới luôn có mọi entry đã commit.
> - Commit rule: chỉ commit entry term hiện tại qua majority; entry cũ ăn theo.

---

## 10. Quorum — đa số quyết định

**Quorum** = số node tối thiểu phải đồng ý để một quyết định (bầu cử, commit) có hiệu lực. Raft dùng **majority**:

```
quorum = ⌊N/2⌋ + 1
```

| N | quorum | chịu được fail tối đa = N − quorum |
|---|--------|-----------------------------------|
| 3 | 2 | 1 |
| 4 | 3 | 1 |
| 5 | 3 | **2** |
| 6 | 4 | 2 |
| 7 | 4 | **3** |

Công thức chịu lỗi: **tolerate = (N − 1) / 2** (làm tròn xuống) crash failure.

> 💡 **Vì sao majority?** Hai majority **bất kỳ** của cùng một tập luôn **giao nhau ≥ 1 node**. Node giao nhau đó là "nhân chứng" giúp quyết định ở term sau biết được quyết định ở term trước → không bao giờ có hai nhóm cùng quyết hai thứ mâu thuẫn. Đây là lý do toán học cho safety.

Ví dụ số cụ thể (N=5, hai majority bất kỳ giao nhau):
- Majority {A,B,C} và {C,D,E} giao tại **C**.
- Majority {A,B,C} và {A,B,D} giao tại **{A,B}**.
- Không thể có hai majority rời nhau (2 nhóm 3 node trong 5 node là bất khả → tổng 6 > 5).

**Bốn ví dụ tính quorum/fault-tolerance (đa dạng N):**

| N | `⌊N/2⌋+1` | quorum | tolerate `N−quorum` | ghi chú |
|---|-----------|--------|---------------------|---------|
| 1 | `0+1` | 1 | 0 | một node — chết là chết hẳn |
| 3 | `1+1` | 2 | 1 | cấu hình nhỏ nhất có ý nghĩa |
| 5 | `2+1` | 3 | 2 | phổ biến nhất cho production |
| 7 | `3+1` | 4 | 3 | dùng khi cần chịu lỗi cao, đổi lại latency tăng (phải đợi nhiều ack hơn) |

> ❓ *"Thêm node thì chịu lỗi tăng nhưng có hại gì không?"* → Có: mỗi lần commit phải đợi **majority lớn hơn** ack → **latency tăng** và băng thông replicate nhiều hơn. N=7 chậm hơn N=5. Vì vậy đa số hệ dùng **5** — cân bằng giữa chịu lỗi (2) và tốc độ.

> 🔁 **Dừng lại tự kiểm tra.** Cluster N=6 thì quorum bao nhiêu, chịu mấy fail? So với N=5 hơn kém gì?
> <details><summary>Đáp án</summary>
> N=6: quorum = `⌊6/2⌋+1 = 4`, chịu fail = `6−4 = 2`. **Y hệt N=5** (cũng chịu 2) nhưng tốn thêm 1 máy và đợi 4 ack thay vì 3 → chậm hơn. Đó là lý do không ai chọn số chẵn.
> </details>

---

## 11. Chống split-brain

> 💡 **Split-brain** là tình huống **hai node cùng nghĩ mình là leader** và cùng nhận ghi → dữ liệu phân nhánh, mâu thuẫn. Đây là cơn ác mộng của hệ phân tán.

**Raft chống split-brain bằng chính luật majority:** một candidate chỉ thành leader khi đạt **majority** phiếu. Khi cluster bị partition:

- **Nửa đa số (majority side)** vẫn đủ phiếu → bầu được leader, tiếp tục commit.
- **Nửa thiểu số (minority side)** KHÔNG đủ phiếu → **không** bầu được leader → **không** commit được gì → tự "đứng im".

Vì cả hai nửa không thể cùng có majority (do tổng node cố định), **tối đa một** nửa có leader → không split-brain.

### Walk-through: partition 3–2 trên N=5

| Nửa | Số node | Đủ quorum (3)? | Kết quả |
|-----|---------|----------------|---------|
| **Phe A** {n0,n1,n2} | 3 | ✓ (3 ≥ 3) | Bầu được leader, tiếp tục nhận ghi & commit. |
| **Phe B** {n3,n4} | 2 | ✗ (2 < 3) | Candidate xin phiếu nhưng chỉ gom được tối đa 2 → **không bao giờ** thành leader. Treo. |

> ❓ *"Phe thiểu số bị treo — đó là bug à?"* → **Không, đó là hành vi ĐÚNG** (tradeoff của CP trong CAP — xem [L62](../lesson-62-distributed-fundamentals/)). Thà phe thiểu số từ chối phục vụ (giảm availability) còn hơn nó tự bầu leader riêng và làm hỏng dữ liệu (mất consistency). Khi partition lành lại, phe B thấy term của phe A cao hơn → tụt về Follower và đồng bộ log theo leader của A.

---

## 12. Log compaction / Snapshot

Log không thể grow vô hạn — nếu không, restart node phải replay hàng tỷ entry, và đĩa đầy.

> 💡 **Trực giác.** Thay vì giữ toàn bộ lịch sử `set x=1; set x=2; ...; set x=1000`, ta chỉ cần biết **trạng thái hiện tại** `x=1000`. **Snapshot** = chụp ảnh state machine tại một index, rồi **vứt bỏ** mọi log entry trước index đó.

- Mỗi node tự chụp snapshot khi log vượt ngưỡng (vd 10k entry hoặc 64MB).
- Snapshot lưu: `lastIncludedIndex`, `lastIncludedTerm`, và toàn bộ state.
- Khi một follower tụt quá xa (leader đã xoá log nó cần) → leader gửi **InstallSnapshot RPC** thay vì AppendEntries.

---

## 13. Membership change — thêm/bớt node an toàn

> ⚠ **Cạm bẫy:** chuyển trực tiếp từ cấu hình cũ `C_old` (3 node) sang `C_new` (5 node) có thể tạo **hai majority rời nhau** trong giai đoạn chuyển tiếp → hai leader → split-brain.

Raft dùng **joint consensus** (đồng thuận chung): chuyển qua một cấu hình trung gian `C_old,new` đòi hỏi quyết định phải đạt majority **trong cả** `C_old` **lẫn** `C_new` cùng lúc. Điều này khoá khả năng hai majority rời nhau. Khi `C_old,new` đã commit, mới chuyển sang `C_new` thuần.

(etcd dùng cách đơn giản hơn: **single-server change** — chỉ thêm/bớt **một** node mỗi lần, đảm bảo majority luôn chồng lấp.)

---

## 14. Raft vs Paxos vs ZAB

| | **Raft** | **Paxos** (Multi-Paxos) | **ZAB** (ZooKeeper Atomic Broadcast) |
|---|---------|------------------------|--------------------------------------|
| Tác giả | Ongaro & Ousterhout, 2014 | Lamport, 1998 | Yahoo, ~2008 |
| Triết lý | **Dễ hiểu**, leader mạnh | Foundational, tổng quát, khó hiểu | Tối ưu cho primary-backup |
| Leader | Bắt buộc, log một chiều | Tuỳ biến thể; gốc không có leader cố định | Có leader (gọi là primary) |
| Điểm mạnh | Dễ implement đúng, tài liệu tốt | Linh hoạt, nền lý thuyết | Tích hợp chặt với ZooKeeper |
| Dùng ở | etcd, Consul, TiKV, CockroachDB, Kafka KRaft | Google Chubby, Spanner | ZooKeeper, Kafka (cũ) |

> 💡 Raft và Paxos **tương đương** về năng lực và hiệu năng. Khác biệt lớn nhất là **độ dễ hiểu** — Raft được thiết kế chủ đích cho việc đó, nên ngày nay hệ mới phần lớn chọn Raft.

---

## 15. Thư viện Go

| Thư viện | Đặc điểm |
|----------|----------|
| [`hashicorp/raft`](https://github.com/hashicorp/raft) | API gọn, dùng trong Consul/Nomad/Vault. Bạn cung cấp `FSM` (state machine) + storage; lib lo election & replication. Dễ bắt đầu. |
| [`etcd-io/raft`](https://github.com/etcd-io/raft) | Thư viện Raft của etcd. Thiết kế kiểu "state machine thuần" — bạn tự lo network & disk, lib chỉ trả ra các "Ready" cần xử lý. Mạnh, dùng bởi etcd/CockroachDB/TiKV, nhưng học hơi dốc. |

Quy tắc thực dụng: **đừng tự viết Raft cho production.** `solutions.go` trong bài là toy model để học, không phải để chạy thật.

---

## 16. Common pitfalls

| Pitfall | Vì sao | Cách xử lý đúng |
|---------|--------|-----------------|
| **Số node chẵn** | N=4 chịu lỗi y hệt N=3 (cả hai = 1) nhưng tốn hơn 1 máy và dễ split vote hơn. | Luôn dùng **số lẻ**: 3, 5, 7. |
| **Network partition → phe thiểu số treo** | Đây là **hành vi đúng** (CP), không phải bug. | Đặt cluster ở ≥ 3 zone để partition khó cô lập majority; theo dõi alert "no leader". |
| **Slow follower** | Follower chậm làm leader phải retry AppendEntries. | Leader **không bị chặn**: chỉ cần majority ack đã commit; follower chậm sẽ bắt kịp qua heartbeat/snapshot. |
| **Tưởng Raft cần đồng hồ đồng bộ** | Raft **KHÔNG** cần clock đồng bộ (khác Spanner TrueTime). | Nó chỉ cần **timeout** (khoảng thời gian tương đối) cho election; term là logical clock, không phải wall clock. |
| **Đặt election timeout quá nhỏ** | Mạng hơi trễ → follower tưởng leader chết → bầu lại liên tục (election storm). | timeout election ≫ thời gian round-trip mạng (vd RTT 10ms → timeout 150–300ms). |

---

## Bài tập

> Làm trước, rồi đối chiếu "Lời giải chi tiết" bên dưới.

- **BT1.** Walk-through 5 node bầu leader; sau đó leader chết, mô tả quá trình re-election (ai timeout, term thay đổi thế nào, ai thắng).
- **BT2.** Tính quorum và số node fail chịu được cho N=7 và N=4.
- **BT3.** Trace log replication: leader N=5 append một entry, 3/5 node ack. Entry có commit không? Mô tả từng bước.
- **BT4.** Mô tả một kịch bản **split vote** cụ thể trên N=5, rồi giải thích randomized timeout sửa nó ra sao.
- **BT5.** N=5 bị partition 3–2. Nửa nào bầu được leader? Nửa kia ra sao? Khi partition lành thì sao?
- **BT6.** Vì sao số node chẵn (N=4) tệ hơn lẻ (N=5)? So sánh fault tolerance và rủi ro split vote.

---

## Lời giải chi tiết

### Lời giải BT1 — Election & re-election 5 node

**Bầu lần đầu** (term 0 → 1):
1. 5 node {A,B,C,D,E} đều Follower, timeout ngẫu nhiên. Giả sử **C timeout trước** (165ms).
2. C → Candidate, **term=1**, tự bầu (votes=1), gửi `RequestVote(term=1)` tới A,B,D,E.
3. A,B,D,E: term mới, chưa bầu ai, log ngang nhau → grant. C nhận đủ **3+ phiếu (5/5)** → **Leader term 1**.
4. C gửi heartbeat đều → 4 follower reset timeout liên tục → không ai timeout. Ổn định.

**Leader C chết** (re-election, term 1 → 2):
1. C ngừng gửi heartbeat. A,B,D,E không nghe gì → đếm ngược timeout.
2. Giả sử **D timeout trước** (term hiện 1) → D → Candidate, **term=2**, tự bầu, gửi `RequestVote(term=2)` tới A,B,E (C đã chết, không nhận).
3. A,B,E thấy term=2 > 1, chưa bầu ai trong term 2, log của D đủ mới → grant.
4. D nhận votes = 1 (mình) + 3 = **4 ≥ quorum 3** → **Leader term 2**.
5. Cluster tiếp tục với 4 node sống. Quorum vẫn 3, mà 4 ≥ 3 → vẫn hoạt động bình thường (chịu được 1 fail).

(Đây chính là kịch bản `solutions.go` in ra ở mục `[1]` và `[3]`.)

### Lời giải BT2 — Quorum & fault tolerance

Công thức: `quorum = ⌊N/2⌋ + 1`, `tolerate = N − quorum = ⌊(N−1)/2⌋`.

- **N=7:** quorum = `⌊7/2⌋ + 1 = 3 + 1 = 4`. Chịu fail = `7 − 4 = 3` node.
- **N=4:** quorum = `⌊4/2⌋ + 1 = 2 + 1 = 3`. Chịu fail = `4 − 3 = 1` node.

Nhận xét: N=4 chịu fail (1) **bằng** N=3 (cũng 1), nhưng tốn thêm 1 máy → **lãng phí**. Muốn chịu 2 fail phải nhảy lên N=5, chịu 3 fail thì N=7.

### Lời giải BT3 — Log replication, 3/5 ack

**Có, entry được commit.** Vì 3/5 = majority (quorum của N=5 là 3). Trace:

1. Leader L append entry ở index `i`, `LogEntry{term=T, cmd}`. commitIndex chưa đổi.
2. L gửi `AppendEntries(entry i)` tới F1,F2,F3,F4.
3. F1, F2 ack (success). Bây giờ entry `i` có trên: L, F1, F2 = **3 node**.
4. `3 ≥ quorum(3)` → L **commit** index `i`: tăng `commitIndex = i`, apply vào state machine, trả "OK" cho client.
5. F3, F4 có thể ack muộn hoặc nhận lại entry qua heartbeat sau; chúng append và cập nhật commitIndex theo `leaderCommit` của leader. Cuối cùng cả 5 node hội tụ.

Mấu chốt: leader **không chờ** F3, F4 — majority đã đủ. (Khớp mục `[2]` và `[4]` trong `solutions.go`, nơi `4/5 ack ≥ quorum 3` vẫn commit dù node chết không phản hồi.)

### Lời giải BT4 — Split vote & randomized timeout

**Kịch bản split vote** (giả định timeout cố định 200ms cho tất cả):
1. Leader chết. Cả A,B,C,D,E cùng timeout tại t=200ms.
2. A,B,C,D,E **đồng loạt** → Candidate, mỗi node tăng term lên 2, **tự bầu mình** (mỗi node votes=1).
3. Mỗi candidate gửi RequestVote, nhưng mọi node khác **đã bầu cho chính nó** trong term 2 → từ chối phiếu cho người khác.
4. Kết quả: mỗi candidate chỉ có **1 phiếu**, không ai đạt quorum 3 → **không bầu được**. Tăng term 3, lặp lại y hệt → kẹt.

**Randomized timeout sửa:**
1. Mỗi node bốc timeout ngẫu nhiên trong [150,300]ms. Giả sử A=160, các node khác ≥ 200.
2. A timeout trước (160ms), lên Candidate term 2, xin phiếu **trong khi các node khác còn đang chờ** → chúng chưa tự bầu mình nên sẵn sàng grant cho A.
3. A nhận đủ 3+ phiếu → Leader, gửi heartbeat → reset timeout các node khác trước khi chúng kịp timeout → không ai khác lên Candidate.
4. Nếu hiếm khi 2 node vẫn trùng và split → term sau bốc timeout mới, xác suất trùng lại giảm theo cấp số nhân → hội tụ rất nhanh.

### Lời giải BT5 — Split-brain partition 3–2

N=5, partition thành **{n0,n1,n2}** (phe A, 3 node) và **{n3,n4}** (phe B, 2 node). Quorum = 3.

- **Phe A (3 node):** đủ quorum. Một node lên Candidate, 3 node nội bộ grant → đạt **3 ≥ 3** → **bầu được leader**, tiếp tục nhận client request và commit (mọi commit chỉ cần 3 ack, mà phe A có đúng 3).
- **Phe B (2 node):** một node lên Candidate, xin phiếu nhưng chỉ liên lạc được n3,n4 → tối đa **2 phiếu < 3** → **KHÔNG** bao giờ thành leader. Nó cứ timeout → tăng term → xin lại → vẫn fail → **treo** (không phục vụ ghi). Đây là hành vi đúng (CP).
- **Khi partition lành:** phe B thấy heartbeat từ leader phe A với **term cao hơn** (vì phe B đã tăng term nhiều lần khi cố bầu, nhưng leader phe A vẫn commit được nên log của A mới hơn; theo election restriction phe B không thể lật ngược) → các node phe B **tụt về Follower**, đồng bộ log theo leader, bỏ các entry chưa commit của riêng mình. Cluster về 1 leader, không mất dữ liệu đã commit.

→ Không bao giờ có 2 leader cùng commit → **không split-brain**.

### Lời giải BT6 — Vì sao số node chẵn tệ

So sánh **N=4** vs **N=5**:

| | N=4 | N=5 |
|---|-----|-----|
| Quorum | 3 | 3 |
| Chịu fail | `4−3 = 1` | `5−3 = 2` |
| Số máy | 4 | 5 |

1. **Fault tolerance không tăng:** N=4 chịu **1** fail — y hệt N=3 — nhưng tốn thêm 1 máy. Muốn nhảy lên chịu 2 fail phải đi tới N=5. Vậy N=4 "phí" 1 máy mà chẳng được gì so với N=3.
2. **Rủi ro chia đôi:** với N chẵn, một partition **2–2** chia cluster thành hai nửa **bằng nhau**, **không nửa nào** đạt quorum 3 → **cả cluster treo** (không leader). Với N=5 lẻ, partition tệ nhất là 3–2, **luôn có** một nửa (nửa 3) đạt quorum → cluster vẫn sống.
3. **Dễ split vote hơn:** số node chẵn làm phiếu dễ chia đều 2–2 hơn.

→ **Luôn chọn số lẻ (3, 5, 7).** Đó là khuyến nghị chuẩn của mọi triển khai Raft thực tế (etcd, Consul).

---

## Code & Minh họa

- [solutions.go](./solutions.go) — mô phỏng cluster Raft N=5 in-memory bằng goroutine + channel: leader election với randomized timeout, log replication với majority commit, kill leader → tự re-elect. Chạy: `go run solutions.go`.
- [visualization.html](./visualization.html) — 3 module tương tác:
  1. **Leader election** — 5 node trên vòng tròn, animate timeout → candidate → vote → leader; nút "kill leader" để xem re-election.
  2. **Log replication** — leader append entry, replicate sang follower, commit khi đạt majority.
  3. **Split-brain** — kéo partition cluster 3–2, thấy nửa thiểu số không bầu được leader.

---

## Bài tiếp theo

- [Lesson 69 — Microservice Patterns](../lesson-69-microservice-patterns/) — saga, API gateway, circuit breaker; nhiều pattern dựa trên coordination/consensus học ở bài này.

## Tham khảo

- Diego Ongaro & John Ousterhout — *In Search of an Understandable Consensus Algorithm (Raft)*, USENIX ATC 2014.
- [The Raft Website](https://raft.github.io/) — có visualization "thesecretlivesofdata.com/raft" tương tác.
- [etcd Raft](https://github.com/etcd-io/raft), [hashicorp/raft](https://github.com/hashicorp/raft).
