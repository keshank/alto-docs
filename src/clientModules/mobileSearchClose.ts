/**
 * Mobile navbar — search close button + expand wiring.
 *
 * On mobile (<= 576px) the navbar search is collapsed to a 35x35 icon by CSS.
 * Tapping it focuses the underlying search input. This module:
 *   - toggles `body.alto-search-open` on focus/blur, which the CSS uses to
 *     expand the input to fill the navbar (hiding the logo/pill/toggle/menu);
 *   - renders a single 35x35 close (X) button into <body> so the user has an
 *     obvious way to dismiss the expanded search.
 *
 * The button lives outside the Docusaurus React tree (appended to <body>) so
 * React re-renders of the navbar never wipe it. All visual styling is in
 * custom.css under the `@media (max-width: 576px)` block; this module only
 * handles behaviour.
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

export function onRouteDidUpdate() {
  attempts = 0;
  ensureWired();
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', ensureWired);
  } else {
    ensureWired();
  }
}
