# Lesson 11 — Particle Systems (hệ hạt: khói, lửa, nước)

> Bài **mở đầu Tier 3 — Systems & Architecture**. Hai tier trước dạy mô phỏng **vài** vật thể "nặng" (có va chạm, có ma sát, xếp chồng). Tier 3 đổi câu hỏi: làm sao quản **hàng nghìn** vật thể "nhẹ" cùng lúc mà vẫn mượt 60 fps? Particle system là câu trả lời đầu tiên — và là nền cho cloth, rope, flocking ở các bài sau.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **particle (hạt)** là gì: một struct nhỏ gồm vị trí, vận tốc, tuổi/lifetime, size, màu, alpha — và **vòng đời** spawn → update → die → recycle.
- Cài **emitter (bộ phát)** phát hạt theo **rate (hạt/giây)** với vận tốc/góc ngẫu nhiên — và hiểu vì sao cần **accumulator** khi rate nhỏ hơn 1 hạt/frame.
- Áp **lực** lên hạt: trọng lực, gió, lực hút/đẩy về một điểm (attractor) — tái dùng tích phân Euler từ [Lesson 03](../../01-Motion/lesson-03-integration-euler-verlet/).
- **Nội suy (interpolation / lerp)** size, alpha, màu theo tuổi hạt — để lửa chuyển vàng → đỏ → khói, để hạt **phai dần** thay vì biến mất đột ngột.
- Hiểu **object pool (bể tái dùng)** — vì sao cấp phát/giải phóng mỗi frame gây **GC giật (stutter)**, và cách tái dùng hạt chết để tránh.

## Kiến thức tiền đề

- [Lesson 03 — Integration (Euler/Verlet)](../../01-Motion/lesson-03-integration-euler-verlet/) — **bắt buộc**. Mỗi hạt update vị trí từ vận tốc bằng đúng tích phân Euler ở bài này.
- [Lesson 04 — Forces: Gravity, Drag, Friction](../../01-Motion/lesson-04-forces-gravity-drag-friction/) — **bắt buộc**. Trọng lực, gió, drag áp lên hạt là lực ở mức quen thuộc của bài này.
- [Lesson 10 — Friction, Resting & Stacking](../../02-Collision/lesson-05-friction-resting-stacking/) — bài trước. Hạt thường **bỏ qua** va chạm chính xác (quá tốn cho hàng nghìn hạt); ta sẽ thấy vì sao và mức xấp xỉ chấp nhận được.

---

## 1. Vì sao học hệ hạt?

💡 **Hình dung.** Hãy nhìn một vụ nổ trong game. Trông như "một quả cầu lửa", nhưng nếu tua chậm: nó là **hàng trăm chấm sáng nhỏ** bắn ra mọi hướng, mỗi chấm bay theo quán tính, sáng lên rồi tối dần, đổi từ trắng → cam → đỏ → xám rồi tắt. Không có chấm nào "biết" mình là một phần của vụ nổ — chúng chỉ là những hạt độc lập tuân theo cùng vài quy tắc. Mắt người **gộp** chúng lại thành "lửa". Đó là toàn bộ ý tưởng của particle system: **hiệu ứng phức tạp = rất nhiều hạt đơn giản**.

Mở bài bằng một câu hỏi cụ thể mà ai làm game cũng gặp:

> **Một vụ nổ trong game gồm những gì? Làm sao quản 1000 hạt — mỗi hạt có vị trí, vận tốc, màu, tuổi thọ riêng — mà vẫn chạy mượt 60 fps, không giật?**

Khói, lửa, nước bắn, mưa, tuyết, pháo hoa, bụi khi nhân vật chạy, vệt sáng của đạn, bong bóng dưới nước — tất cả là cùng một kỹ thuật. Khác nhau chỉ ở **tham số**: lực nào tác động, hạt sống bao lâu, màu đổi thế nào, phát từ đâu với tốc độ ra sao.

Bài này trả lời câu hỏi mở bằng 5 mảnh ghép:

1. **Particle** (§2) — một hạt gồm gì.
2. **Emitter** (§3) — phát ra bao nhiêu hạt, theo hướng nào.
3. **Lực** (§4) — cái gì đẩy hạt đi (trọng lực, gió, attractor).
4. **Nội suy theo tuổi** (§5) — hạt đổi hình dạng/màu/độ trong khi sống.
5. **Object pool** (§6) — mẹo để 1000 hạt không làm giật game.

❓ **Vì sao không dùng va chạm chính xác cho hạt như Tier 2?** Vì quá đắt. Tier 2 giải va chạm $n$ vật là $O(n^2)$ cặp (hoặc $O(n \log n)$ với quadtree) — chấp nhận được với 50 thùng hàng. Với 5000 hạt khói, riêng broadphase đã ngốn hết ngân sách 16.6 ms/frame. Hạt vì thế **hi sinh độ chính xác**: phần lớn hạt **bỏ qua va chạm** hoàn toàn (khói, lửa), hoặc chỉ kiểm tra với **vài mặt phẳng tĩnh** như sàn (nước bắn nảy lên). Đây là đánh đổi điển hình của game: **trông đúng** quan trọng hơn **đúng tuyệt đối**.

---

## 2. Particle — một hạt gồm gì

💡 **Hình dung.** Một hạt giống một con đom đóm dùng một lần: nó sinh ra ở đâu đó, bay theo một hướng, sáng lên rồi mờ dần, và **chết** sau vài giây. Mọi thứ "con đom đóm" cần nhớ về bản thân = các **thuộc tính (attribute)** của hạt.

### 2.1 Cấu trúc

Một hạt tối thiểu là một bó số. Trong Go:

