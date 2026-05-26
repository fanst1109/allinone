// readme-modal.js — Shared README modal cho visualization.html.
//
// Cách dùng (thêm trước </body> trong viz):
//   <script src="../../tools/marked.min.js"></script>
//   <script src="./README.data.js"></script>
//   <script src="../../tools/readme-modal.js"></script>
//
// Script tự inject CSS + DOM (nút floating + panel + backdrop), không cần
// markup riêng trong viz. Render README bằng marked.parse(window.README_MD).
// Phụ thuộc: window.marked (từ marked.min.js) và window.README_MD (từ
// README.data.js, do tools/build-readme-data.go sinh ra).
//
// 3 chế độ hiển thị (lưu vào localStorage key "rmViewMode"):
//   modal      — panel trượt từ phải ~65% chiều rộng, có backdrop mờ (mặc định)
//   sidebar    — panel cố định bên phải, body bị đẩy sang trái để không đè lên nhau
//                Kéo handle bên trái panel để thay đổi độ rộng (lưu localStorage)
//   fullscreen — che toàn màn hình, đọc tập trung

(function () {
  'use strict';

  var LS_MODE_KEY   = 'rmViewMode';
  var LS_WIDTH_KEY  = 'rmSidebarWidth';
  var LS_TOC_KEY    = 'rmTocVisible';
  var MODES         = ['modal', 'sidebar', 'fullscreen'];
  var DEFAULT_W     = 400;   // sidebar mặc định px
  var MIN_W         = 260;
  var MAX_W_RATIO   = 0.65;  // tối đa 65% viewport

  var STYLE = `
    /* ── Reset: ngăn viz inline <style> (vd 'button { margin-right: 6px }') leak vào modal ── */
    .rm-btn, .rm-panel button, .rm-panel input, .rm-panel select { margin: 0; }

    /* ── Nút floating ──
     * bottom: 24px + safe-area cho iPhone notch. Trên mobile, media query
     * bên dưới bump bottom lên 80px để clear Chrome iOS / Safari tab bar
     * (~50px ở đáy che nút) — tránh "tap không có phản ứng". */
    .rm-btn {
      position: fixed; right: 24px; z-index: 200;
      bottom: calc(24px + env(safe-area-inset-bottom, 0px));
      background: #2c5282; color: white;
      padding: 12px 20px; border-radius: 28px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
      cursor: pointer; font-weight: 700; font-size: 14px;
      border: none; user-select: none;
      transition: transform 0.15s, background 0.15s, opacity 0.2s;
      font-family: inherit;
    }
    .rm-btn:hover { transform: translateY(-2px); background: #1e3a5f; }
    .rm-btn.rm-hidden { opacity: 0; pointer-events: none; transform: translateY(8px); }

    /* ── Backdrop (modal + fullscreen) ── */
    .rm-backdrop {
      position: fixed; inset: 0; background: rgba(0,0,0,0.45);
      z-index: 250; opacity: 0; pointer-events: none;
      transition: opacity 0.22s;
    }
    .rm-backdrop.rm-open { opacity: 1; pointer-events: auto; }

    /* ── Panel — base ── */
    .rm-panel {
      position: fixed;
      background: white; z-index: 300;
      display: flex; flex-direction: column;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    /* ── Modal mode ── */
    .rm-panel.rm-mode-modal {
      top: 0; right: 0; bottom: 0;
      width: 65%; max-width: 820px; min-width: 320px;
      box-shadow: -4px 0 24px rgba(0,0,0,0.2);
      transform: translateX(105%);
      transition: transform 0.28s cubic-bezier(.4,0,.2,1);
    }
    .rm-panel.rm-mode-modal.rm-open { transform: translateX(0); }

    /* ── Sidebar mode ── */
    .rm-panel.rm-mode-sidebar {
      top: 0; right: 0; bottom: 0;
      /* width được set inline bằng JS theo sidebarW */
      box-shadow: -3px 0 20px rgba(0,0,0,0.15);
      transform: translateX(105%);
      transition: transform 0.28s cubic-bezier(.4,0,.2,1);
    }
    .rm-panel.rm-mode-sidebar.rm-open { transform: translateX(0); }

    /* Body bị thu hẹp khi sidebar mở — không đè lên nhau */
    html.rm-sidebar-open body {
      padding-right: var(--rm-sidebar-w, 400px) !important;
      box-sizing: border-box;
      transition: padding-right 0.28s cubic-bezier(.4,0,.2,1);
    }
    /* Xóa transition khi đóng để smooth */
    html body.rm-closing { transition: padding-right 0.28s cubic-bezier(.4,0,.2,1); }

    /* ── Drag handle (sidebar) ── */
    .rm-drag-handle {
      position: absolute; left: 0; top: 0; bottom: 0; width: 6px;
      cursor: col-resize; z-index: 10;
      background: transparent; transition: background 0.15s;
    }
    .rm-drag-handle::after {
      content: ''; position: absolute;
      left: 2px; top: 50%; transform: translateY(-50%);
      width: 2px; height: 32px; border-radius: 2px;
      background: rgba(44,82,130,0.25); transition: background 0.15s;
    }
    .rm-drag-handle:hover { background: rgba(44,82,130,0.08); }
    .rm-drag-handle:hover::after,
    .rm-drag-handle.rm-dragging::after { background: rgba(44,82,130,0.6); }
    .rm-drag-handle.rm-dragging { background: rgba(44,82,130,0.1); cursor: col-resize; }

    /* ── Fullscreen mode ── */
    .rm-panel.rm-mode-fullscreen {
      inset: 0; width: 100%;
      transform: translateY(100%);
      transition: transform 0.3s cubic-bezier(.4,0,.2,1);
    }
    .rm-panel.rm-mode-fullscreen.rm-open { transform: translateY(0); }

    /* ── Header ── */
    .rm-panel .rm-header {
      background: #2c5282; color: white;
      padding: 10px 14px; display: flex;
      justify-content: space-between; align-items: center;
      flex-shrink: 0; gap: 8px;
    }
    .rm-panel .rm-title { font-weight: 700; font-size: 15px; flex-shrink: 0; }

    /* ── Mode toggle ── */
    .rm-mode-toggle { display: flex; gap: 3px; }
    .rm-mode-toggle button {
      background: rgba(255,255,255,0.15); color: rgba(255,255,255,0.85);
      border: 1px solid rgba(255,255,255,0.2);
      padding: 4px 10px; border-radius: 4px;
      cursor: pointer; font-size: 12px; font-family: inherit;
      transition: background 0.15s, color 0.15s;
      white-space: nowrap;
    }
    .rm-mode-toggle button:hover { background: rgba(255,255,255,0.28); color: white; }
    .rm-mode-toggle button.rm-active {
      background: rgba(255,255,255,0.35); color: white;
      font-weight: 700; border-color: rgba(255,255,255,0.5);
    }

    /* ── TOC toggle (trong header) ── */
    .rm-toc-toggle {
      display: flex; align-items: center; justify-content: center;
      background: rgba(255,255,255,0.15); color: rgba(255,255,255,0.85);
      border: 1px solid rgba(255,255,255,0.2);
      padding: 4px 10px; border-radius: 4px;
      cursor: pointer; font-size: 12px; font-family: inherit;
      flex-shrink: 0; gap: 4px;
      transition: background 0.15s, color 0.15s;
    }
    .rm-toc-toggle:hover { background: rgba(255,255,255,0.28); color: white; }
    .rm-toc-toggle.rm-active {
      background: rgba(255,255,255,0.35); color: white;
      font-weight: 700; border-color: rgba(255,255,255,0.5);
    }

    /* ── Body: split TOC | content ── */
    .rm-panel .rm-body {
      display: flex; flex: 1; overflow: hidden;
    }
    .rm-panel .rm-toc {
      width: 220px; flex-shrink: 0;
      border-right: 1px solid #e2e8f0;
      background: #f7fafc;
      overflow-y: auto;
      padding: 12px 0;
      font-size: 13px;
    }
    .rm-panel .rm-toc.rm-hidden { display: none; }
    .rm-panel .rm-toc-title {
      padding: 4px 16px 8px; font-size: 11px;
      color: #718096; text-transform: uppercase;
      letter-spacing: 0.5px; font-weight: 700;
    }
    .rm-panel .rm-toc ul {
      list-style: none; margin: 0; padding: 0;
    }
    .rm-panel .rm-toc li { margin: 0; }
    .rm-panel .rm-toc a {
      display: block; padding: 5px 16px;
      color: #2d3748; text-decoration: none;
      border-left: 3px solid transparent;
      transition: background 0.12s, border-color 0.12s, color 0.12s;
    }
    .rm-panel .rm-toc a:hover {
      background: #edf2f7; color: #2c5282;
      border-left-color: #90cdf4;
    }
    .rm-panel .rm-toc a.rm-active {
      background: #ebf8ff; color: #2c5282;
      border-left-color: #2c5282; font-weight: 600;
    }
    .rm-panel .rm-toc .rm-toc-l1 a { font-weight: 700; font-size: 13px; }
    .rm-panel .rm-toc .rm-toc-l3 a {
      padding-left: 32px; font-size: 12px; color: #4a5568;
    }
    .rm-panel .rm-toc .rm-toc-l4 a {
      padding-left: 44px; font-size: 11.5px; color: #718096;
    }

    /* Sidebar mode hẹp: ẩn TOC mặc định để có chỗ đọc */
    .rm-panel.rm-mode-sidebar .rm-toc { width: 180px; }

    @media (max-width: 600px) {
      /* Trên mobile, sidebar mode 220x kiểu side-by-side không khả thi (panel
       * chỉ ~350px). Khi TOC bật, hiển thị overlay full lên content; khi tắt,
       * .rm-hidden vẫn ẩn (rule chung phía trên). Click một mục → JS sẽ tự
       * ẩn TOC để user thấy content. */
      .rm-panel .rm-toc {
        position: absolute; inset: 0; z-index: 5;
        width: 100% !important; max-width: none;
        border-right: 0; padding: 16px 0;
      }
      .rm-panel .rm-toc a { padding: 10px 18px; font-size: 14px; }
      .rm-panel .rm-toc .rm-toc-l1 a { font-size: 15px; }
      .rm-panel .rm-toc .rm-toc-l3 a { padding-left: 36px; font-size: 13.5px; }
      .rm-panel .rm-toc .rm-toc-l4 a { padding-left: 48px; font-size: 13px; }
    }

    /* ── Close button — căn giữa ký tự ✕ ── */
    .rm-panel .rm-close {
      display: flex; align-items: center; justify-content: center;
      background: rgba(255,255,255,0.15); color: white;
      border: none; width: 30px; height: 30px; flex-shrink: 0;
      border-radius: 50%; cursor: pointer; font-size: 16px;
      font-family: inherit; transition: background 0.15s;
      padding: 0; line-height: 1;
    }
    .rm-panel .rm-close:hover { background: rgba(255,255,255,0.3); }

    /* ── Content area ── */
    .rm-panel .rm-content {
      overflow-y: auto; padding: 24px 28px;
      font-size: 14px; line-height: 1.65; color: #1f2328;
      flex: 1;
    }

    /* ── Markdown styles ── */
    .rm-content h1 { font-size: 24px; margin: 0 0 16px; padding-bottom: 8px; border-bottom: 2px solid #e2e8f0; }
    .rm-content h2 { font-size: 19px; margin: 24px 0 12px; padding-bottom: 6px; border-bottom: 1px solid #e2e8f0; color: #2d3748; }
    .rm-content h3 { font-size: 16px; margin: 18px 0 8px; color: #2d3748; }
    .rm-content h4 { font-size: 14px; margin: 14px 0 6px; color: #4a5568; }
    .rm-content p { margin: 8px 0; }
    .rm-content ul, .rm-content ol { margin: 8px 0; padding-left: 24px; }
    .rm-content li { margin: 3px 0; }
    .rm-content code {
      background: #f1f5f9; padding: 1px 6px; border-radius: 3px;
      font-family: "SF Mono", Monaco, Consolas, monospace; font-size: 13px;
      color: #c53030;
    }
    .rm-content pre {
      background: #1a202c; color: #e2e8f0;
      padding: 12px 14px; border-radius: 6px;
      overflow-x: auto; margin: 10px 0;
    }
    .rm-content pre code { background: transparent; color: inherit; padding: 0; font-size: 12.5px; }
    .rm-content a { color: #2c5282; text-decoration: none; }
    .rm-content a:hover { text-decoration: underline; }
    .rm-content blockquote {
      border-left: 4px solid #cbd5e0; padding: 4px 14px;
      color: #4a5568; margin: 10px 0; background: #f7fafc;
    }
    .rm-content table { border-collapse: collapse; margin: 12px 0; width: 100%; }
    .rm-content th, .rm-content td {
      border: 1px solid #e2e8f0; padding: 6px 10px; font-size: 13px;
      text-align: left; vertical-align: top;
    }
    .rm-content th { background: #edf2f7; font-weight: 700; }
    .rm-content tr:nth-child(even) td { background: #fafbfc; }
    .rm-content hr { border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0; }
    .rm-content strong { font-weight: 700; }
    .rm-content em { font-style: italic; }
    .rm-content img { max-width: 100%; height: auto; }

    /* ── Toast ── */
    .rm-toast {
      position: fixed; bottom: 24px; right: 24px; z-index: 500;
      background: #c53030; color: white; padding: 10px 16px;
      border-radius: 6px; font-size: 13px; max-width: 420px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
    }

    /* ── Resize cursor khi đang kéo ── */
    body.rm-resizing { cursor: col-resize !important; user-select: none !important; }
    body.rm-resizing * { pointer-events: none !important; }

    @media (max-width: 700px) {
      /* Bump nút lên trên Chrome iOS / Safari tab bar */
      .rm-btn { bottom: calc(80px + env(safe-area-inset-bottom, 0px)); }
      .rm-panel.rm-mode-modal { width: 95%; min-width: 0; }
      .rm-panel.rm-mode-sidebar { width: 90% !important; }
      /* Trên mobile, sidebar chiếm gần hết màn — body padding-right cũng phải
       * co theo, nếu không sẽ ép content còn ~0px. */
      html.rm-sidebar-open body { padding-right: 90vw !important; }
      .rm-panel .rm-header { padding: 8px 10px; gap: 6px; }
      .rm-panel .rm-title { font-size: 14px; }
      .rm-mode-toggle button, .rm-toc-toggle { padding: 4px 8px; font-size: 11.5px; }
      .rm-panel .rm-content { padding: 16px 18px; font-size: 15px; }
      .rm-content h1 { font-size: 22px; }
      .rm-content h2 { font-size: 18px; }
      .rm-content h3 { font-size: 16px; }
      .rm-content code { font-size: 13.5px; }
      .rm-content pre code { font-size: 13px; }
      .rm-content th, .rm-content td { font-size: 13px; padding: 5px 8px; }
    }
  `;

  function showToast(msg) {
    var t = document.createElement('div');
    t.className = 'rm-toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 6000);
  }

  function clamp(val, min, max) { return Math.max(min, Math.min(max, val)); }

  function init() {
    if (!document.getElementById('rm-styles')) {
      var style = document.createElement('style');
      style.id = 'rm-styles';
      style.textContent = STYLE;
      document.head.appendChild(style);
    }

    var hasMarked = typeof window.marked !== 'undefined' && typeof window.marked.parse === 'function';
    var hasReadme = typeof window.README_MD === 'string';

    if (!hasMarked) {
      console.warn('[readme-modal] marked chưa load. Kiểm tra <script src="../../tools/marked.min.js"> đứng TRƯỚC readme-modal.js.');
      showToast('Lỗi: marked.min.js chưa load (xem console).');
      return;
    }
    if (!hasReadme) {
      console.warn('[readme-modal] window.README_MD không có. Cần load <script src="./README.data.js"> (sinh bởi tools/build-readme-data.go).');
      showToast('Lỗi: README.data.js chưa load (xem console).');
      return;
    }

    if (document.getElementById('rm-panel')) return;

    // ── State ──
    var savedMode = localStorage.getItem(LS_MODE_KEY) || 'modal';
    if (MODES.indexOf(savedMode) === -1) savedMode = 'modal';
    var currentMode = savedMode;

    var sidebarW = parseInt(localStorage.getItem(LS_WIDTH_KEY), 10) || DEFAULT_W;
    if (isNaN(sidebarW) || sidebarW < MIN_W) sidebarW = DEFAULT_W;

    // ── DOM ──
    var btn = document.createElement('button');
    btn.className = 'rm-btn';
    btn.id = 'rm-btn';
    btn.type = 'button';
    btn.textContent = '📖 Đọc README';

    var backdrop = document.createElement('div');
    backdrop.className = 'rm-backdrop';
    backdrop.id = 'rm-backdrop';

    var panel = document.createElement('aside');
    panel.className = 'rm-panel';
    panel.id = 'rm-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-hidden', 'true');
    panel.setAttribute('aria-label', 'README');
    panel.innerHTML =
      '<div class="rm-drag-handle" id="rm-drag-handle" title="Kéo để thay đổi độ rộng"></div>' +
      '<div class="rm-header">' +
        '<span class="rm-title">📖 README</span>' +
        '<button class="rm-toc-toggle" id="rm-toc-toggle" type="button" title="Ẩn/hiện mục lục">📑 TOC</button>' +
        '<div class="rm-mode-toggle">' +
          '<button type="button" data-mode="modal" title="Panel trượt từ phải, có backdrop">Modal</button>' +
          '<button type="button" data-mode="sidebar" title="Sidebar chia đôi màn hình, không đè viz">Sidebar</button>' +
          '<button type="button" data-mode="fullscreen" title="Che toàn màn hình">Full</button>' +
        '</div>' +
        '<button class="rm-close" type="button" aria-label="Đóng">✕</button>' +
      '</div>' +
      '<div class="rm-body">' +
        '<nav class="rm-toc" id="rm-toc" aria-label="Mục lục">' +
          '<div class="rm-toc-title">📑 Mục lục</div>' +
          '<ul></ul>' +
        '</nav>' +
        '<div class="rm-content"></div>' +
      '</div>';

    document.body.appendChild(btn);
    document.body.appendChild(backdrop);
    document.body.appendChild(panel);

    var rendered = false;

    // ── Sidebar split helpers ──
    function applySidebarW(w) {
      sidebarW = clamp(w, MIN_W, Math.floor(window.innerWidth * MAX_W_RATIO));
      panel.style.width = sidebarW + 'px';
      document.documentElement.style.setProperty('--rm-sidebar-w', sidebarW + 'px');
      try { localStorage.setItem(LS_WIDTH_KEY, sidebarW); } catch (e) {}
    }

    function enableSidebarSplit() {
      applySidebarW(sidebarW);
      document.documentElement.classList.add('rm-sidebar-open');
    }

    function disableSidebarSplit() {
      document.documentElement.classList.remove('rm-sidebar-open');
    }

    // ── Drag resize ──
    var dragHandle = document.getElementById('rm-drag-handle');
    dragHandle.addEventListener('mousedown', function (e) {
      if (currentMode !== 'sidebar') return;
      e.preventDefault();
      var startX = e.clientX;
      var startW = sidebarW;
      dragHandle.classList.add('rm-dragging');
      document.body.classList.add('rm-resizing');

      function onMove(e) {
        var dx = startX - e.clientX; // kéo trái = panel to hơn
        applySidebarW(startW + dx);
      }
      function onUp() {
        dragHandle.classList.remove('rm-dragging');
        document.body.classList.remove('rm-resizing');
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      }
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });

    // ── applyMode ──
    function applyMode(mode) {
      MODES.forEach(function (m) { panel.classList.remove('rm-mode-' + m); });
      panel.classList.add('rm-mode-' + mode);
      panel.querySelectorAll('.rm-mode-toggle button').forEach(function (b) {
        b.classList.toggle('rm-active', b.dataset.mode === mode);
      });

      // Drag handle: chỉ hiện ở sidebar
      dragHandle.style.display = mode === 'sidebar' ? '' : 'none';

      // Sidebar width inline style: chỉ áp dụng ở sidebar
      if (mode === 'sidebar') {
        applySidebarW(sidebarW);
      } else {
        panel.style.width = '';
      }

      currentMode = mode;
      try { localStorage.setItem(LS_MODE_KEY, mode); } catch (e) {}
    }

    // ── TOC helpers ──
    var tocEl = panel.querySelector('#rm-toc');
    var tocToggle = panel.querySelector('#rm-toc-toggle');
    var contentEl = panel.querySelector('.rm-content');

    function slugify(text) {
      return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 60);
    }

    function buildToc() {
      var headings = contentEl.querySelectorAll('h1, h2, h3');
      // Bỏ h1 đầu tiên (thường là title trùng với header panel) nếu chỉ có 1 h1
      var h2Count = 0;
      headings.forEach(function (h) { if (h.tagName === 'H2') h2Count++; });
      if (h2Count < 2) {
        tocEl.classList.add('rm-hidden');
        tocToggle.style.display = 'none';
        return;
      }
      tocToggle.style.display = '';

      var used = {};
      var items = [];
      headings.forEach(function (h) {
        if (!h.id) {
          var base = slugify(h.textContent) || 'sec';
          var id = base, n = 1;
          while (used[id]) id = base + '-' + (++n);
          h.id = id;
        }
        used[h.id] = true;
        items.push({ level: parseInt(h.tagName[1], 10), text: h.textContent.trim(), id: h.id, el: h });
      });

      var html = '';
      items.forEach(function (it) {
        html += '<li class="rm-toc-l' + it.level + '"><a href="#' + it.id + '" data-id="' + it.id + '">' + escapeHtml(it.text) + '</a></li>';
      });
      tocEl.querySelector('ul').innerHTML = html;

      // Click → scroll inside content (NOT window) vì content có overflow riêng
      tocEl.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function (e) {
          e.preventDefault();
          var target = document.getElementById(a.dataset.id);
          if (target) {
            var contentRect = contentEl.getBoundingClientRect();
            var targetRect = target.getBoundingClientRect();
            contentEl.scrollTop += targetRect.top - contentRect.top - 12;
          }
          // Mobile: TOC đang overlay full panel — tắt sau khi click để user
          // thấy content (desktop side-by-side thì giữ nguyên).
          if (window.matchMedia && window.matchMedia('(max-width: 600px)').matches) {
            tocVisible = false;
            applyTocVisibility();
          }
        });
      });

      // Scroll-spy bên trong content
      var links = {};
      tocEl.querySelectorAll('a').forEach(function (a) { links[a.dataset.id] = a; });
      contentEl.addEventListener('scroll', function () {
        // Tìm heading gần đỉnh content nhất
        var contentTop = contentEl.getBoundingClientRect().top;
        var current = null;
        for (var i = 0; i < items.length; i++) {
          var rect = items[i].el.getBoundingClientRect();
          if (rect.top - contentTop <= 40) current = items[i].id;
          else break;
        }
        Object.keys(links).forEach(function (k) { links[k].classList.remove('rm-active'); });
        if (current && links[current]) links[current].classList.add('rm-active');
      });
    }

    function escapeHtml(s) {
      return s.replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
      });
    }

    // TOC visibility: load từ localStorage.
    // Default: desktop = visible (side-by-side đẹp), mobile = hidden (overlay
    // full panel sẽ che content khi vừa mở → bắt user tap tắt là khó chịu).
    var savedToc = localStorage.getItem(LS_TOC_KEY);
    var isMobileNarrow = window.matchMedia && window.matchMedia('(max-width: 600px)').matches;
    var tocVisible = savedToc === null ? !isMobileNarrow : savedToc === '1';
    function applyTocVisibility() {
      tocEl.classList.toggle('rm-hidden', !tocVisible);
      tocToggle.classList.toggle('rm-active', tocVisible);
      try { localStorage.setItem(LS_TOC_KEY, tocVisible ? '1' : '0'); } catch (e) {}
    }
    tocToggle.addEventListener('click', function () {
      tocVisible = !tocVisible;
      applyTocVisibility();
    });

    // ── open / close ──
    function open() {
      if (!rendered) {
        try {
          contentEl.innerHTML = window.marked.parse(window.README_MD);
          buildToc();
        } catch (e) {
          console.error('[readme-modal] render lỗi:', e);
          contentEl.textContent = 'Lỗi render markdown: ' + e.message;
        }
        rendered = true;
      }

      applyMode(currentMode);
      applyTocVisibility();
      panel.classList.add('rm-open');
      panel.setAttribute('aria-hidden', 'false');
      btn.classList.add('rm-hidden');

      if (currentMode === 'sidebar') {
        enableSidebarSplit();
      } else {
        backdrop.classList.add('rm-open');
      }
    }

    function close() {
      panel.classList.remove('rm-open');
      backdrop.classList.remove('rm-open');
      panel.setAttribute('aria-hidden', 'true');
      btn.classList.remove('rm-hidden');
      disableSidebarSplit();
    }

    // ── Mode toggle (có thể đổi khi đang mở) ──
    panel.querySelectorAll('.rm-mode-toggle button').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        var newMode = b.dataset.mode;
        var wasOpen = panel.classList.contains('rm-open');
        applyMode(newMode);

        if (wasOpen) {
          if (newMode === 'sidebar') {
            backdrop.classList.remove('rm-open');
            enableSidebarSplit();
          } else {
            disableSidebarSplit();
            backdrop.classList.add('rm-open');
          }
        }
      });
    });

    btn.addEventListener('click', open);
    panel.querySelector('.rm-close').addEventListener('click', close);
    backdrop.addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('rm-open')) close();
    });

    // Áp dụng mode ban đầu (không mở panel)
    applyMode(currentMode);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
