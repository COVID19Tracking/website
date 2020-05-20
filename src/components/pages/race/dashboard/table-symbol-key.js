/* eslint-disable react/button-has-type */
import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { CautionSymbol, DisparitySymbol } from './table-symbols'
import tableSymbolStyles from './table-symbol-key.module.scss'

export default ({ state }) => {
  const [disparityOpen, setDisparityOpen] = useState(false)
  const [comparibleOpen, setComparibleOpen] = useState(false)
  const data = useStaticQuery(graphql`
    query {
      notComparible: contentfulSnippet(
        slug: { eq: "race-dashboard-not-comparable" }
      ) {
        childContentfulSnippetContentTextNode {
          childMarkdownRemark {
            html
          }
        }
      }
      disparity: contentfulSnippet(slug: { eq: "race-dashboard-disparity" }) {
        childContentfulSnippetContentTextNode {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  `)

  return (
    <div className={tableSymbolStyles.container}>
      <p>
        <DisparitySymbol inkey />
        Racial/ethnic disparity likely.{' '}
        <button
          className={tableSymbolStyles.disclosureButton}
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
      <p>
        <CautionSymbol inkey />
        Should not be compared with percentage of population.{' '}
        <button
          className={tableSymbolStyles.disclosureButton}
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
      <div
        id={`table-symbol-disparity-${state.toLowerCase()}`}
        hidden={!disparityOpen}
        className={tableSymbolStyles.disclosurePane}
        data-expanded={disparityOpen}
        dangerouslySetInnerHTML={{
          __html:
            data.disparity.childContentfulSnippetContentTextNode
              .childMarkdownRemark.html,
        }}
      />
      <div
        id={`table-symbol-notComparible-${state.toLowerCase()}`}
        hidden={!comparibleOpen}
        className={tableSymbolStyles.disclosurePane}
        data-expanded={comparibleOpen}
        dangerouslySetInnerHTML={{
          __html:
            data.notComparible.childContentfulSnippetContentTextNode
              .childMarkdownRemark.html,
        }}
      />
    </div>
  )
}
