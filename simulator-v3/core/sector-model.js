/**
 * Sextant v3.0 - Sector Model
 * Core economic state definition
 */

const SECTOR_BASE = {
  semis: 100,        // semiconductor cycle (AI-driven)
  industrial: 100,   // capex / manufacturing cycle
  nonTech: 100,      // trade-sensitive exports
  aiDemand: 1.0      // global AI demand multiplier
};

let state = JSON.parse(JSON.stringify(SECTOR_BASE));
