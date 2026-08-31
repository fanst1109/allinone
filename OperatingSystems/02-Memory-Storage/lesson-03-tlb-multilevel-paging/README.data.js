// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: OperatingSystems/02-Memory-Storage/lesson-03-tlb-multilevel-paging/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — TLB & Bảng trang nhiều cấp

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Giải thích tại sao bảng trang phẳng (flat page table) không thực tế với không gian địa chỉ lớn.
- Mô tả cấu trúc **bảng trang 2 cấp (two-level page table)** và thực hiện tay dịch địa chỉ qua 2 cấp.
- Giải thích **TLB (Translation Lookaside Buffer)** là gì, TLB hit và miss.
- Tính **EAT (Effective Access Time)** với TLB hit ratio cho trước.
- Giải thích tại sao TLB hiệu quả nhờ **tính cục bộ (locality of reference)**.

## Kiến thức tiền đề

- [Lesson 02 — Paging](../lesson-02-paging/README.md) — bảng trang, dịch địa chỉ cơ bản.

---

## 1. Vấn đề của bảng trang phẳng

### 1.1. Kích thước bảng trang quá lớn

💡 **Trực giác — Mục lục sách khổng lồ:**
Hãy tưởng tượng một cuốn từ điển có 1 triệu từ, mỗi từ ghi số trang riêng. Mục lục phải có 1 triệu dòng — dày hơn cả cuốn sách! Bảng trang phẳng gặp đúng vấn đề này.

**Tính toán cụ thể (đã làm ở Lesson 02):**

Hệ thống 32-bit, page size 4 KB:
- Số trang $= 2^{32} / 2^{12} = \\mathbf{2^{20} \\approx 1}$ **triệu mục**.
- Mỗi PTE = 4 bytes.
- Kích thước bảng trang $= 2^{20} \\times 4 =$ **4 MB / tiến trình**.

Với hệ thống 64-bit, page size 4 KB:
- Số trang $= 2^{64} / 2^{12} = \\mathbf{2^{52}}$ **mục** — hoàn toàn không thực tế (4 PB chỉ để lưu bảng trang một tiến trình!).

### 1.2. Phần lớn bảng trang là rỗng

Một tiến trình thực tế chỉ dùng một phần nhỏ không gian địa chỉ (code, heap, stack). Ví dụ: tiến trình 64-bit dùng vài trăm MB nhưng không gian địa chỉ là 256 TB. Hơn 99.99% bảng trang là mục không dùng (valid bit = 0) — nhưng vẫn tốn bộ nhớ.

❓ **Câu hỏi tự nhiên:**

- *"Sao không chỉ lưu phần bảng trang đang dùng?"* — Đây chính xác là ý tưởng của bảng trang nhiều cấp và inverted page table. Bảng trang nhiều cấp chỉ cấp phát các phần bảng thực sự cần thiết.
- *"Hệ thống 64-bit giải quyết thế nào?"* — x86-64 dùng 4 cấp (48-bit effective, 9+9+9+9+12 bit), ARM64 dùng 4 cấp tương tự. Chi tiết ở phần 2.

📝 **Tóm tắt mục 1:**
- Bảng trang phẳng 32-bit: 4 MB / tiến trình → 400 MB cho 100 tiến trình.
- Bảng trang phẳng 64-bit: hoàn toàn không thực tế.
- Phần lớn bảng trang rỗng — lãng phí nghiêm trọng.

---

## 2. Bảng trang nhiều cấp (Multi-Level Page Table)

### 2.1. Ý tưởng phân cấp

💡 **Trực giác — Mục lục 2 cấp:**
Từ điển lớn: thay vì mục lục 1 triệu dòng, dùng mục lục 2 cấp: cấp 1 chia theo chữ cái đầu (26 mục), cấp 2 là mục lục riêng cho từng chữ cái (vài nghìn mục). Muốn tìm "algorithm": tra cấp 1 → chữ "A" → tra mục lục chữ "A" → tìm thấy trang. Nếu không có từ nào bắt đầu bằng "X", không cần tạo mục lục cho "X" → tiết kiệm không gian.

**Áp dụng vào paging:** Chia page number thành 2 phần:

