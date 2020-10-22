import React from 'react'
import { DateTime } from 'luxon'
import { Row, Col } from '~components/common/grid'
import tweetStyles from './tweet.module.scss'
import twitterIcon from '~images/twitter_icon.png'
import twitterLogo from '~images/icons/twitter.svg'

const Tweet = ({ text, media, link, date }) => (
  <a href={link} className={tweetStyles.tweet}>
    <Row>
      <Col width={[6, 4, media ? 6 : 12]}>
        {!media && (
          <img
            src={twitterLogo}
            alt="Twitter"
            className={tweetStyles.twitterLogo}
          />
        )}
        <h4>
          <span className="a11y-only">Latest tweet from </span>
          <img src={twitterIcon} alt="" />
          @COVID19Tracking
        </h4>
        <blockquote>{text.replace(/https:\/\/t.co\/(.*)/, '')}</blockquote>
        <p className={tweetStyles.date}>
          {DateTime.fromFormat(date, 'EEE MMM d HH:mm:ss ZZZ yyyy').toFormat(
            'LLLL d yyyy',
          )}
        </p>
      </Col>
      {media && (
        <Col width={[6, 4, 6]}>
          <img
            src={twitterLogo}
            alt="Twitter"
            className={tweetStyles.twitterLogo}
          />
          <img src={media} alt="" />
        </Col>
      )}
    </Row>
  </a>
)

export default Tweet
