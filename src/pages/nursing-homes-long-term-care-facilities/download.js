import React from 'react'
import { graphql } from 'gatsby'
import ContentfulContent from '~components/common/contentful-content'
import Layout from '~components/layout'

const LTCDownloadPage = ({ data }) => (
  <Layout
    title="Long-term Care Data Download"
    path="/nursing-homes-long-term-care-facilities/download"
    returnLinks={[{ link: '/nursing-homes-long-term-care-facilities' }]}
  >
    <ContentfulContent
      content={
        data.contentfulSnippet.childContentfulSnippetContentTextNode
          .childMarkdownRemark.html
      }
      id={data.contentfulSnippet.contentful_id}
    />

    <h2>National data</h2>
    <ul>
      <li>
        <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vRa9HnmEl83YXHfbgSPpt0fJe4SyuYLc0GuBAglF4yMYaoKSPRCyXASaWXMrTu1WEYp1oeJZIYHpj7t/pub?gid=827060758&single=true&output=csv">
          Aggregate dataset
        </a>
      </li>
      <li>
        <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vRa9HnmEl83YXHfbgSPpt0fJe4SyuYLc0GuBAglF4yMYaoKSPRCyXASaWXMrTu1WEYp1oeJZIYHpj7t/pub?gid=467018747&single=true&output=csv">
          Cumulative dataset
        </a>
      </li>
      <li>
        <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vRa9HnmEl83YXHfbgSPpt0fJe4SyuYLc0GuBAglF4yMYaoKSPRCyXASaWXMrTu1WEYp1oeJZIYHpj7t/pub?gid=467018747&single=true&output=csv">
          Current outbreak dataset
        </a>
      </li>
      <li>
        <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vRa9HnmEl83YXHfbgSPpt0fJe4SyuYLc0GuBAglF4yMYaoKSPRCyXASaWXMrTu1WEYp1oeJZIYHpj7t/pub?gid=336757465&single=true&output=csv">
          State notes
        </a>
      </li>
      <li>
        <a href="https://covidtracking.com/nursing-homes-long-term-care-facilities/history">
          Historical totals
        </a>
      </li>
      <li>
        <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vRa9HnmEl83YXHfbgSPpt0fJe4SyuYLc0GuBAglF4yMYaoKSPRCyXASaWXMrTu1WEYp1oeJZIYHpj7t/pubhtml">
          View full spreadsheet
        </a>
      </li>
    </ul>

    <h2>State Facility Data</h2>
    <ul>
      {data.allCovidStateInfo.nodes.map(state => (
        <li>
          <a
            href={`https://github.com/COVID19Tracking/long-term-care-data/blob/master/facilities_${state.state.toLowerCase()}.csv`}
          >
            {state.name}
          </a>
        </li>
      ))}
    </ul>
  </Layout>
)

export default LTCDownloadPage

export const query = graphql`
  query {
    contentfulSnippet(slug: { eq: "ltc-download-page-preamble" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
    allCovidStateInfo(sort: { fields: name }) {
      nodes {
        id
        name
        state
      }
    }
  }
`
