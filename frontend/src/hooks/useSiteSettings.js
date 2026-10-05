import { useEffect, useState } from 'react';
import api from '@/services/api';
import { DEFAULT_SETTINGS, DEFAULT_BRANDS } from '@/data/site';

// Site-wide settings (contact details, social links, brand logos) editable
// from Admin → Site Settings. Falls back to defaults if the API is offline.
let cache = null;
let inflight = null;

function load() {
  if (cache) return Promise.resolve(cache);
  if (!inflight) {
    inflight = api
      .get('/pages/site')
      .then((res) => {
        const sections = Array.isArray(res.data) ? res.data : [];
        const get = (key) => sections.find((s) => s.section_key === key)?.content || null;
        const settings = { ...DEFAULT_SETTINGS, ...(get('settings') || {}) };
        const brandsContent = get('brands');
        const brands =
          Array.isArray(brandsContent?.items) && brandsContent.items.length > 0
            ? brandsContent.items
            : DEFAULT_BRANDS;
        cache = { settings, brands };
        return cache;
      })
      .catch(() => {
        inflight = null;
        return { settings: DEFAULT_SETTINGS, brands: DEFAULT_BRANDS };
      });
  }
  return inflight;
}

export function clearSiteSettingsCache() {
  cache = null;
  inflight = null;
}

export default function useSiteSettings() {
  const [data, setData] = useState(cache || { settings: DEFAULT_SETTINGS, brands: DEFAULT_BRANDS });
  useEffect(() => {
    let alive = true;
    load().then((d) => alive && setData(d));
    return () => {
      alive = false;
    };
  }, []);
  return data;
}
