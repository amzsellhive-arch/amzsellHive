// Repeatable result card component (Section 4 of the homepage brief)
export default function ResultCard({ niche, timeframe, headline_result, description, metric_1, metric_2, metric_3, image }) {
  return (
    <div className="result-card">
      {image && <div className="rc-img" style={{ backgroundImage: `url(${image})` }}></div>}
      <div className="rc-body">
        <span className="rc-tag">{niche} · {timeframe}</span>
        <h3>{headline_result}</h3>
        <p className="rc-desc">{description}</p>
        <div className="result-metrics">
          {metric_1 && <div className="result-metric"><strong>{metric_1.value}</strong><span>{metric_1.label}</span></div>}
          {metric_2 && <div className="result-metric"><strong>{metric_2.value}</strong><span>{metric_2.label}</span></div>}
          {metric_3 && <div className="result-metric"><strong>{metric_3.value}</strong><span>{metric_3.label}</span></div>}
        </div>
      </div>
    </div>
  )
}
