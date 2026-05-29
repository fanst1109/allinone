# Lesson 02 — Mô hình quan hệ (relational model)

> Nhóm 1 — Nền tảng · Bài thứ hai của lĩnh vực [Databases](../../README.md)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu bộ từ vựng cốt lõi của **mô hình quan hệ (relational model)**: quan hệ (relation), bộ (tuple), thuộc tính (attribute), miền giá trị (domain), bậc (degree), lực lượng (cardinality).
- Phân biệt được **lược đồ quan hệ (relation schema)** — cái khung — với **thể hiện (instance)** — dữ liệu cụ thể tại một thời điểm.
- Hiểu gốc toán học: một quan hệ là một **tập con của tích Descartes (Cartesian product)** các domain — và vì sao điều đó kéo theo "không có hàng trùng", "thứ tự không quan trọng".
- Nắm ba tính chất của quan hệ: không trùng bộ, không thứ tự, giá trị nguyên tử (atomic).
- Hiểu **NULL** nghĩa là gì (và *không* phải là gì), cùng **logic ba trị (three-valued logic)** TRUE / FALSE / UNKNOWN.
- Sơ lược về **khóa (key)**: super key, candidate key, primary key — đủ để định vị, chi tiết để dành cho Lesson 05.

## Kiến thức tiền đề

- [Lesson 01 — Giới thiệu CSDL & DBMS](../lesson-01-gioi-thieu-csdl/): biết DBMS quan hệ là gì, vì sao bảng là mô hình mặc định.
- Khái niệm **tập hợp (set)** và **tích Descartes**: nếu chưa chắc, xem [DataFoundations — Set Theory](../../../DataFoundations/02-SetTheory/index.html). Mô hình quan hệ chính là một ứng dụng trực tiếp của lý thuyết tập hợp.

---

## 1. Đặt vấn đề: "bảng" là gì cho chặt chẽ?

Ở Lesson 01 ta nói DBMS quan hệ lưu dữ liệu thành **bảng có hàng và cột**. Nghe rất đời thường — ai chẳng từng kẻ bảng trong Excel. Nhưng để xây được một hệ thống mà máy tính *suy luận đúng* trên dữ liệu (lọc, ghép, kiểm tra trùng lặp, đảm bảo toàn vẹn), ta cần một định nghĩa **chặt chẽ về mặt toán học** chứ không chỉ "cái bảng nhìn cho đẹp".

Edgar F. Codd (1970) đề xuất: hãy mô tả "bảng" bằng ngôn ngữ **tập hợp**. Khi đó:

- "Không có hai hàng giống hệt nhau" không còn là quy ước tùy hứng, mà là **hệ quả** của việc một bảng là một *tập hợp* (mà tập hợp thì không chứa phần tử trùng).
- "Đảo thứ tự hàng không đổi ý nghĩa bảng" cũng là hệ quả (tập hợp không có thứ tự).

> Câu hỏi của cả bài: *Một "bảng" thực ra là cái gì, và vì sao những quy tắc tưởng như tùy tiện (không trùng, không thứ tự, mỗi ô một giá trị) lại là bắt buộc?* Ta sẽ trả lời đầy đủ ngay trong bài.

💡 **Trực giác.** Hãy hình dung một bảng như một **danh sách thẻ hội viên**: mỗi thẻ (bộ/tuple) ghi cùng những ô thông tin (thuộc tính: tên, tuổi, tỉnh). Hai thẻ giống hệt nhau từng ô là *thừa* — bạn xé một cái đi cũng chẳng mất thông tin. Và bạn xếp chồng thẻ theo thứ tự nào thì "tập thẻ" vẫn là tập đó. Đấy chính là lý do quan hệ = tập hợp.

---

## 2. Bộ từ vựng cốt lõi

Xét bảng `SinhVien` (Students) sau làm ví dụ xuyên suốt:

| MaSV | HoTen   | Tuoi | Tinh |
| ---- | ------- | ---- | ---- |
| SV01 | An      | 19   | HN   |
| SV02 | Binh    | 20   | HCM  |
| SV03 | Chi     | 18   | HN   |
| SV04 | Dung    | 20   | DN   |

### 2.1 Định nghĩa (đủ 3 phần)

