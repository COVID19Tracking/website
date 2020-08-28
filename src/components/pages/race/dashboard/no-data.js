import React from 'react'
import { Link } from 'gatsby'
import noDataStyles from './no-data.module.scss'
import alertBang from '~images/race-dashboard/alert-bang-white.svg'

const NoData = ({ stateName }) => (
  <div className={noDataStyles.container}>
    <table className={noDataStyles.table} aria-hidden role="presentation">
      <tbody>
        <tr>
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td />
          <td />
          <td />
          <td />
        </tr>
      </tbody>
    </table>
    <div className={noDataStyles.alert}>
      <div className={noDataStyles.title}>
        <img src={alertBang} alt="Alert icon" />
        <span>No Data</span>
      </div>
      <div className={noDataStyles.content}>
        <p>
          {stateName} does not share data about race or ethnicity.{' '}
          <Link to="/race/get-better-data">
            Help us advocate for better data
          </Link>
          .
        </p>
      </div>
    </div>
  </div>
)

export default NoData
