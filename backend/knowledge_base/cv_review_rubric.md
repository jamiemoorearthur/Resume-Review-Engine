# CV Review Rubric

Use this rubric to score and provide feedback on a CV. Each category is scored 0–20. The overall score is the weighted sum described at the end.

---

## 1. Role Alignment (0–20)

How well does the CV target the specific job description provided?

- **18–20:** CV is clearly tailored to the role. Job title, summary, and experience directly mirror the role's requirements. Keywords and responsibilities match closely.
- **13–17:** CV is relevant but generic. Candidate has the right background but has not tailored language to the specific role.
- **7–12:** CV is partially relevant. Some experience applies but key requirements are missing or buried.
- **0–6:** CV does not appear targeted at the role. Significant mismatch between CV content and job description.

Feedback should name specific requirements from the job description that are absent or weakly evidenced in the CV.

---

## 2. Skills Match (0–20)

Does the CV demonstrate the technical and soft skills required by the job description?

- **18–20:** All or nearly all required skills are present and clearly evidenced through experience, not just listed.
- **13–17:** Most required skills are present. A few gaps exist.
- **7–12:** Core skills are present but several important ones are missing or only listed without evidence.
- **0–6:** Significant skills gap. Many required skills are absent.

Distinguish between skills that are listed (e.g. in a skills section) versus evidenced (demonstrated through a project or work bullet). Evidenced skills score higher.

---

## 3. Experience Relevance (0–20)

Is the candidate's work experience relevant to the role being applied for?

- **18–20:** Work history directly maps to the responsibilities of the target role. Seniority is appropriate.
- **13–17:** Work history is relevant but may be in a slightly different domain or at a different seniority level.
- **7–12:** Some relevant experience but notable gaps (e.g. strong academia, weak industry; or relevant projects but no professional experience).
- **0–6:** Experience is largely unrelated to the role.

Consider recency — experience from 5+ years ago is less relevant than recent experience.

---

## 4. ATS Keyword Match (0–20)

Does the CV contain the keywords that ATS (Applicant Tracking Systems) would scan for, based on the job description?

- **18–20:** High density of exact and near-exact keyword matches from the job description. Keywords appear in context (not just listed).
- **13–17:** Most important keywords are present. Some missing.
- **7–12:** Key technical terms are missing or appear infrequently.
- **0–6:** Poor keyword coverage. CV would likely be filtered out by ATS before a human reads it.

Flag missing keywords explicitly in the `missing_keywords` field of the output.

---

## 5. Bullet Point Quality (0–20)

Are the CV's experience bullets achievement-focused, specific, and quantified?

- **18–20:** Bullets follow the format: Action Verb + Task + Result/Impact. At least 60% include a measurable outcome (%, £, time saved, users served, etc.).
- **13–17:** Most bullets are action-focused but few have quantified results.
- **7–12:** Bullets are descriptive ("responsible for X") rather than achievement-focused ("delivered X, resulting in Y").
- **0–6:** Bullets are vague, passive, or simply list job duties with no evidence of impact.

Provide specific rewrites for weak bullets in the `suggested_bullets` field.

---

## 6. Structure and Readability (0–20)

Is the CV well-structured, appropriately concise, and easy to read?

- **18–20:** Clear sections (Summary, Experience, Skills, Education). 1–2 pages. Consistent formatting. No spelling or grammar errors.
- **13–17:** Good structure but some issues — slightly too long, minor inconsistencies, or a weak/missing summary.
- **7–12:** Structural issues — missing sections, inconsistent formatting, or poor use of white space.
- **0–6:** Hard to read. Missing key sections, excessive length, or significant formatting problems.

---

## 7. Missing Evidence (0–20)

Are there claims in the CV that are not supported by evidence?

- **18–20:** All significant claims are backed by concrete examples. No vague assertions.
- **13–17:** Most claims have evidence. A few assertions are unsupported.
- **7–12:** Several unsupported claims — e.g. "strong communicator" with no example, "led a team" with no detail.
- **0–6:** CV is full of unsubstantiated claims. Little to no concrete evidence.

---

## Overall Score Calculation

| Category | Weight |
|---|---|
| Role Alignment | 20% |
| Skills Match | 20% |
| Experience Relevance | 15% |
| ATS Keyword Match | 20% |
| Bullet Point Quality | 10% |
| Structure and Readability | 10% |
| Missing Evidence | 5% |

`overall_score = sum(category_score * weight for each category)`

The ATS score is derived specifically from category 4 (ATS Keyword Match), scaled 0–100.
