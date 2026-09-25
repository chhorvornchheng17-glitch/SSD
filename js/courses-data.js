/**
 * courses-data.js - ទិន្នន័យវគ្គសិក្សា រូបមន្ត វិញ្ញាសា និងសេចក្តីថ្លែងអំណរគុណ
 * Teacher Chheng Chhovorn - Mathematics Portfolio
 */

const COURSES_DATA = [
  {
    id: 'bacii-intensive',
    category: 'grade12',
    title: 'វគ្គបំប៉នពិសេស ត្រៀមប្រឡងបាក់ឌុប (BacII Mastery)',
    level: 'ថ្នាក់ទី ១២ (វិទ្យាសាស្ត្រ)',
    badge: 'ពេញនិយមបំផុត',
    badgeColor: 'gold',
    rating: 4.9,
    studentsCount: '1,200+',
    duration: '៤ ខែ (១២០ ម៉ោង)',
    schedule: 'ចន្ទ-ពុធ-សុក្រ | 5:30 - 7:00 ល្ងាច',
    mode: 'Hybrid (ផ្ទាល់ & Online Zoom)',
    description: 'ផ្តោតស៊ីជម្រៅលើមេរៀនស្នូលបាក់ឌុប៖ លីមីត ភាពជាប់ ដេរីវេ អនុគមន៍ អាំងតេក្រាល ចំនួនកុំផ្លិច ប្រូបាប និងធរណីមាត្រក្នុងលំហ ជាមួយវិធីសាស្ត្រគិតលឿននិងត្រឹមត្រូវ 100%។',
    highlights: [
      'កម្រងវិញ្ញាសាគំរូ ៥០+ ឈុត ស្របតាមទម្រង់ក្រសួងអប់រំ',
      'គន្លឹះដោះស្រាយលំហាត់ប្រូបាប និងធរណីមាត្រលំហ',
      'ការប្រឡងតេស្តវាស់កម្រិតប្រចាំសប្តាហ៍ (Mock Exam)',
      'វីដេអូមើលឡើងវិញបានរហូតដល់ថ្ងៃប្រឡងចប់'
    ],
    price: '$35/ខែ'
  },
  {
    id: 'olympiad-champions',
    category: 'olympiad',
    title: 'ថ្នាក់បង្វឹកសិស្សពូកែទូទាំងប្រទេស (Math Olympiad Elite)',
    level: 'ថ្នាក់ទី ៩ និង ១២',
    badge: 'កម្រិតខ្ពស់',
    badgeColor: 'cyan',
    rating: 5.0,
    studentsCount: '350+',
    duration: '៦ ខែ',
    schedule: 'សៅរ៍-អាទិត្យ | 8:00 - 11:30 ព្រឹក',
    mode: 'ផ្ទាល់នៅបន្ទប់បង្វឹកពិសេស',
    description: 'កម្មវិធីសិក្សាបែបស៊ីជម្រៅសម្រាប់ការប្រកួតប្រជែងថ្នាក់រាជធានី-ខេត្ត និងថ្នាក់ជាតិ។ ពង្រឹងទស្សនៈវិជ្ជា វិសមភាព Cauchy-Schwarz, AM-GM, ទ្រឹស្តីលេខ (Number Theory) និងអនុគមន៍ស្មុគស្មាញ។',
    highlights: [
      'វិញ្ញាសាសិស្សពូកែជាតិ និងអន្តរជាតិ (IMO / APMO / AMC)',
      'បច្ចេកទេសបង្កើតដំណោះស្រាយបែបច្នៃប្រឌិត (Elegant Proofs)',
      'ការពិភាក្សាតទល់មួយទល់មួយជាមួយអ្នកគ្រូផ្ទាល់',
      'អត្រាសិស្សជាប់ជ័យលាភីមេដាយរហូតដល់ 85%'
    ],
    price: '$50/ខែ'
  },
  {
    id: 'grade11-advanced',
    category: 'grade11',
    title: 'ពង្រឹងគ្រឹះរឹងមាំ ថ្នាក់ទី ១១ (Grade 11 Foundation & Advanced)',
    level: 'ថ្នាក់ទី ១១',
    badge: 'គ្រឹះរឹងមាំ',
    badgeColor: 'emerald',
    rating: 4.8,
    studentsCount: '800+',
    duration: 'ពេញមួយឆ្នាំសិក្សា',
    schedule: 'អង្គារ-ព្រហស្បតិ៍-សៅរ៍ | 5:00 - 6:30 ល្ងាច',
    mode: 'Online Live & Recorded',
    description: 'កសាងមូលដ្ឋានគ្រឹះត្រីកោណមាត្រ កោនិក ស្វ៊ីតចំនួនពិត អនុគមន៍អិចស្ប៉ូណង់ស្យែល និងលោការីត ដើម្បីត្រៀមខ្លួនជាស្រេចឆ្ពោះទៅកាន់ថ្នាក់ទី១២ ដោយទំនុកចិត្តខ្ពស់។',
    highlights: [
      'បង្រៀនរូបមន្តនិងទ្រឹស្តីជាមួយគំរូជាក់ស្តែងងាយយល់',
      'កម្រងលំហាត់អនុវត្តន៍ពីកម្រិតមធ្យមទៅកម្រិតស្វិតស្វាញ',
      'ក្រុម Telegram សួរ-ឆ្លើយលំហាត់ ២៤ ម៉ោង/៧ ថ្ងៃ',
      'សន្លឹកកិច្ចការ និងសៀវភៅរូបមន្តចងក្រងពិសេស'
    ],
    price: '$30/ខែ'
  },
  {
    id: 'grade10-starter',
    category: 'grade10',
    title: 'បំប្លែងការខ្លាចគណិតវិទ្យា ថ្នាក់ទី ១០ (Grade 10 Bridge)',
    level: 'ថ្នាក់ទី ១០',
    badge: 'ងាយយល់',
    badgeColor: 'emerald',
    rating: 4.8,
    studentsCount: '600+',
    duration: 'ពេញមួយឆ្នាំសិក្សា',
    schedule: 'ចន្ទ-ពុធ-សុក្រ | 2:00 - 3:30 រសៀល',
    mode: 'Online Interactive Studio',
    description: 'ស្ពានចម្លងពីអនុវិទ្យាល័យមកវិទ្យាល័យ។ បំបាត់ភាពស្រពិចស្រពិលលើពហុធា សមីការដឺក្រេទី២ វិសមភាព និងវ៉ិចទ័រ ដោយផ្តោតលើការយល់ន័យនៃគណិតវិទ្យា មិនមែនទន្ទេញចាំមាត់ឡើយ។',
    highlights: [
      'វិធីសាស្រ្តបង្រៀនបែប Visual Mathematics',
      'កែទម្លាប់ខ្លាចលំហាត់ ជំនួសដោយភាពជឿជាក់លើខ្លួនឯង',
      'ការតាមដានការវិវត្តសមត្ថភាពសិស្សម្នាក់ៗ',
      'លំហាត់ពង្រឹងល្បឿនគិតលេខរហ័ស'
    ],
    price: '$25/ខែ'
  },
  {
    id: 'calculus-uni',
    category: 'higher',
    title: 'គណិតវិទ្យាឧត្តមសិក្សា & ត្រៀមប្រឡងអាហារូបករណ៍',
    level: 'និស្សិតឆ្នាំទី១ & បាក់ឌុបរួច',
    badge: 'អាហារូបករណ៍',
    badgeColor: 'purple',
    rating: 4.9,
    studentsCount: '450+',
    duration: '៣ ខែ',
    schedule: 'សៅរ៍-អាទិត្យ | 1:30 - 4:30 រសៀល',
    mode: 'Zoom Interactive Room',
    description: 'ត្រៀមប្រឡងចូលសាលាតិចណូ (ITC), ពេទ្យ (UHS), និងអាហារូបករណ៍ទៅសិក្សានៅក្រៅប្រទេស (MEXT, CSC, KGSP)។ ផ្តោតលើ Calculus I & II, Linear Algebra, Differential Equations។',
    highlights: [
      'វិញ្ញាសាប្រឡងចូលស្ថាប័នកំពូលៗរយៈពេល ១០ ឆ្នាំចុងក្រោយ',
      'បច្ចេកទេសគិតបែប Logical Analytical Framework',
      'ការណែនាំគន្លឹះប្រឡងផ្ទាល់ពីសិស្សច្បងដែលទទួលបានអាហារូបករណ៍',
      'ឯកសារគណិតវិទ្យាជាភាសាអង់គ្លេស និងបារាំងគួបផ្សំ'
    ],
    price: '$45/ខែ'
  },
  {
    id: 'private-tutoring',
    category: 'private',
    title: 'វគ្គបង្វឹកឯកជន VIP 1-on-1 (Personal Mentorship)',
    level: 'គ្រប់កម្រិតថ្នាក់',
    badge: 'ផ្តាច់មុខ VIP',
    badgeColor: 'amber',
    rating: 5.0,
    studentsCount: '50+',
    duration: 'តាមតម្រូវការសិស្ស',
    schedule: 'អាចជ្រើសរើសម៉ោងបត់បែនបាន',
    mode: 'ផ្ទាល់នៅគេហដ្ឋាន ឬ Private Studio',
    description: 'កម្មវិធីសិក្សាដែលកែច្នៃស្របតាមចំនុចខ្សោយ និងចំនុចខ្លាំងរបស់សិស្សម្នាក់ៗ។ អ្នកគ្រូ ឆេង ឆវ័ន្ត បង្វឹកដោយផ្ទាល់ តាមដានលទ្ធផលតឹងរ៉ឹង រៀបចំផែនការប្រឡងយកនិទ្ទេស A ជាក់លាក់។',
    highlights: [
      'ការវាយតម្លៃសមត្ថភាពដំបូង និងគូសផែនការរៀនផ្ទាល់ខ្លួន',
      'ដោះស្រាយលំហាត់ពិបាកៗដែលសិស្សមានចម្ងល់បានភ្លាមៗ',
      'រាយការណ៍វឌ្ឍនភាពសិក្សាជូនមាតាបិតាជាប្រចាំសប្តាហ៍',
      'ការលើកទឹកចិត្ត និងបណ្តុះផ្នត់គំនិតអ្នកដឹកនាំ'
    ],
    price: 'ទំនាក់ទំនងផ្ទាល់'
  }
];

