/**
 * derivative-studio.js - Real-Life Applications of Derivatives Video Studio
 * 60 FPS Canvas Cinematic Animation Studio with Physics, Economics, Packaging,
 * Medicine, and Hydrology Simulations.
 * Features Real-time Tangents, Dual Simulation/Graph View, Audio-visual HUD,
 * Live Subtitles, and 60 FPS Video Recording (MediaRecorder API).
 * Teacher Chheng Chhovorn - Mathematics Portfolio
 */

(function () {
  'use strict';

  // 5 Real-Life Scenarios of Derivatives
  const DERIVATIVE_SCENARIOS = {
    rocket: {
      id: 'rocket',
      title: '🚀 ចលនារ៉ុក្កែត & ល្បឿនខណៈ (Rocket Kinematics)',
      category: 'រូបវិទ្យា & លំហអាកាស (Physics & Aerospace)',
      badge: 'កម្ពស់ & ល្បឿនខណៈ v(t) = s\'(t)',
      formula: 's(t) = 6t² - 0.25t³ (m)',
      derivativeFormula: 'v(t) = s\'(t) = 12t - 0.75t² (m/s)  |  a(t) = v\'(t) = 12 - 1.5t (m/s²)',
      domain: [0, 16], // 0 to 16 seconds
      duration: 12, // video timeline seconds
      criticalTime: 16.0,
      yRange: [0, 550],
      f: (t) => 6 * Math.pow(t, 2) - 0.25 * Math.pow(t, 3), // position
      df: (t) => 12 * t - 0.75 * Math.pow(t, 2), // velocity
      d2f: (t) => 12 - 1.5 * t, // acceleration
      metrics: (t) => {
        const s = 6 * Math.pow(t, 2) - 0.25 * Math.pow(t, 3);
        const v = 12 * t - 0.75 * Math.pow(t, 2);
        const a = 12 - 1.5 * t;
        return [
          { label: 'កម្ពស់ s(t)', value: `${Math.max(0, s).toFixed(1)} m`, color: '#38bdf8' },
          { label: 'ល្បឿនខណៈ v = s\'(t)', value: `${v.toFixed(1)} m/s`, color: '#f59e0b' },
          { label: 'សំទុះ a = s\'\'(t)', value: `${a.toFixed(1)} m/s²`, color: '#10b981' }
        ];
      },
      narration: [
        { time: 0.0, text: 'ចាប់ផ្តើមបាញ់បង្ហោះរ៉ុក្កែត (t = 0s)៖ រ៉ុក្កែតនៅលើដី s(0) = 0m, ល្បឿនខណៈ v(0) = 0 m/s ប៉ុន្តែសំទុះរុញច្រាន a = 12 m/s²។' },
        { time: 2.5, text: 'ដំណាក់កាលបង្កើនល្បឿន (t = 2-5s)៖ ដេរីវេទីមួយ s\'(t) > 0 និងកើនឡើងជាលំដាប់ មេគុណប្រាប់ទិសបន្ទាត់ប៉ះកាន់តែចោតខ្លាំង។' },
        { time: 6.0, text: 'ល្បឿនអតិបរមា (t = 8s)៖ សំទុះ a(8) = s\'\'(8) = 0 m/s² នាំឱ្យរ៉ុក្កែតឈានដល់ល្បឿនលឿនបំផុត v_max = 48 m/s (172.8 km/h)!' },
        { time: 9.0, text: 'ដំណាក់កាលបន្ថយល្បឿន (t > 8s)៖ កម្លាំងទំនាញចាប់ផ្តើមទាញទម្លាក់ សំទុះ a < 0 ល្បឿន s\'(t) ចាប់ផ្តើមថយចុះ។' },
        { time: 11.5, text: 'កំពូលអតិបរមា (t = 16s)៖ ដេរីវេ v(16) = s\'(16) = 0 m/s បន្ទាត់ប៉ះដេកស្មើ 0! រ៉ុក្កែតឡើងដល់ចំណុចខ្ពស់បំផុត 512m មុននឹងធ្លាក់ចុះមកវិញ។' }
      ],
      theoryTitle: '១. ចលនាក្នុងរូបវិទ្យា & ដេរីវេ',
      theoryDesc: 'ក្នុងរូបវិទ្យា និងវិស្វកម្មអវកាស អត្រាបម្រែបម្រួលនៃទីតាំងធៀបនឹងពេលគឺជាល្បឿនខណៈ $v(t) = \\lim_{\\Delta t \\to 0} \\frac{\\Delta s}{\\Delta t} = s\'(t)$។ ហើយអត្រាបម្រែបម្រួលនៃល្បឿនគឺជាសំទុះ $a(t) = v\'(t) = s\'\'(t)$។ តាមរយៈដេរីវេ វិស្វករអាចគណនាល្បឿនរ៉ុក្កែតនៅគ្រប់ខណៈពេលដោយមិនបាច់រង់ចាំវាស់ចម្ងាយសរុប។',
      steps: [
        'សមីការកម្ពស់៖ $s(t) = 6t^2 - 0.25t^3$ (ម៉ែត្រ)',
        'ល្បឿនខណៈ (ដេរីវេទី ១)៖ $v(t) = s\'(t) = 12t - 0.75t^2$ (m/s)',
        'សំទុះ (ដេរីវេទី ២)៖ $a(t) = v\'(t) = s\'\'(t) = 12 - 1.5t$ (m/s²)',
        'ល្បឿនអតិបរមា៖ $a(t) = 0 \\implies 12 - 1.5t = 0 \\implies t = 8\\text{ s} \\implies v_{\\max} = 48\\text{ m/s}$',
        'កម្ពស់អតិបរមា៖ $v(t) = 0 \\implies 12t - 0.75t^2 = 0 \\implies t = 16\\text{ s} \\implies s_{\\max} = 512\\text{ m}$'
      ],
      examTip: 'ក្នុងការប្រឡងបាក់ឌុប កាលណាប្រធានសួររក «ល្បឿនខណៈ» ត្រូវចាំថាគណនាដេរីវេទី ១ នៃអនុគមន៍ចម្ងាយ $v(t) = s\'(t)$! បើសួររក «សំទុះ» ត្រូវគណនាដេរីវេទី ២ $a(t) = s\'\'(t)$!'
    },

    profit: {
      id: 'profit',
      title: '💰 សេដ្ឋកិច្ច & ប្រាក់ចំណេញអតិបរមា (Profit Maximization)',
      category: 'សេដ្ឋកិច្ច & ធុរកិច្ច (Economics & Business)',
      badge: 'ចំណូលរឹម & ចំណាយរឹម MR = MC',
      formula: 'P(x) = R(x) - C(x) = -0.05x² + 180x - 4000 ($)',
      derivativeFormula: 'P\'(x) = R\'(x) - C\'(x) = -0.1x + 180  ⇒  MR = MC',
      domain: [0, 3600],
      duration: 12,
      criticalTime: 1800,
      yRange: [-5000, 165000],
      f: (x) => -0.05 * Math.pow(x, 2) + 180 * x - 4000, // profit
      df: (x) => -0.1 * x + 180, // marginal profit
      metrics: (x) => {
        const p = -0.05 * Math.pow(x, 2) + 180 * x - 4000;
        const mp = -0.1 * x + 180;
        const rev = 220 * x - 0.05 * Math.pow(x, 2);
        return [
          { label: 'ផលិតផល x', value: `${Math.round(x)} គ្រឿង`, color: '#38bdf8' },
          { label: 'ប្រាក់ចំណេញ P(x)', value: `$${Math.round(p).toLocaleString()}`, color: '#10b981' },
          { label: 'ចំណេញរឹម P\'(x)', value: `$${mp.toFixed(2)}/គ្រឿង`, color: '#f59e0b' }
        ];
      },
      narration: [
        { time: 0.0, text: 'ផលិតផល x = 0៖ អាជីវកម្មមិនទាន់ផលិតទំនិញទេ ខាតបង់ថ្លៃដើមថេរ $4,000 ដេរីវេ P\'(0) = $180/គ្រឿង បង្ហាញថាកាលណាផលិត ចំណេញនឹងកើនឡើងយ៉ាងលឿន។' },
        { time: 3.0, text: 'ចំណុចរួចដើម (Break-even point)៖ ផលិតបាន ២៣ គ្រឿង ប្រាក់ចំណេញ P(x) = 0 ចាប់ផ្តើមទទួលបានផលចំណេញសុទ្ធ។' },
        { time: 6.0, text: 'ដេរីវេ P\'(x) > 0៖ ការផលិតបន្ថែមរាល់មួយគ្រឿងៗនៅតែបង្កើនប្រាក់ចំណេញ ព្រោះចំណូលរឹម MR ធំជាងចំណាយរឹម MC (MR > MC)។' },
        { time: 8.5, text: 'ចំណុចមាសប្រាក់ចំណេញអតិបរមា (x = 1,800 គ្រឿង)៖ ដេរីវេ P\'(x) = 0 នាំឱ្យ MR = MC! ប្រាក់ចំណេញកើនឡើងដល់កម្រិតខ្ពស់បំផុត $158,000!' },
        { time: 11.0, text: 'ហួសចំណុចបរមា (x > 1,800 គ្រឿង)៖ ដេរីវេ P\'(x) < 0 ការផលិតលើសចំណុះនាំឱ្យចំណាយរឹមខ្ពស់ជាងចំណូល (MC > MR) ធ្វើឱ្យប្រាក់ចំណេញធ្លាក់ចុះវិញ។' }
      ],
      theoryTitle: '២. ការធ្វើបរមាក្នុងសេដ្ឋកិច្ច (Economic Optimization)',
      theoryDesc: 'ក្នុងសេដ្ឋកិច្ចវិទ្យា ដេរីវេត្រូវបានហៅថា «តម្លៃរឹម (Marginal Concept)»។ ចំណូលរឹម $MR = R\'(x)$ ជាចំណូលបន្ថែមពេលលក់បានទំនិញមួយគ្រឿងទៀត ចំណែកចំណាយរឹម $MC = C\'(x)$ ជាចំណាយបន្ថែម។ ក្រុមហ៊ុននឹងទទួលបានប្រាក់ចំណេញអតិបរមាលុះត្រាតែអត្រាបម្រែបម្រួលប្រាក់ចំណេញស្មើសូន្យ $P\'(x) = 0$ ដែលមានន័យថា $MR = MC$។',
      steps: [
        'អនុគមន៍ចំណូល៖ $R(x) = 220x - 0.05x^2$',
        'អនុគមន៍ចំណាយ៖ $C(x) = 4000 + 40x$',
        'អនុគមន៍ប្រាក់ចំណេញ៖ $P(x) = R(x) - C(x) = -0.05x^2 + 180x - 4000$',
        'គណនាដេរីវេប្រាក់ចំណេញ (ចំណេញរឹម)៖ $P\'(x) = -0.1x + 180$',
        'រកបរមាអតិបរមា៖ $P\'(x) = 0 \\implies -0.1x + 180 = 0 \\implies x = 1,800\\text{ គ្រឿង}$',
        'ប្រាក់ចំណេញអតិបរមា៖ $P(1800) = -0.05(1800)^2 + 180(1800) - 4000 = \\$158,000$'
      ],
      examTip: 'លំហាត់សេដ្ឋកិច្ចក្នុងវិញ្ញាសាបាក់ឌុបតែងតែសួររកចំនួនទំនិញ $x$ ដើម្បីឱ្យ «ប្រាក់ចំណេញអតិបរមា» ឬ «ថ្លៃដើមមធ្យមអប្បបរមា»។ វិធីដោះស្រាយងាយបំផុតគឺគណនាដេរីវេ រួចឱ្យដេរីវេស្មើ ០ ($P\'(x) = 0$)!'
    },

    box: {
      id: 'box',
      title: '📦 វិស្វកម្មវេចខ្ចប់ - បត់ប្រអប់ចំណុះអតិបរមា (Box Optimization)',
      category: 'វិស្វកម្ម & ផលិតកម្ម (Engineering & Manufacturing)',
      badge: 'ចំណុះអតិបរមា V\'(x) = 0',
      formula: 'V(x) = x(30 - 2x)(20 - 2x) = 4x³ - 100x² + 600x (cm³)',
      derivativeFormula: 'V\'(x) = 12x² - 200x + 600 = 0  ⇒  x ≈ 3.68 cm',
      domain: [0, 10],
      duration: 12,
      criticalTime: 3.68,
      yRange: [0, 1200],
      f: (x) => x * (30 - 2 * x) * (20 - 2 * x),
      df: (x) => 12 * Math.pow(x, 2) - 200 * x + 600,
      metrics: (x) => {
        const v = Math.max(0, x * (30 - 2 * x) * (20 - 2 * x));
        const dv = 12 * Math.pow(x, 2) - 200 * x + 600;
        return [
          { label: 'ជ្រុងកាត់ចេញ x', value: `${x.toFixed(2)} cm`, color: '#38bdf8' },
          { label: 'ចំណុះប្រអប់ V(x)', value: `${v.toFixed(1)} cm³`, color: '#10b981' },
          { label: 'អត្រាបម្រែបម្រួល V\'(x)', value: `${dv.toFixed(1)} cm²`, color: '#f59e0b' }
        ];
      },
      narration: [
        { time: 0.0, text: 'ចាប់ផ្តើមបន្ទះក្រដាសរឹងទំហំ 30cm x 20cm៖ បើ x = 0cm (មិនកាត់ជ្រុង) នោះប្រអប់គ្មានកម្ពស់ ចំណុះ V(0) = 0 cm³។' },
        { time: 2.5, text: 'បង្កើនប្រវែងជ្រុងកាត់ x៖ ដេរីវេ V\'(x) > 0 បន្ទាត់ប៉ះងើបឡើងយ៉ាងចោត ចំណុះប្រអប់កើនឡើងយ៉ាងរហ័ស។' },
        { time: 5.5, text: 'ចំណុចប្រសិទ្ធភាពខ្ពស់បំផុត (x = 3.68cm)៖ ដេរីវេ V\'(3.68) = 0 បន្ទាត់ប៉ះដេកស្មើ 0! ចំណុះប្រអប់ឡើងដល់កម្រិតអតិបរមា 1,056.3 cm³!' },
        { time: 8.5, text: 'កាត់ជ្រុងធំពេក (x > 3.68cm)៖ ដេរីវេ V\'(x) < 0 បាតប្រអប់រួមតូចខ្លាំង ធ្វើឱ្យចំណុះថយចុះមកវិញ។' },
        { time: 11.5, text: 'ដល់ដែនកំណត់ (x = 10cm)៖ ជ្រុងកាត់ស្មើពាក់កណ្តាលទទឹង បាតប្រអប់ស្មើ ០ ចំណុះត្រឡប់មកស្មើ V(10) = 0 cm³ វិញ។' }
      ],
      theoryTitle: '៣. បញ្ហាបរមាក្នុងការផលិតកញ្ចប់វេចខ្ចប់',
      theoryDesc: 'ក្នុងឧស្សាហកម្មផលិតកេស ប្រអប់ដឹកទំនិញ និងកំប៉ុង ក្រុមហ៊ុនតែងតែចង់កាត់បន្ថយការប្រើប្រាស់វត្ថុធាតុដើម ប៉ុន្តែទទួលបានចំណុះផ្ទុកធំបំផុត។ តាមរយៈដេរីវេទីមួយ $V\'(x) = 0$ និងដេរីវេទីពីរ $V\'\'(x) < 0$ វិស្វករអាចកំណត់វិមាត្រដ៏ល្អឥតខ្ចោះដោយមិនបាច់ពិសោធន៍ខាតបង់សម្ភារៈឡើយ។',
      steps: [
        'បន្ទះក្រដាសរឹងមានប្រវែងបណ្តោយ $L = 30\\text{ cm}$ និងទទឹង $W = 20\\text{ cm}$',
        'កាត់ជ្រុងទាំងបួនជាការ៉េជ្រុង $x$ នាំឱ្យបាតប្រអប់មានបណ្តោយ $30-2x$ និងទទឹង $20-2x$',
        'អនុគមន៍ចំណុះ៖ $V(x) = x(30 - 2x)(20 - 2x) = 4x^3 - 100x^2 + 600x$',
        'គណនាដេរីវេ៖ $V\'(x) = 12x^2 - 200x + 600$',
        'ឱ្យដេរីវេស្មើ ០៖ $12x^2 - 200x + 600 = 0 \\iff 3x^2 - 50x + 150 = 0$',
        'រកឫសតាម $\\Delta\' = (-25)^2 - 3(150) = 625 - 450 = 175$ នាំឱ្យបាន $x = \\frac{25 - \\sqrt{175}}{3} \\approx 3.68\\text{ cm}$',
        'ចំណុះអតិបរមា៖ $V(3.68) \\approx 1,056.3\\text{ cm}^3$'
      ],
      examTip: 'នេះជាទម្រង់លំហាត់អនុវត្តន៍ដេរីវេដ៏ល្បីល្បាញបំផុតក្នុងកម្មវិធីសិក្សាថ្នាក់ទី១២។ ត្រូវចាំកំណត់ដែនកំណត់នៃអថេរ $0 < x < \\frac{W}{2}$ ដើម្បីកុំឱ្យជ្រើសរើសឫសខុស!'
    },

    medicine: {
      id: 'medicine',
      title: '💊 វេជ្ជសាស្ត្រ & កំហាប់ថ្នាំក្នុងឈាម (Drug Concentration)',
      category: 'វេជ្ជសាស្ត្រ & ជីវវិទ្យា (Medicine & Pharmacokinetics)',
      badge: 'កំហាប់ខ្ពស់បំផុត C\'(t) = 0',
      formula: 'C(t) = 5t · e^{-0.4t} (mg/L)',
      derivativeFormula: 'C\'(t) = 5e^{-0.4t}(1 - 0.4t)  ⇒  Peak at t = 2.5 hours',
      domain: [0, 15],
      duration: 12,
      criticalTime: 2.5,
      yRange: [0, 6],
      f: (t) => 5 * t * Math.exp(-0.4 * t),
      df: (t) => 5 * Math.exp(-0.4 * t) * (1 - 0.4 * t),
      metrics: (t) => {
        const c = 5 * t * Math.exp(-0.4 * t);
        const dc = 5 * Math.exp(-0.4 * t) * (1 - 0.4 * t);
        return [
          { label: 'ពេលវេលាក្រោយចាក់ t', value: `${t.toFixed(1)} ម៉ោង`, color: '#38bdf8' },
          { label: 'កំហាប់ថ្នាំ C(t)', value: `${c.toFixed(2)} mg/L`, color: '#10b981' },
          { label: 'អត្រាស្រូប/កម្ចាត់ C\'(t)', value: `${dc.toFixed(3)} mg/L/h`, color: '#f59e0b' }
        ];
      },
      narration: [
        { time: 0.0, text: 'ពេលចាក់ថ្នាំចូលរាងកាយ (t = 0 ម៉ោង)៖ កំហាប់ថ្នាំក្នុងឈាម C(0) = 0 mg/L ដេរីវេ C\'(0) = 5 mg/L/h បង្ហាញពីល្បឿនស្រូបយកថ្នាំដំបូងដ៏លឿន។' },
        { time: 2.5, text: 'ដំណាក់កាលស្រូបយកថ្នាំ (Absorption, 0 < t < 2.5h)៖ ដេរីវេ C\'(t) > 0 កំហាប់ថ្នាំកើនឡើងដល់កម្រិតព្យាបាលប្រកបដោយប្រសិទ្ធភាព។' },
        { time: 5.5, text: 'កំហាប់ថ្នាំខ្ពស់បំផុត (Peak Efficacy, t = 2.5 ម៉ោង)៖ ដេរីវេ C\'(2.5) = 0 បន្ទាត់ប៉ះដេកស្មើ 0! កំហាប់ថ្នាំឡើងដល់កំពូល 4.60 mg/L។' },
        { time: 8.5, text: 'ដំណាក់កាលកម្ចាត់ថ្នាំចេញ (Elimination, t > 2.5h)៖ ដេរីវេ C\'(t) < 0 ថ្លើមនិងតម្រងនោមចាប់ផ្តើមកម្ចាត់ជាតិថ្នាំចេញតាមលំដាប់លំដោយ។' },
        { time: 11.5, text: 'ការផុតប្រសិទ្ធភាពថ្នាំ (t = 8-12 ម៉ោង)៖ កំហាប់ធ្លាក់ចុះទាបជាងកម្រិតព្យាបាល វេជ្ជបណ្ឌិតប្រើព័ត៌មាននេះដើម្បីកំណត់កាលវិភាគលេបថ្នាំលើកបន្ទាប់។' }
      ],
      theoryTitle: '៤. ឱសថសាស្ត្រគណិតវិទ្យា (Pharmacokinetics Modeling)',
      theoryDesc: 'ក្នុងវេជ្ជសាស្ត្រ ការគ្រប់គ្រងកំហាប់ថ្នាំក្នុងឈាមជាការងារចាំបាច់បំផុត។ ប្រសិនបើកំហាប់ទាបពេក ថ្នាំគ្មានប្រសិទ្ធភាពសម្លាប់មេរោគឡើយ តែបើកំហាប់ខ្ពស់ពេក អាចបណ្តាលឱ្យពុលដល់អ្នកជំងឺ។ វេជ្ជបណ្ឌិតប្រើប្រាស់ដេរីវេ $C\'(t)$ ដើម្បីដឹងថាតើពេលណាថ្នាំមានប្រសិទ្ធភាពខ្ពស់បំផុត ($C\'(t) = 0$) និងពេលណាត្រូវផ្តល់ថ្នាំម្តងទៀត។',
      steps: [
        'អនុគមន៍កំហាប់ថ្នាំ៖ $C(t) = 5t \\cdot e^{-0.4t}$ ($t$ គិតជាម៉ោង, $C$ គិតជា mg/L)',
        'អនុវត្តរូបមន្តដេរីវេផលគុណ $(uv)\' = u\'v + uv\'$៖',
        '$C\'(t) = 5(1) \\cdot e^{-0.4t} + 5t \\cdot (-0.4 e^{-0.4t}) = 5e^{-0.4t}(1 - 0.4t)$',
        'ឱ្យដេរីវេស្មើ ០ រកពេលកំហាប់ខ្ពស់បំផុត៖ $5e^{-0.4t}(1 - 0.4t) = 0$',
        'ដោយ $5e^{-0.4t} > 0$ នាំឱ្យ $1 - 0.4t = 0 \\implies t = \\frac{1}{0.4} = 2.5\\text{ ម៉ោង}$',
        'កំហាប់ថ្នាំអតិបរមា៖ $C(2.5) = 5(2.5) \\cdot e^{-0.4(2.5)} = 12.5 \\cdot e^{-1} \\approx 4.60\\text{ mg/L}$'
      ],
      examTip: 'លំហាត់ទាក់ទងនឹងអនុគមន៍អិចស្ប៉ូណង់ស្យែល $f(x) = x e^{kx}$ ចេញញឹកញាប់ណាស់ក្នុងវិញ្ញាសាបាក់ឌុប។ ចងចាំរូបមន្តដេរីវេ $(e^{u})\' = u\' \\cdot e^u$ និងដាក់ជាផលគុណកត្តាដើម្បីងាយស្រួលរកឫស!'
    },

    hydrology: {
      id: 'hydrology',
      title: '🚰 ធារាសាស្ត្រ & អត្រាបម្រែបម្រួលទាក់ទង (Related Rates)',
      category: 'ធារាសាស្ត្រ & វិស្វកម្មសំណង់ស៊ីវិល (Hydrology & Civil)',
      badge: 'អត្រាស្រក dh/dt ធៀបនឹង dV/dt',
      formula: 'V(h) = (π/12)h³ (m³)  |  dV/dt = -1.5 m³/min',
      derivativeFormula: 'dh/dt = (4 / πh²) · dV/dt  ⇒  កម្ពស់កាន់តែទាប ស្រកកាន់តែលឿន',
      domain: [0, 8],
      duration: 12,
      criticalTime: 4.0,
      yRange: [0, 8],
      f: (t) => Math.max(0.2, 8 - 0.6 * t), // depth of water h(t)
      df: (t) => -0.6,
      metrics: (t) => {
        const h = Math.max(0.4, 8 - 0.6 * t);
        const rate = (-1.5) / ((Math.PI / 4) * Math.pow(h, 2));
        const vol = (Math.PI / 12) * Math.pow(h, 3);
        return [
          { label: 'កម្ពស់ទឹក h(t)', value: `${h.toFixed(2)} m`, color: '#38bdf8' },
          { label: 'មាឌទឹកសល់ V', value: `${vol.toFixed(2)} m³`, color: '#10b981' },
          { label: 'អត្រាស្រក dh/dt', value: `${rate.toFixed(3)} m/min`, color: '#ef4444' }
        ];
      },
      narration: [
        { time: 0.0, text: 'អាងទឹកធារាសាស្ត្ររាងកោណពេញ (h = 8m)៖ ទឹកហូរចេញតាមបាតអាងក្នុងអត្រាថេរ dV/dt = -1.5 m³/min។' },
        { time: 3.0, text: 'កម្ពស់ទឹកខ្ពស់ (h = 6-8m)៖ ផ្ទៃមុខកាត់ធំទូលាយ ធ្វើឱ្យកម្ពស់ទឹកស្រកចុះយឺតៗ dh/dt = -0.03 m/min។' },
        { time: 6.5, text: 'កម្ពស់ទឹកកណ្តាល (h = 4m)៖ អត្រាស្រក dh/dt = -0.12 m/min កើនល្បឿនស្រកលឿនជាងមុន ៤ ដង!' },
        { time: 9.0, text: 'ទឹកជិតអស់ពីអាង (h = 1.5m)៖ ផ្ទៃមុខកាត់រួមតូចខ្លាំង ធ្វើឱ្យទឹកស្រកចុះយ៉ាងគំហុក dh/dt = -0.85 m/min!' },
        { time: 11.5, text: 'សន្និដ្ឋាននៃអត្រាបម្រែបម្រួលទាក់ទង៖ ទោះបីមាឌទឹកហូរចេញក្នុងអត្រាថេរ dV/dt ក៏ដោយ ក៏កម្ពស់ទឹកស្រក dh/dt ប្រែប្រួលច្រាសនឹងការ៉េនៃកម្ពស់ h²។' }
      ],
      theoryTitle: '៥. អត្រាបម្រែបម្រួលទាក់ទង (Related Rates in Fluid Dynamics)',
      theoryDesc: 'ក្នុងវិស្វកម្មធារាសាស្ត្រ និងការគ្រប់គ្រងទំនប់វារីអគ្គិសនី បរិមាណពីរឬច្រើនតែងតែប្រែប្រួលទាក់ទងគ្នាទៅតាមពេលវេលា $t$។ តាមរយៈច្បាប់ច្រវាក់ដេរីវេ (Chain Rule) $\\frac{dV}{dt} = \\frac{dV}{dh} \\cdot \\frac{dh}{dt}$ វិស្វករអាចគណនាអត្រាប្រែប្រួលនៃកម្ពស់ទឹក $\\frac{dh}{dt}$ ឬកម្លាំងសំពាធដោយមិនបាច់វាស់ផ្ទាល់ក្នុងអាង។',
      steps: [
        'ធុងកោណមានកម្ពស់សរុប $H = 10\\text{ m}$ និងកាំមាត់លើ $R = 5\\text{ m}$',
        'តាមសមាមាត្រធរណីមាត្រ៖ $\\frac{r}{h} = \\frac{R}{H} = \\frac{5}{10} = \\frac{1}{2} \\implies r = \\frac{h}{2}$',
        'មាឌទឹកក្នុងធុងកោណ៖ $V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi \\left(\\frac{h}{2}\\right)^2 h = \\frac{\\pi}{12} h^3$',
        'ដេរីវេធៀបនឹងពេល $t$ (ច្បាប់ច្រវាក់ Chain Rule)៖ $\\frac{dV}{dt} = \\frac{d}{dt}\\left(\\frac{\\pi}{12} h^3\\right) = \\frac{\\pi}{4} h^2 \\frac{dh}{dt}$',
        'ទាញរកអត្រាស្រកនៃកម្ពស់ទឹក៖ $\\frac{dh}{dt} = \\frac{4}{\\pi h^2} \\cdot \\frac{dV}{dt}$',
        'នៅពេលទឹកមានកម្ពស់ $h = 4\\text{ m}$ និង $\\frac{dV}{dt} = -1.5\\text{ m}^3/\\text{min}$៖ $\\frac{dh}{dt} = \\frac{4}{\\pi (4)^2} (-1.5) = \\frac{-6}{16\\pi} \\approx -0.119\\text{ m/min}$'
      ],
      examTip: 'ក្នុងការប្រឡងបាក់ឌុបវិទ្យាសាស្ត្រពិត លំហាត់អត្រាបម្រែបម្រួលទាក់ទង (Related Rates) ទាមទារឱ្យប្អូនៗចងចាំរូបមន្តមាឌកោណ $V = \\frac{1}{3}\\pi r^2 h$ និងចេះប្រើរូបមន្តសមាមាត្រត្រីកោណដូចគ្នា $\\frac{r}{h} = \\frac{R}{H}$ ដើម្បីបំបាត់អថេរ $r$!'
    }
  };

  /* ============================================================
     DERIVATIVE VIDEO STUDIO CLASS
     ============================================================ */
  class DerivativeVideoStudio {
    constructor() {
      this.canvas = document.getElementById('derivative-video-canvas');
      if (!this.canvas) return;

      this.ctx = this.canvas.getContext('2d');
      this.currentScenarioKey = 'rocket';
      this.scenario = DERIVATIVE_SCENARIOS[this.currentScenarioKey];

      // Video Timeline & Animation State
      this.currentTime = 0; // 0 to scenario.duration
      this.isPlaying = true;
      this.speed = 1.0;
      this.lastTimestamp = 0;
      this.animationFrameId = null;

      // Video Recording State (MediaRecorder)
      this.isRecording = false;
      this.mediaRecorder = null;
      this.recordedChunks = [];

      // Particle system for simulation
      this.particles = [];

      // DOM Elements Cache
      this.initDom();
      this.bindEvents();
      this.handleResize();
      this.updateScenarioDetails();

      // Start animation loop
      this.loop(0);
    }

    initDom() {
      this.viewport = this.canvas.parentElement;
      this.playBtn = document.getElementById('deriv-play-btn');
      this.replayBtn = document.getElementById('deriv-replay-btn');
      this.progressBar = document.getElementById('deriv-progress-bar');
      this.timeDisplay = document.getElementById('deriv-time-display');
      this.recordBtn = document.getElementById('deriv-record-btn');
      this.recBadge = document.getElementById('deriv-rec-badge');
      this.speedButtons = document.querySelectorAll('[data-deriv-speed]');
      this.scenarioSelect = document.getElementById('deriv-scenario-select');

      // HUD elements
      this.hudFormula = document.getElementById('deriv-hud-formula');
      this.hudMetrics = document.getElementById('deriv-hud-metrics');
      this.narrationText = document.getElementById('deriv-narration-text');

      // Explanations panel
      this.panelCategory = document.getElementById('deriv-detail-category');
      this.panelTitle = document.getElementById('deriv-detail-title');
      this.panelBadge = document.getElementById('deriv-detail-badge');
      this.panelFormula = document.getElementById('deriv-detail-formula');
      this.panelDerivative = document.getElementById('deriv-detail-derivative');
      this.panelTheoryDesc = document.getElementById('deriv-detail-theory');
      this.panelSteps = document.getElementById('deriv-detail-steps');
      this.panelExamTip = document.getElementById('deriv-detail-exam-tip');
    }

    handleResize() {
      if (!this.canvas || !this.viewport) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.logicalWidth = 1280;
      this.logicalHeight = 720;

      this.canvas.width = this.logicalWidth * dpr;
      this.canvas.height = this.logicalHeight * dpr;
      this.canvas.style.width = '100%';
      this.canvas.style.height = 'auto';

      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(dpr, dpr);
    }

    bindEvents() {
      window.addEventListener('resize', () => this.handleResize());

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
          this.updateTimeDisplay();
        });
      }
      if (this.scenarioSelect) {
        this.scenarioSelect.addEventListener('change', (e) => {
          this.switchScenario(e.target.value);
        });
      }
      const scenarioButtons = document.querySelectorAll('[data-deriv-scenario]');
      scenarioButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const key = btn.getAttribute('data-deriv-scenario');
          scenarioButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          if (this.scenarioSelect) this.scenarioSelect.value = key;
          this.switchScenario(key);
        });
      });
      this.speedButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          this.speedButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.speed = parseFloat(btn.getAttribute('data-deriv-speed')) || 1.0;
        });
      });
      if (this.recordBtn) {
        this.recordBtn.addEventListener('click', () => this.toggleRecord());
      }
    }

    switchScenario(key) {
      if (!DERIVATIVE_SCENARIOS[key]) return;
      this.currentScenarioKey = key;
      this.scenario = DERIVATIVE_SCENARIOS[key];
      this.currentTime = 0;
      this.particles = [];
      this.isPlaying = true;
      this.updatePlayBtnState();
      this.updateScenarioDetails();

      const scenarioButtons = document.querySelectorAll('[data-deriv-scenario]');
      scenarioButtons.forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-deriv-scenario') === key);
      });
      if (this.scenarioSelect && this.scenarioSelect.value !== key) {
        this.scenarioSelect.value = key;
      }
    }

    togglePlay() {
      this.isPlaying = !this.isPlaying;
      this.updatePlayBtnState();
    }

    updatePlayBtnState() {
      if (!this.playBtn) return;
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
          <span>លេង (Play)</span>
        `;
      }
    }

    replay() {
      this.currentTime = 0;
      this.particles = [];
      this.isPlaying = true;
      this.updatePlayBtnState();
    }

    updateTimeDisplay() {
      if (!this.timeDisplay || !this.progressBar) return;
      const pct = (this.currentTime / this.scenario.duration) * 100;
      this.progressBar.value = Math.min(100, Math.max(0, pct));
      this.timeDisplay.textContent = `${this.currentTime.toFixed(1)}s / ${this.scenario.duration.toFixed(1)}s`;
    }

    updateScenarioDetails() {
      const s = this.scenario;
      if (this.hudFormula) this.hudFormula.textContent = s.formula;
      if (this.panelCategory) this.panelCategory.textContent = s.category;
      if (this.panelTitle) this.panelTitle.textContent = s.title;
      if (this.panelBadge) this.panelBadge.textContent = s.badge;
      if (this.panelFormula) this.panelFormula.textContent = s.formula;
      if (this.panelDerivative) this.panelDerivative.textContent = s.derivativeFormula;
      if (this.panelTheoryDesc) this.panelTheoryDesc.textContent = s.theoryDesc;
      if (this.panelExamTip) this.panelExamTip.textContent = s.examTip;

      if (this.panelSteps) {
        this.panelSteps.innerHTML = s.steps.map(step => `
          <li style="margin-bottom: 0.6rem; line-height: 1.6;">${step}</li>
        `).join('');
      }

      const renderMath = () => {
        if (typeof window.renderMathInElement === 'function') {
          const detailsEl = document.getElementById('deriv-details-container');
          if (detailsEl) {
            try {
              window.renderMathInElement(detailsEl, {
                delimiters: [
                  { left: '$$', right: '$$', display: true },
                  { left: '$', right: '$', display: false }
                ],
                throwOnError: false
              });
            } catch (e) {}
          }
        }
      };
      renderMath();
      setTimeout(renderMath, 350);
    }

    // Video Recording Feature via MediaRecorder
    toggleRecord() {
      if (this.isRecording) {
        this.stopRecord();
      } else {
        this.startRecord();
      }
    }

    startRecord() {
      if (!this.canvas.captureStream) {
        alert('Browser របស់អ្នកមិនគាំទ្រ Canvas Video Capture ឡើយ។');
        return;
      }
      try {
        const stream = this.canvas.captureStream(60);
        this.recordedChunks = [];
        const mimeTypes = ['video/webm;codecs=vp9', 'video/webm', 'video/mp4'];
        let selectedMime = mimeTypes.find(m => MediaRecorder.isTypeSupported(m)) || '';

        this.mediaRecorder = new MediaRecorder(stream, selectedMime ? { mimeType: selectedMime } : undefined);
        this.mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) this.recordedChunks.push(e.data);
        };
        this.mediaRecorder.onstop = () => {
          const blob = new Blob(this.recordedChunks, { type: selectedMime || 'video/webm' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `Derivative_${this.scenario.id}_Application_${Date.now()}.webm`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setTimeout(() => URL.revokeObjectURL(url), 5000);
        };

        this.mediaRecorder.start();
        this.isRecording = true;
        this.replay(); // start from beginning of scene
        if (this.recBadge) this.recBadge.classList.add('recording-active');
        if (this.recordBtn) {
          this.recordBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="6" width="12" height="12"></rect>
            </svg>
            <span>បញ្ចប់ការថត (Stop Rec)</span>
          `;
          this.recordBtn.classList.add('btn-danger');
        }
      } catch (err) {
        console.error('Error starting video record:', err);
      }
    }

    stopRecord() {
      if (!this.mediaRecorder || !this.isRecording) return;
      this.mediaRecorder.stop();
      this.isRecording = false;
      if (this.recBadge) this.recBadge.classList.remove('recording-active');
      if (this.recordBtn) {
        this.recordBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="3" fill="#ef4444"></circle>
          </svg>
          <span>ថតជាវីដេអូ 60 FPS (Record Video)</span>
        `;
        this.recordBtn.classList.remove('btn-danger');
      }
    }

    // Animation Loop
    loop(timestamp) {
      if (!this.lastTimestamp) this.lastTimestamp = timestamp;
      const dt = (timestamp - this.lastTimestamp) / 1000;
      this.lastTimestamp = timestamp;

      if (this.isPlaying) {
        this.currentTime += dt * this.speed;
        if (this.currentTime >= this.scenario.duration) {
          if (this.isRecording) {
            this.stopRecord();
            this.isPlaying = false;
            this.updatePlayBtnState();
          } else {
            this.currentTime = 0; // Loop seamlessly
          }
        }
        this.updateTimeDisplay();
      }

      this.render();
      this.animationFrameId = requestAnimationFrame((ts) => this.loop(ts));
    }

    render() {
      const ctx = this.ctx;
      const w = this.logicalWidth;
      const h = this.logicalHeight;

      // 1. Dark Cinematic Background
      ctx.fillStyle = '#060a14';
      ctx.fillRect(0, 0, w, h);

      // Subtle Grid Background
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridGap = 32;
      for (let x = 0; x < w; x += gridGap) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridGap) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // 2. Split Screen Layout
      // Left (w * 0.44): Physical Real-World Simulation
      // Right (w * 0.56): Mathematical Derivative Function & Tangent Slope Graph
      const splitX = Math.round(w * 0.44);

      // Vertical Split Line
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.15)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(splitX, 30);
      ctx.lineTo(splitX, h - 30);
      ctx.stroke();
      ctx.setLineDash([]);

      // Section Titles on Canvas
      ctx.font = '600 13px "Kantumruy Pro", sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.textAlign = 'left';
      ctx.fillText('🌍 ការក្លែងធ្វើជាក់ស្តែង (REAL-WORLD SIMULATION)', 32, 42);

      ctx.textAlign = 'left';
      ctx.fillText('📈 ក្រាបដេរីវេ & បន្ទាត់ប៉ះ (MATHEMATICAL DERIVATIVE GRAPH)', splitX + 24, 42);

      // Compute normalized progress t_norm [0, 1]
      const progress = Math.min(1, Math.max(0, this.currentTime / this.scenario.duration));
      // Actual input variable X in domain [min, max]
      const [domMin, domMax] = this.scenario.domain;
      const currentX = domMin + progress * (domMax - domMin);

      // Update HUD metrics & Subtitle narration
      this.updateHudMetrics(currentX);
      this.updateNarrationBanner();

      // Render Left Panel (Physical Simulation)
      this.renderPhysicalSimulation(0, 50, splitX, h - 50, currentX, progress);

      // Render Right Panel (Mathematical Derivative Graph)
      this.renderDerivativeGraph(splitX + 10, 50, w - splitX - 20, h - 50, currentX, progress);
    }

    updateHudMetrics(currentX) {
      if (!this.hudMetrics) return;
      const metrics = this.scenario.metrics(currentX);
      this.hudMetrics.innerHTML = metrics.map(m => `
        <div class="hud-metric-pill" style="border-color: ${m.color}40;">
          <span style="color: var(--text-muted); font-size: 0.78rem;">${m.label}:</span>
          <strong style="color: ${m.color}; margin-left: 0.3rem;">${m.value}</strong>
        </div>
      `).join('');
    }

    updateNarrationBanner() {
      if (!this.narrationText) return;
      const narrations = this.scenario.narration;
      let activeText = narrations[0].text;
      for (let i = 0; i < narrations.length; i++) {
        if (this.currentTime >= narrations[i].time) {
          activeText = narrations[i].text;
        }
      }
      this.narrationText.textContent = activeText;
    }

    /* ============================================================
       LEFT PANEL: PHYSICAL SIMULATIONS
       ============================================================ */
    renderPhysicalSimulation(x, y, width, height, currentX, progress) {
      const ctx = this.ctx;
      const cx = x + width / 2;
      const cy = y + height / 2;

      ctx.save();
      // Clip to left region
      ctx.beginPath();
      ctx.rect(x, y, width, height);
      ctx.clip();

      if (this.scenario.id === 'rocket') {
        this.renderRocketSimulation(x, y, width, height, currentX, progress);
      } else if (this.scenario.id === 'profit') {
        this.renderProfitSimulation(x, y, width, height, currentX, progress);
      } else if (this.scenario.id === 'box') {
        this.renderBoxSimulation(x, y, width, height, currentX, progress);
      } else if (this.scenario.id === 'medicine') {
        this.renderMedicineSimulation(x, y, width, height, currentX, progress);
      } else if (this.scenario.id === 'hydrology') {
        this.renderHydrologySimulation(x, y, width, height, currentX, progress);
      }

      ctx.restore();
    }

    // 1. ROCKET SIMULATION
    renderRocketSimulation(x, y, w, h, currentX, progress) {
      const ctx = this.ctx;
      const groundY = y + h - 80;
      const rocketX = x + w * 0.42;

      // Draw Ground
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(x + 20, groundY, w - 40, 6);
      ctx.fillStyle = '#334155';
      ctx.fillRect(x + 20, groundY + 6, w - 40, 40);

      // Launch Pad Gantry Tower
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.strokeRect(rocketX + 45, groundY - 140, 24, 140);
      for (let gy = groundY - 130; gy < groundY; gy += 20) {
        ctx.beginPath();
        ctx.moveTo(rocketX + 45, gy);
        ctx.lineTo(rocketX + 69, gy + 15);
        ctx.stroke();
      }

      // Height position from f(t): 0 to 512m
      const s = Math.max(0, this.scenario.f(currentX));
      const maxS = 520;
      const rocketY = groundY - (s / maxS) * (h - 180) - 20;

      // Rocket Exhaust Flame & Particle Trail
      if (this.isPlaying && currentX < 15.5) {
        for (let i = 0; i < 3; i++) {
          this.particles.push({
            x: rocketX + (Math.random() - 0.5) * 14,
            y: rocketY + 45,
            vx: (Math.random() - 0.5) * 1.5,
            vy: Math.random() * 3 + 2,
            radius: Math.random() * 6 + 3,
            color: Math.random() > 0.4 ? '#f59e0b' : '#ef4444',
            alpha: 1.0,
            decay: Math.random() * 0.05 + 0.02
          });
        }
      }

      // Draw Particles
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.radius *= 0.96;

        if (p.alpha <= 0) {
          this.particles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      // Rocket Body
      ctx.save();
      ctx.translate(rocketX, rocketY);

      // Rocket Glow
      const glow = ctx.createRadialGradient(0, 15, 5, 0, 15, 45);
      glow.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, 15, 45, 0, Math.PI * 2);
      ctx.fill();

      // Fins
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.moveTo(-12, 25);
      ctx.lineTo(-24, 45);
      ctx.lineTo(-12, 42);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(12, 25);
      ctx.lineTo(24, 45);
      ctx.lineTo(12, 42);
      ctx.closePath();
      ctx.fill();

      // Fuselage Cylinder
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(-12, 0, 24, 42);

      // Nose Cone
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.moveTo(-12, 0);
      ctx.quadraticCurveTo(0, -28, 0, -32);
      ctx.quadraticCurveTo(0, -28, 12, 0);
      ctx.closePath();
      ctx.fill();

      // Cabin Window
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.arc(0, 12, 5.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.restore();

      // Altitude Meter Gauge on Left
      const altX = x + 35;
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(altX, groundY);
      ctx.lineTo(altX, groundY - (h - 200));
      ctx.stroke();

      for (let m = 0; m <= 500; m += 100) {
        const my = groundY - (m / maxS) * (h - 180);
        ctx.beginPath();
        ctx.moveTo(altX - 5, my);
        ctx.lineTo(altX + 5, my);
        ctx.stroke();

        ctx.font = '500 11px sans-serif';
        ctx.fillStyle = '#94a3b8';
        ctx.textAlign = 'right';
        ctx.fillText(`${m}m`, altX - 8, my + 4);
      }

      // Indicator Arrow for current Altitude
      const curMy = groundY - (s / maxS) * (h - 180);
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(altX + 6, curMy);
      ctx.lineTo(altX + 16, curMy - 6);
      ctx.lineTo(altX + 16, curMy + 6);
      ctx.closePath();
      ctx.fill();

      // Velocity Speedometer Dial on Bottom Right
      const dialX = x + w - 85;
      const dialY = groundY - 60;
      const dialR = 48;

      ctx.save();
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.beginPath();
      ctx.arc(dialX, dialY, dialR, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = '600 10px sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.textAlign = 'center';
      ctx.fillText('SPEEDOMETER', dialX, dialY - 26);

      const v = this.scenario.df(currentX);
      const maxV = 55;
      const dialAngle = Math.PI * 0.75 + (Math.max(0, Math.min(maxV, v)) / maxV) * (Math.PI * 1.5);

      // Gauge needle
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(dialX, dialY);
      ctx.lineTo(dialX + Math.cos(dialAngle) * (dialR - 10), dialY + Math.sin(dialAngle) * (dialR - 10));
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(dialX, dialY, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = '700 13px sans-serif';
      ctx.fillStyle = '#f59e0b';
      ctx.fillText(`${v.toFixed(1)} m/s`, dialX, dialY + 22);
      ctx.font = '500 10px sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('v = s\'(t)', dialX, dialY + 34);

      ctx.restore();
    }

    // 2. PROFIT / BUSINESS SIMULATION
    renderProfitSimulation(x, y, w, h, currentX, progress) {
      const ctx = this.ctx;
      const cx = x + w / 2;
      const groundY = y + h - 90;

      // Factory Silhouette
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.moveTo(x + 40, groundY);
      ctx.lineTo(x + 40, groundY - 110);
      ctx.lineTo(x + 90, groundY - 70);
      ctx.lineTo(x + 90, groundY - 110);
      ctx.lineTo(x + 140, groundY - 70);
      ctx.lineTo(x + 140, groundY - 130);
      ctx.lineTo(x + 160, groundY - 130);
      ctx.lineTo(x + 160, groundY - 50);
      ctx.lineTo(x + 220, groundY - 50);
      ctx.lineTo(x + 220, groundY);
      ctx.closePath();
      ctx.fill();

      // Factory Smoke
      if (this.isPlaying) {
        this.particles.push({
          x: x + 150 + (Math.random() - 0.5) * 8,
          y: groundY - 135,
          vx: Math.random() * 0.8 - 0.2,
          vy: -Math.random() * 1.5 - 1,
          radius: Math.random() * 6 + 4,
          color: '#64748b',
          alpha: 0.6,
          decay: 0.02
        });
      }

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.radius += 0.3;
        if (p.alpha <= 0) {
          this.particles.splice(i, 1);
          continue;
        }
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      // Conveyor Belt with Manufactured Boxes
      const beltY = groundY + 15;
      ctx.fillStyle = '#334155';
      ctx.fillRect(x + 30, beltY, w - 60, 12);
      ctx.fillStyle = '#0f172a';
      for (let bx = x + 35; bx < x + w - 40; bx += 22) {
        ctx.beginPath();
        ctx.arc(bx, beltY + 6, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Boxes moving on belt according to quantity x
      const boxCount = Math.min(8, Math.floor(currentX / 250) + 1);
      for (let b = 0; b < boxCount; b++) {
        const boxX = x + 50 + b * 42;
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(boxX, beltY - 24, 28, 24);
        ctx.strokeStyle = '#b45309';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(boxX, beltY - 24, 28, 24);

        ctx.fillStyle = '#ffffff';
        ctx.font = '700 9px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('📦', boxX + 14, beltY - 9);
      }

      // Large Visual Profit / Money Meter Card
      const cardX = x + w * 0.46;
      const cardY = y + 70;
      const cardW = w * 0.5;
      const cardH = 160;

      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(cardX, cardY, cardW, cardH, 14);
      ctx.fill();
      ctx.stroke();

      ctx.font = '700 13px "Kantumruy Pro", sans-serif';
      ctx.fillStyle = '#38bdf8';
      ctx.textAlign = 'left';
      ctx.fillText('💼 តុល្យការប្រាក់ចំណេញអាជីវកម្ម (PROFIT STATUS)', cardX + 16, cardY + 28);

      const pVal = this.scenario.f(currentX);
      const isProfitable = pVal >= 0;

      ctx.font = '700 24px sans-serif';
      ctx.fillStyle = isProfitable ? '#10b981' : '#ef4444';
      ctx.fillText(`P(x) = $${Math.round(pVal).toLocaleString()}`, cardX + 16, cardY + 65);

      const mp = this.scenario.df(currentX);
      ctx.font = '600 12px "Kantumruy Pro", sans-serif';
      ctx.fillStyle = '#f59e0b';
      ctx.fillText(`ចំណេញរឹម P'(x) = MR - MC = $${mp.toFixed(2)} / គ្រឿង`, cardX + 16, cardY + 95);

      // Status Badge
      ctx.fillStyle = Math.abs(mp) < 5 ? '#10b98125' : (mp > 0 ? '#38bdf825' : '#ef444425');
      ctx.strokeStyle = Math.abs(mp) < 5 ? '#10b981' : (mp > 0 ? '#38bdf8' : '#ef4444');
      ctx.beginPath();
      ctx.roundRect(cardX + 16, cardY + 112, cardW - 32, 32, 8);
      ctx.fill();
      ctx.stroke();

      ctx.font = '600 11px "Kantumruy Pro", sans-serif';
      ctx.fillStyle = Math.abs(mp) < 5 ? '#10b981' : (mp > 0 ? '#38bdf8' : '#ef4444');
      ctx.textAlign = 'center';
      if (Math.abs(mp) < 5) {
        ctx.fillText('⭐ ចំណេញអតិបរមា (MR = MC)! បន្ទាត់ប៉ះដេក P\'(x) = 0', cardX + cardW / 2, cardY + 132);
      } else if (mp > 0) {
        ctx.fillText('↗️ គួរបង្កើនការផលិត (P\' > 0, MR > MC)', cardX + cardW / 2, cardY + 132);
      } else {
        ctx.fillText('↘️ លើសចំណុះ កំពុងខាតចំណេញ (P\' < 0, MC > MR)', cardX + cardW / 2, cardY + 132);
      }
    }

    // 3. PACKAGING BOX OPTIMIZATION SIMULATION
    renderBoxSimulation(x, y, w, h, currentX, progress) {
      const ctx = this.ctx;
      const cx = x + w / 2;
      const cy = y + h / 2 - 20;

      // Cardboard sheet dimensions 30cm x 20cm
      const L = 30;
      const W = 20;
      const cut = Math.min(9.5, Math.max(0.1, currentX));

      // Isometric 3D box projection
      const scale = 7.5;
      const baseL = (L - 2 * cut) * scale;
      const baseW = (W - 2 * cut) * scale;
      const boxH = cut * scale * 1.5;

      ctx.save();
      ctx.translate(cx, cy);

      // Title badge
      ctx.font = '600 12px "Kantumruy Pro", sans-serif';
      ctx.fillStyle = '#38bdf8';
      ctx.textAlign = 'center';
      ctx.fillText(`📦 ប្រអប់ចំហបត់ជាក់ស្តែង (ជ្រុងកាត់ x = ${cut.toFixed(2)} cm)`, 0, -140);

      // Isometric projection angles
      const isoX = (px, py) => (px - py) * Math.cos(Math.PI / 6);
      const isoY = (px, py, pz) => (px + py) * Math.sin(Math.PI / 6) - pz;

      // Base 4 points
      const p0 = [isoX(-baseL / 2, -baseW / 2), isoY(-baseL / 2, -baseW / 2, 0)];
      const p1 = [isoX(baseL / 2, -baseW / 2), isoY(baseL / 2, -baseW / 2, 0)];
      const p2 = [isoX(baseL / 2, baseW / 2), isoY(baseL / 2, baseW / 2, 0)];
      const p3 = [isoX(-baseL / 2, baseW / 2), isoY(-baseL / 2, baseW / 2, 0)];

      // Top 4 points (height boxH)
      const t0 = [isoX(-baseL / 2, -baseW / 2), isoY(-baseL / 2, -baseW / 2, boxH)];
      const t1 = [isoX(baseL / 2, -baseW / 2), isoY(baseL / 2, -baseW / 2, boxH)];
      const t2 = [isoX(baseL / 2, baseW / 2), isoY(baseL / 2, baseW / 2, boxH)];
      const t3 = [isoX(-baseL / 2, baseW / 2), isoY(-baseL / 2, baseW / 2, boxH)];

      // Back walls
      ctx.fillStyle = '#92400e';
      ctx.beginPath();
      ctx.moveTo(p0[0], p0[1]);
      ctx.lineTo(p1[0], p1[1]);
      ctx.lineTo(t1[0], t1[1]);
      ctx.lineTo(t0[0], t0[1]);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#78350f';
      ctx.beginPath();
      ctx.moveTo(p0[0], p0[1]);
      ctx.lineTo(p3[0], p3[1]);
      ctx.lineTo(t3[0], t3[1]);
      ctx.lineTo(t0[0], t0[1]);
      ctx.closePath();
      ctx.fill();

      // Bottom Base
      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.moveTo(p0[0], p0[1]);
      ctx.lineTo(p1[0], p1[1]);
      ctx.lineTo(p2[0], p2[1]);
      ctx.lineTo(p3[0], p3[1]);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#d97706';
      ctx.stroke();

      // Front walls
      ctx.fillStyle = 'rgba(217, 119, 6, 0.85)';
      ctx.beginPath();
      ctx.moveTo(p1[0], p1[1]);
      ctx.lineTo(p2[0], p2[1]);
      ctx.lineTo(t2[0], t2[1]);
      ctx.lineTo(t1[0], t1[1]);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#f59e0b';
      ctx.stroke();

      ctx.fillStyle = 'rgba(245, 158, 11, 0.85)';
      ctx.beginPath();
      ctx.moveTo(p3[0], p3[1]);
      ctx.lineTo(p2[0], p2[1]);
      ctx.lineTo(t2[0], t2[1]);
      ctx.lineTo(t3[0], t3[1]);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#fbbf24';
      ctx.stroke();

      // Dimension labels
      ctx.font = '600 11px sans-serif';
      ctx.fillStyle = '#f8fafc';
      ctx.fillText(`បណ្តោយ: ${(L - 2 * cut).toFixed(1)} cm`, 0, 75);
      ctx.fillText(`ទទឹង: ${(W - 2 * cut).toFixed(1)} cm  |  កម្ពស់: ${cut.toFixed(1)} cm`, 0, 95);

      const v = this.scenario.f(cut);
      const isPeak = Math.abs(cut - 3.68) < 0.25;

      ctx.font = '700 16px "Kantumruy Pro", sans-serif';
      ctx.fillStyle = isPeak ? '#10b981' : '#f59e0b';
      ctx.fillText(`ចំណុះ V = ${v.toFixed(1)} cm³ ${isPeak ? '✨ (អតិបរមា)' : ''}`, 0, 125);

      ctx.restore();
    }

    // 4. PHARMACOKINETICS MEDICINE SIMULATION
    renderMedicineSimulation(x, y, w, h, currentX, progress) {
      const ctx = this.ctx;
      const cx = x + w / 2;
      const cy = y + h / 2 - 30;

      // Blood vessel tube
      ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
      ctx.beginPath();
      ctx.roundRect(x + 25, cy - 65, w - 50, 130, 20);
      ctx.fill();
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Bloodstream Particles Flowing
      if (this.isPlaying) {
        const cVal = this.scenario.f(currentX);
        const spawnCount = Math.round(cVal * 1.5) + 1;
        for (let i = 0; i < spawnCount; i++) {
          this.particles.push({
            x: x + 35,
            y: cy + (Math.random() - 0.5) * 80,
            vx: Math.random() * 2 + 3,
            vy: (Math.random() - 0.5) * 0.8,
            radius: Math.random() * 5 + 3,
            color: Math.random() > 0.3 ? '#38bdf8' : '#ef4444', // drug vs blood cells
            alpha: 0.9,
            decay: 0.005
          });
        }
      }

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x > x + w - 45) {
          this.particles.splice(i, 1);
          continue;
        }
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      // Syringe / Pill Injection Icon
      ctx.font = '36px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('💉', x + 50, cy - 80);

      // Safe Therapeutic Range Band
      ctx.fillStyle = 'rgba(16, 185, 129, 0.12)';
      ctx.fillRect(x + 30, cy - 25, w - 60, 50);
      ctx.font = '600 11px "Kantumruy Pro", sans-serif';
      ctx.fillStyle = '#10b981';
      ctx.textAlign = 'right';
      ctx.fillText('🛡️ កម្រិតព្យាបាលសុវត្ថិភាព (Safe Therapeutic Window)', x + w - 40, cy - 35);

      // Status Indicator Card
      const c = this.scenario.f(currentX);
      const dc = this.scenario.df(currentX);
      const isPeak = Math.abs(currentX - 2.5) < 0.25;

      const cardY = y + h - 105;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
      ctx.strokeStyle = isPeak ? '#10b981' : '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(x + 35, cardY, w - 70, 70, 10);
      ctx.fill();
      ctx.stroke();

      ctx.font = '700 14px "Kantumruy Pro", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'left';
      ctx.fillText(`កំហាប់ថ្នាំ៖ C(t) = ${c.toFixed(2)} mg/L`, x + 50, cardY + 28);

      ctx.font = '600 12px "Kantumruy Pro", sans-serif';
      ctx.fillStyle = isPeak ? '#10b981' : (dc > 0 ? '#38bdf8' : '#ef4444');
      if (isPeak) {
        ctx.fillText('✨ កំពូលប្រសិទ្ធភាព C\'(t) = 0! ថ្នាំស្រូបបានពេញលេញ', x + 50, cardY + 52);
      } else if (dc > 0) {
        ctx.fillText(`⬆️ កំពុងស្រូបយកថ្នាំ (Absorption Rate: +${dc.toFixed(2)} mg/L/h)`, x + 50, cardY + 52);
      } else {
        ctx.fillText(`⬇️ កំពុងកម្ចាត់ថ្នាំចេញ (Elimination Rate: ${dc.toFixed(2)} mg/L/h)`, x + 50, cardY + 52);
      }
    }

    // 5. HYDROLOGY WATER TANK SIMULATION
    renderHydrologySimulation(x, y, w, h, currentX, progress) {
      const ctx = this.ctx;
      const cx = x + w / 2;
      const cy = y + h / 2 - 20;

      // Inverted Conical Tank
      const topW = 220;
      const tankH = 240;
      const topY = cy - tankH / 2;
      const botY = cy + tankH / 2;

      // Water height (h varies from 8 down to 0.4)
      const curH = this.scenario.f(currentX);
      const waterTopY = botY - (curH / 8) * tankH;
      const waterW = (curH / 8) * topW;

      // Tank outline
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(cx - topW / 2, topY);
      ctx.lineTo(cx, botY);
      ctx.lineTo(cx + topW / 2, topY);
      ctx.stroke();

      // Ellipse for tank rim
      ctx.beginPath();
      ctx.ellipse(cx, topY, topW / 2, 22, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Water body inside cone
      ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.beginPath();
      ctx.moveTo(cx - waterW / 2, waterTopY);
      ctx.lineTo(cx, botY);
      ctx.lineTo(cx + waterW / 2, waterTopY);
      ctx.closePath();
      ctx.fill();

      // Water top surface ellipse
      ctx.fillStyle = 'rgba(56, 189, 248, 0.6)';
      ctx.beginPath();
      ctx.ellipse(cx, waterTopY, waterW / 2, (waterW / topW) * 22, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Water draining stream from bottom nozzle
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(cx, botY);
      ctx.lineTo(cx, botY + 50);
      ctx.stroke();

      // Water splashes
      if (this.isPlaying) {
        for (let i = 0; i < 2; i++) {
          this.particles.push({
            x: cx + (Math.random() - 0.5) * 8,
            y: botY + 50,
            vx: (Math.random() - 0.5) * 2.5,
            vy: -Math.random() * 2 - 1,
            radius: Math.random() * 3 + 1.5,
            color: '#38bdf8',
            alpha: 0.8,
            decay: 0.05
          });
        }
      }

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        if (p.alpha <= 0) {
          this.particles.splice(i, 1);
          continue;
        }
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      // Rate Indicator on Bottom
      const rate = (-1.5) / ((Math.PI / 4) * Math.pow(curH, 2));
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(cx - 130, y + h - 75, 260, 52, 8);
      ctx.fill();
      ctx.stroke();

      ctx.font = '700 13px "Kantumruy Pro", sans-serif';
      ctx.fillStyle = '#f8fafc';
      ctx.textAlign = 'center';
      ctx.fillText(`កម្ពស់ទឹក h = ${curH.toFixed(2)} m (ស្រកក្នុងអត្រា)`, cx, y + h - 55);
      ctx.font = '700 15px sans-serif';
      ctx.fillStyle = '#ef4444';
      ctx.fillText(`dh/dt = ${rate.toFixed(3)} m/min`, cx, y + h - 35);
    }

    /* ============================================================
       RIGHT PANEL: MATHEMATICAL DERIVATIVE GRAPH & TANGENT
       ============================================================ */
    renderDerivativeGraph(gx, gy, gw, gh, currentX, progress) {
      const ctx = this.ctx;
      const s = this.scenario;

      // Coordinate axes bounds
      const [minX, maxX] = s.domain;
      const [minY, maxY] = s.yRange;

      // Margins inside right panel
      const padL = 60;
      const padR = 40;
      const padT = 30;
      const padB = 60;

      const plotW = gw - padL - padR;
      const plotH = gh - padT - padB;

      // Coordinate mapping functions
      const toScreenX = (valX) => gx + padL + ((valX - minX) / (maxX - minX)) * plotW;
      const toScreenY = (valY) => gy + padT + plotH - ((valY - minY) / (maxY - minY)) * plotH;

      // Origin coordinates
      const originX = toScreenX(Math.max(minX, 0));
      const originY = toScreenY(0);

      // Draw Grid Lines & Values
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      ctx.font = '500 10px sans-serif';
      ctx.fillStyle = '#64748b';
      ctx.textAlign = 'center';

      // X grid ticks
      const xStep = (maxX - minX) / 5;
      for (let vx = minX; vx <= maxX; vx += xStep) {
        const sx = toScreenX(vx);
        ctx.beginPath();
        ctx.moveTo(sx, gy + padT);
        ctx.lineTo(sx, gy + padT + plotH);
        ctx.stroke();

        ctx.fillText(vx.toFixed(vx >= 100 ? 0 : 1), sx, gy + padT + plotH + 18);
      }

      // Y grid ticks
      const yStep = (maxY - minY) / 5;
      ctx.textAlign = 'right';
      for (let vy = minY; vy <= maxY; vy += yStep) {
        const sy = toScreenY(vy);
        ctx.beginPath();
        ctx.moveTo(gx + padL, sy);
        ctx.lineTo(gx + padL + plotW, sy);
        ctx.stroke();

        ctx.fillText(vy >= 1000 ? `${(vy / 1000).toFixed(0)}k` : vy.toFixed(0), gx + padL - 8, sy + 4);
      }

      // Draw Axes Lines
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.5)';
      ctx.lineWidth = 1.5;

      // X Axis
      ctx.beginPath();
      ctx.moveTo(gx + padL, originY);
      ctx.lineTo(gx + padL + plotW, originY);
      ctx.stroke();

      // Y Axis
      ctx.beginPath();
      ctx.moveTo(originX, gy + padT);
      ctx.lineTo(originX, gy + padT + plotH);
      ctx.stroke();

      // Axes Labels
      ctx.font = '600 11px sans-serif';
      ctx.fillStyle = '#38bdf8';
      ctx.textAlign = 'right';
      ctx.fillText('t (Time / Quantity)', gx + padL + plotW, originY - 8);

      ctx.textAlign = 'left';
      ctx.fillText('f(t) [Magnitude]', originX + 8, gy + padT + 12);

      // Draw Full Background Function Curve (dimmed)
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      const samples = 100;
      for (let i = 0; i <= samples; i++) {
        const vx = minX + (i / samples) * (maxX - minX);
        const vy = s.f(vx);
        const sx = toScreenX(vx);
        const sy = toScreenY(vy);
        if (i === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.stroke();

      // Draw Traced Animated Curve Up to currentX (Glowing Cyan)
      ctx.save();
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 12;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      const currentSamples = Math.max(2, Math.round(progress * samples));
      for (let i = 0; i <= currentSamples; i++) {
        const vx = minX + (i / samples) * (maxX - minX);
        const vy = s.f(vx);
        const sx = toScreenX(vx);
        const sy = toScreenY(vy);
        if (i === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
      ctx.restore();

      // Current Point on Curve
      const curY = s.f(currentX);
      const curSlope = s.df(currentX);
      const ptX = toScreenX(currentX);
      const ptY = toScreenY(curY);

      // Shaded Dropdown Guides
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(ptX, originY);
      ctx.lineTo(ptX, ptY);
      ctx.lineTo(originX, ptY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Tangent Line (បន្ទាត់ប៉ះ) with Real Slope
      const tangentDx = (maxX - minX) * 0.18;
      const x1 = currentX - tangentDx;
      const y1 = curY - curSlope * tangentDx;
      const x2 = currentX + tangentDx;
      const y2 = curY + curSlope * tangentDx;

      ctx.save();
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 10;
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(toScreenX(x1), toScreenY(y1));
      ctx.lineTo(toScreenX(x2), toScreenY(y2));
      ctx.stroke();
      ctx.restore();

      // Tangent Slope Triangle (Δy / Δx)
      const triDx = (maxX - minX) * 0.08;
      const triDy = curSlope * triDx;
      const tx0 = ptX;
      const ty0 = ptY;
      const tx1 = toScreenX(currentX + triDx);
      const ty1 = ptY;
      const tx2 = tx1;
      const ty2 = toScreenY(curY + triDy);

      ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(tx0, ty0);
      ctx.lineTo(tx1, ty1);
      ctx.lineTo(tx2, ty2);
      ctx.stroke();

      // Tangent Marker Point
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(ptX, ptY, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Tangent Slope Callout Box
      const calloutX = Math.min(gx + gw - 170, Math.max(gx + padL + 10, ptX + 15));
      const calloutY = Math.min(gy + gh - 80, Math.max(gy + padT + 20, ptY - 45));

      ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
      ctx.strokeStyle = Math.abs(curSlope) < 0.2 ? '#10b981' : '#f59e0b';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(calloutX, calloutY, 150, 48, 8);
      ctx.fill();
      ctx.stroke();

      ctx.font = '700 11px "Kantumruy Pro", sans-serif';
      ctx.fillStyle = '#38bdf8';
      ctx.textAlign = 'left';
      ctx.fillText(`ចំណុច P(${currentX.toFixed(1)}, ${curY.toFixed(1)})`, calloutX + 10, calloutY + 18);

      ctx.font = '700 12px sans-serif';
      ctx.fillStyle = Math.abs(curSlope) < 0.2 ? '#10b981' : '#f59e0b';
      ctx.fillText(`Slope m = f'(t) = ${curSlope.toFixed(2)}`, calloutX + 10, calloutY + 36);

      // Critical Point Highlight (Max / Extremum)
      if (s.criticalTime && s.criticalTime >= minX && s.criticalTime <= maxX) {
        const critX = toScreenX(s.criticalTime);
        const critY = toScreenY(s.f(s.criticalTime));

        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(critX, critY, 4.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = '600 10px "Kantumruy Pro", sans-serif';
        ctx.fillStyle = '#10b981';
        ctx.textAlign = 'center';
        ctx.fillText(`⭐ កំពូល Max (f'=0)`, critX, critY - 12);
      }
    }
  }

  // Auto-instantiate when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    new DerivativeVideoStudio();
  });
})();
