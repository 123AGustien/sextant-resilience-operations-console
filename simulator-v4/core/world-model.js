/**
 * Sextant v4.0 - World Model
 * Multi-country macro system
 */

const WORLD = {
  singapore: {
    name: "Singapore",
    semis: 120,
    industrial: 100,
    nonTech: 110,
    dependency: {
      china: 0.4,
      usa: 0.3
    }
  },

  usa: {
    name: "USA",
    semis: 110,
    industrial: 120,
    nonTech: 100,
    dependency: {
      china: 0.2,
      singapore: 0.3
    }
  },

  china: {
    name: "China",
    semis: 100,
    industrial: 130,
    nonTech: 120,
    dependency: {
      usa: 0.3,
      singapore: 0.2
    }
  }
};
