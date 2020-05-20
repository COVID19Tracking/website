import React from 'react'
import tableNotesStyles from './table-notes.module.scss'

export default ({ state, groupedNotes }) => (
  <ol className={tableNotesStyles.notes}>
    {groupedNotes.map((note, index) => (
      <li id={`${state}-table-note-${index + 1}`}>
        <span className={tableNotesStyles.content}>{note}</span>
      </li>
    ))}
  </ol>
)
