import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { Row, Col } from '~components/common/grid'
import chartListStyles from './chart-list.module.scss'

const ChartList = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulChartCategory(sort: { fields: [order], order: ASC }) {
        nodes {
          name
          slug
          charts {
            title
            slug
          }
        }
      }
    }
  `)
  return (
    <Row className={chartListStyles.charts}>
      {data.allContentfulChartCategory.nodes.map(({ name, charts }) => (
        <Col
          width={[4, 3, 3]}
          paddingRight={[0, 8, 32]}
          paddingLeft={[0, 0, 0]}
        >
          <h2>{name}</h2>
          {charts && charts.length > 0 && (
            <ul className={chartListStyles.list}>
              {charts.map(item => (
                <li>
                  <Link to={`/data/charts/${item.slug}`}>{item.title}</Link>
                </li>
              ))}
            </ul>
          )}
        </Col>
      ))}
    </Row>
  )
}

export default ChartList
