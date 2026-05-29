# Lesson 04 — Research Methods & Ethics: Psychology như một khoa học

## Mục tiêu học tập

Sau bài này bạn sẽ:
- Phân biệt experiment, quasi-experiment, và correlational study — biết loại nào cho phép kết luận nhân quả.
- Giải thích được 4 loại validity và tại sao từng loại quan trọng.
- Mô tả được các vi phạm đạo đức lịch sử và lý do IRB ra đời.
- Hiểu replication crisis: tại sao xảy ra, bằng chứng cụ thể, và các biện pháp khắc phục.
- Biết p-hacking là gì, tại sao nguy hiểm, và preregistration giải quyết vấn đề đó thế nào.

## Kiến thức tiền đề

- [T3-L05 — Statistics in Psychology](../lesson-05-statistics-in-psychology/) *(sẽ học kỹ hơn)*: hiểu cơ bản p-value và statistical significance sẽ hữu ích.
- Không bắt buộc: kiến thức thống kê chi tiết không cần thiết để hiểu conceptual ideas.

---

## 1. Phương pháp nghiên cứu — Ladder of Causation

💡 **Trực giác**: "Uống cà phê → sống lâu hơn" — thấy trong báo. Nhưng đây là *correlation* hay *causation*? Để biết, cần hiểu cấu trúc của study. Không phải mọi study đều như nhau trong khả năng kết luận nhân quả.

### 1.1 Experimental Design (Thiết kế thực nghiệm)

**Điều kiện để thực nghiệm thật sự**:
1. **Manipulation of IV (independent variable)**: researcher thay đổi biến nguyên nhân.
2. **Measurement of DV (dependent variable)**: đo kết quả.
3. **Random assignment**: phân ngẫu nhiên người tham gia vào nhóm experimental và control.
4. **Control group**: nhóm không nhận can thiệp (so sánh baseline).

**Random assignment** là điều tạo ra causation. Tại sao? Vì randomization đảm bảo confounders (biến gây nhiễu) được phân bố *đều* giữa các nhóm — do đó không thể là nguyên nhân của sự khác biệt kết quả.

**Ví dụ chuẩn**:
- Nghiên cứu CBT cho MDD: Random assign 60 người MDD → 30 vào CBT, 30 vào waitlist control.
- Sau 12 tuần: CBT group score BDI giảm 8 điểm, control giảm 2 điểm.
- Vì random assignment → sự khác biệt 6 điểm có thể được *attributed* cho CBT → **causal inference**.

### 1.2 Quasi-Experimental Design

**Khi random assignment không thể hoặc không được phép**:
- Natural experiments: tự nhiên tạo ra điều kiện "tương tự experiment" (vd: policy changes, natural disasters).
- Pre-post design: đo trước-sau can thiệp, không có control group thực sự.

**Hạn chế**: không thể loại trừ confounders hoàn toàn → kết luận nhân quả yếu hơn.

### 1.3 Correlational Design

**Không có manipulation**. Đo 2 biến, tính correlation.

**Ví dụ**: Lo âu của cha mẹ và con cái r = 0.35. Có thể giải thích bằng:
1. Parent anxiety → child anxiety (ảnh hưởng môi trường).
2. Child anxiety → parent anxiety (reverse causation).
3. Common genetic factor → cả hai (third variable).

⚠ **Lỗi thường gặp**: "nghiên cứu cho thấy X liên quan đến Y" ≠ "X gây ra Y". Media thường đơn giản hóa correlation thành causation.

**Ví dụ kinh điển về confounding**: Ice cream sales và drowning deaths có tương quan cao (~0.9). Confounding variable: **mùa hè** (→ cả hai tăng). Ice cream không gây chết đuối.

### 1.4 Longitudinal vs Cross-Sectional

