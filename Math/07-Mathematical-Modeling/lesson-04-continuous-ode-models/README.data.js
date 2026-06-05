// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/07-Mathematical-Modeling/lesson-04-continuous-ode-models/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Mô hình liên tục (ODE)

## Mục tiêu

- Chuyển từ mô hình **rời rạc** ([L03](../lesson-03-discrete-dynamical/)) sang **liên tục**: mô tả bằng tốc độ thay đổi dx/dt.
- **Tăng trưởng mũ** dN/dt = rN và hạn chế của nó.
- **Tăng trưởng logistic** dN/dt = rN(1−N/K): đường cong chữ S, sức chứa K — và vì sao nó *luôn mượt* (khác bản rời rạc hỗn loạn ở L03).
- **Định luật nguội Newton** (giải đầy đủ ODE) và **bài toán bể trộn (mixing)**.
- **Phương pháp Euler**: mô phỏng ODE trên máy chính là biến nó thành phương trình sai phân — nối liền L03 và L04.

## Kiến thức tiền đề

- [Lesson 01](../lesson-01-modeling-cycle/) (chu trình), [Lesson 03](../lesson-03-discrete-dynamical/) (mô hình rời rạc).
- [T6 L07 — Phương trình vi phân (ODE)](../../06-Advanced/lesson-07-differential-equations/) (tách biến, tuyến tính bậc 1).

---

## 1. Từ rời rạc sang liên tục

💡 **Trực giác / Hình dung.** Ở [L03](../lesson-03-discrete-dynamical/), thời gian nhảy theo bước (n, n+1). Nếu bước nhỏ dần — mỗi giây, mỗi mili-giây — ta tiến tới mô tả **liên tục**: thay "xₙ₊₁ − xₙ" (thay đổi mỗi bước) bằng **đạo hàm dx/dt** (tốc độ thay đổi tức thời). ODE là ngôn ngữ tự nhiên khi đại lượng biến thiên trơn theo thời gian.

So sánh nhanh: rời rạc hỏi *"kỳ sau bằng bao nhiêu?"* (xₙ₊₁ = f(xₙ)); liên tục hỏi *"đang thay đổi nhanh cỡ nào?"* (dx/dt = g(x)). Phần lý thuyết giải ODE đã có ở [T6 L07](../../06-Advanced/lesson-07-differential-equations/); lesson này tập trung **dùng** ODE để mô hình hóa.

📝 **Tóm tắt mục 1**: ODE = mô tả qua tốc độ thay đổi dx/dt; dùng khi đại lượng biến thiên liên tục. Rời rạc và liên tục là hai góc nhìn cùng một hiện tượng, gặp nhau khi bước → 0 (mục 6).

---

## 2. Tăng trưởng mũ

💡 **Trực giác.** "Càng nhiều càng sinh nhanh": tốc độ tăng tỉ lệ với lượng hiện có. Tiền lãi, vi khuẩn chia đôi, phản ứng dây chuyền.

**Mô hình**: dN/dt = r·N (r = tốc độ tăng trưởng, [r] = thời gian⁻¹).
**Nghiệm** (tách biến — [T6 L07](../../06-Advanced/lesson-07-differential-equations/)): **N(t) = N₀·e^(rt)**.

**Walk-through**: N₀ = 100, r = 0.5/giờ.
- N(t) = 100·e^(0.5t). t = 2: 100·e¹ ≈ 272. t = 4: 100·e² ≈ 739. t = 10: 100·e⁵ ≈ 14 841.
- Thời gian nhân đôi: e^(r·t₂) = 2 → t₂ = ln2/r = 0.693/0.5 ≈ **1.39 giờ**.

⚠ **Lỗi thường gặp — dùng mũ cho dài hạn.** Mô hình mũ *không có giới hạn*: N → ∞. Thực tế mọi tài nguyên đều hữu hạn (đã cảnh báo ở [L01 mục 2](../lesson-01-modeling-cycle/)). Mũ chỉ đúng *giai đoạn đầu* khi N còn nhỏ so với sức chứa. → cần logistic (mục 3).

📝 **Tóm tắt mục 2**: dN/dt = rN → N₀·e^(rt); thời gian nhân đôi ln2/r. Chỉ hợp giai đoạn đầu; ngoại suy dài hạn vô lý.

