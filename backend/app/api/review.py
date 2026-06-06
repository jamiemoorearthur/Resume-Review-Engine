from fastapi import APIRouter, UploadFile, File, Form, HTTPException

from app.ingestion.loader import load_text_from_bytes
from app.rag.pipeline import run_review_pipeline
from app.review.scorer import validate_and_clean
from app.Models.cv_models import ReviewResponse
from app.core.exceptions import CVReviewerError

router = APIRouter()

# Presidio PII detection — non-fatal if package or spaCy model not available
_pii_analyzer = None
try:
    from presidio_analyzer import AnalyzerEngine
    from presidio_analyzer.nlp_engine import NlpEngineProvider
    _nlp_engine = NlpEngineProvider(nlp_configuration={
        "nlp_engine_name": "spacy",
        "models": [{"lang_code": "en", "model_name": "en_core_web_sm"}],
    }).create_engine()
    _pii_analyzer = AnalyzerEngine(nlp_engine=_nlp_engine, supported_languages=["en"])
    print("[pii-gate] Presidio analyzer initialized")
except BaseException as e:
    print(f"[pii-gate] Presidio not available: {e}")


def _detect_pii(text: str) -> None:
    if not _pii_analyzer:
        return
    try:
        results = _pii_analyzer.analyze(text=text, language="en")
        if results:
            entity_types = sorted({r.entity_type for r in results})
            print(f"[pii-gate] detected {len(results)} PII entities: {entity_types}")
    except Exception:
        pass


@router.post("/review", response_model=ReviewResponse)
async def review_cv(
    cv_file: UploadFile = File(...),
    job_description: str = Form(...),
):
    file_bytes = await cv_file.read()

    try:
        cv_text = load_text_from_bytes(file_bytes, cv_file.filename)
    except CVReviewerError as e:
        raise HTTPException(status_code=400, detail=str(e))

    # Detect PII for audit logging — we do not mask before the LLM
    # because the CV content is necessary for the review to work
    _detect_pii(cv_text)

    try:
        raw_review = run_review_pipeline(cv_text, job_description)
    except CVReviewerError as e:
        raise HTTPException(status_code=500, detail=str(e))

    cleaned = validate_and_clean(raw_review)

    return cleaned
