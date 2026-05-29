# Lesson 01 — Bức xạ & Phổ của sao (Radiation & Spectra)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **bức xạ vật đen (blackbody radiation)** là gì và vì sao mọi sao gần đúng là một vật đen.
- Dùng **định luật Wien** để suy nhiệt độ bề mặt sao từ màu (bước sóng đỉnh `λ_max`).
- Dùng **định luật Stefan–Boltzmann** để liên hệ độ trưng (luminosity) với bán kính và nhiệt độ.
- Phân biệt **3 loại phổ** (liên tục, phát xạ, hấp thụ) và phát biểu **định luật Kirchhoff**.
- Giải thích **vạch phổ** sinh ra từ chuyển mức năng lượng của electron trong nguyên tử.

## Kiến thức tiền đề

- Sóng điện từ, photon, năng lượng `E = hf` — quang học & vật lý hiện đại: [`../../../Physics/03-Optics-ModernPhysics/`](../../../Physics/03-Optics-ModernPhysics/).
- Cấu trúc nguyên tử, mức năng lượng electron — hóa học cấu tạo chất: [`../../../Chemistry/01-Structure/`](../../../Chemistry/01-Structure/).
- Lũy thừa và cấp số mũ cơ bản (cho công thức `T⁴`).

---

## 1. Bức xạ vật đen (Blackbody Radiation)

> 💡 **Trực giác / Hình dung.** Nung một thanh sắt: lúc đầu nó không phát sáng (chỉ tỏa nhiệt hồng ngoại), nóng hơn thì **đỏ rực**, nóng nữa thành **vàng**, rồi **trắng xanh**. Không ai bảo thanh sắt "đỏ thêm thuốc nhuộm" — *màu của nó chỉ phụ thuộc nhiệt độ*. Một ngôi sao cũng vậy: nhìn màu là đoán được nó nóng cỡ nào. Đó chính là tinh thần của bức xạ vật đen.

**Định nghĩa (3 phần):**

- **(a) Là gì** — **Vật đen** là vật hấp thụ hoàn toàn mọi bức xạ chiếu tới (không phản xạ gì) và, khi ở cân bằng nhiệt, **phát xạ lại** theo một đường cong cường độ–bước sóng *chỉ phụ thuộc vào nhiệt độ T*, không phụ thuộc vật liệu. Đường cong đó gọi là **đường cong Planck**.
- **(b) Vì sao tồn tại / cần** — Sao là khối khí dày đặc, photon bên trong bị hấp thụ và phát lại vô số lần trước khi thoát ra → đạt gần cân bằng nhiệt → phổ phát ra **rất giống vật đen lý tưởng**. Nhờ đó ta đo được nhiệt độ và (gián tiếp) bán kính của sao cách xa hàng nghìn năm ánh sáng chỉ bằng ánh sáng nó gửi tới.
- **(c) Ví dụ trực giác bằng số** — Mặt Trời `T ≈ 5778 K` phát đỉnh ở ánh sáng lục–vàng nên trông trắng-vàng; ngọn lửa nến `T ≈ 1800 K` đỏ cam; lò nung gốm `T ≈ 1300 K` đỏ tối; còn cơ thể người `T ≈ 310 K` chỉ phát hồng ngoại (camera nhiệt nhìn thấy).

**4 ví dụ số về màu ↔ nhiệt độ:**

| Vật | T (K) | Vùng đỉnh phát xạ | Màu thấy được |
|---|---|---|---|
| Cơ thể người | 310 | Hồng ngoại sâu | Không phát sáng nhìn thấy |
| Ngọn nến | 1800 | Hồng ngoại / đỏ | Đỏ cam |
| Mặt Trời | 5778 | Lục (~500 nm) | Trắng-vàng |
| Sao Rigel | 12000 | Tử ngoại | Xanh trắng |

> ⚠ **Lỗi thường gặp.** "Vật đen" nghe như *màu đen*, nhưng một vật đen nóng lại **rực sáng** (Mặt Trời là một vật đen tuyệt vời!). Chữ "đen" chỉ nghĩa là *hấp thụ hoàn toàn*, không nói gì về độ sáng khi nung nóng.

