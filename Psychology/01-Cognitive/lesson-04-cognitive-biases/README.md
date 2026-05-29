# Lesson 04: Cognitive Biases

> **Tầng 1 — Cognitive Psychology · Psychology**

## Mục tiêu học tập

1. Phân biệt heuristics (shortcuts hữu ích) và biases (sai lệch có hệ thống).
2. Giải thích 5 bias chính với số liệu từ thí nghiệm gốc: anchoring, availability, framing, confirmation bias, base-rate neglect.
3. Tính P(disease|positive test) bằng Bayes và giải thích tại sao base-rate neglect gây lỗi.
4. Hiểu tại sao biases là predictable và có thể debiased (một phần).

## Kiến thức tiền đề

- [Lesson 03: Memory](../lesson-03-memory/README.md) — LTM, availability từ ease of recall.
- Xác suất cơ bản (P(A), P(A|B)) — không cần học sâu.

---

## 1. Heuristics không phải bugs

> 💡 **Trực giác**: Hệ thống định vị GPS đôi khi dẫn ra đường sai — không phải vì GPS "ngu," mà vì nó dùng heuristics tối ưu hóa cho trường hợp phổ biến. Não người tương tự: shortcuts được tiến hóa chọn lựa vì thường xuyên đúng, nhưng fail trong các trường hợp đặc biệt.

Amos Tversky và Daniel Kahneman (1974, *Science*) hệ thống hóa chương trình nghiên cứu **heuristics and biases**: não dùng 3 heuristics chính (representativeness, availability, anchoring) → ra quyết định nhanh → nhưng tạo ra biases có thể predict được.

**Tại sao quan trọng**:
- Biases ảnh hưởng bác sĩ (diagnosis), thẩm phán (bản án), nhà đầu tư (portfolio), engineer (risk estimate).
- Biases là *systematic* (không random) → có thể design system để compensate.
- Kahneman được Nobel Kinh tế 2002 — lần đầu tiên psychologist đoạt giải này.

---

## 2. Anchoring Bias

**Định nghĩa**: Ước tính bám theo số đầu tiên nghe được (anchor), dù anchor không liên quan đến câu hỏi.

### Thí nghiệm kinh điển (Tversky & Kahneman, 1974)

**Wheel of Fortune experiment**: Bánh xe số (1–100) được spin trước mắt người tham gia — thực ra bị gian lận để chỉ dừng ở 10 hoặc 65. Sau đó hỏi: "Tỉ lệ % các nước châu Phi trong Liên Hiệp Quốc là bao nhiêu?"

**Kết quả đo**:
- Nhóm thấy số **10**: ước tính trung bình = **25%**
- Nhóm thấy số **65**: ước tính trung bình = **45%**
- Sự khác biệt: 20 percentage points cho *cùng một câu hỏi thực tế*
- Anchor hoàn toàn random (bánh xe) nhưng vẫn ảnh hưởng mạnh đến estimate

**Ví dụ 2 — Nhà đất (Northcraft & Neale, 1987)**:
- Cùng 1 căn nhà, 2 nhóm agent bất động sản chuyên nghiệp được đưa listing price khác nhau.
- Listing $119,900: estimate trung bình = $111,454
- Listing $149,900: estimate trung bình = $127,318
- Sự khác biệt: $15,864 (~12%) dù cùng 1 căn nhà — và họ là professionals!

**Ví dụ 3 — Self-anchoring (Ariely et al., 2003)**:
- Sinh viên đưa 2 chữ số cuối SSN (Social Security Number) của họ.
- Sau đó bid cho rượu vang, chocolate, chuột máy tính.
- Correlation giữa SSN% và bid price: r = 0.28–0.34 (significant, p<0.05).
- Nhóm SSN cao (80–99) bid trung bình 2–3x nhóm SSN thấp (00–19) cho cùng mặt hàng.

**Ví dụ 4 — Legal sentencing (Englich et al., 2006)**:
- Thẩm phán Đức kinh nghiệm đọc case rape, sau đó tung xúc xắc (1–6).
- Anchor cao (6): đề xuất án trung bình **8.0 tháng**.
- Anchor thấp (1): đề xuất án trung bình **5.3 tháng**.
- Sự khác biệt: 2.7 tháng từ xúc xắc không liên quan, trên chính thẩm phán có kinh nghiệm.