```go
type Particle struct {
    Px, Py   float64 // vị trí (position)
    Vx, Vy   float64 // vận tốc (velocity)
    Age      float64 // tuổi: đã sống bao lâu (giây)
    Lifetime float64 // tổng tuổi thọ: sống được bao lâu thì chết
    Size     float64 // bán kính / cạnh khi vẽ (pixel)
    R, G, B  float64 // màu (0..255)
    Alpha    float64 // độ mờ (0 = trong suốt, 1 = đặc)
    Alive    bool    // còn sống không (dùng cho object pool, §6)
}
```

⚠ **Vì sao tách `Age` và `Lifetime` thành hai trường?** Vì ta cần **cả hai**: `Age` tăng dần mỗi frame (đo "đã sống bao lâu"), `Lifetime` cố định lúc spawn (đo "được sống bao lâu"). Tỉ số `t = Age / Lifetime` chạy từ 0 (mới sinh) tới 1 (sắp chết) — đây là "đồng hồ chuẩn hóa" để nội suy màu/size (§5). Nếu chỉ lưu một biến "thời gian còn lại" thì vẫn được, nhưng phải biết lifetime gốc mới tính được tỉ số → lưu cả hai gọn hơn.

### 2.2 Bốn ví dụ thuộc tính cụ thể

Cùng một struct, khác giá trị → ra hiệu ứng khác hẳn:

| # | Hiệu ứng | Px,Py (spawn) | Vx,Vy | Lifetime | Size | Màu RGB | Alpha |
|---|----------|---------------|-------|----------|------|---------|-------|
| 1 | **Tàn lửa** (spark) | nguồn lửa (200, 300) | (40, −120) bay lên | 0.8 s | 3 px | (255, 200, 60) vàng | 1.0 |
| 2 | **Cuộn khói** | ống khói (150, 100) | (5, −20) lên chậm | 4.0 s | 18 px | (90, 90, 95) xám | 0.5 |
| 3 | **Giọt nước** | vòi (300, 50) | (0, 60) rơi xuống | 2.5 s | 4 px | (80, 160, 255) xanh | 0.9 |
| 4 | **Hạt nổ** | tâm nổ (400, 400) | (250, −80) bắn xa | 1.2 s | 6 px | (255, 240, 180) trắng-cam | 1.0 |

Để ý: tàn lửa **nhỏ, sáng, sống ngắn, bay lên**; khói **to, mờ, sống lâu, dâng chậm**; giọt nước **rơi xuống**; hạt nổ **vận tốc lớn nhất**. Toàn bộ "tính cách" của hiệu ứng nằm ở 4 dòng số này.

### 2.3 Vòng đời (lifecycle)

Mỗi hạt đi qua đúng 4 giai đoạn, lặp lại mỗi frame ở giai đoạn 2:

```
1. SPAWN   : emitter sinh hạt → đặt Px,Py,Vx,Vy,Lifetime,màu...; Age = 0; Alive = true
2. UPDATE  : mỗi frame, Δt giây:
                Age += Δt
                áp lực → đổi Vx,Vy        (§4)
                Px += Vx·Δt; Py += Vy·Δt  (tích phân Euler, L03)
                nội suy Size/Alpha/màu theo Age/Lifetime  (§5)
3. DIE     : khi Age ≥ Lifetime → Alive = false
4. RECYCLE : trả hạt chết về pool để emitter dùng lại  (§6)
```

📌 Bước UPDATE (vị trí từ vận tốc) **chính xác** là tích phân Euler ở [Lesson 03](../../01-Motion/lesson-03-integration-euler-verlet/): `pos += vel·Δt`. Hạt không cần Verlet hay RK4 — Euler "đủ tốt" vì hạt sống ngắn, sai số tích lũy không kịp lộ ra, và ta cần **rẻ × hàng nghìn lần**.

🔁 **Dừng lại tự kiểm tra.** Một hạt có `Age = 0.6`, `Lifetime = 0.8`. (a) Tỉ số tuổi `t` là bao nhiêu? (b) Sau 0.3 s nữa hạt còn sống không?

<details><summary>Đáp án</summary>

(a) `t = Age / Lifetime = 0.6 / 0.8 = 0.75` → hạt đã sống 75% đời, sắp chết.

(b) Sau 0.3 s, `Age = 0.6 + 0.3 = 0.9 > 0.8 = Lifetime` → **chết** (đã vượt lifetime). Thực tế nó chết ngay tại frame mà `Age` lần đầu vượt 0.8.
</details>

📝 **Tóm tắt §2.** (1) Hạt = struct nhỏ: vị trí, vận tốc, age/lifetime, size, màu, alpha. (2) `t = Age/Lifetime` ∈ [0,1] là đồng hồ chuẩn hóa cho mọi nội suy. (3) Vòng đời: spawn → update (Euler) → die (Age≥Lifetime) → recycle. (4) Cùng struct, khác tham số → khói/lửa/nước/nổ.

---

## 3. Emitter — phát hạt thế nào

💡 **Hình dung.** Emitter là cái **vòi phun**: nó đứng một chỗ và liên tục nhả hạt ra. Hai thứ phải quyết: phun **bao nhiêu hạt mỗi giây** (rate), và mỗi hạt bay ra **theo hướng nào** (với chút ngẫu nhiên để trông tự nhiên — không hạt nào bay y hệt hạt nào).

### 3.1 Phát theo rate + accumulator

Game chạy theo **frame**, không theo "giây liên tục". Nếu emitter muốn phun **rate = 200 hạt/giây** và mỗi frame dài `Δt = 1/60 s`, thì mỗi frame phải sinh:

$$
\text{hạt mỗi frame} = \text{rate} \times \Delta t = 200 \times \frac{1}{60} = 3.333\ldots
$$

