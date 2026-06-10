# Lesson 82 — Capstone: Design Doc cho URL Shortener có Analytics

> **Tier 8 — Capstone (1/3).** Đây là lesson **DESIGN PHASE**. Ba lesson Tier 8 (L82 design → L83 implement → L84 deploy & observe) cùng xây **một** dự án duy nhất: một dịch vụ rút gọn URL có thống kê lượt click, kiểu **bit.ly**. Lesson này không viết code production — nó viết **design doc**: requirements, API contract, capacity estimation, data model, kiến trúc, trade-off và ADR. Code thật ở L83.

## Mục tiêu học tập

Sau lesson này bạn sẽ:

- Viết được một **design doc** hoàn chỉnh cho một dịch vụ backend thật (không phải bài tập đồ chơi).
- Làm **capacity estimation** (back-of-envelope): từ số liệu nghiệp vụ → ước lượng storage, QPS, kích thước cache.
- Thiết kế **API contract** rõ ràng (method, path, request, response, status code, lỗi RFC 7807).
- Thiết kế **data model + index** đúng cho các query thực tế (lookup theo code, analytics theo ngày).
- Phân tích **read path vs write path** và tối ưu read path bằng cache-aside + async event.
- Viết **ADR (Architecture Decision Record)** — ghi lại quyết định kiến trúc và lý do.
- Phân tích **failure mode**: cái gì hỏng thì hệ thống behave thế nào.

## Kiến thức tiền đề

- [Lesson 43 — REST API Design](../lesson-43-rest-api-design/README.md) — contract, status code, RFC 7807.
- [Lesson 54 — SQL & database/sql](../lesson-54-sql-database-sql/README.md) — table, index.
- [Lesson 58 — Redis & Caching](../lesson-58-redis-caching/README.md) — cache-aside.
- [Lesson 64 — Message Queue (NATS/Kafka)](../lesson-64-message-queue-nats-kafka/README.md), [Lesson 65 — Event-Driven Architecture](../lesson-65-event-driven-architecture/README.md) — async event.
- [Lesson 79 — Clean Architecture](../lesson-79-clean-architecture-go/README.md) — domain/usecase/adapter.

---

## 1. Giới thiệu capstone — vì sao lại là URL shortener?

> 💡 **Trực giác / Hình dung.** Một URL shortener nghe có vẻ tầm thường: "biến link dài thành link ngắn, ai chẳng làm được". Nhưng nó là **bài toán phỏng vấn system design kinh điển** vì nó chạm vào **đúng mọi tier** bạn đã học, mà vẫn đủ nhỏ để hoàn thành trong 3 lesson. Hãy hình dung nó như một "phòng tập gym" cho backend engineer: một động tác đơn giản (squat / shorten URL) nhưng tập đúng thì kích hoạt toàn thân.

URL shortener làm 3 việc:

1. **Shorten** — nhận một URL dài (`https://example.com/very/long/path?utm=...`) → trả về một mã ngắn (`abc1234`) và link rút gọn (`https://sho.rt/abc1234`).
2. **Redirect** — khi ai đó truy cập `https://sho.rt/abc1234` → trả `302` chuyển hướng đến URL gốc.
3. **Analytics** — đếm lượt click, theo ngày, theo nguồn (referrer) cho mỗi mã.

Vì sao đây là capstone tốt:

| Tier đã học | Chạm vào ở chỗ nào trong URL shortener |
|-------------|----------------------------------------|
| Tier 4 (Web/REST) | API `POST /api/shorten`, `GET /{code}`, `GET /api/stats/{code}` |
| Tier 5 (Data) | Postgres lưu URL + click; **Redis cache** code→url cho read path |
| Tier 6 (Distributed) | **Queue** cho click event async; phân tích read/write path |
| Tier 7 (Production) | Structured log, Prometheus metrics, OTel tracing, Docker, K8s |

Nó **đủ phức tạp** (read-heavy, cần cache, cần async) để không bị "đồ chơi", nhưng **đủ nhỏ** (3 endpoint, 2 bảng) để hoàn thành thật sự — không bỏ dở giữa chừng. Đây chính là điều một portfolio piece tốt cần: **hoàn chỉnh và chạy được**, không phải "to mà dở dang".

> 📝 **Tóm tắt mục 1.**
> - Capstone = URL shortener có analytics, kiểu bit.ly.
> - 3 chức năng: shorten, redirect, analytics.
> - Chọn vì chạm đủ mọi tier nhưng vẫn hoàn thành được.

---

## 2. Requirements

Một design doc tốt **luôn bắt đầu từ requirements** — chia làm 2 loại: **functional** (hệ thống làm gì) và **non-functional** (làm tốt đến đâu). Bỏ qua bước này là sai lầm phổ biến nhất: bạn không thể thiết kế đúng nếu không biết "đúng" nghĩa là gì.

### 2.1 Functional requirements (hệ thống làm gì)

| # | Requirement | Mô tả |
|---|-------------|-------|
| F1 | Shorten | Nhận URL dài hợp lệ → trả mã ngắn duy nhất. |
| F2 | Redirect | `GET /{code}` → `302` đến URL gốc. |
| F3 | Track click | Mỗi redirect ghi nhận 1 click (thời điểm, referrer, user-agent, quốc gia IP). |
| F4 | Analytics | `GET /api/stats/{code}` → tổng click, click theo ngày, top referrer. |
| F5 | Validate input | URL phải hợp lệ (scheme http/https), chống abuse (rate limit). |

### 2.2 Non-functional requirements (làm tốt đến đâu)

> 💡 **Trực giác.** Non-functional requirement là "lời hứa về chất lượng". Nó biến những từ mơ hồ ("phải nhanh", "phải ổn định") thành **con số đo được**. Không có con số → không kiểm chứng được → cãi nhau vô tận.

| # | Requirement | Mục tiêu cụ thể | Vì sao |
|---|-------------|-----------------|--------|
| N1 | **Redirect latency** | p99 < **50ms** | Redirect là hot path — người dùng click rồi đợi. Chậm = bỏ đi. |
| N2 | **Uptime** | **99.9%** (≈ 43 phút downtime/tháng) | Link chết = mất uy tín; người ta đã share link đó khắp nơi. |
| N3 | **Scale read** | **10.000 req/s** đọc (redirect) | Read-heavy: tỉ lệ read:write ≈ 10:1. |
| N4 | **Durability** | URL không được mất | Mã đã phát ra phải redirect mãi mãi. |
| N5 | **Eventual analytics** | Analytics có thể trễ vài giây | Đếm click không cần realtime tuyệt đối → cho phép async. |

