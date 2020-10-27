import React from 'react'
import classnames from 'classnames'
import { Row, Col } from '~components/common/grid'
import tweetStyles from './tweet.module.scss'
import twitterIcon from '~images/twitter_icon.png'
import twitterLogo from '~images/icons/twitter.svg'

const Tweet = ({ text, media, link, date, hideHandle = false }) => (
  <a href={link} target="_blank" rel="noreferrer" className={tweetStyles.tweet}>
    <Row>
      <Col width={[4, 4, media ? 6 : 12]}>
        {!hideHandle && (
          <>
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
          </>
        )}
        <blockquote>{text.replace(/https:\/\/t.co\/(.*)/, '')}</blockquote>
        <p className={tweetStyles.date}>{date}</p>
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
