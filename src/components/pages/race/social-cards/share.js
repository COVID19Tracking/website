import React from 'react'
import { Link } from 'gatsby'
import slug from '~utilities/slug'

import DetailText from '~components/common/detail-text'
import SocialSharing from '~components/common/social-sharing'

import shareStyles from './share.module.scss'

export default ({ state }) => (
  <>
    <p>
      Did you know? Did you know? Did you know? Did you know? Did you know? Did
      you know?
    </p>
    <DetailText centered>Click to share on social media</DetailText>
    <SocialSharing
      shares={['facebook', 'twitter', 'link']}
      url="google.com"
      text="woohoo sharing"
      outlineOnly
    />
    {/*
      todo update the url and text

      the url can be configured as a page like /race/dashboard/california
      (that has the custom social card), which could then redirect to
      /race/dashboard#state-ca.

    */}
    <DetailText centered>
      Or, download the social media graphic below
    </DetailText>
    <img
      src={`/images/race-dashboard/${slug(state)}.png`}
      alt={`Social card for ${state}`}
      className={shareStyles.preview}
    />
    <h4 className={shareStyles.copyHeader}>Copy-and-paste URL</h4>
    <div className={shareStyles.copy}>
      https://covidtracking.com/images/race-dashboard/{slug(state)}.png
    </div>
    <DetailText centered className={shareStyles.licenseInfo}>
      You are free to use these images in accordance with our{' '}
      <Link to="/about-data/license">data license</Link>. Race and ethnicity
      groups displayed in these charts are defined by the US Census.
    </DetailText>
  </>
)
