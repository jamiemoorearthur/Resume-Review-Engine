from app.ingestion.parser import extract_text_from_pdf
from app.core.exceptions import InvalidFileTypeError, EmptyDocumentError


def load_text_from_bytes(file_bytes: bytes, filename: str) -> str:
    if not filename.lower().endswith((".pdf", ".txt")):
        raise InvalidFileTypeError(f"Unsupported file type: {filename}")

    if filename.lower().endswith(".pdf"):
        text = extract_text_from_pdf(file_bytes)
    else:
        text = file_bytes.decode("utf-8", errors="ignore")

    if not text.strip():
        raise EmptyDocumentError("No text could be extracted from the document.")

    return text
