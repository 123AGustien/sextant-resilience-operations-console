window.runScenario = function (scenario) {

    if (!window.orchestra) {
        console.error("Orchestra not loaded");
        return null;
    }

    // 1. RUN SCENARIO
    const frame = window.orchestra.run(scenario);

    if (!frame) {
        console.error("Scenario failed:", scenario);
        return null;
    }

    // 2. STORE GLOBAL STATE
    window.__SEXTANT_FRAME__ = frame;

    console.log("🚀 Scenario executed:", scenario, frame);

    // 3. SEND TO EVENT BUS (CRITICAL FIX)
    if (window.SextantBus && typeof window.SextantBus.emit === "function") {
        window.SextantBus.emit(frame);
    } else {
        console.error("❌ SextantBus.emit missing");
    }

    return frame;
};
