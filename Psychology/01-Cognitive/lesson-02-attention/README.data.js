// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Psychology/01-Cognitive/lesson-02-attention/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02: Attention

> **Tầng 1 — Cognitive Psychology · Psychology**

## Mục tiêu học tập

1. Định nghĩa attention như một tài nguyên giới hạn và mô tả 3 loại: selective, divided, sustained.
2. Giải thích Stroop interference với số liệu cụ thể (reaction time congruent vs incongruent).
3. Phân biệt change blindness và inattentional blindness về cơ chế.
4. Hiểu tại sao multitasking làm giảm performance và liên hệ với ứng dụng thực tế.

## Kiến thức tiền đề

- [Lesson 01: Perception & Illusions](../lesson-01-perception-illusions/README.md) — bottom-up vs top-down processing.

---

## 1. Attention là gì?

> 💡 **Trực giác**: Nhà ga giờ cao điểm — hàng nghìn người nói chuyện cùng lúc, bạn chỉ nghe được cuộc nói chuyện của mình. Attention là cơ chế chọn lọc đó: chỉ để một luồng thông tin đi qua "bottleneck" vào xử lý thức tỉnh (conscious processing).

William James (1890) mô tả attention là "taking possession of the mind, in clear and vivid form, of one out of what seem several simultaneously possible objects or trains of thought." Định nghĩa hiện đại nhấn mạnh 3 khía cạnh:

| Loại | Định nghĩa | Cơ chế giới hạn |
|---|---|---|
| **Selective attention** | Chọn 1 nguồn thông tin, ức chế các nguồn khác | Bottleneck tại early hoặc late stage |
| **Divided attention** | Chia attention giữa ≥ 2 task | Capacity chia sẻ → dual degradation |
| **Sustained attention** | Duy trì tập trung over time | Vigilance decrement: giảm sau 20–30 phút |

### Cocktail Party Effect (Cherry, 1953)

Colin Cherry (1953) dùng kỹ thuật **dichotic listening**: mỗi tai nghe một thông điệp khác nhau qua headphone, người nghe được yêu cầu "shadow" (nhắc lại to) message của một tai.

**Kết quả đo**:
- Nội dung tai bỏ qua: chỉ nhớ được giọng người nói (nam/nữ), không nhớ nội dung. 0/7 người nhớ được chủ đề của unattended message.
- Tên riêng của người nghe trong unattended channel: 30–35% người nhận ra — **own-name effect** (Moray, 1959).
- Khi unattended channel đổi từ tiếng Anh sang tiếng Đức: 0% nhận ra.
- Khi unattended channel đổi từ giọng nam sang giọng nữ: 100% nhận ra.

> ⚠ **Hiểu sai phổ biến**: "Chúng ta hoàn toàn không nghe gì ở tai bỏ qua." Sai — early filtering không hoàn toàn. Ý nghĩa quan trọng (tên riêng, từ liên quan đến mình) vẫn có thể "breakthrough." Broadbent (1958) gọi là leaky filter.

---

## 2. Stroop Effect (1935)

> 💡 **Trực giác**: Đọc từ "ĐỎ" in mực xanh — bạn đọc đúng tên màu, nhưng chậm hơn vì não phải ức chế response tự động "xanh." Đây là xung đột giữa phản xạ đọc (rất tự động) và nhiệm vụ đặt ra (đọc tên màu).

John Ridley Stroop (1935) công bố thí nghiệm kinh điển:
- **Điều kiện congruent**: từ "ĐỎ" in mực đỏ → đọc tên màu mực.
- **Điều kiện incongruent**: từ "ĐỎ" in mực xanh → đọc tên màu mực.
- **Nhiệm vụ**: đọc TÊN MÀU MỰC (không phải đọc từ).

### Walk-through số liệu cụ thể

**Nghiên cứu gốc Stroop (1935), thực nghiệm 2**:
- Congruent: 63.3 giây cho 100 từ → 633ms/từ.
- Incongruent: 110.3 giây cho 100 từ → 1,103ms/từ.
- **Stroop interference = 470ms/từ** (~74% chậm hơn).

**MacLeod (1991) meta-analysis** (qua 800+ nghiên cứu):
- Trung bình RT congruent: ~500ms.
- Trung bình RT incongruent: ~650–800ms.
- **Stroop effect trung bình: ~150–300ms** tùy thiết kế.

