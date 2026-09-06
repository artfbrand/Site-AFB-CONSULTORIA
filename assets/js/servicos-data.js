/*
 * Registro canônico dos serviços da AFB Consultoria Energética.
 *
 * Este site é HTML/CSS/JS estático, sem build e sem framework — não há
 * templating que leia este arquivo automaticamente. Ele existe como a
 * ÚNICA fonte de referência para os textos abaixo: o dropdown "Serviços"
 * no menu (index.html), a página /servicos e as 4 páginas filhas têm
 * esses mesmos valores escritos à mão no HTML de cada arquivo.
 *
 * Ao mudar um título, subtítulo ou descrição, atualize aqui primeiro e
 * depois replique nos arquivos abaixo:
 *   - index.html                              (dropdown desktop + item mobile)
 *   - servicos.html                           (cards da página índice)
 *   - servicos/<slug>.html                    (título, subtítulo, descrição, <head>)
 */

var SERVICOS = [
  {
    id: "eficiencia-energetica",
    slug: "eficiencia-energetica",
    titulo: "Eficiência Energética",
    subtitulo: "Redução de custos com energia",
    descricaoCurta: "Revisão de demanda contratada, enquadramento tarifário e ações de redução de consumo, com ganho já na próxima fatura."
  },
  {
    id: "qualidade-de-energia",
    slug: "qualidade-de-energia",
    titulo: "Estudos de QEE",
    subtitulo: "Qualidade de Energia Elétrica",
    descricaoCurta: "Medição e análise para identificar a causa de equipamentos que queimam, máquinas que falham e cobranças indevidas na conta."
  },
  {
    id: "credito-icms-energia",
    slug: "credito-icms-energia",
    titulo: "Laudo de Crédito de ICMS",
    subtitulo: "Recuperação sobre a energia elétrica",
    descricaoCurta: "Levantamento técnico do percentual de energia aplicado à produção para apuração do crédito de ICMS, inclusive retroativo."
  },
  {
    id: "manutencao-subestacao",
    slug: "manutencao-subestacao",
    titulo: "Manutenção em Subestações",
    subtitulo: "Média tensão, preventiva e laudos",
    descricaoCurta: "Manutenção preventiva, termografia e documentação técnica para manter a instalação segura e a apólice de seguro válida."
  }
];
