/* ═══════════════════════════════════════
   js/sprites.js
   Character sprite rendering.
   All drawNpcSprite / drawPlayerSprite /
   drawAnimalHead functions live here.
   ═══════════════════════════════════════ */

// ── Utility ──
function lighten(hex, amt) {
  const r = Math.min(255, parseInt(hex.slice(1,3), 16) + amt);
  const g = Math.min(255, parseInt(hex.slice(3,5), 16) + amt);
  const b = Math.min(255, parseInt(hex.slice(5,7), 16) + amt);
  return '#' + [r,g,b].map(v => v.toString(16).padStart(2,'0')).join('');
}

// ── NPC full body sprite ──
// tc = target canvas context  |  cx,cy = center position  |  s = scale
function drawNpcSprite(tc, npc, cx, cy, s) {
  // Shadow
  tc.fillStyle = 'rgba(0,0,0,0.18)';
  tc.beginPath();
  tc.ellipse(fp(cx), fp(cy+14*s), 10*s, 4*s, 0, 0, Math.PI*2);
  tc.fill();

  // Body
  tc.fillStyle = npc.color;
  tc.fillRect(fp(cx-7*s), fp(cy-5*s), 14*s, 18*s);
  tc.fillStyle = 'rgba(0,0,0,0.12)';
  tc.fillRect(fp(cx+4*s), fp(cy-5*s), 3*s, 18*s);

  // Scarf
  tc.fillStyle = npc.scarfColor || '#e05050';
  tc.fillRect(fp(cx-8*s), fp(cy-1*s), 16*s, 4*s);

  // Legs
  tc.fillStyle = npc.accentColor;
  tc.fillRect(fp(cx-7*s), fp(cy+13*s), 6*s, 7*s);
  tc.fillRect(fp(cx+1*s), fp(cy+13*s), 6*s, 7*s);

  // Head (delegated to animal-specific function)
  drawAnimalHead(tc, npc, cx, fp(cy - 15*s), s);
}

