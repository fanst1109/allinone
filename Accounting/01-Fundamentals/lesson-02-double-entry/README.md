# Lesson 02 — Bút toán kép & Nợ/Có (Double-entry, Debit/Credit)

> Ở [Lesson 01](../lesson-01-accounting-equation/) ta thấy mọi giao dịch **chạm ít nhất hai chỗ** để giữ $A = L + E$ cân. Bài này chính thức hóa quy tắc đó thành ngôn ngữ ghi sổ của toàn bộ kế toán: **Nợ (Debit)** và **Có (Credit)**.

## Mục tiêu học tập

- Hiểu **bút toán kép (double-entry)**: mỗi giao dịch ghi vào **ít nhất hai tài khoản**, và **tổng Nợ = tổng Có**.
- Định nghĩa **Nợ (Debit)** = bên **trái**, **Có (Credit)** = bên **phải** của mỗi tài khoản (T-account) — không phải "tốt/xấu", "tăng/giảm".
- Nắm quy tắc tăng/giảm theo **loại tài khoản** và *vì sao* nó bắt nguồn trực tiếp từ $A = L + E$.
- Định khoản (ghi Nợ/Có) được một giao dịch bất kỳ, vẽ **T-account**, và kiểm tra bằng **bảng cân đối thử (trial balance)**.

## Kiến thức tiền đề

- [Lesson 01 — Phương trình kế toán](../lesson-01-accounting-equation/): $A = L + E$ và dạng mở rộng $A = L + \text{Vốn góp} + (\text{Doanh thu} - \text{Chi phí} - \text{Cổ tức})$. Bài này xây thẳng lên đó.
- Số học cộng/trừ. Không cần gì thêm.

---

## 1. Từ "chạm hai chỗ" đến Nợ/Có

> 💡 **Trực giác.** Ở Lesson 01, mỗi giao dịch làm hai con số đổi cùng lúc để phương trình vẫn cân — nhưng ta ghi bằng lời ("Tài sản +40, Vốn +40"). Cách đó không mở rộng nổi khi có hàng nghìn giao dịch và hàng trăm tài khoản. Kế toán cần một **hệ tọa độ** cố định để "+40" và "−40" không lẫn lộn. Hệ tọa độ đó là: mỗi tài khoản có **hai bên** — **trái** và **phải** — và ta luôn ghi con số vào một trong hai bên, không bao giờ ghi số âm.

**Bút toán kép** phát biểu: mỗi giao dịch được ghi vào **ít nhất hai tài khoản**, với **tổng số ghi bên trái = tổng số ghi bên phải**. Vì hai bên luôn bằng nhau, sổ sách **tự cân** — đúng bằng cơ chế "chạm hai chỗ" của Lesson 01, chỉ khác là giờ có tên gọi và quy tắc chuẩn.

- Bên **trái** của một tài khoản gọi là **Nợ (Debit)** — viết tắt **Dr**.
- Bên **phải** gọi là **Có (Credit)** — viết tắt **Cr**.

> ⚠ **Lỗi thường gặp — hiểu Nợ/Có theo nghĩa đời thường.** "Nợ" **không** có nghĩa là "đang mắc nợ / xấu", "Có" **không** có nghĩa là "có tiền / tốt". Chúng chỉ là **tên hai cái cột**: trái và phải. Ghi Nợ tài khoản *Tiền mặt* nghĩa là ghi vào cột trái của Tiền mặt — và điều đó làm tiền mặt **tăng**. Quên hẳn nghĩa tiếng Việt thông thường của hai từ này đi; hãy đọc "Nợ = trái", "Có = phải".

---

## 2. T-account — hình dung một tài khoản

> 💡 **Trực giác.** Vẽ mỗi tài khoản như chữ **T**: tên tài khoản nằm trên nét ngang, **nửa trái = Nợ**, **nửa phải = Có**. Mọi phát sinh của tài khoản đó rơi vào một trong hai nửa. Cuối cùng, lấy tổng bên nhiều hơn trừ bên ít hơn ra **số dư (balance)**, và số dư nằm ở bên "nặng" hơn.

