import React, { useEffect, useState } from 'react'
import TableauChart from '~components/charts/tableau'
import ImageContentBlock from '~components/pages/blog/content-blocks/image-content-block'
import vizStyles from './report-viz.module.scss'

const Visualization = ({ contentfulId, url, height, vizImage }) => {
  const tableau = (
    <TableauChart
      id={contentfulId}
      viewUrl={url}
      className={vizStyles.tableau}
      height={height + 27} // Account for bottom controls
    />
  )

  const image = (
    <ImageContentBlock
      image={vizImage}
      className={vizStyles.image}
      imageUrl={vizImage.file.url}
    />
  )

  const breakpoint = 830
  const [vizComponent, setVizComponent] = useState(
    typeof window !== 'undefined' && window.innerWidth < breakpoint
      ? image
      : tableau,
  )

  // Responsive viz: if screen width smaller than Tableau viz, switch to image
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    const handleResize = () => {
      const newWidth = window.innerWidth
      if (newWidth < breakpoint) {
        setVizComponent(image)
      } else {
        setVizComponent(tableau)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return vizComponent
}

export default Visualization
