import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

// ---- Icons ----
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
  </svg>
);
const ChevRIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
  </svg>
);
const ClockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.66.66 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
  </svg>
);
const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 7.5s-.2-1.6-.8-2.3c-.8-.9-1.7-.9-2.1-1C17 4 12 4 12 4s-5 0-8.1.2c-.4 0-1.3 0-2.1 1C1.2 5.9 1 7.5 1 7.5S.8 9.4.8 11.3v1.8c0 1.9.2 3.8.2 3.8s.2 1.6.8 2.3c.8.9 1.9.9 2.4 1C5.9 20.4 12 20.5 12 20.5s5 0 8.1-.2c.4 0 1.3 0 2.1-1 .6-.7.8-2.3.8-2.3s.2-1.9.2-3.8v-1.8C23.2 9.4 23 7.5 23 7.5zM9.7 15.2V8.5l6.4 3.4z" />
  </svg>
);

// ---- Data ----
const START_HERE = [
  {
    num: '01',
    title: "I'm setting up a new motor",
    desc: 'Quickstart for first-time installation, wiring, and power-on.',
    href: '/docs/get-started/quickstart',
  },
  {
    num: '02',
    title: "I need to fix a fault",
    desc: 'Look up a fault code or symptom and find the proven fix.',
    href: '/docs/run-maintain/fault-codes',
  },
  {
    num: '03',
    title: "I'm choosing what to order",
    desc: 'Match your duty cycle and supply to the right model.',
    href: '/docs/get-started/choosing-a-motor',
  },
];

type Difficulty = 'Easy' | 'Medium' | 'Advanced';
interface DocItem {
  title: string;
  desc: string;
  time: string;
  diff: Difficulty;
  href: string;
}
interface Section {
  num: string;
  title: string;
  desc: string;
  items: DocItem[];
}

const HOME_SECTIONS: Section[] = [
  {
    num: '01',
    title: 'Get started',
    desc: 'Everything you need to unbox, mount, and power on safely.',
    items: [
      { title: 'How to install your first motor', desc: 'A 30-minute walkthrough from box to first spin.', time: '5 min', diff: 'Easy', href: '/docs/get-started/quickstart' },
      { title: 'Which motor is right for me?', desc: 'Side-by-side comparison of BLDC, induction, and servo.', time: '8 min', diff: 'Easy', href: '/docs/get-started/choosing-a-motor' },
      { title: 'Safety basics before you start', desc: 'Required PPE, lock-out tag-out, and grounding.', time: '4 min', diff: 'Easy', href: '/docs/get-started/safety' },
      { title: 'Glossary of motor terms', desc: 'Plain-English definitions for torque, slip, KV, and 22 more.', time: 'Reference', diff: 'Easy', href: '/docs/reference/glossary' },
    ],
  },
  {
    num: '02',
    title: 'Motors & drivers',
    desc: 'Datasheets, wiring, and parameter tuning for every model we make.',
    items: [
      { title: 'BLDC motors — AL57 & AL86 series', desc: 'Spec sheets, dimensional drawings, and torque curves.', time: '12 min', diff: 'Medium', href: '/docs/motors/bldc-al57' },
      { title: 'Induction motors — IEC 63 – 132', desc: 'Three-phase and single-phase with full performance data.', time: '10 min', diff: 'Medium', href: '/docs/motors/induction' },
      { title: 'DRV-BL120 / DRV-BL300 drivers', desc: 'Wiring, parameter reference, and Modbus register map.', time: '15 min', diff: 'Medium', href: '/docs/drivers/drv-bl120' },
      { title: 'Hall sensor setup & alignment', desc: 'Confirming polarity and recovering from a phase swap.', time: '7 min', diff: 'Medium', href: '/docs/motors/hall-sensor' },
    ],
  },
  {
    num: '03',
    title: 'Run & maintain',
    desc: 'Keep machines running, find the cause when they don\'t.',
    items: [
      { title: 'Wiring & power supply sizing', desc: 'Conductor sizing, gland selection, and earth bonding.', time: '9 min', diff: 'Medium', href: '/docs/run-maintain/wiring' },
      { title: 'Inspection & maintenance schedule', desc: 'What to check at 100, 500, and 5,000 running hours.', time: '6 min', diff: 'Easy', href: '/docs/run-maintain/maintenance' },
      { title: 'Troubleshooting — symptom finder', desc: "Pick a symptom; we'll point you to the cause and the fix.", time: 'Interactive', diff: 'Easy', href: '/docs/run-maintain/troubleshooting' },
      { title: 'Fault code lookup (F00 – F47)', desc: 'What each driver fault code means, in plain language.', time: 'Reference', diff: 'Easy', href: '/docs/run-maintain/fault-codes' },
    ],
  },
];

