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

function wireSearchIcon() {
  if (searchIconWired || typeof document === 'undefined') return;

  let btn = document.getElementById('alto-mobile-search-icon') as HTMLButtonElement | null;
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'alto-mobile-search-icon';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Search');
    btn.innerHTML =
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>';
    btn.addEventListener('click', () => {
      // The hamburger reflects the drawer state via aria-expanded. Only open it
      // if it's currently closed (otherwise clicking would close it); then focus
      // the drawer's search field — immediately if already open, or after the
      // open animation settles.
      const ham = document.querySelector<HTMLElement>('.navbar__toggle');
      const isOpen = ham?.getAttribute('aria-expanded') === 'true';
      if (!isOpen) ham?.click();
      window.setTimeout(
        () => {
          const ds = document.querySelector<HTMLInputElement>('.dx-drawer-search input');
          if (ds) {
            ds.focus();
            ds.select();
          }
        },
        isOpen ? 0 : 360,
      );
    });
    document.body.appendChild(btn);
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
    // the navbar's `top` + the content padding are keyed to the same var. We must
    // give it a real px value (Docusaurus's own value is unreliable here — it can
    // be left as `auto`, which makes navbar `top:auto` and breaks the layout).
    //
    // Measure scrollHeight, NOT the bar's own height: scrollHeight is the natural
    // height needed to fit the content and is independent of the var-driven
    // `height`, so it doesn't feed back (no collapse) and self-corrects even if
    // the bar is currently collapsed. Works for the 2-line wrap on mobile too.
    const h = bar.scrollHeight;
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
    // Re-sync whenever the user flips the light/dark toggle.
    themeObserver = new MutationObserver(syncThemeColor);
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
