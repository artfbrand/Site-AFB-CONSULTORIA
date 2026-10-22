// Função Vercel (Node): recebe o formulário "Conte um pouco sobre a sua energia" (assets/js/whatsapp-lead.js),
// grava a linha na planilha Google pelo webhook do Apps Script (SHEETS_WEBHOOK_URL + SHEETS_TOKEN) e avisa por e-mail
// em DIAG_TO, pelo mesmo SMTP/Resend do api/diagnostico.js. Variáveis configuradas só na Vercel. Logs sem dados pessoais.
"use strict";

var envio = require("./diagnostico.js").envio;

var MAX_BYTES = 16 * 1024;
var TEMPO_MINIMO_MS = 3 * 1000;
var TIMEOUT_PLANILHA_MS = 5000;
var LIMITES = { nome: 120, whatsapp: 20, cidade: 120, empresa: 160, pagina: 120 };
var PERFIS = ["Comercial", "Industrial", "Residencial", "Condomínio", "Propriedade rural"];
var FAIXAS = ["Até R$ 1.000", "R$ 1.000 a R$ 5.000", "R$ 5.000 a R$ 20.000", "R$ 20.000 a R$ 50.000", "Acima de R$ 50.000", "Não sei"];
var INTERESSES = ["Reduzir a conta de energia", "Energia solar", "Carregador veicular", "Manutenção ou projeto de subestação", "Queima de equipamentos ou falhas na energia", "Outro"];

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

function umaLinha(v) {
  return String(v).replace(/[\x00-\x1f\x7f]+/g, " ").replace(/\s{2,}/g, " ").trim();
}

function escapar(v) {
  return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// Contra injeção de fórmula na planilha: valor que começa com = + - @ vira texto
function semFormula(v) {
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

// Devolve os dados normalizados ou null se a requisição for inválida.
function validar(d) {
  if (d.site !== undefined && d.site !== "") return null;
  var tempo = Number(d.tempo);
  if (!isFinite(tempo) || tempo < TEMPO_MINIMO_MS) return null;
  if (d.consentimento !== true) return null;

  var lead = {};
  var campos = Object.keys(LIMITES);
  for (var i = 0; i < campos.length; i++) {
    var v = d[campos[i]];
    if (v === undefined || v === null) v = "";
    if (typeof v !== "string" || v.length > LIMITES[campos[i]]) return null;
    lead[campos[i]] = umaLinha(v);
  }
  if (!lead.nome || !lead.cidade || !lead.whatsapp || !lead.pagina) return null;
  var digitos = lead.whatsapp.replace(/\D/g, "");
  if (digitos.length < 10 || digitos.length > 11) return null;
  lead.whatsappDigitos = digitos;

  if (PERFIS.indexOf(d.perfil) === -1 || FAIXAS.indexOf(d.faixa) === -1) return null;
  lead.perfil = d.perfil;
  lead.faixa = d.faixa;
  if (!Array.isArray(d.interesse) || !d.interesse.length || d.interesse.length > INTERESSES.length) return null;
  for (var j = 0; j < d.interesse.length; j++) if (INTERESSES.indexOf(d.interesse[j]) === -1) return null;
  lead.interesse = INTERESSES.filter(function (x) { return d.interesse.indexOf(x) !== -1; }).join(", ");
  return lead;
}

function dataHora() {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo", day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
  }).format(new Date()).replace(",", "");
}

// Colunas: Data/hora · Nome · WhatsApp · Cidade/UF · Perfil · Gasto mensal · Interesse · Empresa · Página de origem · Status
function linhaPlanilha(lead) {
  return [dataHora()].concat([lead.nome, lead.whatsapp, lead.cidade, lead.perfil, lead.faixa, lead.interesse, lead.empresa, lead.pagina].map(semFormula), "");
}

// "ok", "sem-config" ou "falhou"
async function gravarPlanilha(lead) {
  var url = process.env.SHEETS_WEBHOOK_URL, token = process.env.SHEETS_TOKEN;
  if (!url) return "sem-config";
  var controle = new AbortController();
  var limite = setTimeout(function () { controle.abort(); }, TIMEOUT_PLANILHA_MS);
  try {
    var r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token || "", linha: linhaPlanilha(lead) }),
      redirect: "follow",
      signal: controle.signal
    });
    var resposta = null;
    try { resposta = await r.json(); } catch (e) {}
    if (!r.ok || !resposta || resposta.ok !== true) {
      console.log("lead-whatsapp: planilha falhou status=" + r.status + (resposta && typeof resposta.erro === "string" ? " " + resposta.erro : ""));
      return "falhou";
    }
    return "ok";
  } catch (e) {
    console.log("lead-whatsapp: planilha indisponivel " + String((e && e.name) || "erro"));
    return "falhou";
  } finally {
    clearTimeout(limite);
  }
}

