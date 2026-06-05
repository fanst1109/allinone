// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Physics/03-Optics-ModernPhysics/lesson-01-geometric-optics/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 (T3) — Quang hình (Geometric Optics)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **quang hình** = mô hình ánh sáng truyền theo đường thẳng (đúng khi λ << kích thước vật).
- Áp dụng **định luật phản xạ**: góc tới = góc phản xạ.
- Áp dụng **định luật khúc xạ Snell**: n₁·sin(θ₁) = n₂·sin(θ₂).
- Hiểu **chiết suất n** = c/v_môi_trường — và liên hệ với tốc độ ánh sáng trong môi trường.
- Hiểu **phản xạ toàn phần** và ứng dụng trong cáp quang.

## Kiến thức tiền đề

- [Lesson 08 (T2) — Sóng điện từ](../../02-Thermo-Electromagnetism/lesson-08-em-waves/).

---

## 1. Phản xạ ánh sáng

### 1.1. Định luật phản xạ

Khi ánh sáng gặp bề mặt phản xạ (gương phẳng), tia tới và tia phản xạ:
1. Cùng nằm trong mặt phẳng chứa pháp tuyến.
2. **Góc tới = góc phản xạ** (đo từ pháp tuyến).

💡 **Ý nghĩa**: phản xạ "đối xứng" so với pháp tuyến bề mặt. Đây là cách gương hoạt động.

### 1.2. Loại phản xạ

- **Phản xạ chính diện** (specular): bề mặt phẳng, mịn (gương) → tia tới song song → tia phản xạ song song.
- **Phản xạ khuếch tán** (diffuse): bề mặt nhám (giấy, da) → tia tới song song → tia phản xạ phân tán mọi hướng. Đó là tại sao ta thấy được mọi vật, không chỉ gương.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Góc tới đo từ đâu — từ bề mặt hay từ pháp tuyến?"* Luôn đo từ **pháp tuyến** (đường vuông góc với bề mặt tại điểm tới). Đây là quy ước thống nhất cho cả phản xạ lẫn khúc xạ. Nếu một tia "sượt" gần như song song mặt gương, góc tới của nó gần **90°** (xa pháp tuyến), không phải gần 0°.
- *"Tờ giấy trắng và tấm gương đều phản xạ ánh sáng — sao chỉ gương cho ảnh?"* Vì giấy phản xạ **khuếch tán**: mỗi điểm nhỏ trên giấy nhám hắt tia đi mọi hướng, phá vỡ trật tự của chùm tia → không dựng lại được ảnh. Gương phản xạ **chính diện**: giữ nguyên trật tự song song → mắt dựng lại được ảnh.
- *"Vật tự phát sáng (mặt trời) khác vật ta nhìn thấy thế nào?"* Hầu hết vật quanh ta KHÔNG tự phát sáng — ta thấy chúng nhờ chúng **phản xạ khuếch tán** ánh sáng từ nguồn (mặt trời, đèn) tới mắt.

⚠ **Lỗi thường gặp**

