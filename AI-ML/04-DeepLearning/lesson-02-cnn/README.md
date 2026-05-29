# Lesson T4-L02 — CNN (Convolutional Neural Network)

> "Mạng nơ-ron thông thường (MLP) không biết ảnh là ảnh — nó nhìn 224×224×3 = 150.528 số độc lập, không hiểu pixel gần nhau có liên quan. CNN đặt ra ba ràng buộc: **cục bộ** (local connectivity), **chia sẻ trọng số** (weight sharing), **bất biến tịnh tiến** (translation invariance) — và ba ràng buộc đó chính là lý do model hàng tỉ tham số vẫn học được chỉ từ vài triệu ảnh."

## Mục tiêu học tập

Sau bài này bạn sẽ:

1. Tính **output size** của convolution layer cho bất kỳ W, F, P, S nào — không nhớ công thức máy móc mà hiểu được tại sao công thức đó đúng.
2. Thực hiện **walk-through tay** convolution 5×5 input × 3×3 Sobel filter → 3×3 output, từng bước tích chập.
3. Giải thích **receptive field**: một output pixel ở layer-3 nhìn được bao nhiêu pixel gốc? Tại sao deep network có receptive field lớn hơn wide network?
4. So sánh **max pooling vs average pooling** bằng ví dụ số cụ thể; biết khi nào dùng cái nào.
5. Đọc hiểu và phân biệt **LeNet-5, AlexNet, VGG, ResNet** — chỉ ra điểm khác biệt quyết định của từng architecture.
6. Giải thích **skip connection** của ResNet — tại sao `y = F(x) + x` cứu được việc train 152 layer khi không có skip thì gradient tắt dần.

## Kiến thức tiền đề

- [T4-L01 — Neural network](../lesson-01-neural-network/): forward/backprop, ReLU, softmax, cross-entropy loss. CNN chỉ thay đổi cấu trúc layer — cơ chế train hoàn toàn giống.
- [Tầng 4 — Ma trận](../../04-LinearAlgebra/lesson-05-matrices/): dot product, nhân ma trận. Convolution là dot product lặp đi lặp lại.
- [Tầng 2 — Signal / Image basics](../../02-Statistics/): không bắt buộc nhưng hữu ích để hiểu "Sobel filter phát hiện cạnh" có nghĩa gì vật lý.

---

## 1. Vì sao MLP thất bại với ảnh?

### 1.1. Bài toán: nhận diện chữ số MNIST

Ảnh MNIST: 28×28 pixel, grayscale → 784 input neuron. MLP 784→128→10 có:
- `784 × 128 = 100.352` tham số tầng 1.
- `128 × 10 = 1.280` tham số tầng 2.
- Tổng: ~101.632 tham số.

Với ảnh 224×224 RGB (ImageNet):
- Tầng đầu tiên: `150.528 × 4.096 = 616.562.688` tham số chỉ riêng **một layer**.

> **💡 Trực giác**
> Hãy tưởng tượng bạn đang học nhận dạng mèo. MLP yêu cầu bạn ghi nhớ: "mèo có tai ở **đúng tọa độ pixel (45, 32)**". Nếu mèo dịch sang trái 5 pixel → fail. Còn CNN học "ở đâu đó trong ảnh có hình tam giác nhỏ nhọn chỉa lên" — không quan tâm tọa độ cụ thể.

### 1.2. Ba vấn đề của MLP với ảnh

| Vấn đề | Biểu hiện | Giải pháp CNN |
|--------|-----------|---------------|
| **Quá nhiều tham số** | 150K pixel → 616M params/layer | Weight sharing: 1 filter dùng ở mọi vị trí |
| **Không khai thác locality** | Pixel (0,0) và (223,223) cùng trọng số với pixel (100,100) | Local receptive field: mỗi neuron nhìn F×F pixel |
| **Không bất biến tịnh tiến** | Dịch vật thể 1px → hoàn toàn khác | Pooling: tóm tắt vùng → bất biến nhỏ |

---

## 2. Convolution Layer

### 2.1. Cơ chế: kernel trượt trên input

**Thiết lập**:
- Input: W × W × C (chiều rộng/cao × channels)
- Kernel (filter): F × F × C (cùng depth với input channels)
- Padding: P pixels (thêm 0 xung quanh)
- Stride: S (bước nhảy)

