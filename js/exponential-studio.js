/**
 * exponential-studio.js - Real-Life Applications of Exponential Equations Video Studio
 * 60 FPS Canvas Cinematic Animation Studio with Epidemic Spread & ICU Capacity,
 * Compound Interest Doubling (Rule of 72), Newton's Law of Cooling (Coffee),
 * Radiocarbon Dating (Carbon-14 Archaeology), and Pharmacokinetics Drug Clearance.
 * Features Exponential Curve Plotting, Target Equation Horizontal Threshold,
 * Real-Time Intersection Solver Pulse, Physical Scenario Animations, Khmer Narration,
 * Web Audio API Sound Synthesizer, Interactive Equation Calculator, and 60 FPS Video Recording.
 * Teacher Chheng Chhovorn - Mathematics Portfolio
 */

(function () {
  'use strict';

  // ============================================================
  // 1. REAL-LIFE EXPONENTIAL EQUATION SCENARIOS
  // ============================================================
  const EXPONENTIAL_SCENARIOS = {
    epidemic: {
      id: 'epidemic',
      title: '🦠 ការរាលដាលរោគរាតត្បាត & សមីការរកពេលអាសន្ន (Epidemic Spread & Critical Time)',
      category: 'រោគរាតត្បាតវិទ្យា & សុខាភិបាល (Epidemiology & Public Health)',
      badge: 'សមីការ៖ 50 × 2^(t/3) = 6400  |  t = 21 ថ្ងៃ',
      formula: 'N(t) = 50 \\times 2^{\\frac{t}{3}} \\quad (នាក់)',
      targetEquation: '50 \\times 2^{\\frac{t}{3}} = 6400 \\implies 2^{\\frac{t}{3}} = 128 = 2^7 \\implies t = 21\\text{ ថ្ងៃ}',
      targetVal: 6400,
      targetTime: 21,
      maxT: 24,
      maxY: 8000,
      duration: 12, // seconds
      unit: 'នាក់',
      timeUnit: 'ថ្ងៃ',
      f: (t) => 50 * Math.pow(2, t / 3),
      metrics: (t) => {
        const curT = Math.min(24, Math.max(0, t));
        const curY = Math.round(50 * Math.pow(2, curT / 3));
        const isCritical = curT >= 21;
        return [
          { label: 'ពេលវេលា t', value: `${curT.toFixed(1)} ថ្ងៃ`, color: '#38bdf8' },
          { label: 'អ្នកឆ្លងបច្ចុប្បន្ន N(t)', value: `${curY.toLocaleString()} នាក់`, color: isCritical ? '#ef4444' : '#10b981' },
          { label: 'កម្រិតប្រកាសអាសន្ន', value: `6,400 នាក់ (ICU)`, color: '#f59e0b' },
          { label: 'ស្ថានភាពសមីការ', value: isCritical ? '✅ ដល់ចំណុចដំណោះស្រាយ (t=21)' : '⏳ កំពុងកើនឡើងស្វ័យគុណ', color: isCritical ? '#ec4899' : '#a855f7' }
        ];
      },
      narration: [
        { time: 0.0, text: 'ថ្ងៃទី ០ (t = 0)៖ ចាប់ផ្តើមរកឃើញអ្នកឆ្លងដំបូង N_0 = 50 នាក់។ ចំនួនអ្នកឆ្លងកើនឡើងទ្វេដងរាល់ ៣ ថ្ងៃម្តង N(t) = 50 × 2^(t/3)។' },
        { time: 2.5, text: 'ថ្ងៃទី ៦-៩៖ ជំងឺឆ្លងចាប់ផ្តើមរីករាលដាលយ៉ាងលឿន ពី ២០០ ឡើងដល់ ៤០០ នាក់ តាមខ្សែបន្ទាត់អិចស្ប៉ូណង់ស្យែល។' },
        { time: 5.5, text: 'ថ្ងៃទី ១៥៖ ចំនួនអ្នកឆ្លងឡើងដល់ ១,៦០០ នាក់។ មន្ទីរពេទ្យចាប់ផ្តើមខ្វះគ្រែសម្រាកព្យាបាល។' },
        { time: 8.5, text: 'ថ្ងៃទី ២១ (សមីការបានដោះស្រាយ)៖ 50 × 2^(t/3) = 6400 ⇔ 2^(t/3) = 128 = 2⁷ នាំឱ្យ t = 21 ថ្ងៃ! ដល់កម្រិតប្រកាសអាសន្ន ICU ពេញ!' },
        { time: 11.0, text: 'សន្និដ្ឋាន៖ ការដោះស្រាយសមីការអិចស្ប៉ូណង់ស្យែល ជួយឱ្យក្រសួងសុខាភិបាលព្យាករណ៍ទុកជាមុននូវពេលប្រកាសអាសន្ន និងរៀបចំវិធានការទប់ស្កាត់។' }
      ],
      theoryTitle: '១. គំរូគណិតវិទ្យានៃជំងឺឆ្លងរាតត្បាត (Mathematical Epidemiology)',
      theoryDesc: 'ក្នុងរោគរាតត្បាតវិទ្យា (Epidemiology) ការចម្លងជំងឺឆ្លងដោយគ្មានវិធានការទប់ស្កាត់ តែងតែដើរតាមគំរូអនុគមន៍អិចស្ប៉ូណង់ស្យែល $N(t) = N_0 \\cdot b^{t/k}$ ដែល $k$ ជា «រយៈពេលនៃការកើនទ្វេដង (Doubling Time)»។ សមីការអិចស្ប៉ូណង់ស្យែលត្រូវបានបង្កើតឡើងដើម្បីរកពេលវេលា $t$ ដែលចំនួនអ្នកជំងឺនឹងកើនឡើងដល់កម្រិតអតិបរមានៃប្រព័ន្ធសុខាភិបាល (Critical ICU Capacity)។',
      steps: [
        'សមីការគំរូនៃអ្នកឆ្លងជំងឺ៖ $N(t) = 50 \\times 2^{\\frac{t}{3}}$ (កើនទ្វេដងរាល់ $3$ ថ្ងៃ)',
        'កម្រិតប្រកាសអាសន្នផ្ទុកមន្ទីរពេទ្យ៖ $N(t) = 6,400\\text{ នាក់}$',
        'ទាញបានសមីការអិចស្ប៉ូណង់ស្យែល៖ $50 \\times 2^{\\frac{t}{3}} = 6,400$',
        'ចែកអង្គទាំងពីរនឹង 50៖ $2^{\\frac{t}{3}} = \\frac{6,400}{50} = 128$',
        'បំប្លែងអង្គខាងស្តាំជាស្វ័យគុណនៃគោល 2៖ $128 = 2^7$',
        'សមីការក្លាយជា៖ $2^{\\frac{t}{3}} = 2^7 \\implies \\frac{t}{3} = 7$',
        'ទាញបានដំណោះស្រាយ៖ $t = 7 \\times 3 = 21\\text{ ថ្ងៃ}$'
      ],
      examTip: 'គន្លឹះដោះស្រាយសមីការអិចស្ប៉ូណង់ស្យែលក្នុងប្រឡងបាក់ឌុប៖ ត្រូវតែបំប្លែងអង្គទាំងសងខាងឱ្យមាន «គោលដូចគ្នា» (Same Base) $a^{f(x)} = a^c \\implies f(x) = c$។'
    },

    invest_doubling: {
      id: 'invest_doubling',
      title: '💰 វិនិយោគការប្រាក់សមាស & សមីការទ្វេដងដើមទុន (Rule of 72 & Doubling Investment)',
      category: 'ហិរញ្ញវត្ថុ & ផែនការចូលនិវត្តន៍ (Finance & Wealth Planning)',
      badge: 'សមីការ៖ 5000 × (1.08)^t = 10000  |  t ≈ 9 ឆ្នាំ',
      formula: 'A(t) = 5000 \\times (1.08)^t \\quad ($)',
      targetEquation: '5000 \\times (1.08)^t = 10000 \\implies 1.08^t = 2 \\implies t = \\frac{\\ln 2}{\\ln 1.08} \\approx 9.0\\text{ ឆ្នាំ}',
      targetVal: 10000,
      targetTime: 9.006,
      maxT: 12,
      maxY: 13000,
      duration: 12,
      unit: '$',
      timeUnit: 'ឆ្នាំ',
      f: (t) => 5000 * Math.pow(1.08, t),
      metrics: (t) => {
        const curT = Math.min(12, Math.max(0, t));
        const curY = Math.round(5000 * Math.pow(1.08, curT));
        const isDoubled = curT >= 9.0;
        return [
          { label: 'ពេលវេលា t', value: `${curT.toFixed(1)} ឆ្នាំ`, color: '#38bdf8' },
          { label: 'ទ្រព្យសម្បត្តិ A(t)', value: `$${curY.toLocaleString()}`, color: isDoubled ? '#10b981' : '#f59e0b' },
          { label: 'គោលដៅទ្វេដង', value: `$10,000 (2×)`, color: '#ec4899' },
          { label: 'ស្ថានភាពសមីការ', value: isDoubled ? '🎯 សម្រេចគោលដៅទ្វេដង (t≈9.0ឆ្នាំ)' : '📈 កំពុងបង្កើនការប្រាក់សមាស', color: isDoubled ? '#10b981' : '#38bdf8' }
        ];
      },
      narration: [
        { time: 0.0, text: 'ឆ្នាំទី ០ (t = 0)៖ វិនិយោគប្រាក់ដើម $5,000 ក្នុងមូលនិធិភាគហ៊ុនអត្រាចំណេញ 8% ក្នុងមួយឆ្នាំ A(t) = 5000 × (1.08)^t។' },
        { time: 2.5, text: 'ឆ្នាំទី ៣-៤៖ ប្រាក់ដើមកើនដល់ $6,802។ ការប្រាក់បង្កើតផលបន្តបន្ទាប់គ្នាជារៀងរាល់ឆ្នាំ។' },
        { time: 5.5, text: 'ឆ្នាំទី ៧៖ ទ្រព្យសម្បត្តិកើនដល់ $8,569 ជិតឈានដល់គោលដៅទ្វេដងដែលបានគ្រោងទុក។' },
        { time: 8.5, text: 'ឆ្នាំទី ៩.០ (សមីការបានដោះស្រាយ)៖ 1.08^t = 2 នាំឱ្យ t = ln(2)/ln(1.08) ≈ 9 ឆ្នាំគត់! ប្រាក់ដើមកើនឡើងទ្វេដងដល់ $10,000!' },
        { time: 11.0, text: 'សន្និដ្ឋាន៖ នេះជាច្បាប់ដ៏ល្បីឈ្មោះ Rule of 72 ក្នុងហិរញ្ញវត្ថុ (72 / 8% = 9 ឆ្នាំ) ផ្អែកលើសមីការអិចស្ប៉ូណង់ស្យែល។' }
      ],
      theoryTitle: '២. ច្បាប់ទ្វេដងដើមទុន & ការប្រាក់សមាស (Compound Interest Equation)',
      theoryDesc: 'ក្នុងការវិនិយោគរយៈពេលវែង សមីការអិចស្ប៉ូណង់ស្យែលត្រូវបានប្រើដើម្បីកំណត់ពេលវេលាដែលដើមទុនកើនឡើងទ្វេដង ($A = 2P$) ឬកើនឡើងដល់ចំនួនណាមួយដែលចង់បាន។ តាមរយៈច្បាប់គណិតវិទ្យា $P(1+r)^t = 2P \\iff (1+r)^t = 2$ នាំឱ្យ $t = \\frac{\\ln 2}{\\ln(1+r)} \\approx \\frac{0.693}{r} \\approx \\frac{72}{100r}$ (Rule of 72)។',
      steps: [
        'ប្រាក់វិនិយោគដំបូង៖ $P = $5,000$ អត្រាការប្រាក់ប្រចាំឆ្នាំ $r = 8\\% = 0.08$',
        'រូបមន្តប្រាក់សរុប៖ $A(t) = P(1 + r)^t = 5000(1.08)^t$',
        'គោលដៅចង់បានប្រាក់ទ្វេដង៖ $A(t) = $10,000$',
        'បង្កើតសមីការអិចស្ប៉ូណង់ស្យែល៖ $5000(1.08)^t = 10,000$',
        'ចែកអង្គទាំងពីរនឹង 5000៖ $(1.08)^t = \\frac{10,000}{5000} = 2$',
        'បំពាក់លោការីតនេពែ $(\\ln)$ លើអង្គទាំងពីរ៖ $\\ln(1.08^t) = \\ln 2 \\implies t \\ln(1.08) = \\ln 2$',
        'ទាញបានពេលវេលា៖ $t = \\frac{\\ln 2}{\\ln 1.08} \\approx \\frac{0.69315}{0.07696} \\approx 9.006\\text{ ឆ្នាំ}$'
      ],
      examTip: 'កាលណាគោលនៃសមីការមិនអាចបំប្លែងជាស្វ័យគុណនៃចំនួនគត់ដូចគ្នាបានទេ យើងត្រូវតែបំពាក់លោការីត $\\ln$ ឬ $\\log$ លើអង្គទាំងសងខាង $a^t = b \\implies t = \\frac{\\ln b}{\\ln a}$។'
    },

    cooling: {
      id: 'cooling',
      title: '☕ ច្បាប់នៃការចុះត្រជាក់ញូវតុន (Newton\'s Law of Cooling - កាហ្វេក្តៅ)',
      category: 'រូបវិទ្យាកម្ដៅ & វិស្វកម្មចំណីអាហារ (Thermal Physics & Forensics)',
      badge: 'សមីការ៖ 25 + 65 × (0.92)^t = 57.5°C  |  t ≈ 8.3 នាទី',
      formula: 'T(t) = 25 + 65 \\times (0.92)^t \\quad (^\\circ\\text{C})',
      targetEquation: '25 + 65 \\times (0.92)^t = 57.5 \\implies (0.92)^t = 0.5 \\implies t = \\frac{\\ln 0.5}{\\ln 0.92} \\approx 8.3\\text{ នាទី}',
      targetVal: 57.5,
      targetTime: 8.31,
      maxT: 14,
      maxY: 95,
      minY: 20,
      duration: 12,
      unit: '°C',
      timeUnit: 'នាទី',
      f: (t) => 25 + 65 * Math.pow(0.92, t),
      metrics: (t) => {
        const curT = Math.min(14, Math.max(0, t));
        const curY = (25 + 65 * Math.pow(0.92, curT)).toFixed(1);
        const isSafe = curT >= 8.3;
        return [
          { label: 'ពេលវេលា t', value: `${curT.toFixed(1)} នាទី`, color: '#38bdf8' },
          { label: 'សីតុណ្ហភាពកាហ្វេ T(t)', value: `${curY} °C`, color: isSafe ? '#10b981' : '#ef4444' },
          { label: 'កម្រិតសុវត្ថិភាពផឹក', value: `57.5 °C`, color: '#f59e0b' },
          { label: 'ស្ថានភាពសមីការ', value: isSafe ? '☕ សីតុណ្ហភាពល្មមផឹកដោយសុវត្ថិភាព' : '🔥 ក្តៅខ្លាំង (អាចរលាកមាត់)', color: isSafe ? '#10b981' : '#ef4444' }
        ];
      },
      narration: [
        { time: 0.0, text: 'នាទីទី ០ (t = 0)៖ កាហ្វេឆុងថ្មីៗមានកម្ដៅខ្លាំង T_0 = 90°C ក្នុងបន្ទប់ម៉ាស៊ីនត្រជាក់សីតុណ្ហភាព 25°C។ T(t) = 25 + 65 × (0.92)^t។' },
        { time: 2.5, text: 'នាទីទី ២-៤៖ ចំហាយទឹកហុយឡើង កាហ្វេចាប់ផ្តើមចុះត្រជាក់យ៉ាងលឿនមកត្រឹម 74°C ដោយសារកម្ដៅផ្ទេរទៅបរិយាកាស។' },
        { time: 5.5, text: 'នាទីទី ៦៖ សីតុណ្ហភាពចុះមកដល់ 64°C ល្បឿននៃការចុះត្រជាក់ចាប់ផ្តើមថយចុះបន្តិចម្តងៗ។' },
        { time: 8.3, text: 'នាទីទី ៨.៣ (សមីការបានដោះស្រាយ)៖ (0.92)^t = 0.5 នាំឱ្យ t = ln(0.5)/ln(0.92) ≈ 8.3 នាទី! សីតុណ្ហភាពចុះដល់ 57.5°C ល្មមផឹកបានដោយសុវត្ថិភាព!' },
        { time: 11.0, text: 'សន្និដ្ឋាន៖ ច្បាប់ចុះត្រជាក់ញូវតុន ក៏ត្រូវបាននគរបាលកោសល្យវិច័យប្រើដើម្បីកំណត់ពេលវេលាស្លាប់របស់ជនរងគ្រោះយ៉ាងសុក្រឹតផងដែរ។' }
      ],
      theoryTitle: '៣. ច្បាប់នៃការចុះត្រជាក់ញូវតុន (Newton\'s Law of Cooling)',
      theoryDesc: 'លោក អ៊ីសាក់ ញូវតុន បានរកឃើញថា អត្រានៃការផ្ទេរកម្ដៅពីវត្ថុមួយទៅកាន់បរិយាកាសជុំវិញ សមាមាត្រទៅនឹងផលដកនៃសីតុណ្ហភាពរវាងវត្ថុ និងមជ្ឈដ្ឋានជុំវិញ។ រូបមន្តសីតុណ្ហភាពតាមពេលវេលាគឺ $T(t) = T_{\\text{env}} + (T_0 - T_{\\text{env}}) \\cdot e^{-kt} = T_{\\text{env}} + A \\cdot b^t$។ ច្បាប់នេះត្រូវយកទៅប្រើក្នុងការផលិតចំណីអាហារ ម៉ាស៊ីនរថយន្ត និងកោសល្យវិច័យវេជ្ជសាស្ត្រ។',
      steps: [
        'សីតុណ្ហភាពបន្ទប់៖ $T_{\\text{env}} = 25^\\circ\\text{C}$, សីតុណ្ហភាពដើមនៃកាហ្វេ៖ $T_0 = 90^\\circ\\text{C}$',
        'រូបមន្តចុះត្រជាក់៖ $T(t) = 25 + (90 - 25)(0.92)^t = 25 + 65(0.92)^t$',
        'សីតុណ្ហភាពសុវត្ថិភាពដែលចង់បាន៖ $T(t) = 57.5^\\circ\\text{C}$',
        'បង្កើតសមីការ៖ $25 + 65(0.92)^t = 57.5$',
        'ដក 25 ពីអង្គទាំងពីរ៖ $65(0.92)^t = 57.5 - 25 = 32.5$',
        'ចែកអង្គទាំងពីរនឹង 65៖ $(0.92)^t = \\frac{32.5}{65} = 0.5$',
        'បំពាក់លោការីត $\\ln$ ទាំងសងខាង៖ $t = \\frac{\\ln 0.5}{\\ln 0.92} \\approx \\frac{-0.69315}{-0.08338} \\approx 8.31\\text{ នាទី}$'
      ],
      examTip: 'លំហាត់សមីការទម្រង់ $A \\cdot b^t + C = D$៖ ដំបូងត្រូវរុញចំនួនថេរ $C$ ទៅខាងស្តាំ រួចចែកនឹង $A$ ដើម្បីឱ្យសល់តែស្វ័យគុណទោល $b^t = \\frac{D - C}{A}$ មុននឹងបំពាក់លោការីត។'
    },

    carbon14: {
      id: 'carbon14',
      title: '☢️ កំណត់អាយុកាលបុរាណវិទ្យាដោយកាបូន-១៤ (Radiocarbon Dating)',
      category: 'បុរាណវិទ្យា & ភូគព្ភសាស្ត្រ (Archaeology & Nuclear Physics)',
      badge: 'សមីការ៖ (1/2)^(t/5730) = 0.25  |  t = 11,460 ឆ្នាំ',
      formula: 'N(t) = N_0 \\times \\left(\\frac{1}{2}\\right)^{\\frac{t}{5730}} \\quad (\\text{បរិមាណ})',
      targetEquation: '\\left(\\frac{1}{2}\\right)^{\\frac{t}{5730}} = 0.25 = \\left(\\frac{1}{2}\\right)^2 \\implies \\frac{t}{5730} = 2 \\implies t = 11,460\\text{ ឆ្នាំ}',
      targetVal: 0.25,
      targetTime: 11460,
      maxT: 18000,
      maxY: 1.1,
      minY: 0,
      duration: 12,
      unit: '× N₀',
      timeUnit: 'ឆ្នាំ',
      f: (t) => Math.pow(0.5, t / 5730),
      metrics: (t) => {
        const curT = Math.min(18000, Math.max(0, t));
        const curY = Math.pow(0.5, curT / 5730);
        const percent = (curY * 100).toFixed(1);
        const isDated = curT >= 11460;
        return [
          { label: 'អាយុកាល t', value: `${Math.round(curT).toLocaleString()} ឆ្នាំ`, color: '#38bdf8' },
          { label: 'កាបូន-១៤ សេសសល់', value: `${percent}% N₀`, color: isDated ? '#10b981' : '#f59e0b' },
          { label: 'កម្រិតសំណាកហ្វូស៊ីល', value: `25.0% N₀ (២ អាយុកាល)`, color: '#ec4899' },
          { label: 'ស្ថានភាពសមីការ', value: isDated ? '🏺 កំណត់អាយុហ្វូស៊ីលបានជោគជ័យ' : '⏳ កំពុងគណនាការបំបែកវិទ្យុសកម្ម', color: isDated ? '#10b981' : '#a855f7' }
        ];
      },
      narration: [
        { time: 0.0, text: 'ឆ្នាំទី ០ (t = 0)៖ ភាវរស់នៅរស់មានកាបូន-១៤ ពេញលេញ ១០០% (N_0)។ ពេលស្លាប់ កាបូន-១៤ ចាប់ផ្តើមបំបែកវិទ្យុសកម្មដោយមានអាយុកាលពាក់កណ្តាល ៥,៧៣០ ឆ្នាំ។' },
        { time: 2.5, text: 'ក្រោយ ៥,៧៣០ ឆ្នាំ (n = 1 វដ្ត)៖ បរិមាណកាបូន-១៤ ថយចុះពាក់កណ្តាលនៅសល់ ៥០% នៃបរិមាណដើម N_0។' },
        { time: 5.5, text: 'ក្រោយ ៨,០០០ ឆ្នាំ៖ ការបំបែកវិទ្យុសកម្មបន្តថយចុះបន្តិចម្តងៗនៅសល់ប្រមាណ ៣៨%។' },
        { time: 8.5, text: 'ក្រោយ ១១,៤៦០ ឆ្នាំ (សមីការបានដោះស្រាយ)៖ (1/2)^(t/5730) = 0.25 = (1/2)² នាំឱ្យ t/5730 = 2 ⇒ t = 11,460 ឆ្នាំគត់ (យុគថ្មរំលីង)! ហ្វូស៊ីលមានអាយុ ១១,៤៦០ ឆ្នាំ!' },
        { time: 11.0, text: 'សន្និដ្ឋាន៖ វិធីសាស្ត្រ Carbon-14 ឈ្នះរង្វាន់ណូបែលឆ្នាំ ១៩៦០ និងជាមូលដ្ឋានគ្រឹះក្នុងការស្រាវជ្រាវប្រវត្តិសាស្ត្រអង្គរ និងមនុស្សជាតិបុរាណ។' }
      ],
      theoryTitle: '៤. វិធីសាស្ត្រកាបូនវិទ្យុសកម្ម Carbon-14 (Radiocarbon Dating)',
      theoryDesc: 'វិធីសាស្ត្រកាបូន-១៤ បង្កើតឡើងដោយលោក Willard Libby (ឈ្នះរង្វាន់ណូបែលគីមីវិទ្យាឆ្នាំ ១៩៦០)។ កាបូន-១៤ ជាអ៊ីសូតូបវិទ្យុសកម្មមិនស្ថិតស្ថេរដែលមានអាយុកាលពាក់កណ្តាល (Half-life) $t_{1/2} = 5,730\\text{ ឆ្នាំ}$។ តាមរយៈសមីការអិចស្ប៉ូណង់ស្យែល អ្នកបុរាណវិទ្យាអាចដឹងពីអាយុកាលពិតនៃសំណល់ឈើ ឆ្អឹងសត្វបុរាណ ឬប្រាសាទបុរាណដោយគ្រាន់តែវាស់ភាគរយកាបូន-១៤ ដែលនៅសល់។',
      steps: [
        'អាយុកាលពាក់កណ្តាលនៃ Carbon-14៖ $t_{1/2} = 5,730\\text{ ឆ្នាំ}$',
        'រូបមន្តបំបែកវិទ្យុសកម្ម៖ $N(t) = N_0 \\cdot \\left(\\frac{1}{2}\\right)^{\\frac{t}{5730}}$',
        'សំណាកហ្វូស៊ីលបុរាណនៅសល់៖ $N(t) = 25\\% N_0 = 0.25 N_0$',
        'បង្កើតសមីការ៖ $N_0 \\left(\\frac{1}{2}\\right)^{\\frac{t}{5730}} = 0.25 N_0$',
        'សម្រួល $N_0$ ចោល៖ $\\left(\\frac{1}{2}\\right)^{\\frac{t}{5730}} = 0.25 = \\frac{1}{4}$',
        'បំប្លែងជាស្វ័យគុណនៃគោល $\\frac{1}{2}$៖ $\\frac{1}{4} = \\left(\\frac{1}{2}\\right)^2$',
        'សមីការក្លាយជា៖ $\\left(\\frac{1}{2}\\right)^{\\frac{t}{5730}} = \\left(\\frac{1}{2}\\right)^2 \\implies \\frac{t}{5730} = 2$',
        'ទាញបានអាយុកាលហ្វូស៊ីល៖ $t = 2 \\times 5,730 = 11,460\\text{ ឆ្នាំ}$'
      ],
      examTip: 'លំហាត់ពាក់ព័ន្ធនឹងអាយុកាលពាក់កណ្តាល $T$ ៖ រូបមន្តតែងតែមានទម្រង់ $N(t) = N_0 \\cdot (0.5)^{\\frac{t}{T}}$។ ពេលជួបភាគរយ $25\\% = \\frac{1}{4} = (0.5)^2$, $12.5\\% = \\frac{1}{8} = (0.5)^3$ អាចដោះស្រាយបានភ្លាមៗដោយមិនបាច់ប្រើម៉ាស៊ីនគិតលេខ។'
    },

    pharmacology: {
      id: 'pharmacology',
      title: '💊 កម្រិតឱសថក្នុងឈាម & សមីការចាក់ដូសបន្ទាប់ (Pharmacokinetics Drug Clearance)',
      category: 'ឱសថសាស្ត្រ & វេជ្ជសាស្ត្រគ្លីនិក (Pharmacokinetics & Clinical Care)',
      badge: 'សមីការ៖ 400 × (0.75)^t = 168.75 mg  |  t = 3 ម៉ោង',
      formula: 'C(t) = 400 \\times (0.75)^t \\quad (\\text{mg})',
      targetEquation: '400 \\times (0.75)^t = 168.75 \\implies (0.75)^t = 0.421875 = (0.75)^3 \\implies t = 3\\text{ ម៉ោង}',
      targetVal: 168.75,
      targetTime: 3,
      maxT: 6,
      maxY: 450,
      duration: 12,
      unit: 'mg',
      timeUnit: 'ម៉ោង',
      f: (t) => 400 * Math.pow(0.75, t),
      metrics: (t) => {
        const curT = Math.min(6, Math.max(0, t));
        const curY = (400 * Math.pow(0.75, curT)).toFixed(1);
        const isSafeToDose = curT >= 3.0;
        return [
          { label: 'ពេលវេលា t', value: `${curT.toFixed(1)} ម៉ោង`, color: '#38bdf8' },
          { label: 'កំហាប់ថ្នាំ C(t)', value: `${curY} mg`, color: isSafeToDose ? '#10b981' : '#f59e0b' },
          { label: 'កម្រិតចាក់ដូសបន្ទាប់', value: `168.75 mg`, color: '#ec4899' },
          { label: 'ស្ថានភាពសមីការ', value: isSafeToDose ? '💉 សុវត្ថិភាពក្នុងការចាក់ដូសទី ២ (t=3h)' : '⚠️ មិនទាន់អាចចាក់បន្ថែម (ខ្លាចលើសកម្រិត)', color: isSafeToDose ? '#10b981' : '#ef4444' }
        ];
      },
      narration: [
        { time: 0.0, text: 'ម៉ោងទី ០ (t = 0)៖ ចាក់ថ្នាំអង់ទីប៊ីយ៉ូទិកដំបូង ៤០០ មីលីក្រាម (C_0 = 400 mg) ចូលទៅក្នុងឈាមអ្នកជំងឺ។' },
        { time: 2.5, text: 'ម៉ោងទី ១៖ ថ្លើម និងតម្រងនោមបន្សាបឱសថបាន ២៥% ក្នុងមួយម៉ោង ដូច្នេះនៅសល់ ៧៥% គឺ C(t) = 400 × (0.75)^t។ នៅសល់ ៣០០ mg។' },
        { time: 5.5, text: 'ម៉ោងទី ២៖ កំហាប់ថ្នាំថយចុះមកត្រឹម ២២៥ មីលីក្រាម។ វេជ្ជបណ្ឌិតមិនទាន់អាចចាក់បន្ថែមទេ ព្រោះអាចបង្កពុលថ្លើម។' },
        { time: 8.5, text: 'ម៉ោងទី ៣ (សមីការបានដោះស្រាយ)៖ 400 × (0.75)^t = 168.75 ⇒ (0.75)^t = 0.421875 = (0.75)³ ⇒ t = 3 ម៉ោងគត់! ដល់ពេលចាក់ដូសបន្ទាប់ដោយសុវត្ថិភាព!' },
        { time: 11.0, text: 'សន្និដ្ឋាន៖ ការកំណត់កាលវិភាគលេបថ្នាំ និងចាក់ថ្នាំក្នុងមន្ទីរពេទ្យ សុទ្ធតែផ្អែកលើដំណោះស្រាយនៃសមីការអិចស្ប៉ូណង់ស្យែល។' }
      ],
      theoryTitle: '៥. ឱសថសាស្ត្រគ្លីនិក & ការបន្សាបឱសថ (Pharmacokinetics)',
      theoryDesc: 'ក្នុងវេជ្ជសាស្ត្រ និងឱសថសាស្ត្រ ការបន្សាបឱសថចេញពីរាងកាយតាមតម្រងនោម និងថ្លើម តែងតែដើរតាមច្បាប់លំដាប់ទីមួយ (First-order Elimination Kinetics) ដែលជាអនុគមន៍ចុះអិចស្ប៉ូណង់ស្យែល $C(t) = C_0 \\cdot e^{-k_e t} = C_0 \\cdot b^t$។ គ្រូពេទ្យត្រូវដោះស្រាយសមីការអិចស្ប៉ូណង់ស្យែលដើម្បីដឹងពីចន្លោះពេលចាក់ថ្នាំ (Dosing Interval) ជៀសវាងការខ្វះកម្រិតថ្នាំព្យាបាល ឬការលើកម្រិតពុល (Toxicity)។',
      steps: [
        'កម្រិតថ្នាំដំបូងក្នុងឈាម៖ $C_0 = 400\\text{ mg}$',
        'អត្រាសេសសល់រាល់ ១ ម៉ោង៖ $b = 100\\% - 25\\% = 75\\% = 0.75$',
        'រូបមន្តកំហាប់ឱសថ៖ $C(t) = 400 \\times (0.75)^t$',
        'កម្រិតសុវត្ថិភាពសម្រាប់ចាក់ដូសបន្ទាប់៖ $C(t) = 168.75\\text{ mg}$',
        'បង្កើតសមីការ៖ $400 \\times (0.75)^t = 168.75$',
        'ចែកអង្គទាំងពីរនឹង 400៖ $(0.75)^t = \\frac{168.75}{400} = 0.421875$',
        'សង្កេតឃើញថា៖ $0.75^1 = 0.75, 0.75^2 = 0.5625, 0.75^3 = 0.421875$',
        'សមីការក្លាយជា៖ $(0.75)^t = (0.75)^3 \\implies t = 3\\text{ ម៉ោង}$'
      ],
      examTip: 'លំហាត់គណិតវិទ្យាអនុវត្តន៍ក្នុងជីវសាស្ត្រ៖ ត្រូវកត់សម្គាល់ពាក្យ «ថយចុះ $p\\%$ ក្នុងមួយខ្នាតពេល» នាំឱ្យគោលនៃអិចស្ប៉ូណង់ស្យែលគឺ $b = 1 - \\frac{p}{100}$។ បើ «កើនឡើង $p\\%$» នោះគោលគឺ $b = 1 + \\frac{p}{100}$។'
    }
  };

  // ============================================================
  // 2. AUDIO SYNTHESIZER (WEB AUDIO API)
  // ============================================================
  class AudioFx {
    constructor() {
      this.ctx = null;
      this.enabled = true;
    }

    ensureContext() {
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

    playSolveChime() {
      if (!this.enabled) return;
      this.ensureContext();
      if (!this.ctx) return;

      const t = this.ctx.currentTime;
      // Arpeggio chime for equation solved: C5 -> E5 -> G5 -> C6
      const freqs = [523.25, 659.25, 783.99, 1046.5];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t + idx * 0.08);

        gain.gain.setValueAtTime(0.001, t + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.15, t + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + idx * 0.08 + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t + idx * 0.08);
        osc.stop(t + idx * 0.08 + 0.55);
      });
    }

    playClickTone() {
      if (!this.enabled) return;
      this.ensureContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, t);
      gain.gain.setValueAtTime(0.05, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.08);
    }
  }

  // ============================================================
  // 3. MAIN EXPONENTIAL VIDEO STUDIO CLASS
  // ============================================================
  class ExponentialVideoStudio {
    constructor() {
      this.canvas = document.getElementById('exponential-video-canvas');
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.currentScenarioId = 'epidemic';
      this.scenario = EXPONENTIAL_SCENARIOS.epidemic;

      this.currentTime = 0;
      this.isPlaying = true;
      this.playbackSpeed = 1.0;
      this.lastFrameTime = performance.now();
      this.hasPlayedSolveChime = false;

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
      this.playBtn = document.getElementById('exp-play-btn');
      this.replayBtn = document.getElementById('exp-replay-btn');
      this.progressBar = document.getElementById('exp-progress-bar');
      this.timeDisplay = document.getElementById('exp-time-display');
      this.narrationText = document.getElementById('exp-narration-text');
      this.hudFormula = document.getElementById('exp-hud-formula');
      this.hudMetrics = document.getElementById('exp-hud-metrics');
      this.recBadge = document.getElementById('exp-rec-badge');
      this.recordBtn = document.getElementById('exp-record-btn');
      this.recordBtnText = document.getElementById('exp-record-btn-text');
      this.scenarioSelect = document.getElementById('exp-scenario-select');
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
          this.hasPlayedSolveChime = false;
          this.updateHUD();
        });
      }

      // Speed Buttons
      const speedBtns = document.querySelectorAll('[data-exp-speed]');
      speedBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          speedBtns.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          this.playbackSpeed = parseFloat(btn.getAttribute('data-exp-speed'));
          this.audio.playClickTone();
        });
      });

      // Scenario Buttons
      const scenarioBtns = document.querySelectorAll('[data-exp-scenario]');
      scenarioBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-exp-scenario');
          scenarioBtns.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          this.switchScenario(id);
          this.audio.playClickTone();
        });
      });

      if (this.scenarioSelect) {
        this.scenarioSelect.addEventListener('change', (e) => {
          this.switchScenario(e.target.value);
          scenarioBtns.forEach((b) => {
            b.classList.toggle('active', b.getAttribute('data-exp-scenario') === e.target.value);
          });
        });
      }

      if (this.recordBtn) {
        this.recordBtn.addEventListener('click', () => this.toggleRecordVideo());
      }
    }

    initCalculator() {
      const calcBtn = document.getElementById('exp-calc-run-btn');
      if (calcBtn) {
        calcBtn.addEventListener('click', () => {
          this.runCalculator();
          this.audio.playClickTone();
        });
      }
    }

    runCalculator() {
      const aVal = parseFloat(document.getElementById('exp-calc-a')?.value || 50);
      const bVal = parseFloat(document.getElementById('exp-calc-b')?.value || 2);
      const kVal = parseFloat(document.getElementById('exp-calc-k')?.value || 1);
      const targetVal = parseFloat(document.getElementById('exp-calc-target')?.value || 6400);
      const resEl = document.getElementById('exp-calc-result');
      if (!resEl) return;

      if (aVal <= 0 || bVal <= 0 || bVal === 1 || targetVal <= 0) {
        resEl.innerHTML = `<div style="color:#ef4444; padding:0.5rem;">⚠️ សូមបញ្ចូលតម្លៃ a > 0, b > 0, b ≠ 1 និង តម្លៃដៅ > 0!</div>`;
        return;
      }

      // Equation: a * b^(k * t) = Target => b^(k * t) = Target / a => k * t = ln(Target/a)/ln(b) => t = (1/k) * (ln(Target/a)/ln(b))
      const ratio = targetVal / aVal;
      const exponent = Math.log(ratio) / Math.log(bVal);
      const tSolved = exponent / (kVal || 1);

      resEl.innerHTML = `
        <div style="background:rgba(236, 72, 153, 0.15); border:1px solid rgba(236, 72, 153, 0.35); border-radius:8px; padding:0.85rem; font-size:0.9rem; line-height:1.7;">
          <div style="color:#f472b6; font-weight:700; margin-bottom:0.25rem;">🎉 ដំណោះស្រាយសមីការអិចស្ប៉ូណង់ស្យែល៖</div>
          <div>• ទម្រង់សមីការ៖ <strong>${aVal} \\times ${bVal}^{${kVal !== 1 ? kVal + ' \\cdot ' : ''}t} = ${targetVal.toLocaleString()}</strong></div>
          <div>• ចែកនឹង ${aVal}៖ <strong>${bVal}^{${kVal !== 1 ? kVal + ' \\cdot ' : ''}t} = ${ratio.toLocaleString(undefined, { maximumFractionDigits: 4 })}</strong></div>
          <div>• បំពាក់លោការីត $\\ln$៖ <strong>t = \\frac{\\ln(${ratio.toFixed(4)})}{${kVal !== 1 ? kVal + ' \\cdot ' : ''}\\ln(${bVal})}</strong></div>
          <div style="margin-top:0.4rem; color:#38bdf8; font-size:1.05rem;">
            👉 ដំណោះស្រាយ៖ <strong>t \\approx ${tSolved.toFixed(4)}</strong> (ឯកតាពេលវេលា)
          </div>
        </div>
      `;

      if (window.renderMathInElement) {
        window.renderMathInElement(resEl, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false }
          ],
          throwOnError: false
        });
      }
    }

    switchScenario(scenarioId) {
      if (!EXPONENTIAL_SCENARIOS[scenarioId]) return;
      this.currentScenarioId = scenarioId;
      this.scenario = EXPONENTIAL_SCENARIOS[scenarioId];
      this.currentTime = 0;
      this.hasPlayedSolveChime = false;
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
      this.hasPlayedSolveChime = false;
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
          const blob = new Blob(this.recordedChunks, { type: mimeType });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `exponential-equation-${this.currentScenarioId}-60fps.webm`;
          document.body.appendChild(a);
          a.click();
          setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }, 200);
        };

        this.mediaRecorder.start();
        this.isRecording = true;
        this.currentTime = 0;
        this.hasPlayedSolveChime = false;
        if (this.recBadge) this.recBadge.classList.add('recording');
        if (this.recordBtnText) this.recordBtnText.textContent = '⏹️ បញ្ឈប់ & ទាញយក (Stop)';
      } catch (err) {
        console.error('Error starting MediaRecorder:', err);
        alert('ប្រព័ន្ធរុករក (Browser) របស់អ្នកមិនគាំទ្រការថតវីដេអូ Canvas ដោយផ្ទាល់ឡើយ។');
      }
    }

    stopRecording() {
      if (this.mediaRecorder && this.isRecording) {
        this.mediaRecorder.stop();
        this.isRecording = false;
        if (this.recBadge) this.recBadge.classList.remove('recording');
        if (this.recordBtnText) this.recordBtnText.textContent = 'ថតវីដេអូក្លែងធ្វើ (Record)';
      }
    }

    updateHUD() {
      const progress = Math.min(100, Math.max(0, (this.currentTime / this.scenario.duration) * 100));
      if (this.progressBar) this.progressBar.value = progress;

      if (this.timeDisplay) {
        this.timeDisplay.textContent = `${this.currentTime.toFixed(1)}s / ${this.scenario.duration.toFixed(1)}s`;
      }

      const currentT = (this.currentTime / this.scenario.duration) * this.scenario.maxT;

      if (this.hudFormula) {
        this.hudFormula.textContent = this.scenario.targetEquation;
      }

      if (this.hudMetrics) {
        const metrics = this.scenario.metrics(currentT);
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

      // Check if current time hit the solution threshold
      if (currentT >= this.scenario.targetTime && !this.hasPlayedSolveChime) {
        this.hasPlayedSolveChime = true;
        this.audio.playSolveChime();
        this.spawnTargetConfetti();
      }
    }

    spawnTargetConfetti() {
      const splitX = this.width * 0.44;
      for (let i = 0; i < 35; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 5;
        this.particles.push({
          x: splitX + (this.width - splitX) * 0.6,
          y: this.height * 0.45,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 2 + Math.random() * 3,
          color: ['#ec4899', '#38bdf8', '#10b981', '#f59e0b', '#a855f7'][Math.floor(Math.random() * 5)],
          life: 1.0,
          decay: 0.015 + Math.random() * 0.02
        });
      }
    }

    updateDetailsView() {
      const catEl = document.getElementById('exp-detail-category');
      const badgeEl = document.getElementById('exp-detail-badge');
      const titleEl = document.getElementById('exp-detail-title');
      const formEl = document.getElementById('exp-detail-formula');
      const targetEqEl = document.getElementById('exp-detail-equation');
      const theoryEl = document.getElementById('exp-detail-theory');
      const examTipEl = document.getElementById('exp-detail-exam-tip');
      const stepsListEl = document.getElementById('exp-detail-steps');

      if (catEl) catEl.textContent = this.scenario.category;
      if (badgeEl) badgeEl.textContent = this.scenario.badge;
      if (titleEl) titleEl.textContent = this.scenario.title;
      if (formEl) formEl.textContent = this.scenario.formula;
      if (targetEqEl) targetEqEl.textContent = this.scenario.targetEquation;
      if (theoryEl) theoryEl.textContent = this.scenario.theoryDesc;
      if (examTipEl) examTipEl.textContent = this.scenario.examTip;

      if (stepsListEl) {
        stepsListEl.innerHTML = this.scenario.steps
          .map((step) => `<li style="margin-bottom: 0.5rem; line-height: 1.6; color: #e2e8f0;">${step}</li>`)
          .join('');
      }

      this.runCalculator();

      if (window.renderMathInElement) {
        const container = document.getElementById('exponential-video-studio');
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
          this.hasPlayedSolveChime = false;
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

      // Dark canvas gradient background
      const bgGrad = ctx.createLinearGradient(0, 0, w, h);
      bgGrad.addColorStop(0, '#090d16');
      bgGrad.addColorStop(0.5, '#0d1322');
      bgGrad.addColorStop(1, '#080c14');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      const splitX = w * 0.44;
      const currentT = (this.currentTime / this.scenario.duration) * this.scenario.maxT;

      // Vertical Split line
      ctx.strokeStyle = 'rgba(236, 72, 153, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(splitX, 0);
      ctx.lineTo(splitX, h);
      ctx.stroke();
      ctx.setLineDash([]);

      // Left Panel: Physical Simulation Scene
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, splitX, h);
      ctx.clip();
      this.renderPhysicalScene(ctx, 0, 0, splitX, h, currentT);
      ctx.restore();

      // Right Panel: Exponential Curve & Target Equation Intersection
      ctx.save();
      ctx.beginPath();
      ctx.rect(splitX, 0, w - splitX, h);
      ctx.clip();
      this.renderEquationGraph(ctx, splitX, 0, w - splitX, h, currentT);
      ctx.restore();

      this.renderParticles(ctx);
    }

    // ============================================================
    // 5. PHYSICAL SIMULATION SCENES (LEFT PANEL)
    // ============================================================
    renderPhysicalScene(ctx, x, y, w, h, currentT) {
      switch (this.currentScenarioId) {
        case 'epidemic':
          this.renderEpidemicScene(ctx, x, y, w, h, currentT);
          break;
        case 'invest_doubling':
          this.renderInvestScene(ctx, x, y, w, h, currentT);
          break;
        case 'cooling':
          this.renderCoolingScene(ctx, x, y, w, h, currentT);
          break;
        case 'carbon14':
          this.renderCarbon14Scene(ctx, x, y, w, h, currentT);
          break;
        case 'pharmacology':
          this.renderPharmacologyScene(ctx, x, y, w, h, currentT);
          break;
      }
    }

    // 1. Epidemic Outbreak Simulation
    renderEpidemicScene(ctx, x, y, w, h, currentT) {
      const cx = x + w * 0.5;
      const cy = y + h * 0.52;

      ctx.fillStyle = '#f8fafc';
      ctx.font = '700 15px "Kantumruy Pro", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🦠 បណ្តាញចម្លងរោគរាតត្បាត & ICU', cx, y + 36);

      const curY = Math.round(50 * Math.pow(2, currentT / 3));
      const isCritical = currentT >= 21;

      ctx.fillStyle = isCritical ? '#ef4444' : '#38bdf8';
      ctx.font = '600 13px "Outfit", sans-serif';
      ctx.fillText(`t = ${currentT.toFixed(1)} ថ្ងៃ  •  N(t) = ${curY.toLocaleString()} នាក់`, cx, y + 56);

      // Hospital / City ring
      const ringRadius = Math.min(w * 0.42, h * 0.35);
      ctx.strokeStyle = isCritical ? 'rgba(239, 68, 68, 0.6)' : 'rgba(56, 189, 248, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Transmission Nodes
      const totalNodes = 36;
      const activeNodes = Math.min(totalNodes, Math.round((curY / 6400) * totalNodes));

      for (let i = 0; i < totalNodes; i++) {
        const angle = (i / totalNodes) * Math.PI * 2 + (i % 2 === 0 ? 0.2 : 0);
        const dist = (0.25 + 0.65 * ((i * 17) % 10) / 10) * ringRadius;
        const nx = cx + Math.cos(angle) * dist;
        const ny = cy + Math.sin(angle) * dist;

        const isSick = i < activeNodes;
        ctx.fillStyle = isSick ? '#ef4444' : '#334155';
        ctx.beginPath();
        ctx.arc(nx, ny, isSick ? 4.5 : 2.5, 0, Math.PI * 2);
        ctx.fill();

        if (isSick && i > 0) {
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.25)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(nx, ny);
          ctx.stroke();
        }
      }

      // Center Patient Zero
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(cx, cy, 7, 0, Math.PI * 2);
      ctx.fill();

      // ICU Capacity Meter at Bottom
      const meterW = w * 0.75;
      const meterH = 14;
      const meterX = cx - meterW * 0.5;
      const meterY = y + h - 55;

      ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
      ctx.fillRect(meterX, meterY, meterW, meterH);
      ctx.strokeStyle = '#475569';
      ctx.strokeRect(meterX, meterY, meterW, meterH);

      const fillPct = Math.min(1.0, curY / 6400);
      const fillW = meterW * fillPct;
      ctx.fillStyle = isCritical ? '#ef4444' : '#10b981';
      ctx.fillRect(meterX, meterY, fillW, meterH);

      ctx.fillStyle = '#e2e8f0';
      ctx.font = '600 11px "Kantumruy Pro", sans-serif';
      ctx.fillText(`ផ្ទុក ICU: ${Math.round(fillPct * 100)}% (កម្រិតអាសន្ន 6,400 នាក់)`, cx, meterY - 6);
    }

    // 2. Investment Doubling Scene
    renderInvestScene(ctx, x, y, w, h, currentT) {
      const cx = x + w * 0.5;
      const cy = y + h * 0.52;

      ctx.fillStyle = '#f8fafc';
      ctx.font = '700 15px "Kantumruy Pro", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('💰 កំណើនការប្រាក់សមាស & ទ្វេដងដើមទុន', cx, y + 36);

      const curY = Math.round(5000 * Math.pow(1.08, currentT));
      const isDoubled = currentT >= 9.0;

      ctx.fillStyle = isDoubled ? '#10b981' : '#f59e0b';
      ctx.font = '600 13px "Outfit", sans-serif';
      ctx.fillText(`t = ${currentT.toFixed(1)} ឆ្នាំ  •  A(t) = $${curY.toLocaleString()}`, cx, y + 56);

      // Bank Vault Safe Circle
      const safeRadius = Math.min(w * 0.38, h * 0.33);
      ctx.fillStyle = 'rgba(30, 41, 59, 0.7)';
      ctx.beginPath();
      ctx.arc(cx, cy, safeRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = isDoubled ? '#10b981' : '#f59e0b';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Big Multiplier Display in center
      const multiplier = (curY / 5000).toFixed(2);
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 32px "Outfit", sans-serif';
      ctx.fillText(`${multiplier}×`, cx, cy + 5);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '600 12px "Kantumruy Pro", sans-serif';
      ctx.fillText(isDoubled ? '🎉 សម្រេចគោលដៅ 2.00× (10,000$)' : 'គោលដៅទ្វេដង៖ 2.00×', cx, cy + 28);

      // Stacks of Gold Coins visual
      const coinStacks = 5;
      const stackWidth = 24;
      const startX = cx - (coinStacks * stackWidth * 1.3) * 0.5;
      for (let s = 0; s < coinStacks; s++) {
        const stackX = startX + s * stackWidth * 1.3;
        const maxCoinsInStack = 6;
        const currentCoins = Math.min(maxCoinsInStack, Math.round(((curY - 5000) / 5000) * maxCoinsInStack * (s + 1) / coinStacks + 1));

        for (let c = 0; c < currentCoins; c++) {
          const coinY = cy + safeRadius * 0.7 - c * 7;
          ctx.fillStyle = '#eab308';
          ctx.beginPath();
          ctx.ellipse(stackX, coinY, 12, 4, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#ca8a04';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // 3. Newton's Cooling Coffee Scene
    renderCoolingScene(ctx, x, y, w, h, currentT) {
      const cx = x + w * 0.5;
      const cy = y + h * 0.56;

      ctx.fillStyle = '#f8fafc';
      ctx.font = '700 15px "Kantumruy Pro", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('☕ ចុះត្រជាក់កាហ្វេ (Newton\'s Cooling)', cx, y + 36);

      const temp = (25 + 65 * Math.pow(0.92, currentT)).toFixed(1);
      const isSafe = currentT >= 8.3;

      ctx.fillStyle = isSafe ? '#10b981' : '#ef4444';
      ctx.font = '600 13px "Outfit", sans-serif';
      ctx.fillText(`t = ${currentT.toFixed(1)} នាទី  •  T(t) = ${temp} °C`, cx, y + 56);

      // Coffee Mug Body
      const mugW = 75;
      const mugH = 85;
      const mugX = cx - mugW * 0.5;
      const mugY = cy - mugH * 0.5;

      // Steam lines rising if hot
      if (temp > 40) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = 2;
        for (let i = -1; i <= 1; i++) {
          const sx = cx + i * 18;
          const wave = Math.sin((currentT * 4) + i * 2) * 6;
          ctx.beginPath();
          ctx.moveTo(sx, mugY - 5);
          ctx.bezierCurveTo(sx + wave, mugY - 25, sx - wave, mugY - 45, sx, mugY - 60);
          ctx.stroke();
        }
      }

      // Mug Ceramic
      ctx.fillStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.roundRect(mugX, mugY, mugW, mugH, [0, 0, 16, 16]);
      ctx.fill();

      // Mug Handle
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(mugX + mugW + 6, cy - 5, 20, -Math.PI * 0.4, Math.PI * 0.4);
      ctx.stroke();

      // Coffee Liquid Interior
      ctx.fillStyle = '#451a03';
      ctx.fillRect(mugX + 6, mugY + 8, mugW - 12, mugH - 18);

      // Temperature Thermometer Bar on Left
      const thermoX = mugX - 35;
      const thermoY = mugY;
      const thermoH = mugH;
      const thermoW = 12;

      ctx.fillStyle = '#1e293b';
      ctx.fillRect(thermoX, thermoY, thermoW, thermoH);
      ctx.strokeStyle = '#64748b';
      ctx.strokeRect(thermoX, thermoY, thermoW, thermoH);

      // Fill height according to temp (from 25 to 90)
      const tPct = (temp - 25) / 65;
      const tFillH = Math.max(0, thermoH * tPct);
      ctx.fillStyle = isSafe ? '#10b981' : '#ef4444';
      ctx.fillRect(thermoX, thermoY + (thermoH - tFillH), thermoW, tFillH);

      ctx.fillStyle = isSafe ? '#10b981' : '#f59e0b';
      ctx.font = '600 11px "Kantumruy Pro", sans-serif';
      ctx.fillText(isSafe ? '✅ សីតុណ្ហភាពសុវត្ថិភាព 57.5°C' : '🔥 ក្តៅខ្លាំង (កុំទាន់ផឹក)', cx, y + h - 40);
    }

    // 4. Carbon-14 Archaeology Scene
    renderCarbon14Scene(ctx, x, y, w, h, currentT) {
      const cx = x + w * 0.5;
      const cy = y + h * 0.52;

      ctx.fillStyle = '#f8fafc';
      ctx.font = '700 15px "Kantumruy Pro", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('☢️ កំណត់អាយុកាលហ្វូស៊ីលបុរាណ (C-14)', cx, y + 36);

      const remainingPct = (Math.pow(0.5, currentT / 5730) * 100).toFixed(1);
      const isDated = currentT >= 11460;

      ctx.fillStyle = isDated ? '#10b981' : '#f59e0b';
      ctx.font = '600 13px "Outfit", sans-serif';
      ctx.fillText(`t = ${Math.round(currentT).toLocaleString()} ឆ្នាំ  •  C-14 = ${remainingPct}%`, cx, y + 56);

      // Ancient Fossil Bone Representation
      ctx.fillStyle = '#d6d3d1';
      ctx.beginPath();
      // Bone shape
      ctx.ellipse(cx, cy, 60, 16, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx - 55, cy - 10, 12, 0, Math.PI * 2);
      ctx.arc(cx - 55, cy + 10, 12, 0, Math.PI * 2);
      ctx.arc(cx + 55, cy - 10, 12, 0, Math.PI * 2);
      ctx.arc(cx + 55, cy + 10, 12, 0, Math.PI * 2);
      ctx.fill();

      // Glowing C-14 atoms (decaying over time)
      const totalAtoms = 40;
      const activeAtoms = Math.round((remainingPct / 100) * totalAtoms);
      for (let i = 0; i < totalAtoms; i++) {
        const ax = cx - 50 + (i % 10) * 11 + Math.sin(i) * 4;
        const ay = cy - 8 + Math.floor(i / 10) * 6 + Math.cos(i) * 3;
        const isStillC14 = i < activeAtoms;

        ctx.fillStyle = isStillC14 ? '#38bdf8' : '#78716c';
        ctx.beginPath();
        ctx.arc(ax, ay, isStillC14 ? 3 : 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = isDated ? '#10b981' : '#94a3b8';
      ctx.font = '600 12px "Kantumruy Pro", sans-serif';
      ctx.fillText(isDated ? '🏺 អាយុហ្វូស៊ីល៖ ១១,៤៦០ ឆ្នាំ (២ វដ្ត)' : 'អាយុកាលពាក់កណ្តាល៖ ៥,៧៣០ ឆ្នាំ/វដ្ត', cx, y + h - 50);
    }

    // 5. Pharmacology Drug Clearance Scene
    renderPharmacologyScene(ctx, x, y, w, h, currentT) {
      const cx = x + w * 0.5;
      const cy = y + h * 0.52;

      ctx.fillStyle = '#f8fafc';
      ctx.font = '700 15px "Kantumruy Pro", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('💊 បន្សាបឱសថ & ចាក់ដូសបន្ទាប់', cx, y + 36);

      const curY = (400 * Math.pow(0.75, currentT)).toFixed(1);
      const isSafe = currentT >= 3.0;

      ctx.fillStyle = isSafe ? '#10b981' : '#f59e0b';
      ctx.font = '600 13px "Outfit", sans-serif';
      ctx.fillText(`t = ${currentT.toFixed(1)} ម៉ោង  •  C(t) = ${curY} mg`, cx, y + 56);

      // IV Syringe & Infusion Bag
      const bagW = 70;
      const bagH = 95;
      const bagX = cx - bagW * 0.5;
      const bagY = cy - bagH * 0.5;

      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(bagX, bagY, bagW, bagH);

      // Fluid remaining
      const fluidPct = Math.min(1.0, curY / 400);
      const fluidH = bagH * fluidPct;
      ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.fillRect(bagX + 2, bagY + bagH - fluidH, bagW - 4, fluidH - 2);

      // Drug molecules floating
      const molecules = Math.round(fluidPct * 20);
      for (let m = 0; m < molecules; m++) {
        const mx = bagX + 12 + ((m * 19) % (bagW - 24));
        const my = bagY + bagH - fluidH + 10 + ((m * 13) % Math.max(10, fluidH - 15));
        ctx.fillStyle = '#ec4899';
        ctx.beginPath();
        ctx.arc(mx, my, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = isSafe ? '#10b981' : '#ef4444';
      ctx.font = '600 12px "Kantumruy Pro", sans-serif';
      ctx.fillText(isSafe ? '💉 សុវត្ថិភាពសម្រាប់ដូសបន្ទាប់ (168.75 mg)' : '⚠️ មិនទាន់អាចចាក់បន្ថែម (រង់ចាំ t=3h)', cx, y + h - 50);
    }

    // ============================================================
    // 6. EXPONENTIAL EQUATION GRAPH & INTERSECTION SOLVER (RIGHT PANEL)
    // ============================================================
    renderEquationGraph(ctx, x, y, w, h, currentT) {
      const padLeft = 65;
      const padRight = 35;
      const padTop = 60;
      const padBottom = 55;

      const graphW = w - padLeft - padRight;
      const graphH = h - padTop - padBottom;
      const originX = x + padLeft;
      const originY = y + padTop + graphH;

      const maxT = this.scenario.maxT;
      const maxY = this.scenario.maxY;
      const minY = this.scenario.minY || 0;

      // Coordinate Transform Helpers
      const mapX = (t) => originX + (t / maxT) * graphW;
      const mapY = (val) => originY - ((val - minY) / (maxY - minY)) * graphH;

      // Graph Header
      ctx.fillStyle = '#f8fafc';
      ctx.font = '700 14px "Kantumruy Pro", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('📈 ក្រាហ្វសមីការអិចស្ប៉ូណង់ស្យែល & ចំណុចប្រសព្វ (t*, y*)', originX, y + 36);

      // Grid Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.lineWidth = 1;
      const gridXSteps = 6;
      for (let i = 0; i <= gridXSteps; i++) {
        const gx = originX + (i / gridXSteps) * graphW;
        ctx.beginPath();
        ctx.moveTo(gx, originY);
        ctx.lineTo(gx, originY - graphH);
        ctx.stroke();

        const tVal = (i / gridXSteps) * maxT;
        ctx.fillStyle = '#64748b';
        ctx.font = '500 11px "Outfit", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(tVal >= 1000 ? `${(tVal / 1000).toFixed(0)}k` : tVal.toFixed(0), gx, originY + 18);
      }

      const gridYSteps = 5;
      for (let j = 0; j <= gridYSteps; j++) {
        const gy = originY - (j / gridYSteps) * graphH;
        ctx.beginPath();
        ctx.moveTo(originX, gy);
        ctx.lineTo(originX + graphW, gy);
        ctx.stroke();

        const yVal = minY + (j / gridYSteps) * (maxY - minY);
        ctx.fillStyle = '#64748b';
        ctx.font = '500 11px "Outfit", sans-serif';
        ctx.textAlign = 'right';
        let yLabel = Math.round(yVal).toLocaleString();
        if (maxY <= 2) yLabel = yVal.toFixed(2);
        ctx.fillText(yLabel, originX - 8, gy + 4);
      }

      // X and Y Axes
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(originX + graphW, originY);
      ctx.moveTo(originX, originY);
      ctx.lineTo(originX, originY - graphH);
      ctx.stroke();

      // Axis Labels
      ctx.fillStyle = '#94a3b8';
      ctx.font = '600 11px "Kantumruy Pro", sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`ពេលវេលា t (${this.scenario.timeUnit}) →`, originX + graphW, originY + 36);

      ctx.textAlign = 'left';
      ctx.fillText(`↑ តម្លៃ y (${this.scenario.unit})`, originX - 55, originY - graphH - 12);

      // 1. Draw Target Line y = Target (The RHS of Equation!)
      const targetYCoord = mapY(this.scenario.targetVal);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(originX, targetYCoord);
      ctx.lineTo(originX + graphW, targetYCoord);
      ctx.stroke();
      ctx.setLineDash([]);

      // Target Label
      ctx.fillStyle = '#f59e0b';
      ctx.font = '600 11px "Outfit", sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`កម្រិតគោលដៅ y = ${this.scenario.targetVal.toLocaleString()}`, originX + graphW, targetYCoord - 6);

      // 2. Continuous Exponential Curve
      ctx.strokeStyle = 'rgba(236, 72, 153, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      const samples = 100;
      for (let s = 0; s <= samples; s++) {
        const sampleT = (s / samples) * maxT;
        const sampleY = this.scenario.f(sampleT);
        const px = mapX(sampleT);
        const py = mapY(sampleY);
        if (s === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // 3. Animated Trace of Curve up to currentT
      ctx.strokeStyle = '#ec4899';
      ctx.lineWidth = 3.5;
      ctx.shadowColor = '#ec4899';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      const currentSamples = Math.max(1, Math.round((currentT / maxT) * samples));
      for (let s = 0; s <= currentSamples; s++) {
        const sampleT = (s / samples) * maxT;
        if (sampleT > currentT) break;
        const sampleY = this.scenario.f(sampleT);
        const px = mapX(sampleT);
        const py = mapY(sampleY);
        if (s === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 4. Current Point Head
      const curY = this.scenario.f(currentT);
      const headX = mapX(currentT);
      const headY = mapY(curY);

      // Dashed projection lines to axes
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(headX, originY);
      ctx.lineTo(headX, headY);
      ctx.lineTo(originX, headY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(headX, headY, 5, 0, Math.PI * 2);
      ctx.fill();

      // 5. Solution Intersection Point Pulse (t*, targetY)
      const targetTime = this.scenario.targetTime;
      const solX = mapX(targetTime);
      const solY = mapY(this.scenario.targetVal);

      if (currentT >= targetTime) {
        // Solution reached! Draw glowing radar pulse
        const pulse = (Math.sin(this.currentTime * 6) + 1) * 0.5;
        ctx.strokeStyle = `rgba(16, 185, 129, ${0.4 + pulse * 0.5})`;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(solX, solY, 8 + pulse * 10, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(solX, solY, 6, 0, Math.PI * 2);
        ctx.fill();

        // Solution Badge Box
        ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 1.5;
        const badgeText = `🎯 ដំណោះស្រាយ (t* = ${targetTime >= 1000 ? targetTime.toLocaleString() : targetTime.toFixed(1)}, y = ${this.scenario.targetVal.toLocaleString()})`;
        ctx.font = '600 11px "Outfit", sans-serif';
        const tw = ctx.measureText(badgeText).width;
        ctx.beginPath();
        ctx.roundRect(solX - tw * 0.5 - 8, solY - 32, tw + 16, 22, 4);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#34d399';
        ctx.textAlign = 'center';
        ctx.fillText(badgeText, solX, solY - 17);
      } else {
        // Future intersection marker
        ctx.fillStyle = 'rgba(245, 158, 11, 0.4)';
        ctx.beginPath();
        ctx.arc(solX, solY, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    renderParticles(ctx) {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

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
    document.addEventListener('DOMContentLoaded', () => new ExponentialVideoStudio());
  } else {
    new ExponentialVideoStudio();
  }
})();
