import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import ReCaptcha from 'react-recaptcha'

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

  return (
    <>
      {typeof window !== 'undefined' && (
        <ReCaptcha
          sitekey={data.site.siteMetadata.recaptchaKey}
          render="explicit"
          elementID={`captcha-${Math.round(Math.random() * 1000)}`}
        />
      )}
    </>
  )
}

export default Recaptcha
