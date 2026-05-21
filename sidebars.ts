import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Get Started',
      collapsed: false,
      items: [
        'get-started/quickstart',
        'get-started/choosing-a-motor',
        'get-started/safety',
        'reference/glossary',
      ],
    },
    {
      type: 'category',
      label: 'Motors',
      collapsed: false,
      items: [
        'motors/overview',
        'motors/bldc-al57',
        'motors/bldc-al86',
        'motors/induction',
        'motors/hall-sensor',
        'motors/torque-curves',
      ],
    },
    {
      type: 'category',
      label: 'Drivers & Control',
      collapsed: true,
      items: [
        'drivers/drv-bl120',
        'drivers/drv-bl300',
        'drivers/parameter-reference',
        'drivers/modbus',
        'drivers/fault-codes',
      ],
    },
    {
      type: 'category',
      label: 'Run & Maintain',
      collapsed: true,
      items: [
        'run-maintain/wiring',
        'run-maintain/maintenance',
        'run-maintain/troubleshooting',
        'run-maintain/fault-codes',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsed: true,
      items: [
        'reference/ip-ratings',
        'reference/iec-frames',
        'reference/modbus-map',
        'reference/glossary',
      ],
    },
  ],
};

export default sidebars;
