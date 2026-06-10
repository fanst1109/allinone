// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: AI-ML/05-NLP-Applied/lesson-03-vector-db-rag/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 07 — Vector Database + RAG

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao brute-force tìm vector gần nhất KHÔNG khả thi** khi dữ liệu lên tới hàng tỷ embedding.
- Biết ba thuật toán **ANN (Approximate Nearest Neighbor)** quan trọng nhất trong thực tế: **IVF**, **HNSW**, **Product Quantization (PQ)**.
- Hiểu được trade-off **accuracy ↔ speed ↔ memory** của mỗi thuật toán, biết khi nào dùng cái nào.
- Đọc được tên các vector database hiện đại — Pinecone, Weaviate, Qdrant, Milvus, ChromaDB, pgvector — và biết khác nhau ở đâu.
- Hiểu thấu **RAG (Retrieval-Augmented Generation)**: vì sao LLM cần RAG, pipeline 4 bước (index → query → augment → generate) và walk-through một query thật từ đầu đến cuối.
- Nắm được các kỹ thuật phụ trợ: **chunking** (fixed-size, semantic, hierarchical), **reranking** (cross-encoder), **evaluation** (precision@k, recall@k, MRR, NDCG).
- Lường trước các lỗi phổ biến: bad chunking, embedding mismatch, stale index.

## Prerequisites

- [Lesson 06 — Word & Sentence Embedding](../lesson-06-word-embeddings/) — phải hiểu **embedding là gì**, vì sao vector cùng hướng = ý nghĩa giống nhau.
- [Tầng 4 / Lesson 02 — Dot product + Cosine similarity](../../04-LinearAlgebra/lesson-02-dot-product/) — đây là độ đo bạn sẽ dùng để so 2 vector.
- [Tầng 5 / Lesson 04 — MLE và softmax](../../05-Probability/lesson-04-mle-softmax/) — không bắt buộc, nhưng nếu hiểu sẽ thấy cross-encoder reranker tự nhiên hơn.
- Kiến thức bổ sung tự nhắc lại: **k-means clustering** (sẽ giải thích trong bài này, không cần đọc trước).

---

## 1. Đặt vấn đề: 1 tỷ embedding 768D — brute force chết

### 1.1 Bài toán thực tế

Bạn vừa build một sản phẩm như **Notion AI** hoặc **Perplexity**:

