import json
from openai import OpenAI
from app.core.config import settings
from app.core.exceptions import LLMError
from app.rag.prompts import SYSTEM_PROMPT, build_review_prompt

client = OpenAI(api_key=settings.openai_api_key)


def generate_review(cv_text: str, job_description: str, context_chunks: list[str]) -> dict:
    """Send CV + job description + context to GPT and return the parsed review dict."""
    user_prompt = build_review_prompt(cv_text, job_description, context_chunks)

    try:
        response = client.chat.completions.create(
            model=settings.openai_model,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt},
            ],
            temperature=0.2,       # low temperature = more consistent, less random output
            response_format={"type": "json_object"},  # forces GPT to return valid JSON
        )
    except Exception as e:
        raise LLMError(f"GPT call failed: {e}") from e

    raw = response.choices[0].message.content

    try:
        return json.loads(raw)
    except json.JSONDecodeError as e:
        raise LLMError(f"GPT returned invalid JSON: {e}\nRaw response: {raw}") from e