**(a) Là gì.**

- **Quan hệ (relation)** = **bảng (table)**. Toàn bộ cấu trúc trên là một quan hệ tên `SinhVien`.
- **Bộ (tuple)** = **hàng (row)**. `(SV02, Binh, 20, HCM)` là một bộ.
- **Thuộc tính (attribute)** = **cột (column)**. `Tuoi` là một thuộc tính. Mỗi thuộc tính có một **tên** và một **miền giá trị**.
- **Miền giá trị (domain)** = tập hợp tất cả các giá trị **hợp lệ** mà một thuộc tính được phép nhận. Ví dụ domain của `Tuoi` có thể là "số nguyên từ 0 đến 150"; domain của `Tinh` là tập mã tỉnh `{HN, HCM, DN, HUE, ...}`.
- **Bậc (degree)** = **số thuộc tính (số cột)**. Bảng `SinhVien` có bậc = 4.
- **Lực lượng (cardinality)** = **số bộ (số hàng)**. Bảng `SinhVien` có lực lượng = 4.

**(b) Vì sao cần tách thuật ngữ "schema" với "instance".** Vì cấu trúc bền lâu, còn dữ liệu thì đổi mỗi giây. Ta cần một tên cho phần "đứng yên" và một tên cho phần "chạy".

- **Lược đồ quan hệ (relation schema)**: phần **tĩnh** — tên quan hệ + danh sách thuộc tính + domain của chúng. Viết gọn: `SinhVien(MaSV, HoTen, Tuoi, Tinh)`. Schema gần như không đổi theo thời gian.
- **Thể hiện (instance / relation instance)**: phần **động** — tập các bộ *thực tế* đang nằm trong quan hệ tại một thời điểm. Thêm/xóa một sinh viên → thể hiện đổi, nhưng schema giữ nguyên.

**(c) Ví dụ trực giác.** Schema giống **mẫu đơn in sẵn các ô trống** (Họ tên: ___, Tuổi: ___). Instance là **chồng đơn đã điền** ở một thời điểm. Sáng có 4 tờ, chiều thêm 1 tờ thành 5 — *mẫu đơn (schema) không đổi*, chỉ chồng giấy (instance) dày lên. Lực lượng (số tờ) là thuộc tính của instance; bậc (số ô trên mẫu) là thuộc tính của schema.

### 2.2 Bốn ví dụ về degree và cardinality

| Quan hệ                              | Thuộc tính                          | Bậc (degree) | Lực lượng (cardinality) |
| ------------------------------------ | ----------------------------------- | :----------: | :---------------------: |
| `SinhVien(MaSV, HoTen, Tuoi, Tinh)` với 4 hàng | 4 cột                               |      4       |            4            |
| `MonHoc(MaMon, Ten)` với 30 môn       | 2 cột                               |      2       |           30            |
| `DangKy(MaSV, MaMon, Diem)` với 1.200 lượt | 3 cột                               |      3       |          1.200          |
| Một quan hệ rỗng `Log(Time, Msg)`     | 2 cột                               |      2       |            0            |

⚠ **Lỗi thường gặp.** Đừng lẫn **bậc** với **lực lượng**. Bậc đếm *cột* (gắn với schema, ít đổi); lực lượng đếm *hàng* (gắn với instance, đổi liên tục). Một bảng rỗng vẫn có bậc > 0 (vẫn có các cột) nhưng lực lượng = 0.

🔁 **Dừng lại tự kiểm tra.**
1. Cho `NhanVien(Ma, Ten, Luong, PhongBan)` đang chứa 250 nhân viên. Bậc và lực lượng là bao nhiêu?
2. Thêm một cột `Email` vào bảng đó. Cái gì thay đổi: schema hay instance?

<details><summary>Đáp án</summary>

1. Bậc = 4 (bốn cột Ma, Ten, Luong, PhongBan); lực lượng = 250 (số hàng hiện có).
2. **Schema** thay đổi (cấu trúc cột thay đổi). Số hàng (instance) không đổi do thêm cột; chỉ giá trị `Email` của mỗi hàng cần điền sau.
</details>