> ⚠ **Lỗi thường gặp.** Gộp chung tất cả thành "phải nhanh và ổn định". Phải tách: redirect cần **latency thấp** (N1), analytics chỉ cần **eventual** (N5). Hai yêu cầu này dẫn tới hai thiết kế khác nhau — redirect đi qua cache, analytics đi qua queue. Nếu coi chúng như nhau, bạn sẽ ghi click đồng bộ trong redirect → phá vỡ N1.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Vì sao N5 (analytics eventual) lại quan trọng cho thiết kế?
> 2. 99.9% uptime cho phép downtime bao nhiêu mỗi tháng?
> <details><summary>Đáp án</summary>
> 1. Vì nó cho phép xử lý click **async** (qua queue) → redirect không phải đợi ghi analytics → giữ được latency N1 < 50ms.
> 2. 99.9% = 0.1% downtime = 0.001 × 30 ngày × 24 × 60 ≈ **43.2 phút/tháng**.
> </details>

> 📝 **Tóm tắt mục 2.**
> - Functional: shorten, redirect, track click, analytics, validate.
> - Non-functional: redirect p99 < 50ms, 99.9% uptime, 10k req/s read, durable URL, eventual analytics.
> - Tách latency-critical (redirect) khỏi eventual (analytics) → quyết định kiến trúc.

---

## 3. API contract

> 💡 **Trực giác.** API contract là "hợp đồng" giữa client và server: client gửi đúng cái này, server hứa trả đúng cái kia. Viết contract **trước khi code** giúp frontend và backend làm song song, và tránh "à tưởng trả về field khác". Xem [Lesson 43 — REST API Design](../lesson-43-rest-api-design/README.md) cho nguyên tắc đặt status code và lỗi.

Lỗi dùng chuẩn **RFC 7807 — Problem Details** (`Content-Type: application/problem+json`):

```json
{
  "type": "https://sho.rt/errors/invalid-url",
  "title": "Invalid URL",
  "status": 400,
  "detail": "URL must start with http:// or https://",
  "instance": "/api/shorten"
}
```

### 3.1 `POST /api/shorten` — tạo mã ngắn

| Thuộc tính | Giá trị |
|------------|---------|
| Method | `POST` |
| Path | `/api/shorten` |
| Request body | `{"url": "https://example.com/very/long/path"}` |
| Success | `201 Created` |
| Response body | `{"code": "abc1234", "short_url": "https://sho.rt/abc1234"}` |

Lỗi:

| Status | Khi nào | `type` |
|--------|---------|--------|
| `400` | URL rỗng / sai scheme / quá dài | `invalid-url` |
| `429` | Vượt rate limit | `rate-limited` |
| `500` | Lỗi DB | `internal` |

### 3.2 `GET /{code}` — redirect (hot path)

| Thuộc tính | Giá trị |
|------------|---------|
| Method | `GET` |
| Path | `/{code}` (ví dụ `/abc1234`) |
| Request body | (không) |
| Success | `302 Found`, header `Location: <url gốc>` |
| Side-effect | **Emit click event ASYNC** — không block redirect |

Lỗi:

| Status | Khi nào |
|--------|---------|
| `404` | Mã không tồn tại |

> ⚠ **Lỗi thường gặp.** Ghi click **đồng bộ** ngay trong handler redirect (INSERT vào Postgres rồi mới trả 302). Mỗi click thêm 5–20ms ghi DB → phá vỡ N1 (p99 < 50ms) và làm redirect sập khi DB chậm. Đúng: emit event vào queue rồi trả 302 ngay (mục 11).

### 3.3 `GET /api/stats/{code}` — analytics

| Thuộc tính | Giá trị |
|------------|---------|
| Method | `GET` |
| Path | `/api/stats/{code}` |
| Success | `200 OK` |

Response body:

```json
{
  "code": "abc1234",
  "url": "https://example.com/very/long/path",
  "total_clicks": 1543,
  "clicks_by_day": [
    {"day": "2026-05-25", "count": 412},
    {"day": "2026-05-26", "count": 631},
    {"day": "2026-05-27", "count": 500}
  ],
  "top_referrers": [
    {"referrer": "twitter.com", "count": 800},
    {"referrer": "direct", "count": 500},
    {"referrer": "facebook.com", "count": 243}
  ]
}
```

Lỗi: `404` nếu mã không tồn tại.

> 📝 **Tóm tắt mục 3.**
> - 3 endpoint: shorten (POST, 201), redirect (GET, 302), stats (GET, 200).
> - Lỗi theo RFC 7807 (`application/problem+json`).
> - Redirect emit click **async** — không block.

---

## 4. Capacity estimation (back-of-envelope)

> 💡 **Trực giác.** "Back-of-envelope" = tính nhẩm trên mặt sau phong bì. Mục tiêu không phải con số chính xác đến từng byte, mà là **đúng cấp độ (order of magnitude)**: cần GB hay TB? 100 hay 100.000 req/s? Sai cấp độ → chọn sai công nghệ.

### 4.1 Giả thiết nghiệp vụ

| Đại lượng | Giá trị giả thiết |
|-----------|-------------------|
| Tổng URL lưu trữ | 100 triệu (100M) |
| Tỉ lệ read:write | 10:1 |
| QPS đọc (redirect) đỉnh | 10.000 req/s |
| Vòng đời URL | nhiều năm (durable) |

QPS ghi đỉnh = QPS đọc / 10 = **1.000 req/s**.

### 4.2 Walk-through tính storage

Mỗi hàng `urls` chiếm khoảng:

```
id (8)  +  code (7 ký tự ≈ 8 byte)  +  long_url (≈ 200 byte trung bình)
       +  created_at (8)  +  user_id (8)  +  overhead row/index (≈ 268)
≈ 500 byte / URL
```

Tổng storage cho URL:

