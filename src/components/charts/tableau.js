/* eslint-disable no-new */
import React, { useRef, useEffect } from 'react'
import tableauStyle from './tableau.module.scss'

export default ({ id, viewUrl, height }) => {
  const chartRef = useRef(false)

  useEffect(() => {
    const scriptElement = document.createElement('script')
    scriptElement.src =
      'https://public.tableau.com/javascripts/api/tableau-2.5.0.min.js'
    scriptElement.onload = () => {
      new window.tableau.Viz(chartRef.current, viewUrl, {
        width: '100%',
        height: `${height}px`,
      })
    }
    document.getElementsByTagName('head')[0].appendChild(scriptElement)
  }, [])

  return (
    <div className={tableauStyle.chart} id={`chart-${id}`} ref={chartRef} />
  )
}
