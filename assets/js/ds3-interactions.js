// DS3 interactions: Lucide · word carousel · reveal-up · dark-green snake cursor (light mode)

document.addEventListener('DOMContentLoaded', () => {

  // ── LUCIDE ICONS ──
  try {
    if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
      lucide.createIcons({ attrs: { 'stroke-width': 1.5 } });
    } else if (typeof lucide !== 'undefined' && typeof lucide.replace === 'function') {
      lucide.replace({ 'stroke-width': 1.5 });
    }
  } catch (e) { /* ignore */ }

  // ── WORD CAROUSEL ──
  (function () {
    const words = ['bem-sucedidas.', 'eficientes.', 'rápidas.', 'sustentáveis.', 'imparáveis.', 'lucrativas.'];
    let idx = 0, current = '', deleting = false;
    const el = document.getElementById('word-carousel');
    if (!el) return;
    function type() {
      const full = words[idx];
      current = deleting ? full.slice(0, current.length - 1) : full.slice(0, current.length + 1);
      el.textContent = current;
      let speed = deleting ? 40 : 85;
      if (!deleting && current === full) {
        if (idx === words.length - 1) {
          setTimeout(() => { el.classList.remove('animate-blink'); el.style.borderRight = 'none'; }, 3200);
          return;
        }
        speed = 1600; deleting = true;
      } else if (deleting && current === '') {
        deleting = false;
        idx = (idx + 1) % words.length;
        speed = 520;
      }
      setTimeout(type, speed);
    }
    el.textContent = '';
    setTimeout(type, 900);
  })();

  // ── REVEAL-UP OBSERVER ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal-up').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
  setTimeout(() => {
    const obs2 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          obs2.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal-up').forEach(el => {
      if (el.style.animationPlayState !== 'running') {
        el.style.animationPlayState = 'paused';
        obs2.observe(el);
      }
    });
  }, 120);

  // ── SNAKE CURSOR — dark green for light background ──
  const ring = document.getElementById('cursor-ring');
  const dot = document.getElementById('cursor-dot');
  if (!ring || !dot) return;

  let rafId;
  let targetX = window.innerWidth / 2, targetY = window.innerHeight / 2;
  let currentX = targetX, currentY = targetY;
  const SEGMENTS = 20;
  const segEls = [];
  const segX = new Array(SEGMENTS);
  const segY = new Array(SEGMENTS);
  let sizeBoost = 0;

  const createSegment = (i) => {
    const el = document.createElement('div');
    const baseSize = Math.max(3, 12 - i * 0.44);
    const opacity = Math.max(0.09, 0.72 - i * 0.032);
    el.className = 'pointer-events-none fixed top-0 left-0 hidden md:block';
    el.style.cssText = [
      'z-index:40;',
      `width:${baseSize}px;`,
      `height:${baseSize}px;`,
      'border-radius:9999px;',
      'transform:translate(-50%,-50%);',
      `background:rgba(61,127,97,${Math.min(.84, .48 + .016 * (SEGMENTS - i))});`,
      'box-shadow:0 0 0 1px rgba(13,60,31,.05),0 0 10px rgba(61,127,97,.15);',
      `opacity:${opacity};`,
      'transition:opacity .2s;',
      'will-change:left,top;'
    ].join('');
    document.body.appendChild(el);
    return el;
  };

  for (let i = 0; i < SEGMENTS; i++) {
    segEls[i] = createSegment(i);
    segX[i] = targetX;
    segY[i] = targetY;
  }

  const updateSizes = () => {
    for (let i = 0; i < SEGMENTS; i++) {
      const base = Math.max(3, 12 - i * 0.44);
      segEls[i].style.width = (base + sizeBoost) + 'px';
      segEls[i].style.height = (base + sizeBoost) + 'px';
    }
  };

  const snapAll = (x, y) => {
    ring.style.left = x + 'px'; ring.style.top = y + 'px';
    dot.style.left = x + 'px'; dot.style.top = y + 'px';
    for (let i = 0; i < SEGMENTS; i++) {
      segX[i] = x; segY[i] = y;
      segEls[i].style.left = x + 'px'; segEls[i].style.top = y + 'px';
    }
  };

  const animate = () => {
    currentX += (targetX - currentX) * 0.22;
    currentY += (targetY - currentY) * 0.22;
    ring.style.left = currentX + 'px'; ring.style.top = currentY + 'px';
    dot.style.left = targetX + 'px'; dot.style.top = targetY + 'px';
    segX[0] += (targetX - segX[0]) * 0.28;
    segY[0] += (targetY - segY[0]) * 0.28;
    for (let i = 1; i < SEGMENTS; i++) {
      segX[i] += (segX[i - 1] - segX[i]) * 0.28;
      segY[i] += (segY[i - 1] - segY[i]) * 0.28;
    }
    for (let i = 0; i < SEGMENTS; i++) {
      segEls[i].style.left = segX[i] + 'px';
      segEls[i].style.top = segY[i] + 'px';
    }
    rafId = requestAnimationFrame(animate);
  };

  const enlarge = () => {
    ring.style.width = '46px'; ring.style.height = '46px';
    ring.style.borderColor = 'rgba(13,60,31,.78)';
    ring.style.boxShadow = '0 0 0 3px rgba(61,127,97,.1),0 0 44px rgba(61,127,97,.18)';
    sizeBoost = 2.5; updateSizes();
  };
  const reset = () => {
    ring.style.width = '28px'; ring.style.height = '28px';
    ring.style.borderColor = 'rgba(61,127,97,.68)';
    ring.style.boxShadow = '0 0 0 2px rgba(13,60,31,.07),0 0 22px rgba(61,127,97,.12)';
    sizeBoost = 0; updateSizes();
  };
  const hide = () => {
    ring.style.opacity = '0'; dot.style.opacity = '0';
    segEls.forEach(el => el.style.opacity = '0');
  };
  const show = () => {
    ring.style.opacity = '.82'; dot.style.opacity = '.9';
    for (let i = 0; i < SEGMENTS; i++) {
      segEls[i].style.opacity = Math.max(0.09, 0.72 - i * 0.032);
    }
  };

  snapAll(window.innerWidth / 2, window.innerHeight / 2);
  show(); updateSizes();
  rafId = requestAnimationFrame(animate);

  window.addEventListener('mousemove', e => { targetX = e.clientX; targetY = e.clientY; }, { passive: true });
  window.addEventListener('mouseenter', show);
  window.addEventListener('mouseleave', hide);

  document.querySelectorAll('a, button, [role="button"], .cursor-glow, .light-btn-hover, .light-tag, .light-glow-border, .logo-hover, .hover-lift, .interactive-text-light, .light-card, .section-badge-light, .stat-pill-light, .hero-float-card, .process-node-light').forEach(el => {
    el.addEventListener('mouseenter', enlarge);
    el.addEventListener('mouseleave', reset);
  });

  window.addEventListener('mousedown', () => { ring.style.transform = 'translate(-50%,-50%) scale(.84)'; });
  window.addEventListener('mouseup', () => { ring.style.transform = 'translate(-50%,-50%) scale(1)'; });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(rafId);
    else rafId = requestAnimationFrame(animate);
  });

});
