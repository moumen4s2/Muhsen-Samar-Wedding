/* Background music.
   - Tapping the envelope starts the song; the round button (top, next to the language button)
     appears once the invitation is open and pauses / resumes it.
   - Online (http/https): the song is played through a hidden official YouTube player.
   - If YouTube can't play (page opened from a local file, blocked, offline...), music.mp3 plays instead. */
(function () {
  var USE_YOUTUBE = false;   // false = always play music.mp3 from the folder; true = try the YouTube song first
  var VIDEO_ID = 'QgaTQ5-XfMM';
  var a = document.getElementById('bgMusic');
  var b = document.getElementById('musicToggle');
  var stage = document.getElementById('stage');
  var site = document.getElementById('site');
  if (!b) return;

  var yt = null, ytReady = false, ytFailed = !USE_YOUTUBE || location.protocol === 'file:' || !/^https?:$/.test(location.protocol);
  var want = false, started = false, watchdog = null;

  /* show the button only after the invitation has opened */
  var overlay = document.getElementById('envelope');
  function syncVisible() {
    var open = (site && site.getAttribute('aria-hidden') === 'false') ||
               (overlay && overlay.classList.contains('is-hidden'));
    document.body.classList.toggle('site-open', !!open);
  }
  if (site) new MutationObserver(syncVisible).observe(site, { attributes: true, attributeFilter: ['aria-hidden'] });
  if (overlay) new MutationObserver(syncVisible).observe(overlay, { attributes: true, attributeFilter: ['class'] });
  syncVisible();

  function ytState() { try { return yt.getPlayerState(); } catch (e) { return -1; } }
  function playing() {
    if (!ytFailed && ytReady) { var s = ytState(); return s === 1 || s === 3; }
    if (!ytFailed && want) return true;               // YouTube still loading
    return !!(a && !a.paused);
  }
  function ui() {
    var on = playing();
    b.classList.toggle('is-playing', on);
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
  }
  function playLocal() {
    if (!a) return;
    a.muted = false; a.volume = 0.5;
    var p = a.play(); if (p && p.catch) p.catch(function () {});
    setTimeout(ui, 150);
  }
  function fallback() {
    ytFailed = true;
    if (want) playLocal();
    ui();
  }
  function play() {
    want = true;
    if (ytFailed) { playLocal(); return; }
    if (ytReady) {
      try { yt.playVideo(); } catch (e) { fallback(); return; }
    } else if (a) {
      /* YouTube not ready yet: "unlock" the audio element inside this tap so it can be used as a fallback */
      a.volume = 0;
      var p = a.play();
      if (p && p.then) p.then(function () { a.pause(); a.currentTime = 0; }).catch(function () {});
    }
    clearTimeout(watchdog);
    watchdog = setTimeout(function () {
      var s = ytState();
      if (want && s !== 1 && s !== 3) fallback();
    }, 4000);
    setTimeout(ui, 150);
  }
  function pause() {
    want = false;
    clearTimeout(watchdog);
    if (ytReady && !ytFailed) { try { yt.pauseVideo(); } catch (e) {} }
    if (a) a.pause();
    setTimeout(ui, 150);
  }

  if (!ytFailed) {
    window.onYouTubeIframeAPIReady = function () {
      yt = new YT.Player('ytPlayer', {
        videoId: VIDEO_ID, width: 200, height: 200,
        playerVars: { playsinline: 1, controls: 0, disablekb: 1, fs: 0, rel: 0, modestbranding: 1, loop: 1, playlist: VIDEO_ID },
        events: {
          onReady: function () { ytReady = true; try { yt.setVolume(60); } catch (e) {} if (want) { try { yt.playVideo(); } catch (e) {} } ui(); },
          onStateChange: function (e) { if (e.data === 1) clearTimeout(watchdog); ui(); },
          onError: fallback
        }
      });
    };
    var s = document.createElement('script');
    s.src = 'https://www.youtube.com/iframe_api';
    s.onerror = fallback;
    document.head.appendChild(s);
  }

  function first() { if (!started) { started = true; play(); } }
  if (stage) {
    stage.addEventListener('click', first);
    stage.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') first(); });
  }
  b.addEventListener('click', function () { started = true; if (playing()) pause(); else play(); });
  if (a) { a.addEventListener('play', ui); a.addEventListener('pause', ui); }
  ui();
})();

/* page decoration + automatic scroll (kept in their own files) */
(function () {
  var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'scenery.css?v=4'; document.head.appendChild(l);
  var s = document.createElement('script'); s.src = 'scenery.js?v=3'; document.body.appendChild(s);
})();
