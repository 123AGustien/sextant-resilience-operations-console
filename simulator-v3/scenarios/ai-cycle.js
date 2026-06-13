/**
 * Sextant v3.0 - AI Cycle Scenario
 * Strong semiconductor demand expansion phase
 */

const AI_CYCLE_SCENARIO = {
  name: "AI Expansion Cycle",
  description: "Global AI demand surge drives semiconductor supercycle",

  shock: {
    policy: 0.0,
    trade: 0.0,
    energy: 0.2   // mild energy constraint from compute demand
  },

  // macro demand amplifier (important v3 concept)
  aiDemandBoost: 1.8
};