<svg viewBox="0 0 540 86" style="max-width:540px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Địa chỉ ảo 32-bit với page 4 KB chia ba: p1 10 bit, p2 10 bit, offset 12 bit">
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="arb" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1d4ed8"/></marker><marker id="arg" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#15803d"/></marker><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#dc2626"/></marker><marker id="aro" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#b45309"/></marker><marker id="arp" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#7c3aed"/></marker></defs>
  <rect x="30.0" y="26.0" width="160.0" height="44.0" rx="0" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="110.0" y="43.0" fill="#1d4ed8" font-size="11" text-anchor="middle" font-weight="700">p1 (10 bit)</text>
  <text x="110.0" y="58.0" fill="#475569" font-size="9" text-anchor="middle">tra outer table</text>
  <rect x="190.0" y="26.0" width="160.0" height="44.0" rx="0" fill="#ede9fe" fill-opacity="1" stroke="#7c3aed" stroke-width="1.5"/>
  <text x="270.0" y="43.0" fill="#7c3aed" font-size="11" text-anchor="middle" font-weight="700">p2 (10 bit)</text>
  <text x="270.0" y="58.0" fill="#475569" font-size="9" text-anchor="middle">tra inner table</text>
  <rect x="350.0" y="26.0" width="150.0" height="44.0" rx="0" fill="#dcfce7" fill-opacity="1" stroke="#15803d" stroke-width="1.5"/>
  <text x="425.0" y="50.0" fill="#15803d" font-size="11" text-anchor="middle" font-weight="700">offset (12 bit)</text>
</svg>

- **Cấp 1 (outer page table)**: $2^{10} = 1024$ mục, mỗi mục trỏ đến một bảng trang cấp 2 (hoặc NULL nếu không dùng).
- **Cấp 2 (inner page table)**: mỗi bảng $2^{10} = 1024$ mục, chứa frame number.

### 2.2. Walk-through 2 cấp — Ví dụ số cụ thể

**Thiết lập:** Hệ thống 32-bit, page size 4 KB (12 bit offset). Chia page number 20 bit thành p1 = 10 bit, p2 = 10 bit.

**Địa chỉ ảo cần dịch:** 0x00403004 = 4,206,596

**Bước 1: Tách địa chỉ.**

