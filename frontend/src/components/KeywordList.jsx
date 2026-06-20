import { useState } from 'react'

function KeywordList({ keywords }) {
  const [copiedIndex, setCopiedIndex] = useState(null)

  if (!keywords || keywords.length === 0) return null

  const handleCopy = async (kw, index) => {
    try {
      await navigator.clipboard.writeText(kw)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(prev => (prev === index ? null : prev)), 1500)
    } catch {
      // Clipboard API can fail (permissions, insecure context) — fail silently,
      // the tag just won't show the "copied" state
    }
  }

  return (
    <div className="result-card">
      <div className="result-card-header">
        <div className="result-card-icon">🔑</div>
        <span className="result-card-title">Missing keywords</span>
        <span className="result-card-hint">Click a keyword to copy it</span>
      </div>
      <div className="result-card-body">
        <div className="keyword-tags">
          {keywords.map((kw, i) => (
            <button
              className={`kw-tag kw-tag-button ${copiedIndex === i ? 'copied' : ''}`}
              key={kw}
              onClick={() => handleCopy(kw, i)}
              type="button"
            >
              {copiedIndex === i ? `✓ Copied` : kw}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default KeywordList