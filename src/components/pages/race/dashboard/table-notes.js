import React from 'react'
import tableNotesStyle from './table-notes.module.scss'

export default ({ state, stateName, type, groupedNotes }) => {
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
      <ol>
        {groupedNotes.map((note, index) => (
          <li key={`${state.toLowerCase()}-note-${index + 1}`}>{note}</li>
        ))}
      </ol>
    </>
  )
}
