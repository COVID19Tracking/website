import React from 'react'
import classnames from 'classnames'
import marked from 'marked'
import smartypants from 'smartypants'

import { Row, Col } from '~components/common/grid'

import tweetStyles from './tweet.module.scss'
import twitterIcon from '~images/twitter_icon.png'
import twitterLogo from '~images/icons/twitter.svg'

const Tweet = ({
  text,
  media,
  link,
  date,
  stateName,
  stateAbbreviation,
  hideHandle = false,
  extraMargin = false,
}) => {
  const getBoldedText = content => {
    if (!stateAbbreviation && !stateName) {
      return content
    }
    // match the state name or abbreviation, followed by a space or punctuation
    const patternAsString = `(${stateName}|${stateAbbreviation})([-.,/;:() ])`
    const statePattern = new RegExp(patternAsString)
    return content.replace(statePattern, '**$1**$2')
  }

  const highlightedTweet = getBoldedText(text)

  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className={classnames(
        tweetStyles.tweet,
        extraMargin && tweetStyles.extraMargin,
      )}
    >
      <Row>
        <Col width={[4, 4, media ? 6 : 12]}>
          <>
            <img
              src={twitterLogo}
              alt="Twitter"
              className={classnames(
                tweetStyles.twitterLogo,
                media && tweetStyles.twitterLogoMobileOnly,
              )}
            />
            {!hideHandle && (
              <h4>
                <span className="a11y-only">Latest tweet from </span>
                <img src={twitterIcon} alt="" />
                @COVID19Tracking
              </h4>
            )}
          </>

          <blockquote
            dangerouslySetInnerHTML={{
              __html: smartypants(
                marked.inlineLexer(
                  highlightedTweet.replace(/https:\/\/t.co\/(.*)/, ''),
                  [],
                ),
              ),
            }}
          />
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
}

export default Tweet
