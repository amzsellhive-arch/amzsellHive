export default function Portfolio() {
  const items = [
    { title: 'ACoS / TACoS before → after', tag: 'Dashboard' },
    { title: 'Campaign structure diagram', tag: 'Structure' },
    { title: 'Wasted-spend teardown', tag: 'Audit' },
  ]

  return (
    <section className="section">
      <div className="container">
        <div className="section-head centered">
          <span className="kicker">Proof of craft</span>
          <h2>Our portfolio is the account math itself</h2>
          <p>We don't sell pretty creatives — we sell profitable campaigns. Here's what our work looks like in the dashboard.</p>
        </div>
        <div className="grid-3">
          {items.map((it, i) => (
            <div className="card portfolio-card" key={i}>
              <div className="portfolio-thumb">
                <span className="portfolio-tag">{it.tag}</span>
                <div className="mock-chart">
                  <div className="mock-bar" style={{ height: '55%' }}></div>
                  <div className="mock-bar" style={{ height: '20%' }}></div>
                  <div className="mock-bar" style={{ height: '42%' }}></div>
                  <div className="mock-bar" style={{ height: '14%' }}></div>
                </div>
              </div>
              <h3>{it.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
