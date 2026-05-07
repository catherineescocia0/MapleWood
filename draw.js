/* ═══════════════════════════════════════
   js/draw.js
   World rendering — sky, ground, buildings,
   trees, flowers, pond, path.
   Add new scenery functions here.
   ═══════════════════════════════════════ */

function fp(v) { return Math.floor(v); }

// ── Sky + Clouds ──
function drawSky() {
  const g = ctx.createLinearGradient(0, 0, 0, CANVAS_H * 0.55);
  g.addColorStop(0, P.skyTop);
  g.addColorStop(1, P.skyBot);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  drawCloud(80  - cam.x * 0.3, 40, 60);
  drawCloud(300 - cam.x * 0.3, 25, 80);
  drawCloud(580 - cam.x * 0.3, 50, 50);
}

function drawCloud(x, y, w) {
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  const cx = fp(x), cy = fp(y);
  ctx.beginPath();
  ctx.ellipse(cx,          cy + 10, w * .4,  10, 0, 0, Math.PI * 2);
  ctx.ellipse(cx + w * .2, cy + 5,  w * .35, 12, 0, 0, Math.PI * 2);
  ctx.ellipse(cx - w * .15,cy + 8,  w * .3,  10, 0, 0, Math.PI * 2);
  ctx.fill();
}

// ── Ground + Path ──
function drawGround() {
  ctx.fillStyle = P.grassMid;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // Horizontal path
  ctx.fillStyle = P.pathTan;
  ctx.fillRect(0, fp(270 - cam.y), CANVAS_W, 48);
  // Vertical path
  ctx.fillRect(fp(370 - cam.x), 0, 48, CANVAS_H);

  // Path edges
  ctx.fillStyle = P.pathEdge;
  ctx.fillRect(0, fp(270 - cam.y), CANVAS_W, 3);
  ctx.fillRect(0, fp(315 - cam.y), CANVAS_W, 3);
  ctx.fillRect(fp(370 - cam.x), 0, 3, CANVAS_H);
  ctx.fillRect(fp(415 - cam.x), 0, 3, CANVAS_H);

  // Grass detail patches
  [[120,180],[600,200],[200,400],[650,400]].forEach(([x,y]) => drawGrassPatch(x, y));
}

function drawGrassPatch(x, y) {
  ctx.fillStyle = P.grassLight;
  for (let i = 0; i < 5; i++) {
    ctx.fillRect(fp(x + (i*13) % 20 - 10 - cam.x), fp(y + (i*7) % 12 - 6 - cam.y), 4, 6);
  }
}

// ── Buildings ──
function drawBuildings() {
  BUILDINGS.forEach(b => drawBuilding(b));

  drawPond(520, 340, 80, 50);
  drawMapleTree(390, 230, 1.5);

  [[200,260,6],[550,260,5],[300,400,5],[130,350,4],[680,350,6]]
    .forEach(([x,y,n]) => drawFlowers(x, y, n));

  [[700,140],[60,360],[720,360],[320,120]]
    .forEach(([x,y]) => drawTree(x, y));
}

function drawBuilding({ x, y, w, h, wall, roof, label, accent }) {
  const rx = x - cam.x, ry = y - cam.y;

  // Drop shadow
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.fillRect(fp(rx+4), fp(ry+4), w, h);

  // Wall
  ctx.fillStyle = wall;
  ctx.fillRect(fp(rx), fp(ry+20), w, h);

  // Wall shading
  ctx.fillStyle = 'rgba(0,0,0,0.08)';
  ctx.fillRect(fp(rx), fp(ry+20), 8, h);
  ctx.fillRect(fp(rx+w-8), fp(ry+20), 8, h);

  // Roof
  ctx.fillStyle = roof;
  ctx.beginPath();
  ctx.moveTo(fp(rx-6),   fp(ry+22));
  ctx.lineTo(fp(rx+w/2), fp(ry-14));
  ctx.lineTo(fp(rx+w+6), fp(ry+22));
  ctx.closePath();
  ctx.fill();

  // Roof underside shade
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.beginPath();
  ctx.moveTo(fp(rx+w/2), fp(ry-14));
  ctx.lineTo(fp(rx+w+6), fp(ry+22));
  ctx.lineTo(fp(rx+w),   fp(ry+22));
  ctx.closePath();
  ctx.fill();

  // Door
  ctx.fillStyle = P.doorBrown;
  ctx.fillRect(fp(rx+w/2-12), fp(ry+h-8), 24, 28);
  ctx.fillStyle = P.gold;
  ctx.fillRect(fp(rx+w/2+6),  fp(ry+h+4), 4, 4);

  // Windows
  [[rx+14, ry+h-30],[rx+w-34, ry+h-30]].forEach(([wx,wy]) => {
    ctx.fillStyle = P.windowB;
    ctx.fillRect(fp(wx), fp(wy), 20, 18);
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillRect(fp(wx+2), fp(wy+2), 7, 14);
    ctx.strokeStyle = P.outline;
    ctx.lineWidth = 1;
    ctx.strokeRect(fp(wx), fp(wy), 20, 18);
  });

  // Sign
  ctx.fillStyle = accent;
  ctx.fillRect(fp(rx+w/2-26), fp(ry+28), 52, 14);
  ctx.fillStyle = '#1a1a2e';
  ctx.font = '6px "Press Start 2P"';
  ctx.textAlign = 'center';
  ctx.fillText(label, fp(rx+w/2), fp(ry+38));

  // Wall outline
  ctx.strokeStyle = P.outline;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(fp(rx), fp(ry+20), w, h);
}