> ⚠ **Hiểu sai phổ biến**: "Chỉ naive person mới bị anchoring." Sai — professionals bị ảnh hưởng tương đương người thường trong domain họ có kinh nghiệm (Northcraft & Neale 1987). Anchoring xảy ra ở giai đoạn processing trước khi expertise can thiệp.

---

## 3. Availability Heuristic

**Định nghĩa**: Đánh giá xác suất hoặc tần suất dựa trên ease of recall (dễ nhớ = ước tính cao, khó nhớ = ước tính thấp).

### Walk-through 4 ví dụ với số thật

**Ví dụ 1 — Shark vs. Horse (Slovic et al., 1979)**:
- Mỹ, trung bình hàng năm: cá mập giết ~2 người; ngựa giết ~20 người.
- Survey 100 người: 72% estimate cá mập nguy hiểm hơn ngựa.
- Nguyên nhân: tin tức về cá mập giật gân → easily available trong memory → over-estimate.

**Ví dụ 2 — Flood vs. Tornado (Lichtenstein et al., 1978)**:
- Flood giết nhiều người hơn tornado ~5x ở Mỹ (trung bình: 50 vs 10 người/năm lúc đó).
- 57% người ước tính tornado nguy hiểm hơn flood. Lý do: tornado có hình ảnh dramatic, dễ hình dung.

**Ví dụ 3 — K vs. KK (Tversky & Kahneman, 1973)**:
- Hỏi: chữ K xuất hiện nhiều hơn ở vị trí 1 hay vị trí 3 trong từ tiếng Anh?
- 69% nói vị trí 1 (âm đầu).
- Thực tế: K ở vị trí 3 nhiều gấp 2x vị trí 1 (like, make, ask...).
- Nguyên nhân: dễ nghĩ ra từ bắt đầu bằng K (king, kind...) hơn từ có K ở giữa → overestimate.

**Ví dụ 4 — Celebrity divorce (Kahneman & Tversky, 1973)**:
- Hỏi: tỉ lệ li hôn ở người nổi tiếng hay người thường cao hơn?
- 80%+ nói người nổi tiếng. Thực tế: không khác nhau đáng kể (US Census).
- Nguyên nhân: li hôn celebrity được đưa tin nhiều → easily available.

> ❓ **Câu hỏi tự nhiên**:
> - *Availability và Base-rate neglect có liên quan không?* Có — cả 2 bỏ qua xác suất nền (prior). Availability thay thế "tần suất thực" bằng "tần suất trong trí nhớ." Base-rate neglect bỏ qua prior xác suất bệnh trước khi có test.

---

## 4. Framing Effect

**Định nghĩa**: Cùng thông tin, cách trình bày (frame) khác nhau → quyết định khác nhau, dù expected value như nhau.

### Asian Disease Problem (Kahneman & Tversky, 1981)

**Thiết kế**: 2 nhóm, cùng scenario: "Mỹ đang chuẩn bị cho đợt dịch châu Á, dự kiến giết 600 người."

**Frame 1 (gain frame)**:
- Option A: Chắc chắn cứu 200 người.
- Option B: 1/3 cứu 600 người, 2/3 không ai được cứu.
- Kết quả: **72% chọn A** (certain gain, risk-averse).

**Frame 2 (loss frame)**:
- Option A: Chắc chắn 400 người chết.
- Option B: 1/3 không ai chết, 2/3 cả 600 người chết.
- Kết quả: **78% chọn B** (gamble, risk-seeking for losses).

**Điểm quan trọng**: Option A trong frame 1 = Option A trong frame 2 (200 sống = 400 chết). Option B = Option B (expected value 200 sống trong cả 2). Nhưng frame thay đổi majority choice từ A sang B.

**Ví dụ khác (Meyerowitz & Chaiken, 1987) — cancer screening**:
- "Breast self-exam tăng *khả năng phát hiện* cancer sớm" → 25% intentions increase.
- "Không self-exam *giảm* khả năng phát hiện" → 34% intentions increase.
- Cùng thông tin, loss frame hiệu quả hơn 36% trong việc thay đổi hành vi.

---

## 5. Confirmation Bias & Wason Selection Task

