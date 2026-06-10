<!DOCTYPE html>
<html>
<head>
  <title>Triangle Football Lab v4 (Fail-Safe)</title>

  <style>
    body {
      margin: 0;
      background: #0b3d0b;
      color: white;
      font-family: Arial;
      text-align: center;
    }

    canvas {
      background: #1e7f1e;
      border: 3px solid white;
      display: block;
      margin: auto;
    }

    .ui {
      margin: 10px;
    }

    button {
      padding: 8px 14px;
      margin: 5px;
      cursor: pointer;
    }
  </style>
</head>

<body>

<h1>Triangle Football Lab v4</h1>

<div class="ui">
  Blue: <span id="blueScore">0</span> |
  Red: <span id="redScore">0</span>
</div>

<button onclick="safeStart()">Start</button>
<button onclick="safeReset()">Reset</button>

<canvas id="pitch" width="900" height="500"></canvas>

<script>
"use strict";

// =========================
// SAFE ENGINE WRAPPER
// =========================
let canvas, ctx;
let blueTeam = [];
let redTeam = [];
let ball;

let blueScore = 0;
let redScore = 0;

let running = false;
let loopStarted = false;

// =========================
// SAFE INIT (NO FAIL)
// =========================
function safeInit() {
  canvas = document.getElementById("pitch");

  if (!canvas) {
    console.error("Canvas missing - retrying...");
    setTimeout(safeInit, 200);
    return;
  }

  ctx = canvas.getContext("2d");

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
  ball.attach(blueTeam[0]);
}

// =========================
// PLAYER
// =========================
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

// =========================
// BALL
// =========================
class Ball {
  constructor() {
    this.x = 450;
    this.y = 250;
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

// =========================
// SAFE DISTANCE
// =========================
function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

// =========================
// TRIAL MANOEUVRE (SAFE)
// =========================
function blueTactic() {
  let carrier = ball.owner || blueTeam[0];

  blueTeam[0].move(carrier.x, carrier.y);

  blueTeam[1].move(carrier.x + 60, carrier.y - 40);
  blueTeam[2].move(carrier.x + 60, carrier.y + 40);
}

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

// =========================
// SAFE UPDATE (NO CRASH)
// =========================
function update() {
  try {
    blueTactic();
    redTactic();

    ball.update();

    [...blueTeam, ...redTeam].forEach(p => {
      if (dist(p, ball) < 14) {
        ball.attach(p);
      }
    });

    if (ball.x > 880) goal("blue");
    if (ball.x < 20) goal("red");

  } catch (e) {
    console.error("Update error:", e);
  }
}

// =========================
// SAFE DRAW (GUARANTEED RENDER)
// =========================
function draw() {
  if (!ctx) return;

  ctx.clearRect(0, 0, 900, 500);

  // pitch
  ctx.fillStyle = "#1e7f1e";
  ctx.fillRect(0, 0, 900, 500);

  // center line
  ctx.strokeStyle = "white";
  ctx.beginPath();
  ctx.moveTo(450, 0);
  ctx.lineTo(450, 500);
  ctx.stroke();

  // ball (always visible)
  if (ball) {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  drawTeam(blueTeam, "blue");
  drawTeam(redTeam, "red");
}

// =========================
// TEAM DRAW SAFE
// =========================
function drawTeam(team, color) {
  if (!team) return;

  ctx.fillStyle = color;

  team.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
    ctx.fill();
  });
}

// =========================
// GOAL SAFE
// =========================
function goal(team) {
  if (team === "blue") blueScore++;
  if (team === "red") redScore++;

  const b = document.getElementById("blueScore");
  const r = document.getElementById("redScore");

  if (b) b.innerText = blueScore;
  if (r) r.innerText = redScore;

  safeInit();
}

// =========================
// LOOP GUARANTEE (SELF-HEALING)
// =========================
function loop() {
  if (!running) return;

  update();
  draw();

  requestAnimationFrame(loop);
}

// =========================
// SAFE START (MULTI-GUARD)
// =========================
function safeStart() {
  running = true;

  if (!loopStarted) {
    loopStarted = true;
    safeInit();
    loop();
  } else {
    safeInit();
  }
}

// =========================
// SAFE RESET
// =========================
function safeReset() {
  blueScore = 0;
  redScore = 0;

  const b = document.getElementById("blueScore");
  const r = document.getElementById("redScore");

  if (b) b.innerText = 0;
  if (r) r.innerText = 0;

  safeInit();
}

// =========================
// AUTO START FAILSAFE
// =========================
window.onload = () => {
  safeStart();
};

// extra safety net
setTimeout(() => {
  if (!loopStarted) {
    console.warn("Auto recovery triggered");
    safeStart();
  }
}, 1000);

</script>

</body>
</html>
