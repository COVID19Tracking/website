---
nav: Dashboard
---

<div class="dashboard">
  <div class="title-container">
    <h1 class="title">Visual dashboard</h1>
    <p>Tracking testing data has become crucial to fight the coronavirus. Considering the lag in data reports by public organizations, The COVID Tracking Project has been collecting more accurate information since March 4. On this dashboard, we present some of our data visualized and walk you through the most common misconceptions when charting coronavirus numbers.</p>

  </div>

  <div class="side-by-side">
    <div class="graphic-text">
      <h2 class="chart-hed">Differences between this data and the CDC data</h2>
      <p>As of today, the C.D.C. has tested <span id="cdc-specimen-count">--</span> specimens, and we have tracked at least <span id="project-total-count">--</span> tests administered across the country. It is important to note that testing numbers are likely an undercount because of the lack of universal testing and state reporting, and that multiple specimen tests can be conducted from a single person’s sample.</p>
    </div>
    <div class="graphic" id="cdc-comparison-chart-container">
      <div class="cdc-comparison-chart" id="cdc-test-chart"></div>
      <div class="cdc-comparison-chart" id="ct-test-chart"></div>
    </div>
  </div>

  <div class="map-container">
    <h2 class="chart-hed">Positive tests per one million people</h2>
    <div class="map-column">
      <div id="map-legend"></div>
      <div class="map" title="State Positive Cases / million people" id="state-map"></div>
    </div>
  </div>

  <p class="a11y-only">
    <a href="/data">Access data by state</a>
  </p>

  <div class="side-by-side">
    <div class="graphic-text">
      <p>Testing is one of the most important tools in controlling an outbreak. When universal testing is implemented, people who are infected with the virus can be isolated from folks who test negative. This functions as a sort of targeted social distancing technique and can help slow the outbreak.</p>
    </div>
    <div class="graphic" id="chart-daily-positive-total">
      <h2 class="chart-hed">Positive tests and total tests per in the US</h2>
      <ul class="chart-legend chart-dek">
        <li><span class="chart-legend-positive-color"></span> Positive tests</li>
        <li><span class="chart-legend-total-color"></span> Total tests</li>
      </ul>
      <div class="chart"></div>
      <div class="chart-api-note">
        <p>
          <a href="https://covidtracking.com/api/us/daily">Get this data from our API</a>
        </p>
      </div>
    </div>
  </div>
  <div class="side-by-side">
    <div class="graphic" id="chart-daily-death-total"></div>
    <div class="graphic-text">
      <p>Organized, collective, and timely response from the government and other authorities is a key factor in saving lives. One metric, though a sober one, we can use to measure the response’s effectiveness is the number of deaths attributed to the virus per day, and even per state.</p>
       <p>We recommend using total numbers for plotting deaths to compare one U.S. state against another. In this case, adjusting per capita adds a layer of abstraction to the story, making the numbers less graspable and powerful. It’s easier to picture 200 fatalities than 0.0001 fatalities per capita, as John Burn-Murdoch, a data journalist at the Financial Times, <a href="https://twitter.com/jburnmurdoch/status/1242904971311529985">pointed out.</a></p>
      <p>However, data tracking deaths attributed to the novel coronavirus is still a big gray area. Because a lot of hospitals are full, not everyone is receiving medical treatment and fatalities due to the virus might not be showing up in coronavirus statistics.</p>
      <p><a href="https://www.reuters.com/article/us-health-coronavirus-italy-homes-insigh/uncounted-among-coronavirus-victims-deaths-sweep-through-italys-nursing-homes-idUSKBN2152V0">Italian authorities say</a> there’s a significant number of people who have died but whose deaths were not linked to the coronavirus. That could be because they died at home or nursing homes without access to testing and medical treatment.</p>
      <p>A good solution is comparing the number of deaths at a certain location since the beginning of the outbreak to fatalities in that same period in previous years.</p>
      <p>Using confirmed cases to track the severity of the virus in one state is misleading as some states are not reporting positive cases due to lack of testing.</p>
    </div>
  </div>
  <div class="side-by-side">
    <div class="graphic-text">
       <p>Though this is a national crisis, each state is reporting data differently. We are tracking numbers from each state, though the quality and frequency of reports varies significantly.</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </div>
    <div class="graphic" id="chart-states-current-death-total"></div>    
  </div>  
  <div id="chart-state-small-multiples">
    <p>By comparing the positive tests to the total tests in each state, we can get a sense of how widespread a state’s testing regime might be (though always remember to consider population densities vary wildly across the country) and if the number of positive tests is tracking roughly against the total number of tests. If it is, then we might consider that the state isn’t necessarily just getting new infections every day but that they’re also giving more tests.</p>
    <h3 class="chart-hed">Cumulative tests by state</h3>
    <ul class="chart-legend chart-dek">
      <li><span id="small-multiples-positive-legend"></span> Positive tests</li>
      <li><span id="small-multiples-total-legend"></span> Total tests</li>
    </ul>
    <div class="charts"><!-- where the graphics end up --></div>
    <div class="charts-notes">
      <p><strong>Note:</strong> We derive the <code>total</code> value by adding together the <code>positive</code> and <code>negative</code> value for each state. This is to account for differences in how states reporting <code>pending</code> tests.</p>
      <p><strong>Source:</strong> The COVID Tracking Project</p>
    </div>
    <div class="by-line">By Daniel Gilbert, <a href="https://gabeoleary.com">Gabe O'Leary</a>, Jeremia Kimelman, <a href="https://julialedur.com.br">Júlia Ledur</a> and Melba Madrigal.</div>
  </div>
</div>

<script src="/_assets/js/d3.js"></script>
<script src="/_assets/js/d3-area-chart.js"></script>
<script src="/_assets/js/d3-bar-chart.js"></script>
<script src="/_assets/js/d3-legend.js"></script>
<script src="/_assets/js/britecharts.js"></script>

<!-- map resources -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
   integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
   crossorigin=""/>
<script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
   integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
   crossorigin=""></script>
<script src="https://cdn.jsdelivr.net/npm/@turf/turf@5/turf.min.js"></script>

<!-- scripts below are for Albers US map projections (currently unused) -->
<!--
<script src="https://unpkg.com/proj4leaflet@1.0.2/src/proj4leaflet.js"></script>
<script src="https://unpkg.com/proj4@2.6.0/dist/proj4-src.js"></script>
-->

<link rel="stylesheet" href="/_assets/css/_dashboard.css" >
<script src="/_assets/js/dashboard-charts.js"></script>
<script src="/_assets/js/dashboard-map.js"></script>
