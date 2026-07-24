# Lesson 11 — Hành động tập thể & điểm bùng phát (Collective action & critical mass)

> Ai cũng muốn có công viên sạch, đường phố an toàn, mức lương cao hơn. Vậy tại sao rất nhiều thứ *ai cũng muốn* lại **không** xảy ra? Và tại sao đôi khi một phong trào tưởng như tuyệt vọng bỗng **bùng nổ** chỉ sau vài tuần? Bài này giải thích cả hai bằng một mô hình duy nhất: **ngưỡng cá nhân + khối lượng tới hạn**.

## Mục tiêu học tập

- Phát biểu được **bài toán hành động tập thể (collective action problem)** của Olson: vì sao lợi ích chung không tự động tạo ra hành động chung.
- Định nghĩa chính xác (kèm ≥ 4 ví dụ số mỗi khái niệm): **hàng hóa công (public good)**, **kẻ ăn theo (free-rider)**, **khối lượng tới hạn (critical mass)**, **điểm bùng phát (tipping point)**.
- Xây được **mô hình ngưỡng** biến quyết định cá nhân (chi phí vs lợi ích) thành động lực đám đông, nối tiếp [Lesson 03 — Hành vi tập thể theo ngưỡng](../../01-Individual-Interaction/lesson-03-threshold-collective-behavior/).
- Tính được **khối lượng tới hạn** $f^\*$ và dự đoán khi nào phong trào **bùng nổ** (đường chữ S) vs **sụp về 0** (kẻ ăn theo thắng).
- Giải thích vai trò của **cấu trúc mạng** (mật độ, hub, cụm) trong việc châm ngòi hay dập tắt phong trào — nối [Lesson 05–08 (mạng lưới xã hội)](../../index.html).

## Kiến thức tiền đề

- [Lesson 02 — Phân tách Schelling](../../01-Individual-Interaction/lesson-02-schelling-segregation/): ý tưởng "quyết định vi mô → kết cục vĩ mô bất ngờ".
- [Lesson 03 — Hành vi tập thể theo ngưỡng](../../01-Individual-Interaction/lesson-03-threshold-collective-behavior/): mô hình ngưỡng Granovetter — bài này mở rộng trực tiếp.
- Số học phân số và một chút lặp (iteration). Không cần giải tích.

---

## 1. Nghịch lý: ai cũng muốn, sao không ai làm? (Bài toán của Olson)

> 💡 **Trực giác.** Tưởng tượng một khu chung cư 10 hộ, sân chung đầy rác. Ai cũng *muốn* sân sạch. Việc dọn tốn 1 buổi công. Nhưng nếu 9 hộ kia dọn, hộ thứ 10 vẫn hưởng sân sạch **mà không tốn gì** — nên hộ nào cũng chờ hộ khác. Kết quả: **không ai dọn**, sân vẫn bẩn. Lợi ích chung có thật, nhưng nó **không tự động** biến thành hành động chung.

Nhà kinh tế **Mancur Olson** (1965, *The Logic of Collective Action*) chỉ ra nghịch lý: khi lợi ích của một hành động **lan ra cả nhóm** nhưng **chi phí dồn lên cá nhân người hành động**, thì lý trí cá nhân dẫn tới **dưới-cung cấp (under-provision)** — nhóm làm ra *ít hơn* mức mà chính nhóm mong muốn.

**Cơ chế bằng số cụ thể** (khu chung cư 10 hộ):

- Sân sạch mang lại lợi ích $10$ đơn-vị-hài-lòng cho **mỗi** hộ (tổng lợi ích nhóm $= 10 \times 10 = 100$).
- Dọn sân tốn người dọn $30$ đơn vị công sức.
- Nếu **tôi** đi dọn: tôi được $10$ (sân sạch) $- 30$ (công) $= -20$. Lỗ.
- Nếu **hàng xóm** dọn còn tôi ở nhà: tôi được $10 - 0 = +10$. Lời.

Với mỗi cá nhân, "để người khác làm" luôn tốt hơn "tự làm" — bất kể người khác làm gì. Đây là thế **lưỡng nan (dominant strategy)**: ai cũng chọn không làm → sân bẩn, cả nhóm mất $100$ đơn vị lợi ích lẽ ra có được.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vậy tại sao vẫn có biểu tình, có quỹ từ thiện, có Wikipedia?"* → Vì bốn thứ có thể phá thế bế tắc: (1) đủ **người tiên phong** chịu lỗ vì niềm tin/danh tiếng, (2) chi phí cá nhân **giảm** khi thấy nhiều người cùng làm, (3) lợi ích tăng phi tuyến khi đủ đông, (4) **cấu trúc mạng** khiến ta nhìn thấy nhiều người xung quanh đã tham gia. Cả bốn được gói vào mô hình ngưỡng ở mục 3–4.
> - *"Đây có phải Song đề tù nhân không?"* → Đúng, nó là phiên bản **N người** của Song đề tù nhân: hợp tác thì cả nhóm lợi, nhưng phản bội (ăn theo) là lựa chọn trội của từng cá nhân.

