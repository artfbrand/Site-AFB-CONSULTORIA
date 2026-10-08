/* Efeitos visuais da Home nas páginas internas (Bloco G1).
   Aprimoramento progressivo: sem JS, sem GSAP/ScrollTrigger (CDN fora) ou com
   prefers-reduced-motion, nada fica escondido e a página aparece completa.
   Elementos que o servico.js ou o script do hub já animam (.ds-reveal,
   .ds-intro-*) ficam de fora, para não haver animação dupla. */
(function () {
  'use strict';
  var reduz = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var temGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';

  /* ── Perguntas frequentes (<details>): abrir e fechar animados ───────── */
  function faqAnimado() {
    document.querySelectorAll('details.svc-faq-item').forEach(function (d) {
      var s = d.querySelector('summary');
      var r = d.querySelector('summary + *');
      if (!s || !r) return;
      var ocupado = false;
      s.addEventListener('click', function (e) {
        e.preventDefault();
        if (ocupado) return;
        ocupado = true;
        if (!d.open) {
          d.open = true;
          var pb = getComputedStyle(r).paddingBottom;
          gsap.fromTo(r, { height: 0, paddingBottom: 0, opacity: 0 },
            { height: 'auto', paddingBottom: pb, opacity: 1, duration: .45, ease: 'power3.out',
              clearProps: 'height,paddingBottom,opacity', onComplete: function () { ocupado = false; } });
        } else {
          gsap.to(r, { height: 0, paddingBottom: 0, opacity: 0, duration: .35, ease: 'power2.inOut',
            onComplete: function () { d.open = false; gsap.set(r, { clearProps: 'height,paddingBottom,opacity' }); ocupado = false; } });
        }
      });
    });
  }

  if (reduz || !temGsap) return;

  gsap.registerPlugin(ScrollTrigger);

  /* ── Lenis: mesma configuração da Home ───────────────────────────────── */
  if (typeof window.Lenis !== 'undefined') {
    var lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
    window.lenis = lenis;
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);

    /* âncoras na própria página (mesmo tratamento da Home) */
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var hash = link.getAttribute('href');
        var alvo = hash && hash !== '#' ? document.querySelector(hash) : null;
        if (!alvo) return;
        e.preventDefault();
        lenis.scrollTo(alvo, { duration: 1.2, offset: -132 });
      });
    });
    /* voltar ao topo do base.js passa pelo Lenis */
    var btt = document.getElementById('back-to-top');
    if (btt) btt.addEventListener('click', function (e) {
      e.stopImmediatePropagation();
      lenis.scrollTo(0, { duration: 1.2 });
    }, true);
  }

  faqAnimado();

  /* ── Aparecer ao rolar ───────────────────────────────────────────────── */
  /* fora: o que o servico.js/hub já anima e o que já foi marcado aqui */
  function livre(el) { return !el.hasAttribute('data-fx') && !el.closest('.ds-reveal, [class*="ds-intro-"], .fx-intro-5, .fx-intro-6'); }
  function lista(sel) { return Array.prototype.filter.call(document.querySelectorAll(sel), livre); }

  var grupos = [];
  /* títulos e textos de abertura das seções (valores do #problema-heading / #problema-intro) */
  grupos.push({ els: lista('.svc-section > .svc-h2, .ms-h2, .ms-risk-h2, .ms-deliverable-h2, main section .ms-kicker, main section .ms-kicker-dark'), de: { y: 28 }, dur: .82 });
  grupos.push({ els: lista('.ms-risk-lead, .ms-why-lead, .ms-scope-lead, .svc-faq-list'), de: { y: 18 }, dur: .68 });
  /* painel de passos (valores do #cf-cred-card) */
  grupos.push({ els: lista('.svc-steps, .ms-how-track, .ms-why-photo'), de: { y: 40, scale: .98 }, dur: 1.05, inicio: 'top 84%' });
  /* chamada final (valores do #ct-header) */
  grupos.push({ els: lista('.svc-final'), de: { y: 30 }, dur: .9 });
  grupos.forEach(function (g) {
    g.els.forEach(function (el) {
      el.setAttribute('data-fx', '');
      var de = Object.assign({ opacity: 0 }, g.de);
      var para = { opacity: 1, y: 0, scale: 1, duration: g.dur, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: g.inicio || 'top 88%', once: true } };
      gsap.fromTo(el, de, para);
    });
  });

  /* itens com escalonamento (valores dos [data-sol] e [data-cf] da Home) */
  function escalona(paiSel, filhoSel, de, passo, base) {
    lista(paiSel).forEach(function (pai) {
      var filhos = Array.prototype.filter.call(pai.querySelectorAll(filhoSel), livre);
      if (!filhos.length) return;
      filhos.forEach(function (f) { f.setAttribute('data-fx', ''); });
      filhos.forEach(function (f, i) {
        gsap.fromTo(f, Object.assign({ opacity: 0 }, de),
          { opacity: 1, y: 0, scale: 1, duration: .78, ease: 'power3.out', delay: (base || 0) + i * passo,
            scrollTrigger: { trigger: pai, start: 'top 88%', once: true } });
      });
    });
  }
  escalona('.svc-list:not(.fx-cards)', ':scope > li', { y: 18 }, .09);
  escalona('.svc-list.fx-cards', ':scope > li', { y: 34, scale: .97 }, .09);
  escalona('.svc-steps', ':scope > li', { y: 22, scale: .97 }, .14, .25);

  document.documentElement.classList.add('fx-ready');
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
