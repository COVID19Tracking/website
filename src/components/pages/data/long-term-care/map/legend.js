import React from 'react'
import Container from '~components/common/container'
import LayerToggle from '~components/common/map/layer-toggle'
import legendStyles from './legend.module.scss'
import { Col, Row } from '~components/common/grid'

const Legend = ({ mapLayer }) => (
  <Container>
    <Row className={legendStyles.wrapper}>
      <Col width={[4, 6, 4]}>
        <LayerToggle
          layers={[
            {
              id: 'facilities',
              name: 'All Facilities Impacted',
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
      <Col width={[4, 6, 8]}>
        <div className={legendStyles.legend} aria-hidden>
          {mapLayer === 'cms-cases' || mapLayer === 'cms-deaths' ? (
            <div>All facilities that report to the federal government.</div>
          ) : (
            <>
              <div>
                Most states report cumulative data, some states{' '}
                <span className={legendStyles.outbreakOnly}>
                  only report outbreak data,
                </span>
                while{' '}
                <span className={legendStyles.missing}>
                  others do not report any facility data.
                </span>
              </div>
            </>
          )}
        </div>
      </Col>
    </Row>
  </Container>
)

export default Legend
