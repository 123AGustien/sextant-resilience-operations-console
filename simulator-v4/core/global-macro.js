/**
 * Sextant v4.0 - Global Macro Engine
 * Aggregates all countries into a single system index
 */

function computeGlobalIndex(world) {

  let total = 0;
  let count = 0;

  Object.keys(world).forEach(key => {

    const c = world[key];

    // weighted sector model
    const countryIndex =
      (c.semis * 0.4) +
      (c.industrial * 0.3) +
      (c.nonTech * 0.3);

    total += countryIndex;
    count++;
  });

  return count > 0 ? total / count : 0;
}

/**
 * Optional: normalized system health score (0–100)
 */
function computeSystemHealth(world) {

  const rawIndex = computeGlobalIndex(world);

  // normalize (based on your starting baseline ~100–130 range)
  const health = Math.min(100, Math.max(0, (rawIndex / 1.3)));

  return health;
}
