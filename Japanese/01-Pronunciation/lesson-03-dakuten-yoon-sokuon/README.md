# Lesson 03 — Âm biến thể: Dakuten, Yōon, Sokuon, Trường âm

> Sau khi thuộc 46 âm gốc của hiragana và katakana, bảng âm tiếng Nhật
> mở rộng nhờ **4 cơ chế biến thể**: thêm dấu đục (dakuten / handakuten),
> ghép âm (yōon), âm ngắt nhân đôi phụ âm (sokuon), và kéo dài nguyên âm
> (trường âm / chōon). Bốn cơ chế này tạo ra phần lớn từ vựng còn lại —
> và mỗi cơ chế đều **đổi nghĩa** nếu đọc sai.

## Mục tiêu

- Thêm đúng dấu **dakuten ゙** và **handakuten ゚** để tạo các hàng âm đục
  (ga · za · da · ba · pa).
- Ghép kana hàng い với ゃ ゅ ょ nhỏ để tạo **yōon** (kya, shu, cho...).
- Nghe và tạo được **sokuon っ** — âm ngắt nhân đôi phụ âm, phân biệt cặp
  tối thiểu như きて (kite) ↔ きって (kitte).
- Đọc đúng **trường âm** — kéo dài nguyên âm một nhịp (mora), phân biệt
  cặp tối thiểu おばさん (obasan) ↔ おばあさん (obāsan).

## Tiền đề

- [Lesson 01 — Hiragana](../lesson-01-hiragana/): phải thuộc 46 âm gốc
  hiragana (đặc biệt các hàng か さ た は và hàng い).
- [Lesson 02 — Katakana](../lesson-02-katakana/): cần cho phần trường âm
  katakana dùng dấu ー.

Toàn bộ ví dụ dưới đây có audio (Web Speech API, giọng ja-JP) trong
[visualization.html](./visualization.html) — bấm vào chữ để nghe.

## 1. Dakuten ゙ và Handakuten ゚ — âm đục

### 1.1 Cơ chế

**Dakuten (濁点, còn gọi ten-ten "゙")** là hai nét nhỏ đặt ở góc trên
bên phải một kana. Nó biến phụ âm **vô thanh** thành **hữu thanh** (dây
thanh rung khi phát âm):

- か hàng k → が hàng **g**
- さ hàng s → ざ hàng **z**
- た hàng t → だ hàng **d**
- は hàng h → ば hàng **b**

**Handakuten (半濁点, còn gọi maru "゚")** là một vòng tròn nhỏ, **chỉ áp
dụng cho hàng は**, biến nó thành hàng **p**:

- は hàng h → ぱ hàng **p**

### 1.2 Bảng đầy đủ các âm đục

| Gốc (vô thanh) | + Dakuten ゙ | Romaji | Gốc (vô thanh) | + Dakuten ゙ | Romaji |
|---|---|---|---|---|---|
| か ka | が | **ga** | さ sa | ざ | **za** |
| き ki | ぎ | **gi** | し shi | じ | **ji** |
| く ku | ぐ | **gu** | す su | ず | **zu** |
| け ke | げ | **ge** | せ se | ぜ | **ze** |
| こ ko | ご | **go** | そ so | ぞ | **zo** |
| た ta | だ | **da** | は ha | ば | **ba** |
| ち chi | ぢ | **ji** | ひ hi | び | **bi** |
| つ tsu | づ | **zu** | ふ fu | ぶ | **bu** |
| て te | で | **de** | へ he | べ | **be** |
| と to | ど | **do** | ほ ho | ぼ | **bo** |

Hàng は còn có thêm handakuten:

| Gốc | + Handakuten ゚ | Romaji |
|---|---|---|
| は ha | ぱ | **pa** |
| ひ hi | ぴ | **pi** |
| ふ fu | ぷ | **pu** |
| へ he | ぺ | **pe** |
| ほ ho | ぽ | **po** |

Lưu ý: ぢ (di) và づ (du) trong tiếng Nhật hiện đại đọc gần như trùng
じ (ji) và ず (zu); chúng xuất hiện rất hiếm nên tạm chưa cần phân biệt.

### 1.3 Ví dụ (≥ 4)

Dakuten:

| Từ | Romaji | Nghĩa |
|---|---|---|
| がっこう | gakkō | trường học |
| だいがく | daigaku | đại học |
| でんわ | denwa | điện thoại |
| かばん | kaban | cặp, túi xách |
| ざっし | zasshi | tạp chí |

Handakuten:

| Từ | Romaji | Nghĩa |
|---|---|---|
| えんぴつ | enpitsu | bút chì |
| さんぽ | sanpo | đi dạo |
| きっぷ | kippu | vé (tàu, xe) |
| たんぽぽ | tanpopo | hoa bồ công anh |

## 2. Yōon (拗音) — âm ghép

### 2.1 Cơ chế

**Yōon** là âm ghép tạo bằng cách lấy một kana **hàng い** (ki, shi, chi,
ni, hi, mi, ri và các biến thể đục gi, ji, bi, pi) rồi ghép với một trong
ba kana **ゃ ゅ ょ viết nhỏ** (bằng ~2/3 cỡ chữ thường). Kết quả là **một
âm tiết duy nhất, một mora** — không phải hai mora.

