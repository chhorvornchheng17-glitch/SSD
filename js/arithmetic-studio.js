/**
 * arithmetic-studio.js - Real-Life Applications of Arithmetic Sequences Video Studio
 * 60 FPS Canvas Cinematic Animation Studio with Savings Piggy Bank, Stadium Seating,
 * Marathon Training, Construction Pipe Stacking, and Taxi Meter Simulations.
 * Features Sequence Discrete Point & Bar Plot, Cumulative Sum Area, Audio-visual HUD,
 * Khmer Narration, Web Audio API Sound Synthesizer, and 60 FPS Video Recording (MediaRecorder API).
 * Teacher Chheng Chhovorn - Mathematics Portfolio
 */

(function () {
  'use strict';

  // ============================================================
  // 1. REAL-LIFE ARITHMETIC SEQUENCE SCENARIOS
  // ============================================================
  const ARITHMETIC_SCENARIOS = {
    savings: {
      id: 'savings',
      title: '🏦 ផែនការសន្សំប្រាក់ & កូនជ្រូកវិនិយោគ (Savings & Investment Plan)',
      category: 'ហិរញ្ញវត្ថុផ្ទាល់ខ្លួន (Personal Finance)',
      badge: 'តួទី n: u_n = 50 + 25(n - 1)  |  ផលបូកសរុប S_n',
      formula: 'u_n = 50 + 25(n - 1) ($/ខែ)',
      sumFormula: 'S_n = \\frac{n}{2}(u_1 + u_n) = \\frac{n}{2}(75 + 25n) ($)',
      u1: 50,
      d: 25,
      totalSteps: 12, // 12 months
      duration: 12, // seconds
      unit: '$',
      unitName: 'ដុល្លារ',
      stepLabel: 'ខែទី',
      f: (n) => 50 + (n - 1) * 25,
      sumF: (n) => (n / 2) * (2 * 50 + (n - 1) * 25),
      metrics: (n) => {
        const curN = Math.max(1, Math.min(12, Math.round(n)));
        const un = 50 + (curN - 1) * 25;
        const sn = (curN / 2) * (100 + (curN - 1) * 25);
        return [
          { label: 'ខែទី n', value: `ខែទី ${curN}`, color: '#38bdf8' },
          { label: 'ប្រាក់សន្សំខែនេះ u_n', value: `$${un}`, color: '#10b981' },
          { label: 'ប្រាក់បន្ថែម d', value: `+$25/ខែ`, color: '#f59e0b' },
          { label: 'ប្រាក់សន្សំសរុប S_n', value: `$${sn.toLocaleString()}`, color: '#ec4899' }
        ];
      },
      narration: [
        { time: 0.0, text: 'ខែទី ១ (n = 1)៖ ចាប់ផ្តើមផែនការសន្សំប្រាក់ដំបូង u_1 = $50 ដាក់ចូលក្នុងកូនជ្រូកវិនិយោគ។ ផលបូកសរុប S_1 = $50។' },
        { time: 2.5, text: 'ខែទី ២-៤ (n = 2-4)៖ រាល់ខែបង្កើនប្រាក់សន្សំ d = +$25! ខែទី ៤ សន្សំបាន u_4 = $125 ប្រាក់សន្សំកើនឡើងជាលំដាប់នព្វន្ត។' },
        { time: 5.5, text: 'ខែទី ៦ (កន្លះឆ្នាំ)៖ សន្សំប្រចាំខែឡើងដល់ u_6 = $175 ហើយប្រាក់សន្សំសរុបក្នុងកូនជ្រូកកើនដល់ S_6 = $675!' },
        { time: 8.5, text: 'ខែទី ៩ (n = 9)៖ ប្រាក់សន្សំខែទី ៩ គឺ u_9 = 50 + 8(25) = $250។ កូនជ្រូកចាប់ផ្តើមពេញ និងមានសុវត្ថិភាពហិរញ្ញវត្ថុខ្ពស់។' },
        { time: 11.0, text: 'ខែទី ១២ (១ឆ្នាំពេញ)៖ ខែចុងក្រោយសន្សំបាន u_12 = $325! តាមរូបមន្ត S_12 = (12/2)(50 + 325) = $2,250 សរុប! ស្វ៊ីតនព្វន្តបង្កើតទម្លាប់សន្សំដ៏អស្ចារ្យ។' }
      ],
      theoryTitle: '១. ហិរញ្ញវត្ថុផ្ទាល់ខ្លួន & ផែនការសន្សំប្រាក់',
      theoryDesc: 'ក្នុងសេដ្ឋកិច្ច និងការគ្រប់គ្រងហិរញ្ញវត្ថុ វិធីសាស្ត្រ «Step-Up Savings Plan» ប្រើប្រាស់គោលការណ៍ស្វ៊ីតនព្វន្តយ៉ាងជាក់ស្តែង។ ដោយសារប្រាក់ចំណូលរបស់បុគ្គលម្នាក់ៗតែងកើនឡើងតាមពេលវេលា ការសន្សំប្រាក់បន្ថែមចំនួនថេរ $d$ ជារៀងរាល់ខែជួយឱ្យសន្សំបានប្រាក់យ៉ាងច្រើនសន្ធឹកសន្ធាប់ដោយមិនពិបាកតឹងតែងក្នុងថវិកា។',
      steps: [
        'តួទីមួយ (ប្រាក់ខែដំបូង)៖ $u_1 = \\$50$',
        'ផលសងរួម (ប្រាក់បន្ថែមប្រចាំខែ)៖ $d = \\$25$',
        'រូបមន្តតួទូទៅ (ខែទី $n$)៖ $u_n = u_1 + (n - 1)d = 50 + 25(n - 1) = 25 + 25n$',
        'ប្រាក់សន្សំខែទី ១២៖ $u_{12} = 50 + 11(25) = \\$325$',
        'រូបមន្តផលបូកសរុប $n$ តួដំបូង៖ $S_n = \\frac{n}{2}(u_1 + u_n) = \\frac{n}{2}[2u_1 + (n - 1)d]$',
        'ប្រាក់សន្សំសរុបពេញ ១ ឆ្នាំ (១២ ខែ)៖ $S_{12} = \\frac{12}{2}(50 + 325) = 6 \\times 375 = \\$2,250$'
      ],
      examTip: 'លំហាត់ប្រាក់សន្សំ ឬប្រាក់បៀវត្សរ៍ក្នុងវិញ្ញាសាបាក់ឌុប៖ ត្រូវកំណត់ឱ្យច្បាស់រវាង «ប្រាក់ក្នុងខែទី n» (គណនា $u_n$) និង «ប្រាក់សន្សំសរុបទាំងអស់» (គណនា $S_n$) កុំឱ្យច្រឡំរូបមន្តគ្នា!'
    },

    stadium: {
      id: 'stadium',
      title: '🏟️ ស្ថាបត្យកម្មកៅអីកីឡដ្ឋាន & រោងមហោស្រព (Stadium Seating Architecture)',
      category: 'ស្ថាបត្យកម្ម & សំណង់ស៊ីវិល (Architecture & Civil Eng)',
      badge: 'តួទី n: u_n = 30 + 4(n - 1)  |  ចំណុះកៅអីសរុប S_n',
      formula: 'u_n = 30 + 4(n - 1) = 26 + 4n (កៅអី/ជួរ)',
      sumFormula: 'S_n = \\frac{n}{2}(u_1 + u_n) = \\frac{n}{2}(56 + 4n) (កៅអី)',
      u1: 30,
      d: 4,
      totalSteps: 15, // 15 rows
      duration: 12,
      unit: 'កៅអី',
      unitName: 'កៅអី',
      stepLabel: 'ជួរទី',
      f: (n) => 30 + (n - 1) * 4,
      sumF: (n) => (n / 2) * (2 * 30 + (n - 1) * 4),
      metrics: (n) => {
        const curN = Math.max(1, Math.min(15, Math.round(n)));
        const un = 30 + (curN - 1) * 4;
        const sn = (curN / 2) * (60 + (curN - 1) * 4);
        return [
          { label: 'ជួរទី n', value: `ជួរទី ${curN}`, color: '#38bdf8' },
          { label: 'កៅអីក្នុងជួរ u_n', value: `${un} កៅអី`, color: '#f59e0b' },
          { label: 'ថែមក្នុងមួយជួរ d', value: `+4 កៅអី`, color: '#10b981' },
          { label: 'ចំណុះកៅអីសរុប S_n', value: `${sn.toLocaleString()} កៅអី`, color: '#ec4899' }
        ];
      },
      narration: [
        { time: 0.0, text: 'ជួរទី ១ ជាប់ទីលាន (n = 1)៖ មាន u_1 = 30 កៅអី។ ជួរទី ១ មានកាំខ្លីបំផុត ផ្តល់ទិដ្ឋភាពជិតស្និទ្ធបំផុត។' },
        { time: 2.5, text: 'ជួរទី ២-៥៖ ដោយសាររាងកីឡដ្ឋានរីកធំជារង្វង់ពាក់កណ្តាល រាល់ជួរបន្ទាប់ត្រូវថែម d = 4 កៅអី ដើម្បីរក្សាចន្លោះផ្លូវដើរ និងមុំមើល។' },
        { time: 5.5, text: 'ជួរទី ៨ (ពាក់កណ្តាលកីឡដ្ឋាន)៖ ជួរទី ៨ មាន u_8 = 30 + 7(4) = 58 កៅអី។ ចំណុះកៅអីសរុបកើនដល់ S_8 = 352 កៅអី។' },
        { time: 8.5, text: 'ជួរទី ១២៖ ចំនួនកៅអីក្នុងជួរឡើងដល់ u_12 = 74 កៅអី អ្នកទស្សនាពេញកីឡដ្ឋានយ៉ាងអធិកអធម។' },
        { time: 11.0, text: 'ជួរទី ១៥ (ជួរលើបង្អស់)៖ មាន u_15 = 86 កៅអី! ចំណុះកៅអីសរុបនៃកីឡដ្ឋានគឺ S_15 = (15/2)(30 + 86) = 870 កៅអី!' }
      ],
      theoryTitle: '២. ស្ថាបត្យកម្មកីឡដ្ឋាន និងរោងមហោស្រព (Amphitheater)',
      theoryDesc: 'ស្ថាបត្យកររចនាកីឡដ្ឋាន ឬរោងភាពយន្តតែងតែរៀបចំកៅអីតាមរាងធ្នូកោងរីកធំឡើងៗ (Concentric Rows)។ ជួរនីមួយៗត្រូវតែមានចំនួនកៅអីកើនឡើងជាស្វ៊ីតនព្វន្ត ដើម្បីឱ្យអ្នកទស្សនាមើលឃើញច្បាស់ មិនបាំងក្បាលគ្នា និងមានសុវត្ថិភាពពេលជម្លៀសចេញតាមជណ្តើរ។',
      steps: [
        'កៅអីជួរទីមួយ៖ $u_1 = 30\\text{ កៅអី}$',
        'ចំនួនកៅអីថែមរាល់ជួរ (ផលសងរួម)៖ $d = 4\\text{ កៅអី}$',
        'សមីការកៅអីជួរទី $n$៖ $u_n = 30 + 4(n - 1) = 26 + 4n$',
        'ចំនួនកៅអីជួរទី ១៥៖ $u_{15} = 30 + 14(4) = 86\\text{ កៅអី}$',
        'ចំណុះកៅអីសរុបទាំង ១៥ ជួរ៖ $S_{15} = \\frac{15}{2}(u_1 + u_{15}) = \\frac{15}{2}(30 + 86) = \\frac{15}{2}(116) = 870\\text{ កៅអី}$'
      ],
      examTip: 'ប្រធានលំហាត់កៅអីរោងមហោស្រព កាំជណ្តើរ ឬក្បឿងប្រក់ដំបូល គឺជាប្រធានពេញនិយមបំផុតក្នុងប្រឡងបាក់ឌុប! ត្រូវចាំថា $u_n$ គឺកៅអីក្នុងជួរមួយ ហើយ $S_n$ គឺកៅអីទាំងអស់ក្នុងរោង។'
    },

    marathon: {
      id: 'marathon',
      title: '🏃 កម្មវិធីហ្វឹកហាត់កីឡាករម៉ារ៉ាតុង (Marathon Progressive Training)',
      category: 'កីឡា & សុខភាព (Sports & Health Science)',
      badge: 'ចម្ងាយសប្តាហ៍ n: u_n = 5 + 3(n - 1) km  |  ចម្ងាយសរុប S_n',
      formula: 'u_n = 5 + 3(n - 1) = 2 + 3n (km/សប្តាហ៍)',
      sumFormula: 'S_n = \\frac{n}{2}(u_1 + u_n) = \\frac{n}{2}(7 + 3n) (km)',
      u1: 5,
      d: 3,
      totalSteps: 12, // 12 weeks
      duration: 12,
      unit: 'km',
      unitName: 'គីឡូម៉ែត្រ',
      stepLabel: 'សប្តាហ៍ទី',
      f: (n) => 5 + (n - 1) * 3,
      sumF: (n) => (n / 2) * (2 * 5 + (n - 1) * 3),
      metrics: (n) => {
        const curN = Math.max(1, Math.min(12, Math.round(n)));
        const un = 5 + (curN - 1) * 3;
        const sn = (curN / 2) * (10 + (curN - 1) * 3);
        const calories = Math.round(sn * 65);
        return [
          { label: 'សប្តាហ៍ទី n', value: `សប្តាហ៍ទី ${curN}`, color: '#38bdf8' },
          { label: 'ចម្ងាយរត់ u_n', value: `${un} km`, color: '#10b981' },
          { label: 'ចម្ងាយសរុប S_n', value: `${sn.toFixed(1)} km`, color: '#f59e0b' },
          { label: 'កាឡូរីដុតសរុប', value: `${calories.toLocaleString()} kcal`, color: '#ec4899' }
        ];
      },
      narration: [
        { time: 0.0, text: 'សប្តាហ៍ទី ១ (n = 1)៖ អត្តពលិកចាប់ផ្តើមហ្វឹកហាត់ដំបូង u_1 = 5 km ដើម្បីកសាងស៊ុះ និងសាច់ដុំបេះដូង។' },
        { time: 2.5, text: 'សប្តាហ៍ទី ២-៤៖ គ្រូបង្វឹកបន្ថែមចម្ងាយ d = +3 km ក្នុងមួយសប្តាហ៍ ដើម្បីចៀសវាងការរងរបួសសាច់ដុំ (Rule of Progression)។' },
        { time: 5.5, text: 'សប្តាហ៍ទី ៦៖ ចម្ងាយរត់ឡើងដល់ u_6 = 5 + 5(3) = 20 km (កន្លះម៉ារ៉ាតុង Half-Marathon)! ចម្ងាយសរុបបានរត់គឺ S_6 = 75 km។' },
        { time: 8.5, text: 'សប្តាហ៍ទី ៩៖ អត្តពលិករត់បាន u_9 = 29 km ក្នុងមួយសប្តាហ៍ រាងកាយដុតបំផ្លាញថាមពលជាតិខ្លាញ់យ៉ាងមានប្រសិទ្ធភាព។' },
        { time: 11.0, text: 'សប្តាហ៍ទី ១២ (ត្រៀមប្រកួត)៖ ចម្ងាយរត់សម្រេចបាន u_12 = 38 km! ចម្ងាយសរុបដែលបានហ្វឹកហាត់គឺ S_12 = 258 km ដុតបំផ្លាញជាង 16,770 kcal!' }
      ],
      theoryTitle: '៣. វិទ្យាសាស្ត្រកីឡា & ការបង្កើនកម្រិតបន្តិចម្តងៗ (Progressive Overload)',
      theoryDesc: 'ក្នុងវេជ្ជសាស្ត្រកីឡា ច្បាប់នៃការហ្វឹកហាត់តម្រូវឱ្យអត្តពលិកបង្កើនបន្ទុកការងារ (Volume) បន្តិចម្តងៗជាចំនួនថេរ $d$ ដើម្បីឱ្យសរសៃឈាម សួត និងសរសៃពួរសម្របខ្លួនបានទាន់ពេល។ ស្វ៊ីតនព្វន្តគឺជាគំរូគណិតវិទ្យាដ៏ស័ក្តិសមបំផុតក្នុងការកសាងតារាងហ្វឹកហាត់រត់ម៉ារ៉ាតុង។',
      steps: [
        'ចម្ងាយសប្តាហ៍ដំបូង៖ $u_1 = 5\\text{ km}$',
        'ចម្ងាយបន្ថែមរាល់សប្តាហ៍៖ $d = 3\\text{ km}$',
        'ចម្ងាយរត់សប្តាហ៍ទី $n$៖ $u_n = 5 + 3(n - 1) = 2 + 3n\\text{ km}$',
        'ចម្ងាយរត់សប្តាហ៍ទី ១២៖ $u_{12} = 5 + 11(3) = 38\\text{ km}$',
        'ចម្ងាយសរុបដែលបានរត់ ១២ សប្តាហ៍៖ $S_{12} = \\frac{12}{2}(5 + 38) = 6 \\times 43 = 258\\text{ km}$'
      ],
      examTip: 'ពេលដោះស្រាយលំហាត់ស្វ៊ីតទាក់ទងនឹងចម្ងាយ ឬពេលវេលា ត្រូវផ្ទៀងផ្ទាត់ខ្នាតជានិច្ច (km, ម៉ែត្រ, ម៉ោង, នាទី) ដើម្បីកុំឱ្យខុសចម្លើយចុងក្រោយ។'
    },

    pipes: {
      id: 'pipes',
      title: '🏗️ សំណង់ជង់បំពង់ដែក & កម្រាលត្រីកោណ (Stacked Steel Pipes & Piles)',
      category: 'វិស្វកម្មសំណង់ & ភស្តុភារ (Civil Eng & Logistics)',
      badge: 'តួទី n: u_n = 3 + 2(n - 1)  |  ចំនួនបំពង់សរុប S_n',
      formula: 'u_n = 3 + 2(n - 1) = 1 + 2n (បំពង់/ស្រទាប់)',
      sumFormula: 'S_n = \\frac{n}{2}(u_1 + u_n) = \\frac{n}{2}(4 + 2n) = n(n + 2) (បំពង់)',
      u1: 3,
      d: 2,
      totalSteps: 10, // 10 layers
      duration: 12,
      unit: 'បំពង់',
      unitName: 'បំពង់ដែក',
      stepLabel: 'ស្រទាប់ទី',
      f: (n) => 3 + (n - 1) * 2,
      sumF: (n) => (n / 2) * (2 * 3 + (n - 1) * 2),
      metrics: (n) => {
        const curN = Math.max(1, Math.min(10, Math.round(n)));
        const un = 3 + (curN - 1) * 2;
        const sn = (curN / 2) * (6 + (curN - 1) * 2);
        const weight = (sn * 45); // 45 kg per pipe
        return [
          { label: 'ស្រទាប់ទី n', value: `ស្រទាប់ទី ${curN}`, color: '#38bdf8' },
          { label: 'បំពង់ក្នុងស្រទាប់ u_n', value: `${un} បំពង់`, color: '#f59e0b' },
          { label: 'បំពង់សរុប S_n', value: `${sn} បំពង់`, color: '#10b981' },
          { label: 'ទម្ងន់សរុបប៉ាន់ស្មាន', value: `${(weight / 1000).toFixed(2)} តោន`, color: '#ec4899' }
        ];
      },
      narration: [
        { time: 0.0, text: 'ស្រទាប់លើគេបង្អស់ (n = 1)៖ មាន u_1 = 3 បំពង់ដែក។ ការជង់បែបពីរ៉ាមីតជួយទប់លំនឹងកុំឱ្យបំពង់រអិលធ្លាក់។' },
        { time: 2.5, text: 'ស្រទាប់បន្ទាប់ៗ (n = 2-4)៖ រាល់ស្រទាប់ខាងក្រោមបន្ទាប់ត្រូវទ្រទ្រង់ស្រទាប់លើ ដូច្នេះត្រូវថែម d = +2 បំពង់នៅសងខាង។' },
        { time: 5.5, text: 'ស្រទាប់ទី ៥៖ ស្រទាប់នេះមាន u_5 = 3 + 4(2) = 11 បំពង់។ ចំនួនបំពង់សរុបដែលបានជង់គឺ S_5 = 35 បំពង់ដែក។' },
        { time: 8.5, text: 'ស្រទាប់ទី ៨៖ មាន u_8 = 17 បំពង់ដែក រចនាសម្ព័ន្ធជង់រឹងមាំតាមលំនាំធរណីមាត្រត្រីកោណ។' },
        { time: 11.0, text: 'ស្រទាប់បាតក្រោមគេ (n = 10)៖ មាន u_10 = 21 បំពង់ដែក! គំនរបំពង់សរុបទាំង ១០ ស្រទាប់គឺ S_10 = (10/2)(3 + 21) = 120 បំពង់ (ទម្ងន់ 5.4 តោន)!' }
      ],
      theoryTitle: '៤. វិស្វកម្មសំណង់ និងការគ្រប់គ្រងឃ្លាំង (Warehouse Logistics)',
      theoryDesc: 'នៅក្នុងការដ្ឋានសំណង់ និងឃ្លាំងស្តុកទំនិញធុនធ្ងន់ ឈើហ៊ុប បំពង់បង្ហូរប្រេង ឬបំពង់ដែកសំណង់ត្រូវបានជង់ជាទម្រង់ពីរ៉ាមីតត្រីកោណ ដើម្បីធានាសុវត្ថិភាពមិនឱ្យរមៀល។ វិស្វករអាចរាប់ចំនួនបំពង់សរុបបានភ្លាមៗដោយគ្រាន់តែរាប់ស្រទាប់លើគេ ($u_1$) និងស្រទាប់ក្រោមគេ ($u_n$) រួចគណនាតាមរូបមន្ត $S_n$ ដោយមិនចាំបាច់រាប់បំពង់ម្តងមួយៗឡើយ។',
      steps: [
        'បំពង់ស្រទាប់លើបង្អស់៖ $u_1 = 3\\text{ បំពង់}$',
        'ចំនួនបំពង់ថែមរាល់ស្រទាប់ក្រោម៖ $d = 2\\text{ បំពង់}$',
        'រូបមន្តស្រទាប់ទី $n$៖ $u_n = 3 + 2(n - 1) = 1 + 2n\\text{ បំពង់}$',
        'ចំនួនបំពង់ស្រទាប់បាតក្រោមគេ (ទី ១០)៖ $u_{10} = 3 + 9(2) = 21\\text{ បំពង់}$',
        'ចំនួនបំពង់សរុបទាំងអស់៖ $S_{10} = \\frac{10}{2}(u_1 + u_{10}) = 5(3 + 21) = 5 \\times 24 = 120\\text{ បំពង់}$'
      ],
      examTip: 'ល្បិចដោះស្រាយលឿនសម្រាប់វិស្វករ និងសិស្សប្រឡង៖ ពេលដឹងចំនួនបំពង់ស្រទាប់លើ និងស្រទាប់ក្រោម ប្រើរូបមន្ត $S_n = \\frac{n(u_1 + u_n)}{2}$ គឺចំណេញពេល និងត្រឹមត្រូវ ១០០%!'
    },

    taxi: {
      id: 'taxi',
      title: '🚕 សេវាធ្វើដំណើរ & ថ្លៃតាក់ស៊ីគិតតាមចម្ងាយ (Taxi Fare Distance Metering)',
      category: 'ដឹកជញ្ជូន & ជីវភាពប្រចាំថ្ងៃ (Urban Transportation)',
      badge: 'គីឡូម៉ែត្រទី n: u_n = 1.50 + 0.50(n - 1) $  |  ថ្លៃសរុប S_n',
      formula: 'u_n = 1.50 + 0.50(n - 1) ($/km)',
      sumFormula: 'S_n = \\frac{n}{2}(u_1 + u_n) ($)',
      u1: 1.50,
      d: 0.50,
      totalSteps: 15, // 15 km
      duration: 12,
      unit: '$',
      unitName: 'ដុល្លារ',
      stepLabel: 'km ទី',
      f: (n) => 1.50 + (n - 1) * 0.50,
      sumF: (n) => (n / 2) * (2 * 1.50 + (n - 1) * 0.50),
      metrics: (n) => {
        const curN = Math.max(1, Math.min(15, Math.round(n)));
        const un = 1.50 + (curN - 1) * 0.50;
        const totalFare = 1.50 + (curN - 1) * 0.75; // Typical meter fare structure
        return [
          { label: 'ចម្ងាយធ្វើដំណើរ', value: `${curN} km`, color: '#38bdf8' },
          { label: 'ថ្លៃគីឡូម៉ែត្រនេះ u_n', value: `$${un.toFixed(2)}`, color: '#f59e0b' },
          { label: 'អត្រាថែម d', value: `+$0.50/km`, color: '#10b981' },
          { label: 'ថ្លៃឈ្នួលលើនាឡិកា', value: `$${(2.00 + (curN - 1) * 0.80).toFixed(2)}`, color: '#ec4899' }
        ];
      },
      narration: [
        { time: 0.0, text: 'ចាប់ផ្តើមធ្វើដំណើរ (km ទី ១)៖ តាក់ស៊ីបើកចេញដំណើរ គីឡូម៉ែត្រដំបូង u_1 = $1.50។' },
        { time: 2.5, text: 'km ទី ២-៤៖ រាល់គីឡូម៉ែត្របន្ទាប់ នាឡិកាម៉ែត្រលោតបន្ថែមតាមអត្រាថេរ d = +$0.50 ក្នុងមួយគីឡូម៉ែត្រ។' },
        { time: 5.5, text: 'km ទី ៨ (ពាក់កណ្តាលផ្លូវ)៖ ធ្វើដំណើរបាន ៨ គីឡូម៉ែត្រ ថ្លៃគីឡូម៉ែត្រទី ៨ គឺ u_8 = $5.00។' },
        { time: 8.5, text: 'km ទី ១២៖ រថយន្តបើកឆ្លងកាត់ស្ពាន និងតំបន់កណ្តាលរាជធានី នាឡិកាគិតលុយលោតជាស្វ៊ីតនព្វន្តទៀងទាត់។' },
        { time: 11.0, text: 'ដល់គោលដៅ (km ទី ១៥)៖ ថ្លៃគីឡូម៉ែត្រចុងក្រោយ u_15 = $8.50! ស្វ៊ីតនព្វន្តជួយឱ្យការគិតថ្លៃសេវាដឹកជញ្ជូនមានតម្លាភាព និងយុត្តិធម៌។' }
      ],
      theoryTitle: '៥. ការកំណត់ថ្លៃសេវាដឹកជញ្ជូន (Transport Metering Tariffs)',
      theoryDesc: 'ក្រុមហ៊ុនតាក់ស៊ី Grab ឬ PassApp ប្រើប្រាស់រូបមន្តស្វ៊ីតនព្វន្ត (Linear Step Tariff) ក្នុងការគណនាថ្លៃឈ្នួលធ្វើដំណើរ។ គីឡូម៉ែត្រទីមួយមានតម្លៃគោល $u_1$ ហើយរាល់គីឡូម៉ែត្របន្តបន្ទាប់នឹងបូកបន្ថែមចំនួនថេរ $d$។ ការប្រើរូបមន្តនេះផ្តល់ភាពងាយស្រួលដល់អ្នកដំណើរក្នុងការប៉ាន់ស្មានថ្លៃចំណាយមុនពេលធ្វើដំណើរ។',
      steps: [
        'ថ្លៃគីឡូម៉ែត្រទីមួយ៖ $u_1 = \\$1.50$',
        'អត្រាបន្ថែមរាល់គីឡូម៉ែត្រ (ផលសងរួម)៖ $d = \\$0.50$',
        'រូបមន្តថ្លៃគីឡូម៉ែត្រទី $n$៖ $u_n = u_1 + (n - 1)d = 1.50 + 0.50(n - 1)$',
        'ថ្លៃគីឡូម៉ែត្រទី ១៥៖ $u_{15} = 1.50 + 14(0.50) = 1.50 + 7.00 = \\$8.50$',
        'ការយល់ដឹងពីស្វ៊ីតនព្វន្តជួយឱ្យយើងចេះគណនាចំណាយធ្វើដំណើរបានយ៉ាងច្បាស់លាស់!'
      ],
      examTip: 'លំហាត់គិតថ្លៃសេវាអគ្គិសនី ទឹកស្អាត ឬថ្លៃរថយន្តឈ្នួល តែងតែដើរតួជាស្វ៊ីតនព្វន្តក្នុងជីវភាពរស់នៅ។ ត្រូវកំណត់ឱ្យបាន $u_1$ និង $d$ មុនគេបង្អស់!'
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

    playCoin() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, t); // B5
      osc.frequency.setValueAtTime(1318.51, t + 0.08); // E6

      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.35);
    }

    playClank() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.exponentialRampToValueAtTime(80, t + 0.15);

      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.2);
    }

    playCheer() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      // Arpeggio chime for stadium / milestone
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t + idx * 0.06);
        gain.gain.setValueAtTime(0.1, t + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.06 + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t + idx * 0.06);
        osc.stop(t + idx * 0.06 + 0.4);
      });
    }

    playStep() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(200, t);
      osc.frequency.exponentialRampToValueAtTime(60, t + 0.08);

      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.09);
    }
  }

  // ============================================================
  // 3. MAIN ARITHMETIC VIDEO STUDIO CLASS
  // ============================================================
  class ArithmeticVideoStudio {
    constructor() {
      this.canvas = document.getElementById('arithmetic-video-canvas');
      if (!this.canvas) return;

      this.ctx = this.canvas.getContext('2d');
      this.audio = new AudioFx();

      // Current Scenario & State
      this.currentScenarioId = 'savings';
      this.scenario = ARITHMETIC_SCENARIOS[this.currentScenarioId];

      this.isPlaying = true;
      this.currentTime = 0; // 0 to scenario.duration (12s)
      this.playbackSpeed = 1.0;
      this.lastFrameTime = performance.now();
      this.lastAudibleStep = -1;

      // Video Recording State (MediaRecorder)
      this.mediaRecorder = null;
      this.recordedChunks = [];
      this.isRecording = false;

      // Particle system for money/stars/celebration
      this.particles = [];

      this.initDPI();
      this.initDOM();
      this.initEvents();
      this.updateDetailsView();

      // Start 60 FPS animation loop
      requestAnimationFrame((t) => this.loop(t));
    }

    initDPI() {
      const rect = this.canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.width = rect.width || 800;
      this.height = Math.round(this.width * 0.5625); // 16:9 aspect ratio
      if (this.height < 450) this.height = 450;

      this.canvas.width = this.width * dpr;
      this.canvas.height = this.height * dpr;
      this.canvas.style.height = `${this.height}px`;

      this.ctx.scale(dpr, dpr);
    }

    initDOM() {
      // Buttons & Controls
      this.playBtn = document.getElementById('arith-play-btn');
      this.replayBtn = document.getElementById('arith-replay-btn');
      this.progressBar = document.getElementById('arith-progress-bar');
      this.timeDisplay = document.getElementById('arith-time-display');
      this.narrationText = document.getElementById('arith-narration-text');
      this.hudFormula = document.getElementById('arith-hud-formula');
      this.hudMetrics = document.getElementById('arith-hud-metrics');
      this.recBadge = document.getElementById('arith-rec-badge');
      this.recordBtn = document.getElementById('arith-record-btn');
      this.recordBtnText = document.getElementById('arith-record-btn-text');
      this.scenarioSelect = document.getElementById('arith-scenario-select');
    }

    initEvents() {
      // Window resize
      window.addEventListener('resize', () => {
        this.initDPI();
      });

      // Play / Pause
      if (this.playBtn) {
        this.playBtn.addEventListener('click', () => this.togglePlay());
      }

      // Replay
      if (this.replayBtn) {
        this.replayBtn.addEventListener('click', () => this.replay());
      }

      // Timeline Scrubber
      if (this.progressBar) {
        this.progressBar.addEventListener('input', (e) => {
          const val = parseFloat(e.target.value);
          this.currentTime = (val / 100) * this.scenario.duration;
          this.lastAudibleStep = -1;
          this.updateHUD();
        });
      }

      // Speed Buttons
      const speedBtns = document.querySelectorAll('[data-arith-speed]');
      speedBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          speedBtns.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          this.playbackSpeed = parseFloat(btn.getAttribute('data-arith-speed'));
        });
      });

      // Scenario Quick Carousel Buttons
      const scenarioBtns = document.querySelectorAll('[data-arith-scenario]');
      scenarioBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const scId = btn.getAttribute('data-arith-scenario');
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
            b.classList.toggle('active', b.getAttribute('data-arith-scenario') === e.target.value);
          });
        });
      }

      // Video Recording Button
      if (this.recordBtn) {
        this.recordBtn.addEventListener('click', () => this.toggleRecordVideo());
      }

      // Keyboard Controls (Space to play/pause)
      window.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && document.activeElement === document.body) {
          const el = document.getElementById('arithmetic-video-studio');
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              e.preventDefault();
              this.togglePlay();
            }
          }
        }
      });
    }

    switchScenario(scenarioId) {
      if (!ARITHMETIC_SCENARIOS[scenarioId]) return;
      this.currentScenarioId = scenarioId;
      this.scenario = ARITHMETIC_SCENARIOS[scenarioId];
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

    // ============================================================
    // 4. VIDEO RECORDING (MEDIARECORDER API)
    // ============================================================
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
        this.replay(); // restart to record full clean animation

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
      a.download = `arithmetic-sequence-${this.scenario.id}-animation.webm`;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 200);
    }

    // ============================================================
    // 5. UPDATE HUD & DETAILS
    // ============================================================
    updateHUD() {
      const progress = (this.currentTime / this.scenario.duration) * 100;
      if (this.progressBar) {
        this.progressBar.value = Math.min(100, Math.max(0, progress));
      }
      if (this.timeDisplay) {
        this.timeDisplay.textContent = `${this.currentTime.toFixed(1)}s / ${this.scenario.duration.toFixed(1)}s`;
      }

      // Calculate current step n (1 to totalSteps)
      const currentStep = 1 + (this.currentTime / this.scenario.duration) * (this.scenario.totalSteps - 1);
      const roundedStep = Math.max(1, Math.min(this.scenario.totalSteps, Math.round(currentStep)));

      // Audio feedback when advancing steps
      if (roundedStep !== this.lastAudibleStep) {
        this.lastAudibleStep = roundedStep;
        if (this.currentScenarioId === 'savings') {
          this.audio.playCoin();
          this.spawnCoinParticles();
        } else if (this.currentScenarioId === 'stadium') {
          if (roundedStep === this.scenario.totalSteps || roundedStep % 3 === 0) {
            this.audio.playCheer();
          } else {
            this.audio.playStep();
          }
        } else if (this.currentScenarioId === 'marathon') {
          this.audio.playStep();
        } else if (this.currentScenarioId === 'pipes') {
          this.audio.playClank();
        } else if (this.currentScenarioId === 'taxi') {
          this.audio.playCoin();
        }
      }

      // Top HUD Formula
      if (this.hudFormula) {
        this.hudFormula.textContent = this.scenario.formula;
      }

      // Dynamic Metrics Pills
      if (this.hudMetrics) {
        const metrics = this.scenario.metrics(currentStep);
        this.hudMetrics.innerHTML = metrics
          .map(
            (m) => `
          <div class="hud-pill" style="border-left: 3px solid ${m.color}; background: rgba(15, 23, 42, 0.85);">
            <span style="font-size: 0.75rem; color: #94a3b8;">${m.label}:</span>
            <strong style="color: ${m.color}; font-size: 0.88rem; margin-left: 0.25rem;">${m.value}</strong>
          </div>
        `
          )
          .join('');
      }

      // Narration Subtitle
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
      const catEl = document.getElementById('arith-detail-category');
      const badgeEl = document.getElementById('arith-detail-badge');
      const titleEl = document.getElementById('arith-detail-title');
      const formEl = document.getElementById('arith-detail-formula');
      const sumFormEl = document.getElementById('arith-detail-sum-formula');
      const theoryEl = document.getElementById('arith-detail-theory');
      const examTipEl = document.getElementById('arith-detail-exam-tip');
      const stepsListEl = document.getElementById('arith-detail-steps');

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

      // Re-render LaTeX with KaTeX if present
      if (window.renderMathInElement) {
        const container = document.getElementById('arithmetic-video-studio');
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
    // 6. MAIN ANIMATION LOOP (60 FPS)
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
          this.currentTime = 0; // loop seamlessly
        }
        this.updateHUD();
      }

      this.render();
      requestAnimationFrame((t) => this.loop(t));
    }

    // ============================================================
    // 7. CANVAS RENDERING ENGINE
    // ============================================================
    render() {
      const ctx = this.ctx;
      const w = this.width;
      const h = this.height;

      // Dark background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, w, h);
      bgGrad.addColorStop(0, '#090d16');
      bgGrad.addColorStop(1, '#0f172a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Split canvas: Left half = Physical Simulation, Right half = Sequence Graph
      const splitX = Math.round(w * 0.52);

      // Divider Line with glow
      ctx.save();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(splitX, 10);
      ctx.lineTo(splitX, h - 10);
      ctx.stroke();
      ctx.restore();

      // Current normalized step
      const stepProg = this.currentTime / this.scenario.duration;
      const currentStep = 1 + stepProg * (this.scenario.totalSteps - 1);

      // Left Panel: Real-life Scene Simulation
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, splitX, h);
      ctx.clip();
      this.renderPhysicalScene(ctx, 0, 0, splitX, h, currentStep);
      ctx.restore();

      // Right Panel: Mathematical Sequence Plot (u_n & S_n)
      ctx.save();
      ctx.beginPath();
      ctx.rect(splitX, 0, w - splitX, h);
      ctx.clip();
      this.renderSequenceGraph(ctx, splitX, 0, w - splitX, h, currentStep);
      ctx.restore();

      // Update and render floating particles
      this.renderParticles(ctx);
    }

    // ------------------------------------------------------------
    // PHYSICAL SIMULATION RENDERER (LEFT PANEL)
    // ------------------------------------------------------------
    renderPhysicalScene(ctx, x, y, w, h, currentStep) {
      switch (this.currentScenarioId) {
        case 'savings':
          this.renderSavingsScene(ctx, x, y, w, h, currentStep);
          break;
        case 'stadium':
          this.renderStadiumScene(ctx, x, y, w, h, currentStep);
          break;
        case 'marathon':
          this.renderMarathonScene(ctx, x, y, w, h, currentStep);
          break;
        case 'pipes':
          this.renderPipesScene(ctx, x, y, w, h, currentStep);
          break;
        case 'taxi':
          this.renderTaxiScene(ctx, x, y, w, h, currentStep);
          break;
      }
    }

    // Scenario 1: Golden Piggy Bank & Savings Vault
    renderSavingsScene(ctx, x, y, w, h, currentStep) {
      const cx = x + w * 0.5;
      const cy = y + h * 0.54;
      const progress = (currentStep - 1) / (this.scenario.totalSteps - 1);

      // Title & Subtitle banner
      ctx.fillStyle = '#f8fafc';
      ctx.font = '700 16px "Kantumruy Pro", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🏦 កូនជ្រូកសន្សំប្រាក់ & វិនិយោគប្រចាំខែ', cx, y + 42);

      ctx.fillStyle = '#38bdf8';
      ctx.font = '600 13px "Outfit", sans-serif';
      ctx.fillText(`ខែទី ${Math.round(currentStep)} / 12  •  u_n = 50 + 25(n - 1)`, cx, y + 64);

      // Piggy Bank Body (Oval with shadow)
      ctx.save();
      ctx.shadowColor = 'rgba(245, 158, 11, 0.35)';
      ctx.shadowBlur = 25;

      // Piggy Body Gradient
      const pigGrad = ctx.createRadialGradient(cx - 30, cy - 30, 20, cx, cy, 110);
      pigGrad.addColorStop(0, '#fde68a');
      pigGrad.addColorStop(0.5, '#f59e0b');
      pigGrad.addColorStop(1, '#b45309');

      ctx.fillStyle = pigGrad;
      ctx.beginPath();
      ctx.ellipse(cx, cy, 95, 75, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Snout (Muzzle)
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.ellipse(cx - 90, cy + 5, 26, 20, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Nostrils
      ctx.fillStyle = '#78350f';
      ctx.beginPath();
      ctx.ellipse(cx - 96, cy + 5, 4, 6, 0, 0, Math.PI * 2);
      ctx.ellipse(cx - 84, cy + 5, 4, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Eyes
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(cx - 50, cy - 25, 7, 0, Math.PI * 2);
      ctx.fill();
      // Eye shine
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx - 52, cy - 27, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Pig Ears
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.moveTo(cx - 35, cy - 70);
      ctx.lineTo(cx - 15, cy - 105);
      ctx.lineTo(cx + 5, cy - 72);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Pig Feet
      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.roundRect(cx - 60, cy + 60, 24, 28, [0, 0, 8, 8]);
      ctx.roundRect(cx + 35, cy + 60, 24, 28, [0, 0, 8, 8]);
      ctx.fill();

      // Piggy Tail (Curly)
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(cx + 95, cy - 10, 14, 0, Math.PI * 1.5);
      ctx.stroke();

      // Coin Slot on top
      ctx.fillStyle = '#451a03';
      ctx.beginPath();
      ctx.ellipse(cx + 10, cy - 75, 24, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Falling Coin Animation
      const coinTime = (this.currentTime * 2) % 1; // 0 to 1 cycle
      const coinY = cy - 150 + coinTime * 75;
      const coinSpin = Math.cos(this.currentTime * 8);

      ctx.save();
      ctx.fillStyle = '#facc15';
      ctx.strokeStyle = '#ca8a04';
      ctx.lineWidth = 2;
      ctx.shadowColor = 'rgba(250, 204, 21, 0.8)';
      ctx.shadowBlur = 12;

      ctx.beginPath();
      ctx.ellipse(cx + 10, coinY, Math.abs(coinSpin) * 14 + 4, 14, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Dollar sign on coin
      if (Math.abs(coinSpin) > 0.4) {
        ctx.fillStyle = '#78350f';
        ctx.font = '700 13px "Outfit", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('$', cx + 10, coinY + 4);
      }
      ctx.restore();

      // Piggy belly savings fill indicator (Glass meter inside piggy)
      const fillHeight = 45 * progress;
      ctx.save();
      ctx.fillStyle = 'rgba(16, 185, 129, 0.35)';
      ctx.beginPath();
      ctx.ellipse(cx + 15, cy + 25, 45, fillHeight, 0, 0, Math.PI * 2);
      ctx.fill();

      // Text on Piggy: Current Total Savings
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 15px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      const curTotal = (Math.round(currentStep) / 2) * (100 + (Math.round(currentStep) - 1) * 25);
      ctx.fillText(`$${curTotal.toLocaleString()}`, cx + 15, cy + 15);
      ctx.font = '500 11px "Kantumruy Pro", sans-serif';
      ctx.fillStyle = '#fde68a';
      ctx.fillText('ប្រាក់សន្សំសរុប (S_n)', cx + 15, cy + 32);
      ctx.restore();

      // Ground shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
      ctx.beginPath();
      ctx.ellipse(cx, cy + 88, 110, 16, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Scenario 2: Stadium Seating
    renderStadiumScene(ctx, x, y, w, h, currentStep) {
      const cx = x + w * 0.5;
      const cy = y + h * 0.92;

      // Title banner
      ctx.fillStyle = '#f8fafc';
      ctx.font = '700 16px "Kantumruy Pro", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🏟️ កៅអីកីឡដ្ឋានរាងធ្នូកោង (Amphitheater)', cx, y + 42);

      ctx.fillStyle = '#38bdf8';
      ctx.font = '600 13px "Outfit", sans-serif';
      ctx.fillText(`ជួរទី ${Math.round(currentStep)} / 15  •  u_n = 30 + 4(n - 1)`, cx, y + 64);

      // Pitch / Stage field at bottom center
      ctx.save();
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.ellipse(cx, cy, 75, 35, 0, Math.PI, 0);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = '700 11px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('STAGE / PITCH', cx, cy - 10);
      ctx.restore();

      // Draw Seating Tiers (Concentric Arcs)
      const maxRows = 15;
      const currentActiveRow = Math.round(currentStep);

      for (let r = 1; r <= maxRows; r++) {
        const radius = 65 + r * 14;
        const isActive = r <= currentActiveRow;
        const isCurrent = r === currentActiveRow;

        ctx.beginPath();
        ctx.arc(cx, cy, radius, Math.PI * 1.1, Math.PI * 1.9);

        if (isCurrent) {
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 9;
          ctx.stroke();
          // Glow effect on current row
          ctx.shadowColor = '#f59e0b';
          ctx.shadowBlur = 10;
        } else if (isActive) {
          ctx.strokeStyle = '#0284c7';
          ctx.lineWidth = 6;
          ctx.stroke();
          ctx.shadowBlur = 0;
        } else {
          ctx.strokeStyle = 'rgba(71, 85, 105, 0.4)';
          ctx.lineWidth = 4;
          ctx.stroke();
        }

        // Draw small spectator dots on active rows
        if (isActive && r % 2 === 0) {
          const seats = 30 + (r - 1) * 4;
          const dotsCount = Math.min(18, Math.round(seats / 3));
          for (let s = 0; s < dotsCount; s++) {
            const angle = Math.PI * 1.12 + (s / (dotsCount - 1)) * (Math.PI * 0.76);
            const dotX = cx + Math.cos(angle) * radius;
            const dotY = cy + Math.sin(angle) * radius;
            ctx.fillStyle = isCurrent ? '#fef08a' : '#38bdf8';
            ctx.beginPath();
            ctx.arc(dotX, dotY, 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Legend on current row capacity
      const curRowSeats = 30 + (currentActiveRow - 1) * 4;
      const totalSeats = (currentActiveRow / 2) * (60 + (currentActiveRow - 1) * 4);

      ctx.fillStyle = '#fde68a';
      ctx.font = '700 13px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`ជួរទី ${currentActiveRow}៖ ${curRowSeats} កៅអី  |  ចំណុះសរុប S_${currentActiveRow} = ${totalSeats} កៅអី`, cx, y + h - 16);
    }

    // Scenario 3: Marathon Training Runner
    renderMarathonScene(ctx, x, y, w, h, currentStep) {
      const cx = x + w * 0.5;

      // Title
      ctx.fillStyle = '#f8fafc';
      ctx.font = '700 16px "Kantumruy Pro", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🏃 កម្មវិធីហ្វឹកហាត់កីឡាករម៉ារ៉ាតុង', cx, y + 42);

      ctx.fillStyle = '#38bdf8';
      ctx.font = '600 13px "Outfit", sans-serif';
      ctx.fillText(`សប្តាហ៍ទី ${Math.round(currentStep)} / 12  •  u_n = 5 + 3(n - 1) km`, cx, y + 64);

      const roadY = y + h * 0.75;

      // Moving road landscape
      const scrollOffset = (this.currentTime * 80) % w;

      // Skyline & mountains background
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.moveTo(x, roadY - 40);
      ctx.lineTo(x + w * 0.3, roadY - 90);
      ctx.lineTo(x + w * 0.6, roadY - 50);
      ctx.lineTo(x + w * 0.85, roadY - 110);
      ctx.lineTo(x + w, roadY - 45);
      ctx.lineTo(x + w, roadY);
      ctx.lineTo(x, roadY);
      ctx.fill();

      // Road asphalt
      ctx.fillStyle = '#334155';
      ctx.fillRect(x, roadY, w, h - roadY);

      // White dash road markings
      ctx.fillStyle = '#ffffff';
      for (let rx = x - 50; rx < x + w + 50; rx += 45) {
        const markX = rx - (scrollOffset % 45);
        if (markX > x && markX < x + w - 30) {
          ctx.fillRect(markX, roadY + 22, 22, 4);
        }
      }

      // Distance Milestone Post (Kilometer Marker)
      const curKm = 5 + (Math.round(currentStep) - 1) * 3;
      const markerX = x + w * 0.78;
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.roundRect(markerX, roadY - 55, 34, 55, [6, 6, 0, 0]);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.font = '700 12px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${curKm}`, markerX + 17, roadY - 32);
      ctx.font = '600 9px "Outfit", sans-serif';
      ctx.fillText('KM', markerX + 17, roadY - 18);

      // Animated Athletic Runner (Center Stage)
      const runnerX = x + w * 0.42;
      const runnerY = roadY - 8;
      const runCycle = this.currentTime * 12; // running rhythm
      const legOffset = Math.sin(runCycle) * 16;
      const armOffset = Math.cos(runCycle) * 14;

      ctx.save();
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#38bdf8';

      // Head
      ctx.fillStyle = '#fde68a';
      ctx.beginPath();
      ctx.arc(runnerX, runnerY - 55, 9, 0, Math.PI * 2);
      ctx.fill();

      // Torso
      ctx.strokeStyle = '#0284c7';
      ctx.beginPath();
      ctx.moveTo(runnerX, runnerY - 45);
      ctx.lineTo(runnerX + 2, runnerY - 20);
      ctx.stroke();

      // Back Arm
      ctx.strokeStyle = '#64748b';
      ctx.beginPath();
      ctx.moveTo(runnerX, runnerY - 40);
      ctx.lineTo(runnerX - armOffset * 0.8, runnerY - 26);
      ctx.lineTo(runnerX - armOffset, runnerY - 14);
      ctx.stroke();

      // Legs (Left & Right)
      ctx.strokeStyle = '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(runnerX + 2, runnerY - 20);
      ctx.lineTo(runnerX - legOffset, runnerY - 5);
      ctx.lineTo(runnerX - legOffset * 1.2, runnerY);
      ctx.stroke();

      ctx.strokeStyle = '#0284c7';
      ctx.beginPath();
      ctx.moveTo(runnerX + 2, runnerY - 20);
      ctx.lineTo(runnerX + legOffset, runnerY - 6);
      ctx.lineTo(runnerX + legOffset * 1.2, runnerY);
      ctx.stroke();

      // Front Arm
      ctx.strokeStyle = '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(runnerX, runnerY - 40);
      ctx.lineTo(runnerX + armOffset * 0.8, runnerY - 26);
      ctx.lineTo(runnerX + armOffset, runnerY - 14);
      ctx.stroke();

      ctx.restore();

      // HUD Badge over runner
      const totalKm = (Math.round(currentStep) / 2) * (10 + (Math.round(currentStep) - 1) * 3);
      ctx.fillStyle = '#10b981';
      ctx.font = '700 13px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`ចម្ងាយសប្តាហ៍នេះ៖ ${curKm} km  |  ចម្ងាយសរុប S_n = ${totalKm.toFixed(1)} km`, cx, y + h - 16);
    }

    // Scenario 4: Stacked Construction Pipes
    renderPipesScene(ctx, x, y, w, h, currentStep) {
      const cx = x + w * 0.5;
      const groundY = y + h * 0.85;

      // Title
      ctx.fillStyle = '#f8fafc';
      ctx.font = '700 16px "Kantumruy Pro", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🏗️ គំនរបំពង់ដែកសំណង់រាងពីរ៉ាមីត', cx, y + 42);

      ctx.fillStyle = '#38bdf8';
      ctx.font = '600 13px "Outfit", sans-serif';
      ctx.fillText(`ស្រទាប់ទី ${Math.round(currentStep)} / 10  •  u_n = 3 + 2(n - 1)`, cx, y + 64);

      // Concrete Ground
      ctx.fillStyle = '#334155';
      ctx.fillRect(x, groundY, w, h - groundY);
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, groundY);
      ctx.lineTo(x + w, groundY);
      ctx.stroke();

      // Stacking logic:
      // Layer 1 (top): 3 pipes
      // Layer 2: 5 pipes
      // Layer 3: 7 pipes
      // ...
      const activeLayers = Math.min(10, Math.round(currentStep));
      const pipeRadius = 9;
      const pipeSpacing = pipeRadius * 2 + 1;

      // Render layers from top (n=1) to activeLayers
      const startY = y + 105;

      for (let layer = 1; layer <= activeLayers; layer++) {
        const pipeCount = 3 + (layer - 1) * 2;
        const layerY = startY + (layer - 1) * (pipeRadius * 1.75);
        const layerStartX = cx - ((pipeCount - 1) * pipeSpacing) / 2;

        for (let p = 0; p < pipeCount; p++) {
          const px = layerStartX + p * pipeSpacing;

          // Metallic Steel Pipe (3D Cylinder Cross-Section)
          const grad = ctx.createRadialGradient(px - 3, layerY - 3, 2, px, layerY, pipeRadius);
          if (layer === activeLayers) {
            grad.addColorStop(0, '#fef08a');
            grad.addColorStop(0.6, '#f59e0b');
            grad.addColorStop(1, '#78350f');
          } else {
            grad.addColorStop(0, '#e2e8f0');
            grad.addColorStop(0.5, '#64748b');
            grad.addColorStop(1, '#1e293b');
          }

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(px, layerY, pipeRadius, 0, Math.PI * 2);
          ctx.fill();

          // Hollow inner circle
          ctx.fillStyle = '#0f172a';
          ctx.beginPath();
          ctx.arc(px, layerY, pipeRadius * 0.55, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Total count
      const curLayerPipes = 3 + (activeLayers - 1) * 2;
      const totalPipes = (activeLayers / 2) * (6 + (activeLayers - 1) * 2);
      ctx.fillStyle = '#fde68a';
      ctx.font = '700 13px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`ស្រទាប់ទី ${activeLayers}៖ ${curLayerPipes} បំពង់  |  បំពង់សរុប S_${activeLayers} = ${totalPipes} បំពង់`, cx, y + h - 16);
    }

    // Scenario 5: Taxi Fare Meter & City Drive
    renderTaxiScene(ctx, x, y, w, h, currentStep) {
      const cx = x + w * 0.5;
      const roadY = y + h * 0.72;

      // Title
      ctx.fillStyle = '#f8fafc';
      ctx.font = '700 16px "Kantumruy Pro", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🚕 សេវាតាក់ស៊ី & ថ្លៃឈ្នួលគិតតាមគីឡូម៉ែត្រ', cx, y + 42);

      ctx.fillStyle = '#38bdf8';
      ctx.font = '600 13px "Outfit", sans-serif';
      ctx.fillText(`គីឡូម៉ែត្រទី ${Math.round(currentStep)} / 15  •  u_n = 1.50 + 0.50(n - 1) $`, cx, y + 64);

      // Night City Skyline Background
      ctx.fillStyle = '#1e293b';
      const buildings = [
        { bx: x + 20, bw: 45, bh: 95 },
        { bx: x + 75, bw: 35, bh: 130 },
        { bx: x + 120, bw: 60, bh: 80 },
        { bx: x + 190, bw: 50, bh: 110 },
        { bx: x + 250, bw: 40, bh: 140 },
        { bx: x + 300, bw: 55, bh: 90 }
      ];
      buildings.forEach((b) => {
        ctx.fillRect(b.bx, roadY - b.bh, b.bw, b.bh);
        // glowing windows
        ctx.fillStyle = '#fef08a';
        for (let wy = roadY - b.bh + 12; wy < roadY - 15; wy += 18) {
          ctx.fillRect(b.bx + 8, wy, 6, 8);
          ctx.fillRect(b.bx + 20, wy, 6, 8);
        }
        ctx.fillStyle = '#1e293b';
      });

      // Road
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(x, roadY, w, h - roadY);

      // Yellow Taxi Car
      const carX = x + w * 0.35;
      const carY = roadY - 14;

      ctx.save();
      // Car Body
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.roundRect(carX - 60, carY - 26, 120, 26, [8, 8, 0, 0]);
      ctx.fill();

      // Car Roof
      ctx.beginPath();
      ctx.roundRect(carX - 35, carY - 48, 65, 24, [10, 10, 0, 0]);
      ctx.fill();

      // Windows
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(carX - 28, carY - 44, 24, 16);
      ctx.fillRect(carX + 2, carY - 44, 24, 16);

      // Taxi Roof Sign
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(carX - 12, carY - 58, 26, 10, 3);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.font = '700 8px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('TAXI', carX + 1, carY - 50);

      // Wheels
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(carX - 35, carY, 11, 0, Math.PI * 2);
      ctx.arc(carX + 35, carY, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#94a3b8';
      ctx.beginPath();
      ctx.arc(carX - 35, carY, 4, 0, Math.PI * 2);
      ctx.arc(carX + 35, carY, 4, 0, Math.PI * 2);
      ctx.fill();

      // Headlight Beam
      const lightGrad = ctx.createLinearGradient(carX + 60, carY - 10, carX + 140, carY + 8);
      lightGrad.addColorStop(0, 'rgba(253, 224, 71, 0.45)');
      lightGrad.addColorStop(1, 'rgba(253, 224, 71, 0)');
      ctx.fillStyle = lightGrad;
      ctx.beginPath();
      ctx.moveTo(carX + 60, carY - 12);
      ctx.lineTo(carX + 140, carY + 12);
      ctx.lineTo(carX + 130, carY + 16);
      ctx.lineTo(carX + 60, carY - 4);
      ctx.fill();

      ctx.restore();

      // Digital Taxi Fare Meter Card (Top Right of Scene)
      const curKm = Math.round(currentStep);
      const curKmRate = 1.50 + (curKm - 1) * 0.50;
      const meterTotal = 2.00 + (curKm - 1) * 0.80;

      ctx.fillStyle = '#10b981';
      ctx.font = '700 13px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`ចម្ងាយ៖ ${curKm} km  |  ថ្លៃ km នេះ៖ $${curKmRate.toFixed(2)}  |  ថ្លៃឈ្នួលលើនាឡិកា៖ $${meterTotal.toFixed(2)}`, cx, y + h - 16);
    }

    // ------------------------------------------------------------
    // MATHEMATICAL SEQUENCE PLOT (RIGHT PANEL)
    // ------------------------------------------------------------
    renderSequenceGraph(ctx, x, y, w, h, currentStep) {
      const padding = { top: 75, right: 35, bottom: 65, left: 65 };
      const plotW = w - padding.left - padding.right;
      const plotH = h - padding.top - padding.bottom;

      const totalSteps = this.scenario.totalSteps;
      const curStep = Math.max(1, Math.min(totalSteps, currentStep));

      // Title & Subtitle banner
      ctx.fillStyle = '#f8fafc';
      ctx.font = '700 15px "Kantumruy Pro", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('📊 ក្រាហ្វស្វ៊ីតនព្វន្ត u_n & ផលបូកសរុប S_n', x + w * 0.5, y + 42);

      // Calculate max value for Y axis
      const maxUn = this.scenario.f(totalSteps);
      const yMax = maxUn * 1.25;

      const getX = (n) => x + padding.left + ((n - 1) / (totalSteps - 1)) * plotW;
      const getY = (val) => y + padding.top + plotH - (val / yMax) * plotH;

      // Draw Grid & Axes
      ctx.save();
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.15)';
      ctx.lineWidth = 1;

      // Horizontal Grid lines (5 ticks)
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
        ctx.fillText(`${Math.round(val)} ${this.scenario.unit}`, x + padding.left - 8, gy + 4);
      }

      // Main Axes
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      // Y-axis
      ctx.moveTo(x + padding.left, y + padding.top);
      ctx.lineTo(x + padding.left, y + padding.top + plotH);
      // X-axis
      ctx.lineTo(x + padding.left + plotW, y + padding.top + plotH);
      ctx.stroke();

      // Cumulative Sum Area Under Terms (Polygon)
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
      areaGrad.addColorStop(0, 'rgba(56, 189, 248, 0.28)');
      areaGrad.addColorStop(1, 'rgba(56, 189, 248, 0.02)');
      ctx.fillStyle = areaGrad;
      ctx.fill();

      // Draw Connecting Line for sequence points
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let n = 1; n <= roundedCurStep; n++) {
        const val = this.scenario.f(n);
        const px = getX(n);
        const py = getY(val);
        if (n === 1) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Draw Discrete Step Bars & Points (u_1, u_2, ..., u_n)
      for (let n = 1; n <= totalSteps; n++) {
        const val = this.scenario.f(n);
        const px = getX(n);
        const py = getY(val);
        const isPastOrActive = n <= roundedCurStep;
        const isCurrent = n === roundedCurStep;

        // X-axis step labels (1, 2, 3...)
        ctx.fillStyle = isCurrent ? '#f59e0b' : isPastOrActive ? '#ffffff' : '#64748b';
        ctx.font = isCurrent ? '700 12px "Outfit", sans-serif' : '500 10px "Outfit", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`n=${n}`, px, y + padding.top + plotH + 18);

        if (isPastOrActive) {
          // Subtle vertical stem
          ctx.strokeStyle = isCurrent ? 'rgba(245, 158, 11, 0.6)' : 'rgba(56, 189, 248, 0.25)';
          ctx.lineWidth = isCurrent ? 2 : 1;
          ctx.beginPath();
          ctx.moveTo(px, getY(0));
          ctx.lineTo(px, py);
          ctx.stroke();

          // Circle point
          ctx.fillStyle = isCurrent ? '#f59e0b' : '#38bdf8';
          ctx.beginPath();
          ctx.arc(px, py, isCurrent ? 6 : 4, 0, Math.PI * 2);
          ctx.fill();

          if (isCurrent) {
            // Pulse outer glow
            ctx.strokeStyle = '#fef08a';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(px, py, 9, 0, Math.PI * 2);
            ctx.stroke();

            // Value badge floating over current point
            ctx.fillStyle = '#f59e0b';
            ctx.font = '700 12px "Outfit", sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(`u_${n} = ${val}`, px, py - 14);

            // Difference +d annotation arrow if n > 1
            if (n > 1) {
              const prevX = getX(n - 1);
              const prevY = getY(this.scenario.f(n - 1));
              ctx.fillStyle = '#10b981';
              ctx.font = '600 11px "Outfit", sans-serif';
              ctx.fillText(`+${this.scenario.d}`, (prevX + px) / 2, (prevY + py) / 2 - 10);
            }
          }
        } else {
          // Future ghost points
          ctx.fillStyle = 'rgba(100, 116, 139, 0.4)';
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();

      // Bottom Legend / Formula Indicator
      ctx.fillStyle = '#94a3b8';
      ctx.font = '500 12px "Kantumruy Pro", sans-serif';
      ctx.textAlign = 'center';
      const curSn = this.scenario.sumF(roundedCurStep);
      ctx.fillText(
        `ផលបូកសរុប S_${roundedCurStep} = (n/2)(u_1 + u_n) = ${Math.round(curSn).toLocaleString()} ${this.scenario.unitName}`,
        x + w * 0.5,
        y + h - 16
      );
    }

    // ------------------------------------------------------------
    // PARTICLES ENGINE (FOR CELEBRATIONS & CLICKS)
    // ------------------------------------------------------------
    spawnCoinParticles() {
      const cx = this.width * 0.26;
      const cy = this.height * 0.45;
      for (let i = 0; i < 8; i++) {
        this.particles.push({
          x: cx + (Math.random() - 0.5) * 30,
          y: cy + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 4,
          vy: -Math.random() * 4 - 2,
          radius: Math.random() * 3.5 + 2,
          color: ['#facc15', '#f59e0b', '#38bdf8', '#10b981'][Math.floor(Math.random() * 4)],
          life: 1.0,
          decay: Math.random() * 0.03 + 0.02
        });
      }
    }

    renderParticles(ctx) {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12; // gravity
        p.life -= p.decay;

        if (p.life <= 0) {
          this.particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
  }

  // Auto initialize on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    new ArithmeticVideoStudio();
  });
})();
