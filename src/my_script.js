// 引入KaTeX的CSS样式
import 'katex/dist/katex.min.css';

// 引入KaTeX的JavaScript库
import katex from 'katex';

// 引入KaTeX的自动渲染插件
import 'katex/dist/contrib/auto-render.min.js';

// 使用KaTeX自动渲染页面中的数学公式
document.addEventListener('DOMContentLoaded', function() {
  renderMathInElement(document.body, {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '$', right: '$', display: false },
    ],
  });
});