import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Byline } from '~components/pages/blog/byline'
import blogLedeStyles from './blog-lede.module.scss'
import CleanSpacing from '~components/utils/clean-spacing'
import SocialSharing from '~components/common/social-sharing'

const BlogLede = ({
  headline,
  authors,
  published,
  updated,
  lede,
  twitterText,
  id,
  darkBackground,
  hideByline,
  hideSocial = false,
}) => {
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
      {!hideByline && (
        <div className={blogLedeStyles.bylineRow}>
          <Byline
            authors={authors}
            published={published}
            updated={updated}
            darkBackground={darkBackground}
          />
          {!hideSocial && (
            <SocialSharing
              shares={['facebook', 'twitter', 'link']}
              url={`${site.siteMetadata.siteUrl}/${id}`}
              text={lede}
              twitterText={twitterText}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default BlogLede
