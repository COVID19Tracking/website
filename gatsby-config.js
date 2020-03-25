const { DateTime } = require('luxon')

module.exports = {
  siteMetadata: {
    title: 'The COVID Tracking Project',
    name: 'ctracker',
    shortname: 'ctracker',
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
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-mdx',
    'gatsby-transformer-yaml',
    'gatsby-plugin-eslint',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: ['gatsby-remark-autolink-headers'],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content/pages/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'snippets',
        path: `${__dirname}/src/content/snippets/`,
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
      resolve: 'gatsby-source-apiserver',
      options: {
        typePrefix: 'covid__',
        name: 'state',
        url: 'https://covidtracking.com/api/states',
      },
    },
    {
      resolve: 'gatsby-source-apiserver',
      options: {
        typePrefix: 'covid__',
        name: 'stateInfo',
        url: 'https://covidtracking.com/api/states/info',
      },
    },
    {
      resolve: 'gatsby-source-apiserver',
      options: {
        typePrefix: 'covid__',
        name: 'stateDaily',
        url: 'https://covidtracking.com/api/states/daily',
      },
    },
    {
      resolve: 'gatsby-source-apiserver',
      options: {
        typePrefix: 'covid__',
        name: 'us',
        url: 'https://covidtracking.com/api/us',
      },
    },
    {
      resolve: 'gatsby-source-apiserver',
      options: {
        typePrefix: 'covid__',
        name: 'usDaily',
        url: 'https://covidtracking.com/api/us/daily',
      },
    },
    {
      resolve: 'gatsby-source-apiserver',
      options: {
        typePrefix: 'covid__',
        name: 'screenshots',
        url: 'https://covidtracking.com/api/screenshots',
      },
    },
    {
      resolve: 'gatsby-source-apiserver',
      options: {
        typePrefix: 'covid__',
        name: 'press',
        url: 'https://covidtracking.com/api/press',
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
        icon: 'src/images/icons/icon-512.png', // This path is relative to the root of the site.
      },
    },
  ],
}
