/// <reference types="cypress" />

context('Pages - homepage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('has a recent press section with at least four articles', () => {
    cy.get('.press-list li').should('have.length.gte', 4)
  })
})
