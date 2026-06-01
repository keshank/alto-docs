import React, {type ReactNode} from 'react';

/**
 * DocMeta — the pill row shown under a doc's H1 + lede.
 *
 * Usage in MDX (no import needed — registered globally in src/theme/MDXComponents):
 *   <DocMeta difficulty="Easy" readTime="5 min read" steps="6 steps" updated="May 2026" />
 *
 * Any prop may be omitted. `difficulty` colours its pill (Easy→green,
 * Medium→amber, Advanced→red); `updated` renders a red pill prefixed "Updated".
 */

type Variant = 'easy' | 'med' | 'adv' | 'updated' | undefined;

function difficultyVariant(d: string): Variant {
  const v = d.trim().toLowerCase();
  if (v === 'medium' || v === 'intermediate') return 'med';
  if (v === 'advanced' || v === 'hard' || v === 'expert') return 'adv';
  return 'easy'; // easy / beginner / anything else
}

const CheckIcon = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ClockIcon = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 16 14" />
  </svg>
);

function Pill({variant, icon, children}: {variant?: Variant; icon?: ReactNode; children: ReactNode}) {
  return (
    <span className={`alto-meta-pill${variant ? ` ${variant}` : ''}`}>
      {icon}
      {children}
    </span>
  );
}

export default function DocMeta({
  difficulty,
  readTime,
  steps,
  updated,
}: {
  difficulty?: string;
  readTime?: string;
  steps?: string;
  updated?: string;
}): ReactNode {
  return (
    <div className="alto-meta">
      {difficulty && (
        <Pill variant={difficultyVariant(difficulty)} icon={CheckIcon}>
          {difficulty}
        </Pill>
      )}
      {readTime && <Pill icon={ClockIcon}>{readTime}</Pill>}
      {steps && <Pill>{steps}</Pill>}
      {updated && <Pill variant="updated">Updated {updated}</Pill>}
    </div>
  );
}
