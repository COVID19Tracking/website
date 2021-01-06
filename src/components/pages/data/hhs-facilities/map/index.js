/* eslint-disable no-underscore-dangle,max-len,jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import url from 'url'
import Container from '~components/common/container'
import { Form, Input } from '~components/common/form'
import { Row, Col } from '~components/common/grid'
import { Table, Th, Td } from '~components/common/table'
import FacilityDetails from '../facility-details'
import Legend from './legend'
import FieldValue from '../field-value'
import Infobox from './infobox'
import Definitions from '../definitions'
import stateCenters from '~data/visualization/state-centers.json'
import facilitiesMapStyles from './map.module.scss'
import 'mapbox-gl/dist/mapbox-gl.css'

const HHSFacilitiesMap = ({ center, zoom }) => {
  mapboxgl.accessToken = process.env.GATSBY_MAPBOX_API_TOKEN
  const [layer, setLayer] = useState('patients')
  const [activeFacility, setActiveFacility] = useState(false)
  const [query, setQuery] = useState(false)
  const [facilities, setFacilities] = useState(false)
  const [tooltip, setTooltip] = useState({ x: 0, y: 0 })
  const [highlightedFacility, setHighlightedFacility] = useState(false)
  const [revealedFacility, setRevealedFacility] = useState(false)
  const [currentZoom, setCurrentZoom] = useState(0)
  const [highlighedMarker, setHighlightedMarker] = useState(false)
  const layers = {
    patients: ['hospitals', 'hospitals-not-reported'],
    icu: ['icu', 'icu-not-reported'],
  }

  const mapNode = useRef(null)
  const mapRef = useRef(null)

  const selectFacility = (event, show) => {
    const bbox = [
      [event.point.x - 5, event.point.y - 5],
      [event.point.x + 5, event.point.y + 5],
    ]
    const features = mapRef.current.queryRenderedFeatures(bbox, {
      layers: [...layers.patients, ...layers.icu],
    })
    if (!features || !features.length) {
      setActiveFacility(false)
      return
    }
    setActiveFacility(features[0].properties)
    setTooltip(event.point)
    if (show) {
      setRevealedFacility(true)
    }
  }

  const mapBoundChanged = event => {
    if (typeof window !== 'undefined') {
      window.location.hash = [
        ...event.target.getCenter().toArray(),
        event.target.getZoom(),
      ].join(',')
    }
    setCurrentZoom(event.target.getZoom())
    if (event.target.getZoom() < 6) {
      setFacilities(false)
      return
    }
    const features = mapRef.current.queryRenderedFeatures({
      layers: [...layers.patients, ...layers.icu],
    })
    setFacilities(
      features.sort((a, b) =>
        a.properties.hospital_name > b.properties.hospital_name ? 1 : -1,
      ),
    )
  }

  useEffect(() => {
    if (!highlightedFacility || !highlightedFacility.geometry) {
      return
    }
    if (highlighedMarker) {
      highlighedMarker.remove()
    }
    const { coordinates } = highlightedFacility.geometry
    const marker = new mapboxgl.Marker()
      .setLngLat(coordinates)
      .addTo(mapRef.current)
    setHighlightedMarker(marker)
  }, [highlightedFacility])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        setRevealedFacility(false)
      }
    })
    const pageUrl = url.parse(window.location.href, true)
    const hash = pageUrl.hash ? pageUrl.hash.replace('#', '').split(',') : []
    const { state } = pageUrl.query
    const mapCenter = (() => {
      if (hash.length) {
        return [hash[0], hash[1]]
      }
      if (state) {
        const stateCenter = stateCenters.find(
          stateCenterItem => stateCenterItem.state === state,
        )
        if (stateCenter) {
          return [stateCenter.lon, stateCenter.lat]
        }
      }
      return center
    })()
    const mapZoom = (() => {
      if (hash.length > 2) {
        return hash[2]
      }
      if (state) {
        const stateCenter = stateCenters.find(
          stateCenterItem => stateCenterItem.state === state,
        )
        if (stateCenter) {
          return stateCenter.zoom
        }
      }
      return zoom
    })()
    const map = new mapboxgl.Map({
      container: mapNode.current,
      style: `mapbox://styles/covidtrackingproject/ckihibso80hsg19o8q5gbq9z7`,
      center: mapCenter,
      zoom: mapZoom,
      minZoom: 3.5,
      maxZoom: 18,
    })

    map.addControl(new mapboxgl.NavigationControl(), 'top-left')

    map.on('load', () => {
      if (window.location.hash && hash.length > 2) {
        const features = map.queryRenderedFeatures({
          layers: [...layers.patients, ...layers.icu],
        })
        setFacilities(
          features.sort((a, b) =>
            a.properties.hospital_name > b.properties.hospital_name ? 1 : -1,
          ),
        )
        if (hash.length === 4 && hash[3].search('id:') > -1) {
          const id = hash[3].replace('id:', '')
          const linkedFeature = features.find(
            feature => feature.properties.hospital_pk === id,
          )
          if (linkedFeature) {
            setActiveFacility({ ...linkedFeature.properties })
            setRevealedFacility(true)
          }
        }
      }
    })

    map.on('moveend', event => {
      mapBoundChanged(event)
    })

    map.on('dragend', event => {
      mapBoundChanged(event)
    })

    map.on('zoomend', event => {
      mapBoundChanged(event)
    })

    map.on('mousemove', event => {
      selectFacility(event)
    })

    map.on('click', event => {
      selectFacility(event, true)
    })

    mapRef.current = map
  }, [])

  useEffect(() => {
    if (!mapRef.current || !mapRef.current.isStyleLoaded()) {
      return
    }
    Object.keys(layers).forEach(key => {
      layers[key].forEach(subLayer => {
        mapRef.current.setLayoutProperty(
          subLayer,
          'visibility',
          layer === key ? 'visible' : 'none',
        )
      })
    })
  }, [layer])

  return (
    <>
      <Legend mapLayer={layer} setLayer={newLayer => setLayer(newLayer)} />
      <div className={facilitiesMapStyles.container} aria-hidden>
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
                    zoom: 11,
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
                <Th>
                  7-day average COVID {layer === 'icu' && <>ICU</>} patients
                </Th>
              </tr>
            </thead>
          </Table>
          {facilities && facilities.length > 0 ? (
            <div className={facilitiesMapStyles.tableScroll}>
              <Table>
                <thead className="a11y-only">
                  <tr>
                    <Th alignLeft>Name</Th>
                    <Th>
                      7-day average COVID {layer === 'icu' && <>ICU</>} patients
                    </Th>
                  </tr>
                </thead>
                <tbody>
                  {facilities.map(facility => (
                    <tr
                      onMouseEnter={() => {
                        setHighlightedFacility(facility)
                      }}
                      onMouseLeave={() => {
                        setHighlightedFacility(false)
                      }}
                      onFocus={() => {
                        setHighlightedFacility(facility)
                      }}
                      onBlur={() => {
                        setHighlightedFacility(false)
                      }}
                    >
                      <Td alignLeft>
                        <button
                          type="button"
                          onClick={event => {
                            event.preventDefault()
                            setActiveFacility({ ...facility.properties })
                            setRevealedFacility(true)
                          }}
                        >
                          {facility.properties.hospital_name}
                        </button>
                      </Td>
                      <Td>
                        {layer === 'patients' && (
                          <FieldValue
                            field={
                              facility.properties
                                .total_adult_patients_hospitalized_confirmed_and_suspected_covid_7_day_avg
                            }
                          />
                        )}

                        {layer === 'icu' && (
                          <FieldValue
                            field={
                              facility.properties
                                .staffed_icu_adult_patients_confirmed_and_suspected_covid_7_day_avg
                            }
                          />
                        )}
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <p>
              {currentZoom < 6 ? (
                <>Zoom in to get facility details.</>
              ) : (
                <>No facilities in the current map.</>
              )}
            </p>
          )}
        </div>
        <div className={facilitiesMapStyles.mapWrapper} role="img">
          <div className={facilitiesMapStyles.mapInset}>
            {revealedFacility && (
              <>
                <div
                  role="dialog"
                  className={facilitiesMapStyles.facilityCardOverlay}
                  onClick={() => setRevealedFacility(false)}
                />
                <div className={facilitiesMapStyles.facilityCard} role="dialog">
                  <button
                    className={facilitiesMapStyles.close}
                    type="button"
                    onClick={event => {
                      event.preventDefault()
                      setRevealedFacility(false)
                    }}
                  >
                    &times;
                  </button>
                  <FacilityDetails facility={activeFacility} />
                </div>
              </>
            )}

            {activeFacility && (
              <Infobox
                layer={layer}
                facility={activeFacility}
                x={tooltip.x}
                y={tooltip.y}
              />
            )}
            <div
              ref={mapNode}
              className={facilitiesMapStyles.map}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </div>
      <Container>
        <Definitions />
      </Container>
    </>
  )
}

export default HHSFacilitiesMap