- Mỗi đoạn văn bản (chunk) trong toàn bộ dữ liệu khách hàng đã được embed thành vector 768 chiều (giả sử dùng \`sentence-transformers/all-mpnet-base-v2\`).
- Tổng kho có **1.000.000.000 chunk** (1 tỷ) — không quá xa thực tế nếu khách lớn như Microsoft hay một enterprise legal firm.
- Khi user hỏi một câu, bạn embed câu hỏi thành vector $q \\in \\mathbb{R}^{768}$ và muốn tìm **top-10 chunk gần nhất với $q$** theo cosine similarity, để nhồi vào prompt LLM.

> 💡 **Trực giác / Hình dung**
>
> Hình dung 1 tỷ chunk là 1 tỷ cuốn sách trong thư viện vũ trụ, và bạn là người đi tìm. Cách "ngây thơ": mở từng cuốn, đọc, so sánh, ghi nhớ 10 cuốn giống nhất. Hết đời cũng chưa xong. Cần một **hệ thống thư mục** (index) để chỉ phải xem vài kệ thay vì toàn thư viện.

### 1.2 Phép tính brute force

Để tính cosine similarity giữa $q$ và 1 vector $v \\in \\mathbb{R}^{768}$:

\`\`\`
cos(q, v) = (q · v) / (|q| · |v|)
\`\`\`

Phần đắt nhất là **dot product** $q \\cdot v = \\sum_i q_i \\cdot v_i$ — cần đúng **768 phép nhân + 767 phép cộng $\\approx$ 1536 phép cơ bản** (FLOP).

Tổng phép tính khi quét toàn bộ:

\`\`\`
Brute force = N · 1536 = 10⁹ · 1536 ≈ 1.5 × 10¹² FLOP
\`\`\`

Một CPU server hiện đại làm được ~10⁹ FLOP/giây (1 GFLOPS) cho dot product có overhead → mất **≈ 1500 giây = 25 phút** cho **một** truy vấn. Với GPU có thể tăng tốc 10-100×, vẫn là **15 giây - vài phút mỗi truy vấn**. **Không chấp nhận được** cho ứng dụng real-time (yêu cầu thường < 100ms).

> ❓ **Câu hỏi tự nhiên của người đọc**
>
> *"Sao không thêm RAM? 1 tỷ vector × 768 chiều × 4 byte (float32) = 3.072 TB RAM. Một server thường có 128 GB. Vậy còn phải distribute. Mua thêm RAM không cứu được — vấn đề là **số phép tính**, không chỉ là chỗ chứa."*
>
> *"Quantization có giúp không?"* Có — sẽ học ở mục 6 (PQ). Nhưng cần kèm thuật toán index, chỉ nén thôi vẫn phải so sánh toàn bộ.

### 1.3 Có cần chính xác 100% không?

Đây là câu hỏi quyết định. Trong các bài toán search/RAG:

- User hỏi "What is Python?", trả về top-10 chunks về Python.
- Nếu thuật toán trả về **9 chunks đúng** + **1 chunk gần đúng** (vd thay 1 chunk có ý nghĩa tương tự), kết quả cuối từ LLM gần như không khác.

→ Chúng ta sẵn sàng **trade một chút accuracy** để lấy **tốc độ tăng 100-1000×**. Đó là toàn bộ ý tưởng của **ANN (Approximate Nearest Neighbor)**.

> 📝 **Tóm tắt mục 1**
> - Brute force 1 tỷ vector × 768D = 1.5 × 10¹² FLOP/query → 25 phút. Không khả thi.
> - Bottleneck là **số phép tính**, không phải RAM.
> - Trong RAG/search, accuracy 95-99% đã là dư — đổi lấy tốc độ là deal cực kỳ tốt.

---

## 2. Approximate Nearest Neighbor (ANN) — bức tranh chung

### 2.1 Định nghĩa hình thức

Cho tập điểm $P = \\{p_1, p_2, \\ldots, p_n\\} \\subset \\mathbb{R}^d$ và truy vấn $q \\in \\mathbb{R}^d$:

- **Exact k-NN**: trả về **chính xác** k điểm gần nhất theo khoảng cách $\\text{dist}(q, p_i)$.
- **Approximate k-NN (ANN) với recall@k = r**: trả về k điểm sao cho **trung bình $r \\times 100\\%$ trong số đó trùng với exact k-NN**.

Ví dụ: ANN với recall@10 = 0.95 nghĩa là trung bình mỗi truy vấn trả về 9.5 trong 10 điểm gần nhất thật sự. Trong RAG, recall@10 = 0.95 là quá đủ.

### 2.2 Ba "trục" trade-off

Mọi thuật toán ANN đều đánh đổi giữa:

| Trục | Định nghĩa |
|------|------------|
| **Accuracy** | Recall@k — phần trăm điểm thật sự gần được tìm ra |
| **Speed** | Latency mỗi query (ms) |
| **Memory** | RAM/disk dùng để lưu index |

Không thuật toán nào tối ưu cả 3 cùng lúc. Mỗi cái có "tham số xoay" để bạn chọn vị trí trong tam giác trade-off.

### 2.3 Ba họ thuật toán chính

| Họ | Ý tưởng cốt lõi | Khi nào dùng |
|----|-----------------|--------------|
| **IVF (Inverted File)** | Cluster trước → chỉ tìm trong vài cluster gần | Dataset rất lớn ($10^8$-$10^9$), chấp nhận build chậm |
| **HNSW (graph)** | Graph nhiều tầng, navigate từ thô đến mịn | Dataset vừa ($10^6$-$10^8$), cần latency thấp |
| **PQ (quantization)** | Nén vector xuống vài byte, so sánh trên dạng nén | Khi RAM là constraint chính |

Thực tế thường **kết hợp**: vd \`IVF + PQ\` (FAISS có sẵn \`IVFPQ\`) — vừa giảm số cluster phải xem vừa nén vector.

> 💡 **Trực giác / Hình dung**
>
> - **IVF** = phân thư viện thành 1000 kệ theo chủ đề. Tới chỉ xem 5 kệ gần nhất.
> - **HNSW** = thư viện có "đường cao tốc" tầng trên dẫn nhanh tới khu vực + đường nhỏ tầng dưới dẫn tới cuốn cụ thể.
> - **PQ** = mỗi cuốn sách thay vì lưu nguyên cuốn, chỉ lưu **mã 8 chữ số** đại diện. Đọc mã nhanh hơn đọc cả cuốn.

> 📝 **Tóm tắt mục 2**
> - ANN = bỏ exact để lấy tốc độ, recall@k 95-99% là mục tiêu thực tế.
> - 3 trục đánh đổi: accuracy / speed / memory.
> - 3 họ thuật toán: IVF (cluster), HNSW (graph), PQ (quantize). Kết hợp được.

---

## 3. IVF (Inverted File Index) — cluster trước, search sau

### 3.1 Ý tưởng

Trước khi nhận query nào, **tiền xử lý** toàn bộ tập điểm:

1. Chạy **k-means** với $c$ cluster trên $N$ điểm.
2. Mỗi cluster có 1 **centroid** (tâm), gọi là $c_j$ với $j = 1..c$.
3. Mỗi điểm $p_i$ được gán vào cluster có centroid gần nhất → tạo "inverted list" $L_j = \\{p_i : p_i \\text{ thuộc cluster } j\\}$.

Khi query $q$ đến:

1. So $q$ với $c$ centroid → tìm \`nprobe\` centroid gần nhất.
2. Chỉ quét các điểm trong \`nprobe\` cluster đó (gọi là "probed lists").
3. Trả về top-k trong tập đã quét.

### 3.2 Walk-through bằng số cụ thể

Giả sử $N = 1.000.000$, $d = 128$, $c = 1.000$ (chọn $c \\approx \\sqrt{N}$ là quy tắc ngón tay).

- **Số điểm trung bình mỗi cluster**: $N/c = 1000$ điểm.
- **Brute force**: $N \\cdot d = 10^6 \\cdot 128 = 1{,}28 \\times 10^8$ FLOP/query.
- **IVF với nprobe = 10**:
  - So với centroid: $c \\cdot d = 1000 \\cdot 128 = 128.000$ FLOP.
  - So với điểm trong 10 cluster: $10 \\cdot 1000 \\cdot d = 10^4 \\cdot 128 = 1{,}28 \\times 10^6$ FLOP.
  - Tổng: $1{,}28 \\times 10^6 + 1{,}28 \\times 10^5 \\approx 1{,}4 \\times 10^6$ FLOP.
  - **Speedup $\\approx$ 91×** so với brute force.

> ❓ **Câu hỏi tự nhiên của người đọc**
>
> *"Nếu k-NN thật rơi vào cluster mình KHÔNG probe thì sao?"* — Đó là **miss**. Tăng \`nprobe\` (vd lên 50) → bắt được nhiều hơn nhưng chậm hơn. Đây chính là "núm xoay" của IVF.
>
> *"k-means có hội tụ chậm với $10^9$ điểm không?"* — Có. Trong thực tế dùng **mini-batch k-means** hoặc chỉ k-means trên một subset (vd $10^6$ điểm sample) rồi gán cluster cho phần còn lại bằng nearest centroid. FAISS có sẵn.

### 3.3 Trade-off

| Tham số | Tác động | Khi nào tăng |
|---------|----------|--------------|
| $c$ (số cluster) | $c$ lớn → mỗi cluster nhỏ → search trong cluster nhanh, NHƯNG cần quét nhiều centroid hơn | Khi $N$ rất lớn |
| \`nprobe\` | Tăng → recall ↑, tốc độ ↓ | Khi recall thấp |

**Quy tắc thực dụng** (từ FAISS docs):
- $c \\approx \\sqrt{N}$ (vd $N = 10^9$ → $c \\approx 30.000$).
- \`nprobe\` chỉnh để đạt recall mục tiêu (thường 1% của $c$, tức 100-300).

### 3.4 Toy example: cảnh báo

Ví dụ ở mục 3.2 dùng $c = 1000$ với $N = 10^6$. **Trong production**, với $N = 10^9$ bạn sẽ:

- Dùng \`IVF65536\` ($c = 2^{16}$), kết hợp với PQ để mỗi vector trong inverted list được nén.
- Train centroids trên subset 5-10M.
- Phân tán inverted list lên nhiều shard.

> ⚠ **Lỗi thường gặp**
>
> - **Quên train centroid mới khi distribution đổi**: nếu sản phẩm bạn ngày càng nhiều dữ liệu lĩnh vực mới, các centroid cũ không còn "đặc trưng" cho dữ liệu nữa → recall tụt. Phải retrain định kỳ.
> - **Chọn $c$ quá lớn**: search nhanh nhưng \`nprobe\` phải cao hơn để giữ recall → triệt tiêu lợi ích.

> 🔁 **Dừng lại tự kiểm tra**
>
> Cho $N = 10^8$, $d = 768$. Bạn muốn search trong 50ms với CPU 1 GFLOPS. Chọn $c$ và \`nprobe\` thế nào?
>
> <details><summary>Đáp án</summary>
>
> Budget: 50ms × $10^9$ FLOP/s = $5 \\times 10^7$ FLOP.
>
> Chọn $c \\approx \\sqrt{N} = 10^4$. Compare với centroid: $c \\cdot d = 10^4 \\cdot 768 \\approx 7{,}7 \\times 10^6$ FLOP.
>
> Còn lại $5 \\times 10^7 - 7{,}7 \\times 10^6 \\approx 4{,}2 \\times 10^7$ FLOP cho probe.
>
> Mỗi cluster có $N/c = 10^4$ điểm, mỗi compare $d = 768$ FLOP → 1 cluster = $7{,}68 \\times 10^6$ FLOP.
>
> \`nprobe\` $\\approx 4{,}2 \\times 10^7 / 7{,}68 \\times 10^6 \\approx 5$.
>
> Recall@10 với \`nprobe\` $= 5/c = 0{,}05\\%$ có thể chỉ ~70-80% → cần kết hợp PQ để tăng \`nprobe\` lên 30-50.
> </details>

> 📝 **Tóm tắt mục 3**
> - IVF: k-means cluster + chỉ search trong \`nprobe\` cluster gần nhất.
> - $c \\approx \\sqrt{N}$, \`nprobe\` là núm chỉnh recall/speed.
> - Speedup 10-100× tùy \`nprobe\`.
> - Production cần retrain centroid khi data đổi.

---

## 4. HNSW (Hierarchical Navigable Small World) — graph nhiều tầng

### 4.1 Ý tưởng

HNSW là cấu trúc dữ liệu **graph** trong đó mỗi điểm là 1 node. Có nhiều tầng:

- **Tầng cao** (top layer): rất ít node, mỗi node nối với vài node "xa" → như đường cao tốc.
- **Tầng thấp** (layer 0): toàn bộ node, mỗi node nối với $M$ neighbor gần → đường nội đô.

Số tầng quyết định **stochastically** khi insert: mỗi điểm rơi vào tầng tối đa $l = \\lfloor -\\ln(\\text{uniform}()) \\cdot m_L \\rfloor$, với $m_L$ là param. → Top layer rất thưa, bottom layer dày.

### 4.2 Search algorithm

\`\`\`
1. Bắt đầu từ entry point ở tầng cao nhất.
2. Greedy search ở tầng đó: di chuyển sang neighbor gần q hơn, cho tới khi không có neighbor nào gần hơn.
3. Dùng node tìm được làm entry point cho tầng thấp hơn.
4. Lặp lại tới layer 0.
5. Ở layer 0, mở rộng search với "ef" candidate, trả về top-k.
\`\`\`

> 💡 **Trực giác / Hình dung**
>
> Bạn đang ở Hà Nội, muốn tới một căn hộ ở TP.HCM. Cao tốc đưa bạn từ Hà Nội tới Sài Gòn (vài "hop"), rồi đường lớn nội thành (vài hop nữa), rồi đường nhỏ tới đúng số nhà. HNSW làm **đúng như vậy** với vector space.

### 4.3 Walk-through bằng số

Giả sử HNSW với \`M = 16\`, 4 tầng. Để tìm 1 trong $N = 10^9$ node:

- Tầng 3 (top): ~100 node. Greedy chỉ vài hop.
- Tầng 2: ~$10^4$ node. Greedy vài chục hop.
- Tầng 1: ~$10^6$ node. ~100 hop.
- Tầng 0: ~$10^9$ node. Mở \`ef = 50\` candidate.

Tổng số distance computation: ~vài trăm — so với $10^9$ brute force = **speedup $10^6\\times$**.

### 4.4 Trade-off

| Param | Ý nghĩa | Tăng → |
|-------|---------|--------|
| \`M\` | Số neighbor mỗi node ở layer 0 | Recall ↑, memory ↑, build time ↑ |
| \`efConstruction\` | Số candidate khi insert | Build chất lượng cao hơn nhưng chậm |
| \`efSearch\` | Số candidate khi query | Recall ↑, latency ↑ |

**Quy tắc thực dụng**:
- \`M = 16-48\` (default 16 đủ cho hầu hết case).
- \`efConstruction = 200\`.
- \`efSearch\` chỉnh runtime để đạt recall mục tiêu.

> ❓ **Câu hỏi tự nhiên của người đọc**
>
> *"Build HNSW có đắt không?"* — Có. Build $N = 10^8$ mất hàng giờ trên CPU. Nhưng chỉ build 1 lần (hoặc incremental insert sau đó). Đổi lại query cực nhanh.
>
> *"HNSW có hỗ trợ delete không?"* — Khó. Hầu hết implement hiện tại chỉ "soft delete" (đánh dấu node là tombstone). Periodic rebuild để dọn.
>
> *"Memory tốn bao nhiêu?"* — Mỗi node lưu \`M\` $\\times 4$ byte cho ID neighbor + vector gốc. Với \`M = 16\`, $d = 768$, $N = 10^8$: vector chiếm $10^8 \\times 768 \\times 4 = 307$ GB, graph thêm $10^8 \\times 16 \\times 4 = 6{,}4$ GB. Graph là phần phụ nhỏ. → Cần kết hợp PQ để giảm vector.

### 4.5 Toy example: cảnh báo

Sơ đồ tầng trong sách giáo khoa thường vẽ 3-4 node mỗi tầng cho đẹp. **Thực tế** layer 0 có toàn bộ $N$ node, các tầng trên thưa dần theo cấp số nhân — không phải "đều" như tranh minh họa.

> ⚠ **Lỗi thường gặp**
>
> - **\`efSearch\` quá thấp**: query nhanh nhưng miss top-k thực sự. Chỉnh \`efSearch\` $\\geq k \\times 2$ ít nhất.
> - **Để nguyên default cho high-dim**: với $d = 1024$ hoặc cao hơn, \`M\` cần lớn hơn (32-64) để bù "curse of dimensionality" làm graph dễ trapping ở local minima.

> 🔁 **Dừng lại tự kiểm tra**
>
> Vì sao "greedy" trong HNSW vẫn cho recall cao dù không guarantee optimal?
>
> <details><summary>Đáp án</summary>
>
> Greedy trên 1 tầng dễ bị mắc kẹt ở local minimum. Nhưng vì có nhiều tầng:
> 1. Tầng cao có ít node và edge dài → "thoát" được khu vực sai sớm.
> 2. Khi xuống tầng thấp, đã ở "đúng khu vực" rồi → local search trong khu vực đó hầu như là exact.
> 3. \`efSearch > 1\` mở rộng beam search ở layer 0, bù thêm cho rủi ro local min.
>
> Empirical: HNSW đạt recall 99% với latency mili-giây trên $N = 10^8$.
> </details>

> 📝 **Tóm tắt mục 4**
> - HNSW = multi-layer graph, search top-down từ thô đến mịn.
> - Param: \`M\` (degree), \`efConstruction\` (build quality), \`efSearch\` (query recall).
> - Latency log-like theo $N$, recall thường 95-99%.
> - Memory cao (vector gốc), nên kết hợp PQ trong production.

---

## 5. Product Quantization (PQ) — nén vector xuống vài byte

### 5.1 Ý tưởng

Vector $v \\in \\mathbb{R}^{768}$ chiếm $768 \\times 4 = 3072$ byte (float32). Quá tốn.

PQ chia vector thành $m$ **sub-vector**, mỗi sub-vector chiều $d/m$. Với mỗi sub-vector, train **k-means với 256 centroid** (vừa khít 1 byte). Lưu vector gốc bằng $m$ byte (mỗi byte = ID của centroid gần nhất trong sub-codebook tương ứng).

### 5.2 Walk-through bằng số

$d = 768$, $m = 8$ → mỗi sub-vector có chiều $768/8 = 96$.

Bước **build codebook** (offline):

1. Chia tất cả vectors thành $m = 8$ cột (mỗi cột là sub-vector chiều 96).
2. Mỗi cột, chạy k-means với $k = 256$ → ra **codebook $C_j \\in \\mathbb{R}^{256 \\times 96}$**.

Bước **encode** một vector $v$:

1. Chia $v$ thành $[v^{(1)}, v^{(2)}, \\ldots, v^{(8)}]$, mỗi $v^{(j)} \\in \\mathbb{R}^{96}$.
2. Với mỗi $j$, tìm centroid gần nhất trong $C_j$ → được ID $i_j \\in \\{0, \\ldots, 255\\}$.
3. Lưu $v$ bằng **8 byte** $[i_1, i_2, \\ldots, i_8]$.

Compression ratio:

\`\`\`
Gốc: 768 × 4 = 3072 byte
PQ:  8 × 1   = 8 byte
Ratio: 3072 / 8 = 384×
\`\`\`

### 5.3 Search với PQ — Asymmetric Distance Computation (ADC)

Khi query $q \\in \\mathbb{R}^{768}$ đến, bạn KHÔNG quantize $q$. Thay vào đó:

1. Chia $q$ thành 8 sub-query $[q^{(1)}, \\ldots, q^{(8)}]$.
2. Với mỗi $j$, **precompute bảng $T_j \\in \\mathbb{R}^{256}$** trong đó $T_j[c] = \\|q^{(j)} - C_j[c]\\|^2$ cho $c = 0..255$.
3. Distance ước tính giữa $q$ và vector đã quantize $v = [i_1, \\ldots, i_8]$:
   \`\`\`
   d̂(q, v)² = Σⱼ Tⱼ[iⱼ]
   \`\`\`
   → Chỉ cần **8 lookups + 8 additions** mỗi vector. Cực nhanh.

> 💡 **Trực giác / Hình dung**
>
> Codebook = "bảng chữ cái". Mỗi sub-vector được "viết" bằng 1 ký tự (1 byte). Để so sánh query với 1 vector, không cần đọc 768 chiều — chỉ cần tra "ký tự nào gần ký tự nào" trong bảng đã pre-compute.

### 5.4 Sai số PQ

PQ là lossy: vector reconstruct từ codebook không đúng vector gốc. Sai số phụ thuộc:

- $m$ lớn → mỗi sub-codebook bao phủ ít chiều hơn → sai số nhỏ.
- Số centroid $k$ lớn hơn 256 (vd 4096 → 12 bit) → ít sai số nhưng tốn lookup memory.

Thực tế: PQ với $m = 8, k = 256$ thường đạt recall 90-95% so với exact.

### 5.5 Toy example: cảnh báo

Ví dụ chia 8D thành 2 nhóm 4D (như trong viz) chỉ để dễ hình dung. **Production** dùng $d = 768, m = 8\\text{-}64$. Càng nhiều sub-vector → càng ít sai số nhưng càng tốn memory cho codebook.

> ❓ **Câu hỏi tự nhiên của người đọc**
>
> *"PQ chỉ approximate distance — vector thật bị mất, đúng không?"* — Đúng. PQ không phục hồi được vector gốc. Nhưng cho ANN, chỉ cần ranking đúng đại khái, không cần khoảng cách chính xác.
>
> *"Có cách nào tốt hơn PQ không?"* — Có: **Optimized Product Quantization (OPQ)**: trước khi chia sub-vector, áp ma trận xoay (PCA-like) để mỗi sub-vector có variance đều nhau → giảm sai số ~30%. **Scalar Quantization (SQ)**: đơn giản hơn, chỉ quantize từng chiều thành int8. **Residual Quantization**: quantize residual của bước trước → recall cao hơn.

> ⚠ **Lỗi thường gặp**
>
> - **Quantize cả query**: nếu cũng quantize $q$ (Symmetric Distance), sai số gấp đôi. Luôn dùng **Asymmetric** (chỉ quantize database vector, giữ query nguyên).
> - **PQ riêng không đủ**: PQ chỉ nén — vẫn cần IVF/HNSW để skip phần lớn vector. \`IVFPQ\` (FAISS) là combo chuẩn cho dataset lớn.

> 🔁 **Dừng lại tự kiểm tra**
>
> Với $d = 1536$ (OpenAI \`text-embedding-3-small\`), chọn $m$ thế nào để mỗi vector chiếm 24 byte?
>
> <details><summary>Đáp án</summary>
>
> 24 byte = 24 sub-vector $\\times$ 1 byte/sub → $m = 24$. Mỗi sub-vector chiều $1536/24 = 64$. Compression $1536\\cdot 4 / 24 = 256\\times$.
> </details>

> 📝 **Tóm tắt mục 5**
> - PQ chia $d$ chiều thành $m$ nhóm, mỗi nhóm k-means 256 centroid → mỗi vector lưu bằng $m$ byte.
> - Compression 100-400× tùy $m$.
> - Search với ADC: precompute 8 bảng 256 entry, mỗi compare = 8 lookup + add.
> - Luôn kết hợp với IVF hoặc HNSW (FAISS: \`IVFPQ\`, \`HNSWPQ\`).

---

## 6. Vector Database stack hiện đại

### 6.1 So sánh ngắn

| DB | Loại | Index | Điểm mạnh | Điểm yếu |
|----|------|-------|-----------|----------|
| **Pinecone** | Managed cloud | Tự quản, dạng IVF + custom | Đơn giản, scale tự động, low-ops | Vendor lock-in, đắt với scale lớn |
| **Weaviate** | Self-host / cloud | HNSW + scalar/PQ | Schema-aware, GraphQL, modular vectorizer | Memory-heavy, complexity cao |
| **Qdrant** | Self-host / cloud | HNSW | Rust, hiệu năng cao, filter mạnh | Ecosystem còn trẻ hơn |
| **Milvus** | Self-host / cloud | IVF, HNSW, DiskANN | Scale cực lớn (10⁹+), nhiều index | Setup phức tạp, học hỏi nhiều |
| **ChromaDB** | Embedded | HNSW (hnswlib) | Đơn giản, Python-first, prototype nhanh | Không tốt cho production scale lớn |
| **pgvector** | Postgres extension | IVF, HNSW | Chạy trong Postgres có sẵn, ACID, SQL filter native | Hiệu năng kém các DB chuyên |
| **FAISS** | Library (in-process) | Tất cả index | Performance cao nhất, kiểm soát chi tiết | Không phải full DB (không CRUD, không network) |

### 6.2 Chọn cái nào?

**Quy tắc thực dụng**:

- **Prototype, < 1M vector**: ChromaDB hoặc FAISS in-memory.
- **Production, đã có Postgres**: pgvector. Không thêm component mới.
- **Production, scale 10⁷-10⁹, cần managed**: Pinecone (đơn giản nhất) hoặc Qdrant Cloud.
- **Self-host, scale lớn, team có DevOps**: Milvus hoặc Qdrant.
- **Cần schema phức tạp, multi-tenancy**: Weaviate.

> ⚠ **Lỗi thường gặp**
>
> - **Chọn Pinecone vì "trendy" cho dự án 10K vector**: SQLite + brute force đủ rồi. Không cần vector DB cho dataset nhỏ.
> - **Bỏ qua filter support**: nhiều use case cần "search trong document của user X" — không phải DB nào cũng làm tốt. Qdrant và Weaviate có filter trước/sau index linh hoạt; pgvector dùng SQL \`WHERE\` rất tự nhiên.

> 📝 **Tóm tắt mục 6**
> - Vector DB = engine có sẵn IVF/HNSW/PQ + CRUD + network API.
> - Chọn DB theo scale + ecosystem có sẵn, không theo "hype".

---

## 7. RAG — Retrieval-Augmented Generation (phần lớn)

### 7.1 Vì sao LLM cần RAG

Một LLM "trần" (vanilla, không retrieval) có 4 vấn đề:

1. **Knowledge cutoff**: GPT-4 chỉ biết tới tháng 4/2024. Hỏi sự kiện sau đó → bịa.
2. **Hallucination**: kể cả trong cutoff, LLM **chế** dữ liệu cụ thể (số liệu, tên người, link).
3. **Không truy cập private data**: kho tài liệu công ty bạn, email cá nhân, codebase nội bộ — LLM hoàn toàn không biết.
4. **Context dài đắt + bị "lost in the middle"**: nhồi cả triệu token vào prompt thì cũng đắt và LLM hay quên phần giữa.

**RAG giải quyết**: thay vì hỏi LLM "biết tuốt", **đưa cho LLM** đoạn văn bản liên quan + câu hỏi → LLM chỉ cần "đọc hiểu + tóm tắt" thay vì "nhớ + sinh".

> 💡 **Trực giác / Hình dung**
>
> LLM không có RAG = sinh viên thi vấn đáp, không được mở sách, phải nhớ hết. Hay bịa.
>
> LLM có RAG = sinh viên thi **mở sách**. Tìm trang phù hợp, đọc, trả lời. Sai ít hơn nhiều.

### 7.2 Pipeline 4 bước

\`\`\`
[INDEX TIME]
docs → chunks → embeddings → vector DB

[QUERY TIME]
user query
   │
   ▼
1. Embed query
   │
   ▼
2. Retrieve top-k chunks (vector DB search)
   │
   ▼
3. Augment: chèn chunks vào prompt template
   │
   ▼
4. Generate: LLM đọc prompt + sinh câu trả lời
   │
   ▼
final answer
\`\`\`

### 7.3 Walk-through một query cụ thể

**Knowledge base**: 5 chunk (đã embed sẵn lúc index, lưu trong DB):

| ID | Nội dung | Tag |
|----|----------|-----|
| C1 | "Lương trung bình kỹ sư phần mềm Việt Nam 2024 là 25 triệu/tháng (TopDev report)." | salary |
| C2 | "Kỹ sư AI/ML tại Việt Nam có mức lương trung bình 45 triệu/tháng, cao gấp 1.8 lần SE thường." | salary, AI |
| C3 | "Python là ngôn ngữ phổ biến nhất trong AI, theo Stack Overflow 2024." | Python, AI |
| C4 | "Hà Nội và TP.HCM là 2 thành phố có nhiều job AI nhất Việt Nam." | location, AI |
| C5 | "Cách nấu phở bò: hầm xương 8 tiếng, thêm gia vị quế hồi…" | food |

**Query**: \`"Lương kỹ sư AI tại Việt Nam 2024 là bao nhiêu?"\`

**Bước 1 — Embed query**: dùng cùng model embedding lúc index (vd \`text-embedding-3-small\`). Output: $q \\in \\mathbb{R}^{1536}$.

**Bước 2 — Retrieve top-3 bằng cosine similarity**:

Giả sử kết quả cosine (số fake để minh họa):

| Chunk | cos(q, chunk) |
|-------|---------------|
| C2 | 0.89 ← AI + lương + Việt Nam |
| C1 | 0.78 ← lương + Việt Nam |
| C4 | 0.66 ← AI + Việt Nam |
| C3 | 0.51 ← AI |
| C5 | 0.08 ← phở (không liên quan) |

→ Trả về \`[C2, C1, C4]\`.

**Bước 3 — Augment**: nhồi vào prompt template:

\`\`\`
Bạn là trợ lý hữu ích. Trả lời dựa trên CHỈ các đoạn văn bản dưới đây.
Nếu không có thông tin, nói "tôi không biết".

[Context]
[1] Kỹ sư AI/ML tại Việt Nam có mức lương trung bình 45 triệu/tháng, cao gấp 1.8 lần SE thường.
[2] Lương trung bình kỹ sư phần mềm Việt Nam 2024 là 25 triệu/tháng (TopDev report).
[3] Hà Nội và TP.HCM là 2 thành phố có nhiều job AI nhất Việt Nam.

[Câu hỏi]
Lương kỹ sư AI tại Việt Nam 2024 là bao nhiêu?
\`\`\`

**Bước 4 — Generate**: LLM (GPT-4, Claude, v.v.) đọc và trả:

> "Theo dữ liệu 2024, kỹ sư AI/ML tại Việt Nam có mức lương trung bình **45 triệu/tháng**, cao gấp khoảng 1.8 lần so với kỹ sư phần mềm thông thường (25 triệu)."

Lưu ý: câu trả lời **trích từ chunk** — không bịa số.

> ❓ **Câu hỏi tự nhiên của người đọc**
>
> *"Sao không gửi tất cả 5 chunk cho LLM?"* — Vì 5 OK, nhưng 10.000 chunk thì:
> - Tốn rất nhiều token (đắt).
> - LLM bị "lost in the middle" — chunks ở giữa hay bị bỏ qua.
> - Latency tăng.
>
> *"Nếu top-3 vô tình thiếu chunk quan trọng?"* — Đó là failure mode chính của RAG. Khắc phục: chunking tốt hơn, dùng reranker, dùng hybrid search (vector + keyword BM25), tăng \`k\` rồi rerank.
>
> *"Embedding query và embedding document phải cùng model không?"* — **PHẢI**. Khác model = khác không gian = cosine vô nghĩa. Đây là lỗi cực phổ biến khi swap model.

> 📝 **Tóm tắt mục 7**
> - 4 vấn đề LLM thuần: cutoff, hallucination, no private data, context dài đắt.
> - RAG = retrieve → augment → generate. Convert "nhớ" thành "đọc hiểu".
> - Walk-through: embed query → top-k cosine → nhồi vào prompt → LLM trả lời từ context.
> - Embed model phải đồng bộ giữa index time và query time.

---

## 8. Chunking strategies

Đặc trưng cốt lõi của RAG: **chunk tốt = retrieve tốt**. Chunk = tử cấu (unit) bạn embed và lưu vào DB.

### 8.1 Fixed-size chunking

- Chia document thành đoạn **fixed N token** (vd 512 token), overlap $O$ token (vd 64).
- Đơn giản, predictable.
- **Nhược**: chunks có thể cắt giữa câu, mất context.

### 8.2 Semantic chunking

- Tính embedding của từng câu, chia khi 2 câu liền kề có cosine < threshold (vd 0.5).
- Mỗi chunk có ý nghĩa "liền mạch".
- **Nhược**: chunk size không đều, embedding cost tăng.

### 8.3 Hierarchical chunking

- Tạo nhiều level chunk: small chunks (512 token) → medium (2048) → document level.
- Retrieve ở small chunk để precision, nhưng context gửi cho LLM là medium/large.
- **Nhược**: phức tạp, cần lưu nhiều index.

### 8.4 Walk-through

Document gốc (500 từ về Python):
> "Python là ngôn ngữ lập trình bậc cao... [25 câu]"

**Fixed-size, N = 100 token, overlap 20**:
- Chunk 1: token 0-100
- Chunk 2: token 80-180
- Chunk 3: token 160-260
- … (overlap để tránh cắt ngang ý)

**Semantic**: tính cosine giữa các câu, tách khi cosine < 0.6:
- Chunk 1: câu 1-5 (đoạn về định nghĩa Python)
- Chunk 2: câu 6-10 (đoạn về cú pháp)
- …

> ⚠ **Lỗi thường gặp**
>
> - **Chunk quá nhỏ (50 token)**: mất context, mỗi chunk không đủ ý.
> - **Chunk quá lớn (5000 token)**: embedding bị "trung bình hóa", retrieval không trỏ chính xác.
> - **Sweet spot phổ biến**: 256-1024 token với overlap 10-20%.

> 📝 **Tóm tắt mục 8**
> - 3 chiến lược: fixed-size (đơn giản), semantic (chất lượng), hierarchical (cả 2 thế giới).
> - Chunk size 256-1024 token là sweet spot phổ biến.
> - Overlap 10-20% giảm rủi ro cắt ngang ý.

---

## 9. Reranking — tinh chỉnh top-k

### 9.1 Vấn đề của vector search "raw"

Vector search trả top-k theo cosine, nhưng:

- Cosine giữa embedding của câu hỏi và đoạn văn không **luôn** phản ánh đúng "đoạn này trả lời câu này".
- Có những chunk **gần nhưng không relevant** (vd "Python con vật" lọt vào query "Python lập trình").

### 9.2 Cross-encoder reranker

Cách hoạt động:

- Embedding model (bi-encoder) encode **độc lập** query và doc → so cosine. Nhanh nhưng mất signal interaction.
- Cross-encoder nhận **cả query lẫn doc cùng lúc** vào model (vd \`cross-encoder/ms-marco-MiniLM-L-6-v2\`), output 1 số \`score\`. Chậm hơn ~100× nhưng chính xác hơn nhiều.

**Pipeline 2 stage**:
1. Vector search → top-100 chunks (nhanh, recall cao, precision thấp).
2. Reranker score 100 chunks → top-10 (chậm hơn nhưng chỉ 100 chunks, vẫn nhanh).

### 9.3 Walk-through

Query: \`"Cách reset password trên Slack?"\`

**Top-5 sau bi-encoder cosine**:
| Chunk | cos | Nội dung |
|-------|-----|----------|
| C1 | 0.81 | "Slack có nhiều cách đổi mật khẩu Wi-Fi văn phòng" |
| C2 | 0.79 | "Reset password Slack: click 'Forgot password'..." |
| C3 | 0.76 | "Password trên Slack được mã hóa bằng bcrypt" |
| C4 | 0.72 | "Slack workspace admin có thể reset password user" |
| C5 | 0.70 | "Đăng nhập Slack lần đầu cần xác thực email" |

**Sau cross-encoder rerank**:
| Chunk | rerank score |
|-------|--------------|
| C2 | 9.2 ← Đúng câu trả lời |
| C4 | 8.5 ← Cũng relevant |
| C5 | 5.1 |
| C3 | 3.8 ← Liên quan password nhưng không "cách reset" |
| C1 | 1.2 ← Wi-Fi password, không phải Slack login |

→ Reranker đẩy C2, C4 lên top — đúng intent của user.

> 📝 **Tóm tắt mục 9**
> - Bi-encoder (embedding) nhanh nhưng ít signal interaction.
> - Cross-encoder rerank top-k để tăng precision.
> - Pipeline 2 stage: retrieve nhiều (top-100) → rerank ít (top-10) là chuẩn industry.

---

## 10. Evaluation — đánh giá RAG/retrieval

### 10.1 Metrics phổ biến

Cho $N$ query, mỗi query có **ground truth** là tập documents đúng $G_i$ và hệ thống trả top-k $R_i$.

| Metric | Công thức | Ý nghĩa |
|--------|-----------|---------|
| **Precision@k** | $\\lvert R_i \\cap G_i \\rvert / k$ | Trong k trả về, bao nhiêu đúng |
| **Recall@k** | $\\lvert R_i \\cap G_i \\rvert / \\lvert G_i \\rvert$ | Trong tất cả đúng, bao nhiêu trả về được |
| **MRR (Mean Reciprocal Rank)** | $(1/N) \\sum 1/\\text{rank}_i$ (rank của doc đúng đầu tiên) | Doc đúng đầu tiên ở vị trí nào |
| **NDCG@k** | Normalized Discounted Cumulative Gain | Có cân nhắc vị trí (đúng ở rank 1 > rank 10) |

### 10.2 Walk-through

3 query, ground truth tương ứng:

| Query | Ground truth | Top-5 trả về | P@5 | R@5 | RR |
|-------|--------------|--------------|-----|-----|----|
| Q1 | {D2, D7} | [D2, D3, D7, D9, D1] | 2/5=0.4 | 2/2=1.0 | 1/1=1.0 |
| Q2 | {D4} | [D1, D4, D6, D8, D9] | 1/5=0.2 | 1/1=1.0 | 1/2=0.5 |
| Q3 | {D3, D5} | [D1, D2, D6, D7, D8] | 0/5=0 | 0/2=0 | 0 |

- **P@5 trung bình** = (0.4 + 0.2 + 0) / 3 ≈ 0.2.
- **R@5 trung bình** = (1.0 + 1.0 + 0) / 3 ≈ 0.67.
- **MRR** = (1.0 + 0.5 + 0) / 3 ≈ 0.5.

### 10.3 RAG end-to-end metrics

Ngoài retrieval, RAG còn cần đánh giá câu trả lời cuối:

- **Faithfulness**: câu trả lời có "fact" trong context không (không bịa).
- **Answer relevance**: câu trả lời có đúng câu hỏi không.
- **Context relevance**: chunks lấy ra có liên quan câu hỏi không.

Frameworks phổ biến: **RAGAS**, **TruLens**, **LangSmith** — dùng LLM-as-judge.

> 📝 **Tóm tắt mục 10**
> - Precision@k, Recall@k, MRR, NDCG cho retrieval-only.
> - Faithfulness + Answer relevance + Context relevance cho RAG end-to-end.
> - LLM-as-judge (RAGAS) là tiêu chuẩn hiện tại.

---

## 11. Lỗi thường gặp khi triển khai RAG

### 11.1 Bad chunking

- **Triệu chứng**: retriever trả về chunk có "keyword đúng" nhưng cắt ngang ý → LLM không hiểu.
- **Khắc phục**: tăng chunk size, dùng overlap, thử semantic chunking.

### 11.2 Embedding mismatch

- **Triệu chứng**: đổi model embedding (vd từ \`text-embedding-ada-002\` sang \`text-embedding-3-small\`) ở query time mà KHÔNG re-embed toàn bộ documents → cosine vô nghĩa, recall sụp đổ.
- **Khắc phục**: lock model embedding, re-index khi đổi.

### 11.3 Stale index

- **Triệu chứng**: documents mới thêm vào không xuất hiện trong retrieval.
- **Khắc phục**: incremental indexing, scheduled reindex, monitoring.

### 11.4 Domain mismatch

- **Triệu chứng**: dùng embedding general (Wikipedia-trained) để search trên medical/legal docs → retrieval kém.
- **Khắc phục**: fine-tune embedding trên domain, hoặc dùng domain-specific model (vd \`BioBERT\`, \`LegalBERT\`).

### 11.5 Symmetric vs asymmetric search

- **Triệu chứng**: query ngắn (vài từ) vs document dài (vài trăm từ), embedding model không asymmetric → cosine nhỏ dù relevant.
- **Khắc phục**: dùng model dual-encoder asymmetric (vd \`multi-qa-mpnet-base-dot-v1\`).

### 11.6 Top-k quá thấp

- **Triệu chứng**: missed retrieval — chunk đúng có rank 15 nhưng \`k = 5\`.
- **Khắc phục**: tăng \`k\`, dùng reranker để cắt lại từ pool lớn hơn.

> ⚠ **Lỗi thường gặp tổng kết**
>
> RAG dễ build prototype (100 dòng code), nhưng khó tốt. **80% chất lượng RAG đến từ chunking, embedding model, và reranker** — không phải từ LLM hay vector DB.

> 📝 **Tóm tắt mục 11**
> - Bad chunking, embedding mismatch, stale index, domain mismatch là top 4 lỗi.
> - Luôn re-embed toàn bộ khi đổi model.
> - Đầu tư vào retrieval pipeline, không chỉ LLM.

---

## 12. Bài tập

### Bài 1 — Tính speedup của IVF

Cho dataset $N = 10^7$, $d = 512$. Cài đặt IVF với $c = 2000$, \`nprobe = 20\`. Tính:
1. Số FLOP brute force.
2. Số FLOP IVF.
3. Speedup.

### Bài 2 — Memory của PQ

Một dataset có 100 triệu vector chiều 1024. So sánh memory:
1. Lưu nguyên float32.
2. Lưu PQ với $m = 16, k = 256$.
3. Lưu PQ với $m = 32, k = 256$.

### Bài 3 — Thiết kế chunking

Bạn có 10.000 docs PDF khoa học, mỗi PDF ~50 trang. User hỏi câu hỏi cụ thể về formula/định lý trong paper. Đề xuất chunking strategy + chunk size + overlap, giải thích vì sao.

### Bài 4 — Trace RAG

Cho knowledge base 4 chunks (giả định cosine với query):

| Chunk | cos(q, chunk) | Nội dung |
|-------|---------------|----------|
| A | 0.92 | "Mục tiêu sản phẩm Q1 là tăng DAU 30%" |
| B | 0.85 | "Q1 roadmap focus on retention" |
| C | 0.78 | "Q1 không có sự kiện marketing lớn" |
| D | 0.60 | "Recipe nấu phở" |

Query: \`"Sản phẩm chúng ta hướng tới gì trong Q1?"\`. Với $k = 3$:
1. Top-k là gì?
2. Viết augmented prompt.
3. Câu trả lời mong đợi từ LLM?

### Bài 5 — Reranker pipeline

Bạn có vector DB 1M chunks. Latency budget 200ms. Bi-encoder mất 30ms cho top-100. Cross-encoder mất 5ms/pair. Bạn nên rerank bao nhiêu pair?

### Bài 6 — Evaluation

Cho 5 query với ground truth và top-5 trả về:

| Q | Ground truth | Top-5 |
|---|--------------|-------|
| 1 | {D1, D3} | [D1, D2, D3, D4, D5] |
| 2 | {D5} | [D2, D5, D7, D8, D9] |
| 3 | {D2, D4, D6} | [D2, D4, D9, D10, D11] |
| 4 | {D8} | [D1, D2, D3, D4, D5] |
| 5 | {D9, D10} | [D9, D7, D8, D10, D11] |

Tính P@5 trung bình, R@5 trung bình, MRR.

---

## 13. Lời giải chi tiết

### Lời giải Bài 1

**Brute force**:
- Mỗi compare: $d$ phép nhân + $d-1$ phép cộng $\\approx 2d$ FLOP. Lấy $2d = 1024$ FLOP/compare.
- Tổng: $N \\times 2d = 10^7 \\times 1024 \\approx 1{,}024 \\times 10^{10}$ FLOP.

**IVF**:
- So với centroid: $c \\times 2d = 2000 \\times 1024 = 2{,}048 \\times 10^6$ FLOP.
- Probe: $\\text{nprobe} \\times (N/c) \\times 2d = 20 \\times (10^7/2000) \\times 1024 = 20 \\times 5000 \\times 1024 \\approx 1{,}024 \\times 10^8$ FLOP.
- Tổng: $2{,}048 \\times 10^6 + 1{,}024 \\times 10^8 \\approx 1{,}044 \\times 10^8$ FLOP.

**Speedup**: $1{,}024 \\times 10^{10} / 1{,}044 \\times 10^8 \\approx 98\\times$.

### Lời giải Bài 2

**Float32**:
- $100.000.000 \\times 1024 \\times 4$ byte $= 4{,}096 \\times 10^{11}$ byte $\\approx 410$ GB.

**PQ với m=16**:
- Mỗi vector lưu bằng $m = 16$ byte.
- Tổng: $10^8 \\times 16 = 1{,}6 \\times 10^9$ byte $\\approx 1{,}6$ GB.
- Codebook (negligible): $16 \\times 256 \\times (1024/16) \\times 4 = 16 \\times 256 \\times 64 \\times 4 \\approx 1$ MB.
- **Compression 256×**.

**PQ với m=32**:
- $10^8 \\times 32 = 3{,}2 \\times 10^9$ byte $\\approx 3{,}2$ GB.
- **Compression 128×**, nhưng recall cao hơn vì mỗi sub-vector chỉ 32 chiều.

**Quan sát**: tăng $m$ → bớt compression nhưng recall cao hơn. Cần đo trên data thật để cân.

### Lời giải Bài 3

**Đề xuất**: hierarchical chunking.

- **Level 1 (small)**: 256 token, overlap 32 token. Để precision cao khi user hỏi cụ thể về formula/định lý.
- **Level 2 (medium)**: 1024 token. Khi cần context xung quanh formula (vd "định lý này dùng ở đâu trong paper").
- **Metadata**: lưu thêm section heading, equation ID, page number. Khi retrieve có thể boost score nếu match section "Theorems".

**Vì sao**:
- PDF khoa học có cấu trúc rõ (abstract, theorem, proof). Fixed-size dễ cắt ngang công thức → mất ý nghĩa.
- Hierarchical cho phép retrieve precise (small) nhưng gửi context lớn cho LLM (medium).

### Lời giải Bài 4

**1. Top-3 theo cosine**: [A, B, C].

**2. Augmented prompt**:
\`\`\`
Trả lời chỉ dựa trên context:
[1] Mục tiêu sản phẩm Q1 là tăng DAU 30%
[2] Q1 roadmap focus on retention
[3] Q1 không có sự kiện marketing lớn

Câu hỏi: Sản phẩm chúng ta hướng tới gì trong Q1?
\`\`\`

**3. Câu trả lời mong đợi**:
> "Trong Q1, sản phẩm hướng tới **tăng DAU 30%**, với focus chính là **retention**. Q1 không có sự kiện marketing lớn được lên kế hoạch."

### Lời giải Bài 5

Budget: 200ms - 30ms (bi-encoder) = 170ms cho rerank.

$170\\text{ms} / 5\\text{ms per pair} = 34$ pair.

→ Rerank **top-34** từ pool 100. Nếu cần buffer (network, prompt assembly) thì hạ xuống top-25 cho an toàn.

### Lời giải Bài 6

**Bảng tính từng query**:

| Q | $\\lvert R \\cap G \\rvert$ | k | P@5 | R@5 | rank doc đúng đầu | RR |
|---|----------|---|-----|-----|-------------------|----|
| 1 | {D1,D3} = 2 | 5 | 2/5=0.4 | 2/2=1.0 | D1 rank 1 | 1/1=1.0 |
| 2 | {D5} = 1 | 5 | 1/5=0.2 | 1/1=1.0 | D5 rank 2 | 1/2=0.5 |
| 3 | {D2,D4} = 2 | 5 | 2/5=0.4 | 2/3≈0.67 | D2 rank 1 | 1.0 |
| 4 | {} = 0 | 5 | 0 | 0 | không có | 0 |
| 5 | {D9,D10} = 2 | 5 | 2/5=0.4 | 2/2=1.0 | D9 rank 1 | 1.0 |

- **P@5** trung bình = (0.4 + 0.2 + 0.4 + 0 + 0.4) / 5 = **0.28**.
- **R@5** trung bình = (1.0 + 1.0 + 0.67 + 0 + 1.0) / 5 = **0.73**.
- **MRR** = (1.0 + 0.5 + 1.0 + 0 + 1.0) / 5 = **0.70**.

Diễn giải: recall cao (0.73) nhưng precision thấp (0.28) — đặc trưng của top-k với k tương đối lớn so với ground truth size. Q4 là failure case hoàn toàn.

---

## Tham khảo & bài tiếp theo

- [Lesson 06 — Word & Sentence Embedding](../lesson-06-word-embeddings/) (tiền đề).
- [Lesson 08 — CLIP Multimodal](../lesson-08-clip-multimodal/) (kế tiếp): áp dụng embedding cho ảnh + text cùng không gian.
- Bài đọc gợi ý:
  - FAISS paper (Johnson et al., 2017): "Billion-scale similarity search with GPUs".
  - HNSW paper (Malkov & Yashunin, 2016).
  - "Lost in the Middle" (Liu et al., 2023): vấn đề LLM bỏ qua context giữa.
  - RAGAS framework: <https://github.com/explodinggradients/ragas>.
- File minh họa trực quan: [visualization.html](./visualization.html) — 4 component: brute force vs IVF, HNSW search, PQ compression, RAG pipeline demo.
`;
