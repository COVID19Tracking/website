/* eslint-disable */

(function loadAllCharts() {
  const formatDate = d3.timeFormat('%b. %e')
  const parseDate = d3.timeParse('%Y%m%d')
  const usDailyReq = d3.json('https://covidtracking.com/api/us/daily')
  const stateDailyReq = d3.json('https://covidtracking.com/api/states/daily')

  const totalColor = '#585BC1'
  const positiveColor = '#FFA270'

  function calculateTotal(d) {
    return d.positive + (d.negative || 0)
  }

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
      'MP': 'Marshall Islands',
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
      'VI': 'Virgin Islands',
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
          value: calculateTotal(d),
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
      .colorSchema([positiveColor, totalColor])

    legendChart
      .colorSchema([positiveColor, totalColor])
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
    // the data we fetched is all the states in one array
    // instead we need to group the data by state
    const groupedByState = d3
      .nest()
      .key(function(d) {
        return d.state
      })
      .entries(data)

    // this is where everything's gonna land!
    const chartContainer = d3.select('#chart-state-small-multiples div')

    // we need to go through the data and figure out the maximum
    // numbers that we're dealing with here
    const totals = data.map(function(d) {
        return calculateTotal(d)
      })
      .sort(function(a, b) {
        return b - a
      })

    const dateExtent = d3.extent(data, function(d) {
      return parseDate(d.date)
    })

    const margin = {
      left: 52,
      top: 0,
      right: 55,
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
      .domain([0, totals[3]]) // don't use the greatest, it throws off all the other charts
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

    d3.select('#small-multiples-positive-span').style(
      'background-color',
      positiveColor,
    )
    d3.select('#small-multiples-total-span').style(
      'background-color',
      totalColor,
    )

    const sortedGroupedByState = groupedByState.sort(function(a, b) {
      const lastA = a.values[0]
      const lastB = b.values[0]

      const lastATotal = calculateTotal(lastA)
      const lastBTotal = calculateTotal(lastB)
      return lastBTotal - lastATotal
    })

    // go through each state's data and add a chart
    sortedGroupedByState.forEach(function(state) {
      // because we're just charting two variables we make them here
      // we do this instead of creating two different area chart generators
      const positive = state.values.map(function(d) {
        return {
          date: parseDate(d.date),
          value: d.positive,
        }
      })
      const total = state.values.map(function(d) {
        return {
          date: parseDate(d.date),
          value: calculateTotal(d),
        }
      })

      // this will hold the chart
      const stateContainer = chartContainer
        .append('div')
        .classed('small-multiple-chart', true)
        .attr('data-state', state.key)
      const stateName = getStateName(state.key)
      const stateHed = stateContainer.append('h3').text(stateName)
      const svgContainer = stateContainer
        .append('div')
        .classed('chart', true)
        .classed('no-y-axis-domain', true)
      const svg = svgContainer.append('svg')
      const stateLinkContainer = stateContainer
        .append('div')
        .classed('chart-state-link', true)

      stateLinkContainer
        .append('a')
        .attr(
          'href',
          '/data/state/' + stateName.toLowerCase().replace(/\s/g, '-'),
        )
        .text('See all data from state')

      const stateMax = d3.max(total, function(d) {
        return d.value
      })

      const stateMaxY = yScale(stateMax)
      let stateChartHeight = chartHeight
      let transformTopValue = margin.top

      if (stateMaxY < 0) {
        stateChartHeight = chartHeight + Math.abs(stateMaxY)
        transformTopValue = Math.abs(stateMaxY)
        svg.attr('transform', 'translateY(' + stateMaxY + ')')
      }

      svg.attr('height', stateChartHeight)

      console.log({ state, stateMaxY })

      // make a group to hold the axi (axises?)
      const axi = svg
        .append('g')
        .attr('transform', `translate(${margin.left} ${transformTopValue})`)
      // and a container for our gridlines
      const grid = axi.append('g').classed('chart-grid', true)

      const xAxis = d3
        .axisBottom()
        .scale(xScale)
        .tickFormat(d3.timeFormat('%b. %e'))
        .ticks(3)
      const yAxis = d3
        .axisLeft()
        .scale(yScale)
        .ticks(4)
      const xAxisG = axi
        .append('g')
        .classed('axis x-axis', true)
        .attr('transform', 'translate(0 ' + (chartHeight - totalYMargin) + ')')
        .call(xAxis)
      const yAxisG = axi
        .append('g')
        .classed('axis y-axis', true)
        .call(yAxis)

      // go through, get the Y axis ticks and add gridlines for them
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

      // actually add the areas to the chart!
      svg
        .append('g')
        .attr('transform', `translate(${margin.left} ${transformTopValue})`)
        .selectAll('path')
        .data([total, positive])
        .enter()
        .append('path')
        .attr('d', function(d) {
          return area(d)
        })
        .attr('opacity', 0.8)
        .attr('fill', function(d, i) {
          if (i === 0) return totalColor
          return positiveColor
        })
    })
  }

  Promise.all([usDailyReq, stateDailyReq])
    .then(data => {
      const usDaily = data[0]
      const stateDaily = data[1]

      const sortedUsDaily = usDaily.sort(function(a, b) {
        const aDate = parseDate(a.date)
        const bDate = parseDate(b.date)

        return aDate - bDate
      })

      addUsDailyPositiveBarChart(sortedUsDaily)
      addUsDailyDeathBarChart(sortedUsDaily)
      addStateLevelSmallMultiples(stateDaily)
    })
    .catch(err => {
      console.error({ err })
    })
})()