> 🔁 **Dừng lại tự kiểm tra.** Vì sao một thanh sắt nung "trắng" lại nóng hơn thanh nung "đỏ"?
> <details><summary>Đáp án</summary>Vì nóng hơn thì đỉnh phát xạ dịch sang bước sóng ngắn (định luật Wien). "Đỏ" = đỉnh ở bước sóng dài (nhiệt độ thấp); "trắng/xanh" = đỉnh dịch về phía tím + phát mạnh ở mọi màu → mắt trộn thành trắng → nhiệt độ cao hơn.</details>

---

## 2. Định luật Wien — màu cho biết nhiệt độ

> 💡 **Trực giác.** Đường cong Planck có một **đỉnh** (bước sóng phát mạnh nhất). Khi tăng nhiệt độ, đỉnh đó **trượt sang trái** (về bước sóng ngắn = về phía xanh/tím). Wien chỉ định lượng hóa cú trượt đó.

**Định nghĩa (3 phần):**

- **(a) Là gì** — Định luật Wien cho biết bước sóng tại đỉnh phát xạ tỉ lệ **nghịch** với nhiệt độ:
  `λ_max = b / T`, với hằng số Wien `b = 2.9 × 10⁻³ m·K`.
- **(b) Vì sao cần** — Ta không bay tới sao cắm nhiệt kế được. Nhưng *màu* (tức `λ_max`) thì đo từ Trái Đất được. Wien biến phép đo màu thành phép đo nhiệt độ — một trong những công cụ mạnh nhất của thiên văn.
- **(c) Ví dụ trực giác bằng số** — Mặt Trời `T = 5778 K` → `λ_max ≈ 502 nm` (ánh sáng lục). Nếu một sao chỉ ấm bằng nửa Mặt Trời thì `λ_max` dài gấp đôi → trượt sang đỏ/hồng ngoại.

> 📐 **Công thức:** `λ_max = 2.9 × 10⁻³ / T` (đơn vị: λ tính bằng **mét**, T bằng **Kelvin**). Nhân `λ` với `10⁹` để ra **nanomet (nm)**.

**Walk-through bằng số thật (verify cả 2 vế):**

1. **Mặt Trời, T = 5778 K:**
   ```
   λ_max = 2.9e−3 / 5778 = 5.018e−7 m = 502 nm
   ```
   502 nm nằm trong vùng **lục** → khớp với việc Mặt Trời phát mạnh nhất ở lục (mắt người tiến hóa nhạy nhất ở ~555 nm — không trùng hợp!).

2. **Sao nóng, T = 10000 K:**
   ```
   λ_max = 2.9e−3 / 10000 = 2.9e−7 m = 290 nm
   ```
   290 nm là **tử ngoại (UV)** → đỉnh nằm ngoài vùng nhìn thấy, sao trông xanh-trắng.

3. **Sao lạnh, T = 3000 K:**
   ```
   λ_max = 2.9e−3 / 3000 = 9.67e−7 m = 966 nm
   ```
   966 nm là **hồng ngoại gần** → sao đỏ (như Betelgeuse, Antares).

4. **Kiểm tra ngược:** một sao có `λ_max = 400 nm = 4e−7 m`. Nhiệt độ?
   ```
   T = 2.9e−3 / 4e−7 = 7250 K
   ```
   → sao trắng (loại A, như Sirius). Verify: ngược lại `λ_max = 2.9e−3/7250 = 4.0e−7 m = 400 nm` ✓.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Sao 10000 K đỉnh ở UV (vô hình) thì sao ta thấy nó xanh?"* — Vì đường cong Planck rộng: dù đỉnh ở UV, sao vẫn phát rất mạnh khắp vùng nhìn thấy, và phần **xanh** mạnh hơn phần đỏ → mắt trộn ra xanh-trắng.
> - *"Đo `λ_max` thực tế thế nào?"* — Dùng máy quang phổ tách ánh sáng sao thành dải, đo cường độ theo bước sóng, tìm đỉnh. Hoặc gián tiếp qua tỉ số sáng ở các bộ lọc màu khác nhau (chỉ số màu B−V).

