// ipa-reader.js — Floating IPA Reader widget cho visualization.html.
//
// Cách dùng (thêm trước </body> trong viz, SAU readme-modal nếu có):
//   <script src="../../tools/ipa-reader.js"></script>
//
// Hành vi:
//   - Tự inject nút floating "🔤 IPA" ở góc dưới-TRÁI (đối xứng với
//     "📖 Đọc README" góc dưới-PHẢI của readme-modal).
//   - Click → mở floating panel ~380px nổi đè lên trang, KHÔNG backdrop,
//     KHÔNG đẩy body. Người đọc vẫn scroll/click trang dưới như bình thường.
//   - Panel có header để kéo di chuyển; có nút minimize (ẩn về button) và
//     close (đóng hoàn toàn). Vị trí panel + lựa chọn US/UK + text gần nhất
//     được lưu vào localStorage.
//   - Lazy-load tools/ipa-dict.js (~4.6MB) chỉ khi user mở panel lần đầu —
//     không ảnh hưởng tốc độ load lesson.
//
// Tính năng:
//   - Nhập đoạn text → bấm "Phân tích" → hiển thị từng từ + IPA bên dưới.
//   - Toggle US 🇺🇸 / UK 🇬🇧 (mặc định US, sync với localStorage key
//     "audioVariant" — đồng bộ với các viz English khác).
//   - Click vào 1 từ → phát TTS riêng từ đó.
//   - Nút ▶ "Đọc cả đoạn" → TTS toàn bộ text qua Web Speech API.
//   - Slider tốc độ TTS (0.6x – 1.4x).
//   - Từ không có trong dict → IPA hiển thị "[?]" và đánh dấu vàng.
//
// Phụ thuộc: Web Speech API (built-in mọi browser hiện đại). Không cần
// internet sau khi đã load ipa-dict.js.