**Tính output size**:
```
output = floor((W − F + 2P) / S) + 1
```

> **💡 Tại sao công thức này đúng?**
> Filter bắt đầu ở pixel 0, dịch S bước mỗi lần. Vị trí cuối cùng filter có thể đặt là `W + 2P − F` (còn đủ F pixels). Số vị trí = `floor((W + 2P − F) / S) + 1` (cộng 1 cho vị trí đầu tiên).

**4 ví dụ tính cụ thể**:

| W | F | P | S | Output |
|---|---|---|---|--------|
| 28 | 5 | 0 | 1 | (28−5+0)/1+1 = **24** |
| 28 | 5 | 2 | 1 | (28−5+4)/1+1 = **28** (same padding!) |
| 224 | 11 | 0 | 4 | (224−11+0)/4+1 = **54** (AlexNet conv1) |
| 32 | 3 | 1 | 1 | (32−3+2)/1+1 = **32** (VGG 3×3 same) |

> **⚠ Lỗi thường gặp #1**
> Quên rằng công thức tính **theo 1 chiều** (W hoặc H). Nếu input hình chữ nhật W₁×W₂, tính 2 lần riêng. Output shape: `[(W₁−F+2P)/S+1] × [(W₂−F+2P)/S+1]`.

> **⚠ Lỗi thường gặp #2**
> Kernel **có depth bằng input channels** (C). Một kernel 3×3 trên ảnh RGB thực ra là 3×3×3 = 27 số. Output của 1 kernel là **1 channel feature map** (2D scalar).

### 2.2. Walk-through tay: 5×5 input × 3×3 Sobel filter

**Input (5×5, grayscale)**:
```
1  1  1  0  0
1  1  1  0  0
1  1  1  0  0
1  1  1  0  0
1  1  1  0  0
```

**Sobel-X filter (3×3)** — phát hiện cạnh dọc:
```
-1  0  +1
-2  0  +2
-1  0  +1
```

Output size: (5−3+0)/1+1 = **3×3** (no padding, stride 1).

**Tính từng ô**:

Output[0,0] — kernel đặt ở góc trên trái, phủ input rows 0-2, cols 0-2:
```
(-1)×1 + 0×1 + (+1)×1
(-2)×1 + 0×1 + (+2)×1
(-1)×1 + 0×1 + (+1)×1
= (-1+1) + (-2+2) + (-1+1) = 0
```

Output[0,1] — kernel dịch 1 cột phải, phủ cols 1-3:
```
(-1)×1 + 0×1 + (+1)×0
(-2)×1 + 0×1 + (+2)×0
(-1)×1 + 0×1 + (+1)×0
= (-1+0) + (-2+0) + (-1+0) = -4
```

Output[0,2] — kernel dịch 2 cột phải, phủ cols 2-4:
```
(-1)×1 + 0×0 + (+1)×0
(-2)×1 + 0×0 + (+2)×0
(-1)×1 + 0×0 + (+1)×0
= -1 + (-2) + (-1) = -4
```

Vì ảnh đối xứng theo hàng, 3 hàng output giống nhau:

```
Output =
 0  -4  -4
 0  -4  -4
 0  -4  -4
```

> **💡 Ý nghĩa vật lý**
> Sobel-X phát hiện cạnh thẳng đứng (gradient theo hướng x). Giá trị -4 mạnh tại cột 1-2 của output chính là **cạnh dọc** ở biên giữa cột 2 và cột 3 của input (chuyển từ 1→0). Giá trị 0 ở cột 0 vì vùng đó đồng màu.

### 2.3. Số tham số trong conv layer

Conv layer với:
- K kernels, mỗi kernel F×F×C
- Mỗi kernel có 1 bias

Tổng tham số = **K × (F² × C + 1)**

Ví dụ: AlexNet conv1: 96 kernels 11×11×3 → `96 × (121 × 3 + 1) = 96 × 364 = 34.944` tham số — trong khi MLP tương đương cần 616M.

> **🔁 Dừng lại tự kiểm tra**
> Conv layer: F=3, C=64 input channels, K=128 output channels, bias. Bao nhiêu tham số?
> <details><summary>Đáp án</summary>
> K × (F² × C + 1) = 128 × (9 × 64 + 1) = 128 × 577 = **73.856 tham số**.
> </details>

