import React from 'react'
import StateGrade from '~components/pages/state/state-grade'
import { DownloadDataRow } from '~components/pages/state/download-data'
import { StateLinks } from '~components/pages/state/state-links'
import preambleStyle from './preamble.module.scss'

const StatePreamble = ({ state, urls, covidState }) => {
  const { links } = urls.childTacoYaml
  // todo make state grade wrap as a circle with the grade description
  return (
    <div className={preambleStyle.preamble}>
      <h2 className={preambleStyle.header}>{state.name} Data Sources</h2>
      <StateLinks
        twitter={state.twitter}
        links={links}
        stateName={state.name}
        stateSlug={state.childSlug.slug}
        fullWidth
      />
      <DownloadDataRow
        slug={state.childSlug.slug}
        lastUpdateEt={covidState.dateModified}
      >
        <StateGrade letterGrade={covidState.dataQualityGrade} />
      </DownloadDataRow>
    </div>
  )
}

export default StatePreamble
