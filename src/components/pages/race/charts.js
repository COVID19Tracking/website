import React from 'react'
import Feature from '~components/common/landing-page/feature'

const PlaceholderChart = () => (
  <div style={{ height: '300px', background: 'grey' }} />
)
export default () => (
  <>
    <Feature element={<PlaceholderChart />} title="County infection rate">
      When we look at county level infection data, normalized for population, we
      see that none of the top 20 counties have Black people as the largest
      racial group.
    </Feature>
    <Feature element={<PlaceholderChart />} title="County death rates" flip>
      However, when we turn to looking at county level death rate data we see
      something completely different. Eight of the 20 counties are ones in which
      Black people are the largest racial group. Including the three counties
      with the highest death rates.
    </Feature>
    <Feature
      title="Counties with per-capita case and death rates with two largest racial groups"
      stack
    >
      [Paragraph explaining this chart: what it depicts, why it matters, and how
      to use the information. Highlights the inequity.]
    </Feature>
    <div style={{ height: '400px', background: 'Grey' }} />
  </>
)
