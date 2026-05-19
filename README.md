Next.js side panel extension starter. UI from [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app); panel via [`chrome.sidePanel`](https://developer.chrome.com/docs/extensions/reference/api/sidePanel).

## Getting Started

Run the dev server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to preview the side panel UI.

Edit `src/app/page.tsx`. The page hot-reloads as you edit.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to load [Geist](https://vercel.com/font).

## Learn More

- [Side Panel API](https://developer.chrome.com/docs/extensions/reference/api/sidePanel) — `side_panel`, `setOptions`, `open`.
- [Next.js Documentation](https://nextjs.org/docs) — features and API.
- [Learn Next.js](https://nextjs.org/learn) — tutorial.

## Load in Chrome

Build static export, then load `out/` as an unpacked extension. Set `side_panel.default_path` to your exported `index.html` (e.g. `index.html`).
