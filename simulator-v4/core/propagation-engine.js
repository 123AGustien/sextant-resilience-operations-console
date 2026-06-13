function propagateShock(world, shockCountry, shock) {

  Object.keys(world).forEach(countryKey => {

    const country = world[countryKey];

    const influence = country.dependency[shockCountry] || 0;

    country.semis *= (1 - shock.trade * influence);
    country.industrial *= (1 - shock.policy * influence);
    country.nonTech *= (1 - shock.energy * influence);
  });

  return world;
}
