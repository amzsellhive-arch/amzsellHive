import ResultCard from '../ui/ResultCard'

export default function ResultsGrid() {
  const cards = [
    {
      niche: 'Personal care',
      timeframe: '30 days',
      headline_result: 'Efficiency at a healthy margin',
      description: 'Rebalanced budget toward the SKUs carrying revenue instead of the ones consuming it.',
      metric_1: { value: '49%', label: 'net proceeds' },
      metric_2: { value: '7.6%', label: 'TACOS held' },
      metric_3: { value: '$4,267', label: 'net in best period' },
    },
    {
      niche: 'Verified · Brand 2',
      timeframe: 'Month 1',
      headline_result: 'Growth plus waste recovery',
      description: 'Found one SKU running 67.6% ACOS for $93 of net profit and stopped the bleed.',
      metric_1: { value: '$2,870', label: 'recovered / mo' },
      metric_2: { value: '27.2%', label: 'net margin' },
      metric_3: { value: '+15.9%', label: 'sales MoM' },
    },
    {
      niche: 'Brand 3',
      timeframe: 'Weeks 1–2',
      headline_result: 'Bleed caught before it cost them',
      description: 'A bleeding product diagnosed and kept net positive before it turned into a loss.',
      metric_1: { value: '110%', label: 'ACOS stopped' },
      metric_2: { value: '+$842', label: 'net added' },
      metric_3: { value: 'Live', label: 'fix in place' },
    },
  ]

  return (
    <section className="section">
      <div className="container">
        <div className="section-head centered">
          <span className="kicker">Proven results</span>
          <h2>Real accounts. Real numbers.</h2>
          <p>Every figure is backable on request. Client brands are anonymized to protect their position.</p>
        </div>
        <div className="grid-3">
          {cards.map((c, i) => (
            <ResultCard key={i} {...c} />
          ))}
        </div>
      </div>
    </section>
  )
}
