// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Psychology/01-Cognitive/lesson-03-memory/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03: Memory

> **Tầng 1 — Cognitive Psychology · Psychology**

## Mục tiêu học tập

1. Mô tả mô hình Atkinson-Shiffrin (1968): sensory → STM → LTM với thời gian và dung lượng cụ thể.
2. Giải thích Miller (1956): 7±2 items, chunking, và cách áp dụng vào học.
3. Mô tả Ebbinghaus forgetting curve với công thức và số liệu thực nghiệm.
4. Giải thích spaced repetition và false memory (Loftus) với bằng chứng thực nghiệm.

## Kiến thức tiền đề

- [Lesson 02: Attention](../lesson-02-attention/README.md) — limited capacity, encoding.

---

## 1. Vấn đề: Trí nhớ không phải ổ cứng

> 💡 **Trực giác**: Ổ cứng ghi chính xác từng bit, lưu mãi mãi, và đọc ra y hệt. Trí nhớ người làm ngược lại: mờ dần theo thời gian, bị ghi đè, bị sửa đổi mỗi lần recall, và đôi khi tạo ra "ký ức" về sự kiện không bao giờ xảy ra.

Hiểu trí nhớ đúng nghĩa của khoa học có 3 hệ quả thực tế quan trọng:
1. Tại sao nhân chứng mắt thấy tai nghe vẫn có thể sai (Loftus, 1974).
2. Tại sao học nhồi nhét 1 đêm kém hơn ôn tập rải rều (spacing effect).
3. Tại sao review có thể bị "nhiễm" bởi thông tin nghe sau sự kiện.

---

## 2. Mô hình Atkinson-Shiffrin (1968)

> 💡 **Trực giác**: Thông tin đi qua 3 "kho" với dung lượng và thời gian lưu giữ rất khác nhau — như buffer nhỏ trước khi dữ liệu được ghi vào ổ đĩa.

Richard Atkinson và Richard Shiffrin (1968) đề xuất mô hình "multi-store":

| Kho | Dung lượng | Thời gian | Encoding | Mất mát |
|---|---|---|---|---|
| **Sensory store** | Lớn (toàn bộ visual field / auditory) | ~250ms (iconic); ~2–4s (echoic) | Precategorical | Decay nhanh |
| **Short-term memory (STM)** | 7±2 items (chunks) | ~20–30s nếu không rehearse | Phonological chủ yếu | Decay + interference |
| **Long-term memory (LTM)** | Rất lớn (thực tiễn: không giới hạn) | Năm đến cả đời | Semantic chủ yếu | Interference, retrieval failure |

**Encoding → Storage → Retrieval**:
1. **Encoding**: chuyển info từ sensory vào STM (bắt buộc chú ý) và từ STM vào LTM (cần elaborative rehearsal).
2. **Storage**: duy trì thông tin (STM cần maintenance rehearsal).
3. **Retrieval**: lấy lại từ LTM — có thể thất bại (retrieval failure) dù info vẫn còn đó.

### Baddeley's Working Memory Model (1974, cập nhật 2000)

Baddeley và Hitch (1974) cải tiến STM thành **Working Memory (WM)** gồm 4 thành phần:

| Thành phần | Chức năng | Ví dụ |
|---|---|---|
| **Central executive** | Điều phối tài nguyên, chuyển attention | Quyết định làm gì khi 2 task cạnh tranh |
| **Phonological loop** | Lưu âm thanh ngôn ngữ, ~2 giây | Nhớ số điện thoại bằng cách đọc thầm |
| **Visuo-spatial sketchpad** | Lưu hình ảnh và vị trí không gian | Hình dung đường đi, xoay đồ vật trong đầu |
| **Episodic buffer** | Tích hợp thông tin từ LTM và 2 slave systems | Hiểu câu chuyện (hình ảnh + ngôn ngữ + ký ức) |

> ⚠ **Hiểu sai phổ biến**: "STM chỉ là bộ đệm thụ động." WM thực ra là hệ thống *active* — central executive liên tục xử lý, kết nối LTM, và điều phối. Đây là lý do "trí nhớ làm việc" có thể predict học thuật tốt hơn cả IQ trong một số nghiên cứu (Alloway & Alloway, 2010).

