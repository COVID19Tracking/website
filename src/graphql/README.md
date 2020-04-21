# covid-tracking-graphql

Another GraphQL API for the COVID-19 Tracking Data

### To use in the cloud

https://ccheever-covid-tracking-graphql.netlify.com/.netlify/functions/graphql


### To get started developing locally

Make sure you have the latest versions of `node` and `yarn` installed.

[Volta](https://volta.sh/) is a good way to do this if you don't have them already.

Then, type this into your terminal.

```shell
git clone https://github.com/ccheever/covid-tracking-graphql.git
cd covid-tracking-graphql
npm install
npm run dev
o
g
```

### Using the GraphQL API


You can go to `/graphql` from the root of what is served, or [visit it in production](https://ccheever-covid-tracking-graphql.netlify.com/.netlify/functions/graphql) to send GraphQL queries.

An example query you could try is:

```graphql
query {
  usCumulativeTotal {
    deaths
  }
}
```

or a more complicated one could be:

```graphql
query {
  state(state:"PA") {
    name
    cumulativeData {
      total
      positives
      negatives
    }
    notes
    puiReporting
    pumReporting
  }
}
```

### Testing Netlify Functions Behavior

This repository is also configured to run GraphQL queries as a Netlify function. You can test this by running

```sh
npm build
npx netlify-cli dev
```

And then visiting the URL

`http://localhost:<PORT>/.netlify/functions/graphql`

(with `<PORT>` replaced appropriately)

You need to do a rebuild every time you change the code for it to show up, so this is not necessarily recommended for development, but it can be useful for testing.

