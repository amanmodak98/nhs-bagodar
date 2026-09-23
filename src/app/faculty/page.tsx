import { listFacultyClient } from '@/lib/faculty-client';

export const metadata = {
  title: 'Faculty directory',
  description:
    'Faculty directory at National High School, Bagodar — Principal, Vice Principal, Senior Teachers, PRT, TGT, PGT, Computer Instructor, Hostel Warden.',
};

function fmtYear(y?: number) {
  if (!y) return '';
  return `${y}`;
}

export default async function FacultyPage() {
  // Fetch via the same endpoint the admin uses; on static export this runs at build time
  const faculty = await listFacultyClient().catch(() => []);

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
                हमारे शिक्षक वर्ग — {faculty.length} सदस्य
              </p>
              <p className="mt-5 text-slate-700 max-w-reading">
                {faculty.length} teaching and administrative staff at {new Date().getFullYear()}. Names, qualifications, and joining year are published below. Updated term-wise.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section>
        <div className="max-w-edition mx-auto px-6 py-12">
          {faculty.length === 0 ? (
            <p className="border border-rule p-8 text-center text-slate-500 italic font-display">
              Faculty list not available right now. The admin team is updating records.
            </p>
          ) : (
            <div className="border-y-2 border-ink overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ink">
                    <th className="text-left py-3 pr-4 font-display text-xs uppercase tracking-institutional text-amber-600 w-24">Photo</th>
                    <th className="text-left py-3 pr-4 font-display text-xs uppercase tracking-institutional text-ink">Name</th>
                    <th className="text-left py-3 pr-4 font-display text-xs uppercase tracking-institutional text-ink hidden md:table-cell">Designation</th>
                    <th className="text-left py-3 pr-4 font-display text-xs uppercase tracking-institutional text-ink hidden md:table-cell">Qualification</th>
                    <th className="text-left py-3 pr-4 font-display text-xs uppercase tracking-institutional text-ink hidden md:table-cell">Subject</th>
                    <th className="text-left py-3 pr-4 font-display text-xs uppercase tracking-institutional text-ink hidden lg:table-cell">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {faculty.map((f: { id: number; name: string; imageUrl?: string; designation?: string; qualification?: string; subject?: string; joinedYear?: number }) => (
                    <tr key={f.id} className="border-b border-rule-soft">
                      <td className="py-3 pr-4 w-24">
                        {f.imageUrl ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={f.imageUrl}
                            alt={f.name}
                            width={64}
                            height={64}
                            className="w-16 h-16 object-cover rounded-full bg-sand-100"
                            loading="lazy"
                          />
                        ) : (
                          <div
                            className="w-16 h-16 rounded-full bg-sand-100 flex items-center justify-center text-amber-600 font-display text-lg"
                            aria-hidden
                          >
                            {initials(f.name)}
                          </div>
                        )}
                      </td>
                      <td className="py-3 pr-4 text-ink font-medium">{f.name}</td>
                      <td className="py-3 pr-4 text-slate-700 hidden md:table-cell">{f.designation}</td>
                      <td className="py-3 pr-4 text-slate-600 hidden md:table-cell">{f.qualification}</td>
                      <td className="py-3 pr-4 text-slate-600 hidden md:table-cell">{f.subject}</td>
                      <td className="py-3 pr-4 text-slate-600 hidden lg:table-cell font-mono">{fmtYear(f.joinedYear)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="text-xs text-slate-500 mt-4">
            <strong>Note.</strong> Faculty data is published per CBSE Affiliation Bye-Laws §3.1. Photographs are uploaded by the admin team.
          </p>
        </div>
      </section>
    </>
  );
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}