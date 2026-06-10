let canvas = document.getElementById("pitch");
let ctx = canvas.getContext("2d");

let blueTeam = [];
let redTeam = [];
let ball;

let blueScore = 0;
let redScore = 0;

// BALL PHYSICS
let ballVx = 0;
let ballVy = 0;

// ----------------------
// HEATMAP STORAGE
// ----------------------
let heatmap = Array.from({ length: 900 }, () =>
  Array.from({ length: 500 }, () => 0)
);

// TRAILS
let trails = [];

// PLAYER CLASS WITH STAMINA
class FatPlayer extends Player {
  constructor(x, y, team) {
    super(x, y, team);
    this.stamina = 100;
    this.baseSpeed = 0.05;
  }

  move(tx, ty) {
    let speedFactor = this.stamina / 100;
    let speed = this.baseSpeed * speedFactor;

    this.x += (tx - this.x) * speed;
    this.y += (ty - this.y) * speed;

    this.stamina -= 0.02;
    if (this.stamina < 20) this.stamina = 20;
  }

  recover() {
    this.stamina += 0.01;
    if (this.stamina > 100) this.stamina = 100;
  }
}

// INIT
function init() {
  blueTeam = [
    new FatPlayer(200, 200, "blue"),
    new FatPlayer(200, 250, "blue"),
    new FatPlayer(200, 300, "blue")
  ];

  redTeam = [
    new FatPlayer(700, 200, "red"),
    new FatPlayer(700, 250, "red"),
    new FatPlayer(700, 300, "red")
  ];

  ball = new Ball();
  ball.owner = blueTeam[0];

  trails = [];
}

// DISTANCE
function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

// PASS AI
function choosePass(team) {
  let carrier = ball.owner;
  if (!carrier) return null;

  let bestTarget = null;
  let bestScore = -999;

  team.forEach(p => {
    if (p === carrier) return;

    let d = distance(carrier, p);
    let pressurePenalty = getPressure(carrier);

    let score = 100 - d - pressurePenalty;

    if (score > bestScore) {
      bestScore = score;
      bestTarget = p;
    }
  });

  return bestTarget;
}

// PRESSURE SYSTEM
function getPressure(player) {
  let opponents = player.team === "blue" ? redTeam : blueTeam;
  let pressure = 0;

  opponents.forEach(o => {
    let d = distance(o, player);
    if (d < 80) pressure += (80 - d) * 0.2;
  });

  return pressure;
}

// PASS
function passBall(from, to) {
  let dx = to.x - from.x;
  let dy = to.y - from.y;

  let mag = Math.sqrt(dx * dx + dy * dy);

  ballVx = (dx / mag) * 4;
  ballVy = (dy / mag) * 4;

  ball.owner = null;
}

// ----------------------
// HEATMAP UPDATE
// ----------------------
function updateHeatmap() {
  [...blueTeam, ...redTeam].forEach(p => {
    let x = Math.floor(p.x);
    let y = Math.floor(p.y);

    if (heatmap[x] && heatmap[x][y] !== undefined) {
      heatmap[x][y] += 1;
    }

    trails.push({ x: p.x, y: p.y });
    if (trails.length > 200) trails.shift();
  });
}

// UPDATE LOOP
function update() {
  blueTactic(blueTeam, ball);
  redTactic(redTeam, ball);

  enforceCPA([...blueTeam, ...redTeam]);

  if (ball.owner) {
    let team = ball.owner.team === "blue" ? blueTeam : redTeam;
    let target = choosePass(team);

    if (target) passBall(ball.owner, target);
  }

  if (!ball.owner) {
    ball.x += ballVx;
    ball.y += ballVy;

    ballVx *= 0.98;
    ballVy *= 0.98;
  }

  // POSSESSION
  [...blueTeam, ...redTeam].forEach(p => {
    if (distance(p, ball) < 12) ball.owner = p;
  });

  // stamina recovery
  [...blueTeam, ...redTeam].forEach(p => p.recover());

  updateHeatmap();

  // GOALS
  if (ball.x > 880 && ball.y > 200 && ball.y < 300) goal("blue");
  if (ball.x < 20 && ball.y > 200 && ball.y < 300) goal("red");
}

// ----------------------
// DRAW + VISUAL INTELLIGENCE
// ----------------------
function draw() {
  ctx.fillStyle = "#1e7f1e";
  ctx.fillRect(0, 0, 900, 500);

  // center line
  ctx.strokeStyle = "white";
  ctx.beginPath();
  ctx.moveTo(450, 0);
  ctx.lineTo(450, 500);
  ctx.stroke();

  // center circle
  ctx.beginPath();
  ctx.arc(450, 250, 60, 0, Math.PI * 2);
  ctx.stroke();

  // GOALS
  ctx.strokeRect(10, 200, 10, 100);
  ctx.strokeRect(880, 200, 10, 100);

  // HEATMAP (visual intensity)
  ctx.fillStyle = "rgba(255, 255, 0, 0.03)";
  for (let i = 0; i < trails.length; i++) {
    let t = trails[i];
    ctx.fillRect(t.x, t.y, 2, 2);
  }

  // BALL
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, 5, 0, Math.PI * 2);
  ctx.fill();

  drawTeam(blueTeam, "blue");
  drawTeam(redTeam, "red");
}

// TEAM DRAW
function drawTeam(team, color) {
  team.forEach(p => {

    if (ball.owner === p) {
      ctx.strokeStyle = "yellow";
      ctx.beginPath();
      ctx.arc(p.x, p.y, 14, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
    ctx.fill();
  });
}

// GOAL
function goal(team) {
  if (team === "blue") blueScore++;
  if (team === "red") redScore++;

  init();
}

// CONTROL
function startMatch() {
  init();
  loop();
}

function resetMatch() {
  blueScore = 0;
  redScore = 0;
  init();
}

// LOOP
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}
