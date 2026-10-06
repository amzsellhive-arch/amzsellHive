// Central site data. Contact + social values here are DEFAULTS —
// the admin can override them from Admin → Site Settings (stored in the
// `pages` table under slug "site", section "settings").

export const SITE_URL = 'https://sellhive.net';

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/results', label: 'Results' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export const DEFAULT_SETTINGS = {
  email: 'info@sellhive.net',
  whatsapp: '', // client to supply (Admin → Site Settings)
  linkedin_label: 'Ishfaq Ahmad',
  linkedin: 'https://www.linkedin.com/in/ishfaq-ahmad-71076417b/',
  youtube: '',
  twitter: '',
  facebook: '',
  instagram: '',
};

// wa.me needs digits only
export const whatsappLink = (num) =>
  num ? `https://wa.me/${String(num).replace(/[^\d]/g, '')}` : '';

export const MARKETPLACES = ['US', 'UK', 'CA', 'DE', 'FR', 'IT', 'ES', 'Other'];

export const HELP_TOPICS = [
  'Amazon PPC Management',
  'Account Management',
  'Listing & Conversion Optimization',
  'Product Research & Sourcing',
  'Creative & Brand Optimization',
  'Free Account Audit',
  'Something else',
];

// Default brand strip (editable from Admin → Site Settings → Brand logos).
export const DEFAULT_BRANDS = [
  { name: 'NU Essentials', logo: '' },
  { name: 'Pure Ingredients', logo: '' },
  { name: 'N’More', logo: '' },
  { name: 'Elyfti', logo: '' },
  { name: 'Skinovative', logo: '' },
  { name: 'Vegas Golf', logo: '' },
  { name: 'pH Harmony', logo: '' },
  { name: 'BoricFem', logo: '' },
  { name: 'Avocado ASU', logo: '' },
];

// Founders — shown on About and Home. Descriptions from the approved About mockup.
export const FOUNDERS = [
  {
    name: 'Ishfaq Ahmad',
    role: 'Founder',
    img: '/images/team/ishfaq-ahmad.webp',
    bio: 'Leads strategy, client growth, and overall business direction at SellHive.',
    linkedin: 'https://www.linkedin.com/in/ishfaq-ahmad-71076417b/',
  },
  {
    name: 'Noman Arshad',
    role: 'Co-Founder',
    img: '/images/team/noman-arshad.webp',
    bio: 'Leads PPC, operations, and account management to drive measurable results for our clients.',
  },
];
