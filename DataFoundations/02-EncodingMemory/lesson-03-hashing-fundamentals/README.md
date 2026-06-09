# Lesson 03 — Hashing Fundamentals (cơ bản về hàm băm)

> **Nhóm 2 — Encoding & Memory · DataFoundations**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu hàm băm (hash function) là gì và các thuộc tính mong muốn.
- Phân biệt chaining và open addressing để giải quyết collision.
- Tính load factor và hiểu ảnh hưởng của nó đến performance.
- Giải thích birthday paradox và ứng dụng trong security.
- Biết khi nào dùng hash nào: FNV-1a, MurmurHash, xxHash vs SHA-256.

## Kiến thức tiền đề

- [Lesson 01 — Binary & Hex](../../01-NumberRepresentation/lesson-01-binary-hex/README.md): modulo, số hex.
- [Lesson 02 — Bitwise Operations](../../01-NumberRepresentation/lesson-02-bitwise-ops/README.md): XOR, bit shift.

---

## 1. Hàm băm là gì?

💡 **Trực giác**: Một thư viện có 1 triệu cuốn sách. Nếu sắp xếp ngẫu nhiên, tìm một cuốn mất O(n). Nếu dùng mục lục (A ở kệ 1, B ở kệ 2...) thì đi thẳng đến kệ — O(1). **Hash function là "công thức tính số kệ"** từ tên sách.

**Định nghĩa hình thức**:

```
h: U → {0, 1, ..., m−1}
```

Ánh xạ từ universe U (mọi key có thể, rất lớn) xuống table size m (nhỏ hơn nhiều). Ví dụ đơn giản nhất: `h(k) = k mod m`.

**Ứng dụng**:
- Hash table (Go `map`, Python `dict`, Java `HashMap`).
- Set membership (có phần tử này không?).
- Cache key lookup.
- Bloom filter (kiểm tra set xấp xỉ).
- Cryptography (SHA-256, bcrypt) — **bài riêng**, link ở cuối.

---

## 2. Thuộc tính mong muốn của hash function

| Thuộc tính | Ý nghĩa | Tầm quan trọng |
|-----------|---------|----------------|
| **Deterministic** | Cùng input → cùng output mọi lần | Bắt buộc |
| **Uniform distribution** | Keys phân bố đều trên m buckets | Rất cao |
| **Fast to compute** | O(length of key) | Cao |
| **Avalanche effect** | 1 bit input thay đổi → ~50% bit output thay đổi | Cao cho security/DS |
| **Low collision** | Ít hai keys khác nhau cho cùng hash | Cao |

❓ **Câu hỏi tự nhiên**:
- *"Hash có thể tránh hoàn toàn collision không?"* — Không. Nếu |U| > m, theo pigeonhole principle, ít nhất một bucket có ≥ 2 key. Collision không thể tránh hoàn toàn — chỉ có thể **giảm và xử lý**.
- *"Hàm `h(k) = k mod m` có đủ tốt không?"* — Cho số nguyên thì tạm, nhưng dễ bị exploit nếu adversary biết m: họ chọn các key đều là bội số của m → tất cả về bucket 0 → O(n). **Cẩn thận với hash function đơn giản** trong security context.

### Ví dụ toy: `h(k) = k mod 7`

⚠ **Đây là ví dụ minh họa, không dùng trong production** — dễ bị anagram collision và adversarial input.

Insert `{15, 8, 22}`:
```
h(22) = 22 mod 7 = 1 → bucket[1] = {22}
h(15) = 15 mod 7 = 1 → COLLISION với bucket[1]!
h(8)  =  8 mod 7 = 1 → COLLISION với bucket[1]!
```

Cả ba key đều về bucket 1 — worst case, vì tất cả đều ≡ 1 (mod 7).

---

## 3. Collision Handling — hai chiến lược chính

### 3.1. Separate Chaining (mỗi bucket là linked list)

```
Bucket[0]: → null
Bucket[1]: → [22] → [15] → [8] → null
Bucket[2]: → null
...
```

- **Insert**: tính `h(k)`, thêm vào đầu linked list của bucket đó. O(1).
- **Lookup**: tính `h(k)`, duyệt linked list tìm key khớp.
- **Average case**: O(1 + α) với α = load factor = n/m.
- **Worst case**: O(n) nếu tất cả keys hash về cùng bucket.

