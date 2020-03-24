import React from 'react'
import {
  VisualizationWrapper,
  VisualizationLink,
} from '../components/common/visualization'

export default {
  title: 'Visualizations',
}

export const VisualizationWrapperStory = () => (
  <VisualizationWrapper>
    <p>Insert cool chart here</p>
  </VisualizationWrapper>
)

export const VisualizationLinkStory = () => (
  <p>
    <VisualizationLink href="https://covidtracking.com">
      View visualization
    </VisualizationLink>
  </p>
)
