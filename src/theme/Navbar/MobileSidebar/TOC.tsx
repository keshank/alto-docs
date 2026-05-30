import React, {useEffect, useState, type ReactNode} from 'react';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

/**
 * Collects on-page H2/H3 headings from the rendered article whenever the
 * mobile drawer is opened. Returns the list so the Layout can decide
 * whether to render the "On this page" tab.
 */
export function useDrawerHeadings(active: boolean): HeadingItem[] {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);

  useEffect(() => {
    if (!active) {
      return;
    }

    const elements = document.querySelectorAll<HTMLElement>(
      'article h2, article h3, main h2, main h3',
    );
    const list: HeadingItem[] = [];

    elements.forEach((el) => {
      if (!el.id || el.closest('.navbar') || el.closest('.navbar-sidebar')) {
        return;
      }

      let text = el.textContent || '';
      if (text.endsWith('#')) {
        text = text.slice(0, -1).trim();
      }

      list.push({
        id: el.id,
        text,
        level: el.tagName.toLowerCase() === 'h2' ? 2 : 3,
      });
    });

    setHeadings(list);
  }, [active]);

  return headings;
}

interface Props {
  headings: HeadingItem[];
}

export default function MobileDrawerTOC({headings}: Props): ReactNode {
  const mobileSidebar = useNavbarMobileSidebar();

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="alto-drawer-toc">
      <ul className="alto-drawer-toc-list">
        {headings.map((h, i) => (
          <li
            key={i}
            className={`alto-drawer-toc-item alto-drawer-toc-item--h${h.level}`}>
            <a
              href={`#${h.id}`}
              className="alto-drawer-toc-link"
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById(h.id);
                if (target) {
                  target.scrollIntoView({behavior: 'smooth'});
                  window.history.pushState(null, '', `#${h.id}`);
                }
                mobileSidebar.toggle();
              }}>
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
