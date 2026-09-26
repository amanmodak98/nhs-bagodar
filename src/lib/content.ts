/**
 * Institutional content for National High School, Bagodar.
 * Single source of truth — referenced from public pages and admin previews.
 */

export const SCHOOL = {
  name: 'National High School',
  shortName: 'N.H.S.',
  hindiName: 'राष्ट्रीय उच्च विद्यालय',
  tagline: {
    en: 'A school built on one promise.',
    hi: 'एक वादे पर बनी विद्यालय।',
  },
  location: 'Main Road, Dama, Aoura (Aura), Bagodar',
  district: 'Giridih',
  state: 'Jharkhand',
  pincode: '815322',
  established: 2021,
  establishedDate: '14 April 2021',
  // No CBSE affiliation number — school is JAC-affiliated, CBSE-pattern curriculum.
  // Verified via SARAS 7.0 search Sep 2026: no entry for "National High School, Bagodar".
  // When CBSE affiliation is granted, fill in here.
  affiliation: 'JAC (Jharkhand Academic Council) · CBSE Pattern Curriculum',
  affiliationStatus: 'JAC-affiliated since 2021 · CBSE Pattern adopted · SARAS application under preparation',
  udise: 'Pending',
  medium: 'English Medium',
  levels: 'Nursery to Class 10',
  coEducation: true,
  hostel: true,
  buses: true,
  motto: {
    english: 'Lead us from darkness to light',
    sanskrit: 'Tamaso Ma Jyotirgamaya',
    hindi: 'अंधकार से प्रकाश की ओर ले चलो',
  },
  phones: ['+91 8298354655', '+91 7903048162'],
  whatsapp: '+91 8298354655',
  email: 'office@nhsbagodar.in',
  hours: {
    office: 'Mon–Sat, 08:00–16:30 IST',
    admissions: 'Mon–Sat, 09:00–15:00 IST',
  },
} as const;

/* ----------------------------- Shlokas / Quotes ----------------------------- */

export const SHLOKAS = [
  { sanskrit: 'तमसो मा ज्योतिर्गमय', hindi: 'अंधकार से प्रकाश की ओर ले चलो', english: 'Lead us from darkness to light', source: 'Brihadaranyaka Upanishad 1.3.28' },
  { sanskrit: 'सत्यं शिवं सुन्दरम्', hindi: 'सत्य है शिव है सुन्दर है', english: 'Truth is auspicious, truth is beautiful', source: 'Vedic tradition' },
  { sanskrit: 'विद्या ददाति विनयम्', hindi: 'विद्या विनय देती है', english: 'Knowledge gives humility', source: 'Hitopadesha' },
  { sanskrit: 'सर्वे भवन्तु सुखिनः', hindi: 'सब सुखी हों', english: 'May all be happy', source: 'Taittiriya Upanishad' },
  { sanskrit: 'अहिंसा परमो धर्मः', hindi: 'अहिंसा परम धर्म है', english: 'Non-violence is the highest duty', source: 'Mahabharata 18.5.46' },
] as const;

export const ANNOUNCEMENTS = [
  'Admissions 2026–27 — प्रवेश हेतु सम्पर्क करें',
  '100% free education for orphan children · अनाथ बच्चों के लिए निःशुल्क शिक्षा',
  'Syllabus completion guarantee · पाठ्यक्रम पूर्ण होने की गारंटी',
  'New hostel batch intake for Classes 6–10 · कक्षा 6–10 के लिए छात्रावास में स्थान उपलब्ध',
  'Parent–Teacher Meeting, Saturday 26 September · अभिभावक-शिक्षक बैठक',
] as const;

/* ------------------------------ Statistics ------------------------------ */
/** Live counter targets — animated on the home page from 0 to the target. */

