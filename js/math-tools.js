/**
 * math-tools.js - Interactive Mathematical Playground
 * Features:
 * 1. Live Quadratic Function Grapher (y = ax² + bx + c)
 * 2. Interactive Trigonometric Unit Circle
 * 3. Searchable Formulas & Cheat Sheet
 * Teacher Chheng Chhovorn - Mathematics Portfolio
 */

(function () {
  'use strict';

  /* ============================================================
     1. QUADRATIC FUNCTION PLOTTER (y = ax² + bx + c)
     ============================================================ */
  class QuadraticPlotter {
    constructor() {
      this.canvas = document.getElementById('quadratic-canvas');
      if (!this.canvas) return;

      this.ctx = this.canvas.getContext('2d');
      this.sliderA = document.getElementById('slider-a');
      this.sliderB = document.getElementById('slider-b');
      this.sliderC = document.getElementById('slider-c');

      this.valA = document.getElementById('val-a');
      this.valB = document.getElementById('val-b');
      this.valC = document.getElementById('val-c');

      this.formulaDisplay = document.getElementById('quadratic-formula-display');
      this.deltaDisplay = document.getElementById('calc-delta');
      this.vertexDisplay = document.getElementById('calc-vertex');
      this.rootsDisplay = document.getElementById('calc-roots');
      this.natureDisplay = document.getElementById('calc-nature');

      this.scale = 30; // pixels per unit
      this.originX = this.canvas.width / 2;
      this.originY = this.canvas.height / 2;

      this.init();
    }

    init() {
      this.resizeCanvas();
      window.addEventListener('resize', () => {
        this.resizeCanvas();
        this.draw();
      });

      const update = () => {
        let a = parseFloat(this.sliderA.value);
        if (a === 0) a = 0.1; // avoid divide by zero
        const b = parseFloat(this.sliderB.value);
        const c = parseFloat(this.sliderC.value);

        this.valA.textContent = a.toFixed(1);
        this.valB.textContent = b.toFixed(1);
        this.valC.textContent = c.toFixed(1);

        this.updateMathInfo(a, b, c);
        this.draw();
      };

      this.sliderA.addEventListener('input', update);
      this.sliderB.addEventListener('input', update);
      this.sliderC.addEventListener('input', update);

      // Preset buttons
      const presetButtons = document.querySelectorAll('[data-preset]');
      presetButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          presetButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const preset = btn.getAttribute('data-preset');
          if (preset === 'standard') {
            this.sliderA.value = 1;
            this.sliderB.value = -2;
            this.sliderC.value = -3;
          } else if (preset === 'tangent') {
            this.sliderA.value = 1;
            this.sliderB.value = -4;
            this.sliderC.value = 4;
          } else if (preset === 'no-root') {
            this.sliderA.value = -1;
            this.sliderB.value = 2;
            this.sliderC.value = -3;
          } else if (preset === 'simple') {
            this.sliderA.value = 1;
            this.sliderB.value = 0;
            this.sliderC.value = 0;
          }
          update();
        });
      });

      // Initial render
      update();
    }

    resizeCanvas() {
      const rect = this.canvas.parentElement.getBoundingClientRect();
      const w = Math.min(rect.width - 32, 600);
      this.canvas.width = w > 280 ? w : 320;
      this.canvas.height = 360;
      this.originX = this.canvas.width / 2;
      this.originY = this.canvas.height / 2;
      this.scale = this.canvas.width < 400 ? 22 : 28;
    }

    updateMathInfo(a, b, c) {
      // Format equation
      const signB = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
      const signC = c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`;
      const eq = `y = ${a === 1 ? '' : a === -1 ? '-' : a}x² ${signB}x ${signC}`;
      if (this.formulaDisplay) {
        this.formulaDisplay.textContent = eq;
      }

      // Delta
      const delta = (b * b) - (4 * a * c);
      if (this.deltaDisplay) {
        this.deltaDisplay.innerHTML = `Δ = (${b})² - 4(${a})(${c}) = <strong>${delta.toFixed(2)}</strong>`;
      }

      // Vertex
      const h = -b / (2 * a);
      const k = (a * h * h) + (b * h) + c;
      if (this.vertexDisplay) {
        this.vertexDisplay.innerHTML = `កំពូល V(h, k): <strong>(${h.toFixed(2)}, ${k.toFixed(2)})</strong>`;
      }

      // Nature and Roots
      if (this.rootsDisplay && this.natureDisplay) {
        const openDir = a > 0 ? 'ប៉ារ៉ាបូលផ្ងារឡើងលើ (a > 0)' : 'ប៉ារ៉ាបូលផ្កាប់ចុះក្រោម (a < 0)';
        if (delta > 0.0001) {
          const x1 = (-b - Math.sqrt(delta)) / (2 * a);
          const x2 = (-b + Math.sqrt(delta)) / (2 * a);
          this.natureDisplay.textContent = `${openDir} | កាត់អ័ក្ស x ត្រង់ ២ ចំណុច`;
          this.rootsDisplay.innerHTML = `ឫសពិត ២: x₁ = <strong>${Math.min(x1, x2).toFixed(2)}</strong>, x₂ = <strong>${Math.max(x1, x2).toFixed(2)}</strong>`;
        } else if (Math.abs(delta) <= 0.0001) {
          const x0 = -b / (2 * a);
          this.natureDisplay.textContent = `${openDir} | ប៉ះអ័ក្ស x ត្រង់ ១ ចំណុច (ឫសឌុប)`;
          this.rootsDisplay.innerHTML = `ឫសឌុប: x₀ = <strong>${x0.toFixed(2)}</strong>`;
        } else {
          this.natureDisplay.textContent = `${openDir} | មិនកាត់អ័ក្ស x ក្នុង ℝ (ឫសកុំផ្លិច)`;
          const realPart = (-b / (2 * a)).toFixed(2);
          const imagPart = (Math.sqrt(-delta) / (2 * Math.abs(a))).toFixed(2);
          this.rootsDisplay.innerHTML = `ឫសកុំផ្លិច: <strong>${realPart} ± ${imagPart}i</strong>`;
        }
      }
    }

    draw() {
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      const a = parseFloat(this.sliderA.value) || 0.1;
      const b = parseFloat(this.sliderB.value);
      const c = parseFloat(this.sliderC.value);

      const ctx = this.ctx;
      const w = this.canvas.width;
      const h = this.canvas.height;
      const ox = this.originX;
      const oy = this.originY;
      const s = this.scale;

      ctx.clearRect(0, 0, w, h);

      // Background grid
      ctx.strokeStyle = isDark ? '#1e293b' : '#f1f5f9';
      ctx.lineWidth = 1;
      for (let x = ox % s; x < w; x += s) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = oy % s; y < h; y += s) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Main Axes
      ctx.strokeStyle = isDark ? '#64748b' : '#94a3b8';
      ctx.lineWidth = 1.5;

      // X-axis
      ctx.beginPath();
      ctx.moveTo(0, oy);
      ctx.lineTo(w, oy);
      ctx.stroke();

      // Y-axis
      ctx.beginPath();
      ctx.moveTo(ox, 0);
      ctx.lineTo(ox, h);
      ctx.stroke();

      // Axis labels & arrows
      ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
      ctx.font = '12px Inter, sans-serif';
      ctx.fillText('x', w - 15, oy - 8);
      ctx.fillText('y', ox + 8, 15);
      ctx.fillText('O', ox - 14, oy + 14);

      // Grid unit marks
      for (let i = -10; i <= 10; i++) {
        if (i === 0) continue;
        const px = ox + i * s;
        if (px >= 0 && px <= w) {
          ctx.beginPath();
          ctx.moveTo(px, oy - 3);
          ctx.lineTo(px, oy + 3);
          ctx.stroke();
          if (i % 2 === 0) {
            ctx.font = '9px Inter, sans-serif';
            ctx.fillText(i, px - 4, oy + 15);
          }
        }

        const py = oy - i * s;
        if (py >= 0 && py <= h) {
          ctx.beginPath();
          ctx.moveTo(ox - 3, py);
          ctx.lineTo(ox + 3, py);
          ctx.stroke();
          if (i % 2 === 0) {
            ctx.font = '9px Inter, sans-serif';
            ctx.fillText(i, ox + 6, py + 3);
          }
        }
      }

      // Draw Parabola Curve
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = '#06b6d4'; // Cyan neon
      ctx.lineWidth = 3;
      ctx.shadowColor = 'rgba(6, 182, 212, 0.4)';
      ctx.shadowBlur = 8;

      let started = false;
      const step = 2; // pixel step
      for (let px = 0; px <= w; px += step) {
        const mathX = (px - ox) / s;
        const mathY = a * mathX * mathX + b * mathX + c;
        const py = oy - mathY * s;

        if (py >= -50 && py <= h + 50) {
          if (!started) {
            ctx.moveTo(px, py);
            started = true;
          } else {
            ctx.lineTo(px, py);
          }
        } else {
          started = false;
        }
      }
      ctx.stroke();
      ctx.restore();

      // Plot Vertex
      const vX = -b / (2 * a);
      const vY = a * vX * vX + b * vX + c;
      const vPx = ox + vX * s;
      const vPy = oy - vY * s;

      if (vPx >= 0 && vPx <= w && vPy >= 0 && vPy <= h) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(vPx, vPy, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#f59e0b'; // Amber
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = isDark ? '#fbbf24' : '#d97706';
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.fillText(`V(${vX.toFixed(1)}, ${vY.toFixed(1)})`, vPx + 8, vPy - 8);
        ctx.restore();
      }

      // Plot Roots if real
      const delta = b * b - 4 * a * c;
      if (delta >= 0) {
        const r1 = (-b - Math.sqrt(delta)) / (2 * a);
        const r2 = (-b + Math.sqrt(delta)) / (2 * a);

        [r1, r2].forEach(r => {
          const rPx = ox + r * s;
          if (rPx >= 0 && rPx <= w) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(rPx, oy, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#10b981'; // Emerald
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.restore();
          }
        });
      }
    }
  }

  /* ============================================================
     2. INTERACTIVE TRIGONOMETRIC UNIT CIRCLE
     ============================================================ */
  class TrigUnitCircle {
    constructor() {
      this.canvas = document.getElementById('trig-canvas');
      if (!this.canvas) return;

      this.ctx = this.canvas.getContext('2d');
      this.angleSlider = document.getElementById('trig-angle-slider');
      this.angleDegText = document.getElementById('trig-deg-text');
      this.angleRadText = document.getElementById('trig-rad-text');

      this.sinValue = document.getElementById('trig-val-sin');
      this.cosValue = document.getElementById('trig-val-cos');
      this.tanValue = document.getElementById('trig-val-tan');

      this.radius = 110;
      this.init();
    }

    init() {
      this.resizeCanvas();
      window.addEventListener('resize', () => {
        this.resizeCanvas();
        this.draw();
      });

      const update = () => {
        const deg = parseFloat(this.angleSlider.value);
        const rad = (deg * Math.PI) / 180;

        const sin = Math.sin(rad);
        const cos = Math.cos(rad);
        const tan = Math.abs(cos) < 0.0001 ? (sin > 0 ? '+∞' : '-∞') : (sin / cos).toFixed(3);

        this.angleDegText.textContent = `${deg}°`;
        this.angleRadText.textContent = `${(rad / Math.PI).toFixed(2)}π rad`;

        this.sinValue.textContent = sin.toFixed(3);
        this.cosValue.textContent = cos.toFixed(3);
        this.tanValue.textContent = tan;

        this.draw();
      };

      this.angleSlider.addEventListener('input', update);

      // Quick Angle Buttons
      const angleButtons = document.querySelectorAll('[data-angle]');
      angleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          angleButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.angleSlider.value = btn.getAttribute('data-angle');
          update();
        });
      });

      update();
    }

    resizeCanvas() {
      const rect = this.canvas.parentElement.getBoundingClientRect();
      const size = Math.min(rect.width - 32, 360);
      this.canvas.width = size > 260 ? size : 280;
      this.canvas.height = this.canvas.width;
      this.originX = this.canvas.width / 2;
      this.originY = this.canvas.height / 2;
      this.radius = (this.canvas.width / 2) - 36;
    }

    draw() {
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      const ctx = this.ctx;
      const ox = this.originX;
      const oy = this.originY;
      const r = this.radius;
      const deg = parseFloat(this.angleSlider.value);
      const rad = (deg * Math.PI) / 180;

      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Draw Main Axes
      ctx.strokeStyle = isDark ? '#475569' : '#cbd5e1';
      ctx.lineWidth = 1.5;

      ctx.beginPath();
      ctx.moveTo(20, oy);
      ctx.lineTo(this.canvas.width - 20, oy);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(ox, 20);
      ctx.lineTo(ox, this.canvas.height - 20);
      ctx.stroke();

      // Axis labels
      ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
      ctx.font = '11px Inter, sans-serif';
      ctx.fillText('cos x', this.canvas.width - 35, oy - 6);
      ctx.fillText('sin y', ox + 6, 26);

      // Unit Circle
      ctx.beginPath();
      ctx.arc(ox, oy, r, 0, Math.PI * 2);
      ctx.strokeStyle = isDark ? 'rgba(56, 189, 248, 0.4)' : 'rgba(2, 132, 199, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Angle coordinates on unit circle
      const px = ox + Math.cos(rad) * r;
      const py = oy - Math.sin(rad) * r;

      // Arc for angle
      ctx.beginPath();
      ctx.arc(ox, oy, 28, 0, -rad, true);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Triangle fill
      ctx.beginPath();
      ctx.moveTo(ox, oy);
      ctx.lineTo(px, oy);
      ctx.lineTo(px, py);
      ctx.closePath();
      ctx.fillStyle = isDark ? 'rgba(6, 182, 212, 0.12)' : 'rgba(2, 132, 199, 0.08)';
      ctx.fill();

      // cos component line (horizontal emerald)
      ctx.beginPath();
      ctx.moveTo(ox, oy);
      ctx.lineTo(px, oy);
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3;
      ctx.stroke();

      // sin component line (vertical cyan)
      ctx.beginPath();
      ctx.moveTo(px, oy);
      ctx.lineTo(px, py);
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Radius hypotenuse
      ctx.beginPath();
      ctx.moveTo(ox, oy);
      ctx.lineTo(px, py);
      ctx.strokeStyle = isDark ? '#e2e8f0' : '#1e293b';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Point on Circle
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#f59e0b';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  /* ============================================================
     3. FORMULA SEARCH & CHEAT SHEET ENGINE
     ============================================================ */
  class FormulaEngine {
    constructor() {
      this.container = document.getElementById('formula-cards-grid');
      this.searchInput = document.getElementById('formula-search-input');
      this.filterButtons = document.querySelectorAll('[data-formula-filter]');
      this.countDisplay = document.getElementById('formula-match-count');
      this.currentFilter = 'all';

      if (!this.container || typeof FORMULAS_DATA === 'undefined') return;
      this.init();
    }

    init() {
      this.renderFormulas(FORMULAS_DATA);

      if (this.searchInput) {
        this.searchInput.addEventListener('input', () => {
          this.applyFilters();
        });
      }

      this.filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          this.filterButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.currentFilter = btn.getAttribute('data-formula-filter');
          this.applyFilters();
        });
      });
    }

    applyFilters() {
      const query = (this.searchInput ? this.searchInput.value.trim().toLowerCase() : '');
      const filtered = FORMULAS_DATA.filter(item => {
        const matchesCategory = (this.currentFilter === 'all' || item.category === this.currentFilter);
        const matchesQuery = !query ||
          item.title.toLowerCase().includes(query) ||
          item.explanation.toLowerCase().includes(query) ||
          item.formula.toLowerCase().includes(query) ||
          item.tags.some(tag => tag.toLowerCase().includes(query));

        return matchesCategory && matchesQuery;
      });

      this.renderFormulas(filtered);
      if (this.countDisplay) {
        this.countDisplay.textContent = `រកឃើញ ${filtered.length} រូបមន្ត`;
      }
    }

    renderFormulas(list) {
      if (!this.container) return;

      if (list.length === 0) {
        this.container.innerHTML = `
          <div class="no-results">
            <span class="no-results-icon">🔍</span>
            <p>មិនមានរូបមន្តត្រូវគ្នានឹងពាក្យស្វែងរកនេះឡើយ។</p>
          </div>
        `;
        return;
      }

      this.container.innerHTML = list.map(item => `
        <div class="formula-card glass-card" data-category="${item.category}">
          <div class="formula-header">
            <span class="formula-badge">${item.categoryName}</span>
            <button class="copy-btn" title="ចម្លងរូបមន្ត" onclick="window.copyFormula('${this.escapeHtml(item.formula)}')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              <span>ចម្លង</span>
            </button>
          </div>
          <h4 class="formula-title">${item.title}</h4>
          <div class="formula-code-box">
            <code>${this.renderReadableFormula(item.formula)}</code>
          </div>
          <p class="formula-desc">${item.explanation}</p>
          <div class="formula-tags">
            ${item.tags.map(t => `<span class="tag">#${t}</span>`).join('')}
          </div>
        </div>
      `).join('');
    }

    renderReadableFormula(tex) {
      return tex
        .replace(/\\cdot/g, '·')
        .replace(/\\quad \| \\quad/g, '  |  ')
        .replace(/\\quad/g, ' ')
        .replace(/\\frac{([^}]+)}{([^}]+)}/g, '($1)/($2)')
        .replace(/\\int/g, '∫')
        .replace(/\\lim_{([^}]+)}/g, 'lim($1)')
        .replace(/\\to/g, '→')
        .replace(/\\sin/g, 'sin')
        .replace(/\\cos/g, 'cos')
        .replace(/\\tan/g, 'tan')
        .replace(/\\ln/g, 'ln')
        .replace(/\\sqrt{([^}]+)}/g, '√($1)')
        .replace(/\\ne/g, '≠')
        .replace(/\\le/g, '≤')
        .replace(/\\ge/g, '≥')
        .replace(/\\implies/g, '⟹')
        .replace(/\\theta/g, 'θ')
        .replace(/\\cap/g, '∩')
        .replace(/\\cup/g, '∪')
        .replace(/\\,/g, ' ');
    }

    escapeHtml(str) {
      return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
    }
  }

  // Global helper for copying
  window.copyFormula = function (text) {
    navigator.clipboard.writeText(text).then(() => {
      if (window.showToast) {
        window.showToast('បានចម្លងរូបមន្តដោយជោគជ័យ! ✅');
      } else {
        alert('បានចម្លងរូបមន្ត៖ ' + text);
      }
    }).catch(() => {
      // Fallback
      window.showToast && window.showToast('បានជ្រើសរូបមន្តរួចរាល់!');
    });
  };

  // Initialize on load
  document.addEventListener('DOMContentLoaded', () => {
    new QuadraticPlotter();
    new TrigUnitCircle();
    new FormulaEngine();
  });
})();
