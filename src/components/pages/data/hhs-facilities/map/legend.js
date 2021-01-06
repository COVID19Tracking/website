import React from 'react'
import { DateTime } from 'luxon'
import { FormatDate } from '~components/utils/format'
import Container from '~components/common/container'
import { Row, Col } from '~components/common/grid'
import legendStyles from './legend.module.scss'

const Legend = ({ mapLayer, setLayer, date }) => (
  <Container>
    <Row className={legendStyles.wrapper}>
      <Col width={[4, 6, 6]} paddingRight={[0, 0, 0]}>
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
        <p className={legendStyles.dates}>
          {date ? (
            <>
              Data for <FormatDate date={date} format="LLLL d, yyyy" /> to{' '}
              <FormatDate
                date={DateTime.fromISO(date)
                  .plus({ days: 6 })
                  .toISO()}
                format="LLLL d, yyyy"
              />
            </>
          ) : (
            <>&nbsp;</>
          )}
        </p>
      </Col>
      <Col width={[4, 6, 6]} paddingLeft={[0, 0, 16]}>
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
                {'<'}15%
              </div>
              <div>
                <div />
                15-30%
              </div>
              <div>
                <div />
                30-45%
              </div>
              <div>
                <div />
                {'>'}45%
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
