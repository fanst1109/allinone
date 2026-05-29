// viz-toc.js — Table of contents tự động cho visualization.html.
//
// Cách dùng (thêm trước </body> trong viz, SAU readme-modal):
//   <script src="../../tools/viz-toc.js"></script>
//
// Script tự inject CSS + DOM:
//   - Nút floating "📑 Mục lục" góc dưới-trái
//   - Popup panel hiện danh sách h2/h3 trong <main>
//   - Click section → smooth scroll, active section highlight theo scroll
//
// Nếu <main> có < 2 heading (h2) thì script tự skip (TOC vô nghĩa).
// Nếu trang có ipa-reader (English/), nút TOC tự dịch lên trên 60px để
// không chồng lên nút "🔤 IPA".

(function () {
  'use strict';

  const STYLE = `
    .vt-btn {
      position: fixed; left: 24px; z-index: 200;
      background: #319795; color: white;
      padding: 12px 18px; border-radius: 28px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
      cursor: pointer; font-weight: 700; font-size: 14px;
      border: none; user-select: none;
      transition: transform 0.15s, background 0.15s, opacity 0.2s;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .vt-btn:hover { transform: translateY(-2px); background: #2c7a7b; }
    .vt-btn.vt-hidden { opacity: 0; pointer-events: none; transform: translateY(8px); }

    .vt-panel {
      position: fixed; left: 24px; z-index: 210;
      width: 320px; max-width: calc(100vw - 48px);
      max-height: 70vh;
      background: white; border-radius: 10px;
      box-shadow: 0 6px 24px rgba(0,0,0,0.2);
      display: flex; flex-direction: column;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      opacity: 0; pointer-events: none;
      transform: translateY(8px) scale(0.98);
      transition: opacity 0.18s, transform 0.18s;
    }
    .vt-panel.vt-open { opacity: 1; pointer-events: auto; transform: translateY(0) scale(1); }

    .vt-header {
      background: #319795; color: white;
      padding: 10px 14px; border-radius: 10px 10px 0 0;
      display: flex; justify-content: space-between; align-items: center;
      flex-shrink: 0; font-weight: 700; font-size: 14px;
    }
    .vt-close {
      display: flex; align-items: center; justify-content: center;
      background: rgba(255,255,255,0.18); color: white;
      border: none; width: 26px; height: 26px;
      border-radius: 50%; cursor: pointer; font-size: 14px;
      font-family: inherit; padding: 0; line-height: 1;
      transition: background 0.15s;
    }
    .vt-close:hover { background: rgba(255,255,255,0.32); }

    .vt-list {
      overflow-y: auto; flex: 1;
      padding: 8px 0; margin: 0;
      list-style: none;
    }
    .vt-list li { margin: 0; }
    .vt-list a {
      display: block; padding: 6px 16px;
      color: #2d3748; text-decoration: none; font-size: 13px;
      border-left: 3px solid transparent;
      transition: background 0.12s, border-color 0.12s, color 0.12s;
    }
    .vt-list a:hover {
      background: #e6fffa; color: #234e52;
      border-left-color: #4fd1c5;
    }
    .vt-list a.vt-active {
      background: #b2f5ea; color: #234e52;
      border-left-color: #319795; font-weight: 600;
    }
    .vt-list .vt-l3 a { padding-left: 32px; font-size: 12.5px; color: #4a5568; }
    .vt-list .vt-l4 a { padding-left: 44px; font-size: 12px; color: #718096; }

    @media (max-width: 700px) {
      .vt-panel { width: calc(100vw - 32px); left: 16px; }
      .vt-btn { left: 16px; padding: 10px 14px; font-size: 13px; }
      .vt-list a { font-size: 14px; padding: 9px 14px; }
      .vt-list .vt-l3 a { font-size: 13.5px; padding-left: 30px; }
      .vt-list .vt-l4 a { font-size: 13px; padding-left: 42px; }
    }
  `;

  // Chuyển text thành id slug an toàn cho URL fragment. Giữ chữ cái Unicode
  // (bao gồm tiếng Việt có dấu), thay khoảng trắng bằng -, bỏ ký tự đặc biệt.
  function slugify(text) {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '') // bỏ dấu tiếng Việt
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 60);
  }

  function collectHeadings() {
    // Tìm <main>, hoặc fallback toàn body trừ nav/header floating
    const root = document.querySelector('main') || document.body;
    const els = root.querySelectorAll('h2, h3');
    const usedIds = new Set();
    const headings = [];
    let i = 0;
    for (const el of els) {
      // Bỏ qua heading trong các panel modal/popup (readme-modal, vt-panel...)
      if (el.closest('.rm-panel, .vt-panel, .ipa-panel')) continue;
      if (!el.id) {
        let base = slugify(el.textContent) || 'sec';
        let id = base;
        let n = 1;
        while (usedIds.has(id) || document.getElementById(id)) {
          id = base + '-' + (++n);
        }
        el.id = id;
      }
      usedIds.add(el.id);
      headings.push({
        el,
        level: parseInt(el.tagName[1], 10),
        text: el.textContent.trim(),
        id: el.id,
      });
      i++;
    }
    return headings;
  }

  function init() {
    const headings = collectHeadings();
    // Skip nếu < 2 h2 (TOC vô nghĩa)
    const h2Count = headings.filter(h => h.level === 2).length;
    if (h2Count < 2) return;

    // Inject styles (idempotent)
    if (!document.getElementById('vt-styles')) {
      const style = document.createElement('style');
      style.id = 'vt-styles';
      style.textContent = STYLE;
      document.head.appendChild(style);
    }

    // Avoid double-init
    if (document.getElementById('vt-btn')) return;

    // Build button + panel
    const btn = document.createElement('button');
    btn.className = 'vt-btn';
    btn.id = 'vt-btn';
    btn.type = 'button';
    btn.textContent = '📑 Mục lục';

    const panel = document.createElement('div');
    panel.className = 'vt-panel';
    panel.id = 'vt-panel';
    panel.setAttribute('role', 'navigation');
    panel.setAttribute('aria-label', 'Mục lục');

    let listHtml = '<div class="vt-header">📑 Mục lục<button class="vt-close" type="button" aria-label="Đóng">✕</button></div><ul class="vt-list">';
    for (const h of headings) {
      listHtml += `<li class="vt-l${h.level}"><a href="#${h.id}" data-id="${h.id}">${escapeHtml(h.text)}</a></li>`;
    }
    listHtml += '</ul>';
    panel.innerHTML = listHtml;

    document.body.appendChild(btn);
    document.body.appendChild(panel);

    // Vị trí bottom — cộng dồn:
    //   base 24px + 56px nếu trang có IPA reader (English/) hoặc Pinyin reader
    //   (Chinese/) để nút TOC không chồng nút reader đó + 56px nếu mobile để
    //   clear Chrome iOS / Safari tab bar ~50px ở đáy che bottom: 24px (root
    //   cause của "TOC tap không có phản ứng" — nút nằm sau tab bar trình
    //   duyệt). env(safe-area-inset-bottom) thêm padding cho iPhone notch.
    const hasIPA = window.location.pathname.includes('/English/');
    const hasZH  = window.location.pathname.includes('/Chinese/');
    const isMobile = window.matchMedia && window.matchMedia('(max-width: 700px)').matches;
    const readerShift = (hasIPA || hasZH) ? 56 : 0;
    const mobileShift = isMobile ? 56 : 0;
    const btnBottom = 24 + readerShift + mobileShift;
    const panelBottom = btnBottom + 56;
    btn.style.bottom = `calc(${btnBottom}px + env(safe-area-inset-bottom, 0px))`;
    panel.style.bottom = `calc(${panelBottom}px + env(safe-area-inset-bottom, 0px))`;

    function open() {
      panel.classList.add('vt-open');
      btn.classList.add('vt-hidden');
    }
    function close() {
      panel.classList.remove('vt-open');
      btn.classList.remove('vt-hidden');
    }

    btn.addEventListener('click', open);
    panel.querySelector('.vt-close').addEventListener('click', close);

    // Click section → smooth scroll, close panel
    panel.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const id = a.dataset.id;
        const target = document.getElementById(id);
        if (target) {
          // Offset cho sticky nav (~46px) — scroll thấp hơn 1 chút
          const top = target.getBoundingClientRect().top + window.scrollY - 56;
          window.scrollTo({ top, behavior: 'smooth' });
        }
        close();
      });
    });

    // Click ngoài panel → close
    document.addEventListener('click', e => {
      if (!panel.classList.contains('vt-open')) return;
      if (panel.contains(e.target) || btn.contains(e.target)) return;
      close();
    });

    // ESC closes
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && panel.classList.contains('vt-open')) close();
    });

    // Highlight section đang xem dựa trên scroll
    if ('IntersectionObserver' in window) {
      const links = new Map();
      panel.querySelectorAll('a').forEach(a => links.set(a.dataset.id, a));

      const observer = new IntersectionObserver(
        entries => {
          // Chọn entry visible cao nhất (smallest top)
          let topMost = null;
          for (const entry of entries) {
            if (entry.isIntersecting) {
              if (!topMost || entry.boundingClientRect.top < topMost.boundingClientRect.top) {
                topMost = entry;
              }
            }
          }
          if (topMost) {
            const id = topMost.target.id;
            links.forEach(a => a.classList.remove('vt-active'));
            const active = links.get(id);
            if (active) active.classList.add('vt-active');
          }
        },
        { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
      );
      headings.forEach(h => observer.observe(h.el));
    }
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