---

## 3. Miller (1956): The Magical Number 7±2

George Miller (1956, *Psychological Review*) đo giới hạn STM trong nhiều tình huống:

### Walk-through 4 ví dụ số cụ thể

**Ví dụ 1 — Digit span**: Nghe chuỗi số, nhắc lại đúng thứ tự. Trung bình người lớn nhắc đúng 7 chữ số (range: 5–9). Con số này ổn định qua nhiều ngôn ngữ (Mandarin, English, Welsh) dù RTcalling từng số khác nhau — phụ thuộc vào phonological loop duration, không phải số item.

**Ví dụ 2 — Chunking**: Số điện thoại 10 chữ số:
- Không chunk: "0987654321" — 10 items, vượt 7±2 → quên 3–5 số.
- Có chunk: "098-765-4321" → 3 chunks → dễ nhớ hoàn toàn.
Mỗi chunk có thể chứa nhiều đơn vị thông tin — dung lượng WM đo bằng số chunk, không phải số ký tự.

**Ví dụ 3 — Chess chunking (Chase & Simon, 1973)**: Kiện tướng cờ vua nhớ vị trí 25–30 quân từ ván đấu thực trong 5 giây (vs 8 quân ở người mới). Không phải vì WM lớn hơn — mà vì họ chunk 25 quân thành 5–7 "pattern" quen thuộc. Khi random layout (không chunk được), kiện tướng nhớ ngang người mới (~8 quân).

**Ví dụ 4 — Cowan (2001) revision**: Nghiên cứu sau của Nelson Cowan (2001) đề xuất giới hạn thực sự của *attention focus* chỉ là **4 chunks** (không phải 7), còn 3–5 item còn lại trong báo cáo của Miller là do phonological rehearsal giúp giữ thêm trong loop. Implication: chunk ít thôi nhưng chunked tốt > nhiều item nhỏ.

> ❓ **Câu hỏi tự nhiên**:
> - *Tại sao PIN 4 số, không 6 số?* 4 số = 1 chunk (có thể học được ngay) hoặc 2 chunks nhỏ; 6 số cần 2–3 chunks, tỉ lệ quên cao hơn.
> - *Experts có WM lớn hơn người thường không?* Không (WM capacity bẩm sinh ~tương đương). Họ có LTM patterns tốt hơn để chunk từ, giải phóng WM cho xử lý mới.

> 🔁 **Dừng lại tự kiểm tra**:
> 1. Bạn có thể mở rộng STM capacity thực sự không? Giải thích chunking vs capacity.
> <details><summary>Đáp án</summary>Không — capacity (4 slots theo Cowan, 7±2 theo Miller) là giới hạn hệ thống. Chunking không tăng capacity mà tăng lượng thông tin mỗi slot chứa. Đây là khác biệt quan trọng: không thể "train" để nhớ 12 random digits, nhưng có thể train để nhóm chúng thành chunks.</details>
> 2. Chase & Simon 1973: kiện tướng nhớ 25 quân nhưng chỉ nhớ 8 quân khi random. Giải thích bằng mô hình WM.
> <details><summary>Đáp án</summary>Kiện tướng có nhiều chess patterns trong LTM. Khi nhìn ván đấu thực, họ recognize ~5 pattern → 5 chunks (dưới 7±2). WM của họ chứa "5 patterns," không "25 quân." Khi random, không có pattern → phải dùng 25 slots riêng rẽ → vượt capacity.</details>

---

## 4. Ebbinghaus Forgetting Curve (1885)

Hermann Ebbinghaus (1885) là người đầu tiên nghiên cứu trí nhớ một cách hệ thống — dùng chính mình làm subject, học hàng nghìn "nonsense syllables" (CVCs như "DAX", "BUP").

### Công thức và số liệu

**Hàm retention của Ebbinghaus**:

