# Lesson 14 — ECS & Game Architecture (Entity-Component-System, State Machine, Camera)

> Lĩnh vực: **GameDev — Game & mô phỏng vật lý** · Tier `03-Systems`

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao kế thừa OOP sâu (deep inheritance) sụp đổ** khi game lớn dần — và **ECS** (Entity-Component-System) giải quyết bằng *composition over inheritance* ra sao.
- Phân biệt rõ 3 trụ cột: **Entity** (chỉ là một id), **Component** (dữ liệu thuần, không logic), **System** (logic chạy trên mọi entity khớp một bộ component).
- Viết **query** của system (entity nào có `Position + Velocity` thì MovementSystem xử lý) và hiểu thứ tự gọi system trong vòng update.
- Hiểu **state machine (FSM)** cho hành vi nhân vật: idle / run / jump / attack, bảng chuyển trạng thái, walk-through chuỗi input → states.
- Hiểu **vòng đời game object**: spawn / destroy, scene, layer; và **camera** (biến đổi world ↔ screen, follow, viewport).
- Thấy ECS tổ chức lại **mọi thứ đã học** (vật lý, va chạm, hạt) thành các system gọn gàng.

## Kiến thức tiền đề

- [L13 — Flocking & Steering](../lesson-03-flocking-steering/) — nhiều agent cùng chạy một logic; chính là tiền thân của "một system chạy trên nhiều entity".
- [L05 — Springs & Oscillation](../../01-Motion/lesson-05-springs-oscillation/) — camera follow mượt thường dùng lò xo (spring damping) để bám nhân vật.
- [L01 — Game Loop & Timestep](../../01-Motion/lesson-01-game-loop-timestep/) — fixed update vs render; ECS chạy các system trong đúng vòng lặp đó.
- [SoftwareEngineering](../../../SoftwareEngineering/) — composition over inheritance, design pattern (State, Strategy), DataStructures (mảng song song, sparse set).

---

## 1. Vì sao học ECS? — bệnh "inheritance hell"

💡 **Trực giác.** Hình dung bạn làm game và bắt đầu bằng cây kế thừa OOP "tự nhiên":

```
GameObject
 ├── Character
 │    ├── Player
 │    └── Enemy
 │         ├── Goblin          (đi bộ, đánh cận chiến)
 │         └── Bat             (biết bay)
 └── Projectile
```

Mọi thứ êm đẹp — cho tới khi designer gửi yêu cầu mới:

> *"Thêm con **quái biết bay + bắn đạn + nổ khi chết**."*

Bây giờ bạn kẹt. `Bat` (lớp bay) có hàm `fly()`. `Goblin` (lớp đánh) có `attack()`. Bạn cần một con **vừa bay vừa bắn vừa nổ**. Trong cây kế thừa đơn:

- Cho nó kế thừa `Bat` → có `fly()`, nhưng **không** có `shoot()` và `explode()`.
- Cho kế thừa lớp `Shooter` → mất `fly()` (kế thừa đơn không cho 2 cha).
- Tạo lớp `FlyingShootingExplodingEnemy` → tuần sau designer thêm "biết bay + bắn + **tàng hình**", bạn lại đẻ tiếp một lớp nữa.

Số tổ hợp **bùng nổ tổ hợp (combinatorial explosion)**: với `k` khả năng độc lập (bay, bắn, nổ, tàng hình, hồi máu, ...), số lớp con khả dĩ là `2^k`. Với 10 khả năng = 1024 lớp tiềm năng. Đây là **"inheritance hell"** — cây kế thừa phình to, code trùng lặp, và một thay đổi nhỏ ở lớp cha làm vỡ hàng chục lớp con (fragile base class).

⚠ **Lỗi thường gặp — cố cứu kế thừa bằng "God base class".** Một phản xạ sai là nhồi mọi hàm (`fly()`, `shoot()`, `swim()`, `explode()`) vào thẳng `GameObject` rồi cho lớp con bật/tắt bằng cờ `canFly = true`. Kết quả: lớp gốc khổng lồ, mỗi object mang theo cả tá hàm nó không dùng, và logic `if (canFly && canShoot && !isStunned)` rải khắp nơi. Đây vẫn là inheritance hell, chỉ đổi chỗ đau.

**Lời giải của ECS: composition over inheritance.** Thay vì hỏi *"con này LÀ loại gì?"*, ta hỏi *"con này CÓ những khả năng gì?"*. Mỗi khả năng là một **component** ráp vào:

- Con quái biết bay + bắn + nổ = `Position + Velocity + Sprite + Health + Flying + Shooter + Explosive`.
- Muốn thêm "tàng hình"? Ráp thêm `Stealth`. Không đẻ lớp mới, không sửa lớp cũ.

Tổ hợp giờ là **phép cộng component**, không phải đẻ lớp — `2^k` tổ hợp được biểu diễn bằng `k` component nhỏ.

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Kế thừa xấu hoàn toàn à?"* — Không. Kế thừa **nông** (1-2 tầng) cho quan hệ "is-a" thật sự vẫn tốt. ECS chỉ thay thế khi bạn cần **tổ hợp nhiều khả năng độc lập** — đúng đặc trưng của game object.
- *"ECS có phải lúc nào cũng nên dùng?"* — Game nhỏ (puzzle, vài object) thì OOP đơn giản hơn. ECS tỏa sáng khi có **hàng trăm loại object** với khả năng đan xen, và khi cần hiệu năng cache (xem §3).

