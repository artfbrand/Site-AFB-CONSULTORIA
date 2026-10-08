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
- Menu (21 páginas), igual em todas:
  - Serviços (dropdown: Todos os serviços, grupo Eficiência com 5 páginas, grupo Subestações com 9 páginas)
  - Como Funciona
  - logo ao centro
  - Quem Somos e Contato
  - botão "Solicitar análise" (WhatsApp)
  - hambúrguer a partir de 1024 px
- Rodapé: links, endereço e CNPJ 69.350.036/0001-00.
- Sitemap com 20 URLs. /diagnostico e /privacidade ficam fora dele e com noindex.
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
- Concluídos e na main: A, B1, B2, C, D, E, F1.
- Na v2-estrutura, aguardando merge: F1b e F1b-2 (Diagnóstico 360° ligado; o formulário ainda não envia dados, o que foi aceito pelo Arthur enquanto o site não é divulgado).
- Próximas etapas, nesta ordem:
  1. Nova página de serviço: Correção de Fator de Potência (Eficiência Energética).
  2. G1 e G2: efeitos visuais da Home levados às páginas internas (piloto e depois o site todo).
  3. F2: auditorias finais de SEO e conversão.
  4. Formulário do Diagnóstico 360° (envio de dados, agradecimento, LGPD, evento GA4).
- Pendências conhecidas (não mexer sem prompt):
  - limpeza de arquivos antigos (.png substituídos, logo-diagnostico.png, servicos-data.js)
  - troca da foto de termografia
  - botão flutuante do WhatsApp encostando no botão do topo no celular enquanto o banner de cookies está aberto
