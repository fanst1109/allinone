// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Algorithms/lesson-46-number-theory-algos/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 46 — Thuật toán số học (Number Theory): GCD, sàng nguyên tố, modular arithmetic, fast exponentiation

> **Tier 7 — Nâng cao & chuyên đề.** Sau Bit Manipulation (L45) làm việc trên bit của một số, bài này làm việc với **tính chất số học** của số nguyên: ước chung, số nguyên tố, phép tính theo modulo. Đây là nền tảng cho hashing (rolling hash ở [L40](../lesson-40-string-matching-rabin-karp/)), mật mã (RSA), và bài toán đếm tổ hợp lớn \`mod p\` — thứ xuất hiện dày đặc trong competitive programming và phỏng vấn.

## Mục tiêu học tập

Sau bài này, bạn sẽ:

- Tính **GCD** bằng thuật toán Euclid \`O(log min(a,b))\` và hiểu vì sao nó nhanh; suy ra **LCM**.
- Dùng **Extended Euclid** tìm \`x, y\` thỏa \`ax + by = gcd(a,b)\` — nền tảng cho modular inverse.
- Kiểm tra số nguyên tố \`O(√n)\`; tìm mọi nguyên tố \`≤ n\` bằng **sàng Eratosthenes** \`O(n log log n)\`; biết tới **sàng tuyến tính**.
- **Phân tích thừa số nguyên tố**: trial division \`O(√n)\` và dùng **smallest prime factor (SPF)** để factor một số \`O(log n)\`.
- Làm chủ **modular arithmetic**: cộng/nhân theo \`mod\`, tránh tràn số (overflow), hiểu vì sao bài toán bắt ta lấy \`mod 10⁹+7\`.
- **Fast exponentiation** (binary exponentiation): tính \`aⁿ mod m\` trong \`O(log n)\`.
- **Modular inverse**: tìm \`a⁻¹ mod m\` bằng Fermat (khi \`m\` nguyên tố) hoặc Extended Euclid.
- Giới thiệu **Chinese Remainder Theorem (CRT)**, **Euler's totient** \`φ(n)\`, và **combinatorics modular** (tính \`C(n,k) mod p\`).

## Kiến thức tiền đề

- [Lesson 17 — Divide and Conquer](../lesson-17-divide-and-conquer/) — fast exponentiation là một dạng chia-để-trị trên số mũ.
- [Lesson 01 — Big-O & Asymptotic](../lesson-01-bigo-asymptotic/) — đọc \`O(log n)\`, \`O(√n)\`, \`O(n log log n)\`.
- [Lesson 40 — String Matching (Rabin-Karp)](../lesson-40-string-matching-rabin-karp/) — rolling hash dùng modular arithmetic mà bài này giải thích.
- Lesson 45 — Bit Manipulation — fast exponentiation duyệt bit của số mũ.

---

## 0. Đặt vấn đề: ba câu hỏi xuyên suốt bài

Ta sẽ đóng đủ ba câu hỏi này trước khi kết thúc bài:

1. **"Tính \`3¹³ mod 1000000007\` mà số mũ là 10⁹ thì làm sao?"** — không thể nhân 10⁹ lần. Cần fast exponentiation \`O(log n)\` (mục 5).
2. **"Bài bảo in \`C(1000000, 500000) mod 10⁹+7\` — số đó có hàng trăm nghìn chữ số, lưu kiểu gì?"** — không lưu số thật, chỉ giữ phần dư \`mod p\`, và "chia" trong modular bằng modular inverse (mục 6, 8).
3. **"\`(big1 * big2) % m\` trong Go cho kết quả sai, vì sao?"** — tràn \`int64\` khi nhân hai số gần \`m ≈ 10⁹\`. Cần cast hoặc \`big.Int\` (mục 4, 11).

> 💡 **Trực giác chung.** Số học modulo giống như **đồng hồ**: trên đồng hồ 12 giờ, \`10 + 5 = 3\` (không phải 15) vì ta quay vòng. Mọi phép \`+\`, \`−\`, \`×\` đều "quay vòng" tại \`m\`. Điều kỳ diệu: cộng/trừ/nhân **giao hoán với phép lấy dư** — bạn có thể lấy dư bất cứ lúc nào mà kết quả cuối không đổi. Nhờ đó số không bao giờ phình to quá \`m\`.

---

## 1. GCD & LCM — thuật toán Euclid

### 1.1 GCD bằng Euclid

**GCD(a, b)** (ước chung lớn nhất — greatest common divisor) là số nguyên dương lớn nhất chia hết cả \`a\` và \`b\`.

> 💡 **Trực giác.** Lát một hình chữ nhật \`a × b\` bằng các ô vuông bằng nhau lớn nhất có thể — cạnh ô vuông đó chính là \`gcd(a,b)\`. Thuật toán Euclid: liên tục cắt hình vuông lớn nhất ra khỏi hình chữ nhật, phần còn lại nhỏ dần, tới khi thành hình vuông hoàn hảo.

**Định lý Euclid:** \`gcd(a, b) = gcd(b, a mod b)\`, và \`gcd(a, 0) = a\`.

Vì sao đúng? Mọi ước chung của \`a, b\` cũng là ước chung của \`b\` và \`a − k·b = a mod b\` (vì nếu \`d | a\` và \`d | b\` thì \`d | (a − kb)\`). Nên tập ước chung không đổi qua mỗi bước → GCD không đổi.

**Walk-through \`gcd(48, 18)\`:**

| Bước | a | b | a mod b |
|------|----|----|---------|
| 1 | 48 | 18 | 48 mod 18 = **12** |
| 2 | 18 | 12 | 18 mod 12 = **6** |
| 3 | 12 | 6 | 12 mod 6 = **0** |
| 4 | 6 | 0 | dừng → gcd = **6** |

Kiểm tra: \`48 = 6·8\`, \`18 = 6·3\`, và \`gcd(8,3)=1\` → 6 đúng là ước chung lớn nhất. ✓

**Bốn ví dụ số:**

- \`gcd(48, 18) = 6\` (xem trên).
- \`gcd(17, 5)\`: \`17 mod 5 = 2 → 5 mod 2 = 1 → 2 mod 1 = 0\` → **1** (17 nguyên tố, 5 nguyên tố → coprime).
- \`gcd(100, 75)\`: \`100 mod 75 = 25 → 75 mod 25 = 0\` → **25**.
- \`gcd(0, 9) = 9\` (theo định nghĩa \`gcd(a,0)=a\`; ở đây \`gcd(0,9)=gcd(9,0)=9\`).

> ⚠ **Lỗi thường gặp.** \`gcd(0, 0)\` không xác định (về mặt toán) — code thường trả 0; cẩn thận khi dùng làm mẫu số. Với số âm, GCD theo quy ước là số dương: dùng \`abs\` trước.

\`\`\`go
// gcd: thuật toán Euclid, O(log min(a,b)).
// Mỗi bước số nhỏ ít nhất giảm còn một nửa sau 2 vòng → log bước.
func gcd(a, b int) int {
    for b != 0 {
        a, b = b, a%b // a ← b, b ← a mod b
    }
    return a
}

// gcd đệ quy (tương đương, ngắn gọn hơn)
func gcdRec(a, b int) int {
    if b == 0 {
        return a
    }
    return gcdRec(b, a%b)
}
\`\`\`

> ❓ **Câu hỏi tự nhiên.**
> - *"Vì sao là \`O(log)\` chứ không phải \`O(a)\`?"* — Sau mỗi 2 bước, số lớn giảm ít nhất một nửa (định lý Lamé liên hệ với dãy Fibonacci). Trường hợp xấu nhất là hai số Fibonacci liên tiếp.
> - *"\`a < b\` thì sao?"* — Bước đầu \`a mod b = a\`, nên \`a, b = b, a\` tự hoán đổi. Không cần xử lý riêng.

### 1.2 LCM (bội chung nhỏ nhất)

**LCM(a, b)** = \`a · b / gcd(a, b)\`. Vì sao? \`a·b\` đếm thừa số chung hai lần; chia bớt một lần \`gcd\` để lấy bội chung nhỏ nhất.

\`\`\`go
// lcm: chia trước khi nhân để giảm nguy cơ tràn số.
func lcm(a, b int) int {
    return a / gcd(a, b) * b // a/gcd nguyên rồi mới nhân b
}
\`\`\`

**Bốn ví dụ:** \`lcm(4,6)=4/2*6=12\`; \`lcm(3,5)=15\`; \`lcm(12,18)=12/6*18=36\`; \`lcm(7,7)=7\`.

> ⚠ **Lỗi thường gặp.** Viết \`a*b/gcd(a,b)\` dễ tràn khi \`a, b\` lớn. Luôn \`a/gcd*b\` (chia trước).

### 1.3 Extended Euclid

Tìm \`x, y\` sao cho \`a·x + b·y = gcd(a, b)\` (đẳng thức Bézout). Cần cho **modular inverse** (mục 6).

> 💡 **Trực giác.** Euclid thường chỉ trả về \`gcd\`. Extended Euclid "truy ngược" các bước chia để biểu diễn \`gcd\` thành tổ hợp tuyến tính của \`a, b\`.

\`\`\`go
// extGCD trả (g, x, y) với a*x + b*y = g = gcd(a,b).
func extGCD(a, b int) (int, int, int) {
    if b == 0 {
        return a, 1, 0 // a*1 + 0*0 = a
    }
    g, x1, y1 := extGCD(b, a%b)
    // a%b = a - (a/b)*b → suy ngược hệ số
    x := y1
    y := x1 - (a/b)*y1
    return g, x, y
}
\`\`\`

**Walk-through \`extGCD(30, 12)\`:** gcd = 6.

- \`extGCD(30,12)\` gọi \`extGCD(12, 6)\` gọi \`extGCD(6, 0)\` → trả \`(6, 1, 0)\`.
- Quay về \`extGCD(12,6)\`: \`g=6, x1=1, y1=0\` → \`x=0, y=1-(12/6)*0=1\`. Kiểm: \`12·0 + 6·1 = 6\` ✓.
- Quay về \`extGCD(30,12)\`: \`g=6, x1=0, y1=1\` → \`x=1, y=0-(30/12)*1 = -2\`. Kiểm: \`30·1 + 12·(-2) = 30-24 = 6\` ✓.

Kết quả: \`x=1, y=-2\`.

> 📝 **Tóm tắt mục 1.** GCD bằng Euclid \`O(log min)\`; LCM = \`a/gcd*b\`; Extended Euclid cho \`(x,y)\` thỏa Bézout — chìa khóa của modular inverse.

---

## 2. Số nguyên tố

### 2.1 Kiểm tra nguyên tố \`O(√n)\`

> 💡 **Trực giác.** Nếu \`n = p·q\` thì ít nhất một trong \`p, q\` phải \`≤ √n\` (vì nếu cả hai \`> √n\` thì tích \`> n\`). Nên chỉ cần thử ước tới \`√n\`.

\`\`\`go
// isPrime: O(√n). Bỏ qua chẵn sau khi loại 2.
func isPrime(n int) bool {
    if n < 2 {
        return false
    }
    if n%2 == 0 {
        return n == 2 // 2 là nguyên tố, mọi chẵn khác thì không
    }
    for i := 3; i*i <= n; i += 2 { // chỉ thử số lẻ
        if n%i == 0 {
            return false
        }
    }
    return true
}
\`\`\`

**Bốn ví dụ:** \`isPrime(2)=true\`; \`isPrime(15)=false\` (15=3·5, dừng ở i=3); \`isPrime(17)=true\` (thử 3 vì \`3·3=9≤17\`, \`5·5=25>17\` dừng); \`isPrime(1)=false\`.

> ⚠ **Lỗi thường gặp.** Quên \`n < 2 → false\` (0 và 1 không nguyên tố). Quên điều kiện \`i*i <= n\` (viết \`i <= sqrt(n)\` dễ sai do float).

### 2.2 Sàng Eratosthenes \`O(n log log n)\`

Tìm **mọi** nguyên tố \`≤ n\`. Ý tưởng: bắt đầu với mọi số là "nguyên tố", rồi gạch bỏ bội của từng nguyên tố tìm được.

**Walk-through sàng tới 30:** đánh dấu \`isComposite\`. Bắt đầu từ 2.

- **p=2** (nguyên tố): gạch 4,6,8,...,30.
- **p=3** (chưa bị gạch → nguyên tố): gạch 9,12,15,18,21,24,27,30 (bắt đầu từ \`3·3=9\`).
- **p=4** đã bị gạch → bỏ qua.
- **p=5**: gạch 25,30 (từ \`5·5=25\`; \`5·5=25 ≤ 30\`).
- **p=6** gạch; **p>√30≈5.47** dừng vòng ngoài.

Còn lại (không bị gạch): **2,3,5,7,11,13,17,19,23,29** — đúng 10 nguyên tố \`≤ 30\`. ✓

> ❓ **Câu hỏi tự nhiên.**
> - *"Vì sao gạch từ \`p·p\` mà không từ \`2p\`?"* — Các bội \`2p, 3p, ..., (p-1)p\` đã bị gạch bởi nguyên tố nhỏ hơn rồi. Bắt đầu từ \`p²\` tiết kiệm.
> - *"Vì sao \`O(n log log n)\` chứ không \`O(n log n)\`?"* — Tổng \`n/2 + n/3 + n/5 + ...\` (theo nguyên tố) hội tụ về \`n·ln ln n\` — chứng minh Mertens.

\`\`\`go
// sieve trả slice bool: isPrime[i] = true nếu i nguyên tố, i ≤ n.
// Độ phức tạp O(n log log n), bộ nhớ O(n).
func sieve(n int) []bool {
    isPrime := make([]bool, n+1)
    for i := 2; i <= n; i++ {
        isPrime[i] = true
    }
    for p := 2; p*p <= n; p++ { // chỉ cần tới √n
        if isPrime[p] {
            for m := p * p; m <= n; m += p { // gạch bội từ p²
                isPrime[m] = false
            }
        }
    }
    return isPrime
}
\`\`\`

> ⚠ **Lỗi thường gặp (off-by-one).** \`make([]bool, n+1)\` để index \`n\` hợp lệ; vòng \`p*p <= n\`, gạch \`m <= n\`. Sai một dấu \`<\` thành \`<=\` ở \`p*p\` thì bỏ sót khi \`p*p == n\`.

### 2.3 Sàng tuyến tính (nhắc qua)

Sàng Eratosthenes gạch một hợp số nhiều lần (12 bị gạch bởi 2 và 3). **Sàng tuyến tính** \`O(n)\` đảm bảo mỗi hợp số bị gạch **đúng một lần** bởi smallest prime factor của nó, đồng thời tính luôn mảng SPF (mục 3). Đổi lại code phức tạp hơn; với \`n ≤ 10⁷\` sàng Eratosthenes thường đã đủ nhanh.

> 📝 **Tóm tắt mục 2.** Kiểm tra một số: \`O(√n)\`. Tìm mọi nguyên tố \`≤ n\`: sàng Eratosthenes \`O(n log log n)\`, gạch bội từ \`p²\`. Sàng tuyến tính \`O(n)\` cho thêm SPF.

---

## 3. Phân tích thừa số nguyên tố (factorization)

### 3.1 Trial division \`O(√n)\`

\`\`\`go
// factorize: trả map[prime]exponent. O(√n).
func factorize(n int) map[int]int {
    factors := map[int]int{}
    for d := 2; d*d <= n; d++ {
        for n%d == 0 { // rút hết thừa số d
            factors[d]++
            n /= d
        }
    }
    if n > 1 { // phần còn lại là một nguyên tố > √n
        factors[n]++
    }
    return factors
}
\`\`\`

**Bốn ví dụ:**
- \`360 = 2³·3²·5\` → \`{2:3, 3:2, 5:1}\`.
- \`97\` → \`{97:1}\` (nguyên tố, vòng for không tìm ước nào, \`n>1\` ở cuối bắt được).
- \`100 = 2²·5²\` → \`{2:2, 5:2}\`.
- \`13·13 = 169\` → \`{13:2}\`.

> ⚠ **Lỗi thường gặp.** Quên dòng \`if n > 1\` cuối → bỏ sót thừa số nguyên tố lớn hơn \`√n\` (ví dụ \`n=14=2·7\`, sau khi rút 2 còn \`n=7 > √14\`, phải bắt riêng).

### 3.2 Factor \`O(log n)\` bằng SPF

Nếu cần factor **nhiều** số \`≤ N\`, tiền xử lý mảng **smallest prime factor** \`spf[i]\` (ước nguyên tố nhỏ nhất của \`i\`) bằng một biến thể sàng \`O(N log log N)\`. Sau đó factor mỗi số chỉ tốn \`O(log n)\`:

\`\`\`go
// buildSPF: spf[i] = ước nguyên tố nhỏ nhất của i, cho i ≤ N.
func buildSPF(N int) []int {
    spf := make([]int, N+1)
    for i := 2; i <= N; i++ {
        if spf[i] == 0 { // i nguyên tố
            for m := i; m <= N; m += i {
                if spf[m] == 0 {
                    spf[m] = i // chỉ ghi lần đầu → giữ ước nhỏ nhất
                }
            }
        }
    }
    return spf
}

// factorFast: dùng spf, mỗi lần chia bớt spf[n] → O(log n).
func factorFast(n int, spf []int) map[int]int {
    factors := map[int]int{}
    for n > 1 {
        p := spf[n]
        for n%p == 0 {
            factors[p]++
            n /= p
        }
    }
    return factors
}
\`\`\`

**Walk-through \`factorFast(360)\`:** \`spf[360]=2\` → chia hết 2 ba lần → \`n=45\`; \`spf[45]=3\` → chia hai lần → \`n=5\`; \`spf[5]=5\` → một lần → \`n=1\`. Kết quả \`{2:3,3:2,5:1}\`, chỉ ~6 phép chia.

> 📝 **Tóm tắt mục 3.** Một số: trial division \`O(√n)\`. Nhiều số: tiền xử lý SPF rồi factor \`O(log n)\` mỗi số.

---

## 4. Modular arithmetic — số học theo modulo

### 4.1 Quy tắc cơ bản

Với mọi \`a, b\` và modulo \`m\`:

- \`(a + b) mod m = ((a mod m) + (b mod m)) mod m\`
- \`(a − b) mod m = ((a mod m) − (b mod m) + m) mod m\` ← \`+m\` để tránh âm
- \`(a · b) mod m = ((a mod m) · (b mod m)) mod m\`

> 💡 **Vì sao cần?** Nhiều bài yêu cầu in kết quả \`mod 10⁹+7\` chính vì **kết quả thật quá lớn** (giai thừa, số đường đi, số cấu hình). Lấy mod ở mỗi bước giữ số luôn \`< m\`, vừa khít \`int64\`, vẫn cho đáp án "dấu vân tay" duy nhất so khớp được. \`10⁹+7\` được chọn vì là **số nguyên tố** (cần cho modular inverse) và đủ lớn để hạn chế va chạm.

**Bốn ví dụ (m=7):** \`(5+6) mod 7 = 11 mod 7 = 4\`; \`(3·4) mod 7 = 12 mod 7 = 5\`; \`(2−5) mod 7\`: \`(2-5+7) mod 7 = 4\`; \`(100) mod 7 = 2\`.

### 4.2 Số âm mod trong Go — cạm bẫy lớn

Trong Go (và C/Java), \`%\` lấy dư **giữ dấu của số bị chia**:

\`\`\`go
fmt.Println(-7 % 3) // = -1, KHÔNG phải 2
\`\`\`

Toán học muốn \`-7 mod 3 = 2\` (trong \`[0, m)\`). Sửa bằng:

\`\`\`go
// mod chuẩn hóa về [0, m)
func mod(a, m int) int {
    return ((a % m) + m) % m
}
// mod(-7, 3) = ((-1)+3)%3 = 2 ✓
\`\`\`

> ⚠ **Lỗi thường gặp.** Quên chuẩn hóa khi trừ → index âm, hash sai, modular inverse sai. Mọi phép trừ trong modular phải \`((a-b)%m + m) % m\`.

### 4.3 Tràn số khi nhân

Với \`m ≈ 10⁹+7\`, hai số gần \`m\` nhân nhau ≈ \`10¹⁸\` — sát trần \`int64\` (\`9.2·10¹⁸\`). An toàn nếu cast \`int64\`, nhưng nếu \`m\` lớn hơn (≈ \`10¹⁸\`) thì tích \`10³⁶\` **tràn** → dùng \`math/big\` hoặc mulmod kiểu Russian peasant.

\`\`\`go
import "math/big" // khi m quá lớn

// mulmod an toàn cho m tới ~10^18 dùng big.Int
func mulmod(a, b, m int64) int64 {
    res := new(big.Int).Mul(big.NewInt(a), big.NewInt(b))
    res.Mod(res, big.NewInt(m))
    return res.Int64()
}
\`\`\`

> 📝 **Tóm tắt mục 4.** Cộng/trừ/nhân giao hoán với mod → lấy mod sớm để số không phình. Trong Go nhớ \`((a%m)+m)%m\` cho số âm; cẩn thận tràn khi \`m\` lớn.

---

## 5. Fast exponentiation (binary exponentiation)

Tính \`aⁿ mod m\` trong \`O(log n)\` thay vì \`O(n)\` phép nhân.

> 💡 **Trực giác.** \`a¹³ = a^(8+4+1) = a⁸·a⁴·a¹\` (vì \`13 = 1101₂\`). Bình phương liên tiếp cho \`a, a², a⁴, a⁸, ...\` (chỉ \`log n\` lần bình phương), rồi nhân những lũy thừa ứng với bit \`1\` của \`n\`. Đây chính là **chia để trị** trên số mũ (xem [L17](../lesson-17-divide-and-conquer/)): \`aⁿ = (a^{n/2})²\` nếu \`n\` chẵn.

**Walk-through \`3¹³ mod 1000\` (\`13 = 1101₂\`):**

| n (còn lại) | bit | base (=3^{2^k}) | result |
|----|----|----|----|
| 13 (\`...1\`) | 1 | 3 | 1·3 = **3** |
| 6 (\`...0\`) | 0 | 3²=9 | 3 (không nhân) |
| 3 (\`...1\`) | 1 | 9²=81 | 3·81 = **243** |
| 1 (\`...1\`) | 1 | 81²=6561→561 | 243·561=136323→**323** |
| 0 | — | — | dừng |

Kết quả \`3¹³ mod 1000 = 323\`. Kiểm tra: \`3¹³ = 1594323\`, \`1594323 mod 1000 = 323\` ✓. Chỉ **4 vòng** thay vì 13 phép nhân.

\`\`\`go
// power tính a^n mod m trong O(log n).
// Duyệt bit của n: bit 1 → nhân base hiện tại vào result; luôn bình phương base.
func power(a, n, m int64) int64 {
    a %= m
    var result int64 = 1
    for n > 0 {
        if n&1 == 1 { // bit thấp = 1
            result = result * a % m
        }
        a = a * a % m // bình phương base
        n >>= 1       // bỏ bit thấp
    }
    return result
}
\`\`\`

**Bốn ví dụ:** \`power(2,10,1000)=1024 mod 1000=24\`; \`power(3,13,1000)=323\`; \`power(5,0,7)=1\` (mũ 0 = 1); \`power(7,1,5)=2\`.

> ❓ **Câu hỏi tự nhiên.** *"Số mũ 10⁹ thì sao?"* — \`log₂(10⁹) ≈ 30\` vòng → tức thì. Đây là lý do RSA mã hóa được với số mũ khổng lồ.

> 📝 **Tóm tắt mục 5.** \`aⁿ mod m\` trong \`O(log n)\` bằng bình phương-và-nhân theo bit của \`n\`. Nền tảng cho modular inverse và RSA.

---

## 6. Modular inverse — phép "chia" trong modular

Trong modular **không có phép chia trực tiếp**. \`a⁻¹ mod m\` là số \`x\` sao cho \`a·x ≡ 1 (mod m)\`. Khi đó "chia cho a" = "nhân với \`a⁻¹\`".

> ⚠ **Điều kiện tồn tại.** \`a⁻¹ mod m\` **chỉ tồn tại khi \`gcd(a, m) = 1\`** (a và m nguyên tố cùng nhau). Nếu \`gcd > 1\` thì không có nghịch đảo.

### 6.1 Cách 1 — Fermat (khi \`m\` nguyên tố)

**Định lý Fermat nhỏ:** nếu \`m\` nguyên tố và \`a\` không chia hết cho \`m\`, thì \`a^(m-1) ≡ 1 (mod m)\`. Suy ra \`a^(m-2) ≡ a⁻¹ (mod m)\`.

\`\`\`go
// modInverse khi m nguyên tố: a^(m-2) mod m, dùng fast power.
func modInverse(a, m int64) int64 {
    return power(a, m-2, m)
}
\`\`\`

**Ví dụ \`m=7\`:** \`inv(3) = 3^5 mod 7 = 243 mod 7 = 5\`. Kiểm: \`3·5 = 15 ≡ 1 (mod 7)\` ✓.
Thêm: \`inv(2) mod 7 = 2^5 = 32 mod 7 = 4\` (\`2·4=8≡1\`); \`inv(4) mod 7 = 4^5=1024 mod 7 = 2\` (\`4·2=8≡1\`); \`inv(5) mod 7 = 5^5=3125 mod 7=3\` (\`5·3=15≡1\`).

> ⚠ **Lỗi thường gặp.** Fermat **yêu cầu \`m\` nguyên tố**. Với \`m\` hợp số phải dùng Euler (\`a^(φ(m)-1)\`) hoặc Extended Euclid.

### 6.2 Cách 2 — Extended Euclid (m bất kỳ, cần gcd=1)

\`a·x + m·y = 1\` → \`a·x ≡ 1 (mod m)\` → \`x mod m\` là nghịch đảo.

\`\`\`go
// modInverseExt: dùng được cả khi m không nguyên tố (miễn gcd(a,m)=1).
func modInverseExt(a, m int) int {
    g, x, _ := extGCD(a, m)
    if g != 1 {
        return -1 // không tồn tại nghịch đảo
    }
    return ((x % m) + m) % m // chuẩn hóa về [0,m)
}
\`\`\`

**Ví dụ:** \`modInverseExt(3, 11)\`: \`extGCD(3,11)\` cho \`g=1, x=4\` (\`3·4=12≡1 mod 11\`) → trả 4. ✓

> 📝 **Tóm tắt mục 6.** \`a⁻¹ mod m\` tồn tại ⟺ \`gcd(a,m)=1\`. \`m\` nguyên tố → Fermat \`a^(m-2)\`. \`m\` bất kỳ → Extended Euclid. Đây là cách "chia" trong combinatorics modular.

---

## 7. Chinese Remainder Theorem (CRT) — nhắc + ví dụ

**Bài toán:** giải hệ đồng dư
\`\`\`
x ≡ a₁ (mod n₁)
x ≡ a₂ (mod n₂)
...
\`\`\`
khi các \`nᵢ\` đôi một nguyên tố cùng nhau, tồn tại nghiệm duy nhất \`mod (n₁·n₂·...)\`.

> 💡 **Trực giác.** Biết "số dư khi chia 3" và "số dư khi chia 5" thì xác định duy nhất số đó trong \`[0, 15)\`. CRT cho phép ghép các "góc nhìn modulo nhỏ" thành một số lớn.

**Ví dụ kinh điển:** tìm \`x\` với \`x ≡ 2 (mod 3)\`, \`x ≡ 3 (mod 5)\`, \`x ≡ 2 (mod 7)\`.

- Thử: \`x=23\`. \`23 mod 3 = 2\` ✓, \`23 mod 5 = 3\` ✓, \`23 mod 7 = 2\` ✓. Nghiệm \`x ≡ 23 (mod 105)\`.

Công thức (2 phương trình): \`x ≡ a₁ + n₁·t (mod n₁n₂)\` với \`t = (a₂−a₁)·inv(n₁, n₂) mod n₂\`.

\`\`\`go
// crt2 giải x ≡ a1 (mod n1), x ≡ a2 (mod n2), gcd(n1,n2)=1.
// Trả (x, n1*n2).
func crt2(a1, n1, a2, n2 int) (int, int) {
    inv := modInverseExt(n1%n2, n2) // inv của n1 theo mod n2
    t := ((a2-a1)%n2*inv%n2 + n2) % n2
    x := a1 + n1*t
    M := n1 * n2
    return ((x % M) + M) % M, M
}
\`\`\`

Ứng dụng: ghép kết quả tính \`mod p1\`, \`mod p2\` để khôi phục số lớn (tránh tràn), hoặc tính \`mod\` của một số hợp số bằng cách tách thành các thừa số nguyên tố.

> 📝 **Tóm tắt mục 7.** CRT ghép nhiều đồng dư (modulo coprime) thành một nghiệm duy nhất mod tích. Dùng để "tránh tràn" và giải bài toán lịch/chu kỳ.

---

## 8. Combinatorics modular — tính \`C(n, k) mod p\`

\`C(n,k) = n! / (k!·(n−k)!)\`. Vì có phép **chia**, trong modular ta nhân với **modular inverse** của mẫu số.

> 💡 **Trực giác.** Precompute mảng giai thừa \`fact[i] = i! mod p\` và **inverse factorial** \`invFact[i] = (i!)⁻¹ mod p\`. Khi đó \`C(n,k) = fact[n]·invFact[k]·invFact[n-k] mod p\` — mỗi truy vấn \`O(1)\` sau tiền xử lý \`O(n)\`.

\`\`\`go
const MOD = 1000000007

// precomputeFactorials: fact[i]=i! mod p, invFact[i]=(i!)^{-1} mod p, cho i ≤ n.
func precomputeFactorials(n int) (fact, invFact []int64) {
    fact = make([]int64, n+1)
    invFact = make([]int64, n+1)
    fact[0] = 1
    for i := 1; i <= n; i++ {
        fact[i] = fact[i-1] * int64(i) % MOD
    }
    // invFact[n] = (n!)^{-1} bằng Fermat, rồi truy ngược: invFact[i-1]=invFact[i]*i
    invFact[n] = power(fact[n], MOD-2, MOD)
    for i := n; i >= 1; i-- {
        invFact[i-1] = invFact[i] * int64(i) % MOD
    }
    return
}

// nCk: C(n,k) mod p trong O(1) sau precompute.
func nCk(n, k int, fact, invFact []int64) int64 {
    if k < 0 || k > n {
        return 0
    }
    return fact[n] * invFact[k] % MOD * invFact[n-k] % MOD
}
\`\`\`

**Walk-through \`C(5,2) mod 10⁹+7\`:** \`fact[5]=120\`, \`invFact[2]=(2!)⁻¹=inv(2)\`, \`invFact[3]=(3!)⁻¹=inv(6)\`. \`C=120 · inv(2) · inv(6) = 120/(2·6) = 120/12 = 10\`. ✓

**Bốn ví dụ:** \`C(5,2)=10\`; \`C(5,0)=1\`; \`C(10,5)=252\`; \`C(n,k)=0\` khi \`k>n\`.

> ❓ **Câu hỏi tự nhiên.** *"Vì sao precompute invFact lại đi ngược?"* — \`invFact[i-1] = invFact[i]·i\` vì \`(i-1)! = i!/i → ((i-1)!)⁻¹ = (i!)⁻¹·i\`. Chỉ tốn **một** lần fast power (cho \`invFact[n]\`), phần còn lại \`O(n)\` phép nhân thay vì \`n\` lần fast power.

> 📝 **Tóm tắt mục 8.** Precompute \`fact\` + \`invFact\` \`O(n)\` (một fast power) → mỗi \`C(n,k) mod p\` là \`O(1)\`. Chia trong modular = nhân với inverse.

---

## 9. Ứng dụng thực tế

- **Hashing (rolling hash, [L40](../lesson-40-string-matching-rabin-karp/)).** Rabin-Karp tính hash chuỗi \`Σ s[i]·B^{n-1-i} mod m\`. Cần modular arithmetic để hash không phình, và để "trượt cửa sổ" phải nhân \`B^{-1}\` (modular inverse) hoặc nhân lùi \`B\`. Va chạm hiếm khi \`m\` nguyên tố lớn.
- **Cryptography (RSA).** Mã hóa \`c = mᵉ mod n\`, giải mã \`m = cᵈ mod n\` — đều là **fast exponentiation** với số mũ khổng lồ. Khóa \`d = e⁻¹ mod φ(n)\` là **modular inverse**. Bảo mật dựa trên việc factor \`n\` (tích hai nguyên tố lớn) là khó.
- **Đếm tổ hợp lớn \`mod p\`.** Số đường đi trên lưới, số hoán vị, Catalan number... thường khổng lồ → in \`mod 10⁹+7\` (mục 8).
- **GCD trong phân số & chu kỳ.** Rút gọn phân số \`a/b\` chia cả hai cho \`gcd(a,b)\`. Tìm chu kỳ chung của hai sự kiện lặp = \`lcm\`. Khi nào hai bánh răng \`m, n\` răng trở lại vị trí đầu = \`lcm(m,n)\` vòng.

> 🔁 **Dừng lại tự kiểm tra.** Hai đèn nhấp nháy mỗi 6s và 8s, cùng sáng lúc t=0. Bao lâu lại cùng sáng?
> <details><summary>Đáp án</summary>\`lcm(6,8) = 6/gcd(6,8)*8 = 6/2*8 = 24\` giây.</details>

---

## 10. Euler's totient φ(n)

**φ(n)** đếm số nguyên trong \`[1, n]\` **nguyên tố cùng nhau** với \`n\` (gcd = 1).

> 💡 **Trực giác.** φ(n) đếm "số phần tử khả nghịch" modulo \`n\` — tức bao nhiêu số có modular inverse mod \`n\`. Với \`n\` nguyên tố, mọi số \`1..n-1\` đều coprime → \`φ(p) = p-1\`.

**Công thức:** nếu \`n = p₁^{e₁}·...·p_k^{e_k}\` thì
\`\`\`
φ(n) = n · ∏ (1 − 1/pᵢ)
\`\`\`

**Bốn ví dụ:**
- \`φ(7) = 7-1 = 6\` (nguyên tố).
- \`φ(10) = 10·(1−1/2)·(1−1/5) = 10·½·⅘ = 4\` (các số 1,3,7,9).
- \`φ(9) = 9·(1−1/3) = 6\` (\`9=3²\`; các số 1,2,4,5,7,8).
- \`φ(12) = 12·(1−1/2)·(1−1/3) = 12·½·⅔ = 4\` (1,5,7,11).

\`\`\`go
// eulerPhi tính φ(n) qua phân tích thừa số, O(√n).
func eulerPhi(n int) int {
    result := n
    for p := 2; p*p <= n; p++ {
        if n%p == 0 {
            for n%p == 0 {
                n /= p
            }
            result -= result / p // nhân (1 - 1/p)
        }
    }
    if n > 1 { // thừa số nguyên tố còn lại
        result -= result / n
    }
    return result
}
\`\`\`

**Tính φ cho mọi \`i ≤ n\` qua sàng** (giống sàng Eratosthenes, \`O(n log log n)\`):

\`\`\`go
// phiSieve trả phi[i]=φ(i) cho i ≤ n.
func phiSieve(n int) []int {
    phi := make([]int, n+1)
    for i := 0; i <= n; i++ {
        phi[i] = i
    }
    for p := 2; p <= n; p++ {
        if phi[p] == p { // p nguyên tố (chưa bị giảm)
            for m := p; m <= n; m += p {
                phi[m] -= phi[m] / p
            }
        }
    }
    return phi
}
\`\`\`

> ❓ **Câu hỏi tự nhiên.** *"φ liên quan gì tới inverse?"* — Euler tổng quát Fermat: \`a^{φ(m)} ≡ 1 (mod m)\` khi \`gcd(a,m)=1\`, nên \`a⁻¹ ≡ a^{φ(m)-1}\`. Dùng được cả khi \`m\` hợp số (Fermat chỉ khi \`m\` nguyên tố).

> 📝 **Tóm tắt mục 10.** \`φ(n)\` đếm số coprime \`≤ n\`; \`φ(p)=p-1\`; công thức tích \`n·∏(1-1/pᵢ)\`; tính hàng loạt qua sàng. Tổng quát Fermat → Euler.

---

## 11. Cạm bẫy thường gặp (tổng hợp)

| Cạm bẫy | Hậu quả | Cách tránh |
|---------|---------|-----------|
| \`a*b % m\` tràn \`int64\` | Kết quả sai âm thầm | Cast \`int64\`; nếu \`m\` lớn dùng \`big.Int\` / mulmod |
| \`-7 % 3 == -1\` trong Go | Index/hash âm | Luôn \`((a%m)+m)%m\` cho số có thể âm |
| Modular inverse khi \`gcd(a,m)≠1\` | Không tồn tại, code trả rác | Kiểm \`gcd=1\` trước; dùng Extended Euclid trả -1 |
| Fermat với \`m\` hợp số | \`a^(m-2)\` không phải inverse | Chỉ dùng Fermat khi \`m\` nguyên tố; nếu không, Euler/extGCD |
| Sàng off-by-one | Bỏ sót/thừa nguyên tố | \`make([]bool, n+1)\`, gạch từ \`p*p\`, điều kiện \`<= n\` |
| \`lcm = a*b/gcd\` | Tràn khi \`a,b\` lớn | \`a/gcd*b\` (chia trước) |
| Quên \`if n>1\` cuối factorize | Bỏ sót nguyên tố > √n | Thêm nhánh bắt phần dư |
| \`C(n,k)\` khi \`k>n\` | Index âm/sai | Trả 0 khi \`k<0 \\|\\| k>n\` |

> ⚠ **Lỗi tinh vi nhất** là tràn số nhân modular: \`(10⁹ · 10⁹) = 10¹⁸\` vẫn vừa \`int64\` nhưng nếu lỡ dùng \`int\` 32-bit (hệ thống cũ) hoặc \`m ≈ 10¹⁸\` thì tràn. Luôn dùng \`int64\` cho biến modular và cân nhắc \`big.Int\` khi \`m > 3·10⁹\`.

---

## Bài tập

> Mỗi bài có lời giải chi tiết ở mục sau. Tự làm trước khi xem.

1. **GCD + LCM.** Viết hàm trả về \`(gcd, lcm)\` của hai số nguyên dương. Phân tích Big-O.
2. **Đếm số nguyên tố \`≤ n\`.** Dùng sàng Eratosthenes, trả về số lượng nguyên tố \`≤ n\`. Big-O?
3. **Fast power mod.** Tính \`aⁿ mod m\` trong \`O(log n)\`. Tính \`power(2, 50, 1000)\`.
4. **Modular inverse.** Tìm \`a⁻¹ mod m\` với \`m\` nguyên tố. Tính \`inv(3) mod 11\`.
5. **\`C(n,k) mod 10⁹+7\`.** Precompute factorial + inverse factorial, tính \`C(10, 3)\`.
6. **Tổng các ước (sum of divisors) & totient.** Cho \`n\`, tính tổng mọi ước dương của \`n\`, và \`φ(n)\`. Big-O?
7. **(thêm) Đếm cặp coprime.** Đếm số cặp \`(i,j)\` với \`1≤i<j≤n\` mà \`gcd(i,j)=1\`. Gợi ý: liên hệ \`φ\`.

---

## Lời giải chi tiết

### Bài 1 — GCD + LCM

**Cách tiếp cận.** Euclid cho gcd; \`lcm = a/gcd*b\`.

\`\`\`go
func gcdLcm(a, b int) (int, int) {
    g := gcd(a, b)        // O(log min(a,b))
    return g, a / g * b   // chia trước khi nhân để tránh tràn
}
// gcdLcm(12,18) → (6, 36); gcdLcm(7,5) → (1, 35)
\`\`\`

**Big-O:** \`O(log min(a,b))\` (gcd chi phối), bộ nhớ \`O(1)\`.

### Bài 2 — Đếm số nguyên tố ≤ n

\`\`\`go
func countPrimes(n int) int {
    if n < 2 {
        return 0
    }
    isPrime := sieve(n) // O(n log log n)
    cnt := 0
    for i := 2; i <= n; i++ {
        if isPrime[i] {
            cnt++
        }
    }
    return cnt
}
// countPrimes(30) = 10 ; countPrimes(10) = 4 (2,3,5,7)
\`\`\`

**Big-O:** thời gian \`O(n log log n)\`, bộ nhớ \`O(n)\`.

### Bài 3 — Fast power mod

Dùng hàm \`power\` ở mục 5.

**\`power(2, 50, 1000)\`:** \`2^50 = 1125899906842624\`, \`mod 1000 = 624\`. Chỉ ~6 vòng lặp (\`log₂50 ≈ 5.6\`). **Big-O:** \`O(log n)\`.

### Bài 4 — Modular inverse

\`inv(3) mod 11\` bằng Fermat: \`3^(11-2) = 3^9 mod 11\`. \`3^9 = 19683\`, \`19683 mod 11 = 4\` (vì \`19683 = 11·1789 + 4\`). Kiểm: \`3·4 = 12 ≡ 1 (mod 11)\` ✓. **Big-O:** \`O(log m)\`.

\`\`\`go
fmt.Println(modInverse(3, 11)) // 4
\`\`\`

### Bài 5 — C(n,k) mod 10⁹+7

\`\`\`go
fact, invFact := precomputeFactorials(10) // O(n) + 1 fast power
fmt.Println(nCk(10, 3, fact, invFact))    // C(10,3)=120
\`\`\`

\`C(10,3) = 10!/(3!·7!) = 120\`. Sau precompute \`O(n)\`, mỗi truy vấn \`O(1)\`.

### Bài 6 — Tổng các ước & totient

**Tổng ước \`O(√n)\`:** với mỗi \`d ≤ √n\` chia hết \`n\`, cả \`d\` và \`n/d\` là ước.

\`\`\`go
func sumDivisors(n int) int {
    sum := 0
    for d := 1; d*d <= n; d++ {
        if n%d == 0 {
            sum += d
            if d != n/d { // tránh đếm đôi khi n là số chính phương
                sum += n / d
            }
        }
    }
    return sum
}
// sumDivisors(12) = 1+2+3+4+6+12 = 28
// sumDivisors(6)  = 1+2+3+6 = 12 (số hoàn hảo: tổng ước thật = 6)
\`\`\`

\`φ(n)\` dùng \`eulerPhi\` ở mục 10. **Big-O:** cả hai \`O(√n)\`.

### Bài 7 — Đếm cặp coprime

Số cặp \`(i,j)\` với \`1≤i<j≤n\`, \`gcd=1\`, bằng \`Σ_{j=2}^{n} φ(j)\` (với mỗi \`j\`, số \`i<j\` coprime với \`j\` đúng là \`φ(j)\`).

\`\`\`go
func countCoprimePairs(n int) int {
    phi := phiSieve(n) // O(n log log n)
    total := 0
    for j := 2; j <= n; j++ {
        total += phi[j]
    }
    return total
}
// n=5: φ(2)+φ(3)+φ(4)+φ(5) = 1+2+2+4 = 9 cặp
\`\`\`

**Big-O:** \`O(n log log n)\` (sàng totient).

---

## Code & Minh họa

- Mọi đoạn code Go ở trên **chạy được** (kèm \`package main\` + \`import "fmt"\`/\`"math/big"\` tương ứng). Không có \`solutions.go\` riêng — code inline trong README là nguồn chính.
- [visualization.html](./visualization.html) — 3 module tương tác:
  1. **Sàng Eratosthenes** — lưới \`1..n\`, animate gạch bội từng nguyên tố.
  2. **Euclid GCD** — animate dãy phép \`mod\` liên tiếp tới khi \`b=0\`.
  3. **Fast exponentiation** — animate chia đôi số mũ \`aⁿ\`, đếm số bước \`log n\`.

---

## Bài tiếp theo

- **[Lesson 47 — Computational Geometry](../lesson-47-computational-geometry/)** — orientation, convex hull, giao điểm đoạn thẳng, point-in-polygon.
- Quay lại [Tier 7 — Nâng cao](../tier-7-advanced/index.html) để xem toàn bộ chuyên đề.
`;