> 📝 **Tóm tắt mục 1.**
> - Lợi ích chung ≠ hành động chung. Khi lợi ích lan ra nhóm còn chi phí dồn lên cá nhân → **dưới-cung cấp**.
> - "Để người khác làm" là chiến lược trội → không ai làm dù ai cũng muốn.
> - Bốn lối thoát: người tiên phong, chi phí giảm theo đám đông, lợi ích phi tuyến, cấu trúc mạng.

---

## 2. Bốn khái niệm nền — định nghĩa đầy đủ

### 2.1 Hàng hóa công (public good)

> 💡 **Trực giác.** Một chiếc bánh mì là *hàng hóa tư*: bạn ăn thì tôi hết phần, và tôi có thể ngăn bạn ăn. Ánh sáng ngọn hải đăng thì ngược lại: tàu thứ 100 vẫn thấy sáng như tàu thứ nhất, và không cách nào "tắt đèn" với riêng một con tàu không trả tiền.

**(a) Là gì.** Hàng hóa có hai tính chất: **không loại trừ (non-excludable)** — không thể ngăn người không trả tiền hưởng nó; và **không cạnh tranh (non-rival)** — một người hưởng không làm giảm phần của người khác.

**(b) Vì sao cần khái niệm này.** Vì chính hai tính chất đó **tạo ra** bài toán ăn theo: đã không thể loại trừ ai, thì ai cũng có động cơ không trả tiền. Đây là lý do gốc khiến thị trường tự do dưới-cung cấp hàng hóa công.

**(c) Ví dụ số cụ thể** (≥ 4):

| Hàng hóa | Không loại trừ? | Không cạnh tranh? | Minh họa số |
|----------|:---:|:---:|-------------|
| Quốc phòng | ✓ | ✓ | Bảo vệ 100 triệu dân; thêm 1 em bé ra đời, chi phí biên $\approx 0$ |
| Ngọn hải đăng | ✓ | ✓ | 1 tàu hay 500 tàu cùng thấy ánh sáng, đèn không "mòn" |
| Không khí sạch | ✓ | ✓ | Cả thành phố 5 triệu người cùng thở, không ai bị loại |
| Wikipedia | ✓ | ✓ | Bài viết đọc bởi 1 người hay 10 triệu người vẫn nguyên vẹn |
| Đài FM 98.5 MHz | ✓ | ✓ | Máy thu thứ 1.000 bắt sóng không làm máy khác mất sóng |

Đối chiếu **hàng hóa tư** (bánh mì, ghế ngồi): loại trừ được (không trả tiền → không cho) và cạnh tranh (bạn dùng thì tôi hết) → thị trường cung cấp tốt, **không** có bài toán ăn theo.

⚠ **Lỗi thường gặp.** Nghĩ "hàng hóa công = do nhà nước cung cấp". Sai. Định nghĩa dựa trên **hai tính chất kỹ thuật** (loại trừ / cạnh tranh), không dựa trên *ai* cung cấp. Wikipedia là hàng hóa công do tình nguyện viên tạo ra; một cây cầu thu phí là hàng hóa *tư* dù nhà nước xây (vì thu phí = loại trừ được).

### 2.2 Kẻ ăn theo (free-rider)

> 💡 **Trực giác.** Người leo lên xe buýt nhưng không mua vé — vẫn tới đích cùng mọi người. "Ăn theo" là hưởng lợi ích chung mà **không góp** phần chi phí.

**(a) Là gì.** Cá nhân **hưởng** lợi ích của hàng hóa công nhưng **không đóng góp** vào việc tạo ra nó. Vì hàng hóa công không loại trừ được, kẻ ăn theo không bị chặn.

**(b) Vì sao cần.** Đây là **cơ chế phá** hành động tập thể: mỗi kẻ ăn theo làm giảm nguồn lực chung, và tệ hơn — họ là *hình mẫu hợp lý* mà người khác sẽ bắt chước, kéo cả nhóm về mức đóng góp thấp.

**(c) Ví dụ số cụ thể** (≥ 4):

1. **Khu phố thuê bảo vệ:** 10 hộ, thuê bảo vệ tốn 1.000k/tháng, chia đều 100k/hộ. Nhưng 3 hộ từ chối góp. Bảo vệ vẫn tuần tra cả phố (không loại trừ) → 3 hộ đó **ăn theo**, 7 hộ còn lại phải gánh $1000/7 \approx 143$k mỗi hộ.
2. **Công đoàn:** thương lượng được tăng lương 8% cho **toàn** công ty. Người không đóng phí công đoàn (200k/năm) vẫn nhận 8% → ăn theo phần thương lượng.
3. **Miễn dịch cộng đồng:** cần 95% tiêm vaccine để chặn dịch. Người thứ 96 không tiêm vẫn được bảo vệ nhờ 95 người kia → ăn theo miễn dịch.
4. **Dự án nhóm 5 người:** điểm nhóm $= 9/10$ chia đều. Một bạn không làm gì vẫn nhận $9$ → ăn theo công sức 4 bạn kia.
5. **Radio công cộng (PBS):** ước tính chỉ ~10% thính giả quyên góp; 90% còn lại nghe miễn phí — tỉ lệ ăn theo $\approx 0{,}9$.

