# Lesson 06 — Chiến lược kiểm thử (test pyramid, TDD/BDD)

> 📌 **Bài này dạy *chiến lược*, không dạy cú pháp.** Bên `Programming` đã có chuỗi bài hướng dẫn *viết test bằng Go*: [testing basics](../../../Programming/lesson-26-testing-basics/) (cách dùng `testing.T`, `go test`), [advanced testing](../../../Programming/lesson-37-advanced-testing/) (table-driven, subtests, benchmark), [mocking & test doubles](../../../Programming/lesson-38-mocking-test-doubles/) (mock/stub/fake). Những bài đó trả lời câu hỏi *"gõ test thế nào trong Go?"*.
>
> Bài **NÀY** trả lời câu hỏi cao hơn, **độc lập ngôn ngữ**: *"viết test nào, bao nhiêu, ở tầng nào, theo quy trình ra sao thì đáng?"* — test pyramid, TDD, BDD, coverage. Bạn áp dụng được dù viết Go, Java, Python hay JavaScript. Khi cần biết *cách gõ*, quay lại 3 bài Programming ở trên.

## Mục tiêu

- Hiểu **vì sao test** không chỉ là "bắt bug" mà còn là *lưới an toàn để thay đổi code tự tin* — nối tiếp đường cong chi phí lỗi và việc refactor.
- Phân biệt **3 tầng test**: unit / integration / end-to-end — khác nhau về phạm vi, tốc độ, độ giòn (flakiness), chi phí bảo trì.
- Nắm **test pyramid**: vì sao nên *nhiều* unit, *ít* e2e; nhận ra anti-pattern **"ice-cream cone"** (kim tự tháp lộn ngược).
- Thực hành vòng **TDD** (Test-Driven Development): Red → Green → Refactor, từng bước cho một hàm nhỏ.
- Hiểu **BDD** và mẫu **Given/When/Then** — nối tiếp tiêu chí chấp nhận (acceptance criteria) từ đặc tả yêu cầu.
- Đọc đúng **coverage**: nó đo gì, vì sao **100% coverage ≠ không bug**, và test *cái gì* cho đáng công.

## Kiến thức tiền đề

- [Lesson 05 — Refactoring & nợ kỹ thuật](../lesson-05-refactoring-tech-debt/) — refactor là "đổi cấu trúc mà giữ nguyên hành vi". *Làm sao biết hành vi không đổi?* → nhờ **test bảo vệ**. Bài này giải thích bộ test đó được tổ chức ra sao.
- [Lesson 01 (Tầng 1) — SDLC & vai trò kỹ sư](../../01-Foundations/lesson-01-sdlc-engineer-role/) — **đường cong chi phí lỗi**: lỗi bắt càng muộn càng đắt (1× → tới 100× ở production). Test tự động chính là cơ chế kéo việc "bắt lỗi" về sớm.
- [Lesson 03 (Tầng 1) — Yêu cầu & đặc tả](../../01-Foundations/lesson-03-requirements-spec/) — **tiêu chí chấp nhận** (acceptance criteria). BDD ở mục 5 biến các tiêu chí này thành test đọc được.
- Đã viết được test cơ bản (xem 3 bài Programming nêu ở đầu). Không bắt buộc, nhưng giúp các ví dụ thân quen hơn.

---

## 1. Vì sao test — bắt lỗi sớm & tự tin thay đổi

💡 **Trực giác.** Hãy hình dung test như **giàn giáo và lưới an toàn** của thợ xây cao tầng. Lưới không xây nhà thay bạn, nhưng nó cho phép bạn *trèo lên sửa* mà không sợ ngã chết. Code không có test giống thợ leo mái không lưới: ai cũng *sợ* động vào, nên code mục dần mà không ai dám sửa.

Test phục vụ **hai mục đích** thường bị nhầm thành một:

1. **Bắt lỗi sớm** — phát hiện sai *trước khi* nó tới người dùng. Đây là cách kéo lỗi về phía rẻ trên [đường cong chi phí lỗi](../../01-Foundations/lesson-01-sdlc-engineer-role/): một bug bắt ở máy dev (test chạy trong 2 giây) tốn gần như 0; cùng bug đó lọt ra production có thể tốn nhiều ngày + uy tín.
2. **Cho phép thay đổi tự tin** — đây mới là giá trị *lâu dài*. Khi [refactor (Lesson 05)](../lesson-05-refactoring-tech-debt/) hay thêm tính năng, bộ test chạy lại trong giây lát và nói "hành vi cũ vẫn đúng". Không có nó, mỗi lần sửa là một canh bạc.

**Ví dụ số cụ thể — giá trị của lưới an toàn.** Một hàm `tinhGiamGia(tongTien, hangThanhVien)` có 6 nhánh logic (thường, bạc, vàng, kim cương, đơn > 1 triệu, mã khuyến mãi). Bạn cần sửa công thức hạng vàng.