**Định nghĩa**: Tìm kiếm, diễn giải, và nhớ thông tin theo cách confirm niềm tin hiện có; bỏ qua hoặc underweight thông tin mâu thuẫn.

### Wason Selection Task (1966)

**Thiết kế**: 4 thẻ: E, K, 4, 7. Quy tắc: "Nếu mặt trước là nguyên âm, mặt sau là số chẵn." Cần lật thẻ nào để kiểm tra quy tắc?

**Đáp án đúng**: Lật E (kiểm tra mặt sau có số chẵn) và lật 7 (kiểm tra mặt trước có nguyên âm không).

**Kết quả thực nghiệm** (Wason, 1966; N=128):
- Chọn E + 4 (confirmation): 46% — sai (lật 4 không giúp gì, quy tắc không nói số chẵn → nguyên âm)
- Chọn E only: 33%
- Chọn E + 7 (đúng): chỉ **4%**
- Chọn khác: 17%

**Lý do**: Người ta tự nhiên tìm *confirming* evidence (E → chẵn), không tìm *disconfirming* evidence (số lẻ → không được có nguyên âm).

### 4 nghiên cứu khác về confirmation bias

1. **Snyder & Swann (1978)**: Hỏi người xem bạn mình là introvert hay extrovert → họ hỏi câu hỏi confirm, không falsify.
2. **Darley & Gross (1983)**: Xem video trẻ em → một nhóm được bảo trẻ giàu, một nhóm bảo nghèo → nhóm "giàu" đánh giá performance cao hơn khi xem cùng video → interpret evidence theo prior belief.
3. **Lord, Ross & Lepper (1979)**: Pro- và anti-capital punishment đọc 2 study về hiệu quả của death penalty (1 support, 1 oppose). Cả 2 nhóm sau đó *đứng vững hơn* về quan điểm ban đầu. Mỗi nhóm tìm lỗi trong study họ không thích.
4. **Nickerson (1998)** meta-analysis: Confirmation bias là bias phổ biến nhất và strongest trong literature.

---

## 6. Base-Rate Neglect

**Định nghĩa**: Bỏ qua xác suất nền (base rate / prior probability) khi đánh giá xác suất conditional.

### Walk-through tính Bayes

**Bài toán**: Một bệnh có prevalence = 1% (1/100 người). Test có:
- Sensitivity = 95% (P(positive|disease) = 0.95)
- Specificity = 95% (P(negative|healthy) = 0.95, tức P(positive|healthy) = 0.05)

**Câu hỏi**: Bạn test positive → P(disease|positive) = ?

**Tính Bayes từng bước** (với 10,000 người):
- 100 người bệnh thật: 100 × 0.95 = **95 test positive** (true positive)
- 9,900 người khỏe: 9,900 × 0.05 = **495 test positive** (false positive)
- Tổng positive: 95 + 495 = **590**
- P(disease|positive) = 95/590 = **0.161 ≈ 16%**

**Kết quả khảo sát**: Hỏi y tá, bác sĩ không chuyên và sinh viên, hầu hết trả lời **95%** (đánh đồng sensitivity với P(disease|positive)). Casscells et al. (1978): chỉ **18% bác sĩ** ở Harvard Medical School trả lời đúng.

### Linda Problem — Conjunction Fallacy

**Thiết kế (Tversky & Kahneman, 1983)**: Linda, 31 tuổi, single, outspoken, bright, majored in philosophy, deeply concerned about social issues and anti-discrimination.

**Câu hỏi**: Cái nào đúng hơn?
- (A) Linda là bank teller.
- (B) Linda là bank teller AND active feminist.

**Kết quả**: **85%** người chọn (B), dù P(A∧B) ≤ P(A) về logic xác suất.

**Cơ chế (representativeness heuristic)**: Mô tả Linda "phù hợp" với stereotype feminist hơn bank teller → judge probability by similarity to prototype, không phải by probability rules.

**Replication**: Kết quả reproduce ở nhiều ngôn ngữ, nhiều format. Ngay cả khi người được nhắc nhở "xác suất và logic," 65–70% vẫn chọn B (Tversky & Kahneman, 1983).