📝 **Tóm tắt mục 2.** Quan hệ = bảng, bộ = hàng, thuộc tính = cột, domain = tập giá trị hợp lệ của cột. Bậc đếm cột (schema), lực lượng đếm hàng (instance). Schema là cái khung tĩnh `Ten(thuộc_tính, ...)`; instance là tập bộ cụ thể tại một thời điểm.

---

## 3. Gốc toán học: quan hệ là tập con của tích Descartes

### 3.1 Tích Descartes là gì

💡 **Trực giác.** Tích Descartes (Cartesian product) của hai tập là "ghép mọi giá trị bên trái với mọi giá trị bên phải". Giống menu combo: 3 loại bánh × 2 loại nước = 6 combo có thể.

**Định nghĩa.** Với hai tập `A` và `B`, tích Descartes `A × B` là tập tất cả các cặp `(a, b)` với `a ∈ A` và `b ∈ B`.

**Walk-through bằng giá trị thật.** Lấy:

- `Tuoi = {18, 19, 20}` (3 phần tử)
- `Tinh = {HN, HCM}` (2 phần tử)

Thì `Tuoi × Tinh` có `3 × 2 = 6` cặp. Liệt kê đầy đủ:

```
(18, HN)   (18, HCM)
(19, HN)   (19, HCM)
(20, HN)   (20, HCM)
```

Tổng quát: nếu `|A| = m` và `|B| = n` thì `|A × B| = m × n`. Ở đây `|Tuoi| = 3`, `|Tinh| = 2` → `|Tuoi × Tinh| = 6` ✓.

### 3.2 Một quan hệ là một tập con của tích đó

Một quan hệ trên hai domain `Tuoi` và `Tinh` là **bất kỳ tập con nào** của 6 cặp trên. "Tập con" nghĩa là bạn chọn ra một số cặp (có thể không cặp nào, một vài, hay tất cả).

**Bốn ví dụ quan hệ cụ thể** (đều là tập con hợp lệ của `Tuoi × Tinh`):

1. `{ (18, HN), (20, HCM) }` — 2 bộ. Hợp lệ.
2. `{ (19, HN), (19, HCM), (20, HN) }` — 3 bộ. Hợp lệ (cùng tuổi 19 nhưng khác tỉnh → vẫn là hai bộ khác nhau).
3. `{ }` — quan hệ rỗng, 0 bộ. Hợp lệ (tập con rỗng vẫn là tập con).
4. Cả 6 cặp — quan hệ "đầy đủ". Hợp lệ.

Số quan hệ khả dĩ trên 2 domain này là số tập con của một tập 6 phần tử = `2^6 = 64`.

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Bảng thật có nhiều hơn 2 cột thì sao?"* — Tổng quát hóa: quan hệ trên `n` domain `D₁, D₂, ..., Dₙ` là tập con của `D₁ × D₂ × ... × Dₙ`. Mỗi phần tử là một bộ `n` giá trị `(v₁, ..., vₙ)`.
- *"Vậy domain có cần hữu hạn không?"* — Không. Domain `Tuoi` thực tế là "số nguyên 0..150", domain `HoTen` là "mọi chuỗi". Tích Descartes vẫn định nghĩa được; chỉ là ta không liệt kê hết được.

### 3.3 Hệ quả: ba tính chất của quan hệ

Vì quan hệ là **tập hợp** các bộ, ta suy ra ngay:

1. **Không có bộ trùng (no duplicate tuples).** Tập hợp không chứa phần tử lặp. Hai hàng giống hệt từng cột là *cùng một phần tử* → chỉ tính một lần. (Lưu ý: bảng trong SQL thực tế có thể cho phép trùng nếu không có khóa — đó là chỗ SQL nới lỏng mô hình lý thuyết, sẽ bàn ở Lesson 03.)
2. **Thứ tự bộ không quan trọng (no ordering of tuples).** `{ (18,HN), (20,HCM) }` và `{ (20,HCM), (18,HN) }` là *cùng một quan hệ*. Bạn không thể nói "hàng đầu tiên" một cách nội tại — muốn có thứ tự phải `ORDER BY` lúc truy vấn.
3. **Giá trị nguyên tử (atomic values).** Mỗi ô chứa **một giá trị đơn**, không phải danh sách hay bảng con. Đây là dạng sơ khởi của **First Normal Form (1NF)**.

