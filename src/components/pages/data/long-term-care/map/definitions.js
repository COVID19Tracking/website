import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import classnames from 'classnames'
import definitionsStyles from '../../hhs-facilities/definitions.module.scss'

const Definitions = () => {
  const [isOpen, setIsOpen] = useState(false)
  const data = useStaticQuery(graphql`
    {
      contentfulSnippet(slug: { eq: "ltc-map-definitions" }) {
        contentful_id
        childContentfulSnippetContentTextNode {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  `)
  return (
    <div className={definitionsStyles.definitionsWrapper}>
      <button
        aria-expanded={isOpen}
        type="button"
        className={definitionsStyles.definitionsButton}
        onClick={event => {
          event.preventDefault()
          setIsOpen(!isOpen)
        }}
      >
        Data definitions<span aria-hidden> {isOpen ? <>↑</> : <>↓</>}</span>
      </button>

      <div
        className={classnames(
          definitionsStyles.definitions,
          isOpen && definitionsStyles.isOpen,
        )}
        hidden={isOpen ? undefined : true}
        dangerouslySetInnerHTML={{
          __html:
            data.contentfulSnippet.childContentfulSnippetContentTextNode
              .childMarkdownRemark.html,
        }}
      />
    </div>
  )
}

export default Definitions
