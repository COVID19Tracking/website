import React from 'react'
import { Parallax, ParallaxProvider } from 'react-scroll-parallax'
import impactStyle from './impact.module.scss'

const HomepageImpact = () => {
  const people = [1, 2, 3]
  return (
    <ParallaxProvider>
      <div className={impactStyle.root}>
        {people.map(person => (
          <Parallax
            key={person}
            y={[-1 * Math.random() * 100, Math.random() * 100]}
          >
            <img
              className={impactStyle.image}
              alt={`person-${person}`}
              src="http://placeimg.com/140/200/animals/grayscale"
            />
          </Parallax>
        ))}
      </div>
    </ParallaxProvider>
  )
}

export default HomepageImpact
