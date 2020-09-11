import React, { useEffect, useRef } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'

const Recaptcha = () => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          recaptchaKey
        }
      }
    }
  `)

  const captchaRef = useRef(false)

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      typeof window.grecaptcha !== 'undefined'
    ) {
      window.grecaptcha.render(captchaRef.current, {
        siteKey: data.site.siteMetadata.recaptchaKey,
      })
    }
  }, [])

  return (
    <>
      <Helmet>
        <script src="https://www.google.com/recaptcha/api.js?render=explicit" />
      </Helmet>
      <div
        className="g-recaptcha"
        data-sitekey={data.site.siteMetadata.recaptchaKey}
      />
    </>
  )
}

export default Recaptcha
