from fastapi import APIRouter, HTTPException

from app.vectorstore.chroma import get_collection, delete_by_source

router = APIRouter(prefix="/knowledge-base", tags=["knowledge-base"])

COLLECTION_NAME = "knowledge_base"


@router.delete("/{source}")
def delete_document(source: str):
    """Remove all chunks for a knowledge base document by its source filename.

    Example: DELETE /knowledge-base/cv_review_rubric.md

    Uses the source metadata and doc_hash stored on every chunk at ingest time,
    so deletions are targeted — no other documents are affected.
    """
    collection = get_collection(COLLECTION_NAME)
    result = delete_by_source(collection, source)

    if not result["ids_deleted"]:
        raise HTTPException(
            status_code=404,
            detail=f"No chunks found for source '{source}'. "
                   "Check the filename matches exactly (e.g. 'cv_review_rubric.md').",
        )

    print(
        f"[knowledge-base] deleted source={source} "
        f"chunks={len(result['ids_deleted'])} "
        f"doc_hash={result['doc_hash']}"
    )

    return {
        "source": source,
        "chunks_deleted": len(result["ids_deleted"]),
        "doc_hash": result["doc_hash"],
    }
