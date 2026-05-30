// Mirror of sidebars.ts, used to render the drawer "Contents" tree on pages
// where Docusaurus does not provide a doc sidebar (e.g. the homepage).
//
// Keep in sync with sidebars.ts. If you add or rename a doc, update both.

export interface DrawerLeaf {
  label: string;
  href: string;
  tag?: string;
}

export interface DrawerGroup {
  label: string;
  collapsed: boolean;
  items: DrawerLeaf[];
}

export const DRAWER_NAV: DrawerGroup[] = [
  {
    label: 'Get Started',
    collapsed: true,
    items: [
      { label: 'How to install your first motor', href: '/docs/get-started/quickstart' },
      { label: 'Which motor is right for me?',     href: '/docs/get-started/choosing-a-motor' },
      { label: 'Safety basics',                    href: '/docs/get-started/safety' },
      { label: 'Glossary',                         href: '/docs/reference/glossary' },
    ],
  },
  {
    label: 'Motors',
    collapsed: true,
    items: [
      { label: 'Motors overview',     href: '/docs/motors/overview' },
      { label: 'BLDC — AL57 series',  href: '/docs/motors/bldc-al57' },
      { label: 'BLDC AL86',           href: '/docs/motors/bldc-al86', tag: 'NEW' },
      { label: 'Induction IEC',       href: '/docs/motors/induction' },
      { label: 'Hall sensor',         href: '/docs/motors/hall-sensor' },
      { label: 'Torque curves',       href: '/docs/motors/torque-curves' },
    ],
  },
  {
    label: 'Drivers & Control',
    collapsed: true,
    items: [
      { label: 'DRV BL120',           href: '/docs/drivers/drv-bl120' },
      { label: 'DRV BL300',           href: '/docs/drivers/drv-bl300' },
      { label: 'Parameter reference', href: '/docs/drivers/parameter-reference' },
      { label: 'Modbus',              href: '/docs/drivers/modbus' },
      { label: 'Fault codes',         href: '/docs/drivers/fault-codes' },
    ],
  },
  {
    label: 'Run & Maintain',
    collapsed: true,
    items: [
      { label: 'Wiring',          href: '/docs/run-maintain/wiring' },
      { label: 'Maintenance',     href: '/docs/run-maintain/maintenance' },
      { label: 'Troubleshooting', href: '/docs/run-maintain/troubleshooting' },
      { label: 'Fault codes',     href: '/docs/run-maintain/fault-codes' },
    ],
  },
  {
    label: 'Reference',
    collapsed: true,
    items: [
      { label: 'IP ratings',  href: '/docs/reference/ip-ratings' },
      { label: 'IEC frames',  href: '/docs/reference/iec-frames' },
      { label: 'Modbus map',  href: '/docs/reference/modbus-map' },
      { label: 'Glossary',    href: '/docs/reference/glossary' },
    ],
  },
];