const FORMULAS_DATA = [
  {
    id: 1,
    category: 'derivative',
    categoryName: 'ដេរីវេ (Derivatives)',
    title: 'ដេរីវេនៃអនុគមន៍ស្វ័យគុណ & ផលគុណ',
    formula: '(u^n)\' = n \\cdot u\' \\cdot u^{n-1} \\quad | \\quad (u \\cdot v)\' = u\'v + uv\'',
    explanation: 'រូបមន្តស្នូលសម្រាប់គណនាដេរីវេនៃអនុគមន៍បណ្តាក់ និងផលគុណរវាងពីរអនុគមន៍។ សំខាន់បំផុតសម្រាប់សិក្សាអថេរភាព និងទិសដៅបម្រែបម្រួលនៃអនុគមន៍។',
    tags: ['ស្វ័យគុណ', 'ផលគុណ', 'ដេរីវេ', 'អនុគមន៍']
  },
  {
    id: 2,
    category: 'derivative',
    categoryName: 'ដេរីវេ (Derivatives)',
    title: 'ដេរីវេនៃអនុគមន៍ត្រីកោណមាត្រ',
    formula: '(\\sin u)\' = u\'\\cos u \\quad | \\quad (\\cos u)\' = -u\'\\sin u \\quad | \\quad (\\tan u)\' = \\frac{u\'}{\\cos^2 u}',
    explanation: 'ដេរីវេនៃស៊ីនុស កូស៊ីនុស និងតង់សង់។ សូមកត់សម្គាល់សញ្ញាដក (-) នៅពេលរកដេរីវេនៃកូស៊ីនុស។',
    tags: ['ត្រីកោណមាត្រ', 'ស៊ីនុស', 'កូស៊ីនុស', 'តង់សង់']
  },
  {
    id: 3,
    category: 'derivative',
    categoryName: 'ដេរីវេ (Derivatives)',
    title: 'ដេរីវេនៃអនុគមន៍អិចស្ប៉ូណង់ស្យែល & លោការីត',
    formula: '(e^u)\' = u\' \\cdot e^u \\quad | \\quad (\\ln u)\' = \\frac{u\'}{u} \\quad (u > 0)',
    explanation: 'រូបមន្តលេចឡើងញឹកញាប់បំផុតក្នុងវិញ្ញាសាបាក់ឌុបថ្នាក់វិទ្យាសាស្ត្រ និងវិទ្យាសាស្ត្រសង្គម។',
    tags: ['អិចស្ប៉ូណង់ស្យែល', 'លោការីត', 'ដេរីវេ']
  },
  {
    id: 4,
    category: 'integral',
    categoryName: 'អាំងតេក្រាល (Integrals)',
    title: 'អាំងតេក្រាលដោយផ្នែក (Integration by Parts)',
    formula: '\\int u \\, dv = u \\cdot v - \\int v \\, du',
    explanation: 'ប្រើនៅពេលអនុគមន៍ក្នុងអាំងតេក្រាលជាផលគុណនៃប្រភេទអនុគមន៍ខុសគ្នា (ឧ. ពហុធាគុណនឹងត្រីកោណមាត្រ ឬអិចស្ប៉ូណង់ស្យែល)។ ប្រើក្បួន LIATE ដើម្បីជ្រើស u។',
    tags: ['អាំងតេក្រាល', 'ដោយផ្នែក', 'LIATE', 'បាក់ឌុប']
  },
  {
    id: 5,
    category: 'integral',
    categoryName: 'អាំងតេក្រាល (Integrals)',
    title: 'អាំងតេក្រាលនៃអនុគមន៍សនិទាន & ស្វ័យគុណ',
    formula: '\\int u^n u\' \\, dx = \\frac{u^{n+1}}{n+1} + C \\, (n \\ne -1) \\quad | \\quad \\int \\frac{u\'}{u} \\, dx = \\ln|u| + C',
    explanation: 'រូបមន្តព្រីមីទីវគ្រឹះដែលត្រូវចងចាំឱ្យច្បាស់ដើម្បីគណនាក្រឡាផ្ទៃ និងមាឌនៃសូលីដវិលជុំ។',
    tags: ['ព្រីមីទីវ', 'អាំងតេក្រាល', 'ក្រឡាផ្ទៃ', 'មាឌ']
  },
  {
    id: 51,
    category: 'integral',
    categoryName: 'អាំងតេក្រាល (Integrals)',
    title: 'គណនាផ្ទៃក្រឡាខ្សែកោងដោយអាំងតេក្រាល (Area Under Curve)',
    formula: 'S = \\int_a^b f(x) \\, dx = [F(x)]_a^b = F(b) - F(a)',
    explanation: 'ផ្ទៃក្រឡាខ្សែកោង y = f(x) លើចន្លោះ [a, b] កំណត់ដោយលីមីតនៃផលបូករីម៉ាន (Riemann Sums) ឬព្រីមីទីវ F(b) - F(a)។ អាចពិសោធន៍ផ្ទាល់ក្នុងផ្ទាំង Curve Video Studio!',
    tags: ['អាំងតេក្រាល', 'ក្រឡាផ្ទៃ', 'រីម៉ាន', 'បាក់ឌុប', 'សិស្សពូកែ']
  },
  {
    id: 6,
    category: 'limits',
    categoryName: 'លីមីត (Limits)',
    title: 'លីមីតត្រីកោណមាត្រ និងអិចស្ប៉ូណង់ស្យែលសំខាន់ៗ',
    formula: '\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1 \\quad | \\quad \\lim_{x \\to 0} \\frac{e^x - 1}{x} = 1 \\quad | \\quad \\lim_{x \\to 0} \\frac{\\ln(1+x)}{x} = 1',
    explanation: 'គន្លឹះដោះរាងមិនកំណត់ 0/0 ក្នុងការគណនាលីមីតស្មុគស្មាញដោយមិនចាំបាច់ប្រើក្បួន L\'Hôpital យូរ។',
    tags: ['លីមីត', 'រាងមិនកំណត់', 'ទម្រង់គន្លឹះ']
  },
  {
    id: 7,
    category: 'complex',
    categoryName: 'ចំនួនកុំផ្លិច (Complex Numbers)',
    title: 'ទម្រង់ត្រីកោណមាត្រ និងរូបមន្តដឺម័រ (Moivre\'s Formula)',
    formula: 'z = r(\\cos\\theta + i\\sin\\theta) \\implies z^n = r^n(\\cos n\\theta + i\\sin n\\theta)',
    explanation: 'រូបមន្តដ៏មានអានុភាពសម្រាប់គណនាស្វ័យគុណខ្ពស់នៃចំនួនកុំផ្លិច និងការដោះស្រាយសមីការកុំផ្លិចដឺក្រេទី n។',
    tags: ['កុំផ្លិច', 'ដឺម័រ', 'ម៉ូឌុល', 'អាគុយម៉ង់']
  },
  {
    id: 8,
    category: 'geometry',
    categoryName: 'ធរណីមាត្រក្នុងលំហ (Space Geometry)',
    title: 'ចម្ងាយពីចំណុចមួយទៅប្លង់ & សមីការស្វ៊ែរ',
    formula: 'd(M_0, P) = \\frac{|ax_0 + by_0 + cz_0 + d|}{\\sqrt{a^2 + b^2 + c^2}} \\quad | \\quad (x-a)^2 + (y-b)^2 + (z-c)^2 = R^2',
    explanation: 'រូបមន្តគណនាចម្ងាយក្នុងតម្រុយអរតូណរមេ $(O, \\vec{i}, \\vec{j}, \\vec{k})$ និងការសិក្សាទីតាំងធៀបរវាងប្លង់និងស្វ៊ែរ។',
    tags: ['ធរណីមាត្រ', 'លំហ', 'ប្លង់', 'ស្វ៊ែរ', 'ចម្ងាយ']
  },
  {
    id: 9,
    category: 'probability',
    categoryName: 'ប្រូបាប (Probability)',
    title: 'ចម្លាស់ បន្សំ និងរូបមន្តប្រូបាបមានលក្ខខណ្ឌ',
    formula: 'C_n^p = \\frac{n!}{p!(n-p)!} \\quad | \\quad P(A|B) = \\frac{P(A \\cap B)}{P(B)} \\quad | \\quad P(A \\cup B) = P(A) + P(B) - P(A \\cap B)',
    explanation: 'គន្លឹះបែងចែករវាងការជ្រើសរើសគិតលំដាប់ (ចម្លាស់/រៀប) និងមិនគិតលំដាប់ (បន្សំ) ក្នុងលំហាត់ចាប់បាល់ និងបៀរ។',
    tags: ['ប្រូបាប', 'បន្សំ', 'ចម្លាស់', 'លក្ខខណ្ឌ']
  }
];

