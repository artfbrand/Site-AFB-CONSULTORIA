// CSS do topo sem bloquear (páginas internas, blog e 404 — as que usam o mesmo <head>; Home e /diagnostico ficam de fora).
// Para cada <link> de base.css, efeitos.css, servico.css (e blog.css nas páginas do blog) embute no <head> as regras que os
// elementos da página usam (inclusive @font-face) e deixa o arquivo completo carregando sem bloquear.
// Os blocos gerados ficam entre marcadores e são refeitos do zero a cada execução (rodar de novo não duplica nada).
// Uso (na raiz do site): node tools/css-critico/critico.mjs            → gera de novo em todas as páginas
//                        node tools/css-critico/critico.mjs --desfazer → volta aos <link> originais
import fs from "node:fs"; import path from "node:path"; import { execSync } from "node:child_process";
import Beasties from "beasties";

const RAIZ = process.cwd();
const DESFAZER = process.argv.includes("--desfazer");
const INICIO = "<!-- css-critico ", FIM = "<!-- /css-critico -->";
const MARCADO = /<!-- css-critico (\S+) \(gerado por tools\/css-critico; não editar à mão\) -->[\s\S]*?<!-- \/css-critico -->/g;
const ASSINC = /<link rel="stylesheet"[^>]*media="print"[^>]*>/g;

const paginas = execSync('git ls-files "*.html"', { cwd: RAIZ }).toString().trim().split("\n")
  .filter(f => !/^_design\/|demo\.html$|^index\.html$|^diagnostico\.html$/.test(f));

const beasties = new Beasties({
  path: RAIZ, publicPath: "/", preload: "media", pruneSource: false, inlineFonts: true, preloadFonts: false,
  compress: true, keyframes: "critical", reduceInlineStyles: false,
  mergeStylesheets: false, // um bloco por arquivo, no lugar do link: mantém a ordem da cascata
  logLevel: "warn",
  // classes e estados que os scripts colocam no carregamento (efeitos .ds-*, menu aberto etc.) também entram
  allowRules: [/\.ds-/, /slideUpFade/, /\.fx-ready/, /\.afb-menu-aberto/, /\.open\b/]
});

function desfazer(html) {
  return html.replace(MARCADO, (m, href) => `<link rel="stylesheet" href="${href}" />`);
}

for (const f of paginas) {
  const arq = path.join(RAIZ, f);
  const original = desfazer(fs.readFileSync(arq, "utf8"));
  if (DESFAZER) { fs.writeFileSync(arq, original); continue; }
  // o beasties só CALCULA o CSS de cada arquivo (ele regrava o HTML inteiro); a troca é feita aqui, só nas linhas dos <link>.
  // links que já carregam sem bloquear (whatsapp-lead.css, blog.css nas páginas de serviço) ficam fora do cálculo
  const processado = await beasties.process(original.replace(ASSINC, ""));
  const cssDe = {};
  processado.replace(/<style>((?:(?!<\/style>)[\s\S])*)<\/style>\s*<link rel="stylesheet" href="([^"]+)" media="print"/g, (m, css, href) => { cssDe[href] = css; return m; });
  const html = original.replace(/<link rel="stylesheet" href="([^"]+)" \/>/g, (m, href) => {
    if (!cssDe[href]) return m;
    return `${INICIO}${href} (gerado por tools/css-critico; não editar à mão) -->` +
      `<style data-css-critico>${cssDe[href]}</style>` +
      `<link rel="stylesheet" href="${href}" media="print" onload="this.media='all'" /><noscript><link rel="stylesheet" href="${href}" /></noscript>${FIM}`;
  });
  // conferências: todo link CSS bloqueante virou bloco marcado, e desfazer devolve exatamente o arquivo de origem
  const sobrou = (html.replace(MARCADO, "").match(/<link rel="stylesheet" href="\/assets\/css\/[^"]+"(?![^>]*media="print")[^>]*>/g) || []).filter(l => !/<noscript>/.test(l));
  if (sobrou.length) throw new Error(`${f}: CSS bloqueante não processado: ${sobrou.join(" ")}`);
  if (desfazer(html) !== original) throw new Error(`${f}: desfazer não devolve o original`);
  fs.writeFileSync(arq, html);
  console.log(`${f}: ${(html.match(MARCADO) || []).length} blocos, ${Buffer.byteLength(original)} → ${Buffer.byteLength(html)} bytes`);
}
console.log(DESFAZER ? `desfeito em ${paginas.length} páginas` : `${paginas.length} páginas`);
