import React from 'react'
import renderer from 'react-test-renderer'
import Footnotes from '~components/social-media-graphics/race/footnotes'

const combined = {
  knownRaceEthPos: 0.98,
  knownRaceEthDeath: 0.43,
}

const separate = {
  knownRacePos: 0.32,
  knownRaceDeath: 0.76,
  knownEthPos: 0.99,
  knownEthDeath: 1,
}

describe('Components : Social Media Graphics : Race : Footnotes : Utah', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Footnotes
          state={combined}
          stateName="Utah"
          asteriskFootnote="Here is an additional footnote"
          showSmallNFootnote
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Social Media Graphics : Race : Footnotes : Wyoming', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Footnotes state={separate} stateName="Wyoming" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Social Media Graphics : Race : Footnotes : National', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Footnotes
          state={separate}
          stateName="United States"
          statesReportingDeaths={34}
          statesReportingCases={49}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Social Media Graphics : Race : Footnotes : Generic separate', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Footnotes state={separate} stateName="Alabama" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Social Media Graphics : Race : Footnotes : Generic combined', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Footnotes state={combined} stateName="Alabama" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
