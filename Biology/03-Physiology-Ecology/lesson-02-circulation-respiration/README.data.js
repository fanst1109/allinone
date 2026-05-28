// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Biology/03-Physiology-Ecology/lesson-02-circulation-respiration/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 — Tuần hoàn & hô hấp

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao cơ thể cần hệ tuần hoàn (circulatory system) và hô hấp (respiratory system)**, và vì sao chúng phối hợp chặt chẽ — không thể tách rời.
- Mô tả được **cấu tạo tim 4 ngăn** ở người (2 tâm nhĩ atrium + 2 tâm thất ventricle), vai trò các loại **van (valve)**, và **chu kỳ tim (cardiac cycle)**: tâm trương (diastole) ↔ tâm thu (systole).
- Phân biệt **vòng tuần hoàn nhỏ (pulmonary, qua phổi)** và **vòng tuần hoàn lớn (systemic, toàn thân)**, kể cả "nghịch lý" động mạch phổi mang máu nghèo O₂.
- Tính được **cung lượng tim (cardiac output) = nhịp tim × stroke volume** trong các tình huống nghỉ và vận động — cho ≥ 4 ví dụ số.
- Giải thích **trao đổi khí (gas exchange)** ở phế nang (alveolus) và mô bằng **gradient áp suất riêng phần** (partial pressure).
- Hiểu **đường cong bão hòa O₂ của hemoglobin (Hb)** có dạng sigmoid là do **hợp tác (cooperativity)** giữa 4 vị trí gắn — và **hiệu ứng Bohr (Bohr effect)**: pH thấp / CO₂ cao → Hb thả O₂ dễ hơn ở mô đang hoạt động.

## Kiến thức tiền đề

