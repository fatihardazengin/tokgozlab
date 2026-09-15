import fs from 'fs';
import path from 'path';

// Must match `site` in astro.config.mjs.
const SITE_URL = 'https://tokgozlab.com';

const DIST_DIR = path.join(process.cwd(), 'dist');
const RESEARCH_DIR = path.join(process.cwd(), 'src', 'content', 'research');
const TEAM_DIR = path.join(process.cwd(), 'src', 'content', 'team');

const slugsIn = (dir) =>
  fs
    .readdirSync(dir)
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => file.replace(/\.mdx?$/, ''));

// 'search' is deliberately excluded — it's noindex'd (see src/pages/search.astro)
// and has no unique indexable content of its own.
const staticRoutes = ['', 'research', 'projects', 'publications', 'team', 'join'];
const researchRoutes = slugsIn(RESEARCH_DIR).map((slug) => `research/${slug}`);
const teamRoutes = slugsIn(TEAM_DIR).map((slug) => `team/${slug}`);

const routes = [...staticRoutes, ...researchRoutes, ...teamRoutes];

const urlEntries = routes
  .map((route) => `  <url><loc>${SITE_URL}/${route}</loc></url>`)
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;

fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemap);
console.log(`sitemap.xml written with ${routes.length} routes`);
