export function Marquee({ items }: { items: readonly string[] }) {
  // Duplicate items so the marquee animation loops seamlessly
  const repeated = [...items, ...items];

  return (
    <div
      role="region"
      aria-label="School announcements"
      className="bg-forest-800 text-sand-100 text-xs border-b border-forest-700"
    >
      <div className="overflow-hidden">
        <div className="marquee-track flex whitespace-nowrap py-2">
          {repeated.map((item, i) => (
            <span key={i} className="flex items-center px-8 font-medium tracking-wide">
              <span aria-hidden className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 mr-3" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}