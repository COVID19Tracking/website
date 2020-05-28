import React, { useEffect, useRef } from 'react'
import Helmet from 'react-helmet'
import '~components/common/swagger-sandbox.scss'
import SwaggerUI from 'swagger-ui'

export default () => {
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

  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          type="text/css"
          href="/api-docs/swagger-ui.css"
        />
      </Helmet>
      <div ref={swaggerRef} id="swaggerWrapper" />
    </>
  )
}
