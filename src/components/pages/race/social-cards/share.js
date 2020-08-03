import React from 'react'
import slug from '~utilities/slug'
import shareStyles from './share.module.scss'

export default ({ state }) => (
  <>
    <h2>Share image for {state}</h2>
    <img
      src={`/images/race-dashboard/${slug(state)}.png`}
      alt={`Social card for ${state}`}
      className={shareStyles.preview}
    />
    <h3>Copy-and-paste URL</h3>
    <div className={shareStyles.copy}>
      https://covidtracking.com/images/race-dashboard/{slug(state)}.png
    </div>
  </>
)
