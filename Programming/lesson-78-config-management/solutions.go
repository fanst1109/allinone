// Lesson 78 — Configuration Management · solutions.go
//
// File này minh hoạ một lớp config sản xuất-thực-tế cho app Go, gồm đủ các phần
// đã trình bày ở README:
//
//   - Config struct gom mọi cấu hình về một chỗ (single source of truth).
//   - Load() áp dụng precedence: default < file < env var < flag.
//   - Typed parsing: string -> int / bool / time.Duration / []string, lỗi parse
//     KHÔNG bị nuốt mà trả về error (đẩy vào fail-fast).
//   - Validate() fail-fast lúc startup: thiếu required / ngoài range -> error.
//   - String() redact secret để không lộ password khi log.
//   - ConfigStore dùng atomic.Pointer[Config]: hot reload qua SIGHUP, swap atomic.
//   - FlagStore thread-safe: feature flag toggle lúc runtime.
//
// Chạy demo (không cần tương tác, không thật sự gửi signal):
//
//	go run solutions.go
//
// Build / vet:
//
//	go build ./...
//	go vet ./...
package main

import (
	"errors"
	"fmt"
	"os"
	"os/signal"
	"strconv"
	"strings"
	"sync"
	"sync/atomic"
	"syscall"
	"time"
)

// ===========================================================================
// Phần 1: Config struct — single source of truth
// ===========================================================================

// Config gom toàn bộ cấu hình của app. Tag mô tả cách load từng field một cách
// khai báo (declarative): nguồn env nào, default ra sao, có required không.
// Ở đây ta đọc tag bằng tay trong Load() cho minh bạch (không dùng reflect) —
// đủ rõ ràng để học, với app lớn thì lib (caarlos0/env, Viper) tự hoá việc này.
type Config struct {
	Port     int           // cổng HTTP, 1..65535
	LogLevel string        // debug | info | warn | error
	DBURL    string        // DATABASE_URL — REQUIRED, là secret
	Timeout  time.Duration // timeout request, vd "30s"
	Debug    bool          // bật chế độ debug
	Hosts    []string      // danh sách host được phép, "a.com,b.com"
}

// String che secret (DBURL) để khi log "%v"/"%s" không lộ password.
// Đây là lý do KHÔNG bao giờ in cả config bằng "%+v" nếu chưa redact.
func (c Config) String() string {
	return fmt.Sprintf(
		"Config{Port:%d, LogLevel:%q, DBURL:%s, Timeout:%s, Debug:%t, Hosts:%v}",
		c.Port, c.LogLevel, redact(c.DBURL), c.Timeout, c.Debug, c.Hosts,
	)
}

// redact thay giá trị nhạy cảm bằng placeholder; chuỗi rỗng giữ nguyên để dễ
// debug "chưa set" vs "đã set nhưng bị che".
func redact(s string) string {
	if s == "" {
		return "<empty>"
	}
	return "***REDACTED***"
}

// defaultConfig trả về các giá trị an toàn hardcode — lớp dưới cùng của
// precedence, phủ kín mọi field để app luôn chạy được "out of the box".
func defaultConfig() Config {
	return Config{
		Port:     8080,
		LogLevel: "info",
		DBURL:    "", // không có default an toàn cho secret -> để rỗng, Validate sẽ bắt
		Timeout:  30 * time.Second,
		Debug:    false,
		Hosts:    nil,
	}
}

// ===========================================================================
// Phần 2: Typed parsing — string -> kiểu thật, lỗi parse trả error
// ===========================================================================
//
// Env var LUÔN là string. Các helper dưới đây biến chuỗi thành kiểu đã kiểm
// định, và nếu env CÓ set nhưng parse fail thì trả error (không im lặng dùng 0).
// Mỗi helper dùng os.LookupEnv để phân biệt "chưa set" (giữ default) với
// "set rỗng/sai" (xử lý tường minh).

// lookupInt: nếu env không set -> trả def. Nếu set nhưng không phải số -> error.
func lookupInt(key string, def int) (int, error) {
	v, ok := os.LookupEnv(key)
	if !ok {
		return def, nil
	}
	n, err := strconv.Atoi(v)
	if err != nil {
		return 0, fmt.Errorf("%s=%q không phải số nguyên hợp lệ: %w", key, v, err)
	}
	return n, nil
}

