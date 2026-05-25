// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Physics/03-Optics-ModernPhysics/lesson-05-atom-bohr-orbital/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 (T3) — Nguyên tử Bohr → Orbital

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **mô hình Bohr** (1913) — giải thích phổ vạch Hydrogen.
- Tính **mức năng lượng** electron trong nguyên tử Hydro: E_n = −13.6/n² eV.
- Hiểu **dãy phổ Lyman, Balmer, Paschen** — quan trọng cho thiên văn.
- Phân biệt mô hình Bohr (quỹ đạo) với mô hình **orbital** hiện đại (đám mây xác suất).
- Liên hệ với Lesson 02 Chemistry (cấu hình electron).

## Kiến thức tiền đề

- [Lesson 04 (T3) — Photon](../lesson-04-photon-wave-particle/) — biết E = hf.

---

## 1. Vấn đề trước Bohr — Phổ vạch Hydrogen

Khi đun nóng khí Hydrogen rồi cho qua lăng kính, ta thấy **vạch phổ rời rạc** (không liên tục). Mỗi vạch ở 1 λ cụ thể.

**Bí ẩn**: vì sao chỉ có một số λ "được phép"? Lý thuyết cổ điển không giải thích được — mô hình Rutherford (electron quay quanh hạt nhân) còn dự đoán electron rơi vào hạt nhân trong 10⁻¹¹ giây (đã đề cập ở Chemistry).

---

## 2. Mô hình Bohr (1913)

### 2.1. 3 giả định

Niels Bohr đưa ra **3 giả định "ad hoc"** để giải thích phổ Hydrogen:

1. Electron chỉ tồn tại ở các **quỹ đạo cố định** (gọi là các mức năng lượng dừng) — KHÔNG phát xạ ở mức bền.
2. Năng lượng các mức **lượng tử hóa**: E_n = −13.6/n² eV (n = 1, 2, 3, ...).
3. Electron **nhảy mức** (từ n_đầu sang n_cuối):
   - n_đầu < n_cuối: hấp thụ photon E = E_cuối − E_đầu.
   - n_đầu > n_cuối: phát xạ photon E = E_đầu − E_cuối.

### 2.2. Mức năng lượng Hydro