```
100.000.000 URL × 500 byte
= 5 × 10^10 byte
= 50 GB
```

> Một con số **rất nhỏ** — 50GB lọt trên một SSD đơn lẻ. Kết luận quan trọng: bottleneck **không phải storage**, mà là **throughput đọc** (10k req/s) → đó là lý do ta cần cache, không phải sharding storage vội.

Clicks thì lớn hơn nhiều. Giả sử mỗi URL trung bình 50 click trong vòng đời, mỗi hàng `clicks` ≈ 100 byte:

```
100M URL × 50 click × 100 byte = 5 × 10^11 byte = 500 GB
```

→ Bảng `clicks` mới là chỗ phình to. Đây là lý do (mục 11) ta **aggregate** click rồi cân nhắc TTL/partition cho dữ liệu raw.

### 4.3 Short code length — base62

Mã ngắn dùng **base62** (`a–z`, `A–Z`, `0–9` = 62 ký tự). Với `n` ký tự, số mã khả dĩ là `62^n`:

| n (số ký tự) | Số mã `62^n` | Đủ cho 100M URL? |
|--------------|--------------|-------------------|
| 5 | 62^5 ≈ 916 triệu | Vừa khít, rủi ro |
| 6 | 62^6 ≈ 56,8 tỉ | Thoải mái |
| **7** | **62^7 ≈ 3,5 nghìn tỉ** | **Rất thoải mái (gấp ~35.000 lần)** |

Chọn **7 ký tự**: `62^7 = 3.521.614.606.208 ≈ 3,5 × 10^12`. Đủ chỗ cho 100M URL với headroom khổng lồ — ngay cả nếu tăng 1000 lần vẫn không cạn.

### 4.4 Cache size (nguyên lý Pareto 80/20)

> 💡 **Trực giác.** Traffic web tuân theo phân bố đuôi dài (long tail): một số ít URL "viral" hút phần lớn click, đa số URL gần như không ai click. Quy luật Pareto: **20% URL nóng nhất nhận ~80% traffic**.

Để bắt 80% traffic, ta cache 20% URL nóng:

```
20% × 100M = 20 triệu URL nóng cần cache
```

Mỗi entry cache (code → url) ≈ 100 byte (key 8 + value 200 + overhead). Vậy:

```
20.000.000 × 100 byte = 2 × 10^9 byte = 2 GB
```

→ **Chỉ 2GB RAM Redis** đủ cache 20M URL nóng và bắt ~80% traffic. Cache hit 80% nghĩa là chỉ 20% × 10k = **2.000 req/s** chạm Postgres — Postgres lo được dễ dàng.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao không cache hết 100M URL?"* → Tốn ~10GB RAM cho phần đuôi gần như không ai click — lãng phí. Cache nóng 20% là điểm cân bằng chi phí/hiệu quả.
> - *"Cache hit 80% thì 20% miss vẫn 2k req/s — Postgres chịu nổi không?"* → Có. Một Postgres tuned đọc theo index (mục 6) xử lý vài nghìn QPS điểm lookup dễ dàng; nếu cần thêm thì dùng read replica (mục 12).

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Với 7 ký tự base62, có bao nhiêu mã khả dĩ?
> 2. Cache 20% URL bắt được bao nhiêu % traffic, theo Pareto?
> <details><summary>Đáp án</summary>
> 1. `62^7 ≈ 3,5 nghìn tỉ`.
> 2. ~80% traffic.
> </details>

> 📝 **Tóm tắt mục 4.**
> - 100M URL → 50GB storage (nhỏ, không phải bottleneck).
> - Bottleneck thật là throughput đọc 10k req/s → cần cache.
> - Base62, 7 ký tự → 3,5 nghìn tỉ mã, đủ thoải mái.
> - Cache 20% URL nóng (~2GB) bắt ~80% traffic theo Pareto.

---

## 5. Short code generation — 3 cách và trade-off

> 💡 **Trực giác / Hình dung.** Mã ngắn giống như **biển số xe**: phải duy nhất (không hai xe trùng biển), đủ ngắn để đọc/gõ, và — tuỳ chính sách — có thể tuần tự (29A-001, 002, ...) hay ngẫu nhiên. Ba chiến lược dưới đây tương ứng đúng ba "chính sách cấp biển số" khác nhau: bốc số ngẫu nhiên, cấp theo thứ tự, hay suy ra từ đặc điểm chiếc xe.

Làm sao sinh mã ngắn duy nhất? Có 3 chiến lược chính.

### 5.1 Cách A — Random + check collision

Sinh ngẫu nhiên 7 ký tự base62, kiểm tra DB xem đã tồn tại chưa; trùng thì sinh lại.

- **Ưu**: đơn giản, mã không đoán được (không lộ thứ tự / số lượng URL).
- **Nhược**: cần một round-trip DB để check collision mỗi lần ghi. Khi không gian gần đầy thì xác suất trùng tăng (nhưng với 7 ký tự còn rất xa).

### 5.2 Cách B — Counter + base62 (encode số đếm)

Một bộ đếm tăng dần (1, 2, 3, ...) → encode sang base62. ID `12345` → `"3d7"`.

- **Ưu**: **không bao giờ trùng** (counter là duy nhất), không cần check collision → ghi nhanh.
- **Nhược**: mã **đoán được** (tuần tự) → lộ số lượng URL, dễ bị scan. Counter là single point → cần phân tán (range allocation / Snowflake-like).

### 5.3 Cách C — Hash(url) + truncate

Băm URL (vd SHA-256) rồi lấy 7 ký tự đầu encode base62.

- **Ưu**: cùng URL → cùng mã (idempotent), không cần lưu mapping ngược.
- **Nhược**: **truncate → collision** (hai URL khác nhau ra cùng 7 ký tự) → vẫn phải check + xử lý. Không cho phép cùng URL có nhiều mã khác nhau (đôi khi là yêu cầu nghiệp vụ).

### 5.4 So sánh & lựa chọn

| Tiêu chí | A. Random | B. Counter+base62 | C. Hash+truncate |
|----------|:---------:|:-----------------:|:----------------:|
| Đảm bảo unique | Cần check | **Có sẵn** | Cần check |
| Round-trip DB khi ghi | 1 (check) | 0 | 1 (check) |
| Mã đoán được | Không | **Có (xấu)** | Không |
| Single point (counter) | Không | **Có** | Không |
| Idempotent (cùng url→cùng mã) | Không | Không | **Có** |