| Tình huống | Không có test | Có 12 test phủ 6 nhánh |
|------------|---------------|------------------------|
| Sửa công thức vàng | Sửa, rồi *bấm tay* thử lại cả 6 nhánh trên UI — ~10 phút, dễ quên nhánh "mã khuyến mãi" | Sửa, `go test` chạy 12 case trong **0.3 giây** |
| Lỡ phá nhánh kim cương | Người dùng kim cương phát hiện → bug report → hotfix gấp | Test đỏ **ngay lập tức** trước khi commit |
| Tâm lý khi sửa | "Đừng động vào, sợ vỡ" | "Cứ sửa, test sẽ báo nếu sai" |

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Viết test tốn thời gian mà, có làm chậm dự án không?"* — Chậm *lúc đầu*, nhanh *về sau*. Test là khoản đầu tư: bỏ vài phút viết, thu lại hàng giờ không phải debug thủ công + không phải sợ-hãi mỗi lần sửa. Đúng logic đường cong chi phí lỗi ở Tầng 1.
> - *"Code của tôi nhỏ, cần gì test?"* — Script 50 dòng dùng một lần thì không. Nhưng bất cứ thứ gì *nhiều người sửa, sống nhiều năm* thì test là điều kiện để nó không mục (xem [Lesson 01 Tầng 1: code cá nhân vs phần mềm kỹ thuật](../../01-Foundations/lesson-01-sdlc-engineer-role/)).
> - *"Test có chứng minh code đúng không?"* — Không. Test chỉ chứng minh code đúng *với những trường hợp bạn đã nghĩ ra*. Lỗi nằm ở case bạn quên thì test không bắt được (xem mục 6 về coverage).

🔁 **Dừng lại tự kiểm tra.** Đội bạn ngại refactor một module rối vì "sửa là sợ vỡ chỗ khác". Test giúp gì ở đây — bắt lỗi sớm hay cho phép thay đổi tự tin?
<details><summary>Đáp án</summary>Chủ yếu là <b>cho phép thay đổi tự tin</b>. Nỗi sợ "sửa là vỡ" đến từ việc không biết mình có phá hành vi cũ không. Một bộ test phủ hành vi hiện tại biến refactor từ canh bạc thành thao tác an toàn: refactor xong chạy test, xanh hết = hành vi giữ nguyên. Đây chính là điều kiện để Lesson 05 (refactoring) khả thi trong thực tế.</details>

📝 **Tóm tắt mục 1.** Test có hai vai: (1) bắt lỗi sớm — kéo lỗi về phía rẻ trên đường cong chi phí; (2) cho phép thay đổi tự tin — lưới an toàn để refactor & thêm tính năng. Vai trò thứ hai là giá trị lâu dài lớn nhất. Test không chứng minh code đúng tuyệt đối, chỉ đúng với các case đã nghĩ tới.

---

## 2. Ba tầng test: unit / integration / end-to-end

💡 **Trực giác.** Kiểm tra một chiếc xe theo ba cấp: (a) thử *từng bộ phận* rời — bugi đánh lửa không, phanh kẹp không (unit); (b) thử *vài bộ phận lắp với nhau* — động cơ + hộp số ăn khớp không (integration); (c) *lái thật cả chiếc xe* từ A tới B trên đường (end-to-end). Càng lên cao càng giống thực tế nhưng càng chậm và càng khó biết "hỏng ở đâu" khi thất bại.

| Tầng | Phạm vi kiểm | Tốc độ điển hình | Độ giòn (flaky) | Khi đỏ, biết lỗi ở đâu? |
|------|--------------|------------------|------------------|--------------------------|
| **Unit** | 1 hàm/lớp, *cô lập* — phụ thuộc được thay bằng [mock/stub (Programming L38)](../../../Programming/lesson-38-mocking-test-doubles/) | ~mili-giây (hàng nghìn test trong vài giây) | Rất thấp | Rất chính xác — đúng hàm đó |
| **Integration** | Vài thành phần ghép thật — code + DB thật, hoặc 2 service nói chuyện | ~chục mili-giây tới giây | Trung bình | Thu hẹp được vài thành phần |
| **End-to-end (E2E)** | Cả hệ thống qua giao diện người dùng — trình duyệt bấm nút, gọi qua mạng, DB thật | ~giây tới phút | Cao (mạng chậm, UI đổi, timing) | Mơ hồ — "đăng nhập hỏng" nhưng đâu? |

**Ví dụ mỗi loại — chức năng "đặt hàng":**

- **Unit:** `tinhTongTien([]Item{...})` trả về đúng `150000`? Chỉ gọi một hàm thuần, không DB, không mạng. Chạy 0.001s.
- **Integration:** `OrderRepository.Save(order)` — ghi vào **database thật** (thường là DB tạm trong container) rồi đọc lại, kiểm tra dữ liệu khớp. Kiểm tra code + tầng DB ăn khớp. Chạy ~0.2s.
- **End-to-end:** mở trình duyệt (Playwright/Selenium) → đăng nhập → thêm sản phẩm vào giỏ → bấm "Thanh toán" → kiểm tra trang hiện "Đặt hàng thành công". Đi qua frontend + API + DB + thanh toán. Chạy ~8s, đôi khi đỏ chỉ vì mạng chậm.

