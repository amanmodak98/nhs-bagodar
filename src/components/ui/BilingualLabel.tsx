/**
 * BilingualLabel — small EN/HN pair used as eyebrows and tags throughout the site.
 * Renders an uppercase English eyebrow + a Devanagari Hindi label, both modest weight.
 */

export function BilingualLabel({
  en,
  hi,
  enClassName = '',
  hiClassName = '',
}: {
  en: string;
  hi?: string;
  enClassName?: string;
  hiClassName?: string;
}) {
  return (
    <div className="flex items-baseline gap-3 flex-wrap">
      <span className={'eyebrow ' + enClassName}>{en}</span>
      {hi && (
        <>
          <span aria-hidden className="text-slate-300 text-xs">·</span>
          <span className={'eyebrow-hindi ' + hiClassName}>{hi}</span>
        </>
      )}
    </div>
  );
}