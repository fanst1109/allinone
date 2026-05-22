// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Vectors/Algebra/lesson-05-functions/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — Hàm số là gì

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **hàm số** như một "máy biến đổi": nhận input là một số, trả ra output là một số.
- Đọc và viết được ký hiệu \`y = f(x)\`, \`f: x ↦ f(x)\`.
- Phân biệt hàm số với "quan hệ không phải hàm" (cùng một x ra hai y).
- Xác định **domain** (tập xác định) và **range** (tập giá trị) của một hàm.
- Đọc đồ thị hàm số trên mặt phẳng (Ox, Oy); biết **vertical line test**.
- Tính **hàm hợp** \`(g ∘ f)(x) = g(f(x))\` step-by-step.
- Tìm **hàm ngược** \`f⁻¹\` của một hàm đơn ánh.
- Thấy được vì sao mạng neural là một composition khổng lồ của các hàm số.

## Kiến thức tiền đề

- [Lesson 04 — Lũy thừa, căn, logarit](../lesson-04-powers-roots-logs/) (cần biết \`e^x\`, \`ln(x)\`, \`√x\`).
- Biểu thức đại số, biến (Lesson 02).
- Trục số, tập số ℝ (Lesson 01).

## 1. Hàm số là gì?

Hãy coi một **hàm số** như một **chiếc máy** có:

- Một **đầu vào** (input): một số \`x\`.
- Một **đầu ra** (output): một số khác, ký hiệu \`f(x)\`.

Máy này có **một quy tắc** biến \`x\` thành \`f(x)\`. Quy tắc đó là "chính bản thân" hàm số.

\`\`\`
   x  ──►  [ f ]  ──►  f(x)
 input              output
\`\`\`

### 💡 Trực giác: máy bán nước tự động

Hãy hình dung **máy bán nước tự động** ở siêu thị:

\`\`\`
   10.000đ ──► [ Máy bán nước ] ──► 1 chai nước suối
   15.000đ ──► [ Máy bán nước ] ──► 1 chai trà xanh
   20.000đ ──► [ Máy bán nước ] ──► 1 chai sữa
\`\`\`

Bạn nhét tờ tiền vào (input), máy trả ra đúng một sản phẩm (output). **Đặc tính quan trọng**: nhét cùng một mệnh giá **hai lần khác nhau**, máy luôn trả ra **cùng một sản phẩm**. Nếu lần này nhét 10.000đ ra chai nước, lần khác nhét 10.000đ ra chai trà — đó là máy **hỏng**, không phải máy hoạt động đúng. Hàm số cũng vậy: cùng input → cùng output, **luôn luôn**.

Còn chiều ngược lại thì không bắt buộc: hai mệnh giá khác nhau có thể ra cùng một sản phẩm (vd: 10.000đ và 12.000đ đều ra chai nước suối). Cũng giống \`f(2) = f(−2) = 4\` ở hàm \`x²\` — nhiều input ra cùng output **vẫn ổn**.

**Mở rộng analogy**: nghĩ về *bảng giá* dán trên máy. Bảng giá đó **chính là hàm số**:

\`\`\`
Bảng giá (= quy tắc của hàm):
  10.000đ  →  Nước suối
  12.000đ  →  Nước suối     ← nhiều input, cùng output: OK
  15.000đ  →  Trà xanh
  20.000đ  →  Sữa
\`\`\`

Khi mua, bạn nhìn bảng giá để biết "với mệnh giá này tôi nhận được gì". Bảng giá quyết định một cách dứt khoát — không bao giờ có chuyện "tùy hôm" mà 10.000đ ra nước suối hay sữa. **Quy tắc xác định, ổn định, không phụ thuộc thời điểm**. Đây cũng là tính chất sống còn của hàm số trong toán.

Ngược lại, nếu thay máy bán nước bằng **bốc thăm trúng thưởng** (cùng mệnh giá có thể ra phần thưởng khác nhau theo xác suất) thì đó **không phải hàm số** theo nghĩa toán học — đó là *biến ngẫu nhiên* (sẽ học sau khi tới xác suất).

### 💡 Trực giác: function trong Go cũng là một "máy"

Người học lập trình đã quen với khái niệm "function" trong code. Hãy nhìn:

\`\`\`go
func f(x float64) float64 {
    return 2*x + 1
}
\`\`\`

Đây là **chính xác** một hàm toán học \`f(x) = 2x + 1\`, viết dưới ngôn ngữ Go. Bóc tách từng phần:

- \`func f\` — đặt tên hàm là \`f\`, giống bên toán.
- \`(x float64)\` — khai báo "máy này nhận 1 input, tên \`x\`, kiểu số thực".
- \`float64\` (sau dấu \`)\`) — khai báo "máy này trả ra 1 output, cũng là số thực".
- \`return 2*x + 1\` — **quy tắc**: lấy \`x\`, nhân 2, cộng 1, trả ra.

Gọi \`f(3)\` trong Go cho \`7.0\`. Gọi \`f(3)\` trong toán cho \`7\`. **Cùng quy tắc, cùng kết quả**.

**Đối chiếu bảng**:

| Yếu tố | Toán | Go |
|--------|------|----|
| Tên hàm | \`f\` | \`f\` |
| Tham số input | \`x\` (số thực) | \`x float64\` |
| Kiểu output | số thực | \`float64\` (sau \`)\`) |
| Quy tắc tính | \`2x + 1\` | \`return 2*x + 1\` |
| Gọi hàm | \`f(3)\` = \`7\` | \`f(3)\` = \`7.0\` |

**Đây không phải là sự trùng hợp** — Go (và mọi ngôn ngữ lập trình hiện đại: Python, Java, JavaScript, ...) **mượn khái niệm "function" trực tiếp từ toán**. Lịch sử: lambda calculus của Church (1930s) → Lisp (1958) → tất cả ngôn ngữ sau này. Khi bạn viết \`func\` trong Go, bạn đang nối tiếp một dòng tư duy đã có gần 100 năm.

Điểm khác duy nhất: hàm Go có thể có **hiệu ứng phụ** (in màn hình, ghi file, sửa biến toàn cục), còn hàm toán thì **thuần** (cùng input luôn cùng output, không "nhớ" gì giữa các lần gọi). Mục 8 sẽ nói kỹ.

### Bảng so sánh nhanh: Là hàm vs Không phải hàm

| ✅ Là hàm số | ❌ Không phải hàm số |
|---|---|
| \`y = 2x + 1\` (mỗi x ra 1 y duy nhất) | \`y² = x\` (vd \`x = 4\` ⟹ \`y = 2\` hoặc \`−2\`) |
| \`y = x²\` (mỗi x ra 1 y) | \`x² + y² = 1\` (đường tròn — \`x = 0\` ⟹ \`y = ±1\`) |
| \`y = √x\` với \`x ≥ 0\` (lấy nhánh không âm) | \`y = ±√x\` (kèm dấu ± → 2 output) |
| \`y = sin(x)\` (lượng giác — 1 output cho mỗi x) | \`sin(y) = x\` (giải y theo x ra vô số y) |
| \`y = e^x\` (mũ — luôn 1 output) | Quan hệ "x là bạn của y" (1 người nhiều bạn) |
| Bảng \`{(1,5), (2,7), (3,5), (4,9)}\` (mỗi x xuất hiện 1 lần) | Bảng \`{(1,5), (2,7), (1,9), (3,5)}\` (x=1 hai lần với y khác) |
| \`y = |x|\` (giá trị tuyệt đối) | "Số điện thoại của người có tuổi x" (1 tuổi nhiều người) |

**Mẹo nhận biết "không phải hàm"** — quan sát một trong các dấu hiệu sau:

1. **Có \`±\`** trong biểu thức của y theo x (vd \`y = ±√(x−1)\`).
2. **Lũy thừa chẵn của y** (vd \`y² = ...\`, \`y⁴ = ...\`): giải ra y sẽ kèm \`±\`.
3. **Quan hệ "một-nhiều"** trong đời thực: 1 người có nhiều con, 1 sản phẩm có nhiều khách...
4. **Đồ thị không qua vertical line test** (xem mục 3.2).

### Ký hiệu

Ký hiệu phổ biến nhất:

\`\`\`
y = f(x)
\`\`\`

Đọc là *"y bằng f của x"*. Tức là: \`y\` là output, \`x\` là input, \`f\` là tên của hàm (quy tắc).

Một ký hiệu khác cũng hay gặp, đặc biệt trong sách toán cao cấp:

\`\`\`
f : x ↦ f(x)
\`\`\`

Đọc là *"f là quy tắc gán x đến f(x)"*. Mũi tên \`↦\` (mapsto) khác với \`→\` (đến) — \`↦\` nói riêng về việc *gán phần tử*, còn \`→\` thường dùng cho "từ tập này sang tập kia". Vd \`f : ℝ → ℝ, x ↦ x²\` nghĩa là *"f là hàm từ ℝ vào ℝ, biến mỗi x thành x²"*.

### 1.1. Ví dụ cụ thể

Cho hàm \`f(x) = 2x + 1\`. Quy tắc là: *"lấy x, nhân 2, cộng 1"*.

Tính một vài giá trị:

| x | Tính | f(x) |
|---|------|------|
| 0 | 2·0 + 1 | 1 |
| 1 | 2·1 + 1 | 3 |
| 3 | 2·3 + 1 | **7** |
| −1 | 2·(−1) + 1 | −1 |
| 0.5 | 2·0.5 + 1 | 2 |

Ta nói: *"f gửi 3 đến 7"*, viết \`f(3) = 7\`.

### 1.2. Định nghĩa quan trọng nhất: mỗi input có **đúng một** output

Đây là **điểm cốt lõi** của hàm số. Nếu bỏ qua điểm này, bạn sẽ nhầm rất nhiều thứ sau này.

> **Một quan hệ giữa x và y được gọi là HÀM SỐ nếu mỗi giá trị x cho ra ĐÚNG MỘT giá trị y.**

Nói cách khác: không có chuyện *"đưa cùng một x vào máy, lần này nó nhả ra 5, lần khác nó nhả ra 7"*. Nếu vậy đó **không** phải hàm số.

#### Ví dụ KHÔNG phải hàm số

Xét quan hệ \`y² = x\`. Với \`x = 4\`:

\`\`\`
y² = 4   ⟹   y = 2  hoặc  y = −2
\`\`\`

→ Cùng một \`x = 4\` cho ra **hai giá trị y**. Đây **không** phải hàm số (theo y).

Nhưng nếu ta đảo lại: \`x = y²\`, coi \`y\` là input, \`x\` là output, thì đó **lại là** hàm số (mỗi \`y\` cho đúng một \`x\`). Cùng một quan hệ, đổi vai trò input/output có thể đổi bản chất "có là hàm hay không".

#### Ví dụ là hàm số nhưng nhiều x cho cùng một y

\`f(x) = x²\`:

- \`f(2) = 4\`, \`f(−2) = 4\`. Hai \`x\` khác nhau cho cùng output → **vẫn là hàm số**, vì điều kiện chỉ yêu cầu *"mỗi x cho duy nhất một y"*, không yêu cầu chiều ngược lại.
- Loại hàm "nhiều input → cùng output" gọi là **không đơn ánh** (not one-to-one). Sẽ quay lại ở mục 7 (hàm ngược).

### 1.3. ❓ Câu hỏi tự nhiên người đọc sẽ hỏi

> *"Khác nhau giữa \`f\` và \`f(x)\`?"*

Đây là câu hỏi gây nhầm số một cho người mới. Hai cách viết **không** đồng nghĩa:

- **\`f\`** là **bản thân hàm** — quy tắc, "chiếc máy". Đây là một **đối tượng** (object) đại diện cho toàn bộ ánh xạ. Khi viết \`f\` không kèm gì, ta đang nói tới *toàn bộ quy tắc, không gắn với một input cụ thể nào*.
- **\`f(x)\`** là **giá trị output** của hàm khi input là \`x\`. Đây là một **số** (hoặc biểu thức theo x). Nó là *kết quả của việc gọi hàm \`f\` với input \`x\`*.

Ví dụ với \`f(x) = x² + 1\`:

| Viết | Ý nghĩa | Loại |
|------|---------|------|
| \`f\` | "Quy tắc: bình phương rồi cộng 1" | Hàm (đối tượng) |
| \`f(3)\` | \`3² + 1 = 10\` | Số (kết quả tính ra) |
| \`f(x)\` | \`x² + 1\` | Biểu thức theo x |
| \`f(a + 1)\` | \`(a+1)² + 1 = a² + 2a + 2\` | Biểu thức theo a |
| \`f ∘ g\` | "Quy tắc: chạy g xong chạy f" | Hàm (đối tượng) |

Trong văn nói toán học, hai cách viết \`f\` và \`f(x)\` thường bị dùng lẫn lộn ("đồ thị của \`f(x)\`" thực ra là "đồ thị của \`f\`"). Không sao — miễn là **bạn biết** chúng khác nhau ở mức khái niệm.

So với Go thì tách bạch hơn:
\`\`\`go
f := func(x float64) float64 { return x*x + 1 }  // f là biến chứa hàm
y := f(3)   // f(3) là lời gọi hàm, y = 10 (số)
g := f      // gán hàm cho biến khác — chuyển "f", không phải "f(3)"
\`\`\`

Khi viết \`f\` (không có dấu \`()\`), bạn đang chỉ vào *cái máy*. Khi viết \`f(3)\`, bạn đang *bấm nút và nhận kết quả*.

> *"Hàm số có nhất thiết phải viết ra công thức không?"*

**Không.** Một hàm chỉ cần có quy tắc rõ ràng "input → output duy nhất", không bắt buộc phải viết được công thức đại số. Bốn cách mô tả phổ biến:

- **Công thức**: \`f(x) = x² + 1\`. Gọn, tính được với mọi x.
- **Bảng giá trị**: vd \`{(0, 1), (1, 2), (2, 5), (3, 10)}\`. Dùng khi dữ liệu thực nghiệm, hoặc khi không có công thức.
- **Đồ thị**: vẽ đường cong trên mặt phẳng.
- **Mô tả bằng lời / thuật toán**: "lấy x, bình phương, cộng 1" — hoặc thậm chí một thuật toán dài (vd hàm tính số nguyên tố thứ n).

**Ví dụ thực tế không có công thức đại số**:
- Hàm "dân số Việt Nam vào năm \`x\`" — chỉ có bảng số liệu thống kê, không công thức.
- Hàm \`π(x)\` đếm số nguyên tố ≤ x — có định nghĩa, nhưng không có công thức đóng đơn giản.
- Hàm "kết quả mạng neural đã train" — biểu diễn được bằng triệu tham số, không gọn lại thành công thức.

Cả 4 cách đều mô tả "cùng một quy tắc". Sẽ nói kỹ ở mục 4.

> *"Hai hàm khác công thức nhưng cùng giá trị tại mọi x — có là 1 hàm không?"*

**Có**. Hàm được định nghĩa bởi *quan hệ input → output*, không phải bởi *cách viết công thức*. Vd:

- \`f(x) = (x + 1)²\` và \`g(x) = x² + 2x + 1\`. Hai công thức nhìn khác, nhưng tính \`f(x)\` và \`g(x)\` tại **mọi** x ∈ ℝ đều ra cùng số. ⟹ **\`f\` và \`g\` là cùng một hàm.**
- \`f(x) = sin²(x) + cos²(x)\` và \`g(x) = 1\`. Theo công thức lượng giác \`sin² + cos² = 1\`, hai hàm này bằng nhau tại mọi x ⟹ là cùng một hàm.

Tiêu chí kiểm tra: nếu \`f\` và \`g\` có **cùng domain** và \`f(x) = g(x)\` với **mọi** x trong domain đó ⟹ chúng là cùng một hàm. Lưu ý điều kiện "cùng domain" — \`f(x) = x\` (domain ℝ) và \`g(x) = x²/x\` (domain ℝ \\ {0}) **không** phải cùng một hàm dù bằng nhau tại x ≠ 0, vì domain khác.

> *"f(x) là số, hay là hàm?"*

\`f\` là hàm (quy tắc). \`f(x)\` là **số** (output đã tính ra cho một x cụ thể, hoặc biểu thức theo x). Khi nói "đồ thị của f(x)" thực ra là nói "đồ thị của f".

### 💡 Trực giác: composition = "xếp 2 máy nối tiếp"

Khi đi sâu hơn, bạn sẽ gặp các phép toán **trên hàm** chứ không chỉ trên số. Phép quan trọng nhất:

**Composition** (\`g ∘ f\`) = xếp hai máy nối tiếp nhau:

\`\`\`
   x ──► [ Máy f ] ──► f(x) ──► [ Máy g ] ──► g(f(x))
\`\`\`

Output của máy \`f\` đi thẳng vào input của máy \`g\`. Hàm "tổng hợp" này — đặt tên \`g ∘ f\` — tự nó cũng là một hàm. Lưu ý: **thứ tự đọc ngược chiều viết** — \`g ∘ f\` đọc *"g sau khi f"*, tức là \`f\` chạy **trước**. Sẽ làm chi tiết ở mục 6.

### 💡 Trực giác: inverse = "máy chạy ngược chiều"

**Hàm ngược** (\`f⁻¹\`) = bóp một nút "rewind" trên máy:

\`\`\`
   x ──► [ Máy f ] ──► y       (chiều thuận)

   y ──► [ Máy f⁻¹ ] ──► x     (chiều ngược)
\`\`\`

Nếu \`f\` "đưa 3 thành 7" thì \`f⁻¹\` "đưa 7 trở lại thành 3". Tức là **đảo input và output**. Sẽ làm chi tiết ở mục 7.

Tóm tắt nhanh trước khi đi tiếp: **composition** nối hàm theo *chuỗi*; **inverse** *đảo* hướng của một hàm. Hai phép này là xương sống của mọi thứ sau này (đạo hàm hàm hợp, hàm log = ngược của hàm mũ, mạng neural = chuỗi composition, ...).

### 1.4. ⚠ Lỗi thường gặp

#### Lỗi 1: Nhầm \`f⁻¹\` với \`1/f\`

\`f⁻¹(x)\` là **hàm ngược** (xem mục 7), **không phải** \`1 / f(x)\`.

Ví dụ với \`f(x) = 2x\`:
- \`f⁻¹(x) = x/2\` (vì nếu \`y = 2x\` thì \`x = y/2\`).
- \`1/f(x) = 1/(2x)\` (chỉ là nghịch đảo số học).
- Tại \`x = 4\`: \`f⁻¹(4) = 2\`, còn \`1/f(4) = 1/8\`. **Hoàn toàn khác**.

Vì sao ký hiệu trùng? Vì ký hiệu \`⁻¹\` mượn từ "phần tử nghịch đảo trong nhóm" — ở nhóm hàm với phép \`∘\`, "nghịch đảo" có nghĩa là hàm ngược. Trùng ký hiệu với nghịch đảo số, gây nhầm.

#### Lỗi 2: Nhầm \`f(x+h)\` thành \`f(x) + h\`

\`f(x+h)\` nghĩa là *gọi hàm với input mới \`x+h\`*, phải thay **toàn bộ** \`x\` trong công thức bằng \`x+h\`.

Ví dụ với \`f(x) = x²\`:
- **Đúng**: \`f(x+h) = (x+h)² = x² + 2xh + h²\`.
- **Sai**: \`f(x+h) = x² + h\` — đây không phải là phép gọi hàm; đây là cộng \`h\` vào kết quả \`f(x)\`.

Verify với số cụ thể \`x = 3, h = 1\`:
- Cách đúng: \`f(4) = 16\`. Công thức \`(3+1)² = 16\` ✓.
- Cách sai: \`f(3) + 1 = 9 + 1 = 10\`. Khác \`16\` rất nhiều.

Đây là lỗi xuất hiện liên tục khi học **đạo hàm** (sẽ dùng \`(f(x+h) − f(x))/h\`). Nhớ kỹ.

#### Lỗi 3: Nhầm \`(f∘g)(x)\` với \`f(x)·g(x)\`

Hai phép toán hoàn toàn khác nhau:
- \`f(x)·g(x)\` = *nhân hai output đã tính ra*.
- \`(f∘g)(x) = f(g(x))\` = *đưa output của g làm input của f*.

Ví dụ với \`f(x) = x + 1\`, \`g(x) = x²\`:
- \`f(x) · g(x) = (x+1) · x² = x³ + x²\` — bậc 3.
- \`(f∘g)(x) = f(g(x)) = f(x²) = x² + 1\` — bậc 2.

Verify với \`x = 2\`:
- Nhân: \`(2+1)·(2²) = 3·4 = 12\`.
- Composition: \`f(g(2)) = f(4) = 5\`.
- Khác hoàn toàn.

#### Lỗi 4: Tìm hàm ngược bằng cách "đảo dấu" thay vì hoán đổi biến

Lỗi rất phổ biến: thấy \`f(x) = 2x + 3\` rồi viết "ngược là \`f⁻¹(x) = −2x − 3\`" — **sai**.

Hàm ngược không phải là "đổi dấu" hay "đảo phép toán nhìn lướt qua". Phải làm đúng 3 bước:
1. Đặt \`y = f(x)\`.
2. **Giải \`x\` theo \`y\`** (đảo các phép toán).
3. Hoán đổi tên biến \`x ↔ y\` để viết \`f⁻¹(x)\`.

Với \`f(x) = 2x + 3\`:
- Đặt \`y = 2x + 3\`. Giải x: \`x = (y − 3)/2\`. Đổi tên: \`f⁻¹(x) = (x − 3)/2\`.
- Verify: \`f(5) = 13\`, \`f⁻¹(13) = (13−3)/2 = 5\` ✓.

Nếu làm sai bằng "đổi dấu": \`f⁻¹(13) = −26 − 3 = −29\`. Không trả về \`5\`.

Chi tiết ở mục 7.

#### Lỗi 5: Quên domain khi nói "hai hàm bằng nhau"

\`f(x) = x\` (domain ℝ) và \`g(x) = x²/x\` (domain ℝ \\ {0}) **không** phải cùng một hàm, dù \`f(x) = g(x)\` tại mọi \`x ≠ 0\`. Lý do: tại \`x = 0\`, \`f(0) = 0\` tính được, còn \`g(0)\` không xác định. **Domain khác → hàm khác**.

### 🔁 Dừng lại tự kiểm tra (mục 1)

Trước khi đi tiếp, hãy tự trả lời:

1. Quan hệ \`y = ±√x\` có phải hàm số không? Vì sao?
2. Cho \`f(x) = 3x − 2\`, tính \`f(x + 2)\` (đừng nhầm thành \`f(x) + 2\`).
3. Hai hàm \`f(x) = x\` và \`g(x) = (x²)/x\` có phải là cùng một hàm? (Gợi ý: nghĩ về domain).
4. Cho \`f(x) = x² + 1\`. Phân biệt \`f\`, \`f(2)\`, \`f(x)\`, \`f(x+1)\` — cái nào là số, cái nào là biểu thức/hàm?
5. Với \`f(x) = 3x\` và \`g(x) = x + 5\`, tính \`(g ∘ f)(2)\` và \`f(2) · g(2)\`. So sánh.

*Đáp án nhanh*:
1. Không — \`x = 1\` ra \`y = ±1\`, hai output.
2. \`f(x+2) = 3(x+2) − 2 = 3x + 4\` (KHÔNG phải \`3x − 2 + 2 = 3x\`).
3. Không — \`f\` có domain ℝ, \`g\` có domain ℝ \\ {0}, dù bằng nhau tại các x ≠ 0.
4. \`f\` = hàm (quy tắc). \`f(2) = 5\` (số). \`f(x) = x² + 1\` (biểu thức theo x). \`f(x+1) = (x+1)² + 1 = x² + 2x + 2\` (biểu thức theo x).
5. \`(g ∘ f)(2) = g(f(2)) = g(6) = 11\`. \`f(2)·g(2) = 6·7 = 42\`. Khác hẳn nhau.

### 📌 Tóm tắt mục 1

- **Hàm số** = quy tắc gán mỗi input \`x\` cho **đúng một** output \`f(x)\`.
- Analogy chuẩn: **máy bán nước** (cùng tiền → cùng sản phẩm) hoặc **function trong Go** (\`func f(x float64) float64\`).
- Dấu hiệu **không phải hàm**: có \`±\`, lũy thừa chẵn của y, quan hệ "một-nhiều".
- \`f\` ≠ \`f(x)\`: \`f\` là hàm (đối tượng), \`f(x)\` là số/biểu thức.
- Hàm có thể mô tả 4 cách: công thức, bảng, đồ thị, lời.
- Hai phép quan trọng: **composition** (nối tiếp 2 hàm) và **inverse** (chạy ngược).
- Lỗi phổ biến: \`f⁻¹ ≠ 1/f\`, \`f(x+h) ≠ f(x) + h\`, \`f∘g ≠ f·g\`, hàm ngược không phải "đổi dấu".

## 2. Domain và Range

Khi một máy chạy, không phải input nào nó cũng nuốt được. Hàm số cũng vậy.

### 2.1. Domain (tập xác định)

**Domain** của hàm \`f\`, ký hiệu \`D(f)\` hoặc \`dom(f)\`, là **tập tất cả các x mà f(x) có nghĩa** (tính được, ra một số thực).

Ví dụ:

| Hàm | Vì sao bị hạn chế | Domain |
|-----|-------------------|--------|
| \`f(x) = 2x + 1\` | Không hạn chế | ℝ |
| \`f(x) = 1/x\` | x = 0 ⟹ chia cho 0 | ℝ \\ {0} |
| \`f(x) = √x\` | x < 0 ⟹ căn của số âm không phải số thực | [0, +∞) |
| \`f(x) = ln(x)\` | x ≤ 0 ⟹ log không xác định | (0, +∞) |
| \`f(x) = 1/(x²−4)\` | x²−4 = 0 ⟹ x = ±2 | ℝ \\ {−2, 2} |

### 2.1.1. Quy trình tìm domain — 3 bước

Mỗi khi gặp một hàm, chạy quy trình 3 bước sau:

> **Bước 1**: Tìm mọi **mẫu số** trong công thức, ép \`mẫu ≠ 0\` ⟹ giải, loại các x làm mẫu bằng 0.
>
> **Bước 2**: Tìm mọi **căn bậc chẵn** (\`√\`, \`⁴√\`, ...), ép \`biểu thức trong căn ≥ 0\` ⟹ giải.
>
> **Bước 3**: Tìm mọi **log** (\`ln\`, \`log_b\`), ép \`biểu thức trong log > 0\` ⟹ giải.
>
> Lấy **giao** của tất cả các điều kiện trên = Domain.

Nếu công thức không có mẫu / căn chẵn / log → Domain = ℝ.

### 2.1.2. Walk-through 5 ví dụ chi tiết

**Ví dụ 1**: \`f(x) = 1/(x − 3)\`.

- Bước 1: mẫu \`x − 3 ≠ 0\` ⟹ \`x ≠ 3\`.
- Bước 2, 3: không có căn / log.

→ **Domain = ℝ \\ {3}** = \`(−∞, 3) ∪ (3, +∞)\`.

**Ví dụ 2**: \`f(x) = √(2x − 6)\`.

- Bước 1: không có mẫu.
- Bước 2: căn bậc 2, ép \`2x − 6 ≥ 0\` ⟹ \`x ≥ 3\`.
- Bước 3: không có log.

→ **Domain = [3, +∞)**.

**Ví dụ 3**: \`f(x) = ln(x² − 4)\`.

- Bước 1: không có mẫu.
- Bước 2: không có căn.
- Bước 3: log, ép \`x² − 4 > 0\` ⟹ \`x² > 4\` ⟹ \`x < −2\` hoặc \`x > 2\`.

→ **Domain = (−∞, −2) ∪ (2, +∞)**.

**Ví dụ 4**: \`f(x) = √(x + 1) / (x − 2)\` — kết hợp nhiều ràng buộc.

- Bước 1: mẫu \`x − 2 ≠ 0\` ⟹ \`x ≠ 2\`.
- Bước 2: căn, ép \`x + 1 ≥ 0\` ⟹ \`x ≥ −1\`.
- Bước 3: không có log.
- Giao: \`x ≥ −1\` AND \`x ≠ 2\`.

→ **Domain = [−1, 2) ∪ (2, +∞)**.

**Ví dụ 5**: \`f(x) = ln(x − 1) / √(5 − x)\` — 3 ràng buộc cùng lúc.

- Bước 1: mẫu \`√(5 − x) ≠ 0\` ⟹ \`5 − x ≠ 0\` ⟹ \`x ≠ 5\`.
- Bước 2: căn, ép \`5 − x ≥ 0\` ⟹ \`x ≤ 5\`. Kết hợp với bước 1: \`x < 5\`.
- Bước 3: log, ép \`x − 1 > 0\` ⟹ \`x > 1\`.
- Giao: \`1 < x < 5\`.

→ **Domain = (1, 5)**.

**Tip**: viết các điều kiện ra giấy thành các dòng riêng, rồi vẽ lên trục số để tìm giao. Khi có ≥ 2 ràng buộc, đừng cố làm trong đầu.

### 2.2. Range (tập giá trị)

**Range** của \`f\`, ký hiệu \`R(f)\` hoặc \`f(D)\`, là **tập tất cả các giá trị f(x) thực sự đạt được** khi \`x\` chạy khắp domain.

Ví dụ:

| Hàm | Domain | Range | Giải thích |
|-----|--------|-------|------------|
| \`f(x) = 2x + 1\` | ℝ | ℝ | x kéo đi khắp ℝ thì 2x+1 cũng kéo khắp ℝ |
| \`f(x) = x²\` | ℝ | [0, +∞) | Bình phương không bao giờ âm |
| \`f(x) = 1/x\` | ℝ \\ {0} | ℝ \\ {0} | Không bao giờ ra 0 |
| \`f(x) = e^x\` | ℝ | (0, +∞) | e^x > 0 với mọi x |
| \`f(x) = sin(x)\` | ℝ | [−1, 1] | sin bị chặn |

**Lưu ý**: tìm range thường khó hơn tìm domain. Cần phân tích biến thiên hoặc hình dung đồ thị.

### 2.2.1. Cách tiếp cận khi tìm range

Không có "quy trình 3 bước" cho range — phải kết hợp **một trong ba** chiến lược:

1. **Hình dung đồ thị**: vẽ thô, nhìn xem y "với tới" những giá trị nào.
2. **Giải y theo x**, hỏi *"y nào thì có x trả lại?"*. Nếu giải được \`x = h(y)\` với mọi \`y\` trong tập T, thì T = range.
3. **Phân tích biểu thức**: dùng tính chất "bình phương ≥ 0", "exp > 0", "sin/cos ∈ [−1, 1]", ...

### 2.2.2. Walk-through 5 ví dụ tìm range

**Ví dụ 1**: \`f(x) = x² + 3\`.

Cách: \`x² ≥ 0\` với mọi x (bình phương không âm) ⟹ \`x² + 3 ≥ 3\`. Đạt được mọi giá trị \`y ≥ 3\` (vd \`y = 3\` khi \`x = 0\`, \`y = 7\` khi \`x = 2\`, ...).

→ **Range = [3, +∞)**.

**Ví dụ 2**: \`f(x) = 1/(x − 1)\`.

Cách: giải y theo x. \`y = 1/(x−1)\` ⟹ \`x − 1 = 1/y\` (yêu cầu \`y ≠ 0\`) ⟹ \`x = 1 + 1/y\`. Với mọi \`y ≠ 0\`, công thức cho ra một x hợp lệ.

→ **Range = ℝ \\ {0}**. Trực giác: \`1/(x−1)\` không bao giờ chạm 0 vì \`1/A = 0\` không có nghiệm.

**Ví dụ 3**: \`f(x) = e^x − 2\`.

Cách: \`e^x > 0\` với mọi x (hàm mũ luôn dương) ⟹ \`e^x − 2 > −2\`. Khi \`x → −∞\`, \`e^x → 0⁺\`, nên \`f(x) → −2⁺\` (tiệm cận, không chạm). Khi \`x → +∞\`, \`f(x) → +∞\`.

→ **Range = (−2, +∞)** (mở tại −2 vì không bao giờ đạt).

**Ví dụ 4**: \`f(x) = 2 sin(x) + 1\`.

Cách: \`sin(x) ∈ [−1, 1]\` ⟹ \`2 sin(x) ∈ [−2, 2]\` ⟹ \`2 sin(x) + 1 ∈ [−1, 3]\`. Đạt được biên: tại \`x = π/2\`, \`sin = 1\`, \`f = 3\`. Tại \`x = −π/2\`, \`sin = −1\`, \`f = −1\`.

→ **Range = [−1, 3]**.

**Ví dụ 5**: \`f(x) = √x\`, domain = \`[0, +∞)\`.

Cách: căn bậc 2 lấy nhánh không âm. \`√0 = 0\`, \`√4 = 2\`, \`√x → +∞\` khi \`x → +∞\`. Mọi giá trị \`y ≥ 0\` đều đạt được (giải \`x = y²\`).

→ **Range = [0, +∞)**.

**Lưu ý điểm khó**: range phụ thuộc vào **domain**. Cùng công thức \`f(x) = x²\`, nhưng:
- Domain = ℝ → Range = \`[0, +∞)\`.
- Domain = \`[1, 3]\` → Range = \`[1, 9]\` (chỉ những giá trị x²  với 1 ≤ x ≤ 3).
- Domain = \`[−2, 1]\` → Range = \`[0, 4]\` (chú ý: y nhỏ nhất tại x = 0, không phải biên).

Vì vậy, mỗi khi tìm range, **luôn nhớ domain đang là gì**.

### 🔁 Dừng lại tự kiểm tra (mục 2)

1. Tìm domain của \`f(x) = √(x² − 9)\`.
2. Tìm domain của \`g(x) = ln(4 − x) / √(x + 2)\`.
3. Tìm range của \`h(x) = 3 − x²\`.
4. Tìm range của \`k(x) = 1/(x² + 1)\`.

*Đáp án nhanh*:
1. \`x² − 9 ≥ 0\` ⟹ \`x ≤ −3\` hoặc \`x ≥ 3\` ⟹ **Domain = (−∞, −3] ∪ [3, +∞)**.
2. log: \`4 − x > 0\` ⟹ \`x < 4\`. Căn ở mẫu: \`x + 2 > 0\` (strict, vì ở mẫu) ⟹ \`x > −2\`. Giao: **Domain = (−2, 4)**.
3. \`x² ≥ 0\` ⟹ \`3 − x² ≤ 3\`. Khi x → ±∞, \`3 − x² → −∞\`. **Range = (−∞, 3]**.
4. \`x² + 1 ≥ 1\` ⟹ \`1/(x²+1) ∈ (0, 1]\`. Đạt \`1\` tại x = 0; tiệm cận \`0\` khi x → ±∞. **Range = (0, 1]**.

### 📌 Tóm tắt mục 2

- **Domain** = "đầu vào hợp lệ"; tìm bằng quy trình 3 bước (mẫu ≠ 0, căn chẵn ≥ 0, log > 0).
- **Range** = "đầu ra thực tế"; tìm bằng đồ thị / giải y theo x / phân tích biểu thức.
- Range phụ thuộc vào domain — đổi domain có thể đổi range.
- Codomain ≠ range: codomain là "danh nghĩa", range là "thực tế".

### 2.3. Trực giác: domain = "đầu vào hợp lệ", range = "đầu ra thực tế"

Domain là **những x bạn được phép đưa vào**. Range là **những y bạn thực sự sẽ thấy đi ra**.

Đừng nhầm range với "codomain" — codomain là tập đích "danh nghĩa" (vd ℝ), còn range là **phần đích thực sự được dùng đến**. Trong các sách phổ thông tiếng Việt, "range" và "tập giá trị" được dùng đồng nghĩa.

## 3. Đồ thị (graph) của hàm số

**Đồ thị** của \`f\` là tập hợp các điểm \`(x, f(x))\` trên mặt phẳng tọa độ Oxy.

- **Trục Ox** (nằm ngang): biểu diễn input \`x\`.
- **Trục Oy** (thẳng đứng): biểu diễn output \`y = f(x)\`.

Một điểm \`(a, b)\` thuộc đồ thị **khi và chỉ khi** \`b = f(a)\`.

### 3.1. Vẽ đồ thị bằng tay (ví dụ: f(x) = x²)

Tính một bảng giá trị:

| x | −2 | −1 | 0 | 1 | 2 |
|---|----|----|---|---|---|
| f(x) | 4 | 1 | 0 | 1 | 4 |

Chấm 5 điểm \`(−2, 4)\`, \`(−1, 1)\`, \`(0, 0)\`, \`(1, 1)\`, \`(2, 4)\` lên mặt phẳng, rồi nối lại bằng đường cong mượt → ra **parabol** mở lên trên.

\`\`\`
   y
   |
 4 *           *
   |
 1   *       *
   |
   *___________  x
  -2 -1  0  1  2
\`\`\`

### 3.2. Vertical Line Test (phép thử đường thẳng đứng)

> **Một đường cong trên mặt phẳng là đồ thị của một HÀM SỐ khi và chỉ khi mọi đường thẳng đứng cắt nó tại không quá 1 điểm.**

Vì sao? Đường thẳng đứng \`x = a\` đi qua tất cả các điểm có hoành độ \`a\`. Nếu nó cắt đồ thị ở 2 điểm \`(a, b₁)\` và \`(a, b₂)\`, thì cùng input \`a\` cho ra 2 output \`b₁ ≠ b₂\` — vi phạm định nghĩa hàm số.

#### ✅ Trường hợp QUA test: y = x² (parabol)

\`\`\`
        y
        |
      4 *     |       *
        |     |
        |     |
      1   *   |   *
        |   * | *
      0 ----------*------ x
       -2 -1  0  1  2
              ↑
        đường x=1, cắt
        đồ thị ở ĐÚNG 1 điểm (1, 1)
\`\`\`

Vẽ đường thẳng đứng tại **bất kỳ** x nào (vd \`x = 1\`): nó cắt parabol tại đúng một điểm \`(1, 1)\`. Thử ở \`x = −2\`: cắt tại \`(−2, 4)\` — vẫn 1 điểm. **Mọi** đường thẳng đứng đều cắt ≤ 1 điểm → **là hàm số**.

#### ❌ Trường hợp KHÔNG QUA test: đường tròn x² + y² = 1

\`\`\`
          y
          |
        1 *
       *  |   *
      *   |    *
     *    |     *
   ─*─────|──────*── x
     *    |     *
      *   |    *
       *  |   *
        −1*
          |
          ↑
    đường x=0, cắt đồ thị ở
    HAI điểm: (0, 1) và (0, −1)
\`\`\`

Đường tròn đơn vị: tại \`x = 0\`, ta thấy cả \`y = 1\` (đỉnh trên) và \`y = −1\` (đỉnh dưới). Một đường thẳng đứng cắt đồ thị **2 lần** → vi phạm định nghĩa → **không phải hàm số** (theo y).

Thử ở \`x = 0.6\`: cắt tại \`(0.6, 0.8)\` và \`(0.6, −0.8)\` — vẫn 2 điểm. **Một** vị trí x cho **hai** y khác nhau — không thể là hàm.

#### Tóm tắt áp dụng vertical line test:

| Đồ thị | Kết quả test | Là hàm? |
|--------|--------------|---------|
| \`y = x²\` (parabol mở lên) | Mọi đường đứng cắt 1 điểm | ✅ |
| \`y = x³\` (cubic) | Mọi đường đứng cắt 1 điểm | ✅ |
| \`y = sin(x)\` (lượn sóng) | Mọi đường đứng cắt 1 điểm | ✅ |
| \`x = y²\` (parabol mở sang phải) | \`x = 4\` cắt tại (4, 2) và (4, −2) | ❌ |
| \`x² + y² = 1\` (đường tròn) | \`x = 0\` cắt tại (0, 1) và (0, −1) | ❌ |
| \`x²/4 + y²/9 = 1\` (ellipse) | \`x = 0\` cắt tại (0, 3) và (0, −3) | ❌ |
| Đường thẳng đứng \`x = 5\` | Cắt nó tại vô số điểm (chính nó) | ❌ |

**Khắc phục**: nếu đồ thị fail test, **chia làm 2 nhánh** sẽ thành 2 hàm. Vd \`x² + y² = 1\` chia thành:
- \`y = √(1 − x²)\` (nửa trên) — hàm OK.
- \`y = −√(1 − x²)\` (nửa dưới) — hàm OK.

Hợp lại không là hàm, nhưng tách ra thì mỗi nửa là hàm.

## 4. Bốn cách biểu diễn cùng một hàm

Cùng một hàm số có thể được "viết ra" theo 4 cách. Lấy ví dụ hàm "lấy x, bình phương, cộng 1":

### 4.1. Công thức

\`\`\`
f(x) = x² + 1
\`\`\`

### 4.2. Bảng giá trị

| x | −2 | −1 | 0 | 1 | 2 |
|---|----|----|---|---|---|
| f(x) | 5 | 2 | 1 | 2 | 5 |

### 4.3. Đồ thị

Parabol đỉnh \`(0, 1)\`, mở lên trên:

\`\`\`
  y
  |
5 *         *
  |
2  *       *
  |
1    *
  +─────────── x
   -2 -1 0 1 2
\`\`\`

### 4.4. Mô tả bằng lời

> "Lấy số x, bình phương lên, rồi cộng thêm 1."

**Khi nào dùng cách nào?**

- **Công thức**: gọn, đại số hóa được, tính được với x bất kỳ. Tốt cho lý thuyết.
- **Bảng**: trực quan với vài giá trị mẫu. Tốt cho dữ liệu thực nghiệm khi chưa biết công thức.
- **Đồ thị**: thấy ngay hình dáng tổng quát (tăng/giảm, cực trị, chặn).
- **Lời**: dễ giải thích cho người chưa biết toán. Nhưng dễ mơ hồ với hàm phức tạp.

## 5. Một số hàm phổ biến

Đây là "bảng chữ cái" của các hàm bạn sẽ gặp đi gặp lại. Lesson 06–07 sẽ học sâu.

### 5.1. Hàm hằng (constant)

\`\`\`
f(x) = c    (c là một số cố định)
\`\`\`

Đồ thị là **đường thẳng nằm ngang** ở chiều cao \`y = c\`. Vd \`f(x) = 3\` luôn ra 3 dù x là gì.

### 5.2. Hàm bậc 1 — đường thẳng (Lesson 06)

\`\`\`
f(x) = ax + b
\`\`\`

Đồ thị là đường thẳng. \`a\` quyết định **độ dốc**, \`b\` là **giao điểm với Oy**.

### 5.3. Hàm bậc 2 — parabol (Lesson 06)

\`\`\`
f(x) = ax² + bx + c   (a ≠ 0)
\`\`\`

Đồ thị là parabol. \`a > 0\` mở lên, \`a < 0\` mở xuống.

### 5.4. Hàm mũ (Lesson 07)

\`\`\`
f(x) = e^x    (hoặc f(x) = a^x với a > 0)
\`\`\`

Range = (0, +∞). Tăng cực nhanh. Là nền tảng của tăng trưởng theo cấp số nhân, softmax trong ML, phân phối chuẩn, ...

### 5.5. Hàm logarit (Lesson 07)

\`\`\`
f(x) = ln(x)   (log tự nhiên)   hoặc   log_b(x)
\`\`\`

Domain = (0, +∞). Là **hàm ngược** của hàm mũ. Tăng cực chậm — gặp khắp nơi trong phân tích thuật toán (O(log n)) và ML (log-likelihood).

### 5.6. Hàm giá trị tuyệt đối

\`\`\`
f(x) = |x|
\`\`\`

Đồ thị hình chữ V đỉnh ở (0, 0). Range = [0, +∞). Trong ML, \`|x|\` xuất hiện ở L1 loss.

### 5.7. Hàm sàn (floor) và hàm trần (ceil)

- \`floor(x)\` = \`⌊x⌋\` = số nguyên lớn nhất ≤ x. Vd \`floor(3.7) = 3\`, \`floor(−1.2) = −2\`.
- \`ceil(x)\` = \`⌈x⌉\` = số nguyên nhỏ nhất ≥ x. Vd \`ceil(3.2) = 4\`, \`ceil(−1.7) = −1\`.

Đồ thị có dạng **bậc thang**. Đây là ví dụ rõ về hàm "không liên tục" — nhưng vẫn là hàm (mỗi x cho đúng 1 y).

## 6. Hàm hợp (function composition)

Hai hàm có thể nối với nhau như hai máy nối tiếp.

\`\`\`
   x ──► [ f ] ──► f(x) ──► [ g ] ──► g(f(x))
\`\`\`

Ký hiệu: \`(g ∘ f)(x) = g(f(x))\`, đọc là *"g hợp f"*. Hàm \`f\` chạy trước, kết quả của \`f\` được đưa vào \`g\`.

### 6.1. Ví dụ chính — tính \`(g ∘ f)(3)\` từng bước

Cho \`f(x) = 2x + 1\` và \`g(x) = x²\`. Tính \`(g ∘ f)(3)\`:

**Cách 1: Tính theo từng máy**

\`\`\`
Input: 3
  │
  ▼
[ Máy f ] : 2·3 + 1 = 7         (Bước 1)
  │
  ▼
[ Máy g ] : 7² = 49             (Bước 2)
  │
  ▼
Output: 49

⟹ (g ∘ f)(3) = 49
\`\`\`

**Cách 2: Lập công thức \`(g ∘ f)(x)\` rồi thay x = 3**

\`\`\`
(g ∘ f)(x) = g(f(x))           ← định nghĩa
           = g(2x + 1)         ← thay f(x) vào ô input của g
           = (2x + 1)²          ← áp dụng quy tắc của g (bình phương)
\`\`\`

Thay \`x = 3\`: \`(2·3 + 1)² = 7² = 49\` ✓. Cùng kết quả với Cách 1.

**Cách nào tốt hơn?** Tùy:
- Nếu cần *một giá trị cụ thể* → Cách 1 nhanh hơn (không cần khai triển đại số).
- Nếu cần *công thức tổng quát* (vd để khảo sát đồ thị \`g ∘ f\`, hoặc tính đạo hàm) → Cách 2 bắt buộc.

### 6.2. \`g ∘ f\` KHÁC \`f ∘ g\` — phép composition không giao hoán

Với cùng \`f(x) = 2x + 1\`, \`g(x) = x²\`, tính **chiều ngược** \`(f ∘ g)(x)\`:

\`\`\`
(f ∘ g)(x) = f(g(x))
           = f(x²)              ← thay g(x) vào ô input của f
           = 2·x² + 1           ← áp dụng quy tắc của f (nhân 2, cộng 1)
\`\`\`

So sánh hai composition:

| Composition | Công thức | Tại x = 3 | Tại x = 0 | Tại x = −1 |
|-------------|-----------|-----------|-----------|------------|
| \`(g ∘ f)(x)\` | \`(2x + 1)²\` = \`4x² + 4x + 1\` | 49 | 1 | 1 |
| \`(f ∘ g)(x)\` | \`2x² + 1\` | 19 | 1 | 3 |

**Khác nhau hoàn toàn** — bậc khác (bậc 2 cả hai nhưng hệ số khác), giá trị khác. Composition **không giao hoán**: \`g ∘ f ≠ f ∘ g\` trong trường hợp tổng quát.

Trực giác: "cộng 1 rồi bình phương" khác với "bình phương rồi cộng 1". Thứ tự thực hiện hai biến đổi quyết định kết quả.

### 6.3. Thêm 2 ví dụ chi tiết

**Ví dụ A**: \`f(x) = x + 5\`, \`g(x) = 3x\`. Tính \`(f ∘ g)(2)\` và \`(g ∘ f)(2)\`.

Tính \`(f ∘ g)(2)\`:
- Bước 1: \`g(2) = 3·2 = 6\`.
- Bước 2: \`f(6) = 6 + 5 = 11\`.
- ⟹ \`(f ∘ g)(2) = 11\`.

Tính \`(g ∘ f)(2)\`:
- Bước 1: \`f(2) = 2 + 5 = 7\`.
- Bước 2: \`g(7) = 3·7 = 21\`.
- ⟹ \`(g ∘ f)(2) = 21\`.

Công thức tổng quát:
- \`(f ∘ g)(x) = f(3x) = 3x + 5\`.
- \`(g ∘ f)(x) = g(x + 5) = 3(x + 5) = 3x + 15\`.

→ Khác nhau **10 đơn vị** với mọi x. Trực giác: trong \`f ∘ g\`, ta "cộng 5 vào *kết quả nhân 3*". Trong \`g ∘ f\`, ta "nhân 3 *cả cộng 5*" — nên cái 5 ban đầu bị nhân lên thành 15.

**Ví dụ B**: \`f(x) = √x\` (domain \`x ≥ 0\`), \`g(x) = x − 1\`. Tính \`(f ∘ g)(x)\` và xác định domain.

- Công thức: \`(f ∘ g)(x) = f(x − 1) = √(x − 1)\`.
- Domain: cần \`g(x) = x − 1\` nằm trong domain của \`f\` (tức là \`≥ 0\`) ⟹ \`x − 1 ≥ 0\` ⟹ \`x ≥ 1\`.
- **Domain của \`f ∘ g\` = \`[1, +∞)\`**.

Đây là điểm quan trọng: domain của composition **không** mặc nhiên là domain của hàm ngoài. Phải đảm bảo *output của hàm trong* (\`g(x)\`) nằm trong *domain của hàm ngoài* (\`f\`).

Chiều ngược: \`(g ∘ f)(x) = g(√x) = √x − 1\`, domain \`x ≥ 0\` (chính là domain của \`f\`).

### 6.4. Composition 3 hàm: \`(h ∘ g ∘ f)(x)\`

Ba hàm xếp thành chuỗi cũng tương tự — chạy từ trong ra ngoài:

\`\`\`
x ──► f ──► f(x) ──► g ──► g(f(x)) ──► h ──► h(g(f(x)))
\`\`\`

Ví dụ: \`f(x) = x + 1\`, \`g(x) = 2x\`, \`h(x) = x²\`. Tính \`(h ∘ g ∘ f)(3)\`:
- \`f(3) = 4\`.
- \`g(4) = 8\`.
- \`h(8) = 64\`.
- ⟹ kết quả = \`64\`.

Đây chính là cấu trúc của neural network (xem mục 8).

### 🔁 Dừng lại tự kiểm tra (mục 6)

1. Cho \`f(x) = x − 1\`, \`g(x) = x²\`. Tính \`(g ∘ f)(4)\` và \`(f ∘ g)(4)\`.
2. Lập công thức tổng quát cho \`(g ∘ f)(x)\` và \`(f ∘ g)(x)\` ở câu 1.
3. Cho \`f(x) = √x\`, \`g(x) = 4 − x\`. Tìm domain của \`f ∘ g\`.

*Đáp án nhanh*:
1. \`f(4) = 3\`, \`g(3) = 9\` ⟹ \`(g ∘ f)(4) = 9\`. \`g(4) = 16\`, \`f(16) = 15\` ⟹ \`(f ∘ g)(4) = 15\`.
2. \`(g ∘ f)(x) = (x − 1)²\`. \`(f ∘ g)(x) = x² − 1\`.
3. \`(f ∘ g)(x) = √(4 − x)\`, cần \`4 − x ≥ 0\` ⟹ \`x ≤ 4\`. Domain = \`(−∞, 4]\`.

### 📌 Tóm tắt mục 6

- **Composition** \`(g ∘ f)(x) = g(f(x))\`: chạy f trước, kết quả của f là input của g.
- Tính 2 cách: từng máy (nhanh cho 1 giá trị), hoặc lập công thức tổng quát (cần cho khảo sát).
- **Không giao hoán**: \`g ∘ f ≠ f ∘ g\` trong tổng quát.
- Domain của \`f ∘ g\`: cần output của g nằm trong domain của f.

### 6.5. Vì sao composition quan trọng cho ML?

**Mạng neural sâu (deep neural network) chính là một composition khổng lồ.**

Một mạng có L lớp tính toán như sau:

\`\`\`
output = f_L( f_{L-1}( ... f_2( f_1(input) ) ... ) )
       = (f_L ∘ f_{L-1} ∘ ... ∘ f_1)(input)
\`\`\`

Mỗi \`f_i\` thường có dạng:

\`\`\`
f_i(x) = activation( W_i · x + b_i )
\`\`\`

Trong đó \`W_i\` là ma trận, \`b_i\` là vector, \`activation\` là một hàm số (sigmoid, ReLU, tanh — sẽ thấy trong viz).

→ Khi bạn nghe câu *"deep learning học bằng cách điều chỉnh hàng triệu tham số trong các lớp hàm chồng lên nhau"* — chính là điều này.

## 7. Hàm ngược (inverse function)

### 7.1. Trực giác

Nếu \`f\` là máy "biến x thành y", thì **hàm ngược** \`f⁻¹\` là máy "biến y trở lại x". Nó **đảo ngược** hành động của \`f\`.

\`\`\`
   x ──► [ f ] ──► y        y ──► [ f⁻¹ ] ──► x
\`\`\`

Ký hiệu \`f⁻¹\` (đọc là "f ngược") — **không phải** \`1/f\`. Đây là quy ước dễ gây nhầm.

### 7.2. Điều kiện tồn tại: f phải đơn ánh

\`f⁻¹\` chỉ tồn tại khi \`f\` **đơn ánh** (one-to-one, injective): hai input khác nhau cho hai output khác nhau.

Vì sao? Nếu \`f(2) = f(−2) = 4\` (như \`f(x) = x²\`), thì khi cần đảo ngược, hỏi *"cái nào ra \`4\`?"* — không trả lời được vì có cả \`2\` và \`−2\`. Không có cách nào định nghĩa \`f⁻¹(4)\` cho hợp lý.

**Cách thử bằng đồ thị**: **horizontal line test** — mọi đường thẳng ngang cắt đồ thị tối đa 1 điểm thì f đơn ánh.

### 7.3. Quy trình tìm hàm ngược — 3 bước

> **Bước 1**: Đặt \`y = f(x)\` (viết hàm ra dưới dạng phương trình).
>
> **Bước 2**: **Giải \`x\` theo \`y\`** (đảo các phép toán: cộng → trừ, nhân → chia, mũ → log, ...).
>
> **Bước 3**: **Hoán đổi tên biến** \`x ↔ y\` để có \`f⁻¹(x) = ...\`. (Bước này chỉ là quy ước đặt tên — vì ta thường viết biến input là \`x\`.)

**Lý do bước 3**: vai trò input/output bị đảo trong \`f⁻¹\`. Ban đầu \`f\` nhận \`x\` ra \`y\`; bây giờ \`f⁻¹\` nhận \`y\` ra \`x\`. Để giữ thói quen "biến input gọi là \`x\`", ta đổi tên cuối cùng.

### 7.4. Walk-through 3 ví dụ

**Ví dụ 1**: tìm hàm ngược của \`f(x) = 2x + 3\`.

- Bước 1: \`y = 2x + 3\`.
- Bước 2: giải \`x\` theo \`y\`:
  \`\`\`
  y = 2x + 3
  y − 3 = 2x              (trừ 3 hai vế)
  x = (y − 3) / 2          (chia 2 hai vế)
  \`\`\`
- Bước 3: hoán đổi \`x ↔ y\`:
  \`\`\`
  f⁻¹(x) = (x − 3) / 2
  \`\`\`

**Kiểm tra** (phép thử "vào ra"):
- \`f(5) = 2·5 + 3 = 13\`.
- \`f⁻¹(13) = (13 − 3) / 2 = 5\` ✓.
- Hoặc kiểm tra công thức: \`f⁻¹(f(x)) = f⁻¹(2x + 3) = ((2x+3) − 3)/2 = 2x/2 = x\` ✓.

**Ví dụ 2**: tìm hàm ngược của \`f(x) = (x + 4) / 3\`.

- Bước 1: \`y = (x + 4)/3\`.
- Bước 2:
  \`\`\`
  3y = x + 4              (nhân 3 hai vế)
  x = 3y − 4              (trừ 4)
  \`\`\`
- Bước 3: \`f⁻¹(x) = 3x − 4\`.

Kiểm tra: \`f(2) = 6/3 = 2\`. \`f⁻¹(2) = 6 − 4 = 2\`. Cũng có thể thử \`f(8) = 12/3 = 4\`, \`f⁻¹(4) = 12 − 4 = 8\` ✓.

**Ví dụ 3**: tìm hàm ngược của \`f(x) = e^(x) + 1\`.

- Bước 1: \`y = e^x + 1\`.
- Bước 2:
  \`\`\`
  y − 1 = e^x             (trừ 1)
  ln(y − 1) = x           (lấy ln hai vế — vì ln là ngược của e^)
  \`\`\`
  Lưu ý: cần \`y − 1 > 0\` ⟹ \`y > 1\` (domain của \`f⁻¹\`).
- Bước 3: \`f⁻¹(x) = ln(x − 1)\`, domain \`x > 1\`.

Kiểm tra: \`f(0) = e^0 + 1 = 2\`. \`f⁻¹(2) = ln(1) = 0\` ✓.

**Ví dụ 4 (khó hơn)**: tìm hàm ngược của \`f(x) = (2x + 1)/(x − 3)\`.

- Bước 1: \`y = (2x + 1)/(x − 3)\`.
- Bước 2: nhân chéo:
  \`\`\`
  y(x − 3) = 2x + 1
  yx − 3y = 2x + 1
  yx − 2x = 3y + 1         (gom x sang trái)
  x(y − 2) = 3y + 1
  x = (3y + 1) / (y − 2)
  \`\`\`
- Bước 3: \`f⁻¹(x) = (3x + 1) / (x − 2)\`, domain \`x ≠ 2\`.

Kiểm tra: \`f(4) = 9/1 = 9\`. \`f⁻¹(9) = (27 + 1)/(9 − 2) = 28/7 = 4\` ✓.

### 7.5. Phép thử "vào ra"

Nếu \`g\` thực sự là hàm ngược của \`f\`, thì:

\`\`\`
f( g(y) ) = y   với mọi y thuộc range của f
g( f(x) ) = x   với mọi x thuộc domain của f
\`\`\`

Tức là chạy qua máy \`f\` rồi qua máy \`g\` thì trở lại điểm xuất phát.

### 7.6. Đồ thị: f và f⁻¹ đối xứng qua đường y = x

Đây là sự thật hình học rất đẹp:

> **Đồ thị của \`f⁻¹\` là đối xứng của đồ thị \`f\` qua đường thẳng \`y = x\`.**

Lý do: điểm \`(a, b)\` thuộc đồ thị \`f\` ⟺ \`b = f(a)\` ⟺ \`a = f⁻¹(b)\` ⟺ \`(b, a)\` thuộc đồ thị \`f⁻¹\`. Mà \`(a, b)\` và \`(b, a)\` đối xứng nhau qua \`y = x\`.

#### ASCII minh họa: f(x) = 2x + 1 và f⁻¹(x) = (x − 1)/2

\`\`\`
              y
              |        y = 2x + 1
              |       /  (đồ thị f)
            5 +      /
              |     /
            3 +    /        y = x
              |   /      /  (trục đối xứng)
            1 +  /    /
              | /  /
   ───────────+ /─────────────── x
             /| 1   3    5
            / |    /
           /  |  /   y = (x − 1)/2
          /   |/      (đồ thị f⁻¹)
         /  / +
        / /   |
      −1     |
              |

  Một số điểm tương ứng:
    f:  (0, 1)   ↔   f⁻¹: (1, 0)
    f:  (1, 3)   ↔   f⁻¹: (3, 1)
    f:  (2, 5)   ↔   f⁻¹: (5, 2)
    f:  (3, 7)   ↔   f⁻¹: (7, 3)
\`\`\`

Mỗi cặp điểm \`(a, b)\` của \`f\` và \`(b, a)\` của \`f⁻¹\` đối xứng qua đường \`y = x\` (đường chéo). Lật tờ giấy theo đường chéo này, đồ thị \`f\` trùng đồ thị \`f⁻¹\`.

**Hiện tượng tương tự với hàm khác**:
- \`f(x) = e^x\` và \`f⁻¹(x) = ln(x)\`: đồ thị mũ và log đối xứng qua \`y = x\`. Đó là lý do bạn thấy chúng "phản chiếu" nhau trong sách giáo khoa.
- \`f(x) = x³\` và \`f⁻¹(x) = ∛x\`: cũng đối xứng qua \`y = x\`.

Visualization sẽ vẽ rõ điều này.

### 🔁 Dừng lại tự kiểm tra (mục 7)

1. Tìm hàm ngược của \`f(x) = 4x − 5\`.
2. Tìm hàm ngược của \`g(x) = 1/(x + 2)\`.
3. Hàm \`h(x) = x²\` (domain ℝ) **có** hàm ngược không? Vì sao?
4. Nếu \`f(3) = 11\`, thì \`f⁻¹(11) = ?\`

*Đáp án nhanh*:
1. \`y = 4x − 5\` ⟹ \`x = (y + 5)/4\` ⟹ \`f⁻¹(x) = (x + 5)/4\`.
2. \`y = 1/(x+2)\` ⟹ \`x + 2 = 1/y\` ⟹ \`x = 1/y − 2\` ⟹ \`g⁻¹(x) = 1/x − 2\`, domain \`x ≠ 0\`.
3. **Không** trên domain ℝ — vì \`h(2) = h(−2) = 4\`, không đơn ánh. Nếu giới hạn domain \`[0, +∞)\` thì có: \`h⁻¹(x) = √x\`.
4. \`f⁻¹(11) = 3\` (vì nếu \`f\` đưa 3 đến 11 thì \`f⁻¹\` đưa 11 trở lại 3).

### 📌 Tóm tắt mục 7

- **Hàm ngược** \`f⁻¹\` = "máy chạy ngược": đảo input và output.
- Điều kiện tồn tại: \`f\` phải **đơn ánh** (mỗi y chỉ có 1 x trả lại).
- Tìm \`f⁻¹\`: **3 bước** — (1) \`y = f(x)\`, (2) giải \`x\` theo \`y\`, (3) hoán đổi \`x ↔ y\`.
- Đồ thị \`f\` và \`f⁻¹\` **đối xứng qua \`y = x\`**.
- Tính chất: \`f(f⁻¹(y)) = y\` và \`f⁻¹(f(x)) = x\`.

## 8. Liên hệ với lập trình và ML

### 8.1. Hàm Go = hàm toán học (gần như)

\`\`\`go
func f(x float64) float64 {
    return 2*x + 1
}

func main() {
    y := f(3)         // y = 7
    fmt.Println(y)
}
\`\`\`

Hàm Go nhận input là một số, trả về một số — đúng như hàm toán. Khác biệt quan trọng: hàm Go có thể có **hiệu ứng phụ** (in ra màn hình, sửa biến toàn cục), còn hàm toán thì **thuần** (cùng input luôn ra cùng output, không "nhớ" gì). Trong ML và lập trình hàm (functional), người ta cố giữ hàm thuần để dễ suy luận.

### 8.2. Hàm bậc cao: composition trong code

Trong Go, hàm có thể là **giá trị** (truyền hàm vào hàm khác):

\`\`\`go
func compose(f, g func(float64) float64) func(float64) float64 {
    return func(x float64) float64 {
        return g(f(x))  // (g ∘ f)(x)
    }
}
\`\`\`

Hàm \`compose\` nhận \`f\` và \`g\`, trả về **hàm mới** \`g ∘ f\`. Đây là cách mạng neural được mô tả dưới dạng "chuỗi composition".

### 8.3. Mạng neural 2 lớp dưới dạng composition

Lấy mạng đơn giản nhất — **mạng feedforward 2 lớp**. Công thức tổng quát:

\`\`\`
f(x) = W₂ · ReLU(W₁ · x + b₁) + b₂
\`\`\`

Trong đó:
- \`x\` là vector input (vd ảnh 28×28 = 784 chiều với MNIST).
- \`W₁\` là ma trận trọng số lớp 1, \`b₁\` là vector bias lớp 1.
- \`W₂\` là ma trận trọng số lớp 2, \`b₂\` là vector bias lớp 2.
- \`ReLU\` là activation function (xem 8.4).

**Bóc tách thành 4 hàm con xếp composition**:

| Bước | Hàm | Vai trò |
|------|-----|---------|
| 1 | \`h₁(x) = W₁ · x + b₁\` | "Affine" lớp 1 (nhân ma trận + cộng bias) |
| 2 | \`h₂(u) = ReLU(u)\` | Activation lớp 1 (phi tuyến) |
| 3 | \`h₃(v) = W₂ · v + b₂\` | "Affine" lớp 2 |
| 4 | (output) | (không cần activation cuối nếu là regression; nếu phân loại thì thêm softmax) |

Toàn bộ mạng = composition:

\`\`\`
f = h₃ ∘ h₂ ∘ h₁
f(x) = h₃(h₂(h₁(x)))
\`\`\`

Mỗi mũi tên \`∘\` trong công thức tương đương một "tầng" của mạng. Mạng **deep** thì xếp 10, 50, 100 tầng — vẫn chỉ là composition dài hơn.

Khi training, ta điều chỉnh \`W₁, b₁, W₂, b₂\` để \`f(x)\` xấp xỉ output mong muốn. **Đạo hàm hàm hợp** (chain rule) chính là công cụ — sẽ học ở Lesson Calculus.

### 8.4. Activation functions phổ biến

Activation **phi tuyến** xen giữa các lớp affine là yếu tố sống còn — không có nó, một mạng N lớp chỉ tương đương 1 lớp (vì composition của hàm tuyến tính vẫn tuyến tính). Activation tạo "uốn cong" cho mạng.

Bốn activation thường gặp nhất:

| Tên | Công thức | Range | Đặc điểm | Khi nào dùng |
|-----|-----------|-------|----------|--------------|
| **Sigmoid** | \`σ(x) = 1 / (1 + e^(−x))\` | (0, 1) | Mịn, bị "bão hòa" khi \`|x|\` lớn (đạo hàm → 0) | Output xác suất nhị phân (binary classification) |
| **Tanh** | \`tanh(x) = (e^x − e^(−x)) / (e^x + e^(−x))\` | (−1, 1) | Như sigmoid nhưng đối xứng quanh 0 | RNN cũ; hiện ít dùng |
| **ReLU** | \`relu(x) = max(0, x)\` | [0, +∞) | Đơn giản, tính nhanh, không bão hòa với x > 0 | **Mặc định** trong CNN, Transformer feedforward |
| **GeLU** | \`gelu(x) = x · Φ(x)\` (Φ = CDF chuẩn) | (~−0.17, +∞) | "ReLU mịn" theo xác suất; xấp xỉ \`0.5x(1 + tanh(√(2/π)(x + 0.044715x³)))\` | Mặc định trong Transformer hiện đại (BERT, GPT) |

Thêm Softplus (ít gặp): \`softplus(x) = ln(1 + e^x)\` — luôn dương, mịn, xấp xỉ ReLU.

**Đồ thị thô**:
\`\`\`
ReLU:        Sigmoid:        Tanh:          GeLU:
   ╱            ▔▔             ▔             ╱
  ╱            ╱              ╱              ╱ 
 ╱            ╱              ╱              ╱
─────       ╱            ─────             ─
            ▁▁              ╱             ╲╱
                          ▁▁                
\`\`\`

(ReLU: hình "khúc gãy" tại 0. Sigmoid: chữ S, từ 0 đến 1. Tanh: chữ S, từ −1 đến 1. GeLU: gần ReLU nhưng có "khúc cua" mịn ở 0, hơi âm trước khi về 0.)

Tất cả đều là **hàm số** đúng nghĩa bài này — input 1 số, output 1 số, mỗi input cho đúng 1 output. Visualization sẽ vẽ chính xác và cho bạn so sánh trực quan.

### 8.5. Vì sao học hàm số = bước đệm cho ML

- **Mạng neural** = composition của các hàm \`affine + activation\`.
- **Loss function** (sai số huấn luyện) là một **hàm số** từ tham số (\`W\`, \`b\`) ra một số đo "tệ".
- **Training** = tìm cực tiểu của loss function (sẽ học gradient descent).
- **Hàm ngược** xuất hiện trong normalizing flow (mô hình sinh), invertible neural network, ...
- **Domain/range** xuất hiện trong activation phù hợp với loại bài toán (sigmoid cho xác suất, softmax cho nhiều lớp).

Mọi khái niệm ở lesson này — bạn sẽ gặp lại đủ trong ML.

## 9. Bài tập

### Bài 1: Đánh giá và giải

Cho \`f(x) = 3x − 2\`.

a) Tính \`f(0)\`, \`f(2)\`, \`f(−1)\`, \`f(0.5)\`.
b) Tìm \`x\` để \`f(x) = 10\`.

### Bài 2: Tìm domain

Tìm domain của:

a) \`f(x) = √(x − 3)\`
b) \`g(x) = 1 / (x² − 4)\`
c) \`h(x) = ln(x)\`
d) \`k(x) = √(x − 3) / (x − 5)\`  *(thêm để luyện)*

### Bài 3: Hàm hợp

Cho \`f(x) = x + 1\`, \`g(x) = 2x\`.

a) Tính \`(f ∘ g)(x)\`.
b) Tính \`(g ∘ f)(x)\`.
c) Tính \`f(f(x))\`.
d) Hai biểu thức ở câu a và b có bằng nhau không? Giải thích.

### Bài 4: Hàm ngược

Tìm hàm ngược của:

a) \`f(x) = 5x − 7\`
b) \`g(x) = (x + 1) / (x − 2)\`
c) \`h(x) = e^(2x)\`

### Bài 5: Code Go

Viết hàm \`compose(f, g func(float64) float64) func(float64) float64\` trả về hàm hợp \`g ∘ f\`. Test với \`f(x) = 2x + 1\`, \`g(x) = x²\`, in ra \`(g ∘ f)(3)\`.

## 10. Lời giải chi tiết

### Bài 1

\`f(x) = 3x − 2\`.

a)
- \`f(0) = 3·0 − 2 = −2\`.
- \`f(2) = 3·2 − 2 = 4\`.
- \`f(−1) = 3·(−1) − 2 = −5\`.
- \`f(0.5) = 3·0.5 − 2 = 1.5 − 2 = −0.5\`.

b) \`f(x) = 10\`:
\`\`\`
3x − 2 = 10
3x = 12
x = 4
\`\`\`

### Bài 2

a) \`f(x) = √(x − 3)\`: trong căn phải ≥ 0 ⟹ \`x − 3 ≥ 0\` ⟹ \`x ≥ 3\`.
→ **Domain = [3, +∞)**.

b) \`g(x) = 1/(x² − 4)\`: mẫu khác 0 ⟹ \`x² ≠ 4\` ⟹ \`x ≠ ±2\`.
→ **Domain = ℝ \\ {−2, 2}**.

c) \`h(x) = ln(x)\`: log xác định khi đối số > 0 ⟹ \`x > 0\`.
→ **Domain = (0, +∞)**.

d) \`k(x) = √(x − 3) / (x − 5)\`: hai điều kiện cùng lúc:
- \`x − 3 ≥ 0\` ⟹ \`x ≥ 3\`.
- \`x − 5 ≠ 0\` ⟹ \`x ≠ 5\`.
→ **Domain = [3, 5) ∪ (5, +∞)**.

### Bài 3

\`f(x) = x + 1\`, \`g(x) = 2x\`.

a) \`(f ∘ g)(x) = f(g(x)) = f(2x) = 2x + 1\`.

b) \`(g ∘ f)(x) = g(f(x)) = g(x + 1) = 2(x + 1) = 2x + 2\`.

c) \`f(f(x)) = f(x + 1) = (x + 1) + 1 = x + 2\`.

d) Không. \`(f ∘ g)(x) = 2x + 1\` còn \`(g ∘ f)(x) = 2x + 2\`. Hai biểu thức khác nhau (chênh đúng 1 đơn vị) với mọi x.

Lý do tổng quát: composition không có tính giao hoán. Thứ tự thực hiện hai phép biến đổi quan trọng — "nhân 2 rồi cộng 1" khác với "cộng 1 rồi nhân 2".

### Bài 4

a) \`f(x) = 5x − 7\`. Đặt \`y = 5x − 7\` ⟹ \`5x = y + 7\` ⟹ \`x = (y + 7)/5\`.
→ **f⁻¹(x) = (x + 7) / 5**.

Kiểm tra: \`f(3) = 5·3 − 7 = 8\`. \`f⁻¹(8) = (8 + 7)/5 = 3\` ✓.

b) \`g(x) = (x + 1)/(x − 2)\`. Đặt \`y = (x + 1)/(x − 2)\`. Nhân chéo:
\`\`\`
y(x − 2) = x + 1
yx − 2y = x + 1
yx − x = 2y + 1
x(y − 1) = 2y + 1
x = (2y + 1) / (y − 1)
\`\`\`
→ **g⁻¹(x) = (2x + 1) / (x − 1)** (domain x ≠ 1).

Kiểm tra với \`x = 3\`: \`g(3) = 4/1 = 4\`. \`g⁻¹(4) = (8 + 1)/(4 − 1) = 9/3 = 3\` ✓.

c) \`h(x) = e^(2x)\`. Đặt \`y = e^(2x)\`. Lấy ln hai vế: \`ln(y) = 2x\` ⟹ \`x = ln(y)/2\`.
→ **h⁻¹(x) = ln(x) / 2** (domain x > 0).

Kiểm tra với \`x = 0\`: \`h(0) = e^0 = 1\`. \`h⁻¹(1) = ln(1)/2 = 0\` ✓.

### Bài 5

\`\`\`go
package main

import "fmt"

func compose(f, g func(float64) float64) func(float64) float64 {
    return func(x float64) float64 {
        return g(f(x))
    }
}

func main() {
    f := func(x float64) float64 { return 2*x + 1 }
    g := func(x float64) float64 { return x * x }

    gof := compose(f, g)        // g ∘ f
    fmt.Println(gof(3))         // 49 (vì f(3)=7, g(7)=49)
    fmt.Println(gof(0))         // 1
    fmt.Println(gof(-1))        // 1 (vì f(-1)=-1, g(-1)=1)
}
\`\`\`

Xem chi tiết và bản đầy đủ trong [solutions.go](./solutions.go).

## 11. Tài liệu kèm

- Code lời giải Go: [solutions.go](./solutions.go)
- Visualization tương tác: [visualization.html](./visualization.html)
- Bài trước: [Lesson 04 — Lũy thừa, căn, logarit](../lesson-04-powers-roots-logs/)
- Bài tiếp theo: [Lesson 06 — Hàm bậc 1 và bậc 2](../lesson-06-linear-quadratic/)
- Quay lại lộ trình: [Tầng 1 — Algebra](../)
`;
