import React from 'react'
import classnames from 'classnames'
import StateNav from './state-nav'
import stateNavWrapperStyle from './state-nav-wrapper.module.scss'

/*
This renders the children with the StateNav sidebar on the right side.
stateList: the list of states to be included in the StateNav.
single: whether or not this wraps a single state. true means this wraps only one
*/
export default ({ children, stateList, single = false }) => (
  <div className={stateNavWrapperStyle.headerContainer}>
    <div className={stateNavWrapperStyle.states}>
      {!single && <h2 className={stateNavWrapperStyle.title}>Data by State</h2>}
      <div className={stateNavWrapperStyle.statesWrapper}>{children}</div>
    </div>
    <StateNav
      stateList={stateList}
      className={classnames(
        stateNavWrapperStyle.sidebar,
        !single && stateNavWrapperStyle.topMargin,
      )}
      externalLinks={single}
    />
  </div>
)
