/* Leões RBC | Consentimento de cookies (LGPD) + Google Tag Manager com Consent Mode v2
   O GTM só é carregado depois que a pessoa aceita os cookies. */
(function () {
  'use strict';

  var GTM_ID = 'GTM-XXXXXXX'; // PLACEHOLDER: ID do contêiner do Google Tag Manager
  var STORAGE_KEY = 'rbc_consent_v1';

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  // Padrão: tudo negado até a pessoa escolher
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500
  });

  // Caminho base do site, calculado a partir deste script (funciona em /projetos/ e no 404)
  var scriptSrc = document.currentScript ? document.currentScript.src : '';
  var BASE = scriptSrc ? scriptSrc.replace(/assets\/js\/consent\.js.*$/, '') : '/';

  function readChoice() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function saveChoice(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) { /* navegação privada */ }
  }

  var gtmLoaded = false;
  function loadGTM() {
    if (gtmLoaded) return;
    if (/X{4,}/.test(GTM_ID)) {
      console.info('[RBC] GTM não carregado: substitua GTM-XXXXXXX em assets/js/consent.js.');
      return;
    }
    gtmLoaded = true;
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(GTM_ID);
    document.head.appendChild(s);
  }

  function applyChoice(value) {
    var state = value === 'granted' ? 'granted' : 'denied';
    gtag('consent', 'update', {
      ad_storage: state,
      ad_user_data: state,
      ad_personalization: state,
      analytics_storage: state
    });
    if (state === 'granted') loadGTM();
  }

  /* ---------- Banner ---------- */
  var banner = null;
  var returnFocus = null;

  function buildBanner() {
    banner = document.createElement('section');
    banner.className = 'consent';
    banner.setAttribute('aria-labelledby', 'consent-titulo');
    banner.hidden = true;
    banner.innerHTML =
      '<h2 id="consent-titulo" class="consent__title">Cookies e privacidade</h2>' +
      '<p>Usamos cookies para medir as visitas e melhorar nossas campanhas. Eles só são ativados se você aceitar. ' +
      'Saiba mais na <a href="' + BASE + 'privacidade.html">Política de privacidade</a>.</p>' +
      '<div class="btn-row">' +
      '<button type="button" class="btn btn--outline" data-consent="denied">Recusar</button>' +
      '<button type="button" class="btn btn--primary" data-consent="granted">Aceitar cookies</button>' +
      '</div>';
    document.body.appendChild(banner);

    banner.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-consent]');
      if (!btn) return;
      var value = btn.getAttribute('data-consent');
      saveChoice(value);
      applyChoice(value);
      hideBanner();
    });

    banner.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && returnFocus) hideBanner();
    });
  }

  function showBanner(focus) {
    if (!banner) buildBanner();
    banner.hidden = false;
    if (focus) banner.querySelector('[data-consent="granted"]').focus();
  }

  function hideBanner() {
    banner.hidden = true;
    if (returnFocus) {
      returnFocus.focus();
      returnFocus = null;
    }
  }

  function init() {
    var choice = readChoice();
    if (choice === 'granted' || choice === 'denied') applyChoice(choice);
    else showBanner(false);

    document.addEventListener('click', function (e) {
      var opener = e.target.closest('[data-consent-open]');
      if (!opener) return;
      returnFocus = opener;
      showBanner(true);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
