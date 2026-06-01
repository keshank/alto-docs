import React, {useState, type ReactNode} from 'react';

/**
 * AiTools — the "AI Tools" group in the right-hand TOC (Supabase-style):
 *  - Copy as Markdown : converts the rendered page to Markdown → clipboard
 *  - Ask ChatGPT / Ask Claude : open a new tab prefilled with a prompt that
 *    tells the assistant to read THIS page's URL, so the reader can ask about it.
 *
 * No AI is run by us — we just hand the page URL + a prompt to the assistant.
 */

const CopyIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="9" width="12" height="12" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);
const ChatGptIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3.2 13.6 8 18.8 8 14.6 11 16.2 16 12 13 7.8 16 9.4 11 5.2 8 10.4 8z" />
  </svg>
);
const ClaudeIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2v5M12 17v5M2 12h5M17 12h5M5 5l3.5 3.5M15.5 15.5 19 19M19 5l-3.5 3.5M8.5 15.5 5 19" />
  </svg>
);

function pagePrompt(): string {
  const url = window.location.href;
  return `Read ${url}\n\nThen help me with questions about this page.`;
}

export default function AiTools(): ReactNode {
  const [copied, setCopied] = useState(false);

  const askChatGPT = () =>
    window.open(
      `https://chatgpt.com/?hints=search&q=${encodeURIComponent(pagePrompt())}`,
      '_blank',
      'noopener,noreferrer',
    );

  const askClaude = () =>
    window.open(
      `https://claude.ai/new?q=${encodeURIComponent(pagePrompt())}`,
      '_blank',
      'noopener,noreferrer',
    );

  const copyMarkdown = async () => {
    const article = document.querySelector<HTMLElement>('.theme-doc-markdown');
    if (!article) return;
    try {
      const [{default: TurndownService}, {gfm}] = await Promise.all([
        import('turndown'),
        import('turndown-plugin-gfm'),
      ]);
      const td = new TurndownService({
        headingStyle: 'atx',
        codeBlockStyle: 'fenced',
        bulletListMarker: '-',
      });
      td.use(gfm);

      // Strip UI-only bits so the Markdown is clean.
      const clone = article.cloneNode(true) as HTMLElement;
      clone
        .querySelectorAll('.hash-link, .alto-meta, [class*="buttonGroup"], .alto-code-copy')
        .forEach((n) => n.remove());

      const md = td.turndown(clone).trim();
      await navigator.clipboard.writeText(md);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard or import failed — fail quietly.
    }
  };

  return (
    <div className="alto-ai-tools">
      <div className="alto-ai-title">AI Tools</div>
      <button className="alto-ai-link" type="button" onClick={copyMarkdown}>
        {CopyIcon}
        <span>{copied ? 'Copied!' : 'Copy as Markdown'}</span>
      </button>
      <button className="alto-ai-link" type="button" onClick={askChatGPT}>
        {ChatGptIcon}
        <span>Ask ChatGPT</span>
      </button>
      <button className="alto-ai-link" type="button" onClick={askClaude}>
        {ClaudeIcon}
        <span>Ask Claude</span>
      </button>
    </div>
  );
}
