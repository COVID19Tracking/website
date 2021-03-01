/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useRef } from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import slugify from 'slugify'
import classnames from 'classnames'
import Container from '~components/common/container'
import impactStyle from './impact.module.scss'

const Volunteers = ({ volunteers }) => {
  const [selected, setSelected] = useState(false)
  const [infoBoxPosition, setInfoBoxPosition] = useState({ top: 0, left: 0 })
  const selectedRef = useRef()
  const wrapperRef = useRef()

  useEffect(() => {
    if (typeof document !== 'undefined') {
      volunteers.forEach(person => {
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
    <div className={impactStyle.root} ref={wrapperRef}>
      <div className={impactStyle.message}>
        <h3>
          We would like to thank the{' '}
          <Link to="/thank-you">over 1,300 volunteers</Link> who gave you this
          data.
        </h3>
      </div>
      {volunteers.map((person, index) => (
        <>
          <a
            href={`/thank-you#${slugify(person.data.Name, { lower: true })}`}
            className={classnames(
              impactStyle.image,
              index > 27 && impactStyle.overMobile,
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
          >
            <span className="a11y-only">{person.data.Name}</span>
          </a>
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
  )
}

const Impact = ({ press, files }) => (
  <>
    <div className={classnames(impactStyle.message, impactStyle.impactMessage)}>
      <h3>
        <Link to="/analysis-updates">We&apos;ve been cited</Link> in over [800]
        articles, [x thousand] TV spots, etc. [TK]
      </h3>
    </div>
    <div className={impactStyle.root}>
      <span className={impactStyle.quote}>
        <blockquote>
          <span />
          The project is a demonstration of citizen know-how and civic
          dedication at a time when the country feels like it’s being pulled
          apart. Yet it’s confounding that, almost a year into the pandemic, the
          Covid Tracking Project is doing what might be expected of the U.S.
          government.
          <span />
        </blockquote>
        <cite>
          <a href="https://www.bloomberg.com/news/features/2020-11-20/covid-tracking-project-volunteers-step-up-as-u-s-fails-during-pandemic">
            Bloomberg
          </a>
        </cite>
      </span>
    </div>
    <div className={impactStyle.press}>
      {press.map(item => (
        <span>
          <img
            src={files.find(file => file.name === item.logo).publicURL}
            alt={item.name}
          />
        </span>
      ))}
    </div>
  </>
)

const HomepageImpact = () => {
  const data = useStaticQuery(graphql`
    {
      allHomepagePressYaml(filter: { featured: { eq: true } }) {
        nodes {
          name
          logo
        }
      }
      allFile(filter: { dir: { regex: "/press-logos/" } }) {
        nodes {
          name
          publicURL
        }
      }
      volunteers: allAirtable(
        limit: 73
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
  return (
    <Container>
      <Volunteers volunteers={data.volunteers.nodes} />
      <Impact
        press={data.allHomepagePressYaml.nodes}
        files={data.allFile.nodes}
      />
    </Container>
  )
}

export default HomepageImpact
