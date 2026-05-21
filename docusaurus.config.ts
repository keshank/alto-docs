import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Alto Motors Docs',
  tagline: 'Plain-language guides, wiring diagrams, and troubleshooting for Alto Motors systems.',
  favicon: 'img/favicon.ico',
  url: 'https://docs.altomotors.in',
  baseUrl: '/',
  organizationName: 'keshank',
  projectName: 'alto-docs',
  onBrokenLinks: 'warn',
  future: { v4: true },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Source+Sans+3:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap',
      type: 'text/css',
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/keshank/alto-docs/edit/main/',
          showLastUpdateTime: false,
          showLastUpdateAuthor: false,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    announcementBar: {
      id: 'al86-launch',
      content:
        'New: AL86 series datasheets & wiring diagrams are live. <a href="/docs/motors/bldc-al86" style="color:#D70000;font-weight:600;margin-left:6px;">Read what\'s new →</a>',
      backgroundColor: '#0d0d0d',
      textColor: '#ffffff',
      isCloseable: true,
    },
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      hideOnScroll: false,
      logo: {
        alt: 'Alto Motors',
        src: 'img/alto-logo.svg',
        srcDark: 'img/alto-logo.svg',
        href: '/',
        width: 57,
        height: 32,
      },
      items: [
        // "DOCS" mono pill — sits right of the logo
        {
          type: 'html',
          position: 'left',
          value: '<span class="navbar-docs-tag">DOCS</span>',
        },
        // Centred search bar
        {
          type: 'html',
          position: 'left',
          className: 'navbar-search-outer',
          value: '<div class="navbar-search-bar" role="button" tabindex="0" aria-label="Search documentation"><svg class="search-glass" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><span class="search-ph">Search documentation</span><span class="search-kbd"><kbd>⌘</kbd><kbd>K</kbd></span></div>',
        },
        // v3.2 version pill (right)
        {
          type: 'html',
          position: 'right',
          value: '<div class="navbar-version-pill"><span class="navbar-vdot"></span><span>v3.2</span><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--alto-ink-400)"><path d="m6 9 6 6 6-6"/></svg></div>',
        },
        // altomotors.in link (right)
        {
          type: 'html',
          position: 'right',
          value: '<a href="https://altomotors.in" class="navbar__item navbar__link navbar-site-link" target="_blank" rel="noopener">altomotors.in ↗</a>',
        },
      ],
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: false,
      },
    },
    footer: {
      style: 'light',
      copyright: `© ${new Date().getFullYear()} Alto Motors Pvt. Ltd. · Bengaluru, India`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: ['bash', 'json', 'ini'],
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 3,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
