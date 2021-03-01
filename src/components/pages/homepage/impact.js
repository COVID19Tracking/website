/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useRef } from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import classnames from 'classnames'
import Container from '~components/common/container'
import impactStyle from './impact.module.scss'

const HomepageImpact = () => {
  const [selected, setSelected] = useState(false)
  const [infoBoxPosition, setInfoBoxPosition] = useState({ top: 0, left: 0 })
  const selectedRef = useRef()
  const wrapperRef = useRef()
  const data = useStaticQuery(graphql`
    {
      volunteers: allAirtable(
        limit: 69
        sort: { fields: childRandomSort___sort }
        filter: {
          table: { eq: "Homepage" }
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
                  fixed(width: 200) {
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
      data.volunteers.nodes.forEach(person => {
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
            We would like to thank the{' '}
            <Link to="/thank-you">over 1,300 volunteers</Link> who gave you this
            data.
          </h3>
        </div>
        {data.volunteers.nodes.map((person, index) => (
          <>
            <span
              className={classnames(
                impactStyle.image,
                index > 20 && impactStyle.overMobile,
              )}
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