> ⚠ **Lỗi thường gặp.** Nhầm "test gọi DB thật" là unit test. Nếu nó chạm DB/mạng/file thật thì đó là **integration** (chậm hơn, giòn hơn). Unit test phải *cô lập* — thay phụ thuộc ngoài bằng test double. Ranh giới này quyết định bạn xếp test vào tầng nào của pyramid (mục 3).

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"E2E giống thật nhất, sao không viết toàn E2E cho chắc?"* — Vì chúng *chậm và giòn*: 500 test E2E có thể chạy 40 phút và đỏ ngẫu nhiên do timing → đội mất niềm tin, bắt đầu *bỏ qua* test đỏ. Xem mục 3.
> - *"Mock nhiều thì unit test còn ý nghĩa gì?"* — Unit test kiểm *logic của bạn*, không kiểm phụ thuộc ngoài. Đó là lý do *cần thêm* integration/E2E để bắt lỗi ở chỗ ghép nối — không tầng nào thay được tầng nào.

🔁 **Dừng lại tự kiểm tra.** Một test khởi động server thật, gọi HTTP qua `localhost`, ghi vào Postgres thật. Đây là tầng nào, và đặc trưng tốc độ/độ giòn ra sao?
<details><summary>Đáp án</summary>Đây là <b>integration</b> (có thể coi là E2E-API nếu đi qua nhiều service). Vì chạm mạng + DB thật nên chậm hơn unit nhiều lần và giòn hơn (port bận, DB chưa sẵn sàng, timing). Đổi lại nó bắt được lỗi mà unit test — vốn mock DB đi — không thể thấy: ví dụ câu SQL sai cú pháp.</details>

📝 **Tóm tắt mục 2.** Ba tầng: **unit** (1 đơn vị, cô lập, mili-giây, ít giòn), **integration** (vài thành phần ghép thật, chậm hơn, giòn vừa), **E2E** (cả hệ thống qua UI, chậm nhất, giòn nhất). Càng lên cao càng giống thật nhưng càng chậm/giòn và càng khó định vị lỗi. Cần cả ba, mỗi tầng bắt loại lỗi khác nhau.

---

## 3. Test pyramid — nhiều unit, ít e2e

💡 **Trực giác.** Sắp xếp số lượng test theo hình **kim tự tháp**: đáy rộng (rất nhiều unit), giữa hẹp hơn (ít integration), đỉnh nhọn (rất ít E2E). Đáy rộng vì test đáy *rẻ và nhanh* — bạn có thể nuôi hàng nghìn cái mà bộ test vẫn chạy trong vài giây.

```
        /\          E2E      (ít — vài chục, chậm, giòn)
       /  \
      /----\        Integration  (vừa — vài trăm)
     /      \
    /--------\      Unit     (rất nhiều — vài nghìn, nhanh, ổn định)
```

**Ví dụ số cụ thể — vì sao tỉ lệ này tối ưu.** Giả sử một hệ có 3000 hành vi cần kiểm. So sánh hai cách phân bổ, dùng tốc độ điển hình (unit 5ms, integration 200ms, E2E 8s):

| Phân bổ | Unit | Integration | E2E | Thời gian chạy bộ test |
|---------|-----:|------------:|----:|:----------------------:|
| **Pyramid** (lành mạnh) | 2500 | 450 | 50 | 2500·5ms + 450·200ms + 50·8s = 12.5s + 90s + 400s ≈ **8.4 phút** |
| **Ice-cream cone** (đảo ngược) | 300 | 700 | 2000 | 300·5ms + 700·200ms + 2000·8s = 1.5s + 140s + 16000s ≈ **4.5 giờ** |

Cùng số hành vi được kiểm, nhưng phân bổ đảo ngược khiến bộ test chạy lâu gấp **~30 lần**. Bộ test 4.5 giờ thì *không ai chạy trước mỗi commit* → mất hết tác dụng "lưới an toàn".

**Anti-pattern "ice-cream cone" (kim tự tháp lộn ngược):** nhiều E2E, ít unit. Thường xảy ra khi đội "test qua UI cho giống thật" mà bỏ unit. Hậu quả:

- **Chậm:** như bảng trên — bộ test thành cả buổi, không chạy được liên tục.
- **Giòn:** E2E hay đỏ ngẫu nhiên (timing, mạng) → đội bắt đầu *bỏ qua* test đỏ ("chắc lại flaky thôi") → mất niềm tin → bug thật lọt qua.
- **Khó định vị:** E2E đỏ chỉ nói "luồng đặt hàng hỏng", không nói hỏng ở hàm nào — phải debug lâu.

> ⚠ **Lỗi thường gặp.** Nghĩ "E2E nhiều = chất lượng cao". Sai. Số *test* nhiều không bằng *bộ test chạy được thường xuyên & tin được*. Một bộ pyramid 8 phút mà đội chạy mỗi commit có giá trị hơn bộ ice-cream-cone 4 giờ mà không ai dám chờ.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Tỉ lệ chuẩn là bao nhiêu — 70/20/10?"* — Không có con số thiêng. Hình dạng *kim tự tháp* (đáy rộng nhất) mới là điều quan trọng. Một heuristic phổ biến là ~70% unit / ~20% integration / ~10% E2E, nhưng tùy hệ thống.
> - *"Hệ chủ yếu là tích hợp nhiều service thì sao?"* — Khi đó tầng integration có thể phình to hơn (đôi khi gọi là "testing trophy" — hình cúp). Nguyên tắc giữ nguyên: ưu tiên tầng *rẻ-nhanh-ổn định* nhất mà vẫn bắt được lớp lỗi tương ứng.

