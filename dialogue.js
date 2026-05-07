/* ═══════════════════════════════════════
   js/dialogue.js
   Dialogue system — open, advance, close,
   render portrait + typewriter text.
   ═══════════════════════════════════════ */

let typewriterInterval = null;

function handleInteract() {
  if (dialogue.active) {
    nextPage();
    return;
  }
  // Find nearest NPC within talk radius
  for (const npc of NPCS) {
    if (Math.abs(player.x - npc.x) < TALK_RADIUS &&
        Math.abs(player.y - npc.y) < TALK_RADIUS) {
      openDialogue(npc);
      return;
    }
  }
}

function openDialogue(npc) {
  dialogue.active = true;
  dialogue.npc    = npc;
  dialogue.page   = 0;
  renderDialogue();
  document.getElementById('dialogue-overlay').classList.add('active');
}

function nextPage() {
  // Stop any running typewriter first
  if (typewriterInterval) { clearInterval(typewriterInterval); typewriterInterval = null; }

  dialogue.page++;
  if (dialogue.page >= dialogue.npc.lore.length) {
    closeDialogue();
    showNotif('~ • ~');
  } else {
    renderDialogue();
  }
}

function closeDialogue() {
  if (typewriterInterval) { clearInterval(typewriterInterval); typewriterInterval = null; }
  dialogue.active = false;
  dialogue.npc    = null;
  document.getElementById('dialogue-overlay').classList.remove('active');
}

function renderDialogue() {
  const npc = dialogue.npc;

  document.getElementById('npc-name').textContent     = npc.name;
  document.getElementById('npc-subtitle').textContent = npc.title;
  document.getElementById('dialogue-page').textContent = `${dialogue.page + 1} / ${npc.lore.length}`;

  // Typewriter effect
  const el   = document.getElementById('dialogue-text');
  const text = npc.lore[dialogue.page];
  el.textContent = '';
  let i = 0;
  if (typewriterInterval) clearInterval(typewriterInterval);
  typewriterInterval = setInterval(() => {
    el.textContent += text[i++];
    if (i >= text.length) { clearInterval(typewriterInterval); typewriterInterval = null; }
  }, 22);

  // Draw portrait on the small canvas
  renderPortrait(npc);
}

function renderPortrait(npc) {
  const pc   = document.getElementById('npc-portrait');
  const pctx = pc.getContext('2d');
  pctx.imageSmoothingEnabled = false;
  pctx.clearRect(0, 0, 40, 40);
  // Draw a small centered sprite
  drawNpcSprite(pctx, npc, 20, 26, 1.2);
}
