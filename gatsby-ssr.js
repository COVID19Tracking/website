const React = require('react')

exports.onRenderBody = ({ setPostBodyComponents, setBodyAttributes }) => {
  setBodyAttributes({
    className: 'no-js',
  })
  setPostBodyComponents([
    <script
      type="text/javascript"
      async
      defer
      src="https://www.google.com/recaptcha/api.js"
    />,
  ])
}
