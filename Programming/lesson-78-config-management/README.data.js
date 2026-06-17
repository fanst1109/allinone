// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-78-config-management/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 78 — Configuration Management

> Tier 7 (Production) · Một binary, nhiều môi trường — config tách khỏi code, validate sớm, không bao giờ commit secret.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao config phải tách khỏi code** và nguyên tắc 12-factor "config trong environment".
- Nắm **thứ tự ưu tiên (precedence)** giữa các nguồn config: \`default < file < env var < flag\`.
- Đọc/ghi config qua **env var** (\`os.Getenv\`, \`os.LookupEnv\`), **flag** (\`flag\` package) và **file** (JSON/YAML/TOML, Viper).
- Thiết kế **struct-based config**: parse string → typed (int, bool, \`time.Duration\`, slice), gắn tag mặc định và required.
- **Validate fail-fast** lúc startup: thiếu required hoặc giá trị ngoài range thì crash ngay, không để runtime mới lỗi.
- Quản lý **secret** đúng cách: env var, Vault / AWS Secrets Manager / K8s Secret, mounted file vs env.
- **Hot reload** config không restart: \`SIGHUP\`, \`fsnotify\`, polling — và biết khi nào nên dùng.
- Cài **feature flag** toggle runtime, hiểu LaunchDarkly / Unleash hoặc tự build.
- Quản lý **config per environment** (dev/staging/prod) tránh duplicate bằng base + override.
- Hiểu **secrets rotation** không downtime.
- Tránh các **pitfall**: hardcode config, commit \`.env\`, không validate, config drift, secret lọt vào log, reload không atomic.

## Kiến thức tiền đề

- [Lesson 22 — Files & os](../lesson-22-files-os/) — đọc file, biến môi trường.
- [Lesson 23 — JSON encoding](../lesson-23-json-encoding/) — parse config file dạng JSON.
- [Lesson 29 — Context & cancellation](../lesson-29-context-cancellation/) — phối hợp reload an toàn.
- [Lesson 72 — Structured Logging](../lesson-72-structured-logging/) — log level là ví dụ kinh điển của hot reload.
- [Lesson 76 — Kubernetes Basics](../lesson-76-kubernetes-basics/) — ConfigMap & Secret inject env/file.
- Sẽ dùng tiếp ở [Lesson 79 — Clean Architecture](../lesson-79-clean-architecture-go/) — config là một adapter ở rìa hệ thống.

---

## 1. Vì sao config tách khỏi code

> 💡 **Trực giác / Hình dung.** Hãy tưởng tượng bạn nướng một chiếc bánh. **Công thức (recipe)** là code — cố định, đã kiểm thử kỹ. **Nguyên liệu cụ thể** (lò nướng nhà bạn ở 180°C hay 200°C, bột loại A hay B) là config — thay đổi theo từng căn bếp. Bạn không viết lại công thức mỗi khi đổi bếp; bạn chỉ chỉnh tham số. Phần mềm cũng vậy: **một binary duy nhất** phải chạy được ở máy dev, server staging, và cụm prod — chỉ khác nhau ở config.

### 1.1 Cùng một binary, nhiều môi trường

Khi bạn \`go build\` ra file \`server\`, file đó là **bất biến (immutable)**. Cùng artifact ấy được deploy lên:

- **dev** — DB local \`localhost:5432\`, log level \`debug\`, mở 1 worker.
- **staging** — DB staging, log level \`info\`, 4 worker, bật profiling.
- **prod** — DB prod (HA cluster), log level \`warn\`, 32 worker, tắt profiling.

Nếu DB URL, log level... nằm **trong code**, bạn phải build lại 3 binary khác nhau cho 3 môi trường. Điều đó phá vỡ nguyên tắc "build once, run anywhere": binary chạy ở prod **không phải** chính binary đã test ở staging → mọi kiểm thử trước đó mất ý nghĩa.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vậy chỉ cần đừng hardcode là xong?"* — Không đủ. Phải có cơ chế chuẩn để **inject** giá trị từ ngoài (env, file, flag) và **validate** chúng. Tách config là cả một kỷ luật, không chỉ là "đặt biến ở đầu file".
> - *"Hằng số như \`MaxRetries = 3\` cũng là config?"* — Không nhất thiết. Ranh giới: **giá trị đổi theo môi trường** là config; **giá trị thuộc bản chất thuật toán** (vd hệ số tăng trưởng exponential backoff = 2) là code. Khi nghi ngờ, hỏi: "prod và dev có cần giá trị khác nhau không?"

### 1.2 12-factor: config trong environment

[The Twelve-Factor App](https://12factor.net/config) — bộ nguyên tắc xây app cloud-native — phát biểu Factor III rất gọn:

> **Store config in the environment.** — Lưu config trong môi trường.

Lý do then chốt 12-factor đưa ra: phép thử *"liệu codebase có thể public ngay lập tức mà không lộ credential nào không?"* Nếu câu trả lời là không (vì password nằm trong code), thì config **chưa** tách đúng.

> ⚠ **Lỗi thường gặp.** Hiểu "config trong environment" thành "mọi thứ phải là env var" rồi nhồi 80 env var vào container. 12-factor nhấn mạnh env var cho **credential và giá trị khác-nhau-theo-deploy**; với cấu hình phức tạp (nested, list dài) thì file config + secret manager vẫn hợp lý hơn. Tinh thần là *"config không nằm trong code"*, không phải *"mọi config phải là biến môi trường"*.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Vì sao deploy "cùng một binary" lại quan trọng cho độ tin cậy?
> 2. \`RetryBackoffFactor = 2.0\` nên là config hay code?
>
> <details><summary>Đáp án</summary>
>
> 1. Vì binary chạy ở prod đúng là binary đã test ở staging — không có "biến lạ" do build lại. Build-once-run-anywhere giữ chuỗi kiểm thử nguyên vẹn.
> 2. Thường là **code** — nó là tham số thuật toán, dev/staging/prod không cần khác nhau. Nếu một ngày bạn muốn tune backoff theo môi trường thì mới promote nó thành config.
> </details>

> 📝 **Tóm tắt mục 1.**
> - Code bất biến, config thay đổi theo môi trường → tách ra để dùng **một binary** cho mọi môi trường.
> - 12-factor Factor III: config trong environment; phép thử là "public codebase có lộ secret không".
> - Ranh giới config/code: "prod và dev có cần khác nhau không?".

---

## 2. Config sources & precedence

> 💡 **Trực giác / Hình dung.** Hình dung config như nhiều lớp giấy bóng kính chồng lên nhau, mỗi lớp ghi đè lớp dưới ở những ô nó có ghi. Lớp dưới cùng (default) phủ kín mọi ô — đảm bảo không ô nào trống. Lớp trên (flag) chỉ ghi ở vài ô bạn cố tình ghi đè. Nhìn xuyên qua chồng giấy, mỗi ô hiện **giá trị của lớp trên cùng có ghi**.

### 2.1 Bốn nguồn, một thứ tự

Thứ tự ưu tiên chuẩn (từ thấp đến cao — nguồn sau **ghi đè** nguồn trước):

\`\`\`
default  <  file  <  env var  <  flag
(thấp nhất)                    (cao nhất)
\`\`\`

- **default** — giá trị an toàn hardcode trong code, dùng khi không ai set. Đảm bảo app luôn chạy được "out of the box".
- **file** — \`config.yaml\` / \`config.json\`, check vào repo (trừ secret), dễ review qua git.
- **env var** — inject lúc deploy (K8s/Docker), ghi đè file cho từng môi trường.
- **flag** — \`--port=9090\` lúc gõ lệnh, ưu tiên cao nhất, tiện debug/one-off override.

### 2.2 Walk-through override với số thật

Giả sử field \`Port\` được set ở nhiều nguồn:

| Nguồn | Giá trị \`Port\` | Có set không? |
|-------|---------------:|:-------------:|
| default (code) | \`8080\` | ✓ (luôn) |
| file \`config.yaml\` | \`8000\` | ✓ |
| env \`PORT\` | \`8090\` | ✓ |
| flag \`--port\` | *(không truyền)* | ✗ |

Áp dụng precedence: bắt đầu \`8080\` → file ghi đè thành \`8000\` → env ghi đè thành \`8090\` → flag không set nên **giữ** \`8090\`.

→ **Giá trị cuối cùng (resolved) của \`Port\` = \`8090\`.**

Đổi tình huống: nếu chạy \`./server --port=9090\`, flag có set → ghi đè tất cả → **resolved = \`9090\`**.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Làm sao biết flag 'có truyền' hay 'để mặc định'?"* — \`flag.Int\` trả về giá trị mặc định nếu không truyền, **không phân biệt được**. Mẹo: dùng \`flag.Visit\` để liệt kê flag đã set thật, hoặc set default của flag bằng giá trị "đã resolve từ env" rồi parse sau. solutions.go minh họa cách thứ hai.
> - *"Có chuẩn nào bắt buộc thứ tự này không?"* — Không có "luật", nhưng \`default < file < env < flag\` là quy ước **phổ biến nhất** (Viper, Spring Boot, Kubernetes đều theo tinh thần tương tự: nguồn càng "gần lúc chạy" càng ưu tiên). Quan trọng là **nhất quán** và **document rõ** cho team.

> ⚠ **Lỗi thường gặp.** Đảo ngược thứ tự — để file ghi đè env. Hậu quả: ops set \`PORT=8090\` qua K8s ConfigMap nhưng app vẫn nghe \`8000\` vì file thắng → "tại sao env var của tôi bị lờ đi?". Luôn để **nguồn gần lúc deploy/chạy** (env, flag) ưu tiên hơn nguồn tĩnh (file, default).

> 📝 **Tóm tắt mục 2.**
> - 4 nguồn: \`default < file < env < flag\`, nguồn sau ghi đè nguồn trước.
> - Default phủ kín mọi field → app luôn chạy được; flag ưu tiên cao nhất → debug nhanh.
> - Khó nhất là phân biệt "flag không truyền" vs "flag truyền giá trị bằng default" — xử lý bằng \`flag.Visit\`.

---

## 3. Env var

> 💡 **Trực giác / Hình dung.** Env var giống như tờ giấy nhớ dán lên cửa phòng trước khi process bước vào: "DB ở đây, port này, log mức kia". Process đọc tờ giấy lúc khởi động. Không cần sửa file bên trong, không cần build lại — chỉ đổi tờ giấy dán ngoài cửa.

### 3.1 \`os.Getenv\` vs \`os.LookupEnv\`

\`\`\`go
// os.Getenv: trả "" nếu biến không tồn tại — KHÔNG phân biệt
// "không set" với "set bằng chuỗi rỗng".
port := os.Getenv("PORT") // "" nếu chưa set

// os.LookupEnv: trả thêm ok=false nếu chưa set — PHÂN BIỆT được.
if v, ok := os.LookupEnv("PORT"); ok {
    // biến CÓ được set (kể cả set = "")
    port = v
}
\`\`\`

> ⚠ **Lỗi thường gặp.** Dùng \`os.Getenv("DEBUG")\` rồi kiểm tra \`if val == ""\`. Nếu ai đó cố tình set \`DEBUG=\` (rỗng) để tắt, code không phân biệt được với "chưa set". Với logic precedence cần biết "nguồn này có ghi đè không", **luôn dùng \`os.LookupEnv\`**.

### 3.2 Inject qua K8s / Docker

Trong production, không ai gõ \`export\` tay. Env var được inject lúc deploy:

\`\`\`yaml
# Docker Compose
services:
  api:
    image: myorg/api:1.4.2
    environment:
      PORT: "8090"
      LOG_LEVEL: "info"
\`\`\`

\`\`\`yaml
# Kubernetes — env từ ConfigMap (config thường) và Secret (nhạy cảm)
env:
  - name: PORT
    valueFrom: { configMapKeyRef: { name: api-config, key: port } }
  - name: DATABASE_URL
    valueFrom: { secretKeyRef: { name: api-secrets, key: db-url } }
\`\`\`

Cùng image \`myorg/api:1.4.2\` deploy ở 3 môi trường — chỉ ConfigMap/Secret khác nhau. Đúng tinh thần mục 1.

> 📝 **Tóm tắt mục 3.**
> - \`os.LookupEnv\` (có \`ok\`) > \`os.Getenv\` khi cần phân biệt "chưa set" vs "set rỗng".
> - K8s/Docker inject env lúc deploy: config thường → ConfigMap, nhạy cảm → Secret.
> - Cùng image, khác env = khác môi trường.

---

## 4. Flags

> 💡 **Trực giác / Hình dung.** Flag là "công tắc gạt tay" ngay lúc khởi động: \`./server --port=9090 --debug\`. Tiện cho one-off (chạy thử cổng khác, bật debug một lần) mà không phải đụng vào file hay env.

\`\`\`go
import "flag"

port := flag.Int("port", 8080, "HTTP listen port")
level := flag.String("log-level", "info", "log level: debug|info|warn|error")
flag.Parse()
// *port, *level là con trỏ tới giá trị đã parse
\`\`\`

\`flag\` package tự sinh \`--help\`, tự validate kiểu (\`--port=abc\` → báo lỗi \`invalid value\`), và dừng app nếu sai. Flag đứng **cao nhất** trong precedence: lý tưởng để override mọi thứ khi debug.

> ❓ **Câu hỏi tự nhiên của người đọc.** *"Flag với env, nên dùng cái nào?"* — Env hợp với **deploy tự động** (K8s set sẵn, người vận hành không gõ lệnh). Flag hợp với **chạy tay/debug** (developer gõ \`./server --debug\` một lần). Pattern phổ biến: default của flag = giá trị đã resolve từ env, để flag chỉ ghi đè khi **thực sự** truyền — xem mục 2.2 và solutions.go.

> 📝 **Tóm tắt mục 4.** Flag = override cao nhất, tốt cho debug one-off; tự sinh \`--help\` và validate kiểu; kết hợp với env qua "default = giá trị env đã resolve".

---

## 5. Config file (JSON/YAML/TOML, Viper)

> 💡 **Trực giác / Hình dung.** File config là "bản hợp đồng có thể review": nằm trong git, mỗi thay đổi có diff, có người duyệt. Hợp với config **nhiều, có cấu trúc, không nhạy cảm** (danh sách endpoint, timeout, feature mặc định).

| Format | Ưu | Nhược |
|--------|-----|-------|
| **JSON** | stdlib \`encoding/json\`, ai cũng đọc | không comment được, dài dòng |
| **YAML** | gọn, có comment, nested dễ đọc | nhạy cảm với indent (dễ lỗi tab/space), cần lib ngoài |
| **TOML** | rõ ràng, có comment, ít bẫy hơn YAML | ít quen thuộc hơn |

Trong Go, đọc JSON bằng stdlib:

\`\`\`go
type FileConfig struct {
    Port     int    \`json:"port"\`
    LogLevel string \`json:"log_level"\`
}

data, _ := os.ReadFile("config.json")
var fc FileConfig
json.Unmarshal(data, &fc) // map JSON → struct
\`\`\`

**Viper** là thư viện config phổ biến nhất trong hệ sinh thái Go: đọc được JSON/YAML/TOML/env/flag, gộp precedence sẵn, watch file để hot reload. Đánh đổi: thêm dependency lớn. Với app nhỏ, stdlib + ít code tự viết (như solutions.go) là đủ và minh bạch hơn.

> ⚠ **Lỗi thường gặp.** Commit \`config.yaml\` chứa cả \`db_password: hunter2\`. File config check vào git **chỉ chứa config không nhạy cảm**; secret đi đường riêng (env/secret manager — xem mục 8).

> 📝 **Tóm tắt mục 5.** File hợp với config nhiều/có cấu trúc/không nhạy cảm, review qua git; JSON (stdlib) / YAML / TOML; Viper gộp mọi nguồn nhưng nặng. Secret KHÔNG nằm trong file commit.

---

## 6. Struct-based config

> 💡 **Trực giác / Hình dung.** Thay vì rải \`os.Getenv("X")\` khắp code (mỗi chỗ tự parse, dễ lệch), bạn gom toàn bộ config vào **một struct duy nhất**, load một lần lúc startup, rồi truyền struct ấy đi khắp app. Có một "nguồn sự thật" (single source of truth) về config.

\`\`\`go
type Config struct {
    Port  int    \`env:"PORT"          default:"8080"\`
    DBURL string \`env:"DATABASE_URL"  required:"true"\`
    Level string \`env:"LOG_LEVEL"     default:"info"\`
}
\`\`\`

Struct tag (\`env:"..."\`, \`default:"..."\`, \`required:"true"\`) mô tả **cách load** từng field một cách khai báo (declarative). Một hàm \`Load()\` đọc tag, lấy giá trị từ env, áp default, kiểm required — toàn bộ logic tập trung một chỗ. solutions.go cài đầy đủ cơ chế này bằng \`reflect\`.

> ❓ **Câu hỏi tự nhiên của người đọc.** *"Phải dùng reflect không?"* — Không bắt buộc. Với ít field, viết tay \`cfg.Port = getEnvInt("PORT", 8080)\` rõ ràng và nhanh hơn. Reflect/tag đáng dùng khi config lớn (nhiều chục field) để tránh lặp. Viper và các lib (\`caarlos0/env\`, \`kelseyhightower/envconfig\`) làm sẵn việc này.

> 📝 **Tóm tắt mục 6.** Gom config vào một struct, load một lần, truyền đi — single source of truth. Tag mô tả cách load khai báo; reflect tự hóa khi config lớn.

---

## 7. Validation — fail fast on startup

> 💡 **Trực giác / Hình dung.** Như kiểm tra hành lý ở cổng an ninh **trước** khi lên máy bay, không phải khi đã bay giữa trời. Config sai phải lộ ra **ngay lúc app khởi động** (vài giây đầu), không phải lúc 2 giờ sáng khi request đầu tiên chạm tới field bị thiếu.

\`\`\`go
func (c *Config) Validate() error {
    if c.DBURL == "" {
        return errors.New("DATABASE_URL là bắt buộc")
    }
    if c.Port < 1 || c.Port > 65535 {
        return fmt.Errorf("PORT=%d ngoài khoảng hợp lệ 1..65535", c.Port)
    }
    valid := map[string]bool{"debug": true, "info": true, "warn": true, "error": true}
    if !valid[c.Level] {
        return fmt.Errorf("LOG_LEVEL=%q không hợp lệ", c.Level)
    }
    return nil
}
\`\`\`

Gọi \`Validate()\` ngay sau \`Load()\`, **trước** khi mở socket/DB. Sai → \`log.Fatal\` → process chết với exit code khác 0 → orchestrator (K8s) thấy pod CrashLoopBackOff và **không** route traffic vào pod hỏng.

> ⚠ **Lỗi thường gặp.** Không validate → app khởi động "thành công", nhận traffic, rồi panic lúc xử lý request thật vì \`DBURL\` rỗng. Lỗi xuất hiện **muộn**, ở **production**, lúc **đang phục vụ user** — tệ nhất có thể. Fail-fast chuyển lỗi này về lúc deploy, lúc dễ phát hiện và rollback nhất.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Vì sao validate lúc startup tốt hơn lúc request?
> 2. Config \`Port = 70000\` sẽ bị bắt ở đâu?
>
> <details><summary>Đáp án</summary>
>
> 1. Vì lỗi lộ ngay, deploy thất bại sạch sẽ (pod không vào trạng thái Ready), không có user nào bị ảnh hưởng. Nếu để runtime, lỗi xảy ra giữa lúc phục vụ → ảnh hưởng user thật.
> 2. Ở \`Validate()\`: \`70000 > 65535\` → trả error → \`log.Fatal\` lúc startup.
> </details>

> 📝 **Tóm tắt mục 7.** Validate ngay sau load, trước khi mở socket/DB. Sai → exit khác 0 → K8s không route traffic. Fail-fast = chuyển lỗi từ runtime/prod về startup/deploy.

---

## 8. Secret management

> 💡 **Trực giác / Hình dung.** Config thường (port, log level) là "địa chỉ nhà" — ghi lên danh thiếp cũng không sao. Secret (DB password, API key) là "chìa khóa nhà" — không bao giờ photo dán lên tường, không gửi qua email, không để lẫn trong sổ tay public. Secret cần kênh riêng, được bảo vệ.

### 8.1 Hai quy tắc bất di bất dịch

1. **KHÔNG hardcode** secret trong source code.
2. **KHÔNG commit** secret vào git (kể cả file \`.env\`).

Vì sao quy tắc 2 nghiêm trọng? Git lưu **lịch sử**. Lỡ commit password rồi xóa ở commit sau — password vẫn còn nguyên trong history, ai clone repo cũng đọc được. Repo public lộ AWS key thường bị bot quét và lạm dụng trong **vài phút**.

### 8.2 Các cấp quản lý secret

| Cách | Mức bảo vệ | Khi nào dùng |
|------|-----------|--------------|
| **Env var** | Cơ bản | App nhỏ, đủ cho phần lớn trường hợp; secret không lọt vào image |
| **K8s Secret** | Trung bình | Trong cluster; mount thành env hoặc file, base64 (lưu ý: base64 ≠ mã hóa) |
| **Vault / AWS Secrets Manager** | Cao | Enterprise; mã hóa at-rest, audit log, rotation tự động, dynamic secret |

### 8.3 Mounted file vs env var

Hai cách secret manager đưa secret vào process:

- **Env var** — đơn giản, nhưng env của process có thể bị lộ qua \`/proc/<pid>/environ\`, qua crash dump, hoặc lỡ in ra log. Đổi secret phải **restart** process (env đọc một lần lúc start).
- **Mounted file** (vd \`/var/run/secrets/db-password\`) — secret nằm trong file, app đọc khi cần. Cho phép **rotation không restart**: secret manager ghi file mới, app đọc lại. An toàn hơn một chút (không nằm trong env của process).

> ⚠ **Lỗi thường gặp.** In nguyên \`Config\` ra log để debug: \`log.Printf("config: %+v", cfg)\` → password hiện trong log → log bị gửi đi log aggregation → secret rò rỉ ra hệ thống thứ ba. **Cài method \`String()\` che secret**:
>
> \`\`\`go
> func (c Config) String() string {
>     return fmt.Sprintf("Config{Port:%d, DBURL:%s}", c.Port, "***REDACTED***")
> }
> \`\`\`

> 📝 **Tóm tắt mục 8.**
> - KHÔNG hardcode, KHÔNG commit secret (git history giữ mãi).
> - Cấp độ: env var (cơ bản) < K8s Secret < Vault/Secrets Manager (mã hóa + audit + rotation).
> - Mounted file cho phép rotation không restart; env phải restart.
> - Che secret trong \`String()\`/log — đừng \`%+v\` cả config.

---

## 9. Hot reload

> 💡 **Trực giác / Hình dung.** Như chỉnh độ sáng đèn trong phòng mà không cần tắt rồi bật lại cả căn nhà. Một số config nên đổi được "nóng" (lúc đang chạy) mà không restart process — vì restart làm rớt kết nối, mất warm cache, gây downtime ngắn.

### 9.1 Khi nào cần hot reload

- **Log level** — đang điều tra sự cố muốn bật \`debug\` tạm thời rồi tắt, không thể restart prod mỗi lần.
- **Feature flag** — bật/tắt tính năng tức thì (xem mục 10).
- **Rate limit / timeout** — tune mà không gián đoạn.

Ngược lại, config "cấu trúc" (port đang lắng nghe, số worker pool đã tạo) thường **không** reload nóng được — đổi chúng cần khởi tạo lại tài nguyên, restart sạch sẽ hơn.

### 9.2 Ba cơ chế

| Cơ chế | Cách hoạt động | Ưu/nhược |
|--------|----------------|----------|
| **SIGHUP** | Gửi \`kill -HUP <pid>\`, app bắt signal rồi reload | Chuẩn Unix lâu đời; cần ai đó/script gửi signal |
| **fsnotify** | Watch file config, OS báo khi file đổi → reload | Tự động; phụ thuộc lib \`fsnotify\`, có thể bắn nhiều event cho 1 lần ghi |
| **Polling** | Đọc lại file mỗi N giây, so sánh đổi thì reload | Đơn giản nhất, hoạt động mọi nơi; trễ tối đa N giây, tốn I/O |

\`SIGHUP\` trong Go:

\`\`\`go
sigCh := make(chan os.Signal, 1)
signal.Notify(sigCh, syscall.SIGHUP)
go func() {
    for range sigCh {
        newCfg, err := Load()
        if err != nil {
            log.Printf("reload thất bại, giữ config cũ: %v", err)
            continue // GIỮ config cũ — không áp config hỏng
        }
        configStore.Set(newCfg) // swap atomic
    }
}()
\`\`\`

### 9.3 Reload phải ATOMIC

> ⚠ **Lỗi thường gặp.** Reload bằng cách gán **từng field** một:
>
> \`\`\`go
> // SAI — không atomic
> cfg.Port = newPort        // tại đây goroutine khác đọc Port mới
> cfg.LogLevel = newLevel   // nhưng LogLevel vẫn cũ → trạng thái nửa-nạc-nửa-mỡ
> \`\`\`
>
> Giữa hai dòng, một goroutine khác có thể đọc \`Config\` ở **trạng thái không nhất quán** (port mới, level cũ). Tệ hơn: nếu config mới validate fail giữa chừng, app dính nửa config cũ nửa mới.
>
> **Đúng** — build config mới hoàn chỉnh, validate xong, rồi **swap nguyên cả con trỏ** một lần bằng \`atomic.Pointer\` hoặc mutex:
>
> \`\`\`go
> // atomic.Pointer[Config] — swap nguyên struct trong một thao tác
> store.cfg.Store(newCfg) // hoặc mutex bao quanh
> \`\`\`
>
> Mọi reader hoặc thấy **toàn bộ** config cũ, hoặc **toàn bộ** config mới — không bao giờ trạng thái lai.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Vì sao \`cfg.Port = x; cfg.Level = y\` lại nguy hiểm khi có goroutine khác đọc?
> 2. Reload mà config mới validate fail thì nên làm gì?
>
> <details><summary>Đáp án</summary>
>
> 1. Vì giữa hai phép gán, reader có thể đọc port mới + level cũ — trạng thái lai không bao giờ tồn tại trong config hợp lệ nào. Phải swap nguyên con trỏ (atomic) để reader thấy "all-or-nothing".
> 2. **Giữ nguyên config cũ** và log lỗi. Không bao giờ áp config hỏng — config cũ vẫn đang chạy ổn còn hơn nửa-mới-nửa-cũ.
> </details>

> 📝 **Tóm tắt mục 9.**
> - Hot reload cho config "mềm" (log level, feature flag, rate limit); config "cứng" (port, pool) thì restart.
> - 3 cơ chế: SIGHUP, fsnotify, polling.
> - Reload phải **atomic** (swap nguyên con trỏ) và **validate trước khi áp** — fail thì giữ config cũ.

---

## 10. Feature flags

> 💡 **Trực giác / Hình dung.** Feature flag là công tắc đèn cho từng tính năng: bật/tắt **lúc runtime** mà không deploy lại. Giúp tách "deploy code" (đưa code lên prod, flag tắt) khỏi "release feature" (bật flag cho user thấy). Lỡ tính năng mới gây sự cố → tắt flag tức thì, không cần rollback build.

\`\`\`go
type Flags struct {
    NewCheckout  bool // tính năng checkout mới
    DarkMode     bool
}

if flags.Get("new_checkout") {
    newCheckoutFlow()
} else {
    oldCheckoutFlow()
}
\`\`\`

Ứng dụng:
- **Canary / gradual rollout** — bật cho 5% user, theo dõi metrics, tăng dần.
- **Kill switch** — tính năng lỗi → tắt ngay, không chờ deploy.
- **A/B testing** — chia nhánh đo hiệu quả.

Công cụ: **LaunchDarkly**, **Unleash** (open-source), hoặc tự build (flag trong config + hot reload — chính là kết hợp mục 9 + 10). solutions.go minh họa flag tự build toggle runtime an toàn (thread-safe).

> ❓ **Câu hỏi tự nhiên của người đọc.** *"Feature flag khác config thường ở đâu?"* — Về kỹ thuật, flag **là** config (giá trị bool/string load từ ngoài). Khác biệt là vòng đời và mục đích: flag thường **đổi nhiều, runtime, có chủ đích kinh doanh** (rollout, A/B), nên gần như luôn đi với hot reload. Flag tạm thời (cho một lần rollout) nên **dọn dẹp** sau khi tính năng ổn định — tránh "flag debt" tích tụ thành rừng \`if\`.

> 📝 **Tóm tắt mục 10.** Flag = công tắc runtime tách deploy khỏi release; dùng cho canary, kill switch, A/B; LaunchDarkly/Unleash/tự build (= config + hot reload); nhớ dọn flag tạm.

---

## 11. Config per environment

> 💡 **Trực giác / Hình dung.** Đừng viết lại toàn bộ thực đơn cho mỗi chi nhánh nhà hàng. Có một **thực đơn gốc (base)** rồi mỗi chi nhánh chỉ ghi **khác biệt (override)**: chi nhánh A thêm món này, chi nhánh B đổi giá kia. Tránh sao chép → tránh "lệch menu" giữa các chi nhánh.

\`\`\`
config/
  base.yaml      # giá trị chung cho mọi môi trường
  dev.yaml       # override cho dev
  staging.yaml   # override cho staging
  prod.yaml      # override cho prod
\`\`\`

Load: đọc \`base.yaml\`, rồi merge \`<env>.yaml\` đè lên. Chọn env qua biến \`APP_ENV=prod\`.

> ⚠ **Lỗi thường gặp — config drift.** Copy-paste \`prod.yaml\` từ \`staging.yaml\` rồi sửa tay. Theo thời gian, ai đó thêm field mới vào staging mà quên thêm vào prod → hai môi trường lệch nhau ("config drift") → "chạy ổn ở staging, vỡ ở prod" vì prod thiếu một field. **Base + override** chống drift: field chung khai báo **một lần** ở base, môi trường chỉ ghi cái khác biệt.

> 📝 **Tóm tắt mục 11.** Base + override (không duplicate cả file) để chống config drift; chọn môi trường qua \`APP_ENV\`; merge override đè base.

---

## 12. Type safety — parse string → typed

> 💡 **Trực giác / Hình dung.** Env var **luôn là chuỗi** (\`"8080"\`, \`"true"\`, \`"30s"\`). Nhưng code cần **kiểu thật**: \`int\`, \`bool\`, \`time.Duration\`, \`[]string\`. Lớp parse là "cửa hải quan" biến chuỗi thô thành kiểu đã kiểm định — và bắt lỗi ngay tại cửa nếu chuỗi không hợp lệ.

| Đích | Hàm parse | Ví dụ vào → ra |
|------|-----------|----------------|
| \`int\` | \`strconv.Atoi\` | \`"8090"\` → \`8090\`; \`"abc"\` → lỗi |
| \`bool\` | \`strconv.ParseBool\` | \`"true"\`,\`"1"\`,\`"t"\` → \`true\`; \`"false"\`,\`"0"\` → \`false\` |
| \`time.Duration\` | \`time.ParseDuration\` | \`"30s"\` → 30 giây; \`"5m"\` → 5 phút; \`"1h30m"\` → 90 phút |
| \`[]string\` | \`strings.Split\` | \`"a,b,c"\` → \`["a","b","c"]\` |

\`\`\`go
// int
port, err := strconv.Atoi(os.Getenv("PORT"))
// duration — KHÔNG để config "30" mơ hồ (giây? mili?); "30s" rõ ràng
timeout, err := time.ParseDuration(os.Getenv("TIMEOUT")) // "30s"
// slice
hosts := strings.Split(os.Getenv("ALLOWED_HOSTS"), ",")  // "a.com,b.com"
\`\`\`

> ⚠ **Lỗi thường gặp.** Để timeout là số trần \`"30"\` rồi tự đoán đơn vị trong code. \`30\` là 30 giây hay 30 mili-giây? Người set và người đọc dễ hiểu khác nhau. **Dùng \`time.Duration\` với hậu tố tường minh** (\`"30s"\`, \`"500ms"\`) — \`time.ParseDuration\` ép phải ghi rõ đơn vị.

> ❓ **Câu hỏi tự nhiên của người đọc.** *"Lỗi parse thì sao?"* — Đẩy lên thành lỗi load → vào \`Validate()\`/fail-fast (mục 7). \`PORT=abc\` phải làm app **chết lúc startup** với thông báo rõ ("PORT=abc không phải số nguyên"), không được im lặng dùng \`0\`.

> 📝 **Tóm tắt mục 12.** Env luôn là string; parse sang typed bằng \`strconv\`/\`time.ParseDuration\`/\`strings.Split\`; lỗi parse → fail-fast; duration luôn ghi rõ đơn vị (\`"30s"\`).

---

## 13. 12-factor config principles (tổng hợp)

Gom lại các nguyên tắc đã rải trong bài, đối chiếu [12factor.net](https://12factor.net/config):

1. **Config tách hoàn toàn khỏi code** — code public được mà không lộ secret.
2. **Config trong environment** — inject từ ngoài (env/file/secret manager), không hardcode.
3. **Không gom config thành "nhóm môi trường" cứng trong code** — đừng có \`if env == "prod"\` rải khắp nơi; thay vào đó mỗi giá trị độc lập đến từ nguồn ngoài.
4. **Mọi deploy là một tổ hợp config** — cùng binary + config khác = môi trường khác.
5. **Secret tách riêng, không vào git** — kênh bảo vệ riêng (mục 8).

> ❓ **Câu hỏi tự nhiên của người đọc.** *"Nguyên tắc 3 nghĩa là gì cụ thể?"* — Tránh kiểu \`const isProd = true\` hoặc \`switch env { case "prod": ... }\` xác định hành vi bằng tên môi trường trong code. Thay vào đó, mỗi giá trị (\`LogLevel\`, \`Replicas\`...) đến độc lập từ env. Lý do: số môi trường có thể tăng (thêm "qa", "demo", "canary") mà không phải sửa code; và tên môi trường không nên quyết định hành vi — **giá trị config** mới quyết định.

> 📝 **Tóm tắt mục 13.** 12-factor: tách config khỏi code, đặt trong environment, mỗi giá trị độc lập (không \`if env==prod\`), mỗi deploy = binary + tổ hợp config, secret đi kênh riêng.

---

## 14. Secrets rotation

> 💡 **Trực giác / Hình dung.** Đổi khóa cửa định kỳ để nếu khóa cũ bị lộ thì cũng vô dụng. Với hệ thống đang phục vụ, phải đổi khóa **mà không khóa luôn người đang ở trong nhà** — tức rotation không gây downtime.

### 14.1 Vì sao cần rotate

- Credential càng sống lâu, rủi ro lộ càng tích lũy (bị log, bị nhân viên nghỉ việc mang đi, bị leak).
- Tuân thủ (compliance) thường bắt buộc rotate định kỳ (vd 90 ngày).
- Lộ credential → rotate ngay là biện pháp ngăn chặn.

### 14.2 Rotation không downtime — overlap window

Mấu chốt: trong thời gian chuyển, **cả secret cũ và mới đều hợp lệ** một khoảng (overlap window).

1. Secret manager tạo credential **mới**, **giữ cái cũ vẫn còn hiệu lực**.
2. App đọc lại secret (qua mounted file rotation hoặc reload) → dùng credential mới.
3. Sau khi chắc chắn mọi instance đã chuyển sang mới → **thu hồi (revoke)** credential cũ.

Nếu revoke cũ **trước** khi mọi instance kịp đọc mới → request đang bay dùng credential cũ bị từ chối → lỗi. Overlap window tránh điều đó.

> ⚠ **Lỗi thường gặp.** Rotate bằng cách: xóa secret cũ → tạo secret mới → restart app. Giữa "xóa cũ" và "app dùng được mới", mọi request fail. **Đúng**: tạo mới song song (cũ vẫn sống) → app pick up mới → mới ổn định → revoke cũ. Mounted file + hot reload (mục 8, 9) là nền tảng kỹ thuật cho rotation không downtime.

> 📝 **Tóm tắt mục 14.** Rotate vì rủi ro tích lũy + compliance; không downtime nhờ overlap window (cũ & mới cùng hợp lệ): tạo mới → app pick up → revoke cũ. Mounted file + hot reload là cơ sở.

---

## 15. Common pitfalls (tổng hợp)

| Pitfall | Hậu quả | Cách tránh |
|---------|---------|-----------|
| **Hardcode config** | Build lại cho mỗi môi trường; binary prod ≠ binary đã test | Inject từ env/file/flag (mục 1–4) |
| **Commit secret** (\`.env\` vào git) | Lộ vĩnh viễn trong git history; bot quét trong vài phút | Secret manager + \`.gitignore\`; KHÔNG hardcode (mục 8) |
| **No validation** | Crash lúc runtime/prod thay vì startup | \`Validate()\` fail-fast (mục 7) |
| **Config drift** giữa env | "Chạy ở staging, vỡ ở prod" do thiếu field | Base + override (mục 11) |
| **Secret trong log/error** | Rò rỉ qua log aggregation | \`String()\` redact; không \`%+v\` config (mục 8) |
| **Reload không atomic** | Trạng thái nửa-cũ-nửa-mới, không nhất quán | Swap nguyên con trỏ + validate trước khi áp (mục 9) |
| **Timeout số trần \`"30"\`** | Mơ hồ giây/mili → bug khó tìm | \`time.Duration\` rõ đơn vị \`"30s"\` (mục 12) |
| **\`os.Getenv\` cho logic precedence** | Không phân biệt "chưa set" vs "set rỗng" | \`os.LookupEnv\` có \`ok\` (mục 3) |

> 📝 **Tóm tắt mục 15.** 8 pitfall chính xoay quanh 3 trục: (a) không tách config khỏi code, (b) lộ/quản lý sai secret, (c) thiếu validation & reload không an toàn. Mỗi cái đều có biện pháp đã nêu trong bài.

---

## 16. Ứng dụng thực tế trong phần mềm

> 💡 **Config tách khỏi code (12-factor) cho phép cùng một binary chạy mọi môi trường — và secret để trong code/git là lỗ hổng bảo mật kinh điển.**

| Nguyên tắc | Thực hành |
|------------|-----------|
| **Config qua env var** (12-factor) | Cùng image chạy dev/staging/prod, chỉ đổi env |
| **Secret riêng, không vào git** | Vault, K8s Secret, AWS Secrets Manager — KHÔNG hard-code |
| **Validate config lúc khởi động** | Fail fast nếu thiếu/sai config, không chết giữa chừng |
| **Default hợp lý** | App chạy được với cấu hình tối thiểu |

### 16.1. Ví dụ cụ thể — cùng binary, khác môi trường

\`\`\`go
type Config struct {
	Port     int    \`env:"PORT" envDefault:"8080"\`
	DBUrl    string \`env:"DATABASE_URL,required"\`   // bắt buộc, fail fast nếu thiếu
	LogLevel string \`env:"LOG_LEVEL" envDefault:"info"\`
}
// dev: DATABASE_URL=localhost...  prod: DATABASE_URL=prod-db...
// CÙNG một binary, chỉ env khác → build 1 lần, chạy mọi nơi
\`\`\`

12-factor: config trong **môi trường**, không trong code. Cùng Docker image promote từ staging → prod (cùng artifact đã test), chỉ đổi env var → không "build lại cho prod" (nguồn bug "máy staging chạy được"). Validate \`required\` lúc start → thiếu \`DATABASE_URL\` thì crash ngay lúc khởi động (rõ ràng) thay vì lỗi nil khi request đầu tiên.

> ⚠ **Secret trong git = sự cố bảo mật #1.** (1) Hard-code API key/password/token trong code hoặc commit file \`.env\` → ai có repo (kể cả lịch sử git) đều thấy → lộ key. Dùng secret manager (Vault/K8s Secret/cloud), thêm \`.env\` vào \`.gitignore\`. (2) Key đã lỡ commit → **phải rotate** (đổi key), không chỉ xóa commit (lịch sử git còn). (3) Đừng log config chứa secret ([nối logging](../lesson-72-structured-logging/)). (4) Phân biệt config (port, level — vào git OK) với secret (key, password — không bao giờ).

### 16.2. 📝 Tóm tắt mục 16

- **12-factor**: config qua env var → cùng binary/image chạy mọi môi trường (build 1 lần, promote artifact).
- **Validate lúc khởi động** (\`required\`) → fail fast khi thiếu config, không lỗi giữa chừng.
- **Secret KHÔNG vào git/code** → secret manager; lỡ commit phải rotate; đừng log secret.

## Bài tập

> Lời giải chi tiết ở mục [Lời giải chi tiết](#lời-giải-chi-tiết). Code hoàn chỉnh ở [solutions.go](./solutions.go).

**BT1 — Precedence.** Thiết kế \`Config\` với field \`Port\` và \`LogLevel\`. Viết \`Load()\` áp dụng precedence \`default < file < env < flag\`. Với \`default Port=8080\`, file \`Port=8000\`, env \`PORT=8090\`, flag không truyền — \`Port\` cuối cùng phải là \`8090\`. Nếu chạy \`--port=9090\` thì là \`9090\`.

**BT2 — Validation fail-fast.** Thêm \`Validate()\`: \`DBURL\` required (rỗng → lỗi), \`Port\` trong \`1..65535\`, \`LogLevel\` thuộc \`{debug,info,warn,error}\`. Gọi sau \`Load()\`, sai thì dừng app.

**BT3 — Typed parsing.** Viết helper parse env sang \`int\`, \`bool\`, \`time.Duration\`, \`[]string\`. Test với \`PORT=8090\`, \`DEBUG=true\`, \`TIMEOUT=30s\`, \`HOSTS=a.com,b.com\`. Lỗi parse phải thành error (không im lặng).

**BT4 — Hot reload log level qua SIGHUP.** Viết một config store thread-safe. Bắt \`SIGHUP\`, reload từ env, swap atomic. Mô phỏng: khởi đầu \`LogLevel=info\`, đổi env \`LOG_LEVEL=debug\`, gửi SIGHUP → store trả \`debug\` mà không restart.

**BT5 — Feature flag toggle runtime.** Viết \`FlagStore\` thread-safe với \`Get(name)\` và \`Set(name, bool)\`. Mô phỏng bật/tắt \`new_checkout\` runtime và chứng minh code rẽ nhánh theo flag.

**BT6 — Fix antipattern.** Cho đoạn code sai (hardcode DB password, không validate):
\`\`\`go
func connect() {
    db := open("postgres://admin:hunter2@db:5432/app") // hardcode!
    _ = db
}
\`\`\`
Sửa thành: đọc từ env \`DATABASE_URL\`, validate required + non-empty, và \`String()\` redact secret khi log.

---

## Lời giải chi tiết

### Lời giải BT1 — Precedence

**Cách tiếp cận.** Bắt đầu từ struct gắn default, áp lần lượt theo thứ tự tăng dần ưu tiên. Mấu chốt là phân biệt "flag có truyền không": dùng \`flag.Visit\` (chỉ duyệt flag **đã set thật**) hoặc set default của flag = giá trị đã resolve từ env rồi parse.

Các bước:
1. Khởi tạo \`cfg\` với giá trị default (\`Port=8080\`).
2. Nếu có file → unmarshal, ghi đè field nào file có (\`Port=8000\` → \`cfg.Port=8000\`).
3. Nếu env \`PORT\` set (\`LookupEnv\` \`ok==true\`) → parse và ghi đè (\`cfg.Port=8090\`).
4. Đăng ký flag với default = \`cfg.Port\` hiện tại (8090). Sau \`flag.Parse()\`, nếu user truyền \`--port\` thật thì flag thắng; nếu không, flag = 8090 (giữ nguyên).

Với input đề bài (flag không truyền): kết quả \`8090\`. Với \`--port=9090\`: \`9090\`. Đúng yêu cầu.

**Độ phức tạp.** O(số field) cho mỗi nguồn — tuyến tính, chạy một lần lúc startup nên không phải mối lo hiệu năng.

### Lời giải BT2 — Validation fail-fast

**Cách tiếp cận.** Một method \`Validate() error\` kiểm từng ràng buộc, trả lỗi đầu tiên gặp (hoặc gom nhiều lỗi). Caller: \`if err := cfg.Validate(); err != nil { log.Fatal(err) }\` — \`log.Fatal\` in lỗi rồi \`os.Exit(1)\`, process chết với exit code khác 0.

Các bước kiểm:
1. \`DBURL == ""\` → \`errors.New("DATABASE_URL là bắt buộc")\`.
2. \`Port < 1 || Port > 65535\` → lỗi range.
3. \`LogLevel\` không thuộc tập hợp lệ → lỗi.

Vì sao fail-fast: K8s thấy pod exit khác 0 → CrashLoopBackOff → không route traffic vào pod hỏng → lỗi lộ lúc deploy, không lúc phục vụ user. Xem solutions.go hàm \`(*Config).Validate\`.

### Lời giải BT3 — Typed parsing

**Cách tiếp cận.** Mỗi kiểu một helper nhận tên env + default, trả \`(T, error)\`:
- \`getEnvInt\`: \`strconv.Atoi\`.
- \`getEnvBool\`: \`strconv.ParseBool\` (chấp nhận \`1/t/true/0/f/false\`).
- \`getEnvDuration\`: \`time.ParseDuration\` (bắt buộc hậu tố đơn vị).
- \`getEnvSlice\`: \`strings.Split(v, ",")\`, trim khoảng trắng.

Quan trọng: nếu env có set nhưng parse fail → trả error (không nuốt). Lỗi này nối vào load → vào fail-fast của BT2. Test trong \`main\` của solutions.go in ra kết quả parse cho từng kiểu.

**Edge case.** Slice rỗng: \`strings.Split("", ",")\` trả \`[""]\` (một phần tử rỗng) — solutions.go xử lý: nếu chuỗi rỗng trả \`nil\` slice.

### Lời giải BT4 — Hot reload SIGHUP

**Cách tiếp cận.** Dùng \`atomic.Pointer[Config]\` (Go 1.19+) làm store: reader gọi \`store.Load()\` lấy con trỏ hiện tại — luôn thấy config nhất quán (swap nguyên con trỏ). Goroutine bắt \`SIGHUP\`:

\`\`\`go
signal.Notify(sigCh, syscall.SIGHUP)
for range sigCh {
    newCfg, err := Load()
    if err != nil { log.Printf("reload fail, giữ cũ: %v", err); continue }
    if err := newCfg.Validate(); err != nil { log.Printf("..."); continue }
    store.Store(newCfg) // ATOMIC swap
}
\`\`\`

Mấu chốt atomic + validate-trước-khi-áp: reader không bao giờ thấy nửa-cũ-nửa-mới; config hỏng không bao giờ được áp (giữ cũ). solutions.go mô phỏng bằng cách gọi reload trực tiếp (thay vì thật sự gửi signal, để chạy được không cần tương tác) nhưng cấu trúc signal handler vẫn có đầy đủ.

**Độ phức tạp.** Swap atomic $O(1)$; reader lock-free.

### Lời giải BT5 — Feature flag runtime

**Cách tiếp cận.** \`FlagStore\` bọc \`map[string]bool\` + \`sync.RWMutex\`:
- \`Get(name)\` — \`RLock\`, đọc map, mặc định \`false\` nếu chưa có.
- \`Set(name, v)\` — \`Lock\`, ghi map.

RWMutex cho phép nhiều reader song song (đường nóng — code check flag liên tục), chỉ chặn khi ghi (hiếm — lúc toggle). Mô phỏng: \`Set("new_checkout", true)\` rồi rẽ nhánh \`if store.Get("new_checkout")\` → in "checkout mới"; \`Set(false)\` → "checkout cũ". Xem solutions.go type \`FlagStore\`.

### Lời giải BT6 — Fix antipattern

**Cách tiếp cận.** Ba sửa đổi:
1. **Bỏ hardcode** → đọc \`DATABASE_URL\` từ env.
2. **Validate** required + non-empty trước khi connect; rỗng → fail-fast.
3. **Redact** secret trong \`String()\` để log không lộ.

\`\`\`go
type DBConfig struct{ URL string }

func loadDB() (DBConfig, error) {
    url, ok := os.LookupEnv("DATABASE_URL")
    if !ok || url == "" {
        return DBConfig{}, errors.New("DATABASE_URL là bắt buộc")
    }
    return DBConfig{URL: url}, nil
}

func (c DBConfig) String() string { return "DBConfig{URL:***REDACTED***}" }
\`\`\`

Trước: secret nằm trong code (lộ qua git), không kiểm tra, in log lộ password. Sau: secret từ env (kênh ngoài), fail-fast nếu thiếu, \`String()\` che khi log. Đối chiếu pitfall mục 15 hàng 1, 2, 3, 5. Code đầy đủ ở solutions.go.

---

## Code & Minh họa

- **[solutions.go](./solutions.go)** — \`Config\` struct, \`Load()\` với precedence \`default < file < env < flag\`, \`Validate()\` fail-fast, typed parsing (int/bool/duration/slice), hot reload \`atomic.Pointer\` + SIGHUP handler, \`FlagStore\` thread-safe, và fix antipattern BT6. Chạy: \`go run solutions.go\`.
- **[visualization.html](./visualization.html)** — 3 module tương tác:
  1. **Config precedence** — chỉnh giá trị ở từng nguồn (default/file/env/flag), xem giá trị resolved cuối cùng và nguồn quyết định.
  2. **Validation** — nhập config, bấm "Start app", xem pass/fail lúc startup với thông báo lỗi cụ thể.
  3. **Hot reload** — đổi log level, bấm "SIGHUP", xem giá trị cập nhật mà không "restart".

---

## Bài tiếp theo

- [Lesson 79 — Clean Architecture Go](../lesson-79-clean-architecture-go/) — config là một adapter ở rìa, inject vào core qua dependency injection.
- Quay lại [Lesson 76 — Kubernetes Basics](../lesson-76-kubernetes-basics/) — ConfigMap & Secret là cách K8s inject config/secret mà bài này dựa vào.
- Tham khảo: [The Twelve-Factor App — Config](https://12factor.net/config).
`;
