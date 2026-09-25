import { FacultyDirectory } from '@/components/site/FacultyDirectory';

export const metadata = {
  title: 'Faculty directory',
  description:
    'Faculty directory at National High School, Bagodar — Principal, Vice Principal, Senior Teachers, PRT, TGT, PGT, Computer Instructor, Hostel Warden.',
};

export default function FacultyPage() {
  return (
    <>
      <header className="bg-paper border-b border-rule">
        <div className="max-w-edition mx-auto px-6 pt-12 pb-10">
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 md:col-span-8">
              <div className="eyebrow">Faculty · शिक्षक वर्ग</div>
              <h1 className="font-display text-4xl md:text-5xl text-ink mt-3 leading-[1.05]">
                Who teaches here.
              </h1>
              <p className="hindi-sub text-base text-slate-600 mt-3">
                हमारे शिक्षक वर्ग
              </p>
              <p className="mt-5 text-slate-700 max-w-reading">
                Teaching and administrative staff at {new Date().getFullYear()}. Names,
                qualifications, and joining year are published below. Updated term-wise via
                the admin panel.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section>
        <div className="max-w-edition mx-auto px-6 py-12">
          <FacultyDirectory />
          <p className="text-xs text-slate-500 mt-4">
            <strong>Note.</strong> Faculty data is published per CBSE Affiliation Bye-Laws §3.1.
            Photographs are uploaded by the admin team.
          </p>
        </div>
      </section>
    </>
  );
}
