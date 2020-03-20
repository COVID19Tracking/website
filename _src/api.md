---
title: Initial Basic API & CSV Downloads
nav: API
summary: Information about accessing the data via JSON or CSV.
---

The default response is JSON using normal GET requests. If you'd like CSV just append `.csv` at the end of the url. For example https://covidtracking.com/api/states.csv

All data is cumulative, so you should not see any counts going down over time. If you do, please get in touch as it is likely an error. As you might be able to tell from the key names, date time values are in ET.

Please be aware that each state has its own set of caveats, which we have documented on our [data page](/data/).

The API format could and probably will change slightly in the future.

* States current - [/api/states](/api/states) | [CSV](/api/states.csv)
* States daily 4 pm ET - [/api/states/daily](/api/states/daily) | [CSV](http://covidtracking.com/api/states/daily.csv)
* States info - [/api/states/info](/api/states/info) | [CSV](/api/states/info.csv)
* US current - [/api/us](http://covidtracking.com/api/us) | [CSV](/api/us.csv)
* US daily - [/api/us/daily](/api/us/daily) | [CSV](/api/us/daily.csv)
* Counties- [/api/counties](/api/counties) | [CSV](/api/counties.csv)
* Tracker URLs - [/api/urls](/api/urls)
* State Website Screenshots - [/api/screenshots](/api/screenshots)
* In the press - [/api/press](/api/press)

If you want to filter the `/api/states/daily` you can add a query param like `?state=NY` to only show cases in New York. Or `/api/states/daily?state=NY&date=20200316` to show the result of a specific date. Or to access the most recent value `/api/states?state=NY`.

## GraphQL API

* Playground - [/api/playground](https://covidtracking.com/api/playground)
* GraphQL API - [/api/graphql](https://covidtracking.com/api/graphql)
