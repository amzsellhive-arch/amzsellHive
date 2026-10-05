import { useEffect, useState } from 'react';
import { Save, Plus, Trash2, ArrowUp, ArrowDown, Upload, Loader2, X } from 'lucide-react';
import AdminShell, { adminPrimary, adminGhost, adminLabel, adminInput } from './AdminShell';
import { getPageContent, updatePageSection } from '../services/cmsService';
import { uploadImage } from '../services/blogService';
import { DEFAULT_SETTINGS, DEFAULT_BRANDS } from '@/data/site';
import { clearSiteSettingsCache } from '@/hooks/useSiteSettings';
import { useToast } from '../hooks/use-toast';

const CONTACT_FIELDS = [
  { key: 'email', label: 'Email address', placeholder: 'info@sellhive.net' },
  { key: 'whatsapp', label: 'WhatsApp number (international format)', placeholder: '+1 555 123 4567' },
  { key: 'linkedin_label', label: 'LinkedIn display name', placeholder: 'Ishfaq Ahmad' },
];

const SOCIAL_FIELDS = [
  { key: 'linkedin', label: 'LinkedIn URL' },
  { key: 'youtube', label: 'YouTube URL' },
  { key: 'twitter', label: 'X / Twitter URL' },
  { key: 'facebook', label: 'Facebook URL' },
  { key: 'instagram', label: 'Instagram URL' },
];

