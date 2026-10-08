/* Banner de cookies do site AFB (LGPD): GA4 só grava cookies após "Aceitar" */
(function () {
  'use strict';
  var KEY = 'afb_cookie_consent';
  var banner = null;
  function getChoice() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function setChoice(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function updateConsent(v) {
    if (typeof window.gtag === 'function') { window.gtag('consent', 'update', { analytics_storage: v }); }
  }
  var css =
    '.afb-ck{position:fixed;left:16px;bottom:16px;max-width:380px;z-index:10000;background:#fff;border:1px solid #DCE7DF;border-radius:14px;box-shadow:0 8px 30px rgba(13,60,31,.12);padding:16px 18px;font-family:var(--font-body,Inter,system-ui,sans-serif);color:var(--forest,#0D3C1F)}' +
    '.afb-ck[hidden]{display:none}' +
    '.afb-ck p{margin:0 0 12px;font-size:13.5px;line-height:1.55;color:#2F4A3B}' +
    '.afb-ck a{color:var(--accent,#3D7F61);text-decoration:underline}' +
    '.afb-ck-btns{display:flex;gap:8px}' +
    '.afb-ck button{min-height:40px;border-radius:999px;padding:9px 18px;font:600 13px var(--font-body,Inter,system-ui,sans-serif);cursor:pointer}' +
    '.afb-ck-ok{background:var(--forest,#0D3C1F);color:#fff;border:1px solid var(--forest,#0D3C1F)}' +
    '.afb-ck-no{background:transparent;color:var(--forest,#0D3C1F);border:1px solid var(--forest,#0D3C1F)}' +
    '.afb-ck button:focus-visible{outline:2px solid var(--accent,#3D7F61);outline-offset:2px}' +
    '@media (max-width:767px){.afb-ck{left:8px;right:8px;bottom:8px;max-width:none;padding:14px}.afb-ck p{font-size:13px}.afb-ck-btns button{flex:1}' +
    'body.afb-ck-open .float-wa{bottom:calc(var(--afb-ck-h,170px) + 16px)!important}' +
    'body.afb-ck-open .back-to-top{bottom:calc(var(--afb-ck-h,170px) + 16px + 56px + 12px)!important}}' +
    '@media (min-width:1025px){.afb-ck{left:auto;right:16px}body.afb-ck-open .float-wa{bottom:calc(var(--afb-ck-h,170px) + 16px)!important}body.afb-ck-open .back-to-top{bottom:calc(var(--afb-ck-h,170px) + 16px + 56px + 12px)!important}}';
  function measure() { if (banner && !banner.hidden) { document.documentElement.style.setProperty('--afb-ck-h', banner.offsetHeight + 'px'); } }
  function hide() { banner.hidden = true; document.body.classList.remove('afb-ck-open'); }
  function build() {
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    banner = document.createElement('div');
    banner.className = 'afb-ck';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Aviso de cookies');
    banner.hidden = true;
    banner.innerHTML = '<p>Usamos cookies para medir as visitas e melhorar o site. Você pode aceitar ou recusar. Saiba mais na <a href="/privacidade">Política de Privacidade</a>.</p>' +
      '<div class="afb-ck-btns"><button type="button" class="afb-ck-ok">Aceitar</button><button type="button" class="afb-ck-no">Recusar</button></div>';
    banner.querySelector('.afb-ck-ok').addEventListener('click', function () { setChoice('granted'); updateConsent('granted'); hide(); });
    banner.querySelector('.afb-ck-no').addEventListener('click', function () { setChoice('denied'); updateConsent('denied'); hide(); });
    document.body.appendChild(banner);
    window.addEventListener('resize', measure);
  }
  function show() { if (!banner) { build(); } banner.hidden = false; document.body.classList.add('afb-ck-open'); measure(); }
  window.afbAbrirPreferenciasCookies = show;
  function init() { var c = getChoice(); if (c !== 'granted' && c !== 'denied') { show(); } }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); }
})();
