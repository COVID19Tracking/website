/* eslint-disable no-underscore-dangle,max-len,jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import Sidebar from '~components/common/map/sidebar'
import { Table, Th, Td } from '~components/common/table'
import MapContext from '~components/common/map/map-context'
import Overlay from '~components/common/map/overlay'
import FacilityDetails from './facility-details'
import Legend from './legend'
import Infobox from './infobox'
import Wrapper from '~components/common/map/wrapper'
import facilitiesMapStyles from './map.module.scss'
import 'mapbox-gl/dist/mapbox-gl.css'

const LTCFacilitiesMap = ({ center, zoom, state = false }) => {
  mapboxgl.accessToken = process.env.GATSBY_MAPBOX_API_TOKEN
  const [activeFacility, setActiveFacility] = useState(false)
  const [facilities, setFacilities] = useState(false)
  const [tooltip, setTooltip] = useState({ x: 0, y: 0 })
  const [highlightedFacility, setHighlightedFacility] = useState(false)
  const [revealedFacility, setRevealedFacility] = useState(false)
  const [currentZoom, setCurrentZoom] = useState(0)
  const [highlighedMarker, setHighlightedMarker] = useState(false)
  const [mapLayer, setMapLayer] = useState('cases')
  const layers = [
    'cases',
    'deaths',
    'cases-outbreak-only',
    'deaths-outbreak-only',
    'cms-cases',
  ]

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
    if (event.target.getZoom() < 6) {
      setFacilities(false)
      return
    }
    const features = mapRef.current.queryRenderedFeatures({
      layers,
    })
    setCurrentZoom(event.target.getZoom())
    setFacilities(
      features.sort((a, b) =>
        a.properties.hospital_name > b.properties.hospital_name ? 1 : -1,
      ),
    )
  }

  useEffect(() => {
    if (!mapRef.current) {
      return
    }
    if (mapLayer === 'cms-cases') {
      mapRef.current.setLayoutProperty(
        'states-outbreak-only',
        'visibility',
        'none',
      )

      mapRef.current.setLayoutProperty('states-all-data', 'visibility', 'none')

      mapRef.current.setLayoutProperty('states', 'visibility', 'none')
      return
    }

    mapRef.current.setLayoutProperty('states', 'visibility', 'visible')
    mapRef.current.setLayoutProperty(
      'states-outbreak-only',
      'visibility',
      ['cases', 'deaths'].indexOf(mapLayer) > -1 ? 'visible' : 'none',
    )

    mapRef.current.setLayoutProperty(
      'states-all-data',
      'visibility',
      ['cases-outbreak-only', 'deaths-outbreak-only'].indexOf(mapLayer) > -1
        ? 'visible'
        : 'none',
    )
  }, [mapLayer])

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

    const hash = window.location.hash.replace('#', '').split(',')

    const map = new mapboxgl.Map({
      container: mapNode.current,
      style: 'mapbox://styles/covidtrackingproject/ckkx6v37q178u17qtj0dn36b5',
      center: hash.length > 2 ? [hash[0], hash[1]] : center,
      zoom: hash.length > 2 ? hash[2] : zoom,
    })

    map.addControl(new mapboxgl.NavigationControl(), 'top-right')

    map.on('load', () => {
      if (state) {
        map.setFilter('cases', ['==', ['get', 'state_abbreviation'], state])
      }

      if (window.location.hash && hash.length > 2) {
        const features = map.queryRenderedFeatures({
          layers,
        })
        setFacilities(
          features.sort((a, b) =>
            a.properties.facility_name > b.properties.facility_name ? 1 : -1,
          ),
        )
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
    layers.forEach(layer => {
      mapRef.current.setLayoutProperty(
        layer,
        'visibility',
        layer === mapLayer ? 'visible' : 'none',
      )
    })
  }, [mapLayer])

  return (
    <MapContext.Provider
      value={{
        setMapLayer,
        mapLayer,
        infoboxPosition: tooltip,
      }}
    >
      <Legend mapLayer={mapLayer} setLayer={layer => setMapLayer(layer)} />
      <div className={facilitiesMapStyles.container} aria-hidden>
        <Sidebar map={mapRef.current}>
          <Table ariaHidden>
            <thead>
              <tr>
                <Th alignLeft>Name</Th>
                <Th>Resident cases</Th>
              </tr>
            </thead>
          </Table>
          {facilities && facilities.length > 0 ? (
            <div className={facilitiesMapStyles.tableScroll}>
              <Table>
                <thead className="a11y-only">
                  <tr>
                    <Th alignLeft>Name</Th>
                    <Th>Resident cases</Th>
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
                          {mapLayer === 'cms-cases'
                            ? facility.properties.name
                            : facility.properties.facility_name}
                        </button>
                      </Td>
                      <Td>
                        {mapLayer === 'cms-cases'
                          ? facility.properties[
                              'residents-total-confirmed-covid-19'
                            ] +
                            facility.properties[
                              'residents-total-suspected-covid-19'
                            ]
                          : facility.properties.resident_positives}
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
        </Sidebar>
        <Wrapper>
          {revealedFacility && (
            <Overlay
              close={() => {
                setRevealedFacility(false)
              }}
            >
              <FacilityDetails facility={activeFacility} layer={mapLayer} />
            </Overlay>
          )}

          {activeFacility && (
            <Infobox
              layer={mapLayer}
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
        </Wrapper>
      </div>
    </MapContext.Provider>
  )
}

export default LTCFacilitiesMap