export default function SiteSettings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [brands, setBrands] = useState(DEFAULT_BRANDS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(null);
  const [uploadingIdx, setUploadingIdx] = useState(null);

  useEffect(() => {
    getPageContent('site')
      .then((res) => {
        const sections = res.data || [];
        const s = sections.find((x) => x.section_key === 'settings')?.content;
        const b = sections.find((x) => x.section_key === 'brands')?.content?.items;
        if (s) setSettings({ ...DEFAULT_SETTINGS, ...s });
        if (Array.isArray(b) && b.length) setBrands(b);
      })
      .catch(() => toast({ title: 'Could not load settings — showing defaults', variant: 'destructive' }))
      .finally(() => setLoading(false));
  }, []);

  const saveSection = async (key, content, label) => {
    setSaving(key);
    try {
      await updatePageSection('site', key, content);
      clearSiteSettingsCache();
      toast({ title: `${label} saved`, description: 'Changes are live on the website.' });
    } catch {
      toast({ title: `Failed to save ${label.toLowerCase()}`, variant: 'destructive' });
    } finally {
      setSaving(null);
    }
  };

  const saveSettings = (e) => {
    e.preventDefault();
    const bad = SOCIAL_FIELDS.find((f) => settings[f.key] && !/^https?:\/\//i.test(settings[f.key]));
    if (bad) {
      toast({ title: `${bad.label} must start with https://`, variant: 'destructive' });
      return;
    }
    saveSection('settings', settings, 'Contact & social links');
  };

  const updateBrand = (i, patch) => setBrands((list) => list.map((b, idx) => (idx === i ? { ...b, ...patch } : b)));
  const move = (i, dir) =>
    setBrands((list) => {
      const j = i + dir;
      if (j < 0 || j >= list.length) return list;
      const next = [...list];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });

  const onLogo = async (i, file) => {
    if (!file) return;
    setUploadingIdx(i);
    try {
      const res = await uploadImage(file);
      updateBrand(i, { logo: res.data.url });
    } catch (err) {
      toast({ title: 'Upload failed', description: err?.response?.data?.errors?.file?.[0] || 'Use a PNG, JPG or WebP under 5 MB.', variant: 'destructive' });
    } finally {
      setUploadingIdx(null);
    }
  };

  const saveBrands = () => {
    const items = brands.map((b) => ({ name: b.name.trim(), logo: b.logo || '' })).filter((b) => b.name);
    if (!items.length) {
      toast({ title: 'Add at least one brand', variant: 'destructive' });
      return;
    }
    saveSection('brands', { items }, 'Brand logos');
  };

  if (loading) {
    return <AdminShell title="Site Settings"><div className="text-center py-20 text-muted-foreground">Loading settings...</div></AdminShell>;
  }

  return (
    <AdminShell title="Site Settings">
      <div className="grid lg:grid-cols-2 gap-6 items-start">
        <form onSubmit={saveSettings} className="bg-white rounded-2xl border border-border p-6 space-y-5">
          <div>
            <h2 className="font-bold text-lg">Contact & social links</h2>
            <p className="text-sm text-muted-foreground">Shown on the Contact page and in the footer. Leave a social URL empty to hide its icon.</p>
          </div>
          {CONTACT_FIELDS.map((f) => (
            <div key={f.key}>
              <label htmlFor={f.key} className={adminLabel}>{f.label}</label>
              <input id={f.key} value={settings[f.key] || ''} placeholder={f.placeholder} onChange={(e) => setSettings((s) => ({ ...s, [f.key]: e.target.value }))} className={adminInput} />
            </div>
          ))}
          <hr className="border-border" />
          {SOCIAL_FIELDS.map((f) => (
            <div key={f.key}>
              <label htmlFor={f.key} className={adminLabel}>{f.label}</label>
              <input id={f.key} type="url" value={settings[f.key] || ''} placeholder="https://" onChange={(e) => setSettings((s) => ({ ...s, [f.key]: e.target.value.trim() }))} className={adminInput} />
            </div>
          ))}
          <div className="flex justify-end">
            <button type="submit" disabled={saving === 'settings'} className={adminPrimary}>
              {saving === 'settings' ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save links
            </button>
          </div>
        </form>

        <div className="bg-white rounded-2xl border border-border p-6 space-y-5">
          <div>
            <h2 className="font-bold text-lg">Brand logos (homepage carousel)</h2>
            <p className="text-sm text-muted-foreground">Brands without a logo show their name as text. Transparent PNG or WebP works best.</p>
          </div>
          <ul className="space-y-3">
            {brands.map((b, i) => (
              <li key={i} className="flex items-center gap-3 rounded-xl border border-border p-3">
                <div className="flex h-14 w-24 shrink-0 items-center justify-center rounded-lg bg-gray-50 overflow-hidden relative">
                  {uploadingIdx === i ? (
                    <Loader2 size={18} className="animate-spin text-muted-foreground" />
                  ) : b.logo ? (
                    <>
                      <img src={b.logo} alt="" className="max-h-12 max-w-[88px] object-contain" />
                      <button type="button" onClick={() => updateBrand(i, { logo: '' })} className="absolute top-0.5 right-0.5 p-0.5 rounded-full bg-white shadow" aria-label={`Remove ${b.name} logo`}>
                        <X size={11} />
                      </button>
                    </>
                  ) : (
                    <label className="flex flex-col items-center text-[11px] text-muted-foreground cursor-pointer">
                      <Upload size={15} /> Logo
                      <input type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" onChange={(e) => onLogo(i, e.target.files?.[0])} aria-label={`Upload logo for ${b.name || 'brand'}`} />
                    </label>
                  )}
                </div>
                <input value={b.name} onChange={(e) => updateBrand(i, { name: e.target.value })} placeholder="Brand name" className={adminInput} aria-label="Brand name" />
                <div className="flex shrink-0">
                  <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30" aria-label="Move up"><ArrowUp size={15} /></button>
                  <button type="button" onClick={() => move(i, 1)} disabled={i === brands.length - 1} className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30" aria-label="Move down"><ArrowDown size={15} /></button>
                  <button type="button" onClick={() => setBrands((l) => l.filter((_, idx) => idx !== i))} className="p-1.5 rounded text-red-600 hover:bg-red-50" aria-label="Remove brand"><Trash2 size={15} /></button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between">
            <button type="button" onClick={() => setBrands((l) => [...l, { name: '', logo: '' }])} className={adminGhost}>
              <Plus size={14} /> Add brand
            </button>
            <button type="button" onClick={saveBrands} disabled={saving === 'brands'} className={adminPrimary}>
              {saving === 'brands' ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save brands
            </button>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
