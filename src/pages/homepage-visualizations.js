import React from 'react'
import Layout from '~components/layout'
import { components } from '~components/pages/homepage/visualization-gallery'

const Item = ({ component, item }) => {
  const ItemComponent = component
  return <ItemComponent configuration={item.configuration} item={item} />
}

const VizualizationSheet = () => (
  <Layout title="Visualization sheet">
    <h2>US Map - cases per 100k</h2>
    <p>Use the following configuration in Contentful:</p>
    <code>
      <pre>{`{
    "component": "us-map",
    "configuration": {
        "metric": "casesPer100k"
    }
}`}</pre>
    </code>
    <Item
      component={components['us-map']}
      item={{
        relatedPost: false,
        configuration: {
          metric: 'casesPer100k',
        },
      }}
    />
    <hr />
    <h2>US Map - seven day average cases</h2>
    <p>Use the following configuration in Contentful:</p>
    <code>
      <pre>{`{
    "component": "us-map",
    "configuration": {
        "metric": "sevenDayPositive"
    }
}`}</pre>
    </code>
    <Item
      component={components['us-map']}
      item={{
        relatedPost: false,
        configuration: {
          metric: 'sevenDayPositive',
        },
      }}
    />
    <hr />
    <h2>US Map - hospitalization per 1M</h2>
    <p>Use the following configuration in Contentful:</p>
    <code>
      <pre>{`{
    "component": "us-map",
    "configuration": {
        "metric": "hospitalizationPer1m"
    }
}`}</pre>
    </code>
    <Item
      component={components['us-map']}
      item={{
        relatedPost: false,
        configuration: {
          metric: 'hospitalizationPer1m',
        },
      }}
    />
    <hr />
    <h2>US Map - deaths change 7day average</h2>
    <p>Use the following configuration in Contentful:</p>
    <code>
      <pre>{`{
    "component": "us-map",
    "configuration": {
        "metric": "deathsChange7day"
    }
}`}</pre>
    </code>
    <Item
      component={components['us-map']}
      item={{
        relatedPost: false,
        configuration: {
          metric: 'deathsChange7day',
        },
      }}
    />
    <hr />
    <h2>National 4-up chart</h2>
    <Item
      component={components['national-chart']}
      item={{ relatedPost: false, configuration: {} }}
    />
    <hr />
    <h2>National hospitalization</h2>
    <Item
      component={components['chart-national-hospitalization']}
      item={{ relatedPost: false, configuration: {} }}
    />
    <hr />
    <h2>National cases</h2>
    <Item
      component={components['chart-national-cases']}
      item={{ relatedPost: false, configuration: {} }}
    />
    <hr />
    <h2>National deaths</h2>
    <Item
      component={components['chart-national-deaths']}
      item={{ relatedPost: false, configuration: {} }}
    />
    <hr />
    <h2>National testing</h2>
    <Item
      component={components['chart-national-testing']}
      item={{ relatedPost: false, configuration: {} }}
    />
  </Layout>
)

export default VizualizationSheet
