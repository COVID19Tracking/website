import React, { createContext, useContext } from 'react'

const MetricContext = createContext()

const SvgFilters = () => {
  const { metric } = useContext(MetricContext)
  return (
    <svg aria-hidden className="a11y-only" width={0} height={0}>
      <filter id={`dropshadow-${metric}`}>
        <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
        <feOffset dx="0" dy="0" result="offsetblur" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.3" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id={`dropshadow-large-${metric}`}>
        <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
        <feOffset dx="0" dy="0" result="offsetblur" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.8" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </svg>
  )
}

export { MetricContext, SvgFilters }
