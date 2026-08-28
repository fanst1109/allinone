# Lesson 05 — Hàm số là gì

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **hàm số** như một "máy biến đổi": nhận input là một số, trả ra output là một số.
- Đọc và viết được ký hiệu $y = f(x)$, $f: x \mapsto f(x)$.
- Phân biệt hàm số với "quan hệ không phải hàm" (cùng một x ra hai y).
- Xác định **domain** (tập xác định) và **range** (tập giá trị) của một hàm.
- Đọc đồ thị hàm số trên mặt phẳng (Ox, Oy); biết **vertical line test**.
- Tính **hàm hợp** $(g \circ f)(x) = g(f(x))$ step-by-step.
- Tìm **hàm ngược** $f^{-1}$ của một hàm đơn ánh.
- Thấy được vì sao mạng neural là một composition khổng lồ của các hàm số.

## Kiến thức tiền đề

- [Lesson 04 — Lũy thừa, căn, logarit](../lesson-04-powers-roots-logs/) (cần biết $e^x$, $\ln(x)$, $\sqrt{x}$).
- Biểu thức đại số, biến (Lesson 02).
- Trục số, tập số $\mathbb{R}$ (Lesson 01).

## 1. Hàm số là gì?

Hãy coi một **hàm số** như một **chiếc máy** có:

- Một **đầu vào** (input): một số $x$.
- Một **đầu ra** (output): một số khác, ký hiệu $f(x)$.

Máy này có **một quy tắc** biến $x$ thành $f(x)$. Quy tắc đó là "chính bản thân" hàm số.

<svg viewBox="0 0 392 100" style="max-width:392px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Hàm như cái máy: đưa input x vào máy f, ra output f(x)">
  <defs><marker id="f1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <text x="66.0" y="55.0" fill="#475569" font-size="14" text-anchor="middle" font-weight="700" font-style="italic">x (input)</text>
  <line x1="116.0" y1="50.0" x2="152.0" y2="50.0" stroke="#1a202c" stroke-width="2" marker-end="url(#f1)"/>
  <rect x="160.0" y="30.0" width="40.0" height="40.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="180.0" y="55.0" fill="#1d4ed8" font-size="13" text-anchor="middle" font-weight="700">f</text>
  <line x1="204.0" y1="50.0" x2="240.0" y2="50.0" stroke="#1a202c" stroke-width="2" marker-end="url(#f1)"/>
  <text x="310.0" y="55.0" fill="#475569" font-size="14" text-anchor="middle" font-weight="700" font-style="italic">f(x) (output)</text>
</svg>

### 💡 Trực giác: máy bán nước tự động

Hãy hình dung **máy bán nước tự động** ở siêu thị:

<svg viewBox="0 0 520 180" style="max-width:520px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Máy bán nước như một hàm: mỗi số tiền vào cho đúng một loại nước ra">
  <defs><marker id="f2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <text x="90.0" y="45.0" fill="#475569" font-size="13" text-anchor="end" font-weight="700">10.000đ</text>
  <line x1="100.0" y1="40.0" x2="150.0" y2="40.0" stroke="#1a202c" stroke-width="2" marker-end="url(#f2)"/>
  <line x1="300.0" y1="40.0" x2="350.0" y2="40.0" stroke="#1a202c" stroke-width="2" marker-end="url(#f2)"/>
  <text x="360.0" y="45.0" fill="#15803d" font-size="13" text-anchor="start" font-weight="700">1 chai nước suối</text>
  <text x="90.0" y="97.0" fill="#475569" font-size="13" text-anchor="end" font-weight="700">15.000đ</text>
  <line x1="100.0" y1="92.0" x2="150.0" y2="92.0" stroke="#1a202c" stroke-width="2" marker-end="url(#f2)"/>
  <line x1="300.0" y1="92.0" x2="350.0" y2="92.0" stroke="#1a202c" stroke-width="2" marker-end="url(#f2)"/>
  <text x="360.0" y="97.0" fill="#15803d" font-size="13" text-anchor="start" font-weight="700">1 chai trà xanh</text>
  <text x="90.0" y="149.0" fill="#475569" font-size="13" text-anchor="end" font-weight="700">20.000đ</text>
  <line x1="100.0" y1="144.0" x2="150.0" y2="144.0" stroke="#1a202c" stroke-width="2" marker-end="url(#f2)"/>
  <line x1="300.0" y1="144.0" x2="350.0" y2="144.0" stroke="#1a202c" stroke-width="2" marker-end="url(#f2)"/>
  <text x="360.0" y="149.0" fill="#15803d" font-size="13" text-anchor="start" font-weight="700">1 chai sữa</text>
  <rect x="152.0" y="20.0" width="146.0" height="144.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="225.0" y="97.0" fill="#1d4ed8" font-size="13" text-anchor="middle" font-weight="700">Máy bán nước</text>
</svg>

Bạn nhét tờ tiền vào (input), máy trả ra đúng một sản phẩm (output). **Đặc tính quan trọng**: nhét cùng một mệnh giá **hai lần khác nhau**, máy luôn trả ra **cùng một sản phẩm**. Nếu lần này nhét 10.000đ ra chai nước, lần khác nhét 10.000đ ra chai trà — đó là máy **hỏng**, không phải máy hoạt động đúng. Hàm số cũng vậy: cùng input $\to$ cùng output, **luôn luôn**.

Còn chiều ngược lại thì không bắt buộc: hai mệnh giá khác nhau có thể ra cùng một sản phẩm (vd: 10.000đ và 12.000đ đều ra chai nước suối). Cũng giống $f(2) = f(-2) = 4$ ở hàm $x^2$ — nhiều input ra cùng output **vẫn ổn**.

**Mở rộng analogy**: nghĩ về *bảng giá* dán trên máy. Bảng giá đó **chính là hàm số**:

| Input (tiền) | → | Output (nước) | Ghi chú |
|---|:-:|---|---|
| 10.000đ | → | Nước suối | |
| 12.000đ | → | Nước suối | nhiều input, cùng output: OK |
| 15.000đ | → | Trà xanh | |
| 20.000đ | → | Sữa | |

Khi mua, bạn nhìn bảng giá để biết "với mệnh giá này tôi nhận được gì". Bảng giá quyết định một cách dứt khoát — không bao giờ có chuyện "tùy hôm" mà 10.000đ ra nước suối hay sữa. **Quy tắc xác định, ổn định, không phụ thuộc thời điểm**. Đây cũng là tính chất sống còn của hàm số trong toán.

Ngược lại, nếu thay máy bán nước bằng **bốc thăm trúng thưởng** (cùng mệnh giá có thể ra phần thưởng khác nhau theo xác suất) thì đó **không phải hàm số** theo nghĩa toán học — đó là *biến ngẫu nhiên* (sẽ học sau khi tới xác suất).

### 💡 Trực giác: function trong Go cũng là một "máy"

Người học lập trình đã quen với khái niệm "function" trong code. Hãy nhìn:

```go
func f(x float64) float64 {
    return 2*x + 1
}
```

Đây là **chính xác** một hàm toán học $f(x) = 2x + 1$, viết dưới ngôn ngữ Go. Bóc tách từng phần:

- `func f` — đặt tên hàm là `f`, giống bên toán.
- `(x float64)` — khai báo "máy này nhận 1 input, tên `x`, kiểu số thực".
- `float64` (sau dấu `)`) — khai báo "máy này trả ra 1 output, cũng là số thực".
- `return 2*x + 1` — **quy tắc**: lấy `x`, nhân 2, cộng 1, trả ra.

Gọi `f(3)` trong Go cho `7.0`. Gọi $f(3)$ trong toán cho $7$. **Cùng quy tắc, cùng kết quả**.

**Đối chiếu bảng**:

| Yếu tố | Toán | Go |
|--------|------|----|
| Tên hàm | $f$ | `f` |
| Tham số input | $x$ (số thực) | `x float64` |
| Kiểu output | số thực | `float64` (sau `)`) |
| Quy tắc tính | $2x + 1$ | `return 2*x + 1` |
| Gọi hàm | $f(3) = 7$ | `f(3)` = `7.0` |

**Đây không phải là sự trùng hợp** — Go (và mọi ngôn ngữ lập trình hiện đại: Python, Java, JavaScript, ...) **mượn khái niệm "function" trực tiếp từ toán**. Lịch sử: lambda calculus của Church (1930s) → Lisp (1958) → tất cả ngôn ngữ sau này. Khi bạn viết `func` trong Go, bạn đang nối tiếp một dòng tư duy đã có gần 100 năm.

Điểm khác duy nhất: hàm Go có thể có **hiệu ứng phụ** (in màn hình, ghi file, sửa biến toàn cục), còn hàm toán thì **thuần** (cùng input luôn cùng output, không "nhớ" gì giữa các lần gọi). Mục 8 sẽ nói kỹ.

### Bảng so sánh nhanh: Là hàm vs Không phải hàm

| ✅ Là hàm số | ❌ Không phải hàm số |
|---|---|
| $y = 2x + 1$ (mỗi x ra 1 y duy nhất) | $y^2 = x$ (vd $x = 4 \Rightarrow y = 2$ hoặc $-2$) |
| $y = x^2$ (mỗi x ra 1 y) | $x^2 + y^2 = 1$ (đường tròn — $x = 0 \Rightarrow y = \pm 1$) |
| $y = \sqrt{x}$ với $x \geq 0$ (lấy nhánh không âm) | $y = \pm\sqrt{x}$ (kèm dấu $\pm$ → 2 output) |
| $y = \sin(x)$ (lượng giác — 1 output cho mỗi x) | $\sin(y) = x$ (giải y theo x ra vô số y) |
| $y = e^x$ (mũ — luôn 1 output) | Quan hệ "x là bạn của y" (1 người nhiều bạn) |
| Bảng $\{(1,5), (2,7), (3,5), (4,9)\}$ (mỗi x xuất hiện 1 lần) | Bảng $\{(1,5), (2,7), (1,9), (3,5)\}$ (x=1 hai lần với y khác) |
| $y = \lvert x \rvert$ (giá trị tuyệt đối) | "Số điện thoại của người có tuổi x" (1 tuổi nhiều người) |

**Mẹo nhận biết "không phải hàm"** — quan sát một trong các dấu hiệu sau:

1. **Có $\pm$** trong biểu thức của y theo x (vd $y = \pm\sqrt{x-1}$).
2. **Lũy thừa chẵn của y** (vd $y^2 = \ldots$, $y^4 = \ldots$): giải ra y sẽ kèm $\pm$.
3. **Quan hệ "một-nhiều"** trong đời thực: 1 người có nhiều con, 1 sản phẩm có nhiều khách...
4. **Đồ thị không qua vertical line test** (xem mục 3.2).

### Ký hiệu

Ký hiệu phổ biến nhất:

$$y = f(x)$$

Đọc là *"y bằng f của x"*. Tức là: $y$ là output, $x$ là input, $f$ là tên của hàm (quy tắc).

Một ký hiệu khác cũng hay gặp, đặc biệt trong sách toán cao cấp:

$$f : x \mapsto f(x)$$

Đọc là *"f là quy tắc gán x đến f(x)"*. Mũi tên $\mapsto$ (mapsto) khác với $\to$ (đến) — $\mapsto$ nói riêng về việc *gán phần tử*, còn $\to$ thường dùng cho "từ tập này sang tập kia". Vd $f : \mathbb{R} \to \mathbb{R}, x \mapsto x^2$ nghĩa là *"f là hàm từ $\mathbb{R}$ vào $\mathbb{R}$, biến mỗi x thành $x^2$"*.

### 1.1. Ví dụ cụ thể

Cho hàm $f(x) = 2x + 1$. Quy tắc là: *"lấy x, nhân 2, cộng 1"*.

Tính một vài giá trị:

| x | Tính | f(x) |
|---|------|------|
| 0 | $2 \cdot 0 + 1$ | 1 |
| 1 | $2 \cdot 1 + 1$ | 3 |
| 3 | $2 \cdot 3 + 1$ | **7** |
| −1 | $2 \cdot (-1) + 1$ | −1 |
| 0.5 | $2 \cdot 0.5 + 1$ | 2 |

Ta nói: *"f gửi 3 đến 7"*, viết $f(3) = 7$.

### 1.2. Định nghĩa quan trọng nhất: mỗi input có **đúng một** output

Đây là **điểm cốt lõi** của hàm số. Nếu bỏ qua điểm này, bạn sẽ nhầm rất nhiều thứ sau này.

> **Một quan hệ giữa x và y được gọi là HÀM SỐ nếu mỗi giá trị x cho ra ĐÚNG MỘT giá trị y.**

Nói cách khác: không có chuyện *"đưa cùng một x vào máy, lần này nó nhả ra 5, lần khác nó nhả ra 7"*. Nếu vậy đó **không** phải hàm số.

#### Ví dụ KHÔNG phải hàm số

Xét quan hệ $y^2 = x$. Với $x = 4$:

$$y^2 = 4 \quad \Rightarrow \quad y = 2 \ \text{hoặc} \ y = -2$$

→ Cùng một $x = 4$ cho ra **hai giá trị y**. Đây **không** phải hàm số (theo y).

Nhưng nếu ta đảo lại: $x = y^2$, coi $y$ là input, $x$ là output, thì đó **lại là** hàm số (mỗi $y$ cho đúng một $x$). Cùng một quan hệ, đổi vai trò input/output có thể đổi bản chất "có là hàm hay không".

#### Ví dụ là hàm số nhưng nhiều x cho cùng một y

$f(x) = x^2$:

- $f(2) = 4$, $f(-2) = 4$. Hai $x$ khác nhau cho cùng output → **vẫn là hàm số**, vì điều kiện chỉ yêu cầu *"mỗi x cho duy nhất một y"*, không yêu cầu chiều ngược lại.
- Loại hàm "nhiều input → cùng output" gọi là **không đơn ánh** (not one-to-one). Sẽ quay lại ở mục 7 (hàm ngược).

### 1.3. ❓ Câu hỏi tự nhiên người đọc sẽ hỏi

> *"Khác nhau giữa $f$ và $f(x)$?"*

Đây là câu hỏi gây nhầm số một cho người mới. Hai cách viết **không** đồng nghĩa:

- **$f$** là **bản thân hàm** — quy tắc, "chiếc máy". Đây là một **đối tượng** (object) đại diện cho toàn bộ ánh xạ. Khi viết $f$ không kèm gì, ta đang nói tới *toàn bộ quy tắc, không gắn với một input cụ thể nào*.
- **$f(x)$** là **giá trị output** của hàm khi input là $x$. Đây là một **số** (hoặc biểu thức theo x). Nó là *kết quả của việc gọi hàm $f$ với input $x$*.

Ví dụ với $f(x) = x^2 + 1$:

| Viết | Ý nghĩa | Loại |
|------|---------|------|
| $f$ | "Quy tắc: bình phương rồi cộng 1" | Hàm (đối tượng) |
| $f(3)$ | $3^2 + 1 = 10$ | Số (kết quả tính ra) |
| $f(x)$ | $x^2 + 1$ | Biểu thức theo x |
| $f(a + 1)$ | $(a+1)^2 + 1 = a^2 + 2a + 2$ | Biểu thức theo a |
| $f \circ g$ | "Quy tắc: chạy g xong chạy f" | Hàm (đối tượng) |