> ⚠ **Lỗi thường gặp.** Nhầm đơn vị: nếu để `λ` bằng nm trong công thức (`λ_max = 2.9e−3/T`) sẽ ra số vô lý. Hằng số `b = 2.9×10⁻³` chỉ đúng khi `λ` tính bằng **mét**. Tính ra mét rồi mới đổi sang nm.

> 🔁 **Dừng lại tự kiểm tra.** Sao Betelgeuse có `T ≈ 3500 K`. Ước lượng `λ_max` và cho biết vùng phổ.
> <details><summary>Đáp án</summary>`λ_max = 2.9e−3/3500 = 8.29e−7 m = 829 nm` → hồng ngoại gần → sao đỏ. Khớp: Betelgeuse là siêu khổng lồ đỏ.</details>

---

## 3. Định luật Stefan–Boltzmann — sáng cỡ nào?

> 💡 **Trực giác.** Một bếp than to tỏa nhiều nhiệt hơn que diêm vì (1) **nóng hơn** và (2) **diện tích lớn hơn**. Sao cũng vậy: tổng năng lượng phát ra mỗi giây (độ trưng) phụ thuộc cả nhiệt độ lẫn diện tích bề mặt.

**Định nghĩa (3 phần):**

- **(a) Là gì** — **Độ trưng (luminosity) L** là tổng công suất bức xạ của sao (đơn vị W). Stefan–Boltzmann nói: công suất trên mỗi mét vuông bề mặt là `σT⁴`; nhân với diện tích cầu `4πR²` ra:
  `L = 4πR²σT⁴`, với `σ = 5.67 × 10⁻⁸ W·m⁻²·K⁻⁴`.
- **(b) Vì sao cần** — Nó nối **3 đại lượng cốt lõi** của một sao: độ trưng L, bán kính R, nhiệt độ T. Biết 2 trong 3 là tính được cái thứ 3. Đặc biệt: đo được L (từ độ sáng + khoảng cách) và T (từ Wien) → suy ra **bán kính R** của sao mà không cần nhìn thấy đĩa của nó.
- **(c) Ví dụ trực giác bằng số** — Tăng nhiệt độ gấp đôi → độ trưng tăng `2⁴ = 16` lần (vì mũ 4 rất "nhạy"). Đây là lý do các sao nóng cực kỳ sáng.

> 📐 **Công thức:** `L = 4 π R² σ T⁴`. Để so sánh với Mặt Trời tiện hơn, dùng dạng tỉ số (bỏ hết hằng số):
> `L/L☉ = (R/R☉)² × (T/T☉)⁴`.

**Walk-through bằng số thật (verify):**

1. **Mặt Trời** (`R☉ = 6.96×10⁸ m`, `T = 5778 K`):
   ```
   L = 4π (6.96e8)² × 5.67e−8 × 5778⁴
     = 4π × 4.844e17 × 5.67e−8 × 1.115e15
     ≈ 3.85e26 W
   ```
   Khớp với giá trị chuẩn `L☉ ≈ 3.83×10²⁶ W` ✓.

2. **Sirius A** (`R ≈ 1.71 R☉`, `T ≈ 9940 K`) — dùng dạng tỉ số:
   ```
   L/L☉ = (1.71)² × (9940/5778)⁴ = 2.92 × (1.720)⁴ = 2.92 × 8.75 ≈ 25.6
   ```
   → Sirius sáng gấp ~25 lần Mặt Trời. Khớp giá trị quan trắc (~25 L☉) ✓.

3. **Sao khổng lồ đỏ** (`R = 100 R☉`, `T = 3500 K`):
   ```
   L/L☉ = 100² × (3500/5778)⁴ = 10000 × (0.6058)⁴ = 10000 × 0.1347 ≈ 1347
   ```
   → dù *lạnh* (3500 K), nó vẫn sáng hơn Mặt Trời ~1300 lần nhờ **bán kính khổng lồ**.

4. **Sao lùn trắng** (`R = 0.01 R☉`, `T = 25000 K`):
   ```
   L/L☉ = 0.01² × (25000/5778)⁴ = 1e−4 × (4.327)⁴ = 1e−4 × 350.5 ≈ 0.035
   ```
   → dù *rất nóng*, nó mờ hơn Mặt Trời ~30 lần vì **quá nhỏ**.

