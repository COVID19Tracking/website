import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { Row, Col } from '~components/common/grid'
import chartListStyles from './chart-list.module.scss'

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
    <>
      <h2 className="a11y-only">All charts</h2>
      {data.allContentfulChartCategory.nodes.map(({ name, charts }) => (
        <>
          {charts && charts.length > 0 && (
            <>
              <h3>{name}</h3>
              <Row className={chartListStyles.list}>
                {charts.map(item => (
                  <Col width={[2, 2, 2]}>
                    <Link to={`/data/charts/${item.slug}`}>
                      {item.thumbnail && (
                        <img
                          src={item.thumbnail.resize.src}
                          alt=""
                          aria-hidden
                        />
                      )}
                    </Link>
                    <Link to={`/data/charts/${item.slug}`}>{item.title}</Link>
                  </Col>
                ))}
              </Row>
            </>
          )}
        </>
      ))}
    </>
  )
}

export default DataChartsPage
