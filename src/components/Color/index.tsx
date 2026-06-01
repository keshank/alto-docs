import React, {type ReactNode, type CSSProperties} from 'react';

/**
 * Color — colour any inline text (and/or highlight it) straight from Markdown.
 *
 * Usage in MDX (registered globally — no import needed). Both <C> and <Color>
 * work; `c` sets text colour, `bg` adds a highlight background.
 *
 *   <C c="#16a34a">green text</C>
 *   <C c="coral">a named palette colour</C>
 *   <C bg="#fff5b1">highlighted</C>
 *   <C c="white" bg="accent">badge-like</C>
 *
 * Accepts ANY CSS colour (hex, rgb(), hsl(), "teal", …) or a convenience name
 * from the docs palette below.
 */

// Convenience names → docs palette. These resolve to theme-aware CSS variables
// (defined in custom.css) so a colour reads well on both light and dark
// surfaces. Anything not listed is passed through as-is (e.g. raw hex/rgb).
const NAMED: Record<string, string> = {
  accent: 'var(--alto-accent)',
  red: 'var(--alto-accent)',
  coral: 'var(--c-coral)',
  gold: 'var(--c-gold)',
  green: 'var(--c-green)',
  blue: 'var(--c-blue)',
  amber: 'var(--c-amber)',
  ink: 'var(--alto-ink-900)',
  muted: 'var(--alto-ink-500)',
  paper: 'var(--alto-paper)',
  white: '#ffffff',
};

const isNamed = (v: string): boolean => NAMED[v.toLowerCase()] !== undefined;

export default function Color({
  c,
  bg,
  children,
}: {
  c?: string;
  bg?: string;
  children: ReactNode;
}): ReactNode {
  // Custom properties are allowed in inline styles at runtime; widen the type.
  const style: CSSProperties & Record<string, string> = {};
  const cls = ['alto-color'];

  if (c) {
    if (isNamed(c)) {
      // Named palette already has explicit light/dark values — use as-is.
      style.color = NAMED[c.toLowerCase()];
    } else {
      // Raw colour → auto-adapt between themes (see custom.css).
      style['--ac-fg'] = c;
      cls.push('alto-color--fg-auto');
    }
  }
  if (bg) {
    cls.push('alto-color--bg');
    if (isNamed(bg)) {
      style.background = NAMED[bg.toLowerCase()];
    } else {
      style['--ac-bg'] = bg;
      cls.push('alto-color--bg-auto');
    }
  }

  return (
    <span className={cls.join(' ')} style={style}>
      {children}
    </span>
  );
}
