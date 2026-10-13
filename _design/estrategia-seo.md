# Estratégia de posicionamento orgânico — AFB Engenharia & Consultoria Elétrica

Data da análise: 07/09/2026
Base auditada: código do site em produção (commit `f4f0b76`), 16 rotas.

**Como ler este documento.** Tudo que está marcado como **[FATO]** foi verificado
diretamente no código, com arquivo e linha. Tudo que está marcado como **[HIPÓTESE]**
é raciocínio sobre comportamento de busca e precisa ser validado no Search Console.
Não há nenhum número de volume de busca, concorrência ou CPC neste documento, porque
não tenho acesso a essas fontes — e um número inventado seria pior que nenhum número.

**Uma informação que mudou a análise:** você confirmou que a base de operação é
**Belo Horizonte / MG (DDD 31)**. Isso torna o telefone que está no site hoje
(`wa.me/5584988822015`, DDD 84 — Rio Grande do Norte) uma inconsistência a resolver,
e não um dado a preservar. Voltarei a isso na seção 5.

---

## 1. Diagnóstico

O site tem uma base melhor do que a média do setor: URLs limpas e hierárquicas,
copy técnica honesta e específica, credenciais reais do engenheiro responsável,
normas citadas nominalmente (NR-10, NBR 14039, NETA ATS) e uma página de subestações
(1.279 palavras) que já está pronta para competir. O problema não é qualidade de
texto — é distribuição de força e captura de intenção.

**Os três problemas mais graves, por impacto no negócio:**

**1º — A home não converte e não distribui autoridade.** Os cinco links de WhatsApp
da home apontam para o placeholder `55XXXXXXXXXXX` e o formulário de contato tem
`action="#"` **[FATO: index.html:1126, 3512, 3528, 3586, 3606, 3656]**. Todo tráfego
orgânico que chegar na home hoje encontra CTAs mortos. Além disso, a home tem 1.217
palavras e **zero links internos para qualquer página de serviço** dentro do `<main>`
**[FATO]** — a página mais forte do site não passa autoridade para nenhuma outra.

**2º — Metade do negócio não existe na home.** A seção "Soluções" (`#solucoes`, o
destino do item de menu mais clicado) tem 7 cards, e **todos os 7 são de eficiência
energética** — fatura, tarifa, mercado livre, GD, assinatura, QEE, ICMS
**[FATO: index.html:2189-2311]**. Subestações de média tensão, que é a frente com
maior ticket e maior urgência percebida, não aparece uma única vez. Os cards nem
sequer são links.

**3º — Quatro páginas magras e indexadas competindo pelos termos mais valiosos.**
As sub-páginas de eficiência energética têm 54, 55, 68 e 70 palavras, estão
indexáveis e estão submetidas no sitemap **[FATO]**. São exatamente as páginas que
deveriam ranquear para "análise tarifária", "mercado livre de energia", "qualidade
de energia" e "crédito de ICMS sobre energia" — e são as mais fracas do site.

---

## 2. Mapa de páginas

### 2.1 Situação atual verificada

Contagem de palavras = texto dentro de `<main>`, excluindo menu, rodapé, scripts e
estilos. Links internos = links dentro de `<main>`, ignorando menu e rodapé (que são
idênticos em todas as páginas e não sinalizam relevância temática).

| Rota | Palavras | Index? | Sitemap? | Canonical | JSON-LD | Links internos recebidos |
|---|---|---|---|---|---|---|
| `/` | 1.217 | sim | sim | **ausente** | **nenhum** | 8 (só das páginas de subestações, via breadcrumb) |
| `/servicos` | 89 | sim | sim | **ausente** | **nenhum** | 8 (idem) |
| `/servicos/eficiencia-energetica` | 776 | sim | sim | **ausente** | **nenhum** | 5 |
| `/servicos/eficiencia-energetica/analise-tarifaria` | **54** | sim | sim | **ausente** | **nenhum** | 1 |
| `/servicos/eficiencia-energetica/mercado-livre` | **55** | sim | sim | **ausente** | **nenhum** | 1 |
| `/servicos/eficiencia-energetica/qualidade-de-energia` | **70** | sim | sim | **ausente** | **nenhum** | 1 |
| `/servicos/eficiencia-energetica/credito-icms` | **68** | sim | sim | **ausente** | **nenhum** | 1 |
| `/servicos/subestacoes` | 1.279 | sim | sim | ok | Breadcrumb + Service + FAQPage | 15 |
| `/servicos/subestacoes/manutencao-preventiva` | 255 | sim | sim | ok | Breadcrumb + Service | 7 |
| `/servicos/subestacoes/ensaios-eletricos` | 95 | **noindex** | não | ok | Breadcrumb + Service | 8 |
| `/servicos/subestacoes/termografia` | 100 | **noindex** | não | ok | Breadcrumb + Service | 8 |
| `/servicos/subestacoes/ensaio-rele-de-protecao` | 96 | **noindex** | não | ok | Breadcrumb + Service | 8 |
| `/servicos/subestacoes/estudo-de-seletividade` | 95 | **noindex** | não | ok | Breadcrumb + Service | 8 |
| `/servicos/subestacoes/analise-de-oleo-isolante` | 97 | **noindex** | não | ok | Breadcrumb + Service | 8 |
| `/servicos/subestacoes/projeto-de-subestacao` | 92 | **noindex** | não | ok | Breadcrumb + Service | 8 |
| `/diagnostico` | 0 estáticas (conteúdo montado por JS) | **noindex** | não | ausente | nenhum | 4 |

Redirects 301 ativos **[FATO: vercel.json:4-6]**: `/servicos/qualidade-de-energia`,
`/servicos/credito-icms-energia` e `/servicos/manutencao-subestacao` — todos
apontando para os destinos corretos. Essa parte está correta e não precisa de ação.

### 2.2 Intenção, funil e termo proposto

