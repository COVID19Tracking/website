import React from 'react'
import { FormatDate } from '~components/utils/format'
import lastUpdatedStyle from './last-updated.module.scss'

// date format matches stats.lastUpdateEt
export default ({ lastUpdateEt, unformatted, national }) => (
  <p className={lastUpdatedStyle.lastUpdated}>
    {national ? <>L</> : <>State’s l</>}ast reported update time:{' '}
    {unformatted ? (
      <FormatDate date={lastUpdateEt} format="M/d/yy h:mm" />
    ) : (
      lastUpdateEt
    )}{' '}
    ET
  </p>
)
