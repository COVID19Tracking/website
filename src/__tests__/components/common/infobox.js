import React from 'react'
import renderer from 'react-test-renderer'
import { useStaticQuery, StaticQuery } from 'gatsby'
import {
  Infobox,
  SyncInfobox,
  AlertInfobox,
  QuestionInfobox,
} from '../../../components/common/infobox'

beforeEach(() => {
  StaticQuery.mockImplementationOnce(({ render }) =>
    render({
      site: {
        siteMetadata: {
          buildDate: '6:00 pm ET',
          inDST: false,
        },
      },
    }),
  )
  useStaticQuery.mockImplementation(() => ({
    site: {
      siteMetadata: {
        buildDate: '6:00 pm ET',
        inDST: false,
      },
    },
  }))
})

describe('Components : Common: Infobox: Infobox', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Infobox header="Test header">
          <p>Test content</p>
        </Infobox>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Common: Infobox: Alert infobox', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <AlertInfobox header="Test header">
          <p>Test content</p>
        </AlertInfobox>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Common: Infobox: Question infobox', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <QuestionInfobox header="Test header">
          <p>Test content</p>
        </QuestionInfobox>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Common: Infobox: Sync', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <SyncInfobox header="Test header">
          <p>Test content</p>
        </SyncInfobox>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
