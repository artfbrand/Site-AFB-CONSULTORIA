/*
 * Registro canônico dos serviços da AFB Engenharia & Consultoria Elétrica.
 *
 * Este site é HTML/CSS/JS estático, sem build e sem framework — não há
 * templating que leia este arquivo automaticamente. Ele existe como a
 * ÚNICA fonte de referência para os textos abaixo: o dropdown "Serviços"
 * no menu, a página /servicos, /servicos/eficiencia-energetica e as
 * páginas de sub-serviço têm esses mesmos valores escritos à mão no
 * HTML de cada arquivo.
 *
 * Ao mudar um título, subtítulo ou descrição, atualize aqui primeiro e
 * depois replique nos arquivos abaixo:
 *   - index.html                                        (dropdown desktop + item mobile)
 *   - servicos.html                                      (cards da página índice geral)
 *   - servicos/eficiencia-energetica.html                (hero, cards de sub-serviço, <head>)
 *   - servicos/eficiencia-energetica/<slug>.html          (título, texto, <head>)
 *   - servicos/manutencao-subestacao.html                (<head>)
 *   - TODOS os arquivos acima têm cópia própria do menu — um serviço ou
 *     sub-serviço novo precisa ser adicionado no dropdown/menu mobile de
 *     cada um deles também.
 *
 * menuLabel: rótulo curto usado só no menu suspenso (o card/página usa "titulo").
 */

var SERVICOS = [
  {
    id: "eficiencia-energetica",
    slug: "eficiencia-energetica",
    titulo: "Eficiência Energética",
    subtitulo: "Redução de custos com energia",
    descricaoCurta: "Revisão de demanda contratada, enquadramento tarifário e ações de redução de consumo, com ganho já na próxima fatura.",
    subServicos: [
      {
        id: "analise-tarifaria",
        slug: "analise-tarifaria",
        menuLabel: "Análise Tarifária",
        titulo: "Análise Tarifária e Relatório GMT",
        descricaoCurta: "Estudamos o histórico de consumo, avaliamos o enquadramento tarifário e a demanda contratada ideal, e identificamos multas por reativo, ultrapassagem e demais custos evitáveis. Fazemos a representação junto à concessionária e acompanhamos a adequação até a economia aparecer na fatura.",
        whatsappTexto: "Olá, tenho interesse no serviço de Análise Tarifária!"
      },
      {
        id: "mercado-livre",
        slug: "mercado-livre",
        menuLabel: "Mercado Livre de Energia",
        titulo: "Migração para o Mercado Livre de Energia",
        descricaoCurta: "Somos credenciados nas principais comercializadoras do país e cotamos com todas elas para apresentar a melhor proposta por kWh. Intermediamos a negociação do início ao fim. Trabalhamos com Mercado Livre de Energia, Geração Distribuída e energia por assinatura.",
        whatsappTexto: "Olá, tenho interesse no serviço de Migração para o Mercado Livre de Energia!"
      },
      {
        id: "qualidade-de-energia",
        slug: "qualidade-de-energia",
        menuLabel: "Qualidade de Energia (QEE)",
        titulo: "Estudo de Qualidade de Energia (QEE)",
        descricaoCurta: "Medimos e analisamos a energia da instalação para identificar perdas, distúrbios que danificam equipamentos e riscos à operação. Inclui correção do fator de potência para eliminar multas por reativo, estudo do perfil de consumo e diagnóstico com plano de ação priorizado.",
        whatsappTexto: "Olá, tenho interesse no serviço de Estudo de Qualidade de Energia!"
      },
      {
        id: "credito-icms",
        slug: "credito-icms",
        menuLabel: "Crédito de ICMS",
        titulo: "Laudo de Crédito de ICMS sobre Energia",
        descricaoCurta: "A energia aplicada ao processo produtivo gera direito a crédito de ICMS, parcela que costuma ser relevante na conta conforme o perfil de consumo. Elaboramos o relatório técnico acompanhado de ART, que dá respaldo à apropriação e reduz a exposição em fiscalizações. Atuamos junto a contabilidade parceira especializada.",
        whatsappTexto: "Olá, tenho interesse no serviço de Laudo de Crédito de ICMS!"
      }
    ]
  },
  {
    id: "manutencao-subestacao",
    slug: "manutencao-subestacao",
    titulo: "Manutenção em Subestações",
    tituloPagina: "Manutenção em Subestações de Média Tensão",
    metaTitulo: "Manutenção em Subestações de Média Tensão | AFB Engenharia & Consultoria Elétrica",
    subtitulo: "Média tensão, preventiva e laudos",
    descricaoCurta: "Manutenção preventiva, ensaios elétricos, termografia e relatório técnico com ART para instalações de média tensão.",
    escopoEquipamentos: [
      "Transformadores de potência",
      "Transformadores de corrente (TC)",
      "Transformadores de potencial (TP)",
      "Disjuntores de média tensão",
      "Chaves seccionadoras",
      "Relés de proteção",
      "Barramentos, conexões e cabos",
      "Sistema de aterramento",
      "Cubículos, isoladores e estrutura"
    ],
    servicos: [
      { id: "manutencao-preventiva", titulo: "Manutenção Preventiva Completa", whatsappTexto: "Olá, tenho interesse em Manutenção Preventiva de Subestação!" },
      { id: "ensaios-eletricos", titulo: "Ensaios Elétricos em Equipamentos", whatsappTexto: "Olá, tenho interesse em Ensaios Elétricos em Subestação!" },
      { id: "termografia", titulo: "Termografia", whatsappTexto: "Olá, tenho interesse em Termografia em Subestação!" },
      { id: "reles-protecao", titulo: "Ensaios e Parametrização de Relés de Proteção", whatsappTexto: "Olá, tenho interesse em Ensaios e Parametrização de Relé de Proteção!" },
      { id: "protecao-seletividade", titulo: "Estudo de Proteção e Seletividade", whatsappTexto: "Olá, tenho interesse em Estudo de Proteção e Seletividade!" },
      { id: "oleo-isolante", titulo: "Análise de Óleo Isolante", whatsappTexto: "Olá, tenho interesse em Análise de Óleo Isolante!" },
      { id: "projeto-subestacao", titulo: "Projeto e Documentação de Subestação", whatsappTexto: "Olá, tenho interesse em Projeto de Subestação!" }
    ],
    subServicos: []
  }
];
