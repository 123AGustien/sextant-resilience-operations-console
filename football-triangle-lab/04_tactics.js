function blueTactic(blueTeam, ball) {
  let carrier = ball.owner || blueTeam[0];

  // triangle support structure
  blueTeam[1].move(carrier.x + 60, carrier.y - 40);
  blueTeam[2].move(carrier.x + 60, carrier.y + 40);
}

function redTactic(redTeam, ball) {
  let closest = redTeam.reduce((a, b) =>
    distance(b, ball) < distance(a, ball) ? b : a
  );

  // pressure the ball
  closest.move(ball.x, ball.y);

  // supporting defensive triangle
  redTeam.forEach(p => {
    if (p !== closest) {
      p.move(ball.x + 40, ball.y + 20);
    }
  });
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}