**Bốn ví dụ về tính atomic (vi phạm hay không):**

| Ô giá trị         | Atomic? | Vì sao |
| ----------------- | :-----: | ------ |
| `Tuoi = 20`        |   ✓    | Một giá trị đơn |
| `Tinh = HN`        |   ✓    | Một giá trị đơn |
| `SoDienThoai = "0901, 0902"` | ✗ | Hai số nhồi vào một ô — nên tách thành nhiều bộ/bảng |
| `KyNang = [Java, Go, SQL]` | ✗ | Một danh sách trong một ô — vi phạm 1NF |

⚠ **Lỗi thường gặp.** Nhồi nhiều giá trị vào một ô bằng dấu phẩy ("0901, 0902") trông tiện nhưng phá vỡ atomic: bạn không truy vấn được "ai có số 0902" mà không phải tách chuỗi thủ công. Cách đúng: tách ra bảng riêng `DienThoai(MaSV, So)` với mỗi số một bộ.

🔁 **Dừng lại tự kiểm tra.**
1. Cho `Mau = {Do, Xanh}` và `Cuc = {Truoc, Sau}`. Tích `Mau × Cuc` có mấy phần tử? Liệt kê.
2. `{ (Do, Truoc), (Xanh, Sau) }` và `{ (Xanh, Sau), (Do, Truoc) }` có phải hai quan hệ khác nhau không?

<details><summary>Đáp án</summary>

1. `2 × 2 = 4` phần tử: `(Do, Truoc), (Do, Sau), (Xanh, Truoc), (Xanh, Sau)`.
2. **Không** — thứ tự bộ không quan trọng, hai cái là *cùng một quan hệ* (cùng một tập hợp các bộ).
</details>

📝 **Tóm tắt mục 3.** Quan hệ = tập con của tích Descartes các domain. Vì là *tập hợp*, ta được miễn phí ba tính chất: không trùng bộ, không thứ tự, mỗi ô một giá trị nguyên tử (1NF). `|D₁ × ... × Dₙ|` = tích các kích thước domain; số quan hệ khả dĩ = `2` mũ số đó.

---

## 4. NULL và logic ba trị

### 4.1 NULL là gì (và không phải là gì)

**(a) Là gì.** `NULL` là một dấu hiệu đặc biệt nghĩa là **"không có giá trị"** — thường vì *chưa biết (unknown)* hoặc *không áp dụng (not applicable)*. Ví dụ: sinh viên chưa thi → `Diem = NULL` (chưa biết); người độc thân → `TenVoChong = NULL` (không áp dụng).

**(b) Vì sao cần.** Thực tế dữ liệu thường khuyết. Nếu bắt buộc điền, ta phải bịa giá trị giả (`0`, `""`, `-1`) — và rồi nhầm giá trị giả đó là thật. NULL là cách *trung thực* để nói "ô này trống".

**(c) NULL KHÁC những gì.** Đây là chỗ hay nhầm nhất:

| Biểu thức           | Ý nghĩa |
| ------------------- | ------- |
| `Diem = 0`           | Đã thi và **được 0 điểm** (một giá trị thật) |
| `Ten = ''` (chuỗi rỗng) | Có giá trị, là chuỗi dài 0 ký tự |
| `Diem = NULL`        | **Chưa biết** điểm — không phải 0, không phải rỗng |

**Bốn ví dụ phân biệt:**

1. `Tonkho = 0` → biết chắc hết hàng. `Tonkho = NULL` → chưa kiểm kê, *không biết* còn bao nhiêu.
2. `GhiChu = ''` → đã mở ô ghi chú nhưng để trống. `GhiChu = NULL` → chưa từng nhập.
3. `Luong = 0` → người này lương 0 (thực tập không lương). `Luong = NULL` → chưa thỏa thuận lương.
4. `NgaySinh = NULL` → chưa khai. Không thể coi như `1900-01-01`.

### 4.2 Logic ba trị: TRUE / FALSE / UNKNOWN

💡 **Trực giác.** Bình thường một mệnh đề chỉ có Đúng hoặc Sai. Nhưng khi dữ liệu *chưa biết*, câu hỏi "An có lớn hơn 18 tuổi không?" mà tuổi của An là NULL thì câu trả lời trung thực là **"không biết"** — chứ không phải Đúng cũng không phải Sai. Đó là giá trị thứ ba: **UNKNOWN**.

