import Image from 'next/image';

type Size = 'nav' | 'mark' | 'full';
const SRC: Record<Size, string> = {
  nav: '/logo-nav.png',
  mark: '/logo-mark.png',
  full: '/logo-full.png',
};
const DIM: Record<Size, { w: number; h: number }> = {
  nav: { w: 40, h: 40 },
  mark: { w: 96, h: 96 },
  full: { w: 200, h: 200 },
};

interface LogoProps {
  size?: Size;
  className?: string;
  priority?: boolean;
  /** When true, the image renders as a circular medallion with a hairline border (e.g. on light backgrounds). */
  framed?: boolean;
  /** Invert to white background for dark sections. */
  inverted?: boolean;
}

export function Logo({ size = 'nav', className = '', priority = false, framed = false, inverted = false }: LogoProps) {
  const { w, h } = DIM[size];
  const src = SRC[size];
  return (
    <Image
      src={src}
      alt="National High School, Bagodar — school emblem"
      width={w}
      height={h}
      priority={priority}
      className={
        (framed
          ? `rounded-full ${inverted ? 'bg-paper p-1 ring-1 ring-forest-800/30' : 'bg-paper p-1 ring-1 ring-rule'} `
          : '') +
        className
      }
    />
  );
}