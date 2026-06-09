// zh-reader.js — Floating Pinyin Reader widget cho visualization.html.
//
// Cách dùng (thêm trước </body> trong viz Chinese, SAU readme-modal):
//   <script src="../../tools/zh-reader.js"></script>
//
// Hành vi:
//   - Tự inject nút floating "🔊 Pinyin" ở góc dưới-TRÁI (đối xứng với
//     "📖 Đọc README" góc dưới-PHẢI của readme-modal).
//   - Click → mở floating panel ~400px nổi đè lên trang, KHÔNG backdrop.
//   - Nhập text (chữ Hán hoặc pinyin) → bấm "Phân tích" → hiển thị từng
//     ký tự + pinyin bên dưới (nếu là chữ Hán và có trong dict).
//   - Click vào 1 ký tự → Web Speech API phát âm thanh riêng cho ký tự đó.
//   - Nút ▶ "Đọc cả đoạn" → TTS toàn bộ text.
//   - Toggle 🇨🇳 zh-CN / 🇹🇼 zh-TW (mặc định zh-CN), lưu vào
//     localStorage key "zhVariant".
//   - Slider tốc độ 0.5x – 1.5x.
//   - Vị trí panel + variant + text gần nhất lưu vào localStorage.
//
// Phụ thuộc: Web Speech API (built-in browser). Pinyin dict embedded
// inline (~300 chữ Hán thường gặp + HSK 1-2). Mở rộng sau khi cần.

