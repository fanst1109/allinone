/* viz-math.js — helper render công thức KaTeX trong THÂN visualization.html.
 *
 * Cách dùng (3 dòng trong <head>, đường dẫn theo độ sâu của viz):
 *   <link rel="stylesheet" href="../../../tools/katex/katex.min.css">
 *   <script src="../../../tools/katex/katex.min.js"></script>
 *   <script src="../../../tools/viz-math.js"></script>
 *
 * API:
 *   km(tex)        → chuỗi HTML công thức inline (dùng trong template literal)
 *   km(tex, true)  → display mode (căn giữa, cỡ lớn)
 *
 * Quy ước: chỉ bọc phần "khung" công thức (cận tích phân, phân số, căn...);
 * con số động cập nhật theo slider (toFixed) để dạng text thường BÊN NGOÀI km().
 * KHÔNG dùng auto-render quét DOM trong thân viz.
 */
(function () {
  "use strict";
  window.km = function (tex, disp) {
    if (!window.katex) return tex; // katex chưa load → trả text thô, không vỡ trang
    try {
      return katex.renderToString(tex, {
        displayMode: !!disp,
        throwOnError: false,
        output: "html"
      });
    } catch (e) {
      return tex;
    }
  };
  // KaTeX mặc định 1.21em — hơi to so với readout 14px, ghìm nhẹ lại
  var st = document.createElement("style");
  st.textContent = ".katex{font-size:1.08em}";
  document.head.appendChild(st);
})();
