# Tokgöz Lab

**[English](./README.md) | [Türkçe](./README.tr.md)**

Sabancı Üniversitesi Elektronik Mühendisliği bölümündeki Tokgöz Lab'ın web sitesi. Laboratuvar, geleceğin (6G) haberleşme sistemleri için enerji verimli milimetre dalga ve alt-terahertz CMOS devreleri, entegre sistemler ve akıllı donanım üzerine çalışıyor.

Canlı site: https://fatihardazengin.github.io/tokgozlab

Site [Astro](https://astro.build) ve Tailwind CSS ile geliştirildi, statik olarak üretiliyor ve arama için [Pagefind](https://pagefind.app) kullanıyor. `main` dalına yapılan her push'ta GitHub Pages'e otomatik olarak deploy ediliyor (bkz. `.github/workflows/pages.yml`).

---

## Yerel geliştirme

Node.js v22.12.0 veya üstü gerekir.

```bash
npm install
npm run dev
```

`http://localhost:4321` adresini ziyaret et.

```bash
npm run build    # citations.bib'i içe aktarır, siteyi derler, arama indeksini oluşturur
npm run preview  # üretim derlemesini yerelde önizle
```

Arama indeksi build sırasında oluşturulur; bu yüzden arama özelliği yalnızca tam bir `npm run build` sonrasında çalışır.

---

## İçerik güncelleme

| Ne | Nerede |
|---|---|
| Yayınlar | Repo kökündeki `citations.bib` — `src/content/publications/` klasörünü yeniden oluşturmak için `npm run import-bibtex` çalıştır |
| Araştırma alanları | `src/content/research/` içindeki Markdown dosyaları (sıralamayı `order` alanı belirler) |
| Takım üyeleri | `src/content/team/` içindeki Markdown dosyaları (sıralamayı `weight` alanı belirler) |
| Devam eden/tamamlanan projeler | `src/pages/projects.astro` |
| Fırsatlar (Opportunities) sayfası | `src/pages/join.astro` |
| Site meta bilgisi, navigasyon, sosyal linkler | `src/config.ts` |

### BibTeX'ten yayın içe aktarma

1. Kaynakçanı (Zotero, Mendeley, Google Scholar vb.) repo kökünde `citations.bib` olarak dışa aktar.
2. Şunu çalıştır:
   ```bash
   npm run import-bibtex
   ```
3. Girdiler `scripts/import-bibtex.js` tarafından ayrıştırılıp `src/content/publications/` içine yazılır. BibTeX'teki `pdf`/`url`, `code`, `website`, `demo`, `video`, `slides` ve `award`/`note` gibi alanlar sitedeki ilgili butonlara ve rozetlere otomatik olarak eşlenir.

### Takıma üye ekleme

`src/content/team/` içine bir Markdown dosyası ekle, örneğin:

```markdown
---
name: "Jane Doe"
role: "PhD Student"
title: ["Electronics Engineering"]
avatar: "../../assets/jane-doe.jpg"
bio: "Araştırma odağının bir-iki cümlelik özeti."
email: "jane.doe@sabanciuniv.edu"
weight: 10
---

Dosyanın gövdesinde daha uzun bir biyografi.
```

`role` alanı `src/content.config.ts` içinde tanımlı değerlerden biri olmalı.

---

## Deployment

Site, `main` dalına yapılan her push'ta `.github/workflows/pages.yml` üzerinden GitHub Pages'e deploy edilir. `astro.config.mjs` içindeki `site` ve `base` alanları GitHub Pages proje alt yolu için ayarlanmıştır — site özel bir domaine taşınır veya repo adı değişirse ikisi de güncellenmeli.

---

## Lisans

MIT