**Longitudinal**: theo dõi cùng người theo thời gian. Tốn kém, mất dữ liệu, nhưng thấy được developmental change thật.
**Cross-sectional**: chụp nhanh nhiều nhóm tuổi tại cùng một thời điểm. Nhanh, rẻ, nhưng confound với *cohort effects* (thế hệ khác nhau có trải nghiệm khác nhau).

**Ví dụ cohort effect**: So sánh IQ người 70 tuổi với người 30 tuổi trong 2024. Người 70 tuổi có IQ thấp hơn → do aging, hay do education khác nhau giữa hai thế hệ?

---

## 2. Validity — Bốn loại giá trị của nghiên cứu

| Validity | Câu hỏi | Threats |
|----------|---------|---------|
| **Internal** | Có phải IV *thật sự* gây ra DV? | Confounders, history effects, selection bias |
| **External** | Kết quả có generalize ra ngoài sample? | WEIRD sample, lab vs real life |
| **Construct** | Đo lường có thật sự đo *construct* mong muốn? | Poor operationalization |
| **Statistical conclusion** | Kết luận thống kê có đúng không? | Low power, Type I/II error |

**WEIRD problem**: phần lớn tâm lý học dựa trên mẫu **W**estern, **E**ducated, **I**ndustrialized, **R**ich, **D**emocratic (Henrich et al., 2010). ~70% nghiên cứu dùng sinh viên đại học Mỹ làm participant. Generalizability sang văn hóa khác thường không được kiểm tra.

❓ **Câu hỏi tự nhiên**:
- *"Tại sao không phải lúc nào cũng dùng experiment?"* — Không thể random assign người vào "có sang chấn tâm lý" hoặc "nghèo" để nghiên cứu effect. Ethical và practical constraints.
- *"Internal vs external validity có tradeoff không?"* — Có. Lab experiments (high internal) thường artificial (low external). Field studies (high external) khó control (low internal).

---

## 3. Ethics — Đạo đức nghiên cứu và IRB

💡 **Tại sao cần IRB?**: Lịch sử cho thấy nếu không có oversight, researcher có thể tổn hại participants.

### 3.1 Ba vi phạm lịch sử quan trọng

**Tuskegee Syphilis Study (1932–1972)**:
- USPHS nghiên cứu tiến triển tự nhiên của syphilis ở 399 đàn ông da đen nghèo ở Alabama.
- Không informed consent, không được điều trị dù penicillin đã có từ 1947.
- 28 chết vì syphilis, 100 biến chứng, 40 vợ lây, 19 trẻ sinh ra với syphilis.
- Bị phát hiện 1972, dẫn đến National Research Act 1974 và Belmont Report.

**Milgram Obedience Experiments (1961–1963)**:
- Participants được cho là "giáo viên", ép phải điện giật "học sinh" (confederate) lên đến 450V.
- 65% tuân lệnh đến mức tối đa.
- Vi phạm: extreme distress, deception quan trọng, không thể withdraw thoải mái.
- Hiện tại: replication crisis (Stanford Prison cũng có vấn đề methodology).

**Stanford Prison Experiment (Zimbardo, 1971)**:
- 24 sinh viên random assign vào "tù nhân" và "cai ngục".
- Bị dừng sau 6 ngày thay vì 2 tuần vì abuse.
- Vi phạm: không đủ informed consent, không protect từ harm.
- **Replication issues**: Zimbardo là principal investigator VÀ "superintendent" — conflict of interest. Recent research cho thấy "guards" có thể đã được hướng dẫn behave aggressively. Kết quả không robust như được claim.

### 3.2 Belmont Report (1979) và IRB

**Ba nguyên tắc Belmont**:
1. **Respect for Persons**: autonomous decision, protect vulnerable.
2. **Beneficence**: maximize benefits, minimize harms.
3. **Justice**: distribute benefits and burdens fairly.