🔁 **Dừng lại tự kiểm tra.** Với 4 khả năng độc lập (bay, bơi, bắn, nổ), cây kế thừa đơn cần tối đa bao nhiêu lớp để phủ mọi tổ hợp? ECS cần bao nhiêu component?

<details><summary>Đáp án</summary>

Kế thừa: tối đa `2^4 = 16` lớp (mỗi tập con của {bay, bơi, bắn, nổ} là một lớp tiềm năng). ECS: chỉ **4 component**, mọi tổ hợp là một tập con của 4 component này. 4 viên gạch lego ráp ra 16 hình.
</details>

---

## 2. ECS — ba trụ cột

ECS tách triệt để **dữ liệu** khỏi **logic**:

| Khái niệm | Là gì | Vì sao tồn tại | Ví dụ |
|-----------|-------|----------------|-------|
| **Entity** | Chỉ là một **id** (số nguyên), không chứa gì khác | Là "cái móc" để gom component lại; nhẹ như lông hồng | `entity 7`, `entity 12` |
| **Component** | **Dữ liệu thuần** (struct), không có hàm logic | Mô tả "object này có thuộc tính gì" | `Position{x,y}`, `Velocity{vx,vy}`, `Health{hp}` |
| **System** | **Logic** chạy trên mọi entity có đủ bộ component nó cần | Xử lý hành vi; tách khỏi dữ liệu để tái dùng | `MovementSystem`, `RenderSystem` |

### 2.1 Entity — chỉ là một id

💡 **Trực giác.** Entity giống **số chứng minh thư**: bản thân con số không nói bạn cao bao nhiêu, máu bao nhiêu. Nó chỉ là **khóa** để tra cứu các thuộc tính gắn với nó trong các "bảng" component.

```go
type Entity uint32   // entity CHỈ là một id, không có field nào khác

player  := Entity(1)
goblin  := Entity(2)
bullet  := Entity(3)
```

Không có `class Player`, `class Goblin`. Chỉ là các số 1, 2, 3 — và component gắn vào chúng quyết định chúng "là gì".

### 2.2 Component — dữ liệu thuần (data-only)

**Định nghĩa.** Component là một **struct chỉ chứa dữ liệu**, không phương thức xử lý. Mỗi component trả lời đúng **một** câu hỏi về entity.

```go
type Position struct { X, Y float64 }      // ở đâu?
type Velocity struct { VX, VY float64 }    // đang đi với vận tốc nào?
type Sprite   struct { Image string }      // vẽ bằng ảnh nào?
type Health   struct { HP, Max int }       // còn bao nhiêu máu?
type AI       struct { Target Entity }     // đang nghĩ/đuổi theo ai?
```

⚠ **Lỗi thường gặp — nhét logic vào component.** Component **không** nên có `func (h *Health) TakeDamage(d int)`. Logic "trừ máu" thuộc về **DamageSystem**. Nếu component có hàm, bạn đang trượt ngược về OOP, và 2 component không thể "phối hợp logic" gọn gàng nữa. Component = danh từ (dữ liệu); System = động từ (hành động).

### 2.3 Mỗi entity = một tổ hợp component (≥4 ví dụ)

Đây là điểm cốt lõi: **kiểu của object không nằm ở một class, mà nằm ở tập component nó đang mang.**

| Entity | Component mang theo | "Là loại gì" (suy ra từ component) |
|--------|---------------------|------------------------------------|
| **Player** | `Position + Velocity + Sprite + Health + Input` | Nhân vật người chơi: hiện trên màn, di chuyển, có máu, nhận phím |
| **Goblin (đi bộ)** | `Position + Velocity + Sprite + Health + AI` | Quái đi bộ: như player nhưng AI điều khiển thay vì phím |
| **Bức tường** | `Position + Sprite + Collider` | Vật tĩnh: hiện ra, chặn va chạm, **không** có Velocity → không tự di chuyển |
| **Viên đạn** | `Position + Velocity + Sprite + Damage + Lifetime` | Bay nhanh, gây sát thương, tự hủy sau `Lifetime` giây; không có Health |
| **Bẫy vô hình** | `Position + Collider + Damage` | Không có Sprite → **không vẽ ra**, nhưng vẫn va chạm và gây hại |
| **Quái bay + bắn + nổ** | `Position + Velocity + Sprite + Health + AI + Flying + Shooter + Explosive` | Đúng con quái đầu bài §1 — chỉ là phép cộng component |

📝 **Nhận ra điều đẹp đẽ:** "Bức tường" và "viên đạn" khác nhau ở chỗ tường **thiếu** `Velocity` còn đạn **có**. "Bẫy vô hình" chỉ khác viên đạn ở chỗ **thiếu** `Sprite`. Thêm/bớt một component đổi luôn bản chất object — không sửa class nào.