// ── Animal head (shared by game canvas + portrait + editor preview) ──
function drawAnimalHead(tc, npc, rx, ry, s) {
  // Base skull
  tc.fillStyle = npc.color;
  tc.beginPath();
  tc.arc(fp(rx), fp(ry), 11*s, 0, Math.PI*2);
  tc.fill();

  switch (npc.animal) {
    case 'rabbit':
      tc.fillStyle = npc.color;
      tc.fillRect(fp(rx-8*s), fp(ry-20*s), 5*s, 13*s);
      tc.fillRect(fp(rx+3*s), fp(ry-20*s), 5*s, 13*s);
      tc.fillStyle = lighten(npc.color, 60);
      tc.fillRect(fp(rx-7*s), fp(ry-19*s), 3*s, 11*s);
      tc.fillRect(fp(rx+4*s), fp(ry-19*s), 3*s, 11*s);
      break;

    case 'fox':
      tc.fillStyle = npc.color;
      [[-9,-7,-5,-18,-1,-9],[9,-7,5,-18,1,-9]].forEach(([x1,y1,x2,y2,x3,y3]) => {
        tc.beginPath();
        tc.moveTo(fp(rx+x1*s), fp(ry+y1*s));
        tc.lineTo(fp(rx+x2*s), fp(ry+y2*s));
        tc.lineTo(fp(rx+x3*s), fp(ry+y3*s));
        tc.fill();
      });
      tc.fillStyle = '#f0c080';
      tc.beginPath();
      tc.ellipse(fp(rx), fp(ry+3*s), 4*s, 3*s, 0, 0, Math.PI*2);
      tc.fill();
      break;

    case 'owl':
      // Ear tufts
      tc.fillStyle = npc.color;
      tc.fillRect(fp(rx-5*s), fp(ry-13*s), 4*s, 5*s);
      tc.fillRect(fp(rx+1*s), fp(ry-13*s), 4*s, 5*s);
      // Big eyes
      tc.fillStyle = '#f0e0c0';
      tc.beginPath();
      tc.arc(fp(rx-4*s), fp(ry), 4*s, 0, Math.PI*2);
      tc.arc(fp(rx+4*s), fp(ry), 4*s, 0, Math.PI*2);
      tc.fill();
      tc.fillStyle = '#2a2a4a';
      tc.beginPath();
      tc.arc(fp(rx-4*s), fp(ry), 2*s, 0, Math.PI*2);
      tc.arc(fp(rx+4*s), fp(ry), 2*s, 0, Math.PI*2);
      tc.fill();
      tc.fillStyle = 'white';
      tc.fillRect(fp(rx-4*s), fp(ry-s), s, s);
      tc.fillRect(fp(rx+4*s), fp(ry-s), s, s);
      return; // owl has its own eyes — skip generic below

    case 'squirrel':
      tc.fillStyle = npc.color;
      tc.beginPath();
      tc.arc(fp(rx-8*s), fp(ry-8*s), 4*s, 0, Math.PI*2);
      tc.arc(fp(rx+8*s), fp(ry-8*s), 4*s, 0, Math.PI*2);
      tc.fill();
      // Fluffy tail
      tc.fillStyle = npc.accentColor;
      tc.beginPath();
      tc.arc(fp(rx+13*s), fp(ry+8*s), 7*s, 0, Math.PI*2);
      tc.fill();
      break;

    case 'bear':
      tc.fillStyle = npc.color;
      tc.beginPath();
      tc.arc(fp(rx-8*s), fp(ry-7*s), 5*s, 0, Math.PI*2);
      tc.arc(fp(rx+8*s), fp(ry-7*s), 5*s, 0, Math.PI*2);
      tc.fill();
      tc.fillStyle = lighten(npc.color, 40);
      tc.beginPath();
      tc.ellipse(fp(rx), fp(ry+3*s), 6*s, 5*s, 0, 0, Math.PI*2);
      tc.fill();
      break;

    case 'cat':
      tc.fillStyle = npc.color;
      [[-10,-9,-7,-18,-3,-10],[10,-9,7,-18,3,-10]].forEach(([x1,y1,x2,y2,x3,y3]) => {
        tc.beginPath();
        tc.moveTo(fp(rx+x1*s), fp(ry+y1*s));
        tc.lineTo(fp(rx+x2*s), fp(ry+y2*s));
        tc.lineTo(fp(rx+x3*s), fp(ry+y3*s));
        tc.fill();
      });
      // Whiskers
      tc.strokeStyle = 'rgba(180,180,180,0.7)';
      tc.lineWidth = s * 0.8;
      tc.beginPath();
      tc.moveTo(fp(rx-12*s), fp(ry+s)); tc.lineTo(fp(rx-5*s), fp(ry+2*s));
      tc.moveTo(fp(rx+12*s), fp(ry+s)); tc.lineTo(fp(rx+5*s), fp(ry+2*s));
      tc.stroke();
      break;

    case 'dog':
      // Floppy ears
      tc.fillStyle = npc.accentColor;
      tc.beginPath();
      tc.arc(fp(rx-9*s), fp(ry-4*s), 5*s, 0, Math.PI*2);
      tc.arc(fp(rx+9*s), fp(ry-4*s), 5*s, 0, Math.PI*2);
      tc.fill();
      // Snout
      tc.fillStyle = lighten(npc.color, 30);
      tc.beginPath();
      tc.ellipse(fp(rx), fp(ry+4*s), 6*s, 5*s, 0, 0, Math.PI*2);
      tc.fill();
      break;
  }

  // Generic eyes (all animals except owl)
  tc.fillStyle = '#1a1a2e';
  tc.fillRect(fp(rx-4*s), fp(ry-2*s), 3*s, 3*s);
  tc.fillRect(fp(rx+1*s), fp(ry-2*s), 3*s, 3*s);
  tc.fillStyle = 'white';
  tc.fillRect(fp(rx-3*s), fp(ry-3*s), s, s);
  tc.fillRect(fp(rx+2*s), fp(ry-3*s), s, s);
}

// ── Player sprite ──
function drawPlayerSprite(tc, cx, cy, s) {
  // Shadow
  tc.fillStyle = 'rgba(0,0,0,0.18)';
  tc.beginPath();
  tc.ellipse(fp(cx), fp(cy+14*s), 10*s, 4*s, 0, 0, Math.PI*2);
  tc.fill();

  // Body
  tc.fillStyle = player.color;
  tc.fillRect(fp(cx-7*s), fp(cy-5*s), 14*s, 18*s);
  tc.fillStyle = 'rgba(0,0,0,0.12)';
  tc.fillRect(fp(cx+4*s), fp(cy-5*s), 3*s, 18*s);

  // Scarf
  tc.fillStyle = player.scarfColor;
  tc.fillRect(fp(cx-8*s), fp(cy-1*s), 16*s, 4*s);

  // Pants
  tc.fillStyle = player.accentColor;
  tc.fillRect(fp(cx-7*s), fp(cy+13*s), 6*s, 7*s);
  tc.fillRect(fp(cx+1*s), fp(cy+13*s), 6*s, 7*s);

  // Head (skin)
  tc.fillStyle = player.skinColor;
  tc.beginPath();
  tc.arc(fp(cx), fp(cy-12*s), 10*s, 0, Math.PI*2);
  tc.fill();

  // Hair
  tc.fillStyle = player.hairColor;
  tc.fillRect(fp(cx-10*s), fp(cy-21*s), 20*s, 8*s);
  tc.beginPath();
  tc.arc(fp(cx), fp(cy-14*s), 10*s, Math.PI, 0);
  tc.fill();

  // Eyes
  tc.fillStyle = '#1a1a2e';
  tc.fillRect(fp(cx-4*s), fp(cy-13*s), 3*s, 3*s);
  tc.fillRect(fp(cx+1*s), fp(cy-13*s), 3*s, 3*s);
  tc.fillStyle = 'white';
  tc.fillRect(fp(cx-3*s), fp(cy-14*s), s, s);
  tc.fillRect(fp(cx+2*s), fp(cy-14*s), s, s);
}

