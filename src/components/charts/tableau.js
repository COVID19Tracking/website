/* eslint-disable no-new */
import React, { useRef, useEffect } from 'react'
import classnames from 'classnames'
import tableauStyle from './tableau.module.scss'

const TableauCharts = ({
  id,
  viewUrl,
  height,
  mobileHeight = false,
  viewUrlMobile = false,
  className = false,
}) => {
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
          height: `${mobileHeight || height}px`,
        })
      }
    }
    document.getElementsByTagName('head')[0].appendChild(scriptElement)
  }, [])

  return (
    <>
      <div className={tableauStyle.warning}>
        A{' '}
        <a
          href="https://trust.tableau.com/incidents/pyxx725nky8s"
          target="_blank"
          rel="noreferrer noopen"
        >
          major outage at Tableau
        </a>{' '}
        may cause this chart to not load.
      </div>
      <div
        className={classnames(
          className,
          tableauStyle.chart,
          viewUrlMobile && tableauStyle.hasMobileView,
        )}
        id={`chart-${id}`}
        ref={chartRef}
      />
      {viewUrlMobile && (
        <div
          className={classnames(
            className,

            tableauStyle.chart,
            tableauStyle.mobile,
          )}
          id={`chart-mobile-${id}`}
          ref={mobileChartRef}
        />
      )}
    </>
  )
}

export default TableauCharts
