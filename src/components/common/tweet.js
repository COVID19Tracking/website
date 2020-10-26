import React from 'react'
import { DateTime } from 'luxon'
import classnames from 'classnames'
import { Row, Col } from '~components/common/grid'
import tweetStyles from './tweet.module.scss'
import twitterIcon from '~images/twitter_icon.png'
import twitterLogo from '~images/icons/twitter.svg'

const Tweet = ({ text, media, link, date }) => (
  <a href={link} className={tweetStyles.tweet}>
    <Row>
      <Col width={[4, 4, media ? 6 : 12]}>
        <img
          src={twitterLogo}
          alt="Twitter"
          className={classnames(
            tweetStyles.twitterLogo,
            media && tweetStyles.twitterLogoMobileOnly,
          )}
        />
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
        <Col width={[4, 4, 6]}>
          <img
            src={twitterLogo}
            alt="Twitter"
            className={classnames(
              tweetStyles.twitterLogo,
              tweetStyles.twitterLogoDesktopOnly,
            )}
          />
          <img src={media.replace(/http(s?):\/\//g, '//')} alt="" />
        </Col>
      )}
    </Row>
  </a>
)

export default Tweet
