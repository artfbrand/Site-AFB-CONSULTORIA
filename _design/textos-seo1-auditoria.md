# Textos do Bloco SEO-1 — Auditoria de SEO e conversão (13/10/2026)

Feito com as ferramentas seo-audit, seo-fix-plan e copy-edit, só com fatos já confirmados pelo Arthur.
Decisões do Arthur em 13/10/2026: link do diagnóstico só nas páginas de Eficiência, /servicos, /quem-somos e /contato (não nas de Subestações); região principal Belo Horizonte e região metropolitana; criar página 404.
Fonte EXATA para o executor. Não alterar palavras, não acrescentar números, prazos, clientes ou promessas.
Aprovação: colar o prompt "BLOCO SEO-1" no Claude Code vale como aprovação do Arthur.

---

## 1. Link para o Diagnóstico 360° nas páginas internas

Texto do link (estilo de link de texto, igual ao "ou fale pelo WhatsApp" da Home, logo abaixo do botão de WhatsApp):
ou faça o Diagnóstico 360° gratuito, em 3 a 5 minutos →
Destino: /diagnostico (mesma aba)

Onde entra:
- Hub de Eficiência (/servicos/eficiencia-energetica) e as 6 páginas de Eficiência (gestão de fatura, mercado livre, energia por assinatura, qualidade de energia, correção de fator de potência, crédito de ICMS): abaixo do botão de WhatsApp da abertura e abaixo do botão de WhatsApp da chamada final.
- /quem-somos: abaixo dos 2 botões "Conversar pelo WhatsApp".
- /contato: abaixo do botão "Conversar pelo WhatsApp".
- NÃO entra nas páginas de Subestações (hub e 9 serviços).

## 2. /servicos — seção "Não sabe por onde começar?" (diagnóstico vira o principal)

- H2 (sem mudança): Não sabe por onde começar?
- Texto: Responda o questionário sobre o seu consumo, a sua instalação e a sua fatura, em 3 a 5 minutos. Você recebe um relatório com as oportunidades encontradas.
- Botão principal: Fazer o Diagnóstico 360° gratuito → /diagnostico
- Link secundário abaixo: Prefere conversar? Fale pelo WhatsApp → WhatsApp (mesma mensagem que o botão atual usa)

## 3. Página 404 (nova)

- Title: Página não encontrada | AFB Engenharia
- Meta robots: noindex
- Etiqueta: ERRO 404
- H1: Esta página não existe ou mudou de endereço
- Texto: O site da AFB foi reorganizado e alguns endereços mudaram. Comece pelo Diagnóstico 360° ou veja todos os serviços.
- Botão principal: Fazer o Diagnóstico 360° gratuito → /diagnostico
- Botão secundário: Ver os serviços → /servicos
- Link de texto: Voltar para o início → /
- Menu e rodapé iguais aos das outras páginas. Não entra no sitemap.

## 4. Região: Belo Horizonte e região metropolitana

### 4.1 Rodapé (todas as páginas, incluindo a 404)
- Antes: Minas Gerais e demais estados
- Depois: Belo Horizonte e região metropolitana, Minas Gerais e demais estados

### 4.2 Quem Somos, bloco "Onde atendemos"
- Antes: Sede em Pedro Leopoldo (MG). Atendimento em Minas Gerais e demais estados.
- Depois: Sede em Pedro Leopoldo, na região metropolitana de Belo Horizonte (MG). Atendimento em Belo Horizonte e região metropolitana, Minas Gerais e demais estados.

### 4.3 Títulos e descrições (title + og:title + twitter:title; description + og:description + twitter:description)

Home (/)
- Title: Eficiência Energética e Subestações em BH e Região | AFB Engenharia
- Description: Consultoria em eficiência energética e engenharia de subestações para empresas atendidas em média tensão em Belo Horizonte e região. Diagnóstico energético gratuito.

Hub de Eficiência (/servicos/eficiencia-energetica)
- Title: Consultoria em Eficiência Energética para Empresas em BH | AFB Engenharia
- Description: Contrato, instalação e impostos numa só análise, para empresas atendidas em média tensão em BH e região. Redução de 10% a 30% no custo de energia, conforme o perfil.

Hub de Subestações (/servicos/subestacoes)
- Title: Manutenção, Projeto e Obras de Subestações em BH e Região | AFB Engenharia
- Description: Manutenção preventiva e corretiva, ensaios, proteção, projeto e obras de subestações de 13,8 kV a 69 kV em Belo Horizonte, região metropolitana e Minas Gerais. Relatório técnico com ART.

Manutenção preventiva (/servicos/subestacoes/manutencao-preventiva)
- Title: Manutenção Preventiva de Subestação em BH e Região | AFB Engenharia
- Description: Campanha anual de manutenção preventiva em subestação de 13,8 kV a 69 kV em BH e região: inspeção, limpeza técnica, ensaios elétricos, termografia e relatório com ART.

Manutenção corretiva (/servicos/subestacoes/manutencao-corretiva)
- Title: Manutenção Corretiva de Subestação em BH e Região | AFB Engenharia
- Description: Atendimento corretivo em subestação de média tensão em BH e região, com diagnóstico da falha, correção sob responsabilidade técnica com ART e prazo definido conforme o contrato.

Termografia (/servicos/subestacoes/termografia)
- Title: Termografia Industrial em Painéis e Subestações em BH | AFB Engenharia
- Description: sem mudança.

Serviços (/servicos) — sem região
- Title: Serviços de Eficiência Energética e Subestações | AFB Engenharia
- Description: sem mudança.

As demais páginas mantêm título e descrição atuais.

## 5. Dados estruturados (JSON-LD)

- ProfessionalService (Home, /contato, /quem-somos): acrescentar "@id": "https://www.afbenergia.com.br/#empresa"; "logo" passa a ser https://www.afbenergia.com.br/assets/images/logo-horizontal-v2.png; "areaServed" passa a ser a lista: Belo Horizonte (City), Região Metropolitana de Belo Horizonte (AdministrativeArea), Minas Gerais (State), Brasil (Country).
- Service (16 páginas de serviço): "provider" passa a apontar para "@id": "https://www.afbenergia.com.br/#empresa", com "name": "AFB Engenharia & Consultoria Elétrica" e "url": "https://www.afbenergia.com.br"; "areaServed" igual à lista acima.
- /servicos: acrescentar BreadcrumbList (Início › Serviços), no mesmo padrão das outras páginas.