**Quyết định**: chọn **Random + check collision (Cách A)** cho capstone.

Lý do: với `62^7 = 3,5 nghìn tỉ` mã và chỉ 100M URL (mật độ ≈ 0,003%), xác suất trùng cực thấp → hầu như không cần retry; mã **không đoán được** (an toàn hơn counter); không cần hạ tầng counter phân tán. Đơn giản, an toàn, đủ tốt. (Counter+base62 là lựa chọn tốt khi cần throughput ghi cực cao và chấp nhận mã tuần tự — ghi nhận trong ADR mục 14.)

> ⚠ **Lỗi thường gặp (toy vs real).** Đừng nhầm "random 7 ký tự" với "không bao giờ trùng". Vẫn **bắt buộc** có unique index trên cột `code` (mục 6) và xử lý lỗi unique-violation bằng cách sinh lại — đây là lưới an toàn. Bỏ index = một ngày đẹp trời hai URL trùng mã, một người bị redirect sai chỗ.

> 📝 **Tóm tắt mục 5.**
> - 3 cách: random+check, counter+base62, hash+truncate.
> - Chọn **random+check**: mã không đoán được, không cần counter phân tán, va chạm cực hiếm.
> - Luôn có unique index trên `code` làm lưới an toàn.

---

## 6. Data model

### 6.1 Bảng `urls`

```sql
CREATE TABLE urls (
    id          BIGSERIAL PRIMARY KEY,
    code        VARCHAR(16) NOT NULL,
    long_url    TEXT        NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    user_id     BIGINT
);
CREATE UNIQUE INDEX idx_urls_code ON urls (code);
```

- `code` có **unique index** → vừa đảm bảo không trùng, vừa cho lookup `WHERE code = ?` cực nhanh ($O(\log n)$ qua B-tree). Đây là index quan trọng nhất của hệ thống vì hot path (redirect) chỉ làm đúng query này.

### 6.2 Bảng `clicks`

```sql
CREATE TABLE clicks (
    id          BIGSERIAL PRIMARY KEY,
    url_code    VARCHAR(16) NOT NULL,
    clicked_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    referrer    TEXT,
    user_agent  TEXT,
    ip_country  VARCHAR(2)
);
CREATE INDEX idx_clicks_code_day ON clicks (url_code, clicked_at);
```

- `idx_clicks_code_day` trên `(url_code, clicked_at)` phục vụ truy vấn analytics: "lấy click của code X trong khoảng ngày Y–Z". Composite index theo đúng thứ tự cột query (equality `url_code` trước, range `clicked_at` sau).

> 💡 **Trực giác về thứ tự cột composite index.** Hình dung index như danh bạ điện thoại sắp theo (Họ, Tên). Tìm "tất cả người họ Nguyễn sinh năm 2000" thì lọc Họ trước (equality) rồi Tên/năm (range) cực nhanh. Đảo thứ tự (Tên, Họ) thì lọc "họ Nguyễn" phải quét toàn bộ. Vì vậy: **cột equality trước, cột range sau**.

### 6.3 (Tuỳ chọn) bảng aggregate `click_daily`

Vì bảng `clicks` phình to 500GB (mục 4.2), analytics worker (mục 11) aggregate sẵn theo ngày để query stats nhanh, không phải `COUNT(*)` trên hàng trăm triệu hàng:

```sql
CREATE TABLE click_daily (
    url_code  VARCHAR(16) NOT NULL,
    day       DATE        NOT NULL,
    referrer  TEXT        NOT NULL DEFAULT 'direct',
    count     BIGINT      NOT NULL DEFAULT 0,
    PRIMARY KEY (url_code, day, referrer)
);
```

> ❓ **Câu hỏi tự nhiên.** *"Sao không query trực tiếp bảng clicks?"* → `SELECT count(*) ... WHERE url_code=X GROUP BY day` trên 500GB bảng raw mỗi lần mở stats sẽ chậm và đốt CPU. Aggregate sẵn theo ngày (`click_daily`) biến nó thành đọc vài chục hàng → nhanh, rẻ. Đây là pattern read-model (gần với CQRS — [Lesson 67](../lesson-67-cqrs-event-sourcing/README.md)).

> 📝 **Tóm tắt mục 6.**
> - `urls`: unique index trên `code` (hot path lookup).
> - `clicks`: composite index `(url_code, clicked_at)` cho analytics theo ngày.
> - `click_daily`: bảng aggregate cho stats nhanh, tránh COUNT trên bảng raw khổng lồ.

---

## 7. Architecture diagram

```
                  ┌──────────┐
                  │  Client  │  (browser / curl / app)
                  └────┬─────┘
                       │ HTTP
              ┌────────▼─────────┐
              │   API Gateway /   │  (ingress, TLS, rate limit)
              │   Load Balancer   │
              └────────┬─────────┘
                       │
        ┌──────────────▼───────────────┐
        │     URL Shortener Service      │  (stateless, scale ngang)
        │  ┌──────────────────────────┐ │
        │  │  Adapter (HTTP handler)   │ │   ← clean arch (L79)
        │  ├──────────────────────────┤ │
        │  │  Usecase (shorten/redirect│ │
        │  │           /stats)         │ │
        │  ├──────────────────────────┤ │
        │  │  Domain (URL, Click)      │ │
        │  └──────────────────────────┘ │
        └───┬───────────┬───────────┬───┘
            │           │           │
   read/write│   cache  │     emit  │ click event
            │           │           │
     ┌──────▼────┐ ┌────▼────┐ ┌────▼─────┐
     │ Postgres  │ │  Redis  │ │  Queue   │
     │ urls,     │ │ code→url│ │ (NATS/   │
     │ clicks    │ │ ratelmt │ │  Kafka)  │
     └──────▲────┘ └─────────┘ └────┬─────┘
            │                       │ consume
            │   aggregate (UPSERT)  │
            │                  ┌────▼──────────┐
            └──────────────────┤ Analytics      │
                               │ Worker         │
                               └────────────────┘
```

