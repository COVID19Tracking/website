---
nav: Dashboard
---

<div class="dashboard">
  <div class="title-container">
    <h1 class="title">Visual dashboard</h1>
  </div>
  <p>The COVID Tracking Project collects information from 50 US states, the District of Columbia, and 5 other US territories to provide the most comprehensive testing data we can collect for the novel coronavirus, SARS-CoV-2. We attempt to include positive and negative results, pending tests, and total people tested for each state or district currently reporting that data.</p>
  <p>Tracking testing data in the U.S. has been a challenge for public authorities. The Center for Disease Control, the US federal public health agency, is currently publishing incomplete data that lags several days behind state reports.</p>

  <div class="side-by-side">
    <div class="graphic-text">
      <p>Testing is a crucial part of any public health response, and sharing test data is essential to understanding this outbreak. The CDC is currently not publishing complete testing data, so we're doing our best to collect it from each state and provide it to the public.</p>
      <p>As of today, the CDC has tested XX number of specimens, and we have tracked that there have been at least YY tests administered across the country. It is important to note that testing numbers are likely an undercount because of the lack of universal testing, and that a multiple specimen tests can be conducted from a single person’s sample.</p>
    </div>
    <div class="graphic" id="cdc-versus-project-data-chart">CDC bar charts go here</div>
  </div>

  <div class="map-container">
    <div class="map-column">
      <h2>Cases per one million people</h2>
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
    <div class="graphic" id="chart-daily-positive-total"></div>
  </div>
  <div class="side-by-side">
    <div class="graphic" id="chart-daily-death-total"></div>
    <div class="graphic-text">
      <p>
        The entire point of the response to the novel coronavirus is to save lives. One metric, though a sober one, we can use to measure the response’s effectiveness is the number of deaths attributed to the virus per day, and even per state.
      </p>
      <p>
        We recommend using virus attributed deaths as the most meaningful measure to compare one US state against another. This is because ZZZZ
      </p>
    </div>
  </div>
  <div id="chart-state-small-multiples">
    <h3 class="chart-hed">Cumulative tests per state</h3>
    <p>By comparing the positive tests to the total tests in each state, we can get a sense of how widespread a state’s testing regime might be (though always remember to consider population densities vary wildly across the country) and if the number of positive tests is tracking roughly against the total number of tests. If it is, then we might consider that the state isn’t necessarily just getting new infections every day but that they’re also giving more tests.</p>
    <ul class="chart-legend chart-dek">
      <li><span id="small-multiples-positive-legend"></span> Positive tests</li>
      <li><span id="small-multiples-total-legend"></span> Total tests</li>
    </ul>
    <div class="charts"><!-- where the graphics end up --></div>
    <div class="charts-notes">
      <p><strong>Note:</strong> We derive the <code>total</code> value by adding together the <code>positive</code> and <code>negative</code> value for each state. This is to account for differences in how states reporting <code>pending</code> tests.</p>
      <p><strong>Source:</strong> The COVID Tracking Data </p>
    </div>
    <div class="by-line">By Daniel Gilbert, <a href="https://gabeoleary.com">Gabe O'Leary</a>, Jeremia Kimelman, Júlia Ledur and Melba Madrigal.</div>
  </div>
</div>

<script src="/_assets/js/d3.js"></script>
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
