# Lesson 01 — Thiên cầu & Tọa độ thiên văn (Celestial Sphere & Coordinates)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **thiên cầu (celestial sphere)** là gì và vì sao nó là một mô hình hữu ích dù "sai".
- Định vị một thiên thể bằng **tọa độ chân trời** (độ cao *altitude* + phương vị *azimuth*) — hệ gắn với người quan sát.
- Giải thích **chuyển động nhật động (diurnal motion)**: vì sao sao mọc ở đông, lặn ở tây, quay quanh thiên cực.
- Định vị bằng **tọa độ xích đạo** (xích kinh *right ascension* RA + xích vĩ *declination* Dec) — hệ gắn với các sao, không đổi theo giờ.
- Tính **độ cao của thiên cực** và **độ cao cực đại của một sao** từ vĩ độ nơi quan sát.

## Kiến thức tiền đề

- Góc, độ, đơn vị cung — lượng giác cơ bản: [`../../../Math/03-Trig-Complex/`](../../../Math/03-Trig-Complex/).
- Hệ tọa độ cầu (kinh độ/vĩ độ trên Trái Đất) — giúp bạn hiểu nhanh tọa độ trên bầu trời vì cấu trúc y hệt.

---

## 1. Thiên cầu là gì?

> 💡 **Trực giác / Hình dung.** Đứng giữa một cánh đồng đêm quang. Bạn không cảm nhận được sao nào gần, sao nào xa — tất cả như dán lên mặt trong của một **mái vòm khổng lồ** úp lên đầu. Bạn chỉ phân biệt được *hướng* tới mỗi sao, không phân biệt được *khoảng cách*. Mô hình này chính là **thiên cầu**: một mặt cầu tưởng tượng, bán kính vô hạn, tâm là người quan sát (hoặc tâm Trái Đất), mọi thiên thể được "chiếu" lên đó.

**Định nghĩa (3 phần):**

- **(a) Là gì** — Thiên cầu là một mặt cầu quy ước, bán kính tùy ý (xem như vô hạn), dùng để ghi *hướng* tới thiên thể. Vì tất cả thiên thể coi như nằm trên cùng một mặt cầu, ta chỉ cần **2 góc** để định vị một điểm — y hệt cần kinh độ + vĩ độ để định vị một thành phố.
- **(b) Vì sao tồn tại / cần** — Khoảng cách tới các sao quá lớn và (với mắt thường) không đo được. Nhưng để chỉ "kính hãy quay tới chỗ này", ta *chỉ cần hướng*. Thiên cầu vứt bỏ thông tin khoảng cách (cái ta không có) và giữ lại hướng (cái ta cần) → bài toán định vị 3 chiều rút về 2 góc.
- **(c) Ví dụ trực giác bằng số** — Sao Sirius và sao Polaris cách Trái Đất lần lượt ~8.6 và ~433 năm ánh sáng (chênh nhau 50 lần), nhưng trên thiên cầu chúng chỉ là 2 điểm, mỗi điểm gắn 2 con số. Khoảng cách thực bị "ép phẳng" đi.

> ⚠ **Lỗi thường gặp.** Thiên cầu **không quay** — Trái Đất mới quay. Cảm giác "bầu trời quay" là do ta đứng trên một Trái Đất tự quay quanh trục. Đây là một *toy model* lấy người quan sát làm tâm: tiện để mô tả góc nhìn, nhưng đừng nhầm nó với thực tại vật lý (Lesson 07 sẽ kể chuyện địa tâm → nhật tâm).

> 🔁 **Dừng lại tự kiểm tra.** Vì sao chỉ cần 2 con số để định vị một sao, trong khi định vị một chiếc máy bay cần 3 (kinh độ, vĩ độ, độ cao)?
> <details><summary>Đáp án</summary>Vì với sao ta cố tình bỏ qua khoảng cách (chiều thứ 3). Máy bay thì độ cao quan trọng nên cần đủ 3. Thiên cầu = "máy bay nhưng ai cũng coi như ở cùng một độ cao vô hạn".</details>

---

## 2. Tọa độ chân trời — Độ cao & Phương vị (Altitude / Azimuth)

Đây là hệ tọa độ **trực quan nhất** vì nó gắn với chỗ bạn đứng.

> 💡 **Trực giác.** Muốn chỉ cho bạn của bạn nhìn một ngôi sao, bạn nói: *"Nhìn về hướng đông-nam (đó là phương vị), ngước lên khoảng 40 độ trên đường chân trời (đó là độ cao)."* Hai số đó chính là tọa độ chân trời.

