/* ═══════════════════════════════════════
   js/editor.js
   Character editor — open/close, build UI,
   live preview updates.
   ═══════════════════════════════════════ */

// ── Open / Close / Toggle ──
function toggleEditor() { editorOpen ? closeEditor() : openEditor(); }

function openEditor() {
  if (dialogue.active) return;
  editorOpen = true;
  const panel = document.getElementById('editor-panel');
  panel.classList.remove('closing');
  panel.classList.add('open');
  buildEditor();
}

function closeEditor() {
  if (!editorOpen) return;
  editorOpen = false;
  const panel = document.getElementById('editor-panel');
  panel.classList.add('closing');
  setTimeout(() => panel.classList.remove('open', 'closing'), 200);
}

// ── Build editor contents ──
function buildEditor() {
  const body    = document.getElementById('ep-body');
  const npcSub  = document.getElementById('npc-subtabs');
  body.innerHTML = '';

  if (activeTab === 'player') {
    npcSub.style.display = 'none';
    buildPlayerEditor(body);
  } else {
    npcSub.style.display = 'flex';
    buildNpcSubtabs(npcSub);
    buildNpcEditor(body);
  }
  updatePreview();
}

// ── NPC sub-tabs row ──
function buildNpcSubtabs(container) {
  container.innerHTML = '';
  NPCS.forEach(npc => {
    const btn = document.createElement('button');
    btn.className = 'ep-npc-tab' + (npc.id === activeNpcId ? ' active' : '');
    btn.textContent = npc.name;
    btn.addEventListener('click', () => { activeNpcId = npc.id; buildEditor(); });
    container.appendChild(btn);
  });
}

// ── Player editor fields ──
function buildPlayerEditor(body) {
  addSection(body, 'NAME', [
    makeTextRow('Display name', player.displayName || 'YOU', v => { player.displayName = v; }),
  ]);
  addSection(body, 'BODY COLOR',  [makeSwatches(BODY_COLORS,   player.color,       v => { player.color       = v; updatePreview(); })]);
  addSection(body, 'SKIN TONE',   [makeSwatches(SKIN_COLORS,   player.skinColor,   v => { player.skinColor   = v; updatePreview(); })]);
  addSection(body, 'HAIR COLOR',  [makeSwatches(HAIR_COLORS,   player.hairColor,   v => { player.hairColor   = v; updatePreview(); })]);
  addSection(body, 'SCARF COLOR', [makeSwatches(SCARF_COLORS,  player.scarfColor,  v => { player.scarfColor  = v; updatePreview(); })]);
  addSection(body, 'PANTS COLOR', [makeSwatches(ACCENT_COLORS, player.accentColor, v => { player.accentColor = v; updatePreview(); })]);

  body.appendChild(makeApplyBtn('✓ APPLY PLAYER', () => showNotif('Player updated! ✨')));
}

// ── NPC editor fields ──
function buildNpcEditor(body) {
  const npc = NPCS.find(n => n.id === activeNpcId);
  if (!npc) return;

  addSection(body, 'NAME',  [makeTextRow('Display name', npc.name,  v => { npc.name  = v.toUpperCase(); updatePreview(); })]);
  addSection(body, 'TITLE', [makeTextRow('Role / title', npc.title, v => { npc.title = v; })]);
  addSection(body, 'ANIMAL TYPE', [
    makeSelectRow('Animal', ANIMAL_TYPES, npc.animal, v => { npc.animal = v; updatePreview(); }),
  ]);
  addSection(body, 'BODY COLOR',   [makeSwatches(BODY_COLORS,   npc.color,            v => { npc.color       = v; updatePreview(); })]);
  addSection(body, 'ACCENT COLOR', [makeSwatches(ACCENT_COLORS, npc.accentColor,      v => { npc.accentColor = v; updatePreview(); })]);
  addSection(body, 'SCARF COLOR',  [makeSwatches(SCARF_COLORS,  npc.scarfColor||'#e05050', v => { npc.scarfColor = v; updatePreview(); })]);

  body.appendChild(makeApplyBtn(`✓ APPLY ${npc.name}`, () => showNotif(`${npc.name} updated! ✨`)));
}

// ── Preview canvas ──
function updatePreview() {
  const pc   = document.getElementById('preview-canvas');
  const pctx = pc.getContext('2d');
  pctx.imageSmoothingEnabled = false;
  pctx.clearRect(0, 0, 80, 100);

  if (activeTab === 'player') {
    drawPlayerSprite(pctx, 40, 62, 2.0);
  } else {
    const npc = NPCS.find(n => n.id === activeNpcId);
    if (npc) drawNpcSprite(pctx, npc, 40, 62, 2.0);
  }
}

// ════════════════════════════
// UI builder helpers
// ════════════════════════════

function addSection(parent, label, children) {
  const sec = document.createElement('div');
  sec.className = 'ep-section';
  const lbl = document.createElement('div');
  lbl.className = 'ep-section-label';
  lbl.textContent = label;
  sec.appendChild(lbl);
  children.forEach(c => sec.appendChild(c));
  parent.appendChild(sec);
}

function makeSwatches(colors, current, onChange) {
  const grid = document.createElement('div');
  grid.className = 'color-grid';
  colors.forEach(c => {
    const sw = document.createElement('div');
    sw.className = 'color-swatch' + (c === current ? ' selected' : '');
    sw.style.background = c;
    sw.title = c;
    sw.addEventListener('click', () => {
      grid.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
      sw.classList.add('selected');
      onChange(c);
    });
    grid.appendChild(sw);
  });
  return grid;
}

function makeTextRow(label, value, onChange) {
  const row = document.createElement('div');
  row.className = 'ep-row';
  const lbl = document.createElement('label');
  lbl.textContent = label;
  const inp = document.createElement('input');
  inp.className = 'ep-input';
  inp.value = value;
  inp.maxLength = 18;
  inp.style.flex = '1';
  inp.addEventListener('input', () => onChange(inp.value));
  row.appendChild(lbl);
  row.appendChild(inp);
  return row;
}

function makeSelectRow(label, options, current, onChange) {
  const row = document.createElement('div');
  row.className = 'ep-row';
  const lbl = document.createElement('label');
  lbl.textContent = label;
  const sel = document.createElement('select');
  sel.className = 'ep-select';
  sel.style.flex = '1';
  options.forEach(o => {
    const opt = document.createElement('option');
    opt.value = o; opt.textContent = o;
    if (o === current) opt.selected = true;
    sel.appendChild(opt);
  });
  sel.addEventListener('change', () => onChange(sel.value));
  row.appendChild(lbl);
  row.appendChild(sel);
  return row;
}

function makeApplyBtn(label, onClick) {
  const btn = document.createElement('button');
  btn.className = 'ep-apply';
  btn.textContent = label;
  btn.addEventListener('click', onClick);
  return btn;
}
