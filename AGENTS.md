<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# HireLoop client

Single-package Next.js 16 App Router app with React 19, strict TypeScript, and Tailwind CSS v4. `@/*` maps to the repo root. Use npm (`package-lock.json` is committed).

## Commands

- `npm run dev` — dev server on http://localhost:3000.
- `npm run lint` — ESLint (Next core-web-vitals + TypeScript).
- `npm run typecheck` — `tsc --noEmit`.
- `npm run format` — Prettier with no semicolons, double quotes, 80 columns, and Tailwind class sorting.
- `npm run build` / `npm start`.
- Run `npm run lint && npm run typecheck` before finishing. There is no test suite or single-test command.

## Auth and database

- Better Auth is configured in `lib/auth.ts`; its catch-all route is `app/api/auth/[...all]/route.ts`.
- MongoDB is hardcoded to `mongodb://localhost:27017`, database `hireloopdb`. Start a local MongoDB before exercising auth; no env var controls this yet.
- `.env` is gitignored and only defines `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL`. Google sign-in also reads `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`, which are absent; add them or Google login fails.
- `lib/auth-client.ts` currently creates a second, unconfigured client for its exported `signIn` / `signUp` / `useSession`. Prefer the configured `authClient` if you touch this file.

## UI conventions

- shadcn/ui uses the `base-nova` style built on Base UI (`@base-ui/react`), not Radix. Add components with `npx shadcn@latest add <name>`; they land in `components/ui`.
- Tailwind v4 is CSS-first: there is no `tailwind.config.*`; themes and design tokens live in `app/globals.css`.
- `cn` comes from the `cn` package (`@/lib/utils` re-exports it); existing UI code imports it from `"cn"` directly.