⚠ **Lỗi thường gặp.** Coi kẻ ăn theo là "người xấu". Trong mô hình, ăn theo là **lựa chọn hợp lý** của người bình thường trước cấu trúc động cơ. Muốn giảm ăn theo, phải **đổi cấu trúc** (bắt buộc đóng, thưởng người đóng, làm lộ diện ai không đóng) chứ không phải trách đạo đức.

### 2.3 Khối lượng tới hạn (critical mass)

> 💡 **Trực giác.** Một người có máy fax = vô dụng (gửi cho ai?). Nhưng khi đủ nhiều người có fax, mỗi máy mới lại làm mạng lưới giá trị hơn → tới một điểm, ai cũng muốn có. **Khối lượng tới hạn** là số người tối thiểu để "quả cầu tuyết" tự lăn mà không cần đẩy thêm.

**(a) Là gì.** Số (hay tỉ lệ) người tham gia **tối thiểu** để phong trào **tự duy trì và tự lan** — vượt qua nó, mỗi người mới lôi kéo thêm người khác nhanh hơn tốc độ bỏ cuộc.

**(b) Vì sao cần.** Nó biến câu hỏi mơ hồ "phong trào có thành công không?" thành một **ngưỡng đo được** $f^\*$: chỉ cần so số người tiên phong với $f^\*$ là dự đoán được bùng nổ hay sụp.

**(c) Ví dụ số cụ thể** (≥ 4):

1. **Biểu tình:** 5 người xuống đường → bị giải tán, vô ích. 50.000 người → chính quyền buộc phải đối thoại. Khối lượng tới hạn nằm đâu đó giữa (tùy bối cảnh).
2. **Mạng xã hội mới:** app cần ~1 triệu người dùng hoạt động để có đủ nội dung giữ chân người mới; dưới mức đó, người mới vào thấy trống → bỏ đi → app chết.
3. **Tẩy chay sản phẩm:** 10 khách bỏ mua = doanh nghiệp không nhận ra. Khi ~30% khách hàng bỏ → doanh thu sụt đủ để buộc đổi chính sách.
4. **Mô hình bài này:** với chi phí $c=3$, lợi ích $b=10$, độ đa dạng $\sigma=0{,}20$, ta sẽ tính được $f^\* = 16{,}7\%$ (mục 4). Seed $20\% > 16{,}7\%$ → bùng nổ; seed $15\% < 16{,}7\%$ → sụp.
5. **Vỗ tay trong khán phòng 200 người:** cần khoảng ~15 người đứng dậy trước để kích hoạt "standing ovation" lan ra cả phòng; dưới mức đó, vài người đứng lẻ loi rồi ngồi xuống.

### 2.4 Điểm bùng phát (tipping point)

> 💡 **Trực giác.** Đun nước: 98°C, 99°C vẫn là nước. Thêm 1 độ nữa → 100°C, **sôi** — đổi trạng thái hoàn toàn. Điểm bùng phát là ngưỡng mà một thay đổi **nhỏ** ở đầu vào gây ra thay đổi **khổng lồ, khó đảo ngược** ở kết cục.

**(a) Là gì.** Ngưỡng phân chia hai "lưu vực" số phận khác nhau: dưới ngưỡng, hệ trượt về một kết cục (sụp); trên ngưỡng, hệ trượt về kết cục ngược lại (bùng nổ). Về mặt toán, đó là **điểm cân bằng không ổn định** giữa hai điểm cân bằng ổn định.

**(b) Vì sao cần.** Nó giải thích tính **phi tuyến và bất ngờ** của thay đổi xã hội: vì sao phong trào có thể "im lìm nhiều năm rồi bùng trong một tuần", và vì sao thêm/bớt *một chút* người tiên phong lại đảo ngược cả kết cục.

**(c) Ví dụ số cụ thể** (≥ 4):

1. **Phân tách khu dân cư (Schelling, [L02](../../01-Individual-Interaction/lesson-02-schelling-segregation/)):** khi tỉ lệ nhóm thiểu số vượt ~ngưỡng chịu đựng, cả khu "lật" từ hòa trộn sang phân tách hoàn toàn.
2. **Khuếch tán đổi mới:** khi ~16% dân số chấp nhận (early majority), tốc độ lan tăng vọt — đường cong tiếp nhận bẻ gấp.
3. **Mô hình bài này:** $f^\* = 16{,}7\%$ (mục 4). Seed $15\% \to$ trượt về $0\%$; seed $20\% \to$ trượt lên $100\%$. Chênh $5\%$ ở đầu vào đảo hoàn toàn kết cục.
4. **Dịch tễ ($R_0$):** khi số ca lây trung bình mỗi người vượt $1$, số ca **bùng nổ** theo cấp số nhân; dưới $1$, dịch **tắt dần**. $R_0 = 1$ là điểm bùng phát.
5. **Băng tan:** nhiệt độ vượt một ngưỡng làm băng phản xạ ít nắng hơn → nóng thêm → tan nhanh hơn (vòng phản hồi dương) — tipping point khí hậu.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Một cây cầu thu phí có phải hàng hóa công không? Vì sao?
> 2. Trong khu phố 10 hộ thuê bảo vệ 1.000k, nếu 6 hộ ăn theo thì 4 hộ còn lại mỗi hộ gánh bao nhiêu?
> 3. Phân biệt "khối lượng tới hạn" và "điểm bùng phát".
>
> <details><summary>Đáp án</summary>
>
> 1. **Không.** Thu phí = loại trừ được người không trả → vi phạm tính "không loại trừ". Đó là hàng hóa tư (hoặc hàng hóa câu lạc bộ).
> 2. $1000/4 = 250$k mỗi hộ (6 hộ ăn theo vẫn được bảo vệ vì không loại trừ được).
> 3. **Khối lượng tới hạn** là *lượng người* tối thiểu ($f^\*$). **Điểm bùng phát** là *hiện tượng* hệ đổi trạng thái đột ngột khi vượt ngưỡng đó. Cùng một con số $f^\*$ nhìn từ hai góc: "cần bao nhiêu người" vs "chuyện gì xảy ra khi đạt mức đó".
> </details>

