# CV Reviewer RAG — project context

## What this project is

A CV Reviewer / Role-Matching AI Assistant. Users upload a CV and a job description. The system reviews the CV against the job description and returns structured feedback.

## Output format

```json
{
  "overall_score": 78,
  "ats_score": 72,
  "role_alignment": "Strong",
  "missing_keywords": ["Docker", "CI/CD", "Azure"],
  "strengths": ["Strong Python and backend experience"],
  "weaknesses": ["CV does not clearly evidence cloud deployment experience"],
  "suggested_bullets": [
    {
      "original": "Built AI chatbot using FastAPI",
      "improved": "Built and deployed a FastAPI-based AI chatbot with prompt-injection filtering, structured logging and Docker support."
    }
  ]
}
```

## Architecture

RAG + structured LLM workflow. No full agent in v1.

RAG retrieves from:
- uploaded CV
- uploaded/pasted job description
- CV review rubric
- ATS guidelines
- strong bullet point examples
- role matching criteria

**Vector store:** ChromaDB (local, no Pinecone in v1)  
**LLM:** OpenAI (GPT-4o or GPT-4o-mini)  
**Backend:** FastAPI  
**Frontend:** React + TypeScript  

No dataset needed for v1. A dataset would only be needed later for evaluation or fine-tuning.

---

## Repo structure

```
cv-reviewer-rag/
│
├── app/
│   ├── main.py
│   ├── api/
│   │   ├── review.py
│   │   ├── upload.py
│   │   └── health.py
│   ├── core/
│   │   ├── config.py
│   │   ├── logging.py
│   │   └── exceptions.py
│   ├── ingestion/
│   │   ├── loader.py
│   │   ├── parser.py
│   │   └── chunker.py
│   ├── embeddings/
│   │   └── embedder.py
│   ├── vectorstore/
│   │   └── chroma.py
│   ├── rag/
│   │   ├── pipeline.py
│   │   ├── retriever.py
│   │   ├── generator.py
│   │   └── prompts.py
│   ├── review/
│   │   ├── rubric.py
│   │   ├── scorer.py
│   │   └── suggestions.py
│   └── utils/
│       └── helpers.py
│
├── knowledge_base/
│   ├── cv_review_rubric.md
│   ├── ats_guidelines.md
│   ├── strong_bullet_examples.md
│   └── role_matching_criteria.md
│
├── data/
│   ├── uploads/
│   └── processed/
│
├── tests/
│   ├── test_api.py
│   ├── test_ingestion.py
│   ├── test_rag.py
│   └── test_review.py
│
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── FileUpload.tsx
│       │   ├── JobDescriptionBox.tsx
│       │   ├── ReviewButton.tsx
│       │   ├── ScoreCard.tsx
│       │   ├── KeywordList.tsx
│       │   ├── SuggestedBullets.tsx
│       │   ├── StrengthsWeaknesses.tsx
│       │   └── LoadingState.tsx
│       ├── pages/
│       │   ├── Home.tsx
│       │   └── ReviewResults.tsx
│       ├── services/
│       │   └── api.ts
│       ├── types/
│       │   └── review.ts
│       ├── utils/
│       │   └── formatters.ts
│       ├── App.tsx
│       └── main.tsx
│
├── docker/
│   ├── Dockerfile
│   └── docker-compose.yml
├── .github/workflows/ci.yml
├── .env.example
├── .gitignore
├── requirements.txt
├── README.md
└── Makefile
```

---

## Build order

Build in this order. Do not jump ahead.

1. FastAPI health endpoint
2. File loading and text extraction
3. Chunking
4. Knowledge base files
5. Embeddings
6. ChromaDB vector store
7. Retriever
8. Prompt templates
9. LLM generator
10. Full RAG pipeline
11. Review API endpoint
12. Scoring and suggestions
13. Tests
14. Docker
15. README and screenshots

Terraform/Azure comes after Docker, once the app is containerised and ready to deploy.

---

## Git branch strategy

```
main → dev → feature branches
```

Feature branches merge into dev. Dev merges into main.

Active branches:
- `main`
- `dev`
- `feature/api-review`
- `feature/rag-review-logic`
- `feature/frontend-results-ui`
- `feature/document-ingestion`
- `feature/embeddings-chroma`
- `feature/frontend-upload`

Always create feature branches from `dev`, not `main`.

---

## Team split

### My responsibilities (AI/application layer)

Backend: `main.py`, `api/review.py`, `api/health.py`, `rag/pipeline.py`, `rag/generator.py`, `rag/prompts.py`, `review/rubric.py`, `review/scorer.py`, `review/suggestions.py`, `tests/test_api.py`, `tests/test_review.py`, `README.md`

Frontend: UI design, `Home.tsx`, `ReviewResults.tsx`, `ScoreCard.tsx`, `KeywordList.tsx`, `SuggestedBullets.tsx`, `StrengthsWeaknesses.tsx`, `ReviewButton.tsx`, `JobDescriptionBox.tsx`, `App.tsx`, `main.tsx`

### Jamie's responsibilities (data engineering/pipeline layer)

Backend: `ingestion/loader.py`, `ingestion/parser.py`, `ingestion/chunker.py`, `embeddings/embedder.py`, `vectorstore/chroma.py`, `data/uploads/`, `data/processed/`, `tests/test_ingestion.py`

Frontend: `FileUpload.tsx`, file validation, job description upload/paste, API request wiring, loading/error states

### Shared

`api/upload.py`, `core/config.py`, `rag/retriever.py`, `rag/pipeline.py` integration, `knowledge_base/ats_guidelines.md`, `requirements.txt`, `.env.example`, `docker/`, `tests/test_rag.py`, `frontend/services/api.ts`, `frontend/types/review.ts`, end-to-end testing

The most important shared task is agreeing the API contract before building in parallel.

---

## What the rubric is

The rubric is the scoring guide the LLM uses to judge the CV. It lives in `knowledge_base/cv_review_rubric.md`.

Categories:
- role alignment
- skills match
- experience relevance
- ATS keyword match
- bullet point quality
- structure and readability
- missing evidence

---

## Environment setup

- API key goes in `.env` as `OPENAI_API_KEY=sk-...`
- `.env` must be in `.gitignore`
- Use `.env.example` to share variable names without values
