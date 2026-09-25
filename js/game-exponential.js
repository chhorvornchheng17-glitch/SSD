/**
 * game-exponential.js - Grade 11 Mathematics Educational Game Studio
 * EXPONENTIAL ODYSSEY: យានអវកាសអិចស្ប៉ូណង់ស្យែលថ្នាក់ទី ១១
 * Aligned with MoEYS Grade 11 Mathematics Textbook Part 1 (Chapter 2, Lesson 1)
 * Features:
 *   1. Canvas Exponential Curve Flight Simulator (y = a^x)
 *   2. Asteroid Equation Blaster Arcade Game
 *   3. Bacteria Doubling & Radioactive Decay Lab Simulation
 *   4. Exponential Grand Quiz Arena with 20+ KaTeX Questions & Lifelines
 *   5. Web Audio API Synthesizer (No external audio files needed)
 *   6. Combos, XP Leveling & LocalStorage Achievements
 * Teacher Chheng Chhovorn - Mathematics Platform
 */

(function () {
  'use strict';

  /* ============================================================
     1. WEB AUDIO API SYNTHESIZER
     ============================================================ */
  class SoundSynth {
    constructor() {
      this.ctx = null;
      this.muted = localStorage.getItem('cvn_exp_muted') === 'true';
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playTone(freq, type, duration, delay = 0, vol = 0.15) {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + delay);
      gain.gain.setValueAtTime(vol, this.ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + delay + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + delay);
      osc.stop(this.ctx.currentTime + delay + duration);
    }

    correct() {
      this.playTone(523.25, 'sine', 0.15, 0, 0.2); // C5
      this.playTone(659.25, 'sine', 0.15, 0.08, 0.2); // E5
      this.playTone(783.99, 'sine', 0.3, 0.16, 0.25); // G5
    }

    wrong() {
      this.playTone(180, 'sawtooth', 0.2, 0, 0.15);
      this.playTone(140, 'sawtooth', 0.3, 0.12, 0.15);
    }

    combo() {
      [523.25, 659.25, 783.99, 1046.50].forEach((f, idx) => {
        this.playTone(f, 'sine', 0.15, idx * 0.06, 0.2);
      });
    }

    laser() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    }

    explosion() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      // White noise buffer
      const bufferSize = this.ctx.sampleRate * 0.25;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
      noise.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start();
    }

    rocketThrust() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(600, this.ctx.currentTime + 0.4);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.45);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.45);
    }

    crystalCollect() {
      this.playTone(880, 'sine', 0.1, 0, 0.15);
      this.playTone(1320, 'sine', 0.2, 0.08, 0.2);
    }

    levelUp() {
      [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((f, idx) => {
        this.playTone(f, 'sine', 0.4, idx * 0.08, 0.22);
      });
    }

    toggleMute() {
      this.muted = !this.muted;
      localStorage.setItem('cvn_exp_muted', this.muted);
      return this.muted;
    }
  }

  /* ============================================================
     2. EXPONENTIAL QUESTION BANK (20+ MoEYS Curriculum Items)
     ============================================================ */
  const EXPONENTIAL_QUESTIONS = [
    {
      id: 'exp_q1',
      text: 'ចំពោះអនុគមន៍អិចស្ប៉ូណង់ស្យែល $y = a^x$ តើលក្ខខណ្ឌត្រឹមត្រូវនៃគោល $a$ គឺអ្វី?៖',
      math: 'y = a^x \\quad \\implies \\quad ?',
      options: ['$a > 0 \\text{ និង } a \\ne 1$', '$a \\in \\mathbb{R}$ ណាក៏បាន', '$a > 1$ តែមួយគត់', '$a \\ge 0$'],
      correct: 0,
      hint: 'គោលត្រូវតែវិជ្ជមាន និងខុសពី ១ ព្រោះបើ a = 1 នាំឱ្យ 1^x = 1 (អនុគមន៍ថេរ)។',
      explanation: 'និយមន័យក្នុងសៀវភៅគោល៖ អនុគមន៍អិចស្ប៉ូណង់ស្យែលគឺជាអនុគមន៍ដែលមានទម្រង់ $y = a^x$ ដែល $a$ ជាចំនួនពិតវិជ្ជមានខុសពី $1$ ($a > 0, a \\ne 1$)។'
    },
    {
      id: 'exp_q2',
      text: 'តើក្រាបនៃអនុគមន៍ $y = a^x$ ($a > 0, a \\ne 1$) កាត់តាមចំណុចថេរណាជានិច្ច?៖',
      math: '(x_0, y_0) = ?',
      options: ['(0, 1)', '(1, 0)', '(0, 0)', '(1, 1)'],
      correct: 0,
      hint: 'ជំនួស x = 0 ចូលទៅក្នុងរូបមន្ត រកមើលតម្លៃ y = a⁰។',
      explanation: 'ចំពោះគ្រប់តម្លៃ $a > 0$ យើងតែងតែមាន $a^0 = 1$។ ដូច្នេះក្រាបនៃអនុគមន៍អិចស្ប៉ូណង់ស្យែលតែងតែកាត់តាមចំណុច $(0, 1)$ ជានិច្ច។'
    },
    {
      id: 'exp_q3',
      text: 'នៅពេលគោល $a > 1$ (ឧទាហរណ៍ $y = 2^x$) តើអនុគមន៍មានទិសដៅអថេរភាពដូចម្តេច?៖',
      math: 'a > 1 \\implies f(x) = a^x \\text{ ?}',
      options: ['កើនដាច់ខាតលើ $\\mathbb{R}$', 'ចុះដាច់ខាតលើ $\\mathbb{R}$', 'ថេរស្មើ ១', 'កើនផង និងចុះផង'],
      correct: 0,
      hint: 'ពិនិត្យមើល៖ 2¹ = 2, 2² = 4, 2³ = 8... កាលណា x កើន y កើនយ៉ាងលឿន។',
      explanation: 'ចំពោះ $a > 1$ បើ $x_1 < x_2$ នោះ $a^{x_1} < a^{x_2}$ ជានិច្ច ដូច្នេះអនុគមន៍អិចស្ប៉ូណង់ស្យែលជាអនុគមន៍កើនដាច់ខាតលើ $\\mathbb{R}$។'
    },
    {
      id: 'exp_q4',
      text: 'នៅពេលគោល $0 < a < 1$ (ឧទាហរណ៍ $y = (1/2)^x$) តើអនុគមន៍មានលក្ខណៈដូចម្តេច?៖',
      math: '0 < a < 1 \\implies f(x) = a^x \\text{ ?}',
      options: ['ចុះដាច់ខាតលើ $\\mathbb{R}$', 'កើនដាច់ខាតលើ $\\mathbb{R}$', 'មានតម្លៃអវិជ្ជមាន', 'កាត់អ័ក្ស x ត្រង់ x = 1'],
      correct: 0,
      hint: '(1/2)¹ = 0.5, (1/2)² = 0.25, (1/2)³ = 0.125... កាលណា x កើន y ថយចុះ។',
      explanation: 'ចំពោះ $0 < a < 1$ បើ $x_1 < x_2$ នោះ $a^{x_1} > a^{x_2}$ ជានិច្ច ដូច្នេះអនុគមន៍ជាអនុគមន៍ចុះដាច់ខាតលើ $\\mathbb{R}$។'
    },
    {
      id: 'exp_q5',
      text: 'តើដែនកំណត់ ($D$) និងសំណុំតម្លៃ ($R$) នៃអនុគមន៍ $y = a^x$ គឺជាអ្វី?៖',
      math: 'D = ?, \\quad R = ?',
      options: ['$D = \\mathbb{R}, \\; R = (0, +\\infty)$', '$D = (0, +\\infty), \\; R = \\mathbb{R}$', '$D = [0, +\\infty), \\; R = [0, +\\infty)$', '$D = \\mathbb{R}, \\; R = \\mathbb{R}$'],
      correct: 0,
      hint: 'ស្វ័យគុណ x អាចយកតម្លៃចំនួនពិតណាក៏បាន ប៉ុន្តែ a^x តែងតែវិជ្ជមានដាច់ខាត (> 0)។',
      explanation: 'ដែនកំណត់គឺ $D = \\mathbb{R}$ (អាចគណនាបានចំពោះគ្រប់ $x \\in \\mathbb{R}$) ហើយដោយសារ $a^x > 0$ ជានិច្ច នោះសំណុំតម្លៃគឺ $R = (0, +\\infty)$។'
    },
    {
      id: 'exp_q6',
      text: 'តើបន្ទាត់អាស៊ីមតូតនៃក្រាប $y = a^x$ ($a > 0, a \\ne 1$) គឺជាបន្ទាត់ណា?៖',
      math: '\\text{Asymptote} = ?',
      options: ['អ័ក្សអាប់ស៊ីស $y = 0$ (អាស៊ីមតូតដេក)', 'អ័ក្សអរដោនេ $x = 0$ (អាស៊ីមតូតឈរ)', 'បន្ទាត់ពុះ $y = x$', 'គ្មានអាស៊ីមតូតទេ'],
      correct: 0,
      hint: 'ក្រាបខិតជិតអ័ក្ស x តែមិនដែលប៉ះ ឬកាត់អ័ក្ស x ឡើយ។',
      explanation: 'កាលណា $x \\to -\\infty$ (បើ $a > 1$) ឬ $x \\to +\\infty$ (បើ $0 < a < 1$) នោះ $a^x \\to 0$។ ដូច្នេះបន្ទាត់ $y = 0$ (អ័ក្សអាប់ស៊ីស $Ox$) ជាបន្ទាត់អាស៊ីមតូតដេកនៃក្រាប។'
    },
    {
      id: 'exp_q7',
      text: 'ដោះស្រាយសមីការអិចស្ប៉ូណង់ស្យែល៖',
      math: '2^{3x - 1} = 32',
      options: ['x = 2', 'x = 3', 'x = 1', 'x = 4'],
      correct: 0,
      hint: 'សរសេរ 32 ជាស្វ័យគុណនៃ ២៖ 32 = 2⁵។',
      explanation: '$2^{3x - 1} = 32 \\iff 2^{3x - 1} = 2^5 \\iff 3x - 1 = 5 \\iff 3x = 6 \\iff x = 2$។'
    },
    {
      id: 'exp_q8',
      text: 'ដោះស្រាយសមីការអិចស្ប៉ូណង់ស្យែល៖',
      math: '3^{x^2 - 4} = 1',
      options: ['x = \\pm 2', 'x = 2', 'x = 4', 'x = \\pm 4'],
      correct: 0,
      hint: 'ចងចាំថា 1 = 3⁰ នាំឱ្យស្វ័យគុណស្មើ 0។',
      explanation: '$3^{x^2 - 4} = 1 \\iff 3^{x^2 - 4} = 3^0 \\iff x^2 - 4 = 0 \\iff x^2 = 4 \\iff x = \\pm 2$។'
    },
    {
      id: 'exp_q9',
      text: 'ដោះស្រាយសមីការអិចស្ប៉ូណង់ស្យែលគោលប្រភាគ៖',
      math: '\\left(\\frac{1}{3}\\right)^{2x + 1} = 27',
      options: ['x = -2', 'x = 2', 'x = -1', 'x = 1'],
      correct: 0,
      hint: '(1/3) = 3⁻¹ និង 27 = 3³។',
      explanation: '$\\left(3^{-1}\\right)^{2x + 1} = 3^3 \\iff 3^{-(2x + 1)} = 3^3 \\iff -2x - 1 = 3 \\iff -2x = 4 \\iff x = -2$។'
    },
    {
      id: 'exp_q10',
      text: 'ដោះស្រាយសមីការអិចស្ប៉ូណង់ស្យែលដោយប្តូរអថេរជំនួយ៖',
      math: '4^x - 5 \\cdot 2^x + 4 = 0',
      options: ['x = 0 \\text{ ឬ } x = 2', 'x = 1 \\text{ ឬ } x = 4', 'x = 2 \\text{ តែមួយគត់}', 'x = -1 \\text{ ឬ } x = 2'],
      correct: 0,
      hint: 'តាង t = 2^x > 0 នាំឱ្យ 4^x = (2^x)² = t²។',
      explanation: 'តាង $t = 2^x > 0$ សមីការក្លាយជា $t^2 - 5t + 4 = 0 \\iff (t - 1)(t - 4) = 0$។ នាំឱ្យ $t = 1 \\implies 2^x = 1 \\implies x = 0$; $t = 4 \\implies 2^x = 4 \\implies x = 2$។'
    },
    {
      id: 'exp_q11',
      text: 'ដោះស្រាយវិសមីការអិចស្ប៉ូណង់ស្យែលដែលមានគោល $a > 1$៖',
      math: '2^{2x + 3} > 32',
      options: ['x > 1', 'x < 1', 'x > 2', 'x < 2'],
      correct: 0,
      hint: 'ដោយគោល 2 > 1 សញ្ញាវិសមភាពរក្សាដដែល។',
      explanation: '$2^{2x + 3} > 32 \\iff 2^{2x + 3} > 2^5$។ ដោយគោល $2 > 1$ នាំឱ្យ $2x + 3 > 5 \\iff 2x > 2 \\iff x > 1$។'
    },
    {
      id: 'exp_q12',
      text: 'ដោះស្រាយវិសមីការអិចស្ប៉ូណង់ស្យែលដែលមានគោល $0 < a < 1$៖',
      math: '\\left(\\frac{1}{2}\\right)^{3x - 1} \\ge \\left(\\frac{1}{2}\\right)^5',
      options: ['x \\le 2', 'x \\ge 2', 'x \\le 1', 'x \\ge 1'],
      correct: 0,
      hint: 'ប្រយ័ត្ន! ដោយគោល 1/2 < 1 សញ្ញាវិសមភាពត្រូវផ្លាស់ប្តូរទិសដៅ (≥ ទៅជា ≤)។',
      explanation: 'ដោយសារគោល $0 < \\frac{1}{2} < 1$ អនុគមន៍ចុះដាច់ខាត នាំឱ្យទិសដៅវិសមភាពប្តូរច្រាស៖ $3x - 1 \\le 5 \\iff 3x \\le 6 \\iff x \\le 2$។'
    },
    {
      id: 'exp_q13',
      text: 'ដោះស្រាយសមីការអិចស្ប៉ូណង់ស្យែលផលបូក៖',
      math: '2^{x + 2} + 2^x = 20',
      options: ['x = 2', 'x = 3', 'x = 1', 'x = 4'],
      correct: 0,
      hint: '2^{x+2} = 2^x · 2² = 4 · 2^x។',
      explanation: '$2^x \\cdot 2^2 + 2^x = 20 \\iff 4 \\cdot 2^x + 2^x = 20 \\iff 5 \\cdot 2^x = 20 \\iff 2^x = 4 \\iff x = 2$។'
    },
    {
      id: 'exp_q14',
      text: 'អាណានិគមបាក់តេរីមួយមានរូបមន្តកំណើន $N(t) = 500 \\cdot 2^{t/3}$ ($t$ គិតជាម៉ោង)។ រកចំនួនបាក់តេរីក្រោយ ៩ ម៉ោង៖',
      math: 'N(9) = ?',
      options: ['4,000', '2,000', '1,500', '8,000'],
      correct: 0,
      hint: 'ជំនួស t = 9: N(9) = 500 · 2^{9/3} = 500 · 2³។',
      explanation: '$N(9) = 500 \\cdot 2^{9/3} = 500 \\cdot 2^3 = 500 \\times 8 = 4,000$ បាក់តេរី។'
    },
    {
      id: 'exp_q15',
      text: 'សារធាតុវិទ្យុសកម្មមួយមានពាក់កណ្តាលជីវិត $T_{1/2} = 5$ ថ្ងៃ។ បើដំបូងមាន ១៦ ក្រាម តើក្រោយ ២០ ថ្ងៃនៅសល់ប៉ុន្មានក្រាម?៖',
      math: 'm(20) = 16 \\cdot \\left(\\frac{1}{2}\\right)^{20/5} = ?',
      options: ['1 \\text{ ក្រាម}', '2 \\text{ ក្រាម}', '4 \\text{ ក្រាម}', '0.5 \\text{ ក្រាម}'],
      correct: 0,
      hint: '20/5 = 4 នាំឱ្យ (1/2)⁴ = 1/16។',
      explanation: '$m(20) = 16 \\cdot \\left(\\frac{1}{2}\\right)^4 = 16 \\cdot \\frac{1}{16} = 1$ ក្រាម។'
    }
  ];

  /* ============================================================
     3. ACHIEVEMENTS & BADGES
     ============================================================ */
  const EXP_BADGES = [
    { id: 'exp_pilot', name: 'អ្នកបើកបរយានអវកាស', icon: '🚀', desc: 'ឆ្លងកាត់បេសកកម្មខ្សែកោងអិចស្ប៉ូណង់ស្យែលដំបូង' },
    { id: 'exp_blaster', name: 'ខ្មាន់កាំភ្លើងសមីការ', icon: '☄️', desc: 'បាញ់កម្ទេចអាចម៍ផ្កាយសមីការ ៥ ជាប់គ្នា' },
    { id: 'exp_biotech', name: 'អ្នកវិទ្យាសាស្ត្របាក់តេរី', icon: '🧫', desc: 'ដោះស្រាយបញ្ហាកំណើន និងពាក់កណ្តាលជីវិត' },
    { id: 'exp_streak_3', name: 'ភ្លើង Combo 3x', icon: '🔥', desc: 'ឆ្លើយត្រូវ ៣ សំណួរជាប់គ្នាក្នុងសង្វៀន Quiz' },
    { id: 'exp_math_pro', name: 'អ្នកឯកទេសវិសមីការ', icon: '📐', desc: 'ដោះស្រាយវិសមីការគោលប្រភាគ 0 < a < 1 បានត្រឹមត្រូវ' },
    { id: 'exp_champion', name: 'កំពូលបញ្ញវន្តអិចស្ប៉ូណង់ស្យែល', icon: '🏆', desc: 'សម្រេចបានពិន្ទុសរុបលើសពី 1,200 XP' }
  ];

  /* ============================================================
     4. MAIN GAME CONTROLLER
     ============================================================ */
  class ExponentialOdyssey {
    constructor() {
      this.sound = new SoundSynth();
      this.score = 0;
      this.highScore = parseInt(localStorage.getItem('cvn_exp_high_score') || '0', 10);
      this.xp = parseInt(localStorage.getItem('cvn_exp_xp') || '0', 10);
      this.lives = 3;
      this.streak = 0;
      this.unlockedBadges = JSON.parse(localStorage.getItem('cvn_exp_badges') || '[]');

      this.currentTab = 'pilot'; // pilot, blaster, lab, quiz
      this.currentBase = 2; // for pilot
      this.pilotLevel = 0;
      this.blasterWave = 1;
      this.blasterDestroyed = 0;
      this.labLevel = 0;

      // Quiz variables
      this.quizIndex = 0;
      this.quizQuestions = [...EXPONENTIAL_QUESTIONS].sort(() => Math.random() - 0.5);
      this.isAnswerLocked = false;
      this.lifelines = { fiftyFifty: true, freezeTime: true, formulaHint: true };
      this.timerInterval = null;
      this.timeLeft = 25;

      this.initDomElements();
      this.bindEvents();
      this.updateHud();
      this.renderBadges();

      // Launch default Canvas Simulator
      this.initPilotCanvas();
    }

    initDomElements() {
      // HUD
      this.scoreValEl = document.getElementById('hud-score-val');
      this.highScoreValEl = document.getElementById('hud-highscore-val');
      this.xpFillEl = document.getElementById('hud-xp-fill');
      this.xpTextEl = document.getElementById('hud-xp-text');
      this.rankTitleEl = document.getElementById('hud-rank-title');
      this.rankTagEl = document.getElementById('hud-rank-tag');
      this.comboBadgeEl = document.getElementById('hud-combo-badge');
      this.comboCountEl = document.getElementById('hud-combo-count');
      this.heartsContainer = document.getElementById('hud-hearts-container');
      this.soundBtn = document.getElementById('hud-sound-btn');
      this.soundIcon = document.getElementById('hud-sound-icon');
      this.fullscreenBtn = document.getElementById('hud-fullscreen-btn');

      // Tabs
      this.tabs = document.querySelectorAll('.game-tab-btn');
      this.views = {
        pilot: document.getElementById('view-pilot'),
        blaster: document.getElementById('view-blaster'),
        lab: document.getElementById('view-lab'),
        quiz: document.getElementById('view-quiz')
      };

      // Pilot elements
      this.pilotCanvas = document.getElementById('pilot-canvas');
      this.btnLaunchRocket = document.getElementById('btn-launch-rocket');
      this.btnResetPilot = document.getElementById('btn-reset-pilot');
      this.baseBtns = document.querySelectorAll('.base-btn');
      this.pilotMissionBadge = document.getElementById('pilot-mission-badge');
      this.pilotMissionDesc = document.getElementById('pilot-mission-desc');
      this.pilotTheoryText = document.getElementById('pilot-theory-text');

      // Blaster elements
      this.blasterCanvas = document.getElementById('blaster-canvas');
      this.laserTurretBar = document.getElementById('laser-turret-bar');
      this.blasterWaveEl = document.getElementById('blaster-wave-num');
      this.blasterDestroyedEl = document.getElementById('blaster-destroyed-num');

      // Lab elements
      this.labCanvas = document.getElementById('lab-canvas');
      this.labQuestionText = document.getElementById('lab-question-text');
      this.labFormulaDisplay = document.getElementById('lab-formula-display');
      this.labChoicesGrid = document.getElementById('lab-choices-grid');
      this.labSolutionBox = document.getElementById('lab-solution-box');
      this.labLevelNum = document.getElementById('lab-level-num');
      this.labScenarioTitle = document.getElementById('lab-scenario-title');
      this.labTimerDisplay = document.getElementById('lab-timer-display');

      // Quiz elements
      this.timerFillEl = document.getElementById('game-timer-fill');
      this.questionTextKh = document.getElementById('question-text-kh');
      this.questionMathDisplay = document.getElementById('question-math-display');
      this.optionsGrid = document.getElementById('options-grid');
      this.solutionPanel = document.getElementById('solution-panel');
      this.solutionStepsText = document.getElementById('solution-steps-text');
      this.btnNextQuestion = document.getElementById('btn-next-question');
      this.questionCounterTag = document.getElementById('question-counter-tag');
      this.btnFifty = document.getElementById('lifeline-fifty');
      this.btnFreeze = document.getElementById('lifeline-freeze');
      this.btnHint = document.getElementById('lifeline-hint');

      // Badges
      this.achievementsGrid = document.getElementById('achievements-grid');
      this.badgesCountEl = document.getElementById('badges-unlocked-count');

      // Modal
      this.modalOverlay = document.getElementById('victory-modal');
      this.modalScore = document.getElementById('modal-score');
      this.modalAccuracy = document.getElementById('modal-accuracy');
      this.modalStreak = document.getElementById('modal-streak');
      this.modalXp = document.getElementById('modal-xp');
      this.btnModalClose = document.getElementById('btn-modal-close');
      this.btnModalReplay = document.getElementById('btn-modal-replay');
      this.confettiCanvas = document.getElementById('confetti-canvas');
    }

    bindEvents() {
      // Sound button
      this.soundBtn.addEventListener('click', () => {
        const isMuted = this.sound.toggleMute();
        this.soundIcon.textContent = isMuted ? '🔇' : '🔊';
      });

      // Fullscreen
      this.fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      });

      // Tab switcher
      this.tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const mode = tab.dataset.expTab;
          this.switchTab(mode);
        });
      });

      // Pilot Controls
      this.baseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          this.baseBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.currentBase = parseFloat(btn.dataset.base);
          this.sound.playTone(440, 'triangle', 0.08);
          this.drawPilotScene();
        });
      });

      if (this.btnLaunchRocket) {
        this.btnLaunchRocket.addEventListener('click', () => this.launchRocket());
      }
      if (this.btnResetPilot) {
        this.btnResetPilot.addEventListener('click', () => {
          this.pilotLevel = (this.pilotLevel + 1) % this.pilotMissions.length;
          this.setupPilotMission();
        });
      }

      // Quiz Lifelines
      this.btnFifty.addEventListener('click', () => this.useLifelineFifty());
      this.btnFreeze.addEventListener('click', () => this.useLifelineFreeze());
      this.btnHint.addEventListener('click', () => this.useLifelineHint());
      this.btnNextQuestion.addEventListener('click', () => this.nextQuizQuestion());

      // Modal
      this.btnModalClose.addEventListener('click', () => this.modalOverlay.classList.remove('visible'));
      this.btnModalReplay.addEventListener('click', () => {
        this.modalOverlay.classList.remove('visible');
        this.resetGame();
      });
    }

    switchTab(mode) {
      this.currentTab = mode;
      this.tabs.forEach(t => t.classList.toggle('active', t.dataset.expTab === mode));
      Object.keys(this.views).forEach(key => {
        if (this.views[key]) {
          this.views[key].classList.toggle('hidden', key !== mode);
        }
      });

      this.sound.playTone(330, 'sine', 0.1);

      if (mode === 'pilot') {
        this.initPilotCanvas();
      } else if (mode === 'blaster') {
        this.initBlasterCanvas();
      } else if (mode === 'lab') {
        this.initLabSimulation();
      } else if (mode === 'quiz') {
        this.loadQuizQuestion();
      }
    }

    /* ============================================================
       5. GAME 1: EXPONENTIAL CURVE PILOT SIMULATOR
       ============================================================ */
    initPilotCanvas() {
      if (!this.pilotCanvas) return;
      this.pilotCtx = this.pilotCanvas.getContext('2d');
      const rect = this.pilotCanvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.pilotCanvas.width = rect.width * dpr;
      this.pilotCanvas.height = 480 * dpr;
      this.pilotCtx.scale(dpr, dpr);
      this.pilotLogicalW = rect.width;
      this.pilotLogicalH = 480;

      // Missions data
      this.pilotMissions = [
        {
          id: 1,
          title: 'បេសកកម្ម ១/៥៖ កំណើនអិចស្ប៉ូណង់ស្យែលទ្វេដង ($a = 2$)',
          desc: 'គោលដៅ៖ ជ្រើសរើស $a = 2$ ដើម្បីបាញ់យានអវកាសកាត់តាមគ្រីស្តាល់ $(0, 1), (1, 2), (2, 4)$!',
          expectedBase: 2,
          targets: [{ x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 4 }],
          theory: 'អនុគមន៍ $y = 2^x$ កើនទ្វេដងរៀងរាល់ $x$ កើន ១ ឯកតា។ កាត់តាម $(0, 1), (1, 2), (2, 4), (3, 8)$។'
        },
        {
          id: 2,
          title: 'បេសកកម្ម ២/៥៖ កំណើនលឿនរហ័ស ($a = 3$)',
          desc: 'គោលដៅ៖ ជ្រើសរើស $a = 3$ ដើម្បីឱ្យយានហោះកាត់គ្រីស្តាល់ $(0, 1), (1, 3), (2, 9)$!',
          expectedBase: 3,
          targets: [{ x: 0, y: 1 }, { x: 1, y: 3 }, { x: 2, y: 9 }],
          theory: 'អនុគមន៍ $y = 3^x$ កើនឡើងលឿនជាង $y = 2^x$ ពីព្រោះគោល $3 > 2$ នាំឱ្យក្រាបបញ្ឈរជាង។'
        },
        {
          id: 3,
          title: 'បេសកកម្ម ៣/៥៖ ថយចុះអិចស្ប៉ូណង់ស្យែល ($a = 1/2$)',
          desc: 'គោលដៅ៖ ជ្រើសរើស $a = 1/2$ ដើម្បីឱ្យយានហោះរំកិលចុះថ្នមៗកាត់ $(-2, 4), (-1, 2), (0, 1), (1, 0.5)$!',
          expectedBase: 0.5,
          targets: [{ x: -2, y: 4 }, { x: -1, y: 2 }, { x: 0, y: 1 }, { x: 1, y: 0.5 }],
          theory: 'ដោយសារគោល $0 < a = 1/2 < 1$ អនុគមន៍ចុះដាច់ខាតលើ $\\mathbb{R}$ ហើយខិតជិតអាស៊ីមតូត $y = 0$ ពេល $x \\to +\\infty$។'
        },
        {
          id: 4,
          title: 'បេសកកម្ម ៤/៥៖ កំណើនកំពូល ($a = 4$)',
          desc: 'គោលដៅ៖ ជ្រើសរើស $a = 4$ ដើម្បីឱ្យយានស្ទុះហោះកាត់ $(0, 1), (1, 4), (2, 16)$!',
          expectedBase: 4,
          targets: [{ x: 0, y: 1 }, { x: 1, y: 4 }, { x: 2, y: 16 }],
          theory: 'ស្វ័យគុណនៃ ៤ កើនឡើងយ៉ាងគំហុក! ចំណុច $(1, 4)$ និង $(2, 16)$។'
        },
        {
          id: 5,
          title: 'បេសកកម្ម ៥/៥៖ ថយចុះយ៉ាងលឿន ($a = 1/3$)',
          desc: 'គោលដៅ៖ ជ្រើសរើស $a = 1/3$ ដើម្បីរាវរកចំណុច $(-1, 3), (0, 1), (1, 0.33)$!',
          expectedBase: 0.33,
          targets: [{ x: -1, y: 3 }, { x: 0, y: 1 }, { x: 1, y: 0.33 }],
          theory: 'អនុគមន៍ $y = (1/3)^x = 3^{-x}$ ឆ្លុះគ្នានឹង $y = 3^x$ ធៀបនឹងអ័ក្សអរដោនេ $Oy$។'
        }
      ];

      this.rocketAnim = { active: false, x: -4, collected: [] };
      this.setupPilotMission();
    }

    setupPilotMission() {
      const mission = this.pilotMissions[this.pilotLevel];
      if (this.pilotMissionBadge) this.pilotMissionBadge.textContent = `បេសកកម្ម ${this.pilotLevel + 1}/${this.pilotMissions.length}`;
      if (this.pilotMissionDesc) this.pilotMissionDesc.textContent = mission.desc;
      if (this.pilotTheoryText) this.pilotTheoryText.textContent = mission.theory;
      this.rocketAnim = { active: false, x: -4, collected: [] };
      this.drawPilotScene();
    }

    drawPilotScene() {
      const ctx = this.pilotCtx;
      const w = this.pilotLogicalW;
      const h = this.pilotLogicalH;
      const cx = w * 0.45;
      const cy = h * 0.72;
      const unitX = 70; // 70px per unit of x
      const unitY = 32; // 32px per unit of y

      ctx.clearRect(0, 0, w, h);

      // Deep space starry background
      ctx.fillStyle = '#060a14';
      ctx.fillRect(0, 0, w, h);

      // Cosmic stars
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      for (let i = 0; i < 60; i++) {
        const sx = ((i * 137) % w);
        const sy = ((i * 229) % h);
        const r = (i % 3 === 0) ? 1.5 : 1;
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Coordinate Grid Lines
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.lineWidth = 1;
      for (let x = cx % unitX; x < w; x += unitX) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = cy % unitY; y < h; y += unitY) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      // Main Axes X and Y
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
      ctx.lineWidth = 2;
      // Axis X
      ctx.beginPath(); ctx.moveTo(30, cy); ctx.lineTo(w - 30, cy); ctx.stroke();
      // Axis Y
      ctx.beginPath(); ctx.moveTo(cx, 20); ctx.lineTo(cx, h - 20); ctx.stroke();

      // Axis Labels
      ctx.fillStyle = '#94a3b8';
      ctx.font = '600 12px sans-serif';
      ctx.textAlign = 'center';
      for (let i = -4; i <= 6; i++) {
        if (i !== 0) {
          ctx.fillText(i, cx + i * unitX, cy + 18);
        }
      }
      ctx.fillText('0', cx - 12, cy + 16);
      ctx.fillText('X', w - 18, cy - 8);
      ctx.fillText('Y', cx + 16, 26);

      // Asymptote indicator (y = 0)
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.45)';
      ctx.setLineDash([6, 6]);
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(30, cy); ctx.lineTo(w - 30, cy); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#f43f5e';
      ctx.font = '500 11px sans-serif';
      ctx.fillText('អាស៊ីមតូតដេក: y = 0', cx + 180, cy + 16);

      // Draw the Exponential Curve y = a^x
      const a = this.currentBase;
      ctx.strokeStyle = a > 1 ? '#06b6d4' : '#f59e0b';
      ctx.lineWidth = 3.5;
      ctx.shadowColor = a > 1 ? 'rgba(6, 182, 212, 0.6)' : 'rgba(245, 158, 11, 0.6)';
      ctx.shadowBlur = 12;
      ctx.beginPath();

      let started = false;
      for (let px = 30; px <= w - 30; px += 2) {
        const xVal = (px - cx) / unitX;
        const yVal = Math.pow(a, xVal);
        const py = cy - yVal * unitY;

        if (py >= 10 && py <= h - 10) {
          if (!started) {
            ctx.moveTo(px, py);
            started = true;
          } else {
            ctx.lineTo(px, py);
          }
        }
      }
      ctx.stroke();
      ctx.shadowBlur = 0; // reset shadow

      // Formula Tag above curve
      ctx.fillStyle = a > 1 ? '#38bdf8' : '#fbbf24';
      ctx.font = '700 15px var(--font-math), sans-serif';
      ctx.fillText(`y = ${a}^x`, cx + (a > 1 ? 130 : -130), cy - 140);

      // Draw Mission Target Crystals
      const mission = this.pilotMissions[this.pilotLevel];
      mission.targets.forEach((tgt, idx) => {
        const tx = cx + tgt.x * unitX;
        const ty = cy - tgt.y * unitY;
        const collected = this.rocketAnim.collected.includes(idx);

        // Crystal glow
        ctx.fillStyle = collected ? '#10b981' : '#ec4899';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        // Diamond crystal shape
        ctx.moveTo(tx, ty - 12);
        ctx.lineTo(tx + 10, ty);
        ctx.lineTo(tx, ty + 12);
        ctx.lineTo(tx - 10, ty);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Target point label
        ctx.fillStyle = '#ffffff';
        ctx.font = '600 11px sans-serif';
        ctx.fillText(`(${tgt.x}, ${tgt.y})`, tx, ty - 18);
      });

      // Draw Rocket Spacecraft
      if (this.rocketAnim.active) {
        const rx = cx + this.rocketAnim.x * unitX;
        const ry = cy - Math.pow(a, this.rocketAnim.x) * unitY;

        // Draw Rocket Body
        ctx.save();
        ctx.translate(rx, ry);
        const slope = Math.pow(a, this.rocketAnim.x) * Math.log(a);
        const angle = -Math.atan(slope * (unitY / unitX));
        ctx.rotate(angle);

        // Flame thrust
        ctx.fillStyle = '#f97316';
        ctx.beginPath();
        ctx.moveTo(-16, -4);
        ctx.lineTo(-28 + Math.random() * 6, 0);
        ctx.lineTo(-16, 4);
        ctx.fill();

        // Hull
        ctx.fillStyle = '#f8fafc';
        ctx.beginPath();
        ctx.ellipse(0, 0, 16, 7, 0, 0, Math.PI * 2);
        ctx.fill();

        // Cockpit window
        ctx.fillStyle = '#0284c7';
        ctx.beginPath();
        ctx.arc(4, 0, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    launchRocket() {
      if (this.rocketAnim.active) return;
      this.sound.rocketThrust();
      this.rocketAnim = { active: true, x: -3.5, collected: [] };

      const mission = this.pilotMissions[this.pilotLevel];
      const step = 0.08;

      const loop = () => {
        this.rocketAnim.x += step;
        const a = this.currentBase;
        const currentY = Math.pow(a, this.rocketAnim.x);

        // Check target crystal collections
        mission.targets.forEach((tgt, idx) => {
          if (!this.rocketAnim.collected.includes(idx)) {
            const dx = Math.abs(this.rocketAnim.x - tgt.x);
            const dy = Math.abs(currentY - tgt.y);
            if (dx < 0.25 && dy < 0.8) {
              this.rocketAnim.collected.push(idx);
              this.sound.crystalCollect();
              this.score += 50;
              this.xp += 20;
              this.updateHud();
            }
          }
        });

        this.drawPilotScene();

        if (this.rocketAnim.x < 3.2 && currentY < 25) {
          requestAnimationFrame(loop);
        } else {
          this.rocketAnim.active = false;
          // Check mission outcome
          if (this.rocketAnim.collected.length === mission.targets.length) {
            this.sound.correct();
            this.score += 150;
            this.xp += 50;
            this.unlockBadge('exp_pilot');
            this.updateHud();
            alert(`🎉 អបអរសាទរ! អ្នកបានជ្រើសរើស $a = ${this.currentBase}$ ត្រឹមត្រូវ និងប្រមូលគ្រីស្តាល់បាន ១០០%! +២០០ ពិន្ទុ!`);
            this.pilotLevel = (this.pilotLevel + 1) % this.pilotMissions.length;
            this.setupPilotMission();
          } else {
            this.sound.wrong();
            alert(`⚠️ មិនទាន់គ្រប់គ្រាន់ទេ! គ្រីស្តាល់ប្រមូលបានតែ ${this.rocketAnim.collected.length}/${mission.targets.length}។ សូមពិនិត្យមើលតម្លៃ $a$ ម្តងទៀត!`);
          }
        }
      };

      loop();
    }

    /* ============================================================
     6. GAME 2: ASTEROID EQUATION BLASTER (ARCADE)
     ============================================================ */
    initBlasterCanvas() {
      if (!this.blasterCanvas) return;
      this.blasterCtx = this.blasterCanvas.getContext('2d');
      const rect = this.blasterCanvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.blasterCanvas.width = rect.width * dpr;
      this.blasterCanvas.height = 420 * dpr;
      this.blasterCtx.scale(dpr, dpr);
      this.blasterLogicalW = rect.width;
      this.blasterLogicalH = 420;

      // Asteroid pool
      this.blasterEquations = [
        { eq: '2^x = 8', ans: 3, latex: '2^x = 8 \\implies x = 3' },
        { eq: '3^{2x - 1} = 27', ans: 2, latex: '3^{2x-1} = 3^3 \\implies x = 2' },
        { eq: '5^{x + 1} = 125', ans: 2, latex: '5^{x+1} = 5^3 \\implies x = 2' },
        { eq: '2^{x + 2} = 16', ans: 2, latex: '2^{x+2} = 2^4 \\implies x = 2' },
        { eq: '(1/2)^x = 8', ans: -3, latex: '(1/2)^x = 2^{-x} = 2^3 \\implies x = -3' },
        { eq: '4^x = 64', ans: 3, latex: '4^x = 4^3 \\implies x = 3' },
        { eq: '3^x = 81', ans: 4, latex: '3^x = 3^4 \\implies x = 4' },
        { eq: '7^{2x} = 49', ans: 1, latex: '7^{2x} = 7^2 \\implies x = 1' },
        { eq: '10^x = 1000', ans: 3, latex: '10^x = 10^3 \\implies x = 3' },
        { eq: '5^{x - 2} = 1', ans: 2, latex: '5^{x-2} = 5^0 \\implies x = 2' }
      ];

      this.currentAsteroid = null;
      this.laserBeam = null;
      this.blasterActive = true;

      this.spawnAsteroid();
      this.renderTurretButtons();
      this.runBlasterLoop();
    }

    spawnAsteroid() {
      const eqItem = this.blasterEquations[Math.floor(Math.random() * this.blasterEquations.length)];
      this.currentAsteroid = {
        eq: eqItem.eq,
        ans: eqItem.ans,
        x: this.blasterLogicalW * 0.2 + Math.random() * (this.blasterLogicalW * 0.6),
        y: -40,
        speed: 0.65 + this.blasterWave * 0.15,
        radius: 38
      };
    }

    renderTurretButtons() {
      if (!this.laserTurretBar) return;
      const choices = [-3, -2, -1, 1, 2, 3, 4];
      this.laserTurretBar.innerHTML = choices.map(val => `
        <button class="turret-btn" data-val="${val}">
          x = ${val}
        </button>
      `).join('');

      this.laserTurretBar.querySelectorAll('.turret-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const val = parseInt(btn.dataset.val, 10);
          this.fireLaser(val);
        });
      });
    }

    fireLaser(val) {
      if (!this.currentAsteroid) return;
      this.sound.laser();

      const gunX = this.blasterLogicalW / 2;
      const gunY = this.blasterLogicalH - 25;
      this.laserBeam = { fromX: gunX, fromY: gunY, toX: this.currentAsteroid.x, toY: this.currentAsteroid.y, alpha: 1 };

      if (val === this.currentAsteroid.ans) {
        // Hit!
        setTimeout(() => {
          this.sound.explosion();
          this.score += 100;
          this.xp += 30;
          this.streak++;
          this.blasterDestroyed++;
          if (this.blasterDestroyedEl) this.blasterDestroyedEl.textContent = this.blasterDestroyed;

          if (this.streak >= 3) {
            this.sound.combo();
            this.unlockBadge('exp_blaster');
          }
          this.updateHud();
          this.spawnAsteroid();
        }, 120);
      } else {
        // Miss!
        this.sound.wrong();
        this.streak = 0;
        this.updateHud();
      }
    }

    runBlasterLoop() {
      if (this.currentTab !== 'blaster') return;
      const ctx = this.blasterCtx;
      const w = this.blasterLogicalW;
      const h = this.blasterLogicalH;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#060a14';
      ctx.fillRect(0, 0, w, h);

      // Starfield
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let i = 0; i < 40; i++) {
        ctx.fillRect((i * 97) % w, (i * 173) % h, 1.5, 1.5);
      }

      // Draw Planetary Shield Line
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(0, h - 30);
      ctx.lineTo(w, h - 30);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw Laser Turret Base
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(w / 2, h - 25, 22, Math.PI, 0);
      ctx.fill();
      ctx.stroke();

      // Laser Cannon Barrel
      if (this.currentAsteroid) {
        const dx = this.currentAsteroid.x - (w / 2);
        const dy = this.currentAsteroid.y - (h - 25);
        const angle = Math.atan2(dy, dx);
        ctx.save();
        ctx.translate(w / 2, h - 25);
        ctx.rotate(angle);
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(0, -5, 28, 10);
        ctx.restore();
      }

      // Draw Laser Beam
      if (this.laserBeam && this.laserBeam.alpha > 0) {
        ctx.strokeStyle = `rgba(251, 191, 36, ${this.laserBeam.alpha})`;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(this.laserBeam.fromX, this.laserBeam.fromY);
        ctx.lineTo(this.laserBeam.toX, this.laserBeam.toY);
        ctx.stroke();
        this.laserBeam.alpha -= 0.15;
      }

      // Draw Falling Asteroid
      if (this.currentAsteroid) {
        this.currentAsteroid.y += this.currentAsteroid.speed;

        const ast = this.currentAsteroid;
        ctx.save();
        ctx.translate(ast.x, ast.y);

        // Asteroid Rock Body
        ctx.fillStyle = '#475569';
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(0, 0, ast.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Equation Text
        ctx.fillStyle = '#fbbf24';
        ctx.font = '700 15px var(--font-math), sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(ast.eq, 0, 0);

        ctx.restore();

        // Collision with shield
        if (ast.y >= h - 40) {
          this.sound.explosion();
          this.lives--;
          this.streak = 0;
          this.updateHud();
          if (this.lives <= 0) {
            alert('💥 របាំងការពារត្រូវបានបំផ្លាញ! ចប់ការប្រកួត!');
            this.finishMatch();
          } else {
            this.spawnAsteroid();
          }
        }
      }

      requestAnimationFrame(() => this.runBlasterLoop());
    }

    /* ============================================================
     7. GAME 3: BACTERIA GROWTH & DECAY LAB
     ============================================================ */
    initLabSimulation() {
      this.labScenarios = [
        {
          title: '🔬 អាណានិគមបាក់តេរី (Bacteria Doubling)',
          timeText: '⏱️ ពេលវេលា: t = 60 នាទី',
          question: 'បាក់តេរីមួយប្រភេទកើនឡើងទ្វេដងរៀងរាល់ ២០ នាទីម្តង ($N(t) = N_0 \\cdot 2^{t/20}$)។ បើដំបូងមានបាក់តេរី $N_0 = 100$ កោសិកា តើក្រោយពេល ១ ម៉ោង (៦០ នាទី) នឹងមានបាក់តេរីចំនួនប៉ុន្មាន? ($N(60) = 100 \\cdot 2^3$)',
          formula: '$$N(60) = 100 \\cdot 2^{60/20} = 100 \\cdot 2^3 = ?$$',
          choices: ['800 កោសិកា', '600 កោសិកា', '400 កោសិកា', '1,600 កោសិកា'],
          correct: 0,
          explanation: 'ជំហានគណនា៖ $60/20 = 3$ ដងនៃការកើនឡើង។ $N(60) = 100 \\times 2^3 = 100 \\times 8 = 800$ កោសិកា។',
          mode: 'bacteria'
        },
        {
          title: '☢️ ពាក់កណ្តាលជីវិតនៃវិទ្យុសកម្ម (Radioactive Half-Life)',
          timeText: '⏱️ ពេលវេលា: t = 30 ថ្ងៃ',
          question: 'សារធាតុអ៊ីយ៉ូតវិទ្យុសកម្មមានពាក់កណ្តាលជីវិត $T_{1/2} = 10$ ថ្ងៃ ($m(t) = m_0 \\left(\\frac{1}{2}\\right)^{t/10}$)។ បើដំបូងមាន $m_0 = 80$ ក្រាម តើក្រោយ ៣០ ថ្ងៃនៅសល់ប៉ុន្មានក្រាម? ($m(30) = 80 \\cdot (1/2)^3$)',
          formula: '$$m(30) = 80 \\cdot \\left(\\frac{1}{2}\\right)^{30/10} = 80 \\cdot \\left(\\frac{1}{2}\\right)^3 = ?$$',
          choices: ['10 ក្រាម', '20 ក្រាម', '5 ក្រាម', '40 ក្រាម'],
          correct: 0,
          explanation: 'ជំហានគណនា៖ $30/10 = 3$ ដងនៃពាក់កណ្តាលជីវិត។ $m(30) = 80 \\times (1/8) = 10$ ក្រាម។',
          mode: 'decay'
        },
        {
          title: '📈 ការប្រាក់គរជង់ (Compound Interest Growth)',
          timeText: '⏱️ ពេលវេលា: t = 2 ឆ្នាំ',
          question: 'ការវិនិយោគទុន $P = 1,000\\$$ ទទួលបានអត្រាការប្រាក់ $10\\%$ ក្នុងមួយឆ្នាំតាមរូបមន្ត $A(t) = P \\cdot (1 + r)^t = 1000 \\cdot (1.1)^t$។ តើក្រោយ ២ ឆ្នាំទទួលបានទឹកប្រាក់សរុបប៉ុន្មាន?',
          formula: '$$A(2) = 1000 \\cdot (1.1)^2 = 1000 \\cdot 1.21 = ?$$',
          choices: ['1,210 $', '1,200 $', '1,100 $', '1,400 $'],
          correct: 0,
          explanation: 'ជំហានគណនា៖ $(1.1)^2 = 1.21$។ $A(2) = 1000 \\times 1.21 = 1,210\\$$។',
          mode: 'interest'
        }
      ];

      this.renderLabStage();
      this.animateLabCells();
    }

    renderLabStage() {
      const item = this.labScenarios[this.labLevel];
      if (this.labScenarioTitle) this.labScenarioTitle.textContent = item.title;
      if (this.labTimerDisplay) this.labTimerDisplay.textContent = item.timeText;
      if (this.labQuestionText) this.labQuestionText.innerHTML = item.question;
      if (this.labFormulaDisplay) this.labFormulaDisplay.innerHTML = item.formula;
      if (this.labLevelNum) this.labLevelNum.textContent = `${this.labLevel + 1}/${this.labScenarios.length}`;
      if (this.labSolutionBox) this.labSolutionBox.style.display = 'none';

      // Render math
      if (window.renderMathInElement) {
        window.renderMathInElement(this.labQuestionText, { delimiters: [{ left: '$', right: '$', display: false }] });
        window.renderMathInElement(this.labFormulaDisplay, { delimiters: [{ left: '$$', right: '$$', display: true }] });
      }

      // Render choices
      if (this.labChoicesGrid) {
        this.labChoicesGrid.innerHTML = item.choices.map((c, idx) => `
          <button class="btn btn-secondary" data-choice="${idx}" style="padding: 0.75rem 1rem; font-weight: 700; font-size: 0.95rem;">
            ${c}
          </button>
        `).join('');

        this.labChoicesGrid.querySelectorAll('button').forEach(btn => {
          btn.addEventListener('click', () => {
            const ch = parseInt(btn.dataset.choice, 10);
            this.handleLabChoice(ch);
          });
        });
      }
    }

    handleLabChoice(ch) {
      const item = this.labScenarios[this.labLevel];
      const buttons = this.labChoicesGrid.querySelectorAll('button');
      buttons.forEach(b => b.disabled = true);

      if (ch === item.correct) {
        this.sound.correct();
        buttons[ch].style.background = '#10b981';
        buttons[ch].style.borderColor = '#10b981';
        this.score += 150;
        this.xp += 60;
        this.unlockBadge('exp_biotech');
        this.updateHud();

        if (this.labSolutionBox) {
          this.labSolutionBox.style.display = 'block';
          this.labSolutionBox.innerHTML = `<strong>✅ ត្រឹមត្រូវល្អណាស់!</strong><br>${item.explanation}`;
        }

        setTimeout(() => {
          this.labLevel = (this.labLevel + 1) % this.labScenarios.length;
          this.renderLabStage();
        }, 2500);
      } else {
        this.sound.wrong();
        buttons[ch].style.background = '#ef4444';
        buttons[ch].style.borderColor = '#ef4444';
        buttons[item.correct].style.background = '#10b981';
        if (this.labSolutionBox) {
          this.labSolutionBox.style.display = 'block';
          this.labSolutionBox.innerHTML = `<strong>❌ មិនទាន់ត្រឹមត្រូវទេ!</strong><br>${item.explanation}`;
        }
      }
    }

    animateLabCells() {
      if (!this.labCanvas) return;
      const ctx = this.labCanvas.getContext('2d');
      const w = this.labCanvas.width = this.labCanvas.parentElement.offsetWidth;
      const h = this.labCanvas.height = 280;

      const cells = [];
      for (let i = 0; i < 24; i++) {
        cells.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 6 + Math.random() * 8,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          color: i % 2 === 0 ? '#10b981' : '#38bdf8'
        });
      }

      const loop = () => {
        if (this.currentTab !== 'lab') return;
        ctx.clearRect(0, 0, w, h);

        cells.forEach(c => {
          c.x += c.vx;
          c.y += c.vy;
          if (c.x < 15 || c.x > w - 15) c.vx *= -1;
          if (c.y < 15 || c.y > h - 15) c.vy *= -1;

          ctx.fillStyle = c.color;
          ctx.beginPath();
          ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        });

        requestAnimationFrame(loop);
      };
      loop();
    }

    /* ============================================================
     8. GAME 4: EXPONENTIAL GRAND QUIZ ARENA
     ============================================================ */
    loadQuizQuestion() {
      if (this.quizIndex >= this.quizQuestions.length) {
        this.finishMatch();
        return;
      }

      this.isAnswerLocked = false;
      this.currentQuizQ = this.quizQuestions[this.quizIndex];
      const q = this.currentQuizQ;

      if (this.questionCounterTag) {
        this.questionCounterTag.textContent = `សំណួរ ${this.quizIndex + 1} / ${this.quizQuestions.length}`;
      }
      if (this.questionTextKh) {
        this.questionTextKh.textContent = q.text;
      }
      if (this.questionMathDisplay) {
        this.questionMathDisplay.innerHTML = `$${q.math}$`;
      }
      if (this.solutionPanel) {
        this.solutionPanel.classList.remove('visible');
      }

      // Render 4 options
      if (this.optionsGrid) {
        this.optionsGrid.innerHTML = q.options.map((opt, idx) => `
          <button class="option-btn" data-opt-idx="${idx}">
            <span class="option-letter">${String.fromCharCode(65 + idx)}</span>
            <span class="option-math">$${opt}$</span>
          </button>
        `).join('');

        this.optionsGrid.querySelectorAll('.option-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.optIdx, 10);
            this.handleQuizAnswer(idx);
          });
        });
      }

      // Render KaTeX Math
      if (window.renderMathInElement) {
        try {
          window.renderMathInElement(this.questionTextKh, { delimiters: [{ left: '$', right: '$', display: false }] });
          window.renderMathInElement(this.questionMathDisplay, { delimiters: [{ left: '$', right: '$', display: false }] });
          window.renderMathInElement(this.optionsGrid, { delimiters: [{ left: '$', right: '$', display: false }] });
        } catch (e) {}
      }

      this.startQuizTimer();
    }

    startQuizTimer() {
      clearInterval(this.timerInterval);
      this.timeLeft = 25;
      if (this.timerFillEl) this.timerFillEl.style.width = '100%';

      this.timerInterval = setInterval(() => {
        this.timeLeft -= 0.1;
        const pct = Math.max(0, (this.timeLeft / 25) * 100);
        if (this.timerFillEl) this.timerFillEl.style.width = `${pct}%`;

        if (this.timeLeft <= 0) {
          clearInterval(this.timerInterval);
          this.handleQuizAnswer(-1); // Timeout
        }
      }, 100);
    }

    handleQuizAnswer(idx) {
      if (this.isAnswerLocked) return;
      this.isAnswerLocked = true;
      clearInterval(this.timerInterval);

      const q = this.currentQuizQ;
      const buttons = this.optionsGrid.querySelectorAll('.option-btn');

      if (idx === q.correct) {
        // Correct
        this.sound.correct();
        if (buttons[idx]) buttons[idx].classList.add('correct');
        this.score += 100 + Math.round(this.timeLeft * 3);
        this.xp += 25;
        this.streak++;

        if (this.streak >= 3) {
          this.sound.combo();
          this.unlockBadge('exp_streak_3');
        }
        if (q.id === 'exp_q12') {
          this.unlockBadge('exp_math_pro');
        }
      } else {
        // Wrong or timeout
        this.sound.wrong();
        if (idx >= 0 && buttons[idx]) buttons[idx].classList.add('wrong');
        if (buttons[q.correct]) buttons[q.correct].classList.add('correct');
        this.lives--;
        this.streak = 0;
      }

      this.updateHud();

      // Show Solution Breakdown
      if (this.solutionPanel && this.solutionStepsText) {
        this.solutionStepsText.innerHTML = `
          <p style="font-size: 0.95rem; line-height: 1.6; color: #f1f5f9;">
            ${q.explanation}
          </p>
        `;
        if (window.renderMathInElement) {
          try {
            window.renderMathInElement(this.solutionStepsText, {
              delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false }
              ]
            });
          } catch (e) {}
        }
        this.solutionPanel.classList.add('visible');
      }

      if (this.lives <= 0) {
        setTimeout(() => this.finishMatch(), 2000);
      }
    }

    nextQuizQuestion() {
      this.quizIndex++;
      this.loadQuizQuestion();
    }

    useLifelineFifty() {
      if (!this.lifelines.fiftyFifty || this.isAnswerLocked) return;
      this.lifelines.fiftyFifty = false;
      this.btnFifty.disabled = true;
      this.sound.playTone(660, 'sine', 0.2);

      const q = this.currentQuizQ;
      const buttons = Array.from(this.optionsGrid.querySelectorAll('.option-btn'));
      const wrongIndices = [0, 1, 2, 3].filter(i => i !== q.correct).sort(() => Math.random() - 0.5);

      wrongIndices.slice(0, 2).forEach(idx => {
        if (buttons[idx]) {
          buttons[idx].classList.add('eliminated');
          buttons[idx].disabled = true;
        }
      });
    }

    useLifelineFreeze() {
      if (!this.lifelines.freezeTime || this.isAnswerLocked) return;
      this.lifelines.freezeTime = false;
      this.btnFreeze.disabled = true;
      this.sound.playTone(770, 'sine', 0.2);
      this.timeLeft = Math.min(25, this.timeLeft + 15);
    }

    useLifelineHint() {
      if (!this.lifelines.formulaHint || this.isAnswerLocked) return;
      this.lifelines.formulaHint = false;
      this.btnHint.disabled = true;
      this.sound.playTone(880, 'sine', 0.2);
      alert(`📜 គន្លឹះរូបមន្តសម្ងាត់៖\n${this.currentQuizQ.hint}`);
    }

    /* ============================================================
     9. HUD, STATS & ACHIEVEMENTS
     ============================================================ */
    updateHud() {
      if (this.scoreValEl) this.scoreValEl.textContent = this.score.toLocaleString();
      if (this.highScoreValEl) this.highScoreValEl.textContent = this.highScore.toLocaleString();

      // XP Progress (Level up every 500 XP)
      const currentLevel = Math.floor(this.xp / 500) + 1;
      const xpInLevel = this.xp % 500;
      const xpPct = (xpInLevel / 500) * 100;

      if (this.xpFillEl) this.xpFillEl.style.width = `${xpPct}%`;
      if (this.xpTextEl) this.xpTextEl.textContent = `${this.xp} XP / ${currentLevel * 500} XP`;
      if (this.rankTagEl) this.rankTagEl.textContent = `កម្រិត ${currentLevel}`;

      if (this.xp >= 1200) {
        this.unlockBadge('exp_champion');
      }

      // Combo badge
      if (this.comboBadgeEl && this.comboCountEl) {
        if (this.streak >= 2) {
          this.comboBadgeEl.classList.remove('hidden');
          this.comboCountEl.textContent = `${this.streak}x`;
        } else {
          this.comboBadgeEl.classList.add('hidden');
        }
      }

      // Lives
      if (this.heartsContainer) {
        let heartsHtml = '';
        for (let i = 0; i < 3; i++) {
          heartsHtml += i < this.lives ? '❤️' : '🖤';
        }
        this.heartsContainer.innerHTML = heartsHtml;
      }

      // Save
      localStorage.setItem('cvn_exp_xp', this.xp);
      if (this.score > this.highScore) {
        this.highScore = this.score;
        localStorage.setItem('cvn_exp_high_score', this.highScore);
      }
    }

    unlockBadge(badgeId) {
      if (!this.unlockedBadges.includes(badgeId)) {
        this.unlockedBadges.push(badgeId);
        localStorage.setItem('cvn_exp_badges', JSON.stringify(this.unlockedBadges));
        this.sound.levelUp();
        this.renderBadges();
      }
    }

    renderBadges() {
      if (!this.achievementsGrid) return;
      this.achievementsGrid.innerHTML = EXP_BADGES.map(b => {
        const isUnlocked = this.unlockedBadges.includes(b.id);
        return `
          <div class="badge-card ${isUnlocked ? 'unlocked' : 'locked'}">
            <div class="badge-card-icon">${b.icon}</div>
            <div class="badge-card-name">${b.name}</div>
            <div class="badge-card-desc">${b.desc}</div>
          </div>
        `;
      }).join('');

      if (this.badgesCountEl) {
        this.badgesCountEl.textContent = `បានដោះសោ ${this.unlockedBadges.length} / ${EXP_BADGES.length}`;
      }
    }

    finishMatch() {
      clearInterval(this.timerInterval);
      if (this.modalScore) this.modalScore.textContent = this.score.toLocaleString();
      if (this.modalAccuracy) this.modalAccuracy.textContent = `${Math.min(100, Math.round((this.score / 600) * 100))}%`;
      if (this.modalStreak) this.modalStreak.textContent = `${this.streak}x`;
      if (this.modalXp) this.modalXp.textContent = `+${Math.round(this.score * 0.35)} XP`;

      if (this.modalOverlay) {
        this.modalOverlay.classList.add('visible');
        this.startConfetti();
      }
    }

    startConfetti() {
      if (!this.confettiCanvas) return;
      const ctx = this.confettiCanvas.getContext('2d');
      const w = this.confettiCanvas.width = this.confettiCanvas.parentElement.offsetWidth;
      const h = this.confettiCanvas.height = this.confettiCanvas.parentElement.offsetHeight;

      const particles = [];
      const colors = ['#06b6d4', '#38bdf8', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];
      for (let i = 0; i < 60; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h - h,
          size: Math.random() * 6 + 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (Math.random() - 0.5) * 3,
          vy: Math.random() * 3 + 2,
          rot: Math.random() * 360,
          vRot: (Math.random() - 0.5) * 5
        });
      }

      const loop = () => {
        if (!this.modalOverlay.classList.contains('visible')) return;
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.rot += p.vRot;
          if (p.y > h) p.y = -10;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rot * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        });
        requestAnimationFrame(loop);
      };
      loop();
    }

    resetGame() {
      this.score = 0;
      this.lives = 3;
      this.streak = 0;
      this.quizIndex = 0;
      this.quizQuestions.sort(() => Math.random() - 0.5);
      this.updateHud();
      this.switchTab('pilot');
    }
  }

  // Initialize game on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    window.exponentialOdyssey = new ExponentialOdyssey();
  });
})();