🔁 **Dừng lại tự kiểm tra.** Đội X có 2000 E2E chạy 4 tiếng, mọi người bắt đầu lờ test đỏ. Vấn đề tên gì, và sửa theo hướng nào?
<details><summary>Đáp án</summary>Đây là <b>ice-cream cone</b> (kim tự tháp lộn ngược). Sửa bằng cách <i>đẩy việc kiểm xuống tầng rẻ hơn</i>: phần lớn logic đang test qua E2E thật ra kiểm được bằng unit test (nhanh, ổn định); chỉ giữ lại số ít E2E cho các luồng quan trọng nhất (happy path đặt hàng, đăng nhập). Kết quả: bộ test nhanh lại, ổn định lại, đội tin và chạy thường xuyên.</details>

📝 **Tóm tắt mục 3.** Test pyramid = nhiều unit (đáy), ít integration (giữa), rất ít E2E (đỉnh) — vì test đáy rẻ-nhanh-ổn định. Đảo ngược nó (ice-cream cone) làm bộ test chậm gấp hàng chục lần, giòn, không ai chạy → mất tác dụng. Mục tiêu không phải *nhiều test* mà là *bộ test chạy được thường xuyên và tin được*.

---

## 4. TDD — vòng Red / Green / Refactor

💡 **Trực giác.** TDD (Test-Driven Development — phát triển hướng kiểm thử) đảo ngược thứ tự quen thuộc: **viết test TRƯỚC, viết code SAU**. Như đặt cái đích trước khi bắn — bạn viết ra "tôi muốn code làm được X" dưới dạng một test (lúc này đỏ vì chưa có code), rồi viết code tối thiểu để test xanh.

Vòng lặp ba nhịp, lặp lại liên tục:

1. 🔴 **Red** — viết một test cho hành vi *chưa có*; chạy → đỏ (đúng như mong đợi, vì code chưa tồn tại).
2. 🟢 **Green** — viết code **ít nhất có thể** để test xanh. Cho phép "xấu" ở bước này.
3. 🔵 **Refactor** — dọn code vừa viết cho sạch ([Lesson 05](../lesson-05-refactoring-tech-debt/)), test vẫn xanh đảm bảo không phá hành vi. Quay lại bước 1 cho hành vi tiếp theo.

**Ví dụ từng bước — hàm `laSoNguyenTo(n)` (kiểm tra số nguyên tố):**

**Vòng 1.**
- 🔴 Red: viết test `laSoNguyenTo(2) == true`. Chạy → đỏ (hàm chưa tồn tại / chưa biên dịch).
- 🟢 Green: viết code tối thiểu — `return true`. Test xanh. (Vâng, "gian lận" — đó là cố ý, ta sẽ ép nó đúng dần ở vòng sau.)
- 🔵 Refactor: chưa có gì để dọn.

**Vòng 2.**
- 🔴 Red: thêm test `laSoNguyenTo(4) == false`. Chạy → đỏ (vì code đang luôn trả `true`).
- 🟢 Green: viết logic thật vừa đủ — duyệt từ 2 đến n−1, nếu chia hết thì `false`, hết vòng thì `true`. Cả hai test xanh.
- 🔵 Refactor: chưa cần.

**Vòng 3.**
- 🔴 Red: thêm test biên `laSoNguyenTo(1) == false` và `laSoNguyenTo(0) == false`. Chạy → đỏ (code hiện trả `true` cho n=1 vì vòng lặp không chạy).
- 🟢 Green: thêm điều kiện đầu hàm `if n < 2 { return false }`. Tất cả xanh.
- 🔵 Refactor: tối ưu vòng lặp chỉ chạy tới `√n` thay vì `n−1` — **test vẫn xanh** xác nhận tối ưu không phá hành vi. Đây là lúc lưới an toàn (mục 1) phát huy.

Sau 3 vòng, ta có hàm đúng *và* một bộ test phủ các case quan trọng (số nguyên tố nhỏ, hợp số, biên 0/1) — sinh ra *cùng lúc* với code.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Viết `return true` ở vòng 1 nghe ngớ ngẩn, sao phải làm vậy?"* — Đó là kỹ thuật cố ý: viết code *tối thiểu* để chỉ những test hiện có xanh, rồi *test mới ở vòng sau ép code phải đúng hơn*. Nó giữ bạn không "viết thừa" logic chưa được test đòi hỏi.
> - *"TDD có bắt buộc không?"* — Không. Nó là một *kỷ luật*, hữu ích nhất khi logic phức tạp hoặc khi bạn muốn thiết kế API từ góc nhìn người dùng. Nhiều đội viết test *sau* code cũng ổn, miễn là có test.
> - *"Lợi ích thật của 'test trước' là gì?"* — (1) Ép bạn nghĩ "hàm này *nên* hành xử thế nào" trước khi sa đà vào cài đặt; (2) đảm bảo *mọi* dòng code đều có test đòi hỏi nó tồn tại → coverage tự nhiên cao; (3) test viết trước thường kiểm *hành vi*, ít bị "viết theo cài đặt".

