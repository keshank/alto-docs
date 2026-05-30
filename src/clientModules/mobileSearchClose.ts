/**
 * Two small navbar client behaviours. (The mobile search/theme button is now a
 * server-rendered React component — see Navbar/MobileSidebar/Toggle — so there's
 * no JS injection here anymore.)
 *
 * 1) Announcement-bar height sync. The layout (fixed navbar + content padding +
 *    fixed doc sidebar) is keyed to `--docusaurus-announcement-bar-height`.
 *    Because custom.css pins the announcement bar with `position: fixed`,
 *    Docusaurus's own height/reset logic desyncs: after the (closeable) bar is
 *    dismissed it leaves the DOM but the variable keeps its old height. We
 *    recompute the variable from the bar's real content height (0 when absent)
 *    so the layout stays correct whether the bar is shown, wrapped, or dismissed.
 *
 * 2) theme-color meta. Without it, mobile Chrome paints its toolbar/gesture area
 *    a default grey; we keep a single meta in sync with the active theme.
 */

/* ── Announcement-bar height sync ───────────────────────────────────────────── */

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
  // Sync on a few delayed ticks so we read the *settled* state (during hydration
  // the bar is briefly detached, which would otherwise zero the var).
  [0, 300, 800, 1500].forEach((d) => setTimeout(syncAnnouncementBar, d));

  // Re-sync when the bar is dismissed: any click inside it (the close button is
  // the only control) may unmount it, so reset the var once Docusaurus removes it.
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

/* ── theme-color meta ───────────────────────────────────────────────────────── */

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
    themeObserver = new MutationObserver(syncThemeColor);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
  }
}

/* ── lifecycle ──────────────────────────────────────────────────────────────── */

export function onRouteDidUpdate() {
  syncAnnouncementBar();
  syncThemeColor();
}

if (typeof window !== 'undefined') {
  const init = () => {
    startBarSync();
    startThemeColor();
  };
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}
