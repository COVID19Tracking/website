---
title: About the Tracker
nav: About the Tracker
summary: >-
  The COVID Tracking Project collects information from 50 US states, the District of Columbia, and 5 other U.S. territories to provide the most comprehensive testing data we can collect for the novel coronavirus, SARS-CoV-2. We use technical
  tools to alert us to changes in the information states are reporting, but all
  the information we publish has been collected and double-checked by humans.
---

## When is your data updated?

We’re currently trying to provide a daily update around 4pm Eastern, with additional updates as they show up on state reporting sites throughout the day, when we can. (This may change.)

## Is your data any good?

It’s not perfect, but it is as comprehensive as it is possible to be at any given moment.

## Why isn’t it perfect?

States report their numbers differently. Some, like Oregon, provide the full set of numbers we track: the total number of tests conducted, including positive, negative, and pending tests. For these states, we can provide data stretching through time, so they are maximally useful.

Other states provide some or none of these numbers on an ongoing basis. Some crucial states in this outbreak, notably California, Washington, and New York, have not been regularly reporting their total number of people tested. For these, we have to use other reporting tools: directly asking state officials, watching news conferences, gleaning information from trusted news sources, and whatever else it takes to present reliable numbers. Our hope is that all the states will begin providing comprehensive statistics, [as the great state of New Jersey did](https://twitter.com/GunaRockYa/status/1236439135575052288?s=20) after we requested them.

Then there’s Nevada, which is currently updating once a week.

## Are there other data problems?

Because the US testing response has lagged behind the outbreak, university and commercial laboratories are now rushing to bring testing capacity online. This has already created some data reporting problems, as the heroes at the University of Washington Virology Lab report separately from the state health department. We don’t yet know how other university labs or private testing companies will report data.

## Why do I sometimes hear about the number of “specimens” tested and other times the number of people tested?

This one is a little complicated, but suffice to say that to get an accurate result, laboratories generally require two specimens. The math isn’t quite that simple, but the main implication is: if you have 100 tests, you can really only test 50 people.

## What if the CDC starts releasing this information?

That would be great! They have started providing some information about testing capacity by sample, but they’re still not reporting people tested or test results. If they do start publishing full data, we’ll probably keep our effort going for a while to make sure the data matches up, and then publicly archive our work for reference.

## If I cite numbers from this site, how should I credit the source?

The COVID Tracking Project.

## What do the various components of the spreadsheet mean?

#### States daily tab

* One row per day per state
* There’s a filter active that only shows today’s data
* We collapse positive and presumptive positive tests into the “positive” column
* The numbers for each day are finalized near the end of my work day, between 4 and 5 pm Eastern
* The numbers are cumulative over time, not per day
* Most numbers are pulled directly from the state public health website listed in the “States” tab
* Some numbers are derived from other sources; we’ve tried to put a comment on the field to indicate the alternative source

#### US daily tab

* We use the [QUERY function](https://support.google.com/docs/answer/3093343?hl=en) to summarize the “Data” sheet by day

#### States tab

* One row per state (including DC, because it should be a state!)
* “COVID-19 site” is the state’s public health landing page for the outbreak
* “Data site” is populated when the state puts their test data on a separate site
* “PUI” means person under investigation, and is meant to capture positive, negative, and pending test results
* “PUM” means person under monitoring; we don’t collect these numbers as they are reported far less consistently across states
* “Last update” is the time the state website claims data to have been last updated
* “Last checked” is the time we last visited their website
* “Checked by” has my initials for each row; in the future, others can claim a row

#### Counties tab

* Because WA inconsistently reports total tests, we decided to look for county-level data. This may not be needed in the future.
