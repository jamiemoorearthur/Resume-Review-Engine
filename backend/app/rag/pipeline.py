from app.rag.retriever import retrieve_context
from app.rag.generator import generate_review


def run_review_pipeline(cv_text: str, job_description: str) -> dict:
    """
    Full RAG pipeline:
    1. Retrieve relevant knowledge base chunks using the CV + job description as the query
    2. Send CV, job description, and retrieved context to GPT
    3. Return the structured review dict
    """
    query = f"{cv_text[:1000]}\n\n{job_description[:500]}"
    context_chunks = retrieve_context(query, n_results=6)
    return generate_review(cv_text, job_description, context_chunks)
