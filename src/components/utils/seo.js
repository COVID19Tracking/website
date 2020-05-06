import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import card from '../../images/card.png'

function SEO({ lang, meta, title, description }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `,
  )

  return (
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
          property: `og:title`,
          content: title,
        },
        {
          name: `og:image`,
          content: card,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:card`,
          content: card,
        },
        {
          name: `twitter:image`,
          content: card,
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
          content: description ? description : site.siteMetadata.description,
        },
      ].concat(meta)}
    />
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
