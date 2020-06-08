/* eslint-disable react/button-has-type */
import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import smartypants from 'smartypants'
import classnames from 'classnames'
import { CautionSymbol, DisparitySymbol } from './table-symbols'
import tableSymbolStyles from './table-symbol-key.module.scss'

export default ({ state }) => {
  const content = useStaticQuery(graphql`
    query {
      disparityNote: contentfulSnippet(
        slug: { eq: "race-dashboard-disparity" }
      ) {
        contentful_id
        childContentfulSnippetContentTextNode {
          childMarkdownRemark {
            html
          }
        }
      }
      comparibleNote: contentfulSnippet(
        slug: { eq: "race-dashboard-not-comparable" }
      ) {
        contentful_id
        childContentfulSnippetContentTextNode {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  `)
  const [disparityOpen, setDisparityOpen] = useState(false)
  const [comparibleOpen, setComparibleOpen] = useState(false)

  return (
    <div className={tableSymbolStyles.container}>
      <p className={tableSymbolStyles.key}>
        <DisparitySymbol inkey />
        Racial/ethnic disparity likely.{' '}
        <a href="#notes-disparity" className="js-disabled">
          See why <span aria-hidden>↓</span>
        </a>
        <button
          className={classnames(
            tableSymbolStyles.disclosureButton,
            'js-enabled',
          )}
          aria-expanded={disparityOpen}
          aria-controls={`table-symbol-disparity-${state.toLowerCase()}`}
          onClick={event => {
            event.preventDefault()
            setDisparityOpen(!disparityOpen)
            if (comparibleOpen) {
              setComparibleOpen(false)
            }
          }}
        >
          <span className={tableSymbolStyles.text}>See why</span>{' '}
          <span aria-hidden>{disparityOpen ? <>↑</> : <>↓</>}</span>
        </button>
      </p>
      <p className={tableSymbolStyles.key}>
        <CautionSymbol inkey />
        Should not be compared with percentage of population.{' '}
        <a href="#notes-comparible" className="js-disabled">
          See why <span aria-hidden>↓</span>
        </a>
        <button
          className={classnames(
            tableSymbolStyles.disclosureButton,
            'js-enabled',
          )}
          aria-expanded={disparityOpen}
          aria-controls={`table-symbol-notComparible-${state.toLowerCase()}`}
          onClick={event => {
            event.preventDefault()
            setComparibleOpen(!comparibleOpen)
            if (disparityOpen) {
              setDisparityOpen(false)
            }
          }}
        >
          <span className={tableSymbolStyles.text}>See why</span>{' '}
          <span aria-hidden>{comparibleOpen ? <>↑</> : <>↓</>}</span>
        </button>
      </p>
      <div />
      <div
        id={`table-symbol-disparity-${state.toLowerCase()}`}
        hidden={!disparityOpen}
        className={tableSymbolStyles.disclosurePane}
        data-expanded={disparityOpen}
        dangerouslySetInnerHTML={{
          __html: smartypants(
            content.disparityNote.childContentfulSnippetContentTextNode
              .childMarkdownRemark.html,
          ),
        }}
      />
      <div
        id={`table-symbol-notComparible-${state.toLowerCase()}`}
        hidden={!comparibleOpen}
        className={tableSymbolStyles.disclosurePane}
        data-expanded={comparibleOpen}
        dangerouslySetInnerHTML={{
          __html: smartypants(
            content.comparibleNote.childContentfulSnippetContentTextNode
              .childMarkdownRemark.html,
          ),
        }}
      />
    </div>
  )
}
