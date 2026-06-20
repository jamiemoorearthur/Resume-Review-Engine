import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ScoreCards from '../components/ScoreCards'
import ResultPanel from '../components/ResultPanel'
import KeywordList from '../components/KeywordList'
import BulletRewrites from '../components/BulletRewrites'
import SectionRecommendations from '../components/SectionRecommendations'
import '../styles/Results.css'

// These control the "boxes fade and slide up one after another" animation
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.18 }, // wait 0.18s before showing the next box
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.98 }, // start invisible, slightly lower, slightly smaller
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] } },
}

// This is the "name" we use to save the results in the browser's storage
const STORAGE_KEY = 'cviq:last-result'

function Results() {
  const location = useLocation()
  const navigate = useNavigate()

  // When this page first loads, we need to figure out where the results come from.
  // There are two options:
  // 1. Normal way: the Upload page sent us here and passed the results along
  // 2. Refresh: the user reloaded the page, so option 1 is gone — instead we
  //    check sessionStorage, which is like a notepad the browser remembers
  //    until you close the tab
  const [result, setResult] = useState(() => {
    const fromNav = location.state?.result
    if (fromNav) return fromNav // got it the normal way, just use it

    // otherwise, try to find a saved copy in the browser's notepad
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null // if anything goes wrong, just say we don't have results
    }
  })

  // Every time we get new results, save a copy to the browser's notepad.
  // That way, if the page gets refreshed later, we can still find them.
  useEffect(() => {
    if (result) {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(result))
      } catch {
        // saving can fail sometimes (like in private/incognito mode) —
        // that's okay, it just means refresh won't work this one time
      }
    }
  }, [result])

  // IMPORTANT: if we have no results at all, send the user back to the
  // homepage. This has to happen inside useEffect (not just directly in the
  // component) because React gets upset if you try to "redirect" while it's
  // still in the middle of drawing the page — it can cause the whole page
  // to go blank instead of redirecting properly.
  useEffect(() => {
    if (!result) {
      navigate('/')
    }
  }, [result, navigate])

  // While we're waiting to redirect (or if there's just nothing to show),
  // don't render anything
  if (!result) {
    return null
  }

  return (
    <div className="results-page">
      <nav className="navbar">
        <div className="nav-inner">
          <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
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

      <motion.div
        className="results-main"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants}>
          <ScoreCards
            overallScore={result.overall_score}
            atsScore={result.ats_score}
            recruiterScore={result.recruiter_score}
            categoryScores={result.category_scores}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <ResultPanel
            strengths={result.strengths}
            weaknesses={result.weaknesses}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <KeywordList keywords={result.missing_keywords} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <BulletRewrites bullets={result.suggested_bullets} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <SectionRecommendations recommendations={result.section_recommendations} />
        </motion.div>

        <motion.div className="results-cta" variants={itemVariants}>
          <div>
            <h3>Want to improve your score?</h3>
            <p>Apply the feedback above and re-upload your updated CV to track your progress.</p>
          </div>
          <button className="btn-white" onClick={() => navigate('/upload')}>Review another CV →</button>
        </motion.div>
      </motion.div>

      <footer className="footer">
        <div className="footer-inner">
          <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
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