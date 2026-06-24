# GameDev — Game & mô phỏng vật lý

Lĩnh vực này dạy **vòng đời một game/mô phỏng**: mỗi ~1/60 giây, máy phải cập nhật trạng thái theo thời gian, xử lý va chạm, và vẽ. Khác các lĩnh vực "tĩnh", đây là **thời gian thực, động** — và viz chính là bản thân môn học: **mỗi bài là một mô phỏng chạy được**, kéo slider thấy hành vi đổi ngay.

Tổ chức thành **3 tier × 15 bài**, xây dần một **engine 2D nhỏ**: từ vật chuyển động dưới lực → va chạm & nảy → hệ hạt/vải/đàn → kiến trúc & AI tìm đường.

## Trục xuyên suốt: game loop

```
mỗi frame (~16ms):  input → update(Δt) → collision → render
```

Mọi engine (Unity, Godot, Box2D) đều quay vòng này. Tier 1 lo `update` (vật lý), Tier 2 lo `collision`, Tier 3 lo tổ chức (systems & architecture).

## Mục tiêu

- Hiểu **game loop & timestep**: Δt, fixed vs variable, frame-rate độc lập.
- Mô phỏng **vật lý**: vector kinematics, tích phân số (Euler/Verlet), lực, lò xo.
- Xử lý **va chạm**: phát hiện (AABB/circle, SAT, broad-phase) & phản ứng (impulse, restitution, ma sát, xếp chồng).
- Dựng **hệ thống**: particle, constraint (cloth/rope/ragdoll), flocking; tổ chức bằng **ECS**; AI **tìm đường A***.

## Các tier

| Tier | Liên kết | Theme | Số bài |
|------|----------|-------|--------|
| 1 — Motion & Forces | [01-Motion](./01-Motion/) | Vật lý chuyển động | 5 |
| 2 — Collision | [02-Collision](./02-Collision/) | Phát hiện & phản ứng va chạm | 5 |
| 3 — Systems & Architecture | [03-Systems](./03-Systems/) | Hệ thống & kiến trúc game | 5 |

## Danh sách bài học

### Tier 1 — Motion & Forces ([01-Motion](./01-Motion/))

| # | Bài | Chủ đề |
|---|-----|--------|
| 01 | [Game Loop & Timestep](./01-Motion/lesson-01-game-loop-timestep/) | Vòng update→render, Δt, fixed vs variable timestep, accumulator |
| 02 | [Vectors & Kinematics](./01-Motion/lesson-02-vectors-kinematics/) | Vector 2D, vị trí/vận tốc/gia tốc, ném xiên, bug đi chéo √2 |
| 03 | [Integration (Euler/Verlet)](./01-Motion/lesson-03-integration-euler-verlet/) | Explicit/semi-implicit Euler, Verlet; sai số & ổn định |
| 04 | [Forces (Gravity/Drag/Friction)](./01-Motion/lesson-04-forces-gravity-drag-friction/) | F=ma, trọng lực, lực kéo & vận tốc tới hạn, ma sát |
| 05 | [Springs & Oscillation](./01-Motion/lesson-05-springs-oscillation/) | Hooke F=−kx, damping, spring-to-target cho camera/UI |

### Tier 2 — Collision ([02-Collision](./02-Collision/))

| # | Bài | Chủ đề |
|---|-----|--------|
| 06 | [AABB & Circle](./02-Collision/lesson-01-aabb-circle/) | Hình bao AABB/circle, overlap test, circle-AABB, penetration depth |
| 07 | [SAT (Polygons)](./02-Collision/lesson-02-sat-polygons/) | Separating Axis Theorem, chiếu lên trục, MTV |
| 08 | [Broad-phase & Quadtree](./02-Collision/lesson-03-broadphase-quadtree/) | Broad vs narrow phase, spatial hash, quadtree, sweep and prune |
| 09 | [Collision Response (Impulse)](./02-Collision/lesson-04-collision-response-impulse/) | Bảo toàn động lượng, restitution, impulse 2D, positional correction |
| 10 | [Friction & Resting](./02-Collision/lesson-05-friction-resting-stacking/) | Ma sát Coulomb, resting, jitter, stacking, sleeping |