🔁 **Dừng lại tự kiểm tra.** Một "rương báu mở được" cần hiện ra, va chạm để người chơi đứng cạnh, và có trạng thái đóng/mở. Nó cần component nào? Có cần `Velocity` không?

<details><summary>Đáp án</summary>

`Position + Sprite + Collider + Chest{open bool}`. **Không** cần `Velocity` vì rương đứng yên. Trạng thái đóng/mở để trong một component dữ liệu (`Chest`), còn logic "khi player tới gần thì mở" nằm ở `InteractSystem`.
</details>

---

## 3. System & Query — logic chạy trên entity khớp component

### 3.1 System là gì

💡 **Trực giác.** System là **dây chuyền nhà máy**: nó không quan tâm "đây là goblin hay player", chỉ cần "có đủ linh kiện tôi cần thì tôi xử lý". `MovementSystem` nói: *"Đưa cho tôi mọi entity có cả `Position` lẫn `Velocity`, tôi cập nhật vị trí cho từng cái."*

**Query** = bộ component mà system yêu cầu. System chỉ động tới entity **khớp** query.

```go
// MovementSystem: query = (Position, Velocity)
func MovementSystem(w *World, dt float64) {
    for _, e := range w.Query(POSITION | VELOCITY) {   // chỉ entity có CẢ HAI
        p := w.Pos[e]
        v := w.Vel[e]
        p.X += v.VX * dt
        p.Y += v.VY * dt
        w.Pos[e] = p
    }
}
```

### 3.2 Bốn system điển hình & query của chúng (≥4 ví dụ)

| System | Query (component cần) | Làm gì | Bỏ qua entity nào |
|--------|------------------------|--------|-------------------|
| **MovementSystem** | `Position + Velocity` | `pos += vel·dt` | Tường (không có Velocity) |
| **RenderSystem** | `Position + Sprite` | Vẽ sprite tại vị trí | Bẫy vô hình (không có Sprite) |
| **DamageSystem** | `Health + DamageReceived` | Trừ máu, đánh dấu chết nếu hp≤0 | Đạn (không có Health) |
| **AISystem** | `Position + Velocity + AI` | Tính hướng đuổi target, set Velocity | Player (không có AI) |
| **LifetimeSystem** | `Lifetime` | Giảm `Lifetime -= dt`; hết thì destroy | Mọi thứ tồn tại vĩnh viễn |

### 3.3 Walk-through query thật (CẤM nói "tương tự")

Giả sử world có 5 entity với component như sau (✓ = có, trống = không):

| Entity | Position | Velocity | Sprite | Health | AI |
|--------|:--:|:--:|:--:|:--:|:--:|
| 1 Player | ✓ | ✓ | ✓ | ✓ |  |
| 2 Goblin | ✓ | ✓ | ✓ | ✓ | ✓ |
| 3 Tường | ✓ |  | ✓ |  |  |
| 4 Đạn | ✓ | ✓ | ✓ |  |  |
| 5 Bẫy vô hình | ✓ |  |  |  |  |

Chạy từng system một, **liệt kê chính xác entity nào được xử lý**:

- **`MovementSystem` query `Position + Velocity`:**
  - Entity 1: Position ✓, Velocity ✓ → **xử lý**.
  - Entity 2: Position ✓, Velocity ✓ → **xử lý**.
  - Entity 3: Position ✓ nhưng **thiếu Velocity** → bỏ qua.
  - Entity 4: Position ✓, Velocity ✓ → **xử lý**.
  - Entity 5: Position ✓ nhưng **thiếu Velocity** → bỏ qua.
  - ⇒ Kết quả: **{1, 2, 4}** được di chuyển.

- **`RenderSystem` query `Position + Sprite`:**
  - Entity 1: ✓✓ → vẽ. Entity 2: ✓✓ → vẽ. Entity 3: ✓✓ → vẽ. Entity 4: ✓✓ → vẽ.
  - Entity 5: Position ✓ nhưng **thiếu Sprite** → không vẽ (đúng ý: bẫy vô hình).
  - ⇒ Kết quả: **{1, 2, 3, 4}** được vẽ; entity 5 vẫn tồn tại nhưng vô hình.

- **`AISystem` query `Position + Velocity + AI`:**
  - Chỉ entity 2 (Goblin) có đủ cả 3 → **{2}**. Player (1) thiếu AI nên do người chơi điều khiển, không bị AISystem đụng vào.

### 3.4 Vòng update — gọi lần lượt các system

```go
func (w *World) Update(dt float64) {
    InputSystem(w)              // 1. đọc phím → set Velocity cho Player
    AISystem(w, dt)             // 2. AI set Velocity cho quái
    MovementSystem(w, dt)       // 3. áp Velocity → cập nhật Position
    CollisionSystem(w)          // 4. phát hiện va chạm sau khi đã di chuyển
    DamageSystem(w)             // 5. xử lý sát thương từ va chạm
    LifetimeSystem(w, dt)       // 6. giảm lifetime, destroy entity hết hạn
}
// RenderSystem(w) gọi RIÊNG trong vòng render (xem §6 fixed update vs render)
```

