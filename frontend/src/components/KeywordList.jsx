function KeywordList({ keywords }) {
  if (!keywords || keywords.length === 0) return null

  return (
    <div className="result-card">
      <div className="result-card-header">
        <div className="result-card-icon">🔑</div>
        <span className="result-card-title">Missing keywords</span>
      </div>
      <div className="result-card-body">
        <div className="keyword-tags">
          {keywords.map(kw => (
            <span className="kw-tag" key={kw}>{kw}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default KeywordList