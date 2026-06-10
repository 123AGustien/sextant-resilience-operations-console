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
// FORMATIONS (11v11 STRUCTURE)
// ----------------------
function createTeam(side) {
  let team = [];

  for (let i = 0; i < 11; i++) {
    let role = getRole(i);

    let x = side === "blue" ? 150 : 750;
    let y = 40 + i * 40;

    team.push(new RolePlayer(x, y, side, role));
  }

  return team;
}

// ----------------------
// ROLE ASSIGNMENT
// ----------------------
function getRole(i) {
  if (i === 0) return "GK";
  if (i <= 3) return "DEF";
  if (i <= 7) return "MID";
  return "FWD";
}

// ----------------------
// ROLE PLAYER CLASS
// ----------------------
class RolePlayer extends Player {
  constructor(x, y, team, role) {
    super(x, y, team);
    this.role = role;
    this.stamina = 100;
  }

  move(tx, ty) {
    let speed = 0.05;

    // role-based speed tuning
    if (this.role === "FWD") speed = 0.07;
    if (this.role === "DEF") speed = 0.04;
    if (this.role === "GK") speed = 0.02;

    this.x += (tx - this.x) * speed;
    this.y += (ty - this.y) * speed;
  }
}

// ----------------------
// INIT
// ----------------------
function init() {
  blueTeam = createTeam("blue");
  redTeam = createTeam("red");

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
// ROLE BEHAVIOR SYSTEM
// ----------------------
function roleBehavior(player) {
  let enemy = player.team === "blue" ? redTeam : blueTeam;

  if (player.role === "GK") {
    // stay near goal
    let gx = player.team === "blue" ? 80 : 820;
    player.move(gx, 250);
  }

  if (player.role === "DEF") {
    // defensive line
    player.move(player.team === "blue" ? 250 : 650, player.y);
  }

  if (player.role === "MID") {
    // support ball
    player.move(ball.x, ball.y);
  }

  if (player.role === "FWD") {
    // attack goal
    let targetX = player.team === "blue" ? 850 : 50;
    player.move(targetX, ball.y);
  }
}

// ----------------------
// PASS AI
// ----------------------
function choosePass(team) {
  let carrier = ball.owner;
  if (!carrier) return null;

  let best = null;
  let bestScore = -999;

  team.forEach(p => {
    if (p === carrier) return;

    let d = distance(carrier, p);
    let score = 120 - d;

    if (score > bestScore) {
      bestScore = score;
      best = p;
    }
  });

  return best;
}

// ----------------------
// PASS
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
// UPDATE
// ----------------------
function update() {
  blueTactic(blueTeam, ball);
  redTactic(redTeam, ball);

  enforceCPA([...blueTeam, ...redTeam]);

  // ROLE SYSTEM (STEP 19 CORE)
  [...blueTeam, ...redTeam].forEach(roleBehavior);

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

  // GOALS
  if (ball.x > 880 && ball.y > 200 && ball.y < 300) goal("blue");
  if (ball.x < 20 && ball.y > 200 && ball.y < 300) goal("red");
}

// ----------------------
// DRAW
// ----------------------
function draw() {
  ctx.fillStyle = "#1e7f1e";
  ctx.fillRect(0, 0, 900, 500);

  ctx.strokeStyle = "white";

  ctx.beginPath();
  ctx.moveTo(450, 0);
  ctx.lineTo(450, 500);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(450, 250, 60, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeRect(10, 200, 10, 100);
  ctx.strokeRect(880, 200, 10, 100);

  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, 5, 0, Math.PI * 2);
  ctx.fill();

  drawTeam(blueTeam, "blue");
  drawTeam(redTeam, "red");
}

// ----------------------
// DRAW TEAM
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

    // role label (visual debug)
    ctx.fillStyle = "white";
    ctx.font = "10px Arial";
    ctx.fillText(p.role || "", p.x - 10, p.y - 15);
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
