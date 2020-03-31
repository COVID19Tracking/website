/* eslint-disable */

;(async function loadMap() {
  const button = d3.select('#map-start-stop')
  const chloroButton = d3.select('#map-chloro-button')
  const slider = d3.select('#map-time-scrubber [type="range"]')
  const formatDate = d3.timeFormat('%b. %d')
  const formatNumber = d3.format(',')
  const parseDate = d3.timeParse('%Y%m%d')

  const valueLabel = 'positive tests'

  function getValue(d, field = currentField) {
    return (
      (d.properties.dailyData[currentDate] &&
        d.properties.dailyData[currentDate][field]) ||
      0
    )
  }

  // holds all data in geojson objects
  let joinedData = null
  // holds the date of the displayed day
  let currentDate = ''
  // holds the field we are currently viewing
  let currentField = 'positive'

  // this should be dynamic, espcially with the toggleable fields
  const colorLimits = [5, 10, 25, 50, 100, 250, 500]

  const getColor = d3.scaleThreshold(colorLimits, d3.schemeYlOrRd[8])

  const createMapFromArray = (array, keyField, valueField = null) => {
    return Object.assign(
      {},
      ...array.map(a => ({ [a[keyField]]: valueField ? a[valueField] : a })),
    )
  }

  const joinDataToGeoJson = (geoJSON, stateArray) => {
    const groupedByState = d3
      .nest()
      .key(d => d.state)
      .entries(stateArray)
    const stateMap = createMapFromArray(groupedByState, 'key', 'values')
    const joinedFeatures = geoJSON.features.map(feature => {
      return {
        ...feature,
        properties: {
          ...feature.properties,
          centroidCoordinates: turf.centroid(feature).geometry.coordinates, //should get rid of turf and use d3 for the centroid
          dailyData: createMapFromArray(
            stateMap[feature.properties.STUSPS],
            'date',
          ),
        },
      }
    })
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
    joinedData = joinDataToGeoJson(geojson, stateData)
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

    const hedAndDek = d3.select('#state-map').append('div')
    const hed = hedAndDek.append('h3')
    const dek = hedAndDek.append('p')
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

    const r = d3
      .scaleSqrt()
      .domain([0, d3.max(joinedData.features, d => getValue(d))])
      .range([0, 50])
    const map = svg.append('g')
    const bubbles = svg.append('g')
    let useChloropleth = false

    updateMap()

    // .on('mouseleave', function() {
    //   tooltip.style('display', 'none')
    // })

    function updateMap() {
      const getColorFromFeature = d => {
        if (!useChloropleth) return 'white'
        const normalizationPopulation = 1000000 // 1 million;

        const normalizedValue = d.properties.dailyData[currentDate]
          ? d.properties.dailyData[currentDate][currentField] /
            (d.properties.population / normalizationPopulation)
          : 0
        return getColor(normalizedValue)
      }
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
          debugger
          const date = formatDate(parseDate(currentDate))
          const positive = getValue(d, 'positive')
          const totalTestResults = getValue(d, 'totalTestResults')
          const death = getValue(d, 'death')
          tooltip
            .style('display', 'block')
            .style('top', d3.event.layerY + 20 + 'px')
            .style('left', d3.event.layerX - 135 + 'px').html(`
              <strong>${d.properties.NAME}</strong> - ${date}
              <p>${formatNumber(death)} deaths</p>
              <p>${formatNumber(positive)} positive tests</p>
              <p>${formatNumber(totalTestResults)} total tests</p>
            `)
        })
        .on('mouseleave', d => tooltip.style('display', 'none'))
      drawCircles(useChloropleth)
    }

    function drawCircles(remove = false) {
      //todo: complete sum
      const totalOnDate = d3.sum(joinedData.features, getValue)

      hed.text(formatDate(parseDate(currentDate)))
      dek.text(`${formatNumber(totalOnDate)} across the country`)

      const circles = bubbles.selectAll('circle').data(joinedData.features)
      if (remove) {
        circles.remove()
      } else {
        circles
          .enter()
          .append('circle')
          .attr(
            'cx',
            d =>
              projection(d.properties.centroidCoordinates) &&
              projection(d.properties.centroidCoordinates)[0],
          )
          .attr(
            'cy',
            d =>
              projection(d.properties.centroidCoordinates) &&
              projection(d.properties.centroidCoordinates)[1],
          )
          .attr('stroke', '#585BC1')
          .attr('fill', '#585BC1')
          .attr('fill-opacity', 0.2)
          .style('pointer-events', 'none')
          .attr('r', d => {
            const value = getValue(d)
            return r(value)
          })

        circles
          .transition()
          .duration(200)
          .attr('r', d => {
            const value = getValue(d)
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

    chloroButton.on('change', () => {
      useChloropleth = chloroButton.property('checked')
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
