/*
 * Registro canônico dos serviços da AFB Engenharia & Consultoria Elétrica.
 *
 * Este site é HTML/CSS/JS estático, sem build e sem framework — não há
 * templating que leia este arquivo automaticamente. Ele existe como a
 * ÚNICA fonte de referência para os textos abaixo: o dropdown "Serviços"
 * no menu, a página /servicos, /servicos/eficiencia-energetica,
 * /servicos/subestacoes e as páginas de sub-serviço têm esses mesmos
 * valores escritos à mão no HTML de cada arquivo.
 *
 * Ao mudar um título, subtítulo ou descrição, atualize aqui primeiro e
 * depois replique nos arquivos abaixo:
 *   - index.html                                          (dropdown desktop + item mobile)
 *   - servicos.html                                        (cards da página índice geral)
 *   - servicos/eficiencia-energetica.html                  (hero, cards de sub-serviço, <head>)
 *   - servicos/eficiencia-energetica/<slug>.html            (título, texto, <head>)
 *   - servicos/subestacoes.html                            (hero, cards de sub-serviço, <head>)
 *   - servicos/subestacoes/<slug>.html                      (título, texto, <head>)
 *   - TODOS os arquivos acima têm cópia própria do menu — um serviço ou
 *     sub-serviço novo precisa ser adicionado no dropdown/menu mobile de
 *     cada um deles também.
 *
 * menuLabel: rótulo curto usado só no menu suspenso (navegação).
 * h1 / metaTitulo / metaDescricao: termo de busca — usados no <h1> e no
 * <head> de cada página. NÃO igualar ao menuLabel: o rótulo de menu é
 * curto por decisão de navegação, o h1/title é o termo que as pessoas
 * efetivamente buscam.
 * descricaoCurta: texto usado nos cards (página índice e página do grupo).
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
        descricaoCurta: "Estudamos o histórico de consumo, avaliamos o enquadramento tarifário e a demanda contratada ideal, e identificamos multas por reativo, ultrapassagem e demais custos evitáveis. Fazemos a representação junto à concessionária e acompanhamos a adequação até a economia ser consolidada na fatura.",
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
    id: "subestacoes",
    slug: "subestacoes",
    menuLabel: "Subestações Elétricas",
    menuSubtitulo: "Segurança, média tensão e conformidade",
    h1: "Manutenção em Subestações de Média Tensão",
    metaTitulo: "Manutenção em Subestações de Média Tensão | AFB Engenharia & Consultoria Elétrica",
    metaDescricao: "Manutenção preventiva em subestações de média tensão com ensaios elétricos, termografia e relatório técnico com ART. Conformidade com NR-10 e ABNT NBR 14039.",
    descricaoCurta: "Manutenção preventiva, ensaios elétricos, termografia e relatório técnico com ART para instalações de média tensão.",
    areaAtendimento: "Minas Gerais e demais estados",
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
    subServicos: [
      {
        id: "manutencao-preventiva",
        slug: "manutencao-preventiva",
        menuLabel: "Manutenção Preventiva",
        h1: "Manutenção Preventiva em Subestação",
        metaTitulo: "Manutenção Preventiva em Subestação de Média Tensão | AFB Engenharia & Consultoria Elétrica",
        metaDescricao: "Campanha anual de manutenção preventiva em subestação: inspeção, limpeza técnica, ensaios elétricos, termografia e relatório com ART e plano de ação priorizado.",
        descricaoCurta: "Inspeção detalhada, limpeza técnica de isoladores e cubículos, reaperto de conexões com torque controlado, lubrificação e ajustes mecânicos e funcionais em disjuntores e seccionadoras. É a base da campanha, sobre a qual os ensaios são executados.",
        whatsappTexto: "Olá, tenho interesse em Manutenção Preventiva de Subestação!"
      },
      {
        id: "ensaios-eletricos",
        slug: "ensaios-eletricos",
        menuLabel: "Ensaios Elétricos",
        h1: "Ensaios Elétricos em Equipamentos de Subestação",
        metaTitulo: "Ensaios Elétricos em Subestação: TC, TP, Disjuntor e Transformador | AFB Engenharia & Consultoria Elétrica",
        metaDescricao: "Ensaios elétricos em subestação: resistência de contato e de isolamento, relação de transformação e tensão aplicada em transformadores, TCs, TPs e disjuntores.",
        descricaoCurta: "Resistência de contato, resistência de isolamento, relação de transformação e suportabilidade dielétrica sob tensão aplicada. Executados em transformadores, TCs, TPs, disjuntores e seccionadoras, com valores medidos registrados em relatório para comparação nas campanhas seguintes.",
        whatsappTexto: "Olá, tenho interesse em Ensaios Elétricos em Subestação!"
      },
      {
        id: "termografia",
        slug: "termografia",
        menuLabel: "Termografia",
        h1: "Termografia em Instalações Elétricas",
        metaTitulo: "Termografia Industrial em Painéis e Subestações | AFB Engenharia & Consultoria Elétrica",
        metaDescricao: "Inspeção termográfica em painéis e subestações com a instalação energizada. Identifica pontos quentes antes da falha, com laudo e classificação de gravidade.",
        descricaoCurta: "Inspeção termográfica com a instalação energizada e em carga, que é a única condição em que o defeito aparece. Identifica pontos quentes em conexões, chaves e cabos antes que evoluam para falha, com registro de imagem térmica e classificação de gravidade.",
        whatsappTexto: "Olá, tenho interesse em Termografia em Subestação!"
      },
      {
        id: "ensaio-rele-de-protecao",
        slug: "ensaio-rele-de-protecao",
        menuLabel: "Relé de Proteção",
        h1: "Ensaio e Parametrização de Relé de Proteção",
        metaTitulo: "Ensaio e Parametrização de Relé de Proteção | AFB Engenharia & Consultoria Elétrica",
        metaDescricao: "Ensaio funcional de relé de proteção com injeção de corrente e tensão, conferência de ajustes e parametrização conforme estudo de proteção e seletividade.",
        descricaoCurta: "Verificação funcional do relé com injeção de corrente e tensão, conferência dos ajustes e parametrização conforme o estudo de proteção. Um relé mal parametrizado atua onde não deveria, ou pior, não atua quando deveria.",
        whatsappTexto: "Olá, tenho interesse em Ensaio e Parametrização de Relé de Proteção!"
      },
      {
        id: "estudo-de-seletividade",
        slug: "estudo-de-seletividade",
        menuLabel: "Proteção e Seletividade",
        h1: "Estudo de Proteção e Seletividade",
        metaTitulo: "Estudo de Proteção e Seletividade e Curto-Circuito | AFB Engenharia & Consultoria Elétrica",
        metaDescricao: "Estudo de proteção e seletividade com cálculo de curto-circuito e coordenação dos dispositivos, para que só o mais próximo do defeito atue. Ajustes prontos para aplicar.",
        descricaoCurta: "Cálculo de curto-circuito e coordenação das proteções para que apenas o dispositivo mais próximo do defeito atue, isolando o trecho afetado sem derrubar a planta inteira. Entregamos os ajustes a serem aplicados em cada dispositivo.",
        whatsappTexto: "Olá, tenho interesse em Estudo de Proteção e Seletividade!"
      },
      {
        id: "analise-de-oleo-isolante",
        slug: "analise-de-oleo-isolante",
        menuLabel: "Análise de Óleo Isolante",
        h1: "Análise de Óleo Isolante de Transformador",
        metaTitulo: "Análise de Óleo Isolante de Transformador | AFB Engenharia & Consultoria Elétrica",
        metaDescricao: "Análise de óleo isolante de transformador: rigidez dielétrica, teor de água, acidez e gases dissolvidos. Antecipa falhas internas que a inspeção externa não mostra.",
        descricaoCurta: "Coleta e ensaio do óleo do transformador para avaliar rigidez dielétrica, teor de água, acidez e presença de gases dissolvidos. O óleo carrega o histórico interno do equipamento e antecipa falhas que nenhuma inspeção externa mostra.",
        whatsappTexto: "Olá, tenho interesse em Análise de Óleo Isolante!"
      },
      {
        id: "projeto-de-subestacao",
        slug: "projeto-de-subestacao",
        menuLabel: "Projeto de Subestação",
        h1: "Projeto de Subestação e Documentação Técnica",
        metaTitulo: "Projeto de Subestação: Unifilar, Memorial e Databook | AFB Engenharia & Consultoria Elétrica",
        metaDescricao: "Projeto de subestação com diagrama unifilar, memorial descritivo e databook, para instalações novas, ampliações ou regularização de subestações sem documentação.",
        descricaoCurta: "Projeto funcional, memorial descritivo, diagrama unifilar e databook completo, para instalações novas, ampliações ou regularização de subestações sem documentação. É o conjunto que a concessionária, a seguradora e a auditoria pedem.",
        whatsappTexto: "Olá, tenho interesse em Projeto de Subestação!"
      }
    ]
  }
];
