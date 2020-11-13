import React from 'react'
import OverviewWrapper from '~components/common/overview-wrapper'
import LongTermCareOverview from './overview'
import preambleStyle from '../preamble.module.scss'
import downloadDataStyles from '../download-data.module.scss'

const LongTermCarePreamble = ({ state, facilities, overview }) => {
  return (
    <OverviewWrapper>
      <h2 className="a11y-only">State overview</h2>
      <LongTermCareOverview facilities={facilities} overview={overview} />

      <h3 className={preambleStyle.header}>Download dataset</h3>
      <div className={downloadDataStyles.container}>
        <p>
          <a
            href="https://github.com/COVID19Tracking/long-term-care-data/blob/master/state_overview.csv"
            className={downloadDataStyles.button}
          >
            State overview
          </a>
          <a
            href={`https://github.com/COVID19Tracking/long-term-care-data/blob/master/facilities_${state.toLowerCase()}.csv`}
            className={downloadDataStyles.button}
          >
            All facilities
          </a>
        </p>
      </div>
    </OverviewWrapper>
  )
}

export default LongTermCarePreamble