**Quy tắc vàng:** bất kỳ phép so sánh nào *có dính NULL* đều cho kết quả **UNKNOWN**, kể cả `NULL = NULL`.

**Bốn (hơn) ví dụ walk-through:**

| Biểu thức          | Kết quả   | Giải thích |
| ------------------ | --------- | ---------- |
| `NULL = 5`          | UNKNOWN   | Không biết giá trị bên trái → không kết luận được nó có bằng 5 |
| `NULL <> 5`         | UNKNOWN   | Tương tự — không biết thì không phủ định được |
| `NULL = NULL`       | UNKNOWN   | Hai cái "không biết" — không thể khẳng định chúng bằng nhau |
| `NULL IS NULL`      | **TRUE**  | `IS NULL` không phải phép so sánh giá trị, mà là kiểm tra "ô này có trống không" → trả lời được |
| `NULL IS NOT NULL`  | **FALSE** | Ô đúng là trống → "không trống" là Sai |
| `5 = 5`             | TRUE      | Không dính NULL, so sánh thường |

⚠ **Lỗi thường gặp.** Viết `WHERE Diem = NULL` để tìm sinh viên chưa thi → **luôn ra rỗng**, vì `Diem = NULL` cho UNKNOWN, và `WHERE` chỉ giữ những hàng cho TRUE. Phải viết `WHERE Diem IS NULL`. Đây là lỗi kinh điển của người mới học SQL.

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Vậy `NULL AND TRUE` ra gì?"* — UNKNOWN. *"`NULL OR TRUE`?"* — TRUE (vì OR chỉ cần một vế đúng là đủ, dù vế kia chưa biết). Đây là logic ba trị áp cho AND/OR.
- *"Tại sao `NULL = NULL` không TRUE? Hai NULL nhìn giống nhau mà?"* — Vì NULL nghĩa là "chưa biết". Hai giá trị chưa biết có thể bằng hoặc khác — không có cơ sở khẳng định bằng. Còn `IS NULL` hỏi về *trạng thái trống*, không phải so sánh *giá trị*, nên trả lời được.

🔁 **Dừng lại tự kiểm tra.**
1. `WHERE Tuoi > 18` sẽ giữ lại hàng có `Tuoi = NULL` không?
2. Muốn tìm các hàng có `Email` chưa nhập, viết điều kiện thế nào?

<details><summary>Đáp án</summary>

1. **Không.** `NULL > 18` cho UNKNOWN, mà WHERE chỉ giữ hàng cho TRUE → hàng đó bị loại.
2. `WHERE Email IS NULL` (không được dùng `Email = NULL`).
</details>

📝 **Tóm tắt mục 4.** NULL = "không có giá trị" (chưa biết / không áp dụng), khác hẳn `0` và chuỗi rỗng. Mọi so sánh dính NULL cho UNKNOWN, kể cả `NULL = NULL`. Kiểm tra trống phải dùng `IS NULL` / `IS NOT NULL`. Logic ba trị gồm TRUE / FALSE / UNKNOWN; WHERE chỉ giữ hàng cho TRUE.

---

## 5. Khóa (key) — sơ lược

💡 **Trực giác.** Khóa là **cách định danh duy nhất một bộ** — như số CMND định danh một công dân. Nhờ khóa, DBMS biết "hai hàng này có phải cùng một thực thể không" và tìm đúng một bộ mà không nhầm.

Với bảng `SinhVien(MaSV, HoTen, Tuoi, Tinh)`, giả sử `MaSV` là duy nhất, còn `HoTen` có thể trùng:

