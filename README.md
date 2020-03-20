# Getting Started

Clone this sucker, run `npm install`, and you’re in business.

`npm run dev` will compile assets locally, spin up a local instance of the site,
open itself in your browser, and watch for any changes to reload your browser automatically.

## Development

When you push a change to GitHub or open a Pull Request, the CI will get kicked off at https://app.netlify.com/sites/upbeat-lovelace-3e9fff/deploys

## Formatting

The guideline for this repo is to use the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) [except that semicolons are set to never/false](https://covid-tracking.slack.com/archives/CUYAS1M25/p1584315172411600).

[ESLint](https://eslint.org/) is setup for linting and [Prettier](https://prettier.io/) is setup for formatting. Configure them in your editor and run prettier on JS files before committing them.

Since there are a lot of generated and legacy files, there are no commit hooks or other automated enforcement of these policies.
