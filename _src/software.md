---
title: Software used
nav: Software
summary: 'Overview of software used in this project.'
---
COVID19 Tracker is comprised of the following software: 

* [Covid Tracking](https://github.com/COVID19Tracking/covid-tracking), developed by [Zach Lipton](https://github.com/zachlipton), [Josh Ellington](https://github.com/joshellington), and [Ken Riley](https://github.com/nodots).
    * This project uses [URL Watch](https://github.com/thp/urlwatch) to notify us when a state publishes new numbers.
* [Covid Tracking API](https://github.com/COVID19Tracking/covid-tracking-api), developed by [Kai Curry](https://github.com/webmasterkai).
    * This project uses [Cloudflare Workers](https://developers.cloudflare.com/workers) to expose our data as JSON over HTTP. If you'd like to include our data in your visualization, take a look at this project!
* [Covid 19 Crawler](https://github.com/COVID19Tracking/covid-19-crawler), developed by [Danny Yang](https://github.com/huuep).
    * This project uses Ruby to crawl state websites and update data regularly at [Coronavirus (COVID-19) Testing Data](http://coronavirusapi.com). We compare our manually curated data to this data to be sure our numbers look right.
