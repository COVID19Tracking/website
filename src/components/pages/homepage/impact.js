import React from 'react'
import { Parallax } from 'react-scroll-parallax'

const HomepageImpact = () => {
  return (
    <div>
      <Parallax y={[-20, 20]}>
        <div>A box</div>
      </Parallax>

      <Parallax y={[-40, 20]}>
        <div>A box</div>
      </Parallax>
      <Parallax y={[-40, 40]}>
        <div>A box</div>
      </Parallax>
    </div>
  )
}

export default HomepageImpact