> 📝 **Tóm tắt mục 2.**
> - **Hàng hóa công** = không loại trừ + không cạnh tranh → sinh ra bài toán ăn theo.
> - **Kẻ ăn theo** = hưởng mà không góp; là lựa chọn *hợp lý*, không phải đạo đức xấu.
> - **Khối lượng tới hạn** $f^\*$ = số người tối thiểu để phong trào tự lan.
> - **Điểm bùng phát** = ngưỡng $f^\*$ nhìn dưới góc "thay đổi nhỏ → kết cục đảo ngược".

---

## 3. Mô hình ngưỡng: từ quyết định cá nhân đến làn sóng đám đông

> 💡 **Trực giác.** Không phải ai cũng liều như nhau. Người tiên phong (thủ lĩnh, người tin tưởng mạnh) sẵn sàng xuống đường **dù chưa ai đi**. Người dè dặt chỉ tham gia khi thấy "đủ đông cho an toàn". Mỗi người có một **ngưỡng** riêng: *"tôi tham gia khi có ít nhất X% dân số đã tham gia."* Đây chính là mô hình Granovetter từ [Lesson 03](../../01-Individual-Interaction/lesson-03-threshold-collective-behavior/), giờ ta gắn ngưỡng đó với **chi phí và lợi ích**.

### 3.1 Ngưỡng đến từ đâu? Chi phí vs lợi ích

Một người tham gia khi **lợi ích kỳ vọng $\ge$ chi phí**. Lợi ích tham gia lớn dần theo số người đã tham gia (phong trào càng đông càng có khả năng thắng, càng đáng bỏ công). Cân bằng chi phí $c$ với lợi ích công $b$ cho ta **ngưỡng trung bình** của đám đông:

$$\mu = \frac{c}{b}$$

Đọc là: *"trung bình, một người tham gia khi tỉ lệ tham gia đạt $c/b$."* Chi phí cao → ngưỡng cao (khó lôi kéo). Lợi ích lớn → ngưỡng thấp (dễ lôi kéo).

**Ví dụ số** (≥ 4):

| Chi phí $c$ | Lợi ích $b$ | Ngưỡng TB $\mu = c/b$ | Diễn giải |
|:--:|:--:|:--:|-----------|
| 3 | 10 | 0,30 | Cần thấy 30% đã tham gia mới đáng công |
| 5 | 10 | 0,50 | Chi phí cao hơn → cần 50% |
| 3 | 20 | 0,15 | Lợi ích gấp đôi → chỉ cần 15% |
| 2 | 10 | 0,20 | Chi phí thấp → 20% |
| 8 | 10 | 0,80 | Rất tốn kém → gần như phải cả làng làm mới theo |

### 3.2 Đa dạng ngưỡng và người tiên phong

Không phải ai cũng có ngưỡng đúng bằng $\mu$. Ta rải ngưỡng của $N$ người **quanh** $\mu$ với độ phân tán $\sigma$: người liều nhất có ngưỡng thấp $\mu - \sigma$, người dè dặt nhất có ngưỡng cao $\mu + \sigma$. **Người tiên phong (seed)** là những người có ngưỡng $\approx 0$ — họ tham gia đầu tiên, châm ngòi.

Gọi $F(f)$ là **tỉ lệ người thấy đáng tham gia** khi hiện có tỉ lệ $f$ đã tham gia. Với ngưỡng rải đều trên $[\text{lo}, \text{hi}]$ (với $\text{lo}=\mu-\sigma$, $\text{hi}=\mu+\sigma$):

$$F(f) = \operatorname{clamp}\!\left(\frac{f - \text{lo}}{\text{hi} - \text{lo}},\; 0,\; 1\right)$$

### 3.3 Động lực: phản ứng dây chuyền theo vòng

Mỗi vòng, ai thấy hiện tại đã đủ đông so với ngưỡng của mình thì tham gia; ai thấy chưa đủ thì rút (ăn theo). Tỉ lệ tham gia cập nhật:

