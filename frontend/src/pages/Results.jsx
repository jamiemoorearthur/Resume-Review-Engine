import { useLocation, useNavigate } from 'react-router-dom'
import ScoreCards from '../components/ScoreCards'
import ResultPanel from '../components/ResultPanel'
import KeywordList from '../components/KeywordList'
import BulletRewrites from '../components/BulletRewrites'
import '../styles/Results.css'

function Results() {
  const location = useLocation()
  const navigate = useNavigate()
  const result = location.state?.result

  if (!result) {
    navigate('/')
    return null
  }

  const alignmentLabel = {
    Strong: 'Strong match', Good: 'Solid match',
    Moderate: 'Partial match', Weak: 'Weak match'
  }

  return (
    <div className="results-page">
      <nav className="navbar">
        <div className="nav-inner">
          <div className="logo">
            <div className="logo-mark">IQ</div>
            <span className="logo-text">CV<span className="logo-accent">IQ</span></span>
          </div>
          <button className="back-btn" onClick={() => navigate('/upload')}>← Review another CV</button>
        </div>
      </nav>

      {/* Hero band */}
      <div className="results-hero">
        <div>
          <div className="results-eyebrow">
            <span className="results-eyebrow-dot" /> Review complete
          </div>
          <h1>Your CV results</h1>
          <p className="results-hero-sub">Here's how your CV performed against the job description.</p>
        </div>
      
      </div>

      <div className="results-main">
        <ScoreCards
          overallScore={result.overall_score}
          atsScore={result.ats_score}
          roleAlignment={result.role_alignment}
        />
        <ResultPanel
          strengths={result.strengths}
          weaknesses={result.weaknesses}
        />
        <KeywordList keywords={result.missing_keywords} />
        <BulletRewrites bullets={result.suggested_bullets} />

        <div className="results-cta">
          <div>
            <h3>Want to improve your score?</h3>
            <p>Apply the feedback above and re-upload your updated CV to track your progress.</p>
          </div>
          <button className="btn-white" onClick={() => navigate('/upload')}>Review another CV →</button>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-inner">
          <div className="logo">
            <div className="logo-mark">IQ</div>
            <span className="logo-text">CV<span className="logo-accent">IQ</span></span>
          </div>
          <p className="footer-text">Built with FastAPI, React & GPT-4o · © 2026 CVIQ</p>
        </div>
      </footer>
    </div>
  )
}

export default Results