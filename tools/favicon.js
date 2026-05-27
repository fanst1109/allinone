// favicon.js — Favicon dùng chung cho mọi page trong repo.
//
// Cơ chế: nhúng SVG dưới dạng data-URI rồi inject <link rel="icon"> lúc runtime.
// Vì là data-URI nên KHÔNG phụ thuộc đường dẫn — chạy đúng ở mọi độ sâu thư mục
// mà không cần tính số "../". Single source of truth cho hình favicon nằm ở đây
// (đồng bộ với /favicon.svg ở gốc repo).
//
// Cách dùng:
//   - visualization.html: KHÔNG cần thêm gì — readme-modal.js tự nạp favicon.js.
//   - index.html: thêm 1 dòng trước </body>:
//       <script src="<độ-sâu>/tools/favicon.js"></script>
//     (gốc: ./tools/ · Domain/: ../tools/ · Domain/Tier/: ../../tools/)

(function () {
  'use strict';

  // SVG mũ tốt nghiệp — giữ đồng bộ với /favicon.svg.
  var SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">' +
      '<rect width="64" height="64" rx="14" fill="#2c5282"/>' +
      '<path d="M32 16 L54 26 L32 36 L10 26 Z" fill="#ebf8ff"/>' +
      '<path d="M32 36 L46 30 V41 C46 45 39 48 32 48 C25 48 18 45 18 41 V30 Z" fill="#a3c5e8"/>' +
      '<path d="M54 26 V40" stroke="#ebf8ff" stroke-width="2.5" stroke-linecap="round"/>' +
      '<circle cx="54" cy="42" r="3" fill="#f6ad55"/>' +
    '</svg>';

  // Không ghi đè nếu page đã tự khai báo favicon tĩnh.
  if (document.querySelector('link[rel~="icon"]')) return;

  var link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/svg+xml';
  link.href = 'data:image/svg+xml,' + encodeURIComponent(SVG);
  document.head.appendChild(link);
})();
