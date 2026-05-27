# Lesson 49 — Bài toán khó & P vs NP (Intractability)

> **Tier 7 — Thuật toán nâng cao · Bài cuối Tier.** Toàn bộ lộ trình từ Tier 0 tới đây dạy bạn *cách thiết kế thuật toán nhanh*: sort O(n log n), shortest path O(E log V), matching, randomization... Bài này lật ngược câu hỏi: **có những bài toán mà KHÔNG AI biết cách giải nhanh — và có thể không bao giờ có cách.** Biết một bài là "khó" cũng quan trọng như biết cách giải bài "dễ": nó cứu bạn khỏi việc nướng hàng tuần tìm một thuật toán đa thức không tồn tại, và đẩy bạn sang hướng đúng đắn — approximation, heuristic, hoặc giải đúng cho `n` nhỏ.

## Mục tiêu học tập

Sau bài này, bạn sẽ:

- Phân biệt được **lớp P** (giải được trong thời gian đa thức) và **lớp NP** (kiểm tra lời giải được trong thời gian đa thức).
- Hiểu chính xác câu hỏi **P = NP?** — một trong 7 bài toán thiên niên kỷ ($1 triệu), và vì sao trực giác cho rằng P ≠ NP.
- Nắm khái niệm **NP-complete** (bài khó nhất trong NP), **NP-hard** (ít nhất khó như thế nhưng không nhất thiết thuộc NP), và vai trò của **reduction (quy về)**.
- Nhận diện các bài **NP-complete kinh điển**: SAT, vertex cover, clique, independent set, Hamiltonian, TSP, graph coloring, subset sum, partition.
- Biết **đối phó** với bài NP-hard: approximation có bound, heuristic, exact cho `n` nhỏ (bitmask DP), tận dụng special case.
- Phân biệt **pseudo-polynomial** (knapsack O(nW)) với polynomial thật, và biết khái niệm **undecidable** (halting problem).
- Tránh các **cạm bẫy** kinh điển: nhầm NP = "không giải được", tưởng NP-hard luôn thuộc NP, tưởng pseudo-poly là poly.

## Kiến thức tiền đề

- [Lesson 01 — Big-O & Asymptotic](../lesson-01-bigo-asymptotic/) — phân biệt O(n^k) (đa thức) với O(2^n), O(n!) (mũ/giai thừa) là nền tảng cả bài này.
- [Lesson 18 — Backtracking](../lesson-18-backtracking/) — brute-force duyệt mọi cấu hình, công cụ giải đúng cho `n` nhỏ.
- [Lesson 19 — Greedy](../lesson-19-greedy-fundamentals/) — nền cho heuristic và approximation.
- [Lesson 25 — Knapsack Family](../lesson-25-knapsack-family/) — knapsack 0/1, ví dụ pseudo-polynomial trung tâm của bài.
- [Lesson 29 — Bitmask DP](../lesson-29-bitmask-dp/) — Held-Karp TSP O(2ⁿ·n²), cách giải đúng tối ưu cho `n` nhỏ.

---

## 0. Đặt vấn đề: vì sao phải biết bài toán "khó"?

Tưởng tượng sếp giao: *"Viết thuật toán xếp lịch giao hàng đi qua 50 thành phố sao cho tổng quãng đường ngắn nhất."* Đây là **TSP (Traveling Salesman Problem)**. Bạn ngồi cả tuần thử mọi ý tưởng quy hoạch động, chia để trị, greedy... không cái nào chạy đủ nhanh và đúng. Bạn nghĩ mình kém.

Sự thật: **không một ai trên Trái Đất biết cách giải TSP tối ưu trong thời gian đa thức.** Đây không phải vì bạn dở — mà vì TSP thuộc lớp bài toán NP-hard. Nếu biết điều này từ đầu, bạn đã không phí một tuần, mà chuyển ngay sang: "OK, tôi sẽ dùng heuristic cho 50 thành phố, hoặc bitmask DP nếu chỉ 15 thành phố".

> 💡 **Trực giác / Hình dung.** Lý thuyết độ phức tạp giống một **tấm bản đồ địa hình** cho người leo núi. Trước khi leo, bạn nhìn bản đồ để biết đỉnh nào leo được trong ngày (bài P), đỉnh nào chưa ai leo tới đỉnh (bài NP-hard). Bạn không phí sức trèo vách đá thẳng đứng mà chọn đường vòng (approximation). Người không có bản đồ cứ lao vào vách đá rồi tự trách mình yếu.

Câu hỏi mở bài — *"có nên tiếp tục tìm thuật toán đa thức cho TSP không?"* — được đóng ngay trong bài: **không, nếu P ≠ NP (mà gần như chắc chắn vậy).** Thay vào đó bạn dùng 4 chiến lược ở mục 9.

---

## 1. Thời gian đa thức vs thời gian mũ — ranh giới "dễ" và "khó"

Trước khi định nghĩa P và NP, phải hiểu ranh giới mà mọi thứ xoay quanh: **đa thức (polynomial)** vs **mũ (exponential)**.

> 💡 **Trực giác.** "Đa thức" nghĩa là thời gian chạy bị chặn bởi `n^k` với `k` là hằng số cố định: n, n², n³, n⁵... Khi dữ liệu tăng gấp đôi, thời gian tăng theo một bội số cố định (gấp 4, gấp 8...). "Mũ" như 2ⁿ thì mỗi khi thêm **một** phần tử, thời gian **nhân đôi** — bùng nổ không kiểm soát.

**Định nghĩa (đa thức).** Thuật toán chạy thời gian đa thức nếu số bước ≤ `c·n^k` cho hằng số `c, k` không phụ thuộc `n`.

Hãy nhìn 4 ví dụ số cụ thể với `n = 50` (số thành phố TSP, hoặc số phần tử):

| Độ phức tạp | n = 10 | n = 20 | n = 50 | Loại |
|---|---|---|---|---|
| `n²` | 100 | 400 | 2.500 | đa thức (dễ) |
| `n³` | 1.000 | 8.000 | 125.000 | đa thức (dễ) |
| `2ⁿ` | 1.024 | ~10⁶ | ~10¹⁵ | mũ (khó) |
| `n!` | ~3,6 triệu | ~2,4·10¹⁸ | ~3·10⁶⁴ | giai thừa (khó kinh khủng) |

Walk-through con số `n = 50`:
- `n³ = 50³ = 125.000` — máy tính làm xong trong **micro giây**.
- `2⁵⁰ ≈ 1,13 · 10¹⁵` — ở 10⁹ thao tác/giây mất **~13 ngày**.
- `50! ≈ 3 · 10⁶⁴` — vượt quá số nguyên tử trong vũ trụ quan sát được (~10⁸⁰), thực tế **không bao giờ** xong.

> ⚠ **Lỗi thường gặp.** "n¹⁰⁰ là đa thức nên nhanh, 1,0001ⁿ là mũ nên chậm" — đúng về mặt **phân loại tiệm cận**, nhưng với `n` nhỏ thực tế thì n¹⁰⁰ chậm kinh khủng còn 1,0001ⁿ vẫn nhanh. Lý thuyết độ phức tạp nói về **hành vi khi n → ∞**. May mắn là các thuật toán đa thức thực tế đều có `k ≤ 4`.

