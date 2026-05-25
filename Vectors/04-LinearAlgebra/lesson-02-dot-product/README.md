# Lesson 02 — Dot product và Cosine similarity

> **Tầng 4 — Linear Algebra · Bài 2/8**
>
> Đây là bài học **quan trọng nhất** của Tầng 4 nếu bạn quan tâm tới AI/ML. **Cosine similarity** là phép toán cốt lõi của embedding search, vector database, RAG, và là thành phần đầu tiên của cơ chế attention trong Transformer. Học xong bài này, bạn hiểu được "máy tính làm thế nào để biết câu A và câu B có nghĩa giống nhau".

---

## Mục tiêu học tập

Sau bài này, bạn sẽ:

1. **Tính được dot product** `u · v` bằng cả định nghĩa đại số (`Σ uᵢvᵢ`) và định nghĩa hình học (`|u|·|v|·cosθ`).
2. **Chứng minh hai định nghĩa bằng nhau** thông qua định lý cosin (đã học Tầng 2).
3. **Tính cosine similarity** giữa hai vector và đọc đúng ý nghĩa: cùng hướng / vuông góc / ngược hướng.
4. **Tính projection** `proj_v(u)` của vector này lên vector khác.
5. **Hiểu Cauchy-Schwarz**: tại sao `|u·v| ≤ |u|·|v|`.
6. **Áp dụng cosine similarity** cho embedding 4D, hình dung được pipeline RAG đầu-cuối.
7. **Nối tới Transformer**: hiểu vì sao attention score = scaled dot product `q·k / √d`.

## Kiến thức tiền đề

- [Lesson 01 — Vector chính thức](../lesson-01-vectors/) (Tầng 4): cộng vector, scalar multiply, norm `|v| = √(Σ vᵢ²)`.
- [Tầng 2 Lesson 05 — Identities + Định lý cosin](../../02-Trigonometry/lesson-05-identities-cosine-law/): chính thức công thức `c² = a² + b² − 2ab·cosC`. Định lý này là cây cầu nối định nghĩa đại số và hình học của dot product.
- [Tầng 2 Lesson 03 — Đường tròn đơn vị](../../02-Trigonometry/lesson-03-unit-circle/): biết `cosθ ∈ [-1, 1]`.

---

## 1. Dot product — Tích vô hướng

### 1.1 Đặt vấn đề

Trong Lesson 01 ta đã có vector, biết cộng và nhân scalar. Nhưng còn một câu hỏi quan trọng chưa trả lời:

> **Hai vector "giống nhau" tới mức nào?**

Ví dụ:
- `u = (3, 0)` và `v = (2, 0)` — rõ ràng cùng hướng (cùng chiều dương trục Ox).
- `u = (3, 0)` và `v = (0, 4)` — vuông góc, "không liên quan".
- `u = (3, 0)` và `v = (-2, 0)` — ngược hướng.

Để **đo độ giống nhau về hướng**, ta cần một phép toán mới: **dot product** (tích vô hướng). Đây là phép toán kết hợp hai vector và cho ra **một số duy nhất** (không phải vector). Con số này mã hoá cả độ lớn lẫn góc giữa hai vector.

> **💡 Trực giác**: Hãy nghĩ dot product như một "máy đo chung hướng". Khi bạn đẩy một chiếc xe (lực `F`) đi được quãng đường `d`, công sinh ra là `F · d · cosθ` — đây chính xác là dot product của vector lực và vector dịch chuyển. Nếu đẩy vuông góc với hướng đi (θ = 90°), công bằng 0 — xe vẫn đi nhưng không phải nhờ lực của bạn. Dot product chính là phép toán đo "bao nhiêu phần của u đi cùng hướng với v".

### 1.2 Định nghĩa đại số

**Cho hai vector `u, v ∈ ℝⁿ`**:

```
u · v = u₁v₁ + u₂v₂ + ... + uₙvₙ = Σᵢ uᵢvᵢ
```

Kết quả là **một số thực** (scalar), KHÔNG phải vector. Vì vậy còn gọi là **tích vô hướng** (scalar product / inner product).

**Ví dụ tính tay**:

1. `u = (3, 4)`, `v = (2, 1)` → `u·v = 3·2 + 4·1 = 6 + 4 = 10`.
2. `u = (1, 0, 0)`, `v = (0, 1, 0)` → `u·v = 1·0 + 0·1 + 0·0 = 0`. (Hai trục Ox, Oy vuông góc → tích bằng 0, sẽ giải thích ngay.)
3. `u = (1, 2, 3)`, `v = (4, 5, 6)` → `u·v = 4 + 10 + 18 = 32`.
4. `u = (2, -1)`, `v = (1, 2)` → `u·v = 2·1 + (-1)·2 = 2 - 2 = 0`. (Vuông góc!)
5. `u = (3, 0)`, `v = (-2, 0)` → `u·v = 3·(-2) + 0·0 = -6`. (Ngược hướng → âm.)
6. `u = (1, 1, 1, 1)`, `v = (1, 1, 1, 1)` → `u·v = 1+1+1+1 = 4 = |u|² `. (Tự dot với chính mình = bình phương độ dài.)

> **❓ Câu hỏi tự nhiên**: Tại sao lại nhân từng cặp tọa độ rồi cộng? Có vẻ tùy tiện?
>
> **Đáp**: Định nghĩa này KHÔNG tùy tiện — nó chính là khai triển của công thức hình học `|u||v|cosθ` (sẽ chứng minh ở mục 1.4). Cách dễ nhớ: dot product là cách rẻ nhất để mã hóa cả độ lớn + góc giữa hai vector mà không phải đo độ dài hay tính `arccos` — chỉ cần nhân-cộng.

### 1.3 Định nghĩa hình học

**Cho hai vector `u, v` có góc `θ` giữa chúng (0 ≤ θ ≤ π)**:

```
u · v = |u| · |v| · cos θ
```

Trong đó:
- `|u|`, `|v|` là độ dài (norm) của u và v.
- `θ` là góc giữa u và v.

**Ý nghĩa từng phần**:
- Nếu θ = 0° (cùng hướng): `cosθ = 1`, dot product = `|u|·|v|` (dương, lớn nhất).
- Nếu θ = 90° (vuông góc): `cosθ = 0`, dot product = `0`.
- Nếu θ = 180° (ngược hướng): `cosθ = -1`, dot product = `-|u|·|v|` (âm, nhỏ nhất).

> **💡 Trực giác hình học**: `|u|cosθ` chính là độ dài "bóng đổ" của u khi chiếu vuông góc xuống đường thẳng chứa v. Nhân với `|v|` → ta được "phần u đi theo hướng v, nhân với độ dài v". Đó là lý do dot product đo "chung hướng".

**Hai ví dụ mở đầu** (vẽ ra giấy để check):

