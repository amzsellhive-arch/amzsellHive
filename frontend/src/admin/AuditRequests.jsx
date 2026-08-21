import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuditRequests, deleteAuditRequest } from '../services/leadService';
import { Button } from '@/components/ui/button';
import { useToast } from '../hooks/use-toast';
import { ArrowLeft, Trash2, Mail, ShoppingBag, AlertTriangle } from 'lucide-react';

export default function AuditRequests() {
  const { toast } = useToast();
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAudits = async () => {
    try {
      const res = await getAuditRequests();
      setAudits(res.data);
    } catch {
      toast({ title: 'Failed to load audit requests', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAudits(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this audit request?')) return;
    try {
      await deleteAuditRequest(id);
      setAudits((prev) => prev.filter((a) => a.id !== id));
      toast({ title: 'Audit request deleted' });
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
            <h1 className="font-bold">Audit Requests</h1>
          </div>
          <span className="text-sm text-muted-foreground">{audits.length} total</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Loading audit requests...</div>
        ) : audits.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">No audit requests yet.</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {audits.map((a) => (
              <div key={a.id} className="bg-white rounded-2xl border border-border p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold">{a.name}</h3>
                    <div className="text-xs text-muted-foreground">{a.brand}</div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(a.id)} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                    <Trash2 size={15} />
                  </Button>
                </div>
                <div className="flex items-center gap-1.5 text-xs mb-2">
                  <Mail size={12} className="text-muted-foreground" /> {a.email}
                </div>
                <div className="flex flex-wrap gap-2 text-xs mb-3">
                  {a.revenue_range && (
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full">{a.revenue_range}</span>
                  )}
                  {a.marketplace && (
                    <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded-full">{a.marketplace}</span>
                  )}
                </div>
                {a.problem && (
                  <div className="text-sm bg-[hsl(30,20%,97%)] rounded-xl p-3 flex gap-2">
                    <AlertTriangle size={15} className="text-[hsl(16,80%,52%)] mt-0.5 flex-shrink-0" />
                    <span>{a.problem}</span>
                  </div>
                )}
                <div className="text-xs text-muted-foreground mt-3">
                  {new Date(a.created_at).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
