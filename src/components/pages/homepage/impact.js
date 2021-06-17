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
          <Link to="/thank-you">hundreds of volunteers</Link> who,
          <br /> for the last 12 months, collected and published
        </h3>
      </div>

      <div className={classnames(impactStyle.message, impactStyle.message2)}>
        <h3>the most complete data about COVID-19 in the US.</h3>
      </div>
      <a href="#skip-volunteers" className={impactStyle.skipLink}>
        Skip volunteer list
      </a>
      {volunteers.map((person, index) => (
        <>
          <a
            href={`/thank-you#${slugify(person.data.Name, { lower: true })}`}
            className={classnames(
              impactStyle.image,
              index < 32 && impactStyle.mobile,
              index < 40 && impactStyle.medium,
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
    <Container centered>
      <div className={impactStyle.examples} id="skip-volunteers">
        <p>
          The COVID Tracking Project was cited in{' '}
          <strong>more than 1,000 academic papers</strong>, including major
          medical journals like <em>The New England Journal of Medicine</em>,{' '}
          <em>Nature</em>, and <em>JAMA</em>.
        </p>
        <p>
          We received awards for our work from the{' '}
          <strong>Society of Professional Journalists</strong>, the{' '}
          <strong>Sigma Awards</strong>, and the{' '}
          <strong>NYU Journalism Online Awards</strong>.
        </p>
        <p>
          Our data was used by <strong>two presidential administrations</strong>{' '}
          and an array of federal agencies, including the CDC, HHS, and FDA.
        </p>
        <p>
          <strong>Federal lawmakers</strong> used our data in at least 11
          letters demanding answers on the pandemic response from government
          leaders and commercial labs.
        </p>
        <p>
          And our data was cited in <strong>over 7,700 news stories</strong> in
          publications including <em>The New York Times</em>,{' '}
          <em>The Washington Post</em>, <em>CNN</em>, <em>Vox</em>,{' '}
          <em>ProPublica</em>, and many more.
        </p>
      </div>
    </Container>
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
        limit: 114
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