> ❓ **Câu hỏi tự nhiên.**
> - *"Nóng hơn mà mờ hơn (lùn trắng) được à?"* — Được, vì L phụ thuộc cả R². Nhiệt độ nâng L theo `T⁴`, nhưng bán kính bé tí (R²) kéo L xuống mạnh hơn. Hai sao cùng nhiệt độ nhưng khác kích thước → khác độ trưng → đây là chìa khóa của biểu đồ H-R (Lesson 03).
> - *"Vì sao mũ 4 chứ không phải mũ 2?"* — Năng lượng bức xạ tích phân đường cong Planck trên mọi bước sóng cho ra `∝ T⁴` (kết quả của vật lý thống kê). Hệ quả: nhiệt độ là "đòn bẩy" cực mạnh cho độ trưng.

> ⚠ **Lỗi thường gặp.** Quên mũ 4 khi dùng tỉ số nhiệt độ — viết `(T/T☉)` thay vì `(T/T☉)⁴`. Sai số khổng lồ. Luôn nhớ: **R bình phương, T mũ bốn**.

> 🔁 **Dừng lại tự kiểm tra.** Hai sao cùng bán kính, sao A có T = 6000 K, sao B có T = 12000 K. Sao B sáng gấp mấy lần A?
> <details><summary>Đáp án</summary>Cùng R nên `L_B/L_A = (12000/6000)⁴ = 2⁴ = 16` lần. Nhiệt độ gấp đôi → sáng gấp 16 lần.</details>

---

## 4. Ba loại phổ & định luật Kirchhoff

> 💡 **Trực giác.** Tách ánh sáng qua lăng kính, bạn được một "vân tay" của nguồn sáng. Có 3 kiểu vân tay, tùy nguồn là *vật rắn/khí dày nóng*, *khí loãng nóng*, hay *khí loãng nguội chắn trước nguồn nóng*. Quy luật ai-cho-ra-cái-gì gọi là **định luật Kirchhoff**.

**Ba loại phổ:**

- **(a) Phổ liên tục (continuous spectrum)** — dải màu trơn từ đỏ đến tím, không đứt đoạn. Sinh ra từ **vật rắn, lỏng, hoặc khí đặc nóng** (ví dụ lõi sao, dây tóc bóng đèn). Đây chính là đường cong Planck.
- **(b) Phổ phát xạ (emission spectrum)** — chỉ vài **vạch sáng** rời rạc trên nền tối. Sinh ra từ **khí loãng nóng** (ví dụ đèn neon, tinh vân phát xạ).
- **(c) Phổ hấp thụ (absorption spectrum)** — phổ liên tục nhưng bị **khoét vài vạch tối**. Sinh khi ánh sáng liên tục đi xuyên qua **khí loãng nguội hơn** ở phía trước — khí hấp thụ đúng các bước sóng mà nó vốn sẽ phát xạ.

> 📜 **Định luật Kirchhoff (3 quy tắc):**
> 1. Vật đặc nóng → **phổ liên tục**.
> 2. Khí loãng nóng → **phổ phát xạ** (vạch sáng).
> 3. Khí loãng nguội chắn trước nguồn liên tục → **phổ hấp thụ** (vạch tối) — đúng tại các bước sóng mà khí đó phát xạ.

**4 ví dụ số/thực tế cụ thể:**

| Nguồn | Loại phổ | Đặc trưng |
|---|---|---|
| Dây tóc bóng đèn sợi đốt | Liên tục | Dải màu trơn, không vạch |
| Đèn neon (Ne loãng, phóng điện) | Phát xạ | Vạch đỏ-cam ~640 nm đặc trưng |
| Mặt Trời (quang quyển + khí quyển sao) | Hấp thụ | Hàng nghìn **vạch Fraunhofer** tối |
| Tinh vân Orion (khí ion hóa) | Phát xạ | Vạch Hα 656 nm, [OIII] 500 nm |

> 📌 **Mấu chốt về Mặt Trời:** lõi nóng đặc cho phổ liên tục; lớp khí quyển sao nguội hơn ở ngoài hấp thụ → ta thấy **phổ hấp thụ** với các vạch tối. Phân tích vạch tối này cho biết **thành phần hóa học** của sao (hydro, heli, canxi, sắt...). Năm 1868 người ta tìm ra **heli trong phổ Mặt Trời trước khi tìm thấy nó trên Trái Đất** — tên "helium" lấy từ *Helios*.