Trong văn nói toán học, hai cách viết $f$ và $f(x)$ thường bị dùng lẫn lộn ("đồ thị của $f(x)$" thực ra là "đồ thị của $f$"). Không sao — miễn là **bạn biết** chúng khác nhau ở mức khái niệm.

So với Go thì tách bạch hơn:
```go
f := func(x float64) float64 { return x*x + 1 }  // f là biến chứa hàm
y := f(3)   // f(3) là lời gọi hàm, y = 10 (số)
g := f      // gán hàm cho biến khác — chuyển "f", không phải "f(3)"
```

Khi viết `f` (không có dấu `()`), bạn đang chỉ vào *cái máy*. Khi viết `f(3)`, bạn đang *bấm nút và nhận kết quả*.

> *"Hàm số có nhất thiết phải viết ra công thức không?"*

**Không.** Một hàm chỉ cần có quy tắc rõ ràng "input → output duy nhất", không bắt buộc phải viết được công thức đại số. Bốn cách mô tả phổ biến:

- **Công thức**: $f(x) = x^2 + 1$. Gọn, tính được với mọi x.
- **Bảng giá trị**: vd $\{(0, 1), (1, 2), (2, 5), (3, 10)\}$. Dùng khi dữ liệu thực nghiệm, hoặc khi không có công thức.
- **Đồ thị**: vẽ đường cong trên mặt phẳng.
- **Mô tả bằng lời / thuật toán**: "lấy x, bình phương, cộng 1" — hoặc thậm chí một thuật toán dài (vd hàm tính số nguyên tố thứ n).

**Ví dụ thực tế không có công thức đại số**:
- Hàm "dân số Việt Nam vào năm $x$" — chỉ có bảng số liệu thống kê, không công thức.
- Hàm $\pi(x)$ đếm số nguyên tố $\leq x$ — có định nghĩa, nhưng không có công thức đóng đơn giản.
- Hàm "kết quả mạng neural đã train" — biểu diễn được bằng triệu tham số, không gọn lại thành công thức.

Cả 4 cách đều mô tả "cùng một quy tắc". Sẽ nói kỹ ở mục 4.

> *"Hai hàm khác công thức nhưng cùng giá trị tại mọi x — có là 1 hàm không?"*

**Có**. Hàm được định nghĩa bởi *quan hệ input → output*, không phải bởi *cách viết công thức*. Vd:

- $f(x) = (x + 1)^2$ và $g(x) = x^2 + 2x + 1$. Hai công thức nhìn khác, nhưng tính $f(x)$ và $g(x)$ tại **mọi** $x \in \mathbb{R}$ đều ra cùng số. $\Rightarrow$ **$f$ và $g$ là cùng một hàm.**
- $f(x) = \sin^2(x) + \cos^2(x)$ và $g(x) = 1$. Theo công thức lượng giác $\sin^2 + \cos^2 = 1$, hai hàm này bằng nhau tại mọi x $\Rightarrow$ là cùng một hàm.

Tiêu chí kiểm tra: nếu $f$ và $g$ có **cùng domain** và $f(x) = g(x)$ với **mọi** x trong domain đó $\Rightarrow$ chúng là cùng một hàm. Lưu ý điều kiện "cùng domain" — $f(x) = x$ (domain $\mathbb{R}$) và $g(x) = x^2/x$ (domain $\mathbb{R} \setminus \{0\}$) **không** phải cùng một hàm dù bằng nhau tại $x \neq 0$, vì domain khác.

> *"f(x) là số, hay là hàm?"*

$f$ là hàm (quy tắc). $f(x)$ là **số** (output đã tính ra cho một x cụ thể, hoặc biểu thức theo x). Khi nói "đồ thị của f(x)" thực ra là nói "đồ thị của f".

### 💡 Trực giác: composition = "xếp 2 máy nối tiếp"

Khi đi sâu hơn, bạn sẽ gặp các phép toán **trên hàm** chứ không chỉ trên số. Phép quan trọng nhất:

**Composition** ($g \circ f$) = xếp hai máy nối tiếp nhau:

<svg viewBox="0 0 520 100" style="max-width:520px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Hợp hàm: x qua máy f ra f(x), rồi qua máy g ra g(f(x))">
  <defs><marker id="f3" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <text x="40.0" y="55.0" fill="#475569" font-size="14" text-anchor="middle" font-weight="700" font-style="italic">x</text>
  <line x1="64.0" y1="50.0" x2="100.0" y2="50.0" stroke="#1a202c" stroke-width="2" marker-end="url(#f3)"/>
  <rect x="108.0" y="30.0" width="60.0" height="40.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="138.0" y="55.0" fill="#1d4ed8" font-size="13" text-anchor="middle" font-weight="700">Máy f</text>
  <line x1="172.0" y1="50.0" x2="208.0" y2="50.0" stroke="#1a202c" stroke-width="2" marker-end="url(#f3)"/>
  <text x="242.0" y="55.0" fill="#475569" font-size="14" text-anchor="middle" font-weight="700" font-style="italic">f(x)</text>
  <line x1="272.0" y1="50.0" x2="308.0" y2="50.0" stroke="#1a202c" stroke-width="2" marker-end="url(#f3)"/>
  <rect x="316.0" y="30.0" width="60.0" height="40.0" rx="8" fill="#dcfce7" fill-opacity="1" stroke="#15803d" stroke-width="2"/>
  <text x="346.0" y="55.0" fill="#15803d" font-size="13" text-anchor="middle" font-weight="700">Máy g</text>
  <line x1="380.0" y1="50.0" x2="416.0" y2="50.0" stroke="#1a202c" stroke-width="2" marker-end="url(#f3)"/>
  <text x="462.0" y="55.0" fill="#475569" font-size="14" text-anchor="middle" font-weight="700" font-style="italic">g(f(x))</text>
</svg>

Output của máy $f$ đi thẳng vào input của máy $g$. Hàm "tổng hợp" này — đặt tên $g \circ f$ — tự nó cũng là một hàm. Lưu ý: **thứ tự đọc ngược chiều viết** — $g \circ f$ đọc *"g sau khi f"*, tức là $f$ chạy **trước**. Sẽ làm chi tiết ở mục 6.

### 💡 Trực giác: inverse = "máy chạy ngược chiều"

**Hàm ngược** ($f^{-1}$) = bóp một nút "rewind" trên máy:

<svg viewBox="0 0 460 145" style="max-width:460px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Hàm ngược: f đưa x sang y theo chiều thuận, f⁻¹ đưa y về x theo chiều ngược">
  <defs><marker id="f4" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <text x="40.0" y="45.0" fill="#475569" font-size="14" text-anchor="middle" font-weight="700" font-style="italic">x</text>
  <line x1="56.0" y1="40.0" x2="100.0" y2="40.0" stroke="#1a202c" stroke-width="2" marker-end="url(#f4)"/>
  <rect x="104.0" y="20.0" width="110.0" height="40.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="159.0" y="45.0" fill="#1d4ed8" font-size="13" text-anchor="middle" font-weight="700">Máy f</text>
  <line x1="218.0" y1="40.0" x2="262.0" y2="40.0" stroke="#1a202c" stroke-width="2" marker-end="url(#f4)"/>
  <text x="280.0" y="45.0" fill="#475569" font-size="14" text-anchor="middle" font-weight="700" font-style="italic">y</text>
  <text x="330.0" y="45.0" fill="#475569" font-size="12" text-anchor="start">(chiều thuận)</text>
  <text x="40.0" y="115.0" fill="#475569" font-size="14" text-anchor="middle" font-weight="700" font-style="italic">y</text>
  <line x1="56.0" y1="110.0" x2="100.0" y2="110.0" stroke="#1a202c" stroke-width="2" marker-end="url(#f4)"/>
  <rect x="104.0" y="90.0" width="110.0" height="40.0" rx="8" fill="#dcfce7" fill-opacity="1" stroke="#15803d" stroke-width="2"/>
  <text x="159.0" y="115.0" fill="#15803d" font-size="13" text-anchor="middle" font-weight="700">Máy f⁻¹</text>
  <line x1="218.0" y1="110.0" x2="262.0" y2="110.0" stroke="#1a202c" stroke-width="2" marker-end="url(#f4)"/>
  <text x="280.0" y="115.0" fill="#475569" font-size="14" text-anchor="middle" font-weight="700" font-style="italic">x</text>
  <text x="330.0" y="115.0" fill="#475569" font-size="12" text-anchor="start">(chiều ngược)</text>
</svg>

Nếu $f$ "đưa 3 thành 7" thì $f^{-1}$ "đưa 7 trở lại thành 3". Tức là **đảo input và output**. Sẽ làm chi tiết ở mục 7.

Tóm tắt nhanh trước khi đi tiếp: **composition** nối hàm theo *chuỗi*; **inverse** *đảo* hướng của một hàm. Hai phép này là xương sống của mọi thứ sau này (đạo hàm hàm hợp, hàm log = ngược của hàm mũ, mạng neural = chuỗi composition, ...).

### 1.4. ⚠ Lỗi thường gặp

#### Lỗi 1: Nhầm `f⁻¹` với `1/f`

$f^{-1}(x)$ là **hàm ngược** (xem mục 7), **không phải** $1 / f(x)$.

Ví dụ với $f(x) = 2x$:
- $f^{-1}(x) = x/2$ (vì nếu $y = 2x$ thì $x = y/2$).
- $1/f(x) = 1/(2x)$ (chỉ là nghịch đảo số học).
- Tại $x = 4$: $f^{-1}(4) = 2$, còn $1/f(4) = 1/8$. **Hoàn toàn khác**.

Vì sao ký hiệu trùng? Vì ký hiệu $^{-1}$ mượn từ "phần tử nghịch đảo trong nhóm" — ở nhóm hàm với phép $\circ$, "nghịch đảo" có nghĩa là hàm ngược. Trùng ký hiệu với nghịch đảo số, gây nhầm.

#### Lỗi 2: Nhầm `f(x+h)` thành `f(x) + h`

$f(x+h)$ nghĩa là *gọi hàm với input mới $x+h$*, phải thay **toàn bộ** $x$ trong công thức bằng $x+h$.

Ví dụ với $f(x) = x^2$:
- **Đúng**: $f(x+h) = (x+h)^2 = x^2 + 2xh + h^2$.
- **Sai**: $f(x+h) = x^2 + h$ — đây không phải là phép gọi hàm; đây là cộng $h$ vào kết quả $f(x)$.

Verify với số cụ thể $x = 3, h = 1$:
- Cách đúng: $f(4) = 16$. Công thức $(3+1)^2 = 16$ ✓.
- Cách sai: $f(3) + 1 = 9 + 1 = 10$. Khác $16$ rất nhiều.

Đây là lỗi xuất hiện liên tục khi học **đạo hàm** (sẽ dùng $\frac{f(x+h) - f(x)}{h}$). Nhớ kỹ.

#### Lỗi 3: Nhầm `(f∘g)(x)` với `f(x)·g(x)`

Hai phép toán hoàn toàn khác nhau:
- $f(x) \cdot g(x)$ = *nhân hai output đã tính ra*.
- $(f \circ g)(x) = f(g(x))$ = *đưa output của g làm input của f*.

Ví dụ với $f(x) = x + 1$, $g(x) = x^2$:
- $f(x) \cdot g(x) = (x+1) \cdot x^2 = x^3 + x^2$ — bậc 3.
- $(f \circ g)(x) = f(g(x)) = f(x^2) = x^2 + 1$ — bậc 2.

Verify với $x = 2$:
- Nhân: $(2+1) \cdot (2^2) = 3 \cdot 4 = 12$.
- Composition: $f(g(2)) = f(4) = 5$.
- Khác hoàn toàn.

#### Lỗi 4: Tìm hàm ngược bằng cách "đảo dấu" thay vì hoán đổi biến

Lỗi rất phổ biến: thấy $f(x) = 2x + 3$ rồi viết "ngược là $f^{-1}(x) = -2x - 3$" — **sai**.

Hàm ngược không phải là "đổi dấu" hay "đảo phép toán nhìn lướt qua". Phải làm đúng 3 bước:
1. Đặt $y = f(x)$.
2. **Giải $x$ theo $y$** (đảo các phép toán).
3. Hoán đổi tên biến $x \leftrightarrow y$ để viết $f^{-1}(x)$.

Với $f(x) = 2x + 3$:
- Đặt $y = 2x + 3$. Giải x: $x = (y - 3)/2$. Đổi tên: $f^{-1}(x) = (x - 3)/2$.
- Verify: $f(5) = 13$, $f^{-1}(13) = (13-3)/2 = 5$ ✓.

Nếu làm sai bằng "đổi dấu": $f^{-1}(13) = -26 - 3 = -29$. Không trả về $5$.

Chi tiết ở mục 7.

#### Lỗi 5: Quên domain khi nói "hai hàm bằng nhau"

$f(x) = x$ (domain $\mathbb{R}$) và $g(x) = x^2/x$ (domain $\mathbb{R} \setminus \{0\}$) **không** phải cùng một hàm, dù $f(x) = g(x)$ tại mọi $x \neq 0$. Lý do: tại $x = 0$, $f(0) = 0$ tính được, còn $g(0)$ không xác định. **Domain khác → hàm khác**.

### 🔁 Dừng lại tự kiểm tra (mục 1)

Trước khi đi tiếp, hãy tự trả lời:

1. Quan hệ $y = \pm\sqrt{x}$ có phải hàm số không? Vì sao?
2. Cho $f(x) = 3x - 2$, tính $f(x + 2)$ (đừng nhầm thành $f(x) + 2$).
3. Hai hàm $f(x) = x$ và $g(x) = (x^2)/x$ có phải là cùng một hàm? (Gợi ý: nghĩ về domain).
4. Cho $f(x) = x^2 + 1$. Phân biệt $f$, $f(2)$, $f(x)$, $f(x+1)$ — cái nào là số, cái nào là biểu thức/hàm?
5. Với $f(x) = 3x$ và $g(x) = x + 5$, tính $(g \circ f)(2)$ và $f(2) \cdot g(2)$. So sánh.

*Đáp án nhanh*:
1. Không — $x = 1$ ra $y = \pm 1$, hai output.
2. $f(x+2) = 3(x+2) - 2 = 3x + 4$ (KHÔNG phải $3x - 2 + 2 = 3x$).
3. Không — $f$ có domain $\mathbb{R}$, $g$ có domain $\mathbb{R} \setminus \{0\}$, dù bằng nhau tại các $x \neq 0$.
4. $f$ = hàm (quy tắc). $f(2) = 5$ (số). $f(x) = x^2 + 1$ (biểu thức theo x). $f(x+1) = (x+1)^2 + 1 = x^2 + 2x + 2$ (biểu thức theo x).
5. $(g \circ f)(2) = g(f(2)) = g(6) = 11$. $f(2) \cdot g(2) = 6 \cdot 7 = 42$. Khác hẳn nhau.

### 📌 Tóm tắt mục 1

