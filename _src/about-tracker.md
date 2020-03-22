---
title: How the Project Works
nav: About the Tracker
summary: >
  This project is made by hand. We use technical tools to alert us to changes in
  the information states report, but all the information we publish has been
  collected and double-checked by humans. We prize accuracy over speed while
  also trying to keep the data fresh.
---
We update [the full dataset](/data/) each day between 4pm and 5pm EDT and do additional updates throughout the day as new information arrives.

## Where do you get your data?

All our information comes from state/district/territory public health authorities—or, occasionally, from trusted news reporting, official press conferences, or (very occasionally) tweets or Facebook updates from state public health authorities or governors. We cite all sources in the spreadsheet and discuss the dataset’s constantly fluctuating oddities in the annotations that accompany each state’s data on [our website](/data/) and [in the spreadsheet](https://docs.google.com/spreadsheets/u/2/d/e/2PACX-1vRwAqp96T9sYYq2-i7Tj0pvTf6XVHjDSMIKBdZHXiCGGdNC0ypEU9NbngS8mxea55JuCFuua1MUeOj5/pubhtml#).

## How trustworthy are your numbers?

We get the bulk of our data directly from state public health authorities, so we’re as reliable as they are, though we don’t have a live feed, so our numbers can be a few hours behind. States, however, report their numbers in inconsistent ways, which makes working with this dataset a bit complicated. Some states, like Oregon, provide the full set of numbers we track: the total number of tests conducted, breaking out positive, negative, and pending tests. For these states, we can provide data stretching through time, so they are maximally useful.

Other states provide some or none of these numbers on an ongoing basis. Some crucial states in this outbreak, notably California, Washington, and New York, have not been regularly reporting their total number of people tested. For these, we have to use other reporting tools: directly asking state officials, watching news conferences, gleaning information from trusted news sources, and whatever else it takes to present reliable numbers. Our hope is that all the states will begin providing comprehensive statistics, including negatives and totals from commercial and university labs.

Each state has a data quality grade associated with it based on the reliability of their reporting. This grading system is described below.

<h3 id="data-quality-grade">State data quality grades</h3>

A number score is tallied based on 4 simple components:

1. +1 for reporting positives reliably (only NV fails)
2. +1 for reporting negatives sometimes
3. +1 for reporting negatives reliably
4. +1 for reporting all commercial tests

The total score for each state corresponds to a letter grade:


<table style="width: 200px;">
  <thead>
    <tr>
      <th>Score</th>
      <th>Grade</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>4</td>
      <td>A</td>
    </tr>
    <tr>
      <td>3</td>
      <td>B</td>
    </tr>
    <tr>
      <td>2</td>
      <td>C</td>
    </tr>
    <tr>
      <td>1</td>
      <td>D</td>
    </tr>
  </tbody>
</table>

If you are calculating positive rates, it should only be with states that have an A grade. And be careful going back in time because almost all the states have changed their level of reporting at different times.

This is not a grade for the _testing effort itself_ — but rather for the comprehensiveness and regularity of each state's reporting.

## What if the CDC starts releasing this information?

That would be great! They have started providing some information about testing capacity by sample, but they’re still not reporting people tested or test results. If they do start publishing full data, we’ll keep our effort going for a while to make sure the data matches up, and then publicly archive our work for reference.

## If I cite numbers from this site, how should I credit the source?

The COVID Tracking Project.

## Do you have an API?

[Right here.](/api)

## But I want to know literally everything about your dataset and spreadsheet

Great! We made an [FAQ for newsrooms](/newsroom-expert-faq/) and other organizations who want to work with the data, dive right in.

## What software/tools are you using?

[Here’s our current list.](/software)
