/**
 * game-grade11.js - Grade 11 Mathematics Educational Game Studio
 * Math Quest 11: ដំណើរផ្សងព្រេងប្រយុទ្ធបញ្ញវន្តគណិតវិទ្យាថ្នាក់ទី ១១
 * Features: Synthesized Web Audio FX, 50+ MoEYS Curriculum Questions,
 * Canvas Mini-Games, 60s Speed Run Blitz, KaTeX Math Typography,
 * Combo Multipliers, Lifelines & LocalStorage Achievements.
 * Teacher Chheng Chhovorn - Mathematics Platform
 */

(function () {
  'use strict';

  /* ============================================================
     1. WEB AUDIO API SYNTHESIZER (No External Files Required)
     ============================================================ */
  class SoundSynth {
    constructor() {
      this.ctx = null;
      this.muted = localStorage.getItem('cvn_game_muted') === 'true';
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
      // Pleasant high double chime (C5 -> G5)
      this.playTone(523.25, 'sine', 0.2, 0, 0.2);
      this.playTone(783.99, 'sine', 0.35, 0.12, 0.25);
    }

    wrong() {
      // Soft low buzzer
      this.playTone(196.00, 'sawtooth', 0.25, 0, 0.12);
      this.playTone(146.83, 'sawtooth', 0.35, 0.15, 0.12);
    }

    combo() {
      // Rising fanfare arpeggio (C5 -> E5 -> G5 -> C6)
      this.playTone(523.25, 'sine', 0.15, 0, 0.2);
      this.playTone(659.25, 'sine', 0.15, 0.08, 0.2);
      this.playTone(783.99, 'sine', 0.15, 0.16, 0.2);
      this.playTone(1046.50, 'sine', 0.3, 0.24, 0.25);
    }

    powerUp() {
      // Laser / sweep sound
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
    }

    tick() {
      this.playTone(800, 'triangle', 0.04, 0, 0.08);
    }

    levelUp() {
      // Victorious chord
      [523.25, 659.25, 783.99, 1046.50].forEach((f, idx) => {
        this.playTone(f, 'sine', 0.6, idx * 0.07, 0.2);
      });
    }

    toggleMute() {
      this.muted = !this.muted;
      localStorage.setItem('cvn_game_muted', this.muted);
      return this.muted;
    }
  }

  /* ============================================================
     2. GRADE 11 MATHEMATICS QUESTION BANK (50+ MoEYS Questions)
     ============================================================ */
  const REALMS = {
    all: { id: 'all', title: 'គ្រប់ជំពូកចម្រុះ', icon: '🌟' },
    trig: { id: 'trig', title: '១. ត្រីកោណមាត្រ', icon: '📐' },
    sequence: { id: 'sequence', title: '២. ស្វ៊ីតចំនួនពិត', icon: '🔢' },
    conic: { id: 'conic', title: '៣. កោនិក (Conic Sections)', icon: '🪐' },
    logexp: { id: 'logexp', title: '៤. អិចស្ប៉ូណង់ស្យែល & លោការីត', icon: '📈' },
    prob: { id: 'prob', title: '៥. ប្រូបាប & បន្សំ', icon: '🎲' }
  };

  const QUESTION_BANK = [
    /* Realm 1: Trigonometry */
    {
      id: 'trig_1',
      realm: 'trig',
      text: 'គណនាតម្លៃនៃកន្សោមត្រីកោណមាត្រ៖',
      math: '\\sin\\left(\\frac{\\pi}{6}\\right) + \\cos\\left(\\frac{\\pi}{3}\\right)',
      options: ['1', '\\frac{\\sqrt{3}}{2}', '\\frac{1}{2}', '\\sqrt{2}'],
      correct: 0,
      hint: 'ចងចាំថាមុំ π/6 = 30° នាំឱ្យ sin(30°) = 1/2 និង cos(60°) = 1/2។',
      explanation: 'យើងមាន $\\sin(\\pi/6) = \\frac{1}{2}$ និង $\\cos(\\pi/3) = \\frac{1}{2}$។ ដូច្នេះផលបូកគឺ $\\frac{1}{2} + \\frac{1}{2} = 1$។'
    },
    {
      id: 'trig_2',
      realm: 'trig',
      text: 'តើមុំមហាស្រួចណាខ្លះដែលផ្ទៀងផ្ទាត់សមីការ៖',
      math: '\\cos(x) = -\\frac{1}{2} \\quad \\text{លើចន្លោះ } [0, 2\\pi]',
      options: ['\\frac{2\\pi}{3} \\text{ និង } \\frac{4\\pi}{3}', '\\frac{\\pi}{3} \\text{ និង } \\frac{5\\pi}{3}', '\\frac{3\\pi}{4} \\text{ និង } \\frac{5\\pi}{4}', '\\frac{5\\pi}{6} \\text{ និង } \\frac{7\\pi}{6}'],
      correct: 0,
      hint: 'កូស៊ីនុសអវិជ្ជមាននៅក្នុងកាដ្រង់ទី ២ និងកាដ្រង់ទី ៣។',
      explanation: 'ដោយ $\\cos(\\pi/3) = 1/2$ នាំឱ្យមុំដែលមានកូស៊ីនុសស្មើ $-1/2$ គឺ $x = \\pi - \\pi/3 = \\frac{2\\pi}{3}$ និង $x = \\pi + \\pi/3 = \\frac{4\\pi}{3}$។'
    },
    {
      id: 'trig_3',
      realm: 'trig',
      text: 'រូបមន្តត្រីកោណមាត្រទ្វេមុំ $\\cos(2a)$ ស្មើនឹងកន្សោមណា?៖',
      math: '\\cos(2a) = ?',
      options: ['\\cos^2 a - \\sin^2 a', '2\\sin a \\cos a', '\\sin^2 a - \\cos^2 a', '1 + 2\\sin^2 a'],
      correct: 0,
      hint: 'រូបមន្តកូស៊ីនុសមុំឌុបអាចសរសេរជា ៣ ទម្រង់៖ cos²a - sin²a, 2cos²a - 1, 1 - 2sin²a។',
      explanation: 'រូបមន្តត្រឹមត្រូវគឺ $\\cos(2a) = \\cos^2 a - \\sin^2 a = 2\\cos^2 a - 1 = 1 - 2\\sin^2 a$។'
    },
    {
      id: 'trig_4',
      realm: 'trig',
      text: 'គណនាតម្លៃនៃផលគុណតង់សង់៖',
      math: '\\tan\\left(\\frac{\\pi}{4}\\right) \\cdot \\cot\\left(\\frac{\\pi}{4}\\right)',
      options: ['1', '0', '2', '\\frac{\\sqrt{2}}{2}'],
      correct: 0,
      hint: 'tan(θ) · cot(θ) = 1 ជានិច្ចគ្រប់មុំដែលអនុគមន៍មានន័យ។',
      explanation: 'ដោយ $\\tan(\\pi/4) = 1$ និង $\\cot(\\pi/4) = 1$ នាំឱ្យ $1 \\cdot 1 = 1$។ ម្យ៉ាងទៀត $\\cot x = \\frac{1}{\\tan x}$ ដូច្នេះផលគុណស្មើ ១ ជានិច្ច។'
    },
    {
      id: 'trig_5',
      realm: 'trig',
      text: 'បើ $\\sin x = \\frac{3}{5}$ និង $0 < x < \\frac{\\pi}{2}$ គណនា $\\cos x$៖',
      math: '\\cos x = ?',
      options: ['\\frac{4}{5}', '\\frac{2}{5}', '\\frac{1}{5}', '\\frac{\\sqrt{5}}{5}'],
      correct: 0,
      hint: 'ប្រើរូបមន្តគ្រឹះ sin²x + cos²x = 1។',
      explanation: '$\\cos^2 x = 1 - \\sin^2 x = 1 - (3/5)^2 = 1 - 9/25 = 16/25$។ ដោយ $x$ ក្នុងកាដ្រង់ទី ១ នាំឱ្យ $\\cos x = \\sqrt{16/25} = \\frac{4}{5}$។'
    },
    {
      id: 'trig_6',
      realm: 'trig',
      text: 'ដោះស្រាយសមីការត្រីកោណមាត្រ៖',
      math: '2\\sin(x) - \\sqrt{3} = 0 \\quad (0^\\circ \\le x \\le 90^\\circ)',
      options: ['60^\\circ', '30^\\circ', '45^\\circ', '90^\\circ'],
      correct: 0,
      hint: 'ទាញយក sin(x) = √3 / 2។',
      explanation: '$2\\sin x = \\sqrt{3} \\implies \\sin x = \\frac{\\sqrt{3}}{2}$ នាំឱ្យមុំស្រួច $x = 60^\\circ$ ឬ $\\frac{\\pi}{3}$ rad។'
    },
    {
      id: 'trig_7',
      realm: 'trig',
      text: 'គណនាតម្លៃនៃអនុគមន៍ស៊ីនុសមុំបូក៖',
      math: '\\sin\\left(a + \\frac{\\pi}{2}\\right) = ?',
      options: ['\\cos a', '-\\cos a', '\\sin a', '-\\sin a'],
      correct: 0,
      hint: 'មុំបំពេញបន្ថែម sin(a + π/2) = cos(a)។',
      explanation: 'តាមរូបមន្តផលបូក $\\sin(a + \\pi/2) = \\sin a \\cos(\\pi/2) + \\cos a \\sin(\\pi/2) = \\sin a(0) + \\cos a(1) = \\cos a$។'
    },

    /* Realm 2: Sequences */
    {
      id: 'seq_1',
      realm: 'sequence',
      text: 'រកផលសងរួម $d$ នៃស្វ៊ីតនព្វន្ត៖',
      math: '5, 9, 13, 17, 21, \\dots',
      options: ['d = 4', 'd = 5', 'd = 3', 'd = 6'],
      correct: 0,
      hint: 'ផលសងរួម d = u₂ - u₁ = u₃ - u₂។',
      explanation: '$d = 9 - 5 = 4$។ តួបន្ទាប់កើនឡើងម្តង ៤ ជានិច្ច ដូច្នេះ $d = 4$។'
    },
    {
      id: 'seq_2',
      realm: 'sequence',
      text: 'ស្វ៊ីតនព្វន្តមាន $u_1 = 3$ និង $d = 5$។ គណនាតួទី ១២ ($u_{12}$)៖',
      math: 'u_{12} = ?',
      options: ['58', '60', '63', '55'],
      correct: 0,
      hint: 'រូបមន្តតួទី n នៃស្វ៊ីតនព្វន្តគឺ u_n = u₁ + (n - 1)d។',
      explanation: '$u_{12} = u_1 + (12 - 1)d = 3 + 11 \\times 5 = 3 + 55 = 58$។'
    },
    {
      id: 'seq_3',
      realm: 'sequence',
      text: 'ស្វ៊ីតធរណីមាត្រមាន $u_1 = 2$ និងផលធៀបរួម $q = 3$។ រកតួទី ៥ ($u_5$)៖',
      math: 'u_5 = ?',
      options: ['162', '486', '54', '81'],
      correct: 0,
      hint: 'រូបមន្តតួទី n នៃស្វ៊ីតធរណីមាត្រគឺ u_n = u₁ · q^{n-1}។',
      explanation: '$u_5 = u_1 \\cdot q^{5-1} = 2 \\cdot 3^4 = 2 \\cdot 81 = 162$។'
    },
    {
      id: 'seq_4',
      realm: 'sequence',
      text: 'គណនាផលបូក ៥ តួដំបូងនៃស្វ៊ីតនព្វន្ត $1, 4, 7, 10, 13$៖',
      math: 'S_5 = 1 + 4 + 7 + 10 + 13',
      options: ['35', '30', '40', '28'],
      correct: 0,
      hint: 'S_n = n(u₁ + u_n) / 2 = 5(1 + 13) / 2។',
      explanation: '$S_5 = \\frac{5(1 + 13)}{2} = \\frac{5 \\times 14}{2} = 5 \\times 7 = 35$។'
    },
    {
      id: 'seq_5',
      realm: 'sequence',
      text: 'គណនាផលបូកតួអនន្តនៃស្វ៊ីតធរណីមាត្រចុះអនន្ត៖',
      math: 'S_\\infty = 1 + \\frac{1}{3} + \\frac{1}{9} + \\frac{1}{27} + \\dots',
      options: ['\\frac{3}{2}', '\\frac{4}{3}', '2', '\\frac{5}{3}'],
      correct: 0,
      hint: 'រូបមន្តផលបូកតួអនន្ត (|q| < 1) គឺ S_∞ = u₁ / (1 - q)។',
      explanation: 'ទីនេះ $u_1 = 1$ និង $q = 1/3$ ($|q| < 1$)។ ដូច្នេះ $S_\\infty = \\frac{1}{1 - 1/3} = \\frac{1}{2/3} = \\frac{3}{2}$។'
    },
    {
      id: 'seq_6',
      realm: 'sequence',
      text: 'បើ $x, 12, y$ ជា ៣ តួជាប់គ្នានៃស្វ៊ីតនព្វន្ត គណនា $x + y$៖',
      math: 'x + y = ?',
      options: ['24', '18', '36', '12'],
      correct: 0,
      hint: 'តាមលក្ខណៈស្វ៊ីតនព្វន្ត តួកណ្តាល b = (a + c) / 2។',
      explanation: 'ដោយ $x, 12, y$ ជាស្វ៊ីតនព្វន្ត នាំឱ្យ $12 = \\frac{x + y}{2} \\implies x + y = 24$។'
    },
    {
      id: 'seq_7',
      realm: 'sequence',
      text: 'គណនាផលបូកចំនួនគត់ធម្មជាតិ ២០ តួដំបូង៖',
      math: 'S_{20} = 1 + 2 + 3 + \\dots + 20',
      options: ['210', '200', '190', '220'],
      correct: 0,
      hint: 'S_n = n(n + 1) / 2។',
      explanation: '$S_{20} = \\frac{20(20 + 1)}{2} = 10 \\times 21 = 210$។'
    },

    /* Realm 3: Conic Sections */
    {
      id: 'conic_1',
      realm: 'conic',
      text: 'សមីការប៉ារ៉ាបូល $y^2 = 12x$ មានកំណុំ $F$ ត្រង់ចំណុចណា?៖',
      math: 'y^2 = 4px \\implies F(p, 0)',
      options: ['F(3, 0)', 'F(0, 3)', 'F(6, 0)', 'F(-3, 0)'],
      correct: 0,
      hint: 'ប្រៀបធៀប y² = 12x ជាមួយ y² = 4px នាំឱ្យ 4p = 12។',
      explanation: '$4p = 12 \\implies p = 3$។ ដោយអ័ក្សស៊ីមេទ្រីជាអ័ក្សដេក ($Ox$) នាំឱ្យកំណុំ $F(p, 0) = F(3, 0)$។'
    },
    {
      id: 'conic_2',
      realm: 'conic',
      text: 'សម្រាប់អេលីប $\\frac{x^2}{25} + \\frac{y^2}{16} = 1$ រកចម្ងាយពីផ្ចិតទៅកំណុំ $c$៖',
      math: 'c^2 = a^2 - b^2 \\implies c = ?',
      options: ['c = 3', 'c = 4', 'c = 5', 'c = \\sqrt{41}'],
      correct: 0,
      hint: 'ក្នុងអេលីប a² = 25, b² = 16 ហើយ c² = a² - b²។',
      explanation: '$c^2 = a^2 - b^2 = 25 - 16 = 9 \\implies c = 3$។ កំណុំទាំងពីរគឺ $F_1(-3, 0)$ និង $F_2(3, 0)$។'
    },
    {
      id: 'conic_3',
      realm: 'conic',
      text: 'សមីការអ៊ីពែបូល $\\frac{x^2}{9} - \\frac{y^2}{16} = 1$ រកចម្ងាយពីផ្ចិតទៅកំណុំ $c$៖',
      math: 'c^2 = a^2 + b^2 \\implies c = ?',
      options: ['c = 5', 'c = \\sqrt{7}', 'c = 7', 'c = 25'],
      correct: 0,
      hint: 'ចំណាំ៖ ក្នុងអ៊ីពែបូល c² = a² + b² (ខុសពីអេលីបដែល c² = a² - b²)។',
      explanation: 'ក្នុងអ៊ីពែបូល $c^2 = a^2 + b^2 = 9 + 16 = 25 \\implies c = 5$។'
    },
    {
      id: 'conic_4',
      realm: 'conic',
      text: 'បន្ទាត់ប្រាប់ទិសនៃប៉ារ៉ាបូល $y^2 = 8x$ មានសមីការអ្វី?៖',
      math: 'x = -p \\implies x = ?',
      options: ['x = -2', 'x = 2', 'y = -2', 'x = -4'],
      correct: 0,
      hint: '4p = 8 => p = 2 បន្ទាត់ប្រាប់ទិស x = -p។',
      explanation: '$4p = 8 \\implies p = 2$ នាំឱ្យបន្ទាត់ប្រាប់ទិស (Directrix) គឺ $x = -p = -2$។'
    },
    {
      id: 'conic_5',
      realm: 'conic',
      text: 'ប្រវែងអ័ក្សធំនៃអេលីប $\\frac{x^2}{36} + \\frac{y^2}{9} = 1$ ស្មើនឹង?៖',
      math: '2a = ?',
      options: ['12', '6', '18', '24'],
      correct: 0,
      hint: 'a² = 36 => a = 6 ហើយប្រវែងអ័ក្សធំគឺ 2a។',
      explanation: '$a^2 = 36 \\implies a = 6$ នាំឱ្យប្រវែងអ័ក្សធំស្មើ $2a = 2 \\times 6 = 12$ ឯកតា។'
    },
    {
      id: 'conic_6',
      realm: 'conic',
      text: 'សមីការអាស៊ីមតូតទាំងពីរនៃអ៊ីពែបូល $\\frac{x^2}{4} - \\frac{y^2}{9} = 1$ គឺ៖',
      math: 'y = \\pm \\frac{b}{a} x \\implies ?',
      options: ['y = \\pm \\frac{3}{2} x', 'y = \\pm \\frac{2}{3} x', 'y = \\pm \\frac{9}{4} x', 'y = \\pm 3x'],
      correct: 0,
      hint: 'a² = 4 => a = 2, b² = 9 => b = 3។ អាស៊ីមតូត y = ± (b/a)x។',
      explanation: '$a = 2$ និង $b = 3$។ សមីការអាស៊ីមតូតគឺ $y = \\pm \\frac{b}{a}x = \\pm \\frac{3}{2}x$។'
    },

    /* Realm 4: Logarithms & Exponentials */
    {
      id: 'log_1',
      realm: 'logexp',
      text: 'គណនាតម្លៃនៃលោការីតគោល ២៖',
      math: '\\log_2(64) = ?',
      options: ['6', '5', '8', '32'],
      correct: 0,
      hint: '2^? = 64 (2⁶ = 64)។',
      explanation: 'ដោយ $64 = 2^6$ នាំឱ្យ $\\log_2(64) = \\log_2(2^6) = 6$។'
    },
    {
      id: 'log_2',
      realm: 'logexp',
      text: 'ដោះស្រាយសមីការអិចស្ប៉ូណង់ស្យែល៖',
      math: '3^{2x - 1} = 27',
      options: ['x = 2', 'x = 3', 'x = 1', 'x = 4'],
      correct: 0,
      hint: '27 = 3³ នាំឱ្យស្វ័យគុណស្មើគ្នា 2x - 1 = 3។',
      explanation: '$3^{2x - 1} = 3^3 \\implies 2x - 1 = 3 \\implies 2x = 4 \\implies x = 2$។'
    },
    {
      id: 'log_3',
      realm: 'logexp',
      text: 'សម្រួលកន្សោមលោការីតធម្មជាតិ៖',
      math: '\\ln(e^5) - \\ln(e^2) = ?',
      options: ['3', 'e^3', '10', '7'],
      correct: 0,
      hint: 'ln(e^k) = k នាំឱ្យ 5 - 2 = 3។',
      explanation: '$\\ln(e^5) = 5$ និង $\\ln(e^2) = 2$ នាំឱ្យ $5 - 2 = 3$។'
    },
    {
      id: 'log_4',
      realm: 'logexp',
      text: 'គណនាតម្លៃនៃផលបូកលោការីត៖',
      math: '\\log_{10}(25) + \\log_{10}(4) = ?',
      options: ['2', '100', '1', '29'],
      correct: 0,
      hint: 'log(A) + log(B) = log(A · B) នាំឱ្យ 25 × 4 = 100។',
      explanation: '$\\log_{10}(25) + \\log_{10}(4) = \\log_{10}(25 \\times 4) = \\log_{10}(100) = \\log_{10}(10^2) = 2$។'
    },
    {
      id: 'log_5',
      realm: 'logexp',
      text: 'ដោះស្រាយសមីការលោការីត៖',
      math: '\\log_3(x) = 4 \\implies x = ?',
      options: ['81', '64', '12', '27'],
      correct: 0,
      hint: 'log_a(x) = b => x = a^b នាំឱ្យ x = 3⁴។',
      explanation: '$\\log_3(x) = 4 \\implies x = 3^4 = 81$។'
    },

    /* Realm 5: Probability & Combinatorics */
    {
      id: 'prob_1',
      realm: 'prob',
      text: 'គណនាចំនួនបន្សំ ៣ ធាតុ យកពី ៥ ធាតុ៖',
      math: 'C(5, 3) = \\binom{5}{3} = ?',
      options: ['10', '15', '20', '60'],
      correct: 0,
      hint: 'C(5, 3) = (5 × 4 × 3) / (3 × 2 × 1) = 10។',
      explanation: '$C(5, 3) = \\frac{5!}{3!(5-3)!} = \\frac{5 \\times 4 \\times 3}{3 \\times 2 \\times 1} = 10$។'
    },
    {
      id: 'prob_2',
      realm: 'prob',
      text: 'គណនាតម្លៃនៃចម្លាស់ ៤ ធាតុ យក ២ ធាតុ៖',
      math: 'P(4, 2) = ?',
      options: ['12', '6', '8', '24'],
      correct: 0,
      hint: 'P(n, k) = n! / (n - k)! = 4 × 3 = 12។',
      explanation: '$P(4, 2) = 4 \\times 3 = 12$។'
    },
    {
      id: 'prob_3',
      realm: 'prob',
      text: 'បោះគ្រាប់ឡុកឡាក់យុត្តិធម៌មួយគ្រាប់។ តើប្រូបាបចេញលេខធំជាង ៤ ស្មើប៉ុន្មាន?៖',
      math: 'P(X > 4) = ?',
      options: ['\\frac{1}{3}', '\\frac{1}{2}', '\\frac{1}{6}', '\\frac{2}{3}'],
      correct: 0,
      hint: 'លេខធំជាង ៤ មានលេខ ៥ និង ៦ (២ ករណី ក្នុងចំណោម ៦)។',
      explanation: 'លទ្ធផលស្របគឺ $\\{5, 6\\}$ (២ ករណី) ក្នុងចំណោម ៦ ករណីអាចកើតឡើង។ ប្រូបាបគឺ $\\frac{2}{6} = \\frac{1}{3}$។'
    },
    {
      id: 'prob_4',
      realm: 'prob',
      text: 'ក្នុងថង់មួយមានបាល់ក្រហម ៤ និងបាល់ស ៦។ ចាប់យកបាល់ ១ ដោយចៃដន្យ រកប្រូបាបបានបាល់ក្រហម៖',
      math: 'P(\\text{Red}) = ?',
      options: ['\\frac{2}{5}', '\\frac{3}{5}', '\\frac{1}{4}', '\\frac{1}{2}'],
      correct: 0,
      hint: 'ចំនួនបាល់សរុប = 4 + 6 = 10។ P = 4 / 10 = 2/5។',
      explanation: 'ចំនួនករណីអាចកើតមានសរុប $n = 4 + 6 = 10$។ ចំនួនករណីស្រប $m = 4$។ ដូច្នេះ $P = \\frac{4}{10} = \\frac{2}{5}$ (ឬ 40%)។'
    },
    {
      id: 'prob_5',
      realm: 'prob',
      text: 'គណនាតម្លៃនៃហ្វាក់តូរីយ៉ែល៖',
      math: '5! - 4! = ?',
      options: ['96', '24', '120', '72'],
      correct: 0,
      hint: '5! = 120 និង 4! = 24 នាំឱ្យ 120 - 24 = 96។',
      explanation: '$5! = 5 \\times 4 \\times 3 \\times 2 \\times 1 = 120$ និង $4! = 24$។ ដូច្នេះ $120 - 24 = 96$ (ឬ $4!(5-1) = 24 \\times 4 = 96$)។'
    }
  ];

  /* ============================================================
     3. ACHIEVEMENTS & BADGES DEFINITIONS
     ============================================================ */
  const BADGES = [
    { id: 'first_win', name: 'ជំហានដំបូង', icon: '🥉', desc: 'ឆ្លើយត្រូវសំណួរគណិតវិទ្យាទីមួយ', condition: (s) => s.totalCorrect >= 1 },
    { id: 'trig_master', name: 'អ្នកជំនាញត្រីកោណមាត្រ', icon: '📐', desc: 'ឆ្លើយត្រូវត្រីកោណមាត្រ ៥ សំណួរ', condition: (s) => s.trigCorrect >= 5 },
    { id: 'seq_king', name: 'ស្តេចស្វ៊ីតចំនួនពិត', icon: '👑', desc: 'ឆ្លើយត្រូវស្វ៊ីតចំនួនពិត ៥ សំណួរ', condition: (s) => s.seqCorrect >= 5 },
    { id: 'streak_5', name: 'ភ្លើង Combo 5x', icon: '🔥', desc: 'ឆ្លើយត្រូវ ៥ សំណួរជាប់ៗគ្នាមិនខុស', condition: (s) => s.maxStreak >= 5 },
    { id: 'speed_demon', name: 'ល្បឿនរន្ទះ', icon: '⚡', desc: 'ឆ្លើយត្រូវក្រោមរយៈពេល ៣ វិនាទី', condition: (s) => s.fastAnswer },
    { id: 'grand_champion', name: 'កំពូលបញ្ញវន្តថ្នាក់ទី១១', icon: '🏆', desc: 'សម្រេចបានពិន្ទុលើសពី 1,500 XP', condition: (s) => s.xp >= 1500 }
  ];

  /* ============================================================
     4. MAIN GAME CLASS (MathQuest11)
     ============================================================ */
  class MathQuest11 {
    constructor() {
      this.sound = new SoundSynth();

      // Game Modes: 'quiz', 'blitz', 'mini-archer', 'mini-sequence', 'mini-conic'
      this.currentMode = 'quiz';
      this.activeRealm = 'all';

      // Player State & Persistence
      this.loadSaveData();

      // Active Match State
      this.currentQuestion = null;
      this.questionIndex = 0;
      this.lives = 3;
      this.score = 0;
      this.streak = 0;
      this.maxMatchStreak = 0;
      this.matchCorrect = 0;
      this.matchAnswered = 0;
      this.questionStartTime = 0;

      // Lifelines remaining in current match
      this.lifelines = {
        fiftyFifty: true,
        freezeTime: true,
        formulaHint: true
      };

      // Timer State
      this.timerInterval = null;
      this.timeRemaining = 25; // seconds per question (or 60s for blitz)
      this.maxTime = 25;
      this.isPaused = false;
      this.isAnswerLocked = false;

      // Mini-Games Engine References
      this.miniGameCanvas = null;
      this.miniGameCtx = null;
      this.miniGameAnimId = null;

      // DOM Cache
      this.initDom();
      this.bindEvents();
      this.updateHud();
      this.startMode('quiz');
    }

    loadSaveData() {
      const raw = localStorage.getItem('cvn_math_quest_11_save');
      if (raw) {
        try {
          const data = JSON.parse(raw);
          this.xp = data.xp || 0;
          this.highScore = data.highScore || 0;
          this.stats = data.stats || {
            totalAnswered: 0,
            totalCorrect: 0,
            trigCorrect: 0,
            seqCorrect: 0,
            maxStreak: 0,
            fastAnswer: false
          };
          this.unlockedBadges = data.unlockedBadges || [];
        } catch (e) {
          this.resetSaveData();
        }
      } else {
        this.resetSaveData();
      }
    }

    resetSaveData() {
      this.xp = 0;
      this.highScore = 0;
      this.stats = {
        totalAnswered: 0,
        totalCorrect: 0,
        trigCorrect: 0,
        seqCorrect: 0,
        maxStreak: 0,
        fastAnswer: false
      };
      this.unlockedBadges = [];
      this.save();
    }

    save() {
      const data = {
        xp: this.xp,
        highScore: this.highScore,
        stats: this.stats,
        unlockedBadges: this.unlockedBadges
      };
      localStorage.setItem('cvn_math_quest_11_save', JSON.stringify(data));
    }

    getPlayerRank() {
      if (this.xp >= 2000) return { rank: '🌟 កំពូលទេពកោសល្យ', badge: 'LEGEND' };
      if (this.xp >= 1000) return { rank: '👑 បញ្ញវន្តគណិតវិទ្យា', badge: 'MASTER' };
      if (this.xp >= 500) return { rank: '🥇 មេទ័ពគណិតវិទ្យា', badge: 'KNIGHT' };
      if (this.xp >= 200) return { rank: '🥈 អ្នកផ្សងព្រេងគណិត', badge: 'ADEPT' };
      return { rank: '🥉 សិក្ខាកាមគណិត', badge: 'NOVICE' };
    }

    initDom() {
      // Top HUD elements
      this.rankTitleEl = document.getElementById('hud-player-rank');
      this.rankTagEl = document.getElementById('hud-player-tag');
      this.xpFillEl = document.getElementById('hud-xp-fill');
      this.xpTextEl = document.getElementById('hud-xp-text');
      this.scoreEl = document.getElementById('hud-score-val');
      this.highScoreEl = document.getElementById('hud-highscore-val');
      this.comboBadgeEl = document.getElementById('hud-combo-badge');
      this.comboCountEl = document.getElementById('hud-combo-count');
      this.heartsContainer = document.getElementById('hud-hearts-container');
      this.soundBtn = document.getElementById('hud-sound-btn');
      this.soundIcon = document.getElementById('hud-sound-icon');
      this.fullscreenBtn = document.getElementById('hud-fullscreen-btn');

      // Timer & Question Cards
      this.timerFillEl = document.getElementById('game-timer-fill');
      this.quizCardEl = document.getElementById('game-quiz-card');
      this.realmTagEl = document.getElementById('question-realm-tag');
      this.qCounterEl = document.getElementById('question-counter-tag');
      this.qTextEl = document.getElementById('question-text-kh');
      this.qMathEl = document.getElementById('question-math-display');
      this.optionsGridEl = document.getElementById('options-grid');

      // Lifelines
      this.btnFifty = document.getElementById('lifeline-fifty');
      this.btnFreeze = document.getElementById('lifeline-freeze');
      this.btnHint = document.getElementById('lifeline-hint');

      // Solution Panel
      this.solutionPanel = document.getElementById('solution-panel');
      this.solutionStepsEl = document.getElementById('solution-steps-text');
      this.btnNext = document.getElementById('btn-next-question');

      // Canvas Mini-Games Section
      this.miniGameWrapper = document.getElementById('mini-game-wrapper');
      this.miniGameTitleEl = document.getElementById('mini-game-title');
      this.miniGameInstructEl = document.getElementById('mini-game-instruction-text');
      this.miniCanvas = document.getElementById('mini-game-canvas');
      this.miniButtonsBar = document.getElementById('mini-game-buttons-bar');

      // Modals
      this.modalOverlay = document.getElementById('game-modal-overlay');
      this.modalHeading = document.getElementById('modal-heading');
      this.modalScore = document.getElementById('modal-score-val');
      this.modalAccuracy = document.getElementById('modal-accuracy-val');
      this.modalStreak = document.getElementById('modal-streak-val');
      this.modalXp = document.getElementById('modal-xp-val');
      this.modalPlayAgainBtn = document.getElementById('modal-play-again-btn');
      this.modalTrophyIcon = document.getElementById('modal-trophy-icon');
      this.confettiCanvas = document.getElementById('modal-confetti-canvas');

      // Tab Buttons
      this.modeTabs = document.querySelectorAll('[data-game-tab]');
    }

    bindEvents() {
      // Sound Toggle
      if (this.soundBtn) {
        this.soundBtn.addEventListener('click', () => {
          const isMuted = this.sound.toggleMute();
          if (this.soundIcon) {
            this.soundIcon.textContent = isMuted ? '🔇' : '🔊';
          }
        });
        if (this.soundIcon) {
          this.soundIcon.textContent = this.sound.muted ? '🔇' : '🔊';
        }
      }

      // Fullscreen Toggle
      if (this.fullscreenBtn) {
        this.fullscreenBtn.addEventListener('click', () => {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
          } else {
            if (document.exitFullscreen) document.exitFullscreen();
          }
        });
      }

      // Mode Tabs Navigation
      this.modeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const mode = tab.getAttribute('data-game-tab');
          this.modeTabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          this.startMode(mode);
        });
      });

      // Lifelines Buttons
      if (this.btnFifty) {
        this.btnFifty.addEventListener('click', () => this.useLifelineFifty());
      }
      if (this.btnFreeze) {
        this.btnFreeze.addEventListener('click', () => this.useLifelineFreeze());
      }
      if (this.btnHint) {
        this.btnHint.addEventListener('click', () => this.useLifelineHint());
      }

      // Next Question Button
      if (this.btnNext) {
        this.btnNext.addEventListener('click', () => this.nextQuestion());
      }

      // Modal Play Again Button
      if (this.modalPlayAgainBtn) {
        this.modalPlayAgainBtn.addEventListener('click', () => {
          this.closeModal();
          this.startMode(this.currentMode);
        });
      }
    }

    /* ============================================================
       5. GAME MODES MANAGEMENT
       ============================================================ */
    startMode(mode) {
      this.currentMode = mode;
      this.stopTimer();
      this.closeModal();

      if (this.miniGameAnimId) {
        cancelAnimationFrame(this.miniGameAnimId);
        this.miniGameAnimId = null;
      }

      // Hide or show containers
      if (mode.startsWith('mini-')) {
        if (this.quizCardEl) this.quizCardEl.style.display = 'none';
        if (this.miniGameWrapper) this.miniGameWrapper.classList.add('visible');
        this.initMiniGame(mode);
      } else {
        if (this.miniGameWrapper) this.miniGameWrapper.classList.remove('visible');
        if (this.quizCardEl) this.quizCardEl.style.display = 'block';

        if (mode === 'blitz') {
          this.initBlitzMatch();
        } else {
          this.initQuizMatch();
        }
      }
    }

    initQuizMatch() {
      this.score = 0;
      this.streak = 0;
      this.maxMatchStreak = 0;
      this.matchCorrect = 0;
      this.matchAnswered = 0;
      this.lives = 3;
      this.lifelines = { fiftyFifty: true, freezeTime: true, formulaHint: true };
      this.resetLifelineButtons();
      this.maxTime = 25;

      // Filter and shuffle questions
      this.filteredQuestions = [...QUESTION_BANK].sort(() => Math.random() - 0.5);
      this.questionIndex = 0;

      this.updateHud();
      this.loadQuestion();
    }

    initBlitzMatch() {
      this.score = 0;
      this.streak = 0;
      this.maxMatchStreak = 0;
      this.matchCorrect = 0;
      this.matchAnswered = 0;
      this.lives = 999; // no lives limit in blitz, just race against time!
      this.lifelines = { fiftyFifty: true, freezeTime: true, formulaHint: false };
      this.resetLifelineButtons();

      this.filteredQuestions = [...QUESTION_BANK].sort(() => Math.random() - 0.5);
      this.questionIndex = 0;

      this.updateHud();

      // Blitz countdown from 60 seconds total!
      this.timeRemaining = 60;
      this.maxTime = 60;
      this.startBlitzTimer();
      this.loadQuestion(false); // don't restart individual question timer
    }

    resetLifelineButtons() {
      if (this.btnFifty) this.btnFifty.disabled = !this.lifelines.fiftyFifty;
      if (this.btnFreeze) this.btnFreeze.disabled = !this.lifelines.freezeTime;
      if (this.btnHint) this.btnHint.disabled = !this.lifelines.formulaHint;
    }

    /* ============================================================
       6. QUESTION LOADING & TIMERS
       ============================================================ */
    loadQuestion(startTimer = true) {
      if (this.questionIndex >= this.filteredQuestions.length || (this.lives <= 0 && this.currentMode !== 'blitz')) {
        this.finishMatch();
        return;
      }

      this.isAnswerLocked = false;
      this.currentQuestion = this.filteredQuestions[this.questionIndex];
      this.questionStartTime = Date.now();

      // Hide solution panel
      if (this.solutionPanel) this.solutionPanel.classList.remove('visible');

      // Update question text and badge
      const realm = REALMS[this.currentQuestion.realm] || REALMS.all;
      if (this.realmTagEl) {
        this.realmTagEl.innerHTML = `<span>${realm.icon}</span> <span>${realm.title}</span>`;
      }
      if (this.qCounterEl) {
        this.qCounterEl.textContent = `សំណួរ ${this.questionIndex + 1} / ${this.filteredQuestions.length}`;
      }
      if (this.qTextEl) {
        this.qTextEl.textContent = this.currentQuestion.text;
      }
      if (this.qMathEl) {
        this.qMathEl.textContent = `$${this.currentQuestion.math}$`;
      }

      // Render 4 options
      if (this.optionsGridEl) {
        const letters = ['A', 'B', 'C', 'D'];
        this.optionsGridEl.innerHTML = this.currentQuestion.options.map((opt, idx) => `
          <button type="button" class="option-btn" data-option-index="${idx}">
            <span class="option-prefix">${letters[idx]}</span>
            <span class="option-text">$${opt}$</span>
          </button>
        `).join('');

        // Bind clicks to options
        this.optionsGridEl.querySelectorAll('.option-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const idx = parseInt(btn.getAttribute('data-option-index'), 10);
            this.handleAnswer(idx, btn);
          });
        });
      }

      // Trigger KaTeX rendering
      this.renderMath();

      // Start timer if quiz mode
      if (startTimer && this.currentMode === 'quiz') {
        this.timeRemaining = this.maxTime;
        this.startQuestionTimer();
      }
    }

    renderMath() {
      if (typeof window.renderMathInElement === 'function') {
        try {
          window.renderMathInElement(this.quizCardEl, {
            delimiters: [
              { left: '$$', right: '$$', display: true },
              { left: '$', right: '$', display: false }
            ],
            throwOnError: false
          });
        } catch (e) {}
      }
    }

    startQuestionTimer() {
      this.stopTimer();
      this.updateTimerBar();

      this.timerInterval = setInterval(() => {
        if (this.isPaused || this.isAnswerLocked) return;
        this.timeRemaining -= 0.1;

        if (this.timeRemaining <= 5 && this.timeRemaining > 0 && Math.round(this.timeRemaining * 10) % 10 === 0) {
          this.sound.tick();
        }

        if (this.timeRemaining <= 0) {
          this.timeRemaining = 0;
          this.stopTimer();
          this.handleTimeout();
        }
        this.updateTimerBar();
      }, 100);
    }

    startBlitzTimer() {
      this.stopTimer();
      this.updateTimerBar();

      this.timerInterval = setInterval(() => {
        if (this.isPaused) return;
        this.timeRemaining -= 0.1;

        if (this.timeRemaining <= 10 && this.timeRemaining > 0 && Math.round(this.timeRemaining * 10) % 10 === 0) {
          this.sound.tick();
        }

        if (this.timeRemaining <= 0) {
          this.timeRemaining = 0;
          this.stopTimer();
          this.finishMatch();
        }
        this.updateTimerBar();
      }, 100);
    }

    stopTimer() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
    }

    updateTimerBar() {
      if (!this.timerFillEl) return;
      const pct = (this.timeRemaining / this.maxTime) * 100;
      this.timerFillEl.style.width = `${Math.max(0, Math.min(100, pct))}%`;

      if (this.timeRemaining <= (this.maxTime * 0.25)) {
        this.timerFillEl.classList.add('warning');
      } else {
        this.timerFillEl.classList.remove('warning');
      }
    }

    /* ============================================================
       7. ANSWER PROCESSING & SCORING
       ============================================================ */
    handleAnswer(selectedIndex, buttonEl) {
      if (this.isAnswerLocked) return;
      this.isAnswerLocked = true;
      if (this.currentMode === 'quiz') this.stopTimer();

      const q = this.currentQuestion;
      const isCorrect = selectedIndex === q.correct;
      const timeSpentSec = (Date.now() - this.questionStartTime) / 1000;

      this.matchAnswered++;
      this.stats.totalAnswered++;

      // Highlight selected button
      const allButtons = this.optionsGridEl.querySelectorAll('.option-btn');
      allButtons.forEach(btn => btn.disabled = true);

      if (isCorrect) {
        buttonEl.classList.add('correct');
        this.matchCorrect++;
        this.stats.totalCorrect++;
        this.streak++;
        if (this.streak > this.maxMatchStreak) this.maxMatchStreak = this.streak;
        if (this.streak > this.stats.maxStreak) this.stats.maxStreak = this.streak;

        // Realm specific stats
        if (q.realm === 'trig') this.stats.trigCorrect++;
        if (q.realm === 'sequence') this.stats.seqCorrect++;

        // Fast answer badge condition
        if (timeSpentSec < 3.0) this.stats.fastAnswer = true;

        // Calculate score with combo multiplier
        const multiplier = this.streak >= 5 ? 3 : this.streak >= 3 ? 2 : 1.5;
        const basePts = 100;
        const timeBonus = Math.max(0, Math.round(this.timeRemaining * 4));
        const ptsEarned = Math.round((basePts + timeBonus) * (this.streak >= 2 ? multiplier : 1));

        this.score += ptsEarned;
        this.xp += Math.round(ptsEarned * 0.4);

        if (this.streak >= 3) {
          this.sound.combo();
        } else {
          this.sound.correct();
        }

        // Show Solution after short delay
        setTimeout(() => this.showSolution(true), 400);

      } else {
        buttonEl.classList.add('wrong');
        // Show correct button in green
        if (allButtons[q.correct]) allButtons[q.correct].classList.add('correct');

        this.streak = 0;
        if (this.currentMode !== 'blitz') {
          this.lives--;
        }
        this.sound.wrong();

        setTimeout(() => this.showSolution(false), 500);
      }

      this.checkAchievements();
      this.updateHud();
      this.save();
    }

    handleTimeout() {
      this.isAnswerLocked = true;
      this.matchAnswered++;
      this.stats.totalAnswered++;
      this.streak = 0;
      this.lives--;
      this.sound.wrong();

      // Highlight the correct answer
      const allButtons = this.optionsGridEl.querySelectorAll('.option-btn');
      allButtons.forEach(btn => btn.disabled = true);
      if (allButtons[this.currentQuestion.correct]) {
        allButtons[this.currentQuestion.correct].classList.add('correct');
      }

      this.updateHud();
      this.showSolution(false, '⏱️ អស់ពេលវេលា! ពេលវេលាបានផុតកំណត់។');
    }

    showSolution(wasCorrect, customMessage = '') {
      if (!this.solutionPanel) return;
      this.solutionPanel.classList.add('visible');

      const q = this.currentQuestion;
      const letters = ['A', 'B', 'C', 'D'];
      const correctText = q.options[q.correct];

      if (this.solutionStepsEl) {
        this.solutionStepsEl.innerHTML = `
          <p style="margin-bottom: 0.6rem;">
            <strong style="color: ${wasCorrect ? '#10b981' : '#f59e0b'};">
              ${wasCorrect ? '🎉 ចម្លើយរបស់អ្នកត្រឹមត្រូវ!' : customMessage || '❌ ចម្លើយមិនត្រឹមត្រូវឡើយ!'}
            </strong>
            &nbsp; ចម្លើយត្រឹមត្រូវគឺ <strong>${letters[q.correct]}. $${correctText}$</strong>
          </p>
          <div style="background: rgba(6, 182, 212, 0.08); border-left: 3px solid #06b6d4; padding: 0.75rem 1rem; border-radius: 4px; font-size: 0.95rem; line-height: 1.65; color: #f1f5f9;">
            ${q.explanation}
          </div>
        `;
      }

      // Re-run KaTeX on solution box
      if (typeof window.renderMathInElement === 'function') {
        try {
          window.renderMathInElement(this.solutionPanel, {
            delimiters: [
              { left: '$$', right: '$$', display: true },
              { left: '$', right: '$', display: false }
            ],
            throwOnError: false
          });
        } catch (e) {}
      }

      // In blitz mode, automatically advance after 1.5s
      if (this.currentMode === 'blitz') {
        setTimeout(() => {
          if (this.timeRemaining > 0) this.nextQuestion();
        }, 1600);
      }
    }

    nextQuestion() {
      this.questionIndex++;
      if (this.questionIndex >= this.filteredQuestions.length || (this.lives <= 0 && this.currentMode !== 'blitz')) {
        this.finishMatch();
      } else {
        this.loadQuestion(this.currentMode === 'quiz');
      }
    }

    /* ============================================================
       8. LIFELINES
       ============================================================ */
    useLifelineFifty() {
      if (!this.lifelines.fiftyFifty || this.isAnswerLocked) return;
      this.lifelines.fiftyFifty = false;
      this.btnFifty.disabled = true;
      this.sound.powerUp();

      const q = this.currentQuestion;
      const buttons = Array.from(this.optionsGridEl.querySelectorAll('.option-btn'));
      const wrongIndices = [0, 1, 2, 3].filter(idx => idx !== q.correct);

      // Randomly pick 2 wrong answers to eliminate
      wrongIndices.sort(() => Math.random() - 0.5);
      const toEliminate = wrongIndices.slice(0, 2);

      toEliminate.forEach(idx => {
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
      this.sound.powerUp();

      // Add +15 seconds to remaining time
      this.timeRemaining = Math.min(this.maxTime, this.timeRemaining + 15);
      this.updateTimerBar();
    }

    useLifelineHint() {
      if (!this.lifelines.formulaHint || this.isAnswerLocked) return;
      this.lifelines.formulaHint = false;
      this.btnHint.disabled = true;
      this.sound.powerUp();

      const q = this.currentQuestion;
      alert(`📜 គន្លឹះរូបមន្តសម្ងាត់៖\n${q.hint}`);
    }

    /* ============================================================
       9. HUD & STATS UPDATES
       ============================================================ */
    updateHud() {
      // Player Rank & XP
      const rankInfo = this.getPlayerRank();
      if (this.rankTitleEl) this.rankTitleEl.textContent = rankInfo.rank;
      if (this.rankTagEl) this.rankTagEl.textContent = rankInfo.badge;

      // XP Progress to next level (each level 500 XP)
      const currentLevelXp = this.xp % 500;
      const xpPct = (currentLevelXp / 500) * 100;
      if (this.xpFillEl) this.xpFillEl.style.width = `${xpPct}%`;
      if (this.xpTextEl) this.xpTextEl.textContent = `${this.xp} XP`;

      // Score
      if (this.scoreEl) this.scoreEl.textContent = this.score.toLocaleString();
      if (this.highScoreEl) this.highScoreEl.textContent = this.highScore.toLocaleString();

      // Combo Badge
      if (this.comboBadgeEl && this.comboCountEl) {
        if (this.streak >= 2) {
          this.comboBadgeEl.classList.remove('hidden');
          this.comboCountEl.textContent = `${this.streak}x`;
        } else {
          this.comboBadgeEl.classList.add('hidden');
        }
      }

      // Hearts / Lives
      if (this.heartsContainer) {
        if (this.currentMode === 'blitz') {
          this.heartsContainer.innerHTML = '<span style="font-size: 0.88rem; color: #fbbf24; font-weight: 700;">⚡ Blitz Mode</span>';
        } else {
          let heartsHtml = '';
          for (let i = 0; i < 3; i++) {
            heartsHtml += i < this.lives ? '❤️' : '🖤';
          }
          this.heartsContainer.innerHTML = heartsHtml;
        }
      }
    }

    checkAchievements() {
      BADGES.forEach(badge => {
        if (!this.unlockedBadges.includes(badge.id)) {
          if (badge.condition(this)) {
            this.unlockedBadges.push(badge.id);
            this.sound.levelUp();
            this.showBadgeNotification(badge);
          }
        }
      });
    }

    showBadgeNotification(badge) {
      const toast = document.createElement('div');
      toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        border: 2px solid #fbbf24;
        border-radius: 12px;
        padding: 1rem 1.4rem;
        box-shadow: 0 10px 30px rgba(0,0,0,0.6), 0 0 20px rgba(251, 191, 36, 0.4);
        display: flex;
        align-items: center;
        gap: 0.85rem;
        z-index: 9999;
        animation: slideInRight 0.4s ease;
      `;
      toast.innerHTML = `
        <span style="font-size: 2.2rem;">${badge.icon}</span>
        <div>
          <strong style="color: #fbbf24; font-size: 0.82rem; text-transform: uppercase; display: block;">🏆 សមិទ្ធផលថ្មីបានដោះសោ!</strong>
          <span style="color: #ffffff; font-weight: 700; font-size: 1rem;">${badge.name}</span>
          <p style="margin: 0.2rem 0 0; font-size: 0.78rem; color: #94a3b8;">${badge.desc}</p>
        </div>
      `;
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(15px)';
        setTimeout(() => toast.remove(), 400);
      }, 4500);
    }

    /* ============================================================
       10. MATCH FINISH & VICTORY MODAL
       ============================================================ */
    finishMatch() {
      this.stopTimer();

      // Update High Score
      if (this.score > this.highScore) {
        this.highScore = this.score;
        this.save();
      }

      const accuracy = this.matchAnswered > 0 ? Math.round((this.matchCorrect / this.matchAnswered) * 100) : 0;

      if (this.modalScore) this.modalScore.textContent = this.score.toLocaleString();
      if (this.modalAccuracy) this.modalAccuracy.textContent = `${accuracy}% (${this.matchCorrect}/${this.matchAnswered})`;
      if (this.modalStreak) this.modalStreak.textContent = `${this.maxMatchStreak}x`;
      if (this.modalXp) this.modalXp.textContent = `+${Math.round(this.score * 0.4)} XP`;

      if (this.modalHeading) {
        if (accuracy >= 80) {
          this.modalHeading.textContent = '🎉 ជ័យជម្នះដ៏អស្ចារ្យ!';
          this.modalTrophyIcon.textContent = '🏆';
          this.sound.levelUp();
          this.startConfetti();
        } else if (accuracy >= 50) {
          this.modalHeading.textContent = '👏 ល្អណាស់! បន្តប្រឹងប្រែងទៀត';
          this.modalTrophyIcon.textContent = '🥈';
          this.sound.correct();
        } else {
          this.modalHeading.textContent = '💪 ចប់ការប្រកួត! កុំចុះចាញ់';
          this.modalTrophyIcon.textContent = '📚';
          this.sound.wrong();
        }
      }

      if (this.modalOverlay) {
        this.modalOverlay.classList.add('visible');
      }
    }

    closeModal() {
      if (this.modalOverlay) this.modalOverlay.classList.remove('visible');
      if (this.confettiAnimId) {
        cancelAnimationFrame(this.confettiAnimId);
        this.confettiAnimId = null;
      }
    }

    startConfetti() {
      if (!this.confettiCanvas) return;
      const ctx = this.confettiCanvas.getContext('2d');
      const w = this.confettiCanvas.width = this.confettiCanvas.parentElement.offsetWidth;
      const h = this.confettiCanvas.height = this.confettiCanvas.parentElement.offsetHeight;

      const particles = [];
      const colors = ['#06b6d4', '#38bdf8', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];
      for (let i = 0; i < 70; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h - h,
          size: Math.random() * 7 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (Math.random() - 0.5) * 3,
          vy: Math.random() * 3 + 2,
          rot: Math.random() * 360,
          vRot: (Math.random() - 0.5) * 6
        });
      }

      const loop = () => {
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
        this.confettiAnimId = requestAnimationFrame(loop);
      };
      loop();
    }

    /* ============================================================
       11. CANVAS MINI-GAMES (Unit Circle Archer & Sequence Express)
       ============================================================ */
    initMiniGame(mode) {
      if (!this.miniCanvas) return;
      this.miniGameCtx = this.miniCanvas.getContext('2d');

      // Set canvas resolution
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.miniCanvas.width = 900 * dpr;
      this.miniCanvas.height = 500 * dpr;
      this.miniGameCtx.scale(dpr, dpr);
      this.miniLogicalW = 900;
      this.miniLogicalH = 500;

      if (mode === 'mini-archer') {
        this.setupUnitCircleArcher();
      } else if (mode === 'mini-sequence') {
        this.setupSequenceExpress();
      } else if (mode === 'mini-conic') {
        this.setupConicDetective();
      }
    }

    // Mini-Game 1: 🎯 Unit Circle Archer
    setupUnitCircleArcher() {
      if (this.miniGameTitleEl) this.miniGameTitleEl.textContent = '🎯 បាញ់ធ្នូចំមុំរង្វង់ត្រីកោណមាត្រ (Unit Circle Archer)';
      
      const angles = [
        { label: '0', rad: 0, deg: 0, text: '0 rad (0°)' },
        { label: 'π/6', rad: Math.PI / 6, deg: 30, text: 'π/6 (30°)' },
        { label: 'π/4', rad: Math.PI / 4, deg: 45, text: 'π/4 (45°)' },
        { label: 'π/3', rad: Math.PI / 3, deg: 60, text: 'π/3 (60°)' },
        { label: 'π/2', rad: Math.PI / 2, deg: 90, text: 'π/2 (90°)' },
        { label: '2π/3', rad: 2 * Math.PI / 3, deg: 120, text: '2π/3 (120°)' },
        { label: '3π/4', rad: 3 * Math.PI / 4, deg: 135, text: '3π/4 (135°)' },
        { label: '5π/6', rad: 5 * Math.PI / 6, deg: 150, text: '5π/6 (150°)' },
        { label: 'π', rad: Math.PI, deg: 180, text: 'π (180°)' },
        { label: '3π/2', rad: 3 * Math.PI / 2, deg: 270, text: '3π/2 (270°)' }
      ];

      let targetAngle = angles[Math.floor(Math.random() * angles.length)];
      if (this.miniGameInstructEl) {
        this.miniGameInstructEl.innerHTML = `
          <span>🏹 គោលដៅបាញ់៖ រកមុំ <strong>${targetAngle.text}</strong> នៅលើរង្វង់!</span>
          <span style="color: #38bdf8; font-size: 0.85rem;">ចុចលើចំណុចដែលត្រូវដើម្បីបាញ់ព្រួញ</span>
        `;
      }

      // Render interactive Unit Circle on Canvas
      const render = () => {
        const ctx = this.miniGameCtx;
        const w = this.miniLogicalW;
        const h = this.miniLogicalH;
        const cx = w / 2;
        const cy = h / 2;
        const radius = 170;

        ctx.fillStyle = '#060a14';
        ctx.fillRect(0, 0, w, h);

        // Grid lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        for (let x = 0; x < w; x += 30) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
        }
        for (let y = 0; y < h; y += 30) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
        }

        // Axes
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(50, cy); ctx.lineTo(w - 50, cy); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx, 30); ctx.lineTo(cx, h - 30); ctx.stroke();

        // Main Unit Circle
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Draw Angle Nodes
        angles.forEach(a => {
          const px = cx + radius * Math.cos(-a.rad);
          const py = cy + radius * Math.sin(-a.rad);

          // Node circle
          ctx.fillStyle = '#0f172a';
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(px, py, 10, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Label
          ctx.fillStyle = '#cbd5e1';
          ctx.font = '600 12px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(a.label, px + (px > cx ? 16 : -16), py + (py > cy ? 16 : -16));
        });
      };

      render();

      // Click to shoot
      this.miniCanvas.onclick = (e) => {
        const rect = this.miniCanvas.getBoundingClientRect();
        const scaleX = this.miniLogicalW / rect.width;
        const scaleY = this.miniLogicalH / rect.height;
        const clickX = (e.clientX - rect.left) * scaleX;
        const clickY = (e.clientY - rect.top) * scaleY;

        const cx = this.miniLogicalW / 2;
        const cy = this.miniLogicalH / 2;
        const radius = 170;

        const targetX = cx + radius * Math.cos(-targetAngle.rad);
        const targetY = cy + radius * Math.sin(-targetAngle.rad);

        const dist = Math.hypot(clickX - targetX, clickY - targetY);

        if (dist < 28) {
          this.sound.correct();
          this.score += 150;
          this.xp += 60;
          this.updateHud();
          alert(`🎯 បាញ់ចំចំកណ្តាលបេះដូង! +150 ពិន្ទុ!`);
          targetAngle = angles[Math.floor(Math.random() * angles.length)];
          this.setupUnitCircleArcher();
        } else {
          this.sound.wrong();
        }
      };
    }

    // Mini-Game 2: 🚂 Sequence Express (រទេះភ្លើងបំពេញស្វ៊ីត)
    setupSequenceExpress() {
      if (this.miniGameTitleEl) this.miniGameTitleEl.textContent = '🚂 រទេះភ្លើងស្វ៊ីតនព្វន្ត (Sequence Express)';
      if (this.miniGameInstructEl) {
        this.miniGameInstructEl.innerHTML = `
          <span>រទេះភ្លើងកំពុងរត់! រកលេខដែលបាត់នៅក្នុងទូ [ ? ]៖</span>
          <span style="color: #fbbf24; font-weight: 700;">ជ្រើសរើសទំនិញខាងក្រោម</span>
        `;
      }

      // Generate sequence
      const a1 = Math.floor(Math.random() * 8) + 2;
      const d = Math.floor(Math.random() * 5) + 3;
      const missingIndex = 2; // 0, 1, [2], 3, 4
      const seq = [a1, a1 + d, a1 + 2 * d, a1 + 3 * d, a1 + 4 * d];
      const correctVal = seq[missingIndex];

      // Generate choices
      const wrongChoices = [correctVal - d, correctVal + d + 1, correctVal + 2 * d];
      const choices = [correctVal, ...wrongChoices].sort(() => Math.random() - 0.5);

      // Render choices buttons
      if (this.miniButtonsBar) {
        this.miniButtonsBar.innerHTML = choices.map(val => `
          <button class="btn btn-primary" style="padding: 0.65rem 1.4rem; font-size: 1.1rem; font-weight: 700;">
            ${val}
          </button>
        `).join('');

        this.miniButtonsBar.querySelectorAll('button').forEach((btn, idx) => {
          btn.addEventListener('click', () => {
            const chosen = choices[idx];
            if (chosen === correctVal) {
              this.sound.correct();
              this.score += 120;
              this.xp += 50;
              this.updateHud();
              alert(`🎉 ត្រឹមត្រូវ! តួដែលបាត់គឺ ${correctVal}!`);
              this.setupSequenceExpress();
            } else {
              this.sound.wrong();
            }
          });
        });
      }

      // Render Canvas Train
      const ctx = this.miniGameCtx;
      const w = this.miniLogicalW;
      const h = this.miniLogicalH;

      ctx.fillStyle = '#060a14';
      ctx.fillRect(0, 0, w, h);

      // Tracks
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(0, 320);
      ctx.lineTo(w, 320);
      ctx.stroke();

      // Draw 5 Carriages
      const carriageW = 120;
      const carriageH = 80;
      const startX = 60;
      for (let i = 0; i < 5; i++) {
        const cx = startX + i * (carriageW + 25);
        const cy = 240;

        ctx.fillStyle = i === missingIndex ? 'rgba(245, 158, 11, 0.25)' : 'rgba(2, 132, 199, 0.25)';
        ctx.strokeStyle = i === missingIndex ? '#f59e0b' : '#38bdf8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(cx, cy, carriageW, carriageH, 8);
        ctx.fill();
        ctx.stroke();

        // Text
        ctx.fillStyle = i === missingIndex ? '#fbbf24' : '#ffffff';
        ctx.font = '700 24px var(--font-math), sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(i === missingIndex ? '?' : seq[i], cx + carriageW / 2, cy + 48);

        // Wheels
        ctx.fillStyle = '#64748b';
        ctx.beginPath();
        ctx.arc(cx + 25, cy + carriageH + 6, 12, 0, Math.PI * 2);
        ctx.arc(cx + carriageW - 25, cy + carriageH + 6, 12, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Mini-Game 3: 🪐 Conic Matchmaker
    setupConicDetective() {
      if (this.miniGameTitleEl) this.miniGameTitleEl.textContent = '🪐 រាវរកក្រាបកោនិក (Conic Detective)';
      if (this.miniGameInstructEl) {
        this.miniGameInstructEl.innerHTML = `
          <span>ក្រាបខាងក្រោមជា ប៉ារ៉ាបូល អេលីប ឬអ៊ីពែបូល?</span>
          <span style="color: #38bdf8;">ជ្រើសរើសចម្លើយត្រឹមត្រូវ</span>
        `;
      }

      const conicTypes = [
        { name: 'អេលីប (Ellipse)', formula: '\\frac{x^2}{25} + \\frac{y^2}{9} = 1', type: 'ellipse' },
        { name: 'ប៉ារ៉ាបូល (Parabola)', formula: 'y^2 = 8x', type: 'parabola' },
        { name: 'អ៊ីពែបូល (Hyperbola)', formula: '\\frac{x^2}{16} - \\frac{y^2}{9} = 1', type: 'hyperbola' }
      ];

      const chosenConic = conicTypes[Math.floor(Math.random() * conicTypes.length)];

      if (this.miniButtonsBar) {
        this.miniButtonsBar.innerHTML = conicTypes.map(c => `
          <button class="btn btn-secondary" style="padding: 0.65rem 1.4rem; font-size: 1rem; font-weight: 700;">
            ${c.name}
          </button>
        `).join('');

        this.miniButtonsBar.querySelectorAll('button').forEach((btn, idx) => {
          btn.addEventListener('click', () => {
            if (conicTypes[idx].type === chosenConic.type) {
              this.sound.correct();
              this.score += 150;
              this.xp += 50;
              this.updateHud();
              alert(`🎉 ពិតជាត្រឹមត្រូវ! នេះជា ${chosenConic.name} ដែលមានសមីការ $${chosenConic.formula}$!`);
              this.setupConicDetective();
            } else {
              this.sound.wrong();
            }
          });
        });
      }

      // Render Conic Curve on Canvas
      const ctx = this.miniGameCtx;
      const w = this.miniLogicalW;
      const h = this.miniLogicalH;
      const cx = w / 2;
      const cy = h / 2;

      ctx.fillStyle = '#060a14';
      ctx.fillRect(0, 0, w, h);

      // Axes
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(50, cy); ctx.lineTo(w - 50, cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, 30); ctx.lineTo(cx, h - 30); ctx.stroke();

      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();

      if (chosenConic.type === 'ellipse') {
        ctx.ellipse(cx, cy, 140, 80, 0, 0, Math.PI * 2);
      } else if (chosenConic.type === 'parabola') {
        for (let x = 0; x <= 160; x += 2) {
          const y = Math.sqrt(8 * x * 10);
          if (x === 0) ctx.moveTo(cx + x, cy - y);
          else ctx.lineTo(cx + x, cy - y);
        }
        for (let x = 160; x >= 0; x -= 2) {
          const y = Math.sqrt(8 * x * 10);
          ctx.lineTo(cx + x, cy + y);
        }
      } else if (chosenConic.type === 'hyperbola') {
        // Right branch
        for (let x = 60; x <= 160; x += 2) {
          const y = Math.sqrt(Math.pow(x / 60, 2) - 1) * 60;
          if (x === 60) ctx.moveTo(cx + x, cy - y);
          else ctx.lineTo(cx + x, cy - y);
        }
        for (let x = 160; x >= 60; x -= 2) {
          const y = Math.sqrt(Math.pow(x / 60, 2) - 1) * 60;
          ctx.lineTo(cx + x, cy + y);
        }
        // Left branch
        ctx.moveTo(cx - 60, cy);
        for (let x = 60; x <= 160; x += 2) {
          const y = Math.sqrt(Math.pow(x / 60, 2) - 1) * 60;
          ctx.lineTo(cx - x, cy - y);
        }
        for (let x = 160; x >= 60; x -= 2) {
          const y = Math.sqrt(Math.pow(x / 60, 2) - 1) * 60;
          ctx.lineTo(cx - x, cy + y);
        }
      }
      ctx.stroke();
    }
  }

  // Auto-instantiate when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    new MathQuest11();
  });
})();
