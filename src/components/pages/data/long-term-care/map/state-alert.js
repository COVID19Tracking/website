import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import infoboxStyle from '~components/common/map/infobox.module.scss'
import { icons, adjectives } from '~components/pages/state/state-grade'

const StateAlerts = ({ state }) => {
  const data = useStaticQuery(graphql`
    {
      allCovidLtcNotes {
        nodes {
          state
          alerts
        }
      }
      allCovidGradeStateAssessment {
        nodes {
          state
          ltc
        }
      }
      allCovidStateInfo {
        nodes {
          state
          name
          childSlug {
            slug
          }
        }
      }
    }
  `)

  const alerts = data.allCovidLtcNotes.nodes.find(node => node.state === state)
  const assessment = data.allCovidGradeStateAssessment.nodes.find(
    node => node.state === state,
  )
  const stateName = data.allCovidStateInfo.nodes.find(
    node => node.state === state,
  )

  if (!alerts && !assessment) {
    return null
  }
  return (
    <div className={infoboxStyle.alert}>
      <p>
        <img src={icons[assessment.ltc]} alt="" aria-hidden />
        <Link
          to={`/data/state/${stateName.childSlug.slug}/assessment#long-term-care`}
        >
          {adjectives[assessment.ltc]} issues exist
        </Link>{' '}
        with this state&apos;s data
        {alerts && alerts.alerts && <>, and the state has an active alert</>}
      </p>
    </div>
  )
}

export default StateAlerts
