import React from 'react'
import Container from '~components/common/container'
import { Row, Col } from '~components/common/grid'
import legendStyles from './legend.module.scss'

const Legend = ({ mapLayer, setLayer }) => (
  <Container>
    <Row className={legendStyles.wrapper}>
      <Col width={[4, 6, 6]}>
        <div
          className={legendStyles.toggle}
          role="group"
          aria-label="Toggle map layers"
        >
          <button
            className={mapLayer === 'patients' && legendStyles.active}
            type="button"
            onClick={() => {
              setLayer('patients')
            }}
          >
            All inpatients
          </button>
          <button
            className={mapLayer === 'icu' && legendStyles.active}
            type="button"
            onClick={() => {
              setLayer('icu')
            }}
          >
            ICU patients
          </button>
        </div>
      </Col>
      <Col width={[4, 6, 6]}>
        <div className={legendStyles.legend} aria-hidden>
          <div>
            <div className={legendStyles.label}>
              % of {mapLayer === 'patients' ? <>hospital</> : <>ICU</>} beds
              with COVID patients
            </div>
            <div className={legendStyles.scale}>
              <div>
                <div />
                N/A
              </div>
              <div>
                <div />
                0%
              </div>
              <div>
                <div />
                {'<'}10%
              </div>
              <div>
                <div />
                10-20%
              </div>
              <div>
                <div />
                20-30%
              </div>
              <div>
                <div />
                {'>'}30%
              </div>
            </div>
            <div className={legendStyles.label}>
              Circle size indicates total COVID{' '}
              {mapLayer === 'patients' ? <>inpatients</> : <>ICU patients</>}
            </div>
          </div>
        </div>
      </Col>
    </Row>
  </Container>
)

export default Legend
