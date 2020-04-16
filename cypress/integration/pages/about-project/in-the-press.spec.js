/// <reference types="cypress" />
import data from '../../../../_data/v1/press.json'

context('In the press page', () => {
  beforeEach(() => {
    cy.visit('/about-project/in-the-press')
  })

  it('has press items', () => {
    const pressItems = []
    data.forEach(item => {
      if (item.addToCovidTrackingProjectWebsite) {
        pressItems.push(item)
      }
    })
    cy.get('.press-list li').should('have.length', pressItems.length)
  })
})
