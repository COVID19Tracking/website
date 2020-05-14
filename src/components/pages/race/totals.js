import React from 'react'
import Total from '~components/common/landing-page/total'
import totalsStyle from './totals.module.scss'

export default () => (
  <div className={totalsStyle.totals}>
    <h3>States reporting racial and ethnic data</h3>
    <div className={totalsStyle.totalsWrap}>
      <Total label="Reporting positive cases" number="44 states" />
      <Total label="Reporting deaths" number="36 states" />
    </div>
  </div>
)
