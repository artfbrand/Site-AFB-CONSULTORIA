# Plano do Blog — AFB Engenharia (registrado em 22/10/2026)

Status: PLANEJAMENTO. Textos dos 3 artigos APROVADOS em 22/10/2026 (_design/textos-blog-artigos.md). Nada foi construído ainda. Construir depois do Bloco W (formulário WhatsApp).

## 1. Objetivo
- Atrair pelo Google gestores, síndicos e responsáveis técnicos que pesquisam problemas que a AFB resolve.
- Cada artigo leva para a página de serviço correspondente e para o Diagnóstico 360° / WhatsApp.
- Mostrar autoridade técnica real (E-E-A-T): autor Arthur Felipe Brandão, engenheiro eletricista, 11 anos na Cemig.

## 2. Estrutura técnica (mesmo padrão do site: HTML estático na Vercel, cleanUrls)
- /blog → lista de artigos (cartões: título, resumo, tema, data, tempo de leitura).
- /blog/{slug} → artigo.
- Modelo de artigo: breadcrumb (Início › Blog › Título) · etiqueta do tema · H1 · autor + data de publicação/atualização + tempo de leitura · sumário com âncoras · corpo (H2/H3, listas, tabelas quando ajudarem) · caixa "Fale com um engenheiro" no meio · FAQ · chamada final (Diagnóstico 360° + WhatsApp) · link para o serviço relacionado · 3 artigos relacionados · bio curta do autor.
- SEO: title e meta description próprios, canonical, Open Graph com imagem, um H1, JSON-LD BlogPosting (author Person Arthur Felipe Brandão, publisher #empresa, datePublished/dateModified) + BreadcrumbList. Entrar no sitemap.xml.
- Navegação: link "Blog" no menu (desktop e mobile) e no rodapé, nas páginas de serviço um bloco "Artigos sobre este tema".
- Imagens: fotos reais da AFB sempre que possível (WebP, com alt descritivo). Sem banco de imagem genérico que pareça falso.

## 3. Regras editoriais
- Nada inventado: números, prazos, normas e exemplos só com fonte verificada ou confirmação do Arthur.
- Normas citadas (NR-10, ABNT NBR, ANEEL/PRODIST) só depois de conferidas na fonte oficial.
- Exemplos de campo anônimos (sem nome de cliente), aprovados pelo Arthur.
- Tom: técnico, direto, para quem decide (gestor/síndico), explicando termos técnicos na primeira vez.
- Tamanho de referência: 1.200 a 2.000 palavras, o necessário para responder bem a pergunta.
- Fluxo: rascunho (arquiteto, com as ferramentas de copy e SEO) → revisão técnica do Arthur → executor publica → pedir indexação no Search Console.
- Ritmo sugerido: 2 artigos por mês.

## 4. Primeiros 3 artigos

### Artigo 1 — Eficiência energética
- Pergunta: Como uma consultoria de eficiência energética pode reduzir custos?
- URL: /blog/consultoria-eficiencia-energetica-reduzir-custos
- Busca principal: "consultoria de eficiência energética"; secundárias: "como reduzir custo de energia na empresa", "eficiência energética para empresas", "redução de custo de energia elétrica".
- Roteiro:
  1. O que uma consultoria de eficiência energética faz (e o que não faz)
  2. Onde a empresa perde dinheiro com energia: tarifa e modalidade, demanda contratada, energia reativa (fator de potência), forma de compra (Mercado Livre, energia por assinatura), ICMS, perdas na instalação
  3. Como funciona na prática: diagnóstico → plano com números → implementação → acompanhamento das faturas
  4. Quanto dá para economizar: 10% a 30% sem investimento, conforme o perfil; com geração solar dimensionada para todo o consumo, até 95%
  5. Quando vale a pena contratar
  6. Como escolher uma consultoria (o que perguntar antes de contratar)
  7. Perguntas frequentes
- Liga para: /servicos/eficiencia-energetica e subpáginas; CTA Diagnóstico 360°.
- Arthur fornece: 1 a 2 exemplos reais anônimos (tipo de empresa, o que foi encontrado).

### Artigo 2 — Subestações de média tensão
- Pergunta: Quais são os principais ensaios realizados em uma manutenção de subestação?
- URL: /blog/ensaios-manutencao-subestacao-media-tensao
- Busca principal: "ensaios em subestação"; secundárias: "manutenção preventiva de subestação", "ensaios em transformador", "manutenção de subestação de média tensão".
- Roteiro:
  1. Por que ensaiar (falhas que não aparecem na inspeção visual; segurança; seguro; NR-10)
  2. Transformador: resistência de isolamento, relação de transformação, resistência ôhmica dos enrolamentos, análise do óleo isolante (rigidez dielétrica, teor de água, acidez, gases dissolvidos)
  3. Disjuntor: resistência de contato, tempos de operação, isolamento
  4. TCs e TPs: relação, polaridade, isolamento
  5. Relé de proteção: ensaio por injeção de corrente e conferência de ajustes
  6. Cabos, muflas e malha de aterramento
  7. Termografia (com a instalação em carga)
  8. Com que frequência fazer (a confirmar com o Arthur e com a fonte normativa)
  9. O que um bom relatório deve conter (valores medidos, comparação, ART)
  10. Perguntas frequentes
- Liga para: /servicos/subestacoes, ensaios-eletricos, termografia, analise-de-oleo-isolante, ensaio-rele-de-protecao, manutencao-preventiva.
- Arthur fornece: periodicidade que recomenda; fotos reais de ensaio (já existem fotos de transformador e painéis de relés).

### Artigo 3 — Qualidade de energia
- Pergunta: Como um laudo de qualidade de energia pode ajudar a sua empresa a reduzir custos com manutenção e paradas não programadas?
- URL: /blog/laudo-qualidade-de-energia-reduzir-manutencao-paradas
- Busca principal: "laudo de qualidade de energia"; secundárias: "análise de qualidade de energia", "harmônicos na rede elétrica", "queima de equipamentos causa".
- Roteiro:
  1. O que é qualidade de energia, em linguagem simples
  2. Os distúrbios mais comuns: harmônicos, desequilíbrio de tensão, afundamentos e elevações de tensão, baixo fator de potência
  3. Como cada um vira custo: queima e aquecimento de equipamentos, perda de vida útil, desligamentos de máquinas, paradas, multa por energia reativa
  4. Como a medição é feita (analisador instalado com a planta em operação; período de medição a confirmar com o Arthur e com o PRODIST Módulo 8)
  5. O que o laudo entrega e como ler os resultados
  6. Soluções mais comuns: filtros, banco de capacitores com reatores de dessintonia, ajustes na instalação
  7. Sinais de que a sua empresa precisa de um laudo
  8. Perguntas frequentes
- Liga para: /servicos/eficiencia-energetica/qualidade-de-energia e correcao-fator-de-potencia.
- Arthur fornece: período de medição que usa; equipamento/analisador (se quiser citar); exemplo real anônimo.

## 5. Próximos passos
1. Terminar o Bloco W (formulário WhatsApp + planilha).
2. Arthur responde as perguntas de cada artigo (seção 4, "Arthur fornece").
3. Escrever os 3 rascunhos e revisar com o Arthur.
4. Prompt único para o executor: /blog, modelo de artigo, 3 artigos, menu/rodapé, sitemap, links nos serviços.
5. Publicar, pedir indexação, acompanhar no Search Console em 4 a 8 semanas.

## 6. Respostas do Arthur (22/10/2026)
- Eficiência: ainda não há exemplos reais. Os artigos NÃO trazem casos; quando ajudar, usar situações típicas explicitamente marcadas como "exemplo ilustrativo", sem números de resultado.
- Subestação: a AFB recomenda os ensaios de manutenção uma vez por ano (apresentar como recomendação da AFB, não como exigência de norma).
- Qualidade de energia: medição de 7 dias, com 1.008 leituras válidas (intervalos de 10 minutos), conforme o PRODIST Módulo 8 da ANEEL. Conferir a redação na versão vigente do Módulo 8 antes de publicar.

## 7. Direção editorial definida pelo Arthur (22/10/2026) — PREVALECE sobre as seções 4 e 6 onde houver conflito

### Artigo 1 (reformulado)
- Título-pergunta: Como uma consultoria em eficiência energética pode reduzir custos, aumentar a vida útil dos equipamentos, diminuir a manutenção e garantir mais confiabilidade para o sistema elétrico?
- NÃO usar "exemplo ilustrativo" nem casos. Linguagem de blog, explicativa e criativa, mostrando como uma consultoria bem feita traz todos esses benefícios.
- Contextualizar, cada um com seu benefício: contratação de energia (tarifa, demanda, Mercado Livre, assinatura) · laudo de crédito de ICMS · análise de qualidade de energia (QEE) · manutenção de subestação · energia solar fotovoltaica.
- Fio condutor: a consultoria olha o sistema inteiro (conta + instalação + operação), e cada frente gera economia, vida útil, menos manutenção ou mais confiabilidade.
- Números permitidos: 10% a 30% sem investimento, conforme o perfil; até 95% com solar dimensionado para todo o consumo.
- Possível URL nova: /blog/consultoria-eficiencia-energetica-reduzir-custos (manter).

### Artigo 2
- Falar dos ensaios por equipamento e dos principais ensaios de cada um: TCs, TPs, relés de proteção, transformadores, seccionadoras, disjuntores, cabos e aterramento.
- Reforçar a importância dos ensaios e do RELATÓRIO (valores medidos registrados, histórico para comparar ano a ano, responsabilidade técnica/ART, segurança, seguradora).
- Periodicidade: recomendação da AFB de 1 vez por ano.

### Artigo 3
- Reforçar que o relatório/laudo de qualidade de energia IDENTIFICA os distúrbios.
- Explicar os principais distúrbios.
- Solução: dimensionamento de filtros para resolver os problemas.
- Benefícios a destacar: reduzir custos com manutenção, paradas de máquinas e queima de equipamentos; maior segurança operacional e dos processos da empresa.
- Medição: 7 dias, 1.008 leituras válidas, conforme PRODIST Módulo 8 (conferir redação vigente).

## 8. Botão "Blog" no menu (pedido do Arthur em 22/10/2026)

### Desktop (mega menu atual)
- Grupo da esquerda passa a ser: Serviços ▾ · Como Funciona · Blog
  (o "Blog" fica entre "Como Funciona" e o logo central, no espaço marcado pelo Arthur).
- Grupo da direita continua: Quem Somos · Contato · botão "Diagnóstico 360°".
- Mesmo estilo dos outros links (fonte, cor, hover, sublinhado/estado ativo).
- Estado ativo: destacado quando a página for /blog ou /blog/qualquer-artigo.
- Conferir o equilíbrio visual com o logo central e que nada quebra ou se sobrepõe em 1024, 1280 e 1440 px. Se em 1024 px faltar espaço, reduzir o espaçamento entre os links (não esconder o Blog).

### Celular / tablet
- A barra superior continua: logo | botão central "Diagnóstico 360°" | ☰ (o Blog NÃO entra na barra, para não apertar).
- Dentro do menu sanduíche (☰): item "Blog" logo depois de "Como Funciona", no mesmo padrão dos outros itens, com área de toque de pelo menos 44 px.
- Conferir em 360, 390 e 768 px: menu abre, rola, fecha, sem rolagem horizontal.

### Onde aplicar
- Em TODAS as páginas com menu: Home, /servicos, hubs, todas as páginas de serviço (inclusive Energia Solar e Carregadores Veiculares), /quem-somos, /contato, /privacidade, 404, /blog e todos os artigos. (/diagnostico tem barra própria e fica de fora.)
- Rodapé: link "Blog" na coluna "Navegação".
- O menu deve continuar idêntico em todas as páginas.

## 9. Como iniciar o desenvolvimento (depois do formulário WhatsApp)

Ordem:
1. Arquiteto escreve os textos dos 3 artigos (seções 3, 6 e 7) com as ferramentas de copy e SEO e salva em _design/textos-blog-artigos.md.
2. Arthur revisa a parte técnica e aprova.
3. Colar no executor o prompt abaixo.

Prompt para o executor (Claude Code / Codex):

"Bloco B — Blog. Siga o AGENTS.md. Trabalhe só em v2-estrutura (confira que está igual à origin/main e sem arquivos rastreados alterados; se não, PARE). NÃO faça merge.
Fonte EXATA: _design/plano-blog.md (estrutura, regras, menu) e _design/textos-blog-artigos.md (textos dos artigos). Não invente texto, números, normas ou casos.
1. Crie /blog (lista de artigos) e um modelo de artigo conforme a seção 2 do plano, no padrão visual atual do site (base.css, efeitos, botões flutuantes, cookies, GA4 condicional). Todos os botões de WhatsApp do blog abrem o formulário de qualificação do Bloco W, com a pré-marcação definida em textos-blog-artigos.md.
2. Publique os 3 artigos com as URLs da seção 4, title/description/canonical/OG, JSON-LD BlogPosting + BreadcrumbList, autor Arthur Felipe Brandão.
3. Menu e rodapé conforme a seção 8, em todas as páginas.
4. Bloco 'Artigos sobre este tema' nas páginas de serviço relacionadas (seção 4, 'Liga para').
5. sitemap.xml com /blog e os 3 artigos.
6. Testes: 360, 390, 768, 1024, 1280 e 1440 px; menu desktop e sanduíche; console sem erros; sem rolagem horizontal; links internos; JSON-LD válido; testes anteriores passando. Screenshots em C:\afb-testes\blog\.
Commits pequenos, push só em v2-estrutura, relatório com URL do Preview. Se algo sair do esperado em texto ou escopo, PARE e explique; ajustes técnicos pode resolver e registrar."