Luồng chính:
- **Write (shorten)**: Client → Service → Postgres (+ optional pre-warm Redis).
- **Read (redirect)**: Client → Service → Redis (hit → trả ngay) / miss → Postgres → populate Redis → trả; song song **emit click event** vào Queue.
- **Analytics**: Worker consume click event → UPSERT `click_daily` trong Postgres.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao Service và Worker tách riêng?"* → Service phục vụ request đồng bộ (latency-critical); Worker xử lý nền (eventual). Tách ra để **scale độc lập** — spike redirect không làm chậm aggregate và ngược lại. Cùng codebase Go, deploy thành hai loại process/pod.
> - *"Mũi tên nét đứt từ Queue về Worker nghĩa là gì?"* → Đó là kênh **async** (publish/subscribe). Khác với mũi tên liền (gọi đồng bộ, đợi kết quả), nét đứt nghĩa "đẩy đi rồi quên" — redirect không chờ Worker xử lý xong.

> 📝 **Tóm tắt mục 7.** Client → Gateway → Service (clean arch). Service nói chuyện với Postgres (durable), Redis (cache hot path), Queue (click async). Worker consume Queue → aggregate `click_daily`. Đường async (nét đứt) tách hot path khỏi analytics.

---

## 8. Component breakdown

### 8.1 Shorten Service (write path)
- Nhận `POST /api/shorten`, validate URL, rate-limit (Redis).
- Sinh mã (random 7 ký tự base62, mục 5).
- INSERT vào `urls`; nếu unique-violation → sinh lại.
- (Tuỳ chọn) pre-warm cache: set `code→url` vào Redis.

### 8.2 Redirect Service (read path)
- Nhận `GET /{code}`.
- **Cache-first**: GET `code` từ Redis. Hit → trả `302` ngay. Miss → đọc Postgres → populate Redis (TTL) → trả `302`.
- **Emit click event ASYNC** vào Queue (không block 302).

### 8.3 Analytics Service (worker)
- Consume click event từ Queue.
- Lookup quốc gia từ IP (GeoIP), parse referrer.
- UPSERT vào `click_daily` (`count = count + 1`).
- Phục vụ `GET /api/stats/{code}` bằng cách đọc `click_daily`.

> 📝 **Tóm tắt mục 8.** 3 component: Shorten (write), Redirect (read, cache-first + async click), Analytics (worker aggregate). Service là stateless; state nằm ở Postgres/Redis/Queue.

---

## 9. Read path optimization — cache-aside + async click

> 💡 **Trực giác.** Read path (redirect) là chỗ nóng nhất: 10k req/s, p99 < 50ms. Mọi tối ưu dồn vào đây. Hai ý tưởng cốt lõi: (1) **cache-aside** — hỏi Redis trước, chỉ chạm Postgres khi miss; (2) **async click** — ghi analytics qua queue, không bắt redirect đợi.

### 9.1 Cache-aside (xem [Lesson 58](../lesson-58-redis-caching/README.md))

```
redirect(code):
    url = redis.GET(code)
    if url != nil:                 # CACHE HIT (đường nhanh, ~1ms)
        emit_click_async(code, req)
        return 302 -> url
    # CACHE MISS (đường chậm)
    url = postgres.SELECT long_url WHERE code = ?    # ~5-10ms
    if url == nil:
        return 404
    redis.SET(code, url, TTL=24h)  # populate cho lần sau
    emit_click_async(code, req)
    return 302 -> url
```

- **Cache hit (~80% req)**: chỉ 1 lần đọc Redis (~1ms) → trả 302. Cực nhanh, thừa sức đạt p99 < 50ms.
- **Cache miss (~20%)**: đọc Postgres theo unique index (~5–10ms) rồi populate. Lần sau cùng code sẽ hit.

### 9.2 Async click emit (không block redirect)

`emit_click_async` chỉ **đẩy một message vào queue** (publish ~0,1ms) rồi trả ngay, **không** chờ Postgres ghi. Ghi thật do worker làm sau (mục 11).

> ⚠ **Lỗi thường gặp.** Gọi `INSERT INTO clicks` đồng bộ trong redirect. Khi Postgres tải nặng, mỗi insert 20–50ms → redirect p99 vọt lên, vi phạm N1, và nếu Postgres ghi sập thì **redirect cũng sập** (dù chỉ là để đếm click!). Đúng: tách hẳn — redirect không phụ thuộc đường ghi analytics.

> 🔁 **Dừng lại tự kiểm tra.** Cache hit thì redirect chạm những hệ thống nào? <details><summary>Đáp án</summary>Chỉ Redis (đọc url) + Queue (publish click). KHÔNG chạm Postgres. Đó là vì sao nó nhanh.</details>

> 📝 **Tóm tắt mục 9.** Read path = cache-aside (Redis trước, Postgres khi miss rồi populate) + emit click async (publish queue, không block). Hit path chỉ chạm Redis + Queue.

---

## 10. Write path

```
shorten(url):
    validate(url)                       # scheme http/https, độ dài
    check_rate_limit(client_ip)         # Redis INCR + TTL
    for attempt in 1..N:
        code = random_base62(7)
        err = postgres.INSERT urls(code, url)
        if err is unique_violation:     # cực hiếm
            continue                    # sinh mã khác
        break
    redis.SET(code, url, TTL=24h)       # (tuỳ chọn) pre-warm cache
    return 201 {code, short_url}
```

- **Pre-warm cache** hữu ích khi URL vừa tạo có khả năng được click ngay (vd share lên mạng xã hội). Không bắt buộc — cache-aside ở read path sẽ tự populate ở lần đọc đầu.

> 📝 **Tóm tắt mục 10.** Write = validate → rate-limit → sinh mã → INSERT (retry nếu trùng) → optional pre-warm cache → 201.

---

## 11. Async analytics

> 💡 **Trực giác.** Tách "đếm click" khỏi "trả redirect" giống như nhà hàng: bồi bàn (redirect) đưa món ra cho khách ngay, còn việc ghi sổ doanh thu (analytics) để kế toán (worker) làm sau. Khách không phải đợi kế toán ghi xong mới được ăn.

Luồng (xem [Lesson 64](../lesson-64-message-queue-nats-kafka/README.md), [Lesson 65](../lesson-65-event-driven-architecture/README.md)):

