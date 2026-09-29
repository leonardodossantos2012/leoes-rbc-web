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

  initMenu();
  initYear();
})();
