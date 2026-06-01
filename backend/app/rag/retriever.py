from app.embeddings.embedder import embed_single
from app.vectorstore.chroma import get_collection, query_collection

KNOWLEDGE_BASE_COLLECTION = "knowledge_base"


def retrieve_context(query: str, n_results: int = 6) -> list[str]:
    """Embed the query and return the most relevant knowledge base chunks."""
    collection = get_collection(KNOWLEDGE_BASE_COLLECTION)
    query_embedding = embed_single(query)
    return query_collection(collection, query_embedding, n_results=n_results)
