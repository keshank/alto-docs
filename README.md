# Alto Motors Documentation

The documentation website for Alto Motors — plain-language guides, wiring diagrams, troubleshooting, and datasheets for our BLDC and induction motor systems.

🌐 **Live site:** [docs.altomotors.in](https://docs.altomotors.in) *(coming soon)*
🏢 **Company:** [altomotors.in](https://altomotors.in)

Built with [Docusaurus 3](https://docusaurus.io/) — written for the people on the factory floor, not just engineers.

---

## Tech stack

- **Framework:** Docusaurus 3.10 (TypeScript, MDX)
- **Search:** `@easyops-cn/docusaurus-search-local` (offline, no API keys)
- **Design system:** custom CSS tokens (`src/css/custom.css`) — Alto red (`#D70000`), Barlow + Source Sans 3 + JetBrains Mono
- **Deployment target:** any static host (Vercel, Netlify, Cloudflare Pages)

---

## Running locally

Prerequisites: **Node.js 18+** and **npm**.

```bash
# install dependencies
npm install

# start the dev server with hot reload
npm start
# → opens at http://localhost:3000/
```

### Run on your LAN (test on phone/tablet)

```bash
# pick a port and bind to all network interfaces
npm start -- --port 3003 --host 0.0.0.0
# → also reachable from other devices on the same Wi-Fi at http://<your-LAN-IP>:3003/
```

On first connection from another device, allow Node.js through Windows Firewall when prompted.

---

## Building for production

```bash
# build static site into /build
npm run build

# serve the production build locally to verify
npm run serve
```

The search index is built during `npm run build`, so search only returns real results in the production build (dev mode shows a placeholder message).

---

## Project structure

```
alto-docs/
├── docs/                  # all documentation pages (.md / .mdx)
│   ├── get-started/       # quickstart, choosing a motor, safety
│   ├── motors/            # BLDC, induction datasheets + wiring
│   ├── drivers/           # DRV-BL120, DRV-BL300
│   ├── run-maintain/      # wiring, maintenance, troubleshooting, fault codes
│   └── reference/         # glossary, IP ratings, frame sizes, Modbus
├── src/
│   ├── css/custom.css     # design system + all custom styles
│   └── pages/index.tsx    # custom homepage (hero + sections + footer)
├── static/img/            # logo, favicon, etc.
├── docusaurus.config.ts   # site config (navbar, footer, plugins)
└── sidebars.ts            # left-sidebar tree shown on doc pages
```

---

## Adding or editing content

1. Find or create the appropriate `.md` file in `docs/`.
2. Each doc has frontmatter at the top:
   ```yaml
   ---
   id: my-page
   title: My Page Title
   sidebar_label: Short label
   description: Used by search engines and previews.
   tags: [bldc, wiring]
   ---
   ```
3. If it's a new page, also add it to `sidebars.ts` so it shows up in the left sidebar.
4. Run `npm start` to preview your changes.

For "Edit this page" links to work, this repo must be public (`editUrl` in `docusaurus.config.ts` points here).

---

## Deployment

Any static host works. Suggested setup with **Vercel** or **Netlify**:

1. Connect this GitHub repo
2. Set build command: `npm run build`
3. Set output directory: `build`
4. Point `docs.altomotors.in` DNS at the host

---

## License

© Alto Motors Pvt. Ltd. — All rights reserved.
