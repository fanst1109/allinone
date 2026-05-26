# Lesson 07 — Công thức De Moivre & căn bậc n

## Mục tiêu

- Hiểu **công thức De Moivre**: (cos θ + i·sin θ)^n = cos nθ + i·sin nθ.
- Tính lũy thừa số phức nhanh.
- Tìm **n căn bậc n của 1** và của số phức bất kỳ.
- Hình dung n căn = n đỉnh đa giác đều nội tiếp đường tròn.

## Kiến thức tiền đề

- [Lesson 06 — Euler](../lesson-06-complex-polar-euler/).

---

## 1. Công thức De Moivre

```
(cos θ + i·sin θ)^n = cos(nθ) + i·sin(nθ)
```

💡 **Dùng Euler**: (e^(iθ))^n = e^(inθ). Đó là tất cả!

⟶ **Lũy thừa số phức dạng cực**:
```
(r·e^(iθ))^n = r^n · e^(inθ)
```

**Ví dụ**: Tính (1+i)^10.
- 1+i = √2·e^(iπ/4).
- (1+i)^10 = (√2)^10·e^(i·10π/4) = 32·e^(i·5π/2) = 32·e^(iπ/2) (vì 5π/2 = 2π + π/2) = **32i**.

Cách trực tiếp (đại số) sẽ phải nhân 10 lần → vô cùng phiền. De Moivre giải quyết trong 3 dòng.

> 📐 **Định nghĩa đầy đủ — Công thức De Moivre**
>
> **(a) Là gì**: Quy tắc lũy thừa số phức dưới dạng cực: nâng (cos θ + i sin θ) lên bậc n = chỉ cần **nhân n vào argument**. Hệ quả trực tiếp của Euler (e^(iθ))^n = e^(inθ).
>
> **(b) Vì sao cần**: Lũy thừa số phức dạng đại số (a+bi)^n đòi hỏi nhân n lần — bùng nổ số hạng. De Moivre cho công thức **đóng** (closed-form) chỉ cần r^n + nθ. Quan trọng hơn — nó cho công cụ **giải PT** z^n = w trong ℂ: n căn bậc n nằm đều quanh đường tròn = n đỉnh đa giác đều. Ứng dụng: tìm tất cả căn của 1 (root of unity) — nền tảng FFT (Fast Fourier Transform), cryptography, đa thức nội suy.
>
> **(c) Ví dụ số**: (cos 30° + i sin 30°)^4 = cos 120° + i sin 120° = −1/2 + i·√3/2. Verify: 30°·4 = 120° ✓. (1+i)^10: viết = (√2·e^(iπ/4))^10 = 32·e^(i·10π/4) = 32·e^(iπ/2) = **32i**. Kiểm: (1+i)² = 2i, (2i)^5 = 32·i⁵ = 32·i ✓. n căn bậc 4 của 1: z^4 = 1 = e^0 → z_k = e^(i·k·2π/4), k=0,1,2,3 → {1, i, -1, -i} (4 đỉnh hình vuông).

⚠ **Lỗi thường gặp**: Quên nhân n vào θ. (e^(iθ))^n = e^(inθ), KHÔNG phải e^(iθ).

---

## 2. Khai triển cos(nθ), sin(nθ) qua sin/cos

Áp dụng De Moivre + nhị thức Newton để chứng minh các đồng nhất thức nhân đôi, nhân ba...

**Ví dụ**: Khai triển (cos θ + i sin θ)³.
- = cos³θ + 3·cos²θ·(i sinθ) + 3·cos θ·(i sinθ)² + (i sinθ)³
- = cos³θ + 3i·cos²θ·sin θ - 3·cos θ·sin²θ - i·sin³θ
- = (cos³θ - 3·cos θ·sin²θ) + i·(3·cos²θ·sin θ - sin³θ)

Vế trái cũng = cos 3θ + i·sin 3θ. Đối chiếu:
- **cos 3θ = cos³θ - 3·cos θ·sin²θ = 4cos³θ - 3cos θ**.
- **sin 3θ = 3·cos²θ·sin θ - sin³θ = 3sin θ - 4sin³θ**.

⟶ De Moivre **sinh ra** các công thức nhân ba (và mọi bậc).

---

## 3. Căn bậc n của 1

**Hỏi**: PT z^n = 1 có bao nhiêu nghiệm trong ℂ?

**Đáp**: **n nghiệm**, mỗi nghiệm tương ứng 1 đỉnh **đa giác đều n cạnh** nội tiếp đường tròn đơn vị.

**Công thức**:
```
z_k = e^(i·2kπ/n)   k = 0, 1, 2, ..., n-1
```

