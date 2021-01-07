/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import marked from 'marked'
import Container from '~components/common/container'
import dataWarningStyle from './data-warning.module.scss'

const DataWarning = () => {
  const [isHidden, setIsHidden] = useState(false)

  const data = useStaticQuery(graphql`
    {
      contentfulSnippet(slug: { eq: "data-warning" }) {
        contentful_id
        name
        content {
          content
        }
      }
    }
  `)

  if (
    !data ||
    !data.contentfulSnippet ||
    !data.contentfulSnippet.content ||
    !data.contentfulSnippet.content.content.trim().length
  ) {
    return null
  }

  useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }
    if (document.cookie && document.cookie.search('ctp_warning') > -1) {
      setIsHidden(true)
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
            <p
              role="alert"
              dangerouslySetInnerHTML={{
                __html: marked.inlineLexer(
                  data.contentfulSnippet.content.content,
                  [],
                ),
              }}
            />
          </Container>
        </div>
      )}
    </>
  )
}

export default DataWarning
