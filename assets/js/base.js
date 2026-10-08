/* Base compartilhada do site AFB: menu, submenu mobile e botão voltar ao topo */
(function () {
  "use strict";

  var hamburger = document.getElementById('nav-hamburger');
  var mobileMenu = document.getElementById('nav-mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    });
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      });
    });
  }

  var svcTrigger = document.getElementById('nav-servicos-trigger');
  var svcDropdown = document.getElementById('nav-servicos-dropdown');
  var svcItem = svcTrigger ? svcTrigger.closest('.nav-item-dropdown') : null;
  if (svcTrigger && svcDropdown && svcItem) {
    var svcCloseTimer;
    var openSvc = function () {
      clearTimeout(svcCloseTimer);
      svcDropdown.classList.add('open');
      svcTrigger.setAttribute('aria-expanded', 'true');
    };
    var closeSvc = function (returnFocus) {
      svcDropdown.classList.remove('open');
      svcTrigger.setAttribute('aria-expanded', 'false');
      if (returnFocus) svcTrigger.focus();
    };
    svcItem.addEventListener('mouseenter', openSvc);
    svcItem.addEventListener('mouseleave', function () {
      svcCloseTimer = setTimeout(function () { closeSvc(false); }, 150);
    });
    svcTrigger.addEventListener('focus', openSvc);
    svcItem.addEventListener('focusout', function (e) {
      if (!svcItem.contains(e.relatedTarget)) closeSvc(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && svcDropdown.classList.contains('open')) closeSvc(true);
    });
    document.addEventListener('click', function (e) {
      if (!svcItem.contains(e.target)) closeSvc(false);
    });
  }

  var svcMobileToggle = document.getElementById('nav-mobile-servicos-toggle');
  var svcMobilePanel = document.getElementById('nav-mobile-servicos-panel');
  if (svcMobileToggle && svcMobilePanel) {
    svcMobileToggle.addEventListener('click', function () {
      var isOpen = svcMobilePanel.classList.toggle('open');
      svcMobileToggle.setAttribute('aria-expanded', String(isOpen));
      svcMobilePanel.setAttribute('aria-hidden', String(!isOpen));
    });
  }

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
