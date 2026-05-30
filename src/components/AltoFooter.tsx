import type {ReactNode} from 'react';

const ChevRIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
  </svg>
);
const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.66.66 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
  </svg>
);
const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-10 6L2 7"/>
  </svg>
);
const GlobeIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M2 12h20"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const ChevDownIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

export default function AltoFooter(): ReactNode {
  return (
    <footer className="alto-footer">
      {/* PROLOGUE — Still stuck? CTA */}
      <div className="alto-footer-prologue">
        <div className="prologue-text">
          <div className="label">STILL STUCK?</div>
          <h3>Talk to an actual engineer.</h3>
          <p>
            Our technical team responds within one business day. Reach out
            by email — no bots, no scripted replies.
          </p>
        </div>
        <div className="prologue-cta">
          <a href="mailto:support@altomotors.in" className="alto-btn-primary">
            Email support
            <ChevRIcon />
          </a>
          <a href="https://altomotors.in" target="_blank" rel="noopener noreferrer" className="alto-btn-ghost">
            Visit altomotors.in
          </a>
        </div>
      </div>

      {/* COLUMNS — brand on left, status + social on right */}
      <div className="alto-footer-cols">
        <div className="alto-footer-brand">
          <div className="lockup">
            <img src="/img/alto-logo.svg" alt="Alto" height={24} />
            <span>Alto Motors</span>
          </div>
          <p>
            Plain-language documentation for Alto's BLDC and induction motor
            systems. Built for the people who actually do the work.
          </p>
        </div>
        <div className="alto-footer-aside">
          <span className="alto-stamp">
            <span className="dot" />
            All systems operational
          </span>
          <div className="alto-footer-social">
            <a href="mailto:support@altomotors.in" aria-label="Email">
              <EmailIcon />
            </a>
            <a href="https://linkedin.com/company/altomotors" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <LinkedinIcon />
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM — copyright + language picker */}
      <div className="alto-footer-bottom">
        <div className="alto-footer-bottom-left">
          <span>© {new Date().getFullYear()} Alto. All Rights Reserved.</span>
        </div>
        <div className="alto-footer-bottom-right">
          <button className="alto-lang-picker" type="button">
            <GlobeIcon /> English (IN) <ChevDownIcon />
          </button>
        </div>
      </div>
    </footer>
  );
}
