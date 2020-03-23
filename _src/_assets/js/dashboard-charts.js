/* eslint-disable */

(function loadAllCharts() {
  const formatDate = d3.timeFormat('%b. %e')
  const parseDate = d3.timeParse('%Y%m%d')
  const usDailyReq = d3.json(`https://covidtracking.com/api/us/daily`)

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

  Promise.all([usDailyReq]).then(data => {
    console.log({ data })
    const usDaily = data[0]
    addUsDailyPositiveBarChart(usDaily)
    addUsDailyDeathBarChart(usDaily)

  }).catch(err => {
    console.error({ err })
  })
})()