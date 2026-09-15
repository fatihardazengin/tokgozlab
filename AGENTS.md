# AGENTS.md

Context for AI coding agents (Claude Code, Copilot, Cursor, etc.) working on this repository. Read this before making changes.

## What this site is

The public website for **Tokgöz Lab**, a research group led by **Korkut Kaan Tokgöz** in the Electronics Engineering department at **Sabancı University** (Istanbul). The lab works on energy-efficient millimeter-wave and sub-terahertz CMOS circuits, integrated systems, 6G wireless, sensors, Edge AI, and IoT hardware.

- Live URL: `https://tokgozlab.com`
- This is a **real, in-production lab site**, not a template demo. Content (team bios, publications, projects) is genuine and should stay accurate — don't reintroduce placeholder/sample data.
- The team has grown past the PI to ~20 members (Postgraduate/Doctorate/Graduate/Undergraduate/Alumni) via a Google Form intake collected from the group; expect this to keep growing over time. **Do not assume single-member state** in copy, layout, or role-grouping logic. New submissions get turned into `src/content/team/<slug>.md` files by hand (name, role, title, a square photo added to `src/assets/`, bio) — there is no automated form-to-content pipeline.

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

## Deployment: GitHub Pages behind a custom domain

This site deploys via `.github/workflows/pages.yml` to GitHub Pages, served at the custom domain root (no project subpath):

```js
// astro.config.mjs
site: 'https://tokgozlab.com',
```

`public/CNAME` (containing `tokgozlab.com`) is what tells GitHub Pages to serve the custom domain instead of `fatihardazengin.github.io/tokgozlab` — it's a static file copied verbatim into `dist/` on build, not something Astro/Vite processes. **Don't delete it**, and don't rename it — GitHub Pages looks for that exact filename at the domain root.

Since there's no `base` path, a literal `href="/research"` or `src="/favicon.svg"` resolves correctly today. The codebase still routes every internal link and `public/` asset reference through the `withBase()` helper in `src/config.ts` — historically required when the site lived under `/tokgozlab`, now effectively a no-op (`base` is unset). It's left in place rather than stripped from every call site; keep using it for new internal links for consistency, but don't worry if you see a plain absolute path here or there — it won't break anything at the current root deployment.

If the site ever moves again (different domain, or back under a subpath), update **all** of: `site` (and `base`, if reintroduced) in `astro.config.mjs`, `SITE_URL` in `scripts/generate-sitemap.js`, the `Sitemap:` line in `public/robots.txt`, and `public/CNAME` — none of these are derived from each other automatically.

## Content model

Three collections, defined in `src/content.config.ts`:

| Collection | Source | Key fields | Sort |
|---|---|---|---|
| `publications` | `src/content/publications/*.md` | `title`, `authors[]`, `year`, `venue`, `type` (paper/book/patent/software), `description`, `doi`, `award`, `links.{pdf,code,website,demo,slides,video}`, `badges[]`, `featured` | by `year` desc |
| `team` | `src/content/team/*.md` | `name`, `role` (enum, see schema), `title[]`, `avatar`, `bio`, `email`, social links, `weight` | by `weight` asc |
| `research` | `src/content/research/*.md` | `title`, `description`, `order` | by `order` asc |