Nhưng ta **không thể** sinh 3.333 hạt — số hạt phải nguyên. Sinh 3? Mất 0.333 hạt/frame → 20 hạt/giây bị nuốt mất. Làm tròn lên 4? Phun dư.

⚠ **Lỗi thường gặp: rate nhỏ hơn 1 hạt/frame mà không dùng accumulator → không hạt nào ra.** Nếu rate = 30/giây thì mỗi frame cần `30/60 = 0.5` hạt. `int(0.5) = 0` → emitter **chết im**, không phun gì cả, mãi mãi. Đây là bug kinh điển: "tôi set rate thấp và particle biến mất hoàn toàn".

**Lời giải: accumulator (bộ tích lũy).** Giữ một biến `acc` cộng dồn "phần hạt lẻ" qua các frame, chỉ phun khi đủ một hạt nguyên:

```go
type Emitter struct {
    Rate float64 // hạt/giây
    acc  float64 // bộ tích lũy phần lẻ
    Px, Py float64
}

func (e *Emitter) Update(dt float64, spawn func()) {
    e.acc += e.Rate * dt        // cộng "số hạt cần sinh" frame này
    for e.acc >= 1 {            // lấy ra phần nguyên
        spawn()
        e.acc -= 1
    }
    // phần lẻ < 1 giữ lại cho frame sau
}
```

### 3.2 Walk-through bằng số thật — rate 200/giây, Δt = 1/60

Theo dõi `acc` qua 5 frame đầu. Mỗi frame cộng `200 × (1/60) = 3.3333`:

| Frame | acc trước | + 3.3333 | acc sau cộng | Phun (số nguyên lấy ra) | acc còn lại |
|------:|----------:|---------:|-------------:|:-----------------------:|------------:|
| 1 | 0.0000 | → | 3.3333 | **3** hạt | 0.3333 |
| 2 | 0.3333 | → | 3.6667 | **3** hạt | 0.6667 |
| 3 | 0.6667 | → | 4.0000 | **4** hạt | 0.0000 |
| 4 | 0.0000 | → | 3.3333 | **3** hạt | 0.3333 |
| 5 | 0.3333 | → | 3.6667 | **3** hạt | 0.6667 |

Tổng 5 frame: 3+3+4+3+3 = **16 hạt**. Kiểm tra: 5 frame = `5/60 = 0.08333 s`, mong đợi `200 × 0.08333 = 16.667` hạt. Đã phun 16, còn 0.667 "nợ" trong `acc` chờ frame 6 → **khớp, không mất hạt**. Số hạt/frame tự dao động 3–4 quanh trung bình 3.333 → đúng rate về dài hạn.

Với rate nhỏ (30/giây = 0.5 hạt/frame): frame 1 acc=0.5 (phun 0), frame 2 acc=1.0 (phun **1**), frame 3 acc=0.5 (phun 0)... → trung bình 1 hạt mỗi 2 frame = 30/giây. **Có accumulator thì rate thấp vẫn ra hạt**, chỉ ra cách quãng.

### 3.3 Vận tốc & góc ngẫu nhiên

Phun hạt cùng một vận tốc y hệt → trông như tia laser cứng đờ. Trông tự nhiên cần **ngẫu nhiên trong một khoảng**. Hai tham số:

- **Góc (angle)**: hướng trung tâm ± **spread (độ xòe)**. Vòi nước bắn lên: góc trung tâm = 90° (lên trên), spread = 15° → mỗi hạt bay trong khoảng 75°–105°.
- **Tốc độ (speed)**: trong khoảng `[speedMin, speedMax]`. Nổ: 150–300 px/s; khói lờ đờ: 10–30 px/s.

```go
func (e *Emitter) spawnVelocity(angleCenter, spread, speedMin, speedMax float64) (vx, vy float64) {
    angle := angleCenter + (rand.Float64()*2 - 1) * spread // ± spread
    speed := speedMin + rand.Float64()*(speedMax-speedMin)
    return math.Cos(angle) * speed, math.Sin(angle) * speed
}
```

Ví dụ số: góc trung tâm `−π/2` (lên, hệ trục y hướng xuống), spread `0.26 rad` (~15°), speed 80–140. Một lần gọi có thể ra `angle = −1.45 rad`, `speed = 112` → `vx = cos(−1.45)·112 ≈ 14.3`, `vy = sin(−1.45)·112 ≈ −111.1`. Hạt bay gần như thẳng lên, hơi lệch phải. Lần gọi khác ra số khác → cả chùm xòe tự nhiên.

🔁 **Dừng lại tự kiểm tra.** Emitter rate = 90/giây, game 60 fps. (a) Trung bình bao nhiêu hạt/frame? (b) Sau đúng 1 giây, đã phun bao nhiêu hạt (giả sử acc bắt đầu từ 0)?

<details><summary>Đáp án</summary>

(a) `90 × (1/60) = 1.5` hạt/frame → mỗi frame phun xen kẽ 1 hoặc 2 hạt (acc dao động 0.5 ↔ 1.0 ↔ 1.5).

(b) Sau 1 giây = 60 frame: tổng `90 × 1 = 90` hạt (accumulator đảm bảo về dài hạn đúng rate; sai lệch chỉ ≤ 1 hạt đang "treo" trong acc).
</details>

📝 **Tóm tắt §3.** (1) Emitter phun theo rate (hạt/giây); mỗi frame cần `rate·Δt` hạt — thường không nguyên. (2) **Accumulator** cộng dồn phần lẻ, phun khi ≥ 1 → không mất hạt, rate thấp vẫn ra. (3) Vận tốc = góc (center ± spread) + tốc độ (min..max) ngẫu nhiên → chùm hạt trông tự nhiên.

