/* Leões RBC | Scripts principais (sem dependências) */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Menu mobile ---------- */
  function initMenu() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('menu-principal');
    if (!toggle || !nav) return;
    var label = toggle.querySelector('.sr-only');
    var desktop = window.matchMedia('(min-width: 64em)');

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('menu-open', open);
      if (label) label.textContent = open ? 'Fechar menu' : 'Abrir menu';
      if (open) {
        var first = nav.querySelector('a');
        if (first) first.focus();
      }
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' || toggle.getAttribute('aria-expanded') !== 'true') return;
      setOpen(false);
      toggle.focus();
    });

    // Mantém o foco dentro do menu aberto (Tab no último item volta ao botão)
    nav.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab' || !nav.classList.contains('is-open')) return;
      var links = nav.querySelectorAll('a');
      var last = links[links.length - 1];
      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        toggle.focus();
      }
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    desktop.addEventListener('change', function (e) {
      if (e.matches) setOpen(false);
    });
  }

  /* ---------- Ano atual no rodapé ---------- */
  function initYear() {
    var el = document.querySelector('[data-year]');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- Contadores animados ---------- */
  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length || reduceMotion || !('IntersectionObserver' in window)) return;

    function format(n) { return n.toLocaleString('pt-BR'); }

    function animate(el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var suffix = el.getAttribute('data-suffix') || '';
      var duration = 1600;
      var start = null;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = format(Math.round(target * eased)) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animate(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.6 });

    counters.forEach(function (el) {
      // O HTML já traz o valor final (sem JS); o número animado é aria-hidden e há cópia em .sr-only
      el.textContent = '0' + (el.getAttribute('data-suffix') || '');
      io.observe(el);
    });
  }

  /* ---------- Vídeo do hero: pausar/reproduzir ---------- */
  function initVideos() {
    document.querySelectorAll('video[data-bg-video]').forEach(function (video) {
      var btn = video.parentElement.parentElement.querySelector('.video-toggle');
      if (reduceMotion) video.pause();
      if (!btn) return;
      function sync() {
        var playing = !video.paused;
        btn.setAttribute('aria-pressed', String(!playing));
        btn.querySelector('span').textContent = playing ? 'Pausar vídeo' : 'Reproduzir vídeo';
      }
      btn.addEventListener('click', function () {
        if (video.paused) video.play(); else video.pause();
      });
      video.addEventListener('play', sync);
      video.addEventListener('pause', sync);
      sync();
    });
  }

  initMenu();
  initYear();
  initCounters();
  initVideos();
})();
