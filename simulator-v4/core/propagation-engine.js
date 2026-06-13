/**
 * Sextant v4.0 - Shock Propagation Engine
 * Multi-country contagion model
 */

function propagateShock(world, shockCountry, shock) {

  Object.keys(world).forEach(countryKey => {

    const country = world[countryKey];

    const influence = country.dependency?.[shockCountry] || 0;

    // scale shock impact safely
    const tradeImpact = 1 - (shock.trade * influence);
    const policyImpact = 1 - (shock.policy * influence);
    const energyImpact = 1 - (shock.energy * influence);

    // apply bounded decay (prevents collapse / negative values)
    country.semis = Math.max(1, country.semis * tradeImpact);
    country.industrial = Math.max(1, country.industrial * policyImpact);
    country.nonTech = Math.max(1, country.nonTech * energyImpact);
  });

  return world;
}
