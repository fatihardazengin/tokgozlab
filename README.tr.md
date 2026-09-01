# Tokgöz Lab

**[English](./README.md) | [Türkçe](./README.tr.md)**

Sabancı Üniversitesi Elektronik Mühendisliği bölümündeki Tokgöz Lab'ın web sitesi. Laboratuvar, geleceğin (6G) haberleşme sistemleri için enerji verimli milimetre dalga ve alt-terahertz CMOS devreleri, entegre sistemler ve akıllı donanım üzerine çalışıyor.

Canlı site: https://fatihardazengin.github.io/tokgozlab

Site [Astro](https://astro.build) ve Tailwind CSS ile geliştirildi, statik olarak üretiliyor ve arama için [Pagefind](https://pagefind.app) kullanıyor. `main` dalına yapılan her push'ta GitHub Pages'e otomatik olarak deploy ediliyor (bkz. `.github/workflows/pages.yml`) — elle çalıştırılan bir deploy adımı yok.

Bu README, siteye içerik ekleyecek/güncelleyecek herkes için yazıldı — normalde kod yazmayan kişiler de dahil. Bir bölüm hiçbir ön bilgi varsaymıyorsa, bu kasıtlı.

## İçindekiler

- [Site nasıl organize edilmiş](#site-nasıl-organize-edilmiş)
- [Bir değişikliği yayınlamanın iki yolu](#bir-değişikliği-yayınlamanın-iki-yolu)
- [Yeni bir takım üyesi ekleme](#yeni-bir-takım-üyesi-ekleme)
- [Yeni bir yayın / makale ekleme](#yeni-bir-yayın--makale-ekleme)
- [Yeni bir araştırma alanı ekleme](#yeni-bir-araştırma-alanı-ekleme)
- [Projects sayfasını güncelleme](#projects-sayfasını-güncelleme)
- [İletişim bilgisi, sosyal linkler ve navigasyonu güncelleme](#i̇letişim-bilgisi-sosyal-linkler-ve-navigasyonu-güncelleme)
- [Fotoğraf ve görsel kuralları](#fotoğraf-ve-görsel-kuralları)
- [Yerel geliştirme](#yerel-geliştirme)
- [Değişikliklerini yayınlama](#değişikliklerini-yayınlama)
- [Sorun giderme](#sorun-giderme)
- [Proje yapısı referansı](#proje-yapısı-referansı)
- [Lisans](#lisans)

---

## Site nasıl organize edilmiş

Günlük olarak düzenleyeceğin şeyler düz metin dosyaları:

| İçerik türü | Nerede duruyor | Format |
|---|---|---|
| Yayınlar (makaleler) | `citations.bib` (repo kökü) | BibTeX |
| Takım üyeleri | `src/content/team/*.md` | Kişi başına bir Markdown dosyası |
| Araştırma alanları | `src/content/research/*.md` | Alan başına bir Markdown dosyası |
| Devam eden/tamamlanan projeler | `src/data/projects.ts` | Bir kod dosyası içinde kısa bir liste |
| İletişim bilgisi, sosyal linkler, navigasyon menüsü | `src/config.ts` | Bir kod dosyası içinde kısa bir ayar listesi |

Yukarıdaki içerikleri güncellemek için `src/pages/`, `src/components/` veya `src/layouts/` altındaki hiçbir şeye dokunmana gerek yok — onlar yukarıdaki içeriği *gösteren* sayfa şablonları. Onları sadece sitenin görünümünü/davranışını değiştirmek istiyorsan düzenle, ne yazdığını değil.

`main` dalına her değişiklik kaydettiğinde site bir-iki dakika içinde otomatik olarak yeniden derlenip yayınlanıyor. Basılacak ayrı bir "deploy" butonu yok.

## Bir değişikliği yayınlamanın iki yolu

**Yöntem A — GitHub.com üzerinden, hiçbir program kurmadan.** Düzenlemek istediğin dosyayı github.com üzerinde aç (örneğin `src/content/team/` klasörüne git), kalem ("Edit this file") ikonuna tıkla, değişikliği yap, aşağı kaydır ve **Commit changes**'e tıkla. Bu kadar — site otomatik olarak yeniden derlenir. Bir takım üyesi eklemek veya bir yazım hatasını düzeltmek için en kolay yöntem bu.

**Yöntem B — Kendi bilgisayarında, git kullanarak.** Aynı anda birden fazla değişiklik yapıyorsan veya yayınlamadan önce yerelde önizlemek istiyorsan daha iyi (bkz. [Yerel geliştirme](#yerel-geliştirme)). Dosyaları düzenledikten sonra:

```bash
git add -A
git commit -m "Neyi değiştirdiğini açıkla"
git push
```

Her iki yöntem de aynı şekilde biter: değişikliğin `main` dalına ulaştığı anda, GitHub Actions siteyi yeniden derleyip yayınlar.

---

## Yeni bir takım üyesi ekleme

1. **Kişinin rolüne karar ver.** Aşağıdaki değerlerden tam olarak biri olmalı (yazım ve büyük/küçük harf önemli):
   `Principal Investigator`, `Professor`, `Associate Professor`, `Assistant Professor`, `Postdoc`, `Research Assistant`, `PhD Student`, `Master Student`, `Undergraduate`, `Alumni`.
   Takım sayfası kişileri bu değerlere göre otomatik olarak gruplar, o yüzden doğru olanı seçmek kişinin hangi bölümde görüneceğini belirler.

2. **Bir fotoğraf hazırla.** Kare (1:1 en-boy oranı, örn. 800×800px), `.jpg` veya `.png`. Kişinin adına göre isimlendirip `src/assets/` içine kaydet, örn. `src/assets/jane-doe.jpg`. (`public/` içine koyma — nedenini [Fotoğraf ve görsel kuralları](#fotoğraf-ve-görsel-kuralları) bölümünde açıklıyorum.)

3. `src/content/team/` içinde **yeni bir dosya oluştur**. Dosyayı kişinin adına göre, küçük harf ve tire ile ayrılmış şekilde isimlendir, örn. `jane-doe.md` — bu dosya adı kişinin sayfa adresi olur: `tokgozlab.../team/jane-doe`.

4. **Dosyayı şu şablonla doldur:**

   ```markdown
   ---
   name: "Jane Doe"
   role: "PhD Student"
   title: ["Electronics Engineering"]
   avatar: "../../assets/jane-doe.jpg"
   bio: "Takım kartında gösterilen, araştırma odağının bir-iki cümlelik özeti."
   email: "jane.doe@sabanciuniv.edu"
   website: "https://example.com"
   linkedin: "https://linkedin.com/in/janedoe"
   github: "https://github.com/janedoe"
   twitter: "https://twitter.com/janedoe"
   googleScholar: "https://scholar.google.com/citations?user=..."
   weight: 10
   ---

   Daha uzun biyografi buraya, dosyanın `---` altındaki gövde kısmına yazılır.
   Normal Markdown desteklenir: **kalın**, *italik*, [linkler](https://example.com),
   ve alt bölümler için `##` ile başlıklar (gerçek ve daha uzun bir örnek için
   PI'nin profiline bak: `src/content/team/korkut-kaan-tokgoz.md`).
   ```

   Alan alan notlar:
   - `name`, `role`, `avatar` **zorunlu**. Geri kalan her şey opsiyonel — ihtiyacın olmayan satırı sil.
   - `title` bir liste (bu yüzden `[ ]` içinde), kişinin adının altında alt başlık olarak gösterilir — örn. `["Electronics Engineering"]` veya `["Faculty Member · Electronics Engineering"]`. Birden fazla da yazılabilir: `["Title one", "Title two"]`.
   - `avatar`, 2. adımda eklediğin dosyayı göstermeli, tam olarak şu kalıpla: `../../assets/<dosya-adı>` — sadece dosya adını değiştir.
   - `bio`, takım gridinde (kart görünümünde) gösterilen kısa özet. Bir-iki cümle yeterli; daha uzun biyografi `---` altındaki gövde metnine yazılır.
   - `weight`, aynı rol grubu **içindeki** sıralamayı belirler — küçük sayı önce gelir. Boş bırakırsan varsayılan 100 olur (yani "en sona sırala"). PI'nin (`weight: 1`) Principal Investigator'lar arasında her zaman ilk sırada görünmesinin sebebi bu.
   - Sosyal alanlar (`email`, `website`, `linkedin`, `github`, `twitter`, `googleScholar`) kişinin kartında/profilinde küçük birer ikon buton olarak gösterilir — sadece doldurduğun olanlar görünür.

5. Dosyayı kaydet, ardından [değişikliğini yayınla](#değişikliklerini-yayınlama). Yeni kişi `/team` sayfasında otomatik olarak görünür — başka hiçbir dosyayı düzenlemene gerek yok.

**Birini kaldırma** (örn. aktiften ayrılan bir mezun): dosyasını silme — bunun yerine `role` alanını `"Alumni"` yap, böylece profil sayfası ve geçmişi korunur ama Alumni grubuna taşınır.

## Yeni bir yayın / makale ekleme

Bunu yapmanın iki yolu var. **Özel bir sebebin olmadıkça BibTeX yöntemini kullan** — daha hızlı ve her yayının bilgilerini (yazarlar, yıl, linkler) tek ve tutarlı bir dosyada tutuyor.

### Yöntem A: BibTeX ile içe aktarma (önerilen)

1. **Makale için bir BibTeX girdisi al.** Başlıca kaynakların hepsi bunu dışa aktarabilir:
   - **Google Scholar**: makaleyi bul → tırnak işareti "Cite" ikonuna tıkla → açılan pencerede altta **BibTeX**'e tıkla → metni kopyala.
   - **Zotero**: kaynağı seç → sağ tık → *Export Item* → format olarak *BibTeX* seç.
   - **Mendeley**: kaynağı seç → *Export* → *BibTeX*.
   - Ya da aşağıdaki şablonu kullanarak elle yaz.

2. **`citations.bib`** dosyasını repo kökünde aç ve yeni girdiyi herhangi bir yere yapıştır (bu dosyadaki sıralama önemli değil — yayınlar sitede otomatik olarak yıla göre sıralanıyor).

3. Sitenin anladığı tüm alanları içeren tam bir örnek:

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
     abstract={Makalenin sitede açıklama olarak gösterilecek bir-iki cümlelik özeti.},
     note={Best Paper},
     featured={true}
   }
   ```

   İçe aktarıldıktan sonra her alan neye dönüşür:

   | BibTeX alanı | Sitede neye dönüşür | Notlar |
   |---|---|---|
   | `title` | Makale başlığı | Zorunlu |
   | `author` | Yazar listesi | Zorunlu. Birden fazla yazarı `and` ile ayır; hem `"Ad Soyad"` hem `"Soyad, Ad"` formatı anlaşılır |
   | `year` | Yıl rozeti | Zorunlu |
   | `journal` / `booktitle` / `school` / `publisher` | Venue (yayın yeri) | Uygun olanı kullan (dergi makaleleri için `journal`, konferans bildirileri için `booktitle`) |
   | `abstract` | Kısa açıklama metni | Boş bırakılırsa yerine genel bir "Published in <venue>." satırı kullanılır |
   | `doi` | Bir DOI linki ekler (ve başlığın kendisini tıklanabilir yapar) | |
   | `pdf` / `url` / `file` | "Paper" butonu | İlk bulunan kazanır |
   | `code` / `github` / `repository` | "Code" butonu | |
   | `website` / `webpage` / `project` | "Publisher"/proje sayfası butonu | |
   | `demo` | "Demo" butonu | |
   | `video` / `recording` | "Video" butonu | |
   | `slides` / `presentation` / `ppt` | "Slides" butonu | |
   | `award` veya içinde "best paper" / "oral" / "spotlight" / "best student paper" geçen bir `note` | Girdi üzerinde altın/mavi/kırmızı rozet | `award={Best Paper}` şeklinde doğrudan da yazabilirsin, ya da bu ifadeyi `note` içine koyman yeterli |
   | `featured={true}` | Makaleyi ana sayfadaki "Selected publications" bölümünde gösterir | Orada sadece en güncel 3 öne çıkan makale görünür |

4. **Değişikliğini yayınla** (bkz. [Değişikliklerini yayınlama](#değişikliklerini-yayınlama)) — güncellenmiş `citations.bib`'i commit'lemen yeterli. Bir sonraki otomatik build bunu senin için `/publications` altında bir sayfaya dönüştürür — elle bir Markdown dosyası oluşturman gerekmez, önce önizlemek istemiyorsan yerelde de hiçbir şey çalıştırman gerekmez (bkz. [Yerel geliştirme](#yerel-geliştirme)).

   > **Önemli:** Bugün itibarıyla `/publications` sayfasında sadece `@article`, `@inproceedings` gibi (yani `@book` dışındaki) BibTeX türleri gösteriliyor. Bir kitap girdisi için `@book` kullanırsan, kaydedilir ama şu anda canlı sitede hiçbir yerde görünmez.

5. **Yeniden düzenlerken bilmen gereken bir şey:** her yayının sayfası, site her build edildiğinde `citations.bib`'te o an ne yazıyorsa ona göre otomatik olarak yeniden üretilir. Eğer `citations.bib` yerine `src/content/publications/` altındaki üretilmiş bir dosyayı doğrudan elle düzenlersen, aynı girdi tekrar içe aktarıldığında bu düzenleme **üzerine yazılıp kaybolur** — `featured: true` bayrağı hariç, o yeniden içe aktarmalar arasında korunur. Şüphen varsa her zaman `citations.bib`'i düzenle, üretilmiş `.md` dosyalarını değil.

### Yöntem B: Bir yayın dosyasını elle ekleme

Bunu sadece BibTeX kaynağından hiç gelmeyen bir şey için yap. `src/content/publications/` içinde bir dosya oluştur, örn. `2026-doe-example.md`:

```markdown
---
title: "An Example Paper Title"
authors: ["Jane Doe", "Korkut Kaan Tokgöz"]
year: 2026
venue: "IEEE Transactions on Example Systems"
type: "paper"
description: "Makalenin bir-iki cümlelik özeti."
doi: "10.1109/EXAMPLE.2026.1234567"
featured: false
links:
  pdf: "https://doi.org/10.1109/EXAMPLE.2026.1234567"
  code: "https://github.com/tokgozlab/example-repo"
badges:
  - { text: "Best Paper", type: "gold" }
---
Makalenin bir-iki cümlelik özeti.
```

Publications sayfasında görünmesi için `type` alanı `"paper"` olmalı. `authors`, `title`, `year`, `venue` zorunlu; geri kalan her şey opsiyonel.

## Yeni bir araştırma alanı ekleme

`src/content/research/` içinde bir dosya oluştur, örn. `src/content/research/new-research-direction.md`:

```markdown
---
title: "New Research Direction"
description: "Araştırma kartlarında ve ana sayfada gösterilen tek cümlelik özet."
order: 50
---

Sayfanın tam gövdesi buraya, Markdown olarak yazılır. Alt bölümler
için `## Başlık` kullan — bu, PI'nin biyografi sayfasıyla aynı
stille render edilir.
```

`order`, bu alanın diğer araştırma alanları arasında nerede görüneceğini belirler (küçük sayı = önce); boş bırakılırsa varsayılan olarak en sona (100) gider. Dosya adı sayfanın adresi olur, örn. `/research/new-research-direction`.

## Projects sayfasını güncelleme

Devam eden ve tamamlanan projeler bir içerik koleksiyonu **değil** — bunlar bir kod dosyası içindeki kısa bir liste: `src/data/projects.ts`. Dosyayı açtığında iki liste görürsün:

```ts
export const activeProjects = [
  {
    period: 'Sep 2024 — Aug 2027',
    title: 'Millimeter-Wave and Sub-Terahertz PLLs for Beyond-5G/6G Systems',
    type: 'National',       // ya da 'International'
    theme: 'Frequency synthesis',
  },
  // ...daha fazla girdi
];

export const completedProjects = [
  {
    period: '2022 — 2025',
    title: 'Critical Building Blocks for mmWave and sub-THz CMOS Front-End Transceivers...',
  },
  // ...daha fazla girdi
];
```

Proje eklemek için: mevcut bir `{ ... }` bloğunu (virgülüyle birlikte) kopyala, listede istediğin yere yapıştır ve tırnak içindeki metni düzenle. Kaldırmak için ilgili `{ ... }` bloğunun tamamını sil (eğer listenin son elemanıysa, ondan önceki virgülü de). Her değeri tırnak içinde (`'...'`) tut ve hiçbir virgülü veya süslü parantezi kaldırma — aksi halde build bozulur.

`activeProjects` listesindeki **ilk üç** girdi, ana sayfadaki "Research in motion" bölümünde de otomatik olarak görünür, yani bu listeyi yeniden sıralamak ana sayfadaki önizlemeyi de değiştirir.

## İletişim bilgisi, sosyal linkler ve navigasyonu güncelleme

Site geneli ayarlar `src/config.ts` içinde, dosyanın başındaki `SITE` nesnesinde duruyor:

- `SITE.email` — laboratuvarın iletişim e-postası, Opportunities sayfasındaki ve footer'daki mailto linklerinde kullanılıyor.
- `SITE.contact.phone`, `SITE.contact.address` — footer'da gösteriliyor.
- `SITE.profile.*` — PI'nin resmi/kişisel/Scholar/ORCID/LinkedIn linkleri; ana sayfada, takım sayfasında ve arama motorları için yapılandırılmış veride kullanılıyor.
- `SITE.nav` — header/footer navigasyon menüsündeki öğeler (metin + link + içeride kullanılan bir `key` — `key` değerlerini değiştirme, bir menü öğesini yeniden adlandırmak istiyorsan sadece `text`'i değiştir).
- `SOCIALS` (dosyada biraz daha aşağıda) — sitede gösterilen sosyal medya ikonları.

Bunların hepsi tırnak içindeki düz değerler — tırnaklar arasındaki metni düzenle, çevresindeki yapıya (`{ }`, `,`, `:`) dokunma.

## Fotoğraf ve görsel kuralları

- **Takım fotoğrafları**: kare (1:1), en az 800×800px, `.jpg` veya `.png`. `src/assets/` içine koy.
- **Genel görseller** (araştırma alanı kapakları vb.): `.jpg`/`.png`/`.webp`, onları da `src/assets/` içine koy.
- **Görselleri her zaman `src/assets/` üzerinden içe aktar, asla `public/` üzerinden değil.** Markdown frontmatter'dan (`avatar:` gibi) referans edilen ya da bir `.astro` dosyasına `src/assets/`'ten import edilen her şey, build sırasında otomatik olarak sıkıştırılır, yeniden boyutlandırılır ve lazy-load edilir. `public/` içine konan dosyalar tam olarak yüklendiği haliyle sunulur, bu optimizasyonların hiçbiri uygulanmaz — `public/` sadece favicon ve font dosyaları gibi olduğu gibi kalması gereken şeyler için ayrılmıştır.

## Yerel geliştirme

Node.js v22.12.0 veya üstü gerekir.

```bash
npm install
npm run dev
```

Değişikliklerini yayınlamadan önce `http://localhost:4321` adresini ziyaret ederek siteyi önizle.

```bash
npm run build    # citations.bib'i içe aktarır, siteyi derler, arama indeksini ve sitemap'i oluşturur
npm run preview  # o üretim derlemesini yerelde sunar, göz kontrolü için
```

Arama indeksi (`/search`) sadece `npm run build` sırasında oluşturulur, o yüzden sadece `npm run dev` çalıştırırken arama sonuç döndürmez — bu beklenen bir durumdur, hata değil.

Sadece `citations.bib`'ten yayın sayfalarını, tam bir build yapmadan yeniden oluşturmak istersen:

```bash
npm run import-bibtex
```

## Değişikliklerini yayınlama

Değişikliğini nasıl yaptığın önemli değil (GitHub.com veya kendi bilgisayarın — bkz. [Bir değişikliği yayınlamanın iki yolu](#bir-değişikliği-yayınlamanın-iki-yolu)), `main` dalına ulaştığı anda:

1. GitHub Actions otomatik olarak `npm run build`'i çalıştırır (bu, `citations.bib`'i yeniden içe aktarır, her sayfayı yeniden derler, aramayı ve sitemap'i yeniden oluşturur).
2. Sonuç GitHub Pages'e yayınlanır.
3. https://fatihardazengin.github.io/tokgozlab adresindeki canlı site güncellenir — genellikle 1-2 dakika içinde.

Bunun gerçekleştiğini GitHub reposunun **Actions** sekmesinden izleyebilirsin; kırmızı ✗ bir şeylerin ters gittiği anlamına gelir (bkz. [Sorun giderme](#sorun-giderme)), yeşil ✓ ise canlıda olduğu anlamına gelir.

## Sorun giderme

- **`citations.bib`'i düzenledikten sonra build başarısız oldu.** Neredeyse her zaman bir yazım hatası — eksik bir virgül ya da kapatılmamış bir süslü parantez (`{`/`}`). Az önce eklediğin girdiyi yukarıdaki örneklerle karşılaştır; her alan `alan={değer}` şeklinde olmalı ve alanlar arasına virgül konur, son alandan sonra virgül konmaz.
- **Yeni bir takım üyesi görünmüyor.** Dosyasındaki `role` değerinin [Yeni bir takım üyesi ekleme](#yeni-bir-takım-üyesi-ekleme) bölümünde listelenen izin verilen değerlerden birine *tam olarak* aynı yazıldığından emin ol — küçük bir yazım hatası (fazladan boşluk, yanlış büyük/küçük harf) bile tüm dosyanın doğrulamadan geçmemesine ve build'in tamamen başarısız olmasına yol açar.
- **Yeni bir yayın `/publications` sayfasında görünmüyor.** `type` alanının `"paper"` olduğunu doğrula (BibTeX'ten içe aktarılan girdiler, BibTeX türü `@book` olmadığı sürece bunu otomatik olarak varsayılan yapar).
- **Bir fotoğraf bozuk görünüyor veya hiç görünmüyor.** Dosyanın gerçekten yazdığın yolda olduğunu (büyük/küçük harf duyarlı!) ve `public/` değil `src/assets/` altında olduğunu kontrol et.
- **Değişikliğimi canlı sitede henüz göremiyorum.** GitHub'daki **Actions** sekmesini kontrol et — build bir-iki dakika sürer, ve başarısız olduysa hiçbir şey yayınlanmaz.

## Proje yapısı referansı

Daha geniş resmi görmek isteyenler için hızlı bir harita:

```
citations.bib                  ← tüm yayınlar için tek doğru kaynak (BibTeX)
src/
  config.ts                    ← site geneli ayarlar: iletişim bilgisi, sosyal linkler, nav menüsü
  content.config.ts            ← yayınlar/takım/araştırma için veri "şekli" (şema)
  data/projects.ts             ← devam eden ve tamamlanan proje listeleri
  content/
    publications/*.md          ← citations.bib'ten üretilir — elle düzenleme, yukarıya bak
    team/*.md                  ← kişi başına bir dosya
    research/*.md               ← araştırma alanı başına bir dosya
  assets/                      ← optimize edilmiş görseller (fotoğraflar, kapaklar) — içerikten bunlara referans ver
  pages/                       ← sayfa şablonları (sadece düzeni/davranışı değiştirmek için düzenle, içeriği değil)
  components/, layouts/        ← yeniden kullanılabilir arayüz parçaları
scripts/
  import-bibtex.js             ← citations.bib'i src/content/publications/*.md'ye dönüştürür
  generate-sitemap.js          ← build sırasında dist/sitemap.xml'i yazar
.github/workflows/pages.yml    ← main'e her push'ta GitHub Pages'e derler ve yayınlar
```

Daha derin teknik/mimari notlar için (AI kodlama asistanlarına ve gelecekteki katkıda bulunanlara yönelik) [`AGENTS.md`](./AGENTS.md) dosyasına bak.

## Lisans

MIT
