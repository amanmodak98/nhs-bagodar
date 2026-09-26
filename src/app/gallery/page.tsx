import { GalleryClient } from '@/components/site/GalleryClient';
import { Logo } from '@/components/ui/Logo';
import { SCHOOL } from '@/lib/content';

export const metadata = {
  title: 'Photo album — Life at N.H.S.',
  description: `Photographs from ${SCHOOL.name}, Bagodar. Filter by event, search by keyword, click any frame to enlarge.`,
};

export default function GalleryPage() {
  return (
    <>
      <header className="bg-paper border-b border-rule">
        <div className="max-w-edition mx-auto px-6 pt-12 pb-8">
          <div className="flex items-start gap-5 flex-wrap md:flex-nowrap">
            <div className="hidden md:block w-20 h-20 shrink-0">
              <Logo size="full" framed priority />
            </div>
            <div className="flex-1">
              <div className="eyebrow">Photo album · फोटो एल्बम</div>
              <h1 className="font-display text-4xl md:text-5xl text-ink mt-3 leading-[1.05]">
                Photographs from the school grounds.
              </h1>
              <p className="hindi-sub text-base text-slate-600 mt-3">
                विद्यालय प्रांगण की तस्वीरें
              </p>
              <p className="mt-4 text-slate-700 max-w-reading">
                Every photograph on this site, in one place. Filter by event, search by keyword,
                click any frame to enlarge. Captions and visibility are managed by the admin team.
              </p>
            </div>
          </div>
        </div>
      </header>

      <GalleryClient totalLabel={`the gallery`} />
    </>
  );
}
