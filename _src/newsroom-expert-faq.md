---
title: 'Newsroom/Expert FAQ '
nav: Newsroom FAQ
---
## Can we have a video call to talk through the data?

We would love to, but we are at capacity handling the data right now. These docs are our most current information, so please start by reading everything we’ve published here.

If you’re on a newsroom data team and still have questions, we have someone answering them in the #covid channel of the News Nerdery slack. If that doesn’t help, please feel free to [open an issue in our public repo on GitHub](https://github.com/COVID19Tracking/issues/issues) and we’ll get eyes on it as soon as possible. Once we establish more ways to contact us for help, we’ll post them here.

## Does your data represent cumulative cases or new cases each day?

Our data represents the cumulative known cases to date. You can calculate new cases per day from our data, but we don't provide it directly.

## I have a question about how you handle data for State X

**Tl;dr:** Everything we know about official sources is tracked in the list of [state sources with constantly updated annotations](https://docs.google.com/spreadsheets/u/2/d/e/2PACX-1vRwAqp96T9sYYq2-i7Tj0pvTf6XVHjDSMIKBdZHXiCGGdNC0ypEU9NbngS8mxea55JuCFuua1MUeOj5/pubhtml#) we make every time something changes. These are also [on this website.](/data/)

For **so much more** exciting information about state data, keep reading this page.

## How does your data account for changes in state-level data protocol?

Sometimes states stop providing certain metrics. For example, New York has, at various times, started and stopped reporting negative numbers.

**Removed “negative” numbers:** We assume that once a test returns negative, it is always negative. Therefore, we continue reporting old negative numbers, even when a state stops reporting them. If we don’t do this, it’s possible for totals to drop from day-to-day.

**Removed “pending” numbers:** As private lab testing scales up, many states are ceasing to report the number of pending test results, as they don’t always get detailed data from the labs. When a state stops reporting pending numbers, we do not continue reporting old numbers on subsequent days, since we can’t assume those tests are still pending the following day. We assume older pending numbers will very soon turn into either positives or negatives, so this will not cause a permanent day-to-day drop in totals.

## Are you accounting for only residents?

We attempt to report numbers that reflect individuals who are isolated and recovering in the state. Most states report this number, but due to cruise ship quarantines and other movements of individuals, some states (like Florida and Montana) report several categories of confirmed cases.

For example, Florida reports “FL resident diagnosed & isolated out of state.” In this case, we exclude this from our positive case count, because the individual is not isolated in the state.

As another example, Montana references one person that was [tested and isolated in Maryland](https://www.mtpr.org/post/montanan-maryland-tests-positive-covid-19) and therefore has been excluded from the metrics.

## How do you account for deaths?

Our goal is first and foremost to provide comprehensive information on the scope of the spread of COVID19 across the US. We also include data on deaths, but you can assume that these numbers are also incorporated into the positive case count.

We’ve seen some cases where states appear to be reporting them as mutually exclusive numbers (as seems to be the case at least some of the time in California, for example). When we have team consensus that this is the case, we do the math to add them back into the total positive case count, and we annotate the data accordingly.

## Are you reporting people tested or specimens tested?

We attempt to report the number of people being tested, not specimens submitted. To oversimplify, laboratories often require two specimens, so if you see “specimens” or “tests run” used to report on testing data, you may be able to infer the number of people tested by dividing by two. The math isn’t quite that simple, but the main implication is: if you have 100 tests, you can really only test 50 people.

## How should we understand the timestamps?

Our goal is to provide a consistently up-to-date dataset on COVID-19 testing. We prefer when states provide an exact update time for their data, but this is not always available.

**Timezones:** Given that the US and its territories span 8 different timezones, we convert the “Last Updated” time provided by each state/territory into Eastern Time. 

**“Last Update”** is the time the data was last updated by the state.**†** Where official state websites are missing numbers or are lagging behind numbers reported in the press, we supplement data from the state websites with numbers that have been vetted and reported by trusted news organizations. In this case we use the later of the “last updated” timestamp on the website and the time the article was published.

**†** Some states (like California, currently) post updates with timestamps like "as of 10 am on 3/12," but the state website isn’t updated to include that data until, say, 2pm. In this case, we try to use the number that appears to refer to the data update itself, rather than the time the state pushes the update to its website, so for this example, we use 10am, not 2pm, as the update time.

**“Check Time”** is the last time we reviewed the state data source and updated our data.

**Using Target Update Times:** There are some states that don’t report an official update time, but provide guidance that they update “by” or “around” the same time each day (e.g. Massachusetts and Wisconsin). In these cases, we use their “target update time” as the “Last Update.”

**No Update Time Provided:** One exception is when a state does not report an update time on their official site. In this case, we standardize and just report the given date and a time of 00:00, without any particular timezone conversion.



## What do all the tabs do?

#### States daily 4pm tab

* One row per day per state (or US territory or district, in the case of DC)
* There’s a filter active that only shows today’s data
* **The numbers for each day are finalized between 4 and 5 pm Eastern**
* **Important:** States report their data at inconsistent times, so there's a chance that the "states daily 4 pm ET" data might miss a state update one day. For example, California held their update till late in the day one day, so their data was the same for two days in the "states daily 4 pm ET" data, and then the next day, it looked like they jumped by a lot.
* We collapse positive and presumptive positive tests into the “positive” column
* The numbers are cumulative over time, not per day
* Most numbers are pulled directly from the state public health website listed in the “States” tab. Some numbers are derived from other sources; we’ve tried to put a comment on the field to indicate the alternative source

#### US daily tab

* We use the [QUERY function](https://support.google.com/docs/answer/3093343?hl=en)to summarize the “Data” sheet by day

#### States tab

* One row per state (or US territory or district, in the case of DC)
* “COVID-19 site” is the state’s public health landing page for the outbreak
* “Data site” is populated when the state puts their test data on a separate site
* “PUI” means person under investigation, and is meant to capture positive, negative, and pending test results
* “PUM” means person under monitoring; we don’t collect these numbers as they are reported far less consistently across states
* “Last update” is the time the state website claims data to have been last updated
* “Last checked” is the time we last visited their website
* “Checked by” has my initials for each row; in the future, others can claim a row

#### Counties tab

* We are looking into whether we want to include county-level efforts.

## Are there other data problems?

Because the US testing response has lagged behind the outbreak, university and commercial laboratories are now rushing to bring testing capacity online. This has already created some data reporting problems, as only some private and university labs appear to be reporting through the states. 

We’re working hard to understand how their results will be reported, and we will update this page as soon as we know more.