- **Hàm số** = quy tắc gán mỗi input $x$ cho **đúng một** output $f(x)$.
- Analogy chuẩn: **máy bán nước** (cùng tiền → cùng sản phẩm) hoặc **function trong Go** (`func f(x float64) float64`).
- Dấu hiệu **không phải hàm**: có $\pm$, lũy thừa chẵn của y, quan hệ "một-nhiều".
- $f \neq f(x)$: $f$ là hàm (đối tượng), $f(x)$ là số/biểu thức.
- Hàm có thể mô tả 4 cách: công thức, bảng, đồ thị, lời.
- Hai phép quan trọng: **composition** (nối tiếp 2 hàm) và **inverse** (chạy ngược).
- Lỗi phổ biến: $f^{-1} \neq 1/f$, $f(x+h) \neq f(x) + h$, $f \circ g \neq f \cdot g$, hàm ngược không phải "đổi dấu".

## 2. Domain và Range

Khi một máy chạy, không phải input nào nó cũng nuốt được. Hàm số cũng vậy.

### 2.1. Domain (tập xác định)

**Domain** của hàm $f$, ký hiệu $D(f)$ hoặc $\text{dom}(f)$, là **tập tất cả các x mà f(x) có nghĩa** (tính được, ra một số thực).

Ví dụ:

| Hàm | Vì sao bị hạn chế | Domain |
|-----|-------------------|--------|
| $f(x) = 2x + 1$ | Không hạn chế | $\mathbb{R}$ |
| $f(x) = 1/x$ | $x = 0 \Rightarrow$ chia cho 0 | $\mathbb{R} \setminus \{0\}$ |
| $f(x) = \sqrt{x}$ | $x < 0 \Rightarrow$ căn của số âm không phải số thực | $[0, +\infty)$ |
| $f(x) = \ln(x)$ | $x \leq 0 \Rightarrow$ log không xác định | $(0, +\infty)$ |
| $f(x) = 1/(x^2-4)$ | $x^2-4 = 0 \Rightarrow x = \pm 2$ | $\mathbb{R} \setminus \{-2, 2\}$ |

### 2.1.1. Quy trình tìm domain — 3 bước

Mỗi khi gặp một hàm, chạy quy trình 3 bước sau:

> **Bước 1**: Tìm mọi **mẫu số** trong công thức, ép $\text{mẫu} \neq 0 \Rightarrow$ giải, loại các x làm mẫu bằng 0.
>
> **Bước 2**: Tìm mọi **căn bậc chẵn** ($\sqrt{\phantom{x}}$, $\sqrt[4]{\phantom{x}}$, ...), ép $\text{biểu thức trong căn} \geq 0 \Rightarrow$ giải.
>
> **Bước 3**: Tìm mọi **log** ($\ln$, $\log_b$), ép $\text{biểu thức trong log} > 0 \Rightarrow$ giải.
>
> Lấy **giao** của tất cả các điều kiện trên = Domain.

Nếu công thức không có mẫu / căn chẵn / log → Domain = $\mathbb{R}$.

### 2.1.2. Walk-through 5 ví dụ chi tiết

**Ví dụ 1**: $f(x) = 1/(x - 3)$.

- Bước 1: mẫu $x - 3 \neq 0 \Rightarrow x \neq 3$.
- Bước 2, 3: không có căn / log.

→ **Domain $= \mathbb{R} \setminus \{3\}$** $= (-\infty, 3) \cup (3, +\infty)$.

**Ví dụ 2**: $f(x) = \sqrt{2x - 6}$.

- Bước 1: không có mẫu.
- Bước 2: căn bậc 2, ép $2x - 6 \geq 0 \Rightarrow x \geq 3$.
- Bước 3: không có log.

→ **Domain $= [3, +\infty)$**.

**Ví dụ 3**: $f(x) = \ln(x^2 - 4)$.

- Bước 1: không có mẫu.
- Bước 2: không có căn.
- Bước 3: log, ép $x^2 - 4 > 0 \Rightarrow x^2 > 4 \Rightarrow x < -2$ hoặc $x > 2$.

→ **Domain $= (-\infty, -2) \cup (2, +\infty)$**.

**Ví dụ 4**: $f(x) = \sqrt{x + 1} / (x - 2)$ — kết hợp nhiều ràng buộc.

- Bước 1: mẫu $x - 2 \neq 0 \Rightarrow x \neq 2$.
- Bước 2: căn, ép $x + 1 \geq 0 \Rightarrow x \geq -1$.
- Bước 3: không có log.
- Giao: $x \geq -1$ AND $x \neq 2$.

→ **Domain $= [-1, 2) \cup (2, +\infty)$**.

**Ví dụ 5**: $f(x) = \ln(x - 1) / \sqrt{5 - x}$ — 3 ràng buộc cùng lúc.

- Bước 1: mẫu $\sqrt{5 - x} \neq 0 \Rightarrow 5 - x \neq 0 \Rightarrow x \neq 5$.
- Bước 2: căn, ép $5 - x \geq 0 \Rightarrow x \leq 5$. Kết hợp với bước 1: $x < 5$.
- Bước 3: log, ép $x - 1 > 0 \Rightarrow x > 1$.
- Giao: $1 < x < 5$.

→ **Domain $= (1, 5)$**.

**Tip**: viết các điều kiện ra giấy thành các dòng riêng, rồi vẽ lên trục số để tìm giao. Khi có ≥ 2 ràng buộc, đừng cố làm trong đầu.

### 2.2. Range (tập giá trị)

**Range** của $f$, ký hiệu $R(f)$ hoặc $f(D)$, là **tập tất cả các giá trị f(x) thực sự đạt được** khi $x$ chạy khắp domain.

Ví dụ:

| Hàm | Domain | Range | Giải thích |
|-----|--------|-------|------------|
| $f(x) = 2x + 1$ | $\mathbb{R}$ | $\mathbb{R}$ | x kéo đi khắp $\mathbb{R}$ thì $2x+1$ cũng kéo khắp $\mathbb{R}$ |
| $f(x) = x^2$ | $\mathbb{R}$ | $[0, +\infty)$ | Bình phương không bao giờ âm |
| $f(x) = 1/x$ | $\mathbb{R} \setminus \{0\}$ | $\mathbb{R} \setminus \{0\}$ | Không bao giờ ra 0 |
| $f(x) = e^x$ | $\mathbb{R}$ | $(0, +\infty)$ | $e^x > 0$ với mọi x |
| $f(x) = \sin(x)$ | $\mathbb{R}$ | $[-1, 1]$ | sin bị chặn |

**Lưu ý**: tìm range thường khó hơn tìm domain. Cần phân tích biến thiên hoặc hình dung đồ thị.

### 2.2.1. Cách tiếp cận khi tìm range

Không có "quy trình 3 bước" cho range — phải kết hợp **một trong ba** chiến lược:

1. **Hình dung đồ thị**: vẽ thô, nhìn xem y "với tới" những giá trị nào.
2. **Giải y theo x**, hỏi *"y nào thì có x trả lại?"*. Nếu giải được $x = h(y)$ với mọi $y$ trong tập T, thì T = range.
3. **Phân tích biểu thức**: dùng tính chất "bình phương $\geq 0$", "$\exp > 0$", "$\sin/\cos \in [-1, 1]$", ...

### 2.2.2. Walk-through 5 ví dụ tìm range

**Ví dụ 1**: $f(x) = x^2 + 3$.

Cách: $x^2 \geq 0$ với mọi x (bình phương không âm) $\Rightarrow x^2 + 3 \geq 3$. Đạt được mọi giá trị $y \geq 3$ (vd $y = 3$ khi $x = 0$, $y = 7$ khi $x = 2$, ...).

→ **Range $= [3, +\infty)$**.

**Ví dụ 2**: $f(x) = 1/(x - 1)$.

Cách: giải y theo x. $y = 1/(x-1) \Rightarrow x - 1 = 1/y$ (yêu cầu $y \neq 0$) $\Rightarrow x = 1 + 1/y$. Với mọi $y \neq 0$, công thức cho ra một x hợp lệ.

→ **Range $= \mathbb{R} \setminus \{0\}$**. Trực giác: $1/(x-1)$ không bao giờ chạm 0 vì $1/A = 0$ không có nghiệm.

**Ví dụ 3**: $f(x) = e^x - 2$.

Cách: $e^x > 0$ với mọi x (hàm mũ luôn dương) $\Rightarrow e^x - 2 > -2$. Khi $x \to -\infty$, $e^x \to 0^+$, nên $f(x) \to -2^+$ (tiệm cận, không chạm). Khi $x \to +\infty$, $f(x) \to +\infty$.

→ **Range $= (-2, +\infty)$** (mở tại −2 vì không bao giờ đạt).

**Ví dụ 4**: $f(x) = 2\sin(x) + 1$.

Cách: $\sin(x) \in [-1, 1] \Rightarrow 2\sin(x) \in [-2, 2] \Rightarrow 2\sin(x) + 1 \in [-1, 3]$. Đạt được biên: tại $x = \pi/2$, $\sin = 1$, $f = 3$. Tại $x = -\pi/2$, $\sin = -1$, $f = -1$.

→ **Range $= [-1, 3]$**.

**Ví dụ 5**: $f(x) = \sqrt{x}$, domain $= [0, +\infty)$.

Cách: căn bậc 2 lấy nhánh không âm. $\sqrt{0} = 0$, $\sqrt{4} = 2$, $\sqrt{x} \to +\infty$ khi $x \to +\infty$. Mọi giá trị $y \geq 0$ đều đạt được (giải $x = y^2$).

→ **Range $= [0, +\infty)$**.

**Lưu ý điểm khó**: range phụ thuộc vào **domain**. Cùng công thức $f(x) = x^2$, nhưng:
- Domain $= \mathbb{R}$ → Range $= [0, +\infty)$.
- Domain $= [1, 3]$ → Range $= [1, 9]$ (chỉ những giá trị $x^2$ với $1 \leq x \leq 3$).
- Domain $= [-2, 1]$ → Range $= [0, 4]$ (chú ý: y nhỏ nhất tại $x = 0$, không phải biên).

Vì vậy, mỗi khi tìm range, **luôn nhớ domain đang là gì**.

### 🔁 Dừng lại tự kiểm tra (mục 2)

1. Tìm domain của $f(x) = \sqrt{x^2 - 9}$.
2. Tìm domain của $g(x) = \ln(4 - x) / \sqrt{x + 2}$.
3. Tìm range của $h(x) = 3 - x^2$.
4. Tìm range của $k(x) = 1/(x^2 + 1)$.

*Đáp án nhanh*:
1. $x^2 - 9 \geq 0 \Rightarrow x \leq -3$ hoặc $x \geq 3 \Rightarrow$ **Domain $= (-\infty, -3] \cup [3, +\infty)$**.
2. log: $4 - x > 0 \Rightarrow x < 4$. Căn ở mẫu: $x + 2 > 0$ (strict, vì ở mẫu) $\Rightarrow x > -2$. Giao: **Domain $= (-2, 4)$**.
3. $x^2 \geq 0 \Rightarrow 3 - x^2 \leq 3$. Khi $x \to \pm\infty$, $3 - x^2 \to -\infty$. **Range $= (-\infty, 3]$**.
4. $x^2 + 1 \geq 1 \Rightarrow 1/(x^2+1) \in (0, 1]$. Đạt $1$ tại $x = 0$; tiệm cận $0$ khi $x \to \pm\infty$. **Range $= (0, 1]$**.

### 📌 Tóm tắt mục 2

- **Domain** = "đầu vào hợp lệ"; tìm bằng quy trình 3 bước (mẫu $\neq 0$, căn chẵn $\geq 0$, log $> 0$).
- **Range** = "đầu ra thực tế"; tìm bằng đồ thị / giải y theo x / phân tích biểu thức.
- Range phụ thuộc vào domain — đổi domain có thể đổi range.
- Codomain $\neq$ range: codomain là "danh nghĩa", range là "thực tế".

### 2.3. Trực giác: domain = "đầu vào hợp lệ", range = "đầu ra thực tế"

Domain là **những x bạn được phép đưa vào**. Range là **những y bạn thực sự sẽ thấy đi ra**.

Đừng nhầm range với "codomain" — codomain là tập đích "danh nghĩa" (vd $\mathbb{R}$), còn range là **phần đích thực sự được dùng đến**. Trong các sách phổ thông tiếng Việt, "range" và "tập giá trị" được dùng đồng nghĩa.

## 3. Đồ thị (graph) của hàm số

**Đồ thị** của $f$ là tập hợp các điểm $(x, f(x))$ trên mặt phẳng tọa độ Oxy.

- **Trục Ox** (nằm ngang): biểu diễn input $x$.
- **Trục Oy** (thẳng đứng): biểu diễn output $y = f(x)$.

Một điểm $(a, b)$ thuộc đồ thị **khi và chỉ khi** $b = f(a)$.

### 3.1. Vẽ đồ thị bằng tay (ví dụ: f(x) = x²)

Tính một bảng giá trị:

| x | −2 | −1 | 0 | 1 | 2 |
|---|----|----|---|---|---|
| f(x) | 4 | 1 | 0 | 1 | 4 |

Chấm 5 điểm $(-2, 4)$, $(-1, 1)$, $(0, 0)$, $(1, 1)$, $(2, 4)$ lên mặt phẳng, rồi nối lại bằng đường cong mượt → ra **parabol** mở lên trên.

<svg viewBox="0 0 400 260" style="max-width:400px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Năm điểm của y = x² tại x = −2, −1, 0, 1, 2: (−2,4), (−1,1), (0,0), (1,1), (2,4)">
  <defs><marker id="q1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="q1r" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#dc2626"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="80.0" y1="224.0" x2="80.0" y2="75.6"/>
