require(`@babel/register`)({
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: ['@babel/plugin-transform-runtime'],
})
require('dotenv').config()

const algoliaQueries = require('./src/utilities/algolia').queries
const sassImports = require('./src/utilities/sass-imports.js')
const formatStringList = require('./src/components/utils/format')
  .formatStringList

const gatsbyConfig = {
  siteMetadata: {
    title: 'The COVID Tracking Project',
    siteUrl: 'https://covidtracking.com/',
    recaptchaKey: '6LcZIPQUAAAAAB-y_TpTUDQ0HvCk0c7a8kXgZVGD',
    description:
      'The COVID Tracking Project collects and publishes the most complete testing data available for US states and territories.',
    production:
      typeof process.env.BRANCH !== 'undefined' &&
      process.env.BRANCH === 'master',
    contentfulSpace: process.env.CONTENTFUL_SPACE,
    hiddenApiTags: ['Racial data tracker', 'Internal Endpoints'],
    stateChartDateRange: 90,
    stateChartPerCapMeasure: 1000000,
  },
  plugins: [
    'gatsby-plugin-sitemap',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-yaml',
    'gatsby-transformer-json',
    'gatsby-plugin-eslint',
    'gatsby-plugin-remove-trailing-slashes',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    `gatsby-plugin-svgr`,
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        data: sassImports,
      },
    },
    {
      resolve: 'gatsby-plugin-polyfill-io',
      options: {
        features: ['core-js', 'Intl'],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'homepageImages',
        path: `${__dirname}/src/images/homepage`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'raceProjectImages',
        path: `${__dirname}/src/images/race-project`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'visualizationGuideImages',
        path: `${__dirname}/src/images/visualization-guide`,
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_api/v1/internal/press.json',
        type: 'CovidPress',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_api/v1/us/current.json',
        type: 'CovidUs',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_api/v1/us/daily.json',
        type: 'CovidUsDaily',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_api/v1/states/current.json',
        type: 'CovidState',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_api/v1/states/info.json',
        type: 'CovidStateInfo',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_api/v1/states/daily.json',
        type: 'CovidStateDaily',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_api/v1/states/screenshots.json',
        type: 'CovidScreenshot',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_api/v1/internal/volunteers.json',
        type: 'CovidVolunteers',
        sortField: 'name',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_api/v1/internal/race-homepage.json',
        type: 'CovidRaceDataHomepage',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_api/v1/race/states-combined.json',
        type: 'CovidRaceDataCombined',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_api/v1/race/states-separate.json',
        type: 'CovidRaceDataSeparate',
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
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'api-status',
        path: `${__dirname}/_api/v1/status.json`,
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-counties',
      options: {
        type: 'Counties',
        nytimesUrl:
          'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv',
        demographics: `${__dirname}/src/data/race/counties/demographics.json`,
      },
    },
    {
      resolve: 'gatsby-render-components',
      options: {
        path: `${__dirname}/public/img`
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
      resolve: 'gatsby-transformer-covid-census',
      options: {
        stateType: 'CovidStateDaily',
        usType: 'CovidUsDaily',
        stateInfoType: 'CovidStateInfo',
        fields: [
          'hospitalizedCumulative',
          'hospitalizedCurrently',
          'hospitalizedIncrease',
          'death',
          'deathIncrease',
          'inIcuCumulative',
          'inIcuCurrently',
          'negativeIncrease',
          'negativeRegularScore',
          'onVentilatorCumulative',
          'onVentilatorCurrently',
          'positiveCasesViral',
          'positiveIncrease',
          'positiveTestsViral',
          'totalTestResults',
          'totalTestResultsIncrease',
          'totalTestsViral',
          'negativeTestsViral',
          'positive',
          'negative',
        ],
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
          '~plugins': 'plugins',
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
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#924F34',
        showSpinner: false,
      },
    },
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        mergeSecurityHeaders: false,
        headers: {
          '/*': [
            'X-Frame-Options: DENY',
            'X-XSS-Protection: 1; mode=block',
            'X-Content-Type-Options: nosniff',
            'Referrer-Policy: strict-origin-when-cross-origin',
          ],
        },
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allContentfulBlogPost } }) => {
              return allContentfulBlogPost.nodes.map(node => {
                return Object.assign(
                  {},
                  {
                    title: node.title,
                    description: node.lede.lede,
                    date: node.publishDate,
                    url: `${site.siteMetadata.siteUrl}/blog/${node.slug}`,
                    guid: `${site.siteMetadata.siteUrl}/blog/${node.slug}`,
                    author: formatStringList(
                      node.authors.map(author => author.name),
                    ),
                  },
                )
              })
            },
            query: `
              {
                allContentfulBlogPost(sort: { fields: publishDate, order: DESC }) {
                  nodes {
                    title
                    slug
                    authors {
                      name
                    }
                    publishDate(formatString: "MMMM D, YYYY")
                    lede {
                      lede
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'The COVID Tracking Project - RSS Feed',
            match: '^/blog/',
            image_url: 'https://covidtracking.com/images/project-logo.png',
          },
        ],
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
