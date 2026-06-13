/**
 * Sextant v4.0 - Global Macro Engine
 */

function computeGlobalIndex(world) {

  let total = 0;
  let count = 0;

  Object.values(world).forEach(country => {

    total += (
      country.semis +
      country.industrial +
      country.nonTech
    ) / 3;

    count++;
  });

  return count > 0 ? total / count : 0;
}

function computeSystemHealth(world) {

  const index = computeGlobalIndex(world);

  return Math.min(100, Math.max(0, index));
}
