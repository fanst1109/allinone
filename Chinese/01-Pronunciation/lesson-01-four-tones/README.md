# Lesson 01 — Bốn thanh điệu (四声 Sì Shēng)

> Tiếng Trung là **ngôn ngữ thanh điệu**: cùng âm tiết `ma` đọc với 4
> thanh khác nhau → 4 chữ Hán khác nhau, 4 nghĩa khác nhau hoàn toàn.
> Sai thanh = sai nghĩa. Không có "gần đúng".

## Mục tiêu

- Phân biệt được 4 thanh điệu chuẩn + thanh nhẹ (轻声 qīng shēng).
- Vẽ được đường cao độ của mỗi thanh.
- Đọc đúng các âm tiết đơn giản với mọi thanh.
- Hiểu lỗi phổ biến của người Việt (đặc biệt nhầm thanh 2 ↔ thanh 3).

## Tiền đề

Không cần. Đây là bài học **đầu tiên** của lộ trình tiếng Trung — phải
học bài này trước khi học bất kỳ chữ Hán hay từ vựng nào.

## 1. Thanh điệu là gì?

### 1.1 Trực giác

Trong tiếng Việt, khi bạn đọc "ma", "má", "mà", "mả", "mã", "mạ" — sáu
chữ này nói khác nhau vì **dấu thanh** khác nhau. Tiếng Trung cũng vậy,
nhưng dùng **4 thanh điệu chính** (chứ không phải 6) và **không có dấu
thanh viết** — thanh điệu được ghi bằng **dấu trên Pinyin** (ā á ǎ à).

### 1.2 Định nghĩa hình thức

**Thanh điệu (tone)** là đường biến đổi **cao độ (pitch)** của một âm
tiết. Tiếng Trung dùng thang đo **5 bậc cao độ**:
- Bậc 5: cao nhất
- Bậc 3: trung bình
- Bậc 1: thấp nhất

Mỗi thanh trong tiếng Trung có một "đường đi" cố định trên thang này:

| Thanh | Ký hiệu | Tên gọi | Đường đi cao độ |
|---|---|---|---|
| **Thanh 1** | ā ē ī ō ū | 阴平 (yīn píng) | **5 → 5** (cao, bằng) |
| **Thanh 2** | á é í ó ú | 阳平 (yáng píng) | **3 → 5** (trung, lên cao) |
| **Thanh 3** | ǎ ě ǐ ǒ ǔ | 上声 (shǎng shēng) | **2 → 1 → 4** (thấp, xuống đáy, lên) |
| **Thanh 4** | à è ì ò ù | 去声 (qù shēng) | **5 → 1** (cao, xuống mạnh) |
| **Thanh nhẹ** | a e i o u | 轻声 (qīng shēng) | nhẹ, ngắn, cao độ phụ thuộc thanh trước |

> 📝 **Ghi nhớ nhanh**: thanh 1 phẳng cao, thanh 2 hỏi-ngỡ-ngàng, thanh 3 chấm
> đáy rồi nảy lên, thanh 4 dứt khoát từ cao xuống thấp.

## 2. Walk-through bằng số: bộ "mā má mǎ mà"

Đây là ví dụ kinh điển. Cùng pinyin `ma`, 4 thanh = 4 chữ Hán = 4 nghĩa:

| Pinyin | Thanh | Chữ Hán | Nghĩa | Đường cao độ |
|---|---|---|---|---|
| `mā` | 1 | 妈 | mẹ | 5—5 (ngân giọng cao đều, ~0.5s) |
| `má` | 2 | 麻 | gai, tê (như "tê chân") | 3—5 (giọng đi lên như hỏi "thật á?") |
| `mǎ` | 3 | 马 | ngựa | 2—1—4 (xuống đáy, dừng, nảy lên) |
| `mà` | 4 | 骂 | mắng, chửi | 5—1 (cú dứt khoát, "hét" ngắn) |

**Câu nhớ**: 妈妈骂马 (Mẹ mắng ngựa) → `Māma mà mǎ`. Đọc câu này bạn sẽ
thấy 3 chữ "ma" với 3 thanh khác nhau, không ai nhầm thành "ngựa mắng
mẹ" cả.

> Nghe audio đầy đủ ở [visualization.html](./visualization.html) — click
> vào từng chữ để Web Speech API phát âm.

## 3. Hướng dẫn phát âm chi tiết (mô tả cơ học)

> ⚠ **Không** mô tả bằng cách "như chữ X tiếng Việt". Tiếng Trung và
> tiếng Việt khác hệ thống âm vị — so sánh trực tiếp dẫn tới phát âm sai.

