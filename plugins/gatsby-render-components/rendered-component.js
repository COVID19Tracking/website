import React from 'react'

let addToRenderQueue = () => undefined

export const setAddToRenderQueueCallback = callback => {
  addToRenderQueue = callback
}

const renderedComponent = Component => {
  return class extends React.Component {
    constructor(props) {
      super(props)
      const { renderOptions, ...passThroughProps } = props
      const { width, height, relativePath, filename } = renderOptions
      addToRenderQueue({
        Component,
        props: passThroughProps,
        width,
        height,
        relativePath,
        filename,
      })
    }

    render() {
      const { renderOptions, ...passThroughProps } = this.props
      return <Component {...passThroughProps} />
    }
  }
}

export default renderedComponent
