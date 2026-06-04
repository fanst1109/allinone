// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/03-Trig-Complex/lesson-08-trig-applications/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 08 — Ứng dụng: dao động, sóng, Fourier preview

## Mục tiêu

- Áp dụng số phức và lượng giác vào **dao động điều hòa, sóng, mạch điện AC**.
- Hiểu **phasor** — biểu diễn dao động bằng số phức.
- Giới thiệu **chuỗi Fourier**: mọi hàm tuần hoàn = tổng sin/cos.

## Kiến thức tiền đề

- [Lesson 07 — De Moivre](../lesson-07-de-moivre/).

---

## 1. Dao động điều hòa (Simple Harmonic Motion)

💡 **Là gì**: Chuyển động lặp đi lặp lại quanh vị trí cân bằng, ví dụ con lắc lò xo, con lắc đơn.

**Phương trình**:
\`\`\`
x(t) = A·cos(ω·t + φ)
\`\`\`

- **A** = biên độ (max displacement).
- **ω** = tần số góc (rad/s). Liên quan tần số f: ω = 2πf.
- **φ** = pha ban đầu.
- **Chu kỳ T** = 2π/ω.

**Ví dụ**: Lò xo k, khối lượng m. ω = √(k/m). Nếu k = 100 N/m, m = 1 kg → ω = 10 rad/s, T = 2π/10 ≈ 0.628s.

**4 ví dụ số đa dạng**:
- \`x(t) = 2cos(πt)\`: A = 2, ω = π → \`T = 2π/π = 2s\`, \`f = 1/T = 0.5 Hz\`.
- \`x(t) = 0.1cos(20πt)\`: A = 0.1, ω = 20π → \`T = 0.1s\`, \`f = 10 Hz\`.
- Con lắc lò xo k = 400, m = 4: \`ω = √(400/4) = √100 = 10 rad/s\`, \`T ≈ 0.628s\`.
- \`x(t) = 5cos(2t + π/2) = −5sin(2t)\`: A = 5, T = π (pha π/2 biến cos thành −sin).

⚠ **Lỗi thường gặp — lẫn tần số \`f\` (Hz) với tần số góc \`ω\` (rad/s)**. Liên hệ: \`ω = 2πf\`. Phản ví dụ: dao động "50 Hz" có \`ω = 2π·50 = 100π ≈ 314 rad/s\`, KHÔNG phải ω = 50. Nhầm hai đại lượng làm sai chu kỳ gấp ~6.28 lần.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Dùng cos hay sin để mô tả dao động?"* Cả hai đều được — chỉ khác pha π/2. Quy ước phổ biến dùng cos vì tại t=0 cho ngay biên độ. \`sin(ωt) = cos(ωt − π/2)\`.
- *"Chu kỳ T và tần số f liên hệ sao?"* \`f = 1/T\` (số dao động mỗi giây) và \`ω = 2π/T = 2πf\`. Ba đại lượng quy về nhau.

🔁 **Dừng lại tự kiểm tra**

1. Dao động \`x(t) = 3cos(4πt)\`. Chu kỳ và tần số?
2. Con lắc lò xo k = 100, m = 0.25. ω bằng mấy?

<details><summary>Đáp án</summary>

1. \`ω = 4π\` → \`T = 2π/4π = 0.5s\`, \`f = 1/0.5 = 2 Hz\`.
2. \`ω = √(100/0.25) = √400 = 20 rad/s\`.

</details>

### 📝 Tóm tắt mục 1

- SHM: \`x(t) = A cos(ωt + φ)\`; A = biên độ, ω = tần số góc, φ = pha.
- \`T = 2π/ω\`, \`f = 1/T\`, \`ω = 2πf\` (đừng lẫn f và ω).
- Lò xo: \`ω = √(k/m)\`.

---

## 2. Biểu diễn dao động bằng số phức (Phasor)

💡 **Mẹo**: Thay vì viết cos(ωt + φ), ta viết **phần thực của e^(i(ωt+φ))** = A·e^(iφ)·e^(iωt).

⟶ Phần phasor A·e^(iφ) là **số phức cố định** (không phụ thuộc t), gọi là **phasor**.

**Cộng 2 dao động** cùng tần số:
- x₁(t) = A₁·cos(ωt + φ₁), phasor Z₁ = A₁·e^(iφ₁).
- x₂(t) = A₂·cos(ωt + φ₂), phasor Z₂ = A₂·e^(iφ₂).
- Tổng x₁ + x₂ tương ứng phasor **Z = Z₁ + Z₂** (cộng số phức).

⟶ Cộng dao động đã quy về **cộng số phức** — đơn giản hơn nhiều cộng cos.

> 📐 **Định nghĩa đầy đủ — Phasor**
>
> **(a) Là gì**: Số phức **cố định** A·e^(iφ) đại diện cho dao động A·cos(ωt + φ) khi tần số ω đã biết. Phasor "thu gọn" 1 hàm thời gian thành 1 số phức — chỉ giữ lại 2 thông tin quan trọng: biên độ A và pha φ.
>
> **(b) Vì sao cần**: Khi nhiều dao động cùng tần số cộng nhau (mạch điện AC, giao thoa sóng), tính trực tiếp A₁·cos(ωt+φ₁) + A₂·cos(ωt+φ₂) cần công thức cộng — rối. Phasor biến phép này thành **cộng vector số phức** Z₁ + Z₂ — đơn giản, hiển thị trên Argand. Nguyên lý cốt lõi của: kỹ thuật điện (giải mạch AC bằng phasor thay vì PT vi phân), tín hiệu số (DSP), antenna engineering.
>
> **(c) Ví dụ số**: 2 dao động cùng ω: x₁ = 3·cos(ωt), x₂ = 4·cos(ωt + π/2). Phasor Z₁ = 3, Z₂ = 4·e^(iπ/2) = 4i. Tổng Z = 3 + 4i → |Z| = 5, arg = atan(4/3) ≈ 53.13°. Vậy x₁+x₂ = **5·cos(ωt + 53.13°)** (KHÔNG phải 7·cos — biên độ tổng không cộng đơn giản!). Verify số: tại t = 0, x₁+x₂ = 3 + 0 = 3 và 5·cos(53.13°) = 5·0.6 = 3 ✓.

**Ví dụ thực tế**: Mạch điện AC.
- U₁ = 10·cos(100πt), phasor Z₁ = 10.
- U₂ = 10·cos(100πt + π/2), phasor Z₂ = 10·e^(iπ/2) = 10i.
- Tổng phasor = 10 + 10i. |Z| = 10√2, arg = π/4.
- → U_tổng = 10√2·cos(100πt + π/4). Biên độ tổng = 10√2 chứ không phải 20.

⚠ **Lỗi thường gặp — cộng biên độ trực tiếp \`A₁ + A₂\`**. Hai dao động cùng tần số nhưng **lệch pha** cộng theo kiểu vector (qua phasor), không cộng số học. Phản ví dụ: \`3cos(ωt) + 4cos(ωt + π/2)\` cho biên độ \`|3 + 4i| = 5\`, KHÔNG phải 7. Chỉ khi **cùng pha** (φ₁ = φ₂) mới được cộng thẳng A₁+A₂.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao phasor bỏ được \`e^(iωt)\`?"* Vì khi mọi dao động **cùng ω**, thừa số \`e^(iωt)\` chung cho tất cả, có thể đặt ra ngoài tổng → chỉ còn cộng các phasor cố định. Tách xong cộng lại sau.
- *"Hai dao động khác tần số có dùng phasor được không?"* **Không** trực tiếp — phasor chỉ gọn khi cùng ω. Khác tần số phải xử lý riêng (hoặc Fourier).
- *"Khi nào tổng hai dao động cùng biên độ bằng 0?"* Khi ngược pha (lệch π) và cùng biên độ: \`Acos(ωt) + Acos(ωt+π) = A − A = 0\` (giao thoa triệt tiêu).

🔁 **Dừng lại tự kiểm tra**

1. Phasor của \`6cos(ωt + π/2)\` là gì?
2. Cộng \`x₁ = 5cos(ωt)\` và \`x₂ = 5cos(ωt + π)\`. Biên độ tổng?

<details><summary>Đáp án</summary>

1. \`Z = 6e^(iπ/2) = 6i\`.
2. \`Z = 5 + 5e^(iπ) = 5 − 5 = 0\` → biên độ tổng = **0** (triệt tiêu hoàn toàn).

</details>

### 📝 Tóm tắt mục 2

- Phasor \`A·e^(iφ)\` thu gọn dao động \`A cos(ωt+φ)\` (khi ω cố định).
- Cộng dao động cùng tần số = **cộng phasor** (cộng vector số phức), KHÔNG cộng biên độ thẳng.
- Biên độ tổng = mô-đun phasor tổng; chỉ dùng được khi các dao động cùng ω.

---

## 3. Sóng (Wave)

💡 **Trực giác / Hình dung**: dao động ở mục 1 chỉ "lên xuống tại chỗ" (phụ thuộc thời gian t). Sóng là dao động **lan ra không gian** — mỗi điểm x dao động, nhưng lệch pha so với điểm bên cạnh, tạo "vệt" di chuyển. Vì thế hàm sóng phụ thuộc **cả x lẫn t**: \`y(x,t)\`. Số sóng k đo "dao động theo không gian", ω đo "dao động theo thời gian".

Sóng = dao động truyền theo không gian:
\`\`\`
y(x, t) = A·sin(kx - ωt + φ)
\`\`\`

- **k** = số sóng (rad/m). λ = 2π/k = bước sóng.
- **ω** = tần số góc (rad/s).
- **vận tốc sóng v = ω/k = λf**.

**Ví dụ**: Sóng âm 440 Hz (nốt La). f = 440 → ω = 880π. Trong không khí v ≈ 340 m/s → λ = 340/440 ≈ 0.77 m.

⚠ **Lỗi thường gặp — lẫn bước sóng λ với chu kỳ T**. λ là chu kỳ **theo không gian** (mét), T là chu kỳ **theo thời gian** (giây). Liên hệ: \`v = λ/T = λf\`. Phản ví dụ: sóng 440 Hz có \`T = 1/440 ≈ 0.00227s\` (thời gian) nhưng \`λ ≈ 0.77m\` (không gian) — hai con số khác hẳn, đừng trộn.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tần số cao thì bước sóng dài hay ngắn?"* Ngắn. Vì \`λ = v/f\` (v cố định), f tăng → λ giảm. Nốt cao (f lớn) có bước sóng ngắn.
- *"Vì sao trong \`kx − ωt\` lại có dấu trừ?"* Dấu trừ cho sóng chạy **sang phải** (chiều +x). Dấu cộng (\`kx + ωt\`) cho sóng chạy sang trái.

🔁 **Dừng lại tự kiểm tra**

1. Sóng âm 170 Hz trong không khí (v = 340 m/s). Bước sóng?
2. Bước sóng 2m, vận tốc 340 m/s. Tần số bao nhiêu?

<details><summary>Đáp án</summary>

1. \`λ = v/f = 340/170 = 2m\`.
2. \`f = v/λ = 340/2 = 170 Hz\`.

</details>

### 📝 Tóm tắt mục 3

- Sóng \`y(x,t) = A sin(kx − ωt + φ)\` phụ thuộc cả không gian x và thời gian t.
- k = số sóng (\`λ = 2π/k\`), ω = tần số góc; \`v = ω/k = λf\`.
- λ (không gian, mét) ≠ T (thời gian, giây) — đừng lẫn; f cao → λ ngắn.

---

## 4. Chuỗi Fourier — Preview

💡 **Trực giác / Hình dung**: tưởng tượng một "thợ lắp ráp âm thanh". Cho bất kỳ hình sóng tuần hoàn nào (kể cả sóng vuông có góc cạnh), Fourier nói: chỉ cần **chồng nhiều sóng sin/cos thuần** với tần số bội nhau (1×, 2×, 3×...) và biên độ thích hợp là tái tạo được. Sin/cos là "viên gạch lego" của mọi tín hiệu tuần hoàn.

🎯 **Định lý Fourier (1822)**: Mọi hàm tuần hoàn f(x) chu kỳ 2π "đủ tốt" đều có thể viết:
\`\`\`
f(x) = a₀/2 + Σ_{n=1}^∞ [a_n·cos(nx) + b_n·sin(nx)]
\`\`\`

Trong đó:
- a_n = (1/π) ∫_{-π}^{π} f(x)·cos(nx) dx.
- b_n = (1/π) ∫_{-π}^{π} f(x)·sin(nx) dx.

⟶ **Mọi tín hiệu = tổng các sóng sin/cos cơ bản**. Đây là nền tảng cho:
- **Nén ảnh JPEG** (Discrete Cosine Transform).
- **Nén nhạc MP3** (FFT).
- **Phân tích phổ** trong vật lý, kỹ thuật.

### Ví dụ trực quan: Sóng vuông

Hàm sóng vuông (square wave) f(x) = 1 nếu 0 < x < π, -1 nếu π < x < 2π. Khai triển Fourier:
\`\`\`
f(x) = (4/π)·[sin x + (1/3)·sin 3x + (1/5)·sin 5x + (1/7)·sin 7x + ...]
\`\`\`

⟶ Càng nhiều số hạng, càng gần sóng vuông. Visualization sẽ minh họa điều này.

❓ **Vì sao kỳ lạ vậy?** Sin là hàm "mềm" mà tổng vô hạn cho ra hàm "có góc vuông"? Đáp: Hội tụ trong nghĩa trung bình, không hội tụ đều. Hiện tượng **Gibbs** — tại điểm gián đoạn, tổng riêng luôn dao động khoảng ~9% biên độ.

⚠ **Lỗi thường gặp — bỏ hệ số \`a₀/2\` (thành phần một chiều)**. \`a₀/2\` là **giá trị trung bình** của hàm trên một chu kỳ. Phản ví dụ: hàm \`f(x) = 3 + sin x\` có trung bình 3 → \`a₀/2 = 3\`. Nếu bỏ, chuỗi Fourier dao động quanh 0 thay vì quanh 3 — sai mức nền.

❓ **Câu hỏi tự nhiên của người đọc (bổ sung)**

- *"Vì sao hàm lẻ chỉ có sin, hàm chẵn chỉ có cos?"* Hàm lẻ (\`f(−x) = −f(x)\`) đối xứng tâm như sin → các hệ số \`a_n\` (của cos, vốn chẵn) đều bằng 0. Ngược lại hàm chẵn chỉ còn cos. Mẹo này giảm nửa khối lượng tính.
- *"'Đủ tốt' nghĩa là gì?"* Điều kiện Dirichlet: hàm bị chặn, có hữu hạn cực trị và điểm gián đoạn trong một chu kỳ. Hầu hết tín hiệu thực tế đều thỏa.

🔁 **Dừng lại tự kiểm tra**

1. Hàm \`f(x) = x\` trên \`[−π, π]\` là chẵn hay lẻ? Chuỗi Fourier chỉ chứa sin hay cos?
2. Trong khai triển sóng vuông, hệ số của \`sin 5x\` là bao nhiêu?

<details><summary>Đáp án</summary>

1. Lẻ (\`(−x) = −x\`) → chỉ chứa **sin** (mọi \`a_n = 0\`).
2. \`(4/π)·(1/5) = 4/(5π)\` (từ chuỗi \`(4/π)[sin x + sin3x/3 + sin5x/5 + ...]\`).

</details>

### 📝 Tóm tắt mục 4

- Fourier: mọi hàm tuần hoàn "đủ tốt" = \`a₀/2 + Σ(a_n cos nx + b_n sin nx)\`.
- \`a₀/2\` = giá trị trung bình (đừng bỏ); hàm lẻ → chỉ sin, hàm chẵn → chỉ cos.
- Nền của JPEG, MP3, phân tích phổ; hiện tượng Gibbs (~9%) tại điểm gián đoạn.

---

## 5. Bài tập

### Bài tập

**Bài 1**: Dao động x(t) = 5·cos(2πt + π/3). Tìm biên độ, chu kỳ, tần số.

**Bài 2**: Cộng 2 dao động x₁ = 3·cos(ωt), x₂ = 4·cos(ωt + π/2). Tìm biên độ dao động tổng.

**Bài 3**: Sóng âm 880 Hz (nốt La cao 1 quãng tám). Bước sóng trong không khí (v = 340 m/s)?

**Bài 4**: Phasor của dao động 2·cos(ωt + π/4)?

**Bài 5**: Khai triển Fourier của f(x) = x trên [-π, π]?

### Lời giải

**Bài 1**: A = 5, T = 2π/(2π) = 1s, f = 1 Hz.

**Bài 2**: Phasor: Z₁ = 3, Z₂ = 4i. Z = 3 + 4i. |Z| = √(9+16) = **5**. Biên độ tổng = 5.

**Bài 3**: λ = v/f = 340/880 ≈ **0.386 m** (cao gấp đôi nốt La 440 → bước sóng giảm đôi).

**Bài 4**: Z = **2·e^(iπ/4) = √2 + i√2**.

**Bài 5**: f lẻ → a_n = 0. b_n = (1/π)∫_{-π}^{π} x·sin(nx) dx = 2·(-1)^(n+1)/n.  
→ x = 2·[sin x - sin(2x)/2 + sin(3x)/3 - ...].

---

## 6. 🎉 HOÀN THÀNH TIER 3 — TRIG & COMPLEX (8/8)!

Tiếp theo: **Tier 4 — Calculus 1-var** (giới hạn, đạo hàm, tích phân).

## 📝 Tổng kết Tier 3

1. **Radian** = ngôn ngữ chuẩn. 180° = π rad.
2. **sin, cos, tan** qua đường tròn lượng giác.
3. **Đồng nhất thức**: cộng, nhân đôi, hạ bậc, tích↔tổng.
4. **PT lượng giác**: vô số nghiệm, x = α + k·2π.
5. **Số phức**: i² = -1, ℂ đóng cho mọi PT đa thức.
6. **Euler**: e^(iθ) = cos θ + i sin θ. Đẹp nhất: e^(iπ) + 1 = 0.
7. **De Moivre**: lũy thừa & căn → đa giác đều.
8. **Ứng dụng**: dao động, sóng, phasor, Fourier (preview).

🎉 Đây là **nền tảng vào Calculus**. Tier 4 sẽ dùng radian + lượng giác liên tục.
`;
