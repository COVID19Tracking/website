import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Location } from '@reach/router'
import { useStaticQuery, graphql } from 'gatsby'

const getImageSrc = (socialCard, defaultSocialCard) => {
  if (typeof socialCard === 'string') {
    // if socialCard param is the url to the social card image
    return socialCard
  }
  if (!socialCard) {
    return defaultSocialCard.image.resize.src
  }
  if (socialCard.description && !socialCard.image) {
    return defaultSocialCard.image.resize.src
  }
  return socialCard.image.resize.src
}

function SEO({ lang, meta, title, socialCard }) {
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

  const imageSrc = getImageSrc(socialCard, defaultSocialCard)
  let description

  if (!socialCard || typeof socialCard === 'string') {
    description = defaultSocialCard.description.description
  } else if (socialCard.description && !socialCard.image) {
    description = socialCard.description.description
  } else {
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
        />
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