- `u = (3, 0)`, `v = (2, 0)`. Cả hai cùng hướng Ox, θ = 0. `|u| = 3`, `|v| = 2`. `u·v = 3·2·cos0 = 6·1 = 6`. Verify đại số: `3·2 + 0·0 = 6`. ✓
- `u = (3, 0)`, `v = (0, 4)`. Vuông góc, θ = 90°. `|u| = 3`, `|v| = 4`. `u·v = 3·4·cos90° = 0`. Verify đại số: `3·0 + 0·4 = 0`. ✓

### 1.4 Chứng minh: hai định nghĩa bằng nhau

Đây là kết quả quan trọng nhất của bài. Ta cần chứng minh:

```
u₁v₁ + u₂v₂ + ... + uₙvₙ  =  |u|·|v|·cosθ
```

**Trường hợp 2D** (tổng quát tương tự, dùng định lý cosin trong ℝⁿ qua khai triển hình học của 3 điểm bất kỳ).

Cho `u = (u₁, u₂)` và `v = (v₁, v₂)`, cả hai đặt gốc tại O. Gọi:
- Điểm `A = u`, điểm `B = v` (xem u, v như vector vị trí).
- Vector `B − A = v − u` (đi từ A đến B).

Ba điểm O, A, B tạo thành tam giác. Độ dài 3 cạnh:
- `OA = |u|`
- `OB = |v|`
- `AB = |v − u|`

Góc tại đỉnh O chính là `θ` (góc giữa u và v).

**Bước 1 — Áp dụng định lý cosin** (Tầng 2 Lesson 05) cho cạnh AB đối diện góc θ:

```
|v − u|² = |u|² + |v|² − 2|u||v|cosθ
```

**Bước 2 — Khai triển `|v − u|²` bằng đại số** (theo công thức norm):

```
|v − u|² = (v₁ − u₁)² + (v₂ − u₂)²
        = v₁² − 2u₁v₁ + u₁² + v₂² − 2u₂v₂ + u₂²
        = (u₁² + u₂²) + (v₁² + v₂²) − 2(u₁v₁ + u₂v₂)
        = |u|² + |v|² − 2(u₁v₁ + u₂v₂)
```

**Bước 3 — So sánh hai biểu thức của `|v − u|²`**:

```
|u|² + |v|² − 2|u||v|cosθ  =  |u|² + |v|² − 2(u₁v₁ + u₂v₂)
```

Khử `|u|² + |v|²` ở hai vế, chia cả hai vế cho `−2`:

```
|u|·|v|·cosθ = u₁v₁ + u₂v₂
```

Đây chính là **hai định nghĩa của dot product khớp nhau** trong 2D. ∎

**Mở rộng ℝⁿ**: Lập luận hệt như vậy — vẫn có 3 điểm O, A, B với A = u, B = v, định lý cosin vẫn áp dụng được cho **bất kỳ tam giác phẳng nào trong không gian ℝⁿ** (vì 3 điểm luôn nằm trên một mặt phẳng 2D). Khai triển `|v−u|² = Σ(vᵢ−uᵢ)²` ra rồi so sánh.

> **⚠ Lỗi thường gặp**: Có người chỉ nhớ một trong hai công thức rồi dùng nhầm. **Cả hai luôn cho cùng kết quả** — chọn công thức nào tùy bối cảnh:
> - Khi biết tọa độ → dùng đại số (`Σ uᵢvᵢ`).
> - Khi biết độ dài và góc → dùng hình học (`|u||v|cosθ`).
> - Khi muốn TÍNH góc → kết hợp cả hai để giải ra `cosθ`.

### 1.5 Verify cả 2 vế bằng số

Lấy `u = (3, 4)` và `v = (4, 0)`:

- Đại số: `u·v = 3·4 + 4·0 = 12`.
- Hình học: `|u| = √(9+16) = 5`, `|v| = 4`. Góc θ: vì v nằm trên trục Ox và u tạo góc `arctan(4/3) ≈ 53.13°` với Ox, ta có `θ ≈ 53.13°`. `cosθ = 3/5 = 0.6`. → `|u||v|cosθ = 5·4·0.6 = 12`. ✓

Lấy `u = (1, 1, 1)` và `v = (1, 1, 1)`:

- Đại số: `1 + 1 + 1 = 3`.
- Hình học: `|u| = |v| = √3`. Vì u = v, θ = 0, cosθ = 1. → `√3·√3·1 = 3`. ✓

> **🔁 Dừng lại tự kiểm tra**:
>
> *Câu hỏi*: Tính `u · v` với `u = (2, -3, 1)`, `v = (1, 2, 4)` bằng cả hai cách (nếu có thể).
>
> <details><summary>Đáp án</summary>
>
> Đại số: `2·1 + (-3)·2 + 1·4 = 2 - 6 + 4 = 0`.
>
> Hình học: dot product = 0 → `cosθ = 0` → θ = 90°. Hai vector vuông góc trong ℝ³. Ta không cần tính norm và cosθ ngược lại — đại số đã cho đáp án 0 trực tiếp.
> </details>

### 1.6 Cách viết và ký hiệu

Có nhiều ký hiệu tương đương:

| Ký hiệu | Dùng ở đâu |
|---------|------------|
| `u · v` | Phổ thông, sách giáo khoa |
| `⟨u, v⟩` | Toán cao cấp, "inner product" |
| `uᵀv` | Đại số tuyến tính (xem vector cột, u transpose nhân v) |
| `dot(u, v)` | Code (Python/Go/...) |

Trong bài này dùng `u · v` cho thống nhất.

> **📝 Tóm tắt mục 1**:
> - Dot product `u·v` cho ra **một số** (không phải vector).
> - **Đại số**: `Σ uᵢvᵢ` — nhân từng cặp tọa độ rồi cộng.
> - **Hình học**: `|u|·|v|·cosθ` — độ lớn × cosine góc.
> - Hai định nghĩa bằng nhau (chứng minh qua định lý cosin Tầng 2).
> - Dấu của dot product: dương ↔ θ nhọn, 0 ↔ vuông góc, âm ↔ θ tù.

---

## 2. Cosine similarity

### 2.1 Định nghĩa

Từ công thức hình học, **rearrange**:

```
cosθ = (u · v) / (|u| · |v|)
```

Đây chính là **cosine similarity** giữa hai vector:

```
cos_sim(u, v) = (u · v) / (|u| · |v|)
```

Range: `cos_sim ∈ [-1, 1]` (vì cosine của góc bất kỳ luôn nằm trong khoảng này — đã học Tầng 2 Lesson 03).

| Giá trị | Ý nghĩa |
|---------|---------|
| `+1` | Hai vector **cùng hướng** (θ = 0°) |
| `> 0` | Hai vector **lệch hướng góc nhọn** — vẫn "giống" |
| `0` | Hai vector **vuông góc** — "không liên quan" |
| `< 0` | Hai vector **lệch hướng góc tù** — "đối ngược" |
| `-1` | Hai vector **ngược hướng** (θ = 180°) |