🔁 **Dừng lại tự kiểm tra.** Trong vòng TDD, vì sao bước Refactor lại *an toàn* hơn nhiều so với refactor code không có TDD?
<details><summary>Đáp án</summary>Vì ngay trước bước Refactor, bạn vừa có một bộ test <b>xanh</b> phủ hành vi vừa viết. Refactor xong chạy lại: vẫn xanh = hành vi giữ nguyên; đỏ = bạn vừa phá thứ gì đó, sửa ngay khi còn nhớ. Test đóng vai lưới an toàn của Lesson 05 — biến refactor từ canh bạc thành thao tác có phản hồi tức thì.</details>

📝 **Tóm tắt mục 4.** TDD = viết test trước, theo vòng 🔴 Red (test đỏ cho hành vi chưa có) → 🟢 Green (code tối thiểu cho xanh) → 🔵 Refactor (dọn sạch, test vẫn xanh). Lợi ích: thiết kế từ góc người dùng, coverage cao tự nhiên, và lưới an toàn để refactor. Là kỷ luật hữu ích, không bắt buộc.

---

## 5. BDD & Given/When/Then

💡 **Trực giác.** BDD (Behavior-Driven Development — phát triển hướng hành vi) viết test bằng *ngôn ngữ mà cả người không lập trình cũng đọc được*, mô tả **hành vi mong muốn** thay vì chi tiết kỹ thuật. Như mô tả "khi khách có thẻ thành viên vàng mua trên 1 triệu thì được giảm 10%" — câu này product owner và dev đọc đều hiểu giống nhau.

Khuôn mẫu chuẩn **Given / When / Then** (Cho trước / Khi / Thì):

- **Given** (bối cảnh): trạng thái ban đầu — *"Cho một khách hàng hạng vàng"*.
- **When** (hành động): sự kiện xảy ra — *"Khi đặt đơn hàng trị giá 1.200.000đ"*.
- **Then** (kết quả mong đợi): hành vi cần đúng — *"Thì tổng tiền sau giảm là 1.080.000đ"*.

**Nối với tiêu chí chấp nhận.** Đây chính là cách hiện thực hóa [acceptance criteria từ Lesson 03 (Tầng 1)](../../01-Foundations/lesson-03-requirements-spec/). Một user story có tiêu chí chấp nhận:

> *"Là khách hàng vàng, tôi muốn được giảm 10% cho đơn trên 1 triệu, để được tưởng thưởng vì trung thành."*

biến trực tiếp thành kịch bản BDD chạy được:

```gherkin
Scenario: Khách vàng được giảm 10% cho đơn lớn
  Given một khách hàng hạng "vàng"
  When họ đặt đơn hàng trị giá 1.200.000đ
  Then tổng tiền phải là 1.080.000đ
```

Mỗi dòng Given/When/Then được nối với một đoạn code ("step definition") thực thi nó. Lợi ích: tiêu chí chấp nhận *là* test — không còn khoảng cách "tài liệu nói A, test kiểm B".

> ⚠ **Lỗi thường gặp.** Nhầm BDD là "một loại test khác" tách biệt TDD. Thực tế BDD là *TDD viết ở mức hành vi*, dùng ngôn ngữ nghiệp vụ — vẫn theo vòng đỏ/xanh. Đừng nghĩ phải chọn một trong hai: nhiều đội viết kịch bản BDD cho hành vi cấp tính năng (acceptance) và TDD cho logic đơn vị bên dưới.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Phải dùng công cụ Gherkin/Cucumber mới gọi là BDD?"* — Không. Công cụ chỉ là phương tiện. Tinh thần BDD — *mô tả hành vi bằng ngôn ngữ nghiệp vụ, theo Given/When/Then* — áp dụng được kể cả khi đặt tên test thường: `Test_KhachVang_DonTren1Trieu_Giam10PhanTram`.
> - *"BDD thuộc tầng nào trong pyramid?"* — Thường ở tầng cao (acceptance ≈ integration/E2E) vì mô tả hành vi cấp tính năng. Nhưng phong cách Given/When/Then đặt tên cũng dùng đẹp cho unit test.

🔁 **Dừng lại tự kiểm tra.** Viết một kịch bản Given/When/Then cho tiêu chí: *"Người dùng chưa đăng nhập không được xem trang quản trị, mà bị chuyển về trang đăng nhập."*
<details><summary>Đáp án</summary>

```gherkin
Scenario: Khách chưa đăng nhập bị chặn khỏi trang quản trị
  Given một người dùng chưa đăng nhập
  When họ truy cập "/admin"
  Then họ bị chuyển hướng về trang "/login"
```
Given = trạng thái (chưa đăng nhập); When = hành động (truy cập /admin); Then = hành vi mong đợi (redirect về /login). Đây vừa là tiêu chí chấp nhận vừa là test chạy được.</details>

📝 **Tóm tắt mục 5.** BDD mô tả *hành vi* bằng ngôn ngữ nghiệp vụ theo mẫu **Given/When/Then**, biến [tiêu chí chấp nhận (Lesson 03)](../../01-Foundations/lesson-03-requirements-spec/) thành test chạy được — xóa khoảng cách giữa tài liệu và kiểm thử. Bản chất là TDD ở mức hành vi; không bắt buộc công cụ riêng.

