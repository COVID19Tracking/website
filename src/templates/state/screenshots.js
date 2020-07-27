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
  const {
    covid19Site,
    covid19SiteSecondary,
    covid19SiteTertiary,
  } = data.covidStateInfo
  return (
    <Layout
      title={`${state.name}: Screenshots`}
      returnLinks={[
        { link: '/data' },
        { link: `/data/state/${state.slug}`, title: state.name },
      ]}
      path={path}
    >
      <p>
        Every day we take multiple screenshots to document state COVID websites.{' '}
        {state.name} has the following sites:
      </p>
      <ol>
        {covid19Site && (
          <li>
            <strong>Primary:</strong>{' '}
            <a target="_blank" rel="noreferrer" href={covid19Site}>
              {covid19Site}
            </a>
          </li>
        )}
        {covid19SiteSecondary && (
          <li>
            <strong>Secondary:</strong>{' '}
            <a target="_blank" rel="noreferrer" href={covid19SiteSecondary}>
              {covid19SiteSecondary}
            </a>
          </li>
        )}
        {covid19SiteTertiary && (
          <li>
            <strong>Tertiary:</strong>{' '}
            <a target="_blank" rel="noreferrer" href={covid19SiteTertiary}>
              {covid19SiteTertiary}
            </a>
          </li>
        )}
      </ol>
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
    covidStateInfo(state: { eq: $state }) {
      covid19Site
      covid19SiteSecondary
      covid19SiteTertiary
    }
  }
`