<line x1="140.0" y1="224.0" x2="140.0" y2="75.6"/>
<line x1="260.0" y1="224.0" x2="260.0" y2="75.6"/>
<line x1="320.0" y1="224.0" x2="320.0" y2="75.6"/>
<line x1="32.0" y1="182.0" x2="368.0" y2="182.0"/>
<line x1="32.0" y1="98.0" x2="368.0" y2="98.0"/>
</g>
  <line x1="26.0" y1="210.0" x2="390.0" y2="210.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#q1)"/>
  <line x1="200.0" y1="230.0" x2="200.0" y2="53.6" stroke="#1a202c" stroke-width="1.5" marker-end="url(#q1)"/>
  <text x="382.0" y="226.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="208.0" y="63.6" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <line x1="80.0" y1="206.0" x2="80.0" y2="214.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="80.0" y="226.0" fill="#475569" font-size="11" text-anchor="middle">−2</text>
  <line x1="140.0" y1="206.0" x2="140.0" y2="214.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="140.0" y="226.0" fill="#475569" font-size="11" text-anchor="middle">−1</text>
  <line x1="260.0" y1="206.0" x2="260.0" y2="214.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="260.0" y="226.0" fill="#475569" font-size="11" text-anchor="middle">1</text>
  <line x1="320.0" y1="206.0" x2="320.0" y2="214.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="320.0" y="226.0" fill="#475569" font-size="11" text-anchor="middle">2</text>
  <line x1="196.0" y1="182.0" x2="204.0" y2="182.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="193.0" y="186.0" fill="#475569" font-size="11" text-anchor="end">1</text>
  <line x1="196.0" y1="98.0" x2="204.0" y2="98.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="193.0" y="102.0" fill="#475569" font-size="11" text-anchor="end">4</text>
  <path d="M 38.0,5.9 L 42.1,16.0 L 46.1,25.8 L 50.2,35.3 L 54.2,44.7 L 58.2,53.7 L 62.3,62.5 L 66.4,71.1 L 70.4,79.4 L 74.5,87.4 L 78.5,95.2 L 82.6,102.7 L 86.6,110.0 L 90.7,117.0 L 94.7,123.8 L 98.8,130.3 L 102.8,136.5 L 106.9,142.5 L 110.9,148.3 L 115.0,153.7 L 119.0,159.0 L 123.1,163.9 L 127.1,168.7 L 131.2,173.1 L 135.2,177.3 L 139.2,181.3 L 143.3,185.0 L 147.3,188.4 L 151.4,191.6 L 155.5,194.6 L 159.5,197.2 L 163.6,199.7 L 167.6,201.8 L 171.7,203.7 L 175.7,205.4 L 179.8,206.8 L 183.8,208.0 L 187.8,208.9 L 191.9,209.5 L 195.9,209.9 L 200.0,210.0 L 204.0,209.9 L 208.1,209.5 L 212.2,208.9 L 216.2,208.0 L 220.2,206.8 L 224.3,205.4 L 228.4,203.7 L 232.4,201.8 L 236.4,199.7 L 240.5,197.2 L 244.6,194.6 L 248.6,191.6 L 252.7,188.4 L 256.7,185.0 L 260.8,181.3 L 264.8,177.3 L 268.8,173.1 L 272.9,168.7 L 276.9,163.9 L 281.0,159.0 L 285.1,153.7 L 289.1,148.3 L 293.1,142.5 L 297.2,136.5 L 301.2,130.3 L 305.3,123.8 L 309.3,117.0 L 313.4,110.0 L 317.4,102.7 L 321.5,95.2 L 325.5,87.4 L 329.6,79.4 L 333.7,71.1 L 337.7,62.5 L 341.8,53.7 L 345.8,44.7 L 349.9,35.3 L 353.9,25.8 L 357.9,16.0 L 362.0,5.9" fill="none" stroke="#94a3b8" stroke-width="1.2" stroke-linejoin="round" stroke-dasharray="4 3"/>
  <circle cx="80.0" cy="98.0" r="5" fill="#1d4ed8"/>
  <text x="88.0" y="92.0" fill="#475569" font-size="10" text-anchor="start">(-2, 4)</text>
  <circle cx="140.0" cy="182.0" r="5" fill="#1d4ed8"/>
  <text x="148.0" y="176.0" fill="#475569" font-size="10" text-anchor="start">(-1, 1)</text>
  <circle cx="200.0" cy="210.0" r="5" fill="#1d4ed8"/>
  <text x="208.0" y="204.0" fill="#475569" font-size="10" text-anchor="start">(0, 0)</text>
  <circle cx="260.0" cy="182.0" r="5" fill="#1d4ed8"/>
  <text x="268.0" y="176.0" fill="#475569" font-size="10" text-anchor="start">(1, 1)</text>
  <circle cx="320.0" cy="98.0" r="5" fill="#1d4ed8"/>
  <text x="328.0" y="92.0" fill="#475569" font-size="10" text-anchor="start">(2, 4)</text>
</svg>

### 3.2. Vertical Line Test (phép thử đường thẳng đứng)

> **Một đường cong trên mặt phẳng là đồ thị của một HÀM SỐ khi và chỉ khi mọi đường thẳng đứng cắt nó tại không quá 1 điểm.**

Vì sao? Đường thẳng đứng $x = a$ đi qua tất cả các điểm có hoành độ $a$. Nếu nó cắt đồ thị ở 2 điểm $(a, b_1)$ và $(a, b_2)$, thì cùng input $a$ cho ra 2 output $b_1 \neq b_2$ — vi phạm định nghĩa hàm số.

#### ✅ Trường hợp QUA test: y = x² (parabol)

<svg viewBox="0 0 400 260" style="max-width:400px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Kiểm tra đường thẳng đứng: đường x = 1 cắt đồ thị y = x² tại đúng một điểm (1,1) → là hàm số">
  <defs><marker id="q2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="q2r" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#dc2626"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="80.0" y1="224.0" x2="80.0" y2="75.6"/>
<line x1="140.0" y1="224.0" x2="140.0" y2="75.6"/>
<line x1="260.0" y1="224.0" x2="260.0" y2="75.6"/>
<line x1="320.0" y1="224.0" x2="320.0" y2="75.6"/>
<line x1="32.0" y1="182.0" x2="368.0" y2="182.0"/>
<line x1="32.0" y1="98.0" x2="368.0" y2="98.0"/>
</g>
  <line x1="26.0" y1="210.0" x2="390.0" y2="210.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#q2)"/>
  <line x1="200.0" y1="230.0" x2="200.0" y2="53.6" stroke="#1a202c" stroke-width="1.5" marker-end="url(#q2)"/>
  <text x="382.0" y="226.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="208.0" y="63.6" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <line x1="80.0" y1="206.0" x2="80.0" y2="214.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="80.0" y="226.0" fill="#475569" font-size="11" text-anchor="middle">−2</text>
  <line x1="140.0" y1="206.0" x2="140.0" y2="214.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="140.0" y="226.0" fill="#475569" font-size="11" text-anchor="middle">−1</text>
  <line x1="260.0" y1="206.0" x2="260.0" y2="214.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="260.0" y="226.0" fill="#475569" font-size="11" text-anchor="middle">1</text>
  <line x1="320.0" y1="206.0" x2="320.0" y2="214.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="320.0" y="226.0" fill="#475569" font-size="11" text-anchor="middle">2</text>
  <line x1="196.0" y1="182.0" x2="204.0" y2="182.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="193.0" y="186.0" fill="#475569" font-size="11" text-anchor="end">1</text>
  <line x1="196.0" y1="98.0" x2="204.0" y2="98.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="193.0" y="102.0" fill="#475569" font-size="11" text-anchor="end">4</text>
  <path d="M 38.0,5.9 L 42.1,16.0 L 46.1,25.8 L 50.2,35.3 L 54.2,44.7 L 58.2,53.7 L 62.3,62.5 L 66.4,71.1 L 70.4,79.4 L 74.5,87.4 L 78.5,95.2 L 82.6,102.7 L 86.6,110.0 L 90.7,117.0 L 94.7,123.8 L 98.8,130.3 L 102.8,136.5 L 106.9,142.5 L 110.9,148.3 L 115.0,153.7 L 119.0,159.0 L 123.1,163.9 L 127.1,168.7 L 131.2,173.1 L 135.2,177.3 L 139.2,181.3 L 143.3,185.0 L 147.3,188.4 L 151.4,191.6 L 155.5,194.6 L 159.5,197.2 L 163.6,199.7 L 167.6,201.8 L 171.7,203.7 L 175.7,205.4 L 179.8,206.8 L 183.8,208.0 L 187.8,208.9 L 191.9,209.5 L 195.9,209.9 L 200.0,210.0 L 204.0,209.9 L 208.1,209.5 L 212.2,208.9 L 216.2,208.0 L 220.2,206.8 L 224.3,205.4 L 228.4,203.7 L 232.4,201.8 L 236.4,199.7 L 240.5,197.2 L 244.6,194.6 L 248.6,191.6 L 252.7,188.4 L 256.7,185.0 L 260.8,181.3 L 264.8,177.3 L 268.8,173.1 L 272.9,168.7 L 276.9,163.9 L 281.0,159.0 L 285.1,153.7 L 289.1,148.3 L 293.1,142.5 L 297.2,136.5 L 301.2,130.3 L 305.3,123.8 L 309.3,117.0 L 313.4,110.0 L 317.4,102.7 L 321.5,95.2 L 325.5,87.4 L 329.6,79.4 L 333.7,71.1 L 337.7,62.5 L 341.8,53.7 L 345.8,44.7 L 349.9,35.3 L 353.9,25.8 L 357.9,16.0 L 362.0,5.9" fill="none" stroke="#94a3b8" stroke-width="1.2" stroke-linejoin="round" stroke-dasharray="4 3"/>
  <circle cx="80.0" cy="98.0" r="5" fill="#1d4ed8"/>
  <text x="88.0" y="92.0" fill="#475569" font-size="10" text-anchor="start">(-2, 4)</text>
  <circle cx="140.0" cy="182.0" r="5" fill="#1d4ed8"/>
  <text x="148.0" y="176.0" fill="#475569" font-size="10" text-anchor="start">(-1, 1)</text>
  <circle cx="200.0" cy="210.0" r="5" fill="#1d4ed8"/>
  <text x="208.0" y="204.0" fill="#475569" font-size="10" text-anchor="start">(0, 0)</text>
  <circle cx="260.0" cy="182.0" r="5" fill="#1d4ed8"/>
  <text x="268.0" y="176.0" fill="#475569" font-size="10" text-anchor="start">(1, 1)</text>
  <circle cx="320.0" cy="98.0" r="5" fill="#1d4ed8"/>
  <text x="328.0" y="92.0" fill="#475569" font-size="10" text-anchor="start">(2, 4)</text>
  <line x1="260.0" y1="221.2" x2="260.0" y2="81.2" stroke="#dc2626" stroke-width="2" stroke-dasharray="6 4"/>
  <text x="266.0" y="85.2" fill="#dc2626" font-size="12" text-anchor="start" font-weight="700">x = 1</text>
  <circle cx="260.0" cy="182.0" r="7" fill="#dc2626"/>
  <text x="38.0" y="78.4" fill="#dc2626" font-size="11" text-anchor="start" font-weight="700">cắt ĐÚNG 1 điểm (1, 1) → hàm số ✓</text>
</svg>

Vẽ đường thẳng đứng tại **bất kỳ** x nào (vd $x = 1$): nó cắt parabol tại đúng một điểm $(1, 1)$. Thử ở $x = -2$: cắt tại $(-2, 4)$ — vẫn 1 điểm. **Mọi** đường thẳng đứng đều cắt $\leq 1$ điểm → **là hàm số**.

#### ❌ Trường hợp KHÔNG QUA test: đường tròn x² + y² = 1

<svg viewBox="0 0 400 280" style="max-width:400px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Đường tròn x² + y² = 1 thất bại kiểm tra đường thẳng đứng: đường x = 0 cắt tại hai điểm (0,1) và (0,−1)">
  <defs><marker id="q3" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="110.0" y1="275.0" x2="110.0" y2="5.0"/>
<line x1="290.0" y1="275.0" x2="290.0" y2="5.0"/>
<line x1="65.0" y1="230.0" x2="335.0" y2="230.0"/>
<line x1="65.0" y1="50.0" x2="335.0" y2="50.0"/>
</g>
  <line x1="59.0" y1="140.0" x2="357.0" y2="140.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#q3)"/>
  <line x1="200.0" y1="281.0" x2="200.0" y2="-17.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#q3)"/>
  <text x="349.0" y="156.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="208.0" y="-7.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <line x1="110.0" y1="136.0" x2="110.0" y2="144.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="110.0" y="156.0" fill="#475569" font-size="11" text-anchor="middle">−1</text>
  <line x1="290.0" y1="136.0" x2="290.0" y2="144.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="290.0" y="156.0" fill="#475569" font-size="11" text-anchor="middle">1</text>
  <line x1="196.0" y1="230.0" x2="204.0" y2="230.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="193.0" y="234.0" fill="#475569" font-size="11" text-anchor="end">−1</text>
  <line x1="196.0" y1="50.0" x2="204.0" y2="50.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="193.0" y="54.0" fill="#475569" font-size="11" text-anchor="end">1</text>
  <circle cx="200.0" cy="140.0" r="90" fill="none" stroke="#1d4ed8" stroke-width="2.5"/>
  <line x1="200.0" y1="270.5" x2="200.0" y2="9.5" stroke="#dc2626" stroke-width="2" stroke-dasharray="6 4"/>
  <circle cx="200.0" cy="50.0" r="7" fill="#dc2626"/>
  <circle cx="200.0" cy="230.0" r="7" fill="#dc2626"/>
  <text x="210.0" y="44.0" fill="#dc2626" font-size="12" text-anchor="start" font-weight="700">(0, 1)</text>
  <text x="210.0" y="246.0" fill="#dc2626" font-size="12" text-anchor="start" font-weight="700">(0, −1)</text>
  <text x="294.5" y="72.5" fill="#1d4ed8" font-size="12" text-anchor="start" font-weight="700">x² + y² = 1</text>
  <text x="200.0" y="262.0" fill="#dc2626" font-size="12" text-anchor="middle" font-weight="700">đường x = 0 cắt đường tròn tại HAI điểm → KHÔNG phải hàm số ✗</text>
</svg>

Đường tròn đơn vị: tại $x = 0$, ta thấy cả $y = 1$ (đỉnh trên) và $y = -1$ (đỉnh dưới). Một đường thẳng đứng cắt đồ thị **2 lần** → vi phạm định nghĩa → **không phải hàm số** (theo y).

Thử ở $x = 0.6$: cắt tại $(0.6, 0.8)$ và $(0.6, -0.8)$ — vẫn 2 điểm. **Một** vị trí x cho **hai** y khác nhau — không thể là hàm.

#### Tóm tắt áp dụng vertical line test:

| Đồ thị | Kết quả test | Là hàm? |
|--------|--------------|---------|
| $y = x^2$ (parabol mở lên) | Mọi đường đứng cắt 1 điểm | ✅ |
| $y = x^3$ (cubic) | Mọi đường đứng cắt 1 điểm | ✅ |
| $y = \sin(x)$ (lượn sóng) | Mọi đường đứng cắt 1 điểm | ✅ |
| $x = y^2$ (parabol mở sang phải) | $x = 4$ cắt tại $(4, 2)$ và $(4, -2)$ | ❌ |
| $x^2 + y^2 = 1$ (đường tròn) | $x = 0$ cắt tại $(0, 1)$ và $(0, -1)$ | ❌ |
| $x^2/4 + y^2/9 = 1$ (ellipse) | $x = 0$ cắt tại $(0, 3)$ và $(0, -3)$ | ❌ |
| Đường thẳng đứng $x = 5$ | Cắt nó tại vô số điểm (chính nó) | ❌ |

**Khắc phục**: nếu đồ thị fail test, **chia làm 2 nhánh** sẽ thành 2 hàm. Vd $x^2 + y^2 = 1$ chia thành:
- $y = \sqrt{1 - x^2}$ (nửa trên) — hàm OK.
- $y = -\sqrt{1 - x^2}$ (nửa dưới) — hàm OK.

Hợp lại không là hàm, nhưng tách ra thì mỗi nửa là hàm.

## 4. Bốn cách biểu diễn cùng một hàm

Cùng một hàm số có thể được "viết ra" theo 4 cách. Lấy ví dụ hàm "lấy x, bình phương, cộng 1":

### 4.1. Công thức

$$f(x) = x^2 + 1$$

### 4.2. Bảng giá trị

| x | −2 | −1 | 0 | 1 | 2 |
|---|----|----|---|---|---|
| f(x) | 5 | 2 | 1 | 2 | 5 |

### 4.3. Đồ thị

