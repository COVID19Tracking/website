/* eslint-disable */

(function loadAllCharts() {
  const formatDate = d3.timeFormat('%b. %e')
  const parseDate = d3.timeParse('%Y%m%d')
  const usDailyReq = d3.json('https://covidtracking.com/api/us/daily')
  const stateDailyReq = d3.json('https://covidtracking.com/api/states/daily')

  function getStateName(abbr) {
    const names = {
      'AK': 'Alaska',
      'AL': 'Alabama',
      'AR': 'Arkansas',
      'AS': 'American Samoa',
      'AZ': 'Arizona',
      'CA': 'California',
      'CO': 'Colorado',
      'CT': 'Connecticut',
      'DC': 'Washington, DC',
      'DE': 'Delaware',
      'FL': 'Florida',
      'GA': 'Georgia',
      'GU': 'Guam',
      'HI': 'Hawaii',
      'IA': 'Iowa',
      'ID': 'Idaho',
      'IL': 'Illinois',
      'IN': 'Indiana',
      'KS': 'Kansas',
      'KY': 'Kentucky',
      'LA': 'Louisiana',
      'MA': 'Massachusets',
      'MD': 'Maryland',
      'ME': 'Maine',
      'MI': 'Michigan',
      'MN': 'Minnesota',
      'MO': 'Missouri',
      'MS': 'Mississippi',
      'MT': 'Montana',
      'NC': 'North Carolina',
      'ND': 'North Dakota',
      'NE': 'Nebraska',
      'NH': 'New Hampshire',
      'NJ': 'New Jersey',
      'NM': 'New Mexico',
      'NV': 'Nevada',
      'NY': 'New York',
      'OH': 'Ohio',
      'OK': 'Oklahoma',
      'OR': 'Oregon',
      'PA': 'Pennsylvania',
      'PR': 'Puerto Rico',
      'RI': 'Rhode Island',
      'SC': 'South Carolina',
      'SD': 'South Dakota',
      'TN': 'Tennessee',
      'TX': 'Texas',
      'UT': 'Utah',
      'VA': 'Virginia',
      'VT': 'Vermont',
      'WA': 'Washington',
      'WI': 'Wisconsin',
      'WV': 'West Virginia',
      'WY': 'Wyoming'
    }
    return names[abbr] || abbr
  }

  function addUsDailyPositiveBarChart(data) {
    const transformedData = data.map(function(d) {
      const date = parseDate(d.date)
      return [
        {
          name: formatDate(date),
          group: 'Positive',
          value: d.positive,
        },
        {
          name: formatDate(date),
          group: 'Total',
          value: d.total,
        },
      ]
    }).flat()

    const chartContainer = d3.select('#chart-daily-positive-total')
    const hed = chartContainer.append('h3').classed('chart-hed', true)
    const legend = chartContainer.append('div').classed('chart-legend', true)
    const chart = chartContainer.append('div')
      .classed('chart', true)
      .classed('no-y-axis-domain', true)
    const source = chartContainer.append('div').classed('chart-source', true)
    const barChart = britecharts.groupedBar()
    const legendChart = britecharts.legend()

    const width = chartContainer.node().clientWidth * 0.9

    barChart
      .margin({
        left: 90,
        right: 20,
        top: 20,
        bottom: 80,
      })
      .height(400)
      .width(width)
      .colorSchema(['#546D8E', 'orange'])

    legendChart
      .colorSchema(['orange', '#546D8E'])
      .height(50)
      .isHorizontal(true)
      .margin({
        left: 0,
      })

    chart.datum(transformedData).call(barChart)
    legend.datum([
      {
        id: 1,
        name: 'Positive tests',
      },
      {
        id: 2,
        name: 'Total tests',
      },
    ]).call(legendChart)

    hed.text('Positive tests and total tests per in the US')
    source.html(`
      <p><strong>Notes:</strong></p>
      <p>Source: <a href="https://covidtracking.com/api/us/daily">COVID Tracking Project</a></p>
    `)
  }

  function addUsDailyDeathBarChart(data) {
    const transformedData = data.map(function(d) {
      const date = parseDate(d.date)
      return {
        name: formatDate(date),
        value: d.death,
      }
    })

    const chartContainer = d3.select('#chart-daily-death-total')
    const hed = chartContainer.append('h3').classed('chart-hed', true)
    const legend = chartContainer.append('div').classed('chart-legend', true)
    const chart = chartContainer
      .append('div')
      .classed('chart', true)
      .classed('no-y-axis-domain', true)
    const source = chartContainer.append('div').classed('chart-source', true)
    const barChart = britecharts.bar()
    const legendChart = britecharts.legend()

    const width = chartContainer.node().clientWidth * 0.9

    barChart
      .margin({
        left: 60,
        right: 20,
        top: 20,
        bottom: 80,
      })
      .colorSchema(['#546D8E'])
      .highlightBarFunction(function(bar) {
        bar.attr('fill', 'orange')
      })
      .height(400)
      .width(width)
      .xAxisLabel('Date')

    legendChart
      .colorSchema(['#546D8E'])
      .height(50)
      .isHorizontal(true)
      .margin({
        left: 0,
      })

    legend
      .datum([
        {
          id: 1,
          name: 'Deaths',
        },
      ])
      .call(legendChart)

    hed.text('Total cumulative deaths by day in the US')
    chart.datum(transformedData).call(barChart)
    source.html(`
      <p><strong>Notes:</strong></p>
      <p>Source: <a href="https://covidtracking.com/api/us/daily">COVID Tracking Project</a></p>
    `)
  }

  function addStateLevelSmallMultiples(data) {
    const groupedByState = d3.nest()
      .key(function(d) { return d.state })
      .entries(data)

    console.log({ groupedByState })

    const chartContainer = d3.select('#chart-state-small-multiples')
    const totals = data
      .map(function(d) { return d.total })
      .sort(function(a, b) {
        return b - a
      })

    const dateExtent = d3.extent(data, function(d) {
      return parseDate(d.date)
    })

    const margin = {
      left: 52,
      top: 0,
      right: 50,
      bottom: 40,
    }
    const chartHeight = 200
    const chartWidth = 300
    const totalXMargin = margin.left + margin.right
    const totalYMargin = margin.top + margin.bottom
    const xScale = d3
      .scaleTime()
      .domain(dateExtent)
      .range([0, chartWidth - totalXMargin])
    const yScale = d3
      .scaleLinear()
      .domain([0, totals[3]])
      .range([chartHeight - totalYMargin, 0])

    const area = d3
      .area()
      .x(function(d) {
        return xScale(d.date)
      })
      .y0(function(d) {
        return yScale(d.value)
      })
      .y1(chartHeight - totalYMargin)

    groupedByState.forEach(function(state) {
      const data = state.values.map(function(d) {
        const date = parseDate(d.date)

        return Object.assign({}, d, { date: date })
      })

      const stateContainer = chartContainer
        .append('div')
        .attr('data-state', state.key)
      const stateName = getStateName(state.key)
      const stateHed = stateContainer.append('h3').text(stateName)
      const svgContainer = stateContainer
        .append('div')
        .classed('chart', true)
        .classed('no-y-axis-domain', true)
      const stateLinkContainer = stateContainer
        .append('div')
        .classed('chart-state-link', true)
      
      stateLinkContainer
        .append('a')
        .attr('href', '/data/state/' + stateName.toLowerCase().replace(/\s/g, '-'))
        .text('See all data from state')

      const svg = svgContainer.append('svg').attr('height', chartHeight)

      const positive = data.map(function(d) {
        return {
          date: d.date,
          value: d.positive,
        }
      })
      const total = data.map(function(d) {
        return {
          date: d.date,
          value: d.total
        }
      })
      
      // make a group to hold the axi (axises?)
      const axi = svg.append('g')
        .attr('transform', `translate(${margin.left} ${margin.top})`)
      // and a container for our gridlines
      const grid = axi.append('g')
        .classed('chart-grid', true)

      const xAxis = d3
        .axisBottom()
        .scale(xScale)
        .tickFormat(d3.timeFormat('%b. %e'))
        .ticks(3)
      const yAxis = d3
        .axisLeft()
        .scale(yScale)
        .ticks(6)
      const xAxisG = axi
        .append('g')
        .classed('axis x-axis', true)
        .attr('transform', 'translate(0 ' + (chartHeight - totalYMargin) + ')')
        .call(xAxis)
      const yAxisG = axi
        .append('g')
        .classed('axis y-axis', true)
        .call(yAxis)

      yAxisG.selectAll('.tick').each(function(d, i) {
        d3.select(this)
          .select('line')
          .style('display', 'none')

        grid
          .append('line')
          .attr('x1', 0)
          .attr('x2', chartWidth - totalXMargin)
          .attr('y1', yScale(d))
          .attr('y2', yScale(d))
          .attr('stroke', '#cccccc')
      })

      svg.append('g')
        .attr('transform', `translate(${margin.left} ${margin.top})`)
        .selectAll('path')
        .data([total, positive])
        .enter()
        .append('path')
          .attr('d', function(d) {
            return area(d)
          })
          .attr('opacity', .8)
          .attr('fill', function(d, i) {
            if (i === 0) return '#585BC1'
            return '#FFA270'
          })

    })
  }

  Promise.all([usDailyReq, stateDailyReq])
    .then(data => {
      const usDaily = data[0]
      const stateDaily = data[1]
      addUsDailyPositiveBarChart(usDaily)
      addUsDailyDeathBarChart(usDaily)
      addStateLevelSmallMultiples(stateDaily)
    })
    .catch(err => {
      console.error({ err })
    })
})()