import React from "react"

const Footer = () => (
  <footer className="site-footer">
    <div className="container">
      <ul className="follow">
        <li>
          <a href="https://github.com/">GitHub</a>
        </li>
        <li>
          <a href="https://twitter.com/{{ data.twitter }}">Twitter</a>
        </li>
      </ul>
    </div>
  </footer>
)

export default Footer
