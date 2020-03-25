import React from 'react'
import { PressList } from '../components/common/press'

export default {
  title: 'Press Links',
}

export const regular = () => <PressList press={dummyData.allCovidPress.edges}/>

const dummyData = {
  "allCovidPress": {
    "edges": [
      {
        "node": {
          "title": "Coronavirus update: 392,870 cases globally, 17,159 deaths, Italy shows glimmer of hope and NYC remains U.S. epicenter",
          "url": "https://www.marketwatch.com/story/coronavirus-update-392870-cases-globally-17159-deaths-italy-shows-glimmer-of-hope-and-nyc-remains-us-epicenter-2020-03-24?siteid=yhoof2&yptr=yahoo",
          "publishDate": "24 March 2020",
          "id": "e0b4614e-ad97-5d0f-9cde-582b88c815ff",
          "publication": "MarketWatch"
        }
      },
      {
        "node": {
          "title": "Comparing COVID-19 in Minnesota and its neighbors in Upper Midwest",
          "url": "https://www.mprnews.org/story/2020/03/17/comparing-covid19-in-minnesota-and-its-neighbors-in-upper-midwest",
          "publishDate": "23 March 2020",
          "id": "72d7dbae-24b3-5253-8a3e-9bbbe54d23f7",
          "publication": "Minnesota Public Radio"
        }
      },
      {
        "node": {
          "title": "Coronavirus cases top 300,000 worldwide as US becomes one of worst hit countries",
          "url": "https://www.cnbc.com/2020/03/21/coronavirus-cases-top-300000-worldwide-as-us-becomes-one-of-worst-hit.html",
          "publishDate": "21 March 2020",
          "id": "a5ecabb4-c79a-58d3-b85e-e54035471d25",
          "publication": "CNBC"
        }
      }
    ]
  }
}
