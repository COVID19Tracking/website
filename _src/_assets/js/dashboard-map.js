/* eslint-disable */

;(async function loadMap() {
  const button = d3.select('#map-start-stop')
  const slider = d3.select('#map-time-scrubber [type="range"]')
  const colorLimits = [5, 10, 25, 50, 100, 250, 500]
  const formatDate = d3.timeFormat('%A, %b. %d')
  const parseDate = d3.timeParse('%Y%m%d')

  Promise.all([
    d3.json('/_assets/json/states.json'),
    d3.json('https://covidtracking.com/api/states/daily'),
  ]).then(responses => {
    const geojson = responses[0]
    const groupedByDate = d3.nest()
    .key(function(d) { return d.date })
    .entries(responses[1])
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

    const hedAndDek =  d3.select('#state-map').append('div')
    const hed = hedAndDek.append('h3')
    const dek = hedAndDek.append('p')
    const svg = d3
      .select('#state-map')
      .append('svg')
      .attr('height', height)
      .attr('width', width)

    const r = d3
      .scaleLinear()
      .domain([0, d3.max(responses[1], d => d.positive + d.negative)])
      .range([0, 30])
    const map = svg.append('g')
    const bubbles = svg.append('g')

    map
      .selectAll('path')
      .data(geojson.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('stroke', '#ababab')
      .attr('fill', 'none')

    function drawDate (data) {
      const date = parseDate(data.key)
      const totalOnDate = d3.sum(data.values, function(d) { return d.positive })
      
      hed.text(formatDate(date))
      dek.text(`${d3.format(',')(totalOnDate)} across the country`)

      const circles = bubbles
        .selectAll('circle')
        .data(data.values, function(d) { return d.state })

      circles
        .enter()
        .append('circle')
        .attr('cx', d => {
          const match = geojson.features.filter(dd => {
            return d.state === dd.properties.STUSPS
          })[0]
          const point = path.centroid(match)

          return point[0]
        })
        .attr('cy', d => {
          const match = geojson.features.filter(dd => {
            return d.state === dd.properties.STUSPS
          })[0]
          const point = path.centroid(match)

          return point[1]
        })
        .attr('stroke', '#585BC1')
        .attr('fill', '#585BC1')
        .attr('fill-opacity', 0.2)
        .style('pointer-events', 'none')
        .attr('r', d => {
          const total = d.positive + d.negative

          return r(total)
        })

      circles.transition().duration(200).attr('r', d => {
        const total = d.positive + d.negative

        return r(total)
      })
    }

    let currentIndex = 0
    let interval = null

    function start() {
      interval = setInterval(function() {
        console.log({ currentIndex }, groupedByDate.length)
        if (currentIndex === groupedByDate.length) {
          currentIndex = 0
        }

        drawDate(groupedByDate[currentIndex])
        slider.property('value', currentIndex)
        currentIndex += 1
      }, 500)
    }

    function stop() {
      clearInterval(interval)
    }

    slider.property('value', currentIndex)
    drawDate(groupedByDate[currentIndex])

    button.on('change', function() {
      const isChecked = button.property('checked')

      if (isChecked) {
        start()
      } else {
        stop()
      }
    })

    slider.on('change', function() {
      const value = (currentIndex = +slider.property('value'))
      drawDate(groupedByDate[currentIndex])
    })
  })

  return
})()
