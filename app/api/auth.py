def verify_api_key(api_key: str):
    return api_key in ["free-tier-key", "pro-tier-key"]
