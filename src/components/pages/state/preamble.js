import React from 'react'
import OverviewWrapper from '~components/common/overview-wrapper'
import StateGrade from '~components/pages/state/state-grade'
import { DownloadDataRow } from '~components/pages/state/download-data'
import { StateLinks } from '~components/pages/state/state-links'
import preambleStyle from './preamble.module.scss'

const StatePreamble = ({ state, urls, covidState }) => {
  const { links } = urls.childTacoYaml
  // todo make state grade wrap as a circle with the grade description
  return (
    <OverviewWrapper className={preambleStyle.preamble}>
      <h2 className="a11y-only">State overview</h2>
      <div className={preambleStyle.largeDisclosure}>
        <h3 className={preambleStyle.header}>Where this data comes from</h3>
        <StateLinks
          twitter={state.twitter}
          links={links}
          stateName={state.name}
          stateSlug={state.childSlug.slug}
          fullWidth
        />
      </div>
      <DownloadDataRow
        slug={state.childSlug.slug}
        lastUpdateEt={covidState.dateModified}
      >
        <StateGrade letterGrade={covidState.dataQualityGrade} />
      </DownloadDataRow>
    </OverviewWrapper>
  )
}

export default StatePreamble
