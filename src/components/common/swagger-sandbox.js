import React from 'react'
import 'swagger-ui/dist/swagger-ui.css'
import './swagger-sandbox.scss'

class SwaggerSandbox extends React.Component {
  componentDidMount() {
    window.SwaggerUI({
      dom_id: '#swaggerWrapper',
      url: '/api-docs/COVID-tracking-endpoints-1.0-docs.json',
      defaultModelExpandDepth: 10,
      docExpansion: 'list',
    })
  }

  render() {
    return <div id="swaggerWrapper" />
  }
}

export default SwaggerSandbox