function montarEmail(lead) {
  var wa = "https://wa.me/55" + lead.whatsappDigitos;
  var linhas = [
    ["Nome", lead.nome],
    ["WhatsApp", lead.whatsapp, wa],
    ["Cidade/UF", lead.cidade],
    ["Perfil", lead.perfil],
    ["Gasto mensal", lead.faixa],
    ["Interesse", lead.interesse],
    ["Empresa", lead.empresa],
    ["Página de origem", lead.pagina]
  ];
  var html = '<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"></head>' +
    '<body style="margin:0;padding:24px;background:#F7FAF7;font-family:Arial,Helvetica,sans-serif;color:#0D3C1F;">' +
    '<div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;padding:24px;border-top:4px solid #3D7F61;">' +
    '<h2 style="margin:0 0 16px;font-size:20px;color:#0D3C1F;">Novo contato WhatsApp</h2>' +
    '<table role="presentation" style="border-collapse:collapse;width:100%;"><tbody>' +
    linhas.map(function (l) {
      var valor = l[1] ? (l[2] ? '<a href="' + escapar(l[2]) + '" style="color:#3D7F61;">' + escapar(l[1]) + "</a>" : escapar(l[1])) : "—";
      return '<tr><td style="padding:6px 12px 6px 0;color:#4A6B5A;font-size:14px;vertical-align:top;white-space:nowrap;">' + escapar(l[0]) +
        '</td><td style="padding:6px 0;color:#0D3C1F;font-size:15px;font-weight:600;">' + valor + "</td></tr>";
    }).join("") +
    "</tbody></table></div></body></html>";
  var texto = ["Novo contato WhatsApp", ""].concat(linhas.map(function (l) {
    return l[0] + ": " + (l[1] || "—") + (l[2] ? " (" + l[2] + ")" : "");
  })).join("\n");
  return { assunto: umaLinha("Novo contato WhatsApp — " + lead.perfil + " — " + lead.cidade), html: html, texto: texto };
}

// "smtp", "resend", "sem-config" ou "falhou". Nunca bloqueia a resposta por erro.
async function avisarEmail(lead) {
  var para = envio.destinatarios(process.env.DIAG_TO);
  var smtp = envio.configSmtp();
  var chave = process.env.RESEND_API_KEY, de = process.env.DIAG_FROM;
  if (!para.length || (!smtp && !(chave && de))) return "sem-config";
  var email = montarEmail(lead);
  if (smtp) {
    try {
      await envio.enviarSmtp(smtp, para, undefined, email);
      return "smtp";
    } catch (e) {
      console.log("lead-whatsapp: smtp falhou " + String((e && (e.code || e.name)) || "erro"));
    }
  }
  if (chave && de) {
    try {
      if (await envio.enviarResend(chave, de, para, undefined, email)) return "resend";
    } catch (e) {}
  }
  return "falhou";
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return responder(res, 405, { ok: false });
  }
  var tamanho = Number(req.headers && req.headers["content-length"]);
  var tipo = String((req.headers && req.headers["content-type"]) || "");
  if (tipo.indexOf("application/json") === -1 || tamanho > MAX_BYTES) {
    console.log("lead-whatsapp: 400");
    return responder(res, 400, { ok: false });
  }

  var corpo = await lerJson(req);
  var lead = corpo && validar(corpo);
  if (!lead) {
    console.log("lead-whatsapp: 400");
    return responder(res, 400, { ok: false });
  }

  var resultados = await Promise.all([gravarPlanilha(lead), avisarEmail(lead)]);
  var planilha = resultados[0], email = resultados[1];
  if (planilha === "sem-config") console.log("lead-whatsapp: SHEETS_WEBHOOK_URL ausente, linha nao gravada");
  console.log("lead-whatsapp: " + (planilha === "falhou" ? 502 : 200) + " planilha=" + planilha + " email=" + email);
  if (planilha === "falhou") return responder(res, 502, { ok: false });
  return responder(res, 200, { ok: true });
};
