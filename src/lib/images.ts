import fs from 'node:fs';
import path from 'node:path';

/**
 * Image catalog. Reads /public/images/ at build time and groups
 * the SEO-named files into curated photo sets for the site.
 */

const IMG_DIR = path.join(process.cwd(), 'public', 'images');

let cached: string[] | null = null;

export function listAllImages(): string[] {
  if (cached) return cached;
  if (!fs.existsSync(IMG_DIR)) return [];
  cached = fs
    .readdirSync(IMG_DIR)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort();
  return cached;
}

export function stripExt(name: string): string {
  return name.replace(/\.(jpe?g|png|webp)$/i, '');
}

export function findByStem(stem: string): string | null {
  const all = listAllImages();
  return all.find((f) => stripExt(f) === stem) ?? null;
}

/** Curated hero / section images — picked from the renamed set. */
export const HERO_IMAGES = {
  primary: 'independence-day-rally-banner-front',
  rallyWide: 'independence-day-rally-wide-shot-01',
  schoolGroup: 'independence-day-school-girls-portrait',
  culturalPink: 'annual-function-stage-pink-saree-portrait-red-fort',
  culturalWhite: 'student-costume-portrait-white-frilly-dress',
  culturalFairy: 'annual-function-fairy-costume-pink-wings',
  flagCeremony: 'flag-hoisting-ceremony-flag-rising-01',
  chiefGuest: 'chief-guest-welcome-bouquet-presentation',
  audienceWide: 'annual-function-audience-students-seated-canopy-wide',
  sareeDance: 'annual-function-stage-saree-dance-lineup-colorful',
  bouquetShawl: 'chief-guest-welcome-bouquet-yellow-shawl',
  tricolorLineup: 'annual-function-stage-tricolor-sash-lineup-01',
  speechMicrophone: 'annual-function-stage-boy-mic-orange-shirt-01',
  marchBack: 'independence-day-rally-marching-back-view',
  streetMarch: 'independence-day-rally-street-march',
};

export function imgUrl(stem: string): string {
  return `/images/${stem}.jpeg`;
}

export type GallerySection = 'life-at-nhs' | 'independence-day' | 'annual-function' | 'flag-ceremony' | 'leadership';

const SECTION_PATTERNS: Record<GallerySection, RegExp> = {
  'life-at-nhs': /^(independence-day|annual-function|flag-hoisting|chief-guest|student|students|bouquet)/,
  'independence-day': /^independence-day-/,
  'annual-function': /^annual-function-/,
  'flag-ceremony': /^flag-hoisting-/,
  'leadership': /^chief-guest-/,
};

export function getImagesForSection(section: GallerySection): string[] {
  const all = listAllImages().map(stripExt);
  const re = SECTION_PATTERNS[section];
  return all.filter((s) => re.test(s));
}

export function getImageCount(): number {
  return listAllImages().length;
}