export const COUNTERS = [
  { value: 47, suffix: '', label: 'Founding students', detail: 'on 14 April 2021' },
  { value: 480, suffix: '+', label: 'Students enrolled', detail: 'Nursery to Class 10' },
  { value: 14, suffix: '', label: 'Teaching faculty', detail: 'Average 12 yrs experience' },
  { value: 6, suffix: '', label: 'Smart classrooms', detail: 'Each equipped with audio' },
  { value: 100, suffix: '%', label: 'Syllabus completion', detail: 'guaranteed before exam' },
  { value: 100, suffix: '%', label: 'Free for orphans', detail: 'tuition + books + bus' },
  { value: 35, suffix: '', label: 'Class size cap', detail: 'every section, every class' },
  { value: 4, suffix: '', label: 'Bus routes', detail: 'Bagodar · Aura · Dumri · Giridih' },
] as const;

// FACILITIES is intentionally NOT exported from content.ts — facilities
// are managed exclusively via /admin/facilities and served by the data layer
// in lib/db.ts + the public /api/facilities route.
// See components/admin/FacilityManager.tsx and components/site/FacilitiesList.tsx.

/* -------------------------------- Programs ------------------------------- */

export const PROGRAMS = [
  {
    stage: 'Foundational',
    stageHi: 'बुनियादी',
    classes: 'Nursery · LKG · UKG',
    classesHi: 'नर्सरी · एलकेजी · यूकेजी',
    description:
      'Phonics-first English, hand-grip development, story-based numeracy. No written tests — only continuous observation reports to parents.',
  },
  {
    stage: 'Primary',
    stageHi: 'प्राथमिक',
    classes: 'Class 1 to 5',
    classesHi: 'कक्षा 1 से 5',
    description:
      'Concept-oriented learning in English, Hindi, Mathematics, EVS. Basic computer familiarity from Class 3. Remedial support is built into the timetable.',
  },
  {
    stage: 'Middle',
    stageHi: 'माध्यमिक',
    classes: 'Class 6 to 8',
    classesHi: 'कक्षा 6 से 8',
    description:
      'Subject teachers for Science, Social Science, Mathematics, English, Hindi, Sanskrit. Remedial classes held twice a week for students who fall behind.',
  },
  {
    stage: 'Secondary',
    stageHi: 'उच्च प्राथमिक',
    classes: 'Class 9 to 10',
    classesHi: 'कक्षा 9 से 10',
    description:
      'Board-oriented preparation following CBSE / JAC patterns. Guaranteed timely syllabus completion. Special doubt-clearing classes held on Saturdays.',
  },
] as const;

/* -------------------------------- Principal ------------------------------- */

// PRINCIPAL is intentionally NOT exported from content.ts — principal
// details and quotes are managed exclusively via /admin/principal and
// served by the data layer in lib/db.ts + the public /api/principal route.
// See components/admin/PrincipalManager.tsx and components/site/PrincipalSpotlight.tsx.

/* ------------------------------- Scholarships ----------------------------- */

export const SCHOLARSHIPS = [
  {
    title: 'Free Education for Orphan Children',
    titleHi: 'अनाथ बच्चों के लिए निःशुल्क शिक्षा',
    detail:
      'Tuition, books, uniform, and bus fee fully waived. Apply with certificate from Block Development Officer.',
    detailHi: 'शिक्षा शुल्क, पुस्तकें, वर्दी और बस शुल्क पूर्णतः माफ। बीडीओ प्रमाण-पत्र के साथ आवेदन करें।',
  },
  {
    title: 'Merit Scholarship, Class 10',
    titleHi: 'मेरिट छात्रवृत्ति, कक्षा 10',
    detail:
      'Awarded to top three students of Class 9 based on annual exam rank. Covers tuition for Class 10.',
    detailHi: 'वार्षिक परीक्षा में कक्षा 9 के शीर्ष तीन छात्रों को प्रदान। कक्षा 10 के शिक्षा शुल्क की छूट।',
  },
  {
    title: 'Sibling Discount',
    titleHi: 'बहन-भाई छूट',
    detail:
      '10% tuition concession for the second child enrolled from the same family.',
    detailHi: 'एक ही परिवार से दूसरे बच्चे के नामांकन पर 10% शिक्षा शुल्क में छूट।',
  },
  {
    title: 'Single-Parent Concession',
    titleHi: 'एकल-अभिभावक छूट',
    detail:
      'Half tuition concession with valid documentation. Subject to Principal approval.',
    detailHi: 'वैध दस्तावेज के साथ आधा शिक्षा शुल्क माफ। प्रधानाचार्य की स्वीकृति आवश्यक।',
  },
] as const;

