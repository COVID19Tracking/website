---
title: Notes on State Data
nav: The Data
summary: ''
---
For an overview of how our project works, please check [About the Tracker](/about-tracker). This page will dig into the specific data issues we’ve seen with various states, and document the data sources we’re using for each of them.

<p class="updated">Last updated: March 11 4:01 pm ET by EK</p>

## Here’s What We Know About States

As mentioned in [About the Tracker](/about-tracker), different states make data available in different ways. Below is a list of all the states with links to where they report information about test and case counts, and details about the data where it departs from how we’re trying to report it.

### Alabama

(<https://www.alabamapublichealth.gov/infectiousdiseases/2019-coronavirus.html>) 

Data is in text in the paragraph under the Cases and Testing header.

### Alaska

(<http://dhss.alaska.gov/dph/Epi/id/Pages/COVID-19/monitoring.aspx>)

### Arizona

(<https://www.azdhs.gov/preparedness/epidemiology-disease-control/infectious-disease-epidemiology/index.php#novel-coronavirus-home>) 

We’ve combined the “Confirmed” and “Presumed Positive” numbers. Negatives are reported as “Ruled Out.”

### Arkansas

(<https://www.healthy.arkansas.gov/programs-services/topics/novel-coronavirus>)

### California

(<https://www.cdph.ca.gov/Programs/CID/DCDC/Pages/Immunization/ncov2019.aspx>)  

We are currently carrying over an old number (690) for negative tests that we got by inferring from a total number we got through reporting on 3/7. This number is necessarily inaccurate, but less inaccurate than a 0 in that cell. For now, enter a 690 in the Negative column each update. 

Also, California has started reporting “positive cases” (133) alongside deaths (1). It’s unclear if the death is included in the positive case number. We’re not including it until we get further clarification.

### Colorado

(<https://docs.google.com/document/d/e/2PACX-1vRSxDeeJEaDxir0cCd9Sfji8ZPKzNaCPZnvRCbG63Oa1ztz4B4r7xG_wsoC9ucd_ei3--Pz7UD50yQD/pub>)

Colorado has switched to providing numbers for people tested, not tests completed, this is great news. Also, we’re lumping “indeterminate treated as positive” with the positives. 

### Connecticut

(<https://portal.ct.gov/Coronavirus>)

### Delaware

(<https://dhss.delaware.gov/dhss/dph/epi/2019novelcoronavirus.html>)

### District of Columbia

(<https://coronavirus.dc.gov/page/coronavirus-data>)

We are lumping all presumptive positive cases together, including “Number of presumptive positive results from other lab.” DC dropped negatives on 3/11. We are carrying over our negative number from 3/10 of 20 negative tests.

### Florida

(<http://www.floridahealth.gov/diseases-and-conditions/COVID-19/>)

We’re including both Florida residents and repatriated people from other states, but not the non-Florida resident(s). We’re assuming that the Deaths are included in the Positive Cases count.

### Georgia

(<https://dph.georgia.gov/novelcoronavirus>)

On 3/11 Georgia pulled its numbers from the web. We'll roll over their old number positive number of 22 and hope they update. 

### Hawaii

(<https://health.hawaii.gov/docd/advisories/novel-coronavirus-2019/>)

Data about positive cases is in text.

### Idaho

(<https://coronavirus.idaho.gov/>)

We’re including Oregon residents tested in Idaho in the total, as the state does in its table (noted below).

### Illinois

(<http://www.dph.illinois.gov/topics-services/diseases-and-conditions/diseases-a-z-list/coronavirus>)

The website has some mathematical challenges with the tallies, so our numbers may differ. We combine the presumptive positives with the positives as we do everywhere.

### Indiana

(<https://www.in.gov/isdh/28470.htm>)

We are subtracting the positives from the total tested, as it appears they are not including pending. Indiana now says they are updating at 11:59 of the previous day.

### Iowa

Iowa currently has two timestamps. We are interpreting the one higher up the page as applying to monitoring (which we don't track) and lower down the page as applying to testing.

(<https://idph.iowa.gov/Emerging-Health-Issues/Novel-Coronavirus>)

### Kansas

(<http://www.kdheks.gov/coronavirus/>)

Data is available in a PDF linked from the COVID-19 Public Update URL at the top. Kansas provides pending tests and total tests as separate numbers, whereas our total will include pending tests.

### Kentucky

(<https://chfs.ky.gov/agencies/dph/Pages/covid19.aspx>)

### Louisiana

(<http://ldh.la.gov/index.cfm/page/3835>)

Data about positive cases only is in text. Total testing numbers are being shared via Facebook posts by the Louisiana Department of Health here (<https://www.facebook.com/LaDeptHealth>).

### Maine

(<https://www.maine.gov/dhhs/mecdc/infectious-disease/epi/airborne/coronavirus.shtml>)

### Maryland

(<https://phpa.health.maryland.gov/Pages/Novel-coronavirus.aspx>)

The website says that the data is "real time" so we mark our data entries with the current date and time: 00:00. As of March 7th, Maryland stopped reporting "pending tests".

### Massachusetts

(<https://www.mass.gov/info-details/covid-19-cases-quarantine-and-monitoring>)

Data is in a PDF linked to under the “COVID-19 cases in Massachusetts” header. Only positives are being reported.

### Michigan

(<https://www.michigan.gov/coronavirus>)

Our total equals Michigan's "Tests Approved". Our entries use the website's "update time" of 19:00 ET daily.

### Minnesota

(<https://www.health.state.mn.us/diseases/coronavirus/situation.html>)

We’re inferring the negative from by subtracting the POSITIVES from the TOTAL, until future guidance.

### Mississippi

([https://msdh.ms.gov/msdhsite/_static/14,0,420.html](https://msdh.ms.gov/msdhsite/_static/14,0,420.html))

We’re inferring the negative from by subtracting the POSITIVES from the TOTAL and no pending test data is provided. 

### Missouri

(<https://health.mo.gov/living/healthcondiseases/communicable/novel-coronavirus/>)

Only positives are being reported on their site, but media reports from 3/11 [citing health officials](https://www.kmov.com/news/missouri-residents-test-negative-for-coronavirus-health-officials-say/article_fee2fbc4-6322-11ea-bb3a-671ae423cb2a.html) say 11 negative tests have been performed. Missouri is providing no time and date, but based on these reports, we're using a last update time of 3/10 00:00, until the state is more explicit.

### Montana

(<https://dphhs.mt.gov/publichealth/cdepi/diseases/coronavirusmt>)

No update time provided, so our entries are coded for 19:30 on the previous weekday. The website claims to provide updates M-F by 5:30pm Mountain Time (17:30 ET).

### Nebraska

(<http://dhhs.ne.gov/Pages/Coronavirus.aspx>)

No time provided by state, our entries are coded with the date provided and 0:00 for time.

### Nevada

(<http://dpbh.nv.gov/coronavirus/>) 

Very rare updates from Nevada, we’re watching reports from news outlets as well. Four positives from [this media report](https://thenevadaindependent.com/article/coronavirus-cases-in-nevada-rise-to-4-after-patients-in-clark-washoe-counties-test-presumptively-positive)

### New Hampshire

(<https://www.dhhs.nh.gov/dphs/cdcs/2019-ncov.htm>)

We’ve combined the “Confirmed” and “Presumed Positive” numbers. Our TOTAL should be the same as their ‘Total Number of Persons Provided Specimens”

### New Jersey

(<https://www.nj.gov/health/>)

Data in a table in the Spotlight section. New Jersey reports full results (positives, negatives, pending, and total) AND (as of 3/10) deaths. Pending tests are listed as “Tests in Process”

### New Mexico

(<https://cv.nmhealth.org/>)

### New York

(<https://www.health.ny.gov/diseases/communicable/coronavirus/>)

Only positives are being reported.

### North Carolina

(<https://www.ncdhhs.gov/covid-19-case-count-north-carolina>)

Only positives are being reported. "Updated regularly as information becomes available." Code entries with today's date with a time of 00:00.

### North Dakota

(<https://www.health.nd.gov/diseases-conditions/coronavirus/north-dakota-coronavirus-cases>)

The website says "Updated Daily Monday-Friday by 12 Central" so our entries should be coded as 13:00 on date shown.

### Ohio

(<https://odh.ohio.gov/wps/portal/gov/odh/know-our-programs/Novel-Coronavirus/welcome/>)

We’re interpreting Persons Under Investigation as Pending.

### Oklahoma

(<https://www.ok.gov/health/Prevention_and_Preparedness/Acute_Disease_Service/Disease_Information/Coronavirus_Disease_2019/Oklahoma_Response_to_Coronavirus_Disease_2019/index.html>)

We’ve included Pending in our Total tested number.

### Oregon

(<https://www.oregon.gov/oha/PH/DISEASESCONDITIONS/DISEASESAZ/Pages/emerging-respiratory-infections.aspx>)

Click to expand the Situation in Oregon section.

### Pennsylvania

(<https://www.health.pa.gov/topics/disease/Pages/Coronavirus.aspx>)

Only positives are being reported. There appears to be a discrepancy in the Totals provided on the website and our data as we are just summing the numbers provided.

### Rhode Island

(<https://health.ri.gov/data/covid-19/>)

No update time given. Use current date and time = 00:00 for consistency with other data. 

### South Carolina

(<https://scdhec.gov/health/infectious-diseases/viruses/coronavirus-disease-2019-covid-19/monitoring-testing-covid-19>)

We’ve combined the “Positive” and “Presumptive Positive” numbers. No pending test counts are reported.

### South Dakota

(<https://doh.sd.gov/news/Coronavirus.aspx>)

No update time given. Use current date and time = 00:00 for consistency with other data. 

### Tennessee

(<https://www.tn.gov/health/cedep/ncov.html>) 

Data is in text. No update time given. Use current data and time = 00:00 for consistency with other data. 

### Texas

(<https://dshs.texas.gov/coronavirus/>) 

Only positives are being reported, scroll down for the data. No update time given; they say DSHS will update the state case count each day by 10 a.m. Central Time. Use current date, 00:00 for consistency

### Utah

(<https://coronavirus.utah.gov/latest/>) 

Data is in text. Only positives are being reported.

### Vermont

(<https://www.healthvermont.gov/response/infectious-disease/2019-novel-coronavirus>)

They say "This table is updated daily by 1:00 p.m. Last updated: \[date]" Use date provided and time =  13:00.

### Virginia

(<http://www.vdh.virginia.gov/surveillance-and-investigation/novel-coronavirus/>)

Data is reported at the bottom of the page. No pending test counts are reported. Only positives and negatives reported.

VA updates “every weekday between 10 and 11 am” so we use the last weekday at 11:00 as the “updated at” timestamp

### Washington

(<https://www.doh.wa.gov/Emergencies/Coronavirus>)

Total tests are reported below the tables with detail about the positive cases. Washington now reports positive and negative, but no pending. We have to subtract deaths from their positive case count, as they lump them in there.

### West Virginia

(<https://dhhr.wv.gov/Coronavirus%20Disease-COVID-19/Pages/default.aspx>)

Data is in text. No update time given. Use current data and time = 00:00 for consistency with other data.

### Wisconsin

(<https://www.dhs.wisconsin.gov/outbreaks/index.htm>)

No pending test counts are reported. Add “Positive” and “Positive Recovered” lines together.

### Wyoming

(<https://health.wyo.gov/publichealth/infectious-disease-epidemiology-unit/disease/novel-coronavirus/>)

Data is in text; as of Monday, March 9th, it appears that the state intends to only report positive counts, and that number is zero.