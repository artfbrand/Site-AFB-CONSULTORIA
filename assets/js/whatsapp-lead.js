/* Janela "Conte um pouco sobre a sua energia": todo link de WhatsApp do site abre este formulário antes da conversa.
   Exceção: links com o atributo data-wa-direto (vão direto ao WhatsApp).
   Ao enviar, o WhatsApp abre na hora com a mensagem montada e os dados seguem em paralelo para /api/lead-whatsapp. */
(function () {
  'use strict';
  var NUMERO = '5531975549075';
  var API = '/api/lead-whatsapp';
  var RASCUNHO = 'afb_lead_whatsapp';
  var MSG_VAZIO = 'Selecione ou preencha esta resposta para continuar.';
  var MSG_WHATSAPP = 'Informe o WhatsApp com DDD.';
  var PERFIS = ['Comercial', 'Industrial', 'Residencial', 'Condomínio', 'Propriedade rural'];
  var FAIXAS = ['Até R$ 1.000', 'R$ 1.000 a R$ 5.000', 'R$ 5.000 a R$ 20.000', 'R$ 20.000 a R$ 50.000', 'Acima de R$ 50.000', 'Não sei'];
  var INTERESSES = ['Reduzir a conta de energia', 'Energia solar', 'Carregador veicular', 'Manutenção ou projeto de subestação', 'Queima de equipamentos ou falhas na energia', 'Outro'];
  // Nome de cada página na mensagem e na planilha (os mesmos nomes do menu)
  var NOMES = {
    '/': 'Página inicial',
    '/servicos': 'Serviços',
    '/quem-somos': 'Quem Somos',
    '/contato': 'Contato',
    '/diagnostico': 'Diagnóstico 360°',
    '/privacidade': 'Política de Privacidade',
    '/servicos/eficiencia-energetica': 'Eficiência Energética',
    '/servicos/eficiencia-energetica/gestao-de-fatura': 'Gestão de Fatura',
    '/servicos/eficiencia-energetica/mercado-livre': 'Mercado Livre',
    '/servicos/eficiencia-energetica/energia-por-assinatura': 'Energia por Assinatura',
    '/servicos/eficiencia-energetica/qualidade-de-energia': 'Qualidade de Energia',
    '/servicos/eficiencia-energetica/correcao-fator-de-potencia': 'Fator de Potência',
    '/servicos/eficiencia-energetica/credito-icms': 'Crédito de ICMS',
    '/servicos/subestacoes': 'Subestações',
    '/servicos/subestacoes/manutencao-preventiva': 'Manutenção Preventiva',
    '/servicos/subestacoes/manutencao-corretiva': 'Manutenção Corretiva',
    '/servicos/subestacoes/ensaios-eletricos': 'Ensaios Elétricos',
    '/servicos/subestacoes/termografia': 'Termografia',
    '/servicos/subestacoes/analise-de-oleo-isolante': 'Análise de Óleo Isolante',
    '/servicos/subestacoes/ensaio-rele-de-protecao': 'Relé de Proteção',
    '/servicos/subestacoes/estudo-de-seletividade': 'Proteção e Seletividade',
    '/servicos/subestacoes/projeto-de-subestacao': 'Projeto de Subestação',
    '/servicos/subestacoes/obras-de-subestacao': 'Obras e Montagem',
    '/servicos/energia-solar': 'Energia Solar',
    '/servicos/carregadores-veiculares': 'Carregadores Veiculares',
    '/blog': 'Blog',
    '/blog/consultoria-eficiencia-energetica-reduzir-custos': 'Blog — Eficiência Energética',
    '/blog/ensaios-manutencao-subestacao-media-tensao': 'Blog — Subestações',
    '/blog/laudo-qualidade-de-energia-reduzir-manutencao-paradas': 'Blog — Qualidade de Energia'
  };

  var caminho = location.pathname.replace(/\/index(\.html)?$/, '/').replace(/\.html$/, '').replace(/\/+$/, '') || '/';
  var nomePagina = NOMES[caminho] || document.title.split(' | ')[0].trim() || caminho;

  // Interesse já marcado conforme a página de origem
  function interessePadrao() {
    if (caminho === '/servicos/eficiencia-energetica/qualidade-de-energia' || caminho === '/blog/laudo-qualidade-de-energia-reduzir-manutencao-paradas') return INTERESSES[4];
    if (caminho === '/blog/consultoria-eficiencia-energetica-reduzir-custos') return INTERESSES[0];
    if (caminho === '/blog/ensaios-manutencao-subestacao-media-tensao') return INTERESSES[3];
    if (caminho.indexOf('/servicos/eficiencia-energetica') === 0) return INTERESSES[0];
    if (caminho === '/servicos/energia-solar') return INTERESSES[1];
    if (caminho === '/servicos/carregadores-veiculares') return INTERESSES[2];
    if (caminho.indexOf('/servicos/subestacoes') === 0) return INTERESSES[3];
    return '';
  }

  function ehLinkWhatsapp(a) {
    var h = a.getAttribute('href') || '';
    return (h.indexOf('wa.me') !== -1 || h.indexOf('api.whatsapp.com') !== -1) && !a.hasAttribute('data-wa-direto');
  }

  function celular() {
    var ua = navigator.userAgent || '';
    return /Android|iPhone|iPad|iPod|Mobile/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  }

  function evento(nome, params) {
    if (typeof window.gtag === 'function') window.gtag('event', nome, params);
  }

  function esc(v) {
    return String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function digitos(v) {
    var d = String(v || '').replace(/\D/g, '');
    if (d.length > 11 && d.indexOf('55') === 0) d = d.slice(2);
    return d.slice(0, 11);
  }

  // Máscara (31) 99999-9999, aceitando também 10 dígitos: (31) 9999-9999
  function mascara(v) {
    var d = digitos(v);
    if (!d) return '';
    if (d.length <= 2) return '(' + d;
    var resto = d.slice(2), corte = d.length === 11 ? 5 : 4;
    return '(' + d.slice(0, 2) + ') ' + (resto.length > corte ? resto.slice(0, corte) + '-' + resto.slice(corte) : resto);
  }

  function opcoes(nome, tipo, lista) {
    return '<div class="afb-wl-chips">' + lista.map(function (v, i) {
      return '<label class="afb-wl-chip"><input type="' + tipo + '" name="' + nome + '" value="' + esc(v) + '" id="afb-wl-' + nome + '-' + i + '" aria-describedby="afb-wl-erro-' + nome + '"><span>' + esc(v) + '</span></label>';
    }).join('') + '</div>';
  }

  function campo(id, rotulo, tipo, extra, opcional) {
    return '<div class="afb-wl-q" data-campo="' + id + '"><label class="afb-wl-rot" for="afb-wl-' + id + '">' + rotulo +
      (opcional ? ' <span class="afb-wl-opc">(opcional)</span>' : '') + '</label>' +
      '<input type="' + tipo + '" id="afb-wl-' + id + '" name="' + id + '" ' + extra + ' aria-describedby="afb-wl-erro-' + id + '">' +
      '<p class="afb-wl-erro" id="afb-wl-erro-' + id + '"></p></div>';
  }

  function grupo(id, rotulo, tipo, lista) {
    return '<fieldset class="afb-wl-q" data-campo="' + id + '"><legend>' + rotulo + '</legend>' + opcoes(id, tipo, lista) +
      '<p class="afb-wl-erro" id="afb-wl-erro-' + id + '"></p></fieldset>';
  }

  var ICONE_WA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';

  var raiz = null, caixa = null, form = null, hp = null, origem = null, abertoEm = 0;

  function construir() {
    raiz = document.createElement('div');
    raiz.className = 'afb-wl';
    raiz.hidden = true;
    raiz.innerHTML =
      '<div class="afb-wl-fundo" data-wl-fechar></div>' +
      '<div class="afb-wl-caixa" role="dialog" aria-modal="true" aria-labelledby="afb-wl-titulo" aria-describedby="afb-wl-sub" tabindex="-1" data-lenis-prevent>' +
        '<button type="button" class="afb-wl-x" aria-label="Fechar" data-wl-fechar><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>' +
        '<h2 class="afb-wl-titulo" id="afb-wl-titulo">Conte um pouco sobre a sua energia</h2>' +
        '<p class="afb-wl-sub" id="afb-wl-sub">São perguntas rápidas para entendermos a sua necessidade antes de continuar pelo WhatsApp.</p>' +
        '<form class="afb-wl-form" novalidate>' +
          campo('nome', 'Nome', 'text', 'autocomplete="name" maxlength="120"') +
          campo('whatsapp', 'WhatsApp', 'tel', 'autocomplete="tel" inputmode="tel" maxlength="15" placeholder="(31) 99999-9999"') +
          campo('cidade', 'Cidade/UF', 'text', 'autocomplete="address-level2" maxlength="120" placeholder="Ex.: Belo Horizonte/MG"') +
          grupo('perfil', 'Qual é o seu perfil?', 'radio', PERFIS) +
          grupo('faixa', 'Quanto você gasta por mês com energia?', 'radio', FAIXAS) +
          grupo('interesse', 'O que você procura?', 'checkbox', INTERESSES) +
          campo('empresa', 'Empresa', 'text', 'autocomplete="organization" maxlength="160"', true) +
          '<div class="afb-wl-q" data-campo="consentimento"><label class="afb-wl-consent"><input type="checkbox" name="consentimento" id="afb-wl-consentimento" aria-describedby="afb-wl-erro-consentimento"><span>Concordo com o uso destes dados para a AFB entrar em contato, conforme a <a href="/privacidade" target="_blank" rel="noopener">Política de Privacidade</a>.</span></label>' +
          '<p class="afb-wl-erro" id="afb-wl-erro-consentimento"></p></div>' +
          '<div class="afb-wl-hp" aria-hidden="true"><label for="afb-wl-site">Site</label><input type="text" id="afb-wl-site" name="site" tabindex="-1" autocomplete="off"></div>' +
          '<button type="submit" class="afb-wl-enviar">' + ICONE_WA + 'Continuar no WhatsApp</button>' +
          '<p class="afb-wl-micro">Leva menos de 1 minuto.</p>' +
        '</form>' +
      '</div>';
    document.body.appendChild(raiz);
    caixa = raiz.querySelector('.afb-wl-caixa');
    form = raiz.querySelector('form');
    hp = form.elements.site;

    raiz.addEventListener('click', function (e) { if (e.target.closest('[data-wl-fechar]')) fechar(); });
    raiz.addEventListener('keydown', teclado);
    form.addEventListener('submit', enviar);
    form.elements.whatsapp.addEventListener('input', function () { this.value = mascara(this.value); });
    form.addEventListener('input', alterou);
    form.addEventListener('change', alterou);
    // Na Home o cursor desenhado fica abaixo da janela: dentro dela vale o cursor nativo
    document.addEventListener('pointerover', function (e) {
      if (!raiz.hidden && e.target.closest && e.target.closest('.afb-wl')) document.documentElement.classList.add('cursor-nativo');
    }, { passive: true });
  }

  function valor(nome) {
    var el = form.elements[nome];
    if (!el) return '';
    if (el.length !== undefined && el.tagName === undefined) {
      if (el[0].type === 'checkbox') return Array.prototype.filter.call(el, function (x) { return x.checked; }).map(function (x) { return x.value; });
      return el.value || '';
    }
    return el.type === 'checkbox' ? el.checked : String(el.value || '').trim();
  }

  function dados() {
    return { nome: valor('nome'), whatsapp: valor('whatsapp'), cidade: valor('cidade'), perfil: valor('perfil'), faixa: valor('faixa'), interesse: valor('interesse'), empresa: valor('empresa') };
  }

  function salvarRascunho() {
    try { sessionStorage.setItem(RASCUNHO, JSON.stringify(dados())); } catch (e) {}
  }

  function restaurar() {
    var r = null;
    try { r = JSON.parse(sessionStorage.getItem(RASCUNHO) || 'null'); } catch (e) {}
    form.reset();
    if (r && typeof r === 'object') {
      ['nome', 'whatsapp', 'cidade', 'empresa'].forEach(function (k) { if (typeof r[k] === 'string') form.elements[k].value = r[k]; });
      ['perfil', 'faixa'].forEach(function (k) { form.querySelectorAll('input[name="' + k + '"]').forEach(function (x) { x.checked = x.value === r[k]; }); });
      var lista = Array.isArray(r.interesse) ? r.interesse : [];
      form.querySelectorAll('input[name="interesse"]').forEach(function (x) { x.checked = lista.indexOf(x.value) !== -1; });
    } else {
      var padrao = interessePadrao();
      form.querySelectorAll('input[name="interesse"]').forEach(function (x) { x.checked = x.value === padrao; });
    }
  }

  // Devolve a mensagem de erro do campo ou '' se estiver correto
  function erroDe(nome) {
    var v = valor(nome);
    if (nome === 'interesse') return v.length ? '' : MSG_VAZIO;
    if (nome === 'consentimento') return v === true ? '' : MSG_VAZIO;
    if (!v) return MSG_VAZIO;
    if (nome === 'whatsapp') { var n = digitos(v).length; return n >= 10 && n <= 11 ? '' : MSG_WHATSAPP; }
    return '';
  }

  function marcar(nome, msg) {
    var q = form.querySelector('[data-campo="' + nome + '"]');
    q.classList.toggle('afb-wl-invalido', !!msg);
    q.querySelector('.afb-wl-erro').textContent = msg;
    q.querySelectorAll('input').forEach(function (i) { if (msg) i.setAttribute('aria-invalid', 'true'); else i.removeAttribute('aria-invalid'); });
  }

  var OBRIGATORIOS = ['nome', 'whatsapp', 'cidade', 'perfil', 'faixa', 'interesse', 'consentimento'];

  function validar() {
    var primeiro = null;
    OBRIGATORIOS.forEach(function (nome) {
      var msg = erroDe(nome);
      marcar(nome, msg);
      if (msg && !primeiro) primeiro = form.querySelector('[data-campo="' + nome + '"] input');
    });
    if (primeiro) primeiro.focus();
    return !primeiro;
  }

  function alterou(e) {
    var nome = e.target.name;
    if (nome === 'site') return;
    salvarRascunho();
    var q = form.querySelector('[data-campo="' + nome + '"]');
    if (q && q.classList.contains('afb-wl-invalido') && !erroDe(nome)) marcar(nome, '');
  }

  function focaveis() {
    return Array.prototype.filter.call(caixa.querySelectorAll('a[href], button, input:not([tabindex="-1"])'), function (el) {
      return !el.disabled && el.offsetParent !== null;
    });
  }

  function teclado(e) {
    if (e.key === 'Escape') { e.preventDefault(); fechar(); return; }
    if (e.key !== 'Tab') return;
    var f = focaveis(), primeiro = f[0], ultimo = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === primeiro || document.activeElement === caixa)) { e.preventDefault(); ultimo.focus(); }
    else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primeiro.focus(); }
  }

  function abrir(link) {
    if (!raiz) construir();
    origem = link || document.activeElement;
    restaurar();
    OBRIGATORIOS.forEach(function (nome) { marcar(nome, ''); });
    raiz.hidden = false;
    document.documentElement.classList.add('afb-wl-aberto');
    if (window.lenis && typeof window.lenis.stop === 'function') window.lenis.stop();
    caixa.scrollTop = 0;
    abertoEm = Date.now();
    form.elements.nome.focus();
    evento('abertura_form_whatsapp', { pagina: location.pathname });
  }

  function fechar() {
    if (!raiz || raiz.hidden) return;
    raiz.hidden = true;
    document.documentElement.classList.remove('afb-wl-aberto', 'cursor-nativo');
    if (window.lenis && typeof window.lenis.start === 'function') window.lenis.start();
    if (origem && typeof origem.focus === 'function') { try { origem.focus({ preventScroll: true }); } catch (e) { origem.focus(); } }
    origem = null;
  }

  function mensagem(d) {
    return 'Olá! Sou ' + d.nome + (d.empresa ? ', da ' + d.empresa : '') + '. Vim pelo site da AFB.\n' +
      '• Perfil: ' + d.perfil + '\n' +
      '• Cidade: ' + d.cidade + '\n' +
      '• Gasto mensal com energia: ' + d.faixa + '\n' +
      '• Interesse: ' + d.interesse.join(', ') + '\n' +
      '• Página: ' + nomePagina;
  }

  function enviar(e) {
    e.preventDefault();
    if (!validar()) return;
    var d = dados();
    var url = 'https://wa.me/' + NUMERO + '?text=' + encodeURIComponent(mensagem(d));
    // Gravação em paralelo: se falhar, o WhatsApp abre do mesmo jeito
    if (!hp.value) {
      try {
        fetch(API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome: d.nome, whatsapp: d.whatsapp, cidade: d.cidade, perfil: d.perfil, faixa: d.faixa, interesse: d.interesse, empresa: d.empresa, pagina: nomePagina, consentimento: true, site: hp.value, tempo: Date.now() - abertoEm }),
          keepalive: true
        }).catch(function () {});
      } catch (x) {}
    }
    evento('envio_form_whatsapp', { perfil: d.perfil, faixa_gasto: d.faixa, pagina: location.pathname });
    evento('clique_whatsapp', { link_url: url, pagina: location.pathname });
    try { sessionStorage.removeItem(RASCUNHO); } catch (x) {}
    if (celular()) {
      fechar();
      location.href = url;
    } else {
      var janela = window.open(url, '_blank');
      if (janela) { try { janela.opener = null; } catch (x) {} } else { location.href = url; }
      fechar();
    }
  }

  // Captura no window: roda antes do contador clique_whatsapp do <head>, que agora dispara só no envio
  function interceptar(e) {
    if (e.type === 'auxclick' && e.button !== 1) return;
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a || !ehLinkWhatsapp(a) || (raiz && raiz.contains(a))) return;
    e.preventDefault();
    e.stopPropagation();
    abrir(a);
  }
  window.addEventListener('click', interceptar, true);
  window.addEventListener('auxclick', interceptar, true);
  window.afbAbrirLeadWhatsapp = abrir;
})();
