# Lesson 08 — Mô hình 3 báo cáo liên kết (The Three-Statement Model)

> Ba báo cáo tài chính không phải ba tờ giấy rời. Chúng là **một cơ thể sống**: máu (lợi nhuận, tiền) chảy từ báo cáo này sang báo cáo kia qua những "mắt xích" cố định. Hiểu các mắt xích đó, bạn dựng được cả mô hình — và Bảng cân đối **luôn cân**.

## Mục tiêu học tập

- Kể tên được **6 mắt xích (link)** nối Báo cáo kết quả kinh doanh (Income Statement — IS), Bảng cân đối kế toán (Balance Sheet — BS) và Báo cáo lưu chuyển tiền tệ (Cash Flow — CF).
- Giải thích *vì sao* lợi nhuận ròng (net income) đồng thời chảy vào **Lợi nhuận giữ lại** (BS) và là **dòng đầu tiên của CFO** (CF).
- Truy được đường đi của **khấu hao** qua cả ba báo cáo.
- Dựng một kỳ đầy đủ từ các *driver* (giả định đầu vào) và **chứng minh Bảng cân đối luôn cân** — bằng đại số, không phải may mắn.

## Kiến thức tiền đề

- [Lesson 01 — Phương trình kế toán](../../01-Fundamentals/lesson-01-accounting-equation/): $A = L + E$ là "luật cân" mà cả mô hình này phải thoả.
- Báo cáo lưu chuyển tiền tệ (phương pháp gián tiếp) — học kỹ ở **Lesson 07** (cash flow); bài này dùng lại kết quả: CFO bắt đầu từ net income, cộng lại khấu hao, trừ phần tăng vốn lưu động.

Đơn vị mọi con số trong bài: **triệu đồng**.

---

## 1. Bức tranh lớn: ba báo cáo, một cơ thể

> 💡 **Trực giác.** Hình dung công ty như một **bồn nước có ống dẫn**:
> - **IS** đo *dòng chảy trong kỳ*: bán được bao nhiêu, tốn bao nhiêu, còn lãi bao nhiêu. Giống "tốc độ nước vào trừ tốc độ nước ra".
> - **BS** là *ảnh chụp tại một thời điểm*: mực nước trong bồn ngay bây giờ (có gì, nợ ai, còn lại của chủ bao nhiêu).
> - **CF** giải thích *vì sao mực tiền thay đổi*: tiền thật vào/ra từ đâu — vì lợi nhuận trên IS **không** bằng tiền thật (bán chịu chưa thu, khấu hao không mất tiền...).
>
> Ba báo cáo nhìn cùng một doanh nghiệp từ ba góc. Vì cùng một thực thể, chúng **phải khớp nhau** — và chỗ khớp chính là các mắt xích.

Ba báo cáo trả lời ba câu hỏi khác nhau:

| Báo cáo | Trả lời câu hỏi | Loại số liệu |
|---------|-----------------|--------------|
| **IS** (Kết quả kinh doanh) | "Kỳ này lãi/lỗ bao nhiêu?" | Dòng chảy trong kỳ (flow) |
| **BS** (Cân đối kế toán) | "Tại thời điểm này có gì, nợ ai?" | Số dư tại một thời điểm (stock) |
| **CF** (Lưu chuyển tiền tệ) | "Tiền thật vào/ra vì sao?" | Dòng chảy trong kỳ (flow) |

Điểm mấu chốt: **lợi nhuận ≠ tiền**. Công ty có thể lãi 90 nhưng tiền lại *giảm* 30 (như ví dụ ở mục 3). CF tồn tại chính để bắc cầu giữa "lãi trên giấy" (IS) và "tiền trong két" (BS).

> 📝 **Tóm tắt mục 1.**
> - IS = dòng chảy (lãi/lỗ trong kỳ); BS = ảnh chụp (số dư); CF = giải thích thay đổi tiền.
> - Cùng một doanh nghiệp nhìn ba góc → ba báo cáo phải khớp qua các mắt xích.
> - Lợi nhuận không phải tiền; CF là cây cầu nối hai khái niệm.

---

## 2. Sáu mắt xích (link) — mỗi cái kèm số thật

Ta sẽ dùng một bộ số xuyên suốt (chi tiết đầy đủ ở mục 3). Ở đây tách riêng từng mắt xích để thấy rõ *cái gì nối vào cái gì*.