- **Super key (siêu khóa):** *bất kỳ* tập thuộc tính nào mà giá trị của nó **đủ phân biệt mọi bộ** (không hai bộ nào trùng trên tập đó). Ví dụ: `{MaSV}`, `{MaSV, HoTen}`, `{MaSV, Tuoi, Tinh}` đều là super key — chỉ cần chứa `MaSV` là đủ duy nhất. Super key có thể "thừa" thuộc tính.
- **Candidate key (khóa dự tuyển):** super key **tối thiểu** — bỏ đi bất kỳ thuộc tính nào thì mất tính duy nhất. `{MaSV}` là candidate key; `{MaSV, HoTen}` thì *không* (vì bỏ `HoTen` vẫn duy nhất → không tối thiểu).
- **Primary key (khóa chính):** *một* candidate key được **chọn làm đại diện** chính thức để định danh. Một bảng có thể có nhiều candidate key nhưng chỉ một primary key. Ví dụ chọn `MaSV` làm primary key.

**Bốn ví dụ phân loại** (bảng `CongDan(CMND, MaSoThue, HoTen, NgaySinh)`, giả sử cả `CMND` và `MaSoThue` đều duy nhất):

| Tập thuộc tính         | Loại |
| ---------------------- | ---- |
| `{CMND}`               | candidate key (cũng là super key) |
| `{MaSoThue}`           | candidate key (cũng là super key) |
| `{CMND, HoTen}`        | super key nhưng **không** candidate (thừa `HoTen`) |
| `{HoTen, NgaySinh}`    | **không** phải super key (hai người có thể trùng cả tên lẫn ngày sinh) |

> Chi tiết về khóa, ràng buộc khóa ngoại (foreign key), và cách khai báo trong SQL: [Lesson 05 — Khóa & ràng buộc](../lesson-05-khoa-rang-buoc/).

📝 **Tóm tắt mục 5.** Super key = tập thuộc tính phân biệt được mọi bộ (có thể thừa). Candidate key = super key tối thiểu. Primary key = một candidate key được chọn làm đại diện. Mọi candidate key đều là super key, nhưng không phải super key nào cũng là candidate.

---

## 6. Bài tập

1. **Bậc và lực lượng.** Cho quan hệ `DonHang(MaDon, MaKH, NgayDat, TongTien)` đang chứa 5.420 đơn hàng. (a) Bậc là bao nhiêu? (b) Lực lượng là bao nhiêu? (c) Nếu xóa 20 đơn và thêm cột `TrangThai`, bậc và lực lượng mới là bao nhiêu?

2. **Tích Descartes & quan hệ.** Cho `Size = {S, M, L}` và `Mau = {Den, Trang}`. (a) `Size × Mau` có bao nhiêu phần tử? Liệt kê. (b) Viết một quan hệ (tập con) gồm đúng 3 bộ. (c) Có tất cả bao nhiêu quan hệ khả dĩ trên hai domain này?

3. **Candidate key.** Cho `LopHoc(MaLop, TenLop, MaGV, Phong)`, biết: `MaLop` duy nhất; mỗi `Phong` tại một thời điểm chỉ một lớp dùng nên `Phong` cũng duy nhất; `TenLop` có thể trùng; một giáo viên `MaGV` có thể dạy nhiều lớp. (a) Liệt kê các candidate key. (b) `{MaLop, MaGV}` là loại khóa gì? (c) `{TenLop}` có phải super key không?

4. **Biểu thức có NULL.** Cho `Diem = NULL`. Xác định kết quả (TRUE / FALSE / UNKNOWN) của mỗi biểu thức và giải thích ngắn: (a) `Diem >= 5`; (b) `Diem = NULL`; (c) `Diem IS NULL`; (d) `Diem <> 8`; (e) `Diem IS NOT NULL`. (f) Câu `SELECT * FROM SV WHERE Diem >= 5` có trả về hàng có `Diem = NULL` không?

5. **Vi phạm atomic.** Chỉ ra ô nào vi phạm tính nguyên tử và đề xuất cách sửa: bảng `KhachHang(Ma, Ten, DienThoai, DiaChi)` với một hàng `(KH01, An, "0901-0902-0903", "Hà Nội")`.

---

## 7. Lời giải chi tiết

### Bài 1 — Bậc và lực lượng

- **(a)** Bậc = **4** (bốn cột: MaDon, MaKH, NgayDat, TongTien).
- **(b)** Lực lượng = **5.420** (số hàng hiện có).
- **(c)** Xóa 20 đơn → lực lượng = `5.420 − 20 = 5.400`. Thêm cột `TrangThai` → bậc = `4 + 1 = 5`. Vậy **bậc = 5, lực lượng = 5.400**. (Xóa hàng chỉ ảnh hưởng lực lượng; thêm cột chỉ ảnh hưởng bậc.)