/* ------------------------------- Commitments ----------------------------- */

export const COMMITMENTS = [
  { label: 'Estd.', value: '2021', detail: 'Founded on 14 April 2021' },
  { label: 'Syllabus', value: 'On time', detail: 'Guaranteed completion before final exam' },
  { label: 'Orphan students', value: '100% free', detail: 'Tuition, books, uniform, bus' },
  { label: 'Class size', value: '≤ 35', detail: 'Cap per section in every class' },
] as const;

/* -------------------------------- Timeline ------------------------------- */

export const TIMELINE = [
  { year: '2021', event: 'School founded on 14 April with 47 students across Classes 1–5', eventHi: '14 अप्रैल को 47 छात्रों के साथ कक्षा 1–5 में विद्यालय की स्थापना' },
  { year: '2022', event: 'Middle school (Classes 6–8) opened; computer lab commissioned', eventHi: 'माध्यमिक विद्यालय (कक्षा 6–8) प्रारंभ; कंप्यूटर प्रयोगशाला का उद्घाटन' },
  { year: '2023', event: 'Boys and girls hostel block opened; first Independence Day rally', eventHi: 'छात्र-छात्राओं के छात्रावास का उद्घाटन; प्रथम स्वतंत्रता दिवस रैली' },
  { year: '2024', event: 'Class 9 and 10 launched; remedial-class timetable introduced', eventHi: 'कक्षा 9 और 10 का आरम्भ; उपचारात्मक कक्षा कार्यक्रम' },
  { year: '2025', event: 'Annual Day cultural program with 200+ students on stage', eventHi: 'वार्षिक उत्सव — 200 से अधिक छात्रों का सांस्कृतिक कार्यक्रम' },
  { year: '2026', event: 'Foundational block (Nursery, LKG, UKG) launched', eventHi: 'बुनियादी स्तर (नर्सरी, एलकेजी, यूकेजी) का आरम्भ' },
] as const;

/* ---------------------------- Academic Calendar -------------------------- */

export const CALENDAR = {
  termI: { start: '01 April 2026', end: '30 September 2026' },
  halfYearly: { start: '14 October 2026', end: '22 October 2026' },
  diwaliBreak: { start: '08 November 2026', end: '14 November 2026' },
  termII: { start: '15 November 2026', end: '31 March 2027' },
  annualExam: { start: '20 February 2027', end: '10 March 2027' },
  resultDay: '20 March 2027',
  majorHolidays: [
    { date: '15 August 2026', name: 'Independence Day · स्वतंत्रता दिवस' },
    { date: '02 October 2026', name: 'Gandhi Jayanti · गांधी जयंती' },
    { date: '08 November 2026', name: 'Diwali · दीपावली' },
    { date: '26 January 2027', name: 'Republic Day · गणतंत्र दिवस' },
    { date: '14 April 2027', name: 'Dr. Ambedkar Jayanti · अंबेडकर जयंती' },
  ],
} as const;

/* ----------------------------------- FAQ ------------------------------- */