---

## 4. Lực lên hạt

💡 **Hình dung.** Sau khi emitter "ném" hạt ra với vận tốc ban đầu, **lực** quyết định phần còn lại của chuyến bay. Trọng lực kéo hạt xuống (nước rơi), gió thổi ngang (khói nghiêng), một "nam châm" hút hạt về tâm (xoáy nước, lỗ đen). Mỗi frame: cộng gia tốc từ lực vào vận tốc, rồi tích phân vị trí — đúng quy trình [Lesson 04](../../01-Motion/lesson-04-forces-gravity-drag-friction/).

### 4.1 Ba loại lực thường dùng

Theo định luật II Newton, gia tốc `a = F/m`. Hạt thường coi `m = 1` cho rẻ → `a = F`. Mỗi frame:

```go
// gravity: kéo xuống đều (y hướng xuống dương)
p.Vy += gravity * dt            // gravity ví dụ = 300 px/s²

// gió: lực ngang đều
p.Vx += windX * dt              // windX ví dụ = 40 px/s²

// attractor: hút về điểm (ax, ay), độ mạnh G
dx, dy := ax-p.Px, ay-p.Py
dist := math.Hypot(dx, dy) + 1e-3      // +epsilon tránh chia 0
fx, fy := dx/dist, dy/dist             // hướng đơn vị tới tâm
p.Vx += fx * G * dt                    // G>0 hút, G<0 đẩy
p.Vy += fy * G * dt
```

⚠ **Lỗi thường gặp: chia cho khoảng cách = 0.** Khi hạt **trùng** tâm attractor, `dist = 0` → chia 0 → vận tốc thành `NaN`/`Inf`, hạt "biến mất" hoặc văng ra vô cực. Luôn cộng một `epsilon` nhỏ (hoặc kẹp `dist` ở mức tối thiểu) trước khi chia.

### 4.2 Bốn ví dụ hành vi theo loại hiệu ứng

| # | Hiệu ứng | Lực chính | Hệ quả nhìn thấy |
|---|----------|-----------|------------------|
| 1 | **Lửa** | trọng lực **âm** (đẩy lên, vì khí nóng nhẹ hơn) + nhiễu ngang nhỏ | lưỡi lửa **liếm lên**, lung lay |
| 2 | **Nước** | trọng lực **dương** (rơi) + va sàn → nảy với hệ số phục hồi < 1 | giọt **rơi xuống rồi nảy** thấp dần |
| 3 | **Khói** | trọng lực âm yếu (bay lên rất chậm) + gió ngang + drag | cuộn khói **dâng lờ đờ**, nghiêng theo gió |
| 4 | **Pháo hoa** | nổ ra mọi hướng (vận tốc lớn ban đầu) rồi trọng lực dương | bùng tỏa rồi **rủ xuống** thành ô |

📌 **Va sàn cho nước** dùng đúng ý tưởng hệ số phục hồi và tiếp xúc từ [Lesson 10](../../02-Collision/lesson-05-friction-resting-stacking/), nhưng **xấp xỉ rẻ**: chỉ kiểm tra hạt với **một mặt phẳng sàn** (không phải mọi hạt với mọi hạt). Khi `Py > floorY`: đặt `Py = floorY`, đảo dấu `Vy` và nhân hệ số nảy (vd `Vy = -Vy * 0.5`). Đó là lý do hạt được phép bỏ qua hệ thống va chạm $O(n^2)$ đầy đủ.

🔁 **Dừng lại tự kiểm tra.** Một hạt nước có `Vy = 60`, `Py = 398`, sàn `floorY = 400`, hệ số nảy 0.5, `Δt = 1/60`. Frame này hạt làm gì?

<details><summary>Đáp án</summary>

Trọng lực: `Vy += 300·(1/60) = 60 + 5 = 65`. Vị trí: `Py += 65·(1/60) = 398 + 1.083 = 399.08` — **chưa** chạm sàn (399.08 < 400), nên frame này chưa nảy. Vài frame sau khi `Py` vượt 400: kẹp `Py = 400`, `Vy = −65·0.5 = −32.5` → bật ngược lên với nửa tốc độ.
</details>

📝 **Tóm tắt §4.** (1) Mỗi frame: cộng gia tốc lực vào vận tốc, rồi Euler vị trí (L03/L04). (2) Trọng lực (rơi/bay lên), gió (ngang), attractor (hút/đẩy về điểm). (3) Hạt bỏ qua va chạm đầy đủ; chỉ va vài mặt phẳng tĩnh như sàn — đủ "trông đúng". (4) Nhớ epsilon khi chia khoảng cách trong attractor.

---

## 5. Biến thiên & nội suy theo tuổi

💡 **Hình dung.** Hạt không đứng yên về hình dạng: tàn lửa **co nhỏ và mờ dần** khi nguội; khói **phình to và loãng ra**; lửa đổi màu **vàng → cam → đỏ → xám**. Tất cả gắn với **tuổi** hạt. Công cụ: **nội suy tuyến tính (linear interpolation, lerp)** — trộn giữa giá trị "lúc sinh" và "lúc chết" theo tỉ số tuổi.

### 5.1 Công thức lerp

$$
\text{lerp}(a, b, t) = a + (b - a)\cdot t, \qquad t \in [0, 1]
$$

`t` là **tỉ số tuổi** `t = Age / Lifetime`. `t = 0`: ra đúng `a` (giá trị lúc sinh). `t = 1`: ra đúng `b` (lúc chết). `t = 0.5`: chính giữa.

Bốn ví dụ số (lerp trên một đại lượng):

