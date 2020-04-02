/*
  data should look like this, we'll group by "label"
  [
    {
      date: <Date>,
      label: <String>,
      value: <Number>,
    }
  ]
*/

function d3AreaChart({
  annotations = [],
  data,
  fill,
  height,
  labelOrder = null,
  margin = {
    left: 55,
    top: 10,
    right: 55,
    bottom: 40,
  },
  xExtent = null,
  width,
  yMax = null,
}) {
  const grouped = d3
    .nest()
    .key(function(d) {
      return d.label
    })
    .entries(data)

  const sorted = !labelOrder
    ? grouped
    : labelOrder.map(function(label) {
        const match = grouped.filter(function(d) {
          return d.key === label
        })[0]
        return match
      })

  const dateExtent =
    xExtent ||
    d3.extent(data, function(d) {
      return d.date
    })

  const valueMax = d3.max(data, function(d) {
    return d.value
  })

  const totalXMargin = margin.left + margin.right
  const totalYMargin = margin.top + margin.bottom
  const fillArgument =
    typeof fill === 'string'
      ? fill
      : function(d) {
          return fill(d.key)
        }
  const xScale = d3
    .scaleTime()
    .domain(dateExtent)
    .range([0, width - totalXMargin])
  const yScale = d3
    .scaleLinear()
    .domain([0, yMax || valueMax]) // don't use the greatest, it throws off all the other charts
    .range([height - totalYMargin, 0])

  const area = d3
    .area()
    .x(function(d) {
      return xScale(d.date)
    })
    .y0(function(d) {
      return yScale(d.value)
    })
    .y1(height - totalYMargin)

  const svgElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg',
  )
  const svg = d3.select(svgElement)

  svg.attr('height', height).attr('width', width)

  // make a group to hold the axi (axises?)
  const axi = svg
    .append('g')
    .classed('axis-group', true)
    .attr('transform', `translate(${margin.left} ${margin.top})`)
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
    .tickFormat(function(d){
      if(d/1000000 < 1){
        return d/1000000;
      } else {
        return d/1000000 + " Million";
      }
    })
  const xAxisG = axi
    .append('g')
    .classed('axis x-axis', true)
    .attr('transform', 'translate(0 ' + (height - totalYMargin) + ')')
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
      .attr('x2', width - totalXMargin)
      .attr('y1', yScale(d))
      .attr('y2', yScale(d))
      .attr('stroke', '#cccccc')
  })

  // actually add the areas to the chart!
  svg
    .append('g')
    .classed('chart-area-group', true)
    .attr('transform', `translate(${margin.left} ${margin.top})`)
    .selectAll('path')
    .data(sorted)
    .enter()
    .append('path')
    .attr('d', function(d) {
      return area(d.values)
    })
    .attr('opacity', 0.9)
    .attr('fill', fillArgument)

  if (annotations && annotations.length) {
    svg
      .append('g')
      .classed('chart-annotations-group', true)
      .attr('transform', `translate(${margin.left} ${margin.top})`)
      .selectAll('line')
      .data(annotations)
      .enter()
      .append('line')
      .attr('x1', d => xScale(d.date))
      .attr('x2', d => xScale(d.date))
      .attr('y1', 0)
      .attr('y2', height - margin.top - margin.bottom)
      .attr('stroke', 'black')
      .attr('stroke-width', '1px')
  }

  return {
    svg: svg.node(),
    yScale: yScale,
  }
}