> **💡 Trực giác**: Cosine similarity là dot product **đã bỏ ảnh hưởng của độ lớn**. Vector `(3, 0)` và `(300, 0)` đều cùng hướng — cosine sim của chúng là 1, dù dot product là 900 (rất khác `9 = (3,0)·(3,0)`). Đây là lý do cosine sim rất phù hợp cho **so sánh ý nghĩa** trong NLP: hai câu cùng nội dung không nên chỉ vì "có nhiều từ hơn" mà bị khác.

### 2.2 Năm ví dụ walk-through

**Ví dụ 1 — 2D, cùng hướng**:
- `u = (3, 0)`, `v = (5, 0)`.
- `u·v = 3·5 + 0·0 = 15`.
- `|u| = 3`, `|v| = 5`.
- `cos_sim = 15 / (3·5) = 15/15 = 1`. → **Hoàn toàn cùng hướng**.

**Ví dụ 2 — 2D, vuông góc**:
- `u = (1, 0)`, `v = (0, 1)`.
- `u·v = 0`.
- `cos_sim = 0`. → **Vuông góc**.

**Ví dụ 3 — 2D, góc 60°**:
- `u = (1, 0)`, `v = (1, √3)`. (v nằm ở góc 60° vì `tan60° = √3`.)
- `u·v = 1·1 + 0·√3 = 1`.
- `|u| = 1`, `|v| = √(1+3) = 2`.
- `cos_sim = 1 / (1·2) = 0.5`. → Đúng vì `cos60° = 0.5`. ✓

**Ví dụ 4 — 3D**:
- `u = (1, 2, 2)`, `v = (2, 1, 2)`.
- `u·v = 2 + 2 + 4 = 8`.
- `|u| = √(1+4+4) = 3`, `|v| = √(4+1+4) = 3`.
- `cos_sim = 8 / 9 ≈ 0.889`. → Hai vector "khá giống hướng" (góc ≈ 27.27°).

**Ví dụ 5 — 4D, embedding giả lập**:

Giả sử ta có "embedding" cho 3 từ (4 chiều, đã chuẩn hoá):

```
"cat"  = (0.8, 0.6, 0.0, 0.0)
"dog"  = (0.7, 0.7, 0.1, 0.0)
"car"  = (0.0, 0.0, 0.9, 0.4)
```

(Tất nhiên embedding thật là 300D/768D, không có ý nghĩa "trục" như vậy. Đây là toy.)

- **cat vs dog**:
  - `u·v = 0.8·0.7 + 0.6·0.7 + 0 + 0 = 0.56 + 0.42 = 0.98`.
  - `|cat| = √(0.64 + 0.36) = 1.0` (đã normalize). `|dog| = √(0.49 + 0.49 + 0.01) ≈ 0.995`.
  - `cos_sim ≈ 0.98 / (1 · 0.995) ≈ 0.985`. → **Rất giống** (động vật).
- **cat vs car**:
  - `u·v = 0 + 0 + 0 + 0 = 0`.
  - `cos_sim = 0`. → **Không liên quan** (chỉ trùng phụ âm đầu — và embedding không quan tâm chính tả).
- **dog vs car**:
  - `u·v = 0 + 0 + 0.1·0.9 + 0 = 0.09`.
  - `cos_sim ≈ 0.09 / (0.995·0.985) ≈ 0.092`. → **Gần như không liên quan**.

### 2.3 Trường hợp đặc biệt: vector đã normalize

Nếu `|u| = |v| = 1` (vector đơn vị, "unit vector"), thì:

```
cos_sim(u, v) = u · v
```

→ **Dot product trực tiếp = cosine similarity**, không cần chia.

Đây là lý do các thư viện embedding (OpenAI, sentence-transformers) thường **L2-normalize** embedding trước khi lưu vào vector database. Khi đó:
- Tính cosine sim = chỉ cần 1 phép dot product (nhanh hơn 2-3 lần).
- FAISS, Pinecone, Weaviate đều có chế độ "inner product" — chính là cos sim khi vector đã normalize.

> **⚠ Lỗi thường gặp**: Nhầm dot product với cosine similarity khi vector CHƯA normalize. `u·v = 100` nghe có vẻ "rất giống nhau", nhưng nếu `|u| = |v| = 1000`, thực ra `cos_sim = 100 / (1000·1000) = 0.0001` — gần như vuông góc. **Luôn check norm trước khi diễn giải dot product**.

> **❓ Câu hỏi tự nhiên**: Có cách nào nhanh hơn cosine sim không?
>
> **Đáp**:
> 1. **Pre-normalize** → giảm cos sim về dot product (đã nói trên).
> 2. **Quantization** (int8 thay vì float32) → giảm tính toán 4x, chấp nhận sai số nhỏ.
> 3. **Approximate nearest neighbor** (HNSW, IVF): không tính cos sim với toàn bộ corpus, chỉ với một subset. Trade-off recall vs speed. Sẽ học sâu hơn ở **Tầng 6 — AI/ML**.

> **🔁 Dừng lại tự kiểm tra**:
>
> *Câu hỏi*: `u = (3, 4)`, `v = (6, 8)`. Tính `u·v`, `cos_sim(u, v)`. Hai vector có cùng hướng không?
>
> <details><summary>Đáp án</summary>
>
> - `u·v = 18 + 32 = 50`.
> - `|u| = 5`, `|v| = 10`. `cos_sim = 50/50 = 1`.
> - **Có**, hoàn toàn cùng hướng (v = 2u, scalar dương).
> </details>

> **📝 Tóm tắt mục 2**:
> - `cos_sim(u, v) = (u·v) / (|u|·|v|)`, range [-1, 1].
> - Nếu đã normalize: cos sim = dot product.
> - Đây là phép toán cốt lõi của embedding search / RAG / attention.

---

## 3. Tính chất dot product

### 3.1 Bốn tính chất cơ bản

Cho `u, v, w ∈ ℝⁿ` và `c ∈ ℝ`:

| Tính chất | Công thức | Chứng minh nhanh |
|-----------|-----------|------------------|
| Giao hoán | `u·v = v·u` | `Σ uᵢvᵢ = Σ vᵢuᵢ` (nhân số giao hoán) |
| Phân phối | `u·(v + w) = u·v + u·w` | `Σ uᵢ(vᵢ + wᵢ) = Σ uᵢvᵢ + Σ uᵢwᵢ` |
| Scalar | `(cu)·v = c(u·v) = u·(cv)` | `Σ (cuᵢ)vᵢ = c Σ uᵢvᵢ` |
| Tự dot | `u·u = |u|² ≥ 0`, dấu = chỉ khi u = 0 | `Σ uᵢ² ≥ 0` |

**Verify từng tính chất bằng số cụ thể**:

