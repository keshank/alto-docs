import React, {type ReactNode} from 'react';
import {translate} from '@docusaurus/Translate';

/**
 * Swizzled CollapseButton — replaces Docusaurus's button (which uses an SVG
 * without viewBox that overflows when scaled, plus inline-block layout that
 * resisted centering) with a clean full-width bar with a CSS chevron.
 */
export default function CollapseButton({onClick}: {onClick: () => void}): ReactNode {
  return (
    <button
      type="button"
      className="alto-sidebar-collapse"
      aria-label={translate({
        id: 'theme.docs.sidebar.collapseButtonAriaLabel',
        message: 'Collapse sidebar',
        description: 'The title attribute for collapse button of doc sidebar',
      })}
      title={translate({
        id: 'theme.docs.sidebar.collapseButtonTitle',
        message: 'Collapse sidebar',
        description: 'The title attribute for collapse button of doc sidebar',
      })}
      onClick={onClick}>
      <span className="alto-sidebar-collapse-chev" aria-hidden="true" />
    </button>
  );
}
