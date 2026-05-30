/**
 * Navbar client behaviours (three small, independent concerns: mobile search
 * expand/close, announcement-bar height sync, and a theme-color meta).
 *
 * 1) Mobile search icon. On mobile (<= 576px) the navbar's plugin search is
 *    hidden (CSS) and we inject a single search-icon button into <body> (outside
 *    the React tree so navbar re-renders can't wipe it). Tapping it opens the
 *    hamburger drawer and focuses the drawer's own search field — the drawer is
 *    the single search surface on mobile (no in-navbar expand/overlay).
 *
 * 2) Announcement-bar height sync. The layout (fixed navbar + content padding +
 *    fixed doc sidebar) is keyed to `--docusaurus-announcement-bar-height`.
 *    Because custom.css pins the announcement bar with `position: fixed`,
 *    Docusaurus's own height/reset logic desyncs: after the (closeable) bar is
 *    dismissed it leaves the DOM but the variable keeps its old height, leaving
 *    a phantom gap above the navbar and tucking content under it. We recompute
 *    the variable from the bar's real height (0 when absent) so the layout stays
 *    correct whether the bar is shown or dismissed.
 *
 * All visual styling lives in custom.css; this module only handles behaviour.
 */

let searchIconWired = false;

const ICON_SEARCH =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>';
const ICON_MOON =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
const ICON_SUN =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>';

function drawerIsOpen(): boolean {
  return (
    document.querySelector('.navbar__toggle')?.getAttribute('aria-expanded') === 'true'
  );
}
function isDark(): boolean {
  return document.documentElement.getAttribute('data-theme') === 'dark';
}

/**
 * The single navbar action button morphs between two roles, in place, based on
 * whether the drawer is open:
 *   closed → search  (opens the drawer + focuses its search field)
 *   open   → theme   (toggles light/dark; the icon reflects the CURRENT theme)
 * A short fade makes the icon swap feel like a smooth replacement.
 */
function updateNavButton() {
  const btn = document.getElementById('alto-mobile-search-icon') as HTMLElement | null;
  if (!btn) return;
  const wantMode = drawerIsOpen() ? 'theme' : 'search';
  const wantIcon = wantMode === 'search' ? 'search' : isDark() ? 'sun' : 'moon';
  // Guard on a state flag we control — NOT on innerHTML, which the browser
  // re-serializes, so a string compare never matches and the observer that
  // watches childList would re-fire forever (infinite loop / freeze).
  if (btn.dataset.icon === wantIcon) return;
  btn.dataset.icon = wantIcon;
  btn.dataset.mode = wantMode;
  btn.setAttribute(
    'aria-label',
    wantMode === 'search' ? 'Search' : isDark() ? 'Switch to light mode' : 'Switch to dark mode',
  );
  // Instant swap; the fresh <svg> fades/scales in via a CSS animation, so the
  // smoothness doesn't depend on a JS timer racing with drawer-animation mutations.
  btn.innerHTML = wantMode === 'search' ? ICON_SEARCH : isDark() ? ICON_SUN : ICON_MOON;
}

function createSearchIcon(): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.id = 'alto-mobile-search-icon';
  btn.type = 'button';
  btn.dataset.mode = 'search';
  btn.setAttribute('aria-label', 'Search');
  btn.innerHTML = ICON_SEARCH;
  btn.addEventListener('click', () => {
    if (btn.dataset.mode === 'theme') {
      // Toggle color mode via Docusaurus's own (mobile-hidden) toggle button.
      document
        .querySelector<HTMLElement>('.navbar [class*="colorModeToggle"] button')
        ?.click();
      return;
    }
    // search mode (drawer closed): open the drawer, then focus its search field
    // after the open animation settles.
    document.querySelector<HTMLElement>('.navbar__toggle')?.click();
    window.setTimeout(() => {
      const ds = document.querySelector<HTMLInputElement>('.dx-drawer-search input');
      if (ds) {
        ds.focus();
        ds.select();
      }
    }, 360);
  });
  return btn;
}

let searchIconObserver: MutationObserver | null = null;

// Mount the icon INSIDE the navbar's left items (the hamburger's parent) so it
// shares the hamburger's containing block — a CSS `absolute right` then yields an
// exact gap, immune to the fixed-vs-absolute offset that broke body-mounted
// positioning. A MutationObserver re-attaches it if a navbar re-render drops it.
function searchIconHost(): HTMLElement | null {
  // The hamburger's own parent (the navbar's left items) — robust to class-name
  // differences, and guarantees the same containing block as the hamburger.
  return document.querySelector<HTMLElement>('.navbar__toggle')?.parentElement ?? null;
}

