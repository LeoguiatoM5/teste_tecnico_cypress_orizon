describe('Login na aplicação ACME', () => {
  it('autentica o usuário e o redireciona para o Dashboard', () => {
    // As pausas existem somente para deixar cada etapa visível no vídeo.
    const pausarParaEvidencia = (tempo = 1200) => {
      if (Cypress.env('EVIDENCE_MODE')) {
        cy.wait(tempo, { log: false })
      }
    }

    // As credenciais são obtidas do arquivo .env pela configuração do Cypress.
    const usuario = Cypress.env('ACME_USERNAME')
    const senha = Cypress.env('ACME_PASSWORD')
    const nomeExibido = Cypress.env('ACME_DISPLAY_NAME')

    // Garante que o teste não seja iniciado sem as variáveis obrigatórias.
    expect(usuario, 'variável ACME_USERNAME').to.be.a('string').and.not.be.empty
    expect(senha, 'variável ACME_PASSWORD').to.be.a('string').and.not.be.empty
    expect(nomeExibido, 'variável ACME_DISPLAY_NAME').to.be.a('string').and.not.be.empty

    // Passo 1: acessar a página de login.
    cy.log('Passo 1 — Acessar a página de login')
    cy.visit('/')
    pausarParaEvidencia()

    // Passo 2: preencher o campo de usuário.
    cy.log('Passo 2 — Preencher o usuário')
    cy.get('#username')
      .should('be.visible')
      .type(usuario)
    pausarParaEvidencia()

    // Passo 3: preencher a senha sem expor o valor no relatório do Cypress.
    cy.log('Passo 3 — Preencher a senha')
    cy.get('#password')
      .should('be.visible')
      .type(senha, { log: false })
    pausarParaEvidencia()

    // Passo 4: enviar o formulário de login.
    cy.log('Passo 4 — Realizar o login')
    cy.get('#log-in')
      .should('be.visible')
      .click()
    pausarParaEvidencia(2000)

    // Passo 5: confirmar que a aplicação abriu a rota do Dashboard.
    cy.log('Passo 5 — Validar o redirecionamento para o Dashboard')
    cy.location('pathname')
      .should('eq', '/app.html')

    // Passo 6: confirmar que o conteúdo principal do Dashboard está visível.
    cy.log('Passo 6 — Validar o conteúdo do Dashboard')
    cy.contains('.element-header', 'Financial Overview')
      .should('be.visible')

    // Passo 7: validar o usuário autenticado pelo nome e pelo avatar exibidos.
    cy.log('Passo 7 — Validar o usuário autenticado')
    cy.get('.logged-user-name:visible')
      .should('contain.text', nomeExibido)

    cy.get('.top-bar .avatar-w img')
      .should('be.visible')
      .and('have.attr', 'src')

    // Mantém o Dashboard aprovado na tela antes de encerrar a gravação.
    cy.log('Evidência concluída — usuário autenticado com sucesso')
    pausarParaEvidencia(4000)
  })
})
