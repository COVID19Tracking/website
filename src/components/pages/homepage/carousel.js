/* eslint-disable react/no-array-index-key */
import React, { useRef, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import classnames from 'classnames'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs'
import Container from '~components/common/container'
import USMap from './carousel-items/us-map'
import DailyTweet from './carousel-items/daily-tweet'
import carouselStyle from './carousel.module.scss'

const Components = {
  'us-map': USMap,
  'daily-tweet': DailyTweet,
}

const CarouselItem = ({ item }) => {
  const [disclosureOpen, setDisclosureOpen] = useState(false)
  const disclosureRef = useRef()
  const ItemComponent = Components[item.configuration.component]
  return (
    <>
      <ItemComponent
        configuration={item.configuration.configuration}
        item={item}
      />

      <button
        className={carouselStyle.disclosureToggle}
        type="button"
        aria-expanded={disclosureOpen}
        onClick={event => {
          event.preventDefault()
          setDisclosureOpen(!disclosureOpen)
          if (!disclosureOpen) {
            disclosureRef.current.focus()
          }
        }}
      >
        <span className={carouselStyle.text}>About the data</span>{' '}
        <span aria-hidden>{disclosureOpen ? <>↑</> : <>↓</>}</span>
      </button>
      <div
        ref={disclosureRef}
        tabIndex="-1"
        className={classnames(
          carouselStyle.disclosure,
          disclosureOpen && carouselStyle.isOpen,
        )}
        aria-expanded={disclosureOpen}
        dangerouslySetInnerHTML={{
          __html:
            item.childContentfulHomepageCarouselItemDataDisclaimerTextNode
              .childMarkdownRemark.html,
        }}
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
          thumbnail {
            fixed(width: 200) {
              src
            }
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
