# AGENTS.md

Context for AI coding agents (Claude Code, Copilot, Cursor, etc.) working on this repository. Read this before making changes.

## What this site is

The public website for **Tokgöz Lab**, a research group led by **Korkut Kaan Tokgöz** in the Electronics Engineering department at **Sabancı University** (Istanbul). The lab works on energy-efficient millimeter-wave and sub-terahertz CMOS circuits, integrated systems, 6G wireless, sensors, Edge AI, and IoT hardware.

- Live URL: `https://fatihardazengin.github.io/tokgozlab`
- This is a **real, in-production lab site**, not a template demo. Content (team bios, publications, projects) is genuine and should stay accurate — don't reintroduce placeholder/sample data.
- Currently the team has **one member** (the PI). The team page groups by role and is designed to scale as students join; don't assume a large roster.

## Origin and history

This started from the open-source **"Scholar-Lite"** Astro template (`fjd2004711/scholar-lite`), then was heavily customized. Consequences of that origin worth knowing:

- Some directories under `src/content/` (`books`, `patents`, `softwares`, `honors`, `activities`, `news`) exist from the template's scaffolding but are **empty and not registered** in `src/content.config.ts` — only `publications`, `team`, and `research` are real, working collections. Don't build features assuming the others work; either register them properly first or ignore them.
- `scripts/import-bibtex.js` still writes `@book` BibTeX entries into `src/content/books/` — **this is currently a dead end** since `books` isn't a registered collection, so book entries silently never render anywhere. If book support is ever needed, either add `books` to `src/content.config.ts` and give it pages, or change the importer to fold books into the `publications` collection using its existing `type: "book"` enum value (which the schema already supports and the rest of the codebase does not yet consume).
- The two READMEs (`README.md`, `README.tr.md`) previously described generic template features (fake Netlify/Vercel deploy buttons, an "8-language i18n" claim, a Hugo Academic comparison table). Those were rewritten in 2026-09 to describe only what this fork actually does. `SITE.i18n.enabled` in `src/config.ts` is `false` — there is no working i18n; don't trust old commit messages or stale docs that imply otherwise.

## Tech stack

- **Astro 5** (islands architecture, static output). Despite what old README badges said, this is not Astro v6.
- **React** — only used for `lucide-react` icons inside `.astro` components; there is no client-side React app. Pages ship ~0 KB of JS by default.
- **Tailwind CSS v4** via `@tailwindcss/vite`, utility classes inline in `.astro` files. No separate design-token file — colors are hardcoded hex values repeated across components (primary navy `#002776`, teal accent `#00a6a6`/`#007f80`, amber `#ffb547`, dark panel `#061a2b`, ink `#071b26`). Match these when adding UI rather than inventing new colors.
- **Pagefind** for static full-text search, indexed at build time (`pagefind --site dist`), rendered on `/search` via `PagefindUI`.
- **Satori + resvg** generate per-page OG images at build time (`src/pages/og/[...slug].png.ts`), using the local `Inter` woff fonts in `public/fonts/`.
- Content is Markdown with typed frontmatter via Astro's content collections (`src/content.config.ts`, Zod schemas).

## Deployment: GitHub Pages under a subpath — the one thing to never break

This site deploys via `.github/workflows/pages.yml` to GitHub Pages at a **project subpath**, not a custom domain:

```js
// astro.config.mjs
site: 'https://fatihardazengin.github.io',
base: '/tokgozlab',
```

Because of `base`, **every internal link and every reference to a `public/` asset must go through the `withBase()` helper** in `src/config.ts`:

```ts
export const withBase = (path: string) => { ... } // '/research' -> '/tokgozlab/research'
```

A literal `href="/research"` or `src="/favicon.svg"` will 404 in production (it resolves to the domain root, not `/tokgozlab/...`) even though it works fine in `astro dev`. This exact class of bug was the subject of a full-repo fix (commit `5f4e021`, "Sa") that swept every hardcoded absolute path to `withBase()`. **When adding any new internal `<a href>`, `<img src>`, canonical URL, or OG URL, wrap the path in `withBase()`.** External links (to `sabanciuniv.edu`, Google Scholar, etc.) are fine as plain absolute URLs.

If the site ever moves to a custom domain or a different repo name, both `site` and `base` in `astro.config.mjs` need to change together, and `scripts/generate-sitemap.js`'s hardcoded `SITE_URL` and `public/robots.txt`'s `Sitemap:` line need to be updated to match (see below — they are not derived automatically from `astro.config.mjs`).

## Content model

Three collections, defined in `src/content.config.ts`:

| Collection | Source | Key fields | Sort |
|---|---|---|---|
| `publications` | `src/content/publications/*.md` | `title`, `authors[]`, `year`, `venue`, `type` (paper/book/patent/software), `cover`, `links.{pdf,code,website,demo,slides,video}`, `badges[]`, `featured` | by `year` desc |
| `team` | `src/content/team/*.md` | `name`, `role` (enum, see schema), `avatar`, `bio`, `email`, social links, `weight` | by `weight` asc |
| `research` | `src/content/research/*.md` | `title`, `description`, `cover`, `order` | by `order` asc |

Images referenced in frontmatter (e.g. `avatar: "../../assets/x.jpg"`) must live under `src/assets/` and be imported via Astro's `image()` schema helper — this gets them optimized/compressed at build time. Anything placed in `public/` bypasses that optimization and is served as-is; `public/` is reserved for truly static files (favicon, fonts, robots.txt, the small lab mark SVG).

### Publications: BibTeX import pipeline

`citations.bib` (repo root) → `npm run import-bibtex` (`scripts/import-bibtex.js`) → regenerates `src/content/publications/*.md`. It's a **plain Node script using `fs`**, no Astro APIs — it re-derives filenames from `year-firstAuthor-titleSlug`, so re-running it after editing `citations.bib` will overwrite previously generated files with the same derived name. It does preserve a manually-set `featured: true` across re-imports by reading the existing file first, but no other manual edits to a generated `.md` file survive a re-import — if you hand-edit a publication file, expect it to be clobbered next time someone runs the importer with an unchanged `citations.bib` entry.

## Pages (`src/pages/`)

- `index.astro` — homepage: hero, featured research areas, featured publications.
- `research/index.astro`, `research/[slug].astro` — research area listing + detail (Markdown body rendered via `render()`).
- `projects.astro` — **hardcoded** arrays of active/completed projects (not a content collection) — edit this file directly to update project status/dates.
- `publications.astro` — full publication list, filtered to `type === 'paper'`, grouped/sorted by year.
- `team.astro`, `team/[...slug].astro` — team listing (grouped by role) + individual profile pages.
- `join.astro` — "Opportunities" page, static content describing how to apply (mailto link + external university links).
- `search.astro` — Pagefind UI mount point.
- `og/[...slug].png.ts` — generates one OG image per static page + per publication/team/research slug at build time.

## Build-time scripts (`scripts/`, plain Node/ESM, no Astro runtime)

- `import-bibtex.js` — see above.
- `generate-sitemap.js` (added 2026-09) — hand-written, dependency-free sitemap generator. Lists the static routes plus every slug under `src/content/research/` and `src/content/team/`, writes `dist/sitemap.xml`. Chosen over the `@astrojs/sitemap` integration to avoid adding a dependency/lockfile change for a ~12-URL site. **If the site grows a lot of dynamic routes (e.g. publications get their own pages), prefer switching to `npx astro add sitemap` instead of extending this script by hand.** Its `SITE_URL` constant must be kept in sync with `astro.config.mjs`'s `site`+`base`.

`package.json`'s `build` script chains these: `import-bibtex → astro build → generate-sitemap → pagefind index`.

## Known gaps / things intentionally left alone

- `public/_headers` is a Netlify-style security-headers file. **GitHub Pages does not read it** — it's currently inert. Left in place in case the site is ever moved to Netlify/Cloudflare Pages; don't assume its CSP/HSTS headers are actually being served.
- No i18n despite `SITE.i18n` existing in config — it's a stub (`enabled: false`) from the template, not a real feature.
- `package.json` `homepage` field still points at the GitHub repo, not the live site — left alone deliberately as out of scope of prior cleanup.

## Working conventions observed in this repo

- Small, focused commits (one concern per commit — e.g. asset cleanup, README rewrite, and the sitemap script landed as three separate commits, not one).
- Don't push to remote unless explicitly asked — recent work was committed locally and left for the repo owner to push.
- No comments explaining *what* code does; comments only where there's a non-obvious constraint (e.g. the `withBase()` doc comment, the "must match astro.config.mjs" note in `generate-sitemap.js`).
- Prefer a small hand-written script over adding a new npm dependency when the site's scale doesn't warrant it (see the sitemap decision above) — but don't over-apply this; use real dependencies for anything nontrivial (Pagefind, Satori/resvg for OG images were kept as real deps).
- Before trusting an AI agent's assumption about installed tooling: some sandboxed environments running this agent do **not** have `node`/`npm` on `PATH` even though `node_modules/` is already populated (installed from the user's real terminal). If shell commands report `node: command not found`, don't conclude the project has no Node setup — ask the user to run `npm install` / `npm run build` themselves and report back, rather than silently skipping verification or fabricating a result.
