import React, {useEffect, useState, type ReactNode} from 'react';
import clsx from 'clsx';
import {useHistory} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {
  useNavbarMobileSidebar,
  useNavbarSecondaryMenu,
} from '@docusaurus/theme-common/internal';
import {ThemeClassNames} from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import type {Props} from '@theme/Navbar/MobileSidebar/Layout';
import MobileDrawerTOC, {useDrawerHeadings} from '../TOC';

// Mirrors src/nav/buildNav.ts. The data is derived from docs/ at build time
// and passed through siteConfig.customFields.navTree.
interface DrawerLeaf {
  label: string;
  href: string;
  tag?: string;
}
interface DrawerGroup {
  kind: 'category';
  label: string;
  collapsed: boolean;
  items: DrawerLeaf[];
}
interface DrawerDoc {
  kind: 'doc';
  label: string;
  href: string;
  tag?: string;
}
type NavNode = DrawerGroup | DrawerDoc;
interface NavTree {
  nodes: NavNode[];
}

function SearchBox() {
  const history = useHistory();
  const mobileSidebar = useNavbarMobileSidebar();
  const searchUrl = useBaseUrl('/search');
  const [value, setValue] = useState('');

  return (
    <form
      className="dx-drawer-search"
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        const q = value.trim();
        if (!q) return;
        mobileSidebar.toggle();
        history.push(`${searchUrl}?q=${encodeURIComponent(q)}`);
      }}>
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
      <input
        type="search"
        name="q"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search documentation"
        aria-label="Search documentation"
        enterKeyHint="search"
        autoComplete="off"
      />
    </form>
  );
}

const LAST_GROUP_KEY = 'alto-drawer-last-group';

function readLastGroup(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.sessionStorage.getItem(LAST_GROUP_KEY);
  } catch {
    return null;
  }
}

function writeLastGroup(label: string) {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(LAST_GROUP_KEY, label);
  } catch {
    // ignore quota / privacy-mode failures
  }
}

function HomepageNavGroup({
  group,
  defaultOpen,
  onLeafClick,
}: {
  group: DrawerGroup;
  defaultOpen: boolean;
  onLeafClick: (groupLabel: string) => void;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={clsx('dx-group', open && 'dx-group--open')}>
      <button
        type="button"
        className="dx-group-head"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}>
        <span>{group.label}</span>
        <svg
          className="dx-group-chev"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <ul className="dx-group-list">
          {group.items.map((leaf) => (
            <li key={leaf.href}>
              <a
                className="dx-leaf"
                href={leaf.href}
                onClick={() => onLeafClick(group.label)}>
                <span className="dx-leaf-label">{leaf.label}</span>
                {leaf.tag && <span className="dx-leaf-tag">{leaf.tag}</span>}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function HomepageNav() {
  const mobileSidebar = useNavbarMobileSidebar();
  const {siteConfig} = useDocusaurusContext();
  const navTree = (siteConfig.customFields?.navTree as NavTree | undefined) ?? {
    nodes: [],
  };
  const lastGroup = readLastGroup();
  const onLeafClick = (groupLabel: string) => {
    writeLastGroup(groupLabel);
    mobileSidebar.toggle();
  };
  const close = () => mobileSidebar.toggle();
  return (
    <div className="dx-drawer-nav">
      {navTree.nodes.map((n) =>
        n.kind === 'category' ? (
          <HomepageNavGroup
            key={n.label}
            group={n}
            defaultOpen={lastGroup === n.label}
            onLeafClick={onLeafClick}
          />
        ) : (
          // A root-level doc (no folder/sub-items) reads like a page row, not
          // a boxed link.
          <a
            key={n.href}
            className="dx-leaf dx-drawer-rootleaf"
            href={n.href}
            onClick={close}>
            <span className="dx-leaf-label">{n.label}</span>
            {n.tag && <span className="dx-leaf-tag">{n.tag}</span>}
          </a>
        ),
      )}
      <a
        className="dx-drawer-extra-link"
        href="https://altomotors.in"
        target="_blank"
        rel="noopener noreferrer"
        onClick={close}>
        altomotors.in ↗
      </a>
    </div>
  );
}

export default function NavbarMobileSidebarLayout({header}: Props): ReactNode {
  const secondaryMenuContent = useNavbarSecondaryMenu().content;
  const hasSecondaryMenu = !!secondaryMenuContent;
  const mobileSidebar = useNavbarMobileSidebar();
  const headings = useDrawerHeadings(mobileSidebar.shown);
  const hasTOC = headings.length > 0;
  const showTabs = hasSecondaryMenu && hasTOC;

  const [tab, setTab] = useState<'contents' | 'toc'>('contents');
  useEffect(() => {
    if (!hasTOC && tab === 'toc') {
      setTab('contents');
    }
  }, [hasTOC, tab]);

  // The drawer rolls down from beneath the navbar. It is a fixed descendant of
  // the navbar, which establishes a containing block via its backdrop-filter —
  // so the drawer's `top` is measured from the NAVBAR's top, not the viewport.
  // Use the navbar's own height (not its viewport bottom) so it sits flush at
  // the navbar's bottom edge; otherwise the announcement-bar offset is counted
  // twice and a gap equal to the bar height appears.
  useEffect(() => {
    if (!mobileSidebar.shown) return;
    const navbar = document.querySelector<HTMLElement>('.navbar');
    if (!navbar) return;
    const update = () => {
      document.documentElement.style.setProperty(
        '--alto-drawer-top',
        `${navbar.offsetHeight}px`,
      );
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [mobileSidebar.shown]);

  return (
    <div
      className={clsx(
        ThemeClassNames.layout.navbar.mobileSidebar.container,
        'navbar-sidebar',
        'dx-drawer',
      )}>
      {header}

      <SearchBox />

      {showTabs && (
        <div className="dx-drawer-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'contents'}
            className={clsx('dx-tab', tab === 'contents' && 'dx-tab--active')}
            onClick={() => setTab('contents')}>
            Contents
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'toc'}
            className={clsx('dx-tab', tab === 'toc' && 'dx-tab--active')}
            onClick={() => setTab('toc')}>
            On this page
          </button>
        </div>
      )}

      <div className="dx-drawer-body">
        {hasSecondaryMenu ? (
          <>
            <div
              className={clsx(
                ThemeClassNames.layout.navbar.mobileSidebar.panel,
                'dx-drawer-nav navbar-sidebar__item menu',
              )}
              hidden={showTabs && tab !== 'contents'}>
              {secondaryMenuContent}
            </div>
            {hasTOC && (
              <div hidden={tab !== 'toc'}>
                <MobileDrawerTOC headings={headings} />
              </div>
            )}
          </>
        ) : (
          <HomepageNav />
        )}
      </div>

      <div className="dx-drawer-foot">
        <a
          href="https://altomotors.in/contact-us/"
          target="_blank"
          rel="noopener noreferrer"
          className="dx-drawer-cta"
          onClick={() => mobileSidebar.toggle()}>
          Open a support ticket
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true">
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        </a>
        <div className="dx-drawer-foot-meta">
          Alto Docs · v0.1 · © {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}