**IRB (Institutional Review Board)** requirements:
- **Informed consent**: participants phải hiểu rõ nghiên cứu, risks, benefits, và có quyền rút lui bất cứ lúc nào.
- **Debriefing**: sau deception, phải giải thích đầy đủ.
- **Deception**: chỉ cho phép khi (1) cần thiết, (2) không gây harm, (3) có debriefing.
- **Confidentiality**: bảo vệ danh tính và dữ liệu.
- **Right to withdraw**: không punishment.

**Animal research**: IACUC (Institutional Animal Care and Use Committee) — 3 R's: Replace (thay thế động vật nếu có thể), Reduce (giảm số lượng), Refine (giảm pain).

📝 **Tóm tắt mục 3**: Ba vi phạm lịch sử → Belmont Report → IRB → Informed consent + Debriefing + Confidentiality + Right to withdraw.

---

## 4. Replication Crisis — Khi Khoa học Phải Tự Xét Lại

💡 **Hình dung**: Năm 2015, nhóm 270 nhà nghiên cứu thử tái lập 100 nghiên cứu tâm lý học đã được công bố trên tạp chí hàng đầu. Kết quả gây chấn động cả ngành.

### 4.1 Open Science Collaboration (2015)

**Thiết kế**: Tái lập chính xác 100 nghiên cứu tâm lý học từ 3 tạp chí top (Psychological Science, JEP:General, JPSP) năm 2008.

**Kết quả**:
- **97%** nghiên cứu gốc có kết quả significant (p < 0.05).
- Chỉ **36–39%** replications có kết quả significant.
- Effect size trung bình replications = **~50%** của nghiên cứu gốc.
- Ngay cả những replications "thành công" cũng thường có effect size nhỏ hơn đáng kể.

**Ý nghĩa**: Phần lớn những gì đã được "proven" trong tâm lý học có thể không robust như nghĩ.

### 4.2 Các finding nổi tiếng đã thất bại

**Ego depletion** (Baumeister, 1998):
- Gốc: self-control là finite resource — dùng willpower cho task A → ít willpower hơn cho task B.
- Đã được dạy trong hầu hết intro psych courses.
- Meta-analysis 2016 (Hagger et al., 23 labs): **effect size near zero** sau correction.
- Vấn đề: publication bias (chỉ publish positive results) + small sample sizes + p-hacking.

**Power posing** (Cuddy, 2010):
- Gốc: đứng tư thế "siêu anh hùng" 2 phút → tăng testosterone, giảm cortisol, tăng confidence.
- Original study: d ≈ 0.4, n=42, effect tâm lý hành vi.
- 5-year replication (Ranehill et al. 2015, n=200): hormone effects d ≈ 0.06 (không significant).
- Lưu ý: có thể có small behavioral effect nhưng không phải hormone.

**Facial feedback hypothesis** (Strack, 1988):
- Gốc: ngậm bút trong miệng theo cách tạo nụ cười → đánh giá cartoons là buồn cười hơn.
- Multi-lab replication 2016 (17 labs, 1,894 participants): **không replicate**.
- Possible explanation: effect nhỏ, demand characteristics, context-dependent.

**Priming effects** (John Bargh):
- Nhiều classic priming studies thất bại replication.
- Florida effect: đọc words liên quan đến "người già" → đi chậm hơn → không replicate.

### 4.3 Tại sao Replication Crisis xảy ra?

**P-hacking** (researcher degrees of freedom):
- Researcher có nhiều lựa chọn: loại outliers nào? Covariate nào thêm? Biến DV nào chọn? Khi nào dừng collect data?
- Mỗi lựa chọn này có thể "push" p-value qua ngưỡng 0.05.
- **Ví dụ số**: Nếu thực hiện 20 independent t-tests trên random data, kỳ vọng ~1 test sẽ significant (p < 0.05) do chance alone (0.05 × 20 = 1).

**Publication bias**:
- Tạp chí chỉ publish kết quả significant.
- Nghiên cứu null result → file drawer problem (không ai biết).
- Dẫn đến: literature bị skewed positive.