$$f_{t+1} = F(f_t), \qquad f_0 = \frac{\text{seed}}{N}$$

Ta lặp cho tới khi $f$ ngừng đổi. Kết quả rơi vào một trong hai **điểm cân bằng ổn định**: $f = 0$ (phong trào chết) hoặc $f = 1$ (cả nhóm tham gia). Ngăn giữa hai lưu vực là **điểm cân bằng không ổn định** — chính là khối lượng tới hạn:

$$f^\* = \frac{\text{lo}}{\,1 - (\text{hi}-\text{lo})\,} = \frac{\mu - \sigma}{\,1 - 2\sigma\,} \quad (\text{khi } \mu - \sigma > 0,\ 2\sigma < 1)$$

**Quy tắc vàng:** nếu tỉ lệ tiên phong $f_0 > f^\*$ → **bùng nổ** lên $1$; nếu $f_0 < f^\*$ → **sụp** về $0$. (Nếu $\mu - \sigma \le 0$ thì $f^\* = 0$: không có rào cản, phong trào nào cũng lan. Nếu độ phân tán quá lớn, $2\sigma \ge 1$, hệ không lưỡng ổn định — tiếp nhận mượt, không bùng.)

> ⚠ **Lỗi thường gặp.** Nghĩ "cứ có người tiên phong là phong trào lan". Sai — người tiên phong chỉ đặt $f_0$. Nếu $f_0$ **không vượt** $f^\*$, làn sóng tắt dần dù có người tiên phong. Điều quyết định là seed **so với** khối lượng tới hạn, không phải seed tuyệt đối.

> 📝 **Tóm tắt mục 3.**
> - Ngưỡng cá nhân đến từ chi phí/lợi ích: ngưỡng trung bình $\mu = c/b$.
> - Rải ngưỡng quanh $\mu$ với độ phân tán $\sigma$ → hàm phản ứng $F(f)$.
> - Lặp $f_{t+1} = F(f_t)$ từ seed → hội tụ về $0$ hoặc $1$.
> - Ranh giới hai số phận là khối lượng tới hạn $f^\* = \dfrac{\mu-\sigma}{1-2\sigma}$.

---

## 4. Khi nào bùng nổ, khi nào sụp? (walk-through bằng số)

Ta chạy mô hình với **hai kịch bản chỉ khác nhau ở số người tiên phong** — để thấy rõ tipping point. Cố định $N = 100$, $c = 3$, $b = 10$ ($\mu = 0{,}30$), $\sigma = 0{,}20$.

Từ đó: $\text{lo} = \mu-\sigma = 0{,}10$, $\text{hi} = \mu+\sigma = 0{,}50$, bề rộng $= 0{,}40$.

Khối lượng tới hạn:

$$f^\* = \frac{\text{lo}}{1 - \text{bề rộng}} = \frac{0{,}10}{1 - 0{,}40} = \frac{0{,}10}{0{,}60} = 0{,}1667 \approx 17\ \text{người}$$

Hàm phản ứng dùng chung: $F(f) = \operatorname{clamp}\!\big((f - 0{,}10)/0{,}40,\ 0,\ 1\big)$.

### 4.1 Kịch bản A — seed = 20 người ($f_0 = 0{,}20 > f^\* $) → BÙNG NỔ

| Vòng $t$ | $f_t$ (tỉ lệ) | Số người | Tính $F(f_t)$ | $f_{t+1}$ |
|:--:|:--:|:--:|-----------|:--:|
| 0 | 0,20 | 20 | $(0{,}20-0{,}10)/0{,}40 = 0{,}25$ | 0,25 |
| 1 | 0,25 | 25 | $(0{,}25-0{,}10)/0{,}40 = 0{,}375$ | 0,375 |
| 2 | 0,375 | 37–38 | $(0{,}375-0{,}10)/0{,}40 = 0{,}6875$ | 0,6875 |
| 3 | 0,6875 | 68–69 | $(0{,}6875-0{,}10)/0{,}40 = 1{,}469 \to$ clamp $1$ | 1,00 |
| 4 | 1,00 | 100 | $(1{,}00-0{,}10)/0{,}40 = 2{,}25 \to$ clamp $1$ | 1,00 |
| 5 | 1,00 | 100 | dừng | — |

Chuỗi: $20 \to 25 \to 37{,}5 \to 68{,}75 \to 100 \to 100$. Đây là **đường chữ S** kinh điển: khởi đầu chậm, tăng tốc ở giữa, bão hòa ở đỉnh. Phong trào **thành công**, tỉ lệ tham gia cuối $= 100\%$.

### 4.2 Kịch bản B — seed = 15 người ($f_0 = 0{,}15 < f^\*$) → SỤP

| Vòng $t$ | $f_t$ (tỉ lệ) | Số người | Tính $F(f_t)$ | $f_{t+1}$ |
|:--:|:--:|:--:|-----------|:--:|
| 0 | 0,15 | 15 | $(0{,}15-0{,}10)/0{,}40 = 0{,}125$ | 0,125 |
| 1 | 0,125 | 12–13 | $(0{,}125-0{,}10)/0{,}40 = 0{,}0625$ | 0,0625 |
| 2 | 0,0625 | 6–7 | $(0{,}0625-0{,}10) < 0 \to$ clamp $0$ | 0,00 |
| 3 | 0,00 | 0 | $(0-0{,}10) < 0 \to$ clamp $0$ | 0,00 |

