import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getResultCards } from '../services/cmsService';
import { createResultCard, updateResultCard, deleteResultCard } from '../services/cmsService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '../hooks/use-toast';
import { ArrowLeft, Plus, Trash2, Save, X } from 'lucide-react';

const EMPTY_CARD = {
  niche: '', timeframe: '', headline_result: '', description: '',
  metric_1: '', metric_2: '', metric_3: '', image: '',
};

export default function ResultCards() {
  const { toast } = useToast();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // id or 'new'
  const [draft, setDraft] = useState(EMPTY_CARD);

  const fetchCards = async () => {
    try {
      const res = await getResultCards();
      setCards(res.data);
    } catch {
      toast({ title: 'Failed to load result cards', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCards(); }, []);

  const startNew = () => {
    setDraft(EMPTY_CARD);
    setEditing('new');
  };

  const startEdit = (card) => {
    setDraft({ ...card });
    setEditing(card.id);
  };

  const cancel = () => {
    setEditing(null);
    setDraft(EMPTY_CARD);
  };

  const handleField = (field, value) => setDraft((prev) => ({ ...prev, [field]: value }));

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editing === 'new') {
        const res = await createResultCard(draft);
        setCards([res.data.card, ...cards]);
        toast({ title: 'Result card created' });
      } else {
        const res = await updateResultCard(editing, draft);
        setCards((prev) => prev.map((c) => (c.id === editing ? res.data.card : c)));
        toast({ title: 'Result card updated' });
      }
      cancel();
    } catch {
      toast({ title: 'Failed to save result card', variant: 'destructive' });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this result card?')) return;
    try {
      await deleteResultCard(id);
      setCards((prev) => prev.filter((c) => c.id !== id));
      toast({ title: 'Result card deleted' });
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
            <h1 className="font-bold">Result Cards</h1>
          </div>
          <Button size="sm" onClick={startNew} className="rounded-full bg-[hsl(16,80%,52%)] hover:bg-[hsl(16,80%,45%)]">
            <Plus size={14} className="mr-1" /> New Card
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Loading result cards...</div>
        ) : (
          <div className="space-y-6">
            {editing && (
              <form onSubmit={handleSave} className="bg-white rounded-2xl border-2 border-[hsl(16,80%,52%)]/40 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold">{editing === 'new' ? 'New Result Card' : 'Edit Result Card'}</h2>
                  <Button type="button" variant="ghost" size="sm" onClick={cancel}>
                    <X size={14} className="mr-1" /> Cancel
                  </Button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase text-muted-foreground block mb-1">Niche *</label>
                    <Input required value={draft.niche} onChange={(e) => handleField('niche', e.target.value)} className="rounded-xl" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase text-muted-foreground block mb-1">Timeframe *</label>
                    <Input required value={draft.timeframe} onChange={(e) => handleField('timeframe', e.target.value)} className="rounded-xl" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold uppercase text-muted-foreground block mb-1">Headline Result *</label>
                    <Input required value={draft.headline_result} onChange={(e) => handleField('headline_result', e.target.value)} className="rounded-xl" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold uppercase text-muted-foreground block mb-1">Description</label>
                    <Textarea value={draft.description} onChange={(e) => handleField('description', e.target.value)} rows={2} className="rounded-xl" />
                  </div>
                  {['metric_1', 'metric_2', 'metric_3'].map((m) => (
                    <div key={m}>
                      <label className="text-xs font-semibold uppercase text-muted-foreground block mb-1">{m.replace('_', ' ')}</label>
                      <Input value={draft[m]} onChange={(e) => handleField(m, e.target.value)} placeholder="Label|Value" className="rounded-xl" />
                    </div>
                  ))}
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
              {cards.map((card) => (
                <div key={card.id} className="bg-white rounded-2xl border border-border p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-[11px] font-semibold text-[hsl(16,80%,52%)] uppercase">{card.niche}</div>
                      <div className="text-xs text-muted-foreground">{card.timeframe}</div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => startEdit(card)}>
                        <Save size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(card.id)} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                  <h3 className="font-extrabold text-lg mb-2">{card.headline_result}</h3>
                  {card.description && (
                    <p className="text-sm text-muted-foreground mb-3">{card.description}</p>
                  )}
                  <div className="grid grid-cols-3 gap-2">
                    {[card.metric_1, card.metric_2, card.metric_3].filter(Boolean).map((m, i) => {
                      const [label, value] = m.split('|');
                      return (
                        <div key={i} className="bg-[hsl(30,20%,97%)] rounded-lg p-2 text-center">
                          <div className="text-[10px] text-muted-foreground">{label}</div>
                          <div className="text-sm font-bold">{value}</div>
                        </div>
                      );
                    })}
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
