# Getting Started

Clone this sucker, run `npm install`, and you’re in business.

Before you start developing, you may need to run `npm run prod` one time and then `Ctrl+C` to kill it once the output stops. This will generate some static assets that the project needs. You probably only need to do this once when you first clone the repo.

`npm run dev` will spin up a local instance of the site. That usually runs at [https://localhost:8080](https://localhost:8080), unless you already have asomething running on that port—it’ll give you a URL in your terminal.

When you push a change, the CI will get kicked off at https://app.netlify.com/sites/upbeat-lovelace-3e9fff/deploys