const TESTIMONIALS_DATA = [
  {
    name: 'តោ គីមឈី',
    title: 'ជ័យលាភីសិស្សពូកែគណិតវិទ្យាថ្នាក់ទី ៩ ជាប់លេខ ២ ថ្នាក់ខេត្ត (២០២៥)',
    school: 'វិទ្យាស្ថានជាតិអប់រំ (SHINE)',
    avatar: '👩‍🎓',
    image: 'assets/images/student-kimchhi.jpg',
    featured: true,
    badge: '🥈 ជ័យលាភីលេខ ២ ខេត្ត (២០២៥)',
    quote: 'ការបំប៉នយ៉ាងយកចិត្តទុកដាក់ និងគន្លឹះដោះស្រាយលំហាត់សិស្សពូកែរបស់អ្នកគ្រូ ឆេង ឆវ័ន្ត នៅវិទ្យាស្ថាន SHINE បានជួយឱ្យនាងខ្ញុំដណ្តើមបានជ័យលាភីលេខ ២ ថ្នាក់ខេត្ត ក្នុងការប្រឡងសិស្សពូកែគណិតវិទ្យាថ្នាក់ទី ៩ ឆ្នាំ ២០២៥។ អរគុណអ្នកគ្រូខ្លាំងណាស់!'
  },
  {
    name: 'សុខ វិបុល',
    title: 'និទ្ទេស A គណិតវិទ្យា (ពិន្ទុ 100/100) - បាក់ឌុប',
    school: 'វិទ្យាល័យសសរស្តម្ភ',
    avatar: '👨‍🎓',
    badge: 'និទ្ទេស A ពិន្ទុពេញ',
    quote: 'កាលពីមុនខ្ញុំតែងតែខ្លាចលំហាត់ប្រូបាបនិងធរណីមាត្រក្នុងលំហ។ ក្រោយពីរៀនជាមួយអ្នកគ្រូ ឆេង ឆវ័ន្ត ខ្ញុំយល់ច្បាស់ពីឫសគល់នៃរូបមន្ត ហើយចេះបំបែកលំហាត់ជាជំហានៗ។ អ្នកគ្រូបង្រៀនដោយចិត្តស្មោះ និងយកចិត្តទុកដាក់លើសិស្សគ្រប់រូប!'
  },
  {
    name: 'ជា មុន្នីរ័ត្ន',
    title: 'សិស្សឆ្នើមគណិតវិទ្យា',
    school: 'វិទ្យាស្ថានជាតិអប់រំ (SHINE)',
    avatar: '🥇',
    badge: 'សិស្សឆ្នើម SHINE',
    quote: 'វិធីសាស្ត្រគិតបែបស៊ីជម្រៅរបស់អ្នកគ្រូ ឆវ័ន្ត គឺពិតជាអស្ចារ្យ! អ្នកគ្រូបានបង្ហាត់ខ្ញុំនូវវិសមភាពស្មុគស្មាញ និងទ្រឹស្តីលេខដែលមិនមានក្នុងសៀវភៅធម្មតា។ សូមអរគុណអ្នកគ្រូដែលបានជួយឱ្យខ្ញុំទទួលបានជោគជ័យ!'
  },
  {
    name: 'លី ស្រីនិច',
    title: 'និទ្ទេស A ទូទៅ (និស្សិតពេទ្យ UHS ឆ្នាំទី២)',
    school: 'អតីតសិស្សបំប៉នបាក់ឌុប',
    avatar: '👩‍⚕️',
    badge: 'និស្សិតពេទ្យ',
    quote: 'ពិន្ទុគណិតវិទ្យាដ៏ខ្ពស់បានជួយឱ្យខ្ញុំប្រឡងជាប់ចូលរៀនមហាវិទ្យាល័យវិទ្យាសាស្ត្រសុខាភិបាល (ពេទ្យ) ដោយជោគជ័យ។ អ្នកគ្រូ ឆវ័ន្ត មិនត្រឹមតែបង្រៀនចំណេះដឹងទេ ថែមទាំងផ្តល់កម្លាំងចិត្ត និងដំបូន្មានជីវិតដ៏មានតម្លៃទៀតផង។'
  }
];

