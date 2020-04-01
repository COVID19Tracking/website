/* eslint-disable */

;(async function loadMap() {
  const button = d3.select('#map-start-stop')
  const choroButton = d3.select('#map-choro-button')
  const slider = d3.select('#map-time-scrubber [type="range"]')
  const formatDate = d3.timeFormat('%b. %d')
  const formatNumber = d3.format(',.0f')
  const parseDate = d3.timeParse('%Y%m%d')

  // duplicated from dashboard-chart.js - should have common lib

  const colors = {
    totalTestResults: '#696DC2',
    positive: '#E5A968',
    death: '#404856',
  }

  const getValue = (d, field = currentField, normalized = false) =>
    ((d.properties.dailyData[currentDate] &&
      d.properties.dailyData[currentDate][field]) ||
      0) / (normalized ? d.properties.population / 1000000 : 1)

  // holds all data in geojson objects
  let joinedData = null
  // holds the date of the displayed day
  let currentDate = ''
  // holds the field we are currently viewing
  let currentField = 'positive'

  let usechoropleth = false

  // this should be dynamic, espcially with the toggleable fields
  // for now there is just a scale for each of the fields.
  const limit = [1, 5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000]
  const colorLimits = {
    death: [1, 2, 5, 10, 25, 50, 100],
    positive: [50, 100, 250, 500, 1000, 2500, 5000],
    totalTestResults: [100, 250, 500, 1000, 2500, 5000, 10000],
  }

  const mapColorScale = [
    '#E5A968',
    '#ED9C42',
    '#DC8C3A',
    '#CA7B32',
    '#B96A2A',
    '#A75922',
    '#96491A',
    '#843812',
  ]

  const getColor = {
    death: d3.scaleThreshold(colorLimits.death, d3.schemeGreys[8]),
    positive: d3.scaleThreshold(colorLimits.positive, d3.schemeOranges[8]),
    totalTestResults: d3.scaleThreshold(
      colorLimits.totalTestResults,
      d3.schemePurples[8],
    ),
  }

  const createMapFromArray = (array, keyField, valueField = null) => {
    return Object.assign(
      {},
      ...array.map(a => ({ [a[keyField]]: valueField ? a[valueField] : a })),
    )
  }

  const joinDataToGeoJson = (geoJSON, stateArray, path) => {
    const groupedByState = d3
      .nest()
      .key(d => d.state)
      .entries(stateArray)
    const stateMap = createMapFromArray(groupedByState, 'key', 'values')
    const joinedFeatures = geoJSON.features.map(feature => ({
      ...feature,
      properties: {
        ...feature.properties,
        centroidCoordinates: path.centroid(feature), //should get rid of turf and use d3 for the centroid
        dailyData: createMapFromArray(
          stateMap[feature.properties.STUSPS],
          'date',
        ),
      },
    }))
    return { ...geoJSON, features: joinedFeatures }
  }

  Promise.all([
    d3.json('/_assets/json/state-populations.json'),
    d3.json('https://covidtracking.com/api/states/daily'),
  ]).then(([geojson, stateData]) => {
    // set currentDate to the latest day
    currentDate = stateData[0].date
    const groupedByDate = d3
      .nest()
      .key(function(d) {
        return d.date
      })
      .entries(stateData)
      .reverse()
    slider
      .attr('min', 0)
      .attr('max', groupedByDate.length - 1)
      .attr('step', 1)

    const margin = {
      bottom: 10,
      left: 10,
      right: 10,
      top: 10,
    }
    const height = 400
    const width = 700
    const projection = d3.geoAlbersUsa().fitExtent(
      [
        [margin.left, margin.top],
        [width - margin.right, height - margin.bottom],
      ],
      geojson,
    )
    const path = d3.geoPath().projection(projection)

    joinedData = joinDataToGeoJson(geojson, stateData, path)

    const hedAndDek = d3
      .select('#state-map')
      .insert('div', 'div#map-time-scrubber')
      .attr('id', 'map-dek')
    const hed = hedAndDek.append('h2')
    const dek1 = hedAndDek.append('p')
    const dek2 = hedAndDek.append('p')
    dek1.html(
      `<span id="dek-tests"></span> <span class="legend-text total">tests conducted</span>`,
    )
    dek2.html(
      `<span id="dek-positive"></span> <span class="legend-text positive">positive tests</span>`,
    )
    function setupDropdown() {
      const propertyDropdown = dek1
        .append('select')
        .attr('id', 'map-property-select')
        .attr('value', currentField)

      const propertyOptions = [
        {
          value: 'positive',
          name: 'Positive Cases',
        },
        {
          value: 'totalTestResults',
          name: 'Total Tests',
        },
        {
          value: 'death',
          name: 'Deaths',
        },
      ]
      // set up property selector
      propertyDropdown
        .selectAll('option')
        .data(propertyOptions)
        .enter()
        .append('option')
        .text(d => d.name)
        .attr('value', d => d.value)
      propertyDropdown.on('change', () => {
        currentField = propertyDropdown.property('value')
        updateMap()
      })
    }
    setupDropdown()

    const svg = d3
      .select('#state-map')
      .append('svg')
      .attr('height', height)
      .attr('width', width)

    const tooltip = d3
      .select('#state-map')
      .append('div')
      .attr('id', 'map-tooltip')
      .style('display', 'none')

    const maxValue = d3.max(joinedData.features, d =>
      getValue(d, 'totalTestResults'),
    )

    const r = d3
      .scaleSqrt()
      .domain([0, maxValue])
      .range([0, 50])
    const map = svg.append('g')
    const testBubbles = svg.append('g').attr('id', 'testBubbles')
    const bubbles = svg.append('g').attr('id', 'bubbles')

    updateMap()

    // .on('mouseleave', function() {
    //   tooltip.style('display', 'none')
    // })

    function updateLegend() {
      //miggt be better to add both legends once and toggle
      d3.select('#map-legend')
        .selectAll('*')
        .remove()
      if (usechoropleth) {
        d3.select('#map-legend')
          .append('span')
          .attr('style', 'font-weight: 600')
          .text(`per million residents`)
        d3.select('#map-legend').append(() =>
          d3Legend({
            color: getColor[currentField],
            height: 40,
            width: 300,
            marginTop: 8,
            tickFormat: '~s',
            spaceBetween: 2,
            tickSize: 0,
          }),
        )
      } else {
        //bubble legend
        const legend = d3
          .select('#map-legend')
          .append('svg')
          .attr('style', 'overflow:visible')
        const formatLegendEntry = d => parseInt(d3.format('.1r')(d))
        const legendData = [
          formatLegendEntry(maxValue * 0.1),
          formatLegendEntry(maxValue * 0.5),
          formatLegendEntry(maxValue),
        ]
        legend
          .attr('height', 150)
          .attr('width', 150)
          .append('g')
          .selectAll('circle')
          .data(legendData)
          .enter()
          .append('circle')
          .attr('r', d => r(d))
          .attr('cx', 52)
          .attr('cy', d => 145 - r(d))
          .attr('stroke', '#ababab')
          .attr('fill', 'none')

        legend
          .append('g')
          .selectAll('line')
          .data(legendData)
          .enter()
          .append('line')
          .attr('x1', 52)
          .attr('x2', 130)
          .attr('y1', d => 145 - 2 * r(d))
          .attr('y2', d => 145 - 2 * r(d))
          .attr('stroke', '#ababab')
          .attr('stroke-dasharray', '5 5')

        legend
          .append('g')
          .selectAll('text')
          .data(legendData)
          .enter()
          .append('text')
          .attr('font-size', '10pt')
          .attr('x', 105)
          .attr('y', d => 140 - 2 * r(d))
          .text(d => formatNumber(d))
      }
    }

    function updateMap() {
      const getColorFromFeature = d => {
        if (!usechoropleth) return 'white'
        const normalizationPopulation = 1000000 // 1 million;

        const normalizedValue = d.properties.dailyData[currentDate]
          ? d.properties.dailyData[currentDate][currentField] /
            (d.properties.population / normalizationPopulation)
          : 0
        return getColor[currentField](normalizedValue)
      }
      updateLegend()
      const states = map.selectAll('path').data(joinedData.features)
      states.enter().append('path')
      states
        .attr('d', path)
        .attr('stroke', '#ababab')
        .transition()
        .duration(200)
        .attr('fill', getColorFromFeature)

      states
        .on('mouseenter', function(d) {
          const positive = getValue(d, 'positive')
          const positiveNorm = getValue(d, 'positive', true)
          const totalTestResults = getValue(d, 'totalTestResults')
          const totalTestResultsNorm = getValue(d, 'totalTestResults', true)
          const death = getValue(d, 'death')
          const deathNorm = getValue(d, 'death', true)
          const tooltipHtml = `
            <table>
              <thead>
                <tr>
                  <td colspan="3">${d.properties.NAME}</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td>Total</td>
           	      <td>Per capita*</td>
                </tr>
                <tr>
                  <td>Tests</td>
                  <td>${formatNumber(totalTestResults)}</td>
           	      <td>${formatNumber(totalTestResultsNorm)}</td>
                </tr>
                <tr>
                  <td>Positive tests</td>
                  <td>${formatNumber(positive)}</td>
           	      <td>${formatNumber(positiveNorm)}</td>
              </tr>
              <tr>
                <td>Deaths</td>
                <td>${formatNumber(death)}</td>
                <td>${formatNumber(deathNorm)}</td>
              </tr>
            </tbody>
          </table>
          `
          tooltip
            .style('display', 'block')
            .style('top', d3.event.layerY + 20 + 'px')
            .style('left', d3.event.layerX - 135 + 'px')
            .html(tooltipHtml)
        })
        .on('mouseleave', d => tooltip.style('display', 'none'))
      drawCircles(usechoropleth)
      updateHedAndDek()
    }

    function updateHedAndDek() {
      //todo: complete sum
      hed.text(formatDate(parseDate(currentDate)))
      if (usechoropleth) {
        const totalchoro = d3.sum(joinedData.features, d => getValue(d))
        d3.select('.legend-text').attr('style', 'display:none')
        dek2.attr('style', 'display:none')
        d3.select('#map-property-select').attr('style', '')
        d3.select('#dek-tests').text(formatNumber(totalchoro))
      } else {
        const totalTests = d3.sum(joinedData.features, d =>
          getValue(d, 'totalTestResults'),
        )
        const totalPositive = d3.sum(joinedData.features, d =>
          getValue(d, 'positive'),
        )
        d3.select('.legend-text').attr('style', '')
        dek2.attr('style', '')
        d3.select('#map-property-select').attr('style', 'display:none')
        d3.select('#dek-tests').text(formatNumber(totalTests))
        d3.select('#dek-positive').text(formatNumber(totalPositive))
      }
    }

    function drawCircles(remove = false) {
      const circles = bubbles.selectAll('circle').data(joinedData.features)
      const testCircles = testBubbles
        .selectAll('circle')
        .data(joinedData.features)

      if (remove) {
        circles.remove()
        testCircles.remove()
      } else {
        circles
          .enter()
          .append('circle')
          .attr('cx', d => d.properties.centroidCoordinates[0])
          .attr('cy', d => d.properties.centroidCoordinates[1])
          .attr('stroke', '#D18F4B')
          .attr('fill', colors.positive)
          .attr('fill-opacity', 0.8)
          .style('pointer-events', 'none')
          .attr('r', d => {
            const value = getValue(d, 'positive')
            return r(value)
          })
        testCircles
          .enter()
          .append('circle')
          .attr('cx', d => d.properties.centroidCoordinates[0])
          .attr('cy', d => d.properties.centroidCoordinates[1])
          .attr('stroke', colors.totalTestResults)
          .attr('fill', colors.totalTestResults)
          .attr('fill-opacity', 0.2)
          .style('pointer-events', 'none')
          .attr('r', d => {
            const value = getValue(d, 'totalTestResults')
            return r(value)
          })
        circles
          .transition()
          .duration(200)
          .attr('r', d => {
            const value = getValue(d, 'positive')
            return r(value)
          })
        testCircles
          .transition()
          .duration(200)
          .attr('r', d => {
            const value = getValue(d, 'totalTestResults')
            return r(value)
          })
      }
    }

    let currentIndex = groupedByDate.length
    let interval = null

    function start() {
      if (currentIndex === groupedByDate.length) {
        currentIndex = 0
      }
      interval = setInterval(() => {
        if (currentIndex === groupedByDate.length) {
          return stop()
        }
        currentDate = groupedByDate[currentIndex].key
        updateMap()
        slider.property('value', currentIndex)
        currentIndex += 1
      }, 500)
    }

    function stop() {
      clearInterval(interval)
      button.property('checked', false)
    }

    slider.property('value', currentIndex)
    updateMap()

    button.on('change', function() {
      const isChecked = button.property('checked')
      if (isChecked) {
        start()
      } else {
        stop()
      }
    })

    choroButton.on('change', () => {
      usechoropleth = choroButton.property('checked')
      updateMap()
    })

    slider.on('input', function() {
      const value = (currentIndex = +slider.property('value'))
      currentDate = groupedByDate[currentIndex].key
      updateMap()
    })
  })

  return
})()
