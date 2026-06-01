import React, {useRef, useState, type ReactNode} from 'react';

/**
 * Code — a dark "terminal" code card whose colours you set yourself in the
 * Markdown (using <C>), instead of an automatic/hardcoded syntax palette.
 *
 * Usage in MDX (registered globally — no import needed):
 *
 *   <Code title="hall-pinout.txt">
 *   <Line><C c="muted"># Driver pin → motor wire</C></Line>
 *   <Line><C c="coral">+5V</C>{"  → "}<C c="gold">red</C></Line>
 *   <Line><C c="coral">GND</C>{"  → "}<C c="gold">black</C></Line>
 *   </Code>
 *
 * `title` is optional — with it you get the window bar (dots + filename + Copy);
 * without it, just the dark body. Use <Line> for each line; use {"  "} for
 * literal alignment spaces.
 */

export function Line({children}: {children?: ReactNode}): ReactNode {
  return <span className="alto-code-line">{children}</span>;
}

export default function Code({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}): ReactNode {
  const bodyRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    const text = bodyRef.current?.innerText ?? '';
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="alto-code">
      {title && (
        <div className="alto-code-head">
          <span className="alto-code-dots" aria-hidden="true" />
          <span className="alto-code-title">{title}</span>
          <button type="button" className="alto-code-copy" onClick={copy}>
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      )}
      <pre className="alto-code-body" ref={bodyRef}>
        <code>{children}</code>
      </pre>
    </div>
  );
}