// lookupBool: chấp nhận 1/t/true/0/f/false (theo strconv.ParseBool).
func lookupBool(key string, def bool) (bool, error) {
	v, ok := os.LookupEnv(key)
	if !ok {
		return def, nil
	}
	b, err := strconv.ParseBool(v)
	if err != nil {
		return false, fmt.Errorf("%s=%q không phải bool hợp lệ (true/false/1/0): %w", key, v, err)
	}
	return b, nil
}

// lookupDuration: bắt buộc hậu tố đơn vị tường minh ("30s", "5m", "1h30m").
// Không nhận số trần "30" -> tránh mơ hồ giây/mili.
func lookupDuration(key string, def time.Duration) (time.Duration, error) {
	v, ok := os.LookupEnv(key)
	if !ok {
		return def, nil
	}
	d, err := time.ParseDuration(v)
	if err != nil {
		return 0, fmt.Errorf("%s=%q không phải duration hợp lệ (vd \"30s\", \"5m\"): %w", key, v, err)
	}
	return d, nil
}

// lookupString: env set (kể cả rỗng) thì ghi đè, không thì giữ default.
func lookupString(key, def string) string {
	if v, ok := os.LookupEnv(key); ok {
		return v
	}
	return def
}

// lookupSlice: split theo dấu phẩy, trim khoảng trắng. Chuỗi rỗng -> nil slice
// (KHÔNG trả []string{""} như strings.Split mặc định).
func lookupSlice(key string, def []string) []string {
	v, ok := os.LookupEnv(key)
	if !ok {
		return def
	}
	if strings.TrimSpace(v) == "" {
		return nil
	}
	parts := strings.Split(v, ",")
	out := make([]string, 0, len(parts))
	for _, p := range parts {
		if t := strings.TrimSpace(p); t != "" {
			out = append(out, t)
		}
	}
	return out
}

// ===========================================================================
// Phần 3: Load() — precedence default < file < env < flag
// ===========================================================================

// FileConfig là cấu hình đọc từ file (JSON/YAML...). Ở đây mô phỏng "đã đọc
// file" bằng một map đơn giản để giữ solutions.go không phụ thuộc file ngoài;
// trong thực tế bạn json.Unmarshal vào struct này.
type FileConfig map[string]string

// FlagOverrides mô phỏng các flag đã thực sự được truyền lúc gõ lệnh.
// Khoá có mặt = flag "có truyền" (ghi đè); vắng mặt = "không truyền" (giữ nguyên).
// Mô hình này tương đương dùng flag.Visit() để chỉ áp flag đã set thật —
// giải quyết đúng vấn đề "phân biệt flag default vs flag đã set" ở README mục 2.2.
type FlagOverrides map[string]string

// Load dựng Config theo precedence default < file < env < flag.
// Trả error nếu bất kỳ nguồn nào cho giá trị parse fail -> đẩy vào fail-fast.
func Load(file FileConfig, flags FlagOverrides) (*Config, error) {
	// (1) default — phủ kín mọi field.
	cfg := defaultConfig()

	// (2) file ghi đè default (chỉ field nào file có).
	if v, ok := file["port"]; ok {
		n, err := strconv.Atoi(v)
		if err != nil {
			return nil, fmt.Errorf("file port=%q không hợp lệ: %w", v, err)
		}
		cfg.Port = n
	}
	if v, ok := file["log_level"]; ok {
		cfg.LogLevel = v
	}
	if v, ok := file["database_url"]; ok {
		cfg.DBURL = v
	}
	if v, ok := file["timeout"]; ok {
		d, err := time.ParseDuration(v)
		if err != nil {
			return nil, fmt.Errorf("file timeout=%q không hợp lệ: %w", v, err)
		}
		cfg.Timeout = d
	}
	if v, ok := file["hosts"]; ok {
		cfg.Hosts = splitCSV(v)
	}

	// (3) env var ghi đè file. Dùng các helper typed; lỗi parse -> error.
	var err error
	if cfg.Port, err = lookupInt("PORT", cfg.Port); err != nil {
		return nil, err
	}
	cfg.LogLevel = lookupString("LOG_LEVEL", cfg.LogLevel)
	cfg.DBURL = lookupString("DATABASE_URL", cfg.DBURL)
	if cfg.Timeout, err = lookupDuration("TIMEOUT", cfg.Timeout); err != nil {
		return nil, err
	}
	if cfg.Debug, err = lookupBool("DEBUG", cfg.Debug); err != nil {
		return nil, err
	}
	cfg.Hosts = lookupSlice("HOSTS", cfg.Hosts)

	// (4) flag ghi đè tất cả — chỉ áp khi flag THẬT SỰ được truyền.
	if v, ok := flags["port"]; ok {
		n, err := strconv.Atoi(v)
		if err != nil {
			return nil, fmt.Errorf("flag --port=%q không hợp lệ: %w", v, err)
		}
		cfg.Port = n
	}
	if v, ok := flags["log-level"]; ok {
		cfg.LogLevel = v
	}
	if v, ok := flags["database-url"]; ok {
		cfg.DBURL = v
	}

	return &cfg, nil
}