| # | Đại lượng | a (sinh) | b (chết) | t | lerp = a+(b−a)·t |
|---|-----------|---------:|---------:|---:|------------------:|
| 1 | Alpha (lửa) | 1.0 | 0.0 | 0.25 | 1 + (0−1)·0.25 = **0.75** |
| 2 | Size (khói) | 6 | 24 | 0.50 | 6 + (24−6)·0.5 = **15** |
| 3 | Alpha (lửa) | 1.0 | 0.0 | 0.80 | 1 + (−1)·0.8 = **0.20** |
| 4 | Size (tàn lửa co) | 5 | 1 | 1.00 | 5 + (1−5)·1 = **1** |

### 5.2 Walk-through đầy đủ — một tàn lửa qua đời

Tàn lửa: `Lifetime = 0.8 s`. Size lerp `5 → 1`, alpha lerp `1.0 → 0.0`. Màu lerp qua 2 chặng (vàng → đỏ → khói). Theo dõi tại 5 mốc tuổi, `Δt` gộp lại cho gọn:

| Age (s) | t = Age/0.8 | Size = lerp(5,1,t) | Alpha = lerp(1,0,t) | Màu (lerp vàng→đỏ→xám) |
|--------:|------------:|-------------------:|--------------------:|------------------------|
| 0.00 | 0.00 | 5 + (1−5)·0 = **5.00** | 1 − 1·0 = **1.00** | (255,200,60) vàng |
| 0.20 | 0.25 | 5 + (−4)·0.25 = **4.00** | **0.75** | (255,150,40) cam |
| 0.40 | 0.50 | 5 + (−4)·0.50 = **3.00** | **0.50** | (220,70,30) đỏ |
| 0.60 | 0.75 | 5 + (−4)·0.75 = **2.00** | **0.25** | (140,90,80) đỏ-xám |
| 0.80 | 1.00 | 5 + (−4)·1.00 = **1.00** | **0.00** | (90,90,95) khói, tắt |

Đọc bảng: hạt **co từ 5 px xuống 1 px**, **mờ từ đặc về trong suốt**, **đổi màu vàng nóng → đỏ → xám nguội**. Tại `t = 1` alpha = 0 → hạt tự "tắt mượt" đúng lúc chết.

⚠ **Lỗi thường gặp: quên giảm alpha → hạt chết đột ngột.** Nếu để `Alpha = 1` suốt đời rồi xóa hạt khi `Age ≥ Lifetime`, mắt người thấy hạt **biến mất phụp** giữa màn hình — rất giả. Phải lerp alpha về 0 (hoặc dùng đường cong "sáng nhanh, tắt chậm") để hạt **phai dần ra**. Đây là khác biệt lớn nhất giữa particle "nghiệp dư" và "mượt".

❓ **Câu hỏi tự nhiên.**

- *"Lerp có nhất thiết tuyến tính không?"* Không. Tuyến tính là rẻ nhất và đủ đẹp cho phần lớn trường hợp. Muốn "bùng sáng rồi tắt từ từ" thì dùng đường cong (ease-out, hoặc alpha = `sin(π·t)` để 0→1→0). Nhưng bắt đầu hãy dùng lerp tuyến tính.
- *"Đổi màu nhiều chặng (vàng→đỏ→khói) làm sao?"* Chia tuổi thành các đoạn: `t` trong [0, 0.5] lerp vàng→đỏ; [0.5, 1] lerp đỏ→khói. Mỗi đoạn remap `t` về [0,1] cục bộ. Đây là **gradient nhiều chặng (color gradient)**.
- *"Size lerp âm thì sao?"* Đừng để b < 0. Nếu cần hạt "biến mất bằng thu nhỏ", lerp size về một số dương nhỏ (vd 0.5) và để alpha lo phần tắt hẳn.

🔁 **Dừng lại tự kiểm tra.** Khói: `Lifetime = 4 s`, size lerp `8 → 30`, alpha lerp `0.6 → 0`. Hạt ở `Age = 3 s`. Size và alpha hiện tại?

<details><summary>Đáp án</summary>

`t = 3/4 = 0.75`. Size = `8 + (30−8)·0.75 = 8 + 16.5 = 24.5 px`. Alpha = `0.6 + (0−0.6)·0.75 = 0.6 − 0.45 = 0.15` → gần như tan hết, đúng lúc cuộn khói loãng ra trước khi biến mất.
</details>

📝 **Tóm tắt §5.** (1) `lerp(a,b,t) = a + (b−a)·t`, `t = Age/Lifetime`. (2) Nội suy size/alpha/màu theo tuổi → lửa vàng→đỏ→khói, hạt co và phai. (3) **Luôn lerp alpha về 0** để hạt tắt mượt, không phụp đột ngột. (4) Màu nhiều chặng = lerp từng đoạn; đường cong (ease) cho hiệu ứng đẹp hơn lerp thẳng.

---

## 6. Object pool — vì sao không cấp phát mỗi frame

💡 **Hình dung.** Tưởng tượng một quán cà phê mua **cốc giấy mới** cho mỗi khách rồi vứt đi — núi rác chất lên, lúc lúc phải dừng cả quán để hốt rác (đó là **GC — garbage collector** dọn bộ nhớ). Một hệ hạt phun 5000 hạt/giây mà `new Particle()` mỗi hạt rồi để nó chết = đúng cái quán đó. Giải pháp: dùng **cốc sứ** — rửa rồi tái dùng. Đó là **object pool**: cấp phát một mảng hạt **một lần**, rồi tái dùng các ô của hạt đã chết.

### 6.1 Vấn đề: GC giật (stutter)

