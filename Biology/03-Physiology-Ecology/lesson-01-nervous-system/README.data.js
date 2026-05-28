// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Biology/03-Physiology-Ecology/lesson-01-nervous-system/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Hệ thần kinh

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Mô tả được cấu tạo của một **neuron (tế bào thần kinh)**: sợi nhánh (dendrite), thân (soma), sợi trục (axon), cúc tận cùng (terminal), bao myelin và eo Ranvier — và biết phần nào làm gì.
- Hiểu **điện thế nghỉ (resting potential ≈ −70 mV)** từ đâu mà có: vai trò của bơm Na⁺/K⁺ (3:2), gradient ion và kênh K⁺ rò.
- Vẽ và giải thích được **4 pha của điện thế hoạt động (action potential — AP)**: khử cực, peak, tái cực, tăng phân cực sau — kèm con số mV cụ thể.
- Hiểu nguyên lý **"tất cả hoặc không có gì" (all-or-nothing)** và vì sao cường độ kích thích lại được mã hóa bằng **tần số (frequency coding)**.
- So sánh tốc độ dẫn truyền giữa sợi có và không có **myelin** (saltatory conduction).
- Mô tả truyền tín hiệu qua **synapse (xi-náp)**: Ca²⁺ → bóng synaptic → chất dẫn truyền thần kinh (neurotransmitter) → kích thích hay ức chế tế bào sau.
- Tính được thời gian truyền xung qua một đoạn axon cho trước và áp dụng quy tắc bơm Na⁺/K⁺ để cân bằng số ion.

## Kiến thức tiền đề