Quy tắc đọc: bỏ nguyên âm `i` của kana gốc, thêm `ya / yu / yo`:

- き (ki) + ゃ → きゃ = **kya**
- き (ki) + ゅ → きゅ = **kyu**
- き (ki) + ょ → きょ = **kyo**

Ba hàng đặc biệt không theo mẫu "y" cơ học mà nhập vào âm xuýt:

- し (shi) + ゃゅょ → **sha · shu · sho**
- じ (ji) + ゃゅょ → **ja · ju · jo**
- ち (chi) + ゃゅょ → **cha · chu · cho**

> Phân biệt **kana lớn** và **kana nhỏ**: きや (ki-ya) là **hai mora**;
> きゃ (kya) là **một mora**. Kích thước của や quyết định nghĩa.

### 2.2 Bảng ghép đầy đủ

| Gốc | + ゃ (ya) | + ゅ (yu) | + ょ (yo) |
|---|---|---|---|
| き ki | きゃ **kya** | きゅ **kyu** | きょ **kyo** |
| ぎ gi | ぎゃ **gya** | ぎゅ **gyu** | ぎょ **gyo** |
| し shi | しゃ **sha** | しゅ **shu** | しょ **sho** |
| じ ji | じゃ **ja** | じゅ **ju** | じょ **jo** |
| ち chi | ちゃ **cha** | ちゅ **chu** | ちょ **cho** |
| に ni | にゃ **nya** | にゅ **nyu** | にょ **nyo** |
| ひ hi | ひゃ **hya** | ひゅ **hyu** | ひょ **hyo** |
| び bi | びゃ **bya** | びゅ **byu** | びょ **byo** |
| ぴ pi | ぴゃ **pya** | ぴゅ **pyu** | ぴょ **pyo** |
| み mi | みゃ **mya** | みゅ **myu** | みょ **myo** |
| り ri | りゃ **rya** | りゅ **ryu** | りょ **ryo** |

### 2.3 Ví dụ (≥ 4)

| Từ | Romaji | Nghĩa |
|---|---|---|
| でんしゃ | densha | tàu điện |
| しゃしん | shashin | bức ảnh |
| おちゃ | ocha | trà |
| りょこう | ryokō | du lịch |
| きょう | kyō | hôm nay |
| しゅくだい | shukudai | bài tập về nhà |
| びょういん | byōin | bệnh viện |

## 3. Sokuon (促音) — âm ngắt っ

### 3.1 Cơ chế

**Sokuon** được viết bằng một **つ nhỏ (っ)** đặt trước một kana. Nó
**không phát ra âm riêng** — thay vào đó nó **nhân đôi phụ âm** của kana
theo sau và tạo một **khoảng ngắt (một mora im lặng)** đúng bằng độ dài
một nhịp:

- きて = ki-te (2 mora, không ngắt)
- きって = ki-**(ngắt)**-te → phụ âm t được giữ, phát thành **kit-te**
  (3 mora)

Cơ học phát âm: khi tới っ, bạn **chặn luồng hơi** tại vị trí sẽ phát phụ
âm kế tiếp và giữ im lặng đúng một nhịp, rồi mới bật ra. Với きって, bạn
ngậm lưỡi ở vị trí "t", dừng một nhịp, rồi mới đọc "te".

っ chỉ đứng trước các hàng phụ âm bật/xuýt (k, s, t, p) và **không bao
giờ đứng cuối từ** trong văn viết chuẩn.

### 3.2 Cặp tối thiểu (nghe để phân biệt)

Đây là các cặp **chỉ khác nhau ở っ** nhưng khác nghĩa hoàn toàn — bằng
chứng rõ nhất cho thấy độ dài âm ngắt mang nghĩa:

| Không っ | Nghĩa | Có っ | Nghĩa |
|---|---|---|---|
| きて (kite) | (hãy) đến | きって (kitte) | tem thư |
| さか (saka) | con dốc | さっか (sakka) | tác giả |
| おと (oto) | âm thanh | おっと (otto) | chồng |
| いか (ika) | mực (con mực) | いっか (ikka) | cả gia đình |

### 3.3 Ví dụ khác (≥ 4)

| Từ | Romaji | Nghĩa |
|---|---|---|
| がっこう | gakkō | trường học |
| ざっし | zasshi | tạp chí |
| きっぷ | kippu | vé |
| けっこん | kekkon | kết hôn |
| いっぱい | ippai | đầy, nhiều |

## 4. Trường âm (長音 chōon) — nguyên âm dài

### 4.1 Cơ chế

**Trường âm** là nguyên âm được **kéo dài đúng một mora**. Cũng như
sokuon, độ dài ở đây **mang nghĩa**: おばさん (obasan, 4 mora) là "cô,
dì"; おばあさん (obāsan, 5 mora) là "bà". Chỉ khác một nhịp kéo dài mà
sang hẳn thế hệ khác.

Trong romaji, trường âm được ghi bằng **dấu ngang trên nguyên âm**
(macron): ā ī ū ē ō.

