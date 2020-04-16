/// <reference types="cypress" />

context('Blog', () => {
  beforeEach(() => {
    cy.visit('/blog')
  })

  it('has a blog post', () => {
    cy.get('#main h3 a').should('exist')
    cy.get('#main h3 a').click()
    cy.url().should('include', '/blog/')
  })
})