### 2.1 Mắt xích #1 — Net income → Lợi nhuận giữ lại (IS → BS)

**(a) Là gì.** Lợi nhuận ròng cả kỳ (net income) được **cộng dồn** vào khoản Lợi nhuận giữ lại (retained earnings) trên BS, sau khi trừ cổ tức chia cho chủ.

$$\text{LN giữ lại}_{\text{cuối}} = \text{LN giữ lại}_{\text{đầu}} + \text{Net income} - \text{Cổ tức}$$

**(b) Vì sao tồn tại.** Net income là "phần công ty tự làm ra cho chủ" trong kỳ. Nó không biến mất khi năm kết thúc — nó *tích lũy* vào vốn chủ. Cổ tức là phần lấy ra chia, nên bị trừ.

**(c) Ví dụ số** (≥ 4, đa dạng):

| LN giữ lại đầu | Net income | Cổ tức | LN giữ lại cuối |
|---:|---:|---:|---:|
| 280 | 90 | 40 | $280+90-40 = \mathbf{330}$ |
| 280 | 90 | 0 | $280+90-0 = \mathbf{370}$ |
| 280 | −50 (lỗ) | 0 | $280-50 = \mathbf{230}$ |
| 0 | 120 | 120 | $0+120-120 = \mathbf{0}$ |

Dòng cuối: lãi 120 nhưng chia hết 120 → LN giữ lại đứng yên. Dòng thứ ba: **lỗ vẫn ghi được** (net income âm kéo vốn chủ xuống).

### 2.2 Mắt xích #2 — Net income → dòng đầu của CFO (IS → CF)

**(a) Là gì.** Báo cáo lưu chuyển tiền phương pháp gián tiếp **bắt đầu** từ đúng con số net income của IS, rồi điều chỉnh về tiền thật.

$$\text{CFO} = \text{Net income} + \text{Khấu hao} - \Delta\text{Phải thu} - \Delta\text{Tồn kho} + \Delta\text{Phải trả}$$

**(b) Vì sao tồn tại.** Net income đã tính sẵn "lãi trên giấy". Thay vì cộng lại từ đầu, ta lấy nó làm điểm xuất phát rồi *gỡ bỏ* những khoản không phải tiền (khấu hao) và *chỉnh* theo vốn lưu động.

**(c) Ví dụ số:** với net income 90, khấu hao 50, phải thu tăng 50, tồn kho và phải trả không đổi:
$$\text{CFO} = 90 + 50 - 50 - 0 + 0 = \mathbf{90}$$

> ❓ **Câu hỏi tự nhiên của người đọc.** *"Cùng một số net income mà vừa cộng vào BS vừa mở đầu CF — có bị tính hai lần không?"* Không. Trên **BS**, net income làm tăng *vốn chủ* (bên nguồn vốn). Trên **CF**, nó chỉ là *điểm xuất phát để lần ra tiền mặt* — kết quả CFO cuối cùng chảy vào khoản *Tiền* (một tài sản). Hai đích đến khác nhau (vốn chủ vs. một loại tài sản), nên không trùng. Chính sự "cùng một net income đi hai ngả" này là thứ giữ cho $A = L+E$ (xem mục 4).

### 2.3 Mắt xích #3 — Khấu hao xuất hiện ở CẢ BA báo cáo

Đây là mắt xích khó nhất — theo dõi kỹ một con số **khấu hao = 50**:

| Báo cáo | Khấu hao làm gì | Dấu |
|---------|-----------------|:---:|
| **IS** | Là một *chi phí* → giảm lợi nhuận trước thuế | −50 |
| **CF** | Không phải chi tiền thật → **cộng lại** vào CFO | +50 |
| **BS** | Bào mòn giá trị tài sản → giảm **PP&E ròng** | −50 |

**(a) Khấu hao là gì.** Là cách rải chi phí của một tài sản dài hạn (máy móc, nhà xưởng) ra nhiều năm sử dụng, thay vì tính hết một lần lúc mua.

