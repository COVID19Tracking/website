import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Row, Col } from '~components/common/grid'
import Total from '~components/common/landing-page/total'
import { DefinitionPanel } from '~components/pages/data/cards/definitions-panel'
import { CtaAnchorLink } from '~components/common/call-to-action'
import { FormatNumber } from '~components/utils/format'
import overviewStyles from './overview.module.scss'

const LongTermCareOverview = ({ facilities, overview }) => {
  const [highlightedDefinition, setHighlightedDefinition] = useState(false)
  const { allContentfulDataDefinition } = useStaticQuery(graphql`
    {
      allContentfulDataDefinition(
        filter: {
          category: { eq: "Long-term Care" }
          fieldName: { in: ["ltc_cases", "ltc_deaths", "ltc_facilities"] }
        }
      ) {
        nodes {
          name
          fieldName
          childContentfulDataDefinitionDefinitionTextNode {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  `)

  return (
    <>
      {highlightedDefinition && (
        <DefinitionPanel
          definitions={allContentfulDataDefinition.nodes}
          highlightedDefinition={highlightedDefinition}
          onHide={() => setHighlightedDefinition(false)}
        />
      )}
      <Row>
        <Col width={[4, 6, 3]}>
          <Total
            label="Total cases"
            number={<FormatNumber number={overview.total_cases} />}
          >
            <button
              className={overviewStyles.definitionButton}
              type="button"
              onClick={event => {
                event.preventDefault()
                setHighlightedDefinition('ltc_cases')
              }}
            >
              Definition
            </button>
          </Total>
        </Col>
        <Col width={[4, 6, 3]}>
          <Total
            label="Total deaths"
            number={<FormatNumber number={overview.total_death} />}
          >
            <button
              className={overviewStyles.definitionButton}
              type="button"
              onClick={event => {
                event.preventDefault()
                setHighlightedDefinition('ltc_deaths')
              }}
            >
              Definition
            </button>
          </Total>
        </Col>
        <Col width={[4, 6, 3]}>
          <Total
            label="Facilities affected"
            number={<FormatNumber number={facilities} />}
          >
            <button
              className={overviewStyles.definitionButton}
              type="button"
              onClick={event => {
                event.preventDefault()
                setHighlightedDefinition('ltc_facilities')
              }}
            >
              Definition
            </button>
          </Total>
        </Col>
        <Col width={[4, 6, 3]}>
          <CtaAnchorLink block href="#summary">
            State overview
          </CtaAnchorLink>
          <CtaAnchorLink block href="#notes">
            State notes
          </CtaAnchorLink>
          <CtaAnchorLink block href="#facilities">
            All facilities
          </CtaAnchorLink>
        </Col>
      </Row>
    </>
  )
}

export default LongTermCareOverview
