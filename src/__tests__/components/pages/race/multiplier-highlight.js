import React from 'react'
import renderer from 'react-test-renderer'
import MultiplierHighlight from '~components/pages/race/multiplier-highlight'

describe('Components : Race : Multiplier Highlight : nearly 1.5 times', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MultiplierHighlight multiplier={1.40} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Race : Multiplier Highlight : 1.5 times', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MultiplierHighlight multiplier={1.50} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Race : Multiplier Highlight : more than 1.5 times', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MultiplierHighlight multiplier={1.70} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Race : Multiplier Highlight : nearly 2 times', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MultiplierHighlight multiplier={1.90} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Race : Multiplier Highlight : 2 times', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MultiplierHighlight multiplier={2.00} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Race : Multiplier Highlight : more than 2 times', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MultiplierHighlight multiplier={2.20} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Race : Multiplier Highlight : nearly 2.5 times', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MultiplierHighlight multiplier={2.40} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Race : Multiplier Highlight : 2.5 times', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MultiplierHighlight multiplier={2.50} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Race : Multiplier Highlight : more than 2.5 times', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MultiplierHighlight multiplier={2.70} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Race : Multiplier Highlight : nearly 3 times', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MultiplierHighlight multiplier={2.90} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Race : Multiplier Highlight : 3 times', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MultiplierHighlight multiplier={3.00} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Race : Multiplier Highlight : more than 3 times', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MultiplierHighlight multiplier={3.20} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Race : Multiplier Highlight : much', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MultiplierHighlight multiplier={4.00} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
