import Link from 'next/link';

interface NoticeTickerProps {
  items: { id: number; title: string; category: string; publishDate: string }[];
}

export function NoticeTicker({ items }: NoticeTickerProps) {
  const top = items.slice(0, 6);

  return (
    <section aria-labelledby="notices-heading" className="bg-paper border-y border-rule">
      <div className="max-w-edition mx-auto px-6 py-10">
        <div className="flex items-end justify-between mb-6 gap-4 flex-wrap">
          <div>
            <div className="eyebrow">Notice board</div>
            <h2
              id="notices-heading"
              className="font-display text-2xl md:text-3xl mt-2 text-ink"
            >
              Circulars & announcements
            </h2>
          </div>
          <Link href="/notices" className="btn-link">
            Read all notices →
          </Link>
        </div>

        <ul className="divide-y divide-rule-soft">
          {top.map((n) => (
            <li key={n.id} className="py-3.5 flex items-baseline gap-4 group">
              <time className="font-display text-sm text-amber-600 w-24 shrink-0">
                {formatDate(n.publishDate)}
              </time>
              <span className={'pill text-[10px] ' + pillClass(n.category)}>
                {n.category}
              </span>
              <Link
                href={`/notices#n-${n.id}`}
                className="flex-1 text-ink group-hover:text-forest-800 transition-colors truncate"
              >
                {n.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function pillClass(cat: string): string {
  switch (cat) {
    case 'admissions': return 'pill-amber';
    case 'exam': return 'pill-forest';
    default: return '';
  }
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return iso;
  }
}