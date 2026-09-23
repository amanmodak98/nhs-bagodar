/**
 * Decorative SVG ornaments — used as accents on the hero,
 * section dividers, and on the affiliation page.
 * All are inline SVG and accept className for sizing/color.
 */

export function LaurelLeft({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 120" fill="none" className={className} aria-hidden>
      <path d="M30 8 C 22 24, 18 38, 22 56 C 26 74, 24 92, 30 110" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <g fill="currentColor">
        <ellipse cx="22" cy="22" rx="6" ry="3" transform="rotate(-30 22 22)" opacity="0.85" />
        <ellipse cx="20" cy="36" rx="7" ry="3.2" transform="rotate(-15 20 36)" opacity="0.75" />
        <ellipse cx="21" cy="52" rx="6.5" ry="3" transform="rotate(15 21 52)" opacity="0.7" />
        <ellipse cx="24" cy="68" rx="6" ry="2.8" transform="rotate(30 24 68)" opacity="0.65" />
        <ellipse cx="27" cy="84" rx="5.5" ry="2.6" transform="rotate(40 27 84)" opacity="0.6" />
        <ellipse cx="30" cy="100" rx="5" ry="2.4" transform="rotate(55 30 100)" opacity="0.55" />
      </g>
      <g fill="currentColor" opacity="0.85">
        <ellipse cx="38" cy="22" rx="6" ry="3" transform="rotate(30 38 22)" />
        <ellipse cx="40" cy="36" rx="7" ry="3.2" transform="rotate(15 40 36)" />
        <ellipse cx="39" cy="52" rx="6.5" ry="3" transform="rotate(-15 39 52)" />
        <ellipse cx="36" cy="68" rx="6" ry="2.8" transform="rotate(-30 36 68)" />
        <ellipse cx="33" cy="84" rx="5.5" ry="2.6" transform="rotate(-40 33 84)" />
        <ellipse cx="30" cy="100" rx="5" ry="2.4" transform="rotate(-55 30 100)" />
      </g>
    </svg>
  );
}

export function LaurelRight({ className = '' }: { className?: string }) {
  return <LaurelLeft className={`scale-x-[-1] ${className}`} />;
}

/** Vertical amber rule used as section divider. */
export function AmberRule({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden>
      <span className="block w-1 h-12 bg-amber-500" />
      <span className="block w-12 h-px bg-amber-500" />
    </div>
  );
}

/** Small ornamental flourish — a horizontal rule with a center diamond. */
export function Flourish({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 14" fill="none" className={className} aria-hidden>
      <line x1="0" y1="7" x2="84" y2="7" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <line x1="116" y1="7" x2="200" y2="7" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <path d="M100 1 L107 7 L100 13 L93 7 Z" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

/** Small N.H.S. monogram in a square — used as decorative accent. */
export function NhsMonogram({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <rect x="1" y="1" width="38" height="38" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <text x="20" y="27" textAnchor="middle" fontFamily="serif" fontSize="14" fontWeight="500" fill="currentColor">
        N·H·S
      </text>
    </svg>
  );
}