```
redirect handler ──publish──> [ Queue ] ──consume──> Analytics Worker
   (ClickEvent: code, ts,                              UPSERT click_daily
    referrer, ua, ip)                                  SET count = count + 1
```

`ClickEvent` = `{code, clicked_at, referrer, user_agent, ip}`.

### 11.1 Vì sao async?

| Đồng bộ (INSERT trong redirect) | Async (publish queue) |
|---------------------------------|------------------------|
| Redirect đợi Postgres ghi (5–50ms) | Redirect chỉ publish (~0,1ms) |
| DB chậm → redirect chậm | DB chậm → chỉ worker chậm, redirect vẫn nhanh |
| DB sập → redirect sập | DB sập → click queue lại, redirect vẫn chạy |
| Khó scale ghi | Worker scale độc lập; queue buffer spike |

→ Async giữ được N1 (latency) và N2 (uptime) cho hot path.

### 11.2 Worker aggregate
Worker đọc batch event, UPSERT vào `click_daily` (`INSERT ... ON CONFLICT DO UPDATE count = count + 1`). Có thể batch nhiều event của cùng (code, day, referrer) để giảm số UPSERT.

> 📝 **Tóm tắt mục 11.** Click event → queue → worker UPSERT `click_daily`. Async vì redirect không được đợi/không được phụ thuộc đường ghi analytics.

---

## 12. Scaling strategy

| Thành phần | Cách scale |
|------------|------------|
| **API service** | **Stateless** → scale ngang (thêm pod). Không giữ session trong process. |
| **Postgres (read)** | Read replica cho query đọc; primary cho ghi. Cache hấp thụ phần lớn read trước khi chạm DB. |
| **Redis** | Redis Cluster (sharding theo key) khi vượt RAM/throughput một node. |
| **Queue** | Partition theo `code` → nhiều worker consume song song. |
| **Analytics worker** | Scale ngang theo số partition. |

> 💡 **Trực giác về "stateless".** Nếu mỗi pod tự nhớ thứ gì đó (session, counter local) thì không thể tự do thêm/bớt pod — request phải về đúng pod cũ. Đẩy hết state ra Postgres/Redis/Queue → mọi pod như nhau → load balancer rải request thoải mái, thêm pod là tăng throughput tuyến tính.

> 📝 **Tóm tắt mục 12.** Service stateless → scale ngang; Postgres read replica; Redis cluster; queue partition + worker song song.

---

## 13. Failure modes

> 💡 **Trực giác.** Thiết kế tốt không phải "khi mọi thứ chạy", mà "khi cái gì đó hỏng thì degrade ra sao". Liệt kê trước → không bị bất ngờ lúc 3h sáng.

| Hỏng cái gì | Hành vi hệ thống | Mức độ |
|-------------|------------------|--------|
| **Redis down** | Cache-aside fallback → đọc thẳng Postgres. Redirect vẫn chạy nhưng chậm hơn (5–10ms thay vì 1ms) và Postgres tải nặng hơn. Rate limit có thể tạm fail-open. | Degrade, không sập |
| **Queue backlog** (worker không kịp) | Click event tồn đọng → analytics trễ. Có thể **sample/drop** một phần event nếu backlog quá lớn (analytics là eventual — N5). Redirect KHÔNG ảnh hưởng. | Degrade analytics |
| **Postgres primary down** | Đọc: cache hit vẫn redirect được; cache miss → 503/404. Ghi (shorten + worker aggregate) **fail**. URL mới không tạo được tạm thời. | Read một phần OK, write fail |
| **API pod chết** | LB route sang pod khác (stateless). Không mất dữ liệu. | Tự phục hồi |

> ⚠ **Lỗi thường gặp.** Coi "Redis down" là thảm hoạ. Vì cache-aside có **fallback Postgres**, Redis down chỉ làm chậm chứ không sập — miễn là code đọc Postgres khi Redis lỗi (không panic, không trả 500 mù quáng). Phải test fallback path này (BT5).

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Trong các failure mode trên, cái nào làm **redirect** (đọc) ngừng hẳn?
> 2. Vì sao "queue backlog" chỉ ảnh hưởng analytics mà không ảnh hưởng redirect?
> <details><summary>Đáp án</summary>
> 1. Không cái nào làm redirect ngừng hoàn toàn cho URL **nóng**: Redis down → fallback Postgres; Postgres down → cache hit vẫn redirect được (chỉ cache miss mới fail). Redirect chỉ thực sự fail khi **cả Redis lẫn Postgres** đều không trả được url.
> 2. Vì redirect chỉ **publish** event vào queue rồi trả 302; nó không đọc/đợi gì từ queue. Backlog chỉ làm việc *consume* (Worker → aggregate) trễ, tức số liệu stats cập nhật chậm — đúng tinh thần "analytics eventual" (N5).
> </details>

> 📝 **Tóm tắt mục 13.** Redis down → fallback Postgres (chậm hơn). Queue backlog → sample/drop, analytics trễ. Postgres down → read từ cache, write fail. API pod chết → LB tự route.

---

## 14. Trade-offs & ADR (Architecture Decision Records)

> 💡 **Trực giác.** ADR là "nhật ký quyết định": ghi lại **đã chọn gì, vì sao, đánh đổi gì**. 6 tháng sau ai đó hỏi "sao không dùng X?" → mở ADR ra, không phải họp lại từ đầu.

### ADR-001 — Short code: chọn Random+check thay vì Counter+base62
- **Context**: cần sinh mã ngắn unique.
- **Quyết định**: Random 7 ký tự base62 + unique index check.
- **Lý do**: không gian mã khổng lồ (3,5 nghìn tỉ) → va chạm cực hiếm; mã không đoán được (an toàn); không cần hạ tầng counter phân tán.
- **Đánh đổi**: chấp nhận hiếm khi phải retry insert; bỏ qua throughput ghi tối đa của counter.

### ADR-002 — Cache: cache-aside thay vì write-through
- **Context**: cần cache code→url cho read path.
- **Quyết định**: cache-aside (lazy populate khi đọc), TTL 24h.
- **Lý do**: đơn giản; chỉ cache cái thực sự được đọc (hot 20%); URL gần như immutable nên ít lo stale.
- **Đánh đổi**: lần đọc đầu sau miss chậm hơn (đọc DB rồi populate).

