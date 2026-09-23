export const metadata = {
  title: 'Syllabus by class',
  description:
    'NCERT and JAC syllabus reference for National High School, Bagodar — classes 1 through 10 with subject-wise topic list.',
};

const SYLLABUS = [
  {
    cls: 'Class 1',
    clsHi: 'कक्षा 1',
    subjects: [
      { name: 'English', topics: ['Phonics (a–z)', 'Three-letter words', 'Listening & speaking', 'Simple picture composition'] },
      { name: 'Hindi', topics: ['देवनागरी वर्णमाला', 'मात्रा परिचय', 'चित्र वर्णन', 'सरल गीत'] },
      { name: 'Mathematics', topics: ['Numbers 1–100', 'Addition & subtraction', 'Shapes', 'Measurement (length, weight)'] },
      { name: 'EVS', topics: ['My family', 'Plants & animals', 'Water & air', 'Festivals of India'] },
    ],
  },
  {
    cls: 'Class 5',
    clsHi: 'कक्षा 5',
    subjects: [
      { name: 'English', topics: ['Reading comprehension', 'Paragraph writing', 'Grammar: tenses, articles, prepositions'] },
      { name: 'Hindi', topics: ['पाठ-पठन', 'निबंध-लेखन', 'व्याकरण: संज्ञा, सर्वनाम, क्रिया'] },
      { name: 'Mathematics', topics: ['Fractions & decimals', 'Geometry (angles, triangles)', 'Profit & loss introduction'] },
      { name: 'Science', topics: ['Matter & materials', 'Living world', 'Force & motion basics'] },
      { name: 'Social Science', topics: ['Indian geography', 'Mughal empire', 'Indian Constitution introduction'] },
    ],
  },
  {
    cls: 'Class 8',
    clsHi: 'कक्षा 8',
    subjects: [
      { name: 'English', topics: ['Comprehension & essay', 'Letter writing (formal, informal)', 'Tenses mastery'] },
      { name: 'Hindi', topics: ['पद्य-गद्य संकलन', 'संवाद-लेखन', 'अपठित गद्यांश'] },
      { name: 'Mathematics', topics: ['Linear equations in two variables', 'Mensuration', 'Factorisation', 'Statistics'] },
      { name: 'Science', topics: ['Cell biology', 'Force & pressure', 'Light & sound', 'Pollution & ecosystems'] },
      { name: 'Social Science', topics: ['Modern Indian history', 'Indian Parliament', 'Resources & development'] },
    ],
  },
  {
    cls: 'Class 10',
    clsHi: 'कक्षा 10',
    subjects: [
      { name: 'English', topics: ['Literature: prose & poetry', 'Formal letter, article, report writing', 'Grammar revision for board exam'] },
      { name: 'Hindi', topics: ['पाठ्यपुस्तक', 'लेखन-कौशल', 'व्याकरण अभ्यास'] },
      { name: 'Mathematics', topics: ['Algebra, trigonometry, geometry', 'Statistics & probability', 'Coordinate geometry, mensuration'] },
      { name: 'Science', topics: ['Physics: light, electricity, energy', 'Chemistry: acids, metals, carbon compounds', 'Biology: heredity, evolution, environment'] },
      { name: 'Social Science', topics: ['Nationalism in India', 'Resources, federalism, democracy', 'Economics, geography, disaster management'] },
    ],
  },
];

export default function SyllabusPage() {
  return (
    <>
      <header className="bg-paper border-b border-rule">
        <div className="max-w-edition mx-auto px-6 pt-12 pb-10">
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 md:col-span-8">
              <div className="eyebrow">Syllabus · पाठ्यक्रम</div>
              <h1 className="font-display text-4xl md:text-5xl text-ink mt-3 leading-[1.05]">
                Syllabus by class.
              </h1>
              <p className="hindi-sub text-base text-slate-600 mt-3">
                कक्षा अनुसार पाठ्यक्रम — NCERT / JAC pattern
              </p>
              <p className="mt-4 text-slate-700 max-w-reading">
                The school adopts the CBSE pattern with NCERT textbooks as the primary reference and JAC-aligned examination. Topic lists below are indicative — see the class teacher for the term's full plan.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section>
        <div className="max-w-edition mx-auto px-6 py-12 md:py-16 space-y-12">
          {SYLLABUS.map((s) => (
            <article key={s.cls} className="grid grid-cols-12 gap-6 md:gap-10">
              <header className="col-span-12 md:col-span-3">
                <div className="font-display text-3xl text-amber-600 leading-none">{s.cls}</div>
                <p className="hindi-sub text-sm text-slate-500 mt-1">{s.clsHi}</p>
              </header>
              <div className="col-span-12 md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-px bg-rule border border-rule">
                {s.subjects.map((sub) => (
                  <div key={sub.name} className="bg-paper p-5">
                    <h3 className="font-display text-base text-ink">{sub.name}</h3>
                    <ul className="mt-2 space-y-1 text-sm text-slate-700 list-disc list-inside">
                      {sub.topics.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}