```
        Tiền mặt
   Nợ (trái) | Có (phải)
      100    |    60
       50    |    20
       40    |    30
   ----------+----------
   Σ = 190   | Σ = 110
   Số dư Nợ 80
```

**(a) Là gì.** T-account là biểu diễn trực quan của một tài khoản với hai cột Nợ/Có, dùng để cộng dồn phát sinh và tìm số dư.

**(b) Vì sao cần.** Để tách bạch "tiền vào bên nào" khỏi "tiền ra bên nào" mà không dùng số âm — cộng số dương ở hai cột rồi trừ, dễ kiểm tra và khó sai hơn ghi ±.

**(c) Ví dụ số cụ thể** — tính số dư 4 tài khoản:

| Tài khoản | Tổng Nợ | Tổng Có | Số dư |
|-----------|--------:|--------:|------|
| Tiền mặt | 190 | 110 | **Nợ 80** (Nợ nặng hơn) |
| Vay ngân hàng | 30 | 50 | **Có 20** (Có nặng hơn) |
| Doanh thu | 0 | 40 | **Có 40** |
| Chi phí lương | 20 | 0 | **Nợ 20** |

> ❓ **Câu hỏi tự nhiên.** *"Số dư nằm bên nào?"* → Bên nào cộng ra lớn hơn thì số dư nằm bên đó. Tiền mặt có Nợ 190 > Có 110 nên số dư là **Nợ 80**. Vay có Có 50 > Nợ 30 nên số dư là **Có 20**.

---

## 3. Quy tắc Nợ/Có theo loại tài khoản — và *vì sao*

Đây là phần cốt lõi. Quy tắc **không phải học vẹt** — nó suy ra thẳng từ $A = L + E$.

### 3.1 Suy ra quy tắc từ phương trình kế toán

Bắt đầu từ dạng mở rộng (Lesson 01):

$$A = L + \text{Vốn góp} + \text{Doanh thu} - \text{Chi phí} - \text{Cổ tức}$$

Chuyển hai số bị trừ (Chi phí, Cổ tức) sang vế trái để **mọi số hạng đều cộng**:

$$\underbrace{A + \text{Chi phí} + \text{Cổ tức}}_{\text{VẾ TRÁI}} = \underbrace{L + \text{Vốn góp} + \text{Doanh thu}}_{\text{VẾ PHẢI}}$$

Quy ước đơn giản nhất giữ đẳng thức này luôn cân: **cái gì nằm ở vế TRÁI thì tăng khi ghi bên TRÁI (Nợ); cái gì ở vế PHẢI thì tăng khi ghi bên PHẢI (Có).**

- **Vế trái → tăng bằng Nợ:** Tài sản (Assets), Chi phí (Expenses), Cổ tức (Dividends).
- **Vế phải → tăng bằng Có:** Nợ phải trả (Liabilities), Vốn chủ/Vốn góp (Equity), Doanh thu (Revenue).

Giảm thì ngược lại. Gọn thành bảng:

| Loại tài khoản | Tăng (↑) | Giảm (↓) | Số dư thường |
|----------------|:--------:|:--------:|:------------:|
| **Tài sản** (Assets) | **Nợ** | Có | Nợ |
| **Chi phí** (Expenses) | **Nợ** | Có | Nợ |
| **Cổ tức** (Dividends) | **Nợ** | Có | Nợ |
| **Nợ phải trả** (Liabilities) | **Có** | Nợ | Có |
| **Vốn chủ** (Equity) | **Có** | Nợ | Có |
| **Doanh thu** (Revenue) | **Có** | Nợ | Có |

