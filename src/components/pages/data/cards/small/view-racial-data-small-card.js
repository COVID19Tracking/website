import React from 'react'
import { SmallCard, SmallCardIcon, SmallCardLink } from './index'

import spreadsheetIcon from '~images/icons/spreadsheet.svg'

const ViewRacialDataSmallCard = () => (
  <SmallCard destination="/race/dashboard">
    <SmallCardIcon>
      <img src={spreadsheetIcon} alt="Spreadsheet icon" width="30px" />
    </SmallCardIcon>
    <SmallCardLink>View racial data dashboard</SmallCardLink>
  </SmallCard>
)

export default ViewRacialDataSmallCard