### 3.1 Thanh 1 (ā) — 5—5

- **Cao độ**: bậc 5, **GIỮ NGUYÊN** suốt âm tiết.
- **Khẩu hình**: cơ thanh quản căng đều, không thay đổi.
- **Cảm giác**: như ngân nốt nhạc cao một hơi dài.
- **Thời lượng**: khoảng 0.4–0.6 giây.

Ví dụ: `mā` (妈 — mẹ), `tā` (他 — anh ấy), `gē` (哥 — anh trai),
`shū` (书 — sách), `bā` (八 — số 8).

### 3.2 Thanh 2 (á) — 3—5

- **Cao độ**: bắt đầu bậc 3 (trung), **lên bậc 5**.
- **Khẩu hình**: cơ thanh quản căng dần lên cuối âm.
- **Cảm giác**: như đặt câu hỏi trong tiếng Việt: "Thật á?", "Hả?", "Cái gì?"
- **Thời lượng**: 0.3–0.5 giây.

Ví dụ: `má` (麻 — gai), `lái` (来 — đến), `nán` (难 — khó), `shí`
(十 — số 10), `xuéxí` (学习 — học tập).

### 3.3 Thanh 3 (ǎ) — 2—1—4

- **Cao độ**: bắt đầu bậc 2, **xuống đáy bậc 1**, rồi **nảy lên bậc 4**.
- **Khẩu hình**: thả lỏng cơ thanh quản xuống thấp, dừng rất ngắn, rồi
  bật lên.
- **Cảm giác**: giống như giọng "trùng xuống rồi ngạc nhiên": "Sao
  có chuyện đó?" — phần đầu trầm, phần sau ngẩng lên.
- **Thời lượng**: dài nhất ~0.6 giây.

Ví dụ: `mǎ` (马 — ngựa), `wǒ` (我 — tôi), `nǐ` (你 — bạn), `hǎo` (好 —
tốt), `xiǎo` (小 — nhỏ).

### 3.4 Thanh 4 (à) — 5—1

- **Cao độ**: bậc 5, **xuống đáy bậc 1**.
- **Khẩu hình**: bắt đầu căng, rồi thả mạnh xuống.
- **Cảm giác**: dứt khoát, như giọng ra lệnh hoặc khẳng định chắc nịch:
  "ĐI!" — ngắn và mạnh.
- **Thời lượng**: ngắn nhất, ~0.25–0.35 giây.

Ví dụ: `mà` (骂 — mắng), `qù` (去 — đi), `hè` (贺 — chúc mừng), `xià`
(下 — xuống), `kàn` (看 — xem).

### 3.5 Thanh nhẹ (·a) — phụ thuộc thanh trước

- **Cao độ**: KHÔNG cố định, phụ thuộc thanh của âm tiết liền trước.
- **Thời lượng**: rất ngắn ~0.1s, hầu như "rớt vào" âm trước.
- Trong Pinyin: **không có dấu**, hoặc đôi khi đánh dấu `·`.

Bảng cao độ thanh nhẹ theo thanh trước:

| Thanh trước | Cao độ thanh nhẹ | Ví dụ |
|---|---|---|
| Thanh 1 | bậc 2 (thấp) | `māma` (妈妈 — mẹ): thanh 1 cao + nhẹ thấp |
| Thanh 2 | bậc 3 (trung) | `yéye` (爷爷 — ông): thanh 2 lên + nhẹ trung |
| Thanh 3 | bậc 4 (cao hơn) | `nǎinai` (奶奶 — bà): thanh 3 + nhẹ hơi cao |
| Thanh 4 | bậc 1 (thấp) | `bàba` (爸爸 — bố): thanh 4 dứt + nhẹ thấp |

**Quy tắc đơn giản**: thanh trước cao → nhẹ thấp; thanh trước thấp → nhẹ hơi cao hơn.

## 4. Đánh dấu thanh ở đâu trên Pinyin?

Quy tắc thứ tự ưu tiên (sẽ học chi tiết ở Lesson 05):

```
a > o > e > i > u > ü
```

Nếu có 'a', dấu luôn rơi trên 'a'. Không có 'a' thì 'o' hoặc 'e'. Cuối
cùng mới đến 'i', 'u', 'ü'.

Ví dụ:
- `hǎo` (好): có 'a' → dấu trên 'a' → `hǎo`, KHÔNG `haǒ`.
- `gěi` (给): không có 'a', không 'o', có 'e' → dấu trên 'e'.
- `liú` (流): không có 'a', 'o', 'e' → so sánh 'i' và 'u': 'u' đứng sau
  thì dấu lên 'u'. (Quy tắc bổ sung: trong `iu` và `ui`, dấu rơi lên
  nguyên âm SAU.)

