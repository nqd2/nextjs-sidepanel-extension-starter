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

```bash
pnpm build   # exports to out/ and renames _next → next for Chrome
```

Then `chrome://extensions` → **Load unpacked** → select the `out/` folder.

Chrome rejects extension paths starting with `_` (e.g. Next’s `_next/`). The build script fixes that automatically.