export const FAQ = [
  {
    q: 'What is the admission procedure for 2026–27?',
    qHi: '2026–27 के लिए प्रवेश प्रक्रिया क्या है?',
    a: 'Walk in to the office any weekday between 09:00 and 15:00. Bring two photographs of the child, Aadhaar card of either parent, and the birth certificate. There is no application fee this month.',
    aHi: 'किसी भी कार्यदिवस सुबह 09:00 से दोपहर 03:00 के बीच कार्यालय में आएं। बच्चे की दो तस्वीरें, माता या पिता का आधार कार्ड, और जन्म प्रमाण-पत्र लाएं। इस माह कोई आवेदन शुल्क नहीं है।',
  },
  {
    q: 'Is there an entrance test?',
    qHi: 'क्या प्रवेश परीक्षा है?',
    a: 'No entrance test. For Nursery and LKG, we hold a short informal interaction with the child and parent. For Classes 1 and above, admission is based on availability.',
    aHi: 'कोई प्रवेश परीक्षा नहीं। नर्सरी और एलकेजी के लिए बच्चे और अभिभावक के साथ एक अनौपचारिक संवाद होता है। कक्षा 1 और उसके बाद के लिए प्रवेश उपलब्धता पर निर्भर है।',
  },
  {
    q: 'What is the monthly fee?',
    qHi: 'मासिक शुल्क कितना है?',
    a: 'Monthly tuition is among the lowest in the Giridih district. Exact figures vary by class; pick up the printed fee structure from the office or download it from the Public Disclosure page.',
    aHi: 'मासिक शिक्षा शुल्क गिरिडीह जिले में सबसे कम में से है। सटीक राशि कक्षा अनुसार भिन्न होती है; कार्यालय से मुद्रित शुल्क-संरचना लें या सार्वजनिक प्रकटीकरण पृष्ठ से डाउनलोड करें।',
  },
  {
    q: 'How does the free education for orphan children work?',
    qHi: 'अनाथ बच्चों के लिए निःशुल्क शिक्षा कैसे काम करती है?',
    a: 'Bring a certificate from the Block Development Officer identifying the child as an orphan. The office waives tuition, books, uniform, and bus fee fully — no quota, no lottery. The certificate is verified with the issuing authority within seven days.',
    aHi: 'बच्चे को अनाथ प्रमाणित करने वाला बीडीओ प्रमाण-पत्र लाएं। कार्यालय शिक्षा शुल्क, पुस्तकें, वर्दी और बस शुल्क पूर्णतः माफ कर देता है — कोई कोटा नहीं। प्रमाण-पत्र सात दिनों के भीतर सत्यापित किया जाता है।',
  },
  {
    q: 'Is hostel available for younger students?',
    qHi: 'क्या छोटे छात्रों के लिए छात्रावास उपलब्ध है?',
    a: 'Yes, from Class 3 onwards, subject to availability and a short interview. The hostel has separate wings for boys and girls, with a warden on each side, study hours from 19:00 to 21:00, and weekend leave on application.',
    aHi: 'हाँ, कक्षा 3 से, उपलब्धता और संक्षिप्त साक्षात्कार के अधीन। छात्रावास में अलग-अलग छात्र और छात्राओं के लिए अलग-अलग भाग हैं, प्रत्येक तरफ वार्डन, 19:00–21:00 तक अध्ययन समय, और आवेदन पर सप्ताहांत अवकाश।',
  },
  {
    q: 'Which syllabus does the school follow?',
    qHi: 'विद्यालय किस पाठ्यक्रम का अनुसरण करता है?',
    a: 'JAC (Jharkhand Academic Council) is the examining body. The school adopts the CBSE-pattern curriculum — NCERT textbooks for Mathematics, Science, and Social Science; structured continuous assessment; and the same subject sequencing as CBSE schools.',
    aHi: 'परीक्षा निकाय जेएसी (झारखंड अकादमिक परिषद) है। विद्यालय सीबीएसई-पैटर्न पाठ्यक्रम अपनाता है — गणित, विज्ञान और सामाजिक विज्ञान के लिए NCERT पुस्तकें; संरचित सतत् मूल्यांकन।',
  },
  {
    q: 'What are the school bus routes?',
    qHi: 'विद्यालय की बस मार्ग कौन-से हैं?',
    a: 'Currently four routes: Bagodar local, Aura-Dama-Giridih, Dumri sector, and Bishungarh. Pickup and drop timings are issued term-wise. Drivers and conductors are background-verified.',
    aHi: 'वर्तमान में चार मार्ग: बागोदर स्थानीय, औरा-डामा-गिरिडीह, डुमरी क्षेत्र, और बिशुनगढ़। पिकअप व ड्रॉप समय सत्र अनुसार जारी होते हैं।',
  },
  {
    q: 'When does the academic year start?',
    qHi: 'शैक्षिक वर्ष कब शुरू होता है?',
    a: 'Term I begins on 1 April every year. New admissions for Foundational and Primary classes are accepted between February and March.',
    aHi: 'प्रथम सत्र प्रत्येक वर्ष 1 अप्रैल को प्रारंभ होता है। बुनियादी और प्राथमिक कक्षाओं के नए प्रवेश फरवरी से मार्च के बीच स्वीकार किए जाते हैं।',
  },
] as const;