### Bài 2 — Tích Descartes & quan hệ

- **(a)** `|Size| × |Mau| = 3 × 2 = 6` phần tử:
  ```
  (S, Den)  (S, Trang)
  (M, Den)  (M, Trang)
  (L, Den)  (L, Trang)
  ```
- **(b)** Một quan hệ 3 bộ hợp lệ, ví dụ: `{ (S, Den), (M, Trang), (L, Den) }`. (Bất kỳ 3 cặp khác nhau nào trong 6 cặp trên đều được.)
- **(c)** Số tập con của một tập 6 phần tử = `2^6 = 64` quan hệ khả dĩ (kể cả quan hệ rỗng và quan hệ đầy đủ 6 bộ).

### Bài 3 — Candidate key

- **(a)** Candidate key: **`{MaLop}`** và **`{Phong}`** — mỗi cái đều duy nhất và tối thiểu (chỉ một thuộc tính, không bỏ bớt được).
- **(b)** `{MaLop, MaGV}` là **super key** (chứa `MaLop` nên duy nhất) nhưng **không phải candidate key** (thừa `MaGV`: bỏ đi vẫn duy nhất → không tối thiểu).
- **(c)** `{TenLop}` **không** phải super key, vì `TenLop` có thể trùng → không phân biệt được mọi bộ.

### Bài 4 — Biểu thức có NULL

Với `Diem = NULL`:

- **(a)** `Diem >= 5` → **UNKNOWN**. So sánh dính NULL → không kết luận được.
- **(b)** `Diem = NULL` → **UNKNOWN**. So sánh giá trị với NULL luôn UNKNOWN, kể cả với NULL.
- **(c)** `Diem IS NULL` → **TRUE**. `IS NULL` kiểm tra trạng thái trống, ô đúng là trống.
- **(d)** `Diem <> 8` → **UNKNOWN**. Vẫn là so sánh giá trị dính NULL.
- **(e)** `Diem IS NOT NULL` → **FALSE**. Ô trống nên "không trống" là Sai.
- **(f)** **Không** trả về hàng đó. `Diem >= 5` cho UNKNOWN, mà WHERE chỉ giữ hàng có điều kiện = TRUE → hàng `Diem = NULL` bị loại. Muốn lấy hàng chưa có điểm phải dùng `WHERE Diem IS NULL`.

### Bài 5 — Vi phạm atomic

Ô `DienThoai = "0901-0902-0903"` **vi phạm tính nguyên tử**: ba số điện thoại bị nhồi vào một ô. Hệ quả: không truy vấn được "khách nào có số 0902" mà không phải tách chuỗi thủ công; không kiểm tra trùng số được.

**Cách sửa:** tách số điện thoại ra một quan hệ riêng, mỗi số một bộ:

```
KhachHang(Ma, Ten, DiaChi)
  (KH01, An, "Hà Nội")

DienThoai(Ma, So)
  (KH01, 0901)
  (KH01, 0902)
  (KH01, 0903)
```

Giờ mỗi ô chứa một giá trị đơn (atomic ✓), và truy vấn theo từng số trở nên trực tiếp.

---

## 8. Code & Minh họa

- Minh họa tương tác: [visualization.html](./visualization.html) — gồm ba mô-đun: (1) bảng `SinhVien` cho bấm xem degree/cardinality tự cập nhật và highlight một bộ/thuộc tính; (2) mô phỏng tích Descartes hai domain nhỏ rồi chọn tập con để tạo "một quan hệ"; (3) bộ kiểm tra logic ba trị với NULL.
- Mô hình quan hệ là một ứng dụng trực tiếp của lý thuyết tập hợp: [DataFoundations — Set Theory](../../../DataFoundations/02-SetTheory/index.html).

---

## Bài tiếp theo

→ [Lesson 03 — SQL cơ bản](../lesson-03-sql-co-ban/): SQL là ngôn ngữ đứng *trên* mô hình quan hệ này — `SELECT`, `WHERE`, `INSERT` thao tác trực tiếp lên bảng, bộ, thuộc tính, và NULL mà bạn vừa học.