1. **Giao hoán** với `u = (1, 2)`, `v = (3, 4)`: `u·v = 3 + 8 = 11`. `v·u = 3 + 8 = 11`. ✓
2. **Phân phối** với `u = (1, 0)`, `v = (1, 1)`, `w = (2, 3)`:
   - `v + w = (3, 4)`. `u·(v+w) = 3 + 0 = 3`.
   - `u·v = 1`. `u·w = 2`. Tổng = 3. ✓
3. **Scalar** với `c = 5`, `u = (1, 2)`, `v = (3, 4)`:
   - `cu = (5, 10)`. `(cu)·v = 15 + 40 = 55`.
   - `c(u·v) = 5·(3+8) = 5·11 = 55`. ✓
4. **Tự dot** với `u = (3, 4)`: `u·u = 9 + 16 = 25 = 5² = |u|²`. ✓

### 3.2 Hệ quả quan trọng

Từ các tính chất trên ta suy ra:

- **`|u + v|² = |u|² + 2u·v + |v|²`** (khai triển hệt như `(a+b)²` cho số thường).
- **`|u − v|² = |u|² − 2u·v + |v|²`** (đây là dạng định lý cosin viết lại bằng dot product).

Chứng minh hệ quả đầu:
```
|u + v|² = (u + v)·(u + v)
        = u·u + u·v + v·u + v·v   (phân phối, 2 lần)
        = |u|² + 2(u·v) + |v|²    (giao hoán: u·v = v·u)
```

**Verify**: `u = (1, 0)`, `v = (0, 1)`. `u + v = (1, 1)`, `|u+v|² = 2`. Mặt khác `|u|² + 2u·v + |v|² = 1 + 0 + 1 = 2`. ✓

> **💡 Trực giác hệ quả**: Đây chính là **định lý Pythagoras tổng quát**. Nếu u và v vuông góc (`u·v = 0`), ta có `|u + v|² = |u|² + |v|²` — định lý Pythagoras quen thuộc. Dot product cho phép ta mở rộng Pythagoras sang trường hợp bất kỳ.

> **📝 Tóm tắt mục 3**: 4 tính chất + 2 hệ quả khai triển. Phân phối là tính chất quan trọng nhất, sẽ dùng nhiều ở các bài sau.

---

## 4. Vuông góc (Orthogonal)

### 4.1 Định nghĩa

Hai vector `u, v ∈ ℝⁿ` được gọi là **vuông góc** (orthogonal) khi và chỉ khi:

```
u · v = 0
```

Ký hiệu: `u ⊥ v`.

**Tại sao định nghĩa này hợp lý?** Từ `u·v = |u||v|cosθ = 0`, nếu cả `|u| ≠ 0` và `|v| ≠ 0`, thì `cosθ = 0 → θ = 90°`. Đây chính là vuông góc theo nghĩa hình học.

> **⚠ Lưu ý mở rộng**: Định nghĩa này áp dụng cho mọi ℝⁿ, kể cả khi không có hình ảnh trực quan (vd ℝ¹⁰⁰⁰). Trong các không gian cao chiều, "vuông góc" được định nghĩa qua dot product, không phải qua mắt nhìn.

### 4.2 Bốn ví dụ

1. `u = (1, 0)`, `v = (0, 1)`. `u·v = 0`. ⊥. (Trục Ox và Oy.)
2. `u = (3, 4)`, `v = (-4, 3)`. `u·v = -12 + 12 = 0`. ⊥. (Xoay 90° trong 2D thì luôn cho 1 vector vuông góc — Tầng 2 Lesson 06.)
3. `u = (1, 2, 3)`, `v = (3, 0, -1)`. `u·v = 3 + 0 - 3 = 0`. ⊥.
4. `u = (1, 1, 1, 1)`, `v = (1, -1, 1, -1)`. `u·v = 1 - 1 + 1 - 1 = 0`. ⊥. (4D — không thể hình dung, nhưng đại số bảo vậy.)

### 4.3 Orthonormal — vuông góc và đơn vị

Một tập vector `{e₁, e₂, ..., eₖ}` gọi là **orthonormal** nếu:
- `eᵢ·eⱼ = 0` khi `i ≠ j` (đôi một vuông góc).
- `eᵢ·eᵢ = 1` (mỗi vector có độ dài 1).

Tập **chuẩn nhất** trong ℝⁿ là **basis chuẩn**:

```
e₁ = (1, 0, 0, ..., 0)
e₂ = (0, 1, 0, ..., 0)
...
eₙ = (0, 0, ..., 0, 1)
```

Đây là khái niệm trung tâm của **Lesson 04** (basis) và **Lesson 07** (eigenvector + diagonalization).

> **🔁 Dừng lại tự kiểm tra**:
>
> Tìm một vector `w ∈ ℝ³` vuông góc với cả `u = (1, 0, 0)` và `v = (0, 1, 0)`.
>
> <details><summary>Đáp án</summary>
>
> `w = (0, 0, c)` với `c ≠ 0` bất kỳ. Vd `(0, 0, 1)` hoặc `(0, 0, -7)`. Đây chính là phép **cross product** trong ℝ³, sẽ thấy ở các bài sau.
> </details>

> **📝 Tóm tắt mục 4**: `u ⊥ v ⇔ u·v = 0`. Orthonormal = orthogonal + chuẩn hóa. Basis chuẩn là ví dụ orthonormal đẹp nhất.

---

## 5. Projection — Hình chiếu vector

### 5.1 Đặt vấn đề

Cho vector `u`. Ta muốn tách u thành 2 phần:
- Phần **đi cùng hướng** v (gọi là `u_∥`).
- Phần **vuông góc** với v (gọi là `u_⊥`).

Sao cho `u = u_∥ + u_⊥`. Phần `u_∥` chính là **projection của u lên v**, ký hiệu `proj_v(u)`.

> **💡 Trực giác**: Hãy tưởng tượng v là một thanh sắt nằm ngang. Bạn chiếu đèn pin vuông góc xuống vector u. **Bóng** của u trên thanh sắt = `proj_v(u)`. Bóng này có cùng hướng v (hoặc ngược hướng nếu góc tù).

### 5.2 Công thức

```
proj_v(u) = ((u · v) / (v · v)) · v
         = ((u · v) / |v|²) · v
```

**Suy luận công thức**:
- `proj_v(u)` phải cùng hướng v → `proj_v(u) = α·v` với scalar α nào đó.
- Phần dư `u − α·v` phải vuông góc với v → `(u − α·v) · v = 0`.
- Khai triển: `u·v − α(v·v) = 0` → `α = (u·v) / (v·v)`.
- Suy ra `proj_v(u) = ((u·v) / (v·v)) · v`. ∎

### 5.3 Ba ví dụ walk-through