⚠ **Lỗi thường gặp: cấp phát/giải phóng hạt mỗi frame → GC giật.** Ở rate 5000 hạt/giây, mỗi giây tạo và bỏ 5000 object. Bộ nhớ rác phình nhanh; khi GC chạy để dọn, nó **tạm dừng** chương trình vài ms — đủ để rớt từ 60 fps xuống giật khựng (frame spike). Người chơi thấy game "khựng" mỗi khi có nhiều hiệu ứng. Đây là vấn đề **số lượng lớn**: với 50 thùng hàng (Tier 2) chẳng sao, với hàng nghìn hạt thì chết.

### 6.2 Lời giải: pool tái dùng

Cấp phát trước một mảng cố định. Hạt "chết" không bị giải phóng — chỉ đánh dấu `Alive = false` và **tái dùng** ô đó cho hạt mới:

```go
type Pool struct {
    particles []Particle // cấp phát MỘT lần, cố định
}

func NewPool(max int) *Pool {
    return &Pool{particles: make([]Particle, max)} // tất cả Alive=false ban đầu
}

// Lấy một ô chết để spawn (tái dùng, KHÔNG cấp phát mới)
func (pl *Pool) Spawn() *Particle {
    for i := range pl.particles {
        if !pl.particles[i].Alive {
            pl.particles[i] = Particle{Alive: true} // reset & dùng lại ô cũ
            return &pl.particles[i]
        }
    }
    return nil // pool đầy → bỏ qua hạt này (không vượt ngân sách)
}

func (pl *Pool) Update(dt float64) {
    for i := range pl.particles {
        p := &pl.particles[i]
        if !p.Alive { continue }
        p.Age += dt
        if p.Age >= p.Lifetime { p.Alive = false; continue } // "chết" = chỉ set false
        // ... áp lực + tích phân + lerp ...
    }
}
```

Điểm mấu chốt: bộ nhớ **không bao giờ** được cấp/giải sau lần `make` đầu. GC không có gì để dọn → không giật. Khi pool đầy (vượt `max`), hạt mới bị **bỏ qua** — chấp nhận được, vì giới hạn cứng số hạt cũng là cách giữ ngân sách 60 fps.

❓ **Câu hỏi tự nhiên.**

- *"Quét cả mảng tìm ô chết có chậm không?"* Với vài nghìn ô thì rẻ. Muốn nhanh hơn, giữ một **free list** (stack các chỉ số ô rỗng) → spawn là pop, die là push, O(1). Bắt đầu bằng quét tuyến tính cho đơn giản, tối ưu sau khi đo.
- *"Vì sao chọn max cố định mà không cho lớn vô hạn?"* Vì ngân sách render và CPU hữu hạn. `max = 5000` vừa giới hạn bộ nhớ, vừa đảm bảo vòng update không bao giờ quá 5000 vòng/frame → fps ổn định, dự đoán được.

🔁 **Dừng lại tự kiểm tra.** Vì sao "đánh dấu `Alive = false`" lại tránh được GC, trong khi "xóa khỏi slice" thì không?

<details><summary>Đáp án</summary>

`Alive = false` chỉ đổi một bool — ô bộ nhớ của hạt **vẫn nằm nguyên** trong mảng đã cấp phát, sẵn sàng tái dùng. Không có object nào trở thành rác. "Xóa khỏi slice" (hoặc tạo hạt mới bằng `new`/`append` rồi bỏ) tạo/hủy object liên tục → sinh rác → GC phải dọn → giật.
</details>

📝 **Tóm tắt §6.** (1) Cấp/giải phóng mỗi frame ở số lượng lớn → GC giật, rớt fps. (2) Object pool: cấp một mảng cố định **một lần**, tái dùng ô của hạt chết. (3) "Chết" = set `Alive=false` (không giải phóng); "spawn" = reset một ô rỗng. (4) Pool đầy thì bỏ qua hạt mới → giữ ngân sách 60 fps. (5) Free list nâng spawn/die lên O(1) nếu cần.

---

## 7. Hệ hạt nằm ở đâu trong bức tranh lớn

Particle system gói gọn các kỹ thuật của hai tier trước và mở đường cho các hệ phức tạp hơn:

- **Dùng lại tích phân** — mỗi hạt update vị trí bằng đúng Euler ở [Lesson 03](../../01-Motion/lesson-03-integration-euler-verlet/). Hạt là "ứng dụng đại trà" của tích phân: một công thức rẻ chạy hàng nghìn lần.
- **Dùng lại lực** — trọng lực, gió, drag từ [Lesson 04](../../01-Motion/lesson-04-forces-gravity-drag-friction/). Attractor chỉ là một lực mới theo cùng khuôn `v += a·Δt`.
- **Né va chạm đầy đủ** — trái với [Lesson 10](../../02-Collision/lesson-05-friction-resting-stacking/), hạt **không** giải va chạm hạt–hạt; cùng lắm va vài mặt phẳng tĩnh. Đây là minh họa rõ ràng cho đánh đổi "trông đúng" vs "đúng tuyệt đối".
- **Mở đường cho Constraints** — nếu ta **nối các hạt bằng ràng buộc khoảng cách (distance constraint)**, hệ hạt biến thành **vải (cloth) và dây (rope)**. Đó chính là [Lesson 12 — Constraints (Cloth/Rope)](../lesson-02-constraints-cloth-rope/): hạt + lò xo/ràng buộc + Verlet.
- **Mở đường cho Flocking** — nếu mỗi hạt **nhìn các hạt lân cận và tự điều chỉnh** (tách, gióng hàng, gom đàn), ta được đàn chim/cá. Flocking về cơ bản là **hạt có "trí tuệ"** — sẽ học ở Lesson 13.

---

## 8. Bài tập

**Bài 1.** Một emitter có rate = 240 hạt/giây, game 60 fps. (a) Trung bình bao nhiêu hạt mỗi frame? (b) Bắt đầu `acc = 0`, liệt kê số hạt phun ở 4 frame đầu. (c) Sau đúng 0.5 giây đã phun bao nhiêu hạt?

