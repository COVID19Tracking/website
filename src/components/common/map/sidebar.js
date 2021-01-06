import React, { useState } from 'react'
import { Form, Input } from '~components/common/form'
import { Row, Col } from '~components/common/grid'
import sidebarStyle from './sidebar.module.scss'

const Sidebar = ({ children, map }) => {
  const [query, setQuery] = useState(false)

  return (
    <div className={sidebarStyle.sidebar}>
      <Form
        onSubmit={event => {
          event.preventDefault()
          if (
            typeof window === 'undefined' ||
            typeof window.fetch === 'undefined'
          ) {
            return
          }
          window
            .fetch(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                query,
              )}.json?limit=1&access_token=${
                process.env.GATSBY_MAPBOX_API_TOKEN
              }`,
            )
            .then(response => response.json())
            .then(response => {
              if (response.features.length === 0) {
                return
              }
              const feature = response.features.pop()
              map.easeTo({
                center: feature.center,
                zoom: 7,
              })
            })
        }}
        noMargin
      >
        <Row>
          <Col width={[4, 6, 8]}>
            <Input
              type="text"
              label="Search facilities"
              placeholder="Enter a city or zip code"
              hideLabel
              onChange={event => {
                setQuery(event.target.value)
              }}
            />
          </Col>
          <Col width={[4, 6, 4]} paddingLeft={[0, 0, 8]}>
            <button type="submit" className={sidebarStyle.searchButton}>
              Search
            </button>
          </Col>
        </Row>
      </Form>
      {children}
    </div>
  )
}

export default Sidebar
