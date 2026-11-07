<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

- Package manager is **npm** (`package-lock.json` is the lockfile; ignore the yarn/pnpm/bun alternatives in README).
- `npm run dev` · `npm run build` · `npm run start` — standard Next.js; Turbopack is the bundler (the `@tailwindcss/turbopack` CSS rule in `next.config.ts` only applies to Turbopack, so don't build with `--webpack`).
- `npm run lint` — runs bare `eslint` (flat config in `eslint.config.mjs`). Exits 0 on warnings; there is currently1 known warning (unused `Image` import in `src/app/page.tsx`).
- **No test runner and no typecheck script exist.** Typecheck with `npx tsc --noEmit`. This requires `.next/types` to exist: generated globals like `LayoutProps<"/">` are written there by `next dev`/`next build`, so run one first on a fresh clone.

## Stack facts that aren't obvious

- Next.js **16.4.3** + React 19.3 + Tailwind **v4** — see the generated block above; verify against `node_modules/next/dist/docs/`, not training data.
- shadcn style is **base-nova** (`components.json`): components under `src/components/ui/` are built on **`@base-ui/react`**, not Radix. Don't paste Radix-based shadcn examples — add components with `npx shadcn add <name>`.
- `cn` is an **npm package** here (not clsx + tailwind-merge). `src/lib/utils.ts` re-exports it, but components import `{ cn } from "cn"` directly.
- Tailwind v4 has no `tailwind.config.js`: theme tokens and CSS variables live in `src/app/globals.css` (`@theme inline` block); it also imports `shadcn/tailwind.css`.
- `next.config.ts` enables `cacheComponents`, `partialPrefetching`, and `reactCompiler` (React Compiler via `babel-plugin-react-compiler`) — caching/data semantics differ from classic App Router; check the bundled docs.

## Layout

- Single app, no workspaces. App Router entrypoints: `src/app/layout.tsx`, `src/app/page.tsx`. Path alias `@/*` → `src/*` (tsconfig + shadcn aliases).
- No CI workflows, no test suites, no other instruction files.