**Ví dụ 4 điều kiện** với RT điển hình (MacLeod, 1991):

| Điều kiện | Ví dụ | RT trung bình |
|---|---|---|
| Congruent | "ĐỎ" in đỏ | ~500ms |
| Incongruent | "ĐỎ" in xanh | ~700ms |
| Neutral word | "BÀN" in đỏ | ~570ms |
| Neutral color | Xxxx in đỏ | ~450ms |

**Cơ chế**: Đọc từ là kỹ năng rất tự động (overlearned) → kích hoạt "đỏ" response ngay lập tức. Nhiệm vụ đặt ra (màu mực) cần controlled processing để ức chế automatic reading. Conflict → interference → RT tăng.

> ❓ **Câu hỏi tự nhiên**:
> - *Tại sao không thể chỉ bỏ qua chữ viết?* Vì đọc là kỹ năng tự động — xảy ra mà không cần ý định. Tự động hóa giúp ta đọc nhanh, nhưng tạo ra interference khi xung đột với nhiệm vụ.
> - *Người mù chữ có Stroop effect không?* Không hoặc rất nhỏ — vì đọc chưa tự động hóa. Bằng chứng gián tiếp: trẻ em mới học đọc có Stroop effect nhỏ hơn người lớn.
> - *Có thể train để giảm Stroop effect không?* Có thể giảm nhẹ qua luyện tập, nhưng không biến mất hoàn toàn — tự động hóa đọc quá mạnh.

> 🔁 **Dừng lại tự kiểm tra**:
> 1. Stroop congruent RT = 500ms, incongruent = 700ms. Stroop effect là bao nhiêu? Tại sao?
> <details><summary>Đáp án</summary>Stroop effect = 700 − 500 = 200ms. Nguyên nhân: đọc từ là automatic process kích hoạt response từ (ví dụ "đỏ"); nhiệm vụ đặt ra (màu mực) cần controlled process để ức chế. Conflict → latency tăng.</details>
> 2. Nếu thay vì tên màu bằng số chữ số (đếm số chữ số thay vì đọc từ), Stroop effect có xuất hiện không?
> <details><summary>Đáp án</summary>Có — gọi là Numerical Stroop. Ví dụ: "222" (3 chữ số 2) → nhiệm vụ đếm: đáp án 3, nhưng giá trị số 2 gây interference → RT chậm hơn so với "111" (đáp án 1 = giá trị số).</details>

---

## 3. Change Blindness và Inattentional Blindness

### Change Blindness

**Định nghĩa**: Thất bại nhận ra thay đổi rõ ràng trong visual scene khi không có sự liên tục trực tiếp.

**Paradigm (Rensink et al., 1997 "flicker" paradigm)**:
1. Hiện ảnh gốc 240ms.
2. Blank/grey screen 80ms (masking).
3. Hiện ảnh đã thay đổi 240ms.
4. Lặp lại → người xem tìm điểm khác nhau.

