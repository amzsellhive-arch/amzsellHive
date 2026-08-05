import { Shield, Award, Globe, TrendingUp } from 'lucide-react';

export default function TrustBar() {
  const trustItems = [
    { icon: TrendingUp, text: 'Managing $10M+ in ad spend' },
    { icon: Globe, text: 'Amazon, Walmart, eBay & TikTok Shop' },
    { icon: Award, text: 'MAG PPC & SEO Certified' },
    { icon: Shield, text: 'No Contract, Ever' },
  ];

  return (
    <section className="border-y border-border bg-white py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          {trustItems.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[hsl(16,80%,52%)]/10 flex items-center justify-center">
                <item.icon size={18} className="text-[hsl(16,80%,52%)]" />
              </div>
              <span className="text-sm font-semibold text-muted-foreground">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}