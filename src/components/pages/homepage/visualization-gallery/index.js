/* eslint-disable react/no-array-index-key */
import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs'
import Container from '~components/common/container'
import USMap from './items/us-map'
import ChartNationalHospitalization from './items/single-charts/national-hospitalization'
import ChartNationalCases from './items/single-charts/national-cases'
import GalleryChartNationalDeaths from './items/single-charts/national-deaths'
import GalleryChartNationalTests from './items/single-charts/national-tests'
import NationalCharts from './items/national-chart'
import galleryStyle from './visualization-gallery.module.scss'

const components = {
  'us-map': USMap,
  'national-chart': NationalCharts,
  'chart-national-hospitalization': ChartNationalHospitalization,
  'chart-national-cases': ChartNationalCases,
  'chart-national-deaths': GalleryChartNationalDeaths,
  'chart-national-testing': GalleryChartNationalTests,
}

const GalleryItem = ({ item }) => {
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

const HomepageGallery = () => {
  const data = useStaticQuery(graphql`
    {
      contentfulHomepageVisualizationGallery {
        items {
          label
          configuration {
            configuration {
              metric
            }
            component
          }
          childContentfulHomepageGalleryItemDataDisclaimerTextNode {
            childMarkdownRemark {
              html
            }
          }
          relatedPost {
            title
            slug
            publishDate(formatString: "MMMM D, YYYY")
          }
        }
      }
    }
  `)
  return (
    <>
      <Tabs>
        <div className={galleryStyle.tabContainer}>
          <TabList className={galleryStyle.tabs}>
            <Container>
              {data.contentfulHomepageVisualizationGallery.items.map(
                (item, key) => (
                  <Tab key={`gallery-tab-${key}`}>{item.label}</Tab>
                ),
              )}
            </Container>
          </TabList>
        </div>
        <div className={galleryStyle.gallery}>
          <Container>
            <TabPanels className={galleryStyle.tabPanel}>
              {data.contentfulHomepageVisualizationGallery.items.map(
                (item, key) => (
                  <TabPanel key={`gallery-item-${key}`}>
                    <GalleryItem item={item} />
                  </TabPanel>
                ),
              )}
            </TabPanels>
          </Container>
        </div>
      </Tabs>
    </>
  )
}

export default HomepageGallery

export { components }
