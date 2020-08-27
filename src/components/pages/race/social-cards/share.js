import React from 'react'
import { Link } from 'gatsby'
import slug from '~utilities/slug'

import DetailText from '~components/common/detail-text'
import SocialSharing from '~components/common/social-sharing'

import shareStyles from './share.module.scss'

const getStateShareImageUrl = state =>
  `https://covidtracking.com/images/race-dashboard/${slug(state)}.png`

export default ({ state }) => (
  <>
    <p>
      Did you know? Did you know? Did you know? Did you know? Did you know? Did
      you know?
    </p>
    <DetailText centered className={shareStyles.clickToShare}>
      Click to share on social media
    </DetailText>
    <SocialSharing
      shares={['facebook', 'twitter', 'link']}
      url={getStateShareImageUrl(state)}
      text="woohoo sharing"
      outlineOnly
    />
    <DetailText centered className={shareStyles.downloadGraphic}>
      Or, download the social media graphic below
    </DetailText>
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
