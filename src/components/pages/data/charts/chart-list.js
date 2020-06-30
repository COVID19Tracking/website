import React from 'react'
import { Link } from 'gatsby'
import { Row, Col } from '~components/common/grid'
import chartListStyles from './chart-list.module.scss'

export default ({ charts }) => (
  <Row className={chartListStyles.charts}>
    {charts.map(({ name, chart }) => (
      <Col width={[4, 3, 3]} paddingRight={[0, 8, 32]} paddingLeft={[0, 0, 0]}>
        <h2>{name}</h2>
        {chart && chart.length > 0 && (
          <ul className={chartListStyles.list}>
            {chart.map(item => (
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
