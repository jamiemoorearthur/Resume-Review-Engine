# Weights must sum to 1.0 — they match cv_review_rubric.md exactly
RUBRIC_WEIGHTS = {
    "role_alignment": 0.20,
    "skills_match": 0.20,
    "experience_relevance": 0.15,
    "ats_keyword_match": 0.20,
    "bullet_point_quality": 0.10,
    "structure_readability": 0.10,
    "missing_evidence": 0.05,
}

VALID_ROLE_ALIGNMENT_LABELS = {"Strong", "Good", "Moderate", "Weak"}
