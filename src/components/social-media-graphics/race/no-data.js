import React from 'react'

import classnames from 'classnames'

import Logo from '~images/ctp-icon-small.png'
import CarLogo from '~images/car-logo-small.png'
import alertIcon from '~images/race-dashboard/alert-bang-orange.svg'

import socialCardStyle from './social-card.module.scss'

const NoDataSocialCard = ({ stateName, square }) => {
  const today = new Date()
  return (
    <div>
      <div
        className={classnames(
          socialCardStyle.noDataContainer,
          square && socialCardStyle.square,
        )}
      >
        <img
          className={socialCardStyle.alert}
          src={alertIcon}
          alt="Alert icon"
        />
        <p>
          As of {today.toLocaleString('default', { month: 'long' })}{' '}
          {today.getDate()}, <strong>{stateName}</strong> did not report race
          and ethnicity data to allow for this comparison.
        </p>
        <p className={socialCardStyle.getBetterData}>
          Help us get better data:
          <br />
          <strong>www.covidtracking.com/race/get-better-data</strong>
        </p>
        {square && (
          <div className={socialCardStyle.logosContainer}>
            <img src={Logo} alt="" className={socialCardStyle.ctpLogo} />
            <img src={CarLogo} alt="" className={socialCardStyle.carLogo} />
          </div>
        )}
      </div>
      {!square && (
        <>
          <img src={Logo} alt="" className={socialCardStyle.ctpLogo} />
          <img src={CarLogo} alt="" className={socialCardStyle.carLogo} />
        </>
      )}
    </div>
  )
}

export default NoDataSocialCard
