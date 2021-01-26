import React from 'react'
import { SmallCard, SmallCardIcon, SmallCardLink } from './index'

import historicalIcon from '~images/icons/historical.svg'

const HistoricalRaceDataSmallCard = ({ stateSlug, stateAbbreviation }) => (
  <SmallCard destination={`/data/state/${stateSlug}/race-ethnicity/`}>
    <SmallCardIcon>
      <img
        src={historicalIcon}
        alt="Historical icon"
        width="30px"
        aria-hidden
      />
    </SmallCardIcon>
    <SmallCardLink>
      View {stateAbbreviation}&apos;s historical data
    </SmallCardLink>
  </SmallCard>
)

export default HistoricalRaceDataSmallCard