> 💡 **Mẹo nhớ — DEALER.** Ba loại tăng bên **Nợ**: **D**ividends (cổ tức), **E**xpenses (chi phí), **A**ssets (tài sản). Ba loại tăng bên **Có**: **L**iabilities (nợ phải trả), **E**quity (vốn chủ), **R**evenue (doanh thu). Đọc là "**DEA** bên Nợ, **LER** bên Có".

### 3.2 Vì sao Chi phí lại "tăng bên Nợ"?

> ❓ **Câu hỏi tự nhiên.** *"Chi phí làm giảm vốn chủ, mà vốn chủ tăng bên Có — vậy sao chi phí không phải bên Có?"*
>
> Vì chi phí **đối nghịch** với vốn chủ. Chi phí là thứ **bào mòn** vốn chủ, nên nó đứng "ngược phía" — tăng bên **Nợ**. Nhìn ở đẳng thức 3.1: Chi phí bị chuyển sang **vế trái** (cùng phía Tài sản) chính vì nó mang dấu trừ trong công thức vốn chủ. Cổ tức cũng vậy: rút bớt phần của chủ → đứng cùng vế trái → tăng bên Nợ.

### 3.3 Bốn ví dụ định khoản nhanh

Áp bảng 3.1 để dịch từng giao dịch sang Nợ/Có (đơn vị: triệu đồng):

1. **Thu tiền bán hàng 40.** Tiền mặt (tài sản) ↑ → **Nợ Tiền mặt 40**. Doanh thu ↑ → **Có Doanh thu 40**.
2. **Trả lương 20 bằng tiền.** Chi phí lương ↑ → **Nợ Chi phí lương 20**. Tiền mặt ↓ → **Có Tiền mặt 20**.
3. **Vay ngân hàng 50 về quỹ.** Tiền mặt ↑ → **Nợ Tiền mặt 50**. Vay ngân hàng (nợ) ↑ → **Có Vay ngân hàng 50**.
4. **Trả bớt nợ vay 30.** Vay ngân hàng ↓ → **Nợ Vay ngân hàng 30**. Tiền mặt ↓ → **Có Tiền mặt 30**.

Cả bốn: một dòng Nợ, một dòng Có, **số tiền hai bên bằng nhau**.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. "Mua thiết bị 60, trả bằng tiền" — ghi Nợ tài khoản nào, Có tài khoản nào?
> 2. "Mua nguyên liệu 15, chưa trả tiền (nợ người bán)" — định khoản?
>
> <details><summary>Đáp án</summary>
>
> 1. Thiết bị (tài sản) tăng → **Nợ Thiết bị 60**; Tiền mặt (tài sản) giảm → **Có Tiền mặt 60**. (Đây là dạng tài sản↔tài sản: tổng tài sản không đổi, chỉ đổi hình dạng.)
> 2. Hàng tồn kho (tài sản) tăng → **Nợ Hàng tồn kho 15**; Phải trả người bán (nợ phải trả) tăng → **Có Phải trả người bán 15**.
> </details>

---

## 4. Walk-through: định khoản 7 giao dịch cho quán cà phê

Nối tiếp quán cà phê của Lesson 01. Mỗi giao dịch: định khoản → kiểm tra **Nợ = Có**. Đơn vị: triệu đồng.

| # | Giao dịch | Ghi **Nợ** (Dr) | Ghi **Có** (Cr) | Nợ = Có? |
|---|-----------|-----------------|-----------------|:--------:|
| 1 | Chủ góp 100 tiền mặt | Tiền mặt 100 | Vốn góp 100 | 100 = 100 ✓ |
| 2 | Vay ngân hàng 50 | Tiền mặt 50 | Vay ngân hàng 50 | 50 = 50 ✓ |
| 3 | Mua máy pha 60 (trả tiền) | Thiết bị 60 | Tiền mặt 60 | 60 = 60 ✓ |
| 4 | Bán cà phê thu 40 tiền | Tiền mặt 40 | Doanh thu 40 | 40 = 40 ✓ |
| 5 | Trả lương 20 (tiền) | Chi phí lương 20 | Tiền mặt 20 | 20 = 20 ✓ |
| 6 | Mua nguyên liệu 15 (chịu) | Hàng tồn kho 15 | Phải trả người bán 15 | 15 = 15 ✓ |
| 7 | Trả bớt nợ vay 30 | Vay ngân hàng 30 | Tiền mặt 30 | 30 = 30 ✓ |

