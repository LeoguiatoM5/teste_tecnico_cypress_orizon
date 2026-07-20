describe("Login na aplicação ACME", () => {
  it("autentica o usuário e o redireciona para o Dashboard", () => {
    const pausarParaEvidencia = (tempo = 1200) => {
      if (Cypress.env("EVIDENCE_MODE")) {
        cy.wait(tempo, { log: false });
      }
    };

    const usuario = Cypress.env("ACME_USERNAME");
    const senha = Cypress.env("ACME_PASSWORD");
    const nomeExibido = Cypress.env("ACME_DISPLAY_NAME");

    expect(usuario, "variável ACME_USERNAME").to.be.a("string").and.not.be
      .empty;
    expect(senha, "variável ACME_PASSWORD").to.be.a("string").and.not.be.empty;
    expect(nomeExibido, "variável ACME_DISPLAY_NAME").to.be.a("string").and.not
      .be.empty;

    cy.log("Passo 1 — Acessar a página de login");
    cy.visit("/");
    pausarParaEvidencia();

    cy.log("Passo 2 — Preencher o usuário");
    cy.get("#username").should("be.visible").type(usuario);
    pausarParaEvidencia();

    cy.log("Passo 3 — Preencher a senha");
    cy.get("#password").should("be.visible").type(senha, { log: false });
    pausarParaEvidencia();

    cy.log("Passo 4 — Realizar o login");
    cy.get("#log-in").should("be.visible").click();
    pausarParaEvidencia(2000);

    cy.log("Passo 5 — Validar o redirecionamento para o Dashboard");
    cy.location("pathname").should("eq", "/app.html");

    cy.log("Passo 6 — Validar o conteúdo do Dashboard");
    cy.contains(".element-header", "Financial Overview").should("be.visible");

    cy.log("Passo 7 — Validar o usuário autenticado");
    cy.get(".logged-user-name:visible").should("contain.text", nomeExibido);

    cy.get(".top-bar .avatar-w img")
      .should("be.visible")
      .and("have.attr", "src");

    cy.log("Evidência concluída — usuário autenticado com sucesso");
    pausarParaEvidencia(4000);
  });
});