⚠ **Lỗi thường gặp — sai THỨ TỰ system.** Thứ tự gọi system là **logic, không tùy tiện**. Nếu chạy `CollisionSystem` **trước** `MovementSystem`, bạn kiểm tra va chạm trên vị trí **cũ** của frame trước → đạn xuyên qua tường, nhân vật kẹt trong sàn. Quy tắc: *quyết định ý định (Input/AI) → di chuyển (Movement) → kiểm tra hậu quả (Collision/Damage) → dọn dẹp (Lifetime)*.

### 3.5 Data-oriented — vì sao ECS chạy nhanh (sơ lược)

💡 **Trực giác.** Lưu component theo **mảng song song** (tất cả `Position` nằm liền nhau trong bộ nhớ, tất cả `Velocity` nằm liền nhau) thay vì rải rác trong từng object. Khi `MovementSystem` quét, CPU đọc một dải bộ nhớ liên tục → **cache-friendly**, ít cache miss.

```
OOP (rải rác):   [obj1: pos,vel,sprite,ai] [obj2: pos,vel,...] ...  → nhảy lung tung
ECS (SoA):       Pos:[p1 p2 p3 p4 ...]   Vel:[v1 v2 v3 v4 ...]      → đọc liền mạch
```

So với việc "nhảy con trỏ" qua từng object OOP (mỗi object một vùng nhớ riêng), đọc mảng liền mạch nhanh hơn nhiều khi có hàng nghìn entity. Đây gọi là **Structure of Arrays (SoA)**, đối lập với **Array of Structures (AoS)** của OOP.

❓ **Câu hỏi tự nhiên.** *"Mảng song song thì xóa entity giữa chừng có tốn không?"* — Có, nếu xóa nhằm giữa mảng phải dồn lại. Kỹ thuật phổ biến: **swap-remove** (đổi phần tử cần xóa với phần tử cuối rồi cắt đuôi — O(1)), hoặc **sparse set** ánh xạ entity id → index. Đây là chỗ DataStructures gặp lại GameDev.

📝 **Tóm tắt mục 3:**
- System = logic; query = bộ component nó cần; chỉ chạy trên entity **khớp đủ** query.
- Vòng update gọi system theo **thứ tự logic**: ý định → di chuyển → va chạm → dọn dẹp.
- Lưu component theo mảng song song (SoA) → cache-friendly, là lý do hiệu năng của ECS.

---

## 4. State Machine (FSM) — hành vi nhân vật

💡 **Trực giác.** Một nhân vật platformer không thể "vừa đứng yên vừa nhảy vừa tấn công cùng lúc". Tại mỗi thời điểm nó ở **đúng một trạng thái (state)**, và chuyển sang trạng thái khác khi có **sự kiện (event)**. Giống đèn giao thông: Xanh → (hết giờ) → Vàng → (hết giờ) → Đỏ → ... — không bao giờ vừa xanh vừa đỏ.

**Finite State Machine (FSM)** gồm: tập **trạng thái**, **trạng thái đầu**, và **hàm chuyển** `δ(state, event) → state`.

### 4.1 FSM nhân vật platformer

Trạng thái: `Idle` (đứng yên), `Run` (chạy), `Jump` (đang trên không), `Attack` (đánh).

**Bảng chuyển trạng thái** (đọc: ở trạng thái hàng, gặp event cột, sang trạng thái trong ô):

| Từ \ Event | `press_move` | `release_move` | `press_jump` | `land` | `press_attack` | `anim_done` |
|------------|:--:|:--:|:--:|:--:|:--:|:--:|
| **Idle** | Run | Idle | Jump | — | Attack | — |
| **Run** | Run | Idle | Jump | — | Attack | — |
| **Jump** | Jump | Jump | — | Idle | Attack | — |
| **Attack** | — | — | — | — | — | Idle |

(`—` = event bị bỏ qua, giữ nguyên trạng thái. Vd đang `Attack` thì `press_jump` bị nuốt — không cho hủy đòn đánh.)

### 4.2 Walk-through chuỗi input → states (ví dụ thật, CẤM "tương tự")

Bắt đầu ở **Idle**. Người chơi bấm chuỗi sự kiện sau, lần theo từng bước:

| Bước | Trạng thái hiện tại | Event nhận | Tra bảng δ | Trạng thái mới |
|:--:|------|------|------|------|
| 0 | Idle | (khởi đầu) | — | **Idle** |
| 1 | Idle | `press_move` | δ(Idle, press_move) = Run | **Run** |
| 2 | Run | `press_jump` | δ(Run, press_jump) = Jump | **Jump** |
| 3 | Jump | `press_attack` | δ(Jump, press_attack) = Attack | **Attack** |
| 4 | Attack | `press_jump` | δ(Attack, press_jump) = — (nuốt) | **Attack** (giữ nguyên) |
| 5 | Attack | `anim_done` | δ(Attack, anim_done) = Idle | **Idle** |
| 6 | Idle | `release_move` | δ(Idle, release_move) = Idle | **Idle** (giữ nguyên) |