- **Độ cao (altitude, ký hiệu `a` hoặc `alt`)**: góc từ **đường chân trời** lên tới thiên thể. Phạm vi `0°` (ngay chân trời) → `90°` (thiên đỉnh *zenith*, ngay trên đỉnh đầu). Âm nghĩa là thiên thể nằm **dưới** chân trời (không nhìn thấy).
- **Phương vị (azimuth, ký hiệu `A` hoặc `az`)**: góc đo *dọc theo đường chân trời*, thường tính từ hướng **Bắc = 0°**, theo chiều kim đồng hồ: Đông = 90°, Nam = 180°, Tây = 270°.

**4 ví dụ số cụ thể:**

| Thiên thể (ví dụ) | alt | az | Diễn giải |
|---|---|---|---|
| Sao ngay trên đỉnh đầu | 90° | (không xác định) | Tại thiên đỉnh, mọi phương vị quy về một điểm |
| Mặt Trời lúc bình minh chính đông | 0° | 90° | Vừa nhô khỏi chân trời, hướng đông |
| Mặt Trời giữa trưa (ở VN, mùa hè) | ~80° | 180° | Gần đỉnh, hướng nam |
| Sao đã lặn | −15° | — | Dưới chân trời, không thấy |

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Tọa độ chân trời của một sao có cố định không?"* — **Không.** Vì Trái Đất quay, độ cao và phương vị của cùng một sao **thay đổi liên tục theo giờ**. Sirius lúc 20h ở `alt=20°, az=120°`, tới 23h đã sang `alt=45°, az=180°`. Đây là nhược điểm lớn → cần một hệ "dán vào sao" (mục 4).
> - *"Hai người ở hai thành phố khác nhau có cùng tọa độ chân trời cho một sao không?"* — **Không**, vì chân trời và thiên đỉnh của mỗi người khác nhau. Tọa độ chân trời mang tính **địa phương** (local).

> ⚠ **Lỗi thường gặp.** Nhầm phương vị bắt đầu từ hướng Bắc với bắt đầu từ hướng Nam. Có tài liệu (đặc biệt cũ) lấy Nam = 0°. Bài này theo chuẩn phổ biến hiện nay: **Bắc = 0°, theo chiều kim đồng hồ.**

> 🔁 **Dừng lại tự kiểm tra.** Một sao có `alt = −5°`. Bạn có nhìn thấy nó không?
> <details><summary>Đáp án</summary>Không. Độ cao âm nghĩa là sao nằm dưới đường chân trời (bị Trái Đất che). Phải đợi nó "mọc" lên alt > 0.</details>

---

## 3. Chuyển động nhật động (Diurnal Motion)

> 💡 **Trực giác.** Ngồi trên một vòng quay ngựa gỗ đang quay, bạn thấy cả công viên xung quanh "quay" ngược lại. Trái Đất là vòng quay đó (quay từ tây sang đông, 1 vòng/ngày), nên cả bầu trời có vẻ quay từ **đông sang tây** — đó là lý do Mặt Trời và sao **mọc ở đông, lặn ở tây**.

Bầu trời quay quanh một trục: trục quay của Trái Đất kéo dài ra chạm thiên cầu tại **thiên cực bắc** và **thiên cực nam**. Sao **Polaris (sao Bắc Cực)** nằm gần thiên cực bắc nên trông như **đứng yên**, mọi sao khác vẽ vòng tròn quanh nó.

- **Sao quanh cực (circumpolar)**: ở đủ gần thiên cực, sao quay tròn mà **không bao giờ lặn**.
- **Sao mọc-lặn**: ở xa cực hơn, có lúc trên, có lúc dưới chân trời.
- **Sao không bao giờ mọc**: ở phía thiên cực đối diện, mãi dưới chân trời với nơi bạn đứng.

> 📐 **Liên hệ then chốt:** **Độ cao của thiên cực = vĩ độ nơi quan sát.**
>
> Nếu bạn ở vĩ độ `φ` (phía bắc), thiên cực bắc nằm ở độ cao `alt = φ` về hướng chính bắc.

**4 ví dụ số:**

| Nơi quan sát | Vĩ độ φ | Độ cao Polaris (thiên cực bắc) |
|---|---|---|
| Bắc Cực | 90° | 90° (ngay đỉnh đầu) |
| Hà Nội | ~21° | ~21° trên chân trời bắc |
| Xích đạo | 0° | 0° (ngay chân trời) — cả 2 cực đều ở chân trời |
| Sydney | −34° | Polaris **không thấy**; thiên cực **nam** cao 34° |