---

## 3. Tăng trưởng logistic

💡 **Trực giác — phanh khi đông đúc.** Logistic thêm vào mũ một "phanh" (1 − N/K): khi N nhỏ, phanh ≈ 1 (tăng gần như mũ); khi N tiến tới **sức chứa K**, phanh → 0 (ngừng tăng). Kết quả: đường cong chữ S.

> 📐 **Định nghĩa đầy đủ — Sức chứa K (carrying capacity)**
>
> **(a) Là gì**: K là mức quần thể tối đa mà môi trường nuôi được lâu dài — điểm cân bằng ổn định của mô hình. Đơn vị giống N (số cá thể, mật độ...).
>
> **(b) Vì sao cần**: Mô hình mũ thiếu mọi giới hạn nên ngoại suy thành vô hạn. K đưa *giới hạn tài nguyên* vào mô hình một cách định lượng, biến dự báo "bùng nổ vô hạn" thành "bão hòa thực tế".
>
> **(c) Ví dụ số**: K = 1000 cá trong hồ. N₀ = 100, r = 0.5. Lúc N = 100: phanh = 1 − 100/1000 = 0.9 (tăng gần mũ). Lúc N = 900: phanh = 0.1 (tăng chậm hẳn). Lúc N = 1000 = K: phanh = 0 (dừng). Lúc N = 1100 > K (quá tải): phanh = −0.1 → dN/dt < 0 → *giảm* về K.

**Mô hình**: dN/dt = r·N·(1 − N/K).
**Nghiệm**: **N(t) = K / (1 + A·e^(−rt))**, với A = (K − N₀)/N₀.

**Điểm cân bằng**: N = 0 (không ổn định) và N = K (ổn định). Điểm uốn tại N = K/2 (tăng nhanh nhất).

**Walk-through**: K = 1000, r = 0.5, N₀ = 100 → A = (1000−100)/100 = 9.
- N(t) = 1000/(1 + 9e^(−0.5t)). Kiểm t=0: 1000/(1+9) = 100 ✓.
- Khi N = K/2 = 500: 1 + 9e^(−0.5t) = 2 → e^(−0.5t) = 1/9 → t = ln9/0.5 ≈ **4.39** (điểm uốn, đông đúc nhất về tốc độ).
- t → ∞: e^(−0.5t) → 0 → N → **1000 = K** ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Logistic liên tục có hỗn loạn như bản rời rạc ở L03 không?"* **Không!** ODE logistic bậc 1 *luôn* hội tụ mượt về K, không bao giờ dao động hay hỗn loạn. Lý do: thời gian liên tục không cho "vọt lố" qua cân bằng như bước nhảy rời rạc. Đây là khác biệt sâu sắc giữa hai mô hình — cùng tên "logistic" nhưng hành vi khác hẳn.
- *"Nếu N₀ > K thì sao?"* Phanh âm → dN/dt < 0 → N *giảm* về K. K là điểm hút từ cả hai phía.

🔁 **Dừng lại tự kiểm tra**

1. Logistic K = 500, N₀ = 500. N(t) bằng gì với mọi t?

<details><summary>Đáp án</summary>

N₀ = K = 500 là điểm cân bằng → dN/dt = 0 → **N(t) = 500 mãi mãi**. (A = 0, công thức cho N = K/(1+0) = K.)

</details>

### 📝 Tóm tắt mục 3

- Logistic dN/dt = rN(1−N/K): mũ + phanh (1−N/K). Nghiệm N = K/(1+Ae^(−rt)), đường chữ S.
- Cân bằng N = K ổn định; điểm uốn N = K/2. Khác bản rời rạc: liên tục *luôn mượt*, không hỗn loạn.

---

## 4. Định luật nguội Newton & bể trộn

### 4.1 Nguội Newton (giải đầy đủ)

Đã gặp ở [L01](../lesson-01-modeling-cycle/) (ví dụ end-to-end) và [L02](../lesson-02-empirical-curve-fitting/) (fit k). Ở đây nêu nghiệm gọn: dT/dt = −k(T − Tₚ) → **T(t) = Tₚ + (T₀ − Tₚ)·e^(−kt)**. Cân bằng T = Tₚ ổn định.

