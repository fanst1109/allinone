// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/03-Trig-Complex/lesson-06-complex-polar-euler/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 06 — Dạng lượng giác & Công thức Euler

## Mục tiêu

- Hiểu **dạng lượng giác** z = r(cos θ + i·sin θ).
- Biết **công thức Euler**: e^(iθ) = cos θ + i·sin θ.
- Hiểu vì sao Euler là **công thức đẹp nhất toán học**: e^(iπ) + 1 = 0.
- Nhân/chia số phức dưới dạng lượng giác — nhân mô-đun, cộng argument.

## Kiến thức tiền đề

- [Lesson 05 — Số phức](../lesson-05-complex-numbers/).

---

## 1. Dạng lượng giác (Polar form)

💡 **Hình dung**: Thay vì xác định điểm bằng tọa độ (a, b), ta xác định bằng **độ dài** r và **góc** θ. Như đi từ "tọa độ Đề-các" sang "tọa độ cực".

\`\`\`
z = r·(cos θ + i·sin θ)
\`\`\`

trong đó:
- **r = |z|** = √(a² + b²) — mô-đun.
- **θ = arg(z)** — argument (góc tính từ trục thực dương, ngược chiều kim đồng hồ).

**Chuyển đổi**:
- Đại số → lượng giác: r = √(a²+b²), θ = atan2(b, a).
- Lượng giác → đại số: a = r·cos θ, b = r·sin θ.

**Ví dụ**: z = 1 + i.
- r = √2.
- θ = π/4.
- → z = √2·(cos π/4 + i·sin π/4).

❓ **Vì sao có dạng này?** Vì khi nhân/chia số phức, dạng lượng giác **đơn giản hơn nhiều** dạng đại số (xem mục 3).

---

## 2. Công thức Euler

\`\`\`
e^(iθ) = cos θ + i·sin θ
\`\`\`

⟶ Số phức trên đường tròn đơn vị có argument θ chính là **e^(iθ)**.

**Tổng quát**: Mọi số phức:
\`\`\`
z = r·e^(iθ)
\`\`\`

> 📐 **Định nghĩa đầy đủ — Công thức Euler e^(iθ) = cos θ + i·sin θ**
>
> **(a) Là gì**: 1 đẳng thức **gây sốc** — hàm mũ (vốn cho đại lượng tăng/giảm) gặp số phức i thì biến thành **cos + i·sin** (vốn cho dao động). Hai khái niệm tưởng khác hoàn toàn lại là 2 mặt của 1 hiện tượng.
>
> **(b) Vì sao cần**: Vì làm cho mọi phép toán số phức trở nên **đơn giản như đại số mũ**: nhân/chia số phức = cộng/trừ argument (e^(iα)·e^(iβ) = e^(i(α+β))), lũy thừa = nhân argument (De Moivre). Cốt lõi của **Fourier analysis** (tín hiệu = tổng các e^(iωt)), **mạch điện AC** (phasor), **cơ học lượng tử** (hàm sóng e^(i(kx−ωt))). Đặc biệt e^(iπ) = −1 → e^(iπ) + 1 = 0 liên kết 5 hằng số quan trọng nhất toán (0, 1, π, e, i) — được mệnh danh "công thức đẹp nhất toán học".
>
> **(c) Ví dụ số**: θ = 0: e^0 = 1 = cos 0 + i·sin 0 = 1 + 0 ✓. θ = π/2: e^(iπ/2) = cos π/2 + i·sin π/2 = 0 + i = **i** (nhân với i = quay 90°!). θ = π: e^(iπ) = cos π + i·sin π = −1 + 0 = **−1**. θ = 2π: e^(i·2π) = 1 (tuần hoàn!). z = 1+i: r = √2, θ = π/4 → z = √2·e^(iπ/4). z² = 2·e^(iπ/2) = 2i ✓ (kiểm: (1+i)² = 1+2i+i² = 2i ✓).

💡 **Vì sao đúng?** Khai triển Taylor của e^x, sin x, cos x:
\`\`\`
e^x  = 1 + x + x²/2! + x³/3! + x⁴/4! + ...
sin x =     x       - x³/3!       + x⁵/5! - ...
cos x = 1     - x²/2!       + x⁴/4!       - ...
\`\`\`

Thay x = iθ vào e^x và dùng i² = -1, i³ = -i, i⁴ = 1, ...:
\`\`\`
e^(iθ) = 1 + iθ - θ²/2! - i·θ³/3! + θ⁴/4! + i·θ⁵/5! - ...
       = (1 - θ²/2! + θ⁴/4! - ...) + i(θ - θ³/3! + θ⁵/5! - ...)
       = cos θ + i·sin θ ✓
\`\`\`

**Đặc biệt** (θ = π):
\`\`\`
e^(iπ) = cos π + i·sin π = -1 + 0i = -1
\`\`\`

⟶ **e^(iπ) + 1 = 0** — kết nối 5 hằng số quan trọng nhất: 0, 1, π, e, i. Được mệnh danh "công thức đẹp nhất toán học".

---

## 3. Nhân / chia số phức dạng lượng giác

Cho z₁ = r₁·e^(iθ₁), z₂ = r₂·e^(iθ₂).

\`\`\`
z₁ · z₂ = r₁·r₂ · e^(i(θ₁ + θ₂))
z₁ / z₂ = (r₁/r₂) · e^(i(θ₁ - θ₂))
\`\`\`

💡 **Quy tắc dễ nhớ**:
- **Nhân**: mô-đun nhân, argument cộng.
- **Chia**: mô-đun chia, argument trừ.

⟶ Quá đẹp! So với cách nhân đại số (ac-bd) + (ad+bc)i thì dạng lượng giác trực quan hơn nhiều.

**Ví dụ số**: z₁ = 2·e^(iπ/3), z₂ = 3·e^(iπ/6).
- z₁·z₂ = 6·e^(i(π/3+π/6)) = 6·e^(iπ/2) = 6i.
- Kiểm tra đại số: z₁ = 2(½ + i·√3/2) = 1 + i√3. z₂ = 3(√3/2 + i/2) = (3√3)/2 + (3/2)i.
- z₁·z₂ = (1 + i√3)·((3√3)/2 + (3/2)i) = (3√3/2 - 3√3/2) + i(3/2 + 9/2) = 0 + 6i ✓.

---

## 4. Ý nghĩa hình học của nhân số phức

💡 **Nhân z với e^(iθ) = quay z đi 1 góc θ quanh O**.

**Đặc biệt**:
- **Nhân với i** (= e^(iπ/2)) = quay 90° ngược chiều kim đồng hồ.
- **Nhân với -1** (= e^(iπ)) = quay 180° (đối xứng tâm O).
- **Nhân với r·e^(iθ)** = phóng to r lần + quay θ.

⟶ **Số phức = phép biến hình đồng dạng**. Đó là lý do nó hữu ích cho hình học, kỹ thuật.

**Ví dụ**: Quay điểm A(3, 4) (≡ 3+4i) đi 90° quanh O.
- Nhân với i: (3+4i)·i = 3i + 4i² = -4 + 3i → điểm (-4, 3).

Khớp với công thức quay ở L08-T2: (x,y) → (-y, x). ✓

---

## 5. Bài tập

### Bài tập

**Bài 1**: Viết z = -1 + i dưới dạng lượng giác.

**Bài 2**: Tính (cos π/4 + i·sin π/4)^4 dùng Euler.

**Bài 3**: Cho z₁ = 2(cos π/6 + i sin π/6), z₂ = 3(cos π/3 + i sin π/3). Tính z₁·z₂ dạng lượng giác.

**Bài 4**: Tính e^(i·2π).

**Bài 5**: Quay z = 1 + i đi 60° quanh O.

### Lời giải

**Bài 1**: r = √2, θ = π - π/4 = 3π/4 (góc phần tư II). → **z = √2·(cos 3π/4 + i sin 3π/4) = √2·e^(i·3π/4)**.

**Bài 2**: (e^(iπ/4))^4 = e^(iπ) = **-1**.

**Bài 3**: r = 2·3 = 6, θ = π/6 + π/3 = π/2. → **6·(cos π/2 + i·sin π/2) = 6i**.

**Bài 4**: e^(2πi) = cos 2π + i sin 2π = 1 + 0i = **1**. (Tuần hoàn chu kỳ 2π!)

**Bài 5**: Quay 60° = nhân với e^(iπ/3) = ½ + i·√3/2.  
(1+i)(½ + i·√3/2) = ½ + i·√3/2 + i/2 + i²·√3/2 = (½ - √3/2) + i(√3/2 + ½) ≈ **-0.366 + 1.366i**.

---

## 6. Bài tiếp theo

[Lesson 07 — De Moivre](../lesson-07-de-moivre/) — lũy thừa & căn của số phức.

## 📝 Tổng kết

1. **z = r·(cos θ + i·sin θ) = r·e^(iθ)**.
2. **Euler**: e^(iθ) = cos θ + i·sin θ. e^(iπ) = -1.
3. **Nhân**: mô-đun nhân, argument cộng.
4. **Chia**: mô-đun chia, argument trừ.
5. **Nhân với e^(iθ) = quay góc θ** — ý nghĩa hình học.
`;
