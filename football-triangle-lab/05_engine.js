let canvas = document.getElementById("pitch");
let ctx = canvas.getContext("2d");

let blueTeam = [];
let redTeam = [];
let ball;

let blueScore = 0;
let redScore = 0;

let ballVx = 0;
let ballVy = 0;

// ----------------------
// FORMATIONS
// ----------------------
let blueFormation = [
  { x: 200, y: 200 },
  { x: 200, y: 250 },
  { x: 200, y: 300 }
];

let redFormation = [
  { x: 700, y: 200 },
  { x: 700, y: 250 },
  { x: 700, y: 300 }
];

// ----------------------
// INIT
// ----------------------
function init() {
  blueTeam = blueFormation.map(p => new FatPlayer(p.x, p.y, "blue"));
  redTeam = redFormation.map(p => new FatPlayer(p.x, p.y, "red"));

  ball = new Ball();
  ball.owner = blueTeam[0];
}

// ----------------------
// DISTANCE
// ----------------------
function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

// ----------------------
// PRESSURE MODEL
// ----------------------
function pressureAt(x, y, enemyTeam) {
  let pressure = 0;

  enemyTeam.forEach(p => {
    let d = Math.hypot(p.x - x, p.y - y);
    if (d < 120) pressure += (120 - d) * 0.25;
  });

  return pressure;
}

// ----------------------
// PASS AI (SMART + PRESSURE AWARE)
// ----------------------
function choosePass(team) {
  let carrier = ball.owner;
  if (!carrier) return null;

  let best = null;
  let bestScore = -999;

  team.forEach(p => {
    if (p === carrier) return;

    let d = distance(carrier, p);

    let enemy = carrier.team === "blue" ? redTeam : blueTeam;
    let pressure = pressureAt(p.x, p.y, enemy);

    let score = 130 - d - pressure;

    if (score > bestScore) {
      bestScore = score;
      best = p;
    }
  });

  return best;
}

// ----------------------
// PASS EXECUTION
// ----------------------
function passBall(from, to) {
  let dx = to.x - from.x;
  let dy = to.y - from.y;

  let mag = Math.sqrt(dx * dx + dy * dy);

  ballVx = (dx / mag) * 4;
  ballVy = (dy / mag) * 4;

  ball.owner = null;
}

// ----------------------
// FORMATION CONTROL (STEP 11)
// ----------------------
function maintainFormation(team, formation) {
  team.forEach((p, i) => {
    if (p !== ball.owner) {
      p.move(formation[i].x, formation[i].y);
    }
  });
}

// ----------------------
// ADAPTIVE PRESSURE (STEP 12)
// ----------------------
function adaptiveDefense(team) {
  let enemy = team[0].team === "blue" ? blueTeam : redTeam;

  team.forEach(p => {
    enemy.forEach(e => {
      if (distance(p, e) < 90) {
        p.move(ball.x, ball.y);
      }
    });
  });
}

// ----------------------
// UPDATE
// ----------------------
function update() {
  blueTactic(blueTeam, ball);
  redTactic(redTeam, ball);

  enforceCPA([...blueTeam, ...redTeam]);

  // PASS SYSTEM
  if (ball.owner) {
    let team = ball.owner.team === "blue" ? blueTeam : redTeam;
    let target = choosePass(team);

    if (target) passBall(ball.owner, target);
  }

  // BALL MOVEMENT
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

  // RECOVERY
  [...blueTeam, ...redTeam].forEach(p => p.recover());

  // STEP 11
  maintainFormation(blueTeam, blueFormation);
  maintainFormation(redTeam, redFormation);

  // STEP 12
  adaptiveDefense(redTeam);

  // STEP 13 — SEXTANT RISK LOGIC
  let risk = pressureAt(ball.x, ball.y, redTeam);

  if (risk > 60 && ball.owner) {
    blueTeam.forEach(p => p.move(ball.x, ball.y));
  }

  // GOALS
  if (ball.x > 880 && ball.y > 200 && ball.y < 300) goal("blue");
  if (ball.x < 20 && ball.y > 200 && ball.y < 300) goal("red");
}

// ----------------------
// DRAW FIELD
// ----------------------
function draw() {
  ctx.fillStyle = "#1e7f1e";
  ctx.fillRect(0, 0, 900, 500);

  ctx.strokeStyle = "white";

  // center line
  ctx.beginPath();
  ctx.moveTo(450, 0);
  ctx.lineTo(450, 500);
  ctx.stroke();

  // center circle
  ctx.beginPath();
  ctx.arc(450, 250, 60, 0, Math.PI * 2);
  ctx.stroke();

  // goals
  ctx.strokeRect(10, 200, 10, 100);
  ctx.strokeRect(880, 200, 10, 100);

  // ball
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, 5, 0, Math.PI * 2);
  ctx.fill();

  drawTeam(blueTeam, "blue");
  drawTeam(redTeam, "red");
}

// ----------------------
// TEAM DRAW
// ----------------------
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

// ----------------------
// GOAL
// ----------------------
function goal(team) {
  if (team === "blue") blueScore++;
  if (team === "red") redScore++;

  init();
}

// ----------------------
// CONTROL
// ----------------------
function startMatch() {
  init();
  loop();
}

function resetMatch() {
  blueScore = 0;
  redScore = 0;
  init();
}

// ----------------------
// LOOP
// ----------------------
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}
