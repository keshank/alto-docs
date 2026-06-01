import React, {type ReactNode} from 'react';

/**
 * Plain — the dashed "In plain English" callout from the design: a small
 * uppercase pill label followed by a plain-language explanation.
 *
 * Usage in MDX (registered globally in src/theme/MDXComponents):
 *   <Plain>You'll connect two cables. Match the colours, you're done.</Plain>
 *   <Plain label="Not sure?">Hold SET + ESC for 5 seconds to load defaults.</Plain>
 *
 * `label` defaults to "In plain English".
 */
export default function Plain({
  label = 'In plain English',
  children,
}: {
  label?: string;
  children: ReactNode;
}): ReactNode {
  return (
    <div className="alto-plain">
      <span className="alto-plain-label">{label}</span>
      <div className="alto-plain-body">{children}</div>
    </div>
  );
}
