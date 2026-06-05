function BulletRewrites({ bullets }) {
  if (!bullets || bullets.length === 0) return null

  return (
    <div className="result-card">
      <div className="result-card-header">
        <div className="result-card-icon">✏️</div>
        <span className="result-card-title">Suggested bullet rewrites</span>
      </div>
      <div className="result-card-body">
        {bullets.map((b, i) => (
          <div className="bullet-item" key={i}>
            <div className="bullet-before">{b.original}</div>
            <div className="bullet-arrow">
              <div className="bullet-arrow-line" />
              <div className="bullet-arrow-text">↓ improved</div>
              <div className="bullet-arrow-line" />
            </div>
            <div className="bullet-after">{b.improved}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BulletRewrites