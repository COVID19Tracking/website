# COVID Tracking Project

The COVID Tracking Project collects information from 50 U.S. states, the District of Columbia, and 5 other U.S. territories to provide the most comprehensive testing data we can collect for the novel coronavirus, SARS-CoV-2.

This repository is for the project's **website**: https://covidtracking.com/.

## Development

The website is built on [GatsbyJS](https://www.gatsbyjs.org/). If you are not familiar with Gatsby, we suggest checking out their [excellent documentation](hhttps://www.gatsbyjs.org/docs).

### Install

First, you'll need the Gatsby command line interface installed globally:

```shell
npm install -g gatsby-cli
```

Then, install all dependencies by running:

```shell
npm install
```

The website is built from two separate data sources: our own API for COVID data, and Contentful for content. To download the most recent COVID data and setup a `.env` file with a copy of read-only API keys to Contentful, run:

```shell
npm run setup
```

You can also run `npm run setup:api-data` if you just want to download data and not touch the `.env` file.

To run the website locally, use:

```shell
gatsby develop
```

The site is now running at `http://localhost:8000`. Any changes you make to code is live-updated. There is a GraphQL preview tool available at `http://localhost:8000/___graphql` to see what data is exposed to the website.

Note that any changes you make while running Gatsby will automatically checked with [ESLint](https://eslint.org/), so check your console as you save files.

## Storybook

All common components throughout the site are documented in [Storybook](https://storybook.js.org/). You can find all our component stories in `/src/stories`.

To preview the storybook locally, just run:

```shell
npm run storybook
```

The storybook is now available at `http://localhost:6006`.

## How to contribute

No matter how you choose to help, we would love to have you as part of the project. Check our Contributing Guide for information on how to file issues and make pull requests.
