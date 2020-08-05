import React from 'react'
import PropTypes from 'prop-types'
import stateScriptStyles from './state-script.module.scss'

const StateScript = ({ currentState, stateScripts }) => {
  if (currentState === '-- Select a state --') {
    return null
  }
  const data = stateScripts.find(script => script.state === currentState)
  return (
    <div className={stateScriptStyles.container}>
      <h5>Suggested script for {currentState}</h5>
      {data === undefined ? (
        <p>
          I’m calling on {currentState} to release the latest race and ethnicity
          data for COVID-19. Nationwide, COVID-19 is disproportionately
          affecting Black, Indigenous, Latinx, and other people of color. It’s
          important for our state to report accurate and up-to-date information
          about what’s happening so that our health officials, business leaders,
          and the general public know how to respond to the pandemic.
        </p>
      ) : (
        <div
          dangerouslySetInnerHTML={{
            __html: data.message.childMarkdownRemark.html,
          }}
        />
      )}
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