---

## 6. Coverage — đo gì, vì sao 100% không = không bug

💡 **Trực giác.** Code coverage (độ phủ) giống **bản đồ đánh dấu những con đường đã có người đi** khi chạy test. Nó cho biết *dòng/nhánh nào đã được test chạm tới*, nhưng **không** cho biết bạn đã *kiểm đúng* hành vi ở đó hay chưa. Đi qua một con đường không có nghĩa đã kiểm tra mọi ổ gà trên đó.

Coverage đo gì (vài loại phổ biến):

- **Line coverage:** bao nhiêu % *dòng* được test chạy qua.
- **Branch coverage:** bao nhiêu % *nhánh* (`if/else`) được đi cả hai phía — chặt hơn line.
- **Statement/function coverage:** % câu lệnh / hàm được gọi.

**Ví dụ phản chứng — 100% coverage mà vẫn sót bug.** Hàm:

```go
func chia(a, b int) int {
    return a / b   // bug: không xử lý b == 0
}
```

Test:

```go
func TestChia(t *testing.T) {
    if chia(10, 2) != 5 { t.Fail() }   // chạy qua dòng duy nhất → 100% line coverage
}
```

Coverage báo **100%** — dòng `return a / b` đã được chạy. Nhưng case `chia(10, 0)` (chia cho 0 → panic) *chưa từng được kiểm*. Coverage cao không phát hiện điều này vì nó chỉ đếm "dòng đã chạy", không biết "bạn quên test case nào". **100% coverage ≠ không bug.**

> ⚠ **Lỗi thường gặp.** Coi coverage là *mục tiêu* ("phải đạt 100%"). Khi coverage thành KPI, người ta viết test *chạm dòng nhưng không assert gì có ý nghĩa* — coverage đẹp, bug vẫn lọt. Coverage là *chỉ báo* (tìm vùng *chưa* được test), không phải *mục tiêu*. Một test tốt là test có assertion kiểm đúng hành vi và case biên — không phải test tô màu xanh cho bản đồ.

**Vậy test *cái gì* cho đáng?** Ưu tiên theo *rủi ro × tần suất*, không theo % dòng:

- **Logic nghiệp vụ cốt lõi** — công thức tính tiền, quyền truy cập, luật giảm giá. Sai = mất tiền/lộ dữ liệu.
- **Case biên (edge case):** 0, rỗng, âm, max, null, chia cho 0, danh sách trống. Bug hay nấp ở đây.
- **Đường lỗi (error path):** input sai, mạng hỏng, file không tồn tại — không chỉ happy path.
- **Code phức tạp / hay đổi** — nhiều nhánh, nhiều người sửa → cần lưới dày.
- *Không cần* test getter/setter tầm thường, hằng số, code generate.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vậy bao nhiêu coverage là 'đủ'?"* — Câu hỏi sai. Đúng hơn: "các *đường rủi ro cao* đã được test với assertion có ý nghĩa chưa?". Một dự án 70% coverage tập trung đúng chỗ rủi ro tốt hơn 95% rải đều cả getter tầm thường.
> - *"Branch coverage có cứu được ví dụ chia-cho-0 không?"* — Hàm trên không có nhánh nên branch cũng 100%. Bài học sâu hơn: *không có loại coverage nào thay được việc nghĩ ra case*. Coverage chỉ ra chỗ *chưa* chạm; nó không nghĩ hộ bạn case `b == 0`.

🔁 **Dừng lại tự kiểm tra.** Đồng nghiệp khoe "module của tôi 100% coverage, không thể có bug". Phản biện trong một câu.
<details><summary>Đáp án</summary>100% coverage chỉ nghĩa <b>mọi dòng đã được test chạy qua</b>, không nghĩa <b>mọi hành vi/case đã được kiểm đúng</b> — ví dụ một test chạy qua <code>return a/b</code> đạt 100% line nhưng vẫn bỏ sót case <code>b==0</code>. Coverage đo "đã chạm", không đo "đã kiểm đủ".</details>

📝 **Tóm tắt mục 6.** Coverage đo % code *được test chạy qua* (line/branch/function), là *chỉ báo* tìm vùng chưa test — **không phải mục tiêu**. 100% coverage vẫn sót bug nếu thiếu case (vd chia cho 0). Test cho đáng = ưu tiên *rủi ro × tần suất*: logic nghiệp vụ cốt lõi, case biên, đường lỗi, code phức tạp — không chạy theo con số phần trăm.

---

## 7. Bài tập

1. **Phân tầng test.** Cho 4 test sau, xếp mỗi cái vào tầng unit / integration / E2E và giải thích: (a) `formatTien(1500000)` trả `"1.500.000đ"`; (b) đăng nhập qua trình duyệt thật rồi kiểm hiện tên người dùng; (c) `UserRepo.FindByEmail` đọc từ Postgres thật; (d) `tinhThue(1000000, 0.1)` trả `100000`.

2. **Chẩn đoán pyramid.** Đội có 150 unit, 80 integration, 600 E2E; bộ test chạy 3 giờ và hay đỏ ngẫu nhiên. Bộ test này có dạng gì? Nêu 2 hậu quả và hướng sửa cụ thể.

