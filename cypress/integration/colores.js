describe('Los estudiantes signup', function() {
    it('Cree una cuenta y pruebe el login correcto y la creación de una cuenta con un login que ya existe', function() {
      cy.visit('https://dianaespc.github.io/Taller6/')
      cy.contains('Generar nueva paleta').click()
      cy.screenshot(Cypress.env("screen")+"1");
      cy.wait(500)
      cy.contains('Generar nueva paleta').click()
      cy.screenshot(Cypress.env("screen")+"2");
      cy.wait(500)
    })
})