> 🔁 **Dừng lại tự kiểm tra**:
> 1. Bài toán Bayes với prevalence 0.1% (rare disease), sensitivity 99%, specificity 99%. Tính P(disease|positive).
> <details><summary>Đáp án</summary>10,000 người: 10 bệnh, 9,990 khỏe. True positive: 10 × 0.99 = 9.9 ≈ 10. False positive: 9,990 × 0.01 = 99.9 ≈ 100. Tổng positive: 110. P(disease|positive) = 10/110 ≈ 9.1%. Dù test 99% accurate, positive chỉ có 9% khả năng thực sự bệnh vì bệnh cực hiếm.</details>
> 2. Anchoring: bạn đang mua xe, và người bán đưa ra giá $35,000 trước. Theo kết quả Northcraft & Neale, điều gì sẽ xảy ra với counter-offer của bạn?
> <details><summary>Đáp án</summary>Counter-offer của bạn sẽ bị kéo về phía anchor $35,000 — cao hơn mức bạn sẽ đưa ra nếu không có anchor này. Chiến lược: tự đặt anchor trước (nếu seller), hoặc consciously ignore anchor và bắt đầu từ fundamental value estimate (nếu buyer).</details>

---

## 7. Replication Notes

- **Anchoring**: Extremely robust, replicated hàng trăm lần. Klein et al. (2014) Many Labs Project: anchoring effect là 1 trong số ít effects replicates ở magnitude gần bằng gốc.
- **Framing (Asian disease)**: Replicates well, d ~0.5–0.8. Tuy nhiên, magnitude giảm khi people có time to deliberate.
- **Linda problem**: Replicates, nhưng một số nghiên cứu cho thấy khi hỏi dưới dạng frequency ("Trong 100 người như Linda, bao nhiêu là bank teller? Bao nhiêu là bank teller AND feminist?") → fallacy giảm đáng kể (~30% thay vì 85%).
- **Wason selection task**: Người làm tốt hơn nhiều khi rule được đóng khung theo cách social/familiar (Cosmides, 1989 — "người uống beer phải trên 21 tuổi" → 75% đúng vs 4% với abstract rule). Bằng chứng cho domain-specific reasoning.

---

## 8. Tóm tắt

> 📝 **Các điểm chốt**:
> - Anchoring: estimate bị kéo về anchor không liên quan — 25% vs 45% (UN study); $111k vs $127k (real estate); thẩm phán cộng 2.7 tháng từ xúc xắc.
> - Availability: ease of recall → probability estimate. Shark (2) < Horse (20) nhưng 72% sợ shark hơn.
> - Framing: gain frame → risk-averse (72% chọn certain); loss frame → risk-seeking (78% chọn gamble). Cùng expected value.
> - Confirmation bias: Wason 4%→ đúng; đa số tìm confirming, bỏ disconfirming.
> - Base-rate neglect: test 95% accurate, prevalence 1% → P(disease|+) = 16%, không phải 95%. Linda problem: 85% conjunction fallacy.

---

## Bài tập

1. Anchoring: bạn là seller nhà, muốn bán $180,000. Dùng kết quả Northcraft & Neale để chọn listing price tối ưu. Giải thích cơ chế.

2. Tính P(disease|positive) với: prevalence = 2%, sensitivity = 90%, specificity = 85%. Dùng bảng 10,000 người.

3. Framing: một bác sĩ nói với bệnh nhân về phẫu thuật theo 2 cách: (a) "90% bệnh nhân sống sót sau 5 năm" vs (b) "10% bệnh nhân chết trong 5 năm." Theo framing effect, bệnh nhân nào sẽ đồng ý phẫu thuật nhiều hơn? Tại sao? Điều này có hàm ý đạo đức gì?

4. Linda problem extension: Linda có mô tả trên. Xếp theo xác suất: (A) Linda là teller, (B) Linda là feminist, (C) Linda là teller AND feminist, (D) Linda là feminist AND sống ở California. Thứ tự nào đúng về mặt toán học?

---

## Lời giải chi tiết

### Bài 1

**Chiến lược**: Đặt listing price cao hơn target để kéo buyer về phía target.

**Theo Northcraft & Neale (1987)**: anchor $149,900 → estimate $127,318 (85% của anchor). Anchor $119,900 → estimate $111,454 (93% của anchor). Để target $180,000 được chấp nhận hoặc để counter-offer gần $180k:

