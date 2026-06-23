import json
from io import BytesIO
from typing import Literal

from fastapi import APIRouter, File, Form, HTTPException, Query, UploadFile
from fastapi.responses import StreamingResponse

from app.core.exceptions import CVReviewerError
from app.ingestion.loader import load_text_from_bytes
from app.review.cv_builder import build_edited_cv_docx, build_edited_cv_pdf

router = APIRouter()


@router.post("/download")
async def download_edited_cv(
    cv_file: UploadFile = File(...),
    suggested_bullets: str = Form("[]"),
    missing_keywords: str = Form("[]"),
    section_recommendations: str = Form("[]"),
    format: Literal["docx", "pdf"] = Query("docx"),
):
    file_bytes = await cv_file.read()

    try:
        cv_text = load_text_from_bytes(file_bytes, cv_file.filename)
    except CVReviewerError as e:
        raise HTTPException(status_code=400, detail=str(e))

    try:
        bullets = json.loads(suggested_bullets)
        keywords = json.loads(missing_keywords)
        recommendations = json.loads(section_recommendations)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON in request fields.")

    if format == "pdf":
        content = build_edited_cv_pdf(cv_text, bullets, keywords, recommendations)
        media_type = "application/pdf"
        filename = "edited_cv.pdf"
    else:
        content = build_edited_cv_docx(cv_text, bullets, keywords, recommendations)
        media_type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        filename = "edited_cv.docx"

    return StreamingResponse(
        BytesIO(content),
        media_type=media_type,
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )
