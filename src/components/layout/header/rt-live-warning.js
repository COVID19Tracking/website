import React, { useState, useEffect } from 'react'
import Container from '~components/common/container'
import dataWarningStyle from './data-warning.module.scss'

const DataWarning = () => {
  const [isHidden, setIsHidden] = useState(true)

  useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }
    if (document.cookie && document.cookie.search('ctp_warning') > -1) {
      return
    }
    if (
      (typeof document.referrer !== 'undefined' &&
        document.referrer.search('rt.live') > -1) ||
      window.location.href.search(/\?rtlive/) > -1
    ) {
      setIsHidden(false)
    }
  }, [])

  return (
    <>
      {!isHidden && (
        <div className={dataWarningStyle.warning}>
          <Container>
            <button
              aria-label="Hide this warning"
              type="button"
              onClick={event => {
                event.preventDefault()
                setIsHidden(true)
                const date = new Date()
                date.setTime(date.getTime() + 10 * 24 * 60 * 60 * 1000)
                document.cookie = `ctp_warning=1; expires=${date.toISOString()}; path=/`
              }}
            >
              &times;
            </button>
            <p role="alert">
              Welcome, rt.live users. We are unaffiliated with rt.live and do
              not estimate reproduction numbers for COVID-19. We do offer
              official public health data for 56 US states and territories and a
              full set of chart tools you may find helpful.
            </p>
          </Container>
        </div>
      )}
    </>
  )
}

export default DataWarning
