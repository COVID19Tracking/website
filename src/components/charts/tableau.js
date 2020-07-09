/* eslint-disable no-new */
import React, { useRef, useEffect } from 'react'
import classnames from 'classnames'
import tableauStyle from './tableau.module.scss'

export default ({ id, viewUrl, height, viewUrlMobile = false }) => {
  const chartRef = useRef(false)
  const mobileChartRef = useRef(false)

  useEffect(() => {
    const scriptElement = document.createElement('script')
    scriptElement.src =
      'https://public.tableau.com/javascripts/api/tableau-2.5.0.min.js'
    scriptElement.onload = () => {
      new window.tableau.Viz(chartRef.current, viewUrl, {
        width: '100%',
        height: `${height}px`,
      })
      if (viewUrlMobile && mobileChartRef) {
        new window.tableau.Viz(mobileChartRef.current, viewUrlMobile, {
          width: '100%',
          height: `${height}px`,
        })
      }
    }
    document.getElementsByTagName('head')[0].appendChild(scriptElement)
  }, [])

  return (
    <>
      <div
        className={classnames(
          tableauStyle.chart,
          viewUrlMobile && tableauStyle.hasMobileView,
        )}
        id={`chart-${id}`}
        ref={chartRef}
      />
      {viewUrlMobile && (
        <div
          className={classnames(tableauStyle.chart, tableauStyle.mobile)}
          id={`chart-mobile-${id}`}
          ref={mobileChartRef}
        />
      )}
    </>
  )
}
