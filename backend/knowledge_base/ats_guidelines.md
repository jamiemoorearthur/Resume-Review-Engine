# ATS Guidelines for CV Optimisation

ATS (Applicant Tracking Systems) are software tools used by most large employers to automatically screen CVs before a human ever reads them. A CV that fails ATS is rejected without review. These guidelines explain how to pass ATS screening.

---

## How ATS Works

ATS software scans uploaded CVs for:
- Exact or near-exact keyword matches from the job description
- Job titles that match the role being applied for
- Required skills, tools, and technologies
- Education qualifications and certifications
- Years of experience

The system scores the CV and filters out any below a threshold (typically 60–70%). Only the top-scoring CVs are passed to a recruiter.

---

## Common Reasons CVs Fail ATS

### 1. Missing keywords
The most common cause of failure. If the job description says "Kubernetes" and the CV says "container orchestration", many ATS tools will not match them. Use exact terminology where possible.

### 2. Using images, tables, or text boxes
ATS cannot reliably read text inside tables, text boxes, or images. A two-column CV layout often causes ATS to read columns in the wrong order, scrambling the content. Use single-column, plain formatting.

### 3. Using headers/footers for important information
Contact details placed in the document header or footer may be ignored by ATS. Put all important information in the main body.

### 4. Non-standard section headings
ATS looks for standard headings like "Work Experience", "Education", "Skills". Using creative alternatives ("Where I've Been", "My Toolkit") can confuse the parser.

### 5. Saving in the wrong format
PDF is generally safe but some older ATS tools struggle with it. `.docx` is the most universally compatible format. Avoid `.pages`, `.odt`, or scanned PDFs.

### 6. Acronyms without full forms
If the job description says "CI/CD" include both the acronym and the full form ("Continuous Integration / Continuous Deployment") at least once, as different ATS tools match differently.

---

## ATS-Friendly Formatting Rules

- Use a single-column layout
- Use standard fonts (Arial, Calibri, Times New Roman, Georgia)
- Use standard section headings: Summary, Work Experience, Education, Skills, Certifications
- Avoid headers and footers for key information
- Keep file size under 2MB
- Save as `.pdf` or `.docx`
- Use bullet points, not tables or text boxes
- Spell out acronyms at least once

---

## Keyword Strategy

The best source of keywords is the job description itself. Identify:
- Required technical skills (programming languages, cloud platforms, tools)
- Soft skills explicitly mentioned ("stakeholder communication", "cross-functional collaboration")
- Certifications or qualifications listed as required or preferred
- Job title variations ("Software Engineer", "Software Developer", "SWE")

Mirror the exact language from the job description where possible. Do not keyword-stuff — keywords must appear in context within real sentences or bullets.

---

## ATS Score Thresholds (Guidance)

| Score | Interpretation |
|---|---|
| 85–100 | Excellent — very likely to pass ATS and be seen by a recruiter |
| 70–84 | Good — likely to pass but some keyword gaps to address |
| 55–69 | Moderate — at risk of being filtered out; targeted improvements needed |
| Below 55 | Poor — significant keyword and structure issues; likely to be rejected by ATS |

---

## Tech Role ATS Keywords by Category

### Cloud & Infrastructure
AWS, Azure, GCP, Kubernetes, Docker, Terraform, Ansible, CI/CD, Jenkins, GitHub Actions, Linux, Bash, Infrastructure as Code, SRE, DevOps

### Software Engineering
Python, Java, TypeScript, JavaScript, Node.js, React, FastAPI, REST API, microservices, SQL, PostgreSQL, MongoDB, Git, Agile, TDD, system design

### Data & AI
Python, pandas, NumPy, scikit-learn, TensorFlow, PyTorch, SQL, Spark, Airflow, ETL, data pipeline, machine learning, LLM, RAG, OpenAI, vector database

### Cybersecurity
penetration testing, SIEM, SOC, vulnerability assessment, OWASP, network security, IAM, zero trust, incident response, threat modelling, CompTIA Security+, CISSP

### Product & Consulting
stakeholder management, product roadmap, Agile, Scrum, OKRs, business requirements, user stories, Jira, Confluence, delivery, client-facing
