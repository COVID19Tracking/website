import React from 'react'
import { SmallCard, SmallCardIcon, SmallCardLink } from './index'

import chartIcon from '~images/icons/chart.svg'

const CrdtBreakoutSmallCard = ({ stateAbbreviation = 'US', stateSlug }) => {
  if (['AS', 'GU', 'MP', 'VI'].indexOf(stateAbbreviation) !== -1) {
    return <></>
  }
  return (
    <SmallCard destination={`/data/state/${stateSlug}/race-ethnicity`}>
      <SmallCardIcon>
        <img src={chartIcon} alt="Chart icon" width="30px" aria-hidden />
      </SmallCardIcon>
      <SmallCardLink>
        View all of {stateAbbreviation}&apos;s racial data
      </SmallCardLink>
    </SmallCard>
  )
}

export default CrdtBreakoutSmallCard
