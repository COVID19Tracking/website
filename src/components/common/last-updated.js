import React from 'react'
import { FormatDate } from '~components/utils/format'
import Timezone from './timezone'
import lastUpdatedStyle from './last-updated.module.scss'

// date format matches stats.lastUpdateEt
export default ({ date, national }) => (
  <p className={lastUpdatedStyle.lastUpdated}>
    {national ? (
      <>Our dataset was last updated at</>
    ) : (
      <>State’s dataset was last updated at</>
    )}{' '}
    <FormatDate date={date} format="M/d/yy h:mm a" /> <Timezone />
  </p>
)