> 🔁 **Dừng lại tự kiểm tra.** Với `n = 30`, ước lượng `2ⁿ` và `n²`.
> <details><summary>Đáp án</summary>
> `2³⁰ ≈ 1,07 · 10⁹` (khoảng 1 giây), `n² = 900`. Khoảng cách hơn 1 triệu lần — và mới chỉ n=30.
> </details>

---

## 2. Lớp P — giải được trong thời gian đa thức

> 💡 **Trực giác.** P là tập các bài toán **vừa giải được vừa nhanh** — bạn đưa input vào, máy trả lời trong thời gian đa thức. Đây là "vùng an toàn": gặp bài thuộc P, cứ tự tin code, sẽ có thuật toán O(n^k).

**Định nghĩa.** **P** (Polynomial time) là lớp các bài toán **quyết định** (decision problem — câu trả lời Yes/No) giải được bởi một thuật toán chạy thời gian đa thức trên kích thước input.

(Ta nói "bài toán quyết định" vì lý thuyết chuẩn hóa mọi bài về dạng Yes/No. Ví dụ TSP tối ưu hóa "tìm tour ngắn nhất" được phát biểu thành quyết định: "có tour nào ≤ K không?".)

**≥4 ví dụ cụ thể thuộc P:**

1. **Sắp xếp (sorting)** — merge sort O(n log n) ⊂ đa thức. ([Lesson 07](../lesson-07-merge-sort/))
2. **Shortest path** — Dijkstra O(E log V), Bellman-Ford O(VE). ([Lesson 33](../lesson-33-dijkstra/))
3. **Bipartite matching** — Hopcroft-Karp O(E√V). ([Lesson 39](../lesson-39-bipartite-matching/))
4. **Số nguyên tố (primality)** — AKS O(n⁶) trên số bit (kết quả 2002 đưa primality vào P).
5. **GCD** — Euclid O(log n).

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Tại sao primality từng được cho là khó mà giờ thuộc P?"* — Vì năm 2002 Agrawal-Kayal-Saxena tìm ra thuật toán đa thức (AKS). Đây là minh chứng: một bài "tưởng khó" có thể được chuyển vào P khi ai đó tìm ra thuật toán. Nhưng với NP-complete, **không ai làm được điều này** suốt 50+ năm.
> - *"Đa thức bậc cao như n⁶ có thực sự 'dễ' không?"* — Về lý thuyết thuộc P. Thực tế n⁶ với n lớn vẫn chậm, nhưng so với 2ⁿ thì là trời với vực.

**Vì sao "đa thức" là ranh giới của "dễ"?** Đây là một quy ước (gọi là **luận đề Cobham-Edmonds**), không phải định lý. Lý do nó hữu ích:

1. **Khép kín dưới phép hợp thành.** Gọi một thuật toán đa thức bên trong một vòng lặp đa thức vẫn ra đa thức (`n^a · n^b = n^(a+b)`). Mũ thì không có tính chất đẹp này một cách an toàn.
2. **Bền vững giữa các mô hình máy.** Một bài đa thức trên máy Turing cũng đa thức trên máy RAM, máy nhiều băng... (chỉ đổi số mũ). "Đa thức" không phụ thuộc chi tiết phần cứng.
3. **Thực tế đa số thuật toán đa thức có số mũ nhỏ** (k ≤ 4), nên "đa thức" và "chạy được" trùng nhau trên thực tế.

Walk-through tính khép kín: Floyd-Warshall O(V³) gọi bên trong một thuật toán lặp O(V) lần → O(V⁴), vẫn đa thức. Đổi V từ 100 lên 200 (gấp đôi) → thời gian gấp `2⁴ = 16` lần — tăng có kiểm soát, không nổ.

> 📝 **Tóm tắt mục 2.** P = giải được trong thời gian đa thức. Hầu hết bài bạn đã học (sort, shortest path, MST, matching, flow) đều thuộc P. Đa thức là ranh giới "dễ" vì khép kín dưới hợp thành và bền vững giữa các mô hình máy. Gặp bài P → tự tin có thuật toán nhanh.

---

## 3. Lớp NP — kiểm tra lời giải được trong thời gian đa thức

Đây là khái niệm hay bị hiểu sai nhất. NP **không** có nghĩa "Non-Polynomial" (không-đa-thức)! Nó là **Nondeterministic Polynomial**.

> 💡 **Trực giác.** NP là tập các bài mà **nếu ai đó đưa bạn một lời giải, bạn kiểm tra đúng/sai trong thời gian đa thức** — dù việc *tìm ra* lời giải có thể rất khó. Giống như giải một câu đố Sudoku: tìm lời giải mệt óc, nhưng nếu ai điền sẵn cho bạn xem, bạn kiểm "mỗi hàng/cột/ô đủ 1-9?" rất nhanh.

**Định nghĩa.** **NP** là lớp các bài toán quyết định mà với mỗi instance trả lời "Yes", tồn tại một **chứng nhận (certificate / witness)** kích thước đa thức, và một **thuật toán verifier** đa thức kiểm tra được chứng nhận đó là hợp lệ.

**≥4 ví dụ NP với certificate cụ thể:**

1. **SAT** — "công thức boolean này có cách gán biến nào làm nó TRUE không?" Certificate = một phép gán biến. Verify = thay vào, tính, xem ra TRUE. O(số mệnh đề).
2. **Clique** — "đồ thị có clique (tập đỉnh đôi một kề nhau) kích thước ≥ k không?" Certificate = tập k đỉnh. Verify = kiểm mọi cặp trong tập có cạnh. O(k²).
3. **Hamiltonian cycle** — "có chu trình đi qua mỗi đỉnh đúng 1 lần không?" Certificate = thứ tự các đỉnh. Verify = kiểm mỗi đỉnh xuất hiện 1 lần và các cạnh liên tiếp tồn tại. O(V).
4. **Subset Sum** — "tập số này có tập con tổng đúng T không?" Certificate = tập con đó. Verify = cộng lại xem có bằng T. O(n).

Walk-through verify subset sum: cho `S = {3, 34, 4, 12, 5, 2}`, `T = 9`. Ai đó đưa certificate `{4, 5}`. Verify: `4 + 5 = 9 = T` ✓ → "Yes" trong O(2) phép cộng. *Tìm* certificate này thì khó (phải thử tổ hợp), nhưng *kiểm* thì tức thì.

**Đối chiếu chi phí tìm vs kiểm (4 ví dụ số):**

| Bài | Tìm lời giải | Verify certificate |
|---|---|---|
| Subset Sum, n=40 | thử 2⁴⁰ ≈ 10¹² tập con | cộng ≤ 40 số: ~40 phép |
| SAT, 50 biến | thử 2⁵⁰ ≈ 10¹⁵ gán | thay vào: O(số literal) |
| Clique k=10 trong G(100 đỉnh) | duyệt C(100,10) ≈ 10¹³ tập | kiểm C(10,2)=45 cặp |
| Hamiltonian, 20 đỉnh | thử tới 19! ≈ 10¹⁷ thứ tự | kiểm 20 cạnh liên tiếp |

