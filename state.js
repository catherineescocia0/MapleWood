/* ═══════════════════════════════════════
   js/state.js
   Mutable runtime state.
   Import data from config.js — do not put
   game logic or rendering here.
   ═══════════════════════════════════════ */

// ── Canvas ──
const canvas = document.getElementById('gameCanvas');
const ctx    = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

// ── Player (live, mutable) ──
const player = Object.assign({}, PLAYER_DEFAULTS);

// ── NPCs (live, mutable copies of NPC_DATA) ──
const NPCS = NPC_DATA.map(n => Object.assign({}, n));

// ── Camera ──
const cam = { x: 0, y: 0 };

// ── Keyboard state ──
const keys = {};

// ── Mobile virtual button state ──
const mobileKeys = { up: false, down: false, left: false, right: false };

// ── UI state flags ──
let editorOpen  = false;
let activeTab   = 'player';
let activeNpcId = 'rosie';

// ── Dialogue state ──
const dialogue = {
  active: false,
  npc:    null,
  page:   0,
};
