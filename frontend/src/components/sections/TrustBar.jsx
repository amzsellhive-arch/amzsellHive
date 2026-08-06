import { Shield, Award, Globe, TrendingUp } from 'lucide-react';

const trustItems = [
  { icon: TrendingUp, text: 'Managing $10M+ in ad spend' },
  { icon: Globe, text: 'Amazon, Walmart, eBay & TikTok Shop' },
  { icon: Award, text: 'MAG PPC & SEO Certified' },
  { icon: Shield, text: 'No Contract, Ever' },
];

function TrustItem({ item }) {
  const Icon = item.icon;
  return (
    <div className="flex items-center gap-3 shrink-0">
      <div className="w-10 h-10 rounded-full bg-[hsl(16,80%,52%)]/10 flex items-center justify-center">
        <Icon size={18} className="text-[hsl(16,80%,52%)]" />
      </div>
      <span className="text-sm font-semibold text-muted-foreground whitespace-nowrap">{item.text}</span>
    </div>
  );
}

export default function TrustBar() {
  // Duplicate the list for a seamless infinite loop
  const loopItems = [...trustItems, ...trustItems];

  return (
    <section className="border-y border-border bg-white py-5 overflow-hidden">
      <div className="relative">
        {/* Edge fade masks for a polished look */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="marquee-track">
          <div className="marquee-content">
            {loopItems.map((item, i) => (
              <TrustItem key={i} item={item} />
            ))}
          </div>
          <div className="marquee-content" aria-hidden="true">
            {loopItems.map((item, i) => (
              <TrustItem key={`dup-${i}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
