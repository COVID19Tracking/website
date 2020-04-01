import React from 'react'
import { Flex } from '../../common/flexbox'
import Visualization from './visualization'
import Container from '../../common/container'
import nytGraph from '../../../images/homepage-visualizations/nyt.png'
import politicoMap from '../../../images/homepage-visualizations/politico-map.png'
import wsjGraph from '../../../images/homepage-visualizations/wsj.png'

const Visualizations = () => (
  <div className="homepage-visualizations-wrapper">
    <Container>
      <h2>From the visualization gallery</h2>
      <Flex flexWrap="wrap" className="homepage-visualizations">
        <Visualization
          image={nytGraph}
          altText="New York Times chart"
          sourceLink="https://www.nytimes.com/interactive/2020/03/17/us/coronavirus-testing-data.html"
          sourceTitle="U.S. Lags in Coronavirus Testing After Slow Response to Outbreak"
          publicationName="The New York Times"
        />
        <Visualization
          image={politicoMap}
          altText="Politico COVID Map"
          sourceLink="https://www.politico.com/interactives/2020/coronavirus-testing-by-state-chart-of-new-cases/"
          sourceTitle="Coronavirus by State Map"
          publicationName="Politico"
        />
        <Visualization
          image={wsjGraph}
          altText="Wall Street Journal chart"
          sourceLink="https://www.wsj.com/articles/how-the-cdcs-restrictive-testing-guidelines-hid-the-coronavirus-epidemic-11584882001"
          sourceTitle="Number of tests performed versus positive cases"
          publicationName="The Wall Street Journal"
        />
      </Flex>
    </Container>
  </div>
)

export default Visualizations
