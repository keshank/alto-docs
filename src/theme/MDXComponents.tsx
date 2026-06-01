import React, {type ComponentProps} from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import DocMeta from '@site/src/components/DocMeta';
import Swatch from '@site/src/components/Swatch';
import Plain from '@site/src/components/Plain';
import Color from '@site/src/components/Color';
import Code, {Line} from '@site/src/components/Code';

// Wrap every markdown table in a horizontal-scroll container. On small screens
// the table shrinks/wraps to fit (see custom.css); the wrapper only scrolls
// when content genuinely can't fit.
function Table(props: ComponentProps<'table'>) {
  return (
    <div className="alto-table-wrap">
      <table {...props} />
    </div>
  );
}

// Make these available in every .md/.mdx doc without an explicit import.
export default {
  ...MDXComponents,
  DocMeta,
  Swatch,
  Plain,
  Color,
  C: Color,
  Code,
  Line,
  table: Table,
};
