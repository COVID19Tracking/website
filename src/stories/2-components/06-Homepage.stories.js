import React from 'react'
import BlogList from '~components/pages/homepage/blog-list'
import Container from '~components/common/landing-page/container'
import { CtaLink } from '~components/common/landing-page/call-to-action'
import Press from '~components/pages/homepage/press'
import LargeDataset from '~components/pages/homepage/large-dataset'
import LargeProject from '~components/pages/homepage/large-project'
import Datasets from '~components/pages/homepage/datasets'
import Paragraph from '~components/common/landing-page/paragraph'
import LatestTotals from '~components/pages/homepage/latest-totals'

export default {
  title: 'Homepage',
}

Container.displayName = 'Container'

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

Paragraph.displayName = 'Paragraph'

export const homepageParagraph = () => (
  <>
    <Paragraph>
      Every day, our volunteers compile the latest numbers on tests, confirmed
      cases, hospitalizations, and patient outcomes from every US state and
      territory.
    </Paragraph>
    <Paragraph center>
      Every day, our volunteers compile the latest numbers on tests, confirmed
      cases, hospitalizations, and patient outcomes from every US state and
      territory.
    </Paragraph>
  </>
)

LatestTotals.displayName = 'LatestTotals'

export const latestTotals = () => <LatestTotals />

LargeProject.displayName = 'LargeProject'

export const largeProject = () => <LargeProject />

CtaLink.displayName = 'CtaLink'

export const callToActionLink = () => (
  <>
    <CtaLink to="/home">See all our data</CtaLink>
    <p>Centered:</p>

    <CtaLink to="/home" centered>
      See all our data
    </CtaLink>
  </>
)

LargeDataset.displayName = 'LargeDataset'

export const largeDataset = () => <LargeDataset />

Datasets.displayName = 'Datasets'

export const datasetList = () => <Datasets />

container.story = {
  parameters: {
    info: {
      text: 'A collection of dataset components.',
    },
  },
}

Press.displayName = 'Press'

export const press = () => <Press />

BlogList.displayName = 'BlogList'
export const blogList = () => <BlogList />
