import React, { useEffect, useRef } from 'react'
import 'swagger-ui/dist/swagger-ui.css'
import './swagger-sandbox.scss'
import SwaggerUI from 'swagger-ui'

const SwaggerSandbox = () => {
  const swaggerRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    SwaggerUI({
      domNode: swaggerRef.current,
      url: '/api-docs/COVID-tracking-endpoints-1.0-docs.json',
      defaultModelExpandDepth: 10,
      docExpansion: 'list',
    })
  }, [])

  return <div ref={swaggerRef} id="swaggerWrapper" />
}

export default SwaggerSandbox
