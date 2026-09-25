/**
 * curve-animator.js - Cinematic Mathematical Curve Graph Video Studio
 * 3Blue1Brown / Manim-style Curve Plotter, Real-Time Tangents,
 * Critical Points Detection, and Live Video Recorder & Downloader.
 * Teacher Chheng Chhovorn - Mathematics Portfolio
 */

(function () {
  'use strict';

  // Available Mathematical Curve Presets
  const CURVE_PRESETS = {
    integral_area: {
      name: 'ការពិសោធន៍អាំងតេក្រាលគណនាផ្ទៃក្រឡា (Definite Integral & Riemann Sums)',
      formula: 'A = ∫₀³ (-x² + 3x + 1) dx = 7.50',
      derivative: 'f(x) = -x² + 3x + 1  ⇒  F(x) = -x³/3 + 1.5x² + x  ⇒  A = 7.50',
      type: 'integral',
      domain: [-0.6, 3.8],
      integralBounds: { a: 0, b: 3 },
      viewport: { oxRatio: 0.28, oyRatio: 0.74, scaleDiv: 4.8 },
      f: (x) => -Math.pow(x, 2) + 3 * x + 1,
      df: (x) => -2 * x + 3,
      F: (x) => -Math.pow(x, 3) / 3 + 1.5 * Math.pow(x, 2) + x,
      exactArea: 7.5,
      criticalPoints: [
        { x: 0, y: 1, label: 'x = a = 0 (គោលក្រោម)', type: 'bound' },
        { x: 1.5, y: 3.25, label: 'កំពូល Max(1.5, 3.25)', type: 'max' },
        { x: 3, y: 1, label: 'x = b = 3 (គោលលើ)', type: 'bound' }
      ],
      desc: 'ការពិសោធន៍អាំងតេក្រាលក្នុងការគណនាផ្ទៃក្រឡាខ្សែកោង! បង្ហាញពីការបែងចែកផ្ទៃជាចតុកោណកែងតូចៗ (Riemann Sums) N = 4 → 8 → 16 → 32 → 64 រួចរលាយចូលទៅជាផ្ទៃក្រឡាពិតប្រាកដនៃអាំងតេក្រាលកំណត់ ∫₀³ f(x)dx = 7.50 ឯកតាផ្ទៃ។'
    },
    cubic: {
      name: 'អនុគមន៍ដឺក្រេទី ៣ (Cubic Polynomial)',
      formula: 'f(x) = 0.5(x³ - 3x)',
      derivative: 'f\'(x) = 1.5x² - 1.5',
      type: 'explicit',
      domain: [-2.6, 2.6],
      f: (x) => 0.5 * (Math.pow(x, 3) - 3 * x),
      df: (x) => 1.5 * Math.pow(x, 2) - 1.5,
      criticalPoints: [
        { x: -1.732, y: 0, label: 'ឫស x₁ = -√3', type: 'root' },
        { x: -1.0, y: 1.0, label: 'អតិបរមាធៀប Max(-1, 1)', type: 'max' },
        { x: 0, y: 0, label: 'ចំណុចរបត់ O(0, 0)', type: 'inflection' },
        { x: 1.0, y: -1.0, label: 'អប្បបរមាធៀប Min(1, -1)', type: 'min' },
        { x: 1.732, y: 0, label: 'ឫស x₂ = √3', type: 'root' }
      ],
      desc: 'អនុគមន៍ស្នូលបាក់ឌុប! សិក្សាទិសដៅអថេរភាព ចំណុចរបត់ និងបរមាធៀបនៃអនុគមន៍ពហុធាដឺក្រេទី៣។'
    },
    sine: {
      name: 'រលកស៊ីនុសអាម៉ូនិក (Harmonic Wave)',
      formula: 'f(x) = 2.5 sin(1.6x)',
      derivative: 'f\'(x) = 4.0 cos(1.6x)',
      type: 'explicit',
      domain: [-4.2, 4.2],
      f: (x) => 2.5 * Math.sin(1.6 * x),
      df: (x) => 4.0 * Math.cos(1.6 * x),
      criticalPoints: [
        { x: -2.94, y: -2.5, label: 'Min(-2.94, -2.5)', type: 'min' },
        { x: -0.98, y: 2.5, label: 'Max(-0.98, 2.5)', type: 'max' },
        { x: 0.98, y: -2.5, label: 'Min(0.98, -2.5)', type: 'min' },
        { x: 2.94, y: 2.5, label: 'Max(2.94, 2.5)', type: 'max' }
      ],
      desc: 'រលកត្រីកោណមាត្រអាម៉ូនិក ខួប T = 2π/ω បង្ហាញបម្រែបម្រួលស៊ីជម្រៅនៃរលកសូរសំឡេង និងពន្លឺ។'
    },
    damped: {
      name: 'រលកចុះថយ (Damped Oscillation)',
      formula: 'f(x) = 3.5 e^{-0.25x} cos(2x)',
      derivative: 'f\'(x) = -3.5 e^{-0.25x}(0.25cos(2x) + 2sin(2x))',
      type: 'explicit',
      domain: [0, 8.5],
      f: (x) => 3.5 * Math.exp(-0.25 * x) * Math.cos(2 * x),
      df: (x) => -3.5 * Math.exp(-0.25 * x) * (0.25 * Math.cos(2 * x) + 2 * Math.sin(2 * x)),
      criticalPoints: [
        { x: 0, y: 3.5, label: 'ចាប់ផ្តើម (0, 3.5)', type: 'max' },
        { x: 1.5, y: -2.38, label: 'ជ្រលងទី ១', type: 'min' },
        { x: 3.1, y: 1.6, label: 'កំពូលទី ២', type: 'max' },
        { x: 4.65, y: -1.08, label: 'ជ្រលងទី ២', type: 'min' }
      ],
      desc: 'គំរូរលកក្នុងរូបវិទ្យា និងវិស្វកម្ម! អំព្លីទុតថយចុះជាលំដាប់ក្រោមឥទ្ធិពលកម្លាំងកកិតតាមអនុគមន៍អិចស្ប៉ូណង់ស្យែល។'
    },
    quartic: {
      name: 'អនុគមន៍ដឺក្រេទី ៤ រាងអក្សរ W (Quartic W-Curve)',
      formula: 'f(x) = 0.25(x⁴ - 4x²)',
      derivative: 'f\'(x) = x³ - 2x',
      type: 'explicit',
      domain: [-2.6, 2.6],
      f: (x) => 0.25 * (Math.pow(x, 4) - 4 * Math.pow(x, 2)),
      df: (x) => Math.pow(x, 3) - 2 * x,
      criticalPoints: [
        { x: -1.414, y: -1.0, label: 'អប្បបរមា Min(-√2, -1)', type: 'min' },
        { x: 0, y: 0, label: 'អតិបរមា Max(0, 0)', type: 'max' },
        { x: 1.414, y: -1.0, label: 'អប្បបរមា Min(√2, -1)', type: 'min' },
        { x: -2.0, y: 0, label: 'ឫស x = -2', type: 'root' },
        { x: 2.0, y: 0, label: 'ឫស x = 2', type: 'root' }
      ],
      desc: 'អនុគមន៍ស៊ីមេទ្រីធៀបនឹងអ័ក្សអរដោនេ (Oy) មានឫសពិត ៣ និងបរមា ៣ បង្កើតបានជារាងអក្សរ W ដ៏ស្រស់ស្អាត។'
    },
    heart: {
      name: 'ខ្សែកោងបេះដូងគណិតវិទ្យា (Cardioid Heart Curve)',
      formula: 'x = 16sin³(t), y = 13cos(t) - 5cos(2t) - 2cos(3t) - cos(4t)',
      derivative: 'Parametric Heart Curve',
      type: 'parametric',
      domain: [0, Math.PI * 2],
      f: (t) => {
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        return { x: x * 0.18, y: y * 0.18 };
      },
      criticalPoints: [
        { x: 0, y: 2.88, label: 'កំពូលបេះដូង', type: 'max' },
        { x: 0, y: -3.06, label: 'ចុងបាតបេះដូង', type: 'min' }
      ],
      desc: 'រូបមន្តគណិតវិទ្យាដ៏អស្ចារ្យដែលបង្កើតបានជារូបបេះដូងតាមរយៈអនុគមន៍ប៉ារ៉ាម៉ែត្រត្រីកោណមាត្រ។'
    },
    rose: {
      name: 'ខ្សែកោងផ្កា ៤ ស្រទាប់ (Polar Rose Curve)',
      formula: 'r = 3.5 cos(2θ)',
      derivative: 'dr/dθ = -7.0 sin(2θ)',
      type: 'parametric',
      domain: [0, Math.PI * 2],
      f: (theta) => {
        const r = 3.2 * Math.cos(2 * theta);
        return { x: r * Math.cos(theta), y: r * Math.sin(theta) };
      },
      criticalPoints: [
        { x: 3.2, y: 0, label: 'ស្រទាប់ ១', type: 'max' },
        { x: 0, y: 3.2, label: 'ស្រទាប់ ២', type: 'max' },
        { x: -3.2, y: 0, label: 'ស្រទាប់ ៣', type: 'max' },
        { x: 0, y: -3.2, label: 'ស្រទាប់ ៤', type: 'max' }
      ],
      desc: 'ខ្សែកោងប៉ូលែររាងផ្កា ៤ ស្រទាប់ ស៊ីមេទ្រីល្អឥតខ្ចោះ បង្ហាញពីភាពស្រស់ស្អាតនៃធរណីមាត្រធម្មជាតិ។'
    }
  };

  class CurveVideoStudio {
    constructor() {
      this.canvas = document.getElementById('curve-video-canvas');
      if (!this.canvas) return;

      this.ctx = this.canvas.getContext('2d');
      this.currentPresetKey = 'cubic';
      this.progress = 0; // 0 to 1
      this.isPlaying = true;
      this.speed = 1.0;
      this.animationFrameId = null;

      // Particle sparkles trail behind tracer pen
      this.particles = [];

      // Recording state
      this.mediaRecorder = null;
      this.recordedChunks = [];
      this.isRecording = false;

      // DOM Controls
      this.playPauseBtn = document.getElementById('studio-play-btn');
      this.replayBtn = document.getElementById('studio-replay-btn');
      this.progressBar = document.getElementById('studio-progress-bar');
      this.timeDisplay = document.getElementById('studio-time-display');
      this.presetSelect = document.getElementById('studio-preset-select');
      this.speedButtons = document.querySelectorAll('[data-studio-speed]');
      this.recordBtn = document.getElementById('studio-record-btn');
      this.recBadge = document.getElementById('studio-rec-badge');
      this.downloadBtn = document.getElementById('studio-download-btn');
      this.integralToolbar = document.getElementById('studio-integral-toolbar');
      this.riemannButtons = document.querySelectorAll('[data-riemann-n]');
      this.legendContainer = document.getElementById('studio-legend-items');
      this.metaTitleText = document.getElementById('studio-meta-title-text');
      this.manualRiemannN = null;
      this.ambientParticles = [];

      // Live HUD readouts
      this.hudFormula = document.getElementById('studio-hud-formula');
      this.hudDerivative = document.getElementById('studio-hud-derivative');
      this.hudCoord = document.getElementById('studio-hud-coord');
      this.hudSlope = document.getElementById('studio-hud-slope');
      this.hudDesc = document.getElementById('studio-hud-desc');

      this.init();
    }

    init() {
      this.resize();
      window.addEventListener('resize', () => this.resize());

      // Preset Change
      if (this.presetSelect) {
        this.presetSelect.addEventListener('change', (e) => {
          this.setPreset(e.target.value);
        });
      }

      // Play/Pause
      if (this.playPauseBtn) {
        this.playPauseBtn.addEventListener('click', () => this.togglePlay());
      }

      // Replay
      if (this.replayBtn) {
        this.replayBtn.addEventListener('click', () => this.replay());
      }

      // Progress Scrubber
      if (this.progressBar) {
        this.progressBar.addEventListener('input', (e) => {
          this.progress = parseFloat(e.target.value) / 100;
          this.drawFrame();
        });
      }

      // Speed control
      this.speedButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          this.speedButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.speed = parseFloat(btn.getAttribute('data-studio-speed'));
        });
      });

      // Video Recording
      if (this.recordBtn) {
        this.recordBtn.addEventListener('click', () => this.toggleRecording());
      }

      if (this.downloadBtn) {
        this.downloadBtn.addEventListener('click', () => this.downloadVideo());
      }

      // Riemann step buttons
      if (this.riemannButtons) {
        this.riemannButtons.forEach(btn => {
          btn.addEventListener('click', () => {
            this.riemannButtons.forEach(b => b.classList.remove('active', 'active-gold'));
            const nVal = btn.getAttribute('data-riemann-n');
            if (nVal === 'exact') {
              btn.classList.add('active-gold');
              this.manualRiemannN = 'exact';
              this.progress = 1.0;
            } else {
              btn.classList.add('active');
              const n = parseInt(nVal, 10);
              this.manualRiemannN = n;
              if (n === 4) this.progress = 0.40;
              else if (n === 8) this.progress = 0.50;
              else if (n === 16) this.progress = 0.62;
              else if (n === 32) this.progress = 0.72;
              else if (n === 64) this.progress = 0.80;
            }
            this.pause();
            this.drawFrame();
          });
        });
      }

      this.setPreset('integral_area');
      this.loop();
    }

    resize() {
      const container = this.canvas.parentElement;
      const rect = container.getBoundingClientRect();
      const w = Math.floor(rect.width);
      const h = Math.min(Math.floor(w * 0.5625), 520); // 16:9 aspect ratio

      // Set high-DPI canvas
      const dpr = window.devicePixelRatio || 1;
      this.canvas.width = w * dpr;
      this.canvas.height = h * dpr;
      this.canvas.style.width = `${w}px`;
      this.canvas.style.height = `${h}px`;

      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.logicalWidth = w;
      this.logicalHeight = h;
      this.originX = w / 2;
      this.originY = h / 2;
      this.scale = Math.min(w, h) / 8.5; // pixel units
    }

    setPreset(key) {
      if (!CURVE_PRESETS[key]) return;
      this.currentPresetKey = key;
      this.progress = 0;
      this.particles = [];
      this.manualRiemannN = null;

      const p = CURVE_PRESETS[key];
      if (this.hudFormula) this.hudFormula.textContent = p.formula;
      if (this.hudDerivative) this.hudDerivative.textContent = p.derivative;
      if (this.hudDesc) this.hudDesc.textContent = p.desc;

      if (this.presetSelect && this.presetSelect.value !== key) {
        this.presetSelect.value = key;
      }

      // Show / hide integral toolbar
      if (this.integralToolbar) {
        if (key === 'integral_area') {
          this.integralToolbar.style.display = 'flex';
        } else {
          this.integralToolbar.style.display = 'none';
        }
      }

      // Dynamic legend update
      if (this.legendContainer) {
        if (key === 'integral_area') {
          this.legendContainer.innerHTML = `
            <div class="legend-item">
              <span class="legend-dot" style="background: rgba(6, 182, 212, 0.85); border-radius: 2px;"></span>
              <span>ចតុកោណកែងរីម៉ាន (Riemann Rectangles: f(xᵢ) · Δx)</span>
            </div>
            <div class="legend-item">
              <span class="legend-dot" style="background: #10b981; border-radius: 2px;"></span>
              <span>ផ្ទៃក្រឡាអាំងតេក្រាលពិតប្រាកដ (Exact Area ∫₀³ f(x)dx = 7.50)</span>
            </div>
            <div class="legend-item">
              <span class="legend-dot" style="background: #f59e0b; border-radius: 2px;"></span>
              <span>ព្រំដែនកំណត់សងខាង x = a = 0 និង x = b = 3</span>
            </div>
            <div class="legend-item">
              <span class="legend-dot" style="background: #38bdf8;"></span>
              <span>ខ្សែកោងអនុគមន៍ f(x) = -x² + 3x + 1</span>
            </div>
          `;
          if (this.metaTitleText) this.metaTitleText.textContent = 'ការពិសោធន៍អាំងតេក្រាល & រូបមន្តគណនាផ្ទៃក្រឡា';
        } else {
          this.legendContainer.innerHTML = `
            <div class="legend-item">
              <span class="legend-dot dot-max"></span>
              <span>ចំណុចអតិបរមាធៀប (Local Maximum)</span>
            </div>
            <div class="legend-item">
              <span class="legend-dot dot-min"></span>
              <span>ចំណុចអប្បបរមាធៀប (Local Minimum)</span>
            </div>
            <div class="legend-item">
              <span class="legend-dot dot-root"></span>
              <span>ឫស ឬចំណុចកាត់អ័ក្សអាប់ស៊ីស (x-Intercept)</span>
            </div>
            <div class="legend-item">
              <span class="legend-dot dot-tangent"></span>
              <span>បន្ទាត់ប៉ះ (Tangent Line - បង្ហាញដេរីវេ f'(x))</span>
            </div>
          `;
          if (this.metaTitleText) this.metaTitleText.textContent = 'ការបកស្រាយលក្ខណៈរូបមន្ត និងទិសដៅអថេរភាព';
        }
      }

      this.play();
    }

    play() {
      this.isPlaying = true;
      if (this.playPauseBtn) {
        this.playPauseBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
          <span>ផ្អាក (Pause)</span>
        `;
      }
    }

    pause() {
      this.isPlaying = false;
      if (this.playPauseBtn) {
        this.playPauseBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          <span>ចាក់វីដេអូ (Play)</span>
        `;
      }
    }

    togglePlay() {
      if (this.isPlaying) this.pause();
      else {
        if (this.progress >= 1) this.progress = 0;
        this.manualRiemannN = null;
        this.play();
      }
    }

    replay() {
      this.manualRiemannN = null;
      this.progress = 0;
      this.particles = [];
      this.play();
      if (this.isRecording) {
        this.stopRecording();
      }
    }

    /* ============================================================
       VIDEO RECORDING WITH MEDIARECORDER API
       ============================================================ */
    toggleRecording() {
      if (this.isRecording) {
        this.stopRecording();
      } else {
        this.startRecording();
      }
    }

    startRecording() {
      if (!this.canvas.captureStream) {
        window.showToast('Browser របស់អ្នកមិនគាំទ្រ Canvas Stream Recording ឡើយ! ⚠️', 'warning');
        return;
      }

      this.recordedChunks = [];
      const stream = this.canvas.captureStream(60);

      // Preferred codecs
      const mimeTypes = [
        'video/webm;codecs=vp9,opus',
        'video/webm;codecs=vp8,opus',
        'video/webm',
        'video/mp4'
      ];
      let mimeType = mimeTypes.find(t => MediaRecorder.isTypeSupported(t)) || '';

      try {
        this.mediaRecorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      } catch (e) {
        console.error('MediaRecorder error:', e);
        window.showToast('មិនអាចចាប់ផ្តើមថតវីដេអូបានទេ!', 'warning');
        return;
      }

      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          this.recordedChunks.push(e.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        this.onRecordingComplete();
      };

      this.mediaRecorder.start(100);
      this.isRecording = true;

      // Update UI
      if (this.recBadge) this.recBadge.classList.add('recording-active');
      if (this.recordBtn) {
        this.recordBtn.innerHTML = `
          <span class="record-pulse-dot"></span>
          <span>បញ្ឈប់ការថត (Stop REC)</span>
        `;
        this.recordBtn.classList.add('btn-recording');
      }
      if (this.downloadBtn) this.downloadBtn.style.display = 'none';

      // Auto rewind and play to record a clean full curve video
      this.progress = 0;
      this.particles = [];
      this.play();

      window.showToast('🔴 កំពុងថតវីដេអូគូសក្រាប... សូមរង់ចាំឱ្យប៊ិចគូសចប់!');
    }

    stopRecording() {
      if (!this.isRecording || !this.mediaRecorder) return;
      this.isRecording = false;
      this.mediaRecorder.stop();

      if (this.recBadge) this.recBadge.classList.remove('recording-active');
      if (this.recordBtn) {
        this.recordBtn.innerHTML = `
          <span>🎥 ថតវីដេអូ (Record Video)</span>
        `;
        this.recordBtn.classList.remove('btn-recording');
      }
    }

    onRecordingComplete() {
      const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
      this.recordedVideoUrl = URL.createObjectURL(blob);

      if (this.downloadBtn) {
        this.downloadBtn.style.display = 'inline-flex';
        this.downloadBtn.classList.add('btn-pulse-gold');
      }

      window.showToast('🎉 ការថតវីដេអូបានជោគជ័យ! អ្នកអាចចុច «ទាញយកវីដេអូ» ឥឡូវនេះ!');
    }

    downloadVideo() {
      if (!this.recordedVideoUrl) {
        window.showToast('សូមចុច «ថតវីដេអូ» ជាមុនសិន! ⚠️', 'warning');
        return;
      }

      const a = document.createElement('a');
      a.href = this.recordedVideoUrl;
      const presetName = this.currentPresetKey;
      a.download = `math-curve-${presetName}-${Date.now()}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      window.showToast('📥 កំពុងទាញយកឯកសារវីដេអូ .webm ទៅកាន់ម៉ាស៊ីនរបស់អ្នក!');
    }

    /* ============================================================
       ANIMATION LOOP & DRAWING ENGINE
       ============================================================ */
    loop() {
      if (this.isPlaying) {
        // Increment progress (complete in ~5 seconds at 1x)
        const step = (0.0035 * this.speed);
        this.progress += step;

        if (this.progress >= 1.0) {
          this.progress = 1.0;
          this.pause();

          // If recording, automatically finish recording
          if (this.isRecording) {
            setTimeout(() => this.stopRecording(), 400);
          }
        }
      }

      if (this.progressBar) {
        this.progressBar.value = (this.progress * 100).toFixed(1);
      }
      if (this.timeDisplay) {
        const totalDuration = 5 / this.speed;
        const currentSec = (this.progress * totalDuration).toFixed(1);
        this.timeDisplay.textContent = `${currentSec}s / ${totalDuration.toFixed(1)}s`;
      }

      this.drawFrame();
      this.animationFrameId = requestAnimationFrame(() => this.loop());
    }

    drawFrame() {
      const ctx = this.ctx;
      const w = this.logicalWidth;
      const h = this.logicalHeight;
      let ox = this.originX;
      let oy = this.originY;
      let s = this.scale;
      const p = CURVE_PRESETS[this.currentPresetKey];

      if (p.viewport) {
        ox = w * p.viewport.oxRatio;
        oy = h * p.viewport.oyRatio;
        s = Math.min(w, h) / p.viewport.scaleDiv;
      }

      // 1. Clear background
      ctx.fillStyle = '#060a14'; // Dark chalkboard slate
      ctx.fillRect(0, 0, w, h);

      // If integral experiment preset, dispatch to specialized high-precision renderer
      if (p.type === 'integral') {
        this.drawIntegralExperiment(ctx, w, h, ox, oy, s, p, this.progress);
        return;
      }

      // 2. Draw Mathematical Coordinate Grid
      this.drawGrid(ctx, w, h, ox, oy, s);

      // 3. Draw Critical Points Guides
      this.drawCriticalPoints(ctx, ox, oy, s, p);

      // 4. Draw Animated Curve up to current progress
      const currentPoint = this.drawCurve(ctx, ox, oy, s, p, this.progress);

      // 5. Draw Tangent Line & Slope Vector if applicable
      if (currentPoint && p.type === 'explicit') {
        this.drawTangent(ctx, ox, oy, s, p, currentPoint.mathX, currentPoint.mathY);
      }

      // 6. Draw Glowing Tracer Pen & Particle Sparkles
      if (currentPoint) {
        this.drawTracerPen(ctx, currentPoint.px, currentPoint.py);
        this.updateHUD(currentPoint, p);
      }
    }

    drawGrid(ctx, w, h, ox, oy, s) {
      // Minor Grid
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.06)';
      ctx.lineWidth = 1;
      const subStep = s / 2;
      for (let x = ox % subStep; x < w; x += subStep) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = oy % subStep; y < h; y += subStep) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Major Grid
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.12)';
      ctx.lineWidth = 1.2;
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

      // Main Axes (X and Y)
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.shadowColor = 'rgba(56, 189, 248, 0.3)';
      ctx.shadowBlur = 6;

      // X Axis
      ctx.beginPath();
      ctx.moveTo(0, oy);
      ctx.lineTo(w, oy);
      ctx.stroke();

      // Y Axis
      ctx.beginPath();
      ctx.moveTo(ox, 0);
      ctx.lineTo(ox, h);
      ctx.stroke();

      ctx.shadowBlur = 0; // reset shadow

      // Ticks & Coordinate numbers
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px JetBrains Mono, monospace';

      // X ticks
      for (let i = -10; i <= 10; i++) {
        if (i === 0) continue;
        const px = ox + i * s;
        if (px > 20 && px < w - 20) {
          ctx.beginPath();
          ctx.moveTo(px, oy - 4);
          ctx.lineTo(px, oy + 4);
          ctx.strokeStyle = '#94a3b8';
          ctx.stroke();
          ctx.fillText(i, px - 4, oy + 16);
        }
      }

      // Y ticks
      for (let i = -10; i <= 10; i++) {
        if (i === 0) continue;
        const py = oy - i * s;
        if (py > 20 && py < h - 20) {
          ctx.beginPath();
          ctx.moveTo(ox - 4, py);
          ctx.lineTo(ox + 4, py);
          ctx.strokeStyle = '#94a3b8';
          ctx.stroke();
          ctx.fillText(i, ox + 8, py + 4);
        }
      }

      // Origin O label
      ctx.fillText('O', ox - 14, oy + 14);
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('x', w - 16, oy - 8);
      ctx.fillText('y', ox + 10, 16);
    }

    drawCurve(ctx, ox, oy, s, p, progress) {
      const [startDom, endDom] = p.domain;
      const currentEndDom = startDom + (endDom - startDom) * progress;

      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = '#06b6d4'; // Cyan neon
      ctx.shadowColor = 'rgba(6, 182, 212, 0.75)';
      ctx.shadowBlur = 12;

      let lastX = null, lastY = null;
      let lastPx = null, lastPy = null;

      const steps = 400;
      const currentSteps = Math.floor(steps * progress);

      for (let i = 0; i <= currentSteps; i++) {
        const tVal = startDom + (endDom - startDom) * (i / steps);
        let mathX, mathY;

        if (p.type === 'explicit') {
          mathX = tVal;
          mathY = p.f(mathX);
        } else {
          const pt = p.f(tVal);
          mathX = pt.x;
          mathY = pt.y;
        }

        const px = ox + mathX * s;
        const py = oy - mathY * s;

        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }

        lastX = mathX;
        lastY = mathY;
        lastPx = px;
        lastPy = py;
      }
      ctx.stroke();
      ctx.restore();

      if (lastPx === null) return null;
      return { px: lastPx, py: lastPy, mathX: lastX, mathY: lastY };
    }

    drawTangent(ctx, ox, oy, s, p, mathX, mathY) {
      if (typeof p.df !== 'function') return;
      const slope = p.df(mathX);
      if (isNaN(slope) || !isFinite(slope)) return;

      const tangentLength = 1.6; // in math units
      const x1 = mathX - tangentLength;
      const y1 = mathY - slope * tangentLength;
      const x2 = mathX + tangentLength;
      const y2 = mathY + slope * tangentLength;

      const px1 = ox + x1 * s;
      const py1 = oy - y1 * s;
      const px2 = ox + x2 * s;
      const py2 = oy - y2 * s;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(px1, py1);
      ctx.lineTo(px2, py2);
      ctx.strokeStyle = '#f59e0b'; // Amber tangent line
      ctx.lineWidth = 1.8;
      ctx.setLineDash([5, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    }

    drawCriticalPoints(ctx, ox, oy, s, p) {
      if (!p.criticalPoints) return;

      p.criticalPoints.forEach(cp => {
        // Only draw if within domain traversed
        const [domStart, domEnd] = p.domain;
        const currentDom = domStart + (domEnd - domStart) * this.progress;

        if (cp.x <= currentDom + 0.05) {
          const px = ox + cp.x * s;
          const py = oy - cp.y * s;

          ctx.save();
          // Halo ring
          ctx.beginPath();
          ctx.arc(px, py, 6, 0, Math.PI * 2);
          ctx.fillStyle = cp.type === 'max' ? '#10b981' : cp.type === 'min' ? '#ec4899' : '#f59e0b';
          ctx.shadowColor = ctx.fillStyle;
          ctx.shadowBlur = 10;
          ctx.fill();

          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Label
          ctx.shadowBlur = 0;
          ctx.fillStyle = '#f8fafc';
          ctx.font = 'bold 11px Kantumruy Pro, sans-serif';
          ctx.fillText(cp.label, px + 10, py - 8);
          ctx.restore();
        }
      });
    }

    drawTracerPen(ctx, px, py) {
      // Add particle
      if (this.isPlaying && Math.random() < 0.7) {
        this.particles.push({
          x: px,
          y: py,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          radius: Math.random() * 3 + 1,
          alpha: 1.0,
          color: Math.random() < 0.5 ? 'rgba(6, 182, 212, ' : 'rgba(245, 158, 11, '
        });
      }

      // Update and draw sparkles
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const pt = this.particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.alpha -= 0.025;

        if (pt.alpha <= 0) {
          this.particles.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
          ctx.fillStyle = `${pt.color}${pt.alpha})`;
          ctx.fill();
        }
      }

      // Glowing Pen Head
      ctx.save();
      ctx.beginPath();
      ctx.arc(px, py, 7, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 18;
      ctx.fill();

      // Outer Pulse Ring
      ctx.beginPath();
      ctx.arc(px, py, 14, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
    }

    updateHUD(pt, p) {
      if (this.hudCoord) {
        this.hudCoord.innerHTML = `P(x: <strong>${pt.mathX.toFixed(2)}</strong>, y: <strong>${pt.mathY.toFixed(2)}</strong>)`;
      }
      if (this.hudSlope && typeof p.df === 'function') {
        const slope = p.df(pt.mathX);
        this.hudSlope.innerHTML = `មេគុណប្រាប់ទិស f'(x) = <strong>${slope.toFixed(2)}</strong>`;
      } else if (this.hudSlope) {
        this.hudSlope.innerHTML = `ទម្រង់ប៉ារ៉ាម៉ែត្រ Parametric`;
      }
    }

    /* ============================================================
       INTEGRAL EXPERIMENT RENDERING ENGINE (Riemann Sums -> Area)
       ============================================================ */
    drawIntegralExperiment(ctx, w, h, ox, oy, s, p, progress) {
      const a = p.integralBounds.a; // 0
      const b = p.integralBounds.b; // 3
      const [startDom, endDom] = p.domain; // [-0.6, 3.8]

      // 1. Draw mathematical coordinate grid
      this.drawGrid(ctx, w, h, ox, oy, s);

      // 2. Compute curve tracing:
      // If progress < 0.25, trace the curve up to currentEndDom
      const curveProgress = Math.min(1.0, progress / 0.25);

      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = '#06b6d4';
      ctx.shadowColor = 'rgba(6, 182, 212, 0.85)';
      ctx.shadowBlur = 12;

      let lastPx = null, lastPy = null, lastX = null, lastY = null;
      const steps = 300;
      const curSteps = Math.floor(steps * curveProgress);
      for (let i = 0; i <= curSteps; i++) {
        const mx = startDom + (endDom - startDom) * (i / steps);
        const my = p.f(mx);
        const px = ox + mx * s;
        const py = oy - my * s;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
        lastPx = px;
        lastPy = py;
        lastX = mx;
        lastY = my;
      }
      ctx.stroke();
      ctx.restore();

      // If curve is still drawing, render tracer pen
      if (curveProgress < 1.0 && lastPx !== null) {
        this.drawTracerPen(ctx, lastPx, lastPy);
      }

      // 3. Draw Vertical Boundary Laser Lines at x=a and x=b
      const boundProgress = Math.min(1.0, Math.max(0, (progress - 0.18) / 0.12));
      if (boundProgress > 0) {
        // Line x = a = 0
        const paX = ox + a * s;
        const paY_base = oy;
        const paY_top = oy - (p.f(a) * boundProgress) * s;

        ctx.save();
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 4]);
        ctx.shadowColor = 'rgba(245, 158, 11, 0.7)';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(paX, paY_base);
        ctx.lineTo(paX, paY_top);
        ctx.stroke();

        // Line x = b = 3
        const pbX = ox + b * s;
        const pbY_base = oy;
        const pbY_top = oy - (p.f(b) * boundProgress) * s;
        ctx.beginPath();
        ctx.moveTo(pbX, pbY_base);
        ctx.lineTo(pbX, pbY_top);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        // Base tags on x-axis
        ctx.save();
        ctx.font = 'bold 12px JetBrains Mono, monospace';
        ctx.fillStyle = '#f59e0b';
        ctx.fillText(`a = ${a}`, paX - 18, paY_base + 22);
        ctx.fillText(`b = ${b}`, pbX - 12, pbY_base + 22);

        // Dots at (a, 0) and (b, 0)
        ctx.beginPath();
        ctx.arc(paX, paY_base, 4, 0, Math.PI * 2);
        ctx.arc(pbX, pbY_base, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#f59e0b';
        ctx.fill();
        ctx.restore();
      }

      // 4. Riemann Sums vs Continuous Definite Integral
      let isRiemann = false;
      let activeN = 4;
      let currentRiemannSum = 7.5;
      let approxError = 0;

      const riemannStart = 0.28;
      const riemannEnd = 0.80;

      if (this.manualRiemannN) {
        if (this.manualRiemannN === 'exact') {
          isRiemann = false;
        } else {
          isRiemann = true;
          activeN = this.manualRiemannN;
        }
      } else if (progress >= riemannStart && progress < riemannEnd) {
        isRiemann = true;
        const rRatio = (progress - riemannStart) / (riemannEnd - riemannStart);
        if (rRatio < 0.25) activeN = 4;
        else if (rRatio < 0.50) activeN = 8;
        else if (rRatio < 0.75) activeN = 16;
        else activeN = 32;
      } else if (progress >= riemannEnd) {
        isRiemann = false;
      }

      // If in Riemann phase:
      if (isRiemann) {
        const dx = (b - a) / activeN;
        let sum = 0;

        for (let k = 0; k < activeN; k++) {
          const xk = a + k * dx;
          const xnext = xk + dx;
          const xmid = xk + dx / 2;
          const hk = p.f(xmid);
          sum += hk * dx;

          const px1 = ox + xk * s;
          const px2 = ox + xnext * s;
          const py_bot = oy;
          const py_top = oy - hk * s;
          const rw = px2 - px1;
          const rh = py_bot - py_top;

          // Glass fill
          ctx.save();
          const rGrad = ctx.createLinearGradient(0, py_top, 0, py_bot);
          rGrad.addColorStop(0, 'rgba(6, 182, 212, 0.42)');
          rGrad.addColorStop(1, 'rgba(14, 165, 233, 0.12)');
          ctx.fillStyle = rGrad;
          ctx.fillRect(px1, py_top, rw, rh);

          // Border
          ctx.strokeStyle = activeN > 32 ? 'rgba(56, 189, 248, 0.5)' : 'rgba(56, 189, 248, 0.85)';
          ctx.lineWidth = activeN > 32 ? 0.8 : 1.4;
          ctx.strokeRect(px1, py_top, rw, rh);

          // Top highlight line
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = activeN > 32 ? 1.2 : 2.2;
          ctx.beginPath();
          ctx.moveTo(px1, py_top);
          ctx.lineTo(px2, py_top);
          ctx.stroke();

          // Midpoint marker
          if (activeN <= 16) {
            ctx.beginPath();
            ctx.arc(ox + xmid * s, py_top, 2.8, 0, Math.PI * 2);
            ctx.fillStyle = '#f59e0b';
            ctx.fill();
          }
          ctx.restore();
        }

        currentRiemannSum = sum;
        approxError = Math.abs(sum - 7.5);

        // Draw dx indicator under first rectangle if N <= 8
        if (activeN <= 8) {
          const px1 = ox + a * s;
          const px2 = ox + (a + dx) * s;
          ctx.save();
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(px1, oy + 8);
          ctx.lineTo(px1, oy + 13);
          ctx.lineTo(px2, oy + 13);
          ctx.lineTo(px2, oy + 8);
          ctx.stroke();
          ctx.fillStyle = '#38bdf8';
          ctx.font = '10px JetBrains Mono, monospace';
          ctx.fillText(`Δx=${dx.toFixed(2)}`, px1 + 4, oy + 26);
          ctx.restore();
        }

        this.updateToolbarActiveButton(activeN);
      }

      // If in Continuous Definite Integral phase (progress >= riemannEnd or exact):
      if (!isRiemann && (progress >= riemannEnd || this.manualRiemannN === 'exact')) {
        const morphAlpha = this.manualRiemannN === 'exact' ? 1.0 : Math.min(1.0, (progress - riemannEnd) / 0.12);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(ox + a * s, oy);
        const numFine = 200;
        for (let i = 0; i <= numFine; i++) {
          const curX = a + (b - a) * (i / numFine);
          const curY = p.f(curX);
          ctx.lineTo(ox + curX * s, oy - curY * s);
        }
        ctx.lineTo(ox + b * s, oy);
        ctx.closePath();

        const areaGrad = ctx.createLinearGradient(0, oy - 3.5 * s, 0, oy);
        areaGrad.addColorStop(0, `rgba(6, 182, 212, ${0.55 * morphAlpha})`);
        areaGrad.addColorStop(0.5, `rgba(16, 185, 129, ${0.38 * morphAlpha})`);
        areaGrad.addColorStop(1, `rgba(2, 132, 199, ${0.15 * morphAlpha})`);
        ctx.fillStyle = areaGrad;
        ctx.fill();

        // Glowing boundary line on top of curve
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3.2;
        ctx.shadowColor = 'rgba(16, 185, 129, 0.85)';
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.restore();

        // Draw ambient floating particles inside shaded area
        this.drawAmbientIntegralParticles(ctx, ox, oy, s, a, b, p);

        this.updateToolbarActiveButton('exact');
      }

      // 5. Critical Points (Vertex & Bounds)
      this.drawCriticalPoints(ctx, ox, oy, s, p);

      // 6. High-Tech Mathematical Banner Card on Canvas (Top Center)
      this.drawIntegralCanvasCard(ctx, w, isRiemann, activeN, (b - a) / activeN, currentRiemannSum, approxError, progress);

      // 7. Update HUD DOM readouts
      if (this.hudCoord) {
        this.hudCoord.innerHTML = `គោលអាំងតេក្រាល: [a = <strong>${a}</strong>, b = <strong>${b}</strong>]`;
      }
      if (this.hudSlope) {
        if (isRiemann) {
          this.hudSlope.innerHTML = `ផលបូករីម៉ាន S<sub>${activeN}</sub> = <strong>${currentRiemannSum.toFixed(3)}</strong> (ខុសគ្នា: ±${approxError.toFixed(3)})`;
        } else {
          this.hudSlope.innerHTML = `ផ្ទៃក្រឡាពិត S = <strong>7.50 ឯកតាផ្ទៃ</strong>`;
        }
      }
    }

    drawIntegralCanvasCard(ctx, w, isRiemann, N, dx, sum, error, progress) {
      const cardW = Math.min(540, w - 40);
      const cardH = 68;
      const cardX = (w - cardW) / 2;
      const cardY = 16;

      ctx.save();
      // Frosted Glass Card
      ctx.fillStyle = 'rgba(7, 13, 27, 0.88)';
      ctx.strokeStyle = isRiemann ? 'rgba(56, 189, 248, 0.4)' : 'rgba(16, 185, 129, 0.55)';
      ctx.lineWidth = 1.4;
      ctx.shadowColor = isRiemann ? 'rgba(6, 182, 212, 0.35)' : 'rgba(16, 185, 129, 0.45)';
      ctx.shadowBlur = 12;

      // Rounded rect
      if (typeof ctx.roundRect === 'function') {
        ctx.beginPath();
        ctx.roundRect(cardX, cardY, cardW, cardH, 8);
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.fillRect(cardX, cardY, cardW, cardH);
        ctx.strokeRect(cardX, cardY, cardW, cardH);
      }

      ctx.shadowBlur = 0;
      ctx.textAlign = 'center';

      if (progress < 0.25 && !this.manualRiemannN) {
        // Phase 1
        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 13px Kantumruy Pro, sans-serif';
        ctx.fillText('ជំហានទី ១៖ គូសខ្សែកោងអនុគមន៍ y = f(x) = -x² + 3x + 1', cardX + cardW / 2, cardY + 26);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '11px JetBrains Mono, monospace';
        ctx.fillText('រក្សាតម្លៃ f(x) ≥ 0 លើចន្លោះ [0, 3] សម្រាប់គណនាផ្ទៃក្រឡា', cardX + cardW / 2, cardY + 48);
      } else if (progress < 0.30 && !this.manualRiemannN) {
        // Phase 2
        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 13px Kantumruy Pro, sans-serif';
        ctx.fillText('ជំហានទី ២៖ កំណត់ព្រំដែនសងខាង x = a = 0 និង x = b = 3', cardX + cardW / 2, cardY + 26);
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '11px JetBrains Mono, monospace';
        ctx.fillText('ផ្ទៃក្រឡា A កំណត់ដោយខ្សែកោង f(x), អ័ក្ស Ox និងបន្ទាត់ឈរ x = 0, x = 3', cardX + cardW / 2, cardY + 48);
      } else if (isRiemann) {
        // Phase 3: Riemann Sums
        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 12.5px Kantumruy Pro, sans-serif';
        ctx.fillText(`🔬 ផលបូករីម៉ាន (Riemann Sums): N = ${N} ចតុកោណកែង (Δx = ${dx.toFixed(3)})`, cardX + cardW / 2, cardY + 25);

        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 12px JetBrains Mono, monospace';
        ctx.fillText(`S_${N} = Σ f(xᵢ*)Δx ≈ ${sum.toFixed(3)}  |  ផ្ទៃពិត = 7.500  (ε = ${error.toFixed(3)})`, cardX + cardW / 2, cardY + 48);
      } else {
        // Phase 4: Exact Definite Integral
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 13px Kantumruy Pro, sans-serif';
        ctx.fillText('✨ រូបមន្តអាំងតេក្រាលកំណត់ (Fundamental Theorem of Calculus)', cardX + cardW / 2, cardY + 25);

        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 12px JetBrains Mono, monospace';
        ctx.fillText('A = ∫₀³ (-x² + 3x + 1)dx = [ -x³/3 + 1.5x² + x ]₀³ = 7.500 ឯកតាផ្ទៃ', cardX + cardW / 2, cardY + 48);
      }

      ctx.restore();
    }

    drawAmbientIntegralParticles(ctx, ox, oy, s, a, b, p) {
      if (!this.ambientParticles || this.ambientParticles.length === 0) {
        this.ambientParticles = [];
        for (let i = 0; i < 28; i++) {
          this.ambientParticles.push({
            mx: a + Math.random() * (b - a),
            myRatio: Math.random() * 0.85 + 0.05,
            speedY: (Math.random() * 0.003 + 0.001),
            radius: Math.random() * 2 + 1,
            alpha: Math.random() * 0.7 + 0.3
          });
        }
      }

      ctx.save();
      for (let pt of this.ambientParticles) {
        pt.myRatio += pt.speedY;
        if (pt.myRatio > 0.95) pt.myRatio = 0.05;

        const maxH = p.f(pt.mx);
        const my = maxH * pt.myRatio;
        const px = ox + pt.mx * s;
        const py = oy - my * s;

        ctx.beginPath();
        ctx.arc(px, py, pt.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${pt.alpha * 0.6})`;
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 4;
        ctx.fill();
      }
      ctx.restore();
    }

    updateToolbarActiveButton(val) {
      if (!this.riemannButtons) return;
      this.riemannButtons.forEach(btn => {
        const btnVal = btn.getAttribute('data-riemann-n');
        if (String(btnVal) === String(val)) {
          if (val === 'exact') {
            btn.classList.add('active-gold');
            btn.classList.remove('active');
          } else {
            btn.classList.add('active');
            btn.classList.remove('active-gold');
          }
        } else {
          btn.classList.remove('active', 'active-gold');
        }
      });
    }
  }

  // Initialize studio when DOM loaded
  document.addEventListener('DOMContentLoaded', () => {
    new CurveVideoStudio();
  });
})();
