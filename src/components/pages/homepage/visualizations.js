import React from 'react'
import Visualization from './visualization'
import Container from '../../common/container'
import nytGraph from '../../../images/homepage-visualizations/nyt.png'
import politicoMap from '../../../images/homepage-visualizations/politico-map.png'
import wsjGraph from '../../../images/homepage-visualizations/wsj.png'
import visualizationsStyles from './visualizations.module.scss'

const Visualizations = () => (
  <div className={visualizationsStyles.visualizationsModule}>
    <Container>
      <h2>From the visualization gallery</h2>
      <ul className={visualizationsStyles.visualizationsList}>
        <Visualization
          image={nytGraph}
          sourceLink="https://www.nytimes.com/interactive/2020/03/17/us/coronavirus-testing-data.html"
          sourceTitle="U.S. Lags in Coronavirus Testing After Slow Response to Outbreak"
          publicationName="The New York Times"
          itemClass={visualizationsStyles.visualization}
        />
        <Visualization
          image={politicoMap}
          sourceLink="https://www.politico.com/interactives/2020/coronavirus-testing-by-state-chart-of-new-cases/"
          sourceTitle="Coronavirus by State Map"
          publicationName="Politico"
          itemClass={visualizationsStyles.visualization}
        />
        <Visualization
          image={wsjGraph}
          sourceLink="https://www.wsj.com/articles/how-the-cdcs-restrictive-testing-guidelines-hid-the-coronavirus-epidemic-11584882001"
          sourceTitle="Number of tests performed versus positive cases"
          publicationName="The Wall Street Journal"
          itemClass={visualizationsStyles.visualization}
        />
      </ul>
    </Container>
  </div>
)

export default Visualizations
