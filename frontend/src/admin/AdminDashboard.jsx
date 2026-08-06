import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getDashboard } from '../services/leadService';
import { authApi } from '../lib/auth';
import { Button } from '../components/ui/button';
import { useToast } from '../hooks/use-toast';
import {
  Users, FileText, TrendingUp, ClipboardList, LogOut, LayoutDashboard, MousePointerClick, MessagesSquare, ArrowRight
} from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen bg-gray-50">
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
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">View site</Link>
            <Button variant="outline" size="sm" onClick={handleLogout} className="rounded-full">
              <LogOut size={14} className="mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-2xl font-extrabold mb-6">Overview</h2>

        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Loading dashboard...</div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {stats.map((s, i) => (
                <div key={i} className="bg-white rounded-2xl border border-border p-5">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${s.color}`}>
                    <s.icon size={20} />
                  </div>
                  <div className="text-3xl font-extrabold">{s.value}</div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Leads by status */}
            {data?.leads_by_status?.length > 0 && (
              <div className="bg-white rounded-2xl border border-border p-6 mb-10">
                <h3 className="font-bold mb-4">Leads by Status</h3>
                <div className="space-y-3">
                  {data.leads_by_status.map((s) => (
                    <div key={s.status} className="flex items-center gap-3">
                      <span className="w-24 text-sm">{s.status}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                        <div
                          className="h-full bg-[hsl(16,80%,52%)] rounded-full"
                          style={{ width: `${(s.total / data.total_leads) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold w-8 text-right">{s.total}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick links */}
            <h3 className="font-bold text-lg mb-4">Manage</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {links.map((l, i) => (
                <Link key={i} to={l.to} className="bg-white rounded-2xl border border-border p-6 card-hover group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[hsl(16,80%,52%)]/10 flex items-center justify-center">
                      <l.icon size={20} className="text-[hsl(16,80%,52%)]" />
                    </div>
                    <ArrowRight size={16} className="text-muted-foreground group-hover:text-[hsl(16,80%,52%)] transition-colors" />
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