## 5. Lỗi phổ biến của người Việt

### 5.1 Nhầm thanh 2 với thanh 3

Đây là lỗi **kinh điển và phổ biến nhất**. Vì sao?

- Thanh 2 Trung (đi lên 3→5) gần giống dấu **hỏi** trong tiếng Việt
  ("á?", "hả?").
- Thanh 3 Trung (xuống rồi lên: 2→1→4) cũng có cảm giác "uốn" tương tự.
- Người Việt nghe vội thường gộp cả 2 thành "uốn lên".

**Khác biệt then chốt**: Thanh 3 phải **chạm đáy** trước, rồi mới nảy
lên. Nếu bạn đọc `mǎ` mà không có phần "trầm trước", người Trung sẽ
nghe thành `má` (麻 — gai), không phải `mǎ` (马 — ngựa).

**Mẹo luyện**: đọc thanh 3 hơi cường điệu phần đầu, gần như "ừm... à!".

### 5.2 Thanh 1 không đủ cao và đủ phẳng

Người Việt hay đọc thanh 1 với cao độ "trung bình" và hơi chùng xuống
cuối. Trung Quốc chuẩn: phải **cao** (bậc 5) và **PHẲNG ĐỀU** từ đầu
đến cuối. Tập bằng cách ngân giọng cao như khi hét "Aaaa~".

### 5.3 Thanh 4 không đủ dứt khoát

Người Việt thường đọc thanh 4 quá mềm. Đặc trưng thanh 4 là **dứt
khoát, ngắn, mạnh**. Tập bằng cảm giác ra lệnh: "ĐI!", "ĐỨNG!", "ĐỪNG!".

### 5.4 Bỏ thanh khi đọc nhanh

Sai. Tiếng Trung **không bao giờ bỏ thanh** trừ trường hợp thanh nhẹ
chính thức (số ít từ). Đọc nhanh vẫn phải giữ đúng đường cao độ — đó
là điểm khác lớn so với tiếng Việt (Việt khi nói nhanh dấu bị nuốt
nhiều).

## 6. Bộ ví dụ tăng dần (luyện nghe + đọc)

Tất cả ví dụ ở viz có audio. Đây là danh sách văn bản:

### 6.1 Một âm tiết, đủ 4 thanh

| Pinyin | Thanh | Chữ Hán | Nghĩa |
|---|---|---|---|
| `bā` | 1 | 八 | tám (số 8) |
| `bá` | 2 | 拔 | nhổ |
| `bǎ` | 3 | 把 | nắm, cầm; lượng từ |
| `bà` | 4 | 爸 | bố |

| Pinyin | Thanh | Chữ Hán | Nghĩa |
|---|---|---|---|
| `shī` | 1 | 师 | thầy |
| `shí` | 2 | 十 | mười |
| `shǐ` | 3 | 史 | lịch sử |
| `shì` | 4 | 是 | là, đúng |

| Pinyin | Thanh | Chữ Hán | Nghĩa |
|---|---|---|---|
| `tāng` | 1 | 汤 | súp |
| `táng` | 2 | 糖 | đường (ngọt) |
| `tǎng` | 3 | 躺 | nằm |
| `tàng` | 4 | 烫 | nóng bỏng |

### 6.2 Hai âm tiết, các thanh kết hợp

| Pinyin | Chữ Hán | Nghĩa | Cấu trúc thanh |
|---|---|---|---|
| `māma` | 妈妈 | mẹ | 1 + nhẹ |
| `bàba` | 爸爸 | bố | 4 + nhẹ |
| `nǐhǎo` | 你好 | xin chào | 3 + 3 → đọc thành 2 + 3 (xem Lesson 04) |
| `xièxiè` | 谢谢 | cảm ơn | 4 + nhẹ |
| `zàijiàn` | 再见 | tạm biệt | 4 + 4 |
| `lǎoshī` | 老师 | thầy giáo | 3 + 1 |
| `xuéxiào` | 学校 | trường học | 2 + 4 |
| `hànyǔ` | 汉语 | Hán ngữ | 4 + 3 |
| `pǔtōnghuà` | 普通话 | tiếng phổ thông | 3 + 1 + 4 |
| `Zhōngguó` | 中国 | Trung Quốc | 1 + 2 |
| `Yuènán` | 越南 | Việt Nam | 4 + 2 |

> 💡 Khi đọc `nǐhǎo` (3-3), thực tế phải đọc thành `ní hǎo` — đây là
> biến điệu (tone sandhi) sẽ học kỹ ở Lesson 04. Cho Lesson 01, chấp nhận
> rằng "viết là `nǐhǎo` nhưng đọc là `níhǎo`".

