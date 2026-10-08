/* Scripts das páginas internas de serviço (animações e cards) */
  /* ── Animações: design-system3 + glass-green-effect + ai-saas ─────────
     Aplicadas por JS para não alterar o HTML: sem JS, a página continua
     inteira visível. Respeita prefers-reduced-motion. */
  (function () {
    "use strict";
    var reduz = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function marca(sel, cls) {
      if (!sel) return;
      document.querySelectorAll(sel).forEach(function (el) { el.classList.add(cls); });
    }

    /* entrada escalonada do hero */
    [['.svc-breadcrumb',1],['.svc-back',2],['.svc-detail-kicker',3],['.svc-detail-h1',4]].forEach(function (par) {
      var el = document.querySelector(par[0]);
      if (el) el.classList.add('ds-intro-' + par[1]);
    });

    /* efeitos de hover — valem mesmo com movimento reduzido (o CSS neutraliza) */
    marca('.svc-cta-btn', 'ds-sweep');
    marca(null, 'ds-card3d');
    marca(null, 'ds-glow-border');
    marca('.svc-detail-kicker', 'ds-tag');
    marca('.svc-related-list li', 'ds-listitem');
    marca(null, 'ds-step');
    marca(null, 'ds-node');

    if (!reduz) {
      marca('.svc-cta-btn', 'ds-shine');
      marca(null, 'ds-float');

      /* luzes ambientes */
      [1, 2].forEach(function (n) {
        var d = document.createElement('div');
        d.className = 'ds-ambient ds-ambient-' + n;
        d.setAttribute('aria-hidden', 'true');
        document.body.appendChild(d);
      });

      var hero = document.querySelector('.svc-detail');
      if (hero) {
        if (getComputedStyle(hero).position === 'static') hero.style.position = 'relative';
        hero.style.overflow = 'hidden';

        /* anéis concêntricos */
        [[720, 0], [540, 1.3], [380, 2.6]].forEach(function (r) {
          var d = document.createElement('div');
          d.className = 'ds-ring';
          d.setAttribute('aria-hidden', 'true');
          d.style.cssText = 'width:' + r[0] + 'px;height:' + r[0] + 'px;animation-delay:' + r[1] + 's';
          hero.appendChild(d);
        });

        /* partículas subindo */
        [[6,4,9,0],[17,3,12,2],[34,4,11,3.5],[58,3,13,1.2],[72,5,10,4.4],[88,3,14,2.8]].forEach(function (p) {
          var s = document.createElement('span');
          s.className = 'ds-particle';
          s.setAttribute('aria-hidden', 'true');
          s.style.cssText = 'left:' + p[0] + '%;bottom:8%;width:' + p[1] + 'px;height:' + p[1] + 'px;animation-duration:' + p[2] + 's;animation-delay:' + p[3] + 's';
          hero.appendChild(s);
        });
      }

      /* linha de varredura nas bandas escuras */
      [].forEach(function (sel) {
        var banda = document.querySelector(sel);
        if (!banda) return;
        if (getComputedStyle(banda).position === 'static') banda.style.position = 'relative';
        var l = document.createElement('div');
        l.className = 'ds-scan';
        l.setAttribute('aria-hidden', 'true');
        banda.appendChild(l);
      });
    }

    /* reveal no scroll */
    if (reduz || !('IntersectionObserver' in window)) return;
    document.documentElement.classList.add('ds-anim');
    var els = [];
    ['.svc-detail-desc','.svc-cta','.svc-related'].forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) { els.push(el); });
    });
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        el.style.animationDelay = (parseInt(el.dataset.dsi || 0, 10) * 70) + 'ms';
        el.classList.add('ds-in');
        io.unobserve(el);
      });
    }, { threshold: .1, rootMargin: '0px 0px -40px 0px' });

    els.forEach(function (el) {
      var irmaos = Array.prototype.filter.call(el.parentNode.children, function (c) { return c.tagName === el.tagName; });
      el.dataset.dsi = Math.min(irmaos.indexOf(el), 5);
      el.classList.add('ds-reveal');
      io.observe(el);
    });
  })();

  /* ── Cards malhados: mesmo tratamento dos cards do Método na home ─────
     Malha, orbes radiais, varredura, shimmer e alternância claro/escuro.
     Injetado por JS: o markup dos cards não é alterado. */
  (function () {
    "use strict";
    function deco(cls, extra) {
      var d = document.createElement('div');
      d.className = 'ds-mdeco ' + cls + (extra ? ' ' + extra : '');
      d.setAttribute('aria-hidden', 'true');
      return d;
    }

    [{ sel: '.svc-related-list li', padrao: ['dark','sage','dark','sage','dark','sage'], numera: false, rel: true }].forEach(function (g) {
      var cards = document.querySelectorAll(g.sel);
      cards.forEach(function (card, i) {
        var tom = g.padrao[i % g.padrao.length];
        card.classList.add('ds-mcard', 'ds-mcard-' + tom);
        if (g.rel) card.classList.add('ds-mcard-rel');

        card.insertBefore(deco('ds-mdeco-mesh'), card.firstChild);
        card.insertBefore(deco('ds-mdeco-orb', 'ds-mdeco-orb-a'), card.firstChild);
        card.insertBefore(deco('ds-mdeco-orb', 'ds-mdeco-orb-b'), card.firstChild);

        var scan = deco('ds-mdeco-scan');
        scan.style.animationDelay = (i * 0.7) + 's';
        card.insertBefore(scan, card.firstChild);

        if (g.numera) {
          var n = document.createElement('span');
          n.className = 'ds-mdeco ds-mdeco-ghost';
          n.setAttribute('aria-hidden', 'true');
          n.textContent = ('0' + ((g.inicio || 1) + i)).slice(-2);
          card.insertBefore(n, card.firstChild);
        }
      });
    });
  })();
