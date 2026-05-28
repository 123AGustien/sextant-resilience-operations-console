from fastapi import Header, HTTPException

VALID_KEYS = {
    "free-tier-key": "free",
    "pro-tier-key": "pro"
}


def verify_api_key(x_api_key: str = Header(None)):
    if x_api_key not in VALID_KEYS:
        raise HTTPException(status_code=401, detail="Invalid API key")

    return VALID_KEYS[x_api_key]
