import React from 'react'
import { NoteSymbol } from './table-symbols'
import tableNotesStyles from './table-notes.module.scss'

export default ({ state, groupedNotes }) => (
  <ol className={tableNotesStyles.notes}>
    {groupedNotes.map((note, index) => (
      <li id={`${state}-table-note-${index + 1}`}>
        <div>
          <NoteSymbol index={index + 1} />
        </div>
        <span className={tableNotesStyles.content}>{note}</span>
      </li>
    ))}
  </ol>
)
