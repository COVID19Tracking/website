import React from 'react'
import classnames from 'classnames'
import Timezone from './timezone'
import lastUpdatedStyle from './last-updated.module.scss'

// date format matches stats.lastUpdateEt
const LastUpdated = ({ date, national, noMargin = false }) => (
  <p
    className={classnames(
      lastUpdatedStyle.lastUpdated,
      national && lastUpdatedStyle.national,
      noMargin && lastUpdatedStyle.noMargin,
    )}
  >
    {national ? <>Data for</> : <>State’s dataset was last updated at</>} {date}{' '}
    {!national && <Timezone />}
  </p>
)

export default LastUpdated
