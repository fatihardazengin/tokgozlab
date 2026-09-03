# Tokgöz Lab

**[English](./README.md) | [Türkçe](./README.tr.md)**

Website for the Tokgöz Lab at Sabancı University, Electronics Engineering. The lab works on energy-efficient millimeter-wave and sub-terahertz CMOS circuits, integrated systems, and intelligent hardware for future (6G) communications.

Live site: https://fatihardazengin.github.io/tokgozlab

Built with [Astro](https://astro.build) and Tailwind CSS, statically generated, with [Pagefind](https://pagefind.app) for search. Deployed automatically to GitHub Pages on every push to `main` (see `.github/workflows/pages.yml`) — you never run a manual deploy step.

This README is written for anyone updating the site's content — including people who don't normally write code. If a section assumes no prior knowledge, that's intentional.

## Table of contents

- [How this site is organized](#how-this-site-is-organized)
- [Two ways to make a change](#two-ways-to-make-a-change)
- [Adding a new team member](#adding-a-new-team-member)
- [Adding a new publication / paper](#adding-a-new-publication--paper)
- [Adding a new research area](#adding-a-new-research-area)
- [Updating the Projects page](#updating-the-projects-page)
- [Updating contact info, social links, and navigation](#updating-contact-info-social-links-and-navigation)
- [Photo and image guidelines](#photo-and-image-guidelines)
- [Local development](#local-development)
- [Publishing your changes](#publishing-your-changes)
- [Troubleshooting](#troubleshooting)
- [Project structure reference](#project-structure-reference)
- [License](#license)

---

## How this site is organized

The things you'll actually edit day-to-day are plain text files:

| Content type | Where it lives | Format |
|---|---|---|
| Publications (papers) | `citations.bib` (repo root) | BibTeX |
| Team members | `src/content/team/*.md` | Markdown file per person |
| Research areas | `src/content/research/*.md` | Markdown file per area |
| Active/completed projects | `src/data/projects.ts` | A short list in a code file |
| Contact info, social links, navigation menu | `src/config.ts` | A short list of settings in a code file |

You never need to touch anything under `src/pages/`, `src/components/`, or `src/layouts/` to update content — those are the page templates that *display* the content above. Only edit them if you want to change how the site looks or behaves, not what it says.

Every time you save a change to `main` on GitHub, the site rebuilds and republishes itself automatically within a minute or two. There is no separate "deploy" button to press.

## Two ways to make a change

**Option A — On GitHub.com, no software needed.** Open the file you want to edit on github.com (e.g. navigate to `src/content/team/`), click the pencil ("Edit this file") icon, make your change, scroll down, and click **Commit changes**. That's it — the site rebuilds automatically. This is the easiest option for adding a team member or fixing a typo.

**Option B — On your own computer, using git.** Better if you're making several changes at once, or want to preview them locally before publishing (see [Local development](#local-development)). After editing files:

```bash
git add -A
git commit -m "Describe what you changed"
git push
```

Both options end the same way: once your change lands on the `main` branch, GitHub Actions rebuilds the site and publishes it.

---

## Adding a new team member

1. **Decide the person's role.** It must be exactly one of these values (spelling and capitalization matter):
   `Principal Investigator`, `Postgraduate`, `Doctorate`, `Graduate`, `Undergraduate`, `Alumni`.
   Each role has its own section on `/team`, in this order — a section only appears once someone with that role exists, so empty ones stay hidden.

2. **Prepare a photo.** Square (1:1 aspect ratio, e.g. 800×800px), `.jpg` or `.png`. Save it into `src/assets/`, named after the person, e.g. `src/assets/jane-doe.jpg`. (Don't put it in `public/` — see [Photo and image guidelines](#photo-and-image-guidelines) for why.)

3. **Create a new file** in `src/content/team/`. Name the file after the person using lowercase words separated by hyphens, e.g. `jane-doe.md` — this filename becomes the person's page address: `tokgozlab.../team/jane-doe`.

4. **Fill in the file** using this template:

   ```markdown
   ---
   name: "Jane Doe"
   role: "Doctorate"
   title: ["Electronics Engineering"]
   avatar: "../../assets/jane-doe.jpg"
   bio: "One or two sentence summary of research focus, shown on the team grid card."
   email: "jane.doe@sabanciuniv.edu"
   website: "https://example.com"
   personalWebsite: "https://janedoe.com"
   linkedin: "https://linkedin.com/in/janedoe"
   github: "https://github.com/janedoe"
   twitter: "https://twitter.com/janedoe"
   googleScholar: "https://scholar.google.com/citations?user=..."
   weight: 10
   ---

   A longer biography goes here, in the body of the file, below the `---`.
   This supports normal Markdown: **bold**, *italics*, [links](https://example.com),
   and headings with `##` if you want subsections (see the PI's profile,
   `src/content/team/korkut-kaan-tokgoz.md`, for a longer real example).
   ```

   Field-by-field notes:
   - `name`, `role`, `avatar` are **required**. Everything else is optional — delete any line you don't need.
   - `title` is a list (hence the `[ ]`), shown as a subtitle under the person's name — e.g. `["Electronics Engineering"]` or `["Faculty Member · Electronics Engineering"]`. You can list more than one: `["Title one", "Title two"]`.
   - `avatar` must point at the file you added in step 2, written as `../../assets/<filename>` — this exact relative path pattern, just swap the filename.
   - `bio` is the short blurb shown on the team grid (card view). Keep it to one or two sentences; the longer biography goes in the body text below the `---` line.
   - `weight` controls sort order **within** a role group — lower numbers appear first. Leave it out to default to 100 (i.e., "sort last"). This is how the PI (`weight: 1`) always appears first among Principal Investigators.
   - `website` is the person's official/institutional profile (e.g. a university faculty page) — shown as "University profile" on their profile page. `personalWebsite` is their own personal site — shown as "Website". Provide either, both, or neither.
   - Social fields (`email`, `website`, `personalWebsite`, `linkedin`, `github`, `twitter`, `googleScholar`) each render as a small icon button on the person's card/profile — only the ones you provide show up.

5. Save the file, then [publish your change](#publishing-your-changes). The new person appears on `/team` automatically — no other file needs editing.

**Removing someone** (e.g. an alumnus leaving active status): don't delete their file — change `role` to `"Alumni"` instead, so their profile page and history stay intact but they move to the Alumni group.

## Adding a new publication / paper

There are two ways to do this. **Use the BibTeX method unless you have a specific reason not to** — it's faster and keeps every publication's metadata (authors, year, links) in one consistent file.

### Method A: BibTeX import (recommended)

1. **Get a BibTeX entry for the paper.** Every major source can export one:
   - **Google Scholar**: find the paper → click the quotation-mark "Cite" icon → click **BibTeX** at the bottom of the popup → copy the text.
   - **Zotero**: select the reference → right-click → *Export Item* → format *BibTeX*.
   - **Mendeley**: select the reference → *Export* → *BibTeX*.
   - Or write one by hand using the template below.

2. **Open `citations.bib`** in the repo root and paste the new entry in anywhere (order in this file doesn't matter — publications are sorted by year automatically on the site).

3. A full example, with every field this site understands:

   ```bibtex
   @article{doe2026example,
     title={An Example Paper Title for Demonstration},
     author={Doe, Jane and Tokgöz, Korkut Kaan},
     journal={IEEE Transactions on Example Systems},
     year={2026},
     doi={10.1109/EXAMPLE.2026.1234567},
     url={https://doi.org/10.1109/EXAMPLE.2026.1234567},
     code={https://github.com/tokgozlab/example-repo},
     website={https://example-project-page.com},
     video={https://youtube.com/watch?v=example},
     slides={https://example.com/slides.pdf},
     abstract={A one- or two-sentence summary of the paper, shown as its description on the site.},
     note={Best Paper},
     featured={true}
   }
   ```

   What each field does once imported:

   | BibTeX field | Shows up as | Notes |
   |---|---|---|
   | `title` | Paper title | Required |
   | `author` | Author list | Required. Separate multiple authors with `and`; both `"First Last"` and `"Last, First"` formats are understood |
   | `year` | Year badge | Required |
   | `journal` / `booktitle` / `school` / `publisher` | Venue | Use whichever fits (`journal` for journal articles, `booktitle` for conference papers) |
   | `abstract` | Short description text | If omitted, a generic "Published in <venue>." line is used instead |
   | `doi` | Adds a DOI link (and makes the title itself clickable) | |
   | `pdf` / `url` / `file` | "Paper" button | First one found wins |
   | `code` / `github` / `repository` | "Code" button | |
   | `website` / `webpage` / `project` | "Publisher"/project-page button | |
   | `demo` | "Demo" button | |
   | `video` / `recording` | "Video" button | |
   | `slides` / `presentation` / `ppt` | "Slides" button | |
   | `award` or a `note` containing "best paper" / "oral" / "spotlight" / "best student paper" | Gold/blue/red badge on the entry | You can set `award={Best Paper}` directly, or just put that phrase in `note` |
   | `featured={true}` | Shows the paper in the "Selected publications" section on the homepage | Only the 3 most recent featured papers appear there |

4. **Publish your change** (see [Publishing your changes](#publishing-your-changes)) by committing the updated `citations.bib`. The next automatic build converts it into a page under `/publications` for you — you don't need to create any Markdown file by hand, and you don't need to run anything locally unless you want to preview it first (see [Local development](#local-development)).

   > **Important:** Only entries with BibTeX type `@article`, `@inproceedings`, etc. (i.e. anything except `@book`) are shown on the `/publications` page today. If you use `@book` for a book entry, it will be filed away but won't currently appear anywhere on the live site.

5. **One thing to know about re-editing:** the publication page for each entry is regenerated automatically every time the site builds from whatever is currently in `citations.bib`. If you ever hand-edit a generated file under `src/content/publications/` directly instead of editing `citations.bib`, know that your edit will be **overwritten** the next time someone re-imports that same entry — except the `featured: true` flag, which is preserved across re-imports. When in doubt, always edit `citations.bib`, not the generated `.md` files.

### Method B: Adding a publication file by hand

Only do this for something that doesn't come from a BibTeX source at all. Create a file in `src/content/publications/`, e.g. `2026-doe-example.md`:

```markdown
---
title: "An Example Paper Title"
authors: ["Jane Doe", "Korkut Kaan Tokgöz"]
year: 2026
venue: "IEEE Transactions on Example Systems"
type: "paper"
description: "A one- or two-sentence summary of the paper."
doi: "10.1109/EXAMPLE.2026.1234567"
featured: false
links:
  pdf: "https://doi.org/10.1109/EXAMPLE.2026.1234567"
  code: "https://github.com/tokgozlab/example-repo"
badges:
  - { text: "Best Paper", type: "gold" }
---
A one- or two-sentence summary of the paper.
```

`type` must be `"paper"` to show up on the Publications page. `authors`, `title`, `year`, `venue` are required; everything else is optional.

## Adding a new research area

Create a file in `src/content/research/`, e.g. `src/content/research/new-research-direction.md`:

```markdown
---
title: "New Research Direction"
description: "One-sentence summary shown on the research cards and homepage."
order: 50
---

The full page body goes here, in Markdown. Use `## Heading` for
subsections — this renders with the same styling as the PI's
biography page.
```

`order` controls where it appears among the other research areas (lower number = earlier); leave it out to default to last (100). The filename becomes the page address, e.g. `/research/new-research-direction`.

## Updating the Projects page

Active and completed projects are **not** a content collection — they're a short list inside a code file: `src/data/projects.ts`. Open it and you'll see two lists:

```ts
export const activeProjects = [
  {
    period: 'Sep 2024 — Aug 2027',
    title: 'Millimeter-Wave and Sub-Terahertz PLLs for Beyond-5G/6G Systems',
    type: 'National',       // or 'International'
    theme: 'Frequency synthesis',
  },
  // ...more entries
];

export const completedProjects = [
  {
    period: '2022 — 2025',
    title: 'Critical Building Blocks for mmWave and sub-THz CMOS Front-End Transceivers...',
  },
  // ...more entries
];
```

To add a project: copy an existing `{ ... }` block (including the commas), paste it where you want it in the list, and edit the text inside the quotes. To remove one, delete its whole `{ ... }` block (and the comma after it, if it was the last one). Keep every value inside quotes (`'...'`) and don't remove any commas or curly braces — that will break the build.

The **first three** entries in `activeProjects` also automatically appear in the "Research in motion" section on the homepage, so reordering this list changes the homepage teaser too.

## Updating contact info, social links, and navigation

General site-wide settings live in `src/config.ts`, inside the `SITE` object near the top of the file:

- `SITE.email` — the lab's contact email, used for the mailto links on the Opportunities page and footer.
- `SITE.contact.phone`, `SITE.contact.address` — shown in the footer.
- `SITE.profile.*` — the PI's official/personal/Scholar/ORCID/LinkedIn URLs, used across the homepage, team page, and structured data for search engines.
- `SITE.nav` — the items in the header/footer navigation menu (text + link + a `key` used internally — don't change the `key` values, only `text` if you want to rename a menu item).
- `SOCIALS` (further down the file) — the social icons shown around the site.

These are plain values inside quotes — edit the text between the quotes and leave the surrounding structure (`{ }`, `,`, `:`) untouched.

## Photo and image guidelines

- **Team photos**: square (1:1), at least 800×800px, `.jpg` or `.png`. Put them in `src/assets/`.
- **General images** (research area covers, etc.): `.jpg`/`.png`/`.webp`, put them in `src/assets/` too.
- **Always import images through `src/assets/`, never `public/`.** Anything referenced from Markdown frontmatter (like `avatar:`) or imported into a `.astro` file from `src/assets/` gets automatically compressed, resized, and lazy-loaded at build time. Files placed in `public/` are served exactly as uploaded, with none of that optimization — `public/` is reserved for things like the favicon and font files that must stay byte-for-byte as-is.

## Local development

Requires Node.js v22.12.0 or higher.

```bash
npm install
npm run dev
```

Visit `http://localhost:4321` to preview the site with your changes before publishing them.

```bash
npm run build    # imports citations.bib, builds the site, generates the search index and sitemap
npm run preview  # serve that production build locally, to sanity-check it
```

The search index (`/search`) is only generated during `npm run build`, so search won't return results while running `npm run dev` alone — that's expected, not a bug.

If you only want to regenerate the publication pages from `citations.bib` without a full build:

```bash
npm run import-bibtex
```

## Publishing your changes

However you made your edit (GitHub.com or your own computer — see [Two ways to make a change](#two-ways-to-make-a-change)), the moment it lands on the `main` branch:

1. GitHub Actions automatically runs `npm run build` (which re-imports `citations.bib`, rebuilds every page, and regenerates search + sitemap).
2. The result is published to GitHub Pages.
3. The live site at https://fatihardazengin.github.io/tokgozlab updates — usually within 1–2 minutes.

You can watch this happen under the **Actions** tab of the GitHub repository; a red ✗ means something went wrong (see [Troubleshooting](#troubleshooting)), a green ✓ means it's live.

## Troubleshooting

- **The site build failed after I edited `citations.bib`.** Almost always a syntax mistake — a missing comma, or a curly brace `{`/`}` that isn't closed. Check the entry you just added against the examples above; every field needs `field={value}` and entries are separated by commas between fields, not after the last one.
- **A new team member doesn't show up.** Check that `role` in their file is spelled *exactly* like one of the allowed values listed in [Adding a new team member](#adding-a-new-team-member) — even a small typo (extra space, wrong capitalization) will cause the whole file to fail validation, and the whole build to fail with it.
- **A new publication doesn't appear on `/publications`.** Confirm its `type` is `"paper"` (BibTeX-imported entries default to this automatically unless the BibTeX entry type was `@book`).
- **A photo looks broken or missing.** Check that the file actually exists at the path you wrote (case-sensitive!) and that it's under `src/assets/`, not `public/`.
- **I don't see my change on the live site yet.** Check the **Actions** tab on GitHub — the build takes a minute or two, and if it failed, nothing gets published.

## Project structure reference

A quick map, for anyone who wants the fuller picture:

```
citations.bib                  ← source of truth for all publications (BibTeX)
src/
  config.ts                    ← site-wide settings: contact info, social links, nav menu
  content.config.ts            ← the data "shape" (schema) for publications/team/research
  data/projects.ts             ← active & completed project lists
  content/
    publications/*.md          ← generated from citations.bib — don't hand-edit, see above
    team/*.md                  ← one file per person
    research/*.md              ← one file per research area
  assets/                      ← optimized images (photos, covers) — reference these from content
  pages/                       ← page templates (edit only to change layout/behavior, not content)
  components/, layouts/        ← reusable UI pieces
scripts/
  import-bibtex.js             ← turns citations.bib into src/content/publications/*.md
  generate-sitemap.js          ← writes dist/sitemap.xml at build time
.github/workflows/pages.yml    ← builds and deploys to GitHub Pages on every push to main
```

For deeper technical/architectural notes (aimed at AI coding assistants and future contributors), see [`AGENTS.md`](./AGENTS.md).

## License

MIT
