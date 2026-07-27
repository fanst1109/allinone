// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Japanese/03-Grammar/lesson-10-desu-masu-sentences/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 10 — Câu cơ bản & thể lịch sự (です・ます)

> Tiếng Nhật có hai "lớp" lịch sự cho câu. Với **danh từ / tính từ**, ta dùng
> copula **です (desu)** — nghĩa gần với "là". Với **động từ**, ta dùng
> **thể ます (masu)**. Đây là hai khuôn câu lịch sự (丁寧語 teineigo) mà người
> mới bắt buộc phải nắm trước khi nói chuyện với người lạ, thầy cô, khách hàng.

## Mục tiêu học tập

- Đặt được câu khẳng định cơ bản dạng **AはBです** (A là B).
- Chia đúng **4 dạng của です**: khẳng định (です), phủ định (じゃありません),
  quá khứ (でした), nghi vấn (thêm か cuối câu).
- Chia đúng **4 dạng của thể ます** cho động từ: ます / ません / ました / ませんでした.
- Đặt câu hỏi với trợ từ **か** và trả lời bằng **はい (hai) / いいえ (iie)**.

## Kiến thức tiền đề

- [Lesson 09 — Trợ từ (particles)](../lesson-09-particles/) — cần biết は (wa, chủ đề),
  を (o, tân ngữ), へ (e, hướng đến). Bài này dùng lại chúng liên tục.
- Đọc được hiragana + biết một ít kanji N5 ([Lesson 06](../../02-Kanji-Vocabulary/lesson-06-kanji-n5/)).

Toàn bộ ví dụ trong bài đều có audio (Web Speech API, giọng ja-JP) trong
[visualization.html](./visualization.html) — click vào câu để nghe.

## 1. です (desu) — copula "là"

### 1.1 Cấu trúc AはBです

Khuôn câu cơ bản nhất của tiếng Nhật:

