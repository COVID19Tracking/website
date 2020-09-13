import React from 'react'

import DetailText from '~components/common/detail-text'
import SocialSharing from '~components/common/social-sharing'
import { getGroups } from '~components/social-media-graphics/race/state'

import shareStyles from './share.module.scss'

const getStateSquareImageUrl = state =>
  `/images/race-dashboard/${state.childSlug.slug}-square.png`

const getLandingPageUrl = state =>
  `https://covidtracking.com/race/social-media-graphics/${state.childSlug.slug}`

export default ({ state, stateRaceData }) => {
  if (state.name === '-- Select a state --') {
    return null
  }

  const typeOfRates = 'todo todo' // todo set this

  const groups = getGroups(stateRaceData)

  const socialCardShareText = `${typeOfRates} are reported. In ${state.name}, #COVID19 cases are worst for ${groups.worstCasesGroup} and deaths are worst for ${groups.worstDeathsGroup} Get the facts: https://www.covidtracking.com/race/social-media-graphics/${state.childSlug.slug}`

  return (
    <>
      <img
        src={`/images/race-dashboard/${state.childSlug.slug}.png`}
        alt={`Social card for ${state.name}`}
        className={shareStyles.preview}
      />
      <p>{socialCardShareText}</p>
      <DetailText centered className={shareStyles.clickToShare}>
        Share this directly on social media or{' '}
        <a href={getStateSquareImageUrl(state)}>
          download a square image for Instagram
        </a>
        .
      </DetailText>
      <SocialSharing
        shares={['facebook', 'twitter', 'link']}
        className={shareStyles.socialSharing}
        url={getLandingPageUrl(state)}
        text={socialCardShareText}
        outlineOnly
      />
    </>
  )
}