Chú ý **bước 4**: đang đánh thì bấm nhảy bị **bỏ qua** — đó là lý do bảng có ô `—`. Nếu không có cơ chế này, người chơi spam phím sẽ làm nhân vật "giật" loạn xạ giữa các state.

Thêm 3 ví dụ chuỗi ngắn để chắc tay:

- **Idle → `press_jump` → Jump → `land` → Idle**: nhảy lên rồi đáp đất.
- **Run → `press_attack` → Attack → `anim_done` → Idle**: đang chạy thì đánh, đánh xong về đứng yên (KHÔNG về Run — vì khi đánh xong không còn giữ phím).
- **Idle → `press_attack` → Attack → `press_attack` → Attack**: spam đánh; event thứ 2 bị nuốt (δ(Attack, press_attack) = —), không "đánh chồng đánh".

```go
type State int
const ( Idle State = iota; Run; Jump; Attack )

// δ: hàm chuyển. Trả về state mới, hoặc state cũ nếu event bị nuốt.
func transition(s State, ev string) State {
    switch s {
    case Idle, Run:
        switch ev {
        case "press_move":   return Run
        case "release_move": return Idle
        case "press_jump":   return Jump
        case "press_attack": return Attack
        }
    case Jump:
        switch ev {
        case "land":         return Idle
        case "press_attack": return Attack
        }
    case Attack:
        if ev == "anim_done" { return Idle }
    }
    return s   // không khớp → giữ nguyên (nuốt event)
}
```

⚠ **Lỗi thường gặp — quên trạng thái "khóa".** Nếu cho mọi event chuyển được ở mọi state (bảng đầy, không có ô `—`), nhân vật sẽ hủy animation tấn công giữa chừng, trượt qua tường khi spam nhảy, v.v. FSM **đúng** thường có các ô bị chặn cố ý — chính là phần "thiết kế gameplay" của bạn.

❓ **Câu hỏi tự nhiên.**
- *"FSM với ECS thì để ở đâu?"* — Thành một component `StateMachine{current State}` trên entity, và một `FSMSystem` đọc event rồi gọi `transition`. State data trong component, logic chuyển trong system — đúng tinh thần ECS.
- *"State nhiều quá thì sao?"* — Khi state lồng nhau (vd Attack có sub-state Combo1/Combo2), người ta dùng **Hierarchical State Machine (HSM)** hoặc **Behavior Tree** (sẽ gặp khi làm AI phức tạp).

🔁 **Dừng lại tự kiểm tra.** Bắt đầu Idle. Chuỗi: `press_move`, `press_jump`, `land`, `release_move`. Trạng thái cuối là gì?

<details><summary>Đáp án</summary>

Idle →(press_move)→ Run →(press_jump)→ Jump →(land)→ Idle →(release_move)→ Idle. **Trạng thái cuối: Idle.** Lưu ý sau `land` về Idle (không phải Run) vì FSM đơn giản này reset về Idle khi đáp; nếu muốn giữ Run khi vẫn ấn phím, ta thêm logic kiểm tra phím đang giữ lúc `land`.
</details>

---

## 5. Vòng đời game object — spawn/destroy, scene, layer, camera

### 5.1 Spawn & Destroy

**Spawn** (tạo): xin một entity id mới, gắn component vào.

```go
func SpawnBullet(w *World, x, y, vx, vy float64) Entity {
    e := w.NewEntity()                          // cấp id mới
    w.Pos[e] = Position{x, y}
    w.Vel[e] = Velocity{vx, vy}
    w.Spr[e] = Sprite{"bullet.png"}
    w.Life[e] = Lifetime{2.0}                   // tự hủy sau 2 giây
    return e
}
```

**Destroy** (hủy): gỡ entity khỏi world, **trả id về pool** để tái dùng.

⚠ **Lỗi thường gặp — quên destroy entity → memory leak.** Mỗi viên đạn, mỗi hiệu ứng nổ là một entity. Nếu bắn 60 viên/giây mà không bao giờ destroy, sau vài phút world có **hàng chục nghìn entity chết** vẫn được mọi system quét qua → tụt FPS, ngốn RAM. Đây là rò rỉ (leak) kinh điển của game. Cách phòng:
- Có `LifetimeSystem` tự destroy entity hết hạn (đạn, hạt khói).
- Khi `Health.HP ≤ 0`, đánh dấu `Dead` và để `CleanupSystem` destroy cuối frame (không destroy giữa lúc đang lặp mảng → tránh hỏng iterator).
- **Object pool**: tái dùng entity đạn thay vì alloc/free liên tục.

❓ **Câu hỏi tự nhiên.** *"Vì sao không destroy ngay khi máu về 0?"* — Vì bạn đang ở **giữa** một system đang lặp qua mảng entity. Xóa giữa chừng làm hỏng vòng lặp. Mẫu an toàn: đánh dấu chết → dọn dẹp tập trung **cuối** frame.

### 5.2 Scene & Layer

- **Scene** (cảnh): một tập world riêng — menu, màn 1, màn 2, màn hình thắng. Đổi scene = bỏ world cũ, dựng world mới.
- **Layer** (lớp vẽ): thứ tự vẽ chồng. Background (z=0) → Terrain (z=1) → Entities (z=2) → UI (z=10). `RenderSystem` sắp xếp theo layer/z rồi vẽ từ thấp lên cao để UI luôn nằm trên cùng.

