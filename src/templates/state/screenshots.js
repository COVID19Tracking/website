import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'
import ScreenshotList from '~components/pages/state/screenshot-list'
import TableResponsive from '~components/common/table-responsive'
import { FormatDate } from '~components/utils/format'

export default ({ pageContext, path, data }) => {
  const state = pageContext
  const allScreenshots = []
  data.allCovidScreenshot.group
    .sort((a, b) => (a.nodes[0].date > b.nodes[0].date ? -1 : 1))
    .forEach(screenshots => {
      const primary = []
      const secondary = []
      const tertiary = []
      screenshots.nodes.forEach(screenshot => {
        if (screenshot.secondary) {
          secondary.push(screenshot)
          return
        }
        if (screenshot.tertiary) {
          tertiary.push(screenshot)
          return
        }
        primary.push(screenshot)
      })
      allScreenshots.push({
        date: screenshots.nodes[0].date,
        primary,
        secondary,
        tertiary,
      })
    })
  return (
    <Layout
      title={`${state.name}: Screenshots`}
      returnLinkTitle={state.name}
      returnLink={`/data/state/${state.slug}`}
      path={path}
    >
      <TableResponsive
        labels={[
          {
            field: 'date',
            label: 'Date',
            format: date => <FormatDate date={date} format="ccc LLL d yyyy" />,
          },
          {
            field: 'primary',
            label: 'Primary screenshots',
            format: items => <ScreenshotList screenshots={items} />,
          },
          {
            field: 'secondary',
            label: 'Secondary screenshots',
            format: items => <ScreenshotList screenshots={items} />,
          },
          {
            field: 'tertiary',
            label: 'Tertiary screenshots',
            format: items => <ScreenshotList screenshots={items} />,
          },
        ]}
        data={allScreenshots}
      />
    </Layout>
  )
}

export const query = graphql`
  query($state: String!) {
    allCovidScreenshot(
      filter: { state: { eq: $state } }
      sort: { fields: dateChecked, order: DESC }
    ) {
      group(field: date) {
        nodes {
          url
          tertiary
          secondary
          dateChecked
          date
        }
      }
    }
  }
`