- **Vì sao tế bào cần O₂ và phải thải CO₂** — \`Biology/01-Molecules-Cells/lesson-05-cellular-respiration/\`. Tóm tắt: glucose + O₂ → CO₂ + H₂O + ATP. Không có O₂ → tế bào không sinh đủ ATP; không thải CO₂ → CO₂ tích lại làm pH máu giảm (acid hóa).
- **Hemoglobin là protein bậc 4** — \`Biology/01-Molecules-Cells/lesson-01-biomolecules/\` (mục Protein, §4). Tóm tắt: 4 chuỗi polypeptide (2 α + 2 β) + 4 nhóm heme (mỗi nhóm chứa 1 ion Fe²⁺ gắn được 1 O₂).
- Bài liền kề: \`lesson-01-nervous-system/\` (hệ thần kinh điều khiển nhịp tim và nhịp thở qua hành não — tham chiếu nhẹ ở §6).

---

## 1. Vì sao cần tuần hoàn và hô hấp?

### 💡 Trực giác / Hình dung

Hãy hình dung cơ thể như một **thành phố vài chục nghìn tỷ "ngôi nhà"** (tế bào). Mỗi ngôi nhà cần đốt "than" (glucose) để sản xuất điện (ATP) — đốt than cần khí oxy, và thải ra khói CO₂. Nhưng nhà nào nằm sâu trong thành phố — cách "biên giới" (phổi) cả mét — không thể tự đi lấy O₂ và đổ CO₂ ra ngoài. Cần **đường ống dẫn** (mạch máu) + **xe tải chở khí** (hồng cầu với Hb) + **trạm bơm trung tâm** (tim) liên tục đẩy "xe tải" đi vòng.

Hai hệ này luôn đi đôi: **hô hấp** mở "cửa khẩu" cho O₂ vào, CO₂ ra; **tuần hoàn** phân phối O₂ tới mọi mô và gom CO₂ về phổi. Thiếu 1 trong 2 → ngạt và chết trong vài phút.

### 1.1. Vai trò chi tiết

| Hệ | Lấy / Đưa vào | Thải / Lấy ra | Đối tác |
|----|----------------|-----------------|---------|
| Hô hấp | O₂ (từ khí trời) | CO₂ (ra khí trời) | máu ở mao mạch phổi |
| Tuần hoàn | O₂ + dinh dưỡng + hormone (tới mô) | CO₂ + chất thải (về phổi & thận) | mọi tế bào trong cơ thể |

### 1.2. Vì sao phải bơm — khuếch tán đơn thuần không đủ

Khuếch tán (diffusion) chỉ hiệu quả trên quãng đường rất ngắn (mức **mili-mét**). Một sinh vật đơn bào (vi khuẩn ~1 μm) hoặc nhiều bào (sứa mỏng 2 lớp tế bào) có thể "thở" qua bề mặt. Nhưng cơ thể người dày tới **vài chục cm** — tế bào sâu trong cơ chân cách phổi cả mét. Tốc độ khuếch tán giảm theo bình phương khoảng cách (định luật Fick) → đi 1 m chậm hơn đi 1 mm cả **triệu lần**. Phải có **dòng chảy ép buộc (bulk flow)** do tim bơm để vận chuyển nhanh trên quãng dài; khuếch tán chỉ làm phần cuối "từ mao mạch sang tế bào".

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao côn trùng không có hemoglobin nhưng vẫn sống được?**
A: Côn trùng dùng hệ **khí quản (tracheal system)** — các ống dẫn không khí phân nhánh đi thẳng tới từng tế bào, không cần máu chở O₂. Nhược điểm: hạn chế kích thước — không có côn trùng to bằng chó vì ống khí không khuếch tán O₂ đi xa được, và cũng không có "tim đẩy không khí". Đây là lý do côn trùng thời cổ đại to (do khí quyển nhiều O₂ ~35%), còn ngày nay ~21% nên giới hạn ~chục cm.

**Q: Tim bơm khoảng bao nhiêu máu cả đời?**
A: ~5 L/phút × 60 phút × 24 giờ × 365 ngày × 80 năm ≈ **210 triệu lít** — đủ chứa ~80 bể bơi Olympic. Tim đập ~2.5–3 tỉ lần trong đời không nghỉ.

### 📝 Tóm tắt mục 1

- Mọi tế bào cần O₂ để sinh ATP và phải thải CO₂; ở cơ thể đa bào kích thước lớn, khuếch tán đơn thuần không đủ.
- Tuần hoàn = "đường ống + trạm bơm" để vận chuyển khí, dinh dưỡng, hormone, chất thải.
- Hô hấp = "cửa khẩu" trao đổi O₂/CO₂ với khí trời.

---

## 2. Cấu tạo tim 4 ngăn và hệ thống van

### 💡 Trực giác / Hình dung

Tim người không phải **một** cái bơm mà là **hai bơm dính nhau**: bơm phải đẩy máu lên phổi (vòng nhỏ), bơm trái đẩy máu đi khắp cơ thể (vòng lớn). Hai bơm cùng nhịp nhưng độc lập về dòng máu (không trộn lẫn). Mỗi bơm có 1 buồng nhỏ "đón máu" (tâm nhĩ) và 1 buồng to "đẩy máu" (tâm thất). Van giống **cửa một chiều**: chỉ cho máu đi xuôi, đóng sập nếu máu định chảy ngược.

### 2.1. Bốn ngăn

| Ngăn | Vai trò | Máu chứa |
|------|---------|----------|
| Tâm nhĩ phải (right atrium) | nhận máu nghèo O₂ từ tĩnh mạch chủ | nghèo O₂ |
| Tâm thất phải (right ventricle) | bơm máu nghèo O₂ lên phổi | nghèo O₂ |
| Tâm nhĩ trái (left atrium) | nhận máu giàu O₂ từ phổi | giàu O₂ |
| Tâm thất trái (left ventricle) | bơm máu giàu O₂ đi khắp cơ thể | giàu O₂ |

**Quy ước hình vẽ trong sách**: nhìn vào người đối diện → "trái" của họ là bên phải trong hình. Vì vậy "tâm thất trái" trong hình sẽ ở **bên phải** màn hình.

### 2.2. Bốn loại van

| Van | Vị trí | Khi mở | Khi đóng |
|-----|--------|--------|----------|
| Van tricuspid (3 lá) | giữa nhĩ phải ↔ thất phải | khi nhĩ co, đẩy máu xuống thất | khi thất co (ngăn máu trào ngược lên nhĩ) |
| Van mitral (2 lá, hay van bicuspid) | giữa nhĩ trái ↔ thất trái | tương tự bên trái | tương tự |
| Van bán nguyệt phổi (pulmonary semilunar) | giữa thất phải ↔ động mạch phổi | khi thất phải co, đẩy máu ra | khi thất giãn (ngăn máu trào ngược về thất) |
| Van bán nguyệt chủ (aortic semilunar) | giữa thất trái ↔ động mạch chủ | khi thất trái co | tương tự |

**"Tiếng tim" lub-dub**: âm "lub" (S1) = tiếng đóng đồng thời van tricuspid + mitral khi tâm thất bắt đầu co; "dub" (S2) = tiếng đóng van bán nguyệt khi tâm thất giãn. Stethoscope nghe được 2 tiếng/nhịp.

### 2.3. Chu kỳ tim (cardiac cycle)

Một nhịp đập = **một chu kỳ tim** gồm 2 pha:

- **Tâm trương (diastole)** — tim **giãn**, các buồng đầy máu. Áp suất trong thất thấp, máu từ tĩnh mạch tự chảy vào nhĩ rồi xuống thất qua van nhĩ-thất đang mở. Pha này chiếm ~2/3 chu kỳ ở nghỉ.
- **Tâm thu (systole)** — tim **co**, tống máu ra. Đầu pha: van nhĩ-thất đóng (lub). Áp suất thất tăng vọt → đẩy mở van bán nguyệt → máu phun vào động mạch. Cuối pha: thất giãn, áp suất tụt → van bán nguyệt đóng (dub).

Trong 1 chu kỳ 0.8 giây (nhịp 75/phút): tâm trương ~0.5 s, tâm thu ~0.3 s. Tim "nghỉ" nhiều hơn "làm" trong mỗi nhịp — đó là cách nó hoạt động được cả đời không mệt.

### ⚠ Lỗi thường gặp

- **Nghĩ "tâm trương = tim ngừng"**: SAI. Tâm trương là pha **giãn để nhận máu**, máu vẫn chảy liên tục vào tim. Tim chỉ ngừng nếu bệnh lý (ngừng tim).
- **Nhầm hướng máu qua van**: van **chỉ mở theo dòng máu xuôi** (từ nhĩ → thất → động mạch). Nếu máu định chảy ngược → van đóng sập (đó là tiếng tim). Hỏng van (hở van) → máu trào ngược → giảm hiệu quả bơm.
- **Coi 2 nửa tim đập lệch nhau**: thực ra **cả 2 nhĩ co cùng lúc**, **cả 2 thất co cùng lúc** — phối hợp bởi hệ dẫn truyền điện (nút xoang nhĩ SA node, nút nhĩ thất AV node — sẽ học chi tiết ở lesson nâng cao).

### 🔁 Dừng lại tự kiểm tra

1. Khi van mitral đang đóng, tim đang ở pha nào và máu đang đi đâu?
2. Tại sao thành tâm thất trái dày hơn thành tâm thất phải?

<details>
<summary>Đáp án</summary>

1. Van mitral đóng = **tâm thu**. Máu từ tâm thất trái đang được tống vào **động mạch chủ** (qua van bán nguyệt chủ đang mở). Cùng lúc bên phải, máu từ tâm thất phải đi vào động mạch phổi.
2. Tâm thất trái bơm máu đi **toàn thân** (vòng lớn) — quãng đường dài, kháng lực lớn, cần áp suất rất cao (~120 mmHg lúc tâm thu). Tâm thất phải chỉ bơm máu **lên phổi** ngay gần đó (vòng nhỏ) — kháng lực thấp hơn ~6 lần, chỉ cần ~25 mmHg. Thành dày = cơ tim mạnh hơn = sinh áp suất cao hơn.
</details>

### 📝 Tóm tắt mục 2

- Tim 4 ngăn = 2 bơm dính nhau (phải lên phổi, trái đi toàn thân); máu giàu/nghèo O₂ **không trộn lẫn**.
- 4 van (2 nhĩ-thất + 2 bán nguyệt) đảm bảo dòng máu một chiều; đóng van tạo tiếng tim lub-dub.
- Chu kỳ tim = tâm trương (giãn, đầy máu) + tâm thu (co, tống máu); tim "nghỉ" nhiều hơn "làm" trong mỗi nhịp.

---

## 3. Hai vòng tuần hoàn — lớn và nhỏ

### 💡 Trực giác / Hình dung

Hình dung **số 8 nằm ngang (∞)**, với **tim ở giao điểm giữa**. Vòng bên trái của số 8 = **vòng nhỏ (đi phổi)**; vòng bên phải = **vòng lớn (đi toàn thân)**. Máu chạy hết vòng nhỏ rồi quay về tim, qua tim sang vòng lớn rồi lại quay về — đi mãi không nghỉ. Một giọt máu mất ~1 phút để đi hết cả 2 vòng (ở nghỉ).

### 3.1. Vòng nhỏ (pulmonary circulation) — tim → phổi → tim

\`\`\`
Tâm thất phải → động mạch phổi → mao mạch phế nang → tĩnh mạch phổi → tâm nhĩ trái
   (nghèo O₂)                       (trao đổi khí)                    (giàu O₂)
\`\`\`

**"Nghịch lý" duy nhất trong cơ thể**: ở đây **động mạch mang máu nghèo O₂** và **tĩnh mạch mang máu giàu O₂** — ngược định nghĩa thông thường. Lý do: "động mạch" định nghĩa theo **hướng đi xa tim**, không phải theo nồng độ O₂. Cứ máu rời tim = động mạch.

### 3.2. Vòng lớn (systemic circulation) — tim → toàn thân → tim

\`\`\`
Tâm thất trái → động mạch chủ (aorta) → động mạch nhỏ → mao mạch ở mô
   (giàu O₂)                                          (trao đổi với tế bào)
                                                              ↓
Tâm nhĩ phải ← tĩnh mạch chủ ← tĩnh mạch nhỏ ← (máu nghèo O₂ sau trao đổi)
\`\`\`

Ở mô: O₂ rời máu sang tế bào; CO₂ rời tế bào vào máu. Máu giàu → nghèo O₂ chỉ trong mao mạch (~1 mm cuối hành trình).

### 3.3. Bốn ví dụ số minh họa

**Ví dụ 1 — tốc độ máu qua các đoạn**: cùng cung lượng tim ~5 L/phút phải đi qua mọi đoạn. Tiết diện tổng:
- Động mạch chủ: ~3 cm² → vận tốc ~30 cm/s (cao).
- Tổng tiết diện mao mạch: ~4500 cm² (vì cực nhiều mao mạch song song) → vận tốc ~0.03 cm/s (chậm gấp 1000 lần).
- Lý do thiết kế: mao mạch chậm để có **đủ thời gian khuếch tán** O₂/CO₂ và dinh dưỡng qua thành mao mạch.

**Ví dụ 2 — thời gian 1 giọt máu đi hết 1 vòng**: ở nghỉ, tổng thể tích máu ~5 L, cung lượng tim ~5 L/phút → mỗi giọt máu hoàn thành **1 chu trình (qua cả 2 vòng) trong ~1 phút**.

**Ví dụ 3 — áp suất giảm dần theo dòng**: từ tâm thất trái → động mạch chủ ~120 mmHg → động mạch nhỏ ~85 → tiểu động mạch ~35 → mao mạch ~15 → tĩnh mạch ~5 → tâm nhĩ phải ~0. Áp suất tụt do ma sát; tim trái phải bù lại áp suất này mỗi nhịp.

**Ví dụ 4 — phân phối cung lượng tim ở nghỉ vs vận động**: ở nghỉ ~5 L/phút phân: gan + ruột ~25%, thận ~22%, não ~14%, cơ ~20%. Khi vận động mạnh, tổng tăng lên ~20 L/phút và **cơ tăng lên ~80%** (mạch máu ở cơ giãn ra; ở ruột co lại — đó là lý do không nên ăn no rồi chạy).

### ⚠ Lỗi thường gặp

- **Nói "động mạch luôn đỏ tươi, tĩnh mạch luôn đỏ sẫm"**: SAI ở vòng nhỏ. Động mạch phổi đỏ sẫm (nghèo O₂); tĩnh mạch phổi đỏ tươi (giàu O₂).
- **Nghĩ "máu từ ruột về thẳng tim"**: SAI. Máu từ ruột chứa chất hấp thụ phải qua **tĩnh mạch cửa (hepatic portal vein)** → gan → mới về tim. Đây là "trạm kiểm tra" của gan trước khi chất đi khắp cơ thể.
- **Cho rằng 2 dòng máu giàu/nghèo O₂ trộn ở tim**: bình thường **KHÔNG** trộn — tim 4 ngăn cách ly hoàn toàn. Trộn = dị tật bẩm sinh (vd thông liên thất).

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao có tĩnh mạch có van mà động mạch thì không?**
A: Vì máu trong tĩnh mạch chảy chậm (áp suất thấp ~5 mmHg) và có khi phải đi **ngược chiều trọng lực** (chân lên tim). Van tĩnh mạch ngăn máu chảy ngược xuống khi cơ co/giãn xen kẽ ("bơm cơ" giúp đẩy máu về tim). Động mạch áp suất cao luôn đẩy máu xuôi nên không cần van (trừ van bán nguyệt ở gốc động mạch chủ và phổi — chỉ 2 cái).

**Q: Mao mạch mỏng tới mức nào?**
A: Mao mạch chỉ có **1 lớp tế bào nội mô**, đường kính ~5–10 μm (vừa khít cho 1 hồng cầu ~7 μm đi qua từng cái một). Mỏng vậy để O₂/CO₂ khuếch tán nhanh qua thành. Tổng chiều dài mao mạch trong cơ thể người ~100,000 km — đủ quấn Trái Đất 2.5 vòng.

### 🔁 Dừng lại tự kiểm tra

1. Liệt kê thứ tự một giọt máu đi từ tâm nhĩ phải tới mô bắp tay, qua các cấu trúc lần lượt.
2. Vì sao vận tốc máu ở mao mạch chậm hơn ở động mạch chủ ~1000 lần, mặc dù cùng cung lượng tim?

<details>
<summary>Đáp án</summary>

1. Tâm nhĩ phải → van tricuspid → tâm thất phải → van bán nguyệt phổi → động mạch phổi → mao mạch phổi (gắn O₂, nhả CO₂) → tĩnh mạch phổi → tâm nhĩ trái → van mitral → tâm thất trái → van bán nguyệt chủ → động mạch chủ → động mạch cánh tay → tiểu động mạch → **mao mạch ở bắp tay** (nhả O₂, nhận CO₂).
2. Định luật bảo toàn dòng: lưu lượng Q = vận tốc × tiết diện = const. Mao mạch có cực nhiều ống song song nên **tổng tiết diện** ~4500 cm² (gấp ~1500 lần động mạch chủ 3 cm²). Tổng tiết diện tăng ~1500 lần → vận tốc giảm ~1500 lần (xấp xỉ 1000 lần do làm tròn). Thiết kế này có chủ đích — chậm để khuếch tán đủ thời gian.
</details>

### 📝 Tóm tắt mục 3

- Hai vòng tuần hoàn ghép số 8: vòng nhỏ (tim → phổi → tim) + vòng lớn (tim → toàn thân → tim).
- "Nghịch lý" vòng nhỏ: động mạch phổi mang máu nghèo O₂; tĩnh mạch phổi mang máu giàu O₂ — vì "động mạch" định nghĩa theo hướng đi xa tim.
- Vận tốc máu chậm hẳn ở mao mạch (tổng tiết diện lớn) để đủ thời gian trao đổi; áp suất giảm dần từ động mạch chủ về tĩnh mạch chủ.

---

## 4. Cung lượng tim (cardiac output) — tính bằng số

### 💡 Trực giác / Hình dung

Cung lượng tim = "lưu lượng nước qua máy bơm mỗi phút". Nếu bơm đập 70 lần/phút và mỗi lần tống ra 70 mL nước, thì 1 phút bơm được 70 × 70 = 4900 mL ≈ **5 lít**. Đó là toàn bộ máu trong cơ thể bạn. Tức là trung bình **mỗi phút toàn bộ máu chạy qua tim 1 lần** (ở nghỉ).

### 4.1. Định nghĩa và công thức

**Cung lượng tim (cardiac output, CO)** = thể tích máu tim bơm ra trong 1 phút (đơn vị: L/phút).

$$
\\text{CO} = \\text{HR} \\times \\text{SV}
$$

Trong đó:
- **HR (heart rate)** = nhịp tim (số nhịp/phút). Người trưởng thành nghỉ ngơi: ~60–100 bpm, trung bình ~70.
- **SV (stroke volume)** = thể tích máu một tâm thất tống ra mỗi nhịp (mL). Trung bình ~70 mL ở người lớn nghỉ.

**Ý nghĩa thực tế**: cơ thể điều chỉnh CO theo nhu cầu — khi vận động, cơ cần nhiều O₂ → tim phải bơm nhanh hơn (tăng HR) **và** mạnh hơn (tăng SV). Vận động viên có SV cao hơn người thường ở cùng nhịp tim → CO cao mà không cần đập nhanh.

### 4.2. Bốn ví dụ số cụ thể

**Ví dụ 1 — Nghỉ ngơi (trung bình)**:
- HR = 70 bpm, SV = 70 mL.
- CO = 70 × 70 = **4900 mL/phút ≈ 5 L/phút**.
- Bằng đúng tổng thể tích máu cơ thể (~5 L) → 1 phút máu vòng qua tim 1 lần.

**Ví dụ 2 — Vận động trung bình (chạy bộ chậm)**:
- HR = 120 bpm, SV = 90 mL.
- CO = 120 × 90 = **10,800 mL/phút ≈ 10.8 L/phút** (gấp ~2 lần lúc nghỉ).

**Ví dụ 3 — Vận động viên đua xe đạp đỉnh cao**:
- HR = 190 bpm, SV = 160 mL (luyện tập làm cơ tim to ra → SV rất cao).
- CO = 190 × 160 = **30,400 mL/phút ≈ 30 L/phút** (gấp 6 lần lúc nghỉ).
- Đây là lý do vận động viên elite có thể duy trì công suất khổng lồ — máy bơm mạnh hơn 6 lần người thường.

**Ví dụ 4 — Vận động viên lúc nghỉ ngơi**:
- HR rất thấp ~45 bpm, SV cao ~110 mL.
- CO = 45 × 110 = **4950 mL/phút ≈ 5 L/phút** — vẫn đúng 5 L/phút như người thường.
- Cơ thể cần đúng ngần ấy ở nghỉ ngơi; vận động viên đạt được bằng "đập ít nhưng mạnh", người thường bằng "đập nhiều nhưng yếu". Đó là vì sao bradycardia (nhịp chậm) ở vận động viên là dấu hiệu **tốt**.

### 4.3. Liên hệ với áp suất máu

Áp suất máu (blood pressure) đo bằng mmHg, ghi 2 số: **tâm thu / tâm trương** (vd 120/80).
- **Tâm thu** ~120 mmHg: áp suất ngay khi tâm thất trái co tống máu vào động mạch chủ.
- **Tâm trương** ~80 mmHg: áp suất khi tim giãn (không bơm), do thành động mạch còn co lại đẩy máu.

Áp suất phụ thuộc: (1) **CO** (bơm mạnh hơn → áp cao hơn), (2) **kháng lực mạch ngoại biên** (mạch co → áp cao). Cao huyết áp = tim hoặc mạch có vấn đề khiến áp vượt ngưỡng (~140/90).

### ⚠ Lỗi thường gặp

- **Nghĩ CO chỉ tăng nhờ tăng nhịp tim**: thực ra tăng **cả** HR và SV. Vận động viên đỉnh cao nhờ SV cao là chính.
- **Nhầm áp suất với cung lượng**: áp suất là **lực/diện tích** (mmHg), cung lượng là **thể tích/thời gian** (L/phút). Hai khái niệm khác nhau, dù liên quan.
- **Quên chia 1000 khi đổi đơn vị**: SV thường ghi mL, CO ghi L/phút. Vd 70 × 70 = 4900 mL/phút = **4.9 L/phút**, không phải 4900 L.

### 🔁 Dừng lại tự kiểm tra

1. Một người có HR = 80 bpm, SV = 75 mL. Tính CO theo L/phút.
2. Lúc vận động, tim người đó tăng nhịp lên 140 bpm và SV tăng lên 100 mL. CO mới gấp bao nhiêu lần lúc nghỉ?

<details>
<summary>Đáp án</summary>

1. CO = 80 × 75 = 6000 mL/phút = **6 L/phút**.
2. CO mới = 140 × 100 = 14,000 mL/phút = **14 L/phút**. Tỉ lệ = 14 / 6 ≈ **2.33 lần** lúc nghỉ.
</details>

### 📝 Tóm tắt mục 4

- CO = HR × SV: nghỉ ~5 L/phút (70 bpm × 70 mL), vận động đỉnh có thể ~30 L/phút.
- Vận động viên tăng SV bằng cách luyện tập → đập ít mà bơm khỏe; nhịp nghỉ thấp ~45 bpm là dấu hiệu tốt.
- Áp suất máu 120/80 = tâm thu/tâm trương; phụ thuộc CO và kháng lực mạch ngoại biên.

---

## 5. Trao đổi khí ở phổi — phế nang và gradient áp suất

### 💡 Trực giác / Hình dung

Phổi không phải 2 cái túi rỗng mà là **2 chùm nho gồm ~300 triệu quả nho nhỏ xíu** (phế nang, alveolus). Mỗi quả nho được bọc bởi mạng mao mạch dày đặc — máu chạy sát vào, chỉ cách không khí trong phế nang **2 lớp tế bào mỏng < 1 μm**. Tổng diện tích bề mặt trao đổi của tất cả phế nang ~**70 m²** — gần bằng diện tích sân tennis. Trải rộng vậy để O₂/CO₂ khuếch tán cực nhanh.

### 5.1. Định luật Fick (nhắc lại từ Lesson 05 Tầng 1)

Tốc độ khuếch tán khí qua màng:

$$
\\text{Dòng khí} \\propto \\frac{\\text{S} \\times \\Delta P}{d}
$$

- S = diện tích bề mặt
- ΔP = chênh lệch áp suất riêng phần
- d = khoảng cách khuếch tán

Phổi tối ưu cả 3: **S khổng lồ** (70 m²), **ΔP lớn** (gradient bên dưới), **d cực mỏng** (< 1 μm). Đó là vì sao O₂ kịp bão hòa máu chỉ trong **~0.25 giây** mà máu đi qua phế nang.

### 5.2. Áp suất riêng phần (partial pressure) — gradient O₂ và CO₂

| Vị trí | PO₂ (mmHg) | PCO₂ (mmHg) |
|---|---|---|
| Khí trời (mức biển) | ~160 | ~0.3 |
| Phế nang | ~104 | ~40 |
| Máu mao mạch phổi (đến) | ~40 | ~46 |
| Máu mao mạch phổi (đi) | ~104 | ~40 |
| Máu mao mạch mô (đến) | ~104 | ~40 |
| Mô đang hoạt động | ~20-40 | ~46-50 |
| Máu mao mạch mô (đi) | ~40 | ~46 |

**Đọc bảng**: O₂ luôn đi từ nơi P cao → P thấp (khí trời → phế nang → máu → mô); CO₂ ngược lại (mô → máu → phế nang → khí trời). Tất cả là **khuếch tán thụ động theo gradient**, không tốn ATP.

### 5.3. Bốn ví dụ số

**Ví dụ 1 — Gradient O₂ ở phổi**: ΔP = 104 (phế nang) − 40 (máu đến) = **64 mmHg**. Đủ lớn để O₂ khuếch tán nhanh; sau ~0.25 s máu rời phế nang đã đạt PO₂ ~104 → bão hòa.

**Ví dụ 2 — Gradient O₂ ở mô**: ΔP = 100 (máu đến) − 40 (mô) = **60 mmHg**. Tương đương ở phổi, đảm bảo O₂ rời máu vào tế bào nhanh.

**Ví dụ 3 — Lên núi cao 4000 m**: PO₂ khí trời giảm còn ~100 mmHg (do áp suất khí quyển thấp), PO₂ phế nang còn ~60. Gradient phổi giảm còn 60 − 40 = 20 mmHg → khuếch tán chậm → máu khó bão hòa. Đó là lý do thở dốc trên núi, và vì sao cơ thể bù bằng cách tăng số hồng cầu sau vài tuần ở độ cao.

**Ví dụ 4 — Cơ vận động mạnh**: mô sinh nhiệt + acid lactic → PO₂ mô tụt xuống ~20 mmHg và PCO₂ tăng lên ~50 mmHg. Gradient O₂ máu→mô tăng lên 100−20 = 80 mmHg (so với 60 lúc nghỉ) → O₂ nhả ra **nhiều hơn**. Cơ thể "tự động" cấp O₂ thêm cho vùng cần.

### 5.4. Cơ chế hô hấp ngoài (ventilation)

Phổi không có cơ riêng — không khí ra vào do **thay đổi thể tích lồng ngực**:

- **Hít vào (inspiration)**: cơ hoành (diaphragm) co kéo xuống + cơ liên sườn ngoài co kéo xương sườn lên → khoang ngực **giãn ra** → áp suất trong phổi giảm xuống dưới khí trời → không khí ùa vào.
- **Thở ra (expiration)**: ở nghỉ chỉ cần thư giãn cơ hoành (đàn hồi phổi tự đẩy không khí ra). Khi gắng sức thì có thêm cơ liên sườn trong co ép.

Đây là một ví dụ **áp dụng định luật Boyle**: ở nhiệt độ hằng, P·V = const → tăng V (phổi giãn) → giảm P → khí từ ngoài (áp cao hơn) chảy vào. Hô hấp là một bài tập vật lý áp suất kèm sinh học.

### ⚠ Lỗi thường gặp

- **Nghĩ "hít vào là phổi tự hút"**: SAI. Phổi không có cơ. Cơ hoành + cơ liên sườn làm việc; phổi chỉ "bị kéo theo" bởi áp suất.
- **Nhầm O₂ "được bơm" qua màng**: không, O₂ và CO₂ khuếch tán **thụ động** theo gradient áp suất riêng phần. Không tốn ATP. Đó cũng là vì sao ngất do ngạt nhanh — cơ thể không có cách "bơm tay" O₂ vào.
- **Quên rằng PCO₂ trong khí trời gần 0**: gradient CO₂ phế nang → khí trời = 40 − 0.3 ≈ 40 mmHg, dù số nhỏ hơn gradient O₂ nhưng CO₂ khuếch tán nhanh gấp ~20 lần O₂ qua màng (tan trong nước tốt hơn) → bù lại.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao ngạt CO₂ (ở phòng kín) nguy hiểm hơn thiếu O₂ thuần túy?**
A: Thực ra cảm giác "ngạt" mà bạn cảm thấy chủ yếu là do **tăng CO₂ trong máu** — receptor ở hành não nhạy với CO₂ hơn là với O₂. Trong phòng kín, CO₂ tích lũy → kích thích thở mạnh, gây hoảng. Trong khi đó **thiếu O₂ thuần (như leo núi cao)** không gây cảm giác ngạt rõ — chỉ chóng mặt, ngất — vì receptor O₂ ít nhạy. Đó là lý do leo núi cao chết "êm" không kịp phản ứng.

**Q: Hút thuốc lá phá phế nang thế nào?**
A: Khói thuốc kích hoạt enzyme phá vỡ vách phế nang → 300 triệu quả nho nhỏ gộp thành **vài quả nho to** — tổng diện tích S giảm mạnh từ 70 m² xuống có khi còn 30–40 m². Theo định luật Fick, dòng O₂ vào máu tỉ lệ thuận với S → giảm gần một nửa → bệnh khí phế thũng (emphysema), khó thở mãn.

### 🔁 Dừng lại tự kiểm tra

1. Nếu một người sống lâu ngày trên núi cao có PO₂ khí trời chỉ 90 mmHg (so với 160 ở mức biển). Giả sử PO₂ phế nang giảm còn 55. Gradient O₂ vào máu mao mạch phổi là bao nhiêu? Có đủ để O₂ khuếch tán hiệu quả không?
2. Vì sao cơ hoành quan trọng hơn cơ liên sườn trong hô hấp yên tĩnh?

<details>
<summary>Đáp án</summary>

1. Gradient = PO₂ phế nang − PO₂ máu đến = 55 − 40 = **15 mmHg** (so với 64 ở mức biển — chỉ còn ~23%). Vẫn cho khuếch tán nhưng chậm hơn rất nhiều; máu khó bão hòa hoàn toàn trong 0.25 s. Cơ thể bù bằng cách tăng hồng cầu (sản EPO từ thận).
2. Cơ hoành phụ trách ~70% thể tích hít vào ở nghỉ. Cơ liên sườn chỉ bổ sung khi gắng sức. Liệt cơ hoành (vd tổn thương cột sống C3-C5) → ngừng thở; liệt cơ liên sườn vẫn còn thở được.
</details>

### 📝 Tóm tắt mục 5

- Phổi có ~300 triệu phế nang, tổng diện tích ~70 m²; vách mao mạch–phế nang mỏng < 1 μm — tối ưu định luật Fick.
- O₂ và CO₂ khuếch tán thụ động theo gradient áp suất riêng phần: O₂ từ phế nang (104 mmHg) → máu (40); CO₂ ngược.
- Hô hấp ngoài = thay đổi thể tích lồng ngực bởi cơ hoành + liên sườn → áp suất phổi thay đổi → khí ra/vào.

---

## 6. Hemoglobin và đường cong bão hòa O₂

### 💡 Trực giác / Hình dung

Mỗi phân tử hemoglobin (Hb) là một **"chiếc xe tải 4 chỗ"** chở O₂: 4 chuỗi polypeptide (2 α + 2 β), mỗi chuỗi có 1 **nhóm heme** chứa 1 ion Fe²⁺ — mỗi heme gắn được **1 phân tử O₂**. Tối đa 1 Hb chở 4 O₂.

Điều kỳ diệu: **4 chỗ ngồi này nói chuyện với nhau** (cooperativity). Khi 1 O₂ vừa lên, Hb hơi đổi hình → 3 chỗ còn lại "mở rộng cửa" — gắn O₂ tiếp theo dễ hơn. Khi 1 O₂ vừa nhả xuống, 3 cái còn lại cũng "rủ nhau" nhả nhanh. Đó là lý do đường cong bão hòa O₂ có hình **sigmoid (chữ S)** chứ không phải đường thẳng.

### 6.1. Đường cong bão hòa O₂ (oxygen-hemoglobin saturation curve)

Trục X = PO₂ (mmHg) trong môi trường (máu); trục Y = % Hb bão hòa O₂ (0–100%).

- Ở **PO₂ ~100 mmHg** (máu rời phổi): Hb bão hòa **~98%** → gần đầy 4 chỗ.
- Ở **PO₂ ~40 mmHg** (mô ở nghỉ): Hb còn bão hòa **~75%** → nhả ~25% O₂ cho mô.
- Ở **PO₂ ~20 mmHg** (cơ đang vận động): Hb còn bão hòa **~30%** → nhả ~70% O₂ — gấp gần 3 lần lượng nhả lúc nghỉ.

**Lưu ý hình sigmoid**: ở phần cao (PO₂ > 60), đường gần phẳng — nghĩa là Hb gần đầy O₂ ổn định, dù PO₂ dao động không bị ảnh hưởng. Ở phần dốc (PO₂ 20–40), đường rất dốc — chỉ cần PO₂ giảm chút là nhả ra rất nhiều O₂. Hai đặc tính này phối hợp hoàn hảo: **giữ chặt O₂ ở phổi (an toàn), nhả mạnh ở mô đang cần (đáp ứng)**.

### 6.2. Hiệu ứng Bohr (Bohr effect)

Khi mô hoạt động mạnh (cơ chạy), 2 thứ tăng lên: **CO₂ cao** (do hô hấp tế bào) và **pH thấp** (do acid lactic và H₂CO₃). Cả 2 làm Hb **giảm ái lực với O₂** → đường cong bão hòa **dịch sang phải** → ở cùng PO₂, Hb nhả ra nhiều O₂ hơn.

Đây là phản hồi rất thông minh: chính mô đang **cần O₂ nhất** lại tạo ra tín hiệu (CO₂, H⁺) khiến Hb tự động **nhả nhiều O₂ hơn** cho mình. Không cần não điều khiển — hóa học tự lo.

### 6.3. Bốn ví dụ số

**Ví dụ 1 — Số O₂ trên 1 phân tử Hb**: 1 Hb có 4 heme × 1 O₂/heme = **4 O₂** tối đa.

**Ví dụ 2 — Số O₂ trong 1 hồng cầu**: 1 hồng cầu chứa ~280 triệu phân tử Hb → tối đa 280 × 4 = **1.12 tỉ phân tử O₂** mỗi hồng cầu. Cơ thể có ~25 nghìn tỉ hồng cầu → tổng kho O₂ cõng được đồng thời ~2.8 × 10²² phân tử O₂.

**Ví dụ 3 — Khả năng chở O₂ của máu**: 1 g Hb chở ~1.34 mL O₂ (khi bão hòa hoàn toàn). Nồng độ Hb máu ~150 g/L → 1 L máu chở ~200 mL O₂. So với chỉ tan trong huyết tương (~3 mL O₂/L) → Hb tăng khả năng chở O₂ lên ~**70 lần**. Không có Hb, chúng ta không sống nổi.

**Ví dụ 4 — Lượng O₂ thực nhả ra ở mô**:
- Ở nghỉ: máu vào mô PO₂=100 (bão hòa 98%), ra mô PO₂=40 (bão hòa 75%) → nhả ~23%. Trên 200 mL O₂/L máu → nhả ~46 mL O₂/L.
- Khi cơ vận động: ra mô PO₂=20 (bão hòa ~30% **và** dịch sang phải do Bohr → còn ~20%) → nhả ~78%. Tăng gấp ~3.4 lần lượng nhả/L máu. Cộng thêm CO tăng 6 lần → tổng cấp O₂ cho cơ tăng ~**20 lần** khi vận động đỉnh.

### ⚠ Lỗi thường gặp

- **Nghĩ Hb chở O₂ bằng liên kết cộng hóa trị**: SAI. Là **liên kết phối trí thuận nghịch** (Fe²⁺ ↔ O₂) — có thể gắn vào và nhả ra dễ dàng. Nếu là cộng hóa trị → không nhả được → vô dụng.
- **Cho rằng CO (carbon monoxide) cạnh tranh "hơi hơn" O₂**: thực ra CO gắn vào Fe²⁺ **mạnh gấp ~250 lần** O₂. Khi ngộ độc CO, Hb không nhả CO ra được → mất khả năng chở O₂ → ngạt dù không khí có đủ O₂. Đó là vì sao CO trong khí thải xe nguy hiểm chết người.
- **Nhầm "đường cong dịch phải = Hb tệ"**: ngược lại. Dịch phải = nhả O₂ dễ hơn ở mô — đây là tốt khi mô cần O₂. Bohr effect là cơ chế thích ứng tinh tế.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao đường cong sigmoid (chữ S) chứ không phải đường thẳng?**
A: Do **cooperativity** giữa 4 vị trí. Toán học: nếu mỗi vị trí độc lập, đường cong sẽ là **hyperbolic** (cong nhưng không có "đoạn dốc"). Khi gắn xong O₂ thứ 1, Hb đổi hình → vị trí thứ 2-3-4 dễ gắn hơn → tốc độ bão hòa tăng nhanh giữa chừng → đoạn dốc ở PO₂ ~20-40 mmHg. Đây là sức mạnh của protein bậc 4 — chức năng "phức tạp hơn" tổng các phần.

**Q: Hb của thai nhi khác Hb của mẹ thế nào?**
A: Hb thai (HbF) có 2 chuỗi γ thay 2 chuỗi β → **ái lực với O₂ cao hơn** Hb người lớn (HbA) → đường cong dịch trái. Hệ quả: ở cùng PO₂ ở nhau thai, HbF "giành" được O₂ từ HbA của mẹ. Đó là cách thai có đủ O₂ dù sống trong môi trường PO₂ thấp (~30 mmHg trong nhau thai).

### 🔁 Dừng lại tự kiểm tra

1. Một hồng cầu chứa 280 triệu Hb. Tại phổi (PO₂=100, bão hòa 98%), hồng cầu đó chở bao nhiêu O₂?
2. Khi xuống mô cơ đang vận động (PO₂=20, bão hòa 25% do Bohr), hồng cầu đó còn chở bao nhiêu O₂? Nhả ra bao nhiêu cho cơ?

<details>
<summary>Đáp án</summary>

1. Tổng chỗ chở = 280 × 10⁶ × 4 = 1.12 × 10⁹ phân tử O₂. Bão hòa 98% → chở **~1.0976 × 10⁹ ≈ 1.1 tỉ phân tử O₂**.
2. Bão hòa 25% → còn chở 1.12 × 10⁹ × 0.25 = 2.8 × 10⁸ ≈ **280 triệu phân tử O₂**. Nhả ra = 1.0976 × 10⁹ − 2.8 × 10⁸ ≈ **820 triệu phân tử O₂** cho mô. (Lúc nghỉ chỉ nhả ~260 triệu → vận động nhả gấp ~3 lần.)
</details>

### 📝 Tóm tắt mục 6

- Hb là protein bậc 4 với 4 nhóm heme — chở tối đa 4 O₂. Cooperativity giữa 4 vị trí → đường cong bão hòa hình sigmoid.
- Đường cong sigmoid: giữ chặt O₂ ở phổi (đoạn phẳng phía trên), nhả mạnh ở mô (đoạn dốc PO₂ 20–40).
- Hiệu ứng Bohr: CO₂ cao / pH thấp ở mô hoạt động → Hb nhả thêm O₂ → mô tự nhận đúng lượng cần.

---

## 7. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Liệt kê thứ tự một giọt máu đi qua các cấu trúc tim sau khi rời tâm nhĩ phải, cho tới khi nó đi vào động mạch chủ. Kèm tên các van mà nó phải đi qua.

**Bài 2**: Một người ở nghỉ có nhịp tim 72 bpm và stroke volume 75 mL. (a) Tính cung lượng tim CO theo L/phút. (b) Khi vận động, nhịp tăng lên 150 bpm và SV lên 110 mL. CO mới là bao nhiêu? Gấp bao lần lúc nghỉ?

**Bài 3**: Một vận động viên có nhịp tim nghỉ chỉ 50 bpm nhưng vẫn cung lượng tim ~5 L/phút như người thường. SV của họ là bao nhiêu? Vì sao SV cao thường đi cùng nhịp tim nghỉ thấp?

**Bài 4**: Phổi có khoảng 300 triệu phế nang, tổng diện tích bề mặt 70 m². (a) Tính diện tích trung bình của 1 phế nang theo mm². (b) Nếu bệnh khí phế thũng làm 300 triệu phế nang gộp thành chỉ còn 1 triệu "phế nang to" với cùng tổng thể tích (giả sử dạng cầu, S=4πr², V=4/3πr³), diện tích bề mặt tổng còn lại khoảng bao nhiêu phần trăm so với ban đầu?

**Bài 5**: Một phân tử hemoglobin chở tối đa 4 O₂. Một hồng cầu chứa khoảng 280 triệu Hb. (a) Tính số O₂ tối đa 1 hồng cầu chở. (b) Cơ thể có khoảng 25 × 10¹² hồng cầu. Tính tổng số O₂ cõng được đồng thời.

**Bài 6**: Tại sao đường cong bão hòa O₂ ở thai nhi (HbF) lệch sang trái so với người lớn (HbA), và điều đó có lợi ích sinh lý gì cho thai?

### Lời giải

**Bài 1**:
Tâm nhĩ phải → **van tricuspid** → tâm thất phải → **van bán nguyệt phổi** → động mạch phổi → mao mạch phổi (gắn O₂, nhả CO₂) → tĩnh mạch phổi → tâm nhĩ trái → **van mitral (bicuspid)** → tâm thất trái → **van bán nguyệt chủ** → động mạch chủ.

Tổng cộng đi qua **4 van** theo thứ tự: tricuspid → bán nguyệt phổi → mitral → bán nguyệt chủ.

**Bài 2**:
- (a) CO = HR × SV = 72 × 75 = 5400 mL/phút = **5.4 L/phút**.
- (b) CO mới = 150 × 110 = 16,500 mL/phút = **16.5 L/phút**. Tỉ lệ = 16.5 / 5.4 ≈ **3.06 lần** lúc nghỉ.

**Bài 3**:
- CO = HR × SV → SV = CO/HR = 5000 / 50 = **100 mL**. So với SV thường ~70 mL → cao hơn ~43%.
- Lý do: luyện tập kéo dài làm cơ tim (đặc biệt tâm thất trái) phì đại có lợi (athlete's heart) → bóp ra nhiều máu hơn mỗi nhịp. Vì SV cao nên không cần đập nhanh để đạt cùng CO → HR nghỉ tự nhiên thấp. Đồng thời, hệ thần kinh phó giao cảm (vagal tone) ở người luyện thể thao mạnh hơn → kéo nhịp xuống thấp lúc nghỉ. Hai cơ chế cộng lại → bradycardia sinh lý là dấu hiệu **tốt** ở vận động viên (khác với bradycardia bệnh lý ở người không luyện).

**Bài 4**:
- (a) S trung bình mỗi phế nang = 70 m² / 3 × 10⁸ = 70 × 10⁶ mm² / 3 × 10⁸ ≈ **0.233 mm²** mỗi phế nang. Đường kính tương ứng: nếu xem là hình cầu thì 4πr² = 0.233 → r² = 0.0186 → r ≈ 0.136 mm → đường kính ~0.27 mm. (Thực tế phế nang ~0.2-0.3 mm — khớp.)
- (b) Tổng thể tích V không đổi. Với phế nang dạng cầu: V = (4/3)πr³, S = 4πr². Nếu N hạt → tổng V = N × (4/3)πr³ và tổng S = N × 4πr².
  - Ban đầu: N₁ = 3 × 10⁸ hạt, S₁ = 70 m².
  - Sau gộp: N₂ = 10⁶ hạt. Tỉ lệ N₂/N₁ = 1/300.
  - V không đổi → N × r³ = const → r₂³ = 300 r₁³ → **r₂ = 300^(1/3) × r₁ ≈ 6.69 × r₁**.
  - S = N × 4πr² → S₂/S₁ = (N₂/N₁) × (r₂/r₁)² = (1/300) × 6.69² = (1/300) × 44.76 ≈ **0.149**.
  - Tức S₂ ≈ **15%** của S₁, hay còn ~10.5 m² (giảm xuống chỉ ~1/7).
  - Đây là vì sao bệnh khí phế thũng làm khó thở: theo định luật Fick, dòng O₂ tỉ lệ với S → giảm gần 7 lần.

**Bài 5**:
- (a) 1 hồng cầu chở tối đa = 280 × 10⁶ Hb × 4 O₂/Hb = **1.12 × 10⁹ ≈ 1.12 tỉ phân tử O₂**.
- (b) Tổng = 1.12 × 10⁹ × 25 × 10¹² = 2.8 × 10²² ≈ **2.8 × 10²² phân tử O₂** cõng đồng thời. (Đổi sang mol: 2.8 × 10²² / 6.022 × 10²³ ≈ 0.046 mol ≈ ~1 L O₂ ở STP — khớp với phép tính "máu chở ~200 mL O₂/L × 5 L = ~1 L".)

**Bài 6**:
HbF có 2 chuỗi γ (thay 2 chuỗi β của HbA). Chuỗi γ ái lực với O₂ cao hơn → ở cùng PO₂, HbF bão hòa nhiều hơn HbA → đường cong **dịch trái**.

Lợi ích: trong nhau thai, máu mẹ (HbA) và máu thai (HbF) gặp nhau qua màng nhau, không trộn lẫn. PO₂ ở nhau thai chỉ ~30-40 mmHg (thấp hơn ở phổi). Vì HbF ái lực cao hơn → ở cùng PO₂ này, HbF lấy được O₂ từ HbA — máu thai bão hòa O₂ tốt dù môi trường nghèo O₂. Nếu HbF không khác HbA, thai sẽ thiếu O₂ kinh niên.

Sau sinh ra: phổi tự thở → PO₂ cao ~100 mmHg → HbF không còn ưu thế, dần được thay bởi HbA trong vòng 6 tháng đầu đời.

---

## 8. Liên kết và bài tiếp theo

- **Bài tiếp theo trong tầng này**: [Lesson 03 — Hệ miễn dịch](../lesson-03-immune-system/) — máu không chỉ chở O₂; nó còn chở "đội quân" bạch cầu bảo vệ cơ thể.
- **Liên kết Biology**:
  - [\`01-Molecules-Cells/lesson-05-cellular-respiration\`](../../01-Molecules-Cells/lesson-05-cellular-respiration/) — vì sao tế bào cần O₂ và thải CO₂.
  - [\`01-Molecules-Cells/lesson-01-biomolecules\`](../../01-Molecules-Cells/lesson-01-biomolecules/) — hemoglobin là protein bậc 4 (mục Protein §4).
  - [\`03-Physiology-Ecology/lesson-01-nervous-system\`](../lesson-01-nervous-system/) — hành não điều khiển nhịp tim và nhịp thở.
- **Liên kết Chemistry**:
  - Áp suất riêng phần và định luật Boyle — \`Chemistry/02-Reactions-Thermo/\` (định luật khí lý tưởng).
- **Đọc thêm**: minh họa tương tác — [\`visualization.html\`](./visualization.html).

---

## 📝 Tổng kết Lesson 02

1. **Tuần hoàn và hô hấp luôn đi đôi**: hô hấp đưa O₂ vào, thải CO₂ ra; tuần hoàn phân phối O₂ tới mọi tế bào và gom CO₂ về. Khuếch tán không đủ ở cơ thể lớn — phải có "bơm + ống dẫn".
2. **Tim 4 ngăn = 2 bơm dính nhau**: phải lên phổi (vòng nhỏ, áp thấp), trái đi toàn thân (vòng lớn, áp cao). 4 van đảm bảo dòng máu một chiều; tiếng tim lub-dub là tiếng đóng van.
3. **Vòng tuần hoàn nhỏ "nghịch lý"**: động mạch phổi chở máu nghèo O₂; tĩnh mạch phổi chở máu giàu O₂ — vì danh xưng theo hướng đi xa tim, không theo nồng độ O₂.
4. **CO = HR × SV**: nghỉ ~5 L/phút; vận động đỉnh tới ~30 L/phút. Vận động viên có SV cao nên đập ít mà bơm khỏe.
5. **Trao đổi khí ở phổi** tối ưu định luật Fick: S khổng lồ (~70 m² qua 300 triệu phế nang), d cực mỏng (<1 μm), gradient PO₂ ~64 mmHg. O₂ và CO₂ khuếch tán thụ động, không tốn ATP.
6. **Hemoglobin** chở 4 O₂/phân tử; cooperativity giữa 4 vị trí → đường cong bão hòa hình sigmoid; **Bohr effect** (CO₂ cao / pH thấp ở mô hoạt động) khiến Hb nhả thêm O₂ đúng nơi cần.

**Tiếp theo**: [Lesson 03 — Hệ miễn dịch](../lesson-03-immune-system/)
`;
