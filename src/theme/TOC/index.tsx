import React, {useEffect, useRef, type ReactNode} from 'react';
import clsx from 'clsx';
import TOCItems from '@theme/TOCItems';
import type {Props} from '@theme/TOC';
import SuggestEdit from '@site/src/components/SuggestEdit';
import AiTools from '@site/src/components/AiTools';

// Custom classes (prevents TOCInline/TOCCollapsible being highlighted by mistake).
const LINK_CLASS_NAME = 'table-of-contents__link toc-highlight';
const LINK_ACTIVE_CLASS_NAME = 'table-of-contents__link--active';

export default function TOC({className, ...props}: Props): ReactNode {
  const rootRef = useRef<HTMLDivElement>(null);

  // Slide a single red indicator to the active item, animated via CSS transition.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const list = root.querySelector<HTMLElement>('.table-of-contents');
    const thumb = root.querySelector<HTMLElement>('.alto-toc-thumb');
    if (!list || !thumb) return;

    const update = () => {
      const active = list.querySelector<HTMLElement>('.table-of-contents__link--active');
      if (!active) {
        thumb.style.opacity = '0';
        return;
      }
      thumb.style.opacity = '1';
      thumb.style.transform = `translateY(${active.offsetTop}px)`;
      thumb.style.height = `${active.offsetHeight}px`;
    };

    // Throttle to one update per animation frame.
    let raf = 0;
    const schedule = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    };

    update();
    // Docusaurus updates the active item on scroll — track it both via the
    // class mutation and via scroll (the latter is the reliable driver).
    const mo = new MutationObserver(schedule);
    mo.observe(list, {subtree: true, attributes: true, attributeFilter: ['class']});
    window.addEventListener('scroll', schedule, {passive: true});
    window.addEventListener('resize', schedule);
    // Catch the post-hydration active state.
    const t = window.setTimeout(update, 300);
    return () => {
      mo.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.clearTimeout(t);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef} className={clsx('alto-toc', 'thin-scrollbar', className)}>
      <div className="alto-toc-title">On this page</div>

      <div className="alto-toc-list">
        <span className="alto-toc-thumb" aria-hidden="true" />
        <TOCItems
          {...props}
          linkClassName={LINK_CLASS_NAME}
          linkActiveClassName={LINK_ACTIVE_CLASS_NAME}
        />
      </div>

      <div className="alto-toc-foot">
        <SuggestEdit />
        <AiTools />
      </div>
    </div>
  );
}
