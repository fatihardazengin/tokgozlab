# Tokgöz Lab

**[English](./README.md) | [简体中文](./README.zh-CN.md)**

Website for the Tokgöz Lab at Sabancı University, Electronics Engineering. The lab works on energy-efficient millimeter-wave and sub-terahertz CMOS circuits, integrated systems, and intelligent hardware for future (6G) communications.

Live site: https://fatihardazengin.github.io/tokgozlab

Built with [Astro](https://astro.build) and Tailwind CSS, statically generated, with [Pagefind](https://pagefind.app) for search. Deployed automatically to GitHub Pages on every push to `main` (see `.github/workflows/pages.yml`).

---

## Local development

Requires Node.js v22.12.0 or higher.

```bash
npm install
npm run dev
```

Visit `http://localhost:4321`.

```bash
npm run build    # imports citations.bib, builds the site, generates the search index
npm run preview  # serve the production build locally
```

The search index is generated at build time, so search only works after a full `npm run build`.

---

## Updating content

| What | Where |
|---|---|
| Publications | `citations.bib` at the repo root — run `npm run import-bibtex` to regenerate `src/content/publications/` |
| Research areas | Markdown files in `src/content/research/` (`order` field controls sort) |
| Team members | Markdown files in `src/content/team/` (`weight` field controls sort) |
| Active/completed projects | `src/pages/projects.astro` |
| Opportunities page | `src/pages/join.astro` |
| Site metadata, nav, socials | `src/config.ts` |

### Importing publications from BibTeX

1. Export your bibliography (Zotero, Mendeley, Google Scholar, etc.) to `citations.bib` in the repo root.
2. Run:
   ```bash
   npm run import-bibtex
   ```
3. Entries are parsed by `scripts/import-bibtex.js` into `src/content/publications/`. BibTeX fields such as `pdf`/`url`, `code`, `website`, `demo`, `video`, `slides`, and `award`/`note` are mapped to the corresponding buttons and badges on the site automatically.

### Adding a team member

Add a Markdown file to `src/content/team/`, e.g.:

```markdown
---
name: "Jane Doe"
role: "PhD Student"
title: ["Electronics Engineering"]
avatar: "../../assets/jane-doe.jpg"
bio: "One or two sentence summary of research focus."
email: "jane.doe@sabanciuniv.edu"
weight: 10
---

Longer bio in the body of the file.
```

`role` must be one of the values defined in `src/content.config.ts`.

---

## Deployment

The site deploys to GitHub Pages via `.github/workflows/pages.yml` on every push to `main`. `astro.config.mjs` sets `site` and `base` for the GitHub Pages project subpath — update both if the site ever moves to a custom domain or a different repo name.

---

## License

MIT