Cột "tìm" mũ/giai thừa, cột "verify" đa thức — đó chính là khoảng cách định nghĩa nên NP.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Nếu trả lời 'No' thì verify thế nào?"* — Định nghĩa NP chỉ yêu cầu certificate cho trường hợp "Yes". Trường hợp "No" thuộc về co-NP (đối ngẫu). Đừng lo, đa số bài học chỉ cần hiểu chiều "Yes".
> - *"Nondeterministic nghĩa là gì?"* — Mô hình lý thuyết: máy "đoán" certificate một cách phi tất định (như có một thiên thần mách nước), rồi verify. Trong thực tế ta chỉ cần nhớ: **NP = verify nhanh**.

> ⚠ **Lỗi thường gặp #1 (quan trọng nhất bài).** NP **KHÔNG** có nghĩa "không giải được" hay "không đa thức". Một bài NP hoàn toàn có thể thuộc P (xem mục 4). NP chỉ nói về việc *kiểm tra* lời giải nhanh.

> 📝 **Tóm tắt mục 3.** NP = "verify được trong đa thức". Tìm có thể khó, kiểm thì dễ. SAT, clique, Hamiltonian, subset sum đều thuộc NP vì có certificate kiểm nhanh.

---

## 4. P ⊆ NP, và câu hỏi triệu đô P = NP?

> 💡 **Trực giác.** Nếu bạn **giải** được một bài trong đa thức, thì bạn cũng **verify** được nó trong đa thức (cứ giải lại và so kết quả, hoặc bỏ qua certificate mà giải thẳng). Nên mọi bài trong P đều trong NP: **P ⊆ NP.**

Câu hỏi lớn: **liệu NP có lớn hơn P không, hay P = NP?**

- Nếu **P = NP**: mọi bài verify-nhanh cũng solve-nhanh → SAT, TSP, mọi thứ đều có thuật toán đa thức. Mật mã hiện đại (RSA dựa trên khó factor) sụp đổ.
- Nếu **P ≠ NP** (điều đại đa số tin): có những bài verify nhanh nhưng **bản chất** không thể solve nhanh. TSP, SAT mãi mãi khó.

Đây là một trong **7 bài toán thiên niên kỷ** của Viện Clay — ai chứng minh được (theo hướng nào) nhận **$1.000.000**. Mở từ 1971, chưa ai giải.

> 💡 **Trực giác về "tại sao tin P ≠ NP".** Trải nghiệm đời sống: **kiểm tra một lời giải dễ hơn nhiều so với nghĩ ra nó.** Chấm một bài chứng minh toán dễ hơn tự chứng minh. Thưởng thức một bản giao hưởng dễ hơn soạn ra nó. Nếu P = NP thì sáng tạo = kiểm tra — phản trực giác sâu sắc. Nhưng *trực giác không phải chứng minh* — đó là lý do bài này vẫn mở.

**Vì sao chứng minh khó đến vậy?** Để chứng minh P ≠ NP, phải chỉ ra **không tồn tại** thuật toán đa thức nào cho một bài NP-complete — chứng minh phủ định trên một tập vô hạn các thuật toán có thể có. Các kỹ thuật đã thử (relativization, natural proofs, algebrization) đều được chứng minh là **không đủ mạnh** để giải bài này — nghĩa là cần ý tưởng hoàn toàn mới. Đó là lý do sau 50+ năm vẫn bế tắc.

**Hệ quả thực tế nếu P = NP** (giả định): mọi bài tối ưu hóa khó (lập lịch, thiết kế mạch, gấp protein, chứng minh định lý tự động) đều giải nhanh. Nhưng đồng thời **RSA, ECC và phần lớn mật mã sụp đổ** vì chúng dựa trên giả định "factor / discrete log là khó". Đây là con dao hai lưỡi khiến câu hỏi vừa hấp dẫn vừa đáng sợ.

> ❓ **Câu hỏi tự nhiên.** *"Nếu chưa ai chứng minh P ≠ NP, sao dám nói TSP là khó?"* — Đúng, về mặt logic chặt chẽ ta chỉ nói: "TSP là NP-complete, nên **nếu** P ≠ NP thì TSP không có thuật toán đa thức". Vì gần như chắc P ≠ NP, trong thực hành ta hành xử như TSP là khó.

> 🔁 **Dừng lại tự kiểm tra.** P ⊆ NP hay NP ⊆ P được chứng minh chắc chắn?
> <details><summary>Đáp án</summary>
> P ⊆ NP **đã chứng minh** (solve nhanh ⟹ verify nhanh). NP ⊆ P là điều **chưa biết** — chính là câu hỏi P = NP. Nếu chứng minh được NP ⊆ P thì P = NP.
> </details>

---

## 5. NP-complete — những bài khó nhất trong NP

> 💡 **Trực giác.** Trong NP có những bài "khó nhất" theo nghĩa: **nếu bạn giải được MỘT bài này trong đa thức, bạn giải được TẤT CẢ bài NP trong đa thức** (vì mọi bài NP "quy về" được nó). Chúng là các "trụ chính" giữ cả tòa nhà NP — sập một trụ là sập cả P=NP.

**Định nghĩa.** Bài `B` là **NP-complete** nếu: (1) `B ∈ NP`, và (2) mọi bài `A ∈ NP` đều **reduce** (quy về) được về `B` trong thời gian đa thức (`B` là NP-hard).

**Định lý Cook-Levin (1971).** **SAT là NP-complete** — bài NP-complete đầu tiên được chứng minh. Cook chứng minh trực tiếp rằng mọi tính toán của máy Turing phi tất định đa thức có thể mã hóa thành một công thức SAT. Sau đó hàng nghìn bài khác được chứng minh NP-complete bằng cách reduce từ SAT.

**Hệ quả then chốt:** nếu **một** bài NP-complete có thuật toán đa thức → P = NP. Đây là lý do tìm thuật toán đa thức cho bất kỳ NP-complete nào là "vô vọng" (nếu P ≠ NP) — nó tương đương giải bài triệu đô.

> ❓ **Câu hỏi tự nhiên.** *"Làm sao chứng minh được MỌI bài NP quy về SAT khi NP vô hạn bài?"* — Cook không liệt kê từng bài. Ông dùng định nghĩa: mọi bài NP có một verifier là máy Turing đa thức. Ông mã hóa "máy Turing này chạy và chấp nhận" thành công thức SAT. Một chứng minh tổng quát qua mô hình tính toán, không qua liệt kê.

> 📝 **Tóm tắt mục 5.** NP-complete = thuộc NP + mọi bài NP quy về nó. SAT là cái đầu tiên (Cook-Levin). Giải nhanh 1 cái = giải nhanh tất cả = P=NP.

---

## 6. NP-hard — "ít nhất khó như NP-complete"

