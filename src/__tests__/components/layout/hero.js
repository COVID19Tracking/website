import React from 'react'
import renderer from 'react-test-renderer'
import Hero from '../../../components/pages/homepage/header-hero'

describe('Components : Layout : Hero', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Hero />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
