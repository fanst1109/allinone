// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: GameDev/02-Collision/lesson-04-collision-response-impulse/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 09 — Collision Response: Impulse (phản ứng va chạm bằng xung lực)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao phát hiện va chạm (collision detection) chưa đủ** — biết "có chạm" mới chỉ là một nửa, nửa còn lại là tính **vận tốc sau va chạm** (chúng bật ra hướng nào, nhanh bao nhiêu).
- Áp dụng **định luật bảo toàn động lượng (conservation of momentum)** và công thức va chạm 1D đàn hồi để tính $v_1', v_2'$.
- Hiểu **hệ số đàn hồi (coefficient of restitution) $e$** — điều khiển độ "nảy" từ dính ($e = 0$) tới nảy hoàn toàn ($e = 1$).
- Cài đặt **impulse resolution 2D**: tính xung lực $j$ dọc pháp tuyến va chạm $\\vec n$ rồi áp vào hai vật.
- Hiểu **positional correction** — vì sao phải đẩy hai vật ra khỏi nhau, và điều gì xảy ra nếu quên.
- Xử lý **vật khối lượng vô hạn** (tường, sàn tĩnh) bằng cách đặt $1/m = 0$.

## Kiến thức tiền đề

- [L06 — AABB & Circle (phát hiện chạm hộp/tròn)](../lesson-01-aabb-circle/) — cung cấp **điểm chạm** và **pháp tuyến** cho hình tròn.
- [L07 — SAT (Polygons)](../lesson-02-sat-polygons/) — cung cấp **Minimum Translation Vector (MTV)**, từ đó suy ra pháp tuyến va chạm $\\vec n$ và độ lún (penetration).
- [Physics — Momentum & Collisions](../../../Physics/01-Mechanics/lesson-05-momentum-collisions/) — nền vật lý: động lượng, xung lực, va chạm đàn hồi/không đàn hồi.

---

## 1. Vì sao cần "phản ứng va chạm"?

> 💡 **Trực giác.** Hai quả bi-a lăn trên bàn rồi đụng nhau. Mắt bạn phát hiện "chúng chạm" trong 1/100 giây — đó là phần **detection** (L06/L07). Nhưng điều thú vị nằm ở chỗ kế tiếp: quả bị bắn **bật ra hướng nào? nhanh bao nhiêu?** Đó là phần **response** — bài học này.

Ở [L06](../lesson-01-aabb-circle/) và [L07](../lesson-02-sat-polygons/), ta học cách trả lời câu hỏi **"có chạm hay không?"** (true/false) và lấy được **pháp tuyến va chạm** $\\vec n$ cùng **độ lún** (penetration depth). Nhưng nếu chỉ dừng ở đó, game của bạn sẽ có hai vật **xuyên qua nhau** rồi đi tiếp như chưa có gì xảy ra — không thực tế.

**Câu hỏi mở bài (sẽ đóng trong §2 và §4):**

> Hai quả bi-a cùng khối lượng $m = 0.17$ kg. Quả A đang chạy sang phải với vận tốc $2$ m/s, đụng trực diện quả B đang đứng yên. Sau va chạm, mỗi quả đi với vận tốc bao nhiêu?

Đáp án (bi-a là va chạm gần đàn hồi, $e \\approx 0.95$, ở đây tạm coi $e = 1$): **A dừng lại, B chạy đi với $2$ m/s** — đúng như bạn thấy trên bàn bi-a thật. §2 sẽ chứng minh con số này từ công thức.

### 1.1. Hai bước của một collision frame

