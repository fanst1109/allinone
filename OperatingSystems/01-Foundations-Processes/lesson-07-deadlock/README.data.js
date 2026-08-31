// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: OperatingSystems/01-Foundations-Processes/lesson-07-deadlock/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 07 — Deadlock

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phát biểu đúng **4 điều kiện Coffman** và giải thích từng điều kiện có nghĩa gì — không thể thuộc mà không hiểu.
- Đọc và vẽ **Resource-Allocation Graph (RAG)** — dò chu trình bằng tay.
- Trình bày 3 chiến lược xử lý deadlock: phòng ngừa, tránh, phát hiện & phục hồi.
- **Walk-through thuật toán Banker** đầy đủ với ma trận Allocation/Max/Need/Available số cụ thể — tìm safe sequence.
- Nhận biết khi nào phá điều kiện nào trong Coffman là thực tế và khi nào không.

## Kiến thức tiền đề

- [Lesson 05 — Đồng bộ hoá](../lesson-05-synchronization/): mutex, critical section — tài nguyên được bảo vệ bởi lock.
- [Lesson 06 — Semaphore & bài toán kinh điển](../lesson-06-semaphores-classic-problems/): dining philosophers — ví dụ trực quan về deadlock.

---

## 1. Deadlock là gì?

### 1.1. Trực giác và định nghĩa

💡 **Trực giác — Hai xe kẹt ngã tư:**
Tại một ngã tư hẹp, xe A từ hướng Bắc cần đi về Nam nhưng bị xe B chặn. Xe B từ hướng Đông cần đi về Tây nhưng bị xe A chặn. Cả hai đều không nhường, không ai tiến được — mãi mãi. Đây là deadlock.

**Deadlock** là tình trạng một tập hợp các process đang chờ một sự kiện (thường là giải phóng tài nguyên) mà chỉ có thể xảy ra nếu một process khác trong tập đó tiến hành — nhưng process đó cũng đang chờ. Tập hợp bị mắc kẹt vĩnh viễn.

**Ví dụ code:**