- **Bơm Na⁺/K⁺ và gradient ion** đã được trình bày kỹ ở [\`Biology/01-Molecules-Cells/lesson-03-membrane-transport\`](../../01-Molecules-Cells/lesson-03-membrane-transport/). Bài này dùng lại nguyên tắc đó để giải thích vì sao trong neuron ngoài thì giàu Na⁺, trong thì giàu K⁺.
- **Bài liền trước trong lộ trình Tầng 2** (Genetics & Evolution): [\`Biology/02-Genetics-Evolution/lesson-08-speciation-phylogeny\`](../../02-Genetics-Evolution/lesson-08-speciation-phylogeny/) — kết thúc Tầng 2.
- Khái niệm **liên kết hydrogen** và phân cực phân tử nước — nhắc lại trong \`Chemistry/01-Structure/lesson-04-intermolecular-forces\` (giúp hiểu vì sao ion tan và di chuyển trong dịch tế bào).

---

## 1. Neuron — đơn vị truyền tin của hệ thần kinh

### 💡 Trực giác / Hình dung

Hãy hình dung neuron như một **dây điện sống có chân rễ**:

- Phần **rễ tủa ra** (dendrite) là antenna — nhận tín hiệu từ nhiều neuron khác.
- Phần **thân tròn** (soma) là "trung tâm xử lý" — quyết định có "bật đèn" hay không.
- Một **sợi dài** (axon) đi xa hàng chục cm đến cả mét — kéo tín hiệu đi đến đích.
- Đầu kia axon là **cúc tận cùng** — nhỏ giọt "chất truyền tin" sang neuron tiếp theo.

Khác với dây điện đồng (electron chạy), neuron truyền tín hiệu bằng **sóng đảo điện thế** chạy dọc màng — nhanh nhưng chậm hơn dây điện rất nhiều, đổi lại "rẻ" về năng lượng và có thể tự tái tạo.

### 1.1. Các phần của neuron

| Bộ phận | Vai trò |
|---------|---------|
| **Sợi nhánh (dendrite)** | Nhận tín hiệu vào (như "ăng-ten") |
| **Thân (soma / cell body)** | Chứa nhân, tổng hợp protein, cộng dồn tín hiệu |
| **Sợi trục (axon)** | Truyền điện thế hoạt động đi xa |
| **Bao myelin** | Lớp lipid quấn quanh axon, cách điện — giúp xung "nhảy" |
| **Eo Ranvier** | Khoảng hở giữa hai đoạn myelin — nơi xung tái tạo |
| **Cúc tận cùng (axon terminal)** | Giải phóng chất dẫn truyền thần kinh sang neuron sau |

### 1.2. Vì sao có bao myelin?

Myelin là **chuỗi tế bào Schwann** (ở thần kinh ngoại biên) hoặc **tế bào oligodendrocyte** (ở não, tủy) quấn nhiều vòng quanh axon, dày toàn lipid → cách điện rất tốt. Hệ quả: ion không qua được màng ở đoạn có myelin, nên điện thế hoạt động không tái tạo dọc theo mà **"nhảy"** từ eo Ranvier này sang eo kế tiếp — gọi là **dẫn truyền nhảy (saltatory conduction)**. Hiệu quả: tốc độ tăng gấp ~50–100 lần và tiêu thụ ít ATP hơn (ít vùng phải tái phân cực).

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Neuron có phân chia (mitosis) không?**
A: Phần lớn neuron **không phân chia** sau khi đã biệt hóa (khác hồng cầu hay tế bào da). Đó là lý do tổn thương não/tủy khó hồi phục. Một vài vùng đặc biệt (hippocampus, hành khứu) vẫn có neurogenesis ở mức hạn chế.

**Q: Bệnh đa xơ cứng (multiple sclerosis) có liên quan gì tới myelin?**
A: Có. Đa xơ cứng là bệnh tự miễn, hệ miễn dịch tấn công và phá bao myelin ở thần kinh trung ương → xung dẫn chậm hoặc tắc → yếu cơ, rối loạn cảm giác. Bệnh này cho thấy myelin **không phải tùy chọn** mà là yếu tố sống còn của hệ thần kinh có vú.

### 📝 Tóm tắt mục 1

- Neuron có 4 phần chính: dendrite (nhận) → soma (xử lý) → axon (truyền) → terminal (giải phóng chất truyền tin).
- Bao myelin (lipid) cách điện axon; eo Ranvier là khe hở giữa các đoạn myelin.
- Dẫn truyền nhảy ở axon myelin nhanh hơn ~50–100 lần so với axon trần.

---

## 2. Điện thế nghỉ — vì sao trong tế bào âm hơn ngoài?

### 💡 Trực giác / Hình dung

Hãy tưởng tượng màng neuron như **bức tường giữa 2 căn phòng**:

- Phòng ngoài (dịch ngoại bào): đông **Na⁺** (~145 mM), ít **K⁺** (~4 mM).
- Phòng trong (dịch nội bào): ít Na⁺ (~12 mM), đông **K⁺** (~140 mM), kèm rất nhiều anion protein âm bị "kẹt" bên trong.

Bức tường có vài cửa nhỏ luôn mở cho K⁺ rò ra (kênh K⁺ rò). K⁺ "lén" ra ngoài, mang theo điện tích dương → trong phòng âm dần. Cùng lúc, có "máy bơm" chủ động (bơm Na⁺/K⁺-ATPase) đẩy thêm Na⁺ ra và lôi K⁺ vào theo tỉ lệ **3 Na⁺ ra : 2 K⁺ vào / 1 ATP** — duy trì gradient và làm trong âm hơn ngoài thêm chút nữa.

Kết quả: ở trạng thái nghỉ, **trong neuron ≈ −70 mV so với ngoài**.

### 2.1. Bơm Na⁺/K⁺ và phương trình Nernst — giải thích từng phần

- **Bơm Na⁺/K⁺-ATPase** (xem lại Tầng 1 — Lesson 03 Vận chuyển qua màng): protein xuyên màng, mỗi chu kỳ thủy phân 1 ATP để bơm **3 Na⁺ ra ngoài** và **2 K⁺ vào trong**, ngược gradient. Đây là **vận chuyển chủ động (active transport)** — không có ATP thì hệ sập về cân bằng và neuron không còn dẫn được.
- **Kênh K⁺ rò (leak channel)**: luôn mở, K⁺ chảy theo gradient (trong cao → ra ngoài). Mỗi K⁺ ra mang theo điện tích dương → trong âm dần.
- **Phương trình Nernst** cho biết điện thế cân bằng nếu chỉ có 1 ion:
  - $E_K = 61 \\cdot \\log_{10}(4/140) \\approx -94$ mV.
  - $E_{Na} = 61 \\cdot \\log_{10}(145/12) \\approx +66$ mV.
- Vì màng nghỉ thấm K⁺ mạnh hơn Na⁺ ~25 lần, điện thế nghỉ thật **gần với $E_K$ hơn** → khoảng −70 mV (chứ không bằng đúng $E_K$ vì một ít Na⁺ vẫn rò vào kéo lên).

### 2.2. Bốn ví dụ số cụ thể

**Ví dụ 1 — Tỉ lệ bơm**: 1 phân tử ATP bơm 3 Na⁺ ra + 2 K⁺ vào. Sau 1 giây bơm hoạt động 100 chu kỳ → đã đẩy ra **300 Na⁺** và lôi vào **200 K⁺**, tốn **100 ATP**.

**Ví dụ 2 — Nồng độ điển hình của neuron có vú** (cần thuộc bằng đầu):

| Ion | Trong tế bào | Ngoài tế bào | Tỉ lệ ngoài/trong |
|-----|--------------|--------------|--------------------|
| Na⁺ | 12 mM | 145 mM | ~12 lần |
| K⁺  | 140 mM | 4 mM | ~0.029 lần (trong cao gấp 35 lần ngoài) |
| Cl⁻ | 7 mM | 110 mM | ~16 lần |
| Ca²⁺ | 0.0001 mM | 1.5 mM | ~15.000 lần |

**Ví dụ 3 — Tính $E_K$ bằng Nernst**: $E_K = 61 \\cdot \\log_{10}(4/140) = 61 \\cdot \\log_{10}(0.0286) = 61 \\cdot (-1.544) \\approx -94$ mV. Điện thế nghỉ thật là −70 mV → "lệch" khoảng 24 mV về phía dương do một ít Na⁺ rò vào.

**Ví dụ 4 — Năng lượng tiêu thụ của não**: Não tiêu ~20% năng lượng cơ thể chỉ để vận hành bơm Na⁺/K⁺ duy trì điện thế nghỉ. Bị ngưng cung cấp O₂/glucose vài phút → ATP cạn → bơm dừng → gradient sập → neuron chết.

### ⚠ Lỗi thường gặp

- **Nói "điện thế nghỉ là cân bằng"**: không phải cân bằng nhiệt động (equilibrium), mà là **trạng thái dừng (steady state)** — bơm và rò triệt tiêu nhau, tốn ATP liên tục. Tắt ATP là sập.
- **Nghĩ "K⁺ trong cao là vì điện tích âm hút"**: thực ra K⁺ trong cao là do **bơm Na⁺/K⁺ chủ động** bơm K⁺ vào; điện thế âm chỉ là **hệ quả** của K⁺ rò ra ngoài, không phải nguyên nhân.
- **Nhầm Cl⁻ là yếu tố chính của điện thế nghỉ**: ion chủ đạo là K⁺. Cl⁻ chỉ chỉnh tinh thêm.

### 🔁 Dừng lại tự kiểm tra

1. Một neuron tổng hợp ATP với tốc độ 2 × 10⁶ phân tử/giây. Nếu toàn bộ ATP đó dành cho bơm Na⁺/K⁺, bơm đẩy được bao nhiêu Na⁺ ra ngoài mỗi giây?
2. Nếu nồng độ K⁺ ngoài tăng từ 4 mM lên 10 mM (rò ra do tổn thương mô), $E_K$ thay đổi thế nào? Điện thế nghỉ trở nên âm hơn hay bớt âm?

<details>
<summary>Đáp án</summary>

1. Mỗi ATP bơm 3 Na⁺ → 2 × 10⁶ ATP/s × 3 = **6 × 10⁶ Na⁺/giây**.
2. $E_K = 61 \\cdot \\log_{10}(10/140) = 61 \\cdot \\log_{10}(0.0714) = 61 \\cdot (-1.146) \\approx -70$ mV (từ −94 mV trước đó). $E_K$ **bớt âm** đi. Điện thế nghỉ cũng bớt âm (depolarize một phần) → neuron dễ phát AP hơn → kích thích quá mức, đó là cơ chế gây co giật khi tổn thương mô làm K⁺ ngoại bào tăng.
</details>

### 📝 Tóm tắt mục 2

- Điện thế nghỉ ≈ **−70 mV** (trong âm hơn ngoài).
- Bơm Na⁺/K⁺-ATPase: 3 Na⁺ ra : 2 K⁺ vào / 1 ATP — duy trì gradient.
- Kênh K⁺ rò để K⁺ chảy ra → âm hóa trong tế bào; điện thế nghỉ ≈ $E_K$ (theo Nernst).
- Đây là trạng thái dừng tốn ATP, không phải cân bằng thật.

---

## 3. Điện thế hoạt động — sóng đảo điện thế

### 💡 Trực giác / Hình dung

Hãy hình dung điện thế hoạt động (action potential — AP) như **một chuỗi domino**:

- Trạng thái nghỉ: hàng quân domino dựng đứng, mọi cánh cửa Na⁺ đều đóng.
- Một tác động đủ mạnh đẩy ngã viên đầu tiên → loạt cửa Na⁺ ở vùng đó bật mở → Na⁺ ÀO vào → đảo điện thế.
- Vùng kế tiếp cảm nhận sự đảo này → kích hoạt mở Na⁺ tiếp → AP "lan" như sóng.
- Sau khi Na⁺ "phá", cửa K⁺ mở chậm hơn để "dọn dẹp" → K⁺ ra → trở về âm.
- Vùng vừa cháy có giai đoạn "trơ" (refractory) — đẩy không ngã ngay, đảm bảo sóng chỉ chạy 1 chiều, không quay lại.

### 3.1. Bốn pha của AP

| Pha | Cơ chế | Điện thế |
|-----|--------|----------|
| **(0) Nghỉ** | Bơm + K⁺ rò duy trì | ≈ −70 mV |
| **(1) Khử cực (depolarization)** | Kích thích đẩy vượt ngưỡng → kênh Na⁺ phụ thuộc điện áp mở → Na⁺ ào vào | từ −70 → +30 mV |
| **(2) Peak** | Đỉnh, Na⁺ ngừng vào (kênh tự đóng) | ≈ +30 mV |
| **(3) Tái cực (repolarization)** | Kênh K⁺ phụ thuộc điện áp mở → K⁺ ra | từ +30 → −70 mV |
| **(4) Tăng phân cực sau (hyperpolarization)** | K⁺ ra hơi quá → âm sâu hơn nghỉ | ≈ −80 mV |
| **(5) Trở về nghỉ** | Bơm Na/K + đóng kênh K⁺ | về −70 mV |

**Ngưỡng (threshold)** ≈ **−55 mV**: nếu kích thích đẩy đến đây thì AP bùng nổ; chưa tới thì im, dù sát ngưỡng cũng vô tác dụng. Đây là cơ sở của nguyên lý **all-or-nothing**.

### 3.2. All-or-nothing và frequency coding

- **All-or-nothing**: AP đã phát thì biên độ luôn cố định (~100 mV peak-to-peak, từ −70 đến +30). Kích thích mạnh hơn không cho AP "to" hơn.
- **Mã hóa thông tin bằng tần số (frequency coding)**: kích thích mạnh → neuron phát AP với tần số cao hơn (vd 100 AP/s thay vì 10 AP/s). Não đo "mạnh nhẹ" bằng số AP/giây, không đo "biên độ".
- **Giới hạn tần số** ở mức ~1.000 AP/s vì giai đoạn trơ tuyệt đối (~1 ms): trong 1 ms ngay sau khi phát, neuron không thể phát tiếp dù kích thích mạnh đến đâu (kênh Na⁺ bị "khóa cứng").

### 3.3. Bốn ví dụ số cụ thể

**Ví dụ 1 — Tổng dao động điện thế**: từ −70 (nghỉ) qua −55 (ngưỡng) lên +30 (peak), về −80 (hyperpolarize), trở −70. Biên độ peak-to-peak = +30 − (−70) = **100 mV**. Khử cực qua ngưỡng = −55 − (−70) = chỉ **15 mV** là đủ kích hoạt.

**Ví dụ 2 — Thời gian 1 AP**: pha khử cực ~0.5 ms, peak ~0.5 ms, tái cực ~1 ms, hyperpolarize ~1–2 ms. Toàn bộ ~**3–4 ms**.

**Ví dụ 3 — Đếm AP cho 1 kích thích mạnh kéo dài 100 ms**: nếu thần kinh phát đều mỗi 5 ms một AP → 100/5 = **20 AP**. Nếu kích thích yếu chỉ phát đều mỗi 25 ms → 100/25 = **4 AP**. Khác biệt 20 vs 4 là cách não cảm nhận "mạnh vs yếu".

**Ví dụ 4 — Số ion Na⁺ thực vào trong 1 AP**: với 1 cm² màng axon, chỉ khoảng **10⁻¹² mol Na⁺/cm²** vào để gây AP — quá nhỏ để thay đổi nồng độ trong (giữ ~12 mM gần như nguyên). Bơm Na⁺/K⁺ chỉ cần "lau" lại lượng nhỏ này → 1 neuron có thể phát hàng triệu AP trước khi gradient cạn.

### ⚠ Lỗi thường gặp

- **Nghĩ "kích thích mạnh → AP biên độ to"**: SAI. Biên độ AP cố định. Kích thích mạnh chỉ làm AP **dày hơn** (tần số cao).
- **Nhầm kênh Na⁺ rò với kênh Na⁺ phụ thuộc điện áp**: kênh rò ít, luôn mở (đóng góp duy trì nghỉ); kênh phụ thuộc điện áp đóng kín lúc nghỉ và mở rất nhanh khi vượt ngưỡng (nguồn chính của AP).
- **Cho rằng AP tự khởi phát**: phải có kích thích đủ vượt ngưỡng. Dưới ngưỡng = im, không tích lũy.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao AP chỉ chạy 1 chiều dọc axon?**
A: Vì vùng vừa phát AP đang trong **giai đoạn trơ tuyệt đối** — kênh Na⁺ ở trạng thái "khóa cứng" trong ~1 ms, không thể mở lại dù điện áp đến. Sóng chỉ tiến về phía vùng chưa cháy, không quay ngược.

**Q: Vì sao đỉnh là +30 mV chứ không phải $E_{Na}$ = +66 mV?**
A: Vì kênh Na⁺ chỉ mở thoáng qua (~0.5 ms) rồi tự đóng, đồng thời kênh K⁺ đã bắt đầu mở — chưa đủ thời gian để điện thế chạm $E_{Na}$ thì đã bị K⁺ kéo xuống.

### 🔁 Dừng lại tự kiểm tra

1. Một kích thích đẩy màng từ −70 mV lên −60 mV rồi tan đi. Có AP không?
2. Hai kích thích lần lượt vào sợi axon cách nhau 0.5 ms. Cái thứ hai có gây AP được không?

<details>
<summary>Đáp án</summary>

1. **Không**. −60 mV vẫn dưới ngưỡng −55 mV → kênh Na⁺ phụ thuộc điện áp không mở đủ → không có "cơn bão" Na⁺ vào → màng tự về −70.
2. **Không**. Cái đầu tiên gây AP đã đẩy neuron vào giai đoạn trơ tuyệt đối ~1 ms. Cái thứ hai (0.5 ms sau) gặp kênh Na⁺ vẫn khóa cứng → không phát. Phải chờ ≥1 ms thì kích thích thứ hai mới có cơ hội.
</details>

### 📝 Tóm tắt mục 3

- AP có 4 pha: khử cực → peak (+30) → tái cực → hyperpolarize (−80) → về nghỉ.
- Ngưỡng = −55 mV. Vượt ngưỡng → AP bùng nổ (all-or-nothing); chưa tới → im.
- Biên độ AP cố định (~100 mV); cường độ kích thích mã hóa bằng **tần số AP**.
- Mỗi AP kéo ~3 ms; tần số tối đa ~1.000 AP/s do giai đoạn trơ.

---

## 4. Dẫn truyền dọc axon — vì sao myelin nhanh hơn

### 💡 Trực giác / Hình dung

So sánh hai dây dẫn:

- **Axon trần** (không myelin) như chạy bộ — sóng đảo điện thế phải tái tạo liên tục dọc theo từng mm. Chậm và tốn ATP.
- **Axon có myelin** như nhảy từng bước dài — sóng "nhảy" từ eo Ranvier này sang eo kế tiếp, bỏ qua đoạn myelin được cách điện. Nhanh và đỡ tốn ATP (chỉ vùng eo phải tái phân cực).

### 4.1. Tốc độ điển hình

| Loại sợi | Đường kính | Có myelin? | Tốc độ |
|----------|------------|------------|--------|
| Axon trần nhỏ (C fiber, cảm giác đau âm ỉ) | ~1 µm | Không | ~1 m/s |
| Axon trần lớn | ~5 µm | Không | ~2 m/s |
| Axon myelin trung (cảm giác sờ chạm) | ~5 µm | Có | ~30 m/s |
| Axon myelin lớn (vận động, phản xạ nhanh) | ~15 µm | Có | ~100 m/s |
| Axon mực ống (squid giant axon — kinh điển trong sinh lý) | ~500 µm | Không | ~25 m/s |

Mực ống "ăn gian" bằng đường kính khổng lồ thay vì myelin — cũng đạt tốc độ kha khá nhưng tốn vật chất. Tiến hóa có myelin (động vật có xương sống) là giải pháp gọn hơn.

### 4.2. Bốn ví dụ số

**Ví dụ 1**: Một axon dài 1 m, tốc độ 100 m/s. Thời gian xung đi từ tủy sống xuống ngón chân = 1/100 = **10 ms**. Đây là lý do phản xạ rút chân khỏi gai mất chỉ ~50 ms (xung lên tủy + qua synapse + về cơ ~5 lần thời gian này).

**Ví dụ 2**: Axon trần 0.5 m, tốc độ 1 m/s. Thời gian = **500 ms (0.5 giây)** — chậm hơn 50 lần so với có myelin. Vì sao cảm giác đau âm ỉ "đến chậm": nó đi qua sợi C trần.

**Ví dụ 3**: Đường kính axon ×2 → tiết diện ×4, điện trở dọc trục ÷4. Lý thuyết cáp cho biết tốc độ axon trần tăng ~$\\sqrt{4} = 2$ lần. Tăng đường kính là cách thô nhưng hiệu quả của loài không có myelin (mực ống).

**Ví dụ 4**: Một axon myelin dài 1 mét, có 1.000 eo Ranvier (khoảng cách giữa các eo ~1 mm). Mỗi "nhảy" mất ~10 µs. Tổng thời gian = 1.000 × 10 µs = **10 ms** — khớp với tốc độ 100 m/s.

### ⚠ Lỗi thường gặp

- **Nghĩ "myelin truyền điện thay axon"**: sai. Myelin chỉ **cách điện**, không dẫn điện. AP vẫn được tạo ở axon, chỉ là tái tạo cách quãng tại eo Ranvier.
- **Nhầm "nhảy" có nghĩa là không cần ion vào ra**: ở mỗi eo Ranvier vẫn có Na⁺ vào, K⁺ ra như AP bình thường — chỉ là **bỏ qua các vùng giữa**.

### 📝 Tóm tắt mục 4

- Axon trần: AP tái tạo dọc theo, ~1–2 m/s.
- Axon myelin: dẫn truyền nhảy (saltatory) — AP "nhảy" từ eo Ranvier này sang eo kế, ~30–100 m/s.
- Tăng tốc nhờ myelin = cách điện đoạn giữa, chỉ tái tạo ở eo → nhanh + tiết kiệm ATP.

---

## 5. Synapse — truyền tín hiệu giữa các neuron

### 💡 Trực giác / Hình dung

Khi AP đến cuối axon, nó **không nhảy** sang neuron sau qua "tiếp xúc điện". Vì sao? Vì có **khe synapse** rộng ~20 nm chia tách hai tế bào.

Cơ chế truyền: AP biến thành **tín hiệu hóa học** (chất dẫn truyền thần kinh — neurotransmitter) đi qua khe, rồi neuron sau biến tín hiệu hóa học đó trở lại thành **tín hiệu điện**. Giống như một người gửi thư qua bưu điện thay vì hét sang: chậm hơn vài ms nhưng có thể điều biến tinh vi (kích thích, ức chế, khuếch đại, ức chế chậm…).

### 5.1. Quy trình 5 bước

1. **AP tới cúc tận cùng** (axon terminal).
2. **Khử cực mở kênh Ca²⁺ phụ thuộc điện áp** → Ca²⁺ ngoài (~1.5 mM) tràn vào (Ca²⁺ trong rất thấp ~0.0001 mM → gradient cực lớn).
3. Ca²⁺ kích hoạt **bóng synaptic (synaptic vesicle)** gắn vào màng → giải phóng chất dẫn truyền thần kinh vào khe synapse (exocytosis).
4. Chất dẫn truyền khuếch tán qua khe (~20 nm, mất < 1 ms) và **gắn vào receptor** ở màng sau synapse.
5. Receptor mở kênh ion:
   - **Kích thích (excitatory)**: mở Na⁺ → tế bào sau khử cực → có thể vượt ngưỡng và phát AP. EPSP (excitatory postsynaptic potential).
   - **Ức chế (inhibitory)**: mở Cl⁻ hoặc K⁺ → tế bào sau bị âm hơn → khó vượt ngưỡng. IPSP.
6. (Dọn dẹp) chất dẫn truyền được tái hấp thu, phân hủy hoặc khuếch tán đi.

### 5.2. Bảng chất dẫn truyền thần kinh chính

| Chất | Tác dụng | Nơi điển hình |
|------|----------|---------------|
| Acetylcholine (ACh) | Kích thích cơ vân; điều biến ở não | Tiếp hợp thần kinh-cơ, hạch tự chủ |
| Glutamate | Kích thích chính ở não | Vỏ não, hippocampus |
| GABA | Ức chế chính ở não | Khắp não |
| Dopamine | Điều biến (thưởng, vận động) | Substantia nigra, VTA |
| Serotonin | Điều biến (tâm trạng, giấc ngủ) | Raphe nuclei |
| Norepinephrine | Kích thích thức tỉnh; phản xạ chiến/chạy | Locus coeruleus, hạch giao cảm |

### 5.3. Tổng hợp tín hiệu (summation)

Một neuron điển hình ở não nhận **~10.000 synapse**. Tế bào sau **cộng dồn** các EPSP và IPSP:

- **Spatial summation (cộng theo không gian)**: nhiều synapse khác nhau cùng kích thích tại 1 thời điểm → EPSP cộng lại.
- **Temporal summation (cộng theo thời gian)**: 1 synapse phát liên tục → EPSP nối tiếp xếp chồng.

Khi tổng các EPSP − IPSP ≥ 15 mV (đẩy soma từ −70 vượt −55) thì axon hill phát AP. Đây là **"phép tính"** căn bản của neuron.

### 5.4. Bốn ví dụ số cụ thể

**Ví dụ 1 — Độ rộng khe synapse**: ~20 nm. Tốc độ khuếch tán phân tử nhỏ trong dung dịch ~10 µm²/ms → thời gian qua khe ~ $(0.02)^2 / 10 \\approx 4 \\times 10^{-5}$ ms — gần như tức thời. Trễ tổng cộng của synapse (~0.5 ms) chủ yếu do bước phóng thích Ca²⁺ và hợp nhất bóng.

**Ví dụ 2 — Cộng EPSP**: 10 synapse cùng phát, mỗi cái gây EPSP +2 mV ở soma. Tổng = +20 mV. Đẩy từ −70 lên −50 → vượt ngưỡng (−55) → phát AP.

**Ví dụ 3 — Ức chế làm hỏng cộng**: cùng 10 EPSP (+20 mV), nhưng có 3 synapse ức chế gây IPSP tổng −10 mV. Tổng thực = +10 mV. Đẩy lên −60 → chưa tới ngưỡng → **không phát AP**.

**Ví dụ 4 — Receptor ACh ở cơ vân**: 1 cúc tận cùng tiết ~10.000 phân tử ACh mỗi AP, mở ~2.000 kênh Na⁺ ở cơ vân → khử cực mạnh tới gây co cơ. Thuốc curare chặn receptor ACh ở cơ → liệt cơ (cơ chế thuốc tê liệt cổ điển).

### ⚠ Lỗi thường gặp

- **Coi mọi synapse là kích thích**: nhiều synapse là ức chế (GABA, glycine). Não cần cân bằng kích thích/ức chế; lệch về kích thích quá → co giật; lệch về ức chế quá → mất ý thức.
- **Nghĩ "chất nào cũng kích thích"**: tác dụng phụ thuộc **receptor**, không phải chất. Cùng ACh: kích thích cơ vân (qua receptor nicotinic) nhưng làm chậm tim (qua receptor muscarinic).
- **Bỏ qua bước Ca²⁺**: không có Ca²⁺ vào → không phóng thích → synapse "im". Đó là lý do thuốc chặn kênh Ca²⁺ làm giảm tín hiệu thần kinh-cơ.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Cùng 1 neuron có thể tiết nhiều chất dẫn truyền không?**
A: Có. Nguyên tắc cổ điển "1 neuron — 1 chất" (Dale) ngày nay được biết là gần đúng: nhiều neuron cùng tiết 1 chất chính + 1–2 chất điều biến (neuropeptide) cùng lúc.

**Q: Cocain, ma túy hoạt động ở đâu trong sơ đồ này?**
A: Phần lớn ở **bước dọn dẹp (5–6)**. Cocain chặn protein tái hấp thu dopamine → dopamine tồn tại lâu trong khe → kích thích kéo dài bất thường → cảm giác hưng phấn, sau đó kiệt quệ. SSRI điều trị trầm cảm cũng theo cơ chế chặn tái hấp thu, nhưng cho serotonin.

### 🔁 Dừng lại tự kiểm tra

1. Một neuron nhận đồng thời 8 EPSP (+2 mV mỗi cái) và 2 IPSP (−3 mV mỗi cái). Có phát AP không? (Ngưỡng −55, nghỉ −70.)
2. Vì sao thuốc tê novocain (chặn kênh Na⁺ phụ thuộc điện áp) làm bạn không cảm thấy đau khi nhổ răng?

<details>
<summary>Đáp án</summary>

1. Tổng EPSP = 8 × 2 = +16 mV; tổng IPSP = 2 × (−3) = −6 mV. Tổng thực = +10 mV. Soma đẩy từ −70 lên −60 mV. Ngưỡng −55 → **chưa đến** → **không phát AP**.
2. Novocain bám vào kênh Na⁺ phụ thuộc điện áp ở axon cảm giác, giữ chúng đóng. Khi mô bị kích thích, không có Na⁺ ào vào → không có AP → không có tín hiệu đau truyền lên não. Tế bào vẫn sống, vẫn duy trì điện thế nghỉ (do bơm + kênh K⁺), chỉ là không phát AP được trong vài giờ.
</details>

### 📝 Tóm tắt mục 5

- Synapse = chuyển tín hiệu điện → hóa → điện qua khe ~20 nm.
- AP → Ca²⁺ vào cúc tận cùng → bóng phóng thích chất dẫn truyền → receptor mở kênh ion ở tế bào sau.
- Kích thích (EPSP, mở Na⁺) vs ức chế (IPSP, mở Cl⁻/K⁺). Neuron sau cộng dồn theo không gian + thời gian.
- Ngộ độc / thuốc đa số tác động vào synapse: chặn kênh Ca²⁺/Na⁺, chặn receptor, hoặc chặn tái hấp thu.

---

## 6. Bảng tổng hợp & sơ đồ tổng

| Hiện tượng | Cơ chế chính | Số liệu chốt |
|------------|--------------|--------------|
| Điện thế nghỉ | Bơm Na/K + kênh K⁺ rò | **−70 mV** |
| Ngưỡng kích hoạt | Đạt mức kênh Na⁺ phụ thuộc điện áp mở | **−55 mV** |
| Peak AP | Na⁺ ào vào | **+30 mV** |
| Hyperpolarization | K⁺ ra quá đà | **−80 mV** |
| Bơm Na/K | 1 ATP | **3 Na⁺ ra : 2 K⁺ vào** |
| Tốc độ axon trần | Tái tạo liên tục | **1–2 m/s** |
| Tốc độ axon myelin | Dẫn truyền nhảy | **30–100 m/s** |
| Khe synapse | Khoảng giữa neuron | **~20 nm** |
| Trễ qua synapse | Phóng thích Ca²⁺ + bóng | **~0.5 ms** |
| Synapse / neuron não | Tổng hợp tín hiệu | **~10.000** |

---

## 7. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**. Cho neuron điển hình: nồng độ K⁺ trong = 140 mM, ngoài = 4 mM. Tính $E_K$ bằng Nernst ($E = 61 \\log_{10}(\\text{ngoài}/\\text{trong})$ mV). So sánh với điện thế nghỉ thật −70 mV và giải thích sai lệch.

**Bài 2**. Bơm Na⁺/K⁺ của 1 neuron hoạt động 5 × 10⁵ chu kỳ/giây. (a) Bơm đẩy bao nhiêu Na⁺ ra ngoài/giây? (b) Lôi bao nhiêu K⁺ vào trong/giây? (c) Tiêu thụ bao nhiêu ATP/giây?

**Bài 3**. Một axon vận động dài 0.9 m, có myelin, tốc độ dẫn 100 m/s. Một axon cảm giác đau âm ỉ dài 0.9 m, sợi C trần, tốc độ 1 m/s. (a) So sánh thời gian xung đi từ chân lên tủy sống. (b) Vì sao tự nhiên chọn sợi nhanh cho phản xạ vận động nhưng sợi chậm cho đau âm ỉ?

**Bài 4**. Một neuron có ngưỡng −55 mV và điện thế nghỉ −70 mV. Nó nhận đồng thời: 12 synapse kích thích (mỗi EPSP +1.5 mV) và 4 synapse ức chế (mỗi IPSP −2 mV). (a) Tổng độ lệch khỏi điện thế nghỉ là bao nhiêu? (b) Có phát AP không?

**Bài 5**. Trong 1 giây, 1 neuron phát 50 AP. Giai đoạn trơ tuyệt đối là 1 ms. (a) Tổng thời gian "trơ" trong 1 giây là bao nhiêu? (b) Tần số AP tối đa nếu giai đoạn trơ là 1 ms?

**Bài 6**. Bệnh nhân đa xơ cứng (multiple sclerosis) bị mất myelin ở một đoạn axon vận động dài 30 cm. Trước bệnh: tốc độ 100 m/s. Sau bệnh: đoạn mất myelin chuyển thành dẫn truyền liên tục với tốc độ 2 m/s, đoạn còn nguyên myelin vẫn 100 m/s. Trên tổng axon dài 1 m: tính thời gian truyền trước và sau bệnh, từ đó suy ra giảm bao nhiêu phần trăm tốc độ.

### Lời giải chi tiết

**Bài 1**.

- $E_K = 61 \\cdot \\log_{10}(4/140) = 61 \\cdot \\log_{10}(0.02857) = 61 \\cdot (-1.544) \\approx \\mathbf{-94}$ **mV**.
- Điện thế nghỉ thật là −70 mV, "lệch" về phía dương khoảng 24 mV so với $E_K$.
- Vì sao? Vì màng không chỉ thấm K⁺ — vẫn có một ít Na⁺ rò vào qua kênh Na⁺ rò ($E_{Na} \\approx +66$ mV kéo điện thế lên), và có một ít Cl⁻. Tỉ lệ thấm khoảng $P_K : P_{Na} : P_{Cl} = 1 : 0.04 : 0.45$ ở neuron nghỉ. Phương trình Goldman cho ra trị xấp xỉ −70 mV. K⁺ vẫn chiếm ưu thế, nhưng không độc tôn → lệch khỏi $E_K$ thuần túy.

**Bài 2**.

- 1 chu kỳ bơm = 3 Na⁺ ra + 2 K⁺ vào + 1 ATP thủy phân.
- (a) Na⁺ ra = 5 × 10⁵ × 3 = **1.5 × 10⁶ Na⁺/giây**.
- (b) K⁺ vào = 5 × 10⁵ × 2 = **1.0 × 10⁶ K⁺/giây**.
- (c) ATP tiêu thụ = **5 × 10⁵ ATP/giây**.

**Bài 3**.

- Thời gian axon myelin = 0.9 / 100 = **0.009 s = 9 ms**.
- Thời gian axon trần = 0.9 / 1 = **0.9 s = 900 ms**.
- Khác biệt 100 lần. Phản xạ vận động cần nhanh (giật chân khỏi gai, dưới 100 ms cả vòng cung) → tự nhiên trang bị myelin cho cả sợi cảm giác cấp tính và vận động. Đau âm ỉ là tín hiệu "có tổn thương kéo dài" — chậm vài giây cũng không hại, đỡ tốn vật chất và năng lượng tạo myelin → tự nhiên giữ ở dạng sợi C trần. Đó là lý do bạn rút tay khỏi nồi nóng *trước* khi cảm nhận được cái đau bỏng.

**Bài 4**.

- Tổng EPSP = 12 × 1.5 = +18 mV.
- Tổng IPSP = 4 × (−2) = −8 mV.
- (a) Tổng độ lệch = +18 − 8 = **+10 mV**. Soma đẩy từ −70 lên −60 mV.
- (b) Ngưỡng = −55 mV. Hiện tại −60 mV vẫn dưới ngưỡng (cần lên −55). **Không phát AP**. Cần thêm 5 mV nữa (3–4 EPSP khác hoặc giảm bớt 2–3 IPSP) là vượt ngưỡng.

**Bài 5**.

- (a) 50 AP × 1 ms (trơ tuyệt đối) = **50 ms** trong tổng 1.000 ms → 5% thời gian là trơ. Còn 950 ms vẫn "rảnh", chia trung bình 950/50 = 19 ms giữa các AP.
- (b) Nếu kích thích vô cùng mạnh, neuron phát AP ngay khi vừa thoát trơ → cứ 1 ms 1 AP → **tần số tối đa = 1.000 AP/giây**. Thực tế nhiều neuron khó đạt mức này vì còn giai đoạn trơ tương đối; tối đa thực tế ~500–800 AP/s là phổ biến.

**Bài 6**.

- Trước bệnh: cả 1 m đều myelin 100 m/s → $t_0 = 1/100 = \\mathbf{10}$ **ms**.
- Sau bệnh: 30 cm mất myelin (tốc 2 m/s), 70 cm còn myelin (tốc 100 m/s).
  - Thời gian đoạn mất = 0.3 / 2 = 150 ms.
  - Thời gian đoạn còn myelin = 0.7 / 100 = 7 ms.
  - Tổng $t_1 = 150 + 7 = \\mathbf{157}$ **ms**.
- Chậm hơn $157/10 = 15.7$ lần. Hoặc nhìn theo "tốc độ trung bình" sau bệnh = 1 m / 0.157 s ≈ **6.4 m/s** → giảm $(100 − 6.4)/100 ≈ \\mathbf{94\\%}$ tốc độ. Mất myelin chỉ trên 30% chiều dài đã gần như phá toàn bộ chức năng — minh họa vì sao đa xơ cứng gây tàn phế nặng dù tổn thương "chỉ là" lớp vỏ.

---

## 8. Liên kết và bài tiếp theo

- **Bài tiếp theo trong Tầng 3**: [Lesson 02 — Tuần hoàn & hô hấp](../lesson-02-circulation-respiration/) — máu mang O₂ và glucose nuôi đám neuron tham ăn này, đặc biệt là não tiêu 20% năng lượng cơ thể.
- **Tiền đề trực tiếp**: [\`Biology/01-Molecules-Cells/lesson-03-membrane-transport\`](../../01-Molecules-Cells/lesson-03-membrane-transport/) — bơm Na/K, gradient, vận chuyển chủ động/thụ động.
- **Bài liền trước trên lộ trình**: [\`Biology/02-Genetics-Evolution/lesson-08-speciation-phylogeny\`](../../02-Genetics-Evolution/lesson-08-speciation-phylogeny/) — kết thúc Tầng 2.
- **Sẽ gặp lại**:
  - Lesson 04 (cùng tầng) — hệ nội tiết và homeostasis: hormone bổ sung cho hệ thần kinh ở mức độ chậm-bền.
  - Lesson 03 (cùng tầng) — hệ miễn dịch: cũng dùng truyền tin hóa học (cytokine).
- **Liên hệ Chemistry**:
  - \`Chemistry/01-Structure/lesson-04-intermolecular-forces\` — vì sao ion tan trong nước (cần thiết để Na⁺, K⁺ tự do qua lại).
  - \`Chemistry/03-Quantitative\` — phương trình Nernst dùng log10 (xem khoá nhiệt động học).

---

## 📝 Tổng kết Lesson 01

1. **Neuron** có dendrite (nhận) → soma (cộng dồn) → axon (truyền xa) → terminal (giải phóng chất truyền tin). Bao myelin (lipid) cách điện, eo Ranvier là điểm "nhảy".
2. **Điện thế nghỉ ≈ −70 mV** do bơm Na/K (3:2 / 1 ATP) + kênh K⁺ rò. Là trạng thái dừng tốn ATP, không phải cân bằng.
3. **Action potential** có 4 pha: khử cực → peak +30 mV → tái cực → hyperpolarize −80 mV → về nghỉ. Ngưỡng −55 mV; nguyên lý **all-or-nothing**; thông tin mã hóa bằng **tần số** (frequency coding); giới hạn ~1.000 AP/s.
4. **Tốc độ dẫn truyền**: axon trần 1–2 m/s; axon myelin 30–100 m/s nhờ **dẫn truyền nhảy** (saltatory). Mất myelin (đa xơ cứng) gây tàn phế.
5. **Synapse**: AP → Ca²⁺ vào → bóng phóng thích chất dẫn truyền → receptor mở kênh ion ở tế bào sau. Kích thích (EPSP) vs ức chế (IPSP), neuron sau cộng dồn theo không gian + thời gian; vượt ngưỡng thì phát AP.
6. Phần lớn thuốc thần kinh (gây tê, hưng phấn, an thần, chống trầm cảm) tác động vào **synapse** — chặn kênh Na/Ca, chặn receptor, hoặc chặn tái hấp thu chất dẫn truyền.

**Tiếp theo**: [Lesson 02 — Tuần hoàn & hô hấp](../lesson-02-circulation-respiration/)
`;
