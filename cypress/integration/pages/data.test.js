/// <reference types="cypress" />
import states from '../../../_data/v1/states/info.json'

context('Pages - data', () => {
  beforeEach(() => {
    cy.visit('/data')
  })

  it('can navigate using combobox using Enter', () => {
    cy.get('[data-reach-combobox-input]').type('California{enter}')
    cy.url().should('include', '#state-ca')
  })

  it('can navigate using combobox by click', () => {
    cy.get('[data-reach-combobox-input]').type('New')
    cy.get('[data-reach-combobox-option]')
      .first()
      .click()
    cy.url().should('include', '#state-nh')
  })

  it('can navigate using combobox by keyboard', () => {
    cy.get('[data-reach-combobox-input]').type('New{downarrow}{enter}')
    cy.url().should('include', '#state-nh')
  })

  it('has an entry for every state', () => {
    cy.get('.data-state').should('have.length', states.length)
  })
})
