import { BUS_ROUTES } from '@/lib/content';
import { Photo } from '@/components/ui/Photo';
import { imgUrl } from '@/lib/images';

export const metadata = {
  title: 'Transport & bus routes',
  description:
    'School bus network of National High School, Bagodar — four routes: Bagodar local, Aura-Dama-Giridih, Dumri sector, Bishungarh. Pickup and drop timings issued term-wise.',
};

export default function TransportPage() {
  return (
    <>
      <header className="bg-paper border-b border-rule">
        <div className="max-w-edition mx-auto px-6 pt-12 pb-10">
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 md:col-span-8">
              <div className="eyebrow">Transport · बस सेवा</div>
              <h1 className="font-display text-4xl md:text-5xl text-ink mt-3 leading-[1.05]">
                Four routes. GPS-tracked.
              </h1>
              <p className="hindi-sub text-base text-slate-600 mt-3">
                चार मार्ग। GPS-सक्षम।
              </p>
              <p className="mt-4 text-slate-700 max-w-reading">
                Drivers and conductors are background-verified. Pickup and drop timings are issued term-wise to parents of registered students. New routes are added when a critical mass of families requests one.
              </p>
            </div>
            <div className="col-span-12 md:col-span-4">
              <div className="card-hair">
                <div className="eyebrow mb-2">Coverage area</div>
                <p className="text-sm text-slate-700">
                  Bagodar · Aura · Dama · Dumri · Giridih · Bishungarh · Suriya · Chapri · Kurhagarhi · Harladih
                </p>
                <a href="/admissions" className="btn-link mt-4">
                  Apply for transport →
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="border-b border-rule">
        <div className="max-w-edition mx-auto px-6 py-12 md:py-16">
          <Photo src={imgUrl('independence-day-rally-students-marching')} alt="Students in green uniforms marching down a village road during the Independence Day rally" ratio="21/9" />
        </div>
      </section>

      <section>
        <div className="max-w-edition mx-auto px-6 py-12 md:py-16">
          <h2 className="font-display text-2xl text-ink mb-6">Routes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-rule border border-rule">
            {BUS_ROUTES.map((r) => (
              <article key={r.name} className="bg-paper p-6">
                <header className="flex items-baseline justify-between gap-4 mb-3">
                  <h3 className="font-display text-xl text-ink">{r.name}</h3>
                  <span className="pill">{r.pickup} – {r.drop}</span>
                </header>
                <p className="hindi-sub text-sm text-slate-500">{r.nameHi}</p>
                <p className="text-sm text-slate-700 mt-3">{r.coverage}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-hair">
              <div className="eyebrow mb-2">Driver verification</div>
              <p className="text-sm text-slate-700">
                Background check, police verification, and a five-year clean driving record are minimum requirements.
              </p>
            </div>
            <div className="card-hair">
              <div className="eyebrow mb-2">Live tracking</div>
              <p className="text-sm text-slate-700">
                GPS units on every bus; parents receive a link with the route map at the start of each term.
              </p>
            </div>
            <div className="card-hair">
              <div className="eyebrow mb-2">Bus fee</div>
              <p className="text-sm text-slate-700">
                Term-wise, distance-tiered. Waived for orphan children along with tuition, books, and uniform.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}