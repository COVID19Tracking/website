import React from 'react'
import PropTypes from 'prop-types'
import stateScriptStyles from './state-script.module.scss'

const StateScript = ({ currentState, stateScripts }) => {
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

StateScript.defaultProps = {
  currentState: '-- Select a state --',
}

StateScript.propTypes = {
  currentState: PropTypes.string,
  stateScripts: PropTypes.arrayOf(
    PropTypes.shape({
      state: PropTypes.string.isRequired,
      message: PropTypes.shape({
        childMarkdownRemark: PropTypes.shape({
          html: PropTypes.string,
        }),
      }).isRequired,
    }),
  ).isRequired,
}

export default StateScript
