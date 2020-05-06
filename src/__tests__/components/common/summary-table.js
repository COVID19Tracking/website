import React from 'react'
import renderer from 'react-test-renderer'
import { useStaticQuery } from 'gatsby'
import SummaryTable from '../../../components/common/summary-table'

beforeEach(() => {
  useStaticQuery.mockImplementation(() => ({
    site: {
      siteMetadata: {
        buildDate: '6:00 pm ET',
        inDST: false,
      },
    },
  }))
})

const tableData = {
  totalTestResults: 37890,
  state: 'AL',
  score: 3,
  grade: 'B',
  dateModified: '2020-04-17T00:00:00Z',
  positive: 4572,
  negative: 33318,
  pending: null,
  hospitalizedCurrently: null,
  hospitalizedCumulative: 594,
  inIcuCurrently: null,
  inIcuCumulative: 247,
  recovered: null,
  onVentilatorCurrently: null,
  onVentilatorCumulative: 148,
  death: 151,
}

describe('Components : Common: Publication: Summary table', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<SummaryTable data={tableData} lastUpdated={20200401} />)
      .toJSON()
    expect(tree).toMatchSnapshot()

    const hideOutcomesTree = renderer
      .create(
        <SummaryTable
          data={tableData}
          lastUpdated={20200401}
          showOutcomes={false}
        />,
      )
      .toJSON()
    expect(hideOutcomesTree).toMatchSnapshot()
  })
})
