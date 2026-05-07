/* ═══════════════════════════════════════
   js/config.js
   World constants · NPC definitions · Color palette
   Edit this file to change map size, add NPCs, tweak buildings, etc.
   ═══════════════════════════════════════ */

// ── World dimensions ──
const WORLD_W = 800;
const WORLD_H = 640;
const CANVAS_W = 800;
const CANVAS_H = 480;

// ── Player defaults ──
const PLAYER_DEFAULTS = {
  x: 380, y: 300,
  speed: 3,
  dir: 'down',
  moving: false,
  color:       '#7090e0',
  accentColor: '#4060c0',
  hairColor:   '#3a2a1a',
  skinColor:   '#f0d0b0',
  scarfColor:  '#e05050',
  displayName: 'YOU',
};

// ── NPC definitions ──
// To add a new NPC: copy one entry, change id/name/title/x/y/color/animal/lore
const NPC_DATA = [
  {
    id: 'rosie', name: 'ROSIE', title: 'Town Baker',
    x: 260, y: 200,
    color: '#e8a0a0', accentColor: '#c06060', scarfColor: '#60a0e0',
    animal: 'rabbit',
    lore: [
      "Ah, a visitor! Welcome to Maplewood! I'm Rosie — I've run this bakery since my grandmother passed her apron to me.",
      "This town was founded by seven animal families who came from the Great Oak Forest, oh... three hundred years ago, they say.",
      "Every morning I bake acorn bread. The secret? A pinch of clover honey from Mr. Finn's hives. Don't tell anyone!",
      "Legend says the old Maple tree is magical. Nap beneath it on the first day of autumn, and you'll dream of your greatest wish.",
      "Maplewood has never had a bad harvest. Some say it's the tree. Others say it's the love the townsfolk put into the soil. I believe both.",
    ],
  },
  {
    id: 'finn', name: 'FINN', title: 'The Beekeeper',
    x: 590, y: 290,
    color: '#f0d080', accentColor: '#b89030', scarfColor: '#e05050',
    animal: 'fox',
    lore: [
      "Oh! You startled me. I was just listening to my bees. They have a lot to say if you know how to hear them.",
      "My family has kept bees in Maplewood for five generations. These aren't ordinary bees — they only make honey from flowers within the town's border.",
      "Old stories say Maplewood sits on a ley line — a vein of ancient magic. The flowers here glow faintly at midnight.",
      "I once followed a bee three miles into the Whispering Woods. I found ruins there. Old stone circles. I didn't stay long.",
      "If you need to find your way in the dark, listen for bees. They always fly toward warmth and sweetness. Not bad life advice, either.",
    ],
  },
  {
    id: 'momo', name: 'MOMO', title: 'The Librarian',
    x: 160, y: 330,
    color: '#a0c0e8', accentColor: '#6090b8', scarfColor: '#c060d0',
    animal: 'owl',
    lore: [
      "Hm? Oh, don't mind the dust. The Library holds every story ever told in this town — even the ones people try to forget.",
      "The first book written here was by Elder Hazel, a hedgehog of great wisdom. It was simply titled: 'The Town That Chose Kindness.'",
      "According to my records, a visitor once claimed our town didn't exist on any map. She stayed forever after.",
      "There's a restricted section — books on the Hollownight, a darkness that visited long ago. It was repelled by song. Literally.",
      "My favorite book? A journal by a mouse who spent one year counting every star visible from Maplewood. 12,447.",
    ],
  },
  {
    id: 'pip', name: 'PIP', title: 'Young Adventurer',
    x: 440, y: 380,
    color: '#90d090', accentColor: '#50a050', scarfColor: '#f0c060',
    animal: 'squirrel',
    lore: [
      "Hey hey hey! You're new here! I'm Pip! I'm gonna explore every inch of Maplewood AND the forest someday. Today I found a cool rock!",
      "Did you know there's a secret tunnel under the old café? The floor sounds hollow if you stomp just right. Rosie says I'm imagining things.",
      "My grandpa says there used to be a town called Ferndale next to Maplewood. It disappeared one foggy morning. Nobody knows where it went.",
      "I've been mapping the whole town! Want to see? Wait, I lost the map. It's okay, it's all up here. *taps head* Well, mostly.",
      "The oldest resident is Old Barnaby the tortoise. He's 212 years old and lives by the eastern pond. When he speaks, you should listen.",
    ],
  },
];

// ── Building definitions ──
// Add buildings here and they'll render automatically.
const BUILDINGS = [
  { x: 80,  y: 110, w: 160, h: 130, wall: '#f0e0c0', roof: '#e07030', label: 'BAKERY',  accent: '#f0a060' },
  { x: 40,  y: 60,  w: 120, h: 110, wall: '#d8d0e8', roof: '#5060a0', label: 'LIBRARY', accent: '#8090c0' },
  { x: 460, y: 80,  w: 140, h: 120, wall: '#e8e0d0', roof: '#40806a', label: 'CAFÉ',    accent: '#60c0a0' },
  { x: 620, y: 130, w: 130, h: 110, wall: '#f0e8c0', roof: '#b07020', label: 'HONEY',   accent: '#f0c040' },
];

// Collision boxes for buildings (can differ slightly from visual)
const BUILDING_COLLIDERS = [
  { x: 80,  y: 130, w: 160, h: 130 },
  { x: 40,  y: 80,  w: 120, h: 110 },
  { x: 460, y: 100, w: 140, h: 120 },
  { x: 620, y: 150, w: 130, h: 110 },
];

// ── Canvas color palette ──
const P = {
  skyTop:     '#b8e4f9',
  skyBot:     '#ddf0ff',
  grassMid:   '#6aaa5e',
  grassLight: '#7cc46e',
  pathTan:    '#c8a878',
  pathEdge:   '#b8986a',
  treeTrunk:  '#6b4c2a',
  treeLeaf1:  '#3a7a4a',
  treeLeaf2:  '#4a9a5a',
  treeLeaf3:  '#5ab06a',
  wallCream:  '#f0e0c0',
  windowB:    '#88ccee',
  doorBrown:  '#8b5c2a',
  gold:       '#f0c060',
  outline:    '#2a1a0a',
  water:      '#6ab0d8',
  waterShim:  '#8ad0f0',
  flowerR:    '#e85050',
  flowerY:    '#f0d030',
  flowerP:    '#c060d0',
};

// ── Loading screen messages ──
const LOADING_MESSAGES = [
  'gathering acorns...',
  'brewing chamomile tea...',
  'watering the flowers...',
  'sweeping the café...',
  'waking the animals...',
  'polishing the lanterns...',
];

// ── NPC interaction distance (pixels) ──
const TALK_RADIUS = 55;