> 💡 **Trực giác.** NP-hard bỏ điều kiện "phải thuộc NP". Một bài NP-hard *ít nhất khó như* mọi bài NP (mọi NP quy về nó), nhưng bản thân nó **có thể còn khó hơn** — thậm chí không verify được nhanh, hoặc không giải được bao giờ.

**Định nghĩa.** Bài `B` là **NP-hard** nếu mọi bài `A ∈ NP` reduce được về `B` trong đa thức. Lưu ý: **không** yêu cầu `B ∈ NP`.

So sánh gọn:
- **NP-complete = NP-hard ∩ NP** (vừa khó nhất, vừa verify được nhanh).
- **NP-hard \ NP**: khó hơn, không verify nhanh hoặc không thuộc NP.

**≥4 ví dụ NP-hard không thuộc NP (hoặc không hiển nhiên thuộc NP):**

1. **TSP tối ưu hóa** (tìm tour NGẮN NHẤT, không phải "có tour ≤ K?") — để verify "đây là tour ngắn nhất" bạn cần chứng minh không tour nào ngắn hơn, không có certificate ngắn hiển nhiên → không rõ thuộc NP. Bản quyết định "có tour ≤ K?" thì thuộc NP-complete.
2. **Halting problem** — "chương trình này có dừng không?" NP-hard nhưng **undecidable** (mục 11), không thuật toán nào giải → chắc chắn không thuộc NP.
3. **Cờ vua tổng quát trên bàn n×n** — "bên trắng có chiến lược thắng?" — EXPTIME-hard.
4. **Tối ưu hóa knapsack/MAX-SAT** (tìm giá trị lớn nhất) — phiên bản tối ưu của các bài NP-complete.

> ⚠ **Lỗi thường gặp #2.** Tưởng "NP-hard luôn thuộc NP". SAI. Halting problem NP-hard nhưng còn không giải được, nói gì verify. Sơ đồ Venn: NP-hard là một vùng **đè lên** NP (giao = NP-complete) và **tràn ra ngoài** NP.

> 🔁 **Dừng lại tự kiểm tra.** Halting problem là NP-complete hay NP-hard?
> <details><summary>Đáp án</summary>
> NP-hard nhưng **KHÔNG** NP-complete, vì NP-complete đòi hỏi thuộc NP, mà halting problem không thuộc NP (không decidable). Nó nằm ngoài NP.
> </details>

> 📝 **Tóm tắt mục 6.** NP-hard = ít nhất khó như NP-complete, không bắt buộc thuộc NP. NP-complete = NP-hard giao NP. Có bài NP-hard còn không giải được (halting).

---

## 7. Reduction (quy về) — công cụ chứng minh "khó"

> 💡 **Trực giác.** Reduction là "biến bài A thành bài B": nếu tôi có hộp đen giải B, tôi dùng nó giải A bằng cách dịch input của A sang input của B. Nếu phép dịch nhanh (đa thức) và B dễ, thì A cũng dễ. Đảo lại (cách dùng để chứng minh khó): nếu A đã biết khó và A quy về B, thì **B cũng khó** (vì giải được B sẽ giải được A).

**Định nghĩa (polynomial-time reduction A ≤ₚ B).** Một hàm `f` chạy đa thức biến mỗi instance `x` của A thành instance `f(x)` của B sao cho: `x` là "Yes" của A ⟺ `f(x)` là "Yes" của B.

**Cách chứng minh bài mới `B` là NP-complete (2 bước):**
1. Chứng minh `B ∈ NP` (chỉ ra certificate + verifier đa thức).
2. Chọn một bài NP-complete đã biết `A`, chứng minh `A ≤ₚ B` (reduce A về B). Vì A khó, B cũng khó.

### Walk-through reduction: Independent Set ↔ Clique (đối ngẫu đẹp)

Hai bài:
- **Clique kích thước k**: có k đỉnh đôi một **kề** nhau không?
- **Independent Set kích thước k**: có k đỉnh đôi một **không kề** nhau không?

Phép quy: xét **đồ thị bù** `Ḡ` (complement) — `Ḡ` có cạnh (u,v) ⟺ `G` KHÔNG có cạnh (u,v).

> **Mệnh đề:** `G` có independent set kích thước k ⟺ `Ḡ` có clique kích thước k.

Vì sao? Trong independent set của G, mọi cặp **không** kề trong G → trong Ḡ chúng **kề** nhau → tạo thành clique. Phép dựng `Ḡ` mất O(V²) (đa thức). Vậy Independent Set ≤ₚ Clique và ngược lại.

Ví dụ số: `G` có 4 đỉnh {1,2,3,4}, cạnh {(1,2),(2,3),(3,4)}. Tập `{1,3}` là independent set (không cạnh 1-3) ✓. Trong `Ḡ` cạnh là {(1,3),(1,4),(2,4)}. Tập `{1,3}` có cạnh (1,3) trong Ḡ → là clique kích thước 2 ✓. Khớp mệnh đề.

### Ba tính chất một reduction hợp lệ phải có

Để `A ≤ₚ B` đúng, hàm `f` biến đổi instance phải thỏa cả ba:

1. **Chạy đa thức** — nếu `f` mất thời gian mũ thì dù B dễ, giải A qua B vẫn chậm → vô nghĩa.
2. **Bảo toàn câu trả lời cả hai chiều** — `x` Yes ⟺ `f(x)` Yes. Chỉ một chiều là sai (sẽ có false positive/negative).
3. **Đúng cho MỌI instance**, không chỉ vài ví dụ. Một reduction chỉ chạy đúng trên đồ thị 4 đỉnh không phải reduction.

> ⚠ **Lỗi thường gặp.** Quên chiều ⟸. Ví dụ độc giả hay viết "nếu x Yes thì f(x) Yes" rồi dừng. Nhưng nếu f(x) có thể Yes khi x No (chiều ⟸ hỏng), thì hộp đen giải B sẽ trả lời sai cho A. Phải chứng minh **cả hai chiều**.

Walk-through tính đa thức của reduction Independent Set → Clique: dựng đồ thị bù `Ḡ` cần duyệt mọi cặp đỉnh — `C(n,2) = n(n−1)/2`. Với n=1000: `≈ 500.000` thao tác = O(n²), đa thức. Vậy hộp đen giải Clique nhanh sẽ giải Independent Set nhanh.

> ❓ **Câu hỏi tự nhiên.** *"Reduce A về B hay B về A để chứng minh B khó?"* — **A (đã biết khó) ≤ₚ B**. Hướng quan trọng: bài-đã-biết-khó quy về bài-mới. Nhầm hướng (B ≤ₚ A) chỉ chứng minh B *dễ hơn hoặc bằng* A — vô dụng để kết luận B khó.

> ⚠ **Lỗi thường gặp.** Reduce sai hướng là lỗi #1 khi học NP-completeness. Nhớ câu: *"Để dìm B xuống (chứng minh khó), dựa vào kẻ đã chìm A."* A là cọc neo đã biết khó.

> 📝 **Tóm tắt mục 7.** Reduction A ≤ₚ B = dịch A thành B trong đa thức. Chứng minh B là NP-complete: (1) B∈NP, (2) reduce một NP-complete đã biết VỀ B. Independent Set ↔ Clique qua đồ thị bù.