> ❓ **Câu hỏi tự nhiên.** *"Vì sao cùng một nguyên tố lúc cho vạch sáng, lúc cho vạch tối?"* — Cùng các bước sóng đó! Khi khí *nóng và tự phát* → ta thấy vạch **sáng** ở các bước sóng đó. Khi khí *nguội và đứng trước nguồn sáng mạnh hơn* → nó *lấy bớt* đúng các bước sóng đó khỏi phổ liên tục → vạch **tối** tại cùng vị trí. Vạch sáng và vạch tối của một nguyên tố **trùng bước sóng** — đó là dấu vân tay không đổi.

> 🔁 **Dừng lại tự kiểm tra.** Bạn quan sát một tinh vân khí loãng nóng phát sáng, không có sao nền phía sau. Phổ của nó loại gì?
> <details><summary>Đáp án</summary>Phổ **phát xạ** (vạch sáng) — theo quy tắc 2 của Kirchhoff: khí loãng nóng tự phát ra các vạch sáng.</details>

---

## 5. Vạch phổ sinh ra từ đâu — chuyển mức năng lượng

> 💡 **Trực giác.** Electron trong nguyên tử chỉ được phép ở những "bậc thang năng lượng" rời rạc, không có bậc nửa vời. Nhảy từ bậc cao xuống bậc thấp → **nhả** ra một photon mang đúng phần năng lượng chênh lệch (vạch phát xạ). Nhảy lên cao thì phải **nuốt** một photon đúng năng lượng đó (vạch hấp thụ). Vì bậc thang là cố định, các photon được nhả/nuốt có **bước sóng cố định** → vạch phổ sắc nét.

**Định nghĩa (3 phần):**

- **(a) Là gì** — Mỗi vạch phổ ứng với một **chuyển mức (transition)** của electron giữa hai mức năng lượng `E_cao` và `E_thấp`. Năng lượng photon: `ΔE = E_cao − E_thấp = hf = hc/λ`.
- **(b) Vì sao cần** — Mỗi nguyên tố có bộ mức năng lượng **riêng biệt** → bộ bước sóng vạch riêng → *vân tay hóa học*. Nhờ vạch phổ ta biết thành phần của sao, đo vận tốc qua dịch Doppler, suy ra mật độ và nhiệt độ.
- **(c) Ví dụ trực giác bằng số** — Hydro nhảy từ mức n=3 xuống n=2 nhả photon `656 nm` (vạch **Hα**, đỏ). Đây là vạch nổi tiếng nhất trong thiên văn.

> 📐 **Tính bước sóng từ ΔE** (`h = 6.63×10⁻³⁴ J·s`, `c = 3×10⁸ m/s`):
> `λ = hc / ΔE`.

**Walk-through số thật (Hα của hydro):**

Chênh năng lượng mức n=3 → n=2 của hydro: `ΔE ≈ 1.89 eV = 1.89 × 1.602×10⁻¹⁹ = 3.03×10⁻¹⁹ J`.
```
λ = (6.63e−34 × 3e8) / 3.03e−19
  = 1.989e−25 / 3.03e−19
  = 6.56e−7 m = 656 nm
```
→ đúng vạch **Hα đỏ** ✓. Verify ngược: `ΔE = hc/λ = 1.989e−25 / 6.56e−7 = 3.03e−19 J = 1.89 eV` ✓.

**4 ví dụ vạch thật:**

| Vạch | Chuyển mức (Hydro) | λ (nm) | Màu/vùng |
|---|---|---|---|
| Hα | n=3 → n=2 | 656 | Đỏ |
| Hβ | n=4 → n=2 | 486 | Lam-lục |
| Hγ | n=5 → n=2 | 434 | Tím |
| Lyman-α | n=2 → n=1 | 122 | Tử ngoại |

