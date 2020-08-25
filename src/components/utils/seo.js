import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Location } from '@reach/router'
import { useStaticQuery, graphql } from 'gatsby'

function SEO({ lang, meta, title, socialCard, redirect }) {
  const { site, contentfulSocialCard } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            siteUrl
          }
        }
        contentfulSocialCard(slug: { eq: "default" }) {
          description {
            description
          }
          image {
            resize(width: 1200) {
              src
            }
          }
        }
      }
    `,
  )

  const defaultSocialCard = contentfulSocialCard
  let description
  let imageSrc
  if (!socialCard) {
    description = defaultSocialCard.description.description
    imageSrc = defaultSocialCard.image.resize.src
  } else if (socialCard.description && !socialCard.image) {
    imageSrc = defaultSocialCard.image.resize.src
    description = socialCard.description.description
  } else {
    imageSrc = socialCard.image.resize.src
    description = socialCard.description.description
  }

  const urlSchema = 'https:'

  return (
    <Location>
      {({ location }) => (
        <Helmet
          htmlAttributes={{
            lang,
          }}
          title={title}
          defaultTitle={site.siteMetadata.title}
          titleTemplate={`%s | ${site.siteMetadata.title}`}
          meta={[
            {
              property: `og:site_name`,
              content: site.siteMetadata.title,
            },
            {
              property: `og:type`,
              content: 'website',
            },
            {
              property: `og:title`,
              content: title,
            },
            {
              property: `og:url`,
              content: `${site.siteMetadata.siteUrl}${location.pathname}`,
            },
            {
              property: `og:image`,
              content: `${urlSchema}${imageSrc}`,
            },
            {
              property: `og:description`,
              content: description || site.siteMetadata.description,
            },
            {
              name: `twitter:title`,
              content: title,
            },
            {
              name: `twitter:card`,
              content: 'summary_large_image',
            },
            {
              name: `twitter:image`,
              content: `${urlSchema}${imageSrc}`,
            },
            {
              name: `twitter:site`,
              content: '@COVID19Tracking',
            },

            {
              name: `twitter:creator`,
              content: '@COVID19Tracking',
            },
            {
              name: 'description',
              content: description || site.siteMetadata.description,
            },
          ].concat(meta)}
        >
          {redirect && (
            <meta httpEquiv="refresh" content="0; url=https://example.com/" />
          )}
        </Helmet>
      )}
    </Location>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
}

SEO.propTypes = {
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
