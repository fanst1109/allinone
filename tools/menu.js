// menu.js — Command palette "Mục lục" cho trang index gốc của repo.
//
// Không cần data file: script quét chính DOM của trang index lúc runtime để
// dựng danh sách Lĩnh vực → Tier (toàn bộ link đó đã nằm sẵn trong các
// .card .title a và .tier-list a). Nhờ vậy menu luôn đồng bộ với index.html —
// thêm lĩnh vực/tier mới vào trang là menu tự có, không cần build lại.
//
// Cách dùng: thêm <script src="tools/menu.js"></script> trước </body> của
// index.html gốc. Tự inject nút floating "📂 Mục lục" + overlay palette.
// Phím tắt: Ctrl/Cmd+K mở, Esc đóng, ↑/↓ chọn, Enter đi tới.
(function () {
  "use strict";

  // ---- Chuẩn hoá chuỗi để tìm kiếm không dấu, không phân biệt hoa thường ----
  function norm(s) {
    return (s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "") // bỏ dấu thanh + dấu phụ
      .replace(/đ/g, "d")
      .replace(/\s+/g, " ")
      .trim();
  }

  // ---- Quét DOM trang index để dựng danh sách mục (lĩnh vực + tier) ----
  function buildIndex() {
    var items = [];
    var sections = document.querySelectorAll(".domain-section");
    sections.forEach(function (section) {
      var groupEl = section.querySelector("h2");
      var group = groupEl ? groupEl.textContent.trim() : "";
      section.querySelectorAll(".card").forEach(function (card) {
        var titleLink = card.querySelector(".title a");
        if (!titleLink) return;
        var domainLabel = titleLink.textContent.trim(); // gồm cả emoji
        var domainHref = titleLink.getAttribute("href");
        // Mục cấp lĩnh vực
        items.push({
          kind: "domain",
          label: domainLabel,
          context: group,
          href: domainHref,
          search: norm(domainLabel + " " + group),
        });
        // Các tier bên trong lĩnh vực
        card.querySelectorAll(".tier-list a").forEach(function (tierLink) {
          var tierLabel = tierLink.textContent.trim();
          var tierHref = tierLink.getAttribute("href");
          items.push({
            kind: "tier",
            label: tierLabel,
            context: domainLabel,
            href: tierHref,
            search: norm(domainLabel + " " + tierLabel + " " + group),
          });
        });
      });
    });
    return items;
  }

  // ---- Inject CSS (gói gọn trong file này, không đụng viz-base.css) ----
  function injectStyle() {
    if (document.getElementById("menu-palette-style")) return;
    var css = `
    .mp-btn {
      position: fixed; left: 24px; bottom: 24px; z-index: 9000;
      display: inline-flex; align-items: center; gap: 8px;
      padding: 10px 16px; border: none; border-radius: 24px;
      background: #2d3748; color: #fff; font-size: 14px; font-weight: 600;
      font-family: inherit; cursor: pointer;
      box-shadow: 0 4px 14px rgba(0,0,0,0.25);
      transition: background 0.15s, transform 0.15s;
    }
    .mp-btn:hover { background: #1a202c; transform: translateY(-1px); }
    .mp-btn kbd {
      font: inherit; font-size: 11px; font-weight: 700;
      background: rgba(255,255,255,0.18); border-radius: 4px; padding: 1px 6px;
    }
    .mp-overlay {
      position: fixed; inset: 0; z-index: 9001; display: none;
      background: rgba(15,23,42,0.45); backdrop-filter: blur(2px);
      align-items: flex-start; justify-content: center;
      padding: 10vh 16px 16px;
    }
    .mp-overlay.open { display: flex; }
    .mp-panel {
      width: 100%; max-width: 620px; background: #fff; border-radius: 14px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.35); overflow: hidden;
      display: flex; flex-direction: column; max-height: 75vh;
    }
    .mp-search {
      width: 100%; border: none; border-bottom: 1px solid #e3e1dc;
      padding: 18px 20px; font-size: 17px; font-family: inherit; color: #1a1a1a;
      box-sizing: border-box; outline: none;
    }
    .mp-search::placeholder { color: #a0aec0; }
    .mp-list { overflow-y: auto; padding: 6px; margin: 0; list-style: none; }
    .mp-item {
      display: flex; align-items: baseline; gap: 10px;
      padding: 10px 14px; border-radius: 8px; cursor: pointer;
      text-decoration: none; color: #1a1a1a;
    }
    .mp-item .mp-label { font-weight: 600; font-size: 15px; }
    .mp-item .mp-ctx { font-size: 12px; color: #718096; margin-left: auto; padding-left: 12px; white-space: nowrap; }
    .mp-item .mp-tag {
      font-size: 10px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.04em; padding: 2px 6px; border-radius: 4px;
      background: #edf2f7; color: #4a5568; flex-shrink: 0;
    }
    .mp-item.tier .mp-tag { background: #ebf8ff; color: #2c5282; }
    .mp-item.active, .mp-item:hover { background: #f1f5f9; }
    .mp-empty { padding: 28px 20px; text-align: center; color: #a0aec0; font-size: 14px; }
    .mp-foot {
      border-top: 1px solid #e3e1dc; padding: 8px 16px; font-size: 12px; color: #718096;
      display: flex; gap: 16px; flex-wrap: wrap;
    }
    .mp-foot kbd {
      font: inherit; font-size: 11px; background: #edf2f7; border-radius: 4px;
      padding: 1px 5px; color: #4a5568;
    }
    @media (max-width: 768px) {
      .mp-btn { left: 16px; bottom: calc(80px + env(safe-area-inset-bottom, 0px)); font-size: 15px; }
      .mp-overlay { padding: 6vh 10px 10px; }
      .mp-search { font-size: 16px; padding: 16px; }
      .mp-item .mp-label { font-size: 16px; }
      .mp-item .mp-ctx { display: none; }
      .mp-foot { display: none; }
    }`;
    var st = document.createElement("style");
    st.id = "menu-palette-style";
    st.textContent = css;
    document.head.appendChild(st);
  }

  // ---- Dựng UI ----
  function build() {
    injectStyle();
    var items = buildIndex();
    if (!items.length) return; // không phải trang index → bỏ qua

    var btn = document.createElement("button");
    btn.className = "mp-btn";
    btn.type = "button";
    var isMac = /Mac|iPhone|iPad/.test(navigator.platform);
    btn.innerHTML = '📂 Mục lục <kbd>' + (isMac ? "⌘K" : "Ctrl K") + "</kbd>";

    var overlay = document.createElement("div");
    overlay.className = "mp-overlay";
    overlay.innerHTML =
      '<div class="mp-panel" role="dialog" aria-label="Mục lục">' +
      '<input class="mp-search" type="text" placeholder="Tìm lĩnh vực hoặc tier… (vd: graph, dp, phat am)" autocomplete="off" spellcheck="false">' +
      '<ul class="mp-list"></ul>' +
      '<div class="mp-foot"><span><kbd>↑</kbd><kbd>↓</kbd> chọn</span><span><kbd>↵</kbd> mở</span><span><kbd>esc</kbd> đóng</span></div>' +
      "</div>";

    document.body.appendChild(btn);
    document.body.appendChild(overlay);

    var search = overlay.querySelector(".mp-search");
    var list = overlay.querySelector(".mp-list");
    var active = 0;
    var filtered = items;

    function render() {
      var q = norm(search.value);
      filtered = q
        ? items.filter(function (it) {
            // mỗi token trong query phải xuất hiện trong chuỗi search
            return q.split(" ").every(function (t) {
              return it.search.indexOf(t) !== -1;
            });
          })
        : items;
      if (active >= filtered.length) active = 0;

      if (!filtered.length) {
        list.innerHTML = '<div class="mp-empty">Không tìm thấy mục nào.</div>';
        return;
      }
      var html = "";
      filtered.forEach(function (it, i) {
        html +=
          '<a class="mp-item ' + it.kind + (i === active ? " active" : "") + '" href="' +
          it.href + '" data-i="' + i + '">' +
          '<span class="mp-tag">' + (it.kind === "domain" ? "Lĩnh vực" : "Tier") + "</span>" +
          '<span class="mp-label">' + it.label + "</span>" +
          '<span class="mp-ctx">' + it.context + "</span>" +
          "</a>";
      });
      list.innerHTML = html;
    }

    function scrollActiveIntoView() {
      var el = list.querySelector(".mp-item.active");
      if (el) el.scrollIntoView({ block: "nearest" });
    }

    function setActive(i) {
      if (!filtered.length) return;
      active = (i + filtered.length) % filtered.length;
      list.querySelectorAll(".mp-item").forEach(function (el, idx) {
        el.classList.toggle("active", idx === active);
      });
      scrollActiveIntoView();
    }

    function open() {
      overlay.classList.add("open");
      search.value = "";
      active = 0;
      render();
      search.focus();
    }
    function close() {
      overlay.classList.remove("open");
    }
    function isOpen() {
      return overlay.classList.contains("open");
    }
    function go() {
      if (filtered.length) window.location.href = filtered[active].href;
    }

    btn.addEventListener("click", open);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) close();
    });
    search.addEventListener("input", function () {
      active = 0;
      render();
    });
    list.addEventListener("mousemove", function (e) {
      var item = e.target.closest(".mp-item");
      if (item) setActive(parseInt(item.dataset.i, 10));
    });
    // Click trên item dùng href mặc định của <a> — không cần handler riêng.

    search.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); setActive(active + 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setActive(active - 1); }
      else if (e.key === "Enter") { e.preventDefault(); go(); }
      else if (e.key === "Escape") { e.preventDefault(); close(); }
    });

    document.addEventListener("keydown", function (e) {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        isOpen() ? close() : open();
      } else if (e.key === "Escape" && isOpen()) {
        close();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
