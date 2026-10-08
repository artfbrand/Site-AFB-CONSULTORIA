# Textos do Bloco F1b — Ajustes da Home + espaço do Diagnóstico Energético 360°

Revisado com a ferramenta copy-edit (fatos travados, change log aprovado pelo Arthur em 08/10/2026).
Fonte EXATA para o executor. Não alterar palavras. Onde houver [DETALHE PENDENTE], deixar exatamente o texto indicado no item e reportar.

---

## PARTE 1 — Textos aprovados (entram visíveis agora)

### 1.1 Topo
- H1: Sua empresa pode estar pagando mais do que deveria pela energia. Nós encontramos onde e corrigimos.
  (manter o destaque visual atual na palavra "corrigimos.")
- Subtítulo: Para empresas atendidas em média tensão. Fazemos uma análise 360° em três frentes: contratação de energia, instalação (máquinas, equipamentos e subestação) e impostos na fatura. A redução possível é de 10% a 30%, conforme o perfil de consumo e da instalação.
  (negrito apenas em "A redução possível é de 10% a 30%")
- Sai a frase: "E cuidamos da sua subestação, da manutenção ao projeto."
- Abaixo do botão (sem mudança): Diagnóstico energético gratuito e sem compromisso.

### 1.2 Cartão 01 — trocar só a primeira frase
- Antes: Enquadramento errado, modalidade tarifária inadequada e cobranças evitáveis drenam o caixa todo mês.
- Depois: Enquadramento errado, modalidade tarifária inadequada e cobranças evitáveis, como a multa por baixo fator de potência, drenam o caixa todo mês.

### 1.3 Cartão 02 — corpo novo (título sem mudança: "Os danos nos equipamentos começam antes de qualquer alarme")
Harmônicos, desequilíbrios e afundamentos de tensão queimam equipamentos aos poucos e elevam o consumo. O dano é silencioso, e a fatura raramente revela a causa. O estudo de qualidade de energia identifica esses distúrbios na sua instalação e indica a correção. O resultado é menos perda de energia, equipamentos que duram mais e menos manutenção causada por energia de má qualidade.

### 1.4 Fecho de "O problema"
- Frase (sem mudança): O primeiro passo não é cortar custo. É enxergar o que está oculto.
- Link de texto logo abaixo (estilo de link, não botão): Descubra as oportunidades da sua empresa no diagnóstico gratuito →
  - Formulário desligado (agora): abre o WhatsApp, com a mesma mensagem do botão do topo.
  - Formulário ligado (depois): vai para /diagnostico.

### 1.5 As duas áreas
- H2: Eficiência energética para pagar menos. Subestação em dia para não parar.
- Texto: Atuamos nas duas pontas: como a energia é comprada e tributada, e como ela chega e é usada na sua planta.
- Coluna Eficiência Energética, linha "Instalação" passa a ser: Instalação: qualidade de energia, correção do fator de potência e redução de perdas

### 1.6 Diferencial — cartão "Do campo à engenharia"
Arthur começou como eletricista de redes e linhas aéreas, foi supervisor do Centro de Serviços Integrados da Distribuição e chegou a engenheiro de expansão de ativos de alta tensão. Por isso as recomendações consideram o que funciona em campo, não só no projeto.

---

## PARTE 2 — Espaço do Diagnóstico Energético 360° (pronto, mas DESLIGADO)

Estratégia: quando o formulário enviar dados, ele vira o caminho principal (decisão do Arthur) e o WhatsApp passa a ser a alternativa. Até lá, tudo fica escondido e o site continua exatamente como está, com o WhatsApp como principal.
Um único interruptor liga tudo: `DIAGNOSTICO_FORM_ATIVO` (false agora).

### 2.1 Topo (só aparece quando ligado)
- Botão principal: Fazer o Diagnóstico 360° gratuito → /diagnostico
- Link secundário logo abaixo/ao lado: ou fale pelo WhatsApp
- Microtexto: Gratuito. Você recebe um relatório com as oportunidades encontradas nas três frentes.
- Quando ligado, o botão atual do WhatsApp do topo some (o link secundário o substitui).

### 2.2 Seção nova "Diagnóstico Energético 360°" (só aparece quando ligada)
Local: depois da faixa "Em campo" e antes de "Como funciona".
- Etiqueta: DIAGNÓSTICO ENERGÉTICO 360°
- H2: Descubra em qual das três frentes sua empresa está pagando a mais
- Texto: Responda o questionário sobre o seu consumo, a sua instalação e a sua fatura. Analisamos as respostas e você recebe um relatório com as oportunidades encontradas.
- Três itens:
  1. Contratação de energia — tarifa, modalidade e mercado
  2. Instalação — máquinas, equipamentos e subestação
  3. Impostos — ICMS na fatura de energia
- Linha abaixo dos itens: Gratuito e sem compromisso. [DETALHE PENDENTE: tempo para responder]
  (o executor coloca apenas "Gratuito e sem compromisso." e reporta o pendente)
- Botão: Fazer o Diagnóstico 360° gratuito → /diagnostico
- Link secundário: Prefere conversar? Fale pelo WhatsApp

### 2.3 Chamada do meio ("Não sabe por qual frente começar?")
- Desligado: como está (botão WhatsApp).
- Ligado: o mesmo título e texto; o botão vira "Fazer o Diagnóstico 360° gratuito" → /diagnostico.

### 2.4 Chamada final ("O diagnóstico é gratuito e sem compromisso")
- Desligado: como está.
- Ligado: botão principal "Fazer o Diagnóstico 360° gratuito" → /diagnostico; abaixo, link "ou fale pelo WhatsApp".

---

## Antes de ligar o interruptor (checklist do Arthur, fase do formulário)
1. O formulário envia os dados (para e-mail ou planilha) e foi testado.
2. Tela de agradecimento dizendo o próximo passo e o prazo de retorno.
3. Aviso de privacidade no formulário (LGPD) com link para /privacidade.
4. Evento no Google Analytics para o envio do formulário.
5. Tempo para responder medido (para preencher o [DETALHE PENDENTE]).
6. Página /diagnostico com o nome "Diagnóstico Energético 360°".
