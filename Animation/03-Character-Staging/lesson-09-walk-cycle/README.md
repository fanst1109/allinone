# Lesson 09 — Chu kỳ đi bộ (Walk Cycle)

> Bước đi tưởng đơn giản, nhưng là **bài test khó nhất** của animator: nếu chu kỳ đi bộ (walk cycle) thuyết phục, phần còn lại của nhân vật sẽ sống. Bí quyết: một vòng lặp khép kín đi qua đúng **4 pose mấu chốt**.

## Mục tiêu học tập

- Hiểu chu kỳ đi bộ là **chuyển động tuần hoàn (cyclic motion)** — vẽ một đoạn rồi lặp lại vô hạn.
- Nhận diện và dựng được **4 pose mấu chốt (key poses)** của mỗi nửa bước: **Contact**, **Down/Recoil**, **Passing**, **Up/High-point**.
- Nắm **timing** của bước đi tính bằng frame (số khung hình) và biết đổi nhịp: buồn/chậm ↔ nhanh/hoạt bát.
- Giải thích **đối xứng trái–phải** (nửa sau lặp gương của nửa trước) và vì sao **tay vung ngược pha (counter-phase) với chân**.

## Kiến thức tiền đề

- **Lesson 08 — Chuyển động phụ & gối đầu (secondary & overlapping action)**: tay, đầu, tóc "trễ pha" so với thân — dùng lại ở đây khi tay vung theo chân. Xem [../../02-Motion-Curves/lesson-08-secondary-overlapping/](../../02-Motion-Curves/lesson-08-secondary-overlapping/).
- Chỉ cần hình dung hình học đơn giản (góc, độ cao). Không cần vẽ đẹp — ở bài này ta dùng **nhân vật que (stick figure)**.

---

## 1. Chu kỳ đi bộ = một vòng lặp khép kín

> 💡 **Trực giác.** Đi bộ không phải "một chuyển động dài vô tận" mà là **một đoạn ngắn được tua lại**. Giống như hình nền chạy trên máy chạy bộ: nhân vật giậm chân tại chỗ, phông cảnh trôi ngược lại phía sau. Nếu khung hình cuối **nối liền** khung hình đầu (foot phải quay đúng về vị trí ban đầu), mắt sẽ thấy bước đi liên tục, mượt, không giật.

**Một chu kỳ đầy đủ (full cycle) = 2 bước (steps):** một bước chân phải dẫn trước, một bước chân trái dẫn trước. Sau 2 bước, nhân vật trở về **đúng pose ban đầu** → lặp lại.

- Mỗi **bước (step)** = 1 nửa chu kỳ, đi qua **4 pose mấu chốt** (giải thích ở mục 2).
- Vì cơ thể đối xứng trái–phải, nửa bước sau chỉ là **ảnh gương (mirror)** của nửa bước trước → animator thực chất chỉ cần thiết kế **1 bước rồi lật gương**.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao gọi là chu kỳ mà không vẽ thẳng cả đoạn đi dài?"* → Vì lặp lại **tiết kiệm 90% công sức**: 1 chu kỳ tốt lặp được vô hạn. Đây là chuẩn công nghiệp cho game (nhân vật đi mãi) lẫn phim.
> - *"Đi tại chỗ thì sao thấy tiến tới?"* → Ta cho **mặt đất trôi ngược** (như minh họa ở `visualization.html`). Bàn chân trụ giữ yên so với đất trôi → mắt đọc thành "bước tới".

---

## 2. Bốn pose mấu chốt của một bước

Mỗi bước đi qua 4 pose theo đúng thứ tự. Chúng khác nhau chủ yếu ở **độ cao của thân/hông (hip)** và **hình dạng chân trụ**. Ta quy ước một trục **độ cao hông** (đơn vị tương đối), lấy tư thế đứng thẳng làm mốc 0.

### 2.1 Bốn pose

**1. Contact (chạm đất).** Hai bàn chân chạm đất, hai chân **dạng rộng nhất** (một trước, một sau). Gót chân trước vừa tiếp đất, mũi chân sau còn bám. Thân ở độ cao **trung bình, hạ nhẹ** (chân dạng rộng nên với xuống đất ngắn hơn → hông tụt một chút).