---

## 8. Các bài NP-complete kinh điển (bộ "đồ nghề" nhận diện)

Học thuộc nhóm này giúp bạn **nhận ra ngay** một bài lạ là NP-complete (vì nó "trông giống" một trong số này):

| Bài | Phát biểu quyết định | Certificate |
|---|---|---|
| **SAT / 3-SAT** | Công thức boolean có gán nào TRUE? (3-SAT: mỗi clause 3 literal) | phép gán biến |
| **Vertex Cover** | Có tập ≤ k đỉnh "phủ" mọi cạnh? | tập đỉnh đó |
| **Clique** | Có k đỉnh đôi một kề? | tập đỉnh |
| **Independent Set** | Có k đỉnh đôi một không kề? | tập đỉnh |
| **Hamiltonian Path/Cycle** | Có đường/chu trình qua mỗi đỉnh đúng 1 lần? | thứ tự đỉnh |
| **TSP (decision)** | Có tour tổng trọng số ≤ K? | tour |
| **Graph Coloring** | Tô được bằng k màu để 2 đỉnh kề khác màu? | gán màu |
| **Subset Sum** | Có tập con tổng đúng T? | tập con |
| **Knapsack 0/1 (decision)** | Chọn món tổng weight ≤ W mà value ≥ V? | tập món |
| **Partition** | Chia tập số thành 2 phần tổng bằng nhau? | một phần |

> 💡 **Trực giác liên kết.** Nhiều bài là "anh em" qua reduction: 3-SAT → Independent Set → Vertex Cover → Clique (qua đồ thị bù) → Hamiltonian → TSP. Tất cả cùng "khó như nhau".

**Quan hệ Vertex Cover ↔ Independent Set (đẹp, đáng nhớ):** trong đồ thị `G` có `n` đỉnh, `S` là vertex cover ⟺ phần bù `V \ S` là independent set. Vì sao? Nếu `S` phủ mọi cạnh thì không cạnh nào nằm hoàn toàn trong `V \ S` → `V \ S` độc lập; và ngược lại.

Walk-through số: đường thẳng 0-1-2-3 (cạnh (0,1),(1,2),(2,3)), n=4. Vertex cover nhỏ nhất `{1,2}` (size 2). Phần bù `{0,3}` — kiểm: 0 và 3 không kề → là independent set lớn nhất (size 2). Kiểm đẳng thức: `|min VC| + |max IS| = 2 + 2 = 4 = n` ✓. Đẳng thức `min VC + max IS = n` luôn đúng — biết một cái suy ra cái kia.

> ⚠ **Lỗi thường gặp.** Tưởng vì "Vertex Cover ↔ Independent Set qua phần bù" mà cả hai dễ. KHÔNG — phần bù tính nhanh, nhưng *tìm cái nhỏ nhất/lớn nhất* vẫn NP-complete cho cả hai. Reduction chỉ nói chúng khó **như nhau**, không nói chúng dễ.

> 🔁 **Dừng lại tự kiểm tra.** Subset Sum và Partition khác nhau thế nào?
> <details><summary>Đáp án</summary>
> Partition là trường hợp đặc biệt của Subset Sum với T = (tổng cả tập)/2. Nếu tổng lẻ thì "No" ngay. Partition ≤ₚ Subset Sum hiển nhiên.
> </details>

---

## 9. Đối phó với bài NP-hard — 4 chiến lược

Gặp bài NP-hard không có nghĩa bó tay. Có 4 hướng thực dụng.

### 9.1 Approximation algorithm — gần tối ưu, CÓ BOUND

> 💡 **Trực giác.** Thay vì lời giải tối ưu (đắt), chấp nhận lời giải "tệ hơn nhiều nhất một hệ số cố định" nhưng tính được nhanh. Hệ số đó là **approximation ratio** ρ: thuật toán đảm bảo `cost ≤ ρ · OPT` (với bài cực tiểu).

**Walk-through: 2-approximation cho Vertex Cover.** Thuật toán cực kỳ đơn giản:
```
C = ∅
while còn cạnh chưa phủ:
    chọn một cạnh (u, v) bất kỳ chưa phủ
    thêm CẢ u và v vào C
    xóa mọi cạnh chạm u hoặc v
return C
```
**Vì sao ≤ 2·OPT?** Các cạnh ta chọn là một **matching** (không chia sẻ đỉnh). Mỗi cạnh matching cần ít nhất 1 đỉnh trong vertex cover tối ưu → `OPT ≥ số cạnh chọn = |C|/2` → `|C| ≤ 2·OPT`. Bound 2 được **chứng minh chặt chẽ**, không phải "hy vọng tốt".

Ví dụ số: tam giác {(1,2),(2,3),(1,3)}. OPT = 2 (vd {1,2} phủ cả 3 cạnh). Thuật toán chọn cạnh (1,2) → C={1,2}, xóa mọi cạnh (cả 3 chạm 1 hoặc 2) → dừng. |C|=2 = OPT lần này. Trường hợp khác có thể ra |C|=2·OPT nhưng không bao giờ tệ hơn.

**Christofides cho metric TSP**: ratio **1.5** (dùng MST + matching). Bound chặt: tour ≤ 1.5·OPT.

> ⚠ **Lỗi thường gặp #3.** "Approximation = gần đúng tùy ý muốn chính xác bao nhiêu cũng được" — SAI. Mỗi thuật toán có ratio **cố định** (2, 1.5...). Một số bài (như TSP tổng quát không metric) **không** có approximation hằng số nào trừ khi P=NP.

### 9.2 Heuristic — không bound nhưng thực tế tốt

Greedy, local search, simulated annealing, genetic algorithm. **Không đảm bảo** chất lượng (có thể tệ trên input xấu) nhưng thường rất tốt trên dữ liệu thực. Dùng khi không cần đảm bảo lý thuyết, chỉ cần "đủ tốt nhanh".

### 9.3 Exact cho n nhỏ — bitmask DP, branch & bound

Nếu `n` nhỏ (≤ ~20), giải **đúng tối ưu** bằng:
- **Bitmask DP (Held-Karp) cho TSP**: O(2ⁿ·n²). Với n=15: `2¹⁵·15² ≈ 7,4 triệu` — chạy tức thì. ([Lesson 29](../lesson-29-bitmask-dp/))
- **Branch & bound**: cắt nhánh sớm bằng cận dưới, thực tế nhanh hơn brute-force nhiều.

### 9.4 Parameterized / special case — bài con dễ

Nhiều bài NP-hard trở thành P khi giới hạn input:
- Vertex Cover trên **cây** giải được O(V) bằng DP. ([Lesson 28](../lesson-28-dp-on-trees/))
- 2-SAT (mỗi clause 2 literal) thuộc **P** dù 3-SAT NP-complete.
- Graph coloring trên đồ thị **phẳng** (planar): 4 màu luôn đủ (định lý 4 màu).

> 📝 **Tóm tắt mục 9.** 4 chiến lược: approximation (bound được chứng minh), heuristic (tốt thực tế, không bound), exact-cho-n-nhỏ (bitmask DP), special case (giới hạn input về P).

