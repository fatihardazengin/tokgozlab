import heroImage from './assets/tokgoz-lab-hero.png';

export const SITE = {
  // Set Astro's `site` option when the lab's production domain is chosen.
  website: '',
  author: 'Korkut Kaan Tokgöz',
  description:
    'Tokgöz Lab at Sabancı University develops energy-efficient mmWave and sub-terahertz CMOS circuits, integrated systems, and intelligent hardware for future communications.',
  title: 'Tokgöz Lab',
  ogImage: '/og/index.png',
  lightAndDarkMode: false,
  postPerPage: 10,
  scheduledPostMargin: 15 * 60 * 1000,

  labName: 'Tokgöz Lab',
  university: 'Sabancı University · Electronics Engineering',
  logo: '/assets/tokgoz-lab-mark.svg',
  avatar: '/assets/tokgoz-lab-mark.svg',
  email: 'korkut.tokgoz@sabanciuniv.edu',

  profile: {
    name: 'Korkut Kaan Tokgöz',
    role: 'Faculty Member',
    department: 'Electronics Engineering',
    university: 'Sabancı University',
    officialUrl: 'https://fens.sabanciuniv.edu/en/faculty-members/detail/3672',
    personalUrl: 'https://korkutkaantokgoz.com/',
    scholarUrl: 'https://scholar.google.com/citations?user=NTSfdkcAAAAJ',
    orcidUrl: 'https://orcid.org/0000-0002-5724-6349',
    linkedinUrl: 'https://tr.linkedin.com/in/korkut-kaan-tokgoz-92b07633',
  },

  contact: {
    phone: '+90 216 483 9290',
    address:
      'Faculty of Engineering and Natural Sciences, Sabancı University, Orta Mahalle, 34956 Tuzla, İstanbul, Türkiye',
  },

  hero: {
    eyebrow: 'Integrated circuits for the next wireless frontier',
    title: 'From silicon to sub-terahertz systems.',
    subtitle:
      'We design energy-efficient CMOS circuits and intelligent hardware for ultra-high-data-rate communications, sensing, and connected systems.',
    action: 'Explore our research',
    image: heroImage,
  },

  nav: [
    { text: 'Research', link: '/research', key: 'research' },
    { text: 'Projects', link: '/projects', key: 'projects' },
    { text: 'Publications', link: '/publications', key: 'publications' },
    { text: 'People', link: '/team', key: 'team' },
    { text: 'Opportunities', link: '/join', key: 'join' },
    { text: 'Search', link: '/search', key: 'search' },
  ],

  customPages: [],

  i18n: {
    enabled: false,
    defaultLocale: 'en',
  },
};

export const LOCALE = {
  lang: 'en',
  langTag: ['en-US'],
} as const;

export const LOGO_IMAGE = {
  enable: true,
  svg: true,
  width: 44,
  height: 44,
};

export const SOCIALS = [
  { link: SITE.profile.scholarUrl, label: 'Google Scholar', active: true },
  { link: SITE.profile.orcidUrl, label: 'ORCID', active: true },
  { link: SITE.profile.linkedinUrl, label: 'LinkedIn', active: true },
];

export const DEFAULT_LANG = 'en';
