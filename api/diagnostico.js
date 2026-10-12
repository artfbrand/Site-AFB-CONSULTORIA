// Função Vercel (Node): recebe o Diagnóstico 360° e envia por e-mail via Resend.
// Variáveis de ambiente (configuradas só na Vercel): RESEND_API_KEY, DIAG_TO, DIAG_FROM.
"use strict";

var MAX_BYTES = 50 * 1024;
var MAX_RESPOSTAS = 80;
var MAX_TEXTO = 2000;
var TEMPO_MINIMO_MS = 20 * 1000;

// Perguntas mostradas em destaque no topo do e-mail (texto exato do formulário).
var DESTAQUES = [
  ["Valor médio da conta", "Qual é o valor médio da conta de energia por mês?"],
  ["Como a energia chega", "Como a energia chega à empresa?"],
  ["Prioridade", "Qual é a prioridade neste momento?"],
  ["Interesse em visita", "Há interesse em uma visita técnica?"]
];

function responder(res, status, corpo) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(corpo));
}

function lerCorpoBruto(req) {
  return new Promise(function (resolve, reject) {
    var partes = [], total = 0;
    req.on("data", function (c) {
      total += c.length;
      if (total > MAX_BYTES) { reject(new Error("grande")); req.destroy(); return; }
      partes.push(c);
    });
    req.on("end", function () { resolve(Buffer.concat(partes).toString("utf8")); });
    req.on("error", reject);
  });
}

async function lerJson(req) {
  var corpo;
  try { corpo = req.body; } catch (e) { return null; }
  if (corpo === undefined) {
    try { corpo = await lerCorpoBruto(req); } catch (e) { return null; }
  }
  if (Buffer.isBuffer(corpo)) corpo = corpo.toString("utf8");
  if (typeof corpo === "string") {
    if (Buffer.byteLength(corpo, "utf8") > MAX_BYTES) return null;
    try { corpo = JSON.parse(corpo); } catch (e) { return null; }
  } else if (corpo && Buffer.byteLength(JSON.stringify(corpo), "utf8") > MAX_BYTES) {
    return null;
  }
  return corpo && typeof corpo === "object" && !Array.isArray(corpo) ? corpo : null;
}

function texto(v) {
  return typeof v === "string" ? v.trim() : "";
}