Parabol đỉnh $(0, 1)$, mở lên trên:

<svg viewBox="0 0 400 260" style="max-width:400px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Năm điểm của y = x² + 1 tại x = −2..2: (−2,5), (−1,2), (0,1), (1,2), (2,5)">
  <defs><marker id="q4" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="q4r" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#dc2626"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="80.0" y1="221.5" x2="80.0" y2="76.6"/>
<line x1="140.0" y1="221.5" x2="140.0" y2="76.6"/>
<line x1="260.0" y1="221.5" x2="260.0" y2="76.6"/>
<line x1="320.0" y1="221.5" x2="320.0" y2="76.6"/>
<line x1="32.0" y1="187.0" x2="368.0" y2="187.0"/>
<line x1="32.0" y1="164.0" x2="368.0" y2="164.0"/>
<line x1="32.0" y1="95.0" x2="368.0" y2="95.0"/>
</g>
  <line x1="26.0" y1="210.0" x2="390.0" y2="210.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#q4)"/>
  <line x1="200.0" y1="227.5" x2="200.0" y2="54.6" stroke="#1a202c" stroke-width="1.5" marker-end="url(#q4)"/>
  <text x="382.0" y="226.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="208.0" y="64.6" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <line x1="80.0" y1="206.0" x2="80.0" y2="214.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="80.0" y="226.0" fill="#475569" font-size="11" text-anchor="middle">−2</text>
  <line x1="140.0" y1="206.0" x2="140.0" y2="214.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="140.0" y="226.0" fill="#475569" font-size="11" text-anchor="middle">−1</text>
  <line x1="260.0" y1="206.0" x2="260.0" y2="214.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="260.0" y="226.0" fill="#475569" font-size="11" text-anchor="middle">1</text>
  <line x1="320.0" y1="206.0" x2="320.0" y2="214.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="320.0" y="226.0" fill="#475569" font-size="11" text-anchor="middle">2</text>
  <line x1="196.0" y1="187.0" x2="204.0" y2="187.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="193.0" y="191.0" fill="#475569" font-size="11" text-anchor="end">1</text>
  <line x1="196.0" y1="164.0" x2="204.0" y2="164.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="193.0" y="168.0" fill="#475569" font-size="11" text-anchor="end">2</text>
  <line x1="196.0" y1="95.0" x2="204.0" y2="95.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="193.0" y="99.0" fill="#475569" font-size="11" text-anchor="end">5</text>
  <path d="M 38.0,19.3 L 42.1,27.6 L 46.1,35.7 L 50.2,43.5 L 54.2,51.2 L 58.2,58.6 L 62.3,65.9 L 66.4,72.9 L 70.4,79.7 L 74.5,86.3 L 78.5,92.7 L 82.6,98.9 L 86.6,104.8 L 90.7,110.6 L 94.7,116.2 L 98.8,121.5 L 102.8,126.6 L 106.9,131.6 L 110.9,136.3 L 115.0,140.8 L 119.0,145.1 L 123.1,149.2 L 127.1,153.0 L 131.2,156.7 L 135.2,160.2 L 139.2,163.4 L 143.3,166.5 L 147.3,169.3 L 151.4,171.9 L 155.5,174.3 L 159.5,176.5 L 163.6,178.5 L 167.6,180.3 L 171.7,181.9 L 175.7,183.2 L 179.8,184.4 L 183.8,185.3 L 187.8,186.1 L 191.9,186.6 L 195.9,186.9 L 200.0,187.0 L 204.0,186.9 L 208.1,186.6 L 212.2,186.1 L 216.2,185.3 L 220.2,184.4 L 224.3,183.2 L 228.4,181.9 L 232.4,180.3 L 236.4,178.5 L 240.5,176.5 L 244.6,174.3 L 248.6,171.9 L 252.7,169.3 L 256.7,166.5 L 260.8,163.4 L 264.8,160.2 L 268.8,156.7 L 272.9,153.0 L 276.9,149.2 L 281.0,145.1 L 285.1,140.8 L 289.1,136.3 L 293.1,131.6 L 297.2,126.6 L 301.2,121.5 L 305.3,116.2 L 309.3,110.6 L 313.4,104.8 L 317.4,98.9 L 321.5,92.7 L 325.5,86.3 L 329.6,79.7 L 333.7,72.9 L 337.7,65.9 L 341.8,58.6 L 345.8,51.2 L 349.9,43.5 L 353.9,35.7 L 357.9,27.6 L 362.0,19.3" fill="none" stroke="#94a3b8" stroke-width="1.2" stroke-linejoin="round" stroke-dasharray="4 3"/>
  <circle cx="80.0" cy="95.0" r="5" fill="#1d4ed8"/>
  <text x="88.0" y="89.0" fill="#475569" font-size="10" text-anchor="start">(-2, 5)</text>
  <circle cx="140.0" cy="164.0" r="5" fill="#1d4ed8"/>
  <text x="148.0" y="158.0" fill="#475569" font-size="10" text-anchor="start">(-1, 2)</text>
  <circle cx="200.0" cy="187.0" r="5" fill="#1d4ed8"/>
  <text x="208.0" y="181.0" fill="#475569" font-size="10" text-anchor="start">(0, 1)</text>
  <circle cx="260.0" cy="164.0" r="5" fill="#1d4ed8"/>
  <text x="268.0" y="158.0" fill="#475569" font-size="10" text-anchor="start">(1, 2)</text>
  <circle cx="320.0" cy="95.0" r="5" fill="#1d4ed8"/>
  <text x="328.0" y="89.0" fill="#475569" font-size="10" text-anchor="start">(2, 5)</text>
</svg>

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

$$f(x) = c \quad (c \text{ là một số cố định})$$

Đồ thị là **đường thẳng nằm ngang** ở chiều cao $y = c$. Vd $f(x) = 3$ luôn ra 3 dù x là gì.

### 5.2. Hàm bậc 1 — đường thẳng (Lesson 06)

$$f(x) = ax + b$$

Đồ thị là đường thẳng. $a$ quyết định **độ dốc**, $b$ là **giao điểm với Oy**.

### 5.3. Hàm bậc 2 — parabol (Lesson 06)

$$f(x) = ax^2 + bx + c \quad (a \neq 0)$$

Đồ thị là parabol. $a > 0$ mở lên, $a < 0$ mở xuống.

### 5.4. Hàm mũ (Lesson 07)

$$f(x) = e^x \quad (\text{hoặc } f(x) = a^x \text{ với } a > 0)$$

Range $= (0, +\infty)$. Tăng cực nhanh. Là nền tảng của tăng trưởng theo cấp số nhân, softmax trong ML, phân phối chuẩn, ...

### 5.5. Hàm logarit (Lesson 07)

$$f(x) = \ln(x) \quad (\text{log tự nhiên}) \quad \text{hoặc} \quad \log_b(x)$$

Domain $= (0, +\infty)$. Là **hàm ngược** của hàm mũ. Tăng cực chậm — gặp khắp nơi trong phân tích thuật toán ($O(\log n)$) và ML (log-likelihood).

### 5.6. Hàm giá trị tuyệt đối

$$f(x) = |x|$$

Đồ thị hình chữ V đỉnh ở $(0, 0)$. Range $= [0, +\infty)$. Trong ML, $|x|$ xuất hiện ở L1 loss.

### 5.7. Hàm sàn (floor) và hàm trần (ceil)

- $\text{floor}(x) = \lfloor x \rfloor$ = số nguyên lớn nhất $\leq x$. Vd $\lfloor 3.7 \rfloor = 3$, $\lfloor -1.2 \rfloor = -2$.
- $\text{ceil}(x) = \lceil x \rceil$ = số nguyên nhỏ nhất $\geq x$. Vd $\lceil 3.2 \rceil = 4$, $\lceil -1.7 \rceil = -1$.

Đồ thị có dạng **bậc thang**. Đây là ví dụ rõ về hàm "không liên tục" — nhưng vẫn là hàm (mỗi x cho đúng 1 y).

## 6. Hàm hợp (function composition)

Hai hàm có thể nối với nhau như hai máy nối tiếp.

<svg viewBox="0 0 480 100" style="max-width:480px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Hợp hàm g∘f: x → f → f(x) → g → g(f(x))">
  <defs><marker id="f5" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <text x="40.0" y="55.0" fill="#475569" font-size="14" text-anchor="middle" font-weight="700" font-style="italic">x</text>
  <line x1="64.0" y1="50.0" x2="100.0" y2="50.0" stroke="#1a202c" stroke-width="2" marker-end="url(#f5)"/>
  <rect x="108.0" y="30.0" width="40.0" height="40.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="128.0" y="55.0" fill="#1d4ed8" font-size="13" text-anchor="middle" font-weight="700">f</text>
  <line x1="152.0" y1="50.0" x2="188.0" y2="50.0" stroke="#1a202c" stroke-width="2" marker-end="url(#f5)"/>
  <text x="222.0" y="55.0" fill="#475569" font-size="14" text-anchor="middle" font-weight="700" font-style="italic">f(x)</text>
  <line x1="252.0" y1="50.0" x2="288.0" y2="50.0" stroke="#1a202c" stroke-width="2" marker-end="url(#f5)"/>
  <rect x="296.0" y="30.0" width="40.0" height="40.0" rx="8" fill="#dcfce7" fill-opacity="1" stroke="#15803d" stroke-width="2"/>
  <text x="316.0" y="55.0" fill="#15803d" font-size="13" text-anchor="middle" font-weight="700">g</text>
  <line x1="340.0" y1="50.0" x2="376.0" y2="50.0" stroke="#1a202c" stroke-width="2" marker-end="url(#f5)"/>
  <text x="422.0" y="55.0" fill="#475569" font-size="14" text-anchor="middle" font-weight="700" font-style="italic">g(f(x))</text>
</svg>

Ký hiệu: $(g \circ f)(x) = g(f(x))$, đọc là *"g hợp f"*. Hàm $f$ chạy trước, kết quả của $f$ được đưa vào $g$.

### 6.1. Ví dụ chính — tính `(g ∘ f)(3)` từng bước

Cho $f(x) = 2x + 1$ và $g(x) = x^2$. Tính $(g \circ f)(3)$:

**Cách 1: Tính theo từng máy**

<svg viewBox="0 0 460 280" style="max-width:460px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Chuỗi tính (g∘f)(3): input 3 → f cho 2·3 + 1 = 7 → g cho 7² = 49 → output 49">
  <defs><marker id="f6" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <rect x="80.0" y="16.0" width="300.0" height="36.0" rx="8" fill="#f1f5f9" fill-opacity="1" stroke="#475569" stroke-width="2"/>
  <text x="230.0" y="39.0" fill="#475569" font-size="13" text-anchor="middle" font-weight="700">Input: 3</text>
  <line x1="230.0" y1="52.0" x2="230.0" y2="70.0" stroke="#1a202c" stroke-width="2" marker-end="url(#f6)"/>
  <rect x="80.0" y="74.0" width="300.0" height="36.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="230.0" y="97.0" fill="#1d4ed8" font-size="13" text-anchor="middle" font-weight="700">Máy f: 2·3 + 1 = 7   (Bước 1)</text>
  <line x1="230.0" y1="110.0" x2="230.0" y2="128.0" stroke="#1a202c" stroke-width="2" marker-end="url(#f6)"/>
  <rect x="80.0" y="132.0" width="300.0" height="36.0" rx="8" fill="#dcfce7" fill-opacity="1" stroke="#15803d" stroke-width="2"/>
  <text x="230.0" y="155.0" fill="#15803d" font-size="13" text-anchor="middle" font-weight="700">Máy g: 7² = 49   (Bước 2)</text>
  <line x1="230.0" y1="168.0" x2="230.0" y2="186.0" stroke="#1a202c" stroke-width="2" marker-end="url(#f6)"/>
  <rect x="80.0" y="190.0" width="300.0" height="36.0" rx="8" fill="#fee2e2" fill-opacity="1" stroke="#dc2626" stroke-width="2"/>
  <text x="230.0" y="213.0" fill="#dc2626" font-size="13" text-anchor="middle" font-weight="700">Output: 49</text>
  <text x="230.0" y="262.0" fill="#1a202c" font-size="14" text-anchor="middle" font-weight="700">⟹ (g ∘ f)(3) = g(f(3)) = 49</text>
</svg>

**Cách 2: Lập công thức `(g ∘ f)(x)` rồi thay x = 3**

$$\begin{aligned}
(g \circ f)(x) &= g(f(x)) &&\leftarrow \text{định nghĩa} \\
               &= g(2x + 1) &&\leftarrow \text{thay } f(x) \text{ vào ô input của } g \\
               &= (2x + 1)^2 &&\leftarrow \text{áp dụng quy tắc của } g \text{ (bình phương)}
\end{aligned}$$

Thay $x = 3$: $(2 \cdot 3 + 1)^2 = 7^2 = 49$ ✓. Cùng kết quả với Cách 1.

**Cách nào tốt hơn?** Tùy:
- Nếu cần *một giá trị cụ thể* → Cách 1 nhanh hơn (không cần khai triển đại số).
- Nếu cần *công thức tổng quát* (vd để khảo sát đồ thị $g \circ f$, hoặc tính đạo hàm) → Cách 2 bắt buộc.

### 6.2. `g ∘ f` KHÁC `f ∘ g` — phép composition không giao hoán

Với cùng $f(x) = 2x + 1$, $g(x) = x^2$, tính **chiều ngược** $(f \circ g)(x)$:

$$\begin{aligned}
(f \circ g)(x) &= f(g(x)) \\
               &= f(x^2) &&\leftarrow \text{thay } g(x) \text{ vào ô input của } f \\
               &= 2 \cdot x^2 + 1 &&\leftarrow \text{áp dụng quy tắc của } f \text{ (nhân 2, cộng 1)}
\end{aligned}$$

So sánh hai composition:

| Composition | Công thức | Tại x = 3 | Tại x = 0 | Tại x = −1 |
|-------------|-----------|-----------|-----------|------------|
| $(g \circ f)(x)$ | $(2x + 1)^2 = 4x^2 + 4x + 1$ | 49 | 1 | 1 |
| $(f \circ g)(x)$ | $2x^2 + 1$ | 19 | 1 | 3 |

**Khác nhau hoàn toàn** — bậc khác (bậc 2 cả hai nhưng hệ số khác), giá trị khác. Composition **không giao hoán**: $g \circ f \neq f \circ g$ trong trường hợp tổng quát.

Trực giác: "cộng 1 rồi bình phương" khác với "bình phương rồi cộng 1". Thứ tự thực hiện hai biến đổi quyết định kết quả.

### 6.3. Thêm 2 ví dụ chi tiết

**Ví dụ A**: $f(x) = x + 5$, $g(x) = 3x$. Tính $(f \circ g)(2)$ và $(g \circ f)(2)$.

Tính $(f \circ g)(2)$:
- Bước 1: $g(2) = 3 \cdot 2 = 6$.
- Bước 2: $f(6) = 6 + 5 = 11$.
- $\Rightarrow (f \circ g)(2) = 11$.

Tính $(g \circ f)(2)$:
- Bước 1: $f(2) = 2 + 5 = 7$.
- Bước 2: $g(7) = 3 \cdot 7 = 21$.
- $\Rightarrow (g \circ f)(2) = 21$.

