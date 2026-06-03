// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Music/03-Applied-Composition/lesson-04-advanced-rhythm/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Tiết tấu nâng cao (Advanced Rhythm)

> **Tầng 3 — Applied & Composition · Bài 4/8**

Tiết tấu là xương sống của âm nhạc. Nếu giai điệu (melody) là "nói gì", thì tiết tấu là "nói thế nào — nhịp nhàng, giật cục, hay lơ lửng". Bài này đào sâu vào những kỹ thuật làm tiết tấu trở nên thú vị: đảo phách, liên ba, đa nhịp, swing và backbeat.

> 🔊 **Bật loa** — mọi khái niệm đều được minh họa bằng âm thanh thật trong [visualization.html](./visualization.html).

---

## Mục tiêu học tập

Sau bài này, bạn có thể:

- Nhận ra và ký hiệu **đảo phách (syncopation)** — xác định vị trí nhấn trên phách/nửa phách yếu.
- Tính và đọc **liên ba/tuplets**: 3 nốt trong thời gian 2, 5 nốt trong thời gian 4, v.v.
- Hiểu **polyrhythm (đa nhịp)** — tỷ lệ LCM và cách hai lớp nhịp "chọi nhau".
- Phân biệt **swing** (dài–ngắn ~2:1) với "straight" (đều 1:1) bằng tai và bằng số.
- Giải thích **backbeat** trong nhạc pop/rock.

## Kiến thức tiền đề

