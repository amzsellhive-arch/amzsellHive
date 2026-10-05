import { useEffect } from 'react';
import { SITE_URL } from '@/data/site';

const DEFAULT_DESC =
  'Founder-led Amazon management. SellHive cuts wasted ad spend and scales profitable campaigns for private-label brands — PPC, listings, account management and growth.';

function setMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

// Lightweight per-page SEO (title, description, canonical, OG).
export default function useSeo({ title, description, image, path } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | SellHive` : 'SellHive — Amazon Growth, Measured in Net Profit';
    const desc = description || DEFAULT_DESC;
    document.title = fullTitle;
    setMeta('name', 'description', desc);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', desc);
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', desc);
    if (image) {
      const abs = image.startsWith('http') ? image : `${SITE_URL}${image}`;
      setMeta('property', 'og:image', abs);
      setMeta('name', 'twitter:image', abs);
    }
    const url = `${SITE_URL}${path ?? window.location.pathname}`;
    setMeta('property', 'og:url', url);
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }, [title, description, image, path]);
}
