// solutions.go — Lesson 46: Authentication & JWT
//
// File này implement JWT HS256 BẰNG TAY (crypto/hmac + crypto/sha256 +
// encoding/base64) để bạn thấy "ruột" của JWT trông như thế nào, KHÔNG phụ
// thuộc bất kỳ module ngoài nào (chỉ stdlib) → `go run solutions.go` chạy được
// offline.
//
// Bao gồm:
//   - signJWT / verifyJWT          (BT1, BT2) — ký + verify HS256, check exp/alg.
//   - AuthMiddleware / UserFromContext (BT3) — gắn user vào context.Context.
//   - HashPassword / CheckPassword (BT4) — PBKDF2-HMAC-SHA256 + salt (DEMO).
//   - loginHandler / refreshHandler (BT5) — access JWT 15 phút + refresh rotation.
//
// ⚠ ĐÂY LÀ CODE HỌC. Production PHẢI dùng:
//   - JWT:      github.com/golang-jwt/jwt/v5
//   - Password: golang.org/x/crypto/bcrypt (cost 12) hoặc argon2id.
//   - Refresh:  Redis / DB thay cho map in-memory.
//
// Chạy:  go run solutions.go
package main

import (
	"context"
	"crypto/hmac"
	"crypto/rand"
	"crypto/sha256"
	"crypto/subtle"
	"encoding/base64"
	"encoding/binary"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"net/http/httptest"
	"strconv"
	"strings"
	"sync"
	"time"
)

// ============================================================================
// BT1 — Sign JWT HS256
// ============================================================================

// base64URLEncode mã hóa base64url KHÔNG padding ('=') — đúng chuẩn JWT (RFC 7515).
func base64URLEncode(b []byte) string {
	return base64.RawURLEncoding.EncodeToString(b)
}

// signJWT tạo token dạng `header.payload.signature` dùng HS256.
//
// Bước 1: marshal header {"alg":"HS256","typ":"JWT"} → base64url.
// Bước 2: marshal claims → base64url.
// Bước 3: HMAC-SHA256(header + "." + payload, secret) → base64url = signature.
func signJWT(claims map[string]any, secret []byte) (string, error) {
	// header cố định cho HS256. Dùng struct với tag để giữ thứ tự ổn định.
	headerJSON, err := json.Marshal(map[string]string{"alg": "HS256", "typ": "JWT"})
	if err != nil {
		return "", err
	}
	payloadJSON, err := json.Marshal(claims)
	if err != nil {
		return "", err
	}

	h := base64URLEncode(headerJSON)
	p := base64URLEncode(payloadJSON)
	signingInput := h + "." + p

	mac := hmac.New(sha256.New, secret)
	mac.Write([]byte(signingInput))
	sig := base64URLEncode(mac.Sum(nil))

	return signingInput + "." + sig, nil
}

// ============================================================================
// BT2 — Parse & verify JWT
// ============================================================================

// verifyJWT kiểm tra một token HS256 và trả về claims nếu hợp lệ.
//
// Checklist (mục 5.2 README):
//  1. Đủ 3 phần ngăn bằng dấu chấm.
//  2. alg == "HS256" (CHẶN alg:none và alg-confusion).
//  3. Signature đúng — so sánh CONSTANT-TIME bằng hmac.Equal.
//  4. exp > now (nếu claim exp tồn tại).
func verifyJWT(token string, secret []byte) (map[string]any, error) {
	parts := strings.Split(token, ".")
	if len(parts) != 3 {
		return nil, errors.New("malformed token: cần đúng 3 phần header.payload.signature")
	}

	// --- (2) check alg trong header ---
	headerRaw, err := base64.RawURLEncoding.DecodeString(parts[0])
	if err != nil {
		return nil, fmt.Errorf("header không decode được: %w", err)
	}
	var header map[string]string
	if err := json.Unmarshal(headerRaw, &header); err != nil {
		return nil, fmt.Errorf("header không phải JSON: %w", err)
	}
	if header["alg"] != "HS256" {
		// CHẶN alg:none và alg-confusion ngay tại đây.
		return nil, fmt.Errorf("alg không mong đợi: %q (chỉ chấp nhận HS256)", header["alg"])
	}

	// --- (3) verify signature constant-time ---
	signingInput := parts[0] + "." + parts[1]
	mac := hmac.New(sha256.New, secret)
	mac.Write([]byte(signingInput))
	expectedSig := mac.Sum(nil)

	actualSig, err := base64.RawURLEncoding.DecodeString(parts[2])
	if err != nil {
		return nil, fmt.Errorf("signature không decode được: %w", err)
	}
	if !hmac.Equal(expectedSig, actualSig) { // hmac.Equal = constant-time
		return nil, errors.New("invalid signature")
	}

	// --- decode payload (claims) ---
	payloadRaw, err := base64.RawURLEncoding.DecodeString(parts[1])
	if err != nil {
		return nil, fmt.Errorf("payload không decode được: %w", err)
	}
	var claims map[string]any
	if err := json.Unmarshal(payloadRaw, &claims); err != nil {
		return nil, fmt.Errorf("payload không phải JSON: %w", err)
	}

	// --- (4) check exp nếu có ---
	if expVal, ok := claims["exp"]; ok {
		// JSON number unmarshal thành float64.
		if expF, ok := expVal.(float64); ok {
			if time.Now().Unix() > int64(expF) {
				return nil, errors.New("token expired")
			}
		}
	}

	return claims, nil
}

