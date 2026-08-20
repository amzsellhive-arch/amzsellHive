import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getDashboard, getLeads, updateLeadStatus, deleteLead } from '../services/leadService';
import { authApi } from '../lib/auth';
import { Button } from '../components/ui/button';
import { useToast } from '../hooks/use-toast';
import {
  Users, TrendingUp, ClipboardList, LogOut, LayoutDashboard, MousePointerClick, MessagesSquare, ArrowRight, Mail, Phone, ShoppingBag, Trash2, Sparkles, X, ExternalLink
} from 'lucide-react';

const STATUS_COLORS = {
  New: 'bg-blue-50 text-blue-700 border-blue-200',
  Contact: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  Booking: 'bg-purple-50 text-purple-700 border-purple-200',
  Client: 'bg-green-50 text-green-700 border-green-200',
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast, dismiss } = useToast();
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState([]);
  const [leadsLoading, setLeadsLoading] = useState(true);
  const [welcomeData, setWelcomeData] = useState(null);

  // Show the professional "Welcome back" popup once, right after login.
  useEffect(() => {
    const raw = sessionStorage.getItem('admin_welcome');
    if (raw) {
      try {
        setWelcomeData(JSON.parse(raw));
      } catch {
        setWelcomeData(null);
      }
      sessionStorage.removeItem('admin_welcome');
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('admin_user');
    if (stored) setUser(JSON.parse(stored));
    Promise.all([getDashboard(), authApi.getCurrentUser()])
      .then(([dash, u]) => {
        setData(dash.data);
        if (u) setUser(u);
      })
      .catch(() => toast({ title: 'Failed to load dashboard', variant: 'destructive' }))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    getLeads()
      .then((res) => setLeads(res.data))
      .catch(() => toast({ title: 'Failed to load leads', variant: 'destructive' }))
      .finally(() => setLeadsLoading(false));
  }, []);

const handleStatusChange = async (id, status) => {
    try {
      await updateLeadStatus(id, status);
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
      const lead = leads.find((l) => l.id === id);
      const name = lead?.name || 'this client';
      toast({
        title: 'Status updated',
        description: `You've changed ${name}'s status to ${status}.`,
action: (
          <button
            onClick={() => dismiss()}
            className="rounded-md bg-[hsl(16,80%,52%)] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[hsl(16,80%,45%)]"
          >
            Got it
          </button>
        ),
      });
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

  const handleLogout = async () => {
    await authApi.logout();
    navigate('/admin/login');
  };

  const stats = [
    { label: 'Total Leads', value: data?.total_leads ?? 0, icon: Users, color: 'text-blue-600 bg-blue-50' },
    { label: 'New Leads', value: data?.new_leads ?? 0, icon: TrendingUp, color: 'text-green-600 bg-green-50' },
    { label: 'Leads This Week', value: data?.leads_this_week ?? 0, icon: MousePointerClick, color: 'text-purple-600 bg-purple-50' },
    { label: 'Total Audits', value: data?.total_audits ?? 0, icon: ClipboardList, color: 'text-[hsl(16,80%,52%)] bg-[hsl(16,80%,52%)]/10' },
  ];

  const links = [
    { to: '/admin/leads', label: 'Manage Leads', desc: 'View & update lead statuses', icon: Users },
    { to: '/admin/audits', label: 'Audit Requests', desc: 'Review audit submissions', icon: ClipboardList },
    { to: '/admin/cms', label: 'CMS Editor', desc: 'Edit page content', icon: LayoutDashboard },
    { to: '/admin/result-cards', label: 'Result Cards', desc: 'Manage proven results', icon: TrendingUp },
    { to: '/admin/testimonials', label: 'Testimonials', desc: 'Manage client feedback', icon: MessagesSquare },
  ];

const closeWelcome = () => setWelcomeData(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome back popup (shown once after login) */}
      {welcomeData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeWelcome}
          />
          <div className="relative bg-white rounded-3xl shadow-2xl border border-border max-w-sm w-full p-8 text-center animate-[fadeIn_0.3s_ease-out]">
            <button
              onClick={closeWelcome}
              className="absolute top-4 right-4 p-1.5 rounded-full text-muted-foreground hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[hsl(16,80%,52%)] to-[hsl(16,90%,40%)] flex items-center justify-center shadow-lg shadow-[hsl(16,80%,52%)]/30">
              <Sparkles size={30} className="text-white" />
            </div>
            <h3 className="text-xl font-extrabold mb-1">Welcome back!</h3>
            <p className="text-muted-foreground mb-6">
              Great to see you again, <span className="font-semibold text-foreground">{welcomeData.name}</span>. You're all set to manage your dashboard.
            </p>
            <Button
              onClick={closeWelcome}
              className="w-full bg-[hsl(16,80%,52%)] hover:bg-[hsl(16,80%,45%)] text-white font-bold py-3 rounded-full"
            >
              Let's get started
            </Button>
          </div>
        </div>
      )}

      {/* Top bar */}
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[hsl(16,80%,52%)] text-white flex items-center justify-center font-bold">
              S
            </div>
            <div>
              <h1 className="font-bold leading-tight">SellHive Admin</h1>
              <p className="text-xs text-muted-foreground">{user?.email || 'Dashboard'}</p>
            </div>
          </div>
<div className="flex items-center gap-3">
            <Link to="/" className="btn-view-site">
              View site
              <ExternalLink size={14} className="btn-arrow" />
            </Link>
            <button onClick={handleLogout} className="btn-logout">
              <LogOut size={15} className="logout-icon" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-3xl font-extrabold leading-tight">
              Overview <span className="text-gradient">Dashboard</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Welcome back — here's what's happening with your leads.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-border text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Live data
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Loading dashboard...</div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {stats.map((s, i) => (
                <div key={i} className={`animate-slide-up ${i === 0 ? 'stagger-1' : i === 1 ? 'stagger-2' : i === 2 ? 'stagger-3' : 'stagger-4'}`}>
                  {i === 0 ? (
                    <div className="card-orbit">
                      <div className="card-orbit-inner">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${s.color}`}>
                          <s.icon size={20} />
                        </div>
                        <div className="text-3xl font-extrabold">{s.value}</div>
                        <div className="text-sm text-muted-foreground">{s.label}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-2xl border border-border p-5 card-hover">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${s.color}`}>
                        <s.icon size={20} />
                      </div>
                      <div className="text-3xl font-extrabold">{s.value}</div>
                      <div className="text-sm text-muted-foreground">{s.label}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>

{/* All Leads inline */}
            <div className="bg-white rounded-2xl border border-border overflow-hidden mb-10">
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <h3 className="font-bold text-lg">All Leads</h3>
                <span className="text-sm text-muted-foreground">{leads.length} total</span>
              </div>
              {leadsLoading ? (
                <div className="text-center py-16 text-muted-foreground">Loading leads...</div>
              ) : leads.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">No leads yet.</div>
              ) : (
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
              )}
            </div>

            {/* Quick links */}
            <h3 className="font-bold text-lg mb-4">Manage</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
{links.map((l, i) => (
                <Link key={i} to={l.to} className={`bg-white rounded-2xl border border-border p-6 card-hover card-shine group animate-slide-up stagger-${i + 1}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[hsl(16,80%,52%)]/10 flex items-center justify-center">
                      <l.icon size={20} className="text-[hsl(16,80%,52%)]" />
                    </div>
                    <ArrowRight size={16} className="text-muted-foreground group-hover:text-[hsl(16,80%,52%)] transition-transform group-hover:translate-x-1" />
                  </div>
                  <h4 className="font-bold">{l.label}</h4>
                  <p className="text-sm text-muted-foreground">{l.desc}</p>
                </Link>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