---

## 10. Pseudo-polynomial — cái bẫy của knapsack

> 💡 **Trực giác.** Knapsack 0/1 giải bằng DP O(n·W) (n món, W sức chứa). Nhìn thấy "đa thức theo n và W" — tưởng knapsack thuộc P? **KHÔNG.** Vì kích thước input không phải W mà là **số BIT để viết W**.

**Định nghĩa.** Thuật toán **pseudo-polynomial** chạy đa thức theo *giá trị số* của input, nhưng **mũ** theo *số bit* (độ dài biểu diễn) của input.

Walk-through con số: W = 1.000.000.000 (1 tỷ).
- DP O(n·W) với n=100: `100 · 10⁹ = 10¹¹` bước — chậm, gần như không chạy nổi.
- Số bit của W: `log₂(10⁹) ≈ 30 bit`. Input chỉ ~30 bit mà thời gian ~10¹¹ → **mũ theo số bit** (2³⁰ ≈ 10⁹).

So sánh: nếu thật sự đa thức theo *kích thước input* (số bit), tăng W lên gấp đôi (thêm 1 bit) chỉ làm thời gian tăng theo đa thức. Nhưng ở đây thêm 1 bit vào W → W gấp đôi → thời gian DP **gấp đôi** = mũ theo bit.

> ⚠ **Lỗi thường gặp #4.** Tưởng "knapsack có DP O(nW) nên thuộc P". Knapsack 0/1 là **NP-complete**; DP O(nW) chỉ pseudo-polynomial. Nó nhanh khi W nhỏ, vô dụng khi W lớn (như 10⁹). Subset Sum cũng vậy — O(nT) pseudo-poly.

> 🔁 **Dừng lại tự kiểm tra.** Tại sao O(n²) là poly thật mà O(nW) chỉ pseudo-poly?
> <details><summary>Đáp án</summary>
> n là số phần tử = kích thước input thật. W là một *giá trị* viết bằng log W bit; O(nW) = O(n·2^(log W)) mũ theo số bit log W. n² đa thức theo n (kích thước), nW mũ theo bit của W.
> </details>

> 📝 **Tóm tắt mục 10.** Pseudo-poly = đa thức theo giá trị, mũ theo số bit. Knapsack/Subset Sum DP là pseudo-poly, KHÔNG đưa chúng vào P. Nhanh khi số nhỏ, chết khi số lớn.

---

## 11. Undecidable — khó hơn cả NP-hard

> 💡 **Trực giác.** Có những bài KHÔNG thuật toán nào giải được, dù cho vô hạn thời gian. Đây là "tầng địa ngục" sâu hơn NP-hard — không phải "chậm" mà là "không tồn tại lời giải".

**Halting problem.** "Cho chương trình P và input x, P(x) có dừng (không lặp vô hạn) không?" Turing (1936) chứng minh **không thuật toán nào** quyết định được điều này cho mọi (P, x) — bài này **undecidable**.

Phác chứng minh (phản chứng): giả sử có `halts(P, x)`. Xây `trap(P)`: nếu `halts(P, P)` thì lặp vô hạn, ngược lại dừng. Hỏi `trap(trap)`: nếu nó dừng thì theo định nghĩa nó phải lặp vô hạn, mâu thuẫn; nếu lặp vô hạn thì phải dừng, mâu thuẫn. Vậy `halts` không tồn tại.

Halting problem là **NP-hard** (mọi NP quy về nó vì nó "khó vô hạn") nhưng **không decidable** → không thuộc NP. Đây là ví dụ rõ nhất của "NP-hard không thuộc NP".

> 📝 **Tóm tắt mục 11.** Undecidable = không thuật toán nào giải, dù vô hạn thời gian. Halting problem là kinh điển. Nó NP-hard nhưng không thuộc NP.

---

## 12. Code Go minh họa

Dưới đây là code Go biên dịch được minh họa các kỹ thuật trung tâm của bài.

### 12.1 Brute-force TSP vs Bitmask DP (Held-Karp)

```go
package main

import (
	"fmt"
	"math"
)

// bruteForceTSP: thử MỌI hoán vị của các đỉnh 1..n-1 (cố định 0 làm gốc).
// Độ phức tạp O(n!) — chỉ dùng cho n rất nhỏ (≤ ~10). Đây là cách "khó".
func bruteForceTSP(dist [][]float64) float64 {
	n := len(dist)
	perm := make([]int, 0, n-1)
	for i := 1; i < n; i++ {
		perm = append(perm, i)
	}
	best := math.Inf(1)
	// hàm đệ quy sinh hoán vị (backtracking, xem Lesson 18)
	var rec func(k int)
	rec = func(k int) {
		if k == len(perm) {
			cost := dist[0][perm[0]]
			for i := 0; i+1 < len(perm); i++ {
				cost += dist[perm[i]][perm[i+1]]
			}
			cost += dist[perm[len(perm)-1]][0] // quay về gốc
			if cost < best {
				best = cost
			}
			return
		}
		for i := k; i < len(perm); i++ {
			perm[k], perm[i] = perm[i], perm[k]
			rec(k + 1)
			perm[k], perm[i] = perm[i], perm[k]
		}
	}
	rec(0)
	return best
}

// heldKarpTSP: bitmask DP O(2^n · n^2) — "exact cho n nhỏ" (Lesson 29).
// dp[mask][j] = chi phí ngắn nhất đi từ 0, thăm đúng tập đỉnh mask, kết ở j.
func heldKarpTSP(dist [][]float64) float64 {
	n := len(dist)
	full := 1 << n
	dp := make([][]float64, full)
	for m := range dp {
		dp[m] = make([]float64, n)
		for j := range dp[m] {
			dp[m][j] = math.Inf(1)
		}
	}
	dp[1][0] = 0 // chỉ thăm {0}, đang ở 0
	for mask := 1; mask < full; mask++ {
		for j := 0; j < n; j++ {
			if dp[mask][j] == math.Inf(1) || mask&(1<<j) == 0 {
				continue
			}
			for k := 0; k < n; k++ {
				if mask&(1<<k) != 0 {
					continue // k đã thăm
				}
				nm := mask | (1 << k)
				if c := dp[mask][j] + dist[j][k]; c < dp[nm][k] {
					dp[nm][k] = c
				}
			}
		}
	}
	best := math.Inf(1)
	for j := 1; j < n; j++ {
		if c := dp[full-1][j] + dist[j][0]; c < best {
			best = c
		}
	}
	return best
}

func main() {
	dist := [][]float64{
		{0, 10, 15, 20},
		{10, 0, 35, 25},
		{15, 35, 0, 30},
		{20, 25, 30, 0},
	}
	// Walk-through: 4 thành phố. Tour tối ưu 0→1→3→2→0 = 10+25+30+15 = 80.
	fmt.Printf("Brute-force: %.0f\n", bruteForceTSP(dist)) // 80
	fmt.Printf("Held-Karp  : %.0f\n", heldKarpTSP(dist))   // 80 (cùng kết quả, nhanh hơn nhiều khi n lớn)
}
```

