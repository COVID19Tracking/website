/* eslint-disable react/no-array-index-key */
import React from 'react'
import { Link } from 'gatsby'
import slug from '~utilities/slug'
import { Row, Col } from '~components/common/grid'
import stateLinksStyle from './state-links.module.scss'

export default ({
  twitter,
  covid19Site,
  covid19SiteSecondary,
  covid19SiteTertiary,
  stateName,
}) => {
  return (
    <Row>
      <Col width={[2, 3, 6]}>
        {covid19Site && (
          <a href={covid19Site} className={stateLinksStyle.link}>
            <span>Best Current Data Source</span>
          </a>
        )}
        {covid19SiteSecondary && (
          <a href={covid19SiteSecondary} className={stateLinksStyle.link}>
            <span>Secondary Data Source</span>
          </a>
        )}
        {covid19SiteTertiary && (
          <a href={covid19SiteTertiary} className={stateLinksStyle.link}>
            <span>Tertiary Data Source</span>
          </a>
        )}
      </Col>
      <Col width={[2, 3, 6]}>
        {twitter && (
          <a
            href={`https://twitter.com/${twitter}`}
            className={stateLinksStyle.link}
          >
            <span className="a11y-only">{stateName}&apos;s </span>
            Official Twitter
          </a>
        )}
        <Link
          to={`/data/state/${slug(stateName)}/history`}
          className={stateLinksStyle.link}
        >
          Full history
        </Link>
        <Link
          className={stateLinksStyle.link}
          to={`/data/state/${slug(stateName)}/screenshots`}
        >
          <span>View screenshots</span>
        </Link>
      </Col>
    </Row>
  )
}