**HARKing** (Hypothesizing After Results are Known):
- Present post-hoc hypotheses như được đặt ra *trước* khi data collection.
- "Tôi đã thấy pattern trong data → bây giờ viết như đây là hypothesis ban đầu của tôi."

**Small sample sizes**:
- Nhiều classic studies n < 50 per group.
- Với power thấp, những studies "successful" thường là overestimates of true effect (winner's curse).

### 4.4 Giải pháp — Open Science

**Preregistration**:
- Đăng ký *trước* khi thu thập data: hypothesis, design, planned analyses, sample size.
- Platforms: OSF (Open Science Framework), AsPredicted.
- Ngăn HARKing và p-hacking vì đã "commit" trước.
- "Registered Reports": tạp chí quyết định accept *trước* khi xem kết quả, dựa trên methodology.

**Larger sample sizes + power analysis**:
- Power ≥ 0.80 là convention (xem L05).
- Nhiều nghiên cứu classic chạy với power ~0.30–0.40.

**Effect size reporting**:
- Report d, η², r — không chỉ "p < 0.05".
- p-value nói "có hiệu ứng không?" nhưng không nói "hiệu ứng lớn bao nhiêu?"

**Open data + open materials**:
- Chia sẻ raw data và analysis code → người khác verify.

**Multi-site replication**:
- Many Labs projects: cùng study được chạy ở 20+ labs → estimate true effect size tốt hơn.

❓ **Câu hỏi tự nhiên**:
- *"Replication crisis có nghĩa là tâm lý học vô dụng?"* — Không. Nhiều findings vẫn robust (CBT effect sizes, attachment theory, cognitive biases đã replicated nhiều lần). Crisis là dấu hiệu khoa học đang tự sửa chữa.
- *"Tại sao không phát hiện sớm hơn?"* — Vì incentive structure: career advancement phụ thuộc vào publish, publish phụ thuộc vào significant results. Open science thay đổi incentives này.
- *"Chỉ tâm lý học bị ảnh hưởng?"* — Không — replication crisis cũng xuất hiện trong medicine, economics, cancer biology. Tâm lý học chỉ là ngành đầu tiên tự kiểm tra một cách có hệ thống.

📝 **Tóm tắt mục 4**: OSC 2015: chỉ 36–39% replicate. Nguyên nhân: p-hacking, pub bias, small n, HARKing. Giải pháp: preregistration, open data, multi-site replication, effect size focus.

---

## 5. Bài tập thực hành

**Bài tập 1 — Phân loại study design**:
Phân loại mỗi nghiên cứu: experimental, quasi-experimental, hay correlational? Loại nào cho phép kết luận nhân quả?

a) 200 sinh viên ngẫu nhiên chia 2 nhóm: một nhóm ngủ 8 tiếng, nhóm kia 6 tiếng. Sau 1 tuần đo memory test.

b) Khảo sát 500 người: đo số giờ ngủ/đêm và GPA. Tìm thấy r = 0.35.

c) Nhà nghiên cứu so sánh cognitive outcomes của trẻ sinh trong vùng bị ảnh hưởng bởi Chernobyl vs vùng không bị ảnh hưởng (không có random assignment).

d) Một therapist đo depression scores khách hàng trước và sau 12 tuần CBT (không có control group).

**Bài tập 2 — P-hacking simulation (concept)**:

Giả sử bạn đặt coin vào túi áo, và sau khi ngồi vào bàn, bạn flip 100 lần và xem bao nhiêu Head. Bạn thực hiện experiment này 20 lần liên tiếp với 20 chiếc đồng xu khác nhau.

a) Nếu α = 0.05, kỳ vọng bao nhiêu lần bạn sẽ "có kết quả significant" chỉ do chance?
b) Tại sao điều này liên quan đến p-hacking?
c) Preregistration giải quyết vấn đề này thế nào?

**Bài tập 3 — Ethics scenario**:

