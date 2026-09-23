import Image from 'next/image';

interface PhotoProps {
  src: string;
  alt: string;
  className?: string;
  ratio?: 'square' | '4/3' | '3/4' | '4/5' | '16/9' | '21/9' | '3/2';
  priority?: boolean;
  sizes?: string;
  caption?: string;
}

const RATIO_MAP = {
  'square': 'aspect-square',
  '4/3': 'aspect-[4/3]',
  '3/4': 'aspect-[3/4]',
  '4/5': 'aspect-[4/5]',
  '16/9': 'aspect-video',
  '21/9': 'aspect-[21/9]',
  '3/2': 'aspect-[3/2]',
};

/**
 * Image component tuned for editorial layout.
 * Always uses native loading (no layout shift), always shows a warm-grade.
 */
export function Photo({
  src,
  alt,
  className = '',
  ratio = '3/2',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw',
  caption,
}: PhotoProps) {
  return (
    <figure className={className}>
      <div className={`relative ${RATIO_MAP[ratio]} overflow-hidden bg-sand-100`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover photo-warm"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs text-slate-500 italic font-display">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}