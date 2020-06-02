import React, { useEffect, useRef } from 'react'
import Helmet from 'react-helmet'
import SwaggerUI from 'swagger-ui'
import './swagger-sandbox.scss'
import spec from '../../../_api/v1/openapi.json'

const allowedTags = [
  'US Current and Historical Data',
  'States Current and Historical Data',
  'Status',
]

const allowedSchema = ['States', 'StatesInfo', 'Us', 'Status']

export default () => {
  const swaggerRef = useRef(null)
  Object.keys(spec.paths).forEach(path => {
    let show = false
    spec.paths[path].get.tags.forEach(tag => {
      if (allowedTags.indexOf(tag) > -1) {
        show = true
      }
    })
    if (!show) {
      delete spec.paths[path]
    }
  })

  Object.keys(spec.components.schemas).forEach(schema => {
    if (allowedSchema.indexOf(schema) === -1) {
      delete spec.components.schemas[schema]
    }
  })
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    SwaggerUI({
      domNode: swaggerRef.current,
      spec,
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