**2. Down / Recoil (hạ – hấp thụ lực).** Ngay sau contact, chân trước nhận toàn bộ trọng lượng, **gối gập lại hấp thụ lực** như lò xo. Đây là điểm **thân THẤP NHẤT** trong cả bước.

**3. Passing (lướt qua).** Chân sau nhấc lên, **lướt qua** ngay dưới hông, gối gập cao để mũi chân không quệt đất. Chân trụ (chân trước cũ) **duỗi thẳng đứng** → đẩy thân **dâng lên**, độ cao trung-bình-cao.

**4. Up / High-point (đỉnh cao).** Chân trụ đạp lên **mũi bàn chân**, duỗi hết cỡ → thân bị đẩy lên **CAO NHẤT** và trườn về phía trước. Chân kia vung tới trước chuẩn bị tiếp đất. Sau pose này thân rơi xuống thành **Contact** của bước tiếp theo (đảo chân).

### 2.2 Độ cao hông dao động — ví dụ số cụ thể

Lấy đúng các giá trị dùng trong `visualization.html` (đơn vị tương đối, + là cao hơn mốc đứng):

| # | Pose | Frame (nhịp 12f/bước) | Độ cao hông | Chân trụ | Ghi chú |
|---|------|:---:|:---:|---|---|
| 1 | **Contact** | 1 | **−2** | hai chân dạng rộng | thân hạ nhẹ |
| 2 | **Down/Recoil** | 4 | **−9** | gối gập ~22° | **THẤP NHẤT** |
| 3 | **Passing** | 7 | **+3** | thẳng đứng | thân dâng lên |
| 4 | **Up/High** | 10 | **+8** | duỗi, đạp mũi | **CAO NHẤT** |

- **Biên độ nhấp nhô (peak-to-peak)** = từ −9 (Down) tới +8 (Up) = **17 đơn vị**.
- Trong một **full cycle** (2 bước), hông **nhấp nhô 2 lần** — mỗi bước một lần lên-xuống. Đây là "đường số 8" quen thuộc của hông khi đi.
- Quy đổi thực tế: người cao hông ~90 cm thì hông dao động khoảng **4–5 cm** mỗi bước — đủ để mắt cảm nhận "nhún", nhưng không lố.

> 💡 **Trực giác về độ cao.** Hãy nhớ chuỗi **THẤP → CAO**: Down là đáy (gối gập nuốt lực), Up là đỉnh (duỗi chân bắn người lên). Contact và Passing là hai mức trung gian. Nếu quên nhún này, nhân vật sẽ "trượt băng" — chân đi mà thân phẳng lì như lướt ván.

> ⚠ **Lỗi thường gặp.**
> - *Quên Down/Recoil:* nhảy thẳng từ Contact sang Passing → mất cảm giác trọng lượng, bước đi "nhẹ bẫng" như ma trơi. Recoil chính là nơi khán giả **cảm nhận sức nặng** cơ thể.
> - *Để thân phẳng (không nhấp nhô):* dấu hiệu số 1 của walk cycle nghiệp dư.
> - *Passing để chân thẳng đơ (không nhấc gối):* mũi chân quệt đất → trông như lê chân.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Trong 4 pose, pose nào thân **thấp nhất**? Pose nào **cao nhất**?
> 2. Vì sao tại Contact hông lại **thấp hơn** mốc đứng (−2), dù chưa tới Down?
>
> <details><summary>Đáp án</summary>
>
> 1. Thấp nhất = **Down/Recoil** (−9). Cao nhất = **Up/High-point** (+8).
> 2. Vì hai chân **dạng rộng** (một trước một sau) nên khoảng cách thẳng đứng từ hông xuống đất **ngắn lại** so với khi chân thẳng đứng — hình học tam giác: cạnh huyền (chân) cố định, khi dạng ra thì chiều cao giảm. Đó là lý do hông đã hơi tụt ngay ở Contact.
> </details>

---

## 3. Timing — bước đi nhanh hay chậm tính bằng frame

