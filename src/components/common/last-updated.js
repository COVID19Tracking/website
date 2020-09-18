import React from 'react'
import classnames from 'classnames'
import Timezone from './timezone'
import lastUpdatedStyle from './last-updated.module.scss'

// date format matches stats.lastUpdateEt
const LastUpdated = ({ date, national }) => (
  <p
    className={classnames(
      lastUpdatedStyle.lastUpdated,
      national && lastUpdatedStyle.national,
    )}
  >
    {national ? <>Data for</> : <>State’s dataset was last updated at</>} {date}{' '}
    {!national && <Timezone />}
  </p>
)

export default LastUpdated
