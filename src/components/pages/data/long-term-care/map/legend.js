import React from 'react'
import classnames from 'classnames'
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
              id: 'cases',
              name: 'Cases',
            },
            {
              id: 'deaths',
              name: 'Deaths',
            },
            {
              id: 'cases-outbreak-only',
              name: 'Outbreak Cases',
            },
            {
              id: 'deaths-outbreak-only',
              name: 'Outbreak Deaths',
            },
            {
              id: 'cms-cases',
              name: 'Federal data',
            },
          ]}
        />
      </Col>
      <Col width={[4, 6, 6]}>
        <div className={legendStyles.legend} aria-hidden>
          {mapLayer === 'cms-cases' || mapLayer === 'cms-deaths' ? (
            <p>All facilities that report to the federal government.</p>
          ) : (
            <>
              <div>
                Long-term care facilities{' '}
                <span
                  className={classnames(
                    legendStyles.item,
                    legendStyles.notExperiencing,
                  )}
                >
                  not experiencing
                </span>{' '}
                and{' '}
                <span
                  className={classnames(
                    legendStyles.item,
                    legendStyles.experiencing,
                  )}
                >
                  experiencing
                </span>{' '}
                an outbreak.
              </div>
            </>
          )}
        </div>
      </Col>
    </Row>
  </Container>
)

export default Legend
