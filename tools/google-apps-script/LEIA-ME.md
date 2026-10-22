# Planilha "Leads WhatsApp" — passo a passo

Esta pasta não é publicada no site. Ela guarda o script que grava, numa planilha Google sua,
cada pessoa que preenche a janela "Conte um pouco sobre a sua energia" antes de ir para o WhatsApp.

Você vai precisar de duas coisas no final: **a URL do App da Web** e **um token (senha)**.
As duas vão para a Vercel.

## 1. Criar o token (a senha do webhook)

O token é uma senha longa que só o site e a planilha conhecem.

1. Abra o PowerShell e digite: `[guid]::NewGuid().ToString() + [guid]::NewGuid().ToString()`
2. Copie o resultado (uma sequência longa de letras e números) e guarde num lugar seguro.
   Não mande esse token por e-mail nem cole em mensagens.

## 2. Criar a planilha

1. Entre em https://sheets.google.com com a conta Google da AFB.
2. Clique em **Em branco** para criar uma planilha nova.
3. Dê um nome, por exemplo **Leads WhatsApp — Site AFB**.
   Não precisa criar a aba nem o cabeçalho: o script cria a aba "Leads WhatsApp" sozinho no primeiro contato.

## 3. Colar o script

1. Na planilha, clique em **Extensões > Apps Script**.
2. Apague todo o texto que aparece no editor (`function myFunction() {...}`).
3. Abra o arquivo `lead-whatsapp.gs` desta pasta, copie tudo e cole no editor.
4. Clique no ícone de disquete (**Salvar projeto**).

## 4. Guardar o token no script

1. No Apps Script, clique na engrenagem **Configurações do projeto** (barra da esquerda).
2. Role até **Propriedades do script** e clique em **Adicionar propriedade do script**.
3. Em **Propriedade**, escreva exatamente: `SHEETS_TOKEN`
4. Em **Valor**, cole o token do passo 1.
5. Clique em **Salvar propriedades do script**.

## 5. Publicar como App da Web

1. No canto de cima, clique em **Implantar > Nova implantação**.
2. Na engrenagem ao lado de "Selecione o tipo", escolha **App da Web**.
3. Preencha:
   - **Descrição:** Leads WhatsApp do site
   - **Executar como:** **Eu** (o seu e-mail)
   - **Quem pode acessar:** **Qualquer pessoa**
4. Clique em **Implantar**.
5. O Google vai pedir permissão: clique em **Autorizar acesso**, escolha a sua conta e,
   se aparecer "O Google não verificou este app", clique em **Avançado > Acessar (não seguro)** e depois em **Permitir**.
   Isso é normal: o "app" é o seu próprio script.
6. Copie a **URL do App da Web** (termina em `/exec`).

"Qualquer pessoa" é necessário para o site conseguir enviar. Quem não tiver o token não grava nada.

## 6. Colocar na Vercel

1. Entre no projeto do site na Vercel > **Settings > Environment Variables**.
2. Crie as duas variáveis (marque Production e Preview):
   - `SHEETS_WEBHOOK_URL` = a URL do passo 5 (a que termina em `/exec`)
   - `SHEETS_TOKEN` = o mesmo token do passo 1
3. Faça um novo deploy (ou aguarde o próximo) para as variáveis valerem.

Enquanto `SHEETS_WEBHOOK_URL` não existir, o site continua funcionando normalmente:
o WhatsApp abre e o aviso por e-mail continua chegando, só a linha da planilha não é gravada.

## 7. Usar a planilha

- Cada contato vira uma linha: Data/hora · Nome · WhatsApp · Cidade/UF · Perfil · Gasto mensal ·
  Interesse · Empresa · Página de origem · Status.
- A coluna **Status** fica vazia para você preencher (por exemplo: "respondido", "proposta enviada").
- Não mude a ordem das colunas nem o nome da aba "Leads WhatsApp".

## Se precisar mudar o script depois

Edite o código, salve e vá em **Implantar > Gerenciar implantações > lápis (Editar) >
Versão: Nova versão > Implantar**. Assim a URL continua a mesma e não é preciso mexer na Vercel.

## Se o token vazar

Crie um token novo (passo 1), troque em **Propriedades do script** (passo 4) e na Vercel (`SHEETS_TOKEN`).
