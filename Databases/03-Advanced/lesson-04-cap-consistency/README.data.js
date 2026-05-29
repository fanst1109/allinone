// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Databases/03-Advanced/lesson-04-cap-consistency/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — CAP & Nhất quán phân tán

> Nhóm 3 — Nâng cao · Bài thứ tư của lĩnh vực [Databases](../../README.md)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phát biểu được **định lý CAP (CAP theorem)** và hiểu rõ từng chữ: **C**onsistency (nhất quán), **A**vailability (sẵn sàng), **P**artition tolerance (chịu lỗi phân mảnh mạng).
- Hiểu luận điểm cốt lõi: trong một hệ phân tán thật, **phân mảnh mạng (network partition)** là điều bắt buộc phải tính tới — và **khi nó xảy ra**, ta chỉ được chọn **C hoặc A**, không thể cả hai.
- Phân loại được một hệ là nghiêng **CP** hay **AP**, kèm ví dụ thực (ngân hàng vs giỏ hàng).
- Mở rộng sang **PACELC**: ngay cả khi *không* phân mảnh, vẫn có đánh đổi giữa **độ trễ (Latency)** và **nhất quán (Consistency)**.
- Phân biệt các **mức nhất quán (consistency levels)**: strong, eventual, read-your-writes, monotonic reads.
- Tính được điều kiện **quorum** \`R + W > N\` để đảm bảo đọc thấy ghi mới nhất.

## Kiến thức tiền đề

- [Lesson 03 — Replication & Sharding](../lesson-03-replication-sharding/): khái niệm **bản sao (replica)**, nhân bản (replication), và nền tảng quorum đều bắt nguồn từ đây. Bài này giả định bạn đã biết "một dữ liệu có thể có nhiều bản sao trên nhiều node".
- [Lesson 03 (Nhóm 2) — Transaction & ACID](../../02-Intermediate/lesson-03-transaction-acid/): bạn sẽ thấy chữ **C** trong ACID và chữ **C** trong CAP **không cùng nghĩa** — bài này chỉ rõ chỗ đó.

---

## 1. Đặt vấn đề: hai máy chủ, một sự thật?

Giả sử dịch vụ của bạn lưu số dư tài khoản trên **2 node** (hai máy chủ ở hai trung tâm dữ liệu), mỗi node giữ một **bản sao (replica)** của cùng dữ liệu để chịu tải và chịu lỗi. Mọi thứ êm đẹp cho tới khi **cáp mạng giữa hai trung tâm bị đứt**: node 1 và node 2 không nói chuyện được với nhau nữa, nhưng cả hai vẫn sống và vẫn nhận request từ client.

> Đúng lúc đó, một client ghi \`balance = 1.500.000\` vào **node 1**. Một client khác hỏi node 2: *"số dư bây giờ là bao nhiêu?"*. Node 2 chưa nhận được bản cập nhật (vì cáp đứt). Nó nên **trả \`1.000.000\` (giá trị cũ)** hay **từ chối trả lời cho tới khi nối lại được node 1**?

Đây không phải câu hỏi tu từ — nó là **trái tim của định lý CAP**, và ta sẽ trả lời cụ thể ngay trong bài này.

💡 **Trực giác.** Hãy tưởng tượng hai thủ thư ở hai chi nhánh cùng giữ một quyển sổ ghi số dư. Bình thường họ gọi điện cho nhau để đồng bộ. Khi đường dây điện thoại đứt, mỗi thủ thư đối mặt với một lựa chọn: **"cứ trả lời theo sổ của tôi dù có thể đã cũ"** (luôn phục vụ — nhưng có thể sai), hoặc **"tôi không chắc sổ mình mới nhất, nên xin lỗi chưa thể trả lời"** (luôn đúng — nhưng từ chối phục vụ). Không có lựa chọn thứ ba vừa-luôn-đúng-vừa-luôn-trả-lời khi đường dây đã đứt.

---

## 2. Định lý CAP — ba chữ cái

### 2.1 Consistency — Nhất quán

**(a) Là gì.** Trong ngữ cảnh CAP, **Consistency** nghĩa là: mọi lần đọc đều thấy **giá trị ghi gần nhất**, bất kể đọc từ node nào. Hệ "cư xử như thể chỉ có một bản dữ liệu duy nhất". Đây chính là **strong consistency (nhất quán mạnh)** — còn gọi là **linearizability**.

**(b) Vì sao cần.** Có những nghiệp vụ mà đọc-phải-mới-nhất là bắt buộc: số dư ngân hàng, tồn kho khi đặt vé. Nếu hai người cùng thấy "còn 1 vé" trên hai node khác nhau và cả hai cùng đặt → bán trùng vé. Consistency loại bỏ tình huống này.

**(c) Ví dụ số.** Node 1 ghi \`balance = 1.500.000\` lúc 10:00:00. Lúc 10:00:01, client đọc từ node 2. Nếu hệ **nhất quán**, kết quả **phải** là \`1.500.000\` (không bao giờ là \`1.000.000\` cũ). Nếu node 2 chưa kịp đồng bộ, hệ nhất quán sẽ **chặn/chờ/từ chối** đọc đó thay vì trả giá trị cũ.

⚠ **Đừng nhầm với chữ C trong ACID.** Trong [ACID](../../02-Intermediate/lesson-03-transaction-acid/), **C**onsistency nghĩa là "transaction giữ database thỏa mọi ràng buộc (constraint, khóa ngoại, trigger) — từ trạng thái hợp lệ sang trạng thái hợp lệ". Còn **C**onsistency trong CAP nghĩa là "mọi bản sao thấy cùng một giá trị mới nhất". **Hai khái niệm khác nhau hoàn toàn**, chỉ trùng tên. ACID-C là chuyện *ràng buộc dữ liệu trong một node*; CAP-C là chuyện *đồng bộ giữa nhiều node*.

### 2.2 Availability — Sẵn sàng

**(a) Là gì.** **Availability** nghĩa là: **mọi request gửi tới một node còn sống đều nhận được phản hồi** (không lỗi, không treo vô hạn) — dù phản hồi đó có thể không phải dữ liệu mới nhất. Chú ý: "có phản hồi" khác "phản hồi đúng".

**(b) Vì sao cần.** Với nhiều dịch vụ, "không trả lời" tệ hơn "trả lời hơi cũ". Một feed mạng xã hội hiện thiếu vài bài mới vẫn dùng được; còn báo lỗi "không tải được" thì người dùng bỏ đi. Doanh thu gắn với uptime → availability là tiền.

**(c) Ví dụ số.** Trong partition, client hỏi node 2 số dư. Hệ **availability cao** sẽ trả ngay \`1.000.000\` (giá trị nó đang có) trong ~5ms, thay vì để client chờ tới khi cáp nối lại (có thể 30 giây hoặc lâu hơn). Đổi lại: con số đó có thể đã cũ.

### 2.3 Partition tolerance — Chịu lỗi phân mảnh

**(a) Là gì.** **Partition (phân mảnh mạng)** là tình huống mạng giữa các node bị chia cắt: nhóm node A không gửi/nhận được message tới nhóm node B (dù mỗi nhóm vẫn chạy nội bộ). **Partition tolerance** nghĩa là **hệ vẫn tiếp tục hoạt động** khi partition xảy ra (thay vì sập toàn bộ).

**(b) Vì sao cần — và vì sao gần như bắt buộc.** Trong hệ phân tán thật, mạng **sẽ** rớt gói, đứt cáp, timeout. Bạn không thể *chọn* "không có partition" — bạn chỉ chọn cách *phản ứng* khi nó tới. Một hệ không chịu được partition thì khi cáp đứt sẽ sập hoàn toàn → vô dụng. Vì thế trong thực tế, **P là điều kiện bắt buộc**, không phải tùy chọn.

**(c) Ví dụ số.** Hai trung tâm dữ liệu nối nhau bằng đường truyền có độ sẵn sàng 99,9%. Tức trung bình mỗi năm có ~8,7 giờ đường truyền hỏng. Trong 8,7 giờ đó hệ vẫn nhận request — bạn buộc phải có sẵn cách xử lý partition.

📝 **Tóm tắt mục 2.** CAP gồm 3 thuộc tính: **C** = đọc luôn thấy ghi mới nhất; **A** = mọi request đều có phản hồi; **P** = hệ vẫn chạy khi mạng phân mảnh. Lưu ý CAP-C khác ACID-C.

---

## 3. Luận điểm cốt lõi: khi partition xảy ra, chỉ chọn C **hoặc** A

### 3.1 Walk-through một partition cụ thể

Quay lại ví dụ mục 1. Trạng thái ban đầu: cả node 1 và node 2 đều có \`balance = 1.000.000\`. Cáp giữa hai node **đứt** (partition). Rồi:

1. **10:00:00** — Client X ghi \`balance = 1.500.000\` vào **node 1**. Node 1 cập nhật xong, nhưng **không thể chuyển tin cho node 2** (cáp đứt).
2. **10:00:01** — Client Y hỏi **node 2**: *"số dư?"*. Node 2 đang giữ \`1.000.000\` (giá trị cũ), và không biết node 1 vừa đổi.

Node 2 có đúng **hai** lựa chọn:

| Lựa chọn của node 2 | Tên | Hy sinh | Giữ được |
| --- | --- | --- | --- |
| Trả \`1.000.000\` (giá trị cũ nó đang có) ngay | **AP** (chọn Availability) | **Consistency** — vừa trả dữ liệu cũ, sai sự thật | Availability — luôn có phản hồi |
| Từ chối / chờ tới khi nối lại node 1 | **CP** (chọn Consistency) | **Availability** — request bị treo hoặc báo lỗi | Consistency — không bao giờ trả dữ liệu cũ |

**Không có lựa chọn thứ ba.** Node 2 *không thể* vừa trả lời ngay (A) vừa đảm bảo trả \`1.500.000\` đúng (C), bởi vì thông tin \`1.500.000\` **vật lý không tới được nó** khi cáp đứt. Đây chính là định lý CAP: **khi có partition (P), bạn buộc phải hy sinh C hoặc A.**

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Sao không chờ một chút rồi đồng bộ?"* — Chờ chính là **hy sinh Availability**: trong lúc chờ, node 2 không trả lời được → đó đã là lựa chọn CP. "Chờ vô thời hạn" = không sẵn sàng.
- *"Cả ba C, A, P không thể có đồng thời thật à?"* — Đúng, **chỉ khi đang có partition**. Lúc mạng bình thường (không partition), một hệ tốt có thể vừa nhất quán vừa sẵn sàng. CAP nói về *thời điểm partition*.

### 3.2 Hiểu lầm phổ biến

⚠ **Hiểu lầm: "CAP = chọn 2 trong 3" một cách tĩnh.** Cách diễn đạt phổ biến "chọn 2 trong 3 chữ" gây hiểu sai rằng có hệ "CA" (bỏ P) tồn tại ổn định. **Sai.** Trong hệ phân tán thật, partition **sẽ** xảy ra nên **P là bắt buộc**. Đánh đổi thực sự **chỉ xuất hiện KHI có partition**, và lúc đó chỉ là giữa **C và A**. Khi *không* có partition, hệ có thể có cả C lẫn A bình thường. Nói cách khác: CAP không phải "chọn 2/3 mọi lúc", mà là "**khi partition: chọn C hay A**".

🔁 **Dừng lại tự kiểm tra.**
1. Trong partition, node 2 chưa có dữ liệu mới. Nếu nó trả về giá trị cũ ngay lập tức, hệ đang ưu tiên chữ nào và hy sinh chữ nào?
2. Vì sao "hệ CA bỏ P" không tồn tại bền vững trong hệ phân tán thật?

<details><summary>Đáp án</summary>

1. Ưu tiên **A** (Availability — luôn trả lời), hy sinh **C** (Consistency — trả dữ liệu cũ, sai). Đây là hệ **AP**.
2. Vì mạng thật chắc chắn có lúc phân mảnh; một hệ không chịu được partition sẽ sập khi cáp đứt → không dùng được. Nên P là bắt buộc, đánh đổi thật chỉ còn giữa C và A.
</details>

📝 **Tóm tắt mục 3.** Khi partition xảy ra: trả dữ liệu cũ ngay = AP (giữ A, mất C); từ chối/chờ = CP (giữ C, mất A). Không có lựa chọn thứ ba. "Chọn 2 trong 3 một cách tĩnh" là hiểu lầm — P bắt buộc, đánh đổi C/A chỉ khi partition.

---

## 4. CP vs AP — phân loại với hệ thực

💡 **Trực giác.** Hỏi một câu duy nhất: *"khi mạng đứt, dữ liệu sai có gây hậu quả nghiêm trọng hơn việc từ chối phục vụ không?"* Nếu **có** (tiền, vé, tồn kho) → nghiêng **CP** (thà từ chối còn hơn sai). Nếu **không** (feed, giỏ hàng, like count) → nghiêng **AP** (thà phục vụ với dữ liệu hơi cũ còn hơn báo lỗi).

| | **CP** (Consistency + Partition tolerance) | **AP** (Availability + Partition tolerance) |
| --- | --- | --- |
| Khi partition | Từ chối/chờ để không trả dữ liệu cũ | Trả dữ liệu (có thể cũ) ngay |
| Hy sinh | Availability (một số request bị treo/lỗi) | Consistency (đọc có thể cũ một lúc) |
| Phù hợp | Tiền, kho, vé, đặt chỗ — sai = thảm họa | Feed, giỏ hàng, like, đếm view — cũ một chút chấp nhận được |
| Ví dụ hệ | Ngân hàng, hệ thanh toán; ZooKeeper, etcd, HBase, Spanner (nghiêng CP) | Giỏ hàng Amazon (Dynamo gốc), Cassandra, mạng xã hội feed |

**Ví dụ CP — ngân hàng.** Bạn chuyển 5 triệu. Nếu trong lúc partition, hệ cho phép đọc số dư cũ rồi cho rút tiếp → có thể rút quá số dư thật. Ngân hàng thà **báo "dịch vụ tạm thời gián đoạn"** (hy sinh A) còn hơn cho rút sai (hy sinh C). → **CP**.

**Ví dụ AP — giỏ hàng.** Bạn thêm món vào giỏ trên Amazon. Khi partition, hệ vẫn cho thêm và sẽ **hợp nhất (merge)** các phiên bản giỏ hàng lại sau khi mạng nối lại. Tệ nhất là một món bị-xóa lại xuất hiện lại — phiền nhưng không chết người. Việc "luôn cho thêm vào giỏ" (A) quan trọng hơn nhất quán tức thì. → **AP**.

❓ *"Một hệ có thể vừa CP vừa AP không?"* — Không cho cùng một thao tác tại cùng thời điểm partition. Nhưng một hệ **có thể cấu hình theo từng thao tác**: ví dụ đọc số dư dùng CP, còn đọc lịch sử quảng cáo dùng AP. Đánh đổi là theo từng loại request, không phải toàn hệ cứng nhắc.

📝 **Tóm tắt mục 4.** CP = thà từ chối còn hơn sai (ngân hàng, kho, vé). AP = thà phục vụ dữ liệu cũ còn hơn báo lỗi (feed, giỏ hàng). Có thể chọn theo từng loại thao tác.

---

## 5. PACELC — mở rộng CAP cho lúc *không* partition

💡 **Trực giác.** CAP chỉ nói chuyện *khi partition*. Nhưng phần lớn thời gian mạng **không** partition — vậy lúc đó có đánh đổi gì không? Có: giữa **độ trễ (Latency)** và **nhất quán (Consistency)**.

**(a) Là gì.** **PACELC** đọc là: *if **P**artition then **A** or **C**, **E**lse (bình thường) then **L**atency or **C**onsistency*. Tức:
- **Khi có Partition (P)**: chọn **A** hoặc **C** — đúng như CAP.
- **Còn lại (Else, E)**: chọn **L** (độ trễ thấp) hoặc **C** (nhất quán mạnh).

**(b) Vì sao cần.** CAP bỏ sót một thực tế: ngay cả lúc mạng tốt, muốn nhất quán mạnh thì mỗi lần ghi phải chờ *nhiều bản sao* xác nhận → **chậm hơn**. Nếu chấp nhận eventual consistency, ghi xong là trả về ngay → **nhanh hơn**. PACELC nắm bắt đánh đổi này.

**(c) Ví dụ số.** Ghi với strong consistency cần chờ 2/3 node ở 2 trung tâm dữ liệu xác nhận, mỗi vòng round-trip ~40ms → tổng ~80ms. Cùng ghi đó nếu chỉ cần 1 node local xác nhận (eventual) → ~5ms. PACELC: hệ nghiêng **EL** (chọn Latency) sẽ trả về sau 5ms; hệ **EC** (chọn Consistency) chờ 80ms.

| Hệ | Lúc Partition | Lúc bình thường (Else) | Phân loại PACELC |
| --- | --- | --- | --- |
| Cassandra (mặc định) | A | L | **PA/EL** |
| Spanner | C | C | **PC/EC** |
| DynamoDB | A | L | **PA/EL** |
| (Hệ nhất quán mạnh truyền thống) | C | C | **PC/EC** |

📝 **Tóm tắt mục 5.** PACELC bổ sung cho CAP: khi *không* partition vẫn có đánh đổi **Latency vs Consistency** — nhất quán mạnh thì chậm (chờ nhiều bản sao), eventual thì nhanh.

---

## 6. Các mức nhất quán (consistency levels)

### 6.1 Strong consistency (nhất quán mạnh)

**(a) Là gì.** Mọi đọc thấy giá trị ghi gần nhất, như thể chỉ có một bản dữ liệu. Đây là chữ C trong CAP.

**(b) Vì sao cần.** Số dư, tồn kho, khóa phân tán — nơi dữ liệu cũ gây hậu quả thật.

**(c) Ví dụ số.** Ghi \`x = 5\` lúc t=0. Mọi đọc tại t > 0 từ bất kỳ node nào **đều** trả \`5\`. Không bao giờ trả giá trị cũ.

### 6.2 Eventual consistency (nhất quán cuối cùng)

**(a) Là gì.** Nếu *ngừng ghi mới*, thì sau một khoảng thời gian (không xác định trước), **mọi bản sao sẽ hội tụ** về cùng một giá trị mới nhất. Trong lúc chuyển tiếp, các đọc có thể thấy giá trị khác nhau.

**(b) Vì sao cần.** Đổi lấy độ trễ thấp và sẵn sàng cao (AP/EL). Phù hợp khi "cũ vài giây" không sao.

**(c) Ví dụ số — DNS.** Bạn đổi bản ghi DNS của \`example.com\` lúc 10:00. Do TTL caching, một số resolver vẫn trả IP cũ tới ~10:05. Sau khi cache hết hạn, **tất cả** hội tụ về IP mới. Đó là eventual consistency: cuối cùng đồng nhất, nhưng không tức thì.

**Ví dụ số — giỏ hàng.** Thêm món lúc 12:00:00 trên node A. Node B ở vùng khác có thể chưa thấy món đó tới 12:00:02. Sau ~2 giây replication, hai node đồng nhất.

⚠ **Eventual consistency KHÔNG có nghĩa "lúc nào cũng sai".** Nó nghĩa "cuối cùng sẽ đúng nếu ngừng ghi". Trong thực tế độ trễ hội tụ thường rất nhỏ (mili-giây tới vài giây).

### 6.3 Hai mức trung gian (sơ lược)

- **Read-your-writes (đọc thấy ghi của chính mình).** Sau khi *bạn* ghi \`x = 5\`, các lần *bạn* đọc tiếp theo phải thấy \`5\` (dù người khác có thể còn thấy cũ). Ví dụ: bạn sửa avatar xong, reload thấy avatar mới ngay — dù bạn của bạn còn thấy avatar cũ vài giây.
- **Monotonic reads (đọc đơn điệu).** Một khi bạn đã đọc thấy giá trị mới, các lần đọc sau **không bao giờ lùi lại** giá trị cũ hơn. Ví dụ: bạn thấy bài viết có 10 bình luận; lần refresh sau không được hiện về 8 (dù bạn bị chuyển sang node khác).

📝 **Tóm tắt mục 6.** Strong = luôn thấy mới nhất (chậm hơn). Eventual = cuối cùng hội tụ (nhanh, AP). Read-your-writes và monotonic reads là các đảm bảo trung gian giúp trải nghiệm người dùng không "kỳ quặc" dù hệ chỉ eventual.

---

## 7. Quorum — công thức \`R + W > N\`

💡 **Trực giác.** Có **N** bản sao của một dữ liệu (nền tảng replication từ [Lesson 03](../lesson-03-replication-sharding/)). Mỗi lần *ghi*, ta đợi **W** bản sao xác nhận; mỗi lần *đọc*, ta hỏi **R** bản sao và lấy giá trị mới nhất trong số đó. Nếu **tập W node-vừa-ghi** và **tập R node-vừa-đọc** **luôn giao nhau ít nhất 1 node**, thì đọc chắc chắn chạm được node có giá trị mới nhất → đọc thấy ghi mới nhất.

**(a) Là gì.** **Quorum** là cơ chế chọn số lượng bản sao tối thiểu cho mỗi đọc/ghi: N = tổng bản sao, W = số bản sao xác nhận khi ghi, R = số bản sao đọc. Điều kiện đảm bảo đọc-thấy-ghi-mới-nhất là:

> **R + W > N**

**(b) Vì sao đúng.** Nếu \`R + W > N\` thì tập R node và tập W node **không thể tách rời** — theo nguyên lý ngăn kéo (pigeonhole), hai tập có tổng kích thước lớn hơn N phải chia sẻ ít nhất 1 node chung. Node chung đó vừa nằm trong nhóm "đã nhận ghi mới" vừa nằm trong nhóm "đang được đọc" → đọc nhìn thấy giá trị mới.

**(c) Walk-through bằng số.**

**Trường hợp đảm bảo: N=3, W=2, R=2.**
- \`R + W = 2 + 2 = 4 > 3 = N\` ✓ → đảm bảo overlap.
- Ghi \`x=5\` vào W=2 node, giả sử node {A, B} xác nhận. Node C chưa kịp.
- Đọc R=2 node bất kỳ. Mọi cặp 2-node trong {A,B,C} **đều chứa ít nhất một** trong {A,B}:
  - đọc {A,B} → có A và B (mới) ✓
  - đọc {A,C} → có A (mới) ✓
  - đọc {B,C} → có B (mới) ✓
- Không có cách nào đọc trúng *toàn node cũ*. Lấy giá trị mới nhất trong R node đọc được → luôn ra \`5\`. **Đảm bảo.**

**Trường hợp KHÔNG đảm bảo: N=3, W=1, R=1.**
- \`R + W = 1 + 1 = 2\`, **không** lớn hơn \`N=3\`. ✗
- Ghi \`x=5\` chỉ vào W=1 node, giả sử node A.
- Đọc R=1 node bất kỳ. Nếu lỡ đọc node B hoặc C → cả hai còn \`x\` cũ. **Đọc ra giá trị cũ → KHÔNG đảm bảo.**
- Đây là cấu hình **ghi nhanh, đọc nhanh, nhưng chỉ eventual consistency** (rất phổ biến trong hệ AP như Cassandra mặc định).

❓ **Câu hỏi tự nhiên của người đọc.**
- *"W lớn thì sao?"* — W càng lớn, ghi càng chậm (chờ nhiều node) nhưng càng bền (ít mất dữ liệu khi node chết). W=N nghĩa là mọi node phải xác nhận → ghi chậm nhất, an toàn nhất.
- *"Có quan hệ gì với CAP?"* — Có. Đặt \`R+W>N\` cho ta nhất quán mạnh kiểu quorum → nghiêng **CP/EC**. Đặt \`R+W ≤ N\` (vd R=W=1) → nhanh nhưng eventual → nghiêng **AP/EL**. Quorum chính là *núm vặn* để chọn vị trí trên trục C–A.
- *"Tại sao không luôn đặt W=N, R=N cho chắc?"* — Vì lúc đó **một node chết là không ghi/đọc được** → mất availability hoàn toàn. Quorum cân bằng giữa nhất quán và chịu lỗi.

🔁 **Dừng lại tự kiểm tra.**
1. N=5, W=3, R=3. Có đảm bảo đọc thấy ghi mới nhất không? Vì sao?
2. N=5, W=3, R=2 thì sao?

<details><summary>Đáp án</summary>

1. \`R+W = 3+3 = 6 > 5 = N\` ✓ → **đảm bảo**. Tập 3 node-ghi và tập 3 node-đọc trong 5 node phải giao nhau ít nhất \`6−5 = 1\` node.
2. \`R+W = 3+2 = 5\`, **không** lớn hơn \`N=5\` (chỉ bằng). ✗ → **không đảm bảo**. Có thể đọc trúng đúng 2 node nằm ngoài 3 node vừa ghi → ra giá trị cũ.
</details>

📝 **Tóm tắt mục 7.** N bản sao, ghi chờ W, đọc hỏi R. \`R+W>N\` ⇒ tập đọc và tập ghi luôn giao nhau ⇒ đọc thấy ghi mới nhất (nhất quán mạnh kiểu quorum). \`R+W≤N\` ⇒ nhanh nhưng chỉ eventual. Quorum là núm vặn chọn vị trí trên trục C–A.

---

## 8. Bài tập

1. **Phân loại CP/AP.** Với mỗi hệ/yêu cầu, hệ nên nghiêng **CP** hay **AP**? Giải thích một câu: (a) hệ đặt vé máy bay (không được bán trùng ghế); (b) bộ đếm lượt xem video YouTube; (c) khóa phân tán điều phối ai được sửa file; (d) feed bài viết của một mạng xã hội.

2. **Node trả gì khi partition.** N=2 (node A, node B), partition đang xảy ra. Client ghi \`stock = 0\` (hết hàng) vào node A; node B chưa nhận được và vẫn giữ \`stock = 3\`. Một client khác hỏi node B *"còn hàng không?"*. (a) Nếu hệ chọn **CP**, node B nên làm gì? (b) Nếu chọn **AP**, node B trả gì, và hậu quả xấu nhất là gì?

3. **Tính \`R+W>N\`.** Với mỗi cấu hình, cho biết có đảm bảo đọc-thấy-ghi-mới-nhất không và vì sao: (a) N=3, W=3, R=1; (b) N=4, W=2, R=2; (c) N=7, W=4, R=4; (d) N=3, W=1, R=3.

4. **Eventual hay strong cho use case.** Với mỗi tình huống, chọn mức nhất quán phù hợp và giải thích: (a) số dư ví điện tử; (b) số lượng "tim" trên một bài đăng; (c) trạng thái "đã giao hàng" của đơn hàng; (d) gợi ý "người bạn có thể biết".

---

## 9. Lời giải chi tiết

### Bài 1 — Phân loại CP/AP

| Hệ | CP/AP | Vì sao |
| --- | --- | --- |
| (a) Đặt vé máy bay | **CP** | Bán trùng ghế = thảm họa; thà từ chối tạm thời (mất A) còn hơn cho phép sai (mất C). |
| (b) Bộ đếm lượt xem | **AP** | Sai lệch vài lượt không quan trọng; cần luôn ghi nhận được view → ưu tiên availability. |
| (c) Khóa phân tán | **CP** | Khóa mà "có thể sai" thì hai bên cùng tưởng mình giữ khóa → hỏng dữ liệu. Bắt buộc nhất quán. |
| (d) Feed mạng xã hội | **AP** | Thiếu vài bài mới trong giây lát chấp nhận được; quan trọng là feed luôn tải được. |

### Bài 2 — Node trả gì khi partition

- **(a) Chọn CP.** Node B **không tự ý trả lời** dựa trên \`stock=3\` cũ. Nó nên **từ chối / báo lỗi tạm thời / chờ** tới khi nối lại được node A và đồng bộ. Lý do: trả "còn 3" có thể dẫn tới bán hàng đã hết → vi phạm nhất quán. Hy sinh availability để không sai.
- **(b) Chọn AP.** Node B trả ngay \`stock = 3\` (giá trị nó đang có). **Hậu quả xấu nhất:** bán cho khách một món đã hết hàng (vì thật ra \`stock=0\`), dẫn tới phải hủy đơn/xin lỗi sau. Đổi lại hệ luôn phản hồi, không bao giờ "treo".

### Bài 3 — Tính \`R+W>N\`

| Cấu hình | R+W | So với N | Đảm bảo? | Giải thích |
| --- | --- | --- | --- | --- |
| (a) N=3, W=3, R=1 | 3+1=4 | 4 > 3 ✓ | **Có** | W=N nên *mọi* node có giá trị mới; đọc 1 node bất kỳ cũng trúng. Ghi chậm nhưng đọc nhanh & chắc. |
| (b) N=4, W=2, R=2 | 2+2=4 | 4 = 4 ✗ | **Không** | Chỉ *bằng* N, không lớn hơn. Có thể đọc trúng đúng 2 node nằm ngoài 2 node vừa ghi → giá trị cũ. |
| (c) N=7, W=4, R=4 | 4+4=8 | 8 > 7 ✓ | **Có** | Hai tập 4-node trong 7 phải giao ≥ \`8−7=1\` node → đọc chạm node mới. |
| (d) N=3, W=1, R=3 | 1+3=4 | 4 > 3 ✓ | **Có** | R=N nên đọc *tất cả* node, chắc chắn gồm cả node vừa ghi; lấy giá trị mới nhất → trúng. Ghi nhanh, đọc chậm. |

### Bài 4 — Eventual hay strong

- **(a) Số dư ví điện tử → strong.** Đọc số dư cũ có thể cho chi tiêu vượt mức → mất tiền. Bắt buộc nhất quán mạnh (CP).
- **(b) Số "tim" của bài đăng → eventual.** Sai lệch tạm thời vài tim không gây hại; ưu tiên ghi nhanh, sẵn sàng cao (AP/EL). Cuối cùng con số sẽ hội tụ.
- **(c) Trạng thái "đã giao hàng" → strong (hoặc gần strong).** Hai bộ phận thấy trạng thái khác nhau (đã giao / chưa giao) gây xử lý sai (giao lại, hoàn tiền nhầm). Nên nhất quán mạnh; tối thiểu cần read-your-writes + monotonic reads để không "lùi trạng thái".
- **(d) Gợi ý "người bạn có thể biết" → eventual.** Hoàn toàn không cần mới-tức-thì; chậm vài phút không sao. Ưu tiên độ sẵn sàng và độ trễ thấp.

---

## 10. Code & Minh họa

- Minh họa tương tác: [visualization.html](./visualization.html) — gồm: (1) mô phỏng partition giữa các node với chế độ CP/AP và hậu quả; (2) tam giác CAP tương tác chọn 2 đỉnh; (3) máy tính quorum kiểm tra \`R+W>N\` và minh họa overlap.

---

## Bài tiếp theo

→ [Lesson 05 — Data Warehouse & OLAP](../lesson-05-data-warehouse-olap/): khi dữ liệu giao dịch đã nằm yên trên các hệ phân tán, làm sao tổng hợp nó để phân tích — kho dữ liệu, mô hình sao (star schema), và truy vấn OLAP.
`;
