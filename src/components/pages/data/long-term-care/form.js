/* eslint-disable */

import React, { useEffect } from 'react'
import formStyles from './form.module.scss'

const LTCForm = () => {
  if (typeof window === 'undefined') {
    return null
  }
  useEffect(() => {
    const scriptElement = document.createElement('script')
    scriptElement.src = 'https://code.jquery.com/jquery-2.2.3.min.js'
    scriptElement.onload = () => {
      const formScriptElement = document.createElement('script')
      formScriptElement.src =
        'https://d3q1ytufopwvkq.cloudfront.net/1/formrenderer.js'
      formScriptElement.onload = () => {
        const a = new window.FormRenderer({ project_id: 'q01EuOHV1HBGbhlB' })
      }
      document.getElementsByTagName('head')[0].appendChild(formScriptElement)
    }
    document.getElementsByTagName('head')[0].appendChild(scriptElement)
  }, [])

  return <form className={formStyles.form} data-formrenderer />
}

export default LTCForm