### ADR-003 — Analytics: async (queue) thay vì sync (insert trong redirect)
- **Context**: cần ghi click cho mỗi redirect.
- **Quyết định**: emit click event vào queue, worker aggregate async.
- **Lý do**: giữ redirect latency p99 < 50ms (N1) và uptime (N2); analytics chỉ cần eventual (N5).
- **Đánh đổi**: analytics trễ vài giây; thêm hạ tầng queue + worker; có thể mất một ít event nếu drop khi backlog.

### ADR-004 — Storage: SQL (Postgres) thay vì NoSQL
- **Context**: lưu urls + clicks.
- **Quyết định**: Postgres.
- **Lý do**: query có cấu trúc (lookup theo code, aggregate theo ngày/referrer); unique constraint sẵn cho code; 50GB nằm gọn 1 node, chưa cần horizontal scale của NoSQL; team quen SQL.
- **Đánh đổi**: nếu sau này write click cực lớn vượt 1 node, sẽ cân nhắc NoSQL/columnar cho riêng bảng clicks (ghi nhận để xem lại).

> 📝 **Tóm tắt mục 14.** 4 ADR: random code, cache-aside, async analytics, Postgres. Mỗi quyết định kèm lý do + đánh đổi.

---

## 15. Tech stack

| Công nghệ | Dùng làm gì | Vì sao chọn |
|-----------|-------------|-------------|
| **Go** | Toàn bộ service + worker | Concurrency (goroutine) hợp cho I/O-bound redirect; binary nhỏ, deploy gọn; cả lộ trình đã học Go. |
| **Postgres** | Lưu urls, clicks, click_daily | SQL có cấu trúc, unique index, ACID; xem ADR-004. |
| **Redis** | Cache code→url; rate limit | In-memory, sub-ms; cấu trúc INCR/EXPIRE tiện cho rate limit. |
| **NATS / Kafka** | Queue click event | Async decouple redirect ↔ analytics; buffer spike. |
| **Prometheus** | Metrics (QPS, latency, cache hit) | Chuẩn de-facto; pull model hợp K8s ([L73](../lesson-73-metrics-prometheus/README.md)). |
| **OpenTelemetry** | Distributed tracing | Trace request xuyên service→cache→queue ([L74](../lesson-74-tracing-opentelemetry/README.md)). |
| **Docker** | Đóng gói (multi-stage) | Image nhỏ, reproducible ([L75](../lesson-75-docker-multistage/README.md)). |
| **Kubernetes (kind)** | Orchestration | Scale ngang, self-heal, deploy local bằng kind ([L76](../lesson-76-kubernetes-basics/README.md)). |

---

## 16. Roadmap — 3 lesson Tier 8

| Lesson | Phase | Nội dung |
|--------|-------|----------|
| **L82 (lesson này)** | **Design** | Design doc: requirements, API, capacity, data model, kiến trúc, ADR. |
| [L83 — Implement](../lesson-83-capstone-implement/README.md) | Implement | Code thật: REST API + Postgres + Redis cache + async click queue + clean architecture + tests. |
| [L84 — Deploy & Observe](../lesson-84-capstone-deploy-observe/README.md) | Deploy | Docker multi-stage + K8s (kind) + slog + Prometheus + OTel + load test + runbook. |

`solutions.go` của lesson này chỉ là **domain types + interface skeleton** (chưa impl) để L83 hiện thực hoá — đúng tinh thần design phase.

---

## Bài tập

> Làm trước, xem lời giải sau. Toàn bộ là bài tập **thiết kế** (không cần code chạy), trừ phần tính toán.

- **BT1 — Capacity.** Tính lại storage cho **1 tỉ (1B)** URL (giữ ~500 byte/URL). Và tính cache size cần thiết để đạt **90% hit** (giả định 30% URL nóng bắt 90% traffic, ~100 byte/entry).
- **BT2 — Short code.** So sánh 3 chiến lược sinh mã (random, counter+base62, hash+truncate). Chọn một và justify cho kịch bản "throughput ghi rất cao, chấp nhận mã đoán được".
- **BT3 — Data model.** Thiết kế bảng + index để trả lời query: *"top 10 referrer của code X trong 7 ngày gần nhất"*. Viết câu SQL.
- **BT4 — Async analytics.** Vì sao ghi click async thay vì đồng bộ? Tính latency tiết kiệm cho 1 redirect nếu insert đồng bộ tốn 20ms còn publish queue tốn 0,2ms.
- **BT5 — Failure mode.** Redis sập giữa giờ cao điểm (10k req/s). Mô tả hành vi hệ thống từng bước và đề xuất biện pháp giảm thiệt hại.

---

## Lời giải chi tiết

### Lời giải BT1 — Capacity cho 1B URL + cache 90% hit

**Storage cho 1B URL:**

```
1.000.000.000 URL × 500 byte
= 5 × 10^11 byte
= 500 GB
```

Gấp 10 lần so với 100M (50GB) — hợp lý vì gấp 10 lần số URL. 500GB vẫn nằm trong tầm một node Postgres lớn (hoặc bắt đầu cân nhắc partition).

**Cache cho 90% hit** (30% URL nóng bắt 90% traffic, 100 byte/entry):

```
URL cần cache = 30% × 1B = 300.000.000 entry
Cache size    = 300.000.000 × 100 byte
              = 3 × 10^10 byte
              = 30 GB
```

→ Cần ~30GB RAM Redis (1 node lớn hoặc Redis Cluster vài node) để đạt 90% hit. Nhận xét: tăng hit rate từ 80%→90% đắt hơn nhiều (phải cache 30% thay vì 20% URL) — đường cong lợi ích giảm dần (diminishing returns).

---

### Lời giải BT2 — So sánh & chọn cho "ghi cực cao, chấp nhận đoán được"

Bảng so sánh (tóm lại từ mục 5.4):

| | Random+check | Counter+base62 | Hash+truncate |
|--|:--:|:--:|:--:|
| Round-trip DB khi ghi | 1 | **0** | 1 |
| Unique đảm bảo | check | **sẵn** | check |
| Đoán được | không | có | không |

