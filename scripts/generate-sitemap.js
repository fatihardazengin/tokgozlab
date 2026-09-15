import fs from 'fs';
import path from 'path';

// Must match `site` in astro.config.mjs.
const SITE_URL = 'https://tokgozlab.com';

const DIST_DIR = path.join(process.cwd(), 'dist');
const RESEARCH_DIR = path.join(process.cwd(), 'src', 'content', 'research');
const TEAM_DIR = path.join(process.cwd(), 'src', 'content', 'team');
const PUBLICATIONS_DIR = path.join(process.cwd(), 'src', 'content', 'publications');

// Astro's content-collection glob loader lowercases the filename to derive
// each entry's `id` (e.g. "2016-Tokgöz-..." -> "2016-tokgöz-..."), so the
// slug used here must match that or the sitemap links 404.
const slugsIn = (dir) =>
  fs
    .readdirSync(dir)
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => file.replace(/\.mdx?$/, '').toLowerCase());

// Mirrors the `type === 'paper'` filter in src/pages/publications/[...slug].astro
// (schema defaults `type` to "paper" when the field is omitted).
const paperSlugsIn = (dir) =>
  fs
    .readdirSync(dir)
    .filter((file) => /\.mdx?$/.test(file))
    .filter((file) => {
      const match = fs.readFileSync(path.join(dir, file), 'utf8').match(/^type:\s*"?([\w-]+)"?/m);
      return !match || match[1] === 'paper';
    })
    .map((file) => file.replace(/\.mdx?$/, '').toLowerCase());

// 'search' is deliberately excluded — it's noindex'd (see src/pages/search.astro)
// and has no unique indexable content of its own.
const staticRoutes = ['', 'research', 'projects', 'publications', 'team', 'join'];
const researchRoutes = slugsIn(RESEARCH_DIR).map((slug) => `research/${slug}`);
const teamRoutes = slugsIn(TEAM_DIR).map((slug) => `team/${slug}`);
const publicationRoutes = paperSlugsIn(PUBLICATIONS_DIR).map((slug) => `publications/${slug}`);

const routes = [...staticRoutes, ...researchRoutes, ...teamRoutes, ...publicationRoutes];

const urlEntries = routes
  .map((route) => `  <url><loc>${SITE_URL}/${route}</loc></url>`)
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;

fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemap);
console.log(`sitemap.xml written with ${routes.length} routes`);
