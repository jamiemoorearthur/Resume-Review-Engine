from openai import OpenAI
from app.core.config import settings
from app.core.exceptions import EmbeddingError

client = OpenAI(api_key=settings.openai_api_key)


def embed_texts(texts: list[str]) -> list[list[float]]:
    try:
        response = client.embeddings.create(
            model=settings.openai_embedding_model,
            input=texts,
        )
        return [item.embedding for item in response.data]
    except Exception as e:
        raise EmbeddingError(f"Failed to generate embeddings: {e}") from e


def embed_single(text: str) -> list[float]:
    return embed_texts([text])[0]
