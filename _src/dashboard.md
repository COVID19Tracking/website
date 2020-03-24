---
title: Dashboard
nav: Dashboard
---

<div class="dashboard">
  <div class="graphic" id=""></div>
  <div class="side-by-side">
    <div class="graphic" id="chart-daily-positive-total"></div>
    <div class="graphic" id="chart-daily-death-total"></div>
  </div>
  <br />
  <div class="map" title="State Positive Cases / million people" id="state-map">
</div>

<link rel="stylesheet" href="/_assets/css/c3.css" >
 <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
   integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
   crossorigin=""/>

<link rel="stylesheet" href="/_assets/css/_dashboard.css" >
<script src="/_assets/js/d3.js"></script>
<script src="/_assets/js/britecharts.js"></script>

 <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
   integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
   crossorigin=""></script>
<script src="https://cdn.jsdelivr.net/npm/@turf/turf@5/turf.min.js"></script>
<!-- scripts below are for Albers US map projections -->
<!--
<script src="https://unpkg.com/proj4leaflet@1.0.2/src/proj4leaflet.js"></script>
<script src="https://unpkg.com/proj4@2.6.0/dist/proj4-src.js"></script>
-->

<script src="/_assets/js/dashboard-charts.js"></script>
<script src="/_assets/js/dashboard-map.js"></script>