// ── Draw NPCs on game canvas ──
function drawNPCs(time) {
  for (const npc of NPCS) {
    const rx = npc.x - cam.x;
    const ry = npc.y - cam.y;
    const nearby = !dialogue.active && !editorOpen &&
                   Math.abs(player.x - npc.x) < TALK_RADIUS &&
                   Math.abs(player.y - npc.y) < TALK_RADIUS;

    // Ground shadow
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath();
    ctx.ellipse(fp(rx), fp(ry+14), 12, 5, 0, 0, Math.PI*2);
    ctx.fill();

    drawNpcSprite(ctx, npc, rx, ry + 8, 1.0);

    // "TALK" bubble
    if (nearby) {
      const by = ry - 36 + Math.sin(time * 3) * 3;
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(fp(rx-14), fp(by-14), 28, 14);
      ctx.strokeStyle = P.gold;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(fp(rx-14), fp(by-14), 28, 14);
      ctx.fillStyle = P.gold;
      ctx.font = '6px "Press Start 2P"';
      ctx.textAlign = 'center';
      ctx.fillText('TALK', fp(rx), fp(by-4));
    }

    // Name tag
    const nw = npc.name.length * 5.5 + 6;
    ctx.fillStyle = 'rgba(26,26,46,0.85)';
    ctx.fillRect(fp(rx - nw/2), fp(ry+22), nw, 10);
    ctx.fillStyle = '#ccc';
    ctx.font = '5px "Press Start 2P"';
    ctx.textAlign = 'center';
    ctx.fillText(npc.name, fp(rx), fp(ry+30));
  }
}

// ── Draw player on game canvas ──
function drawPlayerOnCanvas(time) {
  const rx = player.x - cam.x;
  const ry = player.y - cam.y;
  const bob = player.moving ? Math.sin(time * 12) * 2 : 0;
  const leg = player.moving ? Math.sin(time * 12) * 5 : 0;

  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.beginPath();
  ctx.ellipse(fp(rx), fp(ry+14), 10, 4, 0, 0, Math.PI*2);
  ctx.fill();

  // Body
  ctx.fillStyle = player.color;
  ctx.fillRect(fp(rx-8), fp(ry-6+bob), 16, 20);
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.fillRect(fp(rx+6), fp(ry-6+bob), 2, 20);

  // Scarf
  ctx.fillStyle = player.scarfColor;
  ctx.fillRect(fp(rx-9), fp(ry-4+bob), 18, 4);

  // Pants with walk animation
  ctx.fillStyle = player.accentColor;
  ctx.fillRect(fp(rx-8), fp(ry+14+bob), 7, 8+leg);
  ctx.fillRect(fp(rx+1), fp(ry+14+bob), 7, 8-leg);

  // Head
  ctx.fillStyle = player.skinColor;
  ctx.beginPath();
  ctx.arc(fp(rx), fp(ry-12+bob), 10, 0, Math.PI*2);
  ctx.fill();

  // Hair
  ctx.fillStyle = player.hairColor;
  ctx.fillRect(fp(rx-10), fp(ry-22+bob), 20, 8);
  ctx.beginPath();
  ctx.arc(fp(rx), fp(ry-14+bob), 10, Math.PI, 0);
  ctx.fill();

  // Eyes (not shown when facing away)
  if (player.dir !== 'up') {
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(fp(rx-4), fp(ry-13+bob), 3, 3);
    ctx.fillRect(fp(rx+1), fp(ry-13+bob), 3, 3);
    ctx.fillStyle = 'white';
    ctx.fillRect(fp(rx-3), fp(ry-14+bob), 1, 1);
    ctx.fillRect(fp(rx+2), fp(ry-14+bob), 1, 1);
  }
}
