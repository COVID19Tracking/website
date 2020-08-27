import React from 'react'
import { Link } from 'gatsby'
import slug from '~utilities/slug'

import DetailText from '~components/common/detail-text'
import SocialSharing from '~components/common/social-sharing'

import shareStyles from './share.module.scss'

const getStateShareImageUrl = state =>
  `https://covidtracking.com/images/race-dashboard/${slug(state)}.png`

export default ({ state }) => {
  if (state === '-- Select a state --') {
    return null
  }
  return (
    <>
      <p>
        Did you know? Did you know? Did you know? Did you know? Did you know?
        Did you know?
      </p>
      <DetailText centered className={shareStyles.clickToShare}>
        <a href={getStateShareImageUrl(state)}>Download the image</a> or share
        directly on social media
      </DetailText>
      <SocialSharing
        shares={['facebook', 'twitter', 'link']}
        className={shareStyles.socialSharing}
        url={getStateShareImageUrl(state)}
        text="woohoo sharing"
        outlineOnly
      />
      <img
        src={`/images/race-dashboard/${slug(state)}.png`}
        alt={`Social card for ${state}`}
        className={shareStyles.preview}
      />
      <DetailText centered className={shareStyles.licenseInfo}>
        You are free to use these images in accordance with our{' '}
        <Link to="/about-data/license">data license</Link>. Race and ethnicity
        groups displayed in these charts are defined by the US Census.
      </DetailText>
    </>
  )
}
