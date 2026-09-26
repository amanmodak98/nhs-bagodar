import { FacilitiesList } from '@/components/site/FacilitiesList';

export const metadata = {
  title: 'Facilities',
  description:
    'Facilities on one campus at National High School, Bagodar — classrooms, computer lab, hostel, buses, library, and sports ground.',
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
                Each in daily use. Since the date below.
              </h1>
              <p className="mt-5 text-lg text-slate-700 max-w-reading">
                Schools love to list twenty facilities. We list only what is actually in use on campus.
                Each one has a date it became operational, and that date is published alongside the photo.
              </p>
            </div>
          </div>
        </div>
      </header>

      <FacilitiesList />
    </>
  );
}
