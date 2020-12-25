import React from 'react'
import classnames from 'classnames'
import Container from '~components/common/container'
import legendStyles from './legend.module.scss'
import { Col, Row } from '~components/common/grid'

const Legend = ({ mapLayer, setLayer }) => (
  <Container>
    <Row className={legendStyles.wrapper}>
      <Col width={[4, 6, 4]}>
        <div
          className={legendStyles.toggle}
          role="group"
          aria-label="Toggle map layers"
        >
          <button
            className={mapLayer === 'cases' && legendStyles.active}
            type="button"
            onClick={() => {
              setLayer('cases')
            }}
          >
            Cases
          </button>
          <button
            className={mapLayer === 'deaths' && legendStyles.active}
            type="button"
            onClick={() => {
              setLayer('deaths')
            }}
          >
            Deaths
          </button>
        </div>
      </Col>
      <Col width={[4, 6, 8]}>
        <div className={legendStyles.legend} aria-hidden>
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
          <div>
            {' '}
            Some states{' '}
            <span
              className={classnames(
                legendStyles.item,
                legendStyles.outbreakOnly,
              )}
            >
              only report outbreaks
            </span>
            , and some states{' '}
            <span className={legendStyles.noData}>
              don&apos;t report any LTC data
            </span>
            .
          </div>
        </div>
      </Col>
    </Row>
  </Container>
)

export default Legend