**Kết quả đo (Rensink, O'Regan & Clark, 1997)**:
- Thay đổi ở "high-interest" area (người, vật trung tâm): phát hiện sau trung bình **12 lần** lặp (~2.9 giây).
- Thay đổi ở "low-interest" area (nền, góc): phát hiện sau trung bình **32 lần** (~7.7 giây).
- Một số thay đổi không được phát hiện dù nhìn trực tiếp vào vùng đó.

**Cơ chế**: Não không lưu trữ ảnh đầy đủ của scene vào working memory — chỉ mã hóa các phần được attended. Blank masking ngắt transient signal báo hiệu thay đổi → no change detection signal.

**Ứng dụng**: Eyewitness testimony — nhân chứng tự tin về chi tiết sai vì thiếu encoding đầy đủ.

### Inattentional Blindness

**Định nghĩa**: Thất bại nhận ra stimulus rõ ràng, không được mong đợi khi đang focused vào nhiệm vụ khác.

**Thí nghiệm kinh điển — Simons & Chabris (1999) "Invisible Gorilla"**:
- Người xem được yêu cầu đếm số lần người mặc áo trắng chuyền bóng rổ.
- Giữa video: người mặc đồ gorilla đi qua, dừng lại giữa màn hình, vỗ ngực, rời đi (9 giây).
- **Kết quả: 46% người xem không thấy con gorilla** (Simons & Chabris, 1999, *Perception*).

**Replication quan trọng**:
- Most & al. (2001): 44–65% miss rate tùy điều kiện.
- Stothart, Boot & Simons (2015): với smartphone (chỉ nhìn, không dùng), 13% miss; đang nghe nhạc không lời, 25% miss; đang phone call hands-free, 40% miss.
- Drew, Võ & Wolfe (2013): **83% bác sĩ X-quang giàu kinh nghiệm** không thấy gorilla nhỏ trên ảnh CT phổi khi đang tìm nhân.

> ⚠ **Hiểu sai phổ biến**: "Chỉ người không chú ý mới bỏ qua gorilla." Sai — bỏ qua là hệ quả tất yếu của việc *đang* chú ý vào nhiệm vụ đặt ra. Các bác sĩ X-quang giàu kinh nghiệm vẫn miss — đây không phải lỗi cá nhân mà là giới hạn hệ thống.

### Walk-through So sánh 2 Phenomenon

| | Change blindness | Inattentional blindness |
|---|---|---|
| **Gây ra bởi** | Disruption of continuity signal | Full engagement với task khác |
| **Stimulus có nhìn thấy không** | Có, nếu chú ý | Có, nếu không distracted |
| **Ý thức về failure** | Không (người xem nghĩ mình thấy) | Không (người xem không biết miss) |
| **Nghiên cứu tiêu biểu** | Rensink et al. 1997 | Simons & Chabris 1999 |
| **Miss rate điển hình** | ~50–80% tùy interest area | 46–65% với gorilla paradigm |

---

## 4. Divided Attention và Dual-Task Cost

**Thí nghiệm Pashler (1994) — Psychological Refractory Period (PRP)**:
- Task 1: nghe tone → nhấn phím trái/phải.
- Task 2: nhìn chữ → đọc to.
- Khi 2 task bắt đầu gần nhau (SOA — stimulus onset asynchrony ngắn):
  - Task 2 RT tăng lên: khi SOA = 50ms, RT2 chậm hơn **300–400ms** so với Task 2 đơn lẻ.
  - Task 1 RT gần không đổi.

**Lý do**: Central bottleneck — não có capacity giới hạn cho response selection. Task 1 chiếm bottleneck → Task 2 phải đợi (queue).

**Ứng dụng thực tế — lái xe và điện thoại**:
- Strayer & Johnston (2001): Nói điện thoại hands-free trong khi lái → RT tăng ~50%, tương đương BAC (blood alcohol level) 0.08% (ngưỡng DUI tại Mỹ).
- Texting + lái xe: RT chậm hơn 35% so với baseline (Drews, Yazdani, Godfrey, Cooper & Strayer, 2009).
- Nghe nhạc hoặc podcast (1 hướng, không cần phản hồi): ảnh hưởng nhỏ hơn nhiều (~5%) vì không cần response selection.

> 📝 **Tóm tắt mục 4**:
> - Dual-task cost xuất hiện do central bottleneck trong response selection.
> - PRP: khi 2 task overlap, task 2 RT chậm 300–400ms.
> - Hands-free phone call ≈ BAC 0.08% về RT degradation — không phải vì tay bận mà vì cognitive resource bận.

---

## 5. Tóm tắt

> 📝 **Các điểm chốt**:
> - Selective attention: Cherry (1953) — shadow task, own-name effect 30–35%; content of unattended = không nhớ.
> - Stroop: đọc tự động vs controlled color naming → interference 150–470ms tùy thiết kế.
> - Change blindness: không có transient signal → brain không encode những gì không được attended.
> - Inattentional blindness: gorilla miss rate 46% (Simons & Chabris, 1999); 83% radiologists (Drew et al., 2013).
> - Divided attention: central bottleneck → hands-free phone call ≈ DUI.

---

## Bài tập

1. Trong thí nghiệm Stroop gốc (1935), nếu thay nhiệm vụ từ "đọc tên màu mực" sang "đọc từ in trên thẻ" (bỏ qua màu mực), Stroop effect có xuất hiện không? Tại sao?

2. Thí nghiệm: 30 người xem flicker paradigm (Rensink 1997). Thay đổi ở high-interest area. Mỗi người xem 20 lần lặp. Dùng số liệu từ nghiên cứu gốc để ước tính: bao nhiêu % sẽ phát hiện thay đổi trong 20 lần lặp đầu?

3. Một nhạc sĩ có thể vừa đánh đàn vừa trò chuyện bình thường. Điều này vi phạm lý thuyết bottleneck không? Giải thích bằng khái niệm automaticity.

4. Bạn có một dataset: 20 người làm Stroop test — 10 người đọc tiếng Anh từ nhỏ (fluent), 10 người mới học 1 năm (beginner). Predict: ai sẽ có Stroop effect lớn hơn? Giải thích cơ chế.

---

## Lời giải chi tiết

### Bài 1

**Đáp án**: Không xuất hiện (hoặc rất nhỏ) khi nhiệm vụ là "đọc từ."

**Giải thích**: Stroop effect xảy ra vì có xung đột giữa response tự động (đọc từ) và nhiệm vụ đặt ra (đọc màu mực). Khi nhiệm vụ đặt ra là "đọc từ" — đây chính là response tự động, không có xung đột. Màu mực không có phản xạ tự động kéo sang hướng khác. Thực tế: Stroop (1935) đo điều kiện này và thấy không có interference đáng kể (nhiệm vụ "đọc từ" nhanh ngang nhau dù màu mực xung đột hay không, ~46s cho 100 từ cả 2 điều kiện).

### Bài 2

**Bước 1**: Rensink et al. (1997) — high-interest area: phát hiện sau trung bình 12 lần lặp. Phân phối xấp xỉ Poisson với mean = 12.

**Bước 2**: P(phát hiện trong ≤ 20 lần) = P(X ≤ 20) với X ~ Poisson(12).
P(X ≤ 20) = Σ e^(−12) × 12^k / k! từ k=0 đến 20 ≈ **0.988** (tức ~99%).

**Kết quả thực tế**: Rensink báo cáo ~95% phát hiện trong 30 lần. Ước tính 20 lần ≈ 85–90% (conservative, vì một số người ngay cả sau 30 lần vẫn chưa phát hiện với các thay đổi khó).

### Bài 3

**Không vi phạm lý thuyết bottleneck** — với điều kiện kỹ năng đàn đã **được tự động hóa**.

**Giải thích**: Bottleneck là ở *response selection* cho novel tasks. Kỹ năng đánh đàn sau hàng nghìn giờ luyện tập → response không còn cần response selection bottleneck — chạy như motor program tự động. Điều khiển ngón tay lúc này tương tự như đi bộ (automated). Conversation dùng bottleneck riêng cho language. Vì vậy 2 task không cạnh tranh cùng bottleneck → ít interference. **Nhưng**: khi gặp đoạn nhạc khó (cần conscious attention) → nhạc sĩ sẽ dừng nói chuyện — bottleneck lộ diện.

### Bài 4

**Predict: người fluent có Stroop effect lớn hơn.**

**Cơ chế**: Stroop effect tỉ lệ thuận với mức độ tự động hóa của kỹ năng đọc. Người fluent đọc tiếng Anh 100% tự động → response từ kích hoạt mạnh, gây interference lớn. Người beginner đọc chậm, chưa tự động hóa → đọc từ không kích hoạt cạnh tranh mạnh với màu mực → interference nhỏ hơn.

**Hệ quả**: Trẻ em mới học chữ, người học ngoại ngữ → Stroop effect nhỏ. Người đọc cực kỳ nhanh (expert reader) → Stroop effect có thể lớn hơn bình thường. Bằng chứng: Dumay et al. (2004) — bilinguals có Stroop effect trong L1 > L2.

---

## Bài tiếp theo

[Lesson 03: Memory](../lesson-03-memory/README.md) — mô hình Atkinson-Shiffrin, 7±2, Ebbinghaus forgetting curve, false memory.

## Tham khảo

- Cherry, E.C. (1953). Some experiments on the recognition of speech. *JASA*, 25(5), 975–979.
- Stroop, J.R. (1935). Studies of interference in serial verbal reactions. *J. Exp. Psychology*, 18(6), 643–662.
- Simons, D.J., & Chabris, C.F. (1999). Gorillas in our midst. *Perception*, 28(9), 1059–1074.
- Rensink, R.A., O'Regan, J.K., & Clark, J.J. (1997). To see or not to see: the need for attention. *Psychological Science*, 8(5), 368–373.
- MacLeod, C.M. (1991). Half a century of research on the Stroop effect. *Psychological Bulletin*, 109(2), 163–203.
- Strayer, D.L., & Johnston, W.A. (2001). Driven to distraction: dual-task studies of simulated driving. *Psychological Science*, 12(6), 462–466.
`;
