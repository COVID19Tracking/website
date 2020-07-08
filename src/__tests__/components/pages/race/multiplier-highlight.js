import React from 'react'
import renderer from 'react-test-renderer'
import MultiplierHighlight from '~components/pages/race/multiplier-highlight'

describe('Components : Race : Multiplier Highlight : nearly 1.5 times', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MultiplierHighlight multiplier={1.4} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Race : Multiplier Highlight : 1.5 times', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MultiplierHighlight multiplier={1.5} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Race : Multiplier Highlight : more than 1.5 times', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MultiplierHighlight multiplier={1.7} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Race : Multiplier Highlight : nearly 2 times', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MultiplierHighlight multiplier={1.9} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Race : Multiplier Highlight : 2 times', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MultiplierHighlight multiplier={2.0} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Race : Multiplier Highlight : more than 2 times', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MultiplierHighlight multiplier={2.2} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Race : Multiplier Highlight : nearly 2.5 times', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MultiplierHighlight multiplier={2.4} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Race : Multiplier Highlight : 2.5 times', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MultiplierHighlight multiplier={2.5} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Race : Multiplier Highlight : more than 2.5 times', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MultiplierHighlight multiplier={2.7} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Race : Multiplier Highlight : nearly 3 times', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MultiplierHighlight multiplier={2.9} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Race : Multiplier Highlight : 3 times', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MultiplierHighlight multiplier={3.0} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Race : Multiplier Highlight : more than 3 times', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MultiplierHighlight multiplier={3.2} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Race : Multiplier Highlight : much', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MultiplierHighlight multiplier={4.0} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
