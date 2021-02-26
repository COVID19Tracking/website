/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useRef } from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import classnames from 'classnames'
import Container from '~components/common/container'
import impactStyle from './impact.module.scss'

const HomepageImpact = () => {
  const [selected, setSelected] = useState(7)
  const [infoBoxPosition, setInfoBoxPosition] = useState({ top: 0, left: 0 })
  const selectedRef = useRef()
  const wrapperRef = useRef()
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
                color: childImageSharp {
                  fixed(width: 400) {
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

  useEffect(() => {
    if (typeof document !== 'undefined') {
      data.allAirtable.nodes.forEach(person => {
        const image = new Image()
        image.src = person.data.Image.localFiles[0].color.fixed.src
      })
    }
  }, [])

  useEffect(() => {
    if (!selected || typeof window === 'undefined') {
      return
    }
    const position = selectedRef.current.getBoundingClientRect()
    const wrapperPosition = wrapperRef.current.getBoundingClientRect()
    const isRight = position.left - wrapperPosition.left > window.innerWidth / 2
    console.log(isRight)
    setInfoBoxPosition({
      left:
        position.left - wrapperPosition.left - (isRight ? position.width : 0),
      top: position.top - wrapperPosition.top + position.height,
    })
  }, [selected])

  return (
    <Container>
      <div className={impactStyle.root} ref={wrapperRef}>
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
              ref={selected === index ? selectedRef : null}
              onMouseOver={() => {
                setSelected(index)
              }}
              onMouseOut={() => {
                setSelected(false)
              }}
              onFocus={() => {
                setSelected(index)
              }}
              onBlur={() => {
                setSelected(false)
              }}
              style={{
                order: index + 1,
                backgroundImage: `url(${person.data.Image.localFiles[0].color.fixed.src})`,
              }}
            />
            {selected === index && (
              <span
                className={classnames(
                  impactStyle.info,
                  infoBoxPosition.isRight && impactStyle.isRight,
                )}
                style={{ top: infoBoxPosition.top, left: infoBoxPosition.left }}
              >
                <h5>{person.data.Name}</h5>
                {person.data.Team_s_ && (
                  <ul>
                    {person.data.Team_s_.map(team => (
                      <>{team && <li>{team}</li>}</>
                    ))}
                  </ul>
                )}
              </span>
            )}
          </>
        ))}
      </div>
    </Container>
  )
}

export default HomepageImpact
