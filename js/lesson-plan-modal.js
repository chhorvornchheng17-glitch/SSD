/**
 * lesson-plan-modal.js - Multi-Format Lesson Plan Modal & Export Hub
 * Teacher Chheng Chhovorn - Mathematics Platform
 * Supports: Word (.doc), PDF, PowerPoint (.pptx), High-Res Image (.png), and A4 Print Preview
 */

(function () {
  'use strict';

  // Helper to dynamically load external scripts if needed
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        return resolve();
      }
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      s.onload = () => resolve();
      s.onerror = (err) => reject(err);
      document.head.appendChild(s);
    });
  }

  // Toast notification helper
  function notifyToast(msg, duration = 3500) {
    if (typeof window.showToast === 'function') {
      window.showToast(msg);
      return;
    }
    let toast = document.getElementById('lp-hub-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'lp-hub-toast';
      toast.className = 'export-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  // Inject Modal Markup into DOM if not exists
  function ensureModalsInDOM() {
    if (document.getElementById('lesson-plan-hub-modal')) return;

    const modalHtml = `
      <!-- Lesson Plan Export Hub Modal -->
      <div class="modal-overlay" id="lesson-plan-hub-modal" style="display: none;">
        <div class="lesson-plan-modal-container glass-card">
          <button class="modal-close-btn" onclick="closeLessonPlanModal()" aria-label="បិទផ្ទាំង">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div class="lp-modal-header">
            <div class="lp-badges-row">
              <span class="lp-badge">🇰🇭 ក្រសួងអប់រំ យុវជន និងកីឡា</span>
              <span class="lp-badge">📐 ថ្នាក់ទី ១១ (ភាគ១)</span>
              <span class="lp-badge" style="background: rgba(16,185,129,0.15); color: #34d399; border-color: rgba(16,185,129,0.3);">🔬 5E Model (IBL)</span>
              <span class="lp-badge">⏱️ ៥០ នាទី</span>
            </div>
            <h3 class="lp-modal-title">កិច្ចតែងការបង្រៀនគរុកោសល្យបែបការរិះរក</h3>
            <div class="lp-modal-subtitle">
              ជំពូកទី ២៖ អនុគមន៍អិចស្ប៉ូណង់ស្យែល និងអនុគមន៍លោការីត &nbsp;|&nbsp; <strong>មេរៀនទី ១៖ អនុគមន៍អិចស្ប៉ូណង់ស្យែល</strong><br>
              គ្រូបង្រៀនឯកទេស៖ <strong>អ្នកគ្រូ ឆេង ឆវ័ន្ត</strong> (NIE & RUPP | វិទ្យាល័យសសរស្តម្ភ & វិទ្យាស្ថាន SHINE)
            </div>
          </div>

          <div class="lp-summary-card">
            <div style="font-weight: 700; color: #38bdf8; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.4rem;">
              <span>📋</span> ខ្លឹមសារ & រចនាសម្ព័ន្ធកិច្ចតែងការ៖
            </div>
            <div>• <strong>វត្ថុបំណង ៣ ដែន៖</strong> វិជ្ជាសម្បទា, បំណិនសម្បទា, និងចរិយាសម្បទា។</div>
            <div>• <strong>តារាងមេ ៥ ជួរឈរ៖</strong> ថិរវេលា | ដំណាក់កាល 5E | ខ្លឹមសារមេរៀន | សកម្មភាពគ្រូ | សកម្មភាពសិស្ស។</div>
            <div>• <strong>ពិសោធន៍បត់ក្រដាស A4៖</strong> រិះរកគំរូទិន្នន័យ <span class="math-sym"><i>y</i> = 2<sup><i>x</i></sup></span> ឈានទៅរកនិយមន័យ <span class="math-sym"><i>y</i> = <i>a</i><sup><i>x</i></sup></span> និងក្រាបចុះ <span class="math-sym"><i>y</i> = (<span class="math-frac"><span class="num">1</span><span class="den">2</span></span>)<sup><i>x</i></sup></span> ជាមួយអថេរភាព។</div>
            <div>• <strong>ប្លង់ក្ដារខៀន ៣ ជួរឈរ & សន្លឹកកិច្ចការ៖</strong> គំនូសក្រាបវ៉ិចទ័រនៃ <span class="math-sym"><i>y</i> = 2<sup><i>x</i></sup></span> និង <span class="math-sym"><i>y</i> = (<span class="math-frac"><span class="num">1</span><span class="den">2</span></span>)<sup><i>x</i></sup></span>, អាស៊ីមតូតដេក <span class="math-sym"><i>y</i> = 0</span> និងលំហាត់អនុវត្ត។</div>
          </div>

          <!-- Actions Grid (Preview, Full Page) -->
          <div class="lp-actions-grid">
            <!-- 1. Print Preview -->
            <div class="lp-action-card">
              <div class="lp-action-top">
                <div class="lp-action-icon-box icon-preview">👁️</div>
                <div class="lp-action-info">
                  <h4>មើលជាមុនសិនមុននឹងបោះពុម្ព</h4>
                  <p>ត្រាប់តាមសន្លឹកក្រដាស A4 ពិតប្រាកដ មានប្រព័ន្ធ Zoom និងប៊ូតុង Print ផ្ទាល់</p>
                </div>
              </div>
              <button type="button" class="lp-action-btn btn-lp-preview" onclick="previewLessonPlanPrint()">
                <span>មើលជាមុន (Preview) 👁️</span>
              </button>
            </div>

            <!-- 6. Interactive Web Document -->
            <div class="lp-action-card">
              <div class="lp-action-top">
                <div class="lp-action-icon-box icon-interactive">🌐</div>
                <div class="lp-action-info">
                  <h4>ទំព័រកិច្ចតែងការពេញលេញ</h4>
                  <p>ចូលទៅកាន់ទំព័រពេញលេញ ជាមួយបន្ទប់ពិសោធន៍ក្រាហ្វិក និង Simulator</p>
                </div>
              </div>
              <a href="lesson-plan-exponential-ibl.html" class="lp-action-btn btn-lp-interactive">
                <span>បើកទំព័រពេញលេញ 🚀</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Print Preview Modal Simulation -->
      <div id="lp-print-preview-modal" class="preview-modal-backdrop" style="display: none;">
        <div class="preview-toolbar">
          <div class="preview-toolbar-left">
            <span class="preview-title">👁️ មើលជាមុនមុននឹងបោះពុម្ព (Print Preview - A4)</span>
            <span class="preview-badge">ក្រដាស A4 បញ្ឈរ (Portrait)</span>
          </div>
          
          <div class="preview-zoom-controls">
            <button class="zoom-btn" onclick="lpZoomPreview(-0.1)" title="បង្រួមតូច (Zoom Out)">➖</button>
            <span id="lp-preview-zoom-label" class="zoom-label">85%</span>
            <button class="zoom-btn" onclick="lpZoomPreview(0.1)" title="ពង្រីកធំ (Zoom In)">➕</button>
            <button class="zoom-btn reset-btn" onclick="lpSetPreviewZoom(1.0)" title="ទំហំដើម 100%">100%</button>
            <button class="zoom-btn reset-btn" onclick="lpFitPreviewWidth()" title="ពង្រីកសមល្មម (Fit Width)">📐 សមល្មម</button>
          </div>

          <div class="preview-toolbar-actions">
            <button onclick="window.print()" class="btn btn-primary btn-sm" title="បោះពុម្ព ឬរក្សាទុកជា PDF (Save as PDF) កម្រិត Vector ច្បាស់ ១០០% មិនបាត់បង់ទ្រង់ទ្រាយ">
              <span>🖨️ បោះពុម្ព / Save as PDF</span>
            </button>
            <button onclick="closeLpPrintPreview()" class="preview-close-btn" title="បិទ (Esc)">✕</button>
          </div>
        </div>

        <div class="preview-viewport" onclick="handleLpPreviewBackdrop(event)">
          <div id="lp-preview-sheet-wrapper" class="preview-sheet-wrapper">
            <div class="preview-paper-sheet">
              <div id="lp-preview-sheet-content"></div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  }

  // Mathematical rendering helper (KaTeX + HTML Fallback)
  function renderMathFormulas(container) {
    if (!container) return;
    if (typeof renderMathInElement === 'function') {
      try {
        renderMathInElement(container, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false }
          ],
          throwOnError: false
        });
        return;
      } catch (e) {
        console.warn('KaTeX render error:', e);
      }
    }

    // High quality HTML fallback for fractions and exponents if KaTeX is unavailable
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null, false);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach(node => {
      const text = node.nodeValue;
      if (!text || !text.includes('$')) return;

      const replaced = text
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

      if (replaced !== text) {
        const span = document.createElement('span');
        span.innerHTML = replaced;
        if (node.parentNode) {
          node.parentNode.replaceChild(span, node);
        }
      }
    });
  }

  // Global Open & Close functions
  window.openLessonPlanModal = function (event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    ensureModalsInDOM();
    const modal = document.getElementById('lesson-plan-hub-modal');
    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      // Automatically render mathematical formulas inside the modal
      renderMathFormulas(modal);
    }
  };

  window.closeLessonPlanModal = function () {
    const modal = document.getElementById('lesson-plan-hub-modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  };

  // Close modals on backdrop click
  document.addEventListener('click', function (e) {
    const modal = document.getElementById('lesson-plan-hub-modal');
    if (modal && e.target === modal) {
      closeLessonPlanModal();
    }
  });

  // Close on Escape key
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeLessonPlanModal();
      closeLpPrintPreview();
    }
  });

  /* ============================================================
     1. EXPORT TO MICROSOFT WORD (.doc)
     ============================================================ */
  window.downloadLessonPlanWord = function () {
    notifyToast('⏳ កំពុងរៀបចំបង្កើតឯកសារ Microsoft Word...', 2500);

    const wordContent = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset='utf-8'>
  <title>កិច្ចតែងការបង្រៀនគណិតវិទ្យា ថ្នាក់ទី១១ - អ្នកគ្រូ ឆេង ឆវ័ន្ត</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    @page WordSection1 {
      size: 210mm 297mm;
      margin: 20mm 15mm 20mm 15mm;
      mso-header-margin: 35.4pt;
      mso-footer-margin: 35.4pt;
      mso-paper-source: 0;
    }
    div.WordSection1 { page: WordSection1; }
    body {
      font-family: 'Kantumruy Pro', 'Khmer OS', 'Khmer OS Siemreap', 'Calibri', Arial, sans-serif;
      font-size: 11pt;
      line-height: 1.5;
      color: #0f172a;
    }
    table { width: 100%; border-collapse: collapse; margin-bottom: 12pt; }
    th, td { border: 1px solid #475569; padding: 6pt 8pt; font-size: 10pt; vertical-align: top; }
    th { background-color: #f1f5f9; color: #0f172a; font-weight: bold; }
    .official-header { margin-bottom: 14pt; }
    .header-national-top { text-align: center; margin-bottom: 8pt; }
    .country-title { font-family: 'Moul', 'Khmer OS Muol Light', cursive, serif; font-size: 13pt; color: #1e3b88; font-weight: bold; }
    .motto-title { font-family: 'Moul', 'Khmer OS Muol Light', cursive, serif; font-size: 10.5pt; color: #1e3b88; font-weight: bold; }
    .header-hierarchy-left { text-align: left; margin-bottom: 12pt; line-height: 1.5; }
    .ministry-title { font-family: 'Moul', 'Khmer OS Muol Light', cursive, serif; font-size: 11pt; color: #0f172a; font-weight: bold; }
    .department-title { font-family: 'Kantumruy Pro', 'Khmer OS Battambang', sans-serif; font-size: 9.5pt; color: #475569; }
    .school-title { font-family: 'Moul', 'Khmer OS Muol Light', cursive, serif; font-size: 11pt; color: #0f172a; font-weight: bold; }
    .metadata-card { margin-bottom: 14pt; border: 1px solid #cbd5e1; padding: 8pt; background-color: #f8fafc; }
    .plan-main-title { text-align: center; margin: 12pt 0; }
    .plan-main-title h1 { font-family: 'Moul', 'Khmer OS Muol Light', cursive, serif; font-size: 14pt; color: #0369a1; }
    .section-title { font-size: 12pt; font-weight: bold; color: #0369a1; border-left: 4pt solid #0284c7; padding-left: 6pt; margin-top: 14pt; margin-bottom: 8pt; }
    .board-container { border: 2px solid #334155; padding: 10pt; background: #f8fafc; margin: 10pt 0; }
    .board-header { font-weight: bold; text-align: center; margin-bottom: 8pt; }
    .board-column { border: 1px solid #cbd5e1; padding: 8pt; background: #ffffff; margin-bottom: 8pt; }
    .board-column-header { font-weight: bold; color: #0369a1; border-bottom: 1px solid #cbd5e1; padding-bottom: 4pt; margin-bottom: 6pt; }
    .worksheet-box { border: 1.5pt dashed #0284c7; background: #f0f9ff; padding: 10pt; margin: 10pt 0; }
    .math-frac { display: inline-table; vertical-align: middle; text-align: center; border-collapse: collapse; margin: 0 1pt; }
    .math-frac-num { border-bottom: 1pt solid #000; padding: 0 2pt 1pt 2pt; font-size: 8pt; line-height: 1; text-align: center; }
    .math-frac-den { padding: 1pt 2pt 0 2pt; font-size: 8pt; line-height: 1; text-align: center; }
  </style>
</head>
<body>
  <div class="WordSection1">
    <div class="official-header">
      <div class="header-national-top">
        <div class="country-title">ព្រះរាជាណាចក្រកម្ពុជា</div>
        <div class="motto-title">ជាតិ សាសនា ព្រះមហាក្សត្រ</div>
        <div style="text-align: center; color: #1e3b88; font-size: 9pt; margin: 3pt 0 8pt 0;">~ ❖ ~</div>
      </div>
      <div class="header-hierarchy-left">
        <div class="ministry-title">ក្រសួងអប់រំ យុវជន និងកីឡា</div>
        <div class="department-title">មន្ទីរអប់រំ យុវជន និងកីឡា ខេត្តសៀមរាប</div>
        <div class="school-title">វិទ្យាល័យសសរស្តម្ភ</div>
      </div>
    </div>

    <table class="metadata-card">
      <tr>
        <td style="border:none;"><strong>គ្រឹះស្ថានសិក្សា៖</strong> វិទ្យាល័យសសរស្តម្ភ</td>
        <td style="border:none;"><strong>កម្រិតថ្នាក់ & មុខវិជ្ជា៖</strong> ថ្នាក់ទី ១១ | គណិតវិទ្យា (ភាគ១)</td>
      </tr>
      <tr>
        <td style="border:none;"><strong>គ្រូបង្រៀនឯកទេស៖</strong> អ្នកគ្រូ ឆេង ឆវ័ន្ត (NIE & RUPP)</td>
        <td style="border:none;"><strong>ថិរវេលាបង្រៀន៖</strong> ៥០ នាទី (១ ម៉ោងពេញលេញ)</td>
      </tr>
    </table>

    <div class="plan-main-title">
      <h1>កិច្ចតែងការបង្រៀនគរុកោសល្យបែបការរិះរក (IBL - 5E Model)</h1>
      <p>ជំពូកទី ២៖ អនុគមន៍អិចស្ប៉ូណង់ស្យែល និងអនុគមន៍លោការីត (មេរៀនទី ១៖ អនុគមន៍អិចស្ប៉ូណង់ស្យែល)</p>
    </div>

    <div class="section-title">I. វត្ថុបំណងមេរៀន (Learning Objectives)</div>
    <table>
      <thead>
        <tr>
          <th style="width:25%;">ដែនអភិវឌ្ឍន៍</th>
          <th style="width:50%;">វត្ថុបំណងជាក់លាក់ (៥០ នាទី)</th>
          <th style="width:25%;">ឧបករណ៍វាស់វែង</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>១. វិជ្ជាសម្បទា (Knowledge)</strong></td>
          <td>
            • កំណត់បាននូវនិយមន័យពិតប្រាកដនៃអនុគមន៍អិចស្ប៉ូណង់ស្យែល <i>y</i> = <i>a</i><sup><i>x</i></sup> (<i>a</i> &gt; 0, <i>a</i> &ne; 1)។<br>
            • រៀបរាប់បានពីលក្ខណៈគ្រឹះ៖ ដែនកំណត់ <i>D</i> = ℝ, ដែនតម្លៃ <i>R</i><sub><i>f</i></sub> = (0, +&infin;), កាត់អ័ក្ស <i>y</i> ត្រង់ (0, 1), និងអាស៊ីមតូតដេក <i>y</i> = 0។
          </td>
          <td>សន្លឹកកិច្ចការ IBL & សំណួរផ្ទាល់មាត់</td>
        </tr>
        <tr>
          <td><strong>២. បំណិនសម្បទា (Skills)</strong></td>
          <td>
            • សង់តារាងតម្លៃ និងគូសក្រាបតំណាងអនុគមន៍ <i>y</i> = 2<sup><i>x</i></sup> និង <i>y</i> = (<table class="math-frac"><tr><td class="math-frac-num">1</td></tr><tr><td class="math-frac-den">2</td></tr></table>)<sup><i>x</i></sup> បានត្រឹមត្រូវ។<br>
            • វិភាគ និងប្រៀបធៀបទិសដៅអថេរភាព (កើនពេល <i>a</i> &gt; 1, ចុះពេល 0 &lt; <i>a</i> &lt; 1)។
          </td>
          <td>ការគូសក្រាបជាក់ស្តែងលើក្រដាសក្រឡា</td>
        </tr>
        <tr>
          <td><strong>៣. ចរិយាសម្បទា (Attitudes)</strong></td>
          <td>
            • បង្ហាញភាពជឿជាក់ និងស្មារតីសហការជាក្រុមក្នុងការពិសោធន៍បត់ក្រដាស និងស្វែងរកគំរូទិន្នន័យ។
          </td>
          <td>តារាងសង្កេតឥរិយាបថក្រុម</td>
        </tr>
      </tbody>
    </table>

    <div class="section-title">II. សម្ភារឧបទេស & ធនធានបង្រៀន</div>
    <p>• <strong>គ្រូ៖</strong> កិច្ចតែងការបង្រៀន, ស្លាយ 5E, បន្ទប់ពិសោធន៍ឌីជីថល GeoGebra/SVG, ក្រដាស A4 ពណ៌។</p>
    <p>• <strong>សិស្ស៖</strong> សៀវភៅពុម្ពគណិតវិទ្យាថ្នាក់ទី១១ (ភាគ១), ក្រដាស A4 ពិសោធន៍, បន្ទាត់, ប៊ិចពណ៌។</p>

    <br clear="all" style="mso-special-character:line-break; page-break-before:always;" />
    <div class="section-title">III. ដំណើរការបង្រៀនតាមទម្រង់ 5E Model (តារាងមេ ៥ ជួរឈរ)</div>
    <table>
      <thead>
        <tr>
          <th style="width:10%;">ថិរវេលា</th>
          <th style="width:18%;">ដំណាក់កាល 5E</th>
          <th style="width:27%;">ខ្លឹមសារមេរៀន</th>
          <th style="width:23%;">សកម្មភាពគ្រូ</th>
          <th style="width:22%;">សកម្មភាពសិស្ស</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="text-align:center;">៥ នាទី</td>
          <td><strong>ដំណាក់កាលទី ១៖<br>Engagement (ឈានចូលមេរៀន)</strong></td>
          <td>
            • ពិនិត្យវត្តមាន & បរិយាកាស<br>
            • រំលឹកស្វ័យគុណ៖ 2<sup>0</sup> = 1, 2<sup>1</sup> = 2, 2<sup>2</sup> = 4, 2<sup>3</sup> = 8... 2<sup><i>x</i></sup><br>
            • បញ្ហាចោទ៖ «បើបត់ក្រដាស A4 បាន ៤២ ដង តើកម្រាស់ឡើងដល់ណា?»
          </td>
          <td>• ស្វាគមន៍ & ត្រួតពិនិត្យវត្តមាន<br>• ចោទសួរដើម្បីបង្កើតចំណាប់អារម្មណ៍ និងការចង់ដឹង</td>
          <td>• គោរពគ្រូ & ឆ្លើយវត្តមាន<br>• ទស្សន៍ទាយចម្លើយដោយរំភើប</td>
        </tr>
        <tr>
          <td style="text-align:center;">១២ នាទី</td>
          <td><strong>ដំណាក់កាលទី ២៖<br>Exploration (ការរិះរក & ពិសោធន៍)</strong></td>
          <td>
            • ពិសោធន៍បត់ក្រដាស A4 ជាក្រុម<br>
            • ចំនួនដងបត់ <i>x</i>: 0, 1, 2, 3, 4, 5...<br>
            • ស្រទាប់ <i>y</i>: 1, 2, 4, 8, 16, 32...<br>
            • ទំនាក់ទំនង៖ <i>y</i> = 2<sup><i>x</i></sup>
          </td>
          <td>• ចែកក្រដាស A4 ដល់គ្រប់ក្រុម<br>• ណែនាំឱ្យបត់ និងរាប់ស្រទាប់<br>• ជួយសម្របសម្រួល និងកត់ត្រាទិន្នន័យ</td>
          <td>• ធ្វើការជាក្រុមបត់ក្រដាសជាក់ស្តែង<br>• បំពេញទិន្នន័យចូលសន្លឹកកិច្ចការ<br>• រកឃើញគំរូទិន្នន័យស្វ័យគុណ</td>
        </tr>
        <tr>
          <td style="text-align:center;">១៣ នាទី</td>
          <td><strong>ដំណាក់កាលទី ៣៖<br>Explanation (ការពន្យល់ & និយមន័យ)</strong></td>
          <td>
            • និយមន័យ៖ <i>y</i> = <i>a</i><sup><i>x</i></sup> (<i>a</i> &gt; 0, <i>a</i> &ne; 1)<br>
            • ដែនកំណត់ <i>D</i> = ℝ, ដែនតម្លៃ <i>R</i><sub><i>f</i></sub> = (0, +&infin;)<br>
            • កាត់អ័ក្ស <i>y</i> ត្រង់ (0, 1)<br>
            • អាស៊ីមតូតដេក៖ <i>y</i> = 0<br>
            • អថេរភាព៖ <i>a</i> &gt; 1 (កើន), 0 &lt; <i>a</i> &lt; 1 (ចុះ)
          </td>
          <td>• សង្ខេបចម្លើយសិស្សឡើងក្ដារខៀន<br>• ពន្យល់លម្អិតពីលក្ខណៈគ្រឹះ<br>• បង្ហាញក្រាបតំណាងជាក់ស្តែង</td>
          <td>• ផ្ទៀងផ្ទាត់ការយល់ដឹង<br>• កត់ត្រានិយមន័យ និងលក្ខណៈគ្រឹះចូលសៀវភៅ</td>
        </tr>
        <tr>
          <td style="text-align:center;">១២ នាទី</td>
          <td><strong>ដំណាក់កាលទី ៤៖<br>Elaboration (ពង្រីកចំណេះដឹង)</strong></td>
          <td>
            • ប្រតិបត្តិ៖ សង់តារាងតម្លៃ និងសង់ក្រាប <i>y</i> = 2<sup><i>x</i></sup> និង <i>y</i> = (<table class="math-frac"><tr><td class="math-frac-num">1</td></tr><tr><td class="math-frac-den">2</td></tr></table>)<sup><i>x</i></sup><br>
            • គណនាតម្លៃរហ័ស៖ <i>x</i> = -2 &rArr; <i>y</i> = 4;  <i>x</i> = -1 &rArr; <i>y</i> = 2;  <i>x</i> = 0 &rArr; <i>y</i> = 1;  <i>x</i> = 1 &rArr; <i>y</i> = <table class="math-frac"><tr><td class="math-frac-num">1</td></tr><tr><td class="math-frac-den">2</td></tr></table>;  <i>x</i> = 2 &rArr; <i>y</i> = <table class="math-frac"><tr><td class="math-frac-num">1</td></tr><tr><td class="math-frac-den">4</td></tr></table><br>
            • ម៉ូឌែលជីវភាពពិត៖ ការបំបែកខ្លួននៃបាក់តេរី <i>N</i>(<i>t</i>) = 1000 &middot; 2<sup><i>t</i></sup>
          </td>
          <td>• ដាក់លំហាត់ប្រតិបត្តិលើក្ដារខៀន<br>• ដើរពិនិត្យការសង់ក្រាបរបស់សិស្ស<br>• កែតម្រូវចំណុចខ្វះខាត</td>
          <td>• សង់ក្រាបលើក្រដាសក្រឡា<br>• បង្ហាញភាពខុសគ្នារវាងអនុគមន៍កើន និងចុះ</td>
        </tr>
        <tr>
          <td style="text-align:center;">៨ នាទី</td>
          <td><strong>ដំណាក់កាលទី ៥៖<br>Evaluation (ការវាយតម្លៃ & សង្ខេប)</strong></td>
          <td>
            • សំណួរ Exit Ticket ៣ សំណួរ<br>
            • សង្ខេបខ្លឹមសារមេរៀនឡើងវិញ<br>
            • ដាក់កិច្ចការផ្ទះ៖ លំហាត់ទំព័រ ៦២
          </td>
          <td>• វាយតម្លៃសិស្សតាមរយៈសន្លឹកកិច្ចការ<br>• ផ្តល់មតិកែលម្អ និងសរសើរក្រុមឆ្នើម<br>• ដាក់កិច្ចការផ្ទះ</td>
          <td>• បញ្ជូនសន្លឹកកិច្ចការវាយតម្លៃ<br>• កត់ត្រាកិច្ចការផ្ទះ និងត្រៀមសម្រាប់មេរៀនបន្ទាប់</td>
        </tr>
      </tbody>
    </table>

    <br clear="all" style="mso-special-character:line-break; page-break-before:always;" />
    <div class="section-title">IV. គំនូរប្លង់ក្ដារខៀន (Blackboard Plan — ៣ ជួរឈរ)</div>
    <table class="board-container">
      <tr>
        <td style="width:33%;">
          <div class="board-column-header">ផ្ទាំងទី ១៖ ទិន្នន័យពិសោធន៍</div>
          <p><strong>១. ពិសោធន៍បត់ក្រដាស A4៖</strong></p>
          <table style="font-size:9pt;">
            <tr><th>បត់ (x)</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td></tr>
            <tr><th>ស្រទាប់ (y)</th><td>1</td><td>2</td><td>4</td><td>8</td><td>16</td></tr>
          </table>
          <p>➔ គំរូទិន្នន័យ៖ <strong>y = 2<sup>x</sup></strong></p>
          <p style="font-size:8pt; color:#64748b;">• បត់ 14 ដង &approx; 1.64m | បត់ 27 ដង &approx; 8.8km | បត់ 42 ដង &approx; 384,400km</p>
        </td>
        <td style="width:34%;">
          <div class="board-column-header">ផ្ទាំងទី ២៖ និយមន័យ & លក្ខណៈ</div>
          <p><strong>២. និយមន័យ៖ y = a<sup>x</sup></strong> (a &gt; 0, a &ne; 1)</p>
          <p>• ដែនកំណត់៖ D = ℝ</p>
          <p>• ដែនតម្លៃ៖ R<sub>f</sub> = (0, +&infin;)</p>
          <p>• កាត់អ័ក្ស y ត្រង់ (0, 1)</p>
          <p>• អាស៊ីមតូតដេក៖ y = 0</p>
          <p>• a &gt; 1 ➔ កើនដាច់ខាត</p>
          <p>• 0 &lt; a &lt; 1 ➔ ចុះដាច់ខាត</p>
        </td>
        <td style="width:33%;">
          <div class="board-column-header">ផ្ទាំងទី ៣៖ គំនូសក្រាប & កិច្ចការផ្ទះ</div>
          <p><strong>៣. ក្រាប <i>y</i> = 2<sup><i>x</i></sup> និង <i>y</i> = (<table class="math-frac"><tr><td class="math-frac-num">1</td></tr><tr><td class="math-frac-den">2</td></tr></table>)<sup><i>x</i></sup></strong></p>
          <p style="font-size:9pt;">(ក្រាបកាត់ចំណុចរួម (0, 1) និងស៊ីមេទ្រីគ្នាធៀបនឹងអ័ក្ស Oy)</p>
          
          <!-- Chalkboard Curve Visualizer SVG for Word -->
          <svg xmlns="http://www.w3.org/2000/svg" width="210" height="85" viewBox="0 0 240 85" style="background:#0f172a; border-radius:4px; display:block; margin:4px 0;">
            <line x1="10" y1="70" x2="230" y2="70" stroke="#ef4444" stroke-dasharray="3 2" stroke-width="1" />
            <line x1="10" y1="70" x2="230" y2="70" stroke="#64748b" stroke-width="1" />
            <line x1="120" y1="6" x2="120" y2="80" stroke="#64748b" stroke-width="1" />
            <path d="M 20 69 Q 90 68 120 45 T 195 10" fill="none" stroke="#0284c7" stroke-width="2" />
            <path d="M 45 10 Q 75 45 120 45 T 220 69" fill="none" stroke="#d97706" stroke-width="2" />
            <circle cx="120" cy="45" r="3" fill="#f59e0b" />
            <text x="125" y="42" fill="#ffffff" font-size="7.5" font-family="'Kantumruy Pro', sans-serif">(0,1)</text>
            <text x="180" y="20" fill="#38bdf8" font-size="7.5" font-weight="bold">y=2ˣ</text>
            <text x="15" y="20" fill="#f59e0b" font-size="7.5" font-weight="bold">y=(½)ˣ</text>
          </svg>

          <p><strong>៤. កិច្ចការផ្ទះ៖</strong></p>
          <p>• លំហាត់ទី ១, ២, ៣ ទំព័រ ៦២ នៃសៀវភៅពុម្ពគណិតវិទ្យាថ្នាក់ទី១១</p>
        </td>
      </tr>
    </table>

    <div class="section-title">V. ឧបសម្ព័ន្ធ៖ សន្លឹកកិច្ចការរិះរករបស់សិស្ស (IBL Student Inquiry Worksheet)</div>
    <div style="border: 1.5pt dashed #0284c7; background: #f0f9ff; padding: 10pt; margin: 10pt 0;">
      <table style="border:none; margin-bottom:8pt;">
        <tr>
          <td style="border:none; font-weight:bold; color:#0369a1;">សន្លឹកកិច្ចការរិះរកគណិតវិទ្យា (INQUIRY WORKSHEET) — មេរៀន៖ អនុគមន៍អិចស្ប៉ូណង់ស្យែល</td>
          <td style="border:none; text-align:right; font-weight:bold;">ក្រុមទី៖ .......... ថ្នាក់ទី៖ ១១ .........</td>
        </tr>
      </table>
      <p><strong>🧪 ការណែនាំសកម្មភាពពិសោធន៍៖</strong> យកក្រដាស A4 មួយសន្លឹក បត់ជាពីរស្មើគ្នាម្តងហើយម្តងទៀត រាប់ចំនួនស្រទាប់ក្រដាសដែលកើនឡើង និងបំពេញតារាងទិន្នន័យ៖</p>
      <table>
        <thead>
          <tr style="background:#e0f2fe;">
            <th>ចំនួនដងនៃការបត់ (<i>x</i>)</th>
            <th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th><i>x</i> (ទូទៅ)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="font-weight:bold;">ចំនួនស្រទាប់ក្រដាស (<i>y</i>)</td>
            <td style="text-align:center; font-weight:bold; color:#0284c7;">1</td>
            <td style="text-align:center; color:#94a3b8;">......</td>
            <td style="text-align:center; color:#94a3b8;">......</td>
            <td style="text-align:center; color:#94a3b8;">......</td>
            <td style="text-align:center; color:#94a3b8;">......</td>
            <td style="text-align:center; font-weight:bold;"><i>y</i> = ..........</td>
          </tr>
        </tbody>
      </table>
      <p><strong>សំណួរពិភាក្សាក្នុងក្រុម៖</strong></p>
      <p>១. នៅពេល <i>x</i> កើន ១ ឯកតា តើតម្លៃ <i>y</i> ប្រែប្រួលដូចម្តេច? ➔ ចម្លើយ៖ ................................................................</p>
      <p>២. ចូរទាញរូបមន្តទំនាក់ទំនងទូទៅរវាងចំនួនស្រទាប់ <i>y</i> និងចំនួនដងបត់ <i>x</i> ➔ ចម្លើយ៖ <i>y</i> = ..............................................</p>
      <p>៣. ប្រសិនបើយើងបត់បាន ៧ ដង តើនឹងទទួលបានក្រដាសចំនួនប៉ុន្មានស្រទាប់? ➔ ចម្លើយ៖ .....................................................</p>
    </div>

    <div class="section-title">VI. យុទ្ធសាស្ត្រគាំទ្រសិស្សចម្រុះកម្រិត (Differentiation Strategies)</div>
    <table>
      <tr>
        <td style="width:50%; background:#fffbeb; border:1px solid #fde68a;">
          <strong style="color:#92400e;">🌱 សម្រាប់សិស្សរៀនយឺត (Scaffolding / Support):</strong>
          <p>• ផ្ដល់ការណែនាំជាជំហានៗក្នុងការបត់ក្រដាសជាក់ស្តែង និងការរាប់ស្រទាប់។</p>
          <p>• ជួយគណនាតម្លៃស្វ័យគុណ 2<sup>1</sup> = 2, 2<sup>2</sup> = 4, 2<sup>3</sup> = 8... ដើម្បីកត់សម្គាល់គំរូទិន្នន័យ។</p>
          <p>• ប្រើក្រដាសដែលមានក្រឡាចត្រង្គស្រាប់ និងចំណុចគោល (0, 1) ដើម្បីងាយស្រួលសង់ក្រាប។</p>
        </td>
        <td style="width:50%; background:#eff6ff; border:1px solid #bfdbfe;">
          <strong style="color:#1e40af;">🚀 សម្រាប់សិស្សពូកែ (Extension / Challenge):</strong>
          <p>• ចោទសួរអំពីការរកលីមីតនៅអនន្ត៖ lim 2<sup><i>x</i></sup> ពេល <i>x</i> &rarr; +&infin; និង <i>x</i> &rarr; -&infin;។</p>
          <p>• ឱ្យស្វែងយល់បន្ថែមអំពីអនុគមន៍អិចស្ប៉ូណង់ស្យែលធម្មជាតិ <i>y</i> = <i>e</i><sup><i>x</i></sup> (<i>e</i> &approx; 2.71828)។</p>
          <p>• សាកល្បងដោះស្រាយសមីការអិចស្ប៉ូណង់ស្យែលគ្រឹះ 2<sup><i>x</i></sup> = 32 និង 3<sup><i>x</i>+1</sup> = 27។</p>
        </td>
      </tr>
    </table>

    <!-- VII. Signatures (ទម្រង់តាមរូបភាពទី១) -->
    <table style="margin-top: 30pt; width: 100%; border: none; border-collapse: collapse;">
      <tr>
        <td style="border:none; text-align:center; vertical-align:top; width:33.33%;">
          <div style="font-family:'Moul', 'Khmer OS Muol Light', cursive; font-size:10.5pt; color:#0f172a; margin-bottom:4pt;">បានឃើញ និងឯកភាព</div>
          <div style="font-family:'Kantumruy Pro', sans-serif; font-size:9.5pt; color:#334155; margin-bottom:4pt;">ថ្ងៃ..................... ខែ............... ឆ្នាំ..........</div>
          <div style="font-family:'Moul', 'Khmer OS Muol Light', cursive; font-size:11pt; color:#1e3b88; margin-bottom:50pt;">នាយកវិទ្យាល័យ</div>
        </td>
        <td style="border:none; text-align:center; vertical-align:top; width:33.33%;">
          <div style="font-family:'Moul', 'Khmer OS Muol Light', cursive; font-size:10.5pt; color:#0f172a; margin-bottom:4pt;">បានពិនិត្យត្រឹមត្រូវ</div>
          <div style="font-family:'Kantumruy Pro', sans-serif; font-size:9.5pt; color:#334155; margin-bottom:4pt;">ថ្ងៃ..................... ខែ............... ឆ្នាំ..........</div>
          <div style="font-family:'Moul', 'Khmer OS Muol Light', cursive; font-size:11pt; color:#1e3b88; margin-bottom:50pt;">ប្រធានក្រុមបច្ចេកទេស</div>
        </td>
        <td style="border:none; text-align:center; vertical-align:top; width:33.33%;">
          <div style="min-height:16pt; margin-bottom:4pt;">&nbsp;</div>
          <div style="font-family:'Kantumruy Pro', sans-serif; font-size:9.5pt; color:#334155; margin-bottom:4pt;">ថ្ងៃ..................... ខែ............... ឆ្នាំ..........</div>
          <div style="font-family:'Moul', 'Khmer OS Muol Light', cursive; font-size:11pt; color:#1e3b88; margin-bottom:40pt;">ហត្ថលេខាគ្រូបង្រៀន</div>
          <div style="font-family:'Moul', 'Khmer OS Muol Light', cursive; font-size:12pt; color:#1e3b88; font-weight:bold;">ឆេង ឆវ័ន្ត</div>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>
    `;

    try {
      const blob = new Blob(['\ufeff' + wordContent], { type: 'application/msword;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'កិច្ចតែងការបង្រៀន_អនុគមន៍អិចស្ប៉ូណង់ស្យែល_ថ្នាក់ទី១១_អ្នកគ្រូ_ឆេង_ឆវ័ន្ត.doc';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      notifyToast('✅ បានទាញយកកិច្ចតែងការជា Word (.doc) ដោយជោគជ័យ!');
    } catch (e) {
      console.error(e);
      notifyToast('❌ បរាជ័យក្នុងការទាញយក Word');
    }
  };

  /* ============================================================
     SHARED COMPLETE LESSON PLAN HTML GENERATOR (FOR PDF & PREVIEW)
     ============================================================ */
    function getCompleteLessonPlanHTML() {
    return `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Moul&family=Outfit:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; }

        .pdf-plan-wrap {
          font-family: 'Kantumruy Pro', 'Khmer OS Siemreap', 'Calibri', sans-serif;
          color: #1e293b;
          line-height: 1.6;
          font-size: 9pt;
          background: #ffffff;
          width: 100%;
          max-width: 794px;
          padding: 10px 18px;
        }
        .pdf-section { margin-bottom: 14pt; }
        .pdf-page-break-before {
          page-break-before: always !important;
          break-before: page !important;
        }

        /* Pure HTML/CSS Clean Mathematical Typography */
        .math-sym {
          font-family: 'Cambria Math', 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 600;
          color: #0369a1;
          background: rgba(2, 132, 199, 0.08);
          padding: 0 4px;
          border-radius: 3px;
          display: inline-block;
          line-height: 1.3;
        }
        .math-sym sup, .math-sym sub {
          font-size: 0.72em;
          font-style: normal;
        }
        .math-frac {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          vertical-align: middle;
          font-size: 0.85em;
          margin: 0 1px;
        }
        .math-frac .num {
          border-bottom: 1px solid currentColor;
          padding: 0 2px;
          line-height: 1.05;
        }
        .math-frac .den {
          padding: 0 2px;
          line-height: 1.05;
        }
        .math-highlight-card {
          background: linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%);
          border: 1.5px solid #bae6fd;
          border-radius: 8px;
          padding: 6px 14px;
          margin: 6px 0;
          text-align: center;
          font-family: 'Cambria Math', 'Georgia', 'Times New Roman', serif;
          font-size: 11pt;
          font-weight: 700;
          color: #0369a1;
          page-break-inside: avoid;
        }

        /* Official Header */
        .pdf-header { text-align: center; margin-bottom: 14pt; }
        .pdf-header .country-title {
          font-family: 'Moul', cursive;
          font-size: 13pt; font-weight: normal;
          color: #0f172a; letter-spacing: 0.05em;
          margin-bottom: 3px; line-height: 1.5;
        }
        .pdf-header .motto-title {
          font-family: 'Moul', cursive;
          font-size: 10.5pt; font-weight: normal;
          color: #0f172a; margin-bottom: 6px; line-height: 1.4;
        }
        .pdf-header-divider {
          width: 140px; height: 2px;
          background: #0f172a; margin: 6px auto 14px auto;
        }

        /* Metadata Table for 100% html2canvas stability */
        .pdf-metadata-table {
          width: 100%; border-collapse: collapse;
          margin-bottom: 14pt;
          background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px;
          page-break-inside: avoid; overflow: hidden;
        }
        .pdf-metadata-table td {
          padding: 9px 12px; vertical-align: top;
          border-right: 1px solid #e2e8f0; width: 25%;
        }
        .pdf-metadata-table td:last-child { border-right: none; }
        .pdf-meta-label {
          font-size: 7pt; color: #64748b; font-weight: 700;
          text-transform: uppercase; display: block; margin-bottom: 2px;
        }
        .pdf-meta-value { font-weight: 700; color: #0f172a; font-size: 8.8pt; }

        /* Title Block */
        .pdf-title-block {
          text-align: center; margin-bottom: 14pt;
          padding: 6px 0 10px 0; border-bottom: 2px solid #e2e8f0;
          page-break-inside: avoid;
        }
        .pdf-title-block h1 {
          font-family: 'Moul', cursive;
          font-size: 13.5pt; font-weight: normal;
          color: #0369a1; margin: 0 0 6px 0; line-height: 1.55;
        }
        .pdf-title-block .subtitle {
          font-size: 9.5pt; color: #1e293b; font-weight: 600; line-height: 1.6;
        }

        /* Section Title with Accent Bar */
        .pdf-section-title {
          font-size: 10.5pt; font-weight: 700; color: #0369a1;
          border-left: 4px solid #0284c7;
          padding: 3px 0 3px 9px; margin: 14pt 0 8pt 0;
          page-break-after: avoid;
        }

        /* Standard 5-Column & Master Tables */
        .pdf-table {
          width: 100%; border-collapse: collapse;
          margin-bottom: 10pt; font-size: 8.5pt;
          background: #ffffff; border: 1px solid #cbd5e1;
        }
        .pdf-table th {
          background: #f1f5f9; color: #0f172a; font-weight: 700;
          text-align: center; padding: 6px 7px;
          border: 1px solid #cbd5e1; vertical-align: middle; font-size: 8.5pt;
        }
        .pdf-table td {
          border: 1px solid #cbd5e1; padding: 6px 7px;
          vertical-align: top; line-height: 1.55;
        }
        .pdf-table tbody tr:nth-child(even) { background-color: #fafbfc; }
        .pdf-table tr { page-break-inside: avoid; }

        /* 5E Stage Badges */
        .badge-stage {
          display: inline-block; padding: 2px 7px; border-radius: 4px;
          font-size: 7.5pt; font-weight: 700; margin-bottom: 4px;
        }
        .badge-engage  { background: #e0f2fe; color: #0369a1; border: 1px solid rgba(2, 132, 199, 0.3); }
        .badge-explore { background: #fef3c7; color: #92400e; border: 1px solid rgba(245, 158, 11, 0.3); }
        .badge-explain { background: #ecfdf5; color: #047857; border: 1px solid rgba(16, 185, 129, 0.3); }
        .badge-elaborate { background: #f3e8ff; color: #6b21a8; border: 1px solid rgba(139, 92, 246, 0.3); }
        .badge-evaluate  { background: #fee2e2; color: #991b1b; border: 1px solid rgba(239, 68, 68, 0.3); }

        /* Question Box */
        .pdf-question-box {
          background: #ecfdf5; border: 1.5px solid #10b981;
          border-radius: 8px; padding: 8px 12px;
          margin-bottom: 8pt; page-break-inside: avoid;
        }

        /* Materials Table Layout */
        .pdf-mats-table { width: 100%; border-collapse: collapse; margin-bottom: 10pt; page-break-inside: avoid; }
        .pdf-mats-table td { width: 50%; vertical-align: top; padding: 0; }
        .pdf-mats-table td:first-child { padding-right: 5px; }
        .pdf-mats-table td:last-child  { padding-left: 5px; }
        .pdf-material-card {
          border: 1px solid #cbd5e1; border-radius: 6px;
          padding: 8px 10px; background: #f8fafc; font-size: 8.5pt;
          height: 100%;
        }

        /* Blackboard Layout (Chalkboard Styling with 3 Clean Columns) */
        .pdf-board-container {
          background: #1e293b; border: 6px solid #78350f;
          border-radius: 8px; padding: 10px;
          color: #f8fafc; margin-bottom: 10pt; page-break-inside: avoid;
        }
        .pdf-board-header {
          text-align: center; color: #fde047; font-weight: 700;
          font-size: 8pt; margin-bottom: 8px; padding-bottom: 4px;
          border-bottom: 1px dashed rgba(255, 255, 255, 0.2);
        }
        .pdf-board-table-outer { width: 100%; border-collapse: collapse; }
        .pdf-board-table-outer td { width: 33.33%; vertical-align: top; padding: 0; }
        .pdf-board-table-outer td:not(:last-child) { padding-right: 6px; }
        .pdf-board-column {
          border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 5px;
          padding: 8px; background: rgba(15, 23, 42, 0.5);
          font-size: 7.8pt; line-height: 1.5; height: 100%;
        }
        .pdf-board-col-header {
          font-weight: 700; color: #38bdf8;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          padding-bottom: 3px; margin-bottom: 5px;
          text-align: center; font-size: 8pt;
        }
        .pdf-inner-table {
          width: 100%; border-collapse: collapse; margin: 4px 0; font-size: 7.5pt; color: #f8fafc;
        }
        .pdf-inner-table td, .pdf-inner-table th {
          border: 1px solid rgba(255, 255, 255, 0.25); padding: 2px 4px; text-align: center;
        }

        /* Worksheet Box */
        .pdf-worksheet-box {
          border: 2px dashed #0284c7; background: #f0f9ff;
          border-radius: 8px; padding: 10px 12px;
          margin-bottom: 10pt; font-size: 8.5pt; page-break-inside: avoid;
        }

        /* Differentiation Table Layout */
        .pdf-diff-table { width: 100%; border-collapse: collapse; margin-bottom: 10pt; page-break-inside: avoid; }
        .pdf-diff-table td { width: 50%; vertical-align: top; padding: 0; }
        .pdf-diff-table td:first-child { padding-right: 5px; }
        .pdf-diff-table td:last-child  { padding-left: 5px; }
        .pdf-diff-card { border-radius: 6px; padding: 8px 10px; font-size: 8.5pt; height: 100%; }
        .pdf-diff-slow { background: #fffbeb; border: 1.5px solid #fde68a; }
        .pdf-diff-fast { background: #eff6ff; border: 1.5px solid #bfdbfe; }

        /* Signatures Table (ទម្រង់តាមរូបភាពទី១) */
        .pdf-sig-table {
          width: 100%; border-collapse: collapse;
          margin-top: 15pt; padding-top: 10pt;
          font-size: 9pt; page-break-inside: avoid;
        }
        .pdf-sig-table td { width: 33.33%; text-align: center; vertical-align: top; padding: 6px 8px; border: none; }
        .pdf-sig-approval { font-family: 'Moul', cursive; font-size: 9.5pt; color: #0f172a; margin-bottom: 4px; min-height: 14pt; }
        .pdf-sig-date { font-family: 'Kantumruy Pro', sans-serif; font-size: 8.5pt; color: #334155; margin-bottom: 4px; white-space: nowrap; }
        .pdf-sig-role { font-family: 'Moul', cursive; font-size: 9.8pt; color: #1e3b88; }
        .pdf-sig-name { font-family: 'Moul', cursive; font-size: 11pt; color: #1e3b88; }
      </style>

      <div class="pdf-plan-wrap">

        <!-- 1. OFFICIAL HEADER (តាមគំរូរូបភាពទី២) -->
        <div class="pdf-header">
          <div class="header-national-top" style="text-align: center; margin-bottom: 8pt;">
            <div class="country-title" style="font-family:'Moul', cursive; font-size:12.5pt; color:#1e3b88; margin-bottom:2px;">ព្រះរាជាណាចក្រកម្ពុជា</div>
            <div class="motto-title" style="font-family:'Moul', cursive; font-size:10.5pt; color:#1e3b88; margin-bottom:4px;">ជាតិ សាសនា ព្រះមហាក្សត្រ</div>
            <div class="motto-ornament" style="text-align:center; margin-bottom:6px;">
              <svg width="60" height="10" viewBox="0 0 60 10" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block; vertical-align:middle;">
                <path d="M0 5 H22 M38 5 H60" stroke="#1e3b88" stroke-width="1.2" stroke-linecap="round"/>
                <polygon points="30,1 34,5 30,9 26,5" fill="#1e3b88"/>
              </svg>
            </div>
          </div>
          <div class="header-hierarchy-left" style="text-align: left; margin-bottom: 10pt; line-height: 1.45;">
            <div class="ministry-title" style="font-family:'Moul', cursive; font-size:10.5pt; color:#0f172a; margin-bottom:2px;">ក្រសួងអប់រំ យុវជន និងកីឡា</div>
            <div class="department-title" style="font-family:'Kantumruy Pro', sans-serif; font-size:9.2pt; font-weight:500; color:#475569; margin-bottom:2px;">មន្ទីរអប់រំ យុវជន និងកីឡា ខេត្តសៀមរាប</div>
            <div class="school-title" style="font-family:'Moul', cursive; font-size:10.5pt; color:#0f172a;">វិទ្យាល័យសសរស្តម្ភ</div>
          </div>
        </div>

        <!-- 2. METADATA TABLE -->
        <table class="pdf-metadata-table">
          <tr>
            <td>
              <span class="pdf-meta-label">គ្រឹះស្ថានសិក្សា</span>
              <span class="pdf-meta-value">វិទ្យាល័យសសរស្តម្ភ</span>
            </td>
            <td>
              <span class="pdf-meta-label">កម្រិតថ្នាក់ &amp; មុខវិជ្ជា</span>
              <span class="pdf-meta-value">ថ្នាក់ទី ១១ | គណិតវិទ្យា (ភាគ១)</span>
            </td>
            <td>
              <span class="pdf-meta-label">គ្រូបង្រៀនឯកទេស</span>
              <span class="pdf-meta-value">អ្នកគ្រូ ឆេង ឆវ័ន្ត (NIE &amp; RUPP)</span>
            </td>
            <td>
              <span class="pdf-meta-label">ថិរវេលាបង្រៀន</span>
              <span class="pdf-meta-value">៥០ នាទី (១ ម៉ោងពេញលេញ)</span>
            </td>
          </tr>
        </table>

        <!-- 3. TITLE BLOCK -->
        <div class="pdf-title-block">
          <h1>កិច្ចតែងការបង្រៀនគរុកោសល្យបែបការរិះរក (IBL – 5E Model)</h1>
          <div class="subtitle">
            ជំពូកទី ២៖ អនុគមន៍អិចស្ប៉ូណង់ស្យែល និងអនុគមន៍លោការីត (ទំព័រ ៥៧–៨៨)<br>
            <strong>មេរៀនទី ១៖ អនុគមន៍អិចស្ប៉ូណង់ស្យែល (និយមន័យ ក្រាប និងលក្ខណៈគ្រឹះ)</strong>
          </div>
        </div>

        <!-- I. LEARNING OBJECTIVES -->
        <div class="pdf-section">
          <div class="pdf-section-title">I. វត្ថុបំណងមេរៀន (Learning Objectives)</div>
          <table class="pdf-table">
            <thead>
              <tr>
                <th style="width:25%">ដែនអភិវឌ្ឍន៍</th>
                <th style="width:50%">វត្ថុបំណងជាក់លាក់ (៥០ នាទី សិស្សអាច៖)</th>
                <th style="width:25%">ឧបករណ៍វាស់វែង &amp; ភស្តុតាង</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>១. វិជ្ជាសម្បទា (Knowledge)</strong></td>
                <td>
                  • កំណត់បាននូវនិយមន័យ <span class="math-sym"><i>y</i> = <i>a</i><sup><i>x</i></sup></span>
                    (<span class="math-sym"><i>a</i> &gt; 0, <i>a</i> ≠ 1</span>) បានត្រឹមត្រូវ។<br>
                  • កំណត់បានដែនកំណត់ <span class="math-sym"><i>D</i> = ℝ</span>, ដែនតម្លៃ
                    <span class="math-sym"><i>R<sub>f</sub></i> = (0, +∞)</span>,
                    បន្ទាត់អាស៊ីមតូតដេក <span class="math-sym"><i>y</i> = 0</span>,
                    និងចំណុចកាត់ <span class="math-sym">(0, 1)</span>។<br>
                  • បែងចែកអាកប្បកិរិយាក្រាប៖ <span class="math-sym"><i>a</i> &gt; 1 ⇒</span> កើនដាច់ខាត និង
                    <span class="math-sym">0 &lt; <i>a</i> &lt; 1 ⇒</span> ចុះដាច់ខាត។
                </td>
                <td>• សំណួរផ្ទាល់មាត់<br>• ការបំពេញតារាងលក្ខណៈ<br>• សន្លឹក Exit Ticket</td>
              </tr>
              <tr>
                <td><strong>២. បំណិនសម្បទា (Skills)</strong></td>
                <td>
                  • ពិសោធន៍បត់ក្រដាស A4 ប្រមូលទិន្នន័យជាក់ស្តែង និងបំពេញតារាងតម្លៃ
                    <span class="math-sym"><i>x</i> → <i>y</i></span>។<br>
                  • សង្កេតរកឃើញគំរូទិន្នន័យ (Pattern Recognition) និងទាញរូបមន្ត
                    <span class="math-sym"><i>y</i> = 2<sup><i>x</i></sup></span>។<br>
                  • សង់ក្រាបនៃ <span class="math-sym"><i>y</i> = 2<sup><i>x</i></sup></span> និង
                    <span class="math-sym"><i>y</i> = (<span class="math-frac"><span class="num">1</span><span class="den">2</span></span>)<sup><i>x</i></sup></span>
                    លើក្រដាសក្រឡាបានត្រឹមត្រូវតាមមាត្រដ្ឋាន។
                </td>
                <td>• សន្លឹកកិច្ចការ IBL Worksheet<br>• គំនូសក្រាបជាក់ស្តែងសិស្ស</td>
              </tr>
              <tr>
                <td><strong>៣. ចរិយាសម្បទា (Attitudes)</strong></td>
                <td>
                  • បណ្ដុះស្មារតីចង់ដឹងចង់ឃើញ ចោទសួរដេញដោល និងការគិតស៊ីជម្រៅ (Inquiry Mindset)។<br>
                  • សហការជាក្រុម និងទទួលខុសត្រូវខ្ពស់ក្នុងការពិសោធន៍។<br>
                  • យល់ដឹងពីសារប្រយោជន៍ក្នុងជីវភាពពិត (កំណើនបាក់តេរី, ការប្រាក់, វិទ្យុសកម្ម)។
                </td>
                <td>• ការសង្កេតអាកប្បកិរិយាផ្ទាល់<br>• ស្មារតីជួយគ្នាទៅវិញទៅមក</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- II. DRIVING QUESTION & MATERIALS -->
        <div class="pdf-section">
          <div class="pdf-section-title">II. សំណួរគន្លឹះរិះរក និងសម្ភារឧបទេស (Inquiry Driving Question &amp; Materials)</div>
          <div class="pdf-question-box">
            <strong style="color:#065f46">❓ សំណួរគន្លឹះបំផុសការរិះរក (Driving Question)៖</strong>
            <div style="color:#047857;margin-top:3px;font-weight:500">
              «តើបំរែបំរួលប្រភេទណា ដែលធ្វើឱ្យបរិមាណមួយកើនឡើងទ្វេដង ឬកើនឡើងយ៉ាងគំហុកមិននឹកស្មានដល់ ហើយតើយើងអាចតាងវាដោយគំរូគណិតវិទ្យាបែបណា?»
            </div>
          </div>
          <table class="pdf-mats-table">
            <tr>
              <td>
                <div class="pdf-material-card">
                  <strong style="color:#0369a1">🛠️ សម្ភារឧបទេសសម្រាប់គ្រូ៖</strong>
                  <div style="margin-top:3px;color:#334155;line-height:1.5">
                    • កិច្ចតែងការបង្រៀន, ស្លាយ 5E, បន្ទប់ពិសោធន៍ឌីជីថល GeoGebra/SVG<br>
                    • ក្ដារខៀន, ប៊ិចហ្វឺត, បន្ទាត់ត្រីកោណ, ក្រដាស A4 ពណ៌
                  </div>
                </div>
              </td>
              <td>
                <div class="pdf-material-card">
                  <strong style="color:#047857">👥 សម្ភារសម្រាប់ក្រុមសិស្ស (៤-៥ នាក់/ក្រុម)៖</strong>
                  <div style="margin-top:3px;color:#334155;line-height:1.5">
                    • សៀវភៅពុម្ពគណិតវិទ្យាថ្នាក់ទី១១ (ភាគ១), ក្រដាស A4 ពិសោធន៍<br>
                    • សន្លឹកកិច្ចការរិះរកប្រចាំក្រុម (Inquiry Sheet), ក្រដាសក្រឡាចត្រង្គ, ប៊ិចពណ៌
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>

        <!-- III. 5E TEACHING PROCESS TABLE -->
        <div class="pdf-section pdf-page-break-before">
          <div class="pdf-section-title">III. តារាងដំណើរការបង្រៀន និងរៀនតាមទម្រង់ 5E IBL (៥ ជួរឈរស្តង់ដារជាតិ)</div>
          <table class="pdf-table">
            <thead>
              <tr>
                <th style="width:9%;text-align:center">ថិរវេលា</th>
                <th style="width:17%">ដំណាក់កាល 5E</th>
                <th style="width:28%">ខ្លឹមសារមេរៀន &amp; គំនិតគន្លឹះ</th>
                <th style="width:23%">សកម្មភាពគ្រូ</th>
                <th style="width:23%">សកម្មភាពសិស្ស</th>
              </tr>
            </thead>
            <tbody>
              <!-- 1. ENGAGE -->
              <tr>
                <td style="text-align:center;font-weight:bold;color:#0369a1;background:#f0f9ff">៧ នាទី</td>
                <td>
                  <span class="badge-stage badge-engage">១. ENGAGE</span><br>
                  <strong>ការចូលរួម &amp; បំផុសចម្ងល់</strong>
                </td>
                <td>
                  <strong>អាថ៌កំបាំងបត់ក្រដាស A4៖</strong><br>
                  • បើក្រដាសកម្រាស់ 0.1mm បត់ ៥០ ដង កម្ពស់ដល់ណា?<br>
                  • បង្កើតសម្មតិកម្ម (Hypothesis)<br>
                  • បែងចែកកំណើនរបៀបបូក vs កំណើនរបៀបគុណ
                </td>
                <td>
                  • រៀបចំថ្នាក់ &amp; បែងចែកក្រុមសិស្ស (៤-៥ នាក់/ក្រុម)។<br>
                  • លើកក្រដាស A4 ចោទសួរ៖ <em>«បើបត់ជាពីរជាបន្តបន្ទាប់ តើកម្រាស់កើនយ៉ាងដូចម្តេច?»</em><br>
                  • បំផុសចម្ងល់៖ <em>«តើបត់ ៥០ ដង ខ្ពស់ដល់ឋានព្រះច័ន្ទទេ?»</em>
                </td>
                <td>
                  • ចូលរួមតាមក្រុមដោយស្មារតីរួសរាយ។<br>
                  • ធ្វើការទស្សន៍ទាយចម្លើយ (Hypothesis) ដោយសេរី។<br>
                  • ចាប់ផ្ដើមមានចម្ងល់ និងចង់ដឹងពីការពិតតាមរយៈការពិសោធន៍ជាក់ស្តែង។
                </td>
              </tr>

              <!-- 2. EXPLORE -->
              <tr>
                <td style="text-align:center;font-weight:bold;color:#0369a1;background:#f0f9ff">១៥ នាទី</td>
                <td>
                  <span class="badge-stage badge-explore">២. EXPLORE</span><br>
                  <strong>ការរុករក &amp; ពិសោធន៍</strong>
                </td>
                <td>
                  <strong>តារាងទិន្នន័យពិសោធន៍៖</strong><br>
                  • បត់ (<span class="math-sym"><i>x</i></span>): 0, 1, 2, 3, 4, … <span class="math-sym"><i>x</i></span><br>
                  • ស្រទាប់ (<span class="math-sym"><i>y</i></span>): 1, 2, 4, 8, 16, … <span class="math-sym">2<sup><i>x</i></sup></span><br>
                  <strong>របកគំហើញគំរូទិន្នន័យ៖</strong><br>
                  តម្លៃ <span class="math-sym"><i>y</i></span> គុណនឹង ២ ជានិច្ចពេល <span class="math-sym"><i>x</i></span> កើន ១ នាំឱ្យទាញបានរូបមន្ត <span class="math-sym"><i>y</i> = 2<sup><i>x</i></sup></span>។
                </td>
                <td>
                  • ចែកក្រដាស A4 និងសន្លឹកកិច្ចការ IBL ជូនគ្រប់ក្រុម។<br>
                  • ណែនាំឱ្យបត់ និងរាប់ស្រទាប់ក្រដាស (<span class="math-sym"><i>x</i> = 0, 1, 2, 3, 4…</span>)។<br>
                  • ដើរសម្របសម្រួល និងជួយគាំទ្រ (Scaffolding) ដោយមិនទាន់ប្រាប់រូបមន្តជាមុនឡើយ។
                </td>
                <td>
                  • ក្រុមសិស្សបត់ក្រដាសជាក់ស្តែង (0 → 1, 1 → 2, 2 → 4, 3 → 8, 4 → 16…)។<br>
                  • បំពេញតារាងក្នុងសន្លឹកកិច្ចការ និងពិភាក្សាទាញរកទំនាក់ទំនងរវាង <span class="math-sym"><i>y</i></span> និង <span class="math-sym"><i>x</i></span>។<br>
                  • សន្និដ្ឋានឃើញគំរូទិន្នន័យស្វ័យគុណ។
                </td>
              </tr>

              <!-- 3. EXPLAIN -->
              <tr>
                <td style="text-align:center;font-weight:bold;color:#0369a1;background:#f0f9ff">១២ នាទី</td>
                <td>
                  <span class="badge-stage badge-explain">៣. EXPLAIN</span><br>
                  <strong>ការពន្យល់ &amp; និយមន័យ</strong>
                </td>
                <td>
                  <strong>និយមន័យអនុគមន៍អិចស្ប៉ូណង់ស្យែល៖</strong><br>
                  <div class="math-highlight-card">
                    <i>y</i> = <i>a</i><sup><i>x</i></sup> &nbsp;(<i>a</i> &gt; 0, <i>a</i> ≠ 1)
                  </div>
                  • ដែនកំណត់៖ <span class="math-sym"><i>D</i> = ℝ = (−∞, +∞)</span><br>
                  • ដែនតម្លៃ៖ <span class="math-sym"><i>R<sub>f</sub></i> = (0, +∞)</span><br>
                  • ចំណុចកាត់អ័ក្ស៖ <span class="math-sym">(0, 1)</span> ព្រោះ <span class="math-sym"><i>a</i><sup>0</sup> = 1</span><br>
                  • អាស៊ីមតូតដេក៖ <span class="math-sym"><i>y</i> = 0</span> (អ័ក្សអាប់ស៊ីស)
                </td>
                <td>
                  • អញ្ជើញតំណាងក្រុមឡើងរាយការណ៍ និងសរសេររូបមន្តដែលរកឃើញ។<br>
                  • ធ្វើទូទៅកម្មពីករណីជាក់ស្តែង <span class="math-sym"><i>y</i> = 2<sup><i>x</i></sup></span> ទៅករណីទូទៅ <span class="math-sym"><i>y</i> = <i>a</i><sup><i>x</i></sup></span>។<br>
                  • សួរសំណួរដេញដោល៖ <em>«ហេតុអ្វីចាំបាច់ត្រូវការលក្ខខណ្ឌ <span class="math-sym"><i>a</i> &gt; 0</span> និង <span class="math-sym"><i>a</i> ≠ 1</span>?»</em><br>
                  • បង្ហាញក្រាប និងពន្យល់អាស៊ីមតូតដេក <span class="math-sym"><i>y</i> = 0</span>។
                </td>
                <td>
                  • តំណាងក្រុមឡើងរាយការណ៍៖ <em>«ក្រុមយើងរកឃើញរូបមន្ត <span class="math-sym"><i>y</i> = 2<sup><i>x</i></sup></span>»</em>។<br>
                  • សិស្សឆ្លើយសំណួរគ្រូ៖ <em>«បើ <span class="math-sym"><i>a</i> = 1</span> នាំឱ្យ <span class="math-sym">1<sup><i>x</i></sup> = 1</span> ថេរ; បើ <span class="math-sym"><i>a</i> ≤ 0</span> មិនអាចកំណត់លើ <span class="math-sym">ℝ</span> បាន»</em>។<br>
                  • កត់ត្រានិយមន័យ និងលក្ខណៈស្នូលចូលសៀវភៅ។
                </td>
              </tr>

              <!-- 4. ELABORATE -->
              <tr>
                <td style="text-align:center;font-weight:bold;color:#0369a1;background:#f0f9ff">១០ នាទី</td>
                <td>
                  <span class="badge-stage badge-elaborate">៤. ELABORATE</span><br>
                  <strong>ការពង្រីកចំណេះដឹង</strong>
                </td>
                <td>
                  <strong>អថេរភាព &amp; ក្រាបឆ្លុះ៖</strong><br>
                  • <span class="math-sym"><i>a</i> &gt; 1 ⇒</span> កើន | <span class="math-sym">0 &lt; <i>a</i> &lt; 1 ⇒</span> ចុះ<br>
                  • ក្រាប <span class="math-sym"><i>y</i> = 2<sup><i>x</i></sup></span> និង <span class="math-sym"><i>y</i> = (<span class="math-frac"><span class="num">1</span><span class="den">2</span></span>)<sup><i>x</i></sup></span> ឆ្លុះគ្នាធៀបនឹងអ័ក្ស <span class="math-sym">(<i>Oy</i>)</span><br>
                  • តម្លៃរហ័ស៖
                    <span class="math-sym"><i>x</i> = −2 ⇒ <i>y</i> = 4</span>;
                    <span class="math-sym"><i>x</i> = −1 ⇒ <i>y</i> = 2</span>;
                    <span class="math-sym"><i>x</i> = 0 ⇒ <i>y</i> = 1</span>;
                    <span class="math-sym"><i>x</i> = 1 ⇒ <i>y</i> = <span class="math-frac"><span class="num">1</span><span class="den">2</span></span></span>;
                    <span class="math-sym"><i>x</i> = 2 ⇒ <i>y</i> = <span class="math-frac"><span class="num">1</span><span class="den">4</span></span></span><br>
                  • ម៉ូឌែលបាក់តេរី៖ <span class="math-sym"><i>N</i>(<i>t</i>) = 100 · 2<sup><i>t</i></sup> ⇒ <i>N</i>(3) = 800</span>
                </td>
                <td>
                  • ដាក់បញ្ហាប្រឈមថ្មី៖ <em>«ចុះបើគោលជាប្រភាគ <span class="math-sym"><i>a</i> = <span class="math-frac"><span class="num">1</span><span class="den">2</span></span></span> តើក្រាប និងអថេរភាពរបស់ <span class="math-sym"><i>y</i> = (<span class="math-frac"><span class="num">1</span><span class="den">2</span></span>)<sup><i>x</i></sup></span> នឹងទៅជាយ៉ាងណា?»</em><br>
                  • ឱ្យសិស្សគណនាតម្លៃ និងសង់ក្រាបលើក្រដាសក្រឡា។<br>
                  • ណែនាំភ្ជាប់ទៅម៉ូឌែលបាក់តេរី <span class="math-sym"><i>N</i>(<i>t</i>) = 100 · 2<sup><i>t</i></sup></span>។
                </td>
                <td>
                  • គណនាក្នុងក្រុមសម្រាប់ <span class="math-sym"><i>x</i> ∈ {−2, −1, 0, 1, 2}</span>។<br>
                  • សង់ក្រាប និងសន្និដ្ឋាន៖ <em>«កាលណា <span class="math-sym"><i>x</i></span> កើន តម្លៃ <span class="math-sym"><i>y</i></span> ថយចុះ ដូច្នេះវាជាអនុគមន៍ចុះដាច់ខាត!»</em><br>
                  • ដោះស្រាយលំហាត់បាក់តេរីបានត្រឹមត្រូវ (<span class="math-sym"><i>N</i>(3) = 800</span> កោសិកា)។
                </td>
              </tr>

              <!-- 5. EVALUATE -->
              <tr>
                <td style="text-align:center;font-weight:bold;color:#0369a1;background:#f0f9ff">៦ នាទី</td>
                <td>
                  <span class="badge-stage badge-evaluate">៥. EVALUATE</span><br>
                  <strong>ការវាយតម្លៃ &amp; ឆ្លុះបញ្ចាំង</strong>
                </td>
                <td>
                  <strong>Exit Ticket (សន្លឹកចាកចេញ)៖</strong><br>
                  1. ឱ្យ <span class="math-sym"><i>f</i>(<i>x</i>) = 3<sup><i>x</i></sup></span>។ តើ <span class="math-sym"><i>f</i></span> កើន ឬចុះ? រក <span class="math-sym"><i>f</i>(0)</span> និង <span class="math-sym"><i>f</i>(2)</span>?<br>
                  2. តើក្រាប <span class="math-sym"><i>y</i> = <i>a</i><sup><i>x</i></sup></span> អាចប៉ះ ឬកាត់អ័ក្សអាប់ស៊ីសបានទេ? ហេតុអ្វី?<br>
                  <strong>ឆ្លុះបញ្ចាំងសរុប៖</strong> បត់ ៥០ ដង = <span class="math-sym">112</span> លាន km (ជិតដល់ព្រះអាទិត្យ!)
                </td>
                <td>
                  • ចែកសន្លឹក Exit Ticket ឱ្យសិស្សបំពេញក្នុងរយៈពេល ៣ នាទី។<br>
                  • ហៅសិស្សឆ្លើយ និងផ្ទៀងផ្ទាត់រួមគ្នា។<br>
                  • ឆ្លុះបញ្ចាំងសរុប បកស្រាយអាថ៌កំបាំងបត់ក្រដាស ៥០ ដង បំផុសការស្រឡាញ់គណិតវិទ្យា។<br>
                  • ដាក់កិច្ចការផ្ទះ៖ លំហាត់ ១ និង ២ ទំព័រ ៦២។
                </td>
                <td>
                  • បំពេញ Exit Ticket ដោយឯករាជ្យ។<br>
                  • ភ្ញាក់ផ្អើល និងជក់ចិត្តនឹងចម្លើយនៃការបត់ក្រដាស ៥០ ដង។<br>
                  • កត់ត្រាកិច្ចការផ្ទះ និងត្រៀមសម្រាប់មេរៀនបន្ទាប់ (សមីការអិចស្ប៉ូណង់ស្យែល)។
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- IV. BLACKBOARD LAYOUT PLAN (3 CLEAN COLUMNS) -->
        <div class="pdf-section pdf-page-break-before">
          <div class="pdf-section-title">IV. គំនូរប្លង់ក្ដារខៀន (Blackboard Layout Plan — ៣ ជួរឈរ)</div>
          <div class="pdf-board-container">
            <div class="pdf-board-header">
              កាលបរិច្ឆេទ៖ ថ្ងៃទី ......... ខែ ......... ឆ្នាំ ២០២៦ &nbsp;|&nbsp; ជំពូកទី ២៖ អនុគមន៍អិចស្ប៉ូណង់ស្យែល និងអនុគមន៍លោការីត &nbsp;|&nbsp; មេរៀនទី ១៖ អនុគមន៍អិចស្ប៉ូណង់ស្យែល
            </div>
            <table class="pdf-board-table-outer">
              <tr>
                <!-- Column 1 -->
                <td>
                  <div class="pdf-board-column">
                    <div class="pdf-board-col-header">ផ្ទាំងទី ១៖ ទិន្នន័យពិសោធន៍</div>
                    <div><strong>១. ពិសោធន៍បត់ក្រដាស A4៖</strong></div>
                    <table class="pdf-inner-table">
                      <tr><th>បត់ (<i>x</i>)</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td></tr>
                      <tr><th>ស្រទាប់ (<i>y</i>)</th><td>1</td><td>2</td><td>4</td><td>8</td><td>16</td></tr>
                    </table>
                    <div style="margin-top: 3px;">➔ គំរូទិន្នន័យ៖ <span style="color: #fde047; font-weight: 700; font-family: 'Cambria Math', serif; font-style: italic;"><i>y</i> = 2<sup><i>x</i></sup></span></div>
                    <div style="color: #94a3b8; font-size: 7.5pt; margin-top: 4px; line-height: 1.4;">
                      • បត់ 14 ដង ≈ 1.64m (កម្ពស់មនុស្ស)<br>
                      • បត់ 27 ដង ≈ 8.8km (ភ្នំអេវឺរ៉េស)<br>
                      • បត់ 42 ដង ≈ 384,400km (ដល់ឋានព្រះច័ន្ទ!)
                    </div>
                  </div>
                </td>

                <!-- Column 2 -->
                <td>
                  <div class="pdf-board-column">
                    <div class="pdf-board-col-header">ផ្ទាំងទី ២៖ និយមន័យ &amp; លក្ខណៈ</div>
                    <div><strong>២. និយមន័យ៖ <span style="color: #7dd3fc; font-family: 'Cambria Math', serif; font-style: italic;"><i>y</i> = <i>a</i><sup><i>x</i></sup></span></strong> (<i>a</i> &gt; 0, <i>a</i> ≠ 1)</div>
                    <div style="background: rgba(56, 189, 248, 0.15); border: 1px solid #38bdf8; padding: 3px; border-radius: 4px; text-align: center; font-weight: 700; color: #38bdf8; margin: 3px 0; font-family: 'Cambria Math', serif; font-style: italic;">
                      <i>y</i> = <i>a</i><sup><i>x</i></sup> &nbsp;(<i>a</i> &gt; 0, <i>a</i> ≠ 1)
                    </div>
                    <div style="font-size: 7.5pt; margin-top: 3px; line-height: 1.4;">
                      • ដែនកំណត់៖ <i>D</i> = ℝ = (−∞, +∞)<br>
                      • ដែនតម្លៃ៖ <i>R<sub>f</sub></i> = (0, +∞) (<i>a<sup>x</sup></i> &gt; 0 ជានិច្ច)<br>
                      • ចំណុចកាត់អ័ក្ស៖ (0, 1) ព្រោះ <i>a</i><sup>0</sup> = 1<br>
                      • អាស៊ីមតូតដេក៖ <i>y</i> = 0 (អ័ក្ស <i>x'x</i>)<br>
                      • <i>a</i> &gt; 1 ⇒ កើនដាច់ខាតលើ ℝ<br>
                      • 0 &lt; <i>a</i> &lt; 1 ⇒ ចុះដាច់ខាតលើ ℝ
                    </div>
                  </div>
                </td>

                <!-- Column 3 -->
                <td>
                  <div class="pdf-board-column">
                    <div class="pdf-board-col-header">ផ្ទាំងទី ៣៖ គំនូសក្រាប &amp; កិច្ចការ</div>
                    <div style="font-size: 7.8pt;"><strong>៣. ក្រាប <span style="color: #38bdf8; font-family: 'Cambria Math', serif; font-style: italic;"><i>y</i> = 2<sup><i>x</i></sup></span> និង <span style="color: #f59e0b; font-family: 'Cambria Math', serif; font-style: italic;"><i>y</i> = (½)<sup><i>x</i></sup></span></strong></div>
                    <div style="font-size: 7pt; color: #94a3b8; margin-bottom: 2px;">(កាត់ (0, 1) និងឆ្លុះគ្នាធៀប (<i>Oy</i>))</div>

                    <!-- Clean High-Quality Chalkboard Vector SVG Graph -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="90" viewBox="0 0 240 90" style="background: rgba(0,0,0,0.3); border-radius: 4px; display: block; margin: 4px 0; border: 1px solid rgba(255,255,255,0.15);">
                      <line x1="20" y1="70" x2="220" y2="70" stroke="rgba(255,255,255,0.1)" stroke-width="0.8"/>
                      <line x1="20" y1="46" x2="220" y2="46" stroke="rgba(255,255,255,0.1)" stroke-width="0.8"/>
                      <line x1="15" y1="70" x2="225" y2="70" stroke="#ef4444" stroke-width="1.2" stroke-dasharray="3,3"/>
                      <line x1="20" y1="70" x2="225" y2="70" stroke="#cbd5e1" stroke-width="1.5"/>
                      <line x1="120" y1="84" x2="120" y2="10" stroke="#cbd5e1" stroke-width="1.5"/>
                      <polyline points="222,67 228,70 222,73" fill="#cbd5e1"/>
                      <polyline points="117,14 120,8 123,14" fill="#cbd5e1"/>
                      <text x="222" y="65" fill="#94a3b8" font-size="8">x</text>
                      <text x="125" y="12" fill="#94a3b8" font-size="8">y</text>
                      <path d="M 30,69 Q 90,68 120,46 T 180,12" fill="none" stroke="#38bdf8" stroke-width="2"/>
                      <text x="175" y="12" fill="#38bdf8" font-size="7.5" font-weight="bold">y = 2ˣ</text>
                      <path d="M 60,12 Q 90,36 120,46 T 210,69" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="2,2"/>
                      <text x="28" y="14" fill="#f59e0b" font-size="7.5" font-weight="bold">y = (½)ˣ</text>
                      <circle cx="120" cy="46" r="3" fill="#fde047"/>
                      <text x="124" y="44" fill="#fde047" font-size="7.5" font-weight="bold">(0, 1)</text>
                    </svg>

                    <div style="margin-top: 2px; font-size: 7.5pt; color: #cbd5e1;">• ក្រាបទាំងពីរឆ្លុះគ្នាធៀបនឹងអ័ក្ស (<i>Oy</i>)</div>
                    <div style="margin-top: 3px; color: #fde047;"><strong>៤. កិច្ចការផ្ទះ៖</strong></div>
                    <div style="font-size: 7.5pt; color: #f8fafc;">• លំហាត់ទី ១ &amp; ២ ទំព័រ ៦២ ក្នុងសៀវភៅគោល</div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>

        <!-- V. STUDENT INQUIRY WORKSHEET TEMPLATE -->
        <div class="pdf-section">
          <div class="pdf-section-title">V. ឧបសម្ព័ន្ធ៖ សន្លឹកកិច្ចការរិះរករបស់សិស្ស (IBL Student Inquiry Worksheet)</div>
          <div class="pdf-worksheet-box">
            <table style="width:100%; border-collapse:collapse; margin-bottom:6px;">
              <tr>
                <td style="padding:0 0 4px 0; border-bottom:1.5px solid #bae6fd;">
                  <strong style="color: #0369a1;">សន្លឹកកិច្ចការរិះរកគណិតវិទ្យា (INQUIRY WORKSHEET) — មេរៀន៖ អនុគមន៍អិចស្ប៉ូណង់ស្យែល</strong>
                </td>
                <td style="padding:0 0 4px 0; border-bottom:1.5px solid #bae6fd; text-align:right; white-space:nowrap;">
                  <strong>ក្រុមទី៖ ............ ថ្នាក់ទី៖ ១១ .........</strong>
                </td>
              </tr>
            </table>
            <div style="margin-bottom: 5px;"><strong>🧪 ការណែនាំសកម្មភាពពិសោធន៍៖</strong> យកក្រដាស A4 មួយសន្លឹក បត់ជាពីរស្មើគ្នាម្តងហើយម្តងទៀត រាប់ចំនួនស្រទាប់ក្រដាសដែលកើនឡើង និងបំពេញតារាងទិន្នន័យ៖</div>
            <table style="width: 100%; border-collapse: collapse; font-size: 8pt; text-align: center; margin-bottom: 6px; background: #ffffff;">
              <thead>
                <tr style="background: #e0f2fe; color: #0369a1;">
                  <th style="border: 1px solid #bae6fd; padding: 4px; font-weight: bold;">ចំនួនដងនៃការបត់ (<span class="math-sym"><i>x</i></span>)</th>
                  <th style="border: 1px solid #bae6fd; padding: 4px;">0</th>
                  <th style="border: 1px solid #bae6fd; padding: 4px;">1</th>
                  <th style="border: 1px solid #bae6fd; padding: 4px;">2</th>
                  <th style="border: 1px solid #bae6fd; padding: 4px;">3</th>
                  <th style="border: 1px solid #bae6fd; padding: 4px;">4</th>
                  <th style="border: 1px solid #bae6fd; padding: 4px; background: #fef3c7; color: #92400e;"><span class="math-sym"><i>x</i></span> (ទូទៅ)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="border: 1px solid #bae6fd; padding: 4px; font-weight: bold; text-align: left; background: #f8fafc;">ចំនួនស្រទាប់ក្រដាស (<span class="math-sym"><i>y</i></span>)</td>
                  <td style="border: 1px solid #bae6fd; padding: 4px; font-weight: bold; color: #0284c7;">1</td>
                  <td style="border: 1px solid #bae6fd; padding: 4px; color: #94a3b8;">......</td>
                  <td style="border: 1px solid #bae6fd; padding: 4px; color: #94a3b8;">......</td>
                  <td style="border: 1px solid #bae6fd; padding: 4px; color: #94a3b8;">......</td>
                  <td style="border: 1px solid #bae6fd; padding: 4px; color: #94a3b8;">......</td>
                  <td style="border: 1px solid #bae6fd; padding: 4px; font-weight: bold; color: #0369a1;"><span class="math-sym"><i>y</i> = 2<sup><i>x</i></sup></span></td>
                </tr>
              </tbody>
            </table>
            <div style="line-height: 1.65; font-size: 8pt;">
              <div><strong>សំណួរពិភាក្សាក្នុងក្រុម (Discussion Questions)៖</strong></div>
              <div>១. នៅពេល <span class="math-sym"><i>x</i></span> កើន ១ ឯកតា តើតម្លៃ <span class="math-sym"><i>y</i></span> ប្រែប្រួលដូចម្តេច? (បូកថែម ឬគុណនឹងប៉ុន្មាន?) ➔ ចម្លើយ៖ .............................................</div>
              <div>២. ចូរទាញរូបមន្តទំនាក់ទំនងទូទៅរវាងចំនួនស្រទាប់ <span class="math-sym"><i>y</i></span> និងចំនួនដងបត់ <span class="math-sym"><i>x</i></span> ➔ ចម្លើយ៖ <span class="math-sym"><i>y</i> =</span> ....................................................</div>
              <div>៣. ប្រសិនបើយើងបត់បាន ៧ ដង តើនឹងទទួលបានក្រដាសចំនួនប៉ុន្មានស្រទាប់? ➔ ចម្លើយ៖ .............................................................</div>
            </div>
          </div>
        </div>

        <!-- VI. DIFFERENTIATION STRATEGIES -->
        <div class="pdf-section">
          <div class="pdf-section-title">VI. យុទ្ធសាស្ត្រគាំទ្រសិស្សចម្រុះកម្រិត (Differentiation Strategies)</div>
          <table class="pdf-diff-table">
            <tr>
              <td>
                <div class="pdf-diff-card pdf-diff-slow">
                  <strong style="color: #92400e;">🌱 សម្រាប់សិស្សរៀនយឺត (Scaffolding / Support):</strong>
                  <div style="margin-top: 4px; color: #78350f; line-height: 1.55;">
                    • ផ្ដល់ការណែនាំជាជំហានៗក្នុងការបត់ក្រដាសជាក់ស្តែង និងការរាប់ស្រទាប់។<br>
                    • ជួយគណនាតម្លៃស្វ័យគុណ <span class="math-sym">2<sup>1</sup> = 2</span>, <span class="math-sym">2<sup>2</sup> = 4</span>, <span class="math-sym">2<sup>3</sup> = 8</span>... ដើម្បីកត់សម្គាល់គំរូទិន្នន័យ។<br>
                    • ប្រើក្រដាសដែលមានក្រឡាចត្រង្គស្រាប់ និងចំណុចគោល <span class="math-sym">(0, 1)</span> ដើម្បីងាយស្រួលសង់ក្រាប។
                  </div>
                </div>
              </td>
              <td>
                <div class="pdf-diff-card pdf-diff-fast">
                  <strong style="color: #1e40af;">🚀 សម្រាប់សិស្សពូកែ (Extension / Challenge):</strong>
                  <div style="margin-top: 4px; color: #1e3a8a; line-height: 1.55;">
                    • ចោទសួរអំពីការរកលីមីតនៅអនន្ត៖ <span class="math-sym">lim<sub><i>x</i> → +∞</sub> 2<sup><i>x</i></sup> = +∞</span> និង <span class="math-sym">lim<sub><i>x</i> → −∞</sub> 2<sup><i>x</i></sup> = 0</span>។<br>
                    • ឱ្យស្វែងយល់បន្ថែមអំពីអនុគមន៍អិចស្ប៉ូណង់ស្យែលធម្មជាតិ <span class="math-sym"><i>y</i> = <i>e</i><sup><i>x</i></sup></span> (<span class="math-sym"><i>e</i> ≈ 2.71828</span>)។<br>
                    • សាកល្បងដោះស្រាយសមីការអិចស្ប៉ូណង់ស្យែលគ្រឹះ <span class="math-sym">2<sup><i>x</i></sup> = 32</span> និង <span class="math-sym">3<sup><i>x</i>+1</sup> = 27</span>។
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>

        <!-- VII. OFFICIAL APPROVAL & SIGNATURES (ទម្រង់តាមរូបភាពទី១) -->
        <table class="pdf-sig-table">
          <tr>
            <td>
              <div class="pdf-sig-approval">បានឃើញ និងឯកភាព</div>
              <div class="pdf-sig-date">ថ្ងៃ..................... ខែ............... ឆ្នាំ..........</div>
              <div class="pdf-sig-role">នាយកវិទ្យាល័យ</div>
              <div style="height: 48pt;"></div>
            </td>
            <td>
              <div class="pdf-sig-approval">បានពិនិត្យត្រឹមត្រូវ</div>
              <div class="pdf-sig-date">ថ្ងៃ..................... ខែ............... ឆ្នាំ..........</div>
              <div class="pdf-sig-role">ប្រធានក្រុមបច្ចេកទេស</div>
              <div style="height: 48pt;"></div>
            </td>
            <td>
              <div style="min-height: 14pt; margin-bottom: 4px;">&nbsp;</div>
              <div class="pdf-sig-date">ថ្ងៃ..................... ខែ............... ឆ្នាំ..........</div>
              <div class="pdf-sig-role">ហត្ថលេខាគ្រូបង្រៀន</div>
              <div style="height: 38pt;"></div>
              <div class="pdf-sig-name">ឆេង ឆវ័ន្ត</div>
            </td>
          </tr>
        </table>

      </div>
    `;
  }

  /* ============================================================
     2. EXPORT TO PDF (.pdf) - 100% Faithful Original Format
     ============================================================ */
  window.downloadLessonPlanPDF = async function () {
    notifyToast('⏳ កំពុងដំណើរការបង្កើតឯកសារ PDF ពេញលេញ រក្សាទ្រង់ទ្រាយដើម ១០០%...', 8000);

    const runHtml2Pdf = async () => {
      // Remove any old container or overlay to force fresh render
      const oldContainer = document.getElementById('lp-pdf-export-container');
      if (oldContainer) oldContainer.remove();
      const oldOverlay = document.getElementById('lp-pdf-loading-overlay');
      if (oldOverlay) oldOverlay.remove();

      // Create an elegant progress overlay
      const overlay = document.createElement('div');
      overlay.id = 'lp-pdf-loading-overlay';
      overlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(15,23,42,0.85);z-index:9999999;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;backdrop-filter:blur(5px);font-family:\'Kantumruy Pro\',sans-serif;';
      overlay.innerHTML = `
        <div style="background:#1e293b;border:1.5px solid #38bdf8;padding:26px 36px;border-radius:18px;text-align:center;box-shadow:0 24px 48px rgba(0,0,0,0.6);max-width:400px;">
          <div style="font-size:36px;margin-bottom:12px;">📑</div>
          <div style="font-size:16px;font-weight:700;color:#38bdf8;margin-bottom:8px;">កំពុងរៀបចំឯកសារ PDF ពេញលេញ...</div>
          <div style="font-size:12.5px;color:#cbd5e1;line-height:1.6;">រក្សាទ្រង់ទ្រាយដើម និងរូបមន្តគណិតវិទ្យាពេញលេញ ១០០% គ្មានបាត់បង់ខ្លឹមសារឡើយ</div>
        </div>
      `;
      document.body.appendChild(overlay);

      // Create export container positioned at (0, 0)
      const container = document.createElement('div');
      container.id = 'lp-pdf-export-container';
      container.style.cssText = [
        'position: absolute',
        'left: 0',
        'top: 0',
        'width: 794px',
        'max-width: 794px',
        'background: #ffffff',
        'color: #0f172a',
        'padding: 0',
        'margin: 0',
        'z-index: 9999998',
        'box-sizing: border-box',
        'display: block',
        'overflow: visible',
        'height: auto'
      ].join('; ');

      document.body.appendChild(container);
      container.innerHTML = getCompleteLessonPlanHTML();

      // Render KaTeX if available
      renderMathFormulas(container);

      // Await fonts ready so Moul and Kantumruy Pro are 100% loaded before canvas capture
      if (document.fonts && document.fonts.ready) {
        try {
          await document.fonts.ready;
        } catch (e) {
          console.warn('document.fonts.ready warning:', e);
        }
      }

      // Settle layout timeout
      await new Promise(resolve => setTimeout(resolve, 800));

      const opt = {
        margin: [10, 8, 10, 8],
        filename: 'កិច្ចតែងការបង្រៀន_អនុគមន៍អិចស្ប៉ូណង់ស្យែល_ថ្នាក់ទី១១_អ្នកគ្រូ_ឆេង_ឆវ័ន្ត.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          scrollY: 0,
          scrollX: 0,
          letterRendering: true,
          windowWidth: 794,
          allowTaint: false
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait'
        },
        pagebreak: {
          mode: ['css', 'legacy'],
          before: '.pdf-page-break-before',
          avoid: ['tr', '.pdf-metadata-table', '.pdf-question-box', '.pdf-worksheet-box', '.pdf-board-container', '.pdf-diff-table', '.pdf-section-title', '.pdf-sig-table', '.pdf-title-block', '.pdf-header']
        }
      };

      try {
        await html2pdf().set(opt).from(container).save();
        container.remove();
        overlay.remove();
        notifyToast('✅ បានទាញយកកិច្ចតែងការជាឯកសារ PDF ពេញលេញដោយជោគជ័យ!');
      } catch (err) {
        console.warn('PDF export error:', err);
        container.remove();
        overlay.remove();
        notifyToast('⚠️ ប្រព័ន្ធបានបើកផ្ទាំង Print ដើម្បីរក្សាទុកជា PDF...', 4000);
        window.print();
      }
    };

    const ensureHtml2Pdf = () => {
      if (typeof html2pdf !== 'undefined') {
        return Promise.resolve();
      }
      return loadScript('js/html2pdf.bundle.min.js')
        .catch(() => loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'));
    };

    ensureHtml2Pdf()
      .then(runHtml2Pdf)
      .catch(err => {
        console.warn('Cannot load html2pdf:', err);
        notifyToast('⚠️ ប្រព័ន្ធបានបើកផ្ទាំង Print ដើម្បីរក្សាទុកជា PDF...', 4000);
        window.print();
      });
  };

  /* ============================================================
     3. EXPORT TO POWERPOINT (.pptx)
     ============================================================ */
  window.downloadLessonPlanPPTX = function () {
    notifyToast('⏳ កំពុងរៀបចំបង្កើតស្លាយ PowerPoint (.pptx)...', 3500);

    const generatePPTX = () => {
      try {
        const pptx = new PptxGenJS();
        pptx.layout = 'LAYOUT_16x9';

        // Slide 1: Title Slide
        const s1 = pptx.addSlide();
        s1.background = { color: '0f172a' };
        s1.addText('ព្រះរាជាណាចក្រកម្ពុជា   ជាតិ សាសនា ព្រះមហាក្សត្រ', {
          x: 0.5, y: 0.5, w: 9.0, h: 0.6,
          fontSize: 15, bold: true, color: '38bdf8', align: 'center', fontFace: 'Kantumruy Pro'
        });
        s1.addText('កិច្ចតែងការបង្រៀនគរុកោសល្យបែបការរិះរក (IBL - 5E Model)', {
          x: 0.5, y: 1.6, w: 9.0, h: 1.0,
          fontSize: 22, bold: true, color: 'ffffff', align: 'center', fontFace: 'Kantumruy Pro'
        });
        s1.addText('ជំពូកទី ២៖ អនុគមន៍អិចស្ប៉ូណង់ស្យែល និងអនុគមន៍លោការីត\nមេរៀនទី ១៖ អនុគមន៍អិចស្ប៉ូណង់ស្យែល (ថ្នាក់ទី ១១)', {
          x: 0.5, y: 2.8, w: 9.0, h: 0.9,
          fontSize: 15, color: '0284c7', align: 'center', fontFace: 'Kantumruy Pro'
        });
        s1.addText('គ្រូបង្រៀនឯកទេស៖ អ្នកគ្រូ ឆេង ឆវ័ន្ត (NIE & RUPP)\nគ្រឹះស្ថានសិក្សា៖ វិទ្យាល័យសសរស្តម្ភ & វិទ្យាស្ថាន SHINE  |  ថិរវេលា៖ ៥០ នាទី', {
          x: 0.5, y: 4.2, w: 9.0, h: 0.8,
          fontSize: 12.5, color: '94a3b8', align: 'center', fontFace: 'Kantumruy Pro'
        });

        // Slide 2: Objectives
        const s2 = pptx.addSlide();
        s2.background = { color: '0f172a' };
        s2.addText('I. វត្ថុបំណងមេរៀន (Learning Objectives)', {
          x: 0.8, y: 0.5, w: 8.4, h: 0.6,
          fontSize: 18, bold: true, color: '38bdf8', fontFace: 'Kantumruy Pro'
        });
        s2.addText('១. វិជ្ជាសម្បទា (Knowledge):\n• កំណត់បាននូវនិយមន័យពិតប្រាកដ y = aˣ (a > 0, a ≠ 1)។\n• រៀបរាប់បានពីដែនកំណត់ D = ℝ, ដែនតម្លៃ Rf = (0, +∞), និងអាស៊ីមតូតដេក y = 0។\n\n២. បំណិនសម្បទា (Skills):\n• សង់តារាងតម្លៃ និងសង់ក្រាបតំណាង y = 2ˣ និង y = (½)ˣ បានត្រឹមត្រូវ។\n• ប្រៀបធៀបអថេរភាព (ករណី a > 1 កើន និង 0 < a < 1 ចុះ)។\n\n៣. ចរិយាសម្បទា (Attitudes):\n• បណ្តុះស្មារតីចង់ចេះចង់ដឹង ចូលរួមពិសោធន៍បត់ក្រដាស និងសហការជាក្រុមប្រកបដោយទំនុកចិត្ត។', {
          x: 0.8, y: 1.3, w: 8.4, h: 3.8,
          fontSize: 13, color: 'f8fafc', fontFace: 'Kantumruy Pro', lineSpacing: 22
        });

        // Slide 3: Engagement & Exploration
        const s3 = pptx.addSlide();
        s3.background = { color: '0f172a' };
        s3.addText('II. ដំណាក់កាលទី ១ & ២៖ Engagement & Exploration', {
          x: 0.8, y: 0.5, w: 8.4, h: 0.6,
          fontSize: 18, bold: true, color: '10b981', fontFace: 'Kantumruy Pro'
        });
        s3.addText('🔬 សកម្មភាពពិសោធន៍បត់ក្រដាស A4 ក្នុងជីវភាពរស់នៅជាក់ស្តែង៖', {
          x: 0.8, y: 1.2, w: 8.4, h: 0.4,
          fontSize: 13.5, bold: true, color: 'fde047', fontFace: 'Kantumruy Pro'
        });
        s3.addTable([
          [
            { text: 'ចំនួនដងបត់ (x)', options: { bold: true, fill: '1e293b', color: '38bdf8', align: 'center' } },
            { text: '0', options: { align: 'center' } },
            { text: '1', options: { align: 'center' } },
            { text: '2', options: { align: 'center' } },
            { text: '3', options: { align: 'center' } },
            { text: '4', options: { align: 'center' } },
            { text: 'x', options: { bold: true, align: 'center', color: 'fde047' } }
          ],
          [
            { text: 'ចំនួនស្រទាប់ (y)', options: { bold: true, fill: '1e293b', color: '38bdf8', align: 'center' } },
            { text: '1 (2⁰)', options: { align: 'center' } },
            { text: '2 (2¹)', options: { align: 'center' } },
            { text: '4 (2²)', options: { align: 'center' } },
            { text: '8 (2³)', options: { align: 'center' } },
            { text: '16 (2⁴)', options: { align: 'center' } },
            { text: '2ˣ', options: { bold: true, align: 'center', color: 'fde047' } }
          ]
        ], {
          x: 0.8, y: 1.8, w: 8.4, h: 1.0,
          fontSize: 12, color: 'ffffff', fontFace: 'Kantumruy Pro', border: { pt: 1, color: '475569' }
        });
        s3.addText('💡 ការសង្កេតគំរូទិន្នន័យ (Pattern Recognition):\n• តម្លៃ y កើនឡើងគុណនឹង ២ រៀងរាល់ពេល x កើនឡើង ១ ឯកតា។\n• គំរូគណិតវិទ្យាទូទៅ៖ y = 2ˣ ដែលជាទម្រង់នៃអនុគមន៍អិចស្ប៉ូណង់ស្យែល។\n• ការផ្សារភ្ជាប់៖ បត់ ៤២ ដង កម្រាស់ក្រដាសឡើងដល់ចម្ងាយផែនដីទៅឋានព្រះច័ន្ទ (~ 384,400 km)!', {
          x: 0.8, y: 3.1, w: 8.4, h: 2.0,
          fontSize: 12.5, color: 'e2e8f0', fontFace: 'Kantumruy Pro', lineSpacing: 20
        });

        // Slide 4: Explanation
        const s4 = pptx.addSlide();
        s4.background = { color: '0f172a' };
        s4.addText('III. ដំណាក់កាលទី ៣៖ Explanation (ពន្យល់ & និយមន័យ)', {
          x: 0.8, y: 0.5, w: 8.4, h: 0.6,
          fontSize: 18, bold: true, color: '38bdf8', fontFace: 'Kantumruy Pro'
        });
        s4.addText('ទម្រង់ទូទៅ៖   y = aˣ   (ដែល a > 0 និង a ≠ 1)\n\n• ដែនកំណត់ (Domain):   D = ℝ = (-∞, +∞)\n• ដែនតម្លៃ (Range):   Rf = (0, +∞)   (តម្លៃ aˣ វិជ្ជមានជានិច្ច)\n• ចំណុចកាត់អ័ក្ស y:   កាត់ត្រង់ចំណុច (0, 1) ជានិច្ច ព្រោះ a⁰ = 1\n• អាស៊ីមតូតដេក:   បន្ទាត់ y = 0 (អ័ក្ស x\'x) ជាអាស៊ីមតូតដេក\n\n📊 អថេរភាព (Monotonicity):\n• ករណី a > 1 ➔ អនុគមន៍កើនដាច់ខាតលើ ℝ (Exponential Growth)\n• ករណី 0 < a < 1 ➔ អនុគមន៍ចុះដាច់ខាតលើ ℝ (Exponential Decay)', {
          x: 0.8, y: 1.3, w: 8.4, h: 3.8,
          fontSize: 13, color: 'e2e8f0', fontFace: 'Kantumruy Pro', lineSpacing: 20
        });

        // Slide 5: Elaboration & Evaluation
        const s5 = pptx.addSlide();
        s5.background = { color: '0f172a' };
        s5.addText('IV. ដំណាក់កាលទី ៤ & ៥៖ Elaboration & Evaluation', {
          x: 0.8, y: 0.5, w: 8.4, h: 0.6,
          fontSize: 18, bold: true, color: 'f59e0b', fontFace: 'Kantumruy Pro'
        });
        s5.addText('✏️ លំហាត់អនុវត្ត និងកិច្ចការស្រាវជ្រាវរបស់សិស្ស៖\n\n១. ចូរគណនាតម្លៃ និងសង់ក្រាបនៃ y = 2ˣ និង y = (½)ˣ លើតម្រុយតែមួយ៖\n   - តម្លៃរហ័ស៖ x = -2 ➔ y = 4;  x = -1 ➔ y = 2;  x = 0 ➔ y = 1;  x = 1 ➔ y = ½;  x = 2 ➔ y = ¼\n   - បង្ហាញចំណុចរួម (0, 1)\n   - ប្រៀបធៀបទិសដៅក្រាប (ស៊ីមេទ្រីគ្នាធៀបនឹងអ័ក្ស y\'y)\n\n២. លំហាត់ជីវភាពពិត (Real-world Modeling):\n   បាក់តេរីបំបែកខ្លួនទ្វេដងរៀងរាល់ ១ ម៉ោង។\n   ដំបូងមាន ១០០០ កោសិកា ➔ រូបមន្ត N(t) = 1000 · 2ᵗ ➔ N(3) = 1000 · 2³ = 8,000 កោសិកា!\n\n៣. ការវាយតម្លៃសង្ខេប៖ បំពេញសន្លឹកកិច្ចការ Exit Ticket មុនចេញពីថ្នាក់។', {
          x: 0.8, y: 1.3, w: 8.4, h: 3.8,
          fontSize: 13, color: 'ffffff', fontFace: 'Kantumruy Pro', lineSpacing: 20
        });

        // Slide 6: Blackboard Summary
        const s6 = pptx.addSlide();
        s6.background = { color: '0f172a' };
        s6.addText('V. គំនូរប្លង់ក្ដារខៀន ៣ ជួរឈរ (Blackboard Plan) & កិច្ចការផ្ទះ', {
          x: 0.8, y: 0.5, w: 8.4, h: 0.6,
          fontSize: 18, bold: true, color: '38bdf8', fontFace: 'Kantumruy Pro'
        });
        s6.addTable([
          [
            { text: 'ផ្ទាំងទី ១៖ ទិន្នន័យពិសោធន៍\n\n១. ពិសោធន៍បត់ក្រដាស A4\nបត់ (x): 0, 1, 2, 3, 4\nស្រទាប់ (y): 1, 2, 4, 8, 16\n\n➔ គំរូទិន្នន័យ៖ y = 2ˣ\n• បត់ 14 ដង ≈ 1.64m\n• បត់ 27 ដង ≈ 8.8km\n• បត់ 42 ដង ≈ 384,400km!', options: { fill: '1e293b', color: 'ffffff' } },
            { text: 'ផ្ទាំងទី ២៖ និយមន័យ & លក្ខណៈ\n\n២. និយមន័យ៖ y = aˣ\n(a > 0, a ≠ 1)\n\n• ដែនកំណត់៖ D = ℝ\n• ដែនតម្លៃ៖ Rf = (0, +∞)\n• កាត់អ័ក្ស y ត្រង់ (0, 1)\n• អាស៊ីមតូតដេក៖ y = 0\n\n• a > 1 ➔ កើន\n• 0 < a < 1 ➔ ចុះ', options: { fill: '1e293b', color: 'ffffff' } },
            { text: 'ផ្ទាំងទី ៣៖ គំនូសក្រាប & កិច្ចការ\n\n៣. ក្រាប y = 2ˣ និង y = (½)ˣ\n(សង់លើតម្រុយ Oxy)\n\n៤. កិច្ចការផ្ទះ៖\n• លំហាត់ទី ១, ២, ៣ ទំព័រ ៦២ នៃសៀវភៅពុម្ពគណិតទី១១\n• អានមុន៖ សមីការអិចស្ប៉ូណង់ស្យែល', options: { fill: '1e293b', color: 'ffffff' } }
          ]
        ], {
          x: 0.8, y: 1.3, w: 8.4, h: 3.2,
          fontSize: 11, fontFace: 'Kantumruy Pro', border: { pt: 1, color: '38bdf8' }
        });

        pptx.writeFile({ fileName: 'កិច្ចតែងការបង្រៀន_អនុគមន៍អិចស្ប៉ូណង់ស្យែល_ថ្នាក់ទី១១_អ្នកគ្រូ_ឆេង_ឆវ័ន្ត.pptx' })
          .then(() => {
            notifyToast('✅ បានទាញយកស្លាយ PowerPoint (.pptx) ដោយជោគជ័យ!');
          });
      } catch (err) {
        console.error('PPTX generation error:', err);
        notifyToast('❌ បរាជ័យក្នុងការបង្កើត PPTX');
      }
    };

    if (typeof PptxGenJS !== 'undefined') {
      generatePPTX();
    } else {
      loadScript('https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js')
        .then(generatePPTX)
        .catch(err => {
          console.warn('PptxGenJS CDN load failed, falling back:', err);
          notifyToast('❌ មិនអាចទាញយកបណ្ណាល័យ PPTX បានទេ');
        });
    }
  };

  /* ============================================================
     4. EXPORT TO HIGH-RESOLUTION IMAGE (.png)
     ============================================================ */
  window.downloadLessonPlanImage = function () {
    notifyToast('⏳ កំពុងរៀបចំបង្កើតរូបភាព Infographic (.png)...', 2500);

    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1700;
    const ctx = canvas.getContext('2d');

    // Background Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 1700);
    bgGrad.addColorStop(0, '#090e1c');
    bgGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 1700);

    // Decorative top border
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(0, 0, 1200, 10);

    // Header Kingdom
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 24px "Kantumruy Pro", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ព្រះរាជាណាចក្រកម្ពុជា', 600, 55);
    ctx.font = 'bold 20px "Kantumruy Pro", sans-serif';
    ctx.fillText('ជាតិ សាសនា ព្រះមហាក្សត្រ', 600, 90);

    // Divider
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(480, 108);
    ctx.lineTo(720, 108);
    ctx.stroke();

    // Main Card
    ctx.fillStyle = 'rgba(30, 41, 59, 0.7)';
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.roundRect(60, 130, 1080, 95, 12);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 18px "Kantumruy Pro", sans-serif';
    ctx.fillText('គ្រឹះស្ថានសិក្សា៖ វិទ្យាល័យសសរស្តម្ភ', 85, 168);
    ctx.fillText('គ្រូបង្រៀនឯកទេស៖ អ្នកគ្រូ ឆេង ឆវ័ន្ត (NIE & RUPP)', 85, 205);

    ctx.textAlign = 'right';
    ctx.fillText('ថ្នាក់ទី ១១ | គណិតវិទ្យា (ភាគ១)', 1115, 168);
    ctx.fillText('ថិរវេលា៖ ៥០ នាទី (IBL - 5E Model)', 1115, 205);

    // Main Plan Title
    ctx.textAlign = 'center';
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 26px "Kantumruy Pro", sans-serif';
    ctx.fillText('កិច្ចតែងការបង្រៀនគរុកោសល្យបែបការរិះរក (IBL - 5E Model)', 600, 275);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '18px "Kantumruy Pro", sans-serif';
    ctx.fillText('ជំពូកទី ២៖ អនុគមន៍អិចស្ប៉ូណង់ស្យែល និងអនុគមន៍លោការីត — មេរៀនទី ១៖ អនុគមន៍អិចស្ប៉ូណង់ស្យែល', 600, 310);

    // 5E Phases Grid
    const phases = [
      { num: '១', name: 'Engagement (៥ នាទី)', color: '#38bdf8', desc: 'រំលឹកស្វ័យគុណ 2ˣ & ចោទសួរអំពីការបត់ក្រដាស ៤២ ដងដល់ឋានព្រះច័ន្ទ' },
      { num: '២', name: 'Exploration (១២ នាទី)', color: '#10b981', desc: 'សិស្សបត់ក្រដាស A4 ជាក្រុម រាប់ស្រទាប់ និងបង្កើតតារាងទិន្នន័យ y = 2ˣ' },
      { num: '៣', name: 'Explanation (១៣ នាទី)', color: '#f59e0b', desc: 'ទាញនិយមន័យ y = aˣ (a>0, a≠1), ដែន D=ℝ, ដែនតម្លៃ Rf=(0,+∞), អាស៊ីមតូតដេក y=0' },
      { num: '៤', name: 'Elaboration (១២ នាទី)', color: '#a855f7', desc: 'សង់ក្រាប y = 2ˣ & y = (½)ˣ, ប្រៀបធៀបអថេរភាព និងដោះស្រាយម៉ូឌែលបាក់តេរី' },
      { num: '៥', name: 'Evaluation (៨ នាទី)', color: '#ef4444', desc: 'វាយតម្លៃសន្លឹកកិច្ចការ Exit Ticket, ឆ្លុះបញ្ចាំងចំណេះដឹង និងដាក់កិច្ចការផ្ទះ' }
    ];

    let startY = 345;
    phases.forEach((p, idx) => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 1.2;
      ctx.roundRect(60, startY + idx * 76, 1080, 64, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = p.color;
      ctx.font = 'bold 18px "Kantumruy Pro", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`ដំណាក់កាលទី ${p.num}៖ ${p.name}`, 85, startY + idx * 76 + 28);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '15px "Kantumruy Pro", sans-serif';
      ctx.fillText(p.desc, 85, startY + idx * 76 + 52);
    });

    // Blackboard 3-Columns Section
    const boardY = 755;
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 22px "Kantumruy Pro", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('គំនូរប្លង់ក្ដារខៀន ៣ ជួរឈរ (Blackboard Layout Plan)', 60, boardY);

    const colW = 344;
    const cols = [
      {
        title: 'ផ្ទាំងទី ១៖ ទិន្នន័យពិសោធន៍',
        color: '#38bdf8',
        lines: [
          '១. ពិសោធន៍បត់ក្រដាស A4៖',
          '• បត់ (x): 0, 1, 2, 3, 4',
          '• ស្រទាប់ (y): 1, 2, 4, 8, 16',
          '➔ គំរូទិន្នន័យ៖ y = 2ˣ',
          '',
          '• បត់ 14 ដង ≈ 1.64 m',
          '• បត់ 27 ដង ≈ 8.8 km (ភ្នំអេវឺរ៉េស)',
          '• បត់ 42 ដង ≈ 384,400 km (ដល់ឋានព្រះច័ន្ទ!)'
        ]
      },
      {
        title: 'ផ្ទាំងទី ២៖ និយមន័យ & លក្ខណៈ',
        color: '#10b981',
        lines: [
          '២. និយមន័យអនុគមន៍៖',
          '  y = aˣ  (a > 0, a ≠ 1)',
          '',
          '• ដែនកំណត់៖ D = ℝ',
          '• ដែនតម្លៃ៖ Rf = (0, +∞)',
          '• កាត់អ័ក្ស y ត្រង់ (0, 1)',
          '• អាស៊ីមតូតដេក៖ y = 0',
          '• a > 1 ➔ កើនដាច់ខាត',
          '• 0 < a < 1 ➔ ចុះដាច់ខាត'
        ]
      },
      {
        title: 'ផ្ទាំងទី ៣៖ គំនូសក្រាប & កិច្ចការ',
        color: '#f59e0b',
        lines: [
          '៣. ក្រាប y = 2ˣ និង y = (½)ˣ៖',
          '• កាត់ចំណុចរួម (0, 1)',
          '• ស៊ីមេទ្រីគ្នាធៀបអ័ក្ស Oy',
          '',
          '៤. កិច្ចការផ្ទះ៖',
          '• លំហាត់ ១, ២, ៣ ទំព័រ ៦២',
          '• អានមុន៖ សមីការអិចស្ប៉ូណង់ស្យែល'
        ]
      }
    ];

    cols.forEach((c, idx) => {
      const cx = 60 + idx * (colW + 24);
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = c.color;
      ctx.lineWidth = 1.5;
      ctx.roundRect(cx, boardY + 15, colW, 360, 10);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = c.color;
      ctx.font = 'bold 16px "Kantumruy Pro", sans-serif';
      ctx.fillText(c.title, cx + 16, boardY + 45);

      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx + 16, boardY + 55);
      ctx.lineTo(cx + colW - 16, boardY + 55);
      ctx.stroke();

      ctx.fillStyle = '#f1f5f9';
      ctx.font = '14px "Kantumruy Pro", sans-serif';
      c.lines.forEach((l, lIdx) => {
        ctx.fillText(l, cx + 16, boardY + 85 + lIdx * 25);
      });
    });

    // Vector Curve Plot Preview (In Box)
    const graphBoxY = 1160;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
    ctx.roundRect(60, graphBoxY, 1080, 360, 12);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 18px "Kantumruy Pro", sans-serif';
    ctx.fillText('📈 គំនូសក្រាបគំរូនៃអនុគមន៍អិចស្ប៉ូណង់ស្យែល y = 2ˣ និង y = (½)ˣ', 85, graphBoxY + 35);

    // Draw Axes inside canvas
    const originX = 600;
    const originY = graphBoxY + 260;
    const scaleX = 45;
    const scaleY = 32;

    // Asymptote y = 0
    ctx.strokeStyle = '#ef4444';
    ctx.setLineDash([6, 6]);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(100, originY);
    ctx.lineTo(1100, originY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#ef4444';
    ctx.font = '13px "Kantumruy Pro", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('អាស៊ីមតូតដេក y = 0', 1080, originY - 8);

    // Axes
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(100, originY);
    ctx.lineTo(1100, originY);
    ctx.moveTo(originX, graphBoxY + 60);
    ctx.lineTo(originX, graphBoxY + 330);
    ctx.stroke();

    // Arrows
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('x', 1095, originY + 20);
    ctx.fillText('y', originX + 20, graphBoxY + 75);

    // Curve 1: y = 2^x (Growth)
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    let started = false;
    for (let x = -5; x <= 3.2; x += 0.05) {
      const y = Math.pow(2, x);
      const px = originX + x * scaleX;
      const py = originY - y * scaleY;
      if (py >= graphBoxY + 60 && py <= graphBoxY + 330) {
        if (!started) { ctx.moveTo(px, py); started = true; }
        else { ctx.lineTo(px, py); }
      }
    }
    ctx.stroke();

    // Curve 2: y = (1/2)^x (Decay)
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 3;
    ctx.beginPath();
    started = false;
    for (let x = -3.2; x <= 5; x += 0.05) {
      const y = Math.pow(0.5, x);
      const px = originX + x * scaleX;
      const py = originY - y * scaleY;
      if (py >= graphBoxY + 60 && py <= graphBoxY + 330) {
        if (!started) { ctx.moveTo(px, py); started = true; }
        else { ctx.lineTo(px, py); }
      }
    }
    ctx.stroke();

    // Common point (0, 1)
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(originX, originY - 1 * scaleY, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px "Kantumruy Pro", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('(0, 1)', originX + 12, originY - 1 * scaleY - 6);

    ctx.fillStyle = '#38bdf8';
    ctx.fillText('y = 2ˣ (កើន)', originX + 160, graphBoxY + 120);
    ctx.fillStyle = '#f59e0b';
    ctx.fillText('y = (½)ˣ (ចុះ)', originX - 250, graphBoxY + 120);

    // Signatures footer
    ctx.fillStyle = '#64748b';
    ctx.font = '14px "Kantumruy Pro", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('© 2026 អ្នកគ្រូ ឆេង ឆវ័ន្ត (Teacher Chheng Chhovorn) • វិទ្យាល័យសសរស្តម្ភ • រក្សាសិទ្ធិគ្រប់យ៉ាង', 600, 1650);

    // Download canvas as PNG
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'កិច្ចតែងការបង្រៀន_អនុគមន៍អិចស្ប៉ូណង់ស្យែល_ថ្នាក់ទី១១_អ្នកគ្រូ_ឆេង_ឆវ័ន្ត.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      notifyToast('✅ បានទាញយករូបភាព Infographic (.png) ដោយជោគជ័យ!');
    }, 'image/png');
  };

  /* ============================================================
     5. PRINT PREVIEW (A4 SHEET SIMULATION)
     ============================================================ */
  let lpPreviewZoom = 0.85;

  window.previewLessonPlanPrint = function () {
    closeLessonPlanModal();
    ensureModalsInDOM();

    const previewModal = document.getElementById('lp-print-preview-modal');
    const sheetContent = document.getElementById('lp-preview-sheet-content');

    if (!previewModal || !sheetContent) return;

    // Render complete 7-section Cambodian Ministry-standard lesson plan
    sheetContent.innerHTML = getCompleteLessonPlanHTML();

    // Render mathematical expressions inside preview sheet
    renderMathFormulas(sheetContent);

    lpFitPreviewWidth();
    previewModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    document.body.classList.add('lp-preview-open');
  };

  window.closeLpPrintPreview = function () {
    const previewModal = document.getElementById('lp-print-preview-modal');
    if (previewModal) {
      previewModal.style.display = 'none';
      document.body.style.overflow = '';
      document.body.classList.remove('lp-preview-open');
    }
  };

  window.lpZoomPreview = function (delta) {
    lpSetPreviewZoom(lpPreviewZoom + delta);
  };

  window.lpSetPreviewZoom = function (val) {
    lpPreviewZoom = Math.max(0.4, Math.min(1.6, parseFloat(val.toFixed(2))));
    const wrapper = document.getElementById('lp-preview-sheet-wrapper');
    const label = document.getElementById('lp-preview-zoom-label');
    if (wrapper) wrapper.style.transform = `scale(${lpPreviewZoom})`;
    if (label) label.textContent = Math.round(lpPreviewZoom * 100) + '%';
  };

  window.lpFitPreviewWidth = function () {
    const viewport = document.querySelector('#lp-print-preview-modal .preview-viewport');
    if (!viewport) return;
    const viewportWidth = viewport.clientWidth - 50;
    const targetScale = Math.max(0.45, Math.min(1.0, viewportWidth / 800));
    lpSetPreviewZoom(targetScale);
  };

  window.handleLpPreviewBackdrop = function (event) {
    if (event.target.classList.contains('preview-viewport') || event.target.id === 'lp-preview-sheet-wrapper') {
      closeLpPrintPreview();
    }
  };

  // Auto initialize on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    ensureModalsInDOM();

    // Auto attach click interception to any anchor pointing to lesson-plan-exponential-ibl.html
    const lpLinks = document.querySelectorAll('a[href="lesson-plan-exponential-ibl.html"], a[href*="lesson-plan-exponential-ibl.html"]');
    lpLinks.forEach(link => {
      // If it's a dropdown item or mobile sub-link, intercept click to open modal
      if (link.classList.contains('dropdown-item') || link.classList.contains('mobile-sub-link') || link.classList.contains('academic-portal-card')) {
        link.addEventListener('click', function (e) {
          // If not holding Ctrl/Meta/Shift key (i.e. regular click)
          if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
            e.preventDefault();
            openLessonPlanModal();
          }
        });
      }
    });
  });

})();
