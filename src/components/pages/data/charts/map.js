import React, { useRef, useState, useEffect } from 'react'
import classnames from 'classnames'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { Row, Col } from '~components/common/grid'
import ContentfulContent from '~components/common/contentful-content'
import mapStyles from './map.module.scss'

const states = [
  [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    'ME',
  ],
  [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    'WI',
    null,
    null,
    null,
    'VT',
    'NH',
  ],
  [
    null,
    null,
    'WA',
    'ID',
    'MT',
    'ND',
    'MN',
    'IL',
    'MI',
    null,
    'NY',
    'MA',
    null,
  ],
  [
    null,
    null,
    'OR',
    'NV',
    'WY',
    'SD',
    'IA',
    'IN',
    'OH',
    'PA',
    'NJ',
    'CT',
    'RI',
  ],
  [
    null,
    null,
    'CA',
    'UT',
    'CO',
    'NE',
    'MO',
    'KY',
    'WV',
    'VA',
    'MD',
    'DE',
    null,
  ],
  [
    null,
    null,
    null,
    'AZ',
    'NM',
    'KS',
    'AR',
    'TN',
    'NC',
    'SC',
    'DC',
    null,
    null,
  ],
  [
    null,
    null,
    null,
    null,
    null,
    'OK',
    'LA',
    'MS',
    'AL',
    'GA',
    null,
    null,
    null,
  ],
  [
    'GU',
    'MP',
    'HI',
    'AK',
    null,
    'TX',
    null,
    null,
    null,
    null,
    'FL',
    'PR',
    'VI',
  ],
  [
    null,
    null,
    'AS',
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
]

const ChartMap = ({ stateHistory }) => {
  const [disclosureOpen, setDisclosureOpen] = useState(false)
  const disclosureRef = useRef()
  const data = useStaticQuery(graphql`
    {
      contentfulSnippet(slug: { eq: "chart-map-description" }) {
        contentful_id
        childContentfulSnippetContentTextNode {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  `)
  const stateStatus = {}
  const history = {}
  stateHistory.forEach(row => {
    if (typeof history[row.state] === 'undefined') {
      history[row.state] = []
    }
    history[row.state].push(row)
  })
  Object.keys(history).forEach(state => {
    let currentAverage = 0
    let pastAverage = 0
    for (let i = 0; i < 7; i += 1) {
      currentAverage += history[state][i].positiveIncrease
    }
    for (let i = 7; i < 14; i += 1) {
      pastAverage += history[state][i].positiveIncrease
    }
    currentAverage /= 7
    pastAverage /= 7
    stateStatus[state] = (currentAverage - pastAverage) / pastAverage
  })

  const totalRising = Object.values(stateStatus).filter(item => item > 0.1)
    .length
  const totalFalling = Object.values(stateStatus).filter(item => item < -0.1)
    .length
  const totalUnchanged =
    Object.keys(stateStatus).length - totalRising - totalFalling

  useEffect(() => {
    if (disclosureOpen) {
      disclosureRef.current.focus()
    }
  }, [disclosureOpen])
  return (
    <>
      <Row className={mapStyles.row}>
        <Col width={[4, 6, 8]}>
          <Link to="#skip-map" className={mapStyles.skipLink}>
            Skip state map
          </Link>
          <div className={mapStyles.map}>
            <h3 className={mapStyles.heading}>
              New cases change in 7-day average
            </h3>
            {states.map(line => (
              <div>
                {line.map(state => (
                  <div
                    className={classnames(
                      mapStyles.state,
                      state && mapStyles.hasState,
                      stateStatus[state] > 0.1 && mapStyles.rising,
                      stateStatus[state] < -0.1 && mapStyles.falling,
                    )}
                  >
                    {state && (
                      <>
                        <span className="a11y-only">In </span>
                        {state}
                        <span className="a11y-only">
                          , cases are{' '}
                          {stateStatus[state] > 0 &&
                            stateStatus[state] <= 0.1 && <>rising</>}
                          {stateStatus[state] > 0.1 && <>rising</>}{' '}
                          {stateStatus[state] < 0 && <>falling</>}
                        </span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Col>
        <Col width={[4, 6, 4]}>
          <p className={mapStyles.mapLegend} id="skip-map">
            Cases are{' '}
            <span className={classnames(mapStyles.legend, mapStyles.rising)}>
              rising
            </span>{' '}
            in {totalRising} states,{' '}
            <span className={mapStyles.legend}>staying the same</span> in{' '}
            {totalUnchanged} states, and{' '}
            <span className={classnames(mapStyles.legend, mapStyles.falling)}>
              falling
            </span>{' '}
            in {totalFalling} states.
          </p>
        </Col>
      </Row>
      <button
        className={mapStyles.disclosureButton}
        type="button"
        aria-expanded={disclosureOpen}
        onClick={event => {
          event.preventDefault()
          setDisclosureOpen(!disclosureOpen)
        }}
      >
        <span className={mapStyles.text}>Map information</span>{' '}
        <span aria-hidden>{disclosureOpen ? <>↑</> : <>↓</>}</span>
      </button>
      <div
        ref={disclosureRef}
        tabIndex="-1"
        className={classnames(
          mapStyles.disclosure,
          disclosureOpen && mapStyles.isOpen,
        )}
      >
        <ContentfulContent
          content={
            data.contentfulSnippet.childContentfulSnippetContentTextNode
              .childMarkdownRemark.html
          }
          id={data.contentfulSnippet.contentful_id}
        />
      </div>
    </>
  )
}

export default ChartMap