### 4.2 Bài toán bể trộn (mixing)

💡 **Trực giác.** Bồn chứa dung dịch; chất hòa tan chảy *vào* và *ra* liên tục. Lượng chất trong bồn thay đổi = (vào) − (ra). Vì "ra" tỉ lệ nồng độ hiện tại → ODE tuyến tính bậc 1.

**Bài toán**: Bồn 100 L nước, ban đầu 20 kg muối. Nước muối 0.5 kg/L chảy vào 5 L/phút; dung dịch trộn đều chảy ra 5 L/phút (thể tích giữ 100 L).

**Lập mô hình**: gọi S(t) = kg muối.
- Vào: 0.5 kg/L × 5 L/phút = 2.5 kg/phút.
- Ra: nồng độ S/100 kg/L × 5 L/phút = 0.05·S kg/phút.
- **dS/dt = 2.5 − 0.05·S** (tuyến tính bậc 1).

**Giải**: cân bằng S* = 2.5/0.05 = 50. **S(t) = 50 + (20 − 50)·e^(−0.05t) = 50 − 30·e^(−0.05t)**.
- Kiểm t=0: 50 − 30 = 20 ✓. t → ∞: S → 50 kg (= 0.5 kg/L × 100 L, nồng độ vào) ✓ — hợp lý.

⚠ **Lỗi thường gặp — quên rằng nồng độ ra dùng S hiện tại, không phải S vào.** Tốc độ ra = (S/V)·(lưu lượng ra), với S/V là nồng độ *trong bồn* (thay đổi theo t), không phải nồng độ dòng vào. Lẫn hai cái → sai ODE.

🔁 **Dừng lại tự kiểm tra**

1. Bồn trên, sau bao lâu muối đạt 40 kg?

<details><summary>Đáp án</summary>

40 = 50 − 30e^(−0.05t) → 30e^(−0.05t) = 10 → e^(−0.05t) = 1/3 → t = ln3/0.05 = 1.0986/0.05 ≈ **22 phút**.

</details>

### 📝 Tóm tắt mục 4

- Nguội Newton: T(t) = Tₚ + (T₀−Tₚ)e^(−kt). Bể trộn: dS/dt = (vào) − (nồng độ trong bồn)·(ra).
- Cả hai là ODE tuyến tính bậc 1 → có cân bằng ổn định; nồng độ ra dùng S hiện tại.

---

## 5. Phương pháp Euler — cầu nối rời rạc ↔ liên tục

💡 **Trực giác.** Máy tính không "giải tích phân"; nó *bước nhỏ*. Biết dx/dt = g(x) và x tại t, ước lượng x sau khoảng nhỏ h: "vị trí mới ≈ vị trí cũ + vận tốc × thời gian".

**Công thức Euler**: xₙ₊₁ = xₙ + h·g(xₙ).

🎯 **Phát hiện nối L03 và L04**: áp Euler cho dN/dt = rN được xₙ₊₁ = xₙ + h·r·xₙ = **(1 + hr)·xₙ** — đúng là **mô hình rời rạc tuyến tính** ở [L03 mục 2](../lesson-03-discrete-dynamical/)! Với h nhỏ, (1+hr)ⁿ → e^(rt). Vậy *giải ODE bằng máy = biến nó thành phương trình sai phân*. Hai thế giới là một khi h → 0.

⚠ **Lỗi thường gặp — chọn bước h quá lớn.** h lớn → Euler sai nhiều, thậm chí mất ổn định (dao động giả). Phản ví dụ: logistic Euler với h·r quá lớn có thể tự tạo ra "chu kỳ/hỗn loạn" — đó là *artefact số học* của rời rạc hóa thô, không phải hành vi của ODE liên tục (vốn luôn mượt). Bài học: giảm h để kiểm tra hội tụ.

📝 **Tóm tắt mục 5**: Euler xₙ₊₁ = xₙ + h·g(xₙ) rời rạc hóa ODE; với dN/dt=rN ra đúng mô hình L03. h nhỏ → bám liên tục; h lớn → sai số/mất ổn định giả.

---

## 6. Bài tập

**Bài 1.** Vi khuẩn tăng mũ r = 0.3/giờ, N₀ = 500. (a) N(5)? (b) Thời gian nhân đôi?

