import React from 'react'
import Feature from '~components/common/landing-page/feature'
import LandingPageContainer from '~components/common/landing-page/container'
import Container from '~components/common/container'
import CountiesTable from './counties-table'

const PlaceholderChart = () => (
  <div style={{ height: '300px', background: 'grey' }} />
)
export default () => (
  <>
    <LandingPageContainer>
      <Feature
        element={<PlaceholderChart />}
        title="Counties with the 20 highest infection rates"
      >
        This chart shows the 20 counties with the highest level of infections
        per capita, and the largest racial or ethnic group in that county. White
        people represent the largest racial group in most of these counties.
        This is in line with Census statistics, which show that more than 60
        percent of Americans are White, non-Hispanic or Latino.
      </Feature>
      <Feature
        element={<PlaceholderChart />}
        title="Counties with the 20 highest death rates"
        flip
      >
        When we look at the 20 counties with the highest level of deaths per
        capita, we see a different story. In eight of these 20 counties, Black
        people represent the largest racial group—and glaringly, the counties
        with the three highest death rates in the nation are all predominantly
        Black.
      </Feature>
      <Feature title="Explore the county dataset" stack>
        Click each column header to re-sort the data.
      </Feature>
    </LandingPageContainer>
    <Container>
      <CountiesTable />
    </Container>
  </>
)
