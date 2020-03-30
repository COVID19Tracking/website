/* eslint-disable */

;(function loadAllCharts() {
  const formatDate = d3.timeFormat('%b. %e')
  const parseDate = d3.timeParse('%Y%m%d')
  const usDailyReq = d3.json('https://covidtracking.com/api/us/daily')
  const stateDailyReq = d3.json('https://covidtracking.com/api/states/daily')
  const usStatesReq = d3.json(`https://covidtracking.com/api/states`)

  const cdcDailyReq = d3.json(
    'https://spreadsheets.google.com/feeds/list/16gBHQ7dCJK1psqEMasmLKiFlzoNKcfNujVpmHLHldSY/od6/public/values?alt=json',
  )

  const totalColor = '#585BC1'
  const positiveColor = '#FFA270'

  // these come from this google spreadsheet owned by Júlia Ledur
  // https://docs.google.com/spreadsheets/d/1mD_NhlJR1fM2Pv_pY8YixUrX2p2F8rAE0xPTtsTJOiM/edit#gid=0
  const stayAtHomeOrders = {
    CA: 20200319,
    CT: 20200320,
    DE: 20200322,
    IL: 20200320,
    LA: 20200322,
    MI: 20200323,
    NJ: 20200321,
    NY: 20200320,
    OH: 20200322,
    OR: 20200323,
  }

  function calculateTotal(d) {
    return d.positive + (d.negative || 0)
  }

  function getStateName(abbr) {
    const names = {
      AK: 'Alaska',
      AL: 'Alabama',
      AR: 'Arkansas',
      AS: 'American Samoa',
      AZ: 'Arizona',
      CA: 'California',
      CO: 'Colorado',
      CT: 'Connecticut',
      DC: 'Washington, DC',
      DE: 'Delaware',
      FL: 'Florida',
      GA: 'Georgia',
      GU: 'Guam',
      HI: 'Hawaii',
      IA: 'Iowa',
      ID: 'Idaho',
      IL: 'Illinois',
      IN: 'Indiana',
      KS: 'Kansas',
      KY: 'Kentucky',
      LA: 'Louisiana',
      MA: 'Massachusets',
      MD: 'Maryland',
      ME: 'Maine',
      MI: 'Michigan',
      MN: 'Minnesota',
      MO: 'Missouri',
      MP: 'Marshall Islands',
      MS: 'Mississippi',
      MT: 'Montana',
      NC: 'North Carolina',
      ND: 'North Dakota',
      NE: 'Nebraska',
      NH: 'New Hampshire',
      NJ: 'New Jersey',
      NM: 'New Mexico',
      NV: 'Nevada',
      NY: 'New York',
      OH: 'Ohio',
      OK: 'Oklahoma',
      OR: 'Oregon',
      PA: 'Pennsylvania',
      PR: 'Puerto Rico',
      RI: 'Rhode Island',
      SC: 'South Carolina',
      SD: 'South Dakota',
      TN: 'Tennessee',
      TX: 'Texas',
      UT: 'Utah',
      VA: 'Virginia',
      VI: 'Virgin Islands',
      VT: 'Vermont',
      WA: 'Washington',
      WI: 'Wisconsin',
      WV: 'West Virginia',
      WY: 'Wyoming',
    }
    return names[abbr] || abbr
  }

  const transformCDCData = data => {
    const parseCdcDate = d3.timeParse('%Y %m/%d')
    const result = data.feed.entry.map(
      ({ gsx$datecollected, gsx$dailytotal }) => ({
        name: formatDate(parseCdcDate('2020 ' + gsx$datecollected.$t)),
        group: 'Tests',
        value: gsx$dailytotal.$t,
      }),
    )
    return result
  }

  function addCDCTestComparison(rawCtData, rawCdcData) {
    //cutting off the first 20 values
    const cutOff = 20
    const transformedCdcData = transformCDCData(rawCdcData)
    const cdcData = transformedCdcData.slice(cutOff)
    //fill with 0s & lop off the end so it's the same length as CDC data
    const ctData = [
      ...cdcData.slice(0, 46 - cutOff).map(e => ({ ...e, value: 0 })),
      ...rawCtData.map(d => ({
        name: formatDate(parseDate(d.date)),
        group: 'Tests',
        value: d.positiveIncrease + d.negativeIncrease,
      })),
    ].slice(0, cdcData.length)
    const cdcChartContainer = d3.select('#cdc-test-chart')
    const ctChartContainer = d3.select('#ct-test-chart')
    const yMax = d3.max(ctData, d => d.value)
    const cdcSpeciumSum = d3.sum(transformedCdcData, d => d.value)

    const ctTotalTestSum =
      rawCtData[rawCtData.length - 1].positive +
      rawCtData[rawCtData.length - 1].negative

    // below method ends up with slighly differetn number than last days test count so were going with that
    /*
const ctTotalTestSum = d3.sum(
rawCtData,
d => d.negativeIncrease + d.positiveIncrease,
)
*/

    d3.select('#cdc-specimen-count').text(d3.format(',')(cdcSpeciumSum))
    d3.select('#project-total-count').text(d3.format(',')(ctTotalTestSum))

    cdcChartContainer.append('h4').text('C.D.C.')
    cdcChartContainer
      .append('p')
      .attr('class', 'subtitle')
      .text('Specimens tested')
    ctChartContainer
      .append('h4')
      .style('padding-left', '3rem')
      .text(window.innerWidth < 500 ? 'CTP' : 'COVID Tracking Project')
    ctChartContainer
      .append('p')
      .style('padding-left', '3rem')
      .attr('class', 'subtitle')
      .text('People tested')

    cdcChartContainer.append(() =>
      d3BarChart({
        data: cdcData,
        yMax,
        fill: totalColor,
        formatDate,
        width: cdcChartContainer.node().clientWidth,
        height: cdcChartContainer.node().clientHeight - 20,
      }),
    )
    ctChartContainer.append(() =>
      d3BarChart({
        data: ctData,
        showYAxis: false,
        fill: totalColor,
        width: ctChartContainer.node().clientWidth,
        height: ctChartContainer.node().clientHeight - 20,
        margin: {
          top: 30,
          right: 10,
          bottom: 30,
          left: 20,
        },
      }),
    )
  }

  function addUsDailyPositiveAreaChart(data) {
    function fillFn(d) {
      if (d === 'Total') return totalColor
      return positiveColor
    }
    const margin = {
      left: 65,
      top: 10,
      right: 30,
      bottom: 20,
    }
    const transformedData = data
      .map(function(d) {
        const date = parseDate(d.date)
        return [
          {
            date: date,
            label: 'Total',
            value: calculateTotal(d),
          },
          {
            date: date,
            label: 'Positive',
            value: d.positive,
          },
        ]
      })
      .flat()
    const chart = d3.select('#chart-daily-positive-total .chart')
    const areaChart = d3AreaChart({
      data: transformedData,
      fill: fillFn,
      height: 400,
      labelOrder: ['Total', 'Positive'],
      margin,
      width: chart.node().clientWidth * 0.9,
      yMax: d3.max(transformedData, function(d) {
        return d.value
      }),
    })
    chart.node().appendChild(areaChart.svg)
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
    const hed = chartContainer.append('h2').classed('chart-hed', true)
    const legend = chartContainer.append('div').classed('chart-legend', true)
    const chart = chartContainer
      .append('div')
      .classed('chart', true)
      .classed('no-y-axis-domain', true)
    const source = chartContainer.append('div').classed('chart-api-note', true)
    const barChart = britecharts.bar()
    const legendChart = britecharts.legend()

    const width = chartContainer.node().clientWidth * 0.9

    barChart
      .margin({
        left: 60,
        right: 20,
        top: 20,
        bottom: 20,
      })
      .colorSchema([totalColor])
      .height(350)
      .width(width)
      .xAxisLabel('Date')

    legendChart
      .colorSchema([totalColor])
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
<p><a href="https://covidtracking.com/api/us/daily">Get this data from our API</a></p>
`)
  }

  function addUsStatesCurrentDeathBarChart(data) {
    const transformedData = data
      .map(function(d) {
        return {
          name: getStateName(d.state),
          value: d.death,
        }
      })
      .filter(d => d !== null)
      .sort(function(a, b) {
        return a.value - b.value
      })

    const chartContainer = d3.select('#chart-states-current-death-total')
    const hed = chartContainer.append('h3').classed('chart-hed', true)
    const legend = chartContainer.append('div').classed('chart-legend', true)
    const chart = chartContainer
      .append('div')
      .classed('chart', true)
      .classed('no-y-axis-domain', true)
    const source = chartContainer.append('div').classed('chart-api-note', true)
    const barChart = britecharts.bar()
    const legendChart = britecharts.legend()
    const width = chartContainer.node().clientWidth * 0.9

    barChart
      .margin({
        left: 140,
        right: 20,
        top: 20,
        bottom: 20,
      })
      .isHorizontal(true)
      .colorSchema([totalColor])
      .height(1000)
      .width(width)
      .xAxisLabel('Deaths')

    legendChart
      .colorSchema([totalColor])
      .height(50)
      .isHorizontal(true)
      .margin({
        left: 0,
      })

    hed.text('Total deaths by State')
    chart.datum(transformedData).call(barChart)
    legend
      .datum([
        {
          id: 1,
          name: 'Deaths',
        },
      ])
      .call(legendChart)
    source.html(`
<p><a href="https://covidtracking.com/api/states">Get this data from our API</a></p>
`)
  }

  function alterBriteChartStyles() {
    const ids = [
      '#chart-daily-positive-total',
      '#chart-daily-death-total',
      '#chart-states-current-death-total',
    ]

    ids.forEach(function(id) {
      const container = d3.select(id)

      // set up grid lines
      if (
        id === '#chart-daily-positive-total' ||
        id === '#chart-daily-death-total'
      ) {
        const tickSelector = id + ' .y-axis-group .tick'
        const chart = container.select('.chart-group')
        d3.selectAll(tickSelector).each(function(d) {
          const tick = d3.select(this)
          const line = tick.select('line')

          line.attr('x1', container.node().clientWidth * 0.78)
        })

        chart.raise()
      }

      // change circle legend indicators to squares

      const entries = container.selectAll('.legend-entry')

      entries.each(function(d) {
        const entry = d3.select(this)
        const circle = entry.select('.legend-circle')

        entry
          .append('rect')
          .attr('fill', circle.style('fill'))
          .attr('x', 0)
          .attr('y', -13)
          .attr('width', 16)
          .attr('height', 16)

        circle.remove()
      })
    })
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

    const margin = {
      left: 55,
      top: 5,
      right: 55,
      bottom: 40,
    }
    const chartHeight = 200
    const chartWidth = window.innerWidth > 320 ? 300 : 250

    const sortedGroupedByState = groupedByState.sort(function(a, b) {
      const lastA = a.values[0]
      const lastB = b.values[0]

      const lastATotal = calculateTotal(lastA)
      const lastBTotal = calculateTotal(lastB)
      return lastBTotal - lastATotal
    })

    const secondMaxTotal = d3.max(sortedGroupedByState[1].values, d =>
      calculateTotal(d),
    )

    const dateExtent = d3.extent(data, d => parseDate(d.date))
    // go through each state's data and add a chart
    sortedGroupedByState.forEach(function(state) {
      // because we're just charting two variables we make them here
      // we do this instead of creating two different area chart generators
      const data = []
      state.values.forEach(function(d) {
        const date = parseDate(d.date)

        data.push({
          date,
          label: 'Positive',
          value: d.positive,
        })

        data.push({
          date,
          label: 'Total',
          value: calculateTotal(d),
        })
      })

      // this will hold the chart
      const stateContainer = chartContainer
        .append('div')
        .classed('small-multiple-chart', true)
        .attr('data-state', state.key)
      const stateName = getStateName(state.key)
      const stateHed = stateContainer.append('h4')
      const svgContainer = stateContainer
        .append('div')
        .classed('chart', true)
        .classed('no-y-axis-domain', true)
      const stayAtHomeOrder = stayAtHomeOrders[state.key]
      const annotations = stayAtHomeOrder
        ? [{ date: parseDate(stayAtHomeOrder) }]
        : null
      const chart = d3AreaChart({
        annotations,
        data,
        fill: function(d) {
          if (d === 'Total') return totalColor
          return positiveColor
        },
        height: chartHeight,
        labelOrder: ['Total', 'Positive'],
        margin,
        xExtent: dateExtent,
        width: chartWidth,
        yMax: secondMaxTotal,
      })
      const stateLinkContainer = stateContainer
        .append('div')
        .classed('chart-state-link', true)

      stateHed.text(stateName)
      svgContainer.node().appendChild(chart.svg)
      stateLinkContainer
        .append('a')
        .attr(
          'href',
          '/data/state/' + stateName.toLowerCase().replace(/\s/g, '-'),
        )
        .text('See all data from state')

      const stateMax = d3.max(data, function(d) {
        return d.value
      })

      const stateMaxY = chart.yScale(stateMax)
      let stateChartHeight = chartHeight
      let transformTopValue = margin.top

      if (stateMaxY < 0) {
        stateChartHeight = chartHeight + Math.abs(stateMaxY)
        transformTopValue = Math.abs(stateMaxY)
        ;[
          '.chart-area-group',
          '.axis-group',
          '.chart-annotations-group',
        ].forEach(function(sel) {
          const el = d3.select(chart.svg).selectAll(sel)

          if (el.nodes().length === 0) return

          const currentTransform = el.attr('transform')
          const split = currentTransform.split('translate(')[1]
          const splitAgain = split.split(' ')
          const currentTranslateX = splitAgain[0]

          el.attr(
            'transform',
            'translate(' + currentTranslateX + ' ' + transformTopValue + ')',
          )
        })

        d3.select(chart.svg).style('top', -1 * (transformTopValue - 40) + 'px')
      }

      d3.select(chart.svg).attr('height', stateChartHeight)
    })
  }

  Promise.all([usDailyReq, stateDailyReq, cdcDailyReq, usStatesReq])
    .then(data => {
      const usDaily = data[0]
      const stateDaily = data[1]
      const cdcDailyTests = data[2]
      const states = data[3]

      const sortedUsDaily = usDaily.sort(function(a, b) {
        const aDate = parseDate(a.date)
        const bDate = parseDate(b.date)

        return aDate - bDate
      })
      addCDCTestComparison(sortedUsDaily, cdcDailyTests)
      addUsDailyPositiveAreaChart(sortedUsDaily)
      addUsDailyDeathBarChart(sortedUsDaily)
      addUsStatesCurrentDeathBarChart(states)
      addStateLevelSmallMultiples(stateDaily)
      setTimeout(function() {
        d3.selectAll('.chart-legend-positive-color').style(
          'background-color',
          positiveColor,
        )
        d3.selectAll('.chart-legend-total-color').style(
          'background-color',
          totalColor,
        )
        alterBriteChartStyles()
      }, 200)
    })
    .catch(err => {
      console.error({ err })
    })
})()