Công thức tổng quát:
- $(f \circ g)(x) = f(3x) = 3x + 5$.
- $(g \circ f)(x) = g(x + 5) = 3(x + 5) = 3x + 15$.

→ Khác nhau **10 đơn vị** với mọi x. Trực giác: trong $f \circ g$, ta "cộng 5 vào *kết quả nhân 3*". Trong $g \circ f$, ta "nhân 3 *cả cộng 5*" — nên cái 5 ban đầu bị nhân lên thành 15.

**Ví dụ B**: $f(x) = \sqrt{x}$ (domain $x \geq 0$), $g(x) = x - 1$. Tính $(f \circ g)(x)$ và xác định domain.

- Công thức: $(f \circ g)(x) = f(x - 1) = \sqrt{x - 1}$.
- Domain: cần $g(x) = x - 1$ nằm trong domain của $f$ (tức là $\geq 0$) $\Rightarrow x - 1 \geq 0 \Rightarrow x \geq 1$.
- **Domain của $f \circ g$ $= [1, +\infty)$**.

Đây là điểm quan trọng: domain của composition **không** mặc nhiên là domain của hàm ngoài. Phải đảm bảo *output của hàm trong* ($g(x)$) nằm trong *domain của hàm ngoài* ($f$).

Chiều ngược: $(g \circ f)(x) = g(\sqrt{x}) = \sqrt{x} - 1$, domain $x \geq 0$ (chính là domain của $f$).

### 6.4. Composition 3 hàm: `(h ∘ g ∘ f)(x)`

Ba hàm xếp thành chuỗi cũng tương tự — chạy từ trong ra ngoài:

<svg viewBox="0 0 716 100" style="max-width:716px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Hợp ba hàm: x → f → f(x) → g → g(f(x)) → h → h(g(f(x)))">
  <defs><marker id="f7" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <text x="40.0" y="55.0" fill="#475569" font-size="14" text-anchor="middle" font-weight="700" font-style="italic">x</text>
  <line x1="64.0" y1="50.0" x2="100.0" y2="50.0" stroke="#1a202c" stroke-width="2" marker-end="url(#f7)"/>
  <rect x="108.0" y="30.0" width="40.0" height="40.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="128.0" y="55.0" fill="#1d4ed8" font-size="13" text-anchor="middle" font-weight="700">f</text>
  <line x1="152.0" y1="50.0" x2="188.0" y2="50.0" stroke="#1a202c" stroke-width="2" marker-end="url(#f7)"/>
  <text x="222.0" y="55.0" fill="#475569" font-size="14" text-anchor="middle" font-weight="700" font-style="italic">f(x)</text>
  <line x1="252.0" y1="50.0" x2="288.0" y2="50.0" stroke="#1a202c" stroke-width="2" marker-end="url(#f7)"/>
  <rect x="296.0" y="30.0" width="40.0" height="40.0" rx="8" fill="#dcfce7" fill-opacity="1" stroke="#15803d" stroke-width="2"/>
  <text x="316.0" y="55.0" fill="#15803d" font-size="13" text-anchor="middle" font-weight="700">g</text>
  <line x1="340.0" y1="50.0" x2="376.0" y2="50.0" stroke="#1a202c" stroke-width="2" marker-end="url(#f7)"/>
  <text x="422.0" y="55.0" fill="#475569" font-size="14" text-anchor="middle" font-weight="700" font-style="italic">g(f(x))</text>
  <line x1="464.0" y1="50.0" x2="500.0" y2="50.0" stroke="#1a202c" stroke-width="2" marker-end="url(#f7)"/>
  <rect x="508.0" y="30.0" width="40.0" height="40.0" rx="8" fill="#ede9fe" fill-opacity="1" stroke="#7c3aed" stroke-width="2"/>
  <text x="528.0" y="55.0" fill="#7c3aed" font-size="13" text-anchor="middle" font-weight="700">h</text>
  <line x1="552.0" y1="50.0" x2="588.0" y2="50.0" stroke="#1a202c" stroke-width="2" marker-end="url(#f7)"/>
  <text x="646.0" y="55.0" fill="#475569" font-size="14" text-anchor="middle" font-weight="700" font-style="italic">h(g(f(x)))</text>
</svg>

Ví dụ: $f(x) = x + 1$, $g(x) = 2x$, $h(x) = x^2$. Tính $(h \circ g \circ f)(3)$:
- $f(3) = 4$.
- $g(4) = 8$.
- $h(8) = 64$.
- $\Rightarrow$ kết quả $= 64$.

Đây chính là cấu trúc của neural network (xem mục 8).

### 🔁 Dừng lại tự kiểm tra (mục 6)

1. Cho $f(x) = x - 1$, $g(x) = x^2$. Tính $(g \circ f)(4)$ và $(f \circ g)(4)$.
2. Lập công thức tổng quát cho $(g \circ f)(x)$ và $(f \circ g)(x)$ ở câu 1.
3. Cho $f(x) = \sqrt{x}$, $g(x) = 4 - x$. Tìm domain của $f \circ g$.

*Đáp án nhanh*:
1. $f(4) = 3$, $g(3) = 9 \Rightarrow (g \circ f)(4) = 9$. $g(4) = 16$, $f(16) = 15 \Rightarrow (f \circ g)(4) = 15$.
2. $(g \circ f)(x) = (x - 1)^2$. $(f \circ g)(x) = x^2 - 1$.
3. $(f \circ g)(x) = \sqrt{4 - x}$, cần $4 - x \geq 0 \Rightarrow x \leq 4$. Domain $= (-\infty, 4]$.

### 📌 Tóm tắt mục 6

- **Composition** $(g \circ f)(x) = g(f(x))$: chạy f trước, kết quả của f là input của g.
- Tính 2 cách: từng máy (nhanh cho 1 giá trị), hoặc lập công thức tổng quát (cần cho khảo sát).
- **Không giao hoán**: $g \circ f \neq f \circ g$ trong tổng quát.
- Domain của $f \circ g$: cần output của g nằm trong domain của f.

### 6.5. Vì sao composition quan trọng cho ML?

**Mạng neural sâu (deep neural network) chính là một composition khổng lồ.**

Một mạng có L lớp tính toán như sau:

$$\begin{aligned}
\text{output} &= f_L( f_{L-1}( \ldots f_2( f_1(\text{input}) ) \ldots ) ) \\
              &= (f_L \circ f_{L-1} \circ \ldots \circ f_1)(\text{input})
\end{aligned}$$

Mỗi $f_i$ thường có dạng:

$$f_i(x) = \text{activation}( W_i \cdot x + b_i )$$

Trong đó $W_i$ là ma trận, $b_i$ là vector, $\text{activation}$ là một hàm số (sigmoid, ReLU, tanh — sẽ thấy trong viz).

→ Khi bạn nghe câu *"deep learning học bằng cách điều chỉnh hàng triệu tham số trong các lớp hàm chồng lên nhau"* — chính là điều này.

## 7. Hàm ngược (inverse function)

### 7.1. Trực giác

Nếu $f$ là máy "biến x thành y", thì **hàm ngược** $f^{-1}$ là máy "biến y trở lại x". Nó **đảo ngược** hành động của $f$.

<svg viewBox="0 0 560 80" style="max-width:560px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="f đưa x sang y; f⁻¹ đưa y trở lại x">
  <defs><marker id="f8" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <text x="40.0" y="45.0" fill="#475569" font-size="14" text-anchor="middle" font-weight="700" font-style="italic">x</text>
  <line x1="56.0" y1="40.0" x2="100.0" y2="40.0" stroke="#1a202c" stroke-width="2" marker-end="url(#f8)"/>
  <rect x="104.0" y="20.0" width="70.0" height="40.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="139.0" y="45.0" fill="#1d4ed8" font-size="13" text-anchor="middle" font-weight="700">f</text>
  <line x1="178.0" y1="40.0" x2="222.0" y2="40.0" stroke="#1a202c" stroke-width="2" marker-end="url(#f8)"/>
  <text x="240.0" y="45.0" fill="#475569" font-size="14" text-anchor="middle" font-weight="700" font-style="italic">y</text>
  <text x="320.0" y="45.0" fill="#475569" font-size="14" text-anchor="middle" font-weight="700" font-style="italic">y</text>
  <line x1="336.0" y1="40.0" x2="380.0" y2="40.0" stroke="#1a202c" stroke-width="2" marker-end="url(#f8)"/>
  <rect x="384.0" y="20.0" width="70.0" height="40.0" rx="8" fill="#dcfce7" fill-opacity="1" stroke="#15803d" stroke-width="2"/>
  <text x="419.0" y="45.0" fill="#15803d" font-size="13" text-anchor="middle" font-weight="700">f⁻¹</text>
  <line x1="458.0" y1="40.0" x2="502.0" y2="40.0" stroke="#1a202c" stroke-width="2" marker-end="url(#f8)"/>
  <text x="520.0" y="45.0" fill="#475569" font-size="14" text-anchor="middle" font-weight="700" font-style="italic">x</text>
</svg>

Ký hiệu $f^{-1}$ (đọc là "f ngược") — **không phải** $1/f$. Đây là quy ước dễ gây nhầm.

### 7.2. Điều kiện tồn tại: f phải đơn ánh

$f^{-1}$ chỉ tồn tại khi $f$ **đơn ánh** (one-to-one, injective): hai input khác nhau cho hai output khác nhau.

Vì sao? Nếu $f(2) = f(-2) = 4$ (như $f(x) = x^2$), thì khi cần đảo ngược, hỏi *"cái nào ra $4$?"* — không trả lời được vì có cả $2$ và $-2$. Không có cách nào định nghĩa $f^{-1}(4)$ cho hợp lý.

**Cách thử bằng đồ thị**: **horizontal line test** — mọi đường thẳng ngang cắt đồ thị tối đa 1 điểm thì f đơn ánh.

### 7.3. Quy trình tìm hàm ngược — 3 bước

> **Bước 1**: Đặt $y = f(x)$ (viết hàm ra dưới dạng phương trình).
>
> **Bước 2**: **Giải $x$ theo $y$** (đảo các phép toán: cộng → trừ, nhân → chia, mũ → log, ...).
>
> **Bước 3**: **Hoán đổi tên biến** $x \leftrightarrow y$ để có $f^{-1}(x) = \ldots$. (Bước này chỉ là quy ước đặt tên — vì ta thường viết biến input là $x$.)

**Lý do bước 3**: vai trò input/output bị đảo trong $f^{-1}$. Ban đầu $f$ nhận $x$ ra $y$; bây giờ $f^{-1}$ nhận $y$ ra $x$. Để giữ thói quen "biến input gọi là $x$", ta đổi tên cuối cùng.

### 7.4. Walk-through 3 ví dụ

**Ví dụ 1**: tìm hàm ngược của $f(x) = 2x + 3$.

- Bước 1: $y = 2x + 3$.
- Bước 2: giải $x$ theo $y$:
  $$\begin{aligned}
  y &= 2x + 3 \\
  y - 3 &= 2x &&\text{(trừ 3 hai vế)} \\
  x &= \frac{y - 3}{2} &&\text{(chia 2 hai vế)}
  \end{aligned}$$
- Bước 3: hoán đổi $x \leftrightarrow y$:
  $$f^{-1}(x) = \frac{x - 3}{2}$$

**Kiểm tra** (phép thử "vào ra"):
- $f(5) = 2 \cdot 5 + 3 = 13$.
- $f^{-1}(13) = (13 - 3) / 2 = 5$ ✓.
- Hoặc kiểm tra công thức: $f^{-1}(f(x)) = f^{-1}(2x + 3) = ((2x+3) - 3)/2 = 2x/2 = x$ ✓.

**Ví dụ 2**: tìm hàm ngược của $f(x) = (x + 4) / 3$.

- Bước 1: $y = (x + 4)/3$.
- Bước 2:
  $$\begin{aligned}
  3y &= x + 4 &&\text{(nhân 3 hai vế)} \\
  x &= 3y - 4 &&\text{(trừ 4)}
  \end{aligned}$$
- Bước 3: $f^{-1}(x) = 3x - 4$.

Kiểm tra: $f(2) = 6/3 = 2$. $f^{-1}(2) = 6 - 4 = 2$. Cũng có thể thử $f(8) = 12/3 = 4$, $f^{-1}(4) = 12 - 4 = 8$ ✓.

**Ví dụ 3**: tìm hàm ngược của $f(x) = e^x + 1$.

- Bước 1: $y = e^x + 1$.
- Bước 2:
  $$\begin{aligned}
  y - 1 &= e^x &&\text{(trừ 1)} \\
  \ln(y - 1) &= x &&\text{(lấy ln hai vế — vì ln là ngược của } e^x\text{)}
  \end{aligned}$$
  Lưu ý: cần $y - 1 > 0 \Rightarrow y > 1$ (domain của $f^{-1}$).
- Bước 3: $f^{-1}(x) = \ln(x - 1)$, domain $x > 1$.

Kiểm tra: $f(0) = e^0 + 1 = 2$. $f^{-1}(2) = \ln(1) = 0$ ✓.

**Ví dụ 4 (khó hơn)**: tìm hàm ngược của $f(x) = (2x + 1)/(x - 3)$.

- Bước 1: $y = (2x + 1)/(x - 3)$.
- Bước 2: nhân chéo:
  $$\begin{aligned}
  y(x - 3) &= 2x + 1 \\
  yx - 3y &= 2x + 1 \\
  yx - 2x &= 3y + 1 &&\text{(gom x sang trái)} \\
  x(y - 2) &= 3y + 1 \\
  x &= \frac{3y + 1}{y - 2}
  \end{aligned}$$
- Bước 3: $f^{-1}(x) = (3x + 1) / (x - 2)$, domain $x \neq 2$.

Kiểm tra: $f(4) = 9/1 = 9$. $f^{-1}(9) = (27 + 1)/(9 - 2) = 28/7 = 4$ ✓.

### 7.5. Phép thử "vào ra"

Nếu $g$ thực sự là hàm ngược của $f$, thì:

$$\begin{aligned}
f( g(y) ) &= y &&\text{với mọi y thuộc range của f} \\
g( f(x) ) &= x &&\text{với mọi x thuộc domain của f}
\end{aligned}$$

Tức là chạy qua máy $f$ rồi qua máy $g$ thì trở lại điểm xuất phát.

### 7.6. Đồ thị: f và f⁻¹ đối xứng qua đường y = x

Đây là sự thật hình học rất đẹp:

> **Đồ thị của $f^{-1}$ là đối xứng của đồ thị $f$ qua đường thẳng $y = x$.**

Lý do: điểm $(a, b)$ thuộc đồ thị $f \iff b = f(a) \iff a = f^{-1}(b) \iff (b, a)$ thuộc đồ thị $f^{-1}$. Mà $(a, b)$ và $(b, a)$ đối xứng nhau qua $y = x$.

#### Minh họa: f(x) = 2x + 1 và f⁻¹(x) = (x − 1)/2