---

## 3. Pooling

### 3.1. Max Pooling vs Average Pooling

**Ví dụ tính tay**: 4×4 input, 2×2 pool, stride 2

Input:
```
 1   3   2   4
 5   6   1   2
 3   1   4   3
 2   4   3   1
```

**Max Pooling 2×2, stride 2 → 2×2 output**:
- [0:2, 0:2] = max(1,3,5,6) = **6**
- [0:2, 2:4] = max(2,4,1,2) = **4**
- [2:4, 0:2] = max(3,1,2,4) = **4**
- [2:4, 2:4] = max(4,3,3,1) = **4**

Max pool output:
```
6  4
4  4
```

**Average Pooling 2×2, stride 2 → 2×2 output**:
- [0:2, 0:2] = (1+3+5+6)/4 = **3.75**
- [0:2, 2:4] = (2+4+1+2)/4 = **2.25**
- [2:4, 0:2] = (3+1+2+4)/4 = **2.50**
- [2:4, 2:4] = (4+3+3+1)/4 = **2.75**

Avg pool output:
```
3.75  2.25
2.50  2.75
```

> **💡 Khi nào dùng cái nào?**
> - **Max pooling**: dùng phổ biến hơn cho classification. "Có xuất hiện feature này không?" — lấy max là đủ.
> - **Average pooling**: dùng ở cuối mạng (Global Average Pooling) thay FC layer. ResNet, MobileNet dùng GAP trước classifier.

### 3.2. Receptive Field

**Receptive field** = vùng input ảnh hưởng tới 1 neuron tại layer hiện tại.

Công thức đệ quy: `RF_k = RF_{k-1} + (F_k − 1) × Π_{i=1}^{k-1} S_i`

**Ví dụ tính với VGG-style (chỉ conv 3×3, stride 1)**:

| Layer | Filter | RF tích lũy |
|-------|--------|-------------|
| Conv1 | 3×3 | 3×3 |
| Conv2 | 3×3 | 5×5 |
| Conv3 | 3×3 | 7×7 |
| MaxPool 2×2 stride 2 | — | nhân 2 → 14×14 |
| Conv4 | 3×3 | 16×16 |
| Conv5 | 3×3 | 18×18 |

> **💡 Trực giác sâu**
> 2 conv 3×3 liên tiếp = receptive field 5×5 nhưng chỉ `2 × (9C²)` tham số thay vì `25C²` của 1 conv 5×5 — rẻ hơn, phi tuyến hơn (2 ReLU thay 1). Đây là lý do VGG dùng toàn 3×3.

---

## 4. Classic Architectures

### 4.1. LeNet-5 (LeCun, 1998) — ông tổ CNN

**Kiến trúc**: Input 32×32 → Conv1(6@5×5) → AvgPool → Conv2(16@5×5) → AvgPool → FC120 → FC84 → Output10

**Ý nghĩa lịch sử**: Chứng minh CNN hoạt động trên MNIST (99.3% accuracy). Nhưng tốc độ quá chậm để scale lên ảnh lớn hơn bằng phần cứng thời đó.

Tổng tham số: ~60K. Activation: tanh (trước thời sigmoid-softmax-ReLU phổ biến).

### 4.2. AlexNet (Krizhevsky, 2012) — cú breakthrough GPU

**Kiến trúc**: 5 conv + 3 FC. Đầu vào 224×224×3. Dùng 2 GPU chạy song song.

**Điểm đột phá**:
1. **ReLU** thay sigmoid/tanh → train nhanh hơn 6×
2. **Dropout** 0.5 ở FC → giảm overfitting mạnh
3. **Data augmentation**: flip, crop, color jitter
4. **Local Response Normalization** (LRN) — nay ít dùng

AlexNet đạt **top-5 error 15.3%** tại ImageNet 2012, trong khi runner-up đạt 26.2%. Khoảng cách khổng lồ này đánh dấu bắt đầu thời đại deep learning.

### 4.3. VGG (Simonyan & Zisserman, 2014) — đơn giản là đẹp

**Nguyên tắc thiết kế**: chỉ dùng 3×3 conv (stride 1, same padding) + 2×2 max pool. VGG-16: 13 conv + 3 FC = 138M tham số.

