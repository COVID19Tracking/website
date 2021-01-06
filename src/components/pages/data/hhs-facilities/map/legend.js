import React, { useContext } from 'react'
import { DateTime } from 'luxon'
import { FormatDate } from '~components/utils/format'
import Container from '~components/common/container'
import { Row, Col } from '~components/common/grid'
import LayerToggle from '~components/common/map/layer-toggle'
import MapContext from '~components/common/map/map-context'
import legendStyles from './legend.module.scss'

const Legend = ({ date }) => {
  const mapContext = useContext(MapContext)
  return (
    <Container>
      <Row className={legendStyles.wrapper}>
        <Col width={[4, 6, 6]} paddingRight={[0, 0, 0]}>
          <LayerToggle
            layers={[
              {
                id: 'patients',
                name: 'All inpatients',
              },
              {
                id: 'icu',
                name: 'ICU patients',
              },
            ]}
          />
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
                % of{' '}
                {mapContext.mapLayer === 'patients' ? <>hospital</> : <>ICU</>}{' '}
                beds with COVID patients
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
                {mapContext.mapLayer === 'patients' ? (
                  <>inpatients</>
                ) : (
                  <>ICU patients</>
                )}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Legend