> ❓ **Câu hỏi tự nhiên.**
> - *"Vì sao mức năng lượng lại rời rạc?"* — Hệ quả của cơ học lượng tử: electron quanh hạt nhân chỉ tồn tại ở các trạng thái dừng nhất định (xem [`Chemistry/01-Structure`](../../../Chemistry/01-Structure/)). Không có "nửa bậc".
> - *"Một nguyên tố cho được bao nhiêu vạch?"* — Rất nhiều, vì có nhiều cặp mức để nhảy. Mỗi cặp = một vạch ở bước sóng riêng. Tập hợp các vạch là **dấu vân tay** duy nhất của nguyên tố.

> ⚠ **Lỗi thường gặp.** Tưởng "màu của sao do thành phần hóa học". Sai — **màu** (đỉnh Planck) do **nhiệt độ** (Wien). **Vạch** mới do thành phần hóa học. Hai thông tin tách bạch: nền liên tục → nhiệt độ; vạch trên nền → thành phần.

> 🔁 **Dừng lại tự kiểm tra.** Một vạch hấp thụ ở 589 nm (vàng) xuất hiện trong phổ sao. Nó cho biết điều gì?
> <details><summary>Đáp án</summary>Có **natri (Na)** trong khí quyển sao — 589 nm là vạch đôi đặc trưng của natri (giống màu vàng đèn đường natri). Nó cho biết *thành phần*, không phải nhiệt độ.</details>

---

## 6. Tóm tắt

> 📝 **Tóm tắt toàn bài.**
> - **Vật đen**: phổ phát xạ chỉ phụ thuộc T; sao gần đúng là vật đen.
> - **Wien**: `λ_max = 2.9×10⁻³ / T` → màu cho biết nhiệt độ (Mặt Trời 5778 K → 502 nm lục).
> - **Stefan–Boltzmann**: `L = 4πR²σT⁴` → nối L, R, T. Dạng tỉ số: `L/L☉ = (R/R☉)²(T/T☉)⁴`. **R bình phương, T mũ bốn.**
> - **3 loại phổ + Kirchhoff**: liên tục (vật đặc nóng), phát xạ (khí loãng nóng), hấp thụ (khí loãng nguội chắn trước nguồn nóng).
> - **Vạch phổ**: từ chuyển mức năng lượng electron; `λ = hc/ΔE`; là vân tay hóa học. Hα = 656 nm (n=3→2).
> - **Tách bạch**: nền liên tục → nhiệt độ; vạch → thành phần.

---

## Bài tập

1. **Wien thuận.** Sao Vega có `T ≈ 9600 K`. Tính `λ_max` (nm) và cho biết vùng phổ + màu thấy được.

2. **Wien ngược.** Một sao có `λ_max = 700 nm`. Tính nhiệt độ bề mặt. Sao này nóng hay lạnh so với Mặt Trời?

3. **Stefan–Boltzmann tỉ số.** Sao Aldebaran có `R ≈ 44 R☉`, `T ≈ 3900 K`. Tính độ trưng `L/L☉`. Vì sao một sao "lạnh" lại sáng đến vậy?

4. **Suy bán kính.** Một sao có `L = 100 L☉` và `T = 5778 K` (bằng Mặt Trời). Bán kính của nó bằng mấy lần `R☉`?

5. **Loại phổ.** Với mỗi nguồn sau, cho biết loại phổ: (a) dây tóc bóng đèn; (b) tinh vân khí ion hóa phát sáng; (c) ánh sáng Mặt Trời sau khi qua khí quyển sao. Giải thích bằng định luật Kirchhoff.

6. **Vạch phổ.** Chuyển mức Hβ của hydro (n=4 → n=2) có `ΔE ≈ 2.55 eV`. Tính bước sóng (nm) và so với giá trị 486 nm trong bảng.

---

## Lời giải chi tiết

### Bài 1 — Wien thuận

`λ_max = 2.9×10⁻³ / 9600 = 3.02×10⁻⁷ m = 302 nm`.
302 nm thuộc **tử ngoại (UV)** → đỉnh nằm ngoài vùng nhìn thấy. Dù đỉnh ở UV, Vega vẫn phát mạnh ở vùng nhìn thấy với phần xanh trội hơn → trông **trắng-xanh** (Vega là sao loại A chuẩn).

### Bài 2 — Wien ngược