| Rota | Intenção atendida | Funil | Termo principal proposto | Termos secundários | Status |
|---|---|---|---|---|---|
| `/` | Quem quer reduzir custo de energia na empresa | Descoberta → Decisão | consultoria em energia elétrica para indústria | redução de custo de energia, consultoria energética BH | **Precisa de reforço** (CTA quebrado + 0 links de saída) |
| `/servicos` | Navegação, não busca | — | (não perseguir termo) | — | Adequada como hub |
| `/servicos/eficiencia-energetica` | Reduzir a conta sem investimento | Consideração | eficiência energética industrial | redução de custo com energia elétrica | **Precisa de reforço** (sem FAQPage, sem canonical) |
| `.../analise-tarifaria` | Revisar contrato/demanda com a concessionária | Consideração | revisão de demanda contratada | enquadramento tarifário, análise da conta de energia | **Precisa de reforço** (54 palavras) |
| `.../mercado-livre` | Avaliar migração para o ACL | Consideração | migração para o mercado livre de energia | ACL, GD livre, energia por assinatura | **Precisa de reforço** (55 palavras) |
| `.../qualidade-de-energia` | Equipamento queimando / oscilação | Descoberta → Consideração | estudo de qualidade de energia | harmônicos, afundamento de tensão, fator de potência | **Precisa de reforço** (70 palavras) |
| `.../credito-icms` | Recuperar tributo sobre energia | Consideração | crédito de ICMS sobre energia elétrica | laudo técnico de ICMS, recuperação tributária energia | **Precisa de reforço** (68 palavras) |
| `/servicos/subestacoes` | Contratar manutenção de subestação | Consideração → Decisão | manutenção em subestação de média tensão | NR-10, NBR 14039, laudo com ART | **Adequada** |
| `.../manutencao-preventiva` | Campanha preventiva anual | Decisão | plano de manutenção preventiva de subestação | campanha anual, periodicidade | **Canibaliza o pai** (ver 3.1) |
| `.../ensaios-eletricos` e demais 5 | Serviço técnico específico | Decisão | (por página, ver seção 6) | — | **Falta criar conteúdo** (esqueleto, noindex correto) |
| `/diagnostico` | Formulário de captação | Decisão | (não perseguir termo) | — | Adequada como noindex |

**Distribuição de funil — está desequilibrada [FATO + HIPÓTESE].** Das 9 páginas
indexáveis, 7 são de consideração/decisão e nenhuma é de descoberta pura. Existem
blocos de descoberta dentro de páginas de consideração (a seção "O custo de não
fazer" em `/servicos/subestacoes`, o bloco "O desperdício se esconde na fatura" na
home), mas nenhuma URL própria para capturar quem ainda está no estágio do sintoma.
**[HIPÓTESE]** Como o ciclo de decisão B2B industrial é longo e costuma começar por
um problema operacional concreto, esse é o maior espaço de crescimento — e é onde
concentro o plano de conteúdo da seção 4.

---

## 3. Análises de apoio

### 3.1 Canibalização e sobreposição

**Caso 1 — o mais claro: `/servicos/subestacoes` × `.../manutencao-preventiva`.**
**[FATO]** Os dois titles compartilham os mesmos três termos centrais:

- Pai: "Manutenção em Subestações de Média Tensão | AFB Engenharia & Consultoria Elétrica"
- Filho: "Manutenção Preventiva em Subestação de Média Tensão | AFB Engenharia & Consultoria Elétrica"

