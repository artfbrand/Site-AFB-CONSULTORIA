# AFB Consultoria Energética

Site institucional one-page de Engenharia Elétrica e Consultoria em Energia.

## Estrutura

```
/
├── index.html              # Site (hero + faixa de autoridade)
├── assets/
│   └── images/
│       ├── logo-horizontal.png
│       ├── subestacao-entardecer.png
│       └── icones.png
├── _design/                # Referências de design (não publicadas)
│   ├── design-system3.html
│   ├── orientacoes.md
│   └── ...
└── README.md
```

## Tecnologias

- HTML + CSS + JS puros (sem framework)
- [GSAP 3](https://greensock.com/gsap/) — animações e ScrollTrigger
- [Lenis](https://lenis.darkroom.engineering/) — smooth scroll
- Google Fonts — Playfair Display + Inter

## Desenvolvimento local

Abra `index.html` diretamente no browser ou use qualquer servidor estático:

```bash
npx serve .
# ou
python -m http.server 8000
```

## Deploy

Compatível com **GitHub Pages** — basta ativar nas configurações do repositório (branch `main`, pasta `/`).

## Pendências

- Substituir `55XXXXXXXXXXX` pelo número real de WhatsApp (2 ocorrências em `index.html`)
- Preencher e-mail e LinkedIn no rodapé (seções futuras)
- Completar as seções 03–11 conforme `_design/orientacoes.md`
