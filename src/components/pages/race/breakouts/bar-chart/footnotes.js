import React from 'react'

import barChartStyle from './bar-chart.module.scss'

const AsteriskFootnote = ({ showSmallNFootnote, asteriskFootnote }) => (
  <div className={barChartStyle.asteriskFootnote}>
    {showSmallNFootnote && (
      <>
        * Based on fewer than 10 deaths among members of this race/ethnicity.
        Interpret with caution.
      </>
    )}
    {showSmallNFootnote && asteriskFootnote && <br />}
    {asteriskFootnote && (
      <>
        {'† '}
        {asteriskFootnote}
      </>
    )}
  </div>
)

const Notes = ({ state, stateName }) => {
  if (stateName === 'Utah') {
    // special case
    return (
      <>
        Graphic only includes demographic groups reported by the state. Race
        categories are non-mutually-exclusive and are defined as not Hispanic or
        Latino.
      </>
    )
  }
  if (stateName === 'Wyoming') {
    // special case
    return (
      <>
        Graphic only includes demographic groups reported by the state. Race
        categories are non-mutually-exclusive and include both Hispanic/Latino
        and non-Hispanic/Latino ethnicity.
      </>
    )
  }
  return (
    <>
      {state.knownRaceEthPos || state.knownRaceEthDeath ? (
        <>
          Graphic only includes demographic groups reported by the state. Race
          categories are mutually exclusive and defined as not Hispanic or
          Latino.
        </>
      ) : (
        <>
          Graphic only includes demographic groups reported by the state. Race
          categories are mutually exclusive and include both Hispanic/Latino and
          non-Hispanic/Latino ethnicity.
        </>
      )}
    </>
  )
}

const SocialCardFootnotes = ({
  state,
  showSmallNFootnote,
  asteriskFootnote,
}) => (
  <div className={barChartStyle.notes}>
    <div>
      <Notes state={state} stateName={state.name} />
    </div>
    {(showSmallNFootnote || asteriskFootnote) && (
      <AsteriskFootnote
        showSmallNFootnote={showSmallNFootnote}
        asteriskFootnote={asteriskFootnote}
      />
    )}
  </div>
)

export default SocialCardFootnotes
