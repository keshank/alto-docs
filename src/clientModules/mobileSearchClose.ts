/**
 * Navbar client behaviours (three small, independent concerns: mobile search
 * expand/close, announcement-bar height sync, and a theme-color meta).
 *
 * 1) Mobile search expand/close. On mobile (<= 576px) the navbar search is
 *    collapsed to a 35x35 icon by CSS. Tapping it focuses the search input;
 *    this module toggles `body.alto-search-open` on focus/blur (CSS expands the
 *    input to fill the navbar) and injects a single 35x35 close (X) button into
 *    <body> so there's an obvious dismiss affordance. The button lives outside
 *    the Docusaurus React tree so navbar re-renders never wipe it.
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

let wired = false;

function wire() {
  if (wired || typeof document === 'undefined') return;

  const input = document.querySelector<HTMLInputElement>('.navbar__search-input');
  if (!input) return; // navbar/search not mounted yet — try again on next route update

  let btn = document.getElementById('alto-mobile-search-close') as HTMLButtonElement | null;
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'alto-mobile-search-close';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Close search');
    btn.innerHTML =
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round">' +
      '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
    // mousedown (not click) so it fires before the input's blur — otherwise the
    // blur would collapse the search and the click would land on nothing.
    btn.addEventListener('mousedown', (e) => {
      e.preventDefault();
      input!.value = '';
      input!.blur();
    });
    document.body.appendChild(btn);
  }

  input.addEventListener('focus', () => document.body.classList.add('alto-search-open'));
  input.addEventListener('blur', () => document.body.classList.remove('alto-search-open'));

  wired = true;
}

// Docusaurus fires this after each client-side route change; the first call
// after hydration is when the navbar input is reliably present.
//
// The search input is rendered asynchronously by the search-local plugin, so a
// single attempt on load can run too early and bail. ensureWired() retries on a
// short bounded interval until the input exists (or it gives up after ~3s), so a
// direct page load wires reliably without depending on a later route change.
let attempts = 0;
function ensureWired() {
  if (wired) return;
  wire();
  if (!wired && attempts++ < 25) {
    setTimeout(ensureWired, 120);
  }
}

/* ── Behaviour 2: keep --docusaurus-announcement-bar-height accurate ───────── */

function syncAnnouncementBar() {
  if (typeof document === 'undefined') return;
  const bar = document.querySelector<HTMLElement>('[class*="announcementBar_"]');
  const style = document.documentElement.style;
  if (bar) {
    // Bar is present. Infima sizes the bar *from* this variable, and Docusaurus
    // already sets it (via stylesheet) to the bar's natural height. We must NOT
    // write a measured value here — doing so feeds back and collapses the bar to
    // ~0 ("cutting"). Just drop any override we set earlier so Docusaurus's
    // value applies.
    style.removeProperty('--docusaurus-announcement-bar-height');
  } else {
    // Bar dismissed/absent. Because custom.css pins the bar with position:fixed,
    // Docusaurus's own value goes stale (stays at the old height) instead of
    // resetting — leaving a phantom gap above the fixed navbar. Force it to 0.
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
  attempts = 0;
  ensureWired();
  syncAnnouncementBar();
  syncThemeColor();
}

if (typeof window !== 'undefined') {
  const init = () => {
    ensureWired();
    startBarSync();
    startThemeColor();
  };
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}