💡 Go's `map` dùng một dạng biến thể chaining (bucket có fixed-size array + overflow chaining).

### 3.2. Open Addressing (probing)

Không có list ngoài. Khi collision, **tìm slot trống kế tiếp** theo probe sequence.

**Linear Probing**: $\text{probe}(k, i) = (h(k) + i) \bmod m$

Insert `{22, 15, 8}` vào table size 7:
```
h(22) = 1 → slot[1] trống → lưu 22 ở slot[1]
h(15) = 1 → slot[1] có 22 → thử slot[2] trống → lưu 15 ở slot[2]
h(8)  = 1 → slot[1] có 22 → slot[2] có 15 → thử slot[3] trống → lưu 8 ở slot[3]
```

Bảng:
```
Index: [0][ 1 ][ 2 ][ 3 ][4][5][6]
Value: [  ][22 ][15 ][ 8 ][ ][ ][ ]
```

⚠ **Primary clustering**: linear probing tạo cụm (cluster) dài → probe sequence tăng theo cụm. Với α cao, insert/lookup chậm hơn nhiều.

**Quadratic Probing**: $\text{probe}(k, i) = (h(k) + i^2) \bmod m$ — giảm clustering nhưng không cover hết table nếu m không phải prime.

**Double Hashing**: $\text{probe}(k, i) = (h_1(k) + i \times h_2(k)) \bmod m$ — phân tán tốt nhất, ít clustering. $h_2$ thường là $h_2(k) = q - (k \bmod q)$ với q là số nguyên tố < m.

### 3.3. So sánh

| | Chaining | Linear Probing | Double Hashing |
|-|----------|---------------|----------------|
| Memory | Extra (list nodes) | Compact in array | Compact in array |
| Cache perf | Kém (pointer chase) | Tốt (array locality) | Trung bình |
| α tối đa | ~1.0 | ~0.7 | ~0.8 |
| Worst case | O(n) | O(n) (clustering) | O(n) |

---

## 4. Load Factor và Performance

**Load factor** α = n/m (n = số keys, m = số buckets).

**Separate chaining**:
- Expected length of chain = α.
- Lookup time = O(1 + α).
- Hoạt động tốt kể cả khi α > 1 (nhiều key hơn bucket).

**Open addressing**:
- Cần α < 1 (không thể có nhiều key hơn slot).
- Expected probes for successful search $\approx \frac{1}{2}\left(1 + \frac{1}{1-\alpha}\right)$.
- Expected probes for unsuccessful $\approx \frac{1}{2}\left(1 + \frac{1}{(1-\alpha)^2}\right)$.

**Ví dụ số**: m=10, n=8 → α = 0.8:
- Successful lookup: ≈ 3.0 probes.
- Unsuccessful lookup: ≈ 13.0 probes! (gần worst case)

→ **Resize khi α > 0.7**: tạo bảng mới gấp đôi, rehash tất cả keys. Amortized O(1) per insert.

🔁 **Dừng lại tự kiểm tra**:

1. m=7, n=7 → α = ? Nên resize chưa?

<details>
<summary>Đáp án</summary>

α = 7/7 = 1.0. Nếu dùng open addressing: bảng đầy, không insert được. Phải resize trước khi đạt 1.0. Nếu dùng chaining: vẫn hoạt động nhưng trung bình ~1 phép so sánh/chain → còn chấp nhận được nhưng nên resize.

</details>

---

## 5. Walk-through: FNV-1a 32-bit

**FNV-1a** (Fowler-Noll-Vo) là hash đơn giản, fast, không dùng cho crypto.

```
FNV_prime_32  = 16777619 = 0x01000193
FNV_offset_32 = 2166136261 = 0x811c9dc5

hash = FNV_offset_32
for each byte b in input:
    hash = hash XOR b
    hash = hash × FNV_prime_32  (mod 2^32)
```

**Ví dụ**: hash của `"abc"` (bytes: 97, 98, 99):

