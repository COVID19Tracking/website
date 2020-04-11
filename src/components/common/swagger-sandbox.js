import React from 'react'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

export default () => (
  <SwaggerUI
    defaultModelExpandDepth={10}
    docExpansion="list"
    url="https://api.swaggerhub.com/apis/janelastname/COVID-endpoints/1.0/swagger.json"
  />
)
