import React from 'react'
import { FormatDate } from '~components/utils/format'
import Timezone from './timezone'
import lastUpdatedStyle from './last-updated.module.scss'

// date format matches stats.lastUpdateEt
export default ({ date, unformatted, national }) => (
  <p className={lastUpdatedStyle.lastUpdated}>
    {national ? <>L</> : <>State’s l</>}ast reported update time:{' '}
    {unformatted ? date : <FormatDate date={date} format="M/d/yy h:mm a" />}{' '}
    <Timezone />
  </p>
)
