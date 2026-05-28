# Lesson 02: Suy luận nhân quả (Causal Inference)

> **Tầng 3 — Advanced · Statistics**

## Mục tiêu học tập

Sau bài này bạn sẽ:

1. Giải thích được tại sao **correlation không phải causation** và đưa ra ví dụ phản chứng.
2. Nhận dạng và phân biệt **confounder**, **mediator**, **collider** trong một quan hệ nhân quả.
3. Phân tích và giải thích **nghịch lý Simpson** (Simpson's paradox) bằng số liệu cụ thể.
4. Hiểu tại sao **RCT (Randomized Controlled Trial)** là tiêu chuẩn vàng và cơ chế hoạt động của nó.
5. Đọc được **DAG (Directed Acyclic Graph)** cơ bản và dùng nó để phân tích cấu trúc nhân quả.

## Kiến thức tiền đề

- Tầng 2: [hypothesis testing](../../02-Inferential/lesson-03-hypothesis-testing-1sample/README.md), [p-value, power](../../02-Inferential/lesson-06-pvalue-power-effect/README.md).
- [Tầng 1: correlation và covariance](../../01-Descriptive/lesson-05-correlation-regression/README.md) nếu đã học.
- [Lesson 01 Tầng 3: Bayesian Statistics](../lesson-01-bayesian-stats/README.md) — hiểu prior/posterior giúp hiểu tại sao RCT "clean" hơn observational study.

---

## 1. Tại sao correlation KHÔNG phải causation?

> 💡 **Trực giác**: Kem và đuối nước đều tăng vào mùa hè. Nếu ta thấy tương quan r ≈ 0.9 giữa doanh số kem và số vụ đuối nước — liệu bán ít kem hơn có giảm đuối nước không? Đương nhiên không. Cả hai đều có **nguyên nhân chung (common cause)**: nhiệt độ cao, mùa hè, nhiều người ra biển.

### 1.1. Spurious correlation — tương quan giả

Hai biến A và B có tương quan không có nghĩa là A gây ra B. Có ba cấu trúc khác nhau đều tạo ra tương quan:

**Cấu trúc 1 — A gây B** (nhân quả thật):
```
Hút thuốc → Ung thư phổi
```
Tương quan giữa hút thuốc và ung thư là thật. Giảm hút thuốc → giảm ung thư.

**Cấu trúc 2 — Confounder C gây cả A và B**:
```
Mùa hè → Bán kem nhiều
Mùa hè → Đuối nước nhiều
```
Kết quả: Bán kem ↑ ↔ Đuối nước ↑. Nhưng giảm bán kem không giảm đuối nước — vì mùa hè vẫn ở đó.

**Cấu trúc 3 — Reverse causation (B gây A)**:
```
Nằm viện nhiều → Bệnh nặng hơn (?)
```
Thật ra: Bệnh nặng → Nằm viện lâu hơn. Nếu ta "đo" bằng dữ liệu quan sát, có thể kết luận sai.

### 1.2. Ví dụ kinh điển — tương quan giả ngớ ngẩn nhưng thật

Số liệu từ Tyler Vigen (Spurious Correlations):

| Năm | Tiêu thụ phô mai (kg/người/năm) | Tử vong do cuộn dây giường (người) |
|-----|:---:|:---:|
| 2000 | 9.3 | 327 |
| 2001 | 9.7 | 456 |
| 2002 | 9.7 | 509 |
| 2003 | 9.8 | 497 |
| 2004 | 10.2 | 596 |
| 2005 | 10.5 | 573 |
| 2006 | 10.6 | 661 |
| 2007 | 10.6 | 741 |
| 2008 | 10.7 | 809 |
| 2009 | 11.0 | 717 |

Tương quan r ≈ 0.95! Nhưng không ai nghĩ phô mai gây ngã cuộn dây giường — chúng đều tăng theo thời gian (time trend là confounder ẩn).

> ⚠ **Lỗi thường gặp**: Kết luận nhân quả chỉ từ tương quan cao. r = 0.9 chỉ nói "hai biến đi cùng nhau" — không nói gì về hướng quan hệ hay nguyên nhân chung.

> ❓ **Câu hỏi tự nhiên**:
>
> **Q: Nếu tương quan không đủ, thì cần gì để kết luận nhân quả?**
> A: Ba tiêu chí tối thiểu (Bradford Hill): (1) tương quan có, (2) A xảy ra trước B (temporal precedence), (3) không có giải thích thay thế hợp lý nào khác (no plausible alternative explanation). RCT giải quyết được cả ba.

> 📝 **Tóm tắt mục 1**:
> - Tương quan có thể do: nhân quả thật, confounder, reverse causation, hoặc ngẫu nhiên.
> - Cần phân biệt "đi cùng nhau" với "gây ra nhau".
> - Kết luận nhân quả từ data quan sát cần kiểm soát các confounders.

---

## 2. Confounder, Mediator, Collider

### 2.1. Confounder — kẻ phá bĩnh

> 💡 **Trực giác**: Confounder là "nguyên nhân chung" ẩn. Nó ảnh hưởng cả biến nguyên nhân (exposure) lẫn biến kết quả (outcome), tạo ra tương quan giả giữa hai biến này.

**Định nghĩa**: Biến C là confounder của mối quan hệ A → Y nếu:
- C ảnh hưởng A (hoặc tương quan với A)
- C ảnh hưởng Y
- C không nằm trên đường nhân quả từ A đến Y

**Ví dụ 1 — Mùa hè**:
```
Mùa hè (C) → Bán kem (A)
Mùa hè (C) → Đuối nước (Y)
```
Kiểm soát mùa hè (so sánh trong cùng tháng) → tương quan kem-đuối nước biến mất.

**Ví dụ 2 — Thu nhập**:
```
Thu nhập (C) → Mua sách nhiều hơn (A)
Thu nhập (C) → Kết quả học tốt hơn (Y)
```
Quan sát: Mua sách ↑ → điểm ↑. Nhưng nếu phát sách miễn phí (can thiệp A mà không thay đổi C), điểm có tăng không?

**Ví dụ 3 — Tuổi**:
```
Tuổi (C) → Ít vận động hơn (A)
Tuổi (C) → Nhiều bệnh tim hơn (Y)
```
"Không vận động gây bệnh tim" có thể đúng, nhưng phần lớn tương quan quan sát được là do confounding với tuổi.

**Ví dụ 4 — SES (Socioeconomic Status)**:
```
SES (C) → Tiếp cận y tế tốt hơn (A)
SES (C) → Sức khỏe tốt hơn (Y)
```
Không kiểm soát SES khi nghiên cứu hiệu quả bảo hiểm y tế → ước lượng sai lệch.

### 2.2. Mediator — kẻ trung gian

**Định nghĩa**: Biến M là mediator nếu A → M → Y. M nằm TRÊN đường nhân quả từ A đến Y.

**Ví dụ**:
```
Hút thuốc (A) → Tổn thương phổi (M) → Ung thư phổi (Y)
```

**Tại sao quan trọng**: Không nên kiểm soát mediator khi muốn đo tổng hiệu ứng nhân quả của A lên Y. Nếu kiểm soát M, ta sẽ block đường nhân quả và underestimate hiệu ứng.

### 2.3. Collider — kẻ tạo tương quan giả khi bị kiểm soát

> 💡 **Trực giác**: Collider là biến bị ảnh hưởng bởi CẢ HAI biến ta đang quan tâm. Nghịch lý: kiểm soát collider (conditioning on collider) thực ra TẠO RA tương quan giả — ngược với confounder!

**Định nghĩa**: Biến C là collider trên đường A — C — B nếu cả A và B đều gây ra C (A → C ← B).

**Ví dụ — Nghiên cứu trong ICU**:
```
Bệnh nặng (A) → Vào ICU (C) ← Tai nạn (B)
```
Nếu ta nghiên cứu BÊN TRONG ICU (điều kiện hóa trên C): người bệnh nặng do tai nạn ít hơn do ốm → tạo ra tương quan âm giả giữa "bệnh" và "tai nạn" trong mẫu ICU, dù bên ngoài không có quan hệ.

**Ví dụ 2 — Survivorship bias (một dạng collider)**:
```
Tài năng (A) → Được tuyển dụng vào công ty hàng đầu (C) ← May mắn (B)
```
Trong tập nhân viên công ty hàng đầu: tài năng và may mắn có tương quan âm (người may mắn có thể ít tài năng hơn). Không có nghĩa là may mắn "gây ra" kém tài.

### 2.4. DAG — Directed Acyclic Graph

DAG là đồ thị có hướng, không có chu trình, biểu diễn cấu trúc nhân quả:

```
Quy ước:
  A → B     (A gây B)
  A → B     (mũi tên = quan hệ nhân quả trực tiếp)

Ví dụ DAG cho nghiên cứu thuốc:
  Phân công điều trị (Z) → Dùng thuốc (A) → Kết quả (Y)
                                    ↑
  Tuổi (C) ─────────────────────→ (C) → Y
```

**Quy tắc d-separation**: Hai biến là d-separated (điều kiện độc lập) khi đã kiểm soát một tập biến S, nếu mọi đường nối chúng đều bị "chặn" bởi S. Kiểm soát confounder (trên backdoor path) → chặn tốt. Kiểm soát collider → mở path mới → tạo bias!

> ⚠ **Lỗi thường gặp**: "Kiểm soát nhiều biến hơn = tốt hơn." SAI. Kiểm soát mediator làm underestimate causal effect; kiểm soát collider tạo ra bias mới. Phải có DAG để quyết định nên kiểm soát biến nào.

> 🔁 **Dừng lại tự kiểm tra**:
> 1. Một nghiên cứu thấy: người uống cà phê → ít bị Parkinson hơn. Liệt kê 2 confounders tiềm năng và 1 mediator có thể có.
> <details><summary>Đáp án</summary>
> Confounders: (1) Hút thuốc — hút thuốc vừa giảm uống cà phê vừa có tương quan nghịch với Parkinson (thực tế nicotine có thể bảo vệ thần kinh — confounding phức tạp); (2) Mức độ hoạt động thể chất — người năng động hơn uống cà phê nhiều hơn và ít Parkinson hơn. Mediator: dopamine pathway — cà phê (caffeine) ảnh hưởng receptor adenosine → ảnh hưởng dopamine → bảo vệ tế bào thần kinh dopaminergic.
> </details>

---

## 3. Nghịch lý Simpson (Simpson's Paradox)

### 3.1. Định nghĩa

> 💡 **Trực giác**: Một xu hướng xuất hiện trong mỗi nhóm con, nhưng khi gộp tất cả lại, xu hướng đó đảo chiều. Giống như đội nào cũng thắng từng set, nhưng khi tính tổng lại thua.

Nghịch lý Simpson xảy ra khi có **confounding variable** ảnh hưởng đến cả tỷ lệ được chọn vào nhóm lẫn kết quả.

### 3.2. Ví dụ UC Berkeley 1973 (dữ liệu thực)

Năm 1973, UC Berkeley bị kiện phân biệt giới tính trong tuyển sinh sau đại học. Dữ liệu tổng:

| Giới | Nộp đơn | Được nhận | Tỷ lệ nhận |
|------|:---:|:---:|:---:|
| Nam | 8442 | 3738 | **44.3%** |
| Nữ | 4321 | 1494 | **34.6%** |

Nhìn tổng: Nam được nhận nhiều hơn nữ (44.3% vs 34.6%). Có vẻ phân biệt giới tính!

**Nhưng khi phân tách theo khoa (6 khoa lớn nhất)**:

| Khoa | Nam nộp | Nam nhận | % nam | Nữ nộp | Nữ nhận | % nữ |
|------|:---:|:---:|:---:|:---:|:---:|:---:|
| A | 825 | 512 | **62%** | 108 | 89 | **82%** |
| B | 560 | 353 | **63%** | 25 | 17 | **68%** |
| C | 325 | 120 | **37%** | 593 | 202 | **34%** |
| D | 417 | 138 | **33%** | 375 | 131 | **35%** |
| E | 191 | 53 | **28%** | 393 | 94 | **24%** |
| F | 272 | 16 | **6%** | 341 | 24 | **7%** |

**Trong 4/6 khoa, tỷ lệ nhận của NỮ CÁO HƠN HOẶC BẰNG nam!** (Khoa A: 82% vs 62%, Khoa B: 68% vs 63%, Khoa D: 35% vs 33%, Khoa F: 7% vs 6%)

**Giải thích tại sao tổng lại nghiêng về nam**:

- Nữ nộp đơn vào các khoa **khó hơn** (C, E, F: tỷ lệ nhận 6-37%).
- Nam nộp đơn vào các khoa **dễ hơn** (A, B: tỷ lệ nhận 62-63%).
- Khi gộp tổng, sự chênh lệch trong "chọn khoa" (confounding variable = khoa đăng ký) tạo ra ảo giác phân biệt giới tính.

**Biến confounding**: Khoa đăng ký (department). Nó ảnh hưởng cả (1) tỷ lệ nữ trong khoa lẫn (2) tỷ lệ nhận của khoa.

### 3.3. Ví dụ 2 — Điều trị sỏi thận (dữ liệu thực, Charig et al. 1986)

Hai phương pháp phẫu thuật: A (mổ mở) và B (ít xâm lấn).

**Tổng**:

| Phương pháp | Thành công | Tổng | Tỷ lệ thành công |
|------------|:---:|:---:|:---:|
| A (mổ mở) | 273 | 350 | **78%** |
| B (ít xâm lấn) | 289 | 350 | **83%** |

Có vẻ B tốt hơn A. Nhưng phân theo kích thước sỏi:

| Loại | Phương pháp A | Thành công A | Phương pháp B | Thành công B |
|------|:---:|:---:|:---:|:---:|
| Sỏi nhỏ (< 2cm) | 87 bệnh nhân | 81 (93%) | 270 bệnh nhân | 234 (87%) |
| Sỏi lớn (≥ 2cm) | 263 bệnh nhân | 192 (73%) | 80 bệnh nhân | 55 (69%) |

Trong cả hai nhóm (sỏi nhỏ và sỏi lớn), phương pháp **A tốt hơn B**!

**Giải thích**: Bác sĩ có xu hướng chỉ định phương pháp A (mổ mở, phức tạp hơn) cho sỏi **lớn** — ca khó hơn. Phương pháp B (ít xâm lấn) được dùng nhiều cho sỏi **nhỏ** — ca dễ hơn. Khi gộp tổng, B nhìn tốt hơn vì nó được áp dụng chủ yếu cho ca dễ.

> ⚠ **Lỗi thường gặp**: Nhìn tổng rồi kết luận. Bao giờ cũng hỏi "có biến nào ảnh hưởng cả việc phân nhóm lẫn kết quả không?" — đó chính là dấu hiệu của Simpson's paradox tiềm năng.

> ❓ **Câu hỏi tự nhiên**:
>
> **Q: Vậy số liệu tổng hay phân nhóm mới đúng?**
> A: Tùy câu hỏi nhân quả. Nếu hỏi "tôi nên chọn phương pháp nào?" → dùng phân nhóm (A tốt hơn cho cả sỏi nhỏ lẫn lớn → chọn A). Nếu hỏi "trên toàn bộ bệnh nhân được điều trị, ai có outcome tốt hơn?" → có thể dùng tổng, nhưng phải nhận thức rõ confounding.
>
> **Q: Làm sao biết có Simpson's paradox không?**
> A: Khi có biến phân loại ảnh hưởng đến cả (1) tỷ lệ phân vào nhóm can thiệp và (2) kết quả. Dấu hiệu: nhóm có tỷ lệ được điều trị thấp hơn lại có baseline outcome cao hơn (hoặc ngược lại).

> 🔁 **Dừng lại tự kiểm tra**:
> 1. Một nghiên cứu thấy: ở bệnh viện A, tỷ lệ tử vong = 2.2%. Ở bệnh viện B = 1.8%. Khi phân theo mức độ bệnh (nhẹ/nặng), bệnh viện A đều có tỷ lệ tử vong thấp hơn B. Giải thích.
> <details><summary>Đáp án</summary>
> Đây là Simpson's paradox. Bệnh viện A là trung tâm chuyên khoa → nhận nhiều ca nặng hơn B. Ca nặng → tỷ lệ tử vong cao hơn dù bác sĩ A giỏi hơn. Khi tính tổng, tỷ lệ cao hơn của ca nặng ở A kéo tổng tử vong lên. Bệnh viện A thực ra TỐT hơn khi kiểm soát mức độ bệnh.
> </details>

> 📝 **Tóm tắt mục 3**:
> - Simpson's paradox: xu hướng trong từng nhóm con đảo ngược khi gộp tổng.
> - Nguyên nhân: confounding variable ảnh hưởng cả tỷ lệ phân nhóm lẫn kết quả.
> - Giải pháp: phân tích phân tầng (stratified analysis) và kiểm soát confounders.

---

## 4. RCT — Tiêu chuẩn vàng

### 4.1. Tại sao RCT giải quyết được confounding?

> 💡 **Trực giác**: Trong RCT, ta tung đồng xu để quyết định ai nhận điều trị. Điều này đảm bảo nhóm điều trị và nhóm kiểm soát giống nhau về TẤT CẢ các biến khác (cả đo được lẫn không đo được) — vì phân công là ngẫu nhiên, không phụ thuộc vào bất kỳ đặc điểm nào của bệnh nhân.

**RCT (Randomized Controlled Trial)** là thí nghiệm trong đó:
1. Tuyển chọn mẫu ngẫu nhiên từ dân số target.
2. **Phân công ngẫu nhiên** (random assignment) vào nhóm can thiệp (treatment) hay nhóm chứng (control).
3. Đo kết quả.

**Cơ chế loại bỏ confounding**:

Confounding xảy ra khi việc ai "nhận điều trị" phụ thuộc vào confounders. Trong RCT, phân công là ngẫu nhiên → không phụ thuộc vào bất kỳ confounders nào → cân bằng confounders giữa hai nhóm.

Ví dụ: Nghiên cứu aspirin và đau tim không dùng RCT → người có nguy cơ tim mạch cao hơn sẽ được cho aspirin nhiều hơn → confounding. Với RCT: phân công ngẫu nhiên → nhóm aspirin và nhóm placebo có cùng mức nguy cơ baseline.

### 4.2. A/B Testing = RCT trong tech

A/B testing trong sản phẩm số là **RCT được áp dụng vào digital**:

| Thuật ngữ thống kê | Thuật ngữ A/B testing |
|--------------------|-----------------------|
| Treatment group | Variant B |
| Control group | Variant A (current) |
| Random assignment | Random user allocation |
| Outcome | Metric (CTR, conversion, revenue) |
| Confounders | Time of day, device, geography |
| Randomization unit | User ID, session |

**Tại sao phải random assignment (không phải random sampling)?**

Random sampling cho phép suy luận từ mẫu ra dân số (external validity). Random assignment cho phép kết luận nhân quả (internal validity). RCT tốt cần cả hai, nhưng internal validity (causation) đặc biệt quan trọng cho quyết định can thiệp.

### 4.3. Observational study vs RCT

Khi không thể làm RCT (vô đạo đức, không khả thi), ta dùng observational study và cố gắng kiểm soát confounders:

| Phương pháp | Kiểm soát confounders | Khả thi | Ví dụ |
|------------|:---:|:---:|-------|
| RCT | Tất cả (kể cả ẩn) | Khó/tốn kém | Thử thuốc mới |
| Observational + regression | Chỉ đo được | Dễ | Hút thuốc và ung thư |
| Matching | Đo được | Trung bình | Hiệu quả chính sách |
| Diff-in-diff | Đo được + time-invariant | Trung bình | Kinh tế học |
| Instrumental variable | Ẩn (nếu có IV tốt) | Khó | Kinh tế lao động |
| Regression discontinuity | Xung quanh ngưỡng | Trung bình | Chính sách ngưỡng |

> ⚠ **Lỗi thường gặp**: Gọi A/B test là "experiment" nhưng quên kiểm soát novelty effect (người dùng tò mò với UI mới → click nhiều hơn ban đầu, giảm sau vài ngày). Giải pháp: chạy đủ dài.

> ❓ **Câu hỏi tự nhiên**:
>
> **Q: Nếu mẫu RCT nhỏ, ngẫu nhiên có đảm bảo cân bằng confounders không?**
> A: Về kỳ vọng thì có, nhưng với mẫu nhỏ vẫn có thể có imbalance ngẫu nhiên. Đó là lý do cần kiểm tra baseline balance table (so sánh đặc điểm nhóm trước can thiệp). Với mẫu lớn, imbalance ngẫu nhiên rất nhỏ.
>
> **Q: NHÓM NÀO là "treatment" trong RCT là giả định của tôi, vậy kết quả RCT có khách quan không?**
> A: RCT đo Average Treatment Effect (ATE) = E[Y(1) - Y(0)]. Câu hỏi "điều trị gì" do nhà nghiên cứu quyết định (subjective). Nhưng khi đã xác định treatment, RCT đo nhân quả của treatment đó một cách khách quan.

---

## 5. Do-calculus và Intervention — giới thiệu nhẹ

### 5.1. Toán tử do()

Judea Pearl (2018 Turing Award) phát triển do-calculus để phân biệt:

- **Quan sát**: P(Y | X = x) — "Biết X = x, Y là gì?"
- **Can thiệp**: P(Y | do(X = x)) — "Nếu ta **ép** X = x (bất kể confounders), Y là gì?"

**Sự khác biệt sống còn**:

P(Y | X = x): khi ta thấy người uống thuốc (X=1), họ có thể đã uống vì bệnh nặng (confounder). P(Y | X=1) bị confound.

P(Y | do(X = 1)): ta **can thiệp**, ép ngẫu nhiên mọi người uống thuốc bất kể bệnh nặng hay không. Đây là điều RCT làm.

### 5.2. Backdoor criterion

Để tính P(Y | do(X)) từ dữ liệu quan sát (không có RCT), cần kiểm soát tập biến Z sao cho Z "block tất cả backdoor paths" từ X đến Y (các đường từ X đến Y đi "ngược" qua confounders, không đi xuôi chiều nhân quả).

**Ví dụ**:

```
DAG:
  Tuổi (C) → Điều trị (X)
  Tuổi (C) → Kết quả (Y)
  Điều trị (X) → Kết quả (Y)
```

Backdoor path: X ← C → Y. Kiểm soát C → block backdoor path → có thể ước lượng P(Y | do(X)).

**Backdoor formula**:
```
P(Y | do(X)) = Σ_c P(Y | X, C=c) × P(C=c)
```
(Tổng trọng số theo phân phối của confounder C, lấy trung bình trên toàn dân số)

Đây là cơ sở lý thuyết của **regression adjustment** và **stratified analysis** trong observational study.

> 📝 **Tóm tắt mục 5**:
> - Quan sát P(Y|X) ≠ Can thiệp P(Y|do(X)) khi có confounders.
> - RCT thực hiện do(X) trực tiếp bằng randomization.
> - Observational study cần DAG + kiểm soát đúng confounders để xấp xỉ do(X).

---

## Bài tập

1. **Phân loại biến**: Trong nghiên cứu "Bài tập thể dục (A) → Sức khỏe tim mạch (Y)", phân loại mỗi biến sau là confounder, mediator, hay collider: (a) Tuổi, (b) Giảm cân (weight loss), (c) Nhập viện tim mạch (nếu ta nghiên cứu trong số bệnh nhân nhập viện).

2. **Simpson's paradox**: Dataset sau đây có nghịch lý Simpson không? Giải thích.
   - Vaccine A: Nhóm trẻ: 200/1000 = 20% mắc bệnh; Nhóm già: 100/200 = 50% mắc bệnh. Tổng: 300/1200 = 25%.
   - Placebo B: Nhóm trẻ: 50/200 = 25% mắc bệnh; Nhóm già: 400/800 = 50% mắc bệnh. Tổng: 450/1000 = 45%.

3. **RCT design**: Một công ty muốn biết liệu thêm chat box vào trang web (A) có tăng conversion rate (Y) không. Mô tả cách thiết kế A/B test đúng cách: (a) đơn vị phân ngẫu nhiên, (b) outcome chính, (c) biến nào có thể gây confounding nếu không randomize.

4. **Do-calculus**: Dữ liệu quan sát cho thấy: P(Y=1 | X=1) = 0.8, P(Y=1 | X=0) = 0.3. Biết confounder C (P(C=1)=0.4) và P(Y=1|X=1,C=1)=0.9, P(Y=1|X=1,C=0)=0.7, P(Y=1|X=0,C=1)=0.5, P(Y=1|X=0,C=0)=0.2. Tính P(Y=1|do(X=1)) và P(Y=1|do(X=0)) bằng backdoor formula.

---

## Lời giải chi tiết

### Bài 1

**(a) Tuổi** — **Confounder**: Tuổi ảnh hưởng cả mức độ tập luyện (người trẻ tập nhiều hơn) lẫn sức khỏe tim mạch. Không nằm trên đường nhân quả A → Y.

**(b) Giảm cân** — **Mediator**: Bài tập → Giảm cân → Tim mạch tốt hơn. Giảm cân nằm trên đường nhân quả từ A đến Y. Không nên kiểm soát nó nếu muốn đo tổng hiệu ứng của bài tập lên tim mạch.

**(c) Nhập viện tim mạch** — **Collider**: Cả bài tập ít (A thấp) lẫn yếu tố di truyền đều ảnh hưởng đến nhập viện. Nếu nghiên cứu trong số bệnh nhân nhập viện (điều kiện hóa trên collider), có thể tạo ra tương quan giả giữa bài tập và các yếu tố khác.

### Bài 2

**Kiểm tra từng nhóm**:
- Nhóm trẻ: A = 20%, B = 25% → A tốt hơn (thấp hơn) ✓
- Nhóm già: A = 50%, B = 50% → Bằng nhau ✓
- **Tổng**: A = 25%, B = 45% → A tốt hơn rõ ràng ✓

**Không có Simpson's paradox** vì xu hướng (A tốt hơn hoặc bằng B) nhất quán trong từng nhóm và tổng. Tổng A thấp hơn B chủ yếu vì vaccine A được phân phối nhiều cho nhóm trẻ (1000 vs 200 người trẻ dùng A), mà nhóm trẻ có baseline tỷ lệ bệnh thấp hơn. Đây là **confounding** (phân phối vaccine theo tuổi), nhưng không tạo ra đảo chiều.

### Bài 3

**(a) Đơn vị phân ngẫu nhiên**: User ID (để mỗi user chỉ thấy một phiên bản, tránh spillover effects). Không randomize theo session vì cùng một user có thể thấy cả hai phiên bản → confounding giữa các session.

**(b) Outcome chính**: Conversion rate (số user mua hàng / tổng user). Cần chọn trước khi chạy thí nghiệm để tránh multiple testing.

**(c) Confounders nếu không randomize**: (1) Thời gian trong ngày — sáng/tối có hành vi khác nhau; (2) Thiết bị — mobile/desktop; (3) Nguồn traffic — organic search vs paid ads vs social; (4) Vị trí địa lý. Random assignment đảm bảo tất cả các biến này phân phối đều nhau giữa nhóm A và B.

### Bài 4

**Backdoor formula**: P(Y=1 | do(X=x)) = Σ_c P(Y=1 | X=x, C=c) × P(C=c)

**P(Y=1 | do(X=1))**:
```
= P(Y=1|X=1,C=1) × P(C=1) + P(Y=1|X=1,C=0) × P(C=0)
= 0.9 × 0.4 + 0.7 × 0.6
= 0.36 + 0.42
= 0.78
```

**P(Y=1 | do(X=0))**:
```
= P(Y=1|X=0,C=1) × P(C=1) + P(Y=1|X=0,C=0) × P(C=0)
= 0.5 × 0.4 + 0.2 × 0.6
= 0.20 + 0.12
= 0.32
```

**Average Treatment Effect (ATE)**:
```
ATE = P(Y=1|do(X=1)) - P(Y=1|do(X=0)) = 0.78 - 0.32 = 0.46
```

**So sánh với naive estimate từ quan sát**:
- P(Y=1|X=1) - P(Y=1|X=0) = 0.8 - 0.3 = 0.5

Naive estimate (0.5) lớn hơn ATE thật (0.46) — sai số do confounding. Người nhận X=1 trong quan sát có xu hướng có C=1 nhiều hơn → confounding làm overestimate hiệu ứng nhân quả.

---

## Bài tiếp theo

[Lesson 03: Time Series cơ bản →](../lesson-03-time-series-basics/README.md)

Từ suy luận nhân quả (quan hệ giữa các biến), ta chuyển sang một loại data đặc biệt cần kỹ thuật riêng: **dữ liệu theo thời gian**.

---

## Tham khảo

- Pearl, J. & Mackenzie, D. — *The Book of Why* (2018) — nền tảng causal inference, rất dễ đọc.
- Hernan, M. & Robins, J. — *Causal Inference: What If* — sách giáo khoa kỹ thuật, miễn phí online.
- Bickel, P.J. et al. (1975) — "Sex Bias in Graduate Admissions: Data from Berkeley" — Science — bài báo gốc về Berkeley 1973.
- Charig, C.R. et al. (1986) — "Comparison of treatment of renal calculi..." — British Medical Journal — bài báo gốc về kidney stone paradox.
- Vigen, T. — [Spurious Correlations](https://tylervigen.com/spurious-correlations) — database tương quan vô nghĩa.