// splitCSV là helper nhỏ dùng chung cho file/flag (giống lookupSlice nhưng
// nhận thẳng chuỗi, không qua env).
func splitCSV(v string) []string {
	if strings.TrimSpace(v) == "" {
		return nil
	}
	parts := strings.Split(v, ",")
	out := make([]string, 0, len(parts))
	for _, p := range parts {
		if t := strings.TrimSpace(p); t != "" {
			out = append(out, t)
		}
	}
	return out
}

// ===========================================================================
// Phần 4: Validate() — fail-fast on startup
// ===========================================================================

// validLevels là tập log level hợp lệ.
var validLevels = map[string]bool{"debug": true, "info": true, "warn": true, "error": true}

// Validate kiểm mọi ràng buộc, trả lỗi ĐẦU TIÊN gặp. Caller gọi ngay sau Load,
// TRƯỚC khi mở socket/DB; sai -> log.Fatal -> exit khác 0 -> K8s thấy
// CrashLoopBackOff và không route traffic vào pod hỏng.
func (c *Config) Validate() error {
	if c.DBURL == "" {
		return errors.New("DATABASE_URL là bắt buộc (required) nhưng đang rỗng")
	}
	if c.Port < 1 || c.Port > 65535 {
		return fmt.Errorf("PORT=%d ngoài khoảng hợp lệ 1..65535", c.Port)
	}
	if !validLevels[c.LogLevel] {
		return fmt.Errorf("LOG_LEVEL=%q không hợp lệ (cho phép: debug|info|warn|error)", c.LogLevel)
	}
	if c.Timeout <= 0 {
		return fmt.Errorf("TIMEOUT=%s phải > 0", c.Timeout)
	}
	return nil
}

// ===========================================================================
// Phần 5: ConfigStore — hot reload atomic qua SIGHUP
// ===========================================================================

// ConfigStore giữ con trỏ Config hiện hành trong atomic.Pointer (Go 1.19+).
// Reader gọi Current() lock-free, luôn thấy config NHẤT QUÁN (swap nguyên con
// trỏ — không bao giờ trạng thái nửa-cũ-nửa-mới).
type ConfigStore struct {
	ptr atomic.Pointer[Config]
}

// NewConfigStore tạo store với config khởi tạo.
func NewConfigStore(initial *Config) *ConfigStore {
	s := &ConfigStore{}
	s.ptr.Store(initial)
	return s
}

// Current trả config đang dùng (lock-free).
func (s *ConfigStore) Current() *Config { return s.ptr.Load() }

// reload dựng config mới từ nguồn hiện tại, validate, rồi swap ATOMIC.
// Nếu load/validate fail -> GIỮ config cũ (không bao giờ áp config hỏng).
func (s *ConfigStore) reload(file FileConfig, flags FlagOverrides) error {
	newCfg, err := Load(file, flags)
	if err != nil {
		return fmt.Errorf("reload: load fail, giữ config cũ: %w", err)
	}
	if err := newCfg.Validate(); err != nil {
		return fmt.Errorf("reload: validate fail, giữ config cũ: %w", err)
	}
	s.ptr.Store(newCfg) // ATOMIC swap — reader thấy all-or-nothing.
	return nil
}