const RESOURCES_DATA = [
  {
    id: 'res-1',
    title: 'កម្រងវិញ្ញាសាប្រឡងបាក់ឌុបគណិតវិទ្យា ២០១៨-២០២៤ (ដំណោះស្រាយលម្អិត)',
    type: 'PDF E-Book',
    pages: '១៨០ ទំព័រ',
    size: '12.5 MB',
    downloads: '15,400+',
    featured: true,
    fileDesc: 'ប្រជុំវិញ្ញាសាថ្នាក់វិទ្យាសាស្ត្រ ជាមួយវិធីសាស្ត្រដោះស្រាយលម្អិតមួយជំហានម្តងៗ និងការបែងចែកពិន្ទុផ្លូវការ។'
  },
  {
    id: 'res-2',
    title: 'សៀវភៅរូបមន្តសង្ខេបមាស គណិតវិទ្យាថ្នាក់ទី ១២ (Quick Formula Pocket)',
    type: 'PDF Pocket Guide',
    pages: '៤២ ទំព័រ',
    size: '4.8 MB',
    downloads: '28,900+',
    featured: true,
    fileDesc: 'ប្រមូលផ្តុំគ្រប់រូបមន្តស្នូលដែលចេញប្រឡងញឹកញាប់បំផុត រួមជាមួយឧទាហរណ៍អនុវត្តរហ័ស ងាយស្រួលរំលឹកមុនថ្ងៃប្រឡង។'
  },
  {
    id: 'res-3',
    title: 'គន្លឹះដោះស្រាយលំហាត់លីមីត និងដេរីវេស្មុគស្មាញ (Shortcut Techniques)',
    type: 'Handout PDF',
    pages: '៥៥ ទំព័រ',
    size: '6.2 MB',
    downloads: '9,800+',
    featured: false,
    fileDesc: 'បច្ចេកទេសគិតលេខរហ័ស ដោះរាងមិនកំណត់ និងការវិភាគក្រាហ្វិកអនុគមន៍ដោយមិនបាច់ចំណាយពេលច្រើន។'
  },
  {
    id: 'res-4',
    title: 'កម្រងវិញ្ញាសាសិស្សពូកែគណិតវិទ្យាថ្នាក់ទី៩ និងបាក់ឌុប (Olympiad Problem Set)',
    type: 'Practice Sheets',
    pages: '៨៥ ទំព័រ',
    size: '8.1 MB',
    downloads: '7,200+',
    featured: false,
    fileDesc: 'លំហាត់បំប៉នសមត្ថភាពកម្រិតខ្ពស់ វិសមភាព Cauchy, AM-GM និងធរណីមាត្រប្លង់កម្រិតសិស្សពូកែខេត្ត-ជាតិ។'
  }
];