> ❓ **Câu hỏi tự nhiên.** *"Vì sao ở xích đạo nhìn được nhiều sao nhất?"* — Vì ở `φ = 0°`, cả thiên cực bắc và nam đều nằm trên chân trời, và trong một năm bầu trời "lăn qua" toàn bộ thiên cầu → về lý thuyết thấy được mọi sao. Ở hai cực thì ngược lại: chỉ thấy đúng một nửa thiên cầu, nửa kia vĩnh viễn khuất.

> 🔁 **Dừng lại tự kiểm tra.** Bạn đứng ở Hà Nội (φ ≈ 21°), nhìn Polaris cao 21°. Bạn bay tới Singapore (φ ≈ 1°). Polaris bây giờ cao bao nhiêu?
> <details><summary>Đáp án</summary>≈ 1° — gần như sát chân trời bắc, rất khó thấy. Vì độ cao thiên cực = vĩ độ.</details>

---

## 4. Tọa độ xích đạo — Xích kinh & Xích vĩ (RA / Dec)

Tọa độ chân trời tiện nhưng thay đổi từng phút và khác nhau theo nơi đứng. Ta cần một hệ **dán cứng vào bầu trời sao**, để mọi đài thiên văn trên thế giới ghi cùng một con số cho cùng một sao. Đó là **tọa độ xích đạo**.

> 💡 **Trực giác.** Lấy hệ kinh độ/vĩ độ của Trái Đất rồi **"thổi phồng" ra tận thiên cầu**: xích đạo Trái Đất chiếu ra thành **xích đạo trời (celestial equator)**, các cực chiếu thành thiên cực. Khi đó:
> - **Xích vĩ (Declination, Dec, δ)** = "vĩ độ trên trời": góc từ xích đạo trời, `+90°` ở thiên cực bắc, `−90°` ở nam, `0°` ở xích đạo trời.
> - **Xích kinh (Right Ascension, RA, α)** = "kinh độ trên trời": đo dọc theo xích đạo trời, nhưng tính bằng **giờ** (0h → 24h) thay vì độ, từ một mốc gọi là **điểm xuân phân (vernal equinox)**.

**Vì sao RA tính bằng giờ?** Vì bầu trời quay đúng `360°` trong ~24 giờ → `360° / 24 = 15°` mỗi giờ. Dùng đơn vị giờ giúp tính ngay sao nào sắp lên "đỉnh trời": `1h RA = 15°`.

**4 ví dụ số (sao thật):**

| Sao | RA (α) | Dec (δ) | Ghi chú |
|---|---|---|---|
| Sirius | 6h 45m | −16.7° | Sao sáng nhất bầu trời đêm |
| Vega | 18h 37m | +38.8° | Đỉnh tam giác mùa hè |
| Polaris | 2h 32m | +89.3° | Sát thiên cực bắc → Dec gần +90° |
| Betelgeuse | 5h 55m | +7.4° | Vai chòm Orion |

> ❓ **Câu hỏi tự nhiên.**
> - *"RA/Dec có thay đổi theo giờ không?"* — **Gần như không.** Đây là điểm mạnh: RA/Dec gắn với sao, nên một đài ở Chile và một đài ở Nhật ghi cùng `α, δ` cho Sirius. (Về rất dài hạn có *tiến động — precession* làm mốc xuân phân trôi chậm ~1 vòng/26000 năm, nên catalog ghi kèm "epoch J2000".)
> - *"Đổi từ RA/Dec sang alt/az thế nào?"* — Cần biết thêm **giờ và vĩ độ** của bạn. Công thức lượng giác cầu (bài này chỉ giới thiệu; viz minh họa trực quan). Ý tưởng: RA/Dec là "địa chỉ tuyệt đối" của sao, còn alt/az là "sao đó *bây giờ* trông ở đâu so với tôi".

> 📐 **Công thức độ cao cực đại (transit).** Khi một sao lên cao nhất (qua kinh tuyến trời, gọi là *culmination*), độ cao của nó là:
>
> `alt_max = 90° − |φ − δ|`
>
> với `φ` = vĩ độ người quan sát, `δ` = xích vĩ của sao.

