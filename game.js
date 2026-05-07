/* ═══════════════════════════════════════
   js/game.js
   Main game loop · Physics update · Camera
   · HUD · Notification toast
   ═══════════════════════════════════════ */

// ── Notification ──
function showNotif(msg) {
  const n = document.getElementById('notif');
  n.textContent = msg;
  n.classList.add('show');
  setTimeout(() => n.classList.remove('show'), 1900);
}

// ── Update: movement + collision + camera ──
function update() {
  if (dialogue.active || editorOpen) return;

  const { dx, dy } = getMovementVector();

  player.moving = dx !== 0 || dy !== 0;
  if (dx < 0) player.dir = 'left';
  else if (dx > 0) player.dir = 'right';
  else if (dy < 0) player.dir = 'up';
  else if (dy > 0) player.dir = 'down';

  const nx = player.x + dx * player.speed;
  const ny = player.y + dy * player.speed;

  // Building collision (axis-separated)
  let colX = false, colY = false;
  for (const b of BUILDING_COLLIDERS) {
    if (nx > b.x-12 && nx < b.x+b.w+12 && player.y > b.y-10 && player.y < b.y+b.h+10) colX = true;
    if (player.x > b.x-12 && player.x < b.x+b.w+12 && ny > b.y-10 && ny < b.y+b.h+10) colY = true;
  }

  if (!colX) player.x = Math.max(12, Math.min(WORLD_W - 12, nx));
  if (!colY) player.y = Math.max(12, Math.min(WORLD_H - 12, ny));

  // Camera: center on player, clamp to world bounds
  cam.x = Math.max(0, Math.min(WORLD_W - CANVAS_W, player.x - CANVAS_W / 2));
  cam.y = Math.max(0, Math.min(WORLD_H - CANVAS_H, player.y - CANVAS_H / 2));

  updateHUD();
}

// ── HUD location label ──
function updateHUD() {
  let loc = '🌿 Maplewood';
  if      (player.x < 300 && player.y < 250)                         loc = '🥐 Bakery Area';
  else if (player.x > 550 && player.y < 300)                         loc = "🍯 Beekeeper's Corner";
  else if (player.x < 200 && player.y > 300)                         loc = '📚 Library Row';
  else if (player.x > 480 && player.y > 300)                         loc = '🌊 The Pond';
  else if (Math.abs(player.x-390) < 60 && Math.abs(player.y-280) < 60) loc = '✨ The Magic Maple';
  document.getElementById('location-name').textContent = loc;
}

// ── Render loop ──
let lastTimestamp = 0;

function render(timestamp) {
  const time = timestamp / 1000;
  lastTimestamp = time;

  update();

  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
  drawSky();
  drawGround();
  drawBuildings();
  drawNPCs(time);
  drawPlayerOnCanvas(time);
  drawVignette();

  requestAnimationFrame(render);
}