**Bài học từ VGG**: depth > width. VGG-16 và VGG-19 chứng minh tăng độ sâu (với 3×3) vẫn tăng accuracy. Nhưng 138M tham số là rất nhiều → thời điểm đó cần 2-3 tuần train.

### 4.4. ResNet (He et al., 2015) — giải quyết vanishing gradient

**Vấn đề**: train mạng 50+ layer sâu hơn 20 layer → **accuracy giảm** (không phải overfit — training error cũng tăng). Lý do: gradient vanish qua nhiều layer.

**Skip connection (residual block)**:
```
y = F(x) + x
```

Trong đó `F(x)` là 2-3 conv layer với ReLU. Output layer học **residual** `F(x) = y − x` thay vì học `y` trực tiếp.

> **💡 Tại sao skip connection cứu được gradient?**
> Đạo hàm của `y = F(x) + x` theo `x` là `∂y/∂x = ∂F/∂x + 1`. Hạng `+1` đảm bảo gradient **không bao giờ bằng 0** ngay cả khi `∂F/∂x ≈ 0`. Gradient luôn có đường truyền thẳng qua skip connection.

**Walk-through vanishing gradient**:

Không có skip: gradient từ layer N về layer 1 = `Π_{k=1}^{N} ∂h_k/∂h_{k-1}`.

Nếu mỗi Jacobian có norm ~0.9: sau 50 layers → `0.9^50 ≈ 0.005`. Sau 100 layers → `0.9^100 ≈ 2.7 × 10⁻⁵`. **Gradient gần như 0 — layer đầu không học được gì.**

Với skip: luôn có path thẳng → gradient không nhân dần về 0.

**Kết quả**: ResNet-152 đạt top-5 error **3.57%** tại ImageNet 2015, trong khi human ~5.1%.

> **❓ Câu hỏi tự nhiên**
> **Q: Khi nào skip connection không cộng trực tiếp được x?**
> A: Khi số channels thay đổi (ví dụ từ 64 → 128). Dùng 1×1 conv ("projection shortcut") để match dimension.
>
> **Q: Bottleneck block là gì?**
> A: 1×1 conv (giảm channels) → 3×3 conv → 1×1 conv (tăng lại channels). Dùng trong ResNet-50/101/152 để tiết kiệm tính toán.
>
> **Q: Sau ResNet thì gì?**
> A: DenseNet (nối mọi layer với nhau), EfficientNet (scale W/D/R đồng thời), Vision Transformer (ViT — dùng self-attention thay conv hoàn toàn, sẽ học ở T5-L02).

---

## 5. Bài tập

**Bài 1**: Conv layer: input 64×64×3, filter 5×5, padding 2, stride 2, 32 kernels.
- (a) Output size.
- (b) Số tham số.

**Bài 2**: Max pooling 3×3 stride 2 áp trên feature map 7×7. Output size? (Dùng công thức tổng quát.)

**Bài 3**: Mạng gồm: Conv 3×3 (stride 1) → MaxPool 2×2 (stride 2) → Conv 3×3 (stride 1) → MaxPool 2×2 (stride 2). Input 28×28. Tính:
- (a) Output size sau mỗi bước.
- (b) Receptive field của 1 neuron sau cùng tính theo pixel gốc.

**Bài 4**: ResNet skip connection: `y = F(x) + x`. Giả sử `F(x)` gồm 2 conv 3×3 (cùng channels). Input và output đều 64 channels. Viết công thức đạo hàm `∂L/∂x` theo `∂L/∂y` và `∂y/∂x`, chỉ rõ tại sao gradient luôn ≥ gradient qua `F(x)` một mình.

---

## 6. Lời giải chi tiết

### Bài 1

**(a) Output size**:
```
W_out = floor((64 − 5 + 2×2) / 2) + 1
      = floor((64 − 5 + 4) / 2) + 1
      = floor(63 / 2) + 1
      = 31 + 1 = 32
```
Output: **32×32×32** (32 channels từ 32 kernels).

**(b) Số tham số**:
```
K × (F² × C_in + 1) = 32 × (25 × 3 + 1) = 32 × 76 = 2.432 tham số
```

### Bài 2

MaxPool 3×3, stride 2 trên 7×7:
```
floor((7 − 3) / 2) + 1 = floor(4/2) + 1 = 2 + 1 = 3
```
Output: **3×3**.

