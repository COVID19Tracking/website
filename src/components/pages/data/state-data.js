import React from 'react'
import marked from 'marked'
import smartypants from 'smartypants'
import { Link } from 'gatsby'
import slug from '~utilities/slug'
import Container from '~components/common/container'
import StateLinks from '~components/pages/state/state-links'
import StateGrade from '~components/pages/state/state-grade'
import SummaryTable from '~components/common/summary-table'
import stateDataStyles from './state-data.module.scss'
import MarkdownContent from '~components/common/markdown-content'

const State = ({ state }) => (
  <>
    <div className={`state-header ${stateDataStyles.header}`}>
      <h3 id={`state-${state.state.toLowerCase()}`}>
        <Link to={`/data/state/${slug(state.name)}`}>{state.name}</Link>
      </h3>
      <StateGrade letterGrade={state.stateData.dataQualityGrade} />
    </div>
    <SummaryTable
      data={state.stateData}
      lastUpdated={state.stateData.lastUpdateEt}
    />
    <StateLinks
      twitter={state.twitter}
      covid19Site={state.covid19Site}
      covid19SiteSecondary={state.covid19SiteSecondary}
      stateName={state.name}
      historicalSlug={state.name}
      fathomGoal="2YKBL0ZP"
    />
    {state.notes && (
      <Container narrow>
        <MarkdownContent html={smartypants(marked(state.notes))} />
      </Container>
    )}
    <a
      className={`state-top-link ${stateDataStyles.topLink}`}
      href="#reach-skip-nav"
      title="top"
    >
      Back to top.
    </a>
  </>
)

export default State
