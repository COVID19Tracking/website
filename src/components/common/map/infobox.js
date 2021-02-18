import React, { useContext } from 'react'
import MapContext from './map-context'
import infoboxStyle from './infobox.module.scss'

const Infobox = ({ children }) => {
  const mapContext = useContext(MapContext)

  return (
    <div
      className={infoboxStyle.infobox}
      style={{
        left: Math.max(10, mapContext.infoboxPosition.x - 175),
        top: mapContext.infoboxPosition.y + 15,
      }}
    >
      {children}
    </div>
  )
}

export default Infobox
