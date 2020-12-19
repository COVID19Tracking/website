/* eslint-disable no-underscore-dangle, max-len */
import React, { useEffect, useState, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Form, Input } from '~components/common/form'
import { Row, Col } from '~components/common/grid'
import { Table, Th, Td } from '~components/common/table'
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
  mapboxgl.accessToken = process.env.GATSBY_MAPBOX_API_TOKEN
  const [activeFacility, setActiveFacility] = useState(false)
  const [query, setQuery] = useState(false)
  const [facilities, setFacilities] = useState(false)
  const [tooltip, setTooltip] = useState({ x: 0, y: 0 })
  const layers = ['Hospitals', 'Null hospitals']
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

  const getFacilitiesInBoundBox = event => {
    if (event.target.getZoom() < 4) {
      setFacilities(false)
      return
    }
    const features = mapRef.current.queryRenderedFeatures({
      layers,
    })
    setFacilities(features.map(({ properties }) => properties))
  }

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapNode.current,
      style: `mapbox://styles/covidtrackingproject/ckihibso80hsg19o8q5gbq9z7`,
      center,
      zoom,
    })

    map.addControl(new mapboxgl.NavigationControl(), 'top-right')

    map.on('load', () => {
      if (state) {
        layers.forEach(layer => {
          map.setFilter(layer, ['==', ['get', 'state'], state])
        })
      }
    })

    map.on('moveend', event => {
      getFacilitiesInBoundBox(event)
    })

    map.on('dragend', event => {
      getFacilitiesInBoundBox(event)
    })

    map.on('zoomend', event => {
      getFacilitiesInBoundBox(event)
    })

    map.on('mousemove', event => {
      selectFacility(event)
    })

    map.on('click', event => {
      selectFacility(event)
    })

    mapRef.current = map
    return () => {
      map.remove()
    }
  }, [])

  return (
    <div className={facilitiesMapStyles.container}>
      <div className={facilitiesMapStyles.sidebar}>
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
                mapRef.current.easeTo({
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
              <button
                type="submit"
                className={facilitiesMapStyles.searchButton}
              >
                Search
              </button>
            </Col>
          </Row>
        </Form>
        <Table ariaHidden>
          <thead>
            <tr>
              <Th alignLeft>Name</Th>
              <Th>7-day average COVID patients</Th>
            </tr>
          </thead>
        </Table>
        {facilities && (
          <div className={facilitiesMapStyles.tableScroll}>
            <Table>
              <thead className="a11y-only">
                <tr>
                  <Th alignLeft>Name</Th>
                  <Th alignLeft>COVID patients</Th>
                </tr>
              </thead>
              <tbody>
                {facilities.map(facility => (
                  <tr>
                    <Td alignLeft>{facility.hospital_name}</Td>
                    <Td alignLeft>
                      {facility.total_adult_patients_hospitalized_confirmed_and_suspected_covid_7_day_avg >
                      0
                        ? facility.total_adult_patients_hospitalized_confirmed_and_suspected_covid_7_day_avg
                        : 'N/A'}
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>
      <div className={facilitiesMapStyles.mapWrapper} role="img">
        <div className={facilitiesMapStyles.mapInset}>
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
          <div
            ref={mapNode}
            className={facilitiesMapStyles.map}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
    </div>
  )
}

export default HHSFacilitiesMap
