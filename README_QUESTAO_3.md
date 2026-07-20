# Questão 3 — Teste de login com Cypress

## Objetivo

Validar o acesso de um usuário com credenciais válidas e confirmar que, após o
login, ele é direcionado para o Dashboard da aplicação.

Para realizar o teste, foi utilizada uma aplicação pública própria para práticas
de automação:

<https://demo.applitools.com/>

## Cenário testado

O teste realiza as seguintes ações:

1. acessa a página de login;
2. preenche o campo de usuário;
3. preenche o campo de senha;
4. seleciona a opção para entrar;
5. confirma o redirecionamento para o Dashboard;
6. verifica se o conteúdo principal do Dashboard está visível;
7. valida o nome e o avatar do usuário autenticado.

## Teste implementado

```javascript
describe('Login na aplicação ACME', () => {
  it('autentica o usuário e o redireciona para o Dashboard', () => {
    const usuario = Cypress.env('ACME_USERNAME')
    const senha = Cypress.env('ACME_PASSWORD')
    const nomeExibido = Cypress.env('ACME_DISPLAY_NAME')

    cy.log('Passo 1 — Acessar a página de login')
    cy.visit('/')

    cy.log('Passo 2 — Preencher o usuário')
    cy.get('#username')
      .should('be.visible')
      .type(usuario)

    cy.log('Passo 3 — Preencher a senha')
    cy.get('#password')
      .should('be.visible')
      .type(senha, { log: false })

    cy.log('Passo 4 — Realizar o login')
    cy.get('#log-in')
      .should('be.visible')
      .click()

    cy.log('Passo 5 — Validar o redirecionamento para o Dashboard')
    cy.location('pathname')
      .should('eq', '/app.html')

    cy.log('Passo 6 — Validar o conteúdo do Dashboard')
    cy.contains('.element-header', 'Financial Overview')
      .should('be.visible')

    cy.log('Passo 7 — Validar o usuário autenticado')
    cy.get('.logged-user-name:visible')
      .should('contain.text', nomeExibido)

    cy.get('.top-bar .avatar-w img')
      .should('be.visible')
  })
})
```

## Proteção das credenciais

O usuário e a senha não foram colocados diretamente no código do teste. Eles
ficam armazenados em um arquivo `.env`, separado do código principal.

```text
ACME_USERNAME=usuario_do_teste
ACME_PASSWORD=senha_do_teste
ACME_DISPLAY_NAME=nome_exibido_no_dashboard
```

O arquivo `.env` está incluído no `.gitignore`. Dessa forma, as credenciais não
são enviadas para o repositório. Durante a execução, a senha também é ocultada do
histórico de comandos do Cypress.

## Resultado

O teste foi executado com sucesso e atendeu a todos os critérios solicitados:

- página de login acessada;
- usuário e senha preenchidos;
- login realizado;
- redirecionamento para o Dashboard confirmado;
- conteúdo do Dashboard validado;
- nome e avatar do usuário autenticado identificados.

Resultado da execução:

```text
Testes executados: 1
Testes aprovados: 1
Testes reprovados: 0
```

## Evidência

A execução completa foi gravada em vídeo pelo próprio Cypress. O vídeo apresenta
o preenchimento dos campos, a realização do login e as validações no Dashboard.

Arquivo da evidência:

```text
cypress/videos/login-dashboard.cy.js.mp4
```