\`\`\`
Binary: 0000 0000 0100 0000 0011 0000 0000 0100
       [p1: 0000 0000 01] [p2: 00 0000 0011] [offset: 0000 0000 0100]
\`\`\`

- offset (12 bit thấp) = 0x004 = **4**
- p2 (10 bit giữa) = 0b0000000011 = **3**
- p1 (10 bit cao) = 0b0000000001 = **1**

**Bước 2: Tra bảng cấp 1.**
\`\`\`
outer_page_table[p1=1] = địa chỉ bảng cấp 2 #B
\`\`\`
(Giả sử bảng cấp 2 #B nằm ở frame 42 trong RAM.)

**Bước 3: Tra bảng cấp 2.**
\`\`\`
bảng_cấp_2_B[p2=3] = frame 127
\`\`\`

**Bước 4: Tính địa chỉ vật lý.**
\`\`\`
địa_chỉ_vật_lý = 127 × 4096 + 4 = 520192 + 4 = 520196
               = 0x7F004
\`\`\`

**Tổng kết walk-through:**
<svg viewBox="0 0 882 68" style="max-width:882px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Dịch địa chỉ 2 cấp: 0x00403004 tách p1=1, p2=3, offset=4; outer_table[1] ra bảng B, B[3] = frame 127, địa chỉ vật lý 0x7F004">
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <rect x="14.0" y="14.0" width="110.0" height="40.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="69.0" y="37.7" fill="#1d4ed8" font-size="10" text-anchor="middle" font-weight="700">0x00403004</text>
  <line x1="126.0" y1="34.0" x2="154.0" y2="34.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="156.0" y="14.0" width="154.2" height="40.0" rx="8" fill="#ede9fe" fill-opacity="1" stroke="#7c3aed" stroke-width="2"/>
  <text x="233.1" y="37.7" fill="#7c3aed" font-size="10" text-anchor="middle" font-weight="700">p1=1, p2=3, offset=4</text>
  <line x1="312.2" y1="34.0" x2="340.2" y2="34.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="342.2" y="14.0" width="173.7" height="40.0" rx="8" fill="#fef3c7" fill-opacity="1" stroke="#b45309" stroke-width="2"/>
  <text x="429.1" y="37.7" fill="#b45309" font-size="10" text-anchor="middle" font-weight="700">outer_table[1] → bảng B</text>
  <line x1="517.9" y1="34.0" x2="545.9" y2="34.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="547.9" y="14.0" width="160.7" height="40.0" rx="8" fill="#fef3c7" fill-opacity="1" stroke="#b45309" stroke-width="2"/>
  <text x="628.3" y="37.7" fill="#b45309" font-size="10" text-anchor="middle" font-weight="700">bảng B[3] = frame 127</text>
  <line x1="710.6" y1="34.0" x2="738.6" y2="34.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="740.6" y="14.0" width="128.2" height="40.0" rx="8" fill="#dcfce7" fill-opacity="1" stroke="#15803d" stroke-width="2"/>
  <text x="804.7" y="37.7" fill="#15803d" font-size="10" text-anchor="middle" font-weight="700">vật lý = 0x7F004</text>
</svg>

### 2.3. Walk-through 2 cấp — Ví dụ 2

**Chia nhỏ hơn để dễ theo:** 16-bit, page 256 B (8 bit offset). Page number = 8 bit, chia p1=4 bit, p2=4 bit.

**Địa chỉ ảo:** 0xA7C3 = 42947

\`\`\`
Hex: A   7   C   3
Bin: 1010 0111 1100 0011
     [p1=1010=10][p2=0111=7][offset=11000011=195]
\`\`\`

- p1 = 10
- p2 = 7
- offset = 0xC3 = 195

**Tra bảng:**
\`\`\`
outer_table[10] → bảng cấp 2 số 5 (giả sử)
bảng_5[7] = frame 3
\`\`\`

**Địa chỉ vật lý:**
\`\`\`
vật_lý = 3 × 256 + 195 = 768 + 195 = 963
\`\`\`

### 2.4. Tiết kiệm bộ nhớ như thế nào?

**Ví dụ:** Tiến trình 32-bit chỉ dùng 8 MB (2 vùng: code 4 MB + stack 4 MB ở đầu và cuối không gian địa chỉ).

| Cách | Bảng trang cần | RAM dùng |
|------|---------------|---------|
| Phẳng 1 cấp | 1 bảng × 2^20 mục × 4B | **4 MB** |
| 2 cấp | Cấp 1: 1 bảng × 1024 × 4B = 4 KB; Cấp 2: chỉ 2 bảng × 1024 × 4B = 8 KB | **12 KB** |

Tiết kiệm hơn 300 lần trong ví dụ này.

⚠ **Lỗi thường gặp:**

*"Bảng trang 2 cấp luôn nhanh hơn 1 cấp."* — Sai về tốc độ truy cập: 2 cấp cần **2 lần tra RAM** (cho cấp 1 và cấp 2), thay vì 1 lần. Ưu thế của multi-level là **tiết kiệm bộ nhớ**, không phải tốc độ. TLB mới là thứ giải quyết tốc độ.

🔁 **Dừng lại tự kiểm tra:**

16-bit system, page 64 B, p1=4 bit, p2=4 bit, offset=6 bit. Địa chỉ ảo 0x1A3F. Tách p1, p2, offset.

<details>
<summary>Đáp án</summary>

0x1A3F = 0001 1010 0011 1111.
offset (6 bit thấp) = 111111 = 63.
p2 (4 bit) = 1000 = 8.
p1 (4 bit) = 0001 = 1.
Kiểm tra: 1×(2^10) + 8×(2^6) + 63 = 1024 + 512 + 63 = 1599 ≠ 0x1A3F? 0x1A3F = 6719. Thử lại: 6719 ÷ 64 = 104 dư 63. 104 = 0b01101000. p1 = 0b0110 = 6, p2 = 0b1000 = 8, offset = 63.
</details>

📝 **Tóm tắt mục 2:**
- Bảng trang 2 cấp: chia page number thành p1 + p2.
- Cấp 1 trỏ đến bảng cấp 2; chỉ tạo bảng cấp 2 khi thực sự cần.
- Tiết kiệm RAM bảng trang đáng kể khi tiến trình không dùng hết không gian địa chỉ.
- Nhược điểm: thêm 1 lần truy cập RAM mỗi cấp → cần TLB.

---

## 3. TLB — Translation Lookaside Buffer

### 3.1. TLB là gì?

💡 **Trực giác — Ghi nhớ đường đi quen:**
Lần đầu bạn đi đến siêu thị, phải tra bản đồ (mất thời gian). Lần thứ 2, 3, 4 bạn đã nhớ đường — tra bản đồ ngay trong đầu, cực nhanh. **TLB là "bộ nhớ đường đi" đó**: cache cho bảng trang, lưu N cặp (page number → frame number) được dùng gần đây nhất.

**TLB (Translation Lookaside Buffer)** là cache phần cứng tốc độ cao (thường trong CPU) lưu một số lượng nhỏ (thường 16–1024 mục) ánh xạ trang → khung đã dùng gần đây.

### 3.2. TLB Hit và TLB Miss

**Truy cập địa chỉ ảo:**

<svg viewBox="0 0 890 150" style="max-width:890px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Tra TLB: hit thì dùng frame number ngay, miss thì tra bảng trang rồi nạp TLB; cuối cùng tính địa chỉ vật lý">
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="arb" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1d4ed8"/></marker><marker id="arg" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#15803d"/></marker><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#dc2626"/></marker><marker id="aro" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#b45309"/></marker><marker id="arp" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#7c3aed"/></marker></defs>
  <rect x="16.0" y="50.0" width="190.0" height="40.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="111.0" y="66.3" fill="#1d4ed8" font-size="11" text-anchor="middle" font-weight="700">Tách page_number</text>
  <text x="111.0" y="81.3" fill="#475569" font-size="10" text-anchor="middle">từ địa chỉ ảo</text>
  <line x1="208.0" y1="70.0" x2="266.0" y2="70.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="268.0" y="50.0" width="110.0" height="40.0" rx="8" fill="#ede9fe" fill-opacity="1" stroke="#7c3aed" stroke-width="2"/>
  <text x="323.0" y="73.8" fill="#7c3aed" font-size="11" text-anchor="middle" font-weight="700">Tra TLB</text>
  <path d="M 380.0,70.0 L 420.0,70.0 L 420.0,30.0 L 458.0,30.0" fill="none" stroke="#15803d" stroke-width="1.8" marker-end="url(#arg)"/>
  <text x="424.0" y="22.0" fill="#15803d" font-size="10" text-anchor="start" font-weight="700">TLB HIT</text>
  <rect x="460.0" y="12.0" width="240.0" height="36.0" rx="8" fill="#dcfce7" fill-opacity="1" stroke="#15803d" stroke-width="2"/>
  <text x="580.0" y="26.4" fill="#15803d" font-size="10" text-anchor="middle" font-weight="700">dùng frame number ngay</text>
  <text x="580.0" y="40.9" fill="#475569" font-size="9" text-anchor="middle">không tra bảng trang</text>
  <path d="M 420.0,70.0 L 420.0,110.0 L 458.0,110.0" fill="none" stroke="#dc2626" stroke-width="1.8" marker-end="url(#arr)"/>
  <text x="424.0" y="100.0" fill="#dc2626" font-size="10" text-anchor="start" font-weight="700">TLB MISS</text>
  <rect x="460.0" y="92.0" width="240.0" height="36.0" rx="8" fill="#fee2e2" fill-opacity="1" stroke="#dc2626" stroke-width="2"/>
  <text x="580.0" y="106.4" fill="#dc2626" font-size="10" text-anchor="middle" font-weight="700">tra bảng trang (1+ lần RAM)</text>
  <text x="580.0" y="120.9" fill="#475569" font-size="9" text-anchor="middle">rồi nạp vào TLB</text>
  <path d="M 580.0,48.0 L 580.0,70.0 L 700.0,70.0" fill="none" stroke="#1a202c" stroke-width="1.8"/>
  <path d="M 580.0,130.0 L 580.0,70.0" fill="none" stroke="#1a202c" stroke-width="1.8"/>
  <line x1="700.0" y1="70.0" x2="718.0" y2="70.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="720.0" y="52.0" width="150.0" height="36.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="795.0" y="73.7" fill="#1d4ed8" font-size="10" text-anchor="middle" font-weight="700">Tính địa chỉ vật lý</text>
</svg>

**Thời gian truy cập:**

| Sự kiện | Thời gian |
|---------|-----------|
| Tra TLB | ε ≈ 1–5 ns (phần cứng, rất nhanh) |
| Truy cập RAM (1 lần) | ~100 ns |
| TLB Hit | ε + RAM = ~101 ns |
| TLB Miss (bảng 1 cấp) | ε + RAM (tra bảng) + RAM (đọc dữ liệu) ≈ 201 ns |
| TLB Miss (bảng 2 cấp) | ε + 2×RAM + RAM ≈ 301 ns |

### 3.3. EAT — Effective Access Time

**Công thức:**

$$\\begin{aligned}
EAT &= \\alpha \\cdot (\\varepsilon + t_{\\text{mem}}) + (1 - \\alpha)(\\varepsilon + k \\cdot t_{\\text{mem}} + t_{\\text{mem}}) \\\\
    &= \\varepsilon + t_{\\text{mem}} \\cdot \\big(1 + (1 - \\alpha) \\cdot k\\big)
\\end{aligned}$$

Trong đó:
- $\\alpha$ (hit_ratio) = tỷ lệ TLB hit (0 đến 1).
- $\\varepsilon$ = thời gian tra TLB (thường bỏ qua hoặc rất nhỏ).
- $t_{\\text{mem}}$ = thời gian truy cập RAM.
- $k$ = số cấp bảng trang (thêm $k$ lần RAM access khi miss).

### 3.4. Walk-through EAT — Ví dụ 1

**Thông số:**
- $\\alpha$ (TLB hit ratio) = **0.90**
- $t_{\\text{mem}} =$ **100 ns**
- $\\varepsilon \\approx 0$ (bỏ qua)
- Bảng trang 1 cấp ($k = 1$)

**Tính EAT:**

$$\\begin{aligned}
EAT &= \\alpha \\cdot (\\varepsilon + t_{\\text{mem}}) + (1 - \\alpha)(\\varepsilon + t_{\\text{mem bảng}} + t_{\\text{mem dữ liệu}}) \\\\
    &= 0.9 \\cdot (0 + 100) + 0.1 \\cdot (0 + 100 + 100) \\\\
    &= 0.9 \\cdot 100 + 0.1 \\cdot 200 \\\\
    &= 90 + 20 = 110 \\text{ ns}
\\end{aligned}$$

**So sánh:**
- Không có paging: 100 ns.
- Paging không TLB: 200 ns (gấp đôi).
- Paging có TLB ($\\alpha = 0.9$): 110 ns (chỉ chậm hơn 10%).

### 3.5. Walk-through EAT — Ví dụ 2

**Thông số:**
- $\\alpha =$ **0.98** (TLB tốt — CPU hiện đại thường đạt 95–99%)
- $t_{\\text{mem}} =$ **100 ns**
- Bảng trang 1 cấp ($k = 1$)

$$\\begin{aligned}
EAT &= 0.98 \\cdot 100 + 0.02 \\cdot 200 \\\\
    &= 98 + 4 = 102 \\text{ ns}
\\end{aligned}$$

Chỉ chậm hơn 2% so với không có paging — gần như không đáng kể!

### 3.6. Walk-through EAT — Ví dụ 3 (bảng 2 cấp)

**Thông số:**
- $\\alpha =$ **0.95**
- $t_{\\text{mem}} =$ **100 ns**
- Bảng trang 2 cấp ($k = 2$; miss → 2 lần tra bảng + 1 lần đọc dữ liệu = 3 lần RAM)

$$\\begin{aligned}
EAT &= 0.95 \\cdot 100 + 0.05 \\cdot (100 + 100 + 100) \\\\
    &= 95 + 0.05 \\cdot 300 \\\\
    &= 95 + 15 = 110 \\text{ ns}
\\end{aligned}$$

Dù bảng 2 cấp tốn thêm 1 lần RAM khi miss, hit ratio cao bù đắp được.

### 3.7. Vì sao TLB hiệu quả — Tính cục bộ (Locality)

TLB hiệu quả nhờ hai nguyên lý:

**Temporal locality (cục bộ thời gian):** Dữ liệu/code vừa dùng có khả năng cao được dùng lại sớm (ví dụ: biến trong vòng lặp được truy cập nhiều lần liên tiếp).

**Spatial locality (cục bộ không gian):** Khi truy cập địa chỉ X, sắp tới sẽ truy cập X+1, X+2... (duyệt mảng, thực thi code tuần tự). Tất cả đều nằm trong cùng page → page number giống nhau → TLB hit liên tục.

**Kết quả thực tế:** Dù TLB chỉ có vài trăm mục, hit ratio đạt 95–99% trong hầu hết workload.

❓ **Câu hỏi tự nhiên:**

- *"TLB bị flush khi nào?"* — Khi context switch (chuyển sang tiến trình khác, TLB của tiến trình cũ không còn giá trị). Một số CPU dùng **ASID (Address Space Identifier)** để gắn tag TLB entry với tiến trình, tránh flush toàn bộ TLB khi switch.
- *"TLB miss rate cao có vấn đề không?"* — Rất có vấn đề. TLB thrashing xảy ra khi working set lớn hơn TLB capacity → liên tục miss → gần như không có cache effect. Giải pháp: huge pages (2 MB, 1 GB) → giảm số trang → TLB cover được nhiều bộ nhớ hơn.
- *"CPU có mấy cấp TLB?"* — Thường 2 cấp (L1 TLB: nhỏ, rất nhanh, ~64 mục; L2 TLB: lớn hơn, ~1024 mục). Tương tự L1/L2 cache.

🔁 **Dừng lại tự kiểm tra:**

$\\alpha = 0.80$, $t_{\\text{mem}} = 200$ ns, bảng trang 1 cấp. Tính EAT. So sánh với $\\alpha = 0.99$.

<details>
<summary>Đáp án</summary>

$\\alpha = 0.80$: $EAT = 0.80 \\cdot 200 + 0.20 \\cdot 400 = 160 + 80 =$ **240 ns**.
$\\alpha = 0.99$: $EAT = 0.99 \\cdot 200 + 0.01 \\cdot 400 = 198 + 4 =$ **202 ns**.
Không có paging: 200 ns. TLB hit ratio cao (0.99) gần như không thêm overhead. Thấp (0.80) tăng 20%.
</details>

📝 **Tóm tắt mục 3:**
- TLB là cache phần cứng lưu N cặp (page → frame) gần đây nhất.
- TLB hit: chỉ 1 lần RAM access. TLB miss: tra bảng trang (k lần RAM) + 1 lần đọc dữ liệu.
- $EAT = \\alpha \\cdot t_{\\text{hit}} + (1-\\alpha) \\cdot t_{\\text{miss}}$.
- Hit ratio 95–99% nhờ temporal/spatial locality → overhead paging gần như biến mất.

---

## Bài tập

**Bài 1.** Hệ thống 32-bit, page 4 KB, bảng trang 2 cấp (p1=10 bit, p2=10 bit, offset=12 bit). Dịch địa chỉ ảo:
- (a) 0x00001234
- (b) 0x00400800

Với outer_table[0] → bảng B0; outer_table[1] → bảng B1. Bảng B0: [frame 5, frame 12, ...]; bảng B1: [frame 20, frame 3, frame 8, ...] (index 0, 1, 2...).

**Bài 2.** TLB hit ratio = 0.95, RAM access time = 150 ns. Bảng trang 1 cấp.
- (a) Tính EAT.
- (b) Nếu không có TLB, EAT là bao nhiêu?
- (c) Phần trăm tăng thêm so với không có paging (150 ns)?

**Bài 3.** Hệ thống có TLB 64 mục, hit ratio = 0.92. Muốn đạt EAT ≤ 110 ns với t_mem = 100 ns, cần hit ratio tối thiểu là bao nhiêu? (Bảng 1 cấp)

**Bài 4 (nâng cao).** So sánh kích thước bảng trang 1 cấp vs 2 cấp cho tiến trình chỉ dùng 1 MB đầu không gian địa chỉ 32-bit (page 4 KB, PTE 4 bytes).

---

## Lời giải chi tiết

### Bài 1 — Dịch địa chỉ qua bảng 2 cấp

**(a) 0x00001234:**

Hex: 0000 0000 0000 0000 0001 0010 0011 0100

\`\`\`
offset (12 bit thấp) = 0x234 = 564
p2 (10 bit) = 0b0000000001 = 1
p1 (10 bit) = 0b0000000000 = 0
\`\`\`

- outer_table[0] → bảng B0.
- B0[1] = frame 12.
- Vật lý = 12 × 4096 + 564 = 49152 + 564 = **49716** = 0xC234.

**(b) 0x00400800:**

\`\`\`
Binary: 0000 0000 0100 0000 0000 1000 0000 0000
offset (12 bit) = 0x800 = 2048
p2 (10 bit) = 0b0000000000 = 0
p1 (10 bit) = 0b0000000001 = 1
\`\`\`

- outer_table[1] → bảng B1.
- B1[0] = frame 20.
- Vật lý = 20 × 4096 + 2048 = 81920 + 2048 = **83968** = 0x14800.

### Bài 2 — Tính EAT

**(a) EAT với TLB:**

$$EAT = 0.95 \\cdot 150 + 0.05 \\cdot (150 + 150) = 142.5 + 15 = 157.5 \\text{ ns}$$

**(b) Không có TLB (mọi truy cập đều tra bảng trang):**

$$EAT = 150 \\text{ (tra bảng)} + 150 \\text{ (đọc dữ liệu)} = 300 \\text{ ns}$$

**(c) So với không có paging (150 ns):**
- Có TLB: 157.5 ns → tăng $(157.5 - 150) / 150 \\times 100\\% =$ **5%**.
- Không TLB: 300 ns → tăng **100%** (gấp đôi).

### Bài 3 — Tìm hit ratio tối thiểu

Điều kiện: $EAT \\leq 110$ ns.

$$\\begin{aligned}
\\alpha \\cdot 100 + (1-\\alpha) \\cdot 200 &\\leq 110 \\\\
100\\alpha + 200 - 200\\alpha &\\leq 110 \\\\
-100\\alpha &\\leq -90 \\\\
\\alpha &\\geq 0.90
\\end{aligned}$$

Cần hit ratio **ít nhất 90%**. TLB 64 mục với workload thông thường đạt điều này dễ dàng.

### Bài 4 — So sánh kích thước bảng trang

Tiến trình dùng 1 MB = 1,048,576 bytes. Với page 4 KB: cần 1,048,576 ÷ 4096 = **256 trang** (nằm trong p1=0, p2=0..255).

**1 cấp:**
- Bảng trang đủ $2^{20}$ mục dù chỉ dùng 256.
- Kích thước: $2^{20} \\times 4 =$ **4,194,304 bytes = 4 MB**.

**2 cấp:**
- Cấp 1: 1 bảng × 1024 mục × 4 bytes = **4 KB**.
- Cấp 2: Chỉ 1 bảng cấp 2 cần (256 trang đều nằm trong p1=0) × 1024 mục × 4 = **4 KB**.
- Tổng: **8 KB** (tiết kiệm hơn 512 lần!).

---

## Liên kết và bài tiếp theo

- **Bài trước:** [Lesson 02 — Paging](../lesson-02-paging/README.md).
- **Bài tiếp theo:** [Lesson 04 — Bộ nhớ ảo & demand paging](../lesson-04-virtual-memory-demand-paging/README.md).
- **Visualization:** [visualization.html](./visualization.html).

---

## 📝 Tổng kết Lesson 03

- **Bảng trang phẳng** không thực tế với 32/64-bit: 4 MB/tiến trình với 32-bit, bất khả thi với 64-bit.
- **Bảng trang 2 cấp**: chia page_number thành p1+p2, chỉ cấp bảng cấp 2 khi cần → tiết kiệm RAM.
- **TLB**: cache phần cứng (page → frame) tốc độ cao, thường 64–1024 mục.
- $EAT = \\alpha \\cdot t_{\\text{hit}} + (1-\\alpha) \\cdot t_{\\text{miss}}$; $\\alpha = 0.95$–$0.99$ nhờ temporal/spatial locality.
- TLB đưa overhead paging xuống ~2–10% — chấp nhận được trong thực tế.
`;