\`\`\`
// Thread A                 // Thread B
lock(mutex1)               lock(mutex2)
lock(mutex2)  ← chờ B     lock(mutex1)  ← chờ A
// A giữ mutex1, muốn mutex2
// B giữ mutex2, muốn mutex1
// Cả hai chờ nhau → deadlock
\`\`\`

❓ **Câu hỏi tự nhiên của người đọc:**

- *"Starvation cũng là 'chờ mãi' — khác deadlock như thế nào?"* — Starvation: process chờ mãi vì **lịch trình ưu tiên** (scheduler cứ chọn process khác). Deadlock: tập process chờ **tài nguyên** của nhau — không ai có thể tiến kể cả khi có CPU. Starvation có thể tự giải quyết nếu workload giảm; deadlock không bao giờ tự giải.
- *"Deadlock có thường xảy ra không?"* — Trong OS thực, deadlock rất hiếm nếu code cẩn thận. Nhưng khi xảy ra, OS có thể đóng băng hoàn toàn — rất nguy hiểm trong hệ thống critical (database, máy bay, y tế).

### 1.2. 4 Điều kiện Coffman

Deadlock xảy ra **khi và chỉ khi** cả 4 điều kiện sau đều đúng **đồng thời**:

| Điều kiện | Tên | Nghĩa |
|-----------|-----|-------|
| 1 | **Mutual Exclusion** (Loại trừ lẫn nhau) | Ít nhất một tài nguyên không thể chia sẻ — chỉ 1 process dùng tại 1 thời điểm |
| 2 | **Hold and Wait** (Giữ và chờ) | Có process đang giữ ít nhất 1 tài nguyên và đang chờ thêm tài nguyên khác |
| 3 | **No Preemption** (Không cưỡng đoạt) | Tài nguyên không thể bị cưỡng đoạt từ process — chỉ process tự giải phóng |
| 4 | **Circular Wait** (Chờ vòng tròn) | Tồn tại một chuỗi P₁→P₂→...→Pₙ→P₁ sao cho mỗi Pᵢ chờ tài nguyên đang bị Pᵢ₊₁ giữ |

💡 **Giải thích từng điều kiện bằng ví dụ bãi đậu xe:**

1. **Mutual Exclusion:** Mỗi chỗ đậu chỉ chứa được 1 xe (nếu nhiều xe cùng đậu được 1 chỗ thì không deadlock).
2. **Hold and Wait:** Xe A đã đậu vào chỗ P1 nhưng muốn di chuyển sang chỗ P2 (đang có xe B) mà không chịu ra khỏi P1 trước.
3. **No Preemption:** Người quản lý bãi xe không thể ép xe A dời ra — chỉ xe A tự quyết định dời.
4. **Circular Wait:** A chờ chỗ của B, B chờ chỗ của C, C chờ chỗ của A — vòng tròn.

⚠ **Lỗi thường gặp — Nghĩ chỉ cần 3 điều kiện là deadlock:** Tất cả 4 phải xảy ra đồng thời. Nếu phá được bất kỳ 1 điều kiện nào, deadlock không xảy ra. Đây là cơ sở của chiến lược phòng ngừa.

🔁 **Dừng lại tự kiểm tra:**

Trong ví dụ dining philosophers: điều kiện nào trong 4 điều kiện Coffman bị vi phạm khi dùng giải pháp "bất đối xứng"?

<details>
<summary>Đáp án</summary>

Giải pháp bất đối xứng phá điều kiện **Circular Wait** (điều kiện 4). Bằng cách ép T4 cầm đũa theo chiều ngược lại, chuỗi T0→T1→T2→T3→T4→T0 (mỗi người chờ đũa của người tiếp theo) không còn là vòng tròn khép kín — T4 chờ đũa theo chiều ngược, phá chu trình.
</details>

📝 **Tóm tắt mục 1:**
- Deadlock = tập process chờ tài nguyên lẫn nhau vĩnh viễn.
- 4 điều kiện Coffman: Mutual Exclusion + Hold & Wait + No Preemption + Circular Wait.
- Tất cả 4 phải xảy ra đồng thời. Phá 1 → không deadlock.

---

## 2. Resource-Allocation Graph (RAG)

### 2.1. Khái niệm

**Resource-Allocation Graph** là đồ thị có hướng biểu diễn trạng thái phân bổ tài nguyên:

- **Nút process:** hình tròn, ký hiệu P₁, P₂, ...
- **Nút tài nguyên:** hình chữ nhật, với các chấm bên trong (mỗi chấm = một instance).
- **Cạnh Request (yêu cầu):** Pᵢ → Rⱼ — process Pᵢ đang yêu cầu tài nguyên Rⱼ.
- **Cạnh Assignment (cấp phát):** Rⱼ → Pᵢ — một instance của Rⱼ đang được cấp cho Pᵢ.

### 2.2. Dò chu trình → Deadlock

**Nguyên tắc:**
- Nếu RAG **không có chu trình** → **không có deadlock**.
- Nếu RAG **có chu trình**:
  - Mỗi tài nguyên chỉ có **1 instance** → **deadlock** chắc chắn.
  - Có tài nguyên với **nhiều instance** → có thể deadlock (cần phân tích thêm).

### 2.3. Walk-through — Ví dụ có deadlock

**Tình huống:** 3 process (P1, P2, P3), 3 tài nguyên R1, R2, R3 (mỗi cái 1 instance):

<svg viewBox="0 0 490 206" style="max-width:490px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Phân bổ: R1→P1, R2→P2, R3→P3; yêu cầu: P1→R2, P2→R3, P3→R1 — tạo chu trình chờ">
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="arb" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1d4ed8"/></marker><marker id="arg" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#15803d"/></marker><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#dc2626"/></marker><marker id="aro" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#b45309"/></marker><marker id="arp" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#7c3aed"/></marker></defs>
  <text x="120.0" y="24.0" fill="#15803d" font-size="11" text-anchor="middle" font-weight="700">Phân bổ hiện tại (assign)</text>
  <text x="360.0" y="24.0" fill="#dc2626" font-size="11" text-anchor="middle" font-weight="700">Yêu cầu hiện tại (request)</text>
  <rect x="20.0" y="40.0" width="70.0" height="30.0" rx="8" fill="#fef3c7" fill-opacity="1" stroke="#b45309" stroke-width="2"/>
  <text x="55.0" y="58.7" fill="#b45309" font-size="10" text-anchor="middle" font-weight="700">R1</text>
  <line x1="92.0" y1="55.0" x2="148.0" y2="55.0" stroke="#15803d" stroke-width="1.8" marker-end="url(#arg)"/>
  <rect x="150.0" y="40.0" width="70.0" height="30.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="185.0" y="58.7" fill="#1d4ed8" font-size="10" text-anchor="middle" font-weight="700">P1</text>
  <rect x="270.0" y="40.0" width="70.0" height="30.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="305.0" y="58.7" fill="#1d4ed8" font-size="10" text-anchor="middle" font-weight="700">P1</text>
  <line x1="342.0" y1="55.0" x2="398.0" y2="55.0" stroke="#dc2626" stroke-width="1.8" marker-end="url(#arr)"/>
  <rect x="400.0" y="40.0" width="70.0" height="30.0" rx="8" fill="#fef3c7" fill-opacity="1" stroke="#b45309" stroke-width="2"/>
  <text x="435.0" y="58.7" fill="#b45309" font-size="10" text-anchor="middle" font-weight="700">R2</text>
  <rect x="20.0" y="84.0" width="70.0" height="30.0" rx="8" fill="#fef3c7" fill-opacity="1" stroke="#b45309" stroke-width="2"/>
  <text x="55.0" y="102.7" fill="#b45309" font-size="10" text-anchor="middle" font-weight="700">R2</text>
  <line x1="92.0" y1="99.0" x2="148.0" y2="99.0" stroke="#15803d" stroke-width="1.8" marker-end="url(#arg)"/>
  <rect x="150.0" y="84.0" width="70.0" height="30.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="185.0" y="102.7" fill="#1d4ed8" font-size="10" text-anchor="middle" font-weight="700">P2</text>
  <rect x="270.0" y="84.0" width="70.0" height="30.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="305.0" y="102.7" fill="#1d4ed8" font-size="10" text-anchor="middle" font-weight="700">P2</text>
  <line x1="342.0" y1="99.0" x2="398.0" y2="99.0" stroke="#dc2626" stroke-width="1.8" marker-end="url(#arr)"/>
  <rect x="400.0" y="84.0" width="70.0" height="30.0" rx="8" fill="#fef3c7" fill-opacity="1" stroke="#b45309" stroke-width="2"/>
  <text x="435.0" y="102.7" fill="#b45309" font-size="10" text-anchor="middle" font-weight="700">R3</text>
  <rect x="20.0" y="128.0" width="70.0" height="30.0" rx="8" fill="#fef3c7" fill-opacity="1" stroke="#b45309" stroke-width="2"/>
  <text x="55.0" y="146.7" fill="#b45309" font-size="10" text-anchor="middle" font-weight="700">R3</text>
  <line x1="92.0" y1="143.0" x2="148.0" y2="143.0" stroke="#15803d" stroke-width="1.8" marker-end="url(#arg)"/>
  <rect x="150.0" y="128.0" width="70.0" height="30.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="185.0" y="146.7" fill="#1d4ed8" font-size="10" text-anchor="middle" font-weight="700">P3</text>
  <rect x="270.0" y="128.0" width="70.0" height="30.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="305.0" y="146.7" fill="#1d4ed8" font-size="10" text-anchor="middle" font-weight="700">P3</text>
  <line x1="342.0" y1="143.0" x2="398.0" y2="143.0" stroke="#dc2626" stroke-width="1.8" marker-end="url(#arr)"/>
  <rect x="400.0" y="128.0" width="70.0" height="30.0" rx="8" fill="#fef3c7" fill-opacity="1" stroke="#b45309" stroke-width="2"/>
  <text x="435.0" y="146.7" fill="#b45309" font-size="10" text-anchor="middle" font-weight="700">R1</text>
  <text x="245.0" y="190.0" fill="#475569" font-size="10" text-anchor="middle">P1 giữ R1 muốn R2, P2 giữ R2 muốn R3, P3 giữ R3 muốn R1 → chu trình</text>
</svg>

**Đồ thị:**
<svg viewBox="0 0 460 230" style="max-width:460px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Chu trình deadlock: P1 request R2 assign P2, P2 request R3 assign P3, P3 request R1 assign P1">
  <defs><marker id="dl" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <line x1="102.0" y1="60.0" x2="206.0" y2="60.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#dl)"/>
  <rect x="116.1" y="63.0" width="55.0" height="15.0" rx="3" fill="#f8fafc" fill-opacity="1" stroke="none" stroke-width="0"/>
  <text x="143.6" y="75.0" fill="#1a202c" font-size="11" text-anchor="middle" font-weight="700">request</text>
  <line x1="252.0" y1="60.0" x2="356.0" y2="60.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#dl)"/>
  <rect x="269.6" y="63.0" width="48.0" height="15.0" rx="3" fill="#f8fafc" fill-opacity="1" stroke="none" stroke-width="0"/>
  <text x="293.6" y="75.0" fill="#1a202c" font-size="11" text-anchor="middle" font-weight="700">assign</text>
  <line x1="380.0" y1="82.0" x2="380.0" y2="146.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#dl)"/>
  <rect x="341.5" y="99.6" width="55.0" height="15.0" rx="3" fill="#f8fafc" fill-opacity="1" stroke="none" stroke-width="0"/>
  <text x="369.0" y="111.6" fill="#1a202c" font-size="11" text-anchor="middle" font-weight="700">request</text>
  <line x1="358.0" y1="170.0" x2="254.0" y2="170.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#dl)"/>
  <rect x="292.4" y="151.0" width="48.0" height="15.0" rx="3" fill="#f8fafc" fill-opacity="1" stroke="none" stroke-width="0"/>
  <text x="316.4" y="163.0" fill="#1a202c" font-size="11" text-anchor="middle" font-weight="700">assign</text>
  <line x1="208.0" y1="170.0" x2="104.0" y2="170.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#dl)"/>
  <rect x="138.9" y="151.0" width="55.0" height="15.0" rx="3" fill="#f8fafc" fill-opacity="1" stroke="none" stroke-width="0"/>
  <text x="166.4" y="163.0" fill="#1a202c" font-size="11" text-anchor="middle" font-weight="700">request</text>
  <line x1="80.0" y1="148.0" x2="80.0" y2="84.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#dl)"/>
  <rect x="67.0" y="114.4" width="48.0" height="15.0" rx="3" fill="#f8fafc" fill-opacity="1" stroke="none" stroke-width="0"/>
  <text x="91.0" y="126.4" fill="#1a202c" font-size="11" text-anchor="middle" font-weight="700">assign</text>
  <circle cx="80.0" cy="60.0" r="20" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <text x="80.0" y="65.0" fill="#1d4ed8" font-size="13" text-anchor="middle" font-weight="700">P1</text>
  <circle cx="230.0" cy="60.0" r="20" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <text x="230.0" y="65.0" fill="#1d4ed8" font-size="13" text-anchor="middle" font-weight="700">R2</text>
  <circle cx="380.0" cy="60.0" r="20" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <text x="380.0" y="65.0" fill="#1d4ed8" font-size="13" text-anchor="middle" font-weight="700">P2</text>
  <circle cx="380.0" cy="170.0" r="20" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <text x="380.0" y="175.0" fill="#1d4ed8" font-size="13" text-anchor="middle" font-weight="700">R3</text>
  <circle cx="230.0" cy="170.0" r="20" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <text x="230.0" y="175.0" fill="#1d4ed8" font-size="13" text-anchor="middle" font-weight="700">P3</text>
  <circle cx="80.0" cy="170.0" r="20" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <text x="80.0" y="175.0" fill="#1d4ed8" font-size="13" text-anchor="middle" font-weight="700">R1</text>
</svg>

**Dò chu trình:** P1 → R2 → P2 → R3 → P3 → R1 → P1 — chu trình khép kín. Vì mỗi tài nguyên chỉ có 1 instance → **deadlock**.

### 2.4. Walk-through — Ví dụ không deadlock (tài nguyên nhiều instance)

**Tình huống:** R1 có **2 instance**, P1 và P2 cùng giữ 1 instance, P3 yêu cầu 1 instance:

<svg viewBox="0 0 340 196" style="max-width:340px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="R1 có 2 instance cấp cho P1 và P2; P3 request R1 — có chu trình nhưng chưa chắc deadlock vì R1 nhiều instance">
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="arb" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1d4ed8"/></marker><marker id="arg" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#15803d"/></marker><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#dc2626"/></marker><marker id="aro" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#b45309"/></marker><marker id="arp" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#7c3aed"/></marker></defs>
  <rect x="30.0" y="80.0" width="110.0" height="40.0" rx="8" fill="#fef3c7" fill-opacity="1" stroke="#b45309" stroke-width="2"/>
  <text x="85.0" y="96.3" fill="#b45309" font-size="11" text-anchor="middle" font-weight="700">R1 [• •]</text>
  <text x="85.0" y="111.3" fill="#475569" font-size="10" text-anchor="middle">2 instance</text>
  <path d="M 140.0,100.0 L 170.0,100.0 L 170.0,38.0 L 198.0,38.0" fill="none" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <text x="168.0" y="28.0" fill="#475569" font-size="9" text-anchor="start">assign</text>
  <rect x="200.0" y="20.0" width="70.0" height="36.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="235.0" y="42.2" fill="#1d4ed8" font-size="12" text-anchor="middle" font-weight="700">P1</text>
  <path d="M 140.0,100.0 L 170.0,100.0 L 170.0,98.0 L 198.0,98.0" fill="none" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <text x="168.0" y="88.0" fill="#475569" font-size="9" text-anchor="start">assign</text>
  <rect x="200.0" y="80.0" width="70.0" height="36.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="235.0" y="102.2" fill="#1d4ed8" font-size="12" text-anchor="middle" font-weight="700">P2</text>
  <rect x="200.0" y="140.0" width="70.0" height="36.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="235.0" y="162.2" fill="#1d4ed8" font-size="12" text-anchor="middle" font-weight="700">P3</text>
  <line x1="198.0" y1="158.0" x2="144.0" y2="122.0" stroke="#dc2626" stroke-width="1.8" marker-end="url(#arr)"/>
  <text x="171.0" y="152.0" fill="#475569" font-size="9" text-anchor="middle">request</text>
</svg>

Có cạnh P3 → R1 tạo chu trình? Không — P3 yêu cầu R1 nhưng R1 có 2 instance và cả 2 đang bị dùng. Nếu P1 hoặc P2 giải phóng, P3 có thể tiến. Không deadlock nếu P1/P2 không chờ P3.

📝 **Tóm tắt mục 2:**
- RAG: tròn = process, chữ nhật = tài nguyên, cạnh yêu cầu P→R, cạnh cấp phát R→P.
- Chu trình trong RAG → deadlock (nếu mỗi tài nguyên 1 instance: chắc chắn; nhiều instance: có thể).
- Không chu trình → chắc chắn không deadlock.

---

## 3. Chiến lược xử lý Deadlock

| Chiến lược | Cơ chế | Chi phí | Khi nào dùng |
|-----------|--------|---------|-------------|
| **Phòng ngừa** (Prevention) | Phá ≥ 1 trong 4 điều kiện Coffman | Hiệu năng thấp | Hệ thống critical, không chấp nhận deadlock |
| **Tránh** (Avoidance) | Trước khi cấp phát, kiểm tra trạng thái an toàn | Cần biết trước nhu cầu | Database, RTOS |
| **Phát hiện & Phục hồi** (Detection & Recovery) | Cho deadlock xảy ra, phát hiện rồi xử lý | Overhead khi phát hiện | OS thực dụng (Windows, Linux) |
| **Bỏ qua** (Ostrich) | Giả vờ deadlock không tồn tại | Gần như không | Khi deadlock cực hiếm, phục hồi đơn giản |

### 3.1. Phòng ngừa — Phá từng điều kiện

**Phá Mutual Exclusion:** Dùng tài nguyên có thể chia sẻ (vd: read-only file). Không phá được với tài nguyên vốn không chia sẻ được (printer, mutex).

**Phá Hold and Wait:** Yêu cầu process phải xin tất cả tài nguyên ngay từ đầu (trước khi bắt đầu), hoặc phải thả hết tài nguyên đang giữ trước khi xin thêm. Nhược điểm: lãng phí tài nguyên (giữ nhưng chưa dùng), có thể starvation nếu process cần nhiều tài nguyên phổ biến.

**Phá No Preemption:** Cho phép hệ thống cưỡng đoạt tài nguyên (preempt). Ví dụ: nếu P1 giữ R1 và muốn R2 nhưng R2 không sẵn sàng → preempt R1 từ P1, lưu trạng thái P1, và cho P1 vào waiting list. Thực tế: chỉ khả thi với tài nguyên có thể "save/restore" (CPU registers, memory pages). Không khả thi với printer (đang in dở không thể pause).

**Phá Circular Wait:** Đánh số tổng tuyến tính cho tài nguyên và quy định mọi process phải xin tài nguyên theo thứ tự tăng dần. Ví dụ: R1 < R2 < R3. Nếu P1 cần R2 và R1, phải xin R1 trước. Điều này đảm bảo không thể có chu trình (vì mọi cạnh Request đều đi từ Rᵢ nhỏ đến Rⱼ lớn hơn → không vòng về).

### 3.2. Tránh Deadlock — Trạng thái an toàn

💡 **Trực giác:** Ngân hàng có 10 tỷ tiền mặt. Khách hàng A cần tối đa 7 tỷ, B cần tối đa 4 tỷ, C cần tối đa 9 tỷ. Ngân hàng không cho vay mà không biết mình có đủ tiền để phục vụ tất cả khách hàng đến hạn không. Thuật toán Banker giúp ngân hàng tính điều này.

**Trạng thái an toàn (safe state):** Tồn tại ít nhất một **safe sequence** — thứ tự chạy các process sao cho mỗi process có thể hoàn thành (được cấp đủ tài nguyên) bằng cách tận dụng tài nguyên giải phóng từ các process trước.

---

## 4. Thuật toán Banker — Walk-through đầy đủ

### 4.1. Input

**5 process (P0..P4), 3 loại tài nguyên (A, B, C):**

\`\`\`
Total resources:  A=10, B=5, C=7
\`\`\`

**Ma trận Allocation** (đang giữ):

\`\`\`
      A  B  C
P0 [  0  1  0 ]
P1 [  2  0  0 ]
P2 [  3  0  2 ]
P3 [  2  1  1 ]
P4 [  0  0  2 ]
\`\`\`

**Ma trận Max** (tối đa cần):

\`\`\`
      A  B  C
P0 [  7  5  3 ]
P1 [  3  2  2 ]
P2 [  9  0  2 ]
P3 [  2  2  2 ]
P4 [  4  3  3 ]
\`\`\`

### 4.2. Tính Need và Available

**$\\text{Need} = \\text{Max} - \\text{Allocation}$:**

\`\`\`
      A  B  C
P0 [  7  4  3 ]   (7-0, 5-1, 3-0)
P1 [  1  2  2 ]   (3-2, 2-0, 2-0)
P2 [  6  0  0 ]   (9-3, 0-0, 2-2)
P3 [  0  1  1 ]   (2-2, 2-1, 2-1)
P4 [  4  3  1 ]   (4-0, 3-0, 3-2)
\`\`\`

**Available** $= \\text{Total} - \\sum(\\text{Allocation})$:

<svg viewBox="0 0 472 150" style="max-width:472px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Tính Available cho Banker: A = 10−7 = 3, B = 5−2 = 3, C = 7−5 = 2 → Available = [3, 3, 2]">
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <rect x="16.0" y="14.0" width="440.0" height="26.0" rx="0" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="61.0" y="31.0" fill="#1d4ed8" font-size="10" text-anchor="middle" font-weight="700">Resource</text>
  <text x="191.0" y="31.0" fill="#1d4ed8" font-size="10" text-anchor="middle" font-weight="700">Σ Allocation</text>
  <text x="316.0" y="31.0" fill="#1d4ed8" font-size="10" text-anchor="middle" font-weight="700">Total</text>
  <text x="406.0" y="31.0" fill="#1d4ed8" font-size="10" text-anchor="middle" font-weight="700">Available</text>
  <rect x="16.0" y="40.0" width="440.0" height="26.0" rx="0" fill="#ffffff" fill-opacity="1" stroke="#e2e8f0" stroke-width="0.8"/>
  <text x="61.0" y="57.0" fill="#1f2937" font-size="10" text-anchor="middle">A</text>
  <text x="191.0" y="57.0" fill="#1f2937" font-size="10" text-anchor="middle">0+2+3+2+0 = 7</text>
  <text x="316.0" y="57.0" fill="#1f2937" font-size="10" text-anchor="middle">10</text>
  <text x="406.0" y="57.0" fill="#15803d" font-size="10" text-anchor="middle">3</text>
  <rect x="16.0" y="66.0" width="440.0" height="26.0" rx="0" fill="#f1f5f9" fill-opacity="1" stroke="#e2e8f0" stroke-width="0.8"/>
  <text x="61.0" y="83.0" fill="#1f2937" font-size="10" text-anchor="middle">B</text>
  <text x="191.0" y="83.0" fill="#1f2937" font-size="10" text-anchor="middle">1+0+0+1+0 = 2</text>
  <text x="316.0" y="83.0" fill="#1f2937" font-size="10" text-anchor="middle">5</text>
  <text x="406.0" y="83.0" fill="#15803d" font-size="10" text-anchor="middle">3</text>
  <rect x="16.0" y="92.0" width="440.0" height="26.0" rx="0" fill="#ffffff" fill-opacity="1" stroke="#e2e8f0" stroke-width="0.8"/>
  <text x="61.0" y="109.0" fill="#1f2937" font-size="10" text-anchor="middle">C</text>
  <text x="191.0" y="109.0" fill="#1f2937" font-size="10" text-anchor="middle">0+0+2+1+2 = 5</text>
  <text x="316.0" y="109.0" fill="#1f2937" font-size="10" text-anchor="middle">7</text>
  <text x="406.0" y="109.0" fill="#15803d" font-size="10" text-anchor="middle">2</text>
  <text x="236.0" y="136.0" fill="#475569" font-size="10" text-anchor="middle">Available = Total − Σ Allocation = [3, 3, 2]</text>
</svg>

### 4.3. Tìm Safe Sequence — Từng bước

**Trạng thái ban đầu:** Available = [3, 3, 2]. Tìm process mà Need ≤ Available.

---

**Bước 1:** Xét từng process (chưa hoàn thành):

| Process | Need | Available | Need ≤ Available? |
|---------|------|-----------|-------------------|
| P0 | [7,4,3] | [3,3,2] | 7>3 → **Không** |
| P1 | [1,2,2] | [3,3,2] | 1≤3, 2≤3, 2≤2 → **Có** |
| P2 | [6,0,0] | [3,3,2] | 6>3 → **Không** |
| P3 | [0,1,1] | [3,3,2] | 0≤3, 1≤3, 1≤2 → **Có** |
| P4 | [4,3,1] | [3,3,2] | 4>3 → **Không** |

P1 và P3 đều có thể chạy. Chọn P1 (hoặc P3 — cả hai đều ổn).

**Chạy P1:** P1 hoàn thành, giải phóng Allocation[P1] = [2,0,0]:
\`\`\`
Available = [3,3,2] + [2,0,0] = [5,3,2]
\`\`\`
Safe sequence hiện tại: **P1**

---

**Bước 2:** Available = [5, 3, 2]. Xét các process chưa hoàn thành (P0, P2, P3, P4):

| Process | Need | Available | Need ≤ Available? |
|---------|------|-----------|-------------------|
| P0 | [7,4,3] | [5,3,2] | 7>5 → **Không** |
| P2 | [6,0,0] | [5,3,2] | 6>5 → **Không** |
| P3 | [0,1,1] | [5,3,2] | 0≤5, 1≤3, 1≤2 → **Có** |
| P4 | [4,3,1] | [5,3,2] | 4≤5, 3≤3, 1≤2 → **Có** |

Chọn P3.

**Chạy P3:** Giải phóng [2,1,1]:
\`\`\`
Available = [5,3,2] + [2,1,1] = [7,4,3]
\`\`\`
Safe sequence: **P1, P3**

---

**Bước 3:** Available = [7, 4, 3]. Xét P0, P2, P4:

| Process | Need | Available | Need ≤ Available? |
|---------|------|-----------|-------------------|
| P0 | [7,4,3] | [7,4,3] | 7≤7, 4≤4, 3≤3 → **Có** |
| P2 | [6,0,0] | [7,4,3] | 6≤7 → **Có** |
| P4 | [4,3,1] | [7,4,3] | 4≤7, 3≤4, 1≤3 → **Có** |

Chọn P4.

**Chạy P4:** Giải phóng [0,0,2]:
\`\`\`
Available = [7,4,3] + [0,0,2] = [7,4,5]
\`\`\`
Safe sequence: **P1, P3, P4**

---

**Bước 4:** Available = [7, 4, 5]. Xét P0, P2:

| Process | Need | Available | Need ≤ Available? |
|---------|------|-----------|-------------------|
| P0 | [7,4,3] | [7,4,5] | 7≤7, 4≤4, 3≤5 → **Có** |
| P2 | [6,0,0] | [7,4,5] | 6≤7 → **Có** |

Chọn P0.

**Chạy P0:** Giải phóng [0,1,0]:
\`\`\`
Available = [7,4,5] + [0,1,0] = [7,5,5]
\`\`\`
Safe sequence: **P1, P3, P4, P0**

---

**Bước 5:** Available = [7, 5, 5]. Chỉ còn P2:

| Process | Need | Available | Need ≤ Available? |
|---------|------|-----------|-------------------|
| P2 | [6,0,0] | [7,5,5] | 6≤7 → **Có** |

**Chạy P2:** Hoàn thành.

### 4.4. Kết quả

**Safe sequence: P1 → P3 → P4 → P0 → P2**

Hệ thống ở trạng thái **an toàn (safe state)**. Không deadlock nếu mỗi process không xin vượt quá Max đã khai báo.

### 4.5. Khi nào không tìm được safe sequence?

Nếu sau vài bước, không còn process nào có Need ≤ Available nhưng vẫn còn process chưa hoàn thành → **trạng thái không an toàn (unsafe state)** → có nguy cơ deadlock.

Ví dụ: nếu P2 bổ sung yêu cầu thêm, Available giảm xuống [2,3,0] ngay từ đầu → không process nào chạy được → unsafe state.

❓ **Câu hỏi tự nhiên của người đọc:**

- *"Thuật toán Banker thực tế có dùng không?"* — Ít. Lý do: cần process khai báo Max trước khi chạy (thực tế khó biết), chi phí tính toán O(n²·m) mỗi lần xin tài nguyên. Database và RTOS dùng; OS thông thường (Windows, Linux) không.
- *"Nếu có nhiều safe sequence, chọn cái nào?"* — Bất kỳ cái nào cũng được — mục đích chỉ là xác định tồn tại safe sequence hay không. Không cần tìm tất cả.
- *"Unsafe state có nghĩa là deadlock chắc chắn xảy ra không?"* — Không. Unsafe state nghĩa là có **thể** deadlock nếu process xin đủ Max. Nếu process không xin thêm, vẫn an toàn. Nhưng Banker không chấp nhận rủi ro → không cho cấp phát nếu dẫn đến unsafe state.

📝 **Tóm tắt mục 4:**
- Banker cần 3 ma trận: Allocation (đang giữ), Max (tối đa cần), $\\text{Need} = \\text{Max} - \\text{Allocation}$.
- $\\text{Available} = \\text{Total} - \\sum(\\text{Allocation})$.
- Tìm safe sequence: lặp lại — tìm process có Need ≤ Available, cho chạy, cộng Allocation vào Available.
- Safe sequence tồn tại → hệ thống an toàn → cho phép cấp phát.

---

## 5. Phát hiện & Phục hồi Deadlock

### 5.1. Phát hiện

OS chạy định kỳ thuật toán phát hiện deadlock:

1. **Với mỗi loại tài nguyên 1 instance:** Kiểm tra chu trình trong **Wait-for Graph** (đơn giản hóa RAG, chỉ giữ cạnh P→P). Chu trình = deadlock.

2. **Với tài nguyên nhiều instance:** Thuật toán tương tự Banker, nhưng không cần Max (dùng ma trận Request hiện tại thay vì Need). Phức tạp hơn, O(n²·m).

**Tần suất phát hiện:** Mỗi khi một request không được đáp ứng (overhead thấp nhưng phát hiện chậm), hoặc định kỳ (overhead đều đặn).

### 5.2. Phục hồi

Khi phát hiện deadlock, OS có 2 lựa chọn:

**Cách 1 — Terminate process:**
- Kill tất cả process trong deadlock (đơn giản nhưng mất dữ liệu).
- Kill từng process một đến khi phá được chu trình (tốn kém — cần tính deadlock lại sau mỗi lần kill).
- Chọn "victim" theo tiêu chí: priority thấp, CPU time dùng ít, ít tài nguyên đang giữ, ít tài nguyên còn cần.

**Cách 2 — Rollback/Preemption:**
- Preempt tài nguyên từ một process (victim): lưu state, roll back về checkpoint, restart khi có đủ tài nguyên.
- Cần cơ chế checkpoint — chỉ feasible với database transaction.
- Nguy cơ **starvation**: cùng 1 process bị chọn làm victim liên tục → cần tính lịch sử.

⚠ **Lỗi thường gặp — Nhầm "phát hiện" với "tránh":** Phát hiện (detection) chỉ nhận ra deadlock SAU KHI xảy ra. Tránh (avoidance) kiểm tra TRƯỚC KHI cấp phát. Linux/Windows chủ yếu dùng "bỏ qua" (ostrich) — khi OS deadlock, user khởi động lại.

---

## Bài tập

**Bài 1 — Nhận biết 4 điều kiện Coffman.**

Hệ thống có 2 printer, 3 process:
- P1 giữ printer A, đang chờ printer B.
- P2 giữ printer B, đang chờ printer A.
- P3 không giữ gì, đang chờ printer A.

(a) Liệt kê các điều kiện Coffman nào đang thoả mãn.
(b) Có deadlock không? Tất cả process bị kẹt không?

---

**Bài 2 — Dò chu trình RAG.**

Cho RAG sau (tài nguyên mỗi loại 1 instance):
- P1 giữ R1, xin R2.
- P2 giữ R2, xin R3.
- P3 giữ R3, xin R1.
- P4 không giữ gì, xin R2.

(a) Vẽ đồ thị RAG.
(b) Có chu trình không? Nếu có, liệt kê.
(c) Deadlock xảy ra với những process nào?

---

**Bài 3 — Thuật toán Banker.**

3 process (P0, P1, P2), 2 loại tài nguyên (A, B), Total = [4, 6].

\`\`\`
        Max     Allocation   Need     Available
     A  B     A  B          A  B
P0 [ 3  2 ] [ 1  1 ]      [ ?  ? ]
P1 [ 2  4 ] [ 1  2 ]      [ ?  ? ]
P2 [ 4  4 ] [ 2  2 ]      [ ?  ? ]
\`\`\`

(a) Tính Need và Available.
(b) Tìm safe sequence (nếu có).
(c) Nếu P1 yêu cầu thêm [1, 0], có thể cấp phát không?

---

**Bài 4 — Phá điều kiện Coffman.**

Cho mỗi chiến lược sau, chỉ ra điều kiện Coffman nào đang bị phá và giải thích tại sao hiệu quả hay không hiệu quả:

(a) Database cho phép cùng lúc đọc từ nhiều transaction (shared lock cho read).
(b) OS yêu cầu process phải khai báo tất cả tài nguyên cần ngay lúc khởi tạo.
(c) Khi thread muốn mutex thứ 2, phải thả mutex thứ 1 trước.
(d) Quy định thứ tự toàn cục: mutex1 phải được lock trước mutex2.

---

## Lời giải chi tiết

**Bài 1 — Nhận biết 4 điều kiện**

**(a)** Kiểm tra từng điều kiện:

1. **Mutual Exclusion:** Printer là tài nguyên không chia sẻ — **Thoả**.
2. **Hold and Wait:** P1 giữ printer A, đang chờ printer B. P2 giữ printer B, đang chờ printer A — **Thoả**.
3. **No Preemption:** Không ai cưỡng đoạt printer từ process khác — **Thoả**.
4. **Circular Wait:** P1 chờ printer B (P2 giữ), P2 chờ printer A (P1 giữ) → P1→P2→P1 — **Thoả**.

Cả 4 điều kiện đều thoả mãn.

**(b)** P1 và P2 deadlock với nhau (chờ tài nguyên của nhau). P3 đang chờ printer A (P1 giữ). Khi P1 và P2 deadlock → P3 cũng không thể tiến. **Tất cả 3 process bị kẹt**.

---

**Bài 2 — Dò chu trình RAG**

**(a) RAG:**
<svg viewBox="0 0 640 240" style="max-width:640px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Đồ thị: P1 hold R1, P3 request R1; P1 request R2, P2 hold R2; P2 request R3, P3 hold R3; P4 request R2">
  <defs><marker id="dl" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <line x1="80.0" y1="82.0" x2="80.0" y2="156.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#dl)"/>
  <rect x="52.0" y="103.6" width="34.0" height="15.0" rx="3" fill="#f8fafc" fill-opacity="1" stroke="none" stroke-width="0"/>
  <text x="69.0" y="115.6" fill="#1a202c" font-size="11" text-anchor="middle" font-weight="700">hold</text>
  <line x1="102.0" y1="180.0" x2="216.0" y2="180.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#dl)"/>
  <rect x="120.1" y="183.0" width="55.0" height="15.0" rx="3" fill="#f8fafc" fill-opacity="1" stroke="none" stroke-width="0"/>
  <text x="147.6" y="195.0" fill="#1a202c" font-size="11" text-anchor="middle" font-weight="700">request</text>
  <line x1="102.0" y1="60.0" x2="216.0" y2="60.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#dl)"/>
  <rect x="120.1" y="63.0" width="55.0" height="15.0" rx="3" fill="#f8fafc" fill-opacity="1" stroke="none" stroke-width="0"/>
  <text x="147.6" y="75.0" fill="#1a202c" font-size="11" text-anchor="middle" font-weight="700">request</text>
  <line x1="262.0" y1="60.0" x2="376.0" y2="60.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#dl)"/>
  <rect x="290.6" y="63.0" width="34.0" height="15.0" rx="3" fill="#f8fafc" fill-opacity="1" stroke="none" stroke-width="0"/>
  <text x="307.6" y="75.0" fill="#1a202c" font-size="11" text-anchor="middle" font-weight="700">hold</text>
  <line x1="400.0" y1="82.0" x2="400.0" y2="156.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#dl)"/>
  <rect x="361.5" y="103.6" width="55.0" height="15.0" rx="3" fill="#f8fafc" fill-opacity="1" stroke="none" stroke-width="0"/>
  <text x="389.0" y="115.6" fill="#1a202c" font-size="11" text-anchor="middle" font-weight="700">request</text>
  <line x1="378.0" y1="180.0" x2="264.0" y2="180.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#dl)"/>
  <rect x="315.4" y="161.0" width="34.0" height="15.0" rx="3" fill="#f8fafc" fill-opacity="1" stroke="none" stroke-width="0"/>
  <text x="332.4" y="173.0" fill="#1a202c" font-size="11" text-anchor="middle" font-weight="700">hold</text>
  <line x1="538.9" y1="148.7" x2="263.0" y2="66.8" stroke="#1a202c" stroke-width="1.8" marker-end="url(#dl)"/>
  <rect x="404.2" y="97.4" width="55.0" height="15.0" rx="3" fill="#f8fafc" fill-opacity="1" stroke="none" stroke-width="0"/>
  <text x="431.7" y="109.4" fill="#1a202c" font-size="11" text-anchor="middle" font-weight="700">request</text>
  <circle cx="80.0" cy="60.0" r="20" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <text x="80.0" y="65.0" fill="#1d4ed8" font-size="13" text-anchor="middle" font-weight="700">P1</text>
  <circle cx="240.0" cy="60.0" r="20" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <text x="240.0" y="65.0" fill="#1d4ed8" font-size="13" text-anchor="middle" font-weight="700">R2</text>
  <circle cx="400.0" cy="60.0" r="20" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <text x="400.0" y="65.0" fill="#1d4ed8" font-size="13" text-anchor="middle" font-weight="700">P2</text>
  <circle cx="80.0" cy="180.0" r="20" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <text x="80.0" y="185.0" fill="#1d4ed8" font-size="13" text-anchor="middle" font-weight="700">R1</text>
  <circle cx="400.0" cy="180.0" r="20" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <text x="400.0" y="185.0" fill="#1d4ed8" font-size="13" text-anchor="middle" font-weight="700">R3</text>
  <circle cx="240.0" cy="180.0" r="20" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <text x="240.0" y="185.0" fill="#1d4ed8" font-size="13" text-anchor="middle" font-weight="700">P3</text>
  <circle cx="560.0" cy="155.0" r="20" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <text x="560.0" y="160.0" fill="#1d4ed8" font-size="13" text-anchor="middle" font-weight="700">P4</text>
  <text x="320.0" y="232.0" fill="#475569" font-size="11" text-anchor="middle">hold: R → P · request: P → R</text>
</svg>

Dạng danh sách cạnh:
- R1 → P1, P1 → R2, R2 → P2, P2 → R3, R3 → P3, P3 → R1, P4 → R2.

**(b)** Chu trình: P1 → R2 → P2 → R3 → P3 → R1 → P1 — **chu trình tồn tại**.

**(c)** P1, P2, P3 deadlock (trong chu trình). P4 chờ R2 nhưng R2 đang bị P2 giữ, và P2 deadlock → P4 cũng bị block, nhưng P4 không trong chu trình. Khi deadlock được phá (vd: kill P2), P4 có thể tiến.

---

**Bài 3 — Thuật toán Banker**

**(a)** Tính:

\`\`\`
Need = Max - Allocation:
P0: Need = [3-1, 2-1] = [2, 1]
P1: Need = [2-1, 4-2] = [1, 2]
P2: Need = [4-2, 4-2] = [2, 2]

Available = Total - Σ(Allocation):
A: 4 - (1+1+2) = 0
B: 6 - (1+2+2) = 1
Available = [0, 1]
\`\`\`

**(b)** Tìm safe sequence:

Available = [0, 1]:

| Process | Need | [0,1] | Need ≤ Avail? |
|---------|------|-------|--------------|
| P0 | [2,1] | | 2>0 → Không |
| P1 | [1,2] | | 1>0 → Không |
| P2 | [2,2] | | 2>0 → Không |

Không có process nào chạy được → **Unsafe state**! Không tìm được safe sequence.

Đây là trạng thái nguy hiểm — có thể deadlock nếu P0, P1, P2 tiếp tục yêu cầu thêm. Cần giảm tải hoặc giải phóng tài nguyên.

**(c)** P1 yêu cầu thêm [1, 0]:

Kiểm tra: Request[P1] = [1,0] ≤ Need[P1] = [1,2]? Có (1≤1, 0≤2). ✓
Request[P1] ≤ Available = [0,1]? 1>0 → **Không thể cấp phát** (không đủ Available). P1 phải chờ.

---

**Bài 4 — Phá điều kiện Coffman**

**(a) Shared lock cho read (database):**
Phá **Mutual Exclusion** cho tài nguyên read-only. Hiệu quả với dữ liệu chỉ đọc — nhiều transaction cùng đọc không gây race condition. Nhưng write vẫn cần exclusive lock → mutual exclusion vẫn tồn tại với write. Phá một phần.

**(b) Khai báo tất cả tài nguyên ngay lúc khởi tạo:**
Phá **Hold and Wait**. Hiệu quả về mặt lý thuyết, nhưng thực tế: process thường không biết trước tất cả tài nguyên cần; giữ tài nguyên cả thời gian dài dù chưa dùng → lãng phí; có thể starvation nếu process cần nhiều tài nguyên phổ biến.

**(c) Thả mutex thứ 1 trước khi lấy mutex thứ 2:**
Phá **Hold and Wait**. Hiệu quả về deadlock, nhưng tạo "time window" giữa thả mutex1 và lấy mutex2 — dữ liệu được bảo vệ bởi mutex1 có thể bị thay đổi. Cần thiết kế cẩn thận để tránh inconsistency.

**(d) Thứ tự toàn cục lock:**
Phá **Circular Wait**. Thực tế nhất trong 4 cách — chi phí thấp (chỉ quy ước coding), không giảm hiệu năng đáng kể, không cần thay đổi cấu trúc hệ thống. Đây là pattern được khuyến nghị trong hầu hết code systems (Go, kernel Linux, database engine).

---

## Liên kết và bài tiếp theo

- Tiền đề:
  - [Lesson 06 — Semaphore & bài toán kinh điển](../lesson-06-semaphores-classic-problems/): dining philosophers — ví dụ trực tiếp về deadlock và giải pháp.
- Bài tiếp theo:
  - [Lesson 08 — IPC](../lesson-08-ipc/): sau khi hiểu đồng bộ hoá và deadlock, xem các cơ chế process giao tiếp với nhau.

---

## 📝 Tổng kết Lesson 07

1. **Deadlock** = tập process chờ tài nguyên lẫn nhau vĩnh viễn — không tự giải quyết.
2. **4 điều kiện Coffman** (tất cả phải đồng thời): Mutual Exclusion + Hold & Wait + No Preemption + Circular Wait. Phá 1 → không deadlock.
3. **RAG**: đồ thị phân bổ tài nguyên. Chu trình → deadlock (1 instance: chắc; nhiều instance: có thể).
4. **Phòng ngừa**: phá ≥ 1 Coffman điều kiện (ví dụ: thứ tự lock toàn cục phá Circular Wait).
5. **Thuật toán Banker**: kiểm tra safe state trước mỗi cấp phát. $\\text{Need} = \\text{Max} - \\text{Allocation}$. Tìm safe sequence bằng cách chọn process có $\\text{Need} \\leq \\text{Available}$, cho chạy, cộng Allocation vào Available.
6. **Phát hiện & Phục hồi**: chờ deadlock xảy ra, phát hiện bằng chu trình / thuật toán, giải quyết bằng kill process hoặc rollback.
`;
