/* ═══════════════════════════════════════
   js/loading.js
   Loading screen — animates then starts
   the game render loop.
   ═══════════════════════════════════════ */

(function startLoading() {
  const fillEl   = document.getElementById('loading-fill');
  const statusEl = document.getElementById('loading-status');
  let loadPct = 0, msgIdx = 0;

  const interval = setInterval(() => {
    loadPct += 8 + Math.random() * 10;
    fillEl.style.width = Math.min(100, loadPct) + '%';
    statusEl.textContent = LOADING_MESSAGES[msgIdx++ % LOADING_MESSAGES.length];

    if (loadPct >= 100) {
      clearInterval(interval);

      setTimeout(() => {
        const screen = document.getElementById('loading');
        screen.style.transition = 'opacity .5s';
        screen.style.opacity = 0;

        setTimeout(() => {
          screen.style.display = 'none';
          requestAnimationFrame(render);   // start main loop
          showNotif('Welcome to Maplewood! 🌿');
        }, 500);
      }, 400);
    }
  }, 120);
})();
