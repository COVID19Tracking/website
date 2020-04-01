const { DateTime } = require('luxon')
require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: 'The COVID Tracking Project',
    name: 'ctracker',
    shortname: 'ctracker',
    production:
      typeof process.env.BRANCH !== 'undefined' &&
      (process.env.BRANCH === 'master' || process.env.BRANCH === 'gatsbyjs'),
    buildDate: DateTime.fromObject({ zone: 'America/New_York' }).toFormat(
      "M/dd HH:mm 'ET'",
    ),
    url: 'https://covidtracking.com',
    description:
      'The COVID Tracking Project collects information from 50 US states, the District of Columbia, and 5 other U.S. territories to provide the most comprehensive testing data we can collect for the novel coronavirus, SARS-CoV-2.',
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
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-yaml`,
    'gatsby-plugin-eslint',
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utilities/typography`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-autolink-headers`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `navigation`,
        path: `${__dirname}/src/data/navigation`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `press-logos`,
        path: `${__dirname}/src/data/homepage-press.yml`,
      },
    },
    {
      resolve: 'gatsby-source-apiserver',
      options: {
        typePrefix: 'covid__',
        name: 'state',
        url: `https://covid.cape.io/states`,
      },
    },
    {
      resolve: 'gatsby-source-apiserver',
      options: {
        typePrefix: 'covid__',
        name: 'stateInfo',
        url: `https://covid.cape.io/states/info`,
      },
    },
    {
      resolve: 'gatsby-source-apiserver',
      options: {
        typePrefix: 'covid__',
        name: 'stateDaily',
        url: `https://covid.cape.io/states/daily`,
      },
    },
    {
      resolve: 'gatsby-source-apiserver',
      options: {
        typePrefix: 'covid__',
        name: 'us',
        url: `https://covid.cape.io/us`,
      },
    },
    {
      resolve: 'gatsby-source-apiserver',
      options: {
        typePrefix: 'covid__',
        name: 'usDaily',
        url: `https://covid.cape.io/us/daily`,
      },
    },
    {
      resolve: 'gatsby-source-apiserver',
      options: {
        typePrefix: 'covid__',
        name: 'screenshots',
        url: `https://covid.cape.io/screenshots`,
      },
    },
    {
      resolve: 'gatsby-source-apiserver',
      options: {
        typePrefix: 'covid__',
        name: 'press',
        url: `https://covid.cape.io/press`,
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_BLOG_SPACE,
        accessToken: process.env.CONTENTFUL_BLOG_TOKEN,
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_PAGE_SPACE,
        accessToken: process.env.CONTENTFUL_PAGE_TOKEN,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `The COVID Tracking Project`,
        short_name: `COVID Tracking Project`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `src/images/icon.svg`,
      },
    },
  ],
}
