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

        // ─── Desktop top-nav dropdowns (left). Hidden <=996px (.navbar-desktop-nav)
        //     — on tablet/mobile the same sections live in the hamburger drawer.
        //     Keep these in sync with src/data/drawerNav.ts. ───
        {
          type: 'dropdown',
          label: 'Get Started',
          position: 'left',
          className: 'navbar-desktop-nav',
          items: [
            {label: 'How to install your first motor', to: '/docs/get-started/quickstart'},
            {label: 'Which motor is right for me?', to: '/docs/get-started/choosing-a-motor'},
            {label: 'Safety basics', to: '/docs/get-started/safety'},
            {label: 'Glossary', to: '/docs/reference/glossary'},
          ],
        },
        {
          type: 'dropdown',
          label: 'Motors',
          position: 'left',
          className: 'navbar-desktop-nav',
          items: [
            {label: 'Motors overview', to: '/docs/motors/overview'},
            {label: 'BLDC — AL57 series', to: '/docs/motors/bldc-al57'},
            {label: 'BLDC AL86', to: '/docs/motors/bldc-al86'},
            {label: 'Induction IEC', to: '/docs/motors/induction'},
            {label: 'Hall sensor', to: '/docs/motors/hall-sensor'},
            {label: 'Torque curves', to: '/docs/motors/torque-curves'},
          ],
        },
        {
          type: 'dropdown',
          label: 'Drivers & Control',
          position: 'left',
          className: 'navbar-desktop-nav',
          items: [
            {label: 'DRV BL120', to: '/docs/drivers/drv-bl120'},
            {label: 'DRV BL300', to: '/docs/drivers/drv-bl300'},
            {label: 'Parameter reference', to: '/docs/drivers/parameter-reference'},
            {label: 'Modbus', to: '/docs/drivers/modbus'},
            {label: 'Fault codes', to: '/docs/drivers/fault-codes'},
          ],
        },
        {
          type: 'dropdown',
          label: 'Run & Maintain',
          position: 'left',
          className: 'navbar-desktop-nav',
          items: [
            {label: 'Wiring', to: '/docs/run-maintain/wiring'},
            {label: 'Maintenance', to: '/docs/run-maintain/maintenance'},
            {label: 'Troubleshooting', to: '/docs/run-maintain/troubleshooting'},
            {label: 'Fault codes', to: '/docs/run-maintain/fault-codes'},
          ],
        },
        {
          type: 'dropdown',
          label: 'Reference',
          position: 'left',
          className: 'navbar-desktop-nav',
          items: [
            {label: 'IP ratings', to: '/docs/reference/ip-ratings'},
            {label: 'IEC frames', to: '/docs/reference/iec-frames'},
            {label: 'Modbus map', to: '/docs/reference/modbus-map'},
            {label: 'Glossary', to: '/docs/reference/glossary'},
          ],
        },

        // Search slot — moved to the right (compact) so the left side holds the nav.
        {
          type: 'search',
          position: 'right',
          className: 'navbar-search-outer',
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
