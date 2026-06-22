import { useEffect, useState } from 'react'

let mammoth = null
import('mammoth').then(m => { mammoth = m.default || m })

function CVModal({ fileBase64, fileType, fileName, onClose }) {
  const [content, setContent] = useState(null) // rendered content to show inside the modal
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Stop the page behind the modal from scrolling while it's open
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    async function prepare() {
      try {
        // Convert the base64 string back into raw binary data
        const binary = atob(fileBase64)
        const bytes = new Uint8Array(binary.length)
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
        const blob = new Blob([bytes], { type: fileType })

        if (fileType === 'application/pdf') {
          // PDFs can be shown directly in an iframe — just create a temporary URL
          const url = URL.createObjectURL(blob)
          setContent({ type: 'pdf', url })
        } else {
          // .docx files need mammoth to convert them to HTML first
          if (!mammoth) {
            // mammoth might still be loading — wait a moment and try again
            await new Promise(r => setTimeout(r, 500))
          }
          const arrayBuffer = await blob.arrayBuffer()
          const result = await mammoth.convertToHtml({ arrayBuffer })
          setContent({ type: 'docx', html: result.value })
        }
      } catch (e) {
        setError("Couldn't load the CV preview.")
      } finally {
        setLoading(false)
      }
    }
    prepare()

    return () => {
      // Clean up the temporary PDF URL when the modal closes to free memory
      if (content?.type === 'pdf') URL.revokeObjectURL(content.url)
    }
  }, [fileBase64, fileType])

  // Close the modal if the user clicks the dark backdrop behind it
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className="cv-modal-backdrop" onClick={handleBackdropClick}>
      <div className="cv-modal">
        <div className="cv-modal-header">
          <span className="cv-modal-title">📄 {fileName}</span>
          <button className="cv-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="cv-modal-body">
          {loading && (
            <div className="cv-modal-loading">
              <div className="loading-spinner" />
              <p>Loading preview...</p>
            </div>
          )}
          {error && <div className="cv-modal-error">{error}</div>}
          {!loading && !error && content?.type === 'pdf' && (
            <iframe
              src={content.url}
              className="cv-modal-iframe"
              title="CV Preview"
            />
          )}
          {!loading && !error && content?.type === 'docx' && (
            <div
              className="cv-modal-docx"
              dangerouslySetInnerHTML={{ __html: content.html }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default CVModal 