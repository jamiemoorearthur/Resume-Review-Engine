class CVReviewerError(Exception):
    """Base error for all app errors."""


class InvalidFileTypeError(CVReviewerError):
    """Raised when the uploaded file is not a PDF."""


class EmptyDocumentError(CVReviewerError):
    """Raised when no text could be extracted from the document."""


class EmbeddingError(CVReviewerError):
    """Raised when the OpenAI embedding call fails."""


class LLMError(CVReviewerError):
    """Raised when the GPT completion call fails."""
