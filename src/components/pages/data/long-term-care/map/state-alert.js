import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import infoboxStyle from '~components/common/map/infobox.module.scss'
import { icons, adjectives } from '~components/pages/state/state-grade'

const StateAlerts = ({ state }) => {
  const data = useStaticQuery(graphql`
    {
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

  const assessment = data.allCovidGradeStateAssessment.nodes.find(
    node => node.state === state,
  )
  const stateName = data.allCovidStateInfo.nodes.find(
    node => node.state === state,
  )

  if (!assessment) {
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
        for long-term-care data
      </p>
    </div>
  )
}

export default StateAlerts