// ── Pond ──
function drawPond(x, y, w, h) {
  const rx = x - cam.x, ry = y - cam.y;
  ctx.fillStyle = P.water;
  ctx.beginPath();
  ctx.ellipse(fp(rx), fp(ry), w, h, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = P.waterShim;
  ctx.fillRect(fp(rx-20), fp(ry-8), 8, 3);
  ctx.fillRect(fp(rx+10), fp(ry+4), 12, 3);

  ctx.strokeStyle = '#4090b8';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(fp(rx), fp(ry), w, h, 0, 0, Math.PI * 2);
  ctx.stroke();
}

// ── Maple Tree (magical) ──
function drawMapleTree(x, y, s) {
  const rx = x - cam.x, ry = y - cam.y;
  ctx.fillStyle = P.treeTrunk;
  ctx.fillRect(fp(rx-8*s), fp(ry+10*s), 16*s, 40*s);

  ctx.fillStyle = P.treeLeaf1;
  ctx.beginPath(); ctx.arc(fp(rx), fp(ry-10*s), 38*s, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = P.treeLeaf2;
  ctx.beginPath(); ctx.arc(fp(rx-16*s), fp(ry-4*s), 24*s, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(fp(rx+16*s), fp(ry-4*s), 24*s, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = P.treeLeaf3;
  ctx.beginPath(); ctx.arc(fp(rx), fp(ry-22*s), 24*s, 0, Math.PI*2); ctx.fill();

  // Magic glow
  ctx.fillStyle = 'rgba(240,200,80,0.2)';
  ctx.beginPath(); ctx.arc(fp(rx+10*s), fp(ry-20*s), 12*s, 0, Math.PI*2); ctx.fill();

  ctx.strokeStyle = P.outline;
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(fp(rx), fp(ry-10*s), 38*s, 0, Math.PI*2); ctx.stroke();
}

// ── Small Tree ──
function drawTree(x, y) {
  const rx = x - cam.x, ry = y - cam.y;
  ctx.fillStyle = P.treeTrunk;
  ctx.fillRect(fp(rx-5), fp(ry+10), 10, 25);
  ctx.fillStyle = P.treeLeaf1;
  ctx.beginPath(); ctx.arc(fp(rx), fp(ry), 22, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = P.treeLeaf3;
  ctx.beginPath(); ctx.arc(fp(rx-8), fp(ry-6), 14, 0, Math.PI*2); ctx.fill();
}

// ── Flowers ──
function drawFlowers(x, y, count) {
  const cols = [P.flowerR, P.flowerY, P.flowerP, '#f080a0', '#80e080'];
  for (let i = 0; i < count; i++) {
    const ox = (i*19 + i*i*3) % 40 - 20;
    const oy = (i*11) % 20 - 10;
    const rx = x + ox - cam.x, ry = y + oy - cam.y;
    ctx.fillStyle = '#5a9a50';
    ctx.fillRect(fp(rx), fp(ry+4), 2, 6);
    ctx.fillStyle = cols[i % cols.length];
    ctx.beginPath(); ctx.arc(fp(rx+1), fp(ry+2), 4, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = P.gold;
    ctx.beginPath(); ctx.arc(fp(rx+1), fp(ry+2), 2, 0, Math.PI*2); ctx.fill();
  }
}

// ── Vignette overlay (call last) ──
function drawVignette() {
  const vg = ctx.createRadialGradient(CANVAS_W/2, CANVAS_H/2, CANVAS_W*.3, CANVAS_W/2, CANVAS_H/2, CANVAS_W*.8);
  vg.addColorStop(0, 'rgba(0,0,0,0)');
  vg.addColorStop(1, 'rgba(0,0,0,0.28)');
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
}
