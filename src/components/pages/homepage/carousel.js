import React, { useRef, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import classnames from 'classnames'
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
  const [currentItem, setCurrentItem] = useState(0)
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
    <div className={carouselStyle.carousel}>
      <Container>
        <CarouselItem
          item={data.contentfulHomepageCarousel.items[currentItem]}
        />
        <div role="group" className={carouselStyle.carouselSelector}>
          {data.contentfulHomepageCarousel.items.map((item, key) => (
            <button
              type="button"
              className={carouselStyle.selectButton}
              onClick={event => {
                event.preventDefault()
                setCurrentItem(key)
              }}
            >
              <img src={item.thumbnail.fixed.src} aria-hidden alt="" />
              {item.label}
            </button>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default HomepageCarousel
