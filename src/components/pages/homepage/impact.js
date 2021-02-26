import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import classnames from 'classnames'
import Container from '~components/common/container'
import impactStyle from './impact.module.scss'

const HomepageImpact = () => {
  const data = useStaticQuery(graphql`
    {
      allAirtable(
        filter: {
          data: {
            Image: {
              localFiles: {
                elemMatch: { childImageSharp: { id: { ne: null } } }
              }
            }
          }
        }
      ) {
        nodes {
          data {
            Email
            Image {
              localFiles {
                childImageSharp {
                  fixed(width: 400, grayscale: true) {
                    src
                    srcSet
                  }
                }
              }
            }
            Name
            Team_s_
          }
        }
      }
    }
  `)

  return (
    <Container>
      <div className={impactStyle.root}>
        <div className={impactStyle.message}>
          <h3>
            We would like to thank our{' '}
            <Link to="/thank-you">over 1,300 volunteers</Link>.
          </h3>
        </div>

        <div
          className={classnames(impactStyle.message, impactStyle.messageTwo)}
        >
          <h3>Who gave you this data.</h3>
        </div>
        {data.allAirtable.nodes.map((person, index) => (
          <>
            <span
              className={impactStyle.image}
              style={{
                order: index + 1,
                backgroundImage: `url(${person.data.Image.localFiles[0].childImageSharp.fixed.src})`,
              }}
            />
          </>
        ))}
      </div>
    </Container>
  )
}

export default HomepageImpact
