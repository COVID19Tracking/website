---
title: The software
navigation: about
---

## What We're Made Of

Our website is [generously hosted by Netlify](https://www.netlify.com/) and we use the [Netlify CMS](https://www.netlifycms.org/) and the [Eleventy static site generator](https://www.11ty.dev/).

The COVID Tracking Project is based on a group developer effort, with code hosted on GitHub including but not limited to these repositories:

- [COVID Tracking](https://github.com/COVID19Tracking/covid-tracking)

  - Developed by Zach Lipton, Josh Ellington, and Ken Riley.
  - Detects changes to health department pages using (our fork of) URL Watch and reports them to a Slack channel to notify us for further analysis.

- [URL Watch](https://github.com/thp/urlwatch)

  - Developed by Zach Lipton and Josh Ellington.
  - Fork of original urlwatch repo, which includes headless browser mode and custom reporting functions specific to our project.

- [COVID Tracking API](https://github.com/COVID19Tracking/covid-tracking-api)

  - Developed by Kai Curry.
  - Cloudflare Worker that exposes our data as JSON or CSV over HTTP.

- [The COVID Tracking Project website](https://github.com/COVID19Tracking/website)

  - Developed by Mat Marquis, Lucas Gonze, and Ethan Marcotte with boosts from Kai Curry.
  - Our public website

- [COVID Tracking data pipeline](https://github.com/COVID19Tracking/covid-data-pipeline)

  - Developed by Joshua Ellinger and in small part by Julia Kodysh.
  - HTML scanner/extraction pipeline that processes state data sites and saves the data to [the repo](https://github.com/COVID19Tracking/covid-data-archive). Additionally, backs up screenshot images of state data sites to Amazon S3 for later reference.

- [URLWatch proxies](https://github.com/COVID19Tracking/urlwatch-proxies)

  - Developed by Joshua Ellinger.
  - A flask website that provides several services in support of the HTML scanner/extraction pipeline for state data: caching, another view on parts of the public Google spreadsheet, ability to view historical HTML data.

- [COVID Tracking data](https://github.com/COVID19Tracking/covid-tracking-data)

  - Developed by Julia Kodysh.
  - GitHub backup for versioning the contents of our public Google spreadsheet data in CSV format.

- [COVID 19 crawler](https://github.com/COVID19Tracking/covid-19-crawler)

  - Developed by Danny Yang.
  - Uses Ruby to crawl state websites and publish data to <http://coronavirusapi.com/>

- [COVID Tracking dash app](https://github.com/COVID19Tracking/covid-tracking-dash)

  - Owner: Eric Czech

## Satellite Projects

- [R package that wraps the COVID Tracking Project API](https://github.com/aedobbyn/covid19us) from [Amanda Dobbyn](https://github.com/aedobbyn)
