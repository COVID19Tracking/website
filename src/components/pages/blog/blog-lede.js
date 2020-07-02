import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Byline } from './byline'
import blogLedeStyles from './blog-lede.module.scss'
import CleanSpacing from '~components/utils/clean-spacing'
import SocialSharing from '~components/common/social-sharing'

export default ({ headline, authors, date, lede, slug, darkBackground }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
          }
        }
      }
    `,
  )
  return (
    <div className={blogLedeStyles.lede}>
      <h1>{headline}</h1>
      <p className={blogLedeStyles.ledeContent}>
        <CleanSpacing>{lede}</CleanSpacing>
      </p>
      <div className={blogLedeStyles.bylineRow}>
        <Byline authors={authors} date={date} darkBackground={darkBackground} />
        <SocialSharing
          shares={['facebook', 'twitter', 'link']}
          url={`${site.siteMetadata.siteUrl}/blog/${slug}`}
          text={lede}
        />
      </div>
    </div>
  )
}
