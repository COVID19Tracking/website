import React from 'react'
import { SmallCard, SmallCardIcon, SmallCardLink } from './index'

import historicalIcon from '~images/icons/historical.svg'

const HistoricalRaceDataSmallCard = ({ stateSlug, stateAbbreviation }) => {
  if (['PR', 'MP', 'AS', 'VI'].indexOf(stateAbbreviation) !== -1) {
    return <></>
  }
  return (
    <SmallCard
      destination={`/data/state/${stateSlug}/race-ethnicity/historical`}
    >
      <SmallCardIcon>
        <img
          src={historicalIcon}
          alt="Historical icon"
          width="32px"
          aria-hidden
        />
      </SmallCardIcon>
      <SmallCardLink>
        View {stateAbbreviation}&apos;s historical racial data
      </SmallCardLink>
    </SmallCard>
  )
}

export default HistoricalRaceDataSmallCard