\`\`\`
Mỗi frame:
  1. DETECTION  (L06/L07)  → có chạm? lấy n (pháp tuyến) + penetration
  2. RESPONSE   (bài này)
       a. Impulse resolution → đổi VẬN TỐC (vật bật ra)
       b. Positional correction → đẩy hết LÚN (vật không dính/lún)
\`\`\`

> 💡 **Trực giác về xung lực (impulse).** Lực (force) là cái đẩy *liên tục* (trọng lực kéo bạn xuống mọi lúc). **Xung lực** là một "cú hích" *tức thời* — như cú búng tay vào viên bi. Về mặt vật lý, xung lực $\\vec J$ là **độ thay đổi động lượng**: $\\vec J = \\Delta \\vec p = m \\, \\Delta \\vec v$. Va chạm xảy ra cực nhanh (mili-giây), nên thay vì mô phỏng lực khổng lồ trong thời gian cực ngắn, ta áp thẳng một xung lực làm đổi vận tốc ngay lập tức.

> 📝 **Tóm tắt mục 1**
> - Detection (L06/L07) chỉ nói "có chạm" + cho $\\vec n$ và penetration; **response** mới tính vận tốc sau.
> - Mỗi frame: detection → impulse (đổi vận tốc) → positional correction (đẩy hết lún).
> - **Xung lực** = cú hích tức thời = $\\Delta \\vec p = m \\Delta \\vec v$. Va chạm quá nhanh để mô phỏng lực, nên áp thẳng xung lực.

---

## 2. Bảo toàn động lượng & va chạm 1D đàn hồi

### 2.1. Động lượng là gì? (định nghĩa tự đủ)

**(a) Là gì.** **Động lượng (momentum)** $p = m \\cdot v$ là đại lượng đo "lượng chuyển động" của một vật — khối lượng nhân vận tốc. Đơn vị: kg·m/s. Là **vector** (có hướng): vật nặng đi nhanh thì $p$ lớn; vật nặng đứng yên thì $p = 0$.

**(b) Vì sao cần.** Vì trong va chạm, **tổng động lượng của hệ kín được bảo toàn** — không tự sinh ra hay mất đi. Đây là một ràng buộc cứng giúp ta giải ra vận tốc sau va chạm. Vận tốc riêng lẻ thay đổi loạn xạ, nhưng *tổng* $m_1 v_1 + m_2 v_2$ thì cố định.

**(c) Ví dụ trực giác bằng số.** Xe tải $m = 2000$ kg chạy $10$ m/s có $p = 20000$ kg·m/s. Xe máy $m = 200$ kg muốn có cùng động lượng phải chạy $100$ m/s. Đó là lý do xe tải "khó cản" — động lượng lớn.

### 2.2. Định luật bảo toàn động lượng

Trong va chạm giữa hai vật (không có lực ngoài đáng kể trong khoảnh khắc va chạm):

$$m_1 v_1 + m_2 v_2 = m_1 v_1' + m_2 v_2'$$

(dấu phẩy \`'\` ký hiệu "sau va chạm"). Một phương trình, hai ẩn $v_1', v_2'$ → cần thêm một phương trình nữa. Phương trình đó đến từ **hệ số đàn hồi** (§3). Trường hợp đàn hồi hoàn toàn ($e = 1$), phương trình thứ hai là **bảo toàn động năng**:

$$\\tfrac{1}{2} m_1 v_1^2 + \\tfrac{1}{2} m_2 v_2^2 = \\tfrac{1}{2} m_1 v_1'^2 + \\tfrac{1}{2} m_2 v_2'^2$$

### 2.3. Công thức va chạm 1D đàn hồi

Giải hệ hai phương trình trên cho ra (với $e = 1$):

$$v_1' = \\frac{(m_1 - m_2) v_1 + 2 m_2 v_2}{m_1 + m_2}, \\qquad v_2' = \\frac{(m_2 - m_1) v_2 + 2 m_1 v_1}{m_1 + m_2}$$

> ⚠ **Lỗi thường gặp.** Đừng nhầm hai công thức. Mẹo nhớ: tử số của $v_1'$ có hệ số $(m_1 - m_2)$ đứng trước $v_1$ (vật của chính nó), và $2m_2$ đứng trước $v_2$ (vật kia). Đổi vai trò $1 \\leftrightarrow 2$ thì ra công thức $v_2'$.

### 2.4. Walk-through bằng số — 4 ví dụ

**Ví dụ 1 — cùng khối lượng, một vật đứng yên (đóng câu hỏi mở bài).**
$m_1 = m_2 = 0.17$, $v_1 = 2$, $v_2 = 0$.

$$v_1' = \\frac{(0.17 - 0.17)\\cdot 2 + 2\\cdot 0.17 \\cdot 0}{0.34} = \\frac{0}{0.34} = 0$$
$$v_2' = \\frac{(0.17 - 0.17)\\cdot 0 + 2\\cdot 0.17 \\cdot 2}{0.34} = \\frac{0.68}{0.34} = 2$$

→ **A dừng ($0$ m/s), B chạy đi ($2$ m/s).** Hai vật cùng khối lượng "đổi vận tốc cho nhau" — đúng như bàn bi-a. ✓ (đây là đáp án câu hỏi §1).

*Kiểm tra bảo toàn động lượng:* trước $= 0.17(2) + 0.17(0) = 0.34$; sau $= 0.17(0) + 0.17(2) = 0.34$ ✓.

**Ví dụ 2 — vật nặng đâm vật nhẹ đứng yên.**
$m_1 = 10$, $v_1 = 3$; $m_2 = 1$, $v_2 = 0$.

$$v_1' = \\frac{(10-1)\\cdot 3 + 2\\cdot 1\\cdot 0}{11} = \\frac{27}{11} \\approx 2.45$$
$$v_2' = \\frac{(1-10)\\cdot 0 + 2\\cdot 10\\cdot 3}{11} = \\frac{60}{11} \\approx 5.45$$

→ Vật nặng chỉ chậm lại chút ($3 \\to 2.45$), vật nhẹ **bị bắn đi nhanh gấp đôi** ($5.45$ m/s). Như búa đập bóng bàn.

*Kiểm tra:* trước $= 10(3) = 30$; sau $= 10(2.45) + 1(5.45) = 24.5 + 5.45 = 29.95 \\approx 30$ ✓ (sai số làm tròn).

**Ví dụ 3 — vật nhẹ đâm vật nặng đứng yên (dội ngược).**
$m_1 = 1$, $v_1 = 5$; $m_2 = 10$, $v_2 = 0$.

$$v_1' = \\frac{(1-10)\\cdot 5 + 0}{11} = \\frac{-45}{11} \\approx -4.09$$
$$v_2' = \\frac{0 + 2\\cdot 1\\cdot 5}{11} = \\frac{10}{11} \\approx 0.91$$

→ Vật nhẹ **dội ngược lại** ($v_1' < 0$) với tốc độ gần như cũ; vật nặng chỉ nhích lên $0.91$ m/s. Như bóng tennis đập tường (giới hạn $m_2 \\to \\infty$ là phản xạ hoàn toàn — xem §5).

**Ví dụ 4 — hai vật lao vào nhau (vận tốc ngược dấu).**
$m_1 = 2$, $v_1 = 4$; $m_2 = 3$, $v_2 = -2$ (đi ngược).

$$v_1' = \\frac{(2-3)\\cdot 4 + 2\\cdot 3\\cdot(-2)}{5} = \\frac{-4 - 12}{5} = \\frac{-16}{5} = -3.2$$
$$v_2' = \\frac{(3-2)\\cdot(-2) + 2\\cdot 2\\cdot 4}{5} = \\frac{-2 + 16}{5} = \\frac{14}{5} = 2.8$$

→ Cả hai **đảo chiều**: vật 1 quay lại ($-3.2$), vật 2 bị đẩy ngược lại hướng vật 1 đến ($2.8$).

*Kiểm tra:* trước $= 2(4) + 3(-2) = 8 - 6 = 2$; sau $= 2(-3.2) + 3(2.8) = -6.4 + 8.4 = 2$ ✓.

> ❓ **Câu hỏi tự nhiên của người đọc**
> - *"Vì sao cùng khối lượng thì đổi vận tốc cho nhau?"* — Thế $m_1 = m_2 = m$ vào công thức: $(m_1 - m_2) = 0$ nên số hạng chứa $v_1$ biến mất, còn $v_1' = \\frac{2m v_2}{2m} = v_2$. Tương tự $v_2' = v_1$. Hai vận tốc hoán đổi.
> - *"Game 2D thì sao? Bi-a có đụng xiên cơ mà?"* — Đúng. Công thức 1D chỉ dùng khi va chạm trực diện (cùng đường thẳng). Va chạm xiên cần **chiếu vận tốc lên pháp tuyến** rồi mới áp công thức — chính là impulse resolution 2D ở §4.
> - *"Động năng có luôn bảo toàn không?"* — Chỉ khi $e = 1$ (đàn hồi hoàn toàn). Thực tế $e < 1$, một phần động năng biến thành nhiệt/âm thanh/biến dạng. Động *lượng* thì luôn bảo toàn, động *năng* thì không.

> 🔁 **Dừng lại tự kiểm tra.** $m_1 = 4, v_1 = 2$ đâm $m_2 = 4, v_2 = 0$ (cùng khối lượng). Vận tốc sau?
> <details><summary>Đáp án</summary>
> Cùng khối lượng → đổi vận tốc cho nhau: $v_1' = 0$, $v_2' = 2$. Vật 1 dừng, vật 2 chạy đi với $2$ m/s.
> </details>

> 📝 **Tóm tắt mục 2**
> - Động lượng $p = mv$; tổng động lượng hệ kín **luôn** bảo toàn: $m_1 v_1 + m_2 v_2 = m_1 v_1' + m_2 v_2'$.
> - Va chạm đàn hồi 1D: $v_1' = \\frac{(m_1-m_2)v_1 + 2m_2 v_2}{m_1+m_2}$, và đối xứng cho $v_2'$.
> - Cùng khối lượng → **đổi vận tốc cho nhau**. Vật nhẹ đâm vật rất nặng → **dội ngược**.

---

## 3. Hệ số đàn hồi (restitution) $e$

### 3.1. Định nghĩa tự đủ

**(a) Là gì.** **Hệ số đàn hồi $e$** (coefficient of restitution) là một số $0 \\le e \\le 1$ đo **độ "nảy"** của va chạm: tỉ số giữa **vận tốc tương đối tách ra** (sau) và **vận tốc tương đối lao vào** (trước).

$$e = \\frac{v_2' - v_1'}{v_1 - v_2} \\quad\\Longleftrightarrow\\quad (v_2' - v_1') = -e\\,(v_2 - v_1)$$

Diễn đạt gọn: **vận tốc tương đối sau $= -e \\times$ vận tốc tương đối trước.**

**(b) Vì sao cần.** §2 đã có một phương trình (bảo toàn động lượng), nhưng hai ẩn → thiếu một phương trình. $e$ cung cấp phương trình thứ hai **tổng quát** cho mọi loại va chạm — thay vì chỉ dùng bảo toàn động năng (vốn chỉ đúng khi $e=1$). $e$ gói gọn toàn bộ vật lý "vật cứng hay mềm, nảy hay dính" vào một con số duy nhất.

**(c) Ví dụ trực giác bằng số.** Thả bóng từ độ cao $h = 1$ m. Nếu nó nảy lên $0.64$ m thì... vận tốc chạm đất $\\propto \\sqrt{h}$, nên $e = \\sqrt{0.64 / 1} = 0.8$. Bóng rổ thật có $e \\approx 0.8$ — nảy lên khoảng $64\\%$ độ cao thả. Cục đất sét: $e \\approx 0$, dính bẹp.

### 3.2. Ba chế độ của $e$

| $e$ | Tên | Hành vi | Động năng |
| --- | --- | --- | --- |
| $e = 1$ | đàn hồi hoàn toàn (elastic) | nảy ra với cùng tốc độ tương đối | bảo toàn |
| $0 < e < 1$ | thực tế (partially elastic) | nảy ra chậm hơn, mất dần năng lượng | mất một phần |
| $e = 0$ | mềm/dính hoàn toàn (perfectly inelastic) | hai vật dính lại, đi cùng vận tốc | mất nhiều nhất |

### 3.3. Công thức 1D tổng quát với $e$ bất kỳ

Giải hệ {bảo toàn động lượng} + {$e$-equation}:

$$v_1' = \\frac{m_1 v_1 + m_2 v_2 + m_2 \\, e \\,(v_2 - v_1)}{m_1 + m_2}, \\qquad v_2' = \\frac{m_1 v_1 + m_2 v_2 + m_1 \\, e \\,(v_1 - v_2)}{m_1 + m_2}$$

Khi $e = 1$, công thức này trùng với §2.3 (kiểm chứng được).

### 3.4. Walk-through bằng số — 4 ví dụ ($m_1 = m_2 = 1$, $v_1 = 4$, $v_2 = 0$)

Tổng động lượng trước $= 1(4) + 1(0) = 4$ cho mọi ví dụ.

**Ví dụ 1 — $e = 1$ (đàn hồi hoàn toàn):**
$$v_1' = \\frac{4 + 0 + 1\\cdot 1\\cdot(0-4)}{2} = \\frac{4 - 4}{2} = 0, \\qquad v_2' = \\frac{4 + 0 + 1\\cdot 1\\cdot(4-0)}{2} = \\frac{8}{2} = 4$$
→ Đổi vận tốc cho nhau ($0$ và $4$), giống §2. Động lượng sau $= 0 + 4 = 4$ ✓.

**Ví dụ 2 — $e = 0.5$ (nửa đàn hồi):**
$$v_1' = \\frac{4 + 0.5(0-4)}{2} = \\frac{4 - 2}{2} = 1, \\qquad v_2' = \\frac{4 + 0.5(4-0)}{2} = \\frac{4 + 2}{2} = 3$$
→ Vật 1 còn đi $1$ m/s, vật 2 đi $3$ m/s. Tốc độ tách ($3 - 1 = 2$) $= 0.5 \\times$ tốc độ lao vào ($4$) ✓. Động lượng sau $= 1 + 3 = 4$ ✓.

**Ví dụ 3 — $e = 0$ (dính hoàn toàn):**
$$v_1' = \\frac{4 + 0}{2} = 2, \\qquad v_2' = \\frac{4 + 0}{2} = 2$$
→ Cả hai dính lại đi cùng $2$ m/s. Tốc độ tách $= 0$ ✓. Động lượng $= 2 + 2 = 4$ ✓. Động năng: trước $= \\frac12(1)(16) = 8$ J; sau $= \\frac12(2)(4) = 4$ J → **mất 4 J** (thành nhiệt/biến dạng).

**Ví dụ 4 — $e = 0.9$ (bi-a thật):**
$$v_1' = \\frac{4 + 0.9(-4)}{2} = \\frac{4 - 3.6}{2} = 0.2, \\qquad v_2' = \\frac{4 + 0.9(4)}{2} = \\frac{7.6}{2} = 3.8$$
→ Vật 1 gần dừng ($0.2$), vật 2 gần lấy hết ($3.8$). Tốc độ tách $3.6 = 0.9 \\times 4$ ✓. Đây là vì sao bi-a thật quả đâm gần như dừng nhưng vẫn lăn nhẹ tới.

> ⚠ **Lỗi thường gặp.** Dùng $e > 1$ vô tình → va chạm **tạo ra năng lượng** (vật nảy nhanh hơn lúc lao vào) → mô phỏng "nổ tung", các vật bay loạn. Luôn kẹp $0 \\le e \\le 1$. ($e$ của hai vật khác chất liệu thường lấy $e = \\min(e_1, e_2)$ hoặc $\\sqrt{e_1 e_2}$).

> ❓ **Câu hỏi tự nhiên của người đọc**
> - *"$e$ là thuộc tính của vật hay của cặp va chạm?"* — Về lý thuyết là của *cặp* (bóng cao su nảy trên gỗ khác trên cát). Trong game, ta thường gán $e$ cho từng vật rồi kết hợp khi chạm: \`e = min(a.e, b.e)\`.
> - *"Bóng rơi mãi sao cuối cùng nó nằm im?"* — Vì mỗi lần nảy mất $(1 - e^2)$ phần động năng. Sau nhiều lần, vận tốc nảy giảm dần về gần $0$ → game đặt ngưỡng "ngủ" (sleep) cho vật, sẽ gặp ở [L10](../lesson-05-friction-resting-stacking/).

> 🔁 **Dừng lại tự kiểm tra.** Thả bóng chạm đất ($e = 0.8$) với vận tốc $5$ m/s xuống. Đất coi như tường tĩnh. Vận tốc nảy lên?
> <details><summary>Đáp án</summary>
> Tường tĩnh ($m_2 = \\infty$, $v_2 = 0$): vận tốc tương đối sau $= -e \\times$ trước $= -0.8 \\times (-5) = 4$ m/s (đi lên). Bóng nảy lên với $4$ m/s. Tổng quát với tường: $v' = -e \\cdot v$.
> </details>

> 📝 **Tóm tắt mục 3**
> - $e$ đo độ nảy: vận tốc tương đối sau $= -e \\times$ trước. $e=1$ nảy hết, $e=0$ dính.
> - Công thức 1D tổng quát: $v_1' = \\frac{m_1 v_1 + m_2 v_2 + m_2 e (v_2 - v_1)}{m_1 + m_2}$.
> - Kẹp $0 \\le e \\le 1$ — $e > 1$ tạo năng lượng giả, làm vỡ mô phỏng.

---

## 4. Impulse resolution 2D

Va chạm 2D không trực diện (bi-a đụng xiên). Ý tưởng: **chiếu mọi thứ lên pháp tuyến va chạm $\\vec n$**, giải va chạm 1D *dọc theo $\\vec n$*, thành phần tiếp tuyến (vuông góc $\\vec n$) không đổi (nếu bỏ qua ma sát — ma sát học ở [L10](../lesson-05-friction-resting-stacking/)).

### 4.1. Pháp tuyến va chạm $\\vec n$ đến từ đâu?

- **Hai hình tròn:** $\\vec n = \\frac{\\vec c_2 - \\vec c_1}{|\\vec c_2 - \\vec c_1|}$ — vector đơn vị nối **tâm A → tâm B** (từ [L06](../lesson-01-aabb-circle/)).
- **Polygon (SAT):** $\\vec n$ chính là **trục của MTV** từ [L07](../lesson-02-sat-polygons/) — hướng đẩy ngắn nhất để tách hai hình.

**Quy ước hướng (rất quan trọng):** ở đây $\\vec n$ trỏ **từ vật 1 sang vật 2**.

### 4.2. Công thức impulse

Vận tốc tương đối: $\\vec v_{rel} = \\vec v_2 - \\vec v_1$. Thành phần dọc pháp tuyến: $v_n = \\vec v_{rel} \\cdot \\vec n$ (tích vô hướng).

**Độ lớn xung lực vô hướng** $j$ (scalar impulse):

$$j = \\frac{-(1 + e)\\,(\\vec v_{rel} \\cdot \\vec n)}{\\dfrac{1}{m_1} + \\dfrac{1}{m_2}}$$

Áp xung lực $\\vec J = j\\,\\vec n$ vào hai vật (ngược dấu vì định luật III Newton):

$$\\vec v_1' = \\vec v_1 - \\frac{j}{m_1}\\,\\vec n, \\qquad \\vec v_2' = \\vec v_2 + \\frac{j}{m_2}\\,\\vec n$$

> ⚠ **Dấu của $j$ và hướng $\\vec n$.** Với $\\vec n$ trỏ từ 1→2, nếu hai vật đang **lao vào nhau** thì $\\vec v_{rel} \\cdot \\vec n < 0$ (vật 2 đang tiến về phía vật 1 theo chiều ngược $\\vec n$), nên $j > 0$. Khi đó vật 1 nhận $-\\frac{j}{m_1}\\vec n$ (bị đẩy ngược chiều $\\vec n$, tức ra xa) và vật 2 nhận $+\\frac{j}{m_2}\\vec n$ (bị đẩy theo $\\vec n$, ra xa). **Nếu bạn đảo hướng $\\vec n$ mà quên đảo công thức → hai vật hút vào nhau thay vì bật ra.** Đây là bug kinh điển: nhân vật "dính" vào tường rồi bị hút xuyên qua.
>
> **Chốt an toàn:** nếu $\\vec v_{rel} \\cdot \\vec n > 0$ (hai vật **đang tách ra rồi**) thì *bỏ qua*, không áp xung — nếu không sẽ "bắt dính" vật vừa rời nhau, gây giật (jitter).

### 4.3. Walk-through ĐẦY ĐỦ bằng số — 2 vòng (CẤM "tương tự")

Cảnh báo: đây là va chạm **xiên** 2D nên phải làm từng bước, không có chuyện "tương tự 1D".

**Bối cảnh.** Hai đĩa tròn cùng bán kính:
- Vật 1: $m_1 = 2$, vị trí $\\vec c_1 = (0, 0)$, vận tốc $\\vec v_1 = (3, 0)$.
- Vật 2: $m_2 = 1$, vị trí $\\vec c_2 = (4, 3)$, vận tốc $\\vec v_2 = (-1, 0)$.
- Hệ số đàn hồi $e = 1$.

---

**VÒNG 1 — tính pháp tuyến $\\vec n$ và vận tốc tương đối.**

Bước 1.1 — vector nối tâm 1→2:
$$\\vec d = \\vec c_2 - \\vec c_1 = (4 - 0,\\; 3 - 0) = (4, 3)$$

Bước 1.2 — độ dài: $|\\vec d| = \\sqrt{4^2 + 3^2} = \\sqrt{16 + 9} = \\sqrt{25} = 5$.

Bước 1.3 — pháp tuyến đơn vị (1→2):
$$\\vec n = \\frac{\\vec d}{|\\vec d|} = \\left(\\frac{4}{5},\\, \\frac{3}{5}\\right) = (0.8,\\; 0.6)$$

Bước 1.4 — vận tốc tương đối:
$$\\vec v_{rel} = \\vec v_2 - \\vec v_1 = (-1 - 3,\\; 0 - 0) = (-4,\\; 0)$$

Bước 1.5 — thành phần dọc pháp tuyến (tích vô hướng):
$$v_n = \\vec v_{rel} \\cdot \\vec n = (-4)(0.8) + (0)(0.6) = -3.2$$

$v_n = -3.2 < 0$ → hai vật **đang lao vào nhau** → cần xử lý va chạm (không bỏ qua).

---

**VÒNG 2 — tính xung lực $j$ và vận tốc mới.**

Bước 2.1 — nghịch đảo khối lượng: $\\frac{1}{m_1} = \\frac{1}{2} = 0.5$, $\\frac{1}{m_2} = \\frac{1}{1} = 1$. Tổng $= 1.5$.

Bước 2.2 — độ lớn xung lực:
$$j = \\frac{-(1 + e)\\, v_n}{\\frac{1}{m_1} + \\frac{1}{m_2}} = \\frac{-(1 + 1)(-3.2)}{1.5} = \\frac{-2 \\times (-3.2)}{1.5} = \\frac{6.4}{1.5} \\approx 4.267$$

Bước 2.3 — vector xung lực: $\\vec J = j\\,\\vec n = 4.267 \\times (0.8, 0.6) = (3.413,\\; 2.560)$.

Bước 2.4 — vận tốc mới vật 1 ($\\vec v_1' = \\vec v_1 - \\frac{j}{m_1}\\vec n$):
$$\\frac{j}{m_1}\\vec n = \\frac{4.267}{2}(0.8, 0.6) = 2.133(0.8, 0.6) = (1.707,\\; 1.280)$$
$$\\vec v_1' = (3, 0) - (1.707,\\; 1.280) = (1.293,\\; -1.280)$$

Bước 2.5 — vận tốc mới vật 2 ($\\vec v_2' = \\vec v_2 + \\frac{j}{m_2}\\vec n$):
$$\\frac{j}{m_2}\\vec n = \\frac{4.267}{1}(0.8, 0.6) = (3.413,\\; 2.560)$$
$$\\vec v_2' = (-1, 0) + (3.413,\\; 2.560) = (2.413,\\; 2.560)$$

---

**Kiểm tra bảo toàn động lượng (từng trục):**
- Trục x: trước $= 2(3) + 1(-1) = 5$; sau $= 2(1.293) + 1(2.413) = 2.587 + 2.413 = 5.0$ ✓
- Trục y: trước $= 2(0) + 1(0) = 0$; sau $= 2(-1.280) + 1(2.560) = -2.560 + 2.560 = 0$ ✓

**Diễn giải hình học.** Vật 1 (đang đi sang phải) bị đẩy chếch xuống-phải, vật 2 (đang đi sang trái) bị bắn lên-phải. Cả hai bật ra **dọc đường nối tâm** — đúng vật lý va chạm xiên. Thành phần *tiếp tuyến* của vận tốc (vuông góc $\\vec n$) không đổi; chỉ thành phần *pháp tuyến* bị đảo.

> ❓ **Câu hỏi tự nhiên của người đọc**
> - *"Vì sao chia cho $\\frac{1}{m_1} + \\frac{1}{m_2}$ chứ không phải $m_1 + m_2$?"* — Vì xung lực làm đổi vận tốc theo $\\Delta v = J/m$, nên "khối lượng hiệu dụng" của hệ hai vật là khối lượng rút gọn (reduced mass) $\\mu = \\frac{1}{1/m_1 + 1/m_2}$. Chia cho $\\frac{1}{m_1}+\\frac{1}{m_2}$ chính là nhân với $\\mu$.
> - *"Dùng $\\frac{1}{m}$ có lợi gì so với $m$?"* — Lưu sẵn \`invMass = 1/m\` cho mỗi vật. Vật tĩnh (tường) đặt \`invMass = 0\` → tự động "vô hạn khối lượng" mà không chia cho 0 (xem §5). Code sạch hơn.

> 🔁 **Dừng lại tự kiểm tra.** Trong walk-through, nếu đổi $e$ từ $1$ xuống $0$, $j$ thay đổi thế nào và ý nghĩa?
> <details><summary>Đáp án</summary>
> $j = \\frac{-(1+0)(-3.2)}{1.5} = \\frac{3.2}{1.5} \\approx 2.133$ — bằng **một nửa** $j$ lúc $e=1$. Xung lực nhỏ hơn → hai vật chỉ vừa đủ thôi lao vào nhau (vận tốc tương đối pháp tuyến về $0$) chứ không bật ra. Đó là va chạm dính.
> </details>

### 4.4. Positional correction — đẩy hết lún (penetration)

> 💡 **Trực giác.** Impulse chỉ sửa **vận tốc**. Nhưng tại frame phát hiện va chạm, hai vật thường đã **lún vào nhau** một chút (penetration $> 0$, vì game chạy theo bước thời gian rời rạc). Nếu chỉ sửa vận tốc mà không tách vị trí, frame sau chúng vẫn còn chồng lên → lại tính va chạm → vận tốc rung loạn → vật **lún dần xuyên qua nhau (sinking)**.

Giải pháp: dịch vị trí hai vật ra xa nhau theo $\\vec n$, chia theo nghịch đảo khối lượng:

$$\\text{correction} = \\frac{\\max(\\text{penetration} - \\text{slop},\\, 0)}{\\frac{1}{m_1} + \\frac{1}{m_2}} \\cdot \\beta$$
$$\\vec c_1\\mathrel{-}= \\tfrac{1}{m_1}\\cdot\\text{correction}\\cdot\\vec n, \\qquad \\vec c_2\\mathrel{+}= \\tfrac{1}{m_2}\\cdot\\text{correction}\\cdot\\vec n$$

- $\\beta$ (percent, ~$0.2$–$0.8$): chỉ sửa *một phần* lún mỗi frame → tránh giật quá mạnh.
- \`slop\` (~$0.01$–$0.05$): cho phép lún rất nhỏ, không sửa → tránh rung khi vật nằm yên chồng nhẹ.

**Walk-through ngắn.** Hai đĩa $m_1 = m_2 = 1$ lún penetration $= 0.6$, $\\vec n = (1, 0)$, $\\beta = 0.5$, slop $= 0.05$.
$$\\text{correction} = \\frac{\\max(0.6 - 0.05, 0)}{1 + 1} \\cdot 0.5 = \\frac{0.55}{2} \\cdot 0.5 = 0.1375$$
Vật 1 dịch $-0.1375$ theo x, vật 2 dịch $+0.1375$ → tách thêm $0.275$ mỗi frame, sau vài frame hết lún. Vì cùng khối lượng, mỗi vật dịch bằng nhau.

> ⚠ **Lỗi thường gặp — quên positional correction.** Nếu chỉ áp impulse mà bỏ positional correction: vật rơi lên sàn sẽ **lún chìm dần** vào sàn (sinking) hoặc rung lập bập tại mép. Đây là một trong những bug hay gặp nhất khi mới viết engine. Luôn làm cả hai bước.

> ⚠ **Vì sao không đẩy hết 100% lún mỗi frame ($\\beta = 1$)?** Đẩy hết một phát dễ làm vật "nảy vọt" ra rồi frame sau lại lao lại → giật. $\\beta < 1$ làm việc tách diễn ra mượt qua vài frame.

> 📝 **Tóm tắt mục 4**
> - 2D = chiếu lên pháp tuyến $\\vec n$, giải va chạm dọc $\\vec n$; tiếp tuyến không đổi (chưa có ma sát).
> - $\\vec n$: nối tâm (tròn) hoặc trục MTV (SAT). Quy ước trỏ 1→2.
> - $j = \\frac{-(1+e)(\\vec v_{rel}\\cdot\\vec n)}{1/m_1 + 1/m_2}$; $\\vec v_1' = \\vec v_1 - \\frac{j}{m_1}\\vec n$, $\\vec v_2' = \\vec v_2 + \\frac{j}{m_2}\\vec n$.
> - Nếu $\\vec v_{rel}\\cdot\\vec n > 0$ (đang tách) → bỏ qua. Sai hướng $\\vec n$ → hút vào nhau (bug).
> - **Positional correction** đẩy hết lún để không sinking/jitter — đừng quên.

---

## 5. Vật khối lượng vô hạn (tường, sàn tĩnh)

> 💡 **Trực giác.** Sàn nhà không nhúc nhích khi bóng đập vào — nó "nặng vô hạn". Toán học hóa: $m \\to \\infty$ nên $\\frac{1}{m} \\to 0$. Vật tĩnh có **invMass $= 0$**.

Thế $\\frac{1}{m_2} = 0$ vào công thức impulse (vật 2 là tường):

$$j = \\frac{-(1+e)(\\vec v_{rel}\\cdot\\vec n)}{\\frac{1}{m_1} + 0} = -m_1(1+e)(\\vec v_{rel}\\cdot\\vec n)$$

Áp vào:
$$\\vec v_1' = \\vec v_1 - \\frac{j}{m_1}\\vec n, \\qquad \\vec v_2' = \\vec v_2 + \\underbrace{0 \\cdot j \\cdot \\vec n}_{= \\,\\vec 0} = \\vec v_2 \\;(\\text{không đổi})$$

→ **Chỉ vật động đổi vận tốc; tường đứng yên.** Đúng trực giác.

**Walk-through — bóng đập tường.** $m_1 = 2$, $\\vec v_1 = (5, -3)$, tường có pháp tuyến $\\vec n = (0, 1)$ (sàn nằm ngang, trỏ lên = từ tường → vật... lưu ý quy ước, ở đây tường là vật 1 hay 2 tùy code; lấy $\\vec n$ trỏ vào vật động), $e = 0.8$, tường $\\frac{1}{m} = 0$, $\\vec v_{wall} = (0,0)$.

$\\vec v_{rel} = \\vec v_{wall} - \\vec v_1 = (-5, 3)$. $v_n = \\vec v_{rel}\\cdot\\vec n = (-5)(0) + (3)(1) = 3$... dấu phụ thuộc quy ước hướng; điều quan trọng là **chỉ thành phần vuông góc tường bị đảo và nhân $e$**:
- Thành phần ngang ($x$): $5$ giữ nguyên (tiếp tuyến tường, bỏ qua ma sát).
- Thành phần dọc ($y$): $-3 \\to +e\\cdot 3 = +2.4$ (đảo dấu, nảy lên, nhân $e = 0.8$).

→ $\\vec v_1' = (5,\\; 2.4)$. Bóng trượt ngang giữ tốc, nảy lên chậm hơn lúc rơi. Tường: $\\vec v' = (0,0)$ y nguyên ✓.

> ⚠ **Lỗi thường gặp.** Nếu lỡ để tường có $\\frac{1}{m} \\neq 0$ (vd quên gán, dùng $m$ rất lớn nhưng hữu hạn) → tường **bị xê dịch chút ít** mỗi va chạm, lâu dần "trôi". Đặt thẳng \`invMass = 0\` cho vật tĩnh là an toàn nhất, đồng thời tránh chia cho 0.

> 🔁 **Dừng lại tự kiểm tra.** Hai vật **đều** là tường ($\\frac{1}{m_1} = \\frac{1}{m_2} = 0$). Công thức $j$ ra gì?
> <details><summary>Đáp án</summary>
> Mẫu số $= 0 + 0 = 0$ → chia cho 0 (NaN). Trong code phải **bỏ qua** cặp tĩnh-tĩnh (cả hai invMass = 0): chúng không bao giờ va chạm động với nhau. Thêm guard \`if (invMass1 + invMass2 == 0) return;\`.
> </details>

> 📝 **Tóm tắt mục 5**
> - Vật tĩnh: $\\frac{1}{m} = 0$ (invMass = 0) → công thức tự động chỉ đổi vận tốc vật động.
> - Bóng đập tường: thành phần pháp tuyến đảo dấu và nhân $e$; tiếp tuyến giữ nguyên.
> - Guard chia-cho-0: bỏ qua cặp cả hai tĩnh (invMass tổng $= 0$).

---

## 6. Liên hệ với các bài khác

- **Pháp tuyến va chạm $\\vec n$** — *đầu vào bắt buộc* của impulse — đến từ detection:
  - Tròn–tròn: vector nối tâm ([L06](../lesson-01-aabb-circle/)).
  - Polygon: trục MTV của SAT ([L07](../lesson-02-sat-polygons/)).
- **Ma sát tiếp tuyến (tangent friction):** bài này bỏ qua thành phần tiếp tuyến. Va chạm thật còn có xung lực ma sát vuông góc $\\vec n$ làm vật xoay/giảm tốc trượt — học ở [L10](../lesson-05-friction-resting-stacking/).
- **Ổn định nhiều tiếp xúc (resting & stacking):** khi nhiều vật chồng/tựa nhau, giải từng cặp một lần/frame không đủ ổn định (chồng gạch rung, đổ). Cần lặp giải (sequential impulse) + sleep — cũng ở [L10](../lesson-05-friction-resting-stacking/).
- **Nền vật lý:** xem [Physics — Momentum & Collisions](../../../Physics/01-Mechanics/lesson-05-momentum-collisions/) để hiểu sâu xung lực và bảo toàn động lượng.

---

## 7. Bài tập

**Bài 1.** Va chạm 1D đàn hồi ($e = 1$): $m_1 = 3$, $v_1 = 4$; $m_2 = 5$, $v_2 = -2$. Tính $v_1', v_2'$ và kiểm tra bảo toàn động lượng.

**Bài 2.** (Tự tính vận tốc sau va chạm với $e$ bất kỳ) $m_1 = 2$, $v_1 = 6$; $m_2 = 4$, $v_2 = 0$; $e = 0.5$. Tính $v_1', v_2'$. So sánh tốc độ tách với tốc độ lao vào.

**Bài 3.** Thả bóng ($e = 0.7$) chạm sàn (tường tĩnh) với vận tốc xuống $6$ m/s. Tính vận tốc nảy lên. Nếu để rơi lại và nảy tiếp, lần nảy thứ hai vận tốc bao nhiêu?

**Bài 4.** (Impulse 2D, tự tính) Vật 1: $m_1 = 1$, $\\vec c_1 = (0,0)$, $\\vec v_1 = (2, 1)$. Vật 2: $m_2 = 1$, $\\vec c_2 = (3, 4)$, $\\vec v_2 = (0, 0)$. $e = 1$. Tính $\\vec n$, $j$, và $\\vec v_1', \\vec v_2'$. Kiểm tra động lượng từng trục.

**Bài 5.** Penetration $= 0.8$, $\\vec n = (0, 1)$, $m_1 = 2$, $m_2 = 1$, $\\beta = 0.4$, slop $= 0.05$. Tính lượng dịch vị trí của mỗi vật trong một frame positional correction. Vật nào dịch nhiều hơn, vì sao?

**Bài 6.** Giải thích (không cần số): nếu một engine **quên** positional correction nhưng vẫn áp impulse đúng, hiện tượng gì xảy ra với một quả bóng rơi lên sàn? Vì sao?

**Bài 7.** (Bug hunt) Một bạn viết impulse 2D nhưng lấy $\\vec n$ là vector nối **tâm B → tâm A** (ngược quy ước), và vẫn dùng đúng công thức $\\vec v_1' = \\vec v_1 - \\frac{j}{m_1}\\vec n$. Mô tả hành vi sai sẽ thấy trên màn hình.

## Lời giải chi tiết

### Bài 1

Dùng công thức $e=1$ (§2.3), $m_1 = 3, v_1 = 4, m_2 = 5, v_2 = -2$, $m_1 + m_2 = 8$.

$$v_1' = \\frac{(3-5)(4) + 2(5)(-2)}{8} = \\frac{-8 - 20}{8} = \\frac{-28}{8} = -3.5$$
$$v_2' = \\frac{(5-3)(-2) + 2(3)(4)}{8} = \\frac{-4 + 24}{8} = \\frac{20}{8} = 2.5$$

→ Vật 1 đảo chiều ($-3.5$), vật 2 đảo chiều ($-2 \\to +2.5$).

*Kiểm tra:* trước $= 3(4) + 5(-2) = 12 - 10 = 2$; sau $= 3(-3.5) + 5(2.5) = -10.5 + 12.5 = 2$ ✓.

### Bài 2

Công thức $e$ tổng quát (§3.3), $m_1 = 2, v_1 = 6, m_2 = 4, v_2 = 0, e = 0.5$, tổng khối lượng $= 6$.

$$v_1' = \\frac{2(6) + 4(0) + 4(0.5)(0 - 6)}{6} = \\frac{12 + 0 - 12}{6} = \\frac{0}{6} = 0$$
$$v_2' = \\frac{2(6) + 4(0) + 2(0.5)(6 - 0)}{6} = \\frac{12 + 6}{6} = \\frac{18}{6} = 3$$

→ $v_1' = 0$, $v_2' = 3$. Tốc độ tách $= 3 - 0 = 3$; tốc độ lao vào $= 6 - 0 = 6$; tỉ số $= 3/6 = 0.5 = e$ ✓.

*Kiểm tra động lượng:* trước $= 2(6) = 12$; sau $= 2(0) + 4(3) = 12$ ✓.

### Bài 3

Tường tĩnh, công thức $v' = -e\\cdot v$ (thành phần pháp tuyến đảo dấu, nhân $e$).

- Lần nảy 1: vận tốc vào $= 6$ (xuống), nảy lên $= e \\cdot 6 = 0.7 \\times 6 = 4.2$ m/s.
- Bóng lên rồi rơi lại: bỏ qua sức cản không khí, nó chạm sàn lần 2 cũng với $4.2$ m/s (bảo toàn cơ năng trên hành trình lên-xuống). Lần nảy 2 $= 0.7 \\times 4.2 = 2.94$ m/s.

→ Mỗi lần nảy vận tốc nhân $e$. Sau $n$ lần: $v_n = 6 \\cdot 0.7^n$. (Độ cao nảy nhân $e^2 = 0.49$ mỗi lần.)

### Bài 4

Bước 1 — pháp tuyến. $\\vec d = \\vec c_2 - \\vec c_1 = (3, 4)$, $|\\vec d| = \\sqrt{9 + 16} = 5$, $\\vec n = (0.6, 0.8)$.

Bước 2 — vận tốc tương đối. $\\vec v_{rel} = \\vec v_2 - \\vec v_1 = (0 - 2, 0 - 1) = (-2, -1)$.

Bước 3 — $v_n = \\vec v_{rel}\\cdot\\vec n = (-2)(0.6) + (-1)(0.8) = -1.2 - 0.8 = -2.0 < 0$ → lao vào, xử lý.

Bước 4 — xung lực. $\\frac{1}{m_1} + \\frac{1}{m_2} = 1 + 1 = 2$.
$$j = \\frac{-(1+1)(-2.0)}{2} = \\frac{4.0}{2} = 2.0$$

Bước 5 — vận tốc mới:
$$\\vec v_1' = \\vec v_1 - \\frac{j}{m_1}\\vec n = (2, 1) - \\frac{2}{1}(0.6, 0.8) = (2, 1) - (1.2, 1.6) = (0.8,\\; -0.6)$$
$$\\vec v_2' = \\vec v_2 + \\frac{j}{m_2}\\vec n = (0, 0) + 2(0.6, 0.8) = (1.2,\\; 1.6)$$

*Kiểm tra động lượng:*
- x: trước $= 1(2) + 1(0) = 2$; sau $= 0.8 + 1.2 = 2$ ✓.
- y: trước $= 1(1) + 1(0) = 1$; sau $= -0.6 + 1.6 = 1$ ✓.

### Bài 5

$$\\text{correction} = \\frac{\\max(0.8 - 0.05, 0)}{\\frac{1}{2} + \\frac{1}{1}} \\cdot 0.4 = \\frac{0.75}{1.5} \\cdot 0.4 = 0.5 \\cdot 0.4 = 0.2$$

Dịch vị trí:
- Vật 1: $\\frac{1}{m_1}\\cdot\\text{correction} = 0.5 \\times 0.2 = 0.1$ theo $-\\vec n$ → dịch $(0, -0.1)$.
- Vật 2: $\\frac{1}{m_2}\\cdot\\text{correction} = 1 \\times 0.2 = 0.2$ theo $+\\vec n$ → dịch $(0, +0.2)$.

→ **Vật 2 (nhẹ hơn) dịch nhiều hơn** ($0.2$ so với $0.1$), vì invMass lớn hơn — vật nhẹ dễ bị đẩy. Tổng tách thêm $0.3$ trong frame này.

### Bài 6

Quả bóng sẽ **rung lập bập (jitter)** hoặc **lún chìm dần (sinking)** vào sàn. Lý do: tại frame chạm, bóng đã lún một chút vào sàn (penetration $> 0$). Impulse sửa vận tốc thành đi-lên, nhưng vị trí vẫn còn lún. Tích phân vị trí frame sau di chuyển bóng theo vận tốc mới, có thể chưa kịp thoát khỏi sàn → frame sau lại phát hiện chạm → áp impulse tiếp → vận tốc dao động quanh 0 → bóng kẹt ở mép sàn rung liên tục, hoặc nếu trọng lực mạnh hơn thì lún xuyên qua. Positional correction sửa **vị trí** để bóng thật sự nằm trên mặt sàn, cắt vòng lặp này.

### Bài 7

Lấy $\\vec n$ ngược (B→A thay vì A→B) nhưng vẫn dùng công thức gốc → **dấu của mọi thứ bị lật**. Khi hai vật lao vào nhau, $\\vec v_{rel}\\cdot\\vec n$ giờ **dương** (vì $\\vec n$ đảo), nên $j$ ra **âm**, và xung lực áp ngược hướng cần thiết: thay vì đẩy hai vật **ra xa**, nó hút chúng **vào nhau**. Trên màn hình: hai vật chạm rồi **dính/hút xuyên vào nhau** thay vì bật ra, hoặc vọt nhanh hơn theo hướng sai. (Nếu code có chốt "bỏ qua khi $\\vec v_{rel}\\cdot\\vec n > 0$" thì với $\\vec n$ đảo, va chạm thật sẽ bị *bỏ qua* hoàn toàn → hai vật **xuyên thẳng qua nhau** không phản ứng.)

## Tham khảo và bài tiếp theo

- Bài trước: [L07 — SAT (Polygons)](../lesson-02-sat-polygons/) (nguồn pháp tuyến MTV) và [L06 — AABB & Circle](../lesson-01-aabb-circle/).
- Nền vật lý: [Physics — Momentum & Collisions](../../../Physics/01-Mechanics/lesson-05-momentum-collisions/).
- **Bài tiếp theo:** [L10 — Friction & Resting / Stacking](../lesson-05-friction-resting-stacking/) — thêm ma sát tiếp tuyến và ổn định nhiều tiếp xúc.
- Minh họa tương tác: [visualization.html](./visualization.html) — bi-a 2D bắn bằng impulse, slider restitution, hộp nhiều bóng bảo toàn động lượng.
`;
