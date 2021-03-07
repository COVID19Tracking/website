import React from 'react'
import { Link } from 'gatsby'
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
              {(mapLayer === 'cases' || mapLayer === 'deaths') && (
                <>
                  <span className={legendStyles.outbreakOnly} />
                  State reports&nbsp;
                  <Link to="#ltc-map-definitions">only outbreak data</Link>
                  &nbsp;
                  {mapLayer === 'cases' ? (
                    <>for cases</>
                  ) : (
                    <>{mapLayer === 'deaths' && <>for deaths</>}</>
                  )}{' '}
                </>
              )}
              <span className={legendStyles.missing} />
              State reports no facility-level{' '}
              {mapLayer === 'cases' ? (
                <>case</>
              ) : (
                <>{mapLayer === 'deaths' && <>death</>}</>
              )}{' '}
              data
            </>
          )}
        </div>
      </Col>
    </Row>
  </Container>
)

export default Legend