### Tier 3 — Systems & Architecture ([03-Systems](./03-Systems/))

| # | Bài | Chủ đề |
|---|-----|--------|
| 11 | [Particle Systems](./03-Systems/lesson-01-particle-systems/) | Particle/emitter, lực, lerp theo tuổi, object pool (khói/lửa/nước) |
| 12 | [Constraints (Cloth/Rope)](./03-Systems/lesson-02-constraints-cloth-rope/) | Verlet + distance constraint, giải lặp, dây/vải/ragdoll, tearing |
| 13 | [Flocking & Steering](./03-Systems/lesson-03-flocking-steering/) | Steering (seek/flee/arrive), 3 luật boids, emergent behavior |
| 14 | [ECS & Architecture](./03-Systems/lesson-04-ecs-architecture/) | Entity-Component-System, state machine, lifecycle, camera |
| 15 | [Tilemap & Pathfinding](./03-Systems/lesson-05-tilemap-pathfinding/) | Tilemap, lưới→đồ thị, BFS/Dijkstra, A* (f=g+h) |

## Cách học

- **Học tuần tự** L01 → L15: engine lớn dần; mỗi bài dựa trên bài trước.
- **Mốc "aha"**: [L03 Integration](./01-Motion/lesson-03-integration-euler-verlet/) (thấy Euler phình năng lượng vs Verlet ổn định), [L12 Constraints](./03-Systems/lesson-02-constraints-cloth-rope/) (kéo vải/dây realtime), [L15 A*](./03-Systems/lesson-05-tilemap-pathfinding/) (tìm đường từng bước).
- **Bỏ qua nếu đã biết**: quen vector/vật lý → nhảy Tier 2; quen collision → nhảy Tier 3.

## Kiến thức tiền đề

| Cần biết | Lấy ở đâu |
|----------|-----------|
| Vector (cộng, dot, chuẩn hoá, khoảng cách) | [Vectors/04 LinearAlgebra](../Vectors/04-LinearAlgebra/) |
| Lực, động lượng, dao động, rigid body | [Physics/01 Mechanics](../Physics/01-Mechanics/) |
| Tích phân | [Math/04 Calculus](../Math/04-Calculus-1var/) |
| Cây/quadtree, đồ thị | [DataStructures](../DataStructures/) |
| A*, tìm đường | [Algorithms tier-5 Graph](../Algorithms/tier-5-graph/) |
| Ma trận xoay (SAT, đa giác) | [Vectors/02 Trigonometry](../Vectors/02-Trigonometry/lesson-06-rotation-matrix/) |

## Liên hệ tới các lĩnh vực dùng tới

| Bài GameDev | Dùng / liên hệ |
|-------------|------------|
| Integration, forces | [Physics](../Physics/), [Math](../Math/) — mô phỏng số |
| SAT, broad-phase | [Vectors](../Vectors/), [DataStructures](../DataStructures/) (quadtree) |
| Flocking, steering | AI di chuyển, [Vectors](../Vectors/) |
| ECS | [SoftwareEngineering](../SoftwareEngineering/) (design pattern, composition) |
| Tilemap & A* | [Algorithms](../Algorithms/tier-5-graph/), [DataStructures graph](../DataStructures/03-Advanced/lesson-01-graph/) |

## Đọc thêm

- *Game Programming Patterns* (Robert Nystrom) — game loop, component, state.
- *Real-Time Collision Detection* (Christer Ericson) — collision sâu.
- Box2D / matter.js (physics engine), Godot / Unity (engine thật).

## Minh họa tương tác

Mở [index.html](./index.html) ở trình duyệt — mọi visualization HTML standalone, mở `file://` chạy ngay. Mỗi bài là một mô phỏng realtime (kéo slider, click để tương tác) + nút "📖 Đọc README" xem lý thuyết ngay trong trang.