(function () {
  'use strict';

  // Chỉ inject trong English/ (xem CLAUDE.md). Path check: visualization
  // nằm ở English/lesson-XX-yyy/visualization.html.
  if (!/\/English\//i.test(location.pathname) && !/\\English\\/i.test(location.pathname)) {
    return;
  }

  var LS_POS_KEY     = 'ipaReaderPos';
  var LS_TEXT_KEY    = 'ipaReaderText';
  var LS_VAR_KEY     = 'audioVariant'; // dùng chung với các viz English khác
  var LS_RATE_KEY    = 'ipaReaderRate';
  var LS_OPEN_KEY    = 'ipaReaderOpen'; // '1' nếu panel đang mở — khôi phục khi sang lesson khác

  // Đường dẫn tới ipa-dict.js: cùng thư mục với script này.
  // Lấy bằng cách đọc currentScript src.
  var SCRIPT_SRC = (document.currentScript && document.currentScript.src) || '';
  var DICT_URL = SCRIPT_SRC.replace(/ipa-reader\.js(\?.*)?$/, 'ipa-dict.js');

  var STYLE = `
    .ipa-btn {
      position: fixed; left: 24px; z-index: 200;
      bottom: calc(24px + env(safe-area-inset-bottom, 0px));
      background: #2c5282; color: white;
      padding: 12px 20px; border-radius: 28px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
      cursor: pointer; font-weight: 700; font-size: 14px;
      border: none; user-select: none;
      transition: transform 0.15s, background 0.15s, opacity 0.2s;
      font-family: inherit;
    }
    .ipa-btn:hover { transform: translateY(-2px); background: #1e3a5f; }
    .ipa-btn.ipa-hidden { opacity: 0; pointer-events: none; transform: translateY(8px); }

    .ipa-panel {
      position: fixed; z-index: 210;
      width: 400px; max-width: calc(100vw - 32px);
      max-height: calc(100vh - 48px);
      background: white; border-radius: 10px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.28), 0 0 0 1px rgba(0,0,0,0.06);
      display: none; flex-direction: column;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      overflow: hidden;
    }
    .ipa-panel.ipa-open { display: flex; }

    .ipa-header {
      background: #2c5282; color: white;
      padding: 10px 12px;
      display: flex; align-items: center; gap: 8px;
      cursor: grab; user-select: none;
      flex-shrink: 0;
    }
    .ipa-header.ipa-dragging { cursor: grabbing; }
    .ipa-header .ipa-title {
      font-weight: 700; font-size: 14px; flex: 1;
      pointer-events: none;
    }
    .ipa-header button {
      background: rgba(255,255,255,0.15); color: white;
      border: none; width: 26px; height: 26px;
      border-radius: 50%; cursor: pointer; font-size: 14px;
      font-family: inherit; line-height: 1; padding: 0;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.15s;
    }
    .ipa-header button:hover { background: rgba(255,255,255,0.32); }

    .ipa-body {
      padding: 12px; overflow-y: auto; flex: 1;
      font-size: 13px; color: #1f2328;
    }

    .ipa-controls {
      display: flex; flex-wrap: wrap; gap: 6px; align-items: center;
      margin-bottom: 8px;
    }
    .ipa-variant-toggle {
      display: inline-flex; border: 1px solid #cbd5e0; border-radius: 6px;
      overflow: hidden;
    }
    .ipa-variant-toggle button {
      background: white; border: none; padding: 4px 10px;
      font-size: 12px; cursor: pointer; font-family: inherit;
      color: #2d3748; transition: background 0.12s;
    }
    .ipa-variant-toggle button.ipa-active {
      background: #2c5282; color: white; font-weight: 700;
    }
    .ipa-variant-toggle button:not(.ipa-active):hover { background: #f1f5f9; }

    .ipa-rate {
      display: flex; align-items: center; gap: 4px;
      font-size: 12px; color: #4a5568;
    }
    .ipa-rate input[type=range] { width: 80px; }
    .ipa-rate-val { font-weight: 700; min-width: 28px; }

    .ipa-textarea {
      width: 100%; box-sizing: border-box;
      min-height: 70px; max-height: 140px; resize: vertical;
      padding: 8px; border: 1px solid #cbd5e0; border-radius: 6px;
      font-family: inherit; font-size: 13px;
      line-height: 1.4;
    }
    .ipa-textarea:focus { outline: 2px solid #4299e1; outline-offset: -1px; border-color: #4299e1; }

    .ipa-actions {
      display: flex; gap: 6px; margin-top: 6px;
    }
    .ipa-actions button {
      flex: 1; padding: 7px 10px; font-size: 13px; font-weight: 600;
      border: none; border-radius: 6px; cursor: pointer;
      font-family: inherit;
      transition: background 0.12s, transform 0.08s;
    }
    .ipa-actions .ipa-analyze {
      background: #2c5282; color: white;
    }
    .ipa-actions .ipa-analyze:hover { background: #1e3a5f; }
    .ipa-actions .ipa-analyze:disabled { background: #a0aec0; cursor: wait; }
    .ipa-actions .ipa-speak {
      background: #38a169; color: white;
    }
    .ipa-actions .ipa-speak:hover { background: #2f855a; }
    .ipa-actions .ipa-speak.ipa-stopping { background: #c53030; }
    .ipa-actions .ipa-speak.ipa-stopping:hover { background: #9b2c2c; }
    .ipa-actions button:disabled { opacity: 0.5; cursor: not-allowed; }

    .ipa-status {
      font-size: 11px; color: #718096; margin-top: 6px; min-height: 14px;
    }
    .ipa-status.ipa-err { color: #c53030; }

    .ipa-output {
      margin-top: 10px; padding-top: 10px;
      border-top: 1px dashed #e2e8f0;
      display: flex; flex-wrap: wrap; gap: 6px 8px;
      line-height: 1.6;
    }
    .ipa-word {
      display: inline-flex; flex-direction: column; align-items: center;
      padding: 4px 6px; border-radius: 5px; cursor: pointer;
      background: #f7fafc; border: 1px solid transparent;
      transition: background 0.12s, border-color 0.12s, transform 0.08s;
      min-width: 0;
    }
    .ipa-word:hover { background: #e6f0fa; border-color: #bee3f8; }
    .ipa-word.ipa-playing { background: #fef3c7; border-color: #f59e0b; }
    .ipa-word-text { font-weight: 600; color: #2d3748; font-size: 13px; }
    .ipa-word-ipa {
      font-family: "Charis SIL", "Doulos SIL", "Lucida Sans Unicode", sans-serif;
      font-size: 12px; color: #2c5282; margin-top: 1px;
    }
    .ipa-word.ipa-miss .ipa-word-ipa { color: #b7791f; }
    .ipa-word.ipa-miss { background: #fffbeb; }

    .ipa-punct {
      color: #a0aec0; align-self: flex-end; padding: 0 2px;
      font-size: 13px; user-select: none;
    }

    .ipa-empty {
      color: #a0aec0; font-style: italic; font-size: 12px;
      padding: 12px 0; text-align: center;
    }

    @media (max-width: 480px) {
      /* Bump nút lên trên Chrome iOS / Safari tab bar */
      .ipa-btn { bottom: calc(80px + env(safe-area-inset-bottom, 0px)); left: 12px; padding: 9px 14px; font-size: 13px; }
      .ipa-panel { width: calc(100vw - 24px); left: 12px; bottom: calc(136px + env(safe-area-inset-bottom, 0px)); }
      .ipa-input { font-size: 14px; padding: 10px 12px; }
      .ipa-controls button { font-size: 14px; padding: 9px 12px; }
      .ipa-word-text { font-size: 14px; }
      .ipa-word-ipa { font-size: 13px; }
    }
  `;

  function $(tag, attrs, children) {
    var el = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === 'class') el.className = attrs[k];
        else if (k === 'html') el.innerHTML = attrs[k];
        else el.setAttribute(k, attrs[k]);
      });
    }
    if (children) {
      children.forEach(function (c) {
        if (typeof c === 'string') el.appendChild(document.createTextNode(c));
        else if (c) el.appendChild(c);
      });
    }
    return el;
  }

  // ── Dict lazy-load ──
  var dictPromise = null;
  function loadDict() {
    if (window.IPA_DICT) return Promise.resolve(window.IPA_DICT);
    if (dictPromise) return dictPromise;
    dictPromise = new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = DICT_URL;
      s.onload = function () {
        if (window.IPA_DICT) resolve(window.IPA_DICT);
        else reject(new Error('ipa-dict.js loaded nhưng không có window.IPA_DICT'));
      };
      s.onerror = function () {
        reject(new Error('Không load được ' + DICT_URL));
      };
      document.head.appendChild(s);
    });
    return dictPromise;
  }

  function lookup(word, variant) {
    if (!window.IPA_DICT) return null;
    var raw = window.IPA_DICT[word.toLowerCase()];
    if (!raw) return null;
    if (raw.indexOf('|') === -1) return raw; // US == UK
    var parts = raw.split('|');
    var us = parts[0];
    var uk = parts[1];
    if (variant === 'uk') return uk || us;
    return us || uk;
  }

  // Tokenize text thành mảng { kind: 'word'|'punct', text }.
  // Giữ punctuation để hiển thị tự nhiên.
  function tokenize(text) {
    var tokens = [];
    var re = /([A-Za-z][A-Za-z'\-]*)|([^\sA-Za-z]+)|(\s+)/g;
    var m;
    while ((m = re.exec(text)) !== null) {
      if (m[1]) tokens.push({ kind: 'word', text: m[1] });
      else if (m[2]) tokens.push({ kind: 'punct', text: m[2] });
      // bỏ qua whitespace (m[3]) — flex layout tự xử lý
    }
    return tokens;
  }

  // ── TTS ──
  function pickVoice(variant) {
    if (!window.speechSynthesis) return null;
    var voices = window.speechSynthesis.getVoices();
    if (!voices.length) return null;
    var lang = variant === 'uk' ? 'en-GB' : 'en-US';
    // Ưu tiên natural/enhanced/premium
    var prefer = ['premium', 'enhanced', 'natural', 'neural'];
    var matches = voices.filter(function (v) { return v.lang === lang; });
    if (!matches.length) {
      matches = voices.filter(function (v) { return v.lang && v.lang.indexOf('en') === 0; });
    }
    for (var i = 0; i < prefer.length; i++) {
      var p = prefer[i];
      var hit = matches.find(function (v) { return v.name.toLowerCase().indexOf(p) !== -1; });
      if (hit) return hit;
    }
    return matches[0] || null;
  }

  function speak(text, variant, rate, onEnd) {
    if (!window.speechSynthesis) {
      alert('Trình duyệt không hỗ trợ Web Speech API.');
      if (onEnd) onEnd();
      return null;
    }
    // Chỉ cancel khi engine đang bận — cancel() rồi speak() ngay lúc rảnh khiến
    // Chrome trễ/bỏ qua lần phát đầu (cảm giác "đọc chậm").
    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      window.speechSynthesis.cancel();
    }
    var u = new SpeechSynthesisUtterance(text);
    u.lang = variant === 'uk' ? 'en-GB' : 'en-US';
    u.rate = rate || 1.0;
    var v = pickVoice(variant);
    if (v) u.voice = v;
    u.onend = function () { if (onEnd) onEnd(); };
    u.onerror = function () { if (onEnd) onEnd(); };
    window.speechSynthesis.speak(u);
    return u;
  }

  // ── Drag ──
  function makeDraggable(panel, header) {
    var dx = 0, dy = 0, startX = 0, startY = 0, dragging = false;
    header.addEventListener('mousedown', function (e) {
      if (e.target.tagName === 'BUTTON') return;
      dragging = true;
      header.classList.add('ipa-dragging');
      var rect = panel.getBoundingClientRect();
      startX = e.clientX; startY = e.clientY;
      dx = rect.left; dy = rect.top;
      panel.style.left = dx + 'px';
      panel.style.top = dy + 'px';
      panel.style.bottom = 'auto';
      panel.style.right = 'auto';
      e.preventDefault();
    });
    document.addEventListener('mousemove', function (e) {
      if (!dragging) return;
      var nx = dx + (e.clientX - startX);
      var ny = dy + (e.clientY - startY);
      // Clamp trong viewport.
      var maxX = window.innerWidth - panel.offsetWidth - 4;
      var maxY = window.innerHeight - 40;
      nx = Math.max(4, Math.min(maxX, nx));
      ny = Math.max(4, Math.min(maxY, ny));
      panel.style.left = nx + 'px';
      panel.style.top = ny + 'px';
    });
    document.addEventListener('mouseup', function () {
      if (!dragging) return;
      dragging = false;
      header.classList.remove('ipa-dragging');
      try {
        localStorage.setItem(LS_POS_KEY, JSON.stringify({
          left: panel.style.left, top: panel.style.top
        }));
      } catch (e) {}
    });
  }

  function restorePos(panel) {
    try {
      var raw = localStorage.getItem(LS_POS_KEY);
      if (!raw) return;
      var pos = JSON.parse(raw);
      if (pos && pos.left && pos.top) {
        // Validate trong viewport
        var l = parseInt(pos.left, 10);
        var t = parseInt(pos.top, 10);
        if (l >= 0 && t >= 0 && l < window.innerWidth - 100 && t < window.innerHeight - 40) {
          panel.style.left = pos.left;
          panel.style.top = pos.top;
          panel.style.bottom = 'auto';
          panel.style.right = 'auto';
        }
      }
    } catch (e) {}
  }

  // ── Init ──
  function init() {
    if (document.getElementById('ipa-panel')) return;

    var styleTag = document.createElement('style');
    styleTag.id = 'ipa-reader-styles';
    styleTag.textContent = STYLE;
    document.head.appendChild(styleTag);

    var btn = $('button', { class: 'ipa-btn', id: 'ipa-btn', type: 'button' });
    btn.textContent = '🔤 IPA';

    // Variant từ localStorage (sync với viz English khác)
    var variant = localStorage.getItem(LS_VAR_KEY) || 'us';
    if (variant !== 'us' && variant !== 'uk') variant = 'us';

    var rate = parseFloat(localStorage.getItem(LS_RATE_KEY)) || 1.0;
    if (isNaN(rate) || rate < 0.6 || rate > 1.4) rate = 1.0;

    var panel = $('div', { class: 'ipa-panel', id: 'ipa-panel', 'aria-label': 'IPA Reader' });

    // Header
    var titleSpan = $('span', { class: 'ipa-title' }); titleSpan.textContent = '🔤 IPA Reader';
    var minBtn = $('button', { type: 'button', title: 'Thu nhỏ' }); minBtn.textContent = '–';
    var closeBtn = $('button', { type: 'button', title: 'Đóng' }); closeBtn.textContent = '✕';
    var header = $('div', { class: 'ipa-header' }, [titleSpan, minBtn, closeBtn]);

    // Body
    var usBtn = $('button', { type: 'button', 'data-v': 'us' }); usBtn.textContent = 'US 🇺🇸';
    var ukBtn = $('button', { type: 'button', 'data-v': 'uk' }); ukBtn.textContent = 'UK 🇬🇧';
    var variantToggle = $('div', { class: 'ipa-variant-toggle' }, [usBtn, ukBtn]);

    var rateSlider = $('input', { type: 'range', min: '0.6', max: '1.4', step: '0.1' });
    rateSlider.value = String(rate);
    var rateVal = $('span', { class: 'ipa-rate-val' }); rateVal.textContent = rate.toFixed(1) + 'x';
    var rateLabel = $('span'); rateLabel.textContent = '🔊';
    var rateBox = $('div', { class: 'ipa-rate' }, [rateLabel, rateSlider, rateVal]);

    var controls = $('div', { class: 'ipa-controls' }, [variantToggle, rateBox]);

    var ta = $('textarea', {
      class: 'ipa-textarea',
      placeholder: 'Nhập đoạn text tiếng Anh, ví dụ: She sells seashells by the seashore.'
    });
    ta.value = localStorage.getItem(LS_TEXT_KEY) || '';

    var analyzeBtn = $('button', { class: 'ipa-analyze', type: 'button' });
    analyzeBtn.textContent = '🔍 Phân tích IPA';
    var speakBtn = $('button', { class: 'ipa-speak', type: 'button' });
    speakBtn.textContent = '▶ Đọc cả đoạn';
    var actions = $('div', { class: 'ipa-actions' }, [analyzeBtn, speakBtn]);

    var status = $('div', { class: 'ipa-status' });
    var output = $('div', { class: 'ipa-output' });
    var empty = $('div', { class: 'ipa-empty' });
    empty.textContent = 'Bấm "Phân tích" để xem phiên âm. Click vào từ để nghe riêng.';
    output.appendChild(empty);

    var body = $('div', { class: 'ipa-body' }, [controls, ta, actions, status, output]);
    panel.appendChild(header);
    panel.appendChild(body);

    // Default anchor: bottom-left
    panel.style.left = '24px';
    panel.style.bottom = '24px';

    document.body.appendChild(btn);
    document.body.appendChild(panel);

    makeDraggable(panel, header);

    // ── Variant toggle ──
    function setVariant(v) {
      variant = v;
      usBtn.classList.toggle('ipa-active', v === 'us');
      ukBtn.classList.toggle('ipa-active', v === 'uk');
      try { localStorage.setItem(LS_VAR_KEY, v); } catch (e) {}
      // Refresh output nếu đã có
      if (output.dataset.tokens) {
        renderTokens(JSON.parse(output.dataset.tokens));
      }
    }
    usBtn.addEventListener('click', function () { setVariant('us'); });
    ukBtn.addEventListener('click', function () { setVariant('uk'); });
    setVariant(variant);

    // ── Rate slider ──
    rateSlider.addEventListener('input', function () {
      rate = parseFloat(rateSlider.value);
      rateVal.textContent = rate.toFixed(1) + 'x';
      try { localStorage.setItem(LS_RATE_KEY, String(rate)); } catch (e) {}
    });

    // ── Render output ──
    function renderTokens(tokens) {
      output.innerHTML = '';
      if (!tokens.length) {
        output.appendChild(empty);
        return;
      }
      output.dataset.tokens = JSON.stringify(tokens);
      tokens.forEach(function (tok) {
        if (tok.kind === 'punct') {
          var p = $('span', { class: 'ipa-punct' });
          p.textContent = tok.text;
          output.appendChild(p);
          return;
        }
        var ipa = lookup(tok.text, variant);
        var w = $('div', { class: 'ipa-word' + (ipa ? '' : ' ipa-miss'), title: ipa ? 'Click để nghe' : 'Không có trong từ điển' });
        var wt = $('div', { class: 'ipa-word-text' }); wt.textContent = tok.text;
        var wi = $('div', { class: 'ipa-word-ipa' });
        wi.textContent = ipa ? ('/' + ipa + '/') : '[?]';
        w.appendChild(wt);
        w.appendChild(wi);
        w.addEventListener('click', function () {
          // Bỏ playing class khỏi tất cả
          output.querySelectorAll('.ipa-word.ipa-playing').forEach(function (el) {
            el.classList.remove('ipa-playing');
          });
          w.classList.add('ipa-playing');
          speak(tok.text, variant, rate, function () {
            w.classList.remove('ipa-playing');
          });
        });
        output.appendChild(w);
      });
    }

    // ── Analyze ──
    analyzeBtn.addEventListener('click', function () {
      var text = ta.value.trim();
      if (!text) {
        status.textContent = 'Nhập text trước khi phân tích.';
        status.classList.add('ipa-err');
        return;
      }
      status.classList.remove('ipa-err');
      status.textContent = 'Đang tải từ điển IPA...';
      analyzeBtn.disabled = true;
      try { localStorage.setItem(LS_TEXT_KEY, text); } catch (e) {}

      loadDict().then(function () {
        var tokens = tokenize(text);
        var wordCount = tokens.filter(function (t) { return t.kind === 'word'; }).length;
        var missCount = tokens.filter(function (t) {
          return t.kind === 'word' && !lookup(t.text, variant);
        }).length;
        renderTokens(tokens);
        status.textContent = wordCount + ' từ' + (missCount ? ' (' + missCount + ' không có trong dict)' : '') + '.';
        analyzeBtn.disabled = false;
      }).catch(function (err) {
        status.textContent = 'Lỗi: ' + err.message;
        status.classList.add('ipa-err');
        analyzeBtn.disabled = false;
      });
    });

    // ── Speak whole text ──
    var speaking = false;
    function setSpeakingUI(on) {
      speaking = on;
      speakBtn.textContent = on ? '■ Dừng' : '▶ Đọc cả đoạn';
      speakBtn.classList.toggle('ipa-stopping', on);
    }
    speakBtn.addEventListener('click', function () {
      if (speaking) {
        window.speechSynthesis.cancel();
        setSpeakingUI(false);
        return;
      }
      var text = ta.value.trim();
      if (!text) {
        status.textContent = 'Nhập text trước khi đọc.';
        status.classList.add('ipa-err');
        return;
      }
      status.classList.remove('ipa-err');
      setSpeakingUI(true);
      speak(text, variant, rate, function () { setSpeakingUI(false); });
    });

    // ── Open / close / minimize ──
    function open() {
      panel.classList.add('ipa-open');
      btn.classList.add('ipa-hidden');
      restorePos(panel);
      try { localStorage.setItem(LS_OPEN_KEY, '1'); } catch (e) {}
    }
    function close() {
      panel.classList.remove('ipa-open');
      btn.classList.remove('ipa-hidden');
      if (speaking) {
        window.speechSynthesis.cancel();
        setSpeakingUI(false);
      }
      try { localStorage.setItem(LS_OPEN_KEY, '0'); } catch (e) {}
    }
    btn.addEventListener('click', open);
    minBtn.addEventListener('click', close);
    closeBtn.addEventListener('click', function () {
      close();
      // Đóng hẳn = xoá output để lần mở sau bắt đầu sạch
      output.innerHTML = '';
      output.appendChild(empty);
      delete output.dataset.tokens;
      status.textContent = '';
    });

    // Khôi phục trạng thái mở khi sang lesson khác (giống sidebar README).
    if (localStorage.getItem(LS_OPEN_KEY) === '1') open();

    // Warm-up voices (một số browser cần kích hoạt)
    if (window.speechSynthesis && typeof window.speechSynthesis.getVoices === 'function') {
      // Dọn hàng đợi còn sót từ trang trước → audio không "rớt" sang lesson mới.
      window.speechSynthesis.cancel();
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = function () { /* trigger cache */ };
      // Bấm Next/Prev sang lesson khác → dừng mọi audio đang phát.
      window.addEventListener('pagehide', function () {
        window.speechSynthesis.cancel();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