Chuỗi: $15 \to 12{,}5 \to 6{,}25 \to 0 \to 0$. Làn sóng **tắt dần**: mỗi vòng, số người thấy "chưa đủ đông" nhiều hơn số người mới tham gia → kẻ ăn theo thắng, phong trào **sụp về 0%**.

> **Điểm mấu chốt:** hai kịch bản **giống hệt nhau** về chi phí, lợi ích, độ đa dạng — **chỉ khác 5 người tiên phong** (20 vs 15). Vậy mà một cái lên $100\%$, một cái về $0\%$. Đó chính là sức mạnh của điểm bùng phát: quanh $f^\* = 17\%$, một nhúm người quyết định cả số phận phong trào.

### 4.3 Ba cách vượt khối lượng tới hạn

Muốn đẩy $f_0$ vượt $f^\*$ (hoặc hạ $f^\*$ xuống), có ba đòn bẩy — khớp với ba slider trong [visualization](./visualization.html):

1. **Tăng seed** (nhiều người tiên phong hơn): kịch bản B với seed $20 \Rightarrow$ bùng nổ. Nâng $f_0$ trực tiếp.
2. **Giảm chi phí $c$** (làm việc tham gia dễ/rẻ hơn — ví dụ biểu tình online): $c$ từ $3 \to 2 \Rightarrow \mu = 0{,}20$, $\text{lo}=0$, $f^\* = 0 \Rightarrow$ bất kỳ seed dương nào cũng lan.
3. **Tăng lợi ích công $b$** (đề cao ý nghĩa/tính cấp bách): $b$ từ $10 \to 20 \Rightarrow \mu = 0{,}15$, $\text{lo} = -0{,}05 \to 0$, $f^\* = 0 \Rightarrow$ lan.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao đường tham gia có hình chữ S mà không phải đường thẳng?"* → Vì giai đoạn đầu ít người nên ít người vượt ngưỡng (chậm); giai đoạn giữa mỗi người mới lại kéo thêm nhiều người (tăng tốc); cuối cùng cạn "người chưa tham gia" nên chững lại (bão hòa). Ba pha này ghép thành chữ S.
> - *"Sụp về 0 nghĩa là cả người tiên phong cũng bỏ?"* → Trong mô hình phản ứng tốt nhất (best-response), đúng vậy: khi thấy quá ít người theo, ngay cả người ban đầu cũng thấy không đáng công và rút. Đời thực, một lõi cứng có thể trụ lại — nhưng phong trào coi như thất bại vì không đạt khối lượng tới hạn.
> - *"Độ phân tán $\sigma$ ảnh hưởng thế nào?"* → $\sigma$ nhỏ (mọi người giống nhau) → hệ lưỡng ổn định gắt, tipping rõ, hoặc bùng hoặc sụp. $\sigma$ lớn (đa dạng cao) → luôn có người ngưỡng thấp châm ngòi cho người ngưỡng cao hơn → dễ lan mượt, ít khi sụp hẳn.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Với $c=4$, $b=10$, $\sigma=0{,}15$, tính $f^\*$.
> 2. Seed $30\%$ có làm phong trào bùng nổ với tham số ở câu 1 không?
>
> <details><summary>Đáp án</summary>
>
> 1. $\mu = 4/10 = 0{,}40$; $\text{lo} = 0{,}40 - 0{,}15 = 0{,}25$; bề rộng $= 2\sigma = 0{,}30$. $f^\* = 0{,}25/(1-0{,}30) = 0{,}25/0{,}70 \approx 0{,}357 = 35{,}7\%$.
> 2. Seed $30\% < 35{,}7\% = f^\* \Rightarrow$ **không**, phong trào sụp. Cần seed $> 35{,}7\%$ (hoặc giảm $c$/tăng $b$/tăng $\sigma$).
> </details>

> 📝 **Tóm tắt mục 4.**
> - Cùng chi phí–lợi ích, chỉ chênh vài người tiên phong quanh $f^\*$ → kết cục lật từ $0\%$ sang $100\%$.
> - Bùng nổ vẽ nên **đường chữ S** (chậm – tăng tốc – bão hòa); sụp thì tắt dần về $0$.
> - Ba đòn bẩy châm ngòi: tăng seed, giảm chi phí, tăng lợi ích công.

---

## 5. Cấu trúc mạng làm thay đổi cuộc chơi

> 💡 **Trực giác.** Mô hình mục 3–4 giả định mỗi người nhìn thấy **toàn bộ** dân số (tỉ lệ $f$ chung). Đời thực, bạn chỉ thấy **hàng xóm và bạn bè** của mình. Vì thế cấu trúc mạng — ai kết nối với ai — quyết định làn sóng có lan được không, dù $f^\*$ toàn cục không đổi. Đây là cầu nối tới [Lesson 05–08 về mạng lưới xã hội](../../index.html).