function escapar(v) {
  return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function umaLinha(v) {
  return String(v).replace(/[\r\n\t]+/g, " ").replace(/\s{2,}/g, " ").trim();
}

function textoValido(v) {
  return typeof v === "string" && v.length <= MAX_TEXTO;
}

// Devolve os dados normalizados ou null se a requisição for inválida.
function validar(d) {
  if (texto(d.site) !== "" || (d.site !== undefined && typeof d.site !== "string")) return null;
  var inicio = Number(d.inicio);
  if (!isFinite(inicio) || Date.now() - inicio < TEMPO_MINIMO_MS) return null;
  if (d.consentimento !== true) return null;

  var c = d.contato;
  if (!c || typeof c !== "object") return null;
  var campos = ["empresa", "cidade", "nome", "cargo", "email", "whatsapp"], contato = {};
  for (var i = 0; i < campos.length; i++) {
    var v = c[campos[i]];
    if (v !== undefined && !textoValido(v)) return null;
    contato[campos[i]] = texto(v);
  }
  if (!contato.empresa || !contato.nome || !contato.email || !contato.whatsapp) return null;
  if (!/^[^\s@<>()",;]+@[^\s@<>()",;]+\.[^\s@<>()",;]{2,}$/.test(contato.email) || contato.email.length > 254) return null;
  var digitos = contato.whatsapp.replace(/\D/g, "");
  if (digitos.length < 10 || digitos.length > 11) return null;
  contato.whatsappDigitos = digitos;

  if (!Array.isArray(d.respostas) || d.respostas.length > MAX_RESPOSTAS) return null;
  var respostas = [];
  for (var j = 0; j < d.respostas.length; j++) {
    var r = d.respostas[j];
    if (!r || typeof r !== "object") return null;
    var resp = r.resposta;
    if (Array.isArray(resp)) {
      for (var k = 0; k < resp.length; k++) if (!textoValido(resp[k])) return null;
      resp = resp.map(texto).filter(Boolean).join(", ");
    }
    if (!textoValido(r.secao) || !textoValido(r.pergunta) || !textoValido(resp)) return null;
    respostas.push({ secao: texto(r.secao), pergunta: texto(r.pergunta), resposta: texto(resp) });
  }
  return { contato: contato, respostas: respostas };
}

function agruparPorSecao(respostas) {
  var grupos = [], porNome = {};
  respostas.forEach(function (r) {
    var nome = r.secao || "Outras respostas";
    if (!porNome[nome]) { porNome[nome] = { secao: nome, itens: [] }; grupos.push(porNome[nome]); }
    porNome[nome].itens.push(r);
  });
  return grupos;
}

function destaque(respostas, pergunta) {
  for (var i = 0; i < respostas.length; i++) if (respostas[i].pergunta === pergunta) return respostas[i].resposta;
  return "";
}

function montarEmail(dados) {
  var c = dados.contato, respostas = dados.respostas;
  var wa = "https://wa.me/55" + c.whatsappDigitos;
  var nomeCargo = c.nome + (c.cargo ? " — " + c.cargo : "");
  var topo = [
    ["Empresa", c.empresa],
    ["Cidade", c.cidade],
    ["Nome e cargo", nomeCargo],
    ["WhatsApp", c.whatsapp, wa],
    ["E-mail", c.email, "mailto:" + c.email]
  ].concat(DESTAQUES.map(function (x) { return [x[0], destaque(respostas, x[1])]; }));
  var grupos = agruparPorSecao(respostas);

  var linhasTopo = topo.map(function (l) {
    var valor = l[1] ? (l[2] ? '<a href="' + escapar(l[2]) + '" style="color:#3D7F61;">' + escapar(l[1]) + "</a>" : escapar(l[1])) : "—";
    return '<tr><td style="padding:6px 12px;color:#4A6B5A;font-size:14px;vertical-align:top;white-space:nowrap;">' + escapar(l[0]) +
      '</td><td style="padding:6px 12px 6px 0;color:#0D3C1F;font-size:15px;font-weight:600;">' + valor + "</td></tr>";
  }).join("");
  var blocos = grupos.map(function (g) {
    return '<h3 style="margin:24px 0 8px;font-size:16px;color:#0D3C1F;border-bottom:2px solid #3D7F61;padding-bottom:4px;">' + escapar(g.secao) + "</h3>" +
      g.itens.map(function (r) {
        return '<p style="margin:0 0 8px;font-size:14px;line-height:1.5;color:#0D3C1F;"><strong>' + escapar(r.pergunta) + ":</strong> " +
          escapar(r.resposta).replace(/\r?\n/g, "<br>") + "</p>";
      }).join("");
  }).join("");
  var html = '<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"></head>' +
    '<body style="margin:0;padding:24px;background:#F7FAF7;font-family:Arial,Helvetica,sans-serif;color:#0D3C1F;">' +
    '<div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;padding:24px;border-top:4px solid #3D7F61;">' +
    '<h2 style="margin:0 0 16px;font-size:20px;color:#0D3C1F;">Novo Diagnóstico 360°</h2>' +
    '<table role="presentation" style="border-collapse:collapse;background:#F7FAF7;border-radius:8px;width:100%;"><tbody>' +
    linhasTopo +
    "</tbody></table>" + blocos + "</div></body></html>";

  var txt = ["Novo Diagnóstico 360°", ""].concat(topo.map(function (l) { return l[0] + ": " + (l[2] && l[0] === "WhatsApp" ? l[1] + " (" + l[2] + ")" : l[1] || "—"); }));
  grupos.forEach(function (g) {
    txt.push("", g.secao.toUpperCase());
    g.itens.forEach(function (r) { txt.push(r.pergunta + ": " + r.resposta); });
  });

  return {
    assunto: umaLinha("Novo Diagnóstico 360° — " + c.empresa + " — " + c.cidade),
    html: html,
    texto: txt.join("\n")
  };
}

function remetente(from) {
  from = String(from).trim();
  return from.indexOf("<") > -1 ? from : "AFB Diagnóstico <" + from + ">";
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return responder(res, 405, { ok: false });
  }
  var tamanho = Number(req.headers && req.headers["content-length"]);
  var tipo = String((req.headers && req.headers["content-type"]) || "");
  if (tipo.indexOf("application/json") === -1 || tamanho > MAX_BYTES) {
    console.log("diagnostico: 400");
    return responder(res, 400, { ok: false });
  }

  var chave = process.env.RESEND_API_KEY, para = process.env.DIAG_TO, de = process.env.DIAG_FROM;
  if (!chave || !para || !de) {
    console.log("diagnostico: 500 configuracao ausente");
    return responder(res, 500, { ok: false });
  }

  var corpo = await lerJson(req);
  var dados = corpo && validar(corpo);
  if (!dados) {
    console.log("diagnostico: 400");
    return responder(res, 400, { ok: false });
  }

  var email = montarEmail(dados);
  var controle = new AbortController();
  var limite = setTimeout(function () { controle.abort(); }, 10000);
  try {
    var r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": "Bearer " + chave, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: remetente(de),
        to: para.split(",").map(function (x) { return x.trim(); }).filter(Boolean),
        reply_to: dados.contato.email,
        subject: email.assunto,
        html: email.html,
        text: email.texto
      }),
      signal: controle.signal
    });
    if (!r.ok) {
      console.log("diagnostico: 502 resend " + r.status);
      return responder(res, 502, { ok: false });
    }
    console.log("diagnostico: 200");
    return responder(res, 200, { ok: true });
  } catch (e) {
    console.log("diagnostico: 502 resend indisponivel");
    return responder(res, 502, { ok: false });
  } finally {
    clearTimeout(limite);
  }
};
