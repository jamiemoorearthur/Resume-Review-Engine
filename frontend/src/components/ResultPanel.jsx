function ResultPanel({ strengths, weaknesses }) {
  return (
    <div className="sw-grid">
      <div className="sw-card">
        <div className="sw-header">
          <span style={{fontSize:'16px'}}>💪</span>
          <span className="sw-title" style={{color:'#0f6e56'}}>Strengths</span>
        </div>
        {strengths.map((s, i) => (
          <div className="sw-item" key={i}>
            <span className="sw-tick" style={{color:'#1d9e75'}}>✓</span>
            <span>{s}</span>
          </div>
        ))}
      </div>
      <div className="sw-card">
        <div className="sw-header">
          <span style={{fontSize:'16px'}}>⚠️</span>
          <span className="sw-title" style={{color:'#b45309'}}>Weaknesses</span>
        </div>
        {weaknesses.map((w, i) => (
          <div className="sw-item" key={i}>
            <span className="sw-tick" style={{color:'#f59e0b'}}>✕</span>
            <span>{w}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ResultPanel