**Chọn: Counter + base62.**

Justify: yêu cầu là **throughput ghi rất cao** và **chấp nhận mã đoán được**. Counter+base62:
- **0 round-trip check** khi ghi (counter đảm bảo unique sẵn) → nhanh nhất cho ghi.
- Mã tuần tự "đoán được" — nhưng đề bài đã chấp nhận → nhược điểm này bị vô hiệu.

Để counter không thành single point dưới tải ghi cao: dùng **range allocation** — mỗi instance xin trước một dải (vd 1.000.000 số) từ một central allocator, rồi cấp phát local; chỉ chạm allocator khi hết dải. Hoặc dùng ID kiểu Snowflake (timestamp + machine id + sequence) rồi encode base62.

---

### Lời giải BT3 — Data model + index cho "top 10 referrer của code X trong 7 ngày"

Dùng bảng aggregate `click_daily` (mục 6.3): `(url_code, day, referrer, count)`.

Index phục vụ query (lọc theo code + range ngày, gom theo referrer):

```sql
CREATE INDEX idx_click_daily_code_day
    ON click_daily (url_code, day);
```

Câu query:

```sql
SELECT referrer, SUM(count) AS clicks
FROM click_daily
WHERE url_code = $1
  AND day >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY referrer
ORDER BY clicks DESC
LIMIT 10;
```

Giải thích:
- `WHERE url_code = $1` (equality) → khớp tiền tố index → quét nhanh.
- `day >= ...` (range) → cột thứ hai trong composite index → tiếp tục lọc trên cùng đường quét.
- `GROUP BY referrer` + `SUM(count)` → gom các ngày/dòng của cùng referrer.
- `ORDER BY clicks DESC LIMIT 10` → top 10.

Vì đọc trên bảng đã aggregate (vài chục–trăm hàng cho 1 code trong 7 ngày), query này cực nhẹ — không phải `COUNT(*)` trên bảng `clicks` raw 500GB. Nếu chỉ có bảng `clicks` raw, sẽ cần index `(url_code, clicked_at)` và GROUP BY trên referrer — đúng nhưng nặng hơn nhiều.

---

### Lời giải BT4 — Vì sao async + tính latency tiết kiệm

**Vì sao async** (xem mục 11.1): redirect là hot path latency-critical (N1 < 50ms) và analytics chỉ cần eventual (N5). Ghi đồng bộ làm redirect (a) chậm theo độ chậm của DB và (b) **phụ thuộc** vào DB ghi — DB sập thì redirect sập dù chỉ để đếm click. Async decouple hai mối lo này: redirect chỉ publish, worker ghi sau.

**Latency tiết kiệm cho 1 redirect:**

```
Đồng bộ:  redirect phải đợi INSERT = 20 ms
Async:    redirect chỉ publish      = 0,2 ms
Tiết kiệm = 20 - 0,2 = 19,8 ms / redirect
```

Với cache hit ~1ms, ghi đồng bộ 20ms sẽ **biến redirect 1ms thành 21ms** — gấp 21 lần, dễ đẩy p99 vượt 50ms khi DB tải nặng. Ở 10k req/s, 19,8ms × 10.000 = tiết kiệm **198 giây xử lý CPU/đợi I/O mỗi giây** trên hot path — khác biệt sống còn.

---

### Lời giải BT5 — Redis sập giữa peak 10k req/s

Hành vi từng bước (nhờ cache-aside có fallback — mục 9, 13):

1. **Ngay khi Redis sập**: mọi `redis.GET(code)` lỗi/timeout. Code cache-aside coi như **miss** (phải xử lý lỗi Redis = miss, không panic).
2. **Tất cả 10k req/s đổ thẳng Postgres** thay vì ~2k (mất lớp hấp thụ 80%). Postgres tải tăng đột ngột 5 lần.
3. **Latency redirect tăng** từ ~1ms (hit) lên ~5–10ms (đọc Postgres index) hoặc cao hơn nếu Postgres bão hoà → có nguy cơ vi phạm N1.
4. **Rate limit** (cũng trên Redis) mất → hoặc fail-open (cho qua, rủi ro abuse) hoặc fail-closed (chặn, mất khách) — chọn fail-open tạm thời cho redirect, hợp lý hơn vì chặn nhầm khách thật là tệ hơn.
5. **Hệ thống KHÔNG sập** (degrade): redirect vẫn trả đúng URL, chỉ chậm hơn. Đây là điểm cốt lõi của fallback.

**Biện pháp giảm thiệt hại:**
- **Local in-process cache (LRU nhỏ)** trong mỗi pod làm lớp đệm thứ hai → bắt một phần traffic khi Redis chết, giảm tải Postgres.
- **Redis cluster / replica** để mất 1 node không mất toàn bộ cache.
- **Circuit breaker** quanh Redis (timeout ngắn) để không treo chờ Redis đã chết ([L52](../lesson-52-rate-limiting-circuit-breaker/README.md)).
- **Postgres read replica** để hấp thụ spike khi cache mất.
- **Connection pool limit + load shedding** ở Postgres để không bị connection storm làm sập luôn DB.

---

## Code & Minh hoạ

- [solutions.go](./solutions.go) — domain types + interface skeleton (design, chưa impl) + `Base62Encode` chạy được. `go vet` / `go build` pass.
- [visualization.html](./visualization.html) — 3 module tương tác:
  1. **Architecture diagram** — click vào từng component (API / service / Postgres / Redis / queue / worker) để xem vai trò.
  2. **Capacity calculator** — kéo slider số URL & tỉ lệ read:write → ước lượng storage / cache / QPS.
  3. **Read path** — animate redirect: cache hit (nhanh) vs miss (Postgres + populate) + emit click async.

---

## Bài tiếp theo

→ [Lesson 83 — Capstone: Implement](../lesson-83-capstone-implement/README.md): biến design doc này thành code thật — REST API + Postgres + Redis + async click queue, theo clean architecture.

Tham khảo lại: [L43 REST](../lesson-43-rest-api-design/README.md) · [L58 Redis](../lesson-58-redis-caching/README.md) · [L64 Queue](../lesson-64-message-queue-nats-kafka/README.md) · [L79 Clean Architecture](../lesson-79-clean-architecture-go/README.md).
