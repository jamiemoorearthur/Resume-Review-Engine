import { useState } from 'react'

function BulletRewrites({ bullets }) {
  const [copiedAll, setCopiedAll] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState(null)

  if (!bullets || bullets.length === 0) return null

  const handleCopyAll = async () => {
    const text = bullets.map(b => b.improved).join('\n\n')
    try {
      await navigator.clipboard.writeText(text)
      setCopiedAll(true)
      setTimeout(() => setCopiedAll(false), 1800)
    } catch {
      // Clipboard API can fail — fail silently
    }
  }

  const handleCopyOne = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(prev => (prev === index ? null : prev)), 1500)
    } catch {
      // fail silently
    }
  }

  return (
    <div className="result-card">
      <div className="result-card-header">
        <div className="result-card-icon">✏️</div>
        <span className="result-card-title">Suggested bullet rewrites</span>
        <button className="copy-all-btn" onClick={handleCopyAll} type="button">
          {copiedAll ? '✓ Copied all' : 'Copy all rewrites'}
        </button>
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
            <button
              className="bullet-after bullet-after-button"
              onClick={() => handleCopyOne(b.improved, i)}
              type="button"
            >
              <span>{b.improved}</span>
              <span className="bullet-copy-hint">{copiedIndex === i ? '✓ Copied' : 'Click to copy'}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BulletRewrites