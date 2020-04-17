const { DateTime } = require('luxon')
require('dotenv').config()


function buildDate(argument) {
  dt = DateTime.fromObject({ zone: 'America/New_York' })
  meridiem = (dt.hour > 11) ? 'p' : 'a'
  return `${dt.toFormat('h:mm')} ${meridiem}m ET`
}

module.exports = {
  siteMetadata: {
    title: 'The COVID Tracking Project',
    name: 'ctracker',
    shortname: 'ctracker',
    production:
      typeof process.env.BRANCH !== 'undefined' &&
      process.env.BRANCH === 'master',
    buildDate: buildDate(),
    url: 'https://covidtracking.com',
    description:
      'The COVID Tracking Project collects and publishes the most complete testing data available for US states and territories.',
    repoUrl: 'https://github.com/COVID19Tracking/website',
    twitter: 'COVID19Tracking',
    author: {
      name: 'The COVID19 Tracking Project',
      email: 'info@covidtracking.com',
    },
    feed: {
      filename: 'feed.xml',
      path: '/feed/feed.xml',
      url: 'https://covidtracking.com/feed.xml',
      id: 'https://covidtracking.com',
    },
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-transformer-yaml',
    'gatsby-plugin-eslint',
    `gatsby-plugin-remove-trailing-slashes`,
    'gatsby-plugin-netlify',
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
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: 'src/utilities/typography',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: ['gatsby-remark-autolink-headers'],
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
  ],
}
