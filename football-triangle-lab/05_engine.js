let canvas = document.getElementById("pitch");
let ctx = canvas.getContext("2d");

let blueTeam = [];
let redTeam = [];
let ball;

let blueScore = 0;
let redScore = 0;

// INIT MATCH
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

// UPDATE LOOP
function update() {
  blueTactic(blueTeam, ball);
  redTactic(redTeam, ball);

  enforceCPA([...blueTeam, ...redTeam]);

  let nearest = [...blueTeam, ...redTeam].reduce((a, b) =>
    distance(b, ball) < distance(a, ball) ? b : a
  );

  ball.moveTo(nearest);

  // GOALS
  if (ball.x > 880) goal("blue");
  if (ball.x < 20) goal("red");
}

// DRAW LOOP
function draw() {
  ctx.clearRect(0, 0, 900, 500);

  // BALL
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, 5, 0, Math.PI * 2);
  ctx.fill();

  drawTeam(blueTeam, "blue");
  drawTeam(redTeam, "red");
}

// DRAW TEAM
function drawTeam(team, color) {
  ctx.fillStyle = color;

  team.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
    ctx.fill();
  });
}

// GOAL SYSTEM
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
