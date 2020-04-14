/// <reference types="cypress" />
import data from '../../../_data/v1/us/daily.json'

context('Pages - US Daily', () => {
  beforeEach(() => {
    cy.visit('/data/us-daily')
  })

  it('has US daily page with current data', () => {
    cy.get('table tbody tr').should('have.length', data.length)
  })
})
