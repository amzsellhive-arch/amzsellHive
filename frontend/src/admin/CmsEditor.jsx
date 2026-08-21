import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAdminPages, updatePageSection, deletePageSection } from '../services/cmsService';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '../hooks/use-toast';
import { ArrowLeft, Save, Trash2, Plus, X } from 'lucide-react';

export default function CmsEditor() {
  const { toast } = useToast();
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null); // { slug, section_key, content }
  const [draft, setDraft] = useState({});
  const [saving, setSaving] = useState(false);

  const fetchPages = async () => {
    try {
      const res = await getAdminPages();
      setPages(res.data);
      if (res.data.length > 0) {
        const first = res.data[0];
        selectSection(first);
      }
    } catch {
      toast({ title: 'Failed to load pages', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPages(); }, []);

  const selectSection = (section) => {
    setSelected(section);
    setDraft(section.content || {});
  };

  const groupBy = (items, key) => {
    return items.reduce((acc, item) => {
      (acc[item[key]] = acc[item[key]] || []).push(item);
      return acc;
    }, {});
  };

  const grouped = groupBy(pages, 'slug');

  const handleFieldChange = (field, value) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      const res = await updatePageSection(selected.slug, selected.section_key, draft);
      toast({ title: 'Section saved', description: `${selected.slug}/${selected.section_key} updated` });
      // Refresh local page list
      const updated = { ...selected, content: res.data.page.content };
      setPages((prev) => prev.map((p) =>
        (p.slug === selected.slug && p.section_key === selected.section_key) ? updated : p
      ));
      setSelected(updated);
    } catch {
      toast({ title: 'Failed to save', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selected) return;
    if (!confirm(`Delete section ${selected.slug}/${selected.section_key}?`)) return;
    try {
      await deletePageSection(selected.slug, selected.section_key);
      toast({ title: 'Section deleted' });
      const remaining = pages.filter((p) =>
        !(p.slug === selected.slug && p.section_key === selected.section_key)
      );
      setPages(remaining);
      if (remaining.length > 0) selectSection(remaining[0]);
      else setSelected(null);
    } catch {
      toast({ title: 'Failed to delete', variant: 'destructive' });
    }
  };

  const renderField = (key, value) => {
    if (typeof value === 'string') {
      const isLong = value.length > 80;
      return (
        <div key={key}>
          <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">{key}</label>
          {isLong ? (
            <Textarea
              value={value}
              onChange={(e) => handleFieldChange(key, e.target.value)}
              rows={3}
              className="rounded-xl"
            />
          ) : (
            <Input
              value={value}
              onChange={(e) => handleFieldChange(key, e.target.value)}
              className="rounded-xl"
            />
          )}
        </div>
      );
    }
    if (Array.isArray(value)) {
      return (
        <div key={key}>
          <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">{key} (array)</label>
          <div className="space-y-2">
            {value.map((item, idx) => {
              if (typeof item === 'string') {
                return (
                  <div key={idx} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) => {
                        const next = [...value];
                        next[idx] = e.target.value;
                        handleFieldChange(key, next);
                      }}
                      className="rounded-xl"
                    />
                    <Button variant="ghost" size="icon" onClick={() => {
                      const next = value.filter((_, i) => i !== idx);
                      handleFieldChange(key, next);
                    }}>
                      <X size={14} />
                    </Button>
                  </div>
                );
              }
              if (typeof item === 'object') {
                return (
                  <div key={idx} className="border border-border rounded-xl p-3 space-y-2 bg-gray-50">
                    {Object.entries(item).map(([k, v]) => (
                      <div key={k}>
                        <label className="text-[11px] font-semibold text-muted-foreground uppercase mb-0.5 block">{k}</label>
                        <Input
                          value={v}
                          onChange={(e) => {
                            const next = [...value];
                            next[idx] = { ...next[idx], [k]: e.target.value };
                            handleFieldChange(key, next);
                          }}
                          className="rounded-lg h-9"
                        />
                      </div>
                    ))}
                    <Button variant="ghost" size="sm" className="text-red-600" onClick={() => {
                      const next = value.filter((_, i) => i !== idx);
                      handleFieldChange(key, next);
                    }}>
                      <Trash2 size={14} className="mr-1" /> Remove
                    </Button>
                  </div>
                );
              }
              return null;
            })}
            <Button variant="outline" size="sm" onClick={() => handleFieldChange(key, [...value, ''])}>
              <Plus size={14} className="mr-1" /> Add item
            </Button>
          </div>
        </div>
      );
    }
    if (typeof value === 'object' && value !== null) {
      return (
        <div key={key}>
          <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">{key} (object)</label>
          <div className="border border-border rounded-xl p-3 space-y-2 bg-gray-50">
            {Object.entries(value).map(([k, v]) => (
              <div key={k}>
                <label className="text-[11px] font-semibold text-muted-foreground uppercase mb-0.5 block">{k}</label>
                <Input
                  value={v}
                  onChange={(e) => {
                    const next = { ...value, [k]: e.target.value };
                    handleFieldChange(key, next);
                  }}
                  className="rounded-lg h-9"
                />
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-muted-foreground">
        Loading CMS content...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/admin" className="p-2 rounded-lg hover:bg-gray-100">
              <ArrowLeft size={18} />
            </Link>
            <h1 className="font-bold">CMS Editor</h1>
          </div>
          <span className="text-sm text-muted-foreground">{pages.length} sections</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {pages.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            No CMS sections found. Run the seeders to create default page content.
          </div>
        ) : (
          <div className="grid lg:grid-cols-[280px_1fr] gap-6">
            {/* Sidebar: page sections */}
            <aside className="bg-white rounded-2xl border border-border p-4 h-fit lg:sticky lg:top-20">
              <div className="space-y-4">
                {Object.entries(grouped).map(([slug, sections]) => (
                  <div key={slug}>
                    <div className="text-xs font-bold uppercase text-muted-foreground mb-1.5 px-2">{slug}</div>
                    <div className="space-y-1">
                      {sections.map((s) => (
                        <button
                          key={s.section_key}
                          onClick={() => selectSection(s)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            selected?.slug === s.slug && selected?.section_key === s.section_key
                              ? 'bg-[hsl(16,80%,52%)]/10 text-[hsl(16,80%,52%)] font-semibold'
                              : 'hover:bg-gray-100 text-muted-foreground'
                          }`}
                        >
                          {s.section_key}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            {/* Editor */}
            <section className="bg-white rounded-2xl border border-border p-6">
              {selected ? (
                <>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                    <div>
                      <div className="text-xs font-semibold text-[hsl(16,80%,52%)] uppercase">
                        {selected.slug} / {selected.section_key}
                      </div>
                      <h2 className="text-xl font-extrabold mt-1">Edit section</h2>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={handleDelete} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                        <Trash2 size={14} className="mr-1" /> Delete
                      </Button>
                      <Button size="sm" onClick={handleSave} disabled={saving} className="rounded-full bg-[hsl(16,80%,52%)] hover:bg-[hsl(16,80%,45%)]">
                        <Save size={14} className="mr-1" /> {saving ? 'Saving...' : 'Save'}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {Object.entries(draft).length === 0 ? (
                      <p className="text-sm text-muted-foreground">This section has no editable content.</p>
                    ) : (
                      Object.entries(draft).map(([key, value]) => renderField(key, value))
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-20 text-muted-foreground">Select a section to edit.</div>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
