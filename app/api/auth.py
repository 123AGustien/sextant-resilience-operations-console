# app/api/auth.py

def verify_api_key(api_key: str) -> bool:
    """
    Simple API key verification layer (deterministic stub).
    """

    VALID_KEYS = {
        "free-tier-key",
        "pro-tier-key"
    }

    return api_key in VALID_KEYS
