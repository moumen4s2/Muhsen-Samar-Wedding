/* 1) couple photos become the background: one photo behind the countdown,
      a collage behind the schedule
   2) once the invitation is open the page scrolls down slowly by itself
      (any touch / wheel / key press stops it) */
(function () {
  /* countdown: ONE photo of the couple (short, stays behind the timer only)
     schedule : a collage of several photos, like the old gallery */
  var COUNT_PHOTO = 'photo-01.jpg';
  var COLLAGE = [
    ['photo-04.jpg', 'wide'],
    ['photo-02.jpg', ''], ['photo-03.jpg', ''],
    ['photo-05.jpg', ''], ['photo-06.jpg', ''],
    ['photo-07.jpg', 'wide'],
    ['photo-08.jpg', ''], ['photo-09.jpg', '']
  ];

  /* ---------- backdrops ---------- */
  var count = document.querySelector('.countdown');
  var sched = document.querySelector('.schedule');

  function wrapWith(section, cls, bg) {
    var wrap = document.createElement('div');
    wrap.className = 'photo-backdrop ' + cls;
    section.parentNode.insertBefore(wrap, section);
    wrap.appendChild(bg);
    wrap.appendChild(section);
  }

  if (count && count.parentNode) {
    var bg1 = document.createElement('div');
    bg1.className = 'pb-bg pb-single';
    bg1.setAttribute('aria-hidden', 'true');
    var im1 = document.createElement('img');
    im1.src = COUNT_PHOTO;
    im1.alt = '';
    bg1.appendChild(im1);
    wrapWith(count, 'pb-count', bg1);
  }

  if (sched && sched.parentNode) {
    var bg2 = document.createElement('div');
    bg2.className = 'pb-bg pb-collage';
    bg2.setAttribute('aria-hidden', 'true');
    COLLAGE.forEach(function (c) {
      var im = document.createElement('img');
      im.src = c[0];
      im.alt = '';
      if (c[1]) im.className = c[1];
      bg2.appendChild(im);
    });
    wrapWith(sched, 'pb-schedule', bg2);
  }

  /* ---------- automatic scroll ---------- */
  var SPEED = 55;            // pixels per second
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var started = false, stopped = false, pos = 0, last = 0;
  var dlg = document.getElementById('rsvpDialog');

  function stop() { stopped = true; }
  ['wheel', 'touchstart', 'mousedown', 'keydown', 'pointerdown'].forEach(function (ev) {
    window.addEventListener(ev, function (e) { if (started) stop(); }, { passive: true, capture: true });
  });

  function step(t) {
    if (stopped) return;
    if (!last) last = t;
    var dt = Math.min(64, t - last); last = t;
    if (dlg && dlg.open) { stop(); return; }
    pos += SPEED * dt / 1000;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (pos >= max) { window.scrollTo({ top: max, behavior: 'instant' }); return; }
    window.scrollTo({ top: pos, behavior: 'instant' });
    requestAnimationFrame(step);
  }
  /* The scroll starts AFTER_OPEN ms after the envelope has opened and the hero picture is showing
     (the moment script.js reveals the site). Replay resets everything, so it works again next time. */
  var AFTER_OPEN = 1000;
  var startTimer = null;
  function launch() {
    if (startTimer) clearTimeout(startTimer);
    startTimer = setTimeout(function () {
      startTimer = null;
      if (stopped) return;
      pos = window.pageYOffset || 0;
      last = 0;
      requestAnimationFrame(step);
    }, AFTER_OPEN);
  }
  function begin() {
    if (started || reduce) return;
    started = true;
    stopped = false;
    launch();
  }
  function reset() {           // the envelope is closed again (Replay)
    if (startTimer) { clearTimeout(startTimer); startTimer = null; }
    started = false;
    stopped = true;            // cancels a scroll loop that may still be running
    pos = 0;
    last = 0;
  }

  var site = document.getElementById('site');
  var overlay = document.getElementById('envelope');
  function check() {
    if (site && site.getAttribute('aria-hidden') === 'true' && overlay && !overlay.classList.contains('is-hidden')) { reset(); return; }
    if ((site && site.getAttribute('aria-hidden') === 'false') ||
        (overlay && overlay.classList.contains('is-hidden'))) begin();
  }
  if (site) new MutationObserver(check).observe(site, { attributes: true, attributeFilter: ['aria-hidden'] });
  if (overlay) new MutationObserver(check).observe(overlay, { attributes: true, attributeFilter: ['class'] });
  check();
})();
