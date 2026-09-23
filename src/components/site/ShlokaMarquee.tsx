import { SHLOKAS } from '@/lib/content';

export function ShlokaMarquee() {
  const items = [...SHLOKAS, ...SHLOKAS];
  return (
    <div
      role="region"
      aria-label="Sanskrit shlokas"
      className="bg-forest-900 text-sand-100 border-b border-forest-800"
    >
      <div className="overflow-hidden">
        <div className="shloka-track flex whitespace-nowrap py-2.5">
          {items.map((s, i) => (
            <span key={i} className="flex items-center px-8 text-sm">
              <span aria-hidden className="mr-3 text-amber-400 font-display italic">"</span>
              <span className="hindi-sub text-sand-100 italic">{s.hindi}</span>
              <span aria-hidden className="mx-3 text-amber-400 font-display italic">"</span>
              <span className="text-xs text-sand-300 uppercase tracking-institutional">
                — {s.source}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}