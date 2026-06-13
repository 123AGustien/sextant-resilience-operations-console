/**
 * Sextant v3.0 - Macro Engine
 * Core simulation brain (sector interaction model)
 */

function computeMacroState(state, shock) {

  // AI demand strengthens semiconductors
  let semis = state.semis * (1 + state.aiDemand * 0.15);

  // Industrial cycle weakens under policy pressure
  let industrial = state.industrial * (1 - shock.policy * 0.1);

  // Non-tech is highly exposed to trade disruptions
  let nonTech = state.nonTech * (1 - shock.trade * 0.2);

  // Energy shock slightly drags semis (cost pressure)
  semis *= (1 - shock.energy * 0.05);

  // Macro index = weighted system output
  let macroIndex =
    (semis * 0.4) +
    (industrial * 0.3) +
    (nonTech * 0.3);

  return {
    semis,
    industrial,
    nonTech,
    macroIndex
  };
}