Một nhà nghiên cứu muốn nghiên cứu "trung thực tự phát" bằng cách bỏ ví thử (với tiền thật) ở những nơi công cộng và quan sát ai nhặt mà không trả lại. Họ không xin consent ai.

a) Vi phạm nguyên tắc IRB nào?
b) IRB có thể approve không? Với điều kiện gì?
c) Có alternative design ít vi phạm đạo đức hơn không?

---

## 6. Lời giải chi tiết

### Bài 1:

a) **Experimental** — có random assignment, manipulation (giờ ngủ), control group. Cho phép kết luận nhân quả: "Ngủ 6 tiếng *gây ra* giảm memory so với 8 tiếng."

b) **Correlational** — không có manipulation, chỉ observe. Cho phép kết luận tương quan (r=0.35): ngủ nhiều hơn có liên quan đến GPA cao hơn. Không thể kết luận nhân quả — có thể confounded bởi: self-discipline (cùng trait → cả ngủ đủ + học tốt), anxiety (high anxiety → ngủ ít + học kém), socioeconomic status.

c) **Quasi-experimental** — có comparison group nhưng không random assignment. Địa điểm sinh không phải random → nhóm có thể khác nhau về nhiều yếu tố (cha mẹ giàu hơn có thể di chuyển khỏi vùng ô nhiễm). Kết luận nhân quả yếu hơn experiment thật sự.

d) **Pre-post design (quasi-experimental)** — không có control group. Không thể biết liệu cải thiện do CBT hay do: time healing, regression to the mean, Hawthorne effect (người tham gia cải thiện vì biết mình đang được observe).

### Bài 2:

a) 20 experiments × α=0.05 = kỳ vọng **1 experiment "significant" chỉ do chance** (familywise error rate = 1 - 0.95^20 ≈ 64% có ít nhất 1 false positive).

b) P-hacking: researcher thực hiện nhiều analyses, chỉ report cái có p < 0.05 — tương tự chạy 20 experiments rồi chỉ báo cáo cái "có kết quả". Mỗi analysis thêm → xác suất false positive tăng.

c) Preregistration: trước khi nhìn data, researcher phải khai báo: "Tôi chỉ chạy analysis này, với sample size này, đo DV này." Sau đó không thể "thêm analysis" mà không thừa nhận là exploratory.

### Bài 3:

a) **Vi phạm**:
- **Informed consent**: người bị quan sát không biết họ đang tham gia nghiên cứu.
- **Respect for Persons**: không tôn trọng quyền tự quyết.
- **Potential for harm**: nếu người nhặt ví bị nhận diện và gây xấu hổ.

b) **IRB có thể approve** nếu: (1) nghiên cứu không gây harm đáng kể, (2) không thể thực hiện với informed consent (vì sẽ thay đổi hành vi), (3) có debriefing tổng thể sau nghiên cứu, (4) dữ liệu hoàn toàn anonymous. IRB sẽ yêu cầu justification về tại sao deception cần thiết.

c) **Alternative designs**:
- Scenario study (lab): đưa participants vào situation mô phỏng tìm thấy ví → ít deception hơn, vẫn có ecological validity một phần.
- Survey: hỏi trực tiếp về moral reasoning (ít ecological validity hơn nhưng không deception).
- Archival: phân tích lost-and-found reports tại các địa điểm — không có individual privacy issue.

---

## Bài học tiếp theo

→ [Lesson 05 — Statistics in Psychology](../lesson-05-statistics-in-psychology/): đã hiểu tại sao p-value và effect size quan trọng, bài tiếp theo đi sâu vào cách tính t-test, ANOVA, Cohen's d, và statistical power.

**Bridge sang Statistics**: [Statistics/02-Inferential/lesson-06-pvalue-power-effect](../../../Statistics/02-Inferential/lesson-06-pvalue-power-effect/) — kiến trúc đầy đủ về p-value, power, effect size.

---

*[visualization.html](./visualization.html) — IRB ethics checker, p-hacking simulator, effect size chart, replication crisis visualization.*