/* ------------------------------ Bus Routes ------------------------------- */

export const BUS_ROUTES = [
  { name: 'Bagodar Local', nameHi: 'बागोदर स्थानीय', coverage: 'Bagodar town, weekly market, bus stand area', pickup: '07:00', drop: '15:30' },
  { name: 'Aura–Dama–Giridih', nameHi: 'औरा–डामा–गिरिडीह', coverage: 'Aura, Dama, Mohanpur, Giridih town', pickup: '06:30', drop: '16:00' },
  { name: 'Dumri Sector', nameHi: 'डुमरी क्षेत्र', coverage: 'Dumri, Suriya, Chapri', pickup: '06:45', drop: '15:45' },
  { name: 'Bishungarh', nameHi: 'बिशुनगढ़', coverage: 'Bishungarh, Kurhagarhi, Harladih', pickup: '06:30', drop: '16:00' },
] as const;

/* ------------------------------- Testimonials ---------------------------- */

export const TESTIMONIALS = [
  {
    quote: 'My son failed Maths in Class 5 at his old school. After one term here, he is doing well. The remedial classes made the difference.',
    quoteHi: 'मेरे बेटे ने पुराने विद्यालय में कक्षा 5 में गणित में असफलता पाई थी। यहाँ एक सत्र के बाद उसकी प्रगति अच्छी है। उपचारात्मक कक्षाओं ने फर्क लाया।',
    parent: 'Mother of a Class 7 student',
    location: 'Dama village',
  },
  {
    quote: 'I run a small shop in Bagodar. The school bus picks up my daughter at 7:15 sharp. I never worry about her commute.',
    quoteHi: 'मैं बागोदर में एक छोटी दुकान चलाता हूँ। विद्यालय की बस सुबह 7:15 बजे मेरी बेटी को ले आती है। मुझे उसके आने-जाने की कोई चिंता नहीं रहती।',
    parent: 'Father of a Class 3 student',
    location: 'Bagodar town',
  },
  {
    quote: 'The fees are honest and the school office explains every rupee. That is rare.',
    quoteHi: 'शुल्क ईमानदार है और कार्यालय हर रुपये की व्याख्या करता है। यह दुर्लभ है।',
    parent: 'Guardian, Class 9',
    location: 'Aura village',
  },
] as const;

/* ----------------------------- Public notices --------------------------- */

export const PUBLIC_NOTICES_SAMPLE = [
  {
    id: 'notice-1',
    title: 'Admissions 2026–27 — Free this month',
    titleHi: 'प्रवेश 2026–27 — इस माह निःशुल्क',
    date: '12 Sep 2026',
    tag: 'Admissions',
  },
  {
    id: 'notice-2',
    title: 'Half-yearly exam date-sheet released, Classes 9–10',
    titleHi: 'अर्ध-वार्षिक परीक्षा तिथि-पत्र जारी, कक्षा 9–10',
    date: '15 Sep 2026',
    tag: 'Examination',
  },
  {
    id: 'notice-3',
    title: 'PTM, Saturday 26 September 2026',
    titleHi: 'अभिभावक-शिक्षक बैठक, शनिवार 26 सितंबर',
    date: '10 Sep 2026',
    tag: 'Event',
  },
  {
    id: 'notice-4',
    title: 'New bus route — Dumri sector',
    titleHi: 'नई बस मार्ग — डुमरी क्षेत्र',
    date: '05 Sep 2026',
    tag: 'Transport',
  },
] as const;