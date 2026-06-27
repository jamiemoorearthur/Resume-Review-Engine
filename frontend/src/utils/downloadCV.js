const BASE_URL = 'https://cv-reviewer-api.fly.dev'

// Calls the /download endpoint and triggers a file download in the browser.
// Takes the original CV file (as base64), the review result, and the format
// ('pdf' or 'docx') and streams the edited CV back as a downloadable file.
export async function downloadEditedCV(cvFile, result, format) {
  // Convert base64 back to a real File object so we can send it as FormData
  const binary = atob(cvFile.base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  const blob = new Blob([bytes], { type: cvFile.type })
  const file = new File([blob], cvFile.name, { type: cvFile.type })

  const formData = new FormData()
  formData.append('cv_file', file)
  formData.append('suggested_bullets', JSON.stringify(result.suggested_bullets || []))
  formData.append('missing_keywords', JSON.stringify(result.missing_keywords || []))
  formData.append('section_recommendations', JSON.stringify(result.section_recommendations || []))

  const response = await fetch(`${BASE_URL}/download?format=${format}`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.detail || 'Download failed. Please try again.')
  }

  // Get the file content as a blob and trigger a browser download
  const fileBlob = await response.blob()
  const url = URL.createObjectURL(fileBlob)
  const a = document.createElement('a')
  a.href = url
  a.download = `edited_cv.${format}`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)

  // Clean up the temporary URL to free memory
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}