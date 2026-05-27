// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-52-rate-limiting-circuit-breaker/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 52 — Rate Limiting & Circuit Breaker

> **Tier 4 · Web & Backend** — Bảo vệ service khỏi abuse (rate limit) và khỏi cascading failure (circuit breaker), hai cặp đôi "thuộc nằm lòng" của mọi backend production.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Biết **vì sao** phải rate limit (không phải mỗi chuyện "chống DDoS") và **theo đối tượng nào** (IP / user / API key / endpoint / global).
- Hiểu rõ **4 thuật toán rate limit** kinh điển — token bucket, leaky bucket, fixed window, sliding window — sự khác biệt về burst, độ chính xác, memory.
- Viết được **token bucket Go thủ công** và biết khi nào dùng \`golang.org/x/time/rate\`.
- Setup **distributed rate limit** bằng Redis INCR/EXPIRE và Redis Lua script (atomic).
- Hiểu **HTTP semantics**: status 429, header \`Retry-After\`, \`X-RateLimit-*\`.
- Cài đặt **circuit breaker state machine** (Closed / Open / Half-Open) bằng tay, biết khi nào dùng \`sony/gobreaker\`.
- Kết hợp rate limit + circuit breaker + bulkhead thành một **phòng tuyến nhiều lớp** cho service production.
- Tránh được 5 pitfall phổ biến: limit quá chặt, không có \`Retry-After\`, circuit không timeout, hedged request amplify load, per-IP limit bị NAT bypass.

## Kiến thức tiền đề

- [Lesson 29 — Context & Cancellation](../lesson-29-context-cancellation/README.md): mọi cuộc gọi downstream phải có deadline.
- [Lesson 42 — HTTP net/http Deep](../lesson-42-http-net-deep/README.md): biết status code, header, middleware.
- [Lesson 44 — Routing Frameworks](../lesson-44-routing-frameworks/README.md): middleware chain.
- [Lesson 51 — Graceful Shutdown](../lesson-51-graceful-shutdown/README.md): rate limit và circuit breaker phải reset state đúng khi service dừng.

---

## 1. Vì sao phải rate limit?

> 💡 **Trực giác.** Hãy hình dung quán phở: bếp nấu được 60 tô/giờ. Nếu cửa mở thoải mái, có lúc 200 khách kéo vào cùng lúc — bếp sập, ai cũng đợi 2 tiếng, không ai vui. Quán giải bằng cách phát số: mỗi 1 phút đón 1 khách. Đó là **rate limit**. Không phải để đuổi khách — mà để **đảm bảo mọi khách đều có trải nghiệm chấp nhận được** trong khi không vượt năng lực bếp.

Rate limit giải quyết **đồng thời 4 vấn đề**:

| Vấn đề | Ví dụ thực tế | Hậu quả nếu không có rate limit |
|--------|---------------|--------------------------------|
| **Chống abuse / DoS** | Một con bot quét toàn bộ endpoint \`/users/:id\` từ ID 1 đến 10 triệu. | DB ngập query, p99 latency của user thật tăng 50×. |
| **Fair share** | API public, 1 client gửi 1000 req/s trong khi 100 client khác chỉ gửi 1 req/s. | Client kia ăn hết throughput, các client khác thấy chậm. |
| **Cost control** | Bạn build wrapper lên OpenAI API (trả \\$0.01/request). Một user viết script gọi 100k lần/phút. | Hóa đơn nổ \\$1000/phút. |
| **Protect downstream** | Service A gọi DB. DB chỉ chịu được 5k QPS. Nếu A nhận 50k QPS, sẽ đẩy 50k xuống DB. | DB sập → A sập → mọi service phụ thuộc A sập (cascading). |

> ❓ **Câu hỏi tự nhiên.**
>
> *"Có firewall / WAF rồi, sao cần thêm rate limit ở application?"* — Firewall chặn theo IP và pattern thô (vd \`> 1000 req/s thì block 5 phút\`). Application rate limit biết **ngữ cảnh**: limit theo user ID (không phải IP), theo endpoint (POST \`/login\` chặt hơn GET \`/health\`), theo plan giá (free vs paid). WAF + app rate limit là **bổ sung**, không thay thế nhau.
>
> *"Service nội bộ (không lộ ra Internet) có cần rate limit không?"* — **Có**. Bug trong service A gọi service B trong vòng \`for\` không có break → B sập. Rate limit nội bộ chính là **fuse** an toàn. Nguyên tắc: mọi cặp service-to-service phải có rate limit ở phía caller (client-side) hoặc callee (server-side).

> 📝 **Tóm tắt mục 1.**
> - Rate limit = 4-trong-1: abuse, fair share, cost, protect downstream.
> - Cả service public lẫn internal đều cần.
> - WAF khác app rate limit — bổ sung nhau.

---

## 2. Đối tượng rate limit — limit "theo ai"?

Trước khi chọn thuật toán, phải xác định **key** dùng để đếm. Sai key = limit sai mục tiêu.

| Key | Ưu | Nhược | Khi nào dùng |
|-----|----|-------|--------------|
| **Per-IP** | Đơn giản, không cần auth. | Sau NAT / proxy: nhiều user share 1 IP → 1 user phá làm cả lab sập. IPv6 → IP gần như vô tận, attacker dễ né. | Chống abuse thô ở edge, public API chưa auth (vd \`/login\`). |
| **Per-user** (user ID sau khi auth) | Công bằng, attacker không né được bằng đổi IP. | Cần auth trước, không dùng được cho \`/login\` hay \`/register\`. | API có auth, mọi endpoint sau khi xác thực. |
| **Per-API-key** | Giống per-user nhưng cho B2B (mỗi org 1 key). | Key leak → kẻ trộm dùng tới quota. | Public API có quota theo plan giá. |
| **Per-endpoint** | Phản ánh cost thật (login đắt, health nhẹ). | Mỗi endpoint cấu hình riêng → operational overhead. | POST \`/login\` (5/min), GET \`/feed\` (60/min), POST \`/upload\` (10/min). |
| **Global** | Backstop cuối cùng. | Không công bằng giữa users. | Chống surge bất thường: "service không bao giờ nhận > 10k req/s". |

**Trong thực tế dùng đồng thời nhiều layer:**

\`\`\`
Request
  → [Layer 1] Per-IP rate limit ở Nginx/CDN (chống bot thô)
  → [Layer 2] Per-API-key ở API Gateway (theo plan giá)
  → [Layer 3] Per-user + per-endpoint ở Application (logic nghiệp vụ)
  → [Layer 4] Global circuit breaker ở downstream caller (protect DB)
\`\`\`

> ⚠ **Pitfall — per-IP và NAT.** Văn phòng có 200 nhân viên ngồi sau 1 IP công cộng. Nếu API limit \`100 req/min/IP\` → cả văn phòng chỉ được 100/phút. Một dev test API là người khác bị block. **Fix:** ở layer Application luôn ưu tiên **per-user**, per-IP chỉ dùng ở edge cho traffic chưa auth.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Endpoint \`POST /login\` nên rate limit theo key gì?
> 2. Vì sao không nên dùng per-IP cho mọi endpoint?
>
> <details><summary>Đáp án</summary>
>
> 1. **Per-IP và per-username gửi lên**, kết hợp. Per-IP để chống brute force IP cố định, per-username để chống bot rải qua nhiều IP. Không dùng per-user-id vì lúc login chưa biết user ID.
> 2. NAT / proxy / CGNAT khiến nhiều user share IP. Per-IP công bằng giả tạo. Dùng per-user khi đã auth.
> </details>

---

## 3. Bốn thuật toán rate limit kinh điển

Đây là phần cốt lõi. Mỗi thuật toán có **một câu chuyện riêng** về cách đếm và cách xử lý burst.

### 3.1 Token bucket — "rổ token nạp đều, request nhặt 1 token"

> 💡 **Trực giác.** Một cái rổ chứa được tối đa **B token**. Mỗi giây có **R token mới** rơi vào rổ (nếu rổ chưa đầy). Mỗi request muốn được phục vụ phải **lấy 1 token** ra khỏi rổ. Rổ rỗng → request bị từ chối.

**Tham số:**
- \`B\` (burst / capacity): tối đa bao nhiêu request "đặt cọc" được lúc rổ đầy.
- \`R\` (rate, token/giây): tốc độ refill.

**Walk-through với số cụ thể.** \`B = 5, R = 2 token/s\`. Bắt đầu rổ đầy (5 token).

| Thời điểm | Sự kiện | Tokens trước | Tokens sau | Allow? |
|-----------|---------|--------------|------------|--------|
| t=0.0s | rổ khởi tạo | — | 5 | — |
| t=0.0s | req A | 5 | 4 | ✓ |
| t=0.0s | req B | 4 | 3 | ✓ |
| t=0.0s | req C | 3 | 2 | ✓ |
| t=0.0s | req D | 2 | 1 | ✓ |
| t=0.0s | req E | 1 | 0 | ✓ (burst dùng hết) |
| t=0.0s | req F | 0 | 0 | ✗ (deny) |
| t=0.5s | refill (+1) | 0 | 1 | — |
| t=0.5s | req G | 1 | 0 | ✓ |
| t=1.0s | refill (+1) | 0 | 1 | — |
| t=1.5s | refill (+1) | 1 | 2 | — |
| t=2.0s | refill (+1) | 2 | 3 | — |
| t=2.5s | refill (+1) | 3 | 4 | — |

Nhìn vào bảng: tại t=0 ta xài **5 token cùng lúc** (burst), sau đó tốc độ ổn định về **2/giây** (= R). Đây là điểm hấp dẫn: **cho phép burst ngắn nhưng giới hạn tốc độ trung bình**.

**Công thức "lazy refill"** (không cần goroutine timer riêng):

\`\`\`
khi có request đến lúc t:
  elapsed = t - last_refill_time
  tokens = min(B, tokens + elapsed * R)
  last_refill_time = t
  if tokens >= 1:
    tokens -= 1
    return ALLOW
  else:
    return DENY
\`\`\`

Mỗi request chỉ tốn vài phép tính số học. Không cần goroutine.

> ❓ **Câu hỏi tự nhiên.**
>
> *"Burst lớn có hại không?"* — Tùy. Cho UX tốt (user click 3 lần nhanh không bị block) thì burst nhỏ (\`B = R × 2..5\`). Cho API mà downstream sức chứa hữu hạn, đặt \`B\` thấp để không spike. Quy tắc: **\`B\` không lớn hơn năng lực burst của downstream**.
>
> *"Float \`tokens\` có chính xác không?"* — Float64 đủ cho mọi rate thực tế. Nếu cần atomic cho concurrent, dùng \`sync/atomic\` với scaled int (token × 1000).

**\`golang.org/x/time/rate\` của Go là token bucket:**

\`\`\`go
import "golang.org/x/time/rate"

// 10 req/s, burst 5
limiter := rate.NewLimiter(rate.Limit(10), 5)

if !limiter.Allow() {
    http.Error(w, "Too many requests", http.StatusTooManyRequests)
    return
}
\`\`\`

Đây là implementation chuẩn, có 3 method:
- \`Allow()\` — trả \`bool\` ngay, không block.
- \`Wait(ctx)\` — block đến khi có token (hoặc ctx hết hạn).
- \`Reserve()\` — đặt chỗ trước, biết phải chờ bao lâu.

> ⚠ **Pitfall — \`Wait\` trong HTTP handler.** Đừng \`limiter.Wait(ctx)\` trong middleware HTTP. Lý do: 1000 request đến cùng lúc → 1000 handler block → 1000 goroutine + 1000 connection. Server hết RAM/socket. Dùng \`Allow()\` (fail fast, trả 429) thay vì block.

### 3.2 Leaky bucket — "bucket có lỗ rò, đầu ra đều đặn"

> 💡 **Trực giác.** Hình dung một cái xô có **lỗ rò ở đáy**: nước chảy ra với tốc độ R lít/giây. Request mới giống như **đổ thêm nước vào**: xô đầy → tràn (drop). Output luôn đều, không bao giờ burst.

**Khác token bucket:**
- Token bucket: token **vào đều, request lấy bất kỳ lúc nào** → **cho phép burst output**.
- Leaky bucket: request **vào bất kỳ lúc nào, output ra đều** → **không bao giờ burst output**.

**Walk-through.** Queue size \`B = 5\`, leak rate \`R = 2/s\`.

| Thời điểm | Đến | Trong queue | Xử lý ra | Drop? |
|-----------|-----|-------------|----------|-------|
| t=0.0 | 7 req cùng lúc | 5 (xếp), 2 drop | — | 2 bị drop |
| t=0.5 | — | 4 | 1 (#1) | — |
| t=1.0 | — | 3 | 1 (#2) | — |
| t=1.5 | — | 2 | 1 (#3) | — |
| t=2.0 | 3 req mới | 4 | 1 (#4) | — |
| t=2.5 | — | 3 | 1 (#5) | — |

Output luôn 2/s đều. **Latency biến thiên** — request đứng cuối queue đợi (\`queue_size / R\`) giây.

**Khi nào dùng:**
- Output stream cần ổn định (vd gửi log lên service ingest có rate giới hạn).
- Không thích burst (vd ghi file, write DB liên tục).

**Khi nào không dùng:**
- API user-facing (latency biến thiên = UX tệ).
- Cần response ngay (leaky bucket trễ).

### 3.3 Fixed window — "đếm trong từng cửa sổ N giây"

> 💡 **Trực giác.** Mỗi 60s tạo một "ô đếm" mới. Mỗi request đến **+1** vào ô hiện tại. Quá \`limit\` thì deny. Hết 60s thì ô reset về 0.

\`\`\`
window: [00:00 .. 00:60)  count = ?
window: [00:60 .. 01:00)  count = ?
window: [01:00 .. 01:60)  count = ?
\`\`\`

**Walk-through.** Limit = 100 req/phút.

| Thời điểm | Window | Count trước | Action | Count sau |
|-----------|--------|-------------|--------|-----------|
| 12:00:01 | 12:00 | 0 | allow | 1 |
| 12:00:30 | 12:00 | 99 | allow | 100 |
| 12:00:31 | 12:00 | 100 | **deny** | 100 |
| 12:00:59 | 12:00 | 100 | deny | 100 |
| 12:01:00 | 12:01 | **0** (window mới) | allow | 1 |

**Ưu:** đơn giản nhất, chỉ cần 1 counter + reset.
**Pseudocode Redis:**
\`\`\`
key = "rl:user:42:" + (now / 60)   // phút làm bucket
INCR key
EXPIRE key 60
if count > 100: deny
\`\`\`

> ⚠ **Pitfall — burst tại boundary.** Limit 100/phút. User gửi:
> - 100 req lúc **12:00:59** → đều allow (window 12:00 count = 100).
> - 100 req lúc **12:01:00** → đều allow (window 12:01 count = 100).
> Trong 2 giây liên tiếp (12:00:59 → 12:01:00), user gửi **200 req**. Limit "100/phút" bị vượt **2 lần** trong window 1 phút sliding thực tế. Đây gọi là **window boundary attack**.

### 3.4 Sliding window — chính xác hơn, tốn hơn

Hai biến thể phổ biến:

**(a) Sliding log:** lưu timestamp mọi request gần đây. Khi request mới đến: xóa timestamp cũ hơn \`now - 60s\`, đếm số còn lại.

- ✓ Chính xác tuyệt đối.
- ✗ Memory: O(số request trong window) per key. 1000 user × 100 req/min = 100k timestamp = nặng.

**(b) Sliding window counter** (xấp xỉ): lưu count của window hiện tại + window trước. Nội suy tuyến tính.

\`\`\`
elapsed_in_current = (now mod 60) / 60   // ví dụ 0.5 nếu đang giữa phút
estimated = count_current + count_previous * (1 - elapsed_in_current)
\`\`\`

**Walk-through.** Limit 100/phút. Đang lúc 12:00:30 (elapsed = 0.5).
- count(window 11:59) = 80
- count(window 12:00) = 50
- estimated = 50 + 80 × (1 - 0.5) = 50 + 40 = **90** → allow (90 < 100).

Sau đó 1s, 12:00:31:
- elapsed = 31/60 ≈ 0.52
- estimated = 50 + 80 × 0.48 ≈ 88.4

Giảm đều khi window cũ "trôi ra ngoài". **Mượt, không burst tại boundary.**

| Thuật toán | Burst | Chính xác | Memory | Code |
|-----------|-------|-----------|--------|------|
| Token bucket | ✓ (B token) | Cao | O(1) | Vừa |
| Leaky bucket | ✗ (output đều) | Cao | O(1) ngoài queue | Vừa |
| Fixed window | Tại boundary | Thấp (boundary issue) | O(1) | Đơn giản nhất |
| Sliding window (counter) | ✗ | Cao | O(1) (2 counters) | Vừa |
| Sliding log | ✗ | Tuyệt đối | O(N) | Vừa |

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Limit 10/phút. Token bucket B=10, R=10/60. Fixed window 60s. User gửi 10 req lúc t=0, sau đó 10 req lúc t=59. Cái nào allow tất, cái nào deny?
> 2. Vì sao sliding window counter là **xấp xỉ** chứ không chính xác tuyệt đối?
>
> <details><summary>Đáp án</summary>
>
> 1. **Token bucket:** lúc t=0 dùng hết 10 token. Đến t=59, refill được 59 × 10/60 ≈ 9.83 token, cộng với 0 còn lại = 9.83 < 10 → req thứ 10 deny. **Fixed window:** 10 req lúc t=0 trong window [0..60), 10 req lúc t=59 vẫn cùng window → count = 20 > 10 → 10 req sau đều deny. Cả hai đều bảo vệ ở case này, nhưng token bucket bảo vệ "đều" hơn (chỉ deny đúng 1 req).
> 2. Vì giả định request **phân bố đều** trong window cũ. Nếu thực tế tất cả 80 req của window cũ tập trung ở 1s đầu (xa boundary), việc nhân \`× (1 - elapsed)\` quá conservative (under-count). Ngược lại nếu tập trung ở cuối, dưới-ước. Sai số bounded ≈ ±20% trong worst case, đủ tốt cho hầu hết use case.
> </details>

> 📝 **Tóm tắt mục 3.**
> - **Token bucket** = burst-friendly, dùng cho API user-facing.
> - **Leaky bucket** = output đều, dùng cho stream ra downstream.
> - **Fixed window** = đơn giản nhất, nhưng có lỗ hổng boundary.
> - **Sliding window** = mượt, chính xác — counter dùng O(1), log dùng O(N).

---

## 4. Distributed rate limit — nhiều instance, một limit chung

Vấn đề: bạn có 10 instance chạy sau load balancer. Nếu mỗi instance giữ token bucket riêng với \`R = 100/s\`, **tổng** thực tế thành **1000/s**. Limit của bạn rò gấp 10 lần.

**Giải pháp:** shared store. Redis là lựa chọn phổ biến nhất.

### 4.1 Naive — Redis INCR + EXPIRE (fixed window)

\`\`\`
KEY = "rl:user:42:" + (now / 60)         // bucket theo phút
val = INCR KEY
if val == 1:
    EXPIRE KEY 60                         // chỉ set TTL ở lần đầu
if val > 100:
    DENY (status 429)
\`\`\`

**Pro:** đơn giản, 2 lệnh.
**Con:**
- INCR và EXPIRE **không atomic** (2 round trip). Nếu EXPIRE fail (crash giữa chừng), key tồn tại mãi.
- Fixed window có lỗ hổng boundary đã nói ở 3.3.

### 4.2 Đúng — Redis Lua script (atomic, sliding/token bucket)

Lua script chạy atomic trong Redis. Token bucket implement:

\`\`\`lua
-- KEYS[1] = key (vd "rl:user:42")
-- ARGV[1] = capacity B
-- ARGV[2] = refill_rate R (token/s)
-- ARGV[3] = now (unix ms)
-- ARGV[4] = cost (mặc định 1)

local cap = tonumber(ARGV[1])
local rate = tonumber(ARGV[2])
local now = tonumber(ARGV[3])
local cost = tonumber(ARGV[4])

local state = redis.call("HMGET", KEYS[1], "tokens", "ts")
local tokens = tonumber(state[1]) or cap
local last_ts = tonumber(state[2]) or now

-- refill
local elapsed = (now - last_ts) / 1000.0
tokens = math.min(cap, tokens + elapsed * rate)

local allowed = 0
if tokens >= cost then
    tokens = tokens - cost
    allowed = 1
end

redis.call("HMSET", KEYS[1], "tokens", tokens, "ts", now)
redis.call("EXPIRE", KEYS[1], math.ceil(cap / rate) + 10)

return {allowed, tokens}
\`\`\`

Mỗi request = 1 round trip duy nhất.

> ❓ **Câu hỏi tự nhiên.**
>
> *"Redis sập thì sao?"* — Có 2 chiến lược:
> - **Fail-open** (allow tất khi Redis down): mất rate limit tạm thời nhưng service vẫn chạy. Phù hợp khi rate limit là "fair share" chứ không phải critical.
> - **Fail-closed** (deny tất): an toàn cho cost-control hoặc security-critical. Nhưng Redis down = service xuống → cân nhắc.
>
> Best practice: thử Redis có **timeout ngắn** (vd 50ms). Timeout/error → fall back về **local rate limit** mỗi instance (vd \`R / số_instance × 1.5\` cho có buffer).

### 4.3 Cache + Redis hybrid

Để giảm tải Redis: cache **kết quả deny** vài giây ở local memory. User đã bị deny lần 1, các lần sau trong window ngắn không cần đi Redis nữa.

\`\`\`go
if localDenyCache.Get(key) { return DENY }   // miss-free path khi đã deny
allowed := redisCheck(key)
if !allowed {
    localDenyCache.Set(key, true, time.Second)
}
\`\`\`

> 📝 **Tóm tắt mục 4.**
> - Multiple instance → cần shared store (Redis là default).
> - Lua script = 1 round trip, atomic.
> - Plan cho Redis down trước (fail-open hay fail-closed).
> - Local cache giảm tải Redis cho hot deny.

---

## 5. HTTP semantics — đừng chỉ trả 429

Khi reject, **luôn** trả đủ info để client hiểu phải làm gì:

\`\`\`http
HTTP/1.1 429 Too Many Requests
Content-Type: application/json
Retry-After: 30
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1716800460

{
  "error": "rate_limited",
  "message": "Quá số request cho phép. Thử lại sau 30 giây.",
  "retry_after_seconds": 30
}
\`\`\`

| Header | Ý nghĩa | Lưu ý |
|--------|---------|-------|
| \`Retry-After\` | Giây phải chờ trước khi thử lại. Có thể là số giây hoặc HTTP date. | Chuẩn HTTP RFC 7231. Client nào tôn trọng standard sẽ dùng. |
| \`X-RateLimit-Limit\` | Limit tổng. | Không phải chuẩn RFC, nhưng convention GitHub/Stripe đặt. |
| \`X-RateLimit-Remaining\` | Còn được phép bao nhiêu. | Đặt ở **mọi response** (cả 200 lẫn 429) để client hiển thị "còn 5 lần". |
| \`X-RateLimit-Reset\` | Unix timestamp khi reset. | Hoặc số giây tới reset (tùy convention). |

> ⚠ **Pitfall — không có \`Retry-After\`.** Client viết retry loop mặc định \`sleep(0.1s)\` rồi retry. Bị 429 → retry ngay → 429 tiếp → vòng lặp 100 req/s. Bạn nghĩ đã limit nhưng load tăng thêm 100×. Trả \`Retry-After: 30\` để client biết phải sleep 30 giây.

**Status code chọn đúng:**
- **429 Too Many Requests** — chuẩn cho rate limit.
- **503 Service Unavailable** — server quá tải (không phải lỗi client). Đi kèm \`Retry-After\`.
- **403 Forbidden** — sai semantics, không dùng cho rate limit.

---

## 6. Circuit Breaker pattern — chống cascading failure

> 💡 **Trực giác.** Service A gọi B, B gọi C. C đang sập, mỗi request đợi timeout 30s rồi mới fail. A có 100 connection pool → trong vài giây, 100 connection đều kẹt đợi C. Request mới đến A → không có connection → A cũng sập. C kéo theo B, B kéo theo A. **Cascading failure.**
>
> **Circuit breaker giống cầu chì điện trong nhà:** khi phát hiện dây có vấn đề, **cắt mạch** ngay để bảo vệ phần còn lại. Trong code: detect downstream đang fail → **stop gọi nó trong vài giây**, trả lỗi nhanh. Sau cooldown, **thử lại** (half-open) để xem có hồi phục chưa.

### 6.1 Ba state

\`\`\`
        ┌─────────┐    consec_fail >= 5    ┌──────┐
        │ CLOSED  │ ────────────────────▶ │ OPEN │
        │ (cho   │                        │(reject│
        │ qua)   │ ◀──────────────────── │ ngay)│
        └─────────┘   success in half-open └──────┘
              ▲          │                    │
              │          │ fail in half-open  │ sau cooldown 10s
              │          ▼                    ▼
              │      ┌───────────┐       ┌───────────┐
              └──────│ HALF-OPEN │ ◀──── │ HALF-OPEN │
        success     │ (1 probe) │       │  trigger   │
                    └───────────┘       └───────────┘
\`\`\`

| State | Hành vi | Khi nào chuyển |
|-------|---------|----------------|
| **Closed** | Forward mọi request xuống downstream. Đếm fail. | Vượt threshold (5 fail liên tiếp hoặc fail rate > 50% trong window) → Open. |
| **Open** | **Reject ngay** không gọi downstream. Trả lỗi cached (vd "service unavailable"). | Hết cooldown (vd 10s) → Half-Open. |
| **Half-Open** | Cho phép **đúng 1 request** đi qua như probe. Block các request khác. | Probe thành công → Closed. Probe fail → Open trở lại. |

### 6.2 Walk-through

Threshold: 3 fail liên tiếp. Cooldown: 5s.

| Thời điểm | State trước | Sự kiện | State sau |
|-----------|-------------|---------|-----------|
| t=0.0 | Closed (fails=0) | req thành công | Closed (fails=0) |
| t=1.0 | Closed (fails=0) | req fail | Closed (fails=1) |
| t=1.5 | Closed (fails=1) | req fail | Closed (fails=2) |
| t=2.0 | Closed (fails=2) | req fail | **Open** (last_open=2.0) |
| t=2.1 | Open | req mới → reject ngay, không gọi downstream | Open |
| t=6.5 | Open | req mới → hết cooldown (6.5 - 2.0 > 5) → cho probe | **Half-Open** |
| t=6.6 | Half-Open | probe thành công | **Closed** (fails=0) |

Nếu probe fail thì quay lại Open, reset cooldown 5s.

### 6.3 Implement bằng tay (Go)

\`\`\`go
type State int
const (
    StateClosed State = iota
    StateOpen
    StateHalfOpen
)

type Breaker struct {
    mu              sync.Mutex
    state           State
    failures        int
    failThreshold   int
    cooldown        time.Duration
    lastOpenedAt    time.Time
    halfOpenProbing bool
}

func (b *Breaker) Allow() bool {
    b.mu.Lock(); defer b.mu.Unlock()
    switch b.state {
    case StateClosed:
        return true
    case StateOpen:
        if time.Since(b.lastOpenedAt) >= b.cooldown {
            b.state = StateHalfOpen
            b.halfOpenProbing = false
        } else {
            return false
        }
        fallthrough
    case StateHalfOpen:
        if b.halfOpenProbing { return false }
        b.halfOpenProbing = true
        return true
    }
    return false
}

func (b *Breaker) OnResult(ok bool) {
    b.mu.Lock(); defer b.mu.Unlock()
    if ok {
        b.failures = 0
        if b.state == StateHalfOpen { b.state = StateClosed }
        b.halfOpenProbing = false
        return
    }
    // fail
    if b.state == StateHalfOpen {
        b.state = StateOpen
        b.lastOpenedAt = time.Now()
        b.halfOpenProbing = false
        return
    }
    b.failures++
    if b.failures >= b.failThreshold {
        b.state = StateOpen
        b.lastOpenedAt = time.Now()
    }
}
\`\`\`

### 6.4 Lib có sẵn — \`sony/gobreaker\`

\`\`\`go
import "github.com/sony/gobreaker"

cb := gobreaker.NewCircuitBreaker(gobreaker.Settings{
    Name:        "downstream-payment",
    MaxRequests: 1,                          // probe count khi half-open
    Interval:    60 * time.Second,           // reset count interval
    Timeout:     10 * time.Second,           // cooldown từ Open → Half-Open
    ReadyToTrip: func(c gobreaker.Counts) bool {
        return c.ConsecutiveFailures >= 5 ||
            (c.Requests >= 20 && float64(c.TotalFailures)/float64(c.Requests) > 0.5)
    },
})

result, err := cb.Execute(func() (any, error) {
    return callPayment(ctx)
})
\`\`\`

\`gobreaker\` xử lý hết state machine, mình chỉ wrap function call.

> ❓ **Câu hỏi tự nhiên.**
>
> *"Threshold nên đặt bằng bao nhiêu?"* — Không có con số magic, nhưng:
> - **Consecutive failures**: 5-10. Quá thấp → flicky network 1-2 fail đã trip. Quá cao → mở mạch quá trễ, đã sập rồi mới phản ứng.
> - **Fail rate**: > 50% trong 20 request gần nhất. Quan trọng: đặt \`min_requests\` để tránh trip vì 1 fail / 1 request = 100%.
> - **Cooldown**: 10-30s. Bằng thời gian dự kiến downstream phục hồi.
>
> *"Circuit breaker có thay thế được retry không?"* — Không, chúng **bổ sung** nhau. Retry cho **lỗi tạm thời 1 request** (network blip). Circuit breaker cho **lỗi kéo dài của downstream** (service down). Có cả 2 → retry **bên trong** circuit breaker (mỗi request retry vài lần trước khi đếm là fail).

> ⚠ **Pitfall — circuit breaker không có timeout.** Circuit breaker chỉ count fail. Nếu mỗi call mất 30s vì kẹt connection, breaker không trip → 100 goroutine kẹt. **Luôn pair với context timeout:** \`ctx, cancel := context.WithTimeout(parent, 2*time.Second)\`.

> 📝 **Tóm tắt mục 6.**
> - 3 state: Closed (qua), Open (reject), Half-Open (probe).
> - Threshold: consecutive fail hoặc fail rate.
> - Pair với context timeout.
> - Lib: \`sony/gobreaker\` đơn giản, \`afex/hystrix-go\` nhiều feature nhưng đã ngừng maintain.

---

## 7. Bulkhead — isolation theo dependency

> 💡 **Trực giác.** Tàu container có **vách ngăn (bulkhead)**: nếu 1 khoang bị thủng, nước không lan ra cả tàu. Trong service: phân chia **connection pool / goroutine pool** theo dependency, để 1 downstream chậm không "hút" hết resource.

**Vấn đề.** Service gọi 5 downstream: payment, inventory, recommend, search, logs.

- Không bulkhead: 100 connection chung. Payment chậm → 100 request đợi → connection pool 100/100. Request khác (gọi search) cũng đứng vì pool đã cạn.
- Có bulkhead: mỗi dep 20 connection. Payment chậm → 20/20 payment pool full → request payment fail nhanh. Search vẫn có 20 connection riêng → search vẫn hoạt động.

**Implement Go đơn giản — semaphore per dep:**

\`\`\`go
type DepClient struct {
    sem  chan struct{}        // size = max concurrent
    name string
}

func (d *DepClient) Call(ctx context.Context, fn func() error) error {
    select {
    case d.sem <- struct{}{}:
        defer func() { <-d.sem }()
    case <-ctx.Done():
        return ctx.Err()
    default:
        return errors.New("bulkhead full: " + d.name)
    }
    return fn()
}
\`\`\`

\`default\` branch fail ngay nếu pool cạn (không block).

---

## 8. Hedged request — trade latency lấy gấp 2 cost

> 💡 **Trực giác.** Bạn gọi service A, đôi khi p99 = 2s vì 1 instance chậm. Trick: **đợi 500ms**, nếu chưa có response thì **gửi 1 request thứ 2 song song** (đến instance khác). Dùng cái nào về trước. p99 giảm xuống vì xác suất 2 instance cùng slow rất thấp.

**Trade-off:**
- Latency: p99 cải thiện 2-5×.
- Cost: trung bình +5-10% request (chỉ gửi hedge khi vượt 500ms).
- ⚠ **Pitfall**: nếu hedge threshold = 0 → mọi request gửi 2 bản → 2× load. Phải có threshold > median latency.

**Khi nào dùng:**
- Read-only operation (idempotent).
- Service phụ thuộc có p99 spike thường xuyên.
- Budget chấp nhận được 5-10% extra cost.

**Khi nào không dùng:**
- Write operation (gửi 2 lần = ghi 2 lần, sai dữ liệu).
- Cost-sensitive endpoint (vd gọi OpenAI \\$0.01/call).

---

## 9. Combine — phòng tuyến nhiều lớp

Một service production thực tế kết hợp **rate limit (input) + circuit breaker (output) + bulkhead (resource)**:

\`\`\`
Inbound:
  HTTP request
    → [Per-IP rate limit]     ← chống bot
    → [Per-user rate limit]   ← fair share
    → [Per-endpoint limit]    ← protect expensive endpoint
    → handler
        → [Bulkhead pool]     ← isolation per dep
            → [Circuit breaker per dep]   ← fail fast nếu dep sập
                → [Context timeout]       ← bound mỗi call
                    → downstream call

Outbound: ngược lại — caller bảo vệ mình khỏi downstream
\`\`\`

Không có pattern nào "đủ một mình". **Defense in depth** mới là production-grade.

---

## 10. Monitoring — phải đo được mới biết hiệu quả

Mọi rate limiter / circuit breaker phải expose metric:

| Metric | Mô tả | Alert khi |
|--------|-------|-----------|
| \`ratelimit_hit_total{endpoint,reason}\` | Counter, số request bị 429. | Tăng đột biến (>10×) → bot hoặc bug client. |
| \`ratelimit_remaining{user}\` | Gauge, còn bao nhiêu token. | < 10% thường xuyên → limit quá chặt. |
| \`circuit_state{name}\` | Gauge 0=Closed, 1=Open, 2=Half-Open. | Open kéo dài > 5 phút → downstream chết hẳn, cần on-call. |
| \`circuit_open_total{name}\` | Counter số lần trip. | Trip > 10 lần/giờ → flickering, threshold sai. |
| \`downstream_p99_ms{dep}\` | Latency p99 mỗi downstream. | > SLO → upstream sẽ trip CB. |

Prometheus + Grafana là combo phổ biến. Dashboard cần có 4 panel ở trên cho mỗi critical endpoint.

---

## 11. Common pitfall — checklist

| # | Pitfall | Hậu quả | Fix |
|---|---------|---------|-----|
| 1 | Per-IP cho mọi endpoint | NAT 1 IP 200 user bị limit chung | Per-user sau auth |
| 2 | Không có \`Retry-After\` | Client retry loop tăng load 100× | Trả \`Retry-After: N\` |
| 3 | Limit quá chặt | User thật bị block, support ticket ngập | A/B test, tăng dần |
| 4 | Limit quá lỏng | Không bảo vệ được gì | Set theo capacity downstream |
| 5 | Circuit breaker không có timeout | Block forever | Pair với \`context.WithTimeout\` |
| 6 | Hedged request threshold = 0 | 2× load lúc nào cũng vậy | threshold > median latency |
| 7 | Rate limit không reset khi service restart | User bị "treo" 1 window | Dùng Redis TTL, không lưu in-memory |
| 8 | Probe count Half-Open quá lớn | Lúc thử recovery vẫn flood downstream | \`MaxRequests = 1..3\` |
| 9 | Counter race condition (multi-instance, in-memory) | Limit rò gấp N lần | Dùng Redis hoặc atomic |
| 10 | Không monitor 429 rate | Không biết limit có đúng không | Dashboard + alert |

---

## 12. Bài tập

> Mọi bài đều có lời giải step-by-step ở mục [Lời giải chi tiết](#lời-giải-chi-tiết).

### BT1 — Token bucket Go thủ công

Implement struct \`TokenBucket\` không dùng \`golang.org/x/time/rate\`, có:
- \`NewTokenBucket(capacity int, refillRate float64) *TokenBucket\`
- \`Allow() bool\` — lazy refill, không goroutine.
- Concurrent-safe.

Viết test: gọi 10 lần liên tiếp \`b := NewTokenBucket(5, 2)\`, in \`Allow()\` cho mỗi giây.

### BT2 — Compare 4 thuật toán với scenario cố định

Scenario: limit 10 req/giây. Request đến tại các thời điểm: \`[0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2]\` (13 request).

Dự đoán bao nhiêu request được allow với mỗi thuật toán:
(a) Token bucket B=10, R=10/s.
(b) Leaky bucket B=10, R=10/s.
(c) Fixed window 1s, limit 10.
(d) Sliding window counter, limit 10.

### BT3 — Distributed rate limit với Redis Lua (pseudocode)

Viết pseudocode Lua script implement **sliding window counter** trong Redis: 1 key cho window hiện tại, 1 key cho window trước. Trả về \`{allowed, remaining, reset_ts}\`.

### BT4 — Circuit breaker state machine

Implement \`Breaker\` với 3 state. Viết unit test mô phỏng:
1. 5 success → vẫn Closed.
2. 5 fail liên tiếp → Open.
3. Trong Open, mọi \`Allow()\` return \`false\`.
4. Sau cooldown 1s + 1 probe success → Closed.
5. Sau cooldown + 1 probe fail → Open trở lại.

### BT5 — HTTP middleware rate limit per-user

Viết middleware \`RateLimitPerUser(limit int, window time.Duration) func(http.Handler) http.Handler\`. Extract \`userID\` từ \`ctx.Value("userID")\`. Nếu user vượt limit → 429 + \`Retry-After\`. Mỗi user 1 token bucket riêng (thread-safe).

### BT6 — Diagnose cascading failure

Bạn có 3 service: A → B → C. Symptom:
- C có DB query chậm bất thường (lock).
- B gọi C, default timeout = 30s.
- A gọi B, default timeout = 30s.
- A frontend trả 504 cho user.

**Câu hỏi:**
(a) Vì sao A trả 504 mà thực ra C mới có vấn đề?
(b) Đề xuất 3 thay đổi để A không sập kể cả khi C có vấn đề.

### BT7 — Pick algorithm

Cho 4 scenario, chọn rate limit algorithm phù hợp nhất (giải thích lý do):
1. Public API có tier free (10/giờ) và paid (1000/giờ).
2. Internal job queue gửi log lên ingest service (giới hạn 100 msg/s, không được drop, chỉ delay).
3. \`/login\` endpoint chống brute force.
4. Streaming endpoint trả file lớn, giới hạn bandwidth.

---

## Lời giải chi tiết

### Giải BT1 — Token bucket Go thủ công

**Cách tiếp cận: lazy refill.** Không chạy goroutine timer. Mỗi lần \`Allow()\` gọi, tính số token cần refill dựa trên elapsed time.

\`\`\`go
type TokenBucket struct {
    mu         sync.Mutex
    capacity   float64
    tokens     float64
    refillRate float64    // tokens per second
    lastRefill time.Time
}

func NewTokenBucket(capacity int, refillRate float64) *TokenBucket {
    return &TokenBucket{
        capacity:   float64(capacity),
        tokens:     float64(capacity),
        refillRate: refillRate,
        lastRefill: time.Now(),
    }
}

func (b *TokenBucket) Allow() bool {
    b.mu.Lock()
    defer b.mu.Unlock()
    now := time.Now()
    elapsed := now.Sub(b.lastRefill).Seconds()
    b.tokens = math.Min(b.capacity, b.tokens+elapsed*b.refillRate)
    b.lastRefill = now
    if b.tokens >= 1.0 {
        b.tokens -= 1.0
        return true
    }
    return false
}
\`\`\`

**Test mô phỏng:** \`NewTokenBucket(5, 2)\`. Gọi \`Allow()\` 3 lần mỗi giây trong 4 giây.

| Giây | Refill được | Tokens trước call 1 | Allow 1 | 2 | 3 | Tokens sau |
|------|-------------|---------------------|---------|---|---|------------|
| 0 | 0 | 5.0 | ✓ | ✓ | ✓ | 2.0 |
| 1 | +2 | 4.0 | ✓ | ✓ | ✗ | 2.0 (chỉ 2 trừ) |
| 2 | +2 | 4.0 | ✓ | ✓ | ✗ | 2.0 |
| 3 | +2 | 4.0 | ✓ | ✓ | ✗ | 2.0 |

Sau giây đầu burst, ổn định 2 allow / giây = đúng \`R=2\`.

**Độ phức tạp:** O(1) per \`Allow()\`. **Memory:** O(1) per bucket.

### Giải BT2 — So sánh 4 thuật toán

Limit 10/giây, 13 request tại t = \`0.0, 0.1, ..., 1.2\`.

**(a) Token bucket B=10, R=10/s.** Bắt đầu 10 token.
- t=0.0..0.9: 10 request, mỗi cái dùng 1 token. Trong 1s, refill = 1s × 10 = 10 token (nhưng cap = 10, chỉ chứa max 10). Đến t=0.9, đã có 0.9 × 10 = 9 token refill. Tokens sau t=0.9: 10 − 10 + 9 = 9.
  Walk chi tiết: tại mỗi step, refill = elapsed × 10.
  - t=0.0: tokens=10, allow, tokens→9.
  - t=0.1: refill 0.1×10=1, tokens=min(10, 9+1)=10, allow, tokens→9.
  - t=0.2: tokens=10, allow, tokens→9.
  - ... ổn định ở 9 sau allow.
  - t=1.0: tokens=10, allow, tokens→9.
  - t=1.1: tokens=10, allow, tokens→9.
  - t=1.2: tokens=10, allow, tokens→9.
  → **13/13 allow.** Token bucket không deny vì rate cấp đủ.

**(b) Leaky bucket B=10, R=10/s.** Queue rỗng ban đầu. 13 request đến trong 1.2s.
- Tại t=0.0, queue=0. Đẩy req#1 vào queue=1.
- Trong khoảng 0.0..1.0, drain 10 req. Queue luôn ≤ 10.
- Tại t=1.0, đã drain 10 req. Queue còn 1 (req#11 đến lúc 1.0 chưa drain xong). Thực tế phân tích từng instant:
  - t=0.0: in=1, out=0, queue=1.
  - t=0.1: in=1, drain 0.1×10=1, queue=1.
  - ... ổn định queue=1 mỗi step. Đến t=1.2, queue ≈ 1.
  → Tổng input = 13, drain trong 1.2s = 12. **Drop 1 nếu queue đầy.** Vì queue cap=10, không bị đầy → drop = 0. **13/13 allow** (nhưng latency biến thiên).

**(c) Fixed window 1s, limit 10.** Windows: \`[0, 1)\`, \`[1, 2)\`.
- t=0.0..0.9: 10 req trong window \`[0,1)\`. Count = 10. Cả 10 allow.
- t=1.0..1.2: 3 req trong window \`[1,2)\`. Count mới = 0 → 3 allow.
- → **13/13 allow.** Không thấy được boundary attack vì scenario này không exploit.

**(d) Sliding window counter limit 10.** Tại mỗi instant tính: \`count_current + count_prev × (1 - elapsed_in_current_window)\`.
- t=0.0..0.9: window hiện = \`[0,1)\`, prev = \`[-1, 0)\` count=0. Estimated = current. Mỗi allow tăng current. Sau 10 allow, current=10. Req thứ 11 (vẫn t<1) deny.
  - Thực tế trong 1s = 10 req → 10 allow.
- t=1.0: window mới \`[1,2)\`, prev = \`[0,1)\` count=10. elapsed = 0 → estimated = 0 + 10×(1−0) = **10** → req deny.
- t=1.1: elapsed = 0.1, estimated = 0 + 10×0.9 = **9** → allow, current=1.
- t=1.2: elapsed = 0.2, estimated = 1 + 10×0.8 = **9** → allow, current=2.
- → **12/13 allow** (deny 1 req tại t=1.0).

**Kết luận bảng:**

| Thuật toán | Allow | Deny |
|-----------|-------|------|
| Token bucket | 13 | 0 |
| Leaky bucket | 13 | 0 |
| Fixed window | 13 | 0 |
| Sliding counter | 12 | 1 |

Scenario này không phá fixed window vì request phân bố đều, không tập trung tại boundary. Để thấy bug fixed window: scenario \`0.99, 1.00, ..., 1.10\` sẽ allow 20 trong 0.11s.

### Giải BT3 — Sliding window counter Lua

\`\`\`lua
-- KEYS[1] = "rl:user:42"
-- ARGV[1] = limit
-- ARGV[2] = window_seconds (vd 60)
-- ARGV[3] = now_ms

local limit = tonumber(ARGV[1])
local window_ms = tonumber(ARGV[2]) * 1000
local now = tonumber(ARGV[3])

local current_window = math.floor(now / window_ms)
local elapsed_in_current = (now % window_ms) / window_ms

local key_curr = KEYS[1] .. ":" .. current_window
local key_prev = KEYS[1] .. ":" .. (current_window - 1)

local count_curr = tonumber(redis.call("GET", key_curr) or "0")
local count_prev = tonumber(redis.call("GET", key_prev) or "0")

local estimated = count_curr + count_prev * (1 - elapsed_in_current)

if estimated >= limit then
    local reset_ms = (current_window + 1) * window_ms
    return {0, 0, reset_ms}                  -- deny
end

redis.call("INCR", key_curr)
redis.call("EXPIRE", key_curr, math.ceil(window_ms / 1000) * 2)

local remaining = math.floor(limit - estimated - 1)
local reset_ms = (current_window + 1) * window_ms
return {1, remaining, reset_ms}              -- allow
\`\`\`

**Memory:** 2 key per user, mỗi key vài bytes. Cho 1M user = ~50MB Redis. Acceptable.

### Giải BT4 — Circuit breaker test

Đã viết struct ở mục 6.3. Test scenario:

\`\`\`go
b := &Breaker{failThreshold: 5, cooldown: 1 * time.Second}

// 1. 5 success
for i := 0; i < 5; i++ {
    assert.True(t, b.Allow())
    b.OnResult(true)
}
assert.Equal(t, StateClosed, b.state)

// 2. 5 fail → Open
for i := 0; i < 5; i++ {
    assert.True(t, b.Allow())                // Closed vẫn cho qua
    b.OnResult(false)
}
assert.Equal(t, StateOpen, b.state)

// 3. Open → reject
assert.False(t, b.Allow())

// 4. Cooldown rồi probe success → Closed
time.Sleep(1100 * time.Millisecond)
assert.True(t, b.Allow())                    // Half-Open probe
b.OnResult(true)
assert.Equal(t, StateClosed, b.state)

// 5. Trip lại → cooldown → probe fail → Open
for i := 0; i < 5; i++ { b.Allow(); b.OnResult(false) }
time.Sleep(1100 * time.Millisecond)
assert.True(t, b.Allow())
b.OnResult(false)
assert.Equal(t, StateOpen, b.state)
\`\`\`

Walk-through state machine với scenario này khớp 100%.

### Giải BT5 — Middleware per-user

\`\`\`go
type userLimiter struct {
    mu       sync.Mutex
    buckets  map[string]*TokenBucket
    capacity int
    rate     float64
}

func NewUserLimiter(limit int, window time.Duration) *userLimiter {
    return &userLimiter{
        buckets:  make(map[string]*TokenBucket),
        capacity: limit,
        rate:     float64(limit) / window.Seconds(),
    }
}

func (l *userLimiter) get(uid string) *TokenBucket {
    l.mu.Lock(); defer l.mu.Unlock()
    if b, ok := l.buckets[uid]; ok { return b }
    b := NewTokenBucket(l.capacity, l.rate)
    l.buckets[uid] = b
    return b
}

func (l *userLimiter) Middleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        uid, _ := r.Context().Value("userID").(string)
        if uid == "" { uid = "anonymous" }
        b := l.get(uid)
        if !b.Allow() {
            w.Header().Set("Retry-After",
                strconv.Itoa(int(1.0/l.rate)+1))
            w.Header().Set("X-RateLimit-Limit", strconv.Itoa(l.capacity))
            w.Header().Set("X-RateLimit-Remaining", "0")
            http.Error(w, \`{"error":"rate_limited"}\`,
                http.StatusTooManyRequests)
            return
        }
        next.ServeHTTP(w, r)
    })
}
\`\`\`

**Lưu ý:**
- \`buckets\` map grows mãi. Cần goroutine cleanup user không hoạt động > 1 giờ.
- Multi-instance → đổi map sang Redis.

### Giải BT6 — Diagnose cascading

**(a) Vì sao A trả 504?**

Chain timeout: A đợi B = 30s, B đợi C = 30s. Khi C lock 60s:
1. B gửi query tới C, đợi 30s, B timeout → B trả error cho A.
2. Nhưng nếu A đã đợi 30s trước → A timeout từ phía A (504 Gateway Timeout).
3. Trong lúc đó, B đã có 100 connection mới đến từ A khác cũng đợi C → connection pool A cạn → A từ chối request mới.
4. User thấy 504 vì A không trả kịp.

**Vấn đề thực:** A không **biết** C có vấn đề. Mỗi request mới của A vẫn cố gọi B → B vẫn cố gọi C → kẹt 30s. Trong 30s, A nhận thêm 1000 request → 1000 goroutine kẹt → A oom hoặc crash.

**(b) 3 thay đổi:**

1. **Context timeout ngắn hơn ở A:** \`ctx, cancel := context.WithTimeout(parent, 2*time.Second)\`. A cancel request sau 2s thay vì 30s → goroutine release nhanh, connection pool không cạn.

2. **Circuit breaker ở A bao quanh call tới B:** sau 5 fail liên tiếp (B trả error vì timeout với C), CB mở → A reject ngay không gọi B → fail fast. Trong 10s cooldown, A không gọi B → B có thời gian phục hồi. Sau cooldown probe 1 request → nếu C đã unlock, mọi thứ về Closed.

3. **Bulkhead ở A:** semaphore 50 concurrent call tới B. Khi B chậm, tối đa 50 goroutine A bị kẹt, còn lại fail nhanh hoặc đi đường khác. Goroutine khác của A vẫn xử lý request không liên quan tới B (vd cache hit).

**Bonus:** monitoring downstream p99 từ A. Khi p99 tăng đột biến → on-call → fix root cause ở C.

### Giải BT7 — Pick algorithm

1. **Public API tier free/paid.** → **Token bucket per-API-key** với capacity riêng cho mỗi tier. Lưu Redis (multi-instance). Cho phép burst tự nhiên (user dồn 10 call để fetch danh sách).

2. **Job queue gửi log, không drop, chỉ delay.** → **Leaky bucket**. Queue size = buffer chấp nhận được (vd 10k msg). Process rate = 100/s. Không drop, output đều = downstream ingest hài lòng.

3. **/login chống brute force.** → **Fixed window theo username + IP, limit 5/15-phút**. Đơn giản, đủ chặt. Boundary attack không nguy hiểm với password (5 tries trước, 5 tries sau = 10 tries / 15 phút, vẫn quá chậm để brute force). Combined với captcha sau 3 fail.

4. **Streaming file lớn, giới hạn bandwidth.** → **Token bucket với token = byte**. Vd 1MB/s = bucket cap 5MB, rate 1MB/s. Mỗi lần write N bytes, consume N token. Burst đầu (user kéo file) chấp nhận, sau ổn định 1MB/s.

---

## Code & Minh họa

- [\`solutions.go\`](./solutions.go) — Token bucket, leaky bucket, fixed window, circuit breaker, middleware per-IP. Biên dịch với Go 1.21+.
- [\`visualization.html\`](./visualization.html) — 3 module:
  1. **4-algorithm visualizer** — cùng 1 stream request, hiển thị state mỗi thuật toán đồng thời.
  2. **Circuit breaker state machine** — animate transition theo fail rate slider.
  3. **Cascading failure demo** — A→B→C, B down, so sánh có/không circuit breaker.

---

## Bài tiếp theo

→ [Lesson 53 — Mini-project: REST API](../lesson-53-mini-project-rest-api/README.md) — gộp toàn bộ Tier 4 (HTTP, validation, auth, rate limit, graceful shutdown) thành 1 service production-ready.

## Tham khảo

- [\`golang.org/x/time/rate\`](https://pkg.go.dev/golang.org/x/time/rate) — token bucket chuẩn.
- [\`sony/gobreaker\`](https://github.com/sony/gobreaker) — circuit breaker đơn giản, được dùng nhiều.
- [Stripe API rate limit doc](https://stripe.com/docs/rate-limits) — tham chiếu HTTP header convention.
- [Cloudflare blog — How we built rate limiting](https://blog.cloudflare.com/counting-things-a-lot-of-different-things/) — sliding window counter trên scale.
- [Microsoft Azure — Circuit Breaker pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker) — pattern catalog.
`;