**Ví dụ 1 — 2D, đơn giản**:
- `u = (3, 4)`, `v = (1, 0)`.
- `u·v = 3·1 + 4·0 = 3`. `v·v = 1`. `α = 3/1 = 3`.
- `proj_v(u) = 3·(1, 0) = (3, 0)`.
- **Diễn giải**: u chiếu xuống trục Ox → bóng có tọa độ (3, 0). Phần dư `u − (3, 0) = (0, 4)` vuông góc với v. ✓

**Ví dụ 2 — 2D, v không đơn vị**:
- `u = (2, 3)`, `v = (4, 0)`.
- `u·v = 8`. `v·v = 16`. `α = 8/16 = 0.5`.
- `proj_v(u) = 0.5·(4, 0) = (2, 0)`.
- Verify: `u − (2, 0) = (0, 3)`. `(0, 3)·(4, 0) = 0`. ✓

**Ví dụ 3 — 3D**:
- `u = (1, 2, 2)`, `v = (0, 0, 3)`.
- `u·v = 0 + 0 + 6 = 6`. `v·v = 9`. `α = 6/9 = 2/3`.
- `proj_v(u) = (2/3)·(0, 0, 3) = (0, 0, 2)`.
- Verify: `u − (0, 0, 2) = (1, 2, 0)`. `(1, 2, 0)·(0, 0, 3) = 0`. ✓

### 5.4 Độ dài projection

Từ công thức:

```
|proj_v(u)| = |u·v| / |v|  =  |u| · |cosθ|
```

Đây chính là **"bóng đổ"** của u trên v — đúng như trực giác.

> **⚠ Lỗi thường gặp**: Nhầm `proj_v(u)` với `proj_u(v)`. Hai phép chiếu KHÁC nhau:
> - `proj_v(u)` = u chiếu **xuống** v (kết quả nằm trên đường thẳng v).
> - `proj_u(v)` = v chiếu xuống u (kết quả nằm trên đường thẳng u).
> Nhớ: subscript là vector ĐÍCH (đường thẳng để chiếu xuống).

> **📝 Tóm tắt mục 5**:
> - `proj_v(u) = ((u·v)/|v|²)·v` — vector cùng hướng v.
> - Phần dư `u − proj_v(u)` vuông góc với v (phân tích trực giao).
> - Là nền của Gram-Schmidt (Lesson 04), least squares (Lesson 05).

---

## 6. Cauchy-Schwarz inequality

### 6.1 Phát biểu

**Với mọi `u, v ∈ ℝⁿ`**:

```
|u · v| ≤ |u| · |v|
```

Dấu `=` xảy ra ⇔ u, v cùng phương (tức là `v = cu` với scalar c nào đó).

### 6.2 Chứng minh

**Cách 1 — Suy luận từ hình học** (ngắn nhưng cần biết `|u||v|cosθ`):
- `u·v = |u||v|cosθ`.
- `|cosθ| ≤ 1` với mọi góc θ.
- Vậy `|u·v| = |u||v||cosθ| ≤ |u||v|`. ∎

**Cách 2 — Đại số thuần** (không cần khái niệm góc — quan trọng vì ở ℝⁿ với n lớn "góc" chỉ có nghĩa qua định nghĩa này):

Xét hàm `f(t) = |u − t·v|² ≥ 0` với mọi `t ∈ ℝ`.

Khai triển (dùng hệ quả mục 3.2):
```
f(t) = |u|² − 2t(u·v) + t²|v|²
```

Đây là **tam thức bậc 2 theo t**. Vì `f(t) ≥ 0` với mọi t, **discriminant ≤ 0**:

```
Δ = (2(u·v))² − 4|v|²|u|² ≤ 0
4(u·v)² ≤ 4|u|²|v|²
(u·v)² ≤ |u|²·|v|²
|u·v| ≤ |u|·|v|         (lấy căn 2 vế, cả 2 vế đều ≥ 0)
```
∎

### 6.3 Verify bằng số

- `u = (3, 4)`, `v = (1, 0)`. `u·v = 3`, `|u·v| = 3`. `|u|·|v| = 5·1 = 5`. `3 ≤ 5`. ✓
- `u = (1, 2)`, `v = (2, 4)` (cùng phương, v = 2u). `u·v = 10`, `|u·v| = 10`. `|u| = √5`, `|v| = √20 = 2√5`. `|u||v| = √5 · 2√5 = 10`. **Dấu =**. ✓
- `u = (1, 0)`, `v = (0, 1)`. `u·v = 0`. `|u||v| = 1`. `0 ≤ 1`. ✓

### 6.4 Ý nghĩa

Cauchy-Schwarz là **bất đẳng thức nền** của giải tích và xác suất:

- **Đảm bảo cosine similarity nằm trong `[-1, 1]`** — vì `cos_sim = (u·v)/(|u||v|)` và `|u·v| ≤ |u||v|`.
- **Trong xác suất**: `|Cov(X, Y)| ≤ σ_X · σ_Y` (sẽ thấy Tầng 5 Probability) → định nghĩa **hệ số tương quan Pearson** `r ∈ [-1, 1]`.
- **Trong giải tích**: cần thiết để chứng minh **bất đẳng thức tam giác** `|u + v| ≤ |u| + |v|` (Lesson 03).

> **📝 Tóm tắt mục 6**: `|u·v| ≤ |u||v|`. Là điều kiện cho cosine sim hợp lệ, và xuất hiện ở mọi tầng tiếp theo.

---

## 7. Cosine similarity trong embedding / RAG (PHẦN TRỌNG TÂM)

Đây là phần **ứng dụng nóng nhất** của cosine similarity hiện nay. Đây cũng là lý do bài này quan trọng nhất Tầng 4.

### 7.1 Embedding là gì?

**Định nghĩa nông**: Embedding là **một vector trong ℝᵈ** (thường d = 300, 768, 1536, 3072) đại diện cho một từ / câu / đoạn / hình ảnh / video.

**Đặc tính kỳ diệu**: Hai thứ có ý nghĩa giống nhau → hai vector embedding của chúng **cùng hướng** trong ℝᵈ.

Ví dụ (giả định embedding 4D — thực tế là 300D+):

```
"con mèo"   → (0.81, 0.59, 0.02, 0.03)
"con chó"   → (0.78, 0.62, 0.08, 0.05)
"chiếc xe"  → (0.05, 0.07, 0.88, 0.41)
"ô tô"     → (0.04, 0.09, 0.85, 0.46)
"Paris"     → (0.20, 0.10, 0.30, 0.75)
"thủ đô"   → (0.18, 0.12, 0.33, 0.71)
```

Tính cosine similarity pairwise sẽ thấy:
- "con mèo" vs "con chó": ≈ 0.998 (động vật)
- "chiếc xe" vs "ô tô": ≈ 0.999 (đồng nghĩa)
- "Paris" vs "thủ đô": ≈ 0.998 (liên quan ngữ nghĩa)
- "con mèo" vs "chiếc xe": ≈ 0.10 (không liên quan)
- "con chó" vs "Paris": ≈ 0.30 (yếu)

