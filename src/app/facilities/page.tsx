import { FACILITIES } from '@/lib/content';
import { Photo } from '@/components/ui/Photo';
import { imgUrl } from '@/lib/images';

export const metadata = {
  title: 'Facilities',
  description:
    'Six facilities on one campus — smart digital classrooms, computer lab, separate boys and girls hostel, school bus network, library, and sports ground.',
};

export default function FacilitiesPage() {
  return (
    <>
      <header className="bg-paper border-b border-rule">
        <div className="max-w-edition mx-auto px-6 pt-12 pb-10">
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 md:col-span-8">
              <div className="eyebrow">Facilities</div>
              <h1 className="font-display text-4xl md:text-5xl text-ink mt-3 leading-[1.05]">
                Six things. Done properly.
              </h1>
              <p className="mt-5 text-lg text-slate-700 max-w-reading">
                Schools love to list twenty facilities. We have six. Each is in daily use and has been since the date noted below.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="border-b border-rule">
        <div className="max-w-edition mx-auto px-6 py-16 md:py-22 space-y-16">
          {FACILITIES.map((f, i) => {
            const flip = i % 2 === 1;
            return (
              <article
                key={f.id}
                className="grid grid-cols-12 gap-6 md:gap-10 items-center"
              >
                <div className={'col-span-12 md:col-span-6 ' + (flip ? 'md:order-2' : '')}>
                  <div className="text-xs uppercase tracking-institutional text-amber-600 font-semibold">
                    Facility {String(i + 1).padStart(2, '0')}
                  </div>
                  <h2 className="font-display text-3xl text-ink mt-2">{f.name}</h2>
                  <p className="mt-4 text-slate-700 leading-relaxed max-w-reading">{f.description}</p>
                  <div className="mt-4 text-xs uppercase tracking-institutional text-slate-500">
                    Operational since {f.established}
                  </div>
                </div>
                <div className={'col-span-12 md:col-span-6 ' + (flip ? 'md:order-1' : '')}>
                  <Photo
                    src={imgUrl(f.image)}
                    alt={f.name}
                    ratio="4/3"
                  />
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}