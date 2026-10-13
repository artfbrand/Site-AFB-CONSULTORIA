/* Base compartilhada do site AFB: menu, submenu mobile e botão voltar ao topo */
(function () {
  "use strict";

  var root = document.documentElement;
  var hamburger = document.getElementById('nav-hamburger');
  var mobileMenu = document.getElementById('nav-mobile-menu');
  var svcTrigger = document.getElementById('nav-servicos-trigger');
  var svcDropdown = document.getElementById('nav-servicos-dropdown');
  var svcItem = svcTrigger ? svcTrigger.closest('.nav-item-dropdown') : null;

  // Com um menu aberto, a barra fica acima do banner de cookies e dos botões flutuantes.
  var syncMenuState = function () {
    var aberto = (mobileMenu && mobileMenu.classList.contains('open')) || (svcDropdown && svcDropdown.classList.contains('open'));
    root.classList.toggle('afb-menu-aberto', !!aberto);
  };

  if (hamburger && mobileMenu) {
    var setMobile = function (isOpen, returnFocus) {
      hamburger.classList.toggle('open', isOpen);
      mobileMenu.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      mobileMenu.setAttribute('aria-hidden', String(!isOpen));
      syncMenuState();
      if (returnFocus) hamburger.focus();
    };
    hamburger.addEventListener('click', function () {
      setMobile(!mobileMenu.classList.contains('open'), false);
    });
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setMobile(false, false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) setMobile(false, true);
    });
    document.addEventListener('click', function (e) {
      var nav = hamburger.closest('.nav');
      if (mobileMenu.classList.contains('open') && nav && !nav.contains(e.target)) setMobile(false, false);
    });

    // Garante o menu fechado ao passar para o desktop (girar a tela/redimensionar) e ao voltar pelo histórico.
    var desktopMq = window.matchMedia('(min-width: 1025px)');
    var closeOnDesktop = function () {
      if (desktopMq.matches && mobileMenu.classList.contains('open')) setMobile(false, false);
    };
    if (desktopMq.addEventListener) desktopMq.addEventListener('change', closeOnDesktop);
    else if (desktopMq.addListener) desktopMq.addListener(closeOnDesktop);
    window.addEventListener('pageshow', function () {
      if (mobileMenu.classList.contains('open')) setMobile(false, false);
    });

    // Acordeão: "Serviços" e, dentro dele, um grupo aberto por vez.
    var setPanel = function (toggle, isOpen) {
      var panel = document.getElementById(toggle.getAttribute('aria-controls'));
      toggle.setAttribute('aria-expanded', String(isOpen));
      if (panel) panel.classList.toggle('open', isOpen);
    };
    mobileMenu.querySelectorAll('.nav-mobile-toggle').forEach(function (toggle) {
      toggle.addEventListener('click', function () {
        var isOpen = toggle.getAttribute('aria-expanded') !== 'true';
        var group = toggle.closest('.nav-mobile-group');
        if (isOpen && group) {
          group.parentNode.querySelectorAll('.nav-mobile-group > .nav-mobile-toggle').forEach(function (other) {
            if (other !== toggle) setPanel(other, false);
          });
        }
        setPanel(toggle, isOpen);
      });
    });
  }

  if (svcTrigger && svcDropdown && svcItem) {
    var svcCloseTimer;
    var svcPinned = false;
    // Centraliza o painel sob "Serviços" sem deixar que saia da tela.
    var placeSvc = function () {
      var vw = root.clientWidth;
      var t = svcTrigger.getBoundingClientRect();
      var w = svcDropdown.offsetWidth;
      var desired = t.left + t.width / 2 - w / 2;
      // Se não couber centralizado, alinha ao início do conteúdo da barra (onde está "Serviços").
      var inner = svcItem.closest('.nav-inner');
      var minLeft = inner ? Math.max(16, inner.getBoundingClientRect().left + parseFloat(getComputedStyle(inner).paddingLeft) - 12) : 16;
      var x = Math.max(16, Math.min(vw - 16 - w, Math.max(minLeft, desired)));
      svcDropdown.style.setProperty('--mega-x', Math.round(x - desired) + 'px');
      // Fora disso a roda do mouse sobre o painel rola a página normalmente.
      if (svcDropdown.scrollHeight > svcDropdown.clientHeight + 1) svcDropdown.setAttribute('data-lenis-prevent', '');
      else svcDropdown.removeAttribute('data-lenis-prevent');
    };
    var openSvc = function () {
      clearTimeout(svcCloseTimer);
      placeSvc();
      svcDropdown.classList.add('open');
      svcTrigger.setAttribute('aria-expanded', 'true');
      syncMenuState();
    };
    var closeSvc = function (returnFocus) {
      clearTimeout(svcCloseTimer);
      svcPinned = false;
      svcDropdown.classList.remove('open');
      svcTrigger.setAttribute('aria-expanded', 'false');
      syncMenuState();
      if (returnFocus) svcTrigger.focus();
    };
    svcTrigger.addEventListener('click', function () {
      if (!svcDropdown.classList.contains('open')) { openSvc(); svcPinned = true; }
      else if (!svcPinned) svcPinned = true;
      else closeSvc(false);
    });
    svcItem.addEventListener('mouseenter', function () {
      if (window.matchMedia('(hover: hover)').matches) openSvc();
    });
    svcItem.addEventListener('mouseleave', function () {
      if (!svcPinned) svcCloseTimer = setTimeout(function () { closeSvc(false); }, 150);
    });
    svcItem.addEventListener('focusout', function (e) {
      if (e.relatedTarget && !svcItem.contains(e.relatedTarget)) closeSvc(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && svcDropdown.classList.contains('open')) closeSvc(true);
    });
    document.addEventListener('click', function (e) {
      if (svcDropdown.classList.contains('open') && !svcItem.contains(e.target)) closeSvc(false);
    });
    window.addEventListener('resize', function () {
      if (svcDropdown.classList.contains('open')) placeSvc();
    });
  }

  // GA4: cliques em links para o Diagnóstico 360° (mesmo evento da Home)
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href]') : null;
    if (!a || typeof window.gtag !== 'function') return;
    var h = a.getAttribute('href') || '';
    if (h === '/diagnostico' || h.indexOf('/diagnostico?') === 0) {
      window.gtag('event', 'clique_diagnostico', { link_url: a.href, pagina: location.pathname });
    }
  }, true);

  var btt = document.getElementById('back-to-top');
  if (btt) {
    window.addEventListener('scroll', function () {
      btt.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    btt.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
