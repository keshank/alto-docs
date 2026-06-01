import React, {type ReactNode} from 'react';

/**
 * Swatch — a small colour chip for use inside doc tables.
 *
 * Usage in MDX (registered globally in src/theme/MDXComponents):
 *   <Swatch color="#E0B100">Yellow</Swatch>
 *   <Swatch color="#2a8a3e" color2="#E0B100">Green / yellow</Swatch>
 *
 * `color2` (optional) renders a two-tone diagonal split for striped wires.
 */
export default function Swatch({
  color,
  color2,
  children,
}: {
  color: string;
  color2?: string;
  children?: ReactNode;
}): ReactNode {
  const background = color2
    ? `linear-gradient(135deg, ${color} 0 50%, ${color2} 50% 100%)`
    : color;
  return (
    <span className="alto-swatch-wrap">
      <span className="alto-swatch" style={{background}} aria-hidden="true" />
      {children}
    </span>
  );
}