Ba đặc điểm mạng ảnh hưởng tới việc châm ngòi:

- **Cụm dày (dense clusters):** trong một cụm bạn bè khăng khít, chỉ cần vài người tham gia là *tỉ lệ tham gia cục bộ* đã cao → dễ vượt ngưỡng cục bộ, châm ngòi cho cụm dù toàn cục còn thấp. Phong trào thường **khởi phát từ một cụm** rồi tràn ra.
- **Hub (đỉnh bậc cao):** một người có 500 kết nối tham gia sẽ đẩy tỉ lệ-mà-nhiều-người-nhìn-thấy tăng vọt. Vì vậy lôi kéo được **người ảnh hưởng** (influencer) hiệu quả hơn nhiều so với lôi kéo người bình thường — họ hạ ngưỡng cho hàng trăm người cùng lúc.
- **Cầu nối (bridges) giữa các cụm:** phong trào có thể bùng trong một cụm rồi **kẹt** nếu không có cạnh nối sang cụm khác. Vài "cầu nối" yếu (weak ties) là thứ giúp làn sóng nhảy sang cộng đồng mới — nghịch lý "sức mạnh của quan hệ yếu".

**Ví dụ số:** khu phố 20 hộ chia 2 cụm 10 hộ, mỗi hộ chỉ nhìn cụm của mình. Seed 3 hộ **dồn vào một cụm** → cụm đó thấy $3/10 = 30\% > f^\*=17\%$ → cụm bùng. Cùng 3 hộ nhưng **rải mỗi cụm chỉ 1–2 hộ** → không cụm nào đạt $17\%$ đủ chắc → cả hai lình xình. Cùng số người tiên phong, **cách phân bố trên mạng** quyết định thành–bại.

> 📝 **Tóm tắt mục 5.**
> - Người ta phản ứng với tỉ lệ **cục bộ** (hàng xóm), không phải tỉ lệ toàn cục.
> - Cụm dày dễ tự châm ngòi; hub hạ ngưỡng cho nhiều người; cầu nối giúp làn sóng nhảy cụm.
> - **Dồn** người tiên phong vào một cụm hiệu quả hơn rải mỏng khắp mạng.

---

## 6. Bài tập

**Bài 1 (đọc hiểu).** Phân loại mỗi thứ sau là hàng hóa **công** hay **tư**, giải thích qua hai tính chất (loại trừ / cạnh tranh): (a) buổi hòa nhạc bán vé; (b) pháo hoa đêm giao thừa bắn giữa thành phố; (c) một ổ bánh mì; (d) hệ thống đê chống lũ của một tỉnh.

**Bài 2 (tính khối lượng tới hạn).** Cho $c = 6$, $b = 12$, độ phân tán $\sigma = 0{,}10$, $N = 100$. Tính $\mu$, $\text{lo}$, $\text{hi}$, và khối lượng tới hạn $f^\*$. Với seed $= 45$ người, phong trào bùng nổ hay sụp?

**Bài 3 (chạy mô phỏng bằng tay).** Dùng tham số $c=3$, $b=10$, $\sigma=0{,}25$, $N=100$, seed $= 30$ người. Lập bảng $f_t$ qua từng vòng cho tới khi dừng. Kết cục là gì? Vẽ định tính hình dạng đường tham gia.

**Bài 4 (vận dụng chính sách).** Một công đoàn muốn phát động đình công. Hiện chi phí tham gia cao ($c=7$, $b=10$), độ đa dạng $\sigma=0{,}15$, và chỉ vận động được seed $= 20\%$. Phong trào sẽ sụp. Đề xuất **hai** biện pháp cụ thể (mỗi biện pháp gắn với một tham số của mô hình) để lật thành công, và chứng minh bằng $f^\*$ mới.

---

## 7. Lời giải chi tiết

**Bài 1.** Xét hai tính chất:

| | Loại trừ được? | Cạnh tranh? | Kết luận |
|--|:--:|:--:|----------|
| (a) Hòa nhạc bán vé | Có (không vé → không vào) | Có (ghế có hạn) | **Hàng hóa tư** |
| (b) Pháo hoa thành phố | Không (ai ngẩng lên cũng thấy) | Không (thêm người xem không làm mờ pháo hoa) | **Hàng hóa công** |
| (c) Ổ bánh mì | Có | Có | **Hàng hóa tư** |
| (d) Đê chống lũ | Không (bảo vệ cả vùng) | Không (thêm 1 hộ được bảo vệ không giảm phần hộ khác) | **Hàng hóa công** |

Nhận xét: (b) và (d) chính là nơi bài toán ăn theo xuất hiện — nên thường cần nhà nước hoặc hành động tập thể có tổ chức cung cấp.

