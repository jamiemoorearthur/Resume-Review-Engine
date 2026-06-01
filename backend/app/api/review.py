from fastapi import APIRouter, UploadFile, File, Form, HTTPException

from app.ingestion.loader import load_text_from_bytes
from app.rag.pipeline import run_review_pipeline
from app.review.scorer import validate_and_clean
from app.Models.cv_models import ReviewResponse
from app.core.exceptions import CVReviewerError

router = APIRouter()


@router.post("/review", response_model=ReviewResponse)
async def review_cv(
    cv_file: UploadFile = File(...),
    job_description: str = Form(...),
):
    # Step 1: read the raw bytes from the uploaded file
    file_bytes = await cv_file.read()

    # Step 2: extract plain text from the file (PDF or TXT)
    try:
        cv_text = load_text_from_bytes(file_bytes, cv_file.filename)
    except CVReviewerError as e:
        # Turn our custom errors into a proper HTTP 400 response with a clear message
        raise HTTPException(status_code=400, detail=str(e))

    # Step 3: run the full RAG pipeline — retrieval + GPT generation
    try:
        raw_review = run_review_pipeline(cv_text, job_description)
    except CVReviewerError as e:
        raise HTTPException(status_code=500, detail=str(e))

    # Step 4: validate and clean GPT's output before returning it
    cleaned = validate_and_clean(raw_review)

    return cleaned
