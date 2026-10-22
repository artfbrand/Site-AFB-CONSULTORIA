/**
 * Webhook da planilha "Leads WhatsApp" do site AFB (não é publicado no site).
 * Recebe do api/lead-whatsapp.js: { token: "...", linha: [10 valores] } e grava uma linha na aba "Leads WhatsApp".
 * O token precisa ser igual à propriedade SHEETS_TOKEN (Configurações do projeto > Propriedades do script).
 * Passo a passo em LEIA-ME.md.
 */
var ABA = 'Leads WhatsApp';
var CABECALHO = ['Data/hora', 'Nome', 'WhatsApp', 'Cidade/UF', 'Perfil', 'Gasto mensal', 'Interesse', 'Empresa', 'Página de origem', 'Status'];

function responder_(corpo) {
  return ContentService.createTextOutput(JSON.stringify(corpo)).setMimeType(ContentService.MimeType.JSON);
}

// Valor que começa com = + - @ vira texto (proteção contra fórmula, também feita no site)
function semFormula_(v) {
  v = String(v == null ? '' : v).slice(0, 500);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function doPost(e) {
  var dados;
  try {
    dados = JSON.parse(e.postData.contents);
  } catch (err) {
    return responder_({ ok: false, erro: 'json' });
  }
  var token = PropertiesService.getScriptProperties().getProperty('SHEETS_TOKEN');
  if (!token || !dados || dados.token !== token) return responder_({ ok: false, erro: 'token' });
  if (!Array.isArray(dados.linha) || dados.linha.length !== CABECALHO.length) return responder_({ ok: false, erro: 'linha' });

  var trava = LockService.getScriptLock();
  try {
    trava.waitLock(10000);
  } catch (err) {
    return responder_({ ok: false, erro: 'ocupado' });
  }
  try {
    var planilha = SpreadsheetApp.getActiveSpreadsheet();
    var aba = planilha.getSheetByName(ABA) || planilha.insertSheet(ABA);
    if (aba.getLastRow() === 0) {
      aba.appendRow(CABECALHO);
      aba.getRange(1, 1, 1, CABECALHO.length).setFontWeight('bold');
      aba.setFrozenRows(1);
    }
    aba.appendRow(dados.linha.map(semFormula_));
    return responder_({ ok: true });
  } finally {
    trava.releaseLock();
  }
}
