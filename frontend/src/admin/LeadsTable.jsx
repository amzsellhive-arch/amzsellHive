import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLeads, updateLeadStatus, deleteLead } from '../services/leadService';
import { Button } from '@/components/ui/button';
import { useToast } from '../hooks/use-toast';
import { ArrowLeft, Trash2, Mail, Phone, ShoppingBag } from 'lucide-react';

const STATUS_COLORS = {
  New: 'bg-blue-50 text-blue-700 border-blue-200',
  Contact: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  Booking: 'bg-purple-50 text-purple-700 border-purple-200',
  Client: 'bg-green-50 text-green-700 border-green-200',
};

export default function LeadsTable() {
  const { toast } = useToast();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      const res = await getLeads();
      setLeads(res.data);
    } catch {
      toast({ title: 'Failed to load leads', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLeads(); }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateLeadStatus(id, status);
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
      toast({ title: 'Status updated' });
    } catch {
      toast({ title: 'Failed to update status', variant: 'destructive' });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this lead?')) return;
    try {
      await deleteLead(id);
      setLeads((prev) => prev.filter((l) => l.id !== id));
      toast({ title: 'Lead deleted' });
    } catch {
      toast({ title: 'Failed to delete lead', variant: 'destructive' });
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
            <h1 className="font-bold">Leads</h1>
          </div>
          <span className="text-sm text-muted-foreground">{leads.length} total</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Loading leads...</div>
        ) : leads.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">No leads yet.</div>
        ) : (
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-gray-50">
                    <th className="text-left px-5 py-3 font-semibold">Name</th>
                    <th className="text-left px-5 py-3 font-semibold">Contact</th>
                    <th className="text-left px-5 py-3 font-semibold">Interest</th>
                    <th className="text-left px-5 py-3 font-semibold">Date</th>
                    <th className="text-left px-5 py-3 font-semibold">Status</th>
                    <th className="text-right px-5 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-border/50 hover:bg-gray-50">
                      <td className="px-5 py-4">
                        <div className="font-medium">{lead.name}</div>
                        <div className="text-xs text-muted-foreground">{lead.brand}</div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-xs">
                          <Mail size={12} className="text-muted-foreground" /> {lead.email}
                        </div>
                        {lead.phone && (
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                            <Phone size={12} /> {lead.phone}
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-xs">
                          <ShoppingBag size={12} className="text-muted-foreground" />
                          {lead.service_interest || lead.topic || '—'}
                        </div>
                        {lead.budget_range && (
                          <div className="text-xs text-muted-foreground mt-1">{lead.budget_range}</div>
                        )}
                      </td>
                      <td className="px-5 py-4 text-xs text-muted-foreground">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className={`px-3 py-1.5 rounded-full border text-xs font-semibold ${STATUS_COLORS[lead.status] || 'bg-gray-50 text-gray-700 border-gray-200'}`}
                        >
                          <option value="New">New</option>
                          <option value="Contact">Contact</option>
                          <option value="Booking">Booking</option>
                          <option value="Client">Client</option>
                        </select>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(lead.id)} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                          <Trash2 size={15} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
