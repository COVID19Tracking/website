/// <reference types="cypress" />

context('Header', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('shows the right header based on viewport', () => {
    cy.viewport(1200, 480)
    cy.get('header').should('be.visible')
    cy.get('.header-mobile-toggle').should('not.be.visible')
    cy.viewport(320, 480)
    cy.get('.header-mobile-toggle').should('be.visible')
  })

  it('toggles the mobile menu', () => {
    cy.viewport(320, 480)
    cy.get('.header-mobile-toggle').click()
    cy.get('.header-mobile-toggle').contains('Close')
    cy.get('header nav').should('be.visible')
    cy.get('.header-mobile-toggle').click()
    cy.get('.header-mobile-toggle').contains('Menu')
    cy.get('header nav').should('not.be.visible')
  })
})