- **Đo góc từ mặt phẳng thay vì từ pháp tuyến.** Một tia tới tạo 20° với MẶT gương thì góc tới (so pháp tuyến) là \`90° − 20° = 70°\`, và góc phản xạ cũng là 70° — KHÔNG phải 20°.
- **Tưởng "góc tới = góc phản xạ" áp dụng cho khúc xạ.** Sai — đó là định luật phản xạ. Khúc xạ tuân theo Snell (\`n₁sinθ₁ = n₂sinθ₂\`), góc tới và góc khúc xạ thường KHÁC nhau.

🔁 **Dừng lại tự kiểm tra**

1. Một tia sáng đập vào gương phẳng, tạo góc 25° với MẶT gương. Góc phản xạ (so pháp tuyến) bằng bao nhiêu?
2. Vì sao trong phòng tối hoàn toàn ta không thấy gì, dù vật vẫn ở đó?

<details><summary>Đáp án</summary>

1. Góc tới so pháp tuyến = \`90° − 25° = 65°\`. Theo định luật phản xạ, góc phản xạ = **65°**.
2. Mắt chỉ "thấy" vật khi có ánh sáng từ vật (phản xạ hoặc tự phát) tới mắt. Phòng tối không có nguồn sáng → không có tia nào để vật phản xạ → mắt không nhận tín hiệu → không thấy gì.

</details>

### 📝 Tóm tắt mục 1

- Phản xạ: góc tới = góc phản xạ.
- Specular (gương) vs diffuse (mọi bề mặt thường).

---

## 2. Khúc xạ ánh sáng — Định luật Snell

### 2.1. Khái niệm chiết suất

**Chiết suất n** của một môi trường = tỉ số tốc độ ánh sáng trong chân không và trong môi trường:
\`\`\`
n = c / v
\`\`\`

💡 **Trực giác**: n cho biết "ánh sáng đi chậm bao nhiêu lần trong môi trường so với chân không". Chân không: n = 1. Mọi môi trường khác: n > 1.

**Định nghĩa đầy đủ — chiết suất (refractive index) n**:
- **(a) Là gì**: đại lượng KHÔNG đơn vị đo tốc độ ánh sáng trong môi trường giảm bao nhiêu lần so với chân không. \`n = 2\` nghĩa là ánh sáng đi trong môi trường đó chậm gấp 2 lần (\`v = c/2\`).
- **(b) Vì sao cần**: để định lượng mức độ "bẻ" tia khi qua mặt phân cách. Không có n thì không viết được định luật Snell, không tính được góc khúc xạ hay góc tới hạn. n chính là cầu nối giữa "tốc độ" (vật lý) và "góc bẻ" (hình học).
- **(c) Ví dụ số kèm đơn vị**: nước có \`n = 1.33\`. Tốc độ ánh sáng trong nước = \`v = c/n = (3 × 10⁸ m/s)/1.33 = 2.26 × 10⁸ m/s\`. Tức ánh sáng trong nước chậm hơn trong chân không khoảng 33%.

Bảng n các môi trường:
| Môi trường | n |
|-----------|---|
| Chân không | 1.000 (chính xác) |
| Không khí | 1.0003 (xấp xỉ 1) |
| Nước | 1.33 |
| Thủy tinh thường | 1.50 |
| Kim cương | 2.42 (cao nhất trong vật liệu phổ biến) |

### 2.2. Định luật Snell

Khi ánh sáng đi từ môi trường 1 sang môi trường 2:

\`\`\`
n₁ · sin(θ₁) = n₂ · sin(θ₂)
\`\`\`

trong đó θ là góc đo từ pháp tuyến.

💡 **Ý nghĩa**: ánh sáng "bẻ" khi qua mặt phân cách, vì tốc độ thay đổi. Đi vào môi trường **đậm hơn** (n lớn hơn) → tia **bẻ về phía pháp tuyến**. Đi ra ngoài → bẻ xa pháp tuyến.

### 2.3. Vì sao có khúc xạ?

Vì tốc độ ánh sáng khác nhau trong các môi trường. Khi sóng EM gặp mặt phân cách dưới một góc, một phần sóng tiến vào môi trường mới với tốc độ khác → đường truyền bị "bẻ". Tương tự bánh xe khi từ nhựa đường lăn vào cát — bị bẻ.

### 2.4. Ví dụ trực giác

**Ví dụ — Đũa trong cốc nước**: nhìn đũa trong cốc nước thấy "gãy". Vì ánh sáng từ phần đũa dưới nước đi qua nước → không khí → bẻ tại mặt nước → mắt thấy ảo ảnh đũa bị lệch vị trí.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Đi vào môi trường đậm hơn thì bẻ về phía nào?"* Về phía **pháp tuyến** (góc khúc xạ nhỏ hơn góc tới). Lý do: ánh sáng chậm lại nên "co" về vuông góc. Đi ra môi trường loãng hơn → bẻ xa pháp tuyến.
- *"Tia vuông góc với mặt phân cách (θ₁ = 0) có bị bẻ không?"* KHÔNG. Snell: \`n₁sin0 = n₂sinθ₂ → sinθ₂ = 0 → θ₂ = 0\`. Tia đi thẳng, chỉ đổi tốc độ chứ không đổi hướng.
- *"Tần số ánh sáng có đổi khi qua môi trường khác không?"* KHÔNG — tần số \`f\` được giữ nguyên (do nguồn quyết định). Cái thay đổi là tốc độ \`v\` và bước sóng \`λ\` (vì \`v = λf\`, v giảm thì λ giảm theo). Màu sắc (gắn với f) do đó không đổi.

⚠ **Lỗi thường gặp**

- **Lẫn chiều đặt n₁, n₂.** \`n₁\` luôn là môi trường chứa **tia tới**, \`n₂\` là môi trường chứa **tia khúc xạ**. Đặt sai → tính ra góc vô lý (vd \`sinθ > 1\`).
- **Tưởng ánh sáng "nhanh hơn" trong nước/thủy tinh.** Sai — môi trường đậm (n lớn) làm ánh sáng **CHẬM** lại (\`v = c/n\`). Chỉ trong chân không ánh sáng mới đạt c.
- **Nhầm khúc xạ với phản xạ.** Khúc xạ = tia ĐI XUYÊN sang môi trường mới (đổi hướng do đổi tốc độ). Phản xạ = tia BẬT NGƯỢC lại. Tại mặt phân cách thường có cả hai cùng lúc.

🔁 **Dừng lại tự kiểm tra**

1. Ánh sáng đi từ thủy tinh (n=1.5) ra không khí (n=1) với góc tới 20°. Góc khúc xạ lớn hơn hay nhỏ hơn 20°?
2. Bước sóng ánh sáng đỏ trong chân không là 700 nm. Trong thủy tinh (n=1.5) bước sóng bằng bao nhiêu?

<details><summary>Đáp án</summary>

1. Đi ra môi trường LOÃNG hơn (n giảm) → bẻ XA pháp tuyến → góc khúc xạ **lớn hơn** 20°. Cụ thể: \`1.5·sin20° = 1·sinθ₂ → sinθ₂ = 1.5·0.342 = 0.513 → θ₂ ≈ 30.9°\`.
2. λ trong môi trường = \`λ_chân_không / n = 700/1.5 ≈ 467 nm\`. (Tần số không đổi, chỉ bước sóng co lại theo n.)

</details>

### 📝 Tóm tắt mục 2

- n = c/v. Càng đậm → n càng cao → ánh sáng chậm hơn.
- Snell: n₁·sin(θ₁) = n₂·sin(θ₂). Đi vào đậm → bẻ về pháp tuyến.

---

## 3. Phản xạ toàn phần (Total Internal Reflection)

### 3.1. Khái niệm

Khi ánh sáng đi từ môi trường **đậm hơn** sang **loãng hơn** (vd nước → không khí), nếu góc tới vượt một **góc tới hạn θ_c**, ánh sáng **không xuyên qua** mà bị **phản xạ HOÀN TOÀN** vào lại môi trường đậm.

\`\`\`
sin(θ_c) = n₂ / n₁   (n₂ < n₁)
\`\`\`

### 3.2. Ví dụ: nước → không khí

- n₁ = 1.33 (nước), n₂ = 1.00 (không khí).
- sin(θ_c) = 1/1.33 = 0.752 → θ_c ≈ **48.6°**.
- Nếu nhìn lên từ dưới nước với góc > 48.6° so với pháp tuyến (= < 41.4° so với mặt nước), bạn KHÔNG thấy bầu trời mà chỉ thấy đáy bể phản chiếu.

### 3.3. Ứng dụng — Cáp quang

Cáp quang = sợi thủy tinh mỏng. Ánh sáng đi vào 1 đầu, do **phản xạ toàn phần liên tục** ở thành sợi → đi được hàng km mà không thoát ra. Đây là nền tảng internet tốc độ cao hiện đại.

💡 **Trực giác**: phản xạ toàn phần giống như ném bóng vào tường dưới góc rất xiên — bóng "trượt" dọc tường thay vì xuyên qua. Khi góc tới quá lớn, ánh sáng không còn "chui" qua được mặt phân cách mà bị hắt ngược 100%.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao phản xạ toàn phần chỉ xảy ra khi đi từ ĐẬM sang LOÃNG?"* Vì chỉ khi đó góc khúc xạ mới LỚN HƠN góc tới. Khi góc tới tăng dần, đến lúc góc khúc xạ chạm 90° (tia khúc xạ "nằm sát" mặt phân cách) — vượt qua đó thì không còn tia khúc xạ nào tồn tại → toàn bộ phản xạ. Đi từ loãng sang đậm thì góc khúc xạ luôn nhỏ hơn, không bao giờ chạm 90°.
- *"Tại góc tới hạn θ_c thì điều gì xảy ra?"* Tia khúc xạ đi đúng dọc mặt phân cách (θ₂ = 90°). Đặt \`sin90° = 1\` vào Snell: \`n₁sinθ_c = n₂·1 → sinθ_c = n₂/n₁\`.
- *"Phản xạ toàn phần có mất năng lượng không?"* Gần như không — đó là lý do cáp quang truyền tín hiệu hàng km với hao hụt cực thấp, hiệu quả hơn nhiều so với gương kim loại (luôn hấp thụ một phần).

⚠ **Lỗi thường gặp**

- **Áp dụng công thức \`sinθ_c = n₂/n₁\` khi đi từ loãng sang đậm.** Vô nghĩa: khi đó \`n₂ > n₁\` → \`sinθ_c > 1\` (không tồn tại góc). Phản xạ toàn phần CHỈ xảy ra theo chiều đậm → loãng.
- **Lẫn θ_c với góc Brewster.** θ_c là ngưỡng phản xạ TOÀN PHẦN; góc Brewster là góc cho ánh sáng phản xạ phân cực hoàn toàn — hai khái niệm khác nhau.

🔁 **Dừng lại tự kiểm tra**

1. Ánh sáng đi từ kim cương (n=2.42) ra không khí. Tính góc tới hạn θ_c.
2. Một thợ lặn dưới nước (n=1.33) chiếu đèn lên với góc 50° so pháp tuyến. Ánh sáng có thoát ra không khí được không? (θ_c của nước ≈ 48.6°.)

<details><summary>Đáp án</summary>

1. \`sinθ_c = 1/2.42 = 0.413 → θ_c ≈ 24.4°\`. Góc tới hạn rất nhỏ → kim cương dễ "giữ" ánh sáng bên trong, tạo độ lấp lánh.
2. 50° > 48.6° = θ_c → vượt góc tới hạn → **phản xạ toàn phần** → ánh sáng KHÔNG thoát ra, bị hắt ngược xuống nước.

</details>

### 📝 Tóm tắt mục 3

- Phản xạ toàn phần: từ đậm sang loãng, góc > θ_c.
- sin(θ_c) = n₂/n₁.
- Ứng dụng: cáp quang internet.

---

## 4. Bài tập

### Bài tập

**Bài 1**: Ánh sáng đi từ không khí (n=1) vào nước (n=1.33) với góc tới 30°. Tính góc khúc xạ.

**Bài 2**: Tốc độ ánh sáng trong thủy tinh n=1.5 là bao nhiêu?

**Bài 3**: Tính θ_c cho ánh sáng đi từ thủy tinh (n=1.5) sang không khí.

**Bài 4**: Vì sao kim cương trong suốt nhưng lại "lấp lánh"?

**Bài 5**: Vì sao bề mặt nước hồ lúc nắng trông như tấm gương?

### Lời giải

**Bài 1**: 1·sin(30°) = 1.33·sin(θ₂) → sin(θ₂) = 0.5/1.33 = 0.376 → θ₂ = **22.1°** (bẻ về phía pháp tuyến).

**Bài 2**: v = c/n = 3e8/1.5 = **2 × 10⁸ m/s**.

**Bài 3**: sin(θ_c) = 1/1.5 = 0.667 → θ_c = **41.8°**.

**Bài 4**: Kim cương có **n = 2.42, cao nhất** trong vật liệu phổ biến. Hệ quả:
- Góc tới hạn θ_c = arcsin(1/2.42) = 24.4° → rất nhỏ. Hầu như mọi tia vào đều bị phản xạ toàn phần khi gặp mặt sau → không thoát qua trừ ở góc rất hẹp. Ánh sáng bị "kẹt" bên trong, phản xạ nhiều lần.
- Tán sắc cao (n thay đổi theo λ) → tách màu cầu vồng.
- Người thợ kim hoàn cắt mặt kim cương để tối đa hóa phản xạ tổng phần → "lấp lánh".

**Bài 5**: Khi nhìn từ trên gần như vuông góc, ta thấy mặt nước trong suốt. Nhưng khi nhìn từ góc xiên (xa) → góc tới lớn → vượt θ_c → phản xạ toàn phần → mặt nước "phản chiếu" bầu trời/cây cối → trông như gương.

---

## 5. Bài tiếp theo

[Lesson 02 — Thấu kính & gương](../lesson-02-lenses-mirrors/).

## 📝 Tổng kết

1. **Phản xạ**: góc tới = góc phản xạ.
2. **Chiết suất n = c/v**. Chân không 1, nước 1.33, thủy tinh 1.5, kim cương 2.42.
3. **Snell**: n₁·sin(θ₁) = n₂·sin(θ₂). Đi vào đậm → bẻ về pháp tuyến.
4. **Phản xạ toàn phần**: từ đậm → loãng, θ > θ_c. sin(θ_c) = n_loãng/n_đậm.
5. **Ứng dụng**: gương, lăng kính, cáp quang, sự lấp lánh của kim cương.
`;
