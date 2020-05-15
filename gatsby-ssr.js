const React = require('react')

exports.onRenderBody = ({ setPostBodyComponents, setBodyAttributes }) => {
  setBodyAttributes({
    className: 'no-js',
  })
  setPostBodyComponents([
    <script
      type="text/javascript"
      key="recaptcha-script"
      async
      defer
      src="https://www.google.com/recaptcha/api.js"
    />,
  ])
}