**Bài 2.** Logistic K = 2000, r = 0.4, N₀ = 200. (a) Viết N(t). (b) Khi nào N = 1000?

**Bài 3.** So sánh trong vài câu: vì sao logistic *rời rạc* (L03) có thể hỗn loạn còn logistic *liên tục* (bài này) thì không?

**Bài 4.** Bồn 200 L, ban đầu 0 kg muối; nước muối 1 kg/L vào 4 L/phút, trộn đều ra 4 L/phút. Lập và giải ODE cho S(t); tìm S khi t → ∞.

**Bài 5.** Áp Euler bước h = 0.5 cho dN/dt = 0.4N, N₀ = 100. Tính N sau 2 bước và so với nghiệm chính xác N(1) = 100e^(0.4).

---

## 7. Lời giải chi tiết

**Bài 1.** (a) N(5) = 500·e^(0.3·5) = 500·e^1.5 = 500·4.4817 ≈ **2241**. (b) t₂ = ln2/0.3 = 0.693/0.3 ≈ **2.31 giờ**.

**Bài 2.** (a) A = (2000−200)/200 = 9 → **N(t) = 2000/(1 + 9e^(−0.4t))**. (b) 1000 = 2000/(1+9e^(−0.4t)) → 1+9e^(−0.4t) = 2 → e^(−0.4t) = 1/9 → t = ln9/0.4 = 2.197/0.4 ≈ **5.49** (đây là điểm uốn N = K/2). Kiểm t=0: 2000/10 = 200 ✓.

**Bài 3.** Logistic rời rạc xₙ₊₁ = r·xₙ(1−xₙ) cập nhật theo *bước hữu hạn*: khi r lớn, một bước có thể *vọt lố* qua điểm cân bằng rồi nảy về, sinh dao động/chu kỳ/hỗn loạn. Logistic liên tục dN/dt = rN(1−N/K) thay đổi *từng khoảnh khắc vô cùng nhỏ*, không thể vọt lố — N chỉ tiến đơn điệu về K. Bản chất: rời rạc hóa thô (bước lớn) thêm động lực mới không có trong ODE gốc (đúng như cảnh báo Euler ở mục 5).

**Bài 4.** Vào: 1·4 = 4 kg/phút. Ra: (S/200)·4 = 0.02S. dS/dt = 4 − 0.02S. Cân bằng S* = 4/0.02 = 200. S(t) = 200 + (0 − 200)e^(−0.02t) = **200(1 − e^(−0.02t))**. Kiểm t=0: 0 ✓. **t → ∞: S → 200 kg** (= 1 kg/L × 200 L) ✓.

**Bài 5.** Euler: xₙ₊₁ = xₙ + 0.5·0.4·xₙ = xₙ·(1 + 0.2) = 1.2·xₙ. x₀ = 100 → x₁ = 120 → x₂ = 144. Nghiệm chính xác N(1) = 100·e^0.4 = 100·1.4918 ≈ **149.2**. Euler cho 144 (thấp hơn ~3.5%); giảm h sẽ sát hơn. (Lưu ý 1.2 chính là (1+hr) — đúng mô hình rời rạc L03.)

---

## 8. Bài tiếp theo

[Lesson 05 — Hệ tương tác (Lotka–Volterra, SIR)](../lesson-05-interacting-systems/): khi *nhiều* biến tác động lẫn nhau (thú–mồi, dịch bệnh), một ODE thành *hệ* ODE.

## 📝 Tổng kết

1. **ODE** mô tả qua dx/dt; dùng khi biến thiên liên tục. Rời rạc và liên tục gặp nhau khi bước → 0.
2. **Mũ** dN/dt = rN → N₀e^(rt); chỉ hợp giai đoạn đầu.
3. **Logistic** dN/dt = rN(1−N/K) → N = K/(1+Ae^(−rt)); chữ S, bão hòa ở K, *luôn mượt* (khác bản rời rạc).
4. **Nguội Newton & bể trộn**: ODE tuyến tính bậc 1, có cân bằng ổn định.
5. **Euler** xₙ₊₁ = xₙ + h·g(xₙ): mô phỏng ODE = phương trình sai phân; h quá lớn → sai số/mất ổn định giả.
`;
