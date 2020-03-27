import React from 'react'
import {
  VisualizationWrapper,
  VisualizationLink,
} from '../components/common/visualization'

export default {
  title: 'Visualizations',
}

export const visualizationWrapper = () => (
  <VisualizationWrapper>
    <p>Insert cool chart here</p>
  </VisualizationWrapper>
)

export const linkToVisualization = () => (
  <p>
    <VisualizationLink href="https://covidtracking.com">
      View visualization
    </VisualizationLink>
  </p>
)
