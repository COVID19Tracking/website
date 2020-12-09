/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useRef } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Form, Input } from '~components/common/form'
import { Row, Col } from '~components/common/grid'
import facilitiesMapStyles from './map.module.scss'

const FacilityDetails = ({ facility }) => (
  <>
    <h3>{facility.hospital_name}</h3>
    <address>
      <strong>
        {facility.address}
        <br />
        {facility.city}, {facility.state} {facility.zip}
      </strong>
    </address>
  </>
)

const HHSFacilitiesMap = ({ center, zoom, state = false }) => {
  const data = useStaticQuery(
    graphql`
      {
        site {
          siteMetadata {
            mapBoxToken
          }
        }
      }
    `,
  )
  mapboxgl.accessToken = data.site.siteMetadata.mapBoxToken
  const [activeFacility, setActiveFacility] = useState(false)
  const [query, setQuery] = useState(false)
  const [tooltip, setTooltip] = useState({ x: 0, y: 0 })
  const layers = ['HHS Facilities']
  if (typeof window === 'undefined') {
    return null
  }

  const mapNode = useRef(null)
  const mapRef = useRef(null)

  const selectFacility = event => {
    const bbox = [
      [event.point.x - 5, event.point.y - 5],
      [event.point.x + 5, event.point.y + 5],
    ]
    const features = mapRef.current.queryRenderedFeatures(bbox, {
      layers,
    })
    if (!features || !features.length) {
      setActiveFacility(false)
      return
    }
    setActiveFacility(features[0].properties)
    setTooltip(event.point)
  }

  useEffect(() => {
    const mapCenter = center
    const mapZoom = zoom

    // Token must be set before constructing map

    const map = new mapboxgl.Map({
      container: mapNode.current,
      style: `mapbox://styles/covidtrackingproject/ckihibso80hsg19o8q5gbq9z7`,
      center: mapCenter,
      zoom: mapZoom,
    })
    mapRef.current = map

    map.addControl(new mapboxgl.NavigationControl(), 'top-right')

    map.on('load', () => {
      if (state) {
        map.setFilter('HHS Facilities', ['==', ['get', 'state'], state])
      }
    })

    map.on('mousemove', event => {
      selectFacility(event)
    })

    map.on('click', event => {
      selectFacility(event)
    })

    return () => {
      map.remove()
    }
  }, [])

  return (
    <>
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
              )}.json?limit=1&access_token=${mapboxgl.accessToken}`,
            )
            .then(response => response.json())
            .then(response => {
              const feature = response.body.features.pop()
              mapRef.current.easeTo({
                center: feature.center,
                zoom: 7,
              })
            })
        }}
        noMargin
      >
        <Row>
          <Col width={[3, 3, 8]}>
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
          <Col width={[1, 3, 4]}>
            <button type="submit">Search</button>
          </Col>
        </Row>
      </Form>

      <p className={facilitiesMapStyles.legend}>
        Hospitals{' '}
        <span className={facilitiesMapStyles.shortage}>experiencing</span> and{' '}
        <span className={facilitiesMapStyles.noShortage}>not experiencing</span>{' '}
        an ICU shortage .
      </p>
      <div
        style={{
          position: 'relative',
          flex: ' 1 0 auto',
          width: '100%',
          height: '80vh',
        }}
      >
        {activeFacility && (
          <>
            <div
              className={facilitiesMapStyles.tooltip}
              style={{ left: tooltip.x - 150, top: tooltip.y + 15 }}
            >
              <FacilityDetails facility={activeFacility} />
            </div>
            <div
              className={facilitiesMapStyles.modal}
              aria-modal
              aria-label={activeFacility.hospital_name}
            >
              <div className={facilitiesMapStyles.content}>
                <button
                  type="button"
                  className={facilitiesMapStyles.close}
                  onClick={event => {
                    event.preventDefault()
                    setActiveFacility(false)
                  }}
                  aria-label="Close"
                >
                  &times;
                </button>
                <FacilityDetails facility={activeFacility} />
              </div>
            </div>
          </>
        )}
        <div ref={mapNode} style={{ width: '100%', height: '100%' }} />
      </div>
    </>
  )
}

export default HHSFacilitiesMap