function attachSearchIcon() {
  const host = searchIconHost();
  if (!host) return;
  let btn = document.getElementById('alto-mobile-search-icon') as HTMLButtonElement | null;
  if (!btn) btn = createSearchIcon();
  if (btn.parentElement !== host) host.appendChild(btn);
}

function wireSearchIcon() {
  if (typeof document === 'undefined') return;
  attachSearchIcon();
  updateNavButton();
  if (!searchIconObserver && typeof MutationObserver !== 'undefined') {
    // Re-attach if a navbar re-render drops the icon, and morph it (search ⇄
    // theme) when the hamburger's aria-expanded flips (drawer open/close).
    searchIconObserver = new MutationObserver(() => {
      attachSearchIcon();
      updateNavButton();
    });
    searchIconObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['aria-expanded'],
    });
  }
  searchIconWired = true;
}

/* ── Behaviour 2: keep --docusaurus-announcement-bar-height accurate ───────── */

function syncAnnouncementBar() {
  if (typeof document === 'undefined') return;
  const bar = document.querySelector<HTMLElement>('[class*="announcementBar_"]');
  const style = document.documentElement.style;
  if (bar) {
    // The bar's CSS `height` *is* var(--docusaurus-announcement-bar-height), and
    // the navbar's `top` + content padding are keyed to the same var, so we must
    // give it a real px value (Docusaurus's own can be `auto`, breaking layout).
    //
    // Measure the CONTENT child's natural height — NOT the bar's own height or
    // scrollHeight, which equal the var-driven height (circular). With the bar's
    // overflow:visible + flex-centering, scrollHeight returns the too-short bar
    // height, so on narrow screens the wrapped 2nd line overflowed and cut off.
    // The content child's offsetHeight is its true height (text + its padding),
    // independent of the var, so it self-corrects and fits every line.
    const content = bar.querySelector<HTMLElement>('[class*="announcementBarContent"]');
    const h = Math.max(content ? content.offsetHeight : 0, bar.scrollHeight);
    if (h > 0) style.setProperty('--docusaurus-announcement-bar-height', h + 'px');
  } else {
    // Bar dismissed/absent — force 0 so the fixed navbar pins to the very top
    // (Docusaurus's value can otherwise go stale and leave a phantom gap).
    style.setProperty('--docusaurus-announcement-bar-height', '0px');
  }
}

let barClickWired = false;
function startBarSync() {
  // Don't react to every DOM mutation — during hydration the bar is briefly
  // detached, and reacting to that transient set the var to 0 and collapsed the
  // bar. Instead, sync on a few delayed ticks so we read the *settled* state...
  [0, 300, 800, 1500].forEach((d) => setTimeout(syncAnnouncementBar, d));

  // ...and re-sync when the user actually dismisses the bar: any click inside it
  // (the close button is the only control) may unmount it, so reset the var two
  // frames later once Docusaurus has removed it.
  if (!barClickWired) {
    barClickWired = true;
    document.addEventListener('click', (e) => {
      const t = e.target as Element | null;
      if (t && t.closest('[class*="announcementBar"]')) {
        requestAnimationFrame(() => requestAnimationFrame(syncAnnouncementBar));
      }
    });
  }
}

/* ── Behaviour 3: theme-color meta so mobile browser chrome blends in ───────── */
// Without a theme-color, mobile Chrome paints its toolbar/gesture area a default
// grey that clashes with the page. We keep a single meta in sync with the active
// theme (the site uses a manual toggle, so we track data-theme rather than a
// prefers-color-scheme media query). Colors match the page's paper background.
const THEME_COLORS: Record<'light' | 'dark', string> = {
  light: '#faf8f4',
  dark: '#17171a',
};

function syncThemeColor() {
  if (typeof document === 'undefined') return;
  const theme =
    document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]:not([media])');
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'theme-color';
    document.head.appendChild(meta);
  }
  meta.content = THEME_COLORS[theme];
}

let themeObserver: MutationObserver | null = null;
function startThemeColor() {
  syncThemeColor();
  if (!themeObserver && typeof MutationObserver !== 'undefined') {
    // Re-sync the meta AND the nav button icon whenever light/dark flips (the
    // data-theme attribute lives on <html>, outside the body-subtree observer).
    themeObserver = new MutationObserver(() => {
      syncThemeColor();
      updateNavButton();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
  }
}

export function onRouteDidUpdate() {
  wireSearchIcon();
  syncAnnouncementBar();
  syncThemeColor();
}

if (typeof window !== 'undefined') {
  const init = () => {
    wireSearchIcon();
    startBarSync();
    startThemeColor();
  };
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}
