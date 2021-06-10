The COVID Tracking Project was propelled very quickly from a small group of individuals working on a Google sheet to a critical piece of infrastructure for the nation on the COVID crisis. This meant our website had to rapidly adapt to the needs of users. This is a history of the major changes to the website and our API service over the lifetime of the project. Links to specific Pull Requests or Commits are included to help put these big changes into context.

So many people worked on these major changes, and even more whiddled away at tweaks and bug fixes. Many were not direct code contributors, but worked tirelessly on UX, data integrity, and design. We thank every one of you for making the best site we could possibly build and for supporting each other during a difficult time.

## March 7, 2020

The first version of the site was a few static pages built in [Eleventy](https://11ty.dev), a simple static site generator. A version of Netlify CMS was setup to edit some page content using markdown.

The API was hosted on a CloudFlare function server.

Netlify [graciously donated a very large plan to our project](https://www.netlify.com/blog/2020/07/06/how-the-covid-tracking-project-scaled-from-0-to-2m-api-requests-in-3-months/), which is where all our hosting and site building was done. Netlify was critical our our infrastructure from day one.

## March 19, 2020

Individual states were assigned URLs after the main data page got too large.

## April 1, 2020

[Version 2 of the site was launched](https://github.com/COVID19Tracking/website/pull/267). This changed the site to:

- Use Contentful as a content management system
- A blog section
- New visual design
- New logo and brand guide
- A style guide
- Moved to GatsbyJs as the site build tool
- Made the API a static site built along with the website

## April 3, 2020

[Added outcome data, including hospitalization](https://github.com/COVID19Tracking/website/pull/399/files).

## April 6, 2020

[Moved the core API service](https://github.com/COVID19Tracking/website/pull/389) from the Cloudflare worker to being built on Netlify and hosted as static files. The API builder used Google Sheets API to pull data from our data entry sheets and built a lot of CSV and JSON files. We did this because the Cloudflare worker was overwhelmed with requests, and it simplified our build pipelines for the API. It also meant that changes to the website and API could be staged and deployed at the same time.

## April 15, 2020

Launched the [Covid Racial Data Tracker](https://github.com/COVID19Tracking/website/pull/572).

Posted our [first blog post, about the CRDT project](https://covidtracking.com/analysis-updates/tracking-race-and-ethnicity).

## April 16, 2020

[Started creating contact forms](https://github.com/COVID19Tracking/website/pull/570) for people to get in touch without needing email. These were

## April 17, 2020

Allowed volunteers [to be added automatically](https://github.com/COVID19Tracking/website/pull/516) to our `/about` page by filling out a few custom profile fields in Slack.

## April 28, 2020

Launched a huge [visualization guide](https://web.archive.org/web/20200428162916if_/https://covidtracking.com/about-data/visualization-guide) put together by the visualization team.

## April 29, 2020

[Added search](https://github.com/COVID19Tracking/website/pull/700) using a plan donated by [Algolia](https://www.algolia.com/).

## April 30, 2020

[Created a sandbox for our API](https://github.com/COVID19Tracking/website/pull/517)..

## May 6, 2020

Launched a [homepage redesign](https://github.com/COVID19Tracking/website/pull/799) that added a better blog listing, a large call-to-action for the CRDT project, and better illustrations of where our data comes from.

## May 20, 2020

Changed the website to [source data from a repo of API data files](https://github.com/COVID19Tracking/website/pull/878) built externally, instead of the website build also building API files. Both the website build and the API build were taking too much time, and the number of builds was increasingly divergent for both projects.

## May 21, 2020

Launched a [redesigned homepage for the CRDT project](https://github.com/COVID19Tracking/website/pull/904).

## June 1, 2020

Added [document repositories](https://github.com/COVID19Tracking/website/pull/947) so publications like PDFs could be managed within Contentful.

## June 5, 2020

Created standardized privacy, accessibility, and terms and conditions language.

## June 19, 2020

Created a [separate preview environment](https://github.com/COVID19Tracking/website/pull/1064) so editors could stage and preview changes in Contentful.

## June 22, 2020

Introduced a Grid system, refactored all our Sass files to be in clear modules, and added a Danger.js file that enforced consistent use of common units for things like padding, margin, etc.

Added [support for RSS](https://github.com/COVID19Tracking/website/pull/1069).

## July 1, 2020

[Redesign our blog pages](https://github.com/COVID19Tracking/website/pull/1119), and moved to Contentful Rich Text instead of simple markdown so we can add custom blocks for things like tables.

## July 2, 2020

Built in [chart annotations](https://github.com/COVID19Tracking/website/pull/1172) that let us flag important dates in our state and US charts. These were managed in Contentful.

Launched a [chart gallery](https://github.com/COVID19Tracking/website/pull/1135), managed in Contentful. This was a selection of charts in Tableau just presented in a nicer format.

## August 5, 2020

Created a way for [users to ask for better racial data from their representatives](https://github.com/COVID19Tracking/website/pull/1312) using a Netlify form.

[Moved](https://github.com/COVID19Tracking/website/pull/1315) our API to `api.covidtracking.com` instead of `covidtracking.com/api`

## August 25, 2020

[Redesigned main data page](https://github.com/COVID19Tracking/website/pull/1317) and state data pages to use cards instead of table-based layouts for data. [More information about this change](https://covidtracking.com/analysis-updates/site-redesign)

## September 18, 2020

[Switched which field to use](https://github.com/COVID19Tracking/website/pull/1448) when displaying the total test results to depend on the API field `totalTestResultsField`

## October 25, 2020

Created an automatically-generated social card for every state in the CRDT project. This worked by using Puppetteer to take screentshots of React components on every build.

## October 23, 2020

[Embedded tweets by COVID19tracking](https://github.com/COVID19Tracking/website/pull/1542) on the website, including the latest pinned one on the main `/data` page, and any tweets about a specific state on it's individual state page.

## November 2, 2020

Added [individual long-term care pages](https://github.com/COVID19Tracking/website/pull/1355) for every state.

## November 24, 2020

Created our first [holiday warning about Thanksgiving](https://github.com/COVID19Tracking/website/pull/1636). Since some states lagged on reporting on major holidays, we wanted it to be very clear that the numbers around Thanksgiving could be wrong.

## December 1, 2020

Redesigned our main charts gallery to add [trendlines and a cube map of the US](https://github.com/COVID19Tracking/website/pull/1635).

## December 8, 2020

Added a [card of HHS hospitalization data](https://github.com/COVID19Tracking/website/pull/1657) to every state.

## December 12, 2020

Since our screenshot list had gotten so big, the website stopped building completely on Netlify (timed out over 30 minutes). We quickly [spun up a separate Gatsby site](https://github.com/COVID19Tracking/website/pull/1667) called `screenshots.covidtracking.com` and hosted it on Github Pages, build by Github Actions.

## December 21, 2020

Launched a [new homepage design](https://github.com/COVID19Tracking/website/pull/1696) that included hexmaps, a chart carousel, better blog listings.

We renamed the blog to "Analysis & updates"

## January 6, 2021

Launched a large map of [individual HHS facilities](https://github.com/COVID19Tracking/website/pull/1661) using MapBox.

## January 7, 2021

[De-emphasized grades](https://github.com/COVID19Tracking/website/pull/1723) in preparation for a new assessment process.

## January 12, 2021

Added [antigen testing data](https://github.com/COVID19Tracking/website/pull/1733) as a card to each state.

## January 16, 2021

Since the state notes were getting terribly long, we [moved them to their own page](https://github.com/COVID19Tracking/website/pull/1753), and linked off to them from the state landing page.

## January 27, 2021

Added [federal LTC vaccination data](https://github.com/COVID19Tracking/website/pull/1765) as a card to the states.

## January 30, 2021

A popular website, https://rt.live, which tracked Rt numbers using our data, went offline. It pointed people to our website without context, and as a result many poeple thought we were responsible for the site going offline, or upset that we did not provide Rt numbers. We had to [add a warning](https://github.com/COVID19Tracking/website/pull/1780) to users from the site that we had nothing to do with this, and where to get resources. The owners of rt.live quickly changed the wording on the site, which eventually improved things.

## February 11, 2021

Created a separate [landing page](https://github.com/COVID19Tracking/website/pull/1790) with information on individual state assessments, which replaced letter grades.

## February 17, 2021

Launched a very large MapBox map of individual [long-term care facilities](https://github.com/COVID19Tracking/website/pull/1703).

## March 10, 2021

Added a [static warning to every page](https://github.com/COVID19Tracking/website/pull/1843) about the data collection efforts ending.

## March 8, 2021

Launched a [new homepage](https://github.com/COVID19Tracking/website/pull/1837) with images of our volunteers, a thank-you message, and links to some of our impact.

## April 1, 2021

Created a [single landing page](https://github.com/COVID19Tracking/website/pull/1835) for CRDT per state.

## April 20, 2021

Relaunched the [Long-term care section](https://github.com/COVID19Tracking/website/pull/1856) to have its own navigation and sub-pages.
