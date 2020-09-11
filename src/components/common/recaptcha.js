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
    if (typeof window !== 'undefined')
      window.recaptchaOnload = () => {
        window.grecaptcha.render(captchaRef.current, {
          siteKey: data.site.siteMetadata.recaptchaKey,
        })
      }
  }, [])

  return (
    <>
      <Helmet>
        <script src="https://www.google.com/recaptcha/api.js?render=explicit&onload=recaptchaOnload" />
      </Helmet>
      <div
        className="g-recaptcha"
        ref={captchaRef}
        data-sitekey={data.site.siteMetadata.recaptchaKey}
      />
    </>
  )
}

export default Recaptcha