**Bài 2.** Giải thích bằng lời (kèm con số) vì sao emitter rate = 20 hạt/giây ở 60 fps mà code `n := int(rate * dt); for i:=0;i<n;i++ { spawn() }` (không accumulator) sẽ **không phun hạt nào**. Sửa bằng accumulator và cho biết sau bao nhiêu frame hạt đầu tiên ra.

**Bài 3.** Một hạt lửa: `Lifetime = 1.0 s`, alpha lerp `1.0 → 0.0`, size lerp `4 → 1`. Tính alpha và size tại `Age = 0.0, 0.3, 0.7, 1.0`. Vẽ (mô tả) hạt thay đổi thế nào.

**Bài 4.** Một hạt nổ spawn tại tâm `(400, 300)` với `Vx = 200, Vy = −150`, chịu trọng lực `gravity = 400 px/s²` (y xuống), `Δt = 1/60`. Tính vị trí và vận tốc sau 3 frame (dùng Euler: cập nhật v trước, rồi pos).

**Bài 5.** Attractor đặt tại `(300, 300)`, độ mạnh `G = 500`. Hạt ở `(360, 300)`, `Vx = Vy = 0`, `Δt = 1/60`. (a) Hướng đơn vị từ hạt tới tâm? (b) Vận tốc hạt sau 1 frame? (c) Nếu hạt ở **đúng** `(300, 300)` thì công thức gặp lỗi gì, sửa sao?

**Bài 6.** Thiết kế bộ tham số (spawn velocity, lifetime, lực, lerp màu/size/alpha) cho hiệu ứng **vòi phun nước** bắn lên rồi rơi xuống, chạm sàn `y = 500` thì nảy với hệ số 0.4. Mô tả từng lựa chọn và lý do.

**Bài 7.** Một game phun 6000 hạt/giây, mỗi hạt là một object cấp phát mới. Giải thích cụ thể vì sao fps giật, rồi viết (pseudo-code) một object pool `max = 6000` để khử giật. Pool đầy thì xử lý hạt mới ra sao?

**Bài 8.** (Liên hệ tiếp theo) Mô tả: nếu nối các hạt trong một lưới 10×10 bằng ràng buộc khoảng cách (giữ khoảng cách giữa hạt kề ≈ cố định), hệ hạt trở thành cái gì? Khoảng cách giữa hai hạt kề bị kéo dài thì ràng buộc phải làm gì? (Đây là preview [Lesson 12](../lesson-02-constraints-cloth-rope/).)

---

## Lời giải chi tiết

### Bài 1

(a) `240 × (1/60) = 4.0` hạt/frame — đúng số nguyên, hiếm gặp nhưng tiện.

(b) Mỗi frame cộng 4.0 vào acc: frame 1 acc 0→4.0 phun **4**, acc 0; frame 2 → **4**; frame 3 → **4**; frame 4 → **4**. (Vì rate·Δt nguyên, accumulator luôn về 0, phun đều 4/frame.)

(c) 0.5 s = 30 frame × 4 = **120 hạt**. Kiểm tra: `240 × 0.5 = 120` ✓.

### Bài 2

`rate·dt = 20 × (1/60) = 0.3333`. `int(0.3333) = 0` → mỗi frame phun 0 hạt, **mãi mãi** — không hạt nào ra. Đây chính là bug "rate nhỏ hơn 1 hạt/frame".

Sửa bằng accumulator:
```go
acc += rate * dt          // +0.3333 mỗi frame
for acc >= 1 { spawn(); acc -= 1 }
```
Acc: frame 1 = 0.3333 (0 hạt), frame 2 = 0.6667 (0), frame 3 = 1.0000 (**1 hạt**, acc→0). → Hạt đầu tiên ra ở **frame 3**. Sau đó cứ ~3 frame ra 1 hạt → trung bình 20 hạt/giây, đúng rate.

### Bài 3

`t = Age / 1.0 = Age`.

| Age | t | alpha = lerp(1,0,t) = 1−t | size = lerp(4,1,t) = 4−3t |
|----:|--:|--------------------------:|--------------------------:|
| 0.0 | 0.0 | **1.00** | **4.0** |
| 0.3 | 0.3 | 1 − 0.3 = **0.70** | 4 − 0.9 = **3.10** |
| 0.7 | 0.7 | 1 − 0.7 = **0.30** | 4 − 2.1 = **1.90** |
| 1.0 | 1.0 | **0.00** | **1.00** |

Mô tả: hạt bắt đầu **đặc và to (4 px, alpha 1)**, **co và mờ đều**, đến lúc chết còn **1 px và trong suốt hẳn** → tắt mượt, không phụp.

### Bài 4

Euler, mỗi frame: `Vy += gravity·Δt` rồi `Px += Vx·Δt`, `Py += Vy·Δt`. `gravity·Δt = 400/60 = 6.667`. `Vx` không đổi (không có lực ngang). `Vx·Δt = 200/60 = 3.333`.

| Frame | Vy sau cộng g | Px += 3.333 | Py += Vy·Δt |
|------:|--------------:|------------:|------------:|
| start | −150.000 | 400.000 | 300.000 |
| 1 | −150+6.667 = **−143.333** | 403.333 | 300 + (−143.333/60) = 300 − 2.389 = **297.611** |
| 2 | −143.333+6.667 = **−136.667** | 406.667 | 297.611 − 2.278 = **295.333** |
| 3 | −136.667+6.667 = **−130.000** | 410.000 | 295.333 − 2.167 = **293.167** |

