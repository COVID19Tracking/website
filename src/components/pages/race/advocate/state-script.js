import React from 'react'
import stateScriptStyles from './state-script.module.scss'

export default ({ currentState, stateScripts }) => {
  if (currentState === '-- Select a state --') {
    return null
  }
  const data = stateScripts.find(script => script.state === currentState)
  if (data === undefined) {
    return null
  }
  return (
    <div className={stateScriptStyles.container}>
      <h5>Suggested script for {data.state}</h5>
      <div
        dangerouslySetInnerHTML={{
          __html: data.message.childMarkdownRemark.html,
        }}
      />
    </div>
  )
}
