import React from 'react'
import { Row, Col } from '~components/common/grid'
import ChartSparklines from './sparklines'
import ChartMap from './map'
import preambleStyles from './preamble.module.scss'

const ChartPreamble = ({ stateHistory, usHistory }) => (
  <Row className={preambleStyles.preamble}>
    <Col
      width={[4, 6, 4]}
      paddingRight={[0, 0, 32]}
      className={preambleStyles.column}
    >
      <ChartSparklines history={usHistory} />
    </Col>

    <Col width={[4, 6, 8]} paddingLeft={[0, 0, 32]}>
      <ChartMap stateHistory={stateHistory} />
    </Col>
  </Row>
)

export default ChartPreamble