Walk-through Held-Karp với 4 thành phố trên: tour tối ưu là `0→1→3→2→0` = `10 + 25 + 30 + 15 = 80`. Cả hai hàm ra 80; brute-force thử `3! = 6` hoán vị, Held-Karp duyệt `2⁴·4 = 64` trạng thái. Với n=15: brute-force `14! ≈ 8,7·10¹⁰` (chết), Held-Karp `2¹⁵·15² ≈ 7,4·10⁶` (tức thì).

### 12.2 2-Approximation cho Vertex Cover

```go
package main

import "fmt"

// vertexCover2Approx: ghép cặp các cạnh chưa phủ, thêm CẢ 2 đỉnh.
// Đảm bảo |C| ≤ 2·OPT (chứng minh ở mục 9.1). O(V + E).
func vertexCover2Approx(n int, edges [][2]int) map[int]bool {
	covered := make([]bool, n) // đỉnh đã vào cover
	cover := map[int]bool{}
	for _, e := range edges {
		u, v := e[0], e[1]
		if covered[u] || covered[v] {
			continue // cạnh này đã được phủ
		}
		// chọn cạnh (u,v) chưa phủ → thêm CẢ HAI đỉnh
		cover[u] = true
		cover[v] = true
		covered[u] = true
		covered[v] = true
	}
	return cover
}

func main() {
	// Đồ thị đường thẳng 0-1-2-3: cạnh (0,1),(1,2),(2,3).
	// OPT = {1,2} kích thước 2. 2-approx có thể ra {0,1,2,3} hoặc {1,2}.
	edges := [][2]int{{0, 1}, {1, 2}, {2, 3}}
	c := vertexCover2Approx(4, edges)
	fmt.Println("Vertex cover (2-approx):", c, "| kích thước:", len(c))
}
```

### 12.3 Greedy heuristic cho Set Cover + Verify SAT

```go
package main

import "fmt"

// greedySetCover: heuristic — mỗi bước chọn tập phủ NHIỀU phần tử CHƯA phủ nhất.
// KHÔNG có bound hằng số (ratio = ln n), nhưng thực tế tốt. Đây là "heuristic" mục 9.2.
func greedySetCover(universe int, sets [][]int) []int {
	covered := make([]bool, universe)
	remaining := universe
	chosen := []int{}
	for remaining > 0 {
		bestIdx, bestGain := -1, 0
		for i, s := range sets {
			gain := 0
			for _, x := range s {
				if !covered[x] {
					gain++
				}
			}
			if gain > bestGain {
				bestGain, bestIdx = gain, i
			}
		}
		if bestIdx == -1 {
			break // không phủ hết được
		}
		for _, x := range sets[bestIdx] {
			if !covered[x] {
				covered[x] = true
				remaining--
			}
		}
		chosen = append(chosen, bestIdx)
	}
	return chosen
}

// verifySAT: kiểm tra phép gán có thỏa công thức CNF không — O(số literal).
// Đây là VERIFIER của bài NP (mục 3): tìm assignment khó, kiểm thì nhanh.
// clauses ở dạng CNF: mỗi clause là []int, literal dương = biến, âm = phủ định.
// vd clause {1, -2, 3} = (x1 OR NOT x2 OR x3).
func verifySAT(clauses [][]int, assign map[int]bool) bool {
	for _, clause := range clauses {
		ok := false
		for _, lit := range clause {
			v := lit
			if v < 0 {
				v = -v
			}
			val := assign[v]
			if lit < 0 {
				val = !val // literal phủ định
			}
			if val {
				ok = true
				break
			}
		}
		if !ok {
			return false // clause này không thỏa → cả công thức sai
		}
	}
	return true
}

func main() {
	// Set cover: universe {0..4}, 3 tập.
	sets := [][]int{{0, 1, 2}, {2, 3}, {3, 4}}
	fmt.Println("Set cover (greedy) chọn tập:", greedySetCover(5, sets))

	// Verify SAT: công thức (x1 OR NOT x2) AND (NOT x1 OR x3)
	clauses := [][]int{{1, -2}, {-1, 3}}
	a1 := map[int]bool{1: true, 2: false, 3: true}  // thỏa
	a2 := map[int]bool{1: true, 2: false, 3: false} // không thỏa clause 2
	fmt.Println("Assign1 thỏa?", verifySAT(clauses, a1)) // true
	fmt.Println("Assign2 thỏa?", verifySAT(clauses, a2)) // false
}
```

Walk-through `verifySAT` với `a2 = {x1=T, x2=F, x3=F}` trên `(x1 OR NOT x2) AND (NOT x1 OR x3)`:
- Clause 1 `(x1 OR NOT x2)`: x1=T → thỏa ✓.
- Clause 2 `(NOT x1 OR x3)`: NOT x1 = F, x3 = F → cả hai F → **không thỏa** → trả `false`.

Đúng tinh thần NP: verify chỉ O(số literal), trong khi *tìm* assignment thỏa là bài SAT NP-complete.

---

## Bài tập

1. **(Verify lời giải NP — Subset Sum)** Cho `S = {7, 3, 2, 5, 8}`, `T = 10`, certificate `{2, 8}`. Viết các bước verify và xác nhận Yes/No. Sau đó verify certificate `{3, 5}` cho cùng T.
2. **(2-approx Vertex Cover)** Chạy thuật toán 2-approx trên đồ thị 5 đỉnh, cạnh `{(0,1),(0,2),(1,2),(3,4)}`, giả sử cạnh được duyệt theo thứ tự liệt kê. Tìm cover thuật toán trả về, OPT, và tính ratio thực tế.
3. **(TSP brute vs bitmask DP)** Với n thành phố, brute-force là O((n-1)!), Held-Karp là O(2ⁿ·n²). Tính số thao tác ước lượng cho n=12 và n=18, kết luận khi nào mỗi cách khả thi (giả sử 10⁹ thao tác/giây).
4. **(Reduction Independent Set ↔ Clique)** Cho `G` 5 đỉnh {1,2,3,4,5}, cạnh `{(1,2),(2,3),(3,4),(4,5),(5,1)}` (chu trình C5). Tìm một independent set kích thước 2 trong G, rồi xác nhận nó là clique trong đồ thị bù `Ḡ`.
5. **(Phân loại lớp)** Phân loại 6 bài sau là **P**, **NP-complete**, hay **NP-hard (không NP-complete)**: (a) sắp xếp mảng, (b) 3-SAT, (c) shortest path Dijkstra, (d) Hamiltonian cycle, (e) halting problem, (f) tìm MST.
6. **(Greedy Set Cover)** Universe `{0,1,2,3,4,5}`, các tập `S1={0,1,2,3}`, `S2={3,4}`, `S3={4,5}`, `S4={0,5}`. Chạy greedy (chọn tập phủ nhiều phần tử chưa phủ nhất) và liệt kê thứ tự tập được chọn.
7. **(Pseudo-poly)** Subset Sum DP là O(nT). Cho n=50, T=2.000.000.000. Số bit của T là bao nhiêu? Số thao tác DP là bao nhiêu? Giải thích vì sao đây KHÔNG phải thuật toán đa thức.

