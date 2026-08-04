# Animation — Hoạt hình

> Nghệ thuật làm cho hình vẽ **sống động**: không phải "vẽ đẹp" mà là **timing, chuyển động và sức nặng**. 12 nguyên tắc kinh điển của Disney, mỗi bài là một mô phỏng chạy realtime — bấm Play để thấy nguyên lý.

Nếu **VisualArt** dạy hình và màu đứng yên, thì **Animation** thêm chiều **thời gian**: vì sao quả bóng nảy trông "nặng", vì sao chuyển động thẳng đơ trông như robot, vì sao một pose lấy đà trước khi nhảy khiến cú nhảy "đọc được". Đây là cầu nối giữa nghệ thuật thị giác và chuyển động.

## Triết lý biên soạn

- **Trực giác trước hình thức**: hiểu *vì sao* một nguyên tắc làm chuyển động sống động trước khi vào công thức.
- **Con số cụ thể**: timing (số frame, fps), spacing (khoảng cách px), đường cong easing (tọa độ điểm điều khiển bezier) — không nói chung chung.
- **Học bằng cách xem chuyển động**: mỗi bài có `visualization.html` chạy được — chỉnh tham số, bấm Play, thấy khác biệt ngay.

## Kiến thức tiền đề

Không cần biết vẽ. Bổ trợ: [VisualArt](../VisualArt/) (pose, bố cục, hình khối), [Math](../Math/) (đường cong, nội suy), [GameDev](../GameDev/) (chuyển động bằng vật lý — góc nhìn kỹ thuật, khác góc nghệ thuật ở đây).

## Lộ trình — 3 nhánh × 12 bài

### Nhánh I — Nguyên tắc cơ bản ([01-Principles](./01-Principles/))

| Bài | Chủ đề | Nội dung |
|-----|--------|----------|
| 01 | [Timing & Spacing](./01-Principles/lesson-01-timing-spacing/) | Nhịp (số frame) vs khoảng cách frame → gia tốc, trọng lượng |
| 02 | [Squash & Stretch](./01-Principles/lesson-02-squash-stretch/) | Nén/giãn, bảo toàn thể tích, độ cứng vật liệu |
| 03 | [Lấy đà & Quán tính](./01-Principles/lesson-03-anticipation-followthrough/) | Anticipation, follow-through, overlapping |
| 04 | [Ease In/Out](./01-Principles/lesson-04-ease-in-out/) | Slow in/out — gia tốc tự nhiên |

### Nhánh II — Chuyển động & Đường cong ([02-Motion-Curves](./02-Motion-Curves/))

| Bài | Chủ đề | Nội dung |
|-----|--------|----------|
| 05 | [Keyframe & nội suy](./02-Motion-Curves/lesson-05-keyframe-interpolation/) | Khung chính, inbetween, tuyến tính vs mượt |
| 06 | [Easing & Bezier](./02-Motion-Curves/lesson-06-easing-bezier/) | Đường cong tốc độ, editor cubic-bezier |
| 07 | [Cung chuyển động](./02-Motion-Curves/lesson-07-arcs-path/) | Arcs, motion path, parabol |
| 08 | [Chuyển động phụ](./02-Motion-Curves/lesson-08-secondary-overlapping/) | Secondary action, overlapping/drag |

### Nhánh III — Nhân vật & Dựng cảnh ([03-Character-Staging](./03-Character-Staging/))

| Bài | Chủ đề | Nội dung |
|-----|--------|----------|
| 09 | [Walk cycle](./03-Character-Staging/lesson-09-walk-cycle/) | 4 pose mấu chốt, timing, tay vung ngược pha |
| 10 | [Dựng cảnh](./03-Character-Staging/lesson-10-staging-composition/) | Silhouette, line of action, dẫn mắt |
| 11 | [Cường điệu & sức hút](./03-Character-Staging/lesson-11-exaggeration-appeal/) | Exaggeration, appeal, tránh twinning |
| 12 | [Pose đến shot](./03-Character-Staging/lesson-12-pose-to-shot/) | Pose-to-pose vs straight-ahead — capstone |

## Cách dùng

Mỗi bài có `visualization.html` (mở trực tiếp là chạy) — bấm **Play** để xem chuyển động, kéo tham số để cảm nhận — và nút **📖 Học Lý Thuyết** đọc lý thuyết ngay trong trang. Học tuần tự từ Nhánh I; bài capstone gộp mọi nguyên tắc thành một shot.
