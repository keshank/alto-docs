import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

// ---- Icons ----
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

// ---- Data ----
type Difficulty = 'Easy' | 'Medium' | 'Advanced';

interface StartHereItem {
  num: string;
  title: string;
  desc: string;
  href: string;
}

interface DocItem {
  title: string;
  desc: string;
  time: string;
  diff: Difficulty;
  href: string;
}

interface HomeSection {
  num: string;
  title: string;
  desc: string;
  items: DocItem[];
}

const START_HERE: StartHereItem[] = [
  { num: '01', title: 'Quickstart Guide', desc: 'The essential 30-minute walkthrough — unboxing, mounting, wiring, and testing.', href: '/docs/get-started/quickstart' },
  { num: '02', title: 'Choosing a motor', desc: 'BLDC vs three-phase AC induction — specs, duty cycles, and selection rules.', href: '/docs/get-started/choosing-a-motor' },
  { num: '03', title: 'Safety guidelines', desc: 'PPE, grounding, lock-out tag-out (LOTO), and factory-floor safety rules.', href: '/docs/get-started/safety' },
];

const HOME_SECTIONS: HomeSection[] = [
  {
    num: '02',
    title: 'Run & Maintain',
    desc: 'Solve electrical or mechanical issues, diagnose faults, and recover your motor system smoothly.',
    items: [
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
          Curated Guides · v0.1
        </div>
        <h1 className="alto-h1">
          Run your Alto motor with <span className="accent">confidence.</span>
        </h1>
        <p className="alto-lede">
          Curated plain-language guides, wiring diagrams, and troubleshooting —
          written for the people on the factory floor, not just engineers.
        </p>
        
        <div className="alto-hero-ctas">
          <Link to="/docs/get-started/quickstart" className="alto-btn-primary">
            ⚡ Get Started
            <ChevRIcon />
          </Link>
          <Link to="/docs/run-maintain/troubleshooting" className="alto-btn-ghost">
            🩺 Diagnostics & Faults
          </Link>
        </div>

        <div className="alto-hero-suggest">
          <span className="lbl">Popular</span>
          <Link to="/docs/get-started/quickstart#step-3--wire-the-power-phases">Wiring a Motor</Link>
          <Link to="/docs/get-started/safety#lock-out-tag-out-loto">Safety / LOTO</Link>
          <Link to="/docs/get-started/choosing-a-motor#quick-comparison">Choosing a motor</Link>
          <Link to="/docs/run-maintain/troubleshooting">Troubleshooting</Link>
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
    </Layout>
  );
}
