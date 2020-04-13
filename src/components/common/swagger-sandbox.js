import React from 'react'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import './swagger-sandbox.scss'

export default () => (
  <SwaggerUI
    defaultModelExpandDepth={10}
    docExpansion="list"
    url="/api-docs/COVID-tracking-endpoints-1.0-docs.json"
  />
)
