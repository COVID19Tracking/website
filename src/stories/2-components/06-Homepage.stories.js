import React from 'react'
import BlogList from '~components/pages/homepage/blog-list'
import Container from '~components/pages/homepage/container'
import CtaLink from '~components/pages/homepage/cta-link'
import Press from '~components/pages/homepage/press'
import LargeDataset from '~components/pages/homepage/large-dataset'
import LargeProject from '~components/pages/homepage/large-project'
import Datasets from '~components/pages/homepage/datasets'
import Paragraph from '~components/pages/homepage/paragraph'
import LatestTotals from '~components/pages/homepage/latest-totals'

export default {
  title: 'Homepage',
}

export const container = () => (
  <Container>
    <div style={{ background: 'grey', height: '150px' }} />
  </Container>
)

container.story = {
  parameters: {
    info: {
      text: 'A narrower container element for homepage components.',
    },
  },
}

export const homepageParagraph = () => (
  <>
    <Paragraph>
      Every day, our volunteers compile the latest numbers on tests, confirmed
      cases, hospitalizations, and patient outcomes from every US state and
      territory.
    </Paragraph>
    <Paragraph centered>
      Every day, our volunteers compile the latest numbers on tests, confirmed
      cases, hospitalizations, and patient outcomes from every US state and
      territory.
    </Paragraph>
  </>
)

export const latestTotals = () => <LatestTotals />
export const largeProject = () => <LargeProject />

export const callToActionLink = () => (
  <>
    <CtaLink to="/home">See all our data</CtaLink>
    <p>Centered:</p>

    <CtaLink to="/home" centered>
      See all our data
    </CtaLink>
  </>
)

export const largeDataset = () => <LargeDataset />

export const datasetList = () => <Datasets />

container.story = {
  parameters: {
    info: {
      text: 'A collection of dataset components.',
    },
  },
}

export const press = () => <Press />

export const blogList = () => <BlogList />