Cụ thể "con mèo" vs "con chó":
- `u·v = 0.81·0.78 + 0.59·0.62 + 0.02·0.08 + 0.03·0.05 = 0.6318 + 0.3658 + 0.0016 + 0.0015 ≈ 1.0007`
- `|u| ≈ √(0.656 + 0.348 + 0.0004 + 0.0009) ≈ √1.005 ≈ 1.0025`
- `|v| ≈ √(0.608 + 0.384 + 0.0064 + 0.0025) ≈ √1.001 ≈ 1.0005`
- `cos_sim ≈ 1.0007 / (1.0025 · 1.0005) ≈ 0.998`. ✓

> **⚠ Đây là toy — không phải embedding thật**: Embedding thật từ OpenAI/SBERT có 768D+, từng tọa độ không tương ứng với "trục" có nghĩa. Mô hình học cách phân phối thông tin qua nhiều trục cùng lúc — không thể đọc trực tiếp từng tọa độ. Ở đây chúng ta dùng 4D để có thể tính tay.

### 7.2 Hai loại embedding chính

| Loại | Kích thước | Ví dụ mô hình | Dùng làm gì |
|------|------------|---------------|-------------|
| **Word embedding** | 50-300D | Word2Vec, GloVe, fastText | Đại diện 1 từ duy nhất |
| **Sentence/Doc embedding** | 384-3072D | Sentence-BERT, OpenAI `text-embedding-3-*`, Cohere | Đại diện cả câu/đoạn |

Word embedding xuất hiện trước (2013, Word2Vec). Sentence embedding là tiến hóa — nó "đọc cả câu" và xuất ra 1 vector tóm tắt nghĩa.

### 7.3 Vector database

**Vấn đề thực tế**: Bạn có 1 triệu document. Mỗi document → 1 vector 1536D. Cần trả lời câu hỏi: *"document nào gần nhất với query này?"*

**Naive**: tính cos sim của query với toàn bộ 1 triệu document → O(N·d) phép tính. Với N = 10⁶, d = 1536, mỗi query → 1.5 tỷ phép nhân-cộng. Quá chậm.

**Vector database** (Pinecone, Weaviate, Qdrant, Milvus, FAISS, pgvector...) làm 3 việc:

1. **Lưu trữ** vector kèm metadata (text gốc, ID, ngày, ...).
2. **Index** bằng cấu trúc dữ liệu đặc biệt (HNSW graph, IVF, ...) để tìm top-K nhanh.
3. **Truy vấn**: cho vector query → trả về top-K nearest neighbor theo cosine similarity (hoặc inner product / L2).

Với HNSW, truy vấn 1M document chỉ mất **~5ms** (so với ~5s nếu naive) — chấp nhận sai số recall < 1%.

### 7.4 RAG — Retrieval Augmented Generation

Đây là kiến trúc **phổ biến nhất** trong các ứng dụng LLM hiện nay (ChatGPT cho doanh nghiệp, Cursor, Notion AI, ...). Pipeline:

```
┌─────────────────────────────────────────────────────────────┐
│ INDEXING (offline, chạy 1 lần khi build dataset)          │
│                                                             │
│  documents → chunking → embedding → vector DB              │
│  ("Tài liệu sản phẩm A...") → ["Tài liệu...", "sản phẩm…"] │
│                              → [(0.1, 0.3, ...), ...]      │
│                              → lưu vào Qdrant / Pinecone   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ QUERY (online, mỗi khi user hỏi)                          │
│                                                             │
│  ❶ user_query: "Sản phẩm A có cài đặt ngoài trời được không?" │
│  ❷ query_embedding = embed(query)  → vector 1536D          │
│  ❸ retrieve = vector_db.top_k(query_embedding, k=5)        │
│      → 5 chunk text liên quan nhất (theo cos sim)          │
│  ❹ prompt = "Dựa vào tài liệu sau, trả lời:\n" + chunks    │
│      + "\nCâu hỏi: " + user_query                          │
│  ❺ answer = LLM(prompt)  ← GPT/Claude/Llama đọc context    │
│      đã được retrieve và trả lời                           │
└─────────────────────────────────────────────────────────────┘
```

**Cốt lõi của bước ❸** chính là **cosine similarity** — đó là toàn bộ lý do bài học này quan trọng.

> **❓ Câu hỏi tự nhiên**: Tại sao cần RAG mà không cho LLM xem toàn bộ tài liệu?
>
> **Đáp**: Context window của LLM giới hạn (4K → 200K token). Doanh nghiệp có hàng GB tài liệu, không thể nhồi hết. RAG = "chỉ đưa cho LLM 5-20 chunk LIÊN QUAN NHẤT" — tiết kiệm token, giảm chi phí, và (quan trọng nhất) **trả lời chính xác hơn** vì LLM tập trung vào ít context có chất lượng cao.

### 7.5 Tại sao cosine sim chứ không phải Euclidean distance?

Đây là câu hỏi rất quan trọng. So sánh:

| Tiêu chí | Cosine similarity | Euclidean distance |
|----------|-------------------|--------------------|
| Công thức | `(u·v) / (|u||v|)` | `√Σ(uᵢ−vᵢ)²` |
| Quan tâm | **Hướng** | **Vị trí tuyệt đối** |
| Range | [-1, 1] | [0, ∞) |
| Ảnh hưởng độ lớn | Không | Có |

**Vì sao embedding nên dùng cosine?**

1. **Embedding mã hóa nghĩa qua HƯỚNG, không phải độ lớn**. Hai vector cùng hướng = cùng nghĩa, độ lớn chỉ phản ánh "confidence" hoặc artifact của mô hình.

2. **Câu dài và câu ngắn cùng ý** — embedding có thể có độ lớn khác nhau (vì tổng hợp nhiều token), nhưng "hướng" thì gần. Euclidean sẽ đánh giá hai câu này khác xa nhau (sai), cosine sẽ đánh giá gần (đúng).

3. **Trong không gian cao chiều**, Euclidean distance bị **curse of dimensionality** — mọi cặp điểm có khoảng cách gần như nhau. Cosine ít bị ảnh hưởng hơn vì chỉ quan tâm góc.

**Ví dụ cụ thể minh họa**:

- Câu A (ngắn): `(0.1, 0.2)` (norm ≈ 0.224)
- Câu B (dài, cùng nghĩa): `(0.5, 1.0)` (norm ≈ 1.118)

Quan sát: A và B **cùng hướng** (B = 5·A).

- **Euclidean**: `√((0.5−0.1)² + (1.0−0.2)²) = √(0.16 + 0.64) = √0.8 ≈ 0.894`. → "Khác nhau", sai.
- **Cosine**: `u·v = 0.05 + 0.2 = 0.25`. `cos_sim = 0.25/(0.224·1.118) = 0.25/0.25 = 1.0`. → "Hoàn toàn giống nghĩa", đúng.