\`\`\`
E_n = −13.6 / n² (eV)
\`\`\`

| n | E_n (eV) | Bán kính quỹ đạo |
|---|----------|--------------------|
| 1 (mức cơ bản) | −13.6 | a₀ = 0.053 nm (Bohr radius) |
| 2 | −3.4 | 4·a₀ |
| 3 | −1.51 | 9·a₀ |
| 4 | −0.85 | 16·a₀ |
| ∞ | 0 | Ion hóa hoàn toàn |

**Năng lượng ion hóa** = năng lượng để bứt electron từ n=1 ra n=∞ = 13.6 eV. (Khớp đo thực nghiệm.)

### 2.3. Walk-through — Tính λ photon từ nhảy mức

Ví dụ: electron nhảy từ n=3 xuống n=2 (vạch Hα đỏ trong phổ Hydrogen).
- ΔE = E_3 − E_2 = −1.51 − (−3.4) = 1.89 eV = 3.03 × 10⁻¹⁹ J.
- λ = h·c/ΔE = (6.63e-34)(3e8)/3.03e-19 = **656 nm** (đỏ).

→ Khớp chính xác vạch đỏ trong phổ Hydrogen! Bohr đoạt Nobel 1922.

### 📝 Tóm tắt mục 2

- Bohr: electron ở mức rời rạc. E_n = −13.6/n² eV.
- Nhảy mức ↔ phát/hấp thụ photon. Tính được phổ chính xác cho H.

---

## 3. Dãy phổ Hydrogen

Mỗi "dãy" = tập hợp các vạch khi electron nhảy về 1 mức cuối cố định.

| Dãy | n_cuối | Vùng phổ | Năm phát hiện |
|-----|--------|----------|----------------|
| **Lyman** | 1 | UV | 1906 |
| **Balmer** | 2 | Nhìn thấy được (chính ánh sáng từ mặt trời và sao) | 1885 |
| **Paschen** | 3 | Hồng ngoại | 1908 |
| **Brackett** | 4 | Hồng ngoại xa | 1922 |

Dãy Balmer đặc biệt quan trọng — nó cho ánh sáng nhìn thấy, là cách thiên văn học **đo thành phần các sao** (mỗi nguyên tố có phổ vạch riêng).

---

## 4. Giới hạn mô hình Bohr — Mô hình hiện đại

Bohr chỉ đúng cho **Hydro 1 electron** (và H-like ions: He⁺, Li²⁺...). Với nhiều electron, không khớp.

### 4.1. Cơ học lượng tử (1925-1926)

Schrödinger và Heisenberg phát triển cơ học lượng tử — thay "quỹ đạo" của Bohr bằng **orbital** = vùng xác suất 3D mà electron có thể được tìm thấy.

**Hình dạng orbital**:
- **s**: hình cầu.
- **p**: 3 quả tạ theo 3 trục.
- **d**: 5 hình phức tạp.
- **f**: 7 hình rất phức tạp.

(Xem chi tiết ở [Chemistry/01-Structure/lesson-02-electron-config-periodic](../../../Chemistry/01-Structure/lesson-02-electron-config-periodic/).)

### 4.2. Nguyên lý bất định Heisenberg

Không thể đo đồng thời chính xác **vị trí** và **động lượng**:
\`\`\`
Δx · Δp ≥ ℏ/2
\`\`\`

→ Trong nguyên tử, không có "quỹ đạo" cố định — chỉ có **đám mây xác suất**. Bohr sai về "quỹ đạo" nhưng đúng về "mức năng lượng rời rạc".

### 📝 Tóm tắt mục 4

- Bohr OK cho H, sai cho nguyên tử nhiều e.
- Hiện đại: orbital = vùng xác suất 3D. Hình s/p/d/f.
- Heisenberg: Δx·Δp ≥ ℏ/2.

---

## 5. Bài tập

### Bài tập

**Bài 1**: Tính E mức n=4 của H.

**Bài 2**: Electron nhảy từ n=4 xuống n=1. Tính λ photon phát ra.

**Bài 3**: Vạch Hβ (n=4 → n=2). Tính λ.

**Bài 4**: Tại sao mô hình Bohr không đúng cho He (2 electron)?

**Bài 5**: Cùng nguyên tố Na, electron ở orbital 3s vs 3p. Có cùng năng lượng không?

### Lời giải

**Bài 1**: E_4 = −13.6/16 = **−0.85 eV**.

**Bài 2**: ΔE = E_4 − E_1 = −0.85 − (−13.6) = 12.75 eV. λ = hc/ΔE = (6.63e-34·3e8)/(12.75·1.6e-19) = **97.3 nm** (UV).

**Bài 3**: ΔE = E_4 − E_2 = −0.85 − (−3.4) = 2.55 eV. λ = 1240/2.55 = **486 nm** (xanh lá).

**Bài 4**: Bohr không tính đến **tương tác giữa các electron**. Với 1 e (H), chỉ có lực Coulomb e-hạt nhân. Với 2 e (He), thêm lực e-e đẩy nhau → phải dùng cơ học lượng tử để giải. Bohr ra sai.

**Bài 5**: KHÔNG. Trong nguyên tử nhiều electron (Na có 11), các electron trong cùng lớp NHƯNG khác phân lớp có năng lượng khác. 3s thấp hơn 3p (do hiệu ứng "screening" — electron 3s xâm nhập gần hạt nhân hơn 3p → hấp dẫn mạnh hơn → E thấp hơn). Đó là tại sao thứ tự điền 3s trước 3p (Aufbau).

---

## 6. Bài tiếp theo

[Lesson 06 — Hạt nhân & Phóng xạ](../lesson-06-nucleus-radioactivity/).

## 📝 Tổng kết

1. **Bohr (1913)**: 3 giả định. E_n = −13.6/n² eV cho H. Giải thích phổ vạch.
2. **Nhảy mức**: ΔE = h·f = h·c/λ.
3. **4 dãy phổ H**: Lyman (UV), Balmer (nhìn thấy), Paschen, Brackett (IR).
4. **Hiện đại**: orbital (vùng xác suất), không phải quỹ đạo. Hình s/p/d/f.
5. **Heisenberg**: Δx·Δp ≥ ℏ/2 — không thể đo chính xác đồng thời.
`;
