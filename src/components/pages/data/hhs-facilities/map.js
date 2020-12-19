/* eslint-disable no-underscore-dangle,max-len,jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Form, Input } from '~components/common/form'
import { Row, Col } from '~components/common/grid'
import { Table, Th, Td } from '~components/common/table'
import facilitiesMapStyles from './map.module.scss'

const fields = [
  'total_adult_patients_hospitalized_confirmed_and_suspected_covid_7_day_avg',
  'staffed_icu_adult_patients_confirmed_and_suspected_covid_7_day_avg',
  'adult_inpatient_beds_occupancy_all',
  'adult_icu_beds_occupancy_all',
  'adult_inpatient_beds_occupancy_covid',
  'adult_icu_beds_occupancy_covid',
  'mean_coverage',
]

const FacilityDetails = ({ facility }) => (
  <>
    <h3>{facility.hospital_name}</h3>
  </>
)

const HHSFacilitiesMap = ({ center, zoom, state = false }) => {
  mapboxgl.accessToken = process.env.GATSBY_MAPBOX_API_TOKEN
  const [activeFacility, setActiveFacility] = useState(false)
  const [query, setQuery] = useState(false)
  const [facilities, setFacilities] = useState(false)
  const [tooltip, setTooltip] = useState({ x: 0, y: 0 })
  const [highlightedFacility, setHighlightedFacility] = useState(false)
  const [revealedFacility, setRevealedFacility] = useState(false)
  const layers = ['Hospitals', 'Null hospitals']

  const mapNode = useRef(null)
  const mapRef = useRef(null)

  const selectFacility = (event, show) => {
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
    if (event.target.getZoom() < 4) {
      setFacilities(false)
      return
    }
    const features = mapRef.current.queryRenderedFeatures({
      layers,
    })
    setFacilities(
      features.sort((a, b) =>
        a.properties.hospital_name > b.properties.hospital_name ? 1 : -1,
      ),
    )
  }

  useEffect(() => {
    if (!revealedFacility) {
      return
    }
    window.location.hash += `|id:${activeFacility.hospital_pk}`
  }, [revealedFacility])

  useEffect(() => {
    console.log(highlightedFacility)
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
    const map = new mapboxgl.Map({
      container: mapNode.current,
      style: `mapbox://styles/covidtrackingproject/ckihibso80hsg19o8q5gbq9z7`,
      center,
      zoom,
    })

    map.addControl(new mapboxgl.NavigationControl(), 'top-left')

    map.on('load', () => {
      if (state) {
        layers.forEach(layer => {
          map.setFilter(layer, ['==', ['get', 'state'], state])
        })
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
                  <Th>7-day average COVID patients</Th>
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
                      {facility.properties
                        .total_adult_patients_hospitalized_confirmed_and_suspected_covid_7_day_avg >
                      0
                        ? facility.properties
                            .total_adult_patients_hospitalized_confirmed_and_suspected_covid_7_day_avg
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
                <h2>{activeFacility.hospital_name}</h2>
                <dl>
                  {fields.map(field => (
                    <>
                      <dt>{field}</dt>
                      <dd>{activeFacility[field]}</dd>
                    </>
                  ))}
                </dl>
              </div>
            </>
          )}
          <div className={facilitiesMapStyles.legend}>
            <div className={facilitiesMapStyles.label}>
              % of hospital beds with COVID patients
            </div>
            <div className={facilitiesMapStyles.scale}>
              <div>
                <div />
                {'<'}10%
              </div>
              <div>
                <div />
                10-20%
              </div>
              <div>
                <div />
                20-30%
              </div>
              <div>
                <div />
                {'>'}30%
              </div>
            </div>
            <div className={facilitiesMapStyles.label}>
              Circle size indicates total COVID patients
            </div>
          </div>
          {activeFacility && (
            <>
              <div
                className={facilitiesMapStyles.tooltip}
                style={{ left: tooltip.x - 150, top: tooltip.y + 15 }}
              >
                <FacilityDetails facility={activeFacility} />
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
