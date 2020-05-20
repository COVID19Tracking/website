import React from 'react'

export default ({ state, groupedNotes }) => {
  if (!groupedNotes.length) {
    return null
  }
  return (
    <>
      <h4>Value notes</h4>
      <ol>
        {groupedNotes.map((note, index) => (
          <li
            id={`${state.toLowerCase()}-table-note-${index + 1}`}
            key={`${state.toLowerCase()}-table-note-${index + 1}`}
          >
            {note}
          </li>
        ))}
      </ol>
    </>
  )
}
