# CSS do topo sem bloquear (tools/css-critico)

Esta pasta não é publicada no site (está no .vercelignore).

## O que faz

Nas páginas internas, no blog e na 404 (todas as que usam o mesmo `<head>`; a Home e o /diagnostico ficam de fora),
o script coloca dentro do próprio HTML o CSS que a página usa e deixa `base.css`, `efeitos.css`, `servico.css`
(e `blog.css` nas páginas do blog) carregando sem travar o primeiro desenho da tela.
Resultado: no celular com rede lenta a página aparece cerca de 1 segundo antes, com o mesmo visual.

Cada bloco gerado fica entre os marcadores
`<!-- css-critico /assets/css/... (gerado por tools/css-critico; não editar à mão) -->` e `<!-- /css-critico -->`.

## Quando rodar de novo (importante)

Sempre que mudar **qualquer CSS** (`base.css`, `efeitos.css`, `servico.css`, `blog.css`) ou o **HTML** de uma página
interna, rode o script de novo antes do commit. Se esquecer, o site continua funcionando (o arquivo CSS completo carrega
logo depois e vale no final), mas o primeiro desenho da tela usa o CSS antigo por um instante.

Também rode depois de gerar o blog de novo (gerador do blog).

## Como rodar

Na raiz do site, no PowerShell:

```
cd tools/css-critico
npm install --no-package-lock
cd ../..
node tools/css-critico/critico.mjs
```

Para voltar tudo aos `<link>` originais: `node tools/css-critico/critico.mjs --desfazer`

Rodar mais de uma vez não duplica nada: o script desfaz os blocos antigos e gera de novo.
Ele mesmo confere que não sobrou CSS travando a página e que o "desfazer" devolve exatamente o arquivo original.
