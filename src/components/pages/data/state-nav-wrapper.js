import React from 'react'
import StateNav from './state-nav'
import stateNavWrapperStyle from './state-nav-wrapper.module.scss'

/*
This renders the children with the StateNav sidebar on the right side.
stateList: the list of states to be included in the StateNav.
*/
export default ({ children, stateList }) => (
  <div className={stateNavWrapperStyle.headerContainer}>
    <div className={stateNavWrapperStyle.states}>
      <h2 className={stateNavWrapperStyle.title}>Data by State</h2>
      <div className={stateNavWrapperStyle.statesWrapper}>{children}</div>
    </div>
    <StateNav stateList={stateList} className={stateNavWrapperStyle.sidebar} />
  </div>
)
