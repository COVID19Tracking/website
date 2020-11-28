import React from 'react'
import { SmallCard, SmallCardIcon, SmallCardLink } from './index'

import chartIcon from '~images/icons/chart.svg'

const DataAsGraphicSmallCard = ({ stateAbbreviation = 'US', ignoreStates }) =>
  ignoreStates.indexOf(stateAbbreviation) === -1 && (
    <SmallCard
      destination={`/race/infection-and-mortality-data#${stateAbbreviation}`}
    >
      <SmallCardIcon>
        <img src={chartIcon} alt="Chart icon" width="30px" aria-hidden />
      </SmallCardIcon>
      <SmallCardLink>Get shareable graphic for this data</SmallCardLink>
    </SmallCard>
  )

export default DataAsGraphicSmallCard
