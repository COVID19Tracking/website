---
title: Software and Credits
nav: Software & Credits
summary: ''
---
The COVID Tracking Project is made with: 

* [Covid Tracking](https://github.com/COVID19Tracking/covid-tracking), developed by [Zach Lipton](https://github.com/zachlipton), [Josh Ellington](https://github.com/joshellington), and [Ken Riley](https://github.com/nodots).

  * This project uses [URL Watch](https://github.com/thp/urlwatch) to notify us when a state publishes new numbers.
* [Covid Tracking API](https://github.com/COVID19Tracking/covid-tracking-api), developed by [Kai Curry](https://github.com/webmasterkai).

  * This project uses [Cloudflare Workers](https://developers.cloudflare.com/workers) to expose our data as JSON over HTTP. If you'd like to include our data in your visualization, take a look at this project!
* [Covid 19 Crawler](https://github.com/COVID19Tracking/covid-19-crawler), developed by [Danny Yang](https://github.com/huuep).

  * This project uses Ruby to crawl state websites and update data regularly at [Coronavirus (COVID-19) Testing Data](http://coronavirusapi.com). We compare our manually curated data to this data to be sure our numbers look right.

Our website is [hosted by Netlify](https://www.netlify.com/), built and maintained by [Mat Marquis](https://hire.wil.to/), [Lucas Gonze](http://some.gonze.com/about-me/), and [Ethan Marcotte](https://ethanmarcotte.com/) with boosts from [Kai Curry](https://github.com/webmasterkai). We use the [Netlify CMS](https://www.netlifycms.org/).

## Satellite Projects

* [R package that wraps the COVID Tracking Project API](https://github.com/aedobbyn/covid) from [Amanda Dobbyn](https://github.com/aedobbyn)