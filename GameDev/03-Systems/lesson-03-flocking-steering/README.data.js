// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: GameDev/03-Systems/lesson-03-flocking-steering/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 13 — Flocking & Steering (đàn & hành vi lái — boids)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **emergent behavior**: đàn chim/cá hàng trăm con bay cuộn nhịp nhàng **không cần "chỉ huy"** — mỗi cá thể chỉ tuân theo vài luật cục bộ đơn giản.
- Nắm **steering behaviors** của Craig Reynolds: lực lái = *vận tốc mong muốn* − *vận tốc hiện tại*, kẹp \`maxForce\` / \`maxSpeed\`. Cài đặt được **Seek** (đuổi đích), **Flee** (trốn), **Arrive** (giảm tốc khi tới).
- Cài đặt **3 luật Boids**: **Separation** (tránh đè), **Alignment** (cùng hướng lân cận), **Cohesion** (về tâm đàn) — mỗi luật là một **lực vector**.
- Biết **tổng hợp có trọng số**: \`F = w₁·sep + w₂·align + w₃·cohesion\`, và đổi trọng số → đổi hành vi (bầy chặt / tản / cuộn).
- Hiểu khái niệm **lân cận (neighbors)**: chỉ xét boid trong bán kính + góc nhìn; chi phí ngây thơ O(n²) và vì sao cần broad-phase.
- Mở rộng: **tránh chướng ngại (obstacle avoidance)**, **wander (lang thang)**, **pursue/evade (đuổi–trốn dự đoán)**.

## Kiến thức tiền đề

- [L11 — Particle Systems](../lesson-01-particle-systems/) — boid là một particle có thêm "trí tuệ" để tự chọn lực lái.
- [L02 — Vectors & Kinematics](../../01-Motion/lesson-02-vectors-kinematics/) — cộng/trừ vector, độ dài (magnitude), chuẩn hoá (normalize), kẹp độ dài (clamp/limit). Bài này dùng liên tục.
- [L04 — Forces: Gravity, Drag, Friction](../../01-Motion/lesson-04-forces-gravity-drag-friction/) — định luật II Newton \`a = F/m\`, tích lũy lực rồi tích phân vận tốc/vị trí.
- [L08 — Broad-phase & Quadtree](../../02-Collision/lesson-03-broadphase-quadtree/) — dùng lại để tìm lân cận nhanh thay vì duyệt mọi cặp.

> Ký hiệu vector trong bài: in **đậm** (vd **v**) hoặc dùng cặp toạ độ \`(x, y)\`. \`|v|\` = độ dài; \`v̂\` = vector đơn vị (chuẩn hoá, độ dài 1). Mọi phép cộng/trừ là theo từng thành phần: \`(a,b) + (c,d) = (a+c, b+d)\`.

## 1. Vì sao học Flocking & Steering?

**💡 Trực giác / Hình dung.** Nhìn một đàn sáo đá (starling murmuration) hàng nghìn con: chúng cuộn, tách, nhập lại như một sinh vật khổng lồ. Câu hỏi tự nhiên:

> Đàn chim hàng trăm con bay cuộn nhịp nhàng — **có "chỉ huy" nào ra lệnh cho cả đàn không? Lập trình thế nào để hàng trăm con tự bay thành đàn?**

Câu trả lời (đóng ngay trong bài này, không bỏ ngỏ): **không có chỉ huy.** Năm 1986 Craig Reynolds chứng minh chỉ cần **mỗi con tuân theo 3 luật cục bộ** — nhìn các con **lân cận** rồi (1) đừng đè lên nhau, (2) bay cùng hướng, (3) hướng về cụm — thì **hành vi đàn phức tạp tự "trồi lên" (emergent)** mà không ai lập trình hình dạng đàn cả. Reynolds gọi mỗi cá thể là **boid** (viết tắt của "bird-oid object" — vật thể giống chim).

Ứng dụng thực tế:

- **Đồ hoạ phim & game**: đàn dơi trong *Batman Returns* (1992) là ứng dụng boids đầu tiên trên màn ảnh; sau đó là đàn linh dầu trong *The Lion King*, đám đông trong *Lord of the Rings* (engine MASSIVE).
- **AI di chuyển trong game**: NPC đám đông (zombie horde, đàn quái), bầy đơn vị RTS di chuyển không chồng lên nhau, cá/chim trang trí trong open-world.
- **Robotics & mô phỏng**: điều khiển bầy drone (swarm), mô phỏng giao thông, mô phỏng đám đông thoát hiểm.

**Ý tưởng cốt lõi — emergent behavior từ luật đơn giản:** Hành vi toàn cục (đàn cuộn) **không** được mã hoá trực tiếp. Nó là **hệ quả** của nhiều cá thể chạy cùng một bộ luật cục bộ + tương tác. Đây là chủ đề xuyên suốt: ta không "vẽ" đường bay của đàn, ta chỉ định luật cho từng con.

**❓ Câu hỏi tự nhiên của người đọc.**

- *"Boid khác particle (L11) ở đâu?"* → Particle bị động: chịu lực ngoài (trọng lực, gió) rồi bay theo. Boid **chủ động**: nó *quan sát môi trường* (các lân cận) rồi **tự tính ra lực lái** để đạt mục tiêu. Boid = particle + một "bộ não" nhỏ tính lực mỗi frame.
- *"Có cần vật lý phức tạp không?"* → Không. Boid dùng đúng cơ học của L04: tích lũy lực → \`a = F/m\` → cập nhật \`v\`, \`pos\`. Cái mới chỉ là **cách tính lực** (steering), không phải cách tích phân.

**📝 Tóm tắt mục 1.**
- Đàn chim không có chỉ huy; hành vi đàn là **emergent** từ luật cục bộ của từng cá thể.
- **Boid** = cá thể tự lái; Reynolds (1986) đặt nền với 3 luật + steering.
- Ứng dụng: phim, AI đám đông trong game, swarm robotics.
- Boid = particle (L11) + bộ não tính lực lái mỗi frame; vật lý vẫn là L04.

## 2. Steering Behaviors (Reynolds)

### 2.1 Công thức lõi: steering = desired − velocity

**💡 Trực giác.** Bạn đang đi bộ về hướng tây (vận tốc hiện tại), nhưng muốn rẽ về quán cà phê ở hướng bắc (vận tốc *mong muốn*). Để rẽ, bạn không "dịch chuyển tức thời" sang hướng bắc — bạn **đẩy** người mình một chút về phía bắc mỗi bước. Cái "đẩy một chút mỗi bước" đó chính là **lực lái (steering force)**.

Reynolds gói gọn mọi hành vi lái vào **một công thức**:

$$\\textbf{steering} = \\textbf{v}_{\\text{desired}} - \\textbf{v}_{\\text{current}}$$

trong đó:

- **(a) Là gì.** \`steering\` là vector lực ta cộng vào gia tốc của boid frame này. Nó "chỉnh" vận tốc hiện tại dần dần về vận tốc mong muốn.
- **(b) Vì sao cần.** Nếu ta gán thẳng \`v = v_desired\` thì boid **quay đầu tức thời** — trông như giật/teleport, không tự nhiên. Trừ ra rồi cộng dần (qua gia tốc) cho ra **đường cong mượt** — đó là điều khiến boids trông "sống".
- **(c) Ví dụ trực giác bằng số.** Boid đang chạy \`v_current = (3, 0)\` (sang phải). Muốn \`v_desired = (0, 3)\` (lên trên). Thì \`steering = (0,3) − (3,0) = (−3, 3)\`. Lực này kéo boid vừa giảm tốc sang phải vừa tăng tốc lên trên → frame sau \`v\` cong dần lên.

Sau khi có \`steering\`, ta áp đúng cơ học L04:

\`\`\`
acceleration += steering / mass     // a = F/m  (mass=1 cho gọn → a += steering)
velocity     += acceleration        // tích phân Euler (L03)
velocity      = limit(velocity, maxSpeed)
position     += velocity
acceleration  = (0, 0)              // reset mỗi frame
\`\`\`

### 2.2 Hai cái kẹp bắt buộc: maxSpeed và maxForce

Có **hai giới hạn** không thể thiếu:

- **\`maxSpeed\`** — tốc độ tối đa boid chạy. Kẹp **độ dài của \`velocity\`**. Không có nó, boid tăng tốc vô hạn.
- **\`maxForce\`** — lực lái tối đa mỗi frame (mô phỏng "khả năng bẻ lái" hữu hạn — như xe có bán kính quay vòng tối thiểu). Kẹp **độ dài của \`steering\`**.

Hàm \`limit(v, max)\` (kẹp độ dài vector về tối đa \`max\`, giữ nguyên hướng):

\`\`\`
function limit(v, max):
    m = |v|                  // độ dài hiện tại
    if m > max:
        return v * (max / m) // co lại đúng chiều dài max, giữ hướng
    return v                 // đã ngắn hơn max → giữ nguyên
\`\`\`

**⚠ Lỗi thường gặp — quên kẹp maxForce → giật.** Nếu không \`limit(steering, maxForce)\`, khi đích ở xa thì \`v_desired\` rất lớn → \`steering\` khổng lồ → boid **bẻ lái tức thời 180°**, trông như giật/teleport. Đúng phải: lái bị giới hạn → boid **lượn vòng cung** để đổi hướng, mới ra cảm giác tự nhiên. Đây là lỗi #1 của người mới viết boids.

### 2.3 Seek — đuổi tới một đích

**💡 Trực giác.** Như con mèo đi thẳng tới bát cơm: luôn hướng mũi về phía bát, chạy hết tốc lực.

Công thức:

$$\\textbf{v}_{\\text{desired}} = \\widehat{(\\textbf{target} - \\textbf{pos})} \\cdot \\text{maxSpeed}, \\qquad \\textbf{steering} = \\text{limit}(\\textbf{v}_{\\text{desired}} - \\textbf{v}, \\ \\text{maxForce})$$

Nghĩa là: hướng mong muốn = từ boid **tới** đích (chuẩn hoá), nhân \`maxSpeed\` để chạy hết ga; rồi trừ vận tốc hiện tại và kẹp.

**Walk-through Seek (4 ví dụ số).** Cho \`maxSpeed = 5\`, \`maxForce = 1\`.

| # | pos | target | v hiện tại | \`target−pos\` | \`v_desired\` (chuẩn hoá × 5) | \`desired − v\` | \`steering\` (kẹp ≤ 1) |
|---|-----|--------|-----------|-------------|------------------------------|---------------|----------------------|
| 1 | (0,0) | (10,0) | (0,0) | (10,0), |·|=10 | (5,0) | (5,0), |·|=5 | (1,0) ← kẹp |
| 2 | (0,0) | (0,10) | (5,0) | (0,10), |·|=10 | (0,5) | (−5,5), |·|≈7.07 | (−0.707, 0.707) ← kẹp |
| 3 | (4,3) | (4,3) | (2,0) | (0,0), |·|=0 | (0,0) đích trùng | (−2,0) | (−1,0) ← kẹp (phanh lại) |
| 4 | (0,0) | (3,4) | (3,4) | (3,4), |·|=5 | (3,4) (đã max, cùng hướng) | (0,0) | (0,0) — bay thẳng |

Đọc kỹ ví dụ #2: \`desired − v = (0,5) − (5,0) = (−5, 5)\`, độ dài \`√(25+25) ≈ 7.07 > 1\` → kẹp: nhân \`1/7.07\` → \`(−0.707, 0.707)\`. Ví dụ #4: vận tốc đã đúng hướng & đủ nhanh → steering = 0, không cần lái.

### 2.4 Flee — trốn khỏi một điểm

Flee là Seek **đảo dấu**: hướng mong muốn là *rời xa* đích thay vì *tới*.

$$\\textbf{v}_{\\text{desired}} = \\widehat{(\\textbf{pos} - \\textbf{target})} \\cdot \\text{maxSpeed}$$

**Walk-through Flee (cùng \`maxSpeed=5, maxForce=1\`).**

| # | pos | "kẻ thù" | v | \`pos−enemy\` | \`v_desired\` | \`steering\` (kẹp) |
|---|-----|---------|---|-------------|-------------|------------------|
| 1 | (0,0) | (10,0) | (0,0) | (−10,0) | (−5,0) | (−1,0) — chạy ngược lại |
| 2 | (5,5) | (0,0) | (0,0) | (5,5), |·|≈7.07 | (3.54,3.54) | (0.707,0.707) |
| 3 | (0,0) | (0,−4) | (0,3) | (0,4) | (0,5) | (0,1) — tăng tốc bỏ chạy |
| 4 | (2,0) | (2,0) | (1,1) | (0,0) | (0,0) trùng điểm | (−0.707,−0.707) |

(Thường Flee chỉ kích hoạt khi kẻ thù trong một bán kính \`panicDistance\`; ngoài bán kính thì lực = 0.)

### 2.5 Arrive — tới đích rồi dừng êm

**💡 Trực giác.** Seek đụng đích sẽ **vọt qua rồi quay lại, dao động quanh đích** (như xe phanh gấp trượt qua vạch). Arrive thêm "phanh từ từ": khi còn xa thì chạy max, khi vào gần một **bán kính giảm tốc (slowing radius)** \`r\` thì giảm tốc tuyến tính về 0 đúng tại đích.

Công thức:

$$d = |\\textbf{target} - \\textbf{pos}|, \\qquad \\text{speed} = \\begin{cases} \\text{maxSpeed} & d \\ge r \\\\ \\text{maxSpeed} \\cdot \\dfrac{d}{r} & d < r \\end{cases}$$

$$\\textbf{v}_{\\text{desired}} = \\widehat{(\\textbf{target} - \\textbf{pos})} \\cdot \\text{speed}$$

**Walk-through Arrive (\`maxSpeed=5\`, slowing radius \`r=4\`).**

| # | d = khoảng cách | so với r=4 | speed mong muốn | ghi chú |
|---|-----------------|-----------|------------------|---------|
| 1 | 10 | ≥ 4 | 5 (full) | còn xa, chạy hết ga |
| 2 | 4 | = 4 | 5·(4/4) = 5 | đúng mép vùng giảm tốc |
| 3 | 2 | < 4 | 5·(2/4) = 2.5 | đã giảm còn nửa tốc |
| 4 | 0.5 | < 4 | 5·(0.5/4) = 0.625 | sắp tới, bò chậm |
| 5 | 0 | < 4 | 0 | dừng hẳn tại đích ✓ |

→ Tốc độ giảm **tuyến tính** từ \`maxSpeed\` (mép vùng) về 0 (tâm). Không còn dao động quanh đích.

**🔁 Dừng lại tự kiểm tra.**
1. Boid \`v=(4,0)\`, muốn \`v_desired=(4,0)\` (y hệt). \`steering = ?\` Có cần bẻ lái không?
2. Vì sao Arrive cần \`slowing radius\` còn Seek thì không?

<details><summary>Đáp án</summary>

1. \`steering = (4,0) − (4,0) = (0,0)\`. Không cần bẻ lái — boid đã đi đúng hướng & đúng tốc, cứ bay thẳng.
2. Seek luôn chạy \`maxSpeed\` tới đích → khi tới nơi vận tốc vẫn lớn → vọt qua, dao động. Arrive dùng \`slowing radius\` để giảm tốc về 0 đúng tại đích → dừng êm, không vọt.
</details>

**📝 Tóm tắt mục 2.**
- Mọi hành vi lái = **một** công thức: \`steering = desired − velocity\`, rồi \`limit(·, maxForce)\`.
- **Bắt buộc 2 kẹp**: \`maxSpeed\` (kẹp velocity), \`maxForce\` (kẹp steering). Quên \`maxForce\` → giật.
- **Seek**: desired hướng *tới* đích × maxSpeed. **Flee**: hướng *rời xa*. **Arrive**: như Seek nhưng giảm tốc tuyến tính trong \`slowing radius\` để dừng êm.

## 3. Ba luật Boids

Đây là trái tim của bài. Mỗi luật biến danh sách **lân cận** (neighbors) của một boid thành **một lực vector**. Ta định nghĩa "lân cận" chi tiết ở §5; tạm hiểu: các boid đủ gần.

### 3.1 Separation — tránh đè lên nhau

**💡 Trực giác.** Trong thang máy đông, bạn vô thức **đẩy ra xa** người sát mình nhất. Càng sát càng đẩy mạnh.

- **(a) Là gì.** Lực **đẩy ra xa** các lân cận, để boid không chồng lên nhau.
- **(b) Vì sao cần.** Không có Separation thì Cohesion (luật 3, kéo về tâm) sẽ ép tất cả **tụ về một điểm** — đàn co lại thành một chấm. Separation giữ khoảng cách cá nhân.
- **(c) Cách tính.** Với mỗi lân cận \`j\`: lấy vector **từ j tới mình** = \`pos − pos_j\` (hướng đẩy ra xa), **chia cho khoảng cách** (càng gần đẩy càng mạnh), cộng tất cả lại rồi chuẩn hoá về \`maxSpeed\`, trừ velocity, kẹp \`maxForce\`.

$$\\textbf{sep} = \\sum_{j \\in N} \\frac{\\textbf{pos} - \\textbf{pos}_j}{|\\textbf{pos} - \\textbf{pos}_j|}$$

(chia thêm cho khoảng cách lần nữa nếu muốn lực ∝ 1/d² — ở đây dùng 1/d cho dễ tính tay).

### 3.2 Alignment — bay cùng hướng lân cận

**💡 Trực giác.** Trong dòng người đi bộ trên phố đông, bạn vô thức **đi cùng nhịp & hướng** với người xung quanh.

- **(a) Là gì.** Lực kéo **vận tốc của mình** về **vận tốc trung bình** của các lân cận.
- **(b) Vì sao cần.** Đây là thứ làm đàn "chảy" cùng một dòng. Không có nó, các boid gần nhau nhưng bay loạn hướng.
- **(c) Cách tính.** Lấy **trung bình velocity** các lân cận → đó là \`v_desired\` → trừ velocity hiện tại → kẹp.

$$\\bar{\\textbf{v}} = \\frac{1}{|N|}\\sum_{j \\in N} \\textbf{v}_j, \\qquad \\textbf{align} = \\text{limit}(\\bar{\\textbf{v}} - \\textbf{v}, \\ \\text{maxForce})$$

### 3.3 Cohesion — hướng về tâm đàn

**💡 Trực giác.** Bạn lạc nhóm bạn trong hội chợ → bạn đi về phía **trung tâm chỗ cả nhóm đang đứng**.

- **(a) Là gì.** Lực kéo boid về **vị trí trung bình (tâm khối)** của các lân cận.
- **(b) Vì sao cần.** Giữ đàn **tụ lại** thành cụm thay vì tản ra vô hạn.
- **(c) Cách tính.** Tính tâm = trung bình \`pos\` lân cận, rồi **Seek** tới tâm đó.

$$\\textbf{center} = \\frac{1}{|N|}\\sum_{j \\in N} \\textbf{pos}_j, \\qquad \\textbf{cohesion} = \\text{Seek}(\\textbf{center})$$

### 3.4 Walk-through: tính 3 lực cho 1 boid với số thật

Đây là phần cấm dùng chữ "tương tự" — tính từng bước.

**Thiết lập.** Boid **A** đang xét:
- \`pos_A = (0, 0)\`, \`v_A = (2, 0)\`.
- 3 lân cận:
  - B: \`pos_B = (2, 0)\`, \`v_B = (1, 1)\`
  - C: \`pos_C = (0, 3)\`, \`v_C = (0, 2)\`
  - D: \`pos_D = (−4, 0)\`, \`v_D = (3, 0)\`
- \`maxSpeed = 4\`, \`maxForce = 1\`.

---

**(1) Separation** — đẩy ra xa từng lân cận, trọng số 1/d:

Với mỗi lân cận, vector \`(pos_A − pos_j)\`, độ dài \`d\`, đóng góp \`(pos_A − pos_j)/d\`:

- với B: \`(0,0)−(2,0) = (−2,0)\`, \`d=2\` → đóng góp \`(−2,0)/2 = (−1, 0)\`
- với C: \`(0,0)−(0,3) = (0,−3)\`, \`d=3\` → đóng góp \`(0,−3)/3 = (0, −1)\`
- với D: \`(0,0)−(−4,0) = (4,0)\`, \`d=4\` → đóng góp \`(4,0)/4 = (1, 0)\`

Tổng thô: \`(−1,0) + (0,−1) + (1,0) = (0, −1)\`.

Chuẩn hoá về \`maxSpeed=4\`: \`(0,−1)\` có độ dài 1 → \`v_desired = (0, −4)\`.
\`steering = desired − v_A = (0,−4) − (2,0) = (−2, −4)\`, độ dài \`√(4+16)=√20 ≈ 4.47 > 1\`
→ **kẹp maxForce=1**: nhân \`1/4.47\` → **sep ≈ (−0.447, −0.894)**.

Đọc nghĩa: lực Separation kéo A xuống dưới và hơi sang trái (đẩy A khỏi C ở trên và "cân bằng" B/D hai bên).

---

**(2) Alignment** — về vận tốc trung bình lân cận:

\`v̄ = (v_B + v_C + v_D)/3 = ((1,1)+(0,2)+(3,0))/3 = (4, 3)/3 = (1.333, 1.0)\`.

\`steering = v̄ − v_A = (1.333, 1.0) − (2, 0) = (−0.667, 1.0)\`, độ dài \`√(0.444+1.0)=√1.444 ≈ 1.20 > 1\`
→ **kẹp**: nhân \`1/1.20\` → **align ≈ (−0.555, 0.832)**.

Đọc nghĩa: trung bình lân cận bay lên-phải; A đang bay ngang phải → lực Alignment kéo A ngóc lên & giảm bớt tốc ngang.

---

**(3) Cohesion** — Seek tới tâm khối lân cận:

\`center = (pos_B + pos_C + pos_D)/3 = ((2,0)+(0,3)+(−4,0))/3 = (−2, 3)/3 = (−0.667, 1.0)\`.

Hướng từ A tới tâm: \`center − pos_A = (−0.667, 1.0)\`, độ dài \`√(0.444+1.0) ≈ 1.20\`.
Chuẩn hoá × \`maxSpeed=4\`: \`(−0.667,1.0)/1.20 × 4 = (−0.555, 0.832) × 4 = (−2.22, 3.33)\` = \`v_desired\`.
\`steering = v_desired − v_A = (−2.22, 3.33) − (2,0) = (−4.22, 3.33)\`, độ dài \`√(17.8+11.1)=√28.9 ≈ 5.38 > 1\`
→ **kẹp**: nhân \`1/5.38\` → **cohesion ≈ (−0.785, 0.619)**.

Đọc nghĩa: tâm đàn nằm trên-trái A → lực Cohesion kéo A về phía đó.

---

**Ba lực thành phần của A (sau kẹp, chưa nhân trọng số):**

| Luật | Lực vector | Ý nghĩa |
|------|-----------|---------|
| Separation | (−0.447, −0.894) | đẩy ra xa lân cận sát |
| Alignment | (−0.555, 0.832) | xoay về hướng trung bình đàn |
| Cohesion | (−0.785, 0.619) | kéo về tâm đàn |

Mục §4 sẽ trộn 3 lực này theo trọng số. (Viz module C vẽ đúng 3 vector này — chỉnh số sẽ thấy mũi tên đổi.)

**❓ Câu hỏi tự nhiên của người đọc.**
- *"Vì sao Separation chia cho d còn Cohesion thì không?"* → Separation muốn **gần thì đẩy mạnh hơn** (1/d), nên chia khoảng cách. Cohesion chỉ cần biết *tâm* nằm đâu rồi Seek — không cần trọng theo khoảng cách.
- *"Nếu boid không có lân cận nào thì sao?"* → Cả 3 lực = 0 (tổng rỗng, tránh chia cho 0). Boid bay thẳng theo quán tính — đúng như con chim lạc đàn.
- *"Tính 3 lực mỗi boid mỗi frame có đắt không?"* → Phần đắt không phải 3 phép cộng, mà là **tìm lân cận** — xem §5.

**🔁 Dừng lại tự kiểm tra.**
1. Đàn co tụ thành một chấm duy nhất — thiếu luật nào?
2. Các boid gần nhau nhưng bay loạn xạ mỗi con một hướng — yếu luật nào?

<details><summary>Đáp án</summary>

1. Thiếu (hoặc quá yếu) **Separation**. Cohesion kéo vào tâm mà không có gì đẩy ra → tụ một điểm.
2. Yếu **Alignment** — không có lực đồng bộ hướng bay.
</details>

**📝 Tóm tắt mục 3.**
- **Separation** = đẩy ra xa lân cận (trọng số 1/d) → tránh đè.
- **Alignment** = kéo velocity về trung bình velocity lân cận → cùng hướng.
- **Cohesion** = Seek tới tâm khối lân cận → tụ thành đàn.
- Mỗi luật trả về **một lực vector** đã kẹp \`maxForce\`; không có lân cận → lực = 0.

## 4. Trọng số & tổng hợp

**💡 Trực giác.** Ba luật như ba "giọng" trong dàn nhạc. Vặn to giọng nào thì đàn nghiêng theo tính cách đó. Lực cuối là **tổng có trọng số**:

$$\\textbf{F} = w_1 \\cdot \\textbf{sep} + w_2 \\cdot \\textbf{align} + w_3 \\cdot \\textbf{cohesion}$$

rồi \`acceleration += F\` (sau khi đã kẹp từng lực thành phần; nhiều cài đặt còn kẹp luôn \`F\` tổng về \`maxForce\`).

**Walk-through tổng hợp (dùng 3 lực thành phần của boid A ở §3.4).** Nhắc lại:
\`sep = (−0.447, −0.894)\`, \`align = (−0.555, 0.832)\`, \`cohesion = (−0.785, 0.619)\`.

**Ví dụ 1 — cân bằng \`w = (1, 1, 1)\` (đàn "bình thường"):**
\`F = (−0.447−0.555−0.785, −0.894+0.832+0.619) = (−1.787, 0.557)\`.

**Ví dụ 2 — đề cao Separation \`w = (2, 1, 1)\` (đàn lỏng, giãn cách):**
\`F = (2·−0.447 −0.555 −0.785, 2·−0.894 +0.832 +0.619) = (−0.894−1.34, −1.788+1.451) = (−2.234, −0.337)\`.
→ Thành phần y đổi **từ dương sang âm**: Separation mạnh kéo A xuống xa C, lấn át lực kéo lên.

**Ví dụ 3 — đề cao Cohesion \`w = (1, 1, 3)\` (bầy chặt, dính cụm):**
\`F = (−0.447 −0.555 +3·−0.785, −0.894 +0.832 +3·0.619) = (−0.447−0.555−2.355, −0.894+0.832+1.857) = (−3.357, 1.795)\`.
→ Lực kéo về tâm đàn áp đảo → các boid bám cụm chặt.

**Ví dụ 4 — chỉ Alignment \`w = (0, 1, 0)\` (đàn "chảy" thành dòng, không tụ):**
\`F = (−0.555, 0.832)\`. Boid chỉ đồng bộ hướng, không tụ cũng không đẩy → giống dòng cá lượn song song.

| Bộ trọng số (sep, align, coh) | Hành vi quan sát |
|-------------------------------|------------------|
| (1, 1, 1) | Đàn cân bằng, cuộn tự nhiên |
| (2, 1, 1) | Đàn **lỏng**, các con giãn cách rộng |
| (1, 1, 3) | Bầy **chặt**, dính thành cụm đặc |
| (0, 1, 0) | "Dòng chảy" cùng hướng, không tụ |
| (3, 0.2, 0.2) | Gần như khí lý tưởng — đẩy nhau, ít kết đàn |

**⚠ Lỗi thường gặp — cohesion mạnh → tụ một điểm.** Đặt \`w_cohesion\` quá lớn so với \`w_separation\` → mọi boid bị hút về tâm mà không gì đẩy ra → **cả đàn co thành một chấm rung lập bập**. Quy tắc ngón tay cái: giữ \`w_separation ≳ w_cohesion\`. Trong nhiều cài đặt phổ biến: \`sep=1.5, align=1.0, coh=1.0\`.

**❓ Câu hỏi tự nhiên.** *"Trọng số là cố định hay đổi theo lúc?"* → Có thể đổi động: tăng \`w_separation\` khi gặp kẻ thù (tản ra né), tăng \`w_cohesion\` khi an toàn (kết đàn). Đó là cách game làm cho đàn "phản ứng".

**📝 Tóm tắt mục 4.**
- Lực cuối = tổng **có trọng số** của 3 lực thành phần.
- Đổi trọng số → đổi tính cách đàn: chặt / lỏng / dòng chảy.
- Giữ \`w_separation ≳ w_cohesion\` để tránh tụ một điểm.
- Trọng số có thể đổi động theo ngữ cảnh (gặp kẻ thù → tản).

## 5. Lân cận (neighbors) — ai được tính?

**💡 Trực giác.** Con chim không "thấy" cả đàn — nó chỉ phản ứng với **vài con quanh nó trong tầm mắt**. Hai tiêu chí lọc lân cận:

1. **Bán kính cảm nhận \`perceptionRadius\`**: chỉ xét boid cách mình ≤ \`r\`. Khoảng cách lớn hơn → bỏ qua.
2. **Góc nhìn \`viewAngle\` (tùy chọn)**: chỉ xét boid nằm trong "nón nhìn" phía trước. Boid ngay sau lưng bị loại — vì con chim không có mắt sau gáy.

Kiểm tra góc nhìn dùng **tích vô hướng (dot product, L02)**: gọi \`toOther = pos_j − pos_i\` (đã chuẩn hoá), \`heading = v_i\` (đã chuẩn hoá). Nếu \`dot(heading, toOther) ≥ cos(viewAngle/2)\` thì j nằm trong nón nhìn.

**Walk-through góc nhìn (4 ví dụ, \`viewAngle = 180°\` → ngưỡng \`cos(90°) = 0\`).**

| # | heading (đã norm) | hướng tới j (đã norm) | dot | ≥ 0? | kết luận |
|---|-------------------|------------------------|-----|------|----------|
| 1 | (1,0) | (1,0) thẳng trước | 1.0 | có | thấy |
| 2 | (1,0) | (0,1) bên hông | 0.0 | có (=ngưỡng) | thấy (rìa) |
| 3 | (1,0) | (−1,0) thẳng sau | −1.0 | không | **bỏ** |
| 4 | (1,0) | (−0.7,0.7) chéo sau | −0.7 | không | **bỏ** |

→ Với góc 180°, mọi thứ phía trước & ngang đều thấy, chỉ bỏ phía sau lưng.

### 5.1 Chi phí O(n²) và lý do cần broad-phase

**Cách ngây thơ.** Để tìm lân cận của *mỗi* boid, ta duyệt *mọi* boid khác đo khoảng cách. Với \`n\` boid: mỗi boid xét \`n−1\` con → tổng \`n·(n−1)/2 ≈ n²/2\` cặp. Đây là **O(n²)**.

**Walk-through chi phí (số thật):**

| n boid | số cặp ≈ n²/2 | nhận xét |
|--------|----------------|----------|
| 50 | 1 250 | nhẹ |
| 200 | 20 000 | còn ổn 60fps |
| 1 000 | 500 000 | bắt đầu khựng |
| 5 000 | 12 500 000 | **rớt frame nặng** |

**⚠ Lỗi thường gặp — O(n²) chậm.** Người mới để vòng lặp lồng \`for i: for j\` rồi thả 3 000 boid → tụt còn vài fps. Bản chất là 99% phép đo khoảng cách bị **lãng phí** với những con ở mãi xa.

**Cách nhanh — broad-phase (spatial partitioning).** Chia không gian thành lưới ô (spatial hash grid) hoặc cây (quadtree). Mỗi boid chỉ hỏi **các ô lân cận** chứ không phải cả đàn → chi phí tụt về gần **O(n)** (mỗi boid chỉ xét ~hằng số con trong vùng). Đây chính là kỹ thuật đã học ở [L08 — Broad-phase & Quadtree](../../02-Collision/lesson-03-broadphase-quadtree/) — cùng một cây quadtree dùng cho phát hiện va chạm, nay tái sử dụng để truy vấn lân cận. (Viz module A dùng grid đơn giản để chạy mượt hàng trăm boid.)

**📝 Tóm tắt mục 5.**
- Lân cận = boid trong \`perceptionRadius\` **và** trong \`viewAngle\` (lọc bằng dot product).
- Cách ngây thơ là **O(n²)** — chậm khi n lớn.
- **Broad-phase** (grid / quadtree từ L08) đưa về ~O(n) bằng cách chỉ hỏi ô lân cận.

## 6. Mở rộng: tránh chướng ngại, wander, đuổi–trốn

### 6.1 Obstacle avoidance — tránh vật cản

**💡 Trực giác.** Bạn đi mà thấy cột điện phía trước → bẻ người sang một bên *trước khi* đụng. Không đợi chạm rồi mới né.

Cách phổ biến: phóng một **"ăng-ten" (feeler)** dọc theo hướng bay (dài ~vài lần \`maxSpeed\`). Nếu feeler cắt một chướng ngại, tạo **lực lái vuông góc** đẩy boid ra khỏi mặt vật cản. Lực này thường có **trọng số cao** (ưu tiên hơn flocking — thà tản đàn còn hơn đâm tường).

Ví dụ số: boid \`pos=(0,0)\`, \`v=(5,0)\` (đi sang phải), feeler dài 10 → đầu feeler ở \`(10,0)\`. Có hình tròn cản tâm \`(8,1)\` bán kính 2. Feeler đi qua gần tâm → lực né hướng **vuông góc ra xa** mặt cản, vd \`≈ (0, −1)·maxForce\` (đẩy xuống để vòng dưới vật cản).

### 6.2 Wander — lang thang tự nhiên

**💡 Trực giác.** Một con thú không có đích cụ thể không đứng im, cũng không đi đường thẳng cứng — nó **đi loanh quanh ngẫu nhiên nhưng mượt**.

Cách của Reynolds (mượt, không giật): tưởng tượng một **vòng tròn nhỏ phía trước** boid; trên vòng có một điểm mục tiêu; mỗi frame **xê dịch điểm đó một góc ngẫu nhiên nhỏ** rồi **Seek** tới nó. Vì điểm chỉ lệch chút mỗi frame nên hướng đổi mượt.

So sánh sai/đúng:
- ❌ Mỗi frame chọn hướng random hoàn toàn → boid **rung lập bập tại chỗ** (random walk thuần).
- ✅ Lệch góc nhỏ trên vòng tròn → đường đi cong **mượt, có quán tính**.

### 6.3 Pursue & Evade — đuổi và trốn có dự đoán

- **Pursue (đuổi)** = Seek nhưng nhắm tới **vị trí tương lai** của mục tiêu, không phải vị trí hiện tại. Dự đoán: \`future = pos_target + v_target · T\` với \`T\` ∝ khoảng cách. Như hậu vệ đoán đường chuyền.
- **Evade (trốn)** = Flee khỏi vị trí tương lai của kẻ săn.

Ví dụ số (Pursue): mục tiêu \`pos=(10,0)\`, \`v=(0,2)\`, chọn \`T=3\` → \`future=(10,0)+(0,2)·3=(10,6)\`. Boid Seek tới \`(10,6)\` thay vì \`(10,0)\` → chặn đầu thay vì đuổi đuôi.

**📝 Tóm tắt mục 6.**
- **Obstacle avoidance**: feeler về phía trước, lực né vuông góc, trọng số cao.
- **Wander**: Seek tới điểm trên vòng tròn nhỏ phía trước, xê dịch góc nhỏ mỗi frame → cong mượt.
- **Pursue/Evade**: Seek/Flee tới vị trí **dự đoán** của mục tiêu (\`pos + v·T\`).
- Tất cả vẫn là cùng một khuôn \`steering = desired − velocity\`.

## 7. Liên hệ với các bài khác

- **Particle Systems (L11)**: boid kế thừa toàn bộ cơ chế particle (pos, vel, acc, tích phân). Khác biệt duy nhất: boid **tự tính lực lái** từ môi trường. Nếu đã làm hệ particle, thêm boids chỉ là thay hàm tính lực.
- **Vectors & Kinematics (L02)**: bài này dùng cộng/trừ vector, \`normalize\`, \`magnitude\`, \`limit\`, và \`dot product\` (cho góc nhìn) ở **mọi công thức**. Nếu đoạn nào thấy mơ hồ về vector, quay lại L02.
- **Forces (L04)**: \`acceleration += steering\`, \`a = F/m\` — y hệt cách tích lũy trọng lực/drag. Steering chỉ là *thêm một nguồn lực*.
- **Broad-phase & Quadtree (L08)**: tái dùng để truy vấn lân cận nhanh → cho phép hàng nghìn boid chạy mượt.
- **ECS & Architecture (L14, bài tiếp)**: khi có hàng nghìn boid, tổ chức dữ liệu kiểu **data-oriented (ECS)** thay vì mỗi boid một object giúp cache-friendly & nhanh hơn nhiều — [xem L14](../lesson-04-ecs-architecture/).

## 8. Bài tập

**Bài 1.** Cho \`maxSpeed = 6\`, \`maxForce = 2\`. Boid \`pos=(0,0)\`, \`v=(2,2)\`, đích \`target=(0,10)\`. Tính lực **Seek** (gồm: \`v_desired\`, \`desired − v\`, lực sau khi kẹp \`maxForce\`).

**Bài 2.** Cùng số liệu Bài 1 nhưng tính lực **Flee** khỏi điểm \`(0,10)\` (coi như kẻ thù). So sánh hướng với kết quả Seek.

**Bài 3.** **Arrive**: \`maxSpeed=8\`, \`slowing radius r=5\`. Tính \`speed\` mong muốn tại các khoảng cách \`d = 12, 5, 2.5, 0\`. Vẽ (bằng lời) đồ thị speed theo d.

**Bài 4.** Boid \`A pos=(0,0)\`. Hai lân cận: \`B pos=(1,0)\`, \`C pos=(0,2)\`. Tính **lực Separation thô** (chưa chuẩn hoá/kẹp), dùng trọng số \`1/d\`. Lân cận nào đẩy mạnh hơn? Vì sao?

**Bài 5.** Cùng A, B, C ở Bài 4 với \`v_B=(2,0)\`, \`v_C=(0,4)\`. Tính **Alignment** \`v̄\` (velocity trung bình lân cận) và **Cohesion center** (tâm khối lân cận).

**Bài 6.** Cho 3 lực thành phần \`sep=(−1,0)\`, \`align=(0,1)\`, \`cohesion=(1,1)\`. Tính lực tổng \`F\` với hai bộ trọng số: (a) \`(1,1,1)\`; (b) \`(2,1,0.5)\`. Bộ nào làm đàn lỏng hơn?

**Bài 7.** Góc nhìn \`viewAngle = 120°\` → ngưỡng \`cos(60°) = 0.5\`. Boid heading \`(0,1)\` (đi lên). Với mỗi lân cận đã chuẩn hoá hướng tới, xác định *thấy / không thấy*: (a) \`(0,1)\`; (b) \`(0.5, 0.866)\`; (c) \`(1,0)\`; (d) \`(0,−1)\`.

**Bài 8.** Với \`n\` boid, cách ngây thơ là \`n²/2\` cặp. Một boid xét trung bình \`k=8\` lân cận khi dùng grid. Tính số phép đo cho \`n=2000\` ở (a) cách ngây thơ; (b) cách grid. Tỉ lệ tăng tốc?

**Bài 9.** (Khái niệm) Mô tả điều gì xảy ra với đàn nếu đặt \`maxForce\` **rất lớn** (gần ∞). Vì sao? Liên hệ §2.2.

**Bài 10.** (Pursue) Mục tiêu \`pos=(20,0)\`, \`v=(−2,4)\`. Boid của bạn ở \`(0,0)\`, chọn \`T=2\`. Tính **vị trí dự đoán** rồi cho biết boid nên Seek tới đâu.

## Lời giải chi tiết

### Bài 1 — Seek

\`maxSpeed=6, maxForce=2\`, \`pos=(0,0)\`, \`v=(2,2)\`, \`target=(0,10)\`.

- \`target − pos = (0,10)\`, độ dài \`10\`. Chuẩn hoá: \`(0,1)\`. Nhân maxSpeed: \`v_desired = (0,6)\`.
- \`desired − v = (0,6) − (2,2) = (−2, 4)\`, độ dài \`√(4+16)=√20 ≈ 4.47\`.
- \`4.47 > maxForce=2\` → kẹp: nhân \`2/4.47 ≈ 0.447\` → **steering ≈ (−0.894, 1.789)**.

Cách tiếp cận: luôn theo 3 bước desired → trừ v → kẹp. Độ phức tạp O(1).

### Bài 2 — Flee

Flee đảo dấu hướng: \`pos − enemy = (0,0)−(0,10) = (0,−10)\`, chuẩn hoá \`(0,−1)\`, ×6 → \`v_desired=(0,−6)\`.
\`desired − v = (0,−6)−(2,2) = (−2,−8)\`, độ dài \`√(4+64)=√68 ≈ 8.25\` → kẹp \`2/8.25 ≈ 0.2424\` → **steering ≈ (−0.485, −1.94)**.

So sánh: Seek kéo boid **lên** (+y) về đích; Flee kéo **xuống** (−y) rời đích. Cả hai cùng có thành phần x âm vì phải triệt tiêu \`v_x=2\` đang có. Hướng y ngược nhau đúng như kỳ vọng.

### Bài 3 — Arrive

\`maxSpeed=8, r=5\`. \`speed = maxSpeed\` nếu \`d≥r\`, ngược lại \`maxSpeed·d/r\`.

- \`d=12 ≥ 5\` → speed = 8 (full).
- \`d=5 = 5\` → 8·(5/5) = 8 (mép vùng giảm tốc).
- \`d=2.5 < 5\` → 8·(2.5/5) = 4.
- \`d=0\` → 8·(0/5) = 0 (dừng).

Đồ thị: từ d lớn tới d=5 speed phẳng = 8; từ d=5 về d=0 speed **giảm tuyến tính** 8 → 0. Hình "vai phẳng rồi dốc thẳng xuống gốc".

### Bài 4 — Separation thô

\`A=(0,0)\`, \`B=(1,0)\`, \`C=(0,2)\`.

- với B: \`A−B = (−1,0)\`, \`d=1\` → \`(−1,0)/1 = (−1, 0)\`.
- với C: \`A−C = (0,−2)\`, \`d=2\` → \`(0,−2)/2 = (0, −1)\`.
- Tổng thô: \`(−1, −1)\`.

B đẩy **mạnh hơn** (độ lớn 1) so với C (độ lớn 0.5) vì B gần hơn (d=1 < d=2). Trọng số 1/d làm lân cận sát đẩy mạnh hơn — đúng ý đồ Separation.

### Bài 5 — Alignment & Cohesion

- **Alignment**: \`v̄ = (v_B + v_C)/2 = ((2,0)+(0,4))/2 = (2,4)/2 = (1, 2)\`.
- **Cohesion center**: \`(pos_B + pos_C)/2 = ((1,0)+(0,2))/2 = (1,2)/2 = (0.5, 1)\`.

(Đây mới là \`v̄\` và \`center\`; muốn ra *lực* thì Alignment lấy \`v̄ − v_A\` rồi kẹp, Cohesion thì Seek tới \`center\`.)

### Bài 6 — Tổng hợp trọng số

\`sep=(−1,0)\`, \`align=(0,1)\`, \`coh=(1,1)\`.

(a) \`(1,1,1)\`: \`F = (−1+0+1, 0+1+1) = (0, 2)\`.

(b) \`(2,1,0.5)\`: \`F = (2·−1 + 0 + 0.5·1, 2·0 + 1 + 0.5·1) = (−2+0.5, 1+0.5) = (−1.5, 1.5)\`.

Bộ (b) **lỏng hơn**: trọng số Separation cao gấp đôi và Cohesion bị giảm còn 0.5 → lực đẩy ra xa lấn át lực kéo vào tâm → các boid giãn cách rộng hơn.

### Bài 7 — Góc nhìn

heading \`(0,1)\`, ngưỡng \`0.5\`. Tính \`dot(heading, toj)\` (cả hai đã chuẩn hoá):

- (a) \`(0,1)\`: dot = \`0·0 + 1·1 = 1.0 ≥ 0.5\` → **thấy**.
- (b) \`(0.5,0.866)\`: dot = \`0·0.5 + 1·0.866 = 0.866 ≥ 0.5\` → **thấy**.
- (c) \`(1,0)\`: dot = \`0·1 + 1·0 = 0 < 0.5\` → **không thấy** (ngang hông, ngoài nón 120°).
- (d) \`(0,−1)\`: dot = \`−1 < 0.5\` → **không thấy** (sau lưng).

### Bài 8 — Chi phí O(n²) vs grid

\`n=2000\`.
- (a) Ngây thơ: \`n²/2 = 2000²/2 = 4 000 000 / 2 = 2 000 000\` phép đo.
- (b) Grid: mỗi boid xét \`k=8\` lân cận → \`n·k = 2000·8 = 16 000\` phép đo.
- Tỉ lệ tăng tốc: \`2 000 000 / 16 000 = 125×\` nhanh hơn.

(Thực tế grid còn tốn chút chi phí dựng/truy vấn lưới, nhưng bậc độ phức tạp tụt từ O(n²) về ~O(n).)

### Bài 9 — maxForce rất lớn

Nếu \`maxForce → ∞\`, lực lái **không bị kẹp** → mỗi frame \`steering = desired − v\` được áp nguyên → vận tốc **nhảy thẳng** về \`v_desired\` ngay lập tức. Hệ quả: boid **đổi hướng tức thời (giật/teleport hướng)**, mất hết cảm giác quán tính, đường bay gãy khúc thay vì cong mượt. Đây đúng là lỗi "quên kẹp maxForce" ở §2.2 — \`maxForce\` chính là thứ giới hạn "khả năng bẻ lái" và tạo ra các đường cong tự nhiên.

### Bài 10 — Pursue

Mục tiêu \`pos=(20,0)\`, \`v=(−2,4)\`, \`T=2\`.
- Vị trí dự đoán: \`future = pos + v·T = (20,0) + (−2,4)·2 = (20,0) + (−4,8) = (16, 8)\`.
- Boid nên **Seek tới \`(16, 8)\`** thay vì \`(20,0)\` → chặn đầu mục tiêu ở nơi nó *sắp* tới, thay vì đuổi theo nơi nó *đang* ở.

## Tham khảo và bài tiếp theo

- Bài gốc kinh điển: Craig W. Reynolds, *"Flocks, Herds, and Schools: A Distributed Behavioral Model"* (SIGGRAPH 1987) và *"Steering Behaviors For Autonomous Characters"* (GDC 1999).
- Tiền đề liên quan:
  - [L11 — Particle Systems](../lesson-01-particle-systems/) — nền cơ học của boid.
  - [L02 — Vectors & Kinematics](../../01-Motion/lesson-02-vectors-kinematics/) — vector, normalize, dot, limit.
  - [L04 — Forces](../../01-Motion/lesson-04-forces-gravity-drag-friction/) — tích lũy lực, \`a=F/m\`.
  - [L08 — Broad-phase & Quadtree](../../02-Collision/lesson-03-broadphase-quadtree/) — truy vấn lân cận nhanh.
- Bài tiếp theo: [L14 — ECS & Architecture](../lesson-04-ecs-architecture/) — tổ chức hàng nghìn boid theo kiến trúc data-oriented.
- Minh họa tương tác: [visualization.html](./visualization.html) — (A) đàn boids realtime với 3 slider trọng số + bán kính lân cận; (B) steering Seek/Flee/Arrive theo chuột; (C) một boid + lân cận vẽ 3 lực thành phần.
`;