(function () {
  'use strict';

  // Chỉ inject trong Chinese/.
  if (!/\/Chinese\//i.test(location.pathname) && !/\\Chinese\\/i.test(location.pathname)) {
    return;
  }

  var LS_POS_KEY  = 'zhReaderPos';
  var LS_TEXT_KEY = 'zhReaderText';
  var LS_VAR_KEY  = 'zhVariant';      // 'zh-CN' (default) hoặc 'zh-TW'
  var LS_RATE_KEY = 'zhReaderRate';
  var LS_OPEN_KEY = 'zhReaderOpen';   // '1' nếu panel đang mở — để khôi phục khi sang lesson khác

  // ============================================================
  // Pinyin dict tối giản — ~300 ký tự thường gặp.
  // Mục đích: hiển thị pinyin trong panel. Web Speech API phát âm
  // không cần dict này — vẫn đọc được mọi chữ Hán.
  // Mở rộng dần qua các lesson HSK.
  // ============================================================
  var DICT = {
    // Đại từ
    '我': 'wǒ', '你': 'nǐ', '您': 'nín', '他': 'tā', '她': 'tā', '它': 'tā',
    '我们': 'wǒmen', '你们': 'nǐmen', '他们': 'tāmen',
    // Chào hỏi
    '好': 'hǎo', '再': 'zài', '见': 'jiàn', '谢': 'xiè', '不': 'bù', '客': 'kè', '气': 'qì',
    '对': 'duì', '起': 'qǐ', '没': 'méi', '关': 'guān', '系': 'xì',
    // Số đếm
    '一': 'yī', '二': 'èr', '三': 'sān', '四': 'sì', '五': 'wǔ',
    '六': 'liù', '七': 'qī', '八': 'bā', '九': 'jiǔ', '十': 'shí',
    '百': 'bǎi', '千': 'qiān', '万': 'wàn', '零': 'líng',
    // Gia đình
    '爸': 'bà', '妈': 'mā', '哥': 'gē', '姐': 'jiě', '弟': 'dì', '妹': 'mèi',
    '爷': 'yé', '奶': 'nǎi', '叔': 'shū', '伯': 'bó', '阿': 'ā',
    '家': 'jiā', '人': 'rén', '孩': 'hái', '子': 'zi',
    // Lượng từ
    '个': 'gè', '只': 'zhī', '本': 'běn', '张': 'zhāng', '杯': 'bēi',
    '件': 'jiàn', '条': 'tiáo', '辆': 'liàng', '把': 'bǎ', '块': 'kuài',
    // Động từ thường
    '是': 'shì', '有': 'yǒu', '在': 'zài', '去': 'qù', '来': 'lái',
    '做': 'zuò', '看': 'kàn', '听': 'tīng', '说': 'shuō', '读': 'dú',
    '写': 'xiě', '吃': 'chī', '喝': 'hē', '想': 'xiǎng', '要': 'yào',
    '会': 'huì', '能': 'néng', '可': 'kě', '以': 'yǐ', '爱': 'ài',
    '喜': 'xǐ', '欢': 'huān', '认': 'rèn', '识': 'shí', '知': 'zhī',
    '道': 'dào', '学': 'xué', '习': 'xí', '工': 'gōng', '作': 'zuò',
    '买': 'mǎi', '卖': 'mài', '走': 'zǒu', '跑': 'pǎo', '坐': 'zuò',
    '站': 'zhàn', '请': 'qǐng', '问': 'wèn', '回': 'huí', '答': 'dá',
    '帮': 'bāng', '助': 'zhù', '叫': 'jiào', '住': 'zhù', '玩': 'wán',
    '听': 'tīng', '打': 'dǎ', '开': 'kāi', '上': 'shàng', '下': 'xià',
    // Tính từ
    '大': 'dà', '小': 'xiǎo', '多': 'duō', '少': 'shǎo', '新': 'xīn',
    '旧': 'jiù', '高': 'gāo', '矮': 'ǎi', '长': 'cháng', '短': 'duǎn',
    '快': 'kuài', '慢': 'màn', '冷': 'lěng', '热': 'rè', '美': 'měi',
    '丑': 'chǒu', '远': 'yuǎn', '近': 'jìn', '难': 'nán', '易': 'yì',
    '便': 'biàn', '宜': 'yí', '贵': 'guì', '累': 'lèi', '忙': 'máng',
    '苦': 'kǔ', '甜': 'tián', '酸': 'suān', '辣': 'là', '咸': 'xián',
    // Thời gian
    '今': 'jīn', '明': 'míng', '昨': 'zuó', '天': 'tiān', '年': 'nián',
    '月': 'yuè', '日': 'rì', '星': 'xīng', '期': 'qī', '时': 'shí',
    '分': 'fēn', '秒': 'miǎo', '点': 'diǎn', '钟': 'zhōng', '现': 'xiàn',
    '早': 'zǎo', '晚': 'wǎn', '午': 'wǔ', '夜': 'yè', '前': 'qián',
    '后': 'hòu', '快': 'kuài',
    // Đồ ăn / sinh hoạt
    '饭': 'fàn', '菜': 'cài', '米': 'mǐ', '面': 'miàn', '茶': 'chá',
    '水': 'shuǐ', '果': 'guǒ', '苹': 'píng', '香': 'xiāng', '蕉': 'jiāo',
    '鱼': 'yú', '肉': 'ròu', '鸡': 'jī', '蛋': 'dàn', '猪': 'zhū',
    '牛': 'niú', '羊': 'yáng', '奶': 'nǎi',
    // Đồ vật / nơi chốn
    '桌': 'zhuō', '椅': 'yǐ', '床': 'chuáng', '门': 'mén', '窗': 'chuāng',
    '电': 'diàn', '视': 'shì', '脑': 'nǎo', '话': 'huà', '车': 'chē',
    '飞': 'fēi', '机': 'jī', '船': 'chuán', '路': 'lù', '店': 'diàn',
    '校': 'xiào', '院': 'yuàn', '医': 'yī', '生': 'shēng', '老': 'lǎo',
    '师': 'shī', '学': 'xué', '同': 'tóng', '朋': 'péng', '友': 'yǒu',
    '国': 'guó', '中': 'zhōng', '美': 'měi', '英': 'yīng', '日': 'rì',
    '韩': 'hán', '法': 'fǎ', '德': 'dé', '越': 'yuè', '南': 'nán',
    '京': 'jīng', '北': 'běi', '上': 'shàng', '海': 'hǎi',
    // Câu hỏi / hư từ
    '什': 'shén', '么': 'me', '谁': 'shéi', '哪': 'nǎ', '里': 'lǐ',
    '儿': 'ér', '怎': 'zěn', '样': 'yàng', '为': 'wèi', '吗': 'ma',
    '呢': 'ne', '的': 'de', '地': 'de', '得': 'de', '了': 'le',
    '过': 'guò', '着': 'zhe', '把': 'bǎ', '被': 'bèi', '比': 'bǐ',
    '跟': 'gēn', '和': 'hé', '与': 'yǔ', '或': 'huò', '但': 'dàn',
    '是': 'shì', '也': 'yě', '都': 'dōu', '还': 'hái', '又': 'yòu',
    '再': 'zài', '就': 'jiù', '才': 'cái', '只': 'zhǐ', '太': 'tài',
    '很': 'hěn', '非': 'fēi', '常': 'cháng', '真': 'zhēn', '最': 'zuì',
    // Phương hướng
    '东': 'dōng', '西': 'xī', '南': 'nán', '北': 'běi', '左': 'zuǒ',
    '右': 'yòu', '里': 'lǐ', '外': 'wài', '内': 'nèi',
    // Cảm xúc / trạng thái
    '高兴': 'gāoxìng', '快乐': 'kuàilè', '幸福': 'xìngfú', '生气': 'shēngqì',
    '难过': 'nánguò', '害怕': 'hàipà', '紧张': 'jǐnzhāng',
    // Một vài chữ phổ biến khác
    '马': 'mǎ', '麻': 'má', '骂': 'mà', '妈': 'mā', '猫': 'māo', '狗': 'gǒu',
    '鸟': 'niǎo', '花': 'huā', '草': 'cǎo', '树': 'shù', '山': 'shān',
    '河': 'hé', '湖': 'hú', '城': 'chéng', '市': 'shì', '村': 'cūn',
    '钱': 'qián', '元': 'yuán', '角': 'jiǎo', '毛': 'máo',
    '名': 'míng', '字': 'zì', '本': 'běn', '书': 'shū', '报': 'bào',
    '纸': 'zhǐ', '笔': 'bǐ', '画': 'huà', '图': 'tú'
  };

  // Tra pinyin: thử match từ 2-ký-tự trước (vd "我们", "高兴"), rồi 1 ký tự.
  function lookupPinyin(text, i) {
    // Greedy 2-char first
    if (i + 1 < text.length) {
      var two = text[i] + text[i + 1];
      if (DICT[two]) return { len: 2, pinyin: DICT[two] };
    }
    if (DICT[text[i]]) return { len: 1, pinyin: DICT[text[i]] };
    return null;
  }

  function isHanzi(ch) {
    var code = ch.charCodeAt(0);
    return (code >= 0x4E00 && code <= 0x9FFF) ||
           (code >= 0x3400 && code <= 0x4DBF);
  }

  function isPunct(ch) {
    return /[\s,.!?;:。，！？；：、""''（）()【】「」]/.test(ch);
  }

  var STYLE = `
    .zh-btn {
      position: fixed; left: 24px; z-index: 200;
      bottom: calc(24px + env(safe-area-inset-bottom, 0px));
      background: #c8102e; color: white;
      padding: 12px 20px; border-radius: 28px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
      cursor: pointer; font-weight: 700; font-size: 14px;
      border: none; user-select: none;
      transition: transform 0.15s, background 0.15s, opacity 0.2s;
      font-family: inherit;
    }
    .zh-btn:hover { transform: translateY(-2px); background: #9b1226; }
    .zh-btn.zh-hidden { opacity: 0; pointer-events: none; transform: translateY(8px); }

    .zh-panel {
      position: fixed; z-index: 210;
      width: 420px; max-width: calc(100vw - 32px);
      max-height: calc(100vh - 48px);
      background: white; border-radius: 10px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.28), 0 0 0 1px rgba(0,0,0,0.06);
      display: none; flex-direction: column;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      overflow: hidden;
    }
    .zh-panel.zh-open { display: flex; }

    .zh-header {
      background: #c8102e; color: white;
      padding: 10px 12px;
      display: flex; align-items: center; gap: 8px;
      cursor: grab; user-select: none;
      flex-shrink: 0;
    }
    .zh-header.zh-dragging { cursor: grabbing; }
    .zh-header .zh-title {
      font-weight: 700; font-size: 14px; flex: 1;
      pointer-events: none;
    }
    .zh-header button {
      background: rgba(255,255,255,0.15); color: white;
      border: none; width: 26px; height: 26px;
      border-radius: 50%; cursor: pointer; font-size: 14px;
      font-family: inherit; line-height: 1; padding: 0;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.15s;
    }
    .zh-header button:hover { background: rgba(255,255,255,0.32); }

    .zh-body {
      padding: 12px; overflow-y: auto; flex: 1;
      font-size: 13px; color: #1f2328;
    }

    .zh-controls {
      display: flex; flex-wrap: wrap; gap: 6px; align-items: center;
      margin-bottom: 8px;
    }
    .zh-variant-toggle {
      display: inline-flex; border: 1px solid #cbd5e0; border-radius: 6px;
      overflow: hidden;
    }
    .zh-variant-toggle button {
      background: white; border: none; padding: 4px 10px;
      font-size: 12px; cursor: pointer; font-family: inherit;
      color: #2d3748; transition: background 0.12s;
    }
    .zh-variant-toggle button.zh-active {
      background: #c8102e; color: white; font-weight: 700;
    }
    .zh-variant-toggle button:not(.zh-active):hover { background: #fef2f2; }

    .zh-rate {
      display: flex; align-items: center; gap: 4px;
      font-size: 12px; color: #4a5568;
    }
    .zh-rate input[type=range] { width: 80px; }
    .zh-rate-val { font-weight: 700; min-width: 28px; }

    .zh-textarea {
      width: 100%; box-sizing: border-box;
      min-height: 70px; max-height: 140px; resize: vertical;
      padding: 8px; border: 1px solid #cbd5e0; border-radius: 6px;
      font-family: inherit; font-size: 14px;
      line-height: 1.4;
    }
    .zh-textarea:focus { outline: 2px solid #c8102e; outline-offset: -1px; border-color: #c8102e; }

    .zh-actions {
      display: flex; gap: 6px; margin-top: 6px;
    }
    .zh-actions button {
      flex: 1; padding: 7px 10px; font-size: 13px; font-weight: 600;
      border: none; border-radius: 6px; cursor: pointer;
      font-family: inherit;
      transition: background 0.12s, transform 0.08s;
    }
    .zh-actions .zh-analyze {
      background: #c8102e; color: white;
    }
    .zh-actions .zh-analyze:hover { background: #9b1226; }
    .zh-actions .zh-speak {
      background: #15803d; color: white;
    }
    .zh-actions .zh-speak:hover { background: #166534; }
    .zh-actions .zh-speak.zh-stopping { background: #c53030; }
    .zh-actions .zh-speak.zh-stopping:hover { background: #9b2c2c; }
    .zh-actions button:disabled { opacity: 0.5; cursor: not-allowed; }

    .zh-status {
      font-size: 11px; color: #718096; margin-top: 6px; min-height: 14px;
    }
    .zh-status.zh-err { color: #c53030; }

    .zh-output {
      margin-top: 10px; padding-top: 10px;
      border-top: 1px dashed #e2e8f0;
      display: flex; flex-wrap: wrap; gap: 6px 8px;
      line-height: 1.6;
    }
    .zh-char {
      display: inline-flex; flex-direction: column; align-items: center;
      padding: 4px 8px; border-radius: 5px; cursor: pointer;
      background: #fef2f2; border: 1px solid transparent;
      transition: background 0.12s, border-color 0.12s, transform 0.08s;
      min-width: 0;
    }
    .zh-char:hover { background: #fde2e2; border-color: #fca5a5; }
    .zh-char.zh-playing { background: #fef3c7; border-color: #f59e0b; }
    .zh-char-text {
      font-weight: 600; color: #1a202c; font-size: 22px;
      font-family: "PingFang SC", "Microsoft YaHei", "SimHei", sans-serif;
      line-height: 1;
    }
    .zh-char-pinyin {
      font-size: 12px; color: #c8102e; margin-top: 4px;
      font-weight: 600;
    }
    .zh-char.zh-miss .zh-char-pinyin { color: #b7791f; }
    .zh-char.zh-miss { background: #fffbeb; }

    .zh-punct {
      color: #a0aec0; align-self: flex-end; padding: 0 2px;
      font-size: 13px; user-select: none;
    }

    .zh-empty {
      color: #a0aec0; font-style: italic; font-size: 12px;
      padding: 12px 0; text-align: center;
    }

    .zh-tone-1 { color: #2563eb; }   /* xanh — thanh 1 cao bằng */
    .zh-tone-2 { color: #ca8a04; }   /* vàng — thanh 2 lên */
    .zh-tone-3 { color: #c8102e; }   /* đỏ — thanh 3 xuống-lên */
    .zh-tone-4 { color: #7c3aed; }   /* tím — thanh 4 xuống mạnh */
    .zh-tone-0 { color: #6b7280; }   /* xám — thanh nhẹ */

    @media (max-width: 480px) {
      .zh-btn { bottom: calc(80px + env(safe-area-inset-bottom, 0px)); left: 12px; padding: 9px 14px; font-size: 13px; }
      .zh-panel { width: calc(100vw - 24px); }
    }
  `;

  // ============================================================
  // Inject UI
  // ============================================================
  var style = document.createElement('style');
  style.textContent = STYLE;
  document.head.appendChild(style);

  var btn = document.createElement('button');
  btn.className = 'zh-btn';
  btn.textContent = '🔊 Pinyin';
  btn.title = 'Mở Pinyin Reader';
  document.body.appendChild(btn);

  var panel = document.createElement('div');
  panel.className = 'zh-panel';
  panel.innerHTML = `
    <div class="zh-header">
      <div class="zh-title">🔊 Pinyin Reader</div>
      <button class="zh-min" title="Thu nhỏ">_</button>
      <button class="zh-close" title="Đóng">×</button>
    </div>
    <div class="zh-body">
      <div class="zh-controls">
        <div class="zh-variant-toggle">
          <button data-var="zh-CN" class="zh-active">🇨🇳 CN</button>
          <button data-var="zh-TW">🇹🇼 TW</button>
        </div>
        <div class="zh-rate" title="Tốc độ đọc">
          ⚡<input type="range" min="0.5" max="1.5" step="0.1" value="1">
          <span class="zh-rate-val">1.0x</span>
        </div>
      </div>
      <textarea class="zh-textarea" placeholder="Nhập chữ Hán hoặc pinyin, vd: 你好，我叫小明。"></textarea>
      <div class="zh-actions">
        <button class="zh-analyze">Phân tích</button>
        <button class="zh-speak">▶ Đọc cả đoạn</button>
      </div>
      <div class="zh-status"></div>
      <div class="zh-output">
        <div class="zh-empty">Nhập text rồi bấm "Phân tích" để xem pinyin từng ký tự.</div>
      </div>
    </div>
  `;
  document.body.appendChild(panel);

  var header   = panel.querySelector('.zh-header');
  var btnMin   = panel.querySelector('.zh-min');
  var btnClose = panel.querySelector('.zh-close');
  var textarea = panel.querySelector('.zh-textarea');
  var btnAnalyze = panel.querySelector('.zh-analyze');
  var btnSpeak   = panel.querySelector('.zh-speak');
  var statusEl   = panel.querySelector('.zh-status');
  var outputEl   = panel.querySelector('.zh-output');
  var rateRange  = panel.querySelector('.zh-rate input[type=range]');
  var rateVal    = panel.querySelector('.zh-rate-val');
  var variantBtns = panel.querySelectorAll('.zh-variant-toggle button');

  // ============================================================
  // State + localStorage
  // ============================================================
  var variant = localStorage.getItem(LS_VAR_KEY) || 'zh-CN';
  if (variant !== 'zh-CN' && variant !== 'zh-TW') variant = 'zh-CN';
  variantBtns.forEach(function (b) {
    b.classList.toggle('zh-active', b.dataset.var === variant);
  });

  var rate = parseFloat(localStorage.getItem(LS_RATE_KEY)) || 1;
  rateRange.value = rate;
  rateVal.textContent = rate.toFixed(1) + 'x';

  var savedText = localStorage.getItem(LS_TEXT_KEY);
  if (savedText) textarea.value = savedText;

  // Position panel
  var pos;
  try { pos = JSON.parse(localStorage.getItem(LS_POS_KEY)); } catch (e) {}
  if (!pos || typeof pos.left !== 'number' || typeof pos.top !== 'number') {
    // Default: gần nút (góc dưới-trái)
    pos = { left: 24, top: window.innerHeight - 500 };
  }
  applyPos();

  function applyPos() {
    pos.left = Math.max(8, Math.min(pos.left, window.innerWidth  - 100));
    pos.top  = Math.max(8, Math.min(pos.top,  window.innerHeight - 100));
    panel.style.left = pos.left + 'px';
    panel.style.top  = pos.top  + 'px';
  }

  // ============================================================
  // Open / close / minimize
  // ============================================================
  function openPanel() {
    panel.classList.add('zh-open');
    btn.classList.add('zh-hidden');
    try { localStorage.setItem(LS_OPEN_KEY, '1'); } catch (e) {}
  }
  function closePanel() {
    panel.classList.remove('zh-open');
    btn.classList.remove('zh-hidden');
    stopSpeaking();
    try { localStorage.setItem(LS_OPEN_KEY, '0'); } catch (e) {}
  }

  btn.addEventListener('click', openPanel);
  btnClose.addEventListener('click', closePanel);
  btnMin.addEventListener('click', closePanel);

  // Khôi phục trạng thái mở khi sang lesson khác (giống sidebar README).
  if (localStorage.getItem(LS_OPEN_KEY) === '1') openPanel();

  // ============================================================
  // Drag header
  // ============================================================
  var dragging = false, dragOffset = { x: 0, y: 0 };
  header.addEventListener('mousedown', function (e) {
    if (e.target.tagName === 'BUTTON') return;
    dragging = true;
    header.classList.add('zh-dragging');
    var rect = panel.getBoundingClientRect();
    dragOffset.x = e.clientX - rect.left;
    dragOffset.y = e.clientY - rect.top;
    e.preventDefault();
  });
  document.addEventListener('mousemove', function (e) {
    if (!dragging) return;
    pos.left = e.clientX - dragOffset.x;
    pos.top  = e.clientY - dragOffset.y;
    applyPos();
  });
  document.addEventListener('mouseup', function () {
    if (!dragging) return;
    dragging = false;
    header.classList.remove('zh-dragging');
    localStorage.setItem(LS_POS_KEY, JSON.stringify(pos));
  });
  // Touch (mobile drag)
  header.addEventListener('touchstart', function (e) {
    if (e.target.tagName === 'BUTTON') return;
    dragging = true;
    var rect = panel.getBoundingClientRect();
    dragOffset.x = e.touches[0].clientX - rect.left;
    dragOffset.y = e.touches[0].clientY - rect.top;
  }, { passive: true });
  document.addEventListener('touchmove', function (e) {
    if (!dragging) return;
    pos.left = e.touches[0].clientX - dragOffset.x;
    pos.top  = e.touches[0].clientY - dragOffset.y;
    applyPos();
  }, { passive: true });
  document.addEventListener('touchend', function () {
    if (!dragging) return;
    dragging = false;
    localStorage.setItem(LS_POS_KEY, JSON.stringify(pos));
  });

  // ============================================================
  // Variant + rate
  // ============================================================
  variantBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      variant = b.dataset.var;
      localStorage.setItem(LS_VAR_KEY, variant);
      variantBtns.forEach(function (bb) {
        bb.classList.toggle('zh-active', bb.dataset.var === variant);
      });
    });
  });

  rateRange.addEventListener('input', function () {
    rate = parseFloat(rateRange.value);
    rateVal.textContent = rate.toFixed(1) + 'x';
    localStorage.setItem(LS_RATE_KEY, rate.toString());
  });

  // ============================================================
  // Analyze: render chữ Hán + pinyin
  // ============================================================
  function setStatus(msg, isErr) {
    statusEl.textContent = msg || '';
    statusEl.classList.toggle('zh-err', !!isErr);
  }

  function getToneClass(pinyin) {
    if (!pinyin) return 'zh-tone-0';
    // Tone 1: ā ē ī ō ū ǖ
    if (/[āēīōūǖ]/.test(pinyin)) return 'zh-tone-1';
    if (/[áéíóúǘ]/.test(pinyin)) return 'zh-tone-2';
    if (/[ǎěǐǒǔǚ]/.test(pinyin)) return 'zh-tone-3';
    if (/[àèìòùǜ]/.test(pinyin)) return 'zh-tone-4';
    return 'zh-tone-0';
  }

  function analyze() {
    var text = textarea.value.trim();
    localStorage.setItem(LS_TEXT_KEY, text);
    outputEl.innerHTML = '';
    if (!text) {
      outputEl.innerHTML = '<div class="zh-empty">Nhập text rồi bấm "Phân tích".</div>';
      return;
    }

    var i = 0;
    while (i < text.length) {
      var ch = text[i];
      if (isHanzi(ch)) {
        var found = lookupPinyin(text, i);
        var token = document.createElement('span');
        token.className = 'zh-char';
        var span1 = document.createElement('span');
        span1.className = 'zh-char-text';
        var span2 = document.createElement('span');
        span2.className = 'zh-char-pinyin';
        if (found) {
          var word = text.substr(i, found.len);
          span1.textContent = word;
          span2.textContent = found.pinyin;
          span2.classList.add(getToneClass(found.pinyin));
          token.dataset.speakText = word;
          i += found.len;
        } else {
          span1.textContent = ch;
          span2.textContent = '?';
          token.classList.add('zh-miss');
          token.dataset.speakText = ch;
          i += 1;
        }
        token.appendChild(span1);
        token.appendChild(span2);
        outputEl.appendChild(token);
      } else if (isPunct(ch)) {
        var p = document.createElement('span');
        p.className = 'zh-punct';
        p.textContent = ch;
        outputEl.appendChild(p);
        i += 1;
      } else {
        // Ký tự khác (latin/digit/pinyin có dấu) — gom thành 1 chunk tới hết non-hanzi
        var j = i;
        while (j < text.length && !isHanzi(text[j]) && !isPunct(text[j])) j++;
        var chunk = text.substr(i, j - i);
        if (chunk.trim()) {
          var token2 = document.createElement('span');
          token2.className = 'zh-char';
          var s1 = document.createElement('span');
          s1.className = 'zh-char-pinyin';
          s1.style.fontSize = '13px';
          s1.textContent = chunk;
          token2.appendChild(s1);
          token2.dataset.speakText = chunk;
          outputEl.appendChild(token2);
        }
        i = j;
      }
    }

    if (!outputEl.children.length) {
      outputEl.innerHTML = '<div class="zh-empty">Không có chữ nào phân tích được.</div>';
    }
    setStatus('Click vào ký tự để nghe phát âm. Variant: ' + variant);
  }

  btnAnalyze.addEventListener('click', analyze);
  textarea.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      analyze();
    }
  });

  // Click ký tự → phát âm riêng
  outputEl.addEventListener('click', function (e) {
    var token = e.target.closest('.zh-char');
    if (!token || !token.dataset.speakText) return;
    speak(token.dataset.speakText, token);
  });

  // ============================================================
  // Web Speech API
  // ============================================================
  var currentUtter = null;
  var speakingToken = null;

  function getVoiceFor(lang) {
    var voices = window.speechSynthesis.getVoices();
    // Ưu tiên giọng premium/enhanced/natural cùng lang
    var prefer = voices.filter(function (v) {
      return v.lang === lang && /(premium|enhanced|natural)/i.test(v.name);
    });
    if (prefer.length) return prefer[0];
    var exact = voices.filter(function (v) { return v.lang === lang; });
    if (exact.length) return exact[0];
    // Fallback: bất kỳ giọng zh
    var any = voices.filter(function (v) { return v.lang.indexOf('zh') === 0; });
    return any.length ? any[0] : null;
  }

  function stopSpeaking() {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    if (speakingToken) {
      speakingToken.classList.remove('zh-playing');
      speakingToken = null;
    }
    btnSpeak.classList.remove('zh-stopping');
    btnSpeak.textContent = '▶ Đọc cả đoạn';
  }

  function speak(text, token) {
    if (!window.speechSynthesis) {
      setStatus('Trình duyệt không hỗ trợ Web Speech API.', true);
      return;
    }
    // Chỉ cancel khi engine đang bận — cancel() rồi speak() ngay lúc rảnh khiến
    // Chrome trễ/bỏ qua lần phát đầu (cảm giác "đọc chậm").
    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      window.speechSynthesis.cancel();
    }
    if (speakingToken) speakingToken.classList.remove('zh-playing');

    var u = new SpeechSynthesisUtterance(text);
    u.lang = variant;
    u.rate = rate;
    var v = getVoiceFor(variant);
    if (v) u.voice = v;

    if (token) {
      token.classList.add('zh-playing');
      speakingToken = token;
    }
    u.onend = u.onerror = function () {
      if (token) token.classList.remove('zh-playing');
      if (speakingToken === token) speakingToken = null;
      btnSpeak.classList.remove('zh-stopping');
      btnSpeak.textContent = '▶ Đọc cả đoạn';
    };

    currentUtter = u;
    setStatus('Phát: "' + text + '" (' + variant + ', ' + rate.toFixed(1) + 'x)');
    window.speechSynthesis.speak(u);
  }

  btnSpeak.addEventListener('click', function () {
    if (window.speechSynthesis && window.speechSynthesis.speaking) {
      stopSpeaking();
      return;
    }
    var text = textarea.value.trim();
    if (!text) {
      setStatus('Nhập text trước đã.', true);
      return;
    }
    btnSpeak.classList.add('zh-stopping');
    btnSpeak.textContent = '■ Dừng';
    speak(text, null);
  });

  // Preload voices (một số browser chỉ trả về sau voiceschanged)
  if (window.speechSynthesis) {
    // Dọn hàng đợi còn sót từ trang trước → audio không "rớt" sang lesson mới.
    window.speechSynthesis.cancel();
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = function () {
      window.speechSynthesis.getVoices();
    };
    // Bấm Next/Prev sang lesson khác → dừng mọi audio đang phát.
    window.addEventListener('pagehide', stopSpeaking);
  }

  // Re-position khi resize cửa sổ
  window.addEventListener('resize', applyPos);

})();
