---
title: Initial Basic API & CSV Downloads
nav: API
summary: Information about accessing the data via JSON or CSV.
---

The default response is JSON using normal GET requests. If you'd like CSV just append `.csv` at the end of the url. For example https://covidtracking.com/api/states.csv

The API format could and probably will change slightly in the future.

* States current - [/api/states](http://covidtracking.com/api/states) | [CSV](http://covidtracking.com/api/states.csv)
* States daily 4 pm ET - [/api/states/daily](http://covidtracking.com/api/states/daily) | [CSV](http://covidtracking.com/api/states/daily.csv)
* States info - [/api/states/info](http://covidtracking.com/api/states/info) | [CSV](http://covidtracking.com/api/states/info.csv)
* US current - [/api/us](http://covidtracking.com/api/us) | [CSV](http://covidtracking.com/api/us.csv)
* US daily - [/api/us/daily](http://covidtracking.com/api/us/daily) | [CSV](http://covidtracking.com/api/us/daily.csv)
* Counties- [/api/counties](http://covidtracking.com/api/counties) | [CSV](http://covidtracking.com/api/counties.csv)
* Tracker URLs - [/api/urls](http://covidtracking.com/api/urls)

If you want to filter the `/api/us/daily` you can add a query param like `?state=NY` to only show cases in New York. Or `?state=NY&date=20200316` to show the result of a specific date.

## GraphQL API

* Playground - [/api/playground](http://covidtracking.com/api/playground)
* GraphQL API - [/api/graphql](http://covidtracking.com/api/graphql)
