function enforceCPA(players) {
  for (let i = 0; i < players.length; i++) {
    for (let j = i + 1; j < players.length; j++) {

      let a = players[i];
      let b = players[j];

      let dx = a.x - b.x;
      let dy = a.y - b.y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      // ⚠️ 1m minimum separation rule
      if (dist < 1) {
        a.x += dx * 0.5;
        a.y += dy * 0.5;

        b.x -= dx * 0.5;
        b.y -= dy * 0.5;
      }
    }
  }
}
