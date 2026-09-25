const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 1. Read lesson-plan-modal.js
const modalJsPath = path.join(__dirname, 'js', 'lesson-plan-modal.js');
const modalJsContent = fs.readFileSync(modalJsPath, 'utf8');

// Extract getCompleteLessonPlanHTML function body
const startMarker = 'function getCompleteLessonPlanHTML() {';
const endMarker = '/* ============================================================';
const fnStart = modalJsContent.indexOf(startMarker);
const fnEnd = modalJsContent.indexOf(endMarker, fnStart + 100);

let fnCode = modalJsContent.substring(fnStart, fnEnd).trim();
// Extract the template string
const returnIndex = fnCode.indexOf('return `');
const lastBacktick = fnCode.lastIndexOf('`;');
let html = fnCode.substring(returnIndex + 8, lastBacktick);

// 2. Perform Math Substitutions
html = html
  .replace(/\$y\s*=\s*\\left\(\\frac\{1\}\{2\}\\right\)\^x\$/g, '<span class="math-clean"><i>y</i> = (<span class="math-fraction"><span class="num">1</span><span class="den">2</span></span>)<sup><i>x</i></sup></span>')
  .replace(/\$y\s*=\s*\(1\/2\)\^x\$/g, '<span class="math-clean"><i>y</i> = (<span class="math-fraction"><span class="num">1</span><span class="den">2</span></span>)<sup><i>x</i></sup></span>')
  .replace(/\$y\s*=\s*2\^x\$/g, '<span class="math-clean"><i>y</i> = 2<sup><i>x</i></sup></span>')
  .replace(/\$y\s*=\s*a\^x\$/g, '<span class="math-clean"><i>y</i> = <i>a</i><sup><i>x</i></sup></span>')
  .replace(/\$a\s*=\s*\\frac\{1\}\{2\}\$/g, '<span class="math-clean"><i>a</i> = <span class="math-fraction"><span class="num">1</span><span class="den">2</span></span></span>')
  .replace(/\$x\s*=\s*1\s*\\Rightarrow\s*y\s*=\s*\\frac\{1\}\{2\}\$/g, '<span class="math-clean"><i>x</i> = 1 &rArr; <i>y</i> = <span class="math-fraction"><span class="num">1</span><span class="den">2</span></span></span>')
  .replace(/\$x\s*=\s*2\s*\\Rightarrow\s*y\s*=\s*\\frac\{1\}\{4\}\$/g, '<span class="math-clean"><i>x</i> = 2 &rArr; <i>y</i> = <span class="math-fraction"><span class="num">1</span><span class="den">4</span></span></span>')
  .replace(/\$x\s*=\s*-2\s*\\Rightarrow\s*y\s*=\s*4\$/g, '<span class="math-clean"><i>x</i> = -2 &rArr; <i>y</i> = 4</span>')
  .replace(/\$x\s*=\s*-1\s*\\Rightarrow\s*y\s*=\s*2\$/g, '<span class="math-clean"><i>x</i> = -1 &rArr; <i>y</i> = 2</span>')
  .replace(/\$x\s*=\s*0\s*\\Rightarrow\s*y\s*=\s*1\$/g, '<span class="math-clean"><i>x</i> = 0 &rArr; <i>y</i> = 1</span>')
  .replace(/\$\\frac\{1\}\{2\}\$/g, '<span class="math-fraction"><span class="num">1</span><span class="den">2</span></span>')
  .replace(/\$\\frac\{1\}\{4\}\$/g, '<span class="math-fraction"><span class="num">1</span><span class="den">4</span></span>')
  .replace(/\$D\s*=\s*\\mathbb\{R\}\$/g, '<span class="math-clean"><i>D</i> = ℝ</span>')
  .replace(/\$R_f\s*=\s*\(0,\s*\+\\infty\)\$/g, '<span class="math-clean"><i>R</i><sub><i>f</i></sub> = (0, +∞)</span>')
  .replace(/\$y\s*=\s*0\$/g, '<span class="math-clean"><i>y</i> = 0</span>')
  .replace(/\$a\s*>\s*0,\s*a\s*\\neq\s*1\$/g, '<span class="math-clean"><i>a</i> &gt; 0, <i>a</i> &ne; 1</span>')
  .replace(/\$a\s*>\s*1\$/g, '<span class="math-clean"><i>a</i> &gt; 1</span>')
  .replace(/\$0\s*<\s*a\s*<\s*1\$/g, '<span class="math-clean">0 &lt; <i>a</i> &lt; 1</span>')
  .replace(/\$N\(t\)\s*=\s*1000\s*\\cdot\s*2\^t\$/g, '<span class="math-clean"><i>N</i>(<i>t</i>) = 1000 &middot; 2<sup><i>t</i></sup></span>')
  .replace(/\$2\^0\$/g, '2<sup>0</sup>')
  .replace(/\$2\^1\$/g, '2<sup>1</sup>')
  .replace(/\$2\^2\$/g, '2<sup>2</sup>')
  .replace(/\$2\^3\$/g, '2<sup>3</sup>')
  .replace(/\$2\^4\$/g, '2<sup>4</sup>')
  .replace(/\$2\^x\$/g, '2<sup><i>x</i></sup>')
  .replace(/\$\(0,\s*1\)\$/g, '(0, 1)')
  .replace(/\$\(Oy\)\$/g, '(<i>Oy</i>)')
  .replace(/\$\\frac\{([^{}]+)\}\{([^{}]+)\}\$/g, '<span class="math-fraction"><span class="num">$1</span><span class="den">$2</span></span>')
  .replace(/\$([a-zA-Z0-9]+)\^([a-zA-Z0-9+\-]+)\$/g, '<span class="math-clean"><i>$1</i><sup>$2</sup></span>');

// 3. Assemble Standalone HTML
const standaloneHtml = `<!DOCTYPE html>
<html lang="km">
<head>
  <meta charset="UTF-8">
  <title>កិច្ចតែងការបង្រៀនគណិតវិទ្យា ថ្នាក់ទី១១ - អ្នកគ្រូ ឆេង ឆវ័ន្ត</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Kantumruy+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Moul&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 12mm 10mm;
    }
    body {
      margin: 0;
      padding: 0;
      background: #ffffff;
      color: #0f172a;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  </style>
</head>
<body>
  ${html}
</body>
</html>`;

const exportHtmlPath = path.join(__dirname, 'lesson-plan-export.html');
fs.writeFileSync(exportHtmlPath, standaloneHtml, 'utf8');
console.log('Created lesson-plan-export.html successfully!');