<svg viewBox="0 0 480 305" style="max-width:480px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Đồ thị f(x) = 2x + 1 và f⁻¹(x) = (x − 1)/2 đối xứng nhau qua đường y = x; các điểm (a,b) của f ứng với (b,a) của f⁻¹">
  <defs><marker id="inv" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="226.0" y1="265.0" x2="226.0" y2="5.0"/>
<line x1="278.0" y1="265.0" x2="278.0" y2="5.0"/>
<line x1="330.0" y1="265.0" x2="330.0" y2="5.0"/>
<line x1="382.0" y1="265.0" x2="382.0" y2="5.0"/>
<line x1="135.0" y1="174.0" x2="395.0" y2="174.0"/>
<line x1="135.0" y1="122.0" x2="395.0" y2="122.0"/>
<line x1="135.0" y1="70.0" x2="395.0" y2="70.0"/>
<line x1="135.0" y1="18.0" x2="395.0" y2="18.0"/>
</g>
  <line x1="129.0" y1="200.0" x2="417.0" y2="200.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#inv)"/>
  <line x1="200.0" y1="271.0" x2="200.0" y2="-17.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#inv)"/>
  <text x="409.0" y="216.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="208.0" y="-7.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <line x1="226.0" y1="196.0" x2="226.0" y2="204.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="226.0" y="216.0" fill="#475569" font-size="11" text-anchor="middle">1</text>
  <line x1="278.0" y1="196.0" x2="278.0" y2="204.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="278.0" y="216.0" fill="#475569" font-size="11" text-anchor="middle">3</text>
  <line x1="330.0" y1="196.0" x2="330.0" y2="204.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="330.0" y="216.0" fill="#475569" font-size="11" text-anchor="middle">5</text>
  <line x1="382.0" y1="196.0" x2="382.0" y2="204.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="382.0" y="216.0" fill="#475569" font-size="11" text-anchor="middle">7</text>
  <line x1="196.0" y1="174.0" x2="204.0" y2="174.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="193.0" y="178.0" fill="#475569" font-size="11" text-anchor="end">1</text>
  <line x1="196.0" y1="122.0" x2="204.0" y2="122.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="193.0" y="126.0" fill="#475569" font-size="11" text-anchor="end">3</text>
  <line x1="196.0" y1="70.0" x2="204.0" y2="70.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="193.0" y="74.0" fill="#475569" font-size="11" text-anchor="end">5</text>
  <line x1="196.0" y1="18.0" x2="204.0" y2="18.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="193.0" y="22.0" fill="#475569" font-size="11" text-anchor="end">7</text>
  <path d="M 140.2,259.8 L 165.2,234.8 L 190.1,209.9 L 215.1,184.9 L 240.0,160.0 L 265.0,135.0 L 290.0,110.0 L 314.9,85.1 L 339.9,60.1 L 364.8,35.2 L 389.8,10.2" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-linejoin="round" stroke-dasharray="6 4"/>
  <text x="379.6" y="42.4" fill="#94a3b8" font-size="11" text-anchor="start" font-weight="700">y = x (trục đối xứng)</text>
  <path d="M 155.8,262.4 L 168.3,237.4 L 180.8,212.5 L 193.2,187.5 L 205.7,162.6 L 218.2,137.6 L 230.7,112.6 L 243.2,87.7 L 255.6,62.7 L 268.1,37.8 L 280.6,12.8" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linejoin="round"/>
  <text x="274.6" y="6.8" fill="#1d4ed8" font-size="12" text-anchor="end" font-weight="700">y = 2x + 1 (f)</text>
  <path d="M 140.2,242.9 L 165.2,230.4 L 190.1,217.9 L 215.1,205.5 L 240.0,193.0 L 265.0,180.5 L 290.0,168.0 L 314.9,155.5 L 339.9,143.1 L 364.8,130.6 L 389.8,118.1" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-linejoin="round"/>
  <text x="395.8" y="122.1" fill="#dc2626" font-size="12" text-anchor="start" font-weight="700">y = (x − 1)/2 (f⁻¹)</text>
  <circle cx="200.0" cy="174.0" r="4" fill="#1d4ed8"/>
  <circle cx="226.0" cy="200.0" r="4" fill="#dc2626"/>
  <line x1="200.0" y1="174.0" x2="226.0" y2="200.0" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 3"/>
  <circle cx="226.0" cy="122.0" r="4" fill="#1d4ed8"/>
  <circle cx="278.0" cy="174.0" r="4" fill="#dc2626"/>
  <line x1="226.0" y1="122.0" x2="278.0" y2="174.0" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 3"/>
  <circle cx="252.0" cy="70.0" r="4" fill="#1d4ed8"/>
  <circle cx="330.0" cy="148.0" r="4" fill="#dc2626"/>
  <line x1="252.0" y1="70.0" x2="330.0" y2="148.0" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 3"/>
  <circle cx="278.0" cy="18.0" r="4" fill="#1d4ed8"/>
  <circle cx="382.0" cy="122.0" r="4" fill="#dc2626"/>
  <line x1="278.0" y1="18.0" x2="382.0" y2="122.0" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="192.0" y="168.0" fill="#1d4ed8" font-size="10" text-anchor="end">(0,1)</text>
  <text x="230.0" y="228.0" fill="#dc2626" font-size="10" text-anchor="start">(1,0)</text>
  <text x="244.0" y="66.0" fill="#1d4ed8" font-size="10" text-anchor="end">(2,5)</text>
  <text x="336.0" y="162.0" fill="#dc2626" font-size="10" text-anchor="start">(5,2)</text>
  <text x="230.0" y="290.0" fill="#475569" font-size="11" text-anchor="middle">f: (0,1), (1,3), (2,5), (3,7)  ↔  f⁻¹: (1,0), (3,1), (5,2), (7,3) — đối xứng qua y = x</text>
</svg>

Mỗi cặp điểm $(a, b)$ của $f$ và $(b, a)$ của $f^{-1}$ đối xứng qua đường $y = x$ (đường chéo). Lật tờ giấy theo đường chéo này, đồ thị $f$ trùng đồ thị $f^{-1}$.

**Hiện tượng tương tự với hàm khác**:
- $f(x) = e^x$ và $f^{-1}(x) = \ln(x)$: đồ thị mũ và log đối xứng qua $y = x$. Đó là lý do bạn thấy chúng "phản chiếu" nhau trong sách giáo khoa.
- $f(x) = x^3$ và $f^{-1}(x) = \sqrt[3]{x}$: cũng đối xứng qua $y = x$.

Visualization sẽ vẽ rõ điều này.

### 🔁 Dừng lại tự kiểm tra (mục 7)

1. Tìm hàm ngược của $f(x) = 4x - 5$.
2. Tìm hàm ngược của $g(x) = 1/(x + 2)$.
3. Hàm $h(x) = x^2$ (domain $\mathbb{R}$) **có** hàm ngược không? Vì sao?
4. Nếu $f(3) = 11$, thì $f^{-1}(11) = ?$

*Đáp án nhanh*:
1. $y = 4x - 5 \Rightarrow x = (y + 5)/4 \Rightarrow f^{-1}(x) = (x + 5)/4$.
2. $y = 1/(x+2) \Rightarrow x + 2 = 1/y \Rightarrow x = 1/y - 2 \Rightarrow g^{-1}(x) = 1/x - 2$, domain $x \neq 0$.
3. **Không** trên domain $\mathbb{R}$ — vì $h(2) = h(-2) = 4$, không đơn ánh. Nếu giới hạn domain $[0, +\infty)$ thì có: $h^{-1}(x) = \sqrt{x}$.
4. $f^{-1}(11) = 3$ (vì nếu $f$ đưa 3 đến 11 thì $f^{-1}$ đưa 11 trở lại 3).

### 📌 Tóm tắt mục 7

- **Hàm ngược** $f^{-1}$ = "máy chạy ngược": đảo input và output.
- Điều kiện tồn tại: $f$ phải **đơn ánh** (mỗi y chỉ có 1 x trả lại).
- Tìm $f^{-1}$: **3 bước** — (1) $y = f(x)$, (2) giải $x$ theo $y$, (3) hoán đổi $x \leftrightarrow y$.
- Đồ thị $f$ và $f^{-1}$ **đối xứng qua $y = x$**.
- Tính chất: $f(f^{-1}(y)) = y$ và $f^{-1}(f(x)) = x$.

## 8. Liên hệ với lập trình và ML

### 8.1. Hàm Go = hàm toán học (gần như)

```go
func f(x float64) float64 {
    return 2*x + 1
}

func main() {
    y := f(3)         // y = 7
    fmt.Println(y)
}
```

Hàm Go nhận input là một số, trả về một số — đúng như hàm toán. Khác biệt quan trọng: hàm Go có thể có **hiệu ứng phụ** (in ra màn hình, sửa biến toàn cục), còn hàm toán thì **thuần** (cùng input luôn ra cùng output, không "nhớ" gì). Trong ML và lập trình hàm (functional), người ta cố giữ hàm thuần để dễ suy luận.

### 8.2. Hàm bậc cao: composition trong code

Trong Go, hàm có thể là **giá trị** (truyền hàm vào hàm khác):

```go
func compose(f, g func(float64) float64) func(float64) float64 {
    return func(x float64) float64 {
        return g(f(x))  // (g ∘ f)(x)
    }
}
```

Hàm `compose` nhận `f` và `g`, trả về **hàm mới** $g \circ f$. Đây là cách mạng neural được mô tả dưới dạng "chuỗi composition".

### 8.3. Mạng neural 2 lớp dưới dạng composition

Lấy mạng đơn giản nhất — **mạng feedforward 2 lớp**. Công thức tổng quát:

$$f(x) = W_2 \cdot \text{ReLU}(W_1 \cdot x + b_1) + b_2$$

Trong đó:
- $x$ là vector input (vd ảnh 28×28 = 784 chiều với MNIST).
- $W_1$ là ma trận trọng số lớp 1, $b_1$ là vector bias lớp 1.
- $W_2$ là ma trận trọng số lớp 2, $b_2$ là vector bias lớp 2.
- $\text{ReLU}$ là activation function (xem 8.4).

**Bóc tách thành 4 hàm con xếp composition**:

| Bước | Hàm | Vai trò |
|------|-----|---------|
| 1 | $h_1(x) = W_1 \cdot x + b_1$ | "Affine" lớp 1 (nhân ma trận + cộng bias) |
| 2 | $h_2(u) = \text{ReLU}(u)$ | Activation lớp 1 (phi tuyến) |
| 3 | $h_3(v) = W_2 \cdot v + b_2$ | "Affine" lớp 2 |
| 4 | (output) | (không cần activation cuối nếu là regression; nếu phân loại thì thêm softmax) |

Toàn bộ mạng = composition:

$$\begin{aligned}
f &= h_3 \circ h_2 \circ h_1 \\
f(x) &= h_3(h_2(h_1(x)))
\end{aligned}$$

Mỗi mũi tên $\circ$ trong công thức tương đương một "tầng" của mạng. Mạng **deep** thì xếp 10, 50, 100 tầng — vẫn chỉ là composition dài hơn.

Khi training, ta điều chỉnh $W_1, b_1, W_2, b_2$ để $f(x)$ xấp xỉ output mong muốn. **Đạo hàm hàm hợp** (chain rule) chính là công cụ — sẽ học ở Lesson Calculus.

### 8.4. Activation functions phổ biến

Activation **phi tuyến** xen giữa các lớp affine là yếu tố sống còn — không có nó, một mạng N lớp chỉ tương đương 1 lớp (vì composition của hàm tuyến tính vẫn tuyến tính). Activation tạo "uốn cong" cho mạng.

Bốn activation thường gặp nhất:

| Tên | Công thức | Range | Đặc điểm | Khi nào dùng |
|-----|-----------|-------|----------|--------------|
| **Sigmoid** | $\sigma(x) = \dfrac{1}{1 + e^{-x}}$ | $(0, 1)$ | Mịn, bị "bão hòa" khi $\lvert x \rvert$ lớn (đạo hàm $\to 0$) | Output xác suất nhị phân (binary classification) |
| **Tanh** | $\tanh(x) = \dfrac{e^x - e^{-x}}{e^x + e^{-x}}$ | $(-1, 1)$ | Như sigmoid nhưng đối xứng quanh 0 | RNN cũ; hiện ít dùng |
| **ReLU** | $\text{relu}(x) = \max(0, x)$ | $[0, +\infty)$ | Đơn giản, tính nhanh, không bão hòa với $x > 0$ | **Mặc định** trong CNN, Transformer feedforward |
| **GeLU** | $\text{gelu}(x) = x \cdot \Phi(x)$ ($\Phi$ = CDF chuẩn) | $(\sim-0.17, +\infty)$ | "ReLU mịn" theo xác suất; xấp xỉ $0.5x(1 + \tanh(\sqrt{2/\pi}(x + 0.044715x^3)))$ | Mặc định trong Transformer hiện đại (BERT, GPT) |

Thêm Softplus (ít gặp): $\text{softplus}(x) = \ln(1 + e^x)$ — luôn dương, mịn, xấp xỉ ReLU.

