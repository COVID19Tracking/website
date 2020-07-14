import React, { Fragment } from 'react'
import tableNotesStyle from './table-notes.module.scss'

export default ({ state, stateName, type, groupedNotes }) => {
  // state like AL, stateName like Alabama
  if (!groupedNotes.length) {
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
      <ol className={tableNotesStyle.list}>
        {groupedNotes.map((note, index) => (
          <Fragment key={`${state.toLowerCase()}-note-${index + 1}`}>
            {note && note.trim().length && <li>{note}</li>}
          </Fragment>
        ))}
      </ol>
    </>
  )
}