**(b) Vì sao "cộng lại" ở CF.** Vì khi mua máy, tiền đã ra ở năm mua (khoản Capex — mắt xích #5). Khấu hao các năm sau chỉ là *bút toán kế toán*, **không** có đồng nào rời két. Nó đã bị trừ khi tính net income, nên ở CF ta cộng ngược lại để về đúng dòng tiền thật.

**(c) Ví dụ số cho PP&E:**

$$\text{PP\&E ròng}_{\text{cuối}} = \text{PP\&E ròng}_{\text{đầu}} + \text{Capex} - \text{Khấu hao}$$

| PP&E đầu | Capex | Khấu hao | PP&E cuối |
|---:|---:|---:|---:|
| 600 | 80 | 50 | $600+80-50 = \mathbf{630}$ |
| 600 | 0 | 50 | $600+0-50 = \mathbf{550}$ |
| 600 | 50 | 50 | $600+50-50 = \mathbf{600}$ (giữ nguyên) |
| 600 | 200 | 30 | $600+200-30 = \mathbf{770}$ |

> ⚠ **Lỗi thường gặp.** Nghĩ *"khấu hao làm giảm tiền"*. **Sai.** Khấu hao **không** đụng tới tiền — đó là lý do phải cộng lại ở CF. Thứ làm giảm tiền là **Capex** (lúc mua tài sản), không phải khấu hao.

### 2.4 Mắt xích #4 — Thay đổi vốn lưu động → CF & BS

**(a) Là gì.** Vốn lưu động (working capital) gồm phải thu, tồn kho, phải trả. Khi chúng đổi, tiền thật đổi ngược lại. Bài này dùng **phải thu (AR)** làm ví dụ chính; nó phụ thuộc *kỳ thu tiền* (DSO — Days Sales Outstanding):

$$\text{Phải thu}_{\text{cuối}} = \text{Doanh thu} \times \frac{\text{DSO}}{360}$$

**(b) Vì sao ảnh hưởng tiền.** Bán chịu ghi doanh thu ngay (làm net income tăng) nhưng **chưa thu tiền**. Phần phải thu tăng thêm chính là tiền *bị kẹt* ở khách hàng → trừ khỏi CFO.

$$\Delta\text{Phải thu} = \text{Phải thu}_{\text{cuối}} - \text{Phải thu}_{\text{đầu}} \quad(\text{tăng} \Rightarrow \text{trừ khỏi CFO})$$

**(c) Ví dụ số** (doanh thu 1000, phải thu đầu kỳ 200):

| DSO (ngày) | Phải thu cuối | ΔPhải thu | Ảnh hưởng CFO |
|---:|---:|---:|---:|
| 90 | $1000 \times \frac{90}{360} = 250$ | +50 | −50 (kẹt thêm) |
| 72 | $1000 \times \frac{72}{360} = 200$ | 0 | 0 (không đổi) |
| 36 | $1000 \times \frac{36}{360} = 100$ | −100 | +100 (thu về) |
| 180 | $1000 \times \frac{180}{360} = 500$ | +300 | −300 (kẹt nặng) |

> 💡 **Trực giác.** Thu tiền càng chậm (DSO lớn) → càng nhiều tiền nằm ở "sổ nợ khách" thay vì trong két → CFO càng thấp, dù doanh thu và lợi nhuận y hệt. Đây là lý do doanh nghiệp có thể *lãi mà vẫn thiếu tiền*.

> **Ghi chú (toy simplification).** Để giữ mô hình gọn, bài này cho **tồn kho** và **phải trả người bán** đứng yên (ΔTồn kho = ΔPhải trả = 0), chỉ cho phải thu biến động. Mô hình thực tế sẽ cho cả ba biến động (theo DIO và DPO). Cơ chế hoàn toàn tương tự: tồn kho tăng → trừ CFO; phải trả tăng → cộng CFO.

### 2.5 Mắt xích #5 — Capex → CFI & PP&E; Vay/Cổ tức → CFF & BS

- **Capex** (mua tài sản dài hạn): tiền ra thật → nằm ở **CFI** (đầu tư); đồng thời **tăng PP&E** trên BS.
- **Vay ròng** (borrowing): tiền vào (vay) hoặc ra (trả nợ) → nằm ở **CFF** (tài trợ); đồng thời đổi số dư **Nợ vay** trên BS.
- **Cổ tức**: tiền ra chia cho chủ → nằm ở **CFF**; đồng thời **giảm Lợi nhuận giữ lại** (đã thấy ở mắt xích #1).

**(c) Ví dụ số:** Capex 80 → CFI = −80, PP&E +80. Vay thêm 100 → CFF +100, Nợ vay +100. Trả nợ 60 → CFF −60, Nợ vay −60. Cổ tức 40 → CFF −40, LN giữ lại −40.

### 2.6 Mắt xích #6 — Tiền cuối kỳ (CF) = khoản Tiền (BS)

**(a) Là gì.** Dòng cuối cùng của CF — *tiền cuối kỳ* — phải **bằng đúng** khoản Tiền trên Bảng cân đối cuối kỳ.

$$\text{Tiền}_{\text{cuối}}^{BS} = \text{Tiền}_{\text{đầu}} + \underbrace{(\text{CFO} + \text{CFI} + \text{CFF})}_{\text{thay đổi tiền ròng từ CF}}$$

**(b) Vì sao tồn tại.** CF *giải thích* mọi biến động của khoản tiền. Nếu tiền cuối kỳ trên CF không khớp Tiền trên BS → mô hình có lỗi. Đây là **điểm kiểm tra chéo** quan trọng nhất.

**(c) Ví dụ số:** tiền đầu 150, CFO 90, CFI −80, CFF −40:
$$\text{Tiền cuối} = 150 + (90 - 80 - 40) = 150 - 30 = \mathbf{120}$$
→ khoản Tiền trên BS cuối kỳ phải đúng bằng **120**.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Net income 60, khấu hao 20, phải thu tăng 15, không có tồn kho/phải trả đổi. CFO bằng bao nhiêu?
> 2. Khấu hao xuất hiện ở IS với dấu gì, ở CF với dấu gì?
> 3. Tiền đầu 100, CFO 50, CFI −70, CFF +30. Tiền cuối kỳ trên BS là bao nhiêu?
>
> <details><summary>Đáp án</summary>
>
> 1. $\text{CFO} = 60 + 20 - 15 = \mathbf{65}$.
> 2. IS: **−** (chi phí, giảm lợi nhuận). CF: **+** (cộng lại vì không phải tiền).
> 3. $\text{Tiền cuối} = 100 + (50 - 70 + 30) = 100 + 10 = \mathbf{110}$.
> </details>

> 📝 **Tóm tắt mục 2 — bảng 6 mắt xích.**
>
> | # | Mắt xích | Từ → Đến |
> |--:|----------|----------|
> | 1 | Net income → LN giữ lại | IS → BS |
> | 2 | Net income → dòng đầu CFO | IS → CF |
> | 3 | Khấu hao (−chi phí / +cộng lại / −PP&E) | IS & CF & BS |
> | 4 | Δ Vốn lưu động (phải thu...) | CF & BS |
> | 5 | Capex→PP&E, Vay→Nợ, Cổ tức→LN giữ lại | CF & BS |
> | 6 | Tiền cuối kỳ = khoản Tiền | CF → BS |

---

## 3. Walk-through đầy đủ một kỳ — mọi con số nối nhau

Ta dựng trọn một năm cho công ty **Cà phê Sương Mai**. Bắt đầu từ Bảng cân đối **đầu kỳ** (đã cân sẵn):

### 3.1 Bảng cân đối đầu kỳ (điểm xuất phát)

| Tài sản | | Nguồn vốn | |
|---------|---:|-----------|---:|
| Tiền | 150 | Phải trả người bán (AP) | 120 |
| Phải thu (AR) | 200 | Nợ vay | 300 |
| Hàng tồn kho | 150 | **Tổng nợ (L)** | **420** |
| PP&E ròng | 600 | Vốn góp | 400 |
| | | LN giữ lại | 280 |
| | | **Tổng vốn chủ (E)** | **680** |
| **Tổng tài sản (A)** | **1100** | **Tổng nguồn vốn (L+E)** | **1100** |

Kiểm tra: $A = 1100 = 420 + 680 = L + E$ ✓

### 3.2 Các driver (giả định đầu vào)

| Driver | Giá trị |
|--------|--------:|
| Doanh thu | 1000 |
| Biên lợi nhuận gộp | 40% |
| Chi phí hoạt động (% doanh thu) | 20% |
| Khấu hao | 50 |
| Capex | 80 |
| Thuế suất | 25% |
| Kỳ thu tiền (DSO) | 90 ngày |
| Vay ròng trong kỳ | 0 |
| Cổ tức | 40 |
| Lãi suất vay (trên nợ đầu kỳ) | 10% |

### 3.3 Bước 1 — Báo cáo kết quả kinh doanh (IS)

| Khoản mục | Cách tính | Số tiền |
|-----------|-----------|--------:|
| Doanh thu | driver | 1000 |
| (−) Giá vốn (COGS) | $1000 \times (1-40\%)$ | −600 |
| **Lợi nhuận gộp** | $1000 \times 40\%$ | **400** |
| (−) Chi phí hoạt động | $1000 \times 20\%$ | −200 |
| (−) Khấu hao | driver | −50 |
| **EBIT** | $400-200-50$ | **150** |
| (−) Lãi vay | $10\% \times 300$ | −30 |
| **LN trước thuế (EBT)** | $150-30$ | **120** |
| (−) Thuế | $25\% \times 120$ | −30 |
| **Lợi nhuận ròng (Net income)** | $120-30$ | **90** |

### 3.4 Bước 2 — Báo cáo lưu chuyển tiền tệ (CF)

Bắt đầu từ net income (mắt xích #2):

| Khoản mục | Cách tính | Số tiền |
|-----------|-----------|--------:|
| Net income | từ IS | 90 |
| (+) Khấu hao | cộng lại (mắt xích #3) | +50 |
| (−) Tăng phải thu | $\text{AR}_{cuối}-\text{AR}_{đầu} = 250-200$ | −50 |
| **CFO (hoạt động)** | $90+50-50$ | **90** |
| (−) Capex | mắt xích #5 | −80 |
| **CFI (đầu tư)** | | **−80** |
| Vay ròng | driver | 0 |
| (−) Cổ tức | mắt xích #5 | −40 |
| **CFF (tài trợ)** | $0-40$ | **−40** |
| **Thay đổi tiền ròng** | $90-80-40$ | **−30** |
| Tiền đầu kỳ | từ BS đầu | 150 |
| **Tiền cuối kỳ** | $150-30$ | **120** |

Lưu ý: phải thu cuối kỳ $= 1000 \times \frac{90}{360} = 250$ (mắt xích #4).

### 3.5 Bước 3 — Bảng cân đối cuối kỳ (mọi mắt xích hội tụ)

| Tài sản | | Nguồn vốn | |
|---------|---:|-----------|---:|
| Tiền ← *tiền cuối kỳ CF* | **120** | Phải trả người bán | 120 |
| Phải thu ← *DSO 90* | 250 | Nợ vay ← *300 + 0* | 300 |
| Hàng tồn kho | 150 | **Tổng nợ (L)** | **420** |
| PP&E ròng ← *600+80−50* | 630 | Vốn góp | 400 |
| | | LN giữ lại ← *280+90−40* | 330 |
| | | **Tổng vốn chủ (E)** | **730** |
| **Tổng tài sản (A)** | **1150** | **Tổng nguồn vốn (L+E)** | **1150** |

**Kiểm tra cân:** $A = 1150 = 420 + 730 = L + E$ ✓

Mọi mũi tên "←" ở trên là một mắt xích từ mục 2. Tiền 120 đến từ CF; PP&E 630 từ khấu hao + capex; LN giữ lại 330 từ net income − cổ tức; phải thu 250 từ DSO. Ba báo cáo khít nhau như một.

> ❓ **Câu hỏi tự nhiên của người đọc.** *"Lãi ròng 90 mà sao tiền lại GIẢM 30?"* Vì lợi nhuận không phải tiền: công ty **kẹt thêm 50** ở phải thu (bán chịu), **chi 80** mua tài sản (capex), **chia 40** cổ tức. Cộng lại tiền ra nhiều hơn tiền vào từ hoạt động (90), nên két hụt 30. Đây chính là bài học lớn nhất của mô hình — *lãi trên IS không cứu được công ty nếu tiền trên CF cạn*.

---

## 4. Vì sao Bảng cân đối LUÔN cân? (chứng minh)

Đây là phần lõi. Nhiều người dựng mô hình bằng cách nhập tay khoản Tiền rồi loay hoay "ép cho cân". Sai. Trong mô hình đúng, **khoản Tiền là kết quả tự rơi ra từ CF**, và khi đó BS cân **tự động** — chứng minh được bằng đại số cho *mọi* bộ driver.

> 💡 **Trực giác.** Net income đi *hai ngả* (vào vốn chủ ở BS, và làm điểm đầu CFO ở CF). Khấu hao cũng đi hai ngả (giảm PP&E, và cộng lại ở CFO). Mỗi khoản đều được "ghi kép" như vậy. Vì CFO/CFI/CFF gom lại thành đúng thay đổi khoản Tiền, mọi thứ triệt tiêu chéo và hai vế của BS luôn khớp.

**Ký hiệu.** Đầu kỳ: $A_0 = L_0 + E_0$ (đã cân). Các thay đổi trong kỳ: net income $NI$, khấu hao $Dep$, $\Delta AR$, $\Delta Inv$, $\Delta AP$, capex $Cx$, vay ròng $Db$, cổ tức $Dv$.

**Bước 1 — viết A cuối kỳ.** Chỉ khoản Tiền, phải thu và PP&E đổi (tồn kho giữ nguyên trong mô hình này):
$$A_{\text{cuối}} = A_0 + \Delta\text{Tiền} + \Delta AR + \Delta Inv + (Cx - Dep)$$

**Bước 2 — viết (L+E) cuối kỳ.** Nợ đổi qua vay ròng; vốn chủ đổi qua net income − cổ tức; phải trả đổi $\Delta AP$:
$$(L+E)_{\text{cuối}} = (L_0 + E_0) + \Delta AP + Db + (NI - Dv)$$

**Bước 3 — thay khoản Tiền bằng định nghĩa từ CF.** Đây là chỗ mấu chốt: $\Delta\text{Tiền}$ **không** nhập tay mà bằng tổng ba dòng CF:
$$\Delta\text{Tiền} = \underbrace{(NI + Dep - \Delta AR - \Delta Inv + \Delta AP)}_{CFO} + \underbrace{(-Cx)}_{CFI} + \underbrace{(Db - Dv)}_{CFF}$$

**Bước 4 — lấy hiệu hai vế** $A_{\text{cuối}} - (L+E)_{\text{cuối}}$. Vì $A_0 = L_0 + E_0$ nên phần đầu kỳ triệt tiêu, còn lại:
$$\Delta\text{Tiền} + \Delta AR + \Delta Inv + (Cx - Dep) - \Delta AP - Db - (NI - Dv)$$

**Bước 5 — thế $\Delta\text{Tiền}$ từ bước 3 vào:**
$$\begin{aligned}
&\big[NI + Dep - \Delta AR - \Delta Inv + \Delta AP - Cx + Db - Dv\big] \\
&\quad + \Delta AR + \Delta Inv + Cx - Dep - \Delta AP - Db - NI + Dv
\end{aligned}$$

**Bước 6 — gom từng cặp** (mỗi hạng tử xuất hiện đúng hai lần, ngược dấu):
$$\underbrace{(NI-NI)}_{0} + \underbrace{(Dep-Dep)}_{0} + \underbrace{(-\Delta AR+\Delta AR)}_{0} + \underbrace{(-\Delta Inv+\Delta Inv)}_{0} + \underbrace{(\Delta AP-\Delta AP)}_{0} + \underbrace{(-Cx+Cx)}_{0} + \underbrace{(Db-Db)}_{0} + \underbrace{(-Dv+Dv)}_{0} = 0$$

Kết luận: $A_{\text{cuối}} - (L+E)_{\text{cuối}} = 0$, tức $A_{\text{cuối}} = (L+E)_{\text{cuối}}$ — **với mọi giá trị driver**. Không có ngoại lệ, không cần "ép cân".

> ⚠ **Lỗi thường gặp (chí mạng khi dựng model).** Nhập tay khoản **Tiền** trên BS rồi lại tự tính $\Delta$Tiền ở CF theo cách khác → hai chỗ lệch nhau → BS không cân, và người ta đi "vá" bằng một dòng "plug" bí ẩn. **Đúng phải là:** Tiền trên BS = tiền đầu kỳ + tổng CF. Chỉ có *một* nguồn sự thật cho khoản Tiền. Đó là lý do mô hình trong [visualization.html](./visualization.html) không bao giờ lệch.

> 🔁 **Dừng lại tự kiểm tra.** Trong chứng minh, hạng tử $Cx$ (capex) xuất hiện ở những chỗ nào và vì sao triệt tiêu?
>
> <details><summary>Đáp án</summary>
>
> $Cx$ xuất hiện **hai lần**: (1) ở bước 1 với dấu **+** (capex làm PP&E, một tài sản, tăng); (2) ở $\Delta$Tiền qua CFI với dấu **−** (capex làm tiền, cũng một tài sản, giảm). Vì capex chỉ *đổi hình dạng tài sản* (tiền → máy móc), tổng tài sản không đổi → hai lần xuất hiện ngược dấu, triệt tiêu. Giống hệt giao dịch "mua thiết bị bằng tiền" ở [Lesson 01](../../01-Fundamentals/lesson-01-accounting-equation/).
> </details>

> 📝 **Tóm tắt mục 4.**
> - Khoản Tiền trên BS **phải** lấy từ CF (tiền đầu + CFO + CFI + CFF), không nhập tay.
> - Khi đó $A = L+E$ đúng bằng đại số cho mọi driver — mỗi khoản ghi kép nên triệt tiêu chéo.
> - BS không cân ⇒ chắc chắn có mắt xích bị nối sai, không phải "sai số".

---

## 5. Bài tập

**Bài 1 (mắt xích cơ bản).** Net income trong kỳ = 120, LN giữ lại đầu kỳ = 400, cổ tức = 30.
(a) LN giữ lại cuối kỳ? (b) Kể tên **hai** báo cáo khác mà net income "chạm" vào và chạm thế nào.

**Bài 2 (khấu hao ba chỗ).** Khấu hao trong kỳ = 40. PP&E ròng đầu kỳ = 500, capex = 70.
(a) PP&E ròng cuối kỳ? (b) Khấu hao ảnh hưởng IS ra sao? (c) Ở CF (gián tiếp) khấu hao được xử lý thế nào và vì sao?

**Bài 3 (vốn lưu động).** Doanh thu = 1200, phải thu đầu kỳ = 200, DSO chuyển từ 60 lên 90 ngày (quy ước 360 ngày).
(a) Phải thu cuối kỳ? (b) ΔPhải thu? (c) Ảnh hưởng lên CFO? Giải thích ý nghĩa kinh doanh.

**Bài 4 (đóng vòng — capstone).** Cho Bảng cân đối đầu kỳ: Tiền 100, Phải thu 150, Tồn kho 100, PP&E ròng 400; Phải trả 80, Nợ vay 200, Vốn góp 300, LN giữ lại 170. Các driver: Doanh thu 800, biên gộp 50%, chi phí hoạt động 25% doanh thu, khấu hao 40, lãi vay 10% trên nợ đầu kỳ, thuế 25%, capex 60, DSO 90 ngày, vay ròng 0, cổ tức 25 (tồn kho & phải trả giữ nguyên).
Dựng **IS → CF → BS cuối kỳ** đầy đủ và chứng minh BS cân.

---

## 6. Lời giải chi tiết

**Bài 1.**
- (a) $\text{LN giữ lại}_{\text{cuối}} = 400 + 120 - 30 = \mathbf{490}$.
- (b) Net income chạm: (1) **BS** — cộng vào Lợi nhuận giữ lại (làm tăng vốn chủ); (2) **CF** — là *dòng đầu tiên* của CFO (phương pháp gián tiếp), từ đó lần ra tiền mặt.

**Bài 2.**
- (a) $\text{PP\&E}_{\text{cuối}} = 500 + 70 - 40 = \mathbf{530}$.
- (b) Trên IS, khấu hao là **chi phí** → giảm lợi nhuận trước thuế 40 (và qua đó giảm thuế, giảm net income).
- (c) Trên CF gián tiếp, khấu hao được **cộng lại** vào CFO (+40) vì nó là chi phí *không dùng tiền* — tiền đã chi lúc mua tài sản (capex), không phải lúc trích khấu hao. Nếu không cộng lại, CFO sẽ thấp hơn thực tế đúng 40.

**Bài 3.** Cách tiếp cận: dùng công thức DSO tính phải thu cuối, lấy hiệu.
- (a) $\text{Phải thu}_{\text{cuối}} = 1200 \times \frac{90}{360} = \mathbf{300}$.
- (b) $\Delta\text{Phải thu} = 300 - 200 = \mathbf{+100}$.
- (c) Phải thu tăng 100 ⇒ **CFO giảm 100**. Ý nghĩa: kéo dài kỳ thu tiền từ 60 lên 90 ngày khiến 100 tiền bị *kẹt ở khách hàng* — doanh thu và lợi nhuận không đổi nhưng tiền thật vào ít đi 100. Bài học: bán được hàng chưa đủ, phải *thu được tiền*.

**Bài 4.** Dựng lần lượt.

*Bảng cân đối đầu kỳ cân?* $A = 100+150+100+400 = 750$; $L+E = (80+200)+(300+170) = 280+470 = 750$ ✓

*Bước 1 — IS:*

| Khoản | Cách tính | Số |
|-------|-----------|---:|
| Doanh thu | | 800 |
| Giá vốn | $800\times50\%$ | −400 |
| Lợi nhuận gộp | | 400 |
| Chi phí hoạt động | $800\times25\%$ | −200 |
| Khấu hao | | −40 |
| EBIT | $400-200-40$ | 160 |
| Lãi vay | $10\%\times200$ | −20 |
| EBT | $160-20$ | 140 |
| Thuế | $25\%\times140$ | −35 |
| **Net income** | $140-35$ | **105** |

*Bước 2 — CF:* phải thu cuối $= 800\times\frac{90}{360} = 200$; ΔAR $= 200-150 = +50$.

| Khoản | Cách tính | Số |
|-------|-----------|---:|
| Net income | từ IS | 105 |
| + Khấu hao | cộng lại | +40 |
| − Tăng phải thu | $200-150$ | −50 |
| **CFO** | $105+40-50$ | **95** |
| − Capex | | −60 |
| **CFI** | | **−60** |
| Vay ròng | | 0 |
| − Cổ tức | | −25 |
| **CFF** | $0-25$ | **−25** |
| Thay đổi tiền ròng | $95-60-25$ | **+10** |
| Tiền đầu kỳ | từ BS đầu | 100 |
| **Tiền cuối kỳ** | $100+10$ | **110** |

*Bước 3 — BS cuối kỳ:*
- Tiền $= 110$ (từ CF)
- Phải thu $= 200$
- Tồn kho $= 100$ (giữ nguyên)
- PP&E ròng $= 400 + 60 - 40 = 420$
- **Tổng tài sản $A = 110+200+100+420 = 830$**
- Phải trả $= 80$; Nợ vay $= 200$ → **Tổng nợ $L = 280$**
- Vốn góp $= 300$; LN giữ lại $= 170 + 105 - 25 = 250$ → **Vốn chủ $E = 550$**

*Kiểm tra cân:* $A = 830$; $L + E = 280 + 550 = 830$ ✓

Đúng như chứng minh mục 4: không cần "ép", BS tự cân vì khoản Tiền 110 lấy từ CF.

> 📝 **Tóm tắt bài học.**
> - 6 mắt xích nối IS ↔ BS ↔ CF; nhớ kỹ #1 (NI→LN giữ lại), #2 (NI→đầu CFO), #3 (khấu hao ba chỗ), #6 (tiền cuối = Tiền BS).
> - Net income đi hai ngả; khấu hao đi ba chỗ; capex/cổ tức/vay nối CF với BS.
> - Lãi ≠ tiền: có thể lãi mà tiền vẫn giảm (kẹt ở phải thu, capex, cổ tức).
> - Khoản Tiền trên BS **phải** lấy từ CF ⇒ $A=L+E$ đúng bằng đại số cho mọi driver.

---

## Bài tiếp theo

**[Lesson 09 — Các tỷ số tài chính (Financial Ratios)](../../03-Analysis/lesson-09-financial-ratios/)**: khi đã có ba báo cáo khớp nhau, ta "đọc sức khỏe" doanh nghiệp bằng các tỷ số — thanh khoản, đòn bẩy, sinh lời, hiệu quả (ROE, ROA, biên lợi nhuận, vòng quay phải thu...). Chính DSO ở bài này là một tỷ số hiệu quả.

Minh họa tương tác: **[visualization.html](./visualization.html)** — kéo các driver (doanh thu, biên gộp, DSO, capex, cổ tức...), xem cả **ba báo cáo dựng lại đồng thời** và dấu **✓ Bảng cân đối cân** cập nhật theo thời gian thực.
