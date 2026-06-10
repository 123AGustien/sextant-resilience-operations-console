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

// INIT
function init() {
  blueTeam = [
    new Player(200, 200, "blue"),
    new Player(200, 250, "blue"),
    new Player(200, 300, "blue")
  ];

  redTeam = [
    new Player(700, 200, "red"),
    new Player(700, 250, "red"),
    new Player(700, 300, "red")
  ];

  ball = new Ball();
  ball.owner = blueTeam[0];
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
    let score = 100 - d;

    if (score > bestScore) {
      bestScore = score;
      bestTarget = p;
    }
  });

  return bestTarget;
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

// UPDATE
function update() {
  blueTactic(blueTeam, ball);
  redTactic(redTeam, ball);

  enforceCPA([...blueTeam, ...redTeam]);

  if (ball.owner) {
    let team = ball.owner.team === "blue" ? blueTeam : redTeam;
    let target = choosePass(team);

    if (target) {
      passBall(ball.owner, target);
    }
  }

  if (!ball.owner) {
    ball.x += ballVx;
    ball.y += ballVy;

    ballVx *= 0.98;
    ballVy *= 0.98;
  }

  // regain possession
  [...blueTeam, ...redTeam].forEach(p => {
    if (distance(p, ball) < 12) {
      ball.owner = p;
    }
  });

  // goals
  if (ball.x > 880) goal("blue");
  if (ball.x < 20) goal("red");
}

// 🎥 SCREEN RENDER (UPGRADED)
function draw() {
  // pitch
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

  // ball
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, 5, 0, Math.PI * 2);
  ctx.fill();

  drawTeam(blueTeam, "blue");
  drawTeam(redTeam, "red");
}

// TEAM DRAW + HIGHLIGHT
function drawTeam(team, color) {
  team.forEach(p => {

    // highlight ball carrier
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
