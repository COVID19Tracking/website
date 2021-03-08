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

const LTCFacilitiesMap = ({
  center,
  zoom,
  state = false,
  removeSidebar = false,
  button = false,
  listFacilities = false,
}) => {
  mapboxgl.accessToken = process.env.GATSBY_MAPBOX_API_TOKEN
  const [activeFacility, setActiveFacility] = useState(false)
  const [facilities, setFacilities] = useState(false)
  const [tooltip, setTooltip] = useState({ x: 0, y: 0 })
  const [highlightedFacility, setHighlightedFacility] = useState(false)
  const [revealedFacility, setRevealedFacility] = useState(false)
  const [currentZoom, setCurrentZoom] = useState(0)
  const [highlighedMarker, setHighlightedMarker] = useState(false)
  const [mapLayer, setMapLayer] = useState('facilities')
  const layers = ['facilities', 'cases', 'deaths' /* ,'cms-cases' */]

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
    const hashes = []
    const features = mapRef.current
      .queryRenderedFeatures({
        layers,
      })
      .filter(item => {
        if (hashes.indexOf(item.properties.hash) === -1) {
          hashes.push(item.properties.hash)
          return true
        }
        return false
      })

    setCurrentZoom(event.target.getZoom())
    setFacilities(
      features.sort((a, b) => {
        if (mapLayer === 'cms-cases') {
          return a.properties.name > b.properties.name ? 1 : -1
        }
        return a.properties.facility_name > b.properties.facility_name ? 1 : -1
      }),
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

    const hash = window.location.hash.replace('#', '').split(',')

    const map = new mapboxgl.Map({
      container: mapNode.current,
      style: 'mapbox://styles/covidtrackingproject/cklwldely0z6i17qu3vh6tckd',
      center: hash.length > 2 ? [hash[0], hash[1]] : center,
      zoom: hash.length > 2 ? hash[2] : zoom,
    })

    map.addControl(new mapboxgl.NavigationControl(), 'top-right')

    map.on('load', () => {
      if (state) {
        layers.forEach(layer => {
          map.setFilter(layer, ['==', ['get', 'state'], state])
        })
        listFacilities(
          map.queryRenderedFeatures({
            layers,
          }),
        )
      }

      if (window.location.hash && hash.length > 2) {
        const hashes = []
        const features = map
          .queryRenderedFeatures({
            layers,
          })
          .filter(item => {
            if (hashes.indexOf(item.properties.hash) === -1) {
              hashes.push(item.properties.hash)
              return true
            }
            return false
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

    map.on('data', event => {
      if (event.isSourceLoaded) {
        mapBoundChanged(event)
      }
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
    mapRef.current.setLayoutProperty(
      'states-outbreak-only-cases',
      'visibility',
      mapLayer === 'cases' ? 'visible' : 'none',
    )

    mapRef.current.setLayoutProperty(
      'states-no-data-cases',
      'visibility',
      mapLayer === 'cases' ? 'visible' : 'none',
    )
    mapRef.current.setLayoutProperty(
      'states-outbreak-only-deaths',
      'visibility',
      mapLayer === 'deaths' ? 'visible' : 'none',
    )

    mapRef.current.setLayoutProperty(
      'states-no-data-deaths',
      'visibility',
      mapLayer === 'deaths' ? 'visible' : 'none',
    )
  }, [mapLayer])

  return (
    <MapContext.Provider
      value={{
        setMapLayer,
        mapLayer,
        infoboxPosition: tooltip,
      }}
    >
      {!removeSidebar && <Legend mapLayer={mapLayer} />}
      <div className={facilitiesMapStyles.container} aria-hidden>
        {!removeSidebar && (
          <Sidebar map={mapRef.current}>
            <Table ariaHidden>
              <thead>
                <tr>
                  <Th alignLeft>Name</Th>
                </tr>
              </thead>
            </Table>
            {facilities && facilities.length > 0 ? (
              <div className={facilitiesMapStyles.tableScroll}>
                <Table>
                  <thead className="a11y-only">
                    <tr>
                      <Th alignLeft>Name</Th>
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
        )}
        <Wrapper fullWidth={removeSidebar}>
          {button}
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
