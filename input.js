/* ═══════════════════════════════════════
   js/input.js
   Keyboard · Touch D-Pad · Mobile actions
   ═══════════════════════════════════════ */

// ── Keyboard ──
window.addEventListener('keydown', e => {
  keys[e.key] = true;

  if ((e.key === ' ' || e.key === 'Enter') && !editorOpen) {
    handleInteract();
  }
  if (e.key === 'Escape') {
    closeDialogue();
    closeEditor();
  }
  if ((e.key === 'e' || e.key === 'E') && !dialogue.active) {
    toggleEditor();
  }

  // Prevent page scroll on arrow keys / space
  if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key)) {
    e.preventDefault();
  }
});

window.addEventListener('keyup', e => {
  keys[e.key] = false;
});

// ── Resolve movement direction from keyboard + virtual keys ──
function getMovementVector() {
  let dx = 0, dy = 0;

  if (keys['ArrowLeft']  || keys['a'] || keys['A'] || mobileKeys.left)  dx -= 1;
  if (keys['ArrowRight'] || keys['d'] || keys['D'] || mobileKeys.right) dx += 1;
  if (keys['ArrowUp']    || keys['w'] || keys['W'] || mobileKeys.up)    dy -= 1;
  if (keys['ArrowDown']  || keys['s'] || keys['S'] || mobileKeys.down)  dy += 1;

  // Normalize diagonal
  if (dx !== 0 && dy !== 0) { dx *= 0.707; dy *= 0.707; }

  return { dx, dy };
}

// ── Mobile D-Pad ──
function bindDpadButton(id, dir) {
  const btn = document.getElementById(id);
  if (!btn) return;

  const press   = () => { mobileKeys[dir] = true;  btn.classList.add('pressed'); };
  const release = () => { mobileKeys[dir] = false; btn.classList.remove('pressed'); };

  btn.addEventListener('touchstart',  e => { e.preventDefault(); press(); },   { passive: false });
  btn.addEventListener('touchend',    e => { e.preventDefault(); release(); },  { passive: false });
  btn.addEventListener('touchcancel', e => { e.preventDefault(); release(); },  { passive: false });

  // Also support mouse for testing on desktop
  btn.addEventListener('mousedown', press);
  btn.addEventListener('mouseup',   release);
  btn.addEventListener('mouseleave',release);
}

bindDpadButton('btn-up',    'up');
bindDpadButton('btn-down',  'down');
bindDpadButton('btn-left',  'left');
bindDpadButton('btn-right', 'right');

// ── Mobile action buttons ──
document.getElementById('btn-talk')?.addEventListener('click', handleInteract);
document.getElementById('btn-editor-mobile')?.addEventListener('click', () => {
  if (!dialogue.active) toggleEditor();
});

// ── Tap on dialogue overlay to advance ──
document.getElementById('dialogue-overlay')?.addEventListener('click', () => {
  if (dialogue.active) handleInteract();
});

// ── Tap on editor button ──
document.getElementById('editor-btn')?.addEventListener('click', toggleEditor);
document.getElementById('ep-close')?.addEventListener('click', closeEditor);

// ── Editor tab switching ──
document.querySelectorAll('.ep-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.ep-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeTab = btn.dataset.tab;
    buildEditor();
  });
});
