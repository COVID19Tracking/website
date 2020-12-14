/* eslint-disable react/no-array-index-key */
import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs'
import Container from '~components/common/container'
import USMap from './carousel-items/us-map'
import ChartNationalHospitalization from './carousel-items/charts/national-hospitalization'
import ChartNationalCases from './carousel-items/charts/national-cases'
import CarouselChartNationalDeaths from './carousel-items/charts/national-deaths'
import CarouselChartNationalTests from './carousel-items/charts/national-tests'
import DailyTweet from './carousel-items/daily-tweet'
import carouselStyle from './carousel.module.scss'

const components = {
  'us-map': USMap,
  'daily-tweet': DailyTweet,
  'chart-national-hospitalization': ChartNationalHospitalization,
  'chart-national-cases': ChartNationalCases,
  'chart-national-deaths': CarouselChartNationalDeaths,
  'chart-national-testing': CarouselChartNationalTests,
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

const SvgFilters = () => (
  <svg aria-hidden width={0} height={0}>
    <filter id="dropshadow">
      <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
      <feOffset dx="0" dy="0" result="offsetblur" />
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.3" />
      </feComponentTransfer>
      <feMerge>
        <feMergeNode />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id="dropshadow-large">
      <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
      <feOffset dx="0" dy="0" result="offsetblur" />
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.4" />
      </feComponentTransfer>
      <feMerge>
        <feMergeNode />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </svg>
)

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
    <>
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
      <SvgFilters />
    </>
  )
}

export default HomepageCarousel
