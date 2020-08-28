import React, { useEffect } from 'react'
import Helmet from 'react-helmet'

const ChangeLog = () => {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://cdn.headwayapp.co/widget.js'
    document.head.appendChild(script)
    script.onload = () => {
      window.Headway.init({
        selector: '#headway-widget',
        account: '7KMWgy',
      })
    }
  }, [])

  return (
    <>
      <Helmet>
        <style>
          {`#HW_badge_cont {
          display: inline-block;
          margin-bottom: -0.5rem;
        }`}
        </style>
      </Helmet>
      <p>
        <strong>
          <a href="https://apichanges.covidtracking.com/">Latest API changes</a>
        </strong>
        <span id="headway-widget" />
      </p>
    </>
  )
}

export default ChangeLog
