// menu.js — Mega-menu điều hướng cho trang index gốc của repo.
//
// Thanh nav sticky trên cùng, chia theo các nhóm lĩnh vực có sẵn trên trang
// (mỗi .domain-section h2). Bấm 1 nhóm → panel xổ xuống liệt kê các lĩnh vực
// trong nhóm, mỗi lĩnh vực kèm các tier dạng chip.
//
// Không cần data file: script quét chính DOM của index lúc runtime
// (.domain-section → .card .title a → .tier-list a). Thêm lĩnh vực/tier mới
// vào index.html là menu tự cập nhật, luôn đồng bộ.
//
// Cách dùng: thêm <script src="tools/menu.js"></script> trước </body>.
(function () {
  "use strict";

  // ---- Quét DOM index để dựng cây Nhóm → Lĩnh vực → Tier ----
  function buildModel() {
    var groups = [];
    document.querySelectorAll(".domain-section").forEach(function (section) {
      var h2 = section.querySelector("h2");
      if (!h2) return;
      var group = { name: h2.textContent.trim(), domains: [] };
      section.querySelectorAll(".card").forEach(function (card) {
        var link = card.querySelector(".title a");
        if (!link) return;
        var accent = getComputedStyle(card).borderLeftColor || "#2c5282";
        var domain = {
          label: link.textContent.trim(), // gồm emoji
          href: link.getAttribute("href"),
          accent: accent,
          tiers: [],
        };
        card.querySelectorAll(".tier-list a").forEach(function (a) {
          domain.tiers.push({ label: a.textContent.trim(), href: a.getAttribute("href") });
        });
        group.domains.push(domain);
      });
      if (group.domains.length) groups.push(group);
    });
    return groups;
  }

  // ---- CSS (gói trong file này, không đụng viz-base.css) ----
  function injectStyle() {
    if (document.getElementById("mega-menu-style")) return;
    var css = `
    .mm-bar {
      position: sticky; top: 0; z-index: 9000;
      background: #2d3748; color: #fff;
      display: flex; align-items: stretch; gap: 2px;
      padding: 0 8px; overflow-x: auto; -webkit-overflow-scrolling: touch;
      box-shadow: 0 2px 8px rgba(0,0,0,0.18); scrollbar-width: none;
    }
    .mm-bar::-webkit-scrollbar { display: none; }
    .mm-home {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 12px 14px; font-weight: 800; font-size: 15px; color: #fff;
      text-decoration: none; white-space: nowrap; flex-shrink: 0;
    }
    .mm-tab {
      appearance: none; background: none; border: none; color: #cbd5e0;
      font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer;
      padding: 12px 14px; white-space: nowrap; flex-shrink: 0;
      border-bottom: 3px solid transparent; transition: color .12s, background .12s;
      display: inline-flex; align-items: center; gap: 6px;
    }
    .mm-tab:hover { color: #fff; background: rgba(255,255,255,0.06); }
    .mm-tab.active { color: #fff; background: rgba(255,255,255,0.10); border-bottom-color: #63b3ed; }
    .mm-tab .mm-caret { font-size: 10px; opacity: .7; }

    .mm-backdrop {
      position: fixed; inset: 0; z-index: 8999; display: none;
      background: rgba(15,23,42,0.35);
    }
    .mm-backdrop.open { display: block; }

    .mm-panel {
      position: fixed; left: 0; right: 0; z-index: 9000; display: none;
      background: #fff; border-bottom: 1px solid #e3e1dc;
      box-shadow: 0 16px 40px rgba(0,0,0,0.18);
      max-height: 72vh; overflow-y: auto;
    }
    .mm-panel.open { display: block; }
    .mm-panel-inner {
      max-width: 1100px; margin: 0 auto; padding: 22px 20px 26px;
      display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 18px 26px;
    }
    .mm-dom { border-left: 3px solid var(--mm-accent, #2c5282); padding-left: 14px; }
    .mm-dom-title {
      font-size: 16px; font-weight: 700; text-decoration: none; color: #1a1a1a;
      display: inline-block; margin-bottom: 8px;
    }
    .mm-dom-title:hover { color: var(--mm-accent, #2c5282); }
    .mm-chips { display: flex; flex-wrap: wrap; gap: 6px; }
    .mm-chip {
      font-size: 12px; font-weight: 600; text-decoration: none;
      color: var(--mm-accent, #2c5282); background: var(--mm-accent-soft, #ebf8ff);
      padding: 4px 10px; border-radius: 6px; transition: background .12s, color .12s;
    }
    .mm-chip:hover { background: var(--mm-accent, #2c5282); color: #fff; }

    @media (max-width: 768px) {
      .mm-home { font-size: 14px; padding: 12px 10px; }
      .mm-tab { font-size: 13px; padding: 12px 10px; }
      .mm-panel-inner { grid-template-columns: 1fr; padding: 18px 16px 22px; gap: 16px; }
      .mm-panel { max-height: 78vh; }
      .mm-chip { font-size: 13px; padding: 6px 12px; }
    }`;
    var st = document.createElement("style");
    st.id = "mega-menu-style";
    st.textContent = css;
    document.head.appendChild(st);
  }

  // Làm nhạt một màu rgb để dùng làm nền chip (trộn với trắng ~88%).
  function softColor(rgb) {
    var m = rgb.match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    if (!m) return "#ebf8ff";
    var mix = function (c) { return Math.round(+c + (255 - +c) * 0.86); };
    return "rgb(" + mix(m[1]) + "," + mix(m[2]) + "," + mix(m[3]) + ")";
  }

  function build() {
    injectStyle();
    var groups = buildModel();
    if (!groups.length) return; // không phải trang index → bỏ qua

    // --- Thanh bar ---
    var bar = document.createElement("nav");
    bar.className = "mm-bar";
    bar.setAttribute("aria-label", "Điều hướng lĩnh vực");
    var home = document.createElement("a");
    home.className = "mm-home";
    home.href = "#";
    home.innerHTML = "🎓 Mục lục";
    home.addEventListener("click", function (e) { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); close(); });
    bar.appendChild(home);

    var tabs = [];
    groups.forEach(function (g, i) {
      var t = document.createElement("button");
      t.className = "mm-tab";
      t.type = "button";
      t.innerHTML = g.name + ' <span class="mm-caret">▾</span>';
      t.addEventListener("click", function () { toggle(i); });
      t.addEventListener("mouseenter", function () { if (openIdx !== -1 && openIdx !== i) show(i); });
      bar.appendChild(t);
      tabs.push(t);
    });

    // --- Backdrop + panel ---
    var backdrop = document.createElement("div");
    backdrop.className = "mm-backdrop";
    var panel = document.createElement("div");
    panel.className = "mm-panel";

    // Chèn bar lên đầu body, panel + backdrop sau đó.
    document.body.insertBefore(bar, document.body.firstChild);
    document.body.appendChild(backdrop);
    document.body.appendChild(panel);

    var openIdx = -1;

    function renderPanel(i) {
      var g = groups[i];
      var html = '<div class="mm-panel-inner">';
      g.domains.forEach(function (d) {
        var soft = softColor(d.accent);
        html += '<div class="mm-dom" style="--mm-accent:' + d.accent + ';--mm-accent-soft:' + soft + '">';
        html += '<a class="mm-dom-title" href="' + d.href + '">' + d.label + "</a>";
        html += '<div class="mm-chips">';
        d.tiers.forEach(function (t) {
          html += '<a class="mm-chip" href="' + t.href + '">' + t.label + "</a>";
        });
        html += "</div></div>";
      });
      html += "</div>";
      panel.innerHTML = html;
    }

    function positionPanel() {
      // panel nằm ngay dưới thanh bar (bar sticky top:0).
      var r = bar.getBoundingClientRect();
      var top = Math.max(r.bottom, 0);
      panel.style.top = top + "px";
      backdrop.style.top = top + "px";
    }

    function show(i) {
      openIdx = i;
      renderPanel(i);
      positionPanel();
      panel.classList.add("open");
      backdrop.classList.add("open");
      tabs.forEach(function (t, idx) { t.classList.toggle("active", idx === i); });
    }
    function close() {
      openIdx = -1;
      panel.classList.remove("open");
      backdrop.classList.remove("open");
      tabs.forEach(function (t) { t.classList.remove("active"); });
    }
    function toggle(i) { if (openIdx === i) close(); else show(i); }

    backdrop.addEventListener("click", close);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && openIdx !== -1) close(); });
    window.addEventListener("resize", function () { if (openIdx !== -1) positionPanel(); });
    window.addEventListener("scroll", function () { if (openIdx !== -1) positionPanel(); }, { passive: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
