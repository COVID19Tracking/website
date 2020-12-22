import React from 'react'
import Container from '~components/common/container'
import legendStyles from './legend.module.scss'

const Legend = () => (
  <Container>
    <div className={legendStyles.legend} aria-hidden>
      <div>
        <div className={legendStyles.label}>
          % of hospital beds with COVID patients
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
          Circle size indicates total COVID patients
        </div>
      </div>
    </div>
  </Container>
)

export default Legend
