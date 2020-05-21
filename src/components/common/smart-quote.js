import React from 'react'
import PropTypes from 'prop-types'
import smartypants from 'smartypants'

const SmartQuote = ({ children }) => <>{smartypants(children, 1)}</>

SmartQuote.propTypes = {
  children: PropTypes.string.isRequired,
}

export default SmartQuote