**Walk-through bằng số thật (verify):** Quan sát **Sirius** (`δ = −16.7°`) từ **Hà Nội** (`φ = 21°`):

```
alt_max = 90° − |21° − (−16.7°)|
        = 90° − |21° + 16.7°|
        = 90° − 37.7°
        = 52.3°
```

→ Sirius lên cao nhất khoảng **52°** trên chân trời nam ở Hà Nội. (Kiểm chứng hợp lý: Sirius ở nam thiên xích đạo, người ở bắc bán cầu thấy nó về phía nam, không quá cao — khớp.)

> ⚠ **Lỗi thường gặp.** Quên dấu trị tuyệt đối `| |`. Nếu bỏ dấu, với sao Dec âm bạn sẽ ra độ cao > 90° (vô lý). Trị tuyệt đối đảm bảo `alt_max ≤ 90°`.

> 🔁 **Dừng lại tự kiểm tra.** Một sao có `δ = +21°` quan sát từ Hà Nội `φ = 21°`. Độ cao cực đại?
> <details><summary>Đáp án</summary>`alt_max = 90° − |21° − 21°| = 90° − 0° = 90°`. Sao đi **ngay qua thiên đỉnh** — vì xích vĩ của nó bằng đúng vĩ độ người quan sát.</details>

---

## 5. Tóm tắt hai hệ tọa độ

| | Tọa độ chân trời (alt/az) | Tọa độ xích đạo (RA/Dec) |
|---|---|---|
| Gắn vào | Người quan sát | Bầu trời sao |
| Đổi theo giờ? | Có (liên tục) | Không (trừ tiến động rất chậm) |
| Đổi theo nơi đứng? | Có | Không |
| Đơn vị | alt: độ; az: độ | Dec: độ; RA: giờ |
| Dùng khi | "Chỉ tay nhìn ngay bây giờ" | Ghi catalog, điều khiển kính |

> 📝 **Tóm tắt toàn bài.**
> - **Thiên cầu**: mặt cầu quy ước, định vị thiên thể bằng 2 góc (bỏ qua khoảng cách).
> - **alt/az**: trực quan, địa phương, đổi theo giờ.
> - **Nhật động**: bầu trời "quay" do Trái Đất quay; độ cao thiên cực = vĩ độ.
> - **RA/Dec**: hệ tuyệt đối dán vào sao; RA tính bằng giờ (15°/h).
> - **Độ cao cực đại**: `alt_max = 90° − |φ − δ|`.

---

## Bài tập

1. **Độ cao thiên cực.** Bạn quan sát từ thành phố Đà Lạt, vĩ độ `φ = 11.9°` Bắc. Polaris (gần thiên cực bắc) xuất hiện ở độ cao bao nhiêu, về hướng nào?

2. **Sao quanh cực.** Vẫn ở Đà Lạt (`φ = 11.9°`). Một sao có `δ = +85°`. Hãy lập luận xem sao này có phải sao quanh cực (không bao giờ lặn) với người ở Đà Lạt không. *(Gợi ý: sao không lặn khi độ cao cực tiểu của nó vẫn ≥ 0. Độ cao cực tiểu khi qua kinh tuyến phía dưới cực là `alt_min = δ + φ − 90°` cho sao gần thiên cực bắc.)*

3. **Độ cao cực đại.** Tính độ cao cực đại của Vega (`δ = +38.8°`) khi quan sát từ Hà Nội (`φ = 21°`) và từ Sydney (`φ = −34°`). Vega ở phía bắc hay nam bầu trời với mỗi người?

4. **Đổi RA sang độ.** Sirius có `RA = 6h 45m`. Đổi sang độ. Sau bao lâu (xấp xỉ) kể từ khi điểm xuân phân qua kinh tuyến, Sirius sẽ qua kinh tuyến?

5. **Phân biệt hệ tọa độ.** Bạn đọc trong catalog: "M42 (tinh vân Orion): RA 5h 35m, Dec −5.4°". Vì sao catalog dùng RA/Dec mà không dùng alt/az? Nêu 2 lý do.

---

## Lời giải chi tiết

### Bài 1 — Độ cao thiên cực

**Cách tiếp cận:** dùng quy tắc *độ cao thiên cực = vĩ độ người quan sát*, hướng về chính bắc (với thiên cực bắc).

`alt(Polaris) ≈ φ = 11.9°`, về hướng **chính bắc** (az = 0°).

→ Ở Đà Lạt, Polaris chỉ cao gần **12°** trên chân trời bắc — khá thấp, dễ bị nhà cửa/cây che. (Càng về xích đạo Polaris càng sát chân trời.)

