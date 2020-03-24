/* eslint-disable */

;(async function loadMap() {
  const formatter = new Intl.NumberFormat('en-us', {
    maximumFractionDigits: 1,
  })

  const colorLimits = [1, 5, 10, 25, 50, 100, 250, 500]

  const getColor = d => {
    return d > colorLimits[7]
      ? '#800026'
      : d > colorLimits[6]
      ? '#BD0026'
      : d > colorLimits[5]
      ? '#E31A1C'
      : d > colorLimits[4]
      ? '#FC4E2A'
      : d > colorLimits[3]
      ? '#FD8D3C'
      : d > colorLimits[2]
      ? '#FEB24C'
      : d > colorLimits[1]
      ? '#FED976'
      : '#FFEDA0'
  }
  const joinDataToGeoJson = (geoJSON, stateArray) => {
    //in addition to joining latest state data to their shapes this also calculates positive cases per million people
    const stateObject = Object.assign(
      {},
      ...stateArray.map(state => ({ [state.state]: state })),
    )
    const joinedFeatures = geoJSON.features.map(feature => {
      const positive = stateObject[feature.properties.STUSPS].positive
      const population = feature.properties.population
      const casesPerMil = positive / (population / 1000000)
      return {
        ...feature,
        // geometry: turf.centroid(feature).geometry,// uncomment to use centroid of each state instead of shape
        properties: {
          casesPerMil,
          ...feature.properties,
          ...stateObject[feature.properties.STUSPS],
        },
      }
    })
    return { ...geoJSON, features: joinedFeatures }
  }
  const initializeMap = () => {
    const map = L.map('state-map').setView([38.617379, -101.318915], 3)
    // code below is to use albers us projection
    /*
    var proj = d3
      .geoAlbersUsa()
      // .translate([0, 0])
      .scale(0.5)

    var AlbersProjection = {
      project: function(latLng) {
        var point = proj([latLng.lng, latLng.lat])
        return point ? new L.Point(point[0], point[1]) : new L.Point(0, 0)
      },
      unproject: function(point) {
        var latLng = proj.invert([point.x, point.y])
        return new L.LatLng(latLng[1], latLng[0])
      },
    }

    var AlbersCRS = L.extend({}, L.CRS, {
      projection: AlbersProjection,
      transformation: new L.Transformation(1, 0, 1, 0),
      infinite: true,
    })

    var center = [37.8, -96]
    const map = new L.Map('state-map', { crs: AlbersCRS }).setView(center, 2)
*/
    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/light-v10',
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          'pk.eyJ1IjoiZ29sZWFyeSIsImEiOiJjaXJmNWh5YmgwMDd6ZzNuZXVsOHplYXRmIn0.41N9r7fWdPMGEz60wv5eZw',
      },
    ).addTo(map)
    return map
  }

  const addInfoBox = () => {
    // describes info box that shows details of hovered states
    const info = L.control()

    info.onAdd = function(map) {
      this._div = L.DomUtil.create('div', 'map-info') // create a div with a class "info"
      this.update()
      return this._div
    }

    // method that we will use to update the control based on feature properties passed
    info.update = function(props) {
      this._div.innerHTML =
        '<h4>Cases per Million</h4>' +
        (props
          ? '<b>' +
            props.NAME +
            '</b><br />' +
            formatter.format(props.casesPerMil) +
            ' cases / million' +
            '<br / >' +
            formatter.format(props.positive) +
            ' total cases'
          : 'Hover over a state')
    }

    return info.addTo(map)
  }

  const addDataToMap = data => {
    // below describes state hover behaviour
    function highlightFeature(e) {
      var layer = e.target

      layer.setStyle({
        weight: 2,
        fillOpacity: 0.9,
      })

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront()
      }
      info.update(layer.feature.properties)
    }
    function resetHighlight(e) {
      geojson.resetStyle(e.target)
      info.update()
    }

    // unused, enables clicks on states to zoom to that shape
    function zoomToFeature(e) {
      map.fitBounds(e.target.getBounds())
    }

    function onEachFeature(feature, layer) {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
      })
    }
    // styles of states on the map

    const defaultStyle = {
      weight: 1,
      fillOpacity: 0.7,
      color: 'white',
    }

    // only used for lines & shapes
    const styleFeature = feature => {
      return {
        ...defaultStyle,
        fillColor: getColor(
          feature.properties.casesPerMil, //using cases/million people
        ),
      }
    }

    // currently unused
    // the circle styling is defined below
    // the size is as multiplier of the number of cases or normalized (to population) number of cases
    // this means as the number of cases grow the sizes of the circles will also grow until they are too large.
    const stylePoint = (geoJsonPoint, latlng) => {
      debugger
      return L.circle(latlng, {
        weight: 1,
        color: '#F18762',
        fillOpacity: 0,
        radius: geoJsonPoint.properties.positive * 25,
        //radius: geoJsonPoint.properties.positive / geoJsonPoint.properties.population * 200000000,
      })
    }

    geojson = L.geoJson(data, {
      //pointToLayer: stylePoint,
      style: styleFeature,
      onEachFeature: onEachFeature,
    }).addTo(map)
  }

  const addLegend = () => {
    // add legend
    var legend = L.control({ position: 'bottomright' })

    legend.onAdd = function(map) {
      var div = L.DomUtil.create('div', 'map-info map-legend'),
        labels = []

      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < colorLimits.length; i++) {
        div.innerHTML +=
          '<i style="background:' +
          getColor(colorLimits[i] + 1) +
          '"></i> ' +
          formatter.format(colorLimits[i]) +
          (colorLimits[i + 1]
            ? '&ndash;' + formatter.format(colorLimits[i + 1]) + '<br>'
            : '+')
      }

      return div
    }

    legend.addTo(map)
  }

  // addDataToMap() relies on map & info being defined within scope
  const map = initializeMap()
  const info = addInfoBox()

  addLegend()

  Promise.all([
    d3.json(`../_assets/json/state-populations.json`), // state population data comes from USCB American Community Survey
    d3.json('https://covidtracking.com/api/states'),
  ])
    .then(([stateGeoJson, stateCurrentData]) =>
      joinDataToGeoJson(stateGeoJson, stateCurrentData),
    )
    .then(addDataToMap)
})()
