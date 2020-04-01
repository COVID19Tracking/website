import React from 'react'
import '../../scss/components/common/visualization.scss'

const VisualizationWrapper = ({ children }) => (
  <div className="visualization-wrapper">{children}</div>
)

const VisualizationLink = ({ href, children }) => (
  <a href={href} className="visualization-link" target="_blank">
    {children}
  </a>
)

export { VisualizationWrapper, VisualizationLink }
