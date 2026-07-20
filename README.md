# Teste de login com Cypress

Este projeto testa o fluxo de login do ambiente público
[ACME Demo App](https://demo.applitools.com/), mantido para exercícios de
automação de interface.

O cenário automatizado:

1. acessa a página de login;
2. preenche usuário e senha;
3. envia o formulário;
4. valida o redirecionamento para o Dashboard;
5. valida o título da página e o menu do usuário autenticado.

## Executar o teste

Instale as dependências:

```bash
npm install
```

Execute em modo headless:

```bash
npm run cy:run
```

Para acompanhar a execução pela interface do Cypress:

```bash
npm run cy:open
```

As credenciais são lidas do arquivo `.env` e não ficam armazenadas no teste. Crie
o arquivo a partir de `.env.example` antes de executar o cenário:

```bash
ACME_USERNAME=seu_usuario
ACME_PASSWORD=sua_senha
ACME_DISPLAY_NAME=nome_exibido_no_dashboard
```

O `.env` está no `.gitignore` e não deve ser versionado. Após a execução em modo
headless, a evidência é gravada em `cypress/videos/login-dashboard.cy.js.mp4`.

Para gerar uma evidência mais lenta, com as etapas visíveis e o Dashboard mantido
na tela ao final, execute:

```bash
npm run cy:evidence
```

Como se trata de um serviço público, a execução depende de conexão com a internet
e da disponibilidade do ambiente de demonstração.
