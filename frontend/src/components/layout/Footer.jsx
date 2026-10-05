import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { NAV_LINKS, whatsappLink } from '@/data/site';
import { BrandIcon } from '@/components/site/BrandIcons';
import useSiteSettings from '@/hooks/useSiteSettings';

const TRUST = ['No contract, ever', 'Proof before payment', 'Month to month', 'Founder-led accounts'];

export default function Footer() {
  const { settings } = useSiteSettings();
  const socials = [
    { key: 'linkedin', label: 'LinkedIn', url: settings.linkedin },
    { key: 'youtube', label: 'YouTube', url: settings.youtube },
    { key: 'x', label: 'X (Twitter)', url: settings.twitter },
    { key: 'facebook', label: 'Facebook', url: settings.facebook },
    { key: 'instagram', label: 'Instagram', url: settings.instagram },
  ].filter((s) => s.url);
  const wa = whatsappLink(settings.whatsapp);

  return (
    <footer className="bg-navy-deep text-white/85">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <Link to="/" className="font-jakarta text-[1.7rem] font-extrabold text-white tracking-tight">
              Sell<span className="text-hive">Hive</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed max-w-xs">
              Amazon growth, measured in net profit. Full account and advertising management for private-label brands.
            </p>
            {socials.length > 0 && (
              <ul className="mt-5 flex gap-3" aria-label="Social media">
                {socials.map((s) => (
                  <li key={s.key}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-hive hover:[&_svg]:fill-navy transition-colors"
                    >
                      <BrandIcon name={s.key} size={16} color="#fff" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h2 className="text-white font-bold mb-4 text-base">Pages</h2>
            <ul className="space-y-2 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="hover:text-hive transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-white font-bold mb-4 text-base">Contact</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`mailto:${settings.email}`} className="hover:text-hive transition-colors break-all">{settings.email}</a>
              </li>
              {wa && (
                <li>
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="hover:text-hive transition-colors">
                    WhatsApp: {settings.whatsapp}
                  </a>
                </li>
              )}
              <li>
                {settings.linkedin ? (
                  <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-hive transition-colors">LinkedIn</a>
                ) : (
                  <span>LinkedIn</span>
                )}
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-white font-bold mb-4 text-base">Trust Signals</h2>
            <ul className="space-y-2 text-sm">
              {TRUST.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check size={16} className="text-white shrink-0" aria-hidden="true" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 justify-between text-xs text-white/60">
          <span>© {new Date().getFullYear()} SellHive. All rights reserved.</span>
          <span className="flex gap-5">
            <Link to="/privacy-policy" className="hover:text-hive">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-hive">Terms of Service</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
