import React from 'react'
import { Link } from 'gatsby'
import OverviewWrapper from '~components/common/overview-wrapper'
import LongTermCareOverview from './overview'
import downloadDataStyles from '../download-data.module.scss'
import longTermCarePreambleStyle from './preamble.module.scss'
import { FormatDate } from '~components/utils/format'

const LongTermCarePreamble = ({
  state,
  stateSlug,
  overview,
  showFacilities = false,
}) => {
  let facilities = 0
  Object.keys(overview).forEach(key => {
    if (key.search('outbrkfac') > -1) {
      facilities += overview[key]
    }
  })
  return (
    <OverviewWrapper>
      <h2 className="a11y-only">State overview</h2>
      <LongTermCareOverview
        facilities={facilities}
        overview={overview}
        stateSlug={stateSlug}
      />
      <div className={longTermCarePreambleStyle.container}>
        <p>
          <span>
            Last updated{' '}
            <strong>
              <FormatDate date={overview.date} format="LLLL d, yyyy" />
            </strong>
          </span>
          <a
            href="https://github.com/COVID19Tracking/long-term-care-data/blob/master/state_overview.csv"
            className={downloadDataStyles.button}
          >
            Download state dataset
          </a>
          {showFacilities && (
            <a
              href={`https://github.com/COVID19Tracking/long-term-care-data/blob/master/facilities_${state.toLowerCase()}.csv`}
              className={downloadDataStyles.button}
            >
              Download facility-level dataset
            </a>
          )}
        </p>
      </div>
      <p>
        Do you have information about a long-term-care facility in this state?{' '}
        <Link to="/data/long-term-care/contact">
          We would love to hear from you
        </Link>
        .
      </p>
    </OverviewWrapper>
  )
}

export default LongTermCarePreamble
