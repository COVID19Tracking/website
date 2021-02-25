import React from 'react'
import Container from '~components/common/container'
import faces from '~data/sample-faces.json'
import impactStyle from './impact.module.scss'

const HomepageImpact = () => {
  return (
    <Container>
      <div className={impactStyle.root}>
        {faces.map(person => (
          <span
            className={impactStyle.image}
            style={{ backgroundImage: `url(${person.url})` }}
          />
        ))}
      </div>
    </Container>
  )
}

export default HomepageImpact
