/**
 * Sextant v3.0 - Shock Engine
 * Handles macro shock propagation across sectors
 */

function generateShock(event) {

  return {
    policy: event.policy || 0,
    trade: event.trade || 0,
    energy: event.energy || 0
  };
}

function applyShock(state, shock) {

  // Policy shock hits industrial sector hardest
  state.industrial *= (1 - shock.policy * 0.1);

  // Trade shock hits non-tech exports
  state.nonTech *= (1 - shock.trade * 0.2);

  // Energy shock impacts all sectors mildly
  state.semis *= (1 - shock.energy * 0.05);

  return state;
}
