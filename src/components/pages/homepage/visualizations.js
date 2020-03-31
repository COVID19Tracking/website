import React from 'react'
import { Flex, Box } from '../../common/flexbox'
import Container from '../../common/container'
import DetailText from '../../common/detail-text'
import nytGraph from '../../../images/homepage-visualizations/nyt.png'
import politicoMap from '../../../images/homepage-visualizations/politico-map.png'
import wsjGraph from '../../../images/homepage-visualizations/wsj.png'

const Visualizations = () => (
  <div className="homepage-visualizations-wrapper">
    <Container>
      <h2>From visualization gallery</h2>
      <Flex flexWrap="wrap" className="homepage-visualizations">
        <Box width={[1, 1, 1 / 3]} px={[0, '0.5rem']}>
          <img src={nytGraph} alt="New York Times chart" />
          <p>
            <a href="https://www.nytimes.com/interactive/2020/03/17/us/coronavirus-testing-data.html">
              U.S. Lags in Coronavirus Testing After Slow Response to Outbreak
            </a>
          </p>
          <DetailText>Source: The New York Times</DetailText>
        </Box>
        <Box width={[1, 1, 1 / 3]} pr={[0, '0.5rem']}>
          <img src={politicoMap} alt="Politico COVID Map" />
          <p>
            <a href="https://www.politico.com/interactives/2020/coronavirus-testing-by-state-chart-of-new-cases/">
              Coronavirus by State Map
            </a>
          </p>
          <DetailText>Source: Politico</DetailText>
        </Box>
        <Box width={[1, 1, 1 / 3]} pl={[0, '0.5rem']}>
          <img src={wsjGraph} alt="Wall Street Journal chart" />
          <p>
            <a href="https://www.wsj.com/articles/how-the-cdcs-restrictive-testing-guidelines-hid-the-coronavirus-epidemic-11584882001">
              Number of tests performed versus positive cases
            </a>
          </p>
          <DetailText>Source: The Wall Street Journal</DetailText>
        </Box>
      </Flex>
    </Container>
  </div>
)

export default Visualizations