### 4.2 Quy tắc viết trường âm trong hiragana

Trường âm được tạo bằng cách **thêm một kana nguyên âm** sau nguyên âm
cùng loại:

| Nguyên âm | Thêm | Ví dụ | Romaji | Nghĩa |
|---|---|---|---|---|
| a (あ段) | あ | おかあさん | okāsan | mẹ |
| i (い段) | い | おにいさん | onīsan | anh trai |
| u (う段) | う | くうき | kūki | không khí |
| e (え段) | thường い (đọc như ē) | せんせい | sensei | thầy/cô |
| e (え段) | đôi khi え | おねえさん | onēsan | chị gái |
| o (お段) | thường う (đọc như ō) | おとうさん | otōsan | bố |
| o (お段) | đôi khi お | とおい | tōi | xa |

### 4.3 Trường âm trong katakana — dấu ー

Katakana **không** lặp nguyên âm mà dùng một dấu ngang **ー (chōonpu)**
cho mọi trường âm, bất kể nguyên âm nào:

| Từ (katakana) | Romaji | Nghĩa |
|---|---|---|
| コーヒー | kōhī | cà phê |
| ビール | bīru | bia |
| ケーキ | kēki | bánh ngọt |
| スーパー | sūpā | siêu thị |
| ノート | nōto | vở, sổ tay |

### 4.4 Cặp tối thiểu (nghe để phân biệt)

| Ngắn | Nghĩa | Dài | Nghĩa |
|---|---|---|---|
| おばさん (obasan) | cô, dì | おばあさん (obāsan) | bà |
| おじさん (ojisan) | chú, bác | おじいさん (ojīsan) | ông |
| ゆき (yuki) | tuyết | ゆうき (yūki) | dũng khí |
| ビル (biru) | tòa nhà | ビール (bīru) | bia |

Cặp ビル/ビール minh họa dấu ー trong katakana: ビル (bi-ru, 2 mora) vs
ビール (bi-**ー**-ru, 3 mora).

## 5. Bài tập

### Bài tập 1 — Thêm dấu đục

Viết dạng có dakuten (hoặc handakuten) và romaji tương ứng:

1. か → ?
2. し → ?
3. て → ?
4. ほ → ? (dakuten) và → ? (handakuten)

### Bài tập 2 — Đọc yōon

Chuyển các âm ghép sau sang romaji:

1. きゃ
2. しゅ
3. ちょ
4. りょ
5. びょう

### Bài tập 3 — Phân biệt sokuon

Với mỗi cặp, ghi romaji và nghĩa của cả hai từ:

1. きて / きって
2. さか / さっか
3. おと / おっと

### Bài tập 4 — Trường âm

1. Ghép trường âm đúng cho "mẹ" và "bố" (hiragana) rồi ghi romaji.
2. Phân biệt nghĩa của おばさん và おばあさん.
3. Viết lại "cà phê" và "bia" bằng katakana có dấu ー.

## 6. Lời giải chi tiết

### Bài 1

1. か → **が** (ga).
2. し → **じ** (ji).
3. て → **で** (de).
4. ほ → **ぼ** (bo) với dakuten; → **ぽ** (po) với handakuten. Hàng は là
   hàng duy nhất nhận được cả hai dấu.

### Bài 2

1. きゃ → **kya** (bỏ `i` của ki, thêm `ya`).
2. しゅ → **shu** (hàng し nhập âm xuýt: sh + u).
3. ちょ → **cho** (hàng ち: ch + o).
4. りょ → **ryo**.
5. びょう → **byō** — びょ là yōon (byo), thêm う phía sau là trường âm nên
   đọc dài thành `byō` (ví dụ びょういん byōin — bệnh viện).

### Bài 3

1. きて = **kite** (hãy đến); きって = **kitte** (tem thư). Khác nhau ở
   một nhịp ngắt trước "te".
2. さか = **saka** (con dốc); さっか = **sakka** (tác giả).
3. おと = **oto** (âm thanh); おっと = **otto** (chồng).

Trong cả ba cặp, っ nhân đôi phụ âm theo sau (t → t-t, k → k-k) và thêm
một mora im lặng; bỏ っ là đổi nghĩa.

### Bài 4

1. Mẹ = おかあさん (**okāsan**): あ段 (ka) thêm あ. Bố = おとうさん
   (**otōsan**): お段 (to) thêm う, đọc dài thành ō.
2. おばさん (obasan) = "cô, dì"; おばあさん (obāsan) = "bà". Thêm một あ
   (một mora) là chuyển sang thế hệ trên.
3. Cà phê = **コーヒー** (kōhī); bia = **ビール** (bīru). Katakana dùng ー
   cho mọi trường âm.

## Bài tiếp theo

- [Lesson 04 — Mora & Pitch Accent](../lesson-04-mora-pitch-accent/):
  học cách đếm mora (sokuon っ, trường âm, ん đều tính một mora) và trọng
  âm cao–thấp (pitch accent) của tiếng Nhật.
- Quay lại [Nhánh I — Phát âm](../README.md) | [Japanese](../../README.md)