> 💡 **Trực giác.** "Tính cách" của bước đi nằm ở **số frame mỗi bước**. Cùng 4 pose đó, kéo dài ra → dáng lê thê, mệt mỏi; ép ngắn lại → hoạt bát, vội vã. Animator chỉnh nhịp bằng cách đổi **số khung hình giữa các pose**, không đổi bản thân các pose.

Ở **24 fps** (chuẩn phim), một bước đi "tự nhiên, thường ngày" mất khoảng **12 frame/bước** → **full cycle = 24 frame = 1.0 giây** (2 bước/giây). Bảng nhịp tham chiếu:

| Kiểu dáng | Frame/bước (24 fps) | Full cycle | Cảm giác |
|-----------|:---:|:---:|---|
| Buồn / mệt mỏi | 20–24 | ~1.7–2.0 s | nặng nề, lê thê |
| **Tự nhiên (chuẩn)** | **12** | **1.0 s** | thong thả, đời thường |
| Hoạt bát / vội | 8 | ~0.67 s | nhanh nhẹn, quả quyết |
| Sải nhanh (gần chạy) | 6 | ~0.5 s | gấp gáp |

**Walk-through 24 frame** (nhịp 12f/bước) — pose rơi vào frame nào:

| Frame | 1 | 4 | 7 | 10 | 13 | 16 | 19 | 22 | 25=1 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Pose | Contact (P) | Down | Passing | Up | Contact (T) | Down | Passing | Up | Contact (P) |
| Chân dẫn | **phải** | phải | phải | phải | **trái** | trái | trái | trái | phải (lặp) |

