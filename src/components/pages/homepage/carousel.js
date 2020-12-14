/* eslint-disable react/no-array-index-key */
import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs'
import Container from '~components/common/container'
import USMap from './carousel-items/us-map'
import ChartNationalHospitalization from './carousel-items/chart-national-hospitalization'
import DailyTweet from './carousel-items/daily-tweet'
import carouselStyle from './carousel.module.scss'

const components = {
  'us-map': USMap,
  'daily-tweet': DailyTweet,
  'chart-national-hospitalization': ChartNationalHospitalization,
}

const CarouselItem = ({ item }) => {
  if (typeof components[item.configuration.component] === 'undefined') {
    return null
  }
  const ItemComponent = components[item.configuration.component]
  return (
    <>
      <ItemComponent
        configuration={item.configuration.configuration}
        item={item}
      />
    </>
  )
}

const HomepageCarousel = () => {
  const data = useStaticQuery(graphql`
    {
      contentfulHomepageCarousel {
        items {
          label
          configuration {
            configuration {
              metric
            }
            component
          }
          childContentfulHomepageCarouselItemDataDisclaimerTextNode {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  `)
  return (
    <Tabs>
      <TabList className={carouselStyle.tabs}>
        <Container>
          {data.contentfulHomepageCarousel.items.map((item, key) => (
            <Tab key={`carousel-tab-${key}`}>{item.label}</Tab>
          ))}
        </Container>
      </TabList>
      <div className={carouselStyle.carousel}>
        <Container>
          <TabPanels>
            {data.contentfulHomepageCarousel.items.map((item, key) => (
              <TabPanel key={`carousel-item-${key}`}>
                <CarouselItem item={item} />
              </TabPanel>
            ))}
          </TabPanels>
        </Container>
      </div>
    </Tabs>
  )
}

export default HomepageCarousel
