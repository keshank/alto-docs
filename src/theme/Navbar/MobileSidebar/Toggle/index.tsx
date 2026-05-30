import React, {type ReactNode} from 'react';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import {useColorMode} from '@docusaurus/theme-common';
import {translate} from '@docusaurus/Translate';

const SearchIcon = (): ReactNode => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

const MoonIcon = (): ReactNode => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
);

const SunIcon = (): ReactNode => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true">
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
  </svg>
);

/**
 * Mobile-only navbar button rendered next to the hamburger (so it's part of the
 * server-rendered React tree — no client-side injection, no load blink). When
 * the drawer is closed it's a search trigger (opens the drawer + focuses its
 * search field); when the drawer is open it morphs in place into the light/dark
 * toggle. All positioning/visibility is in custom.css (#alto-mobile-search-icon).
 */
function MobileSearchThemeButton(): ReactNode {
  const {toggle, shown} = useNavbarMobileSidebar();
  const {colorMode, setColorMode} = useColorMode();
  const isDark = colorMode === 'dark';

  const onClick = () => {
    if (shown) {
      setColorMode(isDark ? 'light' : 'dark');
      return;
    }
    toggle();
    // Focus the drawer's search field once the open animation settles.
    window.setTimeout(() => {
      const input = document.querySelector<HTMLInputElement>('.dx-drawer-search input');
      if (input) {
        input.focus();
        input.select();
      }
    }, 360);
  };

  return (
    <button
      id="alto-mobile-search-icon"
      type="button"
      onClick={onClick}
      data-mode={shown ? 'theme' : 'search'}
      aria-label={
        shown
          ? isDark
            ? 'Switch to light mode'
            : 'Switch to dark mode'
          : 'Search'
      }>
      {shown ? (isDark ? <SunIcon /> : <MoonIcon />) : <SearchIcon />}
    </button>
  );
}

export default function MobileSidebarToggle(): ReactNode {
  const {toggle, shown} = useNavbarMobileSidebar();
  return (
    <>
      <MobileSearchThemeButton />
      <button
        onClick={toggle}
        aria-label={translate({
          id: 'theme.docs.sidebar.toggleSidebarButtonAriaLabel',
          message: 'Toggle navigation bar',
          description:
            'The ARIA label for hamburger menu button of mobile navigation',
        })}
        aria-expanded={shown}
        className="navbar__toggle clean-btn alto-burger-btn"
        type="button">
        <span className="alto-burger" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>
    </>
  );
}