### 5.3 Camera — biến đổi world ↔ screen

💡 **Trực giác.** Thế giới game (world space) thường **lớn hơn màn hình** rất nhiều — bản đồ 10000×10000 px, màn hình chỉ 800×600 px. **Camera** là "khung ngắm" trượt trên thế giới; những gì lọt trong khung (viewport) mới được vẽ. Bạn không di chuyển cả thế giới — bạn di chuyển camera.

**Hai hệ tọa độ:**
- **World space**: tọa độ thật trong thế giới game (nhân vật ở `(5200, 3100)`).
- **Screen space**: tọa độ pixel trên màn hình (góc trên-trái = `(0,0)`, kích thước `W×H`).

**Phép biến đổi (camera tại `(camX, camY)` là góc trên-trái của viewport):**

$$
x_{screen} = x_{world} - cam_X, \qquad y_{screen} = y_{world} - cam_Y
$$

Ngược lại (click chuột screen → world):

$$
x_{world} = x_{screen} + cam_X, \qquad y_{world} = y_{screen} + cam_Y
$$

**Walk-through bằng số:** camera ở `(camX, camY) = (5000, 3000)`, viewport `800×600`. Nhân vật ở world `(5200, 3100)`:

$$
x_{screen} = 5200 - 5000 = 200, \qquad y_{screen} = 3100 - 3000 = 100
$$

→ Nhân vật vẽ tại pixel `(200, 100)` trên màn. Vì `0 ≤ 200 < 800` và `0 ≤ 100 < 600` nên nó **nằm trong viewport** → được vẽ. Một object ở world `(4000, 3100)` cho `x_screen = 4000 − 5000 = −1000 < 0` → **ngoài viewport**, bỏ qua không vẽ (culling — tiết kiệm rất nhiều khi thế giới to).

(Nếu có zoom `s`: $x_{screen} = (x_{world} - cam_X)\cdot s$. Bài này giữ `s = 1` cho đơn giản.)

### 5.4 Camera follow — bám nhân vật (liên hệ L05 Spring)

Cách thô: đặt camera sao cho nhân vật ở giữa màn: `camX = player.X − W/2`. Nhưng camera "dính cứng" vào nhân vật trông giật và gây chóng mặt.

Cách mượt: dùng **lò xo / nội suy** kéo camera **dần dần** về mục tiêu (liên hệ [L05 — Springs & Oscillation](../../01-Motion/lesson-05-springs-oscillation/)):

```go
target := player.X - W/2
cam.X += (target - cam.X) * k    // k ∈ (0,1): k=1 dính cứng, k=0.1 trễ mượt
```

Đây chính là **exponential smoothing** — camera "đuổi theo" mục tiêu như lò xo có giảm chấn (damped spring). `k` nhỏ → camera trễ và mềm; `k` lớn → bám sát hơn nhưng dễ giật.

📝 **Tóm tắt mục 5:** Spawn = cấp id + gắn component; Destroy = gỡ + trả id (quên → leak). Scene = world riêng từng màn; Layer = thứ tự vẽ. Camera biến đổi world↔screen bằng phép trừ `cam`; follow mượt bằng nội suy/lò xo.

---

## 6. Tilemap (preview L15) & Fixed update vs Render (liên hệ L01)

### 6.1 Tilemap — sơ lược

Thế giới 2D thường không vẽ từng pixel mà ghép từ **ô gạch (tile)** trên lưới. Bản đồ là một **mảng 2D chỉ số tile**:

```
0 0 0 0 0
0 1 1 1 0      0 = trời, 1 = đất, 2 = gai
0 0 0 2 0
1 1 1 1 1
```

Đổi từ world `(wx, wy)` sang ô lưới: `col = ⌊wx / tileSize⌋`, `row = ⌊wy / tileSize⌋`. Với `tileSize = 32`, world `(100, 70)` → `col = ⌊100/32⌋ = 3`, `row = ⌊70/32⌋ = 2`. Tilemap khiến va chạm và **pathfinding** rất gọn (chỉ duyệt lưới) — sẽ học kỹ ở [L15 — Tilemap & Pathfinding](../lesson-05-tilemap-pathfinding/).

### 6.2 Fixed update vs Render (liên hệ L01)

Nhắc lại từ [L01 — Game Loop & Timestep](../../01-Motion/lesson-01-game-loop-timestep/): vật lý và logic cần chạy ở **bước thời gian cố định** (fixed `dt`, vd 1/60 s) để **xác định lại được (deterministic)** và ổn định; còn **render** chạy nhanh nhất có thể (theo màn hình). Trong ECS:

```
while (running):
    accumulator += frameTime
    while accumulator >= FIXED_DT:     // có thể chạy 0, 1, hoặc nhiều bước/frame
        world.Update(FIXED_DT)          # các system logic: Input, AI, Movement, Collision...
        accumulator -= FIXED_DT
    alpha = accumulator / FIXED_DT
    RenderSystem(world, alpha)          # vẽ, nội suy giữa 2 bước vật lý bằng alpha
```