> **⚠ Ngoại lệ**: Nếu embedding đã được **L2-normalize** (toàn bộ có `|v| = 1`), thì cosine sim và Euclidean distance **tương đương** thông qua công thức:
> ```
> |u − v|² = |u|² + |v|² − 2u·v = 2 − 2·cos_sim(u, v)
> ```
> Nên rank theo cos sim giảm dần = rank theo Euclidean tăng dần. **Đây là lý do hầu hết embedding API auto-normalize đầu ra** — để vector DB có thể dùng inner product hoặc Euclidean tùy chọn.

### 7.6 Ví dụ pipeline RAG bằng tay

Giả sử corpus 4 chunk, đã embed sang 4D, đã normalize:

```
chunk_1: "Sản phẩm A chống nước IP68" → (0.6, 0.7, 0.3, 0.2)
chunk_2: "Sản phẩm A bảo hành 2 năm"  → (0.5, 0.4, 0.7, 0.3)
chunk_3: "Cách lắp đặt ngoài trời"     → (0.7, 0.6, 0.2, 0.3)
chunk_4: "Sản phẩm B màu xanh"          → (0.1, 0.2, 0.3, 0.9)
```

Query: "Sản phẩm A có cài đặt ngoài trời được không?" → embed → `(0.65, 0.65, 0.3, 0.2)`. (`|q| ≈ √(0.4225+0.4225+0.09+0.04) ≈ √0.975 ≈ 0.987`.)

Tính cos sim với từng chunk (đã làm tròn):

- **q · c1** = 0.65·0.6 + 0.65·0.7 + 0.3·0.3 + 0.2·0.2 = 0.39 + 0.455 + 0.09 + 0.04 = 0.975.
  `|c1| = √(0.36+0.49+0.09+0.04) = √0.98 ≈ 0.99`.
  `cos_sim ≈ 0.975 / (0.987·0.99) ≈ 0.998`.
- **q · c2** = 0.65·0.5 + 0.65·0.4 + 0.3·0.7 + 0.2·0.3 = 0.325 + 0.26 + 0.21 + 0.06 = 0.855.
  `|c2| = √(0.25+0.16+0.49+0.09) = √0.99 ≈ 0.995`.
  `cos_sim ≈ 0.855 / (0.987·0.995) ≈ 0.871`.
- **q · c3** = 0.65·0.7 + 0.65·0.6 + 0.3·0.2 + 0.2·0.3 = 0.455 + 0.39 + 0.06 + 0.06 = 0.965.
  `|c3| = √(0.49+0.36+0.04+0.09) = √0.98 ≈ 0.99`.
  `cos_sim ≈ 0.965 / (0.987·0.99) ≈ 0.987`.
- **q · c4** = 0.65·0.1 + 0.65·0.2 + 0.3·0.3 + 0.2·0.9 = 0.065 + 0.13 + 0.09 + 0.18 = 0.465.
  `|c4| = √(0.01+0.04+0.09+0.81) = √0.95 ≈ 0.975`.
  `cos_sim ≈ 0.465 / (0.987·0.975) ≈ 0.483`.

**Top-2 retrieved**: chunk_1 (0.998), chunk_3 (0.987).

Prompt cuối cùng cho LLM:
```
Dựa vào các thông tin sau:
- Sản phẩm A chống nước IP68
- Cách lắp đặt ngoài trời
Trả lời câu hỏi: Sản phẩm A có cài đặt ngoài trời được không?
```

LLM trả lời: "Có. Sản phẩm A chống nước theo chuẩn IP68 và tài liệu có hướng dẫn lắp đặt ngoài trời." ← **Câu trả lời này đến từ cosine similarity**.

> **📝 Tóm tắt mục 7**:
> - Embedding = vector đại diện nghĩa của text/image/...
> - Cosine sim đo "giống nghĩa" qua "cùng hướng".
> - Vector DB + ANN index → tìm top-K nhanh.
> - RAG = embed query → retrieve top-K → đưa cho LLM → trả lời.
> - Cosine ưu việt hơn Euclidean vì embedding mã hóa nghĩa qua HƯỚNG.

---

## 8. Liên hệ Transformer — Attention là scaled dot product

Đây là teaser ngắn cho Tầng 6 — AI/ML.

### 8.1 Công thức attention

Trong Transformer (mô hình nền của GPT, Claude, BERT...), cơ chế **Scaled Dot-Product Attention** (Vaswani et al. 2017) là:

```
Attention(Q, K, V) = softmax(Q·Kᵀ / √d) · V
```

Trong đó:
- `Q` (query): vector "câu hỏi" tại vị trí hiện tại (kích thước d).
- `K` (key): các vector "khóa" của những vị trí khác (mỗi vector kích thước d).
- `V` (value): các vector "nội dung" tương ứng.
- `d`: số chiều của Q, K (thường 64 hoặc 128 cho mỗi head).

**Cốt lõi**: `Q·K` chính là **dot product** giữa query và mỗi key. Score cao = "key này liên quan tới query này" → "chú ý nhiều".

### 8.2 Vì sao chia cho `√d`?

Khi d lớn (thường 64+), dot product của hai vector ngẫu nhiên có **variance tỉ lệ với d**. Giá trị dot product trở nên rất lớn → softmax bão hòa (gradient gần 0) → mô hình khó học. Chia cho `√d` để bình thường hóa scale về O(1).

**Verify**: Nếu mỗi tọa độ của Q và K iid với mean 0, var 1, thì `Var(Q·K) = Σ Var(Qᵢ·Kᵢ) = d` (vì giả định độc lập). Chia cho `√d` → variance về 1.

### 8.3 Liên hệ với cosine similarity

Khi Q, K đã được L2-normalize, `Q·K = cos_sim(Q, K)`. Attention thực chất là "**cosine similarity giữa query và các key, sau đó dùng làm trọng số để trộn value**".

Đây là lý do hiểu dot product = bước đầu tiên hiểu Transformer. Tầng 6 sẽ học chi tiết.

> **📝 Tóm tắt mục 8**: Attention = softmax(scaled dot product). Hiểu dot product → hiểu attention.

---

## 9. Bài tập

> Tự làm trước khi xem lời giải. Mỗi bài có lời giải chi tiết ở mục 10.

### Bài 1 — Tính dot product

Tính `u · v` cho các cặp sau:
1. `u = (5, -1, 2)`, `v = (3, 4, -2)`
2. `u = (1, 1, 1, 1)`, `v = (1, 2, 3, 4)`
3. `u = (-2, 3)`, `v = (6, 4)`

### Bài 2 — Cosine similarity

Tính `cos_sim(u, v)` cho:
1. `u = (1, 2, 2)`, `v = (3, 4, 0)`.
2. `u = (1, 1)`, `v = (-1, 1)`.

