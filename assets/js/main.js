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

  /* ---------- Eventos para o dataLayer (GTM) ---------- */
  window.dataLayer = window.dataLayer || [];

  function track(eventName, extra) {
    var data = { event: eventName, page_path: location.pathname };
    if (extra) for (var k in extra) data[k] = extra[k];
    window.dataLayer.push(data);
  }

  function initTracking() {
    document.addEventListener('click', function (e) {
      var el = e.target.closest('[data-track], a[href]');
      if (!el) return;
      var name = el.getAttribute('data-track');
      if (!name) {
        // Garante o rastreio de links adicionados sem data-track
        var href = el.getAttribute('href') || '';
        if (href.indexOf('instagram.com') !== -1) name = 'click_instagram';
        else if (href.indexOf('wa.me') !== -1 || href.indexOf('whatsapp.com') !== -1) name = 'click_whatsapp';
      }
      if (name) track(name, { link_text: (el.textContent || '').trim().slice(0, 80) });
    });
  }

  /* ---------- Copiar chave PIX ---------- */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(function () { return legacyCopy(text); });
    }
    return legacyCopy(text);
  }

  function legacyCopy(text) {
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      var ok = document.execCommand('copy');
      document.body.removeChild(ta);
      if (ok) resolve(); else reject(new Error('copy failed'));
    });
  }

  function initCopy() {
    document.querySelectorAll('[data-copy]').forEach(function (btn) {
      var source = document.querySelector(btn.getAttribute('data-copy'));
      var feedback = btn.closest('div').parentElement.querySelector('.pix__feedback');
      if (!source) return;
      btn.addEventListener('click', function () {
        copyText(source.textContent.trim()).then(function () {
          if (feedback) feedback.textContent = 'Chave PIX copiada! Agora é só colar no app do seu banco.';
        }, function () {
          if (feedback) feedback.textContent = 'Não foi possível copiar. Selecione a chave e copie manualmente.';
        });
      });
    });
  }

  /* ---------- Formulários (Formspree) ---------- */
  var MESSAGES = {
    required: 'Preencha este campo.',
    email: 'Informe um e-mail válido, por exemplo nome@email.com.',
    tel: 'Informe um telefone com DDD.'
  };

  function validateField(field) {
    var value = field.value.trim();
    var error = '';
    if (field.required && !value) error = MESSAGES.required;
    else if (value && field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) error = MESSAGES.email;
    else if (value && field.type === 'tel' && value.replace(/\D/g, '').length < 10) error = MESSAGES.tel;

    var msg = document.getElementById(field.id + '-erro');
    if (error) field.setAttribute('aria-invalid', 'true'); else field.removeAttribute('aria-invalid');
    if (msg) msg.textContent = error;
    return !error;
  }

  function initForms() {
    document.querySelectorAll('form[data-form]').forEach(function (form) {
      var status = form.querySelector('.form__status');
      var button = form.querySelector('button[type="submit"]');
      var fields = form.querySelectorAll('input:not([type="hidden"]):not([name="_gotcha"]), select, textarea');
      var attempted = false;

      function setStatus(type, text) {
        status.className = 'form__status' + (type ? ' is-' + type : '');
        status.textContent = text;
      }

      fields.forEach(function (f) {
        f.addEventListener('blur', function () { if (attempted) validateField(f); });
        f.addEventListener('input', function () {
          if (f.getAttribute('aria-invalid') === 'true') validateField(f);
        });
      });

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        attempted = true;

        var firstInvalid = null;
        fields.forEach(function (f) {
          if (!validateField(f) && !firstInvalid) firstInvalid = f;
        });
        if (firstInvalid) {
          setStatus('error', 'Confira os campos destacados e tente de novo.');
          firstInvalid.focus();
          return;
        }

        // Honeypot preenchido: provável robô. Finge sucesso sem enviar.
        var trap = form.querySelector('[name="_gotcha"]');
        if (trap && trap.value) {
          form.reset();
          setStatus('success', 'Mensagem enviada! Em breve entraremos em contato.');
          return;
        }

        if (form.action.indexOf('SEU_ID') !== -1) {
          console.warn('[RBC] Endpoint do Formspree não configurado: substitua SEU_ID no atributo action do formulário.');
          setStatus('error', 'O envio de formulários ainda não está configurado. Por favor, fale com a gente pelo WhatsApp ou Instagram.');
          return;
        }

        button.disabled = true;
        setStatus('', 'Enviando...');

        fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        }).then(function (res) {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          form.reset();
          attempted = false;
          setStatus('success', 'Mensagem enviada! Obrigado, em breve entraremos em contato.');
          track(form.getAttribute('data-form'));
        }).catch(function () {
          setStatus('error', 'Não foi possível enviar agora. Tente novamente em instantes ou fale com a gente pelo WhatsApp.');
        }).then(function () {
          button.disabled = false;
        });
      });
    });
  }

  /* ---------- Mapa do Google (carrega só após clique) ---------- */
  function initMaps() {
    document.querySelectorAll('[data-map-load]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var box = btn.closest('[data-map-src]');
        var iframe = document.createElement('iframe');
        iframe.src = box.getAttribute('data-map-src');
        iframe.title = 'Mapa com a localização do Studio Lion';
        iframe.loading = 'lazy';
        iframe.referrerPolicy = 'no-referrer-when-downgrade';
        iframe.setAttribute('allowfullscreen', '');
        box.innerHTML = '';
        box.appendChild(iframe);
        iframe.focus();
      });
    });
  }

  initMenu();
  initYear();
  initCounters();
  initVideos();
  initTracking();
  initCopy();
  initForms();
  initMaps();
})();