`T = 2.9×10⁻³ / λ_max`. Đổi `700 nm = 7×10⁻⁷ m`:
```
T = 2.9e−3 / 7e−7 = 4143 K
```
4143 K < 5778 K → sao **lạnh hơn** Mặt Trời, đỉnh ở đỏ → màu cam-đỏ. Verify ngược: `λ_max = 2.9e−3/4143 = 7.0e−7 m = 700 nm` ✓.

### Bài 3 — Stefan–Boltzmann tỉ số (Aldebaran)

```
L/L☉ = (R/R☉)² × (T/T☉)⁴
     = 44² × (3900/5778)⁴
     = 1936 × (0.6750)⁴
     = 1936 × 0.2076
     ≈ 402
```
→ Aldebaran sáng ~**400 lần** Mặt Trời. Dù nhiệt độ thấp (3900 K kéo `(T/T☉)⁴` xuống còn 0.21), **bán kính 44 lần** (bình phương = 1936) áp đảo → tổng vẫn rất sáng. Đây là đặc trưng của **sao khổng lồ** (Lesson 03).

### Bài 4 — Suy bán kính

Từ `L/L☉ = (R/R☉)²(T/T☉)⁴` với `T = T☉` → `(T/T☉)⁴ = 1`:
```
100 = (R/R☉)² × 1
R/R☉ = √100 = 10
```
→ sao có bán kính **10 lần** Mặt Trời. (Cùng nhiệt độ, muốn sáng gấp 100 chỉ còn cách to lên: R² = 100 → R = 10.)

### Bài 5 — Loại phổ (Kirchhoff)

- **(a) Dây tóc bóng đèn** — vật rắn nóng đặc → **phổ liên tục** (quy tắc 1).
- **(b) Tinh vân khí ion hóa** — khí loãng nóng tự phát → **phổ phát xạ** (vạch sáng, quy tắc 2).
- **(c) Ánh sáng Mặt Trời** — phổ liên tục từ quang quyển nóng đi qua lớp khí quyển sao nguội hơn → **phổ hấp thụ** (vạch tối Fraunhofer, quy tắc 3).

### Bài 6 — Vạch Hβ

`ΔE = 2.55 eV = 2.55 × 1.602×10⁻¹⁹ = 4.085×10⁻¹⁹ J`.
```
λ = hc/ΔE = (6.63e−34 × 3e8) / 4.085e−19
  = 1.989e−25 / 4.085e−19
  = 4.87e−7 m = 487 nm
```
→ ≈ **486–487 nm**, khớp giá trị bảng (Hβ = 486 nm, lam-lục) ✓. Sai lệch nhỏ do làm tròn `ΔE`.

---

## Code & Minh họa

- **Visualization tương tác**: [visualization.html](./visualization.html) — gồm:
  - **Đường cong Planck**: kéo slider **nhiệt độ T**; đường cong đổi hình, đỉnh trượt đúng theo Wien, ô màu đổi theo `λ_max`, hiển thị `λ_max` + độ trưng tương đối (`T⁴`).
  - **Stefan–Boltzmann calculator**: nhập `R/R☉` và `T/T☉` → ra ngay `L/L☉` với preset các sao thật.
  - **Demo 3 loại phổ**: bấm chọn nguồn (vật đặc / khí nóng / khí nguội chắn) → hiển thị dải phổ tương ứng (liên tục / vạch sáng / vạch tối) minh họa Kirchhoff.

---

## Bài tiếp theo

→ [Lesson 02 — Đo sao](../lesson-02-measuring-stars/): cấp sao biểu kiến vs tuyệt đối, độ trưng, định luật nghịch đảo bình phương, đo khoảng cách bằng thị sai parallax. Ta sẽ dùng lại khái niệm **độ trưng L** của bài này để tách "sao sáng vì gần" khỏi "sao sáng vì thực sự mạnh".

**Tham khảo chéo:** photon & năng lượng → [`../../../Physics/03-Optics-ModernPhysics/`](../../../Physics/03-Optics-ModernPhysics/); cấu trúc nguyên tử & mức năng lượng → [`../../../Chemistry/01-Structure/`](../../../Chemistry/01-Structure/).
