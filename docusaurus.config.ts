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
  future: {
    v4: true,
    faster: {
      swcJsLoader: true,
      swcJsMinimizer: true,
      swcHtmlMinimizer: true,
      lightningCssMinimizer: true,
      rspackBundler: false,
      rspackPersistentCache: false,
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Mobile navbar search: expand-on-tap + close button (see src/clientModules)
  clientModules: [require.resolve('./src/clientModules/mobileSearchClose.ts')],

  // Local search — builds an offline search index at build time
  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        searchBarShortcut: true,
        searchBarShortcutHint: true,
      },
    ],
  ],

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
      // false = one click toggles; true causes the well-known "first click does nothing" bug
      respectPrefersColorScheme: false,
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
        // "/" divider + "DOCS" mono pill — matches design lockup: Alto / DOCS
        {
          type: 'html',
          position: 'left',
          className: 'navbar-lockup-item',
          value: '<span class="navbar-logo-sep">/</span><span class="navbar-docs-tag">DOCS</span>',
        },
        // Search slot — search-local plugin renders <div class="navbar__search"> here
        {
          type: 'search',
          position: 'left',
          className: 'navbar-search-outer',
        },
        // altomotors.in link (right)
        {
          type: 'html',
          position: 'right',
          value: '<a href="https://altomotors.in" class="navbar__item navbar__link navbar-site-link" target="_blank" rel="noopener">altomotors.in ↗</a>',
        },

        // ─── Mobile drawer nav links (hidden on desktop via .navbar-mobile-only) ───
        { type: 'doc', docId: 'get-started/quickstart',     position: 'right', label: 'Quickstart',      className: 'navbar-mobile-only' },
        { type: 'doc', docId: 'get-started/choosing-a-motor', position: 'right', label: 'Choosing a motor', className: 'navbar-mobile-only' },
        { type: 'doc', docId: 'motors/overview',            position: 'right', label: 'Motors',          className: 'navbar-mobile-only' },
        { type: 'doc', docId: 'run-maintain/fault-codes',   position: 'right', label: 'Fault codes',     className: 'navbar-mobile-only' },
      ],
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: false,
      },
    },
    // Footer is rendered as a custom component on the homepage (src/pages/index.tsx).
    // For doc pages, keep a minimal copyright via Docusaurus's built-in footer.
    footer: {
      style: 'light',
      copyright: `© ${new Date().getFullYear()} Alto. All Rights Reserved.`,
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
