// menu.js — Menu điều hướng cho trang index gốc của repo.
//
// Responsive 2 chế độ, dùng chung 1 model dữ liệu:
//   • Desktop (≥760px): thanh mega-menu sticky trên cùng. Bấm nhóm → panel
//     xổ xuống liệt kê lĩnh vực + tier (chip).
//   • Mobile (<760px): thu về nút ☰ trên thanh; bấm mở drawer toàn màn hình
//     dạng accordion (bấm nhóm để xổ/thu lĩnh vực + tier).
//
// Không cần data file: quét chính DOM index lúc runtime
// (.domain-section → .card .title a → .tier-list a). Thêm lĩnh vực/tier mới
// vào index.html là menu tự cập nhật.
//
// Cách dùng: thêm <script src="tools/menu.js"></script> trước </body>.
(function () {
  "use strict";

  // Rút gọn tên nhóm cho tab desktop (tên đầy đủ vẫn giữ ở title + drawer).
  function shorten(name) {
    return name
      .replace("Khoa học máy tính", "CS")
      .replace("Machine Learning", "ML")
      .replace("Khoa học tự nhiên", "KHTN")
      .replace("Khoa học xã hội", "KHXH");
  }

  function softColor(rgb) {
    var m = (rgb || "").match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    if (!m) return "#ebf8ff";
    var mix = function (c) { return Math.round(+c + (255 - +c) * 0.86); };
    return "rgb(" + mix(m[1]) + "," + mix(m[2]) + "," + mix(m[3]) + ")";
  }

  // ---- Quét DOM index → cây Nhóm → Lĩnh vực → Tier ----
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
        var domain = { label: link.textContent.trim(), href: link.getAttribute("href"), accent: accent, soft: softColor(accent), tiers: [] };
        card.querySelectorAll(".tier-list a").forEach(function (a) {
          domain.tiers.push({ label: a.textContent.trim(), href: a.getAttribute("href") });
        });
        group.domains.push(domain);
      });
      if (group.domains.length) groups.push(group);
    });
    return groups;
  }

  function injectStyle() {
    if (document.getElementById("mega-menu-style")) return;
    var css = `
    :root { --mm-bar-h: 52px; }
    /* ---------- Thanh bar (chung) ---------- */
    .mm-bar {
      position: sticky; top: 0; z-index: 9000; background: #ffffff; color: #1a1a1a;
      border-bottom: 1px solid #e3e1dc; box-shadow: 0 1px 6px rgba(0,0,0,0.05);
    }
    .mm-bar-inner {
      max-width: 1100px; margin: 0 auto; padding: 0 16px;
      display: flex; align-items: stretch; gap: 4px; min-height: var(--mm-bar-h);
      overflow-x: auto; scrollbar-width: none;
    }
    .mm-bar-inner::-webkit-scrollbar { display: none; }
    .mm-home {
      display: inline-flex; align-items: center; gap: 7px;
      font-weight: 800; font-size: 15px; color: #1a1a1a; text-decoration: none;
      white-space: nowrap; padding: 12px 12px 12px 0;
    }
    .mm-tabs { display: flex; align-items: stretch; gap: 2px; margin-left: 6px; flex: 1; min-width: 0; }
    .mm-tab {
      appearance: none; background: none; border: none; color: #5a6573;
      font-family: inherit; font-size: 13.5px; font-weight: 600; cursor: pointer;
      padding: 10px 12px; white-space: nowrap;
      border-bottom: 3px solid transparent; transition: color .12s, background .12s;
      display: inline-flex; align-items: center; gap: 5px;
    }
    .mm-tab:hover { color: #1a1a1a; background: #f1f5f9; }
    .mm-tab.active { color: #2c5282; background: #ebf2fb; border-bottom-color: #4299e1; }
    .mm-tab .mm-caret { font-size: 9px; opacity: .6; }
    .mm-burger {
      display: none; appearance: none; background: none; border: none; color: #2d3748;
      font-size: 22px; cursor: pointer; padding: 8px 4px 8px 12px; margin-left: auto; line-height: 1;
    }

    /* ---------- Desktop dropdown panel ---------- */
    .mm-backdrop { position: fixed; inset: 0; z-index: 8999; display: none; background: rgba(15,23,42,0.35); }
    .mm-backdrop.open { display: block; }
    .mm-panel {
      position: fixed; left: 0; right: 0; z-index: 9000; display: none;
      background: #fff; border-bottom: 1px solid #e3e1dc; box-shadow: 0 16px 40px rgba(0,0,0,0.18);
      max-height: 72vh; overflow-y: auto;
    }
    .mm-panel.open { display: block; }
    .mm-grid {
      max-width: 1100px; margin: 0 auto; padding: 22px 20px 26px;
      display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 18px 26px;
    }
    .mm-dom { border-left: 3px solid var(--mm-accent, #2c5282); padding-left: 14px; }
    .mm-dom-title { font-size: 16px; font-weight: 700; text-decoration: none; color: #1a1a1a; display: inline-block; margin-bottom: 8px; }
    .mm-dom-title:hover { color: var(--mm-accent, #2c5282); }
    .mm-chips { display: flex; flex-wrap: wrap; gap: 6px; }
    .mm-chip {
      font-size: 12px; font-weight: 600; text-decoration: none;
      color: var(--mm-accent, #2c5282); background: var(--mm-soft, #ebf8ff);
      padding: 5px 11px; border-radius: 7px; transition: background .12s, color .12s;
    }
    .mm-chip:hover { background: var(--mm-accent, #2c5282); color: #fff; }

    /* ---------- Mobile drawer (accordion) ---------- */
    .mm-drawer {
      position: fixed; inset: 0; z-index: 9100; display: none;
      background: #fafaf7; overflow-y: auto; -webkit-overflow-scrolling: touch;
    }
    .mm-drawer.open { display: block; }
    .mm-drawer-head {
      position: sticky; top: 0; background: #ffffff; color: #1a1a1a;
      border-bottom: 1px solid #e3e1dc;
      display: flex; align-items: center; justify-content: space-between;
      padding: 14px 18px; font-weight: 800; font-size: 17px;
      padding-top: calc(14px + env(safe-area-inset-top, 0px));
    }
    .mm-drawer-close { appearance: none; background: none; border: none; color: #5a6573; font-size: 26px; cursor: pointer; line-height: 1; padding: 0 4px; }
    .mm-acc { border-bottom: 1px solid #e3e1dc; }
    .mm-acc-head {
      width: 100%; appearance: none; background: none; border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: space-between;
      padding: 16px 18px; font-family: inherit; font-size: 16px; font-weight: 700; color: #1a1a1a; text-align: left;
    }
    .mm-acc-head .mm-acc-caret { transition: transform .18s; color: #718096; font-size: 13px; }
    .mm-acc.open .mm-acc-caret { transform: rotate(180deg); }
    .mm-acc-body { display: none; padding: 0 18px 18px; }
    .mm-acc.open .mm-acc-body { display: block; }
    .mm-acc-dom { margin-top: 14px; border-left: 3px solid var(--mm-accent, #2c5282); padding-left: 12px; }
    .mm-acc-dom:first-child { margin-top: 4px; }

    @media (max-width: 759px) {
      .mm-tabs { display: none; }
      .mm-burger { display: inline-block; }
      .mm-home { font-size: 16px; }
    }
    @media (min-width: 760px) {
      .mm-drawer { display: none !important; }
    }`;
    var st = document.createElement("style");
    st.id = "mega-menu-style";
    st.textContent = css;
    document.head.appendChild(st);
  }

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function build() {
    injectStyle();
    var groups = buildModel();
    if (!groups.length) return;

    // ---------- Thanh bar ----------
    var bar = el("nav", "mm-bar");
    bar.setAttribute("aria-label", "Điều hướng lĩnh vực");
    var inner = el("div", "mm-bar-inner");
    var home = el("a", "mm-home", "🎓 Mục lục");
    home.href = "#";
    home.addEventListener("click", function (e) { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); closePanel(); });
    inner.appendChild(home);

    var tabsWrap = el("div", "mm-tabs");
    var tabs = [];
    groups.forEach(function (g, i) {
      var t = el("button", "mm-tab", shorten(g.name) + ' <span class="mm-caret">▾</span>');
      t.type = "button";
      t.title = g.name;
      t.addEventListener("click", function () { togglePanel(i); });
      t.addEventListener("mouseenter", function () { if (panelIdx !== -1 && panelIdx !== i) showPanel(i); });
      tabsWrap.appendChild(t);
      tabs.push(t);
    });
    inner.appendChild(tabsWrap);

    var burger = el("button", "mm-burger", "☰");
    burger.type = "button";
    burger.setAttribute("aria-label", "Mở mục lục");
    burger.addEventListener("click", openDrawer);
    inner.appendChild(burger);

    bar.appendChild(inner);

    // ---------- Desktop panel ----------
    var backdrop = el("div", "mm-backdrop");
    var panel = el("div", "mm-panel");

    // ---------- Mobile drawer ----------
    var drawer = el("div", "mm-drawer");
    var dHead = el("div", "mm-drawer-head", "<span>🎓 Mục lục</span>");
    var dClose = el("button", "mm-drawer-close", "✕");
    dClose.type = "button";
    dClose.setAttribute("aria-label", "Đóng");
    dClose.addEventListener("click", closeDrawer);
    dHead.appendChild(dClose);
    drawer.appendChild(dHead);

    groups.forEach(function (g, gi) {
      var acc = el("div", "mm-acc");
      var head = el("button", "mm-acc-head",
        "<span>" + g.name + "</span><span class='mm-acc-caret'>▾</span>");
      head.type = "button";
      var body = el("div", "mm-acc-body");
      g.domains.forEach(function (d) {
        var dom = el("div", "mm-acc-dom");
        dom.style.setProperty("--mm-accent", d.accent);
        var html = '<a class="mm-dom-title" href="' + d.href + '">' + d.label + "</a>";
        html += '<div class="mm-chips">';
        d.tiers.forEach(function (t) {
          html += '<a class="mm-chip" style="--mm-accent:' + d.accent + ';--mm-soft:' + d.soft + '" href="' + t.href + '">' + t.label + "</a>";
        });
        html += "</div>";
        dom.innerHTML = html;
        body.appendChild(dom);
      });
      head.addEventListener("click", function () {
        // accordion: mở mục này, đóng các mục khác cho gọn
        var wasOpen = acc.classList.contains("open");
        drawer.querySelectorAll(".mm-acc.open").forEach(function (x) { x.classList.remove("open"); });
        if (!wasOpen) acc.classList.add("open");
      });
      acc.appendChild(head);
      acc.appendChild(body);
      drawer.appendChild(acc);
    });

    document.body.insertBefore(bar, document.body.firstChild);
    document.body.appendChild(backdrop);
    document.body.appendChild(panel);
    document.body.appendChild(drawer);

    // ---------- Logic desktop panel ----------
    var panelIdx = -1;
    function renderPanel(i) {
      var g = groups[i];
      var html = '<div class="mm-grid">';
      g.domains.forEach(function (d) {
        html += '<div class="mm-dom" style="--mm-accent:' + d.accent + ';--mm-soft:' + d.soft + '">';
        html += '<a class="mm-dom-title" href="' + d.href + '">' + d.label + "</a>";
        html += '<div class="mm-chips">';
        d.tiers.forEach(function (t) { html += '<a class="mm-chip" href="' + t.href + '">' + t.label + "</a>"; });
        html += "</div></div>";
      });
      html += "</div>";
      panel.innerHTML = html;
    }
    function positionPanel() {
      var r = bar.getBoundingClientRect();
      var top = Math.max(r.bottom, 0);
      panel.style.top = top + "px";
      backdrop.style.top = top + "px";
    }
    function showPanel(i) {
      panelIdx = i;
      renderPanel(i);
      positionPanel();
      panel.classList.add("open");
      backdrop.classList.add("open");
      tabs.forEach(function (t, idx) { t.classList.toggle("active", idx === i); });
    }
    function closePanel() {
      panelIdx = -1;
      panel.classList.remove("open");
      backdrop.classList.remove("open");
      tabs.forEach(function (t) { t.classList.remove("active"); });
    }
    function togglePanel(i) { if (panelIdx === i) closePanel(); else showPanel(i); }

    // ---------- Logic mobile drawer ----------
    function openDrawer() { drawer.classList.add("open"); document.body.style.overflow = "hidden"; }
    function closeDrawer() { drawer.classList.remove("open"); document.body.style.overflow = ""; }

    backdrop.addEventListener("click", closePanel);
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (panelIdx !== -1) closePanel();
      if (drawer.classList.contains("open")) closeDrawer();
    });
    window.addEventListener("resize", function () {
      if (panelIdx !== -1) positionPanel();
      if (window.innerWidth >= 760) closeDrawer();
    });
    window.addEventListener("scroll", function () { if (panelIdx !== -1) positionPanel(); }, { passive: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
