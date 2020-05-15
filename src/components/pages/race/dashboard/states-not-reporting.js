import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import ListSpacer from '~components/utils/list-spacer'
import alertBang from '../../../../images/race-dashboard/alert-bang-orange.svg'
import statesNotReportingStyles from './states-not-reporting.module.scss'

const MissingStates = ({ stateNames }) => (
  <>
    {stateNames.map((state, index) => (
      <Fragment key={`state-${state.name}`}>
        {state}
        <ListSpacer
          index={index}
          length={stateNames.length}
          useAmbersand={false}
        />
      </Fragment>
    ))}
  </>
)

export default ({ stateNames }) => (
  <div className={statesNotReportingStyles.container}>
    <div className={statesNotReportingStyles.iconContainer}>
      <img src={alertBang} alt="Alert icon" />
    </div>
    <div>
      <p>
        States currently not reporting any race or ethnicity data include{' '}
        <MissingStates stateNames={stateNames} />.
      </p>
      <p>
        <Link to="/get-involved">Help us advocate for better data.</Link>
      </p>
    </div>
  </div>
)