→ System **logic** (Movement, Collision, AI) gọi trong vòng fixed; **RenderSystem** gọi riêng mỗi frame. Đây là lý do §3.4 tách RenderSystem ra khỏi `Update`.

📝 **Tóm tắt mục 6:** Tilemap = lưới chỉ số tile, world↔ô bằng chia lấy nguyên (preview L15). Fixed update cho logic/vật lý (deterministic), render riêng mỗi frame (liên hệ L01).

---

## 7. ECS tổ chức lại mọi thứ đã học

ECS không phải kiến thức rời — nó là **khung gom mọi bài trước thành các system**:

| Đã học ở | Trong ECS trở thành |
|----------|----------------------|
| [L01 Game Loop](../../01-Motion/lesson-01-game-loop-timestep/) | Vòng `World.Update(dt)` gọi các system theo thứ tự |
| Kinematics, Forces, Verlet (Motion) | `PhysicsSystem` query `Position + Velocity (+ Mass)` |
| [L05 Springs](../../01-Motion/lesson-05-springs-oscillation/) | `SpringSystem` + camera follow mượt |
| Collision (Tier 02) | `CollisionSystem` query `Position + Collider` |
| Particles / hiệu ứng | Mỗi hạt = entity `Position + Velocity + Lifetime`, một `ParticleSystem` |
| [L13 Flocking & Steering](../lesson-03-flocking-steering/) | `SteeringSystem` query `Position + Velocity + AI` chạy trên cả đàn |
| [SoftwareEngineering](../../../SoftwareEngineering/) | Composition over inheritance; State pattern (FSM); Strategy pattern |
| DataStructures | Mảng song song / sparse set lưu component; pool tái dùng entity |

💡 **Trực giác cuối.** Trước ECS, mỗi bài là một mảnh ghép rời. Sau ECS, chúng là các **system** cắm vào cùng một world: thêm tính năng = viết thêm một system + vài component, **không** đụng vào phần còn lại. Đó là lý do studio lớn (Unity DOTS, Bevy, EnTT) đều xây quanh ECS.

---

## Bài tập

