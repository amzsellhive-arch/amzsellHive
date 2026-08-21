import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/results', label: 'Results' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1">
            <span className="text-2xl font-extrabold tracking-tight text-foreground">
              Sell<span className="text-[hsl(16,80%,52%)]">Hive</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-[hsl(16,80%,52%)] ${
                  location.pathname === link.href
                    ? 'text-[hsl(16,80%,52%)] font-semibold'
                    : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/audit">
              <Button className="btn-glow btn-pulse bg-[hsl(16,80%,52%)] hover:bg-[hsl(16,80%,45%)] text-white font-semibold px-6 rounded-full">
                Free Audit
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-white border-t border-border shadow-lg animate-fade-in">
          <nav className="flex flex-col px-6 py-4 gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-base font-medium py-2 transition-colors ${
                  location.pathname === link.href
                    ? 'text-[hsl(16,80%,52%)]'
                    : 'text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/audit" className="mt-2">
              <Button className="w-full btn-glow bg-[hsl(16,80%,52%)] hover:bg-[hsl(16,80%,45%)] text-white font-semibold rounded-full">
                Free Audit
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
