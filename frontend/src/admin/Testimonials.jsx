import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTestimonials } from '../services/cmsService';
import { createTestimonial, updateTestimonial, deleteTestimonial } from '../services/cmsService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '../hooks/use-toast';
import { ArrowLeft, Plus, Trash2, Save, X, Quote } from 'lucide-react';

const EMPTY = { name: '', type: 'text', content: '', video_url: '', image: '' };

export default function Testimonials() {
  const { toast } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState(EMPTY);

  const fetchItems = async () => {
    try {
      const res = await getTestimonials();
      setItems(res.data);
    } catch {
      toast({ title: 'Failed to load testimonials', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const startNew = () => { setDraft(EMPTY); setEditing('new'); };
  const startEdit = (item) => { setDraft({ ...item }); setEditing(item.id); };
  const cancel = () => { setEditing(null); setDraft(EMPTY); };
  const handleField = (field, value) => setDraft((prev) => ({ ...prev, [field]: value }));

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editing === 'new') {
        const res = await createTestimonial(draft);
        setItems([res.data.testimonial, ...items]);
        toast({ title: 'Testimonial created' });
      } else {
        const res = await updateTestimonial(editing, draft);
        setItems((prev) => prev.map((t) => (t.id === editing ? res.data.testimonial : t)));
        toast({ title: 'Testimonial updated' });
      }
      cancel();
    } catch {
      toast({ title: 'Failed to save testimonial', variant: 'destructive' });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      await deleteTestimonial(id);
      setItems((prev) => prev.filter((t) => t.id !== id));
      toast({ title: 'Testimonial deleted' });
    } catch {
      toast({ title: 'Failed to delete', variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/admin" className="p-2 rounded-lg hover:bg-gray-100">
              <ArrowLeft size={18} />
            </Link>
            <h1 className="font-bold">Testimonials</h1>
          </div>
          <Button size="sm" onClick={startNew} className="rounded-full bg-[hsl(16,80%,52%)] hover:bg-[hsl(16,80%,45%)]">
            <Plus size={14} className="mr-1" /> New Testimonial
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Loading testimonials...</div>
        ) : (
          <div className="space-y-6">
            {editing && (
              <form onSubmit={handleSave} className="bg-white rounded-2xl border-2 border-[hsl(16,80%,52%)]/40 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold">{editing === 'new' ? 'New Testimonial' : 'Edit Testimonial'}</h2>
                  <Button type="button" variant="ghost" size="sm" onClick={cancel}>
                    <X size={14} className="mr-1" /> Cancel
                  </Button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase text-muted-foreground block mb-1">Name *</label>
                    <Input required value={draft.name} onChange={(e) => handleField('name', e.target.value)} className="rounded-xl" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase text-muted-foreground block mb-1">Type</label>
                    <select
                      value={draft.type}
                      onChange={(e) => handleField('type', e.target.value)}
                      className="w-full h-10 px-3 border border-input rounded-xl text-sm bg-white"
                    >
                      <option value="text">Text</option>
                      <option value="video">Video</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold uppercase text-muted-foreground block mb-1">Content</label>
                    <Textarea value={draft.content} onChange={(e) => handleField('content', e.target.value)} rows={3} className="rounded-xl" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase text-muted-foreground block mb-1">Video URL</label>
                    <Input value={draft.video_url} onChange={(e) => handleField('video_url', e.target.value)} className="rounded-xl" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase text-muted-foreground block mb-1">Image URL</label>
                    <Input value={draft.image} onChange={(e) => handleField('image', e.target.value)} className="rounded-xl" />
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button type="submit" className="rounded-full bg-[hsl(16,80%,52%)] hover:bg-[hsl(16,80%,45%)]">
                    <Save size={14} className="mr-1" /> Save
                  </Button>
                </div>
              </form>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((t) => (
                <div key={t.id} className="bg-white rounded-2xl border border-border p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-9 h-9 rounded-full bg-[hsl(16,80%,52%)]/10 flex items-center justify-center">
                      <Quote size={16} className="text-[hsl(16,80%,52%)]" />
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => startEdit(t)}>
                        <Save size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(t.id)} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{t.content || '—'}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.type}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