- **Nhịp & tiết tấu cơ bản**: nốt tròn, trắng, đen, móc đơn, phách mạnh/yếu trong ô nhịp 4/4 → [\`Music/01-Fundamentals/lesson-07-rhythm-meter/\`](../../01-Fundamentals/lesson-07-rhythm-meter/).
- Cao độ và tần số (để hiểu phần viz Web Audio) → [\`Music/01-Fundamentals/lesson-01-sound-pitch/\`](../../01-Fundamentals/lesson-01-sound-pitch/).

---

## 1. Đảo phách (Syncopation)

> 💡 **Trực giác.** Trong ô nhịp 4/4 bình thường, ta vỗ tay vào phách **1** và **3** (phách mạnh). Đảo phách là "vỗ sai chỗ" — nhấn vào phách 2, 4 (phách yếu) hoặc vào "and" (nửa phách giữa). Âm nhạc bỗng "nhảy" và "giật" — đó là đặc trưng của funk, jazz, afrobeat, salsa.

### 1.1 Phách mạnh và phách yếu trong 4/4

Trong ô nhịp 4/4 (4 phách đen mỗi ô), vai trò các phách:

| Phách | 1 | "and 1" | 2 | "and 2" | 3 | "and 3" | 4 | "and 4" |
|-------|---|---------|---|---------|---|---------|---|---------|
| Trọng lượng | **Mạnh** | yếu | Trung bình | yếu | Mạnh nhẹ | yếu | Yếu | yếu |
| Vị trí (móc đơn) | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |

Ký hiệu "and" (thường viết là "+") là nửa phách nằm giữa hai phách đen liền kề.

### 1.2 Định nghĩa và ví dụ số

**(a) Là gì.** Đảo phách = đặt **nhấn (accent)** vào vị trí vốn là phách yếu hoặc nửa phách — trong khi phách mạnh lại im lặng (nghỉ, liên âm kéo dài, hoặc không nhấn).

**(b) Vì sao tồn tại.** Não người kỳ vọng nhấn ở phách mạnh. Khi nhấn "sai chỗ", cảm giác "giật" hoặc "trôi" xuất hiện — tạo năng lượng và sự bất ngờ. Đây là nguồn gốc groove.

**(c) Bốn ví dụ số trong ô 4/4 (tính theo 8 móc đơn, đánh số 1–8):**

- **Ví dụ 1 — Nhấn vào "and 2" (vị trí 4)**:
  - Bình thường: nhấn ở 1, 3, 5, 7 (phách đen 1,2,3,4).
  - Đảo phách: nhấn mạnh thêm vị trí **4** ("and 2") → chuỗi: \`1 · · [4] · · · ·\`
  - Cảm giác: bước lên không ngờ trước phách 3.

- **Ví dụ 2 — Nhấn vào "and 4" (vị trí 8)**:
  - Nhấn ở **8** thay vì phách 1 tiếp theo → tạo "anticipation" (dự đoán sớm phách 1 của ô sau).
  - Cực phổ biến trong nhạc Latin (clave 3-2): ô tiếp theo phách 1 im → nhấn đã rơi ở cuối ô trước.

- **Ví dụ 3 — Đảo phách liên tục (off-beat pattern)**:
  - Nhấn tất cả vị trí lẻ trong 8 móc đơn: **2, 4, 6, 8** thay vì 1, 3, 5, 7.
  - = Toàn bộ ô nhịp bị đảo → nghe "ngược pha" — phong cách reggae.

- **Ví dụ 4 — Syncopation bằng liên âm (tie)**:
  - Nốt bắt đầu ở vị trí 2 ("and 1"), được nối (tie) sang vị trí 3 (phách đen 2).
  - Phách đen 2 không có nốt mới, chỉ kéo dài nốt từ vị trí yếu → nhấn mạnh hiệu quả ở vị trí 2.
  - Đây là loại syncopation hay gặp nhất trong pop/soul.

> ⚠ **Lỗi thường gặp.** Nhiều người nhầm "đảo phách" với "đặt nốt ở phách yếu". Sai — phách yếu vẫn có thể không đảo phách nếu phách mạnh cũng có nhấn. Đảo phách thật sự là khi phách mạnh **im lặng** (nghỉ hoặc tie) mà phách yếu lại được nhấn rõ ràng hơn.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Làm sao nghe ra đảo phách nếu mình chưa quen?"* — Vỗ tay đều theo phách đen (1,2,3,4), rồi nghe nhạc. Chỗ nào cảm giác "nhịp nhạc đến trước tay mình" là đảo phách.
> - *"Có ký hiệu đặc biệt trong sheet music không?"* — Dấu nhấn \`>\` hoặc \`^\` đặt trên nốt. Tie từ phách yếu sang phách mạnh cũng là ký hiệu phổ biến cho syncopation.
> - *"Trong DAW (phần mềm sản xuất âm nhạc), đảo phách trông như thế nào?"* — Trong piano roll, khối nốt bắt đầu không khớp với các đường lưới phách đen (grid lines).

> 🔁 **Dừng lại tự kiểm tra.** Trong 4/4, một nốt bắt đầu ở "and 3" (vị trí 6 trong 8 móc đơn) và kéo dài qua phách 4 (vị trí 7). Đây có phải là đảo phách không? Vì sao?
> <details><summary>Đáp án</summary>
>
> **Có, đây là đảo phách.** Nốt bắt đầu ở vị trí yếu (vị trí 6 — "and 3"), và kéo sang phách 4 (vị trí 7 — phách yếu trong 4/4, nhưng mạnh hơn nửa phách). Phách 4 không có nốt mới mà được "carry over" từ nửa phách trước → nhấn thực tế rơi ở vị trí yếu (vị trí 6), không phải vị trí mạnh. Đây là cấu trúc syncopation bằng tie điển hình.
> </details>

> 📝 **Tóm tắt mục 1.**
> - Đảo phách = nhấn ở phách/nửa phách yếu; phách mạnh im lặng.
> - Tạo groove, năng lượng, bất ngờ — đặc trưng của funk, jazz, Latin, reggae.
> - Ba cơ chế: (1) nốt bắt đầu ở vị trí yếu, (2) tie từ yếu sang mạnh, (3) nghỉ ở phách mạnh.

---

## 2. Liên ba & chùm nốt (Tuplets)

> 💡 **Trực giác.** Thường một phách đen chia thành 2 móc đơn. Liên ba (triplet) chia cùng thời gian đó thành **3 phần đều**. Nghe "1-và-a, 2-và-a" — ba tiếng trong một phách, mỗi tiếng ngắn hơn móc đơn thường.

### 2.1 Định nghĩa

**(a) Là gì.** Tuplet (chùm nốt) là nhóm nốt chia thời gian thành số phần **không phải lũy thừa 2**. Tuplet phổ biến nhất là **triplet** (liên ba): 3 nốt đều trong thời gian của 2 nốt cùng loại.

**(b) Vì sao cần.** Hệ thống ghi nhạc phương Tây dựa trên chia đôi (nốt tròn → trắng → đen → móc đơn...). Triplet là cách "nhét" 3 vào không gian của 2 mà không phá vỡ ô nhịp. Điều này tạo cảm giác "chảy" khác biệt hẳn nhịp thường.

**(c) Bốn ví dụ số:**

- **Ví dụ 1 — Triplet móc đơn trong 4/4**:
  - 1 phách đen = 2 móc đơn (straight).
  - Triplet: 3 móc đơn trong cùng 1 phách đen. Mỗi nốt dài \`1/3\` phách.
  - Tốc độ 120 BPM: 1 phách = 500ms → mỗi nốt triplet = 500/3 ≈ **166.7 ms**.
  - Móc đơn straight: mỗi nốt = 500/2 = **250 ms**. Triplet nhanh hơn 1.5×.

- **Ví dụ 2 — Triplet nốt đen (quarter-note triplet)**:
  - 2 phách đen = thời gian để chơi 3 nốt đen triplet.
  - 120 BPM: 2 phách = 1000ms → mỗi nốt đen triplet = 1000/3 ≈ **333.3 ms**.

- **Ví dụ 3 — Quintuplet (5 nốt trong thời gian 4)**:
  - 4 móc đơn → chia thành 5 phần đều. Mỗi phần = 4/5 = **0.8 nốt móc đơn**.
  - 120 BPM: 4 móc đơn = 1000ms → mỗi nốt = **200 ms**.
  - Hay dùng trong nhạc cổ điển (Chopin) và prog rock.

- **Ví dụ 4 — Duplet trong nhịp 6/8**:
  - Ô 6/8 cơ bản = 2 nhóm 3 móc đơn. Duplet: 2 nốt đều trong thời gian 3 móc đơn.
  - 120 BPM (♩. = 120): 3 móc đơn = 250ms → mỗi nốt duplet = **125 ms** (thay vì 166.7ms).

> ⚠ **Lỗi thường gặp.** Người mới thường chơi triplet như **2 nốt đều + 1 nốt ngắn hơn** (1:1:0.5) thay vì đúng 1:1:1. Hoặc chơi quá nhanh toàn bộ nhóm rồi "đợi" — thời lượng tổng phải bằng đúng 2 nốt thường.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Triplet và swing khác nhau như thế nào?"* — Triplet chia chính xác 3 đều; swing là **cặp** móc đơn chơi theo tỷ lệ xấp xỉ 2:1 (dài-ngắn), không phải 3 nốt đều. Triplet là ký hiệu chính xác; swing là phong cách trình diễn. Xem mục 4.
> - *"Ký hiệu trong sheet music?"* — Nhóm nốt bọc trong khung với số "3" (triplet), "5" (quintuplet) v.v. Số này ghi phía trên hoặc dưới nhóm nốt.

> 🔁 **Dừng lại tự kiểm tra.** Ở 100 BPM, một ô nhịp 4/4 kéo dài bao lâu? Và mỗi nốt trong một triplet móc đơn dài bao nhiêu ms?
> <details><summary>Đáp án</summary>
>
> - 1 phách đen ở 100 BPM = 60000/100 = **600 ms**.
> - Ô 4/4 = 4 phách = **2400 ms**.
> - Triplet móc đơn: 3 nốt trong 1 phách = 600/3 = **200 ms** mỗi nốt.
> </details>

> 📝 **Tóm tắt mục 2.**
> - Tuplet = chia thời gian thành số phần "lạ" (3, 5, 7...) thay vì bội số 2.
> - Triplet phổ biến nhất: 3 nốt đều trong thời gian 2 nốt cùng loại.
> - Thời lượng mỗi nốt = (thời gian của nhóm) ÷ (số nốt trong tuplet).

---

## 3. Polyrhythm — Đa nhịp (Two Rhythms at Once)

> 💡 **Trực giác.** Tưởng tượng tay trái đang gõ nhịp ba đều (1-2-3, 1-2-3...) trong khi tay phải gõ nhịp đôi (1-2, 1-2...) — cùng tốc độ tổng thể, nhưng mỗi tay chia khác nhau. Hai mẫu nhịp "chọi nhau" trong cùng một khoảng thời gian → đó là polyrhythm.

### 3.1 Định nghĩa

**(a) Là gì.** Polyrhythm (đa nhịp) là đồng thời phát hai (hoặc hơn) mẫu nhịp có số phách khác nhau, nhưng cùng kết thúc vào một điểm. Phổ biến nhất: **3-chọi-2** (3 against 2), hay viết 3:2.

**(b) Vì sao tồn tại.** Tạo chiều sâu nhịp điệu — hai lớp âm nhạc "trôi" theo hướng khác nhau mà vẫn gặp nhau ở đầu chu kỳ. Nguồn gốc từ âm nhạc châu Phi (sub-Saharan), lan sang jazz, phong cách Brazil (baião, samba clave), và nhạc cổ điển hiện đại.

**(c) Phân tích số học — polyrhythm 3:2:**

Nếu lớp A có 3 nốt đều và lớp B có 2 nốt đều, cùng kéo dài 1 ô nhịp:

- **LCM(3, 2) = 6** → chia ô nhịp thành **6 mốc thời gian bằng nhau**.
- Lớp A (3 nốt): đánh vào mốc **1, 3, 5** (mỗi nốt cách nhau 2 đơn vị).
- Lớp B (2 nốt): đánh vào mốc **1, 4** (mỗi nốt cách nhau 3 đơn vị).
- Chỉ **mốc 1** là cả hai cùng đánh. Các mốc khác lệch nhau.

Bảng vị trí (✓ = có nốt, · = im lặng):

| Mốc | 1 | 2 | 3 | 4 | 5 | 6 |
|-----|---|---|---|---|---|---|
| Lớp A (3 nốt) | ✓ | · | ✓ | · | ✓ | · |
| Lớp B (2 nốt) | ✓ | · | · | ✓ | · | · |

- **Ví dụ 1 — 3:2 ở 120 BPM**:
  - 1 ô nhịp = 2 phách đen = 1000 ms.
  - 6 mốc đều: mỗi mốc = 1000/6 ≈ **166.7 ms**.
  - Lớp A gõ tại: 0 ms, 333.3 ms, 666.7 ms.
  - Lớp B gõ tại: 0 ms, 500 ms.
  - Hai lớp chỉ gặp nhau tại mốc 0 (và 1000 ms = đầu ô kế).

- **Ví dụ 2 — 4:3 (LCM = 12)**:
  - Lớp A (4 nốt): đánh tại mốc 1, 4, 7, 10.
  - Lớp B (3 nốt): đánh tại mốc 1, 5, 9.
  - Chỉ gặp nhau tại mốc 1.

- **Ví dụ 3 — Hemiola (dạng 3:2 ở cấp phách)**:
  - Trong nhịp 6/4: 6 phách đen được nhóm thành **2 nhóm 3** (nhịp 6/4 bình thường) **hoặc 3 nhóm 2** (hemiola).
  - Khi hemiola xuất hiện, tai nghe nhịp tạm thời chuyển từ "3+3" sang "2+2+2".
  - Hay gặp trong nhạc baroque, Brahms, và nhạc Latin.

- **Ví dụ 4 — 5:4 trong nhạc cổ điển**:
  - LCM(5,4) = 20 → chia thành 20 mốc nhỏ.
  - Lớp A (5 nốt): mốc 1, 5, 9, 13, 17.
  - Lớp B (4 nốt): mốc 1, 6, 11, 16.
  - Gặp nhau duy nhất tại mốc 1 trong một chu kỳ.

> ⚠ **Lỗi thường gặp.** Nhầm polyrhythm với **polymeter** — hai tình huống khác nhau:
> - **Polyrhythm**: hai mẫu nhịp có số phách khác nhau nhưng cùng **độ dài chu kỳ**. Chúng kết thúc cùng lúc.
> - **Polymeter**: hai ô nhịp có **meter khác nhau** (vd 3/4 và 4/4 chạy song song) — chúng kết thúc khác thời điểm và chỉ "hội tụ" sau nhiều ô.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Làm sao tập tay chơi polyrhythm 3:2?"* — Cách cổ điển: đọc "nice-cup-of-TEA" — "nice-cup-of" = 3 nốt bên trái, "of-TEA" = 2 nốt bên phải. Hoặc đếm LCM: "1-2-3-4-5-6", tay trái đánh nhịp 1,3,5; tay phải đánh 1,4.
> - *"Trong âm nhạc thật thì tìm thấy polyrhythm ở đâu?"* — "Piano Man" (Billy Joel) có 3:4, nhạc truyền thống Ghana/Nigeria dùng clave 3:2, Chopin mazurka, Brahms symphony.

> 🔁 **Dừng lại tự kiểm tra.** Polyrhythm 5:3 có LCM bằng bao nhiêu? Trong chu kỳ đó, lớp 5 nốt đánh tại mốc nào?
> <details><summary>Đáp án</summary>
>
> - LCM(5, 3) = **15**.
> - 15 mốc, chia đều: lớp 5 nốt mỗi nốt cách nhau 15/5 = **3 đơn vị** → đánh tại mốc **1, 4, 7, 10, 13**.
> - Lớp 3 nốt mỗi nốt cách nhau 15/3 = 5 đơn vị → đánh tại mốc **1, 6, 11**.
> - Chỉ gặp nhau tại mốc **1**.
> </details>

> 📝 **Tóm tắt mục 3.**
> - Polyrhythm = hai mẫu nhịp "x-chọi-y" cùng thời gian, chia theo LCM.
> - 3:2 phổ biến nhất: LCM = 6 mốc, chỉ gặp nhau ở đầu chu kỳ.
> - Hemiola = 3:2 ở cấp phách (đổi cảm giác nhóm nhịp).
> - Không nhầm với polymeter (meter khác nhau, chu kỳ không đồng bộ).

---

## 4. Swing — Lắc lư (Long–Short Feel)

> 💡 **Trực giác.** Nhạc jazz hay blues không chơi đều "tích-tích-tích-tích" như máy đếm giờ. Cặp móc đơn được biến thành "TÍC-tích" — nốt đầu dài hơn nốt sau khoảng 2:1. Kết quả là âm nhạc "lắc lư" thay vì đều đặn cứng nhắc.

### 4.1 Định nghĩa

**(a) Là gì.** Swing là phong cách diễn tấu trong đó **cặp móc đơn liên tiếp được chơi không đều**: nốt đầu dài hơn, nốt sau ngắn hơn. Tỷ lệ dài:ngắn phổ biến là **~2:1** (xấp xỉ triplet feel).

**(b) Vì sao tồn tại.** Hệ thống ghi nhạc không thể ký hiệu chính xác swing — nếu ký hiệu bằng triplet thì phức tạp, nếu ghi "♩♪♪" (đen + 2 móc) thì cứng quá. Nhạc jazz giải quyết bằng chữ "Swing" ở đầu bản nhạc + truyền miệng thầy-trò. Người chơi hiểu ký hiệu móc đơn thực ra là triplet feel (2:1).

**(c) Bốn ví dụ số:**

- **Ví dụ 1 — Straight vs. Swing, 120 BPM**:
  - Straight: 2 móc đơn = mỗi nốt **250 ms** (1:1).
  - Swing 2:1: nốt đầu = **333 ms**, nốt sau = **167 ms** (như triplet: 2 nốt đầu của nhóm 3).
  - Swing "nhẹ" 1.5:1: nốt đầu = **300 ms**, nốt sau = **200 ms**.

- **Ví dụ 2 — Swing ratio theo thể loại**:
  - Jazz swing truyền thống: ~2:1 (hard swing, = 66.7% : 33.3%).
  - Jazz "medium swing": ~1.7:1 (tỷ lệ thường gặp ở tempo trung 120–160 BPM).
  - Shuffle blues: ~2:1, nhưng thường có nốt giữa triplet im lặng rõ ràng hơn.
  - Tempo nhanh (200+ BPM): swing ratio gần về 1:1 (straight) — không còn đủ thời gian để "lắc".

- **Ví dụ 3 — Swing ghi trong DAW**:
  - Trong piano roll, "swing 66%" = nốt chẵn (off-beat) bị đẩy về sau đến 66% của phách thay vì 50%.
  - Ví dụ: 4 móc đơn trong 1 phách đen (tốc độ 8th note grid). Straight = vị trí 50%; Swing 66% = nốt off-beat dịch sang vị trí 66%.

- **Ví dụ 4 — Tác động lên cảm giác**:
  - Straight at 120 BPM: tick tại 0, 250, 500, 750 ms.
  - Swing 2:1 at 120 BPM: tick tại 0, **333**, 500, **833** ms.
  - Nốt off-beat "nấn ná" — cảm giác nhạc "thở" và "lắc lư".

> ⚠ **Lỗi thường gặp.** Nhiều người học chơi swing bằng cách **nhấn mạnh nốt off-beat** thay vì thay đổi thời lượng. Swing là về **timing** (thời điểm xuất hiện), không phải velocity (độ mạnh). Nốt off-beat thường chơi nhẹ hơn, không mạnh hơn.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Backbeat và swing liên quan nhau như thế nào?"* — Backbeat là về *vị trí nhấn* (phách 2 và 4). Swing là về *tỷ lệ thời gian* của cặp móc đơn. Nhạc jazz-rock có thể có cả hai: backbeat snare trên 2 và 4, đồng thời comping swing. Xem mục 5.
> - *"Có phần mềm nào tự động thêm swing không?"* — Có. Logic Pro, Ableton Live đều có tính năng "Swing" hoặc "Groove" — đẩy off-beat về sau theo tỷ lệ tùy chọn.

> 🔁 **Dừng lại tự kiểm tra.** Ở 100 BPM, một cặp móc đơn kéo dài 600 ms. Với swing ratio 2:1, nốt đầu và nốt sau mỗi nốt dài bao nhiêu ms?
> <details><summary>Đáp án</summary>
>
> - Tổng = 600 ms.
> - Tỷ lệ 2:1 → nốt đầu = 2/3 × 600 = **400 ms**; nốt sau = 1/3 × 600 = **200 ms**.
> - Lưu ý: đây xấp xỉ như 2 nốt đầu của triplet (200 ms, 200 ms, 200 ms → swing = 400 ms + 200 ms).
> </details>

> 📝 **Tóm tắt mục 4.**
> - Swing = cặp móc đơn chơi dài:ngắn ≈ 2:1 (thay vì đều 1:1 "straight").
> - Tỷ lệ phụ thuộc tempo và phong cách: jazz = hard swing ~2:1; medium swing ~1.7:1.
> - Swing là phong cách trình diễn (performance practice), không thể ký hiệu hoàn toàn chính xác trong sheet music.

---

## 5. Backbeat — Nhịp Đập Sau (Pop/Rock Groove)

> 💡 **Trực giác.** Trong phần lớn nhạc pop/rock, trống snare đánh vào **phách 2 và 4** — trong khi kick drum (bass drum) đánh phách 1 (và thường cả 3). Cặp 2&4 này tạo ra "phản nhịp" khiến người nghe tự nhiên gật đầu, nhún vai — đó là backbeat. 

### 5.1 Định nghĩa và ví dụ

**(a) Là gì.** Backbeat (nhịp đập sau) = **nhấn mạnh vào phách yếu thứ hai (phách 2 và 4)** trong ô nhịp 4/4, thường bằng snare drum. Đây là đặc trưng số một của nhạc pop, rock, R&B, funk, hip-hop.

**(b) Vì sao tồn tại.** Nhạc châu Âu cổ điển nhấn phách 1 và 3 (downbeat). Nhạc gốc châu Phi nhấn ngược — off-beat patterns. Khi hòa trộn ở Mỹ (blues → jazz → rock'n'roll), backbeat phách 2&4 trở thành "ngôn ngữ chung" của nhạc phổ thông. Nó tạo năng lượng và sự chuyển động rõ ràng.

**(c) Bốn ví dụ số trong 4/4:**

- **Ví dụ 1 — Groove rock cơ bản**:
  - Kick drum: phách **1, 3** (hoặc biến thể 1, 2½, 3½...).
  - Snare (backbeat): phách **2, 4**.
  - Hi-hat: đánh đều 8 móc đơn (eighth-note grid) hoặc đều 4 phách.
  - Kết quả: KICK-*SNARE*-KICK-*SNARE*.

- **Ví dụ 2 — Backbeat vs. downbeat (nhịp đầu phách)**:
  - Nhịp march/polka: nhấn phách 1 > 3 > 2 > 4 (downbeat feel — "oompah").
  - Rock backbeat: nhấn phách 2 = 4 > 1 (backbeat feel — "TCHA").
  - Cùng ô nhịp 4/4, nhưng trọng tâm cảm giác ngược nhau.

- **Ví dụ 3 — Displaced backbeat (backbeat dịch chỗ)**:
  - Thay vì snare ở phách 2 và 4, đặt snare ở phách 2½ và 4½ ("and 2" và "and 4").
  - Tạo groove "nặng" hơn, hay dùng trong hip-hop (trap music).

- **Ví dụ 4 — Half-time groove**:
  - Snare chỉ đánh **1 lần** mỗi ô nhịp, tại phách **3** (thay vì 2 và 4).
  - Cảm giác: nhịp chậm lại (half-time feel) dù tempo BPM không đổi.
  - Phổ biến trong bridge bài pop, intro của nhiều bài hip-hop.

> ⚠ **Lỗi thường gặp.** Nhầm "backbeat" với "syncopation". Backbeat snare ở phách 2 và 4 **không** phải syncopation vì phách 2&4 là phách đầy đủ (dù yếu hơn 1 và 3). Syncopation thật là nhấn vào *nửa phách* hoặc khi phách mạnh im lặng.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Trong nhạc jazz, backbeat có không?"* — Có, nhưng nhẹ nhàng và ít cứng nhắc hơn rock. Jazz thường nhấn snare bằng brushes (chổi) thay vì stick, và thường "ghost note" (nốt nhẹ) chứ không full accent.
> - *"Tại sao nhạc dân ca/cổ điển không có backbeat?"* — Vì nguồn gốc khác nhau. Nhạc march/waltz nhấn downbeat (phách 1 mạnh nhất). Backbeat đến từ ảnh hưởng nhịp điệu châu Phi.

> 📝 **Tóm tắt mục 5.**
> - Backbeat = snare/vỗ tay ở phách 2 và 4 trong 4/4 → đặc trưng rock/pop/R&B.
> - Tạo groove, năng lượng, chuyển động cơ thể.
> - Biến thể: displaced backbeat (and 2, and 4), half-time (chỉ phách 3).

---

## 6. Bài tập

1. **Đảo phách.** Trong ô 4/4 chia thành 8 móc đơn (đánh số 1–8), hãy xác định 3 vị trí đảo phách điển hình và giải thích vì sao mỗi vị trí là đảo phách.

2. **Triplet.** Ở 90 BPM, một ô nhịp 4/4 có bao nhiêu triplet móc đơn vừa khít? Mỗi nốt triplet dài bao nhiêu ms?

3. **Polyrhythm 3:2.** Vẽ (hoặc mô tả bằng bảng) vị trí các nốt của polyrhythm 3:2 trong 6 mốc thời gian đều. Tính: ở 120 BPM (1 ô 4/4 = 2000 ms, 6 mốc), mỗi mốc cách nhau bao nhiêu ms?

4. **Swing ratio.** Ở 140 BPM, một cặp móc đơn tổng cộng dài bao nhiêu ms? Với swing ratio 1.8:1, nốt đầu và nốt sau mỗi nốt dài bao nhiêu ms?

5. **Backbeat phân tích.** Một bài rock groove có kick ở phách 1, 2.5 (and 2), 3 và snare ở phách 2, 4. Hỏi: (a) vị trí nào là backbeat; (b) vị trí kick 2.5 có phải đảo phách không? Giải thích.

---

## Lời giải chi tiết

**Bài 1.** Ba vị trí đảo phách trong 8 móc đơn:

- **Vị trí 2 ("and 1")**: Nốt ở đây rơi vào nửa phách yếu giữa phách đen 1 và 2. Nếu phách đen 1 im (nghỉ hoặc tie từ trước) và nhấn mạnh tại vị trí 2 → đảo phách. Hay gặp trong funk và R&B.
- **Vị trí 4 ("and 2")**: Tương tự, giữa phách đen 2 và 3. Nhấn tại vị trí 4 trong khi phách đen 2 không có nốt mới → đảo phách. Đây là vị trí clave 3-2 thứ hai nhấn vào.
- **Vị trí 6 ("and 3")**: Giữa phách đen 3 và 4. Phách đen 3 thường mạnh vừa — nếu im và nốt rơi ở vị trí 6 → hiệu ứng đảo phách rõ ràng. Phổ biến trong nhạc Latin và hip-hop.

Cả ba vị trí đều là **nửa phách (off-beat)**: chúng rơi vào mốc thời gian không có phách đen. Đảo phách xuất hiện khi phách đen liền trước (phách mạnh hơn) im lặng.

---

**Bài 2.** Tính triplet ở 90 BPM:

- 1 phách đen ở 90 BPM = 60000/90 = **666.7 ms**.
- 1 ô nhịp 4/4 = 4 phách = 4 × 666.7 = **2666.7 ms**.
- Mỗi phách đen chứa đúng 1 triplet móc đơn (3 nốt trong 1 phách).
- 4/4 có **4 phách** → **4 triplet**, tức **12 nốt triplet** vừa khít.
- Mỗi nốt triplet = 666.7/3 ≈ **222.2 ms**.

---

**Bài 3.** Polyrhythm 3:2 trong 6 mốc, ô 4/4 ở 120 BPM:

- 1 ô nhịp 4/4 ở 120 BPM: 4 phách × (60000/120) = 4 × 500 = **2000 ms**.
- 6 mốc đều: mỗi mốc = 2000/6 ≈ **333.3 ms**.

Bảng:

| Mốc | 1 | 2 | 3 | 4 | 5 | 6 |
|-----|---|---|---|---|---|---|
| Lớp A (3 nốt) | ✓ (0ms) | · | ✓ (666ms) | · | ✓ (1333ms) | · |
| Lớp B (2 nốt) | ✓ (0ms) | · | · | ✓ (1000ms) | · | · |

Lớp A: 0 ms, 666.7 ms, 1333.3 ms. Lớp B: 0 ms, 1000 ms. Chỉ gặp tại 0 ms.

---

**Bài 4.** Swing ratio ở 140 BPM:

- 1 phách đen ở 140 BPM = 60000/140 ≈ **428.6 ms**.
- Cặp móc đơn = 1 phách đen = **428.6 ms** tổng.
- Tỷ lệ 1.8:1 → tổng phần = 1.8 + 1 = 2.8. Nốt đầu = (1.8/2.8) × 428.6 ≈ **275.4 ms**; nốt sau = (1/2.8) × 428.6 ≈ **153.1 ms**.
- Kiểm tra: 275.4 + 153.1 = 428.5 ms ✓ (sai số làm tròn nhỏ).

---

**Bài 5.** Phân tích groove:

- **(a) Backbeat**: Snare ở phách **2 và 4** — đây là backbeat điển hình (phách yếu trong 4/4 được nhấn bởi snare).
- **(b) Kick ở phách 2.5** ("and 2", tức "and 2" = vị trí 4 trong 8 móc đơn): Vị trí này là **nửa phách** — nằm giữa hai phách đen. Đây **là đảo phách** (syncopation) vì nó là nốt kick xuất hiện ở vị trí off-beat (nửa phách yếu), không phải phách đen thông thường. Bản thân snare ở phách 2 không phải syncopation (là phách đầy đủ dù yếu), nhưng kick ở 2.5 thì có.

---

## Code & Minh họa

- 🎵 [visualization.html](./visualization.html) — **Lab tiết tấu nâng cao** với ba công cụ tương tác:
  - **Lab đảo phách**: grid 8 ô, bật/tắt nhấn từng ô, nghe loop.
  - **Polyrhythm 3:2**: hai lớp tick (cao/thấp) phát song song, slider tốc độ.
  - **Swing slider**: straight ↔ swung, nghe sự khác biệt rõ ràng.

> 🔊 **Bật loa** — ba lab đều phát âm thanh Web Audio API thật.

---

## Bài tiếp theo

→ **Lesson 05 — Hình thức âm nhạc (Musical Form)**: cấu trúc bài nhạc — verse/chorus, rondo, sonata form, binary & ternary. Cách ghép các phần nhỏ thành một tác phẩm hoàn chỉnh.

[⬆ Về tầng Applied & Composition](../index.html) · [🏠 Trang chính Music](../../index.html)
`;