```
hash = 0x811c9dc5

Step 1: hash = (0x811c9dc5 XOR 97) × 0x01000193 mod 2^32
  0x811c9dc5 XOR 0x61 = 0x811c9da4
  0x811c9da4 × 0x01000193 mod 2^32 = 0xe40c292c

Step 2: hash = (0xe40c292c XOR 98) × 0x01000193 mod 2^32
  0xe40c292c XOR 0x62 = 0xe40c294e
  × 0x01000193 mod 2^32 = 0x4b9a8b60  (approx)

Step 3: hash = (0x4b9a8b60 XOR 99) × 0x01000193 mod 2^32
  result ≈ 0x1a47e90b
```

Kết quả: `FNV1a_32("abc") = 0x1a47e90b`

⚠ **FNV-1a không dùng cho**:
- Cryptography (không collision-resistant dạng preimage).
- Security-sensitive context (bị HashDoS nếu không có seed random).

**Thực tế trong Go**: `map` dùng AES-NI (nếu CPU support) hoặc fallback hash có **random seed** mỗi lần program start — để tránh HashDoS (adversary biết seed → tạo nhiều collision).

---

## 6. Birthday Paradox và Collision Probability

💡 **Trực giác**: Trong phòng 23 người, xác suất có 2 người cùng sinh nhật là **~50%** — nghe ngạc nhiên vì 23 << 365. Đây là **birthday paradox**.

**Áp dụng cho hash**: hash function n-bit, xác suất collision ≈ 50% khi số inputs ≈ **2^(n/2)**.

| Hash bits | 50% collision at |
|-----------|-----------------|
| 32-bit | ~65,536 inputs (2¹⁶) |
| 64-bit | ~4.3 tỷ inputs (2³²) |
| 128-bit | ~1.8 × 10¹⁹ inputs |
| 256-bit (SHA-256) | ~2¹²⁸ inputs — an toàn cho crypto |

**Ví dụ thực tế**: UUID v4 là 122 bit random → collision probability sau 1 tỷ UUID ≈ 10⁻¹⁸ (cực kỳ thấp). An toàn.

Nhưng MD5 (128 bit) bị **crack bằng collision attack** không phải vì birthday paradox đơn thuần mà vì cấu trúc nội tại yếu.

**Liên kết crypto**: Xem [Cryptography — Hash Functions (T2-L03)](../../../Cryptography/02-ModernSymmetric/lesson-03-hash-functions/) cho SHA-256, bcrypt, collision resistance dạng preimage/second-preimage.

---

## 7. Hash Functions thực tế cho Data Structures

| Hàm | Speed | Quality | Dùng cho |
|-----|-------|---------|---------|
| **FNV-1a** | Fast | OK | Embedded, simple hash tables |
| **MurmurHash3** | Very fast | Good | Hadoop, Cassandra, general DS |
| **CityHash** | Very fast | Very good | Google, string-heavy |
| **xxHash** | Fastest | Excellent | Real-time systems |
| **SipHash** | Fast | Secure | Go map (với random seed) |
| SHA-256 | Slow | Crypto-safe | Signature, blockchain (dùng cho security, không cho DS) |

**Nguyên tắc**: dùng crypto hash cho security; dùng non-crypto hash cho performance. Đừng dùng SHA-256 làm hash table key.

---

## 8. Universal Hashing

**Vấn đề**: nếu adversary biết hash function, họ có thể chọn keys để tất cả hash về cùng bucket → O(n) cho mọi operation.

**Giải pháp**: **Universal hashing** — random chọn hash function từ một family khi khởi tạo.

Family h_{a,b}(k) = ((a×k + b) mod p) mod m, với a, b random và p là số nguyên tố lớn hơn |U|.

Với bất kỳ hai keys x ≠ y: Pr[h(x) = h(y)] ≤ 1/m — không adversary nào có thể đảm bảo collision.

Go's runtime: mỗi lần chạy, random seed cho hash function của `map` → `map[string]int` safe từ HashDoS.

---

## 9. Bài tập

**Bài 1**: Cho hash table size m=7, chèn keys {5, 27, 13, 6, 48} dùng `h(k) = k mod 7`. Vẽ bảng sau khi dùng (a) separate chaining, (b) linear probing.

**Bài 2**: Tại sao cần resize hash table khi load factor vượt ngưỡng? Nếu không resize, điều gì xảy ra với performance?

