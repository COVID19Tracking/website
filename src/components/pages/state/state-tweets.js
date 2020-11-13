import React from 'react'
import { CtaAnchorLink } from '~components/common/landing-page/call-to-action'
import Tweet from '~components/common/tweet'
import twitterIcon from '~images/twitter_icon.png'
import stateTweetsStyle from './state-tweets.module.scss'

const StateTweets = ({ name, stateAbbreviation, tweets }) => {
  if (typeof tweets.nodes === 'undefined' || !tweets.nodes.length) {
    return null
  }
  return (
    <>
      <h2 id="state-tweets">Our latest tweets about {name}</h2>
      <h4 className={stateTweetsStyle.twitterHandle}>
        <span className="a11y-only">Our twitter handle is </span>
        <a
          href="https://twitter.com/COVID19Tracking"
          target="_blank"
          rel="noreferrer"
        >
          <img src={twitterIcon} alt="@COVID19Tracking" />
        </a>
        <a
          href="https://twitter.com/COVID19Tracking"
          target="_blank"
          rel="noreferrer"
        >
          @COVID19Tracking
        </a>
      </h4>
      {tweets.nodes.map(tweet => (
        <Tweet
          hideHandle
          stateName={name}
          stateAbbreviation={stateAbbreviation}
          date={tweet.date}
          text={tweet.full_text}
          link={`https://twitter.com/COVID19Tracking/status/${tweet.id_str}`}
        />
      ))}
      <CtaAnchorLink
        href={`https://twitter.com/search?q=from%3A%40COVID19Tracking%20${name}&src=typed_query`}
      >
        More tweets about {name}
      </CtaAnchorLink>
    </>
  )
}

export default StateTweets
