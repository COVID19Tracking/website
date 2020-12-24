import React from 'react'
import classnames from 'classnames'
import Container from '~components/common/container'
import legendStyles from './legend.module.scss'

const Legend = () => (
  <Container>
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
          className={classnames(legendStyles.item, legendStyles.experiencing)}
        >
          experiencing
        </span>{' '}
        an outbreak.
      </div>
      <div>
        {' '}
        Some states{' '}
        <span
          className={classnames(legendStyles.item, legendStyles.outbreakOnly)}
        >
          only report outbreaks
        </span>
        .
      </div>
    </div>
  </Container>
)

export default Legend
