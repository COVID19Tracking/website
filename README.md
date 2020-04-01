# COVID Tracking Project

The COVID Tracking Project collects information from 50 US states, the District of Columbia, and 5 other US territories to provide the most comprehensive testing data we can collect for the novel coronavirus, SARS-CoV-2

This repository is for the **website** of the project, available at http://covidtracking.com/

## Development

The website is built on [GatsbyJS](https://www.gatsbyjs.org/). If you are not familiar with Gatsby, we suggest checking out their [excellent documentation](hhttps://www.gatsbyjs.org/docs).

### Environment Variables

Our contnet is managed in Contentful, and you will need the following environment variables set in your local environment. Contact a member of our team for these values:

```
CONTENTFUL_BLOG_SPACE
CONTENTFUL_BLOG_TOKEN
CONTENTFUL_PAGE_SPACE
CONTENTFUL_PAGE_TOKEN
```

You can put these values in your bash profile, or you can create a .env file in the project root.

### Install

Make sure you have Gatsby installed globally:

```shell
npm install -g gatsby-cli
```

You can get the website setup in your local dev environment by running:

```shell
npm install
```

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
