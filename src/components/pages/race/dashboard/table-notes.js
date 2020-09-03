/* eslint-disable react/button-has-type */
import React, { useState, Fragment } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import smartypants from 'smartypants'
import classnames from 'classnames'
import { UnlinkedNote, DisparitySymbol } from './table-symbols'
import tableNotesStyle from './table-notes.module.scss'

const TableNotes = ({
  state,
  stateName,
  type,
  groupedNotes,
  hispanicLatinxNote,
  disparityExists,
}) => {
  const [disparityOpen, setDisparityOpen] = useState(false)
  const content = useStaticQuery(
    graphql`
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
      }
    `,
  )

  if (!groupedNotes.length && !disparityExists && !hispanicLatinxNote) {
    return null
  }
  return (
    <>
      <h4
        className={tableNotesStyle.header}
        id={`notes-${state.toLowerCase()}`}
      >
        Notes{' '}
        <span className="a11y-only">
          {type && <>on {type}</>} for {stateName}
        </span>
      </h4>
      <ul className={tableNotesStyle.list}>
        {disparityExists && (
          <li>
            <DisparitySymbol /> Racial/ethnic disparity likely.{' '}
            <a href="#notes-disparity" className="js-disabled">
              See why <span aria-hidden>↓</span>
            </a>
            <button
              className={classnames(
                tableNotesStyle.disclosureButton,
                'js-enabled',
              )}
              aria-expanded={disparityOpen}
              aria-controls={`table-symbol-disparity-${state.toLowerCase()}`}
              onClick={event => {
                event.preventDefault()
                setDisparityOpen(!disparityOpen)
              }}
            >
              <span className={tableNotesStyle.text}>See why</span>{' '}
              <span aria-hidden>{disparityOpen ? <>↑</> : <>↓</>}</span>
            </button>
            <div
              id={`table-symbol-disparity-${state.toLowerCase()}`}
              hidden={!disparityOpen}
              className={tableNotesStyle.disclosurePane}
              data-expanded={disparityOpen}
              dangerouslySetInnerHTML={{
                __html: smartypants(
                  content.disparityNote.childContentfulSnippetContentTextNode
                    .childMarkdownRemark.html,
                ),
              }}
            />
          </li>
        )}
        {hispanicLatinxNote && (
          <li>
            <span className={tableNotesStyle.emptyNote}>*</span> Hispanic or
            Latino ethnicity, any race. All other race categories in this table
            are defined as Not Hispanic or Latino.
          </li>
        )}
        {groupedNotes.map((note, index) => (
          <Fragment key={`${state.toLowerCase()}-note-${index + 1}`}>
            {note && note.trim().length && (
              <li>
                <UnlinkedNote index={index + 1} /> {note}
              </li>
            )}
          </Fragment>
        ))}
      </ul>
    </>
  )
}

export default TableNotes
