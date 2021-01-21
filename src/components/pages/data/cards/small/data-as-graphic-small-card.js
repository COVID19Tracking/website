import React from 'react'
import { SmallCard, SmallCardIcon, SmallCardLink } from './index'

import chartIcon from '~images/icons/chart.svg'

const DataAsGraphicSmallCard = ({ stateAbbreviation = 'US', stateName }) => (
  <SmallCard
    destination={`/race/infection-and-mortality-data#${stateAbbreviation}`}
  >
    <SmallCardIcon>
      <img src={chartIcon} alt="Chart icon" width="30px" aria-hidden />
    </SmallCardIcon>
    <SmallCardLink>
      Get shareable graphic{' '}
      <span className="a11y-only">for {stateName}&apos;s</span>
      <span aria-hidden>of {stateAbbreviation}&apos;s</span> racial data
    </SmallCardLink>
  </SmallCard>
)

export default DataAsGraphicSmallCard
