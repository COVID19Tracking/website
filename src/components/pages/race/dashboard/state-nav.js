/* eslint jsx-a11y/label-has-associated-control: 0 */

import React from 'react'
import StateCombobox from '~components/common/state-combobox'
import stateNavStyles from './state-nav.module.scss'

const StateNav = ({ title, stateList }) => {
  return (
    <div className={`state-nav-header ${stateNavStyles.stateNav}`}>
      <div className={stateNavStyles.stateNavInner}>
        <h2 id="states-top">{title}</h2>
        <StateCombobox stateList={stateList} />
      </div>
    </div>
  )
}

export default StateNav