> Làm thử trước khi xem [Lời giải chi tiết](#lời-giải-chi-tiết) bên dưới.

1. **(ECS composition)** Mô tả các entity sau bằng tổ hợp component (chọn trong `Position, Velocity, Sprite, Health, Collider, AI, Damage, Lifetime, Input`):
   (a) một cây cảnh trang trí đứng yên, không chặn đường;
   (b) một mìn nổ chạm là kích hoạt;
   (c) một NPC bán hàng đứng một chỗ, nói chuyện được;
   (d) một tên lửa truy đuổi player.

2. **(System query)** Cho world 4 entity: E1`{Pos,Vel,Spr}`, E2`{Pos,Spr}`, E3`{Pos,Vel,AI}`, E4`{Pos,Vel,Spr,Health}`. Liệt kê entity được xử lý bởi: `MovementSystem(Pos+Vel)`, `RenderSystem(Pos+Spr)`, `AISystem(Pos+Vel+AI)`.

3. **(Thứ tự system)** Một dev xếp vòng update là: `RenderSystem → MovementSystem → InputSystem`. Chỉ ra 2 hậu quả cụ thể của thứ tự sai này và sửa lại đúng.

4. **(State machine)** Dùng bảng chuyển ở §4.1. Bắt đầu **Idle**, chạy chuỗi event: `press_attack`, `anim_done`, `press_move`, `press_jump`, `land`. Lập bảng từng bước và cho biết trạng thái cuối.

5. **(Camera)** Camera ở `(camX, camY) = (1200, 800)`, viewport `640×480`. (a) Nhân vật world `(1500, 950)` vẽ ở pixel nào? Có trong viewport không? (b) Người chơi click pixel `(40, 60)` — tương ứng world nào? (c) Object world `(1100, 900)` có được vẽ không?

6. **(Leak)** Một game bắn 30 đạn/giây, mỗi đạn là entity. Sau 5 phút không có cơ chế destroy, world có bao nhiêu entity đạn? Đề xuất 2 cách dọn.

---

## Lời giải chi tiết

### Bài 1 — ECS composition

Cách tiếp cận: hỏi "object này CÓ khả năng gì", mỗi khả năng = một component. Thiếu component nào thì thiếu khả năng đó.

(a) **Cây cảnh:** `Position + Sprite`. Đứng yên → **không** `Velocity`; không chặn đường → **không** `Collider`; không tương tác → không gì thêm. Chỉ là thứ để nhìn.

(b) **Mìn:** `Position + Collider + Damage`. Có `Collider` để biết khi nào player chạm; có `Damage` để gây sát thương; **không** `Velocity` (mìn nằm yên), có thể thêm `Sprite` nếu muốn nhìn thấy. Logic "chạm thì nổ + destroy" do `CollisionSystem` + `DamageSystem` + `CleanupSystem` lo.

(c) **NPC bán hàng:** `Position + Sprite + Collider` (để biết player đứng cạnh) `+ Dialogue` (component dữ liệu chứa câu thoại). Đứng yên → **không** `Velocity`, **không** `AI` (không đuổi ai).

(d) **Tên lửa truy đuổi:** `Position + Velocity + Sprite + AI{Target: player} + Damage + Lifetime`. `AI` để mỗi frame tính lại hướng về player (steering — L13); `Velocity` để bay; `Lifetime` để tự hủy nếu trượt; `Damage` để nổ khi trúng.

### Bài 2 — System query

- **MovementSystem (Pos+Vel):** E1✓✓, E3✓✓, E4✓✓ qua; E2 thiếu Vel → loại. ⇒ **{E1, E3, E4}**.
- **RenderSystem (Pos+Spr):** E1✓✓, E2✓✓, E4✓✓ qua; E3 thiếu Spr → loại (di chuyển được nhưng vô hình). ⇒ **{E1, E2, E4}**.
- **AISystem (Pos+Vel+AI):** chỉ E3 có đủ AI. ⇒ **{E3}**.

### Bài 3 — Thứ tự system sai

Thứ tự sai `Render → Movement → Input`. Hai hậu quả:

1. **Render trước Movement** → vẽ vị trí của **frame trước**, rồi mới di chuyển. Hình ảnh luôn trễ 1 frame so với trạng thái thật → cảm giác "lag", input thấy chậm.
2. **Input sau Movement** → phím bấm trong frame này chỉ ảnh hưởng **frame sau** (vì Movement đã chạy xong trước khi đọc phím) → độ trễ điều khiển tăng, càng giật.

Sửa đúng: `Input → (AI) → Movement → Collision → Damage → Lifetime`, và **Render gọi riêng** sau cùng (hoặc trong vòng render riêng). Quy tắc: đọc ý định → cập nhật trạng thái → mới vẽ.

### Bài 4 — State machine walk-through

| Bước | Hiện tại | Event | δ tra bảng | Mới |
|:--:|------|------|------|------|
| 0 | Idle | — | — | **Idle** |
| 1 | Idle | press_attack | δ(Idle, press_attack)=Attack | **Attack** |
| 2 | Attack | anim_done | δ(Attack, anim_done)=Idle | **Idle** |
| 3 | Idle | press_move | δ(Idle, press_move)=Run | **Run** |
| 4 | Run | press_jump | δ(Run, press_jump)=Jump | **Jump** |
| 5 | Jump | land | δ(Jump, land)=Idle | **Idle** |

**Trạng thái cuối: Idle.** Lưu ý bước 2 phải đợi `anim_done` mới thoát Attack — đòn đánh không bị hủy giữa chừng.

### Bài 5 — Camera

Công thức: `screen = world − cam`; `world = screen + cam`. Camera `(1200, 800)`, viewport `640×480`.

(a) world `(1500, 950)` → screen `(1500−1200, 950−800) = (300, 150)`. Vì `0 ≤ 300 < 640` và `0 ≤ 150 < 480` → **trong viewport, vẽ tại pixel (300, 150)**.

(b) click screen `(40, 60)` → world `(40+1200, 60+800) = (1240, 860)`.

(c) world `(1100, 900)` → screen `(1100−1200, 900−800) = (−100, 100)`. Vì `x_screen = −100 < 0` → **ngoài viewport bên trái, KHÔNG vẽ** (bị cull).

### Bài 6 — Leak

Số đạn sau 5 phút = `30 đạn/s × 60 s/phút × 5 phút = 9000 entity` đạn vẫn nằm trong world, bị mọi system quét qua mỗi frame → tụt FPS + ngốn RAM (memory leak hiệu năng).

Hai cách dọn:
1. **LifetimeSystem**: gắn `Lifetime{2.0}` cho mỗi đạn; mỗi frame `Lifetime -= dt`, hết hạn (hoặc ra ngoài màn / trúng đích) thì đánh dấu destroy → `CleanupSystem` gỡ cuối frame. Ổn định ở vài chục đạn sống cùng lúc thay vì 9000.
2. **Object pool**: giữ sẵn pool ~200 entity đạn; bắn thì "kích hoạt" lại một đạn chết thay vì tạo mới, hủy thì trả về pool. Tránh chi phí alloc/free liên tục và giữ số entity hữu hạn.

---

## Tham khảo & Bài tiếp theo

**Tiền đề / liên hệ:**
- [L13 — Flocking & Steering](../lesson-03-flocking-steering/) — một logic chạy trên cả đàn → SteeringSystem.
- [L05 — Springs & Oscillation](../../01-Motion/lesson-05-springs-oscillation/) — camera follow mượt.
- [L01 — Game Loop & Timestep](../../01-Motion/lesson-01-game-loop-timestep/) — fixed update vs render.
- [SoftwareEngineering](../../../SoftwareEngineering/) — composition over inheritance, State/Strategy pattern.

**Bài tiếp theo:**
- [L15 — Tilemap & Pathfinding](../lesson-05-tilemap-pathfinding/) — biểu diễn thế giới bằng lưới tile và tìm đường (A*, BFS) trên đó.

**Minh họa tương tác:** [visualization.html](./visualization.html) — ECS composer, sơ đồ state machine bấm được, và camera follow trên thế giới lớn.