**Bài 2.** Cách tiếp cận: áp thẳng công thức mục 3.3.
- $\mu = c/b = 6/12 = 0{,}50$.
- $\text{lo} = \mu - \sigma = 0{,}50 - 0{,}10 = 0{,}40$; $\text{hi} = 0{,}60$; bề rộng $= 2\sigma = 0{,}20$.
- $f^\* = \dfrac{\text{lo}}{1 - \text{bề rộng}} = \dfrac{0{,}40}{1 - 0{,}20} = \dfrac{0{,}40}{0{,}80} = 0{,}50 = 50\%$.
- Seed $= 45\% < 50\% = f^\* \Rightarrow$ **sụp**. (Kiểm tra: $F(0{,}45) = (0{,}45-0{,}40)/0{,}20 = 0{,}25 < 0{,}45$ → giảm → về $0$.)

**Bài 3.** Tham số: $\mu = 0{,}30$, $\text{lo} = 0{,}30 - 0{,}25 = 0{,}05$, $\text{hi} = 0{,}55$, bề rộng $= 0{,}50$. $F(f) = \operatorname{clamp}\big((f-0{,}05)/0{,}50, 0, 1\big)$. Khối lượng tới hạn $f^\* = 0{,}05/(1-0{,}50) = 0{,}10 = 10\%$. Seed $30\% > 10\% \Rightarrow$ dự đoán **bùng nổ**. Bảng:

| Vòng $t$ | $f_t$ | Tính $F(f_t)$ | $f_{t+1}$ |
|:--:|:--:|-----------|:--:|
| 0 | 0,30 | $(0{,}30-0{,}05)/0{,}50 = 0{,}50$ | 0,50 |
| 1 | 0,50 | $(0{,}50-0{,}05)/0{,}50 = 0{,}90$ | 0,90 |
| 2 | 0,90 | $(0{,}90-0{,}05)/0{,}50 = 1{,}70 \to 1$ | 1,00 |
| 3 | 1,00 | dừng | — |

Chuỗi: $30 \to 50 \to 90 \to 100$. Kết cục **thành công, $100\%$**. Đường tham gia có dạng chữ S dốc (do seed đã cao hơn hẳn $f^\*$ nên tăng tốc ngay từ vòng đầu).

**Bài 4.** Hiện trạng: $\mu = 7/10 = 0{,}70$, $\text{lo} = 0{,}70 - 0{,}15 = 0{,}55$, bề rộng $= 0{,}30$. $f^\* = 0{,}55/(1-0{,}30) = 0{,}55/0{,}70 \approx 0{,}786 = 78{,}6\%$. Seed $20\% \ll 78{,}6\% \Rightarrow$ sụp (đúng như đề). Hai biện pháp:

- **Biện pháp 1 — giảm chi phí tham gia $c$** (lập quỹ đình công trả bù lương ngày nghỉ, đình công luân phiên để bớt rủi ro mất việc): đưa $c$ từ $7 \to 3 \Rightarrow \mu = 0{,}30$, $\text{lo} = 0{,}15$, $f^\* = 0{,}15/0{,}70 \approx 0{,}214 = 21{,}4\%$. Seed $20\%$ vẫn hơi thấp — kết hợp biện pháp 2.
- **Biện pháp 2 — tăng lợi ích công $b$** (làm rõ mức tăng lương lớn, tính cấp bách, đưa tin rộng): đưa $b$ từ $10 \to 20$ (cùng $c=3$) $\Rightarrow \mu = 0{,}15$, $\text{lo} = 0{,}15 - 0{,}15 = 0 \Rightarrow f^\* = 0$. Khi ấy **bất kỳ** seed dương nào cũng châm ngòi, seed $20\%$ dư sức lật thành công.

Có thể thêm biện pháp cấu trúc mạng (mục 5): **dồn** người tiên phong vào một phân xưởng gắn kết để phân xưởng đó bùng trước, rồi lan sang phân xưởng khác qua công đoàn viên làm cầu nối.

> 📝 **Tóm tắt bài học.**
> - Lợi ích chung không tự thành hành động chung: hàng hóa công + kẻ ăn theo → dưới-cung cấp (Olson).
> - Ngưỡng cá nhân $\mu = c/b$; rải quanh $\mu$ với $\sigma$; động lực $f_{t+1} = F(f_t)$ từ seed.
> - Khối lượng tới hạn $f^\* = \dfrac{\mu-\sigma}{1-2\sigma}$: vượt → bùng nổ (chữ S lên $100\%$), dưới → sụp về $0\%$.
> - Ba đòn bẩy: tăng seed, giảm chi phí, tăng lợi ích. Cấu trúc mạng (cụm, hub, cầu nối) đổi cuộc chơi dù $f^\*$ không đổi.

---

## Bài tiếp theo

**[Lesson 12 — Thay đổi xã hội](../lesson-12-social-change/)**: khi các phong trào vượt điểm bùng phát và lặp lại theo thời gian, chúng tạo ra **thay đổi xã hội** ở quy mô lớn — từ cách mạng, chuyển đổi chuẩn mực, tới lan tỏa công nghệ. Ta sẽ ghép mô hình tipping của bài này vào bức tranh động lực dài hạn.

Minh họa tương tác: [visualization.html](./visualization.html) — kéo slider chi phí, lợi ích, số người tiên phong và độ đa dạng, xem phong trào bùng nổ (đường chữ S) hay sụp về 0 qua từng vòng.
