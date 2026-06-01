from fastapi import APIRouter, UploadFile, File, HTTPException

from app.ingestion.loader import load_text_from_bytes
from app.core.exceptions import CVReviewerError

router = APIRouter()


@router.post("/upload")
async def upload_cv(cv_file: UploadFile = File(...)):
    file_bytes = await cv_file.read()

    try:
        text = load_text_from_bytes(file_bytes, cv_file.filename)
    except CVReviewerError as e:
        raise HTTPException(status_code=400, detail=str(e))

    return {
        "filename": cv_file.filename,
        "text": text,
        "char_count": len(text),
    }
