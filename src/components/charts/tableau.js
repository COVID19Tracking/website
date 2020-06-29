/* eslint-disable no-new */
import React, { useRef, useEffect } from 'react'
import classnames from 'classnames'
import tableauStyle from './tableau.module.scss'

export default ({ id, height, embedCode }) => {
  const chartRef = useRef(false)
  const objectTag = embedCode.replace(/\n/g, '').match('<object(.*)</object>')

  useEffect(() => {
    const tableauObject = chartRef.current
      .getElementsByTagName('object')
      .item(0)
    const scriptElement = document.createElement('script')
    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js'
    tableauObject.parentNode.insertBefore(scriptElement, tableauObject)
    tableauObject.style.height = `${height}px`
  }, [])

  return (
    <div
      className={classnames(tableauStyle.chart, 'tableauPlaceholder')}
      id={`chart-${id}`}
      ref={chartRef}
      dangerouslySetInnerHTML={{ __html: objectTag[0] }}
    />
  )
}
