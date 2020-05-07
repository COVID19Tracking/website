require(`@babel/register`)({
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: ['@babel/plugin-transform-runtime'],
})
require('dotenv').config()
const { DateTime } = require('luxon')
const algoliaQueries = require('./src/utilities/algolia').queries

const gatsbyConfig = {
  siteMetadata: {
    title: 'The COVID Tracking Project',
    siteUrl: 'https://covidtracking.com/',
    recaptchaKey: '6LebEeoUAAAAAImOtU0AW9InRfmM6quBvbNJuuxX',
    description:
      'The COVID Tracking Project collects and publishes the most complete testing data available for US states and territories.',
    production:
      typeof process.env.BRANCH !== 'undefined' &&
      process.env.BRANCH === 'master',
    buildDate: DateTime.fromObject({ zone: 'America/New_York' })
      .toFormat('h:mm a')
      .toLowerCase(),
    inDST: DateTime.fromObject({ zone: 'America/New_York' }).isInDST,
  },
  plugins: [
    'gatsby-plugin-sitemap',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-transformer-yaml',
    'gatsby-plugin-eslint',
    'gatsby-plugin-remove-trailing-slashes',
    'gatsby-plugin-netlify',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'homepageImages',
        path: `${__dirname}/src/images/homepage`,
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_data/v1/press.json',
        type: 'CovidPress',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_data/v1/us/current.json',
        type: 'CovidUs',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_data/v1/us/daily.json',
        type: 'CovidUsDaily',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_data/v1/states/current.json',
        type: 'CovidState',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_data/v1/states/info.json',
        type: 'CovidStateInfo',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_data/v1/states/daily.json',
        type: 'CovidStateDaily',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_data/v1/states/screenshots.json',
        type: 'CovidScreenshot',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_data/v1/cdc/daily.json',
        type: 'CDCDaily',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_data/v1/volunteers.json',
        type: 'CovidVolunteers',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-autolink-headers',
          'gatsby-remark-smartypants',
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'navigation',
        path: `${__dirname}/src/data/navigation`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'press-logos',
        path: `${__dirname}/src/data/homepage-press.yml`,
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE,
        accessToken: process.env.CONTENTFUL_TOKEN,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'The COVID Tracking Project',
        short_name: 'COVID Tracking Project',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        display: 'minimal-ui',
        icon: 'src/images/icon.svg',
      },
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          '~components': 'src/components',
          '~context': 'src/context',
          '~data': 'src/data',
          '~images': 'src/images',
          '~pages': 'src/pages',
          '~scss': 'src/scss',
          '~templates': 'src/templates',
          '~utilities': 'src/utilities',
        },
        extensions: ['js', 'scss', 'svg', 'png'],
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#924F34`,
        showSpinner: false,
      },
    },
  ],
}

// Conditionally add Algolia plugin.
if (
  typeof process.env.GATSBY_ALGOLIA_INDEX_PREFIX !== 'undefined' &&
  typeof process.env.ALGOLIA_ADMIN_KEY !== 'undefined' &&
  (process.env.BRANCH === 'master' || process.env.CIRCLECI)
) {
  gatsbyConfig.plugins.push({
    resolve: 'gatsby-plugin-algolia',
    options: {
      appId: process.env.GATSBY_ALGOLIA_APP_ID,
      apiKey: process.env.ALGOLIA_ADMIN_KEY,
      queries: algoliaQueries,
      chunkSize: 5000,
    },
  })
}

module.exports = gatsbyConfig