### Bài 3

Input 28×28.

**(a) Tính từng bước** (no padding assumed, stride như ghi):

1. Conv 3×3, stride 1, no padding: `(28−3)/1+1 = 26` → **26×26**
2. MaxPool 2×2, stride 2: `(26−2)/2+1 = 13` → **13×13**
3. Conv 3×3, stride 1, no padding: `(13−3)/1+1 = 11` → **11×11**
4. MaxPool 2×2, stride 2: `(11−2)/2+1 = 5+0.5` → `floor` = **5×5**

**(b) Receptive field** (tính ngược từ cuối):

- Sau MaxPool2: mỗi neuron = 2×2 vùng layer trước + stride 2 → nhân 2
- Sau Conv2: RF = 3×3 (tuyệt đối trên feature map sau Pool1)
- Chiếu qua Pool1 (stride 2): nhân 2 → 6×6
- Qua Conv1 (3×3): cộng thêm F−1=2 theo mỗi phía → **8×8 receptive field** trên ảnh gốc 28×28.

Chi tiết công thức đệ quy:
- RF sau Conv2 (tính trên trục feature-after-Pool1): `1 + 2×(3−1) = 5`? Dùng công thức chuẩn:
  `RF(L) = RF(L−1) + (F_L − 1) × stride_product_before_L`

Tính lại tường minh:
| Layer | RF |
|-------|----|
| Input | 1 |
| Conv1 3×3 s1 | 1 + 2 = 3 |
| Pool1 2×2 s2 | 3 + 1×2 = 5 |  (pool "sees" 2 pixels → adds (2−1)×S_before=1×2=2 — thực ra RF pool thêm (2−1)×1 = 1 rồi stride nhân đôi bước nhảy sau đó) |

Đúng hơn với công thức tiêu chuẩn:
- RF_k = RF_{k-1} + (F_k − 1) × jump_{k-1}, trong đó jump_{k} = jump_{k-1} × S_k.

| k | Layer | F | S | jump | RF |
|---|-------|---|---|------|----|
| 0 | input | — | — | 1 | 1 |
| 1 | Conv1 | 3 | 1 | 1 | 1 + (3−1)×1 = 3 |
| 2 | Pool1 | 2 | 2 | 1 | 3 + (2−1)×1 = 4 |
| 3 | Conv2 | 3 | 1 | 2 | 4 + (3−1)×2 = 8 |
| 4 | Pool2 | 2 | 2 | 2 | 8 + (2−1)×2 = 10 |

RF cuối = **10×10** pixels trên ảnh gốc 28×28.

### Bài 4

`y = F(x) + x`. Áp chain rule:
```
∂L/∂x = ∂L/∂y × ∂y/∂x
       = ∂L/∂y × (∂F/∂x + I)
       = ∂L/∂y × ∂F/∂x  +  ∂L/∂y
```

Hạng thứ 2 (`∂L/∂y`) là gradient đi thẳng qua skip — **không giảm** dù `∂F/∂x` nhỏ bao nhiêu. Ngay cả khi `F(x)` hoàn toàn "chết" (`∂F/∂x ≈ 0`), vẫn còn `∂L/∂x ≈ ∂L/∂y` → layer gần input vẫn nhận gradient đủ mạnh để cập nhật.

---

## 7. Code & Minh họa

[visualization.html](./visualization.html) — convolution kernel slider, pooling demo, receptive field calculator, architecture comparison.

---

## 8. Bài tiếp theo

[T4-L03 — RNN/LSTM](../lesson-03-rnn-lstm/) — sequence modeling, vanishing gradient qua thời gian, LSTM gates.

📝 **Tóm tắt bài này**:
- Convolution = kernel trượt, dot product tại mỗi vị trí. Output size = `(W−F+2P)/S+1`.
- 1 kernel có depth = input channels; K kernels → K output channels.
- Max pooling lấy max trong vùng → giảm spatial dim, tăng invariance.
- LeNet(1998) → AlexNet(2012, GPU+ReLU+Dropout) → VGG(2014, 3×3 deep) → ResNet(2015, skip connection).
- ResNet skip connection `y=F(x)+x` đảm bảo gradient path thẳng, giải quyết vanishing gradient deep network.
