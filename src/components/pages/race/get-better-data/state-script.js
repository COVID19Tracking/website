import React from 'react'
import PropTypes from 'prop-types'
import stateInfotyles from './state-script.module.scss'

const template = require('mustache')

const StateScript = ({ currentStateName, stateInfo }) => {
  if (currentStateName === '-- Select a state --') {
    return null
  }

  // find the current state
  const currentState = stateInfo.find(state => state.name === currentStateName)

  const numberToPercentage = number => {
    return number * 100 > 1 ? Math.round(number * 100) : '<1'
  }

  let script
  if (currentState.message) {
    // if there is a custom script for this state
    const scriptValues = {
      knownEthDeath: numberToPercentage(currentState.knownEthDeath), // separate
      knownEthPos: numberToPercentage(currentState.knownEthPos), // separate
      knownRaceDeath: numberToPercentage(currentState.knownRaceDeath), // separate
      knownRacePos: numberToPercentage(currentState.knownRacePos), // separate
      knownRaceEthDeath: numberToPercentage(currentState.knownRaceEthDeath), // combined
      knownRaceEthPos: numberToPercentage(currentState.knownRaceEthPos), // combined
    }

    // render Mustache template
    script = template.render(
      currentState.message.childMarkdownRemark.html,
      scriptValues,
    )
  }

  return (
    <div className={stateInfotyles.container}>
      <h5>Suggested script for {currentStateName}</h5>
      {script === undefined ? (
        <p>
          I’m calling on {currentStateName} to release the latest race and
          ethnicity data for COVID-19.
          <br />
          <br />
          Nationwide, COVID-19 is disproportionately affecting Black,
          Indigenous, Latinx, and other people of color. It’s important for our
          state to report accurate and up-to-date information about what’s
          happening so that our health officials, business leaders, and the
          general public know how to respond to the pandemic.
        </p>
      ) : (
        <div
          dangerouslySetInnerHTML={{
            __html: script,
          }}
        />
      )}
    </div>
  )
}

StateScript.defaultProps = {
  currentStateName: '-- Select a state --',
}

StateScript.propTypes = {
  currentStateName: PropTypes.string,
  stateInfo: PropTypes.arrayOf(
    // todo update this
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