**Đồ thị thô**:
<svg viewBox="0 0 600 230" style="max-width:600px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Bốn hàm kích hoạt vẽ từ −4 đến 4: ReLU gấp khúc tại 0, Sigmoid chữ S từ 0 lên 1, Tanh chữ S từ −1 lên 1, GeLU trơn gần ReLU">
  <defs><marker id="act0" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="act150" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="act300" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="act450" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <text x="70.0" y="14.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">ReLU</text>
  <line x1="8.0" y1="125.0" x2="148.0" y2="125.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#act0)"/>
  <line x1="70.0" y1="187.0" x2="70.0" y2="19.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#act0)"/>
  <text x="140.0" y="141.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic"></text>
  <text x="78.0" y="29.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic"></text>
  <path d="M 14.0,125.0 L 15.4,125.0 L 16.8,125.0 L 18.2,125.0 L 19.6,125.0 L 21.0,125.0 L 22.4,125.0 L 23.8,125.0 L 25.2,125.0 L 26.6,125.0 L 28.0,125.0 L 29.4,125.0 L 30.8,125.0 L 32.2,125.0 L 33.6,125.0 L 35.0,125.0 L 36.4,125.0 L 37.8,125.0 L 39.2,125.0 L 40.6,125.0 L 42.0,125.0 L 43.4,125.0 L 44.8,125.0 L 46.2,125.0 L 47.6,125.0 L 49.0,125.0 L 50.4,125.0 L 51.8,125.0 L 53.2,125.0 L 54.6,125.0 L 56.0,125.0 L 57.4,125.0 L 58.8,125.0 L 60.2,125.0 L 61.6,125.0 L 63.0,125.0 L 64.4,125.0 L 65.8,125.0 L 67.2,125.0 L 68.6,125.0 L 70.0,125.0 L 71.4,122.2 L 72.8,119.4 L 74.2,116.6 L 75.6,113.8 L 77.0,111.0 L 78.4,108.2 L 79.8,105.4 L 81.2,102.6 L 82.6,99.8 L 84.0,97.0 L 85.4,94.2 L 86.8,91.4 L 88.2,88.6 L 89.6,85.8 L 91.0,83.0 L 92.4,80.2 L 93.8,77.4 L 95.2,74.6 L 96.6,71.8 L 98.0,69.0 L 99.4,66.2 L 100.8,63.4 L 102.2,60.6 L 103.6,57.8 L 105.0,55.0 L 106.4,52.2 L 107.8,49.4 L 109.2,46.6 L 110.6,43.8 L 112.0,41.0 L 113.4,38.2 L 114.8,35.4 L 116.2,32.6 L 117.6,29.8 L 119.0,27.0 L 120.4,24.2 L 121.8,21.4 L 123.2,18.6 L 124.6,15.8 L 126.0,13.0" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linejoin="round"/>
  <text x="220.0" y="14.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">Sigmoid</text>
  <line x1="158.0" y1="125.0" x2="298.0" y2="125.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#act150)"/>
  <line x1="220.0" y1="187.0" x2="220.0" y2="19.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#act150)"/>
  <text x="290.0" y="141.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic"></text>
  <text x="228.0" y="29.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic"></text>
  <path d="M 164.0,124.5 L 165.4,124.4 L 166.8,124.4 L 168.2,124.3 L 169.6,124.3 L 171.0,124.2 L 172.4,124.1 L 173.8,124.0 L 175.2,123.9 L 176.6,123.8 L 178.0,123.7 L 179.4,123.5 L 180.8,123.4 L 182.2,123.2 L 183.6,123.1 L 185.0,122.9 L 186.4,122.7 L 187.8,122.4 L 189.2,122.2 L 190.6,121.9 L 192.0,121.7 L 193.4,121.4 L 194.8,121.0 L 196.2,120.7 L 197.6,120.3 L 199.0,119.9 L 200.4,119.5 L 201.8,119.0 L 203.2,118.5 L 204.6,118.0 L 206.0,117.5 L 207.4,116.9 L 208.8,116.3 L 210.2,115.7 L 211.6,115.1 L 213.0,114.4 L 214.4,113.8 L 215.8,113.1 L 217.2,112.4 L 218.6,111.7 L 220.0,111.0 L 221.4,110.3 L 222.8,109.6 L 224.2,108.9 L 225.6,108.2 L 227.0,107.6 L 228.4,106.9 L 229.8,106.3 L 231.2,105.7 L 232.6,105.1 L 234.0,104.5 L 235.4,104.0 L 236.8,103.5 L 238.2,103.0 L 239.6,102.5 L 241.0,102.1 L 242.4,101.7 L 243.8,101.3 L 245.2,101.0 L 246.6,100.6 L 248.0,100.3 L 249.4,100.1 L 250.8,99.8 L 252.2,99.6 L 253.6,99.3 L 255.0,99.1 L 256.4,98.9 L 257.8,98.8 L 259.2,98.6 L 260.6,98.5 L 262.0,98.3 L 263.4,98.2 L 264.8,98.1 L 266.2,98.0 L 267.6,97.9 L 269.0,97.8 L 270.4,97.7 L 271.8,97.7 L 273.2,97.6 L 274.6,97.6 L 276.0,97.5" fill="none" stroke="#15803d" stroke-width="2.5" stroke-linejoin="round"/>
  <text x="370.0" y="14.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">Tanh</text>
  <line x1="308.0" y1="125.0" x2="448.0" y2="125.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#act300)"/>
  <line x1="370.0" y1="187.0" x2="370.0" y2="19.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#act300)"/>
  <text x="440.0" y="141.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic"></text>
  <text x="378.0" y="29.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic"></text>
  <path d="M 314.0,153.0 L 315.4,153.0 L 316.8,153.0 L 318.2,153.0 L 319.6,153.0 L 321.0,152.9 L 322.4,152.9 L 323.8,152.9 L 325.2,152.9 L 326.6,152.9 L 328.0,152.9 L 329.4,152.8 L 330.8,152.8 L 332.2,152.7 L 333.6,152.7 L 335.0,152.6 L 336.4,152.5 L 337.8,152.4 L 339.2,152.3 L 340.6,152.2 L 342.0,152.0 L 343.4,151.8 L 344.8,151.5 L 346.2,151.2 L 347.6,150.8 L 349.0,150.3 L 350.4,149.8 L 351.8,149.1 L 353.2,148.3 L 354.6,147.4 L 356.0,146.3 L 357.4,145.1 L 358.8,143.6 L 360.2,141.9 L 361.6,140.0 L 363.0,137.9 L 364.4,135.6 L 365.8,133.2 L 367.2,130.5 L 368.6,127.8 L 370.0,125.0 L 371.4,122.2 L 372.8,119.5 L 374.2,116.8 L 375.6,114.4 L 377.0,112.1 L 378.4,110.0 L 379.8,108.1 L 381.2,106.4 L 382.6,104.9 L 384.0,103.7 L 385.4,102.6 L 386.8,101.7 L 388.2,100.9 L 389.6,100.2 L 391.0,99.7 L 392.4,99.2 L 393.8,98.8 L 395.2,98.5 L 396.6,98.2 L 398.0,98.0 L 399.4,97.8 L 400.8,97.7 L 402.2,97.6 L 403.6,97.5 L 405.0,97.4 L 406.4,97.3 L 407.8,97.3 L 409.2,97.2 L 410.6,97.2 L 412.0,97.1 L 413.4,97.1 L 414.8,97.1 L 416.2,97.1 L 417.6,97.1 L 419.0,97.1 L 420.4,97.0 L 421.8,97.0 L 423.2,97.0 L 424.6,97.0 L 426.0,97.0" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-linejoin="round"/>
  <text x="520.0" y="14.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">GeLU</text>
  <line x1="458.0" y1="125.0" x2="598.0" y2="125.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#act450)"/>
  <line x1="520.0" y1="187.0" x2="520.0" y2="19.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#act450)"/>
  <text x="590.0" y="141.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic"></text>
  <text x="528.0" y="29.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic"></text>
  <path d="M 464.0,125.0 L 465.4,125.0 L 466.8,125.0 L 468.2,125.0 L 469.6,125.0 L 471.0,125.0 L 472.4,125.0 L 473.8,125.0 L 475.2,125.1 L 476.6,125.1 L 478.0,125.1 L 479.4,125.2 L 480.8,125.2 L 482.2,125.3 L 483.6,125.3 L 485.0,125.4 L 486.4,125.6 L 487.8,125.7 L 489.2,125.9 L 490.6,126.1 L 492.0,126.3 L 493.4,126.5 L 494.8,126.8 L 496.2,127.1 L 497.6,127.5 L 499.0,127.8 L 500.4,128.2 L 501.8,128.5 L 503.2,128.9 L 504.6,129.2 L 506.0,129.4 L 507.4,129.6 L 508.8,129.7 L 510.2,129.7 L 511.6,129.6 L 513.0,129.3 L 514.4,128.9 L 515.8,128.2 L 517.2,127.4 L 518.6,126.3 L 520.0,125.0 L 521.4,123.5 L 522.8,121.8 L 524.2,119.8 L 525.6,117.7 L 527.0,115.3 L 528.4,112.8 L 529.8,110.1 L 531.2,107.3 L 532.6,104.4 L 534.0,101.4 L 535.4,98.4 L 536.8,95.3 L 538.2,92.1 L 539.6,89.0 L 541.0,85.8 L 542.4,82.7 L 543.8,79.5 L 545.2,76.4 L 546.6,73.3 L 548.0,70.3 L 549.4,67.3 L 550.8,64.3 L 552.2,61.3 L 553.6,58.4 L 555.0,55.4 L 556.4,52.5 L 557.8,49.7 L 559.2,46.8 L 560.6,44.0 L 562.0,41.1 L 563.4,38.3 L 564.8,35.5 L 566.2,32.6 L 567.6,29.8 L 569.0,27.0 L 570.4,24.2 L 571.8,21.4 L 573.2,18.6 L 574.6,15.8 L 576.0,13.0" fill="none" stroke="#7c3aed" stroke-width="2.5" stroke-linejoin="round"/>
  <text x="70.0" y="215.0" fill="#475569" font-size="11" text-anchor="middle">max(0, x)</text>
  <text x="220.0" y="215.0" fill="#475569" font-size="11" text-anchor="middle">1/(1 + e⁻ˣ) ∈ (0,1)</text>
  <text x="370.0" y="215.0" fill="#475569" font-size="11" text-anchor="middle">∈ (−1, 1), qua gốc</text>
  <text x="520.0" y="215.0" fill="#475569" font-size="11" text-anchor="middle">x·Φ(x), trơn quanh 0</text>
</svg>

(ReLU: hình "khúc gãy" tại 0. Sigmoid: chữ S, từ 0 đến 1. Tanh: chữ S, từ −1 đến 1. GeLU: gần ReLU nhưng có "khúc cua" mịn ở 0, hơi âm trước khi về 0.)

Tất cả đều là **hàm số** đúng nghĩa bài này — input 1 số, output 1 số, mỗi input cho đúng 1 output. Visualization sẽ vẽ chính xác và cho bạn so sánh trực quan.

### 8.5. Vì sao học hàm số = bước đệm cho ML

- **Mạng neural** = composition của các hàm `affine + activation`.
- **Loss function** (sai số huấn luyện) là một **hàm số** từ tham số ($W$, $b$) ra một số đo "tệ".
- **Training** = tìm cực tiểu của loss function (sẽ học gradient descent).
- **Hàm ngược** xuất hiện trong normalizing flow (mô hình sinh), invertible neural network, ...
- **Domain/range** xuất hiện trong activation phù hợp với loại bài toán (sigmoid cho xác suất, softmax cho nhiều lớp).

Mọi khái niệm ở lesson này — bạn sẽ gặp lại đủ trong ML.

## 9. Bài tập

### Bài 1: Đánh giá và giải

Cho $f(x) = 3x - 2$.

a) Tính $f(0)$, $f(2)$, $f(-1)$, $f(0.5)$.
b) Tìm $x$ để $f(x) = 10$.

### Bài 2: Tìm domain

Tìm domain của:

a) $f(x) = \sqrt{x - 3}$
b) $g(x) = 1 / (x^2 - 4)$
c) $h(x) = \ln(x)$
d) $k(x) = \sqrt{x - 3} / (x - 5)$  *(thêm để luyện)*

### Bài 3: Hàm hợp

Cho $f(x) = x + 1$, $g(x) = 2x$.

a) Tính $(f \circ g)(x)$.
b) Tính $(g \circ f)(x)$.
c) Tính $f(f(x))$.
d) Hai biểu thức ở câu a và b có bằng nhau không? Giải thích.

### Bài 4: Hàm ngược

Tìm hàm ngược của:

a) $f(x) = 5x - 7$
b) $g(x) = (x + 1) / (x - 2)$
c) $h(x) = e^{2x}$

### Bài 5: Code Go

Viết hàm `compose(f, g func(float64) float64) func(float64) float64` trả về hàm hợp $g \circ f$. Test với $f(x) = 2x + 1$, $g(x) = x^2$, in ra $(g \circ f)(3)$.

## 10. Lời giải chi tiết

### Bài 1

$f(x) = 3x - 2$.

a)
- $f(0) = 3 \cdot 0 - 2 = -2$.
- $f(2) = 3 \cdot 2 - 2 = 4$.
- $f(-1) = 3 \cdot (-1) - 2 = -5$.
- $f(0.5) = 3 \cdot 0.5 - 2 = 1.5 - 2 = -0.5$.

b) $f(x) = 10$:

$$\begin{aligned}
3x - 2 &= 10 \\
3x &= 12 \\
x &= 4
\end{aligned}$$

### Bài 2

a) $f(x) = \sqrt{x - 3}$: trong căn phải $\geq 0 \Rightarrow x - 3 \geq 0 \Rightarrow x \geq 3$.
→ **Domain $= [3, +\infty)$**.

b) $g(x) = 1/(x^2 - 4)$: mẫu khác 0 $\Rightarrow x^2 \neq 4 \Rightarrow x \neq \pm 2$.
→ **Domain $= \mathbb{R} \setminus \{-2, 2\}$**.

c) $h(x) = \ln(x)$: log xác định khi đối số $> 0 \Rightarrow x > 0$.
→ **Domain $= (0, +\infty)$**.

d) $k(x) = \sqrt{x - 3} / (x - 5)$: hai điều kiện cùng lúc:
- $x - 3 \geq 0 \Rightarrow x \geq 3$.
- $x - 5 \neq 0 \Rightarrow x \neq 5$.
→ **Domain $= [3, 5) \cup (5, +\infty)$**.

### Bài 3

$f(x) = x + 1$, $g(x) = 2x$.

a) $(f \circ g)(x) = f(g(x)) = f(2x) = 2x + 1$.

b) $(g \circ f)(x) = g(f(x)) = g(x + 1) = 2(x + 1) = 2x + 2$.

c) $f(f(x)) = f(x + 1) = (x + 1) + 1 = x + 2$.

d) Không. $(f \circ g)(x) = 2x + 1$ còn $(g \circ f)(x) = 2x + 2$. Hai biểu thức khác nhau (chênh đúng 1 đơn vị) với mọi x.

Lý do tổng quát: composition không có tính giao hoán. Thứ tự thực hiện hai phép biến đổi quan trọng — "nhân 2 rồi cộng 1" khác với "cộng 1 rồi nhân 2".

### Bài 4

a) $f(x) = 5x - 7$. Đặt $y = 5x - 7 \Rightarrow 5x = y + 7 \Rightarrow x = (y + 7)/5$.
→ **$f^{-1}(x) = (x + 7) / 5$**.

Kiểm tra: $f(3) = 5 \cdot 3 - 7 = 8$. $f^{-1}(8) = (8 + 7)/5 = 3$ ✓.

b) $g(x) = (x + 1)/(x - 2)$. Đặt $y = (x + 1)/(x - 2)$. Nhân chéo:

$$\begin{aligned}
y(x - 2) &= x + 1 \\
yx - 2y &= x + 1 \\
yx - x &= 2y + 1 \\
x(y - 1) &= 2y + 1 \\
x &= \frac{2y + 1}{y - 1}
\end{aligned}$$

→ **$g^{-1}(x) = (2x + 1) / (x - 1)$** (domain $x \neq 1$).

Kiểm tra với $x = 3$: $g(3) = 4/1 = 4$. $g^{-1}(4) = (8 + 1)/(4 - 1) = 9/3 = 3$ ✓.

c) $h(x) = e^{2x}$. Đặt $y = e^{2x}$. Lấy ln hai vế: $\ln(y) = 2x \Rightarrow x = \ln(y)/2$.
→ **$h^{-1}(x) = \ln(x) / 2$** (domain $x > 0$).

Kiểm tra với $x = 0$: $h(0) = e^0 = 1$. $h^{-1}(1) = \ln(1)/2 = 0$ ✓.

### Bài 5

```go
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
```

Xem chi tiết và bản đầy đủ trong [solutions.go](./solutions.go).

## 11. Tài liệu kèm

- Code lời giải Go: [solutions.go](./solutions.go)
- Visualization tương tác: [visualization.html](./visualization.html)
- Bài trước: [Lesson 04 — Lũy thừa, căn, logarit](../lesson-04-powers-roots-logs/)
- Bài tiếp theo: [Lesson 06 — Hàm bậc 1 và bậc 2](../lesson-06-linear-quadratic/)
- Quay lại lộ trình: [Tầng 1 — Algebra](../)
