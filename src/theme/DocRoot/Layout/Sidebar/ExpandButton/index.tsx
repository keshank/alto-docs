import React, {type ReactNode} from 'react';
import {translate} from '@docusaurus/Translate';

/**
 * Swizzled ExpandButton — shown only when the sidebar is collapsed. Fills the
 * narrow 30px strip with a right-pointing chevron drawn in CSS.
 */
export default function ExpandButton({toggleSidebar}: {toggleSidebar: () => void}): ReactNode {
  return (
    <button
      type="button"
      className="alto-sidebar-expand"
      aria-label={translate({
        id: 'theme.docs.sidebar.expandButtonAriaLabel',
        message: 'Expand sidebar',
        description: 'The ARIA label and title attribute for expand button of doc sidebar',
      })}
      title={translate({
        id: 'theme.docs.sidebar.expandButtonTitle',
        message: 'Expand sidebar',
        description: 'The ARIA label and title attribute for expand button of doc sidebar',
      })}
      onClick={toggleSidebar}>
      <span className="alto-sidebar-expand-chev" aria-hidden="true" />
    </button>
  );
}
