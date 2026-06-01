import React, {useEffect, useState, type ReactNode} from 'react';
import {createPortal} from 'react-dom';

/**
 * SuggestEdit — the right-hand TOC "Suggest an edit" action.
 *
 * Opens a small modal where a reader gives their name, email and a suggested
 * edit for the current page. On submit they see a thank-you.
 *
 * NOTE: email delivery is intentionally NOT wired up yet — `deliver()` is a
 * stub. When email is configured later, send the payload there (it already
 * includes the page title + URL).
 */

const PencilIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

interface Payload {
  name: string;
  email: string;
  message: string;
  pageTitle: string;
  pageUrl: string;
}

// TODO: wire up email delivery once configured (e.g. POST to a serverless
// endpoint / form service). For now it just resolves so the UI flow works.
async function deliver(payload: Payload): Promise<void> {
  if (typeof console !== 'undefined') {
    // Leaves a trace during development; remove or replace when email is live.
    console.info('[SuggestEdit] suggestion (email not yet configured):', payload);
  }
  return Promise.resolve();
}

export default function SuggestEdit(): ReactNode {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({name: '', email: '', message: ''});

  const reset = () => {
    setOpen(false);
    setDone(false);
    setSending(false);
    setForm({name: '', email: '', message: ''});
  };

  // Close on Escape; lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') reset();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await deliver({
      ...form,
      pageTitle: document.title,
      pageUrl: window.location.href,
    });
    setSending(false);
    setDone(true);
  };

  const set = (k: 'name' | 'email' | 'message') => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({...f, [k]: e.target.value}));

  const modal = (
    <div className="alto-modal-overlay" onClick={reset}>
      <div
        className="alto-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Suggest an edit"
        onClick={(e) => e.stopPropagation()}>
        <button className="alto-modal-close" onClick={reset} aria-label="Close" type="button">
          ×
        </button>

        {done ? (
          <div className="alto-modal-thanks">
            <div className="alto-modal-thanks-mark" aria-hidden="true">✓</div>
            <h3>Thank you!</h3>
            <p>Your suggestion for this page has been recorded. We really appreciate you helping improve the docs.</p>
            <button className="alto-btn-primary" type="button" onClick={reset}>Done</button>
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <h3>Suggest an edit</h3>
            <p className="alto-modal-sub">
              Spotted something to fix or improve on this page? Tell us and we'll review it.
            </p>
            <label className="alto-field">
              <span>Name</span>
              <input type="text" required value={form.name} onChange={set('name')} placeholder="Your name" />
            </label>
            <label className="alto-field">
              <span>Email</span>
              <input type="email" required value={form.email} onChange={set('email')} placeholder="you@example.com" />
            </label>
            <label className="alto-field">
              <span>Your suggestion</span>
              <textarea required rows={5} value={form.message} onChange={set('message')}
                placeholder="What should change on this page?" />
            </label>
            <button className="alto-btn-primary alto-modal-submit" type="submit" disabled={sending}>
              {sending ? 'Sending…' : 'Send suggestion'}
            </button>
          </form>
        )}
      </div>
    </div>
  );

  return (
    <>
      <button className="alto-toc-foot-link" type="button" onClick={() => setOpen(true)}>
        {PencilIcon}
        <span>Suggest an edit</span>
      </button>
      {open && typeof document !== 'undefined' && createPortal(modal, document.body)}
    </>
  );
}