// ============================================================================
// BT3 — Auth middleware put user info in context
// ============================================================================

// ctxKey là type private → không middleware nào khác vô tình ghi đè cùng key.
type ctxKey int

const userCtxKey ctxKey = 0

// User là identity đã xác thực, gắn vào context cho handler/AuthZ dùng tiếp.
type User struct {
	ID   string
	Role string
}

// AuthMiddleware đọc "Authorization: Bearer <token>", verify, gắn User vào context.
func AuthMiddleware(secret []byte) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			const prefix = "Bearer "
			authHeader := r.Header.Get("Authorization")
			if !strings.HasPrefix(authHeader, prefix) {
				http.Error(w, "missing bearer token", http.StatusUnauthorized)
				return
			}
			tok := strings.TrimPrefix(authHeader, prefix)

			claims, err := verifyJWT(tok, secret)
			if err != nil {
				// 401 = chưa xác thực (AuthN fail), KHÔNG phải 403.
				http.Error(w, "invalid token: "+err.Error(), http.StatusUnauthorized)
				return
			}

			sub, _ := claims["sub"].(string)
			role, _ := claims["role"].(string)
			u := User{ID: sub, Role: role}

			ctx := context.WithValue(r.Context(), userCtxKey, u)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

// UserFromContext lấy User đã xác thực từ context (handler dùng để AuthZ).
func UserFromContext(ctx context.Context) (User, bool) {
	u, ok := ctx.Value(userCtxKey).(User)
	return u, ok
}

// ============================================================================
// BT4 — Password hashing (DEMO: PBKDF2-HMAC-SHA256 + salt, stdlib-only)
// ============================================================================
//
// ⚠ PBKDF2 với 100k iteration ≈ bcrypt cost 10 trên CPU, nhưng GPU-resistant
//   KÉM hơn argon2id. Production: bcrypt.GenerateFromPassword(plain, 12) hoặc
//   argon2.IDKey(...). Đây CHỈ là minh họa để file compile không cần x/crypto.

// hmacSHA256 là helper 1 dòng cho PBKDF2.
func hmacSHA256(key, msg []byte) []byte {
	mac := hmac.New(sha256.New, key)
	mac.Write(msg)
	return mac.Sum(nil)
}

// pbkdf2 derive 32 byte (1 block SHA-256) từ password + salt qua `iter` vòng.
// Đây là PBKDF2-HMAC-SHA256 rút gọn (chỉ block index 1, đủ cho 32 byte output).
func pbkdf2(password string, salt []byte, iter int) []byte {
	// U1 = HMAC(password, salt || INT(1)); Ui = HMAC(password, U(i-1)); out = U1 ^ U2 ^ ...
	block := make([]byte, len(salt)+4)
	copy(block, salt)
	binary.BigEndian.PutUint32(block[len(salt):], 1) // block index = 1

	u := hmacSHA256([]byte(password), block)
	out := make([]byte, len(u))
	copy(out, u)
	for i := 1; i < iter; i++ {
		u = hmacSHA256([]byte(password), u)
		for j := range out {
			out[j] ^= u[j]
		}
	}
	return out
}

// HashPassword tạo chuỗi lưu DB: "pbkdf2$<iter>$<salt-b64>$<hash-b64>".
func HashPassword(plain string) (string, error) {
	salt := make([]byte, 16)
	if _, err := rand.Read(salt); err != nil { // crypto/rand: salt ngẫu nhiên
		return "", err
	}
	const iter = 100_000
	hash := pbkdf2(plain, salt, iter)
	return fmt.Sprintf("pbkdf2$%d$%s$%s", iter,
		base64.RawStdEncoding.EncodeToString(salt),
		base64.RawStdEncoding.EncodeToString(hash)), nil
}

