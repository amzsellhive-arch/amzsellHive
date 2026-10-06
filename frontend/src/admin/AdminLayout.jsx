import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, ClipboardList, Newspaper, TrendingUp, MessagesSquare,
  FileEdit, Settings, ExternalLink, LogOut, Menu, X,
} from 'lucide-react';
import { authApi } from '../lib/auth';

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/leads', label: 'Leads', icon: Users },
  { to: '/admin/audits', label: 'Audit Requests', icon: ClipboardList },
  { to: '/admin/blog', label: 'Blog Posts', icon: Newspaper },
  { to: '/admin/result-cards', label: 'Result Cards', icon: TrendingUp },
  { to: '/admin/testimonials', label: 'Testimonials', icon: MessagesSquare },
  { to: '/admin/cms', label: 'CMS Editor', icon: FileEdit },
  { to: '/admin/settings', label: 'Site Settings', icon: Settings },
];

function SidebarContent({ onNavigate, onLogout }) {
  return (
    <div className="flex h-full flex-col">
      <div className="px-5 py-5 border-b border-white/10">
        <NavLink to="/admin" onClick={onNavigate} className="font-jakarta text-2xl font-extrabold text-white tracking-tight">
          Sell<span className="text-hive">Hive</span>
        </NavLink>
        <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/50">Admin panel</p>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Admin">
        <ul className="space-y-1">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                    isActive ? 'bg-hive text-navy' : 'text-white/75 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                <Icon size={18} aria-hidden="true" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-white/10 px-3 py-4 space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-white/75 hover:bg-white/10 hover:text-white transition-colors"
        >
          <ExternalLink size={18} aria-hidden="true" /> View website
        </a>
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-white/75 hover:bg-red-500/20 hover:text-white transition-colors"
        >
          <LogOut size={18} aria-hidden="true" /> Logout
        </button>
      </div>
    </div>
  );
}

// Wraps every protected /admin page with a sidebar (desktop) / drawer (mobile).
export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      navigate('/admin/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 lg:pl-64">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 z-30 w-64 bg-navy-deep">
        <SidebarContent onLogout={logout} />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden flex items-center justify-between bg-navy-deep px-4 py-3">
        <span className="font-jakarta text-xl font-extrabold text-white">
          Sell<span className="text-hive">Hive</span> <span className="text-xs font-semibold text-white/50">Admin</span>
        </span>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-lg p-2 text-white hover:bg-white/10"
          aria-label="Open admin menu"
          aria-expanded={open}
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} aria-hidden="true" />
          <aside className="absolute inset-y-0 left-0 w-72 max-w-[85%] bg-navy-deep shadow-2xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-4 rounded-lg p-2 text-white/80 hover:bg-white/10"
              aria-label="Close admin menu"
            >
              <X size={20} />
            </button>
            <SidebarContent onNavigate={() => setOpen(false)} onLogout={logout} />
          </aside>
        </div>
      )}

      <Outlet />
    </div>
  );
}
