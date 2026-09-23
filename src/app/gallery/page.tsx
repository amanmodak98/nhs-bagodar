import fs from 'node:fs';
import path from 'node:path';
import { FullGallery, type GalleryImage } from '@/components/gallery/FullGallery';
import { Logo } from '@/components/ui/Logo';
import { SCHOOL } from '@/lib/content';

export const metadata = {
  title: 'Photo album — Life at N.H.S.',
  description:
    `Photographs from ${SCHOOL.name}, Bagodar — 117 photographs across Independence Day, Annual Function, Flag-hoisting, and Leadership events. Click any frame to enlarge.`,
};

const IMG_DIR = path.join(process.cwd(), 'public', 'images');

function detectCategory(stem: string): GalleryImage['category'] {
  if (stem.startsWith('independence-day-')) return 'independence-day';
  if (stem.startsWith('annual-function-')) return 'annual-function';
  if (stem.startsWith('flag-hoisting-')) return 'flag-ceremony';
  if (stem.startsWith('chief-guest-')) return 'leadership';
  return 'life-at-nhs';
}

const CAPTIONS_BY_CATEGORY: Record<GalleryImage['category'], string[]> = {
  'independence-day': [
    'Independence Day rally, 15 August 2025 — students carrying the school banner and national flags down the village road.',
    'Costumed students leading the rally — Netaji, Bharat Mata, and freedom-fighter portrayals.',
    'Group photo outside the school building under the HIGH SCHOOL signboard.',
    'Wide shot of the rally passing through Dama village.',
    'Students marching past Aura.',
  ],
  'annual-function': [
    'Annual Function 2025 — folk dance performance on the assembly ground.',
    'Stage performance by students in pink and white frilly dresses.',
    'Saree dance by senior girls.',
    'Student speeches and choir performances.',
    'Stage decoration with the National High School banner.',
  ],
  'flag-ceremony': [
    'Flag-hoisting ceremony at the assembly ground.',
    'Chief guest pulling the rope to raise the tricolour.',
    'National anthem in progress.',
    'Salute after flag hoisting.',
  ],
  'leadership': [
    'Chief guest and principal exchanging bouquets on stage.',
    'Welcoming the chief guest with a ceremonial shawl.',
    'Memento and trophy presentations.',
    'Honouring the chief guest.',
  ],
  'life-at-nhs': [
    'A moment from the school grounds.',
    'Students during assembly.',
    'Cultural programme performance.',
    'Group photo from a school event.',
    'A classroom moment.',
  ],
};

function captionFor(category: GalleryImage['category'], idx: number): string {
  return CAPTIONS_BY_CATEGORY[category][idx % CAPTIONS_BY_CATEGORY[category].length];
}

export default function GalleryPage() {
  const files = fs
    .readdirSync(IMG_DIR)
    .filter((f) => /\.jpe?g$/i.test(f))
    .map((f) => f.replace(/\.jpe?g$/i, ''))
    .sort();

  const images: GalleryImage[] = files.map((stem, i) => ({
    stem,
    category: detectCategory(stem),
    caption: captionFor(detectCategory(stem), i),
  }));

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
                {images.length} photographs from the school grounds.
              </h1>
              <p className="hindi-sub text-base text-slate-600 mt-3">
                विद्यालय प्रांगण की तस्वीरें — सभी {images.length} चित्र
              </p>
              <p className="mt-4 text-slate-700 max-w-reading">
                Every photograph on this site, in one place. Filter by event, search by keyword, click any frame to enlarge.
              </p>
            </div>
          </div>
        </div>
      </header>

      <FullGallery images={images} />
    </>
  );
}