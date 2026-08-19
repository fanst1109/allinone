// ja-reader.js — Kana/Romaji Reader cho visualization.html của lĩnh vực Japanese.
//
// Cách dùng: thêm trước </body> trong viz Japanese (SAU viz-toc.js):
//   <script src="../../../tools/ja-reader.js"></script>
//
// Script tự inject (chỉ khi path chứa /Japanese/):
//   - Nút floating "🗾 Đọc Nhật" góc dưới-trái.
//   - Panel: nhập text Nhật → "Phân tích" → hiển thị từng cụm + romaji bên dưới,
//     click cụm để nghe (Web Speech ja-JP). Nút "▶ Đọc cả đoạn".
//
// Kana → romaji: bảng đầy đủ (hiragana + katakana + dakuten/handakuten + yōon +
//   sokuon っ + trường âm ー) — KHÔNG cần dict. Katakana chuẩn hoá về hiragana
//   qua offset codepoint (0x60) rồi tra chung một bảng.
// Kanji: dict nhỏ (~N5) chỉ để HIỂN THỊ romaji gần đúng; Web Speech đọc được
//   MỌI text (kể cả kanji) không cần dict.
//
// Phụ thuộc: Web Speech API (built-in trình duyệt).
(function () {
  'use strict';
  if (!/\/Japanese\//i.test(location.pathname)) return;

  // ── Bảng kana (hiragana làm gốc) ──
  var HIRA = {
    'あ':'a','い':'i','う':'u','え':'e','お':'o',
    'か':'ka','き':'ki','く':'ku','け':'ke','こ':'ko',
    'さ':'sa','し':'shi','す':'su','せ':'se','そ':'so',
    'た':'ta','ち':'chi','つ':'tsu','て':'te','と':'to',
    'な':'na','に':'ni','ぬ':'nu','ね':'ne','の':'no',
    'は':'ha','ひ':'hi','ふ':'fu','へ':'he','ほ':'ho',
    'ま':'ma','み':'mi','む':'mu','め':'me','も':'mo',
    'や':'ya','ゆ':'yu','よ':'yo',
    'ら':'ra','り':'ri','る':'ru','れ':'re','ろ':'ro',
    'わ':'wa','ゐ':'wi','ゑ':'we','を':'wo','ん':'n',
    'が':'ga','ぎ':'gi','ぐ':'gu','げ':'ge','ご':'go',
    'ざ':'za','じ':'ji','ず':'zu','ぜ':'ze','ぞ':'zo',
    'だ':'da','ぢ':'ji','づ':'zu','で':'de','ど':'do',
    'ば':'ba','び':'bi','ぶ':'bu','べ':'be','ぼ':'bo',
    'ぱ':'pa','ぴ':'pi','ぷ':'pu','ぺ':'pe','ぽ':'po',
    'ぁ':'a','ぃ':'i','ぅ':'u','ぇ':'e','ぉ':'o',
    'ゔ':'vu'
  };
  var YOON = {
    'きゃ':'kya','きゅ':'kyu','きょ':'kyo','しゃ':'sha','しゅ':'shu','しょ':'sho',
    'ちゃ':'cha','ちゅ':'chu','ちょ':'cho','にゃ':'nya','にゅ':'nyu','にょ':'nyo',
    'ひゃ':'hya','ひゅ':'hyu','ひょ':'hyo','みゃ':'mya','みゅ':'myu','みょ':'myo',
    'りゃ':'rya','りゅ':'ryu','りょ':'ryo','ぎゃ':'gya','ぎゅ':'gyu','ぎょ':'gyo',
    'じゃ':'ja','じゅ':'ju','じょ':'jo','びゃ':'bya','びゅ':'byu','びょ':'byo',
    'ぴゃ':'pya','ぴゅ':'pyu','ぴょ':'pyo'
  };
  // ── Dict kanji/từ nhỏ (~N5) — CHỈ để hiển thị romaji gần đúng ──
  var DICT = {
    '日本':'nihon','日本語':'nihongo','大学':'daigaku','学校':'gakkou','学生':'gakusei',
    '先生':'sensei','名前':'namae','電話':'denwa','会社':'kaisha','今日':'kyou','明日':'ashita',
    '昨日':'kinou','毎日':'mainichi','時間':'jikan','火山':'kazan',
    '人':'hito','日':'hi','月':'tsuki','火':'hi','水':'mizu','木':'ki','金':'kane','土':'tsuchi',
    '山':'yama','川':'kawa','大':'oo','小':'ko','中':'naka','上':'ue','下':'shita','左':'hidari',
    '右':'migi','前':'mae','後':'ushiro','私':'watashi','男':'otoko','女':'onna','子':'ko',
    '父':'chichi','母':'haha','友':'tomo','本':'hon','車':'kuruma','年':'toshi','時':'ji',
    '分':'fun','半':'han','今':'ima','何':'nani','気':'ki','好':'su','語':'go','国':'kuni',
    '一':'ichi','二':'ni','三':'san','四':'shi','五':'go','六':'roku','七':'shichi','八':'hachi',
    '九':'kyuu','十':'juu','百':'hyaku','千':'sen','万':'man','円':'en',
    '行':'i','来':'ku','見':'mi','食':'ta','飲':'no','聞':'ki','話':'hana','読':'yo','書':'ka',
    '雨':'ame','天':'ten','空':'sora','週':'shuu','曜':'you'
  };

  function kata2hira(ch) {
    var c = ch.charCodeAt(0);
    if (c >= 0x30A1 && c <= 0x30F6) return String.fromCharCode(c - 0x60);
    return ch;
  }
  function isKanaChar(ch) {
    var c = ch.charCodeAt(0);
    return (c >= 0x3041 && c <= 0x3096) || (c >= 0x30A1 && c <= 0x30FC);
  }
  function isKanji(ch) {
    var c = ch.charCodeAt(0);
    return c >= 0x4E00 && c <= 0x9FFF;
  }
  var VOWEL = { a:1, i:1, u:1, e:1, o:1 };

  // Chuyển một cụm kana → romaji (xử lý yōon, sokuon っ, trường âm ー).
  function toRomaji(s) {
    var out = '', last = '', pend = false, i = 0;
    while (i < s.length) {
      var raw = s[i];
      // trường âm ー (chōon) → lặp nguyên âm cuối
      if (raw === 'ー' || raw === '～') { out += last; i++; continue; }
      var h = kata2hira(raw);
      // sokuon っ → gấp đôi phụ âm kế
      if (h === 'っ') { pend = true; i++; continue; }
      var rom = null, adv = 1;
      var h2 = i + 1 < s.length ? kata2hira(s[i + 1]) : '';
      if ((h2 === 'ゃ' || h2 === 'ゅ' || h2 === 'ょ') && YOON[h + h2]) { rom = YOON[h + h2]; adv = 2; }
      else if (HIRA[h] != null) rom = HIRA[h];
      else rom = raw; // ký tự lạ: giữ nguyên
      if (pend && rom && !VOWEL[rom[0]]) { rom = rom[0] + rom; pend = false; }
      else if (pend) { pend = false; }
      out += rom;
      last = rom ? rom[rom.length - 1] : '';
      i += adv;
    }
    return out;
  }

  // Tách text → tokens {t:'kana'|'kanji'|'punct', text, romaji}
  function tokenize(s) {
    var toks = [], i = 0, n = s.length;
    while (i < n) {
      var ch = s[i];
      if (isKanaChar(ch)) {
        var j = i; while (j < n && isKanaChar(s[j])) j++;
        var run = s.slice(i, j);
        toks.push({ t: 'kana', text: run, romaji: toRomaji(run) });
        i = j;
      } else if (isKanji(ch)) {
        var m = null, len = 0;
        for (var L = 4; L >= 1; L--) { var sub = s.substr(i, L); if (DICT[sub]) { m = DICT[sub]; len = L; break; } }
        if (m) { toks.push({ t: 'kanji', text: s.substr(i, len), romaji: m }); i += len; }
        else { toks.push({ t: 'kanji', text: ch, romaji: '—', miss: true }); i++; }
      } else {
        toks.push({ t: 'punct', text: ch });
        i++;
      }
    }
    return toks;
  }

  // ── Web Speech (robust: resume() chống auto-suspend + chờ voices nạp) ──
  function jaSpeak(text, rate) {
    if (!window.speechSynthesis || !text) return;
    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = 'ja-JP'; u.rate = rate || 0.85;
    function fire() {
      var vs = window.speechSynthesis.getVoices();
      var v = vs.find(function (x) { return x.lang === 'ja-JP'; }) || vs.find(function (x) { return x.lang && x.lang.indexOf('ja') === 0; });
      if (v) u.voice = v;
      try { window.speechSynthesis.resume(); } catch (e) {}
      window.speechSynthesis.speak(u);
    }
    if (!window.speechSynthesis.getVoices().length) {
      var done = false, go = function () { if (done) return; done = true; fire(); };
      window.speechSynthesis.addEventListener('voiceschanged', go, { once: true });
      window.speechSynthesis.getVoices();
      setTimeout(go, 350);
    } else fire();
  }

  // ── UI ──
  var LS_OPEN = 'jrOpen', LS_TEXT = 'jrText';
  var STYLE = `
    .jr-btn { position: fixed; left: 24px; z-index: 200;
      bottom: calc(24px + env(safe-area-inset-bottom, 0px));
      background: #9333ea; color: #fff; border: none; cursor: pointer;
      padding: 12px 18px; border-radius: 28px; font-weight: 700; font-size: 14px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25); user-select: none;
      transition: transform .15s, background .15s, opacity .2s;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    .jr-btn:hover { transform: translateY(-2px); background: #7e22ce; }
    .jr-btn.jr-hidden { opacity: 0; pointer-events: none; transform: translateY(8px); }
    .jr-panel { position: fixed; left: 24px; z-index: 210;
      bottom: calc(80px + env(safe-area-inset-bottom, 0px));
      width: 380px; max-width: calc(100vw - 48px); max-height: 74vh;
      background: #fff; border-radius: 12px; box-shadow: 0 6px 24px rgba(0,0,0,0.22);
      display: none; flex-direction: column; overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    .jr-panel.jr-open { display: flex; }
    .jr-head { background: #9333ea; color: #fff; padding: 10px 14px; font-weight: 700; font-size: 14px;
      display: flex; justify-content: space-between; align-items: center; }
    .jr-close { background: rgba(255,255,255,.18); color: #fff; border: none; width: 26px; height: 26px;
      border-radius: 50%; cursor: pointer; font-size: 14px; line-height: 1; }
    .jr-close:hover { background: rgba(255,255,255,.34); }
    .jr-body { padding: 12px 14px; overflow-y: auto; }
    .jr-ta { width: 100%; box-sizing: border-box; min-height: 60px; resize: vertical;
      border: 1px solid #d6bcfa; border-radius: 8px; padding: 8px; font-size: 15px; font-family: inherit; }
    .jr-row { display: flex; gap: 8px; margin-top: 8px; flex-wrap: wrap; }
    .jr-row button { border: none; border-radius: 8px; padding: 8px 14px; font-weight: 700; font-size: 13px; cursor: pointer; }
    .jr-analyze { background: #9333ea; color: #fff; } .jr-analyze:hover { background: #7e22ce; }
    .jr-speak { background: #f3e8ff; color: #7e22ce; } .jr-speak:hover { background: #e9d5ff; }
    .jr-status { font-size: 12px; color: #718096; margin-top: 8px; }
    .jr-out { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; align-items: flex-end; }
    .jr-word { display: inline-flex; flex-direction: column; align-items: center; cursor: pointer;
      border: 1px solid #e9d5ff; border-radius: 8px; padding: 5px 8px; background: #faf5ff; transition: background .12s; }
    .jr-word:hover { background: #f3e8ff; }
    .jr-word .jr-t { font-size: 19px; color: #1a202c; line-height: 1.1; }
    .jr-word .jr-r { font-size: 11px; color: #7e22ce; margin-top: 2px; }
    .jr-word.jr-miss .jr-r { color: #b7791f; }
    .jr-punct { align-self: center; font-size: 18px; color: #4a5568; padding: 0 2px; }
    .jr-note { font-size: 11px; color: #a0aec0; margin-top: 10px; line-height: 1.5; }
    @media (max-width: 700px) {
      .jr-btn { bottom: calc(80px + env(safe-area-inset-bottom, 0px)); left: 12px; padding: 9px 14px; font-size: 13px; }
      .jr-panel { left: 12px; width: calc(100vw - 24px); bottom: calc(136px + env(safe-area-inset-bottom, 0px)); }
    }
  `;

  function el(tag, attrs, kids) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) { if (k === 'class') e.className = attrs[k]; else if (k === 'html') e.innerHTML = attrs[k]; else e.setAttribute(k, attrs[k]); }
    (kids || []).forEach(function (c) { e.appendChild(c); });
    return e;
  }

  function init() {
    var style = document.createElement('style'); style.textContent = STYLE; document.head.appendChild(style);

    var btn = el('button', { class: 'jr-btn', type: 'button' }); btn.textContent = '🗾 Đọc Nhật';
    var closeBtn = el('button', { class: 'jr-close', type: 'button', 'aria-label': 'Đóng' }); closeBtn.textContent = '✕';
    var head = el('div', { class: 'jr-head' }, [ (function () { var s = document.createElement('span'); s.textContent = '🗾 Đọc tiếng Nhật'; return s; })(), closeBtn ]);
    var ta = el('textarea', { class: 'jr-ta', placeholder: 'Nhập text tiếng Nhật, vd: 私は学生です。ねこがすきです。' });
    try { var saved = localStorage.getItem(LS_TEXT); if (saved) ta.value = saved; } catch (e) {}
    var analyzeBtn = el('button', { class: 'jr-analyze', type: 'button' }); analyzeBtn.textContent = 'Phân tích';
    var speakBtn = el('button', { class: 'jr-speak', type: 'button' }); speakBtn.textContent = '▶ Đọc cả đoạn';
    var row = el('div', { class: 'jr-row' }, [analyzeBtn, speakBtn]);
    var status = el('div', { class: 'jr-status' });
    var out = el('div', { class: 'jr-out' });
    var note = el('div', { class: 'jr-note', html: 'Kana → romaji chính xác. Kanji hiển thị romaji <em>gần đúng</em> (cách đọc tuỳ ngữ cảnh) — bấm để nghe phát âm chuẩn.' });
    var body = el('div', { class: 'jr-body' }, [ta, row, status, out, note]);
    var panel = el('div', { class: 'jr-panel' }, [head, body]);
    document.body.appendChild(btn); document.body.appendChild(panel);

    function analyze() {
      var text = ta.value.trim();
      out.innerHTML = '';
      if (!text) { status.textContent = 'Nhập text trước khi phân tích.'; return; }
      try { localStorage.setItem(LS_TEXT, text); } catch (e) {}
      var toks = tokenize(text), words = 0;
      toks.forEach(function (tk) {
        if (tk.t === 'punct') {
          if (/\S/.test(tk.text)) { var p = el('span', { class: 'jr-punct' }); p.textContent = tk.text; out.appendChild(p); }
          return;
        }
        words++;
        var w = el('div', { class: 'jr-word' + (tk.miss ? ' jr-miss' : '') });
        var t = el('div', { class: 'jr-t' }); t.textContent = tk.text;
        var r = el('div', { class: 'jr-r' }); r.textContent = tk.romaji;
        w.appendChild(t); w.appendChild(r);
        w.addEventListener('click', function () { jaSpeak(tk.text); });
        out.appendChild(w);
      });
      status.textContent = words + ' cụm — bấm từng cụm để nghe.';
    }
    analyzeBtn.addEventListener('click', analyze);
    speakBtn.addEventListener('click', function () { var t = ta.value.trim(); if (t) jaSpeak(t); });

    function open() { panel.classList.add('jr-open'); btn.classList.add('jr-hidden'); try { localStorage.setItem(LS_OPEN, '1'); } catch (e) {} }
    function close() { panel.classList.remove('jr-open'); btn.classList.remove('jr-hidden'); if (window.speechSynthesis) window.speechSynthesis.cancel(); try { localStorage.setItem(LS_OPEN, '0'); } catch (e) {} }
    btn.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    if (localStorage.getItem(LS_OPEN) === '1') { open(); if (ta.value.trim()) analyze(); }

    if (window.speechSynthesis && window.speechSynthesis.getVoices) window.speechSynthesis.getVoices();
    window.addEventListener('pagehide', function () { if (window.speechSynthesis) window.speechSynthesis.cancel(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
