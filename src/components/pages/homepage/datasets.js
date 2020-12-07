import React, { useState, useRef } from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import classnames from 'classnames'
import { Row, Col } from '~components/common/grid'
import Container from '~components/common/landing-page/container'
import datasetsStyle from './datasets.module.scss'

const Dataset = ({ title, children, link, stateLink }) => {
  const data = useStaticQuery(graphql`
    {
      allCovidStateInfo(sort: { fields: state }) {
        nodes {
          name
          state
          childSlug {
            slug
          }
        }
      }
    }
  `)
  const paneRef = useRef()
  const [showList, setShowList] = useState(false)

  return (
    <>
      <h3 className={datasetsStyle.header}>{title}</h3>
      <p>{children}</p>
      <div>
        {link}{' '}
        <button
          className={datasetsStyle.toggle}
          type="button"
          aria-expanded={showList}
          onClick={event => {
            event.preventDefault()
            setShowList(!showList)
            if (!showList) {
              paneRef.current.focus()
            }
          }}
        >
          <span className={datasetsStyle.text}>Jump to a state</span>{' '}
          <span aria-hidden>{showList ? <>↑</> : <>↓</>}</span>
        </button>
      </div>
      <ul
        tabIndex="-1"
        ref={paneRef}
        className={classnames(
          datasetsStyle.stateList,
          showList && datasetsStyle.shown,
        )}
        hidden={!showList}
      >
        {data.allCovidStateInfo.nodes.map(state => (
          <li key={`${title}-${state.state}`}>
            <Link
              to={stateLink(state)}
              aria-label={`${title} data for ${state.name}`}
            >
              {state.state}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

const HomepageDatasets = () => (
  <Container>
    <h2>Our key datasets</h2>
    <Row>
      <Col width={[4, 3, 6]}>
        <Dataset
          title="Race &amp; ethnicity"
          link={<Link to="/race">All race &amp; ethnicity data</Link>}
          stateLink={state =>
            `/race/dashboard#state-${state.state.toLowerCase()}`
          }
        >
          The COVID Racial Data Tracker is a collaboration between the COVID
          Tracking Project and the Boston University Center for Antiracist
          Research. Together, we’re gathering the most complete and up-to-date
          race and ethnicity data on COVID-19 in the United States.
        </Dataset>
      </Col>
      <Col width={[4, 3, 6]}>
        <Dataset
          title="Long-term care"
          link={<Link to="/data/longtermcare">All long-term care data</Link>}
          stateLink={state =>
            `/data/state/${state.childSlug.slug}/long-term-care`
          }
        >
          To date, the Long-Term Care COVID Tracker is the most comprehensive
          dataset about COVID-19 in US long-term care facilities. It compiles
          crucial data about the effects of the pandemic on a population with
          extraordinary vulnerabilities to the virus due to age, underlying
          health conditions, or proximity to large outbreaks.
        </Dataset>
      </Col>
    </Row>
  </Container>
)

export default HomepageDatasets
