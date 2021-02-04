import React from 'react'
import { SmallCard, SmallCardIcon, SmallCardLink } from './index'

import spreadsheetIcon from '~images/icons/spreadsheet.svg'

const ViewRacialDataSmallCard = ({ stateAbbreviation, stateName, content }) => (
  <SmallCard
    destination={`/race/dashboard#state-${stateAbbreviation.toLowerCase()}`}
  >
    <SmallCardIcon>
      <img
        src={spreadsheetIcon}
        alt="Spreadsheet icon"
        width="30px"
        aria-hidden
      />
    </SmallCardIcon>
    <SmallCardLink>
      {content ? (
        <>{content}</>
      ) : (
        <>
          View more racial data
          <span className="a11y-only"> for {stateName}</span>
        </>
      )}
    </SmallCardLink>
  </SmallCard>
)

export default ViewRacialDataSmallCard