3. **TDD step-by-step.** Áp dụng vòng Red/Green/Refactor để xây hàm `viral(s string) bool` kiểm chuỗi *palindrome* (đọc xuôi ngược như nhau, vd `"aba"` → true, `"abc"` → false). Viết ít nhất 3 vòng, mỗi vòng ghi rõ test thêm + code tối thiểu để xanh.

4. **BDD.** Chuyển tiêu chí chấp nhận sau thành kịch bản Given/When/Then: *"Giỏ hàng trống thì nút 'Thanh toán' bị vô hiệu hóa; khi thêm ít nhất một sản phẩm thì nút được bật."* (gợi ý: có thể cần 2 scenario.)

5. **Coverage phản chứng.** Viết một hàm ngắn + một test đạt **100% line coverage** nhưng vẫn **bỏ sót một bug rõ ràng**. Giải thích coverage đã "qua mặt" ta thế nào và cần thêm test nào để bắt bug.

6. **Chiến lược test thực tế.** Bạn có 1 ngày để viết test cho module thanh toán mới (tính tiền, áp khuyến mãi, gọi cổng thanh toán ngoài, ghi đơn vào DB). Bạn ưu tiên viết test ở những tầng nào, cho phần nào trước? Vì sao? (dùng nguyên tắc rủi ro × tần suất ở mục 6.)

## Lời giải chi tiết

**Bài 1.**
- (a) **Unit** — hàm thuần, không phụ thuộc ngoài, kiểm logic định dạng. Nhanh, ổn định.
- (b) **E2E** — đi qua trình duyệt thật + frontend + backend + có thể DB. Giống thật nhất, chậm & giòn nhất.
- (c) **Integration** — chạm Postgres thật, kiểm code + tầng DB ăn khớp (vd câu SQL đúng). Chậm hơn unit, giòn vừa.
- (d) **Unit** — hàm thuần tính thuế, cô lập. Nhanh, ổn định.

Nguyên tắc phân loại: chạm DB/mạng/UI thật → không còn là unit.

**Bài 2.** Đây là **ice-cream cone** (kim tự tháp lộn ngược): E2E (600) áp đảo unit (150). Hai hậu quả: (1) **Chậm** — 3 giờ/lần chạy nên không ai chạy trước commit, mất tác dụng lưới an toàn; (2) **Giòn → mất niềm tin** — E2E đỏ ngẫu nhiên khiến đội lờ test đỏ ("chắc flaky"), bug thật lọt qua. Hướng sửa: *đẩy kiểm xuống tầng rẻ* — phần lớn logic đang test qua E2E (tính tiền, validate, luật nghiệp vụ) chuyển thành unit test nhanh-ổn định; chỉ giữ vài chục E2E cho luồng quan trọng nhất (happy path đăng nhập, đặt hàng). Mục tiêu: đưa bộ test về dạng pyramid, chạy trong vài phút và tin được.

**Bài 3.** Hàm `viral(s) bool` kiểm palindrome:

- **Vòng 1.** 🔴 Red: test `viral("") == true` (chuỗi rỗng coi là palindrome). Đỏ — hàm chưa có. 🟢 Green: `return true`. Xanh. 🔵 Refactor: chưa cần.
- **Vòng 2.** 🔴 Red: thêm `viral("abc") == false`. Đỏ — code luôn trả true. 🟢 Green: viết logic so ký tự đầu-cuối tiến vào giữa: `for i,j := 0, len(s)-1; i < j; i,j = i+1,j-1 { if s[i]!=s[j] { return false } }; return true`. Cả hai test xanh. 🔵 Refactor: chưa cần.
- **Vòng 3.** 🔴 Red: thêm `viral("aba") == true` và `viral("abba") == true` (lẻ & chẵn). Chạy — đã xanh (logic vòng 2 đã đúng), nên thêm case khó hơn để chắc: `viral("ab") == false`. Vẫn xanh. 🔵 Refactor: tên biến rõ ràng, gom thành hàm sạch; test xanh xác nhận không phá hành vi.

Kết quả: hàm đúng + bộ test phủ rỗng/lẻ/chẵn/khác — sinh cùng lúc với code.

**Bài 4.** Hai scenario:

```gherkin
Scenario: Giỏ trống thì không thanh toán được
  Given giỏ hàng đang trống
  When người dùng xem màn hình giỏ hàng
  Then nút "Thanh toán" bị vô hiệu hóa

Scenario: Thêm sản phẩm thì bật được thanh toán
  Given giỏ hàng đang trống
  When người dùng thêm 1 sản phẩm vào giỏ
  Then nút "Thanh toán" được bật
```

Given = trạng thái giỏ; When = hành động (xem / thêm); Then = trạng thái nút. Hai scenario phủ cả hai phía của tiêu chí.

**Bài 5.** Ví dụ:

```go
func phanTramPin(con, tong int) int {
    return con * 100 / tong   // bug: tong == 0 → panic chia cho 0
}

func TestPhanTramPin(t *testing.T) {
    if phanTramPin(50, 100) != 50 { t.Fail() }   // chạy qua dòng duy nhất → 100% line coverage
}
```

