const React = require('react')

exports.onRenderBody = ({ setPostBodyComponents, setBodyAttributes }) => {
  setBodyAttributes({
    className: 'no-js',
  })
}