// CheckPassword verify plaintext với chuỗi hash đã lưu, CONSTANT-TIME.
func CheckPassword(plain, encoded string) bool {
	parts := strings.Split(encoded, "$")
	if len(parts) != 4 || parts[0] != "pbkdf2" {
		return false
	}
	iter, err := strconv.Atoi(parts[1])
	if err != nil {
		return false
	}
	salt, err := base64.RawStdEncoding.DecodeString(parts[2])
	if err != nil {
		return false
	}
	expected, err := base64.RawStdEncoding.DecodeString(parts[3])
	if err != nil {
		return false
	}
	got := pbkdf2(plain, salt, iter)
	// subtle.ConstantTimeCompare — KHÔNG dùng == hay bytes.Equal (timing attack).
	return subtle.ConstantTimeCompare(expected, got) == 1
}

// ============================================================================
// BT5 — Login + Refresh token flow (refresh rotation)
// ============================================================================

// refreshStore: refresh token → userID. Production: Redis/DB.
var (
	refreshStore = map[string]string{}
	storeMu      sync.Mutex
)

// userDB: username → password hash (giả lập bảng users). Seed trong main().
var userDB = map[string]string{}

// randomToken sinh chuỗi ngẫu nhiên base64url từ n byte crypto/rand.
func randomToken(n int) string {
	b := make([]byte, n)
	rand.Read(b)
	return base64.RawURLEncoding.EncodeToString(b)
}

// loginHandler: POST /login {user, pass} → {access (JWT 15m), refresh (opaque 32B)}.
func loginHandler(secret []byte) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var body struct {
			User string `json:"user"`
			Pass string `json:"pass"`
		}
		if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
			http.Error(w, "bad body", http.StatusBadRequest)
			return
		}

		hash, ok := userDB[body.User]
		if !ok || !CheckPassword(body.Pass, hash) {
			// Cùng thông báo cho "user không tồn tại" và "sai pass" → không lộ user nào tồn tại.
			http.Error(w, "bad credentials", http.StatusUnauthorized)
			return
		}

		access, err := signJWT(map[string]any{
			"sub":  body.User,
			"role": "user",
			"exp":  time.Now().Add(15 * time.Minute).Unix(), // access NGẮN
			"iat":  time.Now().Unix(),
		}, secret)
		if err != nil {
			http.Error(w, "sign error", http.StatusInternalServerError)
			return
		}

		refresh := randomToken(32) // refresh = opaque, KHÔNG phải JWT
		storeMu.Lock()
		refreshStore[refresh] = body.User
		storeMu.Unlock()

		writeJSON(w, map[string]string{"access": access, "refresh": refresh})
	}
}

// refreshHandler: POST /refresh {refresh} → rotation: invalidate cũ, cấp pair mới.
func refreshHandler(secret []byte) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var body struct {
			Refresh string `json:"refresh"`
		}
		if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
			http.Error(w, "bad body", http.StatusBadRequest)
			return
		}

		storeMu.Lock()
		userID, ok := refreshStore[body.Refresh]
		if ok {
			delete(refreshStore, body.Refresh) // ROTATION: hủy refresh cũ ngay
		}
		storeMu.Unlock()

		if !ok {
			// Refresh không tồn tại / đã bị xoay. Production: nếu format hợp lệ
			// mà không có trong store → nghi reuse → revoke TOÀN BỘ session của user.
			http.Error(w, "invalid refresh", http.StatusUnauthorized)
			return
		}

		newAccess, err := signJWT(map[string]any{
			"sub":  userID,
			"role": "user",
			"exp":  time.Now().Add(15 * time.Minute).Unix(),
			"iat":  time.Now().Unix(),
		}, secret)
		if err != nil {
			http.Error(w, "sign error", http.StatusInternalServerError)
			return
		}

		newRefresh := randomToken(32)
		storeMu.Lock()
		refreshStore[newRefresh] = userID
		storeMu.Unlock()

		writeJSON(w, map[string]string{"access": newAccess, "refresh": newRefresh})
	}
}

func writeJSON(w http.ResponseWriter, v any) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(v)
}

// ============================================================================
// DEMO — main() chạy thử toàn bộ flow bằng httptest (không mở port thật)
// ============================================================================