O pai tem 1.279 palavras e 15 links internos; o filho tem 255 palavras e 7 links.
**Decisão recomendada:** o **pai fica com o termo genérico** "manutenção em
subestação de média tensão". O filho deve se especializar em intenção diferente —
**periodicidade e escopo da campanha anual** ("plano de manutenção preventiva de
subestação", "de quanto em quanto tempo fazer manutenção em subestação"). Se não
houver conteúdo suficiente para diferenciar, a alternativa honesta é absorver o filho
no pai e redirecionar 301.

**Caso 2 — diluição, não canibalização: QEE em três lugares.** O termo "qualidade de
energia" aparece na home (card 06, `index.html:2289`), no card 03 de
`/servicos/eficiencia-energetica` e na sub-página dedicada de 70 palavras. **[FATO]**
A página mais forte das três (EE index, 776 palavras) não é o alvo pretendido.
**Decisão:** a sub-página fica com o termo, e para isso precisa crescer; a EE index
deve tratar QEE em 2-3 frases e linkar.

**Caso 3 — página sem intenção definida:** `/servicos` (89 palavras). Não é um
problema: é um hub de navegação e cumpre esse papel. **Não perseguir termo com ela.**
Está adequada como está.

**Intenções relevantes que nenhuma página atende hoje [FATO — verificado por busca
em todo o código]:**

- Multa de energia reativa / baixo fator de potência (mencionado de passagem, sem página)
- Ultrapassagem de demanda (idem)
- Exigência de laudo elétrico por seguradora (mencionado só dentro do bloco de risco)
- Como ler / conferir a conta de energia de alta tensão
- Periodicidade legal de manutenção e o que a NR-10 exige do contratante
- Termografia como serviço avulso indexável (a página existe mas está noindex)

### 3.2 Vocabulário: nosso × do cliente

Este é o ponto mais importante da análise, e é onde o site tem a maior perda.

**O site atende bem o público técnico e mal o não técnico.** **[FATO]** A copy das
páginas de subestações é excelente para gerente de manutenção — "resistência ôhmica
dos enrolamentos", "suportabilidade dielétrica sob tensão aplicada", "levantamento
das curvas com injeção de corrente". Já para o dono, o gerente industrial e o
controller, os termos que aparecem nos H1 e titles são majoritariamente do
vocabulário do setor, não do vocabulário de quem tem o problema.

**Jargões que o cliente provavelmente não digita [FATO no código / HIPÓTESE na busca]:**

| Onde está | Termo usado hoje | O que a pessoa provavelmente digita |
|---|---|---|
| `analise-tarifaria.html:6` (title e H1) | "Relatório GMT" | "revisão de demanda contratada", "conta de luz da empresa muito alta", "reduzir demanda contratada" — **GMT é vocabulário interno de concessionária** |
| `mercado-livre.html:6` (title e H1) | "Migração para o ACL - Ambiente de Contratação Livre" | "mercado livre de energia", "vale a pena migrar para o mercado livre", "quanto economiza no mercado livre" — a sigla ACL está na frente e o termo popular ficou de fora do início |
| `qualidade-de-energia.html:6` | "Estudo de Qualidade de Energia (QEE)" | "equipamento queimando na fábrica", "oscilação de energia", "queda de tensão na indústria" |
| `projeto-de-subestacao.html:6` | "databook" | "documentação de subestação", "regularizar subestação sem projeto", "projeto elétrico para a concessionária" |
| `subestacoes.html` (seção escopo) | "cubículo", "muflas", "seccionadora" | corretos para o técnico — **manter**, mas acompanhar de explicação curta para o não técnico |
| Home, `index.html:1299` | "enquadramento errado, modalidade tarifária inadequada" | "por que minha conta de luz aumentou", "estou pagando tarifa errada" |

**Onde o site já acerta e deve ser copiado como modelo [FATO]:** a descrição de
`/servicos/eficiencia-energetica/qualidade-de-energia` começa com
*"Equipamento que queima sem explicação, máquina que trava, disjuntor que desarma
sozinho"* — isso é vocabulário de sintoma, exatamente o que se busca. O problema é
que essa frase está na meta description e no corpo, mas **não no H1 nem no title**,
que continuam sendo "Estudo de Qualidade de Energia (QEE)".

**Busca por sintoma que o site hoje não captura [HIPÓTESE, a validar no Search
Console]:** o padrão de busca B2B industrial costuma começar pelo evento, não pelo
nome do serviço. Sintomas que a operação vive e que o site tem autoridade para
responder, mas para os quais não existe página:

- "equipamento queimando na fábrica" / "motor queima toda hora"
- "multa de reativo na conta de luz" / "o que é energia reativa excedente"
- "ultrapassagem de demanda o que é" / "multa por ultrapassagem de demanda"
- "disjuntor desarmando sem motivo na indústria"
- "transformador esquentando"
- "seguradora está exigindo laudo de manutenção elétrica"
- "de quanto em quanto tempo tem que fazer manutenção em subestação"
- "como ler a conta de energia de alta tensão"

Cada um desses vira um conteúdo na seção 4.

### 3.3 Arquitetura de conteúdo e links internos

**O que está bom [FATO] — e não precisa mexer:**

- A hierarquia de URLs comunica corretamente a relação entre os temas:
  `/servicos/subestacoes/termografia` deixa explícito que termografia pertence a
  subestações. Isso está certo e é melhor que a média do setor.
- Os 3 redirects 301 estão corretos e cobrem as URLs antigas.
- O bloco de subestações é o mais bem interligado do site: o índice linka para as 7
  sub-páginas e cada sub-página linka para o índice e para as 6 irmãs.

**O que está errado [FATO]:**

1. **A home é um beco sem saída.** Único link interno dentro do `<main>`:
   `/diagnostico`. Não linka para `/servicos`, nem para eficiência energética, nem
   para subestações. Os 7 cards da seção "Soluções" **não são links** — são
   `<article>` sem `<a>` (`index.html:2190-2309`).
2. **As 4 sub-páginas de eficiência energética são becos sem saída.** Cada uma tem
   exatamente 1 link de saída (volta ao pai) e recebe exatamente 1 link. Não linkam
   entre si — ao contrário das de subestações, que já têm bloco de relacionados.
3. **Página órfã de conteúdo:** nenhuma página linka para `/servicos` a partir de
   eficiência energética. `/servicos` só recebe link das 8 páginas de subestações
   (via breadcrumb), porque **o bloco de EE não tem breadcrumb** — só o de
   subestações tem.
4. **Texto de link não descritivo [FATO]:** "Saiba mais →" aparece 6 vezes em
   `servicos/subestacoes.html` (um por card). Como o título do card logo acima já é
   um link com o texto completo do serviço, são dois links para a mesma URL, sendo
   um com texto genérico. É o único caso de link não descritivo do site — os demais
   ("← Manutenção em Subestações", os títulos dos cards, a lista de relacionados)
   usam o nome do destino e estão corretos.

**Arquitetura de tópicos proposta.** Duas pilares, não quatro — porque comercialmente
as quatro frentes se agrupam em dois problemas distintos (custo × risco):

```
PILAR A — Eficiência Energética (/servicos/eficiencia-energetica)
  Sub-serviços (páginas de dinheiro):
    ├── revisão de demanda contratada e enquadramento tarifário
    ├── migração para o mercado livre de energia
    ├── estudo de qualidade de energia
    └── crédito de ICMS sobre energia elétrica
  Conteúdo de apoio (captura de sintoma → linka para o sub-serviço):
    ├── multa de reativo: o que é e como eliminar        → qualidade de energia
    ├── ultrapassagem de demanda: por que acontece        → demanda contratada
    ├── como ler a conta de energia de alta tensão        → demanda contratada
    └── mercado livre vale a pena para a minha empresa?   → mercado livre

PILAR B — Subestações de Média Tensão (/servicos/subestacoes)
  Sub-serviços (páginas de dinheiro):
    ├── manutenção preventiva (campanha anual)
    ├── ensaios elétricos
    ├── termografia
    ├── ensaio e parametrização de relé
    ├── estudo de proteção e seletividade
    ├── análise de óleo isolante
    └── projeto e documentação
  Conteúdo de apoio:
    ├── periodicidade: de quanto em quanto tempo fazer     → manutenção preventiva
    ├── o que a seguradora exige de laudo elétrico          → manutenção preventiva
    ├── NR-10 e NBR 14039: o que exigem do contratante      → pilar B
    └── equipamento queimando: é o equipamento ou a rede?   → cruza com Pilar A (QEE)
```

**Regra de ligação:** todo conteúdo de apoio linka para exatamente uma página-pilar
ou de sub-serviço, com texto de link igual ao nome do serviço. As páginas de
sub-serviço linkam de volta ao pilar e para 2-3 irmãs relacionadas (padrão que as
subestações já usam e que EE precisa adotar). A home passa a linkar para os dois
pilares dentro do conteúdo, não só pelo menu.

### 3.4 Autoridade e confiança

**O que o site já demonstra e está bom [FATO] — não inventar problema aqui:**

- Nome completo e formação do responsável: Arthur Felipe Brandão, engenheiro
  eletricista pela PUC-MG, pós em Automação do Sistema Elétrico de Potência (IEC
  PUC-MG), especialização em Mercado Livre (CCEE), pós em Análise de Distúrbios
  Elétricos (ISOE) — `index.html:2625`.
- Experiência específica e verificável: 11 anos na CEMIG, trajetória de eletricista
  de redes a supervisão — `index.html:2641, 2648`.
- ART citada como entregável em praticamente todas as páginas de serviço.
- Normas citadas nominalmente e no contexto certo: NR-10, ABNT NBR 14039, NETA ATS
  (`servicos/subestacoes.html`, seção "Por que a AFB").
- Fotos reais de campo com alt descritivo: *"Arthur Brandão operando painel elétrico
  NXAIR de média tensão em subestação de campo"* (`index.html:3412`). Isso está
  acima da média e deve ser mantido.

**O que falta [FATO — zero ocorrências em todo o código]:**

| Falta | Onde deveria aparecer | Por que pesa |
|---|---|---|
| **Número de registro no CREA** | Rodapé de todas as páginas + bloco do engenheiro na home | Quem emite ART tem registro. Não exibir é a lacuna de credibilidade mais visível para o público técnico |
| **CNPJ e razão social** | Rodapé | Comprador industrial verifica antes de abrir processo de compra |
| **Endereço** | Rodapé + página de contato | Sem endereço não há Google Empresas nem sinal local (ver 3.5) |
| **Telefone real** | Rodapé — hoje: `WhatsApp: (xx) xxxxx-xxxx` (`index.html:3629`) | CTA morto |
| **Casos com números** | Página própria + blocos nas pilares | O site afirma "economias típicas de 10% a 32%" (`index.html:1299`) e "em média 20% da fatura" para ICMS (`index.html:2306`) sem nenhum caso que sustente. Afirmação sem lastro é risco reputacional e desperdício de um ativo forte |
| **Segmentos/tipos de cliente atendidos** | Home e pilares | "Atendemos indústria de alimentos, metalúrgica, hospital..." é sinal de especialização |
| **Depoimentos ou referências** | Home e pilares | Zero no site |
| **Autoria assinada no conteúdo técnico** | Rodapé de cada página de serviço e de cada conteúdo novo | Sem byline, o Google não conecta o conteúdo à pessoa credenciada |
| **Política de Privacidade e Termos** | Rodapé — hoje `href="#"` (`index.html:3647-3648`) | Links mortos; com formulário coletando dado pessoal, a política é exigência de LGPD |

### 3.5 Busca local

**[FATO]** O site declara área de atendimento, mas de forma vaga: *"Minas Gerais e
demais estados"* no rodapé de todas as páginas e *"Atendimento em Minas Gerais e
demais estados"* no hero de `/servicos/subestacoes`. Não há cidade, endereço nem
telefone real em lugar nenhum.

**[FATO]** Existe uma inconsistência de NAP (nome-endereço-telefone) grave: o número
usado nas páginas de serviço é `wa.me/5584988822015` — **DDD 84, Rio Grande do
Norte** — enquanto a operação, conforme você confirmou, é **Belo Horizonte, DDD 31**.
Isso precisa ser resolvido antes de qualquer ação de SEO local, porque o telefone é
um dos três dados que o Google usa para casar o site com o perfil da empresa.

**[HIPÓTESE]** Busca B2B industrial com qualificador geográfico costuma aparecer em
duas formas: a explícita ("manutenção de subestação em Belo Horizonte") e a implícita
(a mesma busca sem cidade, resolvida pelo Google com base na localização do usuário).
A segunda é provavelmente maior e não exige texto com cidade — exige sinal de
entidade local: perfil no Google Empresas, endereço consistente e citações.

**Como incorporar localidade sem criar páginas artificiais por cidade:**

1. **Não criar** `/manutencao-subestacao-belo-horizonte`, `/...-contagem`,
   `/...-betim`. Páginas por cidade com texto trocado são o padrão que o Google
   penaliza como conteúdo duplicado de baixo valor.
2. **Uma página só:** `/atendimento` ou `/onde-atuamos`, com a região metropolitana
   de BH nominalmente citada, o raio real de atendimento em MG, e a condição para
   atendimento fora do estado.
3. **Menção natural nos títulos das duas pilares:** "... em Belo Horizonte e Minas
   Gerais" no final do title, não no começo (o termo técnico vem primeiro).
4. **Casos com localização:** "Indústria metalúrgica em Contagem/MG" faz mais pela
   busca local que uma página de cidade vazia.
5. **`areaServed` no JSON-LD** com os lugares reais (ver 3.6).

**Fora do site (não é código, mas é o que mais pesa em local):**

- **Google Empresas:** criar perfil com endereço em BH, categoria principal
  "Consultor de engenharia" ou "Empresa de engenharia elétrica", fotos das
  execuções em campo (as mesmas ref-01/ref-02 já servem), e horário.
- **NAP consistente** em todos os canais: mesmo nome jurídico, mesmo endereço,
  mesmo telefone DDD 31 — no site, no Google Empresas, no LinkedIn e em qualquer
  diretório.
- **Citações setoriais:** CREA-MG (registro público de pessoa jurídica), FIEMG,
  associações do setor elétrico, e diretórios de fornecedores industriais.
  Cada citação com NAP idêntico reforça a entidade.
- **LinkedIn da empresa** com o mesmo nome e endereço — hoje os links sociais do
  rodapé apontam para `href="#"` (`index.html:3597, 3601`).

### 3.6 Dados estruturados

**O que já existe e está correto [FATO]:** as 8 páginas de subestações têm
`BreadcrumbList` + `Service` válidos, e `/servicos/subestacoes` tem `FAQPage` com as
5 perguntas reais da página. Validei o parse de todos os blocos — nenhum erro de
sintaxe. Essa parte está boa.

**O que existe e está incorreto [FATO]:**

- `"areaServed": {"@type": "Place", "name": "Minas Gerais e demais estados"}` —
  presente nas 8 páginas de subestações. "demais estados" não é um lugar
  identificável; o Google não consegue resolver isso para nenhuma entidade
  geográfica. Deve virar uma lista: `[{"@type":"City","name":"Belo Horizonte"},
  {"@type":"State","name":"Minas Gerais"}]`.

**O que falta [FATO — zero ocorrências no site]:**

| Tipo | Onde | Campos essenciais |
|---|---|---|
| `Organization` + `LocalBusiness` | Uma vez, na home | `name`, `legalName`, `taxID` (CNPJ), `address` (BH), `telephone` (DDD 31), `email`, `url`, `logo`, `sameAs` (LinkedIn/Instagram), `areaServed`, `founder` |
| `Person` | Home, ligado à Organization como `founder`/`employee` | `name`, `jobTitle` ("Engenheiro Eletricista"), `alumniOf` (PUC-MG), `hasCredential` (CREA), `knowsAbout` |
| `FAQPage` | `/servicos/eficiencia-energetica` | As 5 perguntas que **já existem visíveis** em `servicos/eficiencia-energetica.html:518-572` e não estão marcadas |
| `BreadcrumbList` | `/servicos`, EE index e as 4 sub-páginas EE | Mesmo padrão já usado em subestações |
| `Service` | EE index e as 4 sub-páginas EE | Mesmo padrão já usado em subestações, com `isPartOf` apontando para a pilar |
| `Article` | Cada conteúdo novo da seção 4 | `headline`, `author` (Person do Arthur), `datePublished`, `dateModified`, `about` |

### 3.7 Títulos e descrições — atual × proposto

**[FATO] Problema estrutural que afeta todos os titles:** o sufixo
"| AFB Engenharia & Consultoria Elétrica" tem 38 caracteres e consome quase todo o
espaço visível. Titles atuais e seus comprimentos: mercado-livre 91,
manutencao-preventiva 93, ensaios-eletricos 107 caracteres. O Google corta por volta
de 55-60 caracteres. Recomendação transversal: **encurtar o sufixo para "| AFB
Engenharia"** (16 caracteres) em todas as páginas, e padronizar o separador — hoje
convivem "·" (home, EE) e "|" (subestações).

Nas propostas abaixo o termo principal vem no início e a marca no fim.

**`/` — index.html:6-7**
- Title atual (78): `AFB Engenharia & Consultoria Elétrica · Redução de Custos com Energia Elétrica`
- **Proposto (59):** `Consultoria em Energia Elétrica para Indústria | AFB Engenharia`
- Desc atual (183, será truncada): `Consultoria especializada em redução de custos com energia elétrica. Análise técnica completa — fatura, modalidade tarifária, qualidade de energia e crédito de ICMS. 11 anos de CEMIG.`
- **Proposta (152):** `Reduza o custo de energia da sua indústria com análise técnica de fatura, contrato, qualidade de energia e ICMS. 11 anos dentro da CEMIG. BH e MG.`
- Observação: o H1 da home (`index.html:1111`) não contém nenhum termo de busca. É
  uma boa headline de conversão e não recomendo trocá-la — recomendo **adicionar um
  H2 logo abaixo do bloco hero** com o termo, o que resolve sem estragar a copy.

**`/servicos` — servicos.html:6-7**
- Title atual (48): `Serviços · AFB Engenharia & Consultoria Elétrica`
- **Proposto (57):** `Serviços de Engenharia Elétrica para Indústria | AFB`
- **Desc proposta (149):** `Duas frentes: redução de custo com energia (fatura, mercado livre, ICMS) e manutenção de subestações de média tensão com laudo e ART. BH e MG.`

**`/servicos/eficiencia-energetica`**
- Title atual (61): `Eficiência Energética · AFB Engenharia & Consultoria Elétrica`
- **Proposto (58):** `Eficiência Energética Industrial: Reduza a Conta | AFB`
- Desc atual (117): `Revisão de demanda contratada, enquadramento tarifário e ações de redução de consumo, com ganho já na próxima fatura.`
- **Proposta (155):** `Eficiência energética para indústria: revisão de demanda contratada, enquadramento tarifário, mercado livre e crédito de ICMS. Economia na próxima fatura.`

**`.../analise-tarifaria`**
- Title atual (73): `Análise Tarifária e Relatório GMT · AFB Engenharia & Consultoria Elétrica`
- **Proposto (57):** `Revisão de Demanda Contratada e Análise Tarifária | AFB`
- **Desc proposta (156):** `Revisão de demanda contratada e enquadramento tarifário: eliminamos multa por ultrapassagem e reativo e representamos sua empresa junto à concessionária.`
- Justificativa: "GMT" sai do title (fica no corpo, para o público que conhece o termo).

**`.../mercado-livre`**
- Title atual (91): `Migração para o ACL - Ambiente de Contratação Livre · AFB Engenharia & Consultoria Elétrica`
- **Proposto (56):** `Migração para o Mercado Livre de Energia (ACL) | AFB`
- **Desc proposta (154):** `Migração para o mercado livre de energia: cotamos com as principais comercializadoras e conduzimos a negociação. Também GD livre e energia por assinatura.`
- Justificativa: o termo popular volta para a frente; a sigla fica entre parênteses.

**`.../qualidade-de-energia`**
- Title atual (78): `Estudo de Qualidade de Energia (QEE) · AFB Engenharia & Consultoria Elétrica`
- **Proposto (59):** `Estudo de Qualidade de Energia: Equipamento Queimando | AFB`
- **Desc proposta (157):** `Equipamento que queima sem explicação, máquina que trava, disjuntor que desarma: medimos harmônicos, afundamentos e fator de potência e achamos a causa.`

**`.../credito-icms`**
- Title atual (80): `Laudo de Crédito de ICMS sobre Energia · AFB Engenharia & Consultoria Elétrica`
- **Proposto (58):** `Crédito de ICMS sobre Energia Elétrica: Laudo com ART | AFB`
- **Desc proposta (155):** `Crédito de ICMS sobre energia usada na produção: laudo técnico com ART que dá respaldo à apropriação e reduz exposição em fiscalização. Indústria em MG.`

**`/servicos/subestacoes`**
- Title atual (81): `Manutenção em Subestações de Média Tensão | AFB Engenharia & Consultoria Elétrica`
- **Proposto (60):** `Manutenção de Subestação de Média Tensão em BH | AFB`
- Desc atual (157, está boa): `Manutenção preventiva em subestações de média tensão com ensaios elétricos, termografia e relatório técnico com ART. Conformidade com NR-10 e ABNT NBR 14039.`
- **Proposta (159):** `Manutenção preventiva de subestação de média tensão em BH e MG: ensaios, termografia e relatório com ART. Conformidade com NR-10 e ABNT NBR 14039.`

**`.../manutencao-preventiva`**
- Title atual (93): `Manutenção Preventiva em Subestação de Média Tensão | AFB Engenharia & Consultoria Elétrica`
- **Proposto (59):** `Plano de Manutenção Preventiva de Subestação Anual | AFB`
- **Desc proposta (156):** `Campanha anual de manutenção preventiva de subestação em uma única parada: inspeção, ensaios, termografia e relatório único com plano de ação priorizado.`
- Justificativa: diferencia do pai (ver canibalização, 3.1).

As 6 páginas restantes de subestações estão noindex e recebem title/desc quando a
copy definitiva entrar (seção 4).

---

## 4. Plano de conteúdo

Priorizado por impacto no negócio, não por facilidade. Todo conteúdo deve ser
assinado pelo Arthur, com `Article` + `author` no JSON-LD.

### Prioridade 1 — Completar as páginas que já existem e estão fracas

Antes de criar qualquer conteúdo novo: **9 páginas indexáveis já existem e 4 delas
têm menos de 70 palavras.** Criar conteúdo novo antes de resolver isso é construir
o segundo andar sem terminar o primeiro.

| # | Página | Ação | Meta |
|---|---|---|---|
| 1.1 | `.../qualidade-de-energia` | Expandir de 70 palavras para página completa: sintomas, o que é medido, o que o laudo entrega, FAQ | 700-900 palavras |
| 1.2 | `.../credito-icms` | Expandir: quem tem direito, o que é energia aplicada à produção, papel do laudo e da ART, risco de fazer sem laudo, FAQ | 700-900 palavras |
| 1.3 | `.../analise-tarifaria` | Expandir: o que é demanda contratada, ultrapassagem, reativo, como é a representação junto à concessionária, FAQ | 700-900 palavras |
| 1.4 | `.../mercado-livre` | Expandir: requisitos para migrar, ACL × GD × assinatura (comparação), prazos, riscos, FAQ | 700-900 palavras |
| 1.5 | 6 sub-páginas de subestações | Escrever copy definitiva e remover `noindex` uma a uma | 600-800 palavras cada |

### Prioridade 2 — Conteúdo de captura por sintoma (o que falta no funil)

| Título sugerido | Intenção | Funil | Liga-se a | Por que vale |
|---|---|---|---|---|
| Multa de energia reativa na conta de luz: por que aparece e como eliminar | Sintoma → causa | Descoberta | QEE + análise tarifária | **[HIPÓTESE]** É uma linha da fatura que o financeiro vê e não entende; a busca nasce da conta em mãos |
| Ultrapassagem de demanda: o que é, por que a multa dobra e como corrigir | Sintoma → causa | Descoberta | Análise tarifária | Mesma lógica: item da fatura que gera busca imediata |
| Equipamento queimando na fábrica: é defeito do equipamento ou da rede? | Sintoma | Descoberta | QEE | Cruza a dor do gerente de manutenção com o serviço; hoje o site tem a frase mas não a página |
| Como ler a conta de energia de alta tensão: item por item | Educacional | Descoberta | Análise tarifária | Conteúdo de referência, atrai link e retorno; público controller |
| De quanto em quanto tempo fazer manutenção em subestação? | Pergunta pré-compra | Consideração | Manutenção preventiva | Já é uma FAQ da pilar; merece página própria e resolve a canibalização de 3.1 |
| O que a seguradora exige de laudo elétrico em caso de sinistro | Compliance | Consideração | Manutenção preventiva | Argumento de urgência que já está no bloco de risco, sem página |
| NR-10 e NBR 14039: o que a norma exige de quem tem subestação | Norma | Consideração | Pilar Subestações | Público técnico e de compliance; termo específico e verificável |
| Mercado livre de energia vale a pena para a minha empresa? | Comparação | Consideração | Mercado livre | Pergunta literal de decisão; comparação honesta gera confiança |

### Prioridade 3 — Prova e autoridade

| Conteúdo | Por que |
|---|---|
| 3 a 5 casos reais com número, segmento e cidade | Sustenta os "10% a 32%" e os "20% da fatura" que o site já afirma sem lastro |
| Página "Onde atuamos" | Base da estratégia local sem páginas por cidade (ver 3.5) |
| Página "Quem somos" própria (hoje é só uma âncora `#quem-somos` na home) | Destino para o E-E-A-T, com CREA, formação, ART e foto |

---

## 5. Ações técnicas

Ordenadas por impacto. Arquivo e linha verificados.

### Bloco A — Conversão quebrada (urgente, impacto direto em receita)

| # | Arquivo:linha | Problema | Correção |
|---|---|---|---|
| A1 | `index.html:1126, 3512, 3586, 3606, 3656` | 5 links de WhatsApp com placeholder `wa.me/55XXXXXXXXXXX` | Número real DDD 31 |
| A2 | `servicos.html:400, 417, 461` | 3 links idem | Número real |
| A3 | `servicos/eficiencia-energetica.html:602, 619, 663` | 3 links idem | Número real |
| A4 | `servicos/subestacoes.html:897, 914, 958` | 3 links idem | Número real |
| A5 | 11 páginas restantes | 3 links idem cada (rodapé + flutuante + social) | Número real |
| A6 | `index.html:3528` | `<form action="#">` — formulário de contato não envia | Integrar destino real |
| A7 | `index.html:3629` | Rodapé: `WhatsApp: (xx) xxxxx-xxxx` | Telefone real |
| A8 | Todas as páginas de serviço | `wa.me/5584988822015` (DDD 84/RN) enquanto a operação é BH/DDD 31 | **Confirmar qual é o número correto** e padronizar em todo o site |

> Nota sobre A8: pode ser que o 84 seja um celular seu ativo e legítimo. Se for,
> não é erro técnico — mas continua sendo inconsistência de NAP para SEO local em
> BH, e vale avaliar um número DDD 31 como número público.

### Bloco B — Indexação e sinais básicos

| # | Arquivo | Problema | Correção |
|---|---|---|---|
| B1 | raiz do site | **Não existe `robots.txt`** | Criar com `Sitemap: https://www.afbconsultoria.com.br/sitemap.xml` |
| B2 | `index.html`, `servicos.html`, `servicos/eficiencia-energetica.html` e as 4 sub-páginas EE | **Sem `<link rel="canonical">`** (7 páginas) | Adicionar canonical próprio |
| B3 | `sitemap.xml:16-19` | Inclui as 4 sub-páginas EE, que têm 54-70 palavras | Manter no sitemap **apenas depois** de expandi-las (item 1.1-1.4); enquanto isso são páginas magras submetidas ativamente |
| B4 | `index.html:3647-3648` | "Política de Privacidade" e "Termos de Uso" com `href="#"` | Criar as duas páginas (exigência de LGPD, com formulário coletando dados) |
| B5 | `index.html:3597, 3601` | Links de LinkedIn e Instagram com `href="#"` | Apontar para os perfis reais ou remover |

### Bloco C — Estrutura semântica e dados estruturados

| # | Arquivo:linha | Problema | Correção |
|---|---|---|---|
| C1 | `index.html` | Nenhum JSON-LD | Adicionar `Organization` + `LocalBusiness` + `Person` |
| C2 | `servicos/eficiencia-energetica.html:518-572` | 5 FAQs visíveis sem `FAQPage` | Adicionar, copiando o padrão de `subestacoes.html` |
| C3 | 8 páginas de subestações | `areaServed: "Minas Gerais e demais estados"` não resolve para lugar | Trocar por `City: Belo Horizonte` + `State: Minas Gerais` |
| C4 | EE index + 4 sub-páginas | Sem `Service` e sem `BreadcrumbList` | Replicar o padrão de subestações |
| C5 | EE index + 4 sub-páginas | Sem breadcrumb visível (só subestações tem) | Replicar o componente `.svc-breadcrumb` |
| C6 | `index.html:1111` | H1 sem nenhum termo de busca | Manter o H1 (é boa copy) e **adicionar um H2 com o termo** logo após o hero |

### Bloco D — Títulos, descrições e links internos

| # | Arquivo:linha | Problema | Correção |
|---|---|---|---|
| D1 | Todas as páginas, linha 6 | Sufixo de 38 caracteres trunca todos os titles; separador inconsistente ("·" × "\|") | Encurtar para `\| AFB Engenharia` e padronizar em "\|" |
| D2 | 9 páginas indexáveis, linhas 6-7 | Titles e descs conforme 3.7 | Aplicar os textos propostos |
| D3 | `index.html:2190-2309` | Os 7 cards de "Soluções" não são links | Transformar em links para as páginas de sub-serviço correspondentes |
| D4 | `index.html` (seção Soluções) | Subestações não aparece na home | Adicionar card/bloco da pilar B linkando para `/servicos/subestacoes` |
| D5 | 4 sub-páginas EE | Sem links entre irmãs | Adicionar bloco "Serviços relacionados" (padrão já pronto em subestações) |
| D6 | `servicos/subestacoes.html` (6 cards) | "Saiba mais →" — texto de link genérico duplicando o link do título | Remover o segundo link ou trocar o texto por "Ver [nome do serviço]" |
| D7 | `servicos/subestacoes.html` | Nenhuma imagem de conteúdo (só logo e o SVG do diagrama) | Adicionar 2-3 fotos reais com alt descritivo, no padrão que a home já usa |

---

## 6. Roteiro

### Onda 1 — primeiros 30 dias

| Ação | Esforço | Resultado esperado |
|---|---|---|
| Bloco A completo (WhatsApp, formulário, telefone) | 2-3 h | Todo tráfego atual passa a poder converter. **É a maior alavanca de receita do plano e a mais barata** |
| Bloco B1-B2 (robots.txt + 7 canonicals) | 1-2 h | Base de indexação correta antes de investir em conteúdo |
| D1 + D2 (titles e descriptions das 9 indexáveis) | 3-4 h | **[HIPÓTESE]** Ganho de CTR nas posições já existentes, sem depender de subir de posição |
| D3 + D4 (home linkando para as pilares, incluindo subestações) | 3-4 h | A página mais forte passa a distribuir autoridade; a frente de subestações deixa de ser invisível na home |
| C1 (Organization + LocalBusiness + Person na home) | 2 h | Entidade reconhecível pelo Google, pré-requisito para o Google Empresas |
| Criar perfil no Google Empresas (fora do site) | 2 h | Entrada no pacote local de BH |
| Definir e padronizar o telefone público (A8) | decisão sua | Base do NAP consistente |

### Onda 2 — até 90 dias

| Ação | Esforço | Resultado esperado |
|---|---|---|
| Expandir as 4 sub-páginas EE (itens 1.1-1.4) | 4-6 h por página | As páginas que devem ranquear para os termos comerciais passam a ter conteúdo para competir |
| C2, C4, C5 (FAQPage em EE, Service/Breadcrumb + breadcrumb visível nas 5 páginas EE) | 3-4 h | Paridade técnica entre as duas pilares |
| D5 + D6 (links entre irmãs em EE, corrigir texto de link genérico) | 2 h | Fim dos becos sem saída em EE |
| Resolver a canibalização pai × filho em subestações (3.1) | 2-3 h | Um termo, uma página; evita que as duas se enfraqueçam |
| Escrever 3 conteúdos de sintoma da Prioridade 2 (reativo, ultrapassagem, equipamento queimando) | 6-8 h cada | **[HIPÓTESE]** Entrada em buscas de topo de funil que hoje o site não alcança |
| Página "Onde atuamos" + CREA e CNPJ no rodapé | 4 h | Sinal local e de confiança |
| 2 a 3 casos reais com número e cidade | depende de você liberar dados | Lastro para os percentuais já afirmados no site |

### Contínuo

| Ação | Cadência | Resultado esperado |
|---|---|---|
| Escrever a copy definitiva de 1 sub-página de subestações e remover o `noindex` | 1 por mês | Cobertura crescente de termos técnicos específicos, sem publicar página magra |
| 1 conteúdo de sintoma ou de norma por mês | mensal | Crescimento de topo de funil |
| Revisar consultas do Search Console e ajustar títulos | mensal | Ajuste baseado em dado real, substituindo as hipóteses deste documento |
| Coletar 1 depoimento ou caso por trabalho entregue | por projeto | Prova social acumulada |
| Manter NAP idêntico em novas citações e diretórios | contínuo | Consolidação da entidade local |

---

## 7. Como medir

Todas as hipóteses deste documento devem ser substituídas por dado real do Search
Console. O que acompanhar, por frente do plano:

**Antes de tudo — o que precisa existir:** propriedade no Search Console verificada
(domínio, não prefixo de URL), sitemap submetido, e a linha de base registrada antes
das mudanças da Onda 1. Sem linha de base, não dá para atribuir resultado.

| Frente do plano | Indicador | O que significa |
|---|---|---|
| **Titles e descriptions (D1-D2)** | CTR médio por página, comparando 28 dias antes × 28 dias depois, com a posição média estável | Se a posição não mudou e o CTR subiu, o título novo está funcionando. É o teste mais limpo do plano |
| **Vocabulário e sintoma (Prioridade 2)** | Relatório de Consultas: número de consultas distintas com impressão, e quantas delas são de sintoma ("queimando", "multa", "desarmando", "por que") | Se o site começa a aparecer para consultas de sintoma, a hipótese central da seção 3.2 se confirma |
| **Sub-páginas EE expandidas (1.1-1.4)** | Impressões e posição média por página, filtrando por página | Página magra costuma ter impressão sem clique e posição instável; a estabilização indica que o conteúdo passou a sustentar o termo |
| **Canibalização (3.1)** | Filtrar a consulta "manutenção em subestação" e ver **quantas páginas distintas** aparecem para ela ao longo do tempo | Se duas URLs alternam para a mesma consulta, a canibalização é real e persiste. Se consolidar em uma, foi resolvida |
| **Links internos da home (D3-D4)** | Posição média das duas pilares + relatório de Links > Links internos | O número de links internos para cada pilar deve subir; a posição média é o efeito esperado |
| **Indexação (B1-B3)** | Relatório de Páginas: "Indexada" × "Descoberta, não indexada" × "Rastreada, não indexada" | Página magra costuma cair em "Rastreada, não indexada". É o sinal objetivo de que as 4 sub-páginas EE precisavam do item 1.1-1.4 |
| **Sub-páginas de subestações saindo do noindex** | Aviso "URL enviada marcada como noindex" deve permanecer zerado | Confirma que só entram no sitemap depois que a copy existe |
| **Busca local** | Consultas com nome de cidade + relatório de desempenho do Google Empresas (separado do Search Console) | Mede o efeito do perfil e da página "Onde atuamos" |
| **Dados estruturados (C1-C4)** | Relatório de Aprimoramentos: Perguntas frequentes, Breadcrumbs | Detecção sem erro confirma a marcação; e permite ver se rende resultado rico |

**Cuidado de leitura:** conteúdo novo em site com pouca autoridade costuma levar
semanas para sair de posição instável. Avaliar conteúdo da Onda 2 antes de 8-12
semanas leva a conclusão errada. Já as mudanças de title (Onda 1) aparecem em dias.

---

## Anexo — o que está bom e não deve ser mexido

Para não gerar retrabalho sobre o que já funciona:

- Hierarquia de URLs (`/servicos/pilar/sub-servico`) — comunica corretamente a
  relação entre os temas.
- Os 3 redirects 301 em `vercel.json` — corretos e completos.
- JSON-LD das páginas de subestações — válido e bem estruturado (só o `areaServed`
  precisa de ajuste).
- Interligação interna do bloco de subestações — é o modelo a copiar para EE.
- Copy técnica das páginas de subestações — específica, honesta e com norma citada.
- Alt text das fotos reais na home — descritivo e correto.
- Decisão de manter as 6 sub-páginas de subestações em `noindex` enquanto são
  esqueleto — está certa e deve ser mantida até a copy existir.
- `/diagnostico` em `noindex` — correto para um formulário.