**Ví dụ n=3 (căn bậc 3 của 1)**:
- z₀ = e^0 = **1**.
- z₁ = e^(i·2π/3) = cos 120° + i sin 120° = **-1/2 + i√3/2**.
- z₂ = e^(i·4π/3) = **-1/2 - i√3/2**.

⟶ 3 nghiệm là 3 đỉnh tam giác đều nội tiếp đường tròn r=1.

**Kiểm tra**: z₁³ = (e^(i·2π/3))³ = e^(i·2π) = 1 ✓.

❓ **Vì sao đa giác đều?** Vì n căn cùng mô-đun r=1, argument chia đều quanh đường tròn cứ 2π/n.

### Trường hợp n=4:
z = 1, i, -1, -i → 4 đỉnh hình vuông.

### Trường hợp n=6:
z = e^(i·kπ/3), k=0..5 → 6 đỉnh lục giác đều.

---

## 4. Căn bậc n của số phức bất kỳ

**Tổng quát**: z^n = w (với w = R·e^(iφ)).

**n nghiệm**:
```
z_k = R^(1/n) · e^(i·(φ + 2kπ)/n)   k = 0, 1, ..., n-1
```

- Mô-đun: tất cả đều bằng **R^(1/n)** (căn bậc n thực của R).
- Argument: chia đều quanh đường tròn, mỗi nghiệm cách nhau 2π/n.

**Ví dụ**: Tìm các căn bậc 3 của -8.
- -8 = 8·e^(iπ).
- z_k = 8^(1/3)·e^(i·(π + 2kπ)/3) = 2·e^(i·(2k+1)π/3), k=0,1,2.
- z₀ = 2·e^(iπ/3) = 2·(½ + i·√3/2) = **1 + i√3**.
- z₁ = 2·e^(iπ) = **-2**.
- z₂ = 2·e^(i·5π/3) = **1 - i√3**.

**Kiểm tra**: (-2)³ = -8 ✓. (1+i√3)³ = ... = -8 (tính bằng De Moivre).

---

## 5. Ứng dụng — chứng minh đồng nhất thức trắc đẹp

Phép biến đổi từ ℂ về ℝ thường cho công thức ngắn gọn:
- **cos θ = (e^(iθ) + e^(-iθ))/2** (từ Euler).
- **sin θ = (e^(iθ) - e^(-iθ))/(2i)**.

⟶ Đây là cầu nối sang **Fourier** (Tier 5/6) — mọi tín hiệu = tổng các e^(iωt).

---

## 6. Bài tập

### Bài tập

**Bài 1**: Tính (cos π/6 + i·sin π/6)^12.

**Bài 2**: Tính (1 - i)^8.

**Bài 3**: Tìm các căn bậc 4 của 1.

**Bài 4**: Tìm các căn bậc 3 của 8i.

**Bài 5**: Chứng minh cos 2θ = 2·cos²θ - 1 dùng De Moivre.

### Lời giải

**Bài 1**: (e^(iπ/6))^12 = e^(i·2π) = **1**.

**Bài 2**: 1-i = √2·e^(-iπ/4). (√2·e^(-iπ/4))^8 = (√2)^8·e^(-i·2π) = 16·1 = **16**.

**Bài 3**: z_k = e^(i·kπ/2), k=0,1,2,3 → **{1, i, -1, -i}**.

**Bài 4**: 8i = 8·e^(iπ/2). z_k = 2·e^(i·(π/2 + 2kπ)/3), k=0,1,2.  
- z₀ = 2·e^(iπ/6) = 2(√3/2 + i/2) = **√3 + i**.  
- z₁ = 2·e^(i·5π/6) = **-√3 + i**.  
- z₂ = 2·e^(i·9π/6) = 2·e^(i·3π/2) = **-2i**.

**Bài 5**: Khai triển (cos θ + i sin θ)² = cos²θ + 2i·sin θ·cos θ - sin²θ.  
Vế trái = cos 2θ + i sin 2θ.  
Đối chiếu phần thực: **cos 2θ = cos²θ - sin²θ = cos²θ - (1 - cos²θ) = 2cos²θ - 1** ✓.

---

## 7. Bài tiếp theo

[Lesson 08 — Ứng dụng](../lesson-08-trig-applications/).

## 📝 Tổng kết

1. **De Moivre**: (cos θ + i sin θ)^n = cos nθ + i sin nθ. Hệ quả từ Euler.
2. **Lũy thừa cực**: (r·e^(iθ))^n = r^n·e^(inθ).
3. **n căn bậc n của z**: n nghiệm cách đều quanh đường tròn r = |z|^(1/n).
4. **Căn của 1**: n đỉnh đa giác đều nội tiếp đường tròn đơn vị.