const diffClass: Record<Difficulty, string> = {
  Easy: 'easy',
  Medium: 'med',
  Advanced: 'adv',
};

// ---- Components ----
function Hero() {
  return (
    <section className="alto-hero">
      <div className="alto-hero-inner">
        <div className="alto-eyebrow">
          <span className="badge">DOCS</span>
          Updated regularly · v3.2
        </div>
        <h1 className="alto-h1">
          Run your Alto motor with <span className="accent">confidence.</span>
        </h1>
        <p className="alto-lede">
          Plain-language guides, wiring diagrams, and troubleshooting —
          written for the people on the factory floor, not just engineers.
        </p>
        <Link to="/docs/get-started/quickstart" className="alto-hero-search">
          <SearchIcon />
          <span className="ph">
            Search — try <em>"fault code F03"</em> or <em>"AL57 wiring"</em>
          </span>
          <button className="go">
            <span className="go-text">Browse docs</span>
            <ChevRIcon />
          </button>
        </Link>
        <div className="alto-hero-suggest">
          <span className="lbl">Popular</span>
          <Link to="/docs/motors/bldc-al57#wiring">Wiring an AL57</Link>
          <Link to="/docs/run-maintain/fault-codes#f03">Fault code F03</Link>
          <Link to="/docs/drivers/drv-bl120#sizing">Sizing a driver</Link>
          <Link to="/docs/run-maintain/maintenance#bearings">Bearing replacement</Link>
        </div>
      </div>
    </section>
  );
}

function StartHere() {
  return (
    <section className="alto-starthere">
      <div className="alto-starthere-inner">
        {START_HERE.map((item) => (
          <Link key={item.num} to={item.href} className="alto-starthere-item">
            <div className="num">{item.num}</div>
            <div>
              <div className="ti">{item.title}</div>
              <div className="de">{item.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function DocList({ items }: { items: DocItem[] }) {
  return (
    <ul className="alto-list">
      {items.map((item) => (
        <li key={item.title}>
          <Link to={item.href} style={{ display: 'contents', color: 'inherit', textDecoration: 'none' }}>
            <span className="ti">
              {item.title}
              <span className="de">{item.desc}</span>
            </span>
            <span className="meta">
              <span className="pill">
                <ClockIcon /> {item.time}
              </span>
              <span className={`pill ${diffClass[item.diff]}`}>{item.diff}</span>
            </span>
            <span className="ar"><ChevRIcon /></span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Sections() {
  return (
    <main className="alto-sections">
      {HOME_SECTIONS.map((sec) => (
        <div key={sec.num} className="alto-section">
          <div className="alto-section-head">
            <div className="alto-section-num">SECTION {sec.num}</div>
            <h2 className="alto-section-title">{sec.title}</h2>
            <div className="alto-section-desc">{sec.desc}</div>
          </div>
          <DocList items={sec.items} />
        </div>
      ))}
    </main>
  );
}

function FooterCTA() {
  return (
    <div className="alto-footer-cta">
      <div className="alto-footer-cta-inner">
        <div>
          <div className="label">STILL STUCK?</div>
          <h3>Talk to an actual engineer.</h3>
          <p>
            Our technical team responds within one business day.
            Reach out by email — no bots, no scripted replies.
          </p>
        </div>
        <div className="alto-footer-cta-btns">
          <a href="mailto:support@altomotors.in" className="alto-btn-primary">
            Email support
          </a>
          <a href="https://altomotors.in/contact" className="alto-btn-ghost" target="_blank" rel="noopener noreferrer">
            Visit altomotors.in
          </a>
        </div>
      </div>
    </div>
  );
}

function FooterBrand() {
  return (
    <div style={{
      background: 'var(--alto-paper)',
      borderTop: '1px solid var(--alto-border)',
      padding: '32px 48px',
    }}>
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 20,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
          <span className="alto-stamp">
            <span className="dot" />
            All systems operational
          </span>
          <div className="alto-social">
            <a href="https://linkedin.com/company/altomotors" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <LinkedinIcon />
            </a>
            <a href="https://youtube.com/@altomotors" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <YoutubeIcon />
            </a>
          </div>
        </div>
        <div style={{ fontSize: 12.5, color: 'var(--alto-ink-400)' }}>
          © {new Date().getFullYear()} Alto Motors Pvt. Ltd. · Bengaluru, India
        </div>
      </div>
    </div>
  );
}

// ---- Page ----
export default function Home(): ReactNode {
  return (
    <Layout
      title="Alto Motors Documentation"
      description="Plain-language guides, wiring diagrams, and troubleshooting for Alto Motors BLDC and induction motor systems."
    >
      <Hero />
      <StartHere />
      <Sections />
      <FooterCTA />
      <FooterBrand />
    </Layout>
  );
}