- 4 pose đầu (frame 1–10) = **bước chân phải dẫn**; 4 pose sau (frame 13–22) = **bước chân trái dẫn** (ảnh gương).
- Các frame còn lại (2–3, 5–6, ...) là **in-between** — máy hoặc animator nội suy giữa 2 pose mấu chốt liền kề.
- Frame 25 trùng frame 1 → **vòng khép kín**, lặp vô hạn.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"12 frame/bước có phải luật cứng?"* → Không. Đó là điểm khởi đầu tốt. Richard Williams (The Animator's Survival Kit) gọi ~12f là "walk chuẩn"; đổi nhịp là cách nhanh nhất đổi tính cách nhân vật.
> - *"Đổi fps thì sao?"* → Số **giây** mới là bất biến cảm nhận. Ở 30 fps, "12 frame ở 24fps" ≈ **15 frame** để giữ nguyên 0.5 s/bước. Luôn nghĩ bằng **thời gian**, quy ra frame theo fps.

> ⚠ **Lỗi thường gặp.** Đặt spacing (khoảng cách in-between) **đều tăm tắp** giữa các pose. Thực tế cần **ease**: quanh Passing chân lướt nhanh (spacing thưa), quanh Contact chậm lại (spacing dày) để "ghìm" trọng lượng. Xem lại nguyên tắc ease in/out ở Lesson 04.

---

## 4. Đối xứng trái–phải & tay vung ngược pha

### 4.1 Hai chân lệch nhau nửa chu kỳ

Chân trái và chân phải làm **cùng một điệu**, nhưng lệch nhau **đúng nửa chu kỳ (180°)**. Ở nhịp 12f/bước (full cycle 24f):

- Chân phải ở Contact tại **frame 1**; chân trái ở Contact tại **frame 13** = 1 + 12 → lệch **12 frame = nửa vòng**.
- Khi chân phải **duỗi ra sau** (đạp), chân trái **vung ra trước** — luôn đối nghịch.

Biểu diễn bằng góc đùi (thigh angle) so với phương thẳng đứng, + là vung ra trước:

$$\theta_{\text{đùi trái}}(t) = -\,\theta_{\text{đùi phải}}(t)$$

Đây chính là "lệch pha 180°": một chân dương thì chân kia âm cùng độ lớn.

### 4.2 Tay vung ngược pha với chân cùng bên

> 💡 **Trực giác.** Khi chân phải bước tới, thân có xu hướng **xoắn** sang phải. Để giữ thăng bằng (triệt tiêu mô-men xoắn), **tay phải vung ra sau** còn **tay trái vung ra trước**. Nói cách khác: **tay cùng bên luôn ngược pha với chân cùng bên**, và tay khớp pha với **chân đối diện**.

Ví dụ số tại pose **Contact** (chân phải dẫn), lấy đúng góc dùng trong viz:

| Bộ phận | Góc (độ, + = ra trước) |
|---------|:---:|
| Đùi **phải** | **+26°** (ra trước) |
| Tay **phải** | **−26°** (ra sau) |
| Đùi **trái** | **−24°** (ra sau) |
| Tay **trái** | **+26°** (ra trước) |

→ Đùi phải (+26°) và tay phải (−26°) **ngược dấu** = lệch pha 180°. Công thức:

$$\theta_{\text{tay phải}}(t) = -\,\theta_{\text{đùi phải}}(t)$$

> ⚠ **Lỗi thường gặp.** Cho **tay cùng bên vung cùng phía chân** (tay phải + chân phải cùng ra trước). Kết quả trông như robot / lính diễu hành đơ cứng — sai với cơ chế giữ thăng bằng tự nhiên. Trừ khi cố ý (hài, cứng nhắc), luôn để tay **ngược pha**.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Chân phải đang ở Up (đạp ra sau). Tay phải đang ở đâu — trước hay sau?
> 2. Nếu full cycle = 24 frame, chân trái đạt pose Up ở frame nào (biết chân phải đạt Up ở frame 10)?
>
> <details><summary>Đáp án</summary>
>
> 1. Chân phải ra sau (đạp) ⇒ tay phải **ngược pha** ⇒ tay phải vung **ra trước**.
> 2. Lệch nửa chu kỳ = 12 frame ⇒ chân trái đạt Up ở **frame 10 + 12 = 22**. Khớp bảng walk-through mục 3.
> </details>

> 📝 **Tóm tắt bài học.**
> - Walk cycle = **vòng lặp khép kín**; full cycle = 2 bước, nửa sau là ảnh gương nửa trước.
> - Mỗi bước có **4 pose mấu chốt**: Contact → Down (thấp nhất) → Passing → Up (cao nhất) → Contact (đảo chân).
> - Hông **nhấp nhô 2 lần/chu kỳ**; quên nhún = "trượt băng", quên Recoil = mất trọng lượng.
> - **Timing** tính bằng frame: ~12f/bước ở 24fps là "chuẩn"; đổi nhịp = đổi tính cách.
> - Hai chân lệch **180°**; **tay vung ngược pha với chân cùng bên** để giữ thăng bằng.

---

## 5. Bài tập

**Bài 1 (timing).** Một nhân vật đi nhịp **10 frame/bước** ở **24 fps**.
- a) Một full cycle dài bao nhiêu frame? Bao nhiêu giây?
- b) Nhân vật đi bao nhiêu **bước mỗi giây**?
- c) Nếu chuyển sang **30 fps** mà muốn giữ nguyên cảm giác thời gian, mỗi bước nên là bao nhiêu frame?

**Bài 2 (pose & độ cao).** Cho trục độ cao hông (mốc đứng = 0). Sắp xếp 4 pose sau theo **độ cao hông từ thấp đến cao** và điền tên: Contact, Down, Passing, Up. Sau đó tính **biên độ nhấp nhô peak-to-peak** nếu Down = −9 và Up = +8.

**Bài 3 (đối xứng & pha).** Full cycle = 16 frame (nhịp 8f/bước). Chân phải ở **Contact tại frame 1**, **Passing tại frame 5**.
- a) Chân trái ở Contact tại frame nào?
- b) Chân trái ở Passing tại frame nào?
- c) Tại frame 5 (chân phải Passing), tay phải đang vung ra **trước hay sau**? Giải thích.

**Bài 4 (vận dụng — dựng pose).** Bạn cần dựng pose **Passing** cho chân phải làm trụ. Hãy mô tả (bằng lời + góc gợi ý) trạng thái của: chân phải, chân trái, độ cao hông, và hai cánh tay.

---

## 6. Lời giải chi tiết

