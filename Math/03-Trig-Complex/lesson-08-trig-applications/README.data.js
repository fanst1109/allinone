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

---

## 3. Sóng (Wave)

Sóng = dao động truyền theo không gian:
\`\`\`
y(x, t) = A·sin(kx - ωt + φ)
\`\`\`

- **k** = số sóng (rad/m). λ = 2π/k = bước sóng.
- **ω** = tần số góc (rad/s).
- **vận tốc sóng v = ω/k = λf**.

**Ví dụ**: Sóng âm 440 Hz (nốt La). f = 440 → ω = 880π. Trong không khí v ≈ 340 m/s → λ = 340/440 ≈ 0.77 m.

---

## 4. Chuỗi Fourier — Preview

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
