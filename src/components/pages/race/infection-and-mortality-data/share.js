import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { DateTime } from 'luxon'

import DetailText from '~components/common/detail-text'
import SocialSharing from '~components/common/social-sharing'
import {
  getGroups,
  getTypeOfRates,
  getStateStatus,
} from '~components/social-media-graphics/race/utils'

import shareStyles from './share.module.scss'

const getStateSquareImageUrl = state =>
  `/images/race-dashboard/${state.childSlug.slug}-square.png`

const getLandingPageUrl = (state, noCharts) =>
  noCharts
    ? 'https://covidtracking.com/race/get-better-data'
    : `https://covidtracking.com/race/infection-and-mortality-data/${state.childSlug.slug}/`

const getStateName = name => {
  if (name === 'District of Columbia') {
    return 'the District of Columbia'
  }
  if (name === 'United States') {
    return 'the United States'
  }
  return name
}

const getTweetableDate = () => {
  const today = new Date()
  return `${today.toLocaleString('default', {
    month: 'long',
  })} ${today.getDate()}`
}

const getSocialCardShareText = (typeOfRates, state, groups) => {
  if (typeOfRates === 'no data') {
    return `In ${getStateName(
      state.name,
    )}, race and ethnicity information is still not reported for COVID-19 cases and deaths. Help us get better data by contacting health officials at https://covidtracking.com/race/get-better-data #RacialDataTracker`
  }
  if (typeOfRates === 'mortality data') {
    return `In ${getStateName(state.name)}, through ${getTweetableDate()}, ${
      groups.worstDeathsGroup
    } were most likely to have died from #COVID19. https://www.covidtracking.com/race/infection-and-mortality-data/${
      state.childSlug.slug
    } #RacialDataTracker`
  }
  if (typeOfRates === 'infection data') {
    return `In ${getStateName(state.name)}, through ${getTweetableDate()}, ${
      groups.worstCasesGroup
    } were most likely to have contracted #COVID19. Get the latest analysis: https://www.covidtracking.com/race/infection-and-mortality-data/${
      state.childSlug.slug
    } #RacialDataTracker`
  }
  if (typeOfRates === 'infection and mortality data') {
    if (groups.worstDeathsGroup === groups.worstCasesGroup) {
      return `In ${getStateName(state.name)}, through ${getTweetableDate()}, ${
        groups.worstCasesGroup
      } were most likely to have contracted #COVID19 and were most likely to have died. Get the latest analysis: https://www.covidtracking.com/race/infection-and-mortality-data/${
        state.childSlug.slug
      } #RacialDataTracker`
    }
  }
  return `In ${getStateName(state.name)}, through ${getTweetableDate()}, ${
    groups.worstCasesGroup
  } were most likely to have contracted #COVID19. ${
    groups.worstDeathsGroup
  } were most likely to have died. Get the latest analysis: https://www.covidtracking.com/race/infection-and-mortality-data/${
    state.childSlug.slug
  } #RacialDataTracker`
}

export default ({ state, stateRaceData, combinedStates }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            buildId
          }
        }
      }
    `,
  )

  if (state.name === '-- Select a state --') {
    return null
  }

  const typeOfRates = getTypeOfRates(stateRaceData, combinedStates)

  const groups = getGroups(stateRaceData)

  const { noCharts } = getStateStatus(stateRaceData, combinedStates)

  const socialCardShareText = getSocialCardShareText(typeOfRates, state, groups)

  const today = DateTime.local().toFormat('L-d-yyyy')

  return (
    <>
      <div className={shareStyles.shareWrapper}>
        <img
          src={`/images/race-dashboard/${state.childSlug.slug}.png?${site
            .siteMetadata.buildId || today}`}
          alt={socialCardShareText}
        />
      </div>
      <DetailText centered className={shareStyles.clickToShare}>
        <p>
          Share this directly on social media or{' '}
          <a href={getStateSquareImageUrl(state)}>
            download a square image for Instagram
          </a>
          .
        </p>
      </DetailText>
      <SocialSharing
        shares={['facebook', 'twitter', 'link']}
        className={shareStyles.socialSharing}
        url={getLandingPageUrl(state, noCharts)}
        text={socialCardShareText}
        outlineOnly
        textIncludesUrl
      />
    </>
  )
}