**Đưa vào T-account** (cộng dồn theo cột). Bốn tài khoản có nhiều phát sinh nhất:

<svg viewBox="0 0 540 290" style="max-width:540px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Bốn tài khoản chữ T: Tiền mặt (Nợ 190, Có 110, dư Nợ 80), Vay ngân hàng (Nợ 30, Có 50, dư Có 20), Doanh thu (Có 40), Chi phí lương (Nợ 20)">
  <defs></defs>
  <text x="120.0" y="20.0" fill="#1a202c" font-size="12" text-anchor="middle" font-weight="700">Tiền mặt</text>
  <text x="120.0" y="33.0" fill="#475569" font-size="10" text-anchor="middle">(tài sản)</text>
  <line x1="20.0" y1="42.0" x2="220.0" y2="42.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="120.0" y1="42.0" x2="120.0" y2="144.0" stroke="#1a202c" stroke-width="2"/>
  <text x="70.0" y="56.0" fill="#1d4ed8" font-size="11" text-anchor="middle" font-weight="700">Nợ</text>
  <text x="170.0" y="56.0" fill="#dc2626" font-size="11" text-anchor="middle" font-weight="700">Có</text>
  <text x="110.0" y="74.0" fill="#1d4ed8" font-size="11" text-anchor="end">100 (#1)</text>
  <text x="110.0" y="92.0" fill="#1d4ed8" font-size="11" text-anchor="end">50 (#2)</text>
  <text x="110.0" y="110.0" fill="#1d4ed8" font-size="11" text-anchor="end">40 (#4)</text>
  <text x="110.0" y="128.0" fill="#1d4ed8" font-size="11" text-anchor="end">Σ 190</text>
  <text x="130.0" y="74.0" fill="#dc2626" font-size="11" text-anchor="start">60 (#3)</text>
  <text x="130.0" y="92.0" fill="#dc2626" font-size="11" text-anchor="start">20 (#5)</text>
  <text x="130.0" y="110.0" fill="#dc2626" font-size="11" text-anchor="start">30 (#7)</text>
  <text x="130.0" y="128.0" fill="#dc2626" font-size="11" text-anchor="start">Σ 110</text>
  <line x1="20.0" y1="130.0" x2="220.0" y2="130.0" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="120.0" y="148.0" fill="#15803d" font-size="11" text-anchor="middle" font-weight="700">Số dư Nợ 80</text>
  <text x="400.0" y="20.0" fill="#1a202c" font-size="12" text-anchor="middle" font-weight="700">Vay ngân hàng</text>
  <text x="400.0" y="33.0" fill="#475569" font-size="10" text-anchor="middle">(nợ phải trả)</text>
  <line x1="300.0" y1="42.0" x2="500.0" y2="42.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="400.0" y1="42.0" x2="400.0" y2="108.0" stroke="#1a202c" stroke-width="2"/>
  <text x="350.0" y="56.0" fill="#1d4ed8" font-size="11" text-anchor="middle" font-weight="700">Nợ</text>
  <text x="450.0" y="56.0" fill="#dc2626" font-size="11" text-anchor="middle" font-weight="700">Có</text>
  <text x="390.0" y="74.0" fill="#1d4ed8" font-size="11" text-anchor="end">30 (#7)</text>
  <text x="390.0" y="92.0" fill="#1d4ed8" font-size="11" text-anchor="end">Σ 30</text>
  <text x="410.0" y="74.0" fill="#dc2626" font-size="11" text-anchor="start">50 (#2)</text>
  <text x="410.0" y="92.0" fill="#dc2626" font-size="11" text-anchor="start">Σ 50</text>
  <line x1="300.0" y1="94.0" x2="500.0" y2="94.0" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="400.0" y="112.0" fill="#15803d" font-size="11" text-anchor="middle" font-weight="700">Số dư Có 20</text>
  <text x="120.0" y="190.0" fill="#1a202c" font-size="12" text-anchor="middle" font-weight="700">Doanh thu</text>
  <text x="120.0" y="203.0" fill="#475569" font-size="10" text-anchor="middle">(doanh thu)</text>
  <line x1="20.0" y1="212.0" x2="220.0" y2="212.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="120.0" y1="212.0" x2="120.0" y2="260.0" stroke="#1a202c" stroke-width="2"/>
  <text x="70.0" y="226.0" fill="#1d4ed8" font-size="11" text-anchor="middle" font-weight="700">Nợ</text>
  <text x="170.0" y="226.0" fill="#dc2626" font-size="11" text-anchor="middle" font-weight="700">Có</text>
  <text x="130.0" y="244.0" fill="#dc2626" font-size="11" text-anchor="start">40 (#4)</text>
  <line x1="20.0" y1="246.0" x2="220.0" y2="246.0" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="120.0" y="264.0" fill="#15803d" font-size="11" text-anchor="middle" font-weight="700">Số dư Có 40</text>
  <text x="400.0" y="190.0" fill="#1a202c" font-size="12" text-anchor="middle" font-weight="700">Chi phí lương</text>
  <text x="400.0" y="203.0" fill="#475569" font-size="10" text-anchor="middle">(chi phí)</text>
  <line x1="300.0" y1="212.0" x2="500.0" y2="212.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="400.0" y1="212.0" x2="400.0" y2="260.0" stroke="#1a202c" stroke-width="2"/>
  <text x="350.0" y="226.0" fill="#1d4ed8" font-size="11" text-anchor="middle" font-weight="700">Nợ</text>
  <text x="450.0" y="226.0" fill="#dc2626" font-size="11" text-anchor="middle" font-weight="700">Có</text>
  <text x="390.0" y="244.0" fill="#1d4ed8" font-size="11" text-anchor="end">20 (#5)</text>
  <line x1="300.0" y1="246.0" x2="500.0" y2="246.0" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="400.0" y="264.0" fill="#15803d" font-size="11" text-anchor="middle" font-weight="700">Số dư Nợ 20</text>
</svg>

Các tài khoản còn lại chỉ có một phát sinh: Thiết bị **Nợ 60**, Hàng tồn kho **Nợ 15**, Vốn góp **Có 100**, Phải trả người bán **Có 15**.

> ❓ **Câu hỏi tự nhiên.** *"Tài sản↔tài sản như #3 (Thiết bị/Tiền) vẫn là bút toán kép chứ?"* → Đúng. Vẫn hai tài khoản, vẫn Nợ 60 = Có 60. Tổng tài sản không đổi (tiền −60, thiết bị +60), nhưng sổ vẫn ghi kép và vẫn cân.

---

## 5. Bảng cân đối thử (Trial Balance)

**(a) Là gì.** Bảng liệt kê **số dư** của mọi tài khoản, xếp thành hai cột **Nợ | Có**, rồi cộng mỗi cột. Vì mỗi giao dịch đã ghi Nợ = Có, nên khi cộng toàn bộ: **tổng số dư Nợ = tổng số dư Có**.

**(b) Vì sao cần.** Đây là **máy dò lỗi** của kế toán: nếu hai cột **không** bằng nhau, chắc chắn có bút toán ghi sai (thiếu một vế, sai số tiền, ghi lệch cột). Nó là hiện thân trực tiếp của cơ chế "sai lệch = có lỗi" ở Lesson 01.

**(c) Ví dụ số cụ thể** — lấy số dư sau 7 giao dịch ở mục 4:

| Tài khoản | Loại | Nợ | Có |
|-----------|------|---:|---:|
| Tiền mặt | Tài sản | 80 | |
| Thiết bị | Tài sản | 60 | |
| Hàng tồn kho | Tài sản | 15 | |
| Chi phí lương | Chi phí | 20 | |
| Vay ngân hàng | Nợ phải trả | | 20 |
| Phải trả người bán | Nợ phải trả | | 15 |
| Vốn góp | Vốn chủ | | 100 |
| Doanh thu | Doanh thu | | 40 |
| **TỔNG** | | **175** | **175** |

**Tổng Nợ = Tổng Có = 175 ✓.**

> 💡 **Nối lại với Lesson 01.** Cột Nợ gồm Tài sản (80+60+15 = 155) và Chi phí (20). Cột Có gồm Nợ phải trả (20+15 = 35), Vốn góp (100), Doanh thu (40). Kiểm tra phương trình kế toán: Tài sản = 155; Nợ phải trả = 35; Vốn chủ = Vốn góp 100 + (Doanh thu 40 − Chi phí 20) = 120. Vậy $A = 155 = L + E = 35 + 120$ ✓ — bảng cân đối thử cân **kéo theo** phương trình kế toán cân.

> ⚠ **Lỗi thường gặp.** *"Trial balance cân là sổ sách chắc chắn đúng."* **Không hẳn.** Nó chỉ bắt được lỗi phá vỡ cân bằng Nợ/Có. Nó **không** bắt được: ghi đúng số tiền nhưng **nhầm tài khoản** (Nợ Thiết bị thay vì Nợ Hàng tồn kho), hay **quên ghi hẳn** một giao dịch (thiếu cả hai vế). Những lỗi đó vẫn để hai cột bằng nhau.

> 📝 **Tóm tắt mục 4–5.**
> - Định khoản = dịch giao dịch sang cặp Nợ/Có theo bảng quy tắc 3.1, luôn giữ Nợ = Có.
> - T-account cộng dồn phát sinh hai cột rồi ra số dư ở bên "nặng" hơn.
> - Trial balance xếp mọi số dư thành hai cột; tổng Nợ = tổng Có là điều kiện cần (không đủ) để sổ đúng.

---

## 6. Bài tập

**Bài 1 (định khoản).** Ghi Nợ/Có cho từng giao dịch (đơn vị: triệu đồng):
1. Chủ góp thêm 150 tiền mặt.
2. Mua xe tải 200, trả ngay 80 tiền, còn 120 nợ người bán.
3. Cung cấp dịch vụ, khách trả ngay 90.
4. Trả tiền điện 12.
5. Chia cổ tức 25 bằng tiền.

**Bài 2 (T-account).** Chỉ xét tài khoản **Tiền mặt**, số dư đầu kỳ **Nợ 100**. Trong kỳ: thu 90 (bài 1.3), chi 80 (bài 1.2 phần trả ngay), chi 12 (bài 1.4), chi 25 (bài 1.5), nhận góp 150 (bài 1.1). Vẽ T-account và tính **số dư cuối kỳ**.

**Bài 3 (trial balance).** Cuối kỳ có các số dư: Tiền mặt (Nợ) 223, Xe tải (Nợ) 200, Vốn góp (Có) ?, Phải trả người bán (Có) 120, Doanh thu (Có) 90, Chi phí điện (Nợ) 12, Cổ tức (Nợ) 25. Biết vốn góp lũy kế = 250. Lập bảng cân đối thử và kiểm tra tổng Nợ = tổng Có.

---

## 7. Lời giải chi tiết

**Bài 1.** Áp bảng quy tắc 3.1 (tài sản/chi phí/cổ tức tăng bên Nợ; nợ phải trả/vốn/doanh thu tăng bên Có):

1. Tiền mặt ↑ → **Nợ Tiền mặt 150**; Vốn góp ↑ → **Có Vốn góp 150**.
2. Ba tài khoản: Xe tải (tài sản) ↑ → **Nợ Xe tải 200**; Tiền mặt ↓ → **Có Tiền mặt 80**; Phải trả người bán (nợ) ↑ → **Có Phải trả người bán 120**. Kiểm tra: Nợ 200 = Có (80 + 120) = 200 ✓. (Đây là **bút toán kép nhiều dòng** — vẫn giữ tổng Nợ = tổng Có.)
3. Tiền mặt ↑ → **Nợ Tiền mặt 90**; Doanh thu ↑ → **Có Doanh thu 90**.
4. Chi phí điện ↑ → **Nợ Chi phí điện 12**; Tiền mặt ↓ → **Có Tiền mặt 12**.
5. Cổ tức ↑ → **Nợ Cổ tức 25**; Tiền mặt ↓ → **Có Tiền mặt 25**.

**Bài 2.** T-account Tiền mặt (số dư đầu kỳ Nợ 100 đặt bên Nợ):

```
             Tiền mặt
   Nợ                |   Có
   100 (đầu kỳ)      |    80 (mua xe)
    90 (dịch vụ)     |    12 (điện)
   150 (góp vốn)     |    25 (cổ tức)
   -----------------+----------------
   Σ Nợ = 340        |   Σ Có = 117
   Số dư cuối kỳ: Nợ 340 − 117 = Nợ 223
```

Cách tiếp cận: cộng riêng hai cột (Nợ 100+90+150 = 340; Có 80+12+25 = 117), số dư = hiệu, nằm bên lớn hơn → **Nợ 223**.

**Bài 3.** Trước hết tìm vốn góp trên bảng: đề cho vốn góp lũy kế = **250** (số dư Có). Lập bảng:

| Tài khoản | Nợ | Có |
|-----------|---:|---:|
| Tiền mặt | 223 | |
| Xe tải | 200 | |
| Chi phí điện | 12 | |
| Cổ tức | 25 | |
| Vốn góp | | 250 |
| Phải trả người bán | | 120 |
| Doanh thu | | 90 |
| **TỔNG** | **460** | **460** |

Cột Nợ: 223 + 200 + 12 + 25 = **460**. Cột Có: 250 + 120 + 90 = **460**. **Tổng Nợ = Tổng Có = 460 ✓.**

Kiểm tra chéo với phương trình kế toán: Tài sản = Tiền 223 + Xe 200 = 423; Nợ phải trả = 120; Vốn chủ = Vốn góp 250 + (Doanh thu 90 − Chi phí 12 − Cổ tức 25) = 250 + 53 = 303. $A = 423 = L + E = 120 + 303$ ✓.

> 📝 **Tóm tắt bài học.**
> - **Bút toán kép:** mỗi giao dịch ghi ≥ 2 tài khoản, **tổng Nợ = tổng Có** — luôn.
> - **Nợ = bên trái, Có = bên phải** của mọi tài khoản. Không mang nghĩa tốt/xấu, tăng/giảm.
> - Quy tắc tăng/giảm suy từ $A + \text{Chi phí} + \text{Cổ tức} = L + \text{Vốn góp} + \text{Doanh thu}$: vế trái tăng bên Nợ (DEA), vế phải tăng bên Có (LER).
> - **T-account** cộng dồn hai cột → số dư; **trial balance** cộng mọi số dư → hai cột phải bằng nhau (điều kiện cần, chưa đủ, để sổ đúng).

---

## Bài tiếp theo

**Lesson 03 — Sổ nhật ký, sổ cái & bảng cân đối thử** *(sắp ra)*: đi trọn "chu trình ghi sổ" — từ **sổ nhật ký (journal)** ghi bút toán theo thời gian, sang **sổ cái (ledger)** gom theo tài khoản, rồi lập **trial balance** hoàn chỉnh. Xem [lesson-03](../lesson-03-journal-ledger-trial-balance/).

Minh họa tương tác: [visualization.html](./visualization.html) — chọn giao dịch, xem bút toán Nợ/Có, T-account cập nhật, và bảng cân đối thử luôn cân theo thời gian thực.
