import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTABand from '@/components/sections/CTABand';
import ResultsGrid from '@/components/sections/ResultsGrid';

export default function ResultsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Page Hero */}
        <section className="pt-28 pb-16 bg-gradient-to-br from-[hsl(30,20%,98%)] via-white to-[hsl(16,90%,97%)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
<h1 className="text-4xl sm:text-5xl font-extrabold mt-3 mb-5 tracking-tight">
              Real accounts. Real numbers.
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Client brands are anonymized to protect their competitive position. Every figure below is backable on request.
            </p>
          </div>
        </section>

        <ResultsGrid />

        {/* Rondaful Background */}
        <section className="py-16 bg-white border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[hsl(16,80%,52%)] font-bold text-sm uppercase tracking-wider">Background · Rondaful</span>
            <h2 className="text-3xl font-extrabold mt-2 mb-4">Where the method was built</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-3xl">
              Before founding SellHive, Ishfaq spent two and a half years at Rondaful — a global e-commerce operator — as Supervisor of Group F. He led 40+ specialists across international marketplaces.
            </p>

            <div className="grid lg:grid-cols-2 gap-10">
              <div>
                <h3 className="font-bold mb-4">What made it hard</h3>
                <ul className="space-y-2">
                  {[
                    'Team split mid-quarter with new, less experienced members',
                    'Roughly 1,000 SPUs deleted through refund and infringement issues',
                    'Auto price adjustment losing the Buy Box across many listings',
                    'Senior members resigning, forcing rapid retraining',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-[hsl(16,80%,52%)] mt-1">•</span>{item}
                    </li>
                  ))}
                </ul>

                <h3 className="font-bold mt-8 mb-4">How it was run</h3>
                <ul className="space-y-2">
                  {[
                    'Advertising held to strict efficiency — TACOS near 5%',
                    '80/20 focus, concentrating budget on revenue-carrying products',
                    'Control-tower rhythm: daily/weekly checklists, monthly evaluation',
                    'Continuous in-house training — new hires into team leads',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-[hsl(16,80%,52%)] mt-1">•</span>{item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="bg-[hsl(30,20%,97%)] rounded-2xl border border-border p-6">
                  <h3 className="font-bold mb-4">Q4 2024 Performance</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 font-semibold">Month</th>
                          <th className="text-right py-2 font-semibold">Sales</th>
                          <th className="text-right py-2 font-semibold">Profit</th>
                          <th className="text-right py-2 font-semibold">Margin</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { month: 'September', sales: '$156,302', profit: '$21,729', margin: '15.4%' },
                          { month: 'October', sales: '$175,922', profit: '$22,902', margin: '14.5%' },
                          { month: 'November', sales: '$186,598', profit: '$29,562', margin: '19.8%' },
                          { month: 'December', sales: '$133,611', profit: '$23,088', margin: '21.1%' },
                        ].map((row, i) => (
                          <tr key={i} className="border-b border-border/50">
                            <td className="py-2">{row.month}</td>
                            <td className="py-2 text-right font-medium">{row.sales}</td>
                            <td className="py-2 text-right font-medium text-green-600">{row.profit}</td>
                            <td className="py-2 text-right font-medium text-[hsl(16,80%,52%)]">{row.margin}</td>
                          </tr>
                        ))}
                        <tr className="font-bold">
                          <td className="py-2">Q4 Total</td>
                          <td className="py-2 text-right">$652,428</td>
                          <td className="py-2 text-right text-green-600">$97,276</td>
                          <td className="py-2 text-right text-[hsl(16,80%,52%)]">~17.7%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-6 bg-[hsl(16,90%,97%)] rounded-2xl border border-[hsl(16,80%,52%)]/20 p-6">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">The turnaround:</strong> one store began with its first review negative and effectively no sales, then lost the listing entirely. It was recovered, rebuilt to 92 reviews at 4.2 stars, and grew from 2 units/month to 5,141 units — roughly $100,334 monthly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-[hsl(30,10%,10%)] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-[hsl(16,80%,52%)] font-bold text-sm uppercase tracking-wider">In Numbers</span>
            <h2 className="text-3xl font-extrabold mt-2 mb-10">What that experience adds up to</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: '5+', label: 'Years in Amazon' },
                { value: '4+', label: 'Years specialized in PPC' },
                { value: '$10M+', label: 'In team sales managed' },
                { value: '40+', label: 'Specialists led & trained' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[hsl(16,80%,52%)]">{stat.value}</div>
                  <div className="text-sm text-white/60 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTABand />
      </main>
      <Footer />
    </div>
  );
}