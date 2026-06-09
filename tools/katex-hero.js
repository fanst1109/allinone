/*
 * katex-hero.js — render công thức "hero" bằng KaTeX trong THÂN visualization.html.
 *
 * Hai cách dùng:
 *  1) TĨNH (opt-in): đánh dấu phần tử sẵn có class "katex-hero" → tự render lúc load.
 *       <div class="katex-hero">$$i^2 = -1$$</div>
 *  2) ĐỘNG: với readout do JS sinh lại (đổi theo slider/input), gọi:
 *       el.innerHTML = `... $$t = \\dfrac{\\log 2}{\\log(1+${r}\\%)}$$ ...`;
 *       window.katexHero.render(el);   // render lại sau mỗi lần cập nhật
 *
 * Theo CLAUDE.md, KaTeX thân viz dùng "làm điểm, không đại trà": chỉ áp cho công
 * thức thực sự đẹp hơn khi stacked (phân số/căn/mũ), không áp cho số đơn.
 *
 * Tự lazy-load tools/katex/ (css + js + auto-render) suy từ src của chính script,
 * nên chạy đúng ở mọi độ sâu. Không có .katex-hero và không gọi render() → không tải gì.
 */
(function () {
  'use strict';

  var TOOLS_BASE = (function () {
    var me = document.currentScript;
    if (!me) {
      var s = document.getElementsByTagName('script');
      for (var i = s.length - 1; i >= 0; i--) {
        if (s[i].src && /katex-hero\.js(\?|$)/.test(s[i].src)) { me = s[i]; break; }
      }
    }
    if (me && me.src) return me.src.replace(/katex-hero\.js(\?.*)?$/, 'katex/');
    return '../../../tools/katex/';
  })();

  var KOPTS = {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '\\[', right: '\\]', display: true },
      { left: '$', right: '$', display: false },
      { left: '\\(', right: '\\)', display: false }
    ],
    throwOnError: false
  };

  var ready = false;     // KaTeX + auto-render đã sẵn sàng
  var loading = false;
  var queue = [];        // callback chờ KaTeX tải xong

  function flush() {
    ready = true;
    var q = queue; queue = [];
    for (var i = 0; i < q.length; i++) { try { q[i](); } catch (e) { /* noop */ } }
  }

  function load() {
    if (loading) return;
    loading = true;

    if (!document.querySelector('link[data-katex]')) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = TOOLS_BASE + 'katex.min.css';
      link.setAttribute('data-katex', '1');
      document.head.appendChild(link);
    }

    function afterKatex() {
      if (window.renderMathInElement) { flush(); return; }
      var ar = document.createElement('script');
      ar.src = TOOLS_BASE + 'auto-render.min.js';
      ar.onload = flush;
      ar.onerror = function () { console.warn('[katex-hero] Không tải được auto-render (' + ar.src + ')'); };
      document.head.appendChild(ar);
    }

    if (window.katex) { afterKatex(); return; }
    var sc = document.createElement('script');
    sc.src = TOOLS_BASE + 'katex.min.js';
    sc.onload = afterKatex;
    sc.onerror = function () { console.warn('[katex-hero] Không tải được KaTeX (' + sc.src + ') — công thức giữ dạng text.'); };
    document.head.appendChild(sc);
  }

  // Render công thức trong 1 phần tử. An toàn gọi nhiều lần (readout động).
  function render(el) {
    if (!el) return;
    if (ready && window.renderMathInElement) {
      try { window.renderMathInElement(el, KOPTS); } catch (e) { /* giữ text */ }
      return;
    }
    queue.push(function () { try { window.renderMathInElement(el, KOPTS); } catch (e) { /* giữ text */ } });
    load();
  }

  window.katexHero = { render: render };

  function run() {
    var heroes = document.querySelectorAll('.katex-hero');
    for (var i = 0; i < heroes.length; i++) render(heroes[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