func main() {
	secret := []byte("a-very-long-secret-at-least-32-bytes!!") // production: env var

	fmt.Println("=== BT1+BT2: sign & verify JWT HS256 ===")
	tok, err := signJWT(map[string]any{
		"sub":  "42",
		"role": "admin",
		"exp":  time.Now().Add(15 * time.Minute).Unix(),
	}, secret)
	must(err)
	fmt.Printf("token (%d ký tự): %s...\n", len(tok), tok[:48])

	claims, err := verifyJWT(tok, secret)
	must(err)
	fmt.Printf("verify OK → sub=%v role=%v\n", claims["sub"], claims["role"])

	// Verify FAIL: sai secret → invalid signature.
	if _, err := verifyJWT(tok, []byte("wrong-secret-wrong-secret-wrong!!")); err != nil {
		fmt.Printf("verify với secret sai → từ chối đúng: %v\n", err)
	}

	// alg:none attack → bị chặn ở verifyJWT.
	noneHeader := base64URLEncode([]byte(`{"alg":"none","typ":"JWT"}`))
	nonePayload := base64URLEncode([]byte(`{"sub":"42","role":"admin"}`))
	noneToken := noneHeader + "." + nonePayload + "."
	if _, err := verifyJWT(noneToken, secret); err != nil {
		fmt.Printf("alg:none attack → bị chặn: %v\n", err)
	}

	// Token hết hạn.
	expTok, _ := signJWT(map[string]any{"sub": "1", "exp": time.Now().Add(-1 * time.Minute).Unix()}, secret)
	if _, err := verifyJWT(expTok, secret); err != nil {
		fmt.Printf("token hết hạn → bị chặn: %v\n", err)
	}

	fmt.Println("\n=== BT4: password hash (PBKDF2 demo) ===")
	hash, err := HashPassword("hunter2")
	must(err)
	fmt.Printf("hash: %s...\n", hash[:40])
	fmt.Printf("CheckPassword('hunter2')   → %v\n", CheckPassword("hunter2", hash))
	fmt.Printf("CheckPassword('wrongpass') → %v\n", CheckPassword("wrongpass", hash))

	fmt.Println("\n=== BT3: AuthMiddleware + context ===")
	protected := AuthMiddleware(secret)(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		u, ok := UserFromContext(r.Context())
		if !ok {
			http.Error(w, "no user", http.StatusInternalServerError)
			return
		}
		fmt.Fprintf(w, "hello %s (role=%s)", u.ID, u.Role)
	}))

	// Request CÓ token hợp lệ.
	req := httptest.NewRequest("GET", "/me", nil)
	req.Header.Set("Authorization", "Bearer "+tok)
	rec := httptest.NewRecorder()
	protected.ServeHTTP(rec, req)
	fmt.Printf("GET /me (có token)  → %d %s\n", rec.Code, rec.Body.String())

	// Request KHÔNG token.
	rec2 := httptest.NewRecorder()
	protected.ServeHTTP(rec2, httptest.NewRequest("GET", "/me", nil))
	fmt.Printf("GET /me (no token)  → %d %s", rec2.Code, rec2.Body.String())

	fmt.Println("\n=== BT5: login + refresh rotation ===")
	// Seed user DB.
	h, _ := HashPassword("s3cret")
	userDB["alice"] = h

	mux := http.NewServeMux()
	mux.Handle("POST /login", loginHandler(secret))
	mux.Handle("POST /refresh", refreshHandler(secret))

	// 1) Login.
	loginResp := doJSON(mux, "POST", "/login", `{"user":"alice","pass":"s3cret"}`)
	fmt.Printf("POST /login → %s\n", short(loginResp))
	var pair struct{ Access, Refresh string }
	json.Unmarshal([]byte(loginResp), &pair)

	// 2) Refresh (rotation).
	refreshResp := doJSON(mux, "POST", "/refresh", `{"refresh":"`+pair.Refresh+`"}`)
	fmt.Printf("POST /refresh → %s\n", short(refreshResp))

	// 3) Dùng lại refresh CŨ → phải bị từ chối (đã bị rotate).
	reuse := doStatus(mux, "POST", "/refresh", `{"refresh":"`+pair.Refresh+`"}`)
	fmt.Printf("POST /refresh (token cũ, reuse) → HTTP %d (đúng kỳ vọng 401)\n", reuse)

	// 4) Login sai pass → 401.
	badLogin := doStatus(mux, "POST", "/login", `{"user":"alice","pass":"wrong"}`)
	fmt.Printf("POST /login (sai pass) → HTTP %d (đúng kỳ vọng 401)\n", badLogin)

	fmt.Println("\n✓ Tất cả demo chạy xong.")
}

// --- helper cho demo ---

func must(err error) {
	if err != nil {
		panic(err)
	}
}

func doJSON(h http.Handler, method, path, body string) string {
	rec := httptest.NewRecorder()
	req := httptest.NewRequest(method, path, strings.NewReader(body))
	h.ServeHTTP(rec, req)
	return strings.TrimSpace(rec.Body.String())
}

func doStatus(h http.Handler, method, path, body string) int {
	rec := httptest.NewRecorder()
	req := httptest.NewRequest(method, path, strings.NewReader(body))
	h.ServeHTTP(rec, req)
	return rec.Code
}

func short(s string) string {
	if len(s) > 90 {
		return s[:90] + "..."
	}
	return s
}
