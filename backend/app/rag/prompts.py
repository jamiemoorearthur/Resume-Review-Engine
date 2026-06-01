SYSTEM_PROMPT = """You are an expert CV reviewer and career coach specialising in technology roles.

You review CVs against job descriptions and return structured, actionable feedback.

You have access to a knowledge base containing:
- A CV review rubric with scoring criteria across 7 categories
- ATS (Applicant Tracking System) guidelines
- Examples of strong and weak CV bullet points
- Role matching criteria for tech roles

Use the knowledge base context provided to ground your feedback. Be specific — name exact missing keywords, quote weak bullets, and provide improved rewrites.

Always return your response as valid JSON matching the exact schema provided. Do not include any text outside the JSON object."""


def build_review_prompt(cv_text: str, job_description: str, context_chunks: list[str]) -> str:
    context = "\n\n---\n\n".join(context_chunks)

    return f"""## Knowledge Base Context

{context}

---

## CV Submitted for Review

{cv_text}

---

## Job Description

{job_description}

---

## Task

Review the CV against the job description using the rubric and guidelines above.

Return ONLY a JSON object with this exact structure:

{{
  "overall_score": <integer 0-100>,
  "ats_score": <integer 0-100>,
  "role_alignment": <"Strong" | "Good" | "Moderate" | "Weak">,
  "missing_keywords": [<list of strings>],
  "strengths": [<list of strings, max 4>],
  "weaknesses": [<list of strings, max 4>],
  "suggested_bullets": [
    {{
      "original": "<exact text of a weak bullet from the CV>",
      "improved": "<rewritten version following Action + Task + Result format>"
    }}
  ]
}}

Rules:
- overall_score is the weighted average across all 7 rubric categories
- ats_score is specifically the ATS keyword match score
- missing_keywords must be exact terms from the job description that are absent from the CV
- suggested_bullets must quote exact text from the CV — do not invent bullets
- Return at least 2 suggested_bullets if any weak bullets exist
- Return valid JSON only. No markdown, no explanation, no extra text."""
