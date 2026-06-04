const Scenarios = {

    // -------------------------
    // 1. BANK CASCADE
    // -------------------------
    bank_cascade: {
        name: "Bank Cascade",
        origin: "Bank_A",
        shock: 0.8,

        edges: {
            "Bank_A": ["Bank_B"],
            "Bank_B": ["Liquidity_Hub"],
            "Liquidity_Hub": ["Bank_A"]
        }
    },

    // -------------------------
    // 2. LIQUIDITY STRESS
    // -------------------------
    liquidity_stress: {
        name: "Liquidity Stress",
        origin: "Liquidity_Hub",
        shock: 0.7,

        edges: {
            "Liquidity_Hub": ["Bank_A", "Bank_B"],
            "Bank_A": ["Bank_B"]
        }
    },

    // -------------------------
    // 3. ISOLATED BANK FAILURE
    // -------------------------
    bank_failure: {
        name: "Isolated Bank Failure",
        origin: "Bank_B",
        shock: 0.9,

        edges: {
            "Bank_B": ["Liquidity_Hub"]
        }
    },

    // -------------------------
    // 4. SYSTEMIC SHOCK (GLOBAL MODE)
    // -------------------------
    systemic_shock: {
        name: "Systemic Shock",
        origin: "Bank_A",
        shock: 0.95,

        edges: {
            "Bank_A": ["Bank_B", "Liquidity_Hub"],
            "Bank_B": ["Liquidity_Hub"],
            "Liquidity_Hub": ["Bank_A", "Bank_B"]
        }
    }
};
