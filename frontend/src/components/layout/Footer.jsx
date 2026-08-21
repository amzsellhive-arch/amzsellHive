import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[hsl(30,10%,10%)] text-[hsl(30,10%,75%)] pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Final CTA above footer */}
        <div className="text-center mb-12 pb-12 border-b border-white/10">
          <h3 className="text-2xl font-bold text-white mb-3">
            Ready to stop the leak?
          </h3>
          <p className="text-[hsl(30,10%,65%)] mb-6 max-w-lg mx-auto">
            Every month you wait, the wasted spend keeps running. Let us show you exactly what your account is losing.
          </p>
          <Link
            to="/audit"
            className="inline-flex items-center justify-center px-8 py-3 bg-[hsl(16,80%,52%)] hover:bg-[hsl(16,80%,45%)] text-white font-semibold rounded-full transition-all btn-glow"
          >
            Show me what my account is leaking
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-extrabold text-white">
              Sell<span className="text-[hsl(16,80%,52%)]">Hive</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed max-w-[280px]">
              Amazon growth, measured in net profit. Full account and advertising management for private-label brands.
            </p>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-white font-semibold mb-4">Pages</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/services" className="text-sm hover:text-[hsl(16,80%,52%)] transition-colors">Services</Link>
              <Link to="/results" className="text-sm hover:text-[hsl(16,80%,52%)] transition-colors">Results</Link>
              <Link to="/about" className="text-sm hover:text-[hsl(16,80%,52%)] transition-colors">About</Link>
              <Link to="/contact" className="text-sm hover:text-[hsl(16,80%,52%)] transition-colors">Contact</Link>
            </nav>
          </div>

          {/* Start Here */}
          <div>
            <h4 className="text-white font-semibold mb-4">Start Here</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/audit" className="text-sm hover:text-[hsl(16,80%,52%)] transition-colors">Free Account Audit</Link>
              <a href="mailto:ishfaq@sellhive.co" className="text-sm hover:text-[hsl(16,80%,52%)] transition-colors">ishfaq@sellhive.com</a>
              <a href="https://linkedin.com/in/ishfaq-ahmad" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-[hsl(16,80%,52%)] transition-colors">LinkedIn</a>
            </nav>
          </div>

          {/* Trust */}
          <div>
            <h4 className="text-white font-semibold mb-4">Trust Signals</h4>
            <div className="flex flex-col gap-2 text-sm">
              <span>✓ No contract, ever</span>
              <span>✓ Proof before payment</span>
              <span>✓ Month to month</span>
              <span>✓ Founder-led accounts</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[hsl(30,10%,50%)]">
          <span>© 2026 SellHive. All rights reserved.</span>
          <span>Founded by Ishfaq Ahmad</span>
        </div>
      </div>
    </footer>
  );
}
