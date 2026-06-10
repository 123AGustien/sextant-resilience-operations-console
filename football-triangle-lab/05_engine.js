// =====================
// FIELD
// =====================
const WIDTH = 900;
const HEIGHT = 500;

const GOAL_WIDTH = 120;
const GOAL_Y1 = 190;
const GOAL_Y2 = 310;

// =====================
// STATE
// =====================
let blueTeam = [];
let redTeam = [];
let ball;

let blueScore = 0;
let redScore = 0;

// =====================
// PLAYER
// =====================
class Player {
  constructor(x, y, team) {
    this.x = x;
    this.y = y;
    this.team = team;
  }

  move(tx, ty) {
    this.x += (tx - this.x) * 0.06;
    this.y += (ty - this.y) * 0.06;
  }
}

// =====================
// BALL
// =====================
class Ball {
  constructor() {
    this.x = WIDTH / 2;
    this.y = HEIGHT / 2;
    this.owner = null;
  }

  attach(p) {
    this.owner = p;
  }

  update() {
    if (this.owner) {
      this.x = this.owner.x;
      this.y = this.owner.y;
    }
  }
}

// =====================
// DISTANCE
// =====================
function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

// =====================
// TRIAL MANOEUVRE v2 (CORE UPGRADE)
// =====================
function trialMove(player, carrier, enemyTeam) {
  let options = [
    { x: carrier.x + 60, y: carrier.y - 40 },
    { x: carrier.x + 60, y: carrier.y + 40 },
    { x: carrier.x + 90, y: carrier.y }
  ];

  let best = options[0];
  let bestScore = -999;

  options.forEach(o => {
    let score =
      spaceScore(o, enemyTeam) -
      pressureScore(o, enemyTeam);

    if (score > bestScore) {
      bestScore = score;
      best = o;
    }
  });

  player.move(best.x, best.y);
}

// =====================
// SPACE + PRESSURE MODEL
// =====================
function spaceScore(pos, enemies) {
  let score = 0;
  enemies.forEach(e => {
    let d = Math.hypot(pos.x - e.x, pos.y - e.y);
    if (d > 80) score += 2;
  });
  return score;
}

function pressureScore(pos, enemies) {
  let pressure = 0;
  enemies.forEach(e => {
    let d = Math.hypot(pos.x - e.x, pos.y - e.y);
    if (d < 100) pressure += 3;
  });
  return pressure;
}

// =====================
// BLUE TACTIC (TRIAL SYSTEM)
// =====================
function blueTactic() {
  let carrier = ball.owner || blueTeam[0];
  let enemy = redTeam;

  blueTeam.forEach(p => {
    if (p !== carrier) {
      trialMove(p, carrier, enemy);
    }
  });

  blueTeam[0].move(carrier.x, carrier.y);
}

// =====================
// RED PRESSURE
// =====================
function redTactic() {
  let closest = redTeam.reduce((a, b) =>
    dist(b, ball) < dist(a, ball) ? b : a
  );

  closest.move(ball.x, ball.y);

  redTeam.forEach(p => {
    if (p !== closest) {
      p.move(ball.x + 40, ball.y + 20);
    }
  });
}

// =====================
// INIT (NOW WITH MORE PLAYERS)
// =====================
function init() {
  blueTeam = [
    new Player(200, 200, "blue"),
    new Player(200, 250, "blue"),
    new Player(200, 300, "blue"),
    new Player(180, 230, "blue")
  ];

  redTeam = [
    new Player(700, 200, "red"),
    new Player(700, 250, "red"),
    new Player(700, 300, "red"),
    new Player(720, 230, "red")
  ];

  ball = new Ball();
  ball.attach(blueTeam[0]);
}

// =====================
// UPDATE
// =====================
function update() {
  blueTactic();
  redTactic();

  ball.update();

  // interception
  [...blueTeam, ...redTeam].forEach(p => {
    if (dist(p, ball) < 12) {
      ball.attach(p);
    }
  });

  // GOALS (REAL POSTS NOW)
  if (ball.x > WIDTH - 10 && ball.y > GOAL_Y1 && ball.y < GOAL_Y2) {
    goal("blue");
  }

  if (ball.x < 10 && ball.y > GOAL_Y1 && ball.y < GOAL_Y2) {
    goal("red");
  }
}

// =====================
// DRAW FIELD + GOALS
// =====================
function draw(ctx) {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  // pitch
  ctx.fillStyle = "#1e7f1e";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // center line
  ctx.strokeStyle = "white";
  ctx.beginPath();
  ctx.moveTo(WIDTH/2, 0);
  ctx.lineTo(WIDTH/2, HEIGHT);
  ctx.stroke();

  // GOAL POSTS
  ctx.strokeRect(0, GOAL_Y1, 10, GOAL_Y2 - GOAL_Y1);
  ctx.strokeRect(WIDTH - 10, GOAL_Y1, 10, GOAL_Y2 - GOAL_Y1);

  // ball
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, 5, 0, Math.PI * 2);
  ctx.fill();

  drawTeam(ctx, blueTeam, "blue");
  drawTeam(ctx, redTeam, "red");
}

// =====================
// DRAW TEAM
// =====================
function drawTeam(ctx, team, color) {
  ctx.fillStyle = color;
  team.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
    ctx.fill();
  });
}

// =====================
// GOAL
// =====================
function goal(team) {
  if (team === "blue") blueScore++;
  if (team === "red") redScore++;

  init();
}
