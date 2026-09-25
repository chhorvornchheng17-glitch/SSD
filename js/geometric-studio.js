/**
 * geometric-studio.js - Real-Life Applications of Geometric Sequences Video Studio
 * 60 FPS Canvas Cinematic Animation Studio with Bacterial Doubling, Compound Interest,
 * Bouncing Ball Physics (Infinite Sum), Paper Folding to the Moon, and Radioactive Half-life Simulations.
 * Features Sequence Discrete Point & Exponential Curve Plot, Cumulative Sum Area, Audio-visual HUD,
 * Khmer Narration, Web Audio API Sound Synthesizer, Interactive Sequence Calculator, and 60 FPS Video Recording.
 * Teacher Chheng Chhovorn - Mathematics Portfolio
 */

(function () {
  'use strict';

  // ============================================================
  // 1. REAL-LIFE GEOMETRIC SEQUENCE SCENARIOS
  // ============================================================
  const GEOMETRIC_SCENARIOS = {
    bacteria: {
      id: 'bacteria',
      title: '🦠 កំណើនកោសិកាបាក់តេរី & មេរោគ (Bacterial Doubling)',
      category: 'មីក្រូជីវវិទ្យា & វេជ្ជសាស្ត្រ (Microbiology & Medicine)',
      badge: 'តួទី n: u_n = 100 × 2^(n-1)  |  ផលបូកសរុប S_n',
      formula: 'u_n = 100 \\times 2^{n - 1} \\quad (កោសិកា)',
      sumFormula: 'S_n = u_1 \\frac{q^n - 1}{q - 1} = 100(2^n - 1) \\quad (កោសិកា)',
      u1: 100,
      q: 2,
      totalSteps: 8, // 8 division cycles (0 to 7 splits)
      duration: 12, // seconds
      unit: 'កោសិកា',
      unitName: 'កោសិកា',
      stepLabel: 'វដ្តទី',
      f: (n) => 100 * Math.pow(2, n - 1),
      sumF: (n) => 100 * (Math.pow(2, n) - 1),
      metrics: (n) => {
        const curN = Math.max(1, Math.min(8, Math.round(n)));
        const un = 100 * Math.pow(2, curN - 1);
        const sn = 100 * (Math.pow(2, curN) - 1);
        return [
          { label: 'វដ្តបំបែកខ្លួន n', value: `វដ្តទី ${curN}`, color: '#38bdf8' },
          { label: 'កោសិកាបច្ចុប្បន្ន u_n', value: `${un.toLocaleString()} កោសិកា`, color: '#10b981' },
          { label: 'ផលធៀបរួម q', value: `q = 2 (កើនទ្វេដង)`, color: '#f59e0b' },
          { label: 'ផលបូកសរុប S_n', value: `${sn.toLocaleString()} កោសិកា`, color: '#ec4899' }
        ];
      },
      narration: [
        { time: 0.0, text: 'វដ្តទី ១ (n = 1)៖ ចាប់ផ្តើមពីបាក់តេរីដើម u_1 = 100 កោសិកាក្នុងចានពិសោធន៍ Petri dish។ ផលបូក S_1 = 100។' },
        { time: 2.5, text: 'វដ្តទី ២-៣ (n = 2-3)៖ រាល់ ៣០ នាទី បាក់តេរីនីមួយៗបំបែកខ្លួនជាពីរ (q = 2)! វដ្តទី ៣ កើនឡើងដល់ u_3 = 400 កោសិកា។' },
        { time: 5.5, text: 'វដ្តទី ៥ (ពាក់កណ្តាលម៉ោង)៖ កោសិកាកើនឡើងដល់ u_5 = 100 × 2⁴ = 1,600 កោសិកា ស្រទាប់បាក់តេរីចាប់ផ្តើមរាលពេញផ្ទៃចាន។' },
        { time: 8.5, text: 'វដ្តទី ៧ (n = 7)៖ បរិមាណបាក់តេរីកើនឡើងយ៉ាងគំហុកដល់ u_7 = 6,400 កោសិកា! នេះជាលក្ខណៈពិសេសនៃស្វ៊ីតធរណីមាត្រ។' },
        { time: 11.0, text: 'វដ្តទី ៨ (n = 8)៖ ក្រោយ ៤ ម៉ោង កោសិកាកើនដល់ u_8 = 12,800 កោសិកា! តាមរូបមន្ត S_8 = 100(2⁸ - 1) = 25,500 កោសិកាបង្កើតបានសរុប!' }
      ],
      theoryTitle: '១. ការបំបែកខ្លួនកោសិកាបាក់តេរី (Binary Fission)',
      theoryDesc: 'ក្នុងជីវវិទ្យា និងវេជ្ជសាស្ត្រ បាក់តេរីបន្តពូជតាមវិធី «អសេក្ខៈបំបែកជាពីរ» (Binary Fission)។ កាលណាលក្ខខណ្ឌសីតុណ្ហភាព និងចំណីអាហារគ្រប់គ្រាន់ ចំនួនកោសិកានឹងកើនឡើងទ្វេដងក្នុងចន្លោះពេលថេរមួយ បង្កើតបានជាស្វ៊ីតធរណីមាត្រដែលមានផលធៀបរួម $q = 2$។ ការយល់ដឹងពីស្វ៊ីតនេះ ជួយឱ្យគ្រូពេទ្យគណនាកម្រិតថ្នាំអង់ទីប៊ីយ៉ូទិកដើម្បីទប់ស្កាត់ការឆ្លងរាលដាលទាន់ពេលវេលា។',
      steps: [
        'ចំនួនបាក់តេរីដំបូង (តួទីមួយ)៖ $u_1 = 100\\text{ កោសិកា}$',
        'ផលធៀបរួម (អត្រាបំបែកជាពីរ)៖ $q = 2$',
        'រូបមន្តតួទូទៅ (វដ្តទី $n$)៖ $u_n = u_1 \\cdot q^{n - 1} = 100 \\cdot 2^{n - 1}$',
        'ចំនួនបាក់តេរីនៅវដ្តទី ៨៖ $u_8 = 100 \\cdot 2^{8 - 1} = 100 \\cdot 2^7 = 100 \\cdot 128 = 12,800\\text{ កោសិកា}$',
        'រូបមន្តផលបូកសរុប $n$ តួដំបូង៖ $S_n = u_1 \\frac{q^n - 1}{q - 1} = 100 \\frac{2^n - 1}{2 - 1} = 100(2^n - 1)$',
        'ផលបូកសរុបក្រោយ ៨ វដ្ត៖ $S_8 = 100(2^8 - 1) = 100(256 - 1) = 25,500\\text{ កោសិកា}$'
      ],
      examTip: 'ប្រធានលំហាត់បាក់តេរី ឬការចម្លងវីរុសកូវីដក្នុងប្រឡងបាក់ឌុប៖ ត្រូវប្រយ័ត្នត្រង់ពាក្យ «វដ្តទី n» ឬ «ក្រោយពេល t ម៉ោង»។ បើបំបែករាល់ 30 នាទី នោះក្រោយ 4 ម៉ោង មាន 8 វដ្ត ($n = 8$)។'
    },

    compound: {
      id: 'compound',
      title: '💰 វិនិយោគការប្រាក់សមាស & ភាគលាភ (Compound Interest & Wealth)',
      category: 'ហិរញ្ញវត្ថុ & ធនាគារ (Finance & Investment)',
      badge: 'តួទី n: u_n = 1000 × (1.10)^(n-1)  |  អត្រាកំណើន 10%/ឆ្នាំ',
      formula: 'u_n = 1000 \\times (1.10)^{n - 1} \\quad ($)',
      sumFormula: 'S_n = 1000 \\frac{(1.10)^n - 1}{1.10 - 1} = 10,000[(1.10)^n - 1] \\quad ($)',
      u1: 1000,
      q: 1.10,
      totalSteps: 10, // 10 years
      duration: 12,
      unit: '$',
      unitName: 'ដុល្លារ',
      stepLabel: 'ឆ្នាំទី',
      f: (n) => 1000 * Math.pow(1.10, n - 1),
      sumF: (n) => (1000 * (Math.pow(1.10, n) - 1)) / 0.10,
      metrics: (n) => {
        const curN = Math.max(1, Math.min(10, Math.round(n)));
        const un = 1000 * Math.pow(1.10, curN - 1);
        const sn = (1000 * (Math.pow(1.10, curN) - 1)) / 0.10;
        return [
          { label: 'ឆ្នាំទី n', value: `ឆ្នាំទី ${curN}`, color: '#38bdf8' },
          { label: 'ទ្រព្យសម្បត្តិ u_n', value: `$${Math.round(un).toLocaleString()}`, color: '#10b981' },
          { label: 'ផលធៀបរួម q', value: `q = 1.10 (+10%/ឆ្នាំ)`, color: '#f59e0b' },
          { label: 'ផលបូកវិនិយោគ S_n', value: `$${Math.round(sn).toLocaleString()}`, color: '#ec4899' }
        ];
      },
      narration: [
        { time: 0.0, text: 'ឆ្នាំទី ១ (n = 1)៖ ដាក់ប្រាក់វិនិយោគដំបូង u_1 = $1,000 ក្នុងមូលនិធិភាគហ៊ុនអត្រាចំណេញ 10% ក្នុងមួយឆ្នាំ (q = 1.10)។' },
        { time: 2.5, text: 'ឆ្នាំទី ២-៣៖ ការប្រាក់មិនត្រូវបានដកចេញទេ ប៉ុន្តែត្រូវបានបូកបញ្ចូលដើមដើម្បីបង្កើតការប្រាក់បន្ត (ការប្រាក់សមាស)។' },
        { time: 5.5, text: 'ឆ្នាំទី ៦៖ ទ្រព្យសម្បត្តិកើនឡើងដល់ u_6 = $1,611 ចំណេញលើស 61% នៃប្រាក់ដើមដំបូង ដោយមិនបាច់ខំប្រឹងប្រែងបន្ថែម។' },
        { time: 8.5, text: 'ឆ្នាំទី ៨៖ អានុភាពនៃការប្រាក់សមាសចាប់ផ្តើមកោងឡើងយ៉ាងចោត u_8 = $1,949 ជិតឡើងទ្វេដងនៃប្រាក់ដើម។' },
        { time: 11.0, text: 'ឆ្នាំទី ១០៖ ទ្រព្យសម្បត្តិឡើងដល់ u_10 = $2,358 (កើនឡើង ២.៣៥ ដង)! អាល់បឺត អែងស្តែង បានហៅការប្រាក់សមាសថាជាអច្ឆរិយៈទី ៨ នៃពិភពលោក។' }
      ],
      theoryTitle: '២. អានុភាពនៃការប្រាក់សមាស (Compound Interest)',
      theoryDesc: 'ក្នុងសេដ្ឋកិច្ច ការប្រាក់សមាស (Compound Interest) គឺជាការគណនាការប្រាក់លើប្រាក់ដើមបូកជាមួយការប្រាក់ដែលទទួលបានពីមុនៗ។ បើអត្រាការប្រាក់ប្រចាំឆ្នាំគឺ $r$ នោះផលធៀបរួមនៃស្វ៊ីតធរណីមាត្រគឺ $q = 1 + r$។ ភាពខុសគ្នារវាងការប្រាក់ទោល (ស្វ៊ីតនព្វន្ត) និងការប្រាក់សមាស (ស្វ៊ីតធរណីមាត្រ) គឺការប្រាក់សមាសបង្កើតកំណើនជាអិចស្ប៉ូណង់ស្យែលដ៏មហិមាក្នុងរយៈពេលវែង។',
      steps: [
        'ប្រាក់ដើមដំបូង (តួទីមួយ)៖ $u_1 = \\$1,000$',
        'ផលធៀបរួម (អត្រាកំណើន ១០% ក្នុងមួយឆ្នាំ)៖ $q = 1 + 0.10 = 1.10$',
        'រូបមន្តតួទូទៅ (ឆ្នាំទី $n$)៖ $u_n = u_1 \\cdot q^{n - 1} = 1000 \\cdot (1.10)^{n - 1}$',
        'ទ្រព្យសម្បត្តិនៅឆ្នាំទី ១០៖ $u_{10} = 1000 \\cdot (1.10)^9 \\approx 1000 \\cdot 2.3579 = \\$2,358$',
        'ប្រាក់ចំណេញសុទ្ធទទួលបាន៖ $\\Delta = u_{10} - u_1 = 2358 - 1000 = \\$1,358\\text{ (ចំណេញ +135.8%)}$'
      ],
      examTip: 'លំហាត់ប្រាក់បញ្ញើធនាគារក្នុងវិញ្ញាសាបាក់ឌុប៖ ត្រូវកត់សម្គាល់អត្រាការប្រាក់ $r$។ បើគេថា $r = 5\\%$ នោះផលធៀបរួមគឺ $q = 1 + 0.05 = 1.05$ មិនមែន $0.05$ នោះទេ!'
    },

    bouncing: {
      id: 'bouncing',
      title: '🏀 ចលនាបាល់លោតផ្លាតបាត់បង់ថាមពល (Bouncing Ball Physics)',
      category: 'រូបវិទ្យា & មេកានិច (Physics & Energy Decay)',
      badge: 'តួទី n: u_n = 10 × (0.7)^(n-1)  |  ផលបូកអនន្ត S_∞ = 33.33 m',
      formula: 'u_n = 10 \\times (0.7)^{n - 1} \\quad (m)',
      sumFormula: 'S_\\infty = \\frac{u_1}{1 - q} = \\frac{10}{1 - 0.7} = \\frac{10}{0.3} \\approx 33.33 \\quad (m)',
      u1: 10,
      q: 0.7,
      totalSteps: 10, // 10 bounces
      duration: 12,
      unit: 'm',
      unitName: 'ម៉ែត្រ',
      stepLabel: 'លោតលើកទី',
      f: (n) => 10 * Math.pow(0.7, n - 1),
      sumF: (n) => (10 * (1 - Math.pow(0.7, n))) / (1 - 0.7),
      metrics: (n) => {
        const curN = Math.max(1, Math.min(10, Math.round(n)));
        const un = 10 * Math.pow(0.7, curN - 1);
        const sn = (10 * (1 - Math.pow(0.7, curN))) / 0.3;
        return [
          { label: 'លោតលើកទី n', value: `លើកទី ${curN}`, color: '#38bdf8' },
          { label: 'កម្ពស់លោត u_n', value: `${un.toFixed(2)} m`, color: '#f59e0b' },
          { label: 'ផលធៀបរួម q', value: `q = 0.7 (ថយចុះ 30%)`, color: '#ef4444' },
          { label: 'ចម្ងាយសរុប S_n', value: `${sn.toFixed(2)} m (S_∞=33.33m)`, color: '#10b981' }
        ];
      },
      narration: [
        { time: 0.0, text: 'លោតលើកទី ១ (n = 1)៖ បាល់ទម្លាក់ពីកម្ពស់ u_1 = 10 ម៉ែត្រ។ ពេលប៉ះដី វាលោតត្រឡប់ឡើងវិញបាន 70% នៃកម្ពស់ចាស់ (q = 0.7)។' },
        { time: 2.5, text: 'លោតលើកទី ២-៣៖ កម្ពស់ថយចុះមកត្រឹម u_2 = 7m និង u_3 = 4.9m ដោយសារការបាត់បង់ថាមពលកកិត និងបម្លែងជាកម្ដៅ។' },
        { time: 5.5, text: 'លោតលើកទី ៥៖ កម្ពស់លោតសល់ត្រឹម u_5 = 2.40 ម៉ែត្រ។ បាល់បង្កើតបានជាគន្លងរលកប៉ារ៉ាបូលរួញតូចទៅៗគួរឱ្យចាប់អារម្មណ៍។' },
        { time: 8.5, text: 'លោតលើកទី ៨៖ កម្ពស់លោតសល់ត្រឹមតែ u_8 = 0.82 ម៉ែត្រ ចលនាលោតកាន់តែញាប់ទៅៗជិតផ្ទៃដី។' },
        { time: 11.0, text: 'លោតលើកទី ១០៖ កម្ពស់សល់ u_10 = 0.40m! ដោយសារ |q| < 1 ផលបូកចម្ងាយសរុបខិតជិតតម្លៃអនន្ត S_∞ = 10 / (1 - 0.7) = 33.33 ម៉ែត្រ!' }
      ],
      theoryTitle: '៣. ចលនាបាល់លោតផ្លាត & ផលបូកស្វ៊ីតធរណីមាត្រអនន្ត',
      theoryDesc: 'ក្នុងរូបវិទ្យា នៅពេលបាល់ទម្លាក់ចុះមកប៉ះដី ការបត់បែនមិនមែនជាការបត់បែនល្អឥតខ្ចោះ (Inelastic Collision) ឡើយ។ ថាមពលមួយផ្នែកត្រូវបានបាត់បង់ទៅលើកម្ដៅ និងសូរ ធ្វើឱ្យកម្ពស់នៃការលោតលើកបន្ទាប់ថយចុះជាស្វ៊ីតធរណីមាត្រដែលមានផលធៀបរួម $|q| < 1$។ ក្នុងគណិតវិទ្យា នេះជាឧទាហរណ៍ជាក់ស្ដែងបំផុតនៃ «ស្វ៊ីតធរណីមាត្រចុះអនន្ត» ដែលមានផលបូកកំណត់ $S_\\infty = \\frac{u_1}{1 - q}$។',
      steps: [
        'កម្ពស់ទម្លាក់ដំបូង (តួទីមួយ)៖ $u_1 = 10\\text{ m}$',
        'ផលធៀបរួម (អត្រាកម្ពស់លោតឡើងវិញ ៧០%)៖ $q = 0.7$',
        'កម្ពស់លោតលើកទី ៥៖ $u_5 = 10 \\cdot (0.7)^4 = 10 \\cdot 0.2401 = 2.401\\text{ m}$',
        'កម្ពស់លោតលើកទី ១០៖ $u_{10} = 10 \\cdot (0.7)^9 \\approx 0.4035\\text{ m}$',
        'រូបមន្តផលបូកស្វ៊ីតធរណីមាត្រចុះអនន្ត ($|q| < 1$)៖ $S_\\infty = \\lim_{n \\to \\infty} S_n = \\frac{u_1}{1 - q}$',
        'ផលបូកកម្ពស់លោតសរុបរហូតដល់បាល់ឈប់ស្ងៀម៖ $S_\\infty = \\frac{10}{1 - 0.7} = \\frac{10}{0.3} = \\frac{100}{3} \\approx 33.33\\text{ m}$'
      ],
      examTip: 'រូបមន្តផលបូកអនន្ត $S_\\infty = \\frac{u_1}{1 - q}$ ប្រើប្រាស់បានតែនៅពេលដែល $|q| < 1$ (-1 < q < 1) ប៉ុណ្ណោះ! បើ $q \\ge 1$ ផលបូកគ្មានដែនកំណត់ទេ (រីកទៅ $+\\infty$)។'
    },

    paper_fold: {
      id: 'paper_fold',
      title: '📄 ការបត់ក្រដាសដល់ឋានព្រះច័ន្ទ (Paper Folding to the Moon)',
      category: 'តារាសាស្ត្រ & ធរណីមាត្រ (Astronomy & Exponential Power)',
      badge: 'តួទី n: u_n = 0.1 × 2^(n-1) mm  |  បត់ 42 ដង = 384,400 km',
      formula: 'u_n = 0.1 \\times 2^{n - 1} \\quad (\\text{mm})',
      sumFormula: 'u_{42} = 0.1 \\times 2^{41} \\approx 384,400 \\quad (\\text{km ដល់ឋានព្រះច័ន្ទ})',
      u1: 0.1,
      q: 2,
      totalSteps: 15, // 15 folds visualized
      duration: 12,
      unit: 'mm',
      unitName: 'មីលីម៉ែត្រ',
      stepLabel: 'បត់លើកទី',
      f: (n) => 0.1 * Math.pow(2, n - 1),
      sumF: (n) => 0.1 * (Math.pow(2, n) - 1),
      metrics: (n) => {
        const curN = Math.max(1, Math.min(15, Math.round(n)));
        const unMm = 0.1 * Math.pow(2, curN - 1);
        let displayVal = `${unMm.toFixed(1)} mm`;
        if (unMm >= 1000) {
          displayVal = `${(unMm / 1000).toFixed(2)} m`;
        }
        return [
          { label: 'បត់លើកទី n', value: `បត់លើកទី ${curN}`, color: '#38bdf8' },
          { label: 'កម្រាស់ក្រដាស u_n', value: displayVal, color: '#10b981' },
          { label: 'ផលធៀបរួម q', value: `q = 2 (កើនទ្វេដង)`, color: '#f59e0b' },
          { label: 'ប្រៀបធៀបកំពស់', value: curN >= 15 ? 'ខ្ពស់ស្មើដើមឈើធំ (1.64m)' : curN >= 10 ? 'ស្មើកម្រាស់សៀវភៅក្រាស់' : 'ស្មើកម្រាស់ក្រដាសធម្មតា', color: '#ec4899' }
        ];
      },
      narration: [
        { time: 0.0, text: 'បត់លើកទី ១ (n = 1)៖ ក្រដាស A4 ធម្មតាមួយសន្លឹកមានកម្រាស់ដំបូង u_1 = 0.1 មីលីម៉ែត្រ។' },
        { time: 2.5, text: 'បត់លើកទី ៤-៧៖ កម្រាស់កើនឡើងជាស្វ័យគុណនៃ ២! បត់ ៧ ដង កម្រាស់ឡើងដល់ 6.4mm ស្មើនឹងកម្រាស់សៀវភៅ ១ ក្បាល។' },
        { time: 5.5, text: 'បត់លើកទី ១១៖ កម្រាស់ឡើងដល់ u_11 = 102.4 mm (ជាង 10 សង់ទីម៉ែត្រ) ស្មើនឹងកម្ពស់ប្រអប់ឥដ្ឋមួយដុំ។' },
        { time: 8.5, text: 'បត់លើកទី ១៤-១៥៖ កម្រាស់ឡើងដល់ u_15 = 1,638.4 mm (ប្រហែល ១.៦៤ ម៉ែត្រ) ស្មើនឹងកម្ពស់មនុស្សពេញវ័យម្នាក់!' },
        { time: 11.0, text: 'ប្រសិនបើអាចបត់បាន ៤២ ដង៖ កម្រាស់នឹងកើនដល់ 384,400 គីឡូម៉ែត្រ ស្មើនឹងចម្ងាយពីផែនដីទៅដល់ឋានព្រះច័ន្ទ! នេះជាមហិទ្ធិឫទ្ធិនៃស្វ៊ីតធរណីមាត្រ។' }
      ],
      theoryTitle: '៤. អាថ៌កំបាំងនៃការបត់ក្រដាស និងអំណាចអិចស្ប៉ូណង់ស្យែល',
      theoryDesc: 'មនុស្សភាគច្រើនគិតថាការបត់ក្រដាសមិនអាចបង្កើតកម្ពស់ខ្ពស់បានទេ ដោយសារការគិតបែបលីនេអ៊ែរ (ស្វ៊ីតនព្វន្ត)។ ប៉ុន្តែការពិត ការបត់ក្រដាសនីមួយៗគុណកម្រាស់ចាស់នឹង ២ ($q = 2$)។ តាមរូបមន្តស្វ៊ីតធរណីមាត្រ កម្រាស់កើនឡើងយ៉ាងលឿនអស្ចារ្យ៖ បត់ ២៧ ដង ខ្ពស់ជាងភ្នំអេវឺរ៉េស (៨,៨៤៨ ម៉ែត្រ), បត់ ៤២ ដង ខ្ពស់ដល់ឋានព្រះច័ន្ទ ហើយបត់ ១០៣ ដង កម្រាស់ធំជាងអង្កត់ផ្ចិតនៃចក្រវាលដែលអាចមើលឃើញ (Observable Universe)!',
      steps: [
        'កម្រាស់ក្រដាសដើម (តួទីមួយ)៖ $u_1 = 0.1\\text{ mm} = 10^{-4}\\text{ m}$',
        'ផលធៀបរួម៖ $q = 2$',
        'កម្រាស់ក្រោយបត់ ១៥ ដង៖ $u_{15} = 0.1 \\cdot 2^{14} = 0.1 \\cdot 16,384 = 1,638.4\\text{ mm} \\approx 1.64\\text{ m}$',
        'កម្រាស់ក្រោយបត់ ២៧ ដង៖ $u_{27} = 0.1 \\cdot 2^{26}\\text{ mm} \\approx 6,710,886\\text{ mm} \\approx 6.71\\text{ km}$',
        'កម្រាស់ក្រោយបត់ ៤២ ដង (ចម្ងាយដល់ឋានព្រះច័ន្ទ)៖ $u_{42} = 0.1 \\cdot 2^{41}\\text{ mm} \\approx 2.199 \\times 10^{11}\\text{ mm} \\approx 384,400\\text{ km}$'
      ],
      examTip: 'លំហាត់បត់ក្រដាស ឬកោសិកាបំបែកខ្លួនបង្ហាញពីភាពខុសគ្នារវាងស្វ៊ីតនព្វន្ត (កើនថេរ +d) និងស្វ៊ីតធរណីមាត្រ (កើនគុណ ×q)។ ស្វ៊ីតធរណីមាត្រកើនលឿនជាងស្វ៊ីតនព្វន្តដាច់ឆ្ងាយណាស់!'
    },

    radiation: {
      id: 'radiation',
      title: '☢️ ការបំបែកវិទ្យុសកម្ម & Half-Life Decay (Radioactive Half-life)',
      category: 'រូបវិទ្យានុយក្លេអ៊ែរ & បុរាណវិទ្យា (Nuclear Physics & Archaeology)',
      badge: 'តួទី n: u_n = 800 × (0.5)^(n-1) mg  |  អាយុកាលពាក់កណ្តាល T',
      formula: 'u_n = 800 \\times (0.5)^{n - 1} \\quad (\\text{mg})',
      sumFormula: 'S_n = 800 \\frac{1 - (0.5)^n}{1 - 0.5} = 1600[1 - (0.5)^n] \\quad (\\text{mg បំបែកចេញ})',
      u1: 800,
      q: 0.5,
      totalSteps: 8, // 8 half-life cycles
      duration: 12,
      unit: 'mg',
      unitName: 'មីលីក្រាម',
      stepLabel: 'វដ្តពាក់កណ្តាលទី',
      f: (n) => 800 * Math.pow(0.5, n - 1),
      sumF: (n) => 800 * (1 - Math.pow(0.5, n)) * 2,
      metrics: (n) => {
        const curN = Math.max(1, Math.min(8, Math.round(n)));
        const un = 800 * Math.pow(0.5, curN - 1);
        const decayed = 800 - un;
        return [
          { label: 'វដ្តពាក់កណ្តាល n', value: `វដ្តទី ${curN}`, color: '#38bdf8' },
          { label: 'វិទ្យុសកម្មនៅសល់ u_n', value: `${un.toFixed(1)} mg`, color: '#10b981' },
          { label: 'ផលធៀបរួម q', value: `q = 0.5 (ថយចុះ 50%)`, color: '#ef4444' },
          { label: 'បរិមាណបំបែកចេញ', value: `${decayed.toFixed(1)} mg`, color: '#f59e0b' }
        ];
      },
      narration: [
        { time: 0.0, text: 'វដ្តទី ១ (n = 1)៖ សារធាតុវិទ្យុសកម្មដំបូងមានម៉ាស u_1 = 800 មីលីក្រាម បញ្ចេញកាំរស្មីមិនទាន់បំបែកខ្លួន។' },
        { time: 2.5, text: 'វដ្តទី ២-៣៖ ឆ្លងកាត់អាយុកាលពាក់កណ្តាល (Half-life) ស្នូលអាតូមបំបែកជាបន្តបន្ទាប់ (q = 0.5)។ នៅវដ្តទី ៣ សល់ u_3 = 200 mg។' },
        { time: 5.5, text: 'វដ្តទី ៥៖ សារធាតុវិទ្យុសកម្មនៅសល់ត្រឹម u_5 = 800 × (0.5)⁴ = 50 មីលីក្រាម (សល់តែ 6.25% នៃបរិមាណដើម)។' },
        { time: 8.5, text: 'វដ្តទី ៧៖ បរិមាណវិទ្យុសកម្មថយចុះយ៉ាងច្រើនសល់ត្រឹម u_7 = 12.5 mg កម្រិតបញ្ចេញកាំរស្មីកាន់តែមានសុវត្ថិភាព។' },
        { time: 11.0, text: 'វដ្តទី ៨៖ សល់ត្រឹម u_8 = 6.25 មីលីក្រាម! វិធីសាស្ត្រ Carbon-14 ប្រើប្រាស់រូបមន្តស្វ៊ីតធរណីមាត្រនេះ ដើម្បីកំណត់អាយុកាលបុរាណវត្ថុយ៉ាងសុក្រឹត។' }
      ],
      theoryTitle: '៥. អាយុកាលពាក់កណ្តាលនៃវិទ្យុសកម្ម (Radioactive Half-Life)',
      theoryDesc: 'ក្នុងរូបវិទ្យានុយក្លេអ៊ែរ អាយុកាលពាក់កណ្តាល (Half-Life $T_{1/2}$) គឺជាថិរវេលាដែលស្នូលវិទ្យុសកម្មមួយចំនួនត្រូវបំបែកខ្លួនបាត់អស់ពាក់កណ្តាល ($q = 1/2 = 0.5$)។ នេះជាស្វ៊ីតធរណីមាត្រចុះដាច់ខាត។ អ្នកបុរាណវិទ្យាប្រើប្រាស់វិធីសាស្ត្រ «Carbon-14 Dating» ផ្អែកលើស្វ៊ីតធរណីមាត្រនេះដើម្បីកំណត់អាយុកាលហ្វូស៊ីល និងប្រាសាទបុរាណដែលមានអាយុរាប់ពាន់ឆ្នាំ។',
      steps: [
        'ម៉ាសវិទ្យុសកម្មដើម (តួទីមួយ)៖ $u_1 = 800\\text{ mg}$',
        'ផលធៀបរួម (អាយុកាលពាក់កណ្តាល)៖ $q = 0.5$',
        'រូបមន្តតួទូទៅ (វដ្តទី $n$)៖ $u_n = u_1 \\cdot q^{n - 1} = 800 \\cdot (0.5)^{n - 1}$',
        'ម៉ាសនៅសល់នៅវដ្តទី ៤៖ $u_4 = 800 \\cdot (0.5)^3 = 800 \\cdot 0.125 = 100\\text{ mg}$',
        'ម៉ាសនៅសល់នៅវដ្តទី ៨៖ $u_8 = 800 \\cdot (0.5)^7 = 800 \\cdot \\frac{1}{128} = 6.25\\text{ mg}$',
        'ម៉ាសដែលបានបំបែកចេញសរុប៖ $\\Delta M = u_1 - u_8 = 800 - 6.25 = 793.75\\text{ mg}$'
      ],
      examTip: 'លំហាត់អាយុកាលពាក់កណ្តាល ឬការស្រកទម្ងន់សារធាតុក្នុងប្រឡងបាក់ឌុប៖ ផលធៀបរួមគឺ $q = 0.5$ ជានិច្ច ព្រោះរាល់វដ្តនីមួយៗវាថយចុះពាក់កណ្តាល។'
    }
  };

  // ============================================================
  // 2. WEB AUDIO API SYNTHESIZER
  // ============================================================
  class AudioFx {
    constructor() {
      this.ctx = null;
      this.muted = false;
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

    playPop() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, t);
      osc.frequency.exponentialRampToValueAtTime(880, t + 0.08);

      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.12);
    }

    playCoin() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(987.77, t); // B5
      osc.frequency.setValueAtTime(1318.51, t + 0.08); // E6

      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.35);
    }

    playBounce() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(280, t);
      osc.frequency.exponentialRampToValueAtTime(60, t + 0.12);

      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.15);
    }

    playWhoosh() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(200, t);
      osc.frequency.linearRampToValueAtTime(600, t + 0.15);

      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.2);
    }

    playGeiger() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(1200, t);

      gain.gain.setValueAtTime(0.1, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.03);
    }

    playChime() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + idx * 0.07);
        gain.gain.setValueAtTime(0.12, t + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.07 + 0.45);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t + idx * 0.07);
        osc.stop(t + idx * 0.07 + 0.45);
      });
    }
  }

  // ============================================================
  // 3. MAIN GEOMETRIC VIDEO STUDIO CLASS
  // ============================================================
  class GeometricVideoStudio {
    constructor() {
      this.canvas = document.getElementById('geometric-video-canvas');
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.currentScenarioId = 'bacteria';
      this.scenario = GEOMETRIC_SCENARIOS.bacteria;

      this.currentTime = 0;
      this.isPlaying = true;
      this.playbackSpeed = 1.0;
      this.lastFrameTime = performance.now();
      this.lastAudibleStep = -1;

      this.particles = [];
      this.audio = new AudioFx();

      // Recording
      this.mediaRecorder = null;
      this.recordedChunks = [];
      this.isRecording = false;

      this.initDPI();
      this.initDOM();
      this.initEvents();
      this.initCalculator();
      this.updateDetailsView();
      this.updateHUD();

      requestAnimationFrame((t) => this.loop(t));
    }

    initDPI() {
      const rect = this.canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.width = rect.width || 800;
      this.height = Math.round(this.width * 0.5625); // 16:9
      if (this.height < 460) this.height = 460;

      this.canvas.width = this.width * dpr;
      this.canvas.height = this.height * dpr;
      this.canvas.style.height = `${this.height}px`;

      this.ctx.scale(dpr, dpr);
    }

    initDOM() {
      this.playBtn = document.getElementById('geom-play-btn');
      this.replayBtn = document.getElementById('geom-replay-btn');
      this.progressBar = document.getElementById('geom-progress-bar');
      this.timeDisplay = document.getElementById('geom-time-display');
      this.narrationText = document.getElementById('geom-narration-text');
      this.hudFormula = document.getElementById('geom-hud-formula');
      this.hudMetrics = document.getElementById('geom-hud-metrics');
      this.recBadge = document.getElementById('geom-rec-badge');
      this.recordBtn = document.getElementById('geom-record-btn');
      this.recordBtnText = document.getElementById('geom-record-btn-text');
      this.scenarioSelect = document.getElementById('geom-scenario-select');
    }

    initEvents() {
      window.addEventListener('resize', () => this.initDPI());

      if (this.playBtn) {
        this.playBtn.addEventListener('click', () => this.togglePlay());
      }

      if (this.replayBtn) {
        this.replayBtn.addEventListener('click', () => this.replay());
      }

      if (this.progressBar) {
        this.progressBar.addEventListener('input', (e) => {
          const val = parseFloat(e.target.value);
          this.currentTime = (val / 100) * this.scenario.duration;
          this.lastAudibleStep = -1;
          this.updateHUD();
        });
      }

      // Speed Buttons
      const speedBtns = document.querySelectorAll('[data-geom-speed]');
      speedBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          speedBtns.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          this.playbackSpeed = parseFloat(btn.getAttribute('data-geom-speed'));
        });
      });

      // Scenario Buttons
      const scenarioBtns = document.querySelectorAll('[data-geom-scenario]');
      scenarioBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const scId = btn.getAttribute('data-geom-scenario');
          this.switchScenario(scId);
          scenarioBtns.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
        });
      });

      // Mobile Select Dropdown
      if (this.scenarioSelect) {
        this.scenarioSelect.addEventListener('change', (e) => {
          this.switchScenario(e.target.value);
          scenarioBtns.forEach((b) => {
            b.classList.toggle('active', b.getAttribute('data-geom-scenario') === e.target.value);
          });
        });
      }

      // Record Button
      if (this.recordBtn) {
        this.recordBtn.addEventListener('click', () => this.toggleRecordVideo());
      }
    }

    initCalculator() {
      const calcBtn = document.getElementById('geom-calc-run-btn');
      if (calcBtn) {
        calcBtn.addEventListener('click', () => this.runCalculator());
      }
    }

    runCalculator() {
      const u1Input = document.getElementById('geom-calc-u1');
      const qInput = document.getElementById('geom-calc-q');
      const nInput = document.getElementById('geom-calc-n');
      const resEl = document.getElementById('geom-calc-result');

      if (!u1Input || !qInput || !nInput || !resEl) return;

      const u1 = parseFloat(u1Input.value) || 0;
      const q = parseFloat(qInput.value) || 1;
      const n = parseInt(nInput.value) || 1;

      if (n < 1) {
        resEl.innerHTML = '<span style="color:#ef4444;">កំហុស៖ ចំនួនតួ n ត្រូវតែជាចំនួនគត់វិជ្ជមាន (n ≥ 1)។</span>';
        return;
      }

      const un = u1 * Math.pow(q, n - 1);
      let snText = '';
      if (q === 1) {
        snText = (n * u1).toLocaleString();
      } else {
        const sn = u1 * (Math.pow(q, n) - 1) / (q - 1);
        snText = sn.toLocaleString();
      }

      let infText = '';
      if (Math.abs(q) < 1) {
        const sInf = u1 / (1 - q);
        infText = `<div style="margin-top:0.4rem; color:#38bdf8;">• ផលបូកអនន្ត S_∞ = u_1 / (1 - q) = <strong>${sInf.toFixed(4)}</strong> (ដោយសារ |q| < 1)</div>`;
      } else {
        infText = `<div style="margin-top:0.4rem; color:#94a3b8;">• ស្វ៊ីតនេះមិនមានផលបូកអនន្ត S_∞ ឡើយ (ដោយសារ |q| ≥ 1 ស្វ៊ីតរីក)</div>`;
      }

      resEl.innerHTML = `
        <div style="background:rgba(16, 185, 129, 0.15); border:1px solid rgba(16, 185, 129, 0.35); border-radius:8px; padding:0.85rem; font-size:0.9rem; line-height:1.7;">
          <div style="color:#34d399; font-weight:700; margin-bottom:0.25rem;">🎉 លទ្ធផលគណនាស្វ៊ីតធរណីមាត្រ៖</div>
          <div>• តួទី ${n}៖ <strong>u_${n} = ${un.toLocaleString()}</strong></div>
          <div>• ផលបូក ${n} តួដំបូង៖ <strong>S_${n} = ${snText}</strong></div>
          ${infText}
        </div>
      `;
    }

    switchScenario(scenarioId) {
      if (!GEOMETRIC_SCENARIOS[scenarioId]) return;
      this.currentScenarioId = scenarioId;
      this.scenario = GEOMETRIC_SCENARIOS[scenarioId];
      this.currentTime = 0;
      this.lastAudibleStep = -1;
      this.particles = [];

      if (this.scenarioSelect) {
        this.scenarioSelect.value = scenarioId;
      }

      this.updateDetailsView();
      this.updateHUD();
    }

    togglePlay() {
      this.isPlaying = !this.isPlaying;
      if (this.playBtn) {
        if (this.isPlaying) {
          this.playBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
            <span>ផ្អាក (Pause)</span>
          `;
        } else {
          this.playBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            <span>ចាក់បន្ត (Play)</span>
          `;
        }
      }
    }

    replay() {
      this.currentTime = 0;
      this.lastAudibleStep = -1;
      this.particles = [];
      this.isPlaying = true;
      if (this.playBtn) {
        this.playBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
          <span>ផ្អាក (Pause)</span>
        `;
      }
    }

    toggleRecordVideo() {
      if (this.isRecording) {
        this.stopRecording();
      } else {
        this.startRecording();
      }
    }

    startRecording() {
      try {
        const stream = this.canvas.captureStream(60);
        let mimeType = 'video/webm;codecs=vp9';
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          mimeType = 'video/webm;codecs=vp8';
        }
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          mimeType = 'video/webm';
        }

        this.recordedChunks = [];
        this.mediaRecorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 4000000 });

        this.mediaRecorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) {
            this.recordedChunks.push(e.data);
          }
        };

        this.mediaRecorder.onstop = () => {
          this.downloadVideo();
        };

        this.mediaRecorder.start();
        this.isRecording = true;
        this.replay();

        if (this.recBadge) {
          this.recBadge.classList.add('active');
          this.recBadge.innerHTML = '<span class="rec-dot" style="background:#ef4444; animation: pulse-dot 0.8s infinite;"></span><span>RECORDING...</span>';
        }
        if (this.recordBtnText) {
          this.recordBtnText.textContent = 'បញ្ឈប់ & ទាញយក (Stop)';
        }
        if (this.recordBtn) {
          this.recordBtn.classList.add('recording-active');
        }
      } catch (err) {
        console.error('Error starting MediaRecorder:', err);
        alert('ឧបករណ៍រុករក (Browser) របស់អ្នកមិនទាន់គាំទ្រមុខងារថតវីដេអូ Canvas ដោយផ្ទាល់ឡើយ។');
      }
    }

    stopRecording() {
      if (this.mediaRecorder && this.isRecording) {
        this.mediaRecorder.stop();
        this.isRecording = false;

        if (this.recBadge) {
          this.recBadge.classList.remove('active');
          this.recBadge.innerHTML = '<span class="rec-dot"></span><span>REC 60 FPS</span>';
        }
        if (this.recordBtnText) {
          this.recordBtnText.textContent = 'ថតវីដេអូក្លែងធ្វើ (Record)';
        }
        if (this.recordBtn) {
          this.recordBtn.classList.remove('recording-active');
        }
      }
    }

    downloadVideo() {
      const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `geometric-sequence-${this.scenario.id}-animation.webm`;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 200);
    }

    updateHUD() {
      const progress = (this.currentTime / this.scenario.duration) * 100;
      if (this.progressBar) {
        this.progressBar.value = Math.min(100, Math.max(0, progress));
      }
      if (this.timeDisplay) {
        this.timeDisplay.textContent = `${this.currentTime.toFixed(1)}s / ${this.scenario.duration.toFixed(1)}s`;
      }

      const currentStep = 1 + (this.currentTime / this.scenario.duration) * (this.scenario.totalSteps - 1);
      const roundedStep = Math.max(1, Math.min(this.scenario.totalSteps, Math.round(currentStep)));

      // Sound triggers
      if (roundedStep !== this.lastAudibleStep) {
        this.lastAudibleStep = roundedStep;
        if (this.currentScenarioId === 'bacteria') {
          this.audio.playPop();
          this.spawnBacteriaParticles();
        } else if (this.currentScenarioId === 'compound') {
          this.audio.playCoin();
          this.spawnCoinParticles();
        } else if (this.currentScenarioId === 'bouncing') {
          this.audio.playBounce();
        } else if (this.currentScenarioId === 'paper_fold') {
          this.audio.playWhoosh();
        } else if (this.currentScenarioId === 'radiation') {
          this.audio.playGeiger();
          this.spawnRadiationParticles();
        }
      }

      if (this.hudFormula) {
        this.hudFormula.textContent = this.scenario.badge;
      }

      if (this.hudMetrics) {
        const metrics = this.scenario.metrics(currentStep);
        this.hudMetrics.innerHTML = metrics
          .map(
            (m) => `
          <div class="hud-pill" style="border-color: ${m.color}55; color: ${m.color}; font-size: 0.8rem; padding: 0.25rem 0.75rem;">
            <span style="opacity: 0.8; font-size: 0.72rem;">${m.label}៖</span>
            <strong>${m.value}</strong>
          </div>
        `
          )
          .join('');
      }

      if (this.narrationText) {
        const narrations = this.scenario.narration;
        let activeText = narrations[0].text;
        for (let i = 0; i < narrations.length; i++) {
          if (this.currentTime >= narrations[i].time) {
            activeText = narrations[i].text;
          }
        }
        this.narrationText.textContent = activeText;
      }
    }

    updateDetailsView() {
      const catEl = document.getElementById('geom-detail-category');
      const badgeEl = document.getElementById('geom-detail-badge');
      const titleEl = document.getElementById('geom-detail-title');
      const formEl = document.getElementById('geom-detail-formula');
      const sumFormEl = document.getElementById('geom-detail-sum-formula');
      const theoryEl = document.getElementById('geom-detail-theory');
      const examTipEl = document.getElementById('geom-detail-exam-tip');
      const stepsListEl = document.getElementById('geom-detail-steps');

      if (catEl) catEl.textContent = this.scenario.category;
      if (badgeEl) badgeEl.textContent = this.scenario.badge;
      if (titleEl) titleEl.textContent = this.scenario.title;
      if (formEl) formEl.textContent = this.scenario.formula;
      if (sumFormEl) sumFormEl.textContent = this.scenario.sumFormula;
      if (theoryEl) theoryEl.textContent = this.scenario.theoryDesc;
      if (examTipEl) examTipEl.textContent = this.scenario.examTip;

      if (stepsListEl) {
        stepsListEl.innerHTML = this.scenario.steps
          .map((step) => `<li style="margin-bottom: 0.5rem; line-height: 1.6; color: #e2e8f0;">${step}</li>`)
          .join('');
      }

      // Sync calculator inputs with current scenario
      const u1Input = document.getElementById('geom-calc-u1');
      const qInput = document.getElementById('geom-calc-q');
      const nInput = document.getElementById('geom-calc-n');
      if (u1Input) u1Input.value = this.scenario.u1;
      if (qInput) qInput.value = this.scenario.q;
      if (nInput) nInput.value = this.scenario.totalSteps;
      this.runCalculator();

      if (window.renderMathInElement) {
        const container = document.getElementById('geometric-video-studio');
        if (container) {
          window.renderMathInElement(container, {
            delimiters: [
              { left: '$$', right: '$$', display: true },
              { left: '$', right: '$', display: false }
            ],
            throwOnError: false
          });
        }
      }
    }

    // ============================================================
    // 4. ANIMATION LOOP (60 FPS)
    // ============================================================
    loop(timestamp) {
      const dt = (timestamp - this.lastFrameTime) / 1000;
      this.lastFrameTime = timestamp;

      if (this.isPlaying) {
        this.currentTime += dt * this.playbackSpeed;
        if (this.currentTime >= this.scenario.duration) {
          if (this.isRecording) {
            this.stopRecording();
          }
          this.currentTime = 0;
        }
        this.updateHUD();
      }

      this.renderFrame();
      requestAnimationFrame((t) => this.loop(t));
    }

    renderFrame() {
      const ctx = this.ctx;
      const w = this.width;
      const h = this.height;

      // Background
      ctx.fillStyle = '#060a14';
      ctx.fillRect(0, 0, w, h);

      // Split Screen (50% Physical Simulation, 50% Geometric Curve Graph)
      const splitX = Math.round(w * 0.5);

      // Vertical Divider
      ctx.save();
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(splitX, 10);
      ctx.lineTo(splitX, h - 10);
      ctx.stroke();
      ctx.restore();

      const stepProg = this.currentTime / this.scenario.duration;
      const currentStep = 1 + stepProg * (this.scenario.totalSteps - 1);

      // Left Panel: Physical Simulation
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, splitX, h);
      ctx.clip();
      this.renderPhysicalScene(ctx, 0, 0, splitX, h, currentStep);
      ctx.restore();

      // Right Panel: Geometric Sequence Graph
      ctx.save();
      ctx.beginPath();
      ctx.rect(splitX, 0, w - splitX, h);
      ctx.clip();
      this.renderSequenceGraph(ctx, splitX, 0, w - splitX, h, currentStep);
      ctx.restore();

      this.renderParticles(ctx);
    }

    // ============================================================
    // 5. PHYSICAL SIMULATION SCENES (LEFT PANEL)
    // ============================================================
    renderPhysicalScene(ctx, x, y, w, h, currentStep) {
      switch (this.currentScenarioId) {
        case 'bacteria':
          this.renderBacteriaScene(ctx, x, y, w, h, currentStep);
          break;
        case 'compound':
          this.renderCompoundScene(ctx, x, y, w, h, currentStep);
          break;
        case 'bouncing':
          this.renderBouncingScene(ctx, x, y, w, h, currentStep);
          break;
        case 'paper_fold':
          this.renderPaperFoldScene(ctx, x, y, w, h, currentStep);
          break;
        case 'radiation':
          this.renderRadiationScene(ctx, x, y, w, h, currentStep);
          break;
      }
    }

    // Scenario 1: Petri Dish Bacterial Doubling
    renderBacteriaScene(ctx, x, y, w, h, currentStep) {
      const cx = x + w * 0.5;
      const cy = y + h * 0.53;
      const radius = Math.min(w * 0.38, h * 0.36);

      // Title & Subtitle
      ctx.fillStyle = '#f8fafc';
      ctx.font = '700 16px "Kantumruy Pro", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🦠 ចានពិសោធន៍បាក់តេរីបំបែកខ្លួន (Binary Fission)', cx, y + 40);

      ctx.fillStyle = '#34d399';
      ctx.font = '600 13px "Outfit", sans-serif';
      const curN = Math.round(currentStep);
      const cellsCount = Math.round(100 * Math.pow(2, currentStep - 1));
      ctx.fillText(`វដ្តទី ${curN} / 8  •  u_n = 100 × 2^(n - 1) = ${cellsCount.toLocaleString()} កោសិកា`, cx, y + 62);

      // Petri Dish Glass Rim
      ctx.save();
      ctx.shadowColor = 'rgba(16, 185, 129, 0.3)';
      ctx.shadowBlur = 20;

      // Agar Gel Gradient
      const agarGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, radius);
      agarGrad.addColorStop(0, '#064e3b');
      agarGrad.addColorStop(0.7, '#022c22');
      agarGrad.addColorStop(1, '#0f172a');

      ctx.fillStyle = agarGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // Outer glass ring
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Draw Bacteria Cells (Pseudo-random deterministic distribution based on step)
      const maxVisualCells = Math.min(220, Math.round(15 * Math.pow(1.5, currentStep - 1)));
      const timeOffset = this.currentTime * 0.8;

      ctx.save();
      for (let i = 0; i < maxVisualCells; i++) {
        // Golden ratio spiral for organic distribution
        const angle = i * 2.39996 + Math.sin(timeOffset + i) * 0.05;
        const distRatio = Math.sqrt((i + 1) / maxVisualCells);
        const r = distRatio * (radius - 18);
        const bx = cx + Math.cos(angle) * r;
        const by = cy + Math.sin(angle) * r;

        // Rod/Capsule shape for bacteria
        const cellAngle = angle + 1.2;
        const cellLen = 7 + (i % 4);
        const cellW = 3.5;

        ctx.save();
        ctx.translate(bx, by);
        ctx.rotate(cellAngle);

        // Glowing membrane
        ctx.fillStyle = i % 3 === 0 ? '#34d399' : i % 3 === 1 ? '#38bdf8' : '#a7f3d0';
        ctx.shadowColor = '#34d399';
        ctx.shadowBlur = 8;

        ctx.beginPath();
        ctx.roundRect(-cellLen / 2, -cellW / 2, cellLen, cellW, cellW / 2);
        ctx.fill();
        ctx.restore();
      }
      ctx.restore();

      // Microscope HUD Overlay
      ctx.fillStyle = '#6ee7b7';
      ctx.font = '700 12px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`🔬 កែវពង្រីក 400x  |  ផលធៀបរួម q = 2  |  រាល់ 30 នាទីកើនទ្វេដង`, cx, y + h - 16);
    }

    // Scenario 2: Compound Interest & Golden Treasure Vault
    renderCompoundScene(ctx, x, y, w, h, currentStep) {
      const cx = x + w * 0.5;
      const cy = y + h * 0.52;
      const groundY = y + h * 0.78;

      // Title
      ctx.fillStyle = '#f8fafc';
      ctx.font = '700 16px "Kantumruy Pro", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('💰 វិនិយោគការប្រាក់សមាស (Compound Interest)', cx, y + 40);

      const curYear = Math.round(currentStep);
      const wealth = 1000 * Math.pow(1.10, currentStep - 1);
      ctx.fillStyle = '#fbbf24';
      ctx.font = '600 13px "Outfit", sans-serif';
      ctx.fillText(`ឆ្នាំទី ${curYear} / 10  •  u_n = 1000 × (1.10)^(n - 1) = $${Math.round(wealth).toLocaleString()}`, cx, y + 62);

      // Floor & Vault Platform
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(x, groundY, w, h - groundY);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, groundY);
      ctx.lineTo(x + w, groundY);
      ctx.stroke();

      // Draw Stacks of Golden Coins (Increasing exponentially)
      const numPillars = Math.min(10, Math.round(currentStep));
      const pillarWidth = Math.min(22, (w * 0.75) / 10 - 6);
      const startPillarX = cx - (numPillars * (pillarWidth + 8)) / 2 + pillarWidth / 2;

      for (let p = 1; p <= numPillars; p++) {
        const px = startPillarX + (p - 1) * (pillarWidth + 8);
        const pVal = 1000 * Math.pow(1.10, p - 1);
        const pHeight = Math.min(groundY - 100, ((pVal - 900) / 1600) * 160 + 35);
        const py = groundY - pHeight;

        // Coin Cylinder 3D Stack
        const coinGrad = ctx.createLinearGradient(px - pillarWidth / 2, 0, px + pillarWidth / 2, 0);
        if (p === numPillars) {
          coinGrad.addColorStop(0, '#fef08a');
          coinGrad.addColorStop(0.5, '#f59e0b');
          coinGrad.addColorStop(1, '#b45309');
        } else {
          coinGrad.addColorStop(0, '#fde68a');
          coinGrad.addColorStop(0.5, '#d97706');
          coinGrad.addColorStop(1, '#78350f');
        }

        ctx.fillStyle = coinGrad;
        ctx.beginPath();
        ctx.roundRect(px - pillarWidth / 2, py, pillarWidth, pHeight, [4, 4, 0, 0]);
        ctx.fill();

        // Top Gold Coin Oval
        ctx.fillStyle = p === numPillars ? '#fef08a' : '#fde68a';
        ctx.beginPath();
        ctx.ellipse(px, py, pillarWidth / 2, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#92400e';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Pillar year label
        ctx.fillStyle = p === numPillars ? '#fef08a' : '#94a3b8';
        ctx.font = '700 10px "Outfit", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`Y${p}`, px, groundY + 16);
      }

      // Comparison Line: Simple Interest vs Compound Interest
      ctx.fillStyle = '#a7f3d0';
      ctx.font = '700 12px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`📈 អត្រាកំណើន 10%/ឆ្នាំ  |  ទ្រព្យសម្បត្តិកើនឡើង 2.36 ដងក្នុងរយៈពេល ១០ ឆ្នាំ!`, cx, y + h - 16);
    }

    // Scenario 3: Bouncing Ball Physics
    renderBouncingScene(ctx, x, y, w, h, currentStep) {
      const cx = x + w * 0.5;
      const groundY = y + h * 0.78;
      const ceilingY = y + 95;
      const maxBounceH = groundY - ceilingY;

      // Title
      ctx.fillStyle = '#f8fafc';
      ctx.font = '700 16px "Kantumruy Pro", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🏀 បាល់លោតផ្លាតបាត់បង់ថាមពល (Bouncing Ball)', cx, y + 40);

      const curBounce = Math.max(1, Math.min(10, currentStep));
      const curBounceH = 10 * Math.pow(0.7, curBounce - 1);
      ctx.fillStyle = '#f59e0b';
      ctx.font = '600 13px "Outfit", sans-serif';
      ctx.fillText(`លោតលើកទី ${Math.round(curBounce)} / 10  •  u_n = 10 × (0.7)^(n - 1) = ${curBounceH.toFixed(2)} m`, cx, y + 62);

      // Floor
      ctx.fillStyle = '#334155';
      ctx.fillRect(x, groundY, w, h - groundY);
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, groundY);
      ctx.lineTo(x + w, groundY);
      ctx.stroke();

      // Draw Parabolic Arcs for Previous Bounces
      ctx.save();
      const totalBounces = 8;
      const startX = x + 35;
      const totalWidth = w - 70;
      const bounceW = totalWidth / totalBounces;

      for (let b = 1; b <= totalBounces; b++) {
        const peakH = maxBounceH * Math.pow(0.7, b - 1);
        const bx0 = startX + (b - 1) * bounceW;
        const bx1 = startX + b * bounceW;
        const bMid = (bx0 + bx1) / 2;

        ctx.strokeStyle = b <= Math.round(currentStep) ? 'rgba(245, 158, 11, 0.7)' : 'rgba(148, 163, 184, 0.2)';
        ctx.lineWidth = b === Math.round(currentStep) ? 3 : 1.5;
        ctx.setLineDash(b === Math.round(currentStep) ? [] : [4, 4]);

        ctx.beginPath();
        ctx.moveTo(bx0, groundY);
        ctx.quadraticCurveTo(bMid, groundY - peakH * 2, bx1, groundY);
        ctx.stroke();

        // Peak Height Marker Point
        ctx.fillStyle = b <= Math.round(currentStep) ? '#f59e0b' : '#64748b';
        ctx.beginPath();
        ctx.arc(bMid, groundY - peakH, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Current Animated Ball Position
      const bounceProgress = (currentStep - 1) % 1;
      const curBounceIndex = Math.min(totalBounces, Math.floor(currentStep));
      const curPeak = maxBounceH * Math.pow(0.7, curBounceIndex - 1);
      const curBx0 = startX + (curBounceIndex - 1) * bounceW;
      const ballX = curBx0 + bounceProgress * bounceW;
      // Parabola: 4 * peak * p * (1 - p)
      const ballAltitude = 4 * curPeak * bounceProgress * (1 - bounceProgress);
      const ballY = groundY - ballAltitude - 12;

      // Ball Shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.beginPath();
      ctx.ellipse(ballX, groundY - 2, 12 * (1 - ballAltitude / (curPeak + 1) * 0.5), 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Orange Basketball
      ctx.save();
      const ballGrad = ctx.createRadialGradient(ballX - 4, ballY - 4, 2, ballX, ballY, 13);
      ballGrad.addColorStop(0, '#fed7aa');
      ballGrad.addColorStop(0.5, '#f97316');
      ballGrad.addColorStop(1, '#9a3412');

      ctx.fillStyle = ballGrad;
      ctx.beginPath();
      ctx.arc(ballX, ballY, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#431407';
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();

      // Bottom info
      ctx.fillStyle = '#38bdf8';
      ctx.font = '700 12px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`🛑 ផលបូកអនន្ត S_∞ = u_1 / (1 - q) = 10 / (1 - 0.7) = 33.33 m មុនពេលបាល់ឈប់ស្ងៀម!`, cx, y + h - 16);
    }

    // Scenario 4: Paper Folding to the Moon
    renderPaperFoldScene(ctx, x, y, w, h, currentStep) {
      const cx = x + w * 0.5;
      const groundY = y + h * 0.76;

      // Title
      ctx.fillStyle = '#f8fafc';
      ctx.font = '700 16px "Kantumruy Pro", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('📄 ការបត់ក្រដាសដល់ឋានព្រះច័ន្ទ (Paper Folding Power)', cx, y + 40);

      const curFolds = Math.round(currentStep);
      const curMm = 0.1 * Math.pow(2, currentStep - 1);
      ctx.fillStyle = '#38bdf8';
      ctx.font = '600 13px "Outfit", sans-serif';
      ctx.fillText(`បត់លើកទី ${curFolds} / 15  •  កម្រាស់ u_n = 0.1 × 2^(n-1) = ${curMm >= 1000 ? (curMm / 1000).toFixed(2) + ' m' : curMm.toFixed(1) + ' mm'}`, cx, y + 62);

      // Night Sky & Distant Glowing Moon
      const moonX = x + w * 0.82;
      const moonY = y + 105;
      const moonRadius = 32;

      ctx.save();
      ctx.shadowColor = 'rgba(254, 240, 138, 0.4)';
      ctx.shadowBlur = 25;
      const moonGrad = ctx.createRadialGradient(moonX - 8, moonY - 8, 5, moonX, moonY, moonRadius);
      moonGrad.addColorStop(0, '#ffffff');
      moonGrad.addColorStop(0.6, '#fef08a');
      moonGrad.addColorStop(1, '#ca8a04');
      ctx.fillStyle = moonGrad;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Desk Ground
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(x, groundY, w, h - groundY);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x, groundY);
      ctx.lineTo(x + w, groundY);
      ctx.stroke();

      // Isometric 3D Folded Paper Block
      const foldVisualHeight = Math.min(groundY - 100, Math.pow(currentStep, 1.8) * 2.8 + 6);
      const paperW = 110;
      const paperD = 40;
      const paperBaseX = cx - 40;
      const paperBaseY = groundY;

      // Front Face
      const frontGrad = ctx.createLinearGradient(0, paperBaseY - foldVisualHeight, 0, paperBaseY);
      frontGrad.addColorStop(0, '#f8fafc');
      frontGrad.addColorStop(1, '#cbd5e1');
      ctx.fillStyle = frontGrad;
      ctx.beginPath();
      ctx.rect(paperBaseX, paperBaseY - foldVisualHeight, paperW, foldVisualHeight);
      ctx.fill();
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Top Face (Isometric rhomboid)
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(paperBaseX, paperBaseY - foldVisualHeight);
      ctx.lineTo(paperBaseX + paperD, paperBaseY - foldVisualHeight - 16);
      ctx.lineTo(paperBaseX + paperW + paperD, paperBaseY - foldVisualHeight - 16);
      ctx.lineTo(paperBaseX + paperW, paperBaseY - foldVisualHeight);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#cbd5e1';
      ctx.stroke();

      // Right Face
      ctx.fillStyle = '#94a3b8';
      ctx.beginPath();
      ctx.moveTo(paperBaseX + paperW, paperBaseY - foldVisualHeight);
      ctx.lineTo(paperBaseX + paperW + paperD, paperBaseY - foldVisualHeight - 16);
      ctx.lineTo(paperBaseX + paperW + paperD, paperBaseY - 16);
      ctx.lineTo(paperBaseX + paperW, paperBaseY);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#64748b';
      ctx.stroke();

      // Comparison milestones callout
      ctx.fillStyle = '#fef08a';
      ctx.font = '700 12px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`🚀 បត់ 27 ដង = ភ្នំអេវឺរ៉េស (8.8km)  |  បត់ 42 ដង = ដល់ឋានព្រះច័ន្ទ (384,400km)!`, cx, y + h - 16);
    }

    // Scenario 5: Radioactive Decay & Half-life
    renderRadiationScene(ctx, x, y, w, h, currentStep) {
      const cx = x + w * 0.5;
      const cy = y + h * 0.53;
      const atomRadius = 45;

      // Title
      ctx.fillStyle = '#f8fafc';
      ctx.font = '700 16px "Kantumruy Pro", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('☢️ អាយុកាលពាក់កណ្តាលវិទ្យុសកម្ម (Radioactive Half-Life)', cx, y + 40);

      const curCycle = Math.round(currentStep);
      const remainingMg = 800 * Math.pow(0.5, currentStep - 1);
      ctx.fillStyle = '#ef4444';
      ctx.font = '600 13px "Outfit", sans-serif';
      ctx.fillText(`វដ្តទី ${curCycle} / 8  •  u_n = 800 × (0.5)^(n - 1) = ${remainingMg.toFixed(2)} mg`, cx, y + 62);

      // Glowing Hazard Outer Aura
      ctx.save();
      const auraGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 120);
      auraGrad.addColorStop(0, 'rgba(239, 68, 68, 0.25)');
      auraGrad.addColorStop(0.6, 'rgba(245, 158, 11, 0.1)');
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 120, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Electron Orbit Ellipses
      const t = this.currentTime * 2.5;
      const angles = [0, Math.PI / 3, (2 * Math.PI) / 3];

      ctx.save();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';

      angles.forEach((ang, idx) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(ang);
        ctx.beginPath();
        ctx.ellipse(0, 0, 105, 36, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Orbiting electron
        const ex = Math.cos(t + idx * 2) * 105;
        const ey = Math.sin(t + idx * 2) * 36;
        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(ex, ey, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      ctx.restore();

      // Atom Nucleus (Cluster of Protons/Neutrons decaying)
      const nucleusRatio = remainingMg / 800; // 1 down to 0
      const visibleParticles = Math.max(5, Math.round(28 * nucleusRatio));

      ctx.save();
      for (let i = 0; i < visibleParticles; i++) {
        const pAng = i * 1.35 + Math.sin(t + i) * 0.1;
        const pDist = (i / visibleParticles) * atomRadius * 0.75;
        const px = cx + Math.cos(pAng) * pDist;
        const py = cy + Math.sin(pAng) * pDist;

        ctx.fillStyle = i % 2 === 0 ? '#ef4444' : '#f59e0b';
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Radioactive Decay Gauge
      ctx.fillStyle = '#a7f3d0';
      ctx.font = '700 12px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`⏳ ផលធៀបរួម q = 0.5  |  វិធីសាស្ត្រ Carbon-14 កំណត់អាយុបុរាណវត្ថុ`, cx, y + h - 16);
    }

    // ============================================================
    // 6. MATHEMATICAL SEQUENCE GRAPH (RIGHT PANEL)
    // ============================================================
    renderSequenceGraph(ctx, x, y, w, h, currentStep) {
      const padding = { top: 75, right: 35, bottom: 65, left: 65 };
      const plotW = w - padding.left - padding.right;
      const plotH = h - padding.top - padding.bottom;

      const totalSteps = this.scenario.totalSteps;
      const curStep = Math.max(1, Math.min(totalSteps, currentStep));

      // Title
      ctx.fillStyle = '#f8fafc';
      ctx.font = '700 15px "Kantumruy Pro", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('📊 ក្រាហ្វស្វ៊ីតធរណីមាត្រ u_n & ផលបូកសរុប S_n', x + w * 0.5, y + 40);

      // Max Y Calculation
      let maxVal = 0;
      for (let n = 1; n <= totalSteps; n++) {
        const val = this.scenario.f(n);
        if (val > maxVal) maxVal = val;
      }
      const yMax = maxVal * 1.25;

      const getX = (n) => x + padding.left + ((n - 1) / (totalSteps - 1)) * plotW;
      const getY = (val) => y + padding.top + plotH - (val / yMax) * plotH;

      // Draw Grid & Axes
      ctx.save();
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.15)';
      ctx.lineWidth = 1;

      const yTicks = 4;
      for (let i = 0; i <= yTicks; i++) {
        const val = (yMax / yTicks) * i;
        const gy = getY(val);
        ctx.beginPath();
        ctx.moveTo(x + padding.left, gy);
        ctx.lineTo(x + padding.left + plotW, gy);
        ctx.stroke();

        ctx.fillStyle = '#94a3b8';
        ctx.font = '600 11px "Outfit", sans-serif';
        ctx.textAlign = 'right';
        let displayTick = Math.round(val);
        if (val >= 10000) displayTick = (val / 1000).toFixed(1) + 'k';
        ctx.fillText(`${displayTick} ${this.scenario.unit}`, x + padding.left - 8, gy + 4);
      }

      // Main Axes
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x + padding.left, y + padding.top);
      ctx.lineTo(x + padding.left, y + padding.top + plotH);
      ctx.lineTo(x + padding.left + plotW, y + padding.top + plotH);
      ctx.stroke();

      // Shaded Area under Curve up to current step
      const roundedCurStep = Math.round(curStep);
      ctx.beginPath();
      ctx.moveTo(getX(1), getY(0));
      for (let n = 1; n <= roundedCurStep; n++) {
        const val = this.scenario.f(n);
        ctx.lineTo(getX(n), getY(val));
      }
      ctx.lineTo(getX(roundedCurStep), getY(0));
      ctx.closePath();

      const areaGrad = ctx.createLinearGradient(0, y + padding.top, 0, y + padding.top + plotH);
      areaGrad.addColorStop(0, 'rgba(16, 185, 129, 0.35)');
      areaGrad.addColorStop(1, 'rgba(16, 185, 129, 0.02)');
      ctx.fillStyle = areaGrad;
      ctx.fill();

      // Discrete Term Bars
      const barWidth = Math.max(6, Math.min(16, plotW / totalSteps - 6));
      for (let n = 1; n <= totalSteps; n++) {
        const bx = getX(n);
        const val = this.scenario.f(n);
        const by = getY(val);
        const bHeight = y + padding.top + plotH - by;

        if (n <= roundedCurStep) {
          ctx.fillStyle = n === roundedCurStep ? '#f59e0b' : '#10b981';
          ctx.beginPath();
          ctx.roundRect(bx - barWidth / 2, by, barWidth, bHeight, [3, 3, 0, 0]);
          ctx.fill();
        } else {
          ctx.fillStyle = 'rgba(148, 163, 184, 0.15)';
          ctx.beginPath();
          ctx.roundRect(bx - barWidth / 2, by, barWidth, bHeight, [3, 3, 0, 0]);
          ctx.fill();
        }

        // X-axis Tick Labels
        ctx.fillStyle = n === roundedCurStep ? '#f59e0b' : '#94a3b8';
        ctx.font = '600 11px "Outfit", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`u_${n}`, bx, y + padding.top + plotH + 18);
      }

      // Continuous Exponential Curve line
      ctx.beginPath();
      for (let s = 1; s <= totalSteps; s += 0.1) {
        const cxPos = getX(s);
        const cVal = this.scenario.u1 * Math.pow(this.scenario.q, s - 1);
        const cyPos = getY(cVal);
        if (s === 1) ctx.moveTo(cxPos, cyPos);
        else ctx.lineTo(cxPos, cyPos);
      }
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Active Glowing Head on Curve
      const headX = getX(curStep);
      const headVal = this.scenario.u1 * Math.pow(this.scenario.q, curStep - 1);
      const headY = getY(headVal);

      ctx.save();
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 15;
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(headX, headY, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(headX, headY, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Callout Label at Head
      ctx.fillStyle = '#f8fafc';
      ctx.font = '700 12px "Outfit", sans-serif';
      ctx.textAlign = 'left';
      let displayHeadVal = headVal.toLocaleString();
      if (headVal >= 10000) displayHeadVal = (headVal / 1000).toFixed(1) + 'k';
      ctx.fillText(`u_${roundedCurStep} = ${displayHeadVal}`, Math.min(headX + 10, x + w - 85), headY - 8);

      ctx.restore();
    }

    // ============================================================
    // 7. PARTICLE EFFECTS
    // ============================================================
    spawnBacteriaParticles() {
      for (let i = 0; i < 8; i++) {
        this.particles.push({
          x: this.width * 0.25 + (Math.random() - 0.5) * 60,
          y: this.height * 0.53 + (Math.random() - 0.5) * 60,
          vx: (Math.random() - 0.5) * 50,
          vy: (Math.random() - 0.5) * 50,
          size: Math.random() * 4 + 2,
          color: '#34d399',
          life: 1.0
        });
      }
    }

    spawnCoinParticles() {
      for (let i = 0; i < 10; i++) {
        this.particles.push({
          x: this.width * 0.25 + (Math.random() - 0.5) * 80,
          y: this.height * 0.5 + (Math.random() - 0.5) * 40,
          vx: (Math.random() - 0.5) * 60,
          vy: -Math.random() * 60 - 20,
          size: Math.random() * 4 + 3,
          color: '#fbbf24',
          life: 1.0
        });
      }
    }

    spawnRadiationParticles() {
      for (let i = 0; i < 12; i++) {
        const ang = Math.random() * Math.PI * 2;
        const spd = Math.random() * 80 + 40;
        this.particles.push({
          x: this.width * 0.25,
          y: this.height * 0.53,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd,
          size: Math.random() * 3 + 2,
          color: '#ef4444',
          life: 1.0
        });
      }
    }

    renderParticles(ctx) {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx * 0.016;
        p.y += p.vy * 0.016;
        p.life -= 0.02;

        if (p.life <= 0) {
          this.particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
  }

  // Auto initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new GeometricVideoStudio());
  } else {
    new GeometricVideoStudio();
  }
})();