const TEACHER_PROFILE = {
  name: 'ឆេង ឆវ័ន្ត',
  latinName: 'Chheng Chhovorn',
  title: 'គ្រូបង្រៀនគណិតវិទ្យា វិទ្យាល័យសសរស្តម្ភ & វិទ្យាស្ថាន SHINE',
  tagline: '«គណិតវិទ្យាមិនមែនជាការទន្ទេញរូបមន្តទេ តែជាសិល្បៈនៃការគិតស៊ីជម្រៅនិងដោះស្រាយបញ្ហា»',
  bio: 'អ្នកគ្រូ ឆេង ឆវ័ន្ត ជាគ្រូបង្រៀនគណិតវិទ្យានៅវិទ្យាល័យសសរស្តម្ភ (ចាប់ពីឆ្នាំ ២០២០ ដល់បច្ចុប្បន្ន) និងជាគ្រូបង្រៀន Part-time នៅវិទ្យាស្ថានជាតិអប់រំ (SHINE) (ចាប់ពីឆ្នាំ ២០២១ ដល់បច្ចុប្បន្ន)។ អ្នកគ្រូបានប្រឡងចប់បាក់ឌុបនៅវិទ្យាល័យហ៊ុនសែនស្វាយធំ (២០១៥), បញ្ចប់បរិញ្ញាបត្រឯកទេសគណិតវិទ្យាពីសាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ (RUPP - ២០១៩), និងបញ្ចប់គរុកោសល្យពីវិទ្យាស្ថានជាតិអប់រំ (NIE - ២០២០)។ ក្នុងឆ្នាំ ២០២៥ អ្នកគ្រូបានបំប៉នសិស្សពូកែ តោ គីមឈី (វិទ្យាស្ថាន SHINE) ក្នុងការប្រឡងសិស្សពូកែគណិតវិទ្យាថ្នាក់ទី ៩ ទទួលបានជ័យលាភីជាប់ថ្នាក់ខេត្តលេខ ២ យ៉ាងឆ្នើម។',
  experienceYears: 6,
  teachingSchools: 'វិទ្យាល័យសសរស្តម្ភ & វិទ្យាស្ថានជាតិអប់រំ (SHINE)',
  education: [
    '២០១៥: ប្រឡងចប់សញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ នៅវិទ្យាល័យហ៊ុនសែនស្វាយធំ',
    '២០១៩: បរិញ្ញាបត្រឯកទេសគណិតវិទ្យា (សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ - RUPP)',
    '២០២០: បញ្ចប់គរុកោសល្យ (វិទ្យាស្ថានជាតិអប់រំ - NIE)'
  ],
  achievements: [
    'បំប៉នសិស្សពូកែ តោ គីមឈី (SHINE) ប្រឡងសិស្សពូកែគណិតវិទ្យាថ្នាក់ទី ៩ ជាប់ថ្នាក់ខេត្តលេខ ២ (២០២៥)',
    'គ្រូបង្រៀនគណិតវិទ្យានៅវិទ្យាល័យសសរស្តម្ភ (២០២០ - បច្ចុប្បន្ន)',
    'គ្រូបង្រៀន Part-time នៅវិទ្យាស្ថានជាតិអប់រំ (SHINE) (២០២១ - បច្ចុប្បន្ន)'
  ],
  contact: {
    phone: '+855 99 775 501',
    phoneFormatted: '099 77 5501',
    telegram: '@chhovorn_math',
    telegramLink: 'https://t.me/chhovorn_math',
    facebook: 'fb.com/TeacherChhengChhovorn',
    facebookLink: 'https://facebook.com',
    email: 'chhorvornk@gmail.com',
    location: 'វិទ្យាល័យសសរស្តម្ភ & វិទ្យាស្ថានជាតិអប់រំ (SHINE), ប្រទេសកម្ពុជា'
  }
};