---

## Lời giải chi tiết

### Bài 1 — Verify Subset Sum

**Cách tiếp cận:** verifier chỉ cần (1) kiểm các phần tử của certificate đều thuộc `S`, (2) cộng lại so với `T`. O(kích thước certificate).

- Certificate `{2, 8}`: cả 2 ∈ S ✓. Tổng `2 + 8 = 10 = T` → **Yes** ✓.
- Certificate `{3, 5}`: cả 2 ∈ S ✓. Tổng `3 + 5 = 8 ≠ 10` → certificate này **không hợp lệ** (không chứng minh được Yes). Lưu ý: điều này không có nghĩa câu trả lời bài toán là No — chỉ là certificate cụ thể này sai. (Thực tế `{2,8}` đã chứng minh đáp án là Yes.)

Độ phức tạp verify: O(k) phép cộng, hoàn toàn đa thức — đúng tính chất NP.

### Bài 2 — 2-approx Vertex Cover

**Cách tiếp cận:** duyệt cạnh, gặp cạnh chưa phủ thì thêm cả 2 đỉnh.

Duyệt `{(0,1),(0,2),(1,2),(3,4)}`:
- `(0,1)` chưa phủ → thêm 0,1. Cover = {0,1}. Xóa (0,1),(0,2),(1,2) (đều chạm 0 hoặc 1).
- `(3,4)` chưa phủ → thêm 3,4. Cover = {0,1,3,4}.

Cover thuật toán = **{0,1,3,4}**, kích thước 4.

OPT: tam giác (0,1,2) cần ≥ 2 đỉnh (vd {0,1} hoặc {0,2}), cạnh (3,4) cần ≥1 đỉnh. OPT = `{0,1,3}` hoặc `{0,2,3}`... kích thước **3** (vd {1,2,3}: 1 phủ (0,1)(1,2), 2 phủ (0,2), 3 phủ (3,4) ✓). 

Ratio thực tế = `4/3 ≈ 1,33` ≤ 2 ✓ (bound 2 luôn đúng).

### Bài 3 — TSP brute vs bitmask DP

- **n=12:** brute `(12-1)! = 11! = 39.916.800 ≈ 4·10⁷` → ~0,04 giây (khả thi). Held-Karp `2¹²·12² = 4096·144 ≈ 5,9·10⁵` → tức thì.
- **n=18:** brute `17! ≈ 3,56·10¹⁴` → ~4 ngày (không khả thi). Held-Karp `2¹⁸·18² = 262144·324 ≈ 8,5·10⁷` → ~0,08 giây (khả thi).

**Kết luận:** brute-force chỉ dùng được tới ~n=12-13; bitmask DP đẩy giới hạn tới ~n=20 (2²⁰·400 ≈ 4·10⁸). Vượt n=20 phải dùng heuristic/approximation.

### Bài 4 — Independent Set ↔ Clique trên C5

`G` = chu trình 1-2-3-4-5-1. Independent set kích thước 2: chọn 2 đỉnh không kề, vd **{1,3}** (1-3 không phải cạnh của C5) ✓.

Đồ thị bù `Ḡ`: cạnh là các cặp KHÔNG kề trong G = `{(1,3),(1,4),(2,4),(2,5),(3,5)}`. Trong `Ḡ`, cặp (1,3) **có** cạnh → `{1,3}` là clique kích thước 2 ✓. Khớp mệnh đề mục 7: independent set của G = clique của Ḡ.

### Bài 5 — Phân loại lớp

| Bài | Lớp | Lý do |
|---|---|---|
| (a) sắp xếp | **P** | merge sort O(n log n) |
| (b) 3-SAT | **NP-complete** | thuộc NP + reduce từ SAT |
| (c) Dijkstra shortest path | **P** | O(E log V) |
| (d) Hamiltonian cycle | **NP-complete** | thuộc NP (verify tour) + NP-hard |
| (e) halting problem | **NP-hard (không NP-complete)** | undecidable → không thuộc NP |
| (f) MST | **P** | Kruskal/Prim đa thức |

### Bài 6 — Greedy Set Cover

Universe `{0,1,2,3,4,5}`. Tập: `S1={0,1,2,3}`(4), `S2={3,4}`(2), `S3={4,5}`(2), `S4={0,5}`(2).

- **Bước 1:** chưa phủ = {0..5}. Gain: S1=4, S2=2, S3=2, S4=2 → chọn **S1**. Phủ {0,1,2,3}. Còn {4,5}.
- **Bước 2:** Gain với {4,5}: S2 phủ {4}=1, S3 phủ {4,5}=2, S4 phủ {5}=1 → chọn **S3**. Phủ {4,5}. Còn ∅.

Thứ tự chọn: **S1 → S3** (2 tập). Đây cũng là tối ưu ở đây. Greedy không luôn tối ưu (ratio ln n) nhưng thường tốt.

### Bài 7 — Pseudo-poly

- Số bit của `T = 2·10⁹`: `log₂(2·10⁹) ≈ 31 bit`.
- Số thao tác DP: `n·T = 50 · 2·10⁹ = 10¹¹` → ~100 giây (rất chậm).
- **Vì sao không đa thức:** kích thước input ≈ `n + 31 bit` ≈ vài chục bit, nhưng thời gian ~10¹¹ = mũ theo số bit (`T = 2^31`, thời gian ∝ T = 2^(số bit)). Nếu thêm 1 bit vào T (T gấp đôi), thời gian gấp đôi → mũ theo bit, không phải đa thức. Đây là pseudo-polynomial.

---

## Code & Minh họa

- Code Go inline ở [mục 12](#12-code-go-minh-họa): brute-force + Held-Karp TSP, 2-approx vertex cover, greedy set cover, verify SAT.
- [visualization.html](./visualization.html) — 3 module tương tác:
  1. **Bản đồ P/NP/NP-complete/NP-hard** — sơ đồ Venn, click bài toán xem thuộc lớp nào.
  2. **Verify vs Solve** — subset sum: solve (thử mọi tập, chậm) vs verify (cho lời giải, kiểm nhanh).
  3. **Approximation** — vertex cover 2-approx vs optimal, so ratio.

---

## Kết thúc Tier 7

Đây là bài cuối **Tier 7 — Thuật toán nâng cao**. Bạn đã đi qua number theory (L46), computational geometry (L47), randomized algorithms (L48) và giờ là ranh giới của cái "giải được": P vs NP.

**Thông điệp cốt lõi mang theo:** trước khi lao vào tối ưu một bài, hỏi *"bài này thuộc lớp nào?"*. Nếu là P → tìm thuật toán đa thức. Nếu NP-hard → đừng phí thời gian tìm thuật toán đa thức, mà chọn approximation / heuristic / exact-cho-n-nhỏ / special case.

**Tiếp theo:** [Tier 8 — Giải quyết vấn đề & Capstone](../tier-8-problem-solving/index.html) — framework tiếp cận bài toán lạ, đánh đổi độ phức tạp, và capstone pathfinding visualizer.
