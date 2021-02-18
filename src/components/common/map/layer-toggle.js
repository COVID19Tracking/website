import React, { useContext } from 'react'
import MapContext from './map-context'
import toggleStyle from './layer-toggle.module.scss'

const LayerToggle = ({ layers }) => {
  const mapContext = useContext(MapContext)
  return (
    <div
      className={toggleStyle.toggle}
      role="group"
      aria-label="Toggle map layers"
    >
      {layers.map(layer => (
        <button
          className={mapContext.mapLayer === layer.id && toggleStyle.active}
          type="button"
          onClick={() => {
            mapContext.setMapLayer(layer.id)
          }}
        >
          {layer.name}
        </button>
      ))}
    </div>
  )
}

export default LayerToggle