// WatchSIGHUP đăng ký handler bắt SIGHUP; mỗi lần nhận signal sẽ reload từ env.
// Trả hàm stop() để gỡ đăng ký (dừng watcher). Trong app thật gọi một lần lúc
// startup; ở demo ta gọi reload trực tiếp để chạy được không cần tương tác.
func (s *ConfigStore) WatchSIGHUP(file FileConfig, flags FlagOverrides) (stop func()) {
	sigCh := make(chan os.Signal, 1)
	signal.Notify(sigCh, syscall.SIGHUP)
	done := make(chan struct{})
	go func() {
		for {
			select {
			case <-sigCh:
				if err := s.reload(file, flags); err != nil {
					fmt.Println("[SIGHUP]", err) // log lỗi, giữ config cũ
					continue
				}
				fmt.Println("[SIGHUP] reload thành công:", s.Current())
			case <-done:
				return
			}
		}
	}()
	return func() {
		signal.Stop(sigCh)
		close(done)
	}
}

// ===========================================================================
// Phần 6: FlagStore — feature flag toggle runtime (thread-safe)
// ===========================================================================

// FlagStore bọc map[string]bool + RWMutex. Nhiều reader song song trên đường
// nóng (code check flag liên tục), chỉ chặn khi ghi (hiếm — lúc toggle).
type FlagStore struct {
	mu    sync.RWMutex
	flags map[string]bool
}

// NewFlagStore tạo store rỗng.
func NewFlagStore() *FlagStore {
	return &FlagStore{flags: make(map[string]bool)}
}

// Get trả trạng thái flag; chưa set -> false (mặc định tắt).
func (f *FlagStore) Get(name string) bool {
	f.mu.RLock()
	defer f.mu.RUnlock()
	return f.flags[name]
}

// Set bật/tắt flag lúc runtime.
func (f *FlagStore) Set(name string, on bool) {
	f.mu.Lock()
	defer f.mu.Unlock()
	f.flags[name] = on
}

// ===========================================================================
// Phần 7: Fix antipattern (BT6) — secret từ env, validate, redact khi log
// ===========================================================================

// DBConfig minh hoạ bản sửa của antipattern hardcode DB password.
type DBConfig struct{ URL string }

// loadDB đọc DATABASE_URL từ env (kênh ngoài), fail-fast nếu thiếu.
func loadDB() (DBConfig, error) {
	url, ok := os.LookupEnv("DATABASE_URL")
	if !ok || url == "" {
		return DBConfig{}, errors.New("DATABASE_URL là bắt buộc")
	}
	return DBConfig{URL: url}, nil
}

// String redact để log không lộ password.
func (c DBConfig) String() string { return "DBConfig{URL:***REDACTED***}" }

// ===========================================================================
// Phần 8: main — demo chạy được, không cần tương tác
// ===========================================================================

