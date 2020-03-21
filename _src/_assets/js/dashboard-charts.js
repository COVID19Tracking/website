/* eslint-disable */

(function loadAllCharts() {
  const formatDate = d3.timeFormat('%b. %e')
  const parseDate = d3.timeParse('%Y%m%d')
  const usDailyReq = d3.json(`https://covidtracking.com/api/us/daily`)

  function addUsDailyPositiveBarChart(data) {
    const transformedData = data.map(function(d) {
      const date = parseDate(d.date)
      return {
        name: formatDate(date),
        value: d.positive,
      }
    })

    const chartContainer = d3.select('#chart-daily-positive-total')
    const hed = chartContainer.append('h3').classed('chart-hed', true)
    const chart = chartContainer.append('div').classed('chart', true)
    const source = chartContainer.append('div').classed('chart-source', true)
    const barChart = britecharts.bar()

    barChart
      .margin({
        left: 60,
        right: 20,
        top: 20,
        bottom: 60,
      })
      .height(400)
      .width(600)
      .colorSchema(['#546D8E'])
      .highlightBarFunction(function(bar) {
        bar.attr('fill', 'orange')
      })
      .xAxisLabel('Date')

    chart.datum(transformedData).call(barChart)

    hed.text('Positive cases to date')
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

    console.log({ transformedData  })

    const chartContainer = d3.select('#chart-daily-death-total')
    const hed = chartContainer.append('h3').classed('chart-hed', true)
    const chart = chartContainer.append('div').classed('chart', true)
    const source = chartContainer.append('div').classed('chart-source', true)
    const barChart = britecharts.bar()

    barChart
      .margin({
        left: 60,
        right: 20,
        top: 20,
        bottom: 60,
      })
      .colorSchema(['#546D8E'])
      .highlightBarFunction(function(bar) {
        bar.attr('fill', 'orange')
      })
      .height(400)
      .width(600)
      .xAxisLabel('Date')

    hed.text('Total deaths to date')
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