**Bài 1.** Cách tiếp cận: full cycle = 2 bước; giữ **thời gian** bất biến khi đổi fps.
- a) Full cycle = 2 × 10 = **20 frame**. Thời gian = 20 / 24 = **0.833 giây** (≈ 5/6 s).
- b) Số bước/giây = 24 / 10 = **2.4 bước/giây**.
- c) Muốn giữ **0.833 s/full cycle** ở 30 fps: full cycle = 0.833 × 30 = 25 frame → mỗi bước = 25 / 2 = **12.5 frame** (làm tròn 12 hoặc 13). Kiểm tra: 1 bước = 0.833/2 = 0.4167 s; 0.4167 × 30 = **12.5 frame** ✓.

**Bài 2.** Cách tiếp cận: nhớ chuỗi độ cao Down (đáy) → Contact → Passing → Up (đỉnh).
- Thứ tự từ thấp đến cao: **Down (−9) < Contact (−2) < Passing (+3) < Up (+8)**.
- Biên độ peak-to-peak = Up − Down = 8 − (−9) = **17 đơn vị**.

**Bài 3.** Cách tiếp cận: hai chân lệch **nửa chu kỳ**; full cycle 16f → nửa = **8 frame**.
- a) Chân trái Contact = frame 1 + 8 = **frame 9**.
- b) Chân trái Passing = frame 5 + 8 = **frame 13**.
- c) Tại frame 5 chân phải ở **Passing** — chân phải đang thẳng đứng làm trụ, đùi phải ≈ 0° (không rõ trước/sau), nhưng ngay trước đó (Down→Passing) chân phải chuyển từ trước ra dưới. Xét cơ chế: tay phải **ngược pha** đùi phải. Ở Passing đùi phải ≈ 0° nên tay phải cũng ≈ 0° (đang **băng qua trung tính**), chuyển từ sau ra trước. Nói gọn: tay phải đang **đi từ sau ra trước, ngang qua thân**. (Nếu buộc chọn một phía: sắp sang **trước**.)

**Bài 4.** Cách tiếp cận: đối chiếu định nghĩa Passing ở mục 2 + góc trong viz.
- **Chân phải (trụ):** duỗi **thẳng đứng**, đùi ≈ 0°, gối gần như thẳng (gập ~3°) — chống đỡ toàn bộ trọng lượng.
- **Chân trái (lướt qua):** nhấc khỏi đất, đùi ≈ 0° (ngay dưới hông), **gối gập cao ~46°** để mũi chân không quệt đất — đây là chân đang "lướt qua".
- **Độ cao hông:** dâng lên mức trung-bình-cao (**≈ +3**), vì chân trụ thẳng đứng nâng thân.
- **Hai tay:** cả hai gần **trung tính (≈ 0°)**, đang băng qua nhau — tay phải chuyển ra sau, tay trái chuyển ra trước (ngược pha chân tương ứng).

Kiểm tra logic: đây đúng là khoảnh khắc "chuyển giao" giữa nửa xuống (Down) và nửa lên (Up) — mọi thứ đi qua vị trí trung tính, nên là pose dễ nhận nhất để canh cả bước.

---

## 7. Code & Minh họa

Mở [visualization.html](./visualization.html) để xem **nhân vật que đi bộ bằng requestAnimationFrame**:

- **Play / Pause / Reset**, chỉnh **tốc độ** (frame/bước) và **sải bước (stride)** bằng slider.
- 4 nút **nhảy tới từng pose** (Contact / Down / Passing / Up) có nhãn — quan sát tĩnh từng key pose.
- Thân **nhấp nhô** đúng chuỗi độ cao, **tay vung ngược pha** với chân cùng bên, mặt đất trôi để cảm nhận bước tới.
- Vòng lặp **khép kín, mượt**, đi qua đúng 4 pose × 2 bước.

---

## Bài tiếp theo

**Lesson 10 — Dựng cảnh & bố cục (staging & composition)** *(sắp ra)*: đặt nhân vật vừa dựng vào **khung hình** — hướng nhìn, đường dẫn mắt, không gian âm — để khán giả đọc được hành động ngay từ silhouette. Xem [../lesson-10-staging-composition/](../lesson-10-staging-composition/).