/* ============================================================
   STUDENTS TRIGONOMETRIC FUNCTION PRACTICE DATA
   ============================================================ */
const TRIG_STUDENT_PRACTICE_DATA = [
  {
    id: 'kimchhi',
    studentName: 'តោ គីមឈី',
    studentBadge: 'ជ័យលាភីលេខ ២ ខេត្ត (២០២៥)',
    school: 'វិទ្យាស្ថានជាតិអប់រំ (SHINE)',
    photo: 'assets/images/students/student-kimchhi.jpg',
    exerciseTitle: 'លំហាត់ទី ១៖ សិក្សា និងសង់ក្រាបអនុគមន៍ស៊ីនុសគ្រឹះ',
    formula: 'y = 2\\sin(x)',
    formulaPlain: 'y = 2 sin(x)',
    derivative: 'y\' = 2 cos(x)',
    type: 'sine',
    amplitude: 2,
    omega: 1,
    phase: 0,
    verticalShift: 0,
    period: '2π',
    periodVal: Math.PI * 2,
    domain: [0, Math.PI * 2],
    f: (x) => 2 * Math.sin(x),
    df: (x) => 2 * Math.cos(x),
    keyPoints: [
      { x: 0, y: 0, label: '(0, 0)' },
      { x: Math.PI / 2, y: 2, label: 'Max(π/2, 2)' },
      { x: Math.PI, y: 0, label: '(π, 0)' },
      { x: 3 * Math.PI / 2, y: -2, label: 'Min(3π/2, -2)' },
      { x: 2 * Math.PI, y: 0, label: '(2π, 0)' }
    ],
    steps: [
      'ជំហានទី ១៖ ដែនកំណត់ D = ℝ, ខួប T = 2π/1 = 2π',
      'ជំហានទី ២៖ អំព្លីទុត A = 2, តម្លៃបរមា: Max = 2, Min = -2',
      'ជំហានទី ៣៖ ចលនាទាញចេញពីរង្វង់ត្រីកោណមាត្រ (Unit Circle Projection)',
      'ជំហានទី ៤៖ ចំណុចកាត់អ័ក្ស Ox: x = 0, π, 2π (ឫសនៃសមីការ sin x = 0)'
    ],
    explanation: 'ប្អូនស្រី តោ គីមឈី បង្ហាញពីរបៀបទាញរលកស៊ីនុសចេញពីចលនាវិលនៃរង្វង់ត្រីកោណមាត្រកាំ R = 2 ដោយបន្ទាត់ឡាស៊ែរផ្ដេកតភ្ជាប់ចំណុច P(cos θ, sin θ) ទៅកាន់ក្រាហ្វិកកូអរដោនេ Cartesian។'
  },
  {
    id: 'sreineang',
    studentName: 'ម៉ៅ ស្រីនាង',
    studentBadge: 'សិស្សឆ្នើមគណិតវិទ្យា SHINE',
    school: 'វិទ្យាស្ថានជាតិអប់រំ (SHINE)',
    photo: 'assets/images/students/student-1.jpg',
    exerciseTitle: 'លំហាត់ទី ២៖ សិក្សាអនុគមន៍កូស៊ីនុសប្រែប្រួលខួប',
    formula: 'y = 1.5\\cos(2x)',
    formulaPlain: 'y = 1.5 cos(2x)',
    derivative: 'y\' = -3 sin(2x)',
    type: 'cosine',
    amplitude: 1.5,
    omega: 2,
    phase: 0,
    verticalShift: 0,
    period: 'π',
    periodVal: Math.PI,
    domain: [0, Math.PI * 2],
    f: (x) => 1.5 * Math.cos(2 * x),
    df: (x) => -3 * Math.sin(2 * x),
    keyPoints: [
      { x: 0, y: 1.5, label: 'Max(0, 1.5)' },
      { x: Math.PI / 4, y: 0, label: '(π/4, 0)' },
      { x: Math.PI / 2, y: -1.5, label: 'Min(π/2, -1.5)' },
      { x: 3 * Math.PI / 4, y: 0, label: '(3π/4, 0)' },
      { x: Math.PI, y: 1.5, label: 'Max(π, 1.5)' }
    ],
    steps: [
      'ជំហានទី ១៖ ជីពចរ ω = 2 ⇒ ខួប T = 2π/2 = π (រលកកើនល្បឿនទ្វេដង)',
      'ជំហានទី ២៖ អំព្លីទុត A = 1.5, តម្លៃបរមា Max = 1.5, Min = -1.5',
      'ជំហានទី ៣៖ រង្វង់ត្រីកោណមាត្របង្វិលល្បឿន 2ω ធៀបនឹងរលកធម្មតា',
      'ជំហានទី ៤៖ អនុគមន៍គូ y(-x) = y(x) ស៊ីមេទ្រីធៀបនឹងអ័ក្ស Oy'
    ],
    explanation: 'ប្អូនស្រី ម៉ៅ ស្រីនាង បកស្រាយពីឥទ្ធិពលនៃមេគុណ ω = 2 ដែលបណ្តាលឱ្យរលកកូស៊ីនុសរួមខួបមកត្រឹម T = π ឯកតា ធ្វើឱ្យមាន ២ រលកពេញលេញក្នុងចន្លោះ [0, 2π]។'
  },
  {
    id: 'socheata',
    studentName: 'លឹម សុជាតា',
    studentBadge: 'សិស្សឆ្នើមគណិតវិទ្យា SHINE',
    school: 'វិទ្យាស្ថានជាតិអប់រំ (SHINE)',
    photo: 'assets/images/students/student-2.jpg',
    exerciseTitle: 'លំហាត់ទី ៣៖ រលកត្រីកោណមាត្រផ្លាស់ទីផាស និងបម្លាស់ឈរ',
    formula: 'y = 2\\sin(x - \\frac{\\pi}{3}) + 1',
    formulaPlain: 'y = 2 sin(x - π/3) + 1',
    derivative: 'y\' = 2 cos(x - π/3)',
    type: 'phase_sine',
    amplitude: 2,
    omega: 1,
    phase: Math.PI / 3,
    verticalShift: 1,
    period: '2π',
    periodVal: Math.PI * 2,
    domain: [0, Math.PI * 2],
    f: (x) => 2 * Math.sin(x - Math.PI / 3) + 1,
    df: (x) => 2 * Math.cos(x - Math.PI / 3),
    keyPoints: [
      { x: Math.PI / 3, y: 1, label: '(π/3, 1)' },
      { x: 5 * Math.PI / 6, y: 3, label: 'Max(5π/6, 3)' },
      { x: 4 * Math.PI / 3, y: 1, label: '(4π/3, 1)' },
      { x: 11 * Math.PI / 6, y: -1, label: 'Min(11π/6, -1)' }
    ],
    steps: [
      'ជំហានទី ១៖ ខួប T = 2π, បន្ទាត់ស្នូលលំនឹង y = 1',
      'ជំហានទី ២៖ ផ្លាស់ទីផាស φ = +π/3 (រុញទៅស្តាំ 60°)',
      'ជំហានទី ៣៖ បម្លាស់បញ្ឈរ +1 (រុញឡើងលើ 1 ឯកតា)',
      'ជំហានទី ៤៖ តម្លៃអតិបរមា Max = 1 + 2 = 3, អប្បបរមា Min = 1 - 2 = -1'
    ],
    explanation: 'ប្អូនស្រី លឹម សុជាតា បង្ហាញការអនុវត្តការបំប្លែងក្រាហ្វិកពីរជាន់ (Phase Shift & Vertical Translation) យ៉ាងច្បាស់លាស់ ដោយមានបន្ទាត់ស្នូល y = 1 ជាអ័ក្សលំនឹងថ្មី។'
  },
  {
    id: 'chariya',
    studentName: 'ជា ចរិយា',
    studentBadge: 'សិស្សឆ្នើមគណិតវិទ្យា SHINE',
    school: 'វិទ្យាស្ថានជាតិអប់រំ (SHINE)',
    photo: 'assets/images/students/student-3.jpg',
    exerciseTitle: 'លំហាត់ទី ៤៖ ដោះស្រាយសមីការត្រីកោណមាត្រតាមក្រាហ្វិក',
    formula: '\\sin(x) = \\frac{\\sqrt{3}}{2} \\approx 0.866',
    formulaPlain: 'sin(x) = √3/2 ≈ 0.866',
    derivative: 'y\' = cos(x)',
    type: 'equation',
    amplitude: 1,
    omega: 1,
    phase: 0,
    verticalShift: 0,
    targetY: Math.sqrt(3) / 2,
    period: '2π',
    periodVal: Math.PI * 2,
    domain: [0, Math.PI * 2],
    f: (x) => Math.sin(x),
    df: (x) => Math.cos(x),
    keyPoints: [
      { x: Math.PI / 3, y: Math.sqrt(3) / 2, label: 'x₁ = π/3 (60°)' },
      { x: 2 * Math.PI / 3, y: Math.sqrt(3) / 2, label: 'x₂ = 2π/3 (120°)' }
    ],
    steps: [
      'ជំហានទី ១៖ គូសបន្ទាត់ផ្ដេក y = √3/2 ≈ 0.866 កាត់រលក y = sin(x)',
      'ជំហានទី ២៖ រកចំណុចប្រសព្វលើចន្លោះ [0, 2π] គឺ x₁ = π/3, x₂ = 2π/3',
      'ជំហានទី ៣៖ ផ្គូផ្គងជាមួយមុំលើរង្វង់ត្រីកោណមាត្រ 60° និង 120°',
      'ជំហានទី ៤៖ សំណុំចម្លើយទូទៅ: x = π/3 + 2kπ ∨ x = 2π/3 + 2kπ (k ∈ ℤ)'
    ],
    explanation: 'ប្អូនស្រី ជា ចរិយា ប្រើប្រាស់វិធីសាស្ត្រក្រាហ្វិកដើម្បីរកឫសនៃសមីការត្រីកោណមាត្រ ដោយបង្ហាញចំណុចប្រសព្វចាំងពន្លឺរវាងបន្ទាត់ផ្ដេក និងខ្សែកោងរលកស៊ីនុស។'
  },
  {
    id: 'piseth',
    studentName: 'ស៊ន ពិសិដ្ឋ',
    studentBadge: 'សិស្សឆ្នើមគណិតវិទ្យា SHINE',
    school: 'វិទ្យាស្ថានជាតិអប់រំ (SHINE)',
    photo: 'assets/images/students/student-4.jpg',
    exerciseTitle: 'លំហាត់ទី ៥៖ សិក្សាអនុគមន៍តង់សង់ និងអាស៊ីមតូតឈរ',
    formula: 'y = \\tan(x) = \\frac{\\sin(x)}{\\cos(x)}',
    formulaPlain: 'y = tan(x)',
    derivative: 'y\' = 1/cos²(x) > 0',
    type: 'tangent',
    amplitude: 1,
    omega: 1,
    phase: 0,
    verticalShift: 0,
    period: 'π',
    periodVal: Math.PI,
    domain: [-1.4, 1.4],
    f: (x) => Math.tan(x),
    df: (x) => 1 / Math.pow(Math.cos(x), 2),
    keyPoints: [
      { x: -Math.PI / 4, y: -1, label: '(-π/4, -1)' },
      { x: 0, y: 0, label: 'O(0, 0)' },
      { x: Math.PI / 4, y: 1, label: '(π/4, 1)' }
    ],
    steps: [
      'ជំហានទី ១៖ ដែនកំណត់ D = ℝ \\ {π/2 + kπ}, ខួប T = π',
      'ជំហានទី ២៖ អាស៊ីមតូតឈរ x = -π/2 និង x = π/2 (បន្ទាត់កាត់ឡាស៊ែរ)',
      'ជំហានទី ៣៖ ដេរីវេ y\' = 1/cos²x > 0 ⇒ អនុគមន៍កើនជានិច្ច',
      'ជំហានទី ៤៖ ខ្សែកោងរត់ពី -∞ ឆ្លងកាត់ O(0,0) ឡើងទៅរក +∞'
    ],
    explanation: 'ប្អូនប្រុស ស៊ន ពិសិដ្ឋ បង្ហាញភាពខុសគ្នារវាងអនុគមន៍តង់សង់ និងស៊ីនុស/កូស៊ីនុស ដោយគូសបញ្ជាក់ពីបន្ទាត់អាស៊ីមតូតឈរដែលក្រាហ្វិកមិនអាចប៉ះបានឡើយ។'
  },
  {
    id: 'rachana',
    studentName: 'ហេង រចនា',
    studentBadge: 'សិស្សឆ្នើមគណិតវិទ្យា SHINE',
    school: 'វិទ្យាស្ថានជាតិអប់រំ (SHINE)',
    photo: 'assets/images/students/student-5.jpg',
    exerciseTitle: 'លំហាត់ទី ៦៖ ផលបូករលកស៊ីនុស និងកូស៊ីនុស (Wave Superposition)',
    formula: 'y = \\sin(x) + \\cos(x) = \\sqrt{2}\\sin(x + \\frac{\\pi}{4})',
    formulaPlain: 'y = sin(x) + cos(x) = √2 sin(x + π/4)',
    derivative: 'y\' = cos(x) - sin(x)',
    type: 'superposition',
    amplitude: Math.SQRT2,
    omega: 1,
    phase: -Math.PI / 4,
    verticalShift: 0,
    period: '2π',
    periodVal: Math.PI * 2,
    domain: [0, Math.PI * 2],
    f: (x) => Math.sin(x) + Math.cos(x),
    df: (x) => Math.cos(x) - Math.sin(x),
    keyPoints: [
      { x: Math.PI / 4, y: Math.SQRT2, label: 'Max(π/4, √2)' },
      { x: 3 * Math.PI / 4, y: 0, label: '(3π/4, 0)' },
      { x: 5 * Math.PI / 4, y: -Math.SQRT2, label: 'Min(5π/4, -√2)' },
      { x: 7 * Math.PI / 4, y: 0, label: '(7π/4, 0)' }
    ],
    steps: [
      'ជំហានទី ១៖ បំប្លែងតាមរូបមន្ត a sin x + b cos x = √(a²+b²) sin(x + α)',
      'ជំហានទី ២៖ អំព្លីទុតថ្មី A = √(1² + 1²) = √2 ≈ 1.414, ផាស α = π/4',
      'ជំហានទី ៣៖ បង្ហាញរលកស៊ីនុស (ខៀវ) + រលកកូស៊ីនុស (ស្វាយ) បូកគ្នា',
      'ជំហានទី ៤៖ រលកបូកផ្សំថ្មី (មាស) មានអំព្លីទុតខ្ពស់ជាង និងខួប T = 2π'
    ],
    explanation: 'ប្អូនស្រី ហេង រចនា បង្ហាញពីបាតុភូត Superposition ដ៏ល្បីល្បាញក្នុងរូបវិទ្យានិងគណិតវិទ្យា ដោយរលកពីររួមគ្នាបង្កើតបានជារលកថ្មីមួយមានអំព្លីទុត A = √2 ដ៏អស្ចារ្យ។'
  }
];