## 7. Bài tập

### Bài tập 1 — Nghe và xác định thanh

(Trong [visualization.html](./visualization.html)) Click "Bài tập nghe
thanh", nghe audio của 10 âm tiết và đánh dấu thanh tương ứng.

### Bài tập 2 — Đọc to và so sánh

Đọc to bộ ví dụ 6.1 theo thứ tự 1-2-3-4 cho từng nhóm (bā/bá/bǎ/bà,
shī/shí/shǐ/shì, tāng/táng/tǎng/tàng). Ghi âm. So sánh với audio chuẩn
trong viz.

### Bài tập 3 — Phân biệt thanh 2 và 3 trong câu

Cho các câu sau, xác định mỗi âm tiết là thanh 2 hay 3:

1. `Wǒ shì lǎoshī` (我是老师 — Tôi là giáo viên)
2. `Tā lái le` (他来了 — Anh ấy đến rồi)
3. `Wǒmen yǒu chá` (我们有茶 — Chúng tôi có trà)
4. `Nǐ hǎo ma?` (你好吗？— Bạn khoẻ không?)

### Bài tập 4 — Đánh dấu thanh trên pinyin không dấu

Cho các pinyin không có dấu thanh, dựa vào chữ Hán + nghĩa đã biết, thêm
dấu thanh đúng:

1. `wo` (我 — tôi)
2. `hao` (好 — tốt)
3. `mama` (妈妈 — mẹ)
4. `xie xie` (谢谢 — cảm ơn)
5. `Zhongguo` (中国 — Trung Quốc)

## 8. Lời giải chi tiết

### Bài 1

Đáp án có trong viz (mỗi audio kèm thanh chuẩn). Mục tiêu: 8/10 trở
lên sau khi luyện 3–5 lần.

### Bài 2

Tự luyện tập. Tiêu chí đúng:
- Thanh 1: cao và phẳng đều, không chùng xuống.
- Thanh 2: bắt đầu trung, kết thúc cao (giống câu hỏi).
- Thanh 3: trầm trước, nảy lên sau (cường điệu phần trầm khi mới luyện).
- Thanh 4: ngắn, dứt khoát, từ cao xuống đáy.

### Bài 3

1. `Wǒ` (3) `shì` (4) `lǎo` (3) `shī` (1) — thanh 3, 4, 3, 1.
2. `Tā` (1) `lái` (2) `le` (nhẹ) — thanh 1, 2, nhẹ.
3. `Wǒ` (3) `men` (nhẹ) `yǒu` (3) `chá` (2) — thanh 3, nhẹ, 3, 2.
4. `Nǐ` (3) `hǎo` (3) `ma` (nhẹ)? — thanh 3, 3, nhẹ. Lưu ý: `nǐ hǎo`
   trong câu đọc thực tế là `ní hǎo` (xem Lesson 04).

### Bài 4

1. `wǒ` (thanh 3): 我 là "tôi".
2. `hǎo` (thanh 3): 好 là "tốt". Lưu ý dấu rơi trên 'a' (a > o trong ưu
   tiên đặt dấu).
3. `māma` (thanh 1 + nhẹ): 妈 là thanh 1, chữ "ma" thứ hai trong 妈妈
   đọc thanh nhẹ → không dấu.
4. `xièxiè` (thanh 4 + 4): 谢 là thanh 4. Cả hai "xie" đều thanh 4
   chính thức (không phải thanh nhẹ — đây là từ kép trùng âm).
5. `Zhōngguó` (thanh 1 + 2): 中 thanh 1, 国 thanh 2.

## 9. Tóm tắt

- Tiếng Trung là **ngôn ngữ thanh điệu** — 4 thanh chính + thanh nhẹ.
- 4 thanh có đường cao độ cố định: **5-5**, **3-5**, **2-1-4**, **5-1**.
- Cùng pinyin `ma` với 4 thanh → 4 nghĩa hoàn toàn khác nhau.
- Lỗi phổ biến nhất của người Việt: **nhầm thanh 2 ↔ thanh 3** (thanh 3
  phải chạm đáy trước, không phải chỉ "uốn lên").
- Thanh được đánh dấu trên Pinyin theo thứ tự ưu tiên `a > o > e > i > u`.
- Luôn giữ thanh dù đọc nhanh.

## Bài tiếp theo

- [Lesson 02 — Thanh mẫu (21 phụ âm đầu)](../lesson-02-initials/)
- Quay lại [Nhánh I — Phát âm](../README.md) | [Chinese](../../README.md)
