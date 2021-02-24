require(`@babel/register`)({
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: ['@babel/plugin-transform-runtime'],
})
require('dotenv').config()
const setTZ = require('set-tz')
const { DateTime } = require('luxon')
const fs = require('fs')
const algoliaQueries = require('./src/utilities/algolia').queries
const sassImports = require('./src/utilities/sass-imports.js')
const formatStringList = require('./src/components/utils/format')
  .formatStringList

setTZ('America/New_York')

const usDates = JSON.parse(fs.readFileSync('./_api/v1/us/daily.json'))
const latestDate = usDates.sort((a, b) => (a.date > b.date ? -1 : 1)).shift()
  .date

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
    buildTime: DateTime.local()
      .setZone('America/New_York')
      .toISO(),
    buildId: process.env.BUILD_ID || false,
    buildHook: process.env.INCOMING_HOOK_TITLE || false,
    contentfulSpace: process.env.CONTENTFUL_SPACE,
    hiddenApiTags: ['Racial data tracker', 'Internal Endpoints'],
    stateChartDateRange: 90,
    stateChartPerCapMeasure: 1000000,
  },
  plugins: [
    'gatsby-plugin-sitemap',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-yaml',
    'gatsby-plugin-eslint',
    'gatsby-plugin-remove-trailing-slashes',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-svgr',
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://covidtracking.com',
      },
    },
    {
      resolve: 'gatsby-plugin-webfonts',
      options: {
        fonts: {
          google: [
            {
              family: 'Open Sans',
              variants: ['300', '400', '700'],
              subsets: ['latin-ext'],
              fontDisplay: 'swap',
            },
          ],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics-gdpr',
      options: {
        trackingId: 'UA-182192518-1',
        enableDevelopment: false,
        anonymizeIP: true,
      },
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        data: sassImports,
        cssLoaderOptions:
          process.env.NODE_ENV === 'production'
            ? {
                localIdentName: '[sha1:hash:hex:5]',
              }
            : {},
      },
    },
    {
      resolve: 'gatsby-plugin-polyfill-io',
      options: {
        features: [
          'default',
          'String.prototype.repeat',
          'Array.prototype.find',
          'Array.prototype.findIndex',
          'Math.trunc',
          'Math.sign',
          'core-js',
          'Intl',
        ],
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
        name: 'pressImages',
        path: `${__dirname}/src/images/press-logos`,
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
        increaseFields: [
          'totalTestEncountersViral',
          'totalTestsViral',
          'totalTestsPeopleViral',
        ],
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_data/volunteers.json',
        type: 'CovidVolunteers',
        sortField: 'name',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_data/crdt_homepage.json',
        type: 'CovidRaceDataHomepage',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_data/crdt_states_combined.json',
        type: 'CovidRaceDataCombined',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_data/crdt_test_hosp_race_combined.json',
        type: 'CovidRaceHospTestDataCombined',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_data/crdt_test_hosp_race_separate.json',
        type: 'CovidRaceHospTestDataSeparate',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_data/crdt_states_separate.json',
        type: 'CovidRaceDataSeparate',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_data/crdt_timeseries.json',
        type: 'CovidRaceDataTimeseries',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_data/crdt_acs.json',
        type: 'CovidAcsPopulation',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_data/crdt_sources.json',
        type: 'CovidRaceDataSources',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_data/long_term_care_website.json',
        type: 'CovidLtcWebsite',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_data/long_term_care_states_complete.json',
        type: 'CovidLtcStates',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_data/long_term_care_notes.json',
        type: 'CovidLtcNotes',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_data/long_term_care_facilities.json',
        type: 'CovidLtcFacilities',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_data/advocacy_governors.json',
        type: 'civilServiceGovernor',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_data/advocacy_territories.json',
        type: 'territoryInfo',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_data/annotations.json',
        type: 'covidAnnotation',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_data/grades_excluded_states.json',
        type: 'covidGradeExcludedStates',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_data/grades_data_reporting_problems.json',
        type: 'covidGradeDataReportingProblems',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_data/grades_state_assessment.json',
        type: 'covidGradeStateAssessment',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_data/ltc_fed_vaccinations.json',
        type: 'ltcFedVaccinations',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_data/hhs_testing.json',
        type: 'hhsTesting',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_data/hhs_testing_notes.json',
        type: 'hhsTestingNotes',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_data/hhs_testing_config.json',
        type: 'hhsTestingConfig',
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-api',
      options: {
        file: './_data/hhs_hospitalization.json',
        type: 'hhsHospitals',
        transformItems: items => {
          const result = {}
          items.forEach(item => {
            if (
              typeof result[item.state] === 'undefined' ||
              parseInt(item.date.replace(/\D/g, ''), 10) >
                parseInt(result[item.state].date.replace(/\D/g, ''), 10)
            ) {
              result[item.state] = item
            }
          })
          return Object.values(result)
        },
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
      resolve: 'gatsby-source-covid-tracking-counties',
      options: {
        type: 'Counties',
        counties: `${__dirname}/_data/nyt_counties.json`,
        demographics: `${__dirname}/_data/census_demographics_counties.json`,
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-tweets',
      options: {
        type: 'Tweets',
        files: {
          tweets: `${__dirname}/_data/tweets.json`,
          pinnedTweets: `${__dirname}/_data/pinned_tweets.json`,
        },
      },
    },
    {
      resolve: 'gatsby-source-covid-tracking-counties',
      options: {
        type: 'Counties',
        counties: `${__dirname}/_data/nyt_counties.json`,
        demographics: `${__dirname}/_data/census_demographics_counties.json`,
      },
    },
    {
      resolve: 'gatsby-render-components',
      options: {
        path: `${__dirname}/public/images`,
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE,
        accessToken: process.env.CONTENTFUL_TOKEN,
        host: process.env.CONTENTFUL_PREVIEW
          ? 'preview.contentful.com'
          : 'cdn.contentful.com',
      },
    },

    {
      resolve: 'gatsby-transformer-covid-census',
      options: {
        stateType: 'CovidStateDaily',
        usType: 'CovidUsDaily',
        stateInfoType: 'CovidStateInfo',
        sources: {
          us: `${__dirname}/_data/census_population_us.json`,
          states: `${__dirname}/_data/census_population_state.json`,
        },
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
          'totalTestEncountersViralIncrease',
          'totalTestsViralIncrease',
          'totalTestsPeopleViralIncrease',
        ],
      },
    },
    {
      resolve: 'gatsby-transformer-covid-ltc-totals',
      options: {
        type: 'CovidStateInfo',
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
      resolve: 'gatsby-plugin-global-context',
      options: {
        context: {
          latestDate: DateTime.fromISO(latestDate).toISODate(),
          sevenDaysAgo: DateTime.fromISO(latestDate)
            .minus({ days: 7 })
            .toISODate(),
          fourteenDaysAgo: DateTime.fromISO(latestDate)
            .minus({ days: 14 })
            .toISODate(),
          twentyEightDaysAgo: DateTime.fromISO(latestDate)
            .minus({ days: 28 })
            .toISODate(),
          ninetyDaysAgo: DateTime.fromISO(latestDate)
            .minus({ days: 90 })
            .toISODate(),
        },
      },
    },
    {
      resolve: 'gatsby-plugin-alias-imports',
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
      resolve: 'gatsby-transformer-covid-slug',
      options: {
        type: 'CovidStateInfo',
        field: 'name',
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
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