(There is no `cover` field on any collection — it existed in both schemas plus matching import-bibtex.js validation/fallback logic, but was never rendered anywhere in the UI, so it was removed in full, commit `07d8757`. Don't reintroduce a `cover:` field without also wiring it into the templates that would display it.)

Images referenced in frontmatter (e.g. `avatar: "../../assets/x.jpg"`) must live under `src/assets/` and be imported via Astro's `image()` schema helper — this gets them optimized/compressed at build time. Anything placed in `public/` bypasses that optimization and is served as-is; `public/` is reserved for truly static files (favicon, fonts, robots.txt, the small lab mark SVG).

### Publications: BibTeX import pipeline

`citations.bib` (repo root) → `npm run import-bibtex` (`scripts/import-bibtex.js`) → regenerates `src/content/publications/*.md`. It's a **plain Node script using `fs`**, no Astro APIs — it re-derives filenames from `year-firstAuthor-titleSlug`, so re-running it after editing `citations.bib` will overwrite previously generated files with the same derived name. It does preserve a manually-set `featured: true` across re-imports by reading the existing file first, but no other manual edits to a generated `.md` file survive a re-import — if you hand-edit a publication file, expect it to be clobbered next time someone runs the importer with an unchanged `citations.bib` entry.

## How to add content (recipes)

`README.md`/`README.tr.md` have the full walkthrough aimed at non-developers (exact field-by-field explanations, where to get a BibTeX entry, etc.) — read one of those for the complete picture. This section is the compressed version for acting directly.

**Add a team member**: create `src/content/team/<slug>.md` (slug = filename, becomes `/team/<slug>`). Required: `name`, `role` (must be **exactly** one of `Principal Investigator`, `Postgraduate`, `Doctorate`, `Graduate`, `Undergraduate`, `Alumni` — any other string fails schema validation and breaks the whole build), `avatar` (path to a square photo you first add under `src/assets/`, referenced as `"../../assets/<file>"`). Optional: `title[]`, `bio`, `email`, `website` (institutional/university profile link), `personalWebsite` (their own site), `linkedin`, `github`, `twitter`, `googleScholar`, `weight` (sort order *within* the role group, lower = first, default 100). Body text below the frontmatter is the long-form bio (Markdown). Each role is also its own `/team` section, in that order; a section only appears once someone with that role exists. Each profile page also auto-lists that person's own publications by doing a plain string match of `name` against every publication's `authors[]` — keep spelling identical between the two, or the match silently fails and nothing shows (see `src/pages/team/[...slug].astro`).

**Add a publication**: prefer editing `citations.bib` (repo root) and letting `scripts/import-bibtex.js` regenerate `src/content/publications/*.md` — don't hand-write publication `.md` files unless the entry has no BibTeX source at all. The importer runs automatically as the first step of `npm run build`, so committing an updated `citations.bib` is sufficient; running `npm run import-bibtex` locally is only needed to preview the result. Field mapping (BibTeX → schema) lives in `scripts/import-bibtex.js`; the README has the full table. Two things worth knowing before touching this: (1) only entries whose derived `type` is `"paper"` show up on `/publications` — `@book` entries are parsed but land in the dead `books`-collection path described above and render nowhere; (2) re-running the importer regenerates a file's frontmatter from scratch (filename = `year-firstAuthor-titleSlug.md`), clobbering any manual edit to that file except a hand-set `featured: true`, which is read back and preserved.

**Add a research area**: create `src/content/research/<slug>.md` with `title`, `description` (required), `order` (optional, default 100, lower sorts first). Body is the Markdown page content.

**Add/edit a project**: edit the `activeProjects`/`completedProjects` arrays in `src/data/projects.ts` directly — plain object literals, no schema/build step involved. The first 3 entries of `activeProjects` also feed the homepage teaser (`index.astro`), so reordering here changes both pages.

**Change site-wide settings** (contact email, phone/address, PI's external profile links, nav menu items, social icons): edit the `SITE`/`SOCIALS` objects in `src/config.ts`. Don't rename the `key` values inside `SITE.nav` entries — components filter on them (`Header.astro`, `Layout.astro` footer).

## Pages (`src/pages/`)

- `index.astro` — homepage: hero, featured research areas, top 3 of `activeProjects` (see below), featured publications.
- `research/index.astro`, `research/[slug].astro` — research area listing + detail (Markdown body rendered via `render()`).
- `projects.astro` — full active/completed project lists. Imports `activeProjects`/`completedProjects` from `src/data/projects.ts` — a plain TS array, **not** a content collection. Edit that data file, not this page, to change project status/dates.
- `publications.astro` — full publication list, filtered to `type === 'paper'`, grouped/sorted by year. Each title links to that paper's own detail page (below); the DOI/Publisher button stays a separate external link.
- `publications/[...slug].astro` (added 2026-09) — one static detail page per publication (`type === 'paper'` only), slug = `entry.id`. Shows title/authors/venue/abstract/links, plus **Google Scholar / Highwire Press citation meta tags** (`citation_title`, one `citation_author` per author, `citation_publication_date`, `citation_doi`, and `citation_journal_title` *or* `citation_conference_title` — only emitted when the venue string safely matches a journal/conference keyword heuristic, otherwise omitted rather than guessed) and a `ScholarlyArticle` JSON-LD block. Never invents `citation_pdf_url` from a DOI/publisher link — only ever from a link actually hosted on this site.
- `team.astro`, `team/[...slug].astro` — team listing (grouped by role) + individual profile pages. Each profile page also auto-lists that person's own publications via a plain-string match of `name` against every publication's `authors[]` (see the "Add a team member" recipe below for the gotcha).
- `join.astro` — "Opportunities" page, static content describing how to apply (mailto link + external university links).
- `search.astro` — Pagefind UI mount point. Sends `robots="noindex, follow"` to `Layout` (see SEO section) and is deliberately excluded from `sitemap.xml` — it has no unique indexable content of its own.
- `og/[...slug].png.ts` — generates one OG image per static page + per publication/team/research slug at build time.
- `404.astro` — branded not-found page; Astro emits it as `dist/404.html`, which GitHub Pages serves automatically for any unmatched path (site is at the domain root now, not under `/tokgozlab/` — see Deployment section).

## Build-time scripts (`scripts/`, plain Node/ESM, no Astro runtime)

- `import-bibtex.js` — see above.
- `generate-sitemap.js` (added 2026-09) — hand-written, dependency-free sitemap generator. Lists the static routes plus every slug under `src/content/research/`, `src/content/team/`, and every `type: "paper"` slug under `src/content/publications/` (excluding `search`), writes `dist/sitemap.xml`. Chosen over the `@astrojs/sitemap` integration to avoid adding a dependency/lockfile change for a small site. Its `SITE_URL` constant must be kept in sync with `astro.config.mjs`'s `site`. **Gotcha already hit once:** this script reads raw filenames off disk, but Astro's content-collection glob loader lowercases the filename to derive each entry's real `id`/route (e.g. `2016-Tokgöz-....md` → route `2016-tokgöz-...`). The slug helpers here `.toLowerCase()` the filename-derived slug to match — if you add a new slug-deriving helper to this file, do the same, or mixed-case source filenames will produce sitemap URLs that 404.

`package.json`'s `build` script chains these: `import-bibtex → astro build → generate-sitemap → pagefind index`.

## SEO / structured data / AI-crawler discoverability (added 2026-09)

- `src/layouts/Layout.astro` renders one `@graph` JSON-LD block **on every page** (not homepage-only): `WebSite` (`@id` `#website`, `publisher` pointing at the lab) → `ResearchOrganization` (`@id` `#lab`, `knowsAbout` pulled live from the `research` collection's titles) → `Person` (`@id` `#principal-investigator`, `description` pulled from Korkut's own `team` entry `bio`, same `knowsAbout`). If you add a new page type that has its own structured data (like publications' `ScholarlyArticle`, below), add it via the `<slot name="head" />` in `Layout.astro` + `<Fragment slot="head">…</Fragment>` in the page — **do not** touch or duplicate this existing graph to do it.
- `Layout.astro` takes an optional `robots` prop, default `"index, follow"`. `search.astro` is the only page currently overriding it (`"noindex, follow"`) — follow that pattern (prop, not a one-off `<meta>` hack) for any future non-indexable page.
- `publications/[...slug].astro` uses that same `head` slot for its citation meta tags + `ScholarlyArticle` JSON-LD (see Pages section above for what's emitted and the "don't invent metadata" rule it follows).
- `public/llms.txt` — a plain-language, non-HTML summary of the lab/PI/key pages for AI assistants that support the emerging `llms.txt` convention. Keep it in sync by hand if the lab's core description or key page list changes; nothing regenerates it automatically.
- `robots.txt` is a blanket `Allow: /` for all user agents (including AI crawlers — GPTBot, ClaudeBot, PerplexityBot, etc.) — that's deliberate, don't narrow it without being asked.

## Known gaps / things intentionally left alone

- `public/_headers` is a Netlify-style security-headers file. **GitHub Pages does not read it** — it's currently inert. Left in place in case the site is ever moved to Netlify/Cloudflare Pages; don't assume its CSP/HSTS headers are actually being served.
- No i18n despite `SITE.i18n` existing in config — it's a stub (`enabled: false`) from the template, not a real feature.
- `package.json` `homepage` field still points at the GitHub repo, not the live site — left alone deliberately as out of scope of prior cleanup.
- The homepage's "Research network" partner-logo marquee (`index.astro`, TÜBİTAK/Turkish Aerospace logos in `src/assets/`) is fully built but hidden behind `const SHOW_RESEARCH_NETWORK = false` — flip it to `true` to bring it back rather than re-adding the section from scratch.

## Working conventions observed in this repo

- Small, focused commits (one concern per commit — e.g. asset cleanup, README rewrite, and the sitemap script landed as three separate commits, not one).
- Don't push to remote unless explicitly asked — recent work was committed locally and left for the repo owner to push.
- No comments explaining *what* code does; comments only where there's a non-obvious constraint (e.g. the `withBase()` doc comment, the "must match astro.config.mjs" note in `generate-sitemap.js`).
- Prefer a small hand-written script over adding a new npm dependency when the site's scale doesn't warrant it (see the sitemap decision above) — but don't over-apply this; use real dependencies for anything nontrivial (Pagefind, Satori/resvg for OG images were kept as real deps).
- Before trusting an AI agent's assumption about installed tooling: some sandboxed environments running this agent do **not** have `node`/`npm` on `PATH` even though `node_modules/` is already populated (installed from the user's real terminal). If Node isn't available, install it yourself via `nvm` (`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash`, then `nvm install --lts`) rather than asking the user to verify things manually — but note the sandbox's per-command shell doesn't persist PATH changes from `~/.zshrc`/`~/.zshenv` reliably, so every single Bash call that needs `node`/`npm`/`npx` must start with `source "$HOME/.nvm/nvm.sh"` first, every time — it will not "stick" across tool calls.
- This sandbox generally **cannot `git push`** (no credentials — `could not read Username for 'https://github.com'`). Something in the user's own environment (observed behavior consistent with a VS Code auto-sync) picks up local commits and pushes them on its own shortly after, but that's outside this agent's control and not guaranteed to be instant. After committing, tell the user the commit is local and ask them to sync/push from their own editor — never claim a push succeeded that this agent didn't actually perform, and don't assume a commit is live until you've re-fetched and confirmed `origin/main` moved.
- This sandbox has an intermittent, reproducible quirk reaching `https://tokgozlab.com` over HTTPS by hostname — TLS handshake resets (`Recv failure: Connection reset by peer`) even when the site is fully healthy. Before concluding the live site is down, bypass DNS/SNI and hit one of GitHub Pages' 4 IPs directly with a `Host` header, e.g. `curl -sk -H "Host: tokgozlab.com" https://185.199.108.153/` (also try `.109`/`.110`/`.111.153` — historically 3 of the 4 work fine even when the hostname-based connection from this sandbox doesn't). Also cross-check `https://api.github.com/repos/<owner>/<repo>/actions/runs` for the Pages workflow's latest `conclusion` before telling the user something is broken — a `success` there means the build/deploy itself is fine and any remaining symptom is network-path-specific, not a code regression.
