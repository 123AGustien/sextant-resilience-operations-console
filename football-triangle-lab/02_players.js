class Player {
  constructor(x, y, team) {
    this.x = x;
    this.y = y;
    this.team = team;
  }

  move(tx, ty) {
    this.x += (tx - this.x) * 0.05;
    this.y += (ty - this.y) * 0.05;
  }
}

class Ball {
  constructor() {
    this.x = 450;
    this.y = 250;
    this.owner = null;
  }

  moveTo(player) {
    this.x = player.x;
    this.y = player.y;
    this.owner = player;
  }
}
