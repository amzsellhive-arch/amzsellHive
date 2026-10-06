import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { NAV_LINKS } from '@/data/site';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Results detail pages keep "Results" active; blog posts keep "Blog" active.
  const isActive = (href) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 bg-navy-deep text-white border-b border-white/10 transition-shadow ${
        scrolled ? 'shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)]' : ''
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-hive focus:px-3 focus:py-2 focus:text-navy focus:font-bold"
      >
        Skip to content
      </a>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[68px] items-center justify-between gap-4">
          <Link to="/" className="font-jakarta text-[1.7rem] font-extrabold tracking-tight leading-none" aria-label="SellHive home">
            Sell<span className="text-hive">Hive</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7" aria-label="Main">
            {NAV_LINKS.map((l) => {
              const active = isActive(l.href);
              return (
                <NavLink
                  key={l.href}
                  to={l.href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative py-6 text-[15px] font-medium transition-colors ${
                    active ? 'text-hive' : 'text-white/90 hover:text-hive'
                  }`}
                >
                  {l.label}
                  {active && <span className="absolute left-0 right-0 -bottom-px h-[3px] rounded-full bg-hive" />}
                </NavLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/audit"
              className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-hive px-4 py-2.5 text-sm font-bold text-navy hover:bg-hive-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hive focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep"
            >
              Get a Free Account Audit <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <button
              type="button"
              className="lg:hidden p-2 -mr-2 rounded-md hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hive"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="lg:hidden border-t border-white/10 bg-navy-deep">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col" aria-label="Mobile">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.href}
                to={l.href}
                className={`py-3 text-base font-medium border-b border-white/5 ${
                  isActive(l.href) ? 'text-hive' : 'text-white/90'
                }`}
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/audit"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-hive px-4 py-3 font-bold text-navy"
            >
              Get a Free Account Audit <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