\`\`\`
A  は  B  です。
   (wa)
chủ đề — là — B
\`\`\`

- **A** là chủ đề, đánh dấu bằng trợ từ **は** (viết là は nhưng đọc là *wa*).
- **B** là danh từ hoặc tính từ.
- **です** đứng cuối, làm câu trở nên **lịch sự**. Bỏ です đi thì câu thành
  thể thân mật (sẽ học sau) — với người lạ luôn giữ です.

Ba ví dụ:

| Tiếng Nhật | Romaji | Nghĩa |
|---|---|---|
| わたしは がくせいです。 | Watashi wa gakusei desu. | Tôi là học sinh. |
| これは ほんです。 | Kore wa hon desu. | Cái này là sách. |
| たなかさんは せんせいです。 | Tanaka-san wa sensei desu. | Anh Tanaka là giáo viên. |

### 1.2 Bốn dạng của です

Đây là phần cốt lõi. Cùng một câu **わたしは がくせいだ** ("tôi là học sinh"),
copula です biến đổi theo 4 dạng:

| Dạng | Đuôi | Ví dụ (がくせい = học sinh) | Romaji | Nghĩa |
|---|---|---|---|---|
| **Khẳng định** (hiện tại) | です | 学生です | gakusei desu | là học sinh |
| **Phủ định** | じゃありません | 学生じゃありません | gakusei ja arimasen | không phải là học sinh |
| **Quá khứ** | でした | 学生でした | gakusei deshita | đã là học sinh |
| **Nghi vấn** | ですか | 学生ですか | gakusei desu ka | có phải là học sinh không? |

Ghi chú quan trọng:

- **じゃありません** có một biến thể trang trọng hơn là **ではありません**
  (*dewa arimasen*). Nghĩa giống nhau; じゃ là dạng nói, では là dạng viết/trang trọng.
- **Quá khứ phủ định** ("đã không phải là...") ghép hai ý trên:
  **じゃありませんでした** (*ja arimasen deshita*). Ví dụ: 学生じゃありませんでした
  = "đã không phải là học sinh".
- **Nghi vấn** chỉ cần thêm **か** vào cuối câu — **không đảo trật tự từ** như tiếng Anh.
  Cuối câu hỏi thường vẫn dùng dấu 。, không bắt buộc dấu ？.

Mỗi dạng ≥ 3 ví dụ:

**Khẳng định (です)**

- わたしは ベトナムじんです。 — *Watashi wa Betonamu-jin desu.* — Tôi là người Việt Nam.
- これは かばんです。 — *Kore wa kaban desu.* — Cái này là cái cặp.
- きょうは げつようびです。 — *Kyou wa getsuyoubi desu.* — Hôm nay là thứ Hai.

**Phủ định (じゃありません)**

- わたしは せんせいじゃありません。 — *Watashi wa sensei ja arimasen.* — Tôi không phải là giáo viên.
- これは わたしの ほんじゃありません。 — *Kore wa watashi no hon ja arimasen.* — Cái này không phải là sách của tôi.
- あれは ねこじゃありません。 — *Are wa neko ja arimasen.* — Cái kia không phải là con mèo.

**Quá khứ (でした)**

- きのうは やすみでした。 — *Kinou wa yasumi deshita.* — Hôm qua là ngày nghỉ.
- ちちは せんせいでした。 — *Chichi wa sensei deshita.* — Bố tôi (đã) là giáo viên.
- テストは かんたんでした。 — *Tesuto wa kantan deshita.* — Bài kiểm tra đã dễ.

**Nghi vấn (ですか)**

- これは ほんですか。 — *Kore wa hon desu ka.* — Cái này có phải là sách không?
- たなかさんは せんせいですか。 — *Tanaka-san wa sensei desu ka.* — Anh Tanaka có phải là giáo viên không?
- あなたは がくせいですか。 — *Anata wa gakusei desu ka.* — Bạn có phải là học sinh không?

### 1.3 です với tính từ

です cũng dùng để làm lịch sự cho **tính từ đuôi -na (na-adjective)** — nhóm này
hoạt động giống danh từ:

- このへやは きれいです。 — *Kono heya wa kirei desu.* — Căn phòng này đẹp/sạch.
- にほんごは かんたんです。 — *Nihongo wa kantan desu.* — Tiếng Nhật (thì) dễ.
- せんせいは しんせつでした。 — *Sensei wa shinsetsu deshita.* — Cô giáo đã rất tử tế.

Còn **tính từ đuôi -i (i-adjective)** như おおきい (to), たかい (cao/đắt) tuy vẫn thêm
です để lịch sự nhưng lại **chia khác** (quá khứ là おおきかったです chứ không phải
おおきいでした). Phần chia i-adjective để dành cho
[Lesson 11 — Động từ & tính từ](../lesson-11-verbs-adjectives/).

## 2. Thể ます (masu) — thể lịch sự của động từ

### 2.1 ます là gì?

Động từ tiếng Nhật luôn đứng **cuối câu**. Ở thể lịch sự, động từ kết thúc bằng
đuôi **〜ます**. Ví dụ nguyên mẫu (thể từ điển) 行く (*iku*, đi) ở thể lịch sự
thành 行きます (*ikimasu*). Cách biến đổi từ thể từ điển sang thể ます sẽ học kỹ ở
Lesson 11; bài này chỉ cần nhận diện và dùng đúng 4 dạng của đuôi ます.

Khuôn câu động từ cơ bản:

\`\`\`
A  は   (O を)   V ます。
(wa)   tân ngữ  động từ lịch sự
\`\`\`

- わたしは にほんごを べんきょうします。 — *Watashi wa nihongo o benkyou shimasu.* — Tôi học tiếng Nhật.

### 2.2 Bốn dạng của thể ます

Lấy động từ 行きます (*ikimasu*, đi) làm mẫu:

| Dạng | Đuôi | Ví dụ (行く = đi) | Romaji | Nghĩa |
|---|---|---|---|---|
| **Khẳng định** (hiện tại/tương lai) | 〜ます | 行きます | ikimasu | đi / sẽ đi |
| **Phủ định** (hiện tại/tương lai) | 〜ません | 行きません | ikimasen | không đi |
| **Quá khứ khẳng định** | 〜ました | 行きました | ikimashita | đã đi |
| **Quá khứ phủ định** | 〜ませんでした | 行きませんでした | ikimasen deshita | đã không đi |

Điểm mấu chốt: chỉ cần thay **phần đuôi**, phần gốc động từ (ở đây là 行き-) giữ nguyên.
Nghi vấn: y như です, chỉ thêm **か** vào cuối (行きますか = có đi không?).

Mỗi dạng ≥ 3 ví dụ:

**Khẳng định (〜ます)**

- まいにち コーヒーを のみます。 — *Mainichi koohii o nomimasu.* — Mỗi ngày tôi uống cà phê.
- あした がっこうへ いきます。 — *Ashita gakkou e ikimasu.* — Ngày mai tôi đi đến trường.
- あさ ごはんを たべます。 — *Asa gohan o tabemasu.* — Buổi sáng tôi ăn cơm.

**Phủ định (〜ません)**

- おさけを のみません。 — *Osake o nomimasen.* — Tôi không uống rượu.
- きょうは いきません。 — *Kyou wa ikimasen.* — Hôm nay tôi không đi.
- にくを たべません。 — *Niku o tabemasen.* — Tôi không ăn thịt.

**Quá khứ khẳng định (〜ました)**

- きのう えいがを みました。 — *Kinou eiga o mimashita.* — Hôm qua tôi đã xem phim.
- あさ ごはんを たべました。 — *Asa gohan o tabemashita.* — Buổi sáng tôi đã ăn cơm.
- がっこうへ いきました。 — *Gakkou e ikimashita.* — Tôi đã đi đến trường.

**Quá khứ phủ định (〜ませんでした)**

- きのう べんきょうしませんでした。 — *Kinou benkyou shimasen deshita.* — Hôm qua tôi đã không học.
- あさごはんを たべませんでした。 — *Asagohan o tabemasen deshita.* — Tôi đã không ăn sáng.
- テレビを みませんでした。 — *Terebi o mimasen deshita.* — Tôi đã không xem TV.

## 3. Câu hỏi với か và trả lời はい / いいえ

Thêm **か (ka)** vào cuối câu khẳng định là biến thành câu hỏi Yes/No.
Trả lời bằng **はい (hai)** = vâng/đúng, hoặc **いいえ (iie)** = không.

Chuỗi kinh điển:

1. これは ほんです。 — *Kore wa hon desu.* — Đây là quyển sách.
2. → これは ほんですか。 — *Kore wa hon desu ka.* — Đây có phải là sách không?
3. → はい、ほんです。 — *Hai, hon desu.* — Vâng, là sách.
4. → いいえ、ほんじゃありません。 — *Iie, hon ja arimasen.* — Không, không phải là sách.

Thêm hai cặp hỏi–đáp:

**Với です:**

- Q: たなかさんは せんせいですか。 — *Tanaka-san wa sensei desu ka.* — Anh Tanaka có phải giáo viên không?
- A (có): はい、せんせいです。 — *Hai, sensei desu.* — Vâng, là giáo viên.
- A (không): いいえ、せんせいじゃありません。がくせいです。 — *Iie, sensei ja arimasen. Gakusei desu.* — Không, không phải giáo viên. Là học sinh.

**Với động từ thể ます:**

- Q: にほんごを べんきょうしますか。 — *Nihongo o benkyou shimasu ka.* — Bạn có học tiếng Nhật không?
- A (có): はい、べんきょうします。 — *Hai, benkyou shimasu.* — Vâng, có học.
- A (không): いいえ、べんきょうしません。 — *Iie, benkyou shimasen.* — Không, không học.

Lưu ý: trả lời phủ định thì động từ/copula cũng phải chuyển sang **dạng phủ định**
tương ứng (ません / じゃありません), không chỉ nói mỗi いいえ.

## 4. Bài tập

### Bài tập 1 — Chia です theo 4 dạng

Cho câu gốc **これは ほんです** (Cái này là sách). Hãy viết lại thành:
(a) phủ định, (b) quá khứ, (c) nghi vấn, (d) quá khứ phủ định. Ghi kèm romaji.

### Bài tập 2 — Chia động từ sang thể ます (4 dạng)

Cho động từ 食べます (*tabemasu*, ăn). Viết 4 dạng: khẳng định, phủ định,
quá khứ khẳng định, quá khứ phủ định. Ghi kèm romaji + nghĩa.

### Bài tập 3 — Trả lời câu hỏi

Trả lời cả **có** và **không** cho mỗi câu hỏi:

1. あなたは がくせいですか。 (Bạn có phải học sinh không?)
2. コーヒーを のみますか。 (Bạn có uống cà phê không?)

### Bài tập 4 — Dịch Việt → Nhật (thể lịch sự)

1. Tôi là người Việt Nam.
2. Hôm qua là ngày nghỉ.
3. Ngày mai tôi sẽ đi đến trường.
4. Hôm qua tôi đã không xem TV.

## 5. Lời giải chi tiết

### Bài 1

Gốc: これは ほんです。(*Kore wa hon desu.*)

- (a) Phủ định: **これは ほんじゃありません。** — *Kore wa hon ja arimasen.* —
  Cái này không phải là sách. (Thay です → じゃありません.)
- (b) Quá khứ: **これは ほんでした。** — *Kore wa hon deshita.* —
  Cái này (trước đây) là sách. (Thay です → でした.)
- (c) Nghi vấn: **これは ほんですか。** — *Kore wa hon desu ka.* —
  Cái này có phải là sách không? (Thêm か.)
- (d) Quá khứ phủ định: **これは ほんじゃありませんでした。** —
  *Kore wa hon ja arimasen deshita.* — Cái này (trước đây) không phải là sách.
  (Ghép じゃありません + でした.)

### Bài 2

Động từ 食べます (*tabemasu*, ăn). Gốc động từ giữ nguyên là 食べ- (*tabe-*), chỉ đổi đuôi:

- Khẳng định: **食べます** — *tabemasu* — ăn / sẽ ăn.
- Phủ định: **食べません** — *tabemasen* — không ăn.
- Quá khứ khẳng định: **食べました** — *tabemashita* — đã ăn.
- Quá khứ phủ định: **食べませんでした** — *tabemasen deshita* — đã không ăn.

### Bài 3

1. あなたは がくせいですか。
   - Có: **はい、がくせいです。** — *Hai, gakusei desu.* — Vâng, tôi là học sinh.
   - Không: **いいえ、がくせいじゃありません。** — *Iie, gakusei ja arimasen.* — Không, tôi không phải học sinh.
2. コーヒーを のみますか。
   - Có: **はい、のみます。** — *Hai, nomimasu.* — Vâng, tôi có uống.
   - Không: **いいえ、のみません。** — *Iie, nomimasen.* — Không, tôi không uống.

Chú ý: câu 1 dùng copula nên phủ định là じゃありません; câu 2 là động từ nên
phủ định là ません — không lẫn hai loại.

### Bài 4

1. **わたしは ベトナムじんです。** — *Watashi wa Betonamu-jin desu.*
2. **きのうは やすみでした。** — *Kinou wa yasumi deshita.* (quá khứ của です → でした.)
3. **あした がっこうへ いきます。** — *Ashita gakkou e ikimasu.* (tương lai dùng thể ます, trợ từ へ chỉ hướng.)
4. **きのう テレビを みませんでした。** — *Kinou terebi o mimasen deshita.*
   (quá khứ phủ định của động từ → ませんでした.)

## 6. Code & Minh họa

- [visualization.html](./visualization.html) — trình dựng câu **XはYです** tương tác
  (chọn chủ đề, vị ngữ và bật/tắt 4 dạng: khẳng định / phủ định / quá khứ / nghi vấn),
  cùng hai bảng chia đầy đủ 4 dạng của **です** và **ます**, mỗi ô click là nghe được audio.

## Bài tiếp theo

- [Lesson 11 — Động từ & tính từ](../lesson-11-verbs-adjectives/) — cách chia động từ từ
  thể từ điển sang thể ます, và chia tính từ -i / -na đầy đủ.
- Quay lại [Nhánh III — Ngữ pháp](../index.html) | [Japanese](../../index.html)
`;
