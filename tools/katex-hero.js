/*
 * katex-hero.js — render công thức "hero" tĩnh trong THÂN visualization.html bằng KaTeX.
 *
 * Dùng có chủ đích (opt-in), KHÔNG đại trà: chỉ render các phần tử được đánh dấu
 * sẵn class "katex-hero" (theo ngoại lệ "hero formula" trong CLAUDE.md). Readout
 * động (số đổi theo slider) KHÔNG đánh dấu class này → vẫn để unicode.
 *
 * Cách dùng trong viz:
 *   <div class="katex-hero">$$i^2 = -1$$</div>           // display, căn giữa
 *   <span class="katex-hero">$z = a + bi$</span>          // inline
 *   <script src="../../../tools/katex-hero.js"></script>  // thêm ở cuối <body>
 *
 * Script tự lazy-load tools/katex/ (css + js + auto-render) suy từ src của chính nó,
 * nên chạy đúng ở mọi độ sâu. Nếu trang không có .katex-hero nào → không tải gì.
 */
(function () {
  'use strict';

  // Suy ra thư mục tools/ từ src của chính script này (giống readme-modal.js) → chạy mọi độ sâu.
  var TOOLS_BASE = (function () {
    var me = document.currentScript;
    if (!me) {
      var s = document.getElementsByTagName('script');
      for (var i = s.length - 1; i >= 0; i--) {
        if (s[i].src && /katex-hero\.js(\?|$)/.test(s[i].src)) { me = s[i]; break; }
      }
    }
    if (me && me.src) return me.src.replace(/katex-hero\.js(\?.*)?$/, 'katex/');
    return '../../../tools/katex/'; // fallback cho cấu trúc <Lĩnh vực>/<Tier>/lesson-XX/
  })();

  function run() {
    var heroes = document.querySelectorAll('.katex-hero');
    if (!heroes.length) return; // không có công thức hero → không tải KaTeX

    // CSS (một lần)
    if (!document.querySelector('link[data-katex]')) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = TOOLS_BASE + 'katex.min.css';
      link.setAttribute('data-katex', '1');
      document.head.appendChild(link);
    }

    var render = function () {
      var opts = {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '\\[', right: '\\]', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\(', right: '\\)', display: false }
        ],
        throwOnError: false
      };
      for (var i = 0; i < heroes.length; i++) {
        try { window.renderMathInElement(heroes[i], opts); } catch (e) { /* giữ nguyên text nếu lỗi */ }
      }
    };

    var loadAutoRender = function () {
      if (window.renderMathInElement) { render(); return; }
      var ar = document.createElement('script');
      ar.src = TOOLS_BASE + 'auto-render.min.js';
      ar.onload = render;
      ar.onerror = function () { console.warn('[katex-hero] Không tải được auto-render (' + ar.src + ')'); };
      document.head.appendChild(ar);
    };

    if (window.katex) { loadAutoRender(); return; }
    var sc = document.createElement('script');
    sc.src = TOOLS_BASE + 'katex.min.js';
    sc.onload = loadAutoRender;
    sc.onerror = function () { console.warn('[katex-hero] Không tải được KaTeX (' + sc.src + ') — công thức giữ dạng text.'); };
    document.head.appendChild(sc);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