### Bài 3 — Vuông góc

Tìm tất cả vector `(a, b)` vuông góc với `(3, 4)` (chỉ ra mối quan hệ giữa a và b, đưa 2 ví dụ).

### Bài 4 — Projection

Tính `proj_v(u)` với `u = (4, 5, 1)`, `v = (2, 0, -1)`. Verify rằng `u − proj_v(u)` vuông góc với v.

### Bài 5 — Cosine sim embedding 4D

Cho 3 embedding (đã normalize):
- `apple = (0.7, 0.5, 0.5, 0.1)`
- `banana = (0.6, 0.6, 0.5, 0.1)`
- `cat = (0.1, 0.2, 0.3, 0.92)`

Tính cos sim của (apple, banana), (apple, cat), (banana, cat). Sắp xếp theo độ giống nhau.

### Bài 6 — Suy ra góc từ cos sim

Cho `u = (3, 4)`, `v = (0, 5)`. Tính `cos_sim(u, v)` rồi suy ra góc θ giữa chúng (làm tròn 1 chữ số thập phân).

---

## 10. Lời giải chi tiết

### Lời giải bài 1

1. `u·v = 5·3 + (-1)·4 + 2·(-2) = 15 - 4 - 4 = 7`.
2. `u·v = 1 + 2 + 3 + 4 = 10`.
3. `u·v = (-2)·6 + 3·4 = -12 + 12 = 0`. (Vuông góc.)

### Lời giải bài 2

**Phần 1**:
- `u·v = 1·3 + 2·4 + 2·0 = 3 + 8 = 11`.
- `|u| = √(1+4+4) = 3`. `|v| = √(9+16+0) = 5`.
- `cos_sim = 11/(3·5) = 11/15 ≈ 0.733`. → Khá giống hướng (góc ≈ 42.83°).

**Phần 2**:
- `u·v = -1 + 1 = 0`. → Vuông góc.
- `cos_sim = 0`. (Không cần tính norm vì tử số đã 0.)

### Lời giải bài 3

Điều kiện vuông góc: `(a, b)·(3, 4) = 0 → 3a + 4b = 0 → a = -4b/3`.

Vậy mọi vector dạng `(-4t, 3t)` với t ∈ ℝ đều vuông góc với (3, 4).

Ví dụ: t = 1 → (-4, 3); t = -1 → (4, -3); t = 3 → (-12, 9).

Kiểm tra t=1: `(-4)·3 + 3·4 = -12 + 12 = 0`. ✓

### Lời giải bài 4

- `u·v = 4·2 + 5·0 + 1·(-1) = 8 - 1 = 7`.
- `v·v = 4 + 0 + 1 = 5`.
- `α = 7/5 = 1.4`.
- `proj_v(u) = 1.4·(2, 0, -1) = (2.8, 0, -1.4)`.

Verify vuông góc:
- `u − proj_v(u) = (4-2.8, 5-0, 1-(-1.4)) = (1.2, 5, 2.4)`.
- `(1.2, 5, 2.4)·(2, 0, -1) = 2.4 + 0 - 2.4 = 0`. ✓

### Lời giải bài 5

**apple vs banana**:
- `u·v = 0.7·0.6 + 0.5·0.6 + 0.5·0.5 + 0.1·0.1 = 0.42 + 0.30 + 0.25 + 0.01 = 0.98`.
- `|apple| = √(0.49+0.25+0.25+0.01) = √1.00 = 1.0`. `|banana| = √(0.36+0.36+0.25+0.01) = √0.98 ≈ 0.99`.
- `cos_sim ≈ 0.98 / (1.0·0.99) ≈ 0.990`. → **Rất giống** (cả 2 đều là trái cây).

**apple vs cat**:
- `u·v = 0.7·0.1 + 0.5·0.2 + 0.5·0.3 + 0.1·0.92 = 0.07 + 0.10 + 0.15 + 0.092 = 0.412`.
- `|cat| = √(0.01+0.04+0.09+0.8464) = √0.9864 ≈ 0.993`.
- `cos_sim ≈ 0.412 / (1.0·0.993) ≈ 0.415`. → Yếu (không cùng category).

**banana vs cat**:
- `u·v = 0.6·0.1 + 0.6·0.2 + 0.5·0.3 + 0.1·0.92 = 0.06 + 0.12 + 0.15 + 0.092 = 0.422`.
- `cos_sim ≈ 0.422 / (0.99·0.993) ≈ 0.429`. → Yếu.

**Xếp hạng theo cos sim giảm dần**:
1. apple-banana (0.990) — cùng category trái cây.
2. banana-cat (0.429).
3. apple-cat (0.415).

(Banana và cat sit hơi gần nhau so với apple-cat — toy data, không có ý nghĩa thực.)

### Lời giải bài 6

- `u·v = 3·0 + 4·5 = 20`.
- `|u| = 5`, `|v| = 5`. `cos_sim = 20/25 = 0.8`.
- `θ = arccos(0.8) ≈ 36.87°` (làm tròn 36.9°).

Kiểm tra ngược: u nằm ở góc `arctan(4/3) ≈ 53.13°` so với Ox. v nằm ở 90°. Hiệu = `90° − 53.13° = 36.87°`. ✓

---

## 11. Liên kết và bài tiếp theo

**Bài tiếp**: [Lesson 03 — Norm và khoảng cách](../lesson-03-norm-distance/) — chính thức hoá `|v|`, các loại norm (L1, L2, L∞), khoảng cách giữa hai vector, và **chuẩn hóa** (normalize) để chuẩn bị cho cosine sim hiệu quả.

**Sẽ gặp lại** ở các tầng sau:
- **Tầng 4 Lesson 04** — Linear independence: dùng dot product để chứng minh orthogonal basis độc lập tuyến tính.
- **Tầng 4 Lesson 05** — Ma trận: `(Ax)·y = x·(Aᵀy)` — transpose qua dot product.
- **Tầng 4 Lesson 07** — Eigenvector: ma trận đối xứng có eigenvector orthogonal.
- **Tầng 5** — Probability: covariance là dot product của hai biến đã trừ trung bình, hệ số Pearson là cosine sim.
- **Tầng 6** — AI/ML: cosine sim trong embedding search, scaled dot product attention, contrastive learning loss.

**Reference Tầng 2**:
- [Lesson 05 — Cosine law](../../02-Trigonometry/lesson-05-identities-cosine-law/): cơ sở chứng minh hai định nghĩa dot product.
- [Lesson 03 — Đường tròn đơn vị](../../02-Trigonometry/lesson-03-unit-circle/): `cosθ ∈ [-1, 1]`.

**File đi kèm**:
- [`visualization.html`](./visualization.html) — 4 component tương tác: dot product playground, cosine similarity, projection, embedding heatmap.