\`\`\`
R(t) = e^(−t/s)
\`\`\`

Trong đó:
- R = tỉ lệ retention (0–1)
- t = thời gian kể từ học (đơn vị: ngày)
- s = stability (độ bền của ký ức, thay đổi theo số lần ôn)

**Số liệu gốc Ebbinghaus (1885, trung bình qua nhiều session)**:

| Thời gian | Retention | Quên |
|---|---|---|
| 20 phút | 58% | 42% |
| 1 giờ | 44% | 56% |
| 1 ngày | 33% | 67% |
| 2 ngày | 28% | 72% |
| 6 ngày | 25% | 75% |
| 31 ngày | 21% | 79% |

**Lưu ý quan trọng**: Những số này cho **nonsense syllables** — material không có nghĩa, không chunked được. Với material có nghĩa (từ vựng, khái niệm), s lớn hơn → quên chậm hơn đáng kể. Cain et al. (2012) dùng meaningful words: retention sau 1 ngày ~60%, 1 tuần ~45%.

### Walk-through tính toán cụ thể

**Tính R(1) = e^(−1/1) = e^(−1) ≈ 0.368 ≈ 37%** (s=1 ngày baseline).

Với s = 0.5 ngày (rất dễ quên): R(1) = e^(−2) ≈ 14%.
Với s = 3 ngày (sau 1 lần review): R(1) = e^(−0.33) ≈ 72%.
Với s = 10 ngày (sau nhiều review): R(1) = e^(−0.1) ≈ 90%.

Đây là basis của **spaced repetition**: mỗi lần review thành công tăng s, làm ký ức bền hơn → cần ôn ít hơn cho cùng mức retention.

### Spaced Repetition vs Massed Practice

**Cepeda et al. (2006) meta-analysis** (254 nghiên cứu, 14,000+ participants):
- Interval tối ưu cho test sau 1 tháng: 1 ngày study, gap 1–10%.
- Interval tối ưu cho test sau 1 năm: gap ~20% thời gian trước test.
- Massed practice (học 4 giờ liên tục) vs spaced (4 buổi × 1 giờ, cách 1 ngày):
  - Ngay sau học: massed ≈ spaced (~85% vs 80%).
  - 1 tuần sau: spaced **30–40%** cao hơn massed.

**Ebbinghaus bản thân**: học lại cùng list → cần ít lần lặp hơn để đạt 100% nếu đã học trước — "savings score." Sau 24h: cần 67% số lần repeat ban đầu. Sau 31 ngày: vẫn cần chỉ 79% (không phải 100%) — bằng chứng LTM tồn tại dù conscious recall gần như bằng 0.

---

## 5. False Memory và Misinformation Effect (Loftus)

> 💡 **Trực giác**: Không giống file đọc-only, ký ức con người có thể bị chỉnh sửa mỗi lần mở ra. Recall không phải playback — recall là reconstruction, và reconstruction có thể bị nhiễm bởi thông tin mới.

### Thí nghiệm kinh điển Loftus & Palmer (1974)

**Thiết kế**: 150 sinh viên xem video tai nạn xe hơi. Sau đó trả lời câu hỏi "Xe đi nhanh bao nhiêu khi [verb] nhau?"

**5 điều kiện verb** và speed estimate trung bình:

| Verb | Speed estimate trung bình | % báo cáo thấy kính vỡ (tuần sau) |
|---|---|---|
| contacted | 31.8 mph | — |
| hit | 34.0 mph | 14% |
| bumped | 38.1 mph | — |
| collided | 39.3 mph | — |
| smashed | 40.8 mph | 32% |

**Bước 2 (1 tuần sau)**: "Bạn có thấy kính vỡ không?" (Video không có kính vỡ)
- Nhóm "smashed": 32% báo cáo thấy kính vỡ.
- Nhóm "hit": 14% báo cáo thấy kính vỡ.
- Control (không hỏi về speed): 12%.

**Misinformation effect**: câu hỏi dùng từ mạnh không chỉ thay đổi speed estimate mà còn *tạo* false memory về chi tiết không tồn tại (kính vỡ).

### DRM Paradigm (Deese-Roediger-McDermott)

Roediger & McDermott (1995) cho nghe list 15 từ liên quan đến "sleep" (như bed, rest, drowsy, tired, night, dark...) nhưng không nghe từ "sleep" bản thân.

**Kết quả**:
- Nhớ đúng (hit): trung bình 65% các từ trong list.
- False recall (nhớ "sleep" dù không nghe): 40% participants.
- False recognition (sau đó "nhận ra" sleep trong list): 55–58% — bằng con số nhận ra từ đã thực sự nghe.

**Cơ chế**: Activation spreading trong semantic network — nghe 15 từ liên quan kích hoạt node "sleep" rất mạnh → được encode như thể đã nghe thật.

> ⚠ **Hiểu sai phổ biến**: "False memory chỉ xảy ra với người dễ bị ám thị." Sai — DRM và Loftus paradigm tạo false memory đồng đều ở người bình thường, kể cả các expert (bác sĩ, luật sư). False memory là hệ quả tất yếu của *reconstructive* nature of memory, không phải personality trait.

> ❓ **Câu hỏi tự nhiên**:
> - *Nếu biết về misinformation effect, mình có miễn nhiễm không?* Không đáng kể. Loftus (1979) thử nghiệm: nhóm được cảnh báo về misleading questions vẫn bị misinformation effect, chỉ giảm nhẹ 5–8%.
> - *Reconsolidation là gì?* Mỗi lần retrieve ký ức, nó trở nên "labile" (có thể sửa đổi) trong ~6 giờ trước khi được reconsolidated. Trong thời gian này, ký ức có thể bị thay đổi bởi thông tin mới (Nader et al., 2000 ở chuột; Hupbach et al., 2007 ở người).

---

## 6. Tóm tắt

> 📝 **Các điểm chốt**:
> - Atkinson-Shiffrin: sensory (~250ms) → STM (7±2 chunks, 20–30s) → LTM (vô hạn).
> - Miller: capacity = 7±2 *chunks*, không phải items riêng lẻ. Cowan (2001): focus = 4 slots.
> - Ebbinghaus: R(t) = e^(−t/s). Sau 1 ngày, nonsense syllables chỉ còn 33%; spaced repetition tăng s qua mỗi review.
> - Spacing effect (Cepeda 2006 meta-analysis): spaced 30–40% tốt hơn massed sau 1 tuần.
> - Loftus & Palmer (1974): verb "smashed" → 32% false memory "kính vỡ" vs 14% "hit". Ký ức là reconstructive, không phải reproductive.

---

## Bài tập

1. Digit span: một người nhắc đúng 9 chữ số nhưng chỉ nhớ 5 chữ cái chữ thường. Điều này có mâu thuẫn với "7±2" không? Giải thích.

2. Dùng công thức R(t) = e^(−t/s) với s = 1 ngày: tính retention sau (a) 12 giờ, (b) 3 ngày, (c) 1 tuần. Nếu học lại và s tăng lên 5 ngày, tính lại retention sau 1 tuần.

3. Thí nghiệm Loftus & Palmer (1974): 150 người, 30 người/nhóm. Nhóm "smashed" có 32% báo cáo kính vỡ, nhóm control 12%. Nếu sample là 30 người/nhóm, kết quả số tuyệt đối là bao nhiêu? Tính difference và effect size (Cohen's h).

4. Bạn cần học 50 từ vựng tiếng Nhật cho kỳ thi 2 tuần nữa. Dùng spacing effect, thiết kế lịch học 5 buổi tối ưu (ngày học, số từ mỗi buổi).

---

## Lời giải chi tiết

### Bài 1

**Không mâu thuẫn** — thực ra đây là bằng chứng ủng hộ mô hình.

**Giải thích**: "7±2" đo bằng *chunks*, nhưng dung lượng của mỗi chunk phụ thuộc vào đơn vị ngôn ngữ quen thuộc. Chữ số (0–9) có 10 ký tự — dễ phát âm, ngắn (đơn âm tiết), dễ rehearse. Chữ cái thường (a–z): cùng số ký tự nhưng một số đa âm tiết (w = "double-u" = 3 âm tiết) → phonological loop phải làm việc nhiều hơn để giữ. Ngoài ra, người có thể chunked "94582" thành "945-82" (con số quen thuộc) nhưng không chunked "a,b,d,k,m" dễ bằng. Kết quả: số chunks nhớ được ≈ tương đương, nhưng items/chunk cho chữ số cao hơn.

### Bài 2

**Công thức**: R(t) = e^(−t/s)

**(a)** t = 0.5 ngày, s = 1: R = e^(−0.5) ≈ **0.607 = 60.7%**

**(b)** t = 3, s = 1: R = e^(−3) ≈ **0.050 = 5.0%** (chỉ còn 5%!)

**(c)** t = 7, s = 1: R = e^(−7) ≈ **0.001 = 0.09%** (gần như không còn)

**Với s = 5 ngày sau review**, t = 7:
R = e^(−7/5) = e^(−1.4) ≈ **0.247 = 24.7%**

So sánh: s=1 → 0.09% vs s=5 → 24.7% sau 1 tuần — một lần review đúng thời điểm tăng retention 250x!

### Bài 3

**Số tuyệt đối**:
- Nhóm "smashed" (30 người): 30 × 32% = **~9.6 ≈ 10 người** báo cáo kính vỡ.
- Nhóm control (30 người): 30 × 12% = **~3.6 ≈ 4 người**.
- Difference: 10 − 4 = **6 người**.

**Cohen's h** (effect size cho tỉ lệ):
- h = 2 × arcsin(√p1) − 2 × arcsin(√p2)
- arcsin(√0.32) = arcsin(0.566) ≈ 0.600 rad → 2 × 0.600 = 1.200
- arcsin(√0.12) = arcsin(0.346) ≈ 0.354 rad → 2 × 0.354 = 0.708
- h = |1.200 − 0.708| = **0.492 ≈ medium effect (Cohen: h ≥ 0.5 là large)**

Đây là effect size đáng kể cho một sự thay đổi chỉ trong từ dùng trong câu hỏi.

### Bài 4

**Thiết kế theo spacing effect (Cepeda et al., 2006)**:

Target: kỳ thi sau 14 ngày. Tối ưu: interval tăng dần (expanding retrieval practice).

| Buổi | Ngày | Nội dung | Ghi chú |
|---|---|---|---|
| 1 | Ngày 1 | 25 từ mới (A–M) | Học lần đầu |
| 2 | Ngày 2 | 25 từ mới (N–Z) + review 5 từ khó nhất buổi 1 | Gap = 1 ngày |
| 3 | Ngày 4 | Review toàn bộ 50 từ (flashcard) | Gap = 2 ngày |
| 4 | Ngày 8 | Review 50 từ, tập trung từ nhớ sai buổi 3 | Gap = 4 ngày |
| 5 | Ngày 13 | Review nhẹ toàn bộ, tự kiểm tra | Gap = 5 ngày |

**Lý do**: Intervals tăng dần (1, 2, 4, 5 ngày) → mỗi review xảy ra khi retention ~60–70%, là điểm tối ưu (không quá dễ = không tăng s, không quá khó = không discourage). So với học 5 buổi liên tục → retention sau thi cao hơn ~30–40%.

---

## Bài tiếp theo

[Lesson 04: Cognitive Biases](../lesson-04-cognitive-biases/README.md) — heuristics của Kahneman-Tversky, anchoring, availability, framing, base-rate neglect.

## Tham khảo

- Atkinson, R.C., & Shiffrin, R.M. (1968). Human memory: A proposed system. *Psychology of Learning and Motivation*, 2, 89–195.
- Miller, G.A. (1956). The magical number seven. *Psychological Review*, 63(2), 81–97.
- Ebbinghaus, H. (1885/1913). *Memory: A Contribution to Experimental Psychology*. Teachers College Press.
- Cepeda, N.J. et al. (2006). Distributed practice in verbal recall tasks. *Psychological Bulletin*, 132(3), 354–380.
- Loftus, E.F., & Palmer, J.C. (1974). Reconstruction of automobile destruction. *J. Verbal Learning and Verbal Behavior*, 13(5), 585–589.
- Roediger, H.L., & McDermott, K.B. (1995). Creating false memories. *J. Experimental Psychology: Learning, Memory, Cognition*, 21(4), 803–814.
- Cowan, N. (2001). The magical number 4 in short-term memory. *Behavioral and Brain Sciences*, 24(1), 87–114.
`;
