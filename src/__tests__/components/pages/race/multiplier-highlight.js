import React from 'react'
import renderer from 'react-test-renderer'
import MultiplierHighlight from '~components/pages/race/multiplier-highlight'

describe('Components : Race : Multiplier Highlight : nearly 1.5 times', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MultiplierHighlight multiplier={140} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Race : Multiplier Highlight : 1.5 times', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MultiplierHighlight multiplier={150} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Race : Multiplier Highlight : more than 1.5 times', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MultiplierHighlight multiplier={170} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Race : Multiplier Highlight : nearly 2 times', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MultiplierHighlight multiplier={190} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Race : Multiplier Highlight : 2 times', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MultiplierHighlight multiplier={200} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Race : Multiplier Highlight : more than 2 times', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MultiplierHighlight multiplier={220} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Race : Multiplier Highlight : nearly 2.5 times', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MultiplierHighlight multiplier={240} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Race : Multiplier Highlight : 2.5 times', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MultiplierHighlight multiplier={250} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Race : Multiplier Highlight : more than 2.5 times', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MultiplierHighlight multiplier={270} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Race : Multiplier Highlight : nearly 3 times', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MultiplierHighlight multiplier={290} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Race : Multiplier Highlight : 3 times', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MultiplierHighlight multiplier={300} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Race : Multiplier Highlight : more than 3 times', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MultiplierHighlight multiplier={320} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Race : Multiplier Highlight : much', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MultiplierHighlight multiplier={400} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
