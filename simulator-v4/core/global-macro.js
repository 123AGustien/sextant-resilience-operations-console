function computeGlobalIndex(world) {

  let total = 0;

  Object.values(world).forEach(c => {

    total +=
      c.semis * 0.4 +
      c.industrial * 0.3 +
      c.nonTech * 0.3;
  });

  return total / 3;
}