### Bài 2 — Sao quanh cực

**Cách tiếp cận:** Sao quanh cực ⇔ độ cao **cực tiểu** (lúc qua kinh tuyến dưới) vẫn ≥ 0°.

Công thức độ cao cực tiểu cho sao gần thiên cực bắc:
```
alt_min = δ + φ − 90°
        = 85° + 11.9° − 90°
        = 6.9°
```
`alt_min = 6.9° > 0°` → sao **không bao giờ lặn** ⇒ **đúng là sao quanh cực** với người ở Đà Lạt.

**Kiểm tra trực giác:** điều kiện quanh cực rút gọn là `δ ≥ 90° − φ = 90° − 11.9° = 78.1°`. Vì `85° ≥ 78.1°` nên thỏa — khớp.

### Bài 3 — Độ cao cực đại của Vega

Dùng `alt_max = 90° − |φ − δ|`, `δ = +38.8°`.

- **Hà Nội** (`φ = 21°`):
  ```
  alt_max = 90° − |21° − 38.8°| = 90° − 17.8° = 72.2°
  ```
  `φ < δ` nên sao qua kinh tuyến ở phía **bắc** thiên đỉnh → Vega ở **phía bắc** bầu trời, rất cao (72°).

- **Sydney** (`φ = −34°`):
  ```
  alt_max = 90° − |−34° − 38.8°| = 90° − 72.8° = 17.2°
  ```
  Vega chỉ cao **17°**, ở phía **bắc** chân trời (vì δ dương, người ở nam bán cầu nhìn lên phía bắc). Thấp và khó quan sát — đó là lý do "tam giác mùa hè" là đặc sản bầu trời **bắc** bán cầu.

### Bài 4 — Đổi RA sang độ

**Đổi giờ-phút sang giờ thập phân:** `6h 45m = 6 + 45/60 = 6.75h`.

**Đổi sang độ:** mỗi giờ = 15°:
```
6.75h × 15°/h = 101.25°
```

**Thời gian sau xuân phân:** RA đo trực tiếp "độ trễ" so với điểm xuân phân tính theo thời gian sao. Sirius có RA = 6.75h ⇒ qua kinh tuyến **≈ 6 giờ 45 phút (thời gian sao)** sau khi điểm xuân phân qua kinh tuyến. (Đây chính là ý nghĩa "right ascension" — *thăng thiên về bên phải*: thời điểm thiên thể lên đỉnh trời.)

### Bài 5 — Vì sao catalog dùng RA/Dec

Hai lý do (chọn 2 trong số):

1. **Bất biến theo thời gian** — RA/Dec gắn với sao nên không đổi theo giờ. Nếu ghi alt/az thì con số chỉ đúng tại một thời điểm, một địa điểm — vô dụng cho người đọc ở nơi/giờ khác.
2. **Bất biến theo nơi quan sát** — Mọi đài thiên văn trên Trái Đất ghi cùng `α, δ` cho M42. alt/az thì mỗi nơi một khác.
3. (Bonus) **Điều khiển kính tự động** — kính xích đạo chỉ cần quay theo 1 trục để bám sao, vì sao chạy theo đúng đường RA cố định.

---

## Code & Minh họa

- **Visualization tương tác**: [visualization.html](./visualization.html) — gồm:
  - **Sky Dome**: bán cầu trời nhìn từ người quan sát; kéo slider **vĩ độ** và **giờ** để thấy thiên cực dâng/hạ và sao quay quanh cực.
  - **Coordinate Converter**: nhập RA/Dec + vĩ độ + giờ → hiển thị alt/az tương ứng (minh họa mục 4).
  - **Transit Calculator**: nhập `φ` và `δ`, hiện ngay `alt_max = 90° − |φ − δ|` kèm hình.

---

## Bài tiếp theo

→ [Lesson 02 — Mặt Trời & mùa](../lesson-02-seasons-sun/): vì sao Mặt Trời đổi độ cao theo mùa, hoàng đạo, độ nghiêng trục 23.5°. Ta sẽ dùng lại khái niệm xích vĩ (Dec) của bài này — Mặt Trời chính là một "sao" có Dec thay đổi trong năm.

**Tham khảo chéo:** lượng giác cho phép đổi tọa độ đầy đủ → [`../../../Math/03-Trig-Complex/`](../../../Math/03-Trig-Complex/).
