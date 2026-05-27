// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Algorithms/lesson-01-bigo-asymptotic/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Big-O & phân tích tiệm cận

> **Tier 0 — Nền tảng phân tích** · Lesson đầu tiên của lĩnh vực \`Algorithms\`.

Trước khi học bất kỳ thuật toán cụ thể nào (sort, search, DP, graph...), bạn cần một **thước đo** để trả lời câu hỏi: *"Thuật toán này nhanh hay chậm? Khi dữ liệu lớn lên thì nó còn dùng được không?"*. Lesson này dạy cách đo đó: **phân tích tiệm cận (asymptotic analysis)** với ký hiệu Big-O, Θ và Ω.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao** không thể đo "thuật toán nhanh bao nhiêu giây" mà phải đo **tốc độ tăng trưởng** theo kích thước input \`n\`.
- Phát biểu chính xác định nghĩa **Big-O**, **Θ (theta)**, **Ω (omega)** và phân biệt chúng.
- Thuộc lòng **các lớp phức tạp phổ biến** — O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ), O(n!) — và biết chúng khác nhau cỡ nào bằng **số thật**.
- Phân biệt **best / average / worst case** và biết vì sao thường quan tâm worst.
- Phân tích **space complexity**, kể cả phần stack do đệ quy.
- Áp dụng **quy tắc rút gọn** (bỏ hằng số, giữ bậc cao nhất) và **đếm operation** trong code Go thật.
- Nhận diện **cạm bẫy** kinh điển: O(n) đôi khi chậm hơn O(n²), bug "tưởng O(n) hóa ra O(n²)".

## Kiến thức tiền đề

- Biết đọc code Go cơ bản (vòng lặp, hàm, đệ quy). Nếu chưa quen → xem [\`Programming\`](../../Programming/) Tier 1.
- Quen với **logarit** và **lũy thừa** ở mức phổ thông. Nếu cần ôn → [\`Math\`](../../Math/).
- Đây là nền cho mọi tier sau: amortized ([Lesson 02](../lesson-02-amortized-analysis/README.md)), đệ quy & Master Theorem ([Lesson 03](../lesson-03-recursion-recurrence/README.md)).

---

## 1. Vì sao cần phân tích tiệm cận?

> 💡 **Trực giác.** Hỏi "ô tô nào nhanh hơn?" thì đo tốc độ tối đa (km/h) chứ không đo "chạy hết Hà Nội–Sài Gòn mất mấy giờ" — vì con số sau phụ thuộc tài xế, thời tiết, đường xá. Tốc độ tối đa là **thuộc tính của chiếc xe**, không phụ thuộc hoàn cảnh. Big-O cũng vậy: nó đo **thuộc tính của thuật toán**, tách khỏi máy chạy nó.

### 1.1 Đo runtime tuyệt đối là vô ích

Giả sử bạn viết hàm tìm phần tử trong mảng và đo: "chạy hết 3 ms". Con số này **vô nghĩa** khi so sánh thuật toán, vì nó phụ thuộc:

- **Máy**: CPU 1 GHz hay 5 GHz? Có cache không?
- **Ngôn ngữ / compiler**: Go biên dịch hay Python thông dịch? Có inline không?
- **Tải hệ thống**: máy đang chạy gì khác?
- **Input cụ thể**: phần tử nằm đầu mảng hay cuối mảng?

Cùng một thuật toán, đo trên 2 máy khác nhau có thể chênh 100 lần. **Không thể kết luận gì** từ con số tuyệt đối.

### 1.2 Cái thật sự quan trọng: tăng trưởng theo \`n\`

Thay vì hỏi "mất mấy giây", ta hỏi: **"Khi input lớn gấp đôi, công việc tăng lên bao nhiêu lần?"**. Đây là thuộc tính nội tại, không phụ thuộc máy.

Xét 2 hàm tính tổng mảng. Ta đếm **số phép cộng** (operation) chứ không đếm giây:

\`\`\`go
// O(n): mỗi phần tử cộng đúng 1 lần → n phép cộng.
func tongTuyenTinh(a []int) int {
    tong := 0
    for _, x := range a { // chạy n vòng
        tong += x          // 1 phép cộng mỗi vòng
    }
    return tong
}

// O(n²): với mỗi phần tử, lại duyệt cả mảng → n × n phép cộng.
func tongBinhPhuong(a []int) int {
    tong := 0
    for i := range a {        // n vòng ngoài
        for j := range a {    // n vòng trong
            tong += a[i] * a[j] // n×n = n² phép tính
        }
    }
    return tong
}
\`\`\`

Số operation theo \`n\`:

| n | \`tongTuyenTinh\` (n) | \`tongBinhPhuong\` (n²) |
|---|---|---|
| 10 | 10 | 100 |
| 100 | 100 | 10 000 |
| 1 000 | 1 000 | 1 000 000 |
| 1 000 000 | 1 000 000 | 1 000 000 000 000 |

Với \`n = 10⁶\`, hàm O(n) làm **1 triệu** việc còn hàm O(n²) làm **1 nghìn tỉ** việc — chênh 1 triệu lần. Đây mới là điều quyết định "dùng được hay không". Máy nhanh gấp đôi cũng không cứu nổi O(n²) khi \`n\` lớn.

> 📝 **Tóm tắt mục 1.** (1) Runtime tuyệt đối (giây) phụ thuộc máy → vô dụng để so sánh thuật toán. (2) Ta đo **tốc độ tăng trưởng** của số operation theo \`n\`. (3) Khi \`n → ∞\`, lớp tăng trưởng (n vs n²) áp đảo mọi yếu tố máy móc.

---

## 2. Big-O: chặn trên (upper bound)

### 2.1 Định nghĩa 3 phần

**(a) Là gì.** Big-O mô tả **chặn trên** của tốc độ tăng trưởng. Nói \`f(n) = O(g(n))\` nghĩa là: *"khi n đủ lớn, f(n) không lớn hơn g(n) quá một hằng số nhân"*. Hình thức:

> \`f(n) = O(g(n))\` ⟺ ∃ hằng số \`c > 0\` và \`n₀ ≥ 0\` sao cho \`f(n) ≤ c · g(n)\` với **mọi** \`n ≥ n₀\`.

**(b) Vì sao tồn tại / vì sao cần.** Ta muốn một cách nói "thuật toán này **không tệ hơn** mức X" mà bỏ qua chi tiết vụn vặt (hằng số, máy móc, số hạng bậc thấp). Big-O cho phép so sánh thuật toán ở mức **độ lớn (order of growth)**, đúng cái ta quan tâm khi \`n\` lớn. Hằng số \`c\` "nuốt" mọi khác biệt về phần cứng; \`n₀\` cho phép bỏ qua hành vi ở \`n\` nhỏ (nơi hằng số làm nhiễu).

**(c) Ví dụ số cụ thể.** Lấy \`f(n) = 3n + 5\`. Ta khẳng định \`f(n) = O(n)\` (chọn \`g(n) = n\`). Tìm \`c\` và \`n₀\`:

- Chọn \`c = 4\`. Cần \`3n + 5 ≤ 4n\`, tức \`5 ≤ n\`. Vậy \`n₀ = 5\`.
- Kiểm: \`n = 5\`: \`f = 20\`, \`c·g = 20\` → \`20 ≤ 20\` ✓. \`n = 10\`: \`f = 35\`, \`c·g = 40\` → \`35 ≤ 40\` ✓. \`n = 100\`: \`f = 305\`, \`c·g = 400\` ✓.

Bốn ví dụ nữa, đa dạng:

1. \`f(n) = 7\` (hằng số) → \`O(1)\`. Chọn \`c = 7, g = 1, n₀ = 0\`: \`7 ≤ 7·1\` ✓ mọi n.
2. \`f(n) = n² + 100n\` → \`O(n²)\`. Chọn \`c = 2\`: cần \`n² + 100n ≤ 2n²\` ⟺ \`100n ≤ n²\` ⟺ \`n ≥ 100\`. Vậy \`n₀ = 100\`. Kiểm \`n=100\`: \`10000+10000=20000 ≤ 2·10000=20000\` ✓.
3. \`f(n) = 5n³ − 2n\` → \`O(n³)\`. Chọn \`c = 5, n₀ = 1\`: \`5n³ − 2n ≤ 5n³\` ✓ (vì trừ đi \`2n\` chỉ làm nhỏ hơn).
4. \`f(n) = log₂(n) + n\` → \`O(n)\`. Với \`n ≥ 1\`, \`log₂ n ≤ n\`, nên \`f(n) ≤ 2n\`, chọn \`c = 2, n₀ = 1\`. Kiểm \`n=16\`: \`4+16=20 ≤ 2·16=32\` ✓.

> ⚠ **Lỗi thường gặp.** Big-O là **chặn trên**, nên về kỹ thuật \`3n + 5 = O(n²)\` cũng **đúng** (n² còn lớn hơn n). Nhưng nói vậy là **lười và gây hiểu lầm** — ta luôn muốn chặn **chặt nhất**. Khi nói "thuật toán này O(n²)", ngầm hiểu đó là chặn chặt, tức nó *thực sự* chạy ~n² chứ không phải "ít nhất nhanh bằng n²". Để diễn đạt "chặt", dùng Θ (mục 3).

> ⚠ **Lỗi thường gặp #2.** \`O(2n) = O(n)\` — viết hằng số trong Big-O là **dư thừa và sai chuẩn**. Big-O đã nuốt hằng số rồi (mục 7.1). Đừng viết \`O(2n)\`, \`O(n/2)\`, \`O(100)\` — viết \`O(n)\`, \`O(n)\`, \`O(1)\`.

> 🔁 **Dừng lại tự kiểm tra.** \`f(n) = 6n + 4\`. Chứng minh \`f(n) = O(n)\` bằng cách chỉ ra \`c\` và \`n₀\` cụ thể.
> <details><summary>Đáp án</summary>
>
> Chọn \`c = 7\`. Cần \`6n + 4 ≤ 7n\` ⟺ \`4 ≤ n\`. Vậy \`n₀ = 4\`. Kiểm \`n=4\`: \`28 ≤ 28\` ✓; \`n=10\`: \`64 ≤ 70\` ✓. (Nhiều cặp \`(c, n₀)\` khác cũng đúng, ví dụ \`c=10, n₀=1\`.)
> </details>

> 📝 **Tóm tắt mục 2.** Big-O = chặn trên. \`f = O(g)\` nếu \`f(n) ≤ c·g(n)\` từ \`n₀\` trở đi. Luôn báo cáo chặn **chặt nhất**. Hằng số và số hạng bậc thấp bị nuốt.

---

## 3. Θ (theta) và Ω (omega)

Big-O chỉ nói "không tệ hơn". Hai ký hiệu anh em hoàn thiện bức tranh.

### 3.1 Ω — chặn dưới (lower bound)

**(a) Là gì.** \`f(n) = Ω(g(n))\` ⟺ ∃ \`c > 0, n₀\`: \`f(n) ≥ c · g(n)\` với mọi \`n ≥ n₀\`. Nó nói "f tăng trưởng **ít nhất** nhanh bằng g" — chặn dưới.

**(b) Vì sao cần.** Big-O cho biết "tốt nhất cũng không tệ hơn X". Ω cho biết "tệ nhất cũng không tốt hơn Y". Ví dụ: *"mọi thuật toán sort dựa trên so sánh đều cần Ω(n log n) phép so sánh"* — đây là chặn dưới cho **cả lớp bài toán**, không thuật toán nào phá được.

**(c) Ví dụ số.** \`f(n) = 3n² + 2n = Ω(n²)\`: chọn \`c = 3, n₀ = 0\`, vì \`3n² + 2n ≥ 3n²\` luôn đúng (\`2n ≥ 0\`). Kiểm \`n=5\`: \`75+10=85 ≥ 3·25=75\` ✓.

### 3.2 Θ — chặn chặt (tight bound)

**(a) Là gì.** \`f(n) = Θ(g(n))\` ⟺ vừa \`O(g(n))\` **vừa** \`Ω(g(n))\`. Tức tồn tại \`c₁, c₂ > 0, n₀\`: \`c₁·g(n) ≤ f(n) ≤ c₂·g(n)\` với mọi \`n ≥ n₀\`. Θ "kẹp" f giữa hai bội của g → mô tả tăng trưởng **chính xác**.

**(b) Vì sao cần.** Đây là điều ta *thực sự* muốn nói khi bảo "thuật toán này O(n²)". Θ khẳng định nó **đúng cỡ** n² — không tốt hơn, không tệ hơn. Trong đời thường người ta hay viết O nhưng ngầm ý Θ.

**(c) Ví dụ số.** \`f(n) = 3n² + 2n + 1 = Θ(n²)\`. Chặn dưới: \`f(n) ≥ 3n²\` (chọn \`c₁ = 3\`). Chặn trên: với \`n ≥ 1\`, \`3n² + 2n + 1 ≤ 3n² + 2n² + n² = 6n²\` (chọn \`c₂ = 6, n₀ = 1\`). Vậy \`3n² ≤ f(n) ≤ 6n²\`. Kiểm \`n=10\`: \`3·100=300 ≤ 321 ≤ 6·100=600\` ✓.

Bốn ví dụ phân biệt O / Ω / Θ:

| f(n) | O đúng? | Ω đúng? | Θ (chặn chặt) |
|---|---|---|---|
| \`5n + 3\` | O(n), O(n²)... | Ω(n), Ω(1)... | **Θ(n)** |
| \`n² + n\` | O(n²), O(n³)... | Ω(n²), Ω(n)... | **Θ(n²)** |
| \`2ⁿ + n¹⁰⁰\` | O(2ⁿ) | Ω(2ⁿ) | **Θ(2ⁿ)** (2ⁿ áp đảo n¹⁰⁰) |
| \`7\` | O(1), O(n)... | Ω(1) | **Θ(1)** |

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Khi nào dùng O, khi nào dùng Θ?"* — Dùng **Θ** khi biết chính xác cỡ (hầu hết phân tích thuật toán cụ thể). Dùng **O** khi chỉ chứng minh được chặn trên, hoặc khi worst-case khác average-case. Dùng **Ω** khi nói về chặn dưới của *bài toán* (giới hạn lý thuyết).
> - *"Vậy \`O(n)\` có sai không nếu thực ra là Θ(n)?"* — Không sai (Θ(n) ⟹ O(n)), chỉ là nói "yếu" hơn. Như nói "cao ≤ 2m" trong khi biết chính xác "cao 1.7m".
> - *"Quicksort là O(n log n) hay O(n²)?"* — Tùy case! Average: Θ(n log n). Worst: Θ(n²). Người ta hay nói "quicksort O(n log n)" ngầm ý average-case (mục 5).

> 🔁 **Dừng lại tự kiểm tra.** \`f(n) = 4n³ + 10n\`. Cho biết Θ của nó và một O **không chặt** cũng đúng.
> <details><summary>Đáp án</summary>
>
> **Θ(n³)** (chặt). Một O không chặt đúng: **O(n⁴)** (hoặc O(2ⁿ)...) — vẫn là chặn trên hợp lệ nhưng lỏng.
> </details>

> 📝 **Tóm tắt mục 3.** O = chặn trên (≤), Ω = chặn dưới (≥), Θ = kẹp cả hai (=). Θ là cái ta thường muốn. "O" trong đời thường thường ngầm ý Θ.

---

## 4. Các lớp phức tạp phổ biến

Đây là "bảng tuần hoàn" của phân tích thuật toán. Học thuộc thứ tự và cảm nhận độ lớn.

### 4.1 Bảng số operation theo \`n\`

| Lớp | Tên | n=10 | n=100 | n=1 000 | n=10⁶ |
|---|---|---|---|---|---|
| **O(1)** | hằng số | 1 | 1 | 1 | 1 |
| **O(log n)** | logarit | ~3.3 | ~6.6 | ~10 | ~20 |
| **O(n)** | tuyến tính | 10 | 100 | 1 000 | 1 000 000 |
| **O(n log n)** | linearithmic | ~33 | ~664 | ~9 966 | ~2×10⁷ |
| **O(n²)** | bậc hai | 100 | 10 000 | 1 000 000 | 10¹² |
| **O(2ⁿ)** | mũ | 1 024 | 10³⁰ (≈ số nguyên tử Trái Đất) | thiên văn | — |
| **O(n!)** | giai thừa | 3.6×10⁶ | 10¹⁵⁷ | — | — |

(\`log\` ở đây là \`log₂\`. \`log₂ 1000 ≈ 9.97\`, \`log₂ 10⁶ ≈ 19.9\`.)

### 4.2 Quy ra thời gian thực tế

Giả sử máy làm **1 tỉ (10⁹) operation/giây** (xấp xỉ 1 GHz). Bảng dưới quy số operation ở mục 4.1 ra thời gian — nhìn để thấy ranh giới "dùng được / vô vọng":

| Lớp | n=10 | n=100 | n=1 000 | n=10⁶ |
|---|---|---|---|---|
| O(log n) | ~3 ns | ~7 ns | ~10 ns | ~20 ns |
| O(n) | 10 ns | 100 ns | 1 µs | 1 ms |
| O(n log n) | 33 ns | 0.66 µs | 10 µs | 20 ms |
| O(n²) | 100 ns | 10 µs | 1 ms | **~17 phút** |
| O(2ⁿ) | ~1 µs | **~4×10¹³ năm** | vô vọng | — |
| O(n!) | ~3.6 ms | vô vọng | — | — |

Đọc bảng: với \`n = 10⁶\`, O(n) xong trong 1 ms, O(n log n) trong 20 ms — đều ổn. Nhưng O(n²) cần **17 phút** — thường là không chấp nhận được. Với \`n = 100\`, O(2ⁿ) đã cần **lâu hơn tuổi vũ trụ** (vũ trụ ~1.4×10¹⁰ năm).

> 💡 **Trực giác về các lớp:**
> - **O(1)** — vào tủ lấy đúng ngăn đã biết. Không phụ thuộc tủ to cỡ nào.
> - **O(log n)** — tra từ điển: mỗi lần lật, loại nửa số trang còn lại. 1 triệu trang chỉ cần ~20 lần lật.
> - **O(n)** — đọc từng trang một lần.
> - **O(n log n)** — sort tối ưu: chia đôi (log n tầng), mỗi tầng quét n.
> - **O(n²)** — bắt tay tất cả mọi người trong phòng với nhau.
> - **O(2ⁿ)** — thử mọi tập con (bật/tắt mỗi phần tử).
> - **O(n!)** — thử mọi cách sắp xếp (hoán vị) — bài toán người giao hàng vét cạn.

> ❓ **Câu hỏi tự nhiên.** *"O(log n) sao lại không ghi cơ số log?"* — Vì đổi cơ số chỉ khác nhau **hằng số nhân**: \`log₂ n = log₁₀ n / log₁₀ 2 ≈ 3.32 · log₁₀ n\`. Big-O nuốt hằng số → \`O(log₂ n) = O(log₁₀ n) = O(ln n) = O(log n)\`. Nên ghi \`log n\` trống cơ số là chuẩn.

> 📝 **Tóm tắt mục 4.** Thứ tự tăng dần: \`1 < log n < n < n log n < n² < n³ < 2ⁿ < n!\`. Ranh giới thực dụng với \`n\` lớn: tới \`n log n\` thì khỏe; \`n²\` chỉ ổn khi \`n\` nhỏ-vừa; \`2ⁿ\`/\`n!\` chỉ dùng được khi \`n ≲ 20\`.

---

## 5. Best / Average / Worst case

Cùng một thuật toán, số operation có thể khác nhau **tùy input cụ thể**, dù \`n\` bằng nhau.

### 5.1 Linear search

\`\`\`go
// Tìm tuyến tính: trả index của target, hoặc -1 nếu không có.
func timTuyenTinh(a []int, target int) int {
    for i, x := range a {
        if x == target { // so sánh
            return i     // tìm thấy → dừng ngay
        }
    }
    return -1
}
\`\`\`

Với mảng \`n\` phần tử, đếm số phép **so sánh**:

- **Best case — Ω(1):** target nằm ở vị trí đầu (\`a[0]\`). Chỉ 1 so sánh. Ví dụ \`a=[7,2,9,4]\`, target=7 → 1 so sánh.
- **Worst case — O(n):** target ở cuối hoặc không có. \`n\` so sánh. Ví dụ \`a=[7,2,9,4]\`, target=4 → 4 so sánh; target=5 (không có) → 4 so sánh.
- **Average case — Θ(n):** giả sử target ở vị trí ngẫu nhiên đều, trung bình \`(1+2+...+n)/n = (n+1)/2\` so sánh. Với \`n=4\`: \`(1+2+3+4)/4 = 2.5\` so sánh trung bình. \`(n+1)/2 = Θ(n)\`.

### 5.2 Quicksort

\`\`\`go
// Quicksort (phiên bản gọn để minh họa). Chọn pivot = phần tử cuối.
func quicksort(a []int) {
    if len(a) <= 1 {
        return
    }
    pivot := a[len(a)-1]
    i := 0
    for j := 0; j < len(a)-1; j++ {
        if a[j] < pivot {
            a[i], a[j] = a[j], a[i]
            i++
        }
    }
    a[i], a[len(a)-1] = a[len(a)-1], a[i]
    quicksort(a[:i])   // phần nhỏ hơn pivot
    quicksort(a[i+1:]) // phần lớn hơn pivot
}
\`\`\`

- **Best / Average — Θ(n log n):** pivot chia mảng thành 2 nửa cân bằng → \`log n\` tầng, mỗi tầng tổng \`n\` việc.
- **Worst — Θ(n²):** mảng **đã sắp xếp sẵn** + chọn pivot cuối → mỗi lần chỉ tách ra 1 phần tử, đệ quy sâu \`n\` tầng, tầng thứ k làm \`n−k\` việc → \`n + (n−1) + ... + 1 = n(n+1)/2 = Θ(n²)\`. Ví dụ \`a=[1,2,3,4,5]\`: partition đầu làm 4 so sánh rồi chỉ tách được \`[1,2,3,4]\` | \`[]\` → suy biến.

### 5.3 Vì sao thường quan tâm worst case?

> 💡 **Trực giác.** Worst-case là **lời hứa**: "dù input tệ đến đâu, thuật toán cũng không chậm hơn mức này". Average-case là "trung bình thì nhanh", nhưng không bảo vệ bạn khỏi cú sốc khi gặp input xấu (vốn có thể do kẻ xấu cố tình tạo ra — tấn công DoS bằng hash collision là ví dụ thật).

- **Đảm bảo (guarantee):** hệ thống thật cần biết giới hạn xấu nhất (real-time, server chịu tải).
- **Average-case khó định nghĩa:** "trung bình" theo phân phối input nào? Thường ta không biết phân phối thật.
- **Worst-case dễ phân tích hơn** và an toàn hơn.

Tuy vậy, average-case vẫn quan trọng khi worst hiếm gặp (quicksort dùng pivot ngẫu nhiên → worst gần như không xảy ra trong thực tế → ta nói "quicksort O(n log n)").

> ❓ **Câu hỏi tự nhiên.** *"Best-case có dùng để chọn thuật toán không?"* — Hầu như **không**. Best-case là input may mắn nhất, không phản ánh hiệu năng đáng tin. Chọn thuật toán chủ yếu nhìn worst (đảm bảo) và average (thực tế).

> 🔁 **Dừng lại tự kiểm tra.** Linear search trên \`a=[5,3,8,1,9,2]\` (n=6), target=2. Đây là case nào? Bao nhiêu so sánh?
> <details><summary>Đáp án</summary>
>
> target=2 ở vị trí cuối (index 5) → **worst case**, **6 so sánh** (phải duyệt hết).
> </details>

> 📝 **Tóm tắt mục 5.** Một thuật toán có 3 con số: best (Ω may mắn), average (kỳ vọng), worst (O đảm bảo). Thường báo cáo **worst** để có guarantee; average khi worst hiếm.

---

## 6. Space complexity (độ phức tạp bộ nhớ)

Tương tự time, nhưng đo **bộ nhớ** dùng thêm theo \`n\`.

### 6.1 Auxiliary space vs total space

- **Total space** = input + bộ nhớ phụ. Input mảng \`n\` phần tử đã là Θ(n).
- **Auxiliary space (bộ nhớ phụ)** = bộ nhớ **thêm** thuật toán cấp phát, **không tính input**. Đây mới là con số ta quan tâm khi so sánh thuật toán.

\`\`\`go
// O(1) auxiliary space: chỉ vài biến, không phụ thuộc n.
func tongMang(a []int) int {
    tong := 0      // 1 biến
    for _, x := range a {
        tong += x  // không cấp phát thêm
    }
    return tong
}

// O(n) auxiliary space: tạo mảng mới kích thước n.
func nhanDoi(a []int) []int {
    b := make([]int, len(a)) // cấp phát n phần tử mới
    for i, x := range a {
        b[i] = x * 2
    }
    return b
}
\`\`\`

\`tongMang\`: auxiliary space = **O(1)** (mảng input không tính). \`nhanDoi\`: auxiliary space = **O(n)** (mảng \`b\`).

### 6.2 Recursion stack tính vào space

Mỗi lời gọi đệ quy chiếm 1 **stack frame**. Độ sâu đệ quy = số frame chồng lên cùng lúc = space.

\`\`\`go
// Đệ quy tuyến tính: độ sâu n → O(n) space (dù không cấp phát mảng nào).
func tongDeQuy(n int) int {
    if n == 0 {
        return 0
    }
    return n + tongDeQuy(n-1) // mỗi tầng giữ 1 frame chờ kết quả
}
\`\`\`

Gọi \`tongDeQuy(5)\` → stack chồng 6 frame: \`tongDeQuy(5)→(4)→(3)→(2)→(1)→(0)\` rồi mới "xả" ngược. Độ sâu = \`n+1\` → **O(n) space**, dù mã trông không cấp phát gì.

Ví dụ so sánh độ sâu stack:

| Hàm đệ quy | Độ sâu max | Space |
|---|---|---|
| \`tongDeQuy(n)\` (tuyến tính) | n+1 | O(n) |
| Binary search đệ quy | ~log₂ n | O(log n) |
| Merge sort đệ quy | ~log₂ n (cây) nhưng cần mảng phụ O(n) | O(n) |
| Fibonacci đệ quy ngây thơ \`fib(n)\` | n (nhánh sâu nhất) | O(n) space, O(2ⁿ) time |

> ⚠ **Lỗi thường gặp.** "Hàm đệ quy không tạo mảng nên O(1) space" — **sai**. Stack frame là bộ nhớ thật. Đệ quy sâu \`n\` → O(n) space và có thể **stack overflow**. Đổi sang vòng lặp (\`tongMang\` ở trên) thì mới O(1) space.

> ❓ **Câu hỏi tự nhiên.** *"Đệ quy đuôi (tail recursion) có cứu được không?"* — Trong ngôn ngữ tối ưu tail-call (như Scheme), có → O(1). Nhưng **Go KHÔNG tối ưu tail call** → đệ quy đuôi trong Go vẫn O(n) stack. Muốn O(1) phải viết vòng lặp thủ công.

> 🔁 **Dừng lại tự kiểm tra.** Hàm tính giai thừa đệ quy \`fact(n) = n*fact(n-1)\`. Time và space?
> <details><summary>Đáp án</summary>
>
> **Time O(n)** (n lời gọi, mỗi lời O(1)). **Space O(n)** (stack sâu n). Viết lại bằng vòng lặp → space O(1).
> </details>

> 📝 **Tóm tắt mục 6.** Đo **auxiliary space** (không tính input). Đệ quy tốn O(độ sâu) space cho stack — đừng quên. Go không tối ưu tail-call.

---

## 7. Quy tắc rút gọn biểu thức

Phân tích cho ra biểu thức thô (vd \`3n² + 5n + 7\`); 4 quy tắc dưới rút về Big-O.

### 7.1 Bỏ hằng số nhân

\`O(2n) = O(n)\`, \`O(½ n) = O(n)\`, \`O(100) = O(1)\`. **Lý do:** hằng số \`c\` trong định nghĩa Big-O đã nuốt mọi hệ số. \`2n\` và \`n\` cùng "lớp tăng trưởng" — gấp đôi n thì cả hai gấp đôi.

Ví dụ: \`f(n) = 5n → O(n)\`; \`f(n) = 0.001 n² → O(n²)\`; \`f(n) = 42 → O(1)\`; \`f(n) = n/4 → O(n)\`.

### 7.2 Giữ số hạng bậc cao nhất

\`O(n² + n) = O(n²)\`, \`O(n³ + 100n² + 5) = O(n³)\`. **Lý do:** khi \`n → ∞\`, số hạng bậc cao áp đảo.

Walk-through bằng số: \`f(n) = n² + n\`. Tại \`n = 1000\`: \`n² = 1 000 000\`, \`n = 1 000\` → \`n\` chỉ chiếm \`0.1%\`. Tại \`n = 10⁶\`: \`n\` chiếm \`0.0001%\`. Số hạng \`n\` **biến mất** về mặt tỉ lệ → bỏ.

Ví dụ: \`n³ + n² → O(n³)\`; \`2ⁿ + n¹⁰ → O(2ⁿ)\`; \`n log n + n → O(n log n)\`; \`n! + 2ⁿ → O(n!)\`.

### 7.3 Vòng lặp lồng nhau → NHÂN

\`\`\`go
for i := 0; i < n; i++ {     // n lần
    for j := 0; j < m; j++ { // m lần mỗi i
        doWork()             // → n × m lần
    }
}
\`\`\`

→ **O(n·m)**. Nếu \`m = n\` → O(n²). Walk-through: \`n=4, m=3\` → vòng trong chạy \`4×3 = 12\` lần.

### 7.4 Các bước tuần tự → CỘNG (rồi giữ bậc cao nhất)

\`\`\`go
for i := 0; i < n; i++ { ... }      // O(n)
for i := 0; i < n*n; i++ { ... }    // O(n²)
\`\`\`

→ \`O(n + n²) = O(n²)\` (theo quy tắc 7.2). Hai vòng lặp **rời nhau** (không lồng) → cộng, rồi giữ cái lớn.

> ⚠ **Lỗi thường gặp.** Nhầm "tuần tự" với "lồng nhau". Hai vòng \`for\` **liên tiếp** (kết thúc cái này mới chạy cái kia) → CỘNG. Hai vòng **lồng** (cái trong nằm trong thân cái ngoài) → NHÂN. Đọc kỹ dấu ngoặc \`{}\`.

> 🔁 **Dừng lại tự kiểm tra.** Rút gọn: \`O(3n² + 2n log n + 10n + 50)\`.
> <details><summary>Đáp án</summary>
>
> Giữ bậc cao nhất + bỏ hằng số → **O(n²)** (vì \`n² > n log n > n > 1\`).
> </details>

> 📝 **Tóm tắt mục 7.** (1) Bỏ hằng số nhân. (2) Giữ bậc cao nhất. (3) Vòng lồng → nhân. (4) Vòng tuần tự → cộng rồi giữ bậc cao nhất.

---

## 8. Phân tích code: đếm operation

Quy trình: đếm số lần "việc cốt lõi" chạy theo \`n\`, rồi rút gọn.

### 8.1 Single loop → O(n)

\`\`\`go
// Đếm operation tường minh: biến ops tăng mỗi lần lặp.
func singleLoop(n int) int {
    ops := 0
    for i := 0; i < n; i++ {
        ops++ // chạy đúng n lần
    }
    return ops // ops == n
}
\`\`\`

\`singleLoop(5)\` → ops = 5. \`singleLoop(1000)\` → ops = 1000. Tuyến tính → **O(n)**.

### 8.2 Nested loop → O(n²)

\`\`\`go
func nestedLoop(n int) int {
    ops := 0
    for i := 0; i < n; i++ {
        for j := 0; j < n; j++ {
            ops++ // chạy n×n lần
        }
    }
    return ops // ops == n*n
}
\`\`\`

\`nestedLoop(5)\` → ops = 25. \`nestedLoop(1000)\` → ops = 1 000 000. → **O(n²)**.

Biến thể "tam giác" (vòng trong phụ thuộc i):

\`\`\`go
func triangleLoop(n int) int {
    ops := 0
    for i := 0; i < n; i++ {
        for j := i; j < n; j++ { // bắt đầu từ i
            ops++
        }
    }
    return ops // n + (n-1) + ... + 1 = n(n+1)/2
}
\`\`\`

\`triangleLoop(5)\` → \`5+4+3+2+1 = 15\`. Số operation \`= n(n+1)/2 = ½n² + ½n → O(n²)\` (vẫn bậc hai dù chạy ~nửa số lần của nested đầy đủ — hằng số ½ bị nuốt).

### 8.3 Halving → O(log n)

\`\`\`go
// Mỗi vòng chia đôi i → số vòng ≈ log₂(n).
func halving(n int) int {
    ops := 0
    for i := n; i >= 1; i /= 2 {
        ops++
    }
    return ops
}
\`\`\`

Walk-through \`halving(16)\`: \`i = 16 → 8 → 4 → 2 → 1 → 0(dừng)\`. Chạy 5 vòng. \`log₂ 16 = 4\`, cộng 1 cho vòng cuối → **O(log n)**. \`halving(1000)\` → ~10 vòng. \`halving(10⁶)\` → ~20 vòng.

> 💡 **Trực giác.** Bất cứ khi nào kích thước bài toán **chia cho hằng số** (2, 3, 10...) mỗi bước → \`log n\`. Đó là vì sao binary search (chia đôi vùng tìm) là O(log n).

### 8.4 Divide + combine → O(n log n)

Khi đệ quy chia đôi (\`log n\` tầng) **và** mỗi tầng làm O(n) việc gộp lại → tổng O(n log n). Merge sort là ví dụ kinh điển:

\`\`\`go
func mergeSort(a []int) []int {
    if len(a) <= 1 {
        return a
    }
    mid := len(a) / 2
    left := mergeSort(a[:mid])  // T(n/2)
    right := mergeSort(a[mid:]) // T(n/2)
    return merge(left, right)   // O(n): gộp 2 nửa
}

// merge: trộn 2 mảng đã sắp xếp thành 1, mỗi phần tử chạm 1 lần → O(n).
func merge(l, r []int) []int {
    res := make([]int, 0, len(l)+len(r))
    i, j := 0, 0
    for i < len(l) && j < len(r) {
        if l[i] <= r[j] {
            res = append(res, l[i]); i++
        } else {
            res = append(res, r[j]); j++
        }
    }
    res = append(res, l[i:]...)
    res = append(res, r[j:]...)
    return res
}
\`\`\`

Hệ thức truy hồi: \`T(n) = 2·T(n/2) + O(n)\`. Hình dung cây đệ quy với \`n=8\`:

\`\`\`
Tầng 0:            [8]            → gộp 8 phần tử  = 8 việc
Tầng 1:        [4]     [4]        → gộp 4+4        = 8 việc
Tầng 2:      [2][2]   [2][2]      → gộp 2+2+2+2    = 8 việc
Tầng 3:     [1][1]...  (8 cái)    → base case
\`\`\`

Mỗi tầng tổng cộng \`n = 8\` việc gộp. Số tầng \`= log₂ 8 = 3\`. Tổng \`= n × log n = 8 × 3 = 24\` việc → **O(n log n)**. (Cách giải hệ thức truy hồi tổng quát học kỹ ở [Lesson 03 — Master Theorem](../lesson-03-recursion-recurrence/README.md).)

### 8.5 Mini benchmark trong Go

Để **kiểm chứng** lý thuyết, đo số operation thật:

\`\`\`go
package main

import "fmt"

func nestedLoop(n int) int {
    ops := 0
    for i := 0; i < n; i++ {
        for j := 0; j < n; j++ {
            ops++
        }
    }
    return ops
}

func main() {
    for _, n := range []int{10, 100, 1000} {
        ops := nestedLoop(n)
        // In ra ops và tỉ lệ ops/n² (phải xấp xỉ 1 → xác nhận O(n²)).
        fmt.Printf("n=%-5d ops=%-10d ops/n²=%.2f\\n", n, ops, float64(ops)/float64(n*n))
    }
    // Kết quả:
    // n=10    ops=100        ops/n²=1.00
    // n=100   ops=10000      ops/n²=1.00
    // n=1000  ops=1000000    ops/n²=1.00
    // Tỉ lệ ops/n² hằng số 1.00 → xác nhận Θ(n²).
}
\`\`\`

> 💡 **Mẹo xác nhận lớp phức tạp bằng số:** chạy hàm với \`n\` và \`2n\`, chia số operation. Nếu tỉ lệ ≈ 2 → O(n); ≈ 4 → O(n²); ≈ 8 → O(n³); ≈ ~2.x (hơn 2 một chút) → O(n log n); ≈ 1 → O(log n).

> 📝 **Tóm tắt mục 8.** Single loop = O(n); nested = O(n²); halving = O(log n); divide+combine = O(n log n). Đếm số lần "việc cốt lõi" chạy, rồi rút gọn. Có thể kiểm chứng bằng tỉ lệ operation khi gấp đôi n.

---

## 9. Cạm bẫy (pitfalls)

### 9.1 Big-O KHÔNG phải tốc độ tuyệt đối

> ⚠ **Lỗi thường gặp.** "O(n) luôn nhanh hơn O(n²)" — **sai với n nhỏ**. Big-O bỏ hằng số, nhưng hằng số có thật.

Walk-through bằng số. Giả sử thuật toán A là \`100n\` (O(n), hằng số lớn) và B là \`n²\` (O(n²), hằng số nhỏ):

| n | A = 100n | B = n² | Ai nhanh hơn? |
|---|---|---|---|
| 10 | 1 000 | 100 | **B** (O(n²)!) |
| 50 | 5 000 | 2 500 | **B** |
| 100 | 10 000 | 10 000 | hòa |
| 200 | 20 000 | 40 000 | **A** (O(n)) |
| 10⁶ | 10⁸ | 10¹² | **A** áp đảo |

Với \`n < 100\`, thuật toán O(n²) **nhanh hơn** O(n)! Điểm "cắt nhau" là \`n = 100\`. Đây là lý do thực tế: nhiều thư viện sort dùng **insertion sort O(n²)** cho mảng nhỏ (\`n < 10–20\`) rồi mới chuyển sang merge/quick — vì hằng số insertion sort rất nhỏ.

### 9.2 Amortized ≠ worst-case từng thao tác

Đôi khi một thao tác **thỉnh thoảng** đắt nhưng **trung bình** rẻ. Ví dụ \`append\` vào slice Go: hầu hết lần là O(1), nhưng khi đầy phải cấp phát + copy = O(n). **Amortized** (chia đều chi phí qua nhiều thao tác) của append là O(1), dù worst-case từng lần là O(n).

> Đây là chủ đề lớn — học kỹ ở [Lesson 02 — Phân tích Amortized](../lesson-02-amortized-analysis/README.md). Tạm nhớ: "amortized O(1)" ≠ "worst-case O(1)".

### 9.3 Input distribution (phân phối input) ảnh hưởng average

Average-case phụ thuộc **giả định về phân phối input**. Quicksort average O(n log n) **giả định** input ngẫu nhiên. Nếu input thường đã-gần-sắp-xếp (rất hay gặp trong thực tế!), quicksort pivot-cuối suy biến về O(n²). Giải pháp: randomized pivot / median-of-three.

> ⚠ **Lỗi thường gặp.** Báo cáo average-case mà không nói rõ giả định phân phối → người đọc tưởng nó luôn đúng. Luôn ghi "average với input ngẫu nhiên đều".

> 🔁 **Dừng lại tự kiểm tra.** Thuật toán A: \`O(n²)\` với hằng số 1 (\`f=n²\`). Thuật toán B: \`O(n log n)\` với hằng số 1000 (\`f=1000·n log n\`). Với \`n=10\`, ai nhanh hơn?
> <details><summary>Đáp án</summary>
>
> A: \`10² = 100\`. B: \`1000 · 10 · log₂10 ≈ 1000·10·3.32 = 33 200\`. **A nhanh hơn** dù lớp tệ hơn — hằng số B quá lớn, và n=10 còn nhỏ. Điểm cắt ở n lớn hơn nhiều.
> </details>

> 📝 **Tóm tắt mục 9.** (1) O(n) chỉ chắc thắng O(n²) khi \`n\` đủ lớn — hằng số quyết định ở \`n\` nhỏ. (2) Amortized ≠ worst từng thao tác. (3) Average-case gắn với giả định phân phối input.

---

## 10. Cách nói "tăng trưởng" — gấp đôi n thì sao?

Một cách trực giác cực mạnh để cảm nhận lớp phức tạp: hỏi *"nếu n gấp đôi, thời gian thay đổi thế nào?"*.

| Lớp | n → 2n thì thời gian... | Lý do |
|---|---|---|
| **O(1)** | không đổi | không phụ thuộc n |
| **O(log n)** | +1 đơn vị (cộng hằng số) | \`log(2n) = log n + 1\` |
| **O(n)** | gấp **2** | tuyến tính |
| **O(n log n)** | hơn gấp 2 một chút | \`2n·log(2n) = 2n(log n + 1)\` |
| **O(n²)** | gấp **4** | \`(2n)² = 4n²\` |
| **O(n³)** | gấp **8** | \`(2n)³ = 8n³\` |
| **O(2ⁿ)** | **bình phương** lên | \`2^(2n) = (2ⁿ)²\` |

Walk-through số cụ thể với O(n²): \`n=1000\` mất 1 giây (1 triệu ops). Gấp đôi \`n=2000\` → \`(2000)² = 4 triệu ops\` → **4 giây**. Gấp 10 lần \`n=10000\` → \`100 triệu ops\` → **100 giây**. Quy tắc: O(n²) khi \`n\` ×k thì thời gian ×k².

Với O(2ⁿ): \`n=20\` "ổn" (~10⁶ ops). \`n=40\` → \`2⁴⁰ ≈ 10¹²\` ops → gấp **1 triệu lần**, không phải gấp 2. Chỉ thêm 20 vào \`n\` mà thời gian tăng triệu lần — đó là vì sao mũ "phát nổ".

> 💡 **Trực giác đắt giá nhất của lesson.** Khi đứng trước thuật toán mới, hỏi ngay: *"chia đôi mỗi bước? → log. Quét 1 lần? → n. Quét lồng quét? → n². Thử mọi tập con? → 2ⁿ."* Câu hỏi "gấp đôi n thì sao" cho bạn cảm giác về độ lớn nhanh hơn cả tính toán.

> 📝 **Tóm tắt mục 10.** O(n) gấp đôi → ×2; O(n²) → ×4; O(n³) → ×8; O(2ⁿ) → bình phương; O(log n) → +1; O(1) → không đổi.

---

## Bài tập

> Tự làm trước khi xem lời giải. Mỗi bài rèn một kỹ năng phân tích khác nhau.

### Bài 1 — Phân tích Big-O của 6 đoạn code

Cho biết Θ (chặn chặt) của mỗi hàm:

\`\`\`go
// (a)
func fa(n int) {
    for i := 0; i < n; i++ {
        for j := 0; j < n; j++ {
            fmt.Println(i, j)
        }
    }
}

// (b)
func fb(n int) {
    for i := 1; i < n; i *= 2 {
        fmt.Println(i)
    }
}

// (c)
func fc(n int) {
    for i := 0; i < n; i++ {
        fmt.Println(i)
    }
    for i := 0; i < n; i++ {
        for j := 0; j < n; j++ {
            fmt.Println(i, j)
        }
    }
}

// (d)
func fd(n int) {
    for i := 0; i < n; i++ {
        for j := i; j < n; j++ {
            fmt.Println(i, j)
        }
    }
}

// (e)
func fe(n int) {
    for i := 0; i < n; i++ {
        for j := 1; j < n; j *= 2 {
            fmt.Println(i, j)
        }
    }
}

// (f)
func ff(arr []int) {
    fmt.Println(arr[0]) // truy cập phần tử đầu
}
\`\`\`

### Bài 2 — Rút gọn biểu thức

Rút gọn về Big-O chặt nhất:

1. \`4n³ + 7n² + 2n + 100\`
2. \`2ⁿ + n⁵\`
3. \`n log n + n²\`
4. \`1000\`
5. \`n + log n\`
6. \`½n² + 100n\`

### Bài 3 — Xếp hạng theo tăng trưởng

Xếp các hàm sau theo thứ tự tăng dần tốc độ tăng trưởng (chậm → nhanh):

\`n²\`, \`2ⁿ\`, \`log n\`, \`n log n\`, \`n\`, \`n!\`, \`1\`, \`√n\`

### Bài 4 — Tính số operation cho n cụ thể

Với hàm \`triangleLoop\` (mục 8.2: \`for i; for j:=i\`), tính **chính xác** số lần \`ops++\` chạy khi:

1. \`n = 5\`
2. \`n = 10\`
3. \`n = 100\`

Và cho biết Big-O.

### Bài 5 — Space complexity của đệ quy

Cho biết **time** và **space** (kể cả stack) của:

\`\`\`go
// (a)
func powerOfTwo(n int) int {
    if n == 0 {
        return 1
    }
    return 2 * powerOfTwo(n-1)
}

// (b) — đệ quy nhị phân
func fib(n int) int {
    if n < 2 {
        return n
    }
    return fib(n-1) + fib(n-2)
}
\`\`\`

### Bài 6 — Bug "tưởng O(n) hóa ra O(n²)"

Đoạn code dưới ghép \`n\` chuỗi. Tác giả nghĩ nó O(n). Nó **thực sự** là gì? Vì sao? Sửa lại cho đúng O(n).

\`\`\`go
func noiChuoi(parts []string) string {
    result := ""
    for _, p := range parts { // n vòng
        result += p           // ← thủ phạm
    }
    return result
}
\`\`\`

### Bài 7 — Phân tích thuật toán hai con trỏ

\`\`\`go
func coTongBang(a []int, target int) bool { // a đã sắp xếp tăng dần
    i, j := 0, len(a)-1
    for i < j {
        s := a[i] + a[j]
        if s == target {
            return true
        } else if s < target {
            i++
        } else {
            j--
        }
    }
    return false
}
\`\`\`

Cho biết time và space. Vì sao **không** phải O(n²) dù có vẻ "duyệt cặp"?

---

## Lời giải chi tiết

### Lời giải Bài 1

- **(a) Θ(n²).** Hai vòng lồng đầy đủ, mỗi vòng \`n\` → \`n × n\` lần in. Quy tắc 7.3 (nhân).
- **(b) Θ(log n).** \`i\` nhân đôi mỗi vòng: \`1 → 2 → 4 → ... → n\`. Số vòng = \`log₂ n\`. Walk-through \`n=16\`: \`i = 1,2,4,8\` → 4 vòng = \`log₂16\`. Quy tắc halving (8.3).
- **(c) Θ(n²).** Vòng đầu O(n), vòng sau O(n²), **tuần tự** (rời nhau) → cộng → \`O(n + n²) = O(n²)\` (quy tắc 7.4 + 7.2).
- **(d) Θ(n²).** Tam giác: \`n + (n−1) + ... + 1 = n(n+1)/2\`. Bỏ hằng số ½ → O(n²). (Đây là \`triangleLoop\` mục 8.2.)
- **(e) Θ(n log n).** Vòng ngoài \`n\` lần; vòng trong halving \`log₂ n\` lần mỗi i → \`n × log n\`. Quy tắc nhân với một vòng tuyến tính và một vòng log.
- **(f) Θ(1).** Truy cập \`arr[0]\` là một thao tác duy nhất, không phụ thuộc \`len(arr)\`. Hằng số.

### Lời giải Bài 2

1. \`4n³ + 7n² + 2n + 100\` → giữ bậc cao nhất, bỏ hằng số → **O(n³)**.
2. \`2ⁿ + n⁵\` → mũ áp đảo mọi đa thức → **O(2ⁿ)**. (Kiểm \`n=20\`: \`2²⁰ ≈ 10⁶\`, \`20⁵ = 3.2×10⁶\`; \`n=30\`: \`2³⁰ ≈ 10⁹\`, \`30⁵ ≈ 2.4×10⁷\` → mũ vượt.)
3. \`n log n + n²\` → \`n² > n log n\` → **O(n²)**.
4. \`1000\` → hằng số → **O(1)**.
5. \`n + log n\` → \`n > log n\` → **O(n)**.
6. \`½n² + 100n\` → bậc cao nhất n², bỏ hằng số ½ → **O(n²)**.

### Lời giải Bài 3

Thứ tự tăng dần (dùng bảng mục 4 + chèn \`√n\` giữa \`log n\` và \`n\`, vì \`log n < √n < n\`):

\`1 < log n < √n < n < n log n < n² < 2ⁿ < n!\`

Kiểm tại \`n = 16\`: \`1 < 4 < 4 < 16 < 64 < 256 < 65536 < 16!(≈2×10¹³)\`. (\`log₂16 = 4\`, \`√16 = 4\` — tại n=16 chúng bằng nhau, nhưng với n lớn hơn \`√n\` vượt \`log n\`: tại \`n=256\`, \`log=8 < √n=16\`.)

### Lời giải Bài 4

\`triangleLoop\`: số lần \`= n + (n−1) + ... + 1 = n(n+1)/2\`.

1. \`n = 5\`: \`5·6/2 = 15\`.
2. \`n = 10\`: \`10·11/2 = 55\`.
3. \`n = 100\`: \`100·101/2 = 5050\`.

Big-O: \`n(n+1)/2 = ½n² + ½n\` → bỏ hằng số, giữ bậc cao → **O(n²)**. (Lưu ý: dù chỉ chạy ~nửa số lần của nested đầy đủ, vẫn O(n²) — hằng số ½ không đổi lớp.)

### Lời giải Bài 5

- **(a) \`powerOfTwo(n)\`:** đệ quy tuyến tính, mỗi tầng gọi 1 lần, giảm \`n\` đi 1 → độ sâu \`n\`. **Time O(n)** (n lời gọi, mỗi O(1)). **Space O(n)** (stack sâu n+1 frame). Viết lại bằng vòng lặp → space O(1).

- **(b) \`fib(n)\`:** đệ quy nhị phân — mỗi lời gọi sinh 2 lời gọi con.
  - **Time O(2ⁿ)** (chính xác hơn \`Θ(φⁿ)\` với \`φ ≈ 1.618\`). Cây đệ quy có \`~2ⁿ\` nút. Walk-through \`fib(5)\`: gọi \`fib(4)+fib(3)\`, \`fib(4)\` lại gọi \`fib(3)+fib(2)\`... → \`fib(3)\` được tính lại nhiều lần (overlapping subproblems — sẽ tối ưu bằng DP ở Tier 4).
  - **Space O(n)** — không phải O(2ⁿ)! Vì stack chỉ giữ **một nhánh** tại một thời điểm. Độ sâu nhánh dài nhất \`= n\` (\`fib(n)→fib(n-1)→...→fib(0)\`). Đây là điểm tinh tế: **time đếm tổng số nút cây, space chỉ đếm độ sâu cây**.

### Lời giải Bài 6

**Thực sự là O(n²)**, không phải O(n).

**Vì sao:** trong Go, \`string\` là **bất biến (immutable)**. Mỗi \`result += p\` tạo ra một chuỗi **mới** bằng cách copy toàn bộ \`result\` hiện tại + \`p\`. Ở vòng thứ \`k\`, \`result\` đã dài \`~k\` ký tự → phép copy tốn \`O(k)\`. Tổng qua n vòng:

\`1 + 2 + 3 + ... + n = n(n+1)/2 = O(n²)\`

Walk-through với 5 chuỗi mỗi cái 1 ký tự \`["a","b","c","d","e"]\`:

| Vòng | result trước | copy | result sau |
|---|---|---|---|
| 1 | "" (0) | 0+1=1 | "a" |
| 2 | "a" (1) | 1+1=2 | "ab" |
| 3 | "ab" (2) | 2+1=3 | "abc" |
| 4 | "abc" (3) | 3+1=4 | "abcd" |
| 5 | "abcd" (4) | 4+1=5 | "abcde" |

Tổng copy \`= 1+2+3+4+5 = 15 = 5·6/2\`. Với \`n\` phần tử → \`n(n+1)/2 → O(n²)\`.

**Sửa thành O(n)** dùng \`strings.Builder\` (cấp phát buffer tăng theo amortized, không copy lại mỗi lần):

\`\`\`go
import "strings"

func noiChuoiNhanh(parts []string) string {
    var sb strings.Builder
    for _, p := range parts { // n vòng
        sb.WriteString(p)      // amortized O(1) mỗi lần → tổng O(n)
    }
    return sb.String()
}
\`\`\`

\`strings.Builder\` dùng buffer động (như slice) → tổng chi phí ghi \`n\` ký tự là **O(n) amortized** (xem lý do ở [Lesson 02](../lesson-02-amortized-analysis/README.md)). Đây là bug O(n²)-ẩn kinh điển trong nhiều ngôn ngữ (Java cũng vậy với \`String +=\`, dùng \`StringBuilder\`).

### Lời giải Bài 7

- **Time: O(n).** Hai con trỏ \`i\` (từ trái) và \`j\` (từ phải) tiến lại gần nhau. Mỗi vòng lặp **hoặc** \`i++\` **hoặc** \`j--\` → khoảng cách \`j − i\` giảm đúng 1 mỗi vòng. Bắt đầu khoảng cách \`n−1\`, kết thúc khi \`i ≥ j\` → tối đa \`n−1\` vòng → **O(n)**.
- **Space: O(1).** Chỉ vài biến \`i, j, s\`, không phụ thuộc \`n\`.
- **Vì sao không O(n²):** dù bài toán là "tìm cặp", ta **không** thử mọi cặp. Nhờ mảng **đã sắp xếp**, mỗi bước loại được 1 đầu (nếu tổng nhỏ thì tăng đầu trái, lớn thì giảm đầu phải) → mỗi phần tử bị "duyệt qua" đúng 1 lần tổng cộng, không phải mỗi-cặp. Đây là kỹ thuật **two pointers** học kỹ ở Tier 2. (Thử mọi cặp bằng 2 vòng lồng mới là O(n²).)

---

## 📝 Tổng kết toàn bài

1. **Đo tăng trưởng, không đo giây.** Big-O tách thuật toán khỏi máy móc.
2. **O (≤), Ω (≥), Θ (=).** Θ là cái ta thường muốn; "O" đời thường ngầm ý Θ.
3. **Thuộc thứ tự lớp:** \`1 < log n < n < n log n < n² < 2ⁿ < n!\`.
4. **3 case:** best (Ω), average, worst (O) — thường báo cáo worst để có guarantee.
5. **Space** đếm cả stack đệ quy (O(độ sâu)).
6. **Rút gọn:** bỏ hằng số, giữ bậc cao nhất, lồng→nhân, tuần tự→cộng.
7. **Đếm operation:** single=n, nested=n², halving=log n, divide+combine=n log n.
8. **Cạm bẫy:** hằng số quyết định ở n nhỏ; amortized≠worst; phân phối input ảnh hưởng average; string concat trong loop là O(n²) ẩn.

## Bài tiếp theo

→ [Lesson 02 — Phân tích Amortized](../lesson-02-amortized-analysis/README.md): khi worst-case từng thao tác đắt nhưng trung bình rẻ (dynamic array, multipop stack) — giải thích vì sao \`append\`/\`strings.Builder\` là O(1) amortized.

## Minh họa trực quan

→ [visualization.html](./visualization.html): 3 module tương tác — (1) Growth chart vẽ các đường cong độ phức tạp với slider n, (2) Operation counter animate đếm operation theo pattern code, (3) Big-O quiz đoán độ phức tạp của đoạn code.

## Tham khảo

- CLRS, *Introduction to Algorithms*, Ch. 3 (Growth of Functions).
- [\`DataStructures\`](../../DataStructures/) — cấu trúc mà thuật toán chạy trên đó.
`;
