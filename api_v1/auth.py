from fastapi import Header, HTTPException

# 🧠 Tiered access model (foundation for monetisation)
VALID_KEYS = {
    "free-tier-key": "free",
    "pro-tier-key": "pro",
    "enterprise-tier-key": "enterprise"
}


def verify_api_key(x_api_key: str = Header(None)) -> str:
    """
    Validates API key and returns subscription tier.
    Used for usage control + billing segmentation.
    """

    if not x_api_key:
        raise HTTPException(
            status_code=401,
            detail="Missing API key"
        )

    tier = VALID_KEYS.get(x_api_key)

    if not tier:
        raise HTTPException(
            status_code=401,
            detail="Invalid API key"
        )

    return tier
