import { Photo } from '@/components/ui/Photo';
import { imgUrl } from '@/lib/images';

export const metadata = {
  title: 'Virtual tour',
  description:
    'A walk through National High School, Bagodar — assembly ground, classrooms, hostel, library, computer lab.',
};

const ROOMS = [
  { id: 'assembly', name: 'Assembly Ground', nameHi: 'सभा मैदान', caption: 'Morning assembly, parade practice, Independence Day and Republic Day ceremonies. Open ground with flagpole at the centre.' },
  { id: 'classroom', name: 'Smart Classroom', nameHi: 'स्मार्ट कक्षा', caption: 'Each classroom equipped with smart display, audio system, internet access, and seating for up to 35 students.' },
  { id: 'computer-lab', name: 'Computer Laboratory', nameHi: 'कंप्यूटर प्रयोगशाला', caption: 'Dedicated lab with broadband internet. Used from Class 3 onwards for typing, file handling, and online research.' },
  { id: 'library', name: 'Reading Room & Library', nameHi: 'पुस्तकालय एवं वाचनालय', caption: 'Bilingual collection of NCERT and JAC textbooks, picture books, newspapers, and reference material. Open during school hours.' },
  { id: 'hostel', name: 'Hostel — Boys Wing', nameHi: 'छात्रावास — छात्र', caption: 'Supervised dormitory with warden quarters, study hall, and separate dining. Available from Class 3 on application.' },
  { id: 'office', name: 'Office & Reception', nameHi: 'कार्यालय', caption: 'Single front-desk with principal cabin attached. Where every enquiry, fee, and admission begins.' },
];

const IMAGES = [
  { room: 'assembly',   src: 'independence-day-rally-wide-shot-01' },
  { room: 'assembly',   src: 'flag-hoisting-ceremony-flag-rising-01' },
  { room: 'classroom',  src: 'annual-function-stage-boy-mic-orange-shirt-01' },
  { room: 'classroom',  src: 'annual-function-stage-boy-green-uniform-mic-01' },
  { room: 'classroom',  src: 'student-speech-girl-green-uniform' },
  { room: 'computer-lab', src: 'student-speech-girl-plaid-uniform' },
  { room: 'library',    src: 'student-with-flag-portrait-young-boy' },
  { room: 'hostel',     src: 'independence-day-school-girls-portrait' },
  { room: 'hostel',     src: 'annual-function-audience-students-seated-canopy-wide' },
  { room: 'office',     src: 'chief-guest-welcome-bouquet-presentation' },
];

export default function VirtualTourPage() {
  return (
    <>
      <header className="bg-paper border-b border-rule">
        <div className="max-w-edition mx-auto px-6 pt-12 pb-10">
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 md:col-span-8">
              <div className="eyebrow">Virtual tour · आभासी भ्रमण</div>
              <h1 className="font-display text-4xl md:text-5xl text-ink mt-3 leading-[1.05]">
                A walk through the school.
              </h1>
              <p className="hindi-sub text-base text-slate-600 mt-3">
                विद्यालय की सैर
              </p>
              <p className="mt-4 text-slate-700 max-w-reading">
                Six rooms, in order: assembly ground, smart classroom, computer lab, library, hostel wing, and the office. Photographs from real school days, not stock images.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section>
        <div className="max-w-edition mx-auto px-6 py-12 md:py-16 space-y-20">
          {ROOMS.map((room) => {
            const roomImgs = IMAGES.filter((i) => i.room === room.id);
            return (
              <article key={room.id} id={room.id} className="grid grid-cols-12 gap-8 scroll-mt-20">
                <header className="col-span-12 md:col-span-4">
                  <div className="rule-accent mb-4" />
                  <div className="eyebrow">{room.name}</div>
                  <h2 className="font-display text-2xl text-ink mt-3">{room.name}</h2>
                  <p className="hindi-sub text-sm text-slate-500 mt-1">{room.nameHi}</p>
                  <p className="text-sm text-slate-700 mt-4 leading-relaxed">{room.caption}</p>
                </header>
                <div className="col-span-12 md:col-span-8 grid grid-cols-2 gap-3 md:gap-4">
                  {roomImgs.map((i, idx) => (
                    <Photo key={i.src + idx} src={imgUrl(i.src)} alt={`${room.name} photograph ${idx + 1}`} ratio={idx === 0 ? '4/3' : '4/5'} />
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}