**Listing price tối ưu**: Dựa trên kết quả, estimate ≈ 85–90% listing. Để estimate ≈ $180k: listing = 180,000 / 0.85 ≈ **$212,000**. Nhưng nếu listing quá cao → turn off buyers trước khi anchor tác dụng (không ai đến xem). Trong thực tế, listing ~15–20% trên target ($207k–$216k) là range thường thấy.

**Cơ chế**: Anchor kéo counter-offer lên. Buyer counter $175k thay vì $165k vì đang điều chỉnh từ $212k anchor xuống, không phải từ "fair value" lên.

### Bài 2

**Bảng 10,000 người**:

| | Bệnh thật (2% × 10,000 = 200) | Khỏe (9,800) | Tổng |
|---|---|---|---|
| Test+ | 200 × 0.90 = **180** (TP) | 9,800 × 0.15 = **1,470** (FP) | 1,650 |
| Test− | 200 × 0.10 = 20 (FN) | 9,800 × 0.85 = 8,330 (TN) | 8,350 |

P(disease|positive) = 180/1650 = **0.109 ≈ 10.9%**

Sensitivity cao (90%) và specificity thấp (85%) → nhiều false positive → PPV thấp. Lesson: specificity quan trọng hơn sensitivity khi bệnh hiếm.

### Bài 3

**Câu (a) "90% sống" (gain frame)**: Bệnh nhân nhìn vào lợi ích sống → risk-averse → **nhiều khả năng đồng ý** hơn (tìm certain positive outcome).

**Câu (b) "10% chết" (loss frame)**: Bệnh nhân nhìn vào rủi ro chết → prospect theory: loss aversion + risk-seeking for losses → có thể **ít đồng ý hơn** (tìm gamble để tránh certain loss nhỏ, không muốn "lock in" death risk).

McNeil et al. (1982): framing ảnh hưởng 20–25% quyết định chọn surgery vs radiation trong cancer treatment — dù expected outcomes giống nhau.

**Hàm ý đạo đức**: Bác sĩ có quyền lực đáng kể qua cách trình bày. Informed consent đích thực đòi hỏi trình bày **cả 2 frame** (survival và mortality) để bệnh nhân không bị lock into một perspective. Đây là vấn đề đạo đức y khoa thực tế.

### Bài 4

**Thứ tự đúng về toán học** (xác suất giảm dần):

B > A > C > D

**Giải thích**:
- P(B) = P(feminist): Linda có nhiều đặc điểm gợi ý feminist → B likely nhất nếu dùng intuition.
- P(A) = P(teller): bank teller là nghề phổ biến; không liên quan mô tả nhưng không phủ nhận.
- P(C) = P(teller AND feminist) ≤ P(A) và ≤ P(B): conjunction rule.
- P(D) = P(feminist AND sống ở California) ≤ P(B): thêm 1 constraint vào B → nhỏ hơn B.

Về toán học: bất kỳ P(A∧B) ≤ min(P(A), P(B)). Người bình thường ranking B > C > A do representativeness — conjunction fallacy. D (feminist ở California) thường được đánh giá cao gần C vì "California feminist" là stereotype mạnh hơn teller.

---

## Bài tiếp theo

[Lesson 05: Decision Making](../lesson-05-decision-making/README.md) — System 1 vs 2, prospect theory, loss aversion, expected utility.

## Tham khảo

- Tversky, A., & Kahneman, D. (1974). Judgment under uncertainty: Heuristics and biases. *Science*, 185(4157), 1124–1131.
- Kahneman, D., & Tversky, A. (1979). Prospect theory. *Econometrica*, 47(2), 263–291.
- Tversky, A., & Kahneman, D. (1983). Extensional versus intuitive reasoning. *Psychological Review*, 90(4), 293–315.
- Wason, P.C. (1966). Reasoning. *New Horizons in Psychology*, 135–151.
- Northcraft, G.B., & Neale, M.A. (1987). Experts, amateurs, and real estate. *Organizational Behavior and Human Decision Processes*, 39(1), 84–97.
- Casscells, W., Schoenberger, A., & Graboys, T. (1978). Interpretation by physicians of clinical laboratory results. *NEJM*, 299(18), 999–1001.
- Kahneman, D. (2011). *Thinking, Fast and Slow*. Farrar, Straus and Giroux.