**Bài 3**: Tính xác suất xảy ra ít nhất 1 collision khi insert 200 keys vào hash table 32-bit. Dùng xấp xỉ birthday paradox.

**Bài 4**: Giải thích tại sao chạy đoạn code Go sau có thể an toàn về HashDoS dù dùng map:
```go
m := make(map[string]int)
// Adversary gửi 10 million chuỗi có cùng hash → map vẫn OK?
```

---

## 10. Lời giải chi tiết

### Bài 1: Chèn {5, 27, 13, 6, 48} vào m=7

`h(k) = k mod 7`:
- h(5) = 5, h(27) = 6, h(13) = 6, h(6) = 6, h(48) = 6

**(a) Separate chaining**:
```
bucket[0]: → (trống)
bucket[1]: → (trống)
bucket[2]: → (trống)
bucket[3]: → (trống)
bucket[4]: → (trống)
bucket[5]: → [5]
bucket[6]: → [48] → [6] → [13] → [27]   (4 collision!)
```

**(b) Linear probing** (insert theo thứ tự 5, 27, 13, 6, 48):
```
Insert 5:  h=5 → slot[5] trống → slot[5] = 5
Insert 27: h=6 → slot[6] trống → slot[6] = 27
Insert 13: h=6 → slot[6] có 27 → slot[0] trống → slot[0] = 13
Insert 6:  h=6 → slot[6] có 27 → slot[0] có 13 → slot[1] trống → slot[1] = 6
Insert 48: h=6 → slot[6]→slot[0]→slot[1]→slot[2] trống → slot[2] = 48
```

Bảng: `[13, 6, 48, _, _, 5, 27]` (index 0–6)

---

### Bài 2: Tại sao phải resize?

Khi α tăng:
- **Chaining**: average chain length = α → lookup từ O(1) → O(α). Với 1M keys và m=100 buckets, chain length ~10,000 → effectively O(n).
- **Open addressing**: expected probes $\approx \frac{1}{2}\left(1 + \frac{1}{(1-\alpha)^2}\right)$. Khi α→1, probes → ∞.

Nếu không resize:
- Performance giảm từ O(1) → O(n).
- Cấu trúc dữ liệu mất lợi thế cơ bản.

**Giải pháp**: resize khi α > threshold (thường 0.75). Tạo bảng gấp đôi, rehash. Amortized O(1) per insert vì resize xảy ra log(n) lần tổng cộng.

---

### Bài 3: Birthday paradox với n=200, 32-bit hash

32-bit hash → m = 2³² ≈ 4.3 tỷ.

Xác suất không collision khi insert k items:
```
P(no collision) = 1 × (1 - 1/m) × (1 - 2/m) × ... × (1 - (k-1)/m)
                ≈ e^(-k(k-1)/(2m))
```

Với k=200, m=2³²:
```
P(no collision) ≈ e^(-200×199/(2×4294967296))
               = e^(-39800/8589934592)
               ≈ e^(-4.63×10⁻⁶)
               ≈ 0.999995
```

P(at least 1 collision) ≈ **0.0000046 = 0.00046%** — rất thấp.

Phải đến k ≈ 65,536 mới có P ≈ 50%.

---

### Bài 4: Go map và HashDoS

Go's `map` runtime dùng **random seed** sinh lúc khởi động chương trình. Seed này thay đổi mỗi lần chạy.

Vì adversary không biết seed, họ không thể biết hash function cụ thể đang dùng → không thể cố ý tạo input có cùng hash → không gây collision có chủ ý → map vẫn O(1) amortized.

Đây là **universal hashing** trong thực tế. Nếu dùng hash function cố định mà adversary biết → HashDoS (Denial of Service bằng hash collision) là vấn đề thực (đã tấn công Perl, PHP, Java ~2011).

---

## Liên kết

- Bài trước: [N2-L02 — Endianness & Memory Layout](../lesson-02-endianness-memory/README.md)
- Bài tiếp: [N3-L01 — Set Theory](../../03-MathFoundations/lesson-01-set-theory/README.md)
- Trang chính nhóm: [02-EncodingMemory](../index.html)
- Crypto hash (SHA-256, bcrypt): Cryptography/02-ModernSymmetric/lesson-03-hash-functions/
- [visualization.html](./visualization.html)
