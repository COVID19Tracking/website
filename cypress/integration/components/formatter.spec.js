import React from 'react'
import { FormatDate, FormatNumber } from '../../../src/components/common/format'

describe('FormatNumber component', () => {
  it('format number', () => {
    cy.mount(<FormatNumber number={100} />)
    cy.contains('100')

    cy.mount(<FormatNumber number={1000} />)
    cy.contains('1,000')
  })

  it('formats date', () => {
    cy.mount(<FormatDate date={20200101} format="LLLL d yyyy" />)
    cy.contains('January 1 2020')
  })
})