Sau 3 frame: vị trí ≈ **(410.0, 293.17)**, vận tốc **(200, −130.0)**. Hạt đang bay lên-phải, nhưng `Vy` đang được trọng lực kéo bớt âm dần → sẽ chậm lại, dừng, rồi rơi xuống (parabol).

### Bài 5

(a) `dx = 300−360 = −60`, `dy = 0`. `dist = 60`. Hướng đơn vị `(dx/dist, dy/dist) = (−1, 0)` → trỏ sang trái (về tâm).

(b) `Vx += (−1)·500·(1/60) = −8.333`, `Vy += 0`. → vận tốc sau 1 frame = **(−8.333, 0)**. Hạt bắt đầu bị hút về tâm bên trái.

(c) Nếu hạt ở đúng `(300,300)`: `dx = dy = 0`, `dist = 0` → `dx/dist = 0/0 = NaN` → vận tốc thành NaN, hạt hỏng. Sửa: `dist := math.Hypot(dx,dy) + 1e-3` (epsilon) hoặc `if dist < eps { return }` bỏ qua frame đó.

### Bài 6

Bộ tham số gợi ý cho **vòi phun nước**:

- **Spawn velocity**: góc trung tâm `−π/2` (lên trên, y xuống), spread `≈ 0.2 rad` (~12°) cho chùm hẹp; speed 180–260 px/s (đủ cao để vọt lên rồi rơi).
- **Lifetime**: 2.0–3.0 s (đủ để bay lên, rơi, nảy vài lần).
- **Lực**: trọng lực `+500 px/s²` (rơi); không gió (nước nặng, ít bị thổi); drag nhẹ tùy chọn.
- **Va sàn** `y = 500`: khi `Py > 500` → `Py = 500`, `Vy = −Vy·0.4` (nảy mất 60% tốc độ), `Vx *= 0.7` (ma sát ngang nhẹ). Sau 2–3 lần nảy `Vy` rất nhỏ → hạt "nằm" rồi chết theo lifetime.
- **Lerp**: màu giữ xanh `(80,160,255)` (nước ít đổi màu); alpha lerp `0.9 → 0` (tan dần); size gần như cố định 3–4 px (giọt không phình như khói).

Lý do: nước **rơi** (trọng lực dương, khác lửa), **nảy** (cần va sàn — xấp xỉ một mặt phẳng), **giữ màu** (không cháy đổi màu), **mờ dần** để tránh biến mất phụp.

### Bài 7

**Vì sao giật**: 6000 object/giây được `new` rồi bỏ → rác phình nhanh. GC chạy định kỳ để dọn, mỗi lần **tạm dừng** vài ms; ngân sách một frame 60 fps chỉ 16.6 ms → một lần GC pause là rớt frame, người chơi thấy khựng.

**Object pool**:
```go
type Pool struct{ ps []Particle }
func NewPool(max int) *Pool { return &Pool{ps: make([]Particle, max)} } // make MỘT lần

func (pl *Pool) Spawn() *Particle {
    for i := range pl.ps {
        if !pl.ps[i].Alive {
            pl.ps[i] = Particle{Alive: true}   // tái dùng ô, không cấp mới
            return &pl.ps[i]
        }
    }
    return nil   // pool đầy → bỏ qua hạt này
}
func (pl *Pool) kill(p *Particle) { p.Alive = false } // "chết" = set false, không giải phóng
```
Cấp phát đúng một lần ở `make` → sau đó không sinh rác → GC không phải dọn → hết giật. **Pool đầy** (`Spawn` trả `nil`): bỏ qua hạt mới — chấp nhận được, vì giới hạn 6000 hạt cũng là cách giữ fps ổn định. Muốn spawn O(1), thay vòng quét bằng free list (stack chỉ số ô rỗng).

### Bài 8

Nối hạt thành lưới 10×10 bằng **ràng buộc khoảng cách** → hệ hạt trở thành một tấm **vải (cloth)**. Mỗi hạt là một "nút" của vải, mỗi ràng buộc giữ khoảng cách giữa hai nút kề ≈ độ dài nghỉ (rest length).

Khi hai hạt kề bị **kéo dài** quá rest length: ràng buộc **kéo hai hạt lại gần nhau** (mỗi hạt dịch về phía kia một nửa khoảng dư), lặp nhiều lần mỗi frame cho cả lưới → tấm vải giữ hình, đung đưa, rủ xuống dưới trọng lực mà không "rách" ra vô hạn. Nếu ràng buộc xếp thành một **chuỗi 1 chiều** thay vì lưới → ra **dây thừng (rope)**. Đây chính là nội dung [Lesson 12 — Constraints (Cloth/Rope)](../lesson-02-constraints-cloth-rope/), kết hợp hạt + ràng buộc + tích phân Verlet.

---

## Tham khảo và bài tiếp theo

- Bài trước: [Lesson 10 — Friction, Resting & Stacking](../../02-Collision/lesson-05-friction-resting-stacking/) — đóng Tier 2 Collision.
- Tiền đề tái dùng: [Lesson 03 — Integration (Euler/Verlet)](../../01-Motion/lesson-03-integration-euler-verlet/), [Lesson 04 — Forces](../../01-Motion/lesson-04-forces-gravity-drag-friction/).
- **Bài tiếp theo**: [Lesson 12 — Constraints (Cloth/Rope)](../lesson-02-constraints-cloth-rope/) — nối hạt bằng ràng buộc để được vải và dây; rồi flocking (Lesson 13) — hạt có "trí tuệ".
- Minh họa tương tác: [visualization.html](./visualization.html) — playground 5 preset (lửa/khói/nước/nổ/pháo hoa) với hàng trăm hạt realtime, attractor theo chuột, và đồ thị lerp theo tuổi.
