import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ScoreCards from '../components/ScoreCards'
import ResultPanel from '../components/ResultPanel'
import KeywordList from '../components/KeywordList'
import BulletRewrites from '../components/BulletRewrites'
import SectionRecommendations from '../components/SectionRecommendations'
import CVModal from '../components/CVModal'
import { extractCvText, filterTrulyMissing } from '../utils/filterKeywords'
import { downloadEditedCV } from '../utils/downloadCV'
import '../styles/Results.css'

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.18 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] } },
}

const RESULT_KEY = 'cviq:last-result'
const FILE_KEY = 'cviq:last-cv-file'

function Results() {
  const location = useLocation()
  const navigate = useNavigate()
  const [showCVModal, setShowCVModal] = useState(false)
  const [downloadingFormat, setDownloadingFormat] = useState(null) // 'pdf' | 'docx' | null
  const [downloadError, setDownloadError] = useState(null)


  const [result, setResult] = useState(() => {
    const fromNav = location.state?.result
    if (fromNav) return fromNav
    try {
      const stored = sessionStorage.getItem(RESULT_KEY)
      return stored ? JSON.parse(stored) : null
    } catch { return null }
  })

  const [cvFile, setCvFile] = useState(() => {
    const fromNav = location.state?.cvFile
    if (fromNav) return fromNav
    try {
      const stored = sessionStorage.getItem(FILE_KEY)
      return stored ? JSON.parse(stored) : null
    } catch { return null }
  })

  // The backend sometimes flags keywords that are already in the CV —
  // we extract the CV text and filter those out so the keyword list is accurate
  const [filteredKeywords, setFilteredKeywords] = useState(result?.missing_keywords || [])

  useEffect(() => {
    async function verifyKeywords() {
      if (!cvFile || !result?.missing_keywords?.length) return
      try {
        const cvText = await extractCvText(cvFile.base64, cvFile.type)
        setFilteredKeywords(filterTrulyMissing(result.missing_keywords, cvText))
      } catch {
        setFilteredKeywords(result.missing_keywords)
      }
    }
    verifyKeywords()
  }, [cvFile, result])


  useEffect(() => {
    if (result) {
      try { sessionStorage.setItem(RESULT_KEY, JSON.stringify(result)) } catch {}
    }
  }, [result])

  useEffect(() => {
    if (cvFile) {
      try { sessionStorage.setItem(FILE_KEY, JSON.stringify(cvFile)) } catch {}
    }
  }, [cvFile])

 
  useEffect(() => {
    if (!result) navigate('/')
  }, [result, navigate])

  const handleDownload = async (format) => {
    if (!cvFile) return
    try {
      setDownloadingFormat(format)
      setDownloadError(null)
      await downloadEditedCV(cvFile, result, format)
    } catch (err) {
      setDownloadError(err.message || 'Download failed. Please try again.')
    } finally {
      setDownloadingFormat(null)
    }
  }

  if (!result) return null

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

      <div className="results-hero">
        <div>
          <div className="results-eyebrow">
            <span className="results-eyebrow-dot" /> Review complete
          </div>
          <h1>Your CV results</h1>
          <p className="results-hero-sub">Here's how your CV performed against the job description.</p>
        </div>

        {/* Action buttons — only show if we have the CV file */}
        {cvFile && (
          <div className="results-hero-actions">
            <button className="btn-view-cv" onClick={() => setShowCVModal(true)}>
              📄 View my CV
            </button>
            <button
              className="btn-download"
              onClick={() => handleDownload('docx')}
              disabled={!!downloadingFormat}
            >
              {downloadingFormat === 'docx' ? 'Downloading...' : '⬇ Download .docx'}
            </button>
            <button
              className="btn-download"
              onClick={() => handleDownload('pdf')}
              disabled={!!downloadingFormat}
            >
              {downloadingFormat === 'pdf' ? 'Downloading...' : '⬇ Download PDF'}
            </button>
          </div>
        )}

        {/* Show an error if the download fails */}
        {downloadError && (
          <div className="download-error">{downloadError}</div>
        )}
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
          <ResultPanel strengths={result.strengths} weaknesses={result.weaknesses} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <KeywordList keywords={filteredKeywords} />
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

      {showCVModal && cvFile && (
        <CVModal
          fileBase64={cvFile.base64}
          fileType={cvFile.type}
          fileName={cvFile.name}
          onClose={() => setShowCVModal(false)}
          missingKeywords={filteredKeywords}
          weakBullets={result.suggested_bullets || []}
        />
      )}
    </div>
  )
}

export default Results