import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Shared top bar for admin sub-pages (matches existing admin styling).
export default function AdminShell({ title, back = '/admin', actions, children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link to={back} className="p-2 rounded-lg hover:bg-gray-100" aria-label="Back">
              <ArrowLeft size={18} />
            </Link>
            <h1 className="font-bold truncate">{title}</h1>
          </div>
          <div className="flex items-center gap-2">{actions}</div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
}

export const adminBtn =
  'inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-50';
export const adminPrimary = `${adminBtn} bg-[hsl(16,80%,52%)] hover:bg-[hsl(16,80%,45%)] text-white`;
export const adminGhost = `${adminBtn} border border-border bg-white hover:bg-gray-50 text-foreground`;
export const adminLabel = 'text-xs font-semibold uppercase text-muted-foreground block mb-1';
export const adminInput =
  'w-full rounded-xl border border-input bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(16,80%,52%)]/30 focus:border-[hsl(16,80%,52%)]';
