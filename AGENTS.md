# AGENTS.md — Site AFB Engenharia (www.afbenergia.com.br)

## Papéis
- Dono: Arthur (iniciante em programação). Fala português; responda em português simples.
- Orquestrador: Claude (no chat). Escreve os prompts, os textos e as decisões.
- Executor: você. Implementa EXATAMENTE o prompt recebido, valida, faz commit e push, e entrega um relatório.
- Não tome decisões de produto, texto ou design por conta própria.

## Regras inegociáveis
1. Nunca trabalhe na main. Todo trabalho vai para a branch v2-estrutura.
   Merge para a main só quando o prompt disser "MERGE (aprovado pelo Arthur)", e sempre com --ff-only.
2. Proibido sem autorização escrita do Arthur: git reset --hard, git clean, git push --force, rebase de branch publicada, exclusão em massa de arquivos.
3. Se encontrar qualquer inconsistência ou contradição no prompt, ou um arquivo diferente do esperado: PARE, explique e não corrija por conta própria.
4. Não invente texto. Não invente economia, números, casos, clientes, credenciais, certificações nem depoimentos.
   O texto vem do prompt ou dos arquivos _design/*.md, copiado literalmente.
5. Preserve o Design System atual: reorganize, não redesenhe.
   Não troque cores, fontes ou espaçamentos que o prompt não peça.
6. Commits pequenos e reversíveis.
   - Adicione os arquivos pelo nome; nunca use git add . nem -A.
   - Nunca commite Arthur-Brandao-Orientacoes-Site.pdf nem package-lock.json.
7. Não retire o noindex de páginas rasas (/diagnostico, /privacidade).
   Mudança de URL exige: redirect 301 no vercel.json, canonical, sitemap, links internos e teste da URL antiga e da nova.
8. Build ou commit passando não significa tarefa concluída. Valide como pede a seção Validação.

## Ambiente
- Windows com PowerShell.
- Arquivos em CRLF e UTF-8 sem BOM. Mantenha esse padrão em tudo o que editar.
- Hospedagem: Vercel, com deploy pelo GitHub (artfbrand/Site-AFB-CONSULTORIA) e cleanUrls: true.
- Preview da branch: afb-consultoria-git-v2-estrutura-artfbrand1.vercel.app (pede login; quem testa é o Arthur).
- O site é estático: HTML, CSS e JS puros, sem framework.

## Estrutura
- Home (index.html):
  - autocontida, com CSS próprio e GSAP + ScrollTrigger + Lenis
  - NÃO carrega base.css
- Páginas internas:
  - base.css + base.js (menu)
  - servico.css + servico.js (páginas de serviço, Quem Somos e Contato)
- cookies.js:
  - banner LGPD + GA4 Consent Mode (G-2TLLY5G438)
  - eventos clique_whatsapp e clique_email
  - o deslocamento dos botões flutuantes vale só no celular
- Menu (24 páginas e a 404), igual em todas; /diagnostico usa barra própria:
  - Serviços (dropdown: Todos os serviços, grupo Eficiência com 6 páginas, grupo Subestações com 9 páginas e grupo Energia Solar e Mobilidade com 2 páginas)
  - Como Funciona
  - Blog (entre Como Funciona e o logo; no ☰ depois de Como Funciona; também no rodapé)
  - logo ao centro
  - Quem Somos e Contato
  - botão "Diagnóstico 360°"
  - hambúrguer a partir de 1024 px
- Rodapé: links, endereço e CNPJ 69.350.036/0001-00.
- Sitemap com 27 URLs (inclui /blog e os 3 artigos). /diagnostico e /privacidade ficam fora dele e com noindex.
- JSON-LD:
  - BreadcrumbList + Service nas páginas de serviço
  - ProfessionalService na Home, em /quem-somos e em /contato
  - WebSite na Home
- vercel.json tem 301:
  - regras por host para o domínio antigo afbconsultorias.com.br (manter até ele vencer)
  - analise-tarifaria → gestao-de-fatura
- Imagens:
  - .webp, com width, height e alt
  - loading="lazy" e decoding="async" abaixo da dobra
- _design/ guarda os textos aprovados e não é publicado.
- WhatsApp: (31) 97554-9075. E-mail: contato@afbenergia.com.br.

## Validação (toda entrega)
- Larguras 375, 768 e 1440 (e 1366×768 quando envolver o topo da Home), sem rolagem horizontal.
- Nenhum link quebrado nem imagem inexistente (verifique por grep/script).
- O texto visível muda apenas onde o prompt pediu: compare antes e depois.
- JSON-LD válido e node --check nos scripts alterados.
- CRLF sem BOM nos arquivos alterados.
- git diff --stat apenas com os arquivos esperados.

## Relatório (formato)
- Título "RELATÓRIO <nome da etapa>".
- Em português simples, com seções numeradas iguais às do prompt.
- Para cada item: o que foi feito e como foi validado.
- No final:
  - hash do commit
  - saída do push
  - git log --oneline -3
  - hashes de origin/main e origin/v2-estrutura
  - git status
- Avisos e riscos no topo do relatório.

## Estado atual
- Executor: Claude Code ou Codex (o mesmo AGENTS.md vale para os dois).
- main com tudo até b1ce4e8 (Blocos W e W2 no ar); a v2-estrutura tem o Bloco B (blog), a ser publicado no merge seguinte.
- Formulário do Diagnóstico 360° no ar: a função api/diagnostico.js envia pelo SMTP da Locaweb (contato@afbenergia.com.br, nodemailer 10.0.9), com a Resend como reserva. Variáveis só na Vercel: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, RESEND_API_KEY, DIAG_TO e DIAG_FROM.
- Menu: painel "Serviços" no desktop e botão Diagnóstico 360° na barra do celular, com a mesma marcação nas 24 páginas com menu e na 404. O painel tem os grupos Eficiência Energética, Subestações e Energia Solar e Mobilidade.
- Revisão final no ar: banner de cookies compacto no celular, marca-d'água fatura.webp na Home, botão do rodapé "Fazer o Diagnóstico 360°" e limpeza dos arquivos antigos.
- SEO-1 e SEO-1b no ar (textos em _design/textos-seo1-auditoria.md): link para o Diagnóstico 360° nas páginas de Eficiência, /quem-somos e /contato; /servicos com o diagnóstico como botão principal; região Belo Horizonte e região metropolitana no rodapé, em /quem-somos, no hub de Subestações, em /contato e nos títulos/descrições; JSON-LD com @id #empresa; clique_diagnostico também nas internas; página 404.html.
- GA-1: o GA4 (G-2TLLY5G438) só carrega em www.afbenergia.com.br. Em qualquer outro endereço (Preview, localhost, testes) o gtag.js não é inserido; gtag() e dataLayer continuam existindo como fila local. Consent Mode (negado por padrão, liberado com "Aceitar") sem mudança.
- Bloco I na v2-estrutura: Home aprovada no commit d87a8b6; páginas /servicos/energia-solar e /servicos/carregadores-veiculares; dois cartões novos em /servicos; terceira coluna no menu; nova frase no rodapé; sitemap com 23 URLs. A seção 1 de _design/textos-i-inteligencia-energetica.md é obsoleta; as seções 2 a 5 continuam válidas.
- Bloco W na v2-estrutura (lead WhatsApp):
  - todo link de WhatsApp (a[href*="wa.me"] e api.whatsapp.com) abre a janela "Conte um pouco sobre a sua energia" (assets/js/whatsapp-lead.js + assets/css/whatsapp-lead.css, nas 24 páginas com menu, na 404 e no /diagnostico). Exceção: links com data-wa-direto (fallback da tela de erro do /diagnostico).
  - ao enviar: WhatsApp abre na hora com a mensagem montada (celular: mesma aba; desktop: nova aba) e os dados vão em paralelo para api/lead-whatsapp.js, que grava na planilha Google (webhook Apps Script) e avisa por e-mail em DIAG_TO pelo mesmo SMTP/Resend do diagnóstico (api/diagnostico.js exporta as funções de envio em module.exports.envio).
  - variáveis novas só na Vercel: SHEETS_WEBHOOK_URL e SHEETS_TOKEN. Sem SHEETS_WEBHOOK_URL a função responde ok e só registra no log.
  - GA4: abertura_form_whatsapp (ao abrir), envio_form_whatsapp (perfil, faixa_gasto, pagina) e clique_whatsapp agora no envio, não mais no clique do botão.
  - script da planilha e passo a passo em tools/google-apps-script/ (pasta fora do deploy pelo .vercelignore).
  - /privacidade com a seção "Contato pelo WhatsApp".
- Bloco W2 na v2-estrutura:
  - botão .btn-whatsapp (fundo #25D366, texto #0D3C1F, contraste 6,3:1, ícone à esquerda) em assets/css/base.css e no CSS da Home. Herda tamanho, padding, fonte e raio do botão principal ao lado (ex.: class="svc-cta-btn btn-whatsapp").
  - .btn-par junta Diagnóstico + WhatsApp: lado a lado no desktop e empilhados em largura total até 600 px.
  - Home: topo, Diagnóstico 360° e chamada final com o botão "Conversar pelo WhatsApp". Páginas internas: o WhatsApp principal ficou verde, e em /servicos e Energia Solar o link virou botão ao lado do Diagnóstico, com o mesmo texto.
  - /diagnostico: os links de WhatsApp da tela de erro e da tela de sucesso têm data-wa-direto (vão direto, sem formulário).
  - e-mail do lead sai com o nome "Site AFB" (campo nomeRemetente); o do diagnóstico continua "AFB Diagnóstico".
- Bloco B (blog) na v2-estrutura:
  - /blog (blog.html) e 3 artigos em blog/*.html, gerados a partir de _design/textos-blog-artigos.md (texto exato) pelo script C:afb-testesloggerar-blog.cjs. Para mudar um texto: altere o .md e rode o gerador de novo.
  - estilo em assets/css/blog.css (reaproveita servico.css). Fotos do Artigo 2 em .webp em assets/images/fotos/.
  - JSON-LD: Blog + BreadcrumbList na lista; BlogPosting (autor Arthur Felipe Brandão, publisher #empresa) + BreadcrumbList nos artigos.
  - data de publicação 22/10/2026 (datePublished, dateModified, texto do artigo e sitemap). Se o merge for em outra data, atualizar DATA_ISO/DATA_TXT no gerador, gerar de novo e atualizar o sitemap.
  - bloco "Artigos sobre este tema" em 13 páginas de serviço (Eficiência e Subestações).
  - formulário de WhatsApp: nomes "Blog" e "Blog — {tema}" e pré-marcação por artigo em assets/js/whatsapp-lead.js.
  - 7 links internos da lista do .md não foram colocados porque a frase exata não existe no texto aprovado (ver relatório do Bloco B).
- Pendências conhecidas (não mexer sem prompt):
  - troca da foto de termografia
  - trocar a chave da Resend por uma de somente envio (adiada pelo Arthur)