func main() {
	fmt.Println("=== Lesson 78 — Configuration Management ===")

	// --- BT1: Precedence default < file < env < flag --------------------
	fmt.Println("\n--- BT1: Precedence (default < file < env < flag) ---")
	// Đặt env mô phỏng môi trường deploy.
	_ = os.Setenv("PORT", "8090")
	_ = os.Setenv("DATABASE_URL", "postgres://app:secret@db:5432/app")
	_ = os.Setenv("DEBUG", "true")
	_ = os.Setenv("TIMEOUT", "45s")
	_ = os.Setenv("HOSTS", "a.com, b.com ,c.com")

	file := FileConfig{"port": "8000", "log_level": "warn"} // file đặt port=8000
	// Trường hợp A: flag KHÔNG truyền port -> env (8090) thắng.
	cfgA, err := Load(file, FlagOverrides{})
	must(err)
	fmt.Printf("  flag KHÔNG truyền port -> Port = %d (mong đợi 8090)\n", cfgA.Port)

	// Trường hợp B: flag --port=9090 -> ghi đè tất cả.
	cfgB, err := Load(file, FlagOverrides{"port": "9090"})
	must(err)
	fmt.Printf("  flag --port=9090       -> Port = %d (mong đợi 9090)\n", cfgB.Port)
	fmt.Println("  config đầy đủ (secret đã redact):", cfgA)

	// --- BT3: Typed parsing đã chạy bên trong Load ----------------------
	fmt.Println("\n--- BT3: Typed parsing ---")
	fmt.Printf("  PORT  (int)      = %d\n", cfgA.Port)
	fmt.Printf("  DEBUG (bool)     = %t\n", cfgA.Debug)
	fmt.Printf("  TIMEOUT (Duration) = %s\n", cfgA.Timeout)
	fmt.Printf("  HOSTS (slice, đã trim) = %v\n", cfgA.Hosts)

	// --- BT2: Validation fail-fast --------------------------------------
	fmt.Println("\n--- BT2: Validation fail-fast ---")
	fmt.Printf("  config hợp lệ -> Validate() = %v\n", cfgA.Validate())
	bad := &Config{Port: 70000, LogLevel: "info", DBURL: "x", Timeout: time.Second}
	fmt.Printf("  Port=70000    -> Validate() = %v\n", bad.Validate())
	noDB := &Config{Port: 8080, LogLevel: "info", DBURL: "", Timeout: time.Second}
	fmt.Printf("  DBURL rỗng    -> Validate() = %v\n", noDB.Validate())
	badLvl := &Config{Port: 8080, LogLevel: "verbose", DBURL: "x", Timeout: time.Second}
	fmt.Printf("  LogLevel sai  -> Validate() = %v\n", badLvl.Validate())

	// --- BT4: Hot reload qua SIGHUP (atomic swap) -----------------------
	fmt.Println("\n--- BT4: Hot reload (SIGHUP, atomic) ---")
	_ = os.Setenv("LOG_LEVEL", "info")
	initial, err := Load(file, FlagOverrides{})
	must(err)
	store := NewConfigStore(initial)
	fmt.Printf("  trước reload: LogLevel = %q\n", store.Current().LogLevel)
	stop := store.WatchSIGHUP(file, FlagOverrides{})
	// Đổi env rồi reload trực tiếp (tương đương kill -HUP) để demo chạy không
	// cần tương tác; signal handler ở trên vẫn hoạt động khi nhận SIGHUP thật.
	_ = os.Setenv("LOG_LEVEL", "debug")
	must(store.reload(file, FlagOverrides{}))
	fmt.Printf("  sau reload:   LogLevel = %q (không restart process)\n", store.Current().LogLevel)
	// Reload với config hỏng -> giữ config cũ.
	_ = os.Setenv("LOG_LEVEL", "verbose") // sai -> Validate fail
	if err := store.reload(file, FlagOverrides{}); err != nil {
		fmt.Printf("  reload config hỏng -> giữ cũ %q (%v)\n", store.Current().LogLevel, err)
	}
	_ = os.Setenv("LOG_LEVEL", "info") // dọn lại
	stop()

	// --- BT5: Feature flag toggle runtime -------------------------------
	fmt.Println("\n--- BT5: Feature flag toggle runtime ---")
	fs := NewFlagStore()
	fmt.Println("  ", checkout(fs)) // mặc định tắt -> checkout cũ
	fs.Set("new_checkout", true)
	fmt.Println("  ", checkout(fs)) // bật -> checkout mới
	fs.Set("new_checkout", false)
	fmt.Println("  ", checkout(fs)) // tắt lại -> checkout cũ

	// --- BT6: Fix antipattern -------------------------------------------
	fmt.Println("\n--- BT6: Fix antipattern (secret từ env, redact log) ---")
	db, err := loadDB()
	must(err)
	fmt.Printf("  loadDB() OK, log an toàn: %s\n", db) // String() che secret

	fmt.Println("\nXong. Tất cả module chạy không lỗi.")
}

// checkout rẽ nhánh theo feature flag — chứng minh code đổi hành vi runtime.
func checkout(fs *FlagStore) string {
	if fs.Get("new_checkout") {
		return "new_checkout=on  -> dùng luồng checkout MỚI"
	}
	return "new_checkout=off -> dùng luồng checkout cũ"
}

// must dừng chương trình nếu err != nil — mô phỏng fail-fast lúc startup.
func must(err error) {
	if err != nil {
		fmt.Println("FATAL:", err)
		os.Exit(1)
	}
}