Coverage báo 100% vì dòng duy nhất đã chạy. Nhưng case `tong == 0` chưa được kiểm → panic vẫn ẩn. Coverage "qua mặt" ta vì nó chỉ đếm *dòng đã chạy*, không biết ta *quên case nào*. Cần thêm test `phanTramPin(50, 0)` (kỳ vọng trả 0 hoặc lỗi) — nó sẽ đỏ, ép sửa: `if tong == 0 { return 0 }`.

**Bài 6.** Ưu tiên theo *rủi ro × tần suất* (mục 6):
- **Đầu tiên — unit test cho logic tính tiền & áp khuyến mãi.** Đây là lõi nghiệp vụ, sai = mất tiền trực tiếp; lại nhanh-ổn định nên viết được nhiều case biên (đơn 0đ, khuyến mãi vượt giá trị đơn, nhiều mã chồng nhau) trong thời gian ngắn. Giá trị/giờ cao nhất.
- **Tiếp — integration test cho ghi đơn vào DB** (đảm bảo lưu đúng, không mất dữ liệu) và cho **gọi cổng thanh toán ngoài** (dùng [test double/mock — Programming L38](../../../Programming/lesson-38-mocking-test-doubles/) để không gọi tiền thật, kiểm xử lý cả khi cổng trả lỗi/timeout).
- **Cuối, nếu còn thời gian — 1-2 E2E** cho happy path "đặt hàng thanh toán thành công".

Lý do: dồn công vào tầng rẻ-nhanh phủ phần rủi ro cao nhất (tính tiền) trước, đúng hình pyramid; E2E để sau vì đắt và chỉ cần ít.

---

## 8. Code & Minh họa

- [visualization.html](./visualization.html) — 3 mô-đun tương tác:
  1. **Test pyramid tương tác** — kéo tỉ lệ unit/integration/e2e, xem ngay *thời gian chạy bộ test* và *độ tin cậy* thay đổi; cảnh báo khi phân bổ biến thành ice-cream cone.
  2. **Vòng TDD** — bước qua Red → Green → Refactor cho hàm `laSoNguyenTo`, xem test đỏ/xanh từng nhịp.
  3. **Coverage 100% mà vẫn sót bug** — minh họa hàm chia, thấy coverage báo 100% nhưng case `b == 0` vẫn nổ.

Tham khảo cú pháp viết test thực tế (Go): [Programming L26 basics](../../../Programming/lesson-26-testing-basics/), [L37 advanced](../../../Programming/lesson-37-advanced-testing/), [L38 mocking](../../../Programming/lesson-38-mocking-test-doubles/).

---

## 9. Bài tiếp theo — Tổng kết Tầng 2 & cửa vào Tầng 3

Đây là bài **cuối của Tầng 2 — Thiết kế & Chất lượng (Design & Quality)**. Sáu bài đã xây nên bộ kỹ năng "làm cho code *sạch, đúng, đổi được*":

| # | Lesson | Ý chính rút ra |
|---|--------|----------------|
| 1 | [Clean code & code smells](../lesson-01-clean-code-code-smells/) | Code đọc-được là tài sản; smell là tín hiệu cảnh báo cần dọn |
| 2 | [Nguyên lý thiết kế (SOLID)](../lesson-02-design-principles/) | 5 nguyên lý giữ thiết kế hướng đối tượng linh hoạt, dễ mở rộng |
| 3 | [Coupling & Cohesion](../lesson-03-coupling-cohesion/) | Gắn kết cao trong module, ràng buộc lỏng giữa module |
| 4 | [Design patterns](../lesson-04-design-patterns/) | Giải pháp mẫu cho vấn đề thiết kế lặp lại |
| 5 | [Refactoring & nợ kỹ thuật](../lesson-05-refactoring-tech-debt/) | Cải thiện cấu trúc mà giữ hành vi; quản lý nợ kỹ thuật |
| 6 | **Chiến lược kiểm thử** (bài này) | Lưới an toàn cho 5 bài trên — pyramid, TDD/BDD, coverage |

**Mạch xuyên suốt Tầng 2:** ta học cách *viết và giữ code tốt ở cấp module/lớp*. Refactoring (L5) đòi hỏi lưới an toàn, và lưới đó chính là chiến lược kiểm thử (L6) — vòng tròn khép lại: thiết kế sạch + test vững = đổi code mà không sợ.

**Tầng 3 — Kiến trúc & Vận hành (Architecture & Delivery)** nâng tầm nhìn từ *trong một codebase* lên *cả hệ thống chạy thật ngoài đời*:

- **Kiến trúc phần mềm** — chia hệ lớn thành thành phần (layered, hexagonal, microservices) và cân nhắc đánh đổi.
- **Thiết kế API** — hợp đồng giữa các service (REST, versioning, lỗi).
- **CI/CD** — tự động build/test/deploy; chính là nơi bộ test pyramid của bài này *được chạy mỗi commit*.
- **Container & triển khai** — đóng gói (Docker) và đưa lên môi trường thật.
- **Observability** — log, metric, tracing để *thấy* hệ thống đang làm gì khi chạy.
- **System design** — ghép tất cả để thiết kế hệ chịu tải, sẵn sàng cao.

→ Xem danh sách đầy đủ tại [trang chính lĩnh vực Software Engineering](../../index.html).
