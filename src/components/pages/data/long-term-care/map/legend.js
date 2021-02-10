import React from 'react'
import Container from '~components/common/container'
import LayerToggle from '~components/common/map/layer-toggle'
import legendStyles from './legend.module.scss'
import { Col, Row } from '~components/common/grid'

const Legend = ({ mapLayer }) => (
  <Container>
    <Row className={legendStyles.wrapper}>
      <Col width={[4, 6, 6]}>
        <LayerToggle
          layers={[
            {
              id: 'facilities',
              name: 'All facilities',
            },
            {
              id: 'cases',
              name: 'Cases',
            },
            {
              id: 'deaths',
              name: 'Deaths',
            },
            /* {
              id: 'cms-cases',
              name: 'Federal data',
            }, */
          ]}
        />
      </Col>
      <Col width={[4, 6, 6]}>
        <div className={legendStyles.legend} aria-hidden>
          {mapLayer === 'cms-cases' || mapLayer === 'cms-deaths' ? (
            <div>All facilities that report to the federal government.</div>
          ) : (
            <>
              <div>Long-term care facilities. [Legend TK]</div>
            </>
          )}
        </div>
      </Col>
    </Row>
  </Container>
)

export default Legend
