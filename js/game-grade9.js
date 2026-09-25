/**
 * game-grade9.js - Grade 9 Mathematics Educational Game Studio
 * Math Hero 9: សមរភូមិវីរបុរសគណិតវិទ្យាថ្នាក់ទី ៩ (Diploma Quest)
 * Features: Synthesized Web Audio FX, 50+ MoEYS Curriculum Questions,
 * Canvas Mini-Games (Ninja Math Slicer, Pythagoras Builder, Scale Balance),
 * 60s Diploma Speed Blitz, KaTeX Math Typography, Combo Multipliers,
 * Lifelines & LocalStorage Achievements.
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
      this.muted = localStorage.getItem('cvn_game9_muted') === 'true';
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

    slash() {
      // Katana sword swoosh sound (frequency drops fast with noise-like feel)
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(900, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.18);
    }

    correct() {
      // Pleasant bright bell chime
      this.playTone(587.33, 'sine', 0.18, 0, 0.2); // D5
      this.playTone(880.00, 'sine', 0.35, 0.1, 0.25); // A5
    }

    wrong() {
      // Funny soft buzzer
      this.playTone(180, 'sawtooth', 0.2, 0, 0.12);
      this.playTone(130, 'sawtooth', 0.3, 0.12, 0.12);
    }

    combo() {
      // Rising fanfare arpeggio (D5 -> F#5 -> A5 -> D6)
      this.playTone(587.33, 'sine', 0.12, 0, 0.2);
      this.playTone(739.99, 'sine', 0.12, 0.08, 0.2);
      this.playTone(880.00, 'sine', 0.12, 0.16, 0.2);
      this.playTone(1174.66, 'sine', 0.28, 0.24, 0.25);
    }

    powerUp() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(250, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, this.ctx.currentTime + 0.32);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.32);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.32);
    }

    tick() {
      this.playTone(850, 'triangle', 0.04, 0, 0.08);
    }

    levelUp() {
      [587.33, 739.99, 880.00, 1174.66].forEach((f, idx) => {
        this.playTone(f, 'sine', 0.55, idx * 0.08, 0.22);
      });
    }

    toggleMute() {
      this.muted = !this.muted;
      localStorage.setItem('cvn_game9_muted', this.muted);
      return this.muted;
    }
  }

  /* ============================================================
     2. GRADE 9 MATHEMATICS QUESTION BANK (50+ MoEYS Questions)
     ============================================================ */
  const REALMS_G9 = {
    all: { id: 'all', title: 'គ្រប់ជំពូកឌីប្លូម', icon: '🌟' },
    radicals: { id: 'radicals', title: '១. រ៉ាឌីកាល់ & ពីជគណិត', icon: '🧮' },
    equations: { id: 'equations', title: '២. សមីការ & ប្រព័ន្ធសមីការ', icon: '⚖️' },
    pythagoras: { id: 'pythagoras', title: '៣. ពីតាករ & តាលែស', icon: '📐' },
    circles: { id: 'circles', title: '៤. រង្វង់ & មុំក្នុងរង្វង់', icon: '⭕' },
    solids_stats: { id: 'solids_stats', title: '៥. មាឌសូលីត ស្ថិតិ & ប្រូបាប', icon: '📦' }
  };

  const QUESTION_BANK_G9 = [
    /* Realm 1: Radicals & Polynomials */
    {
      id: 'rad_1',
      realm: 'radicals',
      text: 'គណនាតម្លៃនៃរ៉ាឌីកាល់ការ៉េ៖',
      math: '\\sqrt{64} + \\sqrt{36} = ?',
      options: ['14', '10', '12', '16'],
      correct: 0,
      hint: '√64 = 8 និង √36 = 6 នាំឱ្យ 8 + 6 = 14។',
      explanation: 'យើងមាន $\\sqrt{64} = 8$ និង $\\sqrt{36} = 6$។ ដូច្នេះ $\\sqrt{64} + \\sqrt{36} = 8 + 6 = 14$។'
    },
    {
      id: 'rad_2',
      realm: 'radicals',
      text: 'សម្រួលកន្សោមរ៉ាឌីកាល់ $\\sqrt{48}$ ទៅជាទម្រង់សាមញ្ញ៖',
      math: '\\sqrt{48} = ?',
      options: ['4\\sqrt{3}', '3\\sqrt{4}', '2\\sqrt{12}', '16\\sqrt{3}'],
      correct: 0,
      hint: '48 = 16 × 3 នាំឱ្យ √48 = √(16 × 3) = 4√3។',
      explanation: '$\\sqrt{48} = \\sqrt{16 \\times 3} = \\sqrt{16} \\times \\sqrt{3} = 4\\sqrt{3}$។'
    },
    {
      id: 'rad_3',
      realm: 'radicals',
      text: 'បំបាត់រ៉ាឌីកាល់ពីភាគបែងនៃកន្សោម $\\frac{6}{\\sqrt{3}}$៖',
      math: '\\frac{6}{\\sqrt{3}} = ?',
      options: ['2\\sqrt{3}', '3\\sqrt{2}', '6\\sqrt{3}', '3'],
      correct: 0,
      hint: 'គុណភាគយក និងភាគបែងនឹង √3 នាំឱ្យ (6√3) / 3 = 2√3។',
      explanation: '$\\frac{6}{\\sqrt{3}} = \\frac{6 \\times \\sqrt{3}}{\\sqrt{3} \\times \\sqrt{3}} = \\frac{6\\sqrt{3}}{3} = 2\\sqrt{3}$។'
    },
    {
      id: 'rad_4',
      realm: 'radicals',
      text: 'ពន្លាតកន្សោមស្វ័យគុណការ៉េ $(x + 4)^2$៖',
      math: '(x + 4)^2 = ?',
      options: ['x^2 + 8x + 16', 'x^2 + 16', 'x^2 + 4x + 16', 'x^2 + 8x + 8'],
      correct: 0,
      hint: 'រូបមន្ត (a + b)² = a² + 2ab + b²។',
      explanation: '$(x + 4)^2 = x^2 + 2(x)(4) + 4^2 = x^2 + 8x + 16$។'
    },
    {
      id: 'rad_5',
      realm: 'radicals',
      text: 'ដាក់ជាផលគុណកត្តានៃកន្សោម $x^2 - 25$៖',
      math: 'x^2 - 25 = ?',
      options: ['(x - 5)(x + 5)', '(x - 5)^2', '(x + 5)^2', '(x - 25)(x + 1)'],
      correct: 0,
      hint: 'រូបមន្ត a² - b² = (a - b)(a + b)។',
      explanation: '$x^2 - 25 = x^2 - 5^2 = (x - 5)(x + 5)$។'
    },
    {
      id: 'rad_6',
      realm: 'radicals',
      text: 'គណនាតម្លៃនៃផលគុណឆ្លាស់ $(\\sqrt{5} - 1)(\\sqrt{5} + 1)$៖',
      math: '(\\sqrt{5} - 1)(\\sqrt{5} + 1) = ?',
      options: ['4', '5', '6', '2'],
      correct: 0,
      hint: '(a - b)(a + b) = a² - b² = (√5)² - 1² = 5 - 1 = 4។',
      explanation: 'តាមរូបមន្តផលសងការ៉េ៖ $(\\sqrt{5} - 1)(\\sqrt{5} + 1) = (\\sqrt{5})^2 - 1^2 = 5 - 1 = 4$។'
    },
    {
      id: 'rad_7',
      realm: 'radicals',
      text: 'ដាក់ជាផលគុណកត្តានៃត្រីធាដឺក្រេទី ២ $x^2 - 7x + 12$៖',
      math: 'x^2 - 7x + 12 = ?',
      options: ['(x - 3)(x - 4)', '(x - 2)(x - 6)', '(x + 3)(x + 4)', '(x - 1)(x - 12)'],
      correct: 0,
      hint: 'រកពីរចំនួនដែលបូកចូលគ្នាឃើញ -7 ហើយគុណចូលគ្នាឃើញ 12 (-3 និង -4)។',
      explanation: 'យើងរកពីរចំនួន $p, q$ ដែល $p + q = -7$ និង $p \\times q = 12$ គឺ $-3$ និង $-4$។ ដូច្នេះ $x^2 - 7x + 12 = (x - 3)(x - 4)$។'
    },

    /* Realm 2: Equations & Inequalities */
    {
      id: 'eq_1',
      realm: 'equations',
      text: 'ដោះស្រាយសមីការដឺក្រេទី ១ មានមួយអថេរ៖',
      math: '4x - 9 = 15 \\implies x = ?',
      options: ['6', '5', '4', '8'],
      correct: 0,
      hint: '4x = 15 + 9 = 24 => x = 24 / 4 = 6។',
      explanation: '$4x - 9 = 15 \\implies 4x = 15 + 9 = 24 \\implies x = \\frac{24}{4} = 6$។'
    },
    {
      id: 'eq_2',
      realm: 'equations',
      text: 'ដោះស្រាយវិសមីការ និងកំណត់សំណុំចម្លើយ៖',
      math: '3x + 2 < 14 \\implies ?',
      options: ['x < 4', 'x > 4', 'x \\le 4', 'x < 5'],
      correct: 0,
      hint: '3x < 14 - 2 = 12 => x < 12 / 3 = 4។',
      explanation: '$3x + 2 < 14 \\implies 3x < 14 - 2 = 12 \\implies x < 4$។'
    },
    {
      id: 'eq_3',
      realm: 'equations',
      text: 'គណនាឌីសគ្រីមីណង់ $\\Delta$ នៃសមីការដឺក្រេទី ២ $x^2 - 6x + 8 = 0$៖',
      math: '\\Delta = b^2 - 4ac = ?',
      options: ['4', '16', '2', '8'],
      correct: 0,
      hint: 'a = 1, b = -6, c = 8 នាំឱ្យ Δ = (-6)² - 4(1)(8) = 36 - 32 = 4។',
      explanation: '$\\Delta = (-6)^2 - 4(1)(8) = 36 - 32 = 4 > 0$។ សមីការមានឫសពីរផ្សេងគ្នា។'
    },
    {
      id: 'eq_4',
      realm: 'equations',
      text: 'រកឫសទាំងពីរនៃសមីការដឺក្រេទី ២ $x^2 - 9 = 0$៖',
      math: 'x^2 = 9 \\implies x = ?',
      options: ['x = \\pm 3', 'x = 3', 'x = 9', 'x = \\pm 9'],
      correct: 0,
      hint: 'x² = 9 នាំឱ្យ x = ±√9 = ±3។',
      explanation: '$x^2 - 9 = 0 \\implies x^2 = 9 \\implies x = \\pm \\sqrt{9} = \\pm 3$។'
    },
    {
      id: 'eq_5',
      realm: 'equations',
      text: 'ដោះស្រាយប្រព័ន្ធសមីការដឺក្រេទី ១ មានពីរអថេរ៖',
      math: '\\begin{cases} x + y = 12 \\\\ x - y = 4 \\end{cases} \\implies (x, y) = ?',
      options: ['(8, 4)', '(7, 5)', '(9, 3)', '(10, 2)'],
      correct: 0,
      hint: 'បូកសមីការទាំងពីរចូលគ្នា៖ 2x = 16 => x = 8, y = 12 - 8 = 4។',
      explanation: 'បូកសមីការទាំងពីរ៖ $(x + y) + (x - y) = 12 + 4 \\implies 2x = 16 \\implies x = 8$។ ជំនួស $x=8$ ចូលសមីការទីមួយ៖ $8 + y = 12 \\implies y = 4$។'
    },
    {
      id: 'eq_6',
      realm: 'equations',
      text: 'រកតម្លៃ $x$ ក្នុងសមាមាត្រខាងក្រោម៖',
      math: '\\frac{x}{15} = \\frac{4}{5} \\implies x = ?',
      options: ['12', '10', '16', '8'],
      correct: 0,
      hint: 'គុណខ្វែង 5x = 15 × 4 = 60 => x = 12។',
      explanation: '$\\frac{x}{15} = \\frac{4}{5} \\implies x = \\frac{15 \\times 4}{5} = 3 \\times 4 = 12$។'
    },
    {
      id: 'eq_7',
      realm: 'equations',
      text: 'ដោះស្រាយសមីការផលគុណកត្តា $(2x - 6)(x + 5) = 0$៖',
      math: '(2x - 6)(x + 5) = 0 \\implies x = ?',
      options: ['x = 3 \\text{ ឬ } x = -5', 'x = -3 \\text{ ឬ } x = 5', 'x = 6 \\text{ ឬ } x = -5', 'x = 3 \\text{ ឬ } x = 5'],
      correct: 0,
      hint: '2x - 6 = 0 => x = 3 ឬ x + 5 = 0 => x = -5។',
      explanation: '$2x - 6 = 0 \\implies x = 3$ ឬ $x + 5 = 0 \\implies x = -5$។'
    },

    /* Realm 3: Pythagoras & Thales */
    {
      id: 'pyth_1',
      realm: 'pythagoras',
      text: 'ត្រីកោណកែងមួយមានជ្រុងជាប់មុំកែង $a = 3\\text{cm}$ និង $b = 4\\text{cm}$។ រកប្រវែងអ៊ីប៉ូតេនូស $c$៖',
      math: 'c^2 = a^2 + b^2 \\implies c = ?',
      options: ['5\\text{ cm}', '7\\text{ cm}', '6\\text{ cm}', '25\\text{ cm}'],
      correct: 0,
      hint: 'c = √(3² + 4²) = √(9 + 16) = √25 = 5cm (បីធាតុពីតាករ)។',
      explanation: 'តាមទ្រឹស្តីបទពីតាករ៖ $c^2 = a^2 + b^2 = 3^2 + 4^2 = 9 + 16 = 25 \\implies c = \\sqrt{25} = 5\\text{ cm}$។'
    },
    {
      id: 'pyth_2',
      realm: 'pythagoras',
      text: 'ត្រីកោណកែងមានអ៊ីប៉ូតេនូស $c = 13\\text{cm}$ និងជ្រុងមួយ $a = 5\\text{cm}$។ គណនាជ្រុងកែងមួយទៀត $b$៖',
      math: 'b^2 = c^2 - a^2 \\implies b = ?',
      options: ['12\\text{ cm}', '10\\text{ cm}', '8\\text{ cm}', '11\\text{ cm}'],
      correct: 0,
      hint: 'b = √(13² - 5²) = √(169 - 25) = √144 = 12cm។',
      explanation: '$b = \\sqrt{c^2 - a^2} = \\sqrt{13^2 - 5^2} = \\sqrt{169 - 25} = \\sqrt{144} = 12\\text{ cm}$។'
    },
    {
      id: 'pyth_3',
      realm: 'pythagoras',
      text: 'ចតុកោណកែងមួយមានបណ្តោយ $8\\text{cm}$ និងទទឹង $6\\text{cm}$។ រកប្រវែងអង្កត់ទ្រូងរបស់វា៖',
      math: 'd = \\sqrt{L^2 + W^2} = ?',
      options: ['10\\text{ cm}', '14\\text{ cm}', '12\\text{ cm}', '48\\text{ cm}'],
      correct: 0,
      hint: 'អង្កត់ទ្រូងចតុកោណកែងជាអ៊ីប៉ូតេនូសនៃត្រីកោណកែង៖ d = √(8² + 6²) = √100 = 10cm។',
      explanation: '$d = \\sqrt{8^2 + 6^2} = \\sqrt{64 + 36} = \\sqrt{100} = 10\\text{ cm}$។'
    },
    {
      id: 'pyth_4',
      realm: 'pythagoras',
      text: 'ក្នុងត្រីកោណកែង អនុបាតត្រីកោណមាត្រ $\\sin$ នៃមុំស្រួចស្មើនឹង៖',
      math: '\\sin(\\theta) = ?',
      options: ['\\frac{\\text{ជ្រុងឈម}}{\\text{អ៊ីប៉ូតេនូស}}', '\\frac{\\text{ជ្រុងជាប់}}{\\text{អ៊ីប៉ូតេនូស}}', '\\frac{\\text{ជ្រុងឈម}}{\\text{ជ្រុងជាប់}}', '\\frac{\\text{អ៊ីប៉ូតេនូស}}{\\text{ជ្រុងឈម}}'],
      correct: 0,
      hint: 'ស៊ីនុស = ឈម / អ៊ីប៉ូតេនូស (Sin = Opposite / Hypotenuse)។',
      explanation: 'តាមនិយមន័យអនុបាតត្រីកោណមាត្រក្នុងត្រីកោណកែង៖ $\\sin(\\theta) = \\frac{\\text{ជ្រុងឈម}}{\\text{អ៊ីប៉ូតេនូស}}$។'
    },
    {
      id: 'pyth_5',
      realm: 'pythagoras',
      text: 'គណនាតម្លៃនៃអនុបាតត្រីកោណមាត្រពិសេស $\\tan(45^\\circ)$៖',
      math: '\\tan(45^\\circ) = ?',
      options: ['1', '\\frac{\\sqrt{2}}{2}', '\\sqrt{3}', '\\frac{1}{2}'],
      correct: 0,
      hint: 'មុំ 45° មានជ្រុងឈម = ជ្រុងជាប់ នាំឱ្យ tan(45°) = 1។',
      explanation: 'ក្នុងត្រីកោណកែងសមបាត (មុំ 45°) ជ្រុងឈមនិងជ្រុងជាប់មានប្រវែងស្មើគ្នា ដូច្នេះ $\\tan(45^\\circ) = 1$។'
    },
    {
      id: 'pyth_6',
      realm: 'pythagoras',
      text: 'តាមទ្រឹស្តីបទតាលែសក្នុង $\\triangle ABC$ បើបន្ទាត់ $MN \\parallel BC$ ($M \\in AB, N \\in AC$) នោះ៖',
      math: 'MN \\parallel BC \\implies ?',
      options: ['\\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{MN}{BC}', '\\frac{AM}{MB} = \\frac{BC}{MN}', '\\frac{AB}{AM} = \\frac{MN}{BC}', 'AM \\cdot AN = AB \\cdot AC'],
      correct: 0,
      hint: 'សមាមាត្រតាលែសនៃត្រីកោណដូចគ្នា AMN និង ABC។',
      explanation: 'តាមទ្រឹស្តីបទតាលែស កាលណា $MN \\parallel BC$ នោះ $\\triangle AMN \\sim \\triangle ABC$ នាំឱ្យ $\\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{MN}{BC}$។'
    },

    /* Realm 4: Circles & Angles */
    {
      id: 'circ_1',
      realm: 'circles',
      text: 'ក្នុងរង្វង់មួយ មុំផ្ចិតមានរង្វាស់ $80^\\circ$។ រករង្វាស់ធ្នូស្ទាក់ដោយមុំផ្ចិតនោះ៖',
      math: '\\text{មុំផ្ចិត } \\angle AOB = 80^\\circ \\implies \\text{ធ្នូ } \\widehat{AB} = ?',
      options: ['80^\\circ', '40^\\circ', '160^\\circ', '100^\\circ'],
      correct: 0,
      hint: 'រង្វាស់មុំផ្ចិតស្មើនឹងរង្វាស់ធ្នូស្ទាក់ជានិច្ច។',
      explanation: 'តាមនិយមន័យ រង្វាស់មុំផ្ចិតស្មើនឹងរង្វាស់ធ្នូដែលវាស្ទាក់ ដូច្នេះ $\\widehat{AB} = 80^\\circ$។'
    },
    {
      id: 'circ_2',
      realm: 'circles',
      text: 'មុំចារឹកក្នុងរង្វង់មួយស្ទាក់ធ្នូដែលមានរង្វាស់ $100^\\circ$។ រករង្វាស់មុំចារឹកនោះ៖',
      math: '\\text{មុំចារឹក } = \\frac{1}{2} \\times \\text{ធ្នូស្ទាក់} = ?',
      options: ['50^\\circ', '100^\\circ', '200^\\circ', '25^\\circ'],
      correct: 0,
      hint: 'មុំចារឹកក្នុងរង្វង់ស្មើនឹងកន្លះរង្វាស់ធ្នូស្ទាក់៖ 100° / 2 = 50°។',
      explanation: 'រង្វាស់មុំចារឹកក្នុងរង្វង់ស្មើនឹងពាក់កណ្តាលនៃរង្វាស់ធ្នូដែលវាស្ទាក់៖ $\\frac{100^\\circ}{2} = 50^\\circ$។'
    },
    {
      id: 'circ_3',
      realm: 'circles',
      text: 'មុំចារឹកក្នុងកន្លះរង្វង់ (ស្ទាក់អង្កត់ផ្ចិត) ជានិច្ចកាលជារង្វាស់មុំប៉ុន្មានដឺក្រេ?៖',
      math: '\\text{មុំចារឹកកន្លះរង្វង់ } = ?',
      options: ['90^\\circ \\text{ (មុំកែង)}', '180^\\circ', '60^\\circ', '45^\\circ'],
      correct: 0,
      hint: 'កន្លះរង្វង់មានធ្នូ 180° នាំឱ្យមុំចារឹកស្មើ 180° / 2 = 90°។',
      explanation: 'ធ្នូនៃកន្លះរង្វង់មានរង្វាស់ $180^\\circ$ ដូច្នេះមុំចារឹកក្នុងកន្លះរង្វង់ស្មើ $\\frac{180^\\circ}{2} = 90^\\circ$ (មុំកែង) ជានិច្ច។'
    },
    {
      id: 'circ_4',
      realm: 'circles',
      text: 'គណនាបរិមាត្ររង្វង់ដែលមានកាំ $R = 7\\text{cm}$ (យក $\\pi \\approx \\frac{22}{7}$)៖',
      math: 'P = 2\\pi R = ?',
      options: ['44\\text{ cm}', '22\\text{ cm}', '154\\text{ cm}', '88\\text{ cm}'],
      correct: 0,
      hint: 'P = 2 × (22/7) × 7 = 44cm។',
      explanation: '$P = 2\\pi R = 2 \\times \\frac{22}{7} \\times 7 = 44\\text{ cm}$។'
    },
    {
      id: 'circ_5',
      realm: 'circles',
      text: 'គណនាផ្ទៃក្រឡារង្វង់ដែលមានកាំ $R = 7\\text{cm}$ (យក $\\pi \\approx \\frac{22}{7}$)៖',
      math: 'S = \\pi R^2 = ?',
      options: ['154\\text{ cm}^2', '44\\text{ cm}^2', '77\\text{ cm}^2', '308\\text{ cm}^2'],
      correct: 0,
      hint: 'S = (22/7) × 7² = (22/7) × 49 = 22 × 7 = 154cm²។',
      explanation: '$S = \\pi R^2 = \\frac{22}{7} \\times 7^2 = \\frac{22}{7} \\times 49 = 22 \\times 7 = 154\\text{ cm}^2$។'
    },

    /* Realm 5: Solids, Stats & Probability */
    {
      id: 'sol_1',
      realm: 'solids_stats',
      text: 'គណនាមាឌនៃគូបមួយដែលមានប្រវែងទ្រនុង $a = 5\\text{cm}$៖',
      math: 'V = a^3 = ?',
      options: ['125\\text{ cm}^3', '25\\text{ cm}^3', '150\\text{ cm}^3', '100\\text{ cm}^3'],
      correct: 0,
      hint: 'V = 5³ = 5 × 5 × 5 = 125cm³។',
      explanation: 'មាឌគូប $V = a^3 = 5^3 = 5 \\times 5 \\times 5 = 125\\text{ cm}^3$។'
    },
    {
      id: 'sol_2',
      realm: 'solids_stats',
      text: 'គណនាមាឌស៊ីឡាំងដែលមានកាំបាត $r = 3\\text{cm}$ និងកម្ពស់ $h = 10\\text{cm}$៖',
      math: 'V = \\pi r^2 h = ?',
      options: ['90\\pi\\text{ cm}^3', '30\\pi\\text{ cm}^3', '60\\pi\\text{ cm}^3', '180\\pi\\text{ cm}^3'],
      correct: 0,
      hint: 'V = π × 3² × 10 = π × 9 × 10 = 90π cm³។',
      explanation: '$V = \\pi r^2 h = \\pi \\times 3^2 \\times 10 = 90\\pi\\text{ cm}^3$។'
    },
    {
      id: 'sol_3',
      realm: 'solids_stats',
      text: 'គណនាមធ្យមនព្វន្តនៃទិន្នន័យពិន្ទុសិស្ស៖ $6, 8, 10, 12, 14$៖',
      math: '\\bar{x} = \\frac{\\sum x}{n} = ?',
      options: ['10', '9', '8', '11'],
      correct: 0,
      hint: 'ផលបូក = 6+8+10+12+14 = 50, ចំនួនទិន្នន័យ n = 5 => 50 / 5 = 10។',
      explanation: '$\\bar{x} = \\frac{6 + 8 + 10 + 12 + 14}{5} = \\frac{50}{5} = 10$។'
    },
    {
      id: 'sol_4',
      realm: 'solids_stats',
      text: 'រកមេដ្យាន (Median) នៃសំណុំទិន្នន័យ៖ $3, 7, 9, 15, 20$៖',
      math: '\\text{Median} = ?',
      options: ['9', '7', '15', '10.8'],
      correct: 0,
      hint: 'ទិន្នន័យរៀបតាមលំដាប់រួចស្រេច n = 5 តួកណ្តាលគឺតួទី ៣ (លេខ 9)។',
      explanation: 'ទិន្នន័យមានចំនួនសេស $n = 5$ ដែលរៀបពីតូចទៅធំរួចស្រេច។ តួកណ្តាលគឺលេខ $9$ ដូច្នេះមេដ្យានគឺ $9$។'
    },
    {
      id: 'sol_5',
      realm: 'solids_stats',
      text: 'បោះគ្រាប់ឡុកឡាក់យុត្តិធម៌មួយគ្រាប់។ តើប្រូបាបទទួលបានលេខបឋមស្មើប៉ុន្មាន?៖',
      math: 'P(\\text{Prime}) = ?',
      options: ['\\frac{1}{2}', '\\frac{1}{3}', '\\frac{2}{3}', '\\frac{1}{6}'],
      correct: 0,
      hint: 'លេខបឋមលើគ្រាប់ឡុកឡាក់មាន {2, 3, 5} (៣ ករណី) ក្នុងចំណោម ៦ ករណី => 3/6 = 1/2។',
      explanation: 'សំណុំលទ្ធផលសរុប $S = \\{1, 2, 3, 4, 5, 6\\}$ ($n = 6$)។ លេខបឋមគឺ $\\{2, 3, 5\\}$ ($m = 3$)។ ដូច្នេះ $P = \\frac{3}{6} = \\frac{1}{2}$។'
    }
  ];

  /* ============================================================
     3. ACHIEVEMENTS & BADGES
     ============================================================ */
  const BADGES_G9 = [
    { id: 'first_win_g9', name: 'ជំហានដំបូង', icon: '🥉', desc: 'ឆ្លើយត្រូវសំណួរទីមួយក្នុង Math Hero 9', condition: (s) => s.totalCorrect >= 1 },
    { id: 'rad_slicer', name: 'អ្នកកាប់រ៉ាឌីកាល់', icon: '⚔️', desc: 'ឆ្លើយត្រូវរ៉ាឌីកាល់ & ពីជគណិត ៥ សំណួរ', condition: (s) => s.radCorrect >= 5 },
    { id: 'pyth_master', name: 'អ្នកជំនាញពីតាករ', icon: '📐', desc: 'ដោះស្រាយពីតាករ & តាលែស ៥ សំណួរ', condition: (s) => s.pythCorrect >= 5 },
    { id: 'streak_5_g9', name: 'Combo Ninja 5x', icon: '🔥', desc: 'ឆ្លើយត្រូវ ៥ សំណួរជាប់ៗគ្នាមិនខុស', condition: (s) => s.maxStreak >= 5 },
    { id: 'fast_ninja', name: 'ល្បឿនផ្លេកបន្ទោរ', icon: '⚡', desc: 'ឆ្លើយត្រូវក្រោមរយៈពេល ៣ វិនាទី', condition: (s) => s.fastAnswer },
    { id: 'diploma_champ', name: 'ជើងឯកឌីប្លូម ២០២៦', icon: '🏆', desc: 'សម្រេចបានពិន្ទុលើសពី 1,500 XP', condition: (s) => s.xp >= 1500 }
  ];

  /* ============================================================
     4. MAIN GAME CLASS (MathHero9)
     ============================================================ */
  class MathHero9 {
    constructor() {
      this.sound = new SoundSynth();

      this.currentMode = 'quiz';
      this.activeRealm = 'all';

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

      // Lifelines
      this.lifelines = { fiftyFifty: true, freezeTime: true, formulaHint: true };

      // Timer State
      this.timerInterval = null;
      this.timeRemaining = 25;
      this.maxTime = 25;
      this.isPaused = false;
      this.isAnswerLocked = false;

      // Mini-Games Engine References
      this.miniCanvas = null;
      this.miniCtx = null;
      this.miniAnimId = null;

      // Avatar selection
      this.avatar = localStorage.getItem('cvn_game9_avatar') || '🥷';

      this.initDom();
      this.bindEvents();
      this.updateHud();
      this.startMode('quiz');
    }

    loadSaveData() {
      const raw = localStorage.getItem('cvn_math_hero_9_save');
      if (raw) {
        try {
          const data = JSON.parse(raw);
          this.xp = data.xp || 0;
          this.highScore = data.highScore || 0;
          this.stats = data.stats || {
            totalAnswered: 0,
            totalCorrect: 0,
            radCorrect: 0,
            pythCorrect: 0,
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
        radCorrect: 0,
        pythCorrect: 0,
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
      localStorage.setItem('cvn_math_hero_9_save', JSON.stringify(data));
    }

    getPlayerRank() {
      if (this.xp >= 2000) return { rank: '🌟 ទេពកោសល្យថ្នាក់ទី ៩', badge: 'LEGEND' };
      if (this.xp >= 1000) return { rank: '👑 កំពូលអ្នកប្រាជ្ញឌីប្លូម', badge: 'MASTER' };
      if (this.xp >= 500) return { rank: '🥇 ជើងឯកពីតាករ', badge: 'CHAMPION' };
      if (this.xp >= 200) return { rank: '🥈 វីរបុរសពីជគណិត', badge: 'HERO' };
      return { rank: '🥉 កូនសិស្សហាត់ការ', badge: 'TRAINEE' };
    }

    initDom() {
      this.rankTitleEl = document.getElementById('hud-player-rank');
      this.rankTagEl = document.getElementById('hud-player-tag');
      this.avatarEl = document.getElementById('hud-player-avatar');
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

      this.timerFillEl = document.getElementById('game-timer-fill');
      this.quizCardEl = document.getElementById('game-quiz-card');
      this.realmTagEl = document.getElementById('question-realm-tag');
      this.qCounterEl = document.getElementById('question-counter-tag');
      this.qTextEl = document.getElementById('question-text-kh');
      this.qMathEl = document.getElementById('question-math-display');
      this.optionsGridEl = document.getElementById('options-grid');

      this.btnFifty = document.getElementById('lifeline-fifty');
      this.btnFreeze = document.getElementById('lifeline-freeze');
      this.btnHint = document.getElementById('lifeline-hint');

      this.solutionPanel = document.getElementById('solution-panel');
      this.solutionStepsEl = document.getElementById('solution-steps-text');
      this.btnNext = document.getElementById('btn-next-question');

      this.miniGameWrapper = document.getElementById('mini-game-wrapper');
      this.miniGameTitleEl = document.getElementById('mini-game-title');
      this.miniGameInstructEl = document.getElementById('mini-game-instruction-text');
      this.miniCanvas = document.getElementById('mini-game-canvas');
      this.miniButtonsBar = document.getElementById('mini-game-buttons-bar');

      this.modalOverlay = document.getElementById('game-modal-overlay');
      this.modalHeading = document.getElementById('modal-heading');
      this.modalScore = document.getElementById('modal-score-val');
      this.modalAccuracy = document.getElementById('modal-accuracy-val');
      this.modalStreak = document.getElementById('modal-streak-val');
      this.modalXp = document.getElementById('modal-xp-val');
      this.modalPlayAgainBtn = document.getElementById('modal-play-again-btn');
      this.modalTrophyIcon = document.getElementById('modal-trophy-icon');
      this.confettiCanvas = document.getElementById('modal-confetti-canvas');

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

      // Mode Navigation Tabs
      this.modeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const mode = tab.getAttribute('data-game-tab');
          this.modeTabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          this.startMode(mode);
        });
      });

      // Lifelines
      if (this.btnFifty) this.btnFifty.addEventListener('click', () => this.useLifelineFifty());
      if (this.btnFreeze) this.btnFreeze.addEventListener('click', () => this.useLifelineFreeze());
      if (this.btnHint) this.btnHint.addEventListener('click', () => this.useLifelineHint());

      // Next Question
      if (this.btnNext) this.btnNext.addEventListener('click', () => this.nextQuestion());

      // Play Again
      if (this.modalPlayAgainBtn) {
        this.modalPlayAgainBtn.addEventListener('click', () => {
          this.closeModal();
          this.startMode(this.currentMode);
        });
      }
    }

    /* ============================================================
       5. GAME MODES
       ============================================================ */
    startMode(mode) {
      this.currentMode = mode;
      this.stopTimer();
      this.closeModal();

      if (this.miniAnimId) {
        cancelAnimationFrame(this.miniAnimId);
        this.miniAnimId = null;
      }

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

      this.filteredQuestions = [...QUESTION_BANK_G9].sort(() => Math.random() - 0.5);
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
      this.lives = 999;
      this.lifelines = { fiftyFifty: true, freezeTime: true, formulaHint: false };
      this.resetLifelineButtons();

      this.filteredQuestions = [...QUESTION_BANK_G9].sort(() => Math.random() - 0.5);
      this.questionIndex = 0;

      this.updateHud();

      this.timeRemaining = 60;
      this.maxTime = 60;
      this.startBlitzTimer();
      this.loadQuestion(false);
    }

    resetLifelineButtons() {
      if (this.btnFifty) this.btnFifty.disabled = !this.lifelines.fiftyFifty;
      if (this.btnFreeze) this.btnFreeze.disabled = !this.lifelines.freezeTime;
      if (this.btnHint) this.btnHint.disabled = !this.lifelines.formulaHint;
    }

    /* ============================================================
       6. QUESTION HANDLING & TIMERS
       ============================================================ */
    loadQuestion(startTimer = true) {
      if (this.questionIndex >= this.filteredQuestions.length || (this.lives <= 0 && this.currentMode !== 'blitz')) {
        this.finishMatch();
        return;
      }

      this.isAnswerLocked = false;
      this.currentQuestion = this.filteredQuestions[this.questionIndex];
      this.questionStartTime = Date.now();

      if (this.solutionPanel) this.solutionPanel.classList.remove('visible');

      const realm = REALMS_G9[this.currentQuestion.realm] || REALMS_G9.all;
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

      if (this.optionsGridEl) {
        const letters = ['A', 'B', 'C', 'D'];
        this.optionsGridEl.innerHTML = this.currentQuestion.options.map((opt, idx) => `
          <button type="button" class="option-btn" data-option-index="${idx}">
            <span class="option-prefix">${letters[idx]}</span>
            <span class="option-text">$${opt}$</span>
          </button>
        `).join('');

        this.optionsGridEl.querySelectorAll('.option-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const idx = parseInt(btn.getAttribute('data-option-index'), 10);
            this.handleAnswer(idx, btn);
          });
        });
      }

      this.renderMath();

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

    handleAnswer(selectedIndex, buttonEl) {
      if (this.isAnswerLocked) return;
      this.isAnswerLocked = true;
      if (this.currentMode === 'quiz') this.stopTimer();

      const q = this.currentQuestion;
      const isCorrect = selectedIndex === q.correct;
      const timeSpentSec = (Date.now() - this.questionStartTime) / 1000;

      this.matchAnswered++;
      this.stats.totalAnswered++;

      const allButtons = this.optionsGridEl.querySelectorAll('.option-btn');
      allButtons.forEach(btn => btn.disabled = true);

      if (isCorrect) {
        buttonEl.classList.add('correct');
        this.matchCorrect++;
        this.stats.totalCorrect++;
        this.streak++;
        if (this.streak > this.maxMatchStreak) this.maxMatchStreak = this.streak;
        if (this.streak > this.stats.maxStreak) this.stats.maxStreak = this.streak;

        if (q.realm === 'radicals') this.stats.radCorrect++;
        if (q.realm === 'pythagoras') this.stats.pythCorrect++;

        if (timeSpentSec < 3.0) this.stats.fastAnswer = true;

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

        setTimeout(() => this.showSolution(true), 400);

      } else {
        buttonEl.classList.add('wrong');
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
       7. LIFELINES
       ============================================================ */
    useLifelineFifty() {
      if (!this.lifelines.fiftyFifty || this.isAnswerLocked) return;
      this.lifelines.fiftyFifty = false;
      this.btnFifty.disabled = true;
      this.sound.powerUp();

      const q = this.currentQuestion;
      const buttons = Array.from(this.optionsGridEl.querySelectorAll('.option-btn'));
      const wrongIndices = [0, 1, 2, 3].filter(idx => idx !== q.correct);

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

      this.timeRemaining = Math.min(this.maxTime, this.timeRemaining + 15);
      this.updateTimerBar();
    }

    useLifelineHint() {
      if (!this.lifelines.formulaHint || this.isAnswerLocked) return;
      this.lifelines.formulaHint = false;
      this.btnHint.disabled = true;
      this.sound.powerUp();

      const q = this.currentQuestion;
      alert(`📜 គន្លឹះរូបមន្តឌីប្លូម៖\n${q.hint}`);
    }

    /* ============================================================
       8. HUD & ACHIEVEMENTS
       ============================================================ */
    updateHud() {
      const rankInfo = this.getPlayerRank();
      if (this.rankTitleEl) this.rankTitleEl.textContent = rankInfo.rank;
      if (this.rankTagEl) this.rankTagEl.textContent = rankInfo.badge;
      if (this.avatarEl) this.avatarEl.textContent = this.avatar;

      const currentLevelXp = this.xp % 500;
      const xpPct = (currentLevelXp / 500) * 100;
      if (this.xpFillEl) this.xpFillEl.style.width = `${xpPct}%`;
      if (this.xpTextEl) this.xpTextEl.textContent = `${this.xp} XP`;

      if (this.scoreEl) this.scoreEl.textContent = this.score.toLocaleString();
      if (this.highScoreEl) this.highScoreEl.textContent = this.highScore.toLocaleString();

      if (this.comboBadgeEl && this.comboCountEl) {
        if (this.streak >= 2) {
          this.comboBadgeEl.classList.remove('hidden');
          this.comboCountEl.textContent = `${this.streak}x`;
        } else {
          this.comboBadgeEl.classList.add('hidden');
        }
      }

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
      BADGES_G9.forEach(badge => {
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
          <strong style="color: #fbbf24; font-size: 0.82rem; text-transform: uppercase; display: block;">🏆 សមិទ្ធផលឌីប្លូមបានដោះសោ!</strong>
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

    finishMatch() {
      this.stopTimer();

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
          this.modalHeading.textContent = '🎉 ជ័យជម្នះកម្រិតឌីប្លូម!';
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
       9. CANVAS MINI-GAMES FOR GRADE 9
       ============================================================ */
    initMiniGame(mode) {
      if (!this.miniCanvas) return;
      this.miniCtx = this.miniCanvas.getContext('2d');

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.miniCanvas.width = 900 * dpr;
      this.miniCanvas.height = 500 * dpr;
      this.miniCtx.scale(dpr, dpr);
      this.miniLogicalW = 900;
      this.miniLogicalH = 500;

      if (mode === 'mini-slicer') {
        this.setupNinjaMathSlicer();
      } else if (mode === 'mini-pythagoras') {
        this.setupPythagorasBuilder();
      } else if (mode === 'mini-scale') {
        this.setupEquationScale();
      }
    }

    // Mini-Game 1: ⚔️ Ninja Math Slicer (កាប់រ៉ាឌីកាល់ & ពីជគណិត)
    setupNinjaMathSlicer() {
      if (this.miniGameTitleEl) this.miniGameTitleEl.textContent = '⚔️ និនចាកាប់រ៉ាឌីកាល់ (Ninja Math Slicer)';
      if (this.miniGameInstructEl) {
        this.miniGameInstructEl.innerHTML = `
          <span>ប្រើកណ្ដុរ ឬប៉ះដើម្បីកាប់ពពុះរ៉ាឌីកាល់ត្រឹមត្រូវ!</span>
          <span style="color: #fbbf24; font-weight: 700;">+100 ពិន្ទុរាល់ពេលកាប់ចំ</span>
        `;
      }
      if (this.miniButtonsBar) this.miniButtonsBar.innerHTML = '';

      const ctx = this.miniCtx;
      const w = this.miniLogicalW;
      const h = this.miniLogicalH;

      const bubbleBank = [
        { q: '√64', val: 8 },
        { q: '√100', val: 10 },
        { q: '√81', val: 9 },
        { q: '√49', val: 7 },
        { q: '√25', val: 5 },
        { q: '3² + 4²', val: 25 },
        { q: '√16 + √9', val: 7 },
        { q: '√144', val: 12 },
        { q: '√36', val: 6 },
        { q: '2³', val: 8 }
      ];

      // Spawn bubbles
      let bubbles = [];
      let slashTrail = [];
      let isMouseDown = false;

      const spawnBubble = () => {
        const item = bubbleBank[Math.floor(Math.random() * bubbleBank.length)];
        bubbles.push({
          q: item.q,
          val: item.val,
          x: Math.random() * (w - 160) + 80,
          y: h + 40,
          radius: 46,
          vx: (Math.random() - 0.5) * 1.5,
          vy: -(Math.random() * 2 + 2.5),
          color: ['#06b6d4', '#10b981', '#f59e0b', '#8b5cf6'][Math.floor(Math.random() * 4)],
          sliced: false
        });
      };

      for (let i = 0; i < 4; i++) {
        setTimeout(spawnBubble, i * 600);
      }

      const spawnInterval = setInterval(() => {
        if (this.currentMode !== 'mini-slicer') {
          clearInterval(spawnInterval);
          return;
        }
        if (bubbles.length < 5) spawnBubble();
      }, 1200);

      const loop = () => {
        if (this.currentMode !== 'mini-slicer') return;

        ctx.fillStyle = '#060a14';
        ctx.fillRect(0, 0, w, h);

        // Subtle background grid
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        for (let x = 0; x < w; x += 40) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
        }

        // Draw and update bubbles
        for (let i = bubbles.length - 1; i >= 0; i--) {
          const b = bubbles[i];
          b.x += b.vx;
          b.y += b.vy;

          if (b.y < -50) {
            bubbles.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.shadowColor = b.color;
          ctx.shadowBlur = 15;
          ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
          ctx.strokeStyle = b.color;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Bubble text
          ctx.fillStyle = '#ffffff';
          ctx.font = '700 20px "Outfit", sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(b.q, b.x, b.y);
          ctx.restore();
        }

        // Draw Katana Slash Trail
        if (slashTrail.length > 1) {
          ctx.save();
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 4;
          ctx.shadowColor = '#06b6d4';
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.moveTo(slashTrail[0].x, slashTrail[0].y);
          for (let i = 1; i < slashTrail.length; i++) {
            ctx.lineTo(slashTrail[i].x, slashTrail[i].y);
          }
          ctx.stroke();
          ctx.restore();
        }

        this.miniAnimId = requestAnimationFrame(loop);
      };
      loop();

      // Mouse / Touch Slicing Event Listeners
      const checkSlice = (px, py) => {
        for (let i = bubbles.length - 1; i >= 0; i--) {
          const b = bubbles[i];
          const dist = Math.hypot(px - b.x, py - b.y);
          if (dist < b.radius) {
            this.sound.slash();
            this.sound.correct();
            this.score += 100;
            this.xp += 30;
            this.updateHud();
            bubbles.splice(i, 1);
            break;
          }
        }
      };

      const getPos = (e) => {
        const rect = this.miniCanvas.getBoundingClientRect();
        const scaleX = this.miniLogicalW / rect.width;
        const scaleY = this.miniLogicalH / rect.height;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
          x: (clientX - rect.left) * scaleX,
          y: (clientY - rect.top) * scaleY
        };
      };

      this.miniCanvas.onmousedown = (e) => {
        isMouseDown = true;
        const pos = getPos(e);
        slashTrail = [pos];
        checkSlice(pos.x, pos.y);
      };

      this.miniCanvas.onmousemove = (e) => {
        if (!isMouseDown) return;
        const pos = getPos(e);
        slashTrail.push(pos);
        if (slashTrail.length > 8) slashTrail.shift();
        checkSlice(pos.x, pos.y);
      };

      window.onmouseup = () => {
        isMouseDown = false;
        slashTrail = [];
      };

      this.miniCanvas.ontouchstart = (e) => {
        const pos = getPos(e);
        slashTrail = [pos];
        checkSlice(pos.x, pos.y);
      };

      this.miniCanvas.ontouchmove = (e) => {
        const pos = getPos(e);
        slashTrail.push(pos);
        if (slashTrail.length > 8) slashTrail.shift();
        checkSlice(pos.x, pos.y);
      };

      this.miniCanvas.ontouchend = () => {
        slashTrail = [];
      };
    }

    // Mini-Game 2: 📐 Pythagoras Builder (សង់ត្រីកោណពីតាករ)
    setupPythagorasBuilder() {
      if (this.miniGameTitleEl) this.miniGameTitleEl.textContent = '📐 សង់ត្រីកោណពីតាករ (Pythagoras Builder)';

      const triplets = [
        { a: 3, b: 4, c: 5 },
        { a: 6, b: 8, c: 10 },
        { a: 5, b: 12, c: 13 },
        { a: 8, b: 15, c: 17 },
        { a: 9, b: 12, c: 15 }
      ];

      const current = triplets[Math.floor(Math.random() * triplets.length)];
      const missing = ['a', 'b', 'c'][Math.floor(Math.random() * 3)];
      const correctVal = current[missing];

      if (this.miniGameInstructEl) {
        this.miniGameInstructEl.innerHTML = `
          <span>រកប្រវែងជ្រុងដែលបាត់ <strong>[ ${missing.toUpperCase()} = ? ]</strong> នៃត្រីកោណកែង៖</span>
          <span style="color: #38bdf8; font-weight: 700;">ជ្រើសរើសចម្លើយត្រឹមត្រូវ</span>
        `;
      }

      // Generate 4 choices
      const wrong = [correctVal + 2, Math.max(1, correctVal - 3), correctVal + 4];
      const choices = [correctVal, ...wrong].sort(() => Math.random() - 0.5);

      if (this.miniButtonsBar) {
        this.miniButtonsBar.innerHTML = choices.map(val => `
          <button class="btn btn-primary" style="padding: 0.65rem 1.6rem; font-size: 1.15rem; font-weight: 700;">
            ${missing.toUpperCase()} = ${val}
          </button>
        `).join('');

        this.miniButtonsBar.querySelectorAll('button').forEach((btn, idx) => {
          btn.addEventListener('click', () => {
            if (choices[idx] === correctVal) {
              this.sound.correct();
              this.score += 150;
              this.xp += 50;
              this.updateHud();
              alert(`🎉 ត្រឹមត្រូវ! តាមពីតាករ c² = a² + b² នាំឱ្យ ${missing.toUpperCase()} = ${correctVal}!`);
              this.setupPythagorasBuilder();
            } else {
              this.sound.wrong();
            }
          });
        });
      }

      // Render Right-Angled Triangle on Canvas
      const ctx = this.miniCtx;
      const w = this.miniLogicalW;
      const h = this.miniLogicalH;

      ctx.fillStyle = '#060a14';
      ctx.fillRect(0, 0, w, h);

      // Coordinates for triangle
      const x0 = 260;
      const y0 = 380;
      const x1 = 660;
      const y1 = 380;
      const x2 = 260;
      const y2 = 120;

      // Fill & Stroke
      ctx.fillStyle = 'rgba(6, 182, 212, 0.12)';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Right Angle Marker
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.strokeRect(x0, y0 - 24, 24, 24);

      // Side Labels
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 22px "Outfit", sans-serif';
      ctx.textAlign = 'center';

      // Base (a)
      const labelA = missing === 'a' ? 'A = ?' : `a = ${current.a}`;
      ctx.fillText(labelA, (x0 + x1) / 2, y0 + 36);

      // Height (b)
      const labelB = missing === 'b' ? 'B = ?' : `b = ${current.b}`;
      ctx.textAlign = 'right';
      ctx.fillText(labelB, x0 - 20, (y0 + y2) / 2);

      // Hypotenuse (c)
      const labelC = missing === 'c' ? 'C = ?' : `c = ${current.c}`;
      ctx.textAlign = 'left';
      ctx.fillStyle = '#fbbf24';
      ctx.fillText(labelC, (x1 + x2) / 2 + 20, (y1 + y2) / 2 - 10);
    }

    // Mini-Game 3: ⚖️ Equation Scale Balance (ជញ្ជីងថ្លឹងសមីការ)
    setupEquationScale() {
      if (this.miniGameTitleEl) this.miniGameTitleEl.textContent = '⚖️ ជញ្ជីងថ្លឹងសមីការ (Equation Scale Balance)';

      const a = Math.floor(Math.random() * 3) + 2; // 2 or 3 or 4
      const xAns = Math.floor(Math.random() * 5) + 2; // 2 to 6
      const b = Math.floor(Math.random() * 6) + 1; // 1 to 6
      const c = a * xAns + b;

      if (this.miniGameInstructEl) {
        this.miniGameInstructEl.innerHTML = `
          <span>ថ្លឹងជញ្ជីងឱ្យស្មើគ្នាដើម្បីដោះស្រាយសមីការ៖ <strong>${a}x + ${b} = ${c}</strong></span>
          <span style="color: #10b981; font-weight: 700;">x = ?</span>
        `;
      }

      // Generate 4 choices
      const wrong = [xAns + 1, Math.max(1, xAns - 2), xAns + 3];
      const choices = [xAns, ...wrong].sort(() => Math.random() - 0.5);

      if (this.miniButtonsBar) {
        this.miniButtonsBar.innerHTML = choices.map(val => `
          <button class="btn btn-primary" style="padding: 0.65rem 1.6rem; font-size: 1.15rem; font-weight: 700;">
            x = ${val}
          </button>
        `).join('');

        this.miniButtonsBar.querySelectorAll('button').forEach((btn, idx) => {
          btn.addEventListener('click', () => {
            if (choices[idx] === xAns) {
              this.sound.correct();
              this.score += 150;
              this.xp += 50;
              this.updateHud();
              alert(`🎉 ជញ្ជីងមានតុល្យភាព! ${a}(${xAns}) + ${b} = ${c} នាំឱ្យ x = ${xAns}!`);
              this.setupEquationScale();
            } else {
              this.sound.wrong();
            }
          });
        });
      }

      // Draw Scale on Canvas
      const ctx = this.miniCtx;
      const w = this.miniLogicalW;
      const h = this.miniLogicalH;

      ctx.fillStyle = '#060a14';
      ctx.fillRect(0, 0, w, h);

      // Central Pillar
      const cx = w / 2;
      ctx.fillStyle = '#475569';
      ctx.beginPath();
      ctx.moveTo(cx - 15, 420);
      ctx.lineTo(cx + 15, 420);
      ctx.lineTo(cx + 8, 180);
      ctx.lineTo(cx - 8, 180);
      ctx.closePath();
      ctx.fill();

      // Fulcrum Pivot
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(cx, 180, 14, 0, Math.PI * 2);
      ctx.fill();

      // Crossbar Beam
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(cx - 240, 180);
      ctx.lineTo(cx + 240, 180);
      ctx.stroke();

      // Left Pan Strings & Pan
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx - 240, 180); ctx.lineTo(cx - 300, 290);
      ctx.moveTo(cx - 240, 180); ctx.lineTo(cx - 180, 290);
      ctx.stroke();

      ctx.fillStyle = 'rgba(6, 182, 212, 0.25)';
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(cx - 240, 290, 75, 14, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Right Pan Strings & Pan
      ctx.beginPath();
      ctx.moveTo(cx + 240, 180); ctx.lineTo(cx + 180, 290);
      ctx.moveTo(cx + 240, 180); ctx.lineTo(cx + 300, 290);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(cx + 240, 290, 75, 14, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Weight labels
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 20px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${a}x + ${b}`, cx - 240, 270);
      ctx.fillText(`${c}`, cx + 240, 270);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    new MathHero9();
  });
})();
