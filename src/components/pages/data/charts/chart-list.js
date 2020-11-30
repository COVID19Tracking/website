import React, { useState } from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import classnames from 'classnames'
import chartListStyles from './chart-list.module.scss'

const ChartCarousel = ({ charts }) => {
  const [activeItem, setActiveItem] = useState(0)
  const carouselLength = 5

  const updateActiveItem = add => {
    if (
      typeof charts[activeItem + add + carouselLength] !== 'undefined' &&
      activeItem + add >= 0
    ) {
      setActiveItem(activeItem + add)
    }
  }
  return (
    <ul
      className={classnames(
        chartListStyles.carousel,
        charts.length <= carouselLength && chartListStyles.noCarousel,
      )}
    >
      {charts.length > carouselLength && (
        <li className={chartListStyles.navigation}>
          <button
            type="button"
            aria-hidden
            disabled={activeItem === 0 ? true : undefined}
            onClick={event => {
              event.preventDefault()
              updateActiveItem(-1)
            }}
          >
            ←<span className="a11y-only">Prior charts</span>
          </button>
        </li>
      )}
      {charts.map((item, index) => (
        <li
          className={classnames(
            chartListStyles.chart,
            index >= activeItem &&
              index < activeItem + carouselLength &&
              chartListStyles.active,
          )}
        >
          <Link to={`/data/charts/${item.slug}`}>
            {item.thumbnail && (
              <img src={item.thumbnail.resize.src} alt="" aria-hidden />
            )}
          </Link>
          <Link to={`/data/charts/${item.slug}`}>{item.title}</Link>
        </li>
      ))}
      {charts.length > carouselLength && (
        <li className={chartListStyles.navigation}>
          <button
            type="button"
            aria-hidden
            disabled={
              activeItem >= charts.length - carouselLength - 1
                ? true
                : undefined
            }
            onClick={event => {
              event.preventDefault()
              updateActiveItem(1)
            }}
          >
            →<span className="a11y-only">Next charts</span>
          </button>
        </li>
      )}
    </ul>
  )
}

const DataChartsPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulChartCategory(sort: { fields: [order], order: ASC }) {
        nodes {
          name
          slug
          charts {
            title
            slug
            thumbnail {
              resize(width: 300) {
                src
              }
            }
          }
        }
      }
    }
  `)
  return (
    <div className={chartListStyles.lists}>
      <h2 className="a11y-only">All charts</h2>
      {data.allContentfulChartCategory.nodes.map(({ name, charts }) => (
        <>
          {charts && charts.length > 0 && (
            <>
              <h3 className={chartListStyles.heading}>{name}</h3>
              <ChartCarousel charts={charts} />
            </>
          )}
        </>
      ))}
    </div>
  )
}

export default DataChartsPage
