/* eslint-disable no-new */
import React, { useRef, useEffect } from 'react'
import classnames from 'classnames'
import DetailText from '~components/common/detail-text'
import tableuContentBlockStyle from './tableau-content-block.module.scss'

export default ({ id, height, embedCode, caption, fallbackImage }) => {
  const chartRef = useRef(false)
  const imageRef = useRef(false)
  const objectTag = embedCode.replace(/\n/g, '').match('<object(.*)</object>')

  useEffect(() => {
    const visualizationElement = chartRef.current
      .getElementsByTagName('object')
      .item(0)
    const scriptElement = document.createElement('script')
    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js'
    visualizationElement.parentNode.insertBefore(
      scriptElement,
      visualizationElement,
    )
    visualizationElement.style.height = `${height}px`
    imageRef.current.style.display = 'none'
  }, [])

  return (
    <>
      <div
        className={classnames(
          tableuContentBlockStyle.chart,
          'tableauPlaceholder',
        )}
        id={`chart-${id}`}
        ref={chartRef}
        dangerouslySetInnerHTML={{ __html: objectTag[0] }}
      />
      <img src={fallbackImage.fields.file['en-US'].url} alt="" ref={imageRef} />

      {caption && <DetailText>{caption}</DetailText>}
    </>
  )
}
